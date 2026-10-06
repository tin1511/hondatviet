import React from 'react';
import { 
  Compass, 
  Camera, 
  Sparkles, 
  MessageSquareQuote, 
  Utensils, 
  CalendarDays, 
  BookOpen, 
  Award, 
  Users, 
  Heart, 
  Globe, 
  Database,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';
import { UserProfile } from '../types';

interface CulturalToolsDashboardProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
  favoritesCount: number;
  userProfile: UserProfile;
}

export const CulturalToolsDashboard: React.FC<CulturalToolsDashboardProps> = ({
  currentTab,
  onNavigate,
  favoritesCount,
  userProfile
}) => {
  const tools = [
    {
      id: 'map',
      label: 'Bản Đồ Di Sản',
      description: 'Định vị danh lam & dẫn đường',
      icon: Globe,
      color: 'from-emerald-500 to-teal-600',
      textColor: 'text-emerald-400',
      bgLight: 'bg-emerald-500/10 border-emerald-500/20'
    },
    {
      id: 'recognizer',
      label: 'Nhận Diện AI',
      description: 'Chụp ảnh phân tích di tích',
      icon: Camera,
      color: 'from-amber-500 to-yellow-600',
      textColor: 'text-amber-400',
      bgLight: 'bg-amber-500/10 border-amber-500/20',
      badge: 'Vision'
    },
    {
      id: 'storyteller',
      label: 'Kể Chuyện AI',
      description: 'Nghe kể chuyện văn hóa xứ sở',
      icon: Sparkles,
      color: 'from-red-500 to-pink-600',
      textColor: 'text-red-400',
      bgLight: 'bg-red-500/10 border-red-500/20',
      badge: 'Audio'
    },
    {
      id: 'chat',
      label: 'HDV AI 3D',
      description: 'Hỏi đáp tương tác cùng hướng dẫn viên',
      icon: MessageSquareQuote,
      color: 'from-sky-500 to-blue-600',
      textColor: 'text-sky-400',
      bgLight: 'bg-sky-500/10 border-sky-500/20',
      badge: '3D Chat'
    },
    {
      id: 'food',
      label: 'Ăn Uống & Cafe',
      description: 'Đặc sản ẩm thực & điểm vui chơi bản địa',
      icon: Utensils,
      color: 'from-orange-500 to-amber-600',
      textColor: 'text-orange-400',
      bgLight: 'bg-orange-500/10 border-orange-500/20'
    },
    {
      id: 'itinerary',
      label: 'Lập Lịch Trình',
      description: 'Lên tour thông minh theo thời gian',
      icon: CalendarDays,
      color: 'from-yellow-500 to-orange-600',
      textColor: 'text-yellow-400',
      bgLight: 'bg-yellow-500/10 border-yellow-500/20',
      badge: 'AI Tour'
    },
    {
      id: 'crafts',
      label: 'Làng Nghề Cổ',
      description: 'Làng gốm, tranh đông hồ, nón lá',
      icon: BookOpen,
      color: 'from-teal-500 to-emerald-600',
      textColor: 'text-teal-400',
      bgLight: 'bg-teal-500/10 border-teal-500/20'
    },
    {
      id: 'learning',
      label: 'Quiz & Thử Thách',
      description: 'Trắc nghiệm văn hóa tích điểm',
      icon: Award,
      color: 'from-indigo-500 to-purple-600',
      textColor: 'text-indigo-400',
      bgLight: 'bg-indigo-500/10 border-indigo-500/20'
    },
    {
      id: 'community',
      label: 'Cộng Đồng',
      description: 'Chia sẻ câu chuyện & đóng góp ảnh',
      icon: Users,
      color: 'from-violet-500 to-fuchsia-600',
      textColor: 'text-violet-400',
      bgLight: 'bg-violet-500/10 border-violet-500/20'
    },
    {
      id: 'favorites',
      label: 'Yêu Thích',
      description: 'Các địa danh & ẩm thực đã lưu',
      icon: Heart,
      color: 'from-rose-500 to-red-600',
      textColor: 'text-rose-400',
      bgLight: 'bg-rose-500/10 border-rose-500/20',
      count: favoritesCount
    },
    {
      id: 'profile',
      label: 'Hồ Sơ & Danh Hiệu',
      description: 'Thứ hạng & bộ sưu tập danh hiệu',
      icon: Award,
      color: 'from-amber-400 to-yellow-600',
      textColor: 'text-amber-400',
      bgLight: 'bg-amber-500/10 border-amber-500/20',
      badge: `${userProfile.points || 0} XP`
    },
    {
      id: 'heritage',
      label: 'Danh Sách Di Sản',
      description: 'Tìm kiếm bộ lọc chuyên sâu',
      icon: Compass,
      color: 'from-slate-500 to-stone-600',
      textColor: 'text-stone-300',
      bgLight: 'bg-stone-500/10 border-stone-500/20'
    }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
      
      {/* Editorial Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <div className="text-[11px] font-bold text-amber-400 tracking-widest uppercase mb-1 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            Định Hướng Khám Phá
          </div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-100 flex items-center gap-2">
            <span>Bản Đồ Điều Hướng Tiện Ích Di Sản</span>
          </h2>
          <p className="text-xs text-stone-400 mt-0.5 hidden sm:block">
            Giao diện tổng quát giúp bạn đi đến bất cứ ứng dụng, bản đồ hay bộ công cụ văn hóa nào trong nháy mắt.
          </p>
        </div>
      </div>

      {/* Grid of Tools Optimized for Mobile Touch (2 columns on xs, 3 columns on sm, 4 on md, 6 on lg) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {tools.map((tool) => {
          const IconComponent = tool.icon;
          return (
            <button
              key={tool.id}
              onClick={() => onNavigate(tool.id)}
              className="flex flex-col items-start text-left p-4 rounded-2xl bg-stone-900/90 border border-stone-800 hover:border-amber-500/40 hover:bg-stone-800/80 transition-all duration-200 active:scale-95 group relative overflow-hidden h-[124px] cursor-pointer"
            >
              {/* Background Glow Effect */}
              <div className={`absolute -right-6 -bottom-6 w-16 h-16 rounded-full bg-gradient-to-br ${tool.color} opacity-5 blur-xl group-hover:opacity-15 transition-opacity`} />

              {/* Icon Container with subtle native accent coloring */}
              <div className={`p-2.5 rounded-xl ${tool.bgLight} border group-hover:scale-105 transition-transform shrink-0 mb-3`}>
                <IconComponent className="w-5 h-5 text-amber-400" />
              </div>

              {/* Text Area */}
              <div className="min-w-0 w-full">
                <div className="flex items-center gap-1">
                  <span className="font-serif font-bold text-[13px] sm:text-[14px] text-stone-100 group-hover:text-amber-300 transition-colors truncate">
                    {tool.label}
                  </span>
                  
                  {/* Small Badges/Counters */}
                  {tool.count !== undefined && tool.count > 0 && (
                    <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-red-500 text-white font-bold shrink-0">
                      {tool.count}
                    </span>
                  )}

                  {tool.badge && (
                    <span className="text-[9px] px-1 bg-amber-500/20 text-amber-400 rounded-md border border-amber-500/30 font-bold uppercase scale-90 origin-left shrink-0">
                      {tool.badge}
                    </span>
                  )}
                </div>

                <p className="text-[10px] text-stone-400 group-hover:text-stone-300 mt-1 line-clamp-2 leading-snug font-normal">
                  {tool.description}
                </p>
              </div>

              {/* Tiny Direction Arrow in corner */}
              <div className="absolute right-3.5 bottom-3.5 text-stone-600 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all opacity-0 group-hover:opacity-100">
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
