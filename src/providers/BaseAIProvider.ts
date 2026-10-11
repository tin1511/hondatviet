import { AIConfig, AIProvider } from '../config/aiConfig';
import { AIModelProfile } from '../config/aiModels';

export interface AIResponse {
  text: string;
  provider: AIProvider;
  model: string;
  responseTimeMs: number;
}

export interface BaseAIProvider {
  providerName: AIProvider;
  generateText(prompt: string, config?: AIConfig): Promise<AIResponse>;
  chat(messages: { role: string; text: string }[], config?: AIConfig): Promise<AIResponse>;
  testConnection(config?: AIConfig): Promise<{ success: boolean; message: string; responseTimeMs: number }>;
  getModels(): AIModelProfile[];
}
