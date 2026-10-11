import React, { useState, useEffect } from 'react';
import { 
  Globe, 
  Check, 
  Volume2, 
  VolumeX, 
  X, 
  Sparkles, 
  Languages, 
  MessageSquareQuote,
  CheckCircle2,
  Info
} from 'lucide-react';
import { 
  SUPPORTED_LANGUAGES, 
  LanguageInfo, 
  languageService 
} from '../services/languageService';

interface LanguageSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLanguage: string;
  onSelectLanguage: (langCode: string) => void;
}

export const LanguageSettingsModal: React.FC<LanguageSettingsModalProps> = ({
  isOpen,
  onClose,
  currentLanguage,
  onSelectLanguage
}) => {
  const [selectedLang, setSelectedLang] = useState<string>(currentLanguage);
  const [playingLangCode, setPlayingLangCode] = useState<string | null>(null);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [autoTranslate, setAutoTranslate] = useState(true);

  useEffect(() => {
    setSelectedLang(currentLanguage);
  }, [currentLanguage, isOpen]);

  // Cleanup speech synthesis if modal closes
  useEffect(() => {
    if (!isOpen) {
      languageService.stopSampleGreeting();
      setPlayingLangCode(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePlaySample = (code: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (playingLangCode === code) {
      languageService.stopSampleGreeting();
      setPlayingLangCode(null);
    } else {
      setPlayingLangCode(code);
      const played = languageService.playSampleGreeting(code, () => {
        setPlayingLangCode(null);
      });
      if (!played) {
        setPlayingLangCode(null);
      }
    }
  };

  const handleCardClick = (code: string) => {
    setSelectedLang(code);
    languageService.setLanguage(code);
    onSelectLanguage(code);
    setShowSuccessToast(true);
    setTimeout(() => {
      setShowSuccessToast(false);
    }, 1200);
  };

  const handleApply = (langToApply: string = selectedLang) => {
    languageService.setLanguage(langToApply);
    onSelectLanguage(langToApply);
    setShowSuccessToast(true);
    setTimeout(() => {
      setShowSuccessToast(false);
      onClose();
    }, 800);
  };

  const activeLangInfo = languageService.getLanguageInfo(selectedLang);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-2xl bg-stone-900 border border-stone-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Success Toast */}
        {showSuccessToast && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-emerald-500 text-stone-950 px-4 py-2 rounded-full font-bold text-xs flex items-center gap-2 shadow-xl animate-bounce">
            <CheckCircle2 className="w-4 h-4" />
            <span>{languageService.t('lang.appliedSuccess', selectedLang)}</span>
          </div>
        )}

        {/* Modal Header */}
        <div className="p-6 border-b border-stone-800 bg-stone-950/60 flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-600/30 to-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 shadow-inner">
              <Languages className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif font-bold text-lg sm:text-xl text-stone-100">
                  {languageService.t('lang.title', selectedLang)}
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                  {activeLangInfo.flag} {activeLangInfo.code.toUpperCase()}
                </span>
              </div>
              <p className="text-xs text-stone-400 mt-0.5 line-clamp-2">
                {languageService.t('lang.subtitle', selectedLang)}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition-colors shrink-0 cursor-pointer"
            title="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Language Selection Grid */}
        <div className="p-6 overflow-y-auto space-y-5">
          <div>
            <label className="text-xs font-bold text-stone-300 uppercase tracking-wider block mb-3 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              <span>{languageService.t('lang.selectInterface', selectedLang)}</span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SUPPORTED_LANGUAGES.map((lang) => {
                const isSelected = selectedLang === lang.code;
                const isPlaying = playingLangCode === lang.code;

                return (
                  <div
                    key={lang.code}
                    onClick={() => handleCardClick(lang.code)}
                    className={`relative p-4 rounded-2xl border transition-all cursor-pointer select-none flex flex-col justify-between ${
                      isSelected
                        ? 'bg-amber-950/30 border-amber-500/60 shadow-lg shadow-amber-950/30 ring-1 ring-amber-500/40'
                        : 'bg-stone-950/60 border-stone-800 hover:border-stone-700 hover:bg-stone-800/40'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl" role="img" aria-label={lang.name}>
                          {lang.flag}
                        </span>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-sm text-stone-100">
                              {lang.nativeName}
                            </span>
                            {lang.code === 'vi' && (
                              <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 font-semibold">
                                Gốc
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-stone-400">
                            {lang.name}
                          </span>
                        </div>
                      </div>

                      {isSelected && (
                        <div className="w-6 h-6 rounded-full bg-amber-500 text-stone-950 flex items-center justify-center shrink-0">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      )}
                    </div>

                    <p className="text-[11px] text-stone-400 mb-3 leading-relaxed">
                      {lang.description}
                    </p>

                    <div className="pt-2 border-t border-stone-800/60 flex items-center justify-between gap-2">
                      <span className="text-[10px] text-stone-500 truncate">
                        🎙️ {lang.aiVoiceAccent}
                      </span>

                      <button
                        type="button"
                        onClick={(e) => handlePlaySample(lang.code, e)}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold flex items-center gap-1 transition-colors shrink-0 ${
                          isPlaying
                            ? 'bg-amber-500 text-stone-950 animate-pulse'
                            : 'bg-stone-800 hover:bg-stone-700 text-amber-300 border border-stone-700'
                        }`}
                        title="Nghe thử giọng đọc mẫu AI"
                      >
                        {isPlaying ? (
                          <>
                            <VolumeX className="w-3 h-3" />
                            <span>Dừng</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-3 h-3 text-amber-400" />
                            <span>Nghe thử</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* AI Guide Sync Note */}
          <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20 space-y-2">
            <div className="flex items-center gap-2 text-amber-300 font-bold text-xs">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Đồng Bộ Hướng Dẫn Viên Ảo & Đàm Thoại AI</span>
            </div>
            <p className="text-xs text-stone-300 leading-relaxed">
              Khi bạn chọn ngôn ngữ, toàn bộ trợ lý đối thoại AI, tính năng kể chuyện âm thanh 
              và nhận diện hình ảnh sẽ ưu tiên giải thích bằng ngôn ngữ bạn đã chọn. 
              Bạn cũng có thể chuyển đổi ngôn ngữ bất kỳ lúc nào ngay trên thanh điều hướng.
            </p>

            <div className="pt-2 flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input 
                  type="checkbox" 
                  checked={autoTranslate} 
                  onChange={(e) => setAutoTranslate(e.target.checked)}
                  className="rounded border-stone-700 text-amber-500 focus:ring-amber-500 bg-stone-800"
                />
                <span className="text-xs text-stone-300">
                  Tự động phiên âm Hán - Nôm và chú thích thuật ngữ cổ
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-5 border-t border-stone-800 bg-stone-950/80 flex items-center justify-between gap-3">
          <div className="text-xs text-stone-400 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-stone-500" />
            <span>Ngôn ngữ đã chọn: <strong className="text-amber-300">{activeLangInfo.nativeName} ({activeLangInfo.flag})</strong></span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 font-semibold text-xs transition-colors cursor-pointer"
            >
              {languageService.t('btn.cancel', selectedLang)}
            </button>
            <button
              onClick={() => handleApply(selectedLang)}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-xs shadow-md transition-all active:scale-95 cursor-pointer flex items-center gap-1.5"
            >
              <Check className="w-4 h-4 stroke-[2.5]" />
              <span>{languageService.t('lang.apply', selectedLang)}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
