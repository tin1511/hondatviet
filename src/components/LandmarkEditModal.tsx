import React, { useState, useEffect } from 'react';
import { X, Save, Trash2, Image, MapPin, Sparkles, Navigation, CheckCircle2 } from 'lucide-react';
import { CityLandmarkBackground } from '../types';
import { storageService } from '../services/storageService';

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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-stone-900 border border-stone-800 rounded-3xl max-w-xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        
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
          <div>
            <label className="block text-xs font-semibold text-stone-300 mb-1">
              Tên Danh Thắng / Cảnh Đẹp Tiêu Biểu <span className="text-amber-400">*</span>
            </label>
            <input
              type="text"
              value={formData.landmarkName || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, landmarkName: e.target.value }))}
              placeholder="VD: Cầu Vàng Bà Nà & Cầu Rồng Sông Hàn"
              className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-100 text-xs focus:outline-none focus:border-amber-500 transition-colors"
              required
            />
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

          {/* Image URL */}
          <div>
            <label className="block text-xs font-semibold text-stone-300 mb-1">
              Đường Dẫn Ảnh Nền (URL chất lượng cao) <span className="text-amber-400">*</span>
            </label>
            <div className="flex items-center gap-2">
              <input
                type="url"
                value={formData.imageUrl || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-100 text-xs focus:outline-none focus:border-amber-500 transition-colors"
                required
              />
            </div>

            {/* Quick Unsplash selector */}
            <div className="mt-2.5">
              <span className="text-[11px] text-stone-400 block mb-1.5 font-medium">Hoặc chọn nhanh ảnh mẫu có sẵn:</span>
              <div className="flex flex-wrap gap-1.5">
                {SAMPLE_LANDMARK_IMAGES.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, imageUrl: img.url }))}
                    className={`text-[10px] px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                      formData.imageUrl === img.url 
                        ? 'bg-amber-500 text-stone-950 font-bold border-amber-400' 
                        : 'bg-stone-950/80 border-stone-800 text-stone-300 hover:border-stone-700'
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
    </div>
  );
};
