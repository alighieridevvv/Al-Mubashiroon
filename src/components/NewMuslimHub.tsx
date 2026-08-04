import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Compass, CheckCircle, Award, Coffee } from 'lucide-react';

interface GuideSection {
  id: string;
  title: string;
  arabic?: string;
  summary: string;
  content: string;
  pillarNum?: number;
}

const PRELOADED_GUIDES: GuideSection[] = [
  {
    id: "revert_1",
    title: "1. The Shahadah (Declaration of Faith)",
    arabic: "أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا ٱللَّٰهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا رَسُولُ ٱللَّٰهِ",
    summary: "The entrance into Islam — declaring that none has the right to be worshipped except Allah alone, and Muhammad is His slave and Messenger.",
    content: "The testimony consists of two foundational halves. First, 'La ilaha illa Allah' negates all objects of worship, and affirms worship exclusively for Allah. Second, 'Muhammadun Rasulu Allah' demands that we obey, trust, and follow the final Messenger in whatever he commanded or prohibited.",
    pillarNum: 1
  },
  {
    id: "revert_2",
    title: "2. The Prayer (Salah) — First Actions",
    summary: "Establishing the direct link with the Creator five times daily, giving order, peace, and focus to your life.",
    content: "As a new Muslim, build your prayer habits patiently. Start with learning physical sequence (standing, bowing, prostrating) and reciting core words. Remember, Allah looks at your sincere effort. If the complete Arabic is initially difficult, you can repeat short glorifications like 'Subhanallah' and 'Alhamdulillah' as you progress."
  },
  {
    id: "revert_3",
    title: "3. Purification (Wudu) Simplified",
    summary: "Getting ready for prayers by washing your hands, face, arms, and wiping your head and feet.",
    content: "Wudu (ablution) is physical and spiritual purification. 1. Make an intention in your heart. 2. Say 'Bismillah' (In the name of Allah). 3. Wash hands 3 times. 4. Rinse mouth and nose 3 times. 5. Wash face 3 times. 6. Wash arms to the elbows 3 times (starting with right). 7. Wipe head, ears. 8. Wash feet to ankles 3 times."
  },
  {
    id: "revert_4",
    title: "4. Quran Study for Beginners",
    summary: "How to read, understand, and apply the final testament systematically as a non-Arabic speaker.",
    content: "Do not feel overwhelmed! Start with Surah Al-Fatihah, the opening chapter, as it is recited in every single unit of prayer. Study the authentic translations of the Quran and couple your reading with clean, classical Tafsir studies (such as Ibn Kathir) to know historical backgrounds."
  }
];

export default function NewMuslimHub() {
  const [guides] = useState<GuideSection[]>(PRELOADED_GUIDES);
  const [activeGuideId, setActiveGuideId] = useState<string>("revert_1");
  const [completedGuides, setCompletedGuides] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('newmuslim_completed');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const toggleCompleted = (id: string) => {
    setCompletedGuides(prev => {
      const next = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
      localStorage.setItem('newmuslim_completed', JSON.stringify(next));
      return next;
    });
  };

  const activeGuide = guides.find(g => g.id === activeGuideId) || guides[0];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 arabesque-pattern" id="new_muslim_hub_root">
      
      {/* Page Inset Header */}
      <div className="mb-8">
        <span className="text-xs font-mono text-[#D39858] tracking-widest uppercase">Safe Harbor & Steps</span>
        <h2 className="font-serif text-3xl font-bold text-[#EACEAA] mt-1">A Gentle Pathway for Reverts</h2>
        <p className="text-sm text-[#EACEAA]/70 mt-2 font-sans max-w-xl">
          Welcome to your supportive space. Master the essentials of purification, prayer forms, core theology (Aqeedah), and classical Islamic habits at your comfortable pace.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Navigation panel */}
        <div className="col-span-1 lg:col-span-4 space-y-4">
          <span className="text-[10px] font-mono tracking-wider uppercase text-[#D39858] block px-1">Curriculum Steps</span>
          <div className="space-y-2">
            {guides.map((item) => {
              const isActive = item.id === activeGuideId;
              const isComp = completedGuides.includes(item.id);
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveGuideId(item.id)}
                  className={`w-full flex items-center justify-between text-left p-4 rounded-xl border text-sm font-serif transition-all ${
                    isActive
                      ? 'bg-[#85431E] border-[#D39858] text-[#EACEAA]'
                      : 'bg-[#1E0F0D] border-[#D39858]/30 text-[#EACEAA]/80 hover:bg-[#34150F]/50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <Compass className={`h-4 w-4 shrink-0 mt-0.5 ${isActive ? 'text-[#D39858]' : 'text-[#D39858]/60'}`} />
                    <div>
                      <span className="block font-bold">{item.title}</span>
                      <span className="block text-[11px] text-[#EACEAA]/50 font-sans font-normal mt-0.5 leading-normal">
                        {item.summary.slice(0, 52)}...
                      </span>
                    </div>
                  </div>
                  {isComp && (
                    <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0 ml-2" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="p-5 bg-[#34150F] border border-[#D39858]/20 rounded-xl space-y-3">
            <h4 className="font-serif text-xs font-bold text-[#D39858] uppercase tracking-wider flex items-center gap-1.5">
              <Coffee className="h-4 w-4" />
              Mentor Support
            </h4>
            <p className="text-xs text-[#EACEAA]/75 font-sans leading-relaxed">
              Would you like to connect with an experienced brother or sister to answer personal questions, practice prayer steps, or access study materials offline?
            </p>
            <span className="text-[10px] font-mono font-bold text-[#D39858] block hover:underline cursor-pointer">
              Send a request to our community builders →
            </span>
          </div>
        </div>

        {/* Detailed reader card */}
        <div className="col-span-1 lg:col-span-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeGuide.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
              className="bg-[#1E0F0D] border border-[#D39858]/40 rounded-xl p-6 md:p-8 space-y-6"
            >
              {/* Header block */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-[#D39858]/15">
                <div>
                  <span className="text-[10px] font-mono uppercase bg-[#85431E]/20 text-[#D39858] px-2.5 py-1 rounded border border-[#D39858]/15">
                    REVERT STUDY SERIES
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-[#EACEAA] mt-2">{activeGuide.title}</h3>
                </div>
                
                <button
                  onClick={() => toggleCompleted(activeGuide.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-xs font-serif font-bold tracking-wide transition-all ${
                    completedGuides.includes(activeGuide.id)
                      ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-400 hover:bg-emerald-900/20'
                      : 'bg-[#34150F] border-[#D39858]/30 text-[#D39858] hover:bg-[#85431E]/25'
                  }`}
                >
                  <CheckCircle className="h-4 w-4" />
                  <span>{completedGuides.includes(activeGuide.id) ? 'Completed!' : 'Mark Completed'}</span>
                </button>
              </div>

              {/* Arabic declaration if shahadah */}
              {activeGuide.arabic && (
                <div className="bg-[#34150F] p-6 rounded-xl border border-[#D39858]/20 text-center space-y-3">
                  <p className="font-arabic text-2xl sm:text-3xl text-amber-100 leading-loose" dir="rtl">
                    {activeGuide.arabic}
                  </p>
                  <p className="text-xs font-serif italic text-[#D39858]">
                    "Ash-hadu an la ilaha illa Allah, wa ash-hadu anna Muhammadan Rasulu Allah"
                  </p>
                </div>
              )}

              {/* Explanatory text */}
              <div className="space-y-4">
                <p className="text-sm font-serif italic text-stone-300 border-l-2 border-[#D39858] pl-3 leading-relaxed">
                  {activeGuide.summary}
                </p>
                
                <p className="text-sm sm:text-base text-stone-200 leading-relaxed font-sans font-normal whitespace-pre-wrap">
                  {activeGuide.content}
                </p>
              </div>

              {/* Action block */}
              <div className="pt-4 border-t border-[#D39858]/15 flex items-center justify-between text-xs font-mono text-[#D39858]">
                <span>Progress: {completedGuides.length} of {guides.length} modules read</span>
                <span className="flex items-center gap-1">
                  Keep Seeking Knowledge <Award className="h-4 w-4 text-amber-400" />
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
