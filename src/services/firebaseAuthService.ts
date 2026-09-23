import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  setDoc, 
  updateDoc, 
  query, 
  where 
} from 'firebase/firestore';
import { db, auth } from './firebase';
import { UserProfile } from '../types';

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
  authInfo: {
    userId?: string | null;
    email?: string | null;
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errMsg = error instanceof Error ? error.message : String(error);
  const errInfo: FirestoreErrorInfo = {
    error: errMsg,
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
    },
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

const USERS_COLLECTION = 'users';

/**
 * Lấy tất cả danh sách tài khoản trực tiếp từ Firebase Firestore
 */
export async function getAccountsFromFirestore(): Promise<UserProfile[]> {
  try {
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('firestore_timeout')), 3500)
    );
    const querySnapshot = await Promise.race([
      getDocs(collection(db, USERS_COLLECTION)),
      timeoutPromise
    ]);
    const accounts: UserProfile[] = [];
    querySnapshot.forEach((docSnap) => {
      accounts.push(docSnap.data() as UserProfile);
    });
    return accounts;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, USERS_COLLECTION);
    return [];
  }
}

/**
 * Lưu hoặc cập nhật tài khoản người dùng trực tiếp trên Firebase Firestore
 */
export async function saveUserToFirestore(user: UserProfile): Promise<boolean> {
  try {
    const userRef = doc(db, USERS_COLLECTION, user.id);
    const payload = {
      ...user,
      updatedAt: new Date().toISOString()
    };
    await setDoc(userRef, payload, { merge: true });
    console.log(`✅ Đã lưu tài khoản [${user.displayName} - ${user.email}] lên Firebase Firestore!`);
    return true;
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `${USERS_COLLECTION}/${user.id}`);
    return false;
  }
}

/**
 * Đăng nhập bằng cách đối chiếu thông tin tài khoản trên Firebase Firestore
 */
export async function loginWithFirestore(
  identifier: string, 
  password?: string
): Promise<{ success: boolean; user?: UserProfile; error?: string }> {
  try {
    const cleanId = identifier.trim().toLowerCase();
    const cleanPass = password ? password.trim() : '';

    const allAccounts = await getAccountsFromFirestore();
    
    // Tìm tài khoản theo email, displayName hoặc ID
    const account = allAccounts.find(a => 
      (a.email && a.email.toLowerCase() === cleanId) ||
      (a.displayName && a.displayName.toLowerCase() === cleanId) ||
      (a.id && a.id.toLowerCase() === cleanId)
    );

    if (!account) {
      return { 
        success: false, 
        error: 'Tài khoản không tồn tại trên Firebase. Vui lòng kiểm tra lại hoặc Đăng Ký Mới.' 
      };
    }

    if (cleanPass && account.password && account.password !== cleanPass) {
      return { success: false, error: 'Mật khẩu không chính xác. Vui lòng thử lại.' };
    }

    // Cập nhật trạng thái đăng nhập gần nhất trên Firestore
    const updatedAccount: UserProfile = {
      ...account,
      lastLoginAt: new Date().toISOString(),
      isLoggedIn: true
    };

    await saveUserToFirestore(updatedAccount);

    return { success: true, user: updatedAccount };
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, USERS_COLLECTION);
    return { success: false, error: 'Lỗi kết nối tới Firebase Firestore.' };
  }
}

/**
 * Cập nhật mật khẩu tài khoản trên Firebase Firestore
 */
export async function updatePasswordInFirestore(userId: string, newPassword: string): Promise<boolean> {
  try {
    const userRef = doc(db, USERS_COLLECTION, userId);
    await updateDoc(userRef, {
      password: newPassword.trim(),
      updatedAt: new Date().toISOString()
    });
    return true;
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `${USERS_COLLECTION}/${userId}`);
    return false;
  }
}

/**
 * Khôi phục mật khẩu tài khoản trên Firebase Firestore theo Email
 */
export async function resetPasswordInFirestoreByEmail(email: string, newPassword: string): Promise<boolean> {
  try {
    const cleanEmail = email.trim().toLowerCase();
    const accounts = await getAccountsFromFirestore();
    const acc = accounts.find(a => a.email.toLowerCase() === cleanEmail);
    if (acc) {
      return await updatePasswordInFirestore(acc.id, newPassword);
    }
    return false;
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, USERS_COLLECTION);
    return false;
  }
}
