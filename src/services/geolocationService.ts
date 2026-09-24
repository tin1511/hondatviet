import { 
  UserLocation, 
  NearbyHeritageRecommendation, 
  NearbyPlaceRecommendation, 
  HeritageItem, 
  PlaceItem,
  CityLandmarkBackground
} from '../types';
import { HERITAGE_DATABASE, PLACES_NEAR_HERITAGE } from '../data/vietnamHeritageData';
import { storageService } from './storageService';

const LOCATION_STORAGE_KEY = 'heritage_ai_user_location';

export interface LocationPreset {
  id: string;
  name: string;
  province: string;
  lat: number;
  lng: number;
  description: string;
}

export const CITY_LANDMARK_PRESETS: CityLandmarkBackground[] = [
  {
    id: 'hanoi',
    cityName: 'Hà Nội',
    province: 'Hà Nội',
    landmarkName: 'Văn Miếu - Quốc Tử Giám & Hồ Gươm',
    tagline: 'Thủ đô ngàn năm văn hiến, lắng đọng hào khí Thăng Long',
    imageUrl: 'https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?auto=format&fit=crop&w=2000&q=85',
    lat: 21.0285,
    lng: 105.8542
  },
  {
    id: 'tphcm',
    cityName: 'TP. Hồ Chí Minh',
    province: 'TP. Hồ Chí Minh',
    landmarkName: 'Dinh Độc Lập & Bến Bạch Đằng',
    tagline: 'Đô thị phương Nam phồn hoa, giao thoa truyền thống và hiện đại',
    imageUrl: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=2000&q=85',
    lat: 10.7769,
    lng: 106.7009
  },
  {
    id: 'hue',
    cityName: 'Thừa Thiên Huế',
    province: 'Thừa Thiên Huế',
    landmarkName: 'Đại Nội Cung Đình Huế & Sông Hương',
    tagline: 'Cố đô vàng son triều Nguyễn - Di sản Văn hóa Thế giới',
    imageUrl: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=2000&q=85',
    lat: 16.4637,
    lng: 107.5909
  },
  {
    id: 'danang',
    cityName: 'Đà Nẵng',
    province: 'Đà Nẵng',
    landmarkName: 'Cầu Vàng Bà Nà & Cầu Rồng Sông Hàn',
    tagline: 'Thành phố biển hiện đại kề bên danh thắng Ngũ Hành Sơn & bán đảo Sơn Trà',
    imageUrl: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=2000&q=85',
    lat: 16.0544,
    lng: 108.2022
  },
  {
    id: 'myson',
    cityName: 'Quảng Nam (Mỹ Sơn)',
    province: 'Quảng Nam',
    landmarkName: 'Thánh Địa Mỹ Sơn & Tháp Chăm Cổ',
    tagline: 'Quần thể đền tháp Chăm Pa nghìn năm bí ẩn giữa thung lũng thiêng - Di sản Thế giới',
    imageUrl: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=2000&q=85',
    lat: 15.7959,
    lng: 108.1245
  },
  {
    id: 'hoian',
    cityName: 'Hội An (Quảng Nam)',
    province: 'Quảng Nam',
    landmarkName: 'Phố Cổ Hội An & Chùa Cầu',
    tagline: 'Thương cảng cổ kính lung linh sắc đèn lồng và kiến trúc gỗ',
    imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=2000&q=85',
    lat: 15.8801,
    lng: 108.3270
  },
  {
    id: 'ninhbinh',
    cityName: 'Ninh Bình',
    province: 'Ninh Bình',
    landmarkName: 'Quần thể Danh thắng Tràng An & Tam Cốc',
    tagline: 'Di sản Kép thế giới giữa non nước hữu tình cố đô Hoa Lư',
    imageUrl: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=2000&q=85',
    lat: 20.2536,
    lng: 105.9750
  },
  {
    id: 'halong',
    cityName: 'Quảng Ninh',
    province: 'Quảng Ninh',
    landmarkName: 'Vịnh Hạ Long & Quần đảo Cát Bà',
    tagline: 'Kỳ quan thiên nhiên thế giới với hàng nghìn đảo đá vôi kỳ vĩ',
    imageUrl: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=2000&q=85',
    lat: 20.9101,
    lng: 107.1839
  },
  {
    id: 'dalat',
    cityName: 'Lâm Đồng (Đà Lạt)',
    province: 'Lâm Đồng',
    landmarkName: 'Hồ Xuân Hương & Rừng thông Đà Lạt',
    tagline: 'Thành phố sương mù ngàn hoa thơ mộng giữa cao nguyên',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2000&q=85',
    lat: 11.9404,
    lng: 108.4583
  },
  {
    id: 'cantho',
    cityName: 'Cần Thơ',
    province: 'Cần Thơ',
    landmarkName: 'Chợ nổi Cái Răng & Bến Ninh Kiều',
    tagline: 'Thủ phủ sông nước Tây Đô hào sảng và mộc mạc',
    imageUrl: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=2000&q=85',
    lat: 10.0452,
    lng: 105.7469
  },
  {
    id: 'quangbinh',
    cityName: 'Quảng Bình',
    province: 'Quảng Bình',
    landmarkName: 'Vườn Quốc gia Phong Nha - Kẻ Bàng',
    tagline: 'Vương quốc hang động thạch nhũ tráng lệ bậc nhất hành tinh',
    imageUrl: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=2000&q=85',
    lat: 17.5388,
    lng: 106.2875
  },
  {
    id: 'hagiang',
    cityName: 'Hà Giang',
    province: 'Hà Giang',
    landmarkName: 'Cao nguyên đá Đồng Văn & Cột cờ Lũng Cú',
    tagline: 'Cực Bắc thiêng liêng với những cung đèo ngoạn mục và dốc đá',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2000&q=85',
    lat: 22.8233,
    lng: 104.9839
  },
  {
    id: 'nhatrang',
    cityName: 'Nha Trang (Khánh Hòa)',
    province: 'Khánh Hòa',
    landmarkName: 'Tháp Bà Ponagar & Vịnh Biển Nha Trang',
    tagline: 'Quần thể đền tháp Champa cổ kính bên vịnh biển xanh ngọc tuyệt mỹ',
    imageUrl: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=2000&q=85',
    lat: 12.2388,
    lng: 109.1967
  },
  {
    id: 'phuquoc',
    cityName: 'Kiên Giang (Phú Quốc)',
    province: 'Kiên Giang',
    landmarkName: 'Đảo Ngọc Phú Quốc & Bãi Sao',
    tagline: 'Thiên đường biển đảo phương Nam với bờ cát trắng mịn và hoàng hôn rực rỡ',
    imageUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=2000&q=85',
    lat: 10.2899,
    lng: 103.9840
  },
  {
    id: 'sapa',
    cityName: 'Lào Cai (Sa Pa)',
    province: 'Lào Cai',
    landmarkName: 'Đỉnh Fansipan & Thung lũng Mường Hoa',
    tagline: 'Nóc nhà Đông Dương hùng vĩ giữa bồng bềnh mây ngàn và ruộng bậc thang',
    imageUrl: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=2000&q=85',
    lat: 22.3364,
    lng: 103.8438
  },
  {
    id: 'haiphong',
    cityName: 'Hải Phòng',
    province: 'Hải Phòng',
    landmarkName: 'Vịnh Lan Hạ & Quần đảo Cát Bà',
    tagline: 'Thành phố hoa phượng đỏ với quần đảo ngọc và vịnh biển kỳ vĩ',
    imageUrl: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=2000&q=85',
    lat: 20.8449,
    lng: 106.6881
  },
  {
    id: 'vungtau',
    cityName: 'Bà Rịa - Vũng Tàu',
    province: 'Bà Rịa - Vũng Tàu',
    landmarkName: 'Tượng Chúa Kitô & Mũi Nghinh Phong',
    tagline: 'Thành phố biển đón gió kề bên ngọn hải đăng cổ kính',
    imageUrl: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=2000&q=85',
    lat: 10.3460,
    lng: 107.0843
  }
];

export const VIETNAM_LOCATION_PRESETS: LocationPreset[] = [
  {
    id: 'hanoi',
    name: 'Hà Nội (Thủ đô Ngàn Năm)',
    province: 'Hà Nội',
    lat: 21.0285,
    lng: 105.8542,
    description: 'Văn Miếu, Hoàng thành Thăng Long, Phố cổ 36 phố phường'
  },
  {
    id: 'hue',
    name: 'Cố đô Huế (Di sản Cung đình)',
    province: 'Thừa Thiên Huế',
    lat: 16.4637,
    lng: 107.5909,
    description: 'Đại Nội Huế, Chùa Thiên Mụ, Lăng tẩm triều Nguyễn'
  },
  {
    id: 'danang-hoian',
    name: 'Đà Nẵng & Hội An',
    province: 'Quảng Nam / Đà Nẵng',
    lat: 15.8801,
    lng: 108.3270,
    description: 'Phố cổ Hội An, Ngũ Hành Sơn, Cầu Vàng Bà Nà'
  },
  {
    id: 'thanh-dia-my-son',
    name: 'Thánh Địa Mỹ Sơn (Duy Xuyên)',
    province: 'Quảng Nam',
    lat: 15.7959,
    lng: 108.1245,
    description: 'Thánh địa đền tháp Chăm Pa cổ đại (UNESCO 1999), văn minh thung lũng sông Thu Bồn'
  },
  {
    id: 'ninhbinh',
    name: 'Ninh Bình (Cố đô Hoa Lư)',
    province: 'Ninh Bình',
    lat: 20.2536,
    lng: 105.9750,
    description: 'Quần thể danh thắng Tràng An, Tam Cốc - Bích Động'
  },
  {
    id: 'tphcm',
    name: 'TP. Hồ Chí Minh (Sài Gòn Gia Định)',
    province: 'TP. Hồ Chí Minh',
    lat: 10.7769,
    lng: 106.7009,
    description: 'Dinh Độc Lập, Bưu điện Trung tâm, Chợ Bến Thành'
  },
  {
    id: 'halong',
    name: 'Vịnh Hạ Long & Cát Bà',
    province: 'Quảng Ninh',
    lat: 20.9101,
    lng: 107.1839,
    description: 'Kỳ quan thiên nhiên thế giới, hang động đá vôi'
  }
];

/**
 * Tính khoảng cách đường chim bay giữa hai tọa độ địa lý (Haversine formula)
 * Đơn vị: Kilomet (làm tròn 1 chữ số thập phân)
 */
export function calculateDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  if (lat1 === lat2 && lon1 === lon2) return 0;
  const R = 6371; // Bán kính trái đất tính bằng km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return Math.round(d * 10) / 10;
}

/**
 * Ước lượng thời gian di chuyển dựa trên khoảng cách
 */
export function formatTravelEstimate(distanceKm: number): {
  walking: string;
  driving: string;
} {
  // Đi bộ ~4.5 km/h
  const walkingMinutes = Math.round((distanceKm / 4.5) * 60);
  let walking = '';
  if (walkingMinutes < 60) {
    walking = `${Math.max(1, walkingMinutes)} phút đi bộ`;
  } else {
    const hours = Math.floor(walkingMinutes / 60);
    const mins = walkingMinutes % 60;
    walking = `${hours}h ${mins > 0 ? `${mins}p` : ''} đi bộ`;
  }

  // Đi xe máy/ô tô trong đô thị trung bình ~35 km/h
  const drivingMinutes = Math.round((distanceKm / 35) * 60);
  let driving = '';
  if (drivingMinutes < 60) {
    driving = `${Math.max(1, drivingMinutes)} phút đi xe`;
  } else {
    const hours = Math.floor(drivingMinutes / 60);
    const mins = drivingMinutes % 60;
    driving = `${hours}h ${mins > 0 ? `${mins}p` : ''} đi xe`;
  }

  return { walking, driving };
}

export const geolocationService = {
  /**
   * Lấy vị trí đã lưu gần nhất từ bộ nhớ máy
   */
  getLastKnownLocation(): UserLocation | null {
    try {
      const data = localStorage.getItem(LOCATION_STORAGE_KEY);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.error('Error reading stored location', e);
    }
    return null;
  },

  /**
   * Lưu vị trí hiện thời
   */
  saveLocation(loc: UserLocation): void {
    try {
      localStorage.setItem(LOCATION_STORAGE_KEY, JSON.stringify(loc));
    } catch (e) {
      console.error('Error saving location', e);
    }
  },

  /**
   * Nhận diện tên khu vực / thành phố gần nhất dựa trên tọa độ
   */
  detectNearestCity(lat: number, lng: number): string {
    let nearest = VIETNAM_LOCATION_PRESETS[0];
    let minDistance = Infinity;

    for (const preset of VIETNAM_LOCATION_PRESETS) {
      const dist = calculateDistanceKm(lat, lng, preset.lat, preset.lng);
      if (dist < minDistance) {
        minDistance = dist;
        nearest = preset;
      }
    }

    if (minDistance < 35) {
      return `Khu vực ${nearest.province}`;
    } else if (minDistance < 90) {
      return `Gần ${nearest.province} (${Math.round(minDistance)} km)`;
    } else {
      return `Tọa độ ${lat.toFixed(3)}°B, ${lng.toFixed(3)}°Đ`;
    }
  },

  /**
   * Định vị dựa trên IP công cộng khi thiết bị bị chặn GPS hoặc không hỗ trợ
   */
  async fetchIpLocation(): Promise<UserLocation | null> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);
      const res = await fetch('https://freeipapi.com/api/json', { signal: controller.signal });
      clearTimeout(timeoutId);
      if (res.ok) {
        const data = await res.json();
        if (data && typeof data.latitude === 'number' && typeof data.longitude === 'number') {
          const lat = data.latitude;
          const lng = data.longitude;
          const cityName = data.cityName ? `${data.cityName}` : this.detectNearestCity(lat, lng);
          const location: UserLocation = {
            lat,
            lng,
            accuracy: 5000,
            cityName,
            source: 'ip',
            timestamp: Date.now()
          };
          this.saveLocation(location);
          return location;
        }
      }
    } catch (e) {
      console.warn('IP location fetch failed', e);
    }
    return null;
  },

  /**
   * Yêu cầu quyền định vị GPS từ trình duyệt với cơ chế tự động thử lại (Fallback) và Giải mã địa lý (Reverse Geocoding)
   */
  async requestCurrentPosition(): Promise<{
    success: boolean;
    location?: UserLocation;
    error?: string;
  }> {
    if (!navigator.geolocation) {
      const ipLoc = await this.fetchIpLocation();
      if (ipLoc) return { success: true, location: ipLoc };
      const defaultLoc = this.setPresetLocation('hanoi');
      return { success: true, location: defaultLoc || undefined };
    }

    const queryLocation = (highAccuracy: boolean, timeoutMs: number): Promise<{
      success: boolean;
      lat?: number;
      lng?: number;
      accuracy?: number;
      error?: string;
      code?: number;
    }> => {
      return new Promise((resolve) => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              success: true,
              lat: position.coords.latitude,
              lng: position.coords.longitude,
              accuracy: Math.round(position.coords.accuracy)
            });
          },
          (error) => {
            let errorMsg = 'Không thể lấy định vị.';
            switch (error.code) {
              case error.PERMISSION_DENIED:
                errorMsg = 'Quyền truy cập định vị đã bị từ chối hoặc bị hạn chế bởi trình duyệt / thiết bị.';
                break;
              case error.POSITION_UNAVAILABLE:
                errorMsg = 'Tín hiệu GPS/định vị tạm thời không khả dụng trên thiết bị này.';
                break;
              case error.TIMEOUT:
                errorMsg = 'Yêu cầu định vị đã quá thời gian chờ (Timeout).';
                break;
            }
            resolve({ success: false, error: errorMsg, code: error.code });
          },
          {
            enableHighAccuracy: highAccuracy,
            timeout: timeoutMs,
            maximumAge: 120000
          }
        );
      });
    };

    // Bước 1: Thử nghiệm lấy định vị bằng GPS chính xác cao
    let gpsRes = await queryLocation(true, 4500);

    // Bước 2: Nếu thất bại do timeout hoặc không khả dụng, thử lại bằng Wi-Fi/IP (độ chính xác thường) để tránh lỗi cứng
    if (!gpsRes.success && gpsRes.code !== 1) { // 1 là PERMISSION_DENIED (Người dùng từ chối hẳn)
      console.warn('GPS high accuracy timed out or unavailable. Retrying with standard accuracy...');
      gpsRes = await queryLocation(false, 8000);
    }

    if (!gpsRes.success || gpsRes.lat === undefined || gpsRes.lng === undefined) {
      // Tự động thử chuyển sang IP geolocation
      const ipLoc = await this.fetchIpLocation();
      if (ipLoc) {
        return { success: true, location: ipLoc };
      }

      // Tự động nạp vị trí mẫu (Hà Nội) nếu cả GPS và IP đều bị hạn chế
      const presetLoc = this.setPresetLocation('hanoi');
      if (presetLoc) {
        return { success: true, location: presetLoc };
      }

      return {
        success: false,
        error: gpsRes.error || 'Không thể xác định vị trí hiện tại.'
      };
    }

    const lat = gpsRes.lat;
    const lng = gpsRes.lng;
    const accuracy = gpsRes.accuracy || 0;

    // Bước 3: Chạy giải mã địa lý ngược nâng cao qua API hoặc tìm thành phố gần nhất mặc định
    let cityName = this.detectNearestCity(lat, lng);
    try {
      const realCity = await this.reverseGeocodeCity(lat, lng);
      if (realCity && realCity.trim() !== '') {
        cityName = realCity;
      }
    } catch (e) {
      console.warn('Reverse geocoding fell back to local presets', e);
    }

    const location: UserLocation = {
      lat,
      lng,
      accuracy,
      cityName,
      source: 'gps',
      timestamp: Date.now()
    };

    this.saveLocation(location);
    return { success: true, location };
  },

  /**
   * Thiết lập vị trí mô phỏng / mẫu nhanh
   */
  setPresetLocation(presetId: string): UserLocation | null {
    const preset = VIETNAM_LOCATION_PRESETS.find(p => p.id === presetId);
    if (!preset) return null;

    const location: UserLocation = {
      lat: preset.lat,
      lng: preset.lng,
      cityName: preset.name,
      source: 'preset',
      timestamp: Date.now()
    };

    this.saveLocation(location);
    return location;
  },

  /**
   * Đề xuất các di sản văn hóa gần tọa độ người dùng nhất
   */
  getNearbyHeritages(
    userLat: number, 
    userLng: number, 
    limit: number = 6
  ): NearbyHeritageRecommendation[] {
    const heritages = storageService.getHeritages();
    const list: NearbyHeritageRecommendation[] = heritages.map(item => {
      const distanceKm = calculateDistanceKm(userLat, userLng, item.lat, item.lng);
      const times = formatTravelEstimate(distanceKm);

      let matchHighlight = '';
      if (distanceKm <= 1.5) {
        matchHighlight = 'Cực gần bạn! Có thể thong thả tản bộ tham quan ngay';
      } else if (distanceKm <= 5) {
        matchHighlight = 'Rất gần (dưới 10-15 phút di chuyển)';
      } else if (distanceKm <= 20) {
        matchHighlight = 'Cùng khu vực thành phố, thuận tiện ghé thăm trong ngày';
      } else if (distanceKm <= 60) {
        matchHighlight = 'Cung đường ngoại thành lý tưởng cho chuyến đi nửa ngày';
      } else {
        matchHighlight = `Cách khoảng ${Math.round(distanceKm)} km`;
      }

      return {
        ...item,
        distanceKm,
        walkingTimeText: times.walking,
        drivingTimeText: times.driving,
        matchHighlight
      };
    });

    // Sắp xếp tăng dần theo khoảng cách gần nhất
    list.sort((a, b) => a.distanceKm - b.distanceKm);
    return list.slice(0, limit);
  },

  /**
   * Đề xuất các quán ăn, cà phê và tụ điểm trải nghiệm gần tọa độ người dùng nhất
   */
  getNearbyPlaces(
    userLat: number, 
    userLng: number, 
    limit: number = 6
  ): NearbyPlaceRecommendation[] {
    const allPlaces: NearbyPlaceRecommendation[] = [];
    const heritages = storageService.getHeritages();
    const placesMap = storageService.getPlaces();

    Object.entries(placesMap).forEach(([heritageId, places]) => {
      const sourceHeritage = heritages.find(h => h.id === heritageId);
      const heritageName = sourceHeritage ? sourceHeritage.name : 'Di sản lân cận';

      places.forEach(place => {
        const distanceKm = calculateDistanceKm(userLat, userLng, place.lat, place.lng);
        const times = formatTravelEstimate(distanceKm);

        allPlaces.push({
          ...place,
          distanceKm,
          walkingTimeText: times.walking,
          drivingTimeText: times.driving,
          heritageSource: heritageName
        });
      });
    });

    // Sắp xếp tăng dần theo khoảng cách
    allPlaces.sort((a, b) => a.distanceKm - b.distanceKm);
    return allPlaces.slice(0, limit);
  },

  /**
   * Xác định địa danh nổi tiếng và khung cảnh đại diện cho thành phố/tọa độ của người dùng
   */
  getCityLandmarkForCoordinates(lat: number, lng: number): CityLandmarkBackground {
    const landmarks = storageService.getLandmarkBackgrounds();
    let nearest = landmarks[0] || CITY_LANDMARK_PRESETS[0];
    let minDistance = Infinity;

    for (const item of landmarks) {
      const dist = calculateDistanceKm(lat, lng, item.lat, item.lng);
      if (dist < minDistance) {
        minDistance = dist;
        nearest = item;
      }
    }

    return {
      ...nearest,
      distanceKm: Math.round(minDistance * 10) / 10
    };
  },

  /**
   * Lấy danh sách toàn bộ các địa danh tiêu biểu các tỉnh thành
   */
  getAllLandmarkPresets(): CityLandmarkBackground[] {
    return storageService.getLandmarkBackgrounds();
  },

  /**
   * Lấy địa danh theo ID tỉnh thành
   */
  getCityLandmarkById(id: string): CityLandmarkBackground {
    const landmarks = storageService.getLandmarkBackgrounds();
    const found = landmarks.find(item => item.id === id);
    return found || landmarks[0] || CITY_LANDMARK_PRESETS[0];
  },

  /**
   * Phân giải tên quận/thành phố chi tiết từ tọa độ thực tế (Reverse Geocoding)
   */
  async reverseGeocodeCity(lat: number, lng: number): Promise<string | null> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2500);
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=10&accept-language=vi`,
        { signal: controller.signal }
      );
      clearTimeout(timeoutId);
      if (res.ok) {
        const data = await res.json();
        const addr = data?.address;
        if (addr) {
          return addr.city || addr.state || addr.province || addr.town || addr.county || null;
        }
      }
    } catch {
      // Bỏ qua lỗi mạng và sử dụng định vị hình học lân cận
    }
    return null;
  }
};
