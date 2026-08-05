import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, Book, Heart, Clipboard, ChevronDown, CheckCircle, Loader2 } from 'lucide-react';

interface Hadith {
  id: string;
  collection: string;
  number: string;
  narrator: string;
  arabic: string;
  english: string;
  topic: string;
  grade: 'Sahih' | 'Hasan' | 'Daif' | 'Ungraded' | string;
}

// Curated highlights with topic tags (small subset)
const CURATED_HADITHS: Hadith[] = [
  {
    id: "hadith_1",
    collection: "Sahih Al-Bukhari",
    number: "1",
    narrator: "Umar bin Al-Khattab",
    arabic: "إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى",
    english: "Actions are but by intentions, and every person will have only what he intended.",
    topic: "Sincerity (Niyyah)",
    grade: "Sahih"
  },
  {
    id: "hadith_2",
    collection: "Sahih Al-Bukhari",
    number: "13",
    narrator: "Anas bin Malik",
    arabic: "لاَ يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ",
    english: "None of you truly believes until he loves for his brother what he loves for himself.",
    topic: "Brotherhood",
    grade: "Sahih"
  },
  {
    id: "hadith_3",
    collection: "Sahih Muslim",
    number: "2699",
    narrator: "Abu Hurairah",
    arabic: "مَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا سَهَّلَ اللَّهُ لَهُ بِهِ طَرِيقًا إِلَى الْجَنَّةِ",
    english: "Whoever walks a path traversing it to seek knowledge, Allah will make easy for him a path to Paradise.",
    topic: "Sacred Knowledge",
    grade: "Sahih"
  },
  {
    id: "hadith_4",
    collection: "Sahih Muslim",
    number: "2564",
    narrator: "Abu Hurairah",
    arabic: "تَفْتَحُ أَبْوَابُ الْجَنَّةِ يَوْمَ الاِثْنَيْنِ وَيَوْمَ الْخَمِيسِ فَيُغْفَرُ لِكُلِّ عَبْدٍ لاَ يُشْرِكُ بِاللَّهِ شَيْئًا",
    english: "The gates of Paradise are opened on Mondays and Thursdays, and every servant who does not associate anything with Allah is forgiven.",
    topic: "Forgiveness",
    grade: "Sahih"
  },
  {
    id: "hadith_5",
    collection: "Sunan Abi Dawud",
    number: "3641",
    narrator: "Abu ad-Darda",
    arabic: "إِنَّ الْعُلَمَاءَ وَرَثَةُ الأَنْبِيَاءِ، وَإِنَّ الأَنْبِيَاءَ لَمْ يُوَرِّثُوا دِينَارًا وَلاَ دِرْهَمًا، وَإِنَّمَا وَرَّثُوا الْعِلْمَ",
    english: "The scholars are the heirs of the Prophets. The Prophets do not leave behind dinars or dirhams, but they leave behind knowledge.",
    topic: "Sacred Knowledge",
    grade: "Sahih"
  },
  {
    id: "hadith_6",
    collection: "Riyad As-Salihin",
    number: "54",
    narrator: "Abu Hurairah",
    arabic: "الدِّينُ النَّصِيحَةُ",
    english: "The religion is sincere advice (Nasihah).",
    topic: "Sincerity (Niyyah)",
    grade: "Sahih"
  },
  {
    id: "hadith_7",
    collection: "Arbain An-Nawawi",
    number: "12",
    narrator: "Abu Hurairah",
    arabic: "مِنْ حُسْنِ إِسْلاَمِ الْمَرْءِ تَرْكُهُ مَا لاَ يَعْنِيهِ",
    english: "Part of the perfection of one's Islam is his leaving that which does not concern him.",
    topic: "Manners & Ethics",
    grade: "Sahih"
  },
  {
    id: "hadith_8",
    collection: "Sahih Al-Bukhari",
    number: "6018",
    narrator: "Aisha (RadhiAllahu Anha)",
    arabic: "مَا زَالَ جِبْرِيلُ يُوصِينِي بِالْجَارِ حَتَّى ظَنَنْتُ أَنَّهُ سَيُوَرِّثُهُ",
    english: "Jibreel kept recommending treating neighbors well until I thought he would make them heirs.",
    topic: "Manners & Ethics",
    grade: "Sahih"
  },
  {
    id: "hadith_9",
    collection: "Sahih Al-Bukhari",
    number: "3116",
    narrator: "Muawiyah bin Abi Sufyan",
    arabic: "مَنْ يُرِدِ اللَّهُ بِهِ خَيْرًا يُفَقِّهْهُ فِي الدِّينِ",
    english: "He for whom Allah intends goodness, He grants him deep comprehension & intellect of the religion (Fiqh).",
    topic: "Sacred Knowledge",
    grade: "Sahih"
  },
  {
    id: "hadith_10",
    collection: "Sahih Al-Bukhari",
    number: "6475",
    narrator: "Sahl bin Sa'd",
    arabic: "مَنْ يَضْمَنْ لِي مَا بَيْنَ لَحْيَيْهِ وَمَا بَيْنَ رِجْلَيْهِ أَضْمَنْ لَهُ الْجَنَّةَ",
    english: "Whoever guarantees for me what is between his jaws (tongue) and what is between his legs (chastity), I guarantee for him Paradise.",
    topic: "Manners & Ethics",
    grade: "Sahih"
  }
];

export default function HadithLibrary() {
  const [hadiths, setHadiths] = useState<Hadith[]>(CURATED_HADITHS);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCollection, setSelectedCollection] = useState('All');
  const [selectedTopic, setSelectedTopic] = useState('All');
  const [expandedHadithId, setExpandedHadithId] = useState<string | null>(null);
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('fav_hadiths');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [recentViewedIds, setRecentViewedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('recent_hadiths_viewed');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  // Lazy load collection data when selected
  useEffect(() => {
    const loadCollection = async () => {
      if (selectedCollection === 'All') {
        setHadiths(CURATED_HADITHS);
        return;
      }

      setIsLoading(true);
      try {
        let collectionHadiths: Hadith[];
        
        switch (selectedCollection) {
          case 'Sahih Al-Bukhari':
            const bukhari = await import('../data/hadith/bukhari.json') as { default: Hadith[] };
            collectionHadiths = bukhari.default;
            break;
          case 'Sahih Muslim':
            const muslim = await import('../data/hadith/muslim.json') as { default: Hadith[] };
            collectionHadiths = muslim.default;
            break;
          case 'Sunan Abi Dawud':
            const abudawud = await import('../data/hadith/abudawud.json') as { default: Hadith[] };
            collectionHadiths = abudawud.default;
            break;
          case 'Riyad As-Salihin':
            const riyad = await import('../data/hadith/riyad-assalihin.json') as { default: Hadith[] };
            collectionHadiths = riyad.default;
            break;
          case 'Arbain An-Nawawi':
            const nawawi = await import('../data/hadith/arbain-nawawi.json') as { default: Hadith[] };
            collectionHadiths = nawawi.default;
            break;
          default:
            collectionHadiths = [];
        }
        
        setHadiths(collectionHadiths);
      } catch (error) {
        console.error(`Failed to load ${selectedCollection}:`, error);
        setHadiths([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadCollection();
  }, [selectedCollection]);

  useEffect(() => {
    localStorage.setItem('fav_hadiths', JSON.stringify(favoriteIds));
  }, [favoriteIds]);

  useEffect(() => {
    localStorage.setItem('recent_hadiths_viewed', JSON.stringify(recentViewedIds));
  }, [recentViewedIds]);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavoriteIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleHadithClick = (id: string) => {
    setExpandedHadithId(prev => (prev === id ? null : id));
    
    // Add to recents
    setRecentViewedIds(prev => {
      const filtered = prev.filter(x => x !== id);
      const updated = [id, ...filtered].slice(0, 10);
      return updated;
    });
  };

  const handleCopy = (hadith: Hadith, e: React.MouseEvent) => {
    e.stopPropagation();
    const text = `[${hadith.collection} - Hadith No. ${hadith.number}]\nNarrated by: ${hadith.narrator}\n"${hadith.english}"\n\nArabic Text: ${hadith.arabic}`;
    navigator.clipboard.writeText(text);
    setCopiedId(hadith.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const collections = ['All', 'Sahih Al-Bukhari', 'Sahih Muslim', 'Sunan Abi Dawud', 'Riyad As-Salihin', 'Arbain An-Nawawi'];
  const topics = ['All', 'Sincerity (Niyyah)', 'Brotherhood', 'Sacred Knowledge', 'Forgiveness', 'Manners & Ethics'];

  const filteredHadiths = useMemo(() => {
    return hadiths.filter(h => {
      const matchesSearch = 
        h.english.toLowerCase().includes(searchQuery.toLowerCase()) || 
        h.narrator.toLowerCase().includes(searchQuery.toLowerCase()) ||
        h.arabic.includes(searchQuery) ||
        h.topic.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCollection = selectedCollection === 'All' || h.collection === selectedCollection;
      const matchesTopic = selectedTopic === 'All' || h.topic === selectedTopic;

      return matchesSearch && matchesCollection && matchesTopic;
    });
  }, [hadiths, searchQuery, selectedCollection, selectedTopic]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 arabesque-pattern" id="hadith_library_root">
      
      {/* Search and Filters Strip */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-[#D39858]" />
          <input
            type="text"
            placeholder="Search by keyword, narrator, Arabic, or collection..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-[#1E0F0D] text-[#EACEAA] rounded-xl border border-[#D39858]/30 focus:outline-none focus:border-[#D39858] text-sm font-sans"
          />
        </div>
        
        {/* Mobile Filter Button */}
        <button
          onClick={() => setFilterDrawerOpen(true)}
          className="md:hidden flex items-center justify-center gap-2 bg-[#34150F] border border-[#D39858]/40 px-4 py-3 rounded-xl text-sm font-semibold text-[#EACEAA] hover:bg-[#85431E]/30"
        >
          <Filter className="h-4 w-4 text-[#D39858]" />
          <span>Filters</span>
        </button>

        {/* Laptop Filters */}
        <div className="hidden md:flex items-center gap-3">
          <select
            value={selectedCollection}
            onChange={(e) => setSelectedCollection(e.target.value)}
            className="px-4 py-2.5 bg-[#34150F] text-[#EACEAA] border border-[#D39858]/30 rounded-xl text-xs font-serif font-bold cursor-pointer"
          >
            {collections.map(c => <option key={c} value={c}>{c === 'All' ? 'All Collections' : c}</option>)}
          </select>
          <select
            value={selectedTopic}
            onChange={(e) => setSelectedTopic(e.target.value)}
            className="px-4 py-2.5 bg-[#34150F] text-[#EACEAA] border border-[#D39858]/30 rounded-xl text-xs font-serif font-bold cursor-pointer"
          >
            {topics.map(t => <option key={t} value={t}>{t === 'All' ? 'All Topics' : t}</option>)}
          </select>
        </div>
      </div>

      {/* Main Grid View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Desktop Left Sidebar Filter inside Content Area */}
        <div className="hidden lg:block lg:col-span-3 space-y-6">
          <div className="bg-[#1E0F0D] border border-[#D39858]/30 rounded-xl p-5">
            <h4 className="font-serif font-bold text-sm text-[#D39858] uppercase tracking-wider mb-4 pb-2 border-b border-[#D39858]/20 flex items-center gap-2">
              <Book className="h-4 w-4" />
              Collections
            </h4>
            <div className="space-y-1">
              {collections.map(col => (
                <button
                  key={col}
                  onClick={() => setSelectedCollection(col)}
                  className={`w-full text-left px-3 py-2 text-xs font-sans rounded-md transition-colors ${
                    selectedCollection === col
                      ? 'bg-[#85431E]/40 text-[#EACEAA] border-l-2 border-[#D39858]'
                      : 'text-[#EACEAA]/60 hover:text-[#EACEAA] hover:bg-[#34150F]/45'
                  }`}
                >
                  {col === 'All' ? 'All Compilations' : col}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-[#1E0F0D] border border-[#D39858]/30 rounded-xl p-5">
            <h4 className="font-serif font-bold text-sm text-[#D39858] uppercase tracking-wider mb-2 pb-2 border-b border-[#D39858]/20 flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Topics
            </h4>
            <p className="text-[10px] text-[#EACEAA]/40 mb-3 italic">Curated highlights only</p>
            <div className="space-y-1">
              {topics.map(top => (
                <button
                  key={top}
                  onClick={() => setSelectedTopic(top)}
                  className={`w-full text-left px-3 py-2 text-xs font-sans rounded-md transition-colors ${
                    selectedTopic === top
                      ? 'bg-[#85431E]/40 text-[#EACEAA] border-l-2 border-[#D39858]'
                      : 'text-[#EACEAA]/60 hover:text-[#EACEAA] hover:bg-[#34150F]/45'
                  }`}
                >
                  {top === 'All' ? 'All Topics' : top}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content List / Columns */}
        <div className="col-span-1 lg:col-span-9 space-y-4">
          <div className="text-center md:text-left">
            <span className="text-xs font-mono text-[#D39858] tracking-widest uppercase">Verified Transmissions</span>
            <h2 className="font-serif text-2xl font-bold text-[#EACEAA] mt-1">Foundational Prophetic Sayings</h2>
            <p className="text-xs text-[#EACEAA]/60 mt-1">
              {isLoading ? 'Loading collection...' : `Showing ${filteredHadiths.length} authenticated Hadiths matching current criteria.`}
            </p>
          </div>

          {isLoading ? (
            <div className="p-12 text-center bg-[#1E0F0D] border border-[#D39858]/20 rounded-xl">
              <Loader2 className="h-8 w-8 text-[#D39858] animate-spin mx-auto mb-3" />
              <p className="text-sm text-[#EACEAA]/80">Loading hadith collection...</p>
            </div>
          ) : filteredHadiths.length === 0 ? (
            <div className="p-12 text-center bg-[#1E0F0D] border border-[#D39858]/20 rounded-xl">
              <Book className="h-10 w-10 text-[#D39858]/30 mx-auto mb-3" />
              <p className="text-sm text-[#EACEAA]/80">No Hadiths found matching that search.</p>
              <button onClick={() => { setSearchQuery(''); setSelectedCollection('All'); setSelectedTopic('All'); }} className="text-xs text-[#D39858] underline mt-2 hover:text-[#EACEAA]">Clear Filters</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredHadiths.map((item) => {
                const isExpanded = expandedHadithId === item.id;
                const isFavorite = favoriteIds.includes(item.id);
                return (
                  <motion.div
                    key={item.id}
                    layoutId={`hadith_card_${item.id}`}
                    onClick={() => handleHadithClick(item.id)}
                    className={`bg-[#34150F] hover:bg-[#1E0F0D] border rounded-xl p-5 cursor-pointer flex flex-col justify-between transition-all group ${
                      isExpanded ? 'border-[#D39858] md:col-span-2' : 'border-[#D39858]/35'
                    }`}
                  >
                    <div>
                      {/* Grid Header line */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono uppercase bg-[#85431E]/20 text-[#D39858] px-2 py-0.5 rounded border border-[#D39858]/15">
                            {item.collection}
                          </span>
                          <span className="text-[10px] text-[#EACEAA]/45 font-mono">No. {item.number}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded border ${
                            item.grade === 'Sahih' 
                              ? 'bg-emerald-950/40 text-emerald-400 border-emerald-900/40'
                              : item.grade === 'Ungraded'
                              ? 'bg-gray-700/40 text-gray-400 border-gray-600/40'
                              : 'bg-amber-950/40 text-amber-400 border-amber-900/40'
                          }`}>
                            {item.grade}
                          </span>
                          <button
                            onClick={(e) => toggleFavorite(item.id, e)}
                            className="p-1 hover:text-rose-400 transition-colors"
                            title="Add to Favorites"
                          >
                            <Heart className={`h-4 w-4 ${isFavorite ? 'text-rose-500 fill-rose-500' : 'text-[#D39858]/50'}`} />
                          </button>
                        </div>
                      </div>

                      {/* Arabic recitation quotes */}
                      <p className="font-arabic text-[#D39858] text-right text-lg leading-loose mb-3" dir="rtl">
                        {item.arabic}
                      </p>

                      <p className="text-xs text-[#EACEAA]/60 font-serif italic mb-2">
                        Narrated by: {item.narrator} (RadhiAllahu Anhu)
                      </p>

                      <p className="text-xs sm:text-sm text-[#EACEAA] leading-relaxed font-sans font-normal">
                        "{item.english}"
                      </p>
                    </div>

                    {/* Expand inline details */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-4 pt-4 border-t border-[#D39858]/15 space-y-3"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="bg-[#1E0F0D] p-3 rounded-lg border border-[#D39858]/15">
                            <span className="block text-[10px] font-mono text-[#D39858] uppercase tracking-widest mb-1">Topic Classification</span>
                            <span className="text-xs font-sans text-[#EACEAA]/80">{item.topic}</span>
                          </div>
                          
                          {/* Details actions */}
                          <div className="flex items-center justify-between pt-1">
                            <div className="flex items-center gap-3">
                              <button
                                onClick={(e) => handleCopy(item, e)}
                                className="flex items-center gap-1.5 text-[10px] font-mono text-[#D39858] hover:text-[#EACEAA] transition-colors"
                              >
                                {copiedId === item.id ? (
                                  <>
                                    <CheckCircle className="h-3 w-3 text-emerald-400" />
                                    <span>Copied!</span>
                                  </>
                                ) : (
                                  <>
                                    <Clipboard className="h-3 w-3" />
                                    <span>Copy Text</span>
                                  </>
                                )}
                              </button>
                            </div>
                            <span className="text-[10px] font-mono text-[#EACEAA]/40">Source: Sunnah.com (via AhmedBaset/hadith-json)</span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {!isExpanded && (
                      <div className="mt-4 pt-2.5 border-t border-[#D39858]/10 flex items-center justify-between text-[10px] font-mono text-[#D39858]">
                        <span>Click to expand commentary</span>
                        <ChevronDown className="h-3.5 w-3.5 group-hover:translate-y-0.5 transition-transform" />
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Slide-out mobile filters bottom-sheet */}
      <AnimatePresence>
        {filterDrawerOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden md:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setFilterDrawerOpen(false)}
              className="absolute inset-0 bg-[#000]"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute bottom-0 inset-x-0 max-h-[85vh] bg-[#34150F] rounded-t-2xl border-t border-[#D39858] p-6 shadow-2xl flex flex-col justify-between"
            >
              <div className="space-y-6 overflow-y-auto pr-1">
                {/* Drag handle */}
                <span className="block w-12 h-1 bg-[#D39858]/30 mx-auto rounded-full mb-2" />
                
                <h3 className="font-serif font-bold text-lg text-[#EACEAA] text-center mb-4">Filter sacred library</h3>
                
                {/* Collection Filter */}
                <div className="space-y-2">
                  <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#D39858]">Compilations</span>
                  <div className="grid grid-cols-2 gap-2">
                    {collections.map(c => (
                      <button
                        key={c}
                        onClick={() => setSelectedCollection(c)}
                        className={`px-3 py-2 rounded-lg text-left text-xs transition-all ${
                          selectedCollection === c
                            ? 'bg-[#85431E] text-[#EACEAA] font-bold border border-[#D39858]'
                            : 'bg-[#1E0F0D] text-[#EACEAA]/60 border border-[#D39858]/10'
                        }`}
                      >
                        {c === 'All' ? 'All Collections' : c}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Topic Filter */}
                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#D39858]">Topics</span>
                    <span className="text-[9px] text-[#EACEAA]/40 italic">Curated only</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {topics.map(t => (
                      <button
                        key={t}
                        onClick={() => setSelectedTopic(t)}
                        className={`px-3 py-2 rounded-lg text-left text-xs transition-all ${
                          selectedTopic === t
                            ? 'bg-[#85431E] text-[#EACEAA] font-bold border border-[#D39858]'
                            : 'bg-[#1E0F0D] text-[#EACEAA]/60 border border-[#D39858]/10'
                        }`}
                      >
                        {t === 'All' ? 'All Topics' : t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <button
                  onClick={() => setFilterDrawerOpen(false)}
                  className="w-full bg-[#85431E] hover:bg-[#D39858] text-[#EACEAA] py-3 rounded-xl font-serif text-sm font-bold shadow transition-colors"
                >
                  Apply & Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Attribution Footer */}
      <div className="mt-8 pt-4 border-t border-[#D39858]/10 text-center">
        <p className="text-[10px] text-[#EACEAA]/40 font-mono">
          Source: Sunnah.com (via AhmedBaset/hadith-json)
        </p>
      </div>
    </div>
  );
}
