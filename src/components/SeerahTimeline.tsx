import { useState, useRef } from 'react';
import { SEERAH_EVENTS, SeerahEvent } from '../data/seerah-data';
import { Search, Filter, Share2, Compass, Award, Shield, BookOpen, ChevronLeft, ChevronRight, Check } from 'lucide-react';

export default function SeerahTimeline() {
  const [activePhase, setActivePhase] = useState<string>('All');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sharedEventId, setSharedEventId] = useState<string | null>(null);
  
  const horizontalScrollRef = useRef<HTMLDivElement>(null);

  const phases = ['All', 'Pre-Prophethood', 'Meccan Period', 'Hijrah', 'Medinan Period', 'Final Years'];
  const categories = ['All', 'Revelation', 'Treaty', 'Battle', 'Milestone'];

  const filteredEvents = SEERAH_EVENTS.filter(evt => {
    const matchesPhase = activePhase === 'All' || evt.phase === activePhase;
    const matchesCategory = activeCategory === 'All' || evt.category === activeCategory;
    const matchesKeyword = 
      evt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (evt.location && evt.location.toLowerCase().includes(searchQuery.toLowerCase())) ||
      evt.yearCE.toString().includes(searchQuery);

    return matchesPhase && matchesCategory && matchesKeyword;
  });

  const handleShare = (evt: SeerahEvent) => {
    const shareText = `📚 *${evt.title}* (${evt.yearCE} CE ${evt.yearHijri ? `/ ${evt.yearHijri} AH` : ''}) - Seerah Timeline\n\nPhase: ${evt.phase}\nLocation: ${evt.location}\n\n"${evt.description}"\n\n${evt.referenceQuote ? `Reference: "${evt.referenceQuote}" (${evt.referenceSource || ''})` : ''}\n\nExalt the Beloved Envoy ﷺ and explore historical Prophetic paths!`;
    
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText);
      setSharedEventId(evt.id);
      setTimeout(() => setSharedEventId(null), 3000);
    }
  };

  const scrollLeft = () => {
    if (horizontalScrollRef.current) {
      horizontalScrollRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (horizontalScrollRef.current) {
      horizontalScrollRef.current.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'Revelation': return <BookOpen className="h-4 w-4" />;
      case 'Treaty': return <Shield className="h-4 w-4" />;
      case 'Battle': return <Compass className="h-4 w-4" />;
      default: return <Award className="h-4 w-4" />;
    }
  };

  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case 'Pre-Prophethood': return 'border-amber-400 text-amber-500 bg-amber-500/10';
      case 'Meccan Period': return 'border-orange-500 text-orange-500 bg-orange-500/10';
      case 'Hijrah': return 'border-emerald-500 text-emerald-500 bg-emerald-500/10';
      case 'Medinan Period': return 'border-[#D39858] text-[#D39858] bg-[#D39858]/10';
      default: return 'border-red-400 text-red-400 bg-red-400/10';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10" id="seerah_timeline_page">
      {/* Page Header banner */}
      <div className="bg-[#34150F] text-[#EACEAA] rounded-xl border border-[#D39858] p-8 shadow-md relative overflow-hidden text-center mb-8">
        <div className="absolute top-0 left-0 w-24 h-24 border-t-2 border-l-2 border-[#D39858]/20 m-2 rounded-tl-lg" />
        <div className="absolute bottom-0 right-0 w-24 h-24 border-b-2 border-r-2 border-[#D39858]/20 m-2 rounded-br-lg" />
        <span className="text-[10px] uppercase font-mono tracking-widest text-[#D39858]">Sacred Chronicles</span>
        <h2 className="font-serif text-3xl font-bold text-[#EACEAA] my-2">Seerah Timeline ﷺ</h2>
        <p className="max-w-xl mx-auto text-xs text-[#EACEAA]/80 font-sans leading-relaxed">
          Embark upon an interactive, detailed historical voyage tracing the noble footsteps of the Prophet Muhammad ﷺ, the final Mercy to Mankind, from his birth in 570 CE to his final days in 632 CE.
        </p>
      </div>

      {/* Control panel: Search & Filters */}
      <div className="bg-[#EACEAA] bg-opacity-90 dark:bg-[#34150F] rounded-xl p-6 border border-[#D39858] shadow-md space-y-4 mb-8" id="seerah_timeline_controls">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Quick search input */}
          <div className="relative md:col-span-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-[#85431E]" />
            <input
              type="text"
              placeholder="Search Year, Battle, Event or Keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#150C0C]/10 dark:bg-[#150C0C]/40 border border-[#D39858]/50 rounded-lg pl-9 pr-4 py-2.5 text-sm focus:ring-1 focus:ring-[#85431E] outline-none placeholder-[#85431E]/60 text-inherit font-sans"
            />
          </div>

          {/* Phase Filter selector */}
          <div className="md:col-span-2 flex flex-wrap gap-1.5 items-center">
            <span className="text-xs font-bold uppercase tracking-wider text-[#85431E] mr-2 flex items-center gap-1">
              <Filter className="h-3 w-3" /> Phase:
            </span>
            <div className="flex flex-wrap gap-1">
              {phases.map(ph => (
                <button
                  key={ph}
                  onClick={() => setActivePhase(ph)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                    activePhase === ph 
                      ? 'bg-[#85431E] text-[#EACEAA] border border-[#D39858]' 
                      : 'bg-[#150C0C]/5 hover:bg-[#85431E]/10 border border-[#D39858]/20 text-[#85431E] dark:text-[#EACEAA]'
                  }`}
                >
                  {ph.replace(' Period', '')}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap items-center gap-2 border-t border-[#D39858]/20 pt-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[#85431E] mr-2">Category:</span>
          <div className="flex flex-wrap gap-1">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1 rounded-full text-xs font-mono transition-all ${
                  activeCategory === cat
                    ? 'bg-[#85431E] text-[#EACEAA]'
                    : 'bg-[#150C0C]/5 hover:bg-[#85431E]/15 text-[#85431E] dark:text-[#D39858]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop view warning / layout notice */}
      <div className="hidden lg:flex justify-between items-center mb-4">
        <span className="text-xs font-mono text-[#85431E] dark:text-[#D39858]">Scroll horizontally (Left/Right) via arrows or shift-scroll</span>
        <div className="flex space-x-2">
          <button 
            onClick={scrollLeft} 
            className="p-2 rounded-full bg-[#85431E] text-[#EACEAA] border border-[#D39858]/55 hover:bg-[#D39858] transition"
            title="Scroll Left"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button 
            onClick={scrollRight} 
            className="p-2 rounded-full bg-[#85431E] text-[#EACEAA] border border-[#D39858]/55 hover:bg-[#D39858] transition"
            title="Scroll Right"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* TIMELINE CONTAINER */}
      {/* 1. Desktop - Horizontal Scrollway */}
      <div className="hidden lg:block relative" id="seerah_desktop_scroller_outer">
        {/* Central line linking events */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-[#D39858] -translate-y-1/2 z-0" />
        
        <div 
          ref={horizontalScrollRef} 
          className="overflow-x-auto overflow-y-hidden flex space-x-12 pb-12 pt-8 px-4 scroll-smooth h-[550px] relative z-10 scrollbar-thin scrollbar-thumb-[#85431E]"
          id="seerah_scrollable_row"
        >
          {filteredEvents.length === 0 ? (
            <div className="w-full flex flex-col items-center justify-center py-20 text-[#85431E] dark:text-[#EACEAA] text-center">
              <Compass className="h-12 w-12 animate-spin mb-4" />
              <p className="font-serif text-lg font-bold">No Seerah events match your current keyword or filters.</p>
              <button 
                onClick={() => { setActivePhase('All'); setActiveCategory('All'); setSearchQuery(''); }}
                className="mt-3 px-4 py-2 bg-[#85431E] text-[#EACEAA] rounded-md text-xs font-bold"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            filteredEvents.map((evt, idx) => {
              const isTop = idx % 2 === 0;
              return (
                <div 
                  key={evt.id} 
                  className={`flex flex-col justify-center min-w-[380px] w-[380px] relative ${
                    isTop ? 'justify-start' : 'justify-end'
                  }`}
                  id={`seerah_desktop_card_${evt.id}`}
                >
                  {/* Event connector circle on the central line */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                    <div className="w-6 h-6 rounded-full bg-[#34150F] border-4 border-[#D39858] flex items-center justify-center shadow-md hover:scale-110 transition-transform">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#EACEAA]" />
                    </div>
                  </div>

                  {/* Horizontal node offset */}
                  <div className={`space-y-4 ${isTop ? 'pb-[220px]' : 'pt-[220px]'}`}>
                    <div className="bg-[#EACEAA] dark:bg-[#34150F] border border-[#D39858] rounded-xl p-5 shadow-lg group hover:border-[#85431E] hover:shadow-2xl transition-all duration-300">
                      {/* Badge line */}
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-serif text-base font-bold text-[#85431E] dark:text-[#D39858] flex items-center gap-1.5">
                          <span>{evt.yearCE} CE</span>
                          {evt.yearHijri && (
                            <span className="text-xs font-mono font-normal opacity-80">( {evt.yearHijri} AH )</span>
                          )}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[9px] font-mono border ${getPhaseColor(evt.phase)}`}>
                          {evt.phase}
                        </span>
                      </div>

                      {/* Header Title */}
                      <h4 className="font-serif text-sm font-bold text-[#85431E] dark:text-[#EACEAA] mb-2 leading-relaxed flex items-center gap-2">
                        <span className="text-[#D39858] shrink-0">{getCategoryIcon(evt.category)}</span>
                        <span>{evt.title}</span>
                      </h4>

                      {/* Location indication badge */}
                      <span className="inline-block text-[10px] font-semibold tracking-wider text-[#D39858]/80 bg-[#150C0C]/10 dark:bg-black/30 px-2 py-0.5 rounded mb-3">
                        🗺️ {evt.location}
                      </span>

                      {/* Content Description */}
                      <p className="text-xs text-[#34150F] dark:text-[#EACEAA]/90 font-sans leading-relaxed mb-4">
                        {evt.description}
                      </p>

                      {/* Optional scriptural Quote block */}
                      {evt.referenceQuote && (
                        <div className="bg-[#150C0C]/5 dark:bg-[#150C0C]/30 p-3 rounded-lg border-l-2 border-[#D39858] italic text-[11px] text-[#85431E] dark:text-[#D39858] mb-4 space-y-1">
                          <p className="line-clamp-3">"{evt.referenceQuote}"</p>
                          {evt.referenceSource && (
                            <span className="block text-[9px] font-mono text-right opacity-85">— {evt.referenceSource}</span>
                          )}
                        </div>
                      )}

                      {/* Action buttons footer */}
                      <div className="flex items-center justify-between border-t border-[#D39858]/20 pt-3">
                        <span className="text-[10px] font-mono font-semibold uppercase text-[#D39858]">
                          {evt.category}
                        </span>
                        <button 
                          onClick={() => handleShare(evt)}
                          className="flex items-center gap-1 text-[10px] text-[#85431E] dark:text-[#D39858] hover:text-[#D39858] font-bold"
                        >
                          {sharedEventId === evt.id ? (
                            <>
                              <Check className="h-3 w-3 text-green-500" />
                              <span className="text-green-500">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Share2 className="h-3 w-3" />
                              <span>Share Event</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* 2. Mobile / Tablet - Vertical Timeline */}
      <div className="lg:hidden relative pb-12" id="seerah_mobile_timeline_outer">
        {/* Left vertical timeline pipe line */}
        <div className="absolute top-0 bottom-0 left-6 w-1 bg-[#D39858] z-0" />

        {filteredEvents.length === 0 ? (
          <div className="w-full flex flex-col items-center justify-center py-20 text-[#85431E] dark:text-[#EACEAA] text-center">
            <Compass className="h-12 w-12 animate-spin mb-4" />
            <p className="font-serif text-lg font-bold">No Seerah events match your filter query.</p>
            <button 
              onClick={() => { setActivePhase('All'); setActiveCategory('All'); setSearchQuery(''); }}
              className="mt-3 px-4 py-2 bg-[#85431E] text-[#EACEAA] rounded-md text-xs font-bold"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="space-y-6 relative z-10" id="seerah_mobile_rows">
            {filteredEvents.map(evt => (
              <div key={evt.id} className="flex gap-4 items-start pl-3" id={`seerah_mobile_row_${evt.id}`}>
                {/* Connecting Circle Bullet */}
                <div className="w-7 h-7 rounded-full bg-[#34150F] border-4 border-[#D39858] flex items-center justify-center shadow-md shrink-0 mt-3 relative z-20">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#EACEAA]" />
                </div>

                {/* Event Card Panel */}
                <div className="flex-1 bg-[#EACEAA] dark:bg-[#34150F] border border-[#D39858] rounded-xl p-5 shadow-md">
                  {/* Date line */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <span className="font-serif text-base font-bold text-[#85431E] dark:text-[#D39858] flex items-center gap-1.5">
                      <span>{evt.yearCE} CE</span>
                      {evt.yearHijri && (
                        <span className="text-xs font-mono font-normal opacity-70">( {evt.yearHijri} AH )</span>
                      )}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[9px] font-mono border ${getPhaseColor(evt.phase)}`}>
                      {evt.phase}
                    </span>
                  </div>

                  {/* Title text */}
                  <h4 className="font-serif text-sm font-bold text-[#85431E] dark:text-[#EACEAA] mb-2 flex items-center gap-2">
                    <span className="text-[#D39858] shrink-0">{getCategoryIcon(evt.category)}</span>
                    <span>{evt.title}</span>
                  </h4>

                  {/* Location badge */}
                  <span className="inline-block text-[10px] font-semibold tracking-wider text-[#D39858]/80 bg-[#150C0C]/10 dark:bg-black/30 px-2 py-0.5 rounded mb-3">
                    🗺️ {evt.location}
                  </span>

                  {/* Body textual narrative */}
                  <p className="text-xs text-[#34150F] dark:text-[#EACEAA]/90 leading-relaxed mb-4">
                    {evt.description}
                  </p>

                  {/* Embed quotation if any */}
                  {evt.referenceQuote && (
                    <div className="bg-[#150C0C]/5 dark:bg-[#150C0C]/30 p-3 rounded-lg border-l-2 border-[#D39858] italic text-[11px] text-[#85431E] dark:text-[#D39858] mb-4 space-y-1">
                      <p>"{evt.referenceQuote}"</p>
                      {evt.referenceSource && (
                        <span className="block text-[9px] font-mono text-right opacity-85">— {evt.referenceSource}</span>
                      )}
                    </div>
                  )}

                  {/* Card bottom actions bar */}
                  <div className="flex items-center justify-between border-t border-[#D39858]/20 pt-3">
                    <span className="text-[10px] font-mono font-semibold uppercase text-[#D39858]">
                      {evt.category}
                    </span>
                    <button 
                      onClick={() => handleShare(evt)}
                      className="flex items-center gap-1 text-[10px] text-[#85431E] dark:text-[#D39858] hover:text-[#D39858] font-bold"
                    >
                      {sharedEventId === evt.id ? (
                        <>
                          <Check className="h-3 w-3 text-green-500" />
                          <span className="text-green-500 text-[10px]">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Share2 className="h-3 w-3" />
                          <span>Share</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
