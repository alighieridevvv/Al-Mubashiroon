import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, BookOpen, Clock, Award, ShieldAlert, FileText, Compass, 
  Settings as SettingsIcon, Heart, Star, Info, Mail, 
  BookMarked, GraduationCap, LayoutGrid, ArrowLeft, X, Flame 
} from 'lucide-react';

import Dashboard from './components/Dashboard';
import QuranReader from './components/QuranReader';
import TafsirStudy from './components/TafsirStudy';
import DawahHub from './components/DawahHub';
import KnowledgeHub from './components/KnowledgeHub';
import StudyTools from './components/StudyTools';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import PrayerTimes from './components/PrayerTimes';
import SeerahTimeline from './components/SeerahTimeline';
import IslamicGlossary from './components/IslamicGlossary';
import RefutationsMisconceptions from './components/RefutationsMisconceptions';
import HadithLibrary from './components/HadithLibrary';
import NewMuslimHub from './components/NewMuslimHub';
import ChildrenCorner from './components/ChildrenCorner';
import Settings from './components/Settings';

import { Bookmark } from './types';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>(() => {
    const hash = window.location.hash;
    if (hash && hash.startsWith('#/')) {
      const tabFromHash = hash.substring(2);
      const validTabs = [
        'home', 'quran', 'dawah', 'knowledge', 'study', 'about', 'contact', 
        'prayer', 'seerah', 'glossary', 'refutations', 'hadiths', 'newmuslim', 
        'children', 'settings', 'tafsir'
      ];
      if (validTabs.includes(tabFromHash)) {
        return tabFromHash;
      }
    }
    return localStorage.getItem('last_tab') || 'home';
  });

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [moreBottomSheetOpen, setMoreBottomSheetOpen] = useState(false);

  // Watch hash movements to align currentTab
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash && hash.startsWith('#/')) {
        const tabFromHash = hash.substring(2);
        const validTabs = [
          'home', 'quran', 'dawah', 'knowledge', 'study', 'about', 'contact', 
          'prayer', 'seerah', 'glossary', 'refutations', 'hadiths', 'newmuslim', 
          'children', 'settings', 'tafsir'
        ];
        if (validTabs.includes(tabFromHash)) {
          setCurrentTab(tabFromHash);
        }
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Update hash when current tab changes
  useEffect(() => {
    window.location.hash = `#/${currentTab}`;
    localStorage.setItem('last_tab', currentTab);
  }, [currentTab]);
  
  const [highContrast, setHighContrast] = useState<boolean>(() => {
    return localStorage.getItem('contrast_mode') === 'true';
  });

  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large' | 'xl'>(() => {
    return (localStorage.getItem('global_font_size') as 'small' | 'medium' | 'large' | 'xl') || 'medium';
  });

  // Reading streak calculations local state
  const [streak, setStreak] = useState<number>(() => {
    const saved = localStorage.getItem('study_streak');
    return saved ? parseInt(saved, 10) : 0;
  });

  // Bookmarks loaded from localStorage
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(() => {
    try {
      const saved = localStorage.getItem('study_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Completed articles list
  const [completedTopics, setCompletedTopics] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('completed_study_topics');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('contrast_mode', highContrast.toString());
  }, [highContrast]);

  useEffect(() => {
    localStorage.setItem('global_font_size', fontSize);
  }, [fontSize]);

  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ message, type });
  };

  // Update bookmarks helper
  const addBookmark = (b: Omit<Bookmark, 'id' | 'date'>): void => {
    const newB: Bookmark = {
      ...b,
      id: `${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      date: new Date().toLocaleDateString()
    };
    const updated = [...bookmarks, newB];
    setBookmarks(updated);
    localStorage.setItem('study_bookmarks', JSON.stringify(updated));
    showToast(`Ayah bookmarked. Check Study Tools notes.`, 'success');
  };

  const removeBookmark = (id: string): void => {
    const updated = bookmarks.filter((b: Bookmark) => b.id !== id);
    setBookmarks(updated);
    localStorage.setItem('study_bookmarks', JSON.stringify(updated));
    showToast("Bookmark removed.", 'info');
  };

  const toggleTopicCompletion = (id: string): void => {
    setCompletedTopics((prev: string[]) => {
      const exists = prev.includes(id);
      const next = exists ? prev.filter((x: string) => x !== id) : [...prev, id];
      localStorage.setItem('completed_study_topics', JSON.stringify(next));
      return next;
    });
  };

  // Safe daily reading streak check
  const updateStreak = () => {
    const todayStr = new Date().toDateString();
    const lastReadDate = localStorage.getItem('last_reading_date');

    if (lastReadDate !== todayStr) {
      localStorage.setItem('last_reading_date', todayStr);
      let nextStreak = streak;

      if (lastReadDate) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        if (new Date(lastReadDate).toDateString() === yesterday.toDateString()) {
          nextStreak += 1;
        } else {
          nextStreak = 1;
        }
      } else {
        nextStreak = 1;
      }
      setStreak(nextStreak);
      localStorage.setItem('study_streak', nextStreak.toString());
    }
  };

  const getSectionLabel = () => {
    switch (currentTab) {
      case 'home': return 'Home & Dashboard';
      case 'quran': return 'Qur\'an Study Suite';
      case 'tafsir': return 'Qur\'an Commentaries';
      case 'dawah': return 'Dawah Guidance';
      case 'knowledge': return 'Scholarly treatises';
      case 'study': return 'Personal Study Center';
      case 'about': return 'App Chronicles';
      case 'contact': return 'Active Inquiries';
      case 'prayer': return 'Prayer Times & Qibla';
      case 'seerah': return 'Prophetic Biography';
      case 'glossary': return 'Lexicon Terms';
      case 'refutations': return 'Polished Defenses';
      case 'hadiths': return 'Sacred Hadith Compilations';
      case 'newmuslim': return 'Revert Mentorship Hub';
      case 'children': return 'Children\'s Oasis';
      case 'settings': return 'User Preferences';
      default: return 'Al-Mubashshireen';
    }
  };

  const getBreadcrumbs = () => {
    switch (currentTab) {
      case 'home': return 'Home / Hub';
      case 'quran': return 'Core / Holy Quran';
      case 'tafsir': return 'Quran / Tafsir Commentaries';
      case 'dawah': return 'Social / Dawah Base';
      case 'knowledge': return 'Scholarly / Treatises';
      case 'study': return 'Personal / Trackers';
      case 'prayer': return 'Utilities / Prayer Clocks';
      case 'seerah': return 'Chronology / Prophetic Seerah';
      case 'hadiths': return 'Library / Prophetic Sayings';
      case 'newmuslim': return 'Community / Reverts';
      case 'children': return 'Youth / Children Corners';
      case 'settings': return 'System / App Sizing';
      default: return 'Core / Dashboard';
    }
  };

  const renderTabContent = () => {
    switch (currentTab) {
      case 'home':
        return <Dashboard setCurrentTab={setCurrentTab} streak={streak} />;
      case 'quran':
        return (
          <QuranReader
            bookmarks={bookmarks}
            addBookmark={addBookmark}
            removeBookmark={removeBookmark}
            updateStreak={updateStreak}
          />
        );
      case 'tafsir':
        return <TafsirStudy />;
      case 'dawah':
        return <DawahHub />;
      case 'knowledge':
        return (
          <KnowledgeHub
            completedTopics={completedTopics}
            toggleTopicCompletion={toggleTopicCompletion}
          />
        );
      case 'study':
        return (
          <StudyTools
            bookmarks={bookmarks}
            completedTopics={completedTopics}
            streak={streak}
          />
        );
      case 'about':
        return <AboutUs />;
      case 'contact':
        return <ContactUs />;
      case 'prayer':
        return <PrayerTimes />;
      case 'seerah':
        return <SeerahTimeline />;
      case 'glossary':
        return <IslamicGlossary />;
      case 'refutations':
        return <RefutationsMisconceptions />;
      case 'hadiths':
        return <HadithLibrary />;
      case 'newmuslim':
        return <NewMuslimHub />;
      case 'children':
        return <ChildrenCorner />;
      case 'settings':
        return (
          <Settings
            fontSize={fontSize}
            setFontSize={setFontSize}
            highContrast={highContrast}
            setHighContrast={setHighContrast}
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
            onClearBookmarks={() => setBookmarks([])}
          />
        );
      default:
        return <Dashboard setCurrentTab={setCurrentTab} streak={streak} />;
    }
  };

  const fontSizeMapping: Record<'small' | 'medium' | 'large' | 'xl', string> = {
    small: 'text-size-small',
    medium: 'text-size-medium',
    large: 'text-size-large',
    xl: 'text-size-xl'
  };

  return (
    <div className={`min-h-screen bg-[#150C0C] text-[#EACEAA] select-none ${
      highContrast ? 'high-contrast' : ''
    } ${fontSizeMapping[fontSize]}`} id="app_root_shell">
      
      {/* LAPTOP / DESKTOP SYSTEM HOOD (Fixed structural frame) */}
      <div className="hidden lg:flex h-screen overflow-hidden">
        
        {/* Left Sidebar Fixed panel */}
        <aside
          className={`h-full bg-[#150C0C] border-r border-[#85431E]/30 flex flex-col justify-between transition-all duration-200 z-20 shrink-0 ${
            sidebarCollapsed ? 'w-16' : 'w-64'
          }`}
          id="laptop_nav_sidebar"
        >
          {/* logo section */}
          <div className="h-16 bg-[#34150F] flex items-center justify-between px-4 border-b border-[#85431E]/45 shrink-0 overflow-hidden">
            {!sidebarCollapsed && (
              <span className="font-arabic text-xl font-bold text-[#EACEAA] tracking-wide truncate">المبشرين</span>
            )}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-1 text-[#D39858] hover:text-[#EACEAA] transition-colors mx-auto"
              title={sidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            >
              <LayoutGrid className="h-5 w-5" />
            </button>
          </div>

          {/* scrollable links list */}
          <div className="flex-grow overflow-y-auto px-2 py-4 space-y-4 font-serif">
            {/* Main Links */}
            <div className="space-y-0.5">
              {!sidebarCollapsed && (
                <span className="text-[9px] uppercase tracking-widest text-[#D39858]/70 block px-4 mb-2">Academic</span>
              )}
              {[
                { id: 'home', label: 'Home Page', icon: Home },
                { id: 'quran', label: 'Qur\'an Reader', icon: BookOpen },
                { id: 'tafsir', label: 'Tafsir Study', icon: BookOpen }
              ].map(ele => {
                const Icon = ele.icon;
                const active = currentTab === ele.id;
                return (
                  <button
                    key={ele.id}
                    onClick={() => setCurrentTab(ele.id)}
                    className={`w-full h-11 flex items-center gap-3 px-4 rounded-xl transition-all text-xs font-bold text-left ${
                      active
                        ? 'bg-[#85431E]/80 text-[#EACEAA] border-l-4 border-[#D39858]'
                        : 'text-[#EACEAA]/65 hover:bg-[#34150F]/50 hover:text-[#EACEAA]'
                    }`}
                  >
                    <Icon className="h-4.5 w-4.5 shrink-0" />
                    {!sidebarCollapsed && <span>{ele.label}</span>}
                  </button>
                );
              })}
            </div>

            {/* Dawah Category */}
            <div className="space-y-0.5">
              {!sidebarCollapsed && (
                <span className="text-[9px] uppercase tracking-widest text-[#D39858]/70 block px-4 mb-2">Dawah Base</span>
              )}
              {[
                { id: 'dawah', label: 'Dawah Hub', icon: Compass },
                { id: 'refutations', label: 'Academic Defenses', icon: ShieldAlert },
                { id: 'newmuslim', label: 'New Muslim Hub', icon: Heart }
              ].map(ele => {
                const Icon = ele.icon;
                const active = currentTab === ele.id;
                return (
                  <button
                    key={ele.id}
                    onClick={() => setCurrentTab(ele.id)}
                    className={`w-full h-11 flex items-center gap-3 px-4 rounded-xl transition-all text-xs font-bold text-left ${
                      active
                        ? 'bg-[#85431E]/80 text-[#EACEAA] border-l-4 border-[#D39858]'
                        : 'text-[#EACEAA]/65 hover:bg-[#34150F]/50 hover:text-[#EACEAA]'
                    }`}
                  >
                    <Icon className="h-4.5 w-4.5 shrink-0" />
                    {!sidebarCollapsed && <span>{ele.label}</span>}
                  </button>
                );
              })}
            </div>

            {/* Knowledge category */}
            <div className="space-y-0.5">
              {!sidebarCollapsed && (
                <span className="text-[9px] uppercase tracking-widest text-[#D39858]/70 block px-4 mb-2">Knowledge</span>
              )}
              {[
                { id: 'hadiths', label: 'Hadith Library', icon: Award },
                { id: 'seerah', label: 'Prophetic Seerah', icon: Compass },
                { id: 'glossary', label: 'Islamic Glossary', icon: FileText },
                { id: 'knowledge', label: 'Knowledge Hub', icon: GraduationCap }
              ].map(ele => {
                const Icon = ele.icon;
                const active = currentTab === ele.id;
                return (
                  <button
                    key={ele.id}
                    onClick={() => setCurrentTab(ele.id)}
                    className={`w-full h-11 flex items-center gap-3 px-4 rounded-xl transition-all text-xs font-bold text-left ${
                      active
                        ? 'bg-[#85431E]/80 text-[#EACEAA] border-l-4 border-[#D39858]'
                        : 'text-[#EACEAA]/65 hover:bg-[#34150F]/50 hover:text-[#EACEAA]'
                    }`}
                  >
                    <Icon className="h-4.5 w-4.5 shrink-0" />
                    {!sidebarCollapsed && <span>{ele.label}</span>}
                  </button>
                );
              })}
            </div>

            {/* Utilities and Systems */}
            <div className="space-y-0.5">
              {!sidebarCollapsed && (
                <span className="text-[9px] uppercase tracking-widest text-[#D39858]/70 block px-4 mb-2">Systems & More</span>
              )}
              {[
                { id: 'prayer', label: 'Prayer Clocks', icon: Clock },
                { id: 'children', label: 'Children\'s Corner', icon: Star },
                { id: 'study', label: 'My Study Tracker', icon: BookMarked },
                { id: 'about', label: 'Chronicle About', icon: Info },
                { id: 'contact', label: 'Contact Us', icon: Mail },
                { id: 'settings', label: 'Preferences', icon: SettingsIcon }
              ].map(ele => {
                const Icon = ele.icon;
                const active = currentTab === ele.id;
                return (
                  <button
                    key={ele.id}
                    onClick={() => setCurrentTab(ele.id)}
                    className={`w-full h-11 flex items-center gap-3 px-4 rounded-xl transition-all text-xs font-bold text-left ${
                      active
                        ? 'bg-[#85431E]/80 text-[#EACEAA] border-l-4 border-[#D39858]'
                        : 'text-[#EACEAA]/65 hover:bg-[#34150F]/50 hover:text-[#EACEAA]'
                    }`}
                  >
                    <Icon className="h-4.5 w-4.5 shrink-0" />
                    {!sidebarCollapsed && <span>{ele.label}</span>}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sidebar footer segment */}
          {!sidebarCollapsed && (
            <div className="p-4 bg-[#34150F]/20 border-t border-[#85431E]/20 text-center shrink-0">
              <span className="text-[10px] text-[#D39858] font-mono leading-none">Version 1.2.4</span>
            </div>
          )}
        </aside>

        {/* Right pane segment header toolbar + scroll view */}
        <section className="flex-1 flex flex-col h-full overflow-hidden">
          {/* Top toolbar */}
          <div className="h-16 bg-[#34150F] border-b border-[#85431E]/40 flex items-center justify-between px-8 z-10 shrink-0">
            <div>
              <h1 className="text-sm font-serif font-bold text-[#EACEAA]">{getSectionLabel()}</h1>
              <div className="text-[10px] text-[#D39858]/70 font-mono mt-0.5 uppercase tracking-wider">{getBreadcrumbs()}</div>
            </div>
            {/* Toolbar Right tools */}
            <div className="flex items-center gap-4">
              <div className="flex items-center bg-[#150C0C] px-3 py-1.5 rounded-full border border-[#D39858]/20" title="Streak counter">
                <Flame className="h-4 w-4 text-[#85431E] fill-[#85431E] mr-1.5 animate-pulse" />
                <span className="text-xs font-semibold text-[#D39858] font-mono">{streak} d</span>
              </div>
              <button
                onClick={() => setCurrentTab('settings')}
                className="p-2 rounded-full text-[#D39858] hover:text-[#EACEAA] hover:bg-[#150C0C]/50 transition-colors"
                title="Launch Application Settings"
              >
                <SettingsIcon className="h-4.5 w-4.5" />
              </button>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-grow overflow-y-auto bg-[#34150F]/3 focus:outline-none scroll-smooth">
            <div className="max-w-[1100px] mx-auto w-full px-6 py-8">
              {renderTabContent()}
            </div>
          </div>
        </section>
      </div>

      {/* MOBILE SCREEN SYSTEM HOOD (Fixed structural top/bottom nav bar frames) */}
      <div className="block lg:hidden min-h-screen flex flex-col">
        {/* Mobile Fixed Top Header Bar */}
        <header className="h-12 bg-[#34150F] border-b border-[#85431E]/30 flex items-center justify-between px-4 fixed top-0 left-0 right-0 z-30 shrink-0">
          <div className="w-10">
            {currentTab !== 'home' ? (
              <button
                onClick={() => {
                  setCurrentTab('home');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="p-1 px-1.5 text-[#D39858] hover:text-[#EACEAA]"
                title="Back to home"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
            ) : (
              <span className="text-base">✨</span>
            )}
          </div>
          
          <span className="font-arabic text-lg font-bold text-[#EACEAA] text-center tracking-wide pr-1">المبشرين</span>
          
          <div className="w-10 flex justify-end">
            <button
              onClick={() => setCurrentTab('settings')}
              className="p-1 px-1.5 text-[#D39858] hover:text-[#EACEAA]"
              title="Settings"
            >
              <SettingsIcon className="h-5 w-5" />
            </button>
          </div>
        </header>

        {/* Scrollable container view */}
        <main className="flex-1 pt-12 pb-16 overflow-y-auto" id="mobile_scroll_content">
          {renderTabContent()}
        </main>

        {/* Mobile Fixed Bottom Navigation bar */}
        <nav className="h-16 bg-[#34150F] border-t border-[#85431E]/30 fixed bottom-0 left-0 right-0 z-30 px-3 shadow-2xl flex items-center justify-around text-[#D39858] pb-[env(safe-area-inset-bottom)] shrink-0">
          {[
            { id: 'home', label: 'Home', icon: Home },
            { id: 'quran', label: 'Qur\'an', icon: BookOpen },
            { id: 'dawah', label: 'Dawah', icon: Compass },
            { id: 'knowledge', label: 'Learn', icon: GraduationCap },
            { id: 'more', label: 'More', icon: LayoutGrid }
          ].map((tab) => {
            const Icon = tab.icon;
            // Family categorization triggers
            const isActive = tab.id === 'more' 
              ? moreBottomSheetOpen 
              : (tab.id === 'quran' ? (currentTab === 'quran' || currentTab === 'tafsir') : (tab.id === 'dawah' ? (currentTab === 'dawah' || currentTab === 'refutations' || currentTab === 'newmuslim') : (tab.id === 'knowledge' ? (currentTab === 'knowledge' || currentTab === 'hadiths' || currentTab === 'seerah' || currentTab === 'glossary') : (currentTab === tab.id))));

            return (
              <button
                key={tab.id}
                onClick={() => {
                  if (tab.id === 'more') {
                    setMoreBottomSheetOpen(true);
                  } else {
                    setCurrentTab(tab.id);
                    setMoreBottomSheetOpen(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
                className={`flex-grow h-full flex flex-col items-center justify-center relative transition-colors ${
                  isActive ? 'text-[#D39858]' : 'text-[#EACEAA]/50'
                }`}
              >
                {isActive && (
                  <div className="absolute top-0 inset-x-5 h-0.5 bg-[#D39858]" />
                )}
                <Icon className="h-4.5 w-4.5 shrink-0" />
                <span className="text-[10px] font-mono font-medium tracking-tight mt-1">{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* MOBILE MORE DRAWER SHEET POPUP */}
      <AnimatePresence>
        {moreBottomSheetOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setMoreBottomSheetOpen(false)}
              className="absolute inset-0 bg-[#000]"
            />
            {/* Sliding sheet */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="absolute bottom-0 inset-x-0 h-[80vh] bg-[#34150F] rounded-t-2xl border-t border-[#D39858] p-6 shadow-2xl flex flex-col"
            >
              <span className="block w-12 h-1 bg-[#D39858]/35 mx-auto rounded-full mb-4 shrink-0" />
              <div className="flex items-center justify-between mb-4 shrink-0 border-b border-[#D39858]/15 pb-2">
                <h3 className="font-serif font-bold text-lg text-[#EACEAA]">Sacred Library & Portals</h3>
                <button onClick={() => setMoreBottomSheetOpen(false)} className="text-xs font-mono text-[#D39858] hover:text-[#EACEAA]">
                  Dismiss
                </button>
              </div>

              {/* Scrollable links list */}
              <div className="flex-grow overflow-y-auto space-y-2 pr-1 pb-6">
                {[
                  { id: 'quran', title: 'Qur\'an Study', desc: 'Read text and access commentary', icon: BookOpen },
                  { id: 'hadiths', title: 'Hadith Library', desc: 'Explore authentic sayings & sources', icon: Award },
                  { id: 'prayer', title: 'Prayer Times', desc: 'Adhan clocks and Qibla alignments', icon: Clock },
                  { id: 'seerah', title: 'Prophetic Seerah', desc: 'Chronological timeline of the Prophet ﷺ', icon: Compass },
                  { id: 'glossary', title: 'Islamic Glossary', desc: 'Explanatory list of Arabic terms', icon: FileText },
                  { id: 'refutations', title: 'Academic Defenses', desc: 'Answering doubts & misconceptions', icon: ShieldAlert },
                  { id: 'newmuslim', title: 'New Muslim Hub', desc: 'Step-by-step guidance curriculum', icon: Heart },
                  { id: 'children', title: 'Children\'s Corner', desc: 'Character stars and Prophets stories', icon: Star },
                  { id: 'knowledge', title: 'Knowledge Base', desc: 'Scholarly essays and treatises', icon: GraduationCap },
                  { id: 'study', title: 'Study Tracker', desc: 'Your cached bookmarks and streaks', icon: BookMarked },
                  { id: 'about', title: 'About Us', desc: 'App credentials & credits', icon: Info },
                  { id: 'contact', title: 'Contact Us', desc: 'Consultation & mentorship queries', icon: Mail },
                  { id: 'settings', title: 'App Settings', desc: 'Font sizes and display toggles', icon: SettingsIcon },
                ].map((itm) => {
                  const Icon = itm.icon;
                  const active = currentTab === itm.id;
                  return (
                    <button
                      key={itm.id}
                      onClick={() => {
                        setCurrentTab(itm.id);
                        setMoreBottomSheetOpen(false);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className={`w-full flex items-center gap-4 p-3 rounded-xl border text-left transition-colors ${
                        active
                          ? 'bg-[#85431E] border-[#D39858] text-[#EACEAA]'
                          : 'bg-[#1E0F0D] border-[#D39858]/10 text-[#EACEAA]/80'
                      }`}
                    >
                      <div className="w-9 h-9 rounded-full bg-[#150C0C]/50 text-[#D39858] flex items-center justify-center shrink-0 border border-[#D39858]/10">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <span className="block text-xs font-serif font-bold">{itm.title}</span>
                        <span className="block text-[10px] text-stone-400 font-sans mt-0.5 leading-normal">{itm.desc}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* TOAST SYSTEM BOARD */}
      {toast && (
        <div 
          className="fixed top-16 right-6 z-50 max-w-sm w-[90%] sm:w-80 bg-[#34150F] border-l-4 border-[#85431E] p-4 rounded-r-lg shadow-2xl flex items-start space-x-3 text-[#EACEAA] animate-fade-in-up transition-all-custom"
          id="toast_notice_bar"
        >
          <div className="flex-1">
            <span className="text-[9px] font-mono tracking-widest text-[#D39858] uppercase block mb-1">Circular Board Update</span>
            <span className="text-xs font-sans tracking-wide leading-relaxed block">{toast.message}</span>
          </div>
          <button 
            onClick={() => setToast(null)} 
            className="text-[#D39858] hover:text-[#EACEAA] p-1 transition-colors shrink-0"
            title="Dismiss notification"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

    </div>
  );
}
