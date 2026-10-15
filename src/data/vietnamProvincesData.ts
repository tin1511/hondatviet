import { VIETNAM_63_ADMINISTRATIVE_UNITS, AdministrativeUnit } from './administrativeUnits';

export interface ProvinceInfo {
  id: string;
  code?: string;
  name: string;
  region: 'north' | 'central' | 'south';
  regionName: string;
  subRegion?: string;
  lat: number;
  lng: number;
  description: string;
  image: string;
  highlights: string[];
  islandsOrArchipelagos?: string[];
  historicalNotes?: string;
}

// Generate complete 63 provinces and centrally-run cities of Vietnam
export const VIETNAM_PROVINCES: ProvinceInfo[] = VIETNAM_63_ADMINISTRATIVE_UNITS.map(unit => {
  // Curated images for provinces
  const defaultImages: Record<string, string> = {
    '01': 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80', // Hà Nội
    '02': 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80', // Hà Giang
    '04': 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80', // Cao Bằng
    '06': 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80', // Bắc Kạn
    '08': 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80', // Tuyên Quang
    '10': 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=800&q=80', // Lào Cai
    '11': 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=800&q=80', // Điện Biên
    '12': 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=800&q=80', // Lai Châu
    '14': 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80', // Sơn La
    '15': 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80', // Yên Bái
    '17': 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80', // Hòa Bình
    '19': 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80', // Thái Nguyên
    '20': 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=800&q=80', // Lạng Sơn
    '22': 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80', // Quảng Ninh
    '24': 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80', // Bắc Giang
    '25': 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80', // Phú Thọ
    '26': 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80', // Vĩnh Phúc
    '27': 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80', // Bắc Ninh
    '30': 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80', // Hải Dương
    '31': 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=800&q=80', // Hải Phòng
    '33': 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80', // Hưng Yên
    '34': 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80', // Thái Bình
    '35': 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80', // Hà Nam
    '36': 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80', // Nam Định
    '37': 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80', // Ninh Bình
    '38': 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80', // Thanh Hóa
    '40': 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80', // Nghệ An
    '42': 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80', // Hà Tĩnh
    '44': 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80', // Quảng Bình
    '45': 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=800&q=80', // Quảng Trị
    '46': 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Meridian_Gate%2C_Hue_%28I%29.jpg', // Thừa Thiên Huế
    '48': 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=800&q=80', // Đà Nẵng
    '49': 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80', // Quảng Nam
    '51': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80', // Quảng Ngãi
    '52': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80', // Bình Định
    '54': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80', // Phú Yên
    '56': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80', // Khánh Hòa
    '58': 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80', // Ninh Thuận
    '60': 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80', // Bình Thuận
    '62': 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80', // Kon Tum
    '64': 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80', // Gia Lai
    '66': 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80', // Đắk Lắk
    '67': 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80', // Đắk Nông
    '68': 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80', // Lâm Đồng
    '70': 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80', // Bình Phước
    '72': 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80', // Tây Ninh
    '74': 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80', // Bình Dương
    '75': 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80', // Đồng Nai
    '77': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80', // Bà Rịa - Vũng Tàu
    '79': 'https://images.unsplash.com/photo-1578637387939-43c525550085?auto=format&fit=crop&w=800&q=80', // TP. Hồ Chí Minh
    '80': 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80', // Long An
    '82': 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80', // Tiền Giang
    '83': 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80', // Bến Tre
    '84': 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80', // Trà Vinh
    '86': 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80', // Vĩnh Long
    '87': 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80', // Đồng Tháp
    '89': 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80', // An Giang
    '91': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80', // Kiên Giang
    '92': 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80', // Cần Thơ
    '93': 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80', // Hậu Giang
    '94': 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80', // Sóc Trăng
    '95': 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80', // Bạc Liêu
    '96': 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'  // Cà Mau
  };

  const idSlug = unit.shortName
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '');

  return {
    id: idSlug,
    code: unit.code,
    name: unit.shortName,
    region: unit.region,
    regionName: unit.regionName,
    subRegion: unit.subRegionName,
    lat: unit.center[0],
    lng: unit.center[1],
    description: unit.historicalNotes || `Vùng đất giàu truyền thống lịch sử, văn hóa và danh lam thắng cảnh thuộc ${unit.regionName}.`,
    image: defaultImages[unit.code] || 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80',
    highlights: unit.historicalNames ? [...unit.historicalNames, unit.shortName] : [unit.shortName],
    islandsOrArchipelagos: unit.islandsOrArchipelagos,
    historicalNotes: unit.historicalNotes
  };
});
