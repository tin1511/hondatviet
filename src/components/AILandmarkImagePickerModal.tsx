import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Search, 
  X, 
  Check, 
  Image as ImageIcon, 
  MapPin, 
  ExternalLink, 
  Loader2, 
  Filter,
  Camera,
  Eye,
  Compass,
  Zap,
  Globe
} from 'lucide-react';
import { aiService } from '../services/aiService';
import { VIETNAM_LANDMARK_PHOTOS, LandmarkPhotoItem } from '../data/landmarkImagesDatabase';

interface AILandmarkImagePickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
  initialCityName?: string;
  initialLandmarkName?: string;
  onSelectPhoto: (photo: LandmarkPhotoItem, autoFillInfo?: boolean) => void;
}

const QUICK_FILTER_TAGS = [
  { label: '🌟 Tất cả nổi bật', query: '' },
  { label: '🏛️ Hà Nội', query: 'Hà Nội' },
  { label: '🏮 Hội An & Đà Nẵng', query: 'Đà Nẵng Hội An' },
  { label: '👑 Cung Đình Huế', query: 'Huế' },
  { label: '🏙️ TP. Hồ Chí Minh', query: 'Hồ Chí Minh' },
  { label: '🌊 Vịnh Hạ Long', query: 'Hạ Long' },
  { label: '⛰️ Ninh Bình Tràng An', query: 'Ninh Bình' },
  { label: '🏔️ Sa Pa & Fansipan', query: 'Sa Pa' },
  { label: '🏝️ Phú Quốc', query: 'Phú Quốc' },
  { label: '💦 Thác Bản Giốc', query: 'Bản Giốc' },
  { label: '🌲 Đà Lạt sương mù', query: 'Đà Lạt' },
  { label: '🛶 Chợ Nổi Cần Thơ', query: 'Cần Thơ' }
];

export const AILandmarkImagePickerModal: React.FC<AILandmarkImagePickerModalProps> = ({
  isOpen,
  onClose,
  initialQuery = '',
  initialCityName = '',
  initialLandmarkName = '',
  onSelectPhoto
}) => {
  const [searchQuery, setSearchQuery] = useState(initialQuery || initialLandmarkName || initialCityName || '');
  const [selectedTag, setSelectedTag] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isGeminiGoogleSearching, setIsGeminiGoogleSearching] = useState(false);
  const [photos, setPhotos] = useState<LandmarkPhotoItem[]>(VIETNAM_LANDMARK_PHOTOS);
  const [aiSuggestions, setAiSuggestions] = useState<any[]>([]);
  const [previewPhoto, setPreviewPhoto] = useState<LandmarkPhotoItem | null>(null);
  const [selectedPhotoId, setSelectedPhotoId] = useState<string | null>(null);
  const [autoFillDetails, setAutoFillDetails] = useState(true);
  const [googleSearchNotice, setGoogleSearchNotice] = useState<string | null>(null);

  // Initialize search on open
  useEffect(() => {
    if (isOpen) {
      const initialTerm = initialLandmarkName || initialCityName || initialQuery || '';
      setSearchQuery(initialTerm);
      handleSearch(initialTerm);
    }
  }, [isOpen, initialQuery, initialCityName, initialLandmarkName]);

  const handleGeminiGoogleSearch = async () => {
    const term = searchQuery.trim() || initialLandmarkName || initialCityName || 'Việt Nam';
    setIsGeminiGoogleSearching(true);
    setGoogleSearchNotice(null);

    try {
      const res = await aiService.findLandmarkImageWithGoogle({
        landmarkName: term,
        cityName: initialCityName,
        province: initialCityName
      });

      if (res && res.candidateImages && res.candidateImages.length > 0) {
        const newGooglePhotos: LandmarkPhotoItem[] = res.candidateImages.map((img, idx) => ({
          id: `gemini-google-${Date.now()}-${idx}`,
          title: img.title || `${res.landmarkName} (Google Search)`,
          cityName: res.cityName,
          province: res.province || res.cityName,
          landmarkName: res.landmarkName,
          tagline: res.tagline,
          imageUrl: img.url,
          thumbUrl: img.url,
          lat: res.lat,
          lng: res.lng,
          tags: ['google-search', 'gemini-ai', res.cityName.toLowerCase(), res.landmarkName.toLowerCase()],
          photographer: img.photographer || 'Google Search Grounding',
          source: img.source || 'Google Search',
          verified: true
        }));

        setPhotos(prev => [...newGooglePhotos, ...prev.filter(p => !p.id.startsWith('gemini-google-'))]);
        setGoogleSearchNotice(`✨ Gemini đã tra cứu Google và tìm thấy ${newGooglePhotos.length} ảnh trực tiếp cho "${res.landmarkName}"!`);
      }
    } catch (err: any) {
      console.warn('Gemini Google Search error:', err);
    } finally {
      setIsGeminiGoogleSearching(false);
    }
  };

  const handleSearch = async (term: string) => {
    setIsSearching(true);
    setGoogleSearchNotice(null);
    try {
      const result = await aiService.searchLandmarkImages({
        query: term,
        cityName: initialCityName,
        landmarkName: initialLandmarkName
      });

      if (result.photos && result.photos.length > 0) {
        setPhotos(result.photos);
      } else {
        // Fallback filter locally
        const termLower = term.trim().toLowerCase();
        const filtered = VIETNAM_LANDMARK_PHOTOS.filter(p => 
          !termLower ||
          p.title.toLowerCase().includes(termLower) ||
          p.cityName.toLowerCase().includes(termLower) ||
          p.landmarkName.toLowerCase().includes(termLower) ||
          p.tags.some(t => t.toLowerCase().includes(termLower))
        );
        setPhotos(filtered.length > 0 ? filtered : VIETNAM_LANDMARK_PHOTOS);
      }

      setAiSuggestions(result.aiSuggestions || []);
    } catch (err) {
      console.warn('Search error:', err);
      setPhotos(VIETNAM_LANDMARK_PHOTOS);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelectTag = (tagQuery: string) => {
    setSelectedTag(tagQuery);
    setSearchQuery(tagQuery);
    handleSearch(tagQuery);
  };

  const handleSubmitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(searchQuery);
  };

  const handleChoosePhoto = (photo: LandmarkPhotoItem) => {
    setSelectedPhotoId(photo.id);
    onSelectPhoto(photo, autoFillDetails);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-stone-900 border border-amber-900/50 rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-800 flex items-center justify-between bg-stone-950/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-600 to-amber-400 text-stone-950 font-black flex items-center justify-center shadow-lg shadow-amber-500/20">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif font-bold text-stone-100 text-base sm:text-lg">
                  AI Tìm Ảnh Danh Thắng Nổi Tiếng
                </h3>
                <span className="hidden sm:inline-block text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold">
                  Kho ảnh HD Việt Nam
                </span>
              </div>
              <p className="text-xs text-stone-400">
                Tìm kiếm hình ảnh danh lam thắng cảnh 63 tỉnh thành để gắn vào ảnh nền
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-200 hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar & Auto-Fill Option */}
        <div className="p-4 border-b border-stone-800 bg-stone-950/40 space-y-3">
          <form onSubmit={handleSubmitSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Nhập tên địa danh, thành phố, di sản (VD: Cầu Vàng Đà Nẵng, Vịnh Hạ Long, Cố Đô Huế...)"
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-stone-100 text-xs focus:outline-none focus:border-amber-500 placeholder:text-stone-500 transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    handleSearch('');
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-200"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <button
              type="submit"
              disabled={isSearching || isGeminiGoogleSearching}
              className="px-3.5 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold text-xs border border-stone-700 shadow transition-all flex items-center gap-1.5 cursor-pointer shrink-0 disabled:opacity-50"
            >
              {isSearching ? (
                <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
              ) : (
                <Sparkles className="w-4 h-4 text-amber-400" />
              )}
              <span>{isSearching ? 'Đang tìm...' : 'Lọc Kho Ảnh'}</span>
            </button>

            {/* GEMINI GOOGLE SEARCH LIVE BUTTON */}
            <button
              type="button"
              onClick={handleGeminiGoogleSearch}
              disabled={isSearching || isGeminiGoogleSearching}
              className="px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-stone-950 font-black text-xs shadow-md shadow-amber-500/20 transition-all flex items-center gap-1.5 cursor-pointer shrink-0 active:scale-95 disabled:opacity-50"
              title="Nhờ Gemini tìm ảnh thực tế trên Google"
            >
              {isGeminiGoogleSearching ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Globe className="w-4 h-4" />
              )}
              <span>{isGeminiGoogleSearching ? 'Gemini tìm Google...' : '🌐 Gemini Tìm Google'}</span>
            </button>
          </form>

          {/* Google Search Success Notice Banner */}
          {googleSearchNotice && (
            <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2 animate-fadeIn font-medium">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{googleSearchNotice}</span>
            </div>
          )}

          {/* Quick Filter Tag Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
            {QUICK_FILTER_TAGS.map((tag, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectTag(tag.query)}
                className={`px-2.5 py-1 rounded-lg text-[11px] whitespace-nowrap transition-all cursor-pointer border ${
                  searchQuery === tag.query || (tag.query === '' && !searchQuery)
                    ? 'bg-amber-500 text-stone-950 font-bold border-amber-400 shadow-sm'
                    : 'bg-stone-900/90 text-stone-300 border-stone-800 hover:border-stone-700 hover:text-stone-100'
                }`}
              >
                {tag.label}
              </button>
            ))}
          </div>

          {/* Auto fill info checkbox */}
          <div className="flex items-center justify-between pt-1 text-[11px] text-stone-400">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input 
                type="checkbox"
                checked={autoFillDetails}
                onChange={(e) => setAutoFillDetails(e.target.checked)}
                className="w-3.5 h-3.5 rounded bg-stone-900 border-stone-700 text-amber-500 focus:ring-0 focus:ring-offset-0 cursor-pointer"
              />
              <span>Tự động điền Tên thành phố, Danh thắng & Khẩu hiệu phù hợp khi chọn ảnh</span>
            </label>

            <span className="text-[10px] text-amber-400/80">
              Tìm thấy {photos.length} bức ảnh chất lượng cao
            </span>
          </div>
        </div>

        {/* AI Smart Suggestions Box (if available) */}
        {aiSuggestions.length > 0 && (
          <div className="px-4 py-2.5 bg-amber-950/20 border-b border-amber-900/30 flex items-center gap-2 overflow-x-auto">
            <span className="text-[11px] font-bold text-amber-400 flex items-center gap-1 shrink-0">
              <Zap className="w-3 h-3" /> Gợi ý từ AI:
            </span>
            <div className="flex items-center gap-2">
              {aiSuggestions.map((sug, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    setSearchQuery(sug.landmarkName || sug.cityName);
                    handleSearch(sug.landmarkName || sug.cityName);
                  }}
                  className="px-2 py-0.5 rounded-md bg-stone-900 text-stone-200 border border-amber-500/30 text-[10px] hover:border-amber-400 transition-colors whitespace-nowrap"
                >
                  {sug.landmarkName} ({sug.cityName})
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Photo Grid Gallery */}
        <div className="p-4 overflow-y-auto flex-1 max-h-[60vh]">
          {photos.length === 0 ? (
            <div className="py-12 text-center text-stone-400 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-stone-800 text-stone-500 mx-auto flex items-center justify-center">
                <ImageIcon className="w-6 h-6" />
              </div>
              <p className="text-sm font-medium">Không tìm thấy ảnh phù hợp với từ khóa "{searchQuery}"</p>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                Hãy thử tìm kiếm với tên tỉnh/thành phố như "Hà Nội", "Đà Nẵng", "Ninh Bình", "Huế" hoặc chọn từ danh sách mẫu có sẵn.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  handleSearch('');
                }}
                className="px-3.5 py-1.5 rounded-xl bg-stone-800 text-amber-400 text-xs font-semibold hover:bg-stone-700 transition-colors"
              >
                Hiển thị toàn bộ kho ảnh
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {photos.map((photo) => {
                const isSelected = selectedPhotoId === photo.id;
                return (
                  <div
                    key={photo.id}
                    className="group relative rounded-2xl overflow-hidden bg-stone-950 border border-stone-800 hover:border-amber-500/50 transition-all duration-300 flex flex-col shadow-lg hover:shadow-amber-500/10"
                  >
                    {/* Image Preview Thumbnail */}
                    <div className="relative aspect-video overflow-hidden bg-stone-900">
                      <img
                        src={photo.thumbUrl || photo.imageUrl}
                        alt={photo.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80';
                        }}
                      />

                      {/* City Badge */}
                      <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded-lg bg-stone-950/80 backdrop-blur-md text-amber-300 text-[10px] font-bold border border-stone-700/60 shadow-sm">
                        <MapPin className="w-3 h-3 text-amber-400" />
                        <span>{photo.cityName}</span>
                      </div>

                      {/* Quick Preview Fullscreen Button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setPreviewPhoto(photo);
                        }}
                        className="absolute top-2 right-2 p-1.5 rounded-lg bg-stone-950/80 backdrop-blur-md text-stone-300 hover:text-stone-100 hover:bg-stone-800 transition-colors border border-stone-700/60"
                        title="Xem ảnh phóng to"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Content Details */}
                    <div className="p-3 flex-1 flex flex-col justify-between space-y-2">
                      <div>
                        <h4 className="font-bold text-stone-100 text-xs line-clamp-1 group-hover:text-amber-300 transition-colors">
                          {photo.title}
                        </h4>
                        <p className="text-[11px] text-stone-400 line-clamp-2 mt-0.5 leading-relaxed">
                          {photo.tagline}
                        </p>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1">
                        {photo.tags.slice(0, 3).map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="text-[9px] px-1.5 py-0.5 rounded bg-stone-900 text-stone-400 border border-stone-800"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>

                      {/* Action Button: Attach Image */}
                      <div className="pt-2 border-t border-stone-800/80 flex items-center justify-between gap-2">
                        <span className="text-[10px] text-stone-500 truncate">
                          Ảnh bởi: {photo.photographer}
                        </span>

                        <button
                          type="button"
                          onClick={() => handleChoosePhoto(photo)}
                          className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 active:scale-95 text-stone-950 font-bold text-xs flex items-center gap-1.5 shadow-md transition-all cursor-pointer shrink-0"
                        >
                          <Camera className="w-3.5 h-3.5" />
                          <span>Gắn ảnh này</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3.5 border-t border-stone-800 bg-stone-950/80 flex items-center justify-between text-xs text-stone-400">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-amber-400" />
            <span>Hình ảnh được tối ưu chuẩn độ phân giải cao cho giao diện danh thắng Việt Nam</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 font-semibold text-xs transition-colors cursor-pointer"
          >
            Đóng
          </button>
        </div>

      </div>

      {/* Large Image Preview Modal */}
      {previewPhoto && (
        <div 
          className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/95 backdrop-blur-lg animate-in fade-in"
          onClick={() => setPreviewPhoto(null)}
        >
          <div 
            className="relative max-w-4xl w-full max-h-[90vh] bg-stone-900 border border-stone-700 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative flex-1 max-h-[70vh] bg-stone-950 overflow-hidden flex items-center justify-center">
              <img 
                src={previewPhoto.imageUrl} 
                alt={previewPhoto.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain max-h-[70vh]"
              />
              <button
                type="button"
                onClick={() => setPreviewPhoto(null)}
                className="absolute top-3 right-3 p-2 rounded-full bg-black/60 text-stone-200 hover:bg-black/90 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 bg-stone-950 border-t border-stone-800 flex items-center justify-between gap-4">
              <div>
                <span className="text-xs text-amber-400 font-bold">{previewPhoto.cityName}</span>
                <h4 className="text-sm font-bold text-stone-100">{previewPhoto.title}</h4>
                <p className="text-xs text-stone-400">{previewPhoto.tagline}</p>
              </div>

              <button
                type="button"
                onClick={() => {
                  handleChoosePhoto(previewPhoto);
                  setPreviewPhoto(null);
                }}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center gap-1.5 shadow-lg shrink-0 cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>Gắn làm ảnh nền</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
