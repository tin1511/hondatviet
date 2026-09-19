import React, { useState, useRef, useEffect } from 'react';
import { 
  Mic, 
  MicOff, 
  Sparkles, 
  Play, 
  Square, 
  Save, 
  Lock, 
  Users, 
  Globe, 
  Clock, 
  MapPin, 
  Heart, 
  Trash2, 
  Share2, 
  Download, 
  Volume2,
  CheckCircle2,
  RefreshCw,
  FolderHeart
} from 'lucide-react';
import { aiService } from '../services/aiService';
import { storageService } from '../services/storageService';
import { FamilyStoryMemory } from '../types';

export const GrandparentMemoryRecorder: React.FC = () => {
  const [stories, setStories] = useState<FamilyStoryMemory[]>([]);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordSeconds, setRecordSeconds] = useState<number>(0);
  const [rawText, setRawText] = useState<string>('');
  
  // Metadata fields
  const [tellerName, setTellerName] = useState<string>('');
  const [tellerBirthYear, setTellerBirthYear] = useState<number | ''>('');
  const [location, setLocation] = useState<string>('');
  const [topic, setTopic] = useState<string>('');
  const [timePeriod, setTimePeriod] = useState<string>('');
  const [visibility, setVisibility] = useState<'private' | 'family' | 'public'>('public');

  // AI Curation result
  const [loadingAi, setLoadingAi] = useState<boolean>(false);
  const [curatedStory, setCuratedStory] = useState<string>('');
  const [suggestedTitle, setSuggestedTitle] = useState<string>('');
  const [extractedTags, setExtractedTags] = useState<string[]>([]);
  const [culturalTakeaway, setCulturalTakeaway] = useState<string>('');

  const timerRef = useRef<any>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    setStories(storageService.getFamilyStories());
  }, []);

  const handleToggleRecord = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (isRecording) {
      // Stop recording
      clearInterval(timerRef.current);
      setIsRecording(false);
      recognitionRef.current?.stop();
    } else {
      // Start recording
      setRecordSeconds(0);
      setIsRecording(true);
      timerRef.current = setInterval(() => {
        setRecordSeconds(s => s + 1);
      }, 1000);

      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.lang = 'vi-VN';
        recognition.continuous = true;
        recognition.interimResults = true;

        recognition.onresult = (event: any) => {
          let currentTranscript = '';
          for (let i = 0; i < event.results.length; i++) {
            currentTranscript += event.results[i][0].transcript + ' ';
          }
          setRawText(currentTranscript);
        };
        recognition.onerror = () => {};
        recognitionRef.current = recognition;
        recognition.start();
      } else {
        // Fallback demo speech simulation for testing
        setRawText('Hồi đó làng tôi còn nghèo lắm, nhà nào cũng xây bằng đá ong vàng. Đêm trăng rằm, cả làng tụ tập giã gạo đôi rộn rã tiếng cười...');
      }
    }
  };

  const handleRunAiCurate = async () => {
    if (!rawText.trim()) {
      alert('Vui lòng ghi âm hoặc nhập lời kể trước khi nhờ AI biên tập.');
      return;
    }
    setLoadingAi(true);
    try {
      const result = await aiService.curateGrandparentStory({
        rawTranscription: rawText,
        tellerName,
        tellerBirthYear: tellerBirthYear ? Number(tellerBirthYear) : undefined,
        location,
        topic
      });
      setCuratedStory(result.refinedStory);
      setSuggestedTitle(result.suggestedTitle);
      setExtractedTags(result.tags);
      setCulturalTakeaway(result.culturalTakeaway || '');
      setTimePeriod(result.timePeriod || timePeriod);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingAi(false);
    }
  };

  const handleSaveMemory = () => {
    const storyToSave = curatedStory || rawText;
    if (!storyToSave.trim()) return;

    const newSaved = storageService.saveFamilyStory({
      userId: 'user-current',
      tellerName,
      tellerBirthYear: tellerBirthYear ? Number(tellerBirthYear) : undefined,
      location,
      topic: suggestedTitle || topic,
      timePeriod,
      storyContent: storyToSave,
      visibility,
      tags: extractedTags.length ? extractedTags : ['Ký ức gia đình', 'Lịch sử truyền khẩu']
    });

    setStories([newSaved, ...stories.filter(s => s.id !== newSaved.id)]);
    alert('Đã lưu câu chuyện ký ức vào bộ sưu tập gia đình!');
    
    // Reset form
    setRawText('');
    setCuratedStory('');
    setSuggestedTitle('');
  };

  const handleDeleteStory = (id: string) => {
    if (confirm('Bạn có chắc muốn xóa câu chuyện này khỏi bộ sưu tập?')) {
      storageService.deleteFamilyStory(id);
      setStories(stories.filter(s => s.id !== id));
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-semibold mb-3">
          <FolderHeart className="w-3.5 h-3.5" />
          <span>Lịch Sử Truyền Khẩu & Ký Ức Gia Phả</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-serif font-bold text-stone-100">
          "Ông Bà Kể Chuyện" – Lưu Giữ Ký Ức
        </h2>
        <p className="text-stone-300 text-xs sm:text-sm mt-2">
          Ghi âm giọng kể của ông bà, người cao tuổi. AI hỗ trợ chuyển ngữ và số hóa câu chuyện, giữ trọn 100% cảm xúc và phong vị quê hương.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
        
        {/* Left Form: Recorder & Metadata */}
        <div className="lg:col-span-6 bg-stone-900 border border-stone-800 rounded-3xl p-6 shadow-2xl space-y-5">
          
          <h3 className="font-serif font-bold text-amber-200 text-base flex items-center gap-2">
            <Mic className="w-4 h-4 text-purple-400" />
            <span>Ghi Âm & Thông Tin Lời Kể</span>
          </h3>

          {/* Voice Recorder Block */}
          <div className="bg-stone-950 p-5 rounded-2xl border border-stone-800 text-center space-y-3">
            <button
              onClick={handleToggleRecord}
              className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto transition-all shadow-xl ${
                isRecording 
                  ? 'bg-red-600 text-white animate-pulse ring-4 ring-red-500/30' 
                  : 'bg-purple-600 hover:bg-purple-500 text-white hover:scale-105'
              }`}
            >
              {isRecording ? <Square className="w-6 h-6" /> : <Mic className="w-7 h-7" />}
            </button>

            <div>
              <p className="text-xs font-bold text-stone-200">
                {isRecording ? `Đang ghi âm... [${formatTime(recordSeconds)}]` : 'Bấm vào mic để bắt đầu ghi âm lời kể'}
              </p>
              <p className="text-[10px] text-stone-500 mt-0.5">
                Hệ thống tự động nhận diện giọng nói tiếng Việt thời gian thực
              </p>
            </div>
          </div>

          {/* Metadata Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block text-stone-400 mb-1">Người kể chuyện:</label>
              <input 
                type="text" 
                value={tellerName} 
                onChange={(e) => setTellerName(e.target.value)} 
                placeholder="Ví dụ: Ông Nguyễn Văn An"
                className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 text-stone-100 focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-stone-400 mb-1">Năm sinh:</label>
              <input 
                type="number" 
                value={tellerBirthYear || ''} 
                onChange={(e) => setTellerBirthYear(e.target.value ? Number(e.target.value) : '')} 
                placeholder="Ví dụ: 1945"
                className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 text-stone-100 focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-stone-400 mb-1">Quê quán / Địa phương:</label>
              <input 
                type="text" 
                value={location} 
                onChange={(e) => setLocation(e.target.value)} 
                placeholder="Ví dụ: Làng cổ Đường Lâm, Hà Nội"
                className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 text-stone-100 focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-stone-400 mb-1">Giai đoạn lịch sử:</label>
              <input 
                type="text" 
                value={timePeriod} 
                onChange={(e) => setTimePeriod(e.target.value)} 
                placeholder="Ví dụ: Thập niên 1960 - 1970"
                className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 text-stone-100 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Raw transcription area */}
          <div>
            <label className="block text-xs text-stone-400 mb-1">Nội dung lời kể (Văn bản):</label>
            <textarea
              rows={4}
              value={rawText}
              onChange={(e) => setRawText(e.target.value)}
              placeholder="Lời kể của ông bà sẽ xuất hiện ở đây sau khi ghi âm, hoặc bạn có thể gõ trực tiếp..."
              className="w-full bg-stone-950 border border-stone-700 rounded-xl p-3 text-xs text-stone-100 focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Privacy Choice */}
          <div>
            <label className="block text-xs text-stone-400 mb-1.5">Quyền riêng tư:</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'private', label: 'Riêng tư', icon: Lock },
                { id: 'family', label: 'Gia đình', icon: Users },
                { id: 'public', label: 'Cộng đồng', icon: Globe },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setVisibility(item.id as any)}
                    className={`p-2 rounded-xl border text-xs font-medium flex items-center justify-center gap-1.5 transition-all ${
                      visibility === item.id 
                        ? 'bg-purple-950/60 border-purple-500 text-purple-200' 
                        : 'bg-stone-950 border-stone-800 text-stone-400'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* AI Curate CTA */}
          <button
            onClick={handleRunAiCurate}
            disabled={loadingAi || !rawText.trim()}
            className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loadingAi ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>AI đang sắp xếp câu chuyện & gìn giữ cảm xúc...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Nhờ AI Biên Tập & Số Hóa Ký Ức</span>
              </>
            )}
          </button>

        </div>

        {/* Right Form: AI Curation Output & Save */}
        <div className="lg:col-span-6 bg-stone-900 border border-stone-800 rounded-3xl p-6 shadow-2xl space-y-5">
          
          <div className="flex items-center justify-between border-b border-stone-800 pb-3">
            <h3 className="font-serif font-bold text-amber-200 text-base flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Bản Biên Tập Ký Ức Đã Xử Lý</span>
            </h3>
            {curatedStory && (
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                ✓ Đã hoàn thiện
              </span>
            )}
          </div>

          {curatedStory ? (
            <div className="space-y-4 animate-fadeIn">
              <div>
                <span className="text-[10px] uppercase text-stone-400 font-bold">Tiêu đề gợi nhớ:</span>
                <h4 className="text-lg font-serif font-bold text-amber-100 mt-0.5">
                  {suggestedTitle || topic}
                </h4>
                <p className="text-xs text-stone-400 flex items-center gap-2 mt-1">
                  <span>Người kể: <strong>{tellerName}</strong> ({tellerBirthYear})</span>
                  <span>•</span>
                  <span>{location}</span>
                </p>
              </div>

              <div className="p-4 bg-stone-950 rounded-2xl border border-stone-800 text-xs text-stone-200 leading-relaxed font-serif whitespace-pre-line">
                {curatedStory}
              </div>

              {culturalTakeaway && (
                <div className="p-3 bg-amber-950/30 border border-amber-500/30 rounded-xl text-xs text-amber-200">
                  <strong>Thông điệp lưu truyền:</strong> {culturalTakeaway}
                </div>
              )}

              {extractedTags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {extractedTags.map((t, idx) => (
                    <span key={idx} className="text-[10px] px-2 py-0.5 bg-stone-950 text-stone-300 rounded border border-stone-800">
                      #{t}
                    </span>
                  ))}
                </div>
              )}

              <button
                onClick={handleSaveMemory}
                className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>Lưu Vào Kho Lưu Trữ Ký Ức Gia Đình</span>
              </button>
            </div>
          ) : (
            <div className="py-20 text-center text-stone-500 space-y-2">
              <FolderHeart className="w-12 h-12 text-stone-700 mx-auto" />
              <p className="text-xs text-stone-400">Chưa có bản biên tập</p>
              <p className="text-[11px] text-stone-500 max-w-xs mx-auto">
                Ghi âm giọng nói hoặc nhập nội dung ở cột bên trái và bấm "Nhờ AI Biên Tập".
              </p>
            </div>
          )}

        </div>

      </div>

      {/* Family Stories Archive Collection */}
      <div className="border-t border-stone-800 pt-8">
        <h3 className="font-serif font-bold text-amber-100 text-xl mb-4 flex items-center gap-2">
          <FolderHeart className="w-5 h-5 text-purple-400" />
          <span>Kho Lưu Trữ Ký Ức Của Bạn & Cộng Đồng ({stories.length})</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {stories.map((s) => (
            <div key={s.id} className="bg-stone-900 border border-stone-800 rounded-2xl p-5 space-y-3 shadow-md">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30 font-semibold">
                    {s.timePeriod || 'Ký ức xưa'}
                  </span>
                  <h4 className="font-serif font-bold text-stone-100 text-base mt-1.5">{s.topic}</h4>
                  <p className="text-xs text-stone-400 flex items-center gap-1.5 mt-0.5">
                    <MapPin className="w-3 h-3 text-red-400" />
                    <span>{s.tellerName} ({s.tellerBirthYear}) • {s.location}</span>
                  </p>
                </div>

                <button
                  onClick={() => handleDeleteStory(s.id)}
                  className="text-stone-600 hover:text-red-400 p-1"
                  title="Xóa"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs text-stone-300 leading-relaxed line-clamp-4 font-serif bg-stone-950 p-3 rounded-xl border border-stone-800/80">
                "{s.storyContent}"
              </p>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-stone-800/60 text-[11px] text-stone-400">
                <div className="flex items-center gap-1">
                  {s.visibility === 'public' && <span className="text-emerald-400 flex items-center gap-1"><Globe className="w-3 h-3" /> Công khai</span>}
                  {s.visibility === 'family' && <span className="text-sky-400 flex items-center gap-1"><Users className="w-3 h-3" /> Gia đình</span>}
                  {s.visibility === 'private' && <span className="text-stone-400 flex items-center gap-1"><Lock className="w-3 h-3" /> Riêng tư</span>}
                </div>

                <button
                  onClick={() => aiService.speakText(s.storyContent)}
                  className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Nghe đọc</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
