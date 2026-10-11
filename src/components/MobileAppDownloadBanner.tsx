import React, { useState } from 'react';
import { 
  Download, 
  Smartphone, 
  WifiOff, 
  Zap, 
  QrCode, 
  Sparkles, 
  CheckCircle2, 
  Share, 
  ArrowRight
} from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { MobileAppDownloadModal } from './MobileAppDownloadModal';

interface MobileAppDownloadBannerProps {
  onOpenModal?: () => void;
}

export const MobileAppDownloadBanner: React.FC<MobileAppDownloadBannerProps> = ({
  onOpenModal
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    if (onOpenModal) {
      onOpenModal();
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <section className="relative my-12 overflow-hidden rounded-3xl bg-gradient-to-r from-amber-950/80 via-stone-900 to-amber-900/60 border border-amber-500/30 p-6 sm:p-10 shadow-2xl text-stone-100">
        
        {/* Glow decoration */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          
          {/* Left info & copy */}
          <div className="space-y-4 max-w-2xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold shadow-sm">
              <Smartphone className="w-4 h-4 text-amber-400" />
              <span>Trải nghiệm Ứng dụng Di động Di sản Việt Nam</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-serif font-extrabold text-stone-100 leading-tight">
              Tải App <span className="bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 bg-clip-text text-transparent">HỒN ĐẤT VIỆT</span> về Điện thoại
            </h2>

            <p className="text-sm sm:text-base text-stone-300 font-light leading-relaxed">
              Cài đặt ứng dụng trực tiếp lên màn hình điện thoại (Android, iPhone, iPad) mà không cần qua cửa hàng ứng dụng. Sử dụng linh hoạt, tra cứu thông tin di sản và bản đồ văn hóa kể cả khi <strong className="text-amber-300 font-semibold">không có mạng Internet (Offline Mode)</strong>.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2 text-xs text-stone-300">
              <span className="flex items-center gap-1.5 bg-stone-900/80 px-3 py-1.5 rounded-xl border border-stone-800">
                <WifiOff className="w-3.5 h-3.5 text-amber-400" />
                <span>Ngoại tuyến 100%</span>
              </span>
              <span className="flex items-center gap-1.5 bg-stone-900/80 px-3 py-1.5 rounded-xl border border-stone-800">
                <Zap className="w-3.5 h-3.5 text-emerald-400" />
                <span>Nhẹ & Mở tức thì</span>
              </span>
              <span className="flex items-center gap-1.5 bg-stone-900/80 px-3 py-1.5 rounded-xl border border-stone-800">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />
                <span>Không cần ChPlay/AppStore</span>
              </span>
            </div>
          </div>

          {/* Right CTA Actions */}
          <div className="flex flex-col sm:flex-row lg:flex-col items-center gap-3 shrink-0 w-full sm:w-auto">
            
            {isInstalled ? (
              <div className="flex items-center gap-2 px-6 py-3.5 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold text-sm rounded-2xl">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>Đã Cài Đặt Trên Thiết Bị</span>
              </div>
            ) : isInstallable ? (
              <button
                onClick={install}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-extrabold text-sm rounded-2xl shadow-xl shadow-amber-500/20 transition transform active:scale-95 flex items-center justify-center gap-2.5"
              >
                <Download className="w-5 h-5" />
                <span>CÀI ĐẶT ỨNG DỤNG NGAY</span>
              </button>
            ) : (
              <button
                onClick={handleOpenModal}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-extrabold text-sm rounded-2xl shadow-xl shadow-amber-500/20 transition transform active:scale-95 flex items-center justify-center gap-2.5"
              >
                <Download className="w-5 h-5" />
                <span>TẢI & CÀI APP MOBILE</span>
              </button>
            )}

            <button
              onClick={handleOpenModal}
              className="w-full sm:w-auto px-6 py-3.5 bg-stone-900 hover:bg-stone-800 text-amber-300 font-semibold text-xs rounded-2xl border border-amber-500/30 transition flex items-center justify-center gap-2"
            >
              <QrCode className="w-4 h-4 text-amber-400" />
              <span>Xem Mã QR & Hướng Dẫn</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1 text-stone-400" />
            </button>

          </div>

        </div>
      </section>

      {/* Internal Modal Fallback if not controlled by parent */}
      {!onOpenModal && (
        <MobileAppDownloadModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};
