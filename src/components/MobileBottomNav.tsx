import React, { useState } from 'react';
import { 
  Compass, 
  Camera, 
  Sparkles, 
  MessageSquareQuote, 
  Globe, 
  Menu, 
  X, 
  Utensils, 
  CalendarDays, 
  Mic, 
  BookOpen, 
  Award, 
  Heart, 
  Users, 
  ShieldCheck, 
  MapPin,
  ChevronUp,
  Eye
} from 'lucide-react';
import { UserProfile, CityLandmarkBackground } from '../types';

interface MobileBottomNavProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  favoritesCount: number;
  userProfile: UserProfile;
  onOpenCityPicker?: () => void;
  currentLandmark?: CityLandmarkBackground;
  onPeekBackground?: () => void;
  onExploreLandmark?: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentTab,
  onSelectTab,
  favoritesCount,
  userProfile,
  onOpenCityPicker,
  currentLandmark,
  onPeekBackground,
  onExploreLandmark
}) => {
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

  const mainBottomTabs = [
    { id: 'home', label: 'Trang chủ', icon: Compass },
    { id: 'recognizer', label: 'Nhận diện', icon: Camera, badge: 'AI' },
    { id: 'storyteller', label: 'Kể chuyện', icon: Sparkles },
    { id: 'chat', label: 'HDV AI', icon: MessageSquareQuote, badge: '3D' },
    { id: 'map', label: 'Bản đồ', icon: Globe },
  ];

  const moreMenuItems = [
    { 
      id: 'food', 
      label: 'Ăn uống & Vui chơi', 
      description: 'Quán ăn ngon, cafe & điểm giải trí bản xứ', 
      icon: Utensils, 
      color: 'text-orange-400',
      bg: 'bg-orange-500/10'
    },
    { 
      id: 'itinerary', 
      label: 'Lập Lịch Trình', 
      description: 'Lên tour thông minh theo giờ & ngân sách', 
      icon: CalendarDays, 
      color: 'text-amber-400',
      bg: 'bg-amber-500/10'
    },
    { 
      id: 'crafts', 
      label: 'Làng Nghề & Nghệ Thuật', 
      description: 'Gốm Bát Tràng, Nón lá, Nhã nhạc, Ca trù', 
      icon: BookOpen, 
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10'
    },
    { 
      id: 'learning', 
      label: 'Quiz & Thử Thách Di Sản', 
      description: 'Trắc nghiệm văn hóa & tích điểm thăng hạng', 
      icon: Award, 
      color: 'text-yellow-400',
      bg: 'bg-yellow-500/10'
    },
    { 
      id: 'favorites', 
      label: 'Bộ Sưu Tập Yêu Thích', 
      description: `${favoritesCount} địa danh & lịch trình đã lưu`, 
      icon: Heart, 
      color: 'text-red-400',
      bg: 'bg-red-500/10',
      badge: favoritesCount > 0 ? `${favoritesCount}` : undefined
    },
    { 
      id: 'profile', 
      label: 'Hồ Sơ & Danh Hiệu', 
      description: `Cấp bậc: ${userProfile.roleLabel || 'Người yêu Văn hóa'} (${userProfile.points || 0} XP)`, 
      icon: Award, 
      color: 'text-amber-400',
      bg: 'bg-amber-500/10'
    },
    { 
      id: 'community', 
      label: 'Cộng Đồng Di Sản', 
      description: 'Đóng góp ảnh & chia sẻ câu chuyện cùng mọi người', 
      icon: Users, 
      color: 'text-sky-400',
      bg: 'bg-sky-500/10'
    },
  ];

  const handleSelectTab = (tabId: string) => {
    onSelectTab(tabId);
    setIsMoreMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Mobile Sticky Bottom Nav Bar (visible on md and below) */}
      <nav 
        id="mobile-bottom-nav" 
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-stone-950/95 backdrop-blur-xl border-t border-amber-900/40 shadow-2xl pb-safe transition-transform duration-200"
      >
        <div className="flex items-center justify-around h-16 px-1 max-w-lg mx-auto">
          {mainBottomTabs.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id && !isMoreMenuOpen;
            return (
              <button
                key={item.id}
                id={`mobile-tab-${item.id}`}
                onClick={() => handleSelectTab(item.id)}
                className={`relative flex-1 flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all duration-150 active:scale-90 ${
                  isActive 
                    ? 'text-amber-400 font-bold' 
                    : 'text-stone-400 hover:text-stone-200 font-medium'
                }`}
              >
                {isActive && (
                  <span className="absolute top-0 w-8 h-1 bg-gradient-to-r from-amber-500 to-amber-300 rounded-full shadow-sm shadow-amber-500" />
                )}
                <div className="relative">
                  <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110 text-amber-400' : 'text-stone-400'}`} />
                  {item.badge && !isActive && (
                    <span className="absolute -top-1 -right-2 px-1 py-0.2 bg-amber-500 text-stone-950 text-[8px] font-extrabold rounded-full">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className="text-[10px] mt-1 tracking-tight truncate max-w-[62px]">
                  {item.label}
                </span>
              </button>
            );
          })}

          {/* More / Menu Drawer Button */}
          <button
            id="mobile-tab-more"
            onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
            className={`relative flex-1 flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all duration-150 active:scale-90 ${
              isMoreMenuOpen || ['food', 'itinerary', 'crafts', 'learning', 'favorites', 'profile', 'community', 'admin'].includes(currentTab)
                ? 'text-amber-400 font-bold' 
                : 'text-stone-400 hover:text-stone-200 font-medium'
            }`}
          >
            {isMoreMenuOpen && (
              <span className="absolute top-0 w-8 h-1 bg-gradient-to-r from-amber-500 to-amber-300 rounded-full shadow-sm shadow-amber-500" />
            )}
            <div className="relative">
              {isMoreMenuOpen ? (
                <X className="w-5 h-5 text-amber-400" />
              ) : (
                <Menu className="w-5 h-5 text-stone-400" />
              )}
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1.5 w-3.5 h-3.5 bg-red-500 text-white text-[8px] font-bold rounded-full flex items-center justify-center">
                  {favoritesCount}
                </span>
              )}
            </div>
            <span className="text-[10px] mt-1 tracking-tight">
              {isMoreMenuOpen ? 'Đóng' : 'Thêm'}
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile "More Features" Bottom Sheet Modal */}
      {isMoreMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 z-50 flex flex-col justify-end bg-black/80 backdrop-blur-sm animate-fadeIn"
          onClick={() => setIsMoreMenuOpen(false)}
        >
          <div 
            className="bg-stone-900 border-t border-amber-500/40 rounded-t-3xl max-h-[85vh] overflow-y-auto pb-safe shadow-2xl p-4 sm:p-6 space-y-4 animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header / Grab Bar */}
            <div className="flex flex-col items-center">
              <div className="w-12 h-1.5 bg-stone-700 rounded-full mb-3" />
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-serif font-bold text-sm">
                    H
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-base text-stone-100">
                      Tất Cả Tính Năng Di Sản
                    </h3>
                    <p className="text-[11px] text-stone-400">
                      Chạm để chuyển nhanh sang chuyên mục mong muốn
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsMoreMenuOpen(false)}
                  className="p-2 rounded-full bg-stone-800 text-stone-300 hover:text-white"
                  title="Đóng menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* GPS Landmark Background Switcher Shortcut */}
            {currentLandmark && (
              <div className="p-3 bg-stone-950/80 rounded-2xl border border-amber-500/30 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div 
                  onClick={() => {
                    if (onOpenCityPicker) {
                      setIsMoreMenuOpen(false);
                      onOpenCityPicker();
                    }
                  }}
                  className="flex items-center gap-3 min-w-0 cursor-pointer flex-1"
                >
                  <div className="w-11 h-11 rounded-xl overflow-hidden shrink-0 border border-stone-700">
                    <img src={currentLandmark.imageUrl} alt={currentLandmark.landmarkName} className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1 text-xs font-bold text-amber-300">
                      <MapPin className="w-3.5 h-3.5 text-red-400 shrink-0" />
                      <span className="truncate">{currentLandmark.cityName} • {currentLandmark.landmarkName}</span>
                    </div>
                    <p className="text-[11px] text-stone-400 truncate">
                      Ảnh nền danh thắng theo tọa độ vị trí
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0 flex-wrap sm:flex-nowrap">
                  {onExploreLandmark && (
                    <button
                      type="button"
                      id="btn-mobile-explore-landmark"
                      onClick={() => {
                        setIsMoreMenuOpen(false);
                        onExploreLandmark();
                      }}
                      className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1 text-[11px] px-2.5 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold rounded-lg active:scale-95 transition-all shadow-sm"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-stone-950" />
                      <span>Khám phá</span>
                    </button>
                  )}
                  {onPeekBackground && (
                    <button
                      type="button"
                      onClick={() => {
                        setIsMoreMenuOpen(false);
                        onPeekBackground();
                      }}
                      className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1 text-[11px] px-2.5 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 rounded-lg active:scale-95 transition-all"
                    >
                      <Eye className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Ngắm ảnh</span>
                    </button>
                  )}
                  {onOpenCityPicker && (
                    <button
                      type="button"
                      onClick={() => {
                        setIsMoreMenuOpen(false);
                        onOpenCityPicker();
                      }}
                      className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1 text-[11px] px-2.5 py-1.5 bg-stone-800 hover:bg-stone-700 text-amber-300 border border-amber-500/30 font-semibold rounded-lg active:scale-95 transition-all"
                    >
                      <span>Đổi cảnh</span>
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Grid of All Core Extra Modules */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              {moreMenuItems.map((item) => {
                const Icon = item.icon;
                const isItemActive = currentTab === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => handleSelectTab(item.id)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 active:scale-[0.98] ${
                      isItemActive 
                        ? 'bg-amber-500/20 border-amber-500 text-amber-200 shadow-md' 
                        : 'bg-stone-950/70 border-stone-800 hover:border-amber-500/40 text-stone-300'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl ${item.bg} ${item.color} flex items-center justify-center shrink-0`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <h4 className={`text-sm font-semibold truncate ${isItemActive ? 'text-amber-300' : 'text-stone-100'}`}>
                          {item.label}
                        </h4>
                        {item.badge && (
                          <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-amber-500 text-stone-950 font-bold shrink-0">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-stone-400 truncate mt-0.5">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Admin Dashboard link if needed */}
            <div className="pt-2 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400">
              <button
                onClick={() => handleSelectTab('admin')}
                className="flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-medium py-1"
              >
                <ShieldCheck className="w-4 h-4 text-amber-500" />
                <span>Trang Quản trị & Kiểm định Di sản</span>
              </button>
              <span>Hồn Đất Việt v4.0</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
