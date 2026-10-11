export type TTSProviderType = 'vieneu' | 'web_speech';

export interface TTSConfig {
  provider: TTSProviderType;
  endpoint: string;
  apiKey?: string;
  voice: string;
  language: string;
  enabled: boolean;
  fallbackEnabled: boolean;
}

export const STORAGE_KEY_TTS_CONFIG = 'heritage_tts_config';

export const DEFAULT_TTS_CONFIG: TTSConfig = {
  provider: (import.meta.env?.VITE_TTS_PROVIDER as TTSProviderType) || 'vieneu',
  endpoint: import.meta.env?.VITE_TTS_API_URL || 'https://api.vieneu.io/api/v1/audio/speech',
  apiKey: import.meta.env?.VITE_TTS_API_KEY || '',
  voice: 'Ngọc Lan',
  language: 'vi-VN',
  enabled: true,
  fallbackEnabled: true,
};

/**
 * Retrieves current TTS settings from localStorage or default environment variables
 */
export function getTTSConfig(): TTSConfig {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const saved = localStorage.getItem(STORAGE_KEY_TTS_CONFIG);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Auto-migrate outdated or legacy VieNeu endpoints to official OpenAI-compatible endpoint
        if (!parsed.endpoint || parsed.endpoint.includes('api.vieneu.com') || parsed.endpoint === 'https://vieneu.io/v1/tts' || parsed.endpoint === 'https://vieneu.io/v1/audio/speech') {
          parsed.endpoint = DEFAULT_TTS_CONFIG.endpoint;
        }
        if (!parsed.voice || parsed.voice === 'default') {
          parsed.voice = DEFAULT_TTS_CONFIG.voice;
        }
        // Ensure provider is either 'vieneu' or 'web_speech'
        if (!parsed.provider) {
          parsed.provider = 'vieneu';
        }
        return { ...DEFAULT_TTS_CONFIG, ...parsed };
      }
    }
  } catch (e) {
    console.warn('[TTSConfig] Failed to read from localStorage:', e);
  }
  return { ...DEFAULT_TTS_CONFIG };
}

/**
 * Saves updated TTS settings to localStorage
 */
export function saveTTSConfig(newConfig: Partial<TTSConfig>): TTSConfig {
  const current = getTTSConfig();
  const updated = { ...current, ...newConfig };
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(STORAGE_KEY_TTS_CONFIG, JSON.stringify(updated));
    }
  } catch (e) {
    console.warn('[TTSConfig] Failed to save to localStorage:', e);
  }
  return updated;
}

/**
 * Resets TTS settings to default
 */
export function resetTTSConfig(): TTSConfig {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem(STORAGE_KEY_TTS_CONFIG);
    }
  } catch (e) {
    // Ignore
  }
  return { ...DEFAULT_TTS_CONFIG };
}
