import fs from 'fs';
import path from 'path';

// =========================================================================
// 1. DATA CONTRACTS & SCHEMAS
// =========================================================================

export interface AdministrativeUnit {
  code: string; // GSO code (2 digits)
  name: string;
  shortName: string;
  region: 'north' | 'central' | 'south';
  regionName: string;
  lat: number;
  lng: number;
  category: 'thanh_pho_tw' | 'tinh';
  administrativeCenter: string;
  heritageCount?: number;
}

export type HeritageCategoryType =
  | 'monument'           // Di tích lịch sử - cách mạng, thành quách
  | 'scenic_landscape'   // Danh lam thắng cảnh thiên nhiên
  | 'museum'             // Bảo tàng
  | 'cultural_site'      // Công trình kiến trúc nghệ thuật, đình chùa đền tháp
  | 'ecotourism'         // Du lịch sinh thái, Vườn quốc gia
  | 'island_beach'       // Biển đảo, vịnh
  | 'craft_village'      // Làng nghề truyền thống
  | 'community_tourism'; // Du lịch cộng đồng, bản văn hóa

export interface TourismHeritageRecord {
  id: string; // Mã duy nhất
  name: string; // Tên địa điểm chuẩn hóa
  englishName?: string;
  address: string; // Địa chỉ hành chính cụ thể
  province: string; // Tên tỉnh/thành hiện hành
  provinceCode: string; // Mã GSO 2 số
  region: 'north' | 'central' | 'south';
  lat: number; // Tọa độ vĩ độ WGS84
  lng: number; // Tọa độ kinh độ WGS84
  category: HeritageCategoryType;
  categoryLabel: string;
  rankingLevel: 'Di sản Thế giới UNESCO' | 'Quốc gia đặc biệt' | 'Quốc gia' | 'Cấp tỉnh' | 'Khu du lịch Quốc gia' | 'Điểm du lịch tiêu biểu';
  description: string;
  culturalHistoricalValue: string;
  sourceReferences: string[];
  verifiedStatus: 'verified' | 'folk_legend' | 'unverified';
  updatedAt: string;
  missingFields: string[];
  googleMapsQuery: string;
}

export interface AuditReport {
  generatedAt: string;
  totalAdministrativeUnits: number;
  totalRecords: number;
  coverageByProvince: {
    provinceCode: string;
    provinceName: string;
    region: string;
    count: number;
    categories: Record<string, number>;
  }[];
  categoryDistribution: Record<string, number>;
  rankingDistribution: Record<string, number>;
  verifiedRatio: number;
  withCoordinatesRatio: number;
  dataSourcesUsed: string[];
  notes: string[];
}

// =========================================================================
// 2. DANH MỤC 63 ĐƠN VỊ HÀNH CHÍNH THEO CƠ CẤU HIỆN HÀNH (GSO & BỘ NỘI VỤ)
// =========================================================================

export const ADMINISTRATIVE_UNITS_63: AdministrativeUnit[] = [
  // --- MIỀN BẮC (25 TỈNH/THÀNH) ---
  { code: '01', name: 'Thành phố Hà Nội', shortName: 'Hà Nội', region: 'north', regionName: 'Đồng bằng sông Hồng', lat: 21.0285, lng: 105.8542, category: 'thanh_pho_tw', administrativeCenter: 'Quận Hoàn Kiếm' },
  { code: '02', name: 'Tỉnh Hà Giang', shortName: 'Hà Giang', region: 'north', regionName: 'Đông Bắc Bộ', lat: 22.8233, lng: 104.9839, category: 'tinh', administrativeCenter: 'Thành phố Hà Giang' },
  { code: '04', name: 'Tỉnh Cao Bằng', shortName: 'Cao Bằng', region: 'north', regionName: 'Đông Bắc Bộ', lat: 22.6654, lng: 106.2573, category: 'tinh', administrativeCenter: 'Thành phố Cao Bằng' },
  { code: '06', name: 'Tỉnh Bắc Kạn', shortName: 'Bắc Kạn', region: 'north', regionName: 'Đông Bắc Bộ', lat: 22.1470, lng: 105.8348, category: 'tinh', administrativeCenter: 'Thành phố Bắc Kạn' },
  { code: '08', name: 'Tỉnh Tuyên Quang', shortName: 'Tuyên Quang', region: 'north', regionName: 'Đông Bắc Bộ', lat: 21.8235, lng: 105.2144, category: 'tinh', administrativeCenter: 'Thành phố Tuyên Quang' },
  { code: '10', name: 'Tỉnh Lào Cai', shortName: 'Lào Cai', region: 'north', regionName: 'Tây Bắc Bộ', lat: 22.4856, lng: 103.9707, category: 'tinh', administrativeCenter: 'Thành phố Lào Cai' },
  { code: '11', name: 'Tỉnh Điện Biên', shortName: 'Điện Biên', region: 'north', regionName: 'Tây Bắc Bộ', lat: 21.3845, lng: 103.0160, category: 'tinh', administrativeCenter: 'Thành phố Điện Biên Phủ' },
  { code: '12', name: 'Tỉnh Lai Châu', shortName: 'Lai Châu', region: 'north', regionName: 'Tây Bắc Bộ', lat: 22.3995, lng: 103.4750, category: 'tinh', administrativeCenter: 'Thành phố Lai Châu' },
  { code: '14', name: 'Tỉnh Sơn La', shortName: 'Sơn La', region: 'north', regionName: 'Tây Bắc Bộ', lat: 21.3273, lng: 103.9004, category: 'tinh', administrativeCenter: 'Thành phố Sơn La' },
  { code: '15', name: 'Tỉnh Yên Bái', shortName: 'Yên Bái', region: 'north', regionName: 'Tây Bắc Bộ', lat: 21.7168, lng: 104.8970, category: 'tinh', administrativeCenter: 'Thành phố Yên Bái' },
  { code: '17', name: 'Tỉnh Hòa Bình', shortName: 'Hòa Bình', region: 'north', regionName: 'Tây Bắc Bộ', lat: 20.8171, lng: 105.3376, category: 'tinh', administrativeCenter: 'Thành phố Hòa Bình' },
  { code: '19', name: 'Tỉnh Thái Nguyên', shortName: 'Thái Nguyên', region: 'north', regionName: 'Đông Bắc Bộ', lat: 21.5928, lng: 105.8442, category: 'tinh', administrativeCenter: 'Thành phố Thái Nguyên' },
  { code: '20', name: 'Tỉnh Lạng Sơn', shortName: 'Lạng Sơn', region: 'north', regionName: 'Đông Bắc Bộ', lat: 21.8523, lng: 106.7570, category: 'tinh', administrativeCenter: 'Thành phố Lạng Sơn' },
  { code: '22', name: 'Tỉnh Quảng Ninh', shortName: 'Quảng Ninh', region: 'north', regionName: 'Đông Bắc Bộ', lat: 21.0069, lng: 107.2925, category: 'tinh', administrativeCenter: 'Thành phố Hạ Long' },
  { code: '24', name: 'Tỉnh Bắc Giang', shortName: 'Bắc Giang', region: 'north', regionName: 'Đông Bắc Bộ', lat: 21.2731, lng: 106.1946, category: 'tinh', administrativeCenter: 'Thành phố Bắc Giang' },
  { code: '25', name: 'Tỉnh Phú Thọ', shortName: 'Phú Thọ', region: 'north', regionName: 'Đông Bắc Bộ', lat: 21.3227, lng: 105.2280, category: 'tinh', administrativeCenter: 'Thành phố Việt Trì' },
  { code: '26', name: 'Tỉnh Vĩnh Phúc', shortName: 'Vĩnh Phúc', region: 'north', regionName: 'Đồng bằng sông Hồng', lat: 21.3090, lng: 105.6049, category: 'tinh', administrativeCenter: 'Thành phố Vĩnh Yên' },
  { code: '27', name: 'Tỉnh Bắc Ninh', shortName: 'Bắc Ninh', region: 'north', regionName: 'Đồng bằng sông Hồng', lat: 21.1861, lng: 106.0763, category: 'tinh', administrativeCenter: 'Thành phố Bắc Ninh' },
  { code: '30', name: 'Tỉnh Hải Dương', shortName: 'Hải Dương', region: 'north', regionName: 'Đồng bằng sông Hồng', lat: 20.9373, lng: 106.3146, category: 'tinh', administrativeCenter: 'Thành phố Hải Dương' },
  { code: '31', name: 'Thành phố Hải Phòng', shortName: 'Hải Phòng', region: 'north', regionName: 'Đồng bằng sông Hồng', lat: 20.8449, lng: 106.6881, category: 'thanh_pho_tw', administrativeCenter: 'Quận Hồng Bàng' },
  { code: '33', name: 'Tỉnh Hưng Yên', shortName: 'Hưng Yên', region: 'north', regionName: 'Đồng bằng sông Hồng', lat: 20.6464, lng: 106.0511, category: 'tinh', administrativeCenter: 'Thành phố Hưng Yên' },
  { code: '34', name: 'Tỉnh Thái Bình', shortName: 'Thái Bình', region: 'north', regionName: 'Đồng bằng sông Hồng', lat: 20.4463, lng: 106.3366, category: 'tinh', administrativeCenter: 'Thành phố Thái Bình' },
  { code: '35', name: 'Tỉnh Hà Nam', shortName: 'Hà Nam', region: 'north', regionName: 'Đồng bằng sông Hồng', lat: 20.5835, lng: 105.9229, category: 'tinh', administrativeCenter: 'Thành phố Phủ Lý' },
  { code: '36', name: 'Tỉnh Nam Định', shortName: 'Nam Định', region: 'north', regionName: 'Đồng bằng sông Hồng', lat: 20.4344, lng: 106.1683, category: 'tinh', administrativeCenter: 'Thành phố Nam Định' },
  { code: '37', name: 'Tỉnh Ninh Bình', shortName: 'Ninh Bình', region: 'north', regionName: 'Đồng bằng sông Hồng', lat: 20.2506, lng: 105.9745, category: 'tinh', administrativeCenter: 'Thành phố Ninh Bình' },

  // --- MIỀN TRUNG & TÂY NGUYÊN (19 TỈNH/THÀNH) ---
  { code: '38', name: 'Tỉnh Thanh Hóa', shortName: 'Thanh Hóa', region: 'central', regionName: 'Bắc Trung Bộ', lat: 19.8067, lng: 105.7852, category: 'tinh', administrativeCenter: 'Thành phố Thanh Hóa' },
  { code: '40', name: 'Tỉnh Nghệ An', shortName: 'Nghệ An', region: 'central', regionName: 'Bắc Trung Bộ', lat: 18.6796, lng: 105.6813, category: 'tinh', administrativeCenter: 'Thành phố Vinh' },
  { code: '42', name: 'Tỉnh Hà Tĩnh', shortName: 'Hà Tĩnh', region: 'central', regionName: 'Bắc Trung Bộ', lat: 18.3434, lng: 105.9058, category: 'tinh', administrativeCenter: 'Thành phố Hà Tĩnh' },
  { code: '44', name: 'Tỉnh Quảng Bình', shortName: 'Quảng Bình', region: 'central', regionName: 'Bắc Trung Bộ', lat: 17.4690, lng: 106.6200, category: 'tinh', administrativeCenter: 'Thành phố Đồng Hới' },
  { code: '45', name: 'Tỉnh Quảng Trị', shortName: 'Quảng Trị', region: 'central', regionName: 'Bắc Trung Bộ', lat: 16.7500, lng: 107.1856, category: 'tinh', administrativeCenter: 'Thành phố Đông Hà' },
  { code: '46', name: 'Tỉnh Thừa Thiên Huế', shortName: 'Thừa Thiên Huế', region: 'central', regionName: 'Bắc Trung Bộ', lat: 16.4637, lng: 107.5909, category: 'tinh', administrativeCenter: 'Thành phố Huế' },
  { code: '48', name: 'Thành phố Đà Nẵng', shortName: 'Đà Nẵng', region: 'central', regionName: 'Duyên hải Nam Trung Bộ', lat: 16.0544, lng: 108.2022, category: 'thanh_pho_tw', administrativeCenter: 'Quận Hải Châu' },
  { code: '49', name: 'Tỉnh Quảng Nam', shortName: 'Quảng Nam', region: 'central', regionName: 'Duyên hải Nam Trung Bộ', lat: 15.5394, lng: 108.0191, category: 'tinh', administrativeCenter: 'Thành phố Tam Kỳ' },
  { code: '51', name: 'Tỉnh Quảng Ngãi', shortName: 'Quảng Ngãi', region: 'central', regionName: 'Duyên hải Nam Trung Bộ', lat: 15.1205, lng: 108.7923, category: 'tinh', administrativeCenter: 'Thành phố Quảng Ngãi' },
  { code: '52', name: 'Tỉnh Bình Định', shortName: 'Bình Định', region: 'central', regionName: 'Duyên hải Nam Trung Bộ', lat: 13.7820, lng: 109.2197, category: 'tinh', administrativeCenter: 'Thành phố Quy Nhơn' },
  { code: '54', name: 'Tỉnh Phú Yên', shortName: 'Phú Yên', region: 'central', regionName: 'Duyên hải Nam Trung Bộ', lat: 13.0882, lng: 109.3136, category: 'tinh', administrativeCenter: 'Thành phố Tuy Hòa' },
  { code: '56', name: 'Tỉnh Khánh Hòa', shortName: 'Khánh Hòa', region: 'central', regionName: 'Duyên hải Nam Trung Bộ', lat: 12.2388, lng: 109.1967, category: 'tinh', administrativeCenter: 'Thành phố Nha Trang' },
  { code: '58', name: 'Tỉnh Ninh Thuận', shortName: 'Ninh Thuận', region: 'central', regionName: 'Duyên hải Nam Trung Bộ', lat: 11.5653, lng: 108.9950, category: 'tinh', administrativeCenter: 'Thành phố Phan Rang - Tháp Chàm' },
  { code: '60', name: 'Tỉnh Bình Thuận', shortName: 'Bình Thuận', region: 'central', regionName: 'Duyên hải Nam Trung Bộ', lat: 10.9333, lng: 108.1000, category: 'tinh', administrativeCenter: 'Thành phố Phan Thiết' },
  { code: '62', name: 'Tỉnh Kon Tum', shortName: 'Kon Tum', region: 'central', regionName: 'Tây Nguyên', lat: 14.3497, lng: 108.0005, category: 'tinh', administrativeCenter: 'Thành phố Kon Tum' },
  { code: '64', name: 'Tỉnh Gia Lai', shortName: 'Gia Lai', region: 'central', regionName: 'Tây Nguyên', lat: 13.9833, lng: 108.0000, category: 'tinh', administrativeCenter: 'Thành phố Pleiku' },
  { code: '66', name: 'Tỉnh Đắk Lắk', shortName: 'Đắk Lắk', region: 'central', regionName: 'Tây Nguyên', lat: 12.6667, lng: 108.0500, category: 'tinh', administrativeCenter: 'Thành phố Buôn Ma Thuột' },
  { code: '67', name: 'Tỉnh Đắk Nông', shortName: 'Đắk Nông', region: 'central', regionName: 'Tây Nguyên', lat: 12.0040, lng: 107.6903, category: 'tinh', administrativeCenter: 'Thành phố Gia Nghĩa' },
  { code: '68', name: 'Tỉnh Lâm Đồng', shortName: 'Lâm Đồng', region: 'central', regionName: 'Tây Nguyên', lat: 11.9404, lng: 108.4583, category: 'tinh', administrativeCenter: 'Thành phố Đà Lạt' },

  // --- MIỀN NAM (19 TỈNH/THÀNH) ---
  { code: '70', name: 'Tỉnh Bình Phước', shortName: 'Bình Phước', region: 'south', regionName: 'Đông Nam Bộ', lat: 11.5333, lng: 106.8833, category: 'tinh', administrativeCenter: 'Thành phố Đồng Xoài' },
  { code: '72', name: 'Tỉnh Tây Ninh', shortName: 'Tây Ninh', region: 'south', regionName: 'Đông Nam Bộ', lat: 11.3100, lng: 106.0983, category: 'tinh', administrativeCenter: 'Thành phố Tây Ninh' },
  { code: '74', name: 'Tỉnh Bình Dương', shortName: 'Bình Dương', region: 'south', regionName: 'Đông Nam Bộ', lat: 10.9804, lng: 106.6519, category: 'tinh', administrativeCenter: 'Thành phố Thủ Dầu Một' },
  { code: '75', name: 'Tỉnh Đồng Nai', shortName: 'Đồng Nai', region: 'south', regionName: 'Đông Nam Bộ', lat: 10.9574, lng: 106.8427, category: 'tinh', administrativeCenter: 'Thành phố Biên Hòa' },
  { code: '77', name: 'Tỉnh Bà Rịa - Vũng Tàu', shortName: 'Bà Rịa - Vũng Tàu', region: 'south', regionName: 'Đông Nam Bộ', lat: 10.3460, lng: 107.0843, category: 'tinh', administrativeCenter: 'Thành phố Bà Rịa' },
  { code: '79', name: 'Thành phố Hồ Chí Minh', shortName: 'TP. Hồ Chí Minh', region: 'south', regionName: 'Đông Nam Bộ', lat: 10.8231, lng: 106.6297, category: 'thanh_pho_tw', administrativeCenter: 'Quận 1' },
  { code: '80', name: 'Tỉnh Long An', shortName: 'Long An', region: 'south', regionName: 'Đồng bằng sông Cửu Long', lat: 10.5360, lng: 106.4110, category: 'tinh', administrativeCenter: 'Thành phố Tân An' },
  { code: '82', name: 'Tỉnh Tiền Giang', shortName: 'Tiền Giang', region: 'south', regionName: 'Đồng bằng sông Cửu Long', lat: 10.3600, lng: 106.3600, category: 'tinh', administrativeCenter: 'Thành phố Mỹ Tho' },
  { code: '83', name: 'Tỉnh Bến Tre', shortName: 'Bến Tre', region: 'south', regionName: 'Đồng bằng sông Cửu Long', lat: 10.2433, lng: 106.3756, category: 'tinh', administrativeCenter: 'Thành phố Bến Tre' },
  { code: '84', name: 'Tỉnh Trà Vinh', shortName: 'Trà Vinh', region: 'south', regionName: 'Đồng bằng sông Cửu Long', lat: 9.9347, lng: 106.3456, category: 'tinh', administrativeCenter: 'Thành phố Trà Vinh' },
  { code: '86', name: 'Tỉnh Vĩnh Long', shortName: 'Vĩnh Long', region: 'south', regionName: 'Đồng bằng sông Cửu Long', lat: 10.2537, lng: 105.9722, category: 'tinh', administrativeCenter: 'Thành phố Vĩnh Long' },
  { code: '87', name: 'Tỉnh Đồng Tháp', shortName: 'Đồng Tháp', region: 'south', regionName: 'Đồng bằng sông Cửu Long', lat: 10.4578, lng: 105.6333, category: 'tinh', administrativeCenter: 'Thành phố Cao Lãnh' },
  { code: '89', name: 'Tỉnh An Giang', shortName: 'An Giang', region: 'south', regionName: 'Đồng bằng sông Cửu Long', lat: 10.3833, lng: 105.4167, category: 'tinh', administrativeCenter: 'Thành phố Long Xuyên' },
  { code: '91', name: 'Tỉnh Kiên Giang', shortName: 'Kiên Giang', region: 'south', regionName: 'Đồng bằng sông Cửu Long', lat: 10.0125, lng: 105.0809, category: 'tinh', administrativeCenter: 'Thành phố Rạch Giá' },
  { code: '92', name: 'Thành phố Cần Thơ', shortName: 'Cần Thơ', region: 'south', regionName: 'Đồng bằng sông Cửu Long', lat: 10.0452, lng: 105.7469, category: 'thanh_pho_tw', administrativeCenter: 'Quận Ninh Kiều' },
  { code: '93', name: 'Tỉnh Hậu Giang', shortName: 'Hậu Giang', region: 'south', regionName: 'Đồng bằng sông Cửu Long', lat: 9.7844, lng: 105.4701, category: 'tinh', administrativeCenter: 'Thành phố Vị Thanh' },
  { code: '94', name: 'Tỉnh Sóc Trăng', shortName: 'Sóc Trăng', region: 'south', regionName: 'Đồng bằng sông Cửu Long', lat: 9.6033, lng: 105.9800, category: 'tinh', administrativeCenter: 'Thành phố Sóc Trăng' },
  { code: '95', name: 'Tỉnh Bạc Liêu', shortName: 'Bạc Liêu', region: 'south', regionName: 'Đồng bằng sông Cửu Long', lat: 9.2941, lng: 105.7278, category: 'tinh', administrativeCenter: 'Thành phố Bạc Liêu' },
  { code: '96', name: 'Tỉnh Cà Mau', shortName: 'Cà Mau', region: 'south', regionName: 'Đồng bằng sông Cửu Long', lat: 9.1769, lng: 105.1500, category: 'tinh', administrativeCenter: 'Thành phố Cà Mau' }
];

// Helper get label
export const CATEGORY_LABELS: Record<HeritageCategoryType, string> = {
  monument: 'Di tích Lịch sử - Kháng chiến',
  scenic_landscape: 'Danh lam Thắng cảnh Tự nhiên',
  museum: 'Bảo tàng Lịch sử & Chuyên đề',
  cultural_site: 'Kiến trúc Nghệ thuật & Di tích Văn hóa',
  ecotourism: 'Du lịch Sinh thái & Vườn Quốc gia',
  island_beach: 'Biển đảo & Vịnh biển',
  craft_village: 'Làng nghề Thủ công Truyền thống',
  community_tourism: 'Du lịch Cộng đồng & Bản làng Văn hóa'
};

// =========================================================================
// 3. THUẬT TOÁN ĐỐI CHIẾU, TÍNH KHOẢNG CÁCH & KHỬ TRÙNG LẶP (DEDUPLICATION)
// =========================================================================

export function calculateDistanceMeters(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371e3; // Earth radius in meters
  const phi1 = (lat1 * Math.PI) / 180;
  const phi2 = (lat2 * Math.PI) / 180;
  const deltaPhi = ((lat2 - lat1) * Math.PI) / 180;
  const deltaLambda = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
    Math.cos(phi1) * Math.cos(phi2) * Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

export function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s]/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function areDuplicates(a: TourismHeritageRecord, b: TourismHeritageRecord): boolean {
  if (a.id === b.id) return true;
  const normA = normalizeText(a.name);
  const normB = normalizeText(b.name);

  // If names are identical
  if (normA === normB) return true;

  // If geographical proximity is under 150 meters and shares high word similarity
  const dist = calculateDistanceMeters(a.lat, a.lng, b.lat, b.lng);
  if (dist < 150) {
    const wordsA = new Set(normA.split(' '));
    const wordsB = new Set(normB.split(' '));
    const intersection = [...wordsA].filter(x => wordsB.has(x));
    if (intersection.length >= 2) return true;
  }

  return false;
}

// Ensure the directory exists
const DATA_DIR = path.join(process.cwd(), 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

console.log('Dataset builder schema initialized.');
