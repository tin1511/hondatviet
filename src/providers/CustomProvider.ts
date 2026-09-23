import { BaseAIProvider, AIResponse } from './BaseAIProvider';
import { AIConfig, DEFAULT_SYSTEM_PROMPT } from '../config/aiConfig';
import { AIModelProfile } from '../config/aiModels';

export class CustomProvider implements BaseAIProvider {
  providerName: 'custom' = 'custom';

  async generateText(prompt: string, config?: AIConfig): Promise<AIResponse> {
    const startTime = Date.now();
    const res = await fetch('/api/ai/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: prompt,
        overrideProvider: 'custom',
        overrideModel: config?.model || 'custom-model',
        baseUrl: config?.baseUrl,
        temperature: config?.temperature ?? 0.7,
        maxTokens: config?.maxTokens ?? 2048,
        systemPrompt: config?.systemPrompt || DEFAULT_SYSTEM_PROMPT
      })
    });

    const data = await res.json();
    const responseTimeMs = Date.now() - startTime;

    if (!res.ok || !data.success) {
      throw new Error(data.error || 'Lỗi kết nối Custom Provider');
    }

    return {
      text: data.reply,
      provider: 'custom',
      model: data.model || config?.model || 'custom-model',
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
        overrideProvider: 'custom',
        overrideModel: config?.model || 'custom-model',
        baseUrl: config?.baseUrl,
        temperature: config?.temperature ?? 0.7,
        maxTokens: config?.maxTokens ?? 2048,
        systemPrompt: config?.systemPrompt || DEFAULT_SYSTEM_PROMPT
      })
    });

    const data = await res.json();
    const responseTimeMs = Date.now() - startTime;

    if (!res.ok || !data.success) {
      throw new Error(data.error || 'Lỗi hội thoại Custom Provider');
    }

    return {
      text: data.reply,
      provider: 'custom',
      model: data.model || config?.model || 'custom-model',
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
          provider: 'custom',
          model: config?.model || 'custom-model',
          baseUrl: config?.baseUrl,
          apiKey: config?.apiKey
        })
      });
      const data = await res.json();
      const responseTimeMs = Date.now() - startTime;

      if (res.ok && data.success) {
        return {
          success: true,
          message: data.message || 'Kết nối Custom API thành công!',
          responseTimeMs
        };
      } else {
        return {
          success: false,
          message: data.error || 'Không thể kết nối với Custom API Endpoint.',
          responseTimeMs
        };
      }
    } catch (err: any) {
      return {
        success: false,
        message: err.message || 'Lỗi mạng khi kiểm tra kết nối Custom Provider.',
        responseTimeMs: Date.now() - startTime
      };
    }
  }

  getModels(): AIModelProfile[] {
    return [];
  }
}
