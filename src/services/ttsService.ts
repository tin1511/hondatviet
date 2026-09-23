import { cleanVietnameseText } from '../utils/textUtils';
import { getTTSConfig } from '../config/ttsConfig';

export type TTSStatus = 'idle' | 'loading' | 'generating' | 'playing' | 'stopped' | 'error';

export interface VoiceSettings {
  enabled: boolean;    // Bật / Tắt giọng đọc
  rate: number;       // 0.8x, 1.0x, 1.2x
  pitch: number;      // 0.5 to 1.5
  volume: number;     // 0.0 to 1.0
  voiceURI?: string;  // SpeechSynthesis Voice URI
  speaker?: string;   // Optional speaker ID
}

export interface TTSOptions {
  rate?: number;
  pitch?: number;
  volume?: number;
  voiceURI?: string;
  speaker?: string;
  voice?: string;
  lang?: string;
  provider?: 'vieneu' | 'web_speech';
  endpoint?: string;
  apiKey?: string;
  onStatusChange?: (status: TTSStatus) => void;
  onEnd?: () => void;
  onError?: (err: any) => void;
}

const STORAGE_KEY_VOICE_SETTINGS = 'heritage_voice_settings';

export const DEFAULT_VOICE_SETTINGS: VoiceSettings = {
  enabled: true,
  rate: 1.0,
  pitch: 1.0,
  volume: 1.0,
  voiceURI: '',
  speaker: 'default'
};

export interface TTSProvider {
  name: string;
  speak(text: string, options?: TTSOptions): Promise<void>;
  stop(): void;
  isSupported(): boolean;
  getVoices?(): SpeechSynthesisVoice[];
}

/**
 * Cleans text for speech output (cleanTextForTTS)
 * Strips Markdown (#, **, *, __, _, `), HTML, code blocks, URLs, technical symbols, and UI emojis
 * while strictly preserving all Vietnamese Unicode characters (ă, â, ê, ô, ơ, ư, đ, tone marks) and sentence punctuation.
 */
export function cleanTextForTTS(rawText: string): string {
  if (!rawText) return '';

  let text = cleanVietnameseText(rawText);

  // 1. Remove code blocks ```...```
  text = text.replace(/```[\s\S]*?```/g, '');

  // 2. Remove inline code `...`
  text = text.replace(/`([^`]+)`/g, '$1');

  // 3. Convert Markdown links [text](url) -> text
  text = text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');

  // 4. Remove Markdown headers (#, ##, ###)
  text = text.replace(/^#{1,6}\s+/gm, '');

  // 5. Remove bold/italic markup (**text**, *text*, __text__, _text_)
  text = text.replace(/\*\*([^*]+)\*\*/g, '$1');
  text = text.replace(/\*([^*]+)\*/g, '$1');
  text = text.replace(/__([^_]+)__/g, '$1');
  text = text.replace(/_([^_]+)_/g, '$1');

  // 6. Remove HTML tags <...>
  text = text.replace(/<[^>]*>/g, '');

  // 7. Remove URLs (http:// or https:// or www.)
  text = text.replace(/https?:\/\/\S+|www\.\S+/gi, '');

  // 8. Remove bullet symbols (*, -, +, 1.) at beginning of lines
  text = text.replace(/^[\s*+\-]\s+/gm, '');
  text = text.replace(/^\d+\.\s+/gm, '');

  // 9. Remove special decorative UI chars & emojis while keeping Vietnamese accents & sentence punctuation
  text = text.replace(/[🔊🎤⏹️✨🚀💡📌📍⭐👉➔➔🤖💬📍🗺️📸🕒🛡️🔄⏳]/g, '');

  // 10. Collapse multiple spaces / line breaks
  text = text.replace(/\s+/g, ' ').trim();

  return text;
}

// Backward compatibility aliases
export const cleanTextForSpeech = cleanTextForTTS;
export const prepareTextForSpeech = cleanTextForTTS;

/**
 * Splits long text into chunks for TTS processing
 * Splits cleanly on sentence punctuation bounds (. ! ? ; \n) without breaking mid-word
 */
export function splitTextForSpeech(text: string, maxChunkLength = 220): string[] {
  const cleaned = cleanTextForTTS(text);
  if (!cleaned) return [];
  if (cleaned.length <= maxChunkLength) return [cleaned];

  const chunks: string[] = [];
  const sentenceRegex = /[^.!?;\n]+[.!?;\n]+/g;
  const matches = cleaned.match(sentenceRegex) || [cleaned];

  let currentChunk = '';

  for (const sentence of matches) {
    if ((currentChunk + ' ' + sentence).trim().length <= maxChunkLength) {
      currentChunk = (currentChunk + ' ' + sentence).trim();
    } else {
      if (currentChunk) {
        chunks.push(currentChunk);
      }
      if (sentence.trim().length > maxChunkLength) {
        const words = sentence.trim().split(/\s+/);
        let wordChunk = '';
        for (const word of words) {
          if ((wordChunk + ' ' + word).trim().length <= maxChunkLength) {
            wordChunk = (wordChunk + ' ' + word).trim();
          } else {
            if (wordChunk) chunks.push(wordChunk);
            wordChunk = word;
          }
        }
        if (wordChunk) chunks.push(wordChunk);
        currentChunk = '';
      } else {
        currentChunk = sentence.trim();
      }
    }
  }

  if (currentChunk) {
    chunks.push(currentChunk);
  }

  return chunks;
}

/**
 * Mobile Audio Unlocker & Audio Context Manager
 * Solves iOS Safari & Android Chrome autoplay/gesture restrictions,
 * physical hardware silent/mute switch behaviors, and Web Audio fallbacks.
 */
class MobileAudioUnlocker {
  private audioContext: AudioContext | null = null;
  private primeAudio: HTMLAudioElement | null = null;
  private activeSourceNode: AudioBufferSourceNode | null = null;
  private keepAliveInterval: any = null;
  private isUnlocked = false;

  constructor() {
    this.setupGlobalUnlockListeners();
  }

  private setupGlobalUnlockListeners(): void {
    if (typeof window === 'undefined') return;

    const unlockHandler = () => {
      this.unlockSynchronously();
    };

    window.addEventListener('touchstart', unlockHandler, { capture: true, passive: true });
    window.addEventListener('touchend', unlockHandler, { capture: true, passive: true });
    window.addEventListener('click', unlockHandler, { capture: true, passive: true });
  }

  getAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.audioContext) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.audioContext = new AudioCtx();
      }
    }
    return this.audioContext;
  }

  getPrimeAudio(): HTMLAudioElement {
    if (!this.primeAudio && typeof window !== 'undefined') {
      this.primeAudio = new Audio();
      this.primeAudio.setAttribute('playsinline', 'true');
      this.primeAudio.setAttribute('webkit-playsinline', 'true');
      this.primeAudio.preload = 'auto';
    }
    return this.primeAudio!;
  }

  /**
   * Synchronously unlocks Web Audio Context, HTML5 Audio, and SpeechSynthesis
   * inside the immediate user gesture stack (click/touch).
   */
  unlockSynchronously(): void {
    if (typeof window === 'undefined') return;

    // 1. Web Audio Context Unlock (Bypasses iOS Mute/Silent Switch & Autoplay Blocks)
    try {
      const ctx = this.getAudioContext();
      if (ctx) {
        if (ctx.state === 'suspended') {
          ctx.resume();
        }
        // Play an imperceptible silent 1-sample buffer to force AudioContext into 'running' state
        const silentBuf = ctx.createBuffer(1, 1, 22050);
        const src = ctx.createBufferSource();
        src.buffer = silentBuf;
        src.connect(ctx.destination);
        src.start(0);
        this.isUnlocked = true;
      }
    } catch (e) {
      // Ignore
    }

    // 2. HTML5 Prime Audio Element Unlock
    try {
      const audio = this.getPrimeAudio();
      audio.muted = false;
      const silentData = 'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA';
      audio.src = silentData;
      const playPromise = audio.play();
      if (playPromise) {
        playPromise
          .then(() => {
            audio.pause();
            audio.currentTime = 0;
          })
          .catch(() => {
            // Ignore
          });
      }
    } catch (e) {
      // Ignore
    }

    // 3. Web Speech Synthesis Unlock (iOS Safari / Mobile Chrome)
    try {
      if (window.speechSynthesis) {
        if (window.speechSynthesis.paused) {
          window.speechSynthesis.resume();
        }
        // Speak a silent 1-char dummy utterance to keep speech context active
        const dummy = new SpeechSynthesisUtterance(' ');
        dummy.volume = 0.01;
        window.speechSynthesis.speak(dummy);
      }
    } catch (e) {
      // Ignore
    }
  }

  unlock(): void {
    this.unlockSynchronously();
  }

  stopAll(): void {
    if (this.activeSourceNode) {
      try {
        this.activeSourceNode.stop();
        this.activeSourceNode.disconnect();
      } catch (e) {
        // Ignore
      }
      this.activeSourceNode = null;
    }

    if (this.primeAudio) {
      try {
        this.primeAudio.pause();
        this.primeAudio.currentTime = 0;
      } catch (e) {
        // Ignore
      }
    }

    if (typeof window !== 'undefined' && window.speechSynthesis) {
      try {
        window.speechSynthesis.cancel();
      } catch (e) {
        // Ignore
      }
    }

    if (this.keepAliveInterval) {
      clearInterval(this.keepAliveInterval);
      this.keepAliveInterval = null;
    }
  }

  /**
   * Plays binary audio ArrayBuffer using Web Audio API (Primary for Mobile).
   * Web Audio API plays sound even if the iPhone side hardware switch is on SILENT!
   */
  async playAudioBuffer(arrayBuffer: ArrayBuffer, volume = 1.0, rate = 1.0): Promise<void> {
    const ctx = this.getAudioContext();
    if (!ctx) throw new Error('Web Audio not supported on this browser.');

    if (ctx.state === 'suspended') {
      await ctx.resume();
    }

    this.stopAll();

    const audioBuffer = await ctx.decodeAudioData(arrayBuffer.slice(0));
    return new Promise((resolve, reject) => {
      try {
        const source = ctx.createBufferSource();
        this.activeSourceNode = source;

        const gainNode = ctx.createGain();
        gainNode.gain.value = volume;
        source.playbackRate.value = rate;
        source.buffer = audioBuffer;

        source.connect(gainNode);
        gainNode.connect(ctx.destination);

        source.onended = () => {
          if (this.activeSourceNode === source) {
            this.activeSourceNode = null;
          }
          resolve();
        };

        source.start(0);
      } catch (err) {
        reject(err);
      }
    });
  }
}

export const mobileAudioUnlocker = new MobileAudioUnlocker();

/**
 * Browser Web Speech Synthesis TTS Provider (Primary Engine)
 * Runs lightweight, zero-download, zero-GPU speech in the browser for all devices (Android, iOS, Desktop)
 */
export class BrowserTTSProvider implements TTSProvider {
  name = 'web_speech';
  private voices: SpeechSynthesisVoice[] = [];
  private isStopped = false;
  private activeUtterance: SpeechSynthesisUtterance | null = null;

  constructor() {
    if (this.isSupported()) {
      this.loadVoices();
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.onvoiceschanged = () => {
          this.loadVoices();
        };
      }
    }
  }

  isSupported(): boolean {
    return typeof window !== 'undefined' && 'speechSynthesis' in window;
  }

  private loadVoices(): void {
    if (this.isSupported()) {
      try {
        this.voices = window.speechSynthesis.getVoices();
      } catch (e) {
        // Ignore
      }
    }
  }

  getVoices(): SpeechSynthesisVoice[] {
    if (this.voices.length === 0 && this.isSupported()) {
      this.loadVoices();
    }
    return this.voices;
  }

  findVoice(voiceURI?: string, lang = 'vi-VN'): SpeechSynthesisVoice | null {
    const allVoices = this.getVoices();
    if (!allVoices || allVoices.length === 0) return null;

    if (voiceURI) {
      const matchURI = allVoices.find((v) => v.voiceURI === voiceURI);
      if (matchURI) return matchURI;
    }

    if (lang && lang.toLowerCase().startsWith('en')) {
      const enMatch = allVoices.find((v) => v.lang.toLowerCase().startsWith('en'));
      if (enMatch) return enMatch;
    }

    const viVoice = this.findVietnameseVoice(lang);
    if (viVoice) return viVoice;

    // Default fallback to first voice or system default voice if vi-VN voice not installed
    return allVoices.find((v) => v.default) || allVoices[0] || null;
  }

  findVietnameseVoice(lang = 'vi-VN'): SpeechSynthesisVoice | null {
    const allVoices = this.getVoices();
    if (!allVoices || allVoices.length === 0) return null;

    // 1. Exact match for requested lang or vi-VN
    const exactMatch = allVoices.find(
      (v) => v.lang === lang || v.lang === 'vi-VN' || v.lang === 'vi_VN'
    );
    if (exactMatch) return exactMatch;

    // 2. Starts with 'vi'
    const viStartMatch = allVoices.find((v) =>
      v.lang.toLowerCase().startsWith('vi')
    );
    if (viStartMatch) return viStartMatch;

    // 3. Name contains Vietnamese
    const nameMatch = allVoices.find(
      (v) =>
        v.name.toLowerCase().includes('vietnamese') ||
        v.name.toLowerCase().includes('viet nam') ||
        v.name.toLowerCase().includes('tiếng việt')
    );
    if (nameMatch) return nameMatch;

    return null;
  }

  async speak(text: string, options?: TTSOptions): Promise<void> {
    if (!this.isSupported()) {
      const err = new Error('Thiết bị này chưa hỗ trợ giọng đọc tiếng Việt.');
      options?.onError?.(err);
      throw err;
    }

    this.stop();
    this.isStopped = false;

    // Unpause on iOS / Safari mobile
    try {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }
      window.speechSynthesis.cancel();
    } catch (e) {
      // Ignore
    }

    const cleanText = cleanTextForTTS(text);
    if (!cleanText) return;

    // Use smaller chunks for mobile stability (< 150 chars)
    const chunks = splitTextForSpeech(cleanText, 140);
    if (chunks.length === 0) return;

    const matchedVoice = this.findVoice(options?.voiceURI, options?.lang || 'vi-VN');

    options?.onStatusChange?.('playing');

    for (let i = 0; i < chunks.length; i++) {
      if (this.isStopped) break;

      const chunk = chunks[i];

      await new Promise<void>((resolve) => {
        let isChunkResolved = false;
        const resolveChunk = () => {
          if (!isChunkResolved) {
            isChunkResolved = true;
            this.activeUtterance = null;
            resolve();
          }
        };

        try {
          const utterance = new SpeechSynthesisUtterance(chunk);
          this.activeUtterance = utterance; // Prevent iOS WebKit GC collection

          utterance.rate = options?.rate ?? 1.0;
          utterance.pitch = options?.pitch ?? 1.0;
          utterance.volume = options?.volume ?? 1.0;

          if (matchedVoice) {
            utterance.voice = matchedVoice;
            utterance.lang = matchedVoice.lang || options?.lang || 'vi-VN';
          } else {
            utterance.lang = options?.lang || 'vi-VN';
          }

          utterance.onend = () => {
            resolveChunk();
          };

          utterance.onerror = (event) => {
            console.warn('[BrowserTTS] Speech error on chunk:', event);
            resolveChunk();
          };

          // iOS speech pause-resume keepalive & timeout safeguard
          const timeoutDuration = Math.max(4000, chunk.length * 150);
          const chunkTimer = setTimeout(() => {
            resolveChunk();
          }, timeoutDuration);

          const origOnEnd = utterance.onend;
          utterance.onend = (e) => {
            clearTimeout(chunkTimer);
            if (origOnEnd) origOnEnd.call(utterance, e);
            resolveChunk();
          };

          window.speechSynthesis.speak(utterance);

          // iOS Safari bug fix: calling resume after speak ensures audio starts
          if (window.speechSynthesis.paused) {
            window.speechSynthesis.resume();
          }
        } catch (err) {
          console.warn('[BrowserTTS] Exception in chunk:', err);
          resolveChunk();
        }
      });
    }

    if (!this.isStopped) {
      options?.onStatusChange?.('idle');
      options?.onEnd?.();
    }
  }

  stop(): void {
    this.isStopped = true;
    this.activeUtterance = null;
    if (this.isSupported()) {
      try {
        window.speechSynthesis.cancel();
      } catch (e) {
        // Ignore
      }
    }
  }
}

/**
 * VieNeu Cloud TTS Provider (calls server-side API proxy /api/tts/vieneu)
 * Strictly uses OpenAI-compatible format { model: 'vieneu-v4', input: text }
 * without sending Google TTS voice IDs.
 */
export class VieNeuTTSProvider implements TTSProvider {
  name = 'vieneu';
  private currentAudio: HTMLAudioElement | null = null;
  private isStopped = false;

  isSupported(): boolean {
    return typeof window !== 'undefined';
  }

  async speak(text: string, options?: TTSOptions): Promise<void> {
    const config = getTTSConfig();
    this.stop();
    this.isStopped = false;

    // CRITICAL for Mobile: Immediately unlock audio subsystem within synchronous user gesture stack
    mobileAudioUnlocker.unlock();

    const chunks = splitTextForSpeech(text, 180);
    if (chunks.length === 0) return;

    for (let i = 0; i < chunks.length; i++) {
      if (this.isStopped) break;

      const chunkText = chunks[i];
      options?.onStatusChange?.('generating');

      try {
        const response = await fetch('/api/tts/vieneu', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            text: chunkText,
            model: 'vieneu-v4',
            endpoint: options?.endpoint || config.endpoint,
            apiKey: options?.apiKey || config.apiKey,
            voice: options?.voice || options?.speaker || config.voice || 'Ngọc Lan',
            speed: options?.rate ?? 1.0
          }),
        });

        if (!response.ok) {
          const errData = await response.json().catch(() => ({}));
          throw new Error(errData?.error || `VieNeu API Error HTTP ${response.status}`);
        }

        if (this.isStopped) break;

        const contentType = response.headers.get('content-type') || '';
        let audioBlob: Blob | null = null;
        let audioArrayBuffer: ArrayBuffer | null = null;
        let audioUrl = '';

        if (contentType.includes('application/json')) {
          const json = await response.json();
          if (json.audio_base64) {
            audioUrl = `data:audio/wav;base64,${json.audio_base64}`;
            try {
              const binaryString = atob(json.audio_base64);
              const len = binaryString.length;
              const bytes = new Uint8Array(len);
              for (let b = 0; b < len; b++) {
                bytes[b] = binaryString.charCodeAt(b);
              }
              audioArrayBuffer = bytes.buffer;
            } catch (e) {
              // Ignore base64 conversion error
            }
          } else if (json.audio_url) {
            audioUrl = json.audio_url;
          } else {
            throw new Error('Không nhận được âm thanh từ VieNeu API.');
          }
        } else {
          audioBlob = await response.blob();
          audioArrayBuffer = await audioBlob.arrayBuffer();
          audioUrl = URL.createObjectURL(audioBlob);
        }

        if (this.isStopped) break;

        options?.onStatusChange?.('playing');

        // Playback Strategy for Mobile & Desktop:
        // 1. Web Audio API Primary (if audioArrayBuffer is available): Bypasses iOS hardware silent switch & autoplay restriction after fetch delay.
        // 2. HTML5 Audio Element Fallback.
        await new Promise<void>(async (resolve, reject) => {
          let hasEnded = false;
          const cleanup = () => {
            if (hasEnded) return;
            hasEnded = true;
            if (audioUrl.startsWith('blob:')) {
              URL.revokeObjectURL(audioUrl);
            }
            this.currentAudio = null;
          };

          // Try Web Audio API first if we have an ArrayBuffer
          if (audioArrayBuffer) {
            try {
              await mobileAudioUnlocker.playAudioBuffer(
                audioArrayBuffer,
                options?.volume ?? 1.0,
                options?.rate || 1.0
              );
              cleanup();
              resolve();
              return;
            } catch (webAudioErr) {
              console.warn('[VieNeu TTS] Web Audio API playback failed, falling back to HTML5 Audio:', webAudioErr);
            }
          }

          // Fallback to HTML5 Audio Element
          try {
            const audio = mobileAudioUnlocker.getPrimeAudio();
            this.currentAudio = audio;
            audio.setAttribute('playsinline', 'true');
            audio.setAttribute('webkit-playsinline', 'true');
            audio.playbackRate = options?.rate || 1.0;
            audio.volume = options?.volume ?? 1.0;
            audio.src = audioUrl;
            audio.load();

            audio.onended = () => {
              cleanup();
              resolve();
            };

            audio.onerror = () => {
              cleanup();
              reject(new Error('Lỗi phát âm thanh VieNeu TTS trên thiết bị.'));
            };

            const playPromise = audio.play();
            if (playPromise) {
              playPromise.catch((playErr) => {
                cleanup();
                reject(playErr);
              });
            }
          } catch (err) {
            cleanup();
            reject(err);
          }
        });

      } catch (err) {
        console.warn('[VieNeu TTS] Server proxy error:', err);
        throw err;
      }
    }

    if (!this.isStopped) {
      options?.onStatusChange?.('idle');
      options?.onEnd?.();
    }
  }

  stop(): void {
    this.isStopped = true;
    if (this.currentAudio) {
      try {
        this.currentAudio.pause();
        this.currentAudio.currentTime = 0;
      } catch (e) {
        // Ignore
      }
      this.currentAudio = null;
    }
  }
}

/**
 * Standalone direct helper function for speaking via VieNeu Cloud TTS
 */
export async function speakWithVieNeu(text: string, endpoint?: string, apiKey?: string): Promise<HTMLAudioElement> {
  const config = getTTSConfig();
  const targetEndpoint = endpoint || config.endpoint || 'https://api.vieneu.io/api/v1/audio/speech';
  const targetApiKey = apiKey || config.apiKey || '';

  // Synchronously unlock mobile audio
  mobileAudioUnlocker.unlock();

  const response = await fetch('/api/tts/vieneu', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text,
      model: 'vieneu-v4',
      endpoint: targetEndpoint,
      apiKey: targetApiKey
    }),
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData?.error || `VieNeu HTTP ${response.status}`);
  }

  const audioBlob = await response.blob();
  const audioArrayBuffer = await audioBlob.arrayBuffer();
  const audioUrl = URL.createObjectURL(audioBlob);

  const audio = mobileAudioUnlocker.getPrimeAudio();
  audio.setAttribute('playsinline', 'true');
  audio.setAttribute('webkit-playsinline', 'true');
  audio.src = audioUrl;
  audio.load();

  audio.onended = () => {
    URL.revokeObjectURL(audioUrl);
  };

  const playPromise = audio.play();
  if (playPromise) {
    playPromise.catch(async (err) => {
      console.warn('[speakWithVieNeu] HTMLAudio blocked, attempting Web Audio API fallback:', err);
      try {
        await mobileAudioUnlocker.playAudioBuffer(audioArrayBuffer);
      } catch (e) {
        console.warn('[speakWithVieNeu] Web Audio fallback failed:', e);
      }
    });
  }

  return audio;
}

// Backward compatibility alias
export const ExternalTTSProvider = VieNeuTTSProvider;

/**
 * Central Lightweight TTS Manager (TTSService)
 * Supports dynamic configuration between VieNeu Cloud TTS and Web Speech API
 * with automatic fallback handling.
 */
class TTSService {
  private browserProvider: BrowserTTSProvider;
  private vieneuProvider: VieNeuTTSProvider;
  private currentStatus: TTSStatus = 'idle';
  private activeProviderName = 'web_speech';
  private currentSettings: VoiceSettings;

  constructor() {
    this.browserProvider = new BrowserTTSProvider();
    this.vieneuProvider = new VieNeuTTSProvider();
    this.currentSettings = this.loadStoredSettings();
  }

  private loadStoredSettings(): VoiceSettings {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const saved = localStorage.getItem(STORAGE_KEY_VOICE_SETTINGS);
        if (saved) {
          return { ...DEFAULT_VOICE_SETTINGS, ...JSON.parse(saved) };
        }
      }
    } catch (e) {
      // Ignore storage read error
    }
    return { ...DEFAULT_VOICE_SETTINGS };
  }

  getSettings(): VoiceSettings {
    return { ...this.currentSettings };
  }

  saveSettings(newSettings: Partial<VoiceSettings>): VoiceSettings {
    this.currentSettings = { ...this.currentSettings, ...newSettings };
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(STORAGE_KEY_VOICE_SETTINGS, JSON.stringify(this.currentSettings));
      }
    } catch (e) {
      // Ignore storage write error
    }
    return this.getSettings();
  }

  resetSettings(): VoiceSettings {
    this.currentSettings = { ...DEFAULT_VOICE_SETTINGS };
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.removeItem(STORAGE_KEY_VOICE_SETTINGS);
      }
    } catch (e) {
      // Ignore
    }
    return this.getSettings();
  }

  getStatus(): TTSStatus {
    return this.currentStatus;
  }

  getActiveProviderName(): string {
    return this.activeProviderName;
  }

  getVoices(): SpeechSynthesisVoice[] {
    return this.browserProvider.getVoices();
  }

  getVietnameseVoices(): SpeechSynthesisVoice[] {
    const all = this.getVoices();
    return all.filter(
      (v) =>
        v.lang.toLowerCase().startsWith('vi') ||
        v.name.toLowerCase().includes('viet') ||
        v.name.toLowerCase().includes('tiếng việt')
    );
  }

  isSupported(): boolean {
    return this.browserProvider.isSupported() || this.vieneuProvider.isSupported();
  }

  hasVietnameseVoice(): boolean {
    return !!this.browserProvider.findVietnameseVoice();
  }

  /**
   * Synchronously unlocks audio subsystem on mobile devices (iOS/Android)
   * Call this inside user tap/click event handlers before starting async operations.
   */
  prepareForMobilePlayback(): void {
    mobileAudioUnlocker.unlockSynchronously();
  }

  cleanTextForTTS(text: string): string {
    return cleanTextForTTS(text);
  }

  async speak(text: string, options?: TTSOptions): Promise<void> {
    this.stop();

    // CRITICAL: Immediately unlock audio subsystem synchronously within user tap/gesture
    mobileAudioUnlocker.unlock();

    if (this.currentSettings.enabled === false) {
      options?.onStatusChange?.('idle');
      options?.onEnd?.();
      return;
    }

    const ttsConfig = getTTSConfig();
    if (ttsConfig.enabled === false) {
      options?.onStatusChange?.('idle');
      options?.onEnd?.();
      return;
    }

    const mergedOptions: TTSOptions = {
      rate: options?.rate ?? this.currentSettings.rate,
      pitch: options?.pitch ?? this.currentSettings.pitch,
      volume: options?.volume ?? this.currentSettings.volume,
      voiceURI: options?.voiceURI || this.currentSettings.voiceURI,
      speaker: options?.speaker || options?.voice || ttsConfig.voice || this.currentSettings.speaker,
      voice: options?.voice || options?.speaker || ttsConfig.voice || 'Ngọc Lan',
      lang: options?.lang || ttsConfig.language || 'vi-VN',
      provider: options?.provider || ttsConfig.provider || 'vieneu',
      ...options,
      onStatusChange: (s) => {
        this.currentStatus = s;
        options?.onStatusChange?.(s);
      }
    };

    const wrappedOnEnd = () => {
      this.currentStatus = 'idle';
      options?.onEnd?.();
    };

    const effectiveProvider = options?.provider || ttsConfig.provider || 'vieneu';

    // Case 1: VieNeu Cloud TTS is selected as Provider
    if (effectiveProvider === 'vieneu') {
      try {
        this.activeProviderName = 'vieneu';
        this.currentStatus = 'loading';
        options?.onStatusChange?.('loading');

        await this.vieneuProvider.speak(text, { ...mergedOptions, onEnd: wrappedOnEnd });
        return;
      } catch (err: any) {
        console.warn('[TTSService] VieNeu Cloud TTS Error:', err?.message || err);

        // Fallback to Web Speech API if enabled
        if (ttsConfig.fallbackEnabled) {
          console.log('[TTSService] Fallback enabled: Switching to Browser Web Speech API...');
          this.activeProviderName = 'web_speech';
          try {
            await this.browserProvider.speak(text, { ...mergedOptions, onEnd: wrappedOnEnd });
            return;
          } catch (fallbackErr: any) {
            this.currentStatus = 'error';
            options?.onStatusChange?.('error');
            options?.onError?.(fallbackErr);
            return;
          }
        } else {
          // Fallback disabled by Admin
          this.currentStatus = 'error';
          options?.onStatusChange?.('error');
          const noSpeechErr = new Error('Không thể tạo giọng nói từ VieNeu Cloud API (Fallback đã tắt).');
          options?.onError?.(noSpeechErr);
          return;
        }
      }
    }

    // Case 2: Web Speech API selected as Provider
    this.activeProviderName = 'web_speech';
    if (this.browserProvider.isSupported()) {
      try {
        await this.browserProvider.speak(text, { ...mergedOptions, onEnd: wrappedOnEnd });
      } catch (err) {
        this.currentStatus = 'error';
        options?.onStatusChange?.('error');
        options?.onError?.(err);
      }
    } else {
      this.currentStatus = 'error';
      options?.onStatusChange?.('error');
      const err = new Error('Thiết bị này chưa hỗ trợ giọng đọc tiếng Việt.');
      options?.onError?.(err);
    }
  }

  stop(): void {
    this.currentStatus = 'stopped';
    this.browserProvider.stop();
    this.vieneuProvider.stop();
  }

  isSpeaking(): boolean {
    return this.currentStatus === 'playing' || this.currentStatus === 'generating' || this.currentStatus === 'loading';
  }
}

export const ttsService = new TTSService();
