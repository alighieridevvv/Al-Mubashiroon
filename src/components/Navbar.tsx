import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, Compass, Info, Mail, Menu, X, Settings, Flame, 
  FileText, User, Eye, ChevronDown, Clock, ShieldAlert, Award 
} from 'lucide-react';
import BearerLogo from './BearerLogo';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  highContrast: boolean;
  setHighContrast: (val: boolean) => void;
  fontSize: 'small' | 'medium' | 'large' | 'xl';
  setFontSize: (size: 'small' | 'medium' | 'large' | 'xl') => void;
  streak: number;
}

export default function Navbar({
  currentTab,
  setCurrentTab,
  highContrast,
  setHighContrast,
  fontSize,
  setFontSize,
  streak
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = () => {
      setToolsDropdownOpen(false);
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home', icon: BookOpen },
    { id: 'quran', label: "Qur'an", icon: BookOpen },
    { id: 'dawah', label: 'Dawah Hub', icon: Compass },
    { id: 'knowledge', label: 'Knowledge Hub', icon: FileText },
    { id: 'study', label: 'Study Group', icon: User },
    { id: 'about', label: 'About Us', icon: Info },
    { id: 'contact', label: 'Contact', icon: Mail }
  ];

  const toolLinks = [
    { id: 'prayer', label: 'Prayer Times', desc: 'Precalculated schedule & Qibla finder', icon: Clock },
    { id: 'seerah', label: 'Seerah Timeline', desc: 'Chronology of Prophet Muhammad\'s ﷺ life', icon: Award },
    { id: 'glossary', label: 'Islamic Glossary', desc: 'Academic lexicon of sacred terms', icon: FileText },
    { id: 'refutations', label: 'Response Hub', desc: 'Academic clarifications & proofs', icon: ShieldAlert }
  ];

  const handleNavClick = (tabId: string) => {
    setCurrentTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#34150F] text-[#EACEAA] border-b border-[#D39858]/30 shadow-lg" id="main_navbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => handleNavClick('home')}
            id="brand_logo"
          >
            <div className="p-0.5 rounded-full border border-[#D39858]/45 bg-[#150C0C]/50 group-hover:bg-[#85431E]/40 transition-colors">
              <BearerLogo size={42} />
            </div>
            <div>
              <h1 className="font-serif text-sm sm:text-base font-bold tracking-wide text-[#EACEAA] flex items-center gap-1.5">
                <span className="font-arabic text-base select-all text-glow">المبشرين</span>
                <span className="text-xs text-stone-300 font-sans font-normal border-l border-[#D39858]/30 pl-1.5 hidden sm:inline">The Bearers of Good News</span>
              </h1>
              <p className="text-[9px] text-[#D39858] tracking-widest font-mono">
                SACRED DAWAH & STUDY GROUP
              </p>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex space-x-1" id="desktop_nav_links">
            {navLinks.map((link) => {
              const isActive = currentTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  id={`nav_link_${link.id}`}
                  className={`flex items-center space-x-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive 
                      ? 'bg-[#85431E] text-[#EACEAA] border border-[#D39858]/60' 
                      : 'text-[#D39858] hover:text-[#EACEAA] hover:bg-[#34150F]/75'
                  }`}
                >
                  <span>{link.label}</span>
                </button>
              );
            })}

            {/* Sacred Tools relative Dropdown */}
            <div className="relative">
              <button
                onClick={(e) => { e.stopPropagation(); setToolsDropdownOpen(!toolsDropdownOpen); }}
                className={`flex items-center space-x-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  ['prayer', 'seerah', 'glossary', 'refutations'].includes(currentTab)
                    ? 'bg-[#85431E] text-[#EACEAA] border border-[#D39858]/60'
                    : 'text-[#D39858] hover:text-[#EACEAA] hover:bg-[#34150F]/75'
                }`}
                id="nav_tools_dropdown_trigger"
              >
                <span>Sacred Tools</span>
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${toolsDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {toolsDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-72 rounded-lg bg-[#34150F] border border-[#D39858] p-3 shadow-xl z-50 text-left"
                    id="nav_tools_dropdown_menu"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-mono tracking-widest text-[#D39858] border-b border-[#D39858]/35 pb-1.5 mb-2 block">Interactive Apps</span>
                      {toolLinks.map((item) => {
                        const Icon = item.icon;
                        const isSubActive = currentTab === item.id;
                        return (
                          <button
                            key={item.id}
                            onClick={() => {
                              handleNavClick(item.id);
                              setToolsDropdownOpen(false);
                            }}
                            className={`w-full flex items-start gap-3 p-2.5 rounded-md text-left transition-colors ${
                              isSubActive
                                ? 'bg-[#85431E] text-[#EACEAA]'
                                : 'text-[#D39858] hover:text-[#EACEAA] hover:bg-[#150C0C]/50'
                            }`}
                          >
                            <Icon className="h-4 w-4 shrink-0 mt-0.5" />
                            <div>
                              <span className="block text-xs font-serif font-bold">{item.label}</span>
                              <span className="block text-[10px] text-stone-300 font-sans font-normal leading-normal mt-0.5">{item.desc}</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Desktop Right Settings & Streak */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Streak Counter */}
            <div className="flex items-center bg-[#150C0C] px-3 py-1.5 rounded-full border border-[#D39858]/20" title="Daily Reading Streak">
              <Flame className="h-4 w-4 text-[#85431E] fill-[#85431E] mr-1.5 animate-pulse" />
              <span className="text-xs font-semibold text-[#D39858]">{streak} Days</span>
            </div>

            {/* Quick Settings Button */}
            <div className="relative">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="p-2 rounded-full text-[#D39858] hover:text-[#EACEAA] hover:bg-[#150C0C]/50 transition-colors"
                id="toggle_settings_desktop"
                title="Settings"
              >
                <Settings className="h-5 w-5" />
              </button>

              <AnimatePresence>
                {showSettings && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-64 rounded-lg bg-[#34150F] border border-[#D39858] p-4 shadow-xl"
                    id="settings_dropdown"
                  >
                    <h3 className="font-serif text-sm font-semibold border-b border-[#D39858]/30 pb-2 mb-3">
                      Display Settings
                    </h3>
                    
                    {/* High Contrast */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs text-[#D39858] font-medium flex items-center">
                        <Eye className="h-3.5 w-3.5 mr-1.5" /> High Contrast
                      </span>
                      <button
                        onClick={() => setHighContrast(!highContrast)}
                        className={`relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                          highContrast ? 'bg-[#85431E]' : 'bg-[#150C0C]'
                        }`}
                      >
                        <span
                          className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-[#EACEAA] shadow ring-0 transition duration-200 ease-in-out ${
                            highContrast ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>

                    {/* Font Size */}
                    <div>
                      <span className="text-xs text-[#D39858] font-medium block mb-2">
                        Text Size (Global)
                      </span>
                      <div className="grid grid-cols-4 gap-1 bg-[#150C0C] p-1 rounded-md border border-[#D39858]/20">
                        {(['small', 'medium', 'large', 'xl'] as const).map((sz) => (
                          <button
                            key={sz}
                            onClick={() => setFontSize(sz)}
                            className={`px-1 py-1 text-[10px] font-semibold rounded uppercase ${
                              fontSize === sz 
                                ? 'bg-[#85431E] text-[#EACEAA]' 
                                : 'text-[#D39858] hover:text-[#EACEAA]'
                            }`}
                          >
                            {sz.slice(0, 3)}
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile hamburger menu & settings button */}
          <div className="flex lg:hidden items-center space-x-2">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 rounded-full text-[#D39858] hover:text-[#EACEAA] transition-colors"
              title="Settings"
            >
              <Settings className="h-5 w-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-[#D39858] hover:text-[#EACEAA] focus:outline-none"
              id="mobile_hamburger"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Settings panel overlay */}
      <AnimatePresence>
        {showSettings && !mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden border-t border-[#D39858]/20 bg-[#150C0C] p-4 text-[#EACEAA]"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-serif">High Contrast Mode</span>
              <button
                onClick={() => setHighContrast(!highContrast)}
                className={`w-12 h-6 rounded-full transition-colors ${highContrast ? 'bg-[#85431E]' : 'bg-[#34150F]'}`}
              >
                <div className={`w-4 h-4 bg-[#EACEAA] rounded-full transition-transform ${highContrast ? 'translate-x-7' : 'translate-x-1'}`} />
              </button>
            </div>
            <div>
              <span className="text-sm font-serif block mb-2">Interface Font Size</span>
              <div className="grid grid-cols-4 gap-2 bg-[#34150F] p-1 rounded-md">
                {(['small', 'medium', 'large', 'xl'] as const).map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setFontSize(sz)}
                    className={`py-1.5 text-xs text-center font-bold rounded capitalize ${fontSize === sz ? 'bg-[#85431E]' : 'text-[#D39858]'}`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.25 }}
            className="fixed inset-0 z-30 bg-[#150C0C]/95 backdrop-blur-sm lg:hidden flex flex-col pt-16"
            id="mobile_drawer"
          >
            <div className="flex-1 px-4 py-8 space-y-3 overflow-y-auto">
              <div className="flex items-center justify-between border-b border-[#D39858]/30 pb-4 mb-4">
                <span className="font-serif text-lg font-bold">Menu Navigation</span>
                <div className="flex items-center bg-[#34150F] px-2.5 py-1 rounded-full border border-[#D39858]/30">
                  <Flame className="h-3.5 w-3.5 text-[#85431E] fill-[#85431E] mr-1 animate-pulse" />
                  <span className="text-xs font-mono">{streak} Streak Days</span>
                </div>
              </div>
              
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = currentTab === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left text-base font-medium transition-all ${
                      isActive 
                        ? 'bg-[#85431E] text-[#EACEAA] border-l-4 border-[#D39858]' 
                        : 'text-[#D39858] hover:text-[#EACEAA] hover:bg-[#34150F]/45'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{link.label}</span>
                  </button>
                );
              })}

              {/* Sacred Tools segment inside Mobile Drawer */}
              <div className="pt-4 border-t border-[#D39858]/20 mt-4">
                <span className="text-[10px] font-mono font-bold tracking-widest text-[#D39858] uppercase px-4 block mb-2">Sacred Tools & Libraries</span>
                <div className="space-y-1">
                  {toolLinks.map((link) => {
                    const Icon = link.icon;
                    const isActive = currentTab === link.id;
                    return (
                      <button
                        key={link.id}
                        onClick={() => handleNavClick(link.id)}
                        className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg text-left transition-all ${
                          isActive 
                            ? 'bg-[#85431E] text-[#EACEAA] border-l-4 border-[#D39858]' 
                            : 'text-[#D39858] hover:text-[#EACEAA] hover:bg-[#34150F]/45'
                        }`}
                      >
                        <Icon className="h-4 w-4 shrink-0" />
                        <div>
                          <span className="block font-serif font-bold text-xs">{link.label}</span>
                          <span className="block text-[10px] text-stone-400 font-sans leading-none mt-0.5">{link.desc}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="p-4 bg-[#34150F] border-t border-[#D39858]/20 text-center">
              <p className="text-[11px] text-[#D39858]/80 font-mono">
                "Seeking knowledge is a duty upon every Muslim."
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
