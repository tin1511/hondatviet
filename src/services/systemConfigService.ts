import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebase';
import { AIConfig, getAIConfig, saveAIConfig, DEFAULT_AI_CONFIG } from '../config/aiConfig';
import { TTSConfig, getTTSConfig, saveTTSConfig, DEFAULT_TTS_CONFIG } from '../config/ttsConfig';
import { EmailJSConfig, getEmailJSConfig, saveEmailJSConfig, DEFAULT_EMAILJS_CONFIG } from '../config/emailJsConfig';

const SYSTEM_CONFIG_COLLECTION = 'system_config';
const AI_CONFIG_DOC_ID = 'ai_config';
const TTS_CONFIG_DOC_ID = 'tts_config';
const EMAILJS_CONFIG_DOC_ID = 'emailjs_config';

/**
 * Saves AI configuration to Firebase Firestore and local cache
 */
export async function saveAIConfigToFirebase(
  config: AIConfig,
  userEmail?: string
): Promise<{ success: boolean; error?: string }> {
  // 1. Save locally first for instant availability
  saveAIConfig(config);

  // 2. Persist to Firebase Firestore
  try {
    const configDocRef = doc(db, SYSTEM_CONFIG_COLLECTION, AI_CONFIG_DOC_ID);
    const payload = {
      id: AI_CONFIG_DOC_ID,
      configType: 'ai_config',
      data: {
        provider: config.provider,
        model: config.model,
        fallbackProvider: config.fallbackProvider,
        fallbackModel: config.fallbackModel,
        temperature: config.temperature,
        maxTokens: config.maxTokens,
        baseUrl: config.baseUrl || '',
        apiKey: config.apiKey || '',
        systemPrompt: config.systemPrompt
      },
      updatedAt: new Date().toISOString(),
      updatedBy: userEmail || 'admin'
    };

    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('firestore_timeout')), 4500)
    );

    await Promise.race([
      setDoc(configDocRef, payload, { merge: true }),
      timeoutPromise
    ]);

    console.log('✅ Đã lưu cấu hình Gemini AI thành công lên Firebase Firestore!');
    return { success: true };
  } catch (error: any) {
    console.warn('⚠️ Không thể đồng bộ cấu hình AI lên Firebase (sử dụng cấu hình cục bộ):', error?.message || error);
    return { 
      success: true, // Still success locally
      error: 'Đã lưu cục bộ trên trình duyệt (kết nối Firebase Firestore bị trễ hoặc đang ngoại tuyến).' 
    };
  }
}

/**
 * Loads AI configuration from Firebase Firestore with fallback to local cache
 */
export async function loadAIConfigFromFirebase(): Promise<AIConfig> {
  try {
    const configDocRef = doc(db, SYSTEM_CONFIG_COLLECTION, AI_CONFIG_DOC_ID);
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('firestore_timeout')), 3500)
    );

    const docSnap = await Promise.race([
      getDoc(configDocRef),
      timeoutPromise
    ]);

    if (docSnap.exists()) {
      const remoteData = docSnap.data();
      if (remoteData?.data) {
        const merged: AIConfig = {
          ...DEFAULT_AI_CONFIG,
          ...getAIConfig(),
          ...remoteData.data
        };
        // Update local storage cache
        saveAIConfig(merged);
        return merged;
      }
    }
  } catch (error: any) {
    // Graceful offline fallback
    console.info('ℹ️ Đang sử dụng cấu hình AI từ bộ nhớ cục bộ/môi trường');
  }

  return getAIConfig();
}

/**
 * Saves TTS configuration to Firebase Firestore and local cache
 */
export async function saveTTSConfigToFirebase(
  config: TTSConfig,
  userEmail?: string
): Promise<{ success: boolean; error?: string }> {
  // 1. Save locally first
  saveTTSConfig(config);

  // 2. Persist to Firebase Firestore
  try {
    const configDocRef = doc(db, SYSTEM_CONFIG_COLLECTION, TTS_CONFIG_DOC_ID);
    const payload = {
      id: TTS_CONFIG_DOC_ID,
      configType: 'tts_config',
      data: {
        provider: config.provider,
        endpoint: config.endpoint,
        apiKey: config.apiKey || '',
        voice: config.voice,
        language: config.language,
        enabled: config.enabled,
        fallbackEnabled: config.fallbackEnabled
      },
      updatedAt: new Date().toISOString(),
      updatedBy: userEmail || 'admin'
    };

    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('firestore_timeout')), 4500)
    );

    await Promise.race([
      setDoc(configDocRef, payload, { merge: true }),
      timeoutPromise
    ]);

    console.log('✅ Đã lưu cấu hình VieNeu TTS thành công lên Firebase Firestore!');
    return { success: true };
  } catch (error: any) {
    console.warn('⚠️ Không thể đồng bộ cấu hình TTS lên Firebase (sử dụng cấu hình cục bộ):', error?.message || error);
    return { 
      success: true, // Still success locally
      error: 'Đã lưu cục bộ trên trình duyệt (kết nối Firebase Firestore bị trễ hoặc đang ngoại tuyến).' 
    };
  }
}

/**
 * Loads TTS configuration from Firebase Firestore with fallback to local cache
 */
export async function loadTTSConfigFromFirebase(): Promise<TTSConfig> {
  try {
    const configDocRef = doc(db, SYSTEM_CONFIG_COLLECTION, TTS_CONFIG_DOC_ID);
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('firestore_timeout')), 3500)
    );

    const docSnap = await Promise.race([
      getDoc(configDocRef),
      timeoutPromise
    ]);

    if (docSnap.exists()) {
      const remoteData = docSnap.data();
      if (remoteData?.data) {
        const merged: TTSConfig = {
          ...DEFAULT_TTS_CONFIG,
          ...getTTSConfig(),
          ...remoteData.data
        };
        // Update local storage cache
        saveTTSConfig(merged);
        return merged;
      }
    }
  } catch (error: any) {
    // Graceful offline fallback
    console.info('ℹ️ Đang sử dụng cấu hình TTS từ bộ nhớ cục bộ/môi trường');
  }

  return getTTSConfig();
}

/**
 * Saves EmailJS configuration to Firebase Firestore and local cache
 */
export async function saveEmailJSConfigToFirebase(
  config: EmailJSConfig,
  userEmail?: string
): Promise<{ success: boolean; error?: string }> {
  // 1. Save locally first
  saveEmailJSConfig(config);

  // 2. Persist to Firebase Firestore
  try {
    const configDocRef = doc(db, SYSTEM_CONFIG_COLLECTION, EMAILJS_CONFIG_DOC_ID);
    const payload = {
      id: EMAILJS_CONFIG_DOC_ID,
      configType: 'emailjs_config',
      data: {
        serviceId: config.serviceId,
        templateId: config.templateId,
        publicKey: config.publicKey || '',
        privateKey: config.privateKey || '',
        enabled: config.enabled,
        senderName: config.senderName || 'Hồn Đất Việt',
        otpExpirationMinutes: config.otpExpirationMinutes || 5
      },
      updatedAt: new Date().toISOString(),
      updatedBy: userEmail || 'admin'
    };

    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('firestore_timeout')), 4500)
    );

    await Promise.race([
      setDoc(configDocRef, payload, { merge: true }),
      timeoutPromise
    ]);

    console.log('✅ Đã lưu cấu hình EmailJS OTP thành công lên Firebase Firestore!');
    return { success: true };
  } catch (error: any) {
    console.warn('⚠️ Không thể đồng bộ cấu hình EmailJS lên Firebase (sử dụng cấu hình cục bộ):', error?.message || error);
    return { 
      success: true, // Still success locally
      error: 'Đã lưu cục bộ trên trình duyệt (kết nối Firebase Firestore bị trễ hoặc đang ngoại tuyến).' 
    };
  }
}

/**
 * Loads EmailJS configuration from Firebase Firestore with fallback to local cache
 */
export async function loadEmailJSConfigFromFirebase(): Promise<EmailJSConfig> {
  try {
    const configDocRef = doc(db, SYSTEM_CONFIG_COLLECTION, EMAILJS_CONFIG_DOC_ID);
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('firestore_timeout')), 3500)
    );

    const docSnap = await Promise.race([
      getDoc(configDocRef),
      timeoutPromise
    ]);

    if (docSnap.exists()) {
      const remoteData = docSnap.data();
      if (remoteData?.data) {
        const merged: EmailJSConfig = {
          ...DEFAULT_EMAILJS_CONFIG,
          ...getEmailJSConfig(),
          ...remoteData.data
        };
        // Update local storage cache
        saveEmailJSConfig(merged);
        return merged;
      }
    }
  } catch (error: any) {
    // Graceful offline fallback
    console.info('ℹ️ Đang sử dụng cấu hình EmailJS từ bộ nhớ cục bộ/môi trường');
  }

  return getEmailJSConfig();
}

