import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  MapPin, 
  Sparkles, 
  Utensils, 
  Trash2, 
  CalendarDays, 
  Mic, 
  Compass, 
  ExternalLink, 
  Share2,
  Bookmark
} from 'lucide-react';
import { storageService } from '../services/storageService';
import { HeritageItem, ItineraryPlan, FamilyStoryMemory } from '../types';
import { getSafeHeritageImageUrl, handleImageError } from '../utils/imageUtils';

interface FavoritesViewProps {
  onNavigateToStory: (name: string, history?: string, period?: string) => void;
  onNavigateToFood: (heritageId: string) => void;
  onNavigateToMap: () => void;
  onNavigateToTab: (tab: string) => void;
  onSelectHeritage?: (heritage: HeritageItem) => void;
}

export const FavoritesView: React.FC<FavoritesViewProps> = ({
  onNavigateToStory,
  onNavigateToFood,
  onNavigateToMap,
  onNavigateToTab,
  onSelectHeritage
}) => {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [savedItineraries, setSavedItineraries] = useState<ItineraryPlan[]>([]);
  const [savedStories, setSavedStories] = useState<FamilyStoryMemory[]>([]);
  const [activeSection, setActiveSection] = useState<'heritages' | 'itineraries' | 'stories'>('heritages');

  useEffect(() => {
    setFavoriteIds(storageService.getFavorites());
    setSavedItineraries(storageService.getSavedItineraries());
    setSavedStories(storageService.getFamilyStories());
  }, []);

  const allHeritages = storageService.getHeritages();
  const favoriteHeritages = allHeritages.filter(h => favoriteIds.includes(h.id));

  const handleRemoveFavorite = (id: string, name: string) => {
    storageService.toggleFavorite(id, name);
    setFavoriteIds(storageService.getFavorites());
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      
      {/* Header */}
      <div className="border-b border-stone-800 pb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <Bookmark className="w-4 h-4" />
              <span>Bộ sưu tập cá nhân</span>
            </div>
            <h1 className="font-serif font-bold text-2xl sm:text-3xl text-stone-100">
              Nội Dung Đã Lưu Trữ
            </h1>
            <p className="text-xs sm:text-sm text-stone-400 mt-1 max-w-2xl">
              Danh sách các di sản yêu thích, lịch trình văn hóa và bản ghi âm ký ức gia đình được lưu giữ an toàn trên thiết bị của bạn.
            </p>
          </div>

          {/* Tab Filter */}
          <div className="flex bg-stone-900 border border-stone-800 p-1 rounded-2xl gap-1">
            <button
              onClick={() => setActiveSection('heritages')}
              className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
                activeSection === 'heritages'
                  ? 'bg-amber-500 text-stone-950 shadow-md'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <Heart className="w-3.5 h-3.5 fill-current" />
              <span>Di Sản ({favoriteHeritages.length})</span>
            </button>

            <button
              onClick={() => setActiveSection('itineraries')}
              className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
                activeSection === 'itineraries'
                  ? 'bg-amber-500 text-stone-950 shadow-md'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <CalendarDays className="w-3.5 h-3.5" />
              <span>Lịch Trình ({savedItineraries.length})</span>
            </button>

            <button
              onClick={() => setActiveSection('stories')}
              className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
                activeSection === 'stories'
                  ? 'bg-amber-500 text-stone-950 shadow-md'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <Mic className="w-3.5 h-3.5" />
              <span>Ký Ức ({savedStories.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* SECTION 1: FAVORITE HERITAGES */}
      {activeSection === 'heritages' && (
        <div>
          {favoriteHeritages.length === 0 ? (
            <div className="text-center py-16 bg-stone-900/60 rounded-3xl border border-dashed border-stone-800 p-6">
              <Heart className="w-12 h-12 text-stone-700 mx-auto mb-3" />
              <h3 className="font-serif font-bold text-stone-300 text-lg">Chưa có di sản nào được lưu</h3>
              <p className="text-xs text-stone-500 max-w-md mx-auto mt-1 mb-5">
                Bấm vào biểu tượng trái tim trên các thẻ di sản hoặc bản đồ để lưu lại các địa danh bạn muốn ghé thăm.
              </p>
              <button
                onClick={onNavigateToMap}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-lg inline-flex items-center gap-2"
              >
                <Compass className="w-4 h-4" />
                <span>Khám Phá Bản Đồ Di Sản</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoriteHeritages.map((heritage) => (
                <div 
                  key={heritage.id}
                  className="bg-stone-900 border border-stone-800 hover:border-amber-500/40 rounded-3xl overflow-hidden shadow-xl flex flex-col transition-all group"
                >
                  <div 
                    onClick={() => onSelectHeritage?.(heritage)}
                    className="relative h-48 sm:h-52 overflow-hidden cursor-pointer"
                  >
                    <img
                      src={getSafeHeritageImageUrl(heritage.imageUrl, heritage.id)}
                      alt={heritage.name}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      onError={(e) => handleImageError(e)}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent"></div>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveFavorite(heritage.id, heritage.name);
                      }}
                      className="absolute top-3 right-3 p-2 rounded-full bg-black/60 backdrop-blur-md text-red-400 hover:bg-red-950 hover:text-red-300 border border-red-500/30 transition-colors cursor-pointer z-10"
                      title="Bỏ lưu di sản này"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <div className="absolute bottom-3 left-4 right-4">
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-500/90 text-stone-950">
                        {heritage.categoryLabel}
                      </span>
                      <h3 className="font-serif font-bold text-lg text-stone-100 mt-1 truncate group-hover:text-amber-300 transition-colors">
                        {heritage.name}
                      </h3>
                      <p className="text-xs text-stone-300 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-red-400" />
                        <span>{heritage.province}</span>
                        <span className="text-stone-500">•</span>
                        <span>{heritage.period}</span>
                      </p>
                    </div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
                    <p className="text-xs text-stone-400 line-clamp-2 leading-relaxed">
                      {heritage.history}
                    </p>

                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-stone-800/80">
                      <button
                        onClick={() => onNavigateToStory(heritage.name, heritage.history, heritage.period)}
                        className="py-2 px-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Nghe Kể Chuyện</span>
                      </button>

                      <button
                        onClick={() => onNavigateToFood(heritage.id)}
                        className="py-2 px-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <Utensils className="w-3.5 h-3.5 text-orange-400" />
                        <span>Ăn Uống Lân Cận</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* SECTION 2: SAVED ITINERARIES */}
      {activeSection === 'itineraries' && (
        <div>
          {savedItineraries.length === 0 ? (
            <div className="text-center py-16 bg-stone-900/60 rounded-3xl border border-dashed border-stone-800 p-6">
              <CalendarDays className="w-12 h-12 text-stone-700 mx-auto mb-3" />
              <h3 className="font-serif font-bold text-stone-300 text-lg">Chưa có lịch trình nào được lưu</h3>
              <p className="text-xs text-stone-500 max-w-md mx-auto mt-1 mb-5">
                Hãy sử dụng tính năng "Lập Lịch Trình AI" để tạo kế hoạch du lịch văn hóa theo sở thích và ngân sách của bạn.
              </p>
              <button
                onClick={() => onNavigateToTab('itinerary')}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-lg inline-flex items-center gap-2"
              >
                <CalendarDays className="w-4 h-4" />
                <span>Tạo Lịch Trình Ngay</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {savedItineraries.map((itin) => (
                <div
                  key={itin.id}
                  className="bg-stone-900 border border-stone-800 rounded-3xl p-5 space-y-4 shadow-xl"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        {itin.destination} • {itin.duration} • {itin.vibe}
                      </span>
                      <h3 className="font-serif font-bold text-lg text-stone-100 mt-2">
                        {itin.title}
                      </h3>
                      <p className="text-xs text-stone-400 mt-0.5">{itin.routeSummary}</p>
                    </div>
                  </div>

                  <div className="bg-stone-950/60 p-3 rounded-2xl border border-stone-800 space-y-2">
                    <p className="text-xs font-semibold text-stone-300">Điểm dừng chân nổi bật:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {(itin.slots || []).slice(0, 5).map((slot, idx) => (
                        <span key={idx} className="text-[11px] px-2 py-0.5 bg-stone-900 text-stone-300 rounded-lg border border-stone-800">
                          {slot.locationName || slot.title}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-stone-800 text-xs">
                    <span className="text-amber-400 font-semibold">{itin.slots?.length || 0} điểm dừng chân</span>
                    <button
                      onClick={() => onNavigateToTab('itinerary')}
                      className="px-4 py-1.5 rounded-xl bg-amber-500 text-stone-950 font-bold hover:bg-amber-400 transition-colors"
                    >
                      Xem Chi Tiết Lịch Trình
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* SECTION 3: GRANDPARENT MEMORIES */}
      {activeSection === 'stories' && (
        <div>
          {savedStories.length === 0 ? (
            <div className="text-center py-16 bg-stone-900/60 rounded-3xl border border-dashed border-stone-800 p-6">
              <Mic className="w-12 h-12 text-stone-700 mx-auto mb-3" />
              <h3 className="font-serif font-bold text-stone-300 text-lg">Chưa có bản ghi ký ức nào</h3>
              <p className="text-xs text-stone-500 max-w-md mx-auto mt-1 mb-5">
                Hãy ghi âm hoặc chép lại lời kể của ông bà, cha mẹ để AI giúp bạn biên tập thành câu chuyện lịch sử gia đình.
              </p>
              <button
                onClick={() => onNavigateToTab('grandparents')}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-lg inline-flex items-center gap-2"
              >
                <Mic className="w-4 h-4" />
                <span>Ghi Âm Lời Kể Ông Bà</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {savedStories.map((story) => (
                <div
                  key={story.id}
                  className="bg-stone-900 border border-stone-800 rounded-3xl p-5 space-y-3 shadow-xl"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 font-semibold">
                      {story.timePeriod || 'Ký ức'} • {story.location || 'Việt Nam'}
                    </span>
                    <span className="text-[10px] text-stone-500">
                      {new Date(story.createdAt).toLocaleDateString('vi-VN')}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-lg text-stone-100">
                    {story.topic}
                  </h3>

                  <p className="text-xs text-stone-400">
                    Người kể: <strong className="text-stone-200">{story.tellerName}</strong> {story.tellerBirthYear ? `(Sinh năm ${story.tellerBirthYear})` : ''}
                  </p>

                  <p className="text-xs text-stone-300 line-clamp-3 leading-relaxed font-serif bg-stone-950/60 p-3 rounded-2xl border border-stone-800/80">
                    "{story.storyContent}"
                  </p>

                  <div className="flex justify-end pt-2">
                    <button
                      onClick={() => onNavigateToTab('grandparents')}
                      className="text-xs text-amber-400 hover:underline flex items-center gap-1"
                    >
                      <span>Mở trong phòng ký ức</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
};
