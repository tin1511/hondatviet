import React, { useState, useEffect } from 'react';
import { 
  X, 
  Save, 
  MapPin, 
  Image as ImageIcon, 
  Clock, 
  Ticket, 
  Compass, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle,
  Plus,
  Trash2,
  ExternalLink
} from 'lucide-react';
import { HeritageItem, HeritageCategory, Region, VerificationStatus } from '../types';
import { storageService } from '../services/storageService';

interface HeritageEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  heritage: HeritageItem | null;
  onSaveSuccess?: (savedItem: HeritageItem) => void;
}

const CATEGORY_OPTIONS: { id: HeritageCategory; label: string }[] = [
  { id: 'monument', label: 'Di tích Lịch sử' },
  { id: 'palace', label: 'Cung điện & Hoàng thành' },
  { id: 'temple', label: 'Đền miếu & Chùa cổ' },
  { id: 'citadel', label: 'Thành lũy & Pháo đài' },
  { id: 'ancient_house', label: 'Đô thị Cổ & Nhà cổ' },
  { id: 'architecture', label: 'Kiến trúc Cổ & Tháp Chăm' },
  { id: 'craft_village', label: 'Làng nghề truyền thống' },
  { id: 'artifact', label: 'Bảo vật & Cổ vật quốc gia' },
  { id: 'folk_art', label: 'Nghệ thuật Dân gian' },
  { id: 'culinary', label: 'Ẩm thực Di sản' }
];

export const HeritageEditModal: React.FC<HeritageEditModalProps> = ({
  isOpen,
  onClose,
  heritage,
  onSaveSuccess
}) => {
  const isNew = !heritage || !heritage.id;

  const [formData, setFormData] = useState<Partial<HeritageItem>>({
    id: '',
    name: '',
    vietnameseName: '',
    englishName: '',
    category: 'monument',
    categoryLabel: 'Di tích Lịch sử',
    region: 'central',
    province: '',
    period: '',
    dynasty: '',
    address: '',
    lat: 16.0544,
    lng: 108.2022,
    imageUrl: '',
    visitingHours: '07:30 - 17:30 hàng ngày',
    ticketPrice: 'Miễn phí hoặc mua vé tại cổng',
    googleMapsUri: 'https://maps.google.com',
    history: '',
    overview: '',
    culturalSignificance: '',
    interestingFacts: [''],
    verifiedStatus: 'verified',
    tags: ['Di sản', 'Lịch sử'],
    suggestedQuestions: []
  });

  const [factInput, setFactInput] = useState('');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (heritage) {
      setFormData({
        ...heritage,
        interestingFacts: heritage.interestingFacts && heritage.interestingFacts.length > 0
          ? [...heritage.interestingFacts]
          : [''],
        tags: heritage.tags ? [...heritage.tags] : ['Di sản']
      });
    } else {
      setFormData({
        id: 'heritage-' + Date.now(),
        name: '',
        vietnameseName: '',
        englishName: '',
        category: 'monument',
        categoryLabel: 'Di tích Lịch sử',
        region: 'central',
        province: '',
        period: 'Thế kỷ XIX',
        dynasty: 'Triều Nguyễn',
        address: '',
        lat: 16.0,
        lng: 108.0,
        imageUrl: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=800&q=80',
        visitingHours: '07:30 - 17:30',
        ticketPrice: '100.000 VNĐ / khách',
        googleMapsUri: 'https://maps.google.com',
        history: '',
        overview: '',
        culturalSignificance: '',
        interestingFacts: ['Công trình được UNESCO vinh danh'],
        verifiedStatus: 'verified',
        tags: ['Di sản'],
        suggestedQuestions: []
      });
    }
    setSuccessMessage(null);
    setErrorMessage(null);
  }, [heritage, isOpen]);

  if (!isOpen) return null;

  const handleChange = (field: keyof HeritageItem, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = CATEGORY_OPTIONS.find(c => c.id === e.target.value);
    setFormData(prev => ({
      ...prev,
      category: e.target.value as HeritageCategory,
      categoryLabel: selected ? selected.label : prev.categoryLabel
    }));
  };

  const handleAddFact = () => {
    if (!factInput.trim()) return;
    setFormData(prev => ({
      ...prev,
      interestingFacts: [...(prev.interestingFacts || []), factInput.trim()]
    }));
    setFactInput('');
  };

  const handleRemoveFact = (index: number) => {
    setFormData(prev => ({
      ...prev,
      interestingFacts: (prev.interestingFacts || []).filter((_, i) => i !== index)
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.name?.trim()) {
      setErrorMessage('Vui lòng nhập tên di sản.');
      return;
    }
    if (!formData.province?.trim()) {
      setErrorMessage('Vui lòng nhập tỉnh thành.');
      return;
    }
    if (!formData.history?.trim()) {
      setErrorMessage('Vui lòng nhập phần mô tả / lịch sử di sản.');
      return;
    }

    const itemToSave: HeritageItem = {
      id: formData.id || 'heritage-' + Date.now(),
      name: formData.name.trim(),
      vietnameseName: formData.vietnameseName?.trim() || formData.name.trim(),
      englishName: formData.englishName?.trim() || '',
      category: formData.category || 'monument',
      categoryLabel: formData.categoryLabel?.trim() || 'Di sản Văn hóa',
      region: (formData.region as Region) || 'central',
      province: formData.province.trim(),
      period: formData.period?.trim() || 'Lịch sử Việt Nam',
      dynasty: formData.dynasty?.trim() || '',
      address: formData.address?.trim() || formData.province.trim(),
      lat: Number(formData.lat) || 16.0,
      lng: Number(formData.lng) || 108.0,
      imageUrl: formData.imageUrl?.trim() || 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=800&q=80',
      visitingHours: formData.visitingHours?.trim() || '08:00 - 17:00',
      ticketPrice: formData.ticketPrice?.trim() || 'Miễn phí',
      googleMapsUri: formData.googleMapsUri?.trim() || `https://maps.google.com/?q=${encodeURIComponent(formData.name.trim())}`,
      history: formData.history.trim(),
      overview: formData.overview?.trim() || formData.history.trim().slice(0, 180) + '...',
      culturalSignificance: formData.culturalSignificance?.trim() || 'Bảo tồn giá trị văn hóa và lịch sử ngàn năm của dân tộc.',
      interestingFacts: (formData.interestingFacts || []).filter(f => f.trim().length > 0),
      verifiedStatus: (formData.verifiedStatus as VerificationStatus) || 'verified',
      tags: formData.tags && formData.tags.length > 0 ? formData.tags : ['Di sản'],
      suggestedQuestions: formData.suggestedQuestions || [
        `Ý nghĩa lịch sử của ${formData.name} là gì?`,
        `Thời điểm nào tham quan ${formData.name} đẹp nhất?`
      ]
    };

    storageService.updateHeritage(itemToSave);
    setSuccessMessage('Đã lưu thay đổi nội dung di sản thành công!');

    if (onSaveSuccess) {
      onSaveSuccess(itemToSave);
    }

    setTimeout(() => {
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div 
        className="bg-stone-900 border border-amber-500/30 rounded-3xl w-full max-w-3xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden my-auto animate-fadeIn text-stone-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-800 bg-stone-950/60 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
              ✏️
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-amber-100">
                {isNew ? 'Thêm Điểm Di Sản Mới' : 'Chỉnh Sửa Thông Tin Di Sản'}
              </h3>
              <p className="text-xs text-stone-400">
                Thay đổi sẽ được áp dụng ngay vào bản đồ và danh sách di sản gần bạn
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
        <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-5 text-xs">
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

          {/* Image preview & URL */}
          <div className="space-y-2">
            <label className="font-semibold text-stone-300 flex items-center gap-1.5">
              <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
              <span>Ảnh đại diện Di sản (URL)</span>
            </label>
            <div className="flex gap-3">
              <input
                type="url"
                value={formData.imageUrl || ''}
                onChange={(e) => handleChange('imageUrl', e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="flex-1 bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-500"
              />
              {formData.imageUrl && (
                <div className="w-12 h-10 rounded-xl overflow-hidden border border-stone-700 shrink-0 bg-stone-950">
                  <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          </div>

          {/* Name & Province */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="font-semibold text-stone-300">Tên Di sản (*)</label>
              <input
                type="text"
                value={formData.name || ''}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="VD: Đô thị Cổ Hội An (Phố Cổ Hội An)"
                required
                className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-500 font-medium"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-stone-300">Tỉnh / Thành phố (*)</label>
              <input
                type="text"
                value={formData.province || ''}
                onChange={(e) => handleChange('province', e.target.value)}
                placeholder="VD: Quảng Nam, Hà Nội, Thừa Thiên Huế..."
                required
                className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Category & Region */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="font-semibold text-stone-300">Phân loại Di sản</label>
              <select
                value={formData.category || 'monument'}
                onChange={handleCategoryChange}
                className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-stone-200 focus:outline-none focus:border-amber-500"
              >
                {CATEGORY_OPTIONS.map(c => (
                  <option key={c.id} value={c.id}>{c.label}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-stone-300">Nhãn hiển thị thẻ</label>
              <input
                type="text"
                value={formData.categoryLabel || ''}
                onChange={(e) => handleChange('categoryLabel', e.target.value)}
                placeholder="VD: Di sản Đô thị Cổ"
                className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-stone-300">Vùng miền</label>
              <select
                value={formData.region || 'central'}
                onChange={(e) => handleChange('region', e.target.value as Region)}
                className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-stone-200 focus:outline-none focus:border-amber-500"
              >
                <option value="north">Miền Bắc</option>
                <option value="central">Miền Trung</option>
                <option value="south">Miền Nam</option>
              </select>
            </div>
          </div>

          {/* Period, Dynasty & Address */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="font-semibold text-stone-300">Niên đại / Thời kỳ</label>
              <input
                type="text"
                value={formData.period || ''}
                onChange={(e) => handleChange('period', e.target.value)}
                placeholder="VD: Thế kỷ XVI - XIX"
                className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-stone-300">Triều đại liên quan</label>
              <input
                type="text"
                value={formData.dynasty || ''}
                onChange={(e) => handleChange('dynasty', e.target.value)}
                placeholder="VD: Triều Nguyễn / Chúa Nguyễn"
                className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-stone-300">Địa chỉ cụ thể</label>
              <input
                type="text"
                value={formData.address || ''}
                onChange={(e) => handleChange('address', e.target.value)}
                placeholder="VD: Phường Minh An, TP. Hội An"
                className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Coordinates Lat / Lng for Maps and Geolocation */}
          <div className="p-4 rounded-2xl bg-stone-950/70 border border-stone-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-stone-300 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-amber-400" />
                <span>Tọa độ GPS (Vĩ độ & Kinh độ để hiển thị vị trí trên Bản Đồ và tính khoảng cách GPS)</span>
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <span className="text-[11px] text-stone-400">Vĩ độ (Latitude - Lat)</span>
                <input
                  type="number"
                  step="0.0001"
                  value={formData.lat ?? 16.0}
                  onChange={(e) => handleChange('lat', parseFloat(e.target.value))}
                  placeholder="VD: 15.8770"
                  className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3.5 py-2 text-stone-100 focus:outline-none focus:border-amber-500 font-mono text-xs"
                />
              </div>
              <div className="space-y-1">
                <span className="text-[11px] text-stone-400">Kinh độ (Longitude - Lng)</span>
                <input
                  type="number"
                  step="0.0001"
                  value={formData.lng ?? 108.0}
                  onChange={(e) => handleChange('lng', parseFloat(e.target.value))}
                  placeholder="VD: 108.3283"
                  className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3.5 py-2 text-stone-100 focus:outline-none focus:border-amber-500 font-mono text-xs"
                />
              </div>
            </div>
          </div>

          {/* Visiting Hours & Ticket Price */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="font-semibold text-stone-300 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>Giờ tham quan</span>
              </label>
              <input
                type="text"
                value={formData.visitingHours || ''}
                onChange={(e) => handleChange('visitingHours', e.target.value)}
                placeholder="VD: 07:30 - 17:30 hàng ngày"
                className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-stone-300 flex items-center gap-1.5">
                <Ticket className="w-3.5 h-3.5 text-amber-400" />
                <span>Giá vé tham quan</span>
              </label>
              <input
                type="text"
                value={formData.ticketPrice || ''}
                onChange={(e) => handleChange('ticketPrice', e.target.value)}
                placeholder="VD: 120.000 VNĐ / vé khách Việt Nam"
                className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* History / Description */}
          <div className="space-y-1.5">
            <label className="font-semibold text-stone-300">Mô tả Lịch sử & Câu chuyện Di sản (*)</label>
            <textarea
              rows={4}
              value={formData.history || ''}
              onChange={(e) => handleChange('history', e.target.value)}
              placeholder="Nhập nội dung lịch sử hình thành, giá trị kiến trúc, tư liệu chính sử..."
              required
              className="w-full bg-stone-950 border border-stone-800 rounded-xl p-3.5 text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-500 font-serif leading-relaxed"
            />
          </div>

          {/* Cultural Significance */}
          <div className="space-y-1.5">
            <label className="font-semibold text-stone-300">Ý nghĩa Văn hóa & Tầm vóc Di sản</label>
            <textarea
              rows={2}
              value={formData.culturalSignificance || ''}
              onChange={(e) => handleChange('culturalSignificance', e.target.value)}
              placeholder="VD: Được UNESCO công nhận Di sản Văn hóa Thế giới năm 1999..."
              className="w-full bg-stone-950 border border-stone-800 rounded-xl p-3 text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-500 font-serif"
            />
          </div>

          {/* Interesting Facts */}
          <div className="space-y-2">
            <label className="font-semibold text-stone-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Điểm nổi bật / Sự thật thú vị</span>
            </label>
            <div className="space-y-2">
              {(formData.interestingFacts || []).map((fact, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold text-[10px] shrink-0">
                    {idx + 1}
                  </span>
                  <input
                    type="text"
                    value={fact}
                    onChange={(e) => {
                      const updated = [...(formData.interestingFacts || [])];
                      updated[idx] = e.target.value;
                      handleChange('interestingFacts', updated);
                    }}
                    className="flex-1 bg-stone-950 border border-stone-800 rounded-xl px-3 py-1.5 text-stone-200 text-xs focus:outline-none focus:border-amber-500"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveFact(idx)}
                    className="p-1.5 rounded-lg text-stone-500 hover:text-red-400 hover:bg-red-950/30 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={factInput}
                  onChange={(e) => setFactInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddFact();
                    }
                  }}
                  placeholder="Thêm điểm nổi bật mới..."
                  className="flex-1 bg-stone-950 border border-stone-800 rounded-xl px-3 py-1.5 text-stone-300 text-xs focus:outline-none focus:border-amber-500"
                />
                <button
                  type="button"
                  onClick={handleAddFact}
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
              <span>Lưu Thay Đổi Nội Dung</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
