import { useState, useEffect } from 'react';
import { languageService, LanguageInfo, SUPPORTED_LANGUAGES } from '../services/languageService';

export interface UseLanguageReturn {
  language: string;
  setLanguage: (newLang: string) => void;
  t: (key: string, fallback?: string) => string;
  languageInfo: LanguageInfo;
  supportedLanguages: LanguageInfo[];
  playGreeting: (code: string, onEnd?: () => void) => boolean;
  stopGreeting: () => void;
}

export function useLanguage(): UseLanguageReturn {
  const [language, setLanguageState] = useState<string>(() => languageService.getCurrentLanguage());

  useEffect(() => {
    const handleLangChanged = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail?.language) {
        setLanguageState(customEvent.detail.language);
      }
    };
    window.addEventListener('hdv_language_changed', handleLangChanged);
    return () => {
      window.removeEventListener('hdv_language_changed', handleLangChanged);
    };
  }, []);

  const setLanguage = (newLang: string) => {
    setLanguageState(newLang);
    languageService.setLanguage(newLang);
  };

  const t = (key: string, fallback?: string) => {
    return languageService.t(key, language, fallback);
  };

  return {
    language,
    setLanguage,
    t,
    languageInfo: languageService.getLanguageInfo(language),
    supportedLanguages: SUPPORTED_LANGUAGES,
    playGreeting: (code: string, onEnd?: () => void) => languageService.playSampleGreeting(code, onEnd),
    stopGreeting: () => languageService.stopSampleGreeting()
  };
}
