import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, Clock, User, Calendar, BookText, Filter, Eye, ArrowLeft, 
  HelpCircle, CheckCircle2, Bookmark, Save, RefreshCw, Check, AlertCircle, Share2
} from 'lucide-react';
import { DAWAH_ARTICLES } from '../data/dawah-data';
import { DawahArticle } from '../types';

interface KnowledgeHubProps {
  completedTopics: string[];
  toggleTopicCompletion: (id: string) => void;
}

// Classical definition glossary map
const GLOSSARY_TERMS: Record<string, { term: string; arabic: string; definition: string }> = {
  Aqeedah: {
    term: "Aqeedah",
    arabic: "العقيدة",
    definition: "Firm belief or creed that binds the heart securely, leaving no room for doubt or hesitation."
  },
  Fiqh: {
    term: "Fiqh",
    arabic: "الفقه",
    definition: "Jurisprudence—deep comprehension and extraction of practical Islamic legal rulings from classical texts."
  },
  Seerah: {
    term: "Seerah",
    arabic: "السيرة",
    definition: "The systematic biography and historical chronology of Prophet Muhammad's ﷺ noble life and events."
  },
  Hadith: {
    term: "Hadith",
    arabic: "الحديث",
    definition: "The recorded speech, actions, tacit approvals, or physical characteristics of the Prophet ﷺ."
  },
  Tafseer: {
    term: "Tafseer",
    arabic: "التفسير",
    definition: "Exegesis or detailed scholarly interpretation of the Qur'an to unlock divine context and meanings."
  }
};

// Checkpoint quizzings
const ARTICLE_QUIZZES: Record<string, { question: string; choices: string[]; correctIndex: number; explanation: string }> = {
  art_1: {
    question: "Which of the three main dimensions of Tawheed designates singling out Allah alone for all actions of worship?",
    choices: [
      "Tawheed ar-Rububiyyah (Oneness of Lordship)",
      "Tawheed al-Uluhiyyah (Oneness of Worship)",
      "Tawheed al-Asma was-Sifat (Oneness of Divine Names)"
    ],
    correctIndex: 1,
    explanation: "Tawheed al-Uluhiyyah (Oneness of Worship) demands that all direct acts of physical and spiritual devotion be focused solely upon the Creator without intermediaries."
  },
  art_2: {
    question: "What is the primary spiritual goal of establishing regular daily prayers (Salah) in Islam?",
    choices: [
      "Physical calorie-burning and stretching",
      "Continuous remembrance of Allah and spiritual purification from worldly distractions",
      "Demonstrating linguistic mastery over classical rhymes"
    ],
    correctIndex: 1,
    explanation: "As stated in Surah Taha (20:14), establishing Salah serves directly to sustain physical and spiritual connection and remembrance of Allah."
  },
  art_3: {
    question: "How did Prophet Muhammad ﷺ respond to the severe blockades and hostilities during the early decades in Makkah?",
    choices: [
      "Immediate military counter-offensive against merchants",
      "Stately spiritual posture, majestic patience, and soft verbal dialogue",
      "Abandoning the message entirely to avoid further physical insults"
    ],
    correctIndex: 1,
    explanation: "The Prophet ﷺ responded with continuous spiritual posture, majestic forbearance, and noble verbal argumentations in Makkah."
  }
};

export default function KnowledgeHub({ completedTopics, toggleTopicCompletion }: KnowledgeHubProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeArticle, setActiveArticle] = useState<DawahArticle | null>(null);

  // Journaling note local state
  const [journalInput, setJournalInput] = useState('');
  const [journals, setJournals] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem('study_hub_journals_v2');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Checkpoint Quiz progress
  const [selectedQuizChoice, setSelectedQuizChoice] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizIsCorrect, setQuizIsCorrect] = useState(false);

  // Custom visual toast local container
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    if (activeArticle) {
      setJournalInput(journals[activeArticle.id] || '');
      setSelectedQuizChoice(null);
      setQuizSubmitted(false);
      setQuizIsCorrect(false);
    }
  }, [activeArticle]);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleSaveJournal = () => {
    if (!activeArticle) return;
    const updated = {
      ...journals,
      [activeArticle.id]: journalInput
    };
    setJournals(updated);
    localStorage.setItem('study_hub_journals_v2', JSON.stringify(updated));
    triggerToast("Your personal study reflections and journal notes have been persisted locally!");
  };

  const handleQuizSubmit = (quizMeta: typeof ARTICLE_QUIZZES[string]) => {
    if (selectedQuizChoice === null) return;
    setQuizSubmitted(true);
    const correct = selectedQuizChoice === quizMeta.correctIndex;
    setQuizIsCorrect(correct);
    if (correct) {
      triggerToast("Excellent! Checkpoint answered correctly.");
    } else {
      triggerToast("Incorrect answer. Please read the article text and try again!");
    }
  };

  const categories = ['All', 'Aqeedah', 'Fiqh', 'Seerah', 'Hadith', 'Tafseer', 'Manners & Ethics'];

  const filteredArticles = DAWAH_ARTICLES.filter((art) => {
    const matchesSearch = 
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || art.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 arabesque-pattern relative" id="knowledge_hub_workspace">
      
      {/* Dynamic inline notification banner */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed top-24 right-4 z-50 bg-[#85431E] border border-[#D39858]/60 text-white rounded-xl py-3 px-5 shadow-2xl flex items-center space-x-3 text-sm font-sans"
          >
            <Check className="h-4 w-4 text-[#EACEAA] shrink-0" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {!activeArticle ? (
          <motion.div
            key="grid_view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-8"
          >
            {/* Title and Header */}
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#D39858]">Sacred Scholarly Library</span>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#EACEAA]">The Knowledge Hub</h1>
              <p className="text-sm text-stone-300 leading-relaxed font-sans">
                Browse written logs and articles curated by the study group for developing a comprehensive understanding of core tenets, narrations, and spiritual manners.
              </p>
            </div>

            {/* Search and Category block */}
            <div className="bg-[#34150F] p-6 rounded-xl border border-[#D39858]/40 space-y-4 shadow-md">
              <div className="relative">
                <Search className="absolute left-3 top-3.5 h-4 w-4 text-[#D39858]" />
                <input
                  type="text"
                  placeholder="Search articles, keywords, or authors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#1A0C0A] text-[#EACEAA] placeholder-[#EACEAA]/50 border border-[#D39858] rounded-xl pl-10 pr-4 py-3 text-sm font-sans focus:ring-1 focus:ring-[#85431E] outline-none"
                  id="search_articles_input"
                />
              </div>

              {/* Category Chips scrollable row */}
              <div className="flex items-center space-x-2 overflow-x-auto pb-1 text-xs">
                <span className="text-[#D39858] font-bold font-mono mr-2 flex items-center shrink-0">
                  <Filter className="h-3.5 w-3.5 mr-1" /> CATEGORIES:
                </span>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-full font-serif font-bold tracking-wide transition-all shrink-0 capitalize ${
                      selectedCategory === cat
                        ? 'bg-[#85431E] text-[#EACEAA] border border-[#D39858]'
                        : 'bg-[#150C0C]/80 text-[#D39858] hover:text-[#EACEAA] hover:bg-[#150C0C]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Cards Grid layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="articles_list_grid">
              {filteredArticles.map((art) => {
                const isCompleted = completedTopics.includes(art.id);
                return (
                  <motion.div
                    key={art.id}
                    whileHover={{ y: -4 }}
                    className="bg-[#1E0F0D] rounded-xl border border-[#D39858]/55 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div className="p-5 space-y-3">
                      <div className="flex items-center justify-between">
                        {/* Category tag in Whiskey Sour #D39858 */}
                        <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[#D39858] text-[#34150F]">
                          {art.category}
                        </span>
                        
                        {/* Progress Status check indicator */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleTopicCompletion(art.id);
                          }}
                          className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded border transition-all ${
                            isCompleted 
                              ? 'bg-[#85431E] text-[#EACEAA] border-[#85431E]' 
                              : 'bg-[#150C0C]/60 text-[#D39858] border-[#D39858]/35 hover:bg-[#85431E]/20'
                          }`}
                        >
                          {isCompleted ? '✓ Read Completed' : 'Mark as Read'}
                        </button>
                      </div>

                      <h3 className="font-serif text-lg font-bold text-[#EACEAA] leading-snug">
                        {art.title}
                      </h3>
                      
                      <p className="text-xs text-stone-300 leading-relaxed font-sans line-clamp-3">
                        {art.summary}
                      </p>
                    </div>

                    {/* Metadata summary & trigger column */}
                    <div className="p-4 bg-[#34150F]/20 border-t border-[#D39858]/15 flex items-center justify-between text-[11px] font-mono text-[#D39858]">
                      <div className="flex items-center space-x-3 text-stone-300">
                        <span className="flex items-center">
                          <User className="h-3.5 w-3.5 mr-1 text-[#D39858]" /> {art.author.replace('Ustadh ', '').replace('Dr. ', '')}
                        </span>
                        <span className="flex items-center">
                          <Clock className="h-3.5 w-3.5 mr-1 text-[#D39858]" /> {art.readTime}
                        </span>
                      </div>
                      <button
                        onClick={() => setActiveArticle(art)}
                        className="text-xs text-[#D39858] font-bold hover:text-[#EACEAA] flex items-center space-x-0.5 hover:underline"
                      >
                        <span>Study</span>
                        <BookText className="h-3 w-3 ml-1" />
                      </button>
                    </div>
                  </motion.div>
                );
              })}

              {filteredArticles.length === 0 && (
                <div className="col-span-full py-16 text-center text-[#D39858] font-serif font-bold">
                  No literature found matching search filters.
                </div>
              )}
            </div>

          </motion.div>
        ) : (
          /* ARTICLE DETAILED VIEW PANEL */
          <motion.div
            key="article_view"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="max-w-4xl mx-auto bg-[#1E0F0D] rounded-2xl border-2 border-[#D39858]/60 p-6 sm:p-10 shadow-lg space-y-8"
            id="panel_article_detail"
          >
            {/* Back button */}
            <button
              onClick={() => setActiveArticle(null)}
              className="flex items-center space-x-2 text-sm font-serif font-bold text-[#D39858] hover:text-[#EACEAA] transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Knowledge Hub</span>
            </button>

            {/* Header metadata */}
            <div className="space-y-4 border-b border-[#D39858]/20 pb-6">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded bg-[#D39858] text-[#34150F] text-xs font-mono font-bold uppercase tracking-wide">
                  Category: {activeArticle.category}
                </span>
                
                <button
                  onClick={() => toggleTopicCompletion(activeArticle.id)}
                  className={`text-xs font-mono font-bold px-3 py-1.5 rounded-lg border flex items-center space-x-1 ${
                    completedTopics.includes(activeArticle.id)
                      ? 'bg-[#85431E] text-[#EACEAA] border-[#85431E]'
                      : 'bg-transparent border-[#D39858] text-[#D39858] hover:bg-[#85431E]/20'
                  }`}
                >
                  <Eye className="h-3.5 w-3.5 mr-1" />
                  <span>{completedTopics.includes(activeArticle.id) ? 'Completed Article Study' : 'Mark as Read'}</span>
                </button>
              </div>

              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#EACEAA] tracking-tight leading-tight">
                {activeArticle.title}
              </h2>

              <div className="flex flex-wrap gap-4 text-xs font-mono text-stone-300 italic pt-1">
                <span className="flex items-center"><User className="h-4 w-4 mr-1 text-[#D39858]" /> Written by {activeArticle.author}</span>
                <span className="flex items-center"><Clock className="h-4 w-4 mr-1 text-[#D39858]" /> {activeArticle.readTime}</span>
                <span className="flex items-center"><Calendar className="h-4 w-4 mr-1 text-[#D39858]" /> Published on {activeArticle.date}</span>
              </div>
            </div>

            {/* Grid Layout: Left is Article Content (Chapters), Right is Scholarly Sidebar Panel */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Main Article Content Column */}
              <div className="lg:col-span-2 space-y-6">
                
                <p className="font-serif italic text-base border-l-4 border-[#85431E] pl-4 py-2 text-stone-200 leading-relaxed bg-[#34150F]/45 rounded-r-lg p-4">
                  {activeArticle.content}
                </p>

                {/* Recursive sections rendering if sections are built */}
                {activeArticle.sections && activeArticle.sections.length > 0 && (
                  <div className="space-y-6" id="scholarly_sections_block">
                    {activeArticle.sections.map((sect, sIdx) => (
                      <div 
                        key={sIdx} 
                        id={`chapter_${sIdx}`} 
                        className="scroll-mt-20 space-y-3 bg-[#34150F]/40 p-5 rounded-xl border border-[#D39858]/15"
                      >
                        <h4 className="font-serif text-base sm:text-lg font-bold text-[#EACEAA] flex items-center space-x-2.5 border-b border-[#D39858]/15 pb-2">
                          <span className="font-mono text-xs px-2 rounded bg-[#85431E] text-[#EACEAA]">{sIdx + 1}</span>
                          <span>{sect.heading}</span>
                        </h4>
                        <div className="text-xs sm:text-sm text-stone-300 leading-relaxed font-sans whitespace-pre-wrap">
                          {sect.body}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Scholarly Sidebar Column (Glossary, Local Journaling) */}
              <div className="space-y-6">
                
                {/* 1. Category Classical Definition Glossary */}
                {GLOSSARY_TERMS[activeArticle.category] && (
                  <div className="p-4 bg-[#34150F] rounded-xl border border-[#D39858]/35 space-y-2">
                    <div className="flex items-center justify-between border-b border-[#D39858]/10 pb-1.5 mb-1.5">
                      <span className="text-[10px] font-mono text-[#D39858] font-bold uppercase tracking-wider">Classical Lexicon</span>
                      <span className="font-arabic text-sm text-[#D39858]">{GLOSSARY_TERMS[activeArticle.category].arabic}</span>
                    </div>
                    <h5 className="font-serif font-bold text-sm text-[#EACEAA]">{GLOSSARY_TERMS[activeArticle.category].term}</h5>
                    <p className="text-xs text-stone-300 font-sans leading-relaxed">
                      {GLOSSARY_TERMS[activeArticle.category].definition}
                    </p>
                  </div>
                )}

                {/* 2. Personalized Study Notebook (Disseminates reflections) */}
                <div className="p-4 bg-[#34150F] rounded-xl border border-[#D39858]/35 space-y-3 shadow-md">
                  <div className="flex items-center justify-between border-b border-[#D39858]/10 pb-1.5 mb-1">
                    <span className="text-[10px] font-mono text-[#D39858] font-bold uppercase tracking-wider flex items-center">
                      <Bookmark className="h-3 w-3 mr-1 text-[#D39858]" /> Study Notebook
                    </span>
                    <span className="text-[10px] font-mono text-stone-400">Save Local Note</span>
                  </div>
                  <p className="text-[11px] text-stone-300 font-sans leading-relaxed">
                    Log study progress, personal insights, or questions to raise at the next physical circular board session.
                  </p>
                  <textarea
                    rows={4}
                    placeholder="Enter notes, related book references, or actions taken on this topic..."
                    value={journalInput}
                    onChange={(e) => setJournalInput(e.target.value)}
                    className="w-full bg-[#1A0C0A] text-[#EACEAA] border border-[#D39858]/30 rounded-lg p-2 text-xs focus:ring-1 focus:ring-[#85431E] outline-none"
                  />
                  <button
                    onClick={handleSaveJournal}
                    className="w-full bg-[#85431E] hover:bg-[#D39858] text-[#EACEAA] py-1.5 px-3 rounded-lg text-xs font-serif font-bold transition-all flex items-center justify-center space-x-1 cursor-pointer"
                  >
                    <Save className="h-3.5 w-3.5" />
                    <span>Save Reflections</span>
                  </button>
                </div>

                {/* 3. Article Knowledge Retention Checkpoint */}
                {ARTICLE_QUIZZES[activeArticle.id] && (
                  <div className="p-4 bg-[#34150F] rounded-xl border border-[#D39858]/35 space-y-3">
                    <div className="flex items-center space-x-1.5 border-b border-[#D39858]/10 pb-1.5">
                      <HelpCircle className="h-4 w-4 text-[#D39858]" />
                      <span className="text-[10px] font-mono text-[#D39858] font-bold uppercase tracking-wider">Retention Check</span>
                    </div>
                    <p className="text-xs text-stone-200 font-serif leading-relaxed font-semibold">
                      {ARTICLE_QUIZZES[activeArticle.id].question}
                    </p>
                    <div className="space-y-1.5">
                      {ARTICLE_QUIZZES[activeArticle.id].choices.map((ch, chIdx) => (
                        <button
                          key={chIdx}
                          onClick={() => {
                            if (!quizSubmitted) setSelectedQuizChoice(chIdx);
                          }}
                          disabled={quizSubmitted}
                          className={`w-full text-left p-2 rounded-lg text-xs transition-all border ${
                            selectedQuizChoice === chIdx 
                              ? 'bg-[#85431E]/30 text-white border-[#D39858]' 
                              : 'bg-[#150C0C]/50 border-transparent text-stone-300 hover:bg-[#150C0C]'
                          }`}
                        >
                          <span className="font-mono text-[10px] text-[#D39858] mr-1.5">{chIdx + 1}.</span>
                          {ch}
                        </button>
                      ))}
                    </div>

                    {!quizSubmitted ? (
                      <button
                        onClick={() => handleQuizSubmit(ARTICLE_QUIZZES[activeArticle.id])}
                        disabled={selectedQuizChoice === null}
                        className="w-full py-1.5 px-3 bg-transparent hover:bg-[#85431E]/20 text-[#D39858] hover:text-[#EACEAA] border border-[#D39858]/50 rounded-lg text-xs font-serif font-bold disabled:opacity-50 transition-all cursor-pointer"
                      >
                        Submit Checkpoint
                      </button>
                    ) : (
                      <div className={`p-2.5 rounded-lg border text-xs space-y-1 ${
                        quizIsCorrect 
                          ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300' 
                          : 'bg-rose-950/40 border-rose-500/30 text-rose-300'
                      }`}>
                        <div className="flex items-center space-x-1 font-bold">
                          {quizIsCorrect ? (
                            <>
                              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                              <span>Correct Answer!</span>
                            </>
                          ) : (
                            <>
                              <AlertCircle className="h-4 w-4 text-rose-400" />
                              <span>Incorrect Choice</span>
                            </>
                          )}
                        </div>
                        <p className="leading-relaxed font-sans text-stone-300">{ARTICLE_QUIZZES[activeArticle.id].explanation}</p>
                        <button
                          onClick={() => {
                            setQuizSubmitted(false);
                            setSelectedQuizChoice(null);
                          }}
                          className="mt-1.5 text-[10px] text-stone-400 hover:text-[#EACEAA] font-mono hover:underline flex items-center space-x-1"
                        >
                          <RefreshCw className="h-3 w-3" /> <span>Retry Check</span>
                        </button>
                      </div>
                    )}
                  </div>
                )}

              </div>
            </div>

            {/* Classical quotation block as footnote */}
            <div className="p-5 bg-[#34150F] text-[#EACEAA] rounded-2xl border border-[#D39858]/35 space-y-1">
              <span className="text-[10px] font-mono text-[#D39858] font-bold block uppercase tracking-wider">Reflective Note from Study Group</span>
              <p className="text-xs font-serif italic text-stone-200">
                "May Allah purify our hearts, correct our actions, reward the writers of correct literature, and elevate our ranks upon accurate monotheistic foundations."
              </p>
            </div>

            {/* Footer buttons row */}
            <div className="flex justify-between items-center border-t border-[#D39858]/20 pt-6 mt-4">
              <button
                onClick={() => setActiveArticle(null)}
                className="text-xs font-serif font-bold text-[#D39858] hover:text-[#EACEAA]"
              >
                ← Back to Library list
              </button>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(`Study Article Link: "${activeArticle.title}" by ${activeArticle.author}`);
                  triggerToast("Referenced citation copied successfully! Share the knowledge with colleagues.");
                }}
                className="text-xs font-mono font-bold text-[#D39858] hover:text-stone-100 flex items-center space-x-1 hover:underline"
              >
                <Share2 className="h-3.5 w-3.5 text-[#D39858]" />
                <span>Share Reference Link</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
