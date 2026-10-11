import React, { useState } from 'react';
import { Download, Smartphone, X, CheckCircle2, Share } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { MobileAppDownloadModal } from './MobileAppDownloadModal';

interface PWAInstallButtonProps {
  className?: string;
  variant?: 'button' | 'badge' | 'menuItem';
  onOpenModal?: () => void;
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({
  className = '',
  variant = 'button',
  onOpenModal
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const [showGeneralModal, setShowGeneralModal] = useState(false);

  const handleTrigger = () => {
    if (onOpenModal) {
      onOpenModal();
    } else if (isInstallable) {
      install();
    } else {
      setShowGeneralModal(true);
    }
  };

  // If already installed as standalone PWA app, return small badge
  if (isInstalled) {
    if (variant === 'badge') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
          <CheckCircle2 className="w-3 h-3" />
          <span>Đã Cài App PWA</span>
        </span>
      );
    }
    return null;
  }

  // Chromium / Android / Windows / macOS Desktop install flow
  if (isInstallable) {
    if (variant === 'menuItem') {
      return (
        <button
          onClick={install}
          className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-amber-400 hover:text-amber-300 hover:bg-amber-500/10 rounded-xl transition ${className}`}
        >
          <Download className="w-4 h-4 text-amber-400" />
          <span>Cài ứng dụng Hồn Đất Việt</span>
        </button>
      );
    }

    return (
      <button
        onClick={install}
        className={`flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-xs rounded-xl shadow-lg shadow-amber-500/10 transition active:scale-95 ${className}`}
      >
        <Download className="w-3.5 h-3.5" />
        <span>Cài Ứng Dụng</span>
      </button>
    );
  }

  // iOS Safari flow
  if (isIOS) {
    return (
      <>
        {variant === 'menuItem' ? (
          <button
            onClick={() => setShowIOSGuide(true)}
            className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-stone-300 hover:text-stone-100 hover:bg-stone-800 rounded-xl transition ${className}`}
          >
            <Smartphone className="w-4 h-4 text-amber-400" />
            <span>Cài app trên iPhone/iPad</span>
          </button>
        ) : (
          <button
            onClick={() => setShowIOSGuide(true)}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 bg-stone-900 border border-amber-500/30 hover:border-amber-500 text-amber-400 text-xs font-semibold rounded-xl transition ${className}`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Cài trên iOS</span>
          </button>
        )}

        {showIOSGuide && (
          <MobileAppDownloadModal
            isOpen={showIOSGuide}
            onClose={() => setShowIOSGuide(false)}
          />
        )}
      </>
    );
  }

  // Default fallback for any desktop/browser (shows general mobile download modal)
  return (
    <>
      {variant === 'menuItem' ? (
        <button
          onClick={handleTrigger}
          className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-amber-400 hover:text-amber-300 hover:bg-amber-500/10 rounded-xl transition ${className}`}
        >
          <Download className="w-4 h-4 text-amber-400" />
          <span>Tải App Mobile</span>
        </button>
      ) : (
        <button
          onClick={handleTrigger}
          className={`flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-xs rounded-xl shadow-lg shadow-amber-500/10 transition active:scale-95 ${className}`}
        >
          <Download className="w-3.5 h-3.5" />
          <span>Tải App Mobile</span>
        </button>
      )}

      {showGeneralModal && (
        <MobileAppDownloadModal
          isOpen={showGeneralModal}
          onClose={() => setShowGeneralModal(false)}
        />
      )}
    </>
  );
};

