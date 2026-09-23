import { AIProvider } from './aiConfig';

export interface AIModelProfile {
  id: string;
  provider: AIProvider;
  name: string;
  description: string;
  tier: 'free' | 'free_tier' | 'paid';
  supportsVietnamese: boolean;
  supportsText: boolean;
  supportsVision: boolean;
}

export const AI_MODEL_PROFILES: AIModelProfile[] = [
  // Gemini Models (Google)
  {
    id: 'gemini-flash-latest',
    provider: 'gemini',
    name: 'Gemini Flash (Latest)',
    description: 'Mô hình mặc định tốc độ cao, đa phương tiện và hiểu tiếng Việt rất tốt',
    tier: 'free_tier',
    supportsVietnamese: true,
    supportsText: true,
    supportsVision: true
  },
  {
    id: 'gemini-3.8-flash',
    provider: 'gemini',
    name: 'Gemini 3.8 Flash',
    description: 'Mô hình ổn định chuyên xử lý văn bản, câu hỏi dài và phân tích dữ liệu',
    tier: 'free_tier',
    supportsVietnamese: true,
    supportsText: true,
    supportsVision: true
  },
  {
    id: 'gemini-3.1-flash-lite',
    provider: 'gemini',
    name: 'Gemini 3.1 Flash Lite',
    description: 'Mô hình siêu nhẹ, phản hồi nhanh, tối ưu cho hội thoại đơn giản',
    tier: 'free_tier',
    supportsVietnamese: true,
    supportsText: true,
    supportsVision: false
  },
  {
    id: 'gemini-2.5-pro',
    provider: 'gemini',
    name: 'Gemini 2.5 Pro',
    description: 'Mô hình suy luận chuyên sâu, phân tích lịch sử tư liệu phức tạp',
    tier: 'free_tier',
    supportsVietnamese: true,
    supportsText: true,
    supportsVision: true
  },

  // OpenRouter Free Models
  {
    id: 'meta-llama/llama-3.8b-instruct:free',
    provider: 'openrouter',
    name: 'Meta Llama 3 8B Instruct (Free)',
    description: 'Mô hình mã nguồn mở hàng đầu từ Meta, hoàn toàn miễn phí trên OpenRouter',
    tier: 'free',
    supportsVietnamese: true,
    supportsText: true,
    supportsVision: false
  },
  {
    id: 'google/gemma-2-9b-it:free',
    provider: 'openrouter',
    name: 'Google Gemma 2 9B (Free)',
    description: 'Mô hình Gemma 2 tối ưu bởi Google, hỗ trợ đa ngữ và hội thoại tự nhiên',
    tier: 'free',
    supportsVietnamese: true,
    supportsText: true,
    supportsVision: false
  },
  {
    id: 'mistralai/mistral-7b-instruct:free',
    provider: 'openrouter',
    name: 'Mistral 7B Instruct (Free)',
    description: 'Mô hình chất lượng cao gọn nhẹ từ Mistral AI',
    tier: 'free',
    supportsVietnamese: true,
    supportsText: true,
    supportsVision: false
  },
  {
    id: 'deepseek/deepseek-r1:free',
    provider: 'openrouter',
    name: 'DeepSeek R1 (Free)',
    description: 'Mô hình suy luận toán học và logic chuyên sâu',
    tier: 'free',
    supportsVietnamese: true,
    supportsText: true,
    supportsVision: false
  },
  {
    id: 'qwen/qwen-2.5-72b-instruct:free',
    provider: 'openrouter',
    name: 'Qwen 2.5 72B Instruct (Free)',
    description: 'Mô hình 72B tham số hỗ trợ tiếng Việt & ngôn ngữ châu Á sắc bén',
    tier: 'free',
    supportsVietnamese: true,
    supportsText: true,
    supportsVision: false
  },

  // HuggingFace Free Inference Models
  {
    id: 'mistralai/Mistral-7B-Instruct-v0.2',
    provider: 'huggingface',
    name: 'HuggingFace Mistral 7B v0.2',
    description: 'Serverless Inference API miễn phí từ HuggingFace Hub',
    tier: 'free_tier',
    supportsVietnamese: true,
    supportsText: true,
    supportsVision: false
  },
  {
    id: 'HuggingFaceH4/zephyr-7b-beta',
    provider: 'huggingface',
    name: 'HuggingFace Zephyr 7B Beta',
    description: 'Mô hình hội thoại được tinh chỉnh cho câu trả lời tự nhiên',
    tier: 'free_tier',
    supportsVietnamese: true,
    supportsText: true,
    supportsVision: false
  }
];

export function getModelsForProvider(provider: AIProvider): AIModelProfile[] {
  return AI_MODEL_PROFILES.filter((m) => m.provider === provider);
}

export function getModelProfile(modelId: string): AIModelProfile | undefined {
  return AI_MODEL_PROFILES.find((m) => m.id === modelId);
}
