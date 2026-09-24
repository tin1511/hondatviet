import React, { useState, useEffect, useMemo } from 'react';
import { 
  X, 
  Save, 
  Trash2, 
  Image, 
  MapPin, 
  Sparkles, 
  Navigation, 
  CheckCircle2, 
  Search, 
  Camera, 
  Check, 
  ArrowRight, 
  Wand2,
  Globe,
  Loader2,
  ExternalLink,
  Zap,
  Info
} from 'lucide-react';
import { CityLandmarkBackground } from '../types';
import { storageService } from '../services/storageService';
import { aiService } from '../services/aiService';
import { AILandmarkImagePickerModal } from './AILandmarkImagePickerModal';
import { LandmarkPhotoItem, VIETNAM_LANDMARK_PHOTOS, findMatchingLandmarkPhotos } from '../data/landmarkImagesDatabase';

interface LandmarkEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  landmark: CityLandmarkBackground | null;
  onSave: (savedLandmark: CityLandmarkBackground) => void;
  onDelete?: (landmarkId: string) => void;
}

const SAMPLE_LANDMARK_IMAGES = [
  { name: 'Thủ đô Hà Nội', url: 'https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?auto=format&fit=crop&w=2000&q=85' },
  { name: 'TP. Hồ Chí Minh', url: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=2000&q=85' },
  { name: 'Cố đô Huế', url: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=2000&q=85' },
  { name: 'Đà Nẵng', url: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=2000&q=85' },
  { name: 'Mỹ Sơn / Chăm', url: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=2000&q=85' },
  { name: 'Hội An', url: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=2000&q=85' },
  { name: 'Ninh Bình', url: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=2000&q=85' },
  { name: 'Phú Quốc / Biển', url: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=2000&q=85' },
];

export const LandmarkEditModal: React.FC<LandmarkEditModalProps> = ({
  isOpen,
  onClose,
  landmark,
  onSave,
  onDelete
}) => {
  const [formData, setFormData] = useState<Partial<CityLandmarkBackground>>({
    id: '',
    cityName: '',
    province: '',
    landmarkName: '',
    tagline: '',
    imageUrl: '',
    lat: 16.0544,
    lng: 108.2022
  });

  const [isLocating, setIsLocating] = useState(false);
  const [isGeminiSearching, setIsGeminiSearching] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isAIPickerOpen, setIsAIPickerOpen] = useState(false);
  const [autoMatchFeedback, setAutoMatchFeedback] = useState<string | null>(null);
  const [geminiSearchResult, setGeminiSearchResult] = useState<{
    bestImageUrl: string;
    landmarkName: string;
    cityName: string;
    province: string;
    tagline: string;
    lat: number;
    lng: number;
    searchSummary: string;
    candidateImages: { url: string; title: string; source: string; photographer?: string }[];
  } | null>(null);

  // Automatically find matching photos whenever landmarkName or cityName changes
  const autoMatchedPhotos = useMemo(() => {
    return findMatchingLandmarkPhotos(formData.landmarkName || '', formData.cityName || '', 8);
  }, [formData.landmarkName, formData.cityName]);

  // Main Gemini Google Image Discovery & Auto-attach handler
  const handleGeminiSearchGoogleAndAttach = async () => {
    const queryLandmark = (formData.landmarkName || formData.cityName || '').trim();
    if (!queryLandmark) {
      setErrorMessage('Vui lòng nhập Tên Danh Thắng hoặc Tên Thành Phố để Gemini tìm ảnh trên Google.');
      return;
    }

    setIsGeminiSearching(true);
    setErrorMessage(null);
    setAutoMatchFeedback(null);

    try {
      const result = await aiService.findLandmarkImageWithGoogle({
        landmarkName: queryLandmark,
        cityName: formData.cityName || '',
        province: formData.province || ''
      });

      if (result && result.bestImageUrl) {
        setGeminiSearchResult(result);
        setFormData(prev => ({
          ...prev,
          imageUrl: result.bestImageUrl,
          landmarkName: prev.landmarkName ? prev.landmarkName : result.landmarkName,
          cityName: prev.cityName ? prev.cityName : result.cityName,
          province: prev.province ? prev.province : (result.province || result.cityName),
          tagline: prev.tagline ? prev.tagline : result.tagline,
          lat: result.lat && (!prev.lat || prev.lat === 16.0544) ? result.lat : prev.lat,
          lng: result.lng && (!prev.lng || prev.lng === 108.2022) ? result.lng : prev.lng,
        }));
        setAutoMatchFeedback(`✨ Gemini đã tra cứu Google và tự động gắn link ảnh cho "${queryLandmark}"!`);
        setTimeout(() => setAutoMatchFeedback(null), 5000);
      } else {
        setErrorMessage('Gemini không tìm thấy ảnh phù hợp trên Google.');
      }
    } catch (err: any) {
      console.error('Gemini image search error:', err);
      // If error occurs, fallback to best matching photo in database
      if (autoMatchedPhotos.length > 0) {
        const best = autoMatchedPhotos[0];
        setFormData(prev => ({ ...prev, imageUrl: best.imageUrl }));
        setAutoMatchFeedback(`Đã gắn ảnh phù hợp nhất từ kho di sản.`);
      } else {
        setErrorMessage(err.message || 'Lỗi khi Gemini tra cứu ảnh trên Google.');
      }
    } finally {
      setIsGeminiSearching(false);
    }
  };

  // Handler to auto-match and attach the single best photo
  const handleAutoAttachBestPhoto = () => {
    if (autoMatchedPhotos.length > 0) {
      const best = autoMatchedPhotos[0];
      setFormData(prev => ({
        ...prev,
        imageUrl: best.imageUrl,
        tagline: prev.tagline ? prev.tagline : best.tagline,
        lat: prev.lat && prev.lat !== 16.0544 ? prev.lat : best.lat,
        lng: prev.lng && prev.lng !== 108.2022 ? prev.lng : best.lng,
      }));
      setAutoMatchFeedback(`Đã gắn ảnh "${best.title}" thành công!`);
      setTimeout(() => setAutoMatchFeedback(null), 3000);
    } else {
      handleGeminiSearchGoogleAndAttach();
    }
  };

  useEffect(() => {
    if (landmark) {
      setFormData(landmark);
    } else {
      setFormData({
        id: `landmark-${Date.now()}`,
        cityName: '',
        province: '',
        landmarkName: '',
        tagline: '',
        imageUrl: 'https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?auto=format&fit=crop&w=2000&q=85',
        lat: 16.0544,
        lng: 108.2022
      });
    }
    setErrorMessage(null);
  }, [landmark, isOpen]);

  if (!isOpen) return null;

  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      setErrorMessage('Trình duyệt không hỗ trợ định vị GPS.');
      return;
    }
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setFormData(prev => ({
          ...prev,
          lat: Math.round(pos.coords.latitude * 10000) / 10000,
          lng: Math.round(pos.coords.longitude * 10000) / 10000,
        }));
        setIsLocating(false);
      },
      (err) => {
        setErrorMessage('Không thể lấy vị trí GPS: ' + err.message);
        setIsLocating(false);
      },
      { timeout: 10000 }
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.cityName?.trim() || !formData.landmarkName?.trim() || !formData.imageUrl?.trim()) {
      setErrorMessage('Vui lòng nhập đầy đủ Tên thành phố, Tên danh thắng và URL hình ảnh.');
      return;
    }

    const savedItem: CityLandmarkBackground = {
      id: formData.id || `landmark-${Date.now()}`,
      cityName: formData.cityName.trim(),
      province: (formData.province || formData.cityName).trim(),
      landmarkName: formData.landmarkName.trim(),
      tagline: (formData.tagline || '').trim(),
      imageUrl: formData.imageUrl.trim(),
      lat: Number(formData.lat) || 16.0544,
      lng: Number(formData.lng) || 108.2022,
    };

    const updatedList = storageService.saveLandmarkBackground(savedItem);
    onSave(savedItem);
    onClose();
  };

  const handleDelete = () => {
    if (!landmark?.id) return;
    if (window.confirm(`Bạn có chắc chắn muốn xóa ảnh nền danh thắng "${landmark.landmarkName}"?`)) {
      storageService.deleteLandmarkBackground(landmark.id);
      if (onDelete) onDelete(landmark.id);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-2 sm:p-4 pt-2 sm:pt-4 bg-black/85 backdrop-blur-md overflow-hidden animate-in fade-in duration-200">
      <div className="bg-stone-900 border border-stone-800 rounded-3xl max-w-xl w-full max-h-[96vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="p-5 border-b border-stone-800 flex items-center justify-between bg-stone-950/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center shadow-lg">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-stone-100 text-lg">
                {landmark ? 'Chỉnh Sửa Ảnh Nền Danh Thắng' : 'Thêm Ảnh Nền Danh Thắng Mới'}
              </h3>
              <p className="text-xs text-stone-400">
                Chỉnh sửa hoặc cập nhật ảnh nền trang web và tọa độ GPS định vị (Dành cho Admin)
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

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 overflow-y-auto space-y-4 max-h-[70vh]">
          {errorMessage && (
            <div className="p-3.5 rounded-2xl bg-red-950/80 border border-red-500/40 text-red-300 text-xs font-medium">
              {errorMessage}
            </div>
          )}

          {/* Preview Image Card */}
          <div className="relative h-36 rounded-2xl overflow-hidden border border-amber-500/40 shadow-inner group bg-stone-950">
            <img 
              src={formData.imageUrl} 
              alt="Preview"
              referrerPolicy="no-referrer"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80';
              }}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-transparent p-3 flex flex-col justify-end">
              <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400">
                {formData.cityName || 'Tên Tỉnh / Thành Phố'}
              </span>
              <h4 className="text-sm font-bold text-stone-100 truncate">
                {formData.landmarkName || 'Tên Địa Danh Danh Thắng'}
              </h4>
              <p className="text-xs text-stone-300 truncate font-light">
                {formData.tagline || 'Khẩu hiệu / Giới thiệu ngắn về cảnh đẹp...'}
              </p>
            </div>
          </div>

          {/* City Name & Province */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1">
                Tên Tỉnh / Thành Phố <span className="text-amber-400">*</span>
              </label>
              <input
                type="text"
                value={formData.cityName || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, cityName: e.target.value, province: e.target.value }))}
                placeholder="VD: Đà Nẵng, Hà Nội, Cần Thơ..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-100 text-xs focus:outline-none focus:border-amber-500 transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1">
                Tỉnh/Thành (để lọc GPS)
              </label>
              <input
                type="text"
                value={formData.province || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, province: e.target.value }))}
                placeholder="VD: Quảng Nam, Thừa Thiên Huế..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-100 text-xs focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>
          </div>

          {/* Landmark Name */}
          <div className="space-y-2 p-3.5 rounded-2xl bg-gradient-to-b from-stone-900/90 to-stone-950/90 border border-amber-900/40 shadow-inner">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <label className="block text-xs font-bold text-amber-200 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Tên Danh Thắng / Cảnh Đẹp Tiêu Biểu <span className="text-amber-400">*</span>
              </label>
              
              {/* PRIMARY GEMINI GOOGLE SEARCH & AUTO-ATTACH BUTTON */}
              <button
                type="button"
                onClick={handleGeminiSearchGoogleAndAttach}
                disabled={isGeminiSearching || (!formData.landmarkName?.trim() && !formData.cityName?.trim())}
                className="text-xs px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-stone-950 font-black flex items-center gap-1.5 transition-all cursor-pointer shadow-md shadow-amber-500/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                title="Gemini sẽ hỗ trợ tìm kiếm ảnh thực tế trên Google và tự động gắn link ảnh vào form"
              >
                {isGeminiSearching ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Gemini đang tìm Google...</span>
                  </>
                ) : (
                  <>
                    <Globe className="w-3.5 h-3.5" />
                    <Sparkles className="w-3 h-3 animate-pulse" />
                    <span>Gemini Tìm Google & Gắn Link</span>
                  </>
                )}
              </button>
            </div>

            <div className="relative">
              <input
                type="text"
                value={formData.landmarkName || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, landmarkName: e.target.value }))}
                placeholder="VD: Văn Miếu - Quốc Tử Giám & Hồ Gươm, Cầu Vàng Bà Nà, Chùa Thiên Mụ..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-100 text-xs focus:outline-none focus:border-amber-500 transition-colors font-medium"
                required
              />
            </div>

            {/* Gemini Helper Sub-banner */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
              <p className="text-[11px] text-stone-400 flex items-center gap-1">
                <Info className="w-3 h-3 text-amber-400/80 shrink-0" />
                <span>Admin không cần tìm ảnh thủ công — <b>Gemini sẽ tìm trên Google</b> và tự gắn link ảnh.</span>
              </p>

              {formData.landmarkName && (
                <button
                  type="button"
                  onClick={handleGeminiSearchGoogleAndAttach}
                  disabled={isGeminiSearching}
                  className="text-[11px] text-amber-400 hover:text-amber-300 font-semibold underline underline-offset-2 flex items-center gap-1 cursor-pointer"
                >
                  <Zap className="w-3 h-3 text-amber-400" />
                  <span>Tra cứu ảnh ngay cho "{formData.landmarkName}"</span>
                </button>
              )}
            </div>

            {/* Gemini Searching Loading Indicator */}
            {isGeminiSearching && (
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center gap-2.5 animate-pulse">
                <Loader2 className="w-4 h-4 animate-spin text-amber-400 shrink-0" />
                <div>
                  <p className="font-bold">Gemini đang tra cứu hình ảnh trên Google...</p>
                  <p className="text-[11px] text-amber-300/80">Đang tìm các link ảnh chất lượng cao và tự động gắn vào form cho bạn.</p>
                </div>
              </div>
            )}

            {/* Gemini Google Search Results Showcase */}
            {geminiSearchResult && !isGeminiSearching && (
              <div className="p-3 rounded-xl bg-stone-900/90 border border-amber-500/40 space-y-2 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
                    <Globe className="w-3.5 h-3.5 text-amber-400" />
                    <span>Kết quả tìm kiếm Google bởi Gemini:</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold flex items-center gap-1">
                    <Check className="w-3 h-3 stroke-[3]" />
                    <span>Đã tự động gắn link</span>
                  </span>
                </div>

                <p className="text-[11px] text-stone-300 italic">
                  "{geminiSearchResult.searchSummary}"
                </p>

                {geminiSearchResult.candidateImages && geminiSearchResult.candidateImages.length > 0 && (
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[10px] font-semibold text-stone-400">
                      Chọn góc chụp / ảnh khác tìm được từ Google (nhấp để đổi link):
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {geminiSearchResult.candidateImages.map((cand, cIdx) => {
                        const isCandSelected = formData.imageUrl === cand.url;
                        return (
                          <div
                            key={cIdx}
                            onClick={() => {
                              setFormData(prev => ({ ...prev, imageUrl: cand.url }));
                              setAutoMatchFeedback(`Đã chuyển sang ảnh "${cand.title || 'Ảnh Google'}"`);
                              setTimeout(() => setAutoMatchFeedback(null), 3000);
                            }}
                            className={`group relative rounded-xl overflow-hidden border cursor-pointer transition-all ${
                              isCandSelected
                                ? 'ring-2 ring-amber-400 border-amber-400 shadow-lg shadow-amber-500/20'
                                : 'border-stone-800 hover:border-amber-500/60'
                            }`}
                          >
                            <div className="aspect-video relative bg-stone-950">
                              <img
                                src={cand.url}
                                alt={cand.title || 'Landmark Photo'}
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=400&q=80';
                                }}
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                              
                              {isCandSelected && (
                                <div className="absolute top-1 right-1 px-1.5 py-0.5 rounded-full bg-amber-400 text-stone-950 font-black text-[9px] flex items-center gap-0.5 shadow">
                                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                                  <span>Đang dùng</span>
                                </div>
                              )}

                              <div className="absolute bottom-1 left-1 right-1">
                                <p className="text-[10px] font-bold text-white leading-tight truncate">
                                  {cand.title || 'Ảnh Google'}
                                </p>
                                <span className="text-[9px] text-amber-300/90 font-medium truncate block">
                                  {cand.source || 'Google Search'}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Tagline */}
          <div>
            <label className="block text-xs font-semibold text-stone-300 mb-1">
              Khẩu Hiệu Mô Tả Ngắn
            </label>
            <textarea
              rows={2}
              value={formData.tagline || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, tagline: e.target.value }))}
              placeholder="VD: Thành phố biển hiện đại kề bên danh thắng Ngũ Hành Sơn & bán đảo Sơn Trà"
              className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-stone-100 text-xs focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>

          {/* Image URL & Auto Search Section */}
          <div className="space-y-3 p-3.5 rounded-2xl bg-stone-950/70 border border-stone-800/90">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <label className="block text-xs font-semibold text-stone-200 flex items-center gap-1.5">
                <Image className="w-3.5 h-3.5 text-amber-400" />
                <span>Đường Dẫn Ảnh Nền (URL chất lượng cao)</span>
                <span className="text-amber-400">*</span>
              </label>

              {/* Action Buttons: Gemini Google Search & AI Gallery */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleGeminiSearchGoogleAndAttach}
                  disabled={isGeminiSearching}
                  className="px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer active:scale-95 disabled:opacity-50"
                  title="Nhờ Gemini tìm link ảnh mới trên Google"
                >
                  <Globe className="w-3 h-3 text-amber-400" />
                  <span>{isGeminiSearching ? 'Đang tìm...' : 'Gemini Tìm Google'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsAIPickerOpen(true)}
                  className="px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 text-[11px] font-semibold transition-all flex items-center gap-1 cursor-pointer active:scale-95"
                >
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>Kho Ảnh Di Sản</span>
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="url"
                value={formData.imageUrl || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
                placeholder="https://images.unsplash.com/... hoặc link ảnh Google"
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900 border border-stone-700 text-stone-100 text-xs focus:outline-none focus:border-amber-500 transition-colors font-mono"
                required
              />
            </div>

            {/* Feedback alert when auto-attached */}
            {autoMatchFeedback && (
              <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-medium">{autoMatchFeedback}</span>
              </div>
            )}

            {/* DYNAMIC AUTO-FIND SECTION BASED ON LANDMARK NAME */}
            <div className="pt-2 border-t border-stone-800/80 space-y-2.5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  <Wand2 className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-xs font-bold text-amber-300">
                    Gợi ý ảnh tương thích từ Kho Di Sản:
                  </span>
                  <span className="text-[11px] px-2 py-0.5 rounded-md bg-stone-800 text-stone-300 border border-stone-700 max-w-[160px] truncate">
                    {formData.landmarkName || formData.cityName || 'Tất cả'}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleAutoAttachBestPhoto}
                  className="px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-amber-300 font-bold text-[11px] border border-stone-700 flex items-center gap-1 shadow transition-all cursor-pointer active:scale-95"
                  title="Tự động gắn ảnh phù hợp nhất vào danh thắng"
                >
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>Gắn ảnh nhanh</span>
                </button>
              </div>

              {/* Matched Photos Horizontal Carousel/Grid */}
              {autoMatchedPhotos.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                  {autoMatchedPhotos.slice(0, 4).map((photo) => {
                    const isSelected = formData.imageUrl === photo.imageUrl;
                    return (
                      <div
                        key={photo.id}
                        onClick={() => {
                          setFormData(prev => ({
                            ...prev,
                            imageUrl: photo.imageUrl,
                            tagline: prev.tagline ? prev.tagline : photo.tagline
                          }));
                          setAutoMatchFeedback(`Đã chọn ảnh "${photo.title}"`);
                          setTimeout(() => setAutoMatchFeedback(null), 2500);
                        }}
                        className={`group relative rounded-xl overflow-hidden border cursor-pointer transition-all ${
                          isSelected
                            ? 'ring-2 ring-amber-400 border-amber-400 shadow-md shadow-amber-500/20'
                            : 'border-stone-800 hover:border-amber-500/60'
                        }`}
                      >
                        <div className="aspect-video relative bg-stone-900">
                          <img
                            src={photo.thumbUrl || photo.imageUrl}
                            alt={photo.title}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                          
                          {isSelected && (
                            <div className="absolute top-1 right-1 px-1.5 py-0.5 rounded-full bg-amber-400 text-stone-950 font-bold text-[9px] flex items-center gap-0.5 shadow">
                              <Check className="w-2.5 h-2.5 stroke-[3]" />
                              <span>Đang chọn</span>
                            </div>
                          )}

                          <div className="absolute bottom-1 left-1 right-1">
                            <p className="text-[10px] font-bold text-white leading-tight truncate drop-shadow">
                              {photo.title}
                            </p>
                            <span className="text-[9px] text-amber-300 font-medium">
                              {photo.cityName}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-xs text-stone-400 italic">
                  Bấm nút "Gemini Tìm Google & Gắn Link" phía trên để Gemini tự động tìm kiếm trên Google cho bạn.
                </p>
              )}

              {/* Quick sample chips fallback */}
              <div className="pt-2 border-t border-stone-800/50 flex flex-wrap items-center justify-between gap-1.5">
                <span className="text-[11px] text-stone-400 font-medium">Hoặc chọn nhanh theo vùng miền:</span>
                <button
                  type="button"
                  onClick={() => setIsAIPickerOpen(true)}
                  className="text-[11px] text-amber-400 hover:text-amber-300 flex items-center gap-1 font-semibold cursor-pointer"
                >
                  <Search className="w-3 h-3" />
                  <span>Mở toàn bộ kho ảnh ({VIETNAM_LANDMARK_PHOTOS.length}+ danh thắng)</span>
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {SAMPLE_LANDMARK_IMAGES.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, imageUrl: img.url }))}
                    className={`text-[10px] px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                      formData.imageUrl === img.url 
                        ? 'bg-amber-500 text-stone-950 font-bold border-amber-400 shadow' 
                        : 'bg-stone-900 border-stone-800 text-stone-300 hover:border-stone-700'
                    }`}
                  >
                    {img.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* GPS Coordinates */}
          <div className="p-3.5 rounded-2xl bg-stone-950/60 border border-stone-800/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-stone-200 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                Tọa độ GPS (vĩ độ, kinh độ)
              </span>
              <button
                type="button"
                onClick={handleGetCurrentLocation}
                disabled={isLocating}
                className="text-[10px] px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold hover:bg-amber-500/30 transition-all cursor-pointer flex items-center gap-1"
              >
                <Navigation className={`w-3 h-3 ${isLocating ? 'animate-spin' : ''}`} />
                <span>{isLocating ? 'Đang lấy GPS...' : 'Lấy GPS vị trí hiện tại'}</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] text-stone-400 mb-0.5">Vĩ độ (Latitude)</label>
                <input
                  type="number"
                  step="0.0001"
                  value={formData.lat ?? 16.0544}
                  onChange={(e) => setFormData(prev => ({ ...prev, lat: parseFloat(e.target.value) || 0 }))}
                  className="w-full px-3 py-2 rounded-xl bg-stone-900 border border-stone-800 text-stone-100 text-xs focus:outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-[10px] text-stone-400 mb-0.5">Kinh độ (Longitude)</label>
                <input
                  type="number"
                  step="0.0001"
                  value={formData.lng ?? 108.2022}
                  onChange={(e) => setFormData(prev => ({ ...prev, lng: parseFloat(e.target.value) || 0 }))}
                  className="w-full px-3 py-2 rounded-xl bg-stone-900 border border-stone-800 text-stone-100 text-xs focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-3 border-t border-stone-800 flex items-center justify-between gap-3">
            {landmark?.id && onDelete ? (
              <button
                type="button"
                onClick={handleDelete}
                className="px-3.5 py-2 rounded-xl bg-red-950/60 hover:bg-red-900/80 text-red-300 border border-red-500/40 text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Xóa danh thắng</span>
              </button>
            ) : (
              <div />
            )}

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold transition-all cursor-pointer"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-stone-950 font-bold text-xs shadow-lg transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>{landmark ? 'Lưu Cập Nhật' : 'Tạo Danh Thắng'}</span>
              </button>
            </div>
          </div>

        </form>
      </div>

      {/* AI Landmark Image Picker Modal */}
      <AILandmarkImagePickerModal
        isOpen={isAIPickerOpen}
        onClose={() => setIsAIPickerOpen(false)}
        initialCityName={formData.cityName}
        initialLandmarkName={formData.landmarkName}
        initialQuery={formData.cityName || formData.landmarkName || ''}
        onSelectPhoto={(photo, autoFill) => {
          setFormData(prev => ({
            ...prev,
            imageUrl: photo.imageUrl,
            ...(autoFill ? {
              cityName: photo.cityName || prev.cityName,
              province: photo.province || prev.province,
              landmarkName: photo.landmarkName || prev.landmarkName,
              tagline: photo.tagline || prev.tagline,
              lat: photo.lat || prev.lat,
              lng: photo.lng || prev.lng
            } : {})
          }));
        }}
      />
    </div>
  );
};
