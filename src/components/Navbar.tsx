import React, { useState } from 'react';
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
  Award
} from 'lucide-react';
import { UserProfile } from '../types';

interface NavbarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  favoritesCount: number;
  userProfile: UserProfile;
  language: string;
  onLanguageChange: (lang: string) => void;
  onOpenAuthModal: (initialTab?: 'login' | 'register' | 'profile' | 'activity') => void;
  onLogout?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  favoritesCount,
  userProfile,
  language,
  onLanguageChange,
  onOpenAuthModal,
  onLogout
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Trang chủ', icon: Compass },
    { id: 'heritage', label: 'Di sản', icon: MapPin },
    { id: 'recognizer', label: 'Nhận diện AI', icon: Camera, badge: 'Vision' },
    { id: 'storyteller', label: 'Kể chuyện AI', icon: Sparkles },
    { id: 'chat', label: 'Hướng Dẫn Viên AI', icon: Compass, badge: 'HDV 3D' },
    { id: 'map', label: 'Bản đồ', icon: Globe },
    { id: 'food', label: 'Ăn uống & Vui chơi', icon: Utensils },
    { id: 'itinerary', label: 'Lịch trình', icon: CalendarDays },
    { id: 'grandparents', label: 'Ký ức Ông bà', icon: Mic, badge: 'Mới' },
    { id: 'crafts', label: 'Làng nghề & Nghệ thuật', icon: BookOpen },
    { id: 'learning', label: 'Quiz & Lịch sử', icon: Award },
    { id: 'profile', label: 'Hồ sơ & Danh hiệu', icon: Award, badge: 'XP' },
    { id: 'community', label: 'Cộng đồng', icon: Users },
  ];

  return (
    <header className="sticky top-0 z-40 bg-stone-950/80 backdrop-blur-md border-b border-amber-900/30 text-stone-100 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div 
            id="brand-logo"
            onClick={() => onSelectTab('home')}
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group select-none shrink-0"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-amber-600 via-red-600 to-amber-500 flex items-center justify-center shadow-lg shadow-amber-900/40 border border-amber-400/40 group-hover:scale-105 transition-transform duration-200">
              <span className="text-lg sm:text-xl font-serif font-bold text-amber-100">H</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif font-bold tracking-wide text-base sm:text-lg text-amber-100 group-hover:text-amber-300 transition-colors">
                  HERITAGE<span className="text-amber-400">AI</span>
                </span>
                <span className="text-[9px] sm:text-[10px] px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-medium">
                  VN 4.0
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-stone-400 hidden sm:block font-normal">
                Hiểu di sản. Khám phá Việt Nam.
              </p>
            </div>
          </div>

          {/* Desktop Primary Nav (Key Items) */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.slice(0, 7).map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => onSelectTab(item.id)}
                  className={`relative px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 flex items-center gap-1.5 ${
                    isActive 
                      ? 'bg-amber-600/30 text-amber-300 border border-amber-500/40 shadow-sm' 
                      : 'text-stone-300 hover:text-amber-200 hover:bg-stone-800/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 text-amber-400" />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[9px] px-1 py-0.2 bg-amber-500 text-stone-950 font-bold rounded">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}

            {/* Desktop More Dropdown */}
            <div className="relative group">
              <button
                className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-stone-300 hover:text-amber-200 hover:bg-stone-800/60 flex items-center gap-1"
              >
                <span>Thêm</span>
                <span className="text-[10px]">▼</span>
              </button>
              <div className="absolute right-0 top-full hidden group-hover:block w-56 bg-stone-900 border border-stone-800 rounded-xl shadow-2xl py-2 z-50 animate-fadeIn">
                {navItems.slice(7).map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => onSelectTab(item.id)}
                      className="w-full text-left px-4 py-2 text-xs text-stone-300 hover:bg-stone-800 hover:text-amber-300 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <Icon className="w-3.5 h-3.5 text-amber-400" />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className="text-[9px] px-1.5 py-0.2 bg-amber-500/20 text-amber-400 rounded">
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
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
                  <span>Admin Dashboard</span>
                </button>
              </div>
            </div>
          </nav>

          {/* Right actions: Language, Favorites, Activity History, Profile */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            
            {/* Language Selector */}
            <div className="relative hidden sm:block">
              <select
                value={language}
                onChange={(e) => onLanguageChange(e.target.value)}
                className="bg-stone-800 text-stone-200 text-xs rounded-lg px-2 py-1.5 border border-stone-700 focus:outline-none focus:border-amber-500 cursor-pointer"
                title="Chọn ngôn ngữ giao diện & AI"
              >
                <option value="vi">🇻🇳 VN</option>
                <option value="en">🇬🇧 EN</option>
                <option value="fr">🇫🇷 FR</option>
                <option value="ja">🇯🇵 JA</option>
              </select>
            </div>

            {/* Favorites Icon */}
            <button
              id="btn-favorites"
              onClick={() => onSelectTab('favorites')}
              className="relative p-2 rounded-xl text-stone-300 hover:text-red-400 hover:bg-stone-800/80 transition-colors"
              title="Danh sách di sản đã lưu"
            >
              <Heart className="w-4 h-4 text-red-400 fill-red-500/30" />
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center">
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* Activity History Button */}
            <button
              id="btn-activity-history"
              onClick={() => onOpenAuthModal('activity')}
              className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-stone-800/90 hover:bg-stone-700/90 text-stone-300 text-xs font-medium border border-stone-700/60 transition-colors"
              title="Xem lịch sử thao tác của bạn"
            >
              <History className="w-3.5 h-3.5 text-amber-400" />
              <span>Lịch sử</span>
            </button>

            {/* Direct Profile & Badges Tab Button */}
            <button
              id="btn-nav-profile-badges"
              onClick={() => onSelectTab('profile')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                currentTab === 'profile'
                  ? 'bg-amber-500 text-stone-950 font-bold shadow-md shadow-amber-950/40'
                  : 'bg-stone-900/90 hover:bg-stone-800 text-amber-300 hover:text-amber-200 border border-amber-500/30'
              }`}
              title="Xem Hồ sơ & Bộ sưu tập danh hiệu di sản"
            >
              <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="hidden sm:inline">Hồ sơ & Danh hiệu</span>
              <span className="sm:hidden">Hồ sơ</span>
              {userProfile.points !== undefined && userProfile.points > 0 && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
                  currentTab === 'profile' ? 'bg-stone-950/20 text-stone-950' : 'bg-amber-500/20 text-amber-300'
                }`}>
                  {userProfile.points} XP
                </span>
              )}
            </button>

            {/* Authentication / Profile Status Button */}
            {userProfile.isLoggedIn ? (
              <button
                id="btn-profile"
                onClick={() => onSelectTab('profile')}
                className="flex items-center gap-2 pl-1 pr-2.5 py-1 rounded-full bg-stone-800/90 hover:bg-stone-700/90 border border-amber-500/40 hover:ring-2 hover:ring-amber-500/30 transition-all"
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
              <button
                id="btn-login"
                onClick={() => onOpenAuthModal('login')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-stone-950 text-xs font-bold shadow-md transition-all"
              >
                <LogIn className="w-3.5 h-3.5 text-stone-950" />
                <span>Đăng nhập</span>
              </button>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl text-stone-300 hover:text-stone-100 hover:bg-stone-800"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-stone-900 border-b border-stone-800 px-4 pt-3 pb-6 space-y-2 animate-fadeIn">
          
          {/* Mobile User Profile Bar */}
          <div className="p-3 bg-stone-950 rounded-2xl border border-stone-800 flex items-center justify-between gap-3 mb-2">
            {userProfile.isLoggedIn ? (
              <div 
                onClick={() => {
                  onOpenAuthModal('profile');
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-3 cursor-pointer flex-1"
              >
                <img 
                  src={userProfile.avatarUrl} 
                  alt={userProfile.displayName} 
                  className="w-10 h-10 rounded-full object-cover border-2 border-amber-500"
                />
                <div>
                  <p className="text-xs font-bold text-stone-100">{userProfile.displayName}</p>
                  <p className="text-[10px] text-amber-400">{userProfile.level || 'Nhà Khám Phá'}</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between w-full">
                <span className="text-xs text-stone-400">Chưa đăng nhập</span>
                <button
                  onClick={() => {
                    onOpenAuthModal('login');
                    setMobileMenuOpen(false);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-amber-500 text-stone-950 text-xs font-bold"
                >
                  Đăng nhập / Đăng ký
                </button>
              </div>
            )}

            {userProfile.isLoggedIn && (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => {
                    onOpenAuthModal('activity');
                    setMobileMenuOpen(false);
                  }}
                  className="p-2 rounded-xl bg-stone-900 text-stone-300 text-xs flex items-center gap-1 border border-stone-800"
                  title="Lịch sử hoạt động"
                >
                  <History className="w-4 h-4 text-amber-400" />
                  <span>Lịch sử</span>
                </button>

                {onLogout && (
                  <button
                    onClick={() => {
                      onLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="p-2 rounded-xl bg-red-950/40 text-red-300 text-xs flex items-center gap-1 border border-red-900/40"
                    title="Đăng xuất"
                  >
                    <LogOut className="w-4 h-4 text-red-400" />
                    <span>Thoát</span>
                  </button>
                )}
              </div>
            )}
          </div>

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
                  className={`p-2.5 rounded-xl text-xs font-medium flex items-center justify-between transition-colors ${
                    isActive 
                      ? 'bg-amber-600/30 text-amber-300 border border-amber-500/40' 
                      : 'bg-stone-950/60 text-stone-300 hover:bg-stone-800'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <Icon className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[9px] px-1 py-0.2 rounded bg-amber-500/20 text-amber-300 shrink-0">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="border-t border-stone-800 pt-2 mt-2 flex items-center justify-between gap-2">
            <button
              onClick={() => {
                onSelectTab('admin');
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-2 px-3 rounded-xl bg-stone-950 text-xs text-amber-400 border border-stone-800 hover:bg-stone-800 flex items-center justify-center gap-1.5"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Dashboard</span>
            </button>

            <button
              onClick={() => {
                onSelectTab('profile');
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-2 px-3 rounded-xl bg-amber-500/20 text-xs text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 flex items-center justify-center gap-1.5 font-bold"
            >
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>Hồ sơ & Danh hiệu</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
