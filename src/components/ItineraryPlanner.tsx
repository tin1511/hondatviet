import React, { useState } from 'react';
import { 
  CalendarDays, 
  Sparkles, 
  MapPin, 
  Clock, 
  Compass, 
  Utensils, 
  Coffee, 
  BookOpen, 
  ExternalLink, 
  RefreshCw, 
  Bookmark, 
  Check, 
  Share2,
  Info,
  Car
} from 'lucide-react';
import { aiService } from '../services/aiService';
import { storageService } from '../services/storageService';
import { ItineraryPlan } from '../types';

interface ItineraryPlannerProps {
  onNavigateToFood?: (heritageId: string) => void;
}

export const ItineraryPlanner: React.FC<ItineraryPlannerProps> = ({ onNavigateToFood }) => {
  const [destination, setDestination] = useState<string>('Thành phố Huế');
  const [duration, setDuration] = useState<string>('1 ngày');
  const [companion, setCompanion] = useState<string>('Gia đình có trẻ em');
  const [budget, setBudget] = useState<string>('Vừa phải');
  const [interests, setInterests] = useState<string[]>(['Di tích Cung đình', 'Ẩm thực địa phương', 'Làng nghề']);
  const [loading, setLoading] = useState<boolean>(false);
  const [itinerary, setItinerary] = useState<ItineraryPlan | null>(null);
  const [saved, setSaved] = useState<boolean>(false);

  const interestOptions = [
    'Di tích Cung đình & Lịch sử',
    'Ẩm thực địa phương & Ăn vặt',
    'Làng nghề thủ công & Trải nghiệm',
    'Cà phê ngắm cảnh & Check-in',
    'Nghệ thuật & Bảo tàng',
    'Chùa chiền & Tâm linh'
  ];

  const handleToggleInterest = (opt: string) => {
    if (interests.includes(opt)) {
      setInterests(interests.filter(i => i !== opt));
    } else {
      setInterests([...interests, opt]);
    }
  };

  const handleGenerate = async () => {
    setLoading(true);
    setSaved(false);
    try {
      const plan = await aiService.generateSmartItinerary({
        destination,
        duration,
        interests,
        budget,
        companion
      });
      setItinerary(plan);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveItinerary = () => {
    if (itinerary) {
      storageService.saveItinerary(itinerary);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'food': return <Utensils className="w-4 h-4 text-orange-400" />;
      case 'cafe': return <Coffee className="w-4 h-4 text-amber-400" />;
      case 'craft': return <BookOpen className="w-4 h-4 text-purple-400" />;
      case 'heritage':
      case 'museum': return <Compass className="w-4 h-4 text-emerald-400" />;
      default: return <Clock className="w-4 h-4 text-sky-400" />;
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold mb-3">
          <CalendarDays className="w-3.5 h-3.5" />
          <span>Thuật Toán Tối Ưu Lịch Trình Di Sản & Ẩm Thực</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-serif font-bold text-stone-100">
          Thiết Kế Lịch Trình Văn Hóa Thông Minh
        </h2>
        <p className="text-stone-300 text-xs sm:text-sm mt-2">
          AI tự động sắp xếp thứ tự tham quan theo cung đường tối ưu, phù hợp giờ mở cửa và sở thích của bạn.
        </p>
      </div>

      {/* Input Form Panel */}
      <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 mb-10">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Destination */}
          <div>
            <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-2">
              Điểm đến:
            </label>
            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full bg-stone-950 border border-stone-700 text-stone-100 text-xs rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-amber-500"
            >
              <option value="Thành phố Huế">Thành phố Huế (Cố đô)</option>
              <option value="Hà Nội">Hà Nội (Thủ đô ngàn năm)</option>
              <option value="Phố cổ Hội An">Phố cổ Hội An & Mỹ Sơn</option>
              <option value="Ninh Bình">Ninh Bình (Tràng An - Hoa Lư)</option>
              <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh (Sài Gòn xưa & nay)</option>
              <option value="Đà Nẵng">Đà Nẵng & Điêu khắc Chăm</option>
            </select>
          </div>

          {/* Duration */}
          <div>
            <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-2">
              Thời lượng:
            </label>
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full bg-stone-950 border border-stone-700 text-stone-100 text-xs rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-amber-500"
            >
              <option value="1 ngày (Sáng đến Tối)">1 ngày (Trọn vẹn)</option>
              <option value="2 ngày 1 đêm">2 ngày 1 đêm</option>
              <option value="3 ngày 2 đêm">3 ngày 2 đêm</option>
            </select>
          </div>

          {/* Companion */}
          <div>
            <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-2">
              Đồng hành:
            </label>
            <select
              value={companion}
              onChange={(e) => setCompanion(e.target.value)}
              className="w-full bg-stone-950 border border-stone-700 text-stone-100 text-xs rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-amber-500"
            >
              <option value="Gia đình có trẻ em">Gia đình có trẻ em</option>
              <option value="Nhóm bạn trẻ / Sinh viên">Nhóm bạn trẻ / Sinh viên</option>
              <option value="Đi một mình / Du lịch tự túc">Đi một mình</option>
              <option value="Người lớn tuổi / Nghỉ dưỡng">Người lớn tuổi</option>
            </select>
          </div>

          {/* Budget */}
          <div>
            <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-2">
              Ngân sách:
            </label>
            <select
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full bg-stone-950 border border-stone-700 text-stone-100 text-xs rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-amber-500"
            >
              <option value="Tiết kiệm (Sinh viên)">Tiết kiệm</option>
              <option value="Vừa phải (Phổ thông)">Vừa phải</option>
              <option value="Thoải mái (Cao cấp)">Thoải mái</option>
            </select>
          </div>
        </div>

        {/* Interests Selection */}
        <div>
          <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-2">
            Sở thích & Ưu tiên:
          </label>
          <div className="flex flex-wrap gap-2">
            {interestOptions.map((opt) => {
              const active = interests.includes(opt);
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => handleToggleInterest(opt)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                    active
                      ? 'bg-amber-500 text-stone-950 font-bold shadow'
                      : 'bg-stone-950 text-stone-400 border border-stone-800 hover:border-stone-700'
                  }`}
                >
                  {active ? '✓ ' : '+ '}
                  {opt}
                </button>
              );
            })}
          </div>
        </div>

        {/* Generate Button */}
        <button
          id="btn-generate-itinerary"
          onClick={handleGenerate}
          disabled={loading}
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-bold text-sm shadow-xl shadow-amber-900/40 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin text-stone-950" />
              <span>AI đang tính toán cung đường & tối ưu hóa...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-stone-950" />
              <span>Tạo Lịch Trình Tối Ưu Tự Động</span>
            </>
          )}
        </button>

      </div>

      {/* Itinerary Result Display */}
      {itinerary && (
        <div className="bg-stone-900 border border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 animate-fadeIn">
          
          {/* Header */}
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-stone-800 pb-5">
            <div>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold">
                {itinerary.duration} • {itinerary.destination}
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-100 mt-2">
                {itinerary.title}
              </h3>
              <p className="text-xs text-stone-400 mt-1 flex items-center gap-1.5">
                <Car className="w-3.5 h-3.5 text-amber-400" />
                <span>{itinerary.routeSummary}</span>
              </p>
            </div>

            <button
              onClick={handleSaveItinerary}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow ${
                saved 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700'
              }`}
            >
              {saved ? <Check className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5 text-amber-400" />}
              <span>{saved ? 'Đã lưu vào bộ sưu tập' : 'Lưu lịch trình này'}</span>
            </button>
          </div>

          {/* AI Reasoning Box: "Vì sao AI sắp xếp như vậy?" */}
          <div className="p-5 bg-amber-950/30 border border-amber-500/40 rounded-2xl space-y-2">
            <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Vì sao AI sắp xếp lịch trình như vậy?</span>
            </h4>
            <p className="text-xs text-stone-300 leading-relaxed">
              {itinerary.aiOptimizationReasoning}
            </p>
          </div>

          {/* Timeline Route Slots */}
          <div className="space-y-4 pt-2">
            <h4 className="text-xs font-semibold text-stone-400 uppercase tracking-wider">
              Chi tiết các mốc thời gian:
            </h4>

            <div className="relative pl-6 sm:pl-8 border-l-2 border-amber-500/30 space-y-6">
              {itinerary.slots.map((slot, idx) => (
                <div key={idx} className="relative group">
                  
                  {/* Timeline Dot */}
                  <div className="absolute -left-[31px] sm:-left-[39px] top-0 w-6 h-6 rounded-full bg-stone-950 border-2 border-amber-500 flex items-center justify-center text-[10px] font-bold text-amber-400">
                    {idx + 1}
                  </div>

                  {/* Slot Card */}
                  <div className="p-4 bg-stone-950 rounded-2xl border border-stone-800 hover:border-amber-500/40 transition-all space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        {getActivityIcon(slot.activityType)}
                        <span className="text-xs font-bold text-amber-300">{slot.time}</span>
                        <span className="text-stone-500 text-xs">({slot.durationMinutes} phút)</span>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-stone-900 text-stone-300 border border-stone-800">
                        {slot.locationName}
                      </span>
                    </div>

                    <h5 className="font-serif font-bold text-stone-100 text-sm">{slot.title}</h5>
                    <p className="text-xs text-stone-300 leading-relaxed">{slot.description}</p>

                    {slot.tip && (
                      <div className="p-2 bg-stone-900/80 rounded-lg text-[11px] text-amber-200 border border-amber-500/20 flex items-center gap-1.5">
                        <Info className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span><strong>Mẹo AI:</strong> {slot.tip}</span>
                      </div>
                    )}

                    <div className="pt-2 flex justify-end">
                      <a
                        href={`https://maps.google.com/?q=${encodeURIComponent(slot.locationName + ' ' + itinerary.destination)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-medium"
                      >
                        <MapPin className="w-3 h-3 text-red-400" />
                        <span>Mở Google Maps chỉ đường</span>
                        <ExternalLink className="w-3 h-3 opacity-70" />
                      </a>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
