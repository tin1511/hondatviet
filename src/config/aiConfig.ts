export type AIProvider = 'gemini' | 'openrouter' | 'huggingface' | 'custom';

export interface AIConfig {
  provider: AIProvider;
  model: string;
  fallbackProvider?: AIProvider;
  fallbackModel?: string;
  temperature: number;
  maxTokens: number;
  baseUrl?: string;
  apiKey?: string; // Optional client-side override if needed, but primary is server env
  systemPrompt: string;
}

export const DEFAULT_SYSTEM_PROMPT = `Bạn là trợ lý AI của Hồn Đất Việt.
Hồn Đất Việt là nền tảng tìm hiểu lịch sử, văn hóa và di sản Việt Nam.

Luôn trả lời bằng tiếng Việt tự nhiên, rõ ràng và dễ hiểu.

Nếu người dùng hỏi bằng tiếng Việt:
-> Trả lời bằng tiếng Việt.

Nếu người dùng nói tiếng Việt không dấu:
-> Vẫn cố gắng hiểu nội dung và trả lời có dấu tiếng Việt chuẩn.

Không tự chuyển sang tiếng Anh trừ khi người dùng yêu cầu.
Không bịa đặt dữ kiện lịch sử.
Nếu không chắc chắn: nói rõ rằng thông tin cần được kiểm chứng.

Đối với thông tin lịch sử, văn hóa và di sản:
-> Ưu tiên tính chính xác, chân thực.
-> Phân biệt rõ sự thật lịch sử và huyền tích dân gian.
-> Giải thích phù hợp với học sinh, du khách và người dùng phổ thông.`;

export const STORAGE_KEY_AI_CONFIG = 'heritage_ai_config';

// Safe default values from environment variables or defaults
export const DEFAULT_AI_CONFIG: AIConfig = {
  provider: (import.meta.env?.VITE_AI_PROVIDER as AIProvider) || 'gemini',
  model: import.meta.env?.VITE_AI_MODEL || 'gemini-flash-latest',
  fallbackProvider: (import.meta.env?.VITE_AI_FALLBACK_PROVIDER as AIProvider) || 'gemini',
  fallbackModel: import.meta.env?.VITE_AI_FALLBACK_MODEL || 'gemini-3.8-flash',
  temperature: 0.7,
  maxTokens: 2048,
  baseUrl: import.meta.env?.VITE_AI_BASE_URL || '',
  systemPrompt: DEFAULT_SYSTEM_PROMPT
};

/**
 * Gets currently active AI configuration from localStorage or default env
 */
export function getAIConfig(): AIConfig {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const saved = localStorage.getItem(STORAGE_KEY_AI_CONFIG);
      if (saved) {
        return { ...DEFAULT_AI_CONFIG, ...JSON.parse(saved) };
      }
    }
  } catch (e) {
    console.warn('[AIConfig] Failed to read from localStorage:', e);
  }
  return { ...DEFAULT_AI_CONFIG };
}

/**
 * Saves AI configuration to localStorage
 */
export function saveAIConfig(newConfig: Partial<AIConfig>): AIConfig {
  const current = getAIConfig();
  const updated = { ...current, ...newConfig };
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(STORAGE_KEY_AI_CONFIG, JSON.stringify(updated));
    }
  } catch (e) {
    console.warn('[AIConfig] Failed to save to localStorage:', e);
  }
  return updated;
}

/**
 * Resets AI configuration to default
 */
export function resetAIConfig(): AIConfig {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem(STORAGE_KEY_AI_CONFIG);
    }
  } catch (e) {
    // Ignore
  }
  return { ...DEFAULT_AI_CONFIG };
}
