import React, { useState, useEffect } from 'react';
import { 
  X, 
  Save, 
  MapPin, 
  Image as ImageIcon, 
  Clock, 
  Star, 
  Compass, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  AlertCircle, 
  Utensils,
  Sparkles,
  RefreshCw
} from 'lucide-react';
import { PlaceItem, PlaceType, HeritageItem } from '../types';
import { storageService } from '../services/storageService';
import { aiService } from '../services/aiService';

interface PlaceEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  place: PlaceItem | null;
  heritageId?: string;
  heritagesList?: HeritageItem[];
  onSaveSuccess?: (savedPlace: PlaceItem, heritageId: string) => void;
}

const PLACE_CATEGORIES: { id: PlaceType; label: string }[] = [
  { id: 'local_food', label: 'Ẩm thực & Món đặc sản truyền thống' },
  { id: 'restaurant', label: 'Nhà hàng ẩm thực Việt' },
  { id: 'cafe', label: 'Cà phê & Không gian xưa' },
  { id: 'drink', label: 'Trà đạo & Quán nước' },
  { id: 'bakery', label: 'Bánh truyền thống' },
  { id: 'dessert', label: 'Chè & Tráng miệng dân gian' },
  { id: 'entertainment', label: 'Trải nghiệm văn hóa & Nghệ thuật' },
  { id: 'shopping', label: 'Làng nghề & Đồ thủ công mỹ nghệ' }
];

export const PlaceEditModal: React.FC<PlaceEditModalProps> = ({
  isOpen,
  onClose,
  place,
  heritageId,
  heritagesList,
  onSaveSuccess
}) => {
  const isNew = !place || !place.id;
  const [activeStep, setActiveStep] = useState<1 | 2>(1);
  const availableHeritages = heritagesList && heritagesList.length > 0 
    ? heritagesList 
    : storageService.getHeritages();
  const [selectedHeritageId, setSelectedHeritageId] = useState<string>(heritageId || availableHeritages[0]?.id || 'dai-noi-hue');

  const [formData, setFormData] = useState<Partial<PlaceItem>>({
    id: '',
    name: '',
    category: 'local_food',
    categoryLabel: 'Ẩm thực truyền thống',
    address: '',
    lat: 16.0,
    lng: 108.0,
    rating: 4.8,
    userRatingCount: 250,
    priceText: '35.000 - 85.000 VNĐ',
    openingHoursText: '07:00 - 22:00',
    nationalPhoneNumber: '',
    photoUrl: '',
    googleMapsUri: 'https://maps.google.com',
    specialties: ['']
  });

  const [specialtyInput, setSpecialtyInput] = useState('');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSearchingImage, setIsSearchingImage] = useState(false);

  const handleFindImageWithGemini = async () => {
    if (!formData.name?.trim()) {
      setErrorMessage('Vui lòng nhập tên địa điểm trước khi tìm ảnh.');
      return;
    }
    setIsSearchingImage(true);
    setErrorMessage(null);
    try {
      const res = await aiService.findPlaceImage({
        placeName: formData.name.trim(),
        categoryLabel: formData.categoryLabel || 'Ẩm thực',
        address: formData.address || ''
      });
      if (res && res.photoUrl) {
        handleChange('photoUrl', res.photoUrl);
        setSuccessMessage(`Đã tìm thấy ảnh bằng Gemini! (${res.reason})`);
        setTimeout(() => setSuccessMessage(null), 5000);
      } else {
        setErrorMessage('Không tìm thấy ảnh phù hợp.');
      }
    } catch (err) {
      setErrorMessage('Có lỗi xảy ra khi tìm ảnh bằng Gemini.');
    } finally {
      setIsSearchingImage(false);
    }
  };

  useEffect(() => {
    if (heritageId) {
      setSelectedHeritageId(heritageId);
    }
  }, [heritageId]);

  useEffect(() => {
    if (place) {
      setFormData({
        ...place,
        specialties: place.specialties && place.specialties.length > 0
          ? [...place.specialties]
          : ['']
      });
    } else {
      setFormData({
        id: 'place-' + Date.now(),
        name: '',
        category: 'local_food',
        categoryLabel: 'Ẩm thực đặc sản',
        address: '',
        lat: 16.0,
        lng: 108.0,
        rating: 4.8,
        userRatingCount: 120,
        priceText: '40.000 - 90.000 VNĐ',
        openingHoursText: '07:00 - 22:00',
        nationalPhoneNumber: '',
        photoUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80',
        googleMapsUri: 'https://maps.google.com',
        specialties: ['Món ngon gia truyền']
      });
    }
    setActiveStep(1);
    setSuccessMessage(null);
    setErrorMessage(null);
  }, [place, isOpen]);

  if (!isOpen) return null;

  const handleChange = (field: keyof PlaceItem, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = PLACE_CATEGORIES.find(c => c.id === e.target.value);
    setFormData(prev => ({
      ...prev,
      category: e.target.value as PlaceType,
      categoryLabel: selected ? selected.label : prev.categoryLabel
    }));
  };

  const handleAddSpecialty = () => {
    if (!specialtyInput.trim()) return;
    setFormData(prev => ({
      ...prev,
      specialties: [...(prev.specialties || []), specialtyInput.trim()]
    }));
    setSpecialtyInput('');
  };

  const handleRemoveSpecialty = (index: number) => {
    setFormData(prev => ({
      ...prev,
      specialties: (prev.specialties || []).filter((_, i) => i !== index)
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.name?.trim()) {
      setActiveStep(1);
      setErrorMessage('Vui lòng nhập tên địa điểm ở Bước 1.');
      return;
    }
    if (!formData.address?.trim()) {
      setActiveStep(1);
      setErrorMessage('Vui lòng nhập địa chỉ ở Bước 1.');
      return;
    }

    const currentUser = storageService.getCurrentUser();
    const isAdmin = currentUser?.role === 'admin';

    const placeToSave: PlaceItem = {
      id: formData.id || 'place-' + Date.now(),
      name: formData.name.trim(),
      category: formData.category || 'local_food',
      categoryLabel: formData.categoryLabel?.trim() || 'Ẩm thực truyền thống',
      address: formData.address.trim(),
      lat: Number(formData.lat) || 16.0,
      lng: Number(formData.lng) || 108.0,
      rating: Number(formData.rating) || 4.5,
      userRatingCount: Number(formData.userRatingCount) || 50,
      priceText: formData.priceText?.trim() || 'Bình dân',
      openingHoursText: formData.openingHoursText?.trim() || '08:00 - 22:00',
      nationalPhoneNumber: formData.nationalPhoneNumber?.trim() || '',
      photoUrl: formData.photoUrl?.trim() || 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80',
      googleMapsUri: formData.googleMapsUri?.trim() || `https://maps.google.com/?q=${encodeURIComponent(formData.name.trim())}`,
      specialties: (formData.specialties || []).filter(s => s.trim().length > 0),
      approvalStatus: isAdmin ? 'approved' : 'pending'
    };

    await storageService.updatePlace(selectedHeritageId, placeToSave);
    if (isAdmin) {
      setSuccessMessage('Đã lưu thông tin địa điểm ăn uống & trải nghiệm thành công!');
    } else {
      setSuccessMessage('Đã gửi đề xuất địa điểm! Vui lòng chờ Admin phê duyệt trước khi hiển thị công khai.');
    }

    if (onSaveSuccess) {
      onSaveSuccess(placeToSave, selectedHeritageId);
    }

    setTimeout(() => {
      onClose();
    }, 1200);
  };

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/85 backdrop-blur-md overflow-hidden"
      onClick={onClose}
    >
      <div 
        className="bg-stone-900 border-t sm:border border-amber-500/30 rounded-t-3xl sm:rounded-3xl w-full max-w-2xl h-[94vh] sm:h-auto sm:max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-slideUp sm:animate-fadeIn text-stone-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Drag Indicator */}
        <div className="w-12 h-1.5 bg-stone-700/80 rounded-full mx-auto my-2 sm:hidden shrink-0" />

        {/* Header */}
        <div className="px-4 sm:px-5 py-2.5 sm:py-3 border-b border-stone-800 bg-stone-950/80 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-sm shrink-0">
              🍜
            </div>
            <div className="min-w-0">
              <h3 className="font-serif font-bold text-sm sm:text-lg text-amber-100 truncate">
                {isNew ? 'Thêm Địa Điểm Mới' : 'Chỉnh Sửa Địa Điểm Lân Cận'}
              </h3>
              <p className="text-[10px] sm:text-[11px] text-stone-400 truncate">
                Thông tin sẽ qua kiểm duyệt Admin trước khi đăng tải
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-200 hover:bg-stone-800 transition-colors shrink-0"
            title="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator Bar - Responsive for Mobile */}
        <div className="px-3 sm:px-5 py-2 bg-stone-950/60 border-b border-stone-800 flex items-center justify-between text-xs shrink-0 gap-1.5">
          {/* Mobile view step summary bar */}
          <div className="sm:hidden flex items-center justify-between w-full px-1">
            <span className="text-xs font-bold text-amber-300 flex items-center gap-1">
              <span className="w-5 h-5 rounded-full bg-amber-500 text-stone-950 text-[10px] flex items-center justify-center font-extrabold">
                {activeStep}
              </span>
              <span>
                {activeStep === 1 ? '1. Tên & Địa chỉ' : '2. Chi tiết & Món đặc sản'}
              </span>
            </span>

            <div className="flex items-center gap-1.5">
              {[1, 2].map((step) => (
                <button
                  key={step}
                  type="button"
                  onClick={() => setActiveStep(step as 1 | 2)}
                  className={`h-2 rounded-full transition-all ${
                    activeStep === step 
                      ? 'w-6 bg-amber-500' 
                      : 'w-2 bg-stone-700 hover:bg-stone-600'
                  }`}
                  title={`Bước ${step}`}
                />
              ))}
            </div>
          </div>

          {/* Desktop view step buttons */}
          <div className="hidden sm:flex items-center justify-between w-full gap-2">
            <button
              type="button"
              onClick={() => setActiveStep(1)}
              className={`flex-1 py-1.5 px-2 text-center rounded-xl font-medium transition-all cursor-pointer ${
                activeStep === 1 
                  ? 'bg-amber-500 text-stone-950 font-bold shadow' 
                  : 'text-stone-400 hover:bg-stone-800/60'
              }`}
            >
              1. Tên & Địa chỉ
            </button>
            <div className="w-6 h-0.5 bg-stone-800 shrink-0" />
            <button
              type="button"
              onClick={() => setActiveStep(2)}
              className={`flex-1 py-1.5 px-2 text-center rounded-xl font-medium transition-all cursor-pointer ${
                activeStep === 2 
                  ? 'bg-amber-500 text-stone-950 font-bold shadow' 
                  : 'text-stone-400 hover:bg-stone-800/60'
              }`}
            >
              2. Chi tiết & Món đặc sản
            </button>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} className="p-4 sm:p-5 flex-1 flex flex-col justify-between text-xs overflow-y-auto overscroll-contain">
          <div className="space-y-3.5">
            {successMessage && (
              <div className="p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 flex items-center gap-2 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{successMessage}</span>
              </div>
            )}

            {errorMessage && (
              <div className="p-2.5 rounded-xl bg-red-950/80 border border-red-500/40 text-red-300 flex items-center gap-2 font-medium">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* STEP 1: Thông tin cơ bản */}
            {activeStep === 1 && (
              <div className="space-y-3.5 animate-fadeIn">
                <div className="space-y-1">
                  <label className="font-semibold text-stone-300 text-xs">Gắn liền với Di sản Văn hóa nào?</label>
                  <select
                    value={selectedHeritageId}
                    onChange={(e) => setSelectedHeritageId(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2.5 sm:py-2 text-amber-300 font-medium focus:outline-none focus:border-amber-500 text-xs sm:text-xs"
                  >
                    {availableHeritages.map(h => (
                      <option key={h.id} value={h.id}>
                        {h.name} ({h.province})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-semibold text-stone-300 text-xs">Tên Quán / Địa điểm (*)</label>
                    <input
                      type="text"
                      value={formData.name || ''}
                      onChange={(e) => handleChange('name', e.target.value)}
                      placeholder="VD: Quán Cơm Hến Hoa Đông"
                      required
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2.5 sm:py-2 text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-500 font-medium text-xs sm:text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-stone-300 text-xs">Địa chỉ cụ thể (*)</label>
                    <input
                      type="text"
                      value={formData.address || ''}
                      onChange={(e) => handleChange('address', e.target.value)}
                      placeholder="VD: 64 kiệt 7 Ưng Bình, Vĩ Dạ, Huế"
                      required
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2.5 sm:py-2 text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-500 text-xs sm:text-xs"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between gap-1">
                    <label className="font-semibold text-stone-300 flex items-center gap-1.5 text-xs">
                      <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
                      <span>Ảnh minh họa (URL)</span>
                    </label>
                    <button
                      type="button"
                      onClick={handleFindImageWithGemini}
                      disabled={isSearchingImage}
                      className="px-2.5 py-1 text-[11px] rounded-lg bg-amber-500/10 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 font-semibold flex items-center gap-1 cursor-pointer transition-all active:scale-95 disabled:opacity-50"
                    >
                      {isSearchingImage ? (
                        <RefreshCw className="w-3 h-3 animate-spin" />
                      ) : (
                        <Sparkles className="w-3 h-3 text-amber-400" />
                      )}
                      <span>{isSearchingImage ? 'Đang tìm...' : 'Tìm bằng Gemini'}</span>
                    </button>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={formData.photoUrl || ''}
                      onChange={(e) => handleChange('photoUrl', e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                      className="flex-1 bg-stone-950 border border-stone-800 rounded-xl px-3 py-2.5 sm:py-2 text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-500 text-xs sm:text-xs"
                    />
                    {formData.photoUrl && (
                      <div className="w-10 h-10 rounded-xl overflow-hidden border border-stone-700 shrink-0 bg-stone-950">
                        <img src={formData.photoUrl} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-stone-300 text-xs">Số điện thoại liên hệ</label>
                  <input
                    type="text"
                    value={formData.nationalPhoneNumber || ''}
                    onChange={(e) => handleChange('nationalPhoneNumber', e.target.value)}
                    placeholder="VD: 0905 123 456"
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2.5 sm:py-2 text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-500 text-xs sm:text-xs"
                  />
                </div>
              </div>
            )}

            {/* STEP 2: Chi tiết & Món đặc sản */}
            {activeStep === 2 && (
              <div className="space-y-3.5 animate-fadeIn">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-semibold text-stone-300 text-xs">Loại hình địa điểm</label>
                    <select
                      value={formData.category || 'local_food'}
                      onChange={handleCategoryChange}
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2.5 sm:py-2 text-stone-200 focus:outline-none focus:border-amber-500 text-xs sm:text-xs"
                    >
                      {PLACE_CATEGORIES.map(c => (
                        <option key={c.id} value={c.id}>{c.label}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-stone-300 text-xs">Khung giờ mở cửa</label>
                    <input
                      type="text"
                      value={formData.openingHoursText || ''}
                      onChange={(e) => handleChange('openingHoursText', e.target.value)}
                      placeholder="VD: 06:30 - 21:30"
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2.5 sm:py-2 text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-500 text-xs sm:text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-semibold text-stone-300 text-xs">Mức giá tham khảo</label>
                    <input
                      type="text"
                      value={formData.priceText || ''}
                      onChange={(e) => handleChange('priceText', e.target.value)}
                      placeholder="VD: 30.000 - 70.000 VNĐ"
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2.5 sm:py-2 text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-500 text-xs sm:text-xs"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="font-semibold text-stone-300 text-xs">Vĩ độ (Lat)</label>
                      <input
                        type="number"
                        step="0.0001"
                        value={formData.lat ?? 16.0}
                        onChange={(e) => handleChange('lat', parseFloat(e.target.value))}
                        className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2.5 sm:py-2 text-stone-100 focus:outline-none focus:border-amber-500 font-mono text-xs sm:text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-semibold text-stone-300 text-xs">Kinh độ (Lng)</label>
                      <input
                        type="number"
                        step="0.0001"
                        value={formData.lng ?? 108.0}
                        onChange={(e) => handleChange('lng', parseFloat(e.target.value))}
                        className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2.5 sm:py-2 text-stone-100 focus:outline-none focus:border-amber-500 font-mono text-xs sm:text-xs"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-stone-300 flex items-center gap-1.5 text-xs">
                    <Utensils className="w-3.5 h-3.5 text-amber-400" />
                    <span>Món đặc sản / Trải nghiệm nổi bật</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={specialtyInput}
                      onChange={(e) => setSpecialtyInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddSpecialty();
                        }
                      }}
                      placeholder="Thêm món ăn / dịch vụ..."
                      className="flex-1 bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 sm:py-1.5 text-stone-300 text-xs focus:outline-none focus:border-amber-500"
                    />
                    <button
                      type="button"
                      onClick={handleAddSpecialty}
                      className="px-3.5 py-2 sm:py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-300 text-xs flex items-center gap-1 font-medium transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Thêm</span>
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {(formData.specialties || []).map((spec, idx) => (
                      <span key={idx} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-200 text-[11px]">
                        <span>• {spec}</span>
                        <button type="button" onClick={() => handleRemoveSpecialty(idx)} className="text-stone-400 hover:text-red-400 ml-1">×</button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sticky Footer Actions - Mobile optimized */}
          <div className="pt-3 border-t border-stone-800 flex items-center justify-between gap-2 shrink-0 mt-3 pb-safe sm:pb-0">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2.5 sm:py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 font-semibold text-xs transition-colors cursor-pointer"
            >
              Hủy bỏ
            </button>

            <div className="flex items-center gap-2">
              {activeStep > 1 && (
                <button
                  type="button"
                  onClick={() => setActiveStep(1)}
                  className="px-3.5 py-2.5 sm:py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold text-xs transition-colors cursor-pointer"
                >
                  ← Quay lại
                </button>
              )}

              {activeStep < 2 ? (
                <button
                  type="button"
                  onClick={() => setActiveStep(2)}
                  className="px-4 py-2.5 sm:py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs transition-all cursor-pointer shadow-md"
                >
                  Tiếp theo →
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-4 sm:px-5 py-2.5 sm:py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
                >
                  <Save className="w-4 h-4 shrink-0" />
                  <span>Gửi Đề Xuất</span>
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
