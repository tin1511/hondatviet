export type HeritageCategory = 
  | 'monument'
  | 'temple'
  | 'citadel'
  | 'palace'
  | 'tomb'
  | 'ancient_house'
  | 'craft_village'
  | 'artifact'
  | 'costume'
  | 'instrument'
  | 'architecture'
  | 'folk_art'
  | 'culinary';

export type VerificationStatus = 'verified' | 'folk_legend' | 'unverified';

export type Region = 'north' | 'central' | 'south';
export type RegionType = Region;

export interface HeritageItem {
  id: string;
  name: string;
  vietnameseName?: string;
  englishName?: string;
  category: HeritageCategory;
  categoryLabel: string;
  region: Region;
  province: string;
  period: string;
  dynasty?: string;
  history: string;
  culturalSignificance: string;
  interestingFacts: string[];
  conservationStatus?: string;
  imageUrl: string;
  historicImageUrl?: string;
  historicImageYear?: string;
  aiReconstructionNote?: string;
  verifiedStatus: VerificationStatus;
  verifiedNote?: string;
  lat: number;
  lng: number;
  address: string;
  visitingHours?: string;
  ticketPrice?: string;
  googleMapsUri: string;
  audioNarration?: string;
  tags: string[];
  suggestedQuestions: string[];
  overview?: string;
}

export type StoryMode = 'children' | 'student' | 'university' | 'adult' | 'foreigner';

export interface StoryModeOption {
  id: StoryMode;
  label: string;
  description: string;
  icon: string;
}

export interface HeritageStory {
  heritageId: string;
  heritageName: string;
  mode: StoryMode;
  title: string;
  storyText: string;
  audioDurationSeconds?: number;
  historicalContext: string;
  distinctionNote: string;
  sourceReferences: string[];
  isFallback?: boolean;
}

export type PlaceType = 
  | 'restaurant' 
  | 'drink' 
  | 'cafe' 
  | 'bakery' 
  | 'dessert' 
  | 'local_food' 
  | 'cinema' 
  | 'karaoke' 
  | 'arcade' 
  | 'entertainment' 
  | 'amusement' 
  | 'shopping';

export type PlaceCategory = PlaceType;

export interface PlaceReviewSummary {
  foodMention?: string;
  ambianceMention?: string;
  serviceMention?: string;
  pricingMention?: string;
  locationMention?: string;
  positiveHighlights: string[];
  considerations: string[];
  dataCoverageNotice: string;
}

export interface PlaceItem {
  id: string;
  name: string;
  category: PlaceType;
  categoryLabel: string;
  address: string;
  lat: number;
  lng: number;
  rating: number;
  userRatingCount: number;
  priceLevel?: number; // 1 to 4
  priceText?: string;
  openNow?: boolean;
  openingHoursText?: string;
  websiteUri?: string;
  nationalPhoneNumber?: string;
  photoUrl: string;
  googleMapsUri: string;
  isDemoData?: boolean;
  attributionText?: string;
  distanceKm?: number;
  specialties?: string[];
  reviewSummary?: PlaceReviewSummary;
  sampleReviews?: {
    authorName: string;
    rating: number;
    text: string;
    relativePublishTimeDescription: string;
  }[];
}

export interface MatchReasoningResult {
  placeId: string;
  placeName: string;
  fitScore: number; // 1-100
  reasoning: string;
  highlightsForUser: string[];
}

export interface ItineraryTimeSlot {
  time: string;
  activityType: 'heritage' | 'museum' | 'food' | 'craft' | 'cafe' | 'entertainment' | 'leisure';
  title: string;
  locationName: string;
  description: string;
  durationMinutes: number;
  lat?: number;
  lng?: number;
  googleMapsUri?: string;
  openingHoursNote?: string;
  tip?: string;
}

export interface ItineraryPlan {
  id: string;
  title: string;
  destination: string;
  duration: string;
  vibe: string;
  routeSummary: string;
  aiOptimizationReasoning: string;
  slots: ItineraryTimeSlot[];
  isDemoData?: boolean;
}

export interface FamilyStoryMemory {
  id: string;
  userId: string;
  tellerName: string;
  tellerBirthYear?: number;
  location: string;
  topic: string;
  timePeriod: string;
  storyContent: string;
  audioUrl?: string;
  audioBlobUrl?: string;
  photoUrl?: string;
  visibility: 'private' | 'family' | 'public';
  createdAt: string;
  tags?: string[];
}

export interface TraditionalCraftVillage {
  id: string;
  name: string;
  craftType: string;
  province: string;
  region: Region;
  history: string;
  products: string[];
  processSteps: string[];
  imageUrl: string;
  googleMapsUri: string;
  visitingLocation?: string;
  verifiedStatus: VerificationStatus;
}

export interface TraditionalArtItem {
  id: string;
  name: string;
  artType: 'tuong' | 'cheo' | 'ca_tru' | 'quan_ho' | 'don_ca_tai_tu' | 'nha_nhac' | 'instrument' | 'folk_dance';
  artTypeLabel: string;
  originRegion: string;
  description: string;
  characteristics: string[];
  culturalMeaning: string;
  recognizedByUnesco?: boolean;
  unescoYear?: string;
  sampleAudioOrVideoDescription: string;
  imageUrl: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  culturalNote?: string;
  heritageIdRef?: string;
}

export interface QuizTopic {
  id: string;
  title: string;
  subtitle: string;
  region: string;
  difficulty: 'easy' | 'medium' | 'hard';
  questions: QuizQuestion[];
}

export interface TimelineMilestone {
  id: string;
  period: string;
  timeRange: string;
  dynastyOrEra: string;
  keyEvents: string[];
  prominentFigures: string[];
  associatedHeritages: string[];
  verifiedStatus: VerificationStatus;
  overview: string;
}

export interface PastAndPresentItem {
  id: string;
  name: string;
  location: string;
  presentImageUrl: string;
  historicImageUrl: string;
  historicYear: string;
  isAiReconstructed: boolean;
  changeDescription: string;
  conservationDetails: string;
}

export interface ContributionComment {
  id: string;
  userId?: string;
  authorName: string;
  authorAvatar?: string;
  authorRole?: string;
  content: string;
  createdAt: string;
}

export interface CommunityContribution {
  id: string;
  userId: string;
  authorName?: string;
  contributorName?: string;
  title: string;
  category: string;
  location: string;
  description?: string;
  content?: string;
  imageUrl?: string;
  sourceReference?: string;
  status: 'pending' | 'approved' | 'rejected' | 'verified' | 'pending_review';
  submittedAt?: string;
  createdAt?: string;
  likesCount?: number;
  likedByUsers?: string[];
  comments?: ContributionComment[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  isTourGuideMode?: boolean;
}

export interface AITourGuideConfig {
  guideName: string;
  title: string;
  avatarUrl: string;
  experienceYears: number;
  speakingStyle: 'warm_friendly' | 'epic_historical' | 'scholarly' | 'poetic_storyteller';
  specialties: string[];
  etiquetteRules: string[];
  welcomeGreeting: string;
  customKnowledgePrompt: string;
  activeHeritageKnowledge?: boolean;
  updatedAt: string;
}

export interface UserBadge {
  id: string;
  name: string;
  icon: string;
  description: string;
  unlockedAt: string;
}

export type UserActionType = 
  | 'recognize'
  | 'story'
  | 'chat'
  | 'itinerary'
  | 'memory'
  | 'quiz'
  | 'favorite'
  | 'community'
  | 'auth'
  | 'profile'
  | 'admin_action'
  | 'landmark'
  | 'craft';

export interface UserActivityLog {
  id: string;
  userId: string;
  userName?: string;
  userRole?: 'user' | 'student' | 'researcher' | 'admin';
  userEmail?: string;
  actionType: UserActionType;
  title: string;
  description: string;
  timestamp: string;
  targetId?: string;
  pointsEarned?: number;
  metadata?: Record<string, any>;
}

export interface UserLocation {
  lat: number;
  lng: number;
  accuracy?: number;
  cityName?: string;
  source: 'gps' | 'preset' | 'cached';
  timestamp: number;
}

export interface CityLandmarkBackground {
  id: string;
  cityName: string;
  province: string;
  landmarkName: string;
  tagline: string;
  imageUrl: string;
  lat: number;
  lng: number;
  distanceKm?: number;
}

export interface NearbyHeritageRecommendation extends HeritageItem {
  distanceKm: number;
  walkingTimeText: string;
  drivingTimeText: string;
  matchHighlight?: string;
}

export interface NearbyPlaceRecommendation extends PlaceItem {
  distanceKm: number;
  walkingTimeText: string;
  drivingTimeText: string;
  heritageSource?: string;
}

export interface UserProfile {
  id: string;
  displayName: string;
  email: string;
  password?: string;
  avatarUrl: string;
  city: string;
  role: 'user' | 'student' | 'researcher' | 'admin';
  roleLabel?: string;
  interests: string[];
  favoritesCount: number;
  contributionsCount: number;
  quizzesCompleted: number;
  storiesCreated: number;
  recognitionsCount: number;
  itinerariesCount: number;
  points: number;
  level: string;
  badges: UserBadge[];
  createdAt: string;
  lastLoginAt?: string;
  isLoggedIn?: boolean;
}

export interface RecognitionSampleItem {
  id: string;
  title: string;
  category: string;
  url: string;
  prompt: string;
  description?: string;
  source?: string;
}

export interface RecognitionSectionConfig {
  badge: string;
  title: string;
  description: string;
  samplesLabel: string;
  samples: RecognitionSampleItem[];
  lastUpdated?: string;
  updatedBy?: string;
}
