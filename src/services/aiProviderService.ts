import { getAIConfig, AIConfig, AIProvider } from '../config/aiConfig';
import { getProvider, AIResponse } from '../providers';

export const aiProviderService = {
  /**
   * Generates response using Primary Provider -> Fallback Provider -> Safe Error Message
   */
  async generateResponse(
    prompt: string,
    options?: {
      overrideConfig?: Partial<AIConfig>;
      history?: { role: string; text: string }[];
    }
  ): Promise<AIResponse> {
    const config = { ...getAIConfig(), ...options?.overrideConfig };
    const primaryProviderName = config.provider || 'gemini';

    try {
      const primaryProvider = getProvider(primaryProviderName);
      if (options?.history && options.history.length > 0) {
        return await primaryProvider.chat(options.history.concat({ role: 'user', text: prompt }), config);
      } else {
        return await primaryProvider.generateText(prompt, config);
      }
    } catch (primaryErr: any) {
      console.warn(`[AIProviderService] Primary Provider (${primaryProviderName}/${config.model}) failed:`, primaryErr?.message || primaryErr);

      // Attempt Fallback Provider if configured
      if (config.fallbackProvider && (config.fallbackProvider !== config.provider || config.fallbackModel !== config.model)) {
        try {
          console.log(`[AIProviderService] Attempting Fallback Provider: ${config.fallbackProvider}/${config.fallbackModel}`);
          const fallbackConfig: AIConfig = {
            ...config,
            provider: config.fallbackProvider,
            model: config.fallbackModel || config.model
          };
          const fallbackProvider = getProvider(config.fallbackProvider);
          if (options?.history && options.history.length > 0) {
            return await fallbackProvider.chat(options.history.concat({ role: 'user', text: prompt }), fallbackConfig);
          } else {
            return await fallbackProvider.generateText(prompt, fallbackConfig);
          }
        } catch (fallbackErr: any) {
          console.error(`[AIProviderService] Fallback Provider (${config.fallbackProvider}) also failed:`, fallbackErr?.message || fallbackErr);
        }
      }

      // Safe user-friendly error message without crashing
      return {
        text: 'AI hiện đang quá tải hoặc đã hết hạn mức. Vui lòng thử lại sau.',
        provider: primaryProviderName,
        model: config.model,
        responseTimeMs: 0
      };
    }
  },

  /**
   * Tests connection for primary & fallback providers
   */
  async testConnection(configOverride?: Partial<AIConfig>) {
    const config = { ...getAIConfig(), ...configOverride };
    const primaryProvider = getProvider(config.provider);
    const primaryResult = await primaryProvider.testConnection(config);

    let fallbackResult = null;
    if (config.fallbackProvider) {
      const fallbackConfig: AIConfig = {
        ...config,
        provider: config.fallbackProvider,
        model: config.fallbackModel || config.model
      };
      const fallbackProvider = getProvider(config.fallbackProvider);
      fallbackResult = await fallbackProvider.testConnection(fallbackConfig);
    }

    return {
      primary: primaryResult,
      fallback: fallbackResult
    };
  }
};
