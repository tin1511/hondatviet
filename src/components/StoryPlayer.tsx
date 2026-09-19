import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Volume2, 
  Square, 
  Play, 
  Pause, 
  UserCheck, 
  ShieldCheck, 
  BookOpen, 
  Layers, 
  RefreshCw,
  Clock,
  MapPin,
  Share2,
  Heart,
  AlertCircle
} from 'lucide-react';
import { aiService } from '../services/aiService';
import { storageService } from '../services/storageService';
import { HERITAGE_DATABASE } from '../data/vietnamHeritageData';
import { HeritageItem, StoryMode, HeritageStory } from '../types';
import { cleanVietnameseText } from '../utils/textUtils';

interface StoryPlayerProps {
  initialHeritageName?: string;
  initialHistory?: string;
  initialPeriod?: string;
  onSelectHeritageForPlaces?: (id: string) => void;
}

export const StoryPlayer: React.FC<StoryPlayerProps> = ({
  initialHeritageName,
  initialHistory,
  initialPeriod,
  onSelectHeritageForPlaces
}) => {
  const [selectedHeritage, setSelectedHeritage] = useState<HeritageItem>(
    HERITAGE_DATABASE.find(h => h.name.includes(initialHeritageName || '')) || HERITAGE_DATABASE[0]
  );
  const [mode, setMode] = useState<StoryMode>('student');
  const [loading, setLoading] = useState<boolean>(false);
  const [story, setStory] = useState<HeritageStory | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(1.0);

  const audienceModes: { id: StoryMode; label: string; icon: string; desc: string }[] = [
    { id: 'children', label: 'Trẻ em', icon: '👦', desc: 'Truyện cổ tích ấm áp, dễ thương, nhân văn' },
    { id: 'student', label: 'Học sinh', icon: '🎒', desc: 'Sinh động, khơi gợi tự hào dân tộc' },
    { id: 'university', label: 'Sinh viên', icon: '🎓', desc: 'Chuyên sâu bối cảnh, triết lý kiến trúc' },
    { id: 'adult', label: 'Người lớn', icon: '☕', desc: 'Điềm đạm, lắng đọng giá trị tâm hồn' },
    { id: 'foreigner', label: 'Khách quốc tế (EN)', icon: '🌐', desc: 'Clear English cultural narrative' },
  ];

  const fetchStory = async (heritage: HeritageItem, targetMode: StoryMode) => {
    setLoading(true);
    setError(null);
    if (isPlaying) {
      aiService.stopSpeaking();
      setIsPlaying(false);
    }
    try {
      const generated = await aiService.generateStory({
        heritageName: heritage.name,
        category: heritage.categoryLabel,
        region: heritage.region,
        history: heritage.history,
        period: heritage.period,
        mode: targetMode,
        language: targetMode === 'foreigner' ? 'en' : 'vi'
      });
      setStory(generated);

      storageService.logActivity({
        actionType: 'story',
        title: 'Nghe AI kể chuyện văn hóa',
        description: `Tạo câu chuyện di sản "${heritage.name}" (Đối tượng: ${audienceModes.find(m => m.id === targetMode)?.label})`,
        targetId: heritage.id,
        pointsEarned: 20
      });
    } catch (err: any) {
      console.warn('Lỗi tải câu chuyện AI:', err);
      setError(err?.message || 'AI hiện đang bận hoặc quá tải, vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStory(selectedHeritage, mode);
  }, [selectedHeritage.id, mode]);

  const handleTogglePlay = () => {
    if (isPlaying) {
      aiService.stopSpeaking();
      setIsPlaying(false);
    } else if (story?.storyText) {
      setIsPlaying(true);
      aiService.speakText(story.storyText, {
        rate: speed,
        lang: mode === 'foreigner' ? 'en-US' : 'vi-VN',
        onEnd: () => setIsPlaying(false)
      });
    }
  };

  const handleStop = () => {
    aiService.stopSpeaking();
    setIsPlaying(false);
  };

  const handleSpeedChange = (newSpeed: number) => {
    setSpeed(newSpeed);
    if (isPlaying && story?.storyText) {
      aiService.stopSpeaking();
      aiService.speakText(story.storyText, {
        rate: newSpeed,
        lang: mode === 'foreigner' ? 'en-US' : 'vi-VN',
        onEnd: () => setIsPlaying(false)
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      
      {/* Title & Introduction */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 text-xs font-semibold mb-3">
          <Volume2 className="w-3.5 h-3.5" />
          <span>Giọng Kể Di Sản Đa Đối Tượng</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-serif font-bold text-stone-100">
          Nghe AI Kể Chuyện Di Sản
        </h2>
        <p className="text-stone-300 text-xs sm:text-sm mt-2">
          Truyền cảm xúc và sự thật lịch sử vào từng câu chuyện, phân biệt rạch ròi giữa chính sử và huyền tích dân gian.
        </p>
      </div>

      {/* Select Heritage to Tell */}
      <div className="mb-6 bg-stone-900 border border-stone-800 rounded-2xl p-4 sm:p-5">
        <label className="block text-xs font-semibold text-amber-300 uppercase tracking-wider mb-2">
          Chọn di sản để nghe chuyện:
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {HERITAGE_DATABASE.slice(0, 8).map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedHeritage(item)}
              className={`p-2.5 rounded-xl border text-left transition-all text-xs flex items-center gap-2.5 ${
                selectedHeritage.id === item.id 
                  ? 'bg-amber-600/30 border-amber-500 text-amber-200 shadow-md' 
                  : 'bg-stone-950/60 border-stone-800 text-stone-300 hover:bg-stone-800'
              }`}
            >
              <img src={item.imageUrl} alt={item.name} className="w-9 h-9 rounded-lg object-cover shrink-0" />
              <span className="font-medium line-clamp-2">{item.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 5 Audience Mode Switchers */}
      <div className="mb-6">
        <label className="block text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2">
          Chọn đối tượng nghe chuyện:
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
          {audienceModes.map((item) => (
            <button
              key={item.id}
              onClick={() => setMode(item.id)}
              className={`p-3 rounded-xl border text-left transition-all relative ${
                mode === item.id 
                  ? 'bg-red-950/50 border-red-500 text-stone-100 ring-2 ring-red-500/20' 
                  : 'bg-stone-900 border-stone-800 text-stone-400 hover:bg-stone-800/80 hover:text-stone-200'
              }`}
            >
              <div className="text-xl mb-1">{item.icon}</div>
              <p className="text-xs font-bold text-amber-200">{item.label}</p>
              <p className="text-[10px] text-stone-400 mt-0.5 line-clamp-2">{item.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Main Story & Audio Player Container */}
      <div className="bg-stone-900 border border-stone-800 rounded-3xl overflow-hidden shadow-2xl">
        
        {/* Top Hero Banner of Selected Heritage */}
        <div className="relative h-48 sm:h-64 w-full overflow-hidden">
          <img 
            src={selectedHeritage.imageUrl} 
            alt={selectedHeritage.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/60 to-transparent" />
          
          <div className="absolute bottom-4 left-4 sm:left-6 right-4 sm:right-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                {selectedHeritage.categoryLabel}
              </span>
              <h3 className="text-xl sm:text-3xl font-serif font-bold text-white mt-1">
                {story?.title || selectedHeritage.name}
              </h3>
              <p className="text-xs text-stone-300 flex items-center gap-1.5 mt-1">
                <MapPin className="w-3.5 h-3.5 text-red-400" />
                <span>{selectedHeritage.address}</span>
              </p>
            </div>

            {/* Quick Tag */}
            <div className="text-xs px-3 py-1 bg-black/60 backdrop-blur rounded-lg text-amber-300 border border-amber-500/30">
              Chế độ: <span className="font-bold">{audienceModes.find(m => m.id === mode)?.label}</span>
            </div>
          </div>
        </div>

        {/* Audio Controller Bar */}
        <div className="bg-stone-950/80 px-6 py-4 border-y border-stone-800 flex flex-wrap items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <button
              id="btn-story-play"
              onClick={handleTogglePlay}
              disabled={loading || !story}
              className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-stone-950 transition-all shadow-lg ${
                isPlaying 
                  ? 'bg-amber-400 hover:bg-amber-300 animate-pulse' 
                  : 'bg-red-600 hover:bg-red-500 text-white'
              }`}
              title={isPlaying ? 'Tạm dừng đọc' : 'Đọc câu chuyện'}
            >
              {isPlaying ? <Pause className="w-5 h-5 text-stone-950" /> : <Play className="w-5 h-5 ml-0.5 fill-current" />}
            </button>

            {isPlaying && (
              <button
                onClick={handleStop}
                className="p-2.5 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors"
                title="Dừng phát"
              >
                <Square className="w-4 h-4" />
              </button>
            )}

            <div>
              <p className="text-xs font-semibold text-stone-200">
                {isPlaying ? 'Đang đọc truyền cảm qua AI Voice...' : 'Bấm Play để nghe AI đọc to'}
              </p>
              <div className="flex items-center gap-1 mt-1">
                {/* Audio Waveform simulation */}
                <div className={`flex items-end gap-1 h-3 ${isPlaying ? 'opacity-100' : 'opacity-30'}`}>
                  <div className="w-1 bg-amber-400 h-2 animate-bounce"></div>
                  <div className="w-1 bg-amber-400 h-3 animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-1 bg-amber-400 h-1.5 animate-bounce [animation-delay:0.4s]"></div>
                  <div className="w-1 bg-amber-400 h-2.5 animate-bounce [animation-delay:0.1s]"></div>
                </div>
                <span className="text-[10px] text-stone-400 ml-1.5">Tiếng Việt chuẩn</span>
              </div>
            </div>
          </div>

          {/* Voice Speed Controls */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-stone-400">Tốc độ:</span>
            {[0.8, 1.0, 1.2].map((s) => (
              <button
                key={s}
                onClick={() => handleSpeedChange(s)}
                className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                  speed === s 
                    ? 'bg-amber-500 text-stone-950 font-bold' 
                    : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                }`}
              >
                {s}x
              </button>
            ))}
          </div>
        </div>

        {/* Story Content Area */}
        <div className="p-6 sm:p-8 space-y-6">
          {loading ? (
            <div className="py-12 text-center space-y-3">
              <RefreshCw className="w-8 h-8 text-amber-400 animate-spin mx-auto" />
              <p className="text-sm font-medium text-amber-200">AI đang sáng tác câu chuyện di sản cho bạn...</p>
              <p className="text-xs text-stone-500">Áp dụng bộ lọc phong cách: {audienceModes.find(m => m.id === mode)?.label}</p>
            </div>
          ) : story ? (
            <>
              {story.isFallback && (
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-300 text-xs font-medium">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Bản kể biên soạn từ Kho lưu trữ Di sản Quốc gia (Chế độ tin cậy khi AI đang bận)</span>
                </div>
              )}

              {/* Story Text */}
              <div className="prose prose-invert max-w-none">
                <p className="text-base sm:text-lg text-stone-200 leading-relaxed sm:leading-loose whitespace-pre-line font-serif tracking-normal">
                  {cleanVietnameseText(story.storyText)}
                </p>
              </div>

              {/* Crucial: Distinction Note between History vs Legend */}
              {story.distinctionNote && (
                <div className="bg-amber-950/30 border border-amber-500/40 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5">
                  <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                      Phân biệt Rạch ròi: Lịch sử & Truyền thuyết
                    </h4>
                    <p className="text-xs sm:text-sm text-stone-300 mt-1 leading-relaxed">
                      {cleanVietnameseText(story.distinctionNote)}
                    </p>
                  </div>
                </div>
              )}

              {/* References & Sources */}
              {story.sourceReferences && story.sourceReferences.length > 0 && (
                <div className="pt-4 border-t border-stone-800 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs text-stone-400">
                    <BookOpen className="w-4 h-4 text-stone-500" />
                    <span>Nguồn tư liệu tham khảo:</span>
                    <span className="text-stone-300 font-medium">
                      {story.sourceReferences.join(' • ')}
                    </span>
                  </div>

                  <button
                    onClick={() => onSelectHeritageForPlaces?.(selectedHeritage.id)}
                    className="text-xs text-amber-400 hover:text-amber-300 underline font-medium"
                  >
                    Xem quán ăn & trải nghiệm gần đây →
                  </button>
                </div>
              )}
            </>
          ) : error ? (
            <div className="py-12 text-center space-y-4 max-w-md mx-auto">
              <div className="w-12 h-12 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto border border-amber-500/20">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-semibold text-stone-200">Máy chủ AI đang có lượng yêu cầu cao</p>
                <p className="text-xs text-stone-400 mt-1.5 leading-relaxed">{error}</p>
              </div>
              <button
                onClick={() => fetchStory(selectedHeritage, mode)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 text-stone-950 font-bold text-xs hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/10 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Thử lại với AI</span>
              </button>
            </div>
          ) : null}
        </div>

      </div>

    </div>
  );
};
