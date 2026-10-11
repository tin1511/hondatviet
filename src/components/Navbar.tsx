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
  Plus
} from 'lucide-react';
import { UserProfile } from '../types';
import { PWAInstallButton } from './PWAInstallButton';
import { storageService, DEFAULT_SITE_LOGO } from '../services/storageService';

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
  onOpenAddHeritage
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
    { id: 'home', label: 'Trang chủ', icon: Compass },
    { id: 'map', label: 'Bản đồ Việt Nam', icon: Globe, badge: 'Chữ S 🇻🇳' },
    { id: 'recognizer', label: 'Nhận diện AI', icon: Camera, badge: 'Vision' },
    { id: 'storyteller', label: 'Kể chuyện AI', icon: Sparkles },
    { id: 'chat', label: 'Hướng Dẫn Viên AI', icon: Compass, badge: 'HDV 3D' },
    { id: 'itinerary', label: 'Lịch trình', icon: CalendarDays },
    { id: 'learning', label: 'Quiz & Lịch sử', icon: Award },
    { id: 'profile', label: 'Hồ sơ & Danh hiệu', icon: Award, badge: 'XP' },
    { id: 'community', label: 'Cộng đồng', icon: Users },
  ];

  return (
    <header className="sticky top-0 z-40 bg-stone-950/90 backdrop-blur-md border-b border-amber-900/30 text-stone-100 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Row 1: Brand & Right Actions */}
        <div className="flex items-center justify-between h-16 overflow-x-auto scrollbar-none gap-2 shrink-0 pr-6 sm:pr-8">
          
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
                  Hiểu di sản. Khám phá Việt Nam.
                </p>
              </div>
            </div>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            
            {/* 1. Authentication / Profile Status Button */}
            {userProfile.isLoggedIn ? (
              <button
                id="btn-profile"
                onClick={() => onSelectTab('profile')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-800/90 hover:bg-stone-700/90 border border-amber-500/40 transition-all shrink-0 cursor-pointer"
                title={`Tài khoản: ${userProfile.displayName}`}
              >
                <User className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-xs font-semibold text-stone-200 truncate max-w-[140px] sm:max-w-[185px]">
                  {userProfile.displayName}
                </span>
              </button>
            ) : (
              <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
                <button
                  id="btn-login"
                  onClick={() => onOpenAuthModal('login')}
                  className="flex items-center gap-1 p-2 sm:px-2.5 sm:py-1.5 rounded-xl bg-stone-900/90 hover:bg-stone-800 text-amber-300 hover:text-amber-200 border border-amber-500/40 text-xs font-bold transition-all shrink-0 shadow-sm cursor-pointer whitespace-nowrap"
                  title="Đăng nhập tài khoản"
                >
                  <LogIn className="w-4 h-4 sm:w-3.5 sm:h-3.5 text-amber-400 shrink-0" />
                  <span className="hidden md:inline">Đăng nhập</span>
                </button>
                <button
                  id="btn-register"
                  onClick={() => onOpenAuthModal('register')}
                  className="flex items-center gap-1 p-2 sm:px-3 sm:py-1.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-stone-950 text-xs font-extrabold shadow-md shadow-amber-950/40 transition-all shrink-0 active:scale-95 cursor-pointer border border-amber-300 whitespace-nowrap"
                  title="Tạo tài khoản mới"
                >
                  <User className="w-4 h-4 sm:w-3.5 sm:h-3.5 text-stone-950 shrink-0" />
                  <span className="hidden md:inline">Đăng ký</span>
                </button>
              </div>
            )}

            {/* 2. "ĐỀ XUẤT MỚI" BUTTON */}
            {onOpenAddHeritage && (
              <button
                id="btn-nav-add-heritage"
                onClick={onOpenAddHeritage}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-xs shadow-md shadow-amber-950/40 transition-all shrink-0 active:scale-95 cursor-pointer border border-amber-300"
                title="Đề xuất thêm di sản hoặc địa điểm mới ngay lập tức"
              >
                <img 
                  src={siteLogo || DEFAULT_SITE_LOGO} 
                  alt="Logo Hồn Đất Việt" 
                  className="w-4 h-4 rounded-full object-cover border border-amber-950/40 shrink-0" 
                />
                <span className="hidden md:inline">Đề Xuất Mới</span>
              </button>
            )}

            {/* 3. FAVORITES ICON */}
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

            {/* Language Selector */}
            <div className="relative flex items-center">
              <select
                value={language}
                onChange={(e) => onLanguageChange(e.target.value)}
                className="bg-stone-800 text-stone-200 text-xs rounded-xl px-2.5 py-1.5 border border-stone-700/80 focus:outline-none focus:border-amber-500 cursor-pointer shadow-sm font-semibold"
                title="Chọn ngôn ngữ giao diện & AI"
              >
                <option value="vi">🇻🇳 Tiếng Việt</option>
                <option value="en">🇬🇧 English</option>
                <option value="fr">🇫🇷 Français</option>
                <option value="ja">🇯🇵 日本語</option>
              </select>
            </div>

            {/* Offline Manager Button */}
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

        {/* Row 2: Desktop Primary Nav (All Items Visible in dedicated taskbar row) */}
        <nav className="hidden xl:flex items-center gap-1.5 py-2 px-1 overflow-x-auto scrollbar-none border-t border-amber-900/20">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => onSelectTab(item.id)}
                className={`relative px-2.5 py-1.5 rounded-xl text-xs font-medium transition-all duration-150 flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                  isActive 
                    ? 'bg-amber-600/30 text-amber-300 border border-amber-500/40 shadow-sm font-bold' 
                    : 'text-stone-300 hover:text-amber-200 hover:bg-stone-800/80'
                }`}
                title={item.label}
              >
                <Icon className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>{item.label}</span>
                {item.badge && (
                  <span className="text-[9px] px-1.5 py-0.2 bg-amber-500 text-stone-950 font-bold rounded shrink-0">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>

  );
};
