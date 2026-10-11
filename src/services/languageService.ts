/**
 * Language & Localization Service for HERITAGEAI / Hồn Đất Việt
 * Provides multi-language support (Vietnamese, English, French, Japanese, Korean, Chinese),
 * interface translation dictionary, persistent preferences, voice preview,
 * and automatic full-page DOM translation engine.
 */

export interface LanguageInfo {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  bcp47: string;
  greeting: string;
  sampleGreeting: string;
  description: string;
  aiVoiceAccent: string;
  googleTranslateCode: string;
}

export const SUPPORTED_LANGUAGES: LanguageInfo[] = [
  {
    code: 'vi',
    name: 'Tiếng Việt',
    nativeName: 'Tiếng Việt',
    flag: '🇻🇳',
    bcp47: 'vi-VN',
    greeting: 'Xin kính chào quý khách!',
    sampleGreeting: 'Dạ em là Hướng dẫn viên ảo Hồn Đất Việt, xin kính chào quý cô bác anh chị đã đến với hành trình khám phá di sản Việt Nam!',
    description: 'Ngôn ngữ mẹ đẻ với kho tàng tri thức lịch sử và văn hóa bản địa phong phú nhất.',
    aiVoiceAccent: 'Giọng Bắc/Trung/Nam truyền cảm bản xứ',
    googleTranslateCode: 'vi'
  },
  {
    code: 'en',
    name: 'Tiếng Anh',
    nativeName: 'English',
    flag: '🇬🇧',
    bcp47: 'en-US',
    greeting: 'Welcome to Vietnam Heritage!',
    sampleGreeting: 'Hello and warm welcome! I am your AI Heritage Guide, ready to help you discover thousands of years of Vietnamese culture and history.',
    description: 'Global international language with full AI tour guide and storytelling support.',
    aiVoiceAccent: 'Natural International English',
    googleTranslateCode: 'en'
  },
  {
    code: 'fr',
    name: 'Tiếng Pháp',
    nativeName: 'Français',
    flag: '🇫🇷',
    bcp47: 'fr-FR',
    greeting: 'Bienvenue au patrimoine du Vietnam!',
    sampleGreeting: 'Bonjour et bienvenue! Je suis votre guide virtuel pour explorer les trésors culturels et historiques du Vietnam.',
    description: 'Langue officielle pour les voyageurs francophones et historiens du monde.',
    aiVoiceAccent: 'Français métropolitain fluide',
    googleTranslateCode: 'fr'
  },
  {
    code: 'ja',
    name: 'Tiếng Nhật',
    nativeName: '日本語',
    flag: '🇯🇵',
    bcp47: 'ja-JP',
    greeting: 'ベトナムの遺産へようこそ！',
    sampleGreeting: 'こんにちは！ベトナムの歴史と世界遺産をご案内するAIツアーガイドです。素晴らしい旅をお楽しみください。',
    description: '日本の旅行者や研究者向けの丁寧で正確な文化案内。',
    aiVoiceAccent: '丁寧な標準日本語案内',
    googleTranslateCode: 'ja'
  },
  {
    code: 'ko',
    name: 'Tiếng Hàn',
    nativeName: '한국어',
    flag: '🇰🇷',
    bcp47: 'ko-KR',
    greeting: '베트남 문화유산에 오신 것을 환영합니다!',
    sampleGreeting: '안녕하세요! 베트남의 유구한 역사와 찬란한 문화유산을 안내해 드릴 AI 문화유산 가이드입니다.',
    description: '한국인 관광객과 문화 애호가를 위한 친절한 맞춤형 안내.',
    aiVoiceAccent: '친절하고 정확한 표준 한국어',
    googleTranslateCode: 'ko'
  },
  {
    code: 'zh',
    name: 'Tiếng Trung',
    nativeName: '中文 (简体)',
    flag: '🇨🇳',
    bcp47: 'zh-CN',
    greeting: '欢迎探索越南文化遗产！',
    sampleGreeting: '您好！我是您的AI文化遗产导游，带您领略越南千年的历史风华与名胜古迹。',
    description: '深入诠释汉喃文化渊源与东亚文明交流的典故.',
    aiVoiceAccent: '标准普通话导游解说',
    googleTranslateCode: 'zh-CN'
  }
];

export const LANGUAGE_STORAGE_KEY = 'heritageai_language';
export const AI_VOICE_LANG_KEY = 'heritageai_ai_voice_lang';
export const AUTO_TRANSLATE_KEY = 'heritageai_auto_translate';

export interface Translations {
  [key: string]: {
    [lang: string]: string;
  };
}

export const DICTIONARY: Translations = {
  // Navigation tabs
  'nav.home': {
    vi: 'Trang chủ',
    en: 'Home',
    fr: 'Accueil',
    ja: 'ホーム',
    ko: '홈',
    zh: '首页'
  },
  'nav.heritage': {
    vi: 'Di sản',
    en: 'Heritage',
    fr: 'Patrimoine',
    ja: '遺産',
    ko: '문화유산',
    zh: '文化遗产'
  },
  'nav.recognizer': {
    vi: 'Nhận diện AI',
    en: 'AI Vision',
    fr: 'Vision IA',
    ja: 'AI画像認識',
    ko: 'AI 비전 인식',
    zh: 'AI 视觉识别'
  },
  'nav.storyteller': {
    vi: 'Kể chuyện AI',
    en: 'AI Stories',
    fr: 'Récits IA',
    ja: 'AIストーリー',
    ko: 'AI 이야기',
    zh: 'AI 故事讲述'
  },
  'nav.chat': {
    vi: 'Hướng Dẫn Viên AI',
    en: 'AI Tour Guide',
    fr: 'Guide IA',
    ja: 'AIツアーガイド',
    ko: 'AI 가이드',
    zh: 'AI 虚拟导游'
  },
  'nav.map': {
    vi: 'Bản đồ',
    en: 'Map',
    fr: 'Carte',
    ja: '地図',
    ko: '지도',
    zh: '文化地图'
  },
  'nav.food': {
    vi: 'Ăn uống & Vui chơi',
    en: 'Food & Leisure',
    fr: 'Gastronomie & Loisirs',
    ja: 'グルメ・娯楽',
    ko: '음식 & 엔터테인먼트',
    zh: '美食与休闲'
  },
  'nav.itinerary': {
    vi: 'Lịch trình',
    en: 'Itinerary',
    fr: 'Itinéraire',
    ja: '旅行日程',
    ko: '여행 일정',
    zh: '行程规划'
  },
  'nav.crafts': {
    vi: 'Làng nghề & Nghệ thuật',
    en: 'Crafts & Folk Arts',
    fr: 'Artisanat & Arts',
    ja: '工芸・伝統芸能',
    ko: '전통공예 & 예술',
    zh: '传统手工艺与艺术'
  },
  'nav.learning': {
    vi: 'Quiz & Lịch sử',
    en: 'Quiz & History',
    fr: 'Quiz & Histoire',
    ja: 'クイズ・歴史',
    ko: '퀴즈 & 역사',
    zh: '历史问答'
  },
  'nav.profile': {
    vi: 'Hồ sơ & Danh hiệu',
    en: 'Profile & Badges',
    fr: 'Profil & Titres',
    ja: 'プロフィール・バッジ',
    ko: '프로필 & 칭호',
    zh: '个人档案与成就'
  },
  'nav.community': {
    vi: 'Cộng đồng',
    en: 'Community',
    fr: 'Communauté',
    ja: 'コミュニティ',
    ko: '커뮤니티',
    zh: '互动社区'
  },
  'nav.admin': {
    vi: 'Quản trị viên',
    en: 'Admin Dashboard',
    fr: 'Administration',
    ja: '管理者',
    ko: '관리자',
    zh: '管理后台'
  },
  'nav.more': {
    vi: 'Thêm',
    en: 'More',
    fr: 'Plus',
    ja: 'その他',
    ko: '더보기',
    zh: '更多'
  },
  'nav.favorites': {
    vi: 'Yêu thích',
    en: 'Favorites',
    fr: 'Favoris',
    ja: 'お気に入り',
    ko: '즐겨찾기',
    zh: '收藏夹'
  },
  'nav.addHeritage': {
    vi: 'Đề Xuất Mới',
    en: 'Submit Heritage',
    fr: 'Proposer',
    ja: '遺産提案',
    ko: '신규 제안',
    zh: '推荐遗址'
  },
  'nav.offline': {
    vi: 'Ngoại tuyến',
    en: 'Offline',
    fr: 'Hors ligne',
    ja: 'オフライン',
    ko: '오프라인',
    zh: '离线模式'
  },
  'nav.login': {
    vi: 'Đăng nhập',
    en: 'Sign In',
    fr: 'Connexion',
    ja: 'ログイン',
    ko: '로그인',
    zh: '登录'
  },
  'nav.register': {
    vi: 'Đăng ký',
    en: 'Sign Up',
    fr: 'Inscription',
    ja: '登録',
    ko: '회원가입',
    zh: '注册'
  },
  'nav.logout': {
    vi: 'Đăng xuất',
    en: 'Sign Out',
    fr: 'Déconnexion',
    ja: 'ログアウト',
    ko: '로그아웃',
    zh: '退出登录'
  },
  'nav.backToHome': {
    vi: 'Quay lại Trang chủ',
    en: 'Back to Home',
    fr: 'Retour à l\'accueil',
    ja: 'ホームに戻る',
    ko: '홈으로 돌아가기',
    zh: '返回首页'
  },
  'nav.brandTagline': {
    vi: 'Hiểu di sản. Khám phá Việt Nam.',
    en: 'Understand Heritage. Discover Vietnam.',
    fr: 'Comprendre le Patrimoine. Explorer le Vietnam.',
    ja: '遺産を知り、ベトナムを巡る。',
    ko: '역사를 이해하고, 베트남을 탐험하세요.',
    zh: '感悟文化遗产，探索大美越南。'
  },

  // Hero Section
  'hero.platformBadge': {
    vi: 'Nền tảng AI Di sản & Văn hóa Việt Nam Toàn diện',
    en: 'Comprehensive Vietnam Heritage & Cultural AI Platform',
    fr: 'Plateforme IA Complète du Patrimoine et de la Culture du Vietnam',
    ja: 'ベトナムの文化遺産・総合AIプラットフォーム',
    ko: '베트남 문화유산 & 문화 종합 AI 플랫폼',
    zh: '越南文化遗产与历史文明全景AI平台'
  },
  'hero.mainHeading1': {
    vi: 'Khám phá Việt Nam bằng',
    en: 'Discover Vietnam with',
    fr: 'Découvrez le Vietnam avec',
    ja: '最先端の技術で巡る',
    ko: '새롭게 발견하는 베트남',
    zh: '以全新视角探索越南'
  },
  'hero.mainHeading2': {
    vi: 'Trí tuệ Nhân tạo',
    en: 'Artificial Intelligence',
    fr: 'l\'Intelligence Artificielle',
    ja: '人工知能 (AI)',
    ko: '인공지능 (AI)',
    zh: '人工智能 (AI)'
  },
  'hero.subtitle': {
    vi: 'Hiểu lịch sử. Khám phá di sản. Tìm trải nghiệm. Lên lịch trình.',
    en: 'Understand history. Explore heritage. Find experiences. Plan itineraries.',
    fr: 'Comprendre l\'histoire. Explorer le patrimoine. Vivre des expériences. Planifier.',
    ja: '歴史を学び、遺産を巡り、体験を深め、旅を計画する。',
    ko: '역사를 배우고, 유산을 탐험하며, 특별한 여정을 계획하세요.',
    zh: '研读悠久历史，探访千年胜迹，沉浸文化体验，定制智能行程。'
  },
  'hero.searchPlaceholder': {
    vi: 'Tìm di sản, địa danh, món ăn (Huế, Hội An, Phố cổ...)',
    en: 'Search heritage, places, delicacies (Hue, Hoi An, Old Quarter...)',
    fr: 'Rechercher patrimoine, lieux, gastronomie (Hué, Hoi An...)',
    ja: '文化遺産、史跡、郷土料理を検索（フエ、ホイアン、旧市街...）',
    ko: '문화유산, 명소, 향토음식 검색 (후에, 호이안, 하노이 고도...)',
    zh: '搜索文化遗产、历史名胜、特色美食（顺化、会安、古街...）'
  },
  'hero.gpsNearest': {
    vi: 'Gần Bạn Nhất (GPS)',
    en: 'Nearest You (GPS)',
    fr: 'Le Plus Proche (GPS)',
    ja: '最寄りの名所 (GPS)',
    ko: '가장 가까운 곳 (GPS)',
    zh: '离你最近 (GPS)'
  },
  'hero.detectGps': {
    vi: 'Lấy GPS của tôi',
    en: 'Get My GPS',
    fr: 'Localiser mon GPS',
    ja: '現在地を取得',
    ko: '내 GPS 위치',
    zh: '获取当前位置'
  },
  'hero.detectingGps': {
    vi: 'Đang dò GPS...',
    en: 'Locating GPS...',
    fr: 'Localisation GPS...',
    ja: 'GPS測位中...',
    ko: 'GPS 탐색 중...',
    zh: '正在定位...'
  },
  'hero.changeLandmark': {
    vi: 'Đổi danh thắng khác',
    en: 'Change Landmark',
    fr: 'Changer de site',
    ja: '名勝を変更',
    ko: '명소 변경',
    zh: '更换名胜'
  },
  'hero.exploreWallpaper': {
    vi: 'Khám phá di sản này',
    en: 'Explore this heritage',
    fr: 'Explorer ce site',
    ja: 'この遺産を探索',
    ko: '이 유산 탐색',
    zh: '探索此遗址'
  },
  'hero.guestTitle': {
    vi: 'Đăng Nhập / Đăng Ký Tài Khoản',
    en: 'Sign In / Register Account',
    fr: 'Connexion / Inscription',
    ja: 'ログイン / 会員登録',
    ko: '로그인 / 회원가입',
    zh: '登录 / 注册账户'
  },
  'hero.guestDesc': {
    vi: 'Đăng ký miễn phí để nhận điểm văn hóa, lưu hành trình & mở khóa danh hiệu di sản.',
    en: 'Sign up free to earn cultural XP, save trips & unlock heritage badges.',
    fr: 'Inscrivez-vous gratuitement pour gagner des points XP et débloquer des titres.',
    ja: '無料登録で文化XPを獲得し、旅程を保存して名誉ある称号を獲得。',
    ko: '무료 가입으로 문화 XP를 적립하고, 여정을 저장하며 명예 칭호를 획득하세요.',
    zh: '免费注册以积累文化积分，保存历史行程并解锁专属文化成就。'
  },

  // Home Featured Heritage Section
  'home.featuredBadge': {
    vi: 'Di Sản Tiêu Biểu',
    en: 'Featured Heritages',
    fr: 'Patrimoines Remarquables',
    ja: '代表的な世界遺産',
    ko: '대표 문화유산',
    zh: '代表性文化遗产'
  },
  'home.featuredTitle': {
    vi: 'Báu Vật Ngàn Năm Của Dân Tộc',
    en: 'Millennial Treasures of the Nation',
    fr: 'Trésors Millénaires de la Nation',
    ja: '千年の歴史を誇る国の宝',
    ko: '민족의 찬란한 천년 보물',
    zh: '千百年来流传的民族瑰宝'
  },
  'home.viewAllMap': {
    vi: 'Xem tất cả trên bản đồ',
    en: 'View all on map',
    fr: 'Voir tout sur la carte',
    ja: '地図ですべて見る',
    ko: '지도에서 전체 보기',
    zh: '在全景地图中查看'
  },

  // Home Bento Showcase
  'home.archiveBadge': {
    vi: 'Hệ Thống Lưu Trữ Cá Nhân & Điểm Văn Hóa',
    en: 'Personal Archive & Cultural XP System',
    fr: 'Système d\'Archives Personnelles & Points XP',
    ja: '個人アーカイブ＆文化ポイントシステム',
    ko: '개인 보관함 & 문화 포인트 시스템',
    zh: '个人档案与文化积分系统'
  },
  'home.archiveTitle': {
    vi: 'Đồng Hành & Lưu Trữ Mọi Hành Trình Di Sản Của Bạn',
    en: 'Accompanying & Preserving All Your Heritage Journeys',
    fr: 'Accompagner & Préserver Tous Vos Voyages Culturels',
    ja: 'あなたの歴史遺産の旅を記録・共有',
    ko: '당신의 모든 문화유산 여정을 함께 기록합니다',
    zh: '陪伴并记录您的每一段文化遗产之旅'
  },
  'home.archiveDesc': {
    vi: 'Mỗi thao tác nhận diện ảnh chụp bằng AI, nghe kể chuyện lịch sử, hoàn thành câu đố văn hóa hay lập kế hoạch du lịch đều được tự động ghi lại trong hồ sơ cá nhân với hệ thống điểm thưởng XP và danh hiệu di sản.',
    en: 'Every AI image recognition, historical story listened to, cultural quiz completed, and trip plan made is automatically recorded with XP rewards and heritage badges.',
    fr: 'Chaque reconnaissance d\'image IA, histoire écoutée, quiz réussi ou itinéraire planifié est enregistré avec des points XP et des titres patrimoniaux.',
    ja: 'AI画像認識、歴史ストーリーの再生、クイズの挑戦、旅行日程の作成のすべてが個人プロファイルに記録され、XPやバッジが付与されます。',
    ko: 'AI 사진 인식, 역사 이야기 청취, 문화 퀴즈 풀이 및 여행 계획 등 모든 활동이 XP 포인트와 문화유산 칭호로 기록됩니다.',
    zh: '每一次AI视觉识别、倾听历史故事、完成文化问答或规划行程，都将自动记录在个人档案中，并累积XP积分与专属成就。'
  },
  'home.viewBadges': {
    vi: 'Xem Bảng Danh Hiệu & Hồ Sơ',
    en: 'View Badges & Profile',
    fr: 'Voir les Titres & Profil',
    ja: '称号＆プロフィールを見る',
    ko: '칭호 및 프로필 보기',
    zh: '查看成就与档案'
  },
  'home.myAccount': {
    vi: 'Tài Khoản Cá Nhân',
    en: 'Personal Account',
    fr: 'Compte Personnel',
    ja: 'マイアカウント',
    ko: '개인 계정',
    zh: '个人账户'
  },
  'home.loginSignup': {
    vi: 'Đăng Nhập / Đăng Ký',
    en: 'Sign In / Sign Up',
    fr: 'Connexion / Inscription',
    ja: 'ログイン / 新規登録',
    ko: '로그인 / 회원가입',
    zh: '登录 / 注册'
  },

  // Bento mini cards
  'home.visionTitle': {
    vi: 'AI Nhận Diện Thị Giác',
    en: 'AI Visual Recognition',
    fr: 'Vision IA Patrimoniale',
    ja: 'AI視覚・画像認識',
    ko: 'AI 시각 인식',
    zh: 'AI 视觉识别'
  },
  'home.visionDesc': {
    vi: 'Chụp ảnh di tích, đồ cổ, trang phục cổ hay món ăn để biết ngay tên gọi, niên đại và ý nghĩa lịch sử.',
    en: 'Take photos of monuments, antiques, historic costumes or food to discover names, periods and cultural origins.',
    fr: 'Prenez en photo monuments, antiquités, costumes ou plats pour connaître leur histoire et signification.',
    ja: '写真から寺院、古美術品、伝統衣装、郷土料理を瞬時に特定し、時代背景を解説。',
    ko: '유적지, 골동품, 전통 의상 또는 음식을 촬영하여 이름, 연대 및 역사적 의미를 즉시 확인하세요.',
    zh: '拍摄古迹、文物古董、传统服饰或特色菜肴，即时获知其名称、历史年代与文化底蕴。'
  },
  'home.storyTitle': {
    vi: 'AI Kể Chuyện Đa Đối Tượng',
    en: 'Multi-Audience AI Storyteller',
    fr: 'Récits IA Personnalisés',
    ja: 'AI歴史ストーリーテリング',
    ko: '맞춤형 AI 이야기꾼',
    zh: 'AI 多群体故事讲述'
  },
  'home.storyDesc': {
    vi: 'Lắng nghe giọng kể truyền cảm phù hợp với trẻ em, học sinh, nhà nghiên cứu hay du khách quốc tế.',
    en: 'Listen to expressive storytelling crafted for children, students, scholars, or international tourists.',
    fr: 'Écoutez une narration captivante adaptée aux enfants, étudiants, chercheurs ou voyageurs du monde.',
    ja: '子供向け、学生向け、研究者向け、外国人観光客向けに最適化された感情豊かな音声解説。',
    ko: '어린이, 학생, 연구자 및 해외 관광객에 맞춘 감동적인 내레이션을 들어보세요.',
    zh: '倾听针对儿童、青少年、历史学者或国际游客量身定制的生动语音导览。'
  },
  'home.itineraryTitle': {
    vi: 'Lập Lịch Trình Tự Động',
    en: 'Automated Itinerary Planner',
    fr: 'Planificateur d\'Itinéraire',
    ja: 'スマート旅行計画',
    ko: '스마트 일정 플래너',
    zh: '智能行程规划'
  },
  'home.itineraryDesc': {
    vi: 'Lên kế hoạch du lịch văn hóa theo thời gian, ngân sách, tích hợp Google Places lân cận.',
    en: 'Generate customized cultural tour plans by time and budget with nearby Google Places.',
    fr: 'Organisez des circuits culturels selon votre temps et budget avec les lieux Google Places à proximité.',
    ja: '時間や予算に合わせて最適な文化ツアーを自動編成し、周辺の人気スポットも提案。',
    ko: '시간과 예산에 맞추어 맞춤형 문화 여행을 계획하고 주변 장소를 추천받으세요.',
    zh: '根据游玩时间与预算，自动生成深度文化游览路线，并推荐周边精选地标。'
  },

  // Language Modal & Settings
  'lang.title': {
    vi: 'Cài Đặt Ngôn Ngữ & Trợ Lý AI',
    en: 'Language & AI Guide Settings',
    fr: 'Paramètres de Langue & Guide IA',
    ja: '言語およびAIガイドの設定',
    ko: '언어 및 AI 가이드 설정',
    zh: '语言与AI向导设置'
  },
  'lang.subtitle': {
    vi: 'Chuyển đổi toàn bộ ngôn ngữ trang web và giọng thuyết minh của hướng dẫn viên AI ảo.',
    en: 'Instantly translate the entire website and customize the virtual AI guide voice.',
    fr: 'Traduisez instantanément l\'ensemble du site et personnalisez la voix du guide IA.',
    ja: 'ウェブサイト全体の言語を即座に切り替え、AIガイドの音声をカスタマイズします。',
    ko: '웹사이트 전체 언어를 즉시 전환하고 가상 AI 가이드 음성을 설정합니다.',
    zh: '即刻切换全站显示语言，并定制虚拟AI导游的讲解语音。'
  },
  'lang.selectInterface': {
    vi: 'Chọn ngôn ngữ trang web',
    en: 'Select Website Language',
    fr: 'Choisir la langue du site',
    ja: 'ウェブサイトの言語を選択',
    ko: '웹사이트 언어 선택',
    zh: '选择网站语言'
  },
  'lang.active': {
    vi: 'Đang áp dụng',
    en: 'Active',
    fr: 'Actif',
    ja: '適用中',
    ko: '적용 중',
    zh: '当前生效'
  },
  'lang.listenSample': {
    vi: 'Nghe thử giọng đọc AI',
    en: 'Listen to AI Voice Sample',
    fr: 'Écouter un extrait de voix IA',
    ja: 'AI音声サンプルを聴く',
    ko: 'AI 음성 샘플 듣기',
    zh: '试听AI导游发音'
  },
  'lang.apply': {
    vi: 'Áp dụng ngôn ngữ',
    en: 'Apply Language',
    fr: 'Appliquer la langue',
    ja: '言語を適用',
    ko: '언어 적용',
    zh: '应用语言设置'
  },
  'lang.appliedSuccess': {
    vi: 'Đã đổi ngôn ngữ thành công!',
    en: 'Language updated successfully!',
    fr: 'Langue mise à jour avec succès !',
    ja: '言語が正常に変更されました！',
    ko: '언어가 성공적으로 변경되었습니다!',
    zh: '语言已成功切换！'
  },
  'lang.close': {
    vi: 'Đóng',
    en: 'Close',
    fr: 'Fermer',
    ja: '閉じる',
    ko: '닫기',
    zh: '关闭'
  },
  'lang.quickSwitch': {
    vi: 'Đổi ngôn ngữ nhanh',
    en: 'Quick Language Switch',
    fr: 'Changement rapide',
    ja: '言語クイック切替',
    ko: '빠른 언어 전환',
    zh: '快速切换语言'
  },

  // Hero CTAs & Pillars
  'hero.ctaHeritage': {
    vi: 'Khám phá Di sản',
    en: 'Explore Heritage',
    fr: 'Explorer le Patrimoine',
    ja: '遺産を探索',
    ko: '문화유산 탐험',
    zh: '探索文化遗产'
  },
  'hero.ctaRecognizer': {
    vi: 'Nhận diện bằng AI',
    en: 'AI Vision Recognition',
    fr: 'Reconnaissance IA',
    ja: 'AI画像認識',
    ko: 'AI 사진 인식',
    zh: 'AI 视觉识别'
  },
  'hero.ctaChat': {
    vi: 'Hỏi Trợ lý AI',
    en: 'Ask AI Guide',
    fr: 'Demander au Guide IA',
    ja: 'AIガイドに質問',
    ko: 'AI 가이드 질문',
    zh: '向AI导游提问'
  },
  'hero.ctaFood': {
    vi: 'Ăn uống & Vui chơi',
    en: 'Food & Leisure',
    fr: 'Gastronomie & Loisirs',
    ja: 'グルメ＆娯楽',
    ko: '음식 & 즐길거리',
    zh: '美食与休闲'
  },
  'hero.ctaMap': {
    vi: 'Bản đồ Văn hóa',
    en: 'Cultural Map',
    fr: 'Carte Culturelle',
    ja: '文化マップ',
    ko: '문화 지도',
    zh: '全景文化地图'
  },
  'hero.ctaProfile': {
    vi: 'Hồ sơ & Danh hiệu',
    en: 'Profile & Badges',
    fr: 'Profil & Titres',
    ja: 'プロフィール＆称号',
    ko: '프로필 및 칭호',
    zh: '个人档案与成就'
  },
  'hero.pillar1Title': {
    vi: 'Nhận diện Thị giác AI',
    en: 'AI Vision Recognition',
    fr: 'Vision IA Patrimoniale',
    ja: 'AI視覚・画像認識',
    ko: 'AI 시각 인식',
    zh: 'AI 视觉识别'
  },
  'hero.pillar1Desc': {
    vi: 'Nhận diện di tích, hiện vật, cổ phục, nhạc cụ và làng nghề qua ảnh chụp với độ chính xác cao.',
    en: 'Identify monuments, antiques, traditional costumes, instruments, and crafts with high precision.',
    fr: 'Identifiez monuments, antiquités, costumes, instruments et métiers traditionnels avec précision.',
    ja: '写真から寺院、古美術品、伝統衣装、楽器、工芸村を高精度で瞬時に認識・特定。',
    ko: '사진 한 장으로 유적지, 유물, 전통의상, 악기 및 전통 공예마을을 높은 정확도로 분석합니다.',
    zh: '通过照片高精度识别历史古迹、珍贵文物、传统服饰、民族乐器和手工艺村。'
  },
  'hero.pillar2Title': {
    vi: 'Kể chuyện Đa đối tượng',
    en: 'Multi-Audience Storytelling',
    fr: 'Récits Multi-Publics',
    ja: '多角的な物語解説',
    ko: '맞춤형 역사 이야기',
    zh: '多元受众故事讲述'
  },
  'hero.pillar2Desc': {
    vi: '5 phong cách kể chuyện từ thiếu nhi, học sinh đến khách quốc tế, phân biệt rõ lịch sử và huyền tích.',
    en: '5 storytelling styles from kids to international tourists, distinguishing history from myths.',
    fr: '5 styles narratifs adaptés aux enfants comme aux voyageurs internationaux, distinguant histoire et mythes.',
    ja: '子供向けから海外旅行者まで5つの語り口調を用意。史実と伝説を明確に区別して解説。',
    ko: '어린이부터 해외 관광객까지 5가지 맞춤 해설 스타일로 역사와 전설을 명확히 구분해 전달합니다.',
    zh: '提供5种针对不同群体的讲解风格，深入浅出，清晰辨析正史与民间传奇。'
  },
  'hero.pillar3Title': {
    vi: 'Ăn uống & Giải trí Xung quanh',
    en: 'Nearby Food & Entertainment',
    fr: 'Gastronomie & Loisirs Alentours',
    ja: '周辺グルメ＆レジャー',
    ko: '주변 음식 및 오락',
    zh: '周边特色美食与休闲'
  },
  'hero.pillar3Desc': {
    vi: 'Tích hợp Google Places, phân tích review trung thực và tìm địa điểm theo nhu cầu cá nhân.',
    en: 'Google Places integration with authentic review analysis to find tailored local spots.',
    fr: 'Intégration Google Places avec analyse d\'avis pour dénicher les meilleures adresses locales.',
    ja: 'Google Placesと連携し、リアルな口コミ分析でニーズに合った地元の名店を発見。',
    ko: 'Google Places 연동 및 진솔한 리뷰 분석으로 취향에 맞는 현지 명소와 맛집을 추천합니다.',
    zh: '深度整合 Google Places 与真实评价分析，按个人偏好精准推荐周边地道餐馆与景点。'
  },
  'hero.pillar4Title': {
    vi: 'Lịch trình Du lịch Thông minh',
    en: 'Smart Tour Itinerary',
    fr: 'Itinéraires Intelligents',
    ja: 'スマート観光プラン',
    ko: '스마트 여행 일정',
    zh: '智能深度游览行程'
  },
  'hero.pillar4Desc': {
    vi: 'Lên kế hoạch du lịch văn hóa theo thời gian và ngân sách, tối ưu hóa cung đường tham quan.',
    en: 'Plan cultural tours by time and budget with optimized travel routes.',
    fr: 'Planifiez vos visites culturelles selon votre temps et budget avec des trajets optimisés.',
    ja: '所要時間と予算に合わせて文化旅行をスマートに計画し、観光ルートを自動最適化。',
    ko: '소요 시간과 예산에 맞춰 문화 투어를 계획하고 최적의 관람 동선을 설계합니다.',
    zh: '根据游览时长和预算制定深度文化之旅，智能优化交通与参观路线。'
  },

  // Cultural Tools Dashboard
  'tools.badge': {
    vi: 'Định Hướng Khám Phá',
    en: 'Discovery Compass',
    fr: 'Boussole de Découverte',
    ja: '探訪ナビゲーション',
    ko: '탐험 길잡이',
    zh: '探索向导'
  },
  'tools.title': {
    vi: 'Bản Đồ Điều Hướng Tiện Ích Di Sản',
    en: 'Heritage Utilities & Navigation Dashboard',
    fr: 'Tableau de Bord des Services du Patrimoine',
    ja: '遺産ユーティリティ・ダッシュボード',
    ko: '문화유산 편의 도구 대시보드',
    zh: '文化遗产智能工具导航'
  },
  'tools.desc': {
    vi: 'Giao diện tổng quát giúp bạn đi đến bất cứ ứng dụng, bản đồ hay bộ công cụ văn hóa nào trong nháy mắt.',
    en: 'Central portal giving instant access to any heritage app, interactive map, or cultural utility.',
    fr: 'Portail central permettant d\'accéder en un instant à toutes les applications patrimoniales et cartes.',
    ja: 'あらゆる遺産アプリ、インタラクティブ地図、文化ツールに瞬時にアクセスできる総合ポータル。',
    ko: '모든 문화유산 도구, 지도 및 문화 콘텐츠로 한눈에 이동할 수 있는 통합 대시보드입니다.',
    zh: '全能文化门户，助您一键畅达各项遗产识别、全景地图与文化工具。'
  },
  'tools.map': {
    vi: 'Bản Đồ Di Sản',
    en: 'Heritage Map',
    fr: 'Carte du Patrimoine',
    ja: '遺産マップ',
    ko: '문화유산 지도',
    zh: '文化地图'
  },
  'tools.mapDesc': {
    vi: 'Định vị danh lam & dẫn đường',
    en: 'Locate monuments & directions',
    fr: 'Localiser & itinéraires',
    ja: '名勝位置特定＆ルート案内',
    ko: '명소 위치 및 길안내',
    zh: '定位名胜古迹与导航'
  },
  'tools.recognizer': {
    vi: 'Nhận Diện AI',
    en: 'AI Vision',
    fr: 'Vision IA',
    ja: 'AI画像認識',
    ko: 'AI 비전',
    zh: 'AI 识别'
  },
  'tools.recognizerDesc': {
    vi: 'Chụp ảnh phân tích di tích',
    en: 'Capture & analyze monuments',
    fr: 'Analyser monuments par photo',
    ja: '写真を撮影して史跡を分析',
    ko: '사진 촬영 후 유적지 분석',
    zh: '拍摄古迹即时分析'
  },
  'tools.storyteller': {
    vi: 'Kể Chuyện AI',
    en: 'AI Stories',
    fr: 'Récits IA',
    ja: 'AI物語音声',
    ko: 'AI 스토리',
    zh: 'AI 讲述'
  },
  'tools.storytellerDesc': {
    vi: 'Nghe kể chuyện văn hóa xứ sở',
    en: 'Listen to folklore & history',
    fr: 'Écouter légendes & histoire',
    ja: '各地の伝承と歴史を聴く',
    ko: '지역의 역사와 전설 청취',
    zh: '聆听风土文化与历史'
  },
  'tools.chat': {
    vi: 'HDV AI 3D',
    en: '3D AI Guide',
    fr: 'Guide IA 3D',
    ja: '3D AIガイド',
    ko: '3D AI 가이드',
    zh: '3D AI 导游'
  },
  'tools.chatDesc': {
    vi: 'Hỏi đáp tương tác cùng hướng dẫn viên',
    en: 'Interactive Q&A with tour guide',
    fr: 'Discussion interactive avec le guide',
    ja: 'ツアーガイドと対話・質問',
    ko: '가이드와 실시간 질문 답변',
    zh: '与虚拟导游互动问答'
  },
  'tools.food': {
    vi: 'Ăn Uống & Cafe',
    en: 'Food & Cafes',
    fr: 'Restaurants & Cafés',
    ja: 'グルメ＆カフェ',
    ko: '음식 & 카페',
    zh: '美食与咖啡'
  },
  'tools.foodDesc': {
    vi: 'Đặc sản ẩm thực & điểm vui chơi bản địa',
    en: 'Local culinary gems & attractions',
    fr: 'Spécialités culinaires locales',
    ja: '地元名物グルメ＆観光スポット',
    ko: '지역 특산물 및 핫플레이스',
    zh: '地道风味特产与休闲打卡'
  },
  'tools.itinerary': {
    vi: 'Lập Lịch Trình',
    en: 'Tour Planner',
    fr: 'Planificateur',
    ja: '日程プランナー',
    ko: '일정 플래너',
    zh: '规划行程'
  },
  'tools.itineraryDesc': {
    vi: 'Lên tour thông minh theo thời gian',
    en: 'Smart tours optimized by time',
    fr: 'Circuits intelligents optimisés',
    ja: '時間帯別のスマート旅行日程',
    ko: '시간대별 스마트 맞춤 투어',
    zh: '按时间智能规划旅游线路'
  },
  'tools.crafts': {
    vi: 'Làng Nghề Cổ',
    en: 'Craft Villages',
    fr: 'Villages d\'Artisans',
    ja: '伝統工芸村',
    ko: '전통 공예 마을',
    zh: '古老手艺村'
  },
  'tools.craftsDesc': {
    vi: 'Làng gốm, tranh đông hồ, nón lá',
    en: 'Pottery, folk prints, conical hats',
    fr: 'Poterie, estampes, chapeaux coniques',
    ja: '陶芸、版画、ノンラー帽子',
    ko: '도자기, 판화, 논라 모자',
    zh: '陶瓷、年画、斗笠工坊'
  },
  'tools.learning': {
    vi: 'Quiz & Thử Thách',
    en: 'Quiz Challenge',
    fr: 'Quiz & Défis',
    ja: 'クイズ＆挑戦',
    ko: '퀴즈 & 챌린지',
    zh: '问答挑战'
  },
  'tools.learningDesc': {
    vi: 'Trắc nghiệm văn hóa tích điểm',
    en: 'Earn XP with cultural trivia',
    fr: 'Gagnez des XP avec des quiz',
    ja: '文化クイズでXPを獲得',
    ko: '문화 퀴즈 풀고 XP 적립',
    zh: '参与文化问答赚取积分'
  },
  'tools.community': {
    vi: 'Cộng Đồng',
    en: 'Community',
    fr: 'Communauté',
    ja: 'コミュニティ',
    ko: '커뮤니티',
    zh: '互动社区'
  },
  'tools.communityDesc': {
    vi: 'Chia sẻ câu chuyện & đóng góp ảnh',
    en: 'Share memories & photos',
    fr: 'Partager récits et photos',
    ja: '物語や写真を共有・投稿',
    ko: '이야기와 사진 함께 공유',
    zh: '分享旅游故事与投递照片'
  },
  'tools.favorites': {
    vi: 'Yêu Thích',
    en: 'Favorites',
    fr: 'Favoris',
    ja: 'お気に入り',
    ko: '즐겨찾기',
    zh: '收藏夹'
  },
  'tools.favoritesDesc': {
    vi: 'Các địa danh & ẩm thực đã lưu',
    en: 'Saved places & delicacies',
    fr: 'Lieux et plats sauvegardés',
    ja: '保存した名勝とグルメ一覧',
    ko: '저장한 명소 및 맛집',
    zh: '已收藏的胜地与美食'
  },
  'tools.profile': {
    vi: 'Hồ Sơ & Danh Hiệu',
    en: 'Profile & Badges',
    fr: 'Profil & Titres',
    ja: 'プロフィール＆称号',
    ko: '프로필 & 칭호',
    zh: '个人档案与成就'
  },
  'tools.profileDesc': {
    vi: 'Thứ hạng & bộ sưu tập danh hiệu',
    en: 'Ranks & badge achievements',
    fr: 'Classements & collection de badges',
    ja: 'ランキングと称号コレクション',
    ko: '순위 및 획득한 배지 모음',
    zh: '文化等级与成就勋章'
  },
  'tools.heritage': {
    vi: 'Danh Sách Di Sản',
    en: 'Heritage Catalog',
    fr: 'Catalogue du Patrimoine',
    ja: '遺産アーカイブ',
    ko: '문화유산 목록',
    zh: '文化遗产目录'
  },
  'tools.heritageDesc': {
    vi: 'Tìm kiếm bộ lọc chuyên sâu',
    en: 'Deep search & filters',
    fr: 'Filtres et recherche avancée',
    ja: '高度な検索と絞り込みフィルター',
    ko: '상세 검색 및 카테고리 필터',
    zh: '高级搜索与分类筛选'
  },

  // Floating controls
  'floating.exploreLandmark': {
    vi: 'Khám phá di sản',
    en: 'Explore Heritage',
    fr: 'Explorer le site',
    ja: '名所を探索',
    ko: '명소 탐험',
    zh: '探索名胜'
  },
  'floating.peekBackground': {
    vi: 'Ngắm ảnh nền',
    en: 'View Wallpaper',
    fr: 'Voir le fond',
    ja: '壁紙を鑑賞',
    ko: '배경 감상',
    zh: '欣赏壁纸'
  },
  'floating.changeLandmark': {
    vi: 'Đổi cảnh sắc',
    en: 'Change View',
    fr: 'Changer la vue',
    ja: '景色を変更',
    ko: '배경 변경',
    zh: '更换名胜'
  },

  // Footer
  'footer.platformDesc': {
    vi: 'Nền tảng trí tuệ nhân tạo đồng hành khám phá, bảo tồn và lan tỏa giá trị di sản văn hóa, lịch sử và trải nghiệm du lịch Việt Nam.',
    en: 'AI-powered platform to discover, preserve, and promote Vietnamese cultural heritage, history, and authentic travel experiences.',
    fr: 'Plateforme propulsée par l\'IA pour découvrir, préserver et valoriser le patrimoine culturel et historique du Vietnam.',
    ja: 'ベトナムの文化遺産、歴史、そして本物の旅行体験を発見・保存・発信するAIプラットフォーム。',
    ko: '베트남의 문화유산과 역사, 생생한 여행 경험을 발견하고 보존하며 널리 알리는 AI 플랫폼입니다.',
    zh: '致力于探索、保护与传承越南璀璨历史遗产与真实旅游体验的人工智能综合平台。'
  },
  'footer.pride': {
    vi: 'Phát triển với sự trân trọng đối với 4.000 năm lịch sử hào hùng và nguồn tư liệu lịch sử dân tộc.',
    en: 'Crafted with reverence for 4,000 years of heroic history and national cultural treasures.',
    fr: 'Conçu avec respect pour 4 000 ans d\'histoire héroïque et de trésors culturels nationaux.',
    ja: '4000年の輝かしい歴史と民族の文化財への敬意を込めて開発。',
    ko: '4,000년의 자랑스러운 역사와 민족 문화유산에 대한 깊은 경의를 담아 개발되었습니다.',
    zh: '致敬四千年波澜壮阔的历史文明与璀璨的民族文献宝库。'
  },
  'footer.coreFeatures': {
    vi: 'Chức năng cốt lõi',
    en: 'Core Features',
    fr: 'Fonctionnalités Clés',
    ja: '主要機能',
    ko: '핵심 기능',
    zh: '核心功能'
  },
  'footer.fRecognizer': {
    vi: 'Nhận diện di sản bằng AI Vision',
    en: 'Heritage AI Vision Recognition',
    fr: 'Reconnaissance de patrimoine par IA',
    ja: 'AI視覚による遺産認識',
    ko: 'AI 비전 기반 문화유산 인식',
    zh: 'AI 视觉识别历史遗迹'
  },
  'footer.fStory': {
    vi: 'Nghe AI kể chuyện văn hóa',
    en: 'Listen to AI Cultural Stories',
    fr: 'Écouter les récits culturels de l\'IA',
    ja: 'AIによる文化ストーリーテリング',
    ko: 'AI 문화 역사 이야기 청취',
    zh: '倾听AI讲述文化典故'
  },
  'footer.fFood': {
    vi: 'Ăn uống & vui chơi gần di sản',
    en: 'Food & leisure near heritage',
    fr: 'Gastronomie & sorties à proximité',
    ja: '名所周辺のグルメ＆レジャー',
    ko: '문화유산 주변 먹거리 & 즐길거리',
    zh: '胜地周边地道风味与娱乐'
  },
  'footer.fItinerary': {
    vi: 'Lập lịch trình du lịch thông minh',
    en: 'Smart travel itinerary planner',
    fr: 'Planificateur de voyage intelligent',
    ja: 'スマート旅行計画の作成',
    ko: '스마트 맞춤 여행 일정 설계',
    zh: '智能定制深度游览线路'
  },
  'footer.accountDevice': {
    vi: 'Tài khoản & Thiết bị',
    en: 'Account & Device',
    fr: 'Compte & Appareil',
    ja: 'アカウント＆端末',
    ko: '계정 & 기기',
    zh: '账户与设备'
  },
  'footer.loginRegister': {
    vi: 'Đăng nhập / Đăng ký tài khoản',
    en: 'Sign In / Register Account',
    fr: 'Connexion / Inscription',
    ja: 'ログイン / 新規登録',
    ko: '로그인 / 회원가입',
    zh: '登录 / 注册新账户'
  },
  'footer.viewBadges': {
    vi: 'Xem điểm văn hóa & danh hiệu',
    en: 'View Cultural XP & Badges',
    fr: 'Voir les points XP & titres',
    ja: '文化XPと獲得称号の確認',
    ko: '문화 XP 및 획득 칭호 확인',
    zh: '查看文化积分与专属勋章'
  },
  'footer.activityHistory': {
    vi: 'Lịch sử thao tác thiết bị',
    en: 'Device Activity History',
    fr: 'Historique d\'activité',
    ja: '端末の操作履歴',
    ko: '기기 활동 기록',
    zh: '设备历史浏览与活动记录'
  },
  'footer.savedFavorites': {
    vi: 'Bộ sưu tập di sản đã lưu',
    en: 'Saved Heritage Collection',
    fr: 'Collection de patrimoine enregistrée',
    ja: 'お気に入り保存コレクション',
    ko: '저장한 문화유산 컬렉션',
    zh: '已收藏的文化遗产名录'
  },
  'footer.copyright': {
    vi: '© 2026 HỒN ĐẤT VIỆT. Tự hào Di sản Việt Nam.',
    en: '© 2026 HERITAGEAI. Pride of Vietnamese Heritage.',
    fr: '© 2026 HERITAGEAI. Fierté du Patrimoine Vietnamien.',
    ja: '© 2026 HERITAGEAI. ベトナムの遺産を誇りに。',
    ko: '© 2026 HERITAGEAI. 베트남 문화유산의 자부심.',
    zh: '© 2026 越南之魂 HERITAGEAI. 传承华夏与越裳文化之美。'
  },
  'footer.dataCredit': {
    vi: 'Dữ liệu đối chiếu: Đại Việt Sử Ký Toàn Thư, UNESCO & Google Places',
    en: 'Sources verified with Dai Viet Su Ky Toan Thu, UNESCO & Google Places',
    fr: 'Sources vérifiées avec Dai Viet Su Ky Toan Thu, UNESCO & Google Places',
    ja: '参照文献：大越史記全書、UNESCO世界遺産、Google Places',
    ko: '자료 검증: 대월사기전서, UNESCO 세계유산, Google Places',
    zh: '考据典籍：《大越史记全书》、联合国教科文组织(UNESCO)及 Google Places'
  },

  // Common buttons
  'btn.details': {
    vi: 'Chi tiết',
    en: 'Details',
    fr: 'Détails',
    ja: '詳細',
    ko: '상세보기',
    zh: '详情'
  },
  'btn.story': {
    vi: 'Kể chuyện',
    en: 'Story',
    fr: 'Histoire',
    ja: 'ストーリー',
    ko: '이야기',
    zh: '故事'
  },
  'btn.food': {
    vi: 'Ăn uống',
    en: 'Food',
    fr: 'Cuisine',
    ja: 'グルメ',
    ko: '음식',
    zh: '餐饮'
  },
  'btn.save': {
    vi: 'Lưu',
    en: 'Save',
    fr: 'Enregistrer',
    ja: '保存',
    ko: '저장',
    zh: '保存'
  },
  'btn.cancel': {
    vi: 'Hủy',
    en: 'Cancel',
    fr: 'Annuler',
    ja: 'キャンセル',
    ko: '취소',
    zh: '取消'
  }
};

class LanguageService {
  private currentLanguage: string = 'vi';
  private domObserver: MutationObserver | null = null;
  private isTranslating: boolean = false;

  constructor() {
    this.currentLanguage = this.loadLanguage();
    // Re-apply translation on startup if not Vietnamese
    if (typeof window !== 'undefined' && this.currentLanguage !== 'vi') {
      setTimeout(() => {
        this.applyFullPageTranslation(this.currentLanguage);
      }, 500);
    }
  }

  /**
   * Loads saved language from localStorage with fallback to Vietnamese
   */
  public loadLanguage(): string {
    if (typeof localStorage === 'undefined') return 'vi';
    try {
      const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (saved && SUPPORTED_LANGUAGES.some(l => l.code === saved)) {
        return saved;
      }
    } catch {
      // ignore storage access error
    }
    return 'vi';
  }

  /**
   * Get current language code (e.g., 'vi', 'en', 'fr', 'ja', 'ko', 'zh')
   */
  public getCurrentLanguage(): string {
    return this.currentLanguage;
  }

  /**
   * Get language info object for current or specific language code
   */
  public getLanguageInfo(code?: string): LanguageInfo {
    const targetCode = code || this.currentLanguage;
    const found = SUPPORTED_LANGUAGES.find(l => l.code === targetCode);
    return found || SUPPORTED_LANGUAGES[0];
  }

  /**
   * Set, persist application language, and trigger full-page DOM translation
   */
  public setLanguage(code: string): void {
    if (!SUPPORTED_LANGUAGES.some(l => l.code === code)) {
      console.warn(`Unsupported language code: ${code}`);
      return;
    }
    this.currentLanguage = code;
    if (typeof localStorage !== 'undefined') {
      try {
        localStorage.setItem(LANGUAGE_STORAGE_KEY, code);
      } catch (err) {
        console.warn('Could not save language to localStorage:', err);
      }
    }

    // Trigger full page web translation bridge
    this.applyFullPageTranslation(code);

    // Broadcast event across React components
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('hdv_language_changed', { 
        detail: { 
          language: code,
          info: this.getLanguageInfo(code)
        } 
      }));
    }
  }

  /**
   * Translates the entire webpage content (including database entries, paragraphs, and external text)
   * using Google Translate engine and cookie synchronization.
   */
  public applyFullPageTranslation(code: string): void {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    const langInfo = this.getLanguageInfo(code);
    const targetGoogleCode = langInfo.googleTranslateCode || code;

    // 1. Sync cookie for Google Translate
    try {
      const hostname = window.location.hostname;
      if (code === 'vi') {
        // Clear translation cookies to restore original Vietnamese
        document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${hostname};`;
        document.cookie = 'googtrans=/vi/vi; path=/;';
      } else {
        document.cookie = `googtrans=/vi/${targetGoogleCode}; path=/;`;
        document.cookie = `googtrans=/vi/${targetGoogleCode}; path=/; domain=${hostname};`;
      }
    } catch (e) {
      console.warn('Translate cookie setting:', e);
    }

    // 2. Trigger Google Translate dropdown element if rendered in DOM
    const triggerCombo = () => {
      const combo = document.querySelector('select.goog-te-combo') as HTMLSelectElement | null;
      if (combo) {
        if (combo.value !== targetGoogleCode) {
          combo.value = targetGoogleCode;
          combo.dispatchEvent(new Event('change', { bubbles: true }));
        }
        return true;
      }
      return false;
    };

    if (!triggerCombo()) {
      let retries = 0;
      const timer = setInterval(() => {
        retries++;
        if (triggerCombo() || retries >= 8) {
          clearInterval(timer);
        }
      }, 300);
    }

    // 3. Fast-path In-Memory DOM Text Translation for Instant Feedback
    this.translateDOM(code);
  }

  /**
   * Fast In-Memory DOM Text Translation engine
   * Translates key elements and phrases across the DOM immediately without waiting for network scripts
   */
  public translateDOM(code: string): void {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    if (this.domObserver) {
      this.domObserver.disconnect();
      this.domObserver = null;
    }

    const langInfo = this.getLanguageInfo(code);
    document.documentElement.lang = langInfo.bcp47;

    if (code === 'vi') {
      document.title = 'HERITAGEAI - Khám phá Di sản & Trải nghiệm Việt Nam';
      // Restore any text previously replaced
      const trackedElements = document.querySelectorAll('[data-orig-text]');
      trackedElements.forEach((el) => {
        const orig = el.getAttribute('data-orig-text');
        if (orig) {
          el.textContent = orig;
          el.removeAttribute('data-orig-text');
        }
      });
      return;
    }

    // Update document title for the selected language
    const titleMap: Record<string, string> = {
      en: 'HERITAGEAI - Explore Vietnam Cultural Heritage & AI Guide',
      fr: 'HERITAGEAI - Découvrez le Patrimoine du Vietnam & Guide IA',
      ja: 'HERITAGEAI - ベトナムの世界遺産探索とAIツアーガイド',
      ko: 'HERITAGEAI - 베트남 문화유산 탐험 및 AI 가이드',
      zh: 'HERITAGEAI - 越南文化遗产探索与AI虚拟导游'
    };
    if (titleMap[code]) {
      document.title = titleMap[code];
    }

    // Known common UI phrases to translate across all text nodes
    const phraseMap: Record<string, Record<string, string>> = {
      'Khám phá Di sản': { en: 'Explore Heritage', fr: 'Explorer le Patrimoine', ja: '遺産を探索', ko: '문화유산 탐험', zh: '探索文化遗产' },
      'Khám phá di sản': { en: 'Explore heritage', fr: 'Explorer le site', ja: '遺産を探索', ko: '문화유산 탐험', zh: '探索名胜' },
      'Nhận diện bằng AI': { en: 'AI Vision Recognition', fr: 'Reconnaissance IA', ja: 'AI画像認識', ko: 'AI 사진 인식', zh: 'AI 视觉识别' },
      'Nhận diện AI': { en: 'AI Vision', fr: 'Vision IA', ja: 'AI画像認識', ko: 'AI 비전', zh: 'AI 识别' },
      'Hỏi Trợ lý AI': { en: 'Ask AI Guide', fr: 'Demander au Guide IA', ja: 'AIガイドに質問', ko: 'AI 가이드에게 질문', zh: '向AI导游提问' },
      'Ăn uống & Vui chơi': { en: 'Food & Leisure', fr: 'Gastronomie & Loisirs', ja: 'グルメ＆レジャー', ko: '음식 & 즐길거리', zh: '美食与休闲' },
      'Bản đồ Văn hóa': { en: 'Cultural Map', fr: 'Carte Culturelle', ja: '文化マップ', ko: '문화 지도', zh: '全景文化地图' },
      'Bản đồ': { en: 'Map', fr: 'Carte', ja: '地図', ko: '지도', zh: '全景地图' },
      'Hồ sơ & Danh hiệu': { en: 'Profile & Badges', fr: 'Profil & Titres', ja: 'プロフィール＆称号', ko: '프로필 및 칭호', zh: '个人档案与成就' },
      'Kể chuyện': { en: 'Story', fr: 'Histoire', ja: 'ストーリー', ko: '이야기', zh: '讲故事' },
      'Kể chuyện AI': { en: 'AI Stories', fr: 'Récits IA', ja: 'AI物語音声', ko: 'AI 스토리', zh: 'AI 讲述' },
      'Lập lịch trình': { en: 'Tour Planner', fr: 'Planificateur', ja: '日程プランナー', ko: '일정 플래너', zh: '规划行程' },
      'Làng nghề & Nghệ thuật': { en: 'Crafts & Arts', fr: 'Artisanat & Arts', ja: '伝統工芸・芸能', ko: '전통공예 & 예술', zh: '传统手工艺与艺术' },
      'Quiz & Lịch sử': { en: 'Quiz & History', fr: 'Quiz & Histoire', ja: 'クイズ・歴史', ko: '퀴즈 & 역사', zh: '历史问答' },
      'Cộng đồng': { en: 'Community', fr: 'Communauté', ja: 'コミュニティ', ko: '커뮤니티', zh: '互动社区' },
      'Yêu thích': { en: 'Favorites', fr: 'Favoris', ja: 'お気に入り', ko: '즐겨찾기', zh: '收藏夹' },
      'Quản trị viên': { en: 'Admin', fr: 'Administration', ja: '管理者', ko: '관리자', zh: '管理后台' },
      'Ngắm ảnh nền': { en: 'View Wallpaper', fr: 'Voir le fond', ja: '壁紙を鑑賞', ko: '배경 감상', zh: '欣赏壁纸' },
      'Đổi cảnh sắc': { en: 'Change View', fr: 'Changer la vue', ja: '景色を変更', ko: '배경 변경', zh: '更换名胜' },
      'Di Sản Tiêu Biểu': { en: 'Featured Heritage', fr: 'Patrimoines Remarquables', ja: '代表的な世界遺産', ko: '대표 문화유산', zh: '代表性文化遗产' },
      'Báu Vật Ngàn Năm Của Dân Tộc': { en: 'Millennial Treasures of the Nation', fr: 'Trésors Millénaires de la Nation', ja: '千年の歴史を誇る国の宝', ko: '민족의 찬란한 천년 보물', zh: '千百年来流传的民族瑰宝' },
      'Xem tất cả trên bản đồ': { en: 'View all on map', fr: 'Voir tout sur la carte', ja: '地図ですべて見る', ko: '지도에서 전체 보기', zh: '在全景地图中查看' },
      'Định Hướng Khám Phá': { en: 'Discovery Compass', fr: 'Boussole de Découverte', ja: '探訪ナビゲーション', ko: '탐험 길잡이', zh: '探索向导' },
      'Bản Đồ Điều Hướng Tiện Ích Di Sản': { en: 'Heritage Utilities Navigation', fr: 'Tableau de Bord des Services', ja: '遺産ナビゲーションダッシュボード', ko: '문화유산 편의 도구 대시보드', zh: '文化遗产智能工具导航' },
      'Chi tiết': { en: 'Details', fr: 'Détails', ja: '詳細', ko: '상세보기', zh: '详情' },
      'Ăn uống': { en: 'Food', fr: 'Cuisine', ja: 'グルメ', ko: '음식', zh: '餐饮' },
      'Đăng nhập': { en: 'Sign In', fr: 'Connexion', ja: 'ログイン', ko: '로그인', zh: '登录' },
      'Đăng ký': { en: 'Sign Up', fr: 'Inscription', ja: '新規登録', ko: '회원가입', zh: '注册' },
      'Đăng xuất': { en: 'Sign Out', fr: 'Déconnexion', ja: 'ログアウト', ko: '로그아웃', zh: '退出登录' },
      'Đóng': { en: 'Close', fr: 'Fermer', ja: '閉じる', ko: '닫기', zh: '关闭' },
      'Thêm': { en: 'More', fr: 'Plus', ja: 'その他', ko: '더보기', zh: '更多' },
      'Áp dụng': { en: 'Apply', fr: 'Appliquer', ja: '適用', ko: '적용', zh: '应用' },
      'Hủy': { en: 'Cancel', fr: 'Annuler', ja: 'キャンセル', ko: '취소', zh: '取消' },
      'Tất cả': { en: 'All', fr: 'Tous', ja: 'すべて', ko: '전체', zh: '全部' },
      'Tìm kiếm': { en: 'Search', fr: 'Rechercher', ja: '検索', ko: '검색', zh: '搜索' },
      'Lưu': { en: 'Save', fr: 'Enregistrer', ja: '保存', ko: '저장', zh: '保存' },
      'Xác nhận': { en: 'Confirm', fr: 'Confirmer', ja: '確認', ko: '확인', zh: '确认' },
      'Nghe thử': { en: 'Sample audio', fr: 'Écouter', ja: 'サンプル試聴', ko: '미리듣기', zh: '试听' },
      'Dừng': { en: 'Stop', fr: 'Arrêter', ja: '停止', ko: '정지', zh: '停止' },
      'Gần Bạn Nhất (GPS)': { en: 'Nearest (GPS)', fr: 'Plus proche (GPS)', ja: '最寄り (GPS)', ko: '가장 가까운 곳 (GPS)', zh: '最近地点 (GPS)' },
      'Đổi Danh Thắng': { en: 'Change Landmark', fr: 'Changer de Site', ja: '名勝変更', ko: '명소 변경', zh: '更换名胜' },
      'Khám phá danh lam': { en: 'Explore Landmark', fr: 'Explorer le Site', ja: '名勝を探訪', ko: '명소 탐방', zh: '探索名胜' },
      'Tài Khoản Cá Nhân': { en: 'Personal Account', fr: 'Compte Personnel', ja: '個人アカウント', ko: '개인 계정', zh: '个人中心' },
      'Đăng Nhập / Đăng Ký': { en: 'Sign In / Register', fr: 'Connexion / Inscription', ja: 'ログイン／新規登録', ko: '로그인 / 회원가입', zh: '登录 / 注册' },
      'Quay lại Trang chủ': { en: 'Back to Home', fr: 'Retour Accueil', ja: 'ホームに戻る', ko: '홈으로 돌아가기', zh: '返回首页' },
      'Lịch sử hoạt động': { en: 'Activity History', fr: 'Historique', ja: '活動履歴', ko: '활동 내역', zh: '活动历史' },
      'Chế độ ngoại tuyến': { en: 'Offline Mode', fr: 'Mode Hors-ligne', ja: 'オフライン', ko: '오프라인', zh: '离线模式' },
      'Trang chủ': { en: 'Home', fr: 'Accueil', ja: 'ホーム', ko: '홈', zh: '首页' },
      'Di sản': { en: 'Heritage', fr: 'Patrimoine', ja: '世界遺産', ko: '문화유산', zh: '文化遗产' },
      'Di tích lịch sử': { en: 'Historical Monument', fr: 'Monument historique', ja: '歴史史跡', ko: '역사 유적', zh: '历史遗迹' },
      'Di sản văn hóa thế giới': { en: 'World Cultural Heritage', fr: 'Patrimoine mondial', ja: '世界文化遺産', ko: '세계문화유산', zh: '世界文化遗产' },
      'Di tích quốc gia đặc biệt': { en: 'Special National Monument', fr: 'Monument national spécial', ja: '特別国家史跡', ko: '특별국가유적', zh: '特别国家级古迹' },
      'Di sản thiên nhiên thế giới': { en: 'World Natural Heritage', fr: 'Patrimoine naturel mondial', ja: '世界自然遺産', ko: '세계자연유산', zh: '世界自然遗产' },
      'Văn hóa phi vật thể': { en: 'Intangible Cultural Heritage', fr: 'Patrimoine immatériel', ja: '無形文化遺産', ko: '무형문화유산', zh: '非物质文化遗产' },
      'Danh lam thắng cảnh': { en: 'Scenic Landscape', fr: 'Paysage pittoresque', ja: '名勝景勝地', ko: '명승지', zh: '名胜古迹' },
      'Làng nghề truyền thống': { en: 'Traditional Craft Village', fr: 'Village artisanal', ja: '伝統工芸村', ko: '전통 공예 마을', zh: '传统手工艺村' },
      'Ẩm thực truyền thống': { en: 'Traditional Cuisine', fr: 'Cuisine traditionnelle', ja: '郷土料理', ko: '전통 요리', zh: '传统美食' },
      'Miền Bắc': { en: 'Northern Vietnam', fr: 'Nord du Vietnam', ja: 'ベトナム北部', ko: '베트남 북부', zh: '越南北部' },
      'Miền Trung': { en: 'Central Vietnam', fr: 'Centre du Vietnam', ja: 'ベトナム中部', ko: '베트남 중부', zh: '越南中部' },
      'Miền Nam': { en: 'Southern Vietnam', fr: 'Sud du Vietnam', ja: 'ベトナム南部', ko: '베트남 남부', zh: '越南南部' }
    };

    const runPass = () => {
      if (this.isTranslating) return;
      this.isTranslating = true;
      try {
        const walker = document.createTreeWalker(
          document.body,
          NodeFilter.SHOW_TEXT,
          {
            acceptNode: (node) => {
              const parent = node.parentElement;
              if (!parent) return NodeFilter.FILTER_REJECT;
              const tag = parent.tagName.toLowerCase();
              if (['script', 'style', 'textarea', 'input', 'code', 'pre'].includes(tag)) {
                return NodeFilter.FILTER_REJECT;
              }
              if (parent.closest('#google_translate_element')) {
                return NodeFilter.FILTER_REJECT;
              }
              return NodeFilter.FILTER_ACCEPT;
            }
          }
        );

        let currentNode = walker.nextNode();
        while (currentNode) {
          const text = currentNode.nodeValue?.trim();
          if (text && phraseMap[text] && phraseMap[text][code]) {
            const parent = currentNode.parentElement;
            if (parent && !parent.hasAttribute('data-orig-text')) {
              parent.setAttribute('data-orig-text', text);
            }
            currentNode.nodeValue = currentNode.nodeValue!.replace(text, phraseMap[text][code]);
          }
          currentNode = walker.nextNode();
        }
      } catch (e) {
        console.warn('DOM translation pass:', e);
      } finally {
        this.isTranslating = false;
      }
    };

    // Immediate translation pass
    runPass();

    // Re-check shortly for asynchronous components and tab loads
    setTimeout(runPass, 150);
    setTimeout(runPass, 450);

    // Continuous translation observer for dynamic tabs & dialogs
    try {
      this.domObserver = new MutationObserver(() => {
        runPass();
      });
      this.domObserver.observe(document.body, {
        childList: true,
        subtree: true
      });
    } catch {
      // Ignore if observer not supported
    }
  }

  /**
   * Translate a given key
   */
  public t(key: string, lang?: string, fallback?: string): string {
    const activeLang = lang || this.currentLanguage;
    const entry = DICTIONARY[key];
    if (entry) {
      if (entry[activeLang]) return entry[activeLang];
      if (entry['vi']) return entry['vi'];
      if (entry['en']) return entry['en'];
    }
    return fallback !== undefined ? fallback : key;
  }

  /**
   * Plays a quick sample greeting in the target language using browser Web Speech API
   */
  public playSampleGreeting(code: string, onEnd?: () => void): boolean {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return false;
    }

    try {
      window.speechSynthesis.cancel();
      const langInfo = this.getLanguageInfo(code);
      const utterance = new SpeechSynthesisUtterance(langInfo.sampleGreeting);
      utterance.lang = langInfo.bcp47;
      utterance.rate = 0.95;
      utterance.pitch = 1.0;

      // Try selecting an optimal voice for the language
      const voices = window.speechSynthesis.getVoices();
      const matchingVoice = voices.find(v => v.lang.startsWith(langInfo.bcp47) || v.lang.startsWith(code));
      if (matchingVoice) {
        utterance.voice = matchingVoice;
      }

      if (onEnd) {
        utterance.onend = onEnd;
        utterance.onerror = onEnd;
      }

      window.speechSynthesis.speak(utterance);
      return true;
    } catch (err) {
      console.warn('Speech synthesis sample error:', err);
      onEnd?.();
      return false;
    }
  }

  /**
   * Stops any currently playing sample greeting
   */
  public stopSampleGreeting(): void {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }
}

export const languageService = new LanguageService();

export function t(key: string, fallback?: string): string {
  return languageService.t(key, undefined, fallback);
}
