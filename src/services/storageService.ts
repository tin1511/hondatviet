import { 
  FamilyStoryMemory, 
  CommunityContribution, 
  ContributionComment,
  ItineraryPlan, 
  UserProfile,
  UserActivityLog,
  UserActionType,
  UserBadge,
  HeritageItem,
  PlaceItem,
  AITourGuideConfig,
  CityLandmarkBackground,
  HeritageStory,
  StoryMode,
  RecognitionSampleItem,
  RecognitionSectionConfig
} from '../types';
import { 
  DEMO_GRANDPARENT_STORIES, 
  HERITAGE_DATABASE, 
  PLACES_NEAR_HERITAGE 
} from '../data/vietnamHeritageData';
import { cleanVietnameseText } from '../utils/textUtils';
import {
  saveUserToFirestore,
  getAccountsFromFirestore,
  updatePasswordInFirestore,
  resetPasswordInFirestoreByEmail
} from './firebaseAuthService';

const FAVORITES_KEY = 'heritageai_favorites';
const STORIES_KEY = 'heritageai_family_stories';
const POSTS_KEY = 'heritageai_community_posts';
const ITINERARIES_KEY = 'heritageai_itineraries';
const CURRENT_USER_KEY = 'heritageai_current_user';
const ACCOUNTS_KEY = 'heritageai_user_accounts';
const ACTIVITIES_KEY = 'heritageai_activities_log';
const HERITAGES_KEY = 'heritageai_custom_heritages';
const PLACES_KEY = 'heritageai_custom_places';
const TOUR_GUIDE_CONFIG_KEY = 'heritageai_tour_guide_config';
const LANDMARKS_KEY = 'heritageai_custom_landmarks';
const CUSTOM_STORIES_KEY = 'heritageai_custom_stories';
const RECOGNITION_CONFIG_KEY = 'heritageai_recognition_section_config';

export const DEFAULT_TOUR_GUIDE_CONFIG: AITourGuideConfig = {
  guideName: 'Bảo An',
  title: 'Thuyết Minh Viên Di Sản & Hướng Dẫn Viên Văn Hóa Quốc Gia',
  avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
  experienceYears: 12,
  speakingStyle: 'warm_friendly',
  specialties: [
    'Quần thể Di tích Cố đô & Lăng tẩm Hoàng gia',
    'Kiến trúc Đình Chùa & Văn hóa Tín ngưỡng Bắc Bộ',
    'Ẩm thực Dân dã & Quán ngon gia truyền 3 Miền',
    'Văn hóa Bản địa, Lễ hội Dân gian & Làng nghề Truyền thống'
  ],
  etiquetteRules: [
    'Mặc trang phục lịch sự, kín đáo khi bước vào chốn linh thiêng (đình, đền, chùa, lăng tẩm).',
    'Đi nhẹ, nói khẽ, không chỉ tay vào tượng Phật hoặc đồ thờ tự.',
    'Tuyệt đối không sờ vào hiện vật cổ, không viết vẽ lên rùa đá, tường thành di tích.',
    'Bỏ rác đúng nơi quy định, chung tay giữ gìn cảnh quan di sản xanh sạch đẹp.',
    'Xin phép trước khi chụp ảnh người dân bản địa hoặc các nghệ nhân lớn tuổi.'
  ],
  welcomeGreeting: 'Dạ, em là Bảo An - Hướng dẫn viên du lịch văn hóa đồng hành cùng quý cô bác, anh chị! Rất hân hạnh được dẫn đoàn mình khám phá vẻ đẹp kỳ vĩ và những câu chuyện ngàn năm của non sông gấm vóc Việt Nam. Mời quý vị cùng em dạo bước nhé!',
  customKnowledgePrompt: `MẸO HƯỚNG DẪN VIÊN ĐỘC QUYỀN:
1. Khi du khách đến Hoàng thành Thăng Long hoặc Đại Nội Huế: Luôn chỉ cho khách góc chụp ảnh cổng Ngọ Môn lúc hoàng hôn và gợi ý nghe nhã nhạc cung đình.
2. Ẩm thực: Đừng chỉ giới thiệu nhà hàng sang trọng, hãy chỉ du khách các quán ăn dân dã nức tiếng của dân bản địa có tuổi đời trên 30 năm.
3. Khi du khách hỏi về giá vé hoặc đồ lưu niệm: Nhắc du khách hỏi giá trước khi mua, ủng hộ các sản phẩm thủ công chính hiệu từ bàn tay nghệ nhân làng nghề thay vì hàng gia công công nghiệp.`,
  activeHeritageKnowledge: true,
  updatedAt: '2026-09-18T00:00:00Z'
};

const INITIAL_BADGES: UserBadge[] = [
  {
    id: 'badge-explorer-1',
    name: 'Nhà Thám Hiểm Sơ Cấp',
    icon: '🧭',
    description: 'Bắt đầu hành trình khám phá di sản 3 miền',
    unlockedAt: '2026-09-01T08:00:00Z'
  },
  {
    id: 'badge-hue-expert',
    name: 'Sứ Giả Cố Đô',
    icon: '🏯',
    description: 'Đã tìm hiểu sâu về Đại Nội và Quần thể di tích Huế',
    unlockedAt: '2026-09-10T14:30:00Z'
  },
  {
    id: 'badge-storyteller',
    name: 'Người Giữ Ký Ức',
    icon: '🎙️',
    description: 'Đã ghi âm và lưu giữ câu chuyện truyền miệng gia đình',
    unlockedAt: '2026-09-15T09:15:00Z'
  }
];

const DEFAULT_ADMIN_ACCOUNT: UserProfile = {
  id: 'user-admin',
  displayName: 'Quản trị viên Hệ thống',
  email: 'admin@heritageai.vn',
  password: 'AINHS2026',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  city: 'Hà Nội / Huế',
  role: 'admin',
  roleLabel: 'Quản trị viên & Kiểm định Di sản',
  interests: ['Quản lý di sản', 'Kiểm duyệt tri thức', 'Bảo tồn văn hóa'],
  favoritesCount: 0,
  contributionsCount: 0,
  quizzesCompleted: 0,
  storiesCreated: 0,
  recognitionsCount: 0,
  itinerariesCount: 0,
  points: 2026,
  level: 'Quản Trị Viên Hệ Thống',
  badges: INITIAL_BADGES,
  createdAt: '2026-01-01T00:00:00Z',
  lastLoginAt: new Date().toISOString(),
  isLoggedIn: false
};

const GUEST_USER: UserProfile = {
  id: 'user-guest',
  displayName: 'Khách tham quan',
  email: 'guest@heritageai.vn',
  avatarUrl: '',
  city: 'Việt Nam',
  role: 'user',
  roleLabel: 'Khách vãng lai',
  interests: ['Di sản Việt Nam', 'Ẩm thực truyền thống'],
  favoritesCount: 0,
  contributionsCount: 0,
  quizzesCompleted: 0,
  storiesCreated: 0,
  recognitionsCount: 0,
  itinerariesCount: 0,
  points: 0,
  level: 'Khách Khám Phá',
  badges: [],
  createdAt: new Date().toISOString(),
  isLoggedIn: false
};

export const storageService = {
  // ==========================================
  // AUTHENTICATION & MULTI-USER MANAGEMENT
  // ==========================================
  getAccounts(): UserProfile[] {
    try {
      const data = localStorage.getItem(ACCOUNTS_KEY);
      if (data) {
        return JSON.parse(data);
      }
      const initialAccounts = [DEFAULT_ADMIN_ACCOUNT];
      localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(initialAccounts));
      return initialAccounts;
    } catch {
      return [DEFAULT_ADMIN_ACCOUNT];
    }
  },

  async fetchAccounts(): Promise<UserProfile[]> {
    const local = this.getAccounts();
    try {
      // 1. Fetch directly from Firebase Firestore Cloud Database
      const firestoreAccounts = await getAccountsFromFirestore();
      if (firestoreAccounts && firestoreAccounts.length > 0) {
        const map = new Map<string, UserProfile>();
        local.forEach(a => map.set(a.id, a));
        firestoreAccounts.forEach((fsAcc: UserProfile) => {
          const localAcc = map.get(fsAcc.id) || Array.from(map.values()).find(l => l.email && fsAcc.email && l.email.toLowerCase() === fsAcc.email.toLowerCase());
          if (localAcc) {
            const mergedAcc: UserProfile = {
              ...localAcc,
              ...fsAcc,
              password: fsAcc.password || localAcc.password
            };
            map.set(mergedAcc.id, mergedAcc);
          } else {
            map.set(fsAcc.id, fsAcc);
          }
        });
        const merged = Array.from(map.values());
        localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(merged));
        return merged;
      }

      // 2. Secondary fallback to server API
      const res = await fetch('/api/accounts');
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.accounts)) {
          const map = new Map<string, UserProfile>();
          local.forEach(a => map.set(a.id, a));
          data.accounts.forEach((serverAcc: UserProfile) => {
            const localAcc = map.get(serverAcc.id) || Array.from(map.values()).find(l => l.email && serverAcc.email && l.email.toLowerCase() === serverAcc.email.toLowerCase());
            if (localAcc) {
              const mergedAcc: UserProfile = {
                ...localAcc,
                ...serverAcc,
                password: serverAcc.password || localAcc.password
              };
              map.set(mergedAcc.id, mergedAcc);
            } else {
              map.set(serverAcc.id, serverAcc);
            }
          });
          const merged = Array.from(map.values());
          localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(merged));
          return merged;
        }
      }
    } catch (err) {
      console.warn('Unable to sync accounts from Firebase/server:', err);
    }
    return local;
  },

  getCurrentUser(): UserProfile {
    try {
      const current = localStorage.getItem(CURRENT_USER_KEY);
      if (current) {
        return JSON.parse(current);
      }
      return GUEST_USER;
    } catch {
      return GUEST_USER;
    }
  },

  getUserProfile(): UserProfile {
    return this.getCurrentUser();
  },

  register(params: {
    displayName: string;
    email: string;
    password?: string;
    role?: 'user' | 'student' | 'researcher' | 'admin';
    city?: string;
    avatarUrl?: string;
    interests?: string[];
  }): { success: boolean; user?: UserProfile; error?: string } {
    const cleanEmail = params.email.trim().toLowerCase();
    if (!cleanEmail) {
      return { success: false, error: 'Vui lòng nhập địa chỉ email.' };
    }
    if (!params.displayName.trim()) {
      return { success: false, error: 'Vui lòng nhập họ và tên của bạn.' };
    }

    if (cleanEmail === 'admin' || cleanEmail === 'admin@heritageai.vn') {
      return { success: false, error: 'Tên đăng nhập admin đã được dành riêng cho quản trị viên.' };
    }

    const accounts = this.getAccounts();
    const existing = accounts.find(a => a.email.toLowerCase() === cleanEmail);
    if (existing) {
      return { success: false, error: 'Email này đã được đăng ký. Vui lòng chuyển sang tab Đăng nhập.' };
    }

    const role = params.role || 'user';
    const roleLabels: Record<string, string> = {
      user: 'Người yêu Văn hóa & Du khách',
      student: 'Học sinh / Sinh viên',
      researcher: 'Nhà nghiên cứu / Giảng viên',
      admin: 'Quản trị viên Hệ thống'
    };

    const newUser: UserProfile = {
      id: 'user-' + Date.now(),
      displayName: cleanVietnameseText(params.displayName),
      email: cleanEmail,
      password: params.password || '123456',
      avatarUrl: params.avatarUrl || `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(cleanEmail)}`,
      city: params.city ? cleanVietnameseText(params.city) : 'Việt Nam',
      role,
      roleLabel: roleLabels[role] || 'Người yêu Văn hóa',
      interests: params.interests || ['Di sản Việt Nam', 'Ẩm thực truyền thống'],
      favoritesCount: 0,
      contributionsCount: 0,
      quizzesCompleted: 0,
      storiesCreated: 0,
      recognitionsCount: 0,
      itinerariesCount: 0,
      points: 100, // starting bonus
      level: 'Thành Viên Mới (Cấp 1)',
      badges: [INITIAL_BADGES[0]],
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
      isLoggedIn: true
    };

    accounts.push(newUser);
    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));

    // Direct Cloud Save to Firebase Firestore
    saveUserToFirestore(newUser).catch(err => console.warn('Firebase Firestore register save warning:', err));

    // Secondary sync to server database
    fetch('/api/accounts/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser)
    }).then(r => r.json()).then(data => {
      if (data.success && data.user) {
        const accs = this.getAccounts();
        const idx = accs.findIndex(a => a.id === data.user.id || a.email.toLowerCase() === data.user.email.toLowerCase());
        if (idx >= 0) {
          accs[idx] = { ...accs[idx], ...data.user };
        } else {
          accs.push(data.user);
        }
        localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accs));
      }
    }).catch(err => console.warn('Server registration sync warning:', err));

    this.logActivity({
      userId: newUser.id,
      actionType: 'auth',
      title: 'Tạo tài khoản mới',
      description: `Đăng ký thành công tài khoản ${newUser.displayName} (${newUser.email})`
    });

    return { success: true, user: newUser };
  },

  login(identifier: string, password?: string): { success: boolean; user?: UserProfile; error?: string } {
    const cleanId = identifier.trim().toLowerCase();
    const cleanPass = password?.trim() || '';

    if (!cleanId) {
      return { success: false, error: 'Vui lòng nhập tên đăng nhập hoặc email.' };
    }

    // 1. Check Admin Credentials: username 'admin' or email 'admin@heritageai.vn' with password 'AINHS2026'
    if (cleanId === 'admin' || cleanId === 'admin@heritageai.vn' || cleanId === 'admin@gmail.com') {
      if (cleanPass === 'AINHS2026') {
        const adminAccount: UserProfile = {
          ...DEFAULT_ADMIN_ACCOUNT,
          isLoggedIn: true,
          lastLoginAt: new Date().toISOString()
        };

        const accounts = this.getAccounts();
        const otherAccounts = accounts.filter(a => a.id !== 'user-admin' && a.email.toLowerCase() !== 'admin@heritageai.vn');
        otherAccounts.push(adminAccount);
        localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(otherAccounts));
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(adminAccount));

        // Sync admin login to Firestore and server
        saveUserToFirestore(adminAccount).catch(err => console.warn('Firestore admin login save warning:', err));
        fetch('/api/accounts/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ identifier: cleanId, password: cleanPass })
        }).catch(err => console.warn('Server admin login sync warning:', err));

        this.logActivity({
          userId: adminAccount.id,
          actionType: 'auth',
          title: 'Đăng nhập Quản trị viên',
          description: 'Quản trị viên đã đăng nhập thành công vào Hệ thống Hồn Đất Việt'
        });

        return { success: true, user: adminAccount };
      } else {
        return { success: false, error: 'Mật khẩu quản trị viên không chính xác.' };
      }
    }

    // 2. Regular user authentication
    const accounts = this.getAccounts();
    const account = accounts.find(a => 
      a.email.toLowerCase() === cleanId || 
      a.displayName.toLowerCase() === cleanId ||
      a.id.toLowerCase() === cleanId
    );

    if (!account) {
      return { 
        success: false, 
        error: 'Tài khoản không tồn tại. Vui lòng kiểm tra lại hoặc chuyển sang tab "Đăng Ký Mới".' 
      };
    }

    if (cleanPass && account.password && account.password !== cleanPass) {
      return { success: false, error: 'Mật khẩu không chính xác. Vui lòng thử lại.' };
    }

    account.lastLoginAt = new Date().toISOString();
    account.isLoggedIn = true;

    // Update in accounts list
    const updatedAccounts = accounts.map(a => a.id === account.id ? account : a);
    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(updatedAccounts));
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(account));

    // Sync login to Firestore and server
    saveUserToFirestore(account).catch(err => console.warn('Firestore login sync warning:', err));
    fetch('/api/accounts/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier: cleanId, password: cleanPass })
    }).catch(err => console.warn('Server login sync warning:', err));

    this.logActivity({
      userId: account.id,
      actionType: 'auth',
      title: 'Đăng nhập tài khoản',
      description: `Chào mừng ${account.displayName} quay trở lại Hồn Đất Việt`
    });

    return { success: true, user: account };
  },

  logout(): UserProfile {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(GUEST_USER));
    return GUEST_USER;
  },

  changePassword(oldPassword: string, newPassword: string): { success: boolean; error?: string } {
    const current = this.getCurrentUser();
    if (!current.isLoggedIn) {
      return { success: false, error: 'Bạn cần đăng nhập để đổi mật khẩu.' };
    }

    const cleanOld = oldPassword.trim();
    const cleanNew = newPassword.trim();

    if (!cleanOld || !cleanNew) {
      return { success: false, error: 'Vui lòng nhập đầy đủ mật khẩu cũ và mật khẩu mới.' };
    }

    if (cleanNew.length < 6) {
      return { success: false, error: 'Mật khẩu mới phải có tối thiểu 6 ký tự.' };
    }

    if (cleanOld === cleanNew) {
      return { success: false, error: 'Mật khẩu mới không được trùng với mật khẩu hiện tại.' };
    }

    // Verify old password
    const accounts = this.getAccounts();
    const account = accounts.find(a => a.id === current.id || a.email.toLowerCase() === current.email.toLowerCase());

    if (current.role === 'admin' || current.id === 'user-admin' || current.email.toLowerCase() === 'admin@heritageai.vn') {
      const currentAdminPass = account?.password || 'AINHS2026';
      if (cleanOld !== currentAdminPass && cleanOld !== 'AINHS2026') {
        return { success: false, error: 'Mật khẩu cũ của quản trị viên không chính xác.' };
      }
    } else {
      if (account?.password && account.password !== cleanOld) {
        return { success: false, error: 'Mật khẩu hiện tại không chính xác. Vui lòng kiểm tra lại.' };
      }
    }

    const updatedUser: UserProfile = {
      ...current,
      password: cleanNew
    };

    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedUser));

    const updatedAccounts = accounts.map(a => 
      (a.id === updatedUser.id || a.email.toLowerCase() === updatedUser.email.toLowerCase())
        ? { ...a, password: cleanNew }
        : a
    );
    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(updatedAccounts));

    // Sync to Firestore and server
    updatePasswordInFirestore(updatedUser.id, cleanNew).catch(err => console.warn('Firestore password change warning:', err));
    fetch('/api/accounts/change-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: updatedUser.id,
        oldPassword: cleanOld,
        newPassword: cleanNew
      })
    }).catch(err => console.warn('Server password change sync warning:', err));

    this.logActivity({
      userId: updatedUser.id,
      actionType: 'auth',
      title: 'Đổi mật khẩu tài khoản',
      description: `Tài khoản ${updatedUser.displayName} đã đổi mật khẩu bảo mật thành công.`
    });

    return { success: true };
  },

  resetPasswordByEmail(email: string, newPassword: string): { success: boolean; error?: string } {
    const cleanEmail = email.trim().toLowerCase();
    const cleanNew = newPassword.trim();

    if (!cleanEmail) {
      return { success: false, error: 'Vui lòng nhập địa chỉ email của bạn.' };
    }
    if (!cleanNew || cleanNew.length < 6) {
      return { success: false, error: 'Mật khẩu mới phải có độ dài tối thiểu 6 ký tự.' };
    }

    const accounts = this.getAccounts();
    const accountIndex = accounts.findIndex(a => 
      a.email.toLowerCase() === cleanEmail || 
      (cleanEmail === 'admin' && (a.id === 'user-admin' || a.role === 'admin'))
    );

    if (accountIndex < 0) {
      return { success: false, error: 'Không tìm thấy tài khoản tương ứng với email này trong hệ thống.' };
    }

    accounts[accountIndex].password = cleanNew;
    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));

    // If currently logged in as this user, update state too
    const current = this.getCurrentUser();
    if (current.id === accounts[accountIndex].id) {
      current.password = cleanNew;
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(current));
    }

    // Sync to Firestore and server
    resetPasswordInFirestoreByEmail(cleanEmail, cleanNew).catch(err => console.warn('Firestore reset password warning:', err));
    fetch('/api/accounts/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: cleanEmail,
        newPassword: cleanNew
      })
    }).catch(err => console.warn('Server reset password sync warning:', err));

    this.logActivity({
      userId: accounts[accountIndex].id,
      actionType: 'auth',
      title: 'Đặt lại mật khẩu',
      description: `Mật khẩu của tài khoản ${accounts[accountIndex].displayName} (${cleanEmail}) đã được đặt lại.`
    });

    return { success: true };
  },

  updateUserProfile(profileUpdate: Partial<UserProfile>): UserProfile {
    const current = this.getCurrentUser();
    const updated: UserProfile = {
      ...current,
      ...profileUpdate,
      displayName: profileUpdate.displayName ? cleanVietnameseText(profileUpdate.displayName) : current.displayName,
      city: profileUpdate.city ? cleanVietnameseText(profileUpdate.city) : current.city
    };

    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updated));

    // Also update in accounts list
    const accounts = this.getAccounts();
    const idx = accounts.findIndex(a => a.id === updated.id);
    if (idx >= 0) {
      accounts[idx] = updated;
      localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
    }

    // Sync profile update to Firestore and server
    saveUserToFirestore(updated).catch(err => console.warn('Firestore profile update warning:', err));
    fetch('/api/accounts/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated)
    }).catch(err => console.warn('Server profile update sync warning:', err));

    this.logActivity({
      userId: updated.id,
      actionType: 'profile',
      title: 'Cập nhật hồ sơ',
      description: 'Thông tin hồ sơ cá nhân đã được lưu trữ thành công.'
    });

    return updated;
  },

  // ==========================================
  // ACTION LOGGING & ACTIVITY TRACKING
  // ==========================================
  getActivities(userId?: string): UserActivityLog[] {
    try {
      const data = localStorage.getItem(ACTIVITIES_KEY);
      const all: UserActivityLog[] = data ? JSON.parse(data) : [];
      if (userId) {
        return all.filter(a => a.userId === userId);
      }
      return all;
    } catch {
      return [];
    }
  },

  async fetchActivities(userId?: string): Promise<UserActivityLog[]> {
    const local = this.getActivities(userId);
    try {
      const res = await fetch('/api/activities');
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.activities)) {
          const map = new Map<string, UserActivityLog>();
          local.forEach(a => map.set(a.id, a));
          data.activities.forEach((a: UserActivityLog) => map.set(a.id, a));
          const merged = Array.from(map.values()).sort((a, b) => 
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
          );
          localStorage.setItem(ACTIVITIES_KEY, JSON.stringify(merged.slice(0, 300)));
          if (userId) return merged.filter(a => a.userId === userId);
          return merged;
        }
      }
    } catch (err) {
      console.warn('Unable to sync activities from server:', err);
    }
    return local;
  },

  logActivity(activity: {
    userId?: string;
    userName?: string;
    userRole?: 'user' | 'student' | 'researcher' | 'admin';
    userEmail?: string;
    actionType: UserActionType;
    title: string;
    description: string;
    targetId?: string;
    metadata?: Record<string, any>;
    pointsEarned?: number;
  }): UserActivityLog {
    const current = this.getCurrentUser();
    const targetUserId = activity.userId || current.id;
    const allActivities = this.getActivities();

    const newLog: UserActivityLog = {
      id: 'act-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
      userId: targetUserId,
      userName: activity.userName || current.displayName || (current.role === 'admin' ? 'Quản trị viên Hệ thống' : 'Người dùng'),
      userRole: activity.userRole || current.role || 'user',
      userEmail: activity.userEmail || current.email,
      actionType: activity.actionType,
      title: cleanVietnameseText(activity.title),
      description: cleanVietnameseText(activity.description),
      timestamp: new Date().toISOString(),
      targetId: activity.targetId,
      pointsEarned: activity.pointsEarned,
      metadata: activity.metadata
    };

    allActivities.unshift(newLog);
    // Keep last 300 activities to ensure a full persistent trail
    const trimmed = allActivities.slice(0, 300);
    localStorage.setItem(ACTIVITIES_KEY, JSON.stringify(trimmed));

    // Sync to server database
    fetch('/api/activities', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newLog)
    }).catch(err => console.warn('Server activity log sync warning:', err));

    // Award XP points & update counts
    const pointsToAdd = activity.pointsEarned || 20;
    if (current.isLoggedIn && current.id === targetUserId) {
      current.points = (current.points || 0) + pointsToAdd;
      
      // Update specific counters
      if (activity.actionType === 'recognize') current.recognitionsCount = (current.recognitionsCount || 0) + 1;
      if (activity.actionType === 'story') current.storiesCreated = (current.storiesCreated || 0) + 1;
      if (activity.actionType === 'itinerary') current.itinerariesCount = (current.itinerariesCount || 0) + 1;
      if (activity.actionType === 'quiz') current.quizzesCompleted = (current.quizzesCompleted || 0) + 1;
      if (activity.actionType === 'community') current.contributionsCount = (current.contributionsCount || 0) + 1;

      // Update level
      if (current.points >= 2000) current.level = 'Đại Sứ Di Sản Quốc Gia (Cấp 5)';
      else if (current.points >= 1000) current.level = 'Sứ Giả Văn Hóa (Cấp 4)';
      else if (current.points >= 500) current.level = 'Thành Viên Tích Cực (Cấp 3)';
      else if (current.points >= 200) current.level = 'Nhà Khám Phá Trẻ (Cấp 2)';

      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(current));
    }

    return newLog;
  },

  clearActivities(userId?: string): void {
    if (!userId) {
      localStorage.setItem(ACTIVITIES_KEY, JSON.stringify([]));
      fetch('/api/activities', { method: 'DELETE' }).catch(() => {});
    } else {
      const all = this.getActivities().filter(a => a.userId !== userId);
      localStorage.setItem(ACTIVITIES_KEY, JSON.stringify(all));
    }
  },

  deleteAccount(userId: string): { success: boolean; error?: string } {
    if (userId === 'user-admin') {
      return { success: false, error: 'Không thể xóa tài khoản Quản trị viên gốc của hệ thống.' };
    }
    const accounts = this.getAccounts();
    const target = accounts.find(a => a.id === userId);
    if (!target) {
      return { success: false, error: 'Không tìm thấy tài khoản cần xóa.' };
    }
    const filtered = accounts.filter(a => a.id !== userId);
    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(filtered));

    fetch(`/api/accounts/${userId}`, { method: 'DELETE' }).catch(() => {});

    this.logActivity({
      actionType: 'admin_action',
      title: 'Xóa tài khoản người dùng',
      description: `Quản trị viên đã xóa tài khoản ${target.displayName} (${target.email}) khỏi web`,
      targetId: userId
    });

    return { success: true };
  },

  exportAuditLogs(): string {
    const logs = this.getActivities();
    return JSON.stringify(logs, null, 2);
  },

  exportAccounts(): string {
    const accounts = this.getAccounts().map(a => ({
      id: a.id,
      displayName: a.displayName,
      email: a.email,
      role: a.role,
      roleLabel: a.roleLabel,
      city: a.city,
      points: a.points,
      level: a.level,
      createdAt: a.createdAt,
      lastLoginAt: a.lastLoginAt
    }));
    return JSON.stringify(accounts, null, 2);
  },

  // ==========================================
  // FAVORITES
  // ==========================================
  getFavorites(): string[] {
    try {
      const data = localStorage.getItem(FAVORITES_KEY);
      return data ? JSON.parse(data) : ['dai-noi-hue', 'van-mieu-quoc-tu-giam', 'pho-co-hoi-an'];
    } catch {
      return ['dai-noi-hue'];
    }
  },

  toggleFavorite(id: string, heritageName?: string): boolean {
    const list = this.getFavorites();
    const index = list.indexOf(id);
    let isFav = false;
    if (index >= 0) {
      list.splice(index, 1);
      isFav = false;
      this.logActivity({
        actionType: 'favorite',
        title: 'Bỏ lưu di sản',
        description: `Đã xóa di sản "${heritageName || id}" khỏi bộ sưu tập yêu thích`,
        targetId: id
      });
    } else {
      list.push(id);
      isFav = true;
      this.logActivity({
        actionType: 'favorite',
        title: 'Lưu di sản yêu thích',
        description: `Đã thêm di sản "${heritageName || id}" vào bộ sưu tập yêu thích`,
        targetId: id,
        pointsEarned: 15
      });
    }
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(list));
    
    // Update count on current profile
    const current = this.getCurrentUser();
    current.favoritesCount = list.length;
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(current));
    return isFav;
  },

  isFavorite(id: string): boolean {
    return this.getFavorites().includes(id);
  },

  // ==========================================
  // FAMILY ORAL STORIES
  // ==========================================
  getFamilyStories(): FamilyStoryMemory[] {
    try {
      const data = localStorage.getItem(STORIES_KEY);
      if (data) {
        return JSON.parse(data);
      }
      localStorage.setItem(STORIES_KEY, JSON.stringify(DEMO_GRANDPARENT_STORIES));
      return DEMO_GRANDPARENT_STORIES;
    } catch {
      return DEMO_GRANDPARENT_STORIES;
    }
  },

  saveFamilyStory(story: Omit<FamilyStoryMemory, 'id' | 'createdAt'>): FamilyStoryMemory {
    const list = this.getFamilyStories();
    const newStory: FamilyStoryMemory = {
      ...story,
      id: 'story-' + Date.now(),
      createdAt: new Date().toISOString()
    };
    list.unshift(newStory);
    localStorage.setItem(STORIES_KEY, JSON.stringify(list));

    this.logActivity({
      actionType: 'memory',
      title: 'Lưu ký ức ông bà',
      description: `Đã lưu bản ghi: "${newStory.topic || 'Ký ức gia đình'}" (${newStory.tellerName})`,
      targetId: newStory.id,
      pointsEarned: 50
    });

    return newStory;
  },

  deleteFamilyStory(id: string): void {
    const list = this.getFamilyStories().filter(s => s.id !== id);
    localStorage.setItem(STORIES_KEY, JSON.stringify(list));
    this.logActivity({
      actionType: 'memory',
      title: 'Xóa ký ức gia đình',
      description: 'Đã xóa bản ghi ký ức khỏi danh sách lưu trữ'
    });
  },

  // ==========================================
  // COMMUNITY CONTRIBUTIONS
  // ==========================================
  getCommunityContributions(): CommunityContribution[] {
    try {
      const data = localStorage.getItem(POSTS_KEY);
      if (data) return JSON.parse(data);
      const initial: CommunityContribution[] = [
        {
          id: 'post-1',
          userId: 'user-community-1',
          authorName: 'Trần Hoàng Nam (SV Đại học Huế)',
          contributorName: 'Trần Hoàng Nam (SV Đại học Huế)',
          title: 'Khám phá Lăng Gia Long hoang sơ giữa rừng thông Thiên Thọ',
          category: 'Di tích Cố đô',
          location: 'Hương Thọ, TP. Huế',
          description: 'Lăng vua Gia Long ít người ghé hơn lăng Khải Định hay Tự Đức nhưng không gian non nước tuyệt đẹp, phong thủy sơn thủy hữu tình.',
          content: 'Lăng vua Gia Long ít người ghé hơn lăng Khải Định hay Tự Đức nhưng không gian non nước tuyệt đẹp, phong thủy sơn thủy hữu tình.',
          sourceReference: 'Tư liệu khảo sát thực địa & lời kể cư dân Hương Thọ',
          imageUrl: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=600&q=80',
          status: 'verified',
          submittedAt: '2026-09-14T08:00:00Z',
          createdAt: '2026-09-14T08:00:00Z',
          likesCount: 18,
          likedByUsers: [],
          comments: [
            {
              id: 'comment-1',
              authorName: 'TS. Nguyễn Văn Phúc',
              authorRole: 'admin',
              content: 'Tư liệu rất giá trị! Phong cảnh lăng Gia Long cần được bảo tồn nguyên sơ như này.',
              createdAt: '2026-09-15T09:30:00Z'
            },
            {
              id: 'comment-2',
              authorName: 'Lê Thanh Hải (Hội Sử Học)',
              authorRole: 'student',
              content: 'Mình vừa ghé tuần trước, đường vào rợp bóng thông xanh rất thơ mộng.',
              createdAt: '2026-09-15T14:20:00Z'
            }
          ]
        },
        {
          id: 'post-2',
          userId: 'user-community-2',
          authorName: 'Nguyễn Thị Bích Ngọc',
          contributorName: 'Nguyễn Thị Bích Ngọc',
          title: 'Lễ hội Đua thuyền truyền thống trên sông Kiến Giang',
          category: 'Lễ hội Dân gian',
          location: 'Lệ Thủy, Quảng Bình',
          description: 'Mỗi dịp Quốc khánh 2/9, người dân quê hương Đại tướng náo nức với tiếng reo hò rộn rã hai bờ sông.',
          content: 'Mỗi dịp Quốc khánh 2/9, người dân quê hương Đại tướng náo nức với tiếng reo hò rộn rã hai bờ sông.',
          sourceReference: 'Di sản văn hóa phi vật thể Quốc gia 2019',
          imageUrl: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=600&q=80',
          status: 'pending_review',
          submittedAt: '2026-09-16T11:20:00Z',
          createdAt: '2026-09-16T11:20:00Z',
          likesCount: 5,
          likedByUsers: [],
          comments: []
        }
      ];
      localStorage.setItem(POSTS_KEY, JSON.stringify(initial));
      return initial;
    } catch {
      return [];
    }
  },

  getCommunityPosts(): CommunityContribution[] {
    return this.getCommunityContributions();
  },

  saveCommunityContribution(post: Omit<CommunityContribution, 'id' | 'status' | 'submittedAt' | 'createdAt'> & { status?: any }): CommunityContribution {
    const list = this.getCommunityContributions();
    const newPost: CommunityContribution = {
      ...post,
      id: 'post-' + Date.now(),
      status: post.status || 'pending_review',
      submittedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      likesCount: post.likesCount || 0,
      likedByUsers: [],
      comments: []
    };
    list.unshift(newPost);
    localStorage.setItem(POSTS_KEY, JSON.stringify(list));

    this.logActivity({
      actionType: 'community',
      title: 'Đóng góp tư liệu di sản',
      description: `Đã gửi bài: "${newPost.title}" (${newPost.location})`,
      targetId: newPost.id,
      pointsEarned: 40
    });

    return newPost;
  },

  addCommunityPost(post: Omit<CommunityContribution, 'id' | 'status' | 'submittedAt'>): CommunityContribution {
    return this.saveCommunityContribution(post);
  },

  updatePostStatus(id: string, status: 'approved' | 'rejected' | 'verified'): void {
    const list = this.getCommunityContributions().map(p => p.id === id ? { ...p, status } : p);
    localStorage.setItem(POSTS_KEY, JSON.stringify(list));

    const targetPost = list.find(p => p.id === id);
    const statusText = status === 'approved' || status === 'verified' ? 'Duyệt xuất bản' : 'Từ chối';
    this.logActivity({
      actionType: 'admin_action',
      title: `${statusText} bài đóng góp`,
      description: `Quản trị viên đã ${statusText.toLowerCase()} bài đóng góp: "${targetPost?.title || id}"`,
      targetId: id
    });
  },

  deleteCommunityContribution(id: string): void {
    const list = this.getCommunityContributions();
    const target = list.find(p => p.id === id);
    const updated = list.filter(p => p.id !== id);
    localStorage.setItem(POSTS_KEY, JSON.stringify(updated));

    this.logActivity({
      actionType: 'admin_action',
      title: 'Xóa bài đăng cộng đồng',
      description: `Quản trị viên đã xóa bài đóng góp: "${target?.title || id}"`,
      targetId: id
    });
  },

  toggleLikeCommunityPost(id: string, userId: string = 'guest-user'): { likesCount: number; isLiked: boolean } {
    const list = this.getCommunityContributions();
    let isLiked = false;
    let newLikesCount = 0;

    const updated = list.map(p => {
      if (p.id === id) {
        const likedBy = p.likedByUsers || [];
        const userIndex = likedBy.indexOf(userId);
        let updatedLikes = p.likesCount || 0;

        if (userIndex >= 0) {
          // Unlike
          likedBy.splice(userIndex, 1);
          updatedLikes = Math.max(0, updatedLikes - 1);
          isLiked = false;
        } else {
          // Like
          likedBy.push(userId);
          updatedLikes += 1;
          isLiked = true;
        }

        newLikesCount = updatedLikes;
        return { ...p, likesCount: updatedLikes, likedByUsers: likedBy };
      }
      return p;
    });

    localStorage.setItem(POSTS_KEY, JSON.stringify(updated));
    return { likesCount: newLikesCount, isLiked };
  },

  addCommentToCommunityPost(postId: string, commentData: { authorName: string; authorAvatar?: string; authorRole?: string; content: string; userId?: string }): ContributionComment[] {
    const list = this.getCommunityContributions();
    let updatedComments: ContributionComment[] = [];

    const updated = list.map(p => {
      if (p.id === postId) {
        const comments = p.comments || [];
        const newComment: ContributionComment = {
          id: 'comment-' + Date.now(),
          userId: commentData.userId || 'user-' + Date.now(),
          authorName: commentData.authorName || 'Thành viên Di sản',
          authorAvatar: commentData.authorAvatar,
          authorRole: commentData.authorRole || 'user',
          content: commentData.content,
          createdAt: new Date().toISOString()
        };
        comments.push(newComment);
        updatedComments = comments;
        return { ...p, comments };
      }
      return p;
    });

    localStorage.setItem(POSTS_KEY, JSON.stringify(updated));
    return updatedComments;
  },

  deleteCommentFromCommunityPost(postId: string, commentId: string): ContributionComment[] {
    const list = this.getCommunityContributions();
    let updatedComments: ContributionComment[] = [];

    const updated = list.map(p => {
      if (p.id === postId) {
        const comments = (p.comments || []).filter(c => c.id !== commentId);
        updatedComments = comments;
        return { ...p, comments };
      }
      return p;
    });

    localStorage.setItem(POSTS_KEY, JSON.stringify(updated));
    return updatedComments;
  },

  // ==========================================
  // SAVED ITINERARIES
  // ==========================================
  getSavedItineraries(): ItineraryPlan[] {
    try {
      const data = localStorage.getItem(ITINERARIES_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  saveItinerary(itinerary: ItineraryPlan): void {
    const list = this.getSavedItineraries();
    const filtered = list.filter(i => i.id !== itinerary.id);
    filtered.unshift(itinerary);
    localStorage.setItem(ITINERARIES_KEY, JSON.stringify(filtered));

    this.logActivity({
      actionType: 'itinerary',
      title: 'Lưu lịch trình du lịch',
      description: `Đã lưu lịch trình "${itinerary.title}" (${itinerary.duration})`,
      targetId: itinerary.id,
      pointsEarned: 30
    });
  },

  // ==========================================
  // HERITAGE MASTER DATA MANAGEMENT (ADMIN)
  // ==========================================
  getHeritages(): HeritageItem[] {
    try {
      const data = localStorage.getItem(HERITAGES_KEY);
      if (data) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Self-heal: ensure authentic images are used across all heritage sites
          let hasHealed = false;
          const healed = parsed.map((item: HeritageItem) => {
            if (item.id === 'van-mieu-quoc-tu-giam' && (!item.imageUrl || item.imageUrl.includes('1599707367072'))) {
              hasHealed = true;
              return { ...item, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/31/Hanoi_Temple_of_Literature.jpg' };
            }
            if (item.id === 'dai-noi-hue' && (!item.imageUrl || item.imageUrl.includes('1583417319070') || item.imageUrl.includes('unsplash'))) {
              hasHealed = true;
              return { 
                ...item, 
                imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Meridian_Gate%2C_Hue_%28I%29.jpg',
                historicImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/5f/Annam_-_Hu%C3%A9_-_Porte_d%27entr%C3%A9e_du_Palais_Royal.jpg',
                historicImageYear: 'Ảnh tư liệu Cổng Ngọ Môn Cung Đình Huế (Đầu thế kỷ 20)'
              };
            }
            if (item.id === 'pho-co-hoi-an' && (!item.imageUrl || item.imageUrl.includes('1555939594') || item.imageUrl.includes('unsplash'))) {
              hasHealed = true;
              return { 
                ...item, 
                imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/f3/PhoCoHoiAn.jpg',
                historicImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Cau_Nhat_Ban.jpg',
                historicImageYear: 'Chùa Cầu (Lai Viễn Kiều) - Di tích biểu tượng hơn 400 năm tuổi'
              };
            }
            if (item.id === 'trang-an-ninh-binh' && (!item.imageUrl || item.imageUrl.includes('unsplash'))) {
              hasHealed = true;
              return { ...item, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Muaxuantamcoc.jpg' };
            }
            if (item.id === 'thanh-dia-my-son' && (!item.imageUrl || item.imageUrl.includes('unsplash'))) {
              hasHealed = true;
              return { ...item, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/A_far_view_of_the_ruins_at_My_Son_%2830992152933%29.jpg/1280px-A_far_view_of_the_ruins_at_My_Son_%2830992152933%29.jpg' };
            }
            if (item.id === 'vinh-ha-long' && (!item.imageUrl || item.imageUrl.includes('unsplash'))) {
              hasHealed = true;
              return { ...item, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Ha_Long_Bay_in_2019.jpg/1280px-Ha_Long_Bay_in_2019.jpg' };
            }
            if (item.id === 'chua-thien-mu' && (!item.imageUrl || item.imageUrl.includes('unsplash'))) {
              hasHealed = true;
              return { ...item, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/ThienMuPagoda.jpg/1280px-ThienMuPagoda.jpg' };
            }
            if (item.id === 'dinh-doc-lap' && (!item.imageUrl || item.imageUrl.includes('unsplash'))) {
              hasHealed = true;
              return { 
                ...item, 
                imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/20190923_Independence_Palace-10.jpg/1280px-20190923_Independence_Palace-10.jpg',
                historicImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Dinh_Doc_Lap_1966.jpg/1280px-Dinh_Doc_Lap_1966.jpg',
                historicImageYear: 'Dinh Độc Lập năm 1966 (KTS Ngô Viết Thụ thiết kế)'
              };
            }
            return item;
          });

          // Also merge any new heritages from HERITAGE_DATABASE that might not be in local storage
          const existingHIds = new Set(healed.map((h: HeritageItem) => h.id));
          for (const def of HERITAGE_DATABASE) {
            if (!existingHIds.has(def.id)) {
              healed.push(def);
              hasHealed = true;
            }
          }

          if (hasHealed) {
            localStorage.setItem(HERITAGES_KEY, JSON.stringify(healed));
          }
          return healed;
        }
      }
    } catch (e) {
      console.warn('Error reading stored heritages:', e);
    }
    return HERITAGE_DATABASE;
  },

  async fetchHeritages(): Promise<HeritageItem[]> {
    try {
      const res = await fetch('/api/heritages');
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.heritages)) {
          localStorage.setItem(HERITAGES_KEY, JSON.stringify(data.heritages));
          window.dispatchEvent(new CustomEvent('heritage-data-updated'));
          return data.heritages;
        }
      }
    } catch (e) {
      console.warn('Cannot fetch heritages from server:', e);
    }
    return this.getHeritages();
  },

  async saveHeritages(items: HeritageItem[]): Promise<void> {
    try {
      localStorage.setItem(HERITAGES_KEY, JSON.stringify(items));
      window.dispatchEvent(new CustomEvent('heritage-data-updated'));
      await fetch('/api/heritages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ heritages: items })
      }).catch(err => console.warn('Server sync error for heritages:', err));
    } catch (e) {
      console.error('Error saving heritages:', e);
    }
  },

  async updateHeritage(heritage: HeritageItem): Promise<void> {
    const list = [...this.getHeritages()];
    const index = list.findIndex(h => h.id === heritage.id);
    if (index >= 0) {
      list[index] = heritage;
    } else {
      list.unshift(heritage);
    }
    await this.saveHeritages(list);
    this.logActivity({
      actionType: 'admin_action',
      title: index >= 0 ? 'Cập nhật nội dung di sản' : 'Thêm di sản mới',
      description: `Quản trị viên đã ${index >= 0 ? 'cập nhật thông tin' : 'thêm mới'} di sản "${heritage.name}" (${heritage.province})`,
      targetId: heritage.id
    });
  },

  async deleteHeritage(id: string): Promise<void> {
    const list = this.getHeritages();
    const target = list.find(h => h.id === id);
    const updated = list.filter(h => h.id !== id);
    await this.saveHeritages(updated);
    if (target) {
      this.logActivity({
        actionType: 'admin_action',
        title: 'Xóa di sản khỏi hệ thống',
        description: `Quản trị viên đã xóa di sản "${target.name}" (${target.province})`,
        targetId: id
      });
    }
  },

  async resetHeritages(): Promise<void> {
    localStorage.removeItem(HERITAGES_KEY);
    await this.saveHeritages(HERITAGE_DATABASE);
    this.logActivity({
      actionType: 'admin_action',
      title: 'Khôi phục dữ liệu di sản gốc',
      description: 'Quản trị viên đã khôi phục toàn bộ danh mục di sản về cơ sở dữ liệu gốc chuẩn mực.'
    });
  },

  // ==========================================
  // PLACES NEAR HERITAGE MANAGEMENT (ADMIN)
  // ==========================================
  getPlaces(): Record<string, PlaceItem[]> {
    try {
      const data = localStorage.getItem(PLACES_KEY);
      if (data) {
        const parsed = JSON.parse(data);
        if (parsed && typeof parsed === 'object') {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Error reading stored places:', e);
    }
    return PLACES_NEAR_HERITAGE;
  },

  async fetchPlaces(): Promise<Record<string, PlaceItem[]>> {
    try {
      const res = await fetch('/api/places');
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.places && typeof data.places === 'object') {
          localStorage.setItem(PLACES_KEY, JSON.stringify(data.places));
          window.dispatchEvent(new CustomEvent('heritage-data-updated'));
          return data.places;
        }
      }
    } catch (e) {
      console.warn('Cannot fetch places from server:', e);
    }
    return this.getPlaces();
  },

  async savePlaces(places: Record<string, PlaceItem[]>): Promise<void> {
    try {
      localStorage.setItem(PLACES_KEY, JSON.stringify(places));
      window.dispatchEvent(new CustomEvent('heritage-data-updated'));
      await fetch('/api/places', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ places })
      }).catch(err => console.warn('Server sync error for places:', err));
    } catch (e) {
      console.error('Error saving places:', e);
    }
  },

  async updatePlace(heritageId: string, place: PlaceItem): Promise<void> {
    const placesMap = { ...this.getPlaces() };
    const currentList = placesMap[heritageId] ? [...placesMap[heritageId]] : [];
    const index = currentList.findIndex(p => p.id === place.id);
    if (index >= 0) {
      currentList[index] = place;
    } else {
      currentList.unshift(place);
    }
    placesMap[heritageId] = currentList;
    await this.savePlaces(placesMap);
    this.logActivity({
      actionType: 'admin_action',
      title: index >= 0 ? 'Cập nhật địa điểm ăn uống & trải nghiệm' : 'Thêm địa điểm lân cận mới',
      description: `Quản trị viên đã ${index >= 0 ? 'cập nhật' : 'thêm mới'} địa điểm "${place.name}" (${place.categoryLabel})`,
      targetId: place.id
    });
  },

  async deletePlace(heritageId: string, placeId: string): Promise<void> {
    const placesMap = { ...this.getPlaces() };
    let foundTarget: PlaceItem | undefined;

    if (placesMap[heritageId]) {
      foundTarget = placesMap[heritageId].find(p => p.id === placeId);
      placesMap[heritageId] = placesMap[heritageId].filter(p => p.id !== placeId);
    }

    // Always sweep all heritage keys to guarantee removal even if placeId was registered under another heritage
    Object.keys(placesMap).forEach(hId => {
      if (Array.isArray(placesMap[hId])) {
        if (!foundTarget) {
          foundTarget = placesMap[hId].find(p => p.id === placeId);
        }
        placesMap[hId] = placesMap[hId].filter(p => p.id !== placeId);
      }
    });

    await this.savePlaces(placesMap);

    this.logActivity({
      actionType: 'admin_action',
      title: 'Xóa địa điểm lân cận',
      description: `Quản trị viên đã xóa địa điểm "${foundTarget?.name || placeId}" khỏi hệ thống`,
      targetId: placeId
    });
  },

  async resetPlaces(): Promise<void> {
    localStorage.removeItem(PLACES_KEY);
    await this.savePlaces(PLACES_NEAR_HERITAGE);
    this.logActivity({
      actionType: 'admin_action',
      title: 'Khôi phục danh sách địa điểm lân cận gốc',
      description: 'Quản trị viên đã khôi phục toàn bộ danh sách ẩm thực & trải nghiệm lân cận về dữ liệu gốc.'
    });
  },

  getTourGuideConfig(): AITourGuideConfig {
    try {
      const stored = localStorage.getItem(TOUR_GUIDE_CONFIG_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Error reading tour guide config from localStorage:', e);
    }
    return DEFAULT_TOUR_GUIDE_CONFIG;
  },

  async fetchTourGuideConfig(): Promise<AITourGuideConfig> {
    try {
      const res = await fetch('/api/ai/tour-guide-config');
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.config) {
          localStorage.setItem(TOUR_GUIDE_CONFIG_KEY, JSON.stringify(data.config));
          return data.config;
        }
      }
    } catch (e) {
      console.warn('Error fetching tour guide config from server:', e);
    }
    return this.getTourGuideConfig();
  },

  saveTourGuideConfig(config: AITourGuideConfig): void {
    try {
      const updatedConfig = { ...config, updatedAt: new Date().toISOString() };
      localStorage.setItem(TOUR_GUIDE_CONFIG_KEY, JSON.stringify(updatedConfig));
      window.dispatchEvent(new CustomEvent('tour-guide-config-updated', { detail: updatedConfig }));

      // Sync to backend server
      fetch('/api/ai/tour-guide-config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ config: updatedConfig })
      }).catch(err => console.warn('Server sync error for tour guide config:', err));

      this.logActivity({
        actionType: 'admin_action',
        title: 'Huấn luyện & Cập nhật Hướng Dẫn Viên AI',
        description: `Quản trị viên đã cập nhật nhân dạng "${updatedConfig.guideName}", bộ quy tắc và tri thức chuyên biệt cho AI Tour Guide.`,
        pointsEarned: 25
      });
    } catch (e) {
      console.error('Error saving tour guide config:', e);
    }
  },

  resetTourGuideConfig(): void {
    localStorage.removeItem(TOUR_GUIDE_CONFIG_KEY);
    this.saveTourGuideConfig(DEFAULT_TOUR_GUIDE_CONFIG);
  },

  // ==========================================
  // CITY LANDMARK BACKGROUNDS MANAGEMENT (ADMIN)
  // ==========================================
  getLandmarkBackgrounds(): CityLandmarkBackground[] {
    try {
      const data = localStorage.getItem(LANDMARKS_KEY);
      if (data) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Self-heal: ensure authentic landmark images are used across all regions
          let hasHealed = false;
          const healed = parsed.map((item: CityLandmarkBackground) => {
            if (item.id === 'hanoi' && (!item.imageUrl || item.imageUrl.includes('1599707367072'))) {
              hasHealed = true;
              return { 
                ...item, 
                imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/31/Hanoi_Temple_of_Literature.jpg',
                landmarkName: 'Văn Miếu - Quốc Tử Giám & Hồ Gươm'
              };
            }
            if (item.id === 'tphcm' && (!item.imageUrl || item.imageUrl.includes('unsplash'))) {
              hasHealed = true;
              return {
                ...item,
                imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/20190923_Independence_Palace-10.jpg/1280px-20190923_Independence_Palace-10.jpg',
                landmarkName: 'Dinh Độc Lập & Hội Trường Thống Nhất'
              };
            }
            if (item.id === 'hue' && (!item.imageUrl || item.imageUrl.includes('1583417319070') || item.imageUrl.includes('unsplash'))) {
              hasHealed = true;
              return { 
                ...item, 
                imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Meridian_Gate%2C_Hue_%28I%29.jpg',
                landmarkName: 'Đại Nội Cung Đình Huế & Cổng Ngọ Môn'
              };
            }
            if (item.id === 'danang' && (!item.imageUrl || item.imageUrl.includes('unsplash'))) {
              hasHealed = true;
              return {
                ...item,
                imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/84152-Da-Nang_%2848572442536%29.jpg/1280px-84152-Da-Nang_%2848572442536%29.jpg',
                landmarkName: 'Cầu Vàng Bà Nà Hills - Bàn Tay Khổng Lồ'
              };
            }
            if (item.id === 'myson' && (!item.imageUrl || item.imageUrl.includes('unsplash'))) {
              hasHealed = true;
              return {
                ...item,
                imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/A_far_view_of_the_ruins_at_My_Son_%2830992152933%29.jpg/1280px-A_far_view_of_the_ruins_at_My_Son_%2830992152933%29.jpg',
                landmarkName: 'Thánh Địa Mỹ Sơn & Tháp Chăm Cổ'
              };
            }
            if (item.id === 'hoian' && (!item.imageUrl || item.imageUrl.includes('1555939594') || item.imageUrl.includes('unsplash'))) {
              hasHealed = true;
              return { 
                ...item, 
                imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/f3/PhoCoHoiAn.jpg',
                landmarkName: 'Phố Cổ Hội An & Chùa Cầu'
              };
            }
            if (item.id === 'ninhbinh' && (!item.imageUrl || item.imageUrl.includes('unsplash'))) {
              hasHealed = true;
              return {
                ...item,
                imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Muaxuantamcoc.jpg',
                landmarkName: 'Quần thể Danh thắng Tràng An & Tam Cốc'
              };
            }
            if (item.id === 'halong' && (!item.imageUrl || item.imageUrl.includes('unsplash'))) {
              hasHealed = true;
              return {
                ...item,
                imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Ha_Long_Bay_in_2019.jpg/1280px-Ha_Long_Bay_in_2019.jpg',
                landmarkName: 'Vịnh Hạ Long & Quần đảo Cát Bà'
              };
            }
            if (item.id === 'dalat' && (!item.imageUrl || item.imageUrl.includes('unsplash'))) {
              hasHealed = true;
              return {
                ...item,
                imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Da_Lat_train_station_12.jpg/1280px-Da_Lat_train_station_12.jpg',
                landmarkName: 'Ga Xe Lửa Cổ Đà Lạt & Hồ Xuân Hương'
              };
            }
            if (item.id === 'cantho' && (!item.imageUrl || item.imageUrl.includes('unsplash'))) {
              hasHealed = true;
              return {
                ...item,
                imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Mua_ban_tren_song.jpg/1280px-Mua_ban_tren_song.jpg',
                landmarkName: 'Chợ nổi Cái Răng & Sông Nước Tây Đô'
              };
            }
            if (item.id === 'quangbinh' && (!item.imageUrl || item.imageUrl.includes('unsplash'))) {
              hasHealed = true;
              return {
                ...item,
                imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Phongnhacave.jpg',
                landmarkName: 'Vườn Quốc gia Phong Nha - Kẻ Bàng'
              };
            }
            if (item.id === 'hagiang' && (!item.imageUrl || item.imageUrl.includes('unsplash'))) {
              hasHealed = true;
              return {
                ...item,
                imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Lung_Cu_Flag_Tower.jpg/1280px-Lung_Cu_Flag_Tower.jpg',
                landmarkName: 'Cột Cờ Quốc Gia Lũng Cú & Cao Nguyên Đá Đồng Văn'
              };
            }
            if (item.id === 'nhatrang' && (!item.imageUrl || item.imageUrl.includes('unsplash'))) {
              hasHealed = true;
              return {
                ...item,
                imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Po_Nagar.jpg/1280px-Po_Nagar.jpg',
                landmarkName: 'Tháp Bà Ponagar & Vịnh Biển Nha Trang'
              };
            }
            if (item.id === 'sapa' && (!item.imageUrl || item.imageUrl.includes('unsplash'))) {
              hasHealed = true;
              return {
                ...item,
                imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Amit%C4%81bha_statue_on_Fansipan_1.jpg/1280px-Amit%C4%81bha_statue_on_Fansipan_1.jpg',
                landmarkName: 'Đỉnh Fansipan & Đại Tượng Phật Trên Mây'
              };
            }
            if (item.id === 'haiphong' && (!item.imageUrl || item.imageUrl.includes('unsplash'))) {
              hasHealed = true;
              return {
                ...item,
                imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Lan_Ha_Bay.jpg/1280px-Lan_Ha_Bay.jpg',
                landmarkName: 'Vịnh Lan Hạ & Quần đảo Cát Bà'
              };
            }
            return item;
          });

          // Also merge any missing default landmarks
          const existingIds = new Set(healed.map((l: CityLandmarkBackground) => l.id));
          for (const def of DEFAULT_CITY_LANDMARKS) {
            if (!existingIds.has(def.id)) {
              healed.push(def);
              hasHealed = true;
            }
          }

          if (hasHealed) {
            localStorage.setItem(LANDMARKS_KEY, JSON.stringify(healed));
          }
          return healed;
        }
      }
    } catch (e) {
      console.error('Error loading custom landmark backgrounds:', e);
    }
    return DEFAULT_CITY_LANDMARKS;
  },

  saveLandmarkBackground(landmark: CityLandmarkBackground): CityLandmarkBackground[] {
    const current = this.getLandmarkBackgrounds();
    const existingIndex = current.findIndex(l => l.id === landmark.id);
    let updated: CityLandmarkBackground[];
    if (existingIndex >= 0) {
      updated = [...current];
      updated[existingIndex] = landmark;
    } else {
      updated = [landmark, ...current];
    }
    localStorage.setItem(LANDMARKS_KEY, JSON.stringify(updated));

    this.logActivity({
      actionType: 'admin_action',
      title: 'Cập nhật ảnh nền danh thắng',
      description: `Admin đã lưu thông tin ảnh nền danh thắng: ${landmark.cityName} - ${landmark.landmarkName}`
    });

    window.dispatchEvent(new CustomEvent('landmarks-updated', { detail: updated }));
    return updated;
  },

  deleteLandmarkBackground(id: string): CityLandmarkBackground[] {
    const current = this.getLandmarkBackgrounds();
    const updated = current.filter(l => l.id !== id);
    localStorage.setItem(LANDMARKS_KEY, JSON.stringify(updated));

    this.logActivity({
      actionType: 'admin_action',
      title: 'Xóa ảnh nền danh thắng',
      description: `Admin đã xóa ảnh nền danh thắng có mã: ${id}`
    });

    window.dispatchEvent(new CustomEvent('landmarks-updated', { detail: updated }));
    return updated;
  },

  resetLandmarkBackgrounds(): CityLandmarkBackground[] {
    localStorage.removeItem(LANDMARKS_KEY);
    window.dispatchEvent(new CustomEvent('landmarks-updated', { detail: DEFAULT_CITY_LANDMARKS }));
    return DEFAULT_CITY_LANDMARKS;
  },

  // ==========================================
  // AI CUSTOM STORIES MANAGEMENT (ADMIN)
  // ==========================================
  getCustomStories(): Record<string, HeritageStory> {
    try {
      const data = localStorage.getItem(CUSTOM_STORIES_KEY);
      return data ? JSON.parse(data) : {};
    } catch {
      return {};
    }
  },

  getCustomStory(heritageNameOrId: string, mode: StoryMode): HeritageStory | null {
    const stories = this.getCustomStories();
    const key = `${heritageNameOrId.toLowerCase().trim()}_${mode}`;
    return stories[key] || null;
  },

  saveCustomStory(story: HeritageStory): void {
    const stories = this.getCustomStories();
    const key = `${(story.heritageId || story.heritageName).toLowerCase().trim()}_${story.mode}`;
    stories[key] = {
      ...story,
      heritageName: cleanVietnameseText(story.heritageName),
      title: cleanVietnameseText(story.title),
      storyText: cleanVietnameseText(story.storyText),
      historicalContext: cleanVietnameseText(story.historicalContext),
      distinctionNote: cleanVietnameseText(story.distinctionNote)
    };
    localStorage.setItem(CUSTOM_STORIES_KEY, JSON.stringify(stories));

    this.logActivity({
      actionType: 'admin_action',
      title: 'Biên tập nội dung kể chuyện AI',
      description: `Admin đã lưu chỉnh sửa câu chuyện di sản "${story.heritageName}" (Chế độ: ${story.mode})`
    });

    window.dispatchEvent(new CustomEvent('custom-stories-updated'));
  },

  deleteCustomStory(heritageNameOrId: string, mode: StoryMode): void {
    const stories = this.getCustomStories();
    const key = `${heritageNameOrId.toLowerCase().trim()}_${mode}`;
    delete stories[key];
    localStorage.setItem(CUSTOM_STORIES_KEY, JSON.stringify(stories));
    window.dispatchEvent(new CustomEvent('custom-stories-updated'));
  },

  getRecognitionSectionConfig(): RecognitionSectionConfig {
    try {
      const data = localStorage.getItem(RECOGNITION_CONFIG_KEY);
      if (data) {
        const parsed = JSON.parse(data) as RecognitionSectionConfig;
        if (parsed && Array.isArray(parsed.samples) && parsed.samples.length > 0) {
          // Self-heal: ensure authentic cultural images are used instead of broken/stock photos
          let hasHealed = false;
          const healedSamples = parsed.samples.map(sample => {
            // Check for outdated stock photos
            if (sample.id === 'dai-noi-hue' || sample.title.includes('Huế')) {
              if (!sample.url || sample.url.includes('unsplash') || sample.url.includes('1583417319070')) {
                hasHealed = true;
                return {
                  ...sample,
                  url: 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Meridian_Gate%2C_Hue_%28I%29.jpg',
                  category: sample.category || 'Hoàng thành & Cung điện',
                  prompt: sample.prompt || 'Nhận diện Cổng Ngọ Môn - Đại Nội Huế triều Nguyễn'
                };
              }
            }
            if (sample.id === 'van-mieu-hanoi' || sample.title.includes('Văn Miếu')) {
              if (!sample.url || sample.url.includes('unsplash') || sample.url.includes('1599707367072')) {
                hasHealed = true;
                return {
                  ...sample,
                  url: 'https://upload.wikimedia.org/wikipedia/commons/3/31/Hanoi_Temple_of_Literature.jpg',
                  category: sample.category || 'Di tích Lịch sử & Giáo dục',
                  prompt: sample.prompt || 'Nhận diện Khuê Văn Các và Bia Tiến sĩ Văn Miếu Hà Nội'
                };
              }
            }
            if (sample.id === 'chua-cau-hoi-an' || sample.title.includes('Chùa Cầu')) {
              if (!sample.url || sample.url.includes('unsplash') || sample.url.includes('1555939594')) {
                hasHealed = true;
                return {
                  ...sample,
                  url: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Cau_Nhat_Ban.jpg',
                  category: sample.category || 'Đô thị Cổ & Kiến trúc gỗ',
                  prompt: sample.prompt || 'Nhận diện Lai Viễn Kiều (Chùa Cầu) Hội An'
                };
              }
            }
            if (sample.id === 'gom-bat-trang' || sample.title.includes('Bát Tràng')) {
              if (!sample.url || sample.url.includes('unsplash') || sample.url.includes('1565193566173')) {
                hasHealed = true;
                return {
                  ...sample,
                  url: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/B%C3%A1t_Tr%C3%A0ng_DSC_0095.JPG',
                  category: sample.category || 'Làng nghề Thủ công Truyền thống',
                  prompt: sample.prompt || 'Nhận diện Gốm Bát Tràng và kỹ thuật men rạn cổ'
                };
              }
            }
            if (sample.id === 'ao-dai-co-phuc' || sample.title.includes('Áo Dài')) {
              if (!sample.url || sample.url.includes('unsplash') || sample.url.includes('1528127269322')) {
                hasHealed = true;
                return {
                  ...sample,
                  url: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/%C3%81o_d%C3%A0i_(6405924827).jpg',
                  category: sample.category || 'Trang phục Truyền thống',
                  prompt: sample.prompt || 'Nhận diện áo dài ngũ thân và trang phục truyền thống Việt Nam'
                };
              }
            }
            if (sample.id === 'chua-thien-mu' || sample.title.includes('Thiên Mụ')) {
              if (!sample.url || sample.url.includes('unsplash') || sample.url.includes('1544644181')) {
                hasHealed = true;
                return {
                  ...sample,
                  url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/ThienMuPagoda.jpg/1280px-ThienMuPagoda.jpg',
                  category: sample.category || 'Chùa cổ & Phật giáo',
                  prompt: sample.prompt || 'Nhận diện Tháp Phước Duyên Chùa Thiên Mụ bên bờ sông Hương'
                };
              }
            }
            return sample;
          });

          const healedConfig: RecognitionSectionConfig = {
            ...parsed,
            badge: cleanVietnameseText(parsed.badge || DEFAULT_RECOGNITION_SECTION_CONFIG.badge),
            title: cleanVietnameseText(parsed.title || DEFAULT_RECOGNITION_SECTION_CONFIG.title),
            description: cleanVietnameseText(parsed.description || DEFAULT_RECOGNITION_SECTION_CONFIG.description),
            samplesLabel: cleanVietnameseText(parsed.samplesLabel || DEFAULT_RECOGNITION_SECTION_CONFIG.samplesLabel),
            samples: healedSamples
          };

          if (hasHealed) {
            localStorage.setItem(RECOGNITION_CONFIG_KEY, JSON.stringify(healedConfig));
          }
          return healedConfig;
        }
      }
    } catch (e) {
      console.error('Error loading recognition section config:', e);
    }
    return DEFAULT_RECOGNITION_SECTION_CONFIG;
  },

  saveRecognitionSectionConfig(config: RecognitionSectionConfig, adminName?: string): RecognitionSectionConfig {
    const cleanedConfig: RecognitionSectionConfig = {
      badge: cleanVietnameseText(config.badge || DEFAULT_RECOGNITION_SECTION_CONFIG.badge),
      title: cleanVietnameseText(config.title || DEFAULT_RECOGNITION_SECTION_CONFIG.title),
      description: cleanVietnameseText(config.description || DEFAULT_RECOGNITION_SECTION_CONFIG.description),
      samplesLabel: cleanVietnameseText(config.samplesLabel || DEFAULT_RECOGNITION_SECTION_CONFIG.samplesLabel),
      samples: (config.samples || []).map(sample => ({
        ...sample,
        id: sample.id || `sample-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
        title: cleanVietnameseText(sample.title),
        category: cleanVietnameseText(sample.category),
        url: sample.url.trim(),
        prompt: cleanVietnameseText(sample.prompt),
        description: sample.description ? cleanVietnameseText(sample.description) : undefined,
        source: sample.source ? cleanVietnameseText(sample.source) : undefined
      })),
      lastUpdated: new Date().toISOString(),
      updatedBy: adminName || 'Quản trị viên Hệ thống'
    };

    localStorage.setItem(RECOGNITION_CONFIG_KEY, JSON.stringify(cleanedConfig));

    this.logActivity({
      actionType: 'admin_action',
      title: 'Cập nhật cấu hình & ảnh mẫu nhận diện AI',
      description: `Admin đã thay đổi nội dung tiêu đề và ${cleanedConfig.samples.length} ảnh mẫu nhận diện di sản`
    });

    window.dispatchEvent(new CustomEvent('recognition-config-updated', { detail: cleanedConfig }));
    return cleanedConfig;
  },

  resetRecognitionSectionConfig(): RecognitionSectionConfig {
    localStorage.setItem(RECOGNITION_CONFIG_KEY, JSON.stringify(DEFAULT_RECOGNITION_SECTION_CONFIG));
    this.logActivity({
      actionType: 'admin_action',
      title: 'Khôi phục mẫu nhận diện mặc định',
      description: 'Admin đã hoàn nguyên nội dung và ảnh mẫu nhận diện AI về nguyên bản di sản chuẩn'
    });
    window.dispatchEvent(new CustomEvent('recognition-config-updated', { detail: DEFAULT_RECOGNITION_SECTION_CONFIG }));
    return DEFAULT_RECOGNITION_SECTION_CONFIG;
  }
};

export const DEFAULT_RECOGNITION_SECTION_CONFIG: RecognitionSectionConfig = {
  badge: 'Thị giác Máy tính & AI Văn hóa Việt Nam',
  title: 'Nhận diện Di sản, Hiện vật & Cổ phục',
  description: 'Chụp ảnh trực tiếp hoặc tải hình ảnh di tích, đình chùa, làng nghề, nhạc cụ, cổ phục để AI phân tích tức thì.',
  samplesLabel: 'ẢNH MẪU THỬ NGHIỆM NHANH MỘT CHẠM:',
  samples: [
    {
      id: 'dai-noi-hue',
      title: 'Đại Nội Huế (Ngọ Môn)',
      category: 'Hoàng thành & Cung điện',
      url: 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Meridian_Gate%2C_Hue_%28I%29.jpg',
      prompt: 'Nhận diện Cổng Ngọ Môn - Đại Nội Huế triều Nguyễn',
      description: 'Cổng chính phía nam của Hoàng thành Huế, kiệt tác kiến trúc cung đình triều Nguyễn xây dựng năm 1833 thời vua Minh Mạng.',
      source: 'Wikimedia Commons'
    },
    {
      id: 'van-mieu-hanoi',
      title: 'Văn Miếu - Quốc Tử Giám',
      category: 'Di tích Lịch sử & Giáo dục',
      url: 'https://upload.wikimedia.org/wikipedia/commons/3/31/Hanoi_Temple_of_Literature.jpg',
      prompt: 'Nhận diện Khuê Văn Các và Bia Tiến sĩ Văn Miếu Hà Nội',
      description: 'Trường đại học đầu tiên của Việt Nam, xây dựng năm 1070 thời vua Lý Thánh Tông, biểu tượng nghìn năm văn hiến Thăng Long.',
      source: 'Wikimedia Commons'
    },
    {
      id: 'chua-cau-hoi-an',
      title: 'Chùa Cầu Hội An',
      category: 'Đô thị Cổ & Kiến trúc gỗ',
      url: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Cau_Nhat_Ban.jpg',
      prompt: 'Nhận diện Lai Viễn Kiều (Chùa Cầu) Hội An',
      description: 'Di tích cầu ngói bằng gỗ cổ kính do các thương nhân Nhật Bản xây dựng vào đầu thế kỷ 17, biểu tượng của Phố cổ Hội An.',
      source: 'Wikimedia Commons'
    },
    {
      id: 'gom-bat-trang',
      title: 'Làng Gốm Bát Tràng',
      category: 'Làng nghề Thủ công Truyền thống',
      url: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/B%C3%A1t_Tr%C3%A0ng_DSC_0095.JPG',
      prompt: 'Nhận diện Gốm Bát Tràng và kỹ thuật men rạn cổ',
      description: 'Làng gốm sứ thủ công ven sông Hồng với bề dày hơn 700 năm lịch sử, nổi danh với dòng men lam, men ngọc và men rạn gia tộc.',
      source: 'Wikimedia Commons'
    },
    {
      id: 'ao-dai-co-phuc',
      title: 'Áo Dài & Cổ Phục Việt Nam',
      category: 'Trang phục Truyền thống',
      url: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/%C3%81o_d%C3%A0i_(6405924827).jpg',
      prompt: 'Nhận diện áo dài ngũ thân và trang phục truyền thống Việt Nam',
      description: 'Trang phục quốc hồn quốc túy tôn vinh nét đoan trang, thanh lịch của người Việt qua các thời kỳ lịch sử.',
      source: 'Wikimedia Commons'
    },
    {
      id: 'chua-thien-mu',
      title: 'Chùa Thiên Mụ & Tháp Phước Duyên',
      category: 'Chùa cổ & Phật giáo',
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/ThienMuPagoda.jpg/1280px-ThienMuPagoda.jpg',
      prompt: 'Nhận diện Tháp Phước Duyên Chùa Thiên Mụ bên bờ sông Hương',
      description: 'Ngôi quốc tự cổ kính dựng năm 1601 thời Chúa Tiên Nguyễn Hoàng, với ngọn tháp bát giác 7 tầng soi bóng nước Hương Giang.',
      source: 'Wikimedia Commons'
    }
  ]
};

export const DEFAULT_CITY_LANDMARKS: CityLandmarkBackground[] = [
  {
    id: 'hanoi',
    cityName: 'Hà Nội',
    province: 'Hà Nội',
    landmarkName: 'Văn Miếu - Quốc Tử Giám & Hồ Gươm',
    tagline: 'Thủ đô ngàn năm văn hiến, lắng đọng hào khí Thăng Long',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/31/Hanoi_Temple_of_Literature.jpg',
    lat: 21.0285,
    lng: 105.8542
  },
  {
    id: 'tphcm',
    cityName: 'TP. Hồ Chí Minh',
    province: 'TP. Hồ Chí Minh',
    landmarkName: 'Dinh Độc Lập & Hội Trường Thống Nhất',
    tagline: 'Kiệt tác kiến trúc của KTS Ngô Viết Thụ, chứng nhân lịch sử non sông thống nhất',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/20190923_Independence_Palace-10.jpg/1280px-20190923_Independence_Palace-10.jpg',
    lat: 10.7769,
    lng: 106.7009
  },
  {
    id: 'hue',
    cityName: 'Thừa Thiên Huế',
    province: 'Thừa Thiên Huế',
    landmarkName: 'Đại Nội Cung Đình Huế & Cổng Ngọ Môn',
    tagline: 'Cố đô vàng son triều Nguyễn - Di sản Văn hóa Thế giới UNESCO',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Meridian_Gate%2C_Hue_%28I%29.jpg',
    lat: 16.4697,
    lng: 107.5796
  },
  {
    id: 'danang',
    cityName: 'Đà Nẵng',
    province: 'Đà Nẵng',
    landmarkName: 'Cầu Vàng Bà Nà Hills - Bàn Tay Khổng Lồ',
    tagline: 'Cây cầu đi bộ ngoạn mục vươn giữa mây ngàn đỉnh Bà Nà',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/84152-Da-Nang_%2848572442536%29.jpg/1280px-84152-Da-Nang_%2848572442536%29.jpg',
    lat: 16.0544,
    lng: 108.2022
  },
  {
    id: 'myson',
    cityName: 'Quảng Nam (Mỹ Sơn)',
    province: 'Quảng Nam',
    landmarkName: 'Thánh Địa Mỹ Sơn & Tháp Chăm Cổ',
    tagline: 'Quần thể đền tháp Chăm Pa nghìn năm bí ẩn giữa thung lũng thiêng - Di sản Thế giới',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/A_far_view_of_the_ruins_at_My_Son_%2830992152933%29.jpg/1280px-A_far_view_of_the_ruins_at_My_Son_%2830992152933%29.jpg',
    lat: 15.7959,
    lng: 108.1245
  },
  {
    id: 'hoian',
    cityName: 'Hội An (Quảng Nam)',
    province: 'Quảng Nam',
    landmarkName: 'Phố Cổ Hội An & Chùa Cầu',
    tagline: 'Đô thị cổ Di sản Thế giới lung linh đèn lồng, tường vàng và Chùa Cầu hơn 400 năm tuổi',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/f3/PhoCoHoiAn.jpg',
    lat: 15.8801,
    lng: 108.3270
  },
  {
    id: 'ninhbinh',
    cityName: 'Ninh Bình',
    province: 'Ninh Bình',
    landmarkName: 'Quần thể Danh thắng Tràng An & Tam Cốc',
    tagline: 'Di sản Kép thế giới giữa non nước hữu tình cố đô Hoa Lư',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Muaxuantamcoc.jpg',
    lat: 20.2536,
    lng: 105.9750
  },
  {
    id: 'halong',
    cityName: 'Quảng Ninh',
    province: 'Quảng Ninh',
    landmarkName: 'Vịnh Hạ Long & Quần đảo Cát Bà',
    tagline: 'Kỳ quan thiên nhiên thế giới với hàng nghìn đảo đá vôi kỳ vĩ',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Ha_Long_Bay_in_2019.jpg/1280px-Ha_Long_Bay_in_2019.jpg',
    lat: 20.9101,
    lng: 107.1839
  },
  {
    id: 'dalat',
    cityName: 'Lâm Đồng (Đà Lạt)',
    province: 'Lâm Đồng',
    landmarkName: 'Ga Xe Lửa Cổ Đà Lạt & Hồ Xuân Hương',
    tagline: 'Thành phố sương mù ngàn hoa thơ mộng với di sản kiến trúc Art Deco độc đáo',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Da_Lat_train_station_12.jpg/1280px-Da_Lat_train_station_12.jpg',
    lat: 11.9404,
    lng: 108.4583
  },
  {
    id: 'cantho',
    cityName: 'Cần Thơ',
    province: 'Cần Thơ',
    landmarkName: 'Chợ nổi Cái Răng & Sông Nước Tây Đô',
    tagline: 'Thủ phủ sông nước Tây Đô hào sảng và nét văn hóa chợ nổi trên sông đặc trưng',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Mua_ban_tren_song.jpg/1280px-Mua_ban_tren_song.jpg',
    lat: 10.0452,
    lng: 105.7469
  },
  {
    id: 'quangbinh',
    cityName: 'Quảng Bình',
    province: 'Quảng Bình',
    landmarkName: 'Vườn Quốc gia Phong Nha - Kẻ Bàng',
    tagline: 'Vương quốc hang động thạch nhũ tráng lệ bậc nhất hành tinh',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Phongnhacave.jpg',
    lat: 17.5388,
    lng: 106.2875
  },
  {
    id: 'hagiang',
    cityName: 'Hà Giang',
    province: 'Hà Giang',
    landmarkName: 'Cột Cờ Quốc Gia Lũng Cú & Cao Nguyên Đá Đồng Văn',
    tagline: 'Cực Bắc thiêng liêng với non sông cẩm tú ngút ngàn và công viên địa chất toàn cầu',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Lung_Cu_Flag_Tower.jpg/1280px-Lung_Cu_Flag_Tower.jpg',
    lat: 22.8233,
    lng: 104.9839
  },
  {
    id: 'nhatrang',
    cityName: 'Nha Trang (Khánh Hòa)',
    province: 'Khánh Hòa',
    landmarkName: 'Tháp Bà Ponagar & Vịnh Biển Nha Trang',
    tagline: 'Quần thể đền tháp Champa cổ kính bên vịnh biển xanh ngọc tuyệt mỹ',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Po_Nagar.jpg/1280px-Po_Nagar.jpg',
    lat: 12.2388,
    lng: 109.1967
  },
  {
    id: 'phuquoc',
    cityName: 'Kiên Giang (Phú Quốc)',
    province: 'Kiên Giang',
    landmarkName: 'Đảo Ngọc Phú Quốc & Bãi Sao',
    tagline: 'Thiên đường biển đảo phương Nam với bờ cát trắng mịn và hoàng hôn rực rỡ',
    imageUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=2000&q=85',
    lat: 10.2899,
    lng: 103.9840
  },
  {
    id: 'sapa',
    cityName: 'Lào Cai (Sa Pa)',
    province: 'Lào Cai',
    landmarkName: 'Đỉnh Fansipan & Đại Tượng Phật Trên Mây',
    tagline: 'Nóc nhà Đông Dương hùng vĩ giữa bồng bềnh mây ngàn Tây Bắc',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Amit%C4%81bha_statue_on_Fansipan_1.jpg/1280px-Amit%C4%81bha_statue_on_Fansipan_1.jpg',
    lat: 22.3364,
    lng: 103.8438
  },
  {
    id: 'haiphong',
    cityName: 'Hải Phòng',
    province: 'Hải Phòng',
    landmarkName: 'Vịnh Lan Hạ & Quần đảo Cát Bà',
    tagline: 'Thành phố hoa phượng đỏ với quần đảo ngọc và vịnh biển kỳ vĩ',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Lan_Ha_Bay.jpg/1280px-Lan_Ha_Bay.jpg',
    lat: 20.8449,
    lng: 106.6881
  },
  {
    id: 'vungtau',
    cityName: 'Bà Rịa - Vũng Tàu',
    province: 'Bà Rịa - Vũng Tàu',
    landmarkName: 'Tượng Chúa Kitô & Mũi Nghinh Phong',
    tagline: 'Thành phố biển đón gió kề bên ngọn hải đăng cổ kính',
    imageUrl: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=2000&q=85',
    lat: 10.3460,
    lng: 107.0843
  }
];
