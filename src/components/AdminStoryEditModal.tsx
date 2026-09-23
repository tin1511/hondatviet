import React, { useState, useEffect } from 'react';
import { 
  X, 
  Save, 
  Sparkles, 
  BookOpen, 
  ShieldCheck, 
  RefreshCw, 
  Loader2, 
  CheckCircle2, 
  Edit3,
  FileText
} from 'lucide-react';
import { HeritageItem, HeritageStory, StoryMode } from '../types';
import { storageService } from '../services/storageService';
import { aiService } from '../services/aiService';

interface AdminStoryEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  heritage: HeritageItem;
  initialMode?: StoryMode;
  currentStory?: HeritageStory | null;
  onSaved?: (story: HeritageStory) => void;
}

export const AdminStoryEditModal: React.FC<AdminStoryEditModalProps> = ({
  isOpen,
  onClose,
  heritage,
  initialMode = 'student',
  currentStory,
  onSaved
}) => {
  const [selectedMode, setSelectedMode] = useState<StoryMode>(initialMode);
  const [title, setTitle] = useState('');
  const [storyText, setStoryText] = useState('');
  const [historicalContext, setHistoricalContext] = useState('');
  const [distinctionNote, setDistinctionNote] = useState('');
  const [sourcesText, setSourcesText] = useState('');
  
  const [loadingAi, setLoadingAi] = useState(false);
  const [isSavedSuccess, setIsSavedSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const audienceModes: { id: StoryMode; label: string; icon: string }[] = [
    { id: 'children', label: 'Trẻ em', icon: '👦' },
    { id: 'student', label: 'Học sinh', icon: '🎒' },
    { id: 'university', label: 'Sinh viên', icon: '🎓' },
    { id: 'adult', label: 'Người lớn', icon: '☕' },
    { id: 'foreigner', label: 'Khách quốc tế (EN)', icon: '🌐' },
  ];

  // Load existing story or custom override whenever heritage or selectedMode changes
  useEffect(() => {
    if (!isOpen) return;
    
    setErrorMsg(null);
    setIsSavedSuccess(false);

    // Check if custom override exists
    const custom = storageService.getCustomStory(heritage.id || heritage.name, selectedMode);
    
    if (custom) {
      setTitle(custom.title || `Hành trình khám phá ${heritage.name}`);
      setStoryText(custom.storyText || '');
      setHistoricalContext(custom.historicalContext || '');
      setDistinctionNote(custom.distinctionNote || '');
      setSourcesText((custom.sourceReferences || []).join('\n'));
    } else if (currentStory && currentStory.mode === selectedMode) {
      setTitle(currentStory.title || `Hành trình khám phá ${heritage.name}`);
      setStoryText(currentStory.storyText || '');
      setHistoricalContext(currentStory.historicalContext || '');
      setDistinctionNote(currentStory.distinctionNote || '');
      setSourcesText((currentStory.sourceReferences || []).join('\n'));
    } else {
      // Auto-populate default template or trigger AI
      setTitle(`Hành trình văn hóa ${heritage.name}`);
      setStoryText(`${heritage.name} thuộc vùng đất ${heritage.province}, nơi ghi dấu ấn ${heritage.history || 'lịch sử lâu đời'}.`);
      setHistoricalContext(`Xác minh niên đại: ${heritage.period || 'Đang cập nhật'}. Di sản có giá trị văn hóa lịch sử quốc gia.`);
      setDistinctionNote(`Chính sử xác nhận nền tảng kiến trúc ${heritage.period}. Các truyền thuyết dân gian bổ sung vẻ đẹp linh thiêng.`);
      setSourcesText('Sử ký Toàn thư\nTư liệu Cục Di sản Văn hóa Việt Nam');
    }
  }, [isOpen, heritage, selectedMode, currentStory]);

  if (!isOpen) return null;

  const handleGenerateWithAi = async () => {
    setLoadingAi(true);
    setErrorMsg(null);
    try {
      const generated = await aiService.generateStory({
        heritageName: heritage.name,
        category: heritage.categoryLabel,
        region: heritage.region,
        history: heritage.history,
        period: heritage.period,
        mode: selectedMode,
        language: selectedMode === 'foreigner' ? 'en' : 'vi'
      });

      setTitle(generated.title || `Hành trình văn hóa ${heritage.name}`);
      setStoryText(generated.storyText || '');
      setHistoricalContext(generated.historicalContext || '');
      setDistinctionNote(generated.distinctionNote || '');
      setSourcesText((generated.sourceReferences || []).join('\n'));
    } catch (err: any) {
      setErrorMsg('Không thể sinh văn bản AI: ' + (err.message || 'Lỗi kết nối'));
    } finally {
      setLoadingAi(false);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!storyText.trim()) {
      setErrorMsg('Vui lòng nhập nội dung câu chuyện kể.');
      return;
    }

    const sourcesArray = sourcesText
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    const newCustomStory: HeritageStory = {
      heritageId: heritage.id || heritage.name.toLowerCase().replace(/\s+/g, '-'),
      heritageName: heritage.name,
      mode: selectedMode,
      title: title.trim() || `Di sản ${heritage.name}`,
      storyText: storyText.trim(),
      historicalContext: historicalContext.trim(),
      distinctionNote: distinctionNote.trim(),
      sourceReferences: sourcesArray.length > 0 ? sourcesArray : ['Cục Di sản Văn hóa & Ban Quản lý Di tích']
    };

    storageService.saveCustomStory(newCustomStory);
    setIsSavedSuccess(true);
    if (onSaved) {
      onSaved(newCustomStory);
    }

    setTimeout(() => {
      setIsSavedSuccess(false);
      onClose();
    }, 1200);
  };

  const handleResetToDefault = () => {
    if (window.confirm(`Xóa bản chỉnh sửa câu chuyện này và dùng bản AI sinh tự động cho đối tượng "${audienceModes.find(m => m.id === selectedMode)?.label}"?`)) {
      storageService.deleteCustomStory(heritage.id || heritage.name, selectedMode);
      handleGenerateWithAi();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-stone-900 border border-amber-500/30 rounded-3xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
        
        {/* Header */}
        <div className="p-5 bg-stone-950 border-b border-stone-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold">
              <Edit3 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-stone-100 text-lg flex items-center gap-2">
                <span>Chỉnh Sửa Nội Dung Kể Chuyện AI</span>
                <span className="text-xs px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Admin
                </span>
              </h3>
              <p className="text-xs text-stone-400 mt-0.5">
                Di sản: <strong className="text-amber-200">{heritage.name}</strong> ({heritage.province})
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-stone-800 text-stone-400 hover:text-stone-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-5 flex-1">
          
          {/* Audience Mode Switcher */}
          <div>
            <label className="block text-xs font-semibold text-amber-300 uppercase tracking-wider mb-2">
              Chọn đối tượng áp dụng chỉnh sửa:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {audienceModes.map((m) => (
                <button
                  type="button"
                  key={m.id}
                  onClick={() => setSelectedMode(m.id)}
                  className={`p-2.5 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    selectedMode === m.id
                      ? 'bg-amber-500 text-stone-950 border-amber-400 shadow-md'
                      : 'bg-stone-950 border-stone-800 text-stone-400 hover:text-stone-200 hover:bg-stone-800'
                  }`}
                >
                  <span>{m.icon}</span>
                  <span>{m.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* AI Generator Banner Button */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-950/40 via-amber-900/20 to-stone-900 border border-amber-500/40 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-amber-200">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Dùng AI Gemini sinh văn bản gợi ý chuẩn xác theo đối tượng đã chọn</span>
            </div>
            <button
              type="button"
              onClick={handleGenerateWithAi}
              disabled={loadingAi}
              className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center gap-1.5 shadow transition-all cursor-pointer disabled:opacity-50 shrink-0"
            >
              {loadingAi ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
              <span>{loadingAi ? 'AI Đang Viết...' : 'AI Viết Lại Văn Bản'}</span>
            </button>
          </div>

          {/* Error / Success Notices */}
          {errorMsg && (
            <div className="p-3 rounded-xl bg-red-950/50 border border-red-500/30 text-red-300 text-xs">
              {errorMsg}
            </div>
          )}

          {isSavedSuccess && (
            <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 text-xs flex items-center gap-2 animate-bounce">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Đã lưu nội dung câu chuyện thành công! Áp dụng ngay lập tức cho người dùng.</span>
            </div>
          )}

          {/* Story Title */}
          <div>
            <label className="block text-xs font-semibold text-stone-300 mb-1">
              Tựa Đề Câu Chuyện Kể <span className="text-amber-400">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="VD: Tiếng vọng ngàn năm Hoàng thành Thăng Long..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-100 text-xs focus:outline-none focus:border-amber-500 transition-colors"
              required
            />
          </div>

          {/* Main Story Text */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold text-stone-300">
                Nội Dung Lời Kể Chuyện AI <span className="text-amber-400">*</span>
              </label>
              <span className="text-[11px] text-stone-500 font-mono">
                {storyText.length} ký tự
              </span>
            </div>
            <textarea
              rows={6}
              value={storyText}
              onChange={(e) => setStoryText(e.target.value)}
              placeholder="Nhập nội dung lời kể chi tiết, cảm xúc, giàu hình ảnh truyền cảm hứng..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-100 text-xs focus:outline-none focus:border-amber-500 transition-colors leading-relaxed font-sans"
              required
            />
          </div>

          {/* Historical Context */}
          <div>
            <label className="block text-xs font-semibold text-stone-300 mb-1 flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              <span>Bối Cảnh Lịch Sử & Niên Đại (Xác minh chính sử)</span>
            </label>
            <textarea
              rows={2}
              value={historicalContext}
              onChange={(e) => setHistoricalContext(e.target.value)}
              placeholder="Mô tả bối cảnh xây dựng, triều đại, niên đại cổ..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-100 text-xs focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>

          {/* Distinction Note */}
          <div>
            <label className="block text-xs font-semibold text-stone-300 mb-1 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-red-400" />
              <span>Ghi Chú Phân Biệt "Chính Sử vs Huyền Tích Dân Gian"</span>
            </label>
            <textarea
              rows={2}
              value={distinctionNote}
              onChange={(e) => setDistinctionNote(e.target.value)}
              placeholder="Rạch ròi giữa tư liệu sử học và truyền thuyết linh thiêng..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-100 text-xs focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>

          {/* Source References */}
          <div>
            <label className="block text-xs font-semibold text-stone-300 mb-1">
              Nguồn Trích Dẫn Sử Liệu (Mỗi nguồn 1 dòng)
            </label>
            <textarea
              rows={2}
              value={sourcesText}
              onChange={(e) => setSourcesText(e.target.value)}
              placeholder="Đại Việt Sử Ký Toàn Thư&#10;Tư liệu Viện Sử Học Việt Nam"
              className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-100 text-xs focus:outline-none focus:border-amber-500 transition-colors font-mono text-[11px]"
            />
          </div>

          {/* Modal Footer Controls */}
          <div className="pt-3 border-t border-stone-800 flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleResetToDefault}
              className="px-3 py-2 rounded-xl bg-stone-950 hover:bg-stone-800 border border-stone-800 text-stone-400 hover:text-stone-200 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Khôi Phục AI Mặc Định</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold transition-all cursor-pointer"
              >
                Hủy Bỏ
              </button>

              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-stone-950 font-bold text-xs flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Lưu Nội Dung Câu Chuyện</span>
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
};
