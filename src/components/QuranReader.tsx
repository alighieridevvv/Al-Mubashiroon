import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, Pause, Volume2, Bookmark, Copy, FileText, 
  ChevronRight, ChevronLeft, Search, BookMarked, Sparkles
} from 'lucide-react';
import { ALL_SURAHS, getJuzForSurahAndAyah } from '../data/quran-meta';
import { getTafsirExcerpt } from '../data/dawah-data';
import wordTranslationsJson from '../data/word-translations.json';
import { MergedAyah, Bookmark as BookmarkType } from '../types';

// Type the imported JSON data
const WORD_TRANSLATIONS: QuranWordData = wordTranslationsJson as QuranWordData;

interface QuranReaderProps {
  bookmarks: BookmarkType[];
  addBookmark: (b: Omit<BookmarkType, 'id' | 'date'>) => void;
  removeBookmark: (id: string) => void;
  updateStreak: () => void;
}

// API Response Types
interface AyahAPI {
  number: number;
  numberInSurah: number;
  text: string;
  juz: number;
}

interface EditionAPI {
  ayahs: AyahAPI[];
}

// Word translations data types
interface WordData {
  position: number;
  arabic: string;
  translation: string;
}

interface AyahWordData {
  verseKey: string;
  words: WordData[];
}

interface SurahWordData {
  [ayahNumber: string]: AyahWordData;
}

interface QuranWordData {
  [surahNumber: string]: SurahWordData;
}

interface SurahResponse {
  code: number;
  data: EditionAPI[];
}

// Reciters Mapping
const RECITERS = [
  { id: 'ar.alafasy', name: 'Mishary Rashid Alafasy' },
  { id: 'ar.abdulbasitmurattal', name: 'Abdul Basit' },
  { id: 'ar.husary', name: 'Mahmoud Khalil Al-Hussary' },
  { id: 'ar.saadghamidi', name: 'Saad Al-Ghamdi' },
  { id: 'ar.shatree', name: 'Abu Bakr Al-Shatri' }
];

// Offline Fallback for Al-Fatihah & Al-Ikhlas to ensure perfect resilience
const OFFLINE_SURAHS: Record<number, any[]> = {
  1: [
    { numberInSurah: 1, text: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ", translation: "In the name of Allah, the Most Gracious, the Most Merciful.", transliteration: "Bi-smi-llāhi-r-raḥmāni-r-raḥīm", audio: "https://cdn.alquran.cloud/media/audio/ayah/ar.alafasy/1" },
    { numberInSurah: 2, text: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ", translation: "All praise is [due] to Allah, Lord of the worlds -", transliteration: "Al-ḥamdu li-llāhi rabbi-l-ʿālamīn", audio: "https://cdn.alquran.cloud/media/audio/ayah/ar.alafasy/2" },
    { numberInSurah: 3, text: "الرَّحْمَٰنِ الرَّحِيمِ", translation: "The Most Gracious, the Most Merciful,", transliteration: "Ar-raḥmāni-r-raḥīm", audio: "https://cdn.alquran.cloud/media/audio/ayah/ar.alafasy/3" },
    { numberInSurah: 4, text: "مَالِكِ يَوْمِ الدِّينِ", translation: "Sovereign of the Day of Recompense.", transliteration: "Māliki yawmi-d-dīn", audio: "https://cdn.alquran.cloud/media/audio/ayah/ar.alafasy/4" },
    { numberInSurah: 5, text: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ", translation: "It is You we worship and You we ask for help.", transliteration: "Iyyāka naʿbudu wa-iyyāka nastaʿīn", audio: "https://cdn.alquran.cloud/media/audio/ayah/ar.alafasy/5" },
    { numberInSurah: 6, text: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ", translation: "Guide us to the straight path -", transliteration: "Ihdinā-ṣ-ṣirāṭa-l-mustaqīm", audio: "https://cdn.alquran.cloud/media/audio/ayah/ar.alafasy/6" },
    { numberInSurah: 7, text: "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ", translation: "The path of those upon whom You have bestowed favor, not of those who have earned [Your] anger or of those who are astray.", transliteration: "Ṣirāṭa-llaḏīna anʿamta ʿalayhim ġayri-l-maġḍūbi ʿalayhim walā-ḍ-ḍāllīn", audio: "https://cdn.alquran.cloud/media/audio/ayah/ar.alafasy/7" }
  ],
  112: [
    { numberInSurah: 1, text: "قُلْ هُوَ اللَّهُ أَحَدٌ", translation: "Say, 'He is Allah, [who is] One,", transliteration: "Qul huwa-llāhu aḥad", audio: "https://cdn.alquran.cloud/media/audio/ayah/ar.alafasy/98" },
    { numberInSurah: 2, text: "اللَّهُ الصَّمَدُ", translation: "Allah, the Eternal Refuge.", transliteration: "Allāhu-ṣ-ṣamad", audio: "https://cdn.alquran.cloud/media/audio/ayah/ar.alafasy/99" },
    { numberInSurah: 3, text: "لَمْ يَلِدْ وَلَمْ يُولَدْ", translation: "He neither begets nor is born,", transliteration: "Lam yalid walam yūlad", audio: "https://cdn.alquran.cloud/media/audio/ayah/ar.alafasy/100" },
    { numberInSurah: 4, text: "وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ", translation: "And there is none co-equal or comparable to Him.'", transliteration: "Walam yakun lahu kufuwan aḥad", audio: "https://cdn.alquran.cloud/media/audio/ayah/ar.alafasy/101" }
  ]
};

export default function QuranReader({ bookmarks, addBookmark, removeBookmark, updateStreak }: QuranReaderProps) {
  // Saved Last Read or default Al-Fatihah
  const [selectedSurah, setSelectedSurah] = useState<number>(() => {
    const saved = localStorage.getItem('last_read_surah');
    return saved ? parseInt(saved, 10) : 1;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [ayahs, setAyahs] = useState<MergedAyah[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Range-selectors
  const [startAyah, setStartAyah] = useState<number>(1);
  const [endAyah, setEndAyah] = useState<number>(7);

  // Layout View Toggles
  const [showArabic, setShowArabic] = useState(true);
  const [showTransliteration, setShowTransliteration] = useState(true);
  const [showTranslation, setShowTranslation] = useState(true);
  const [arabicFontSize, setArabicFontSize] = useState<number>(2.25); // in rem

  // Word-by-word tooltip & Tafsir Panel Drawer
  const [activeTafsirAyah, setActiveTafsirAyah] = useState<MergedAyah | null>(null);
  const [tafsirContent, setTafsirContent] = useState<Record<number, string>>({});
  const [tafsirLoading, setTafsirLoading] = useState(false);
  
  // Tooltip state for word translations - now uses local data directly
  const [activeTooltip, setActiveTooltip] = useState<{ surahNumber: number; ayahNumber: number; wordIndex: number; x: number; y: number; translation: string } | null>(null);

  // Bookmark Notes Inputs
  const [notesInput, setNotesInput] = useState('');
  const [activeBookmarkId, setActiveBookmarkId] = useState<string | null>(null);

  // Audio Playback State
  const [currentReciter] = useState('ar.alafasy');
  const [activePlayAyahIndex, setActivePlayAyahIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [audioLoading, setAudioLoading] = useState(false);
  
  // Loops and continuous plays
  const [repeatMode, setRepeatMode] = useState<'none' | 'ayah' | 'range' | 'surah'>('none');
  const [repeatCountMax, setRepeatCountMax] = useState<number>(1); // times to loop
  const [repeatCurrentCount, setRepeatCurrentCount] = useState<number>(0);
  const [loopUntilStopped, setLoopUntilStopped] = useState(false);

  // Night Mode state local to the Quran reader
  const [readerNightMode, setReaderNightMode] = useState<boolean>(() => {
    return localStorage.getItem('reader_night_mode') === 'true';
  });

  // Reference references
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const ayahRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const meta = ALL_SURAHS.find((s) => s.number === selectedSurah) || ALL_SURAHS[0];

  // Set limits as surah metadata loads
  useEffect(() => {
    setStartAyah(1);
    setEndAyah(meta.numberOfAyahs);
    localStorage.setItem('last_read_surah', selectedSurah.toString());
    localStorage.setItem('last_read_surah_name', meta.englishName);
    localStorage.setItem('last_read_ayah_num', 'Ayah 1');
    localStorage.setItem('last_read_progress', '0');
  }, [selectedSurah, meta]);

  // Fetch Ayah Data (Uthmani Arabic text + English Translation + Transliteration in single merged request if possible, or fallback gracefully)
  const fetchSurahData = async () => {
    setLoading(true);
    setErrorMsg('');
    setActivePlayAyahIndex(null);
    setIsPlaying(false);

    try {
      // Primary API call utilizing multi-editions
      // Al-Fatihah, Al-Ikhlas have offline pre-seeds
      // Editions: quran-uthmani (Arabic text), en.sahih (Sahih International), en.transliteration (Transliteration)
      const res = await fetch(`https://api.alquran.cloud/v1/surah/${selectedSurah}/editions/quran-uthmani,en.sahih,en.transliteration`);
      if (!res.ok) throw new Error("Network request failed");
      const json: SurahResponse = await res.json();

      if (json.code === 200 && json.data && json.data.length >= 3) {
        const arabicEdition = json.data[0].ayahs;
        const translationEdition = json.data[1].ayahs;
        const transliterationEdition = json.data[2].ayahs;

        const merged: MergedAyah[] = arabicEdition.map((ay: AyahAPI, index: number) => {
          // Construct audio from Alafasy secure cdn
          // Ayah global number
          const globalNum = ay.number;
          return {
            number: globalNum,
            numberInSurah: ay.numberInSurah,
            text: ay.text,
            translation: translationEdition[index]?.text || '',
            transliteration: transliterationEdition[index]?.text || '',
            audio: `https://cdn.alquran.cloud/media/audio/ayah/${currentReciter}/${globalNum}`,
            juz: ay.juz
          };
        });

        setAyahs(merged);
        updateStreak(); // update daily streak count
      } else {
        throw new Error("Invalid API format returned");
      }
    } catch (err) {
      console.warn("Using offline fallbacks for seamless user experience:", err);
      // Fallback with offline seeds if available
      if (OFFLINE_SURAHS[selectedSurah]) {
        const preseeded = OFFLINE_SURAHS[selectedSurah].map((ay) => ({
          ...ay,
          audio: ay.audio.replace('ar.alafasy', currentReciter)
        }));
        setAyahs(preseeded);
      } else {
        setErrorMsg("Unable to connect to AlQuran.cloud API. Please check your internet connection and try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSurahData();
  }, [selectedSurah, currentReciter]);

  // Handle word hover - looks up translation directly from local data
  const handleWordHover = (ayahNumber: number, wordIndex: number, translation: string, event: React.MouseEvent | React.TouchEvent) => {
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top;
    
    // Edge detection: flip tooltip below if near top of viewport
    const tooltipHeight = 40; // approximate height
    const shouldFlipBelow = y < tooltipHeight + 20;
    
    setActiveTooltip({ 
      surahNumber: selectedSurah, 
      ayahNumber, 
      wordIndex, 
      x, 
      y: shouldFlipBelow ? y + rect.height + 10 : y - 10, 
      translation 
    });
  };

  const dismissTooltip = () => {
    setActiveTooltip(null);
  };

  // Load tafsir content when active tafsir ayah changes
  useEffect(() => {
    if (activeTafsirAyah && !tafsirContent[activeTafsirAyah.numberInSurah]) {
      setTafsirLoading(true);
      getTafsirExcerpt(selectedSurah, activeTafsirAyah.numberInSurah)
        .then((content) => {
          setTafsirContent((prev) => ({ ...prev, [activeTafsirAyah.numberInSurah]: content }));
          setTafsirLoading(false);
        })
        .catch((error) => {
          console.error('Failed to load tafsir:', error);
          setTafsirLoading(false);
        });
    }
  }, [activeTafsirAyah, selectedSurah]);

  // Audio Logic
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackSpeed;
    }
  }, [playbackSpeed]);

  const handleAudioEnd = () => {
    if (activePlayAyahIndex === null) return;

    // 1. Single Ayah repeat loop
    if (repeatMode === 'ayah') {
      if (loopUntilStopped || repeatCurrentCount < repeatCountMax - 1) {
        setRepeatCurrentCount((prev) => prev + 1);
        if (audioRef.current) {
          audioRef.current.currentTime = 0;
          audioRef.current.play().catch(() => setIsPlaying(false));
        }
        return;
      }
    }

    // 2. Range repeat loops
    const playOrderIndex = ayahs.findIndex(ay => ay.numberInSurah === activePlayAyahIndex);
    if (playOrderIndex === -1) return;

    const currentAyahNumInSurah = activePlayAyahIndex;

    if (repeatMode === 'range') {
      // check if we hit range boundary
      if (currentAyahNumInSurah >= endAyah) {
        if (loopUntilStopped || repeatCurrentCount < repeatCountMax - 1) {
          setRepeatCurrentCount(prev => prev + 1);
          // Loop back to startAyah
          const startIndex = ayahs.findIndex(ay => ay.numberInSurah === startAyah);
          if (startIndex !== -1) {
            playAyahByIndex(startIndex);
          }
        } else {
          setIsPlaying(false);
          setActivePlayAyahIndex(null);
        }
        return;
      }
    }

    // 3. Fallback standard next play
    const nextIndex = playOrderIndex + 1;
    if (nextIndex < ayahs.length) {
      const nextAyah = ayahs[nextIndex];
      // check range boundaries for normal play too
      if (repeatMode === 'none' && nextAyah.numberInSurah > endAyah) {
        setIsPlaying(false);
        setActivePlayAyahIndex(null);
        return;
      }
      playAyahByIndex(nextIndex);
    } else {
      // End of Surah
      if (repeatMode === 'surah' && (loopUntilStopped || repeatCurrentCount < repeatCountMax - 1)) {
        setRepeatCurrentCount(prev => prev + 1);
        playAyahByIndex(0);
      } else {
        setIsPlaying(false);
        setActivePlayAyahIndex(null);
      }
    }
  };

  const playAyahByIndex = (idx: number) => {
    if (idx < 0 || idx >= ayahs.length) return;
    const item = ayahs[idx];
    setActivePlayAyahIndex(item.numberInSurah);
    setIsPlaying(true);
    setAudioLoading(true);

    if (audioRef.current) {
      audioRef.current.src = item.audio;
      audioRef.current.load();
      audioRef.current.play().catch((err) => {
        console.warn("Unable to play audio stream:", err);
        setIsPlaying(false);
        setAudioLoading(false);
      });
      audioRef.current.onloadeddata = () => {
        setAudioLoading(false);
      };
      audioRef.current.onerror = () => {
        setAudioLoading(false);
      };
    }

    // Auto-scroll and glow highlights
    if (ayahRefs.current[item.numberInSurah]) {
      ayahRefs.current[item.numberInSurah]?.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  };

  const togglePlayback = () => {
    if (activePlayAyahIndex === null) {
      // Start from startAyah or first
      const startIndex = ayahs.findIndex(ay => ay.numberInSurah === startAyah);
      playAyahByIndex(startIndex !== -1 ? startIndex : 0);
      return;
    }

    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      audioRef.current?.play().catch(() => setIsPlaying(false));
      setIsPlaying(true);
    }
  };

  const skipPrevious = () => {
    if (activePlayAyahIndex === null) return;
    const idx = ayahs.findIndex(ay => ay.numberInSurah === activePlayAyahIndex);
    if (idx > 0) {
      playAyahByIndex(idx - 1);
    }
  };

  const skipNext = () => {
    if (activePlayAyahIndex === null) return;
    const idx = ayahs.findIndex(ay => ay.numberInSurah === activePlayAyahIndex);
    if (idx < ayahs.length - 1) {
      playAyahByIndex(idx + 1);
    }
  };

  // Bookmark / Save Notes helpers
  const handleBookmarkClick = (ay: MergedAyah) => {
    const isBookmarked = bookmarks.some(b => b.surahNumber === selectedSurah && b.ayahNumber === ay.numberInSurah);
    if (isBookmarked) {
      const bObj = bookmarks.find(b => b.surahNumber === selectedSurah && b.ayahNumber === ay.numberInSurah);
      if (bObj) removeBookmark(bObj.id);
    } else {
      setActiveBookmarkId(`${selectedSurah}_${ay.numberInSurah}`);
      setNotesInput('');
      addBookmark({
        surahNumber: selectedSurah,
        surahName: meta.englishName,
        ayahNumber: ay.numberInSurah,
        textArabic: ay.text,
        textEnglish: ay.translation,
        note: ''
      });
    }
  };

  const saveBookmarkNote = () => {
    if (!activeBookmarkId) return;
    const [sNum, aNum] = activeBookmarkId.split('_').map(x => parseInt(x, 10));
    
    // Find bookmark and update note
    const savedList: BookmarkType[] = JSON.parse(localStorage.getItem('study_bookmarks') || '[]');
    const updated = savedList.map(b => {
      if (b.surahNumber === sNum && b.ayahNumber === aNum) {
        return { ...b, note: notesInput };
      }
      return b;
    });
    localStorage.setItem('study_bookmarks', JSON.stringify(updated));
    // Trigger tab state update if we had an internal callback
    setActiveBookmarkId(null);
  };

  // Copy Ayah to clipboard
  const copyToClipboard = (ay: MergedAyah) => {
    const text = `Qur'an ${selectedSurah}:${ay.numberInSurah}\n\nArabic: ${ay.text}\nTransliteration: ${ay.transliteration}\nTranslation (Sahih Int.): ${ay.translation}`;
    navigator.clipboard.writeText(text);
    alert(`Ayah ${selectedSurah}:${ay.numberInSurah} copied securely to clipboard!`);
  };

  // Filter surahs by search
  const filteredSurahs = ALL_SURAHS.filter(s => 
    s.englishName.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.number.toString() === searchQuery ||
    s.name.includes(searchQuery)
  );

  // Filter ayahs based on selected range
  const visibleAyahs = ayahs.filter(ay => 
    ay.numberInSurah >= startAyah && ay.numberInSurah <= endAyah
  );

  return (
    <div className={`arabesque-pattern min-h-screen lg:h-[calc(100vh-4rem)] lg:max-h-[calc(100vh-4rem)] py-8 lg:py-4 px-4 sm:px-6 lg:px-8 transition-colors duration-300 lg:overflow-hidden flex flex-col ${
      readerNightMode 
        ? 'bg-[#150C0C] text-[#EACEAA]' 
        : 'bg-[#EACEAA] text-[#150C0C]'
    }`} id="quran_reader_workspace">
      
      {/* Hide standard audio tag so it operates through JS controls */}
      <audio 
        ref={audioRef} 
        onEnded={handleAudioEnd} 
        className="hidden" 
      />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-4 gap-8 flex-1 lg:min-h-0" id="quran_grid_wrapper">
        
        {/* SIDEBAR: Surah Selector List (Left Column) */}
        <div className="lg:col-span-1 lg:h-full lg:flex lg:flex-col lg:min-h-0" id="quran_sidebar_container">
          <div className={`p-4 rounded-xl border border-[#D39858] shadow-md flex flex-col h-full lg:min-h-0 ${
            readerNightMode ? 'bg-[#34150F]/70' : 'bg-[#EACEAA] bg-opacity-90'
          }`}>
            <h3 className="font-serif text-lg font-bold text-[#85431E] border-b border-[#D39858]/30 pb-2 mb-4 flex items-center justify-between shrink-0">
              <span>Select Surah</span>
              <BookMarked className="h-4 w-4" />
            </h3>

            {/* Night mode within reader toggle */}
            <div className="flex items-center justify-between mb-4 border-b border-[#D39858]/10 pb-3 shrink-0">
              <span className="text-xs font-bold uppercase tracking-wider text-[#D39858]">Eye-Safety Night Reading</span>
              <button
                onClick={() => {
                  const val = !readerNightMode;
                  setReaderNightMode(val);
                  localStorage.setItem('reader_night_mode', val.toString());
                }}
                className={`px-3 py-1 text-xs font-bold rounded-full transition-colors border ${
                  readerNightMode 
                    ? 'bg-[#85431E] text-[#EACEAA] border-[#D39858]' 
                    : 'bg-transparent text-[#85431E] border-[#85431E]'
                }`}
              >
                {readerNightMode ? 'Night Mode ON' : 'Off'}
              </button>
            </div>

            {/* Quick Filter Search */}
            <div className="relative mb-4 shrink-0">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#D39858]" />
              <input
                type="text"
                placeholder="Search Surah..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#150C0C]/10 border border-[#D39858]/50 rounded-lg pl-9 pr-4 py-2 text-xs focus:ring-1 focus:ring-[#85431E] outline-none text-inherit placeholder-[#D39858]/80 font-medium font-sans"
              />
            </div>

            {/* Scrollable Surah list */}
            <div className="flex-1 overflow-y-auto max-h-[240px] lg:max-h-none space-y-1 pr-1 text-sm lg:min-h-0">
              {filteredSurahs.map((su) => (
                <button
                  key={su.number}
                  onClick={() => {
                    setSelectedSurah(su.number);
                    fetchSurahData();
                  }}
                  className={`w-full flex items-center justify-between p-2 sm:p-2.5 rounded-xl border text-left transition-all ${
                    selectedSurah === su.number
                      ? 'bg-[#85431E] text-[#EACEAA] border-[#D39858] shadow-md font-medium'
                      : 'border-[#D39858]/20 bg-[#1E0F0D] text-[#EACEAA]/95 hover:bg-[#85431E]/30 hover:text-white'
                  }`}
                >
                  <div className="flex items-center space-x-2.5 sm:space-x-3">
                    <span className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-serif font-bold shrink-0 ${
                      selectedSurah === su.number ? 'bg-[#150C0C]/45 text-white' : 'bg-[#85431E]/90 text-[#EACEAA] shadow-inner'
                    }`}>
                      {su.number}
                    </span>
                    <div className="min-w-0">
                      <h4 className="font-serif font-bold text-xs sm:text-sm tracking-wide truncate">{su.englishName}</h4>
                      <p className={`text-[9px] sm:text-[10px] truncate ${selectedSurah === su.number ? 'text-[#EACEAA]/80' : 'text-stone-400'}`}>
                        {su.englishNameTranslation}
                      </p>
                    </div>
                  </div>
                  <div className="text-right flex flex-col items-end shrink-0 ml-1">
                    <span className="font-arabic text-xs sm:text-base text-[#D39858] font-semibold" dir="rtl">{su.name}</span>
                    <span className={`text-[8px] sm:text-[9px] font-mono ${selectedSurah === su.number ? 'text-[#EACEAA]/70' : 'text-stone-500'}`}>
                      {su.numberOfAyahs} ayahs
                    </span>
                  </div>
                </button>
              ))}
              {filteredSurahs.length === 0 && (
                <p className="text-xs text-center text-[#D39858] font-serif py-4">No Surahs found matching criteria.</p>
              )}
            </div>
          </div>
        </div>

        {/* READER & CONTROLS: Center & Right Column */}
        <div className="lg:col-span-3 lg:h-full lg:flex lg:flex-col lg:min-h-0 space-y-4 lg:space-y-6" id="quran_reader_body_container">

          {/* STICKY CONTROLS BAR (Sticky on mobile, static inside flex on desktop) */}
          <div className={`p-4 rounded-xl border border-[#D39858] shadow-md md:flex md:flex-wrap items-center justify-between gap-4 md:sticky lg:static top-16 z-25 shrink-0 ${
            readerNightMode ? 'bg-[#34150F]' : 'bg-[#EACEAA]'
          }`} id="sticky_reader_controls">
            
            {/* View selectors */}
            <div className="flex flex-wrap items-center gap-3 mb-3 md:mb-0">
              {/* Toggles */}
              <div className="flex items-center bg-[#150C0C]/10 rounded-lg p-0.5 border border-[#D39858]/30 text-xs font-semibold">
                <button
                  onClick={() => setShowArabic(!showArabic)}
                  className={`px-3 py-1 rounded-md transition-colors ${
                    showArabic ? 'bg-[#85431E] text-[#EACEAA]' : 'text-inherit opacity-75'
                  }`}
                >
                  Arabic
                </button>
                <button
                  onClick={() => setShowTransliteration(!showTransliteration)}
                  className={`px-3 py-1 rounded-md transition-colors ${
                    showTransliteration ? 'bg-[#85431E] text-[#EACEAA]' : 'text-inherit opacity-75'
                  }`}
                >
                  Latin
                </button>
                <button
                  onClick={() => setShowTranslation(!showTranslation)}
                  className={`px-3 py-1 rounded-md transition-colors ${
                    showTranslation ? 'bg-[#85431E] text-[#EACEAA]' : 'text-inherit opacity-75'
                  }`}
                >
                  Translation
                </button>
              </div>
            </div>

            {/* Font slider and range selectors */}
            <div className="flex flex-wrap items-center gap-4">
              {/* Range Selector */}
              <div className="flex items-center space-x-2 text-xs">
                <span className="font-serif font-bold text-[#85431E]">Ayah Range:</span>
                <select
                  value={startAyah}
                  onChange={(e) => setStartAyah(parseInt(e.target.value, 10))}
                  className="bg-[#150C0C]/10 border border-[#D39858]/50 rounded p-1 text-xs text-inherit outline-none font-bold"
                >
                  {Array.from({ length: meta.numberOfAyahs }).map((_, i) => (
                    <option key={i} value={i + 1} className="bg-[#34150F] text-[#EACEAA]">{i + 1}</option>
                  ))}
                </select>
                <span className="text-[#D39858]">to</span>
                <select
                  value={endAyah}
                  onChange={(e) => setEndAyah(parseInt(e.target.value, 10))}
                  className="bg-[#150C0C]/10 border border-[#D39858]/50 rounded p-1 text-xs text-inherit outline-none font-bold"
                >
                  {Array.from({ length: meta.numberOfAyahs }).map((_, i) => (
                    <option key={i} value={i + 1} className="bg-[#34150F] text-[#EACEAA]">{i + 1}</option>
                  ))}
                </select>
              </div>

              {/* Slider for Arabic size */}
              <div className="hidden sm:flex items-center space-x-2 text-xs">
                <span className="font-serif font-bold text-[#85431E]">Arabic size:</span>
                <input
                  type="range"
                  min="1.5"
                  max="4"
                  step="0.25"
                  value={arabicFontSize}
                  onChange={(e) => setArabicFontSize(parseFloat(e.target.value))}
                  className="w-24 accent-[#85431E]"
                />
              </div>

              {/* Loop and repeat configuration */}
              <div className="flex items-center space-x-2 text-xs">
                <span className="font-serif font-bold text-[#85431E]">Repeat Mode:</span>
                <select
                  value={repeatMode}
                  onChange={(e) => setRepeatMode(e.target.value as any)}
                  className="bg-[#150C0C]/10 border border-[#D39858]/50 rounded p-1 text-xs text-inherit outline-none font-bold"
                >
                  <option value="none" className="bg-[#34150F] text-[#EACEAA]">None</option>
                  <option value="ayah" className="bg-[#34150F] text-[#EACEAA]">Single Ayah</option>
                  <option value="range" className="bg-[#34150F] text-[#EACEAA]">Ayah Range</option>
                  <option value="surah" className="bg-[#34150F] text-[#EACEAA]">Whole Surah</option>
                </select>

                <select
                  value={repeatCountMax}
                  onChange={(e) => setRepeatCountMax(parseInt(e.target.value, 10))}
                  disabled={repeatMode === 'none' || loopUntilStopped}
                  className="bg-[#150C0C]/10 border border-[#D39858]/50 rounded p-1 text-xs text-inherit outline-none font-bold disabled:opacity-50"
                >
                  <option value={1} className="bg-[#34150F] text-[#EACEAA]">1x</option>
                  <option value={2} className="bg-[#34150F] text-[#EACEAA]">2x</option>
                  <option value={3} className="bg-[#34150F] text-[#EACEAA]">3x</option>
                  <option value={5} className="bg-[#34150F] text-[#EACEAA]">5x</option>
                  <option value={10} className="bg-[#34150F] text-[#EACEAA]">10x</option>
                </select>

                <button
                  onClick={() => setLoopUntilStopped(!loopUntilStopped)}
                  disabled={repeatMode === 'none'}
                  className={`px-2 py-1 rounded text-xs font-bold border transition-all ${
                    loopUntilStopped
                      ? 'bg-[#85431E] text-[#EACEAA] border-[#D39858]'
                      : 'bg-transparent text-inherit border-[#D39858]/50 disabled:opacity-50'
                  }`}
                  title="Loop infinitely until stopped"
                >
                  ∞ Loop
                </button>
              </div>
            </div>
          </div>

          {/* SCROLLABLE READER CORE AREA */}
          <div className="flex-1 overflow-y-auto space-y-6 pr-1 lg:min-h-0 pb-16 scroll-smooth" id="quran_verses_scroller">

            {/* SURAH HEADER CARD */}
          <div className="bg-[#34150F] text-[#EACEAA] rounded-xl border border-[#D39858] p-8 shadow-md relative overflow-hidden text-center">
            {/* faint arabesque corner ornaments in vector */}
            <div className="absolute top-0 left-0 w-24 h-24 border-t-2 border-l-2 border-[#D39858]/20 m-2 rounded-tl-lg" />
            <div className="absolute top-0 right-0 w-24 h-24 border-t-2 border-r-2 border-[#D39858]/20 m-2 rounded-tr-lg" />

            <span className="text-[10px] font-bold text-[#D39858] tracking-widest uppercase font-mono">
              Surah {meta.number} of 114
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-wide mt-1 text-[#EACEAA]">
              {meta.englishName}
            </h2>
            <p className="font-serif italic text-sm text-[#D39858] mt-1 mb-3">
              "{meta.englishNameTranslation}"
            </p>

            <p className="font-arabic text-4xl text-[#EACEAA] my-4" dir="rtl">
              {meta.name}
            </p>

            <div className="flex justify-center space-x-6 text-xs text-[#EACEAA]/80 font-mono border-t border-[#D39858]/20 pt-4 mt-2">
              <span className="bg-[#150C0C] px-3 py-1 rounded border border-[#D39858]/20">
                Revelation: <span className="text-[#D39858] font-bold">{meta.revelationType}</span>
              </span>
              <span className="bg-[#150C0C] px-3 py-1 rounded border border-[#D39858]/20">
                Ayahs: <span className="text-[#D39858] font-bold">{meta.numberOfAyahs}</span>
              </span>
              <span className="bg-[#150C0C] px-3 py-1 rounded border border-[#D39858]/20">
                Juz: <span className="text-[#D39858] font-bold">{getJuzForSurahAndAyah(meta.number, 1)}</span>
              </span>
            </div>

            {/* Bismillah placeholder except Surah 9 (At-Tawbah) */}
            {meta.number !== 9 && (
              <div className="mt-8 pt-4 border-t border-[#D39858]/10 text-center">
                <p className="font-arabic text-2xl sm:text-3xl text-gold-accent tracking-wide" dir="rtl">
                  بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                </p>
                <p className="text-[11px] text-[#D39858] italic font-mono mt-1 mt-1.5">
                  “In the name of Allah, the Most Gracious, the Most Merciful.”
                </p>
              </div>
            )}
          </div>

          {/* READER MAIN BODY */}
          {loading ? (
            <div className="py-24 text-center">
              <div className="inline-block w-8 h-8 border-4 border-[#85431E] border-t-transparent rounded-full animate-spin mb-4" />
              <p className="font-serif italic text-lg text-inherit">Fetching recitation and translation pages...</p>
            </div>
          ) : errorMsg ? (
            <div className="p-8 bg-[#34150F]/20 border border-[#85431E] rounded-xl text-center space-y-4">
              <p className="text-sm font-semibold">{errorMsg}</p>
              <button 
                onClick={fetchSurahData}
                className="bg-[#85431E] text-[#EACEAA] px-4 py-2 rounded font-sans font-bold hover:bg-[#D39858]"
              >
                Retry Loading
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {visibleAyahs.map((ay) => {
                const isPlayingThisAyah = activePlayAyahIndex === ay.numberInSurah;
                const isBookmarked = bookmarks.some(b => b.surahNumber === selectedSurah && b.ayahNumber === ay.numberInSurah);

                return (
                  <div
                    key={ay.number}
                    ref={(el) => { ayahRefs.current[ay.numberInSurah] = el; }}
                    className={`p-6 rounded-2xl border transition-all duration-300 relative ${
                      isPlayingThisAyah 
                        ? 'bg-[#85431E]/20 border-[#D39858] shadow-lg playing-glow' 
                        : isBookmarked
                        ? 'border-[#85431E]/80 bg-gradient-to-r from-[#D39858]/10 to-transparent'
                        : 'border-[#D39858]/35 bg-[#1E0F0D]'
                    }`}
                  >
                    <div className="flex items-start gap-4 sm:gap-6">
                      {/* Left Side: Circular Ayah number badge */}
                      <div className="w-9 h-9 rounded-full bg-[#85431E] border border-[#D39858]/40 text-[#EACEAA] flex items-center justify-center text-xs font-serif font-bold shrink-0 shadow-md">
                        {ay.numberInSurah}
                      </div>

                      {/* Right Area: nested columns containing actions, Arabic script, transliteration & translation */}
                      <div className="flex-1 space-y-4">
                        
                        {/* Action Row - Align actions on top right */}
                        <div className="flex justify-end items-center mr-1 pb-1">
                          {/* Action buttons list */}
                          <div className="flex items-center space-x-3 text-stone-300" id={`actions_ayah_${ay.numberInSurah}`}>
                            {/* Audio play/pause button */}
                            <button
                              onClick={() => {
                                if (isPlayingThisAyah && isPlaying) {
                                  audioRef.current?.pause();
                                  setIsPlaying(false);
                                } else {
                                  const globalIdx = ayahs.findIndex(item => item.numberInSurah === ay.numberInSurah);
                                  playAyahByIndex(globalIdx);
                                }
                              }}
                              className={`p-1.5 rounded-lg hover:bg-[#85431E]/30 border border-[#D39858]/20 transition-all ${
                                isPlayingThisAyah && isPlaying ? 'bg-[#85431E] text-[#EACEAA]' : 'hover:text-[#EACEAA]'
                              }`}
                              title="Recite this Ayah"
                              disabled={audioLoading && isPlayingThisAyah}
                            >
                              {audioLoading && isPlayingThisAyah ? (
                                <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#D39858] border-t-transparent" />
                              ) : isPlayingThisAyah && isPlaying ? (
                                <Pause className="h-4 w-4" />
                              ) : (
                                <Volume2 className="h-4 w-4" />
                              )}
                            </button>

                            {/* Tafsir display trigger */}
                            <button
                              onClick={() => setActiveTafsirAyah(ay)}
                              className="p-1.5 rounded-lg hover:bg-[#85431E]/30 border border-[#D39858]/20 hover:text-[#EACEAA] transition-all"
                              title="Read Tafsir Ibn Kathir"
                            >
                              <FileText className="h-4 w-4" />
                            </button>

                            {/* Bookmark Button */}
                            <button
                              onClick={() => handleBookmarkClick(ay)}
                              className={`p-1.5 rounded-lg hover:bg-[#85431E]/30 border border-[#D39858]/20 transition-all ${
                                isBookmarked ? 'bg-[#85431E] text-[#EACEAA]' : 'hover:text-[#EACEAA]'
                              }`}
                              title={isBookmarked ? "Remove Bookmark" : "Bookmark Ayah"}
                            >
                              <Bookmark className="h-4 w-4" style={{ fill: isBookmarked ? 'currentColor' : 'none' }} />
                            </button>

                            {/* Copy To Clipboard */}
                            <button
                              onClick={() => copyToClipboard(ay)}
                              className="p-1.5 rounded-lg hover:bg-[#85431E]/30 border border-[#D39858]/20 hover:text-[#EACEAA] transition-all"
                              title="Copy Ayah reference"
                            >
                              <Copy className="h-4 w-4" />
                            </button>
                          </div>
                        </div>

                        {/* Arabic script: Calligraphy text aligns on the right */}
                        {showArabic && (
                          <div className="text-right leading-loose pt-1" onClick={dismissTooltip}>
                            <p 
                              className="font-arabic text-[#EACEAA] tracking-wide leading-loose selection:bg-[#85431E]"
                              style={{ 
                                fontSize: `${arabicFontSize}rem`, 
                                lineHeight: `${arabicFontSize * 1.6}rem`
                              }}
                              dir="rtl"
                              lang="ar"
                            >
                              {/* Render words from local dataset - single source of truth for both Arabic and translation */}
                              {(() => {
                                const surahWords = WORD_TRANSLATIONS[selectedSurah as keyof typeof WORD_TRANSLATIONS];
                                const ayahWords = surahWords?.[ay.numberInSurah as keyof typeof surahWords];
                                const words = ayahWords?.words || [];
                                
                                return words.map((word: WordData, wIdx: number) => (
                                  <span
                                    key={wIdx}
                                    onMouseEnter={(e) => handleWordHover(ay.numberInSurah, wIdx, word.translation, e)}
                                    onTouchStart={(e) => handleWordHover(ay.numberInSurah, wIdx, word.translation, e)}
                                    className="inline-block cursor-pointer hover:underline hover:text-[#D39858] transition-colors mx-0.5"
                                  >
                                    {word.arabic}
                                  </span>
                                ));
                              })()}
                            </p>
                          </div>
                        )}

                        {/* Transliteration: Centered golden italics */}
                        {showTransliteration && (
                          <div className="flex justify-center my-2">
                            <p className="text-xs sm:text-sm italic font-serif text-[#D39858]/95 hover:text-[#EACEAA] text-center max-w-2xl leading-relaxed py-1 transition-all select-all">
                              {ay.transliteration}
                            </p>
                          </div>
                        )}

                        {/* Translation: Soft warm white, left-aligned */}
                        {showTranslation && (
                          <p className="text-left font-sans text-xs sm:text-sm text-stone-300 leading-relaxed max-w-3xl select-all pt-1">
                            {ay.translation}
                          </p>
                        )}

                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          </div> {/* End of scrollable verses inner container */}

        </div>
      </div>

      {/* FLOATING AUDIO MINI-PLAYER BAR (Aesthetic Spotify-like controller) */}
      <AnimatePresence>
        {isPlaying && activePlayAyahIndex !== null && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-0 left-0 right-0 z-45 bg-[#34150F] text-[#EACEAA] border-t-2 border-[#D39858] p-4 shadow-2xl"
            id="floating_audio_miniplayer"
          >
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
              
              {/* Media Info details */}
              <div className="flex items-center space-x-3 w-full md:w-auto">
                <span className="text-3xl font-serif text-[#D39858]">🎧</span>
                <div>
                  <h4 className="font-serif font-bold text-sm tracking-wide">
                    Surah {meta.englishName} ({meta.number}:{activePlayAyahIndex})
                  </h4>
                  <p className="text-[10px] text-[#D39858] uppercase px-1 py-0.5 bg-[#150C0C] rounded border border-[#D39858]/20 inline-block font-bold">
                    Reciter: {RECITERS.find(r => r.id === currentReciter)?.name}
                  </p>
                </div>
              </div>

              {/* Loop and counter status badges */}
              {repeatMode !== 'none' && (
                <div className="text-xs bg-[#85431E] px-3.5 py-1 rounded-full font-mono border border-[#D39858]/55 flex items-center space-x-1.5 text-center">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#EACEAA] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#EACEAA]"></span>
                  </span>
                  <span>{loopUntilStopped ? '∞' : `${repeatCurrentCount + 1}/${repeatCountMax}`} Loop: {repeatMode === 'range' ? `Ayah ${startAyah}–${endAyah}` : repeatMode === 'surah' ? 'Surah' : `Ayah ${activePlayAyahIndex}`}</span>
                </div>
              )}

              {/* Controls triggers */}
              <div className="flex items-center space-x-4">
                
                {/* Speed indicator selector */}
                <div className="flex items-center space-x-1 border border-[#D39858]/20 bg-[#150C0C] rounded px-1 text-xs">
                  <span className="text-[10px] text-[#D39858]">Speed:</span>
                  <select
                    value={playbackSpeed}
                    onChange={(e) => setPlaybackSpeed(parseFloat(e.target.value))}
                    className="bg-transparent border-none outline-none font-bold text-[#EACEAA] cursor-pointer"
                  >
                    <option value={0.75} className="bg-[#34150F]">0.75x</option>
                    <option value={1} className="bg-[#34150F]">1.0x</option>
                    <option value={1.25} className="bg-[#34150F]">1.25x</option>
                  </select>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={skipPrevious}
                    className="p-1 rounded hover:bg-[#85431E]/30 text-inherit transition-colors"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={togglePlayback}
                    className="p-2 bg-[#85431E] hover:bg-[#134954] text-[#EACEAA] rounded-full border border-[#D39858]/50 shadow transition-colors"
                  >
                    {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                  </button>
                  <button
                    onClick={skipNext}
                    className="p-1 rounded hover:bg-[#85431E]/30 text-inherit transition-colors"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>

                <button
                  onClick={() => setIsPlaying(false)}
                  className="text-xs text-[#D39858] hover:text-[#EACEAA] font-mono leading-none border border-[#D39858]/20 p-1 rounded-md"
                >
                  X Stop
                </button>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SLIDING TAFSIR DRAWER (Aside Right Panel popup overlay) */}
      <AnimatePresence>
        {activeTafsirAyah && (
          <div className="fixed inset-0 z-50 overflow-hidden flex justify-end" id="tafsir_panel_drawer">
            {/* Backdrop black-out overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveTafsirAyah(null)}
              className="absolute inset-0 bg-black"
            />

            {/* Sliding cabinet */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="relative w-full max-w-lg bg-[#34150F] border-l-2 border-[#D39858] text-[#EACEAA] flex flex-col h-full shadow-2xl p-6"
            >
              {/* Header drawer controls */}
              <div className="flex items-center justify-between border-b border-[#D39858]/30 pb-4 mb-6">
                <div>
                  <h3 className="font-serif text-xl font-bold tracking-tight text-[#EACEAA]">
                    Tafsir Ibn Kathir (Excerpt)
                  </h3>
                  <p className="text-xs font-mono text-[#D39858] mt-1">
                    Surah {meta.englishName} — Ayah {selectedSurah}:{activeTafsirAyah.numberInSurah}
                  </p>
                </div>
                <button
                  onClick={() => setActiveTafsirAyah(null)}
                  className="p-2 border border-[#D39858]/30 rounded-full hover:bg-white/10"
                >
                  Close
                </button>
              </div>

              {/* Scrollable Tafsir Text content body */}
              <div className="flex-1 overflow-y-auto pr-2 space-y-6">
                
                {/* Render source ayah header details */}
                <div className="bg-[#150C0C]/50 p-4 rounded-lg border border-[#D39858]/20 text-right">
                  <p className="font-arabic text-xl leading-relaxed text-[#EACEAA] mb-2" dir="rtl">
                    {activeTafsirAyah.text}
                  </p>
                  <p className="text-xs text-[#D39858] text-left italic border-t border-[#D39858]/10 pt-2 mt-2 leading-relaxed">
                    "{activeTafsirAyah.translation}"
                  </p>
                </div>

                {/* Core Tafseer paragraph */}
                <div className="font-sans text-sm leading-relaxed text-[#EACEAA]/95 space-y-4">
                  <p className="font-serif italic text-[#D39858] border-l-2 border-[#D39858] pl-3 mb-4">
                    Authentic classical commentaries detailing spiritual contexts and theological derivations.
                  </p>
                  {tafsirLoading ? (
                    <div className="flex items-center gap-2 text-[#EACEAA]/60">
                      <div className="animate-spin h-4 w-4 border-2 border-[#D39858] border-t-transparent rounded-full" />
                      <span>Loading tafsir...</span>
                    </div>
                  ) : (
                    <p className="whitespace-pre-wrap">
                      {tafsirContent[activeTafsirAyah.numberInSurah] || 'Tafsir not available for this ayah.'}
                    </p>
                  )}
                </div>

                {/* Read Full Tafsir Button */}
                {!tafsirLoading && tafsirContent[activeTafsirAyah.numberInSurah] && (
                  <button
                    onClick={() => {
                      window.location.href = `/tafsir?surah=${selectedSurah}&ayah=${activeTafsirAyah.numberInSurah}`;
                    }}
                    className="w-full bg-[#85431E] hover:bg-[#D39858] text-[#EACEAA] font-serif font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    Read Full Tafsir →
                  </button>
                )}

                {/* General study notes block */}
                <div className="pt-6 border-t border-[#D39858]/10">
                  <h4 className="font-serif text-[#D39858] text-base font-bold mb-2">Reflecting on Wisdom</h4>
                  <p className="text-xs text-[#EACEAA]/80 leading-relaxed font-mono">
                    Classical commentators like Al-Hafiz Ibn Kathir (d. 774H) analyzed grammatical aspects, narrations (Hadiths) surrounding revelation background, and corresponding verses in other chapters to form the ultimate comprehensive explanations of the sacred text.
                  </p>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* AUX-BOOKMARK DETAILS EDIT POPUP */}
      <AnimatePresence>
        {activeBookmarkId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveBookmarkId(null)}
              className="absolute inset-0 bg-black/60"
            />
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="relative max-w-md w-full bg-[#34150F] border border-[#D39858] rounded-xl p-6 shadow-2xl text-[#EACEAA] z-10 space-y-4"
            >
              <h3 className="font-serif text-lg font-bold border-b border-[#D39858]/20 pb-2 flex items-center justify-between">
                <span>Add Note to Bookmark</span>
                <Sparkles className="h-4 w-4 text-[#D39858]" />
              </h3>
              <p className="text-xs text-[#D39858] font-mono leading-relaxed">
                Add a reflective comment or research notes regarding Ayah {activeBookmarkId.replace('_', ':')}.
              </p>
              
              <textarea
                value={notesInput}
                onChange={(e) => setNotesInput(e.target.value)}
                placeholder="Write your reflection, Tafseer references, or focus thoughts here..."
                rows={4}
                className="w-full bg-[#150C0C]/50 border border-[#D39858]/30 rounded-lg p-2.5 text-sm outline-none focus:ring-1 focus:ring-[#85431E] text-[#EACEAA]"
              />

              <div className="flex space-x-2 pt-2">
                <button
                  onClick={saveBookmarkNote}
                  className="flex-1 bg-[#85431E] hover:bg-[#D39858] text-[#EACEAA] py-2 rounded-lg font-serif font-bold text-sm shadow-md transition-colors"
                >
                  Save Note
                </button>
                <button
                  onClick={() => setActiveBookmarkId(null)}
                  className="px-4 py-2 bg-transparent hover:bg-white/10 text-inherit rounded-lg text-sm transition-colors border border-[#D39858]/50"
                >
                  Skip
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* WORD TRANSLATION TOOLTIP */}
      <AnimatePresence>
        {activeTooltip && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.12 }}
            className="fixed z-50 pointer-events-none"
            style={{
              left: `${activeTooltip.x}px`,
              top: `${activeTooltip.y}px`,
              transform: 'translate(-50%, -100%)'
            }}
          >
            <div className="bg-[#34150F] border border-[#D39858] rounded-lg px-3 py-2 shadow-xl max-w-xs">
              <span className="text-[#EACEAA] text-sm font-medium">
                {activeTooltip.translation || 'translation unavailable'}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
