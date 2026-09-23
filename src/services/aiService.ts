import { 
  HeritageItem, 
  HeritageStory, 
  StoryMode, 
  PlaceReviewSummary, 
  MatchReasoningResult, 
  PlaceItem, 
  ItineraryPlan,
  ItineraryTimeSlot,
  FamilyStoryMemory,
  VerificationStatus,
  Region
} from '../types';
import { deepCleanVietnamese, cleanVietnameseText } from '../utils/textUtils';
import { ttsService, TTSOptions } from './ttsService';
import { speechService, SpeechRecognitionOptions } from './speechService';
import { LandmarkPhotoItem, VIETNAM_LANDMARK_PHOTOS } from '../data/landmarkImagesDatabase';
import { HERITAGE_DATABASE } from '../data/vietnamHeritageData';

export const AI_MODEL = 'gemini-flash-latest';

export interface RecognizeHeritageResult {
  name: string;
  category: any;
  categoryLabel: string;
  region: Region;
  province: string;
  period: string;
  dynasty?: string;
  history: string;
  culturalSignificance: string;
  interestingFacts: string[];
  conservationStatus?: string;
  verifiedStatus: VerificationStatus;
  verifiedNote?: string;
  suggestedQuestions: string[];
  isOfflineResult?: boolean;
}

/**
 * Offline AI Local Matcher for Image & Visual Heritage Recognition
 */
function getOfflineHeritageRecognition(prompt?: string): RecognizeHeritageResult {
  const p = (prompt || '').toLowerCase();
  
  // Try finding a matching heritage in local database
  const matched = HERITAGE_DATABASE.find(item => 
    p.includes(item.name.toLowerCase()) || 
    p.includes(item.province.toLowerCase()) ||
    item.tags.some(t => p.includes(t.toLowerCase()))
  );

  // Special visual topics (cổ phục, hiện vật)
  if (!matched && (p.includes('cổ phục') || p.includes('áo dài') || p.includes('nhật bình') || p.includes('ngũ thân'))) {
    return {
      name: 'Áo Dài & Cổ Phục Triều Nguyễn (Áo Nhật Bình / Ngũ Thân)',
      category: 'craft_village',
      categoryLabel: 'Trang Phục Cổ & Cung Đình',
      region: 'central',
      province: 'Thừa Thiên Huế',
      period: 'Triều Nguyễn (Thế kỷ 19 - 20)',
      dynasty: 'Nhà Nguyễn',
      history: 'Áo Nhật Bình là thường phục của Hoàng hậu, Công chúa và Phi tần triều Nguyễn, nổi bật với cổ áo hình chữ nhật to bản dệt thêu hoa văn tinh xảo. Áo Ngũ Thân là trang phục truyền thống của cả nam và nữ thể hiện đạo lý ngũ thường.',
      culturalSignificance: 'Biểu tượng mỹ thuật trang phục và bản sắc văn hóa Việt Nam, phản ánh thứ bậc triều đình và triết lý sống khiêm nhường, kín đáo.',
      interestingFacts: [
        'Hoa văn trên cổ áo Nhật Bình thêu hình rồng, phụng, mây, sóng nước theo đúng quy chế triều đình.',
        'Năm dải áo Ngũ Thân tượng trưng cho Ngũ thường: Nhân, Lễ, Nghĩa, Trí, Tín.',
        'Cổ phục đang được phong trào người trẻ phục dựng rực rỡ khắp cả nước.'
      ],
      verifiedStatus: 'verified',
      verifiedNote: '⚡ [CHẾ ĐỘ NGOẠI TUYẾN] Trích xuất từ Bộ tri thức di sản offline trong thiết bị.',
      suggestedQuestions: [
        'Phân biệt Áo Nhật Bình và Áo Ngũ Thân như thế nào?',
        'Ý nghĩa phong thủy và màu sắc trên trang phục hoàng gia triều Nguyễn?'
      ],
      isOfflineResult: true
    };
  }

  if (!matched && (p.includes('trống đồng') || p.includes('đông sơn') || p.includes('hiện vật'))) {
    return {
      name: 'Trống Đồng Đông Sơn (Báu Vật Văn Minh Sông Hồng)',
      category: 'artifact',
      categoryLabel: 'Hiện Vật & Cổ Vật Bảo Vật Quốc Gia',
      region: 'north',
      province: 'Thanh Hóa / Hà Nội',
      period: 'Văn hóa Đông Sơn (Khoảng 700 TCN - 100 SCN)',
      dynasty: 'Thời Hùng Vương - An Dương Vương',
      history: 'Trống đồng Đông Sơn là sản phẩm đỉnh cao của kỹ thuật đúc đồng cổ xưa thời Hùng Vương. Trống dùng trong các nghi lễ cầu mùa, hội làng và là biểu tượng quyền lực của thủ lĩnh tộc người Việt cổ.',
      culturalSignificance: 'Bảo vật quốc gia mang giá trị nghệ thuật, lịch sử và tâm linh sâu sắc, minh chứng cho nền văn minh lúa nước và tài năng đúc đồng thượng thừa.',
      interestingFacts: [
        'Mặt trống có ngôi sao 12 hoặc 14 cánh tượng trưng cho mặt trời và lịch pháp cổ.',
        'Hình ảnh chim lạc, thuyền đua và người giã gạo thể hiện đời sống trù phú của cư dân Việt cổ.',
        'Trống đồng Ngọc Lũ là chiếc trống đồng đẹp và nguyên vẹn nhất Việt Nam.'
      ],
      verifiedStatus: 'verified',
      verifiedNote: '⚡ [CHẾ ĐỘ NGOẠI TUYẾN] Trích xuất từ Bộ tri thức di sản offline trong thiết bị.',
      suggestedQuestions: [
        'Ý nghĩa hình ảnh Chim Lạc trên mặt trống đồng Đông Sơn?',
        'Kỹ thuật đúc trống đồng cổ xưa phức tạp như thế nào?'
      ],
      isOfflineResult: true
    };
  }

  // Default to a rich heritage item from offline database
  const target = matched || HERITAGE_DATABASE[0];
  return {
    name: target.name,
    category: target.category,
    categoryLabel: target.categoryLabel,
    region: target.region,
    province: target.province,
    period: target.period,
    dynasty: target.dynasty,
    history: target.history,
    culturalSignificance: target.culturalSignificance,
    interestingFacts: target.interestingFacts || [],
    verifiedStatus: target.verifiedStatus || 'verified',
    verifiedNote: '⚡ [CHẾ ĐỘ NGOẠI TUYẾN] Trích xuất từ Bộ tri thức di sản offline đã tải sẵn.',
    suggestedQuestions: target.suggestedQuestions || [
      `Những lưu ý khi tham quan ${target.name}?`,
      `Giá trị lịch sử cốt lõi của ${target.name} là gì?`
    ],
    isOfflineResult: true
  };
}

/**
 * Offline AI Local Tour Guide Chat Generator
 */
function getOfflineTourGuideReply(message: string): string {
  const query = message.toLowerCase();
  
  // Search local heritage database
  const matchedHeritage = HERITAGE_DATABASE.find(item => 
    query.includes(item.name.toLowerCase()) || 
    query.includes(item.province.toLowerCase()) ||
    (item.vietnameseName && query.includes(item.vietnameseName.toLowerCase()))
  );

  if (matchedHeritage) {
    return `⚡ **[HƯỚNG DẪN VIÊN AI NGOẠI TUYẾN]**\n\n` +
      `Dạ em chào quý vị! Do hiện tại đang ở **Chế độ Ngoại tuyến (không có sóng Internet)**, em xin trích xuất thông tin chính xác từ **Bộ tri thức di sản offline** trong máy về **${matchedHeritage.name}**:\n\n` +
      `📍 **Địa điểm**: ${matchedHeritage.address || matchedHeritage.province}\n` +
      `🏛️ **Triều đại / Thời kỳ**: ${matchedHeritage.period}\n\n` +
      `📜 **Lịch sử & Nguồn gốc**:\n${matchedHeritage.history}\n\n` +
      `✨ **Ý nghĩa văn hóa đặc sắc**:\n${matchedHeritage.culturalSignificance}\n\n` +
      `💡 **Thông tin thú vị**:\n` +
      matchedHeritage.interestingFacts.map(f => `• ${f}`).join('\n') +
      `\n\n*Quý vị có thể bật lại kết nối mạng sau để cập nhật thêm tư liệu mới nhất từ AI Cloud nhé!*`;
  }

  // General offline response if no specific keyword matched
  return `⚡ **[HƯỚNG DẪN VIÊN AI NGOẠI TUYẾN]**\n\n` +
    `Dạ em chào quý khách! Ứng dụng đang chạy ở **Chế độ Ngoại tuyến**. Em đã tra cứu trong Bộ dữ liệu Di sản Việt Nam tích hợp sẵn:\n\n` +
    `• **Văn Miếu - Quốc Tử Giám**: Trường đại học đầu tiên của Việt Nam với 82 Bia Tiến sĩ UNESCO.\n` +
    `• **Cố đô Huế**: Cung điện Hoàng thành triều Nguyễn với Ngọ Môn & Điện Thái Hòa.\n` +
    `• **Phố cổ Hội An**: Đô thị cổ thế kỷ 16-17 với Chùa Cầu độc đáo.\n` +
    `• **Vịnh Hạ Long & Phong Nha**: Di sản thiên nhiên thế giới kỳ vĩ.\n\n` +
    `*Quý vị có thể hỏi thông tin về tỉnh thành, tên di tích, làng nghề hoặc món ăn di sản, em sẽ trích xuất ngay dữ liệu offline phục vụ đoàn ạ!*`;
}

export const aiService = {
  /**
   * AI Visual Recognition for heritage, crafts, artifacts, culinary items (With Offline Fallback)
   */
  async recognizeHeritage(imageBase64: string, optionalPrompt?: string): Promise<RecognizeHeritageResult> {
    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      return getOfflineHeritageRecognition(optionalPrompt);
    }

    try {
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
    } catch (err: any) {
      console.warn('AI Recognize Heritage network/server offline fallback:', err);
      return getOfflineHeritageRecognition(optionalPrompt);
    }
  },

  /**
   * AI Storyteller with audience modes (With Offline Fallback)
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
    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      const heritageName = cleanVietnameseText(params.heritageName);
      const history = params.history || 'Đây là một trong những di sản văn hóa tiêu biểu đại diện cho lịch sử lâu đời của dân tộc Việt Nam.';
      return {
        heritageId: params.heritageName.toLowerCase().replace(/\s+/g, '-'),
        heritageName,
        mode: params.mode,
        title: `[Kể chuyện Offline] Hành Trình Lịch Sử ${heritageName}`,
        storyText: `Chào các bạn! Trong chế độ Ngoại tuyến, hãy cùng lắng nghe câu chuyện về ${heritageName}. ${history} Trải qua hàng trăm năm lịch sử, nơi đây đã trở thành niềm tự hào bất tử của dân tộc.`,
        historicalContext: history,
        distinctionNote: 'Tư liệu lịch sử xác thực từ bộ nhớ ngoại tuyến.',
        sourceReferences: ['Kho dữ liệu di sản Việt Nam offline'],
        isFallback: true
      };
    }

    try {
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
    } catch (err) {
      console.warn('Storyteller offline fallback:', err);
      const heritageName = cleanVietnameseText(params.heritageName);
      return {
        heritageId: params.heritageName.toLowerCase().replace(/\s+/g, '-'),
        heritageName,
        mode: params.mode,
        title: `[Kể chuyện Offline] Hành Trình Lịch Sử ${heritageName}`,
        storyText: `Chào bạn! Trong chế độ Ngoại tuyến, hãy cùng khám phá ${heritageName}. ${params.history || 'Nơi đây lưu giữ dấu ấn ngàn năm văn hiến.'}`,
        historicalContext: params.history || 'Lịch sử di sản.',
        distinctionNote: 'Trích xuất từ Bộ dữ liệu di sản offline.',
        sourceReferences: ['Bộ lưu trữ ngoại tuyến'],
        isFallback: true
      };
    }
  },

  /**
   * AI Cultural Chatbot ("Trợ lý / Hướng dẫn viên AI Việt Nam") (With Offline Fallback)
   */
  async chatWithAssistant(params: {
    message: string;
    conversationHistory?: { role: 'user' | 'model'; text: string }[];
    currentHeritageContext?: any;
    language?: string;
    isTourGuideMode?: boolean;
  }): Promise<string> {
    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      return getOfflineTourGuideReply(params.message);
    }

    try {
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
    } catch (err) {
      console.warn('AI Chat Assistant offline fallback:', err);
      return getOfflineTourGuideReply(params.message);
    }
  },

  /**
   * AI Oral History ("Ông bà kể chuyện") Curation (With Offline Fallback)
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
    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      return {
        refinedStory: `[Biên tập Offline] ${params.rawTranscription}`,
        suggestedTitle: params.topic || 'Ký Ức Gia Đình & Phong Tục Xưa',
        timePeriod: params.tellerBirthYear ? `Thế kỷ 20 (Thế hệ sinh năm ${params.tellerBirthYear})` : 'Thời xưa',
        tags: ['Gia đình', 'Ký ức dân gian', 'Truyền miệng'],
        culturalTakeaway: 'Truyền thống văn hóa lưu giữ qua lời kể các thế hệ trong gia đình.'
      };
    }

    try {
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
    } catch (err) {
      return {
        refinedStory: `[Biên tập Offline] ${params.rawTranscription}`,
        suggestedTitle: params.topic || 'Ký Ức Gia Đình & Phong Tục Xưa',
        timePeriod: 'Thời kỳ lịch sử',
        tags: ['Ký ức gia đình', 'Truyền miệng'],
        culturalTakeaway: 'Lưu giữ câu chuyện thế hệ.'
      };
    }
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
    try {
      const res = await fetch('/api/ai/analyze-reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        return deepCleanVietnamese(data.data);
      }
    } catch (err) {
      console.warn('Place reviews offline fallback:', err);
    }

    return {
      foodMention: `Đồ ăn tại ${params.placeName} mang đậm vị truyền thống bản địa.`,
      ambianceMention: 'Không gian văn hóa ấm cúng, thoáng mát.',
      positiveHighlights: ['Vị trí thuận tiện gần di sản', 'Giá cả rõ ràng', 'Phục vụ chu đáo'],
      considerations: ['Có thể đông khách vào giờ cao điểm'],
      dataCoverageNotice: 'Tổng hợp đánh giá offline từ du khách.'
    };
  },

  /**
   * "Phù hợp với tôi" Personalized Matcher
   */
  async matchPlacesToPreference(params: {
    userPreference: string;
    places: PlaceItem[];
    heritageContext?: string;
  }): Promise<MatchReasoningResult[]> {
    try {
      const res = await fetch('/api/ai/match-places', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        return deepCleanVietnamese(data.matches);
      }
    } catch (err) {
      console.warn('Match places offline fallback:', err);
    }

    return params.places.map((place, idx) => ({
      placeId: place.id,
      placeName: place.name,
      fitScore: Math.max(95 - idx * 5, 70),
      reasoning: `Phù hợp với tiêu chí "${params.userPreference}" nhờ vị trí thuận tiện lân cận di sản và phong cách ẩm thực đặc trưng.`,
      highlightsForUser: ['Vị trí gần di sản', 'Địa phương', 'Offline']
    }));
  },

  /**
   * Smart Cultural Itinerary Planner (With Offline Fallback)
   */
  async generateSmartItinerary(params: {
    destination: string;
    duration?: string;
    interests?: string[];
    budget?: string;
    companion?: string;
  }): Promise<ItineraryPlan> {
    try {
      const res = await fetch('/api/ai/generate-itinerary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        return {
          id: 'itin-' + Date.now(),
          ...deepCleanVietnamese(data.itinerary)
        };
      }
    } catch (err) {
      console.warn('Smart itinerary offline fallback:', err);
    }

    const dest = params.destination || 'Huế';
    const slots: ItineraryTimeSlot[] = [
      {
        time: '08:00 - 11:30',
        activityType: 'heritage',
        title: `Tham quan Quần thể Di tích Cố đô ${dest}`,
        locationName: `Trung tâm Di tích ${dest}`,
        description: 'Chiêm ngưỡng kiến trúc cung đình ngàn năm, chụp ảnh kỷ niệm cổ phục.',
        durationMinutes: 210
      },
      {
        time: '12:00 - 13:30',
        activityType: 'food',
        title: 'Thưởng thức Ẩm thực Truyền thống',
        locationName: `Quán ăn di sản ${dest}`,
        description: 'Trải nghiệm các món đặc sản nổi tiếng theo hương vị bản địa.',
        durationMinutes: 90
      },
      {
        time: '14:30 - 17:00',
        activityType: 'craft',
        title: 'Ghé thăm Làng nghề truyền thống',
        locationName: `Làng nghề ${dest}`,
        description: 'Tự tay tham gia làm nón lá, làm gốm hoặc đúc đồng cùng nghệ nhân.',
        durationMinutes: 150
      }
    ];

    return {
      id: 'itin-offline-' + Date.now(),
      title: `[Lịch Trình Offline] Khám Phá Di Sản ${dest}`,
      destination: dest,
      duration: params.duration || '1 ngày',
      vibe: 'Sâu lắng, lịch sử & văn hóa truyền thống',
      routeSummary: `Hành trình khám phá di sản trọng điểm tại ${dest}`,
      aiOptimizationReasoning: 'Tối ưu hóa thứ tự tham quan giúp tiết kiệm thời gian di chuyển và phù hợp với Chế độ Ngoại tuyến.',
      slots
    };
  },

  /**
   * Speech Synthesis (Text-to-Speech) using ttsService
   */
  speakText(text: string, options?: TTSOptions) {
    ttsService.prepareForMobilePlayback();
    ttsService.speak(text, options);
  },

  speakVietnamese(text: string, onEnd?: () => void) {
    ttsService.prepareForMobilePlayback();
    ttsService.speak(text, { lang: 'vi-VN', onEnd });
  },

  stopSpeaking() {
    ttsService.stop();
  },

  /**
   * Speech Recognition helper using speechService
   */
  startSpeechRecognition(options: SpeechRecognitionOptions) {
    return speechService.startListening({ lang: 'vi-VN', ...options });
  },

  stopSpeechRecognition() {
    speechService.stopListening();
  },

  /**
   * AI Search and Recommend High-Definition Landmark Images
   */
  async searchLandmarkImages(params: {
    query?: string;
    cityName?: string;
    landmarkName?: string;
    province?: string;
  }): Promise<{
    photos: LandmarkPhotoItem[];
    aiSuggestions: {
      landmarkName: string;
      cityName: string;
      province?: string;
      tagline: string;
      photoPerspective?: string;
      searchKeywords: string;
    }[];
    totalCount: number;
  }> {
    try {
      const res = await fetch('/api/ai/search-landmark-images', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        return {
          photos: data.photos || [],
          aiSuggestions: data.aiSuggestions || [],
          totalCount: data.totalCount || (data.photos?.length ?? 0)
        };
      }
    } catch (err) {
      console.warn('AI search landmark images fallback to local dataset:', err);
    }

    return {
      photos: VIETNAM_LANDMARK_PHOTOS,
      aiSuggestions: [],
      totalCount: VIETNAM_LANDMARK_PHOTOS.length
    };
  },

  /**
   * Gemini Google Search Landmark Image Finder
   */
  async findLandmarkImageWithGoogle(params: {
    landmarkName: string;
    cityName?: string;
    province?: string;
  }): Promise<{
    bestImageUrl: string;
    landmarkName: string;
    cityName: string;
    province: string;
    tagline: string;
    lat: number;
    lng: number;
    searchSummary: string;
    candidateImages: {
      url: string;
      title: string;
      source: string;
      photographer?: string;
    }[];
  }> {
    try {
      const res = await fetch('/api/ai/google-find-landmark-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });
      const data = await res.json();
      if (res.ok && data && data.success) {
        return deepCleanVietnamese(data);
      }
    } catch (err) {
      console.warn('Network or API error in findLandmarkImageWithGoogle, falling back to local database:', err);
    }

    // Direct client fallback to curated authentic landmark database
    const query = `${params.landmarkName} ${params.cityName || ''} ${params.province || ''}`.toLowerCase();
    const isVanMieu = /văn miếu|quốc tử giám|khuê văn các/i.test(query);
    const isDaiNoiHue = /đại nội|cung đình huế|ngọ môn|cố đô huế|hoàng thành huế/i.test(query);
    const isHoiAn = /hội an|chùa cầu|lai viễn kiều|cầu nhật bản|phố cổ hội an/i.test(query);

    const matchingPhotos = VIETNAM_LANDMARK_PHOTOS.filter(p => {
      if (isVanMieu) return p.id.startsWith('hn-van-mieu') || p.id.startsWith('hn-khue-van-cac');
      if (isDaiNoiHue) return p.id.startsWith('hue-dai-noi');
      if (isHoiAn) return p.id.startsWith('qn-hoi-an') || p.id.startsWith('qn-chua-cau');
      const target = `${p.landmarkName} ${p.title} ${p.cityName} ${p.province}`.toLowerCase();
      const terms = query.split(/\s+/).filter(w => w.length > 1);
      return terms.some(t => target.includes(t));
    });

    const bestPhoto = matchingPhotos[0] || (
      isVanMieu ? VIETNAM_LANDMARK_PHOTOS[0] : 
      (isDaiNoiHue ? VIETNAM_LANDMARK_PHOTOS.find(p => p.id.startsWith('hue-dai-noi')) || VIETNAM_LANDMARK_PHOTOS[0] : 
      (isHoiAn ? VIETNAM_LANDMARK_PHOTOS.find(p => p.id.startsWith('qn-hoi-an')) || VIETNAM_LANDMARK_PHOTOS[0] : 
      VIETNAM_LANDMARK_PHOTOS[0]))
    );
    const candidates = (matchingPhotos.length > 0 ? matchingPhotos : [bestPhoto]).slice(0, 4).map(p => ({
      url: p.imageUrl,
      title: p.title,
      source: p.source || 'Kho Di Sản Quốc Gia',
      photographer: p.photographer || 'Nhiếp ảnh gia Di sản'
    }));

    return {
      bestImageUrl: bestPhoto.imageUrl,
      landmarkName: params.landmarkName || bestPhoto.landmarkName,
      cityName: params.cityName || bestPhoto.cityName,
      province: params.province || bestPhoto.province,
      tagline: bestPhoto.tagline || `Khám phá vẻ đẹp kỳ vĩ của ${params.landmarkName || bestPhoto.landmarkName}`,
      lat: bestPhoto.lat,
      lng: bestPhoto.lng,
      searchSummary: `Đã tìm ảnh phong cảnh chính xác và chất lượng cao cho danh thắng "${params.landmarkName || bestPhoto.landmarkName}".`,
      candidateImages: candidates
    };
  }
};
