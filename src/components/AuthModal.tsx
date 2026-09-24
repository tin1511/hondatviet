import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Sparkles, 
  LogOut, 
  CheckCircle2, 
  AlertCircle, 
  Award, 
  Compass, 
  BookOpen, 
  Calendar, 
  MapPin, 
  Heart, 
  Clock, 
  ShieldCheck, 
  History, 
  Layers, 
  Trash2,
  Camera,
  Mic,
  MessageSquareQuote,
  Flame,
  ArrowRight,
  KeyRound,
  Key,
  RefreshCw,
  Check,
  Inbox,
  Send,
  ArrowLeft,
  Copy
} from 'lucide-react';
import { storageService } from '../services/storageService';
import { UserProfile, UserActivityLog, UserActionType } from '../types';
import { cleanVietnameseText } from '../utils/textUtils';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUserChange: (user: UserProfile) => void;
  initialTab?: 'login' | 'register' | 'profile' | 'activity' | 'security';
  onNavigateTab?: (tab: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onUserChange,
  initialTab = 'login',
  onNavigateTab
}) => {
  const [activeTab, setActiveTab] = useState<'login' | 'register' | 'profile' | 'activity' | 'security'>(initialTab);
  const [currentUser, setCurrentUser] = useState<UserProfile>(storageService.getCurrentUser());
  const [activities, setActivities] = useState<UserActivityLog[]>([]);
  const [selectedActionFilter, setSelectedActionFilter] = useState<string>('all');
  
  // Login Form
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // Register Form
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regRole, setRegRole] = useState<'user' | 'student' | 'researcher'>('student');
  const [regCity, setRegCity] = useState('Hà Nội');

  // Change Password Form
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isChangingPass, setIsChangingPass] = useState(false);
  
  // Feedback status
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (isOpen) {
      const user = storageService.getCurrentUser();
      setCurrentUser(user);
      setActivities(storageService.getActivities(user.id));
      if (user.isLoggedIn && (initialTab === 'login' || initialTab === 'register')) {
        setActiveTab('profile');
      } else {
        setActiveTab(initialTab);
      }
      setErrorMessage('');
      setSuccessMessage('');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }
  }, [isOpen, initialTab]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    const res = storageService.login(loginEmail, loginPassword);
    if (!res.success || !res.user) {
      setErrorMessage(res.error || 'Đăng nhập không thành công');
      return;
    }

    setCurrentUser(res.user);
    onUserChange(res.user);
    setActivities(storageService.getActivities(res.user.id));
    setSuccessMessage(`Chào mừng trở lại, ${res.user.displayName}!`);
    setTimeout(() => {
      setActiveTab('profile');
      setSuccessMessage('');
    }, 800);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!regName.trim() || !regEmail.trim()) {
      setErrorMessage('Vui lòng điền đầy đủ họ tên và email.');
      return;
    }

    if (!regPassword.trim() || regPassword.length < 6) {
      setErrorMessage('Mật khẩu cần tối thiểu 6 ký tự để bảo vệ tài khoản.');
      return;
    }

    const emailCheck = storageService.validateEmailIntegrity(regEmail);
    if (!emailCheck.valid) {
      setErrorMessage(emailCheck.error || 'Email không hợp lệ.');
      return;
    }

    const res = storageService.register({
      displayName: regName,
      email: regEmail,
      password: regPassword,
      role: regRole,
      city: regCity,
      interests: ['Di sản Việt Nam', 'Ẩm thực truyền thống'],
      emailVerified: true
    });

    if (!res.success || !res.user) {
      setErrorMessage(res.error || 'Đăng ký tài khoản không thành công.');
      return;
    }

    setCurrentUser(res.user);
    onUserChange(res.user);
    setActivities(storageService.getActivities(res.user.id));
    setSuccessMessage(`Đăng ký thành công! Chào mừng ${res.user.displayName} gia nhập Hồn Đất Việt (+100 XP)`);
    setTimeout(() => {
      setActiveTab('profile');
      setSuccessMessage('');
    }, 800);
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!oldPassword.trim()) {
      setErrorMessage('Vui lòng nhập mật khẩu hiện tại.');
      return;
    }
    if (!newPassword.trim() || newPassword.length < 6) {
      setErrorMessage('Mật khẩu mới phải có tối thiểu 6 ký tự.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorMessage('Xác nhận mật khẩu mới không khớp.');
      return;
    }
    if (oldPassword === newPassword) {
      setErrorMessage('Mật khẩu mới không được trùng với mật khẩu cũ.');
      return;
    }

    setIsChangingPass(true);
    setTimeout(() => {
      const res = storageService.changePassword(oldPassword, newPassword);
      setIsChangingPass(false);

      if (!res.success) {
        setErrorMessage(res.error || 'Đổi mật khẩu không thành công.');
        return;
      }

      setSuccessMessage('Đổi mật khẩu thành công! Thông tin bảo mật đã được cập nhật.');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      const updated = storageService.getCurrentUser();
      setCurrentUser(updated);
      onUserChange(updated);
    }, 400);
  };

  const handleLogout = () => {
    const guest = storageService.logout();
    setCurrentUser(guest);
    onUserChange(guest);
    setActivities(storageService.getActivities(guest.id));
    setSuccessMessage('Đã đăng xuất tài khoản.');
    setTimeout(() => {
      setActiveTab('login');
      setSuccessMessage('');
    }, 600);
  };

  const handleClearHistory = () => {
    if (window.confirm('Bạn có chắc muốn xóa lịch sử thao tác của tài khoản này?')) {
      storageService.clearActivities(currentUser.id);
      setActivities([]);
    }
  };

  const filteredActivities = activities.filter(a => {
    if (selectedActionFilter === 'all') return true;
    return a.actionType === selectedActionFilter;
  });

  const getActionIcon = (type: UserActionType) => {
    switch (type) {
      case 'recognize': return <Camera className="w-4 h-4 text-emerald-400" />;
      case 'story': return <Sparkles className="w-4 h-4 text-amber-400" />;
      case 'chat': return <MessageSquareQuote className="w-4 h-4 text-blue-400" />;
      case 'itinerary': return <Calendar className="w-4 h-4 text-orange-400" />;
      case 'memory': return <Mic className="w-4 h-4 text-rose-400" />;
      case 'quiz': return <Award className="w-4 h-4 text-purple-400" />;
      case 'favorite': return <Heart className="w-4 h-4 text-red-400 fill-red-400" />;
      case 'community': return <BookOpen className="w-4 h-4 text-teal-400" />;
      default: return <History className="w-4 h-4 text-stone-400" />;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-50 flex items-start justify-center p-2 sm:p-4 pt-2 sm:pt-4 bg-black/80 backdrop-blur-md overflow-hidden"
        >
          {/* Modal Container */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.94, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 10 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="bg-stone-900 border border-stone-800 rounded-3xl max-w-2xl w-full max-h-[96vh] flex flex-col shadow-2xl overflow-hidden relative"
          >
        
        {/* Header with Navigation Tabs */}
        <div className="p-4 sm:p-5 border-b border-stone-800 bg-stone-950/60 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-500 to-red-600 flex items-center justify-center text-stone-950 font-bold font-serif text-sm shadow">
              H
            </div>
            <div>
              <h3 className="font-serif font-bold text-stone-100 text-base sm:text-lg">
                {activeTab === 'login' && 'Đăng Nhập Tài Khoản'}
                {activeTab === 'register' && 'Đăng Ký Thành Viên'}
                {activeTab === 'profile' && 'Hồ Sơ & Danh Hiệu'}
                {activeTab === 'security' && 'Thay Đổi Mật Khẩu'}
                {activeTab === 'activity' && 'Lịch Sử Thao Tác Web'}
              </h3>
              <p className="text-[11px] text-stone-400">
                {activeTab === 'security' 
                  ? 'Bảo vệ tài khoản với mật khẩu bảo mật mới (tối thiểu 6 ký tự)' 
                  : 'Lưu trữ di sản, điểm văn hóa & lịch trình trên thiết bị của bạn'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition-colors"
            title="Đóng cửa sổ"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation Switcher */}
        <div className="flex border-b border-stone-800 bg-stone-950/40 px-3 sm:px-5 gap-1 overflow-x-auto no-scrollbar">
          {currentUser.isLoggedIn ? (
            <>
              <button
                onClick={() => setActiveTab('profile')}
                className={`py-3 px-4 text-xs sm:text-sm font-semibold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
                  activeTab === 'profile'
                    ? 'border-amber-500 text-amber-400'
                    : 'border-transparent text-stone-400 hover:text-stone-200'
                }`}
              >
                <Award className="w-4 h-4 text-amber-400" />
                <span>Hồ Sơ & Danh Hiệu</span>
              </button>

              <button
                onClick={() => setActiveTab('security')}
                className={`py-3 px-4 text-xs sm:text-sm font-semibold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
                  activeTab === 'security'
                    ? 'border-amber-500 text-amber-400'
                    : 'border-transparent text-stone-400 hover:text-stone-200'
                }`}
              >
                <KeyRound className="w-4 h-4" />
                <span>Đổi Mật Khẩu</span>
              </button>

              <button
                onClick={() => setActiveTab('activity')}
                className={`py-3 px-4 text-xs sm:text-sm font-semibold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
                  activeTab === 'activity'
                    ? 'border-amber-500 text-amber-400'
                    : 'border-transparent text-stone-400 hover:text-stone-200'
                }`}
              >
                <History className="w-4 h-4" />
                <span>Lịch Sử Thao Tác ({activities.length})</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  onNavigateTab?.('profile');
                }}
                className="py-3 px-3 text-xs font-semibold border-b-2 border-transparent text-amber-400/80 hover:text-amber-300 hover:border-amber-500/50 transition-all flex items-center gap-1.5 whitespace-nowrap ml-auto"
                title="Mở toàn màn hình"
              >
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">Trang Danh Hiệu Đầy Đủ ↗</span>
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setActiveTab('login')}
                className={`py-3 px-4 text-xs sm:text-sm font-semibold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
                  activeTab === 'login'
                    ? 'border-amber-500 text-amber-400'
                    : 'border-transparent text-stone-400 hover:text-stone-200'
                }`}
              >
                <Lock className="w-4 h-4" />
                <span>Đăng Nhập</span>
              </button>

              <button
                onClick={() => setActiveTab('register')}
                className={`py-3 px-4 text-xs sm:text-sm font-semibold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
                  activeTab === 'register'
                    ? 'border-amber-500 text-amber-400'
                    : 'border-transparent text-stone-400 hover:text-stone-200'
                }`}
              >
                <User className="w-4 h-4" />
                <span>Đăng Ký Mới</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  onNavigateTab?.('profile');
                }}
                className="py-3 px-3 text-xs font-semibold border-b-2 border-transparent text-amber-400/80 hover:text-amber-300 hover:border-amber-500/50 transition-all flex items-center gap-1.5 whitespace-nowrap ml-auto"
              >
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>Xem Hồ Sơ & Danh Hiệu ↗</span>
              </button>
            </>
          )}
        </div>

        {/* Notifications */}
        {errorMessage && (
          <div className="mx-4 sm:mx-6 mt-4 p-3 bg-red-950/40 border border-red-500/30 rounded-xl text-red-300 text-xs flex items-center gap-2 animate-fadeIn">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="mx-4 sm:mx-6 mt-4 p-3 bg-emerald-950/40 border border-emerald-500/30 rounded-xl text-emerald-300 text-xs flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-4 sm:p-5 space-y-4">

          {/* ==========================================
              TAB 1: LOGIN VIEW
              ========================================== */}
          {activeTab === 'login' && (
            <div className="space-y-4">
              <form onSubmit={handleLogin} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1 uppercase tracking-wider">
                    Tên đăng nhập hoặc Email
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-stone-500 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      required
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="admin hoặc email của bạn"
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl pl-10 pr-4 py-2 text-stone-100 text-xs sm:text-sm focus:outline-none focus:border-amber-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1 uppercase tracking-wider">
                    Mật khẩu
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-stone-500 absolute left-3.5 top-3" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="Nhập mật khẩu..."
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl pl-10 pr-10 py-2 text-stone-100 text-xs sm:text-sm focus:outline-none focus:border-amber-500 transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-stone-500 hover:text-stone-300 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-bold text-xs sm:text-sm shadow-lg shadow-amber-950/40 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Lock className="w-4 h-4" />
                  <span>Đăng Nhập</span>
                </button>
              </form>

              <div className="text-center pt-1 border-t border-stone-800/60">
                <p className="text-xs text-stone-400">
                  Chưa có tài khoản?{' '}
                  <button
                    type="button"
                    onClick={() => setActiveTab('register')}
                    className="text-amber-400 hover:text-amber-300 font-semibold underline cursor-pointer"
                  >
                    Bấm vào đây để Đăng ký mới
                  </button>
                </p>
              </div>
            </div>
          )}

          {/* ==========================================
              TAB 2: REGISTER VIEW
              ========================================== */}
          {activeTab === 'register' && (
            <form onSubmit={handleRegister} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1 uppercase tracking-wider">
                  Họ và tên của bạn:
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-stone-500 absolute left-3.5 top-2.5" />
                  <input
                    type="text"
                    required
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="Ví dụ: Nguyễn Hoàng Nam"
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl pl-10 pr-4 py-2 text-stone-100 text-xs sm:text-sm focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1 uppercase tracking-wider">
                    Địa chỉ Email:
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-stone-500 absolute left-3.5 top-2.5" />
                    <input
                      type="email"
                      required
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="email@vidu.com"
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl pl-10 pr-4 py-2 text-stone-100 text-xs sm:text-sm focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1 uppercase tracking-wider">
                    Mật khẩu khởi tạo:
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-stone-500 absolute left-3.5 top-2.5" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      minLength={6}
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="Tối thiểu 6 ký tự..."
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl pl-10 pr-10 py-2 text-stone-100 text-xs sm:text-sm focus:outline-none focus:border-amber-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-stone-500 hover:text-stone-300 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1 uppercase tracking-wider">
                    Tỉnh / Thành phố:
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-stone-500 absolute left-3.5 top-2.5" />
                    <input
                      type="text"
                      value={regCity}
                      onChange={(e) => setRegCity(e.target.value)}
                      placeholder="Hà Nội, Huế, TP.HCM..."
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl pl-10 pr-4 py-2 text-stone-100 text-xs sm:text-sm focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1 uppercase tracking-wider">
                    Vai trò trải nghiệm:
                  </label>
                  <select
                    value={regRole}
                    onChange={(e) => setRegRole(e.target.value as any)}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-stone-200 text-xs focus:outline-none focus:border-amber-500 font-medium"
                  >
                    <option value="student">Học sinh / Sinh viên</option>
                    <option value="user">Du khách / Yêu văn hóa</option>
                    <option value="researcher">Nhà nghiên cứu</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 mt-1 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-bold text-xs sm:text-sm shadow-lg shadow-amber-950/40 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>✨ Đăng Ký Tài Khoản Ngay (+100 XP)</span>
              </button>

              <div className="text-center pt-1 border-t border-stone-800/60">
                <p className="text-xs text-stone-400">
                  Đã có tài khoản?{' '}
                  <button
                    type="button"
                    onClick={() => setActiveTab('login')}
                    className="text-amber-400 hover:text-amber-300 font-semibold underline cursor-pointer"
                  >
                    Bấm vào đây để Đăng nhập
                  </button>
                </p>
              </div>
            </form>
          )}

          {/* ==========================================
              TAB 3: USER PROFILE & BADGES VIEW
              ========================================== */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              
              {/* User Identity Banner */}
              <div className="bg-stone-950/80 border border-stone-800 rounded-2xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <img
                    src={currentUser.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
                    alt={currentUser.displayName}
                    className="w-14 h-14 rounded-2xl object-cover border-2 border-amber-500/40 shadow"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-serif font-bold text-stone-100 text-lg sm:text-xl">
                        {currentUser.displayName}
                      </h4>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold">
                        {currentUser.roleLabel || 'Thành viên'}
                      </span>
                    </div>
                    <p className="text-xs text-stone-400 flex items-center gap-1 mt-0.5">
                      <Mail className="w-3 h-3" />
                      <span>{currentUser.email}</span>
                      <span className="text-stone-600">•</span>
                      <MapPin className="w-3 h-3 text-red-400" />
                      <span>{currentUser.city || 'Việt Nam'}</span>
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  className="px-3 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-red-400 text-xs font-semibold border border-stone-800 flex items-center gap-1.5 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Đăng Xuất</span>
                </button>
              </div>

              {/* Points & Level Bar */}
              <div className="bg-gradient-to-r from-amber-950/40 via-stone-900 to-amber-950/40 border border-amber-500/30 rounded-2xl p-4 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Flame className="w-5 h-5 text-amber-400 animate-pulse" />
                    <span className="font-serif font-bold text-amber-200 text-sm">
                      {currentUser.level || 'Nhà Khám Phá Trẻ'}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-amber-300 bg-amber-500/20 px-2.5 py-0.5 rounded-lg border border-amber-500/30">
                    {currentUser.points || 120} Điểm Văn Hóa (XP)
                  </span>
                </div>
                <div className="w-full bg-stone-950 rounded-full h-2.5 overflow-hidden border border-stone-800">
                  <div 
                    className="bg-gradient-to-r from-amber-500 to-amber-300 h-full rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, ((currentUser.points || 100) % 500) / 5)}%` }}
                  />
                </div>
                <p className="text-[11px] text-stone-400 text-right">
                  Cần thêm {500 - ((currentUser.points || 100) % 500)} XP để nâng cấp bậc tiếp theo
                </p>
              </div>

              {/* 4 Stats Blocks */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <div className="bg-stone-950 p-3.5 rounded-xl border border-stone-800 text-center">
                  <p className="text-xl font-serif font-bold text-amber-400">{currentUser.favoritesCount || 0}</p>
                  <p className="text-[11px] text-stone-400 mt-0.5">Di sản yêu thích</p>
                </div>
                <div className="bg-stone-950 p-3.5 rounded-xl border border-stone-800 text-center">
                  <p className="text-xl font-serif font-bold text-emerald-400">{currentUser.recognitionsCount || 0}</p>
                  <p className="text-[11px] text-stone-400 mt-0.5">Lần nhận diện AI</p>
                </div>
                <div className="bg-stone-950 p-3.5 rounded-xl border border-stone-800 text-center">
                  <p className="text-xl font-serif font-bold text-blue-400">{currentUser.quizzesCompleted || 0}</p>
                  <p className="text-[11px] text-stone-400 mt-0.5">Quiz hoàn thành</p>
                </div>
                <div className="bg-stone-950 p-3.5 rounded-xl border border-stone-800 text-center">
                  <p className="text-xl font-serif font-bold text-rose-400">{currentUser.storiesCreated || 0}</p>
                  <p className="text-[11px] text-stone-400 mt-0.5">Ký ức & Câu chuyện</p>
                </div>
              </div>

              {/* Badges Collection */}
              <div className="space-y-3">
                <h5 className="text-xs font-semibold text-stone-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span>Huy Hiệu Di Sản Đã Đạt Được</span>
                </h5>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {(currentUser.badges || []).map((b) => (
                    <div
                      key={b.id}
                      className="bg-stone-950 border border-stone-800 p-3 rounded-xl flex items-center gap-3 hover:border-amber-500/40 transition-colors"
                    >
                      <div className="text-2xl shrink-0 p-2 bg-stone-900 rounded-lg border border-stone-800">
                        {b.icon}
                      </div>
                      <div className="truncate">
                        <p className="text-xs font-bold text-stone-200">{b.name}</p>
                        <p className="text-[10px] text-stone-400 truncate">{b.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveTab('security')}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 text-xs font-semibold flex items-center justify-center gap-2 border border-amber-500/30 transition-colors"
                >
                  <KeyRound className="w-4 h-4 text-amber-400" />
                  <span>Thay Đổi Mật Khẩu</span>
                </button>

                <button
                  onClick={() => setActiveTab('activity')}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold flex items-center justify-center gap-2 border border-stone-700 transition-colors"
                >
                  <History className="w-4 h-4 text-amber-400" />
                  <span>Xem Lịch Sử Thao Tác</span>
                </button>
              </div>

            </div>
          )}

          {/* ==========================================
              TAB 3: CHANGE PASSWORD (SECURITY)
              ========================================== */}
          {activeTab === 'security' && (
            <div className="space-y-5 animate-fadeIn">
              
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="space-y-1 text-xs">
                  <h5 className="font-bold text-amber-200">Đổi Mật Khẩu Bảo Mật Tài Khoản</h5>
                  <p className="text-stone-300 leading-relaxed text-[11px]">
                    Đang đăng nhập với tài khoản: <strong className="text-amber-300">{currentUser.displayName}</strong> ({currentUser.email})
                  </p>
                  <p className="text-stone-400 text-[11px]">
                    Mật khẩu mới yêu cầu tối thiểu 6 ký tự để bảo vệ dữ liệu lịch sử và điểm văn hóa của bạn.
                  </p>
                </div>
              </div>

              <form onSubmit={handleChangePassword} className="space-y-4">
                
                {/* Current Password */}
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1.5 uppercase tracking-wider">
                    Mật khẩu hiện tại
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-stone-500 absolute left-3.5 top-3" />
                    <input
                      type={showOldPassword ? 'text' : 'password'}
                      required
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      placeholder="Nhập mật khẩu hiện tại của bạn"
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl pl-10 pr-10 py-2.5 text-stone-100 text-xs sm:text-sm focus:outline-none focus:border-amber-500 transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowOldPassword(!showOldPassword)}
                      className="absolute right-3 top-2.5 text-stone-500 hover:text-stone-300"
                      tabIndex={-1}
                    >
                      {showOldPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* New Password */}
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1.5 uppercase tracking-wider">
                    Mật khẩu mới (tối thiểu 6 ký tự)
                  </label>
                  <div className="relative">
                    <Key className="w-4 h-4 text-stone-500 absolute left-3.5 top-3" />
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      required
                      minLength={6}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Nhập mật khẩu mới..."
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl pl-10 pr-10 py-2.5 text-stone-100 text-xs sm:text-sm focus:outline-none focus:border-amber-500 transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-2.5 text-stone-500 hover:text-stone-300"
                      tabIndex={-1}
                    >
                      {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Password strength indicator */}
                  {newPassword && (
                    <div className="mt-2 space-y-1">
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="text-stone-400">Độ mạnh mật khẩu:</span>
                        <span className={`font-semibold ${
                          newPassword.length < 6 
                            ? 'text-red-400' 
                            : newPassword.length < 9 
                            ? 'text-amber-400' 
                            : 'text-emerald-400'
                        }`}>
                          {newPassword.length < 6 ? 'Quá ngắn (<6)' : newPassword.length < 9 ? 'Trung bình' : 'Mạnh (Tốt)'}
                        </span>
                      </div>
                      <div className="w-full bg-stone-950 rounded-full h-1.5 overflow-hidden border border-stone-800">
                        <div 
                          className={`h-full transition-all duration-300 ${
                            newPassword.length < 6 ? 'w-1/4 bg-red-500' : newPassword.length < 9 ? 'w-2/3 bg-amber-500' : 'w-full bg-emerald-500'
                          }`}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Confirm New Password */}
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1.5 uppercase tracking-wider">
                    Xác nhận lại mật khẩu mới
                  </label>
                  <div className="relative">
                    <CheckCircle2 className="w-4 h-4 text-stone-500 absolute left-3.5 top-3" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      minLength={6}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Nhập lại chính xác mật khẩu mới..."
                      className={`w-full bg-stone-950 border rounded-xl pl-10 pr-10 py-2.5 text-stone-100 text-xs sm:text-sm focus:outline-none transition-colors ${
                        confirmPassword && confirmPassword !== newPassword 
                          ? 'border-red-500/80 focus:border-red-500' 
                          : confirmPassword && confirmPassword === newPassword
                          ? 'border-emerald-500/80 focus:border-emerald-500'
                          : 'border-stone-800 focus:border-amber-500'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-2.5 text-stone-500 hover:text-stone-300"
                      tabIndex={-1}
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {confirmPassword && confirmPassword !== newPassword && (
                    <p className="text-[11px] text-red-400 mt-1">Mật khẩu xác nhận chưa khớp với mật khẩu mới.</p>
                  )}
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveTab('profile')}
                    className="py-3 px-4 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 font-semibold text-xs transition-colors"
                  >
                    Quay lại Hồ sơ
                  </button>

                  <button
                    type="submit"
                    disabled={isChangingPass}
                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-bold text-xs sm:text-sm shadow-lg shadow-amber-950/40 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isChangingPass ? (
                      <span>Đang cập nhật...</span>
                    ) : (
                      <>
                        <KeyRound className="w-4 h-4" />
                        <span>Cập Nhật Mật Khẩu Mới</span>
                      </>
                    )}
                  </button>
                </div>

              </form>

            </div>
          )}

          {/* ==========================================
              TAB 4: ACTIVITY LOG / HISTORY STREAM
              ========================================== */}
          {activeTab === 'activity' && (
            <div className="space-y-4">
              
              <div className="flex flex-wrap items-center justify-between gap-3">
                {/* Filter buttons */}
                <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                  {[
                    { id: 'all', label: 'Tất cả' },
                    { id: 'recognize', label: 'Nhận diện' },
                    { id: 'story', label: 'Kể chuyện' },
                    { id: 'chat', label: 'Hỏi đáp AI' },
                    { id: 'itinerary', label: 'Lịch trình' },
                    { id: 'memory', label: 'Ký ức' },
                    { id: 'quiz', label: 'Quiz' },
                    { id: 'favorite', label: 'Yêu thích' }
                  ].map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setSelectedActionFilter(f.id)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                        selectedActionFilter === f.id
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold'
                          : 'bg-stone-950 text-stone-400 hover:text-stone-200 border border-stone-800'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleClearHistory}
                  className="text-xs text-stone-500 hover:text-red-400 flex items-center gap-1"
                  title="Xóa lịch sử thao tác"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Xóa lịch sử</span>
                </button>
              </div>

              {/* Activity Timeline List */}
              {filteredActivities.length === 0 ? (
                <div className="py-12 text-center text-stone-500 bg-stone-950/40 rounded-2xl border border-dashed border-stone-800">
                  <History className="w-10 h-10 mx-auto text-stone-700 mb-2" />
                  <p className="text-xs font-semibold text-stone-400">Chưa có thao tác nào ghi nhận</p>
                  <p className="text-[11px] text-stone-500 mt-1">Các hành động nhận diện, nghe kể chuyện, tạo lịch trình sẽ xuất hiện tại đây.</p>
                </div>
              ) : (
                <div className="space-y-2.5">
                  {filteredActivities.map((act) => (
                    <div
                      key={act.id}
                      className="p-3 bg-stone-950 border border-stone-800/90 hover:border-amber-500/30 rounded-xl flex items-start gap-3 transition-colors"
                    >
                      <div className="p-2 bg-stone-900 rounded-lg border border-stone-800 shrink-0 mt-0.5">
                        {getActionIcon(act.actionType)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline justify-between gap-2">
                          <h6 className="text-xs font-bold text-stone-200 truncate">
                            {act.title}
                          </h6>
                          <span className="text-[10px] text-stone-500 shrink-0 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {new Date(act.timestamp).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })} • {new Date(act.timestamp).toLocaleDateString('vi-VN')}
                          </span>
                        </div>
                        <p className="text-xs text-stone-400 mt-0.5 leading-relaxed">
                          {act.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-stone-800 bg-stone-950/60 flex items-center justify-between text-xs text-stone-400">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Dữ liệu lưu trữ an toàn trực tiếp trên trình duyệt thiết bị</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold transition-colors"
          >
            Xong
          </button>
        </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
