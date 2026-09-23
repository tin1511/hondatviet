import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Lock, 
  User, 
  Mail, 
  MapPin, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  Compass, 
  Camera, 
  BookOpen, 
  Award, 
  Mic, 
  CheckCircle2, 
  AlertCircle,
  ArrowRight,
  Heart,
  Globe,
  Utensils,
  KeyRound,
  Key,
  Navigation,
  RefreshCw,
  X,
  ChevronRight,
  Info
} from 'lucide-react';
import { storageService } from '../services/storageService';
import { geolocationService, CITY_LANDMARK_PRESETS } from '../services/geolocationService';
import { UserProfile, CityLandmarkBackground } from '../types';

interface AuthGatewayProps {
  onLoginSuccess: (user: UserProfile) => void;
}

const VIETNAM_PROVINCES = [
  'Hà Nội',
  'Thành phố Huế',
  'Đà Nẵng',
  'Quảng Nam (Hội An)',
  'Thành phố Hồ Chí Minh',
  'Ninh Bình',
  'Quảng Bình',
  'Bắc Ninh',
  'Phú Thọ',
  'Hà Giang',
  'Lâm Đồng (Đà Lạt)',
  'Cần Thơ',
  'Tỉnh khác'
];

export const AuthGateway: React.FC<AuthGatewayProps> = ({ onLoginSuccess }) => {
  const [activeTab, setActiveTab] = useState<'login' | 'register' | 'forgot'>('login');
  
  // Dynamic GPS Landmark Background state
  const [currentLandmark, setCurrentLandmark] = useState<CityLandmarkBackground>(CITY_LANDMARK_PRESETS[0]);
  const [isDetectingGps, setIsDetectingGps] = useState<boolean>(false);
  const [locationSource, setLocationSource] = useState<'gps' | 'preset' | 'default'>('default');
  const [detectedLocationName, setDetectedLocationName] = useState<string>('Hà Nội');
  const [showCityPicker, setShowCityPicker] = useState<boolean>(false);
  const [gpsError, setGpsError] = useState<string | null>(null);
  const [isPeekingBackground, setIsPeekingBackground] = useState<boolean>(false);

  // Login Form
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  
  // Register Form
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [regRole, setRegRole] = useState<'user' | 'student' | 'researcher'>('user');
  const [regCity, setRegCity] = useState('Hà Nội');

  // Forgot / Reset Password Form
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotNewPass, setForgotNewPass] = useState('');
  const [forgotConfirmPass, setForgotConfirmPass] = useState('');
  const [showForgotNewPass, setShowForgotNewPass] = useState(false);
  const [showForgotConfirmPass, setShowForgotConfirmPass] = useState(false);
  
  // Feedback
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Geolocation detector function
  const detectUserGps = async (showFeedback = false) => {
    setIsDetectingGps(true);
    setGpsError(null);

    try {
      const res = await geolocationService.requestCurrentPosition();
      if (res.success && res.location) {
        const landmark = geolocationService.getCityLandmarkForCoordinates(res.location.lat, res.location.lng);
        setCurrentLandmark(landmark);
        setLocationSource('gps');

        // Reverse geocoding for precise administrative district/city name
        const reverseCity = await geolocationService.reverseGeocodeCity(res.location.lat, res.location.lng);
        const resolvedName = reverseCity || landmark.cityName;
        setDetectedLocationName(resolvedName);

        // Match with province list for registration convenience
        const matchingProvince = VIETNAM_PROVINCES.find(p => 
          resolvedName.toLowerCase().includes(p.toLowerCase()) || 
          landmark.province.toLowerCase().includes(p.toLowerCase())
        );
        if (matchingProvince) {
          setRegCity(matchingProvince);
        }
      } else {
        if (showFeedback && res.error) {
          setGpsError(res.error);
        }
        // Fall back to saved or preset location
        const saved = geolocationService.getLastKnownLocation();
        if (saved) {
          const landmark = geolocationService.getCityLandmarkForCoordinates(saved.lat, saved.lng);
          setCurrentLandmark(landmark);
          setDetectedLocationName(landmark.cityName);
        }
      }
    } catch {
      if (showFeedback) {
        setGpsError('Không thể truy xuất tín hiệu định vị GPS.');
      }
    } finally {
      setIsDetectingGps(false);
    }
  };

  // Initial location detection on mount
  useEffect(() => {
    const saved = geolocationService.getLastKnownLocation();
    if (saved) {
      const landmark = geolocationService.getCityLandmarkForCoordinates(saved.lat, saved.lng);
      setCurrentLandmark(landmark);
      setDetectedLocationName(landmark.cityName);
      setLocationSource(saved.source === 'gps' ? 'gps' : 'preset');
    }

    // Auto-detect GPS seamlessly
    detectUserGps(false);
  }, []);

  const handleSelectLandmarkPreset = (landmark: CityLandmarkBackground) => {
    setCurrentLandmark(landmark);
    setDetectedLocationName(landmark.cityName);
    setLocationSource('preset');
    setShowCityPicker(false);
    setGpsError(null);

    const matchingProvince = VIETNAM_PROVINCES.find(p => 
      landmark.province.toLowerCase().includes(p.toLowerCase()) || 
      landmark.cityName.toLowerCase().includes(p.toLowerCase())
    );
    if (matchingProvince) {
      setRegCity(matchingProvince);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setIsLoading(true);

    setTimeout(() => {
      const res = storageService.login(loginIdentifier, loginPassword);
      setIsLoading(false);

      if (!res.success || !res.user) {
        setErrorMessage(res.error || 'Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.');
        return;
      }

      setSuccessMessage(`Đăng nhập thành công! Chào mừng ${res.user.displayName}`);
      setTimeout(() => {
        onLoginSuccess(res.user!);
      }, 500);
    }, 300);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!regName.trim() || !regEmail.trim()) {
      setErrorMessage('Vui lòng điền đầy đủ họ và tên cùng email.');
      return;
    }

    if (!regPassword || regPassword.length < 6) {
      setErrorMessage('Mật khẩu cần tối thiểu 6 ký tự để bảo mật.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const res = storageService.register({
        displayName: regName,
        email: regEmail,
        password: regPassword,
        role: regRole,
        city: regCity,
        interests: ['Di sản Văn hóa Việt Nam', 'Ẩm thực truyền thống', 'Làng nghề & Nghệ thuật']
      });
      setIsLoading(false);

      if (!res.success || !res.user) {
        setErrorMessage(res.error || 'Đăng ký không thành công.');
        return;
      }

      setSuccessMessage(`Đăng ký tài khoản thành công! Tặng bạn 100 XP khởi đầu.`);
      setTimeout(() => {
        onLoginSuccess(res.user!);
      }, 600);
    }, 350);
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!forgotEmail.trim()) {
      setErrorMessage('Vui lòng nhập email đã đăng ký.');
      return;
    }
    if (!forgotNewPass.trim() || forgotNewPass.length < 6) {
      setErrorMessage('Mật khẩu mới phải có tối thiểu 6 ký tự.');
      return;
    }
    if (forgotNewPass !== forgotConfirmPass) {
      setErrorMessage('Xác nhận lại mật khẩu mới không khớp.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const res = storageService.resetPasswordByEmail(forgotEmail, forgotNewPass);
      setIsLoading(false);

      if (!res.success) {
        setErrorMessage(res.error || 'Đặt lại mật khẩu không thành công.');
        return;
      }

      setSuccessMessage('Đổi mật khẩu thành công! Bạn có thể đăng nhập ngay bây giờ.');
      setLoginIdentifier(forgotEmail);
      setLoginPassword(forgotNewPass);
      setTimeout(() => {
        setActiveTab('login');
      }, 900);
    }, 400);
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col justify-between relative overflow-hidden selection:bg-amber-500 selection:text-stone-950">
      
      {/* Dynamic GPS Landmark Background with Vibrant Visibility */}
      <div 
        onClick={() => isPeekingBackground && setIsPeekingBackground(false)}
        className="absolute inset-0 pointer-events-auto overflow-hidden z-0 select-none cursor-pointer"
        title={isPeekingBackground ? "Chạm để quay lại giao diện" : undefined}
      >
        <img 
          key={currentLandmark.id + currentLandmark.imageUrl}
          src={currentLandmark.imageUrl} 
          alt={currentLandmark.landmarkName}
          referrerPolicy="no-referrer"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=2000&q=85';
          }}
          className={`w-full h-full object-cover object-center transition-all duration-700 ease-out brightness-95 contrast-105 ${
            isPeekingBackground ? 'scale-105 brightness-100' : 'scale-100'
          }`}
        />
        {/* Balanced translucent overlay: Optimized for mobile readability & vivid image visibility */}
        <div className={`absolute inset-0 transition-opacity duration-500 ${isPeekingBackground ? 'opacity-0 bg-transparent' : 'bg-black/25 sm:bg-black/40'}`} />
        <div className={`absolute inset-0 transition-opacity duration-500 ${isPeekingBackground ? 'opacity-0' : 'bg-gradient-to-t from-stone-950/75 via-transparent to-stone-950/20 sm:from-stone-950/90 sm:to-stone-950/40'}`} />
        <div className={`absolute inset-0 transition-opacity duration-500 ${isPeekingBackground ? 'opacity-0' : 'bg-gradient-to-r from-stone-950/50 via-transparent to-stone-950/30 sm:from-stone-950/80 sm:to-stone-950/70'}`} />
      </div>

      {/* Main UI Container Wrapper with Peeking Toggle */}
      <div className={`relative z-10 flex-1 flex flex-col justify-between transition-all duration-300 ${
        isPeekingBackground ? 'opacity-0 pointer-events-none scale-98 invisible' : 'opacity-100 pointer-events-auto scale-100'
      }`}>
        {/* Top Banner Header */}
        <header className="border-b border-stone-800/80 bg-stone-950/75 sm:bg-stone-950/85 backdrop-blur-md px-4 sm:px-8 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-600 via-red-600 to-amber-500 flex items-center justify-center shadow-lg shadow-amber-950/50 border border-amber-400/40">
                <span className="text-xl font-serif font-bold text-amber-100">H</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-serif font-bold tracking-wide text-lg sm:text-xl text-amber-100">
                    HERITAGE<span className="text-amber-400">AI</span>
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold">
                    VN 4.0
                  </span>
                </div>
                <p className="text-xs text-stone-400 hidden sm:block">
                  Hệ sinh thái Tri thức & Trải nghiệm Di sản Văn hóa Việt Nam
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              {/* GPS Landmark Header Pill */}
              <button
                type="button"
                onClick={() => setShowCityPicker(true)}
                className="flex items-center gap-2 text-xs text-stone-300 bg-stone-900/90 hover:bg-stone-800 px-3.5 py-1.5 rounded-full border border-stone-700/80 hover:border-amber-500/50 transition-all cursor-pointer shadow-sm"
                title="Nhấp để đổi danh thắng các tỉnh thành khác"
              >
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="hidden md:inline text-stone-400">Cảnh sắc:</span>
                <span className="font-semibold text-amber-200 truncate max-w-[140px] sm:max-w-[180px]">
                  {detectedLocationName}
                </span>
              </button>

              <div className="hidden sm:flex items-center gap-2 text-xs text-stone-400 bg-stone-900/90 px-3.5 py-1.5 rounded-full border border-stone-800">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Xác thực hệ thống</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center w-full">
          
          {/* Left Column: Introduction & Features Showcase */}
          <div className="lg:col-span-6 space-y-5 sm:space-y-6 text-left">
            
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>Nền tảng Di sản Việt Nam tích hợp Trí tuệ Nhân tạo</span>
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-extrabold text-stone-100 tracking-tight leading-tight">
                Hiểu di sản.<br />
                <span className="bg-gradient-to-r from-amber-400 via-amber-200 to-red-400 bg-clip-text text-transparent">
                  Khám phá Việt Nam.
                </span>
              </h1>
              <p className="text-sm sm:text-base text-stone-300 leading-relaxed font-light drop-shadow-sm">
                Đăng nhập hoặc tạo tài khoản để bước vào kho tàng 3.000+ di sản vật thể và phi vật thể, nhận diện thị giác AI, phục dựng ký ức ông bà, bản đồ văn hóa 63 tỉnh thành và ẩm thực truyền thống.
              </p>
            </div>

            {/* GPS Landmark Live Card */}
            <div className="p-4 rounded-2xl bg-stone-900/65 sm:bg-stone-900/85 border border-stone-800/90 shadow-xl backdrop-blur-md space-y-3">
              <div className="flex items-center justify-between text-xs gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${locationSource === 'gps' ? 'bg-emerald-400' : 'bg-amber-400'} opacity-75`}></span>
                    <span className={`relative inline-flex rounded-full h-2 w-2 ${locationSource === 'gps' ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                  </span>
                  <span className="font-semibold text-stone-300 truncate">
                    {locationSource === 'gps' ? 'Định vị GPS thực tế' : 'Khung cảnh địa phương'}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-medium shrink-0">
                    {detectedLocationName}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => detectUserGps(true)}
                    disabled={isDetectingGps}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-[11px] transition-colors border border-stone-700 disabled:opacity-50 cursor-pointer"
                    title="Lấy lại tọa độ GPS hiện tại"
                  >
                    <RefreshCw className={`w-3 h-3 ${isDetectingGps ? 'animate-spin text-amber-400' : ''}`} />
                    <span>{isDetectingGps ? 'Đang dò GPS...' : 'Lấy GPS'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowCityPicker(true)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-[11px] transition-colors border border-amber-500/30 cursor-pointer"
                    title="Chọn cảnh sắc tỉnh thành khác"
                  >
                    <MapPin className="w-3 h-3" />
                    <span>Đổi cảnh</span>
                  </button>
                </div>
              </div>

              {gpsError && (
                <p className="text-[11px] text-amber-400/90 flex items-center gap-1.5 bg-amber-500/10 px-2.5 py-1.5 rounded-lg border border-amber-500/20">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{gpsError}</span>
                </p>
              )}

              <div className="flex items-center gap-3.5 pt-0.5">
                <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-amber-500/40 shadow-md">
                  <img
                    src={currentLandmark.imageUrl}
                    alt={currentLandmark.landmarkName}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80';
                    }}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs sm:text-sm font-bold text-stone-100 truncate">
                      {currentLandmark.landmarkName}
                    </h4>
                  </div>
                  <p className="text-[11px] text-stone-400 line-clamp-1 mt-0.5 font-light">
                    {currentLandmark.tagline}
                  </p>
                  {currentLandmark.distanceKm !== undefined && (
                    <p className="text-[10px] text-amber-400/90 mt-1 flex items-center gap-1">
                      <Navigation className="w-3 h-3" />
                      <span>
                        {locationSource === 'gps' 
                          ? `Cách tọa độ GPS của bạn: ~${currentLandmark.distanceKm} km`
                          : `Khoảng cách tham chiếu: ~${currentLandmark.distanceKm} km`}
                      </span>
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Feature Badges Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              
              <div className="p-3.5 rounded-2xl bg-stone-900/60 sm:bg-stone-900/70 border border-stone-800/80 backdrop-blur-sm flex items-start gap-3 hover:border-amber-500/40 transition-colors">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center shrink-0 mt-0.5">
                  <Camera className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-200">Nhận diện Thị giác AI</h4>
                  <p className="text-[11px] text-stone-400 mt-0.5">Quét ảnh di tích, hiện vật, kiến trúc và trang phục lập tức.</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-stone-900/60 sm:bg-stone-900/70 border border-stone-800/80 backdrop-blur-sm flex items-start gap-3 hover:border-amber-500/40 transition-colors">
                <div className="w-8 h-8 rounded-xl bg-red-500/20 text-red-300 flex items-center justify-center shrink-0 mt-0.5">
                  <Mic className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-200">Ký ức Ông bà</h4>
                  <p className="text-[11px] text-stone-400 mt-0.5">Ghi âm giọng kể gia đình, AI phục dựng chi tiết lịch sử.</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-stone-900/60 sm:bg-stone-900/70 border border-stone-800/80 backdrop-blur-sm flex items-start gap-3 hover:border-amber-500/40 transition-colors">
                <div className="w-8 h-8 rounded-xl bg-sky-500/20 text-sky-300 flex items-center justify-center shrink-0 mt-0.5">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-200">Bản đồ Di sản & Ẩm thực</h4>
                  <p className="text-[11px] text-stone-400 mt-0.5">Khám phá 63 tỉnh thành, đặc sản địa phương và làng nghề.</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-stone-900/60 sm:bg-stone-900/70 border border-stone-800/80 backdrop-blur-sm flex items-start gap-3 hover:border-amber-500/40 transition-colors">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0 mt-0.5">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-200">Quiz & Tích lũy Huy hiệu</h4>
                  <p className="text-[11px] text-stone-400 mt-0.5">Kiểm tra tri thức lịch sử, thăng cấp Sứ giả Văn hóa.</p>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Authentication Card */}
          <div className="lg:col-span-6 max-w-md w-full mx-auto">
            <div className="bg-stone-900/75 sm:bg-stone-900/90 border border-stone-800/90 rounded-3xl p-5 sm:p-8 shadow-2xl shadow-black/60 backdrop-blur-xl relative">
              
              {/* Tab Selector */}
              <div className="flex bg-stone-950/80 p-1.5 rounded-2xl border border-stone-800 mb-6">
                <button
                  type="button"
                  id="tab-btn-login"
                  onClick={() => {
                    setActiveTab('login');
                    setErrorMessage('');
                    setSuccessMessage('');
                  }}
                  className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                    activeTab === 'login'
                      ? 'bg-amber-600 text-stone-950 shadow-md shadow-amber-950/40'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  <Lock className="w-4 h-4" />
                  <span>Đăng Nhập</span>
                </button>

                <button
                  type="button"
                  id="tab-btn-register"
                  onClick={() => {
                    setActiveTab('register');
                    setErrorMessage('');
                    setSuccessMessage('');
                  }}
                  className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                    activeTab === 'register'
                      ? 'bg-amber-600 text-stone-950 shadow-md shadow-amber-950/40'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  <User className="w-4 h-4" />
                  <span>Tạo Tài Khoản</span>
                </button>
              </div>

            {/* Error Notification */}
            {errorMessage && (
              <div className="mb-5 p-3.5 bg-red-950/70 border border-red-500/40 rounded-2xl text-red-200 text-xs flex items-center gap-2.5 animate-fadeIn">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Success Notification */}
            {successMessage && (
              <div className="mb-5 p-3.5 bg-emerald-950/70 border border-emerald-500/40 rounded-2xl text-emerald-200 text-xs flex items-center gap-2.5 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{successMessage}</span>
              </div>
            )}

            {/* ==========================================
                LOGIN FORM
                ========================================== */}
            {activeTab === 'login' && (
              <form onSubmit={handleLogin} className="space-y-4">
                
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1.5 uppercase tracking-wider">
                    Tên đăng nhập hoặc Email
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-stone-500 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      id="input-login-id"
                      required
                      value={loginIdentifier}
                      onChange={(e) => setLoginIdentifier(e.target.value)}
                      placeholder="admin hoặc email của bạn"
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl pl-10 pr-4 py-3 text-stone-100 text-xs sm:text-sm focus:outline-none focus:border-amber-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider">
                      Mật khẩu
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveTab('forgot');
                        setErrorMessage('');
                        setSuccessMessage('');
                        setForgotEmail(loginIdentifier);
                      }}
                      className="text-xs text-amber-400 hover:text-amber-300 font-medium"
                    >
                      Quên / Đổi mật khẩu?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-stone-500 absolute left-3.5 top-3.5" />
                    <input
                      type={showLoginPassword ? 'text' : 'password'}
                      id="input-login-password"
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl pl-10 pr-11 py-3 text-stone-100 text-xs sm:text-sm focus:outline-none focus:border-amber-500 transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowLoginPassword(!showLoginPassword)}
                      className="absolute right-3.5 top-3.5 text-stone-500 hover:text-stone-300"
                      aria-label="Hiện mật khẩu"
                    >
                      {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  id="btn-submit-login"
                  disabled={isLoading}
                  className="w-full mt-2 py-3.5 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-bold text-xs sm:text-sm shadow-lg shadow-amber-950/40 transition-all flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-50"
                >
                  {isLoading ? (
                    <span>Đang xác thực...</span>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>Đăng Nhập Vào Hệ Thống</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <div className="pt-3 text-center">
                  <p className="text-xs text-stone-400">
                    Chưa có tài khoản?{' '}
                    <button
                      type="button"
                      onClick={() => setActiveTab('register')}
                      className="text-amber-400 hover:text-amber-300 font-semibold underline underline-offset-2"
                    >
                      Đăng ký ngay tại đây
                    </button>
                  </p>
                </div>
              </form>
            )}

            {/* ==========================================
                REGISTER FORM
                ========================================== */}
            {activeTab === 'register' && (
              <form onSubmit={handleRegister} className="space-y-3.5">
                
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1.5 uppercase tracking-wider">
                    Họ và Tên
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-stone-500 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      id="input-reg-name"
                      required
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      placeholder="Ví dụ: Nguyễn Văn Hoàng"
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl pl-10 pr-4 py-2.5 text-stone-100 text-xs sm:text-sm focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1.5 uppercase tracking-wider">
                    Địa chỉ Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-stone-500 absolute left-3.5 top-3" />
                    <input
                      type="email"
                      id="input-reg-email"
                      required
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="hoang.nguyen@email.com"
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl pl-10 pr-4 py-2.5 text-stone-100 text-xs sm:text-sm focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1.5 uppercase tracking-wider">
                    Mật khẩu (tối thiểu 6 ký tự)
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-stone-500 absolute left-3.5 top-3" />
                    <input
                      type={showRegPassword ? 'text' : 'password'}
                      id="input-reg-password"
                      required
                      minLength={6}
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl pl-10 pr-11 py-2.5 text-stone-100 text-xs sm:text-sm focus:outline-none focus:border-amber-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowRegPassword(!showRegPassword)}
                      className="absolute right-3.5 top-3 text-stone-500 hover:text-stone-300"
                    >
                      {showRegPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1.5 uppercase tracking-wider">
                      Tỉnh / Thành phố
                    </label>
                    <select
                      value={regCity}
                      onChange={(e) => setRegCity(e.target.value)}
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2.5 text-stone-100 text-xs sm:text-sm focus:outline-none focus:border-amber-500"
                    >
                      {VIETNAM_PROVINCES.map((p) => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1.5 uppercase tracking-wider">
                      Vai trò quan tâm
                    </label>
                    <select
                      value={regRole}
                      onChange={(e) => setRegRole(e.target.value as any)}
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2.5 text-stone-100 text-xs sm:text-sm focus:outline-none focus:border-amber-500"
                    >
                      <option value="user">Du khách / Yêu văn hóa</option>
                      <option value="student">Học sinh / Sinh viên</option>
                      <option value="researcher">Nhà nghiên cứu / Giảng viên</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  id="btn-submit-register"
                  disabled={isLoading}
                  className="w-full mt-3 py-3.5 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-bold text-xs sm:text-sm shadow-lg shadow-amber-950/40 transition-all flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-50"
                >
                  {isLoading ? (
                    <span>Đang tạo tài khoản...</span>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Đăng Ký & Bắt Đầu (+100 XP)</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <div className="pt-2 text-center">
                  <p className="text-xs text-stone-400">
                    Đã có tài khoản?{' '}
                    <button
                      type="button"
                      onClick={() => setActiveTab('login')}
                      className="text-amber-400 hover:text-amber-300 font-semibold underline underline-offset-2"
                    >
                      Đăng nhập tại đây
                    </button>
                  </p>
                </div>

              </form>
            )}

            {/* ==========================================
                FORGOT / RESET PASSWORD FORM
                ========================================== */}
            {activeTab === 'forgot' && (
              <form onSubmit={handleResetPassword} className="space-y-4 animate-fadeIn">
                <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-start gap-2.5">
                  <KeyRound className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div className="text-xs text-stone-300">
                    <p className="font-semibold text-amber-300">Đặt lại mật khẩu</p>
                    <p className="text-[11px] text-stone-400 mt-0.5">
                      Nhập địa chỉ email đã đăng ký của bạn cùng mật khẩu mới (tối thiểu 6 ký tự).
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1.5 uppercase tracking-wider">
                    Email tài khoản
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-stone-500 absolute left-3.5 top-3.5" />
                    <input
                      type="email"
                      required
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      placeholder="email.da.dangky@domain.com"
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl pl-10 pr-4 py-3 text-stone-100 text-xs sm:text-sm focus:outline-none focus:border-amber-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1.5 uppercase tracking-wider">
                    Mật khẩu mới
                  </label>
                  <div className="relative">
                    <Key className="w-4 h-4 text-stone-500 absolute left-3.5 top-3.5" />
                    <input
                      type={showForgotNewPass ? 'text' : 'password'}
                      required
                      minLength={6}
                      value={forgotNewPass}
                      onChange={(e) => setForgotNewPass(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl pl-10 pr-11 py-3 text-stone-100 text-xs sm:text-sm focus:outline-none focus:border-amber-500 transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowForgotNewPass(!showForgotNewPass)}
                      className="absolute right-3.5 top-3.5 text-stone-500 hover:text-stone-300"
                    >
                      {showForgotNewPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1.5 uppercase tracking-wider">
                    Xác nhận lại mật khẩu mới
                  </label>
                  <div className="relative">
                    <CheckCircle2 className="w-4 h-4 text-stone-500 absolute left-3.5 top-3.5" />
                    <input
                      type={showForgotConfirmPass ? 'text' : 'password'}
                      required
                      minLength={6}
                      value={forgotConfirmPass}
                      onChange={(e) => setForgotConfirmPass(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl pl-10 pr-11 py-3 text-stone-100 text-xs sm:text-sm focus:outline-none focus:border-amber-500 transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowForgotConfirmPass(!showForgotConfirmPass)}
                      className="absolute right-3.5 top-3.5 text-stone-500 hover:text-stone-300"
                    >
                      {showForgotConfirmPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full mt-2 py-3.5 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-bold text-xs sm:text-sm shadow-lg shadow-amber-950/40 transition-all flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-50"
                >
                  {isLoading ? (
                    <span>Đang cập nhật...</span>
                  ) : (
                    <>
                      <KeyRound className="w-4 h-4" />
                      <span>Xác Nhận Đổi Mật Khẩu Mới</span>
                    </>
                  )}
                </button>

                <div className="pt-2 text-center">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('login');
                      setErrorMessage('');
                      setSuccessMessage('');
                    }}
                    className="text-xs text-stone-400 hover:text-stone-200"
                  >
                    ← Quay lại Đăng nhập
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>

      </main>

        {/* Footer info */}
        <footer className="border-t border-stone-900 bg-stone-950/80 backdrop-blur-md px-4 py-4 text-center text-xs text-stone-500">
          <p>Hồn Đất Việt &copy; 2026 &bull; Bảo tồn & Lan tỏa Giá trị Di sản Văn hóa Dân tộc</p>
        </footer>
      </div>

      {/* 📱 Floating Control for Mobile & Desktop Background Peeking */}
      {!isPeekingBackground ? (
        <button
          type="button"
          onClick={() => setIsPeekingBackground(true)}
          className="fixed bottom-4 right-4 z-50 flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-stone-950/90 hover:bg-amber-950 text-amber-300 border border-amber-500/50 shadow-2xl backdrop-blur-md text-xs font-bold transition-all active:scale-95 cursor-pointer ring-2 ring-amber-500/20"
          title="Ẩn khung đăng nhập để thưởng thức ảnh nền danh thắng"
        >
          <Eye className="w-4 h-4 text-emerald-400" />
          <span className="hidden sm:inline">Ngắm ảnh nền GPS</span>
          <span className="sm:hidden">Xem ảnh nền</span>
        </button>
      ) : (
        <div 
          onClick={() => setIsPeekingBackground(false)}
          className="fixed top-4 left-4 right-4 z-50 flex items-center justify-between px-4 py-3 rounded-2xl bg-stone-950/85 border border-amber-500/50 backdrop-blur-lg shadow-2xl text-xs cursor-pointer animate-in fade-in slide-in-from-top-4 duration-300"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <div className="truncate">
              <p className="font-bold text-stone-100 truncate">
                {currentLandmark.landmarkName}
              </p>
              <p className="text-[11px] text-amber-300 truncate">
                {detectedLocationName} • {currentLandmark.tagline}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsPeekingBackground(false);
            }}
            className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shrink-0 shadow-md transition-colors flex items-center gap-1.5"
          >
            <EyeOff className="w-3.5 h-3.5" />
            <span>Hiện lại giao diện</span>
          </button>
        </div>
      )}

      {/* Modal: City Landmark Explorer & Selector */}
      {showCityPicker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-stone-900 border border-stone-800 rounded-3xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
            
            {/* Modal Header */}
            <div className="p-5 border-b border-stone-800 flex items-center justify-between bg-stone-950/60">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-stone-100 text-base sm:text-lg">
                    Cảnh sắc Danh thắng Việt Nam
                  </h3>
                  <p className="text-xs text-stone-400">
                    Khung cảnh hiển thị theo định vị GPS thành phố của bạn
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowCityPicker(false)}
                className="p-2 rounded-xl text-stone-400 hover:text-stone-200 hover:bg-stone-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* GPS Auto Button */}
            <div className="p-4 bg-stone-950/40 border-b border-stone-800/80 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs text-stone-300">
                <Navigation className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Dùng cảm biến GPS thực tế trên thiết bị của bạn:</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  detectUserGps(true);
                  setShowCityPicker(false);
                }}
                disabled={isDetectingGps}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 text-stone-950 font-bold text-xs hover:from-amber-500 hover:to-amber-400 transition-all cursor-pointer shadow-md disabled:opacity-50 shrink-0"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isDetectingGps ? 'animate-spin' : ''}`} />
                <span>{isDetectingGps ? 'Đang định vị...' : 'Bật GPS của tôi'}</span>
              </button>
            </div>

            {/* Landmark Grid */}
            <div className="p-4 sm:p-5 overflow-y-auto space-y-3 max-h-[60vh]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {CITY_LANDMARK_PRESETS.map((landmark) => {
                  const isSelected = currentLandmark.id === landmark.id;
                  return (
                    <button
                      key={landmark.id}
                      type="button"
                      onClick={() => handleSelectLandmarkPreset(landmark)}
                      className={`text-left p-3 rounded-2xl border transition-all flex items-start gap-3.5 cursor-pointer relative overflow-hidden group ${
                        isSelected 
                          ? 'bg-amber-950/30 border-amber-500/80 shadow-lg shadow-amber-950/40 ring-1 ring-amber-500/40' 
                          : 'bg-stone-950/60 border-stone-800/80 hover:border-amber-500/40 hover:bg-stone-800/50'
                      }`}
                    >
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-stone-800 group-hover:border-amber-500/40 transition-colors">
                        <img 
                          src={landmark.imageUrl} 
                          alt={landmark.landmarkName}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        {isSelected && (
                          <div className="absolute inset-0 bg-amber-500/20 flex items-center justify-center">
                            <CheckCircle2 className="w-5 h-5 text-amber-300 drop-shadow" />
                          </div>
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-[10px] uppercase tracking-wider font-semibold text-amber-400">
                            {landmark.cityName}
                          </span>
                          {isSelected && (
                            <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                              Đang chọn
                            </span>
                          )}
                        </div>
                        <h4 className="text-xs sm:text-sm font-bold text-stone-100 truncate mt-0.5">
                          {landmark.landmarkName}
                        </h4>
                        <p className="text-[11px] text-stone-400 line-clamp-2 mt-1 font-light leading-relaxed">
                          {landmark.tagline}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
