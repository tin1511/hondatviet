export type SupportedLanguage = 'vi' | 'en' | 'ko' | 'zh' | 'ja' | 'fr';

export interface TranslationDictionary {
  [key: string]: {
    vi: string;
    en: string;
    ko: string;
    zh: string;
    ja: string;
    fr: string;
  };
}

export const TRANSLATIONS: TranslationDictionary = {
  // Brand & Header
  brandTitle: {
    vi: 'HỒN ĐẤT VIỆT',
    en: 'SOUL OF VIETNAM',
    ko: '베트남의 영혼',
    zh: '越南之魂',
    ja: 'ベトナムの魂',
    fr: 'ÂME DU VIETNAM'
  },
  brandSubtitle: {
    vi: 'Hiểu di sản. Khám phá Việt Nam.',
    en: 'Understand Heritage. Discover Vietnam.',
    ko: '유산을 이해하고 베트남을 발견하세요.',
    zh: '了解遗产。探索越南。',
    ja: '遺産を理解し、ベトナムを発見しよう。',
    fr: 'Comprendre le patrimoine. Découvrir le Vietnam.'
  },
  tagline: {
    vi: 'Cổng thông tin Di sản văn hóa & Du lịch thông minh 4.0',
    en: 'Smart Cultural Heritage & Tourism Portal 4.0',
    ko: '스마트 문화 유산 및 관광 포털 4.0',
    zh: '智能文化遗产与旅游门户 4.0',
    ja: 'スマート文化遺産・観光ポータル 4.0',
    fr: 'Portail intelligent du patrimoine culturel et du tourisme 4.0'
  },

  // Navigation Tabs
  navHome: {
    vi: 'Trang chủ',
    en: 'Home',
    ko: '홈',
    zh: '首页',
    ja: 'ホーム',
    fr: 'Accueil'
  },
  navMap: {
    vi: 'Bản đồ Việt Nam',
    en: 'Vietnam Map',
    ko: '베트남 지도',
    zh: '越南地图',
    ja: 'ベトナム地図',
    fr: 'Carte du Vietnam'
  },
  navHeritage: {
    vi: 'Di sản',
    en: 'Heritage',
    ko: '유산',
    zh: '遗产',
    ja: '遺産',
    fr: 'Patrimoine'
  },
  navRecognizer: {
    vi: 'Nhận diện AI',
    en: 'AI Vision',
    ko: 'AI 비전 인식',
    zh: 'AI 识别',
    ja: 'AI認識',
    fr: 'Vision AI'
  },
  navStoryteller: {
    vi: 'Kể chuyện AI',
    en: 'AI Storyteller',
    ko: 'AI 스토리텔러',
    zh: 'AI 讲故事',
    ja: 'AIストーリーテラー',
    fr: 'Conteur AI'
  },
  navChat: {
    vi: 'Hướng Dẫn Viên AI',
    en: 'AI Tour Guide',
    ko: 'AI 가이드',
    zh: 'AI 导游',
    ja: 'AIツアーガイド',
    fr: 'Guide Touristique AI'
  },
  navFood: {
    vi: 'Ăn uống & Vui chơi',
    en: 'Food & Fun',
    ko: '음식 및 즐길거리',
    zh: '美食与娱乐',
    ja: 'グルメ＆エンタメ',
    fr: 'Gastronomie & Loisirs'
  },
  navItinerary: {
    vi: 'Lịch trình',
    en: 'Itinerary',
    ko: '여행 일정',
    zh: '行程规划',
    ja: '旅程プラン',
    fr: 'Itinéraire'
  },
  navCrafts: {
    vi: 'Làng nghề & Nghệ thuật',
    en: 'Crafts & Arts',
    ko: '공예 및 예술',
    zh: '手工艺与艺术',
    ja: '工芸＆芸術',
    fr: 'Artisanat & Arts'
  },
  navLearning: {
    vi: 'Quiz & Lịch sử',
    en: 'Quiz & History',
    ko: '퀴즈 및 역사',
    zh: '问答与历史',
    ja: 'クイズ＆歴史',
    fr: 'Quiz & Histoire'
  },
  navProfile: {
    vi: 'Hồ sơ & Danh hiệu',
    en: 'Profile & Badges',
    ko: '프로필 및 배지',
    zh: '个人资料与徽章',
    ja: 'プロフィール＆バッジ',
    fr: 'Profil & Badges'
  },
  navCommunity: {
    vi: 'Cộng đồng',
    en: 'Community',
    ko: '커뮤니티',
    zh: '社区',
    ja: 'コミュニティ',
    fr: 'Communauté'
  },
  navAdmin: {
    vi: 'Quản trị hệ thống',
    en: 'Admin Dashboard',
    ko: '관리자 대시보드',
    zh: '管理面板',
    ja: '管理ダッシュボード',
    fr: 'Tableau de bord Admin'
  },

  // Auth & Actions
  login: {
    vi: 'Đăng nhập',
    en: 'Sign In',
    ko: '로그인',
    zh: '登录',
    ja: 'ログイン',
    fr: 'Connexion'
  },
  register: {
    vi: 'Đăng ký',
    en: 'Sign Up',
    ko: '회원가입',
    zh: '注册',
    ja: '登録',
    fr: 'S\'inscrire'
  },
  logout: {
    vi: 'Đăng xuất',
    en: 'Sign Out',
    ko: '로그아웃',
    zh: '登出',
    ja: '로그아웃',
    fr: 'Déconnexion'
  },
  addHeritage: {
    vi: 'Đề Xuất Mới',
    en: 'Add Place',
    ko: '새 장소 추가',
    zh: '添加新地点',
    ja: '新しい場所を追加',
    fr: 'Ajouter un lieu'
  },
  exploreNow: {
    vi: 'Khám phá ngay',
    en: 'Explore Now',
    ko: '지금 탐색',
    zh: '立即探索',
    ja: '今すぐ探索',
    fr: 'Explorer'
  },
  searchPlaceholder: {
    vi: 'Tìm kiếm di sản, danh thắng, đền chùa, ẩm thực...',
    en: 'Search heritage, landmarks, pagodas, food...',
    ko: '유산, 명소, 사원, 음식 검색...',
    zh: '搜索遗产、地标、寺庙、美食...',
    ja: '遺産、名所、寺院、グルメを検索...',
    fr: 'Rechercher patrimoine, monuments, temples, gastronomie...'
  },
  allProvinces: {
    vi: 'Tất cả Tỉnh thành (63 Tỉnh/Thành)',
    en: 'All Provinces (63 Provinces/Cities)',
    ko: '모든 성/시 (63개 지역)',
    zh: '所有省市 (63个省市)',
    ja: 'すべての省・都市 (63省市)',
    fr: 'Toutes les provinces (63)'
  },
  filterByCategory: {
    vi: 'Lọc theo danh mục di sản',
    en: 'Filter by heritage category',
    ko: '유산 카테고리별 필터',
    zh: '按遗产类别筛选',
    ja: '遺産カテゴリで絞り込み',
    fr: 'Filtrer par catégorie'
  },
  viewDetails: {
    vi: 'Xem chi tiết',
    en: 'View Details',
    ko: '상세보기',
    zh: '查看详情',
    ja: '詳細を見る',
    fr: 'Voir les détails'
  },
  audioGuide: {
    vi: 'Nghe Thuyết Minh AI',
    en: 'AI Audio Guide',
    ko: 'AI 오디오 가이드',
    zh: 'AI 语音导览',
    ja: 'AI音声ガイド',
    fr: 'Guide audio AI'
  },
  aiTourGuideTitle: {
    vi: 'Hướng Dẫn Viên Du Lịch AI 3D',
    en: '3D AI Tour Guide & Companion',
    ko: '3D AI 관광 가이드',
    zh: '3D AI 导游',
    ja: '3D AIツアーガイド',
    fr: 'Guide Touristique 3D AI'
  },
  aiTourGuideSubtitle: {
    vi: 'Trò chuyện bằng giọng nói & Nhận tư vấn lịch trình du lịch thông minh bằng AI',
    en: 'Voice chat & Get smart AI travel itinerary recommendations',
    ko: '음성 채팅 및 스마트 AI 여행 일정 추천 받기',
    zh: '语音聊天并获取智能 AI 行程建议',
    ja: '音声チャットとスマートAI旅行プランの提案を受ける',
    fr: 'Chat vocal et recommandations d\'itinéraires par IA'
  },
  favoritesTitle: {
    vi: 'Danh Sách Di Sản Đã Lưu',
    en: 'Saved Heritage List',
    ko: '저장된 유산 목록',
    zh: '已保存的遗产列表',
    ja: '保存された遺産リスト',
    fr: 'Patrimoines enregistrés'
  },
  offlineMode: {
    vi: 'Chế độ ngoại tuyến',
    en: 'Offline Mode',
    ko: '오프라인 모드',
    zh: '离线模式',
    ja: 'オフラインモード',
    fr: 'Mode hors ligne'
  },
  share: {
    vi: 'Chia sẻ',
    en: 'Share',
    ko: '공유',
    zh: '分享',
    ja: 'シェア',
    fr: 'Partager'
  },
  close: {
    vi: 'Đóng',
    en: 'Close',
    ko: '닫기',
    zh: '关闭',
    ja: '閉じる',
    fr: 'Fermer'
  },
  save: {
    vi: 'Lưu',
    en: 'Save',
    ko: '저장',
    zh: '保存',
    ja: '保存',
    fr: 'Enregistrer'
  },
  success: {
    vi: 'Thành công',
    en: 'Success',
    ko: '성공',
    zh: '成功',
    ja: '成功',
    fr: 'Succès'
  },
  error: {
    vi: 'Lỗi',
    en: 'Error',
    ko: '오류',
    zh: '错误',
    ja: 'エラー',
    fr: 'Erreur'
  }
};

export function translate(key: string, lang: string = 'vi'): string {
  const normalizedLang = (['vi', 'en', 'ko', 'zh', 'ja', 'fr'].includes(lang) ? lang : 'vi') as SupportedLanguage;
  if (TRANSLATIONS[key]) {
    return TRANSLATIONS[key][normalizedLang] || TRANSLATIONS[key]['vi'] || key;
  }
  return key;
}
