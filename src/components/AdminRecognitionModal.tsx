import React, { useState, useEffect } from 'react';
import { 
  X, 
  Sparkles, 
  Save, 
  RotateCcw, 
  Plus, 
  Trash2, 
  Edit3, 
  ArrowUp, 
  ArrowDown, 
  Image as ImageIcon, 
  Eye, 
  Check, 
  AlertCircle, 
  Upload, 
  Search, 
  Layers,
  HelpCircle
} from 'lucide-react';
import { RecognitionSectionConfig, RecognitionSampleItem } from '../types';
import { storageService, DEFAULT_RECOGNITION_SECTION_CONFIG } from '../services/storageService';
import { AILandmarkImagePickerModal } from './AILandmarkImagePickerModal';
import { LandmarkPhotoItem } from '../data/landmarkImagesDatabase';

interface AdminRecognitionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaved?: (newConfig: RecognitionSectionConfig) => void;
}

const QUICK_CATEGORY_SUGGESTIONS = [
  'Hoàng thành & Cung điện',
  'Di tích Lịch sử & Giáo dục',
  'Đô thị Cổ & Kiến trúc gỗ',
  'Làng nghề Thủ công Truyền thống',
  'Trang phục Truyền thống',
  'Chùa cổ & Phật giáo',
  'Danh thắng Thiên nhiên',
  'Khảo cổ & Hiện vật Bảo vật Quốc gia',
  'Nhạc cụ & Dân ca Di sản'
];

export const AdminRecognitionModal: React.FC<AdminRecognitionModalProps> = ({
  isOpen,
  onClose,
  onSaved
}) => {
  const [config, setConfig] = useState<RecognitionSectionConfig>(() => storageService.getRecognitionSectionConfig());
  const [activeSubTab, setActiveSubTab] = useState<'samples' | 'header' | 'preview'>('samples');
  
  // Sample editing state
  const [editingSampleIndex, setEditingSampleIndex] = useState<number | null>(null);
  const [sampleDraft, setSampleDraft] = useState<RecognitionSampleItem | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  // Gallery Picker Modal
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  
  // Feedback status
  const [isSaving, setIsSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setConfig(storageService.getRecognitionSectionConfig());
      setEditingSampleIndex(null);
      setSampleDraft(null);
      setIsAddingNew(false);
      setToastMessage(null);
      setErrorMessage(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSaveAll = () => {
    try {
      setIsSaving(true);
      setErrorMessage(null);

      // Validate
      if (!config.title.trim()) {
        setErrorMessage('Tiêu đề chính không được để trống!');
        setIsSaving(false);
        return;
      }
      if (config.samples.length === 0) {
        setErrorMessage('Danh sách ảnh mẫu phải có ít nhất 1 ảnh!');
        setIsSaving(false);
        return;
      }

      const currentUser = storageService.getCurrentUser();
      const saved = storageService.saveRecognitionSectionConfig(config, currentUser.displayName || 'Quản trị viên');
      setConfig(saved);
      showToast('Đã lưu thành công nội dung và danh sách ảnh mẫu!');
      if (onSaved) onSaved(saved);
    } catch (err: any) {
      setErrorMessage(err.message || 'Lỗi khi lưu cấu hình');
    } finally {
      setIsSaving(false);
    }
  };

  const handleResetToDefault = () => {
    if (window.confirm('Bạn có chắc chắn muốn khôi phục lại toàn bộ nội dung và ảnh mẫu gốc về di sản chuẩn của Việt Nam?')) {
      const reset = storageService.resetRecognitionSectionConfig();
      setConfig(reset);
      setEditingSampleIndex(null);
      setSampleDraft(null);
      setIsAddingNew(false);
      showToast('Đã khôi phục về mẫu di sản chuẩn nguyên bản!');
      if (onSaved) onSaved(reset);
    }
  };

  // Sample Items Management
  const handleStartEditSample = (index: number) => {
    setEditingSampleIndex(index);
    setSampleDraft({ ...config.samples[index] });
    setIsAddingNew(false);
  };

  const handleStartAddNewSample = () => {
    const newSample: RecognitionSampleItem = {
      id: `sample-${Date.now()}`,
      title: '',
      category: 'Di tích Lịch sử & Văn hóa',
      url: '',
      prompt: '',
      description: '',
      source: 'Ban biên tập Di sản'
    };
    setSampleDraft(newSample);
    setEditingSampleIndex(config.samples.length);
    setIsAddingNew(true);
  };

  const handleSaveSampleDraft = () => {
    if (!sampleDraft) return;
    if (!sampleDraft.title.trim()) {
      alert('Vui lòng nhập tên di sản / hiện vật');
      return;
    }
    if (!sampleDraft.url.trim()) {
      alert('Vui lòng cung cấp đường dẫn ảnh (URL hoặc chọn từ kho ảnh)');
      return;
    }

    const updatedSamples = [...config.samples];
    if (isAddingNew || editingSampleIndex === null || editingSampleIndex >= updatedSamples.length) {
      updatedSamples.push(sampleDraft);
    } else {
      updatedSamples[editingSampleIndex] = sampleDraft;
    }

    setConfig({
      ...config,
      samples: updatedSamples
    });

    setEditingSampleIndex(null);
    setSampleDraft(null);
    setIsAddingNew(false);
    showToast('Đã cập nhật ảnh mẫu. Hãy bấm "Lưu Thay Đổi Toàn Hệ Thống" để áp dụng.');
  };

  const handleCancelSampleEdit = () => {
    setEditingSampleIndex(null);
    setSampleDraft(null);
    setIsAddingNew(false);
  };

  const handleDeleteSample = (index: number) => {
    const sampleToDelete = config.samples[index];
    if (window.confirm(`Xóa ảnh mẫu "${sampleToDelete.title || 'này'}" khỏi danh sách?`)) {
      const updatedSamples = config.samples.filter((_, idx) => idx !== index);
      setConfig({
        ...config,
        samples: updatedSamples
      });
      if (editingSampleIndex === index) {
        handleCancelSampleEdit();
      }
      showToast('Đã xóa ảnh mẫu.');
    }
  };

  const handleMoveSample = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= config.samples.length) return;
    const updated = [...config.samples];
    const temp = updated[index];
    updated[index] = updated[newIndex];
    updated[newIndex] = temp;
    setConfig({
      ...config,
      samples: updated
    });
  };

  // Image Upload File Handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert('Kích thước ảnh tối đa 5MB');
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      if (sampleDraft) {
        setSampleDraft({
          ...sampleDraft,
          url: base64
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSelectFromPicker = (photo: LandmarkPhotoItem) => {
    if (sampleDraft) {
      setSampleDraft({
        ...sampleDraft,
        title: sampleDraft.title || photo.landmarkName || photo.title,
        category: sampleDraft.category || (photo.tags && photo.tags[0]) || 'Danh thắng Di sản',
        url: photo.imageUrl,
        prompt: sampleDraft.prompt || `Nhận diện ${photo.landmarkName} tại ${photo.cityName}`,
        source: photo.source || photo.photographer || 'Kho ảnh Di sản'
      });
    }
    setIsPickerOpen(false);
    showToast(`Đã chọn ảnh "${photo.landmarkName || photo.title}"`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-5xl bg-stone-900 border border-stone-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-800 bg-stone-950/80 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shadow-inner">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-serif font-bold text-stone-100">
                  Biên Tập Nội Dung & Ảnh Mẫu Nhận Diện AI
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-[10px] font-bold uppercase tracking-wider">
                  Quyền Quản Trị
                </span>
              </div>
              <p className="text-xs text-stone-400">
                Tùy chỉnh tiêu đề, câu lệnh gợi ý và danh sách ảnh mẫu thử nghiệm nhanh một chạm
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Feedback Messages */}
        {toastMessage && (
          <div className="mx-6 mt-3 p-3 bg-emerald-950/90 border border-emerald-500/50 rounded-xl text-emerald-200 text-xs flex items-center gap-2 shadow-lg animate-in fade-in">
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        {errorMessage && (
          <div className="mx-6 mt-3 p-3 bg-red-950/90 border border-red-500/50 rounded-xl text-red-200 text-xs flex items-center gap-2 shadow-lg animate-in fade-in">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Sub-Tab Navigation */}
        <div className="flex items-center gap-2 px-6 pt-3 border-b border-stone-800 bg-stone-900/50 shrink-0">
          <button
            onClick={() => setActiveSubTab('samples')}
            className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
              activeSubTab === 'samples'
                ? 'border-amber-500 text-amber-400 bg-amber-500/5'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Danh Sách Ảnh Mẫu ({config.samples.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('header')}
            className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
              activeSubTab === 'header'
                ? 'border-amber-500 text-amber-400 bg-amber-500/5'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <Edit3 className="w-4 h-4" />
            <span>Tiêu Đề & Lời Dẫn Banner</span>
          </button>

          <button
            onClick={() => setActiveSubTab('preview')}
            className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
              activeSubTab === 'preview'
                ? 'border-amber-500 text-amber-400 bg-amber-500/5'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <Eye className="w-4 h-4" />
            <span>Xem Trước Giao Diện</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">

          {/* TAB 1: SAMPLES MANAGEMENT */}
          {activeSubTab === 'samples' && (
            <div className="space-y-6">
              
              {/* Top Controls */}
              <div className="flex flex-wrap items-center justify-between gap-3 bg-stone-950/60 p-4 rounded-2xl border border-stone-800">
                <div>
                  <h4 className="text-sm font-semibold text-stone-200">
                    Ảnh mẫu thử nghiệm nhận diện một chạm
                  </h4>
                  <p className="text-xs text-stone-400">
                    Người dùng nhấp vào từng thẻ để AI lập tức phân tích và đưa ra thuyết minh lịch sử.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleStartAddNewSample}
                    className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold flex items-center gap-1.5 shadow-md cursor-pointer transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Thêm Ảnh Mẫu Mới</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleResetToDefault}
                    className="px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                    title="Khôi phục về 6 di sản văn hóa chuẩn nguyên bản"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Khôi Phục Chuẩn</span>
                  </button>
                </div>
              </div>

              {/* CARD DRAFT FORM (IF EDITING OR ADDING) */}
              {sampleDraft && (
                <div className="p-5 rounded-2xl bg-amber-950/20 border border-amber-500/40 space-y-4 shadow-xl animate-in fade-in slide-in-from-top-2">
                  <div className="flex items-center justify-between border-b border-amber-500/20 pb-3">
                    <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                      <Edit3 className="w-4 h-4" />
                      <span>{isAddingNew ? 'Thêm Thẻ Ảnh Mẫu Mới' : `Chỉnh Sửa Mẫu: ${sampleDraft.title || 'Chưa đặt tên'}`}</span>
                    </div>
                    <button
                      onClick={handleCancelSampleEdit}
                      className="text-stone-400 hover:text-stone-200 text-xs p-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    {/* Left Inputs */}
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-semibold text-stone-300 mb-1">
                          Tên Di sản / Hiện vật / Cổ phục <span className="text-amber-400">*</span>
                        </label>
                        <input
                          type="text"
                          value={sampleDraft.title}
                          onChange={(e) => setSampleDraft({ ...sampleDraft, title: e.target.value })}
                          placeholder="Ví dụ: Đại Nội Huế (Ngọ Môn)"
                          className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2 text-stone-100 text-xs focus:border-amber-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-stone-300 mb-1">
                          Thể loại / Nhãn phụ <span className="text-amber-400">*</span>
                        </label>
                        <input
                          type="text"
                          value={sampleDraft.category}
                          onChange={(e) => setSampleDraft({ ...sampleDraft, category: e.target.value })}
                          placeholder="Ví dụ: Hoàng thành & Cung điện"
                          className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2 text-stone-100 text-xs focus:border-amber-500 focus:outline-none mb-1.5"
                        />
                        {/* Quick Category Chips */}
                        <div className="flex flex-wrap gap-1">
                          {QUICK_CATEGORY_SUGGESTIONS.slice(0, 5).map(cat => (
                            <button
                              key={cat}
                              type="button"
                              onClick={() => setSampleDraft({ ...sampleDraft, category: cat })}
                              className="text-[10px] px-2 py-0.5 rounded-md bg-stone-800 hover:bg-amber-500/20 text-stone-400 hover:text-amber-300 transition-colors"
                            >
                              {cat}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-stone-300 mb-1">
                          Câu Lệnh Kiểm Thử Cho AI (Prompt)
                        </label>
                        <input
                          type="text"
                          value={sampleDraft.prompt}
                          onChange={(e) => setSampleDraft({ ...sampleDraft, prompt: e.target.value })}
                          placeholder="Ví dụ: Nhận diện Cổng Ngọ Môn - Đại Nội Huế triều Nguyễn"
                          className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2 text-stone-100 text-xs focus:border-amber-500 focus:outline-none"
                        />
                        <p className="text-[10px] text-stone-500 mt-0.5">
                          Lời gợi ý giúp AI nhận dạng đúng góc máy hoặc triều đại lịch sử.
                        </p>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-stone-300 mb-1">
                          Mô tả / Bối cảnh văn hóa
                        </label>
                        <textarea
                          rows={2}
                          value={sampleDraft.description || ''}
                          onChange={(e) => setSampleDraft({ ...sampleDraft, description: e.target.value })}
                          placeholder="Ghi chú ngắn về bối cảnh xây dựng hoặc giá trị biểu tượng..."
                          className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2 text-stone-100 text-xs focus:border-amber-500 focus:outline-none resize-none"
                        />
                      </div>
                    </div>

                    {/* Right Image Input & Preview */}
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-semibold text-stone-300 mb-1">
                          Đường dẫn ảnh (URL) <span className="text-amber-400">*</span>
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={sampleDraft.url}
                            onChange={(e) => setSampleDraft({ ...sampleDraft, url: e.target.value })}
                            placeholder="https://upload.wikimedia.org/..."
                            className="flex-1 bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2 text-stone-100 text-xs focus:border-amber-500 focus:outline-none"
                          />
                        </div>
                      </div>

                      {/* Photo Actions: Gallery Picker & File Upload */}
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setIsPickerOpen(true)}
                          className="flex-1 py-2 px-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-400 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                        >
                          <Search className="w-3.5 h-3.5" />
                          <span>Chọn từ Kho Ảnh Di Sản</span>
                        </button>

                        <label className="flex-1 py-2 px-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer text-center">
                          <Upload className="w-3.5 h-3.5" />
                          <span>Tải ảnh tệp</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileUpload}
                            className="hidden"
                          />
                        </label>
                      </div>

                      {/* Live Image Preview */}
                      <div className="relative rounded-xl overflow-hidden bg-stone-950 border border-stone-800 h-40 flex items-center justify-center">
                        {sampleDraft.url ? (
                          <img
                            src={sampleDraft.url}
                            alt="Preview"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = 'none';
                            }}
                          />
                        ) : (
                          <div className="text-center p-4 text-stone-500">
                            <ImageIcon className="w-8 h-8 mx-auto mb-1 opacity-50" />
                            <p className="text-xs">Chưa có ảnh xem trước</p>
                          </div>
                        )}
                        {sampleDraft.url && (
                          <div className="absolute bottom-2 left-2 right-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-lg text-[10px] text-stone-300 truncate">
                            {sampleDraft.url}
                          </div>
                        )}
                      </div>

                      {/* Draft Action Buttons */}
                      <div className="flex items-center justify-end gap-2 pt-2">
                        <button
                          type="button"
                          onClick={handleCancelSampleEdit}
                          className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold cursor-pointer"
                        >
                          Hủy
                        </button>
                        <button
                          type="button"
                          onClick={handleSaveSampleDraft}
                          className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md"
                        >
                          <Check className="w-4 h-4" />
                          <span>Lưu Thẻ Này</span>
                        </button>
                      </div>

                    </div>

                  </div>
                </div>
              )}

              {/* SAMPLES GRID LIST */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {config.samples.map((sample, index) => (
                  <div
                    key={sample.id || index}
                    className={`relative rounded-2xl overflow-hidden border transition-all bg-stone-950 ${
                      editingSampleIndex === index
                        ? 'border-amber-500 ring-2 ring-amber-500/20'
                        : 'border-stone-800 hover:border-stone-700'
                    }`}
                  >
                    {/* Image Preview Container */}
                    <div className="relative h-28 w-full bg-stone-900 overflow-hidden">
                      <img
                        src={sample.url}
                        alt={sample.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=600&q=80';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent opacity-80" />
                      <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-stone-900/80 backdrop-blur-sm text-[10px] font-bold text-amber-400 border border-stone-700">
                        #{index + 1}
                      </div>

                      {/* Move Up/Down Quick Controls */}
                      <div className="absolute top-2 right-2 flex items-center gap-1 bg-stone-950/80 rounded-lg p-1 border border-stone-800">
                        <button
                          type="button"
                          disabled={index === 0}
                          onClick={() => handleMoveSample(index, 'up')}
                          className="p-1 text-stone-400 hover:text-stone-100 disabled:opacity-30"
                          title="Di chuyển lên trước"
                        >
                          <ArrowUp className="w-3 h-3" />
                        </button>
                        <button
                          type="button"
                          disabled={index === config.samples.length - 1}
                          onClick={() => handleMoveSample(index, 'down')}
                          className="p-1 text-stone-400 hover:text-stone-100 disabled:opacity-30"
                          title="Di chuyển xuống sau"
                        >
                          <ArrowDown className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    {/* Card Content & Action Bar */}
                    <div className="p-3.5 space-y-2">
                      <div>
                        <h5 className="text-xs font-bold text-stone-100 line-clamp-1">
                          {sample.title || 'Chưa đặt tiêu đề'}
                        </h5>
                        <p className="text-[11px] text-amber-400 line-clamp-1">
                          {sample.category}
                        </p>
                      </div>

                      <p className="text-[10px] text-stone-400 line-clamp-2 italic bg-stone-900/60 p-1.5 rounded-lg border border-stone-800/80">
                        "{sample.prompt || 'Chưa có câu lệnh prompt'}"
                      </p>

                      <div className="flex items-center justify-between pt-2 border-t border-stone-800">
                        <span className="text-[10px] text-stone-500 truncate max-w-[120px]">
                          {sample.source || 'Wikimedia Commons'}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleStartEditSample(index)}
                            className="px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer"
                          >
                            <Edit3 className="w-3 h-3 text-amber-400" />
                            <span>Sửa</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteSample(index)}
                            className="p-1.5 rounded-lg bg-stone-900 hover:bg-red-950/60 text-stone-500 hover:text-red-400 transition-colors cursor-pointer"
                            title="Xóa mẫu này"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>

                  </div>
                ))}
              </div>

            </div>
          )}

          {/* TAB 2: BANNER HEADER CONFIG */}
          {activeSubTab === 'header' && (
            <div className="space-y-5 max-w-2xl mx-auto bg-stone-950/60 p-6 rounded-2xl border border-stone-800">
              <div>
                <h4 className="text-sm font-semibold text-stone-100 mb-1">
                  Cấu hình Tiêu đề & Lời dẫn Banner
                </h4>
                <p className="text-xs text-stone-400">
                  Nội dung hiển thị ở phần giới thiệu của Mô-đun Nhận Diện Di Sản
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1.5 uppercase tracking-wider">
                  Huy hiệu / Badge nổi bật
                </label>
                <input
                  type="text"
                  value={config.badge}
                  onChange={(e) => setConfig({ ...config, badge: e.target.value })}
                  placeholder="Thị giác Máy tính & AI Văn hóa Việt Nam"
                  className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3.5 py-2.5 text-stone-100 text-xs sm:text-sm focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1.5 uppercase tracking-wider">
                  Tiêu đề chính (H2 Heading)
                </label>
                <input
                  type="text"
                  value={config.title}
                  onChange={(e) => setConfig({ ...config, title: e.target.value })}
                  placeholder="Nhận diện Di sản, Hiện vật & Cổ phục"
                  className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3.5 py-2.5 text-stone-100 text-xs sm:text-sm focus:border-amber-500 focus:outline-none font-serif"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1.5 uppercase tracking-wider">
                  Mô tả / Hướng dẫn thao tác
                </label>
                <textarea
                  rows={3}
                  value={config.description}
                  onChange={(e) => setConfig({ ...config, description: e.target.value })}
                  placeholder="Chụp ảnh trực tiếp hoặc tải hình ảnh di tích, đình chùa, làng nghề, nhạc cụ, cổ phục để AI phân tích tức thì."
                  className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3.5 py-2.5 text-stone-100 text-xs sm:text-sm focus:border-amber-500 focus:outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1.5 uppercase tracking-wider">
                  Tiêu đề danh sách mẫu thử nghiệm
                </label>
                <input
                  type="text"
                  value={config.samplesLabel}
                  onChange={(e) => setConfig({ ...config, samplesLabel: e.target.value })}
                  placeholder="ẢNH MẪU THỬ NGHIỆM NHANH MỘT CHẠM:"
                  className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3.5 py-2.5 text-stone-100 text-xs sm:text-sm focus:border-amber-500 focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* TAB 3: LIVE PREVIEW */}
          {activeSubTab === 'preview' && (
            <div className="space-y-6">
              <div className="bg-stone-950/80 p-4 rounded-2xl border border-stone-800 text-xs text-stone-400 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Eye className="w-4 h-4 text-amber-400" />
                  Mô phỏng trực tiếp cách người dùng nhìn thấy phần này trên website:
                </span>
                <span className="text-[11px] text-amber-300 font-semibold">
                  {config.samples.length} thẻ mẫu hiển thị
                </span>
              </div>

              {/* MOCK PREVIEW SECTION */}
              <div className="bg-stone-950 border border-stone-800 rounded-3xl p-6 sm:p-8 shadow-inner">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-8">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold mb-3">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{config.badge}</span>
                  </div>
                  <h2 className="text-2xl sm:text-4xl font-serif font-bold text-stone-100">
                    {config.title}
                  </h2>
                  <p className="text-stone-300 text-sm sm:text-base mt-2">
                    {config.description}
                  </p>
                </div>

                {/* Preset Samples */}
                <div className="mb-4">
                  <p className="text-xs font-semibold text-amber-300 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{config.samplesLabel}</span>
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                    {config.samples.map((sample, idx) => (
                      <div
                        key={idx}
                        className="group relative rounded-xl overflow-hidden border border-stone-800 hover:border-amber-400/60 transition-all text-left bg-stone-900 shadow-md"
                      >
                        <div className="h-20 w-full overflow-hidden relative">
                          <img 
                            src={sample.url} 
                            alt={sample.title} 
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent opacity-80" />
                        </div>
                        <div className="p-2 bg-stone-900">
                          <p className="text-xs font-semibold text-stone-200 line-clamp-1 group-hover:text-amber-300">
                            {sample.title}
                          </p>
                          <p className="text-[10px] text-stone-400 line-clamp-1">{sample.category}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-stone-800 bg-stone-950/90 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 text-xs text-stone-500">
            {config.lastUpdated && (
              <span>Cập nhật lần cuối: {new Date(config.lastUpdated).toLocaleDateString('vi-VN')}</span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold transition-colors cursor-pointer"
            >
              Đóng
            </button>
            <button
              type="button"
              disabled={isSaving}
              onClick={handleSaveAll}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-bold text-xs sm:text-sm shadow-lg shadow-amber-950/40 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? 'Đang lưu...' : 'Lưu Thay Đổi (Cập Nhật Toàn Web)'}</span>
            </button>
          </div>
        </div>

      </div>

      {/* Embedded Landmark Image Picker Modal */}
      {isPickerOpen && (
        <AILandmarkImagePickerModal
          isOpen={isPickerOpen}
          onClose={() => setIsPickerOpen(false)}
          initialQuery={sampleDraft?.title || ''}
          initialLandmarkName={sampleDraft?.title || ''}
          onSelectPhoto={handleSelectFromPicker}
        />
      )}
    </div>
  );
};
