import React, { useState, useEffect } from 'react';
import { 
  Compass, 
  MapPin, 
  Navigation, 
  Clock, 
  Volume2, 
  Utensils, 
  Star, 
  ExternalLink, 
  Sparkles, 
  RefreshCw, 
  ShieldCheck, 
  LocateFixed, 
  CheckCircle2, 
  Footprints, 
  Car,
  Layers,
  ChevronRight,
  AlertCircle,
  Edit,
  Plus
} from 'lucide-react';
import { 
  geolocationService, 
  VIETNAM_LOCATION_PRESETS, 
  LocationPreset 
} from '../services/geolocationService';
import { 
  UserLocation, 
  NearbyHeritageRecommendation, 
  NearbyPlaceRecommendation,
  HeritageItem,
  PlaceItem,
  UserProfile
} from '../types';
import { storageService } from '../services/storageService';
import { HeritageEditModal } from './HeritageEditModal';
import { PlaceEditModal } from './PlaceEditModal';
import { HeritageDetailModal } from './HeritageDetailModal';

interface NearbyRecommendationWidgetProps {
  currentUser?: UserProfile;
  onSelectHeritage?: (heritage: HeritageItem) => void;
  onNavigateToStory?: (heritageName: string, history?: string, period?: string) => void;
  onNavigateToFood: (heritageId: string) => void;
  onNavigateToMap: () => void;
  onAskAI?: (heritage: HeritageItem, initialQuestion?: string) => void;
}

export const NearbyRecommendationWidget: React.FC<NearbyRecommendationWidgetProps> = ({
  currentUser,
  onSelectHeritage,
  onNavigateToStory,
  onNavigateToFood,
  onNavigateToMap,
  onAskAI
}) => {
  const [currentLocation, setCurrentLocation] = useState<UserLocation | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState<boolean>(false);
  const [locationError, setLocationError] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'heritages' | 'places'>('heritages');
  const [nearbyHeritages, setNearbyHeritages] = useState<NearbyHeritageRecommendation[]>([]);
  const [nearbyPlaces, setNearbyPlaces] = useState<NearbyPlaceRecommendation[]>([]);

  // Heritage Detail Modal state
  const [selectedDetailHeritage, setSelectedDetailHeritage] = useState<HeritageItem | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState<boolean>(false);

  const handleOpenDetail = (item: HeritageItem) => {
    setSelectedDetailHeritage(item);
    setIsDetailModalOpen(true);
    if (onSelectHeritage) {
      onSelectHeritage(item);
    }
  };

  // Admin edit modal states
  const [editingHeritage, setEditingHeritage] = useState<HeritageItem | null>(null);
  const [isHeritageModalOpen, setIsHeritageModalOpen] = useState<boolean>(false);
  const [editingPlace, setEditingPlace] = useState<PlaceItem | null>(null);
  const [isPlaceModalOpen, setIsPlaceModalOpen] = useState<boolean>(false);
  const [allHeritages, setAllHeritages] = useState<HeritageItem[]>(storageService.getHeritages());

  const activeUser = currentUser || storageService.getUserProfile();
  const isAdmin = activeUser?.isLoggedIn && activeUser?.role === 'admin';

  // Load saved location or fallback to Hanoi preset on initial mount
  useEffect(() => {
    const saved = geolocationService.getLastKnownLocation();
    if (saved) {
      updateRecommendations(saved);
    } else {
      // Default to Hanoi so user immediately sees rich recommendations
      const defaultPreset = geolocationService.setPresetLocation('hanoi');
      if (defaultPreset) {
        updateRecommendations(defaultPreset);
      }
    }

    const handleDataUpdated = () => {
      setAllHeritages(storageService.getHeritages());
      const current = geolocationService.getLastKnownLocation();
      if (current) {
        updateRecommendations(current);
      }
    };

    window.addEventListener('heritage-data-updated', handleDataUpdated);
    return () => window.removeEventListener('heritage-data-updated', handleDataUpdated);
  }, []);

  const updateRecommendations = (loc: UserLocation) => {
    setCurrentLocation(loc);
    const heritages = geolocationService.getNearbyHeritages(loc.lat, loc.lng, 6);
    const places = geolocationService.getNearbyPlaces(loc.lat, loc.lng, 6);
    setNearbyHeritages(heritages);
    setNearbyPlaces(places);
  };

  const handleRequestGPS = async () => {
    setIsLoadingLocation(true);
    setLocationError('');

    const res = await geolocationService.requestCurrentPosition();
    setIsLoadingLocation(false);

    if (res.success && res.location) {
      updateRecommendations(res.location);
    } else {
      setLocationError(res.error || 'Không thể lấy tọa độ vị trí thực tế.');
    }
  };

  const handleSelectPreset = (presetId: string) => {
    setLocationError('');
    const loc = geolocationService.setPresetLocation(presetId);
    if (loc) {
      updateRecommendations(loc);
    }
  };

  const closestHeritage = nearbyHeritages[0];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-gradient-to-b from-stone-900 via-stone-900/90 to-stone-950 border border-stone-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        
        {/* Decorative Glow */}
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 pb-6 border-b border-stone-800/80">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold mb-2">
              <LocateFixed className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>Định Vị Thông Minh GPS & Trải Nghiệm Lân Cận</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-100 flex items-center gap-2">
              <span>Đề Xuất Địa Điểm Gần Vị Trí Của Bạn</span>
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 mt-1">
              Hệ thống tự động tính toán khoảng cách và thời gian di chuyển để gợi ý các di tích, quán ăn đặc sản xung quanh bạn.
            </p>
          </div>

          {/* GPS Button & Current Location Pill */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            {currentLocation && (
              <div className="px-3.5 py-2 rounded-xl bg-stone-950/80 border border-stone-800 text-xs flex items-center gap-2 text-stone-300">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <span className="text-[10px] text-stone-500 block leading-tight">Vị trí hiện tại:</span>
                  <span className="font-semibold text-stone-100">
                    {currentLocation.cityName || `${currentLocation.lat.toFixed(3)}°B, ${currentLocation.lng.toFixed(3)}°Đ`}
                  </span>
                </div>
                {currentLocation.source === 'gps' && (
                  <span className="px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 text-[9px] font-bold border border-emerald-500/30">
                    GPS Thực
                  </span>
                )}
              </div>
            )}

            <button
              onClick={handleRequestGPS}
              disabled={isLoadingLocation}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-stone-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-950/40 transition-all active:scale-95 disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoadingLocation ? 'animate-spin' : ''}`} />
              <span>{isLoadingLocation ? 'Đang dò GPS...' : 'Lấy định vị GPS của tôi'}</span>
            </button>
          </div>
        </div>

        {/* Location Error Notice if any */}
        {locationError && (
          <div className="mb-6 p-3.5 rounded-2xl bg-amber-950/30 border border-amber-500/30 text-xs text-amber-200 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-semibold text-amber-300">Không thể lấy định vị từ thiết bị:</p>
              <p className="text-[11px] text-stone-300 mt-0.5">{locationError}</p>
              <p className="text-[11px] text-stone-400 mt-1">
                Bạn có thể chọn nhanh các vị trí văn hóa tiêu biểu bên dưới để khám phá ngay lập tức.
              </p>
            </div>
          </div>
        )}

        {/* Quick Location Switcher Chips */}
        <div className="mb-6 flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-stone-400 flex items-center gap-1 mr-1">
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            <span>Đổi vị trí nhanh:</span>
          </span>
          {VIETNAM_LOCATION_PRESETS.map((p) => {
            const isSelected = currentLocation?.cityName?.includes(p.province) || currentLocation?.cityName === p.name;
            return (
              <button
                key={p.id}
                onClick={() => handleSelectPreset(p.id)}
                className={`px-3 py-1 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-amber-500 text-stone-950 font-bold shadow-md shadow-amber-500/20 ring-1 ring-amber-400'
                    : 'bg-stone-950/70 border border-stone-800 text-stone-300 hover:text-stone-100 hover:border-stone-700'
                }`}
              >
                <span>📍</span>
                <span>{p.province}</span>
              </button>
            );
          })}
        </div>

        {/* Highlight Banner: Closest Destination */}
        {closestHeritage && (
          <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-950/50 via-stone-900 to-stone-950 border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start sm:items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center shrink-0">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    Gần bạn nhất
                  </span>
                  <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                    <Navigation className="w-3 h-3 text-emerald-400" />
                    <span>Cách {closestHeritage.distanceKm} km</span>
                  </span>
                </div>
                <h4 className="font-serif font-bold text-stone-100 text-base sm:text-lg mt-0.5">
                  {closestHeritage.name}
                </h4>
                <p className="text-xs text-stone-300 mt-0.5 line-clamp-1">
                  {closestHeritage.matchHighlight} • Ước tính: {closestHeritage.drivingTimeText} ({closestHeritage.walkingTimeText})
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {onSelectHeritage ? (
                <button
                  onClick={() => onSelectHeritage(closestHeritage)}
                  className="px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs flex items-center gap-1.5 shadow transition-all"
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>Khám phá ngay</span>
                </button>
              ) : onNavigateToStory ? (
                <button
                  onClick={() => onNavigateToStory(closestHeritage.name, closestHeritage.history, closestHeritage.period)}
                  className="px-3.5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow transition-all"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Nghe AI kể chuyện</span>
                </button>
              ) : null}
              <button
                onClick={() => onNavigateToFood(closestHeritage.id)}
                className="px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-300 font-semibold text-xs border border-stone-700 flex items-center gap-1.5 transition-all"
              >
                <Utensils className="w-3.5 h-3.5" />
                <span>Ăn uống gần đây</span>
              </button>
            </div>
          </div>
        )}

        {/* Tab Selection & Admin Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-stone-800 pb-3">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('heritages')}
              className={`pb-3 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-all flex items-center gap-2 ${
                activeTab === 'heritages'
                  ? 'border-amber-500 text-amber-400'
                  : 'border-transparent text-stone-400 hover:text-stone-200'
              }`}
            >
              <span>🏛 Di Sản & Di Tích Gần Bạn</span>
              <span className="px-1.5 py-0.5 rounded-full bg-stone-800 text-[10px] text-stone-300">
                {nearbyHeritages.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('places')}
              className={`pb-3 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-all flex items-center gap-2 ${
                activeTab === 'places'
                  ? 'border-amber-500 text-amber-400'
                  : 'border-transparent text-stone-400 hover:text-stone-200'
              }`}
            >
              <span>🍜 Ăn Uống & Trải Nghiệm Gần Bạn</span>
              <span className="px-1.5 py-0.5 rounded-full bg-stone-800 text-[10px] text-stone-300">
                {nearbyPlaces.length}
              </span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            {isAdmin && (
              <>
                {activeTab === 'heritages' ? (
                  <button
                    onClick={() => {
                      setEditingHeritage(null);
                      setIsHeritageModalOpen(true);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
                    title="Thêm một di sản mới vào hệ thống"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Thêm Di Sản</span>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setEditingPlace(null);
                      setIsPlaceModalOpen(true);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
                    title="Thêm địa điểm ăn uống hoặc trải nghiệm mới"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Thêm Địa Điểm</span>
                  </button>
                )}
                <span className="text-[11px] px-2.5 py-1 rounded-lg bg-stone-900 border border-amber-500/20 text-amber-400 font-medium hidden md:inline-flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span>Chế độ Quản trị: Có thể sửa trực tiếp trên từng thẻ</span>
                </span>
              </>
            )}

            <button
              onClick={onNavigateToMap}
              className="text-xs font-bold text-amber-400 hover:text-amber-300 hidden sm:flex items-center gap-1 transition-colors"
            >
              <span>Mở bản đồ toàn cảnh</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* TAB 1: HERITAGES LIST */}
        {activeTab === 'heritages' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {nearbyHeritages.map((item, idx) => (
              <div
                key={item.id}
                className="bg-stone-950/80 border border-stone-800 hover:border-amber-500/40 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 flex flex-col justify-between group relative"
              >
                <div 
                  onClick={() => handleOpenDetail(item)}
                  className="cursor-pointer"
                >
                  <div className="relative h-44 w-full overflow-hidden bg-stone-900">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    {/* Distance Badge */}
                    <div className="absolute top-3 left-3 flex items-center gap-1 bg-stone-950/90 text-emerald-300 text-xs px-2.5 py-1 rounded-full border border-emerald-500/30 backdrop-blur font-bold shadow">
                      <Navigation className="w-3 h-3 text-emerald-400" />
                      <span>{item.distanceKm} km</span>
                    </div>

                    <div className="absolute top-3 right-3 flex items-center gap-1.5">
                      {isAdmin && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingHeritage(item);
                            setIsHeritageModalOpen(true);
                          }}
                          className="px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-[11px] shadow-lg flex items-center gap-1 transition-transform active:scale-95 cursor-pointer"
                          title="Chỉnh sửa nội dung di sản này (Admin)"
                        >
                          <Edit className="w-3 h-3" />
                          <span>Sửa</span>
                        </button>
                      )}
                      <span className="text-[10px] px-2 py-0.5 rounded bg-stone-950/80 text-amber-300 border border-stone-700 backdrop-blur font-medium">
                        {item.categoryLabel}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] text-stone-300 bg-stone-950/80 px-2.5 py-1 rounded-lg backdrop-blur">
                      <span className="flex items-center gap-1 truncate">
                        <MapPin className="w-3 h-3 text-red-400 shrink-0" />
                        <span className="truncate">{item.province}</span>
                      </span>
                      <span className="flex items-center gap-1 text-stone-400 shrink-0">
                        <Car className="w-3 h-3 text-amber-400" />
                        <span>{item.drivingTimeText}</span>
                      </span>
                    </div>
                  </div>

                  <div className="p-4 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-serif font-bold text-stone-100 text-base group-hover:text-amber-300 transition-colors line-clamp-1">
                        {item.name}
                      </h4>
                      {isAdmin && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingHeritage(item);
                            setIsHeritageModalOpen(true);
                          }}
                          className="p-1 rounded-md text-amber-400 hover:text-amber-300 hover:bg-amber-500/10 shrink-0"
                          title="Chỉnh sửa di sản"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                    <p className="text-xs text-stone-300 line-clamp-2 leading-relaxed">
                      {item.culturalSignificance}
                    </p>
                    {item.matchHighlight && (
                      <p className="text-[11px] text-amber-400/90 italic line-clamp-1">
                        ✨ {item.matchHighlight}
                      </p>
                    )}
                  </div>
                </div>

                <div className="p-4 pt-0 border-t border-stone-800/80 mt-2 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleOpenDetail(item)}
                    className="py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-md active:scale-95"
                  >
                    <Compass className="w-3.5 h-3.5" />
                    <span>Xem chi tiết</span>
                  </button>

                  <button
                    onClick={() => onNavigateToFood(item.id)}
                    className="py-2 px-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-300 font-semibold text-xs flex items-center justify-center gap-1.5 border border-stone-700 transition-colors cursor-pointer active:scale-95"
                  >
                    <Utensils className="w-3.5 h-3.5" />
                    <span>Ăn uống gần đây</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: NEARBY FOOD & PLACES LIST */}
        {activeTab === 'places' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {nearbyPlaces.map((place) => (
              <div
                key={place.id}
                className="bg-stone-950/80 border border-stone-800 hover:border-amber-500/40 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 flex flex-col justify-between group relative"
              >
                <div>
                  <div className="relative h-40 w-full overflow-hidden bg-stone-900">
                    <img
                      src={place.photoUrl}
                      alt={place.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Distance Badge */}
                    <div className="absolute top-3 left-3 flex items-center gap-1 bg-stone-950/90 text-emerald-300 text-xs px-2.5 py-1 rounded-full border border-emerald-500/30 backdrop-blur font-bold shadow">
                      <Navigation className="w-3 h-3 text-emerald-400" />
                      <span>{place.distanceKm} km</span>
                    </div>

                    <div className="absolute top-3 right-3 flex items-center gap-1.5">
                      {isAdmin && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingPlace(place);
                            setIsPlaceModalOpen(true);
                          }}
                          className="px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-[11px] shadow-lg flex items-center gap-1 transition-transform active:scale-95 cursor-pointer"
                          title="Chỉnh sửa thông tin địa điểm này (Admin)"
                        >
                          <Edit className="w-3 h-3" />
                          <span>Sửa</span>
                        </button>
                      )}
                      <div className="flex items-center gap-1 bg-amber-500/90 text-stone-950 text-xs px-2 py-0.5 rounded-full font-bold">
                        <Star className="w-3 h-3 fill-stone-950" />
                        <span>{place.rating}</span>
                      </div>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] text-stone-300 bg-stone-950/80 px-2.5 py-1 rounded-lg backdrop-blur">
                      <span className="text-amber-300 font-medium truncate">
                        {place.categoryLabel}
                      </span>
                      <span className="text-stone-400 text-[10px] shrink-0">
                        {place.drivingTimeText}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-bold text-stone-100 text-sm group-hover:text-amber-300 transition-colors line-clamp-1">
                        {place.name}
                      </h4>
                      {isAdmin && (
                        <button
                          onClick={() => {
                            setEditingPlace(place);
                            setIsPlaceModalOpen(true);
                          }}
                          className="p-1 rounded-md text-amber-400 hover:text-amber-300 hover:bg-amber-500/10 shrink-0"
                          title="Chỉnh sửa địa điểm"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                    <p className="text-[11px] text-stone-400 line-clamp-1 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-red-400 shrink-0" />
                      <span className="truncate">{place.address}</span>
                    </p>

                    {place.specialties && place.specialties.length > 0 && (
                      <div className="flex flex-wrap gap-1 pt-1">
                        {place.specialties.slice(0, 2).map((spec, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded bg-stone-900 border border-stone-800 text-[10px] text-stone-300"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-4 pt-0 border-t border-stone-800/80 mt-2 flex gap-2">
                  <a
                    href={place.googleMapsUri}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 px-3 rounded-xl bg-emerald-600/90 hover:bg-emerald-600 text-stone-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Chỉ đường Maps</span>
                  </a>

                  <button
                    onClick={() => onNavigateToFood('dai-noi-hue')}
                    className="py-2 px-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 font-semibold text-xs flex items-center justify-center gap-1 border border-stone-700 transition-colors"
                  >
                    <span>Xem review</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Heritage Detail Modal (Xem chi tiết di sản) */}
      <HeritageDetailModal
        heritage={selectedDetailHeritage}
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedDetailHeritage(null);
        }}
        onNavigateToStory={onNavigateToStory}
        onNavigateToFood={onNavigateToFood}
        onAskAI={onAskAI}
        onNavigateToMap={onNavigateToMap}
      />

      {/* Admin Heritage Edit Modal */}
      <HeritageEditModal
        isOpen={isHeritageModalOpen}
        onClose={() => {
          setIsHeritageModalOpen(false);
          setEditingHeritage(null);
        }}
        heritage={editingHeritage}
        onSaveSuccess={() => {
          setAllHeritages(storageService.getHeritages());
          if (currentLocation) updateRecommendations(currentLocation);
        }}
      />

      {/* Admin Place Edit Modal */}
      <PlaceEditModal
        isOpen={isPlaceModalOpen}
        onClose={() => {
          setIsPlaceModalOpen(false);
          setEditingPlace(null);
        }}
        place={editingPlace}
        heritageId={editingHeritage?.id || allHeritages[0]?.id || 'dai-noi-hue'}
        heritagesList={allHeritages}
        onSaveSuccess={() => {
          if (currentLocation) updateRecommendations(currentLocation);
        }}
      />
    </section>
  );
};
