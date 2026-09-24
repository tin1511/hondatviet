import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  MapPin, 
  Layers, 
  ExternalLink, 
  Volume2, 
  Sparkles, 
  Award, 
  CheckCircle2,
  Compass,
  ArrowRight,
  Edit3,
  Plus,
  Trash2,
  X,
  Save,
  Image as ImageIcon,
  ShieldCheck,
  RotateCcw,
  Check
} from 'lucide-react';
import { TraditionalCraftVillage, TraditionalArtItem, UserProfile } from '../types';
import { storageService } from '../services/storageService';
import { aiService } from '../services/aiService';
import { ttsService } from '../services/ttsService';
import { getSafeCraftOrArtImageUrl } from '../utils/imageUtils';

interface TraditionalCraftsAndArtsProps {
  currentUser?: UserProfile;
}

export const TraditionalCraftsAndArts: React.FC<TraditionalCraftsAndArtsProps> = ({ currentUser }) => {
  const user = currentUser || storageService.getCurrentUser();
  const isAdmin = user?.role === 'admin';

  const [activeTab, setActiveTab] = useState<'crafts' | 'arts'>('crafts');
  
  // Data lists loaded from storageService
  const [craftsList, setCraftsList] = useState<TraditionalCraftVillage[]>([]);
  const [artsList, setArtsList] = useState<TraditionalArtItem[]>([]);

  // Selected items
  const [selectedCraft, setSelectedCraft] = useState<TraditionalCraftVillage | null>(null);
  const [selectedArt, setSelectedArt] = useState<TraditionalArtItem | null>(null);

  // Modal State for Editing Crafts or Arts
  const [isEditingCraftModal, setIsEditingCraftModal] = useState<boolean>(false);
  const [editingCraft, setEditingCraft] = useState<Partial<TraditionalCraftVillage>>({});

  const [isEditingArtModal, setIsEditingArtModal] = useState<boolean>(false);
  const [editingArt, setEditingArt] = useState<Partial<TraditionalArtItem>>({});

  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);

  // Load Crafts and Arts on mount & listen to updates
  useEffect(() => {
    const loadedCrafts = storageService.getCrafts();
    const loadedArts = storageService.getArts();
    setCraftsList(loadedCrafts);
    setArtsList(loadedArts);

    if (loadedCrafts.length > 0) setSelectedCraft(loadedCrafts[0]);
    if (loadedArts.length > 0) setSelectedArt(loadedArts[0]);

    const handleCraftsUpdate = (e: any) => {
      const updated = e.detail || storageService.getCrafts();
      setCraftsList(updated);
      if (updated.length > 0 && selectedCraft) {
        const found = updated.find((c: TraditionalCraftVillage) => c.id === selectedCraft.id);
        if (found) setSelectedCraft(found);
      }
    };

    const handleArtsUpdate = (e: any) => {
      const updated = e.detail || storageService.getArts();
      setArtsList(updated);
      if (updated.length > 0 && selectedArt) {
        const found = updated.find((a: TraditionalArtItem) => a.id === selectedArt.id);
        if (found) setSelectedArt(found);
      }
    };

    window.addEventListener('crafts-updated', handleCraftsUpdate);
    window.addEventListener('arts-updated', handleArtsUpdate);

    return () => {
      window.removeEventListener('crafts-updated', handleCraftsUpdate);
      window.removeEventListener('arts-updated', handleArtsUpdate);
    };
  }, []);

  // Show Toast Message
  const showToast = (msg: string) => {
    setSaveSuccessMsg(msg);
    setTimeout(() => setSaveSuccessMsg(null), 3000);
  };

  // Open Craft Edit / Create Modal
  const handleOpenCraftModal = (craft?: TraditionalCraftVillage) => {
    if (craft) {
      setEditingCraft({ ...craft });
    } else {
      setEditingCraft({
        id: `craft-${Date.now()}`,
        name: '',
        craftType: 'Thủ công mỹ nghệ',
        province: 'Hà Nội',
        region: 'north',
        history: '',
        products: ['Sản phẩm thủ công 1', 'Sản phẩm thủ công 2'],
        processSteps: [
          'Bước 1: Chuẩn bị nguyên liệu',
          'Bước 2: Tạo hình thô',
          'Bước 3: Tỉa chi tiết',
          'Bước 4: Hoàn thiện bề mặt',
          'Bước 5: Kiểm định sản phẩm'
        ],
        imageUrl: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1000&q=80',
        googleMapsUri: 'https://maps.google.com/',
        visitingLocation: '',
        verifiedStatus: 'verified'
      });
    }
    setIsEditingCraftModal(true);
  };

  // Save Craft
  const handleSaveCraft = () => {
    if (!editingCraft.name || !editingCraft.imageUrl) {
      alert('Vui lòng nhập tên làng nghề và đường dẫn hình ảnh!');
      return;
    }

    const fullCraft: TraditionalCraftVillage = {
      id: editingCraft.id || `craft-${Date.now()}`,
      name: editingCraft.name || 'Làng nghề truyền thống',
      craftType: editingCraft.craftType || 'Thủ công mỹ nghệ',
      province: editingCraft.province || 'Việt Nam',
      region: editingCraft.region || 'north',
      history: editingCraft.history || '',
      products: Array.isArray(editingCraft.products) ? editingCraft.products : (editingCraft.products as any || '').split(',').map((s: string) => s.trim()),
      processSteps: Array.isArray(editingCraft.processSteps) ? editingCraft.processSteps : (editingCraft.processSteps as any || '').split('\n').map((s: string) => s.trim()),
      imageUrl: editingCraft.imageUrl || 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1000&q=80',
      googleMapsUri: editingCraft.googleMapsUri || 'https://maps.google.com/',
      visitingLocation: editingCraft.visitingLocation || editingCraft.name,
      verifiedStatus: editingCraft.verifiedStatus || 'verified',
      approvalStatus: isAdmin ? 'approved' : (editingCraft.approvalStatus || 'pending')
    };

    storageService.updateCraftItem(fullCraft);
    setSelectedCraft(fullCraft);
    setIsEditingCraftModal(false);
    if (isAdmin) {
      showToast(`Đã lưu thay đổi cho làng nghề "${fullCraft.name}"!`);
    } else {
      showToast(`Đã gửi đề xuất làng nghề "${fullCraft.name}"! Vui lòng chờ Admin duyệt trước khi đăng tải.`);
    }
  };

  // Delete Craft
  const handleDeleteCraft = (craftId: string, craftName: string) => {
    if (confirm(`Bạn có chắc muốn xóa làng nghề "${craftName}"?`)) {
      storageService.deleteCraftItem(craftId);
      const remaining = craftsList.filter(c => c.id !== craftId);
      setCraftsList(remaining);
      if (remaining.length > 0) setSelectedCraft(remaining[0]);
      else setSelectedCraft(null);
      showToast(`Đã xóa làng nghề "${craftName}"!`);
    }
  };

  // Open Art Edit / Create Modal
  const handleOpenArtModal = (art?: TraditionalArtItem) => {
    if (art) {
      setEditingArt({ ...art });
    } else {
      setEditingArt({
        id: `art-${Date.now()}`,
        name: '',
        artType: 'quan_ho',
        artTypeLabel: 'Nghệ thuật Dân gian',
        originRegion: 'Bắc Bộ, Việt Nam',
        description: '',
        characteristics: ['Giai điệu truyền thống sâu lắng', 'Nhạc cụ mộc mạc đặc trưng'],
        culturalMeaning: 'Bảo tồn bản sắc văn hóa phi vật thể',
        recognizedByUnesco: true,
        unescoYear: '2010',
        sampleAudioOrVideoDescription: 'Khúc ca tiêu biểu mang đậm bản sắc quê hương',
        imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1000&q=80'
      });
    }
    setIsEditingArtModal(true);
  };

  // Save Art
  const handleSaveArt = () => {
    if (!editingArt.name || !editingArt.imageUrl) {
      alert('Vui lòng nhập tên di sản nghệ thuật và đường dẫn hình ảnh!');
      return;
    }

    const fullArt: TraditionalArtItem = {
      id: editingArt.id || `art-${Date.now()}`,
      name: editingArt.name || 'Nghệ thuật cổ truyền',
      artType: editingArt.artType || 'quan_ho',
      artTypeLabel: editingArt.artTypeLabel || 'Nghệ thuật Dân gian',
      originRegion: editingArt.originRegion || 'Việt Nam',
      description: editingArt.description || '',
      characteristics: Array.isArray(editingArt.characteristics) 
        ? editingArt.characteristics 
        : (editingArt.characteristics as any || '').split('\n').map((s: string) => s.trim()).filter(Boolean),
      culturalMeaning: editingArt.culturalMeaning || 'Di sản văn hóa dân tộc',
      recognizedByUnesco: editingArt.recognizedByUnesco ?? true,
      unescoYear: editingArt.unescoYear || '2009',
      sampleAudioOrVideoDescription: editingArt.sampleAudioOrVideoDescription || '',
      imageUrl: editingArt.imageUrl || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1000&q=80',
      approvalStatus: isAdmin ? 'approved' : (editingArt.approvalStatus || 'pending')
    };

    storageService.updateArtItem(fullArt);
    setSelectedArt(fullArt);
    setIsEditingArtModal(false);
    if (isAdmin) {
      showToast(`Đã lưu thay đổi cho nghệ thuật "${fullArt.name}"!`);
    } else {
      showToast(`Đã gửi đề xuất nghệ thuật "${fullArt.name}"! Vui lòng chờ Admin duyệt trước khi đăng tải.`);
    }
  };

  // Delete Art
  const handleDeleteArt = (artId: string, artName: string) => {
    if (confirm(`Bạn có chắc muốn xóa nghệ thuật cổ truyền "${artName}"?`)) {
      storageService.deleteArtItem(artId);
      const remaining = artsList.filter(a => a.id !== artId);
      setArtsList(remaining);
      if (remaining.length > 0) setSelectedArt(remaining[0]);
      else setSelectedArt(null);
      showToast(`Đã xóa nghệ thuật "${artName}"!`);
    }
  };

  const visibleCrafts = craftsList.filter(c => isAdmin || !c.approvalStatus || c.approvalStatus === 'approved');
  const visibleArts = artsList.filter(a => isAdmin || !a.approvalStatus || a.approvalStatus === 'approved');

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      
      {/* Toast Notification */}
      {saveSuccessMsg && (
        <div className="fixed top-20 right-4 z-50 bg-emerald-600 text-stone-950 font-bold text-xs px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2 animate-bounce">
          <Check className="w-4 h-4" />
          <span>{saveSuccessMsg}</span>
        </div>
      )}

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold mb-3">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Bảo Tồn Tinh Hoa Nghệ Thuật & Làng Nghề</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-serif font-bold text-stone-100">
          Làng Nghề Thủ Công & Nghệ Thuật Cổ Truyền
        </h2>
        <p className="text-stone-300 text-xs sm:text-sm mt-2">
          Khám phá quy trình chế tác tinh xảo của các nghệ nhân và di sản âm nhạc phi vật thể được UNESCO ghi danh.
        </p>

        {/* Admin Capability Banner */}
        {isAdmin ? (
          <div className="mt-4 p-3 bg-amber-500/15 border border-amber-500/40 rounded-2xl text-amber-300 text-xs flex flex-wrap items-center justify-between gap-3 shadow-lg">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="font-semibold text-left">
                Chế độ Admin: Bạn có quyền cập nhật thông tin, thay đổi hình ảnh & quản lý danh mục Làng nghề / Nghệ thuật.
              </span>
            </div>
            <div className="flex items-center gap-2">
              {activeTab === 'crafts' ? (
                <button
                  onClick={() => handleOpenCraftModal()}
                  className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl text-[11px] flex items-center gap-1.5 shadow"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Thêm Làng Nghề Mới</span>
                </button>
              ) : (
                <button
                  onClick={() => handleOpenArtModal()}
                  className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl text-[11px] flex items-center gap-1.5 shadow"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Thêm Nghệ Thuật Mới</span>
                </button>
              )}
              <button
                onClick={() => {
                  if (confirm('Khôi phục danh sách Làng nghề & Nghệ thuật về mặc định?')) {
                    storageService.resetCraftsAndArtsToDefault();
                    showToast('Đã khôi phục dữ liệu nguyên bản!');
                  }
                }}
                className="px-2.5 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-300 font-medium rounded-xl text-[11px] flex items-center gap-1"
                title="Khôi phục nguyên bản"
              >
                <RotateCcw className="w-3 h-3" />
                <span className="hidden sm:inline">Khôi phục</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-4 p-3 bg-stone-900 border border-stone-800 rounded-2xl text-stone-300 text-xs flex flex-wrap items-center justify-between gap-3 shadow-lg">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="text-left">
                Bạn biết làng nghề truyền thống hoặc nghệ thuật cổ truyền độc đáo? Đề xuất để cùng bảo tồn văn hóa!
              </span>
            </div>
            {activeTab === 'crafts' ? (
              <button
                onClick={() => handleOpenCraftModal()}
                className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl text-[11px] flex items-center gap-1.5 shadow"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Đề Xuất Làng Nghề Mới</span>
              </button>
            ) : (
              <button
                onClick={() => handleOpenArtModal()}
                className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl text-[11px] flex items-center gap-1.5 shadow"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Đề Xuất Nghệ Thuật Mới</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Sub Tab Switcher */}
      <div className="flex justify-center mb-8">
        <div className="bg-stone-900 border border-stone-800 p-1.5 rounded-2xl inline-flex gap-1.5 shadow-lg">
          <button
            onClick={() => setActiveTab('crafts')}
            className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'crafts'
                ? 'bg-amber-600 text-stone-950 shadow'
                : 'text-stone-300 hover:text-white'
            }`}
          >
            🏺 Làng Nghề Thủ Công Truyền Thống ({visibleCrafts.length})
          </button>
          <button
            onClick={() => setActiveTab('arts')}
            className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'arts'
                ? 'bg-amber-600 text-stone-950 shadow'
                : 'text-stone-300 hover:text-white'
            }`}
          >
            🎶 Nghệ Thuật & Âm Nhạc Cổ Truyền ({visibleArts.length})
          </button>
        </div>
      </div>

      {/* ==========================================
          TAB 1: TRADITIONAL CRAFT VILLAGES
          ========================================== */}
      {activeTab === 'crafts' && (
        <div className="space-y-8 animate-fadeIn">
          
          {/* Villages Selector Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {visibleCrafts.map((craft) => (
              <div
                key={craft.id}
                className={`group relative p-3 rounded-2xl border transition-all cursor-pointer ${
                  selectedCraft?.id === craft.id
                    ? 'bg-amber-950/60 border-amber-500 ring-2 ring-amber-500/20 shadow-lg'
                    : 'bg-stone-900 border-stone-800 text-stone-300 hover:bg-stone-800/80'
                }`}
                onClick={() => setSelectedCraft(craft)}
              >
                <img 
                  src={getSafeCraftOrArtImageUrl(craft.imageUrl, craft.id)} 
                  alt={craft.name} 
                  className="w-full h-24 object-cover rounded-xl mb-2" 
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=600&q=80';
                  }}
                />
                
                {/* Admin quick buttons */}
                {isAdmin && (
                  <div className="absolute top-4 right-4 flex items-center gap-1 bg-stone-950/80 backdrop-blur p-1 rounded-lg border border-amber-500/40 opacity-90 hover:opacity-100 z-10">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenCraftModal(craft);
                      }}
                      className="p-1 bg-amber-500 hover:bg-amber-400 text-stone-950 rounded text-xs"
                      title="Chỉnh sửa làng nghề"
                    >
                      <Edit3 className="w-3 h-3" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteCraft(craft.id, craft.name);
                      }}
                      className="p-1 bg-red-600 hover:bg-red-500 text-white rounded text-xs"
                      title="Xóa làng nghề"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                )}

                <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-semibold">
                  {craft.craftType}
                </span>
                <h4 className="font-serif font-bold text-stone-100 text-xs mt-1 truncate">{craft.name}</h4>
                <p className="text-[10px] text-stone-400 mt-0.5">{craft.province}</p>
              </div>
            ))}
          </div>

          {/* Selected Craft In-Depth Detail Card */}
          {selectedCraft ? (
            <div className="bg-stone-900 border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 relative">
              
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-stone-800 pb-5">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold">
                      {selectedCraft.craftType}
                    </span>
                    <span className="text-xs text-stone-400 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-red-400" />
                      {selectedCraft.province} ({selectedCraft.region === 'north' ? 'Miền Bắc' : selectedCraft.region === 'central' ? 'Miền Trung' : 'Miền Nam'})
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-amber-100">
                    {selectedCraft.name}
                  </h3>
                  <p className="text-xs text-stone-300 mt-2 max-w-3xl leading-relaxed">
                    {selectedCraft.history}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {isAdmin && (
                    <button
                      onClick={() => handleOpenCraftModal(selectedCraft)}
                      className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs rounded-xl flex items-center gap-1.5 shadow transition-all cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Sửa nội dung & Ảnh</span>
                    </button>
                  )}

                  <a
                    href={selectedCraft.googleMapsUri || `https://maps.google.com/?q=${encodeURIComponent(selectedCraft.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-stone-950 font-bold text-xs rounded-xl flex items-center gap-1.5 shadow transition-all"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Chỉ đường tới làng nghề</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Banner Image Preview */}
              <div className="relative rounded-2xl overflow-hidden border border-stone-800 h-64 sm:h-80 shadow-lg group">
                <img 
                  src={getSafeCraftOrArtImageUrl(selectedCraft.imageUrl, selectedCraft.id)} 
                  alt={selectedCraft.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1200&q=80';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent flex items-end p-6">
                  <div>
                    <span className="text-[11px] px-2.5 py-0.5 rounded bg-amber-500/80 text-stone-950 font-extrabold uppercase mb-1 inline-block">
                      {selectedCraft.craftType} • {selectedCraft.province}
                    </span>
                    <h4 className="text-xl font-serif font-bold text-white">{selectedCraft.name}</h4>
                  </div>
                </div>
              </div>

              {/* 5-Step Crafting Process */}
              {selectedCraft.processSteps && selectedCraft.processSteps.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-amber-400" />
                    <span>Quy trình chế tác thủ công tinh xảo:</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                    {selectedCraft.processSteps.map((step, idx) => (
                      <div key={idx} className="bg-stone-950 p-4 rounded-2xl border border-stone-800 space-y-2 relative">
                        <div className="w-6 h-6 rounded-full bg-amber-500 text-stone-950 font-bold text-xs flex items-center justify-center">
                          {idx + 1}
                        </div>
                        <p className="text-xs text-stone-200 leading-relaxed font-medium">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Products & Visiting Spot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
                <div className="bg-stone-950/60 p-4 rounded-2xl border border-stone-800">
                  <span className="text-amber-400 font-bold block mb-2">🎁 Sản phẩm đặc trưng:</span>
                  <ul className="space-y-1 text-stone-300">
                    {selectedCraft.products.map((p, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="text-amber-500">•</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-stone-950/60 p-4 rounded-2xl border border-stone-800">
                  <span className="text-amber-400 font-bold block mb-2">📍 Địa điểm trải nghiệm thực tế:</span>
                  <p className="text-stone-300 leading-relaxed">{selectedCraft.visitingLocation || selectedCraft.name}</p>
                  <p className="text-[11px] text-stone-500 mt-2">
                    Du khách có thể tự tay nhào nặn gốm, in tranh hoặc chằm nón cùng nghệ nhân.
                  </p>
                </div>
              </div>

            </div>
          ) : (
            <div className="text-center py-12 bg-stone-900 rounded-3xl border border-stone-800">
              <p className="text-stone-400 text-sm">Chưa có làng nghề nào. Hãy bấm "Thêm Làng Nghề Mới" ở trên!</p>
            </div>
          )}

        </div>
      )}

      {/* ==========================================
          TAB 2: TRADITIONAL ARTS & MUSIC (UNESCO)
          ========================================== */}
      {activeTab === 'arts' && (
        <div className="space-y-8 animate-fadeIn">
          
          {/* Arts List Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {visibleArts.map((art) => (
              <div
                key={art.id}
                onClick={() => setSelectedArt(art)}
                className={`group relative p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                  selectedArt?.id === art.id
                    ? 'bg-amber-950/60 border-amber-500 ring-2 ring-amber-500/20 shadow-lg'
                    : 'bg-stone-900 border-stone-800 text-stone-300 hover:bg-stone-800/80'
                }`}
              >
                <img 
                  src={getSafeCraftOrArtImageUrl(art.imageUrl, art.id)} 
                  alt={art.name} 
                  className="w-full h-36 object-cover rounded-xl mb-3" 
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80';
                  }}
                />

                {/* Admin quick buttons */}
                {isAdmin && (
                  <div className="absolute top-6 right-6 flex items-center gap-1 bg-stone-950/80 backdrop-blur p-1 rounded-lg border border-amber-500/40 opacity-90 hover:opacity-100 z-10">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenArtModal(art);
                      }}
                      className="p-1 bg-amber-500 hover:bg-amber-400 text-stone-950 rounded text-xs"
                      title="Chỉnh sửa nghệ thuật"
                    >
                      <Edit3 className="w-3 h-3" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteArt(art.id, art.name);
                      }}
                      className="p-1 bg-red-600 hover:bg-red-500 text-white rounded text-xs"
                      title="Xóa nghệ thuật"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                )}

                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] px-2 py-0.5 rounded bg-red-500/20 text-red-300 font-semibold">
                    UNESCO {art.unescoYear || 'Di sản'}
                  </span>
                </div>
                <h4 className="font-serif font-bold text-stone-100 text-sm mt-1">{art.name}</h4>
                <p className="text-xs text-stone-400 mt-0.5">{art.originRegion}</p>
              </div>
            ))}
          </div>

          {/* Selected Art Detail Card */}
          {selectedArt ? (
            <div className="bg-stone-900 border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
              
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-stone-800 pb-5">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/30 font-semibold">
                      Di sản Văn hóa Phi vật thể UNESCO ({selectedArt.unescoYear})
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-amber-100">
                    {selectedArt.name}
                  </h3>
                  <p className="text-xs text-stone-400 mt-1">{selectedArt.originRegion}</p>
                </div>

                <div className="flex items-center gap-2">
                  {isAdmin && (
                    <button
                      onClick={() => handleOpenArtModal(selectedArt)}
                      className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs rounded-xl flex items-center gap-1.5 shadow transition-all cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Sửa nội dung & Ảnh</span>
                    </button>
                  )}

                  <button
                    onClick={() => {
                      ttsService.prepareForMobilePlayback();
                      aiService.speakText(selectedArt.description + '. ' + selectedArt.characteristics.join('. '));
                    }}
                    className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs rounded-xl flex items-center gap-1.5 shadow cursor-pointer"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>Nghe giọng đọc AI</span>
                  </button>
                </div>
              </div>

              {/* Banner Image Preview */}
              <div className="relative rounded-2xl overflow-hidden border border-stone-800 h-64 sm:h-80 shadow-lg group">
                <img 
                  src={getSafeCraftOrArtImageUrl(selectedArt.imageUrl, selectedArt.id)} 
                  alt={selectedArt.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent flex items-end p-6">
                  <div>
                    <span className="text-[11px] px-2.5 py-0.5 rounded bg-red-500/80 text-white font-extrabold uppercase mb-1 inline-block">
                      UNESCO {selectedArt.unescoYear} • {selectedArt.originRegion}
                    </span>
                    <h4 className="text-xl font-serif font-bold text-white">{selectedArt.name}</h4>
                  </div>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-stone-200 leading-relaxed font-serif">
                {selectedArt.description}
              </p>

              {/* Characteristics */}
              {selectedArt.characteristics && selectedArt.characteristics.length > 0 && (
                <div className="bg-stone-950 p-5 rounded-2xl border border-stone-800 space-y-3">
                  <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                    Đặc trưng nghệ thuật & Nhạc cụ:
                  </h4>
                  <ul className="space-y-2 text-xs text-stone-300">
                    {selectedArt.characteristics.map((char, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <span>{char}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedArt.sampleAudioOrVideoDescription && (
                <div className="p-4 bg-amber-950/20 border border-amber-500/20 rounded-xl text-xs text-stone-300 flex items-center justify-between">
                  <div>
                    <span className="text-amber-400 font-semibold block">Khúc điệu tiêu biểu:</span>
                    <span>{selectedArt.sampleAudioOrVideoDescription}</span>
                  </div>
                </div>
              )}

            </div>
          ) : (
            <div className="text-center py-12 bg-stone-900 rounded-3xl border border-stone-800">
              <p className="text-stone-400 text-sm">Chưa có loại hình nghệ thuật nào. Hãy bấm "Thêm Nghệ Thuật Mới" ở trên!</p>
            </div>
          )}

        </div>
      )}

      {/* ==========================================
          ADMIN MODAL: EDIT CRAFT VILLAGE
          ========================================== */}
      {isEditingCraftModal && (
        <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-stone-900 border border-amber-500/40 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl space-y-5">
            
            <div className="flex items-center justify-between border-b border-stone-800 pb-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-amber-400" />
                <h3 className="font-serif font-bold text-lg text-amber-100">
                  {editingCraft.id ? 'Sửa Làng Nghề Thủ Công' : 'Thêm Làng Nghề Mới'}
                </h3>
              </div>
              <button
                onClick={() => setIsEditingCraftModal(false)}
                className="p-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              
              {/* Name & Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-300 font-semibold mb-1">Tên Làng Nghề *</label>
                  <input
                    type="text"
                    value={editingCraft.name || ''}
                    onChange={(e) => setEditingCraft({ ...editingCraft, name: e.target.value })}
                    placeholder="VD: Làng Gốm Bát Tràng"
                    className="w-full px-3 py-2 bg-stone-950 border border-stone-700 rounded-xl text-stone-100 focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-stone-300 font-semibold mb-1">Loại Hình Nghề *</label>
                  <input
                    type="text"
                    value={editingCraft.craftType || ''}
                    onChange={(e) => setEditingCraft({ ...editingCraft, craftType: e.target.value })}
                    placeholder="VD: Gốm sứ, Tranh in, Dệt lụa..."
                    className="w-full px-3 py-2 bg-stone-950 border border-stone-700 rounded-xl text-stone-100 focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Province & Region */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-300 font-semibold mb-1">Tỉnh Thành / Địa Danh *</label>
                  <input
                    type="text"
                    value={editingCraft.province || ''}
                    onChange={(e) => setEditingCraft({ ...editingCraft, province: e.target.value })}
                    placeholder="VD: Hà Nội, Thừa Thiên Huế..."
                    className="w-full px-3 py-2 bg-stone-950 border border-stone-700 rounded-xl text-stone-100 focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-stone-300 font-semibold mb-1">Vùng Miền</label>
                  <select
                    value={editingCraft.region || 'north'}
                    onChange={(e) => setEditingCraft({ ...editingCraft, region: e.target.value as any })}
                    className="w-full px-3 py-2 bg-stone-950 border border-stone-700 rounded-xl text-stone-100 focus:border-amber-500 focus:outline-none"
                  >
                    <option value="north">Miền Bắc</option>
                    <option value="central">Miền Trung</option>
                    <option value="south">Miền Nam</option>
                  </select>
                </div>
              </div>

              {/* Image URL with Live Preview */}
              <div>
                <label className="block text-stone-300 font-semibold mb-1 flex items-center justify-between">
                  <span>URL Hình Ảnh Làng Nghề (Chất lượng cao) *</span>
                  <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
                </label>
                <input
                  type="text"
                  value={editingCraft.imageUrl || ''}
                  onChange={(e) => setEditingCraft({ ...editingCraft, imageUrl: e.target.value })}
                  placeholder="Paste URL hình ảnh HTTPS (Unsplash, Wikimedia...)"
                  className="w-full px-3 py-2 bg-stone-950 border border-stone-700 rounded-xl text-stone-100 focus:border-amber-500 focus:outline-none"
                />
                
                {/* Live Preview */}
                {editingCraft.imageUrl && (
                  <div className="mt-2 rounded-xl overflow-hidden border border-stone-800 h-40 bg-stone-950">
                    <img 
                      src={editingCraft.imageUrl} 
                      alt="Preview" 
                      className="w-full h-full object-cover" 
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=600&q=80';
                      }}
                    />
                  </div>
                )}
              </div>

              {/* History */}
              <div>
                <label className="block text-stone-300 font-semibold mb-1">Lịch Sử & Nguồn Gốc Làng Nghề</label>
                <textarea
                  rows={3}
                  value={editingCraft.history || ''}
                  onChange={(e) => setEditingCraft({ ...editingCraft, history: e.target.value })}
                  placeholder="Mô tả lịch sử hình thành, niên đại và đặc trưng truyền thống..."
                  className="w-full px-3 py-2 bg-stone-950 border border-stone-700 rounded-xl text-stone-100 focus:border-amber-500 focus:outline-none"
                />
              </div>

              {/* Products (comma separated) */}
              <div>
                <label className="block text-stone-300 font-semibold mb-1">Sản Phẩm Đổi Mới / Nổi Bật (Phân cách bằng dấu phẩy)</label>
                <input
                  type="text"
                  value={Array.isArray(editingCraft.products) ? editingCraft.products.join(', ') : (editingCraft.products || '')}
                  onChange={(e) => setEditingCraft({ ...editingCraft, products: e.target.value.split(',').map(s => s.trim()) as any })}
                  placeholder="VD: Men ngọc, Bình hút lộc, Tượng gốm phong thủy"
                  className="w-full px-3 py-2 bg-stone-950 border border-stone-700 rounded-xl text-stone-100 focus:border-amber-500 focus:outline-none"
                />
              </div>

              {/* Process Steps (one per line) */}
              <div>
                <label className="block text-stone-300 font-semibold mb-1">Các Bước Quy Trình Chế Tác (Mỗi bước một dòng)</label>
                <textarea
                  rows={4}
                  value={Array.isArray(editingCraft.processSteps) ? editingCraft.processSteps.join('\n') : (editingCraft.processSteps || '')}
                  onChange={(e) => setEditingCraft({ ...editingCraft, processSteps: e.target.value.split('\n').map(s => s.trim()) as any })}
                  placeholder="Bước 1: Chọn đất sét trắng&#10;Bước 2: Tạo hình trên bàn xoay&#10;Bước 3: Phơi khô & Vẽ hoa văn..."
                  className="w-full px-3 py-2 bg-stone-950 border border-stone-700 rounded-xl text-stone-100 focus:border-amber-500 focus:outline-none"
                />
              </div>

              {/* Visiting Spot & Map URL */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-300 font-semibold mb-1">Địa Điểm Tham Quan Trải Nghiệm</label>
                  <input
                    type="text"
                    value={editingCraft.visitingLocation || ''}
                    onChange={(e) => setEditingCraft({ ...editingCraft, visitingLocation: e.target.value })}
                    placeholder="VD: Bảo tàng Gốm Bát Tràng"
                    className="w-full px-3 py-2 bg-stone-950 border border-stone-700 rounded-xl text-stone-100 focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-stone-300 font-semibold mb-1">Google Maps URI</label>
                  <input
                    type="text"
                    value={editingCraft.googleMapsUri || ''}
                    onChange={(e) => setEditingCraft({ ...editingCraft, googleMapsUri: e.target.value })}
                    placeholder="https://maps.google.com/?q=..."
                    className="w-full px-3 py-2 bg-stone-950 border border-stone-700 rounded-xl text-stone-100 focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-2 pt-4 border-t border-stone-800">
              <button
                onClick={() => setIsEditingCraftModal(false)}
                className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-300 font-semibold text-xs rounded-xl"
              >
                Hủy
              </button>
              <button
                onClick={handleSaveCraft}
                className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs rounded-xl shadow flex items-center gap-1.5"
              >
                <Save className="w-4 h-4" />
                <span>Lưu Thay Đổi</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ==========================================
          ADMIN MODAL: EDIT TRADITIONAL ART
          ========================================== */}
      {isEditingArtModal && (
        <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-stone-900 border border-amber-500/40 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl space-y-5">
            
            <div className="flex items-center justify-between border-b border-stone-800 pb-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-amber-400" />
                <h3 className="font-serif font-bold text-lg text-amber-100">
                  {editingArt.id ? 'Sửa Nghệ Thuật Cổ Truyền' : 'Thêm Nghệ Thuật Mới'}
                </h3>
              </div>
              <button
                onClick={() => setIsEditingArtModal(false)}
                className="p-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              
              {/* Name & Region */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-300 font-semibold mb-1">Tên Nghệ Thuật *</label>
                  <input
                    type="text"
                    value={editingArt.name || ''}
                    onChange={(e) => setEditingArt({ ...editingArt, name: e.target.value })}
                    placeholder="VD: Hát Quan Họ Bắc Ninh, Nhã Nhạc Cung Đình Huế"
                    className="w-full px-3 py-2 bg-stone-950 border border-stone-700 rounded-xl text-stone-100 focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-stone-300 font-semibold mb-1">Năm UNESCO Ghi Danh</label>
                  <input
                    type="text"
                    value={editingArt.unescoYear || ''}
                    onChange={(e) => setEditingArt({ ...editingArt, unescoYear: e.target.value })}
                    placeholder="VD: 2009, 2012..."
                    className="w-full px-3 py-2 bg-stone-950 border border-stone-700 rounded-xl text-stone-100 focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Origin Region */}
              <div>
                <label className="block text-stone-300 font-semibold mb-1">Vùng Miền Khởi Nguồn *</label>
                <input
                  type="text"
                  value={editingArt.originRegion || ''}
                  onChange={(e) => setEditingArt({ ...editingArt, originRegion: e.target.value })}
                  placeholder="VD: Vùng Kinh Bắc (Bắc Ninh & Bắc Giang)"
                  className="w-full px-3 py-2 bg-stone-950 border border-stone-700 rounded-xl text-stone-100 focus:border-amber-500 focus:outline-none"
                />
              </div>

              {/* Image URL with Live Preview */}
              <div>
                <label className="block text-stone-300 font-semibold mb-1 flex items-center justify-between">
                  <span>URL Hình Ảnh Bìa Nghệ Thuật *</span>
                  <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
                </label>
                <input
                  type="text"
                  value={editingArt.imageUrl || ''}
                  onChange={(e) => setEditingArt({ ...editingArt, imageUrl: e.target.value })}
                  placeholder="Paste URL hình ảnh HTTPS (Unsplash, Wikimedia...)"
                  className="w-full px-3 py-2 bg-stone-950 border border-stone-700 rounded-xl text-stone-100 focus:border-amber-500 focus:outline-none"
                />
                
                {/* Live Preview */}
                {editingArt.imageUrl && (
                  <div className="mt-2 rounded-xl overflow-hidden border border-stone-800 h-40 bg-stone-950">
                    <img 
                      src={editingArt.imageUrl} 
                      alt="Preview" 
                      className="w-full h-full object-cover" 
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80';
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-stone-300 font-semibold mb-1">Mô Tả Tổng Quan Di Sản</label>
                <textarea
                  rows={3}
                  value={editingArt.description || ''}
                  onChange={(e) => setEditingArt({ ...editingArt, description: e.target.value })}
                  placeholder="Mô tả bối cảnh lịch sử, nét độc đáo âm nhạc và giá trị văn hóa..."
                  className="w-full px-3 py-2 bg-stone-950 border border-stone-700 rounded-xl text-stone-100 focus:border-amber-500 focus:outline-none"
                />
              </div>

              {/* Characteristics (one per line) */}
              <div>
                <label className="block text-stone-300 font-semibold mb-1">Đặc Trưng Nghệ Thuật & Nhạc Cụ (Mỗi nét một dòng)</label>
                <textarea
                  rows={3}
                  value={Array.isArray(editingArt.characteristics) ? editingArt.characteristics.join('\n') : (editingArt.characteristics || '')}
                  onChange={(e) => setEditingArt({ ...editingArt, characteristics: e.target.value.split('\n').map(s => s.trim()) as any })}
                  placeholder="Hát đối đáp giao duyên giữa liền anh và liền chị&#10;Trang phục áo tứ thân, nón ba tầm&#10;Lời ca mộc mạc, trữ tình..."
                  className="w-full px-3 py-2 bg-stone-950 border border-stone-700 rounded-xl text-stone-100 focus:border-amber-500 focus:outline-none"
                />
              </div>

              {/* Sample melody description */}
              <div>
                <label className="block text-stone-300 font-semibold mb-1">Khúc Ca / Điệu Hát Tiêu Biểu</label>
                <input
                  type="text"
                  value={editingArt.sampleAudioOrVideoDescription || ''}
                  onChange={(e) => setEditingArt({ ...editingArt, sampleAudioOrVideoDescription: e.target.value })}
                  placeholder="VD: 'Người ơi người ở đừng về', 'Lưu thủy hành vân'..."
                  className="w-full px-3 py-2 bg-stone-950 border border-stone-700 rounded-xl text-stone-100 focus:border-amber-500 focus:outline-none"
                />
              </div>

            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-2 pt-4 border-t border-stone-800">
              <button
                onClick={() => setIsEditingArtModal(false)}
                className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-300 font-semibold text-xs rounded-xl"
              >
                Hủy
              </button>
              <button
                onClick={handleSaveArt}
                className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs rounded-xl shadow flex items-center gap-1.5"
              >
                <Save className="w-4 h-4" />
                <span>Lưu Thay Đổi</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
