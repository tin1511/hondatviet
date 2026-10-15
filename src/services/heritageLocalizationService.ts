/**
 * Heritage Localization Service for Hồn Đất Việt / HERITAGEAI
 * Provides verified bilingual data (Vietnamese & English) for heritage destinations,
 * including historical narratives, cultural values, visiting guidelines, and speech text.
 */
import { HeritageItem } from '../types';

export interface LocalizedHeritageContent {
  name: string;
  categoryLabel: string;
  province: string;
  period: string;
  history: string;
  culturalSignificance: string;
  visitingHours: string;
  ticketPrice: string;
  address: string;
  interestingFacts: string[];
  audioNarration: string;
}

export const PROVINCE_TRANSLATIONS: Record<string, string> = {
  'Hà Nội': 'Hanoi',
  'Thừa Thiên Huế': 'Thua Thien Hue',
  'Quảng Nam': 'Quang Nam',
  'Ninh Bình': 'Ninh Binh',
  'Quảng Ninh': 'Quang Ninh',
  'TP. Hồ Chí Minh': 'Ho Chi Minh City',
  'Quảng Bình': 'Quang Binh',
  'Khánh Hòa': 'Khanh Hoa (Nha Trang)',
  'Lào Cai': 'Lao Cai (Sapa)',
  'Đà Nẵng': 'Da Nang',
  'Cao Bằng': 'Cao Bang',
  'Tây Ninh': 'Tay Ninh',
  'Bình Thuận': 'Binh Thuan (Mui Ne)',
  'Kiên Giang': 'Kien Giang (Phu Quoc)',
  'Bắc Ninh': 'Bac Ninh',
  'Sơn La': 'Son La',
  'Hà Giang': 'Ha Giang',
  'Lâm Đồng': 'Lam Dong (Da Lat)',
  'Bà Rịa - Vũng Tàu': 'Ba Ria - Vung Tau',
  'Cần Thơ': 'Can Tho',
  'An Giang': 'An Giang',
  'Đắk Lắk': 'Dak Lak',
  'Gia Lai': 'Gia Lai',
  'Kon Tum': 'Kon Tum',
  'Phú Yên': 'Phu Yen',
  'Bình Định': 'Binh Dinh',
  'Quảng Ngãi': 'Quang Ngai',
  'Quảng Trị': 'Quang Tri',
  'Hà Tĩnh': 'Ha Tinh',
  'Nghệ An': 'Nghe An',
  'Thanh Hóa': 'Thanh Hoa',
  'Nam Định': 'Nam Dinh',
  'Thái Bình': 'Thai Binh',
  'Hải Phòng': 'Hai Phong',
  'Hải Dương': 'Hai Duong',
  'Hưng Yên': 'Hung Yen',
  'Vĩnh Phúc': 'Vinh Phuc',
  'Phú Thọ': 'Phu Tho',
  'Thái Nguyên': 'Thai Nguyen',
  'Lạng Sơn': 'Lang Son',
  'Tuyên Quang': 'Tuyen Quang',
  'Yên Bái': 'Yen Bai',
  'Điện Biên': 'Dien Bien',
  'Lai Châu': 'Lai Chau',
  'Hòa Bình': 'Hoa Binh'
};

export const CATEGORY_TRANSLATIONS: Record<string, string> = {
  'Cung điện & Hoàng thành': 'Imperial Palace & Citadel',
  'Di tích Lịch sử & Giáo dục': 'Historical Monument & Education',
  'Di sản Đô thị Cổ': 'Ancient Town World Heritage',
  'Đô thị Cổ & Di tích Thương mại': 'Ancient Town & Historic Port',
  'Di sản Hỗn hợp Thiên nhiên & Văn hóa': 'Mixed Natural & Cultural World Heritage',
  'Di tích Lịch sử Cách mạng': 'Revolutionary Historical Monument',
  'Công trình Kiến trúc Lịch sử': 'Historic Architectural Landmark',
  'Đền tháp Cổ Chăm Pa': 'Ancient Cham Pa Towers Sanctuary',
  'Kiến trúc Cổ & Tháp Chăm': 'Ancient Cham Architecture & Towers',
  'Di sản Thiên nhiên Thế giới': 'World Natural Heritage',
  'Chùa & Phật giáo': 'Buddhist Temple & Pagoda',
  'Chùa cổ & Trung tâm Tâm linh': 'Ancient Pagoda & Spiritual Center',
  'Đền miếu & Chùa cổ': 'Ancient Shrine & Pagoda',
  'Danh thắng & Trung tâm Tâm linh': 'Scenic Landscape & Spiritual Center',
  'Danh thắng Biển đảo & Tâm linh': 'Island Landscape & Spiritual Sanctuary',
  'Danh thắng Biển đảo & Tháp cổ': 'Coastal Landscape & Ancient Tower',
  'Danh thắng Thiên nhiên Quốc gia': 'National Scenic Landscape',
  'Danh thắng Thiên nhiên & Văn hóa Dân tộc': 'Natural Wonder & Ethnic Culture',
  'Danh thắng Thiên nhiên & Văn hóa Tây Bắc': 'Northwest Natural Landscape & Culture',
  'Thành lũy & Di tích Quân sự': 'Ancient Fortress & Military History',
  'Kiến trúc & Danh thắng Biểu tượng': 'Architectural & Iconic Landmark',
  'Văn hóa & Giải trí': 'Culture & Leisure Landmark',
  'Món ăn Nổi tiếng Thế giới': 'World-Renowned Cuisine',
  'Nhà hàng Đặc sản Nam Bộ': 'Southern Specialty Restaurant',
  'Nhà hàng Đặc sản Xứ Quảng': 'Central Regional Restaurant',
  'Nhà hàng Ẩm thực Cố Đô': 'Royal Court Cuisine Restaurant',
  'Nhà hàng Ẩm thực Tràng An': 'Trang An Heritage Cuisine',
  'Quán Cà phê & Thức uống': 'Heritage Cafe & Beverages',
  'Cà phê Di tích Lịch sử': 'Historic Heritage Cafe',
  'Quán ăn Địa phương': 'Local Heritage Eatery',
  'Quán ăn Dân dã Bản địa': 'Authentic Local Heritage Food'
};

export const PERIOD_TRANSLATIONS: Record<string, string> = {
  'Triều Nguyễn (1802 - 1945)': 'Nguyen Dynasty (1802 - 1945)',
  'Triều Lý - Trần - Hậu Lê': 'Ly, Tran & Later Le Dynasties',
  'Thế kỷ 16 - 19': '16th - 19th Centuries',
  'Thời Đinh - Tiền Lê - Lý': 'Dinh, Early Le & Ly Dynasties',
  'Năm 1601 (Chúa Nguyễn Hoàng)': 'Year 1601 (Lord Nguyen Hoang)',
  'Thế kỷ 20 (1966)': '20th Century (1966)',
  'Thế kỷ 4 - 13 (Vương quốc Chăm Pa)': '4th - 13th Century (Champa Kingdom)',
  'Kiến tạo địa chất 500 triệu năm': '500-million-year Geological Formation',
  'Thế kỷ 11 - 21': '11th - 21st Centuries',
  'Thế kỷ 8 - 13': '8th - 13th Centuries',
  'Thời hiện đại & Tự nhiên': 'Modern Era & Pristine Nature',
  'Năm 2018': 'Year 2018 (Contemporary Iconic)',
  'Năm 1914': 'Year 1914 (French Colonial Period)',
  'Kỳ quan tự nhiên': 'Natural Wonder',
  'Thế kỷ 17 - nay': '17th Century - Present',
  'Thời Lê Trung Hưng (Thế kỷ 17)': 'Restored Le Period (17th Century)',
  'Kháng chiến chống Pháp - Mỹ (1946 - 1975)': 'Resistance War Period (1946 - 1975)',
  'Thế kỷ 8 - 9': '8th - 9th Centuries'
};

// Rich English curated records for heritages in database

// Multilingual Province Dictionary (vi, en, fr, ja, ko, zh)
export const PROVINCE_MULTILINGUAL: Record<string, Record<string, string>> = {
  'Hà Nội': { en: 'Hanoi', fr: 'Hanoï', ja: 'ハノイ', ko: '하노이', zh: '河内' },
  'Thừa Thiên Huế': { en: 'Thua Thien Hue', fr: 'Thua Thien Hue', ja: 'トゥアティエン・フエ', ko: '트어티엔후에', zh: '承天顺化' },
  'Quảng Nam': { en: 'Quang Nam', fr: 'Quang Nam', ja: 'クアンナム', ko: '꽝남', zh: '广南' },
  'Ninh Bình': { en: 'Ninh Binh', fr: 'Ninh Binh', ja: 'ニンビン', ko: '닌빈', zh: '宁平' },
  'Quảng Ninh': { en: 'Quang Ninh', fr: 'Quang Ninh', ja: 'クアンニン', ko: '꽝닌', zh: '广宁' },
  'TP. Hồ Chí Minh': { en: 'Ho Chi Minh City', fr: 'Hô-Chi-Minh-Ville', ja: 'ホーチミン市', ko: '호치민시', zh: '胡志明市' },
  'Quảng Bình': { en: 'Quang Binh', fr: 'Quang Binh', ja: 'クアンビン', ko: '꽝빈', zh: '广平' },
  'Khánh Hòa': { en: 'Khanh Hoa (Nha Trang)', fr: 'Khanh Hoa (Nha Trang)', ja: 'カインホア（ニャチャン）', ko: '카인호아 (나트랑)', zh: '庆和（芽庄）' },
  'Lào Cai': { en: 'Lao Cai (Sapa)', fr: 'Lao Cai (Sapa)', ja: 'ラオカイ（サパ）', ko: '라오까이 (사파)', zh: '老街（沙坝）' },
  'Đà Nẵng': { en: 'Da Nang', fr: 'Da Nang', ja: 'ダナン', ko: '다낭', zh: '岘港' },
  'Cao Bằng': { en: 'Cao Bang', fr: 'Cao Bang', ja: 'カオバン', ko: '까오방', zh: '高平' },
  'Tây Ninh': { en: 'Tay Ninh', fr: 'Tay Ninh', ja: 'タイニン', ko: '떠이닌', zh: '西宁' },
  'Bình Thuận': { en: 'Binh Thuan (Mui Ne)', fr: 'Binh Thuan (Mui Ne)', ja: 'ビントゥアン（ムイネー）', ko: '빈투언 (무이네)', zh: '平顺（美奈）' },
  'Kiên Giang': { en: 'Kien Giang (Phu Quoc)', fr: 'Kien Giang (Phu Quoc)', ja: 'キエンザン（フーコック）', ko: '끼엔장 (푸꾸옥)', zh: '坚江（富国岛）' },
  'Bắc Ninh': { en: 'Bac Ninh', fr: 'Bac Ninh', ja: 'バクニン', ko: '박닌', zh: '北宁' },
  'Sơn La': { en: 'Son La', fr: 'Son La', ja: 'ソンラ', ko: '선라', zh: '山罗' },
  'Hà Giang': { en: 'Ha Giang', fr: 'Ha Giang', ja: 'ハザン', ko: '하장', zh: '河江' },
  'Lâm Đồng': { en: 'Lam Dong (Da Lat)', fr: 'Lam Dong (Da Lat)', ja: 'ラムドン（ダラット）', ko: '람동 (달랏)', zh: '林同（大叻）' },
  'Bà Rịa - Vũng Tàu': { en: 'Ba Ria - Vung Tau', fr: 'Ba Ria - Vung Tau', ja: 'バリア＝ブンタウ', ko: '바리어붕따우', zh: '巴地头顿' },
  'Cần Thơ': { en: 'Can Tho', fr: 'Can Tho', ja: 'カントー', ko: '껀터', zh: '芹苴' },
  'An Giang': { en: 'An Giang', fr: 'An Giang', ja: 'アンザン', ko: '안장', zh: '安江' },
  'Đắk Lắk': { en: 'Dak Lak', fr: 'Dak Lak', ja: 'ダクラク', ko: '닥락', zh: '多乐' },
  'Gia Lai': { en: 'Gia Lai', fr: 'Gia Lai', ja: 'ザライ', ko: '잘라이', zh: '嘉莱' },
  'Kon Tum': { en: 'Kon Tum', fr: 'Kon Tum', ja: 'コントゥム', ko: '꼰뚬', zh: '昆嵩' },
  'Phú Yên': { en: 'Phu Yen', fr: 'Phu Yen', ja: 'フーイエン', ko: '푸옌', zh: '富安' },
  'Bình Định': { en: 'Binh Dinh', fr: 'Binh Dinh', ja: 'ビンディン', ko: '빈딘', zh: '平定' },
  'Quảng Ngãi': { en: 'Quang Ngai', fr: 'Quang Ngai', ja: 'クアンガイ', ko: '꽝응아이', zh: '广义' },
  'Quảng Trị': { en: 'Quang Tri', fr: 'Quang Tri', ja: 'クアンチ', ko: '꽝찌', zh: '广治' },
  'Hà Tĩnh': { en: 'Ha Tinh', fr: 'Ha Tinh', ja: 'ハティン', ko: '하띤', zh: '河静' },
  'Nghệ An': { en: 'Nghe An', fr: 'Nghe An', ja: 'ゲアン', ko: '응에안', zh: '乂安' },
  'Thanh Hóa': { en: 'Thanh Hoa', fr: 'Thanh Hoa', ja: 'タインホア', ko: '타인호아', zh: '清化' },
  'Nam Định': { en: 'Nam Dinh', fr: 'Nam Dinh', ja: 'ナムディン', ko: '남딘', zh: '南定' },
  'Thái Bình': { en: 'Thai Binh', fr: 'Thai Binh', ja: 'タイビン', ko: '타이빈', zh: '太平' },
  'Hải Phòng': { en: 'Hai Phong', fr: 'Haïphong', ja: 'ハイフォン', ko: '하이퐁', zh: '海防' },
  'Hải Dương': { en: 'Hai Duong', fr: 'Hai Duong', ja: 'ハイズオン', ko: '하이즈엉', zh: '海阳' },
  'Hưng Yên': { en: 'Hung Yen', fr: 'Hung Yen', ja: 'フンイエン', ko: '흥옌', zh: '兴安' },
  'Vĩnh Phúc': { en: 'Vinh Phuc', fr: 'Vinh Phuc', ja: 'ヴィンフック', ko: '빈푹', zh: '永福' },
  'Phú Thọ': { en: 'Phu Tho', fr: 'Phu Tho', ja: 'フートー', ko: '푸토', zh: '富寿' },
  'Thái Nguyên': { en: 'Thai Nguyen', fr: 'Thai Nguyen', ja: 'タイグエン', ko: '타이응우옌', zh: '太原' },
  'Lạng Sơn': { en: 'Lang Son', fr: 'Lang Son', ja: 'ランソン', ko: '랑선', zh: '谅山' },
  'Tuyên Quang': { en: 'Tuyen Quang', fr: 'Tuyen Quang', ja: 'トゥエンクアン', ko: '뚜옌꽝', zh: '宣光' },
  'Yên Bái': { en: 'Yen Bai', fr: 'Yen Bai', ja: 'イエンバイ', ko: '옌바이', zh: '安沛' },
  'Điện Biên': { en: 'Dien Bien', fr: 'Dien Bien', ja: 'ディエンビエン', ko: '디엔비엔', zh: '奠边' },
  'Lai Châu': { en: 'Lai Chau', fr: 'Lai Chau', ja: 'ライチャウ', ko: '라이쩌우', zh: '莱州' },
  'Hòa Bình': { en: 'Hoa Binh', fr: 'Hoa Binh', ja: 'ホアビン', ko: '호아빈', zh: '和平' }
};

// Multilingual Category Dictionary
export const CATEGORY_MULTILINGUAL: Record<string, Record<string, string>> = {
  'Cung điện & Hoàng thành': {
    en: 'Imperial Palace & Citadel',
    fr: 'Palais impérial et citadelle',
    ja: '皇城・宮殿',
    ko: '황성 및 궁궐',
    zh: '皇城与宫殿'
  },
  'Di tích Lịch sử & Giáo dục': {
    en: 'Historical Monument & Education',
    fr: 'Monument historique et éducation',
    ja: '歴史史跡・教育遺産',
    ko: '역사 유적 및 교육',
    zh: '历史古迹与教育'
  },
  'Di sản Đô thị Cổ': {
    en: 'Ancient Town World Heritage',
    fr: 'Patrimoine mondial de la ville antique',
    ja: '古都・世界文化遺産',
    ko: '고대 도시 세계문화유산',
    zh: '古镇世界文化遗产'
  },
  'Đô thị Cổ & Di tích Thương mại': {
    en: 'Ancient Town & Historic Port',
    fr: 'Ville antique et port historique',
    ja: '古都・貿易港史跡',
    ko: '고대 도시 및 무역항 유적',
    zh: '古镇与商埠遗迹'
  },
  'Di sản Hỗn hợp Thiên nhiên & Văn hóa': {
    en: 'Mixed Natural & Cultural World Heritage',
    fr: 'Patrimoine mondial mixte naturel et culturel',
    ja: '複合世界遺産（自然・文化）',
    ko: '복합 세계유산 (자연 및 문화)',
    zh: '世界复合遗产（自然与文化）'
  },
  'Di tích Lịch sử Cách mạng': {
    en: 'Revolutionary Historical Monument',
    fr: 'Monument historique révolutionnaire',
    ja: '革命歴史史跡',
    ko: '혁명 역사 유적',
    zh: '革命历史古迹'
  },
  'Công trình Kiến trúc Lịch sử': {
    en: 'Historic Architectural Landmark',
    fr: 'Monument architectural historique',
    ja: '歴史的建造物・名勝',
    ko: '역사적 건축 명소',
    zh: '历史建筑地标'
  },
  'Đền tháp Cổ Chăm Pa': {
    en: 'Ancient Cham Pa Towers Sanctuary',
    fr: 'Sanctuaire des tours Cham Pa',
    ja: '古代チャンパ遺跡・聖塔群',
    ko: '고대 참파 유적 및 사원탑',
    zh: '古代占婆塔群圣地'
  },
  'Kiến trúc Cổ & Tháp Chăm': {
    en: 'Ancient Cham Architecture & Towers',
    fr: 'Architecture et tours Cham antiques',
    ja: '古代チャン建築・塔',
    ko: '고대 참파 건축 및 탑',
    zh: '古代占婆建筑与古塔'
  },
  'Di sản Thiên nhiên Thế giới': {
    en: 'World Natural Heritage',
    fr: 'Patrimoine naturel mondial',
    ja: '世界自然遺産',
    ko: '세계자연유산',
    zh: '世界自然遗产'
  },
  'Chùa & Phật giáo': {
    en: 'Buddhist Temple & Pagoda',
    fr: 'Temple bouddhiste et pagode',
    ja: '仏教寺院・古刹',
    ko: '불교 사찰 및 탑',
    zh: '佛寺古刹'
  },
  'Chùa cổ & Trung tâm Tâm linh': {
    en: 'Ancient Pagoda & Spiritual Center',
    fr: 'Pagode ancienne et centre spirituel',
    ja: '古刹・霊場センター',
    ko: '고대 사찰 및 영적 성지',
    zh: '古刹与灵修中心'
  },
  'Đền miếu & Chùa cổ': {
    en: 'Ancient Shrine & Pagoda',
    fr: 'Sanctuaire antique et pagode',
    ja: '古社・古寺',
    ko: '고대 사당 및 사찰',
    zh: '古庙与古刹'
  },
  'Danh thắng & Trung tâm Tâm linh': {
    en: 'Scenic Landscape & Spiritual Center',
    fr: 'Paysage pittoresque et centre spirituel',
    ja: '景勝地・霊場',
    ko: '명승지 및 영적 성지',
    zh: '名胜与灵修圣地'
  },
  'Danh thắng Biển đảo & Tâm linh': {
    en: 'Island Landscape & Spiritual Sanctuary',
    fr: 'Paysage insulaire et sanctuaire spirituel',
    ja: '島嶼景勝地・霊場',
    ko: '도서 명승지 및 영적 성지',
    zh: '海岛名胜与灵修圣地'
  },
  'Danh thắng Biển đảo & Tháp cổ': {
    en: 'Coastal Landscape & Ancient Tower',
    fr: 'Paysage côtier et tour antique',
    ja: '海岸景勝地・古代塔',
    ko: '해안 명승지 및 고대 탑',
    zh: '海滨名胜与古塔'
  },
  'Danh thắng Thiên nhiên Quốc gia': {
    en: 'National Scenic Landscape',
    fr: 'Paysage pittoresque national',
    ja: '国家景勝地',
    ko: '국가 명승지',
    zh: '国家级风景名胜'
  },
  'Danh thắng Thiên nhiên & Văn hóa Dân tộc': {
    en: 'Natural Wonder & Ethnic Culture',
    fr: 'Merveille naturelle et culture ethnique',
    ja: '大自然と少数民族文化',
    ko: '자연 경관 및 민족 문화',
    zh: '自然胜景与民族文化'
  },
  'Thành lũy & Di tích Quân sự': {
    en: 'Ancient Fortress & Military History',
    fr: 'Forteresse antique et histoire militaire',
    ja: '城砦・軍事歴史史跡',
    ko: '성채 및 군사 역사 유적',
    zh: '古堡垒与军事遗址'
  },
  'Kiến trúc & Danh thắng Biểu tượng': {
    en: 'Architectural & Iconic Landmark',
    fr: 'Édifice architectural emblématique',
    ja: '象徴的建築・ランドマーク',
    ko: '상징적 건축 및 명소',
    zh: '标志性建筑与名胜'
  },
  'Làng nghề truyền thống': {
    en: 'Traditional Craft Village',
    fr: 'Village artisanal traditionnel',
    ja: '伝統工芸村',
    ko: '전통 공예 마을',
    zh: '传统手工艺村'
  },
  'Ẩm thực truyền thống': {
    en: 'Traditional Cuisine Heritage',
    fr: 'Patrimoine gastronomique traditionnel',
    ja: '郷土伝統料理',
    ko: '전통 향토 요리',
    zh: '传统风味美食'
  },
  'Văn hóa phi vật thể': {
    en: 'Intangible Cultural Heritage',
    fr: 'Patrimoine culturel immatériel',
    ja: '無形文化遺産',
    ko: '무형문화유산',
    zh: '非物质文化遗产'
  }
};

// Multilingual Period Dictionary
export const PERIOD_MULTILINGUAL: Record<string, Record<string, string>> = {
  'Triều Nguyễn (1802 - 1945)': {
    en: 'Nguyen Dynasty (1802 - 1945)',
    fr: 'Dynastie des Nguyen (1802 - 1945)',
    ja: 'グエン朝（1802〜1945年）',
    ko: '응우옌 왕조 (1802 - 1945)',
    zh: '阮朝（1802 - 1945）'
  },
  'Thời Lý - Trần - Lê (Từ năm 1070)': {
    en: 'Ly, Tran & Later Le Dynasties (From 1070)',
    fr: 'Dynasties Ly, Tran et Le postérieur (Depuis 1070)',
    ja: '李・陳・黎朝時代（1070年〜）',
    ko: '리, 쩐, 레 왕조 (1070년부터)',
    zh: '李、陈、后黎朝（始于1070年）'
  },
  'Triều Lý - Trần - Hậu Lê': {
    en: 'Ly, Tran & Later Le Dynasties',
    fr: 'Dynasties Ly, Tran et Le',
    ja: '李・陳・後黎朝時代',
    ko: '리, 쩐, 후레 왕조',
    zh: '李、陈、后黎朝'
  },
  'Thế kỷ 15 - 19': {
    en: '15th - 19th Centuries',
    fr: 'XVe - XIXe siècles',
    ja: '15世紀〜19世紀',
    ko: '15세기 - 19세기',
    zh: '15 - 19世纪'
  },
  'Thế kỷ 16 - 19': {
    en: '16th - 19th Centuries',
    fr: 'XVIe - XIXe siècles',
    ja: '16世紀〜19世紀',
    ko: '16세기 - 19세기',
    zh: '16 - 19世纪'
  },
  'Thời Đinh - Tiền Lê - Lý': {
    en: 'Dinh, Early Le & Ly Dynasties',
    fr: 'Dynasties Dinh, Le antérieur et Ly',
    ja: '丁・前黎・李朝時代',
    ko: '딘, 전레, 리 왕조',
    zh: '丁、前黎、李朝'
  },
  'Năm 1601 (Chúa Nguyễn Hoàng)': {
    en: 'Year 1601 (Lord Nguyen Hoang)',
    fr: 'Année 1601 (Seigneur Nguyen Hoang)',
    ja: '1601年（グエン・ホアン領主）',
    ko: '1601년 (응우옌 황 영주)',
    zh: '1601年（阮潢领主）'
  },
  'Thế kỷ 20 (1966)': {
    en: '20th Century (1966)',
    fr: 'XXe siècle (1966)',
    ja: '20世紀（1966年）',
    ko: '20세기 (1966년)',
    zh: '20世纪（1966年）'
  },
  'Thế kỷ 4 - 13 (Vương quốc Chăm Pa)': {
    en: '4th - 13th Century (Champa Kingdom)',
    fr: 'IVe - XIIIe siècle (Royaume de Champa)',
    ja: '4〜13世紀（チャンパ王国）',
    ko: '4세기 - 13세기 (참파 왕국)',
    zh: '4 - 13世纪（占婆王国）'
  },
  'Kiến tạo địa chất 500 triệu năm': {
    en: '500-million-year Geological Formation',
    fr: 'Formation géologique de 500 millions d années',
    ja: '5億年の地質学的形成',
    ko: '5억 년의 지질학적 형성',
    zh: '5亿年地质构造演化'
  },
  'Thế kỷ 11 - 21': {
    en: '11th - 21st Centuries',
    fr: 'XIe - XXIe siècles',
    ja: '11世紀〜21世紀',
    ko: '11세기 - 21세기',
    zh: '11 - 21世纪'
  },
  'Thế kỷ 8 - 13': {
    en: '8th - 13th Centuries',
    fr: 'VIIIe - XIIIe siècles',
    ja: '8世紀〜13世紀',
    ko: '8세기 - 13세기',
    zh: '8 - 13世纪'
  },
  'Năm 2018': {
    en: 'Year 2018 (Contemporary Iconic)',
    fr: 'Année 2018 (Contemporain)',
    ja: '2018年（現代の象徴）',
    ko: '2018년 (현대적 랜드마크)',
    zh: '2018年（当代标志性建筑）'
  },
  'Năm 1914': {
    en: 'Year 1914 (French Colonial Period)',
    fr: 'Année 1914 (Époque coloniale française)',
    ja: '1914年（仏領インドシナ時代）',
    ko: '1914년 (프랑스 식민지 시대)',
    zh: '1914年（法属时期）'
  },
  'Kháng chiến chống Pháp - Mỹ (1946 - 1975)': {
    en: 'Resistance War Period (1946 - 1975)',
    fr: 'Période des guerres d indépendance (1946 - 1975)',
    ja: '抗仏・抗米戦争期（1946〜1975年）',
    ko: '항불·항미 전쟁기 (1946 - 1975)',
    zh: '抗法与抗美战争时期（1946 - 1975）'
  }
};

// Multilingual Region Dictionary
export const REGION_MULTILINGUAL: Record<string, Record<string, string>> = {
  north: { en: 'Northern Vietnam', fr: 'Nord du Vietnam', ja: 'ベトナム北部', ko: '베트남 북부', zh: '越南北部' },
  central: { en: 'Central Vietnam', fr: 'Centre du Vietnam', ja: 'ベトナム中部', ko: '베트남 중부', zh: '越南中部' },
  south: { en: 'Southern Vietnam', fr: 'Sud du Vietnam', ja: 'ベトナム南部', ko: '베트남 남부', zh: '越南南部' }
};
export const HERITAGE_ENGLISH_DETAILS: Record<string, Partial<LocalizedHeritageContent>> = {
  'dai-noi-hue': {
    name: 'Hue Imperial Citadel (The Purple Forbidden City)',
    categoryLabel: 'Imperial Palace & Citadel',
    province: 'Thua Thien Hue',
    period: 'Nguyen Dynasty (1802 - 1945)',
    history: 'Commissioned in 1804 under Emperor Gia Long and completed in 1833 under Emperor Minh Mang. The Hue Imperial City was the political and administrative headquarters of 13 Nguyen Dynasty monarchs for 143 years.',
    culturalSignificance: 'Inscribed as a UNESCO World Cultural Heritage site in 1993. It represents the pinnacle of traditional Vietnamese royal architecture, gracefully blending Eastern Feng Shui philosophy with Western Vauban military fortifications.',
    visitingHours: '07:30 - 17:30 Daily',
    ticketPrice: '200,000 VND / Adult',
    address: '23/8 Street, Thuan Thanh Ward, Hue City',
    interestingFacts: [
      'The Meridian Gate (Ngo Mon) has 5 entrances, with the central gate reserved exclusively for the Emperor.',
      'The entire citadel complex was designed with Feng Shui orientation aligning with Mount Ngu Binh and the Perfume River as natural barriers.'
    ],
    audioNarration: 'Welcome to the Imperial Citadel of Hue, the royal capital of the Nguyen Dynasty and a UNESCO World Cultural Heritage site.'
  },
  'van-mieu-quoc-tu-giam': {
    name: 'Temple of Literature & First National University Hanoi',
    categoryLabel: 'Historical Monument & Education',
    province: 'Hanoi',
    period: 'Ly, Tran & Later Le Dynasties',
    history: 'Built in 1070 under Emperor Ly Thanh Tong to honor Confucius. In 1076, Quoc Tu Giam (Imperial Academy) was established adjacent as Vietnam first royal university.',
    culturalSignificance: 'Special National Landmark of Vietnam. The 82 Doctors Stelae recording imperial examination laureates from 1442 to 1779 are recognized in the UNESCO Memory of the World Register.',
    visitingHours: '08:00 - 17:00 Daily',
    ticketPrice: '70,000 VND / Adult',
    address: '58 Quoc Tu Giam Street, Dong Da District, Hanoi',
    interestingFacts: [
      'The 82 Doctor stone stelae rest upon carved stone turtles, symbolizing enduring wisdom and scholarly devotion.',
      'Khue Van Cac (Pavilion of the Constellation of Literature) built in 1805 is the official emblem of the capital city of Hanoi.'
    ],
    audioNarration: 'Welcome to the Temple of Literature in Hanoi, the cradle of thousand-year Confucian learning and scholars in Vietnam.'
  },
  'pho-co-hoi-an': {
    name: 'Hoi An Ancient Town',
    categoryLabel: 'Ancient Town World Heritage',
    province: 'Quang Nam',
    period: '16th - 19th Centuries',
    history: 'A bustling international trading port from the 16th to 19th centuries along the maritime Silk Road, welcoming merchants from Japan, China, Portugal, and the Netherlands.',
    culturalSignificance: 'Inscribed by UNESCO as a World Cultural Heritage site in 1999. It stands as an exceptionally preserved example of a traditional South-East Asian trading port.',
    visitingHours: 'Open 24/7 (Old town walking hours: 08:30 - 21:30)',
    ticketPrice: '120,000 VND / International Ticket',
    address: 'Old Quarter, Hoi An City, Quang Nam',
    interestingFacts: [
      'The Japanese Covered Bridge (Chua Cau) constructed in the 17th century appears on Vietnam 20,000 VND banknote.',
      'During the full moon lantern festival every lunar month, electric lights are turned off and thousands of silk lanterns illuminate the river.'
    ],
    audioNarration: 'Welcome to Hoi An Ancient Town, where lantern-lit alleys and centuries-old merchant houses echo the maritime Silk Road.'
  },
  'trang-an-ninh-binh': {
    name: 'Trang An Landscape Complex & Ancient Capital of Hoa Lu',
    categoryLabel: 'Mixed Natural & Cultural World Heritage',
    province: 'Ninh Binh',
    period: 'Dinh, Early Le & Ly Dynasties',
    history: 'Served as the royal capital of Dai Co Viet under the Dinh and Early Le dynasties (10th century) before King Ly Thai To moved the capital to Thang Long (Hanoi) in 1010.',
    culturalSignificance: 'Inscribed as Southeast Asia first UNESCO Mixed Natural and Cultural World Heritage in 2014, praised for both sublime karst landscape and archaeological evidence of prehistoric humans.',
    visitingHours: '07:00 - 17:00 Daily',
    ticketPrice: '250,000 VND / Person (includes boat tour)',
    address: 'Trang An Eco-tourism Area, Ninh Binh',
    interestingFacts: [
      'The traditional rowers skilfully use both feet to paddle wooden boats across limestone river caves.',
      'Trang An served as the primary filming backdrop for the Hollywood blockbuster movie Kong: Skull Island.'
    ],
    audioNarration: 'Welcome to Trang An, a breathtaking realm of emerald waterways and dramatic karst peaks in ancient Ninh Binh.'
  },
  'chua-thien-mu': {
    name: 'Thien Mu Pagoda (Linh Mu Pagoda)',
    categoryLabel: 'Buddhist Temple & Pagoda',
    province: 'Thua Thien Hue',
    period: 'Year 1601 (Lord Nguyen Hoang)',
    history: 'Founded in 1601 by Lord Nguyen Hoang following a folk prophecy of a heavenly lady (Thien Mu) forecasting the arrival of a great ruler on Ha Khe hill.',
    culturalSignificance: 'The oldest and most symbolic pagoda in Hue, perched atop Ha Khe hill by the Perfume River, renowned for the seven-story Phuoc Duyen octagonal tower built in 1844.',
    visitingHours: '07:30 - 17:30 Daily',
    ticketPrice: 'Free Admission',
    address: 'Kim Long Road, Huong Long Ward, Hue City',
    interestingFacts: [
      'The Phuoc Duyen tower rises 21 meters with 7 stories, each dedicated to a different reincarnation of Buddha.',
      'The famous bronze bell cast in 1710 weighs over two tons and can be heard resounding across the Perfume River.'
    ],
    audioNarration: 'Welcome to Thien Mu Pagoda, an ancient spiritual haven overlooking the peaceful Perfume River in Hue.'
  },
  'dinh-doc-lap': {
    name: 'Independence Palace (Reunification Hall)',
    categoryLabel: 'Revolutionary Historical Monument',
    province: 'Ho Chi Minh City',
    period: '20th Century (1966)',
    history: 'Designed by architect Ngo Viet Thu and inaugurated in 1966. On April 30, 1975, tanks 843 and 390 broke through the iron gates, marking the end of the Vietnam War.',
    culturalSignificance: 'Special National Monument of Vietnam. An architectural masterpiece synthesizing modernist design with Eastern philosophy (symbolizing the Chinese characters Cat, Khau, Trung, Tam).',
    visitingHours: '08:00 - 16:30 Daily',
    ticketPrice: '40,000 - 65,000 VND / Ticket',
    address: '135 Nam Ky Khoi Nghia, District 1, Ho Chi Minh City',
    interestingFacts: [
      'The aerial view of the palace layout forms the Chinese character Cat (good fortune) and Khau (order).',
      'The basement bunker features a complete communication headquarters resilient against aerial bombardment.'
    ],
    audioNarration: 'Welcome to the Independence Palace in Ho Chi Minh City, a historic witness to the pivotal moments of modern Vietnam.'
  },
  'thanh-dia-my-son': {
    name: 'My Son Sanctuary',
    categoryLabel: 'Ancient Cham Pa Towers Sanctuary',
    province: 'Quang Nam',
    period: '4th - 13th Century (Champa Kingdom)',
    history: 'Religious capital and royal burial ground for kings of the ancient Champa kingdom from the 4th to 13th centuries, dedicated to Shiva.',
    culturalSignificance: 'Recognized by UNESCO as a World Cultural Heritage site in 1999. Known for unique mortarless brick construction technology that remains an architectural wonder.',
    visitingHours: '06:30 - 17:00 Daily',
    ticketPrice: '150,000 VND / International Ticket',
    address: 'Duy Phu Commune, Duy Xuyen District, Quang Nam',
    interestingFacts: [
      'The red bricks were joined with mysterious plant resin without visible mortar lines, standing firm for over a millennium.',
      'My Son was once considered as significant to Champa civilization as Angkor Wat to Cambodia or Pagan to Myanmar.'
    ],
    audioNarration: 'Welcome to My Son Sanctuary, an evocative valley of sacred red-brick Cham towers honoring Lord Shiva.'
  },
  'vinh-ha-long': {
    name: 'Ha Long Bay World Natural Heritage',
    categoryLabel: 'World Natural Heritage',
    province: 'Quang Ninh',
    period: '500-million-year Geological Formation',
    history: 'Formed through over 500 million years of geological karst development and sea transgression, creating nearly 2,000 limestone islands rising from jade waters.',
    culturalSignificance: 'Twice recognized by UNESCO as World Natural Heritage (1994, 2000) and one of the New 7 Wonders of Nature, rich in prehistoric Soi Nhu and Cai Beo cultures.',
    visitingHours: 'Day and overnight boat cruises daily',
    ticketPrice: '290,000 VND / Sightseeing Route Ticket',
    address: 'Ha Long City, Quang Ninh Province',
    interestingFacts: [
      'According to legend, celestial dragons descended to spit jewels and emeralds that transformed into island fortresses.',
      'In 2023, UNESCO officially extended the World Heritage boundary to include the Cat Ba Archipelago.'
    ],
    audioNarration: 'Welcome to Ha Long Bay, a legendary seascape of thousands of limestone pillars emerging from emerald waters.'
  },
  'phong-nha-ke-bang': {
    name: 'Phong Nha - Ke Bang National Park & Son Doong Cave',
    categoryLabel: 'World Natural Heritage',
    province: 'Quang Binh',
    period: '500-million-year Geological Formation',
    history: 'Features the oldest karst mountains in Asia dating back 400 million years, sheltering hundreds of caves including Son Doong, the largest natural cave on Earth.',
    culturalSignificance: 'Recognized by UNESCO as World Natural Heritage in 2003 and 2015 for both exceptional geology and outstanding biodiversity.',
    visitingHours: '07:30 - 16:30 Daily',
    ticketPrice: '150,000 VND / Phong Nha Cave (plus boat fare)',
    address: 'Son Trach, Bo Trach District, Quang Binh',
    interestingFacts: [
      'Son Doong cave is large enough to house a 40-story skyscraper or fly a Boeing 747 airplane inside its main cavern.',
      'The cave possesses its own localized weather system, clouds, and an underground prehistoric jungle.'
    ],
    audioNarration: 'Welcome to Phong Nha - Ke Bang, the subterranean kingdom of world-record caverns and pristine rainforest.'
  },
  'chua-bai-dinh': {
    name: 'Bai Dinh Temple Complex',
    categoryLabel: 'Buddhist Temple & Pagoda',
    province: 'Ninh Binh',
    period: '11th - 21st Centuries',
    history: 'Comprises the ancient 1,000-year-old Bai Dinh Pagoda founded by Zen master Nguyen Minh Khong and the expansive new pagoda complex built in the 2000s.',
    culturalSignificance: 'The largest Buddhist temple complex in Vietnam, holding multiple Asian records including the longest Arhat corridor and the largest gilded bronze Buddha statue in Asia.',
    visitingHours: '06:00 - 21:00 Daily',
    ticketPrice: 'Free Admission (Electric shuttle: 30,000 VND/trip)',
    address: 'Gia Sinh Commune, Gia Vien District, Ninh Binh',
    interestingFacts: [
      'Houses an Arhat corridor stretching 3 kilometers with 500 intricately carved monolithic bluestone statues.',
      'The Great Bell tower holds a 36-ton bronze bell, the largest in Vietnam.'
    ],
    audioNarration: 'Welcome to Bai Dinh Pagoda, a colossal spiritual complex holding numerous Asian Buddhist records.'
  },
  'thap-ba-ponagar': {
    name: 'Po Nagar Cham Towers Nha Trang',
    categoryLabel: 'Ancient Cham Pa Towers Sanctuary',
    province: 'Khanh Hoa (Nha Trang)',
    period: '8th - 13th Centuries',
    history: 'Constructed between the 8th and 13th centuries by the Champa kingdom to worship goddess Yan Po Nagar, the sacred mother of the land.',
    culturalSignificance: 'Special National Monument. A living spiritual center where both Cham and Vietnamese communities practice ritual worship and annual festivals.',
    visitingHours: '06:00 - 18:00 Daily',
    ticketPrice: '30,000 VND / Person',
    address: '2 Thap Ba Road, Vinh Phuoc, Nha Trang City',
    interestingFacts: [
      'The main tower stands 23 meters high, housing a black granite statue of Goddess Po Nagar seated on a lotus throne.',
      'The annual Po Nagar festival (lunar March) features vibrant Cham fan dances and sacred cleansing ceremonies.'
    ],
    audioNarration: 'Welcome to Po Nagar Cham Towers in Nha Trang, an ancient temple celebrating the maternal goddess of Champa.'
  },
  'fansipan-sapa': {
    name: 'Fansipan Peak - Roof of Indochina & Sapa Valley',
    categoryLabel: 'Natural Wonder & Ethnic Culture',
    province: 'Lao Cai (Sapa)',
    period: 'Modern Era & Pristine Nature',
    history: 'At 3,143 meters above sea level, Fansipan is the highest mountain peak in Vietnam, Laos, and Cambodia, situated in the dramatic Hoang Lien Son range.',
    culturalSignificance: 'A sacred national landmark and eco-tourism marvel where alpine nature meets the vibrant cultural traditions of the Hmong, Red Dao, and Tay ethnic peoples.',
    visitingHours: '08:00 - 17:30 Daily (Cable car schedule)',
    ticketPrice: '850,000 VND / Round-trip Cable Car',
    address: 'Sapa Town, Lao Cai Province',
    interestingFacts: [
      'The Fansipan cable car achieved two Guinness World Records for the longest three-rope cable car system.',
      'A majestic bronze Great Amitabha Buddha statue sits atop the mountain ridge amidst shifting sea of clouds.'
    ],
    audioNarration: 'Welcome to Fansipan Peak, the Roof of Indochina, where towering peaks touch the clouds above Sapa.'
  },
  'cau-vang-bana-hills': {
    name: 'Golden Bridge & Ba Na Hills',
    categoryLabel: 'Architectural & Iconic Landmark',
    province: 'Da Nang',
    period: 'Year 2018 (Contemporary Iconic)',
    history: 'Originally established in 1919 by French colonial officials as a cool mountain hill station, transformed in modern times into a globally acclaimed cultural resort.',
    culturalSignificance: 'The Golden Bridge, held aloft by two giant moss-covered stone hands emerging from the cliff, became an international architectural sensation praised by Time magazine.',
    visitingHours: '07:30 - 21:00 Daily',
    ticketPrice: '900,000 VND / Adult All-inclusive Ticket',
    address: 'Hoa Vang District, Da Nang City',
    interestingFacts: [
      'The bridge spans 150 meters across the cliffside, positioned 1,414 meters above sea level with views over Da Nang Bay.',
      'The hands were meticulously sculpted with fiberglass and wire mesh to mimic weathered ancient stone.'
    ],
    audioNarration: 'Welcome to the Golden Bridge at Ba Na Hills, a world-famous architectural marvel suspended high above Da Nang.'
  },
  'cho-ben-thanh': {
    name: 'Ben Thanh Market - Cultural Heart of Saigon',
    categoryLabel: 'Historic Architectural Landmark',
    province: 'Ho Chi Minh City',
    period: 'Year 1914 (French Colonial Period)',
    history: 'Constructed between 1912 and 1914 by French contractor Brossard et Maupin, replacing the older wet market by the Ben Nghe canal.',
    culturalSignificance: 'An enduring cultural emblem of Ho Chi Minh City. Renowned for its iconic southern clock tower and bustling stalls filled with southern handicrafts and cuisine.',
    visitingHours: '06:00 - 18:00 (Day Market), 18:00 - 22:00 (Night Market)',
    ticketPrice: 'Free Admission',
    address: 'Le Loi Street, Ben Thanh Ward, District 1, Ho Chi Minh City',
    interestingFacts: [
      'The iconic south gate clock tower has ticked continuously for more than a century as the city visual trademark.',
      'Ben Thanh Market features four main entrances facing four cardinal directions, each adorned with distinctive ceramic relief art.'
    ],
    audioNarration: 'Welcome to Ben Thanh Market, the century-old bustling heart and culinary soul of Ho Chi Minh City.'
  },
  'thac-ban-gioc': {
    name: 'Ban Gioc Waterfall - Northeast Natural Masterpiece',
    categoryLabel: 'National Scenic Landscape',
    province: 'Cao Bang',
    period: 'Natural Wonder',
    history: 'Formed along the Quy Xuan river in the karst plateau of Non Nuoc Cao Bang UNESCO Global Geopark.',
    culturalSignificance: 'The largest natural waterfall in Southeast Asia and the 4th largest cross-border waterfall in the world, famed for its cascading tiered limestone terraces.',
    visitingHours: '07:00 - 18:00 Daily',
    ticketPrice: '40,000 VND / Ticket',
    address: 'Dam Thuy Commune, Trung Khanh District, Cao Bang',
    interestingFacts: [
      'During the autumn harvest (September - October), the waterfall is framed by golden ripening rice fields and crystal clear turquoise water.',
      'In October 2023, Vietnam and China officially piloted a joint bilateral tourist zone across the waterfall.'
    ],
    audioNarration: 'Welcome to Ban Gioc Waterfall in Cao Bang, a thunderous and majestic wonder of northern Vietnam.'
  },
  'dia-dao-cu-chi': {
    name: 'Cu Chi Tunnels Historical Complex',
    categoryLabel: 'Revolutionary Historical Monument',
    province: 'Ho Chi Minh City',
    period: 'Resistance War Period (1946 - 1975)',
    history: 'An intricate subterranean defense network hand-dug by soldiers and civilians from 1946 during the anti-colonial resistance and expanded greatly in the 1960s.',
    culturalSignificance: 'Special National Monument. Over 250 kilometers of interconnected multi-level tunnels equipped with living quarters, kitchens, hospitals, and command posts.',
    visitingHours: '07:00 - 17:00 Daily',
    ticketPrice: '70,000 - 110,000 VND / Ticket',
    address: 'Phu Hiep, Cu Chi District, Ho Chi Minh City',
    interestingFacts: [
      'The famous Hoang Cam smokeless stove allowed troops to cook underground while diffusing smoke horizontally across the forest floor.',
      'The narrow tunnel entrances were camouflaged beneath termite mounds and fallen foliage.'
    ],
    audioNarration: 'Welcome to Cu Chi Tunnels, an extraordinary underground fortress demonstrating legendary resilience.'
  },
  'nui-ba-den': {
    name: 'Ba Den Mountain - Roof of Southern Vietnam',
    categoryLabel: 'Scenic Landscape & Spiritual Center',
    province: 'Tay Ninh',
    period: '17th Century - Present',
    history: 'An extinct volcanic peak rising 986 meters above the southern plains, linked to the revered legend of Lady Linh Son Thanh Mau (Ba Den).',
    culturalSignificance: 'The highest mountain peak in southern Vietnam and a major pilgrimage center, housing ancient pagodas alongside the world tallest bronze Lady Buddha statue on a mountain peak.',
    visitingHours: '06:00 - 22:00 Daily',
    ticketPrice: '350,000 - 550,000 VND (Cable car ticket)',
    address: 'Thanh Tan Commune, Tay Ninh City',
    interestingFacts: [
      'The bronze statue of Tay Bo Da Son Lady Buddha atop the peak stands 72 meters tall and was cast from 170 tons of red copper.',
      'The mountain frequently exhibits a rare halo cloud formation resembling a flying saucer crown atop its peak.'
    ],
    audioNarration: 'Welcome to Ba Den Mountain in Tay Ninh, the Roof of Southern Vietnam and sacred spiritual sanctuary.'
  },
  'chua-huong': {
    name: 'Perfume Pagoda Complex (Huong Son Landscape)',
    categoryLabel: 'Scenic Landscape & Spiritual Center',
    province: 'Hanoi',
    period: 'Restored Le Period (17th Century)',
    history: 'A vast religious complex built into the Huong Tich limestone mountain range along the Yen stream, dating back to the late 17th century.',
    culturalSignificance: 'Special National Monument. The annual Perfume Pagoda festival is the longest-running pilgrimage festival in Vietnam, drawing millions to worship Bodhisattva Avalokiteshvara in the natural cave shrine.',
    visitingHours: '06:00 - 18:00 Daily (Festival: Jan - March Lunar)',
    ticketPrice: '130,000 VND / Ticket & Boat Fare',
    address: 'Huong Son Commune, My Duc District, Hanoi',
    interestingFacts: [
      'Lord Trinh Sam in 1770 personally inscribed five Chinese characters at the entrance of Huong Tich Cave: Nam Thien De Nhat Dong (The Foremost Sacred Cave of the Southern Realm).',
      'The traditional journey begins with an hour-long rowing boat trip along the scenic Yen Stream amidst lotus blooms.'
    ],
    audioNarration: 'Welcome to the Perfume Pagoda, a revered cave sanctuary set amidst limestone hills and peaceful streams.'
  },
  'mui-ne-poshanu': {
    name: 'Mui Ne Sand Dunes & Poshanu Cham Towers',
    categoryLabel: 'Coastal Landscape & Ancient Tower',
    province: 'Binh Thuan (Mui Ne)',
    period: '8th - 9th Centuries',
    history: 'The Poshanu Cham tower complex on Ba Nai hill was constructed in the late 8th century by the Champa Kingdom to worship Shiva and Princess Poshanu.',
    culturalSignificance: 'One of the oldest surviving Cham architectural groups in the Hoa Lai style, set against the dramatic rolling red and white sand dunes of Mui Ne.',
    visitingHours: '07:00 - 17:30 Daily',
    ticketPrice: '15,000 VND / Tower Ticket',
    address: 'Phu Hai Ward, Phan Thiet City, Binh Thuan',
    interestingFacts: [
      'The Red and White Sand Dunes of Mui Ne change their sculptured shapes every day due to coastal ocean breezes.',
      'Local Cham people continue to perform the Kate festival here annually with traditional Saranai flutes and Paranung drums.'
    ],
    audioNarration: 'Welcome to Mui Ne and Poshanu Cham Towers, where ancient brick temples meet sweeping coastal dunes.'
  },
  'phu-quoc-dinh-cau': {
    name: 'Phu Quoc Pearl Island & Dinh Cau Temple',
    categoryLabel: 'Island Landscape & Spiritual Sanctuary',
    province: 'Kien Giang (Phu Quoc)',
    period: 'Year 1937 (Reconstructed)',
    history: 'Perched on a rugged natural rock promontory by Duong Dong harbor, built in the early 20th century by island fishermen seeking blessings for peaceful seas.',
    culturalSignificance: 'The spiritual symbol and maritime guardian of Phu Quoc Island, famous for dramatic ocean sunsets over the Gulf of Thailand.',
    visitingHours: 'Open 24/7 (Free Entry)',
    ticketPrice: 'Free Admission',
    address: 'Zone 2, Duong Dong, Phu Quoc City, Kien Giang',
    interestingFacts: [
      'Fishermen always visit the temple before embarking on offshore squid and fish expeditions to pray for safe returns.',
      'The temple is built on an unusual geological rock outcrop that has withstood ocean tempests for centuries.'
    ],
    audioNarration: 'Welcome to Dinh Cau Temple on Phu Quoc Island, the sacred guardian of sea voyagers overlooking the ocean.'
  }
};

/**
 * Returns a fully localized representation of any HeritageItem.
 * Never modifies or strips original Vietnamese properties.
 */

// Non-English multilingual details (fr, ja, ko, zh)
export const HERITAGE_OTHER_LANG_DETAILS: Record<string, Record<string, Partial<LocalizedHeritageContent>>> = {
  'dai-noi-hue': {
    fr: {
      name: 'Cité Impériale de Hué (La Cité Pourpre Interdite)',
      categoryLabel: 'Palais impérial et citadelle',
      province: 'Thua Thien Hue',
      period: 'Dynastie des Nguyen (1802 - 1945)',
      culturalSignificance: 'Inscrite au patrimoine mondial de l UNESCO en 1993. Chef-d œuvre de l architecture royale vietnamienne, associant la philosophie orientale du Feng Shui aux fortifications de Vauban.',
      history: 'Construite à partir de 1804 sous l empereur Gia Long et achevée en 1833 sous Minh Mang. Elle a été le cœur politique et impérial de 13 monarques Nguyen pendant 143 ans.',
      visitingHours: '07:30 - 17:30 Tous les jours',
      ticketPrice: '200 000 VND / Adulte, 40 000 VND / Enfant',
      audioNarration: 'Bienvenue dans la Cité Impériale de Hué, joyau royal de la dynastie des Nguyen inscrit au patrimoine mondial de l UNESCO.'
    },
    ja: {
      name: 'フエ王宮・紫禁城',
      categoryLabel: '皇城・宮殿',
      province: 'トゥアティエン・フエ',
      period: 'グエン朝（1802〜1945年）',
      culturalSignificance: '1993年にベトナム初の世界文化遺産としてユネスコに登録。東洋の風水思想と西洋のヴォーバン式城郭が見事に調和した木造建築の最高傑作です。',
      history: '1804年にザーロン帝によって着工され、1833年にミンマン帝の治世で完成。グエン朝13代の皇帝が143年間にわたり統治した王朝の中心地です。',
      visitingHours: '07:30 - 17:30 毎日',
      ticketPrice: '大人 200,000 VND / 子供 40,000 VND',
      audioNarration: 'グエン朝の栄華を今に伝えるユネスコ世界文化遺産、フエ王宮へようこそ。'
    },
    ko: {
      name: '후에 황성 (자금성)',
      categoryLabel: '황성 및 궁궐',
      province: '트어티엔후에',
      period: '응우옌 왕조 (1802 - 1945)',
      culturalSignificance: '1993년 유네스코 세계문화유산 등재. 동양의 풍수지리 사상과 서양의 요새 건축이 조화를 이룬 베트남 왕실 건축의 정점입니다.',
      history: '1804년 자롱 황제 때 착공하여 1833년 민망 황제 때 완공되었습니다. 143년 동안 13명의 응우옌 황제가 통치했던 중심지입니다.',
      visitingHours: '07:30 - 17:30 매일',
      ticketPrice: '성인 200,000 VND / 어린이 40,000 VND',
      audioNarration: '베트남 마지막 왕조의 찬란한 역사를 품은 유네스코 세계문화유산, 후에 황성에 오신 것을 환영합니다.'
    },
    zh: {
      name: '顺化皇城（大内紫禁城）',
      categoryLabel: '皇城与宫殿',
      province: '承天顺化',
      period: '阮朝（1802 - 1945）',
      culturalSignificance: '1993年被联合国教科文组织列为世界文化遗产。完美融合东方风水哲理与西方要塞工程，是传统皇家宫廷木构建筑的登峰造极之作。',
      history: '于1804年动工，1833年竣工。作为阮朝13位帝王的政治文化中心，见证了越南封建王朝143年的辉煌历史。',
      visitingHours: '07:30 - 17:30 每日开放',
      ticketPrice: '成人 200,000 越南盾，儿童 40,000 越南盾',
      audioNarration: '欢迎来到越南阮朝皇都顺化皇城大内，领略千百载宫廷皇家风范与联合国世界文化遗产的殿堂。'
    }
  },
  'van-mieu-quoc-tu-giam': {
    fr: {
      name: 'Temple de la Littérature & Collège des Fils de la Nation',
      categoryLabel: 'Monument historique et éducation',
      province: 'Hanoï',
      period: 'Dynasties Ly, Tran et Le (Depuis 1070)',
      culturalSignificance: 'Les 82 stèles de docteurs sont inscrites au registre Mémoire du monde de l UNESCO.',
      history: 'Érigé en 1070 sous le règne de Ly Thanh Tong en l honneur de Confucius. Première université royale du Vietnam fondée en 1076.',
      visitingHours: '08:00 - 17:00 Tous les jours',
      ticketPrice: '70 000 VND / Adulte',
      audioNarration: 'Bienvenue au Temple de la Littérature de Hanoï, berceau millénaire de l éducation et de la sagesse vietnamienne.'
    },
    ja: {
      name: 'ハノイ文廟・国子監（ベトナム最古の大学）',
      categoryLabel: '歴史史跡・教育遺産',
      province: 'ハノイ',
      period: '李・陳・黎朝時代（1070年〜）',
      culturalSignificance: '1442年から1779年までの科挙合格者1,304名の名を刻んだ82基の進士題名碑はユネスコ世界記憶遺産に登録されています。',
      history: '1070年に孔子を祀るため創建。1076年にベトナム最初の最高学府・国子監が設立されました。',
      visitingHours: '08:00 - 17:00 毎日',
      ticketPrice: '一般 70,000 VND / 学生 35,000 VND',
      audioNarration: 'ベトナム千年の学問の聖地、ハノイ文廟・国子監へようこそ。'
    },
    ko: {
      name: '하노이 문묘 및 국자감',
      categoryLabel: '역사 유적 및 교육',
      province: '하노이',
      period: '리, 쩐, 레 왕조 (1070년부터)',
      culturalSignificance: '82개의 진사제명비는 유네스코 세계기록유산입니다. 학문과 스승을 공경하는 유교 문화의 상징입니다.',
      history: '1070년 공자를 기리기 위해 세웠으며, 1076년 베트남 최초의 국립대학인 국자감이 설립되었습니다.',
      visitingHours: '08:00 - 17:00 매일',
      ticketPrice: '일반 70,000 VND / 학생 35,000 VND',
      audioNarration: '천년의 학문적 전통과 유교 문화가 살아 숨쉬는 하노이 문묘 및 국자감에 오신 것을 환영합니다.'
    },
    zh: {
      name: '河内文庙 - 国子监',
      categoryLabel: '历史古迹与教育',
      province: '河内',
      period: '李、陈、后黎朝（始于1070年）',
      culturalSignificance: '保存有82座科举进士题名石碑，被列入联合国教科文组织《世界记忆名录》。',
      history: '建于1070年李圣宗时期以祭祀孔子。1076年设国子监，成为越南历史上第一所国立太学。',
      visitingHours: '08:00 - 17:00 每日开放',
      ticketPrice: '全票 70,000 越南盾，学生票 35,000 越南盾',
      audioNarration: '欢迎光临河内文庙国子监，见证越南千百年尊师重道与儒学文脉悠长的殿堂。'
    }
  },
  'pho-co-hoi-an': {
    fr: {
      name: 'Vieille Ville de Hoi An',
      categoryLabel: 'Patrimoine mondial de la ville antique',
      province: 'Quang Nam',
      period: 'XVe - XIXe siècles',
      culturalSignificance: 'Inscrite au patrimoine mondial de l UNESCO en 1999 pour la préservation remarquable de ses ruelles et pagodes.',
      history: 'Ancien port marchand florissant d Asie du Sud-Est entre le XVe et le XIXe siècle le long de la Route maritime de la Soie.',
      visitingHours: 'Accessible 24h/24',
      ticketPrice: '120 000 VND / Billet',
      audioNarration: 'Bienvenue dans la vieille ville de Hoi An, un joyau préservé au bord de la rivière Thu Bon.'
    },
    ja: {
      name: 'ホイアン古都（世界遺産）',
      categoryLabel: '古都・世界文化遺産',
      province: 'クアンナム',
      period: '15世紀〜19世紀',
      culturalSignificance: '1999年にユネスコ世界文化遺産に登録。黄色い街並みと日本橋が有名です。',
      history: '15世紀から19世紀にかけて海のシルクロードの要衝として栄えた国際貿易港町。',
      visitingHours: '24時間散策可能',
      ticketPrice: '見学パス 120,000 VND',
      audioNarration: 'ノスタルジックな黄色い街並みと色鮮やかなランタンが灯るユネスコ世界遺産、ホイアン旧市街へようこそ。'
    },
    ko: {
      name: '호이안 고대 도시',
      categoryLabel: '고대 도시 세계문화유산',
      province: '꽝남',
      period: '15세기 - 19세기',
      culturalSignificance: '1999년 유네스코 세계문화유산 등재. 황금빛 고택들과 내원교 등 1,000여 채 전통 가옥이 보존되어 있습니다.',
      history: '15세기부터 19세기까지 동서양을 잇는 해상 실크로드의 대표적인 국제 무역항으로 번영했습니다.',
      visitingHours: '24시간 상시 개방',
      ticketPrice: '관람권 120,000 VND',
      audioNarration: '다채로운 비단 등불과 옛 정취가 가득한 유네스코 세계문화유산 호이안 고대 도시에 오신 것을 환영합니다.'
    },
    zh: {
      name: '会安古镇（世界文化遗产）',
      categoryLabel: '古镇世界文化遗产',
      province: '广南',
      period: '15 - 19世纪',
      culturalSignificance: '1999年列入世界文化遗产。完整保存了千余幢传统黄墙古屋与著名的日本廊桥。',
      history: '15至19世纪曾是东南亚海上丝绸之路繁盛鼎盛的国际商港。',
      visitingHours: '24小时全天候开放',
      ticketPrice: '通票 120,000 越南盾',
      audioNarration: '欢迎漫步于会安古镇，在摇曳的七彩灯笼与百年黄墙古屋间，聆听古商埠的悠扬岁月。'
    }
  },
  'trang-an-ninh-binh': {
    fr: {
      name: 'Complexe Paysager de Trang An & Hoa Lu',
      categoryLabel: 'Patrimoine mondial mixte naturel et culturel',
      province: 'Ninh Binh',
      period: 'Dynasties Dinh, Le antérieur et Ly',
      culturalSignificance: 'Premier site mixte (naturel et culturel) d Asie du Sud-Est inscrit au patrimoine mondial de l UNESCO en 2014.',
      history: 'Ancienne capitale royale du Dai Co Viet au Xe siècle avant le transfert à Hanoï en 1010.',
      visitingHours: '07:00 - 17:00 Tous les jours',
      ticketPrice: '250 000 VND / Personne (barque incluse)',
      audioNarration: 'Bienvenue à Trang An, sanctuaire majestueux de pitons karstiques et de rivières émeraude.'
    },
    ja: {
      name: 'チャンアン複合景観・古都ホアルー',
      categoryLabel: '複合世界遺産（自然・文化）',
      province: 'ニンビン',
      period: '丁・前黎・李朝時代',
      culturalSignificance: '2014年に東南アジア初のユネスコ複合世界遺産（自然・文化）に登録。',
      history: '968年に建国された大瞿越の古都。壮大なカルスト山群と地下水路が広がります。',
      visitingHours: '07:00 - 17:00 毎日',
      ticketPrice: 'ボート乗船料込み 250,000 VND',
      audioNarration: '陸のハロン湾と称えられる東南アジア初の複合世界遺産、ニンビンのチャンアンへようこそ。'
    },
    ko: {
      name: '짱안 경관 단지 및 고도 호아루',
      categoryLabel: '복합 세계유산 (자연 및 문화)',
      province: '닌빈',
      period: '딘, 전레, 리 왕조',
      culturalSignificance: '2014년 동남아시아 최초로 등재된 유네스코 복합 세계유산입니다.',
      history: '968년 딘보린 황제가 세운 대구월국의 첫 수도였습니다.',
      visitingHours: '07:00 - 17:00 매일',
      ticketPrice: '나룻배 투어 포함 250,000 VND',
      audioNarration: '육지의 하롱베이라 불리는 유네스코 복합 세계유산, 닌빈 짱안에 오신 것을 환영합니다.'
    },
    zh: {
      name: '长安名胜景观群与华闾古都',
      categoryLabel: '世界复合遗产（自然与文化）',
      province: '宁平',
      period: '丁、前黎、李朝',
      culturalSignificance: '2014年被评为东南亚首个联合国自然与文化双重世界遗产。',
      history: '968年丁先皇建立大瞿越国建都于华闾。',
      visitingHours: '07:00 - 17:00 每日开放',
      ticketPrice: '每人 250,000 越南盾（含木船游览）',
      audioNarration: '欢迎莅临素有“陆上下龙湾”之称的联合国自然与文化双遗产——宁平长安名胜群。'
    }
  },
  'vinh-ha-long': {
    fr: {
      name: 'Baie d Halong - Archipel de Cat Ba',
      categoryLabel: 'Patrimoine naturel mondial',
      province: 'Quang Ninh',
      period: 'Formation géologique de 500 millions d années',
      culturalSignificance: 'Inscrite au patrimoine mondial de l UNESCO en 1994, avec près de 2 000 îlots karstiques émergeant des eaux émeraude.',
      history: 'Légende selon laquelle des dragons crachèrent des perles devenues milliers d îles pour protéger le royaume.',
      visitingHours: '06:30 - 18:30 Tous les jours',
      ticketPrice: '290 000 VND / Circuit',
      audioNarration: 'Bienvenue dans la baie d Halong, merveille émeraude inscrite au patrimoine naturel de l UNESCO.'
    },
    ja: {
      name: 'ハロン湾・カットバ群島（世界遺産）',
      categoryLabel: '世界自然遺産',
      province: 'クアンニン',
      period: '5億年の地質学的形成',
      culturalSignificance: '1994年と2000年にユネスコ世界自然遺産に登録。エメラルド色の海に約2,000の奇岩島が浮かびます。',
      history: '龍が舞い降りて宝玉を吐き出し、島々を造ったという伝説があります。',
      visitingHours: '06:30 - 18:30 毎日',
      ticketPrice: '290,000 VND / ルート',
      audioNarration: '天上の龍が織りなした海の奇跡、ユネスコ世界自然遺産ハロン湾へようこそ。'
    },
    ko: {
      name: '하롱베이 및 깟바 군도',
      categoryLabel: '세계자연유산',
      province: '꽝닌',
      period: '5억 년의 지질학적 형성',
      culturalSignificance: '1994년 유네스코 세계자연유산 등재. 비취빛 바다 위로 2,000여 개의 기암괴석이 장관을 이룹니다.',
      history: '용이 하늘에서 내려와 보석을 뿜어내어 섬이 되었다는 전설이 있습니다.',
      visitingHours: '06:30 - 18:30 매일',
      ticketPrice: '290,000 VND / 코스',
      audioNarration: '에메랄드빛 바다와 기암괴석이 빚어낸 천혜의 비경, 하롱베이에 오신 것을 환영합니다.'
    },
    zh: {
      name: '下龙湾 - 吉婆群岛',
      categoryLabel: '世界自然遗产',
      province: '广宁',
      period: '5亿年地质构造演化',
      culturalSignificance: '1994年被列为联合国世界自然遗产。碧蓝海面上矗立着近2,000座千姿百态的喀斯特海蚀石峰。',
      history: '神话传说神龙自天而降，吐出珍珠化作千座碧玉翠岛以御外敌入侵。',
      visitingHours: '06:30 - 18:30 每日开放',
      ticketPrice: '290,000 越南盾 / 线路',
      audioNarration: '欢迎光临世界自然奇观——下龙湾，在这片碧波万顷的翡翠海上领略天工造化的仙境奇景。'
    }
  }
};

/**
 * Returns a fully localized representation of any HeritageItem.
 * Never modifies or strips original Vietnamese properties.
 */
export function getLocalizedHeritage(item: HeritageItem, lang: string = 'vi'): LocalizedHeritageContent {
  if (!item) {
    return {
      name: '',
      categoryLabel: '',
      province: '',
      period: '',
      history: '',
      culturalSignificance: '',
      visitingHours: '',
      ticketPrice: '',
      address: '',
      interestingFacts: [],
      audioNarration: ''
    };
  }

  // 1. Vietnamese native original
  if (lang === 'vi') {
    return {
      name: item.name,
      categoryLabel: item.categoryLabel,
      province: item.province,
      period: item.period || item.dynasty || 'Di tích lịch sử',
      history: item.history,
      culturalSignificance: item.culturalSignificance,
      visitingHours: item.visitingHours || '07:30 - 17:30 hàng ngày',
      ticketPrice: item.ticketPrice || 'Miễn phí / Tùy khu vực',
      address: item.address || item.province,
      interestingFacts: item.interestingFacts || [],
      audioNarration: item.audioNarration || `${item.name}. Vị trí tại ${item.province}. ${item.culturalSignificance}. Lịch sử hình thành: ${item.history}`
    };
  }

  // 2. Check curated English record
  const curatedEn = HERITAGE_ENGLISH_DETAILS[item.id] || HERITAGE_ENGLISH_DETAILS[item.id.toLowerCase().replace(/\s+/g, '-')];
  // Check curated other language record (fr, ja, ko, zh)
  const curatedOther = HERITAGE_OTHER_LANG_DETAILS[item.id]?.[lang] || HERITAGE_OTHER_LANG_DETAILS[item.id.toLowerCase().replace(/\s+/g, '-')]?.[lang];

  const localizedProvince = getLocalizedProvince(item.province, lang);
  const localizedCategory = getLocalizedCategory(item.categoryLabel, lang);
  const localizedPeriod = getLocalizedPeriod(item.period || item.dynasty || '', lang);
  const localizedHours = getLocalizedVisitingHours(item.visitingHours, lang);
  const localizedPrice = getLocalizedTicketPrice(item.ticketPrice, lang);

  const locName = curatedOther?.name || curatedEn?.name || (lang === 'en' ? item.englishName : undefined) || item.name;
  const locCategory = curatedOther?.categoryLabel || curatedEn?.categoryLabel || localizedCategory;
  const locProvince = curatedOther?.province || curatedEn?.province || localizedProvince;
  const locPeriod = curatedOther?.period || curatedEn?.period || localizedPeriod;
  const locHistory = curatedOther?.history || curatedEn?.history || item.history;
  const locSignificance = curatedOther?.culturalSignificance || curatedEn?.culturalSignificance || item.culturalSignificance;
  const locHours = curatedOther?.visitingHours || curatedEn?.visitingHours || localizedHours;
  const locPrice = curatedOther?.ticketPrice || curatedEn?.ticketPrice || localizedPrice;
  const locAddress = curatedOther?.address || curatedEn?.address || (item.address ? `${item.address}, ${locProvince}` : locProvince);
  const locFacts = (curatedOther?.interestingFacts && curatedOther.interestingFacts.length > 0) 
    ? curatedOther.interestingFacts 
    : ((curatedEn?.interestingFacts && curatedEn.interestingFacts.length > 0) ? curatedEn.interestingFacts : (item.interestingFacts || []));

  // Formulate natural language audio narration
  let locNarration = curatedOther?.audioNarration || (lang === 'en' ? curatedEn?.audioNarration : undefined);
  if (!locNarration) {
    if (lang === 'en') {
      locNarration = `Welcome to ${locName}, located in ${locProvince}, Vietnam. ${locSignificance}. Historical background: ${locHistory}`;
    } else if (lang === 'fr') {
      locNarration = `Bienvenue à ${locName}, situé dans la province de ${locProvince}, au Vietnam. ${locSignificance}. Contexte historique : ${locHistory}`;
    } else if (lang === 'ja') {
      locNarration = `ベトナム・${locProvince}に位置する「${locName}」へようこそ。${locSignificance}。歴史的背景：${locHistory}`;
    } else if (lang === 'ko') {
      locNarration = `베트남 ${locProvince}에 위치한 ${locName}에 오신 것을 환영합니다. ${locSignificance}. 형성 역사: ${locHistory}`;
    } else if (lang === 'zh') {
      locNarration = `欢迎来到位于越南${locProvince}的${locName}。${locSignificance}。历史渊源：${locHistory}`;
    } else {
      locNarration = `${locName}. ${locSignificance}. ${locHistory}`;
    }
  }

  return {
    name: locName,
    categoryLabel: locCategory,
    province: locProvince,
    period: locPeriod,
    history: locHistory,
    culturalSignificance: locSignificance,
    visitingHours: locHours,
    ticketPrice: locPrice,
    address: locAddress,
    interestingFacts: locFacts,
    audioNarration: locNarration
  };
}

export function getLocalizedHeritageName(item: HeritageItem, lang: string = 'vi'): string {
  if (lang === 'vi') return item.name;
  const curatedOther = HERITAGE_OTHER_LANG_DETAILS[item.id]?.[lang];
  const curatedEn = HERITAGE_ENGLISH_DETAILS[item.id];
  return curatedOther?.name || curatedEn?.name || (lang === 'en' ? item.englishName : undefined) || item.name;
}

export function getLocalizedProvince(province: string, lang: string = 'vi'): string {
  if (!province || lang === 'vi') return province;
  return PROVINCE_MULTILINGUAL[province]?.[lang] || PROVINCE_MULTILINGUAL[province]?.['en'] || PROVINCE_TRANSLATIONS[province] || province;
}

export function getLocalizedCategory(category: string, lang: string = 'vi'): string {
  if (!category || lang === 'vi') return category;
  return CATEGORY_MULTILINGUAL[category]?.[lang] || CATEGORY_MULTILINGUAL[category]?.['en'] || CATEGORY_TRANSLATIONS[category] || category;
}

export function getLocalizedPeriod(period: string, lang: string = 'vi'): string {
  if (!period || lang === 'vi') return period;
  return PERIOD_MULTILINGUAL[period]?.[lang] || PERIOD_MULTILINGUAL[period]?.['en'] || PERIOD_TRANSLATIONS[period] || period;
}

export function getLocalizedRegion(region: string, lang: string = 'vi'): string {
  if (!region || lang === 'vi') {
    return region === 'north' ? 'Miền Bắc' : region === 'central' ? 'Miền Trung' : 'Miền Nam';
  }
  return REGION_MULTILINGUAL[region]?.[lang] || REGION_MULTILINGUAL[region]?.['en'] || region;
}

export function getLocalizedVisitingHours(hours?: string, lang: string = 'vi'): string {
  if (!hours) return lang === 'en' ? '07:30 - 17:30 Daily' : '07:30 - 17:30 hàng ngày';
  if (lang === 'vi') return hours;

  if (hours.includes('24/7')) {
    if (lang === 'en') return 'Open 24/7';
    if (lang === 'fr') return 'Ouvert 24h/24';
    if (lang === 'ja') return '24時間営業';
    if (lang === 'ko') return '24시간 운영';
    if (lang === 'zh') return '24小时开放';
  }

  if (hours.includes('hàng ngày')) {
    if (lang === 'en') return hours.replace('hàng ngày', 'Daily');
    if (lang === 'fr') return hours.replace('hàng ngày', 'Tous les jours');
    if (lang === 'ja') return hours.replace('hàng ngày', '毎日');
    if (lang === 'ko') return hours.replace('hàng ngày', '매일');
    if (lang === 'zh') return hours.replace('hàng ngày', '每日');
  }

  return hours;
}

export function getLocalizedTicketPrice(price?: string, lang: string = 'vi'): string {
  if (!price) return lang === 'en' ? 'Free / Inquire on-site' : 'Miễn phí / Tùy khu vực';
  if (lang === 'vi') return price;

  if (price.includes('Miễn phí') || price.toLowerCase().includes('free')) {
    if (lang === 'en') return 'Free Admission';
    if (lang === 'fr') return 'Entrée gratuite';
    if (lang === 'ja') return '入場無料';
    if (lang === 'ko') return '무료 입장';
    if (lang === 'zh') return '免费参观';
  }

  let res = price;
  if (lang === 'en') {
    res = res.replace(/người lớn/g, 'Adult').replace(/trẻ em/g, 'Child').replace(/học sinh sinh viên/g, 'Students');
  } else if (lang === 'fr') {
    res = res.replace(/người lớn/g, 'Adulte').replace(/trẻ em/g, 'Enfant').replace(/học sinh sinh viên/g, 'Étudiants');
  } else if (lang === 'ja') {
    res = res.replace(/người lớn/g, '大人').replace(/trẻ em/g, '子供').replace(/học sinh sinh viên/g, '学生');
  } else if (lang === 'ko') {
    res = res.replace(/người lớn/g, '성인').replace(/trẻ em/g, '어린이').replace(/học sinh sinh viên/g, '학생');
  } else if (lang === 'zh') {
    res = res.replace(/người lớn/g, '成人').replace(/trẻ em/g, '儿童').replace(/học sinh sinh viên/g, '学生');
  }

  return res;
}
