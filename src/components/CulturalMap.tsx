import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { 
  Compass, 
  MapPin, 
  Search, 
  ArrowLeft, 
  Globe, 
  Layers, 
  Volume2, 
  Utensils, 
  Clock, 
  Ticket, 
  LocateFixed, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw,
  Sparkles,
  ChevronRight,
  CheckCircle2,
  X,
  Eye,
  EyeOff,
  Palette,
  Tag,
  SlidersHorizontal,
  ChevronDown,
  LayoutGrid,
  PanelLeft,
  PanelRight,
  Minimize2,
  Maximize2,
  Move
} from 'lucide-react';
import { HeritageItem, UserProfile, UserLocation } from '../types';
import { storageService } from '../services/storageService';
import { handleImageError, getSafeHeritageImageUrl } from '../utils/imageUtils';
import { geolocationService, calculateDistanceKm } from '../services/geolocationService';

interface CulturalMapProps {
  currentUser?: UserProfile;
  onNavigateToStory: (heritageName: string, history?: string, period?: string) => void;
  onNavigateToFood: (heritageId: string) => void;
}

interface ProvinceProperties {
  Name: string;
  vietnameseName: string;
  isIsland?: boolean;
  Note?: string | null;
  center?: [number, number];
}

// Map Base Modes: Vietnam Exclusive (default) vs Global satellite/streets
export type MapBaseMode = 'vietnam_only' | 'satellite' | 'topo' | 'streets';

// Side Position for Heritage List Panel ("ô di sản nằm bên cạnh ô bản đồ")
export type BoxSideMode = 'right' | 'left';
export type BoxPositionMode = BoxSideMode;

// Color themes for Vietnam map
export type MapColorTheme = 'multi' | 'imperial' | 'jade' | 'vintage' | 'night' | 'ocean';

const COLOR_THEMES: Record<MapColorTheme, { name: string; icon: string; desc: string; sampleColors: string[] }> = {
  multi: {
    name: 'Đa Sắc Tươi Sáng',
    icon: '🎨',
    desc: 'Mỗi tỉnh thành một màu sắc riêng biệt, dễ phân biệt',
    sampleColors: ['#f59e0b', '#0284c7', '#10b981', '#ec4899', '#8b5cf6']
  },
  imperial: {
    name: 'Sơn Mài Hoàng Gia',
    icon: '👑',
    desc: 'Tông vàng kim cung đình, đỏ son, hổ phách, gấm vóc',
    sampleColors: ['#b45309', '#d97706', '#f59e0b', '#dc2626', '#b91c1c']
  },
  jade: {
    name: 'Non Nước Ngọc Bích',
    icon: '🌿',
    desc: 'Tông xanh ngọc, xanh rêu, xanh chàm rừng núi & phù sa',
    sampleColors: ['#047857', '#059669', '#10b981', '#0d9488', '#166534']
  },
  vintage: {
    name: 'Thư Họa Giấy Điệp',
    icon: '📜',
    desc: 'Tông giấy dó Đông Hồ, đất nung Bát Tràng, nâu cổ bản',
    sampleColors: ['#ca8a04', '#a16207', '#854d0e', '#78350f', '#a8a29e']
  },
  night: {
    name: 'Dạ Nguyệt Huyền Bí',
    icon: '🌌',
    desc: 'Tông xanh cyan neon, tím chàm lung linh nổi bật đêm',
    sampleColors: ['#3b82f6', '#06b6d4', '#6366f1', '#8b5cf6', '#0284c7']
  },
  ocean: {
    name: 'Hải Dương Biển Đảo',
    icon: '🌊',
    desc: 'Tông xanh lam biển khơi, ngọc bích san hô trù phú',
    sampleColors: ['#0284c7', '#0ea5e9', '#0891b2', '#06b6d4', '#14b8a6']
  }
};

// Curated tile providers for external background when user toggles outside Vietnam-only mode
const TILE_PROVIDERS: Record<'satellite' | 'topo' | 'streets', { name: string; icon: string; url: string; attribution: string; maxZoom: number }> = {
  satellite: {
    name: 'Vệ Tinh Toàn Cầu',
    icon: '🛰️',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: '&copy; Esri World Imagery',
    maxZoom: 18
  },
  topo: {
    name: 'Địa Hình Tự Nhiên',
    icon: '⛰️',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
    attribution: '&copy; Esri World Topo Map',
    maxZoom: 18
  },
  streets: {
    name: 'Giao Thông Du Lịch',
    icon: '🌟',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
    attribution: '&copy; Esri World Street Map',
    maxZoom: 18
  }
};

// Full Vietnam bounding box to keep S-shape perfectly framed in viewport
const VIETNAM_BOUNDS: L.LatLngBoundsExpression = [
  [8.0, 102.0],   // Southwest corner (Mũi Cà Mau & Vịnh Thái Lan)
  [23.5, 114.5]   // Northeast corner (Lũng Cú, Móng Cái & Quần đảo Hoàng Sa)
];

// Strict boundary limit for Vietnam
const VIETNAM_MAX_BOUNDS: L.LatLngBoundsExpression = [
  [6.5, 100.0],
  [24.5, 117.0]
];

const VIETNAM_CENTER: L.LatLngExpression = [16.0, 107.8];

// High-fidelity distinct colors for all provinces when in 'multi' mode
const MULTI_PALETTE = [
  '#f59e0b', '#0284c7', '#10b981', '#ec4899', '#8b5cf6',
  '#f97316', '#06b6d4', '#14b8a6', '#6366f1', '#a855f7',
  '#ef4444', '#3b82f6', '#059669', '#d946ef', '#eab308',
  '#84cc16', '#0891b2', '#0d9488', '#7c3aed', '#d97706'
];

// Simple deterministic hash to get stable color index per province
const getProvinceHashIndex = (name: string, modulo: number): number => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash << 5) - hash + name.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash) % modulo;
};

export const CulturalMap: React.FC<CulturalMapProps> = ({
  currentUser,
  onNavigateToStory,
  onNavigateToFood,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const geojsonLayerRef = useRef<L.GeoJSON | null>(null);
  const labelsLayerRef = useRef<L.LayerGroup | null>(null);
  const seaWatermarksLayerRef = useRef<L.LayerGroup | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);

  const [heritages, setHeritages] = useState<HeritageItem[]>(() => storageService.getHeritages());
  const [geoData, setGeoData] = useState<GeoJSON.FeatureCollection | null>(null);
  const [loadingGeo, setLoadingGeo] = useState<boolean>(true);

  // BASE MODE: 'vietnam_only' (Pure Vietnam vector map, no foreign territory) vs external tiles
  const [baseMode, setBaseMode] = useState<MapBaseMode>('vietnam_only');

  // MAP COLOR THEME: User can change map colors
  const [colorTheme, setColorTheme] = useState<MapColorTheme>('multi');
  const [colorOpacity, setColorOpacity] = useState<number>(0.65);
  const [showColorMenu, setShowColorMenu] = useState<boolean>(false);

  // Province display toggles
  const [showProvinceBorders, setShowProvinceBorders] = useState<boolean>(true);
  const [showProvinceLabels, setShowProvinceLabels] = useState<boolean>(true);

  // Selection states
  const [selectedProvinceName, setSelectedProvinceName] = useState<string | null>(null);
  const [hoveredProvinceName, setHoveredProvinceName] = useState<string | null>(null);
  const [activeHeritage, setActiveHeritage] = useState<HeritageItem | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedRegion, setSelectedRegion] = useState<'all' | 'north' | 'central' | 'south'>('all');

  // GPS state
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [locationMessage, setLocationMessage] = useState<string>('');

  // Side positioning state ("ô di sản nằm bên cạnh ô bản đồ"): 'right' (default) or 'left'
  const [sidePosition, setSidePosition] = useState<BoxSideMode>(() => {
    const saved = localStorage.getItem('vietnam_map_box_side');
    if (saved === 'left' || saved === 'right') return saved;
    const old = localStorage.getItem('vietnam_map_box_position');
    if (old === 'left' || old === 'right') return old as BoxSideMode;
    return 'right';
  });
  const [isBoxCollapsed, setIsBoxCollapsed] = useState<boolean>(false);

  const handleSetSidePosition = (side: BoxSideMode) => {
    setSidePosition(side);
    try {
      localStorage.setItem('vietnam_map_box_side', side);
    } catch (e) {}
    setTimeout(() => {
      mapInstanceRef.current?.invalidateSize();
    }, 150);
  };

  // Re-invalidate Leaflet map dimensions when layout changes
  useEffect(() => {
    const timer = setTimeout(() => {
      mapInstanceRef.current?.invalidateSize();
    }, 150);
    return () => clearTimeout(timer);
  }, [sidePosition]);

  // 1. Fetch GeoJSON for Vietnam province boundaries
  useEffect(() => {
    let isMounted = true;
    const fetchGeoJSON = async () => {
      try {
        setLoadingGeo(true);
        const res = await fetch('/data/vietnam-provinces.geojson');
        if (res.ok) {
          const data = await res.json();
          if (isMounted) {
            setGeoData(data);
          }
        }
      } catch (err) {
        console.warn('GeoJSON boundary load error:', err);
      } finally {
        if (isMounted) {
          setLoadingGeo(false);
        }
      }
    };

    fetchGeoJSON();

    const handleDataUpdated = () => {
      setHeritages(storageService.getHeritages());
    };
    window.addEventListener('heritage-data-updated', handleDataUpdated);

    const saved = geolocationService.getLastKnownLocation();
    if (saved) {
      setUserLocation(saved);
    }

    return () => {
      isMounted = false;
      window.removeEventListener('heritage-data-updated', handleDataUpdated);
    };
  }, []);

  // 2. Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Create Leaflet instance framed to Vietnam
    const map = L.map(mapContainerRef.current, {
      center: VIETNAM_CENTER,
      zoom: 6,
      minZoom: 5.2,
      maxZoom: 18,
      zoomControl: false,
      attributionControl: false,
      maxBounds: VIETNAM_MAX_BOUNDS,
      maxBoundsViscosity: 0.95
    });

    mapInstanceRef.current = map;

    // Layer group for sea watermarks & sovereignty markers
    const seaGroup = L.layerGroup().addTo(map);
    seaWatermarksLayerRef.current = seaGroup;
    renderSeaWatermarks(seaGroup, map);

    // Layer group for province labels
    const labelsGroup = L.layerGroup().addTo(map);
    labelsLayerRef.current = labelsGroup;

    // Layer group for heritage pins
    const markersGroup = L.layerGroup().addTo(map);
    markersLayerRef.current = markersGroup;

    // Initial viewport fit to Vietnam S-shape
    map.fitBounds(VIETNAM_BOUNDS, { padding: [15, 15] });

    // Handle container resizing smoothly
    const t1 = setTimeout(() => {
      map.invalidateSize();
      map.fitBounds(VIETNAM_BOUNDS, { padding: [15, 15] });
    }, 150);

    const t2 = setTimeout(() => {
      map.invalidateSize();
    }, 400);

    const handleResize = () => {
      map.invalidateSize();
    };
    window.addEventListener('resize', handleResize);

    const resizeObserver = new ResizeObserver(() => {
      map.invalidateSize();
    });
    if (mapContainerRef.current) {
      resizeObserver.observe(mapContainerRef.current);
    }

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // 3. Manage Base Tile Layer (Only active when NOT in 'vietnam_only' mode)
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clean up previous tile layer
    if (tileLayerRef.current) {
      map.removeLayer(tileLayerRef.current);
      tileLayerRef.current = null;
    }

    // In 'vietnam_only' mode, NO tile layer is used: 100% Vietnam vector with pure ocean background
    if (baseMode === 'vietnam_only') {
      return;
    }

    // Otherwise load the chosen external base tile provider
    const provider = TILE_PROVIDERS[baseMode];
    if (provider) {
      const newTile = L.tileLayer(provider.url, {
        attribution: provider.attribution,
        maxZoom: provider.maxZoom
      }).addTo(map);

      tileLayerRef.current = newTile;
      newTile.bringToBack();
    }
  }, [baseMode]);

  // Helper to render permanent Sea Watermarks and Sovereignty Badges
  const renderSeaWatermarks = (group: L.LayerGroup, map: L.Map) => {
    group.clearLayers();

    // 1. Quần đảo Hoàng Sa (TP. Đà Nẵng)
    const hoangSaIcon = L.divIcon({
      className: 'custom-island-badge',
      html: `
        <div class="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-950/90 border border-amber-400 text-amber-300 shadow-2xl backdrop-blur select-none cursor-pointer hover:scale-110 transition-transform">
          <span class="w-2.5 h-2.5 rounded-full bg-red-500 border border-amber-300 animate-ping"></span>
          <span class="text-[11px] font-bold font-serif whitespace-nowrap">🇻🇳 Quần đảo Hoàng Sa (Đà Nẵng)</span>
        </div>
      `,
      iconSize: [215, 30],
      iconAnchor: [107, 15]
    });

    const hoangSaMarker = L.marker([16.5, 112.0], { icon: hoangSaIcon });
    hoangSaMarker.on('click', () => {
      setSelectedProvinceName('Quần đảo Hoàng Sa (Đà Nẵng)');
      map.setView([16.5, 112.0], 8, { animate: true });
    });
    group.addLayer(hoangSaMarker);

    // 2. Quần đảo Trường Sa (Tỉnh Khánh Hòa)
    const truongSaIcon = L.divIcon({
      className: 'custom-island-badge',
      html: `
        <div class="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-950/90 border border-amber-400 text-amber-300 shadow-2xl backdrop-blur select-none cursor-pointer hover:scale-110 transition-transform">
          <span class="w-2.5 h-2.5 rounded-full bg-red-500 border border-amber-300 animate-ping"></span>
          <span class="text-[11px] font-bold font-serif whitespace-nowrap">🇻🇳 Quần đảo Trường Sa (Khánh Hòa)</span>
        </div>
      `,
      iconSize: [220, 30],
      iconAnchor: [110, 15]
    });

    const truongSaMarker = L.marker([9.5, 113.8], { icon: truongSaIcon });
    truongSaMarker.on('click', () => {
      setSelectedProvinceName('Quần đảo Trường Sa (Khánh Hòa)');
      map.setView([9.5, 113.8], 8, { animate: true });
    });
    group.addLayer(truongSaMarker);

    // 3. Biển Đông (Việt Nam) watermark in the East Sea
    const bienDongIcon = L.divIcon({
      className: 'custom-sea-watermark',
      html: `
        <div class="flex flex-col items-center justify-center opacity-70 pointer-events-none select-none text-center">
          <span class="text-[14px] sm:text-[18px] font-serif font-black tracking-[0.35em] text-amber-300/80 uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            BIỂN ĐÔNG
          </span>
          <span class="text-[10px] sm:text-[11px] font-sans font-bold tracking-[0.25em] text-cyan-300/80 uppercase">
            CHỦ QUYỀN VIỆT NAM
          </span>
        </div>
      `,
      iconSize: [260, 50],
      iconAnchor: [130, 25]
    });
    group.addLayer(L.marker([14.2, 113.0], { icon: bienDongIcon, interactive: false }));

    // 4. Vịnh Bắc Bộ watermark
    const vinhBacBoIcon = L.divIcon({
      className: 'custom-sea-watermark',
      html: `
        <div class="opacity-60 pointer-events-none select-none text-center">
          <span class="text-[11px] sm:text-[13px] font-serif font-bold tracking-[0.2em] text-cyan-200/70 uppercase drop-shadow">
            VỊNH BẮC BỘ
          </span>
        </div>
      `,
      iconSize: [160, 30],
      iconAnchor: [80, 15]
    });
    group.addLayer(L.marker([19.8, 107.4], { icon: vinhBacBoIcon, interactive: false }));

    // 5. Vịnh Thái Lan watermark
    const vinhThaiLanIcon = L.divIcon({
      className: 'custom-sea-watermark',
      html: `
        <div class="opacity-60 pointer-events-none select-none text-center">
          <span class="text-[11px] sm:text-[13px] font-serif font-bold tracking-[0.2em] text-cyan-200/70 uppercase drop-shadow">
            VỊNH THÁI LAN
          </span>
        </div>
      `,
      iconSize: [160, 30],
      iconAnchor: [80, 15]
    });
    group.addLayer(L.marker([9.2, 103.2], { icon: vinhThaiLanIcon, interactive: false }));
  };

  // Helper to compute color for a province based on active theme
  const getProvinceColor = (displayName: string): string => {
    const theme = COLOR_THEMES[colorTheme];
    const palette = theme.sampleColors;

    if (colorTheme === 'multi') {
      const idx = getProvinceHashIndex(displayName, MULTI_PALETTE.length);
      return MULTI_PALETTE[idx];
    }

    const idx = getProvinceHashIndex(displayName, palette.length);
    return palette[idx];
  };

  // 4. Render Vietnam Provinces GeoJSON on Map
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clean up old GeoJSON layer
    if (geojsonLayerRef.current) {
      map.removeLayer(geojsonLayerRef.current);
      geojsonLayerRef.current = null;
    }

    if (!geoData) return;

    const getProvinceStyle = (feature: any) => {
      const displayName = feature.properties.vietnameseName || feature.properties.Name;
      const isSelected = selectedProvinceName && (
        displayName.toLowerCase() === selectedProvinceName.toLowerCase() ||
        feature.properties.Name?.toLowerCase() === selectedProvinceName.toLowerCase()
      );
      const isHovered = hoveredProvinceName && (
        displayName.toLowerCase() === hoveredProvinceName.toLowerCase() ||
        feature.properties.Name?.toLowerCase() === hoveredProvinceName.toLowerCase()
      );

      if (isSelected) {
        return {
          fillColor: '#f59e0b',
          fillOpacity: 0.85,
          color: '#ffffff',
          weight: 3.5,
          opacity: 1
        };
      }

      if (isHovered) {
        return {
          fillColor: '#38bdf8',
          fillOpacity: 0.75,
          color: '#fbbf24',
          weight: 2.5,
          opacity: 1
        };
      }

      const baseColor = getProvinceColor(displayName);

      return {
        fillColor: baseColor,
        fillOpacity: showProvinceBorders ? colorOpacity : 0.45,
        color: showProvinceBorders ? '#fef08a' : '#ffffff',
        weight: showProvinceBorders ? 1.2 : 0.6,
        opacity: showProvinceBorders ? 0.9 : 0.4
      };
    };

    const geoLayer = L.geoJSON(geoData, {
      style: getProvinceStyle,
      onEachFeature: (feature, layer) => {
        const props = feature.properties as ProvinceProperties;
        const displayName = props.vietnameseName || props.Name;

        const heritagesInProv = heritages.filter(h => 
          h.province.toLowerCase().includes(displayName.toLowerCase()) ||
          displayName.toLowerCase().includes(h.province.toLowerCase())
        );

        const tooltipContent = `
          <div class="px-3 py-2 bg-stone-950/95 text-stone-100 border border-amber-500/70 rounded-xl shadow-2xl text-xs font-serif">
            <div class="font-bold text-amber-300 flex items-center gap-1.5 text-sm">
              <span>📍 ${displayName}</span>
            </div>
            <div class="text-[11px] text-stone-300 mt-1 flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>${heritagesInProv.length > 0 ? `${heritagesInProv.length} di sản văn hóa & lịch sử` : 'Nhấn để xem địa phương'}</span>
            </div>
            <div class="text-[9px] text-amber-400/90 mt-1 italic">
              Chạm để phóng to & lọc danh sách
            </div>
          </div>
        `;

        layer.bindTooltip(tooltipContent, {
          sticky: true,
          direction: 'auto',
          className: 'hdv-custom-tooltip'
        });

        layer.on({
          mouseover: (e) => {
            setHoveredProvinceName(displayName);
            const l = e.target;
            l.setStyle({
              fillColor: '#38bdf8',
              fillOpacity: 0.75,
              color: '#fbbf24',
              weight: 2.8
            });
            l.bringToFront();
          },
          mouseout: (e) => {
            setHoveredProvinceName(null);
            geoLayer.resetStyle(e.target);
          },
          click: (e) => {
            handleSelectProvince(displayName, (layer as any).getBounds());
          }
        });
      }
    }).addTo(map);

    geojsonLayerRef.current = geoLayer;

  }, [geoData, showProvinceBorders, colorTheme, colorOpacity, selectedProvinceName, hoveredProvinceName, heritages]);

  // 5. Render Province Center Text Labels
  useEffect(() => {
    const labelsGroup = labelsLayerRef.current;
    if (!labelsGroup) return;

    labelsGroup.clearLayers();

    if (!showProvinceLabels || !geoData) return;

    geoData.features.forEach((feature: any) => {
      const props = feature.properties as ProvinceProperties;
      const displayName = props.vietnameseName || props.Name;
      const center = props.center;

      if (!center || !center[0] || !center[1]) return;

      const isSelected = selectedProvinceName && displayName.toLowerCase() === selectedProvinceName.toLowerCase();

      const labelIcon = L.divIcon({
        className: 'custom-province-label',
        html: `
          <div class="pointer-events-none select-none text-center transform -translate-x-1/2 -translate-y-1/2">
            <span class="px-1.5 py-0.5 rounded-md text-[10px] font-sans font-bold whitespace-nowrap shadow-md ${
              isSelected
                ? 'bg-amber-400 text-stone-950 ring-2 ring-white scale-110'
                : 'bg-stone-950/75 text-stone-100 border border-stone-800/80 backdrop-blur-[2px]'
            } transition-all">
              ${displayName}
            </span>
          </div>
        `,
        iconSize: [80, 20],
        iconAnchor: [40, 10]
      });

      const labelMarker = L.marker([center[0], center[1]], {
        icon: labelIcon,
        interactive: false
      });

      labelsGroup.addLayer(labelMarker);
    });

  }, [showProvinceLabels, geoData, selectedProvinceName]);

  // 6. Update Heritage Pins on the Map
  useEffect(() => {
    const markersGroup = markersLayerRef.current;
    if (!markersGroup) return;

    markersGroup.clearLayers();

    let itemsToPin = heritages;

    // Filter by category
    if (selectedCategory !== 'all') {
      itemsToPin = itemsToPin.filter(h => h.category === selectedCategory);
    }

    // Filter by region
    if (selectedRegion !== 'all') {
      itemsToPin = itemsToPin.filter(h => h.region === selectedRegion);
    }

    // Filter by selected province
    if (selectedProvinceName) {
      itemsToPin = itemsToPin.filter(h => 
        h.province.toLowerCase().includes(selectedProvinceName.toLowerCase()) ||
        selectedProvinceName.toLowerCase().includes(h.province.toLowerCase())
      );
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      itemsToPin = itemsToPin.filter(h => 
        h.name.toLowerCase().includes(q) || 
        h.province.toLowerCase().includes(q)
      );
    }

    itemsToPin.forEach(item => {
      if (!item.lat || !item.lng) return;

      const isSelected = activeHeritage?.id === item.id;

      const pinIcon = L.divIcon({
        className: 'custom-heritage-pin',
        html: `
          <div class="relative flex items-center justify-center group cursor-pointer">
            <span class="absolute w-7 h-7 rounded-full ${isSelected ? 'bg-amber-400' : 'bg-red-500'} opacity-75 animate-ping"></span>
            <div class="relative w-7 h-7 rounded-full flex items-center justify-center shadow-2xl border-2 ${
              isSelected 
                ? 'bg-amber-500 border-white text-stone-950 scale-125 ring-2 ring-amber-400' 
                : 'bg-stone-900 border-amber-400 text-amber-300 hover:scale-115 hover:border-amber-200'
            } transition-all">
              <span class="text-[12px]">🏛️</span>
            </div>
            <div class="absolute bottom-full mb-1 hidden group-hover:flex px-2 py-0.5 rounded-lg bg-stone-950/95 text-amber-200 text-[10px] font-bold whitespace-nowrap border border-amber-500/50 shadow-xl backdrop-blur">
              ${item.name}
            </div>
          </div>
        `,
        iconSize: [28, 28],
        iconAnchor: [14, 14]
      });

      const marker = L.marker([item.lat, item.lng], { icon: pinIcon });
      marker.on('click', () => {
        setActiveHeritage(item);
      });

      markersGroup.addLayer(marker);
    });

  }, [heritages, selectedProvinceName, selectedCategory, selectedRegion, searchQuery, activeHeritage]);

  // Handle province selection
  const handleSelectProvince = (name: string, bounds?: L.LatLngBounds) => {
    setSelectedProvinceName(name);

    const map = mapInstanceRef.current;
    if (map) {
      if (bounds && bounds.isValid()) {
        map.fitBounds(bounds, {
          padding: [50, 50],
          maxZoom: 10,
          animate: true,
          duration: 1
        });
      } else {
        const matched = geoData?.features.find((f: any) => 
          f.properties?.vietnameseName?.toLowerCase() === name.toLowerCase() ||
          f.properties?.Name?.toLowerCase() === name.toLowerCase()
        );
        if (matched?.properties && (matched.properties as any).center) {
          map.setView((matched.properties as any).center, 9, { animate: true });
        }
      }
    }
  };

  // Reset to full Vietnam view
  const handleResetVietnamView = () => {
    setSelectedProvinceName(null);
    setActiveHeritage(null);
    setSearchQuery('');
    setSelectedRegion('all');
    setSelectedCategory('all');
    const map = mapInstanceRef.current;
    if (map) {
      map.fitBounds(VIETNAM_BOUNDS, {
        padding: [15, 15],
        animate: true,
        duration: 1
      });
    }
  };

  // Quick zoom to specific region
  const handleSelectRegion = (region: 'all' | 'north' | 'central' | 'south') => {
    setSelectedRegion(region);
    const map = mapInstanceRef.current;
    if (!map) return;

    if (region === 'all') {
      map.fitBounds(VIETNAM_BOUNDS, { padding: [15, 15], animate: true });
    } else if (region === 'north') {
      map.setView([21.2, 105.8], 7, { animate: true });
    } else if (region === 'central') {
      map.setView([16.0, 108.0], 7, { animate: true });
    } else if (region === 'south') {
      map.setView([10.5, 106.3], 7, { animate: true });
    }
  };

  // GPS request handler
  const handleRequestGPS = async () => {
    setIsLocating(true);
    setLocationMessage('');
    const res = await geolocationService.requestCurrentPosition();
    setIsLocating(false);

    if (res.success && res.location) {
      setUserLocation(res.location);
      setLocationMessage(`Vị trí của bạn: ${res.location.cityName || 'Tọa độ GPS'}`);
      if (mapInstanceRef.current) {
        mapInstanceRef.current.setView([res.location.lat, res.location.lng], 11, { animate: true });
      }
    } else {
      setLocationMessage(res.error || 'Chưa thể lấy GPS. Đặt về Hà Nội.');
      const preset = geolocationService.setPresetLocation('hanoi');
      if (preset && mapInstanceRef.current) {
        setUserLocation(preset);
        mapInstanceRef.current.setView([preset.lat, preset.lng], 11, { animate: true });
      }
    }
  };

  // Filter heritages for display in list
  const heritagesInView = heritages.filter(item => {
    if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
    if (selectedRegion !== 'all' && item.region !== selectedRegion) return false;
    if (selectedProvinceName) {
      const matchProv = item.province.toLowerCase().includes(selectedProvinceName.toLowerCase()) ||
        selectedProvinceName.toLowerCase().includes(item.province.toLowerCase());
      if (!matchProv) return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchQuery = item.name.toLowerCase().includes(q) || item.province.toLowerCase().includes(q);
      if (!matchQuery) return false;
    }
    return true;
  });

  const categories = [
    { id: 'all', label: 'Tất cả di sản' },
    { id: 'monument', label: '📜 Di tích lịch sử' },
    { id: 'palace', label: '🏛 Hoàng thành & Cung điện' },
    { id: 'temple', label: '⛩ Đền chùa & Tháp cổ' },
    { id: 'ancient_house', label: '🏘 Đô thị cổ' },
    { id: 'craft_village', label: '🏺 Làng nghề truyền thống' }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 py-3 sm:py-5 text-stone-100">
      
      {/* Editorial Header */}
      <div className="text-center max-w-3xl mx-auto mb-4 sm:mb-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 text-xs font-semibold mb-2 backdrop-blur shadow-sm">
          <Globe className="w-4 h-4 text-amber-400" />
          <span>Bản Đồ Chuyên Biệt Việt Nam (Hình Chữ S Toàn Vẹn)</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-serif font-bold text-stone-100 tracking-tight">
          {selectedProvinceName ? `Bản Đồ Di Sản: ${selectedProvinceName}` : 'Dải Đất Hình Chữ S Việt Nam'}
        </h2>
        <p className="text-stone-300 text-xs sm:text-sm mt-1 font-light">
          {selectedProvinceName 
            ? `Đang tập trung vào khu vực ${selectedProvinceName}. Nhấn vào các điểm sáng để mở thông tin di sản.`
            : 'Khám phá trọn vẹn lãnh thổ 34 đơn vị hành chính cấp tỉnh mới của Việt Nam, Biển Đông cùng hai quần đảo Hoàng Sa & Trường Sa thiêng liêng.'}
        </p>
      </div>

      {/* Control Toolbars: Return Button, Mode Switcher, Color Themes, Search & GPS */}
      <div className="bg-stone-900/95 border border-stone-800 rounded-2xl p-3 sm:p-4 mb-4 shadow-xl backdrop-blur flex flex-wrap items-center justify-between gap-3">
        
        {/* Left: Return & Selected Status */}
        <div className="flex items-center gap-2 flex-wrap">
          {selectedProvinceName ? (
            <button
              onClick={handleResetVietnamView}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-stone-950 font-bold text-xs transition-all active:scale-95 cursor-pointer shadow-md border border-amber-300"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Toàn cảnh Việt Nam</span>
            </button>
          ) : (
            <div className="flex items-center gap-2 text-xs text-amber-300 font-semibold px-2 py-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Toàn cảnh chữ S</span>
            </div>
          )}

          {selectedProvinceName && (
            <span className="text-xs text-stone-300 bg-stone-950/80 px-3 py-1.5 rounded-xl border border-stone-800 hidden sm:inline-block">
              Tỉnh thành: <strong className="text-amber-300">{selectedProvinceName}</strong> ({heritagesInView.length} điểm)
            </span>
          )}

          {/* Quick Region Switcher */}
          <div className="inline-flex rounded-xl bg-stone-950 p-1 border border-stone-800">
            <button
              onClick={() => handleSelectRegion('all')}
              className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-colors cursor-pointer ${
                selectedRegion === 'all' ? 'bg-amber-500 text-stone-950 font-bold' : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              Toàn quốc
            </button>
            <button
              onClick={() => handleSelectRegion('north')}
              className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-colors cursor-pointer ${
                selectedRegion === 'north' ? 'bg-amber-500 text-stone-950 font-bold' : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              Miền Bắc
            </button>
            <button
              onClick={() => handleSelectRegion('central')}
              className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-colors cursor-pointer ${
                selectedRegion === 'central' ? 'bg-amber-500 text-stone-950 font-bold' : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              Miền Trung
            </button>
            <button
              onClick={() => handleSelectRegion('south')}
              className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-colors cursor-pointer ${
                selectedRegion === 'south' ? 'bg-amber-500 text-stone-950 font-bold' : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              Miền Nam
            </button>
          </div>
        </div>

        {/* Center: Chế Độ Bản Đồ & Đổi Màu Bản Đồ */}
        <div className="flex items-center gap-1.5 flex-wrap">
          
          {/* Base Mode Toggle: Vietnam Exclusive vs External Tiles */}
          <div className="flex items-center bg-stone-950 p-1 rounded-xl border border-stone-800 shrink-0">
            <button
              onClick={() => setBaseMode('vietnam_only')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                baseMode === 'vietnam_only'
                  ? 'bg-gradient-to-r from-red-600 to-amber-600 text-white shadow-md shadow-red-950/40 ring-1 ring-amber-300'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
              title="Chỉ hiển thị độc quyền bản đồ Việt Nam, không có quốc gia bên ngoài"
            >
              <span>🇻🇳</span>
              <span>Chỉ Bản Đồ VN</span>
            </button>

            <button
              onClick={() => setBaseMode('satellite')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                baseMode === 'satellite'
                  ? 'bg-amber-500 text-stone-950 font-bold shadow'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
              title="Bản đồ ảnh vệ tinh Esri World Imagery"
            >
              <span>🛰️</span>
              <span className="hidden sm:inline">Vệ Tinh</span>
            </button>

            <button
              onClick={() => setBaseMode('streets')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                baseMode === 'streets'
                  ? 'bg-amber-500 text-stone-950 font-bold shadow'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
              title="Bản đồ giao thông du lịch Esri World Street Map"
            >
              <span>🌟</span>
              <span className="hidden sm:inline">Du Lịch</span>
            </button>
          </div>

          {/* ĐỔI MÀU BẢN ĐỒ (Color Theme Switcher Dropdown) */}
          <div className="relative">
            <button
              onClick={() => setShowColorMenu(prev => !prev)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-950 hover:bg-stone-800/80 border border-amber-500/40 text-amber-300 font-semibold text-xs transition-all cursor-pointer shadow-sm"
              title="Đổi màu sắc bản đồ Việt Nam"
            >
              <Palette className="w-3.5 h-3.5 text-amber-400" />
              <span>{COLOR_THEMES[colorTheme].icon} {COLOR_THEMES[colorTheme].name}</span>
              <ChevronDown className="w-3 h-3 text-stone-400" />
            </button>

            {/* Dropdown Menu for Color Themes */}
            {showColorMenu && (
              <div className="absolute top-full mt-2 left-0 sm:right-0 sm:left-auto z-50 w-72 bg-stone-950/95 border border-amber-500/50 rounded-2xl p-3 shadow-2xl backdrop-blur animate-fadeIn space-y-2">
                <div className="text-[11px] font-bold text-amber-400 font-serif flex items-center justify-between pb-1.5 border-b border-stone-800">
                  <span className="flex items-center gap-1.5">
                    <Palette className="w-3.5 h-3.5" />
                    <span>Chọn tông màu bản đồ:</span>
                  </span>
                  <button 
                    onClick={() => setShowColorMenu(false)}
                    className="text-stone-400 hover:text-white p-0.5"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-1.5 max-h-56 overflow-y-auto no-scrollbar">
                  {(Object.keys(COLOR_THEMES) as MapColorTheme[]).map(key => {
                    const t = COLOR_THEMES[key];
                    const isSelected = colorTheme === key;

                    return (
                      <button
                        key={key}
                        onClick={() => {
                          setColorTheme(key);
                          setShowColorMenu(false);
                        }}
                        className={`w-full text-left p-2 rounded-xl transition-all flex items-center justify-between cursor-pointer ${
                          isSelected 
                            ? 'bg-amber-500/20 border border-amber-500/60 text-amber-200' 
                            : 'hover:bg-stone-900 border border-transparent text-stone-300'
                        }`}
                      >
                        <div>
                          <div className="flex items-center gap-1.5 text-xs font-bold">
                            <span>{t.icon}</span>
                            <span>{t.name}</span>
                          </div>
                          <div className="text-[10px] text-stone-400 mt-0.5 line-clamp-1">
                            {t.desc}
                          </div>
                        </div>

                        {/* Color swatches preview */}
                        <div className="flex items-center gap-1 shrink-0 ml-2">
                          {t.sampleColors.slice(0, 3).map((c, i) => (
                            <span 
                              key={i} 
                              className="w-3 h-3 rounded-full border border-stone-800 shadow-sm" 
                              style={{ backgroundColor: c }}
                            />
                          ))}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Opacity slider */}
                <div className="pt-2 border-t border-stone-800 flex items-center justify-between text-[11px]">
                  <span className="text-stone-400 flex items-center gap-1">
                    <SlidersHorizontal className="w-3 h-3 text-amber-400" />
                    <span>Độ đậm màu:</span>
                  </span>
                  <div className="flex items-center gap-1">
                    {[0.4, 0.65, 0.85].map(op => (
                      <button
                        key={op}
                        onClick={() => setColorOpacity(op)}
                        className={`px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer ${
                          colorOpacity === op 
                            ? 'bg-amber-500 text-stone-950 font-bold' 
                            : 'bg-stone-900 text-stone-400 hover:text-stone-200'
                        }`}
                      >
                        {op === 0.4 ? 'Nhạt' : op === 0.65 ? 'Vừa' : 'Đậm'}
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            )}
          </div>

          {/* Toggle Province Borders */}
          <button
            onClick={() => setShowProvinceBorders(prev => !prev)}
            className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold border transition-colors cursor-pointer flex items-center gap-1.5 ${
              showProvinceBorders 
                ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40' 
                : 'bg-stone-900 text-stone-400 border-stone-800'
            }`}
            title="Bật/Tắt đường ranh giới 63 tỉnh thành"
          >
            {showProvinceBorders ? <Eye className="w-3.5 h-3.5 text-emerald-400" /> : <EyeOff className="w-3.5 h-3.5 text-stone-500" />}
            <span className="hidden sm:inline">Ranh giới</span>
          </button>

          {/* Toggle Province Labels */}
          <button
            onClick={() => setShowProvinceLabels(prev => !prev)}
            className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold border transition-colors cursor-pointer flex items-center gap-1.5 ${
              showProvinceLabels 
                ? 'bg-cyan-950/80 text-cyan-300 border-cyan-500/40' 
                : 'bg-stone-900 text-stone-400 border-stone-800'
            }`}
            title="Bật/Tắt nhãn tên 63 tỉnh thành"
          >
            <Tag className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Tên tỉnh</span>
          </button>

        </div>

        {/* Right: Search, GPS & Map Zoom Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="relative w-36 sm:w-48">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm di tích, tỉnh thành..."
              className="w-full pl-8 pr-3 py-1.5 bg-stone-950 text-stone-100 placeholder-stone-500 text-xs rounded-xl border border-stone-700 focus:outline-none focus:border-amber-500"
            />
          </div>

          <button
            onClick={handleRequestGPS}
            disabled={isLocating}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-stone-950 font-bold text-xs transition-all active:scale-95 cursor-pointer disabled:opacity-50 shrink-0"
            title="Định vị tọa độ GPS của bạn"
          >
            <LocateFixed className={`w-3.5 h-3.5 ${isLocating ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">GPS</span>
          </button>

          <button
            onClick={() => mapInstanceRef.current?.zoomIn()}
            className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 cursor-pointer"
            title="Phóng to"
          >
            <ZoomIn className="w-4 h-4 text-amber-400" />
          </button>

          <button
            onClick={() => mapInstanceRef.current?.zoomOut()}
            className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 cursor-pointer"
            title="Thu nhỏ"
          >
            <ZoomOut className="w-4 h-4 text-amber-400" />
          </button>

          <button
            onClick={handleResetVietnamView}
            className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 cursor-pointer"
            title="Về lại toàn cảnh chữ S"
          >
            <RotateCcw className="w-4 h-4 text-amber-400" />
          </button>
        </div>
      </div>

      {locationMessage && (
        <div className="mb-3 text-xs text-emerald-400 bg-emerald-950/60 px-3.5 py-1.5 rounded-xl border border-emerald-500/30 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{locationMessage}</span>
        </div>
      )}

      {/* Category Pills Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar mb-4 pb-1">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === cat.id
                ? 'bg-amber-500 text-stone-950 font-bold shadow-md shadow-amber-950/40'
                : 'bg-stone-900/90 text-stone-300 hover:text-amber-300 border border-stone-800'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Main Map & Interactive Layout: Ô Di Sản Nằm Bên Cạnh Ô Bản Đồ ("ô di sản nằm bên cạnh ô bản đồ") */}
      {(() => {
        const heritageBoxContent = (
          <div className="bg-stone-900/95 border border-stone-800 rounded-3xl p-4 sm:p-5 shadow-2xl backdrop-blur flex flex-col transition-all duration-200 w-full flex-1 max-h-[680px]">
            
            {/* Header: Title, Count, Position Toggle, Collapse & Reset */}
            <div className="pb-3 border-b border-stone-800 mb-3 space-y-2">
              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <h3 className="font-serif font-bold text-stone-100 text-sm sm:text-base flex items-center gap-1.5 truncate">
                    <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                    <span className="truncate">{selectedProvinceName ? `Di Sản: ${selectedProvinceName}` : 'Điểm Đến Di Sản Việt Nam'}</span>
                  </h3>
                  <p className="text-[11px] text-stone-400 mt-0.5">
                    {selectedProvinceName ? `Tìm thấy ${heritagesInView.length} địa điểm` : `Tổng cộng ${heritagesInView.length} địa điểm`}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  {selectedProvinceName && (
                    <button
                      onClick={handleResetVietnamView}
                      className="text-[11px] font-bold text-amber-400 hover:text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 px-2 py-1 rounded-lg transition-colors cursor-pointer"
                      title="Quay về toàn cảnh bản đồ Việt Nam"
                    >
                      Xem toàn quốc
                    </button>
                  )}

                  <button
                    onClick={() => setIsBoxCollapsed(prev => !prev)}
                    className="p-1.5 rounded-lg text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition-colors cursor-pointer"
                    title={isBoxCollapsed ? "Mở rộng ô thông tin" : "Thu gọn ô thông tin"}
                  >
                    {isBoxCollapsed ? <Maximize2 className="w-3.5 h-3.5 text-amber-400" /> : <Minimize2 className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* List of Heritages (Collapsible) */}
            {!isBoxCollapsed && (
              <div className="flex-1 overflow-y-auto space-y-3 pr-1 no-scrollbar min-h-0">
                {heritagesInView.length === 0 ? (
                  <div className="py-10 text-center text-stone-400 space-y-2">
                    <Compass className="w-8 h-8 text-stone-600 mx-auto" />
                    <p className="text-xs">Chưa có di sản nào khớp với bộ lọc này.</p>
                    <p className="text-[10px] text-stone-500">Dữ liệu văn hóa đang được liên tục bổ sung và cập nhật.</p>
                    {selectedProvinceName && (
                      <button
                        onClick={handleResetVietnamView}
                        className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-semibold hover:bg-amber-500/30 transition-all cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Xem toàn quốc</span>
                      </button>
                    )}
                  </div>
                ) : (
                  heritagesInView.map(item => {
                    const isSelected = activeHeritage?.id === item.id;
                    const distance = userLocation ? calculateDistanceKm(userLocation.lat, userLocation.lng, item.lat, item.lng) : null;

                    return (
                      <div
                        key={item.id}
                        onClick={() => {
                          setActiveHeritage(item);
                          if (mapInstanceRef.current && item.lat && item.lng) {
                            mapInstanceRef.current.setView([item.lat, item.lng], 12, { animate: true });
                          }
                        }}
                        className={`p-3 rounded-2xl border transition-all cursor-pointer flex gap-3 group ${
                          isSelected 
                            ? 'bg-amber-950/40 border-amber-500/80 shadow-md ring-1 ring-amber-500/30' 
                            : 'bg-stone-950/70 hover:bg-stone-800/80 border-stone-800/80 hover:border-amber-500/40'
                        }`}
                      >
                        <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-stone-900 border border-stone-800">
                          <img 
                            src={getSafeHeritageImageUrl(item.imageUrl)} 
                            alt={item.name} 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            onError={handleImageError}
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 text-[10px] text-amber-400 font-semibold mb-0.5">
                            <MapPin className="w-3 h-3 text-red-400 shrink-0" />
                            <span className="truncate">{item.province}</span>
                            {distance !== null && (
                              <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 ml-auto shrink-0">
                                ~{distance.toFixed(0)} km
                              </span>
                            )}
                          </div>

                          <h4 className="font-serif font-bold text-stone-100 text-xs sm:text-sm truncate group-hover:text-amber-300 transition-colors">
                            {item.name}
                          </h4>

                          <p className="text-[11px] text-stone-400 line-clamp-1 mt-0.5">
                            {item.culturalSignificance}
                          </p>
                        </div>

                        <ChevronRight className="w-4 h-4 text-stone-600 group-hover:text-amber-400 self-center shrink-0" />
                      </div>
                    );
                  })
                )}
              </div>
            )}
          </div>
        );

        // MAP CANVAS ELEMENT (Reusable across layout modes)
        const mapCanvasElement = (
          <div className="w-full h-[580px] sm:h-[680px] relative z-0 bg-[#061426] overflow-hidden rounded-3xl">
            <div 
              ref={mapContainerRef} 
              className="w-full h-full relative z-0 bg-[#061426]"
              style={{
                backgroundImage: 'radial-gradient(ellipse at 75% 50%, #0d2646 0%, #061426 100%)'
              }}
            />

            {/* Map Legend Overlay */}
            <div className="absolute bottom-4 left-4 z-20 bg-stone-950/90 backdrop-blur border border-stone-800 p-2.5 rounded-2xl text-[11px] space-y-1.5 shadow-xl hidden sm:block pointer-events-none">
              <div className="font-bold text-amber-300 font-serif">Chú giải bản đồ Việt Nam:</div>
              <div className="flex items-center gap-2 text-stone-300">
                <span className="w-3 h-0.5 bg-[#f59e0b]" />
                <span>Đường ranh giới 63 tỉnh thành</span>
              </div>
              <div className="flex items-center gap-2 text-stone-300">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                <span>Điểm di sản văn hóa & danh thắng</span>
              </div>
              <div className="flex items-center gap-2 text-amber-300 font-semibold">
                <span>🇻🇳</span>
                <span>Chủ quyền Hoàng Sa & Trường Sa</span>
              </div>
              {baseMode === 'vietnam_only' && (
                <div className="flex items-center gap-2 text-emerald-400 text-[10px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Chế độ: Độc quyền bản đồ Việt Nam</span>
                </div>
              )}
            </div>

            {/* Floating Hover Badge on Top of Map */}
            {hoveredProvinceName && (
              <div className="absolute top-4 left-4 z-20 bg-stone-950/95 backdrop-blur border border-amber-500/60 px-3.5 py-1.5 rounded-2xl shadow-2xl flex items-center gap-2 pointer-events-none animate-fadeIn">
                <Compass className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-xs font-serif font-bold text-amber-200">{hoveredProvinceName}</span>
                <span className="text-[10px] text-stone-400">• Nhấn để phóng to</span>
              </div>
            )}

            {/* Compass Rose icon on map corner */}
            <div className="absolute top-4 right-4 z-20 pointer-events-none select-none opacity-40 hidden sm:flex items-center justify-center w-12 h-12 rounded-full border border-amber-400/30 bg-stone-950/60 backdrop-blur text-amber-300">
              <Compass className="w-7 h-7 text-amber-300 animate-[spin_60s_linear_infinite]" />
            </div>
          </div>
        );

        // SIDE-BY-SIDE LAYOUT (sidePosition === 'left' or 'right')
        if (sidePosition === 'left') {
          return (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              <div className="col-span-1 lg:col-span-4 lg:order-first flex flex-col gap-4">
                {heritageBoxContent}
              </div>
              <div className="col-span-1 lg:col-span-8 rounded-3xl border border-amber-500/30 shadow-2xl overflow-hidden relative">
                {mapCanvasElement}
              </div>
            </div>
          );
        }

        return (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            <div className="col-span-1 lg:col-span-8 rounded-3xl border border-amber-500/30 shadow-2xl overflow-hidden relative">
              {mapCanvasElement}
            </div>
            <div className="col-span-1 lg:col-span-4 flex flex-col gap-4">
              {heritageBoxContent}
            </div>
          </div>
        );
      })()}

      {/* HERITAGE DETAIL MODAL / BOTTOM SHEET */}
      {activeHeritage && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-stone-900 border border-stone-800 rounded-t-3xl sm:rounded-3xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden relative">
            
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-stone-800 bg-stone-950/80 flex items-center justify-between">
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold shrink-0">
                  {activeHeritage.categoryLabel}
                </span>
                <h3 className="font-serif font-bold text-stone-100 text-base sm:text-lg truncate">
                  {activeHeritage.name}
                </h3>
              </div>
              <button
                onClick={() => setActiveHeritage(null)}
                className="p-2 rounded-xl text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition-colors shrink-0 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 no-scrollbar">
              <div className="relative h-60 w-full rounded-2xl overflow-hidden bg-stone-950 border border-stone-800">
                <img
                  src={getSafeHeritageImageUrl(activeHeritage.imageUrl)}
                  alt={activeHeritage.name}
                  className="w-full h-full object-cover"
                  onError={handleImageError}
                />
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-stone-950 border border-stone-800">
                  <span className="text-stone-400 block mb-1">Địa phương</span>
                  <span className="font-semibold text-amber-200">{activeHeritage.province}</span>
                </div>
                <div className="p-3 rounded-xl bg-stone-950 border border-stone-800">
                  <span className="text-stone-400 block mb-1">Thời kỳ / Triều đại</span>
                  <span className="font-semibold text-amber-200">{activeHeritage.period || 'Đang cập nhật'}</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <h4 className="font-serif font-bold text-amber-300 text-sm">Ý nghĩa Lịch sử & Văn hóa</h4>
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-light">
                  {activeHeritage.culturalSignificance}
                </p>
              </div>

              <div className="space-y-1.5">
                <h4 className="font-serif font-bold text-amber-300 text-sm">Lịch sử Hình thành</h4>
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-light">
                  {activeHeritage.history || 'Đang cập nhật thêm tư liệu lịch sử từ chuyên gia.'}
                </p>
              </div>

              {/* Practical Info: Hours & Tickets */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="flex items-center gap-2 p-3 rounded-xl bg-stone-950 border border-stone-800 text-xs">
                  <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                  <div>
                    <span className="text-stone-400 block">Giờ mở cửa</span>
                    <span className="text-stone-200 font-medium">{activeHeritage.visitingHours || 'Chưa có dữ liệu xác nhận'}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-3 rounded-xl bg-stone-950 border border-stone-800 text-xs">
                  <Ticket className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div>
                    <span className="text-stone-400 block">Giá vé tham khảo</span>
                    <span className="text-stone-200 font-medium">{activeHeritage.ticketPrice || 'Chưa có dữ liệu xác nhận'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-stone-800 bg-stone-950/80 flex items-center justify-between gap-3">
              <button
                onClick={() => {
                  const heritageName = activeHeritage.name;
                  const history = activeHeritage.history;
                  const period = activeHeritage.period;
                  setActiveHeritage(null);
                  onNavigateToStory(heritageName, history, period);
                }}
                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow transition-all active:scale-95 cursor-pointer"
              >
                <Volume2 className="w-4 h-4" />
                <span>Nghe AI Kể Chuyện</span>
              </button>

              <button
                onClick={() => {
                  const heritageId = activeHeritage.id;
                  setActiveHeritage(null);
                  onNavigateToFood(heritageId);
                }}
                className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow transition-all active:scale-95 cursor-pointer"
              >
                <Utensils className="w-4 h-4" />
                <span>Ẩm Thực Gần Đây</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
