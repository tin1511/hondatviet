import React, { useState } from 'react';
import { 
  Sparkles, 
  BookOpen, 
  Clock, 
  Award, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Layers, 
  RefreshCw, 
  Info,
  ShieldCheck,
  ChevronRight,
  ArrowLeftRight
} from 'lucide-react';
import { QUIZ_TOPICS, TIMELINE_MILESTONES, PAST_AND_PRESENT } from '../data/vietnamHeritageData';
import { storageService } from '../services/storageService';
import { QuizTopic, QuizQuestion, TimelineMilestone, PastAndPresentItem } from '../types';
import { useLanguage } from '../hooks/useLanguage';

interface HeritageLearningProps {
  language?: string;
}

export const HeritageLearning: React.FC<HeritageLearningProps> = () => {
  const { language } = useLanguage();
  const isEnglish = language === 'en';
  const ui = (vi: string, en: string) => isEnglish ? en : vi;
  const topicTitle = (id: string, original: string) => isEnglish ? ({ 'quiz-hue': 'Explore Hue Imperial Capital & Nguyen Dynasty', 'quiz-hanoi': 'A Millennium of Thang Long - Hanoi' } as Record<string, string>)[id] || original : original;
  const topicRegion = (region: string) => isEnglish ? ({ 'Miền Trung': 'Central Vietnam', 'Miền Bắc': 'Northern Vietnam' } as Record<string, string>)[region] || region : region;
  const quizText: Record<string, { question: string; options: string[]; explanation: string; note: string }> = {
    'q-hue-1': { question: 'How many gates does Ngo Mon Gate in Hue have, and who was the central gate reserved for?', options: ['Three gates, for first-rank mandarins', 'Five gates; the central gate was reserved exclusively for the Emperor', 'Four gates; the central gate was for the Empress Dowager', 'Six gates, divided equally between civil and military mandarins'], explanation: 'Ngo Mon has five passageways. The central stone-paved gate was reserved for the emperor; the two inner side gates were for civil and military mandarins, while the outer gates were for soldiers and elephants or horses.', note: 'The division of passageways reflected the strict ceremonial hierarchy of East Asian imperial courts.' },
    'q-hue-2': { question: 'Which Hue heritage was recognized by UNESCO in 2003 as Vietnam’s first intangible heritage?', options: ['Ca tru singing', 'Hue tuong opera', 'Hue royal court music', 'Royal cup dance'], explanation: 'Hue royal court music was recognized by UNESCO in 2003 as a Masterpiece of the Oral and Intangible Heritage of Humanity.', note: 'Royal court music reached a high point under Emperors Minh Mang and Tu Duc.' },
    'q-hue-3': { question: 'How many storeys does the famous Phuoc Duyen Tower at Thien Mu Pagoda have?', options: ['5 storeys', '7 storeys', '9 storeys', '12 storeys'], explanation: 'The octagonal Phuoc Duyen Tower has seven storeys and is 21 metres tall. It was built in 1844 under Emperor Thieu Tri.', note: 'The seven storeys are associated with Buddhist symbolism.' },
    'q-hue-4': { question: 'Which humble Hue specialty is associated with the verse about the moon rising over Con Hen?', options: ['Hue beef noodle soup', 'Hen rice and Con Hen sweet corn dessert', 'Nam Pho thick noodle soup', 'Banh khoai savory pancake'], explanation: 'Con Hen mussel rice combines spicy stir-fried mussels, crispy pork fat, herbs, banana blossom and fermented shrimp paste for a distinctive Hue flavor.', note: 'It is a beloved local dish associated with the Nguyen-era imperial capital.' },
    'q-hue-5': { question: 'What do the Nine Dynastic Urns at The Mieu in Hue Imperial City symbolize?', options: ['Nine abundant harvest seasons', 'Unified sovereignty, the enduring realm, and the country’s land and islands', 'The remains of nine emperors', 'Rainwater storage for the Forbidden City'], explanation: 'Cast in 1835 under Emperor Minh Mang, the Nine Dynastic Urns feature 153 images of landscapes, animals, rivers, mountains and the East Sea, including Hoang Sa and Truong Sa.', note: 'They are among Vietnam’s unique National Treasures.' },
    'q-hn-1': { question: 'Under which dynasty was the Temple of Literature - Imperial Academy established?', options: ['Tran Dynasty', 'Ly Dynasty (1070 and 1076)', 'Later Le Dynasty', 'Dinh Dynasty'], explanation: 'The Temple of Literature was built in 1070 under Emperor Ly Thanh Tong, and the Imperial Academy was established in 1076 under Emperor Ly Nhan Tong.', note: 'It laid the foundations for Vietnam’s first formal national higher-education institution.' },
    'q-hn-2': { question: 'Which river flows beside Bat Trang pottery village in Hanoi?', options: ['Day River', 'Red River', 'Nhue River', 'To Lich River'], explanation: 'Bat Trang pottery village lies on the left bank of the Red River, a location that supported convenient river trade for centuries.', note: 'Bat Trang’s crackle and blue-glazed ceramics are celebrated Vietnamese craft traditions.' },
    'q-hn-3': { question: 'Which Hanoi landmark resembles a lotus blooming on the water?', options: ['Tran Quoc Pagoda', 'One Pillar Pagoda (Dien Huu Pagoda)', 'Turtle Tower', 'Khue Van Pavilion'], explanation: 'One Pillar Pagoda was built in 1049 under Emperor Ly Thai Tong and was inspired by a dream of the Goddess of Mercy seated on a lotus.', note: 'It is a distinctive masterpiece of Vietnamese spiritual architecture.' }
  };
  const questionText = (q: QuizQuestion) => isEnglish ? quizText[q.id] : undefined;
  const [activeTab, setActiveTab] = useState<'quiz' | 'timeline' | 'past_present'>('quiz');

  // Quiz State
  const [selectedTopic, setSelectedTopic] = useState<QuizTopic>(QUIZ_TOPICS[0]);
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  // Past vs Present Slider
  const [selectedComparison, setSelectedComparison] = useState<PastAndPresentItem>(PAST_AND_PRESENT[0]);
  const [sliderPosition, setSliderPosition] = useState<number>(50);

  const currentQuestion: QuizQuestion = selectedTopic.questions[currentQIndex];

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);
    if (idx === currentQuestion.correctIndex) {
      setScore(s => s + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQIndex < selectedTopic.questions.length - 1) {
      setCurrentQIndex(i => i + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setQuizFinished(true);
      const finalScore = score + (selectedOption === currentQuestion.correctIndex ? 1 : 0);
      const total = selectedTopic.questions.length;
      const percent = Math.round((finalScore / total) * 100);

      storageService.logActivity({
        actionType: 'quiz',
        title: 'Hoàn thành Thử Thách Quiz',
        description: `Chủ đề "${selectedTopic.title}": Đạt ${finalScore}/${total} câu đúng (${percent}%)`,
        targetId: selectedTopic.id,
        pointsEarned: 30 + finalScore * 10
      });
    }
  };

  const handleRestartQuiz = (topic?: QuizTopic) => {
    if (topic) setSelectedTopic(topic);
    setCurrentQIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setQuizFinished(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold mb-3">
          <BookOpen className="w-3.5 h-3.5" />
          <span>{ui('Học Tập & Tìm Hiểu Lịch Sử Tương Tác', 'Interactive History & Heritage Learning')}</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-serif font-bold text-stone-100">
          {ui('Quiz Di Sản, Dòng Thời Gian & Xưa - Nay', 'Heritage Quizzes, Historical Timeline & Past vs. Present')}
        </h2>
        <p className="text-stone-300 text-xs sm:text-sm mt-2">
          {ui('Học lịch sử Việt Nam qua các câu đố sinh động, đối chiếu hình ảnh phục dựng và du hành qua 4.000 năm văn hiến.', 'Explore Vietnamese history through engaging quizzes, reconstructed imagery, and a journey across 4,000 years of cultural heritage.')}
        </p>
      </div>

      {/* Main Tab Switcher */}
      <div className="flex justify-center mb-8">
        <div className="bg-stone-900 border border-stone-800 p-1.5 rounded-2xl inline-flex gap-1.5 shadow-lg">
          <button
            onClick={() => setActiveTab('quiz')}
            className={`px-4 sm:px-5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'quiz' ? 'bg-amber-600 text-stone-950 shadow' : 'text-stone-300 hover:text-white'
            }`}
          >
            🎯 {ui('Thử Thách Quiz', 'Quiz Challenge')}
          </button>
          <button
            onClick={() => setActiveTab('timeline')}
            className={`px-4 sm:px-5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'timeline' ? 'bg-amber-600 text-stone-950 shadow' : 'text-stone-300 hover:text-white'
            }`}
          >
            📜 {ui('Dòng Thời Gian Lịch Sử', 'Historical Timeline')}
          </button>
          <button
            onClick={() => setActiveTab('past_present')}
            className={`px-4 sm:px-5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'past_present' ? 'bg-amber-600 text-stone-950 shadow' : 'text-stone-300 hover:text-white'
            }`}
          >
            📷 {ui('Di Sản Xưa & Nay', 'Heritage: Past & Present')}
          </button>
        </div>
      </div>

      {/* ==========================================
          TAB 1: QUIZ MODULE
          ========================================== */}
      {activeTab === 'quiz' && (
        <div className="max-w-3xl mx-auto space-y-6 animate-fadeIn">
          
          {/* Topic Select */}
          <div className="flex gap-3 overflow-x-auto pb-2">
            {QUIZ_TOPICS.map((topic) => (
              <button
                key={topic.id}
                onClick={() => handleRestartQuiz(topic)}
                className={`p-3 rounded-2xl border text-left whitespace-nowrap transition-all text-xs ${
                  selectedTopic.id === topic.id
                    ? 'bg-amber-600/30 border-amber-500 text-amber-200 ring-2 ring-amber-500/20'
                    : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-stone-200'
                }`}
              >
                <p className="font-bold text-stone-100">{topicTitle(topic.id, topic.title)}</p>
                <p className="text-[10px] text-stone-400">{topicRegion(topic.region)} • {topic.questions.length} {ui('câu hỏi', 'questions')}</p>
              </button>
            ))}
          </div>

          {!quizFinished ? (
            <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
              
              {/* Progress */}
              <div className="flex items-center justify-between text-xs text-stone-400 border-b border-stone-800 pb-3">
                <span>{ui('Câu', 'Question')} {currentQIndex + 1} / {selectedTopic.questions.length}</span>
                <span className="text-amber-400 font-bold">{ui('Điểm số:', 'Score:')} {score}</span>
              </div>

              {/* Question */}
              <div>
                <h3 className="text-lg sm:text-xl font-serif font-bold text-stone-100 leading-snug">
                  {questionText(currentQuestion)?.question || currentQuestion.question}
                </h3>
              </div>

              {/* Options */}
              <div className="space-y-3">
                {currentQuestion.options.map((opt, idx) => {
                  let btnStyle = 'bg-stone-950 border-stone-800 text-stone-200 hover:border-stone-700';
                  if (isAnswered) {
                    if (idx === currentQuestion.correctIndex) {
                      btnStyle = 'bg-emerald-950/70 border-emerald-500 text-emerald-200 font-bold ring-2 ring-emerald-500/20';
                    } else if (idx === selectedOption) {
                      btnStyle = 'bg-red-950/70 border-red-500 text-red-200';
                    } else {
                      btnStyle = 'bg-stone-950/40 border-stone-800/40 text-stone-500 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={isAnswered}
                      onClick={() => handleSelectOption(idx)}
                      className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between ${btnStyle}`}
                    >
                      <span>{questionText(currentQuestion)?.options[idx] || opt}</span>
                      {isAnswered && idx === currentQuestion.correctIndex && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 ml-2" />
                      )}
                      {isAnswered && idx === selectedOption && idx !== currentQuestion.correctIndex && (
                        <XCircle className="w-5 h-5 text-red-400 shrink-0 ml-2" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation upon answer */}
              {isAnswered && (
                <div className="bg-amber-950/30 border border-amber-500/30 rounded-2xl p-4 space-y-2 animate-fadeIn">
                  <div className="flex items-center gap-1.5 text-amber-400 text-xs font-bold uppercase tracking-wider">
                    <Sparkles className="w-4 h-4" />
                    <span>{ui('Giải thích chi tiết từ AI:', 'AI Explanation:')}</span>
                  </div>
                  <p className="text-xs text-stone-200 leading-relaxed">
                    {questionText(currentQuestion)?.explanation || currentQuestion.explanation}
                  </p>
                  {currentQuestion.culturalNote && (
                    <p className="text-[11px] text-stone-400 italic pt-1 border-t border-amber-500/20">
                      💡 <strong>{ui('Ý nghĩa văn hóa:', 'Cultural Significance:')}</strong> {questionText(currentQuestion)?.note || currentQuestion.culturalNote}
                    </p>
                  )}
                </div>
              )}

              {/* Next Question CTA */}
              {isAnswered && (
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={handleNextQuestion}
                    className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center gap-2 shadow-lg"
                  >
                    <span>{currentQIndex < selectedTopic.questions.length - 1 ? ui('Câu tiếp theo', 'Next Question') : ui('Xem kết quả', 'View Results')}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}

            </div>
          ) : (
            /* Quiz Completed Card */
            <div className="bg-stone-900 border border-amber-500/40 rounded-3xl p-8 sm:p-12 text-center space-y-5 shadow-2xl">
              <div className="w-20 h-20 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
                <Award className="w-10 h-10" />
              </div>

              <h3 className="text-2xl font-serif font-bold text-amber-100">
                {ui('Chúc Mừng Bạn Đã Hoàn Thành Thử Thách!', 'Congratulations! You Completed the Challenge!')}
              </h3>

              <div className="text-4xl font-extrabold text-amber-400">
                {score} / {selectedTopic.questions.length}
              </div>

              <p className="text-xs sm:text-sm text-stone-300 max-w-md mx-auto leading-relaxed">
                {score === selectedTopic.questions.length
                  ? (isEnglish ? 'Excellent! You are a true expert in Vietnamese history and culture.' : 'Tuyệt vời! Bạn là một bậc thầy am hiểu lịch sử và văn hóa Việt Nam.')
                  : (isEnglish ? 'Great effort! Keep exploring more heritage stories.' : 'Kiến thức rất đáng khen ngợi! Hãy tiếp tục khám phá thêm nhiều câu chuyện di sản khác nhé.')}
              </p>

              <button
                onClick={() => handleRestartQuiz()}
                className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-lg inline-flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>{ui('Làm lại bài Quiz', 'Retake Quiz')}</span>
              </button>
            </div>
          )}

        </div>
      )}

      {/* ==========================================
          TAB 2: HISTORICAL TIMELINE
          ========================================== */}
      {activeTab === 'timeline' && (
        <div className="space-y-8 animate-fadeIn">
          <div className="relative pl-6 sm:pl-8 border-l-2 border-amber-500/40 space-y-8">
            {TIMELINE_MILESTONES.map((era) => (
              <div key={era.id} className="relative">
                {/* Dot */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1 w-6 h-6 rounded-full bg-stone-950 border-2 border-amber-500 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                </div>

                {/* Milestone Box */}
                <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-800 pb-3">
                    <div>
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold">
                        {era.timeRange}
                      </span>
                      <h4 className="text-xl font-serif font-bold text-amber-100 mt-1.5">{era.period}</h4>
                      <p className="text-xs text-stone-400 font-medium">{era.dynastyOrEra}</p>
                    </div>

                    {era.verifiedStatus === 'verified' && (
                      <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        {ui('Chính sử xác minh', 'Historically Verified')}
                      </span>
                    )}
                    {era.verifiedStatus === 'folk_legend' && (
                      <span className="text-[10px] px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-500/30 font-bold flex items-center gap-1">
                        <HelpCircle className="w-3 h-3 text-amber-400" />
                        {ui('Huyền tích & Truyền thuyết', 'Legends & Folklore')}
                      </span>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm text-stone-200 leading-relaxed font-serif">
                    {era.overview}
                  </p>

                  {/* Key Events */}
                  <div className="bg-stone-950 p-4 rounded-2xl border border-stone-800 space-y-2">
                    <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                      {ui('Sự kiện lịch sử tiêu biểu:', 'Key Historical Events:')}
                    </span>
                    <ul className="space-y-1.5 text-xs text-stone-300">
                      {era.keyEvents.map((evt, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-amber-400 font-bold">•</span>
                          <span>{evt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Figures & Heritages */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-stone-400 pt-2">
                    <div>
                      <strong className="text-stone-300">{ui('Danh nhân / Nhân vật: ', 'Notable Figures: ')}</strong>
                      <span>{era.prominentFigures.join(', ')}</span>
                    </div>
                    <div>
                      <strong className="text-stone-300">{ui('Di sản liên quan: ', 'Related Heritage: ')}</strong>
                      <span className="text-amber-300">{era.associatedHeritages.join(', ')}</span>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ==========================================
          TAB 3: PAST AND PRESENT COMPARISON
          ========================================== */}
      {activeTab === 'past_present' && (
        <div className="space-y-8 animate-fadeIn">
          
          {/* Selector */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {PAST_AND_PRESENT.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedComparison(item)}
                className={`p-3.5 rounded-2xl border text-left transition-all ${
                  selectedComparison.id === item.id
                    ? 'bg-amber-950/60 border-amber-500 ring-2 ring-amber-500/20 shadow-lg'
                    : 'bg-stone-900 border-stone-800 text-stone-300 hover:bg-stone-800/80'
                }`}
              >
                <h4 className="font-serif font-bold text-stone-100 text-sm">{item.name}</h4>
                <p className="text-xs text-stone-400 mt-0.5">{item.location}</p>
                {item.isAiReconstructed && (
                  <span className="inline-block mt-2 text-[10px] px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30 font-semibold">
                    {ui('Phục dựng AI 3D', 'AI 3D Reconstruction')}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Comparison Card */}
          <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            
            <div className="flex flex-wrap items-start justify-between gap-3 border-b border-stone-800 pb-4">
              <div>
                <h3 className="text-2xl font-serif font-bold text-amber-100">
                  {selectedComparison.name}
                </h3>
                <p className="text-xs text-stone-400 mt-0.5">{selectedComparison.location}</p>
              </div>

              {/* Crucial mandatory disclaimer */}
              {selectedComparison.isAiReconstructed ? (
                <div className="px-3 py-1.5 rounded-xl bg-purple-950/70 border border-purple-500/50 text-purple-300 text-xs font-bold flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span>{ui('[Ảnh phục dựng bằng AI – không phải ảnh lịch sử nguyên bản]', '[AI-reconstructed image – not an original historical photograph]')}</span>
                </div>
              ) : (
                <div className="px-3 py-1.5 rounded-xl bg-stone-800 border border-stone-700 text-stone-300 text-xs font-semibold flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span>{ui('Ảnh tư liệu lịch sử đối chiếu', 'Historical Reference Image')}</span>
                </div>
              )}
            </div>

            {/* Side-by-side Images */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="relative h-64 rounded-2xl overflow-hidden border border-stone-800 bg-stone-950">
                  <img src={selectedComparison.historicImageUrl} alt="Xưa" className="w-full h-full object-cover" />
                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-black/70 backdrop-blur rounded-lg text-xs font-bold text-amber-300 border border-amber-500/30">
                    📜 {selectedComparison.historicYear}
                  </div>
                </div>
                <p className="text-xs text-stone-400 text-center">Hình ảnh tư liệu lịch sử</p>
              </div>

              <div className="space-y-2">
                <div className="relative h-64 rounded-2xl overflow-hidden border border-stone-800 bg-stone-950">
                  <img src={selectedComparison.presentImageUrl} alt="Nay" className="w-full h-full object-cover" />
                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-black/70 backdrop-blur rounded-lg text-xs font-bold text-emerald-300 border border-emerald-500/30">
                    🏛 Hiện tại (2026)
                  </div>
                </div>
                <p className="text-xs text-stone-400 text-center">Hiện trạng bảo tồn ngày nay</p>
              </div>
            </div>

            {/* Description of change & conservation */}
            <div className="p-5 bg-stone-950 rounded-2xl border border-stone-800 space-y-3 text-xs">
              <div>
                <strong className="text-amber-400 uppercase tracking-wider block mb-1">
                  Biến chuyển qua thời gian & Trùng tu:
                </strong>
                <p className="text-stone-300 leading-relaxed">{selectedComparison.changeDescription}</p>
              </div>
              <div className="pt-2 border-t border-stone-800/80">
                <strong className="text-stone-400 block mb-1">Chi tiết kỹ thuật bảo tồn:</strong>
                <p className="text-stone-400 leading-relaxed">{selectedComparison.conservationDetails}</p>
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
