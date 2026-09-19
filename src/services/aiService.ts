import { 
  HeritageItem, 
  HeritageStory, 
  StoryMode, 
  PlaceReviewSummary, 
  MatchReasoningResult, 
  PlaceItem, 
  ItineraryPlan,
  FamilyStoryMemory
} from '../types';
import { deepCleanVietnamese, cleanVietnameseText } from '../utils/textUtils';

export interface RecognizeHeritageResult {
  name: string;
  category: any;
  categoryLabel: string;
  region: 'north' | 'central' | 'south';
  province: string;
  period: string;
  dynasty?: string;
  history: string;
  culturalSignificance: string;
  interestingFacts: string[];
  conservationStatus?: string;
  verifiedStatus: 'verified' | 'folk_legend' | 'unverified';
  verifiedNote?: string;
  suggestedQuestions: string[];
}

export const aiService = {
  /**
   * AI Visual Recognition for heritage, crafts, artifacts, culinary items
   */
  async recognizeHeritage(imageBase64: string, optionalPrompt?: string): Promise<RecognizeHeritageResult> {
    const res = await fetch('/api/ai/recognize-heritage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ imageBase64, optionalPrompt }),
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.error || 'Không thể nhận diện hình ảnh');
    }
    return deepCleanVietnamese(data.data);
  },

  /**
   * AI Storyteller with audience modes
   */
  async generateStory(params: {
    heritageName: string;
    category?: string;
    region?: string;
    history?: string;
    period?: string;
    mode: StoryMode;
    language?: string;
  }): Promise<HeritageStory> {
    const res = await fetch('/api/ai/storyteller', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.error || 'Không thể tạo câu chuyện');
    }
    const cleanData = deepCleanVietnamese(data.data);
    return {
      heritageId: params.heritageName.toLowerCase().replace(/\s+/g, '-'),
      heritageName: cleanVietnameseText(params.heritageName),
      mode: params.mode,
      ...cleanData
    };
  },

  /**
   * AI Cultural Chatbot ("Trợ lý Văn hóa Việt Nam")
   */
  async chatWithAssistant(params: {
    message: string;
    conversationHistory?: { role: 'user' | 'model'; text: string }[];
    currentHeritageContext?: any;
    language?: string;
    isTourGuideMode?: boolean;
  }): Promise<string> {
    const res = await fetch('/api/ai/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.error || 'Trợ lý AI hiện đang bận');
    }
    return cleanVietnameseText(data.reply);
  },

  /**
   * AI Oral History ("Ông bà kể chuyện") Curation
   */
  async curateGrandparentStory(params: {
    rawTranscription: string;
    tellerName?: string;
    tellerBirthYear?: number;
    location?: string;
    topic?: string;
  }): Promise<{
    refinedStory: string;
    suggestedTitle: string;
    timePeriod: string;
    tags: string[];
    culturalTakeaway?: string;
  }> {
    const res = await fetch('/api/ai/transcribe-story', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.error || 'Không thể xử lý bản ghi');
    }
    return deepCleanVietnamese(data.data);
  },

  /**
   * AI Google Places Review Synthesis
   */
  async analyzePlaceReviews(params: {
    placeName: string;
    rating: number;
    userRatingCount: number;
    sampleReviews?: any[];
    placeType?: string;
  }): Promise<PlaceReviewSummary> {
    const res = await fetch('/api/ai/analyze-reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.error || 'Không thể phân tích review');
    }
    return deepCleanVietnamese(data.data);
  },

  /**
   * "Phù hợp với tôi" Personalized Matcher
   */
  async matchPlacesToPreference(params: {
    userPreference: string;
    places: PlaceItem[];
    heritageContext?: string;
  }): Promise<MatchReasoningResult[]> {
    const res = await fetch('/api/ai/match-places', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.error || 'Không thể tìm địa điểm phù hợp');
    }
    return deepCleanVietnamese(data.matches);
  },

  /**
   * Smart Cultural Itinerary Planner
   */
  async generateSmartItinerary(params: {
    destination: string;
    duration?: string;
    interests?: string[];
    budget?: string;
    companion?: string;
  }): Promise<ItineraryPlan> {
    const res = await fetch('/api/ai/generate-itinerary', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.error || 'Không thể tạo lịch trình');
    }
    return {
      id: 'itin-' + Date.now(),
      ...deepCleanVietnamese(data.itinerary)
    };
  },

  /**
   * Speech Synthesis (Text-to-Speech) using Web Speech API
   */
  speakText(text: string, options?: { rate?: number; pitch?: number; lang?: string; onEnd?: () => void }) {
    if (!('speechSynthesis' in window)) {
      console.warn('Trình duyệt không hỗ trợ Web Speech Synthesis.');
      return;
    }
    window.speechSynthesis.cancel(); // stop previous
    const cleanText = cleanVietnameseText(text);
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = options?.lang || 'vi-VN';
    utterance.rate = options?.rate || 1.0;
    utterance.pitch = options?.pitch || 1.0;
    
    // Find Vietnamese voice if available
    const voices = window.speechSynthesis.getVoices();
    const viVoice = voices.find(v => v.lang.includes('vi') || v.lang.includes('VN'));
    if (viVoice) {
      utterance.voice = viVoice;
    }

    if (options?.onEnd) {
      utterance.onend = options.onEnd;
      utterance.onerror = options.onEnd;
    }

    window.speechSynthesis.speak(utterance);
  },

  stopSpeaking() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }
};
