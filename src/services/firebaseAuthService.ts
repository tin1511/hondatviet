import {
  sendPasswordResetEmail,
  updatePassword,
  type User as FirebaseUser
} from 'firebase/auth';
import {
  collection,
  deleteField,
  doc,
  getDoc,
  getDocs,
  setDoc
} from 'firebase/firestore';
import { auth, db } from './firebase';
import type { UserProfile } from '../types';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: { userId?: string | null; email?: string | null };
}

const USERS_COLLECTION = 'users';
const TRUSTED_ADMIN_EMAIL = 'btin2499@gmail.com';

function isTrustedAdmin(user: FirebaseUser | null): boolean {
  return !!user
    && user.emailVerified
    && (user.email || '').toLowerCase() === TRUSTED_ADMIN_EMAIL;
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errMsg = error instanceof Error ? error.message : String(error);
  const errInfo: FirestoreErrorInfo = {
    error: errMsg,
    authInfo: { userId: auth.currentUser?.uid, email: auth.currentUser?.email },
    operationType,
    path
  };
  if (errMsg === 'firestore_timeout' || errMsg.includes('offline') || errMsg.includes('unavailable')) {
    console.warn('⚠️ Firestore offline/timeout fallback:', JSON.stringify(errInfo));
  } else {
    console.error('🔥 Firestore Operation Error:', JSON.stringify(errInfo));
  }
  return errInfo;
}

/**
 * Returns only the current user's profile. Full account listing is restricted
 * to the verified, allow-listed administrator.
 */
export async function getAccountsFromFirestore(): Promise<UserProfile[]> {
  const currentUser = auth.currentUser;
  if (!currentUser) return [];

  try {
    if (isTrustedAdmin(currentUser)) {
      const snapshot = await getDocs(collection(db, USERS_COLLECTION));
      return snapshot.docs.map(item => item.data() as UserProfile);
    }

    const snapshot = await getDoc(doc(db, USERS_COLLECTION, currentUser.uid));
    return snapshot.exists() ? [snapshot.data() as UserProfile] : [];
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, USERS_COLLECTION);
    return [];
  }
}

/**
 * Writes a profile only to the signed-in user's UID document.
 * Credentials are deliberately excluded from Firestore.
 */
export async function saveUserToFirestore(user: UserProfile): Promise<boolean> {
  const currentUser = auth.currentUser;
  if (!currentUser || currentUser.uid !== user.id) {
    handleFirestoreError(new Error('profile_owner_mismatch'), OperationType.WRITE, `${USERS_COLLECTION}/${user.id}`);
    return false;
  }

  try {
    const safeProfile: Record<string, unknown> = { ...user, updatedAt: new Date().toISOString() };
    delete safeProfile.password;
    delete safeProfile.passwordHash;
    delete safeProfile.credentials;
    await setDoc(doc(db, USERS_COLLECTION, currentUser.uid), { ...safeProfile, password: deleteField(), passwordHash: deleteField(), credential: deleteField(), credentials: deleteField() }, { merge: true });
    return true;
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `${USERS_COLLECTION}/${user.id}`);
    return false;
  }
}

/**
 * Legacy password-based Firestore login is intentionally disabled.
 * Call signInWithEmailAndPassword from firebase/auth instead.
 */
export async function loginWithFirestore(
  _identifier: string,
  _password?: string
): Promise<{ success: boolean; user?: UserProfile; error?: string }> {
  return {
    success: false,
    error: 'Đăng nhập qua Firestore đã bị vô hiệu hóa. Hãy sử dụng Firebase Authentication.'
  };
}

/**
 * Updates the password in Firebase Authentication only; never writes it to Firestore.
 */
export async function updatePasswordInFirestore(userId: string, newPassword: string): Promise<boolean> {
  const currentUser = auth.currentUser;
  if (!currentUser || currentUser.uid !== userId || newPassword.length < 6) return false;

  try {
    await updatePassword(currentUser, newPassword);
    return true;
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, 'Firebase Authentication password');
    return false;
  }
}

/**
 * A password reset must be completed through the secure email action link.
 * The supplied new password is intentionally ignored.
 */
export async function resetPasswordInFirestoreByEmail(email: string, _newPassword: string): Promise<boolean> {
  try {
    await sendPasswordResetEmail(auth, email.trim().toLowerCase());
    return true;
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, 'Firebase Authentication password reset');
    return false;
  }
}
