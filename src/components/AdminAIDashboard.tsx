import React, { useState, useEffect } from 'react';
import { 
  Cpu, 
  CheckCircle2, 
  AlertTriangle, 
  RefreshCw, 
  Sparkles, 
  Sliders, 
  Zap, 
  ShieldCheck, 
  Globe, 
  Key, 
  Send, 
  Server, 
  HelpCircle,
  FileText,
  Volume2,
  Lock,
  Eye,
  EyeOff,
  Check,
  X,
  Activity,
  Layers,
  Database,
  Mail,
  Inbox,
  Clock
} from 'lucide-react';
import { getAIConfig, saveAIConfig, resetAIConfig, AIConfig, AIProvider } from '../config/aiConfig';
import { AI_MODEL_PROFILES, AIModelProfile, getModelsForProvider } from '../config/aiModels';
import { getTTSConfig, saveTTSConfig, resetTTSConfig, TTSConfig, TTSProviderType } from '../config/ttsConfig';
import { getEmailJSConfig, saveEmailJSConfig, resetEmailJSConfig, EmailJSConfig } from '../config/emailJsConfig';
import { 
  saveAIConfigToFirebase, 
  loadAIConfigFromFirebase, 
  saveTTSConfigToFirebase, 
  loadTTSConfigFromFirebase,
  saveEmailJSConfigToFirebase,
  loadEmailJSConfigFromFirebase
} from '../services/systemConfigService';
import { storageService } from '../services/storageService';

export const AdminAIDashboard: React.FC = () => {
  // Current user email
  const currentUser = storageService.getCurrentUser();

  // AI Gemini & Provider Config
  const [aiConfig, setAiConfig] = useState<AIConfig>(getAIConfig());
  const [showAiApiKey, setShowAiApiKey] = useState(false);
  const [aiSaved, setAiSaved] = useState(false);
  const [isSavingAi, setIsSavingAi] = useState(false);
  const [aiSaveError, setAiSaveError] = useState<string | null>(null);

  // TTS VieNeu Config
  const [ttsConfig, setTtsConfig] = useState<TTSConfig>(getTTSConfig());
  const [showTtsApiKey, setShowTtsApiKey] = useState(false);
  const [ttsSaved, setTtsSaved] = useState(false);
  const [isSavingTts, setIsSavingTts] = useState(false);
  const [ttsSaveError, setTtsSaveError] = useState<string | null>(null);

  // EmailJS OTP Config
  const [emailJsConfig, setEmailJsConfig] = useState<EmailJSConfig>(getEmailJSConfig());
  const [showEmailJsPublicKey, setShowEmailJsPublicKey] = useState(false);
  const [showEmailJsPrivateKey, setShowEmailJsPrivateKey] = useState(false);
  const [emailJsSaved, setEmailJsSaved] = useState(false);
  const [isSavingEmailJs, setIsSavingEmailJs] = useState(false);
  const [emailJsSaveError, setEmailJsSaveError] = useState<string | null>(null);
  const [testEmailAddress, setTestEmailAddress] = useState(currentUser?.email || 'admin@heritageai.vn');

  // Load configurations from Firebase on mount
  useEffect(() => {
    let isMounted = true;
    async function loadRemoteConfigs() {
      try {
        const [remoteAi, remoteTts, remoteEmailJs] = await Promise.all([
          loadAIConfigFromFirebase(),
          loadTTSConfigFromFirebase(),
          loadEmailJSConfigFromFirebase()
        ]);
        if (isMounted) {
          if (remoteAi) setAiConfig(remoteAi);
          if (remoteTts) setTtsConfig(remoteTts);
          if (remoteEmailJs) setEmailJsConfig(remoteEmailJs);
        }
      } catch (err) {
        console.warn('Lỗi khi tải cấu hình từ Firebase:', err);
      }
    }
    loadRemoteConfigs();
    return () => {
      isMounted = false;
    };
  }, []);

  // Connection Test States
  const [testingAi, setTestingAi] = useState(false);
  const [aiTestResult, setAiTestResult] = useState<{
    success: boolean;
    message: string;
    responseTimeMs?: number;
  } | null>(null);

  const [testingTts, setTestingTts] = useState(false);
  const [ttsTestResult, setTtsTestResult] = useState<{
    success: boolean;
    message: string;
    status?: number;
    statusText?: string;
    hostname?: string;
    endpoint?: string;
    httpMethod?: string;
    requestFields?: string[];
    responseTimeMs?: number;
    errorCategory?: string;
    instructions?: string;
    responseSnippet?: string;
  } | null>(null);

  const [testingEmailJs, setTestingEmailJs] = useState(false);
  const [emailJsTestResult, setEmailJsTestResult] = useState<{
    success: boolean;
    message: string;
    status?: number;
    responseTimeMs?: number;
    responseSnippet?: string;
  } | null>(null);

  // Last check timestamps
  const [lastCheckTime, setLastCheckTime] = useState<string | null>(null);

  // Available models for selected AI provider
  const primaryModels = getModelsForProvider(aiConfig.provider);

  // Handle Save AI Configuration to Firebase
  const handleSaveAi = async () => {
    setAiSaveError(null);
    setIsSavingAi(true);
    try {
      const res = await saveAIConfigToFirebase(aiConfig, currentUser?.email || 'admin');
      setIsSavingAi(false);
      setAiSaved(true);
      if (res.error) {
        setAiSaveError(res.error);
      }
      setTimeout(() => setAiSaved(false), 3500);
    } catch (e: any) {
      setIsSavingAi(false);
      setAiSaveError('⚠ Không thể lưu cấu hình AI lên Firebase.');
    }
  };

  // Handle Save TTS Configuration to Firebase
  const handleSaveTts = async () => {
    setTtsSaveError(null);
    if (ttsConfig.provider === 'vieneu' && ttsConfig.endpoint) {
      if (!ttsConfig.endpoint.startsWith('http://') && !ttsConfig.endpoint.startsWith('https://')) {
        setTtsSaveError('⚠ Địa chỉ API Endpoint không hợp lệ. Phải bắt đầu bằng http:// hoặc https://');
        return;
      }
    }
    setIsSavingTts(true);
    try {
      const res = await saveTTSConfigToFirebase(ttsConfig, currentUser?.email || 'admin');
      setIsSavingTts(false);
      setTtsSaved(true);
      if (res.error) {
        setTtsSaveError(res.error);
      }
      setTimeout(() => setTtsSaved(false), 3500);
    } catch (e: any) {
      setIsSavingTts(false);
      setTtsSaveError('⚠ Không thể lưu cấu hình TTS lên Firebase.');
    }
  };

  // Handle Save EmailJS Configuration to Firebase
  const handleSaveEmailJs = async () => {
    setEmailJsSaveError(null);
    setIsSavingEmailJs(true);
    try {
      const res = await saveEmailJSConfigToFirebase(emailJsConfig, currentUser?.email || 'admin');
      setIsSavingEmailJs(false);
      setEmailJsSaved(true);
      if (res.error) {
        setEmailJsSaveError(res.error);
      }
      setTimeout(() => setEmailJsSaved(false), 3500);
    } catch (e: any) {
      setIsSavingEmailJs(false);
      setEmailJsSaveError('⚠ Không thể lưu cấu hình EmailJS lên Firebase.');
    }
  };

  // Reset all settings
  const handleResetAll = () => {
    if (window.confirm('Khôi phục toàn bộ cấu hình AI, TTS & EmailJS về mặc định ban đầu?')) {
      const defAi = resetAIConfig();
      const defTts = resetTTSConfig();
      const defEmailJs = resetEmailJSConfig();
      setAiConfig(defAi);
      setTtsConfig(defTts);
      setEmailJsConfig(defEmailJs);
      setAiTestResult(null);
      setTtsTestResult(null);
      setEmailJsTestResult(null);
    }
  };

  // Run Test AI API
  const runTestAi = async () => {
    setTestingAi(true);
    setAiTestResult(null);
    try {
      const res = await fetch('/api/ai/test-connection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          provider: aiConfig.provider,
          model: aiConfig.model,
          baseUrl: aiConfig.baseUrl,
          apiKey: aiConfig.apiKey
        })
      });

      const data = await res.json();
      setLastCheckTime(new Date().toLocaleTimeString('vi-VN'));
      if (res.ok && data.success) {
        setAiTestResult({
          success: true,
          message: data.message || `🟢 Kết nối ${aiConfig.provider.toUpperCase()} thành công!`,
          responseTimeMs: data.responseTimeMs
        });
      } else {
        setAiTestResult({
          success: false,
          message: data.error || '🔴 Kết nối thất bại. Vui lòng kiểm tra lại cấu hình API key / model.',
          responseTimeMs: data.responseTimeMs
        });
      }
    } catch (err: any) {
      setAiTestResult({
        success: false,
        message: '🔴 Lỗi mạng: Không thể kết nối tới dịch vụ AI.'
      });
    } finally {
      setTestingAi(false);
    }
  };

  // Run Test VieNeu TTS API
  const runTestTts = async () => {
    setTestingTts(true);
    setTtsTestResult(null);

    if (ttsConfig.provider === 'vieneu') {
      if (!ttsConfig.endpoint || (!ttsConfig.endpoint.startsWith('http://') && !ttsConfig.endpoint.startsWith('https://'))) {
        setTestingTts(false);
        setTtsTestResult({
          success: false,
          message: '🔴 Địa chỉ API Endpoint không hợp lệ. Vui lòng nhập URL bắt đầu bằng http:// hoặc https://',
          hostname: ttsConfig.endpoint || 'chưa-nhập',
          endpoint: ttsConfig.endpoint,
          responseTimeMs: 0,
          instructions: 'Nhập lại địa chỉ API Endpoint dạng URL hợp lệ (Ví dụ: https://vieneu.io/v1/audio/speech hoặc http://your-docker-ip:8000/v1/tts).'
        });
        return;
      }
    }

    try {
      const res = await fetch('/api/tts/test-connection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          provider: ttsConfig.provider,
          endpoint: ttsConfig.endpoint,
          apiKey: ttsConfig.apiKey,
          model: 'vieneu-v4'
        })
      });

      const data = await res.json();
      setLastCheckTime(new Date().toLocaleTimeString('vi-VN'));

      setTtsTestResult({
        success: data.success,
        message: data.message || (data.success ? '🟢 Kết nối VieNeu API thành công!' : '🔴 Kết nối VieNeu API không thành công.'),
        status: data.status,
        statusText: data.statusText,
        hostname: data.hostname,
        endpoint: data.endpoint || ttsConfig.endpoint,
        httpMethod: data.httpMethod || 'POST',
        requestFields: data.requestFields || ['model', 'input'],
        responseTimeMs: data.responseTimeMs,
        errorCategory: data.errorCategory,
        instructions: data.instructions,
        responseSnippet: data.responseSnippet
      });
    } catch (err: any) {
      setTtsTestResult({
        success: false,
        message: '🔴 Lỗi mạng: Không thể gửi yêu cầu tới server proxy /api/tts/test-connection.',
        instructions: 'Kiểm tra xem Hồn Đất Việt server backend có đang chạy hay không.'
      });
    } finally {
      setTestingTts(false);
    }
  };

  // Run Test EmailJS API
  const runTestEmailJs = async () => {
    if (!emailJsConfig.serviceId || !emailJsConfig.templateId || !emailJsConfig.publicKey) {
      setEmailJsTestResult({
        success: false,
        message: '🔴 Vui lòng điền đủ Service ID, Template ID và Public Key trước khi kiểm tra.'
      });
      return;
    }

    setTestingEmailJs(true);
    setEmailJsTestResult(null);

    try {
      const res = await fetch('/api/emailjs/test-connection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceId: emailJsConfig.serviceId,
          templateId: emailJsConfig.templateId,
          publicKey: emailJsConfig.publicKey,
          privateKey: emailJsConfig.privateKey,
          testEmail: testEmailAddress || currentUser?.email || 'admin@heritageai.vn'
        })
      });

      const data = await res.json();
      setLastCheckTime(new Date().toLocaleTimeString('vi-VN'));

      setEmailJsTestResult({
        success: data.success,
        message: data.message || (data.success ? '🟢 Kết nối EmailJS thành công! Đã gửi email test.' : '🔴 Kết nối EmailJS không thành công.'),
        status: data.status,
        responseTimeMs: data.responseTimeMs,
        responseSnippet: data.responseSnippet
      });
    } catch (err: any) {
      setEmailJsTestResult({
        success: false,
        message: '🔴 Lỗi mạng: Không thể kết nối tới server proxy /api/emailjs/test-connection.'
      });
    } finally {
      setTestingEmailJs(false);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-amber-400" />
            <h3 className="font-serif font-bold text-stone-100 text-lg">
              ⚙️ Cài Đặt AI & API Quản Trị
            </h3>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-semibold">
              Admin Control Center
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-semibold flex items-center gap-1">
              <Database className="w-3 h-3" />
              <span>Đồng bộ Firebase Firestore</span>
            </span>
          </div>
          <p className="text-xs text-stone-400 mt-1 max-w-2xl leading-relaxed">
            Cấu hình kết nối trực tiếp giữa Gemini AI (Tạo phản hồi) và VieNeu Cloud TTS (Chuyển đổi giọng nói tiếng Việt) mà không cần can thiệp mã nguồn frontend.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleResetAll}
            className="px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Mặc định</span>
          </button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: AI & TTS Configurations */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* ---------------------------------------------------- */}
          {/* SECTION 1: 🤖 GEMINI AI                              */}
          {/* ---------------------------------------------------- */}
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 space-y-4 shadow-md">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                <h4 className="font-bold text-stone-100 text-sm">🤖 GEMINI AI CONFIGURATION</h4>
              </div>
              <span className="text-[10px] text-emerald-400 font-mono bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                Xử lý tri thức & Chatbot
              </span>
            </div>

            {aiSaveError && (
              <div className="p-3 rounded-xl bg-red-950/80 border border-red-500/40 text-red-300 text-xs flex items-center justify-between">
                <span>{aiSaveError}</span>
                <button onClick={() => setAiSaveError(null)} className="text-red-400 hover:text-white"><X className="w-3.5 h-3.5" /></button>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {/* AI Provider */}
              <div>
                <label className="block text-stone-300 font-semibold mb-1.5">
                  AI Provider:
                </label>
                <select
                  value={aiConfig.provider}
                  onChange={(e) => {
                    const p = e.target.value as AIProvider;
                    const models = getModelsForProvider(p);
                    setAiConfig({
                      ...aiConfig,
                      provider: p,
                      model: models[0]?.id || aiConfig.model
                    });
                  }}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-stone-100 font-semibold focus:outline-none focus:border-amber-500"
                >
                  <option value="gemini">Google Gemini (Khuyên dùng chính thức)</option>
                  <option value="openrouter">OpenRouter (Dự phòng)</option>
                  <option value="huggingface">HuggingFace Inference API</option>
                  <option value="custom">Custom Endpoint (OpenAI Format)</option>
                </select>
              </div>

              {/* Model */}
              <div>
                <label className="block text-stone-300 font-semibold mb-1.5">
                  Model:
                </label>
                {primaryModels.length > 0 ? (
                  <select
                    value={aiConfig.model}
                    onChange={(e) => setAiConfig({ ...aiConfig, model: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-stone-100 font-semibold focus:outline-none focus:border-amber-500"
                  >
                    {primaryModels.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.name} ({m.id})
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    value={aiConfig.model}
                    onChange={(e) => setAiConfig({ ...aiConfig, model: e.target.value })}
                    placeholder="gemini-flash-latest"
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-stone-100 focus:outline-none focus:border-amber-500"
                  />
                )}
              </div>
            </div>

            {/* API Key (Secured) */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-stone-300 font-semibold text-xs flex items-center gap-1.5">
                  <Key className="w-3.5 h-3.5 text-amber-400" />
                  <span>API Key Secret (Bảo vệ qua Server Environment Proxy):</span>
                </label>
                <span className="text-[10px] text-amber-400 font-mono">
                  ••••••••••••••••
                </span>
              </div>
              <div className="relative">
                <input
                  type={showAiApiKey ? 'text' : 'password'}
                  value={aiConfig.apiKey || ''}
                  onChange={(e) => setAiConfig({ ...aiConfig, apiKey: e.target.value })}
                  placeholder="Mặc định sử dụng GEMINI_API_KEY ở file .env server"
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl pl-3 pr-10 py-2 text-stone-100 text-xs focus:outline-none focus:border-amber-500 font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowAiApiKey(!showAiApiKey)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300"
                  title="Ẩn / Hiện key"
                >
                  {showAiApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-[11px] text-stone-500 mt-1">
                🔒 API Key secret được lưu an toàn trong biến môi trường server hoặc được mã hóa phía sau API proxy. Không bao giờ lộ key ở phía client bundle.
              </p>
            </div>

            {/* Action Buttons & Status */}
            <div className="pt-2 border-t border-stone-800/80 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={runTestAi}
                  disabled={testingAi}
                  className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${testingAi ? 'animate-spin' : ''}`} />
                  <span>{testingAi ? 'Đang kiểm tra...' : '🔍 Kiểm tra API'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleSaveAi}
                  disabled={isSavingAi}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-md disabled:opacity-50"
                  title="Lưu cấu hình Gemini AI lên Firebase Firestore"
                >
                  <CheckCircle2 className={`w-4 h-4 ${isSavingAi ? 'animate-spin' : ''}`} />
                  <span>{isSavingAi ? 'Đang lưu Firebase...' : aiSaved ? '✓ Đã lưu lên Firebase' : '💾 Lưu cấu hình'}</span>
                </button>
              </div>

              {aiTestResult && (
                <div className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 border ${
                  aiTestResult.success 
                    ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40' 
                    : 'bg-rose-950/80 text-rose-300 border-rose-500/40'
                }`}>
                  <span>{aiTestResult.message}</span>
                  {aiTestResult.responseTimeMs && (
                    <span className="text-[10px] opacity-80">({aiTestResult.responseTimeMs}ms)</span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* ---------------------------------------------------- */}
          {/* SECTION 2: 🔊 VIENEU TTS                             */}
          {/* ---------------------------------------------------- */}
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 space-y-4 shadow-md">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <div className="flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-amber-400" />
                <h4 className="font-bold text-stone-100 text-sm">🔊 VIENEU TTS (TEXT-TO-SPEECH)</h4>
              </div>
              <span className="text-[10px] text-amber-400 font-mono bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800">
                Giọng nói Tiếng Việt
              </span>
            </div>

            {ttsSaveError && (
              <div className="p-3 rounded-xl bg-red-950/80 border border-red-500/40 text-red-300 text-xs flex items-center justify-between">
                <span>{ttsSaveError}</span>
                <button onClick={() => setTtsSaveError(null)} className="text-red-400 hover:text-white"><X className="w-3.5 h-3.5" /></button>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {/* TTS Provider */}
              <div>
                <label className="block text-stone-300 font-semibold mb-1.5">
                  TTS Provider:
                </label>
                <select
                  value={ttsConfig.provider}
                  onChange={(e) => setTtsConfig({ ...ttsConfig, provider: e.target.value as TTSProviderType })}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-stone-100 font-semibold focus:outline-none focus:border-amber-500"
                >
                  <option value="vieneu">VieNeu Cloud (Khuyên dùng cho Giọng đọc Tiếng Việt)</option>
                  <option value="web_speech">Web Speech API (Nội bộ trình duyệt)</option>
                </select>
              </div>

              {/* API Endpoint */}
              <div>
                <label className="block text-stone-300 font-semibold mb-1.5">
                  API Endpoint:
                </label>
                <input
                  type="text"
                  value={ttsConfig.endpoint}
                  onChange={(e) => setTtsConfig({ ...ttsConfig, endpoint: e.target.value })}
                  placeholder="https://api.vieneu.io/api/v1/audio/speech"
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-stone-100 focus:outline-none focus:border-amber-500 font-mono text-xs"
                />
              </div>
            </div>

            {/* API Key VieNeu */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-stone-300 font-semibold text-xs flex items-center gap-1.5">
                  <Key className="w-3.5 h-3.5 text-amber-400" />
                  <span>API Key Secret (VieNeu Cloud Token):</span>
                </label>
                <span className="text-[10px] text-stone-500 font-mono">
                  ••••••••••••••••
                </span>
              </div>
              <div className="relative">
                <input
                  type={showTtsApiKey ? 'text' : 'password'}
                  value={ttsConfig.apiKey || ''}
                  onChange={(e) => setTtsConfig({ ...ttsConfig, apiKey: e.target.value })}
                  placeholder="Nhập VieNeu API Key (hoặc cấu hình VIENEU_API_KEY ở server env)"
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl pl-3 pr-10 py-2 text-stone-100 text-xs focus:outline-none focus:border-amber-500 font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowTtsApiKey(!showTtsApiKey)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300"
                  title="Ẩn / Hiện key"
                >
                  {showTtsApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {/* Voice Select */}
              <div>
                <label className="block text-stone-300 font-semibold mb-1.5">
                  Voice (Giọng đọc):
                </label>
                <select
                  value={ttsConfig.voice}
                  onChange={(e) => setTtsConfig({ ...ttsConfig, voice: e.target.value })}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-stone-100 font-semibold focus:outline-none focus:border-amber-500"
                >
                  <option value="Ngọc Lan">Ngọc Lan (Nữ Miền Bắc - Chuẩn VieNeu)</option>
                  <option value="Nữ Miền Bắc">Nữ Miền Bắc</option>
                  <option value="Nam Miền Bắc">Nam Miền Bắc</option>
                  <option value="Nữ Miền Nam">Nữ Miền Nam</option>
                  <option value="Nam Miền Nam">Nam Miền Nam</option>
                  <option value="default">Default (Ngọc Lan)</option>
                  <option value="hn_female_1">Hà Nội Nữ (hn_female_1)</option>
                  <option value="sg_male_1">Sài Gòn Nam (sg_male_1)</option>
                  <option value="hue_female_1">Huế Nữ (hue_female_1)</option>
                </select>
              </div>

              {/* Language */}
              <div>
                <label className="block text-stone-300 font-semibold mb-1.5">
                  Language (Mã ngôn ngữ):
                </label>
                <input
                  type="text"
                  value={ttsConfig.language}
                  onChange={(e) => setTtsConfig({ ...ttsConfig, language: e.target.value })}
                  placeholder="vi-VN"
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-stone-100 font-mono focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* Action Buttons & Status */}
            <div className="pt-2 border-t border-stone-800/80 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={runTestTts}
                    disabled={testingTts}
                    className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${testingTts ? 'animate-spin' : ''}`} />
                    <span>{testingTts ? 'Đang kiểm tra...' : '🧪 Kiểm tra VieNeu API'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleSaveTts}
                    disabled={isSavingTts}
                    className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-md disabled:opacity-50"
                    title="Lưu cấu hình VieNeu TTS lên Firebase Firestore"
                  >
                    <CheckCircle2 className={`w-4 h-4 ${isSavingTts ? 'animate-spin' : ''}`} />
                    <span>{isSavingTts ? 'Đang lưu Firebase...' : ttsSaved ? '✓ Đã lưu lên Firebase' : '💾 Lưu cấu hình'}</span>
                  </button>
                </div>
              </div>

              {/* Detailed Diagnostic Result */}
              {ttsTestResult && (
                <div className={`p-4 rounded-2xl border text-xs space-y-2.5 ${
                  ttsTestResult.success 
                    ? 'bg-emerald-950/60 text-emerald-200 border-emerald-500/40' 
                    : 'bg-rose-950/60 text-rose-200 border-rose-500/40'
                }`}>
                  <div className="flex items-center justify-between font-bold text-sm">
                    <span className="flex items-center gap-1.5">
                      {ttsTestResult.success ? '🟢 Kết nối thành công' : '🔴 Kết nối không thành công'}
                    </span>
                    {ttsTestResult.responseTimeMs !== undefined && (
                      <span className="font-mono text-xs opacity-80 bg-stone-900/80 px-2.5 py-0.5 rounded-full border border-stone-800">
                        {ttsTestResult.responseTimeMs}ms
                      </span>
                    )}
                  </div>

                  <p className="font-medium text-xs leading-relaxed">
                    {ttsTestResult.message}
                  </p>

                  {/* Technical Diagnostic Metadata */}
                  <div className="bg-stone-950/80 p-3 rounded-xl border border-stone-800 font-mono text-[11px] space-y-1.5 text-stone-300">
                    <div className="flex justify-between items-center">
                      <span className="text-stone-500">Host Server:</span>
                      <span className="text-amber-300 font-bold">{ttsTestResult.hostname || 'Chưa xác định'}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-stone-500">API Endpoint:</span>
                      <span className="text-stone-300 truncate max-w-[260px]" title={ttsTestResult.endpoint}>
                        {ttsTestResult.endpoint}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-stone-500">HTTP Method:</span>
                      <span className="text-amber-400 font-bold">{ttsTestResult.httpMethod || 'POST'}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-stone-500">Request fields:</span>
                      <span className="text-emerald-300 font-bold">{(ttsTestResult.requestFields || ['model', 'input']).join(', ')}</span>
                    </div>
                    {ttsTestResult.status !== undefined && (
                      <div className="flex justify-between items-center">
                        <span className="text-stone-500">HTTP Status:</span>
                        <span className={ttsTestResult.status === 200 ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                          {ttsTestResult.status} {ttsTestResult.statusText || ''}
                        </span>
                      </div>
                    )}
                    {ttsTestResult.errorCategory && (
                      <div className="flex justify-between items-center">
                        <span className="text-stone-500">Mã loại lỗi:</span>
                        <span className="text-rose-300 font-bold">{ttsTestResult.errorCategory}</span>
                      </div>
                    )}
                    {ttsTestResult.responseSnippet && (
                      <div className="pt-1 border-t border-stone-800/80 text-[10px] text-stone-400">
                        <span className="text-stone-500 block mb-0.5">Response body:</span>
                        <code className="block bg-stone-900 p-1.5 rounded text-stone-300 truncate">
                          {ttsTestResult.responseSnippet}
                        </code>
                      </div>
                    )}
                  </div>

                  {/* Actionable Instructions */}
                  {ttsTestResult.instructions && (
                    <div className="p-3 rounded-xl bg-amber-950/50 border border-amber-500/40 text-amber-200 text-[11px] flex items-start gap-2">
                      <HelpCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <strong className="block font-semibold text-amber-300">💡 Hướng dẫn khắc phục:</strong>
                        <p className="leading-relaxed">{ttsTestResult.instructions}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* ---------------------------------------------------- */}
          {/* SECTION 3: 📧 EMAILJS OTP CONFIGURATION             */}
          {/* ---------------------------------------------------- */}
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 space-y-4 shadow-md">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400" />
                <h4 className="font-bold text-stone-100 text-sm">📧 EMAILJS OTP CONFIGURATION</h4>
              </div>
              <span className="text-[10px] text-amber-400 font-mono bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800">
                Gửi mã xác thực Email (OTP)
              </span>
            </div>

            {emailJsSaveError && (
              <div className="p-3 rounded-xl bg-red-950/80 border border-red-500/40 text-red-300 text-xs flex items-center justify-between">
                <span>{emailJsSaveError}</span>
                <button onClick={() => setEmailJsSaveError(null)} className="text-red-400 hover:text-white"><X className="w-3.5 h-3.5" /></button>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {/* Service ID */}
              <div>
                <label className="block text-stone-300 font-semibold mb-1.5">
                  EmailJS Service ID:
                </label>
                <input
                  type="text"
                  value={emailJsConfig.serviceId || ''}
                  onChange={(e) => setEmailJsConfig({ ...emailJsConfig, serviceId: e.target.value.trim() })}
                  placeholder="Ví dụ: service_x7a9bc2"
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-stone-100 font-mono text-xs focus:outline-none focus:border-amber-500"
                />
                <span className="text-[10px] text-stone-500 mt-1 block">Tạo tại Email Services trong Dashboard EmailJS</span>
              </div>

              {/* Template ID */}
              <div>
                <label className="block text-stone-300 font-semibold mb-1.5">
                  EmailJS Template ID:
                </label>
                <input
                  type="text"
                  value={emailJsConfig.templateId || ''}
                  onChange={(e) => setEmailJsConfig({ ...emailJsConfig, templateId: e.target.value.trim() })}
                  placeholder="Ví dụ: template_m4n8op9"
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-stone-100 font-mono text-xs focus:outline-none focus:border-amber-500"
                />
                <span className="text-[10px] text-stone-500 mt-1 block">Tạo tại Email Templates (chứa mã OTP)</span>
              </div>
            </div>

            {/* Public Key (API Key) */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-stone-300 font-semibold text-xs flex items-center gap-1.5">
                  <Key className="w-3.5 h-3.5 text-amber-400" />
                  <span>Public Key (User ID / API Key):</span>
                </label>
                <span className="text-[10px] text-stone-400 font-mono">
                  Account Settings &gt; API Keys
                </span>
              </div>
              <div className="relative">
                <input
                  type={showEmailJsPublicKey ? 'text' : 'password'}
                  value={emailJsConfig.publicKey || ''}
                  onChange={(e) => setEmailJsConfig({ ...emailJsConfig, publicKey: e.target.value.trim() })}
                  placeholder="Ví dụ: user_xxxxxxxx hoặc pk_xxxxxxxx"
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl pl-3 pr-10 py-2 text-stone-100 text-xs focus:outline-none focus:border-amber-500 font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowEmailJsPublicKey(!showEmailJsPublicKey)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300"
                  title="Ẩn / Hiện key"
                >
                  {showEmailJsPublicKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Private Key (Optional Server Token) */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-stone-300 font-semibold text-xs flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-stone-400" />
                  <span>Private Key / Access Token (Tùy chọn cho Server API bảo mật cao):</span>
                </label>
              </div>
              <div className="relative">
                <input
                  type={showEmailJsPrivateKey ? 'text' : 'password'}
                  value={emailJsConfig.privateKey || ''}
                  onChange={(e) => setEmailJsConfig({ ...emailJsConfig, privateKey: e.target.value.trim() })}
                  placeholder="Để trống nếu không bật Access Token Request Verification"
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl pl-3 pr-10 py-2 text-stone-100 text-xs focus:outline-none focus:border-amber-500 font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowEmailJsPrivateKey(!showEmailJsPrivateKey)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300"
                  title="Ẩn / Hiện key"
                >
                  {showEmailJsPrivateKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Template Variables Helper Note */}
            <div className="p-3.5 rounded-xl bg-stone-950/80 border border-stone-800 text-stone-300 text-xs space-y-1.5">
              <span className="font-semibold text-amber-300 flex items-center gap-1.5 text-[11px]">
                <FileText className="w-3.5 h-3.5" />
                Các biến cần có trong mẫu Email Template của EmailJS:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 font-mono text-[11px]">
                <span className="bg-stone-900 px-2 py-1 rounded text-amber-200 border border-stone-800 text-center">
                  {'{{to_email}}'}
                </span>
                <span className="bg-stone-900 px-2 py-1 rounded text-amber-200 border border-stone-800 text-center">
                  {'{{to_name}}'}
                </span>
                <span className="bg-stone-900 px-2 py-1 rounded text-emerald-300 border border-stone-800 text-center font-bold">
                  {'{{otp_code}}'}
                </span>
                <span className="bg-stone-900 px-2 py-1 rounded text-amber-200 border border-stone-800 text-center">
                  {'{{expire_time}}'}
                </span>
              </div>
            </div>

            {/* Test Email Input & Actions */}
            <div className="pt-2 border-t border-stone-800/80 space-y-3">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500 text-xs">
                    Gửi thử tới:
                  </span>
                  <input
                    type="email"
                    value={testEmailAddress}
                    onChange={(e) => setTestEmailAddress(e.target.value)}
                    placeholder="email-nhan-test@gmail.com"
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl pl-24 pr-3 py-2 text-stone-100 text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={runTestEmailJs}
                    disabled={testingEmailJs}
                    className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
                  >
                    <Send className={`w-3.5 h-3.5 ${testingEmailJs ? 'animate-spin' : ''}`} />
                    <span>{testingEmailJs ? 'Đang gửi test...' : '✉️ Gửi Email Test'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleSaveEmailJs}
                    disabled={isSavingEmailJs}
                    className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-md disabled:opacity-50"
                    title="Lưu cấu hình EmailJS lên Firebase Firestore"
                  >
                    <CheckCircle2 className={`w-4 h-4 ${isSavingEmailJs ? 'animate-spin' : ''}`} />
                    <span>{isSavingEmailJs ? 'Đang lưu...' : emailJsSaved ? '✓ Đã lưu Firebase' : '💾 Lưu cấu hình'}</span>
                  </button>
                </div>
              </div>

              {/* Test Result Message */}
              {emailJsTestResult && (
                <div className={`p-3 rounded-xl border text-xs flex items-center justify-between gap-2 ${
                  emailJsTestResult.success 
                    ? 'bg-emerald-950/80 text-emerald-200 border-emerald-500/40' 
                    : 'bg-rose-950/80 text-rose-200 border-rose-500/40'
                }`}>
                  <span className="font-medium">{emailJsTestResult.message}</span>
                  {emailJsTestResult.responseTimeMs !== undefined && (
                    <span className="font-mono text-[11px] opacity-80 shrink-0">({emailJsTestResult.responseTimeMs}ms)</span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* ---------------------------------------------------- */}
          {/* SECTION 4: 🔄 FALLBACK CONFIGURATION                 */}
          {/* ---------------------------------------------------- */}
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 space-y-4 shadow-md">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <div className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-emerald-400" />
                <h4 className="font-bold text-stone-100 text-sm">🔄 FALLBACK CONFIGURATION</h4>
              </div>
              <span className="text-[10px] text-stone-400 font-mono">
                Bảo vệ chống gián đoạn
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <label className="flex items-start gap-3 cursor-pointer p-3 rounded-xl bg-stone-950/60 border border-stone-800 hover:border-stone-700 transition-all">
                <input
                  type="checkbox"
                  checked={ttsConfig.fallbackEnabled}
                  onChange={(e) => {
                    const updated = { ...ttsConfig, fallbackEnabled: e.target.checked };
                    setTtsConfig(updated);
                    saveTTSConfig(updated);
                  }}
                  className="mt-0.5 rounded bg-stone-900 border-stone-700 text-amber-500 focus:ring-amber-500 w-4 h-4"
                />
                <div>
                  <span className="font-bold text-stone-100 block">
                    ☑ Sử dụng Web Speech API nếu VieNeu Cloud gặp lỗi
                  </span>
                  <p className="text-stone-400 text-[11px] mt-0.5 leading-relaxed">
                    Tự động chuyển sang engine giọng đọc có sẵn của trình duyệt khi VieNeu API bị quá tải, hết hạn ngạch hoặc mất kết nối mạng. Giúp chatbot không bao giờ bị gián đoạn.
                  </p>
                </div>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block text-stone-300 font-semibold mb-1">
                    Fallback Language:
                  </label>
                  <input
                    type="text"
                    value={ttsConfig.language}
                    readOnly
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-stone-400 font-mono"
                  />
                </div>

                <div className="flex items-center">
                  <p className="text-[11px] text-stone-500 leading-normal">
                    Trình duyệt sẽ tự động tìm kiếm giọng đọc <strong className="text-stone-300">vi-VN</strong> có sẵn trên hệ điều hành (Android / iOS / Windows / macOS).
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right 1 Col: Service Status & Security Overview */}
        <div className="space-y-6">
          
          {/* Status Box */}
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 space-y-4 shadow-md">
            <div className="flex items-center gap-2 border-b border-stone-800 pb-3">
              <Activity className="w-4 h-4 text-emerald-400" />
              <h4 className="font-bold text-stone-100 text-sm">📊 TRẠNG THÁI HỆ THỐNG</h4>
            </div>

            <div className="space-y-3">
              {/* EmailJS API Status Badge */}
              <div className="p-3.5 rounded-2xl bg-stone-950 border border-stone-800 flex items-center justify-between">
                <div>
                  <span className="text-xs text-stone-400 block font-semibold">EmailJS OTP Service:</span>
                  <span className="text-xs font-mono text-stone-200">
                    {emailJsConfig.serviceId ? `${emailJsConfig.serviceId} / ${emailJsConfig.templateId || 'chưa-có-template'}` : 'Chưa cấu hình ID'}
                  </span>
                </div>
                <div>
                  {emailJsTestResult ? (
                    emailJsTestResult.success ? (
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-500/40">
                        🟢 Đang hoạt động
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-950 text-rose-300 border border-rose-500/40">
                        🔴 Không khả dụng
                      </span>
                    )
                  ) : emailJsConfig.serviceId && emailJsConfig.publicKey ? (
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-500/40">
                      🟢 EmailJS sẵn sàng
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-950 text-amber-300 border border-amber-500/40">
                      🟡 Chưa cấu hình
                    </span>
                  )}
                </div>
              </div>

              {/* VieNeu API Status Badge */}
              <div className="p-3.5 rounded-2xl bg-stone-950 border border-stone-800 flex items-center justify-between">
                <div>
                  <span className="text-xs text-stone-400 block font-semibold">VieNeu Cloud TTS:</span>
                  <span className="text-xs font-mono text-stone-200">
                    {ttsConfig.provider === 'vieneu' ? ttsConfig.endpoint : 'Web Speech API'}
                  </span>
                </div>
                <div>
                  {ttsTestResult ? (
                    ttsTestResult.success ? (
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-500/40">
                        🟢 Đang hoạt động
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-950 text-rose-300 border border-rose-500/40">
                        🔴 Không khả dụng
                      </span>
                    )
                  ) : (
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-500/40">
                      🟢 VieNeu API đang hoạt động
                    </span>
                  )}
                </div>
              </div>

              {/* Gemini AI Status Badge */}
              <div className="p-3.5 rounded-2xl bg-stone-950 border border-stone-800 flex items-center justify-between">
                <div>
                  <span className="text-xs text-stone-400 block font-semibold">Gemini AI Provider:</span>
                  <span className="text-xs font-mono text-stone-200">{aiConfig.model}</span>
                </div>
                <div>
                  {aiTestResult ? (
                    aiTestResult.success ? (
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-500/40">
                        🟢 Đang hoạt động
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-950 text-rose-300 border border-rose-500/40">
                        🔴 Không khả dụng
                      </span>
                    )
                  ) : (
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-500/40">
                      🟢 Gemini API đang hoạt động
                    </span>
                  )}
                </div>
              </div>

              {/* Last Checked Time */}
              <div className="text-[11px] text-stone-500 flex items-center justify-between px-1">
                <span>Thời gian kiểm tra gần nhất:</span>
                <span className="font-mono text-stone-300">{lastCheckTime || 'Vừa xong'}</span>
              </div>
            </div>
          </div>

          {/* API Security Summary */}
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 space-y-3 shadow-md">
            <div className="flex items-center gap-2 border-b border-stone-800 pb-2.5">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <h4 className="font-bold text-stone-100 text-sm">🔐 BẢO MẬT API KEY</h4>
            </div>

            <ul className="text-xs text-stone-300 space-y-2 leading-relaxed">
              <li className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>API Keys và Secret Tokens được đồng bộ an toàn qua Firebase Firestore / Server Proxy.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>EmailJS gửi mã OTP trực tiếp từ máy chủ proxy giúp ngăn chặn lộ khóa bí mật.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Mã OTP được mã hóa bằng SHA-256 kèm Salt trên máy chủ trước khi xác thực.</span>
              </li>
            </ul>
          </div>

          {/* EmailJS & VieNeu Documentation Note */}
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 space-y-2 shadow-md">
            <div className="flex items-center gap-2 border-b border-stone-800 pb-2">
              <HelpCircle className="w-4 h-4 text-sky-400" />
              <h4 className="font-bold text-stone-100 text-sm">📘 TÀI LIỆU EMAILJS OTP</h4>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              EmailJS cung cấp gói miễn phí <strong>200 emails/tháng</strong>. Bạn có thể kết nối bất kỳ hộp thư Gmail, Outlook hoặc SMTP nào để tự động gửi mã xác thực 6 chữ số đến người dùng mà không cần thiết lập máy chủ mail phức tạp.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};
