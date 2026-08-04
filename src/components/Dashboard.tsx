import { useState, useEffect } from 'react';
import { 
  BookOpen, Clock, Award, ShieldAlert, FileText, Compass, ChevronRight, 
  Flame 
} from 'lucide-react';
import { HADITHS_OF_THE_DAY, DAWAH_ARTICLES } from '../data/dawah-data';

interface DashboardProps {
  setCurrentTab: (tab: string) => void;
  streak: number;
}

interface PrayerTimings {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
}

export default function Dashboard({ setCurrentTab, streak }: DashboardProps) {
  const [hijriDate, setHijriDate] = useState('4 Muharram 1448 AH');
  const [gregorianDate, setGregorianDate] = useState('');
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimings | null>(null);
  const [nextPrayerName, setNextPrayerName] = useState('Fajr');
  const [countdownText, setCountdownText] = useState('Loading...');
  const [hadithIndex, setHadithIndex] = useState(0);
  const [isLoadingPrayer, setIsLoadingPrayer] = useState(false);
  const [prayerError, setPrayerError] = useState<string | null>(null);

  // Continue reading local states
  const [lastReadSurah] = useState(() => localStorage.getItem('last_read_surah_name') || 'Surah Al-Kahf');
  const [lastReadAyah] = useState(() => localStorage.getItem('last_read_ayah_num') || 'Ayah 15');
  const [readProgress] = useState(() => parseInt(localStorage.getItem('last_read_progress') || '45', 10));

  useEffect(() => {
    // Gregorian calendar date formatting
    const today = new Date();
    setGregorianDate(today.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));

    // Set stable/calculated Hadith index
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 1).getTime()) / 86400000);
    setHadithIndex(dayOfYear % HADITHS_OF_THE_DAY.length);

    // Fetch live timings if online
    if (navigator.onLine) {
      setIsLoadingPrayer(true);
      setPrayerError(null);
      fetch('https://api.aladhan.com/v1/timingsByCity?city=Makkah&country=Saudi%20Arabia&method=4')
        .then(res => res.json())
        .then(json => {
          if (json.data) {
            const h = json.data.date.hijri;
            setHijriDate(`${h.day} ${h.month.en} ${h.year} ${h.designation}`);
            setPrayerTimes(json.data.timings);
          }
        })
        .catch((err) => {
          console.error('Failed to fetch prayer times:', err);
          setPrayerError('Failed to load prayer times. Using fallback times.');
        })
        .finally(() => {
          setIsLoadingPrayer(false);
        });
    }
  }, []);

  // Set local state timers for next prayer and countdown
  useEffect(() => {
    const times: PrayerTimings = prayerTimes || {
      Fajr: '04:12',
      Sunrise: '05:38',
      Dhuhr: '12:22',
      Asr: '15:45',
      Maghrib: '19:04',
      Isha: '20:32'
    };

    const timer = setInterval(() => {
      const now = new Date();
      const list = [
        { name: 'Fajr', time: times.Fajr },
        { name: 'Sunrise', time: times.Sunrise },
        { name: 'Dhuhr', time: times.Dhuhr },
        { name: 'Asr', time: times.Asr },
        { name: 'Maghrib', time: times.Maghrib },
        { name: 'Isha', time: times.Isha }
      ];

      let nextIdx = -1;
      let minDiff = Infinity;
      let nextTime: Date | null = null;

      list.forEach((p, idx) => {
        const [hh, mm] = p.time.split(':').map(Number);
        const pDate = new Date(now);
        pDate.setHours(hh, mm, 0, 0);

        const diff = pDate.getTime() - now.getTime();
        if (diff > 0 && diff < minDiff) {
          minDiff = diff;
          nextIdx = idx;
          nextTime = pDate;
        }
      });

      // Wraparound Fajr tomorrow
      if (!nextTime) {
        const [hh, mm] = list[0].time.split(':').map(Number);
        const tomorrow = new Date(now);
        tomorrow.setDate(now.getDate() + 1);
        tomorrow.setHours(hh, mm, 0, 0);
        minDiff = tomorrow.getTime() - now.getTime();
        nextIdx = 0;
      }

      const exactSecs = Math.floor(minDiff / 1000);
      const hours = Math.floor(exactSecs / 3600);
      const mins = Math.floor((exactSecs % 3600) / 60);
      const secs = exactSecs % 60;

      setNextPrayerName(list[nextIdx]?.name || 'Fajr');
      setCountdownText(`${hours}h ${mins}m ${secs}s`);
    }, 1000);

    return () => clearInterval(timer);
  }, [prayerTimes]);

  const hadithOfTheDay = HADITHS_OF_THE_DAY[hadithIndex] || HADITHS_OF_THE_DAY[0];
  const recentArticles = DAWAH_ARTICLES.slice(0, 2);

  const activePressClass = "active:scale-[0.98] transition-all duration-100 cursor-pointer";

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 arabesque-pattern" id="dashboard_screen_root">
      
      {/* LAPTOP / DESKTOP TWO-COLUMN BLOCK */}
      <div className="hidden lg:grid grid-cols-12 gap-8 items-start mb-8">
        
        {/* Left Column (Main features) */}
        <div className="col-span-8 space-y-6">
          {/* Greeting segment */}
          <div className="bg-[#1E0F0D] border border-[#D39858]/30 rounded-2xl p-6 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[11px] font-mono tracking-widest text-[#D39858] uppercase">SINCERE GREETING</span>
              <h2 className="font-serif text-3xl font-bold text-[#EACEAA]">Assalamu Alaikum</h2>
              <p className="text-xs text-stone-300 font-sans">{gregorianDate} / <span className="text-amber-200">{hijriDate}</span></p>
            </div>
            
            {/* Streak display */}
            <div className="flex items-center gap-3 bg-[#34150F] px-4 py-2.5 rounded-xl border border-[#D39858]/20 shadow-inner">
              <Flame className="h-5 w-5 text-amber-500 fill-amber-500 animate-pulse" />
              <div>
                <span className="block text-[9px] font-mono uppercase text-stone-400">Streak Tracker</span>
                <span className="block text-xs font-bold text-[#EACEAA]">{streak} Days Active</span>
              </div>
            </div>
          </div>

          {/* Hadith of the Day card */}
          <div className={`bg-[#34150F] border border-[#D39858]/40 rounded-2xl p-6 ${activePressClass} space-y-4`} onClick={() => setCurrentTab('hadiths')}>
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-mono bg-[#85431E]/20 text-[#D39858] px-2 py-0.5 rounded border border-[#D39858]/15">
                Hadith of the Day
              </span>
              <span className="text-[10px] text-stone-400 font-mono">Click to browse library</span>
            </div>
            <p className="font-arabic text-amber-100 text-right text-xl leading-loose" dir="rtl">
              {hadithOfTheDay.arabic}
            </p>
            <p className="text-xs font-serif italic text-stone-300">
              {hadithOfTheDay.transliteration}
            </p>
            <p className="text-xs sm:text-sm text-[#EACEAA] leading-relaxed font-sans font-normal">
              "{hadithOfTheDay.english}"
            </p>
            <div className="flex justify-end pt-1">
              <span className="text-[10px] font-mono uppercase bg-[#150C0C]/50 px-2 py-1 rounded border border-[#D39858]/10 text-[#D39858]">
                {hadithOfTheDay.source}
              </span>
            </div>
          </div>

          {/* Quick Access bento card grid (3x2 format) */}
          <div className="space-y-3">
            <h3 className="text-sm font-serif font-bold text-[#D39858] uppercase tracking-wider pl-1 font-mono">Sacred Utilities</h3>
            <div className="grid grid-cols-3 gap-4">
              {[
                { id: 'quran', title: 'Qur\'an Reader', desc: 'Read & study tafsir drawer', icon: BookOpen },
                { id: 'hadiths', title: 'Hadith Library', desc: 'Sincerity & manners codes', icon: Award },
                { id: 'prayer', title: 'Prayer Times', desc: 'Adhan schedule & Qibla', icon: Clock },
                { id: 'seerah', title: 'Prophetic Seerah', desc: 'Interactive history line', icon: Compass },
                { id: 'glossary', title: 'Islamic Glossary', desc: 'Classical Arabic terms', icon: FileText },
                { id: 'refutations', title: 'Evidence Hub', desc: 'Academic study & defenses', icon: ShieldAlert }
              ].map(item => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.id}
                    onClick={() => setCurrentTab(item.id)}
                    className={`bg-[#1E0F0D] hover:bg-[#34150F] border border-[#D39858]/20 rounded-xl p-4 flex flex-col justify-between ${activePressClass}`}
                  >
                    <div className="w-9 h-9 rounded-full bg-[#85431E]/20 text-[#D39858] border border-[#D39858]/10 flex items-center justify-center mb-3">
                      <Icon className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-serif font-bold text-[#EACEAA]">{item.title}</h4>
                      <p className="text-[10px] text-stone-400 font-sans mt-1 leading-normal">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column (Sidebar widgets) */}
        <div className="col-span-4 space-y-6">
          {/* Active Prayer Card */}
          <div className={`bg-[#34150F] border-2 border-[#D39858]/60 rounded-2xl p-6 text-center ${activePressClass} relative overflow-hidden`} onClick={() => setCurrentTab('prayer')}>
            <span className="text-[10px] font-mono tracking-widest text-[#D39858] uppercase block mb-1">Liturgical Countdown</span>
            {isLoadingPrayer ? (
              <div className="py-4">
                <div className="text-[#EACEAA]/60 text-sm">Loading prayer times...</div>
              </div>
            ) : prayerError ? (
              <div className="py-4">
                <div className="text-red-400 text-xs">{prayerError}</div>
                <span className="block text-xl font-serif text-[#EACEAA] font-bold mt-2">Upcoming: {nextPrayerName}</span>
                <span className="block text-3xl font-mono text-[#D39858] font-bold tracking-tight mt-2">{countdownText}</span>
              </div>
            ) : (
              <>
                <span className="block text-xl font-serif text-[#EACEAA] font-bold">Upcoming: {nextPrayerName}</span>
                <span className="block text-3xl font-mono text-[#D39858] font-bold tracking-tight mt-2">{countdownText}</span>
              </>
            )}
            
            {/* Quick 5 prayers grid */}
            <div className="grid grid-cols-5 gap-1 mt-6 pt-4 border-t border-[#D39858]/15 text-[10px] font-mono">
              {['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'].map((pr) => {
                const active = pr === nextPrayerName;
                return (
                  <div key={pr} className={`p-1.5 rounded flex flex-col items-center justify-between ${active ? 'bg-[#85431E] text-[#EACEAA]' : 'bg-[#150C0C]/40 text-stone-400'}`}>
                    <span>{pr}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Continue reading */}
          <div className={`bg-[#1E0F0D] border border-[#D39858]/25 rounded-2xl p-5 ${activePressClass}`} onClick={() => setCurrentTab('quran')}>
            <span className="text-[10px] font-mono text-[#D39858] uppercase tracking-wider block mb-2">Continue Studying</span>
            <h4 className="font-serif font-bold text-sm text-[#EACEAA]">{lastReadSurah}</h4>
            <span className="text-xs text-stone-400 font-sans mt-0.5 block">{lastReadAyah}</span>
            
            {/* Progress bar */}
            <div className="mt-4 space-y-1">
              <div className="w-full h-1.5 bg-[#34150F] rounded-full overflow-hidden">
                <div className="h-full bg-[#D39858] rounded-full" style={{ width: `${readProgress}%` }} />
              </div>
              <div className="flex items-center justify-between text-[9px] font-mono text-stone-400">
                <span>Completed: {readProgress}%</span>
                <span>Open Reader →</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* MOBILE SCREEN LAYOUT */}
      <div className="lg:hidden space-y-6">
        
        {/* Assalamu alaikum greeting + Hijri date */}
        <div className="bg-[#1E0F0D] border border-[#D39858]/20 rounded-xl p-4">
          <span className="text-[9px] font-mono tracking-wider text-[#D39858] uppercase">GREETING</span>
          <h2 className="font-serif text-2xl font-bold text-[#EACEAA]">Assalamu Alaikum</h2>
          <p className="text-[11px] text-stone-300 font-sans mt-1 leading-relaxed">
            {gregorianDate} / <span className="text-amber-200">{hijriDate}</span>
          </p>
        </div>

        {/* Prayer time progress card with active countdown */}
        <div className={`bg-[#34150F] border-2 border-[#D39858]/60 rounded-xl p-5 text-center ${activePressClass}`} onClick={() => setCurrentTab('prayer')}>
          <span className="text-[9px] font-mono text-[#D39858] uppercase block mb-1">Liturgical Countdown</span>
          <span className="block text-base font-serif text-[#EACEAA] font-bold">Upcoming: {nextPrayerName}</span>
          <span className="block text-2xl font-mono text-[#D39858] font-bold mt-1">{countdownText}</span>
        </div>

        {/* Hadith card */}
        <div className={`bg-[#34150F] border border-[#D39858]/30 rounded-xl p-5 ${activePressClass} space-y-3`} onClick={() => setCurrentTab('hadiths')}>
          <div className="flex items-center justify-between pb-1 border-b border-[#D39858]/10 mb-2">
            <span className="text-[8px] font-mono uppercase bg-[#85431E]/20 text-[#D39858] px-2 py-0.5 rounded">Hadith of the Day</span>
            <span className="text-[9px] font-mono text-stone-400">Book: {hadithOfTheDay.source.split(' ')[0]}</span>
          </div>
          <p className="font-arabic text-[#D39858] text-right text-lg leading-loose" dir="rtl">
            {hadithOfTheDay.arabic}
          </p>
          <p className="text-[11px] text-[#EACEAA] leading-normal font-sans font-normal">
            "{hadithOfTheDay.english}"
          </p>
        </div>

        {/* Quick Access Mobile Grid */}
        <div className="space-y-2">
          <span className="text-[9px] font-mono font-bold tracking-widest text-[#D39858] uppercase px-1">Quick Access</span>
          <div className="grid grid-cols-2 gap-3">
            {[
              { id: 'quran', title: 'Holy Qur\'an', icon: BookOpen },
              { id: 'prayer', title: 'Prayer Times', icon: Clock },
              { id: 'hadiths', title: 'Hadith Library', icon: Award },
              { id: 'seerah', title: 'Prophetic Seerah', icon: Compass }
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  onClick={() => setCurrentTab(item.id)}
                  className={`bg-[#1E0F0D] border border-[#D39858]/20 rounded-xl p-4 flex flex-col items-center text-center justify-center space-y-2.5 ${activePressClass}`}
                >
                  <div className="w-9 h-9 rounded-full bg-[#85431E]/20 text-[#D39858] border border-[#D39858]/10 flex items-center justify-center">
                    <Icon className="h-4.5 w-4.5" />
                  </div>
                  <span className="text-xs font-serif font-bold text-[#EACEAA]">{item.title}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Continue reading */}
        <div className={`bg-[#1E0F0D] border border-[#D39858]/20 rounded-xl p-4 ${activePressClass}`} onClick={() => setCurrentTab('quran')}>
          <span className="text-[9px] font-mono text-[#D39858] uppercase tracking-wider block mb-1">Last Studied</span>
          <h4 className="font-serif font-bold text-xs text-[#EACEAA]">{lastReadSurah} • <span className="text-stone-400 font-sans">{lastReadAyah}</span></h4>
          <div className="mt-3 space-y-1">
            <div className="w-full h-1 bg-[#34150F] rounded-full overflow-hidden">
              <div className="h-full bg-[#D39858] rounded-full" style={{ width: `${readProgress}%` }} />
            </div>
            <div className="flex items-center justify-between text-[8px] font-mono text-stone-400">
              <span>Progress: {readProgress}%</span>
              <span>Open Reader →</span>
            </div>
          </div>
        </div>

      </div>

      {/* SHARED: RECENT KNOWLEDGE HUB ARTICLES */}
      <div className="mt-8 space-y-4">
        <div className="flex items-center justify-between px-1">
          <h3 className="font-serif text-lg font-bold text-[#EACEAA]">Newly from Knowledge Hub</h3>
          <button onClick={() => setCurrentTab('knowledge')} className="text-xs font-mono text-[#D39858] hover:underline flex items-center gap-1">
            <span>Explore Base</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recentArticles.map(art => (
            <div
              key={art.id}
              onClick={() => setCurrentTab('knowledge')}
              className={`bg-[#1E0F0D] border border-[#D39858]/20 rounded-xl p-5 flex flex-col justify-between ${activePressClass}`}
            >
              <div>
                <div className="flex items-center justify-between text-[10px] font-mono text-stone-400 mb-2">
                  <span className="uppercase text-[#D39858]">{art.category}</span>
                  <span>{art.readTime} reading</span>
                </div>
                <h4 className="font-serif font-bold text-sm text-[#EACEAA] leading-snug group-hover:text-[#D39858] transition-colors">
                  {art.title}
                </h4>
                <p className="text-xs text-stone-300 font-sans leading-relaxed mt-2.5">
                  {art.summary}
                </p>
              </div>
              <div className="mt-4 pt-2 border-t border-[#D39858]/10 flex items-center justify-between text-[10px] font-mono text-[#D39858]">
                <span>Read detailed treatise</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
