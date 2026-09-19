import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Navigation, 
  RefreshCw, 
  X, 
  CheckCircle2,
  Plus,
  Edit,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';
import { geolocationService } from '../services/geolocationService';
import { storageService } from '../services/storageService';
import { CityLandmarkBackground } from '../types';
import { LandmarkEditModal } from './LandmarkEditModal';

interface CityLandmarkModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLandmark: CityLandmarkBackground;
  onSelectLandmark: (landmark: CityLandmarkBackground) => void;
  onDetectGps: () => void;
  isDetectingGps: boolean;
}

export const CityLandmarkModal: React.FC<CityLandmarkModalProps> = ({
  isOpen,
  onClose,
  currentLandmark,
  onSelectLandmark,
  onDetectGps,
  isDetectingGps
}) => {
  const [landmarks, setLandmarks] = useState<CityLandmarkBackground[]>([]);
  const [editingLandmark, setEditingLandmark] = useState<CityLandmarkBackground | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const currentUser = storageService.getCurrentUser();
  const isAdmin = currentUser?.isLoggedIn && currentUser?.role === 'admin';

  const loadLandmarks = () => {
    setLandmarks(storageService.getLandmarkBackgrounds());
  };

  useEffect(() => {
    if (isOpen) {
      loadLandmarks();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleUpdate = () => {
      loadLandmarks();
    };
    window.addEventListener('landmarks-updated', handleUpdate);
    return () => {
      window.removeEventListener('landmarks-updated', handleUpdate);
    };
  }, []);

  if (!isOpen) return null;

  const handleAddNew = () => {
    setEditingLandmark(null);
    setIsEditModalOpen(true);
  };

  const handleEditItem = (landmark: CityLandmarkBackground, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingLandmark(landmark);
    setIsEditModalOpen(true);
  };

  const handleResetDefaults = () => {
    if (window.confirm('Khôi phục toàn bộ danh sách ảnh nền danh thắng về mặc định ban đầu?')) {
      const resetList = storageService.resetLandmarkBackgrounds();
      setLandmarks(resetList);
      if (resetList.length > 0) {
        onSelectLandmark(resetList[0]);
      }
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
        <div className="bg-stone-900 border border-stone-800 rounded-3xl max-w-2xl w-full max-h-[88vh] flex flex-col shadow-2xl overflow-hidden">
          
          {/* Modal Header */}
          <div className="p-5 border-b border-stone-800 flex items-center justify-between bg-stone-950/70">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-serif font-bold text-stone-100 text-base sm:text-lg">
                    Ảnh Nền Danh Thắng Việt Nam
                  </h3>
                  {isAdmin && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/40 font-semibold flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" />
                      Admin Quyền Quản Lý
                    </span>
                  )}
                </div>
                <p className="text-xs text-stone-400">
                  Ảnh nền toàn bộ trang web tự động khớp với thành phố theo định vị GPS của bạn
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {isAdmin && (
                <button
                  type="button"
                  onClick={handleAddNew}
                  className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center gap-1 shadow-md transition-all cursor-pointer"
                  title="Thêm ảnh nền danh thắng mới"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Thêm danh thắng</span>
                </button>
              )}

              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-xl text-stone-400 hover:text-stone-200 hover:bg-stone-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* GPS Auto Button & Admin Quick Tools */}
          <div className="p-4 bg-stone-950/40 border-b border-stone-800/80 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-stone-300">
              <Navigation className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Dùng cảm biến GPS thực tế trên thiết bị của bạn:</span>
            </div>

            <div className="flex items-center gap-2">
              {isAdmin && (
                <button
                  type="button"
                  onClick={handleResetDefaults}
                  className="px-2.5 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer"
                  title="Khôi phục mặc định"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-stone-400" />
                  <span className="hidden sm:inline">Mặc định</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => {
                  onDetectGps();
                  onClose();
                }}
                disabled={isDetectingGps}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 text-stone-950 font-bold text-xs hover:from-amber-500 hover:to-amber-400 transition-all cursor-pointer shadow-md disabled:opacity-50 shrink-0"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isDetectingGps ? 'animate-spin' : ''}`} />
                <span>{isDetectingGps ? 'Đang định vị...' : 'Bật GPS của tôi'}</span>
              </button>
            </div>
          </div>

          {/* Landmark Grid */}
          <div className="p-4 sm:p-5 overflow-y-auto space-y-3 max-h-[60vh]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {landmarks.map((landmark) => {
                const isSelected = currentLandmark.id === landmark.id;
                return (
                  <div
                    key={landmark.id}
                    onClick={() => {
                      onSelectLandmark(landmark);
                      onClose();
                    }}
                    className={`text-left p-3 rounded-2xl border transition-all flex items-start gap-3.5 cursor-pointer relative overflow-hidden group ${
                      isSelected 
                        ? 'bg-amber-950/30 border-amber-500/80 shadow-lg shadow-amber-950/40 ring-1 ring-amber-500/40' 
                        : 'bg-stone-950/60 border-stone-800/80 hover:border-amber-500/40 hover:bg-stone-800/50'
                    }`}
                  >
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-stone-800 group-hover:border-amber-500/40 transition-colors bg-stone-950">
                      <img 
                        src={landmark.imageUrl} 
                        alt={landmark.landmarkName}
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80';
                        }}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {isSelected && (
                        <div className="absolute inset-0 bg-amber-500/20 flex items-center justify-center">
                          <CheckCircle2 className="w-5 h-5 text-amber-300 drop-shadow" />
                        </div>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[10px] uppercase tracking-wider font-semibold text-amber-400">
                          {landmark.cityName}
                        </span>
                        
                        <div className="flex items-center gap-1">
                          {isSelected && (
                            <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                              Đang dùng
                            </span>
                          )}

                          {isAdmin && (
                            <button
                              type="button"
                              onClick={(e) => handleEditItem(landmark, e)}
                              className="p-1 rounded bg-stone-800 hover:bg-amber-500 hover:text-stone-950 text-stone-300 transition-colors shadow"
                              title="Chỉnh sửa danh thắng này (Admin)"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>

                      <h4 className="text-xs sm:text-sm font-bold text-stone-100 truncate mt-0.5">
                        {landmark.landmarkName}
                      </h4>
                      <p className="text-[11px] text-stone-400 line-clamp-2 mt-1 font-light leading-relaxed">
                        {landmark.tagline}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Admin Bottom Bar Prompt */}
          {isAdmin && (
            <div className="p-3 bg-amber-950/20 border-t border-amber-500/20 flex items-center justify-between text-xs text-amber-300/80 px-5">
              <span>💡 Là Admin, bạn có thể bấm biểu tượng bút ✏️ để sửa tiêu đề, khẩu hiệu hoặc ảnh của bất kỳ danh thắng nào.</span>
              <button
                type="button"
                onClick={handleAddNew}
                className="text-amber-400 hover:underline font-bold shrink-0 ml-2 cursor-pointer"
              >
                + Thêm mới
              </button>
            </div>
          )}

        </div>
      </div>

      {/* Admin Edit / Create Modal */}
      <LandmarkEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        landmark={editingLandmark}
        onSave={(savedItem) => {
          loadLandmarks();
          onSelectLandmark(savedItem);
        }}
        onDelete={() => {
          loadLandmarks();
        }}
      />
    </>
  );
};
