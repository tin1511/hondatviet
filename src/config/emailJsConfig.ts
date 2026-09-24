export interface EmailJSConfig {
  serviceId: string;
  templateId: string;
  publicKey: string;
  privateKey?: string;
  enabled: boolean;
  senderName?: string;
  otpExpirationMinutes: number;
}

export const STORAGE_KEY_EMAILJS_CONFIG = 'heritage_emailjs_config';

export const DEFAULT_EMAILJS_CONFIG: EmailJSConfig = {
  serviceId: (import.meta as any).env?.VITE_EMAILJS_SERVICE_ID || '',
  templateId: (import.meta as any).env?.VITE_EMAILJS_TEMPLATE_ID || '',
  publicKey: (import.meta as any).env?.VITE_EMAILJS_PUBLIC_KEY || '',
  privateKey: '',
  enabled: true,
  senderName: 'Hồn Đất Việt',
  otpExpirationMinutes: 5
};

/**
 * Gets currently active EmailJS configuration from localStorage or default env
 */
export function getEmailJSConfig(): EmailJSConfig {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const saved = localStorage.getItem(STORAGE_KEY_EMAILJS_CONFIG);
      if (saved) {
        return { ...DEFAULT_EMAILJS_CONFIG, ...JSON.parse(saved) };
      }
    }
  } catch (e) {
    console.warn('[EmailJSConfig] Failed to read from localStorage:', e);
  }
  return { ...DEFAULT_EMAILJS_CONFIG };
}

/**
 * Saves EmailJS configuration to localStorage
 */
export function saveEmailJSConfig(newConfig: Partial<EmailJSConfig>): EmailJSConfig {
  const current = getEmailJSConfig();
  const updated = { ...current, ...newConfig };
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(STORAGE_KEY_EMAILJS_CONFIG, JSON.stringify(updated));
    }
  } catch (e) {
    console.warn('[EmailJSConfig] Failed to save to localStorage:', e);
  }
  return updated;
}

/**
 * Resets EmailJS configuration to default
 */
export function resetEmailJSConfig(): EmailJSConfig {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem(STORAGE_KEY_EMAILJS_CONFIG);
    }
  } catch (e) {
    // Ignore
  }
  return { ...DEFAULT_EMAILJS_CONFIG };
}
