import React, { useState, useEffect, useRef } from 'react';
import { 
  ShieldCheck, 
  Check, 
  X, 
  AlertTriangle, 
  Trash2, 
  CheckCircle2, 
  RefreshCw, 
  FileText, 
  Layers, 
  Database, 
  Cpu, 
  Users, 
  MapPin, 
  Info,
  Sliders,
  Lock,
  User,
  KeyRound,
  LogOut,
  History,
  Download,
  Search,
  Activity,
  Clock,
  CheckCircle,
  Plus,
  Edit,
  Utensils,
  ExternalLink,
  Star,
  Compass,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Edit3,
  Image as ImageIcon
} from 'lucide-react';
import { storageService } from '../services/storageService';
import { CommunityContribution, UserProfile, UserActivityLog, HeritageItem, PlaceItem, CityLandmarkBackground, RecognitionSectionConfig, TraditionalCraftVillage, TraditionalArtItem } from '../types';
import { HeritageEditModal } from './HeritageEditModal';
import { PlaceEditModal } from './PlaceEditModal';
import { LandmarkEditModal } from './LandmarkEditModal';
import { AITourGuideTrainer } from './AITourGuideTrainer';
import { AdminStoryEditModal } from './AdminStoryEditModal';
import { AdminAIDashboard } from './AdminAIDashboard';
import { AdminRecognitionModal } from './AdminRecognitionModal';

interface AdminDashboardProps {
  currentUser?: UserProfile;
  onUserChange?: (user: UserProfile) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  currentUser: propsUser,
  onUserChange
}) => {
  const [user, setUser] = useState<UserProfile>(propsUser || storageService.getCurrentUser());
  const [activeTab, setActiveTab] = useState<'audit_logs' | 'users' | 'pending' | 'heritages' | 'places' | 'landmarks' | 'ai_status' | 'tour_guide' | 'recognition'>('audit_logs');
  const [contributions, setContributions] = useState<CommunityContribution[]>([]);
  const [heritages, setHeritages] = useState<HeritageItem[]>(storageService.getHeritages());
  const [placesMap, setPlacesMap] = useState<Record<string, PlaceItem[]>>(storageService.getPlaces());
  const [crafts, setCrafts] = useState<TraditionalCraftVillage[]>(storageService.getCrafts());
  const [arts, setArts] = useState<TraditionalArtItem[]>(storageService.getArts());
  const [landmarks, setLandmarks] = useState<CityLandmarkBackground[]>(storageService.getLandmarkBackgrounds());
  const [recognitionConfig, setRecognitionConfig] = useState<RecognitionSectionConfig>(() => storageService.getRecognitionSectionConfig());
  const [accounts, setAccounts] = useState<UserProfile[]>([]);
  const [auditLogs, setAuditLogs] = useState<UserActivityLog[]>([]);

  // Modals for editing
  const [isHeritageModalOpen, setIsHeritageModalOpen] = useState(false);
  const [editingHeritage, setEditingHeritage] = useState<HeritageItem | null>(null);
  const [isPlaceModalOpen, setIsPlaceModalOpen] = useState(false);
  const [editingPlace, setEditingPlace] = useState<PlaceItem | null>(null);
  const [isLandmarkModalOpen, setIsLandmarkModalOpen] = useState(false);
  const [editingLandmark, setEditingLandmark] = useState<CityLandmarkBackground | null>(null);
  const [isRecognitionModalOpen, setIsRecognitionModalOpen] = useState(false);
  const [selectedHeritageForPlaces, setSelectedHeritageForPlaces] = useState<string>('all');

  // AI Custom Story Edit Modal State (Admin)
  const [isAdminStoryModalOpen, setIsAdminStoryModalOpen] = useState(false);
  const [storyEditHeritage, setStoryEditHeritage] = useState<HeritageItem | null>(null);

  // Tab Scrollbar & Range Slider ("Thanh Kéo Nav Tabs")
  const tabNavRef = useRef<HTMLDivElement>(null);
  const [tabScrollPercent, setTabScrollPercent] = useState<number>(0);

  const handleTabsScroll = () => {
    if (!tabNavRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = tabNavRef.current;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll <= 0) {
      setTabScrollPercent(0);
    } else {
      const pct = Math.round((scrollLeft / maxScroll) * 100);
      setTabScrollPercent(pct);
    }
  };

  const handleTabSliderChange = (pct: number) => {
    setTabScrollPercent(pct);
    if (!tabNavRef.current) return;
    const { scrollWidth, clientWidth } = tabNavRef.current;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll > 0) {
      tabNavRef.current.scrollLeft = (pct / 100) * maxScroll;
    }
  };

  const scrollTabs = (direction: 'left' | 'right') => {
    if (!tabNavRef.current) return;
    const offset = direction === 'left' ? -250 : 250;
    tabNavRef.current.scrollBy({ left: offset, behavior: 'smooth' });
  };

  // Search & Filter
  const [heritageSearchQuery, setHeritageSearchQuery] = useState('');
  const [placeSearchQuery, setPlaceSearchQuery] = useState('');
  const [landmarkSearchQuery, setLandmarkSearchQuery] = useState('');

  // Audit Logs filters
  const [actorFilter, setActorFilter] = useState<'all' | 'admin' | 'user'>('all');
  const [actionTypeFilter, setActionTypeFilter] = useState<string>('all');
  const [logSearchQuery, setLogSearchQuery] = useState('');
  
  // Users filters
  const [userSearchQuery, setUserSearchQuery] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  // Admin login form states
  const [adminUsername, setAdminUsername] = useState('admin');
  const [adminPassword, setAdminPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const refreshData = async () => {
    setContributions(storageService.getCommunityContributions());
    // Load local immediately
    setAccounts(storageService.getAccounts());
    setAuditLogs(storageService.getActivities());
    setHeritages(storageService.getHeritages());
    setPlacesMap(storageService.getPlaces());
    setCrafts(storageService.getCrafts());
    setArts(storageService.getArts());
    setLandmarks(storageService.getLandmarkBackgrounds());
    setRecognitionConfig(storageService.getRecognitionSectionConfig());

    // Fetch from central server database
    const serverAccountsList = await storageService.fetchAccounts();
    setAccounts(serverAccountsList);

    const serverLogsList = await storageService.fetchActivities();
    setAuditLogs(serverLogsList);

    const serverHeritagesList = await storageService.fetchHeritages();
    setHeritages(serverHeritagesList);

    const serverPlacesMap = await storageService.fetchPlaces();
    setPlacesMap(serverPlacesMap);
  };

  useEffect(() => {
    if (propsUser) {
      setUser(propsUser);
    }
  }, [propsUser]);

  useEffect(() => {
    refreshData();
  }, [activeTab]);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    const res = storageService.login(adminUsername, adminPassword);
    if (res.success && res.user) {
      setUser(res.user);
      if (onUserChange) onUserChange(res.user);
      refreshData();
    } else {
      setLoginError(res.error || 'Tên đăng nhập hoặc mật khẩu không đúng.');
    }
  };

  const handleAdminLogout = () => {
    const guest = storageService.logout();
    setUser(guest);
    if (onUserChange) onUserChange(guest);
  };

  const handleApprove = (id: string) => {
    storageService.updatePostStatus(id, 'verified');
    refreshData();
    setFeedbackMessage('Đã duyệt xuất bản bài viết thành công và ghi nhận vào nhật ký!');
    setTimeout(() => setFeedbackMessage(null), 3000);
  };

  const handleReject = (id: string) => {
    if (confirm('Bạn có chắc muốn từ chối bài đóng góp này?')) {
      storageService.updatePostStatus(id, 'rejected');
      refreshData();
      setFeedbackMessage('Đã từ chối bài đóng góp và lưu lại lịch sử thao tác.');
      setTimeout(() => setFeedbackMessage(null), 3000);
    }
  };

  const handleDeletePost = (id: string, postTitle: string) => {
    if (confirm(`Bạn có chắc chắn muốn xóa vĩnh viễn bài đăng "${postTitle}" khỏi hệ thống?`)) {
      storageService.deleteCommunityContribution(id);
      refreshData();
      setFeedbackMessage('Đã xóa bài đăng cộng đồng thành công!');
      setTimeout(() => setFeedbackMessage(null), 3000);
    }
  };

  const handleDeleteAccount = async (targetUserId: string, targetName: string) => {
    if (confirm(`Bạn có chắc chắn muốn xóa vĩnh viễn tài khoản "${targetName}" khỏi hệ thống web?`)) {
      const res = await storageService.deleteAccount(targetUserId);
      if (res.success) {
        refreshData();
        setFeedbackMessage(`Đã xóa tài khoản "${targetName}" và lưu vết thao tác.`);
        setTimeout(() => setFeedbackMessage(null), 3000);
      } else {
        alert(res.error || 'Không thể xóa tài khoản này.');
      }
    }
  };

  const handleClearAllLogs = () => {
    if (confirm('Bạn có chắc muốn xóa toàn bộ lịch sử nhật ký thao tác trên web? Thao tác này không thể hoàn tác.')) {
      storageService.clearActivities();
      storageService.logActivity({
        actionType: 'admin_action',
        title: 'Xóa toàn bộ nhật ký thao tác',
        description: `Quản trị viên (${user.displayName}) đã làm sạch toàn bộ kho nhật ký thao tác hệ thống.`
      });
      refreshData();
      setFeedbackMessage('Đã làm sạch nhật ký thao tác và ghi nhận thao tác quản trị.');
      setTimeout(() => setFeedbackMessage(null), 3000);
    }
  };

  const handleExportLogs = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(storageService.exportAuditLogs());
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `heritageai-nhat-ky-thao-tac-${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    storageService.logActivity({
      actionType: 'admin_action',
      title: 'Xuất tệp nhật ký thao tác',
      description: 'Quản trị viên đã tải xuống tệp sao lưu JSON chứa toàn bộ thao tác hệ thống'
    });
    refreshData();
  };

  const handleExportAccounts = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(storageService.exportAccounts());
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `heritageai-danh-sach-tai-khoan-${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    storageService.logActivity({
      actionType: 'admin_action',
      title: 'Xuất danh sách tài khoản',
      description: 'Quản trị viên đã tải xuống danh sách tài khoản đã đăng ký trên web'
    });
    refreshData();
  };

  // Pending items computation
  const pendingHeritages = heritages.filter(h => h.approvalStatus === 'pending');

  const pendingPlaces: { place: PlaceItem; heritageId: string }[] = [];
  Object.entries(placesMap).forEach(([hId, pList]) => {
    if (Array.isArray(pList)) {
      pList.forEach(p => {
        if (p.approvalStatus === 'pending') {
          pendingPlaces.push({ place: p, heritageId: hId });
        }
      });
    }
  });

  const pendingCrafts = crafts.filter(c => c.approvalStatus === 'pending');
  const pendingArts = arts.filter(a => a.approvalStatus === 'pending');
  const pendingContributions = contributions.filter(c => c.status === 'pending_review');

  const pendingCount = pendingHeritages.length + pendingPlaces.length + pendingCrafts.length + pendingArts.length + pendingContributions.length;
  const isAdmin = user.isLoggedIn && user.role === 'admin';

  // Specific Approval Handlers
  const handleApproveHeritage = (item: HeritageItem) => {
    storageService.updateHeritage({ ...item, approvalStatus: 'approved' });
    refreshData();
    setFeedbackMessage(`Đã duyệt & xuất bản di sản "${item.name}" thành công!`);
    setTimeout(() => setFeedbackMessage(null), 3000);
  };

  const handleRejectHeritage = (id: string, name: string) => {
    if (confirm(`Bạn có chắc muốn từ chối đề xuất di sản "${name}"?`)) {
      storageService.deleteHeritage(id);
      refreshData();
      setFeedbackMessage(`Đã từ chối đề xuất di sản "${name}".`);
      setTimeout(() => setFeedbackMessage(null), 3000);
    }
  };

  const handleApprovePlace = (heritageId: string, place: PlaceItem) => {
    storageService.updatePlace(heritageId, { ...place, approvalStatus: 'approved' });
    refreshData();
    setFeedbackMessage(`Đã duyệt & xuất bản địa điểm "${place.name}" thành công!`);
    setTimeout(() => setFeedbackMessage(null), 3000);
  };

  const handleRejectPlace = (heritageId: string, placeId: string, placeName: string) => {
    if (confirm(`Bạn có chắc muốn từ chối đề xuất địa điểm "${placeName}"?`)) {
      storageService.deletePlace(heritageId, placeId);
      refreshData();
      setFeedbackMessage(`Đã từ chối đề xuất địa điểm "${placeName}".`);
      setTimeout(() => setFeedbackMessage(null), 3000);
    }
  };

  const handleApproveCraft = (craft: TraditionalCraftVillage) => {
    storageService.updateCraftItem({ ...craft, approvalStatus: 'approved' });
    refreshData();
    setFeedbackMessage(`Đã duyệt & xuất bản làng nghề "${craft.name}" thành công!`);
    setTimeout(() => setFeedbackMessage(null), 3000);
  };

  const handleRejectCraft = (id: string, name: string) => {
    if (confirm(`Bạn có chắc muốn từ chối đề xuất làng nghề "${name}"?`)) {
      storageService.deleteCraftItem(id);
      refreshData();
      setFeedbackMessage(`Đã từ chối đề xuất làng nghề "${name}".`);
      setTimeout(() => setFeedbackMessage(null), 3000);
    }
  };

  const handleApproveArt = (art: TraditionalArtItem) => {
    storageService.updateArtItem({ ...art, approvalStatus: 'approved' });
    refreshData();
    setFeedbackMessage(`Đã duyệt & xuất bản nghệ thuật "${art.name}" thành công!`);
    setTimeout(() => setFeedbackMessage(null), 3000);
  };

  const handleRejectArt = (id: string, name: string) => {
    if (confirm(`Bạn có chắc muốn từ chối đề xuất nghệ thuật "${name}"?`)) {
      storageService.deleteArtItem(id);
      refreshData();
      setFeedbackMessage(`Đã từ chối đề xuất nghệ thuật "${name}".`);
      setTimeout(() => setFeedbackMessage(null), 3000);
    }
  };

  // Filtered Audit Logs
  const filteredLogs = auditLogs.filter(log => {
    if (actorFilter === 'admin') {
      const isLogAdmin = log.userRole === 'admin' || log.userId === 'user-admin' || log.actionType === 'admin_action';
      if (!isLogAdmin) return false;
    } else if (actorFilter === 'user') {
      const isLogAdmin = log.userRole === 'admin' || log.userId === 'user-admin' || log.actionType === 'admin_action';
      if (isLogAdmin) return false;
    }

    if (actionTypeFilter !== 'all' && log.actionType !== actionTypeFilter) {
      return false;
    }

    if (logSearchQuery.trim()) {
      const q = logSearchQuery.toLowerCase();
      const matchTitle = log.title?.toLowerCase().includes(q);
      const matchDesc = log.description?.toLowerCase().includes(q);
      const matchUser = log.userName?.toLowerCase().includes(q) || log.userEmail?.toLowerCase().includes(q);
      if (!matchTitle && !matchDesc && !matchUser) return false;
    }

    return true;
  });

  // Filtered Accounts
  const filteredAccounts = accounts.filter(acc => {
    if (!userSearchQuery.trim()) return true;
    const q = userSearchQuery.toLowerCase();
    return (
      acc.displayName.toLowerCase().includes(q) ||
      acc.email.toLowerCase().includes(q) ||
      acc.city.toLowerCase().includes(q) ||
      (acc.roleLabel && acc.roleLabel.toLowerCase().includes(q))
    );
  });

  // If not logged in as Admin, show Admin Login Gate
  if (!isAdmin) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 animate-fadeIn">
        <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-amber-600/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="text-center space-y-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-red-600 flex items-center justify-center text-stone-950 font-bold mx-auto shadow-lg shadow-amber-950/40">
              <ShieldCheck className="w-6 h-6 text-stone-950" />
            </div>
            <h2 className="text-xl font-serif font-bold text-stone-100">
              Khu Vực Quản Trị Hệ Thống
            </h2>
            <p className="text-xs text-stone-400">
              Dành riêng cho ban biên tập và kiểm định tri thức di sản Việt Nam.
            </p>
          </div>

          {loginError && (
            <div className="mb-4 p-3 bg-red-950/50 border border-red-500/30 rounded-xl text-red-300 text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1.5 uppercase tracking-wider">
                Tên đăng nhập
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-stone-500 absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  value={adminUsername}
                  onChange={(e) => setAdminUsername(e.target.value)}
                  placeholder="admin"
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl pl-10 pr-4 py-2.5 text-stone-100 text-xs sm:text-sm focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1.5 uppercase tracking-wider">
                Mật khẩu
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-stone-500 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl pl-10 pr-4 py-2.5 text-stone-100 text-xs sm:text-sm focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-bold text-xs sm:text-sm shadow-lg shadow-amber-950/40 transition-all flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Đăng Nhập Quản Trị</span>
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      
      {/* Feedback Toast */}
      {feedbackMessage && (
        <div className="mb-6 p-4 rounded-2xl bg-emerald-950/90 border border-emerald-500/50 text-emerald-200 text-xs flex items-center justify-between shadow-xl animate-in fade-in slide-in-from-top-3">
          <div className="flex items-center gap-2.5">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="font-semibold">{feedbackMessage}</span>
          </div>
          <button onClick={() => setFeedbackMessage(null)} className="text-emerald-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-stone-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 text-xs font-semibold mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Ban Biên Tập & Quản Trị Hệ Thống Web</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-100">
            Hệ Thống Quản Trị & Giám Sát Web
          </h2>
        </div>

        {/* Right Admin Controls */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs">
            <div className="bg-stone-900 border border-stone-800 px-3.5 py-2 rounded-xl text-center">
              <span className="text-stone-500 block text-[10px]">Tài khoản:</span>
              <span className="text-amber-400 font-bold text-base">{accounts.length}</span>
            </div>
            <div className="bg-stone-900 border border-stone-800 px-3.5 py-2 rounded-xl text-center">
              <span className="text-stone-500 block text-[10px]">Nhật ký:</span>
              <span className="text-emerald-400 font-bold text-base">{auditLogs.length}</span>
            </div>
          </div>

          <button
            onClick={refreshData}
            className="p-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-800 text-stone-300 transition-colors flex items-center gap-1.5 text-xs"
            title="Làm mới dữ liệu từ Web Storage"
          >
            <RefreshCw className="w-4 h-4" />
            <span className="hidden sm:inline">Làm mới</span>
          </button>

          <button
            onClick={handleAdminLogout}
            className="p-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-800 text-stone-400 hover:text-red-400 transition-colors flex items-center gap-1.5 text-xs"
            title="Đăng xuất khỏi tài khoản Quản trị"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Đăng xuất</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs with Draggable Slider Bar ("Thanh Kéo Nav Tabs") */}
      <div className="space-y-2 mb-6">
        <div className="relative group">
          {/* Left Scroll Arrow Button */}
          <button
            type="button"
            onClick={() => scrollTabs('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-2 rounded-r-xl bg-stone-950/90 border border-stone-800 text-amber-400 hover:text-amber-300 shadow-2xl backdrop-blur transition-all cursor-pointer hover:bg-stone-800"
            title="Cuộn các tab sang trái"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Scrollable Tabs Wrapper */}
          <div
            ref={tabNavRef}
            onScroll={handleTabsScroll}
            className="flex gap-2 border-b border-stone-800 pb-3 overflow-x-auto custom-scrollbar scroll-smooth px-8"
          >
            
            {/* TAB 1: AUDIT LOGS */}
            <button
              onClick={() => setActiveTab('audit_logs')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
                activeTab === 'audit_logs'
                  ? 'bg-amber-500 text-stone-950 shadow-md ring-1 ring-amber-400'
                  : 'bg-stone-900 text-stone-400 hover:text-stone-200 hover:bg-stone-800'
              }`}
            >
              <History className="w-3.5 h-3.5" />
              <span>Nhật Ký Thao Tác ({auditLogs.length})</span>
            </button>

            {/* TAB 2: WEB ACCOUNTS */}
            <button
              onClick={() => setActiveTab('users')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
                activeTab === 'users'
                  ? 'bg-amber-500 text-stone-950 shadow-md ring-1 ring-amber-400'
                  : 'bg-stone-900 text-stone-400 hover:text-stone-200 hover:bg-stone-800'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Tài Khoản Lưu Trên Web ({accounts.length})</span>
            </button>

            {/* TAB 3: PENDING CONTRIBUTIONS */}
            <button
              onClick={() => setActiveTab('pending')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
                activeTab === 'pending'
                  ? 'bg-amber-500 text-stone-950 shadow-md ring-1 ring-amber-400'
                  : 'bg-stone-900 text-stone-400 hover:text-stone-200 hover:bg-stone-800'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Kiểm Duyệt Đóng Góp ({pendingCount})</span>
            </button>

            {/* TAB 4: HERITAGES */}
            <button
              onClick={() => setActiveTab('heritages')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
                activeTab === 'heritages'
                  ? 'bg-amber-500 text-stone-950 shadow-md ring-1 ring-amber-400'
                  : 'bg-stone-900 text-stone-400 hover:text-stone-200 hover:bg-stone-800'
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              <span>Quản Lý Di Sản ({heritages.length})</span>
            </button>

            {/* TAB 5: PLACES */}
            <button
              onClick={() => setActiveTab('places')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
                activeTab === 'places'
                  ? 'bg-amber-500 text-stone-950 shadow-md ring-1 ring-amber-400'
                  : 'bg-stone-900 text-stone-400 hover:text-stone-200 hover:bg-stone-800'
              }`}
            >
              <Utensils className="w-3.5 h-3.5" />
              <span>Ẩm Thực & Trải Nghiệm Lân Cận</span>
            </button>

            {/* TAB 6: LANDMARK BACKGROUNDS */}
            <button
              onClick={() => setActiveTab('landmarks')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
                activeTab === 'landmarks'
                  ? 'bg-amber-500 text-stone-950 shadow-md ring-1 ring-amber-400'
                  : 'bg-stone-900 text-stone-400 hover:text-stone-200 hover:bg-stone-800'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ảnh Nền Danh Thắng ({landmarks.length})</span>
            </button>

            {/* TAB 7: AI & API CONFIGURATION */}
            <button
              onClick={() => setActiveTab('ai_status')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
                activeTab === 'ai_status'
                  ? 'bg-amber-500 text-stone-950 shadow-md ring-1 ring-amber-400'
                  : 'bg-stone-900 text-stone-400 hover:text-stone-200 hover:bg-stone-800'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>⚙️ Cài Đặt AI & API</span>
            </button>

            {/* TAB 8: AI TOUR GUIDE TRAINING */}
            <button
              onClick={() => setActiveTab('tour_guide')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
                activeTab === 'tour_guide'
                  ? 'bg-amber-500 text-stone-950 shadow-md ring-1 ring-amber-400'
                  : 'bg-stone-900 text-stone-400 hover:text-stone-200 hover:bg-stone-800'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Huấn Luyện Hướng Dẫn Viên AI</span>
            </button>

            {/* TAB 9: AI RECOGNITION SECTION CONFIG */}
            <button
              onClick={() => setActiveTab('recognition')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
                activeTab === 'recognition'
                  ? 'bg-amber-500 text-stone-950 shadow-md ring-1 ring-amber-400'
                  : 'bg-stone-900 text-stone-400 hover:text-stone-200 hover:bg-stone-800'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Ảnh & Mẫu Nhận Diện AI ({recognitionConfig.samples.length})</span>
            </button>
          </div>

          {/* Right Scroll Arrow Button */}
          <button
            type="button"
            onClick={() => scrollTabs('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-2 rounded-l-xl bg-stone-950/90 border border-stone-800 text-amber-400 hover:text-amber-300 shadow-2xl backdrop-blur transition-all cursor-pointer hover:bg-stone-800"
            title="Cuộn các tab sang phải"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Draggable Range Slider Bar ("Thanh Kéo Nav Tabs Admin") */}
        <div className="bg-stone-950/90 border border-stone-800/80 rounded-2xl p-2.5 px-4 flex items-center gap-3 text-xs text-stone-400 shadow-inner">
          <Sliders className="w-4 h-4 text-amber-400 shrink-0" />
          <span className="text-[11px] font-semibold text-amber-200 shrink-0 hidden sm:inline">
            Thanh Kéo Nav Tabs Admin:
          </span>
          <input
            type="range"
            min="0"
            max="100"
            value={tabScrollPercent}
            onChange={(e) => handleTabSliderChange(Number(e.target.value))}
            className="w-full h-2 bg-stone-800 accent-amber-500 rounded-lg cursor-pointer transition-all hover:bg-stone-700"
            title="Kéo thanh trượt để di chuyển giữa các thanh tab quản trị & giám sát web"
          />
          <span className="text-[10px] font-mono text-amber-300 font-bold shrink-0">
            {tabScrollPercent}%
          </span>
        </div>
      </div>

      {/* ==========================================
          TAB 1: AUDIT LOGS (LƯU TẤT CẢ THAO TÁC CỦA NGƯỜI DÙNG & ADMIN)
          ========================================== */}
      {activeTab === 'audit_logs' && (
        <div className="space-y-5 animate-fadeIn">
          
          {/* Controls Bar: Search, Filters & Export */}
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-4 space-y-4 shadow-lg">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h4 className="font-serif font-bold text-stone-100 text-base flex items-center gap-2">
                  <Activity className="w-4 h-4 text-amber-400" />
                  <span>Theo Dõi & Lưu Trữ Mọi Thao Tác Trên Web</span>
                </h4>
                <p className="text-xs text-stone-400 mt-0.5">
                  Lưu trữ tự động thao tác của cả người dùng thường và quản trị viên (Đăng nhập, tạo tài khoản, nhận diện AI, quiz, ký ức, duyệt bài...)
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleExportLogs}
                  className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs flex items-center gap-1.5 shadow transition-colors"
                  title="Tải toàn bộ nhật ký dưới dạng file JSON"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Xuất Nhật Ký (JSON)</span>
                </button>

                <button
                  onClick={handleClearAllLogs}
                  className="px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-red-950 hover:text-red-300 text-stone-400 text-xs font-semibold border border-stone-700 flex items-center gap-1.5 transition-colors"
                  title="Xóa sạch nhật ký trên web"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Xóa Nhật Ký</span>
                </button>
              </div>
            </div>

            {/* Filter controls row */}
            <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-stone-800 text-xs">
              
              {/* Search input */}
              <div className="relative flex-1 min-w-[200px]">
                <Search className="w-3.5 h-3.5 text-stone-500 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={logSearchQuery}
                  onChange={(e) => setLogSearchQuery(e.target.value)}
                  placeholder="Tìm theo tên người dùng, email hoặc tiêu đề thao tác..."
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl pl-9 pr-3 py-2 text-stone-100 text-xs focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Actor Filter */}
              <div className="flex items-center gap-1 bg-stone-950 border border-stone-800 p-1 rounded-xl">
                <button
                  onClick={() => setActorFilter('all')}
                  className={`px-3 py-1 rounded-lg font-semibold transition-colors ${
                    actorFilter === 'all' ? 'bg-amber-500/20 text-amber-300 font-bold' : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  Tất cả ({auditLogs.length})
                </button>
                <button
                  onClick={() => setActorFilter('admin')}
                  className={`px-3 py-1 rounded-lg font-semibold transition-colors ${
                    actorFilter === 'admin' ? 'bg-amber-600 text-stone-950 font-bold' : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  Quản trị viên ({auditLogs.filter(l => l.userRole === 'admin' || l.actionType === 'admin_action').length})
                </button>
                <button
                  onClick={() => setActorFilter('user')}
                  className={`px-3 py-1 rounded-lg font-semibold transition-colors ${
                    actorFilter === 'user' ? 'bg-emerald-600 text-stone-950 font-bold' : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  Người dùng ({auditLogs.filter(l => l.userRole !== 'admin' && l.actionType !== 'admin_action').length})
                </button>
              </div>

              {/* Action Type Dropdown */}
              <select
                value={actionTypeFilter}
                onChange={(e) => setActionTypeFilter(e.target.value)}
                className="bg-stone-950 border border-stone-800 text-stone-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-amber-500"
              >
                <option value="all">Mọi loại hành động</option>
                <option value="auth">Tài khoản & Xác thực (Đăng ký/Đăng nhập)</option>
                <option value="admin_action">Thao tác Quản trị viên</option>
                <option value="recognize">Nhận diện di sản AI</option>
                <option value="story">Kể chuyện di sản AI</option>
                <option value="chat">Hỏi đáp Trợ lý AI</option>
                <option value="quiz">Thử thách Quiz di sản</option>
                <option value="memory">Ký ức ông bà (Ghi âm)</option>
                <option value="itinerary">Lập & Lưu lịch trình</option>
                <option value="community">Đóng góp cộng đồng</option>
                <option value="favorite">Bộ sưu tập yêu thích</option>
                <option value="landmark">Đổi cảnh sắc danh thắng GPS</option>
              </select>

            </div>
          </div>

          {/* Logs Stream */}
          <div className="space-y-3">
            {filteredLogs.length === 0 ? (
              <div className="text-center py-12 bg-stone-900/60 border border-stone-800 rounded-2xl">
                <History className="w-10 h-10 text-stone-600 mx-auto mb-2 opacity-50" />
                <p className="text-stone-300 font-serif font-bold text-sm">Không tìm thấy thao tác nào phù hợp</p>
                <p className="text-stone-500 text-xs mt-1">Hãy thử thay đổi bộ lọc hoặc từ khóa tìm kiếm.</p>
              </div>
            ) : (
              filteredLogs.map((log) => {
                const isAdminAction = log.userRole === 'admin' || log.actionType === 'admin_action' || log.userId === 'user-admin';
                const formattedDate = new Date(log.timestamp).toLocaleString('vi-VN', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit'
                });

                return (
                  <div
                    key={log.id}
                    className={`border rounded-2xl p-4 shadow-sm transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3.5 ${
                      isAdminAction
                        ? 'bg-amber-950/20 border-amber-500/30'
                        : 'bg-stone-900 border-stone-800'
                    }`}
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                        isAdminAction 
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' 
                          : 'bg-stone-950 text-stone-300 border border-stone-800'
                      }`}>
                        {isAdminAction ? <ShieldCheck className="w-4 h-4 text-amber-400" /> : <Activity className="w-4 h-4 text-emerald-400" />}
                      </div>

                      <div className="space-y-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                            isAdminAction
                              ? 'bg-amber-500 text-stone-950'
                              : 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                          }`}>
                            {isAdminAction ? 'Quản Trị Viên' : 'Người Dùng'}
                          </span>

                          <span className="text-xs font-bold text-stone-200">
                            {log.userName || (isAdminAction ? 'Quản trị viên Hệ thống' : 'Người dùng')}
                          </span>

                          {log.userEmail && (
                            <span className="text-[11px] text-stone-400 hidden sm:inline">
                              ({log.userEmail})
                            </span>
                          )}

                          <span className="text-[10px] px-2 py-0.5 rounded bg-stone-950 text-stone-400 border border-stone-800">
                            Loại: {log.actionType}
                          </span>
                        </div>

                        <h5 className="font-serif font-bold text-stone-100 text-sm">
                          {log.title}
                        </h5>
                        <p className="text-xs text-stone-300 leading-relaxed font-sans">
                          {log.description}
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0 self-end sm:self-center">
                      <div className="flex items-center gap-1.5 text-[11px] text-stone-400">
                        <Clock className="w-3 h-3 text-stone-500" />
                        <span>{formattedDate}</span>
                      </div>
                      {log.pointsEarned && (
                        <span className="inline-block mt-1 text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                          +{log.pointsEarned} XP
                        </span>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>

        </div>
      )}

      {/* ==========================================
          TAB 2: REGISTERED ACCOUNTS (LƯU TÀI KHOẢN TRÊN WEB)
          ========================================== */}
      {activeTab === 'users' && (
        <div className="space-y-5 animate-fadeIn">
          
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-4 space-y-4 shadow-lg">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h4 className="font-serif font-bold text-stone-100 text-base flex items-center gap-2">
                  <Users className="w-4 h-4 text-amber-400" />
                  <span>Danh Sách Tài Khoản Đã Tạo & Lưu Trữ Trên Web</span>
                </h4>
                <p className="text-xs text-stone-400 mt-0.5">
                  Tất cả tài khoản đăng ký mới được lưu trữ cố định trên hệ thống web (Web Storage) và sẵn sàng sử dụng lâu dài
                </p>
              </div>

              <button
                onClick={handleExportAccounts}
                className="px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs flex items-center gap-1.5 shadow transition-colors"
                title="Tải danh sách tài khoản JSON"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Xuất Danh Sách Tài Khoản</span>
              </button>
            </div>

            {/* User Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-stone-500 absolute left-3 top-3" />
              <input
                type="text"
                value={userSearchQuery}
                onChange={(e) => setUserSearchQuery(e.target.value)}
                placeholder="Tìm tài khoản theo tên, email, thành phố hoặc vai trò..."
                className="w-full bg-stone-950 border border-stone-800 rounded-xl pl-9 pr-3.5 py-2 text-stone-100 text-xs focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Accounts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredAccounts.map((acc) => {
              const isRootAdmin = acc.id === 'user-admin' || acc.email === 'admin@heritageai.vn';
              const createdDate = new Date(acc.createdAt).toLocaleDateString('vi-VN');
              const lastLogin = acc.lastLoginAt 
                ? new Date(acc.lastLoginAt).toLocaleString('vi-VN', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' }) 
                : 'Chưa có dữ liệu';

              return (
                <div
                  key={acc.id}
                  className={`bg-stone-900 border rounded-2xl p-5 shadow-lg flex flex-col justify-between gap-4 transition-all ${
                    isRootAdmin ? 'border-amber-500/40 bg-gradient-to-br from-amber-950/20 via-stone-900 to-stone-900' : 'border-stone-800'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={acc.avatarUrl || `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(acc.email)}`}
                          alt={acc.displayName}
                          className="w-12 h-12 rounded-xl object-cover border border-amber-500/30 shrink-0"
                        />
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <h5 className="font-serif font-bold text-stone-100 text-sm truncate">
                              {acc.displayName}
                            </h5>
                            {isRootAdmin && (
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500 text-stone-950 font-bold">
                                Root Admin
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-stone-400 truncate">{acc.email}</p>
                          <p className="text-[11px] text-amber-300/90">{acc.roleLabel || acc.role}</p>
                        </div>
                      </div>

                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold shrink-0 ${
                        acc.isLoggedIn ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-stone-800 text-stone-400'
                      }`}>
                        {acc.isLoggedIn ? '● Đang online' : '○ Ngoại tuyến'}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[11px] bg-stone-950 p-2.5 rounded-xl border border-stone-800/80">
                      <div>
                        <span className="text-stone-500 block">Thành phố:</span>
                        <span className="text-stone-300 font-medium">{acc.city || 'Việt Nam'}</span>
                      </div>
                      <div>
                        <span className="text-stone-500 block">Điểm văn hóa (XP):</span>
                        <span className="text-amber-400 font-bold">{acc.points || 0} XP ({acc.level || 'Cấp 1'})</span>
                      </div>
                      <div>
                        <span className="text-stone-500 block">Ngày tạo tài khoản:</span>
                        <span className="text-stone-300 font-medium">{createdDate}</span>
                      </div>
                      <div>
                        <span className="text-stone-500 block">Lần đăng nhập cuối:</span>
                        <span className="text-stone-300 font-medium">{lastLogin}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-stone-800 flex items-center justify-between text-xs">
                    <span className="text-stone-500 text-[11px]">ID: {acc.id}</span>

                    {!isRootAdmin && (
                      <button
                        onClick={() => handleDeleteAccount(acc.id, acc.displayName)}
                        className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-red-950 text-stone-400 hover:text-red-300 border border-stone-700 text-xs flex items-center gap-1.5 transition-colors"
                        title="Xóa tài khoản này khỏi web"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Xóa tài khoản</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* ==========================================
          TAB 3: PENDING APPROVAL QUEUE (HERITAGES, PLACES, CRAFTS, ARTS, COMMUNITY)
          ========================================== */}
      {activeTab === 'pending' && (
        <div className="space-y-6 animate-fadeIn">
          
          {pendingCount === 0 ? (
            <div className="bg-stone-900 border border-stone-800 rounded-3xl p-12 text-center shadow-xl">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3 opacity-80" />
              <h3 className="font-serif font-bold text-lg text-stone-100">Hàng Đợi Kiểm Duyệt Trống</h3>
              <p className="text-xs text-stone-400 mt-1 max-w-md mx-auto">
                Hiện không có đề xuất địa điểm, làng nghề, nghệ thuật hoặc bài viết nào đang chờ duyệt. Tất cả dữ liệu công khai trên website đều đạt chuẩn.
              </p>
            </div>
          ) : (
            <div className="space-y-4">

              {/* 1. Pending Heritages */}
              {pendingHeritages.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5 px-1">
                    <span>🏛 Di Sản Mới Đề Xuất ({pendingHeritages.length})</span>
                  </h4>
                  {pendingHeritages.map((item) => (
                    <div
                      key={item.id}
                      className="bg-stone-900 border border-amber-500/30 rounded-2xl p-4 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      <div className="flex items-start gap-3 max-w-2xl">
                        <img 
                          src={item.imageUrl} 
                          alt={item.name} 
                          className="w-16 h-16 rounded-xl object-cover shrink-0 border border-stone-700" 
                        />
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-semibold">
                              {item.province}
                            </span>
                            <span className="text-xs text-stone-400">{item.categoryLabel}</span>
                          </div>
                          <h5 className="font-serif font-bold text-stone-100 text-base">{item.name}</h5>
                          <p className="text-xs text-stone-300 line-clamp-2">{item.history || item.overview}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => {
                            setEditingHeritage(item);
                            setIsHeritageModalOpen(true);
                          }}
                          className="px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center gap-1.5 shadow"
                          title="Sửa thông tin di sản đề xuất"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Sửa</span>
                        </button>
                        <button
                          onClick={() => handleApproveHeritage(item)}
                          className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-stone-950 font-bold text-xs flex items-center gap-1.5 shadow"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Duyệt & Đăng</span>
                        </button>
                        <button
                          onClick={() => handleRejectHeritage(item.id, item.name)}
                          className="px-3 py-2 rounded-xl bg-stone-800 hover:bg-red-950 hover:text-red-400 text-stone-400 text-xs font-medium border border-stone-700"
                        >
                          <X className="w-3.5 h-3.5" />
                          <span>Từ chối</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* 2. Pending Places */}
              {pendingPlaces.length > 0 && (
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5 px-1">
                    <span>🍜 Địa Điểm Ăn Uống, Nghỉ Ngơi & Giải Trí Đề Xuất ({pendingPlaces.length})</span>
                  </h4>
                  {pendingPlaces.map(({ place, heritageId }) => (
                    <div
                      key={place.id}
                      className="bg-stone-900 border border-amber-500/30 rounded-2xl p-4 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      <div className="flex items-start gap-3 max-w-2xl">
                        <img 
                          src={place.photoUrl} 
                          alt={place.name} 
                          className="w-16 h-16 rounded-xl object-cover shrink-0 border border-stone-700" 
                        />
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-semibold">
                              {place.categoryLabel}
                            </span>
                            <span className="text-xs text-stone-400">{place.address}</span>
                          </div>
                          <h5 className="font-serif font-bold text-stone-100 text-base">{place.name}</h5>
                          {place.specialties && place.specialties.length > 0 && (
                            <p className="text-xs text-stone-300">Đặc sản: {place.specialties.join(', ')}</p>
                          )}
                        </div>
                      </div>

                       <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => {
                            setEditingPlace(place);
                            setSelectedHeritageForPlaces(heritageId);
                            setIsPlaceModalOpen(true);
                          }}
                          className="px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center gap-1.5 shadow"
                          title="Sửa thông tin địa điểm đề xuất"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Sửa</span>
                        </button>
                        <button
                          onClick={() => handleApprovePlace(heritageId, place)}
                          className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-stone-950 font-bold text-xs flex items-center gap-1.5 shadow"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Duyệt & Đăng</span>
                        </button>
                        <button
                          onClick={() => handleRejectPlace(heritageId, place.id, place.name)}
                          className="px-3 py-2 rounded-xl bg-stone-800 hover:bg-red-950 hover:text-red-400 text-stone-400 text-xs font-medium border border-stone-700"
                        >
                          <X className="w-3.5 h-3.5" />
                          <span>Từ chối</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* 3. Pending Crafts */}
              {pendingCrafts.length > 0 && (
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5 px-1">
                    <span>🏺 Làng Nghề Thủ Công Đề Xuất ({pendingCrafts.length})</span>
                  </h4>
                  {pendingCrafts.map((craft) => (
                    <div
                      key={craft.id}
                      className="bg-stone-900 border border-amber-500/30 rounded-2xl p-4 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      <div className="flex items-start gap-3 max-w-2xl">
                        <img 
                          src={craft.imageUrl} 
                          alt={craft.name} 
                          className="w-16 h-16 rounded-xl object-cover shrink-0 border border-stone-700" 
                        />
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-semibold">
                              {craft.province}
                            </span>
                            <span className="text-xs text-stone-400">{craft.craftType}</span>
                          </div>
                          <h5 className="font-serif font-bold text-stone-100 text-base">{craft.name}</h5>
                          <p className="text-xs text-stone-300 line-clamp-2">{craft.history}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => handleApproveCraft(craft)}
                          className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-stone-950 font-bold text-xs flex items-center gap-1.5 shadow"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Duyệt & Đăng</span>
                        </button>
                        <button
                          onClick={() => handleRejectCraft(craft.id, craft.name)}
                          className="px-3 py-2 rounded-xl bg-stone-800 hover:bg-red-950 hover:text-red-400 text-stone-400 text-xs font-medium border border-stone-700"
                        >
                          <X className="w-3.5 h-3.5" />
                          <span>Từ chối</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* 4. Pending Arts */}
              {pendingArts.length > 0 && (
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5 px-1">
                    <span>🎶 Nghệ Thuật Cổ Truyền Đề Xuất ({pendingArts.length})</span>
                  </h4>
                  {pendingArts.map((art) => (
                    <div
                      key={art.id}
                      className="bg-stone-900 border border-amber-500/30 rounded-2xl p-4 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      <div className="flex items-start gap-3 max-w-2xl">
                        <img 
                          src={art.imageUrl} 
                          alt={art.name} 
                          className="w-16 h-16 rounded-xl object-cover shrink-0 border border-stone-700" 
                        />
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-semibold">
                              {art.artTypeLabel}
                            </span>
                            <span className="text-xs text-stone-400">{art.originRegion}</span>
                          </div>
                          <h5 className="font-serif font-bold text-stone-100 text-base">{art.name}</h5>
                          <p className="text-xs text-stone-300 line-clamp-2">{art.description}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => handleApproveArt(art)}
                          className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-stone-950 font-bold text-xs flex items-center gap-1.5 shadow"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Duyệt & Đăng</span>
                        </button>
                        <button
                          onClick={() => handleRejectArt(art.id, art.name)}
                          className="px-3 py-2 rounded-xl bg-stone-800 hover:bg-red-950 hover:text-red-400 text-stone-400 text-xs font-medium border border-stone-700"
                        >
                          <X className="w-3.5 h-3.5" />
                          <span>Từ chối</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* 5. Pending Community Contributions */}
              {pendingContributions.length > 0 && (
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5 px-1">
                    <span>✍️ Bài Đóng Góp Cộng Đồng ({pendingContributions.length})</span>
                  </h4>
                  {pendingContributions.map((item) => (
                    <div
                      key={item.id}
                      className="bg-stone-900 border border-stone-800 rounded-2xl p-5 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      <div className="space-y-1.5 max-w-2xl">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-semibold">
                            {item.location}
                          </span>
                          <span className="text-xs text-stone-400">
                            Bởi: <strong>{item.contributorName || item.authorName}</strong> ({new Date(item.createdAt || item.submittedAt || Date.now()).toLocaleDateString('vi-VN')})
                          </span>
                        </div>
                        <h5 className="font-serif font-bold text-stone-100 text-base">{item.title}</h5>
                        <p className="text-xs text-stone-300 leading-relaxed font-serif line-clamp-2">{item.content}</p>
                        {item.sourceReference && (
                          <p className="text-[11px] text-stone-500 italic">Nguồn: {item.sourceReference}</p>
                        )}
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => handleApprove(item.id)}
                          className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-stone-950 font-bold text-xs flex items-center gap-1.5 shadow"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Duyệt & Đăng</span>
                        </button>

                        <button
                          onClick={() => handleReject(item.id)}
                          className="px-3 py-2 rounded-xl bg-stone-800 hover:bg-red-950 hover:text-red-400 text-stone-400 text-xs font-medium border border-stone-700"
                        >
                          <X className="w-3.5 h-3.5" />
                          <span>Từ chối</span>
                        </button>

                        <button
                          onClick={() => handleDeletePost(item.id, item.title)}
                          className="px-3 py-2 rounded-xl bg-red-950/80 hover:bg-red-600 text-red-200 hover:text-white border border-red-500/40 text-xs font-bold flex items-center gap-1 shadow transition-all"
                          title="Xóa bài đăng vĩnh viễn"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Xóa</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

            </div>
          )}

        </div>
      )}

      {/* ==========================================
          TAB 4: HERITAGE MASTER DATABASE (ADMIN CRUD)
          ========================================== */}
      {activeTab === 'heritages' && (
        <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 shadow-2xl space-y-6 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-4">
            <div>
              <h4 className="font-serif font-bold text-stone-100 text-lg flex items-center gap-2">
                <Database className="w-5 h-5 text-amber-400" />
                <span>Quản Lý Nội Dung Di Sản & Di Tích</span>
              </h4>
              <p className="text-xs text-stone-400 mt-1">
                Admin có quyền thêm, sửa nội dung chi tiết, giá vé, hình ảnh, tọa độ GPS hoặc xóa di sản. Dữ liệu tự động đồng bộ trên máy chủ và cập nhật tức thì trên toàn ứng dụng.
              </p>
            </div>

            <div className="flex items-center gap-2.5 shrink-0">
              <button
                onClick={() => {
                  setEditingHeritage(null);
                  setIsHeritageModalOpen(true);
                }}
                className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center gap-1.5 shadow transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Thêm Di Sản Mới</span>
              </button>

              <button
                onClick={async () => {
                  if (window.confirm('Bạn có chắc chắn muốn khôi phục toàn bộ danh sách di sản về trạng thái chuẩn hóa ban đầu?')) {
                    await storageService.resetHeritages();
                    refreshData();
                  }
                }}
                className="px-3 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold border border-stone-700 flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Khôi phục dữ liệu di sản gốc"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Khôi Phục Gốc</span>
              </button>
            </div>
          </div>

          {/* Search bar */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={heritageSearchQuery}
              onChange={(e) => setHeritageSearchQuery(e.target.value)}
              placeholder="Tìm kiếm di sản theo tên, tỉnh thành hoặc triều đại..."
              className="w-full pl-10 pr-4 py-2.5 bg-stone-950 border border-stone-800 rounded-xl text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Heritage Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {heritages
              .filter(h => {
                const q = heritageSearchQuery.toLowerCase().trim();
                if (!q) return true;
                return (
                  h.name.toLowerCase().includes(q) ||
                  h.province.toLowerCase().includes(q) ||
                  (h.period && h.period.toLowerCase().includes(q))
                );
              })
              .map((h) => (
                <div
                  key={h.id}
                  className="bg-stone-950/80 border border-stone-800 hover:border-stone-700 rounded-2xl p-4 shadow flex flex-col justify-between gap-3 group transition-all"
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={h.imageUrl}
                      alt={h.name}
                      className="w-20 h-20 rounded-xl object-cover border border-stone-800 shrink-0"
                    />
                    <div className="min-w-0 flex-1 space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 font-semibold border border-amber-500/20">
                          {h.categoryLabel || h.category}
                        </span>
                        <span className="text-[10px] text-stone-400">
                          {h.region === 'north' ? 'Miền Bắc' : h.region === 'central' ? 'Miền Trung' : 'Miền Nam'}
                        </span>
                      </div>

                      <h5 className="font-serif font-bold text-stone-100 text-sm truncate group-hover:text-amber-300 transition-colors">
                        {h.name}
                      </h5>

                      <p className="text-xs text-stone-400 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-red-400 shrink-0" />
                        <span className="truncate">{h.province}</span>
                        {h.period && <span className="truncate">• {h.period}</span>}
                      </p>

                      <p className="text-[11px] text-stone-500 line-clamp-1">
                        {h.visitingHours} | {h.ticketPrice}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-stone-800 flex items-center justify-between text-xs">
                    <span className="text-[10px] text-stone-500 truncate">ID: {h.id}</span>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => {
                          setStoryEditHeritage(h);
                          setIsAdminStoryModalOpen(true);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500 text-amber-300 hover:text-stone-950 border border-amber-500/30 font-bold text-[11px] flex items-center gap-1 transition-colors cursor-pointer"
                        title="Biên tập câu chuyện AI cho di sản này"
                      >
                        <Sparkles className="w-3 h-3 text-amber-400" />
                        <span>Kể Chuyện AI</span>
                      </button>

                      <button
                        onClick={() => {
                          setEditingHeritage(h);
                          setIsHeritageModalOpen(true);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-stone-950 font-bold text-[11px] flex items-center gap-1 transition-colors cursor-pointer"
                        title="Chỉnh sửa thông tin di sản"
                      >
                        <Edit className="w-3 h-3" />
                        <span>Sửa</span>
                      </button>

                      <button
                        onClick={async () => {
                          if (window.confirm(`Bạn có chắc muốn xóa di sản "${h.name}" khỏi hệ thống?`)) {
                            await storageService.deleteHeritage(h.id);
                            refreshData();
                          }
                        }}
                        className="px-2.5 py-1 rounded-lg bg-stone-900 hover:bg-red-950 text-stone-400 hover:text-red-300 border border-stone-800 text-[11px] flex items-center gap-1 transition-colors cursor-pointer"
                        title="Xóa di sản"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Xóa</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* ==========================================
          TAB 5: PLACES & CUISINE MASTER DATABASE (ADMIN CRUD)
          ========================================== */}
      {activeTab === 'places' && (
        <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 shadow-2xl space-y-6 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-4">
            <div>
              <h4 className="font-serif font-bold text-stone-100 text-lg flex items-center gap-2">
                <Utensils className="w-5 h-5 text-amber-400" />
                <span>Quản Lý Ẩm Thực & Trải Nghiệm Lân Cận</span>
              </h4>
              <p className="text-xs text-stone-400 mt-1">
                Admin có quyền thêm mới, chỉnh sửa thông tin quán ăn, đặc sản, đánh giá sao, địa chỉ và đường dẫn Google Maps cho từng di tích.
              </p>
            </div>

            <div className="flex items-center gap-2.5 shrink-0">
              <button
                onClick={() => {
                  setEditingPlace(null);
                  setIsPlaceModalOpen(true);
                }}
                className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center gap-1.5 shadow transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Thêm Địa Điểm Mới</span>
              </button>

              <button
                onClick={async () => {
                  if (window.confirm('Bạn có chắc muốn khôi phục toàn bộ danh sách ẩm thực lân cận về dữ liệu chuẩn ban đầu?')) {
                    await storageService.resetPlaces();
                    refreshData();
                  }
                }}
                className="px-3 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold border border-stone-700 flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Khôi phục danh sách ẩm thực gốc"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Khôi Phục Gốc</span>
              </button>
            </div>
          </div>

          {/* Controls: Heritage Filter & Search Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] text-stone-400 block mb-1 font-medium">
                Chọn di tích để lọc địa điểm lân cận:
              </label>
              <select
                value={selectedHeritageForPlaces}
                onChange={(e) => setSelectedHeritageForPlaces(e.target.value)}
                className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2.5 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
              >
                <option value="all">-- Tất Cả Các Điểm Di Tích --</option>
                {heritages.map(h => (
                  <option key={h.id} value={h.id}>
                    {h.name} ({h.province})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[11px] text-stone-400 block mb-1 font-medium">
                Tìm kiếm theo tên quán hoặc món ăn:
              </label>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="text"
                  value={placeSearchQuery}
                  onChange={(e) => setPlaceSearchQuery(e.target.value)}
                  placeholder="Nhập tên quán hoặc món đặc sản..."
                  className="w-full pl-10 pr-4 py-2.5 bg-stone-950 border border-stone-800 rounded-xl text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>
          </div>

          {/* Places Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {(() => {
              // Flatten all places with their heritageId
              const allFlattenedPlaces: { place: PlaceItem; heritageId: string }[] = [];
              Object.entries(placesMap).forEach(([hId, list]) => {
                if (selectedHeritageForPlaces === 'all' || selectedHeritageForPlaces === hId) {
                  (list || []).forEach(p => {
                    allFlattenedPlaces.push({ place: p, heritageId: hId });
                  });
                }
              });

              const filtered = allFlattenedPlaces.filter(({ place }) => {
                const q = placeSearchQuery.toLowerCase().trim();
                if (!q) return true;
                const matchName = place.name.toLowerCase().includes(q);
                const matchSpec = place.specialties?.some(s => s.toLowerCase().includes(q));
                const matchAddress = place.address?.toLowerCase().includes(q);
                return matchName || matchSpec || matchAddress;
              });

              if (filtered.length === 0) {
                return (
                  <div className="col-span-full py-12 text-center text-stone-500">
                    <Utensils className="w-8 h-8 mx-auto mb-2 opacity-40" />
                    <p className="text-sm">Không tìm thấy địa điểm nào phù hợp bộ lọc</p>
                  </div>
                );
              }

              return filtered.map(({ place, heritageId }) => {
                const heritageInfo = heritages.find(h => h.id === heritageId);

                return (
                  <div
                    key={`${heritageId}-${place.id}`}
                    className="bg-stone-950/80 border border-stone-800 hover:border-amber-500/40 rounded-2xl overflow-hidden shadow flex flex-col justify-between group transition-all"
                  >
                    <div>
                      <div className="relative h-36 w-full overflow-hidden bg-stone-900">
                        <img
                          src={place.photoUrl}
                          alt={place.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-stone-950/80 text-amber-300 text-[10px] font-semibold border border-stone-700 backdrop-blur">
                          {place.categoryLabel || place.category}
                        </div>
                        <div className="absolute top-2.5 right-2.5 flex items-center gap-1 bg-amber-500 text-stone-950 text-xs px-2 py-0.5 rounded-full font-bold">
                          <Star className="w-3 h-3 fill-stone-950" />
                          <span>{place.rating}</span>
                        </div>
                      </div>

                      <div className="p-3.5 space-y-2">
                        <div className="text-[10px] text-stone-500 truncate flex items-center gap-1">
                          <Compass className="w-3 h-3 text-amber-400 shrink-0" />
                          <span>Gần: {heritageInfo?.name || heritageId}</span>
                        </div>

                        <h5 className="font-bold text-stone-100 text-sm group-hover:text-amber-300 transition-colors line-clamp-1">
                          {place.name}
                        </h5>

                        <p className="text-[11px] text-stone-400 line-clamp-1 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-red-400 shrink-0" />
                          <span className="truncate">{place.address}</span>
                        </p>

                        {place.specialties && place.specialties.length > 0 && (
                          <div className="flex flex-wrap gap-1 pt-1">
                            {place.specialties.slice(0, 3).map((spec, i) => (
                              <span
                                key={i}
                                className="px-1.5 py-0.5 rounded bg-stone-900 border border-stone-800 text-[10px] text-stone-300"
                              >
                                {spec}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="p-3.5 pt-2 border-t border-stone-800/80 flex items-center justify-between text-xs">
                      {place.googleMapsUri ? (
                        <a
                          href={place.googleMapsUri}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-semibold"
                        >
                          <ExternalLink className="w-3 h-3" />
                          <span>Maps</span>
                        </a>
                      ) : (
                        <span className="text-[10px] text-stone-600">No Maps URL</span>
                      )}

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => {
                            setEditingPlace(place);
                            setIsPlaceModalOpen(true);
                          }}
                          className="px-2 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-stone-950 font-bold text-[11px] flex items-center gap-1 transition-colors cursor-pointer"
                          title="Chỉnh sửa thông tin địa điểm"
                        >
                          <Edit className="w-3 h-3" />
                          <span>Sửa</span>
                        </button>

                        <button
                          onClick={async () => {
                            if (window.confirm(`Bạn có chắc muốn xóa địa điểm "${place.name}" khỏi danh sách?`)) {
                              await storageService.deletePlace(heritageId, place.id);
                              refreshData();
                            }
                          }}
                          className="px-2 py-1 rounded-lg bg-stone-900 hover:bg-red-950 text-stone-400 hover:text-red-300 border border-stone-800 text-[11px] flex items-center gap-1 transition-colors cursor-pointer"
                          title="Xóa địa điểm"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Xóa</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              });
            })()}
          </div>
        </div>
      )}

      {/* ==========================================
          TAB 6: LANDMARK BACKGROUNDS MANAGEMENT
          ========================================== */}
      {activeTab === 'landmarks' && (
        <div className="space-y-5 animate-fadeIn">
          {/* Header & Controls Bar */}
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-4 space-y-4 shadow-lg">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h4 className="font-serif font-bold text-stone-100 text-base flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Quản Lý Ảnh Nền Danh Thắng Tỉnh Thành</span>
                </h4>
                <p className="text-xs text-stone-400 mt-0.5">
                  Thay đổi hình ảnh, tên thành phố, khẩu hiệu và tọa độ GPS để khớp với giao diện toàn trang web
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm('Khôi phục danh sách ảnh nền danh thắng về mặc định ban đầu?')) {
                      storageService.resetLandmarkBackgrounds();
                      refreshData();
                    }
                  }}
                  className="px-3 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-stone-400" />
                  <span>Khôi phục mặc định</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setEditingLandmark(null);
                    setIsLandmarkModalOpen(true);
                  }}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-stone-950 font-bold text-xs flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Thêm Danh Thắng Mới</span>
                </button>
              </div>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Tìm kiếm theo tên tỉnh thành, danh thắng hoặc khẩu hiệu..."
                value={landmarkSearchQuery}
                onChange={(e) => setLandmarkSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-stone-950 border border-stone-800 text-stone-100 text-xs focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>
          </div>

          {/* Landmarks Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {(() => {
              const filtered = landmarks.filter(item => 
                !landmarkSearchQuery.trim() ||
                item.cityName.toLowerCase().includes(landmarkSearchQuery.toLowerCase()) ||
                item.landmarkName.toLowerCase().includes(landmarkSearchQuery.toLowerCase()) ||
                item.tagline.toLowerCase().includes(landmarkSearchQuery.toLowerCase())
              );

              if (filtered.length === 0) {
                return (
                  <div className="col-span-full py-12 text-center bg-stone-900 border border-stone-800 rounded-2xl text-stone-400 text-xs">
                    Không tìm thấy ảnh nền danh thắng nào phù hợp với từ khóa "{landmarkSearchQuery}".
                  </div>
                );
              }

              return filtered.map((landmark) => (
                <div
                  key={landmark.id}
                  className="bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden shadow-lg hover:border-amber-500/40 transition-all flex flex-col group"
                >
                  {/* Landmark Image */}
                  <div className="relative h-40 bg-stone-950 overflow-hidden">
                    <img
                      src={landmark.imageUrl}
                      alt={landmark.landmarkName}
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80';
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent p-3 flex flex-col justify-between">
                      <div className="flex items-center justify-between">
                        <span className="px-2 py-0.5 rounded-md bg-stone-950/80 backdrop-blur-md text-[10px] font-bold text-amber-400 border border-stone-800 uppercase tracking-wider">
                          {landmark.cityName}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-stone-300 font-mono">
                          GPS: {landmark.lat}, {landmark.lng}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Body Info */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <h5 className="font-bold text-stone-100 text-sm group-hover:text-amber-300 transition-colors">
                        {landmark.landmarkName}
                      </h5>
                      <p className="text-xs text-stone-400 line-clamp-2 mt-1 leading-relaxed font-light">
                        {landmark.tagline}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="pt-3 border-t border-stone-800/80 flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingLandmark(landmark);
                          setIsLandmarkModalOpen(true);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-stone-950 font-bold text-xs flex items-center gap-1 transition-all cursor-pointer"
                      >
                        <Edit className="w-3.5 h-3.5" />
                        <span>Chỉnh Sửa Nội Dung</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          if (window.confirm(`Bạn có chắc chắn muốn xóa ảnh nền danh thắng "${landmark.landmarkName}"?`)) {
                            storageService.deleteLandmarkBackground(landmark.id);
                            refreshData();
                          }
                        }}
                        className="px-2.5 py-1.5 rounded-xl bg-stone-950 hover:bg-red-950 text-stone-400 hover:text-red-300 border border-stone-800 text-xs flex items-center gap-1 transition-all cursor-pointer"
                        title="Xóa danh thắng"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ));
            })()}
          </div>
        </div>
      )}

      {/* ==========================================
          TAB 6: AI MONITORING & RELIABILITY
          ========================================== */}
      {activeTab === 'ai_status' && (
        <AdminAIDashboard />
      )}

      {/* ==========================================
          TAB 7: AI TOUR GUIDE STUDIO & TRAINING
          ========================================== */}
      {activeTab === 'tour_guide' && (
        <AITourGuideTrainer />
      )}

      {/* ==========================================
          TAB 8: AI RECOGNITION SECTION & SAMPLES
          ========================================== */}
      {activeTab === 'recognition' && (
        <div className="space-y-6">
          {/* Header Card */}
          <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 shadow-xl relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shadow-inner">
                  <ImageIcon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-serif font-bold text-stone-100 flex items-center gap-2">
                    <span>Nội Dung & Ảnh Mẫu Nhận Diện AI</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-xs font-sans font-semibold">
                      {recognitionConfig.samples.length} mẫu thử nghiệm
                    </span>
                  </h3>
                  <p className="text-xs text-stone-400 mt-0.5">
                    Quản lý toàn diện tiêu đề banner, lời dẫn, các mẫu ảnh thử nghiệm nhanh một chạm và câu lệnh kiểm thử AI.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => setIsRecognitionModalOpen(true)}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-bold text-xs shadow-lg shadow-amber-950/40 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Edit3 className="w-4 h-4" />
                  <span>Mở Trình Biên Tập Chi Tiết</span>
                </button>
              </div>
            </div>

            {/* Current Banner Summary */}
            <div className="mt-5 pt-4 border-t border-stone-800 grid grid-cols-1 md:grid-cols-3 gap-3 bg-stone-950/60 p-4 rounded-2xl">
              <div>
                <span className="text-[10px] text-stone-500 uppercase tracking-wider font-semibold block">Huy hiệu banner</span>
                <span className="text-xs text-amber-300 font-medium">{recognitionConfig.badge}</span>
              </div>
              <div>
                <span className="text-[10px] text-stone-500 uppercase tracking-wider font-semibold block">Tiêu đề chính</span>
                <span className="text-xs text-stone-200 font-serif font-bold">{recognitionConfig.title}</span>
              </div>
              <div>
                <span className="text-[10px] text-stone-500 uppercase tracking-wider font-semibold block">Nhãn danh sách ảnh mẫu</span>
                <span className="text-xs text-stone-300">{recognitionConfig.samplesLabel}</span>
              </div>
            </div>
          </div>

          {/* Samples Cards Display */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {recognitionConfig.samples.map((sample, idx) => (
              <div 
                key={sample.id || idx}
                className="bg-stone-900 border border-stone-800 hover:border-stone-700 rounded-2xl overflow-hidden shadow-lg transition-all group"
              >
                <div className="h-40 w-full relative bg-stone-950 overflow-hidden">
                  <img 
                    src={sample.url} 
                    alt={sample.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=600&q=80';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-transparent" />
                  <div className="absolute top-2 left-2 px-2.5 py-1 rounded-lg bg-stone-950/80 backdrop-blur text-[10px] font-bold text-amber-400 border border-stone-800">
                    Mẫu #{idx + 1}
                  </div>
                  <div className="absolute bottom-2 left-3 right-3">
                    <h4 className="text-sm font-bold text-stone-100 line-clamp-1">{sample.title}</h4>
                    <p className="text-xs text-amber-400 line-clamp-1">{sample.category}</p>
                  </div>
                </div>

                <div className="p-4 space-y-2.5">
                  <div className="bg-stone-950/80 p-2.5 rounded-xl border border-stone-800">
                    <span className="text-[10px] text-stone-500 uppercase tracking-wider font-semibold block mb-0.5">Prompt thử nghiệm AI:</span>
                    <p className="text-xs text-stone-300 italic line-clamp-2">"{sample.prompt}"</p>
                  </div>

                  {sample.description && (
                    <p className="text-xs text-stone-400 line-clamp-2">{sample.description}</p>
                  )}

                  <div className="flex items-center justify-between pt-2 border-t border-stone-800 text-[11px] text-stone-500">
                    <span>Nguồn: {sample.source || 'Kho Di sản'}</span>
                    <button
                      onClick={() => setIsRecognitionModalOpen(true)}
                      className="px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-amber-400 font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <Edit3 className="w-3 h-3" />
                      <span>Sửa</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Admin Modals */}
      <HeritageEditModal
        isOpen={isHeritageModalOpen}
        onClose={() => {
          setIsHeritageModalOpen(false);
          setEditingHeritage(null);
        }}
        heritage={editingHeritage}
        onSaveSuccess={() => {
          refreshData();
        }}
      />

      <PlaceEditModal
        isOpen={isPlaceModalOpen}
        onClose={() => {
          setIsPlaceModalOpen(false);
          setEditingPlace(null);
        }}
        place={editingPlace}
        heritageId={selectedHeritageForPlaces !== 'all' ? selectedHeritageForPlaces : undefined}
        heritagesList={heritages}
        onSaveSuccess={() => {
          refreshData();
        }}
      />

      <LandmarkEditModal
        isOpen={isLandmarkModalOpen}
        onClose={() => {
          setIsLandmarkModalOpen(false);
          setEditingLandmark(null);
        }}
        landmark={editingLandmark}
        onSave={() => {
          refreshData();
        }}
        onDelete={() => {
          refreshData();
        }}
      />

      {storyEditHeritage && (
        <AdminStoryEditModal
          isOpen={isAdminStoryModalOpen}
          onClose={() => {
            setIsAdminStoryModalOpen(false);
            setStoryEditHeritage(null);
          }}
          heritage={storyEditHeritage}
          onSaved={() => {
            refreshData();
          }}
        />
      )}

      <AdminRecognitionModal
        isOpen={isRecognitionModalOpen}
        onClose={() => setIsRecognitionModalOpen(false)}
        onSaved={(newCfg) => {
          setRecognitionConfig(newCfg);
          refreshData();
        }}
      />

    </div>
  );
};
