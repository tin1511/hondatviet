import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  MapPin, 
  Clock, 
  Ticket, 
  Navigation, 
  Volume2, 
  VolumeX, 
  Utensils, 
  BookOpen, 
  Compass, 
  ExternalLink, 
  Heart, 
  CheckCircle2, 
  Car, 
  Sparkles, 
  Share2, 
  History,
  Lightbulb,
  MessageSquare,
  AlertCircle
} from 'lucide-react';
import { HeritageItem } from '../types';
import { storageService } from '../services/storageService';
import { ttsService, TTSStatus } from '../services/ttsService';
import { geolocationService, calculateDistanceKm, formatTravelEstimate } from '../services/geolocationService';
import { getSafeHeritageImageUrl, handleImageError } from '../utils/imageUtils';

interface HeritageDetailModalProps {
  heritage: HeritageItem | null;
  isOpen: boolean;
  onClose: () => void;
  onNavigateToStory?: (heritageName: string, history?: string, period?: string) => void;
  onNavigateToFood?: (heritageId: string) => void;
  onAskAI?: (heritage: HeritageItem, initialQuestion?: string) => void;
  onNavigateToMap?: () => void;
}

export const HeritageDetailModal: React.FC<HeritageDetailModalProps> = ({
  heritage,
  isOpen,
  onClose,
  onNavigateToStory,
  onNavigateToFood,
  onAskAI,
  onNavigateToMap
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [ttsStatus, setTtsStatus] = useState<TTSStatus>('idle');
  const [showHistoricImage, setShowHistoricImage] = useState(false);
  const [copyNotification, setCopyNotification] = useState(false);

  useEffect(() => {
    if (heritage && isOpen) {
      setIsFavorite(storageService.isFavorite(heritage.id));
      setShowHistoricImage(false);
      setTtsStatus('idle');
    } else {
      ttsService.stop();
      setTtsStatus('idle');
    }

    return () => {
      ttsService.stop();
    };
  }, [heritage, isOpen]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!heritage) return null;

  // Distance calculation from current user location
  const userLoc = geolocationService.getLastKnownLocation();
  let distanceInfo: { km: number; drivingTime: string } | null = null;
  if (userLoc) {
    const distanceKm = calculateDistanceKm(
      userLoc.lat,
      userLoc.lng,
      heritage.lat,
      heritage.lng
    );
    const roundedKm = Math.round(distanceKm * 10) / 10;
    const times = formatTravelEstimate(roundedKm);
    distanceInfo = { km: roundedKm, drivingTime: times.driving };
  }

  const toggleFavorite = () => {
    const newStatus = storageService.toggleFavorite(heritage.id, heritage.name);
    setIsFavorite(newStatus);
  };

  const handleToggleSpeech = () => {
    ttsService.prepareForMobilePlayback();
    if (ttsStatus === 'playing') {
      ttsService.stop();
      setTtsStatus('idle');
    } else {
      const speechText = `${heritage.name}. Vị trí tại ${heritage.address}. ${heritage.culturalSignificance}. Lịch sử hình thành: ${heritage.history}`;
      setTtsStatus('loading');
      ttsService.speak(speechText, {
        onStatusChange: (status) => setTtsStatus(status),
        onEnd: () => setTtsStatus('idle'),
        onError: () => setTtsStatus('idle')
      });
    }
  };

  const handleShare = () => {
    const shareData = {
      title: heritage.name,
      text: `${heritage.name} - ${heritage.culturalSignificance}`,
      url: window.location.href
    };

    if (navigator.share) {
      navigator.share(shareData).catch(() => {});
    } else {
      navigator.clipboard.writeText(
        `${heritage.name} - ${heritage.address}\n${heritage.culturalSignificance}\n${heritage.googleMapsUri || window.location.href}`
      );
      setCopyNotification(true);
      setTimeout(() => setCopyNotification(false), 2500);
    }
  };

  const mapsUrl = heritage.googleMapsUri || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(heritage.name + ' ' + heritage.address)}`;

  return (
    <AnimatePresence>
      {isOpen && heritage && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-start justify-center p-2 sm:p-4 pt-2 sm:pt-4 bg-black/85 backdrop-blur-md overflow-hidden"
          onClick={onClose}
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 12 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="relative w-full max-w-3xl max-h-[96vh] bg-stone-900 border border-amber-500/40 rounded-3xl shadow-2xl overflow-hidden flex flex-col z-10"
            onClick={(e) => e.stopPropagation()}
          >
        {/* Top Header / Image Banner */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-stone-950 shrink-0">
          <img
            src={getSafeHeritageImageUrl(showHistoricImage && heritage.historicImageUrl ? heritage.historicImageUrl : heritage.imageUrl, heritage.id)}
            alt={heritage.name}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={(e) => handleImageError(e)}
            className="w-full h-full object-cover transition-all duration-500 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/30 to-black/60" />

          {/* Top Bar inside banner */}
          <div className="absolute top-3 sm:top-4 left-3 sm:left-4 right-3 sm:right-4 flex items-center justify-between gap-2 z-10">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-amber-500/90 text-stone-950 shadow-md backdrop-blur">
                {heritage.categoryLabel}
              </span>
              <span className="text-[11px] px-2.5 py-1 rounded-full bg-stone-950/80 text-amber-200 border border-amber-500/30 backdrop-blur">
                {heritage.period || heritage.dynasty || 'Di tích lịch sử'}
              </span>
              {heritage.verifiedStatus === 'verified' && (
                <span className="text-[10px] px-2.5 py-1 rounded-full bg-emerald-950/90 text-emerald-300 border border-emerald-500/40 flex items-center gap-1 backdrop-blur font-semibold">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  Di sản Quốc gia
                </span>
              )}
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={toggleFavorite}
                className={`p-2 sm:p-2.5 rounded-full backdrop-blur-md transition-all shadow-md active:scale-90 ${
                  isFavorite 
                    ? 'bg-red-500 text-white shadow-red-900/50' 
                    : 'bg-stone-950/70 text-stone-300 hover:text-white border border-stone-700'
                }`}
                title={isFavorite ? 'Bỏ lưu yêu thích' : 'Lưu vào yêu thích'}
              >
                <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
              </button>

              <button
                onClick={handleShare}
                className="p-2 sm:p-2.5 rounded-full bg-stone-950/70 text-stone-300 hover:text-white border border-stone-700 backdrop-blur-md transition-all shadow-md active:scale-90"
                title="Chia sẻ di sản"
              >
                <Share2 className="w-4 h-4" />
              </button>

              <button
                onClick={onClose}
                className="p-2 sm:p-2.5 rounded-full bg-stone-950/80 text-stone-300 hover:text-white hover:bg-stone-800 border border-stone-700 backdrop-blur-md transition-all shadow-md active:scale-90"
                title="Đóng cửa sổ (ESC)"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Historic Photo Toggle if available */}
          {heritage.historicImageUrl && (
            <div className="absolute top-16 right-3 sm:right-4 z-10">
              <button
                onClick={() => setShowHistoricImage(!showHistoricImage)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold backdrop-blur-md border transition-all flex items-center gap-1.5 shadow-lg ${
                  showHistoricImage 
                    ? 'bg-amber-500 text-stone-950 border-amber-400' 
                    : 'bg-stone-950/80 text-amber-300 border-amber-500/40 hover:bg-stone-900'
                }`}
              >
                <History className="w-3.5 h-3.5" />
                <span>{showHistoricImage ? 'Xem ảnh hiện tại' : `Xem ảnh tư liệu (${heritage.historicImageYear || 'Xưa'})`}</span>
              </button>
            </div>
          )}

          {/* Bottom title info over banner */}
          <div className="absolute bottom-3 sm:bottom-4 left-4 sm:left-6 right-4 sm:right-6">
            <h2 className="text-xl sm:text-3xl font-serif font-extrabold text-stone-100 tracking-tight drop-shadow-md">
              {heritage.name}
            </h2>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-xs text-stone-300 drop-shadow">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-red-400 shrink-0" />
                <span>{heritage.address || heritage.province}</span>
              </span>

              {distanceInfo && (
                <span className="flex items-center gap-2 text-amber-300 font-semibold bg-stone-950/80 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                  <Navigation className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span>Cách {distanceInfo.km} km</span>
                  <span>•</span>
                  <Car className="w-3 h-3 text-amber-400 shrink-0" />
                  <span>{distanceInfo.drivingTime}</span>
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Copy Notification Toast */}
        {copyNotification && (
          <div className="bg-emerald-900/90 text-emerald-200 border border-emerald-500/50 text-xs px-4 py-2 text-center font-medium animate-fadeIn">
            ✓ Đã sao chép thông tin và liên kết di sản vào bộ nhớ tạm!
          </div>
        )}

        {/* Scrollable Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 divide-y divide-stone-800">
          
          {/* Quick Voice Narration Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 bg-gradient-to-r from-amber-950/40 to-stone-950 border border-amber-500/30 rounded-2xl">
            <div className="flex items-center gap-3">
              <button
                onClick={handleToggleSpeech}
                className={`p-3 rounded-xl font-bold flex items-center justify-center transition-all cursor-pointer shadow ${
                  ttsStatus === 'playing'
                    ? 'bg-amber-500 text-stone-950 animate-pulse'
                    : 'bg-stone-800 text-amber-400 hover:bg-stone-700 hover:text-amber-300 border border-stone-700'
                }`}
                title={ttsStatus === 'playing' ? 'Dừng đọc' : 'Bật thuyết minh giọng nói'}
              >
                {ttsStatus === 'playing' ? (
                  <VolumeX className="w-5 h-5" />
                ) : (
                  <Volume2 className="w-5 h-5" />
                )}
              </button>
              <div>
                <p className="text-xs font-bold text-amber-200 flex items-center gap-1.5">
                  <span>{ttsStatus === 'playing' ? '🔊 Đang thuyết minh...' : 'Thuyết minh giọng nói Di sản'}</span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold">
                    🎙️ VieNeu AI
                  </span>
                </p>
                <p className="text-[11px] text-stone-400">
                  {ttsStatus === 'playing' ? 'Bấm để tạm dừng âm thanh' : 'Nghe giọng đọc VieNeu AI truyền cảm tóm tắt di tích'}
                </p>
              </div>
            </div>

            {ttsStatus === 'playing' && (
              <div className="flex items-center gap-1 text-amber-400 text-xs font-mono">
                <span className="inline-block w-1.5 h-3 bg-amber-400 animate-pulse"></span>
                <span className="inline-block w-1.5 h-5 bg-amber-400 animate-pulse delay-75"></span>
                <span className="inline-block w-1.5 h-2 bg-amber-400 animate-pulse delay-150"></span>
                <span className="text-[11px] ml-1">Live Audio</span>
              </div>
            )}
          </div>

          {/* Practical Visit Info Grid */}
          <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
            <div className="bg-stone-950/80 p-3 rounded-2xl border border-stone-800">
              <span className="text-stone-400 flex items-center gap-1.5 mb-1 font-medium">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                Giờ tham quan:
              </span>
              <span className="text-stone-200 font-semibold">{heritage.visitingHours || '07:30 - 17:30 hàng ngày'}</span>
            </div>

            <div className="bg-stone-950/80 p-3 rounded-2xl border border-stone-800">
              <span className="text-stone-400 flex items-center gap-1.5 mb-1 font-medium">
                <Ticket className="w-3.5 h-3.5 text-amber-400" />
                Giá vé tham khảo:
              </span>
              <span className="text-stone-200 font-semibold">{heritage.ticketPrice || 'Miễn phí / Tùy khu vực'}</span>
            </div>

            <div className="col-span-2 sm:col-span-1 bg-stone-950/80 p-3 rounded-2xl border border-stone-800">
              <span className="text-stone-400 flex items-center gap-1.5 mb-1 font-medium">
                <Compass className="w-3.5 h-3.5 text-amber-400" />
                Tỉnh / Vùng miền:
              </span>
              <span className="text-stone-200 font-semibold">{heritage.province} • {heritage.region === 'north' ? 'Miền Bắc' : heritage.region === 'central' ? 'Miền Trung' : 'Miền Nam'}</span>
            </div>
          </div>

          {/* Cultural Significance & Value */}
          <div className="pt-4 space-y-2">
            <h3 className="text-sm font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2 font-mono">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Giá Trị Văn Hóa & Nghệ Thuật
            </h3>
            <p className="text-stone-200 text-sm sm:text-base leading-relaxed font-serif bg-stone-950/40 p-4 rounded-2xl border border-stone-800/80">
              {heritage.culturalSignificance}
            </p>
          </div>

          {/* History Details */}
          <div className="pt-4 space-y-2">
            <h3 className="text-sm font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2 font-mono">
              <BookOpen className="w-4 h-4 text-amber-400" />
              Lịch Sử Hình Thành & Niên Đại
            </h3>
            <div className="text-stone-300 text-xs sm:text-sm leading-relaxed space-y-2 bg-stone-950/30 p-4 rounded-2xl border border-stone-800">
              <p>{heritage.history}</p>
              {heritage.overview && (
                <p className="text-stone-400 italic text-xs pt-2 border-t border-stone-800">
                  {heritage.overview}
                </p>
              )}
            </div>
          </div>

          {/* Interesting Facts */}
          {heritage.interestingFacts && heritage.interestingFacts.length > 0 && (
            <div className="pt-4 space-y-3">
              <h3 className="text-sm font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2 font-mono">
                <Lightbulb className="w-4 h-4 text-amber-400" />
                Có Thể Bạn Chưa Biết (Kỳ Tích & Bí Ẩn)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {heritage.interestingFacts.map((fact, index) => (
                  <div 
                    key={index}
                    className="p-3 bg-stone-950/80 border border-stone-800/90 rounded-xl text-xs text-stone-300 flex items-start gap-2.5"
                  >
                    <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center shrink-0 text-[10px]">
                      {index + 1}
                    </span>
                    <span className="leading-relaxed">{fact}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Suggested AI Tour Guide Questions */}
          {heritage.suggestedQuestions && heritage.suggestedQuestions.length > 0 && (
            <div className="pt-4 space-y-2.5">
              <h3 className="text-sm font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2 font-mono">
                <MessageSquare className="w-4 h-4 text-amber-400" />
                Hỏi Nhanh Hướng Dẫn Viên Du Lịch AI
              </h3>
              <div className="flex flex-wrap gap-2">
                {heritage.suggestedQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      onClose();
                      onAskAI?.(heritage, q);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-stone-950 hover:bg-amber-950/60 border border-stone-700 hover:border-amber-500/50 text-xs text-stone-300 hover:text-amber-200 text-left transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
                  >
                    <span className="text-amber-400 text-xs">💬</span>
                    <span>{q}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Action Button Footer Toolbar */}
        <div className="p-3 sm:p-4 bg-stone-950 border-t border-stone-800 flex flex-wrap items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-2">
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-200 hover:text-amber-300 border border-stone-700 text-xs font-semibold flex items-center gap-1.5 transition-all shadow cursor-pointer active:scale-95"
              title="Mở chỉ đường trên Google Maps"
            >
              <Navigation className="w-3.5 h-3.5 text-emerald-400" />
              <span>Chỉ đường Maps</span>
              <ExternalLink className="w-3 h-3 text-stone-400" />
            </a>
          </div>

          <div className="flex items-center gap-2">
            {onNavigateToStory && (
              <button
                onClick={() => {
                  onClose();
                  onNavigateToStory(heritage.name, heritage.history, heritage.period);
                }}
                className="px-3.5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Kể Chuyện</span>
              </button>
            )}

            {onNavigateToFood && (
              <button
                onClick={() => {
                  onClose();
                  onNavigateToFood(heritage.id);
                }}
                className="px-3.5 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-300 border border-amber-500/40 text-xs font-bold flex items-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <Utensils className="w-3.5 h-3.5 text-amber-400" />
                <span>Ăn Uống Gần Đây</span>
              </button>
            )}

            {onAskAI && (
              <button
                onClick={() => {
                  onClose();
                  onAskAI(heritage);
                }}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-stone-950 text-xs font-extrabold flex items-center gap-1.5 transition-all shadow-lg active:scale-95 cursor-pointer"
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Hỏi HDV AI</span>
              </button>
            )}
          </div>
        </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
