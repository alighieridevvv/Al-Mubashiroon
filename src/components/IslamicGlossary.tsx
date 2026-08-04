import { useState, useEffect } from 'react';
import { GLOSSARY_TERMS, GlossaryTerm } from '../data/glossary-data';
import { Search, Book, Sparkles, Filter } from 'lucide-react';

export default function IslamicGlossary() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [alphabetMode, setAlphabetMode] = useState<'english' | 'arabic'>('english');
  const [selectedLetter, setSelectedLetter] = useState<string>('All');
  const [termOfDay, setTermOfDay] = useState<GlossaryTerm | null>(null);

  // Categories list
  const categories = ['All', 'Aqeedah', 'Fiqh', 'Seerah', "Qur'an Sciences", 'Tasawwuf', 'General'];

  // Alphabets sequences
  const englishAlphabet = ['All', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')];
  const arabicAlphabet = ['All', ...'أبتثجحخدذرزسشصضطظعغفقكلمنهوي'.split('')];

  // Rotate term of the day daily based on day of year
  useEffect(() => {
    const today = new Date();
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
    const index = dayOfYear % GLOSSARY_TERMS.length;
    setTermOfDay(GLOSSARY_TERMS[index] || GLOSSARY_TERMS[0]);
  }, []);

  // Filtering terms
  const filteredTerms = GLOSSARY_TERMS.filter(term => {
    const matchesCategory = selectedCategory === 'All' || term.category === selectedCategory;
    const matchesKeyword = 
      term.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
      term.meaning.toLowerCase().includes(searchQuery.toLowerCase()) ||
      term.explanation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      term.transliteration.toLowerCase().includes(searchQuery.toLowerCase()) ||
      term.arabic.includes(searchQuery);

    let matchesLetter = true;
    if (selectedLetter !== 'All') {
      if (alphabetMode === 'english') {
        matchesLetter = term.term.toUpperCase().startsWith(selectedLetter);
      } else {
        matchesLetter = term.arabic.startsWith(selectedLetter);
      }
    }

    return matchesCategory && matchesKeyword && matchesLetter;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10" id="islamic_glossary_page">
      {/* Page header banner */}
      <div className="bg-[#34150F] text-[#EACEAA] rounded-xl border border-[#D39858] p-8 shadow-md relative overflow-hidden text-center mb-8">
        <div className="absolute top-0 left-0 w-24 h-24 border-t-2 border-l-2 border-[#D39858]/20 m-2 rounded-tl-lg" />
        <div className="absolute bottom-0 right-0 w-24 h-24 border-b-2 border-r-2 border-[#D39858]/20 m-2 rounded-br-lg" />
        <span className="text-[10px] uppercase font-mono tracking-widest text-[#D39858]">Sacred Vocabulary</span>
        <h2 className="font-serif text-3xl font-bold text-[#EACEAA] my-2">Islamic Glossary & Lexicon</h2>
        <p className="max-w-xl mx-auto text-xs text-[#EACEAA]/80 font-sans leading-relaxed">
          Embark upon a classical treasury of authentic legal, theological, and historical dictionary terms, carefully preloaded to support your sacred learning journey.
        </p>
      </div>

      {/* Term of the Day banner */}
      {termOfDay && (
        <div className="bg-[#85431E] text-[#EACEAA] border border-[#D39858] rounded-xl p-6 shadow-md mb-8 relative overflow-hidden" id="glossary_term_of_the_day">
          <div className="absolute top-1/2 right-12 -translate-y-1/2 text-glow opacity-10 text-8xl font-arabic pointer-events-none hidden md:block">
            {termOfDay.arabic}
          </div>
          <div className="flex items-center space-x-2 text-xs font-mono uppercase text-[#EACEAA] mb-3">
            <Sparkles className="h-4 w-4 animate-spin text-amber-300" />
            <span className="font-bold tracking-widest">Axiom of the Day</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 border-b border-[#D39858]/30 pb-3 mb-4">
            <div>
              <h3 className="font-serif text-2xl font-bold flex items-baseline gap-2 text-white">
                <span>{termOfDay.term}</span>
                <span className="text-sm font-sans font-normal italic text-[#EACEAA]/75">({termOfDay.transliteration})</span>
              </h3>
              <p className="text-xs font-medium text-[#EACEAA] uppercase tracking-wider mt-1">
                Category: <span className="font-mono text-amber-200">{termOfDay.category}</span>
              </p>
            </div>
            <div className="text-right flex md:block items-center gap-2">
              <span className="font-arabic text-3xl text-white select-all block leading-none">{termOfDay.arabic}</span>
            </div>
          </div>
          <p className="text-sm font-semibold text-[#EACEAA]/95 mb-2 font-sans italic">
            Literal Meaning: {termOfDay.meaning}
          </p>
          <p className="text-xs leading-relaxed text-white/90">
            {termOfDay.explanation}
          </p>
          {termOfDay.reference && (
            <p className="text-[10px] font-mono opacity-80 mt-3 text-right">
              Reference: {termOfDay.reference}
            </p>
          )}
        </div>
      )}

      {/* Primary search & alphabetical row controls */}
      <div className="bg-[#EACEAA] bg-opacity-95 dark:bg-[#34150F] rounded-xl p-6 border border-[#D39858] shadow-md space-y-5 mb-8" id="glossary_controls">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-center">
          {/* Main search input */}
          <div className="relative lg:col-span-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-[#85431E]" />
            <input
              type="text"
              placeholder="Search terms, meanings or concepts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#150C0C]/10 dark:bg-[#150C0C]/40 border border-[#D39858]/50 rounded-lg pl-9 pr-4 py-2.5 text-xs focus:ring-1 focus:ring-[#85431E] outline-none placeholder-[#85431E]/60 text-inherit font-sans"
            />
          </div>

          {/* Alphabet format toggle */}
          <div className="flex items-center space-x-2 justify-start lg:justify-end">
            <span className="text-xs font-bold text-[#85431E] uppercase">Alphabet:</span>
            <div className="inline-flex rounded-lg bg-[#150C0C]/10 p-1 border border-[#D39858]/30">
              <button
                onClick={() => { setAlphabetMode('english'); setSelectedLetter('All'); }}
                className={`px-3 py-1 text-[10px] uppercase font-mono font-bold rounded-md transition-all ${
                  alphabetMode === 'english' ? 'bg-[#85431E] text-[#EACEAA]' : 'text-[#85431E] dark:text-[#D39858]'
                }`}
              >
                English
              </button>
              <button
                onClick={() => { setAlphabetMode('arabic'); setSelectedLetter('All'); }}
                className={`px-3 py-1 text-[10px] uppercase font-mono font-bold rounded-md transition-all ${
                  alphabetMode === 'arabic' ? 'bg-[#85431E] text-[#EACEAA]' : 'text-[#85431E] dark:text-[#D39858]'
                }`}
              >
                Arabic (العربية)
              </button>
            </div>
          </div>

          {/* Category Filter shortcut */}
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-[#85431E] shrink-0" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-[#150C0C]/5 dark:bg-[#150C0C]/40 border border-[#D39858]/50 rounded-lg py-2.5 px-3 text-xs focus:ring-1 focus:ring-[#85431E] outline-none text-inherit font-sans"
            >
              {categories.map(cat => (
                <option key={cat} value={cat} className="bg-[#34150F] text-[#EACEAA]">{cat}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Index Scroll Row (English or Arabic) */}
        <div className="border-t border-[#D39858]/20 pt-4">
          <div className="flex overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-[#85431E]/30 gap-1" id="alphabetical_slide_row">
            {(alphabetMode === 'english' ? englishAlphabet : arabicAlphabet).map((letter) => (
              <button
                key={letter}
                onClick={() => setSelectedLetter(letter)}
                className={`min-w-8 h-8 flex items-center justify-center rounded-lg text-xs font-semibold uppercase transition-all ${
                  selectedLetter === letter
                    ? 'bg-[#85431E] text-[#EACEAA] border border-[#D39858]'
                    : 'bg-[#150C0C]/5 hover:bg-[#85431E]/15 text-[#85431E] dark:text-[#D39858]'
                }`}
              >
                {letter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main layout contents area */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8" id="glossary_grid_container">
        
        {/* Sticky Desktop Categories Menu (Left Column) */}
        <div className="hidden lg:block lg:col-span-1 lg:sticky lg:top-24 lg:h-[calc(100vh-10rem)] overflow-y-auto space-y-2 pr-2" id="glossary_desktop_sidebar">
          <div className="bg-[#34150F] p-5 rounded-xl border border-[#D39858] shadow-md text-[#EACEAA]">
            <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-[#D39858] border-b border-[#D39858]/30 pb-2.5 mb-4">
              Lexicon Domains
            </h3>
            <div className="space-y-1.5 text-xs">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`w-full py-2.5 px-3 rounded-lg text-left font-semibold uppercase tracking-wider block transition-all ${
                    selectedCategory === cat
                      ? 'bg-[#85431E] text-white border-l-4 border-[#D39858]'
                      : 'text-[#D39858] hover:text-[#EACEAA] hover:bg-[#150C0C]/40'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 3-Column Card Grid (Remaining Columns) */}
        <div className="lg:col-span-3">
          {filteredTerms.length === 0 ? (
            <div className="bg-[#EACEAA] bg-opacity-70 dark:bg-[#34150F] rounded-xl p-12 text-center text-[#85431E] border border-[#D39858]/30 dark:text-[#EACEAA]" id="glossary_empty_state">
              <Book className="h-10 w-10 mx-auto mb-3 animate-bounce" />
              <p className="font-serif text-base font-bold">No vocabulary terms match your specific filter queries.</p>
              <button
                onClick={() => { setSelectedCategory('All'); setSearchQuery(''); setSelectedLetter('All'); }}
                className="mt-3 px-4 py-2 bg-[#85431E] text-[#EACEAA] rounded-lg text-xs font-bold"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" id="glossary_cards_grid">
              {filteredTerms.map((term) => (
                <div
                  key={term.id}
                  className="bg-[#EACEAA] bg-opacity-90 dark:bg-[#34150F] border border-[#D39858] rounded-xl p-5 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group hover:border-[#85431E]"
                  id={`glossary_card_${term.id}`}
                >
                  {/* Top card segment with term name and Arabic script */}
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <span className="px-2 py-0.5 rounded text-[8px] font-mono bg-[#85431E]/10 border border-[#85431E]/30 text-[#85431E] dark:text-[#D39858]/80">
                        {term.category}
                      </span>
                      <span className="font-arabic text-xl text-[#85431E] dark:text-amber-200 select-all tracking-wide">{term.arabic}</span>
                    </div>

                    <h4 className="font-serif text-base font-bold text-[#85431E] dark:text-[#EACEAA] leading-none mb-1 group-hover:text-[#85431E] dark:group-hover:text-amber-100">
                      {term.term}
                    </h4>
                    <p className="font-sans text-[11px] select-all italic text-[#85431E]/80 dark:text-[#D39858]/80 mb-3 block">
                      Phonetic: {term.transliteration}
                    </p>

                    <p className="text-xs font-bold text-stone-700 dark:text-[#EACEAA]/90 font-sans mb-2 leading-relaxed">
                      Literal: {term.meaning}
                    </p>
                    <p className="text-[11.5px] leading-relaxed text-[#34150F]/90 dark:text-[#EACEAA]/80 font-sans">
                      {term.explanation}
                    </p>
                  </div>

                  {/* Optional Bottom meta block */}
                  {(term.reference || term.relatedTerms) && (
                    <div className="border-t border-[#D39858]/20 pt-3 mt-4 space-y-1 text-[10px]">
                      {term.relatedTerms && (
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="font-bold text-[#85431E] dark:text-[#D39858]">See also:</span>
                          {term.relatedTerms.map(rt => (
                            <span 
                              key={rt} 
                              className="underline cursor-pointer hover:text-[#85431E]"
                              onClick={() => setSearchQuery(rt)}
                            >
                              {rt}
                            </span>
                          ))}
                        </div>
                      )}
                      {term.reference && (
                        <p className="opacity-80 font-mono text-stone-500 text-right">
                          Ref: {term.reference}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
