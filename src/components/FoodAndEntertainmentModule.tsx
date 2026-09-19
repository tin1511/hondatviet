import React, { useState } from 'react';
import { 
  Utensils, 
  Coffee, 
  Sparkles, 
  Star, 
  MapPin, 
  ExternalLink, 
  Clock, 
  Phone, 
  Filter, 
  Check, 
  HelpCircle, 
  Info, 
  ArrowRight, 
  Layers, 
  Compass, 
  SlidersHorizontal,
  ThumbsUp,
  AlertTriangle,
  RefreshCw,
  Scale,
  LocateFixed,
  Navigation
} from 'lucide-react';
import { PLACES_NEAR_HERITAGE, HERITAGE_DATABASE } from '../data/vietnamHeritageData';
import { PlaceItem, PlaceCategory, PlaceReviewSummary, MatchReasoningResult } from '../types';
import { aiService } from '../services/aiService';
import { geolocationService } from '../services/geolocationService';

interface FoodAndEntertainmentModuleProps {
  initialHeritageId?: string;
  onNavigateToHeritage?: (heritageId: string) => void;
}

export const FoodAndEntertainmentModule: React.FC<FoodAndEntertainmentModuleProps> = ({
  initialHeritageId = 'dai-noi-hue',
  onNavigateToHeritage
}) => {
  const [selectedHeritageId, setSelectedHeritageId] = useState<string>(initialHeritageId);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [minRating, setMinRating] = useState<number>(0);
  const [openNowOnly, setOpenNowOnly] = useState<boolean>(false);
  const [maxDistance, setMaxDistance] = useState<number>(5.0);
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [gpsLocationText, setGpsLocationText] = useState<string>('');


  // Review Synthesis Modal
  const [analyzingPlace, setAnalyzingPlace] = useState<PlaceItem | null>(null);
  const [reviewSummary, setReviewSummary] = useState<PlaceReviewSummary | null>(null);
  const [reviewLoading, setReviewLoading] = useState<boolean>(false);

  // "Phù hợp với tôi" Feature
  const [matchPrompt, setMatchPrompt] = useState<string>('');
  const [matchingLoading, setMatchingLoading] = useState<boolean>(false);
  const [matchResults, setMatchResults] = useState<MatchReasoningResult[]>([]);
  const [showMatchModal, setShowMatchModal] = useState<boolean>(false);

  // Compare Mode (Up to 3 places)
  const [selectedForCompare, setSelectedForCompare] = useState<PlaceItem[]>([]);
  const [showCompareModal, setShowCompareModal] = useState<boolean>(false);

  const categories = [
    { id: 'all', label: 'Tất cả' },
    { id: 'restaurant', label: '🍜 Nhà hàng' },
    { id: 'cafe', label: '☕ Cà phê & Nước' },
    { id: 'local_food', label: '🍲 Đặc sản địa phương' },
    { id: 'dessert', label: '🍰 Tráng miệng & Chè' },
    { id: 'entertainment', label: '🎭 Giải trí & Trải nghiệm' },
    { id: 'cinema', label: '🎬 Rạp phim' },
    { id: 'shopping', label: '🛍 Mua sắm' },
  ];

  const currentPlaces: PlaceItem[] = PLACES_NEAR_HERITAGE[selectedHeritageId] || PLACES_NEAR_HERITAGE['dai-noi-hue'] || [];

  const handleSelectNearestByGPS = async () => {
    setIsLocating(true);
    const res = await geolocationService.requestCurrentPosition();
    setIsLocating(false);

    let lat = 21.0285;
    let lng = 105.8542;
    if (res.success && res.location) {
      lat = res.location.lat;
      lng = res.location.lng;
    } else {
      const saved = geolocationService.getLastKnownLocation();
      if (saved) {
        lat = saved.lat;
        lng = saved.lng;
      }
    }

    const nearest = geolocationService.getNearbyHeritages(lat, lng, 1);
    if (nearest && nearest.length > 0) {
      setSelectedHeritageId(nearest[0].id);
      setGpsLocationText(`Đã tự động chọn di sản gần bạn nhất: ${nearest[0].name} (cách ${nearest[0].distanceKm} km)`);
    }
  };

  const filteredPlaces = currentPlaces.filter((place) => {
    const matchCat = selectedCategory === 'all' || place.category === selectedCategory;
    const matchRating = place.rating >= minRating;
    const matchOpen = !openNowOnly || place.openNow;
    const matchDist = place.distanceKm ? place.distanceKm <= maxDistance : true;
    return matchCat && matchRating && matchOpen && matchDist;
  });

  const handleOpenReviewSynthesis = async (place: PlaceItem) => {
    setAnalyzingPlace(place);
    setReviewLoading(true);
    try {
      if (place.reviewSummary) {
        setReviewSummary(place.reviewSummary);
      } else {
        const summary = await aiService.analyzePlaceReviews({
          placeName: place.name,
          rating: place.rating,
          userRatingCount: place.userRatingCount,
          sampleReviews: [],
          placeType: place.categoryLabel
        });
        setReviewSummary(summary);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setReviewLoading(false);
    }
  };

  const handleRunPersonalizedMatch = async () => {
    if (!matchPrompt.trim()) return;
    setMatchingLoading(true);
    try {
      const heritage = HERITAGE_DATABASE.find(h => h.id === selectedHeritageId);
      const matches = await aiService.matchPlacesToPreference({
        userPreference: matchPrompt,
        places: currentPlaces,
        heritageContext: heritage ? `${heritage.name}, ${heritage.province}` : 'Quanh di sản'
      });
      setMatchResults(matches);
      setShowMatchModal(true);
    } catch (err) {
      console.error(err);
    } finally {
      setMatchingLoading(false);
    }
  };

  const handleToggleCompare = (place: PlaceItem) => {
    if (selectedForCompare.some(p => p.id === place.id)) {
      setSelectedForCompare(selectedForCompare.filter(p => p.id !== place.id));
    } else {
      if (selectedForCompare.length >= 3) {
        alert('Bạn chỉ có thể so sánh tối đa 3 địa điểm cùng lúc.');
        return;
      }
      setSelectedForCompare([...selectedForCompare, place]);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20 text-xs font-semibold mb-3">
          <Utensils className="w-3.5 h-3.5" />
          <span>Google Places & Trải Nghiệm Xung Quanh Di Sản</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-serif font-bold text-stone-100">
          Ăn Uống, Nghỉ Ngơi & Giải Trí
        </h2>
        <p className="text-stone-300 text-xs sm:text-sm mt-2">
          Tìm kiếm quán ngon, cà phê muối, trà sen và không gian văn hóa gần di sản với phân tích đánh giá khách quan.
        </p>
      </div>

      {/* Select Heritage Context */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-4 mb-6 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <label className="text-xs font-semibold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5" />
            <span>Khu vực Di sản đang khám phá:</span>
          </label>
          <div className="flex items-center gap-2">
            <button
              onClick={handleSelectNearestByGPS}
              disabled={isLocating}
              className="px-3 py-1 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 text-xs font-semibold flex items-center gap-1.5 transition-all"
            >
              <LocateFixed className={`w-3.5 h-3.5 ${isLocating ? 'animate-spin' : ''}`} />
              <span>{isLocating ? 'Đang dò GPS...' : '📍 Chọn di sản gần GPS của tôi'}</span>
            </button>
            <span className="text-[11px] text-stone-400 hidden sm:inline">
              Dữ liệu kết nối vị trí thực tế trên Google Maps
            </span>
          </div>
        </div>

        {gpsLocationText && (
          <div className="text-[11px] text-emerald-300 bg-emerald-950/50 border border-emerald-500/30 px-3 py-1 rounded-lg">
            {gpsLocationText}
          </div>
        )}

        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {HERITAGE_DATABASE.map((h) => (
            <button
              key={h.id}
              onClick={() => setSelectedHeritageId(h.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all flex items-center gap-2 ${
                selectedHeritageId === h.id
                  ? 'bg-amber-600 text-stone-950 font-bold shadow'
                  : 'bg-stone-950/60 text-stone-300 hover:bg-stone-800 border border-stone-800'
              }`}
            >
              <MapPin className="w-3.5 h-3.5 text-red-400" />
              <span>{h.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* "Phù hợp với tôi" Personalized Matcher Banner */}
      <div className="bg-gradient-to-r from-amber-950/40 via-stone-900 to-amber-950/40 border border-amber-500/30 rounded-2xl p-5 mb-8 shadow-xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-left space-y-1">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <h3 className="font-serif font-bold text-amber-200 text-base">Tính năng: "Phù hợp với tôi"</h3>
            </div>
            <p className="text-xs text-stone-300 max-w-xl">
              Nhập mong muốn của bạn (ví dụ: <em>"Tôi muốn quán giá rẻ, yên tĩnh có đặc sản Huế chuẩn vị"</em>), AI sẽ giải thích vì sao địa điểm đó phù hợp mà không phán đoán cảm tính.
            </p>
          </div>

          <div className="w-full md:w-auto flex-1 max-w-md flex items-center gap-2">
            <input
              type="text"
              value={matchPrompt}
              onChange={(e) => setMatchPrompt(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleRunPersonalizedMatch()}
              placeholder="Nhập nhu cầu: giá rẻ, yên tĩnh, ăn sáng ngon..."
              className="flex-1 bg-stone-950 border border-stone-700 rounded-xl px-3.5 py-2.5 text-xs text-stone-100 placeholder-stone-400 focus:outline-none focus:border-amber-500"
            />
            <button
              onClick={handleRunPersonalizedMatch}
              disabled={matchingLoading || !matchPrompt.trim()}
              className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs rounded-xl shadow transition-all flex items-center gap-1.5 disabled:opacity-50"
            >
              {matchingLoading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
              <span>AI Đề Xuất</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Compare Bar */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-4 mb-6 space-y-4">
        
        {/* Category Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-amber-500 text-stone-950 font-bold shadow'
                  : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Filters: Rating, Distance, Open Now */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-stone-800 text-xs">
          
          <div className="flex flex-wrap items-center gap-3">
            {/* Rating Filter */}
            <div className="flex items-center gap-1.5">
              <span className="text-stone-400">Đánh giá:</span>
              {[0, 4.0, 4.5].map((r) => (
                <button
                  key={r}
                  onClick={() => setMinRating(r)}
                  className={`px-2 py-0.5 rounded border transition-colors ${
                    minRating === r
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500'
                      : 'bg-stone-950 text-stone-400 border-stone-800'
                  }`}
                >
                  {r === 0 ? 'Tất cả' : `${r}★+`}
                </button>
              ))}
            </div>

            {/* Distance Filter */}
            <div className="flex items-center gap-1.5">
              <span className="text-stone-400">Bán kính:</span>
              {[1, 2, 5].map((d) => (
                <button
                  key={d}
                  onClick={() => setMaxDistance(d)}
                  className={`px-2 py-0.5 rounded border transition-colors ${
                    maxDistance === d
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500'
                      : 'bg-stone-950 text-stone-400 border-stone-800'
                  }`}
                >
                  &le;{d}km
                </button>
              ))}
            </div>

            {/* Open Now Toggle */}
            <label className="flex items-center gap-1.5 cursor-pointer select-none text-stone-300">
              <input
                type="checkbox"
                checked={openNowOnly}
                onChange={(e) => setOpenNowOnly(e.target.checked)}
                className="rounded text-amber-500 focus:ring-amber-500"
              />
              <span>Chỉ quán đang mở cửa</span>
            </label>
          </div>

          {/* Compare Bar Button */}
          {selectedForCompare.length > 0 && (
            <div className="flex items-center gap-2 bg-stone-950 px-3 py-1.5 rounded-xl border border-amber-500/40">
              <span className="text-amber-300 font-medium">Đã chọn ({selectedForCompare.length}/3)</span>
              <button
                onClick={() => setShowCompareModal(true)}
                className="px-2.5 py-1 rounded-lg bg-amber-500 text-stone-950 font-bold text-xs flex items-center gap-1"
              >
                <Scale className="w-3.5 h-3.5" />
                <span>So sánh ngay</span>
              </button>
              <button
                onClick={() => setSelectedForCompare([])}
                className="text-stone-500 hover:text-stone-300 text-[10px]"
              >
                Hủy
              </button>
            </div>
          )}
        </div>

      </div>

      {/* Places Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlaces.map((place) => {
          const isComparing = selectedForCompare.some(p => p.id === place.id);
          return (
            <div
              key={place.id}
              className="bg-stone-900 border border-stone-800 hover:border-amber-500/40 rounded-2xl overflow-hidden shadow-xl transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                {/* Photo & Badge */}
                <div className="relative h-44 w-full overflow-hidden bg-stone-950">
                  <img
                    src={place.photoUrl}
                    alt={place.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-stone-900/90 text-amber-300 border border-amber-500/30 font-semibold backdrop-blur">
                      {place.categoryLabel}
                    </span>
                    
                    <button
                      onClick={() => handleToggleCompare(place)}
                      className={`text-[10px] px-2 py-0.5 rounded-full font-semibold border backdrop-blur transition-colors ${
                        isComparing
                          ? 'bg-amber-500 text-stone-950 border-amber-400 font-bold'
                          : 'bg-stone-900/80 text-stone-300 border-stone-700 hover:border-amber-400'
                      }`}
                    >
                      {isComparing ? '✓ Đã chọn so sánh' : '+ So sánh'}
                    </button>
                  </div>

                  {place.distanceKm !== undefined && (
                    <div className="absolute bottom-2.5 right-2.5 text-[10px] px-2 py-0.5 rounded bg-black/70 text-white backdrop-blur">
                      Cách di sản {place.distanceKm} km
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4 space-y-2.5">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-serif font-bold text-stone-100 text-base group-hover:text-amber-300 transition-colors">
                      {place.name}
                    </h4>
                    <div className="flex items-center gap-1 bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-lg border border-amber-500/30 shrink-0">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="text-xs font-bold">{place.rating}</span>
                      <span className="text-[10px] text-stone-400">({place.userRatingCount})</span>
                    </div>
                  </div>

                  <p className="text-xs text-stone-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-red-400 shrink-0" />
                    <span className="truncate">{place.address}</span>
                  </p>

                  <div className="flex items-center justify-between text-xs text-stone-300">
                    <span className="text-amber-400 font-medium">{place.priceText}</span>
                    <span className={`text-[11px] font-medium flex items-center gap-1 ${place.openNow ? 'text-emerald-400' : 'text-stone-500'}`}>
                      <Clock className="w-3 h-3" />
                      {place.openNow ? 'Đang mở cửa' : 'Đã đóng cửa'} ({place.openingHoursText})
                    </span>
                  </div>

                  {/* Specialties */}
                  {place.specialties && place.specialties.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {place.specialties.map((spec, idx) => (
                        <span key={idx} className="text-[10px] px-2 py-0.5 bg-stone-950 text-stone-300 rounded-md border border-stone-800">
                          {spec}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Attribution notice */}
                  {place.attributionText && (
                    <p className="text-[9px] text-stone-500">
                      {place.attributionText}
                    </p>
                  )}
                </div>
              </div>

              {/* Card Actions */}
              <div className="p-4 pt-0 grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleOpenReviewSynthesis(place)}
                  className="py-2 px-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-300 text-xs font-semibold flex items-center justify-center gap-1 border border-stone-700 transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Phân tích Review</span>
                </button>

                <a
                  href={place.googleMapsUri}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 px-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold flex items-center justify-center gap-1 border border-stone-700 transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5 text-red-400" />
                  <span>Google Maps</span>
                  <ExternalLink className="w-3 h-3 opacity-70" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {filteredPlaces.length === 0 && (
        <div className="py-16 text-center text-stone-500 bg-stone-900/40 rounded-2xl border border-dashed border-stone-800">
          <Utensils className="w-12 h-12 mx-auto text-stone-700 mb-2" />
          <p className="text-sm font-medium text-stone-400">Không có địa điểm nào phù hợp bộ lọc</p>
          <p className="text-xs text-stone-500 mt-1">Hãy thử nới lỏng bán kính hoặc chọn tất cả phân loại</p>
        </div>
      )}

      {/* ==========================================
          MODAL 1: AI REVIEW SYNTHESIS MODAL
          ========================================== */}
      {analyzingPlace && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-stone-900 border border-stone-700 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-5 shadow-2xl max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-start justify-between gap-3 border-b border-stone-800 pb-4">
              <div>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {analyzingPlace.categoryLabel}
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-100 mt-1">
                  {analyzingPlace.name}
                </h3>
                <div className="flex items-center gap-2 text-xs text-stone-400 mt-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="text-amber-200 font-bold">{analyzingPlace.rating}/5</span>
                  <span>({analyzingPlace.userRatingCount} lượt đánh giá trên Google)</span>
                </div>
              </div>

              <button
                onClick={() => { setAnalyzingPlace(null); setReviewSummary(null); }}
                className="text-stone-400 hover:text-stone-100 p-1.5 rounded-lg bg-stone-800"
              >
                ✕
              </button>
            </div>

            {reviewLoading ? (
              <div className="py-12 text-center space-y-3">
                <RefreshCw className="w-8 h-8 text-amber-400 animate-spin mx-auto" />
                <p className="text-sm text-amber-200 font-medium">AI đang phân tích và tổng hợp các chủ đề review...</p>
                <p className="text-xs text-stone-500">Đồ ăn • Không gian • Phục vụ • Mức giá • Điểm lưu ý</p>
              </div>
            ) : reviewSummary ? (
              <div className="space-y-4">
                
                {/* Notice */}
                <div className="p-3 bg-stone-950 rounded-xl border border-stone-800 text-[11px] text-stone-400 flex items-center gap-2">
                  <Info className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{reviewSummary.dataCoverageNotice || 'Dựa trên phân tích các chủ đề thường gặp từ đánh giá của khách hàng.'}</span>
                </div>

                {/* Topics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {reviewSummary.foodMention && (
                    <div className="p-3 bg-stone-950/60 rounded-xl border border-stone-800">
                      <span className="text-amber-400 font-semibold block mb-1">🍜 Đồ ăn & Thức uống:</span>
                      <p className="text-stone-300">{reviewSummary.foodMention}</p>
                    </div>
                  )}
                  {reviewSummary.ambianceMention && (
                    <div className="p-3 bg-stone-950/60 rounded-xl border border-stone-800">
                      <span className="text-amber-400 font-semibold block mb-1">🏡 Không gian quán:</span>
                      <p className="text-stone-300">{reviewSummary.ambianceMention}</p>
                    </div>
                  )}
                  {reviewSummary.serviceMention && (
                    <div className="p-3 bg-stone-950/60 rounded-xl border border-stone-800">
                      <span className="text-amber-400 font-semibold block mb-1">👨‍🍳 Phục vụ & Nhân viên:</span>
                      <p className="text-stone-300">{reviewSummary.serviceMention}</p>
                    </div>
                  )}
                  {reviewSummary.pricingMention && (
                    <div className="p-3 bg-stone-950/60 rounded-xl border border-stone-800">
                      <span className="text-amber-400 font-semibold block mb-1">💵 Mức giá & Độ tương xứng:</span>
                      <p className="text-stone-300">{reviewSummary.pricingMention}</p>
                    </div>
                  )}
                </div>

                {/* Positive Highlights */}
                {reviewSummary.positiveHighlights && reviewSummary.positiveHighlights.length > 0 && (
                  <div className="p-4 bg-emerald-950/30 border border-emerald-500/30 rounded-2xl">
                    <h4 className="text-xs font-bold text-emerald-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <ThumbsUp className="w-4 h-4 text-emerald-400" />
                      <span>Điểm được khách hàng đánh giá cao:</span>
                    </h4>
                    <ul className="space-y-1">
                      {reviewSummary.positiveHighlights.map((pos, idx) => (
                        <li key={idx} className="text-xs text-stone-200 flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{pos}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Considerations */}
                {reviewSummary.considerations && reviewSummary.considerations.length > 0 && (
                  <div className="p-4 bg-amber-950/30 border border-amber-500/30 rounded-2xl">
                    <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-amber-400" />
                      <span>Điểm khách hàng cần lưu ý / cân nhắc:</span>
                    </h4>
                    <ul className="space-y-1">
                      {reviewSummary.considerations.map((con, idx) => (
                        <li key={idx} className="text-xs text-stone-200 flex items-start gap-2">
                          <span className="text-amber-400 font-bold">•</span>
                          <span>{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : null}

            <div className="pt-4 border-t border-stone-800 flex justify-end gap-2">
              <a
                href={analyzingPlace.googleMapsUri}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-stone-950 font-bold text-xs rounded-xl flex items-center gap-1.5"
              >
                <span>Xem trên Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

          </div>
        </div>
      )}

      {/* ==========================================
          MODAL 2: "PHÙ HỢP VỚI TÔI" RESULTS MODAL
          ========================================== */}
      {showMatchModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-stone-900 border border-stone-700 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-5 shadow-2xl max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-start justify-between gap-3 border-b border-stone-800 pb-4">
              <div>
                <h3 className="text-xl font-serif font-bold text-amber-100 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                  <span>Kết Quả Đề Xuất Phù Hợp Cá Nhân</span>
                </h3>
                <p className="text-xs text-stone-400 mt-1">
                  Theo yêu cầu: <strong className="text-amber-300">"{matchPrompt}"</strong>
                </p>
              </div>

              <button
                onClick={() => setShowMatchModal(false)}
                className="text-stone-400 hover:text-stone-100 p-1.5 rounded-lg bg-stone-800"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              {matchResults.map((res, idx) => (
                <div key={idx} className="p-4 bg-stone-950 rounded-2xl border border-stone-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-serif font-bold text-stone-100 text-sm">{res.placeName}</h4>
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      Độ phù hợp: {res.fitScore}%
                    </span>
                  </div>
                  <p className="text-xs text-stone-300 leading-relaxed italic">
                    "{res.reasoning}"
                  </p>
                  {res.highlightsForUser && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {res.highlightsForUser.map((h, i) => (
                        <span key={i} className="text-[10px] px-2 py-0.5 bg-stone-900 text-amber-200 rounded border border-stone-800">
                          ✓ {h}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-stone-800 flex justify-end">
              <button
                onClick={() => setShowMatchModal(false)}
                className="px-4 py-2 bg-stone-800 text-stone-200 text-xs rounded-xl font-medium"
              >
                Đóng
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ==========================================
          MODAL 3: PLACE COMPARISON (SIDE-BY-SIDE)
          ========================================== */}
      {showCompareModal && selectedForCompare.length > 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-stone-900 border border-stone-700 rounded-3xl max-w-4xl w-full p-6 sm:p-8 space-y-5 shadow-2xl max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-start justify-between gap-3 border-b border-stone-800 pb-4">
              <div>
                <h3 className="text-xl font-serif font-bold text-stone-100 flex items-center gap-2">
                  <Scale className="w-5 h-5 text-amber-400" />
                  <span>So Sánh Địa Điểm ({selectedForCompare.length}/3)</span>
                </h3>
                <p className="text-xs text-stone-400 mt-0.5">Đặt các địa điểm cạnh nhau để lựa chọn trải nghiệm phù hợp nhất</p>
              </div>

              <button
                onClick={() => setShowCompareModal(false)}
                className="text-stone-400 hover:text-stone-100 p-1.5 rounded-lg bg-stone-800"
              >
                ✕
              </button>
            </div>

            {/* Side-by-side Table / Cards */}
            <div className={`grid grid-cols-1 sm:grid-cols-${selectedForCompare.length} gap-4`}>
              {selectedForCompare.map((place) => (
                <div key={place.id} className="bg-stone-950 p-4 rounded-2xl border border-stone-800 space-y-3 flex flex-col justify-between">
                  <div>
                    <img src={place.photoUrl} alt={place.name} className="w-full h-32 object-cover rounded-xl mb-2" />
                    <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-semibold">
                      {place.categoryLabel}
                    </span>
                    <h4 className="font-serif font-bold text-stone-100 text-sm mt-1">{place.name}</h4>
                    
                    <div className="mt-3 space-y-2 text-xs divide-y divide-stone-900">
                      <div className="flex justify-between pt-1">
                        <span className="text-stone-500">Đánh giá:</span>
                        <span className="text-amber-300 font-bold">{place.rating}★ ({place.userRatingCount})</span>
                      </div>
                      <div className="flex justify-between pt-1">
                        <span className="text-stone-500">Mức giá:</span>
                        <span className="text-stone-200">{place.priceText}</span>
                      </div>
                      <div className="flex justify-between pt-1">
                        <span className="text-stone-500">Khoảng cách:</span>
                        <span className="text-stone-200">{place.distanceKm} km</span>
                      </div>
                      <div className="flex justify-between pt-1">
                        <span className="text-stone-500">Mở cửa:</span>
                        <span className="text-emerald-400">{place.openingHoursText}</span>
                      </div>
                    </div>
                  </div>

                  <a
                    href={place.googleMapsUri}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-xl text-xs font-semibold text-center flex items-center justify-center gap-1"
                  >
                    <span>Mở chỉ đường</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-stone-800 flex justify-end">
              <button
                onClick={() => setShowCompareModal(false)}
                className="px-4 py-2 bg-stone-800 text-stone-200 text-xs rounded-xl font-medium"
              >
                Đóng
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
