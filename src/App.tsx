import React, { useState, useEffect } from 'react';
import { 
  Compass, 
  Camera, 
  Volume2, 
  MessageSquareQuote, 
  MapPin, 
  Utensils, 
  CalendarDays, 
  FolderHeart, 
  BookOpen, 
  Sparkles, 
  Users, 
  ShieldCheck, 
  ChevronRight,
  Globe,
  Award,
  Heart,
  Share2,
  Layers,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Mic,
  History,
  UserCheck,
  Eye,
  EyeOff
} from 'lucide-react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ImageRecognizer } from './components/ImageRecognizer';
import { StoryPlayer } from './components/StoryPlayer';
import { AIChatAssistant } from './components/AIChatAssistant';
import { CulturalMap } from './components/CulturalMap';
import { FoodAndEntertainmentModule } from './components/FoodAndEntertainmentModule';
import { ItineraryPlanner } from './components/ItineraryPlanner';
import { GrandparentMemoryRecorder } from './components/GrandparentMemoryRecorder';
import { TraditionalCraftsAndArts } from './components/TraditionalCraftsAndArts';
import { HeritageLearning } from './components/HeritageLearning';
import { CommunityContributionModule } from './components/CommunityContribution';
import { AdminDashboard } from './components/AdminDashboard';
import { FavoritesView } from './components/FavoritesView';
import { UserProfileView } from './components/UserProfileView';
import { NearbyRecommendationWidget } from './components/NearbyRecommendationWidget';
import { AuthModal } from './components/AuthModal';
import { AuthGateway } from './components/AuthGateway';
import { CityLandmarkModal } from './components/CityLandmarkModal';
import { HeritageItem, UserProfile, CityLandmarkBackground } from './types';
import { HERITAGE_DATABASE } from './data/vietnamHeritageData';
import { storageService } from './services/storageService';
import { geolocationService, CITY_LANDMARK_PRESETS } from './services/geolocationService';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [language, setLanguage] = useState<string>('vi');
  const [favoritesCount, setFavoritesCount] = useState<number>(2);
  const [userProfile, setUserProfile] = useState<UserProfile>(storageService.getUserProfile());

  // Dynamic GPS Landmark Background for the entire website
  const [currentLandmark, setCurrentLandmark] = useState<CityLandmarkBackground>(CITY_LANDMARK_PRESETS[0]);
  const [isDetectingGps, setIsDetectingGps] = useState<boolean>(false);
  const [locationSource, setLocationSource] = useState<'gps' | 'preset' | 'default'>('default');
  const [detectedLocationName, setDetectedLocationName] = useState<string>('Hà Nội');
  const [showCityPicker, setShowCityPicker] = useState<boolean>(false);
  const [gpsError, setGpsError] = useState<string | null>(null);
  const [isPeekingBackground, setIsPeekingBackground] = useState<boolean>(false);

  // Auth Modal State
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'register' | 'profile' | 'activity'>('login');

  // Cross-component state transfers
  const [storyInitialTopic, setStoryInitialTopic] = useState<{
    name: string;
    history?: string;
    period?: string;
  } | undefined>(undefined);

  const [selectedFoodHeritageId, setSelectedFoodHeritageId] = useState<string>('dai-noi-hue');
  const [chatContextHeritage, setChatContextHeritage] = useState<HeritageItem | null>(null);

  // Auto-detect GPS and match city's iconic landmark on app load
  useEffect(() => {
    const saved = geolocationService.getLastKnownLocation();
    if (saved) {
      const landmark = geolocationService.getCityLandmarkForCoordinates(saved.lat, saved.lng);
      setCurrentLandmark(landmark);
      setDetectedLocationName(landmark.cityName);
      setLocationSource(saved.source === 'gps' ? 'gps' : 'preset');
    }

    const detectGps = async () => {
      try {
        const res = await geolocationService.requestCurrentPosition();
        if (res.success && res.location) {
          const landmark = geolocationService.getCityLandmarkForCoordinates(res.location.lat, res.location.lng);
          setCurrentLandmark(landmark);
          setLocationSource('gps');
          const reverseName = await geolocationService.reverseGeocodeCity(res.location.lat, res.location.lng);
          setDetectedLocationName(reverseName || landmark.cityName);
        }
      } catch {
        // Fallback gracefully to default
      }
    };

    detectGps();
  }, []);

  // Scroll to top immediately whenever activeTab changes so user never has to scroll down
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [activeTab]);

  const handleDetectGps = async () => {
    setIsDetectingGps(true);
    setGpsError(null);
    try {
      const res = await geolocationService.requestCurrentPosition();
      if (res.success && res.location) {
        const landmark = geolocationService.getCityLandmarkForCoordinates(res.location.lat, res.location.lng);
        setCurrentLandmark(landmark);
        setLocationSource('gps');
        const reverseName = await geolocationService.reverseGeocodeCity(res.location.lat, res.location.lng);
        setDetectedLocationName(reverseName || landmark.cityName);
      } else if (res.error) {
        setGpsError(res.error);
      }
    } catch {
      setGpsError('Không thể lấy tọa độ GPS từ trình duyệt.');
    } finally {
      setIsDetectingGps(false);
    }
  };

  const handleSelectLandmarkPreset = (landmark: CityLandmarkBackground) => {
    setCurrentLandmark(landmark);
    setDetectedLocationName(landmark.cityName);
    setLocationSource('preset');
    setShowCityPicker(false);
    setGpsError(null);

    storageService.logActivity({
      actionType: 'landmark',
      title: 'Đổi ảnh nền danh thắng',
      description: `Đã đổi cảnh sắc sang "${landmark.landmarkName}" (${landmark.cityName} - ${landmark.province})`,
      targetId: landmark.id,
      pointsEarned: 5
    });
  };

  useEffect(() => {
    setFavoritesCount(storageService.getFavorites().length);
    setUserProfile(storageService.getUserProfile());
  }, [activeTab]);

  const handleOpenAuthModal = (tab: 'login' | 'register' | 'profile' | 'activity' = 'login') => {
    setAuthModalTab(tab);
    setAuthModalOpen(true);
  };

  const handleLogout = () => {
    const guest = storageService.logout();
    setUserProfile(guest);
    setAuthModalOpen(false);
  };

  const handleNavigate = (tab: string, heritageId?: string) => {
    if (tab === 'heritage') {
      if (heritageId) {
        setSelectedFoodHeritageId(heritageId);
      }
      setActiveTab('map');
    } else if (tab === 'recognizer') {
      setActiveTab('recognize');
    } else if (tab === 'storyteller') {
      setActiveTab('story');
    } else if (tab === 'grandparents') {
      setActiveTab('grandparent');
    } else if (tab === 'learning') {
      setActiveTab('quiz');
    } else if (tab === 'profile' || tab === 'badges') {
      setActiveTab('profile');
      setAuthModalOpen(false);
    } else if (tab === 'activity' || tab === 'history') {
      setActiveTab('profile');
      setAuthModalOpen(false);
    } else {
      setActiveTab(tab);
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  const handleNavigateToStory = (name: string, history?: string, period?: string) => {
    setStoryInitialTopic({ name, history, period });
    setActiveTab('story');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToFood = (heritageId: string) => {
    setSelectedFoodHeritageId(heritageId);
    setActiveTab('food');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectHeritage = (heritage: HeritageItem) => {
    setSelectedFoodHeritageId(heritage.id);
    setChatContextHeritage(heritage);
  };

  const handleUserChange = (user: UserProfile) => {
    setUserProfile(user);
    setFavoritesCount(storageService.getFavorites().length);
  };

  // If user is not logged in, enforce authentication before accessing the application
  if (!userProfile.isLoggedIn) {
    return <AuthGateway onLoginSuccess={handleUserChange} />;
  }

  return (
    <div className="min-h-screen text-stone-100 flex flex-col font-sans selection:bg-amber-500 selection:text-stone-950 relative">
      
      {/* 🖼️ Toàn bộ trang web dùng ảnh danh thắng làm background thay vì màu nền đơn điệu */}
      <div 
        onClick={() => isPeekingBackground && setIsPeekingBackground(false)}
        className="fixed inset-0 pointer-events-auto z-0 overflow-hidden select-none cursor-pointer"
        title={isPeekingBackground ? "Chạm để quay lại giao diện" : undefined}
      >
        <img
          key={currentLandmark.id + currentLandmark.imageUrl}
          src={currentLandmark.imageUrl}
          alt={currentLandmark.landmarkName}
          referrerPolicy="no-referrer"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=2000&q=85';
          }}
          className={`w-full h-full object-cover object-center transition-all duration-700 ease-out brightness-95 contrast-105 ${
            isPeekingBackground ? 'scale-105 brightness-100' : 'scale-100'
          }`}
        />
        {/* Lớp phủ mờ nhẹ nhàng tinh chỉnh cho điện thoại: Giúp ảnh danh thắng hiện rõ ràng, tươi sáng */}
        <div className={`absolute inset-0 transition-opacity duration-500 ${isPeekingBackground ? 'opacity-0 bg-transparent' : 'bg-black/20 sm:bg-black/40'}`} />
        <div className={`absolute inset-0 transition-opacity duration-500 ${isPeekingBackground ? 'opacity-0' : 'bg-gradient-to-t from-stone-950/75 via-transparent to-stone-950/20 sm:from-stone-950/95 sm:to-stone-950/40'}`} />
        <div className={`absolute inset-0 transition-opacity duration-500 ${isPeekingBackground ? 'opacity-0' : 'bg-gradient-to-r from-stone-950/50 via-transparent to-stone-950/30 sm:from-stone-950/80 sm:to-stone-950/70'}`} />
      </div>

      {/* Main UI Body Wrapper with Peeking Toggle */}
      <div className={`relative z-10 flex-1 flex flex-col justify-between transition-all duration-300 ${
        isPeekingBackground ? 'opacity-0 pointer-events-none scale-98 invisible' : 'opacity-100 pointer-events-auto scale-100'
      }`}>

        {/* Navigation Bar */}
      <div className="relative z-40">
        <Navbar
          currentTab={activeTab}
          onSelectTab={handleNavigate}
          favoritesCount={favoritesCount}
          userProfile={userProfile}
          language={language}
          onLanguageChange={setLanguage}
          onOpenAuthModal={handleOpenAuthModal}
          onLogout={handleLogout}
        />
      </div>

      {/* Main Content Body */}
      <main className="flex-1 relative z-10">
        
        {/* VIEW 1: HOME LANDING */}
        {activeTab === 'home' && (
          <div className="space-y-16 pb-20">
            
            {/* Hero Section */}
            <HeroSection
              onNavigate={handleNavigate}
              onSelectHeritage={handleSelectHeritage}
              currentLandmark={currentLandmark}
              detectedLocationName={detectedLocationName}
              locationSource={locationSource}
              isDetectingGps={isDetectingGps}
              gpsError={gpsError}
              onDetectGps={handleDetectGps}
              onOpenCityPicker={() => setShowCityPicker(true)}
            />

            {/* Geolocation-Based Nearby Heritage & Places Recommender */}
            <section id="gps-nearby-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <NearbyRecommendationWidget
                onSelectHeritage={handleSelectHeritage}
                onNavigateToFood={(heritageId) => handleNavigate('food', heritageId)}
                onNavigateToMap={() => handleNavigate('map')}
              />
            </section>

            {/* Featured Heritage Highlights */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold mb-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Di Sản Tiêu Biểu</span>
                  </div>
                  <h3 className="text-2xl sm:text-4xl font-serif font-bold text-stone-100">
                    Báu Vật Ngàn Năm Của Dân Tộc
                  </h3>
                </div>

                <button
                  onClick={() => handleNavigate('map')}
                  className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 transition-colors"
                >
                  <span>Xem tất cả trên bản đồ</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {HERITAGE_DATABASE.slice(0, 3).map((item) => (
                  <div
                    key={item.id}
                    className="bg-stone-900 border border-stone-800 hover:border-amber-500/40 rounded-3xl overflow-hidden shadow-xl transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div>
                      <div className="relative h-48 w-full overflow-hidden bg-stone-950">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-stone-950/80 text-amber-300 border border-amber-500/30 backdrop-blur font-semibold">
                            {item.categoryLabel}
                          </span>
                        </div>
                        <div className="absolute bottom-3 left-3 text-[11px] text-white flex items-center gap-1 bg-black/60 px-2 py-0.5 rounded backdrop-blur">
                          <MapPin className="w-3 h-3 text-red-400" />
                          <span>{item.province}</span>
                        </div>
                      </div>

                      <div className="p-5 space-y-2.5">
                        <h4 className="font-serif font-bold text-stone-100 text-lg group-hover:text-amber-300 transition-colors">
                          {item.name}
                        </h4>
                        <p className="text-xs text-stone-300 line-clamp-3 leading-relaxed">
                          {item.culturalSignificance}
                        </p>
                      </div>
                    </div>

                    <div className="p-5 pt-0 grid grid-cols-2 gap-2 border-t border-stone-800/80 mt-2">
                      <button
                        onClick={() => handleNavigateToStory(item.name, item.history, item.period)}
                        className="py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow transition-all"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Nghe kể chuyện</span>
                      </button>

                      <button
                        onClick={() => handleNavigateToFood(item.id)}
                        className="py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-300 font-semibold text-xs flex items-center justify-center gap-1.5 border border-stone-700 transition-all"
                      >
                        <Utensils className="w-3.5 h-3.5" />
                        <span>Ăn uống gần đây</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* AI Experience Showcase Bento */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none"></div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                  <div className="lg:col-span-5 space-y-4">
                    <span className="text-[11px] font-bold text-amber-400 uppercase tracking-widest px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full">
                      Hệ Thống Lưu Trữ Cá Nhân & Điểm Văn Hóa
                    </span>
                    <h3 className="font-serif font-bold text-2xl sm:text-3xl text-stone-100 leading-tight">
                      Đồng Hành & Lưu Trữ Mọi Hành Trình Di Sản Của Bạn
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                      Mỗi thao tác nhận diện ảnh chụp bằng AI, nghe kể chuyện lịch sử, hoàn thành câu đố văn hóa hay lập kế hoạch du lịch đều được tự động ghi lại trong hồ sơ cá nhân với hệ thống điểm thưởng XP và danh hiệu di sản.
                    </p>
                    <div className="pt-2 flex flex-wrap gap-3">
                      <button
                        onClick={() => setActiveTab('profile')}
                        className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-bold text-xs shadow-lg flex items-center gap-2 cursor-pointer"
                      >
                        <Award className="w-4 h-4 text-stone-950" />
                        <span>Xem Bảng Danh Hiệu & Hồ Sơ</span>
                      </button>

                      <button
                        onClick={() => handleOpenAuthModal(userProfile.isLoggedIn ? 'profile' : 'login')}
                        className="px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold text-xs border border-stone-700 flex items-center gap-2 cursor-pointer"
                      >
                        <UserCheck className="w-4 h-4 text-amber-400" />
                        <span>{userProfile.isLoggedIn ? 'Tài Khoản Cá Nhân' : 'Đăng Nhập / Đăng Ký'}</span>
                      </button>
                    </div>
                  </div>

                  <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div 
                      onClick={() => handleNavigate('recognizer')}
                      className="p-5 rounded-2xl bg-stone-950 border border-stone-800 hover:border-amber-500/50 cursor-pointer transition-all group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
                        <Camera className="w-5 h-5" />
                      </div>
                      <h4 className="font-serif font-bold text-base text-stone-100 group-hover:text-amber-400">
                        AI Nhận Diện Thị Giác
                      </h4>
                      <p className="text-xs text-stone-400 mt-1">
                        Chụp ảnh di tích, đồ cổ, trang phục cổ hay món ăn để biết ngay tên gọi, niên đại và ý nghĩa lịch sử.
                      </p>
                    </div>

                    <div 
                      onClick={() => handleNavigate('storyteller')}
                      className="p-5 rounded-2xl bg-stone-950 border border-stone-800 hover:border-amber-500/50 cursor-pointer transition-all group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-3">
                        <Volume2 className="w-5 h-5" />
                      </div>
                      <h4 className="font-serif font-bold text-base text-stone-100 group-hover:text-amber-400">
                        AI Kể Chuyện Đa Đối Tượng
                      </h4>
                      <p className="text-xs text-stone-400 mt-1">
                        Lắng nghe giọng kể truyền cảm phù hợp với trẻ em, học sinh, nhà nghiên cứu hay du khách quốc tế.
                      </p>
                    </div>

                    <div 
                      onClick={() => handleNavigate('itinerary')}
                      className="p-5 rounded-2xl bg-stone-950 border border-stone-800 hover:border-amber-500/50 cursor-pointer transition-all group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center mb-3">
                        <CalendarDays className="w-5 h-5" />
                      </div>
                      <h4 className="font-serif font-bold text-base text-stone-100 group-hover:text-amber-400">
                        Lập Lịch Trình Tự Động
                      </h4>
                      <p className="text-xs text-stone-400 mt-1">
                        Lên kế hoạch du lịch văn hóa theo thời gian, ngân sách, tích hợp Google Places lân cận.
                      </p>
                    </div>

                    <div 
                      onClick={() => handleNavigate('grandparents')}
                      className="p-5 rounded-2xl bg-stone-950 border border-stone-800 hover:border-amber-500/50 cursor-pointer transition-all group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center mb-3">
                        <Mic className="w-5 h-5" />
                      </div>
                      <h4 className="font-serif font-bold text-base text-stone-100 group-hover:text-amber-400">
                        Lưu Giữ Ký Ức Gia Đình
                      </h4>
                      <p className="text-xs text-stone-400 mt-1">
                        Ghi âm lời kể của ông bà, lưu giữ những câu chuyện dân gian và truyền thống ngàn xưa.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

          </div>
        )}

        {/* VIEW 2: AI RECOGNITION */}
        {(activeTab === 'recognize' || activeTab === 'recognizer') && (
          <ImageRecognizer
            onNavigateToStory={handleNavigateToStory}
            onNavigateToFood={handleNavigateToFood}
            onNavigateToMap={() => setActiveTab('map')}
            onAskChatbot={(q) => handleNavigate('chat')}
          />
        )}

        {/* VIEW 3: AI STORYTELLER */}
        {(activeTab === 'story' || activeTab === 'storyteller') && (
          <StoryPlayer
            initialHeritageName={storyInitialTopic?.name}
            initialHistory={storyInitialTopic?.history}
            initialPeriod={storyInitialTopic?.period}
            onSelectHeritageForPlaces={handleNavigateToFood}
          />
        )}

        {/* VIEW 4: AI CULTURAL CHAT */}
        {activeTab === 'chat' && (
          <AIChatAssistant
            initialContext={chatContextHeritage}
            language={language}
          />
        )}

        {/* VIEW 5: CULTURAL MAP */}
        {activeTab === 'map' && (
          <CulturalMap
            onNavigateToStory={handleNavigateToStory}
            onNavigateToFood={handleNavigateToFood}
          />
        )}

        {/* VIEW 6: FOOD & ENTERTAINMENT NEAR HERITAGE */}
        {activeTab === 'food' && (
          <FoodAndEntertainmentModule
            initialHeritageId={selectedFoodHeritageId}
            onNavigateToHeritage={(hId) => {
              setActiveTab('map');
            }}
          />
        )}

        {/* VIEW 7: SMART ITINERARY PLANNER */}
        {activeTab === 'itinerary' && (
          <ItineraryPlanner
            onNavigateToFood={handleNavigateToFood}
          />
        )}

        {/* VIEW 8: GRANDPARENT MEMORY RECORDER */}
        {(activeTab === 'grandparent' || activeTab === 'grandparents') && (
          <GrandparentMemoryRecorder />
        )}

        {/* VIEW 9: CRAFTS & TRADITIONAL ARTS */}
        {activeTab === 'crafts' && (
          <TraditionalCraftsAndArts />
        )}

        {/* VIEW 10: QUIZ & HISTORICAL TIMELINE */}
        {(activeTab === 'quiz' || activeTab === 'learning') && (
          <HeritageLearning />
        )}

        {/* VIEW 11: COMMUNITY CONTRIBUTIONS */}
        {activeTab === 'community' && (
          <CommunityContributionModule />
        )}

        {/* VIEW 12: FAVORITES & SAVED ITEMS */}
        {activeTab === 'favorites' && (
          <FavoritesView
            onNavigateToStory={handleNavigateToStory}
            onNavigateToFood={handleNavigateToFood}
            onNavigateToMap={() => setActiveTab('map')}
            onNavigateToTab={handleNavigate}
          />
        )}

        {/* VIEW 13: ADMIN DASHBOARD */}
        {activeTab === 'admin' && (
          <AdminDashboard
            currentUser={userProfile}
            onUserChange={handleUserChange}
          />
        )}

        {/* VIEW 14: USER PROFILE & HERITAGE BADGES */}
        {(activeTab === 'profile' || activeTab === 'badges') && (
          <UserProfileView
            currentUser={userProfile}
            onUserChange={handleUserChange}
            onNavigateTab={handleNavigate}
          />
        )}

      </main>

      {/* Auth & Profile & Activity History Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialTab={authModalTab}
        onUserChange={handleUserChange}
        onNavigateTab={handleNavigate}
      />

      {/* Footer */}
      <footer className="relative z-10 bg-stone-950/85 backdrop-blur-md border-t border-stone-800/80 py-12 px-4 sm:px-6 lg:px-8 text-xs text-stone-400">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-500 to-red-600 flex items-center justify-center font-serif font-bold text-stone-950 text-xs">
                H
              </div>
              <span className="font-serif font-bold text-stone-100 text-base tracking-wider">HERITAGEAI</span>
            </div>
            <p className="text-stone-400 text-xs max-w-md leading-relaxed">
              Nền tảng trí tuệ nhân tạo đồng hành khám phá, bảo tồn và lan tỏa giá trị di sản văn hóa, lịch sử và trải nghiệm du lịch Việt Nam.
            </p>
            <p className="text-[11px] text-stone-500">
              Phát triển với sự trân trọng đối với 4.000 năm lịch sử hào hùng và nguồn tư liệu lịch sử dân tộc.
            </p>
          </div>

          <div className="space-y-2">
            <h5 className="font-semibold text-amber-300 uppercase tracking-wider text-[11px]">Chức năng cốt lõi</h5>
            <ul className="space-y-1.5">
              <li><button onClick={() => handleNavigate('recognizer')} className="hover:text-amber-400">Nhận diện di sản bằng AI Vision</button></li>
              <li><button onClick={() => handleNavigate('storyteller')} className="hover:text-amber-400">Nghe AI kể chuyện văn hóa</button></li>
              <li><button onClick={() => handleNavigate('food')} className="hover:text-amber-400">Ăn uống & vui chơi gần di sản</button></li>
              <li><button onClick={() => handleNavigate('itinerary')} className="hover:text-amber-400">Lập lịch trình du lịch thông minh</button></li>
              <li><button onClick={() => handleNavigate('grandparents')} className="hover:text-amber-400">Lưu giữ ký ức ông bà</button></li>
            </ul>
          </div>

          <div className="space-y-2">
            <h5 className="font-semibold text-amber-300 uppercase tracking-wider text-[11px]">Tài khoản & Thiết bị</h5>
            <ul className="space-y-1.5 text-stone-400 text-[11px]">
              <li><button onClick={() => handleOpenAuthModal('login')} className="hover:text-amber-400">Đăng nhập / Đăng ký tài khoản</button></li>
              <li><button onClick={() => setActiveTab('profile')} className="hover:text-amber-400">Xem điểm văn hóa & danh hiệu</button></li>
              <li><button onClick={() => handleOpenAuthModal('activity')} className="hover:text-amber-400">Lịch sử thao tác thiết bị</button></li>
              <li><button onClick={() => handleNavigate('favorites')} className="hover:text-amber-400">Bộ sưu tập di sản đã lưu</button></li>
            </ul>
          </div>

        </div>

        <div className="max-w-7xl mx-auto pt-6 border-t border-stone-800/80 flex flex-wrap items-center justify-between gap-4 text-[11px] text-stone-500">
          <span>&copy; 2026 HERITAGEAI. Tự hào Di sản Việt Nam.</span>
          <div className="flex items-center gap-4">
            <span>Dữ liệu đối chiếu: Đại Việt Sử Ký Toàn Thư, UNESCO & Google Places</span>
          </div>
        </div>
      </footer>
      </div>

      {/* 📱 Floating Control for Mobile & Desktop Background Peeking & Landmark Changing */}
      {!isPeekingBackground ? (
        <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsPeekingBackground(true)}
            className="group flex items-center gap-1.5 px-3 py-2 rounded-full bg-stone-950/90 hover:bg-amber-950 text-amber-300 border border-amber-500/50 shadow-2xl backdrop-blur-md text-xs font-bold transition-all active:scale-95 cursor-pointer ring-1 ring-amber-500/30"
            title="Ẩn giao diện để chiêm ngưỡng trọn vẹn bức ảnh nền danh thắng"
          >
            <Eye className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline">Ngắm ảnh nền</span>
            <span className="sm:hidden">Xem ảnh</span>
          </button>

          <button
            type="button"
            onClick={() => setShowCityPicker(true)}
            className="group flex items-center gap-2 px-3 py-2 rounded-full bg-stone-900/90 hover:bg-stone-800 text-stone-200 border border-stone-700/80 hover:border-amber-400/60 shadow-2xl backdrop-blur-md text-xs font-bold transition-all active:scale-95 cursor-pointer"
            title="Đổi ảnh nền danh thắng các tỉnh thành khác"
          >
            <div className="relative flex h-2.5 w-2.5 shrink-0">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${locationSource === 'gps' ? 'bg-emerald-400' : 'bg-amber-400'} opacity-75`} />
              <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${locationSource === 'gps' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
            </div>
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-semibold text-amber-300 max-w-[110px] sm:max-w-[140px] truncate">{detectedLocationName}</span>
          </button>
        </div>
      ) : (
        <div 
          onClick={() => setIsPeekingBackground(false)}
          className="fixed top-4 left-4 right-4 z-50 flex items-center justify-between px-4 py-3 rounded-2xl bg-stone-950/85 border border-amber-500/50 backdrop-blur-lg shadow-2xl text-xs cursor-pointer animate-in fade-in slide-in-from-top-4 duration-300"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <div className="truncate">
              <p className="font-bold text-stone-100 truncate">
                {currentLandmark.landmarkName}
              </p>
              <p className="text-[11px] text-amber-300 truncate">
                {detectedLocationName} • {currentLandmark.tagline}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsPeekingBackground(false);
            }}
            className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shrink-0 shadow-md transition-colors flex items-center gap-1.5"
          >
            <EyeOff className="w-3.5 h-3.5" />
            <span>Hiện lại giao diện</span>
          </button>
        </div>
      )}

      {/* Modal: Khám phá & Chọn ảnh danh thắng Việt Nam làm hình nền trang web */}
      <CityLandmarkModal
        isOpen={showCityPicker}
        onClose={() => setShowCityPicker(false)}
        currentLandmark={currentLandmark}
        onSelectLandmark={handleSelectLandmarkPreset}
        onDetectGps={handleDetectGps}
        isDetectingGps={isDetectingGps}
      />

    </div>
  );
}
