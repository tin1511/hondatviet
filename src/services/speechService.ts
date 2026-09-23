/**
 * Speech Recognition Service using Web Speech API with Vietnamese (vi-VN) support.
 */

export interface SpeechRecognitionOptions {
  lang?: string;
  continuous?: boolean;
  interimResults?: boolean;
  onStart?: () => void;
  onResult?: (transcript: string, isFinal: boolean) => void;
  onError?: (errorMessage: string) => void;
  onEnd?: () => void;
}

class SpeechService {
  private recognition: any = null;
  private isListeningState = false;

  isSupported(): boolean {
    if (typeof window === 'undefined') return false;
    return !!(
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition
    );
  }

  isListening(): boolean {
    return this.isListeningState;
  }

  startListening(options: SpeechRecognitionOptions): boolean {
    if (!this.isSupported()) {
      options.onError?.(
        'Trình duyệt hiện tại chưa hỗ trợ nhận diện giọng nói. Vui lòng sử dụng Google Chrome hoặc Microsoft Edge.'
      );
      return false;
    }

    // Stop any active recognition session before starting a new one
    this.stopListening();

    try {
      const SpeechRecognition =
        (window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition;

      this.recognition = new SpeechRecognition();
      this.recognition.lang = options.lang || 'vi-VN';
      this.recognition.continuous = options.continuous ?? false;
      this.recognition.interimResults = options.interimResults ?? false;

      this.recognition.onstart = () => {
        this.isListeningState = true;
        options.onStart?.();
      };

      this.recognition.onresult = (event: any) => {
        let transcript = '';
        let isFinal = false;

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const item = event.results[i];
          if (item.isFinal) {
            isFinal = true;
          }
          transcript += item[0].transcript;
        }

        options.onResult?.(transcript, isFinal);
      };

      this.recognition.onerror = (event: any) => {
        this.isListeningState = false;
        let friendlyMessage = 'Không thể nhận diện giọng nói lúc này.';

        const err = event.error;
        if (err === 'not-allowed' || err === 'permission-denied') {
          friendlyMessage =
            'Không thể sử dụng microphone. Vui lòng kiểm tra và cấp quyền microphone cho trang web.';
        } else if (err === 'no-speech') {
          friendlyMessage = 'Không nhận diện được giọng nói. Vui lòng nói rõ hơn và thử lại.';
        } else if (err === 'audio-capture') {
          friendlyMessage = 'Không tìm thấy micro trên thiết bị. Vui lòng kiểm tra lại thiết bị thu âm.';
        } else if (err === 'network') {
          friendlyMessage = 'Lỗi kết nối mạng khi xử lý giọng nói.';
        }

        options.onError?.(friendlyMessage);
      };

      this.recognition.onend = () => {
        this.isListeningState = false;
        options.onEnd?.();
      };

      this.recognition.start();
      return true;
    } catch (err: any) {
      this.isListeningState = false;
      options.onError?.('Không thể khởi động micro. Vui lòng thử lại.');
      return false;
    }
  }

  stopListening(): void {
    if (this.recognition) {
      try {
        this.recognition.stop();
      } catch (e) {
        // Ignore stop errors if session already ended
      }
      this.recognition = null;
    }
    this.isListeningState = false;
  }
}

export const speechService = new SpeechService();
