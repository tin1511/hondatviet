import React, { useState } from 'react';
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
  ArrowRight
} from 'lucide-react';
import { TRADITIONAL_CRAFTS, TRADITIONAL_ARTS } from '../data/vietnamHeritageData';
import { TraditionalCraftVillage, TraditionalArtItem } from '../types';
import { aiService } from '../services/aiService';
import { ttsService } from '../services/ttsService';

export const TraditionalCraftsAndArts: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'crafts' | 'arts'>('crafts');
  const [selectedCraft, setSelectedCraft] = useState<TraditionalCraftVillage>(TRADITIONAL_CRAFTS[0]);
  const [selectedArt, setSelectedArt] = useState<TraditionalArtItem>(TRADITIONAL_ARTS[0]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-8">
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
            🏺 Làng Nghề Thủ Công Truyền Thống
          </button>
          <button
            onClick={() => setActiveTab('arts')}
            className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'arts'
                ? 'bg-amber-600 text-stone-950 shadow'
                : 'text-stone-300 hover:text-white'
            }`}
          >
            🎶 Nghệ Thuật & Âm Nhạc Cổ Truyền (UNESCO)
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
            {TRADITIONAL_CRAFTS.map((craft) => (
              <button
                key={craft.id}
                onClick={() => setSelectedCraft(craft)}
                className={`p-3 rounded-2xl border text-left transition-all ${
                  selectedCraft.id === craft.id
                    ? 'bg-amber-950/60 border-amber-500 ring-2 ring-amber-500/20 shadow-lg'
                    : 'bg-stone-900 border-stone-800 text-stone-300 hover:bg-stone-800/80'
                }`}
              >
                <img src={craft.imageUrl} alt={craft.name} className="w-full h-24 object-cover rounded-xl mb-2" />
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-semibold">
                  {craft.craftType}
                </span>
                <h4 className="font-serif font-bold text-stone-100 text-xs mt-1 truncate">{craft.name}</h4>
                <p className="text-[10px] text-stone-400 mt-0.5">{craft.province}</p>
              </button>
            ))}
          </div>

          {/* Selected Craft In-Depth Detail Card */}
          <div className="bg-stone-900 border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            
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

              <a
                href={selectedCraft.googleMapsUri}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-stone-950 font-bold text-xs rounded-xl flex items-center gap-1.5 shadow transition-all"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Chỉ đường tới làng nghề</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* 5-Step Crafting Process */}
            <div>
              <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Layers className="w-4 h-4 text-amber-400" />
                <span>Quy trình chế tác thủ công tinh xảo (5 bước):</span>
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
                <p className="text-stone-300 leading-relaxed">{selectedCraft.visitingLocation}</p>
                <p className="text-[11px] text-stone-500 mt-2">
                  Du khách có thể tự tay nhào nặn gốm, in tranh hoặc chằm nón cùng nghệ nhân.
                </p>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* ==========================================
          TAB 2: TRADITIONAL ARTS & MUSIC (UNESCO)
          ========================================== */}
      {activeTab === 'arts' && (
        <div className="space-y-8 animate-fadeIn">
          
          {/* Arts List */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {TRADITIONAL_ARTS.map((art) => (
              <button
                key={art.id}
                onClick={() => setSelectedArt(art)}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  selectedArt.id === art.id
                    ? 'bg-amber-950/60 border-amber-500 ring-2 ring-amber-500/20 shadow-lg'
                    : 'bg-stone-900 border-stone-800 text-stone-300 hover:bg-stone-800/80'
                }`}
              >
                <img src={art.imageUrl} alt={art.name} className="w-full h-36 object-cover rounded-xl mb-3" />
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] px-2 py-0.5 rounded bg-red-500/20 text-red-300 font-semibold">
                    UNESCO {art.unescoYear}
                  </span>
                </div>
                <h4 className="font-serif font-bold text-stone-100 text-sm mt-1">{art.name}</h4>
                <p className="text-xs text-stone-400 mt-0.5">{art.originRegion}</p>
              </button>
            ))}
          </div>

          {/* Selected Art Detail */}
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

              <button
                onClick={() => {
                  ttsService.prepareForMobilePlayback();
                  aiService.speakText(selectedArt.description + '. ' + selectedArt.characteristics.join('. '));
                }}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs rounded-xl flex items-center gap-1.5 shadow cursor-pointer"
              >
                <Volume2 className="w-4 h-4" />
                <span>Nghe giới thiệu âm thanh</span>
              </button>
            </div>

            <p className="text-xs sm:text-sm text-stone-200 leading-relaxed font-serif">
              {selectedArt.description}
            </p>

            {/* Characteristics */}
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

            {selectedArt.sampleAudioOrVideoDescription && (
              <div className="p-4 bg-amber-950/20 border border-amber-500/20 rounded-xl text-xs text-stone-300 flex items-center justify-between">
                <div>
                  <span className="text-amber-400 font-semibold block">Khúc điệu tiêu biểu:</span>
                  <span>{selectedArt.sampleAudioOrVideoDescription}</span>
                </div>
              </div>
            )}

          </div>

        </div>
      )}

    </div>
  );
};
