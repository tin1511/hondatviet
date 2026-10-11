import { BaseAIProvider, AIResponse } from './BaseAIProvider';
import { AIConfig, DEFAULT_SYSTEM_PROMPT } from '../config/aiConfig';
import { AI_MODEL_PROFILES, AIModelProfile } from '../config/aiModels';

export class GeminiProvider implements BaseAIProvider {
  providerName: 'gemini' = 'gemini';

  async generateText(prompt: string, config?: AIConfig): Promise<AIResponse> {
    const startTime = Date.now();
    const res = await fetch('/api/ai/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: prompt,
        overrideProvider: 'gemini',
        overrideModel: config?.model || 'gemini-flash-latest',
        temperature: config?.temperature ?? 0.7,
        maxTokens: config?.maxTokens ?? 2048,
        systemPrompt: config?.systemPrompt || DEFAULT_SYSTEM_PROMPT
      })
    });

    const data = await res.json();
    const responseTimeMs = Date.now() - startTime;

    if (!res.ok || !data.success) {
      throw new Error(data.error || 'Lỗi kết nối Gemini Provider');
    }

    return {
      text: data.reply,
      provider: 'gemini',
      model: data.model || config?.model || 'gemini-flash-latest',
      responseTimeMs
    };
  }

  async chat(messages: { role: string; text: string }[], config?: AIConfig): Promise<AIResponse> {
    const startTime = Date.now();
    const lastMsg = messages[messages.length - 1]?.text || 'Xin chào';
    const history = messages.slice(0, -1).map((m) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      text: m.text
    }));

    const res = await fetch('/api/ai/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: lastMsg,
        conversationHistory: history,
        overrideProvider: 'gemini',
        overrideModel: config?.model || 'gemini-flash-latest',
        temperature: config?.temperature ?? 0.7,
        maxTokens: config?.maxTokens ?? 2048,
        systemPrompt: config?.systemPrompt || DEFAULT_SYSTEM_PROMPT
      })
    });

    const data = await res.json();
    const responseTimeMs = Date.now() - startTime;

    if (!res.ok || !data.success) {
      throw new Error(data.error || 'Lỗi hội thoại Gemini Provider');
    }

    return {
      text: data.reply,
      provider: 'gemini',
      model: data.model || config?.model || 'gemini-flash-latest',
      responseTimeMs
    };
  }

  async testConnection(config?: AIConfig): Promise<{ success: boolean; message: string; responseTimeMs: number }> {
    const startTime = Date.now();
    try {
      const res = await fetch('/api/ai/test-connection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          provider: 'gemini',
          model: config?.model || 'gemini-flash-latest',
          apiKey: config?.apiKey
        })
      });
      const data = await res.json();
      const responseTimeMs = Date.now() - startTime;

      if (res.ok && data.success) {
        return {
          success: true,
          message: data.message || 'Kết nối Gemini API thành công!',
          responseTimeMs
        };
      } else {
        return {
          success: false,
          message: data.error || 'Không thể kết nối với Gemini API.',
          responseTimeMs
        };
      }
    } catch (err: any) {
      return {
        success: false,
        message: err.message || 'Lỗi mạng khi kiểm tra kết nối Gemini.',
        responseTimeMs: Date.now() - startTime
      };
    }
  }

  getModels(): AIModelProfile[] {
    return AI_MODEL_PROFILES.filter((m) => m.provider === 'gemini');
  }
}
