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
  Utensils 
} from 'lucide-react';
import { PlaceItem, PlaceType, HeritageItem } from '../types';
import { storageService } from '../services/storageService';

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

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.name?.trim()) {
      setErrorMessage('Vui lòng nhập tên địa điểm.');
      return;
    }
    if (!formData.address?.trim()) {
      setErrorMessage('Vui lòng nhập địa chỉ.');
      return;
    }

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
      specialties: (formData.specialties || []).filter(s => s.trim().length > 0)
    };

    storageService.updatePlace(selectedHeritageId, placeToSave);
    setSuccessMessage('Đã lưu thông tin địa điểm ăn uống & trải nghiệm thành công!');

    if (onSaveSuccess) {
      onSaveSuccess(placeToSave, selectedHeritageId);
    }

    setTimeout(() => {
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div 
        className="bg-stone-900 border border-amber-500/30 rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden my-auto animate-fadeIn text-stone-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-800 bg-stone-950/60 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
              🍜
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-amber-100">
                {isNew ? 'Thêm Địa Điểm Ăn Uống & Trải Nghiệm Mới' : 'Chỉnh Sửa Địa Điểm Lân Cận'}
              </h3>
              <p className="text-xs text-stone-400">
                Hiển thị trong mục "Ăn Uống & Trải Nghiệm Gần Bạn"
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-200 hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-4 text-xs">
          {successMessage && (
            <div className="p-3.5 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 flex items-center gap-2 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {errorMessage && (
            <div className="p-3.5 rounded-2xl bg-red-950/80 border border-red-500/40 text-red-300 flex items-center gap-2 font-medium">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Associated Heritage */}
          <div className="space-y-1.5">
            <label className="font-semibold text-stone-300">Gắn liền với Di sản Văn hóa nào?</label>
            <select
              value={selectedHeritageId}
              onChange={(e) => setSelectedHeritageId(e.target.value)}
              className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-amber-300 font-medium focus:outline-none focus:border-amber-500"
            >
              {availableHeritages.map(h => (
                <option key={h.id} value={h.id}>
                  {h.name} ({h.province})
                </option>
              ))}
            </select>
          </div>

          {/* Photo URL */}
          <div className="space-y-1.5">
            <label className="font-semibold text-stone-300 flex items-center gap-1.5">
              <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
              <span>Ảnh quán / địa điểm (URL)</span>
            </label>
            <div className="flex gap-3">
              <input
                type="url"
                value={formData.photoUrl || ''}
                onChange={(e) => handleChange('photoUrl', e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="flex-1 bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-500"
              />
              {formData.photoUrl && (
                <div className="w-12 h-10 rounded-xl overflow-hidden border border-stone-700 shrink-0 bg-stone-950">
                  <img src={formData.photoUrl} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          </div>

          {/* Name & Address */}
          <div className="space-y-1.5">
            <label className="font-semibold text-stone-300">Tên Quán / Điểm trải nghiệm (*)</label>
            <input
              type="text"
              value={formData.name || ''}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="VD: Cơm Niêu & Cao Lầu Bếp Hội"
              required
              className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-500 font-medium"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-semibold text-stone-300">Địa chỉ cụ thể (*)</label>
            <input
              type="text"
              value={formData.address || ''}
              onChange={(e) => handleChange('address', e.target.value)}
              placeholder="VD: 16 Trần Phú, Phường Minh An, TP. Hội An"
              required
              className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Category & Label */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="font-semibold text-stone-300">Loại hình</label>
              <select
                value={formData.category || 'local_food'}
                onChange={handleCategoryChange}
                className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-stone-200 focus:outline-none focus:border-amber-500"
              >
                {PLACE_CATEGORIES.map(c => (
                  <option key={c.id} value={c.id}>{c.label}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-stone-300">Nhãn hiển thị</label>
              <input
                type="text"
                value={formData.categoryLabel || ''}
                onChange={(e) => handleChange('categoryLabel', e.target.value)}
                placeholder="VD: Đặc sản Cao Lầu & Cơm Gà"
                className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Rating, Price & Hours */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="font-semibold text-stone-300 flex items-center gap-1">
                <Star className="w-3.5 h-3.5 text-amber-400" />
                <span>Đánh giá (1 - 5 Sao)</span>
              </label>
              <input
                type="number"
                step="0.1"
                min="1"
                max="5"
                value={formData.rating ?? 4.8}
                onChange={(e) => handleChange('rating', parseFloat(e.target.value))}
                className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-stone-100 focus:outline-none focus:border-amber-500 font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-stone-300">Mức giá</label>
              <input
                type="text"
                value={formData.priceText || ''}
                onChange={(e) => handleChange('priceText', e.target.value)}
                placeholder="VD: 35.000 - 80.000 VNĐ"
                className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-stone-100 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-stone-300 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>Giờ mở cửa</span>
              </label>
              <input
                type="text"
                value={formData.openingHoursText || ''}
                onChange={(e) => handleChange('openingHoursText', e.target.value)}
                placeholder="VD: 07:00 - 22:00"
                className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-stone-100 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Coordinates Lat / Lng */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <span className="text-[11px] text-stone-400">Vĩ độ (Lat)</span>
              <input
                type="number"
                step="0.0001"
                value={formData.lat ?? 16.0}
                onChange={(e) => handleChange('lat', parseFloat(e.target.value))}
                className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2 text-stone-100 focus:outline-none focus:border-amber-500 font-mono text-xs"
              />
            </div>
            <div className="space-y-1">
              <span className="text-[11px] text-stone-400">Kinh độ (Lng)</span>
              <input
                type="number"
                step="0.0001"
                value={formData.lng ?? 108.0}
                onChange={(e) => handleChange('lng', parseFloat(e.target.value))}
                className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2 text-stone-100 focus:outline-none focus:border-amber-500 font-mono text-xs"
              />
            </div>
          </div>

          {/* Specialties / Highlights */}
          <div className="space-y-2">
            <label className="font-semibold text-stone-300 flex items-center gap-1.5">
              <Utensils className="w-3.5 h-3.5 text-amber-400" />
              <span>Món ngon đặc sản / Trải nghiệm nổi bật</span>
            </label>
            <div className="space-y-2">
              {(formData.specialties || []).map((spec, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold text-[10px] shrink-0">
                    {idx + 1}
                  </span>
                  <input
                    type="text"
                    value={spec}
                    onChange={(e) => {
                      const updated = [...(formData.specialties || [])];
                      updated[idx] = e.target.value;
                      handleChange('specialties', updated);
                    }}
                    className="flex-1 bg-stone-950 border border-stone-800 rounded-xl px-3 py-1.5 text-stone-200 text-xs focus:outline-none focus:border-amber-500"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveSpecialty(idx)}
                    className="p-1.5 rounded-lg text-stone-500 hover:text-red-400 hover:bg-red-950/30 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
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
                  placeholder="Thêm món hoặc trải nghiệm đặc sắc..."
                  className="flex-1 bg-stone-950 border border-stone-800 rounded-xl px-3 py-1.5 text-stone-300 text-xs focus:outline-none focus:border-amber-500"
                />
                <button
                  type="button"
                  onClick={handleAddSpecialty}
                  className="px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-300 text-xs flex items-center gap-1 font-medium transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Thêm</span>
                </button>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-stone-800 flex items-center justify-end gap-3 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 font-medium transition-colors"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Lưu Thông Tin Địa Điểm</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
