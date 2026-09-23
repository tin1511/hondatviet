import React, { useState, useEffect } from 'react';
import { 
  User, 
  Award, 
  History, 
  KeyRound, 
  Sparkles, 
  LogOut, 
  CheckCircle2, 
  AlertCircle, 
  MapPin, 
  Mail, 
  Flame, 
  Camera, 
  Mic, 
  MessageSquareQuote, 
  Calendar, 
  BookOpen, 
  Heart, 
  Compass, 
  Lock, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  Trash2,
  ChevronRight,
  TrendingUp,
  Share2,
  Check,
  Globe,
  Utensils
} from 'lucide-react';
import { storageService } from '../services/storageService';
import { UserProfile, UserActivityLog, UserBadge, UserActionType } from '../types';

interface UserProfileViewProps {
  currentUser: UserProfile;
  onUserChange: (user: UserProfile) => void;
  onNavigateTab: (tab: string, heritageId?: string) => void;
  initialSubTab?: 'badges' | 'profile' | 'activity' | 'security';
}

interface MilestoneBadge {
  id: string;
  name: string;
  icon: string;
  category: string;
  tier: 'Đồng' | 'Bạc' | 'Vàng' | 'Kim Cương';
  tierColor: string;
  description: string;
  requirementText: string;
  targetTab: string;
  ctaText: string;
  getProgress: (user: UserProfile) => { current: number; total: number; percent: number; isUnlocked: boolean };
}

const ALL_MILESTONE_BADGES: MilestoneBadge[] = [
  {
    id: 'badge-explorer-1',
    name: 'Nhà Thám Hiểm Sơ Cấp',
    icon: '🧭',
    category: 'Khám phá',
    tier: 'Đồng',
    tierColor: 'from-amber-700 to-amber-900 border-amber-700 text-amber-300',
    description: 'Bắt đầu bước chân vào hành trình khám phá di sản 3 miền non sông.',
    requirementText: 'Tạo tài khoản hoặc đăng nhập thành viên',
    targetTab: 'heritage',
    ctaText: 'Khám phá di sản',
    getProgress: (u) => ({
      current: u.isLoggedIn ? 1 : 0,
      total: 1,
      percent: u.isLoggedIn ? 100 : 0,
      isUnlocked: u.isLoggedIn || (u.badges || []).some(b => b.id === 'badge-explorer-1')
    })
  },
  {
    id: 'badge-hue-expert',
    name: 'Sứ Giả Cố Đô',
    icon: '🏯',
    category: 'Di tích',
    tier: 'Bạc',
    tierColor: 'from-slate-400 to-slate-600 border-slate-400 text-slate-200',
    description: 'Tìm hiểu sâu về Đại Nội Huế, nhã nhạc cung đình và quần thể di tích triều Nguyễn.',
    requirementText: 'Nghe kể chuyện hoặc tìm hiểu di sản Huế',
    targetTab: 'storyteller',
    ctaText: 'Nghe kể chuyện Huế',
    getProgress: (u) => {
      const unlocked = (u.badges || []).some(b => b.id === 'badge-hue-expert') || (u.points || 0) >= 150;
      return {
        current: unlocked ? 1 : 0,
        total: 1,
        percent: unlocked ? 100 : 50,
        isUnlocked: unlocked
      };
    }
  },
  {
    id: 'badge-vision-ai',
    name: 'Nhiếp Ảnh Gia Di Sản AI',
    icon: '📸',
    category: 'Thị giác AI',
    tier: 'Bạc',
    tierColor: 'from-emerald-600 to-teal-800 border-emerald-500 text-emerald-300',
    description: 'Sử dụng AI nhận diện thị giác để tra cứu di tích, cổ vật, trang phục truyền thống.',
    requirementText: 'Thực hiện ít nhất 3 lần nhận diện ảnh bằng AI',
    targetTab: 'recognizer',
    ctaText: 'Nhận diện ảnh ngay',
    getProgress: (u) => {
      const count = u.recognitionsCount || 0;
      const total = 3;
      const percent = Math.min(100, Math.round((count / total) * 100));
      return {
        current: count,
        total,
        percent,
        isUnlocked: count >= total || (u.badges || []).some(b => b.id === 'badge-vision-ai')
      };
    }
  },
  {
    id: 'badge-storyteller',
    name: 'Người Kể Chuyện Di Sản',
    icon: '🎙️',
    category: 'Văn hóa',
    tier: 'Vàng',
    tierColor: 'from-amber-400 to-amber-600 border-amber-400 text-amber-200',
    description: 'Nghe AI tái hiện những câu chuyện di sản, huyền tích và chính sử Việt Nam.',
    requirementText: 'Nghe ít nhất 1 câu chuyện di sản bằng AI',
    targetTab: 'storyteller',
    ctaText: 'Nghe kể chuyện',
    getProgress: (u) => {
      const count = u.storiesCreated || 0;
      const isUnlocked = count >= 1 || (u.badges || []).some(b => b.id === 'badge-storyteller');
      return {
        current: count >= 1 ? 1 : 0,
        total: 1,
        percent: isUnlocked ? 100 : 0,
        isUnlocked
      };
    }
  },
  {
    id: 'badge-quiz-master',
    name: 'Sử Học Gia Đất Việt',
    icon: '🧠',
    category: 'Học tập',
    tier: 'Vàng',
    tierColor: 'from-purple-500 to-indigo-700 border-purple-400 text-purple-200',
    description: 'Chinh phục các câu đố lịch sử văn hóa và dòng thời gian các triều đại.',
    requirementText: 'Hoàn thành ít nhất 3 bộ câu hỏi trắc nghiệm văn hóa',
    targetTab: 'learning',
    ctaText: 'Làm Quiz văn hóa',
    getProgress: (u) => {
      const count = u.quizzesCompleted || 0;
      const total = 3;
      const percent = Math.min(100, Math.round((count / total) * 100));
      return {
        current: count,
        total,
        percent,
        isUnlocked: count >= total || (u.badges || []).some(b => b.id === 'badge-quiz-master')
      };
    }
  },
  {
    id: 'badge-itinerary-builder',
    name: 'Kiến Trúc Sư Hành Trình',
    icon: '🗺️',
    category: 'Du lịch',
    tier: 'Đồng',
    tierColor: 'from-sky-600 to-blue-800 border-sky-500 text-sky-200',
    description: 'Tạo lập lịch trình khám phá di sản thông minh và tối ưu thời gian di chuyển.',
    requirementText: 'Lập 1 lịch trình tham quan thông minh',
    targetTab: 'itinerary',
    ctaText: 'Lập lịch trình',
    getProgress: (u) => {
      const count = u.itinerariesCount || 0;
      return {
        current: count >= 1 ? 1 : 0,
        total: 1,
        percent: count >= 1 ? 100 : 0,
        isUnlocked: count >= 1 || (u.badges || []).some(b => b.id === 'badge-itinerary-builder')
      };
    }
  },
  {
    id: 'badge-foodie',
    name: 'Thực Thần Bản Địa',
    icon: '🍜',
    category: 'Ẩm thực',
    tier: 'Bạc',
    tierColor: 'from-orange-500 to-red-700 border-orange-400 text-orange-200',
    description: 'Khám phá quán ăn dân dã, món ngon gia truyền xung quanh các quần thể di sản.',
    requirementText: 'Tìm kiếm ẩm thực hoặc lưu di sản yêu thích',
    targetTab: 'food',
    ctaText: 'Xem quán ngon quanh di sản',
    getProgress: (u) => {
      const count = u.favoritesCount || 0;
      const total = 2;
      return {
        current: Math.min(total, count),
        total,
        percent: Math.min(100, Math.round((count / total) * 100)),
        isUnlocked: count >= total || (u.badges || []).some(b => b.id === 'badge-foodie')
      };
    }
  },
  {
    id: 'badge-heritage-ambassador',
    name: 'Đại Sứ Di Sản Quốc Gia',
    icon: '👑',
    category: 'Đặc biệt',
    tier: 'Kim Cương',
    tierColor: 'from-amber-300 via-yellow-500 to-amber-600 border-amber-300 text-stone-950 font-bold',
    description: 'Danh hiệu tối cao vinh danh người thấu hiểu sâu sắc và tích cực lan tỏa di sản văn hóa Việt Nam.',
    requirementText: 'Đạt từ 500 điểm XP văn hóa trở lên',
    targetTab: 'heritage',
    ctaText: 'Tích lũy XP',
    getProgress: (u) => {
      const pts = u.points || 0;
      const total = 500;
      const percent = Math.min(100, Math.round((pts / total) * 100));
      return {
        current: pts,
        total,
        percent,
        isUnlocked: pts >= total || (u.badges || []).some(b => b.id === 'badge-heritage-ambassador')
      };
    }
  }
];

export const UserProfileView: React.FC<UserProfileViewProps> = ({
  currentUser,
  onUserChange,
  onNavigateTab,
  initialSubTab = 'badges'
}) => {
  // Tabs are prominently positioned AT THE VERY TOP
  const [activeSubTab, setActiveSubTab] = useState<'badges' | 'profile' | 'activity' | 'security'>(initialSubTab);
  
  useEffect(() => {
    if (initialSubTab) {
      setActiveSubTab(initialSubTab);
    }
  }, [initialSubTab]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [activeSubTab]);
  
  // Profile edit state
  const [displayName, setDisplayName] = useState(currentUser.displayName);
  const [city, setCity] = useState(currentUser.city || 'Việt Nam');
  const [role, setRole] = useState<'user' | 'student' | 'researcher' | 'admin'>(currentUser.role || 'student');
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  // Password change state
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Activity filter state
  const [activityFilter, setActivityFilter] = useState<string>('all');
  const [activities, setActivities] = useState<UserActivityLog[]>(() => storageService.getActivities(currentUser.id));

  // Quick Login / Register Drawer for Guests
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');

  // Status message
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    setActivities(storageService.getActivities(currentUser.id));
    setDisplayName(currentUser.displayName);
    setCity(currentUser.city || 'Việt Nam');
    setRole(currentUser.role || 'student');
  }, [currentUser]);

  const showMessage = (type: 'success' | 'error', message: string) => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback(null), 4000);
  };

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!displayName.trim()) {
      showMessage('error', 'Họ và tên không được để trống.');
      return;
    }

    const updated = storageService.updateUserProfile({
      displayName,
      city,
      role,
      roleLabel: role === 'student' ? 'Học sinh / Sinh viên' : role === 'researcher' ? 'Nhà nghiên cứu' : role === 'admin' ? 'Quản trị viên' : 'Người yêu văn hóa'
    });

    if (updated) {
      onUserChange(updated);
      setIsEditingProfile(false);
      showMessage('success', 'Đã lưu thông tin hồ sơ cá nhân thành công!');
    } else {
      showMessage('error', 'Không thể lưu hồ sơ lúc này.');
    }
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      showMessage('error', 'Mật khẩu mới phải có ít nhất 6 ký tự.');
      return;
    }
    if (newPassword !== confirmPassword) {
      showMessage('error', 'Mật khẩu xác nhận không trùng khớp.');
      return;
    }

    const res = storageService.changePassword(oldPassword, newPassword);
    if (!res.success) {
      showMessage('error', res.error || 'Đổi mật khẩu thất bại.');
      return;
    }

    showMessage('success', 'Đổi mật khẩu thành công! Mật khẩu mới đã được cập nhật an toàn.');
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleClearActivities = () => {
    if (window.confirm('Bạn có chắc muốn xóa sạch toàn bộ lịch sử thao tác này không?')) {
      storageService.clearActivities(currentUser.id);
      setActivities([]);
      showMessage('success', 'Đã xóa toàn bộ lịch sử thao tác.');
    }
  };

  const handleGuestAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (authMode === 'login') {
      const res = storageService.login(loginEmail, loginPassword);
      if (res.success && res.user) {
        onUserChange(res.user);
        showMessage('success', `Chào mừng trở lại, ${res.user.displayName}!`);
      } else {
        showMessage('error', res.error || 'Đăng nhập thất bại. Vui lòng thử lại!');
      }
    } else {
      if (!regName.trim() || !regEmail.trim()) {
        showMessage('error', 'Vui lòng điền đầy đủ tên và email.');
        return;
      }
      const res = storageService.register({
        displayName: regName,
        email: regEmail,
        password: regPassword || '123456',
        city: 'Hà Nội',
        role: 'student',
        interests: ['Di sản Việt Nam', 'Ẩm thực']
      });
      if (res.success && res.user) {
        onUserChange(res.user);
        showMessage('success', `Đăng ký thành công! Chào mừng ${res.user.displayName}.`);
      } else {
        showMessage('error', res.error || 'Đăng ký thất bại.');
      }
    }
  };

  const handleLogout = () => {
    storageService.logout();
    const guest = storageService.getCurrentUser();
    onUserChange(guest);
    showMessage('success', 'Đã đăng xuất tài khoản an toàn.');
  };

  const filteredActivities = activities.filter(a => {
    if (activityFilter === 'all') return true;
    return a.actionType === activityFilter;
  });

  const getActionIcon = (type: UserActionType) => {
    switch (type) {
      case 'recognize': return <Camera className="w-4 h-4 text-emerald-400" />;
      case 'story': return <Sparkles className="w-4 h-4 text-amber-400" />;
      case 'chat': return <MessageSquareQuote className="w-4 h-4 text-sky-400" />;
      case 'itinerary': return <Calendar className="w-4 h-4 text-orange-400" />;
      case 'memory': return <Mic className="w-4 h-4 text-rose-400" />;
      case 'quiz': return <Award className="w-4 h-4 text-purple-400" />;
      case 'favorite': return <Heart className="w-4 h-4 text-red-400 fill-red-400" />;
      case 'community': return <BookOpen className="w-4 h-4 text-teal-400" />;
      default: return <History className="w-4 h-4 text-stone-400" />;
    }
  };

  const unlockedBadgesCount = ALL_MILESTONE_BADGES.filter(b => b.getProgress(currentUser).isUnlocked).length;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-12 animate-fadeIn">
      
      {/* Notifications banner */}
      {feedback && (
        <div className={`mb-4 p-4 rounded-2xl text-xs flex items-center gap-2.5 animate-fadeIn ${
          feedback.type === 'success' 
            ? 'bg-emerald-950/80 border border-emerald-500/40 text-emerald-300' 
            : 'bg-red-950/80 border border-red-500/40 text-red-300'
        }`}>
          {feedback.type === 'success' ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <AlertCircle className="w-4 h-4 text-red-400" />}
          <span className="font-medium">{feedback.message}</span>
        </div>
      )}

      {/* =========================================================
          TOP TAB NAVIGATION BAR (ALWAYS FIRST & IMMEDIATELY VISIBLE UPON OPENING)
          ========================================================= */}
      <div className="sticky top-16 z-30 bg-stone-900/95 backdrop-blur-md border border-stone-800 rounded-2xl p-2 shadow-2xl mb-6">
        <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-3">
          <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto no-scrollbar w-full sm:w-auto">
            <button
              id="tab-btn-badges"
              onClick={() => setActiveSubTab('badges')}
              className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 sm:gap-2 whitespace-nowrap cursor-pointer ${
                activeSubTab === 'badges'
                  ? 'bg-amber-500 text-stone-950 shadow-md scale-[1.02]'
                  : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>Bảng Danh Hiệu</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                activeSubTab === 'badges' ? 'bg-stone-950/20 text-stone-950' : 'bg-amber-500/20 text-amber-300'
              }`}>
                {unlockedBadgesCount}/{ALL_MILESTONE_BADGES.length}
              </span>
            </button>

            <button
              id="tab-btn-profile-info"
              onClick={() => setActiveSubTab('profile')}
              className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 sm:gap-2 whitespace-nowrap cursor-pointer ${
                activeSubTab === 'profile'
                  ? 'bg-amber-500 text-stone-950 shadow-md scale-[1.02]'
                  : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Hồ Sơ & Thống Kê</span>
            </button>

            <button
              id="tab-btn-activity-history"
              onClick={() => setActiveSubTab('activity')}
              className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 sm:gap-2 whitespace-nowrap cursor-pointer ${
                activeSubTab === 'activity'
                  ? 'bg-amber-500 text-stone-950 shadow-md scale-[1.02]'
                  : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800'
              }`}
            >
              <History className="w-4 h-4" />
              <span>Lịch Sử</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-stone-800 text-stone-400">
                {activities.length}
              </span>
            </button>

            <button
              id="tab-btn-security"
              onClick={() => setActiveSubTab('security')}
              className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 sm:gap-2 whitespace-nowrap cursor-pointer ${
                activeSubTab === 'security'
                  ? 'bg-amber-500 text-stone-950 shadow-md scale-[1.02]'
                  : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800'
              }`}
            >
              <KeyRound className="w-4 h-4" />
              <span>{currentUser.isLoggedIn ? 'Bảo Mật' : 'Đăng Nhập'}</span>
            </button>
          </div>

          {/* Quick User summary chip */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0 ml-auto">
            <div className="flex items-center gap-2 bg-stone-950/60 border border-stone-800/80 px-2.5 py-1 rounded-xl">
              <img 
                src={currentUser.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'} 
                alt={currentUser.displayName}
                className="w-5 h-5 rounded-full object-cover border border-amber-400"
              />
              <span className="text-xs font-semibold text-stone-200 max-w-[85px] sm:max-w-[120px] truncate">
                {currentUser.displayName}
              </span>
              <span className="text-[10px] px-1.5 py-0.2 bg-amber-500/20 text-amber-300 font-bold rounded">
                {currentUser.points || 0} XP
              </span>
            </div>

            {currentUser.isLoggedIn && (
              <button
                onClick={handleLogout}
                className="p-1.5 rounded-xl text-stone-400 hover:text-red-400 hover:bg-red-950/30 transition-colors flex items-center gap-1"
                title="Đăng xuất"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* =========================================================
          TAB 1: BẢNG DANH HIỆU & HUY HIỆU DI SẢN (BADGES SHOWCASE)
          ========================================================= */}
      {activeSubTab === 'badges' && (
        <div className="space-y-6 animate-fadeIn">
          
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-serif font-bold text-stone-100 flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                <span>Bộ Sưu Tập Huy Hiệu & Danh Hiệu Di Sản</span>
              </h2>
              <p className="text-xs text-stone-400 mt-0.5">
                Hoàn thành các hoạt động khám phá, nhận diện và học tập để mở khóa huy hiệu vinh danh.
              </p>
            </div>

            <div className="flex items-center gap-2 bg-stone-900 border border-stone-800 rounded-2xl px-3.5 py-1.5 text-xs text-stone-300">
              <span>Độ hoàn thiện:</span>
              <strong className="text-amber-400 font-serif text-sm">
                {Math.round((unlockedBadgesCount / ALL_MILESTONE_BADGES.length) * 100)}%
              </strong>
            </div>
          </div>

          {/* Badges Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ALL_MILESTONE_BADGES.map((badge) => {
              const progress = badge.getProgress(currentUser);
              return (
                <div
                  key={badge.id}
                  className={`rounded-3xl p-5 border transition-all relative overflow-hidden flex flex-col justify-between ${
                    progress.isUnlocked
                      ? 'bg-gradient-to-b from-stone-900 via-stone-900 to-amber-950/30 border-amber-500/50 shadow-lg shadow-amber-950/20'
                      : 'bg-stone-900/60 border-stone-800 opacity-80 hover:opacity-100'
                  }`}
                >
                  {/* Badge Category Tag & Tier */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-stone-400 px-2 py-0.5 rounded-md bg-stone-950 border border-stone-800">
                      {badge.category}
                    </span>

                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${badge.tierColor}`}>
                      {badge.tier}
                    </span>
                  </div>

                  {/* Icon & Title */}
                  <div className="flex items-start gap-3.5 mb-3">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shrink-0 shadow-inner border ${
                      progress.isUnlocked 
                        ? 'bg-amber-500/20 border-amber-400/60 shadow-amber-500/20' 
                        : 'bg-stone-950 border-stone-800 grayscale'
                    }`}>
                      {badge.icon}
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-serif font-bold text-stone-100 text-sm sm:text-base leading-tight">
                          {badge.name}
                        </h3>
                        {progress.isUnlocked && (
                          <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-stone-400 leading-relaxed">
                        {badge.description}
                      </p>
                    </div>
                  </div>

                  {/* Unlock criteria & Progress */}
                  <div className="pt-3 border-t border-stone-800/80 space-y-2">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-stone-400">{badge.requirementText}</span>
                      <span className={`font-bold ${progress.isUnlocked ? 'text-amber-400' : 'text-stone-500'}`}>
                        {progress.current}/{progress.total}
                      </span>
                    </div>

                    {/* Mini Progress Bar */}
                    <div className="w-full bg-stone-950 rounded-full h-1.5 overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${
                          progress.isUnlocked ? 'bg-amber-400' : 'bg-stone-700'
                        }`}
                        style={{ width: `${progress.percent}%` }}
                      />
                    </div>

                    {/* Action Button */}
                    <div className="pt-1 flex items-center justify-between">
                      {progress.isUnlocked ? (
                        <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" />
                          <span>Đã đạt được</span>
                        </span>
                      ) : (
                        <span className="text-[11px] text-stone-500 font-medium">
                          Chưa mở khóa
                        </span>
                      )}

                      <button
                        onClick={() => onNavigateTab(badge.targetTab)}
                        className="text-[11px] px-3 py-1 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-300 font-semibold border border-stone-700 flex items-center gap-1 transition-all hover:scale-105 cursor-pointer"
                      >
                        <span>{badge.ctaText}</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* =========================================================
          TAB 2: HỒ SƠ CÁ NHÂN & THỐNG KÊ CHI TIẾT
          ========================================================= */}
      {activeSubTab === 'profile' && (
        <div className="space-y-6 animate-fadeIn">

          {/* User Identity & XP Status Banner */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-stone-900 via-amber-950/40 to-stone-900 border border-amber-500/40 p-6 sm:p-8 shadow-2xl">
            <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-6">
              
              {/* Avatar & User Details */}
              <div className="flex items-center gap-4 sm:gap-6">
                <div className="relative">
                  <img 
                    src={currentUser.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'} 
                    alt={currentUser.displayName}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-amber-400 shadow-xl"
                  />
                  <span className="absolute -bottom-1.5 -right-1.5 bg-amber-500 text-stone-950 p-1 rounded-full shadow border-2 border-stone-900" title="Cấp độ hoạt động">
                    <Flame className="w-3.5 h-3.5 fill-current" />
                  </span>
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-100">
                      {currentUser.displayName}
                    </h1>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold">
                      {currentUser.roleLabel || 'Thành viên Di sản'}
                    </span>
                    {currentUser.role === 'admin' && (
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/40 font-semibold flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Quản trị viên</span>
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-stone-300 mt-1.5 font-medium">
                    <span className="flex items-center gap-1 text-stone-400">
                      <Mail className="w-3.5 h-3.5 text-stone-500" />
                      <span>{currentUser.email}</span>
                    </span>
                    <span className="flex items-center gap-1 text-stone-400">
                      <MapPin className="w-3.5 h-3.5 text-rose-400" />
                      <span>{currentUser.city || 'Việt Nam'}</span>
                    </span>
                    <span className="text-amber-400 flex items-center gap-1 font-semibold">
                      <Award className="w-3.5 h-3.5" />
                      <span>{unlockedBadgesCount}/{ALL_MILESTONE_BADGES.length} Danh hiệu</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* XP & Level Summary Box */}
              <div className="w-full sm:w-auto bg-stone-950/80 border border-amber-500/30 rounded-2xl p-4 sm:p-5 flex flex-col items-start sm:items-end gap-2 shadow-inner">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-stone-400">Cấp bậc Di sản:</span>
                  <span className="text-sm sm:text-base font-serif font-bold text-amber-300">
                    {currentUser.level || 'Nhà Khám Phá Trẻ'}
                  </span>
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-serif font-extrabold text-amber-400">
                    {currentUser.points || 0}
                  </span>
                  <span className="text-xs font-semibold text-amber-200">Điểm Văn Hóa (XP)</span>
                </div>

                {/* XP Progress Bar */}
                <div className="w-full sm:w-48 bg-stone-900 rounded-full h-2 overflow-hidden border border-stone-800">
                  <div 
                    className="bg-gradient-to-r from-amber-500 to-amber-300 h-full rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, Math.max(10, ((currentUser.points || 100) % 500) / 5))}%` }}
                  />
                </div>
                <span className="text-[10px] text-stone-400">
                  +{500 - ((currentUser.points || 100) % 500)} XP đến cấp tiếp theo
                </span>
              </div>

            </div>

            {/* Guest Warning & Quick Login Prompt */}
            {!currentUser.isLoggedIn && (
              <div className="mt-6 pt-5 border-t border-amber-500/20 flex flex-wrap items-center justify-between gap-4 bg-amber-500/10 -mx-6 -mb-6 sm:-mx-8 sm:-mb-8 p-4 sm:p-6 rounded-b-3xl">
                <div className="flex items-center gap-3 text-xs text-amber-200">
                  <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
                  <span>
                    Bạn đang trải nghiệm với tư cách <strong>Khách vãng lai</strong>. Hãy đăng nhập hoặc đăng ký để lưu giữ huy hiệu vĩnh viễn và đồng bộ đa thiết bị!
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setAuthMode('login');
                      setActiveSubTab('security');
                    }}
                    className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold shadow transition-all cursor-pointer"
                  >
                    Đăng nhập tài khoản
                  </button>
                  <button
                    onClick={() => {
                      setAuthMode('register');
                      setActiveSubTab('security');
                    }}
                    className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-200 text-xs font-semibold border border-stone-700 transition-all cursor-pointer"
                  >
                    Đăng ký thành viên
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* 4 Quick Stat Counters */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-stone-900 border border-stone-800 p-4 rounded-2xl text-center shadow">
              <div className="w-8 h-8 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center mx-auto mb-2">
                <Heart className="w-4 h-4 fill-current" />
              </div>
              <p className="text-2xl font-serif font-bold text-amber-400">{currentUser.favoritesCount || 0}</p>
              <p className="text-xs text-stone-400 mt-0.5">Di sản yêu thích</p>
            </div>

            <div className="bg-stone-900 border border-stone-800 p-4 rounded-2xl text-center shadow">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-2">
                <Camera className="w-4 h-4" />
              </div>
              <p className="text-2xl font-serif font-bold text-emerald-400">{currentUser.recognitionsCount || 0}</p>
              <p className="text-xs text-stone-400 mt-0.5">Lần nhận diện AI</p>
            </div>

            <div className="bg-stone-900 border border-stone-800 p-4 rounded-2xl text-center shadow">
              <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center mx-auto mb-2">
                <Award className="w-4 h-4" />
              </div>
              <p className="text-2xl font-serif font-bold text-purple-400">{currentUser.quizzesCompleted || 0}</p>
              <p className="text-xs text-stone-400 mt-0.5">Quiz văn hóa</p>
            </div>

            <div className="bg-stone-900 border border-stone-800 p-4 rounded-2xl text-center shadow">
              <div className="w-8 h-8 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto mb-2">
                <Mic className="w-4 h-4" />
              </div>
              <p className="text-2xl font-serif font-bold text-rose-400">{currentUser.storiesCreated || 0}</p>
              <p className="text-xs text-stone-400 mt-0.5">Ký ức gia đình</p>
            </div>
          </div>

          {/* User Profile Information Card */}
          <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 shadow-xl">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-stone-800">
              <div>
                <h3 className="text-lg font-serif font-bold text-stone-100 flex items-center gap-2">
                  <User className="w-5 h-5 text-amber-400" />
                  <span>Chi Tiết Hồ Sơ Cá Nhân</span>
                </h3>
                <p className="text-xs text-stone-400 mt-0.5">
                  Quản lý thông tin hiển thị, vai trò và tùy biến trải nghiệm cá nhân hóa.
                </p>
              </div>

              <button
                onClick={() => setIsEditingProfile(!isEditingProfile)}
                className="px-3.5 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-300 text-xs font-semibold border border-stone-700 transition-colors cursor-pointer"
              >
                {isEditingProfile ? 'Hủy chỉnh sửa' : 'Chỉnh sửa hồ sơ'}
              </button>
            </div>

            {isEditingProfile ? (
              <form onSubmit={handleUpdateProfile} className="space-y-4 max-w-xl">
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1.5 uppercase tracking-wider">
                    Họ và Tên Hiển Thị:
                  </label>
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-700 rounded-xl px-4 py-2.5 text-stone-100 text-sm focus:outline-none focus:border-amber-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1.5 uppercase tracking-wider">
                    Tỉnh / Thành Phố Quê Hương:
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-700 rounded-xl px-4 py-2.5 text-stone-100 text-sm focus:outline-none focus:border-amber-500"
                    placeholder="Hà Nội, Huế, TP.HCM, Đà Nẵng..."
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1.5 uppercase tracking-wider">
                    Vai Trò Trải Nghiệm:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'student', label: 'Học sinh / Sinh viên' },
                      { id: 'user', label: 'Du khách / Người yêu di sản' },
                      { id: 'researcher', label: 'Nhà nghiên cứu văn hóa' }
                    ].map((r) => (
                      <button
                        key={r.id}
                        type="button"
                        onClick={() => setRole(r.id as any)}
                        className={`p-2.5 rounded-xl text-xs font-medium border text-center transition-all ${
                          role === r.id
                            ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold'
                            : 'bg-stone-950 border-stone-800 text-stone-400 hover:text-stone-200'
                        }`}
                      >
                        {r.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-3">
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow transition-all cursor-pointer"
                  >
                    Lưu thay đổi hồ sơ
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditingProfile(false)}
                    className="px-4 py-2.5 rounded-xl bg-stone-800 text-stone-400 text-xs hover:text-stone-200"
                  >
                    Hủy
                  </button>
                </div>
              </form>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="bg-stone-950 p-4 rounded-2xl border border-stone-800/80 space-y-1">
                  <span className="text-stone-500 text-[11px] block">Họ và tên:</span>
                  <span className="text-stone-200 text-sm font-semibold">{currentUser.displayName}</span>
                </div>

                <div className="bg-stone-950 p-4 rounded-2xl border border-stone-800/80 space-y-1">
                  <span className="text-stone-500 text-[11px] block">Địa chỉ Email:</span>
                  <span className="text-stone-200 text-sm font-semibold">{currentUser.email}</span>
                </div>

                <div className="bg-stone-950 p-4 rounded-2xl border border-stone-800/80 space-y-1">
                  <span className="text-stone-500 text-[11px] block">Thành phố quê quán:</span>
                  <span className="text-stone-200 text-sm font-semibold">{currentUser.city || 'Việt Nam'}</span>
                </div>

                <div className="bg-stone-950 p-4 rounded-2xl border border-stone-800/80 space-y-1">
                  <span className="text-stone-500 text-[11px] block">Vai trò thành viên:</span>
                  <span className="text-amber-300 text-sm font-semibold">{currentUser.roleLabel || 'Thành viên'}</span>
                </div>

                <div className="bg-stone-950 p-4 rounded-2xl border border-stone-800/80 space-y-1 md:col-span-2">
                  <span className="text-stone-500 text-[11px] block">Lĩnh vực di sản quan tâm:</span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {(currentUser.interests || ['Di sản UNESCO', 'Ẩm thực cung đình', 'Nhạc cụ cổ truyền']).map((item, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded-lg bg-stone-900 border border-stone-800 text-stone-300 text-xs font-medium">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      )}

      {/* =========================================================
          TAB 3: LỊCH SỬ THAO TÁC WEB (ACTIVITY TIMELINE)
          ========================================================= */}
      {activeSubTab === 'activity' && (
        <div className="space-y-6 animate-fadeIn">
          
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-serif font-bold text-stone-100 flex items-center gap-2">
                <History className="w-5 h-5 text-amber-400" />
                <span>Nhật Ký Hành Trình & Lịch Sử Hoạt Động</span>
              </h2>
              <p className="text-xs text-stone-400 mt-0.5">
                Mỗi thao tác nhận diện, làm quiz hay hỏi đáp hướng dẫn viên đều được ghi dấu với điểm văn hóa thưởng.
              </p>
            </div>

            {activities.length > 0 && (
              <button
                onClick={handleClearActivities}
                className="px-3.5 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-red-400 hover:text-red-300 text-xs font-semibold border border-stone-800 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Xóa lịch sử</span>
              </button>
            )}
          </div>

          {/* Action Filter Pills */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
            {[
              { id: 'all', label: 'Tất cả' },
              { id: 'recognize', label: 'Nhận diện AI' },
              { id: 'story', label: 'Kể chuyện' },
              { id: 'chat', label: 'Hỏi đáp HDV' },
              { id: 'quiz', label: 'Quiz' },
              { id: 'itinerary', label: 'Lịch trình' },
              { id: 'memory', label: 'Ký ức' },
              { id: 'favorite', label: 'Yêu thích' }
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setActivityFilter(f.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activityFilter === f.id
                    ? 'bg-amber-500 text-stone-950 font-bold'
                    : 'bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Activity Log List */}
          {filteredActivities.length === 0 ? (
            <div className="bg-stone-900 border border-stone-800 rounded-3xl p-12 text-center space-y-3">
              <History className="w-12 h-12 text-stone-600 mx-auto" />
              <h4 className="text-base font-serif font-bold text-stone-300">Chưa có hoạt động nào được ghi lại</h4>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                Hãy bắt đầu trải nghiệm bằng cách chụp ảnh nhận diện di sản, nghe kể chuyện hay làm câu đố văn hóa!
              </p>
              <button
                onClick={() => onNavigateTab('heritage')}
                className="mt-2 px-4 py-2 rounded-xl bg-amber-500 text-stone-950 text-xs font-bold shadow hover:bg-amber-400 transition-all cursor-pointer"
              >
                Khám phá di sản ngay
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredActivities.map((act) => (
                <div
                  key={act.id}
                  className="bg-stone-900 border border-stone-800 hover:border-amber-500/30 p-4 rounded-2xl flex items-center justify-between gap-4 transition-colors"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-stone-950 border border-stone-800 flex items-center justify-center shrink-0">
                      {getActionIcon(act.actionType)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs sm:text-sm font-bold text-stone-200">{act.title}</h4>
                        {act.pointsEarned && act.pointsEarned > 0 && (
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold">
                            +{act.pointsEarned} XP
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-stone-400 mt-0.5">{act.description}</p>
                    </div>
                  </div>

                  <span className="text-[11px] text-stone-500 shrink-0">
                    {new Date(act.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {new Date(act.timestamp).toLocaleDateString([], { day: '2-digit', month: '2-digit' })}
                  </span>
                </div>
              ))}
            </div>
          )}

        </div>
      )}

      {/* =========================================================
          TAB 4: BẢO MẬT HOẶC ĐĂNG NHẬP / ĐĂNG KÝ
          ========================================================= */}
      {activeSubTab === 'security' && (
        <div className="max-w-xl mx-auto space-y-6 animate-fadeIn">
          
          {currentUser.isLoggedIn ? (
            /* Change Password Form */
            <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-serif font-bold text-stone-100">Thay Đổi Mật Khẩu Bảo Mật</h3>
                  <p className="text-xs text-stone-400">
                    Bảo vệ tài khoản và điểm văn hóa của bạn với mật khẩu mới.
                  </p>
                </div>
              </div>

              <form onSubmit={handleChangePassword} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1.5 uppercase tracking-wider">
                    Mật khẩu hiện tại:
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-stone-500 absolute left-3.5 top-3" />
                    <input
                      type={showOldPassword ? 'text' : 'password'}
                      required
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl pl-10 pr-10 py-2.5 text-stone-100 text-xs sm:text-sm focus:outline-none focus:border-amber-500"
                      placeholder="Nhập mật khẩu hiện tại..."
                    />
                    <button
                      type="button"
                      onClick={() => setShowOldPassword(!showOldPassword)}
                      className="absolute right-3 top-2.5 text-stone-500 hover:text-stone-300"
                    >
                      {showOldPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1.5 uppercase tracking-wider">
                    Mật khẩu mới (tối thiểu 6 ký tự):
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-stone-500 absolute left-3.5 top-3" />
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl pl-10 pr-10 py-2.5 text-stone-100 text-xs sm:text-sm focus:outline-none focus:border-amber-500"
                      placeholder="Nhập mật khẩu mới..."
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-2.5 text-stone-500 hover:text-stone-300"
                    >
                      {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1.5 uppercase tracking-wider">
                    Xác nhận mật khẩu mới:
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-stone-500 absolute left-3.5 top-3" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl pl-10 pr-10 py-2.5 text-stone-100 text-xs sm:text-sm focus:outline-none focus:border-amber-500"
                      placeholder="Gõ lại mật khẩu mới..."
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-2.5 text-stone-500 hover:text-stone-300"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm shadow transition-all cursor-pointer"
                >
                  Xác nhận cập nhật mật khẩu mới
                </button>
              </form>
            </div>
          ) : (
            /* Guest Login / Register Box */
            <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
              
              {/* Toggle Login or Register */}
              <div className="flex bg-stone-950 p-1 rounded-2xl border border-stone-800">
                <button
                  type="button"
                  onClick={() => setAuthMode('login')}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                    authMode === 'login' ? 'bg-amber-500 text-stone-950 shadow' : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  Đăng Nhập
                </button>
                <button
                  type="button"
                  onClick={() => setAuthMode('register')}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                    authMode === 'register' ? 'bg-amber-500 text-stone-950 shadow' : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  Đăng Ký Thành Viên
                </button>
              </div>

              <form onSubmit={handleGuestAuth} className="space-y-4">
                {authMode === 'register' && (
                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1.5 uppercase tracking-wider">
                      Họ và tên của bạn:
                    </label>
                    <input
                      type="text"
                      required
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      placeholder="Nguyễn Văn A"
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-2.5 text-stone-100 text-xs sm:text-sm focus:outline-none focus:border-amber-500"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1.5 uppercase tracking-wider">
                    Địa chỉ Email:
                  </label>
                  <input
                    type="email"
                    required
                    value={authMode === 'login' ? loginEmail : regEmail}
                    onChange={(e) => authMode === 'login' ? setLoginEmail(e.target.value) : setRegEmail(e.target.value)}
                    placeholder="ban@example.com"
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-2.5 text-stone-100 text-xs sm:text-sm focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1.5 uppercase tracking-wider">
                    Mật khẩu:
                  </label>
                  <input
                    type="password"
                    required
                    value={authMode === 'login' ? loginPassword : regPassword}
                    onChange={(e) => authMode === 'login' ? setLoginPassword(e.target.value) : setRegPassword(e.target.value)}
                    placeholder="Tối thiểu 6 ký tự"
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-2.5 text-stone-100 text-xs sm:text-sm focus:outline-none focus:border-amber-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm shadow transition-all cursor-pointer"
                >
                  {authMode === 'login' ? 'Đăng Nhập Ngay' : 'Hoàn Tất Đăng Ký'}
                </button>
              </form>

              {/* Demo accounts hint */}
              <div className="p-3 bg-stone-950 rounded-xl border border-stone-800 text-[11px] text-stone-400 space-y-1">
                <span className="text-amber-400 font-semibold block">Tài khoản quản trị demo:</span>
                <div>Email: <code className="text-stone-300">admin@heritageai.vn</code> | Pass: <code className="text-stone-300">AINHS2026</code></div>
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
};
