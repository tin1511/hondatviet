import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Compass, 
  Layers, 
  ExternalLink, 
  Volume2, 
  Utensils, 
  Clock, 
  Ticket, 
  Info, 
  CheckCircle2, 
  HelpCircle, 
  Filter, 
  Navigation,
  LocateFixed,
  RefreshCw,
  Car,
  Edit,
  Plus,
  ShieldCheck
} from 'lucide-react';
import { HeritageItem, RegionType, UserLocation, UserProfile } from '../types';
import { storageService } from '../services/storageService';
import { HeritageEditModal } from './HeritageEditModal';
import { handleImageError, getSafeHeritageImageUrl } from '../utils/imageUtils';
import { 
  geolocationService, 
  calculateDistanceKm, 
  formatTravelEstimate, 
  VIETNAM_LOCATION_PRESETS 
} from '../services/geolocationService';

interface CulturalMapProps {
  currentUser?: UserProfile;
  onNavigateToStory: (heritageName: string, history?: string, period?: string) => void;
  onNavigateToFood: (heritageId: string) => void;
}

export const CulturalMap: React.FC<CulturalMapProps> = ({
  currentUser,
  onNavigateToStory,
  onNavigateToFood,
}) => {
  const [heritages, setHeritages] = useState<HeritageItem[]>(storageService.getHeritages());
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeHeritage, setActiveHeritage] = useState<HeritageItem>(() => {
    const list = storageService.getHeritages();
    return list[0] || ({} as HeritageItem);
  });
  
  // Geolocation states
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [sortByDistance, setSortByDistance] = useState<boolean>(false);
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [locationMessage, setLocationMessage] = useState<string>('');

  // Admin edit modal states
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [editingHeritage, setEditingHeritage] = useState<HeritageItem | null>(null);

  const activeUser = currentUser || storageService.getUserProfile();
  const isAdmin = activeUser?.isLoggedIn && activeUser?.role === 'admin';

  useEffect(() => {
    const saved = geolocationService.getLastKnownLocation();
    if (saved) {
      setUserLocation(saved);
    }

    const handleDataUpdated = () => {
      const updated = storageService.getHeritages();
      setHeritages(updated);
      if (activeHeritage?.id) {
        const found = updated.find(h => h.id === activeHeritage.id);
        if (found) {
          setActiveHeritage(found);
        } else if (updated.length > 0) {
          setActiveHeritage(updated[0]);
        }
      }
    };

    window.addEventListener('heritage-data-updated', handleDataUpdated);
    return () => window.removeEventListener('heritage-data-updated', handleDataUpdated);
  }, [activeHeritage?.id]);

  const handleRequestGPS = async () => {
    setIsLocating(true);
    setLocationMessage('');
    const res = await geolocationService.requestCurrentPosition();
    setIsLocating(false);

    if (res.success && res.location) {
      setUserLocation(res.location);
      setSortByDistance(true);
      setLocationMessage(`Đã nhận diện: ${res.location.cityName || 'Tọa độ GPS của bạn'}`);
    } else {
      setLocationMessage(res.error || 'Chưa thể lấy vị trí GPS. Đã chuyển về vị trí mẫu.');
      const preset = geolocationService.setPresetLocation('hanoi');
      if (preset) {
        setUserLocation(preset);
        setSortByDistance(true);
      }
    }
  };

  const categories = [
    { id: 'all', label: 'Tất cả' },
    { id: 'monument', label: '📜 Di tích Lịch sử & Danh thắng' },
    { id: 'palace', label: '🏛 Hoàng thành & Cung điện' },
    { id: 'temple', label: '⛩ Đền chùa & Tháp cổ' },
    { id: 'citadel', label: '🏰 Thành lũy & Pháo đài' },
    { id: 'ancient_house', label: '🏘 Đô thị Cổ & Nhà cổ' },
    { id: 'architecture', label: '🏯 Kiến trúc Cổ & Danh thắng' },
    { id: 'craft_village', label: '🏺 Làng nghề truyền thống' },
    { id: 'folk_art', label: '🎭 Nghệ thuật Dân gian' }
  ];

  const regions = [
    { id: 'all', label: 'Toàn quốc' },
    { id: 'north', label: 'Miền Bắc' },
    { id: 'central', label: 'Miền Trung' },
    { id: 'south', label: 'Miền Nam' },
  ];

  let filteredItems = heritages.filter((item) => {
    const isApproved = isAdmin || !item.approvalStatus || item.approvalStatus === 'approved';
    const matchRegion = selectedRegion === 'all' || item.region === selectedRegion;
    const matchCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return isApproved && matchRegion && matchCategory;
  });

  if (sortByDistance && userLocation) {
    filteredItems = [...filteredItems].sort((a, b) => {
      const distA = calculateDistanceKm(userLocation.lat, userLocation.lng, a.lat, a.lng);
      const distB = calculateDistanceKm(userLocation.lat, userLocation.lng, b.lat, b.lng);
      return distA - distB;
    });
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold mb-3">
          <Compass className="w-3.5 h-3.5" />
          <span>Bản Đồ Di Sản & Văn Hóa Trực Quan</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-serif font-bold text-stone-100">
          Khám Phá Di Sản Trên Bản Đồ Việt Nam
        </h2>
        <p className="text-stone-300 text-xs sm:text-sm mt-2">
          Định vị các quần thể di tích, đền tháp, đô thị cổ và danh thắng tự nhiên từ Bắc chí Nam.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-4 mb-6 space-y-3.5">
        
        {/* Geolocation Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-stone-800">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleRequestGPS}
              disabled={isLocating}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                sortByDistance
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-stone-950 font-bold shadow'
                  : 'bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700'
              }`}
            >
              <LocateFixed className={`w-3.5 h-3.5 ${isLocating ? 'animate-spin' : 'text-emerald-400'}`} />
              <span>{isLocating ? 'Đang dò GPS...' : userLocation ? 'Cập nhật GPS' : 'Bật Định Vị Của Tôi'}</span>
            </button>

            {userLocation && (
              <button
                onClick={() => setSortByDistance(!sortByDistance)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                  sortByDistance
                    ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                    : 'bg-stone-950 border-stone-800 text-stone-400 hover:text-stone-200'
                }`}
              >
                {sortByDistance ? '✓ Đang xếp theo gần bạn nhất' : 'Xếp theo gần bạn nhất'}
              </button>
            )}

            <button
              onClick={() => {
                setEditingHeritage(null);
                setIsEditModalOpen(true);
              }}
              className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center gap-1.5 shadow transition-all active:scale-95"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ Đề Xuất Di Sản / Danh Lam Mới</span>
            </button>

            {userLocation && (
              <span className="text-[11px] text-stone-400 flex items-center gap-1 ml-1">
                <MapPin className="w-3 h-3 text-emerald-400" />
                <span>{userLocation.cityName || `${userLocation.lat.toFixed(2)}°B, ${userLocation.lng.toFixed(2)}°Đ`}</span>
              </span>
            )}
          </div>

          {/* Quick Preset City Pickers */}
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-stone-500 text-[11px]">Vị trí mẫu:</span>
            {VIETNAM_LOCATION_PRESETS.slice(0, 4).map(p => (
              <button
                key={p.id}
                onClick={() => {
                  const loc = geolocationService.setPresetLocation(p.id);
                  if (loc) {
                    setUserLocation(loc);
                    setSortByDistance(true);
                  }
                }}
                className="px-2 py-0.5 rounded-lg bg-stone-950 hover:bg-stone-800 border border-stone-800 text-[10px] text-stone-300 hover:text-stone-100"
              >
                {p.province}
              </button>
            ))}
          </div>
        </div>

        {locationMessage && (
          <div className="text-[11px] text-amber-300/90 bg-amber-500/10 px-3 py-1 rounded-lg border border-amber-500/20">
            {locationMessage}
          </div>
        )}

        {/* Region Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-stone-400 flex items-center gap-1 mr-2">
            <Filter className="w-3.5 h-3.5 text-amber-400" />
            <span>Vùng miền:</span>
          </span>
          {regions.map((reg) => (
            <button
              key={reg.id}
              onClick={() => setSelectedRegion(reg.id)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                selectedRegion === reg.id
                  ? 'bg-amber-500 text-stone-950 font-bold shadow'
                  : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
              }`}
            >
              {reg.label}
            </button>
          ))}
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-stone-800/80">
          <span className="text-xs font-semibold text-stone-400 mr-2">Phân loại:</span>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                selectedCategory === cat.id
                  ? 'bg-amber-600/30 text-amber-300 border border-amber-500/40'
                  : 'bg-stone-950/60 text-stone-400 hover:text-stone-200 border border-stone-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Map Layout: Left Interactive Map Stage, Right Active Heritage Detail Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Map Stage */}
        <div className="lg:col-span-7 bg-stone-900 border border-stone-800 rounded-3xl p-6 shadow-2xl relative overflow-hidden min-h-[500px]">
          
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <div>
              <h3 className="font-serif font-bold text-amber-200 text-sm sm:text-base flex items-center gap-2">
                <MapPin className="w-4 h-4 text-red-500" />
                <span>Các Điểm Di Sản ({filteredItems.length} địa điểm)</span>
              </h3>
              <span className="text-[11px] text-stone-400">Bấm vào điểm ghim để xem chi tiết</span>
            </div>

            {isAdmin && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setEditingHeritage(null);
                    setIsEditModalOpen(true);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
                  title="Thêm di sản mới vào bản đồ"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Thêm Di Sản</span>
                </button>
              </div>
            )}
          </div>

          {/* Stylized Vietnam Map Pin Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filteredItems.map((item) => {
              const isSelected = activeHeritage.id === item.id;
              const distance = userLocation 
                ? calculateDistanceKm(userLocation.lat, userLocation.lng, item.lat, item.lng)
                : null;

              return (
                <div
                  key={item.id}
                  onClick={() => setActiveHeritage(item)}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all duration-200 flex items-start gap-3 relative group ${
                    isSelected 
                      ? 'bg-amber-950/50 border-amber-500 ring-2 ring-amber-500/20 shadow-lg' 
                      : 'bg-stone-950/60 border-stone-800 hover:border-stone-700 hover:bg-stone-800/50'
                  }`}
                >
                  <img 
                    src={getSafeHeritageImageUrl(item.imageUrl, item.id)} 
                    alt={item.name} 
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    onError={(e) => handleImageError(e)}
                    className="w-14 h-14 rounded-xl object-cover border border-stone-800 shrink-0 bg-stone-900" 
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1.5 mb-1">
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-300 font-semibold truncate">
                        {item.categoryLabel}
                      </span>
                      <div className="flex items-center gap-1 shrink-0">
                        {distance !== null && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 font-bold border border-emerald-500/30 flex items-center gap-0.5">
                            <Navigation className="w-2.5 h-2.5" />
                            <span>{distance} km</span>
                          </span>
                        )}
                        {isAdmin && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingHeritage(item);
                              setIsEditModalOpen(true);
                            }}
                            className="p-1 rounded bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-stone-950 transition-colors"
                            title="Chỉnh sửa di sản này (Admin)"
                          >
                            <Edit className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </div>
                    <h4 className="text-xs font-bold text-stone-100 truncate group-hover:text-amber-300">
                      {item.name}
                    </h4>
                    <p className="text-[11px] text-stone-400 flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3 text-red-400 shrink-0" />
                      <span className="truncate">{item.province}</span>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredItems.length === 0 && (
            <div className="py-16 text-center text-stone-500">
              <p className="text-sm">Không tìm thấy di sản phù hợp bộ lọc</p>
            </div>
          )}
        </div>

        {/* Selected Heritage Detail Drawer Card */}
        <div className="lg:col-span-5 bg-stone-900 border border-stone-800 rounded-3xl p-6 shadow-2xl space-y-5 sticky top-20">
          
          <div className="relative h-44 rounded-2xl overflow-hidden border border-stone-800">
            <img 
              src={getSafeHeritageImageUrl(activeHeritage.imageUrl, activeHeritage.id)} 
              alt={activeHeritage.name} 
              loading="lazy"
              referrerPolicy="no-referrer"
              onError={(e) => handleImageError(e)}
              className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
              <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-amber-500/30 text-amber-200 border border-amber-500/40 backdrop-blur font-semibold">
                {activeHeritage.categoryLabel}
              </span>
              {activeHeritage.verifiedStatus === 'verified' && (
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  Đã xác minh
                </span>
              )}
            </div>
          </div>

          <div>
            <h3 className="font-serif font-bold text-amber-100 text-lg sm:text-xl">
              {activeHeritage.name}
            </h3>
            <p className="text-xs text-stone-400 mt-1 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-red-400 shrink-0" />
              <span>{activeHeritage.address}</span>
            </p>

            {userLocation && (
              <div className="mt-2.5 px-3 py-2 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-between text-xs">
                <span className="text-emerald-300 font-semibold flex items-center gap-1.5">
                  <Navigation className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Cách bạn {calculateDistanceKm(userLocation.lat, userLocation.lng, activeHeritage.lat, activeHeritage.lng)} km</span>
                </span>
                <span className="text-stone-300 text-[11px] flex items-center gap-1">
                  <Car className="w-3 h-3 text-amber-400" />
                  <span>{formatTravelEstimate(calculateDistanceKm(userLocation.lat, userLocation.lng, activeHeritage.lat, activeHeritage.lng)).driving}</span>
                </span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-stone-950/60 p-3 rounded-xl border border-stone-800">
              <span className="text-stone-500 flex items-center gap-1 mb-1">
                <Clock className="w-3 h-3 text-amber-400" />
                Giờ mở cửa:
              </span>
              <span className="text-stone-200 font-medium">{activeHeritage.visitingHours}</span>
            </div>
            <div className="bg-stone-950/60 p-3 rounded-xl border border-stone-800">
              <span className="text-stone-500 flex items-center gap-1 mb-1">
                <Ticket className="w-3 h-3 text-amber-400" />
                Giá vé:
              </span>
              <span className="text-stone-200 font-medium">{activeHeritage.ticketPrice}</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-amber-300 uppercase tracking-wider mb-1">
              Giá trị văn hóa:
            </h4>
            <p className="text-xs text-stone-300 leading-relaxed">
              {activeHeritage.culturalSignificance}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="pt-3 border-t border-stone-800 space-y-2.5">
            <a
              href={activeHeritage.googleMapsUri}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-stone-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow transition-all"
            >
              <Navigation className="w-3.5 h-3.5 text-stone-950" />
              <span>Chỉ đường trên Google Maps</span>
              <ExternalLink className="w-3 h-3 opacity-80" />
            </a>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onNavigateToStory(activeHeritage.name, activeHeritage.history, activeHeritage.period)}
                className="py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow transition-all"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Nghe AI kể chuyện</span>
              </button>

              <button
                onClick={() => onNavigateToFood(activeHeritage.id)}
                className="py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold text-xs flex items-center justify-center gap-1.5 border border-stone-700 transition-all"
              >
                <Utensils className="w-3.5 h-3.5 text-orange-400" />
                <span>Ăn uống gần đây</span>
              </button>
            </div>

            {isAdmin && (
              <button
                onClick={() => {
                  setEditingHeritage(activeHeritage);
                  setIsEditModalOpen(true);
                }}
                className="w-full py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Edit className="w-3.5 h-3.5 text-amber-400" />
                <span>Chỉnh sửa thông tin di sản này (Admin)</span>
              </button>
            )}
          </div>

        </div>

      </div>

      {/* Admin Heritage Edit / Add Modal */}
      <HeritageEditModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingHeritage(null);
        }}
        heritage={editingHeritage}
        onSaveSuccess={() => {
          const updated = storageService.getHeritages();
          setHeritages(updated);
        }}
      />

    </div>
  );
};
