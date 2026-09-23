import React, { useState } from 'react';
import { 
  Download, 
  Smartphone, 
  X, 
  CheckCircle2, 
  Share, 
  QrCode, 
  WifiOff, 
  Sparkles, 
  Monitor, 
  ExternalLink,
  ShieldCheck,
  Zap,
  Layers
} from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface MobileAppDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileAppDownloadModal: React.FC<MobileAppDownloadModalProps> = ({
  isOpen,
  onClose
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [activeTab, setActiveTab] = useState<'auto' | 'android' | 'ios' | 'qr'>('auto');

  if (!isOpen) return null;

  const appUrl = typeof window !== 'undefined' ? window.location.href : 'https://heritageai.vn';
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(appUrl)}&color=d97706&bgcolor=1c1917`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-2xl bg-stone-900 border border-amber-500/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] text-stone-100">
        
        {/* Modal Header */}
        <div className="relative p-6 bg-gradient-to-r from-amber-950/60 via-stone-900 to-amber-900/40 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
              <Download className="w-6 h-6 animate-bounce" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-bold font-serif text-amber-300">
                  Tải & Cài Đặt App Hồn Đất Việt
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Mobile & Desktop
                </span>
              </div>
              <p className="text-xs text-stone-400 mt-0.5">
                Cài đặt ứng dụng PWA chạy trực tiếp trên Android, iOS iPhone, iPad và Máy tính
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-100 rounded-xl hover:bg-stone-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Tab Switcher */}
        <div className="flex border-b border-stone-800 bg-stone-950/50 p-2 gap-1 overflow-x-auto">
          <button
            onClick={() => setActiveTab('auto')}
            className={`flex-1 min-w-[120px] py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
              activeTab === 'auto'
                ? 'bg-amber-500 text-stone-950 font-bold shadow-md'
                : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Cài Nhanh</span>
          </button>

          <button
            onClick={() => setActiveTab('android')}
            className={`flex-1 min-w-[120px] py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
              activeTab === 'android'
                ? 'bg-amber-500 text-stone-950 font-bold shadow-md'
                : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Android / Chrome</span>
          </button>

          <button
            onClick={() => setActiveTab('ios')}
            className={`flex-1 min-w-[120px] py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
              activeTab === 'ios'
                ? 'bg-amber-500 text-stone-950 font-bold shadow-md'
                : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>iPhone / iPad (iOS)</span>
          </button>

          <button
            onClick={() => setActiveTab('qr')}
            className={`flex-1 min-w-[120px] py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
              activeTab === 'qr'
                ? 'bg-amber-500 text-stone-950 font-bold shadow-md'
                : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800'
            }`}
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>Quét Mã QR</span>
          </button>
        </div>

        {/* Modal Main Content */}
        <div className="p-6 overflow-y-auto space-y-6">

          {/* Key Advantages Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-2xl bg-stone-800/60 border border-stone-700/60 flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                <WifiOff className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-amber-200">Chạy Ngoại Tuyến</h4>
                <p className="text-[11px] text-stone-400 mt-0.5">Không cần 4G/Wifi khi khám phá di tích xa</p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-stone-800/60 border border-stone-700/60 flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-emerald-200">Tải Tức Thì</h4>
                <p className="text-[11px] text-stone-400 mt-0.5">Không tốn bộ nhớ máy, mở ứng dụng 1 chạm</p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-stone-800/60 border border-stone-700/60 flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-sky-200">An Toàn & Bảo Mật</h4>
                <p className="text-[11px] text-stone-400 mt-0.5">Tự động cập nhật bản mới nhất không cần AppStore</p>
              </div>
            </div>
          </div>

          {/* Tab 1: Auto / One-Click Installation */}
          {activeTab === 'auto' && (
            <div className="p-6 rounded-2xl bg-gradient-to-br from-stone-900 to-amber-950/40 border border-amber-500/30 text-center space-y-4">
              
              {isInstalled ? (
                <div className="space-y-3 py-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-emerald-300">Ứng dụng Hồn Đất Việt đã được cài đặt!</h3>
                  <p className="text-xs text-stone-300 max-w-md mx-auto">
                    Bạn đã có thể khởi chạy Hồn Đất Việt ngay từ Màn hình chính (Home Screen) thiết bị di động hoặc máy tính của mình.
                  </p>
                </div>
              ) : isInstallable ? (
                <div className="space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 mx-auto flex items-center justify-center">
                    <Download className="w-8 h-8 animate-pulse" />
                  </div>
                  <h3 className="text-lg font-bold text-amber-200 font-serif">
                    Trình duyệt của bạn hỗ trợ Cài đặt 1 chạm!
                  </h3>
                  <p className="text-xs text-stone-300 max-w-md mx-auto leading-relaxed">
                    Nhấn vào nút bên dưới để thêm Hồn Đất Việt trực tiếp vào Màn hình chính điện thoại hoặc Máy tính mà không cần qua ChPlay/AppStore.
                  </p>
                  
                  <button
                    onClick={install}
                    className="px-8 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-extrabold text-sm rounded-2xl shadow-xl shadow-amber-500/20 transition transform active:scale-95 inline-flex items-center gap-2.5"
                  >
                    <Download className="w-5 h-5" />
                    <span>CÀI ĐẶT ỨNG DỤNG NGAY</span>
                  </button>
                </div>
              ) : isIOS ? (
                <div className="space-y-4 text-left">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                      <Smartphone className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-amber-300">Hướng dẫn Cài đặt trên iPhone / iPad (Safari)</h3>
                      <p className="text-xs text-stone-400">Chỉ mất 10 giây để đưa ứng dụng ra Màn hình chính</p>
                    </div>
                  </div>

                  <div className="space-y-2.5 text-xs text-stone-300 pl-2">
                    <div className="flex items-start gap-3 bg-stone-950 p-3 rounded-xl border border-stone-800">
                      <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center shrink-0">1</span>
                      <p>Nhấn nút <strong className="text-amber-400 inline-flex items-center gap-1 px-1.5 py-0.5 bg-stone-800 rounded border border-stone-700"><Share className="w-3.5 h-3.5" /> Chia sẻ (Share)</strong> ở thanh công cụ trình duyệt Safari dưới cùng.</p>
                    </div>

                    <div className="flex items-start gap-3 bg-stone-950 p-3 rounded-xl border border-stone-800">
                      <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center shrink-0">2</span>
                      <p>Vuốt danh sách menu xuống và chọn <strong className="text-amber-400">Thêm vào Màn hình chính (Add to Home Screen)</strong>.</p>
                    </div>

                    <div className="flex items-start gap-3 bg-stone-950 p-3 rounded-xl border border-stone-800">
                      <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center shrink-0">3</span>
                      <p>Bấm <strong className="text-amber-400">Thêm (Add)</strong> ở góc trên bên phải để hoàn tất.</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 text-center">
                  <p className="text-xs text-stone-300">
                    Nếu bạn đang truy cập trên Máy tính hoặc trình duyệt ngoài, bạn có thể quét mã QR bằng Camera điện thoại để mở trên di động:
                  </p>
                  <button
                    onClick={() => setActiveTab('qr')}
                    className="px-5 py-2.5 bg-stone-800 hover:bg-stone-700 text-amber-300 text-xs font-semibold rounded-xl border border-amber-500/30 inline-flex items-center gap-2"
                  >
                    <QrCode className="w-4 h-4 text-amber-400" />
                    <span>Xem Mã QR Quét Trên Điện Thoại</span>
                  </button>
                </div>
              )}

            </div>
          )}

          {/* Tab 2: Android / Chrome */}
          {activeTab === 'android' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 flex items-center gap-3">
                <Smartphone className="w-6 h-6 text-emerald-400 shrink-0" />
                <div>
                  <h3 className="text-sm font-bold text-emerald-300">Cài đặt trên Điện thoại / Máy bảng Android</h3>
                  <p className="text-xs text-stone-400">Tương thích tốt nhất trên Google Chrome, Brave, Samsung Internet</p>
                </div>
              </div>

              <div className="space-y-3 text-xs text-stone-300">
                <div className="p-3.5 bg-stone-950 rounded-2xl border border-stone-800 flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center shrink-0">1</span>
                  <div>
                    <h4 className="font-semibold text-stone-100">Cài qua thông báo bật lên</h4>
                    <p className="text-stone-400 mt-0.5">Nhấp vào nút "Cài ứng dụng" ở thanh Menu trên cùng ứng dụng Hồn Đất Việt.</p>
                  </div>
                </div>

                <div className="p-3.5 bg-stone-950 rounded-2xl border border-stone-800 flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center shrink-0">2</span>
                  <div>
                    <h4 className="font-semibold text-stone-100">Cài thủ công qua Menu Trình duyệt</h4>
                    <p className="text-stone-400 mt-0.5">Mở Menu Google Chrome góc trên bên phải (biểu tượng 3 chấm <strong className="text-amber-400">⋮</strong>) ➔ chọn <strong className="text-amber-400">"Cài đặt ứng dụng"</strong> hoặc <strong className="text-amber-400">"Thêm vào Màn hình chính"</strong>.</p>
                  </div>
                </div>
              </div>

              {isInstallable && (
                <button
                  onClick={install}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-stone-950 font-bold text-xs rounded-xl transition flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>KÍCH HOẠT CÀI ĐẶT ANDROID NGAY</span>
                </button>
              )}
            </div>
          )}

          {/* Tab 3: iOS iPhone / iPad */}
          {activeTab === 'ios' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/30 flex items-center gap-3">
                <Smartphone className="w-6 h-6 text-amber-400 shrink-0" />
                <div>
                  <h3 className="text-sm font-bold text-amber-300">Cài đặt trên iPhone / iPad (iOS Safari)</h3>
                  <p className="text-xs text-stone-400">Không cần tài khoản App Store hay Apple ID</p>
                </div>
              </div>

              <div className="space-y-3 text-xs text-stone-300">
                <div className="p-3.5 bg-stone-950 rounded-2xl border border-stone-800 flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center shrink-0">1</span>
                  <div>
                    <h4 className="font-semibold text-stone-100">Mở Safari và tìm biểu tượng Chia sẻ</h4>
                    <p className="text-stone-400 mt-0.5">Mở ứng dụng bằng trình duyệt Safari ➔ Bấm biểu tượng <strong className="text-amber-400 inline-flex items-center gap-1"><Share className="w-3 h-3" /> Chia sẻ (Share)</strong> ở thanh điều hướng dưới màn hình.</p>
                  </div>
                </div>

                <div className="p-3.5 bg-stone-950 rounded-2xl border border-stone-800 flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center shrink-0">2</span>
                  <div>
                    <h4 className="font-semibold text-stone-100">Chọn Thêm vào Màn hình chính</h4>
                    <p className="text-stone-400 mt-0.5">Cuộn danh sách menu và nhấn nút <strong className="text-amber-400 font-semibold">"Thêm vào Màn hình chính" (Add to Home Screen)</strong>.</p>
                  </div>
                </div>

                <div className="p-3.5 bg-stone-950 rounded-2xl border border-stone-800 flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center shrink-0">3</span>
                  <div>
                    <h4 className="font-semibold text-stone-100">Xác nhận Thêm</h4>
                    <p className="text-stone-400 mt-0.5">Nhấn <strong className="text-amber-400">"Thêm" (Add)</strong> ở góc trên bên phải. Biểu tượng Hồn Đất Việt sẽ xuất hiện trên màn hình điện thoại của bạn như ứng dụng tải từ AppStore!</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 4: QR Code Scan for Mobile */}
          {activeTab === 'qr' && (
            <div className="text-center space-y-4 py-2">
              <div className="inline-block p-4 bg-stone-950 rounded-3xl border border-amber-500/30 shadow-xl">
                <img 
                  src={qrCodeUrl} 
                  alt="Mã QR Tải App Mobile Hồn Đất Việt" 
                  className="w-48 h-48 mx-auto rounded-xl border border-stone-800 p-1 bg-stone-900" 
                />
              </div>

              <div>
                <h3 className="text-base font-bold text-amber-300 font-serif">
                  Dùng Camera Điện thoại để Quét Mã
                </h3>
                <p className="text-xs text-stone-400 max-w-sm mx-auto mt-1">
                  Mở ứng dụng Camera trên iPhone/Android của bạn và quét mã QR trên để mở trang web, sau đó bấm "Thêm vào màn hình chính" để cài đặt.
                </p>
              </div>

              <div className="pt-2 text-[11px] text-stone-500 flex items-center justify-center gap-1">
                <span>Đường dẫn ứng dụng:</span>
                <span className="font-mono text-amber-400/80 truncate max-w-[280px]">{appUrl}</span>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-stone-950 border-t border-stone-800 flex items-center justify-between text-xs">
          <span className="text-stone-400 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>PWA v2.0 • Tích hợp Service Worker & Offline Cache</span>
          </span>

          <button
            onClick={onClose}
            className="px-5 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold rounded-xl transition"
          >
            Đóng
          </button>
        </div>

      </div>
    </div>
  );
};
