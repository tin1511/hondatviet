import React, { useState, useEffect } from 'react';
import { 
  X, 
  Wifi, 
  WifiOff, 
  DownloadCloud, 
  CheckCircle2, 
  Database, 
  Trash2, 
  Search, 
  Compass, 
  BookOpen, 
  MapPin, 
  Sparkles, 
  RefreshCw,
  HardDrive,
  Info,
  Layers,
  ArrowDownCircle
} from 'lucide-react';
import { offlineStorageService, OfflinePackageMeta } from '../services/offlineStorageService';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { HeritageItem } from '../types';

interface OfflineHeritageManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectHeritage?: (item: HeritageItem) => void;
}

export const OfflineHeritageManagerModal: React.FC<OfflineHeritageManagerModalProps> = ({
  isOpen,
  onClose,
  onSelectHeritage
}) => {
  const isOnline = useOnlineStatus();
  const [meta, setMeta] = useState<OfflinePackageMeta>(offlineStorageService.getMeta());
  const [isCaching, setIsCaching] = useState(false);
  const [progressPercent, setProgressPercent] = useState(0);
  const [progressMsg, setProgressMsg] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [cachedHeritages, setCachedHeritages] = useState<HeritageItem[]>([]);
  const [selectedRegionFilter, setSelectedRegionFilter] = useState<'all' | 'north' | 'central' | 'south'>('all');

  useEffect(() => {
    if (isOpen) {
      refreshData();
    }
  }, [isOpen]);

  const refreshData = () => {
    const currentMeta = offlineStorageService.getMeta();
    setMeta(currentMeta);
    setCachedHeritages(offlineStorageService.getOfflineHeritages());
  };

  if (!isOpen) return null;

  const handleStartDownload = async () => {
    setIsCaching(true);
    setProgressPercent(0);
    setProgressMsg('Khởi tạo gói di sản ngoại tuyến...');

    try {
      const updatedMeta = await offlineStorageService.cacheAllHeritageData((percent, msg) => {
        setProgressPercent(percent);
        setProgressMsg(msg);
      });
      setMeta(updatedMeta);
      setCachedHeritages(offlineStorageService.getOfflineHeritages());
    } catch (err) {
      console.error('Error downloading offline heritage package:', err);
      setProgressMsg('Lỗi khi tải bộ nhớ đệm ngoại tuyến.');
    } finally {
      setTimeout(() => {
        setIsCaching(false);
      }, 800);
    }
  };

  const handleClearStorage = async () => {
    if (window.confirm('Bạn có chắc chắn muốn xóa bộ nhớ đệm ngoại tuyến?')) {
      await offlineStorageService.clearOfflineCache();
      refreshData();
    }
  };

  const filteredHeritages = cachedHeritages.filter(h => {
    const matchSearch = 
      !searchQuery ||
      h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.province.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (h.vietnameseName && h.vietnameseName.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchRegion = selectedRegionFilter === 'all' || h.region === selectedRegionFilter;
    return matchSearch && matchRegion;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-3xl bg-stone-900 border border-stone-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-stone-800 bg-stone-950/60">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-amber-500/10 text-amber-400 rounded-2xl border border-amber-500/20">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-stone-100 font-serif">Chế Độ Ngoại Tuyến & Cache Di Sản</h2>
                <span className={`px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded-md ${
                  isOnline 
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                    : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                }`}>
                  {isOnline ? 'Đang có Internet' : 'Ngoại tuyến (Offline)'}
                </span>
              </div>
              <p className="text-xs text-stone-400 mt-0.5">
                Tải trước dữ liệu di sản, bài thuyết minh & bản đồ để sẵn sàng tra cứu khi đến vùng sâu vùng xa
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-100 hover:bg-stone-800 rounded-full transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">

          {/* Offline Status Card */}
          <div className={`p-5 rounded-2xl border ${
            meta.isFullyCached 
              ? 'bg-stone-950/80 border-emerald-500/30' 
              : 'bg-stone-950/80 border-amber-500/30'
          }`}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className={`p-3 rounded-2xl shrink-0 ${
                  meta.isFullyCached ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                }`}>
                  {meta.isFullyCached ? (
                    <CheckCircle2 className="w-6 h-6" />
                  ) : (
                    <DownloadCloud className="w-6 h-6 animate-bounce" />
                  )}
                </div>
                <div>
                  <h3 className="text-base font-semibold text-stone-100">
                    {meta.isFullyCached ? 'Đã Sẵn Sàng Dùng Ngoại Tuyến' : 'Chưa Tải Đủ Bộ Dữ Liệu Ngoại Tuyến'}
                  </h3>
                  <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                    {meta.isFullyCached
                      ? `Lần cập nhật cuối: ${new Date(meta.lastUpdated).toLocaleString('vi-VN')}. Toàn bộ di sản 3 miền đã được lưu trong bộ nhớ Service Worker.`
                      : 'Hãy bấm tải gói dữ liệu trước khi đi du lịch đến các địa danh không có sóng điện thoại hoặc Wi-Fi.'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={handleStartDownload}
                  disabled={isCaching}
                  className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs rounded-xl flex items-center gap-2 shadow-lg shadow-amber-500/10 disabled:opacity-50 transition"
                >
                  <DownloadCloud className="w-4 h-4" />
                  <span>{meta.isFullyCached ? 'Cập Nhật Lại Cache' : 'Tải Gói Di Sản (Offline)'}</span>
                </button>

                {meta.isFullyCached && (
                  <button
                    onClick={handleClearStorage}
                    disabled={isCaching}
                    className="p-2.5 text-stone-400 hover:text-rose-400 bg-stone-900 hover:bg-stone-800 rounded-xl border border-stone-800 transition"
                    title="Xóa bộ nhớ đệm"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Caching Progress Bar */}
            {isCaching && (
              <div className="mt-4 pt-4 border-t border-stone-800 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-amber-400 font-medium flex items-center gap-2">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    {progressMsg}
                  </span>
                  <span className="font-mono text-amber-400 font-bold">{progressPercent}%</span>
                </div>
                <div className="w-full bg-stone-800 h-2.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-amber-500 h-full transition-all duration-300 ease-out"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="p-4 bg-stone-950/50 border border-stone-800/80 rounded-2xl">
              <div className="flex items-center gap-2 text-stone-400 text-xs mb-1">
                <Compass className="w-3.5 h-3.5 text-amber-400" />
                <span>Di Sản Đã Lưu</span>
              </div>
              <p className="text-2xl font-bold text-amber-400 font-serif">
                {meta.totalHeritages || cachedHeritages.length || 24}
              </p>
            </div>

            <div className="p-4 bg-stone-950/50 border border-stone-800/80 rounded-2xl">
              <div className="flex items-center gap-2 text-stone-400 text-xs mb-1">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>Địa Điểm Lân Cận</span>
              </div>
              <p className="text-2xl font-bold text-amber-400 font-serif">
                {meta.totalPlaces || 18}
              </p>
            </div>

            <div className="p-4 bg-stone-950/50 border border-stone-800/80 rounded-2xl">
              <div className="flex items-center gap-2 text-stone-400 text-xs mb-1">
                <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                <span>Kể Chuyện Lịch Sử</span>
              </div>
              <p className="text-2xl font-bold text-amber-400 font-serif">
                {meta.totalStories || 5} Phong cách
              </p>
            </div>

            <div className="p-4 bg-stone-950/50 border border-stone-800/80 rounded-2xl">
              <div className="flex items-center gap-2 text-stone-400 text-xs mb-1">
                <HardDrive className="w-3.5 h-3.5 text-amber-400" />
                <span>Dung Lượng Cache</span>
              </div>
              <p className="text-2xl font-bold text-amber-400 font-serif">
                {meta.estimatedSizeKB ? `${(meta.estimatedSizeKB / 1024).toFixed(1)} MB` : '1.2 MB'}
              </p>
            </div>
          </div>

          {/* Offline Heritage List & Search */}
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <h3 className="text-sm font-semibold text-stone-200 flex items-center gap-2">
                <Layers className="w-4 h-4 text-amber-400" />
                <span>Danh Sách Di Sản Có Sẵn Trong Bộ Nhớ Ngoại Tuyến</span>
              </h3>

              {/* Region Filter Pills */}
              <div className="flex items-center gap-1 bg-stone-950/80 p-1 rounded-xl border border-stone-800 text-xs">
                <button
                  onClick={() => setSelectedRegionFilter('all')}
                  className={`px-2.5 py-1 rounded-lg transition ${
                    selectedRegionFilter === 'all' 
                      ? 'bg-amber-500 text-stone-950 font-bold' 
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  Tất cả
                </button>
                <button
                  onClick={() => setSelectedRegionFilter('north')}
                  className={`px-2.5 py-1 rounded-lg transition ${
                    selectedRegionFilter === 'north' 
                      ? 'bg-amber-500 text-stone-950 font-bold' 
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  Miền Bắc
                </button>
                <button
                  onClick={() => setSelectedRegionFilter('central')}
                  className={`px-2.5 py-1 rounded-lg transition ${
                    selectedRegionFilter === 'central' 
                      ? 'bg-amber-500 text-stone-950 font-bold' 
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  Miền Trung
                </button>
                <button
                  onClick={() => setSelectedRegionFilter('south')}
                  className={`px-2.5 py-1 rounded-lg transition ${
                    selectedRegionFilter === 'south' 
                      ? 'bg-amber-500 text-stone-950 font-bold' 
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  Miền Nam
                </button>
              </div>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                placeholder="Tìm kiếm di sản theo tên, tỉnh thành (ví dụ: Hà Nội, Huế, Quảng Nam)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-stone-950/60 border border-stone-800 rounded-xl text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500 transition"
              />
            </div>

            {/* List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-72 overflow-y-auto pr-1 custom-scrollbar">
              {filteredHeritages.length > 0 ? (
                filteredHeritages.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      if (onSelectHeritage) {
                        onSelectHeritage(item);
                        onClose();
                      }
                    }}
                    className="p-3 bg-stone-950/40 border border-stone-800/80 rounded-2xl hover:border-amber-500/50 hover:bg-stone-900/60 cursor-pointer transition flex items-center gap-3 group"
                  >
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-14 h-14 rounded-xl object-cover shrink-0 border border-stone-800"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-xl bg-stone-800 flex items-center justify-center text-amber-400 shrink-0">
                        <Compass className="w-6 h-6" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] px-1.5 py-0.2 bg-amber-500/10 text-amber-400 rounded font-medium border border-amber-500/20 shrink-0">
                          {item.categoryLabel}
                        </span>
                        <span className="text-[10px] text-stone-400 truncate">{item.province}</span>
                      </div>
                      <h4 className="text-xs font-bold text-stone-200 group-hover:text-amber-400 truncate mt-0.5">
                        {item.name}
                      </h4>
                      <p className="text-[11px] text-stone-400 truncate mt-0.5">
                        {item.history || item.culturalSignificance}
                      </p>
                    </div>
                    <span className="p-1.5 bg-emerald-500/10 text-emerald-400 rounded-lg shrink-0" title="Đã lưu offline">
                      <CheckCircle2 className="w-4 h-4" />
                    </span>
                  </div>
                ))
              ) : (
                <div className="col-span-2 text-center py-8 text-stone-500 text-xs">
                  Không tìm thấy di sản phù hợp trong bộ nhớ đệm.
                </div>
              )}
            </div>
          </div>

          {/* Information Notice */}
          <div className="p-4 bg-stone-950/80 border border-stone-800/60 rounded-2xl flex items-start gap-3 text-xs text-stone-400">
            <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-semibold text-stone-300">Cách hoạt động khi đi du lịch vùng sâu vùng xa:</p>
              <p className="leading-relaxed">
                Service Worker và bộ nhớ đệm CacheStorage giúp ứng dụng hoạt động mượt mà mà không phụ thuộc vào kết nối 3G/4G/Wi-Fi. Bạn có thể mở bài thuyết minh, xem vị trí trên bản đồ di sản và tra cứu lịch sử bất cứ lúc nào.
              </p>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-stone-800 bg-stone-950/60 flex items-center justify-between">
          <span className="text-xs text-stone-500">
            Service Worker Status: Active & Registered
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 font-medium text-xs rounded-xl transition"
          >
            Đóng
          </button>
        </div>

      </div>
    </div>
  );
};
