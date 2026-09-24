import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Compass, 
  Camera, 
  MessageSquareQuote, 
  Utensils, 
  Globe, 
  Sparkles, 
  Search, 
  ChevronRight, 
  MapPin, 
  ShieldCheck, 
  CalendarDays, 
  PlayCircle,
  LocateFixed,
  Navigation,
  RefreshCw,
  X,
  CheckCircle2,
  AlertCircle,
  Award,
  Plus
} from 'lucide-react';
import { HERITAGE_DATABASE } from '../data/vietnamHeritageData';
import { geolocationService, CITY_LANDMARK_PRESETS } from '../services/geolocationService';
import { getHeritageForLandmark } from '../services/landmarkHeritageService';
import { HeritageItem, CityLandmarkBackground } from '../types';

interface HeroSectionProps {
  onNavigate: (tab: string, heritageId?: string) => void;
  onSelectHeritage?: (heritage: HeritageItem) => void;
  currentLandmark?: CityLandmarkBackground;
  detectedLocationName?: string;
  locationSource?: 'gps' | 'preset' | 'default';
  isDetectingGps?: boolean;
  gpsError?: string | null;
  onDetectGps?: () => void;
  onOpenCityPicker?: () => void;
  onExploreLandmark?: () => void;
  onOpenAddHeritage?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onNavigate,
  onSelectHeritage,
  currentLandmark: propLandmark,
  detectedLocationName: propLocationName,
  locationSource: propLocationSource,
  isDetectingGps: propIsDetecting,
  gpsError: propGpsError,
  onDetectGps,
  onOpenCityPicker,
  onExploreLandmark,
  onOpenAddHeritage
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<HeritageItem[]>([]);

  // Fallbacks if not provided via props
  const currentLandmark = propLandmark || CITY_LANDMARK_PRESETS[0];
  const detectedLocationName = propLocationName || 'Hà Nội';
  const locationSource = propLocationSource || 'default';
  const isDetectingGps = propIsDetecting || false;
  const gpsError = propGpsError || null;

  const handleExploreLandmark = () => {
    if (onExploreLandmark) {
      onExploreLandmark();
      return;
    }
    if (onSelectHeritage) {
      const item = getHeritageForLandmark(currentLandmark);
      onSelectHeritage(item);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchTerm(val);
    if (val.trim().length > 1) {
      const filtered = HERITAGE_DATABASE.filter(h => 
        h.name.toLowerCase().includes(val.toLowerCase()) ||
        h.province.toLowerCase().includes(val.toLowerCase()) ||
        h.tags.some(t => t.toLowerCase().includes(val.toLowerCase()))
      );
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  };

  return (
    <div className="relative overflow-hidden bg-transparent text-stone-100 py-12 md:py-20 border-b border-amber-900/30">
      
      {/* Subtle Ambient Radial Glows */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Tagline & GPS Landmark Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="flex flex-col items-center text-center max-w-4xl mx-auto mb-8"
        >
          
          {/* GPS Location & Landmark Pill Badge */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
            
            {/* Thẻ hiển thị danh thắng hiện tại - Có thể bấm trực tiếp để xem giới thiệu */}
            <button
              type="button"
              id="btn-hero-landmark-pill"
              onClick={handleExploreLandmark}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-900/90 hover:bg-stone-800 hover:border-amber-400/80 border border-amber-500/40 text-xs text-stone-200 shadow-md backdrop-blur-md transition-all active:scale-95 cursor-pointer text-left group"
              title={`Nhấn để xem giới thiệu chi tiết di sản "${currentLandmark.landmarkName}"`}
            >
              <span className="relative flex h-2 w-2 shrink-0">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${locationSource === 'gps' ? 'bg-emerald-400' : 'bg-amber-400'} opacity-75`}></span>
                <span className={`relative inline-flex rounded-full h-2 w-2 ${locationSource === 'gps' ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
              </span>
              <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 group-hover:scale-110 transition-transform" />
              <span className="text-stone-400 hidden sm:inline">Ảnh nền GPS:</span>
              <span className="font-semibold text-amber-300 truncate max-w-[200px] sm:max-w-[320px] group-hover:text-amber-200">
                {detectedLocationName} • {currentLandmark.landmarkName}
              </span>
              {currentLandmark.distanceKm !== undefined && (
                <span className="text-[11px] text-stone-400 hidden md:inline">
                  (~{currentLandmark.distanceKm} km)
                </span>
              )}
            </button>

            {/* ⭐ NÚT KHÁM PHÁ DI SẢN HÌNH NỀN: Bấm vào để giới thiệu di sản đang làm hình nền */}
            <button
              type="button"
              id="btn-hero-explore-wallpaper-heritage"
              onClick={handleExploreLandmark}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-stone-950 font-bold text-xs shadow-lg shadow-amber-950/40 hover:shadow-amber-500/20 transition-all active:scale-95 cursor-pointer border border-amber-300/80 ring-1 ring-amber-400/50"
              title={`Khám phá & đọc giới thiệu chi tiết về "${currentLandmark.landmarkName}"`}
            >
              <Sparkles className="w-3.5 h-3.5 text-stone-950 shrink-0 animate-pulse" />
              <span>Khám phá di sản này</span>
            </button>

            {onDetectGps && (
              <button
                type="button"
                onClick={onDetectGps}
                disabled={isDetectingGps}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-900/85 hover:bg-stone-800 text-stone-300 hover:text-amber-200 border border-stone-700/80 text-xs transition-colors cursor-pointer disabled:opacity-50"
                title="Lấy lại tọa độ GPS hiện tại"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isDetectingGps ? 'animate-spin text-amber-400' : ''}`} />
                <span className="hidden sm:inline">{isDetectingGps ? 'Đang dò GPS...' : 'Lấy GPS của tôi'}</span>
              </button>
            )}

            {onOpenCityPicker && (
              <button
                type="button"
                onClick={onOpenCityPicker}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 text-xs transition-colors cursor-pointer"
                title="Đổi cảnh sắc danh thắng tỉnh thành khác"
              >
                <Globe className="w-3.5 h-3.5 text-amber-400" />
                <span>Đổi danh thắng khác</span>
              </button>
            )}
          </div>

          {gpsError && (
            <div className="mb-4 inline-flex items-center gap-1.5 text-xs text-amber-400 bg-amber-950/70 px-3.5 py-1.5 rounded-full border border-amber-500/40">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{gpsError}</span>
            </div>
          )}

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs sm:text-sm font-medium mb-6 shadow-sm backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Nền tảng AI Di sản & Văn hóa Việt Nam Toàn diện</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-6xl font-serif font-extrabold tracking-tight text-stone-100 leading-tight drop-shadow-md">
            Khám phá Việt Nam bằng <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 bg-clip-text text-transparent">
              Trí tuệ Nhân tạo
            </span>
          </h1>

          <p className="mt-3 sm:mt-4 text-sm sm:text-lg text-stone-200 font-light max-w-2xl leading-relaxed drop-shadow">
            Hiểu lịch sử. Khám phá di sản. Tìm trải nghiệm. Lên lịch trình.
          </p>

          {/* Quick Universal Search Bar */}
          <div className="mt-6 sm:mt-8 w-full max-w-xl relative">
            <div className="relative flex items-center shadow-2xl rounded-2xl overflow-hidden border border-amber-500/30 bg-stone-900/90 focus-within:border-amber-400 focus-within:ring-2 focus-within:ring-amber-500/20 transition-all backdrop-blur-md">
              <Search className="w-5 h-5 text-amber-400 ml-3.5 sm:ml-4 shrink-0" />
              <input
                id="hero-search-input"
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Tìm di sản, địa danh, món ăn (Huế, Hội An, Phố cổ...)"
                className="w-full py-3 sm:py-3.5 px-3 sm:px-4 bg-transparent text-xs sm:text-sm text-stone-100 placeholder-stone-400 focus:outline-none"
              />
              {searchTerm && (
                <button 
                  onClick={() => { setSearchTerm(''); setSearchResults([]); }}
                  className="mr-3 text-xs text-stone-400 hover:text-stone-200 px-2 py-1 bg-stone-800 rounded"
                >
                  Xóa
                </button>
              )}
            </div>

            {/* Live Search Results Dropdown */}
            {searchResults.length > 0 && (
              <div className="absolute top-full mt-2 w-full bg-stone-900 border border-stone-700 rounded-xl shadow-2xl overflow-hidden z-50 divide-y divide-stone-800 max-h-80 overflow-y-auto backdrop-blur-md">
                {searchResults.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      onSelectHeritage?.(item);
                      onNavigate('heritage', item.id);
                      setSearchTerm('');
                      setSearchResults([]);
                    }}
                    className="p-3.5 hover:bg-stone-800/80 cursor-pointer flex items-center justify-between text-left transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <img src={item.imageUrl} alt={item.name} className="w-12 h-12 rounded-lg object-cover border border-stone-700" />
                      <div>
                        <h4 className="text-sm font-medium text-amber-200">{item.name}</h4>
                        <p className="text-xs text-stone-400 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 text-red-400" />
                          <span>{item.province} • {item.categoryLabel}</span>
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-stone-500" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Primary Main CTA Buttons */}
          <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            
            {/* 🌟 NÚT NỔI BẬT: ĐỀ XUẤT DI SẢN / ĐỊA ĐIỂM MỚI NGAY TẠI ĐẦU TRANG */}
            {onOpenAddHeritage && (
              <button
                id="hero-cta-add-heritage-top"
                onClick={onOpenAddHeritage}
                className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-stone-950 font-bold text-xs sm:text-sm transition-all shadow-xl shadow-amber-500/25 flex items-center gap-1.5 sm:gap-2 active:scale-95 border border-amber-300 ring-2 ring-amber-400/40 cursor-pointer"
                title="Thêm di sản, danh lam thắng cảnh hoặc địa điểm ăn uống/giải trí mới"
              >
                <Plus className="w-4 h-4 text-stone-950 stroke-[3]" />
                <span>+ Đề Xuất Di Sản / Địa Điểm Mới</span>
              </button>
            )}

            <button
              id="hero-cta-gps"
              onClick={() => {
                const el = document.getElementById('gps-nearby-section');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                } else {
                  onNavigate('map');
                }
              }}
              className="px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-stone-950 font-bold text-xs sm:text-sm transition-all shadow-lg shadow-emerald-950/40 flex items-center gap-1.5 sm:gap-2 active:scale-95"
            >
              <LocateFixed className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-stone-950" />
              <span>Gần Bạn Nhất (GPS)</span>
            </button>

            <button
              id="hero-cta-heritage"
              onClick={() => onNavigate('heritage')}
              className="px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-semibold text-xs sm:text-sm transition-all shadow-lg shadow-amber-900/40 flex items-center gap-1.5 sm:gap-2 border border-amber-400/40 active:scale-95"
            >
              <Compass className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-stone-950" />
              <span>Khám phá Di sản</span>
            </button>

            <button
              id="hero-cta-recognizer"
              onClick={() => onNavigate('recognizer')}
              className="px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-300 font-semibold text-xs sm:text-sm transition-all border border-amber-500/30 flex items-center gap-1.5 sm:gap-2 active:scale-95"
            >
              <Camera className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
              <span>Nhận diện bằng AI</span>
            </button>

            <button
              id="hero-cta-chat"
              onClick={() => onNavigate('chat')}
              className="px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-100 font-medium text-xs sm:text-sm transition-all border border-stone-700 flex items-center gap-1.5 sm:gap-2 active:scale-95"
            >
              <MessageSquareQuote className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-400" />
              <span>Hỏi Trợ lý AI</span>
            </button>

            <button
              id="hero-cta-food"
              onClick={() => onNavigate('food')}
              className="px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-100 font-medium text-xs sm:text-sm transition-all border border-stone-700 flex items-center gap-1.5 sm:gap-2 active:scale-95"
            >
              <Utensils className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-400" />
              <span>Ăn uống & Vui chơi</span>
            </button>

            <button
              id="hero-cta-map"
              onClick={() => onNavigate('map')}
              className="px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-100 font-medium text-xs sm:text-sm transition-all border border-stone-700 flex items-center gap-1.5 sm:gap-2 active:scale-95"
            >
              <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
              <span>Bản đồ Văn hóa</span>
            </button>

            <button
              id="hero-cta-profile"
              onClick={() => onNavigate('profile')}
              className="px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-300 font-semibold text-xs sm:text-sm transition-all border border-amber-500/30 flex items-center gap-1.5 sm:gap-2 active:scale-95"
            >
              <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
              <span>Hồ sơ & Danh hiệu</span>
            </button>
          </div>
        </motion.div>

        {/* 4 Feature Value Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            onClick={() => onNavigate('recognizer')}
            className="p-5 rounded-2xl bg-stone-900/60 border border-stone-800 hover:border-amber-500/40 hover:bg-stone-800/60 transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Camera className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-amber-100 text-base group-hover:text-amber-300">
              Nhận diện Thị giác AI
            </h3>
            <p className="text-xs text-stone-400 mt-1.5 leading-relaxed">
              Nhận diện di tích, hiện vật, cổ phục, nhạc cụ và làng nghề qua ảnh chụp với độ chính xác cao.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.18 }}
            onClick={() => onNavigate('storyteller')}
            className="p-5 rounded-2xl bg-stone-900/60 border border-stone-800 hover:border-amber-500/40 hover:bg-stone-800/60 transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-amber-100 text-base group-hover:text-amber-300">
              Kể chuyện Đa đối tượng
            </h3>
            <p className="text-xs text-stone-400 mt-1.5 leading-relaxed">
              5 phong cách kể chuyện từ thiếu nhi, học sinh đến khách quốc tế, phân biệt rõ lịch sử và huyền tích.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.26 }}
            onClick={() => onNavigate('food')}
            className="p-5 rounded-2xl bg-stone-900/60 border border-stone-800 hover:border-amber-500/40 hover:bg-stone-800/60 transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Utensils className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-amber-100 text-base group-hover:text-amber-300">
              Ăn uống & Giải trí Xung quanh
            </h3>
            <p className="text-xs text-stone-400 mt-1.5 leading-relaxed">
              Tích hợp Google Places, phân tích review trung thực và tìm địa điểm theo nhu cầu cá nhân.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.34 }}
            onClick={() => onNavigate('itinerary')}
            className="p-5 rounded-2xl bg-stone-900/60 border border-stone-800 hover:border-amber-500/40 hover:bg-stone-800/60 transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <CalendarDays className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-amber-100 text-base group-hover:text-amber-300">
              Lịch trình Du lịch Thông minh
            </h3>
            <p className="text-xs text-stone-400 mt-1.5 leading-relaxed">
              Lên kế hoạch du lịch văn hóa theo thời gian và ngân sách, tối ưu hóa cung đường tham quan.
            </p>
          </motion.div>
        </div>

      </div>
    </div>
  );
};
