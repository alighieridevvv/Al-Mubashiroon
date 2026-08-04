import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Compass, Heart, HelpCircle, UserCheck, Search, 
  Share2, ChevronDown, CheckCircle, FileText, Sparkles, Send
} from 'lucide-react';
import { 
  NAMES_OF_ALLAH, PILLARS_OF_ISLAM, PILLARS_OF_IMAN, FAQS 
} from '../data/dawah-data';

export default function DawahHub() {
  const [activeSegment, setActiveSegment] = useState<'pillars' | 'allah' | 'faq' | 'newmuslim'>('pillars');
  
  // Names of Allah states
  const [namesQuery, setNamesQuery] = useState('');
  
  // FAQs states
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>("faq_1");
  
  // Pillars complete tracker
  const [completedPillars, setCompletedPillars] = useState<Record<number, boolean>>({});
  const [completedIman, setCompletedIman] = useState<Record<number, boolean>>({});

  // Card flipping simulation
  const [flippedCardId, setFlippedCardId] = useState<string | null>(null);

  // Contact form submission state
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleShareArticle = (title: string) => {
    navigator.clipboard.writeText(`Dawah Article: "${title}" shared from Islamic Study Group Hub.`);
    alert(`"${title}" reference copied safely! Share it with friends and family.`);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setContactSubmitted(true);
  };

  // Filter names of Allah
  const filteredNames = NAMES_OF_ALLAH.filter(na => 
    na.transliteration.toLowerCase().includes(namesQuery.toLowerCase()) ||
    na.meaning.toLowerCase().includes(namesQuery.toLowerCase()) ||
    na.name.includes(namesQuery)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 arabesque-pattern" id="dawah_hub_workspace">
      
      {/* Title block */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-sm font-bold uppercase tracking-widest text-[#85431E] font-mono flex justify-center items-center">
          <Compass className="h-4 w-4 mr-1.5 animate-spin" /> Calling to Islamic Guidance
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#34150F] mt-2 mb-4">
          The Dawah Hub & Monotheism Library
        </h1>
        <p className="text-sm sm:text-base text-[#150C0C]/80 leading-relaxed font-sans">
          Explore the pristine theology, pillars of daily life, clear answers to common questions about women or Jesus, and resources prepared by study circle members.
        </p>

        {/* Segment Toggles */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 bg-[#34150F] p-1.5 mt-8 rounded-xl border border-[#D39858]/35">
          {[
            { id: 'pillars', label: 'Pillars of Faith', icon: Sparkles },
            { id: 'allah', label: 'Who is Allah?', icon: Heart },
            { id: 'faq', label: 'Common FAQs', icon: HelpCircle },
            { id: 'newmuslim', label: 'New To Islam?', icon: UserCheck }
          ].map((seg) => {
            const Icon = seg.icon;
            const active = activeSegment === seg.id;
            return (
              <button
                key={seg.id}
                onClick={() => setActiveSegment(seg.id as any)}
                className={`py-3 px-2 text-xs sm:text-sm font-serif font-bold rounded-lg transition-all flex items-center justify-center space-x-1.5 ${
                  active 
                    ? 'bg-[#85431E] text-[#EACEAA] shadow border border-[#D39858]/40' 
                    : 'text-[#D39858] hover:text-[#EACEAA] hover:bg-[#150C0C]/30'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{seg.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <span className="w-24 h-0.5 bg-[#D39858]/40 mx-auto block mb-12" />

      {/* SEGMENT CONTENTS WITH ANIMATIONS */}
      <AnimatePresence mode="wait">
        
        {/* 1. PILLARS OF ISLAM & IMAN */}
        {activeSegment === 'pillars' && (
          <motion.div
            key="pillars"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-12"
            id="panel_pillars"
          >
            {/* Top Pillars of Islam section */}
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-center justify-between border-b border-[#D39858]/30 pb-4">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#34150F]">
                    The Five Pillars of Islam
                  </h2>
                  <p className="text-xs text-[#34150F]/80">The physical manifestation of complete submission to the Creator.</p>
                </div>
                {/* Progress Indicators */}
                <div className="mt-2 sm:mt-0 flex items-center space-x-2 bg-[#34150F] px-4 py-1.5 rounded-full border border-[#D39858]/35">
                  <span className="text-[10px] text-[#D39858] font-bold font-mono">Pillars Studied:</span>
                  <span className="text-xs font-bold text-[#EACEAA] font-sans">
                    {Object.keys(completedPillars).length} of 5
                  </span>
                </div>
              </div>

              {/* Grid with Flip-cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                {PILLARS_OF_ISLAM.map((p) => {
                  const isFlipped = flippedCardId === `islam_${p.number}`;
                  const isChecked = completedPillars[p.number];

                  return (
                    <div key={p.number} className="h-64 relative group perspective">
                      {/* Flip Card Wrapper */}
                      <div 
                        onClick={() => setFlippedCardId(isFlipped ? null : `islam_${p.number}`)}
                        className={`w-full h-full duration-500 preserve-3d cursor-pointer card-theme ${
                          isFlipped ? 'rotate-y-180' : ''
                        }`}
                      >
                        {/* FRONT FACE */}
                        <div className="absolute inset-0 w-full h-full backface-hidden bg-[#EACEAA] border border-[#D39858] rounded-xl p-5 flex flex-col justify-between hover:shadow-lg transition-shadow">
                          <div className="flex items-center justify-between">
                            <span className="w-8 h-8 rounded-full bg-[#85431E] text-white flex items-center justify-center font-mono font-bold text-sm">
                              {p.number}
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setCompletedPillars(prev => ({ ...prev, [p.number]: !prev[p.number] }));
                              }}
                              className={`p-1 rounded-full border border-[#D39858]/55 ${
                                isChecked ? 'bg-[#85431E]/25 text-[#150C0C]' : 'bg-transparent text-transparent'
                              }`}
                            >
                              <CheckCircle className="h-4 w-4 text-[#85431E]" />
                            </button>
                          </div>
                          
                          <div className="text-center my-4">
                            <span className="font-arabic text-[#85431E] text-3xl block leading-relaxed" dir="rtl" lang="ar">
                              {p.arabic}
                            </span>
                            <h3 className="font-serif text-lg font-bold text-[#34150F] mt-1">
                              {p.english}
                            </h3>
                            <p className="text-xs text-[#150C0C]/70 mt-0.5">{p.translation}</p>
                          </div>

                          <div className="text-center text-[10px] text-[#85431E] font-bold uppercase tracking-wider font-mono">
                            Tap to expand details ✦
                          </div>
                        </div>

                        {/* BACK FACE */}
                        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-[#34150F] text-[#EACEAA] rounded-xl p-5 flex flex-col justify-between border border-[#D39858]">
                          <div className="text-center">
                            <span className="text-[10px] text-[#D39858] font-bold uppercase font-mono block mb-2">Pillar {p.number} Meaning</span>
                            <p className="text-xs leading-relaxed font-sans text-[#EACEAA]/95">
                              {p.explanation}
                            </p>
                          </div>
                          <div className="text-center text-[9px] text-[#D39858] font-bold font-mono">
                            Tap to return / close
                          </div>
                        </div>

                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Pillars of Iman */}
            <div className="space-y-6 pt-6 border-t border-[#D39858]/20">
              <div className="flex flex-col sm:flex-row items-center justify-between border-b border-[#D39858]/30 pb-4">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#34150F]">
                    The Six Pillars of Iman (Faith)
                  </h2>
                  <p className="text-xs text-[#34150F]/80">The spiritual creed and internal anchors of direct belief in Allah.</p>
                </div>
                <div className="mt-2 sm:mt-0 flex items-center space-x-2 bg-[#34150F] px-4 py-1.5 rounded-full border border-[#D39858]/35">
                  <span className="text-[10px] text-[#D39858] font-bold font-mono">Creeds Studied:</span>
                  <span className="text-xs font-bold text-[#EACEAA]">
                    {Object.keys(completedIman).length} of 6
                  </span>
                </div>
              </div>

              {/* Grid 3-column layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {PILLARS_OF_IMAN.map((im) => {
                  const isFlipped = flippedCardId === `iman_${im.number}`;
                  const isChecked = completedIman[im.number];

                  return (
                    <div key={im.number} className="h-60 relative group perspective">
                      <div 
                        onClick={() => setFlippedCardId(isFlipped ? null : `iman_${im.number}`)}
                        className={`w-full h-full duration-500 preserve-3d cursor-pointer card-theme ${
                          isFlipped ? 'rotate-y-180' : ''
                        }`}
                      >
                        {/* FRONT FACE */}
                        <div className="absolute inset-0 w-full h-full backface-hidden bg-[#1E0F0D] border border-[#D39858]/60 rounded-xl p-5 flex flex-col justify-between hover:shadow-lg transition-shadow">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-mono font-bold text-[#D39858] bg-[#150C0C]/50 px-2.5 py-0.5 rounded border border-[#D39858]/35">
                              Article {im.number}
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setCompletedIman(prev => ({ ...prev, [im.number]: !prev[im.number] }));
                              }}
                              className={`p-1 rounded-full border border-[#D39858]/55 ${
                                isChecked ? 'bg-[#85431E]' : 'bg-transparent text-transparent hover:bg-[#85431E]/20'
                              }`}
                            >
                              <CheckCircle className="h-4 w-4 text-[#D39858]" />
                            </button>
                          </div>

                          <div className="text-center my-3">
                            <span className="font-arabic text-2xl text-[#D39858] block mb-1 group-hover:text-white transition-colors" dir="rtl">
                              {im.arabic}
                            </span>
                            <h3 className="font-serif text-lg font-bold text-[#EACEAA]">
                              {im.english}
                            </h3>
                          </div>

                          <span className="text-[10px] text-center text-[#D39858] font-bold tracking-widest font-mono uppercase block">
                            Reveal core belief details →
                          </span>
                        </div>

                        {/* BACK FACE */}
                        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-[#34150F] text-[#EACEAA] rounded-xl p-5 flex flex-col justify-between border border-[#D39858]">
                          <div className="text-center">
                            <span className="text-[10px] text-[#D39858] font-bold uppercase block mb-1.5 font-mono">Belief Detail</span>
                            <p className="text-xs leading-relaxed font-sans text-[#EACEAA]/95">
                              {im.explanation}
                            </p>
                          </div>
                          <span className="text-[9px] text-center text-[#D39858]/70 block font-mono">Tap card to return</span>
                        </div>

                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        {/* 2. WHO IS ALLAH? (Tawheed & 99 Names) */}
        {activeSegment === 'allah' && (
          <motion.div
            key="allah"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-12 animate-fade-in-up"
            id="panel_allah"
          >
            {/* Brief Tawheed explanation cards */}
            <div className="bg-[#34150F] text-[#EACEAA] p-8 rounded-xl border border-[#D39858] relative">
              <span className="text-xs text-[#D39858] font-bold font-mono tracking-wider block mb-1">FOUNDATIONAL CREED</span>
              <h3 className="font-serif text-2xl font-bold mb-4">Understanding the Three Categories of Tawheed</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                <div className="p-4 bg-[#150C0C]/50 rounded-lg border border-[#D39858]/10">
                  <h4 className="font-serif text-base font-bold text-[#D39858] mb-1">1. Tawheed ar-Rububiyyah</h4>
                  <p className="text-xs text-[#EACEAA]/85 leading-relaxed">
                    <strong>Oneness of Lordship:</strong> Maintaining that Allah is the Sole Creator, Owner, Sovereign, and Controller of all existence. No creature assists Him in managing any atom of creation.
                  </p>
                </div>
                <div className="p-4 bg-[#150C0C]/50 rounded-lg border border-[#D39858]/10">
                  <h4 className="font-serif text-base font-bold text-[#D39858] mb-1">2. Tawheed al-Uluhiyyah</h4>
                  <p className="text-xs text-[#EACEAA]/85 leading-relaxed">
                    <strong>Oneness of Worship:</strong> direct all rituals, prayers, pledges, animal sacrifices, and pleas for help <em>only</em> to Allah. This rejects all intercessors, idols, or divine partners.
                  </p>
                </div>
                <div className="p-4 bg-[#150C0C]/50 rounded-lg border border-[#D39858]/10">
                  <h4 className="font-serif text-base font-bold text-[#D39858] mb-1">3. Tawheed al-Asma was-Sifat</h4>
                  <p className="text-xs text-[#EACEAA]/85 leading-relaxed">
                    <strong>Oneness of Attributes:</strong> Believing in the beautiful names and descriptions of Allah found verbatim in scriptures, maintaining His absolute perfection without comparison to human limits.
                  </p>
                </div>
              </div>
            </div>

            {/* Complete 99 Names of Allah catalog */}
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-center justify-between border-b border-[#D39858]/35 pb-4">
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#EACEAA]">Asma Al-Husna</h3>
                  <p className="text-xs text-[#D39858]">"To Allah belong the most beautiful names, so call on Him by them."</p>
                </div>
                <div className="relative mt-3 sm:mt-0 w-full sm:w-72">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#D39858]" />
                  <input
                    type="text"
                    placeholder="Search name or meaning..."
                    value={namesQuery}
                    onChange={(e) => setNamesQuery(e.target.value)}
                    className="w-full bg-[#1A0C0A] text-[#EACEAA] border border-[#D39858]/80 rounded-lg pl-9 pr-4 py-2 text-xs focus:ring-1 focus:ring-[#85431E] outline-none placeholder-[#D39858]/70 font-sans"
                  />
                </div>
              </div>

              {/* Grid block */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {filteredNames.map((na) => (
                  <motion.div
                    key={na.number}
                    whileHover={{ y: -3 }}
                    className="bg-[#1E0F0D] rounded-xl border border-[#D39858]/35 p-4 shadow-sm text-center relative overflow-hidden group hover:border-[#D39858] transition-colors"
                  >
                    <span className="absolute top-1.5 left-2 text-[9px] font-mono font-bold text-[#D39858]/70">
                      #{na.number}
                    </span>
                    <p className="font-arabic text-[#D39858] text-2xl sm:text-3xl font-bold my-2 group-hover:text-white transition-colors" dir="rtl">
                      {na.name}
                    </p>
                    <h4 className="font-serif font-bold text-sm text-[#EACEAA]">
                      {na.transliteration}
                    </h4>
                    <p className="text-[11px] text-stone-300 italic mt-1 leading-tight shrink-0 group-hover:text-white transition-colors font-sans">
                      "{na.meaning}"
                    </p>
                  </motion.div>
                ))}
                {filteredNames.length === 0 && (
                  <p className="col-span-full py-8 text-center font-serif text-[#D39858] font-bold">No Divine names found matching query.</p>
                )}
              </div>
            </div>

          </motion.div>
        )}

        {/* 3. COMMON FAQ ACCORDIONS */}
        {activeSegment === 'faq' && (
          <motion.div
            key="faq"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            id="panel_faq"
          >
            {/* FAQ List left side */}
            <div className="lg:col-span-2 space-y-4">
              <h2 className="font-serif text-2xl font-bold text-[#34150F] border-b border-[#D39858]/30 pb-3">
                Clear Answers to Essential Questions
              </h2>
              
              <div className="space-y-3">
                {FAQS.map((faq) => {
                  const isExpanded = expandedFaqId === faq.id;
                  return (
                    <div 
                      key={faq.id} 
                      className="bg-[#EACEAA] rounded-xl border border-[#D39858] overflow-hidden"
                    >
                      <button
                        onClick={() => setExpandedFaqId(isExpanded ? null : faq.id)}
                        className="w-full flex items-center justify-between p-4 text-left font-serif font-bold text-base text-[#34150F] hover:bg-[#D39858]/10 transition-colors"
                      >
                        <span>{faq.question}</span>
                        <ChevronDown className={`h-4 w-4 text-[#85431E] transform transition-transform duration-250 ${
                          isExpanded ? 'rotate-180' : 'rotate-0'
                        }`} />
                      </button>

                      {isExpanded && (
                        <div className="p-4 bg-white/40 border-t border-[#D39858]/20 space-y-4">
                          <p className="text-sm leading-relaxed text-[#150C0C]/90 font-sans">
                            {faq.answer}
                          </p>
                          
                          {/* supporting evidence quote */}
                          {faq.evidenceText && (
                            <div className="border-l-3 border-[#D39858] pl-3 py-1.5 bg-[#34150F]/5 rounded-r-md">
                              <p className="text-xs font-serif italic text-[#85431E] leading-relaxed">
                                "{faq.evidenceText}"
                              </p>
                              <span className="block text-[10px] font-mono text-[#34150F] text-right font-bold mt-1">
                                — Holy Qur'an, {faq.evidenceSource}
                              </span>
                            </div>
                          )}

                          <div className="flex justify-end pt-2">
                            <button
                              onClick={() => handleShareArticle(faq.question)}
                              className="text-xs font-mono text-[#D39858] hover:text-[#85431E] font-bold flex items-center space-x-1"
                            >
                              <Share2 className="h-3.5 w-3.5" />
                              <span>Share This Answer</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Sidebar guides block */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-[#34150F] text-[#EACEAA] border border-[#D39858] rounded-xl p-6 shadow-md">
                <span className="text-xs font-bold font-mono text-[#D39858] tracking-widest block uppercase mb-1">PROPHETIC METHOD</span>
                <h3 className="font-serif text-lg font-bold mb-2">Calling with Wisdom</h3>
                <p className="text-xs text-[#EACEAA]/80 leading-relaxed font-sans mb-4">
                  "Invite to the way of your Lord with wisdom and good instruction, and argue with them in a way that is best."
                  <br />
                  <span className="text-[#D39858] block text-right text-[10px] font-mono mt-1">— An-Nahl 16:125</span>
                </p>
                <div className="text-xs text-[#EACEAA]/90 space-y-2 font-serif border-t border-[#D39858]/20 pt-4">
                  <p>✦ Active Dawah means displaying beautiful character, listening respectfully, and answering based on evidence.</p>
                  <p>✦ We reject harshness, misconstrued translations, or fabricated stories.</p>
                </div>
              </div>

              {/* Hadith citation quote box */}
              <div className="border border-[#D39858] rounded-xl p-6 text-[#150C0C]/85 space-y-3 bg-[#EACEAA]">
                <span className="text-2xl block text-center">🤝</span>
                <h4 className="font-serif font-bold text-center">Treatment of Non-Muslim Seekers</h4>
                <p className="text-xs leading-relaxed font-sans text-center italic">
                  "Show mercy to those on earth, and the One in the heavens will show mercy to you."
                  <br />
                  <span className="text-[#85431E] block font-mono font-bold mt-1">— At-Tirmidhi 1924</span>
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* 4. NEW TO ISLAM? PAGE */}
        {activeSegment === 'newmuslim' && (
          <motion.div
            key="newmuslim"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            id="panel_newmuslim"
          >
            {/* Steps guidelines */}
            <div className="lg:col-span-2 space-y-6">
              <h2 className="font-serif text-2xl font-bold text-[#EACEAA] border-b border-[#D39858]/35 pb-2">
                A Gentle Guide for the New Muslim
              </h2>
              <p className="text-sm text-stone-300">
                Welcome to the family. Taking your first steps can seem complex, but Islam is a religion of ease and progression. Here are your beautiful initial milestones.
              </p>

              {/* Timeline cards */}
              <div className="relative border-l border-[#D39858]/60 pl-6 ml-3 space-y-6">
                {[
                  {
                    step: 1,
                    title: "The Shahada (Declaration of Faith)",
                    arabic: "أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا رَسُولُ اللَّهِ",
                    transliteration: "Ash-hadu an la ilaha illa Allah, wa ash-hadu anna Muhammadan rasulu-Allah.",
                    desc: "Reciting with certitude: 'I bear witness that there is no god worthy of worship except Allah, and I bear witness that Muhammad is the Messenger of Allah.' This enters you into Islam, erasing all prior misdeeds."
                  },
                  {
                    step: 2,
                    title: "Taharah (Purification & Ghusl)",
                    desc: "Performing a complete bath (Ghusl) after converting, and learning minor ritual purification (Wudu/ablution) before praying."
                  },
                  {
                    step: 3,
                    title: "Learning the Daily Salah (Prayers)",
                    desc: "Starting by learning the basic physical postures and reciting short chapters (like Surah Al-Fatihah). Begin praying slowly; Allah rewards your effort and difficulty."
                  },
                  {
                    step: 4,
                    title: "Connecting with the Study Circle Community",
                    desc: "You are not meant to practice in isolation. Link up with correct mentors in our group to ask questions on etiquette, manners, rules, and correct Aqeedah (creed)."
                  }
                ].map((st) => (
                  <div key={st.step} className="relative">
                    <span className="absolute -left-[37px] top-1.5 w-6 h-6 rounded-full bg-[#85431E] border border-[#D39858] text-white flex items-center justify-center text-xs font-mono font-bold">
                      {st.step}
                    </span>
                    <div className="bg-[#1E0F0D] rounded-xl border border-[#D39858]/45 p-5 shadow-sm space-y-2">
                      <h4 className="font-serif font-bold text-[#EACEAA] text-base">{st.title}</h4>
                      {st.arabic && (
                        <p className="font-arabic text-[#D39858] text-center text-lg leading-relaxed pt-2" dir="rtl">
                          {st.arabic}
                        </p>
                      )}
                      {st.transliteration && (
                        <p className="text-xs font-serif italic text-center text-[#D39858] py-1">
                          {st.transliteration}
                        </p>
                      )}
                      <p className="text-xs text-stone-200 leading-relaxed font-sans pt-1">
                        {st.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action brochure */}
              <div className="bg-[#34150F] rounded-xl border border-[#D39858]/50 p-6 flex items-center justify-between text-[#EACEAA]">
                <div>
                  <h4 className="font-serif text-lg font-bold">Download Beginner's Guide Brochure</h4>
                  <p className="text-xs text-[#D39858] font-mono">STEP-BY-STEP PRAYER & FAITH HANDBOOK (PDF EMULATION)</p>
                </div>
                <button
                  onClick={() => alert("Simulating PDF Download: 'Beginner_Guide_To_Islam.pdf' downloaded successfully!")}
                  className="bg-[#85431E] text-[#EACEAA] hover:bg-[#D39858] border border-[#D39858]/30 px-4 py-2.5 rounded-lg text-xs font-mono font-bold transition-colors flex items-center"
                >
                  <FileText className="h-4 w-4 mr-1.5" /> PDF GUIDE
                </button>
              </div>
            </div>

            {/* Outreach contact Form */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-[#EACEAA] rounded-xl border-2 border-[#D39858] p-6 shadow-md space-y-4">
                <span className="text-2xl block text-center">💖</span>
                <h3 className="font-serif text-lg font-bold text-center text-[#34150F]">"You Are Not Alone"</h3>
                <p className="text-xs text-center text-[#150C0C]/80 leading-relaxed font-sans">
                  Whether you are ready to take your Shahada today, or simply have basic inquiries, write to our group. We will reach out to you with utmost brotherhood and confidentiality. No obligations.
                </p>

                {contactSubmitted ? (
                  <div className="p-4 bg-[#85431E]/10 rounded-lg text-center text-xs space-y-2 text-[#85431E] font-medium border border-[#85431E]/30">
                    <p className="font-serif text-sm font-bold">Request Shared Successfully</p>
                    <p>May Allah bless your path. A representative from the Study Circle will email you within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-3 text-xs">
                    <div>
                      <label className="block text-[#34150F] font-bold mb-1">Your Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Liam, Aisha"
                        className="w-full bg-[#150C0C]/5 border border-[#D39858]/60 rounded-lg p-2.5 outline-none focus:ring-1 focus:ring-[#85431E]"
                      />
                    </div>
                    <div>
                      <label className="block text-[#34150F] font-bold mb-1">Your Email</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. seeker@address.com"
                        className="w-full bg-[#150C0C]/5 border border-[#D39858]/60 rounded-lg p-2.5 outline-none focus:ring-1 focus:ring-[#85431E]"
                      />
                    </div>
                    <div>
                      <label className="block text-[#34150F] font-bold mb-1">Your Message (Optional)</label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Feel free to write questions, request a mentor, or set up an online chat..."
                        rows={4}
                        className="w-full bg-[#150C0C]/5 border border-[#D39858]/60 rounded-lg p-2.5 outline-none focus:ring-1 focus:ring-[#85431E]"
                      />
                    </div>
                    
                    <button
                      type="submit"
                      className="w-full bg-[#85431E] hover:bg-[#D39858] text-[#EACEAA] py-2.5 rounded-lg border border-[#D39858]/30 font-serif font-bold text-sm shadow flex items-center justify-center space-x-1"
                    >
                      <Send className="h-4 w-4" />
                      <span>Request Assistance</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        )}

      </AnimatePresence>

    </div>
  );
}
