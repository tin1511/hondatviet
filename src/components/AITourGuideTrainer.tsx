import React, { useState, useEffect } from 'react';
import { 
  Compass, 
  Sparkles, 
  Save, 
  RotateCcw, 
  CheckCircle, 
  Plus, 
  Trash2, 
  ShieldCheck, 
  Send, 
  Volume2, 
  Square, 
  Camera, 
  Utensils, 
  Eye, 
  MessageSquareQuote,
  GraduationCap,
  Award,
  RefreshCw,
  UserCheck
} from 'lucide-react';
import { storageService } from '../services/storageService';
import { aiService } from '../services/aiService';
import { AITourGuideConfig, HeritageItem } from '../types';

const SAMPLE_AVATARS = [
  { label: 'Bảo An (Nữ - Truyền thống)', url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80' },
  { label: 'Hương Trà (Nữ - Cố đô)', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80' },
  { label: 'Minh Khang (Nam - Thanh lịch)', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80' },
  { label: 'Thanh Tùng (Nam - Năng động)', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80' }
];

export const AITourGuideTrainer: React.FC = () => {
  const [config, setConfig] = useState<AITourGuideConfig>(storageService.getTourGuideConfig());
  const [heritages] = useState<HeritageItem[]>(storageService.getHeritages());
  const [newSpecialty, setNewSpecialty] = useState('');
  const [newEtiquette, setNewEtiquette] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Live Simulator State
  const [selectedHeritageId, setSelectedHeritageId] = useState<string>(heritages[0]?.id || 'hue-monuments');
  const [simMessages, setSimMessages] = useState<Array<{ role: 'user' | 'assistant'; text: string }>>([]);
  const [simInput, setSimInput] = useState('');
  const [isSimLoading, setIsSimLoading] = useState(false);
  const [speakingIdx, setSpeakingIdx] = useState<number | null>(null);

  useEffect(() => {
    // Fetch latest from server
    storageService.fetchTourGuideConfig().then(latest => {
      setConfig(latest);
    });
  }, []);

  const currentSelectedHeritage = heritages.find(h => h.id === selectedHeritageId) || heritages[0];

  const handleAddSpecialty = () => {
    if (!newSpecialty.trim()) return;
    setConfig(prev => ({
      ...prev,
      specialties: [...prev.specialties, newSpecialty.trim()]
    }));
    setNewSpecialty('');
  };

  const handleRemoveSpecialty = (idx: number) => {
    setConfig(prev => ({
      ...prev,
      specialties: prev.specialties.filter((_, i) => i !== idx)
    }));
  };

  const handleAddEtiquette = () => {
    if (!newEtiquette.trim()) return;
    setConfig(prev => ({
      ...prev,
      etiquetteRules: [...prev.etiquetteRules, newEtiquette.trim()]
    }));
    setNewEtiquette('');
  };

  const handleRemoveEtiquette = (idx: number) => {
    setConfig(prev => ({
      ...prev,
      etiquetteRules: prev.etiquetteRules.filter((_, i) => i !== idx)
    }));
  };

  const handleSave = () => {
    storageService.saveTourGuideConfig(config);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleReset = () => {
    if (window.confirm('Bạn có chắc muốn khôi phục cấu hình Hướng Dẫn Viên AI về mặc định chuẩn quốc gia?')) {
      storageService.resetTourGuideConfig();
      const def = storageService.getTourGuideConfig();
      setConfig(def);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  // Run Simulator prompt
  const handleSendSim = async (customPrompt?: string) => {
    const q = customPrompt || simInput;
    if (!q.trim() || isSimLoading) return;

    const userMessage = { role: 'user' as const, text: q };
    const updatedMessages = [...simMessages, userMessage];
    setSimMessages(updatedMessages);
    if (!customPrompt) setSimInput('');
    setIsSimLoading(true);

    try {
      const convHistory = simMessages.map(m => ({
        role: m.role === 'user' ? 'user' as const : 'model' as const,
        text: m.text
      }));

      const reply = await aiService.chatWithAssistant({
        message: q,
        conversationHistory: convHistory,
        currentHeritageContext: currentSelectedHeritage,
        language: 'vi',
        isTourGuideMode: true
      });

      setSimMessages(prev => [...prev, { role: 'assistant', text: reply }]);
    } catch (err) {
      setSimMessages(prev => [
        ...prev, 
        { 
          role: 'assistant', 
          text: `Dạ em là ${config.guideName}! Rất tiếc hệ thống kiểm thử AI đang bận. Em vẫn ghi nhận câu hỏi và sẵn sàng thuyết minh về "${currentSelectedHeritage?.name || 'Di sản Việt Nam'}" cho quý đoàn!` 
        }
      ]);
    } finally {
      setIsSimLoading(false);
    }
  };

  const handleSpeakSim = (idx: number, text: string) => {
    if (speakingIdx === idx) {
      aiService.stopSpeaking();
      setSpeakingIdx(null);
    } else {
      setSpeakingIdx(idx);
      aiService.speakText(text, {
        lang: 'vi-VN',
        onEnd: () => setSpeakingIdx(null)
      });
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-amber-950/60 via-stone-900 to-stone-900 border border-amber-500/30 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-wrap items-center justify-between gap-4 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-semibold">
              <Compass className="w-3.5 h-3.5 text-amber-400" />
              <span>Tour Guide Studio • Huấn Luyện Thuyết Minh Viên AI</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-100">
              Huấn Luyện AI Làm Hướng Dẫn Viên Du Lịch
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              Thiết lập nhân cách, giọng điệu, quy tắc văn minh di sản, và nạp các mẹo địa phương độc quyền để AI trở thành người bạn đồng hành sống động của du khách tại mỗi điểm đến.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleReset}
              className="px-4 py-2.5 rounded-xl border border-stone-700 bg-stone-900 hover:bg-stone-800 text-stone-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5 text-stone-400" />
              <span>Khôi Phục Gốc</span>
            </button>
            <button
              onClick={handleSave}
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold flex items-center gap-2 shadow-lg shadow-amber-950/40 transition-all hover:scale-[1.02] cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Lưu Cấu Hình Huấn Luyện</span>
            </button>
          </div>
        </div>

        {saveSuccess && (
          <div className="mt-4 p-3 bg-emerald-950/80 border border-emerald-500/40 rounded-xl text-emerald-200 text-xs flex items-center gap-2 animate-fadeIn">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="font-semibold">
              Đã lưu thành công cấu hình và đồng bộ tri thức Huấn Luyện Hướng Dẫn Viên AI lên hệ thống máy chủ!
            </span>
          </div>
        )}
      </div>

      {/* Main Grid: Left = Training Config Forms, Right = Interactive Simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: TRAINING CONFIGURATION */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Card 1: Persona & Profile */}
          <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 shadow-xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                  <UserCheck className="w-4 h-4" />
                </div>
                <h4 className="text-base font-serif font-bold text-stone-100">
                  1. Hồ Sơ & Nhân Cách Thuyết Minh Viên
                </h4>
              </div>
              <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-stone-800 text-stone-400 font-mono">
                Persona Identity
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                  Tên Hướng Dẫn Viên:
                </label>
                <input
                  type="text"
                  value={config.guideName}
                  onChange={(e) => setConfig({ ...config, guideName: e.target.value })}
                  placeholder="Ví dụ: Bảo An, Hương Trà..."
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-stone-100 focus:outline-none focus:border-amber-500 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                  Số năm kinh nghiệm dẫn đoàn:
                </label>
                <input
                  type="number"
                  min="1"
                  max="40"
                  value={config.experienceYears}
                  onChange={(e) => setConfig({ ...config, experienceYears: Number(e.target.value) || 1 })}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-stone-100 focus:outline-none focus:border-amber-500 font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                Chức Danh Thuyết Minh Viên (Hiển thị trên thẻ):
              </label>
              <input
                type="text"
                value={config.title}
                onChange={(e) => setConfig({ ...config, title: e.target.value })}
                placeholder="Ví dụ: Thuyết Minh Viên Di Sản & Hướng Dẫn Viên Văn Hóa Quốc Gia"
                className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-stone-100 focus:outline-none focus:border-amber-500 font-medium"
              />
            </div>

            {/* Avatar Selection */}
            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                Ảnh Đại Diện Thuyết Minh Viên:
              </label>
              <div className="flex items-center gap-3 mb-3">
                <img 
                  src={config.avatarUrl} 
                  alt={config.guideName} 
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-amber-500/50 shadow-md"
                />
                <input
                  type="text"
                  value={config.avatarUrl}
                  onChange={(e) => setConfig({ ...config, avatarUrl: e.target.value })}
                  placeholder="URL ảnh chân dung..."
                  className="flex-1 bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-stone-100 focus:outline-none focus:border-amber-500"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {SAMPLE_AVATARS.map((av, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setConfig({ ...config, avatarUrl: av.url })}
                    className={`text-[11px] px-2.5 py-1 rounded-lg border transition-colors ${
                      config.avatarUrl === av.url 
                        ? 'bg-amber-500/20 border-amber-500/60 text-amber-300 font-semibold'
                        : 'bg-stone-950 border-stone-800 text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    {av.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Speaking Style */}
            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-2">
                Phong Cách Thuyết Minh & Giọng Điệu:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  { key: 'warm_friendly', title: 'Thân Thiện & Mộc Mạc', desc: 'Gần gũi, xưng em hoặc tôi, đón tiếp ân cần như người quen bản xứ.' },
                  { key: 'epic_heroic', title: 'Hào Hùng Sử Thi', desc: 'Khơi dậy lòng yêu nước, tôn vinh chiến tích và khí phách tiền nhân.' },
                  { key: 'scholarly', title: 'Uyên Bác & Khảo Cổ', desc: 'Tập trung văn bia Hán Nôm, kiến trúc, niên đại và thẩm định chính sử.' },
                  { key: 'poetic', title: 'Trữ Tình & Thơ Ca', desc: 'Giọng điệu lắng đọng, giàu hình ảnh, dẫn dắt chạm tới cảm xúc hoài niệm.' }
                ].map((st) => (
                  <label
                    key={st.key}
                    onClick={() => setConfig({ ...config, speakingStyle: st.key as any })}
                    className={`p-3 rounded-2xl border cursor-pointer transition-all block ${
                      config.speakingStyle === st.key
                        ? 'bg-amber-950/40 border-amber-500 text-stone-100 shadow-md'
                        : 'bg-stone-950/70 border-stone-800 text-stone-400 hover:border-stone-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-amber-300">{st.title}</span>
                      <input
                        type="radio"
                        name="speakingStyle"
                        checked={config.speakingStyle === st.key}
                        onChange={() => setConfig({ ...config, speakingStyle: st.key as any })}
                        className="accent-amber-500"
                      />
                    </div>
                    <p className="text-[11px] text-stone-400 leading-tight">{st.desc}</p>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Card 2: Welcome Greeting */}
          <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-stone-800">
              <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                <MessageSquareQuote className="w-4 h-4" />
              </div>
              <h4 className="text-base font-serif font-bold text-stone-100">
                2. Lời Chào Mở Màn Đón Đoàn
              </h4>
            </div>

            <p className="text-xs text-stone-400">
              Câu chào đầu tiên mà Hướng dẫn viên AI gửi tới du khách khi bắt đầu phiên hướng dẫn:
            </p>

            <textarea
              rows={3}
              value={config.welcomeGreeting}
              onChange={(e) => setConfig({ ...config, welcomeGreeting: e.target.value })}
              className="w-full bg-stone-950 border border-stone-800 rounded-2xl p-3.5 text-xs text-stone-100 focus:outline-none focus:border-amber-500 leading-relaxed font-sans"
              placeholder="Dạ, em xin kính chào quý cô bác, anh chị trong đoàn..."
            />
          </div>

          {/* Card 3: Etiquette & Rules */}
          <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h4 className="text-base font-serif font-bold text-stone-100">
                  3. Bộ Quy Tắc Văn Minh Di Sản Bắt Buộc Nhắc Nhở
                </h4>
              </div>
              <span className="text-xs text-emerald-400 font-semibold">
                {config.etiquetteRules.length} Quy tắc
              </span>
            </div>

            <p className="text-xs text-stone-400">
              AI sẽ luôn lồng ghép các quy tắc này vào lời dặn dò khi du khách bước vào không gian tôn nghiêm:
            </p>

            <div className="space-y-2">
              {config.etiquetteRules.map((rule, idx) => (
                <div 
                  key={idx} 
                  className="flex items-start justify-between gap-3 p-2.5 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-200"
                >
                  <div className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-md bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{rule}</span>
                  </div>
                  <button
                    onClick={() => handleRemoveEtiquette(idx)}
                    className="text-stone-500 hover:text-red-400 p-1 transition-colors shrink-0"
                    title="Xóa quy tắc này"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex gap-2 pt-2">
              <input
                type="text"
                value={newEtiquette}
                onChange={(e) => setNewEtiquette(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddEtiquette()}
                placeholder="Nhập quy tắc mới (ví dụ: Không dùng đèn flash khi chụp tranh cổ)..."
                className="flex-1 bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2 text-xs text-stone-100 focus:outline-none focus:border-amber-500"
              />
              <button
                type="button"
                onClick={handleAddEtiquette}
                className="px-3 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold flex items-center gap-1 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Thêm</span>
              </button>
            </div>
          </div>

          {/* Card 4: Local Secrets & Custom Knowledge Prompt */}
          <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h4 className="text-base font-serif font-bold text-stone-100">
                  4. Tri Thức Độc Quyền & Mẹo Dẫn Tour Bản Địa (Admin Prompt Injection)
                </h4>
              </div>
            </div>

            <p className="text-xs text-stone-400">
              Tại đây quản trị viên có thể huấn luyện thêm các bí kíp thực địa: góc chụp ảnh không ngược sáng, quán bún bò gia truyền không chặt chém, giờ tham quan vắng vẻ... AI sẽ ghi nhớ sâu sắc để tư vấn cho du khách:
            </p>

            <textarea
              rows={6}
              value={config.customKnowledgePrompt}
              onChange={(e) => setConfig({ ...config, customKnowledgePrompt: e.target.value })}
              className="w-full bg-stone-950 border border-stone-800 rounded-2xl p-3.5 text-xs text-stone-100 focus:outline-none focus:border-amber-500 leading-relaxed font-mono"
              placeholder="Nhập các mẹo và tri thức huấn luyện chuyên sâu cho AI..."
            />
          </div>

        </div>

        {/* RIGHT COLUMN: INTERACTIVE SIMULATOR & TEST ARENA */}
        <div className="lg:col-span-5 space-y-6">
          <div className="sticky top-24 bg-stone-900 border border-amber-500/30 rounded-3xl p-6 shadow-2xl space-y-4">
            
            {/* Simulator Header */}
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img 
                    src={config.avatarUrl} 
                    alt={config.guideName}
                    className="w-11 h-11 rounded-2xl object-cover border border-amber-500/50 shadow"
                  />
                  <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-stone-900 absolute -bottom-1 -right-1" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-stone-100 flex items-center gap-1.5 font-serif">
                    <span>{config.guideName}</span>
                    <span className="text-[10px] font-sans px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      LIVE TEST
                    </span>
                  </h4>
                  <p className="text-[11px] text-stone-400 truncate max-w-[200px]">
                    {config.title}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSimMessages([])}
                className="text-stone-500 hover:text-amber-400 text-xs flex items-center gap-1"
                title="Xóa đoạn chat thử nghiệm"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Làm mới</span>
              </button>
            </div>

            {/* Select Heritage Context for Testing */}
            <div>
              <label className="block text-[11px] font-semibold text-stone-400 mb-1">
                Địa Điểm Đang Thử Nghiệm Dẫn Đoàn:
              </label>
              <select
                value={selectedHeritageId}
                onChange={(e) => setSelectedHeritageId(e.target.value)}
                className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs text-amber-300 font-medium focus:outline-none focus:border-amber-500 cursor-pointer"
              >
                {heritages.map((h) => (
                  <option key={h.id} value={h.id}>
                    {h.name} ({h.province})
                  </option>
                ))}
              </select>
            </div>

            {/* Quick Test Action Buttons */}
            <div>
              <span className="text-[10px] text-stone-500 font-semibold uppercase block mb-1.5 tracking-wider">
                Tình huống thử nghiệm nhanh:
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  type="button"
                  onClick={() => handleSendSim(`Dạ chào em! Hãy bắt đầu thuyết minh và dẫn anh đi một vòng quanh ${currentSelectedHeritage.name} nhé.`)}
                  className="p-2 rounded-xl bg-stone-950 hover:bg-stone-800 border border-stone-800 text-stone-300 text-[11px] text-left flex items-center gap-1.5 transition-colors"
                >
                  <Compass className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="truncate">Thuyết minh điểm này</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSendSim(`Anh vào ${currentSelectedHeritage.name} thì cần chú ý trang phục và kiêng kỵ gì không?`)}
                  className="p-2 rounded-xl bg-stone-950 hover:bg-stone-800 border border-stone-800 text-stone-300 text-[11px] text-left flex items-center gap-1.5 transition-colors"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="truncate">Hỏi quy tắc ứng xử</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSendSim(`Quanh ${currentSelectedHeritage.name} có quán ăn đặc sản nào ngon đúng vị người bản xứ không em?`)}
                  className="p-2 rounded-xl bg-stone-950 hover:bg-stone-800 border border-stone-800 text-stone-300 text-[11px] text-left flex items-center gap-1.5 transition-colors"
                >
                  <Utensils className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                  <span className="truncate">Hỏi quán ăn ngon</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSendSim(`Chỉ cho anh vài góc chụp ảnh đẹp nhất và giờ ánh sáng lý tưởng tại ${currentSelectedHeritage.name}!`)}
                  className="p-2 rounded-xl bg-stone-950 hover:bg-stone-800 border border-stone-800 text-stone-300 text-[11px] text-left flex items-center gap-1.5 transition-colors"
                >
                  <Camera className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                  <span className="truncate">Góc chụp ảnh đẹp</span>
                </button>
              </div>
            </div>

            {/* Simulator Chat Window */}
            <div className="bg-stone-950 border border-stone-800 rounded-2xl p-3 h-80 overflow-y-auto space-y-3 shadow-inner">
              {simMessages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-4 text-stone-500">
                  <Compass className="w-8 h-8 text-amber-500/40 mb-2 animate-spin-slow" />
                  <p className="text-xs font-medium text-stone-400">
                    Phòng Thử Nghiệm Giọng Nói Hướng Dẫn Viên
                  </p>
                  <p className="text-[11px] mt-1 max-w-[220px]">
                    Bấm các nút tình huống ở trên hoặc gõ câu hỏi để kiểm tra cách {config.guideName} phản hồi theo cấu hình huấn luyện.
                  </p>
                </div>
              ) : (
                simMessages.map((m, idx) => {
                  const isUser = m.role === 'user';
                  return (
                    <div 
                      key={idx} 
                      className={`flex gap-2 ${isUser ? 'justify-end' : 'justify-start'}`}
                    >
                      {!isUser && (
                        <img 
                          src={config.avatarUrl} 
                          alt="AI Guide" 
                          className="w-6 h-6 rounded-lg object-cover border border-amber-500/40 shrink-0 mt-0.5"
                        />
                      )}
                      <div
                        className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed ${
                          isUser
                            ? 'bg-amber-600 text-stone-950 font-medium rounded-tr-none'
                            : 'bg-stone-900 border border-stone-800 text-stone-200 rounded-tl-none whitespace-pre-wrap'
                        }`}
                      >
                        <p>{m.text}</p>
                        {!isUser && (
                          <div className="mt-2 pt-1 border-t border-stone-800/80 flex items-center justify-between text-[10px] text-stone-400">
                            <span className="text-amber-400 font-medium">HDV {config.guideName}</span>
                            <button
                              type="button"
                              onClick={() => handleSpeakSim(idx, m.text)}
                              className="hover:text-amber-300 flex items-center gap-1 transition-colors"
                            >
                              {speakingIdx === idx ? (
                                <>
                                  <Square className="w-3 h-3 text-red-400 fill-current" />
                                  <span className="text-red-400">Dừng</span>
                                </>
                              ) : (
                                <>
                                  <Volume2 className="w-3 h-3 text-amber-400" />
                                  <span>Nghe thử giọng</span>
                                </>
                              )}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })
              )}

              {isSimLoading && (
                <div className="flex gap-2 items-center text-xs text-amber-400 p-2 bg-stone-900/60 rounded-xl">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>{config.guideName} đang chuẩn bị lời thuyết minh...</span>
                </div>
              )}
            </div>

            {/* Input Box for Simulator */}
            <div className="flex items-center gap-2 bg-stone-950 border border-stone-800 rounded-2xl p-1.5 focus-within:border-amber-500">
              <input
                type="text"
                value={simInput}
                onChange={(e) => setSimInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendSim()}
                placeholder={`Đặt câu hỏi thử nghiệm cho ${config.guideName}...`}
                className="flex-1 bg-transparent text-xs text-stone-100 placeholder-stone-500 focus:outline-none px-2"
              />
              <button
                type="button"
                onClick={() => handleSendSim()}
                disabled={!simInput.trim() || isSimLoading}
                className="p-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold disabled:opacity-40 transition-all shadow"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
