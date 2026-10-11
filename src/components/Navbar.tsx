import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  MapPin, 
  Compass, 
  Camera, 
  MessageSquareQuote, 
  Utensils, 
  CalendarDays, 
  Mic, 
  BookOpen, 
  Users, 
  ShieldCheck, 
  Info, 
  Heart, 
  Globe, 
  Menu, 
  X,
  User,
  History,
  LogIn,
  LogOut,
  Award,
  ArrowLeft,
  Database,
  WifiOff,
  Eye,
  Plus,
  Languages,
  ChevronDown,
  Settings
} from 'lucide-react';
import { UserProfile } from '../types';
import { PWAInstallButton } from './PWAInstallButton';
import { storageService, DEFAULT_SITE_LOGO } from '../services/storageService';
import { SUPPORTED_LANGUAGES, languageService } from '../services/languageService';

interface NavbarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  favoritesCount: number;
  userProfile: UserProfile;
  language: string;
  onLanguageChange: (lang: string) => void;
  onOpenAuthModal: (initialTab?: 'login' | 'register' | 'profile' | 'activity') => void;
  onOpenOfflineManager?: () => void;
  onLogout?: () => void;
  onPeekBackground?: () => void;
  onOpenAddHeritage?: () => void;
  onOpenLanguageModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  favoritesCount,
  userProfile,
  language,
  onLanguageChange,
  onOpenAuthModal,
  onOpenOfflineManager,
  onLogout,
  onPeekBackground,
  onOpenAddHeritage,
  onOpenLanguageModal
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [siteLogo, setSiteLogo] = useState<string>(() => storageService.getSiteLogo());

  useEffect(() => {
    const handleLogoChange = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail) {
        setSiteLogo(customEvent.detail);
      }
    };
    window.addEventListener('hdv_site_logo_changed', handleLogoChange);
    return () => window.removeEventListener('hdv_site_logo_changed', handleLogoChange);
  }, []);

  const navItems = [
    { id: 'home', label: languageService.t('nav.home', language, 'Trang chủ'), icon: Compass },
    { id: 'heritage', label: languageService.t('nav.heritage', language, 'Di sản'), icon: MapPin },
    { id: 'recognizer', label: languageService.t('nav.recognizer', language, 'Nhận diện AI'), icon: Camera, badge: 'Vision' },
    { id: 'storyteller', label: languageService.t('nav.storyteller', language, 'Kể chuyện AI'), icon: Sparkles },
    { id: 'chat', label: languageService.t('nav.chat', language, 'Hướng Dẫn Viên AI'), icon: Compass, badge: 'HDV 3D' },
    { id: 'map', label: languageService.t('nav.map', language, 'Bản đồ'), icon: Globe },
    { id: 'food', label: languageService.t('nav.food', language, 'Ăn uống & Vui chơi'), icon: Utensils },
    { id: 'itinerary', label: languageService.t('nav.itinerary', language, 'Lịch trình'), icon: CalendarDays },
    { id: 'crafts', label: languageService.t('nav.crafts', language, 'Làng nghề & Nghệ thuật'), icon: BookOpen },
    { id: 'learning', label: languageService.t('nav.learning', language, 'Quiz & Lịch sử'), icon: Award },
    { id: 'profile', label: languageService.t('nav.profile', language, 'Hồ sơ & Danh hiệu'), icon: Award, badge: 'XP' },
    { id: 'community', label: languageService.t('nav.community', language, 'Cộng đồng'), icon: Users },
  ];

  return (
    <header className="sticky top-0 z-40 bg-stone-950/80 backdrop-blur-md border-b border-amber-900/30 text-stone-100 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand & Back Button */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {currentTab !== 'home' && (
              <button
                id="btn-nav-back-to-home"
                type="button"
                onClick={() => onSelectTab('home')}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/40 text-xs font-bold transition-all group shrink-0 active:scale-95 shadow-sm whitespace-nowrap"
                title="Quay về Trang chủ"
              >
                <ArrowLeft className="w-4 h-4 text-amber-400 group-hover:-translate-x-1 transition-transform shrink-0" />
                <span className="hidden sm:inline">Trang chủ</span>
              </button>
            )}

            <div 
              id="brand-logo"
              onClick={() => onSelectTab('home')}
              className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group select-none shrink-0"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl overflow-hidden shadow-lg shadow-amber-900/40 border border-amber-400/30 group-hover:scale-105 transition-transform duration-200 shrink-0 bg-stone-900 flex items-center justify-center">
                <img 
                  src={siteLogo || DEFAULT_SITE_LOGO} 
                  alt="Hồn Đất Việt" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // In case of any path error or HMR glitch, gracefully fallback to stylish gradient H
                    e.currentTarget.style.display = 'none';
                    const parent = e.currentTarget.parentElement;
                    if (parent) {
                      parent.className = "w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-amber-600 via-red-600 to-amber-500 flex items-center justify-center shadow-lg shadow-amber-900/40 border border-amber-400/40 group-hover:scale-105 transition-transform duration-200 shrink-0";
                      const textSpan = document.createElement('span');
                      textSpan.className = "text-lg sm:text-xl font-serif font-bold text-amber-100";
                      textSpan.innerText = "H";
                      parent.appendChild(textSpan);
                    }
                  }}
                />
              </div>
              <div className="shrink-0 whitespace-nowrap">
                <div className="flex items-center gap-1.5 whitespace-nowrap">
                  <span className="font-serif font-bold tracking-wide text-base sm:text-lg text-amber-100 group-hover:text-amber-300 transition-colors whitespace-nowrap">
                    HỒN ĐẤT <span className="text-amber-400">VIỆT</span>
                  </span>
                  <span className="text-[9px] sm:text-[10px] px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-medium whitespace-nowrap">
                    VN 4.0
                  </span>
                </div>
                <p className="text-[10px] sm:text-[11px] text-stone-400 hidden sm:block font-normal whitespace-nowrap">
                  {languageService.t('nav.brandTagline', language, 'Hiểu di sản. Khám phá Việt Nam.')}
                </p>
              </div>
            </div>
          </div>

          {/* Desktop Primary Nav (Key Items) */}
          <nav className="hidden xl:flex items-center gap-1 shrink-0">
            {navItems.slice(0, 5).map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => onSelectTab(item.id)}
                  className={`relative px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 flex items-center gap-1.5 whitespace-nowrap ${
                    isActive 
                      ? 'bg-amber-600/30 text-amber-300 border border-amber-500/40 shadow-sm' 
                      : 'text-stone-300 hover:text-amber-200 hover:bg-stone-800/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[9px] px-1 py-0.2 bg-amber-500 text-stone-950 font-bold rounded shrink-0">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}

            {/* Desktop More Dropdown */}
            <div className="relative group shrink-0">
              <button
                className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-stone-300 hover:text-amber-200 hover:bg-stone-800/60 flex items-center gap-1 whitespace-nowrap"
              >
                <span>{languageService.t('nav.more', language, 'Thêm')}</span>
                <span className="text-[10px]">▼</span>
              </button>
              <div className="absolute right-0 top-full hidden group-hover:block w-56 bg-stone-900 border border-stone-800 rounded-xl shadow-2xl py-2 z-50 animate-fadeIn">
                {navItems.slice(5).map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => onSelectTab(item.id)}
                      className={`w-full text-left px-4 py-2 text-xs flex items-center justify-between transition-colors ${
                        currentTab === item.id 
                          ? 'bg-amber-500/20 text-amber-300 font-semibold' 
                          : 'text-stone-300 hover:bg-stone-800 hover:text-amber-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Icon className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className="text-[9px] px-1.5 py-0.2 bg-amber-500/20 text-amber-400 rounded shrink-0">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
                <div className="border-t border-stone-800 my-1"></div>
                <button
                  onClick={() => onSelectTab('admin')}
                  className="w-full text-left px-4 py-2 text-xs text-amber-400 hover:bg-stone-800 flex items-center gap-2"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>Admin Dashboard</span>
                </button>
              </div>
            </div>
          </nav>

          {/* Right actions: Login/Register (Highest Priority), Add Heritage, Favorites, Utilities, Hamburger */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            
            {/* 🌟 1. HIGHEST PRIORITY: Authentication / Profile Status Button */}
            {userProfile.isLoggedIn ? (
              <button
                id="btn-profile"
                onClick={() => onSelectTab('profile')}
                className="flex items-center gap-1.5 p-1 sm:px-2.5 sm:py-1 rounded-full bg-stone-800/90 hover:bg-stone-700/90 border border-amber-500/40 transition-all shrink-0 cursor-pointer"
                title={`Tài khoản: ${userProfile.displayName}`}
              >
                <img 
                  src={userProfile.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'} 
                  alt={userProfile.displayName} 
                  className="w-6 h-6 rounded-full object-cover border border-amber-400"
                />
                <span className="text-xs font-semibold text-stone-200 hidden md:inline truncate max-w-[90px]">
                  {userProfile.displayName}
                </span>
              </button>
            ) : (
              <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
                <button
                  id="btn-login"
                  onClick={() => onOpenAuthModal('login')}
                  className="flex items-center gap-1 p-2 sm:px-2.5 sm:py-1.5 rounded-xl bg-stone-900/90 hover:bg-stone-800 text-amber-300 hover:text-amber-200 border border-amber-500/40 text-xs font-bold transition-all shrink-0 shadow-sm cursor-pointer whitespace-nowrap"
                  title={languageService.t('nav.login', language, 'Đăng nhập')}
                >
                  <LogIn className="w-4 h-4 sm:w-3.5 sm:h-3.5 text-amber-400 shrink-0" />
                  <span className="hidden md:inline">{languageService.t('nav.login', language, 'Đăng nhập')}</span>
                </button>
                <button
                  id="btn-register"
                  onClick={() => onOpenAuthModal('register')}
                  className="flex items-center gap-1 p-2 sm:px-3 sm:py-1.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-stone-950 text-xs font-extrabold shadow-md shadow-amber-950/40 transition-all shrink-0 active:scale-95 cursor-pointer border border-amber-300 whitespace-nowrap"
                  title={languageService.t('nav.register', language, 'Đăng ký')}
                >
                  <User className="w-4 h-4 sm:w-3.5 sm:h-3.5 text-stone-950 shrink-0" />
                  <span className="hidden md:inline">{languageService.t('nav.register', language, 'Đăng ký')}</span>
                </button>
              </div>
            )}

            {/* 🌐 PROMINENT LANGUAGE SELECTOR (Always visible beside login/profile for all visitors) */}
            <div className="relative shrink-0">
              <button
                id="btn-language-selector-desktop"
                type="button"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1.5 rounded-xl bg-stone-900/90 hover:bg-stone-800 text-stone-200 hover:text-amber-300 border border-stone-700/80 hover:border-amber-500/50 text-xs font-semibold transition-all shadow-sm cursor-pointer select-none"
                title="Cài đặt & Đổi ngôn ngữ (Language Settings)"
              >
                <Globe className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="text-sm shrink-0 leading-none">{languageService.getLanguageInfo(language).flag}</span>
                <span className="font-mono text-[11px] font-bold text-amber-300 uppercase">
                  {language.toUpperCase()}
                </span>
                <ChevronDown className={`w-3 h-3 text-stone-400 transition-transform duration-200 ${langDropdownOpen ? 'rotate-180 text-amber-400' : ''}`} />
              </button>

              {langDropdownOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setLangDropdownOpen(false)} 
                  />
                  <div className="absolute right-0 top-full mt-2 w-60 bg-stone-900/95 backdrop-blur-xl border border-stone-800 rounded-2xl shadow-2xl py-2 z-50 animate-fadeIn">
                    <div className="px-3 py-1.5 border-b border-stone-800/80 mb-1 flex items-center justify-between">
                      <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider flex items-center gap-1">
                        <Languages className="w-3.5 h-3.5 text-amber-400" />
                        <span>Ngôn ngữ / Language</span>
                      </span>
                    </div>

                    <div className="max-h-64 overflow-y-auto py-1">
                      {SUPPORTED_LANGUAGES.map((item) => {
                        const isCurrent = language === item.code;
                        return (
                          <button
                            key={item.code}
                            type="button"
                            onClick={() => {
                              onLanguageChange(item.code);
                              setLangDropdownOpen(false);
                            }}
                            className={`w-full px-3 py-2 text-left text-xs flex items-center justify-between transition-colors ${
                              isCurrent
                                ? 'bg-amber-500/20 text-amber-300 font-bold'
                                : 'text-stone-300 hover:bg-stone-800 hover:text-amber-200'
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <span className="text-lg">{item.flag}</span>
                              <div className="truncate">
                                <div className="leading-tight font-medium">{item.nativeName}</div>
                                <div className="text-[10px] text-stone-500">{item.name}</div>
                              </div>
                            </div>
                            {isCurrent && (
                              <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0"></span>
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {onOpenLanguageModal && (
                      <div className="border-t border-stone-800/80 pt-1.5 mt-1 px-1.5">
                        <button
                          type="button"
                          onClick={() => {
                            setLangDropdownOpen(false);
                            onOpenLanguageModal();
                          }}
                          className="w-full px-2.5 py-2 rounded-xl text-left text-xs text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 flex items-center gap-2 font-bold transition-colors cursor-pointer"
                        >
                          <Settings className="w-3.5 h-3.5 text-amber-400" />
                          <span>Cài đặt chi tiết & giọng đọc</span>
                        </button>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* 🌟 2. SECOND PRIORITY: "ĐỀ XUẤT MỚI" BUTTON */}
            {onOpenAddHeritage && (
              <button
                id="btn-nav-add-heritage"
                onClick={onOpenAddHeritage}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-xs shadow-md shadow-amber-950/40 transition-all shrink-0 active:scale-95 cursor-pointer border border-amber-300"
                title={languageService.t('nav.suggest', language, 'Đề Xuất Mới')}
              >
                <img 
                  src={siteLogo || DEFAULT_SITE_LOGO} 
                  alt="Logo Hồn Đất Việt" 
                  className="w-4 h-4 rounded-full object-cover border border-amber-950/40 shrink-0" 
                />
                <span className="hidden md:inline">{languageService.t('nav.suggest', language, 'Đề Xuất Mới')}</span>
              </button>
            )}

            {/* 🌟 3. FAVORITES ICON */}
            <button
              id="btn-favorites"
              onClick={() => onSelectTab('favorites')}
              className="relative p-2 rounded-xl text-stone-300 hover:text-red-400 hover:bg-stone-800/80 transition-colors shrink-0"
              title="Danh sách di sản đã lưu"
            >
              <Heart className="w-4 h-4 text-red-400 fill-red-500/30" />
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center">
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* Quick Peek Background Icon */}
            {onPeekBackground && (
              <button
                id="btn-peek-background-nav"
                onClick={onPeekBackground}
                className="p-2 rounded-xl text-stone-300 hover:text-emerald-400 hover:bg-stone-800/80 transition-colors shrink-0 hidden sm:flex"
                title="Ngắm trọn vẹn bức ảnh nền danh thắng"
              >
                <Eye className="w-4 h-4 text-emerald-400" />
              </button>
            )}

            {/* Offline Heritage Cache Manager Button */}
            {onOpenOfflineManager && (
              <button
                id="btn-offline-mode"
                onClick={onOpenOfflineManager}
                className="hidden 2xl:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold transition-colors shrink-0"
                title="Quản lý Chế độ Ngoại tuyến & Service Worker"
              >
                <Database className="w-3.5 h-3.5 text-amber-400" />
                <span>Ngoại tuyến</span>
              </button>
            )}

            {/* PWA In-App Install Button */}
            <div className="hidden 2xl:block shrink-0">
              <PWAInstallButton variant="button" />
            </div>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl text-stone-300 hover:text-stone-100 hover:bg-stone-800 transition-colors shrink-0"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-amber-400" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-stone-950/95 backdrop-blur-xl border-b border-amber-900/40 px-4 pt-3 pb-8 space-y-2 animate-fadeIn max-h-[calc(100vh-4.5rem)] overflow-y-auto pb-safe shadow-2xl">
          
          {/* Mobile User Profile Bar */}
          <div className="p-3 bg-stone-900/90 rounded-2xl border border-stone-800 flex items-center justify-between gap-3 mb-2">
            {userProfile.isLoggedIn ? (
              <div 
                onClick={() => {
                  onOpenAuthModal('profile');
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-3 cursor-pointer flex-1 min-w-0"
              >
                <img 
                  src={userProfile.avatarUrl} 
                  alt={userProfile.displayName} 
                  className="w-10 h-10 rounded-full object-cover border-2 border-amber-500 shrink-0"
                />
                <div className="min-w-0 truncate">
                  <p className="text-xs font-bold text-stone-100 truncate">{userProfile.displayName}</p>
                  <p className="text-[10px] text-amber-400 truncate">{userProfile.level || 'Nhà Khám Phá'}</p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-2.5 p-1">
                <div>
                  <p className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                    <User className="w-4 h-4 text-amber-400" />
                    <span>{languageService.t('nav.memberAccount', language, 'Tài Khoản Thành Viên')}</span>
                  </p>
                  <p className="text-[10px] text-stone-400">{languageService.t('nav.memberDesc', language, 'Đăng nhập để tích điểm XP & nhận danh hiệu di sản')}</p>
                </div>
                <div className="flex items-center gap-1.5 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => {
                      if (onOpenLanguageModal) {
                        setMobileMenuOpen(false);
                        onOpenLanguageModal();
                      }
                    }}
                    className="px-2.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-amber-300 border border-amber-500/30 text-xs font-semibold flex items-center justify-center gap-1 min-h-[38px] active:scale-95 shadow cursor-pointer"
                    title="Đổi ngôn ngữ / Change language"
                  >
                    <Globe className="w-3.5 h-3.5 text-amber-400" />
                    <span className="text-sm">{languageService.getLanguageInfo(language).flag}</span>
                    <span className="font-mono text-[10px] font-bold text-amber-300 uppercase">{language}</span>
                  </button>
                  <button
                    onClick={() => {
                      onOpenAuthModal('login');
                      setMobileMenuOpen(false);
                    }}
                    className="flex-1 sm:flex-initial px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-300 text-xs font-bold border border-amber-500/40 flex items-center justify-center gap-1.5 active:scale-95 shadow cursor-pointer min-h-[38px]"
                  >
                    <LogIn className="w-3.5 h-3.5 text-amber-400" />
                    <span>{languageService.t('nav.login', language, 'Đăng Nhập')}</span>
                  </button>
                  <button
                    onClick={() => {
                      onOpenAuthModal('register');
                      setMobileMenuOpen(false);
                    }}
                    className="flex-1 sm:flex-initial px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-stone-950 text-xs font-extrabold flex items-center justify-center gap-1.5 active:scale-95 shadow-md shadow-amber-950/40 cursor-pointer min-h-[38px]"
                  >
                    <User className="w-3.5 h-3.5 text-stone-950" />
                    <span>{languageService.t('nav.register', language, 'Đăng Ký')}</span>
                  </button>
                </div>
              </div>
            )}

            {userProfile.isLoggedIn && (
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() => {
                    onOpenAuthModal('activity');
                    setMobileMenuOpen(false);
                  }}
                  className="p-2.5 rounded-xl bg-stone-900 text-stone-300 text-xs flex items-center gap-1 border border-stone-800 min-h-[40px]"
                  title={languageService.t('nav.history', language, 'Lịch sử hoạt động')}
                >
                  <History className="w-4 h-4 text-amber-400" />
                  <span className="hidden sm:inline">{languageService.t('nav.history', language, 'Lịch sử')}</span>
                </button>

                {onLogout && (
                  <button
                    onClick={() => {
                      onLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="p-2.5 rounded-xl bg-red-950/40 text-red-300 text-xs flex items-center gap-1 border border-red-900/40 min-h-[40px]"
                    title={languageService.t('nav.logout', language, 'Đăng xuất')}
                  >
                    <LogOut className="w-4 h-4 text-red-400" />
                    <span className="hidden sm:inline">{languageService.t('nav.logout', language, 'Thoát')}</span>
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Quick Return to Home Button on Mobile Menu */}
          {currentTab !== 'home' && (
            <button
              onClick={() => {
                onSelectTab('home');
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 px-3.5 rounded-xl bg-gradient-to-r from-amber-600/30 to-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold flex items-center justify-center gap-2 mb-2 active:scale-98 transition-all shadow-sm min-h-[44px]"
            >
              <ArrowLeft className="w-4 h-4 text-amber-400" />
              <span>{languageService.t('nav.backToHome', language, 'Quay lại Trang chủ')}</span>
            </button>
          )}

          {/* Navigation Links Grid for Mobile */}
          <div className="grid grid-cols-2 gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`p-3 rounded-xl text-xs font-medium flex items-center justify-between transition-colors min-h-[44px] ${
                    isActive 
                      ? 'bg-amber-600/30 text-amber-300 border border-amber-500/40 shadow-sm' 
                      : 'bg-stone-900/80 text-stone-300 hover:bg-stone-800'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <Icon className="w-4 h-4 text-amber-400 shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 shrink-0">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Mobile Language Section */}
          <div className="bg-stone-900/80 border border-stone-800 rounded-2xl p-3 space-y-2 mt-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-amber-400" />
                <span>Ngôn ngữ / Language:</span>
                <strong className="text-stone-100 font-mono text-[11px] bg-amber-500/20 px-1.5 py-0.5 rounded border border-amber-500/30">
                  {languageService.getLanguageInfo(language).flag} {languageService.getLanguageInfo(language).code.toUpperCase()}
                </strong>
              </span>

              {onOpenLanguageModal && (
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenLanguageModal();
                  }}
                  className="text-[11px] text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 p-1"
                >
                  <Settings className="w-3 h-3 text-amber-400" />
                  <span>{languageService.t('lang.settings', language, 'Cài đặt')}</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-3 gap-1.5">
              {SUPPORTED_LANGUAGES.map((item) => {
                const isSelected = language === item.code;
                return (
                  <button
                    key={item.code}
                    type="button"
                    onClick={() => {
                      onLanguageChange(item.code);
                    }}
                    className={`py-2 px-1.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 transition-all ${
                      isSelected
                        ? 'bg-amber-500 text-stone-950 font-bold shadow-md scale-[1.02]'
                        : 'bg-stone-950/80 text-stone-300 hover:bg-stone-800 border border-stone-800'
                    }`}
                  >
                    <span className="text-sm">{item.flag}</span>
                    <span className="truncate text-[11px]">{item.nativeName}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="border-t border-stone-800 pt-2 mt-2 space-y-2">
            <div className="flex items-center justify-between gap-2">
              {onOpenOfflineManager && (
                <button
                  onClick={() => {
                    onOpenOfflineManager();
                    setMobileMenuOpen(false);
                  }}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-amber-500/10 text-xs text-amber-300 border border-amber-500/30 hover:bg-amber-500/20 flex items-center justify-center gap-1.5 font-bold min-h-[44px]"
                >
                  <Database className="w-4 h-4 text-amber-400" />
                  <span>{languageService.t('nav.offline', language, 'Chế độ Ngoại tuyến')}</span>
                </button>
              )}

              <div className="flex-1">
                <PWAInstallButton variant="menuItem" />
              </div>
            </div>

            <div className="flex items-center justify-between gap-2">
              <button
                onClick={() => {
                  onSelectTab('admin');
                  setMobileMenuOpen(false);
                }}
                className="flex-1 py-2.5 px-3 rounded-xl bg-stone-900 text-xs text-amber-400 border border-stone-800 hover:bg-stone-800 flex items-center justify-center gap-1.5 min-h-[44px]"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{languageService.t('nav.admin', language, 'Admin Dashboard')}</span>
              </button>

              <button
                onClick={() => {
                  onSelectTab('profile');
                  setMobileMenuOpen(false);
                }}
                className="flex-1 py-2.5 px-3 rounded-xl bg-amber-500/20 text-xs text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 flex items-center justify-center gap-1.5 font-bold min-h-[44px]"
              >
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>{languageService.t('nav.profile', language, 'Hồ sơ & Danh hiệu')}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
