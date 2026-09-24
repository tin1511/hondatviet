import React, { useState, useEffect } from 'react';
import { Sliders, Volume2, RotateCcw, X, Check, Play, Square, Sparkles, Shield, Cpu, Globe, Key, AlertCircle } from 'lucide-react';
import { ttsService, VoiceSettings, DEFAULT_VOICE_SETTINGS } from '../services/ttsService';
import { getTTSConfig, saveTTSConfig, TTSConfig, TTSProviderType, DEFAULT_TTS_CONFIG } from '../config/ttsConfig';

interface VoiceSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const VIENEU_VOICE_PRESETS = [
  { id: 'Ngọc Lan', name: 'Ngọc Lan', desc: 'Nữ Miền Bắc (Chuẩn VieNeu Cloud - Truyền cảm, thanh nhã)', tag: 'Khuyên Dùng' },
  { id: 'Bảo An', name: 'Bảo An', desc: 'Nữ Thuyết Minh Viên (Ấm áp, biểu cảm dẫn tour di sản)', tag: 'HDV Du Lịch' },
  { id: 'Hương Trà', name: 'Hương Trà', desc: 'Nữ Cố Đô Huế (Dịu dàng, đằm thắm, lịch thiệp)', tag: 'Cố Đô' },
  { id: 'Minh Quang', name: 'Minh Quang', desc: 'Nam Miền Bắc (Trầm ấm, đĩnh đạc, hào hùng lịch sử)', tag: 'Lịch Sử' },
  { id: 'Phương Nam', name: 'Phương Nam', desc: 'Nam Miền Nam (Thân thiện, tươi vui, hào sảng)', tag: 'Miền Nam' },
];

export const VoiceSettingsModal: React.FC<VoiceSettingsModalProps> = ({ isOpen, onClose }) => {
  const [settings, setSettings] = useState<VoiceSettings>(ttsService.getSettings());
  const [ttsConfig, setTtsConfig] = useState<TTSConfig>(getTTSConfig());
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [isPlayingSample, setIsPlayingSample] = useState(false);
  const [showAdvancedVieNeu, setShowAdvancedVieNeu] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setSettings(ttsService.getSettings());
      setTtsConfig(getTTSConfig());

      // Load browser voices
      const loaded = ttsService.getVoices();
      setVoices(loaded);

      if (typeof window !== 'undefined' && window.speechSynthesis) {
        const updateVoices = () => {
          setVoices(ttsService.getVoices());
        };
        window.speechSynthesis.onvoiceschanged = updateVoices;
      }
    } else {
      ttsService.stop();
      setIsPlayingSample(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSettingChange = (key: keyof VoiceSettings, value: any) => {
    const updated = { ...settings, [key]: value };
    setSettings(updated);
    ttsService.saveSettings({ [key]: value });
  };

  const handleTtsConfigChange = (key: keyof TTSConfig, value: any) => {
    const updated = { ...ttsConfig, [key]: value };
    setTtsConfig(updated);
    saveTTSConfig({ [key]: value });
  };

  const handleReset = () => {
    const defaultSet = ttsService.resetSettings();
    setSettings(defaultSet);
    const defaultTts = { ...DEFAULT_TTS_CONFIG };
    setTtsConfig(defaultTts);
    saveTTSConfig(defaultTts);
    ttsService.stop();
    setIsPlayingSample(false);
  };

  const handlePlaySample = () => {
    ttsService.prepareForMobilePlayback();
    if (isPlayingSample) {
      ttsService.stop();
      setIsPlayingSample(false);
      return;
    }

    setIsPlayingSample(true);
    const isVieNeu = ttsConfig.provider === 'vieneu';
    const sampleText = isVieNeu
      ? `Dạ, em là Bảo An - Hướng dẫn viên du lịch văn hóa. Đây là giọng đọc thuyết minh VieNeu AI công nghệ cao đồng hành cùng quý cô bác và anh chị!`
      : 'Dạ em chào quý cô bác và anh chị, đây là giọng đọc thuyết minh di sản thử nghiệm của trợ lý Hồn Đất Việt.';

    ttsService.speak(sampleText, {
      provider: ttsConfig.provider,
      voice: ttsConfig.voice,
      speaker: ttsConfig.voice,
      rate: settings.rate,
      pitch: settings.pitch,
      volume: settings.volume,
      voiceURI: settings.voiceURI,
      onEnd: () => setIsPlayingSample(false),
      onError: () => setIsPlayingSample(false)
    });
  };

  // Sort browser voices
  const sortedVoices = [...voices].sort((a, b) => {
    const aIsVi = a.lang.toLowerCase().startsWith('vi') || a.name.toLowerCase().includes('viet');
    const bIsVi = b.lang.toLowerCase().startsWith('vi') || b.name.toLowerCase().includes('viet');
    if (aIsVi && !bIsVi) return -1;
    if (!aIsVi && bIsVi) return 1;
    return a.name.localeCompare(b.name);
  });

  const viVoicesCount = sortedVoices.filter(
    (v) => v.lang.toLowerCase().startsWith('vi') || v.name.toLowerCase().includes('viet')
  ).length;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-2 sm:p-4 pt-2 sm:pt-4 bg-black/80 backdrop-blur-md overflow-hidden animate-fadeIn">
      <div className="bg-stone-900 border border-amber-500/40 rounded-3xl w-full max-w-xl p-5 sm:p-6 shadow-2xl space-y-5 text-stone-100 relative max-h-[96vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-serif font-bold text-stone-100 flex items-center gap-2">
                <span>Cấu Hình Giọng Đọc Thuyết Minh (TTS)</span>
                <Sparkles className="w-4 h-4 text-amber-400" />
              </h3>
              <p className="text-xs text-stone-400">
                Tùy chỉnh công nghệ giọng đọc VieNeu AI cho Hướng dẫn viên Bảo An & toàn hệ thống
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-200 hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Controls */}
        <div className="space-y-4">
          
          {/* 0. Enable / Disable TTS Toggle */}
          <div className="flex items-center justify-between bg-stone-950/80 p-3.5 rounded-2xl border border-stone-800">
            <div>
              <span className="text-xs font-semibold text-stone-200 block">🔊 Trạng Thái Giọng Đọc</span>
              <span className="text-[11px] text-stone-400 block">Bật giọng đọc khi chạm nút "Đọc" hoặc trả lời từ AI</span>
            </div>
            <button
              onClick={() => handleSettingChange('enabled', !settings.enabled)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                settings.enabled
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                  : 'bg-stone-800 text-stone-400 border border-stone-700'
              }`}
            >
              {settings.enabled ? '🟢 Đang Bật' : '⚪ Đang Tắt'}
            </button>
          </div>

          {/* 1. TTS Provider Choice: VieNeu vs Web Speech */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-stone-300 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-amber-400" />
                <span>Bộ Tạo Giọng Đọc (TTS Engine)</span>
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-mono font-bold">
                {ttsConfig.provider === 'vieneu' ? 'VieNeu Cloud v4' : 'Browser Web Speech'}
              </span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {/* Option A: VieNeu Cloud TTS */}
              <button
                type="button"
                onClick={() => handleTtsConfigChange('provider', 'vieneu')}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer relative ${
                  ttsConfig.provider === 'vieneu'
                    ? 'bg-gradient-to-br from-amber-950/50 via-stone-900 to-stone-900 border-amber-500 shadow-md shadow-amber-950/40 ring-1 ring-amber-500/50'
                    : 'bg-stone-950/60 border-stone-800 hover:border-stone-700 text-stone-400'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-base">🎙️</span>
                    <span className={`text-xs font-bold ${ttsConfig.provider === 'vieneu' ? 'text-amber-300' : 'text-stone-200'}`}>
                      VieNeu Cloud TTS
                    </span>
                  </div>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-500 text-stone-950 font-bold">
                    Khuyên Dùng
                  </span>
                </div>
                <p className="text-[11px] text-stone-400 leading-relaxed">
                  Giọng AI đọc tiếng Việt chuẩn truyền cảm, ấm áp, ngắt nghỉ mượt mà chuyên biệt cho HDV di sản.
                </p>
                {ttsConfig.provider === 'vieneu' && (
                  <span className="inline-block mt-2 text-[10px] text-emerald-400 font-semibold">
                    ✓ Đang sử dụng để thuyết minh
                  </span>
                )}
              </button>

              {/* Option B: Web Speech API */}
              <button
                type="button"
                onClick={() => handleTtsConfigChange('provider', 'web_speech')}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                  ttsConfig.provider === 'web_speech'
                    ? 'bg-gradient-to-br from-stone-800 via-stone-900 to-stone-900 border-amber-500 shadow-md ring-1 ring-amber-500/50'
                    : 'bg-stone-950/60 border-stone-800 hover:border-stone-700 text-stone-400'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-base">🌐</span>
                    <span className={`text-xs font-bold ${ttsConfig.provider === 'web_speech' ? 'text-amber-300' : 'text-stone-200'}`}>
                      Web Speech API
                    </span>
                  </div>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-stone-800 text-stone-400 font-mono">
                    Native
                  </span>
                </div>
                <p className="text-[11px] text-stone-400 leading-relaxed">
                  Sử dụng giọng đọc tổng hợp có sẵn trên hệ điều hành máy tính / điện thoại.
                </p>
                {ttsConfig.provider === 'web_speech' && (
                  <span className="inline-block mt-2 text-[10px] text-emerald-400 font-semibold">
                    ✓ Đang sử dụng giọng trình duyệt
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* 2. Specific Settings based on Provider */}
          {ttsConfig.provider === 'vieneu' ? (
            <div className="space-y-3 bg-stone-950/70 p-4 rounded-2xl border border-amber-500/30 animate-fadeIn">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-amber-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Chọn Giọng Đọc VieNeu AI</span>
                </span>
                <span className="text-[10px] text-stone-400">
                  {VIENEU_VOICE_PRESETS.length} chất giọng vùng miền
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {VIENEU_VOICE_PRESETS.map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => handleTtsConfigChange('voice', v.id)}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      (ttsConfig.voice || 'Ngọc Lan') === v.id
                        ? 'bg-amber-500/15 border-amber-500 text-amber-200 ring-1 ring-amber-500/40'
                        : 'bg-stone-900 border-stone-800 hover:border-stone-700 text-stone-300'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-1">
                      <span className="text-xs font-bold text-stone-100 flex items-center gap-1">
                        <span>🎙️</span>
                        <span>{v.name}</span>
                      </span>
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-stone-800 text-amber-300 font-medium">
                        {v.tag}
                      </span>
                    </div>
                    <span className="text-[10px] text-stone-400 line-clamp-1">
                      {v.desc}
                    </span>
                  </button>
                ))}
              </div>

              {/* Fallback Option */}
              <div className="pt-2 border-t border-stone-800/80 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-semibold text-stone-200 block">
                    ☑ Tự Động Fallback Giọng Trình Duyệt
                  </span>
                  <span className="text-[10px] text-stone-400 block">
                    Chuyển sang giọng máy nếu máy chủ VieNeu bận hoặc hết ngạch
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleTtsConfigChange('fallbackEnabled', !ttsConfig.fallbackEnabled)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                    ttsConfig.fallbackEnabled
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-stone-800 text-stone-400'
                  }`}
                >
                  {ttsConfig.fallbackEnabled ? 'Bật' : 'Tắt'}
                </button>
              </div>

              {/* Advanced VieNeu Endpoint / Key Accordion */}
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => setShowAdvancedVieNeu(!showAdvancedVieNeu)}
                  className="text-[10px] text-stone-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <span>{showAdvancedVieNeu ? '▼ Ẩn cài đặt endpoint nâng cao' : '▶ Tùy chỉnh endpoint & API Key VieNeu'}</span>
                </button>

                {showAdvancedVieNeu && (
                  <div className="mt-2.5 p-3 bg-stone-900/90 rounded-xl border border-stone-800 space-y-2 text-xs">
                    <div>
                      <label className="text-[10px] font-semibold text-stone-400 block mb-1">
                        VieNeu Endpoint:
                      </label>
                      <input
                        type="text"
                        value={ttsConfig.endpoint || ''}
                        onChange={(e) => handleTtsConfigChange('endpoint', e.target.value)}
                        placeholder="https://api.vieneu.io/api/v1/audio/speech"
                        className="w-full bg-stone-950 border border-stone-700 rounded-lg px-2.5 py-1.5 text-[11px] text-stone-200 font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-semibold text-stone-400 block mb-1">
                        VieNeu API Key (Tùy chọn):
                      </label>
                      <input
                        type="password"
                        value={ttsConfig.apiKey || ''}
                        onChange={(e) => handleTtsConfigChange('apiKey', e.target.value)}
                        placeholder="Nhập API Key nếu có (hoặc dùng mặc định hệ thống)"
                        className="w-full bg-stone-950 border border-stone-700 rounded-lg px-2.5 py-1.5 text-[11px] text-stone-200 font-mono"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Web Speech Native Voices Selection */
            <div className="space-y-1.5 bg-stone-950/60 p-3.5 rounded-2xl border border-stone-800 animate-fadeIn">
              <label className="text-xs font-semibold text-stone-300 flex items-center justify-between">
                <span>Giọng Đọc Trình Duyệt</span>
                {viVoicesCount > 0 ? (
                  <span className="text-[10px] text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-500/30 font-medium">
                    Tìm thấy {viVoicesCount} giọng Tiếng Việt
                  </span>
                ) : (
                  <span className="text-[10px] text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded-full border border-amber-500/30 font-medium">
                    Sử dụng giọng hệ thống mặc định
                  </span>
                )}
              </label>
              <select
                value={settings.voiceURI || ''}
                onChange={(e) => handleSettingChange('voiceURI', e.target.value)}
                className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 text-xs text-stone-200 focus:outline-none focus:border-amber-500 cursor-pointer"
              >
                <option value="">-- Tự động chọn giọng Tiếng Việt phù hợp nhất --</option>
                {sortedVoices.map((voice) => {
                  const isVi =
                    voice.lang.toLowerCase().startsWith('vi') ||
                    voice.name.toLowerCase().includes('viet');
                  return (
                    <option key={voice.voiceURI} value={voice.voiceURI}>
                      {isVi ? '🇻🇳 ' : '🌐 '} {voice.name} ({voice.lang})
                    </option>
                  );
                })}
              </select>
            </div>
          )}

          {/* 3. Speed / Rate */}
          <div className="space-y-2 bg-stone-950/60 p-3.5 rounded-2xl border border-stone-800">
            <div className="flex items-center justify-between text-xs font-medium">
              <span className="text-stone-300">Tốc Độ Đọc (Speed)</span>
              <span className="text-amber-400 font-bold">{settings.rate.toFixed(2)}x</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="2.0"
              step="0.05"
              value={settings.rate}
              onChange={(e) => handleSettingChange('rate', parseFloat(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
            {/* Presets */}
            <div className="grid grid-cols-4 gap-1.5 pt-1">
              {[
                { label: '0.75x Chậm', val: 0.75 },
                { label: '1.0x Chuẩn', val: 1.0 },
                { label: '1.25x Nhanh', val: 1.25 },
                { label: '1.5x Rất nhanh', val: 1.5 }
              ].map((p) => (
                <button
                  key={p.val}
                  type="button"
                  onClick={() => handleSettingChange('rate', p.val)}
                  className={`py-1 rounded-lg text-[11px] font-medium transition-colors cursor-pointer ${
                    Math.abs(settings.rate - p.val) < 0.02
                      ? 'bg-amber-500 text-stone-950 font-bold'
                      : 'bg-stone-800 text-stone-400 hover:text-stone-200'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* 4. Pitch & Volume (Relevant for Web Speech or fine-tuning) */}
          <div className="space-y-2 bg-stone-950/60 p-3.5 rounded-2xl border border-stone-800">
            <div className="flex items-center justify-between text-xs font-medium">
              <span className="text-stone-300">Âm Lượng (Volume)</span>
              <span className="text-amber-400 font-bold">{Math.round(settings.volume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="1.0"
              step="0.05"
              value={settings.volume}
              onChange={(e) => handleSettingChange('volume', parseFloat(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>

        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-stone-800">
          <button
            type="button"
            onClick={handlePlaySample}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
              isPlayingSample
                ? 'bg-red-600 text-white animate-pulse shadow-lg shadow-red-900/50'
                : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 shadow-md'
            }`}
          >
            {isPlayingSample ? (
              <>
                <Square className="w-3.5 h-3.5 fill-current" />
                <span>⏹ Dừng phát thử</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4" />
                <span>🔊 Nghe thử giọng {ttsConfig.provider === 'vieneu' ? `VieNeu (${ttsConfig.voice || 'Ngọc Lan'})` : 'Trình duyệt'}</span>
              </>
            )}
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleReset}
              className="px-3 py-2 rounded-xl text-xs font-medium text-stone-400 hover:text-stone-200 hover:bg-stone-800 border border-stone-800 flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Khôi phục cài đặt gốc"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Mặc định</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-stone-800 hover:bg-stone-700 text-stone-100 border border-stone-700 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Lưu & Đóng</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
