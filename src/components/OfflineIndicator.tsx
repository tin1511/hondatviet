import React, { useState } from 'react';
import { WifiOff, DownloadCloud, Database, CheckCircle2, ChevronRight, X } from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { offlineStorageService } from '../services/offlineStorageService';

interface OfflineIndicatorProps {
  onOpenOfflineManager: () => void;
}

export const OfflineIndicator: React.FC<OfflineIndicatorProps> = ({ onOpenOfflineManager }) => {
  const isOnline = useOnlineStatus();
  const meta = offlineStorageService.getMeta();

  // ONLY render when device has NO internet connection (!isOnline / !navigator.onLine)
  if (isOnline) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50 bg-amber-950/95 border border-amber-500/40 backdrop-blur-md text-stone-100 p-3.5 rounded-2xl shadow-2xl flex items-center justify-between gap-3 animate-slide-up">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-amber-500/20 text-amber-400 rounded-xl shrink-0">
          <WifiOff className="w-5 h-5 animate-pulse" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">Chế độ Ngoại tuyến</span>
            <span className="text-[10px] bg-amber-500/30 text-amber-200 px-1.5 py-0.5 rounded-md font-mono">Offline</span>
          </div>
          <p className="text-xs text-stone-300 mt-0.5">
            Thiết bị mất kết nối internet. Đang tra cứu từ bộ nhớ ngoại tuyến ({meta.totalHeritages || 24} di sản sẵn sàng)
          </p>
        </div>
      </div>
      <button
        onClick={onOpenOfflineManager}
        className="shrink-0 px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold text-xs rounded-xl flex items-center gap-1 shadow-md transition"
      >
        <span>Quản lý</span>
        <ChevronRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
