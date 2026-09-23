import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquareQuote, 
  Send, 
  Mic, 
  MicOff, 
  Volume2, 
  Square, 
  Sparkles, 
  Trash2, 
  Copy, 
  Check, 
  Info,
  HelpCircle,
  ShieldCheck,
  RefreshCw,
  Compass,
  Camera,
  Utensils,
  MapPin,
  Clock,
  Award,
  VolumeX,
  BookOpen,
  AlertTriangle,
  Sliders
} from 'lucide-react';
import { aiService } from '../services/aiService';
import { speechService } from '../services/speechService';
import { storageService } from '../services/storageService';
import { ttsService, TTSStatus, mobileAudioUnlocker } from '../services/ttsService';
import { getTTSConfig, TTSConfig } from '../config/ttsConfig';
import { ChatMessage, HeritageItem, AITourGuideConfig } from '../types';
import { VoiceSettingsModal } from './VoiceSettingsModal';

interface AIChatAssistantProps {
  initialContext?: HeritageItem | null;
  initialQuestion?: string;
  language?: string;
}

const CULTURAL_SUGGESTIONS = [
  'Vì sao người Việt có phong tục têm trầu cánh phượng?',
  'Cổng Ngọ Môn Huế có mấy lối đi và ý nghĩa từng lối?',
  'Ý nghĩa của 82 Bia Tiến sĩ Văn Miếu Thăng Long là gì?',
  'Món Cơm Hến Huế có nguồn gốc dân dã như thế nào?',
  'Giải thích ngắn gọn cho học sinh về chiến thắng Bạch Đằng 938'
];

export const AIChatAssistant: React.FC<AIChatAssistantProps> = ({
  initialContext,
  initialQuestion,
  language = 'vi'
}) => {
  const [guideConfig, setGuideConfig] = useState<AITourGuideConfig>(storageService.getTourGuideConfig());
  const [allHeritages] = useState<HeritageItem[]>(storageService.getHeritages());
  const [selectedHeritage, setSelectedHeritage] = useState<HeritageItem | null>(initialContext || allHeritages[0] || null);

  // Mode: 'tour_guide' (Huấn luyện chuyên sâu) or 'cultural_assistant' (Tra cứu văn hóa chung)
  const [mode, setMode] = useState<'tour_guide' | 'cultural_assistant'>('tour_guide');

  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const config = storageService.getTourGuideConfig();
    return [
      {
        id: 'welcome-msg',
        sender: 'assistant',
        text: config.welcomeGreeting || 'Dạ em chào quý cô bác, anh chị trong đoàn! Em rất vui được làm hướng dẫn viên du lịch đồng hành cùng quý vị.',
        timestamp: new Date().toISOString(),
        isTourGuideMode: true
      }
    ];
  });

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [voiceNotice, setVoiceNotice] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [speakingMsgId, setSpeakingMsgId] = useState<string | null>(null);
  const [ttsStatusMap, setTtsStatusMap] = useState<Record<string, TTSStatus>>({});
  const [ttsProviderMap, setTtsProviderMap] = useState<Record<string, string>>({});
  const [ttsConfig, setTtsConfig] = useState<TTSConfig>(() => getTTSConfig());
  const [autoSpeech, setAutoSpeech] = useState(false);
  const [isVoiceSettingsOpen, setIsVoiceSettingsOpen] = useState(false);
  const [isOffline, setIsOffline] = useState<boolean>(!navigator.onLine);

  // Sync TTS config whenever VoiceSettingsModal closes
  useEffect(() => {
    if (!isVoiceSettingsOpen) {
      setTtsConfig(getTTSConfig());
    }
  }, [isVoiceSettingsOpen]);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Listen to config updates from Admin Studio
  useEffect(() => {
    const handleConfigUpdate = (e: any) => {
      if (e.detail) {
        setGuideConfig(e.detail);
      }
    };
    window.addEventListener('tour-guide-config-updated', handleConfigUpdate);

    // Initial server sync
    storageService.fetchTourGuideConfig().then(latest => {
      setGuideConfig(latest);
    });

    return () => {
      window.removeEventListener('tour-guide-config-updated', handleConfigUpdate);
    };
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  useEffect(() => {
    if (initialQuestion) {
      handleSendMessage(initialQuestion);
    }
  }, [initialQuestion]);

  useEffect(() => {
    if (initialContext) {
      setSelectedHeritage(initialContext);
    }
  }, [initialContext]);

  // Handle Speech-to-Text via Web Speech API
  const handleToggleRecord = () => {
    setVoiceNotice(null);

    if (isRecording) {
      speechService.stopListening();
      setIsRecording(false);
      return;
    }

    if (!speechService.isSupported()) {
      setVoiceNotice('Trình duyệt hiện tại chưa hỗ trợ nhận diện giọng nói. Vui lòng sử dụng Chrome hoặc Edge.');
      return;
    }

    const success = speechService.startListening({
      lang: language === 'en' ? 'en-US' : 'vi-VN',
      onStart: () => {
        setIsRecording(true);
        setVoiceNotice(null);
      },
      onResult: (transcript) => {
        if (transcript) {
          setInput((prev) => (prev.trim() ? prev.trim() + ' ' + transcript : transcript));
        }
      },
      onError: (errMsg) => {
        setIsRecording(false);
        setVoiceNotice(errMsg);
      },
      onEnd: () => {
        setIsRecording(false);
      }
    });

    if (!success) {
      setIsRecording(false);
    }
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || loading) return;

    const isGuide = mode === 'tour_guide';

    // Prime mobile audio for automatic playback upon response
    if (autoSpeech) {
      mobileAudioUnlocker.unlock();
    }

    const userMsg: ChatMessage = {
      id: 'msg-' + Date.now(),
      sender: 'user',
      text: query,
      timestamp: new Date().toISOString(),
      isTourGuideMode: isGuide
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      const conversationHistory = messages.map(m => ({
        role: (m.sender === 'user' ? 'user' : 'model') as 'user' | 'model',
        text: m.text
      }));

      const reply = await aiService.chatWithAssistant({
        message: query,
        conversationHistory,
        currentHeritageContext: selectedHeritage,
        language,
        isTourGuideMode: isGuide
      });

      const assistantMsgId = 'msg-' + (Date.now() + 1);
      const assistantMsg: ChatMessage = {
        id: assistantMsgId,
        sender: 'assistant',
        text: reply,
        timestamp: new Date().toISOString(),
        isTourGuideMode: isGuide
      };

      setMessages((prev) => [...prev, assistantMsg]);

      // If auto-speech enabled, speak the answer
      if (autoSpeech) {
        handleSpeak(assistantMsgId, reply);
      }

      storageService.logActivity({
        actionType: 'chat',
        title: isGuide ? `Hỏi Hướng Dẫn Viên (${guideConfig.guideName})` : 'Hỏi đáp Trợ lý Văn hóa',
        description: `Hỏi: "${query.length > 60 ? query.substring(0, 60) + '...' : query}"`,
        pointsEarned: 10
      });
    } catch (err: any) {
      const errorMsg: ChatMessage = {
        id: 'msg-err-' + Date.now(),
        sender: 'assistant',
        text: isGuide 
          ? `Dạ em là ${guideConfig.guideName}! Đường truyền máy chủ đang bận đôi chút, quý đoàn mình thông cảm nhé. Em luôn sẵn lòng tiếp tục thuyết minh khi quý vị thử lại!` 
          : 'Xin lỗi, tôi gặp sự cố khi xử lý câu hỏi lúc này. Bạn vui lòng thử lại nhé!',
        timestamp: new Date().toISOString(),
        isTourGuideMode: isGuide
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSpeak = (id: string, text: string) => {
    ttsService.prepareForMobilePlayback();
    const currentStatus = ttsStatusMap[id] || 'idle';

    if (speakingMsgId === id && (currentStatus === 'playing' || currentStatus === 'generating' || currentStatus === 'loading')) {
      ttsService.stop();
      setSpeakingMsgId(null);
      setTtsStatusMap((prev) => ({ ...prev, [id]: 'stopped' }));
    } else {
      setSpeakingMsgId(id);
      setTtsStatusMap((prev) => ({ ...prev, [id]: 'loading' }));

      const currentConfig = getTTSConfig();
      setTtsConfig(currentConfig);

      ttsService.speak(text, {
        lang: language === 'en' ? 'en-US' : 'vi-VN',
        provider: currentConfig.provider || 'vieneu',
        voice: currentConfig.voice || 'Ngọc Lan',
        speaker: currentConfig.voice || 'Ngọc Lan',
        onStatusChange: (status) => {
          setTtsStatusMap((prev) => ({ ...prev, [id]: status }));
          setTtsProviderMap((prev) => ({ ...prev, [id]: ttsService.getActiveProviderName() }));
        },
        onEnd: () => {
          setSpeakingMsgId(null);
          setTtsStatusMap((prev) => ({ ...prev, [id]: 'idle' }));
        },
        onError: () => {
          setSpeakingMsgId(null);
          setTtsStatusMap((prev) => ({ ...prev, [id]: 'error' }));
        }
      });
    }
  };

  const handleClearChat = () => {
    const isGuide = mode === 'tour_guide';
    setMessages([
      {
        id: 'welcome-msg',
        sender: 'assistant',
        text: isGuide
          ? (guideConfig.welcomeGreeting || `Dạ em là ${guideConfig.guideName}! Lịch sử đoàn mình dạo bước đã được làm mới. Quý vị cần em thuyết minh điểm nào tiếp theo cứ bảo em nhé!`)
          : 'Lịch sử trò chuyện đã được làm mới. Tôi sẵn sàng cùng bạn khám phá văn hóa Việt Nam!',
        timestamp: new Date().toISOString(),
        isTourGuideMode: isGuide
      }
    ]);
    aiService.stopSpeaking();
    setSpeakingMsgId(null);
  };

  const handleSwitchMode = (newMode: 'tour_guide' | 'cultural_assistant') => {
    setMode(newMode);
    aiService.stopSpeaking();
    setSpeakingMsgId(null);
    if (newMode === 'tour_guide') {
      setMessages([
        {
          id: 'welcome-guide-' + Date.now(),
          sender: 'assistant',
          text: guideConfig.welcomeGreeting || `Dạ em là ${guideConfig.guideName} - Hướng dẫn viên du lịch văn hóa! Rất hân hạnh được đồng hành cùng quý đoàn mình. Quý vị muốn em thuyết minh về ${selectedHeritage?.name || 'di sản Việt Nam'} hay tư vấn góc chụp ảnh, quán ngon cứ bảo em nhé!`,
          timestamp: new Date().toISOString(),
          isTourGuideMode: true
        }
      ]);
    } else {
      setMessages([
        {
          id: 'welcome-assistant-' + Date.now(),
          sender: 'assistant',
          text: 'Xin chào! Tôi là Trợ lý Văn hóa Việt Nam. Tôi giải đáp các câu hỏi học thuật, phân biệt rạch ròi giữa chính sử và truyền thuyết dân gian.',
          timestamp: new Date().toISOString(),
          isTourGuideMode: false
        }
      ]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-4 py-4 sm:py-8">
      
      {/* Mode Switcher Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 sm:mb-6 pb-4 border-b border-stone-800">
        
        {/* Left: Mode Toggle Pills */}
        <div className="grid grid-cols-2 sm:flex items-center gap-1.5 p-1 bg-stone-900 border border-stone-800 rounded-2xl shadow-inner">
          <button
            onClick={() => handleSwitchMode('tour_guide')}
            className={`px-3 py-2 sm:px-3.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 sm:gap-2 transition-all cursor-pointer min-h-[40px] ${
              mode === 'tour_guide'
                ? 'bg-amber-500 text-stone-950 shadow-md scale-[1.01]'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <Compass className="w-4 h-4 shrink-0" />
            <span className="truncate">HDV Du Lịch AI</span>
            <span className="hidden md:inline text-[10px] px-1.5 py-0.2 bg-stone-950/20 rounded font-normal">
              Tour Guide
            </span>
          </button>

          <button
            onClick={() => handleSwitchMode('cultural_assistant')}
            className={`px-3 py-2 sm:px-3.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 sm:gap-2 transition-all cursor-pointer min-h-[40px] ${
              mode === 'cultural_assistant'
                ? 'bg-amber-500 text-stone-950 shadow-md scale-[1.01]'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <BookOpen className="w-4 h-4 shrink-0" />
            <span className="truncate">Trợ Lý Lịch Sử</span>
          </button>
        </div>

        {/* Right Tools */}
        <div className="flex items-center justify-between sm:justify-end gap-1.5 sm:gap-2 overflow-x-auto pb-1 sm:pb-0">
          {/* Voice Settings Button */}
          <button
            onClick={() => setIsVoiceSettingsOpen(true)}
            className="px-2.5 sm:px-3 py-2 rounded-xl text-xs bg-stone-900 border border-amber-500/40 text-amber-300 hover:text-amber-200 hover:bg-stone-800 flex items-center gap-1.5 transition-all cursor-pointer shrink-0 min-h-[38px] shadow-sm"
            title="Cài đặt công nghệ đọc VieNeu AI hoặc tùy chỉnh tốc độ, giọng đọc"
          >
            <Sliders className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-semibold">
              {ttsConfig.provider === 'vieneu' ? `Giọng: VieNeu (${ttsConfig.voice || 'Ngọc Lan'})` : 'Giọng: Trình duyệt'}
            </span>
          </button>

          {/* Audio Guide Auto-Speak toggle */}
          <button
            onClick={() => setAutoSpeech(!autoSpeech)}
            className={`px-2.5 sm:px-3 py-2 rounded-xl text-xs flex items-center gap-1.5 border transition-all cursor-pointer shrink-0 min-h-[38px] ${
              autoSpeech
                ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300'
                : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-stone-300'
            }`}
            title="Tự động đọc giọng nói thuyết minh mỗi khi AI phản hồi"
          >
            <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Audio: {autoSpeech ? 'Bật' : 'Tắt'}</span>
          </button>

          <button
            onClick={handleClearChat}
            className="px-2.5 sm:px-3 py-2 rounded-xl text-xs text-stone-400 hover:text-red-400 hover:bg-stone-800 flex items-center gap-1.5 transition-colors border border-stone-800 cursor-pointer shrink-0 min-h-[38px]"
            title="Làm mới lịch sử trò chuyện"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Làm mới</span>
          </button>
        </div>

      </div>

      {/* Offline Mode Banner */}
      {isOffline && (
        <div className="mb-4 p-3 bg-amber-950/60 border border-amber-500/50 rounded-2xl text-amber-300 text-xs flex items-center justify-between gap-3 shadow-md animate-fade-in">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="font-bold">⚡ Chế độ Hướng Dẫn Viên AI Ngoại Tuyến (Offline)</span>
          </div>
          <p className="text-[11px] text-amber-200 hidden sm:block">
            Trích xuất tri thức di sản & văn hóa trực tiếp từ bộ dữ liệu lưu trữ thiết bị
          </p>
        </div>
      )}

      {/* Profile Header for Tour Guide Mode */}
      {mode === 'tour_guide' ? (
        <div className="mb-6 p-4 sm:p-5 bg-gradient-to-r from-amber-950/40 via-stone-900 to-stone-900 border border-amber-500/40 rounded-3xl shadow-xl flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img 
                src={guideConfig.avatarUrl} 
                alt={guideConfig.guideName}
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-cover border-2 border-amber-500/60 shadow-lg"
              />
              <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-stone-900 rounded-full" />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-lg sm:text-xl font-serif font-bold text-stone-100 flex items-center gap-2">
                  <span>HDV. {guideConfig.guideName}</span>
                </h2>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold">
                  Thẻ HDV Quốc Gia #{guideConfig.experienceYears} Năm Nghề
                </span>
                <button
                  type="button"
                  onClick={() => setIsVoiceSettingsOpen(true)}
                  className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 font-semibold flex items-center gap-1 transition-all cursor-pointer"
                  title="Bấm để tùy chỉnh giọng đọc VieNeu AI cho HDV Bảo An"
                >
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>
                    {ttsConfig.provider === 'vieneu' ? `VieNeu AI (${ttsConfig.voice || 'Ngọc Lan'})` : 'Giọng Trình duyệt'}
                  </span>
                </button>
              </div>
              <p className="text-xs text-stone-300 font-medium mt-0.5">
                {guideConfig.title}
              </p>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {guideConfig.specialties.slice(0, 3).map((sp, idx) => (
                  <span key={idx} className="text-[10px] px-2 py-0.5 rounded-md bg-stone-800 text-stone-400">
                    {sp}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Heritage Selection Dropdown for Tour Guide Context */}
          <div className="w-full sm:w-auto bg-stone-950/80 border border-stone-800 rounded-2xl p-2.5 space-y-1">
            <label className="text-[10px] uppercase font-bold text-stone-400 block tracking-wider flex items-center gap-1">
              <MapPin className="w-3 h-3 text-amber-400" />
              <span>Điểm Dừng Chân Hiện Tại:</span>
            </label>
            <select
              value={selectedHeritage?.id || ''}
              onChange={(e) => {
                const target = allHeritages.find(h => h.id === e.target.value);
                if (target) setSelectedHeritage(target);
              }}
              className="w-full bg-stone-900 border border-stone-700 text-amber-300 text-xs font-semibold rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-amber-500 cursor-pointer"
            >
              {allHeritages.map((h) => (
                <option key={h.id} value={h.id}>
                  {h.name} ({h.province})
                </option>
              ))}
            </select>
          </div>
        </div>
      ) : (
        /* Cultural Assistant Header */
        <div className="flex items-center gap-3 mb-6 p-4 bg-stone-900 border border-stone-800 rounded-2xl">
          <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 border border-sky-500/30 flex items-center justify-center">
            <MessageSquareQuote className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-serif font-bold text-stone-100 flex items-center gap-2">
              <span>Trợ Lý Văn Hóa Việt Nam</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Chính sử & Huyền tích
              </span>
            </h2>
            <p className="text-xs text-stone-400">
              Tra cứu phong tục, làng nghề, lịch sử và thẩm định độ xác thực dữ liệu văn hóa.
            </p>
          </div>
        </div>
      )}

      {/* Chat Messages Log */}
      <div className="bg-stone-900 border border-stone-800 rounded-3xl p-4 sm:p-6 h-[460px] overflow-y-auto space-y-4 shadow-inner">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              {!isUser && (
                mode === 'tour_guide' ? (
                  <img 
                    src={guideConfig.avatarUrl} 
                    alt={guideConfig.guideName}
                    className="w-9 h-9 rounded-xl object-cover border border-amber-500/50 shadow shrink-0 mt-0.5"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-xl bg-amber-600/30 border border-amber-500/40 text-amber-300 flex items-center justify-center shrink-0 text-xs font-serif font-bold">
                    H
                  </div>
                )
              )}

              <div
                className={`max-w-[85%] sm:max-w-[78%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed shadow-md ${
                  isUser
                    ? 'bg-amber-600 text-stone-950 font-medium rounded-tr-none'
                    : 'bg-stone-800/90 text-stone-200 border border-stone-700/60 rounded-tl-none whitespace-pre-wrap'
                }`}
              >
                <div>{msg.text}</div>

                {/* Assistant message action controls */}
                {!isUser && (
                  <div className="mt-3 pt-2 border-t border-stone-700/50 flex flex-wrap items-center justify-between gap-2 text-[11px] text-stone-400">
                    <div className="flex items-center gap-1.5 text-[10px] text-stone-500">
                      <span>
                        {mode === 'tour_guide' ? `HDV ${guideConfig.guideName} • ` : 'Trợ lý AI • '}
                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      {/* Provider Badge */}
                      <span className={`px-2 py-0.5 rounded font-bold border text-[9px] flex items-center gap-1 ${
                        (ttsProviderMap[msg.id] || ttsConfig.provider) === 'vieneu'
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                          : 'bg-stone-800 text-stone-300 border-stone-700'
                      }`}>
                        <span>🎙️</span>
                        <span>
                          {(ttsProviderMap[msg.id] || ttsConfig.provider) === 'vieneu' ? 'VieNeu AI' : 'Giọng Máy'}
                        </span>
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleSpeak(msg.id, msg.text)}
                        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-all text-xs font-medium cursor-pointer ${
                          ttsStatusMap[msg.id] === 'playing'
                            ? 'bg-red-950/80 border border-red-500/40 text-red-300 animate-pulse'
                            : ttsStatusMap[msg.id] === 'generating' || ttsStatusMap[msg.id] === 'loading'
                            ? 'bg-amber-950/80 border border-amber-500/40 text-amber-300 animate-pulse'
                            : ttsStatusMap[msg.id] === 'error'
                            ? 'bg-rose-950/80 border border-rose-500/40 text-rose-300'
                            : 'bg-stone-900/80 hover:bg-stone-700 text-stone-300 border border-stone-700'
                        }`}
                        title="Nghe HDV Bảo An đọc bằng công nghệ VieNeu AI (Text-to-Speech)"
                      >
                        {ttsStatusMap[msg.id] === 'playing' ? (
                          <>
                            <Square className="w-3 h-3 text-red-400 fill-current" />
                            <span>⏹ Dừng</span>
                          </>
                        ) : ttsStatusMap[msg.id] === 'generating' || ttsStatusMap[msg.id] === 'loading' ? (
                          <>
                            <RefreshCw className="w-3 h-3 animate-spin text-amber-400" />
                            <span>⏳ VieNeu đang đọc...</span>
                          </>
                        ) : ttsStatusMap[msg.id] === 'error' ? (
                          <>
                            <RefreshCw className="w-3 h-3 text-rose-400" />
                            <span>🔄 Thử lại</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                            <span>🔊 Đọc (VieNeu)</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => handleCopy(msg.id, msg.text)}
                        className="hover:text-amber-300 flex items-center gap-1 px-2 py-1 rounded-lg bg-stone-900/60 border border-stone-700/60 transition-colors cursor-pointer"
                        title="Sao chép nội dung"
                      >
                        {copiedId === msg.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span className="text-emerald-400">Đã chép</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3 text-stone-400" />
                            <span>Chép</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {loading && (
          <div className="flex gap-3 justify-start">
            {mode === 'tour_guide' ? (
              <img 
                src={guideConfig.avatarUrl} 
                alt="Tour Guide"
                className="w-9 h-9 rounded-xl object-cover border border-amber-500/50 shrink-0"
              />
            ) : (
              <div className="w-8 h-8 rounded-lg bg-amber-600/30 border border-amber-500/40 text-amber-300 flex items-center justify-center shrink-0 text-xs font-serif font-bold">
                H
              </div>
            )}
            <div className="bg-stone-800 text-stone-300 p-3.5 rounded-2xl rounded-tl-none border border-stone-700 flex items-center gap-2">
              <RefreshCw className="w-4 h-4 animate-spin text-amber-400" />
              <span className="text-xs">
                {mode === 'tour_guide' 
                  ? `HDV ${guideConfig.guideName} đang chuẩn bị lời thuyết minh cho đoàn...` 
                  : 'Trợ lý AI đang tra cứu chính sử...'}
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Suggestion Chips */}
      <div className="mt-3">
        {mode === 'tour_guide' ? (
          <div>
            <p className="text-[11px] text-stone-400 mb-1.5 font-medium flex items-center gap-1">
              <Compass className="w-3 h-3 text-amber-400" />
              <span>Chỉ dẫn du lịch nhanh với HDV {guideConfig.guideName}:</span>
            </p>
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
              <button
                onClick={() => handleSendMessage(`Chào em ${guideConfig.guideName}! Hãy thuyết minh chi tiết và dẫn đoàn đi một vòng quanh ${selectedHeritage?.name || 'điểm di sản này'} nhé.`)}
                className="text-xs bg-stone-900 hover:bg-stone-800 text-amber-300 px-3 py-1.5 rounded-xl border border-amber-500/40 hover:border-amber-400 whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Compass className="w-3.5 h-3.5 text-amber-400" />
                <span>Thuyết minh điểm này</span>
              </button>

              <button
                onClick={() => handleSendMessage(`Khi tham quan ${selectedHeritage?.name || 'nơi này'}, quý đoàn cần lưu ý trang phục và các quy tắc ứng xử tôn nghiêm nào?`)}
                className="text-xs bg-stone-900 hover:bg-stone-800 text-stone-300 px-3 py-1.5 rounded-xl border border-stone-800 hover:border-emerald-500/40 whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Quy tắc ứng xử & Trang phục</span>
              </button>

              <button
                onClick={() => handleSendMessage(`Gần ${selectedHeritage?.name || 'khu vực này'} có món ăn đặc sản nào ngon và quán nào chuẩn vị của người bản xứ không em?`)}
                className="text-xs bg-stone-900 hover:bg-stone-800 text-stone-300 px-3 py-1.5 rounded-xl border border-stone-800 hover:border-rose-500/40 whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Utensils className="w-3.5 h-3.5 text-rose-400" />
                <span>Quán ngon & Đặc sản bản xứ</span>
              </button>

              <button
                onClick={() => handleSendMessage(`Chỉ cho anh các góc chụp ảnh đẹp nhất và giờ vàng ánh sáng tại ${selectedHeritage?.name || 'di sản'}!`)}
                className="text-xs bg-stone-900 hover:bg-stone-800 text-stone-300 px-3 py-1.5 rounded-xl border border-stone-800 hover:border-sky-500/40 whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Camera className="w-3.5 h-3.5 text-sky-400" />
                <span>Góc chụp ảnh đẹp & Giờ vàng</span>
              </button>

              <button
                onClick={() => handleSendMessage(`Gợi ý cho đoàn lộ trình dạo bước từ 1 đến 2 tiếng tối ưu nhất tại ${selectedHeritage?.name || 'di tích'}.`)}
                className="text-xs bg-stone-900 hover:bg-stone-800 text-stone-300 px-3 py-1.5 rounded-xl border border-stone-800 hover:border-amber-500/40 whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>Lộ trình dạo bước 1-2 giờ</span>
              </button>
            </div>
          </div>
        ) : (
          <div>
            <p className="text-[11px] text-stone-400 mb-1.5 font-medium">Gợi ý câu hỏi nghiên cứu văn hóa:</p>
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
              {CULTURAL_SUGGESTIONS.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(q)}
                  className="text-xs bg-stone-900 hover:bg-stone-800 text-stone-300 px-3 py-1.5 rounded-xl border border-stone-800 hover:border-amber-500/40 whitespace-nowrap transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Voice Notification Banner */}
      {voiceNotice && (
        <div className="mt-3 px-3 py-2 bg-amber-950/70 border border-amber-600/40 rounded-xl text-xs text-amber-200 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
          <span className="flex-1">{voiceNotice}</span>
          <button 
            onClick={() => setVoiceNotice(null)}
            className="text-amber-400 hover:text-white text-xs font-bold px-1"
          >
            ✕
          </button>
        </div>
      )}

      {/* Input Box with Voice & Send */}
      <div className="mt-3 flex items-center gap-1.5 sm:gap-2 bg-stone-900 border border-stone-700 rounded-2xl p-1.5 sm:p-2 shadow-xl focus-within:border-amber-500">
        <button
          onClick={handleToggleRecord}
          className={`px-3 py-2.5 rounded-xl transition-all flex items-center gap-1.5 text-xs font-semibold cursor-pointer shrink-0 min-h-[44px] ${
            isRecording 
              ? 'bg-red-600 text-white animate-pulse shadow-lg shadow-red-900/50' 
              : 'bg-stone-800 text-stone-200 hover:bg-stone-700 hover:text-amber-300 border border-stone-700'
          }`}
          title={isRecording ? 'Đang nghe... Bấm để dừng' : 'Bấm để nói bằng giọng nói tiếng Việt'}
        >
          {isRecording ? (
            <>
              <MicOff className="w-4 h-4 text-white" />
              <span className="hidden xs:inline">Đang nghe...</span>
            </>
          ) : (
            <>
              <Mic className="w-4 h-4 text-amber-400" />
              <span className="hidden xs:inline sm:inline">Nói</span>
            </>
          )}
        </button>

        <input
          id="chat-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder={
            isRecording 
              ? 'Đang lắng nghe giọng nói...' 
              : mode === 'tour_guide'
                ? `Hỏi HDV ${guideConfig.guideName}...`
                : 'Hỏi về di sản Việt Nam...'
          }
          className="flex-1 bg-transparent text-base sm:text-sm text-stone-100 placeholder-stone-400 focus:outline-none px-2 py-1 min-w-0"
        />

        <button
          id="btn-chat-send"
          onClick={() => handleSendMessage()}
          disabled={!input.trim() || loading}
          className="px-3.5 sm:px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow cursor-pointer flex items-center gap-1.5 text-xs shrink-0 min-h-[44px] active:scale-95"
          title="Gửi câu hỏi"
        >
          <span>Gửi</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Voice Settings Modal */}
      <VoiceSettingsModal
        isOpen={isVoiceSettingsOpen}
        onClose={() => setIsVoiceSettingsOpen(false)}
      />

    </div>
  );
};
