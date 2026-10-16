import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  type User as FirebaseUser
} from 'firebase/auth';
import { deleteField, doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from './firebase';
import type { UserProfile } from '../types';

const USERS_COLLECTION = 'users';
const TRUSTED_ADMIN_EMAIL = 'btin2499@gmail.com';
const CURRENT_USER_KEY = 'heritageai_current_user';
const LEGACY_ACCOUNTS_KEY = 'heritageai_user_accounts';

const ROLE_LABELS: Record<UserProfile['role'], string> = {
  user: 'Người yêu Văn hóa & Du khách',
  student: 'Học sinh / Sinh viên',
  researcher: 'Nhà nghiên cứu / Giảng viên',
  admin: 'Quản trị viên Hệ thống'
};

function cleanError(error: unknown): string {
  const code = (error as { code?: string })?.code || '';
  if (code.includes('auth/invalid-credential') || code.includes('auth/wrong-password') || code.includes('auth/user-not-found')) {
    return 'Email hoặc mật khẩu không chính xác.';
  }
  if (code.includes('auth/email-already-in-use')) return 'Email này đã được đăng ký. Hãy đăng nhập.';
  if (code.includes('auth/weak-password')) return 'Mật khẩu cần tối thiểu 6 ký tự.';
  if (code.includes('auth/invalid-email')) return 'Địa chỉ email không hợp lệ.';
  if (code.includes('auth/too-many-requests')) return 'Có quá nhiều lần thử. Vui lòng đợi rồi thử lại.';
  if (code.includes('auth/network-request-failed')) return 'Không thể kết nối dịch vụ xác thực. Hãy kiểm tra mạng.';
  return 'Không thể xác thực tài khoản. Vui lòng thử lại.';
}

function isTrustedAdmin(user: FirebaseUser): boolean {
  return user.emailVerified && (user.email || '').toLowerCase() === TRUSTED_ADMIN_EMAIL;
}

function toProfile(user: FirebaseUser, saved?: Partial<UserProfile> | null): UserProfile {
  const admin = isTrustedAdmin(user);
  const storedRole = saved?.role;
  const role: UserProfile['role'] = admin
    ? 'admin'
    : storedRole && storedRole !== 'admin'
      ? storedRole
      : 'user';

  return {
    id: user.uid,
    displayName: user.displayName || saved?.displayName || (user.email || 'Thành viên').split('@')[0],
    email: user.email || saved?.email || '',
    avatarUrl: user.photoURL || saved?.avatarUrl || '',
    city: saved?.city || 'Việt Nam',
    role,
    roleLabel: ROLE_LABELS[role],
    interests: saved?.interests || ['Di sản Việt Nam', 'Ẩm thực truyền thống'],
    favoritesCount: saved?.favoritesCount || 0,
    contributionsCount: saved?.contributionsCount || 0,
    quizzesCompleted: saved?.quizzesCompleted || 0,
    storiesCreated: saved?.storiesCreated || 0,
    recognitionsCount: saved?.recognitionsCount || 0,
    itinerariesCount: saved?.itinerariesCount || 0,
    points: saved?.points || 0,
    level: saved?.level || 'Thành viên mới',
    badges: saved?.badges || [],
    createdAt: saved?.createdAt || new Date().toISOString(),
    lastLoginAt: new Date().toISOString(),
    isLoggedIn: true,
    emailVerified: user.emailVerified
  };
}

async function saveProfileForSignedInUser(user: FirebaseUser, proposed?: Partial<UserProfile>): Promise<UserProfile> {
  const ref = doc(db, USERS_COLLECTION, user.uid);
  const snapshot = await getDoc(ref);
  const storedProfile = snapshot.exists() ? snapshot.data() as Partial<UserProfile> : {};
  const profile = toProfile(user, { ...storedProfile, ...proposed });

  // Never persist passwords or client-supplied identity fields.
  const safeProfile = { ...profile };
  delete safeProfile.password;

  // A legacy profile may have a forged "admin" role. Keep that legacy role out
  // of the client profile and avoid attempting a forbidden self-promotion/demotion write.
  const persistedProfile: Record<string, unknown> = { ...safeProfile };
  if (!isTrustedAdmin(user) && storedProfile.role === 'admin') {
    delete persistedProfile.role;
    delete persistedProfile.roleLabel;
  }

  await setDoc(ref, { ...persistedProfile, password: deleteField(), passwordHash: deleteField(), credential: deleteField(), credentials: deleteField() }, { merge: true });
  localStorage.removeItem(LEGACY_ACCOUNTS_KEY);
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(safeProfile));
  return safeProfile;
}

export async function signInWithFirebaseIdentity(
  identifier: string,
  password: string
): Promise<{ success: boolean; user?: UserProfile; error?: string }> {
  try {
    const cleanIdentifier = identifier.trim().toLowerCase();
    // Preserve the familiar admin alias without preserving a hard-coded password.
    const email = cleanIdentifier === 'admin' ? TRUSTED_ADMIN_EMAIL : cleanIdentifier;
    if (!email.includes('@')) return { success: false, error: 'Hãy đăng nhập bằng email và mật khẩu.' };

    const credential = await signInWithEmailAndPassword(auth, email, password);
    if (email === TRUSTED_ADMIN_EMAIL && !credential.user.emailVerified) {
      await signOut(auth);
      return { success: false, error: 'Tài khoản quản trị viên phải xác minh email trước khi truy cập.' };
    }
    const profile = await saveProfileForSignedInUser(credential.user);
    return { success: true, user: profile };
  } catch (error) {
    return { success: false, error: cleanError(error) };
  }
}

export async function registerWithFirebaseIdentity(params: {
  displayName: string;
  email: string;
  password: string;
  role: 'user' | 'student' | 'researcher';
  city: string;
  interests: string[];
}): Promise<{ success: boolean; user?: UserProfile; error?: string }> {
  try {
    const email = params.email.trim().toLowerCase();
    if (email === TRUSTED_ADMIN_EMAIL) {
      return { success: false, error: 'Email quản trị viên không thể đăng ký qua biểu mẫu công khai.' };
    }
    const credential = await createUserWithEmailAndPassword(auth, email, params.password);
    await updateProfile(credential.user, { displayName: params.displayName.trim() });
    await sendEmailVerification(credential.user);

    const role = params.role === 'admin' ? 'user' : params.role;
    const user = await saveProfileForSignedInUser(credential.user, {
      displayName: params.displayName.trim(),
      city: params.city || 'Việt Nam',
      role,
      roleLabel: ROLE_LABELS[role],
      interests: params.interests,
      points: 100,
      level: 'Thành Viên Mới (Cấp 1)',
      createdAt: new Date().toISOString()
    });
    return { success: true, user };
  } catch (error) {
    return { success: false, error: cleanError(error) };
  }
}

export async function sendFirebasePasswordReset(email: string): Promise<{ success: boolean; error?: string }> {
  try {
    await sendPasswordResetEmail(auth, email.trim().toLowerCase());
    return { success: true };
  } catch (error) {
    const code = (error as { code?: string })?.code || '';
    if (code.includes('auth/invalid-email')) return { success: false, error: 'Địa chỉ email không hợp lệ.' };
    // Avoid exposing whether a particular email is registered.
    if (code.includes('auth/user-not-found')) return { success: true };
    return { success: false, error: cleanError(error) };
  }
}

export async function signOutFirebaseIdentity(): Promise<void> {
  await signOut(auth);
}
