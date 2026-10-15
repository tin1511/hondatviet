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
    name: 'Français',
    nativeName: 'Français',
    flag: '🇫🇷',
    bcp47: 'fr-FR',
    greeting: 'Bienvenue au Vietnam !',
    sampleGreeting: 'Bonjour et bienvenue ! Je suis votre guide du patrimoine par IA, prêt à vous faire découvrir la culture et l’histoire du Vietnam.',
    description: 'Interface et accompagnement de découverte en français.',
    aiVoiceAccent: 'Français standard',
    googleTranslateCode: 'fr'
  },
  {
    code: 'ja',
    name: '日本語',
    nativeName: '日本語',
    flag: '🇯🇵',
    bcp47: 'ja-JP',
    greeting: 'ベトナムへようこそ！',
    sampleGreeting: 'こんにちは。AI文化遺産ガイドです。ベトナムの文化と歴史をご案内します。',
    description: '日本語で文化遺産を探索できます。',
    aiVoiceAccent: '日本語',
    googleTranslateCode: 'ja'
  },
  {
    code: 'ko',
    name: '한국어',
    nativeName: '한국어',
    flag: '🇰🇷',
    bcp47: 'ko-KR',
    greeting: '베트남에 오신 것을 환영합니다!',
    sampleGreeting: '안녕하세요. 베트남의 문화와 역사를 안내하는 AI 문화유산 가이드입니다.',
    description: '한국어 문화유산 탐색 지원.',
    aiVoiceAccent: '한국어',
    googleTranslateCode: 'ko'
  },
  {
    code: 'zh',
    name: '简体中文',
    nativeName: '简体中文',
    flag: '🇨🇳',
    bcp47: 'zh-CN',
    greeting: '欢迎来到越南！',
    sampleGreeting: '您好！我是您的人工智能文化遗产导游，将带您探索越南的文化与历史。',
    description: '支持简体中文文化遗产探索。',
    aiVoiceAccent: '普通话',
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

  // Aliases for navigation
  'nav.recognize': {
    vi: 'Nhận diện AI',
    en: 'AI Vision',
    fr: 'Vision IA',
    ja: 'AI画像認識',
    ko: 'AI 비전 인식',
    zh: 'AI 视觉识别'
  },
  'nav.story': {
    vi: 'Kể chuyện AI',
    en: 'AI Stories',
    fr: 'Récits IA',
    ja: 'AIストーリー',
    ko: 'AI 이야기',
    zh: 'AI 故事讲述'
  },
  'nav.quiz': {
    vi: 'Quiz & Lịch sử',
    en: 'Quiz & History',
    fr: 'Quiz & Histoire',
    ja: 'クイズ・歴史',
    ko: '퀴즈 & 역사',
    zh: '历史问答'
  },

  // Home Page S-Shaped Map Section
  'home.mapSectionBadge': {
    vi: 'Bản Đồ Địa Lý & Du Lịch Tương Tác Trực Tiếp',
    en: 'Interactive Geographical & Travel Map',
    fr: 'Carte Géographique & Touristique Interactive',
    ja: 'インタラクティブ地理・観光マップ',
    ko: '인터랙티브 지리 및 관광 지도',
    zh: '全景交互式地理与文旅地图'
  },
  'home.mapSectionTitle': {
    vi: 'Khám Phá Dải Đất Hình Chữ S Việt Nam',
    en: 'Explore the S-Shaped Land of Vietnam',
    fr: 'Explorez la Terre en Forme de S du Vietnam',
    ja: 'ベトナムのS字型の国土を探訪',
    ko: '베트남 S자형 국토 탐험',
    zh: '探索越南S形壮丽山河'
  },
  'home.mapSectionDesc': {
    vi: 'Chạm hoặc nhấn vào bất kỳ tỉnh thành nào trên bản đồ để phóng to và xem các di sản thực tế.',
    en: 'Touch or click any province on the map to zoom in and discover real heritages.',
    fr: 'Touchez ou cliquez sur une province pour zoomer et découvrir ses patrimoines réels.',
    ja: '地図上の各省をタップしてズームし、実在の世界遺産や史跡を発見。',
    ko: '지도의 각 성/시를 터치하여 확대하고 실제 문화유산을 확인하세요.',
    zh: '点击地图上的任意省市即可放大浏览当地真实的文化名胜。'
  },
  'home.mapSectionFullscreen': {
    vi: 'Mở Bản Đồ Toàn Màn Hình',
    en: 'Open Fullscreen Map',
    fr: 'Ouvrir la Carte Plein Écran',
    ja: '全画面マップを開く',
    ko: '전체 화면 지도 열기',
    zh: '开启全屏地图'
  },

  // Heritage Detail Modal
  'detail.title': {
    vi: 'Chi Tiết Di Sản Văn Hóa',
    en: 'Cultural Heritage Details',
    fr: 'Détails du Patrimoine Culturel',
    ja: '文化遺産の詳細',
    ko: '문화유산 상세 정보',
    zh: '文化遗产详细介绍'
  },
  'detail.significance': {
    vi: 'Ý nghĩa & Giá trị di sản',
    en: 'Significance & Cultural Value',
    fr: 'Signification & Valeur Culturelle',
    ja: '文化的意義と価値',
    ko: '문화적 의의 및 가치',
    zh: '历史文化价值与意义'
  },
  'detail.history': {
    vi: 'Niên đại & Lịch sử hình thành',
    en: 'Chronology & Historical Origins',
    fr: 'Chronologie & Origines Historiques',
    ja: '年代と歴史的起源',
    ko: '연대 및 역사적 기원',
    zh: '历史年代与形成渊源'
  },
  'detail.practical': {
    vi: 'Thông tin tham quan & Lời khuyên',
    en: 'Visitor Information & Travel Tips',
    fr: 'Informations Pratiques & Conseils',
    ja: '拝観・見学案内とアドバイス',
    ko: '관람 정보 및 여행 팁',
    zh: '参观指南与游玩建议'
  },
  'detail.openHours': {
    vi: 'Giờ mở cửa',
    en: 'Opening Hours',
    fr: 'Horaires d\'ouverture',
    ja: '開館時間',
    ko: '운영 시간',
    zh: '开放时间'
  },
  'detail.ticketPrice': {
    vi: 'Giá vé tham quan',
    en: 'Admission Fee',
    fr: 'Tarif d\'entrée',
    ja: '拝観料・入場料',
    ko: '입장료',
    zh: '门票价格'
  },
  'detail.free': {
    vi: 'Miễn phí vé vào cổng',
    en: 'Free Admission',
    fr: 'Entrée Gratuite',
    ja: '無料拝観',
    ko: '무료 입장',
    zh: '免费参观'
  },
  'detail.nearbyFood': {
    vi: 'Ẩm thực xung quanh',
    en: 'Nearby Delicacies',
    fr: 'Gastronomie aux alentours',
    ja: '周辺グルメ',
    ko: '주변 먹거리',
    zh: '周边特色美食'
  },
  'detail.listenStory': {
    vi: 'Nghe kể chuyện',
    en: 'Listen to Story',
    fr: 'Écouter le récit',
    ja: '物語を聴く',
    ko: '이야기 듣기',
    zh: '聆听历史故事'
  },
  'detail.askAI': {
    vi: 'Hỏi Hướng Dẫn Viên AI',
    en: 'Ask AI Tour Guide',
    fr: 'Demander au Guide IA',
    ja: 'AIガイドに質問',
    ko: 'AI 가이드에게 질문',
    zh: '咨询AI虚拟导游'
  },
  'detail.audioNarration': {
    vi: 'Thuyết minh tự động (AI)',
    en: 'AI Audio Narration',
    fr: 'Narration Audio IA',
    ja: 'AI自動音声解説',
    ko: 'AI 자동 오디오 해설',
    zh: 'AI 语音讲解'
  },
  'detail.save': {
    vi: 'Lưu vào yêu thích',
    en: 'Save to Favorites',
    fr: 'Enregistrer aux favoris',
    ja: 'お気に入りに保存',
    ko: '즐겨찾기에 저장',
    zh: '收藏此地标'
  },
  'detail.saved': {
    vi: 'Đã lưu yêu thích',
    en: 'Saved in Favorites',
    fr: 'Enregistré dans les favoris',
    ja: 'お気に入り登録済み',
    ko: '저장 완료',
    zh: '已收藏'
  },
  'detail.map': {
    vi: 'Xem vị trí bản đồ',
    en: 'View on Map',
    fr: 'Voir sur la carte',
    ja: '地図で位置を確認',
    ko: '지도에서 위치 보기',
    zh: '在地图中查看'
  },
  'detail.distance': {
    vi: 'Khoảng cách từ bạn',
    en: 'Distance from you',
    fr: 'Distance depuis vous',
    ja: '現在地からの距離',
    ko: '현재 위치에서의 거리',
    zh: '距离您的当前位置'
  },
  'detail.historicalPhoto': {
    vi: 'Ảnh tư liệu lịch sử',
    en: 'Historical Archive Photo',
    fr: 'Photo d\'Archives Historiques',
    ja: '歴史資料写真',
    ko: '역사 사료 사진',
    zh: '历史档案老照片'
  },
  'detail.currentPhoto': {
    vi: 'Ảnh hiện tại',
    en: 'Current Photo',
    fr: 'Photo actuelle',
    ja: '現在の写真',
    ko: '현재 사진',
    zh: '当代实景照片'
  },
  'detail.share': {
    vi: 'Chia sẻ di sản',
    en: 'Share Heritage',
    fr: 'Partager le patrimoine',
    ja: '遺産を共有',
    ko: '문화유산 공유',
    zh: '分享此文化遗产'
  },
  'detail.copied': {
    vi: 'Đã sao chép liên kết!',
    en: 'Link copied to clipboard!',
    fr: 'Lien copié dans le presse-papiers !',
    ja: 'リンクをクリップボードにコピーしました！',
    ko: '링크가 클립보드에 복사되었습니다!',
    zh: '链接已复制到剪贴板！'
  },

  // Mobile Bottom Nav
  'mobile.home': {
    vi: 'Trang chủ',
    en: 'Home',
    fr: 'Accueil',
    ja: 'ホーム',
    ko: '홈',
    zh: '首页'
  },
  'mobile.recognizer': {
    vi: 'Nhận diện',
    en: 'Vision',
    fr: 'Vision',
    ja: '認識',
    ko: '인식',
    zh: '识别'
  },
  'mobile.storyteller': {
    vi: 'Kể chuyện',
    en: 'Stories',
    fr: 'Récits',
    ja: '物語',
    ko: '이야기',
    zh: '讲述'
  },
  'mobile.chat': {
    vi: 'HDV AI',
    en: 'AI Guide',
    fr: 'Guide IA',
    ja: 'AI案内',
    ko: 'AI가이드',
    zh: 'AI导游'
  },
  'mobile.map': {
    vi: 'Bản đồ',
    en: 'Map',
    fr: 'Carte',
    ja: '地図',
    ko: '지도',
    zh: '地图'
  },
  'mobile.more': {
    vi: 'Thêm',
    en: 'More',
    fr: 'Plus',
    ja: 'その他',
    ko: '더보기',
    zh: '更多'
  },
  'mobile.close': {
    vi: 'Đóng menu',
    en: 'Close Menu',
    fr: 'Fermer',
    ja: '閉じる',
    ko: '닫기',
    zh: '关闭'
  },

  // Floating Controls
  'floating.showUI': {
    vi: 'Hiện giao diện',
    en: 'Show Interface',
    fr: 'Afficher',
    ja: 'UIを表示',
    ko: '화면 표시',
    zh: '显示界面'
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

/**
 * Direct phrase translations dictionary for auto-translating Vietnamese text in any component
 */
export const PHRASE_TRANSLATIONS: Record<string, Record<string, string>> = {
  // Navigation & General
  'Trang chủ': { en: 'Home', fr: 'Accueil', ja: 'ホーム', ko: '홈', zh: '首页' },
  'Di sản': { en: 'Heritage', fr: 'Patrimoine', ja: '世界遺産', ko: '문화유산', zh: '文化遗产' },
  'Nhận diện AI': { en: 'AI Vision', fr: 'Vision IA', ja: 'AI画像認識', ko: 'AI 비전', zh: 'AI 识别' },
  'Nhận diện': { en: 'Vision', fr: 'Vision', ja: '認識', ko: '인식', zh: '识别' },
  'Kể chuyện AI': { en: 'AI Stories', fr: 'Récits IA', ja: 'AI物語音声', ko: 'AI 스토리', zh: 'AI 讲述' },
  'Kể chuyện': { en: 'Story', fr: 'Histoire', ja: 'ストーリー', ko: '이야기', zh: '讲故事' },
  'Hướng Dẫn Viên AI': { en: 'AI Tour Guide', fr: 'Guide IA', ja: 'AIツアーガイド', ko: 'AI 가이드', zh: 'AI 虚拟导游' },
  'HDV AI': { en: 'AI Guide', fr: 'Guide IA', ja: 'AI案内', ko: 'AI가이드', zh: 'AI导游' },
  'Bản đồ': { en: 'Map', fr: 'Carte', ja: '地図', ko: '지도', zh: '全景地图' },
  'Bản đồ Việt Nam': { en: 'Vietnam Map', fr: 'Carte du Vietnam', ja: 'ベトナム地図', ko: '베트남 지도', zh: '越南地图' },
  'Ăn uống & Vui chơi': { en: 'Food & Leisure', fr: 'Gastronomie & Loisirs', ja: 'グルメ＆レジャー', ko: '음식 & 즐길거리', zh: '美食与休闲' },
  'Ăn uống': { en: 'Food', fr: 'Cuisine', ja: 'グルメ', ko: '음식', zh: '餐饮' },
  'Lịch trình': { en: 'Itinerary', fr: 'Itinéraire', ja: '旅行日程', ko: '여행 일정', zh: '行程规划' },
  'Lập lịch trình': { en: 'Tour Planner', fr: 'Planificateur', ja: '日程プランナー', ko: '일정 플래너', zh: '规划行程' },
  'Lập Lịch Trình': { en: 'Tour Planner', fr: 'Planificateur', ja: '日程プランナー', ko: '일정 플래너', zh: '规划行程' },
  'Làng nghề & Nghệ thuật': { en: 'Crafts & Arts', fr: 'Artisanat & Arts', ja: '伝統工芸・芸能', ko: '전통공예 & 예술', zh: '传统手工艺与艺术' },
  'Quiz & Lịch sử': { en: 'Quiz & History', fr: 'Quiz & Histoire', ja: 'クイズ・歴史', ko: '퀴즈 & 역사', zh: '历史问答' },
  'Hồ sơ & Danh hiệu': { en: 'Profile & Badges', fr: 'Profil & Titres', ja: 'プロフィール＆称号', ko: '프로필 및 칭호', zh: '个人档案与成就' },
  'Cộng đồng': { en: 'Community', fr: 'Communauté', ja: 'コミュニティ', ko: '커뮤니티', zh: '互动社区' },
  'Quản trị viên': { en: 'Admin', fr: 'Administration', ja: '管理者', ko: '관리자', zh: '管理后台' },
  'Yêu thích': { en: 'Favorites', fr: 'Favoris', ja: 'お気に入り', ko: '즐겨찾기', zh: '收藏夹' },
  'Đề Xuất Mới': { en: 'Submit New', fr: 'Proposer', ja: '遺産提案', ko: '신규 제안', zh: '推荐遗址' },
  'Đề Xuất Di Sản / Địa Điểm Mới': { en: 'Submit Heritage / New Place', fr: 'Proposer un site', ja: '新名勝・遺産提案', ko: '새 명소 제안', zh: '推荐新遗址/地点' },
  'Ngoại tuyến': { en: 'Offline', fr: 'Hors ligne', ja: 'オフライン', ko: '오프라인', zh: '离线模式' },
  'Đăng nhập': { en: 'Sign In', fr: 'Connexion', ja: 'ログイン', ko: '로그인', zh: '登录' },
  'Đăng Nhập': { en: 'Sign In', fr: 'Connexion', ja: 'ログイン', ko: '로그인', zh: '登录' },
  'Đăng ký': { en: 'Sign Up', fr: 'Inscription', ja: '新規登録', ko: '회원가입', zh: '注册' },
  'Đăng Ký': { en: 'Sign Up', fr: 'Inscription', ja: '新規登録', ko: '회원가입', zh: '注册' },
  'Đăng xuất': { en: 'Sign Out', fr: 'Déconnexion', ja: 'ログアウト', ko: '로그아웃', zh: '退出登录' },
  'Chi tiết': { en: 'Details', fr: 'Détails', ja: '詳細', ko: '상세보기', zh: '详情' },
  'Lưu': { en: 'Save', fr: 'Enregistrer', ja: '保存', ko: '저장', zh: '保存' },
  'Hủy': { en: 'Cancel', fr: 'Annuler', ja: 'キャンセル', ko: '취소', zh: '取消' },
  'Đóng': { en: 'Close', fr: 'Fermer', ja: '閉じる', ko: '닫기', zh: '关闭' },
  'Thêm': { en: 'More', fr: 'Plus', ja: 'その他', ko: '더보기', zh: '更多' },
  'Xóa': { en: 'Clear', fr: 'Effacer', ja: 'クリア', ko: '삭제', zh: '清除' },
  'Khám phá di sản này': { en: 'Explore this heritage', fr: 'Explorer ce site', ja: 'この遺産を探索', ko: '이 유산 탐험', zh: '探索此遗址' },
  'Khám phá di sản': { en: 'Explore Heritage', fr: 'Explorer le site', ja: '遺産を探索', ko: '문화유산 탐험', zh: '探索名胜' },
  'Ngắm ảnh nền': { en: 'View Wallpaper', fr: 'Voir le fond', ja: '壁紙を鑑賞', ko: '배경 감상', zh: '欣赏壁纸' },
  'Đổi cảnh sắc': { en: 'Change View', fr: 'Changer la vue', ja: '景色を変更', ko: '배경 변경', zh: '更换名胜' },
  'Đổi danh thắng khác': { en: 'Change Landmark', fr: 'Changer de site', ja: '名勝を変更', ko: '명소 변경', zh: '更换名胜' },
  'Lấy GPS của tôi': { en: 'Get My GPS', fr: 'Localiser mon GPS', ja: '現在地を取得', ko: '내 GPS 위치', zh: '获取当前位置' },
  'Đang dò GPS...': { en: 'Locating GPS...', fr: 'Localisation GPS...', ja: 'GPS測位中...', ko: 'GPS 탐색 중...', zh: '正在定位...' },
  'Gần Bạn Nhất (GPS)': { en: 'Nearest You (GPS)', fr: 'Le Plus Proche (GPS)', ja: '最寄りの名所 (GPS)', ko: '가장 가까운 곳 (GPS)', zh: '离你最近 (GPS)' },
  'Hiện giao diện': { en: 'Show Interface', fr: 'Afficher', ja: 'UIを表示', ko: '화면 표시', zh: '显示界面' },
  'Quay về Trang chủ': { en: 'Back to Home', fr: 'Retour Accueil', ja: 'ホームに戻る', ko: '홈으로 돌아가기', zh: '返回首页' },
  'Quay lại Trang chủ': { en: 'Back to Home', fr: 'Retour Accueil', ja: 'ホームに戻る', ko: '홈으로 돌아가기', zh: '返回首页' },
  'Ngắm trọn vẹn bức ảnh nền danh thắng': { en: 'View Full Wallpaper', fr: 'Voir le fond d\'écran complet', ja: '壁紙をフル鑑賞', ko: '배경화면 전체 감상', zh: '全屏欣赏背景壁纸' },
  'Hiểu di sản. Khám phá Việt Nam.': { en: 'Understand Heritage. Discover Vietnam.', fr: 'Comprendre le Patrimoine. Explorer le Vietnam.', ja: '遺産を知り、ベトナムを巡る。', ko: '역사를 이해하고, 베트남을 탐험하세요.', zh: '感悟文化遗产，探索大美越南。' },

  // Home Page Sections
  'Di Sản Tiêu Biểu': { en: 'Featured Heritages', fr: 'Patrimoines Remarquables', ja: '代表的な世界遺産', ko: '대표 문화유산', zh: '代表性文化遗产' },
  'Báu Vật Ngàn Năm Của Dân Tộc': { en: 'Millennial Treasures of the Nation', fr: 'Trésors Millénaires de la Nation', ja: '千年の歴史を誇る国の宝', ko: '민족의 찬란한 천년 보물', zh: '千百年来流传的民族瑰宝' },
  'Xem tất cả trên bản đồ': { en: 'View all on map', fr: 'Voir tout sur la carte', ja: '地図ですべて見る', ko: '지도에서 전체 보기', zh: '在全景地图中查看' },
  'Bản Đồ Địa Lý & Du Lịch Tương Tác Trực Tiếp': { en: 'Interactive Geographical & Travel Map', fr: 'Carte Géographique & Touristique Interactive', ja: 'インタラクティブ地理・観光マップ', ko: '인터랙티브 지리 및 관광 지도', zh: '全景交互式地理与文旅地图' },
  'Khám Phá Dải Đất Hình Chữ S Việt Nam': { en: 'Explore the S-Shaped Land of Vietnam', fr: 'Explorez la Terre en Forme de S du Vietnam', ja: 'ベトナムのS字型の国土を探訪', ko: '베트남 S자형 국토 탐험', zh: '探索越南S形壮丽山河' },
  'Chạm hoặc nhấn vào bất kỳ tỉnh thành nào trên bản đồ để phóng to và xem các di sản thực tế.': {
    en: 'Touch or click any province on the map to zoom in and discover real heritages.',
    fr: 'Touchez ou cliquez sur une province pour zoomer et découvrir ses patrimoines réels.',
    ja: '地図上の各省をタップしてズームし、実在の世界遺産や史跡を発見。',
    ko: '지도의 각 성/시를 터치하여 확대하고 실제 문화유산을 확인하세요.',
    zh: '点击地图上的任意省市即可放大浏览当地真实的文化名胜。'
  },
  'Mở Bản Đồ Toàn Màn Hình': { en: 'Open Fullscreen Map', fr: 'Ouvrir la Carte Plein Écran', ja: '全画面マップを開く', ko: '전체 화면 지도 열기', zh: '开启全屏地图' },
  'Hệ Thống Lưu Trữ Cá Nhân & Điểm Văn Hóa': { en: 'Personal Archive & Cultural XP System', fr: 'Système d\'Archives Personnelles & Points XP', ja: '個人アーカイブ＆文化ポイントシステム', ko: '개인 보관함 & 문화 포인트 시스템', zh: '个人档案与文化积分系统' },
  'Đồng Hành & Lưu Trữ Mọi Hành Trình Di Sản Của Bạn': { en: 'Accompanying & Preserving All Your Heritage Journeys', fr: 'Accompagner & Préserver Tous Vos Voyages Culturels', ja: 'あなたの歴史遺産の旅を記録・共有', ko: '당신의 모든 문화유산 여정을 함께 기록합니다', zh: '陪伴并记录您的每一段文化遗产之旅' },
  'Mỗi thao tác nhận diện ảnh chụp bằng AI, nghe kể chuyện lịch sử, hoàn thành câu đố văn hóa hay lập kế hoạch du lịch đều được tự động ghi lại trong hồ sơ cá nhân với hệ thống điểm thưởng XP và danh hiệu di sản.': {
    en: 'Every AI image recognition, historical story listened to, cultural quiz completed, and trip plan made is automatically recorded with XP rewards and heritage badges.',
    fr: 'Chaque reconnaissance d\'image IA, histoire écoutée, quiz réussi ou itinéraire planifié est enregistré avec des points XP et des titres patrimoniaux.',
    ja: 'AI画像認識、歴史ストーリーの再生、クイズの挑戦、旅行日程の作成のすべてが個人プロファイルに記録され、XPやバッジが付与されます。',
    ko: 'AI 사진 인식, 역사 이야기 청취, 문화 퀴즈 풀이 및 여행 계획 등 모든 활동이 XP 포인트와 문화유산 칭호로 기록됩니다.',
    zh: '每一次AI视觉识别、倾听历史故事、完成文化问答或规划行程，都将自动记录在个人档案中，并累积XP积分与专属成就。'
  },
  'Xem Bảng Danh Hiệu & Hồ Sơ': { en: 'View Badges & Profile', fr: 'Voir les Titres & Profil', ja: '称号＆プロフィールを見る', ko: '칭호 및 프로필 보기', zh: '查看成就与档案' },
  'Tài Khoản Cá Nhân': { en: 'Personal Account', fr: 'Compte Personnel', ja: 'マイアカウント', ko: '개인 계정', zh: '个人账户' },
  'Đăng Nhập / Đăng Ký': { en: 'Sign In / Register', fr: 'Connexion / Inscription', ja: 'ログイン／新規登録', ko: '로그인 / 회원가입', zh: '登录 / 注册' },
  'AI Nhận Diện Thị Giác': { en: 'AI Visual Recognition', fr: 'Vision IA Patrimoniale', ja: 'AI視覚・画像認識', ko: 'AI 시각 인식', zh: 'AI 视觉识别' },
  'Chụp ảnh di tích, đồ cổ, trang phục cổ hay món ăn để biết ngay tên gọi, niên đại và ý nghĩa lịch sử.': {
    en: 'Take photos of monuments, antiques, historic costumes or food to discover names, periods and cultural origins.',
    fr: 'Prenez en photo monuments, antiquités, costumes ou plats pour connaître leur histoire et signification.',
    ja: '写真から寺院、古美術品、伝統衣装、郷土料理を瞬時に特定し、時代背景を解説。',
    ko: '유적지, 골동품, 전통 의상 또는 음식을 촬영하여 이름, 연대 및 역사적 의미를 즉시 확인하세요.',
    zh: '拍摄古迹、文物古董、传统服饰或特色菜肴，即时获知其名称、历史年代与文化底蕴。'
  },
  'AI Kể Chuyện Đa Đối Tượng': { en: 'Multi-Audience AI Storyteller', fr: 'Récits IA Personnalisés', ja: 'AI歴史ストーリーテリング', ko: '맞춤형 AI 이야기꾼', zh: 'AI 多群体故事讲述' },
  'Lắng nghe giọng kể truyền cảm phù hợp với trẻ em, học sinh, nhà nghiên cứu hay du khách quốc tế.': {
    en: 'Listen to expressive storytelling crafted for children, students, scholars, or international tourists.',
    fr: 'Écoutez une narration captivante adaptée aux enfants, étudiants, chercheurs ou voyageurs du monde.',
    ja: '子供向け、学生向け、研究者向け、外国人観光客向けに最適化された感情豊かな音声解説。',
    ko: '어린이, 학생, 연구자 및 해외 관광객에 맞춘 감동적인 내레이션을 들어보세요.',
    zh: '倾听针对儿童、青少年、历史学者或国际游客量身定制的生动语音导览。'
  },
  'Lập Lịch Trình Tự Động': { en: 'Automated Itinerary Planner', fr: 'Planificateur d\'Itinéraire', ja: 'スマート旅行計画', ko: '스마트 일정 플래너', zh: '智能行程规划' },
  'Lên kế hoạch du lịch văn hóa theo thời gian, ngân sách, tích hợp Google Places lân cận.': {
    en: 'Generate customized cultural tour plans by time and budget with nearby Google Places.',
    fr: 'Organisez des circuits culturels selon votre temps et budget avec les lieux Google Places à proximité.',
    ja: '時間や予算に合わせて最適な文化ツアーを自動編成し、周辺の人気スポットも提案。',
    ko: '시간과 예산에 맞추어 맞춤형 문화 여행을 계획하고 주변 장소를 추천받으세요.',
    zh: '根据游玩时间与预算，自动生成深度文化游览路线，并推荐周边精选地标。'
  },

  // Footer & Miscellaneous
  'Chức năng cốt lõi': { en: 'Core Features', fr: 'Fonctionnalités Clés', ja: '主要機能', ko: '핵심 기능', zh: '核心功能' },
  'Nhận diện di sản bằng AI Vision': { en: 'Heritage AI Vision Recognition', fr: 'Reconnaissance de patrimoine par IA', ja: 'AI視覚による遺産認識', ko: 'AI 비전 기반 문화유산 인식', zh: 'AI 视觉识别历史遗迹' },
  'Nghe AI kể chuyện văn hóa': { en: 'Listen to AI Cultural Stories', fr: 'Écouter les récits culturels de l\'IA', ja: 'AIによる文化ストーリーテリング', ko: 'AI 문화 역사 이야기 청취', zh: '倾听AI讲述文化典故' },
  'Ăn uống & vui chơi gần di sản': { en: 'Food & leisure near heritage', fr: 'Gastronomie & sorties à proximité', ja: '名所周辺のグルメ＆レジャー', ko: '문화유산 주변 먹거리 & 즐길거리', zh: '胜地周边地道风味与娱乐' },
  'Lập lịch trình du lịch thông minh': { en: 'Smart travel itinerary planner', fr: 'Planificateur de voyage intelligent', ja: 'スマート旅行計画の作成', ko: '스마트 맞춤 여행 일정 설계', zh: '智能定制深度游览线路' },
  'Tài khoản & Thiết bị': { en: 'Account & Device', fr: 'Compte & Appareil', ja: 'アカウント＆端末', ko: '계정 & 기기', zh: '账户与设备' },
  'Đăng nhập / Đăng ký tài khoản': { en: 'Sign In / Register Account', fr: 'Connexion / Inscription', ja: 'ログイン / 新規登録', ko: '로그인 / 회원가입', zh: '登录 / 注册新账户' },
  'Xem điểm văn hóa & danh hiệu': { en: 'View Cultural XP & Badges', fr: 'Voir les points XP & titres', ja: '文化XPと獲得称号の確認', ko: '문화 XP 및 획득 칭호 확인', zh: '查看文化积分与专属勋章' },
  'Lịch sử thao tác thiết bị': { en: 'Device Activity History', fr: 'Historique d\'activité', ja: '端末の操作履歴', ko: '기기 활동 기록', zh: '设备历史浏览与活动记录' },
  'Bộ sưu tập di sản đã lưu': { en: 'Saved Heritage Collection', fr: 'Collection de patrimoine enregistrée', ja: 'お気に入り保存コレクション', ko: '저장한 문화유산 컬렉션', zh: '已收藏的文化遗产名录' },
  '© 2026 HỒN ĐẤT VIỆT. Tự hào Di sản Việt Nam.': {
    en: '© 2026 HERITAGEAI. Pride of Vietnamese Heritage.',
    fr: '© 2026 HERITAGEAI. Fierté du Patrimoine Vietnamien.',
    ja: '© 2026 HERITAGEAI. ベトナムの遺産を誇りに。',
    ko: '© 2026 HERITAGEAI. 베트남 문화유산의 자부심.',
    zh: '© 2026 越南之魂 HERITAGEAI. 传承华夏与越裳文化之美。'
  },
  'Dữ liệu đối chiếu: Đại Việt Sử Ký Toàn Thư, UNESCO & Google Places': {
    en: 'Sources verified with Dai Viet Su Ky Toan Thu, UNESCO & Google Places',
    fr: 'Sources vérifiées avec Dai Viet Su Ky Toan Thu, UNESCO & Google Places',
    ja: '参照文献：大越史記全書、UNESCO世界遺産、Google Places',
    ko: '자료 검증: 대월사기전서, UNESCO 세계유산, Google Places',
    zh: '考据典籍：《大越史记全书》、联合国教科文组织(UNESCO)及 Google Places'
  },
  'Phát triển với sự trân trọng đối với 4.000 năm lịch sử hào hùng và nguồn tư liệu lịch sử dân tộc.': {
    en: 'Crafted with reverence for 4,000 years of heroic history and national cultural treasures.',
    fr: 'Conçu avec respect pour 4 000 ans d\'histoire héroïque et de trésors culturels nationaux.',
    ja: '4000年の輝かしい歴史と民族の文化財への敬意を込めて開発。',
    ko: '4,000년의 자랑스러운 역사와 민족 문화유산에 대한 깊은 경의를 담아 개발되었습니다.',
    zh: '致敬四千年波澜壮阔的历史文明与璀璨的民族文献宝库。'
  },
  'Nền tảng trí tuệ nhân tạo đồng hành khám phá, bảo tồn và lan tỏa giá trị di sản văn hóa, lịch sử và trải nghiệm du lịch Việt Nam.': {
    en: 'AI-powered platform to discover, preserve, and promote Vietnamese cultural heritage, history, and authentic travel experiences.',
    fr: 'Plateforme propulsée par l\'IA pour découvrir, préserver et valoriser le patrimoine culturel et historique du Vietnam.',
    ja: 'ベトナムの文化遺産、歴史、そして本物の旅行体験を発見・保存・発信するAIプラットフォーム。',
    ko: '베트남의 문화유산과 역사, 생생한 여행 경험을 발견하고 보존하며 널리 알리는 AI 플랫폼입니다.',
    zh: '致力于探索、保护与传承越南璀璨历史遗产与真实旅游体验的人工智能综合平台。'
  },
  'Ống Kính AI Di Sản': {
    en: 'Heritage AI Vision Lens',
    fr: 'Objectif Vision IA',
    ja: 'AI遺産ビジョンレンズ',
    ko: '헤리티지 AI 비전 렌즈',
    zh: '文化遗产 AI 视觉镜'
  },
  'Chụp ảnh trực tiếp từ thiết bị': {
    en: 'Capture photo directly from device',
    fr: 'Capturer depuis l\'appareil',
    ja: 'デバイスから直接撮影',
    ko: '기기에서 직접 촬영',
    zh: '直接从设备拍摄'
  },
  'Tải ảnh từ thư viện': {
    en: 'Upload image from library',
    fr: 'Importer depuis la bibliothèque',
    ja: 'ライブラリから画像をアップロード',
    ko: '라이브러리에서 이미지 업로드',
    zh: '从相册上传图片'
  },
  'Chụp trực tiếp': {
    en: 'Live Capture',
    fr: 'Capture en direct',
    ja: 'ライブ撮影',
    ko: '라이브 촬영',
    zh: '实时拍摄'
  },
  'Tải tệp': {
    en: 'Upload File',
    fr: 'Importer Fichier',
    ja: 'ファイルアップロード',
    ko: '파일 업로드',
    zh: '上传文件'
  },
  'Ảnh vừa chụp từ Camera': {
    en: 'Captured from Camera',
    fr: 'Capturé par la Caméra',
    ja: 'カメラで撮影した写真',
    ko: '카메라로 촬영한 사진',
    zh: '相机拍摄照片'
  },
  'Ảnh mẫu thử nghiệm': {
    en: 'Preset Test Image',
    fr: 'Image Test Prédéfinie',
    ja: 'プリセットテスト画像',
    ko: '프리셋 테스트 이미지',
    zh: '预设测试图片'
  },
  'Ảnh từ thiết bị': {
    en: 'Uploaded from Device',
    fr: 'Importé de l\'appareil',
    ja: 'デバイスからアップロード',
    ko: '기기에서 업로드',
    zh: '自设备上传'
  },
  'Chụp lại': {
    en: 'Retake',
    fr: 'Reprendre',
    ja: '再撮影',
    ko: '다시 촬영',
    zh: '重拍'
  },
  'LIVE • Căn góc di sản': {
    en: 'LIVE • Align Heritage',
    fr: 'DIRECT • Centrer le site',
    ja: 'LIVE • 遺産を合わせる',
    ko: 'LIVE • 문화유산 맞추기',
    zh: 'LIVE • 对准遗迹'
  },
  'Hướng camera vào di tích, hoa văn, hiện vật hoặc cổ phục': {
    en: 'Point camera at monuments, patterns, artifacts or historic costumes',
    fr: 'Pointez la caméra vers des monuments, motifs ou costumes',
    ja: 'カメラを記念碑、模様、古美術品、伝統衣装に向けてください',
    ko: '카메라를 기념비, 문양, 유물 또는 전통 의상에 맞추세요',
    zh: '将相机对准古迹、纹样、文物或传统服饰'
  },
  'Kích hoạt Máy Ảnh Chụp Trực Tiếp': {
    en: 'Activate Live Camera',
    fr: 'Activer la Caméra en Direct',
    ja: 'ライブカメラを起動',
    ko: '라이브 카메라 활성화',
    zh: '激活实时相机'
  },
  'Thử lại Camera': {
    en: 'Retry Camera',
    fr: 'Réessayer la Caméra',
    ja: 'カメラ再試行',
    ko: 'カメラ 다시 시도',
    zh: '重试相机'
  },
  'Mở Camera máy': {
    en: 'Open Device Camera',
    fr: 'Ouvrir l\'Appareil Photo',
    ja: '端末のカメラを開く',
    ko: '기기 카메라 열기',
    zh: '打开手机相机'
  },
  'Camera máy': {
    en: 'Device Cam',
    fr: 'Caméra Appareil',
    ja: '端末カメラ',
    ko: '기기 카메라',
    zh: '手机相机'
  },
  'Chụp & Nhận Diện Ngay': {
    en: 'Capture & Recognize Now',
    fr: 'Capturer & Reconnaître',
    ja: '撮影して今すぐ認識',
    ko: '촬영 및 즉시 인식',
    zh: '拍摄并立即识别'
  },
  'Đổi chiều': {
    en: 'Flip',
    fr: 'Inverser',
    ja: '切り替え',
    ko: '전환',
    zh: '翻转'
  },
  'Tự động nhận diện AI ngay khi bấm chụp (Tối ưu 1 chạm)': {
    en: 'Auto-recognize AI immediately on shutter (1-tap optimized)',
    fr: 'Reconnaissance auto immédiate (optimisé 1-clic)',
    ja: 'シャッター時に自動AI認識（ワンタップ最適化）',
    ko: '촬영 시 즉시 자동 AI 인식 (원탭 최적화)',
    zh: '按下快门时自动AI识别（一键优化）'
  },
  'Ghi chú bổ sung cho AI (tùy chọn):': {
    en: 'Additional note for AI (optional):',
    fr: 'Note additionnelle pour l\'IA (optionnel) :',
    ja: 'AIへの追加メモ（任意）：',
    ko: 'AI를 위한 추가 메모 (선택사항):',
    zh: '给AI的补充说明（可选）：'
  },
  'Ví dụ: Hiện vật này tôi thấy tại chùa ở Bắc Ninh...': {
    en: 'Example: I found this artifact at a pagoda in Bac Ninh...',
    fr: 'Exemple : J\'ai trouvé cet objet dans une pagode...',
    ja: '例：バクニン省の寺院でこの遺物を見つけました...',
    ko: '예: 박닌의 사원에서 이 유물을 보았습니다...',
    zh: '例如：我在北宁省的一座寺庙里看到了这件文物...'
  },
  'AI đang phân tích thị giác di sản...': {
    en: 'AI is analyzing heritage vision...',
    fr: 'L\'IA analyse la vision du patrimoine...',
    ja: 'AIが遺産のビジュアルを分析中...',
    ko: 'AI가 문화유산 시각 정보를 분석 중...',
    zh: 'AI正在分析遗产视觉图像...'
  },
  'Bắt đầu Nhận diện Di sản AI': {
    en: 'Start AI Heritage Recognition',
    fr: 'Démarrer la Reconnaissance IA',
    ja: 'AI遺産認識を開始',
    ko: 'AI 문화유산 인식 시작',
    zh: '开始AI遗产识别'
  },
  'Phân tích lại hình ảnh này': {
    en: 'Re-analyze this image',
    fr: 'Réanalyser cette image',
    ja: 'この画像を再分析',
    ko: '이 이미지 다시 분석',
    zh: '重新分析此图像'
  },
  'Đang đối chiếu dữ liệu di sản Việt Nam': {
    en: 'Matching Vietnamese heritage database',
    fr: 'Correspondance avec la base du patrimoine vietnamien',
    ja: 'ベトナム文化遺産データベースと照合中',
    ko: '베트남 문화유산 데이터베이스 대조 중',
    zh: '正在比对越南文化遗产数据库'
  },
  'Mô hình Gemini 3.8 Flash Vision đang phân tích đặc trưng kiến trúc, hoa văn, niên đại và độ tin cậy lịch sử...': {
    en: 'Gemini 3.8 Flash Vision is analyzing architectural features, patterns, periods and historical reliability...',
    fr: 'Gemini 3.8 Flash Vision analyse l\'architecture, les motifs et la fiabilité historique...',
    ja: 'Gemini 3.8 Flash Visionが建築の特徴、模様、時代、歴史的信頼性を分析しています...',
    ko: 'Gemini 3.8 Flash Vision이 건축적 특징, 문양, 연대 및 역사적 신뢰성을 분석 중입니다...',
    zh: 'Gemini 3.8 Flash Vision 正在分析建筑特征、纹样、历史年代与考证可信度...'
  },
  'Chưa có kết quả nhận diện': {
    en: 'No recognition result yet',
    fr: 'Aucun résultat de reconnaissance',
    ja: '認識結果はまだありません',
    ko: '아직 인식 결과가 없습니다',
    zh: '暂无识别结果'
  },
  'Chỉ cần hướng camera vào di tích, hoa văn, hiện vật hoặc cổ phục': {
    en: 'Simply point your camera at a monument, pattern, artifact or historic costume',
    fr: 'Pointez simplement la caméra vers un monument, un motif ou un artefact',
    ja: '記念碑、模様、古美術品、伝統衣装にカメラを向けてください',
    ko: '기념비, 문양, 유물 또는 전통 의상에 카메라를 향하세요',
    zh: '只需将相机对准古迹、纹样、文物或传统服饰'
  },
  '[THÔNG TIN ĐÃ XÁC MINH]': {
    en: '[VERIFIED INFORMATION]',
    fr: '[INFORMATION VÉRIFIÉE]',
    ja: '[検証済み情報]',
    ko: '[검증된 정보]',
    zh: '[已核实信息]'
  },
  '[TRUYỀN THUYẾT / DÂN GIAN]': {
    en: '[FOLK LEGEND / MYTH]',
    fr: '[LÉGENDE / MYTHE]',
    ja: '[民俗伝承・伝説]',
    ko: '[전설 / 민속]',
    zh: '[民间传说]'
  },
  '[THÔNG TIN CHƯA XÁC MINH]': {
    en: '[UNVERIFIED INFORMATION]',
    fr: '[INFORMATION NON VÉRIFIÉE]',
    ja: '[未検証の情報]',
    ko: '[미검증 정보]',
    zh: '[未核实信息]'
  },
  'Lịch sử & Nguồn gốc:': {
    en: 'History & Origin:',
    fr: 'Histoire & Origine :',
    ja: '歴史と起源：',
    ko: '역사 및 기원:',
    zh: '历史与起源：'
  },
  'Ý nghĩa Văn hóa & Kiến trúc:': {
    en: 'Cultural & Architectural Significance:',
    fr: 'Signification Culturelle & Architecturale :',
    ja: '文化・建築的意義：',
    ko: '문화 및 건축적 의의:',
    zh: '文化与建筑意义：'
  },
  'Thông tin thú vị ít người biết:': {
    en: 'Little-known interesting facts:',
    fr: 'Faits insolites peu connus :',
    ja: 'あまり知られていない興味深い事実：',
    ko: '잘 알려지지 않은 흥미로운 사실:',
    zh: '鲜为人知的趣闻轶事：'
  },
  'Câu hỏi gợi ý để tìm hiểu sâu hơn:': {
    en: 'Suggested questions to explore deeper:',
    fr: 'Questions suggérées pour explorer plus en profondeur :',
    ja: 'さらに深く探求するためのおすすめの質問：',
    ko: '더 깊이 탐구하기 위한 추천 질문:',
    zh: '深入探索的建议提问：'
  },
  'Nghe AI kể chuyện': {
    en: 'Listen AI Story',
    fr: 'Écouter l\'histoire IA',
    ja: 'AIストーリーを聴く',
    ko: 'AI 스토리 듣기',
    zh: '聆听AI故事'
  },
  'Ăn uống & Vui chơi gần đây': {
    en: 'Nearby Food & Leisure',
    fr: 'Gastronomie & Loisirs Proches',
    ja: '周辺のグルメ＆レジャー',
    ko: '주변 음식 & 즐길거리',
    zh: '周边美食与休闲'
  },
  'Xem vị trí trên bản đồ': {
    en: 'View location on map',
    fr: 'Voir l\'emplacement sur la carte',
    ja: '地図で場所を見る',
    ko: '지도에서 위치 보기',
    zh: '在地图上查看位置'
  },
  'Admin: Tùy chỉnh nội dung & ảnh mẫu nhận diện': {
    en: 'Admin: Customize content & recognition sample images',
    fr: 'Admin : Personnaliser le contenu & les images d\'échantillon',
    ja: '管理者：コンテンツと認識サンプル画像をカスタマイズ',
    ko: '관리자: 콘텐츠 및 인식 샘플 이미지 사용자 지정',
    zh: '管理员：自定义内容与识别样本图片'
  },
  'Đang ở Chế độ Nhận Diện AI Ngoại Tuyến (Offline Visual Engine)': {
    en: 'Offline Visual AI Recognition Mode Active',
    fr: 'Mode de reconnaissance visuelle IA hors ligne actif',
    ja: 'オフラインビジュアルAI認識モード有効',
    ko: '오프라인 비주얼 AI 인식 모드 활성화됨',
    zh: '离线视觉AI识别模式已激活'
  },

  // Categories and Regions
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
  'Miền Nam': { en: 'Southern Vietnam', fr: 'Sud du Vietnam', ja: 'ベトナム南部', ko: '베트남 남부', zh: '越南南部' },
  'Tất cả': { en: 'All', fr: 'Tous', ja: 'すべて', ko: '전체', zh: '全部' },

  // Provinces & Cities of Vietnam
  'Hà Nội': { en: 'Hanoi', fr: 'Hanoï', ja: 'ハノイ', ko: '하노이', zh: '河内' },
  'TP. Hồ Chí Minh': { en: 'Ho Chi Minh City', fr: 'Hô Chi Minh-Ville', ja: 'ホーチミン市', ko: '호치민시', zh: '胡志明市' },
  'Hồ Chí Minh': { en: 'Ho Chi Minh City', fr: 'Hô Chi Minh-Ville', ja: 'ホーチミン市', ko: '호치민시', zh: '胡志明市' },
  'Thừa Thiên Huế': { en: 'Thua Thien Hue', fr: 'Thua Thien Hue', ja: 'トゥアティエン・フエ', ko: '트어티엔후에', zh: '承天顺化' },
  'Huế': { en: 'Hue', fr: 'Hué', ja: 'フエ', ko: '후에', zh: '顺化' },
  'Đà Nẵng': { en: 'Da Nang', fr: 'Da Nang', ja: 'ダナン', ko: '다낭', zh: '岘港' },
  'Quảng Nam': { en: 'Quang Nam', fr: 'Quang Nam', ja: 'クアンナム', ko: '꽝남', zh: '广南' },
  'Quảng Ninh': { en: 'Quang Ninh', fr: 'Quang Ninh', ja: 'クアンニン', ko: '꽝닌', zh: '广宁' },
  'Ninh Bình': { en: 'Ninh Binh', fr: 'Ninh Binh', ja: 'ニンビン', ko: '닌빈', zh: '宁平' },
  'Khánh Hòa': { en: 'Khanh Hoa', fr: 'Khanh Hoa', ja: 'カインホア', ko: '카인호아', zh: '庆和' },
  'Lâm Đồng': { en: 'Lam Dong', fr: 'Lam Dong', ja: 'ラムドン', ko: '람동', zh: '林同' },
  'Bắc Ninh': { en: 'Bac Ninh', fr: 'Bac Ninh', ja: 'バクニン', ko: '박닌', zh: '北宁' },
  'Bắc Giang': { en: 'Bac Giang', fr: 'Bac Giang', ja: 'バクザン', ko: '박장', zh: '北江' },
  'Cần Thơ': { en: 'Can Tho', fr: 'Can Tho', ja: 'カントー', ko: '깐토', zh: '芹苴' },
  'Hải Phòng': { en: 'Hai Phong', fr: 'Haiphong', ja: 'ハイフォン', ko: '하이퐁', zh: '海防' },
  'Cao Bằng': { en: 'Cao Bang', fr: 'Cao Bang', ja: 'カオバン', ko: '까오방', zh: '高平' },
  'Hà Giang': { en: 'Ha Giang', fr: 'Ha Giang', ja: 'ハザン', ko: '하장', zh: '河江' },
  'Lào Cai': { en: 'Lao Cai', fr: 'Lao Cai', ja: 'ラオカイ', ko: '라오까이', zh: '老街' },
  'Điện Biên': { en: 'Dien Bien', fr: 'Dien Bien', ja: 'ディエンビエン', ko: '디엔비엔', zh: '奠边' },
  'Kiên Giang': { en: 'Kien Giang', fr: 'Kien Giang', ja: 'キエンザン', ko: '끼엔장', zh: '坚江' },
  'Tây Ninh': { en: 'Tay Ninh', fr: 'Tay Ninh', ja: 'タイニン', ko: '떠이닌', zh: '西宁' },
  'Bình Thuận': { en: 'Binh Thuan', fr: 'Binh Thuan', ja: 'ビントゥアン', ko: '빈투언', zh: '平顺' },
  'Bà Rịa - Vũng Tàu': { en: 'Ba Ria - Vung Tau', fr: 'Ba Ria - Vung Tau', ja: 'バリア＝ブンタウ', ko: '바리어붕따우', zh: '巴地头顿' },
  'Đồng Nai': { en: 'Dong Nai', fr: 'Dong Nai', ja: 'ドンナイ', ko: '동나이', zh: '同奈' },
  'Bình Dương': { en: 'Binh Duong', fr: 'Binh Duong', ja: 'ビンズオン', ko: '빈즈엉', zh: '平阳' },
  'Nghệ An': { en: 'Nghe An', fr: 'Nghe An', ja: 'ゲアン', ko: '응에안', zh: '乂安' },
  'Thanh Hóa': { en: 'Thanh Hoa', fr: 'Thanh Hoa', ja: 'タインホア', ko: '타인호아', zh: '清化' },
  'Hà Tĩnh': { en: 'Ha Tinh', fr: 'Ha Tinh', ja: 'ハティン', ko: '하띤', zh: '河静' },
  'Quảng Bình': { en: 'Quang Binh', fr: 'Quang Binh', ja: 'クアンビン', ko: '꽝빈', zh: '广平' },
  'Quảng Trị': { en: 'Quang Tri', fr: 'Quang Tri', ja: 'クアンチ', ko: '꽝찌', zh: '广治' },
  'Bình Định': { en: 'Binh Dinh', fr: 'Binh Dinh', ja: 'ビンディン', ko: '빈딘', zh: '平定' },
  'Phú Yên': { en: 'Phu Yen', fr: 'Phu Yen', ja: 'フーイエン', ko: '푸옌', zh: '富安' },
  'Gia Lai': { en: 'Gia Lai', fr: 'Gia Lai', ja: 'ザライ', ko: '잘라이', zh: '嘉莱' },
  'Đắk Lắk': { en: 'Dak Lak', fr: 'Dak Lak', ja: 'ダクラク', ko: '닥락', zh: '多乐' },
  'An Giang': { en: 'An Giang', fr: 'An Giang', ja: 'アンザン', ko: '안장', zh: '安江' },
  'Cà Mau': { en: 'Ca Mau', fr: 'Ca Mau', ja: 'カマウ', ko: '까마우', zh: '金瓯' },
  'Bến Tre': { en: 'Ben Tre', fr: 'Ben Tre', ja: 'ベンチェ', ko: '벤째', zh: '槟椥' },

  // Iconic Landmarks & Cultural Relics
  'Văn Miếu - Quốc Tử Giám & Hồ Gươm': { en: 'Temple of Literature & Sword Lake', fr: 'Temple de la Littérature & Lac de l\'Épée', ja: '文廟・ホアンキエム湖', ko: '문묘 & 호안끼엠 호수', zh: '文庙·国子监与还剑湖' },
  'Văn Miếu - Quốc Tử Giám': { en: 'Temple of Literature', fr: 'Temple de la Littérature', ja: '文廟・国子監', ko: '문묘 - 국자감', zh: '文庙·国子监' },
  'Hồ Gươm': { en: 'Sword Lake (Hoan Kiem Lake)', fr: 'Lac de l\'Épée Restituée', ja: 'ホアンキエム湖', ko: '호안끼엠 호수', zh: '还剑湖' },
  'Đền Ngọc Sơn & Cầu Thê Húc': { en: 'Ngoc Son Temple & The Huc Bridge', fr: 'Temple Ngoc Son & Pont The Huc', ja: '玉山祠・棲旭橋', ko: '응옥선 사당 & 테훅 다리', zh: '玉山祠与栖旭桥' },
  'Đền Ngọc Sơn': { en: 'Ngoc Son Temple', fr: 'Temple Ngoc Son', ja: '玉山祠', ko: '응옥선 사당', zh: '玉山祠' },
  'Cầu Thê Húc': { en: 'The Huc Bridge', fr: 'Pont The Huc', ja: '棲旭橋', ko: '테훅 다리', zh: '栖旭桥' },
  'Hoàng thành Thăng Long': { en: 'Imperial Citadel of Thang Long', fr: 'Cité impériale de Thang Long', ja: 'タンロン遺跡', ko: '탕롱 황성', zh: '升龙皇城' },
  'Chùa Một Cột': { en: 'One Pillar Pagoda', fr: 'Pagode au Pilier Unique', ja: '一柱寺', ko: '일주사', zh: '一柱寺' },
  'Quần thể di tích Cố đô Huế': { en: 'Complex of Hue Monuments', fr: 'Ensemble de monuments de Hué', ja: 'フエの建造物群', ko: '후에 기념물 복합 지구', zh: '顺化古迹建筑群' },
  'Đại Nội Cung Đình Huế & Sông Hương': { en: 'Hue Imperial Citadel & Perfume River', fr: 'Cité Impériale de Hué & Rivière des Parfums', ja: 'フエ王宮・香江', ko: '후에 황궁 & 흐엉강', zh: '顺化皇城与香江' },
  'Đại Nội Huế': { en: 'Hue Imperial Citadel', fr: 'Cité Impériale de Hué', ja: 'フエ王宮', ko: '후에 황궁', zh: '顺化皇城' },
  'Vịnh Hạ Long': { en: 'Ha Long Bay', fr: 'Baie d\'Ha Long', ja: 'ハロン湾', ko: '하롱베이', zh: '下龙湾' },
  'Phố cổ Hội An': { en: 'Hoi An Ancient Town', fr: 'Vieille ville de Hoi An', ja: '古都ホイアン', ko: '호이안 고대 도시', zh: '会安古镇' },
  'Quần thể danh thắng Tràng An': { en: 'Trang An Scenic Landscape Complex', fr: 'Complexe paysager de Trang An', ja: 'チャンアンの景観複合体', ko: '짱안 경관 단지', zh: '长安名胜群' },
  'Thánh địa Mỹ Sơn': { en: 'My Son Sanctuary', fr: 'Sanctuaire de My Son', ja: 'ミーソン聖域', ko: '미선 성지', zh: '美山圣地' },
  'Chùa Hương': { en: 'Perfume Pagoda', fr: 'Pagode des Parfums', ja: '香寺', ko: '흐엉 사원', zh: '香寺' },
  'Địa đạo Củ Chi': { en: 'Cu Chi Tunnels', fr: 'Tunnels de Cu Chi', ja: 'クチの地下道', ko: '구찌 터널', zh: '古芝地道' },
  'Dinh Độc Lập & Bến Bạch Đằng': { en: 'Independence Palace & Bach Dang Wharf', fr: 'Palais de la Réunification & Quai Bach Dang', ja: '統一会堂・バクダン埠頭', ko: '독립궁 & 바익당 부두', zh: '独立宫与白藤码头' },
  'Dinh Độc Lập': { en: 'Independence Palace', fr: 'Palais de la Réunification', ja: '統一会堂', ko: '독립궁', zh: '独立宫' },
  'Chợ Bến Thành': { en: 'Ben Thanh Market', fr: 'Marché Ben Thanh', ja: 'ベンタイン市場', ko: '벤탄 시장', zh: '滨城市场' },
  'Núi Bà Đen': { en: 'Ba Den Mountain', fr: 'Montagne Ba Den', ja: 'バーデン山', ko: '바덴 산', zh: '黑婆山' },
  'Thác Bản Giốc': { en: 'Ban Gioc Waterfall', fr: 'Chutes de Ban Gioc', ja: 'バンゾック滝', ko: '반족 폭포', zh: '板约瀑布' },
  'Hồ Ba Bể': { en: 'Ba Be Lake', fr: 'Lac Ba Be', ja: 'バーベー湖', ko: '바베 호수', zh: '巴卑湖' },
  'Động Phong Nha': { en: 'Phong Nha Cave', fr: 'Grotte de Phong Nha', ja: 'フォンニャ洞窟', ko: '퐁냐 동굴', zh: '风牙洞' },
  'Gốm Bát Tràng': { en: 'Bat Trang Pottery', fr: 'Poterie de Bat Trang', ja: 'バッチャン焼き', ko: '밧짱 도자기', zh: '钵场陶瓷' },
  'Tranh Đông Hồ': { en: 'Dong Ho Folk Painting', fr: 'Estampes de Dong Ho', ja: 'ドンホー版画', ko: '동호 민화', zh: '东湖民画' },
  'Lụa Vạn Phúc': { en: 'Van Phuc Silk', fr: 'Soie de Van Phuc', ja: 'ヴァンフックシルク', ko: '반푹 비단', zh: '万福丝绸' },
  'Nón lá Tây Hồ': { en: 'Tay Ho Conical Hat', fr: 'Chapeau conique de Tay Ho', ja: 'ノンラー（西湖）', ko: '논라 (떠이호)', zh: '西湖斗笠' },
  'Nhã nhạc Cung đình Huế': { en: 'Hue Court Music (Nha Nhac)', fr: 'Nha Nhac, musique de cour', ja: 'フエの雅楽', ko: '후에 궁중음악', zh: '顺化宫廷雅乐' },
  'Dân ca Quan họ Bắc Ninh': { en: 'Bac Ninh Quan Ho Folk Songs', fr: 'Chants Quan Ho de Bac Ninh', ja: 'バクニン民謡クアンホ', ko: '박닌 꽌호 민요', zh: '北宁官贺民歌' },
  'Đờn ca tài tử Nam Bộ': { en: 'Don Ca Tai Tu Southern Folk Music', fr: 'Musique Don Ca Tai Tu', ja: 'ドンカータイトゥー', ko: '돈까따이뜨', zh: '南部才子弹唱' },
  'Tháp Bà Ponagar': { en: 'Po Nagar Cham Towers', fr: 'Tours de Po Nagar', ja: 'ポーナガル塔', ko: '포나가르 탑', zh: '婆那加占婆塔' },
  'Mũi Né - Tháp Poshanư': { en: 'Mui Ne - Poshanu Cham Towers', fr: 'Mui Ne - Tours Poshanu', ja: 'ムイネー・ポシャヌ塔', ko: '무이네 - 포샤누 탑', zh: '美奈 - 波沙努占婆塔' },
  'Dinh Cậu - Phú Quốc': { en: 'Dinh Cau - Phu Quoc', fr: 'Dinh Cau - Phu Quoc', ja: 'ディンカウ（フーコック）', ko: '딘꺼우 - 푸꾸옥', zh: '舅府 (富国岛)' },

  // Landmark Taglines
  'Thủ đô ngàn năm văn hiến, lắng đọng hào khí Thăng Long': {
    en: 'Thousand-year-old capital of culture, embodying the spirit of Thang Long',
    fr: 'Capitale millénaire de culture, berceau de l\'esprit de Thang Long',
    ja: '千年の歴史と文化が息づく首都・タンロンの誇り',
    ko: '천년의 역사를 품은 수도, 탕롱의 유구한 기개',
    zh: '千年文献古都，沉淀升龙豪气'
  },
  'Đô thị phương Nam phồn hoa, giao thoa truyền thống và hiện đại': {
    en: 'Vibrant southern metropolis, blending tradition and modernity',
    fr: 'Métropole dynamique du Sud, carrefour de tradition et modernité',
    ja: '伝統と現代が交差する活気あふれる南部のメガシティ',
    ko: '전통과 현대가 공존하는 남부의 번화한 대도시',
    zh: '繁华南方都会，交融传统与现代'
  },
  'Cố đô vàng son triều Nguyễn - Di sản Văn hóa Thế giới': {
    en: 'Golden capital of the Nguyen Dynasty - UNESCO World Cultural Heritage',
    fr: 'Capitale impériale de la dynastie Nguyen - Patrimoine mondial',
    ja: 'グエン朝の黄金期を伝える古都・ユネスコ世界文化遺産',
    ko: '응우옌 왕조의 황금빛 고도 - 유네스코 세계문화유산',
    zh: '阮朝黄金古都 - 联合国教科文组织世界文化遗产'
  },
  'Thành phố đáng sống bên sông Hàn và biển Mỹ Khê': {
    en: 'Livable coastal city by Han River and My Khe Beach',
    fr: 'Ville côtière agréable au bord du fleuve Han et plage My Khe',
    ja: 'ハン川とミーケビーチに抱かれた美しい沿岸都市',
    ko: '한강과 미케 해변이 어우러진 살기 좋은 도시',
    zh: '倚傍瀚江与美溪沙滩的宜居之城'
  },
  'Di sản văn hóa thế giới bên dòng sông Hoài thơ mộng': {
    en: 'World cultural heritage along the poetic Hoai River',
    fr: 'Patrimoine mondial bordant la rivière poétique Hoai',
    ja: 'ホアイ川のほとりに佇むノスタルジックな世界文化遺産',
    ko: '서정적인 호아이 강변의 유네스코 세계문화유산',
    zh: '悠悠怀江畔的诗意世界文化遗产'
  },
  'Kỳ quan thiên nhiên thế giới nghìn năm với hàng ngàn đảo đá vôi': {
    en: 'World natural wonder with thousands of limestone karst islands',
    fr: 'Merveille naturelle mondiale aux milliers d\'îles calcaires',
    ja: '幾千もの奇岩が織りなすユネスコ世界自然遺産',
    ko: '수천 개의 석회암 섬이 빚어낸 세계 자연 불가사의',
    zh: '千百座奇峰突兀的世界级自然奇观'
  },
  'Tuyệt sắc non nước Tràng An & Cố đô Hoa Lư ngàn năm': {
    en: 'Magnificent landscape of Trang An & thousand-year-old Hoa Lu ancient capital',
    fr: 'Splendeur des paysages de Trang An & ancienne capitale Hoa Lu',
    ja: '壮麗なチャンアンの山水と千年の古都ホアルー',
    ko: '찬란한 짱안 산수와 천년 고도 호아루',
    zh: '长安绝色山水与千年华闾古都'
  },
  'Thành phố ngàn hoa và cao nguyên sương mờ thơ mộng': {
    en: 'City of a thousand flowers and romantic misty highlands',
    fr: 'Cité des mille fleurs et hauts plateaux brumeux romantiques',
    ja: '千の花が咲き誇る霧深きロマンチックな高原都市',
    ko: '천 개의 꽃이 피어나는 낭만적인 안개 고원 도시',
    zh: '千花盛开的浪漫迷雾高原之城'
  },
  'Viên ngọc xanh của Biển Đông với bờ vịnh tuyệt mỹ': {
    en: 'Green gem of the East Sea with a stunning bay',
    fr: 'Joyau vert de la mer de l\'Est avec une baie magnifique',
    ja: '美しい湾が広がる東海の緑の宝石',
    ko: '동해의 푸른 보석과 눈부신 해변 만',
    zh: '东海绿宝石与绝美海湾'
  },
  'Đảo Ngọc thiên đường nhiệt đới và di tích lịch sử Phú Quốc': {
    en: 'Pearl Island tropical paradise and historic sites of Phu Quoc',
    fr: 'Île d\'émeraude, paradis tropical et sites historiques de Phu Quoc',
    ja: '熱帯の楽園・真珠の島フーコックの歴史遺産',
    ko: '열대 낙원 진주 섬과 푸꾸옥 역사 유적지',
    zh: '热带天堂珍珠岛与富国岛历史名胜'
  },

  // CulturalMap and Interactive UI Phrases
  'Bản Đồ Chuyên Biệt Việt Nam (Hình Chữ S Toàn Vẹn)': {
    en: 'Dedicated Vietnam Map (Complete S-Shape Territory)',
    fr: 'Carte Exclusive du Vietnam (Territoire Intégral en S)',
    ja: 'ベトナム専用地図（完全なS字型の国土）',
    ko: '베트남 전용 지도 (완전한 S자 국토)',
    zh: '越南专属全景地图 (完整的S形锦绣河山)'
  },
  'Dải Đất Hình Chữ S Việt Nam': {
    en: 'The S-Shaped Land of Vietnam',
    fr: 'La Terre en Forme de S du Vietnam',
    ja: 'ベトナムのS字型の国土',
    ko: '베트남 S자형 국토',
    zh: '越南S形壮丽山河'
  },
  'Bản Đồ Di Sản:': { en: 'Heritage Map:', fr: 'Carte du Patrimoine:', ja: '遺産マップ：', ko: '문화유산 지도:', zh: '文化遗产地图：' },
  'Di Sản:': { en: 'Heritage:', fr: 'Patrimoine:', ja: '遺産：', ko: '문화유산:', zh: '文化遗产：' },
  'Toàn cảnh Việt Nam': { en: 'Full Vietnam View', fr: 'Vue d\'ensemble du Vietnam', ja: 'ベトナム全図', ko: '베트남 전체보기', zh: '全景越南' },
  'Toàn cảnh chữ S': { en: 'S-Shape View', fr: 'Vue en S', ja: 'S字全景', ko: 'S자형 전체보기', zh: 'S形全景' },
  'Toàn quốc': { en: 'Nationwide', fr: 'National', ja: '全国', ko: '전국', zh: '全国' },
  'Chỉ Bản Đồ VN': { en: 'Vietnam Only', fr: 'Vietnam Seul', ja: 'ベトナムのみ', ko: '베트남 전용', zh: '仅越南地图' },
  'Vệ Tinh': { en: 'Satellite', fr: 'Satellite', ja: '衛星写真', ko: '위성', zh: '卫星图' },
  'Đường Phố': { en: 'Streets', fr: 'Rues', ja: '市街図', ko: '도로', zh: '街道图' },
  'Địa Hình': { en: 'Terrain', fr: 'Relief', ja: '地形図', ko: '지형', zh: '地形图' },
  'Ranh giới': { en: 'Borders', fr: 'Frontières', ja: '境界線', ko: '경계선', zh: '省界' },
  'Tên tỉnh': { en: 'Labels', fr: 'Noms', ja: '省名ラベル', ko: '지명 표시', zh: '省名标注' },
  'Tìm di tích, tỉnh thành...': { en: 'Search monuments, provinces...', fr: 'Rechercher monuments, provinces...', ja: '史跡・省名を検索...', ko: '유적지, 성/시 검색...', zh: '搜索名胜古迹、省市...' },
  'Phóng to': { en: 'Zoom In', fr: 'Zoom avant', ja: '拡大', ko: '확대', zh: '放大' },
  'Thu nhỏ': { en: 'Zoom Out', fr: 'Zoom arrière', ja: '縮小', ko: '축소', zh: '缩小' },
  'Về lại toàn cảnh chữ S': { en: 'Reset to S-Shape View', fr: 'Réinitialiser la vue', ja: '全体表示に戻す', ko: '전체화면 초기화', zh: '重置全景' },
  'Định vị tọa độ GPS của bạn': { en: 'Locate your GPS position', fr: 'Localiser votre GPS', ja: '現在地を測位', ko: '내 GPS 위치 찾기', zh: '定位您的当前位置' },
  'Xem chi tiết đầy đủ': { en: 'View Full Details', fr: 'Voir tous les détails', ja: '詳細をすべて見る', ko: '전체 상세정보 보기', zh: '查看完整详情' },
  'Điểm Đến Di Sản Việt Nam': { en: 'Vietnam Heritage Destinations', fr: 'Destinations du Patrimoine', ja: 'ベトナムの世界遺産目的地', ko: '베트남 문화유산 목적지', zh: '越南文化遗产胜地' },
  'Xem toàn quốc': { en: 'View Nationwide', fr: 'Voir tout le pays', ja: '全国を見る', ko: '전국 보기', zh: '浏览全国' },
  'Chưa có di sản nào khớp với bộ lọc này.': { en: 'No heritage matches this filter.', fr: 'Aucun patrimoine ne correspond à ce filtre.', ja: '条件に一致する遺産はありません。', ko: '이 필터에 맞는 문화유산이 없습니다.', zh: '暂无符合此筛选条件的文化遗迹。' },
  'Dữ liệu văn hóa đang được liên tục bổ sung và cập nhật.': { en: 'Cultural data is continually being enriched and updated.', fr: 'Les données culturelles sont continuellement mises à jour.', ja: '文化データは継続的に追加・更新されています。', ko: '문화 데이터는 지속적으로 보완 및 업데이트됩니다.', zh: '文化数据库正在持续补充与完善更新。' },
  'Tất cả di sản': { en: 'All Heritages', fr: 'Tous les patrimoines', ja: 'すべての遺産', ko: '모든 문화유산', zh: '全部文化名胜' },
  '📜 Di tích lịch sử': { en: '📜 Historic Monuments', fr: '📜 Monuments Historiques', ja: '📜 歴史的史跡', ko: '📜 역사 유적지', zh: '📜 历史古迹' },
  '🏛 Hoàng thành & Cung điện': { en: '🏛 Citadels & Palaces', fr: '🏛 Citadelles & Palais', ja: '🏛 皇城・宮殿', ko: '🏛 황성 및 궁궐', zh: '🏛 皇城与宫殿' },
  '⛩ Đền chùa & Tháp cổ': { en: '⛩ Temples & Pagodas', fr: '⛩ 寺院 & 古塔', ja: '⛩ 寺院・古塔', ko: '⛩ 사찰 및 고탑', zh: '⛩ 寺庙与古塔' },
  '🏘 Đô thị cổ': { en: '🏘 Ancient Towns', fr: '🏘 Villes Anciennes', ja: '🏘 古代都市・旧市街', ko: '🏘 고대 도시', zh: '🏘 古城与古镇' },
  '🏺 Làng nghề truyền thống': { en: '🏺 Craft Villages', fr: '🏺 Villages Artisanaux', ja: '🏺 伝統工芸村', ko: '🏺 전통 공예 마을', zh: '🏺 传统手工艺村' },
  'Ảnh nền GPS:': { en: 'GPS Landmark:', fr: 'Fond GPS:', ja: 'GPS壁紙：', ko: 'GPS 배경 명소:', zh: 'GPS 地标壁纸：' },
  'Ảnh nền GPS': { en: 'GPS Landmark', fr: 'Fond GPS', ja: 'GPS壁紙', ko: 'GPS 배경 명소', zh: 'GPS 地标壁纸' },
  'Chạm để quay lại giao diện': { en: 'Tap to return to interface', fr: 'Appuyez pour revenir', ja: 'タップしてUIに戻る', ko: '탭하여 화면으로 복귀', zh: '点击返回主界面' },
  'Tìm thấy': { en: 'Found', fr: 'Trouvé', ja: '発見', ko: '발견', zh: '找到' },
  'Tổng cộng': { en: 'Total', fr: 'Total', ja: '合計', ko: '총', zh: '共计' },
  'địa điểm': { en: 'places', fr: 'lieux', ja: '箇所', ko: '곳', zh: '处地点' },
  'Tỉnh thành:': { en: 'Province:', fr: 'Province:', ja: '省・市：', ko: '성/시:', zh: '省市：' },
  'Khám phá': { en: 'Explore', fr: 'Explorer', ja: '探索', ko: '탐험', zh: '探索' },
  'Đổi cảnh': { en: 'Change View', fr: 'Changer la vue', ja: '景色変更', ko: '배경 변경', zh: '更换背景' },
  'Ngắm ảnh': { en: 'View Image', fr: 'Voir l\'image', ja: '壁紙鑑賞', ko: '사진 감상', zh: '欣赏图片' },
  'Ảnh Nền Danh Thắng Việt Nam': {
    en: 'Vietnam Scenic Landmarks Background',
    fr: 'Arrière-plan des Sites Pittoresques du Vietnam',
    ja: 'ベトナム名勝の背景画像',
    ko: '베트남 명승지 배경 이미지',
    zh: '越南名胜风景壁纸'
  },
  'Ảnh nền toàn bộ trang web tự động khớp với thành phố theo định vị GPS của bạn': {
    en: 'The website background automatically matches your city based on GPS positioning',
    fr: 'L\'arrière-plan s\'adapte automatiquement à votre ville selon la position GPS',
    ja: 'ウェブサイトの背景画像がGPS位置情報に基づいて滞在都市に自動同期されます',
    ko: '웹사이트 배경이 GPS 위치에 따라 방문 중인 도시의 명소로 자동 동기화됩니다',
    zh: '全站背景将根据您的GPS定位自动匹配当前所在城市的代表性名胜'
  },
  'Dùng cảm biến GPS thực tế trên thiết bị của bạn:': {
    en: 'Use real-time GPS sensor from your device:',
    fr: 'Utiliser le capteur GPS réel de votre appareil:',
    ja: '端末の実機GPSセンサーを使用：',
    ko: '기기의 실시간 GPS 센서 사용:',
    zh: '使用您设备的实时GPS传感器：'
  },
  'Bật GPS của tôi': {
    en: 'Enable My GPS',
    fr: 'Activer mon GPS',
    ja: 'マイGPSを有効化',
    ko: '내 GPS 켜기',
    zh: '启用我的GPS'
  },
  'Đang định vị...': {
    en: 'Locating...',
    fr: 'Localisation...',
    ja: '測位中...',
    ko: '위치 확인 중...',
    zh: '正在定位...'
  },
  'AI Tìm ảnh': {
    en: 'AI Photo Search',
    fr: 'Recherche Photo IA',
    ja: 'AI画像検索',
    ko: 'AI 사진 검색',
    zh: 'AI 寻找图片'
  },
  'Mặc định': {
    en: 'Defaults',
    fr: 'Par défaut',
    ja: '初期値',
    ko: '기본값',
    zh: '恢复默认'
  },
  'Đang dùng': {
    en: 'Active',
    fr: 'Actif',
    ja: '適用中',
    ko: '사용 중',
    zh: '当前应用'
  },
  'Quay về toàn cảnh bản đồ Việt Nam': {
    en: 'Return to full Vietnam view',
    fr: 'Revenir à la vue d\'ensemble du Vietnam',
    ja: 'ベトナム全図表示に戻る',
    ko: '베트남 전체 지도로 복귀',
    zh: '返回越南全景地图'
  },
  'Thu gọn ô thông tin': {
    en: 'Collapse info panel',
    fr: 'Réduire le panneau d\'info',
    ja: '情報パネルを折りたたむ',
    ko: '정보 패널 접기',
    zh: '折叠信息面板'
  },
  'Mở rộng ô thông tin': {
    en: 'Expand info panel',
    fr: 'Agrandir le panneau d\'info',
    ja: '情報パネルを展開',
    ko: '정보 패널 펼치기',
    zh: '展开信息面板'
  },
  'Chỉ hiển thị độc quyền bản đồ Việt Nam, không có quốc gia bên ngoài': {
    en: 'Exclusively displays Vietnam territory without foreign borders',
    fr: 'Affiche exclusivement le territoire du Vietnam sans frontières extérieures',
    ja: '国外領域を含まないベトナム領土のみを限定表示',
    ko: '외국 영토 없이 베트남 영토만 독점 표시',
    zh: '专属完整展示越南本土疆域'
  },
  'Bản đồ ảnh vệ tinh Esri World Imagery': {
    en: 'Esri World Imagery satellite view',
    fr: 'Vue satellite Esri World Imagery',
    ja: 'Esri World Imagery 衛星写真マップ',
    ko: 'Esri World Imagery 위성 사진 지도',
    zh: 'Esri 全球卫星影像图'
  },
  'Bản đồ giao thông du lịch Esri World Street Map': {
    en: 'Esri World Street Map travel navigation',
    fr: 'Carte routière et touristique Esri',
    ja: 'Esri 観光交通ストリートマップ',
    ko: 'Esri 관광 교통 도로 지도',
    zh: 'Esri 旅游交通街道图'
  },
  'Đổi màu sắc bản đồ Việt Nam': {
    en: 'Change Vietnam map color theme',
    fr: 'Changer le thème de couleur de la carte',
    ja: 'ベトナム地図の配色テーマを変更',
    ko: '베트남 지도 색상 테마 변경',
    zh: '切换越南地图配色主题'
  },
  'Chọn tông màu bản đồ:': {
    en: 'Select map color theme:',
    fr: 'Choisir le thème de couleur:',
    ja: '地図の配色テーマを選択：',
    ko: '지도 색상 테마 선택:',
    zh: '选择地图色彩风格：'
  },
  'Khám phá trọn vẹn lãnh thổ 34 đơn vị hành chính cấp tỉnh mới của Việt Nam, Biển Đông cùng hai quần đảo Hoàng Sa & Trường Sa thiêng liêng.': {
    en: 'Explore the complete territory of Vietnam\'s provincial units, the East Sea, and the sacred Hoang Sa & Truong Sa archipelagos.',
    fr: 'Explorez l\'intégralité du territoire du Vietnam, la mer de l\'Est et les archipels sacrés de Hoang Sa et Truong Sa.',
    ja: 'ベトナム全土の行政区画、東海、そして神聖なホアンサ・チュオンサ両諸島を包括的に探訪。',
    ko: '베트남의 지방 행정 단위, 동해, 그리고 신성한 호앙사·쯔엉사 군도를 아우르는 완전한 영토 탐험.',
    zh: '全面探索越南各省市行政区、东海以及神圣的黄沙与长沙群岛。'
  },
  'Đang tập trung vào khu vực': {
    en: 'Focusing on the region of',
    fr: 'Zoom sur la région de',
    ja: '選択中のエリア：',
    ko: '집중 탐색 중인 지역:',
    zh: '正在浏览地区：'
  },
  'Nhấn vào các điểm sáng để mở thông tin di sản.': {
    en: 'Click on highlighted markers to open heritage details.',
    fr: 'Cliquez sur les points lumineux pour afficher les détails du patrimoine.',
    ja: '輝くマーカーをクリックして遺産詳細を開きます。',
    ko: '빛나는 마커를 클릭하여 문화유산 상세 정보를 확인하세요.',
    zh: '点击地图上的亮点标志即可开启该文化遗产详细导览。'
  },
  'Địa phương': {
    en: 'Location',
    fr: 'Localité',
    ja: '所在地',
    ko: '지역',
    zh: '所属地区'
  },
  'Thời kỳ / Triều đại': {
    en: 'Period / Dynasty',
    fr: 'Période / Dynastie',
    ja: '時代・王朝',
    ko: '시대 / 왕조',
    zh: '历史时期 / 朝代'
  },
  'Lịch sử Hình thành': {
    en: 'Historical Origins',
    fr: 'Histoire & Origines',
    ja: '歴史的背景と成り立ち',
    ko: '역사적 배경 및 기원',
    zh: '历史渊源与形成'
  },
  'Ý nghĩa Lịch sử & Văn hóa': {
    en: 'Cultural & Historical Significance',
    fr: 'Signification Culturelle & Historique',
    ja: '歴史的・文化的意義',
    ko: '역사 및 문화적 가치',
    zh: '历史与文化内涵'
  },
  'Giờ mở cửa': {
    en: 'Opening Hours',
    fr: 'Horaires d\'ouverture',
    ja: '開館時間',
    ko: '개장 시간',
    zh: '开放时间'
  },
  'Giá vé tham khảo': {
    en: 'Admission Fee',
    fr: 'Tarif d\'entrée',
    ja: '入場料',
    ko: '입장료 안내',
    zh: '门票参考'
  },
  'Giá vé': {
    en: 'Ticket Price',
    fr: 'Prix du billet',
    ja: 'チケット料金',
    ko: '티켓 가격',
    zh: '门票'
  },
  'Chưa có dữ liệu xác nhận': {
    en: 'No verified hours available',
    fr: 'Non confirmé',
    ja: '未確認',
    ko: '확인된 정보 없음',
    zh: '暂未确认'
  },
  'Đang cập nhật': {
    en: 'Updating',
    fr: 'Mise à jour',
    ja: '更新中',
    ko: '업데이트 중',
    zh: '正在更新'
  },
  'Đang cập nhật thêm tư liệu lịch sử từ chuyên gia.': {
    en: 'Historical documentation is currently being compiled from experts.',
    fr: 'Les archives historiques sont en cours d\'enrichissement par des experts.',
    ja: '専門家による歴史資料の拡充を行っています。',
    ko: '전문가 자문을 거친 역사 사료를 지속적으로 보완하고 있습니다.',
    zh: '历史档案资料正由专家学者持续完善补充。'
  },
  'Bật/Tắt đường ranh giới 63 tỉnh thành': {
    en: 'Toggle provincial borderlines',
    fr: 'Afficher/Masquer les frontières provinciales',
    ja: '省界線の表示/非表示',
    ko: '성/시 경계선 켜기/끄기',
    zh: '切换省界显示'
  },
  'Bật/Tắt nhãn tên 63 tỉnh thành': {
    en: 'Toggle province labels',
    fr: 'Afficher/Masquer les noms de provinces',
    ja: '省名ラベルの表示/非表示',
    ko: '성/시 명칭 라벨 켜기/끄기',
    zh: '切换省名标注'
  },
  'Dùng AI tìm kiếm ảnh danh lam thắng cảnh Việt Nam': {
    en: 'Use AI to search Vietnamese scenic landmark photos',
    fr: 'Utiliser l\'IA pour chercher des photos de sites vietnamiens',
    ja: 'AIでベトナムの名勝写真を検索',
    ko: 'AI로 베트남 명승지 사진 검색',
    zh: '使用AI智能检索越南风景名胜图片'
  },
  'Thêm ảnh nền danh thắng mới': {
    en: 'Add new scenic landmark background',
    fr: 'Ajouter un nouvel arrière-plan de site',
    ja: '新しい名勝壁紙を追加',
    ko: '새 명승지 배경 추가',
    zh: '添加新名胜壁纸'
  },
  'Thêm thủ công': {
    en: 'Add Manual',
    fr: 'Ajout Manuel',
    ja: '手動追加',
    ko: '직접 추가',
    zh: '手动添加'
  },
  'Khôi phục mặc định': {
    en: 'Restore Defaults',
    fr: 'Restaurer défauts',
    ja: '初期値に戻す',
    ko: '기본값 복원',
    zh: '恢复默认'
  },
  'Admin Quyền Quản Lý': {
    en: 'Admin Manager',
    fr: 'Gestion Admin',
    ja: '管理者権限',
    ko: '관리자 권한',
    zh: '管理员权限'
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
      // Google Translate loads asynchronously; keep retrying long enough for slow networks.
      let retries = 0;
      const timer = setInterval(() => {
        retries++;
        if (triggerCombo() || retries >= 60) {
          clearInterval(timer);
        }
      }, 500);
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
      // Restore original form and accessibility attributes as well.
      document.querySelectorAll('*').forEach((el) => {
        ['placeholder', 'title', 'aria-label', 'alt'].forEach((attr) => {
          const key = 'data-orig-attr-' + attr;
          const original = el.getAttribute(key);
          if (original !== null) {
            el.setAttribute(attr, original);
            el.removeAttribute(key);
          }
        });
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
      ...PHRASE_TRANSLATIONS,
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

        // Translate common text-bearing attributes too (placeholders, tooltips,
        // image alt text and accessibility labels), using the original value
        // so switching between languages does not get stuck on a previous translation.
        document.querySelectorAll('*').forEach((el) => {
          ['placeholder', 'title', 'aria-label', 'alt'].forEach((attr) => {
            const key = 'data-orig-attr-' + attr;
            const currentValue = el.getAttribute(attr);
            if (currentValue === null) return;
            const originalValue = el.getAttribute(key) ?? currentValue;
            const translatedValue = phraseMap[originalValue]?.[code];
            if (translatedValue) {
              if (!el.hasAttribute(key)) el.setAttribute(key, originalValue);
              el.setAttribute(attr, translatedValue);
            }
          });
        });
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
   * Translate a given key or phrase
   */
  public t(key: string, lang?: string, fallback?: string): string {
    const activeLang = lang || this.currentLanguage;
    if (activeLang === 'vi') {
      if (DICTIONARY[key]?.['vi']) return DICTIONARY[key]['vi'];
      if (PHRASE_TRANSLATIONS[key]?.['vi']) return PHRASE_TRANSLATIONS[key]['vi'];
      return fallback !== undefined ? fallback : key;
    }

    // 1. Check DICTIONARY by key
    const entry = DICTIONARY[key];
    if (entry) {
      if (entry[activeLang]) return entry[activeLang];
      if (entry['en']) return entry['en'];
      if (entry['vi']) return entry['vi'];
    }

    // 2. Check PHRASE_TRANSLATIONS by key/phrase
    const phraseEntry = PHRASE_TRANSLATIONS[key];
    if (phraseEntry) {
      if (phraseEntry[activeLang]) return phraseEntry[activeLang];
      if (phraseEntry['en']) return phraseEntry['en'];
    }

    // 3. Check fallback in PHRASE_TRANSLATIONS
    if (fallback && PHRASE_TRANSLATIONS[fallback]) {
      const fbEntry = PHRASE_TRANSLATIONS[fallback];
      if (fbEntry[activeLang]) return fbEntry[activeLang];
      if (fbEntry['en']) return fbEntry['en'];
    }

    // 4. Return fallback or key
    return fallback !== undefined ? fallback : key;
  }

  /**
   * Translate or return English/foreign version of heritage item if lang === 'en'
   */
  public translateHeritageItem(item: any, lang?: string): any {
    const activeLang = lang || this.currentLanguage;
    if (activeLang === 'vi' || !item) return item;

    const translated = { ...item };
    if (translated.englishName) {
      translated.name = translated.englishName;
    }
    if (translated.categoryLabel) {
      translated.categoryLabel = this.t(translated.categoryLabel, activeLang, translated.categoryLabel);
    }
    if (activeLang === 'en') {
      if (translated.id === 'dai-noi-hue') {
        translated.history = "Construction began in 1804 under Emperor Gia Long and was completed in 1833 under Emperor Minh Mang. The Imperial Citadel served as the administrative center and royal residence for 13 Nguyen Dynasty emperors over 143 years.";
        translated.culturalSignificance = "Recognized as a UNESCO World Cultural Heritage site in 1993. It is a pinnacle of Vietnamese imperial architecture, harmoniously combining Eastern feng shui philosophy with Western Vauban military architecture.";
        translated.conservationStatus = "Preserved and extensively restored by the Hue Monuments Conservation Center and international partners.";
      } else if (translated.id === 'van-mieu-quoc-tu-giam') {
        translated.history = "Built in 1070 during the reign of Emperor Ly Thanh Tong to worship Confucius and sages. In 1076, Emperor Ly Nhan Tong established Quoc Tu Giam next to it, becoming Vietnam's first national university.";
        translated.culturalSignificance = "Home to 82 Doctor's stelae inscribed by UNESCO as a Memory of the World documentary heritage, symbolizing the studious tradition of the Vietnamese nation.";
        translated.conservationStatus = "Special National Monument preserved intact through centuries.";
      } else if (translated.id === 'pho-co-hoi-an') {
        translated.history = "An exceptionally well-preserved example of a Southeast Asian trading port dating from the 15th to the 19th century. Its buildings and its street plan reflect the influences, both indigenous and foreign.";
        translated.culturalSignificance = "UNESCO World Cultural Heritage site recognized in 1999, famous for its lantern-lit streets, historic merchant houses, and Japanese Covered Bridge.";
        translated.conservationStatus = "Protected under national heritage preservation laws and UNESCO guidelines.";
      } else {
        if (translated.history && translated.history.includes('Được')) {
          translated.history = translated.history.replace('Được khởi công xây dựng', 'Construction began').replace('Di sản', 'Heritage').replace('Xây dựng', 'Built');
        }
      }
    }
    return translated;
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
