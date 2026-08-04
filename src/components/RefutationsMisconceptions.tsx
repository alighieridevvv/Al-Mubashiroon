import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { REFUTATIONS_DATA, RefutationItem } from '../data/refutative-data';
import { Search, ShieldAlert, Share2, ChevronRight, Check } from 'lucide-react';

export default function RefutationsMisconceptions() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeItem, setActiveItem] = useState<RefutationItem | null>(() => REFUTATIONS_DATA[0]);
  const [sharedId, setSharedId] = useState<string | null>(null);

  const categories = [
    'All', 
    'Allah & Tawheed', 
    'The Qur\'an', 
    'The Prophet ﷺ', 
    'Women in Islam', 
    'Jihad & Violence', 
    'Islam & Science', 
    'Other Religions', 
    'Modern Issues'
  ];

  const filteredItems = REFUTATIONS_DATA.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = 
      item.claim.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.introduction.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.scholarlyAnalysis.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const handleShare = (item: RefutationItem) => {
    const shareText = `🛡️ *Dawah Response Hub:* Refuting Misconceptions\n\n📌 *CLAIM:* "${item.claim}"\n\n📖 *SUMMARY:* ${item.summary}\n\n💡 *RESPONSE SUMMARY:* ${item.introduction.slice(0, 200)}...\n\nDiscover the authentic, evidence-based academic response with full references from Qur'an and Sunnah!\n#SacredDawah #ClearIslam`;
    
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText);
      setSharedId(item.id);
      setTimeout(() => setSharedId(null), 3500);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10" id="refutations_hub_page">
      {/* Banner header */}
      <div className="bg-[#34150F] text-[#EACEAA] rounded-xl border border-[#D39858] p-8 shadow-md relative overflow-hidden text-center mb-8">
        <div className="absolute top-0 left-0 w-24 h-24 border-t-2 border-l-2 border-[#D39858]/20 m-2 rounded-tl-lg" />
        <div className="absolute bottom-0 right-0 w-24 h-24 border-b-2 border-r-2 border-[#D39858]/20 m-2 rounded-br-lg" />
        <span className="text-[10px] uppercase font-mono tracking-widest text-[#D39858]">Apologetics & Clarity</span>
        <h2 className="font-serif text-3xl font-bold text-[#EACEAA] my-2">Evidence-Based Response Hub</h2>
        <p className="max-w-xl mx-auto text-xs text-[#EACEAA]/80 font-sans leading-relaxed">
          Explore structured, scholarly clarifications dismantling common misconceptions and claims against Islam using direct textual proofs from primary scriptures.
        </p>
      </div>

      {/* Control panel: Search filter */}
      <div className="bg-[#EACEAA] bg-opacity-95 dark:bg-[#34150F] rounded-xl p-5 border border-[#D39858] shadow-md grid grid-cols-1 md:grid-cols-3 gap-4 items-center mb-8" id="refutations_controls">
        <div className="relative md:col-span-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-[#85431E]" />
          <input
            type="text"
            placeholder="Search claims or arguments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#150C0C]/10 dark:bg-[#150C0C]/40 border border-[#D39858]/50 rounded-lg pl-9 pr-4 py-2.5 text-xs focus:ring-1 focus:ring-[#85431E] outline-none placeholder-[#85431E]/60 text-inherit font-sans"
          />
        </div>
        
        {/* Category combobox for mobile filter */}
        <div className="md:col-span-2 flex items-center space-x-2 w-full">
          <span className="text-xs font-bold uppercase text-[#85431E] md:inline hidden">Topic:</span>
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

      {/* Two pane structure */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="refutations_split_view">
        {/* LEFT COLUMN: Misconceptions index cards list */}
        <div className="lg:col-span-5 space-y-3 lg:max-h-[750px] lg:overflow-y-auto pr-1" id="refutations_sidebar">
          <h3 className="font-serif text-sm font-bold uppercase text-[#85431E] dark:text-[#D39858] border-b border-[#D39858]/35 pb-2 mb-3">
            Claims Ledger ({filteredItems.length})
          </h3>
          {filteredItems.length === 0 ? (
            <div className="bg-[#EACEAA] bg-opacity-65 dark:bg-[#34150F] rounded-lg p-8 border border-[#D39858]/30 text-center text-xs text-stone-500">
              No response articles match your search parameters.
            </div>
          ) : (
            filteredItems.map(item => {
              const isActive = activeItem?.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setActiveItem(item)}
                  className={`p-4 rounded-xl border cursor-pointer text-left transition-all ${
                    isActive
                      ? 'bg-[#85431E] border-[#D39858] text-[#EACEAA] scale-[1.01] shadow-md'
                      : 'bg-[#EACEAA] bg-opacity-85 dark:bg-[#34150F]/70 border-[#D39858]/30 text-inherit hover:bg-[#85431E]/5 hover:border-[#85431E]/45'
                  }`}
                  id={`refutation_index_item_${item.id}`}
                >
                  <div className="flex items-center justify-between gap-1.5 mb-2">
                    <span className={`px-2 py-0.5 rounded text-[8px] font-mono border ${
                      isActive ? 'border-[#EACEAA]/55 text-white bg-white/10' : 'border-[#85431E]/30 text-[#85431E] dark:text-[#D39858]/80'
                    }`}>
                      {item.category}
                    </span>
                    <ChevronRight className="h-3 w-3 opacity-60" />
                  </div>
                  <h4 className="font-serif text-xs sm:text-sm font-bold leading-relaxed line-clamp-2">
                    "{item.claim}"
                  </h4>
                  <p className={`text-[11px] mt-1.5 line-clamp-1 opacity-80 ${
                    isActive ? 'text-[#EACEAA]/90' : 'text-stone-600 dark:text-stone-300'
                  }`}>
                    {item.summary}
                  </p>
                </div>
              );
            })
          )}
        </div>

        {/* RIGHT COLUMN: Active Response Reader */}
        <div className="lg:col-span-7" id="refutations_detail_view">
          <AnimatePresence mode="wait">
            {activeItem ? (
              <motion.div
                key={activeItem.id}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                className="bg-[#EACEAA] bg-opacity-95 dark:bg-[#34150F] rounded-xl border border-[#D39858] p-6 sm:p-8 shadow-md"
              >
                {/* Header segment with category and share click */}
                <div className="flex items-center justify-between border-b border-[#D39858]/30 pb-4 mb-6">
                  <div>
                    <span className="text-[10px] font-mono font-bold tracking-widest text-[#85431E] dark:text-[#D39858] uppercase block mb-1">
                      {activeItem.category} response
                    </span>
                    <h3 className="font-serif text-lg font-bold text-[#85431E] dark:text-amber-100">
                      Scholarly Clarification
                    </h3>
                  </div>
                  <button
                    onClick={() => handleShare(activeItem)}
                    className="p-2.5 rounded-full bg-[#85431E] text-[#EACEAA] hover:bg-[#D39858] transition shadow"
                    title="Copy response share block"
                  >
                    {sharedId === activeItem.id ? (
                      <Check className="h-4 w-4 text-green-300" />
                    ) : (
                      <Share2 className="h-4 w-4" />
                    )}
                  </button>
                </div>

                {/* THE CLAIM BLOCKQUOTE (Renders in red accents for argument emphasis) */}
                <div className="border-[#85431E]/40 border bg-[#150C0C]/5 dark:bg-[#150C0C]/35 rounded-xl p-4 sm:p-5 mb-6 relative">
                  <span className="text-stone-400 dark:text-stone-500 font-serif text-5xl absolute top-1 left-2 select-none">“</span>
                  <div className="pl-6 font-sans">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-red-500 font-bold block mb-1">The Attack Claim / Allegation:</span>
                    <blockquote className="text-xs sm:text-sm font-bold text-red-700 dark:text-red-300 italic tracking-wide leading-relaxed">
                      "{activeItem.claim}"
                    </blockquote>
                  </div>
                </div>

                {/* THE RESPONSE CORE TEXT BODY */}
                <div className="space-y-6 text-xs sm:text-sm font-sans text-stone-800 dark:text-stone-100 leading-relaxed">
                  
                  {/* Phase 1: Intro */}
                  <div>
                    <h5 className="font-serif text-xs font-bold uppercase tracking-wider text-[#85431E] dark:text-[#D39858] mb-2">
                      I. Introduction & Contextual Outline
                    </h5>
                    <p className="text-stone-700 dark:text-stone-200">{activeItem.introduction}</p>
                  </div>

                  {/* Phase 2: Quranic Evidence */}
                  {activeItem.evidenceQuran.length > 0 && (
                    <div>
                      <h5 className="font-serif text-xs font-bold uppercase tracking-wider text-[#85431E] dark:text-[#D39858] mb-3">
                        II. Proofs from the Sacred Qur'an
                      </h5>
                      {activeItem.evidenceQuran.map((ev, i) => (
                        <div key={i} className="mb-4 bg-[#34150F] border border-[#D39858] p-4 rounded-xl text-[#EACEAA] relative">
                          <span className="font-arabic text-right block text-lg mb-2 select-all leading-normal" dir="rtl" lang="ar">
                            {ev.textArabic}
                          </span>
                          <span className="block text-xs italic opacity-95 leading-relaxed border-t border-[#D39858]/30 pt-2 mb-1.5">
                            "{ev.translation}"
                          </span>
                          <span className="block text-[9px] font-mono text-[#D39858] text-right font-medium">
                            — {ev.source}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Phase 3: Hadith Evidence */}
                  {activeItem.evidenceHadith.length > 0 && (
                    <div>
                      <h5 className="font-serif text-xs font-bold uppercase tracking-wider text-[#85431E] dark:text-[#D39858] mb-3">
                        III. Proofs from authentic Sunnah (Prophetic Tradition)
                      </h5>
                      {activeItem.evidenceHadith.map((ev, i) => (
                        <div key={i} className="bg-[#150C0C]/5 dark:bg-black/30 border-l-4 border-[#85431E] p-4 rounded-r-lg mb-2 leading-relaxed text-stone-700 dark:text-stone-200">
                          <p className="italic">"{ev.translation}"</p>
                          <span className="block text-[9px] font-mono text-right text-[#85431E] dark:text-[#D39858] font-semibold mt-1">
                            — {ev.source}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Phase 4: Scholarly Analysis */}
                  <div>
                    <h5 className="font-serif text-xs font-bold uppercase tracking-wider text-[#85431E] dark:text-[#D39858] mb-2">
                      IV. Jurisprudential / Historical Analysis
                    </h5>
                    <p className="text-stone-700 dark:text-stone-200">{activeItem.scholarlyAnalysis}</p>
                  </div>

                  {/* Phase 5: Conclusion */}
                  <div className="bg-[#85431E]/5 dark:bg-[#85431E]/10 p-4 rounded-xl border border-[#D39858]/30">
                    <h5 className="font-serif text-xs font-bold uppercase tracking-wider text-[#85431E] dark:text-[#D39858] mb-1.5">
                      V. Definitive Summary
                    </h5>
                    <p className="text-stone-700 dark:text-stone-200 italic">{activeItem.conclusion}</p>
                  </div>

                  {/* Phase 6: Further Reading links */}
                  {activeItem.furtherReading.length > 0 && (
                    <div className="border-t border-[#D39858]/20 pt-4 text-xs">
                      <span className="font-bold text-[#85431E] dark:text-[#D39858] block mb-2 font-serif">Recommended Literature:</span>
                      <ul className="list-disc list-inside space-y-1.5 text-stone-600 dark:text-stone-300">
                        {activeItem.furtherReading.map((bk, i) => (
                          <li key={i}>{bk}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                </div>
              </motion.div>
            ) : (
              <div className="bg-[#EACEAA] bg-opacity-70 dark:bg-[#34150F] rounded-xl border border-[#D39858]/30 p-16 text-center text-stone-500">
                <ShieldAlert className="h-10 w-10 mx-auto opacity-50 mb-3" />
                <p className="font-serif text-base font-bold">Please select a misconception claim from the ledger index to read the response.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
