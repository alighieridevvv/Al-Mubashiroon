export interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: 'Meccan' | 'Medinan';
}

export interface Ayah {
  number: number;
  audio: string;
  text: string;
  numberInSurah: number;
  juz: number;
  manzil: number;
  page: number;
  ruku: number;
  hizbQuarter: number;
  sajda: boolean;
}

export interface MergedAyah {
  number: number; // Global number
  numberInSurah: number;
  text: string; // Arabic
  translation: string; // Dynamic based on selection (Sahih, Pickthall, Yusuf Ali)
  transliteration: string; // Phonetic transliteration
  audio: string; // Audio URL
  juz: number;
}

export interface Bookmark {
  id: string;
  surahNumber: number;
  surahName: string;
  ayahNumber: number;
  textArabic: string;
  textEnglish: string;
  note: string;
  date: string;
}

export interface Profile {
  name: string;
  avatarUrl: string;
  joinedDate: string;
  surahProgress: Record<number, boolean>; // surahNumber -> completed
  juzProgress: Record<number, 'not-started' | 'reading' | 'completed'>; // juzNumber -> status
  dailyStreak: number;
  lastReadDate?: string;
  completedQuizzesCount: number;
  studyTopicsCompleted: string[]; // ids of articles read
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  evidenceText?: string;
  evidenceSource?: string;
}

export interface NameOfAllah {
  number: number;
  name: string; // Arabic
  transliteration: string;
  meaning: string;
}

export interface DawahArticle {
  id: string;
  title: string;
  category: 'Aqeedah' | 'Fiqh' | 'Seerah' | 'Hadith' | 'Tafseer' | 'Manners & Ethics';
  summary: string;
  content: string;
  author: string;
  readTime: string;
  date: string;
  sections?: {
    heading: string;
    body: string;
  }[];
}

export interface StudyScheduleItem {
  id: string;
  topic: string;
  reference: string;
  date: string;
  time: string;
  location: string;
  meetingLink?: string;
  rsvps: Record<string, 'yes' | 'not-sure'>; // username -> status
}

export interface Announcement {
  id: string;
  title: string;
  body: string;
  date: string;
  reference?: string;
  isPinned: boolean;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}

export interface Quiz {
  id: string;
  title: string;
  category: 'Qur\'an' | 'Seerah' | 'Pillars';
  questions: QuizQuestion[];
}

export interface TafsirAyah {
  verseKey: string;
  scholarName: string;
  text: string;
}

export interface TafsirNote {
  verseKey: string;
  note: string;
  savedAt: number;
}

export interface TafsirState {
  selectedSurah: number;
  ayahs: TafsirAyah[];
  isLoading: boolean;
  error: string | null;
  selectedAyah: string | null;
  notes: Record<string, TafsirNote>;
}
