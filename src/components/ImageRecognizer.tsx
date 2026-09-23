import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Camera, 
  Upload, 
  Sparkles, 
  CheckCircle2, 
  HelpCircle, 
  AlertCircle, 
  MapPin, 
  BookOpen, 
  Volume2, 
  Utensils, 
  Compass, 
  MessageSquare, 
  RefreshCw, 
  Info,
  Layers,
  Clock,
  SwitchCamera,
  Scan,
  Zap,
  Check,
  Edit3,
  ShieldCheck,
  Settings
} from 'lucide-react';
import { aiService, RecognizeHeritageResult } from '../services/aiService';
import { storageService } from '../services/storageService';
import { HeritageItem, RecognitionSectionConfig, RecognitionSampleItem } from '../types';
import { AdminRecognitionModal } from './AdminRecognitionModal';

interface ImageRecognizerProps {
  onNavigateToStory: (heritageName: string, history?: string, period?: string) => void;
  onNavigateToFood: (heritageId: string) => void;
  onNavigateToMap: (heritageId: string) => void;
  onAskChatbot: (question: string, context?: any) => void;
}

export const ImageRecognizer: React.FC<ImageRecognizerProps> = ({
  onNavigateToStory,
  onNavigateToFood,
  onNavigateToMap,
  onAskChatbot
}) => {
  // Dynamic Section Config & Admin State
  const [sectionConfig, setSectionConfig] = useState<RecognitionSectionConfig>(() => storageService.getRecognitionSectionConfig());
  const [isAdminModalOpen, setIsAdminModalOpen] = useState<boolean>(false);
  const currentUser = storageService.getCurrentUser();
  const isAdmin = currentUser?.isLoggedIn && currentUser?.role === 'admin';

  useEffect(() => {
    const handleConfigUpdated = (e: any) => {
      if (e.detail) {
        setSectionConfig(e.detail);
      } else {
        setSectionConfig(storageService.getRecognitionSectionConfig());
      }
    };
    window.addEventListener('recognition-config-updated', handleConfigUpdated);
    return () => {
      window.removeEventListener('recognition-config-updated', handleConfigUpdated);
    };
  }, []);

  // Input mode: 'camera' (default, direct capture) or 'upload' (select file from device)
  const [inputMode, setInputMode] = useState<'camera' | 'upload'>('camera');
  const [isOffline, setIsOffline] = useState<boolean>(!navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  
  // Camera state
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [isFlashing, setIsFlashing] = useState<boolean>(false);
  const [autoRecognizeOnSnap, setAutoRecognizeOnSnap] = useState<boolean>(true);

  // Image & Recognition state
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageOrigin, setImageOrigin] = useState<'camera' | 'upload' | 'preset'>('camera');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<RecognizeHeritageResult | null>(null);
  const [userNote, setUserNote] = useState('');

  // DOM Refs
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const directCameraInputRef = useRef<HTMLInputElement>(null);

  // Stop camera stream cleanly
  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => {
        try {
          track.stop();
        } catch (e) {
          // ignore
        }
      });
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
  }, []);

  // Start live camera stream
  const startCamera = useCallback(async (facing: 'environment' | 'user' = facingMode) => {
    stopCamera();
    setCameraError(null);

    // Check if mediaDevices is supported
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setCameraError('Trình duyệt hoặc môi trường hiện tại không hỗ trợ truy cập Camera trực tiếp. Vui lòng bấm "Chụp từ Camera thiết bị" bên dưới.');
      return;
    }

    try {
      const constraints: MediaStreamConstraints = {
        video: {
          facingMode: { ideal: facing },
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.setAttribute('playsinline', 'true');
        await videoRef.current.play().catch(e => {
          console.warn('Video autoplay blocked or interrupted:', e);
        });
      }
      setIsCameraActive(true);
      setCameraError(null);
    } catch (err: any) {
      console.warn('Camera access error:', err);
      setIsCameraActive(false);
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setCameraError('Quyền truy cập Camera đã bị từ chối. Hãy cho phép quyền Camera trên trình duyệt hoặc dùng nút "Chụp từ Camera thiết bị".');
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        setCameraError('Không tìm thấy thiết bị Camera. Bạn có thể tải ảnh có sẵn hoặc dùng ảnh mẫu.');
      } else {
        setCameraError('Không thể mở Camera trực tiếp trong khung xem hiện tại. Hãy bấm nút "Mở Camera thiết bị" để chụp ngay.');
      }
    }
  }, [facingMode, stopCamera]);

  // Manage camera on mount / mode change
  useEffect(() => {
    if (inputMode === 'camera' && !selectedImage) {
      startCamera(facingMode);
    } else {
      stopCamera();
    }

    return () => {
      stopCamera();
    };
  }, [inputMode, selectedImage, facingMode, startCamera, stopCamera]);

  // Switch between front and back camera
  const handleToggleFacingMode = () => {
    const nextFacing = facingMode === 'environment' ? 'user' : 'environment';
    setFacingMode(nextFacing);
    if (inputMode === 'camera' && !selectedImage) {
      startCamera(nextFacing);
    }
  };

  // Perform AI recognition on an image string (base64 or URL)
  const runRecognitionWithImage = async (imageSrc: string, note?: string) => {
    setLoading(true);
    setError(null);
    try {
      let base64 = imageSrc;
      if (imageSrc.startsWith('http')) {
        const res = await fetch(imageSrc);
        const blob = await res.blob();
        base64 = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(blob);
        });
      }

      const promptNote = note !== undefined ? note : userNote;
      const aiResult = await aiService.recognizeHeritage(base64, promptNote);
      setResult(aiResult);

      storageService.logActivity({
        actionType: 'recognize',
        title: 'Nhận diện hình ảnh di sản AI',
        description: `Đã nhận diện thành công: "${aiResult.name}" (${aiResult.categoryLabel} - ${aiResult.province})`,
        targetId: aiResult.name.toLowerCase().replace(/\s+/g, '-'),
        pointsEarned: 25
      });
    } catch (err: any) {
      setError(err.message || 'Không thể nhận diện hình ảnh. Vui lòng thử lại với góc chụp rõ hơn.');
    } finally {
      setLoading(false);
    }
  };

  // Capture current frame from live camera video
  const handleCapturePhoto = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;

    if (video.videoWidth === 0 || video.videoHeight === 0) {
      setError('Camera chưa sẵn sàng hình ảnh, vui lòng thử lại sau giây lát.');
      return;
    }

    // Flash visual feedback
    setIsFlashing(true);
    setTimeout(() => setIsFlashing(false), 220);

    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw video frame to canvas
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const capturedBase64 = canvas.toDataURL('image/jpeg', 0.88);

    // Save state & stop camera stream to save battery
    setSelectedImage(capturedBase64);
    setImageOrigin('camera');
    setResult(null);
    setError(null);
    stopCamera();

    // If auto-recognize is enabled, analyze immediately!
    if (autoRecognizeOnSnap) {
      runRecognitionWithImage(capturedBase64);
    }
  };

  // Handle native mobile camera or file upload change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, isDirectCamera: boolean = false) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        setSelectedImage(base64);
        setImageOrigin(isDirectCamera ? 'camera' : 'upload');
        setResult(null);
        setError(null);
        stopCamera();

        // Run recognition directly for direct camera snaps
        if (isDirectCamera || autoRecognizeOnSnap) {
          runRecognitionWithImage(base64);
        }
      };
      reader.readAsDataURL(file);
    }
    // reset input value so user can re-capture the same shot if needed
    e.target.value = '';
  };

  // Retake photo: clear selected image and reopen camera
  const handleRetake = () => {
    setSelectedImage(null);
    setResult(null);
    setError(null);
    if (inputMode === 'camera') {
      startCamera(facingMode);
    }
  };

  // Preset sample image clicked
  const handleSelectPreset = async (sample: RecognitionSampleItem) => {
    stopCamera();
    setSelectedImage(sample.url);
    setImageOrigin('preset');
    setUserNote(sample.prompt);
    setResult(null);
    setError(null);
    runRecognitionWithImage(sample.url, sample.prompt);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-fadeIn">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-8 relative">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{sectionConfig.badge}</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-serif font-bold text-stone-100">
          {sectionConfig.title}
        </h2>
        <p className="text-stone-300 text-sm sm:text-base mt-2">
          {sectionConfig.description}
        </p>

        {isAdmin && (
          <div className="mt-4 flex items-center justify-center">
            <button
              onClick={() => setIsAdminModalOpen(true)}
              className="px-3.5 py-1.5 rounded-full bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-300 text-xs font-semibold flex items-center gap-2 transition-all shadow-sm cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5 text-amber-400" />
              <span>Admin: Tùy chỉnh nội dung & ảnh mẫu nhận diện</span>
            </button>
          </div>
        )}

        {isOffline && (
          <div className="mt-4 max-w-xl mx-auto p-3 bg-amber-950/70 border border-amber-500/50 rounded-2xl text-amber-300 text-xs flex items-center justify-between gap-3 shadow-lg animate-fadeIn">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
              <span className="font-bold">⚡ Đang ở Chế độ Nhận Diện AI Ngoại Tuyến (Offline Visual Engine)</span>
            </div>
            <p className="text-[11px] text-amber-200 hidden sm:block">
              Phân tích đặc trưng & đối chiếu kho tư liệu di sản lưu trong thiết bị
            </p>
          </div>
        )}
      </div>

      {/* Preset One-Click Test Images */}
      <div className="mb-8">
        <div className="flex items-center justify-between gap-3 mb-3">
          <p className="text-xs font-semibold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{sectionConfig.samplesLabel}</span>
          </p>

          {isAdmin && (
            <button
              onClick={() => setIsAdminModalOpen(true)}
              className="px-3 py-1 rounded-lg bg-stone-800/80 hover:bg-stone-700/80 border border-stone-700 text-amber-400 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Edit3 className="w-3 h-3" />
              <span>Quản lý {sectionConfig.samples.length} ảnh mẫu</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {sectionConfig.samples.map((sample, idx) => (
            <button
              key={sample.id || idx}
              onClick={() => handleSelectPreset(sample)}
              disabled={loading}
              className="group relative rounded-xl overflow-hidden border border-stone-800 hover:border-amber-400/60 transition-all text-left bg-stone-900 shadow-md hover:scale-105 disabled:opacity-50 cursor-pointer"
            >
              <div className="h-20 w-full overflow-hidden relative">
                <img 
                  src={sample.url} 
                  alt={sample.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=600&q=80';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent opacity-80" />
              </div>
              <div className="p-2 bg-stone-900">
                <p className="text-xs font-semibold text-stone-200 line-clamp-1 group-hover:text-amber-300">
                  {sample.title}
                </p>
                <p className="text-[10px] text-stone-400 line-clamp-1">{sample.category}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Direct Camera / Capture Viewfinder & Upload */}
        <div className="lg:col-span-6 bg-stone-900 border border-stone-800 rounded-3xl p-5 sm:p-6 shadow-2xl space-y-5">
          
          {/* Header & Mode Switch Tabs */}
          <div className="flex items-center justify-between gap-3 border-b border-stone-800 pb-3.5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                <Camera className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-stone-100 text-sm sm:text-base">
                  Ống Kính AI Di Sản
                </h3>
                <p className="text-[11px] text-stone-400">
                  {inputMode === 'camera' ? 'Chụp ảnh trực tiếp từ thiết bị' : 'Tải ảnh từ thư viện'}
                </p>
              </div>
            </div>

            {/* Mode Switch Pills */}
            <div className="bg-stone-950 p-1 rounded-xl border border-stone-800 flex items-center gap-1">
              <button
                id="btn-mode-camera"
                type="button"
                onClick={() => {
                  setInputMode('camera');
                  if (!selectedImage) startCamera(facingMode);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                  inputMode === 'camera'
                    ? 'bg-amber-500 text-stone-950 font-bold shadow'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Chụp trực tiếp</span>
              </button>

              <button
                id="btn-mode-upload"
                type="button"
                onClick={() => {
                  setInputMode('upload');
                  stopCamera();
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                  inputMode === 'upload'
                    ? 'bg-amber-500 text-stone-950 font-bold shadow'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Tải tệp</span>
              </button>
            </div>
          </div>

          {/* Hidden File Inputs */}
          {/* 1. Native mobile camera input fallback */}
          <input 
            type="file" 
            ref={directCameraInputRef} 
            onChange={(e) => handleFileChange(e, true)} 
            accept="image/*" 
            capture="environment" 
            className="hidden" 
          />
          {/* 2. Regular gallery upload input */}
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={(e) => handleFileChange(e, false)} 
            accept="image/*" 
            className="hidden" 
          />

          {/* MAIN VIEWFINDER / CAPTURE CONTAINER */}
          <div className="relative rounded-2xl overflow-hidden bg-stone-950 border border-stone-800 shadow-inner min-h-[340px] flex flex-col items-center justify-center">
            
            {/* Shutter Flash Animation */}
            {isFlashing && (
              <div className="absolute inset-0 bg-white z-50 animate-ping opacity-90 pointer-events-none" />
            )}

            {/* SCENARIO A: A PHOTO IS CURRENTLY SELECTED / CAPTURED */}
            {selectedImage ? (
              <div className="relative w-full h-full min-h-[340px] flex flex-col items-center justify-center p-3 bg-stone-950">
                <img 
                  src={selectedImage} 
                  alt="Heritage capture" 
                  className="max-h-[340px] w-auto max-w-full object-contain rounded-xl shadow-lg border border-stone-800" 
                />

                {/* Badge indicating source */}
                <div className="absolute top-5 left-5 bg-stone-950/80 backdrop-blur-md px-3 py-1 rounded-full border border-amber-500/40 text-[11px] font-semibold text-amber-300 flex items-center gap-1.5 shadow">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>
                    {imageOrigin === 'camera' ? 'Ảnh vừa chụp từ Camera' : imageOrigin === 'preset' ? 'Ảnh mẫu thử nghiệm' : 'Ảnh từ thiết bị'}
                  </span>
                </div>

                {/* Retake Button Floating on Top Right */}
                <button
                  id="btn-retake-photo"
                  onClick={handleRetake}
                  className="absolute top-5 right-5 px-3 py-1.5 rounded-full bg-stone-900/90 hover:bg-stone-800 backdrop-blur-md border border-stone-700 text-stone-200 hover:text-amber-300 text-xs font-semibold flex items-center gap-1.5 shadow-lg transition-all cursor-pointer"
                  title="Chụp lại ảnh khác"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Chụp lại</span>
                </button>
              </div>
            ) : inputMode === 'camera' ? (
              /* SCENARIO B: LIVE CAMERA VIEWFINDER */
              <div className="relative w-full h-full min-h-[360px] flex items-center justify-center bg-black overflow-hidden">
                
                {/* Real-time Video Stream */}
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className={`w-full h-[360px] object-cover transition-opacity duration-300 ${
                    isCameraActive ? 'opacity-100' : 'opacity-0'
                  }`}
                />

                {/* Live Camera Viewfinder Overlay & Scanning Guide */}
                {isCameraActive && (
                  <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4">
                    {/* Top Status & Controls */}
                    <div className="flex items-center justify-between pointer-events-auto">
                      <div className="flex items-center gap-2 bg-stone-950/70 backdrop-blur-md px-3 py-1 rounded-full border border-stone-700 text-[11px] text-stone-200">
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                        <span className="font-semibold tracking-wider">LIVE</span>
                        <span className="text-stone-400">• Căn góc di sản</span>
                      </div>

                      {/* Switch Camera Button (Front / Rear) */}
                      <button
                        type="button"
                        onClick={handleToggleFacingMode}
                        className="p-2 rounded-full bg-stone-950/80 hover:bg-stone-800 text-stone-200 hover:text-amber-400 border border-stone-700 backdrop-blur-md shadow-lg transition-all cursor-pointer"
                        title="Đổi camera trước / sau"
                      >
                        <SwitchCamera className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Viewfinder Reticle & Laser Scanning Beam */}
                    <div className="relative mx-auto w-4/5 max-w-[280px] h-48 sm:h-52 border-2 border-dashed border-amber-400/40 rounded-2xl flex items-center justify-center">
                      {/* 4 Framing Corner Brackets */}
                      <div className="absolute -top-1 -left-1 w-6 h-6 border-t-3 border-l-3 border-amber-400 rounded-tl-lg" />
                      <div className="absolute -top-1 -right-1 w-6 h-6 border-t-3 border-r-3 border-amber-400 rounded-tr-lg" />
                      <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-3 border-l-3 border-amber-400 rounded-bl-lg" />
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-3 border-r-3 border-amber-400 rounded-br-lg" />

                      {/* Moving laser scan line */}
                      <div className="absolute left-2 right-2 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent shadow-[0_0_12px_#f59e0b] animate-pulse" />

                      {/* Center target indicator */}
                      <div className="w-8 h-8 rounded-full border border-amber-400/30 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      </div>
                    </div>

                    {/* Bottom Helper Hint */}
                    <p className="text-center text-[11px] text-amber-200/90 font-medium bg-stone-950/70 backdrop-blur-sm py-1 px-3 rounded-full mx-auto shadow border border-amber-500/20">
                      Hướng camera vào di tích, hoa văn, hiện vật hoặc cổ phục
                    </p>
                  </div>
                )}

                {/* Camera Fallback / Error Display */}
                {(!isCameraActive || cameraError) && (
                  <div className="absolute inset-0 bg-stone-950 flex flex-col items-center justify-center p-6 text-center space-y-4">
                    <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center">
                      <Camera className="w-7 h-7" />
                    </div>

                    <div className="max-w-xs space-y-1">
                      <h4 className="text-stone-200 font-serif font-bold text-sm">
                        Kích hoạt Máy Ảnh Chụp Trực Tiếp
                      </h4>
                      <p className="text-stone-400 text-xs leading-relaxed">
                        {cameraError || 'Cho phép quyền truy cập Camera trên trình duyệt để chụp và nhận diện di sản ngay tại chỗ.'}
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2 w-full max-w-xs">
                      <button
                        type="button"
                        onClick={() => startCamera(facingMode)}
                        className="flex-1 py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow transition-all cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Thử lại Camera</span>
                      </button>

                      {/* Mobile Native Camera Direct Trigger */}
                      <button
                        type="button"
                        onClick={() => directCameraInputRef.current?.click()}
                        className="flex-1 py-2.5 px-4 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold text-xs border border-stone-700 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                        title="Mở ứng dụng Máy ảnh trên điện thoại"
                      >
                        <Camera className="w-3.5 h-3.5 text-amber-400" />
                        <span>Mở Camera máy</span>
                      </button>
                    </div>
                  </div>
                )}

              </div>
            ) : (
              /* SCENARIO C: UPLOAD FILE DRAG & DROP AREA */
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="w-full h-full min-h-[340px] p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-colors bg-stone-950/60 hover:bg-stone-900"
              >
                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center mx-auto mb-3">
                  <Upload className="w-7 h-7" />
                </div>
                <p className="text-sm font-semibold text-stone-200">Bấm để chọn tệp hoặc kéo thả ảnh vào đây</p>
                <p className="text-xs text-stone-400 mt-1">Hỗ trợ định dạng JPG, PNG, WEBP (Tối đa 10MB)</p>
                <span className="mt-4 px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-300 text-xs font-semibold border border-stone-700">
                  Duyệt ảnh từ thiết bị
                </span>
              </div>
            )}

          </div>

          {/* CAMERA ACTION SHUTTER BUTTON BAR */}
          {inputMode === 'camera' && !selectedImage && isCameraActive && (
            <div className="flex flex-col items-center gap-3 pt-1">
              <div className="flex items-center justify-center gap-4 w-full">
                
                {/* Switch to Native Camera button */}
                <button
                  type="button"
                  onClick={() => directCameraInputRef.current?.click()}
                  className="p-3 rounded-2xl bg-stone-950 border border-stone-800 hover:bg-stone-800 text-stone-300 hover:text-amber-300 text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                  title="Chụp bằng ứng dụng máy ảnh gốc của điện thoại"
                >
                  <Camera className="w-4 h-4 text-amber-400" />
                  <span className="hidden sm:inline">Camera máy</span>
                </button>

                {/* Primary Large Shutter Button (Chụp & Nhận diện ngay) */}
                <button
                  id="btn-shutter-capture"
                  type="button"
                  onClick={handleCapturePhoto}
                  className="group relative flex items-center gap-3 px-6 sm:px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-stone-950 font-bold text-sm shadow-xl shadow-amber-950/40 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  <span className="w-6 h-6 rounded-full border-2 border-stone-950 group-hover:bg-stone-950 group-hover:text-amber-400 flex items-center justify-center transition-colors">
                    <span className="w-2.5 h-2.5 rounded-full bg-stone-950 group-hover:bg-amber-400" />
                  </span>
                  <span>Chụp & Nhận Diện Ngay</span>
                </button>

                {/* Flip camera */}
                <button
                  type="button"
                  onClick={handleToggleFacingMode}
                  className="p-3 rounded-2xl bg-stone-950 border border-stone-800 hover:bg-stone-800 text-stone-300 hover:text-amber-300 text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                  title="Đổi camera trước / sau"
                >
                  <SwitchCamera className="w-4 h-4 text-amber-400" />
                  <span className="hidden sm:inline">Đổi chiều</span>
                </button>
              </div>

              {/* Auto-analyze checkbox toggle */}
              <label className="flex items-center gap-2 text-xs text-stone-400 cursor-pointer select-none">
                <input 
                  type="checkbox"
                  checked={autoRecognizeOnSnap}
                  onChange={(e) => setAutoRecognizeOnSnap(e.target.checked)}
                  className="w-3.5 h-3.5 rounded text-amber-500 focus:ring-0 bg-stone-950 border-stone-700"
                />
                <span>Tự động nhận diện AI ngay khi bấm chụp (Tối ưu 1 chạm)</span>
              </label>
            </div>
          )}

          {/* Optional context prompt */}
          <div>
            <label className="block text-xs font-semibold text-stone-300 mb-1.5 uppercase tracking-wider">
              Ghi chú bổ sung cho AI (tùy chọn):
            </label>
            <input 
              type="text" 
              value={userNote} 
              onChange={(e) => setUserNote(e.target.value)} 
              placeholder="Ví dụ: Hiện vật này tôi thấy tại chùa ở Bắc Ninh..."
              className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3.5 py-2.5 text-xs text-stone-100 focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Action Button (When an image is already captured/selected or for manual re-run) */}
          {selectedImage && (
            <button
              id="btn-run-recognition"
              onClick={() => runRecognitionWithImage(selectedImage)}
              disabled={loading}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-bold text-sm shadow-lg shadow-amber-900/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-stone-950" />
                  <span>AI đang phân tích thị giác di sản...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-stone-950" />
                  <span>{result ? 'Phân tích lại hình ảnh này' : 'Bắt đầu Nhận diện Di sản AI'}</span>
                </>
              )}
            </button>
          )}

          {error && (
            <div className="p-3.5 bg-red-950/40 border border-red-800/60 rounded-xl text-red-300 text-xs flex items-center gap-2.5 animate-fadeIn">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Right Column: AI Analysis Result */}
        <div className="lg:col-span-6 space-y-6">
          
          {loading && (
            <div className="bg-stone-900 border border-stone-800 rounded-3xl p-10 text-center space-y-4 shadow-xl">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto animate-bounce border border-amber-500/30">
                <Scan className="w-8 h-8" />
              </div>
              <h4 className="font-serif font-bold text-amber-200 text-lg">Đang đối chiếu dữ liệu di sản Việt Nam</h4>
              <p className="text-xs text-stone-400 max-w-md mx-auto leading-relaxed">
                Mô hình Gemini 3.8 Flash Vision đang phân tích đặc trưng kiến trúc, hoa văn, niên đại và độ tin cậy lịch sử...
              </p>
              <div className="w-48 h-2 bg-stone-950 rounded-full mx-auto overflow-hidden border border-stone-800">
                <div className="h-full bg-gradient-to-r from-amber-500 to-amber-300 animate-pulse w-3/4 rounded-full" />
              </div>
            </div>
          )}

          {!loading && !result && (
            <div className="bg-stone-900/60 border border-dashed border-stone-800 rounded-3xl p-12 text-center text-stone-500 space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-stone-950 border border-stone-800 text-stone-600 flex items-center justify-center mx-auto">
                <Compass className="w-7 h-7 text-stone-600" />
              </div>
              <p className="text-sm font-semibold text-stone-300">Chưa có kết quả nhận diện</p>
              <p className="text-xs text-stone-500 max-w-sm mx-auto leading-relaxed">
                Chỉ cần hướng camera vào di sản và bấm <strong>"Chụp & Nhận Diện Ngay"</strong> hoặc chọn ảnh mẫu phía trên để trải nghiệm.
              </p>
            </div>
          )}

          {!loading && result && (
            <div className="bg-stone-900 border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 animate-fadeIn">
              
              {/* Header result with verification badge */}
              <div className="flex flex-wrap items-start justify-between gap-3 border-b border-stone-800 pb-5">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      {result.categoryLabel}
                    </span>
                    <span className="text-xs text-stone-400 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-red-400" />
                      {result.province} ({result.region === 'north' ? 'Miền Bắc' : result.region === 'central' ? 'Miền Trung' : 'Miền Nam'})
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-amber-100">
                    {result.name}
                  </h3>
                  {result.period && (
                    <p className="text-xs text-stone-400 mt-1 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-stone-500" />
                      <span>{result.period} {result.dynasty ? `• ${result.dynasty}` : ''}</span>
                    </p>
                  )}
                </div>

                {/* Strict Verification Badge */}
                <div>
                  {result.verifiedStatus === 'verified' && (
                    <div className="px-3 py-1.5 rounded-xl bg-emerald-950/60 border border-emerald-500/50 text-emerald-300 text-xs font-bold flex items-center gap-1.5 shadow-sm">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>[THÔNG TIN ĐÃ XÁC MINH]</span>
                    </div>
                  )}
                  {result.verifiedStatus === 'folk_legend' && (
                    <div className="px-3 py-1.5 rounded-xl bg-amber-950/60 border border-amber-500/50 text-amber-300 text-xs font-bold flex items-center gap-1.5 shadow-sm">
                      <HelpCircle className="w-4 h-4 text-amber-400" />
                      <span>[TRUYỀN THUYẾT / DÂN GIAN]</span>
                    </div>
                  )}
                  {result.verifiedStatus === 'unverified' && (
                    <div className="px-3 py-1.5 rounded-xl bg-stone-800 border border-stone-600 text-stone-300 text-xs font-bold flex items-center gap-1.5 shadow-sm">
                      <Info className="w-4 h-4 text-stone-400" />
                      <span>[THÔNG TIN CHƯA XÁC MINH]</span>
                    </div>
                  )}
                </div>
              </div>

              {/* History & Cultural significance */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-1 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Lịch sử & Nguồn gốc:</span>
                  </h4>
                  <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
                    {result.history}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-1 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Ý nghĩa Văn hóa & Kiến trúc:</span>
                  </h4>
                  <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
                    {result.culturalSignificance}
                  </p>
                </div>
              </div>

              {/* Interesting facts */}
              {result.interestingFacts && result.interestingFacts.length > 0 && (
                <div className="bg-stone-950/50 rounded-2xl p-4 border border-stone-800">
                  <h4 className="text-xs font-semibold text-amber-300 mb-2 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-amber-400" />
                    <span>Thông tin thú vị ít người biết:</span>
                  </h4>
                  <ul className="space-y-1.5">
                    {result.interestingFacts.map((fact, idx) => (
                      <li key={idx} className="text-xs text-stone-300 flex items-start gap-2">
                        <span className="text-amber-400 font-bold">•</span>
                        <span>{fact}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Suggested Questions to explore deeper */}
              {result.suggestedQuestions && result.suggestedQuestions.length > 0 && (
                <div>
                  <p className="text-xs text-stone-400 mb-2">Câu hỏi gợi ý để tìm hiểu sâu hơn:</p>
                  <div className="flex flex-wrap gap-2">
                    {result.suggestedQuestions.map((q, idx) => (
                      <button
                        key={idx}
                        onClick={() => onAskChatbot(q, result)}
                        className="text-xs bg-stone-800 hover:bg-stone-700 text-stone-200 px-3 py-1.5 rounded-lg border border-stone-700 hover:border-amber-400/40 text-left transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <MessageSquare className="w-3 h-3 text-sky-400" />
                        <span>{q}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Direct Next Action CTAs */}
              <div className="pt-4 border-t border-stone-800 flex flex-wrap gap-2.5 sm:gap-3">
                <button
                  onClick={() => onNavigateToStory(result.name, result.history, result.period)}
                  className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow transition-all cursor-pointer"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Nghe AI kể chuyện</span>
                </button>

                <button
                  onClick={() => onNavigateToFood('dai-noi-hue')}
                  className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold flex items-center gap-1.5 border border-stone-700 transition-all cursor-pointer"
                >
                  <Utensils className="w-4 h-4 text-orange-400" />
                  <span>Ăn uống & Vui chơi gần đây</span>
                </button>

                <button
                  onClick={() => onNavigateToMap('dai-noi-hue')}
                  className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold flex items-center gap-1.5 border border-stone-700 transition-all cursor-pointer"
                >
                  <Compass className="w-4 h-4 text-emerald-400" />
                  <span>Xem vị trí trên bản đồ</span>
                </button>
              </div>

            </div>
          )}

        </div>

      </div>

      {/* Admin Recognition Modal */}
      {isAdmin && (
        <AdminRecognitionModal
          isOpen={isAdminModalOpen}
          onClose={() => setIsAdminModalOpen(false)}
          onSaved={(newCfg) => setSectionConfig(newCfg)}
        />
      )}

    </div>
  );
};
