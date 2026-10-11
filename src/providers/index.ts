import { AIProvider } from '../config/aiConfig';
import { BaseAIProvider } from './BaseAIProvider';
import { GeminiProvider } from './GeminiProvider';
import { OpenRouterProvider } from './OpenRouterProvider';
import { HuggingFaceProvider } from './HuggingFaceProvider';
import { CustomProvider } from './CustomProvider';

const providerInstances: Record<AIProvider, BaseAIProvider> = {
  gemini: new GeminiProvider(),
  openrouter: new OpenRouterProvider(),
  huggingface: new HuggingFaceProvider(),
  custom: new CustomProvider()
};

export function getProvider(providerName: AIProvider): BaseAIProvider {
  return providerInstances[providerName] || providerInstances.gemini;
}

export * from './BaseAIProvider';
export * from './GeminiProvider';
export * from './OpenRouterProvider';
export * from './HuggingFaceProvider';
export * from './CustomProvider';
