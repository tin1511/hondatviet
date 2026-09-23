import { HeritageItem, HeritageStory, PlaceItem, CityLandmarkBackground } from '../types';
import { 
  HERITAGE_DATABASE, 
  PLACES_NEAR_HERITAGE, 
  TRADITIONAL_ARTS 
} from '../data/vietnamHeritageData';
import { CITY_LANDMARK_PRESETS } from './geolocationService';
import { storageService } from './storageService';

const OFFLINE_HERITAGE_KEY = 'heritageai_offline_heritages_v1';
const OFFLINE_STORIES_KEY = 'heritageai_offline_stories_v1';
const OFFLINE_PLACES_KEY = 'heritageai_offline_places_v1';
const OFFLINE_META_KEY = 'heritageai_offline_meta_v1';

export interface OfflinePackageMeta {
  lastUpdated: string;
  totalHeritages: number;
  totalStories: number;
  totalPlaces: number;
  totalCraftArts: number;
  totalLandmarks: number;
  cachedRegions: string[];
  estimatedSizeKB: number;
  isFullyCached: boolean;
}

class OfflineStorageService {
  private cacheMeta: OfflinePackageMeta | null = null;

  constructor() {
    this.loadMeta();
  }

  private loadMeta(): OfflinePackageMeta {
    if (typeof window === 'undefined') {
      return this.getDefaultMeta();
    }
    try {
      const stored = localStorage.getItem(OFFLINE_META_KEY);
      if (stored) {
        this.cacheMeta = JSON.parse(stored);
        return this.cacheMeta!;
      }
    } catch (e) {
      console.warn('[OfflineStorageService] Failed to load meta:', e);
    }
    const defaultMeta = this.getDefaultMeta();
    this.cacheMeta = defaultMeta;
    return defaultMeta;
  }

  private getDefaultMeta(): OfflinePackageMeta {
    return {
      lastUpdated: '',
      totalHeritages: 0,
      totalStories: 0,
      totalPlaces: 0,
      totalCraftArts: 0,
      totalLandmarks: 0,
      cachedRegions: [],
      estimatedSizeKB: 0,
      isFullyCached: false
    };
  }

  private saveMeta(meta: OfflinePackageMeta) {
    this.cacheMeta = meta;
    try {
      localStorage.setItem(OFFLINE_META_KEY, JSON.stringify(meta));
    } catch (e) {
      console.warn('[OfflineStorageService] Failed to save meta:', e);
    }
  }

  public getMeta(): OfflinePackageMeta {
    if (!this.cacheMeta) {
      return this.loadMeta();
    }
    return this.cacheMeta;
  }

  /**
   * Caches all heritage data (text, stories, place guides, craft arts)
   * into local storage and pre-caches image assets into CacheStorage via ServiceWorker / Cache API.
   */
  public async cacheAllHeritageData(
    onProgress?: (percent: number, message: string) => void
  ): Promise<OfflinePackageMeta> {
    onProgress?.(10, 'Đang chuẩn bị gói dữ liệu di sản 3 miền...');

    // 1. Gather all database items + custom user items
    const allHeritages = storageService.getHeritages();
    const placesMap = storageService.getPlaces();
    const allPlaces = Object.values(placesMap).flat();
    const customStories = storageService.getCustomStories();

    onProgress?.(30, 'Đang lưu trữ dữ liệu văn bản và thông tin lịch sử...');

    const totalHeritages = allHeritages.length;
    const totalPlaces = allPlaces.length;
    const totalCraftArts = TRADITIONAL_ARTS.length;
    const totalLandmarks = CITY_LANDMARK_PRESETS.length;

    // 2. Serialize and store text JSON
    try {
      localStorage.setItem(OFFLINE_HERITAGE_KEY, JSON.stringify(allHeritages));
      localStorage.setItem(OFFLINE_PLACES_KEY, JSON.stringify(allPlaces));
      localStorage.setItem(OFFLINE_STORIES_KEY, JSON.stringify(customStories));
    } catch (err) {
      console.warn('[OfflineStorage] LocalStorage quota exceeded, storing key records:', err);
    }

    onProgress?.(60, 'Đang lưu vào bộ nhớ đệm CacheStorage (Hình ảnh & Bản đồ)...');

    // 3. Pre-cache images using Cache API if available
    let imagesCachedCount = 0;
    if (typeof window !== 'undefined' && 'caches' in window) {
      try {
        const cache = await caches.open('heritage-offline-images-v1');
        const imageUrls = new Set<string>();

        // Collect URLs
        allHeritages.forEach((h: HeritageItem) => {
          if (h.imageUrl) imageUrls.add(h.imageUrl);
          if (h.historicImageUrl) imageUrls.add(h.historicImageUrl);
        });
        allPlaces.forEach((p: PlaceItem) => {
          if (p.photoUrl) imageUrls.add(p.photoUrl);
        });
        CITY_LANDMARK_PRESETS.forEach((lm: CityLandmarkBackground) => {
          if (lm.imageUrl) imageUrls.add(lm.imageUrl);
        });

        const urlsArray = Array.from(imageUrls);
        const totalUrls = urlsArray.length;

        for (let i = 0; i < totalUrls; i++) {
          const url = urlsArray[i];
          try {
            const response = await fetch(url, { mode: 'cors' }).catch(() => null);
            if (response && response.ok) {
              await cache.put(url, response.clone());
              imagesCachedCount++;
            }
          } catch (e) {
            // Ignore individual image fetch error
          }
          const imageProgress = 60 + Math.floor(((i + 1) / totalUrls) * 35);
          onProgress?.(imageProgress, `Đang tải bộ nhớ đệm hình ảnh (${i + 1}/${totalUrls})...`);
        }
      } catch (e) {
        console.warn('[OfflineStorage] Cache API image caching error:', e);
      }
    }

    onProgress?.(98, 'Hoàn tất kiểm định gói di sản ngoại tuyến!');

    const jsonString = JSON.stringify({ allHeritages, allPlaces, customStories });
    const estimatedSizeKB = Math.round(jsonString.length / 1024) + (imagesCachedCount * 120);

    const newMeta: OfflinePackageMeta = {
      lastUpdated: new Date().toISOString(),
      totalHeritages,
      totalStories: Object.keys(customStories).length,
      totalPlaces,
      totalCraftArts,
      totalLandmarks,
      cachedRegions: ['Bắc Bộ', 'Trung Bộ', 'Nam Bộ & Tây Nguyên'],
      estimatedSizeKB,
      isFullyCached: true
    };

    this.saveMeta(newMeta);
    onProgress?.(100, 'Đã lưu trữ toàn bộ dữ liệu di sản cho Chế độ Ngoại tuyến!');

    return newMeta;
  }

  /**
   * Retrieves offline cached heritages. Fallbacks to default database if empty.
   */
  public getOfflineHeritages(): HeritageItem[] {
    if (typeof window === 'undefined') return HERITAGE_DATABASE;
    try {
      const stored = localStorage.getItem(OFFLINE_HERITAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('[OfflineStorage] Error reading offline heritages:', e);
    }
    return storageService.getHeritages();
  }

  /**
   * Retrieves offline cached places.
   */
  public getOfflinePlaces(): PlaceItem[] {
    if (typeof window === 'undefined') return Object.values(PLACES_NEAR_HERITAGE).flat();
    try {
      const stored = localStorage.getItem(OFFLINE_PLACES_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('[OfflineStorage] Error reading offline places:', e);
    }
    const placesMap = storageService.getPlaces();
    return Object.values(placesMap).flat();
  }

  /**
   * Checks if a single heritage item is available offline
   */
  public isHeritageAvailableOffline(id: string): boolean {
    const heritages = this.getOfflineHeritages();
    return heritages.some(h => h.id === id);
  }

  /**
   * Clears the offline cache storage
   */
  public async clearOfflineCache(): Promise<void> {
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem(OFFLINE_HERITAGE_KEY);
        localStorage.removeItem(OFFLINE_PLACES_KEY);
        localStorage.removeItem(OFFLINE_STORIES_KEY);
        localStorage.removeItem(OFFLINE_META_KEY);

        if ('caches' in window) {
          await caches.delete('heritage-offline-images-v1');
        }
      } catch (e) {
        console.warn('[OfflineStorage] Error clearing offline cache:', e);
      }
    }
    this.cacheMeta = this.getDefaultMeta();
  }
}

export const offlineStorageService = new OfflineStorageService();
