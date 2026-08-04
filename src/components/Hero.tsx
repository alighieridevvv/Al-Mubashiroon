import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { BookOpen, Compass, Bell, Star, Clock, Award, ShieldAlert, FileText } from 'lucide-react';
import { NAMES_OF_ALLAH, HADITHS_OF_THE_DAY, GROUP_ANNOUNCEMENTS } from '../data/dawah-data';

interface HeroProps {
  setCurrentTab: (tab: string) => void;
}

export default function Hero({ setCurrentTab }: HeroProps) {
  const [nameIndex, setNameIndex] = useState(0);
  const [hadithIndex, setHadithIndex] = useState(0);

  // Rotate Name of the Day and Hadith of the Day based on dates
  useEffect(() => {
    const today = new Date();
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
    setNameIndex(dayOfYear % NAMES_OF_ALLAH.length);
    setHadithIndex(dayOfYear % HADITHS_OF_THE_DAY.length);
  }, []);

  const nameOfTheDay = NAMES_OF_ALLAH[nameIndex];
  const hadithOfTheDay = HADITHS_OF_THE_DAY[hadithIndex];
  const pinnedAnnouncements = GROUP_ANNOUNCEMENTS.filter(a => a.isPinned);

  // Use the exact custom generated image path
  const heroBgPath = "/mosque_hero_bg_1781837399629.jpg";

  return (
    <section className="relative overflow-hidden" id="homepage_hero_section">
      {/* 1. Full-width Hero with Dark Overlay */}
      <div 
        className="relative h-screen sm:h-[90vh] flex items-center justify-center bg-cover bg-center text-center px-4"
        style={{ backgroundImage: `url('${heroBgPath}')` }}
      >
        {/* Subtle Floating Particles for Spiritual Atmosphere */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-[#D39858] w-1 h-1 rounded-full opacity-35"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [-30, -120],
                x: [-15, 15],
                opacity: [0, 0.4, 0],
              }}
              transition={{
                duration: 6 + Math.random() * 6,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>

        {/* Dark overlay: Balsamico at 75% opacity */}
        <div className="absolute inset-0 bg-[#150C0C]/75 backdrop-blur-[1px]" />

        {/* Hero Content */}
        <div className="relative max-w-4xl mx-auto z-10 flex flex-col items-center">
          
          {/* Announcement Indicator bubble */}
          {pinnedAnnouncements.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 flex items-center bg-[#34150F]/90 border border-[#D39858]/60 px-4 py-2 rounded-full space-x-2 text-xs font-serif text-[#EACEAA]"
            >
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#85431E] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#85431E]"></span>
              </span>
              <span><span className="text-[#D39858] font-bold">New Notice:</span> {pinnedAnnouncements[0].title}</span>
            </motion.div>
          )}

          {/* Bismillah Core Display */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <p className="font-arabic text-[#EACEAA] text-4xl sm:text-5xl md:text-6xl tracking-wide leading-relaxed" dir="rtl" lang="ar">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </p>
            <p className="font-serif italic text-[#D39858] text-sm sm:text-base mt-2">
              Bismillahir-Rahmanir-Raheem
            </p>
            <p className="text-xs sm:text-sm text-[#EACEAA]/80 mt-1 uppercase tracking-widest font-sans font-medium">
              In the name of Allah, the Most Gracious, the Most Merciful
            </p>
          </motion.div>

          <span className="w-16 h-0.5 bg-[#D39858]/50 my-4" />

          {/* Tagline Obligation Statement */}
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#EACEAA] font-bold tracking-tight max-w-2xl leading-tight mb-4"
          >
            "Seeking knowledge is an obligation upon every Muslim"
          </motion.h2>

          <p className="text-sm sm:text-base text-[#D39858] max-w-xl mb-8 font-sans">
            Welcome to the study circle. Explore the noble Qur'an with word-by-word translations, listen to classic audio recitations, and deepen your understanding of Islamic monotheism.
          </p>

          {/* Large CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full justify-center px-4"
          >
            <button
              onClick={() => setCurrentTab('quran')}
              className="flex items-center justify-center space-x-2 bg-[#85431E] text-[#EACEAA] hover:bg-[#D39858] border border-[#D39858]/40 hover:border-[#85431E] px-8 py-3.5 rounded-lg text-base font-serif font-semibold shadow-lg hover:shadow-xl transition-all-custom cursor-pointer"
            >
              <BookOpen className="h-5 w-5" />
              <span>Read the Qur'an</span>
            </button>
            <button
              onClick={() => setCurrentTab('dawah')}
              className="flex items-center justify-center space-x-2 bg-transparent text-[#EACEAA] hover:bg-[#34150F]/60 border-2 border-[#D39858] px-8 py-3.5 rounded-lg text-base font-serif font-semibold shadow-md transition-all-custom cursor-pointer"
            >
              <Compass className="h-5 w-5 text-[#D39858]" />
              <span>Learn About Islam</span>
            </button>
          </motion.div>
        </div>
      </div>

      {/* 2. Announcement / Welcome Banner below Hero */}
      <div className="bg-[#34150F] text-[#EACEAA] border-t border-b border-[#D39858]/30 py-4 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0">
          <div className="flex items-center space-x-2 shrink-0">
            <Bell className="h-4 w-4 text-[#D39858] animate-bounce" />
            <span className="text-xs font-mono font-bold tracking-widest text-[#D39858] uppercase">ANNOUNCEMENT CIRCULAR</span>
          </div>
          <div className="text-center md:text-left text-sm font-serif italic text-[#EACEAA]/90 px-4 flex-1">
            {pinnedAnnouncements.length > 0 
              ? `"${pinnedAnnouncements[0].title}: ${pinnedAnnouncements[0].body.slice(0, 100)}..."`
              : "Study group active: Join our weekly Tafseer sessions of Surah Al-Kahf on Saturday morning."}
          </div>
          <button 
            onClick={() => setCurrentTab('study')}
            className="text-xs font-sans text-[#D39858] hover:text-[#EACEAA] underline font-bold shrink-0 transition-colors"
          >
            View Announcements Board →
          </button>
        </div>
      </div>

      {/* 3. Daily Content Highlights Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 arabesque-pattern">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Highlight A: Name of the Day */}
          <motion.div
            whileHover={{ y: -4 }}
            className="bg-[#1E0F0D] rounded-xl border border-[#D39858] p-8 shadow-md flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between border-b border-[#D39858]/20 pb-4 mb-6">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#D39858] flex items-center">
                  <Star className="h-4 w-4 mr-1.5 fill-[#D39858] text-[#D39858]" /> Beautiful Name of the Day
                </span>
                <span className="text-xs text-[#EACEAA] font-mono font-bold opacity-80">Name {nameOfTheDay.number} of 99</span>
              </div>
              
              <div className="text-center py-6">
                <p className="font-arabic text-[#D39858] text-5xl md:text-6xl font-bold mb-3" dir="rtl" lang="ar">
                  {nameOfTheDay.name}
                </p>
                <h3 className="font-serif text-xl font-bold text-[#EACEAA]">
                  {nameOfTheDay.transliteration}
                </h3>
                <p className="text-sm sm:text-base text-stone-300 mt-2 italic font-sans">
                  "{nameOfTheDay.meaning}"
                </p>
              </div>
            </div>
            
            <div className="text-center mt-6">
              <button
                onClick={() => setCurrentTab('dawah')}
                className="text-xs font-mono font-bold text-[#D39858] hover:text-[#EACEAA] transition-colors hover:underline"
              >
                Browse all 99 Names of Allah →
              </button>
            </div>
          </motion.div>

          {/* Highlight B: Hadith of the Day */}
          <motion.div
            whileHover={{ y: -4 }}
            className="bg-[#34150F] text-[#EACEAA] rounded-xl border border-[#D39858]/40 p-8 shadow-md flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between border-b border-[#D39858]/20 pb-4 mb-6">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#D39858]">
                  📜 Prophetic Guidance
                </span>
                <span className="text-xs text-[#D39858] font-mono">{hadithOfTheDay.source}</span>
              </div>
              
              <div className="space-y-4">
                <p className="font-arabic text-right text-lg sm:text-xl text-[#EACEAA]/95 leading-relaxed" dir="rtl" lang="ar">
                  {hadithOfTheDay.arabic}
                </p>
                <p className="font-serif text-xs text-[#D39858] italic border-r border-[#D39858]/30 pr-2">
                  {hadithOfTheDay.transliteration}
                </p>
                <div className="relative pl-6">
                  {/* Styled big quotation marks */}
                  <span className="absolute left-0 top-0 text-3xl font-serif text-[#D39858] opacity-35 leading-none">“</span>
                  <p className="text-sm font-sans leading-relaxed text-[#EACEAA]/90">
                    {hadithOfTheDay.english}
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center mt-8 pt-4 border-t border-[#D39858]/10">
              <span className="text-[11px] text-[#D39858] font-mono">
                Daily Rotations from authentic Sahih collections.
              </span>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Portals Section: Beautiful Interactive App Cards */}
      <div className="bg-[#EACEAA]/45 py-16 border-t border-b border-[#D39858]/15" id="interactive_apps_portals">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#85431E]">Interactive Suites</span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#34150F] mt-1.5 mb-3">
              Explore Our Advanced Interactive Utilities
            </h3>
            <p className="text-xs sm:text-sm text-[#150C0C]/75 leading-relaxed font-sans max-w-xl mx-auto">
              Dive into our newly preloaded stateful modules, crafted to support accurate schedules, historic biographies, terminology translations, and structured academic defenses.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                id: 'prayer',
                title: 'Daily Prayer Times & Qibla',
                desc: 'Real-time GPS calculation, Adhan audio notifications toggle, and precise Qibla degree orientation.',
                tag: 'SUITE',
                icon: Clock,
                color: 'from-[#34150F]/5 to-[#85431E]/5',
                borderColor: 'border-[#D39858]/40'
              },
              {
                id: 'seerah',
                title: 'Prophetic Seerah Biography',
                desc: 'Travel through an interactive chronological timeline cataloging key milestones, revelations, and treaties of Prophet Muhammad ﷺ.',
                tag: 'CHRONOLOGY',
                icon: Award,
                color: 'from-[#34150F]/5 to-[#85431E]/5',
                borderColor: 'border-[#D39858]/40'
              },
              {
                id: 'glossary',
                title: 'Classical A-Z Glossary',
                desc: 'Look up terminology definitions in Arabic and English, study the automated rotation for Term of the Day with filters.',
                tag: 'LEXICON',
                icon: FileText,
                color: 'from-[#34150F]/5 to-[#85431E]/5',
                borderColor: 'border-[#D39858]/40'
              },
              {
                id: 'refutations',
                title: 'Evidence-Based Response Hub',
                desc: 'Review scholarly defenses answering claims about women in Islam, science, and scriptures using authentic chains and texts.',
                tag: 'APOLOGETICS',
                icon: ShieldAlert,
                color: 'from-rose-950/5 to-rose-900/5',
                borderColor: 'border-rose-900/10'
              }
            ].map((p) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={p.id}
                  whileHover={{ y: -6, scale: 1.01 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  onClick={() => {
                    setCurrentTab(p.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`bg-[#EACEAA]/80 backdrop-blur-[1px] hover:bg-white/40 dark:bg-[#34150F] dark:hover:bg-[#150C0C] ${p.borderColor} border rounded-xl p-6 shadow-sm flex flex-col justify-between cursor-pointer transition-all duration-300 relative overflow-hidden group`}
                >
                  <div>
                    {/* Header line */}
                    <div className="flex items-center justify-between mb-5">
                      <span className="text-[9px] font-mono font-bold tracking-widest text-[#85431E] uppercase px-2 py-0.5 bg-[#85431E]/10 rounded-md">
                        {p.tag}
                      </span>
                      <Icon className="h-5 w-5 text-[#85431E]/80 group-hover:text-[#85431E] transition-colors" />
                    </div>

                    <h4 className="font-serif text-base font-bold text-[#34150F] group-hover:text-[#85431E] transition-colors leading-tight">
                      {p.title}
                    </h4>
                    <p className="text-xs text-[#150C0C]/75 mt-2.5 leading-relaxed font-sans">
                      {p.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-3 border-t border-[#D39858]/15 flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-[#85431E] uppercase tracking-wider group-hover:underline">
                      Open Module →
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4. Mini Callout cards / Quick Intro banner */}
      <div className="bg-[#150C0C] text-[#EACEAA] py-14 border-t border-b border-[#D39858]/20">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-around space-y-8 md:space-y-0">
          <div className="text-center md:max-w-xs space-y-2">
            <span className="text-2xl">🌱</span>
            <h4 className="font-serif text-lg font-bold text-[#EACEAA]">Spiritually Grounded</h4>
            <p className="text-xs text-[#EACEAA]/75">Designed to reflect the warmth, humility, and absolute visual dignity of Islamic history.</p>
          </div>
          <div className="w-px h-12 bg-[#D39858]/25 hidden md:block" />
          <div className="text-center md:max-w-xs space-y-2">
            <span className="text-2xl">📚</span>
            <h4 className="font-serif text-lg font-bold text-[#EACEAA]">Sacred Repository</h4>
            <p className="text-xs text-[#EACEAA]/75">Study translation, phonetic transliterations, and professional audio recitation in sync.</p>
          </div>
          <div className="w-px h-12 bg-[#D39858]/25 hidden md:block" />
          <div className="text-center md:max-w-xs space-y-2">
            <span className="text-2xl">🤝</span>
            <h4 className="font-serif text-lg font-bold text-[#EACEAA]">Seeker Sanctuary</h4>
            <p className="text-xs text-[#EACEAA]/75">Welcoming both searching Muslims and curious neighbors into authentic dialogue.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
