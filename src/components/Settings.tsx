import { useState } from 'react';
import { 
  Settings as SettingsIcon, Layout, BookOpen, Clock, Bell, Database, 
  Trash2, Download, Check, ArrowLeft 
} from 'lucide-react';

interface SettingsProps {
  fontSize: 'small' | 'medium' | 'large' | 'xl';
  setFontSize: (size: 'small' | 'medium' | 'large' | 'xl') => void;
  highContrast: boolean;
  setHighContrast: (contrast: boolean) => void;
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  onClearBookmarks?: () => void;
}

export default function Settings({
  fontSize,
  setFontSize,
  highContrast,
  setHighContrast,
  setCurrentTab,
  onClearBookmarks
}: SettingsProps) {
  // Quran reader preferences
  const [reciter, setReciter] = useState(() => localStorage.getItem('quran_reciter') || 'Alafasy');
  const [translation, setTranslation] = useState(() => localStorage.getItem('quran_translation') || 'Sahih');
  const [displayMode, setDisplayMode] = useState(() => localStorage.getItem('quran_display_mode') || 'all');

  // Prayer times preferences
  const [calcMethod, setCalcMethod] = useState(() => parseInt(localStorage.getItem('prayer_calc_method') || '4', 10));
  const [madhab, setMadhab] = useState(() => localStorage.getItem('prayer_madhab') || 'Hanafi');

  // Notifications
  const [adhanReminders, setAdhanReminders] = useState(() => localStorage.getItem('reminders_adhan') !== 'false');

  const [purgedMessage, setPurgedMessage] = useState<string | null>(null);

  const handleSaveQuranPref = (key: string, val: string) => {
    localStorage.setItem(key, val);
    if (key === 'quran_reciter') setReciter(val);
    if (key === 'quran_translation') setTranslation(val);
    if (key === 'quran_display_mode') setDisplayMode(val);
  };

  const handleSavePrayerPref = (key: string, val: string | number) => {
    localStorage.setItem(key, val.toString());
    if (key === 'prayer_calc_method') setCalcMethod(Number(val));
    if (key === 'prayer_madhab') setMadhab(val as string);
  };

  const handleSaveNotifPref = (key: string, val: boolean) => {
    localStorage.setItem(key, val.toString());
    if (key === 'reminders_adhan') setAdhanReminders(val);
  };

  const clearUserData = (type: 'bookmarks' | 'history' | 'all') => {
    if (type === 'bookmarks' || type === 'all') {
      localStorage.removeItem('study_bookmarks');
      if (onClearBookmarks) onClearBookmarks();
    }
    if (type === 'history' || type === 'all') {
      localStorage.removeItem('recent_hadiths_viewed');
      localStorage.removeItem('newmuslim_completed');
      localStorage.removeItem('last_read_surah_num');
      localStorage.removeItem('last_read_ayah_num');
    }
    setPurgedMessage(`Purged all selected user data successfully.`);
    setTimeout(() => setPurgedMessage(null), 3000);
  };

  const exportData = () => {
    const backup: Record<string, string | null> = {};
    const keys = ['study_bookmarks', 'completed_study_topics', 'recent_hadiths_viewed', 'newmuslim_completed', 'last_read_surah_num', 'last_read_ayah_num'];
    keys.forEach(k => {
      backup[k] = localStorage.getItem(k);
    });

    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Almubashshireen_backup_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 arabesque-pattern" id="settings_screen_root">
      
      {/* Header and Back navigation button for Mobile Context */}
      <div className="flex items-center gap-3 mb-8 border-b border-[#D39858]/15 pb-4">
        <button
          onClick={() => setCurrentTab('home')}
          className="lg:hidden p-2 rounded-lg bg-[#34150F] text-[#D39858] hover:text-[#EACEAA] transition-colors"
          title="Back to home"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <span className="text-xs font-mono text-[#D39858] tracking-widest uppercase">Preferences Control</span>
          <h2 className="font-serif text-3xl font-bold text-[#EACEAA] mt-1 flex items-center gap-2">
            <SettingsIcon className="h-7 w-7 text-[#D39858] animate-[spin_8s_linear_infinite]" />
            Application Settings
          </h2>
        </div>
      </div>

      {purgedMessage && (
        <div className="mb-6 p-4 bg-emerald-950/30 border border-emerald-500/20 rounded-xl text-emerald-400 text-xs font-sans flex items-center gap-2">
          <Check className="h-4 w-4" />
          <span>{purgedMessage}</span>
        </div>
      )}

      {/* Two-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        {/* Left Column: Visual, Qur'an, and Prayer configurations */}
        <div className="space-y-6">
          
          {/* Display & Sizing settings */}
          <div className="bg-[#1E0F0D] border border-[#D39858]/30 rounded-xl p-6 space-y-4">
            <h3 className="font-serif font-bold text-base text-[#EACEAA] border-b border-[#D39858]/15 pb-2 flex items-center gap-2">
              <Layout className="h-4.5 w-4.5 text-[#D39858]" />
              Display & Sizing
            </h3>

            {/* High Contrast */}
            <div className="flex items-center justify-between">
              <div>
                <span className="block text-xs font-bold text-[#EACEAA]">Contrast Enhancement</span>
                <span className="block text-[10px] text-stone-400 font-sans leading-none mt-1">Improves visibility under harsh lighting conditions.</span>
              </div>
              <button
                onClick={() => setHighContrast(!highContrast)}
                className={`relative inline-flex h-5.5 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  highContrast ? 'bg-[#85431E]' : 'bg-[#150C0C]'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-4.5 w-4.5 transform rounded-full bg-[#EACEAA] shadow ring-0 transition duration-200 ease-in-out ${
                    highContrast ? 'translate-x-5.5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Font sizing scale */}
            <div className="space-y-2 pt-2">
              <span className="block text-xs font-bold text-[#EACEAA]">Global Text Scaling</span>
              <div className="grid grid-cols-4 gap-2 bg-[#34150F] p-1 rounded-xl border border-[#D39858]/20">
                {(['small', 'medium', 'large', 'xl'] as const).map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setFontSize(sz)}
                    className={`py-2 text-[10px] font-semibold rounded-lg uppercase transition-all ${
                      fontSize === sz 
                        ? 'bg-[#85431E] text-[#EACEAA] border border-[#D39858]/30 font-bold' 
                        : 'text-[#D39858] hover:text-[#EACEAA]/80'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Qur'an preferences */}
          <div className="bg-[#1E0F0D] border border-[#D39858]/30 rounded-xl p-6 space-y-4">
            <h3 className="font-serif font-bold text-base text-[#EACEAA] border-b border-[#D39858]/15 pb-2 flex items-center gap-2">
              <BookOpen className="h-4.5 w-4.5 text-[#D39858]" />
              Qur'an Study Preferences
            </h3>

            {/* Reciter Selector */}
            <div className="space-y-1.5">
              <span className="block text-xs font-bold text-[#EACEAA]">Default Audiobook Reciter</span>
              <select
                value={reciter}
                onChange={(e) => handleSaveQuranPref('quran_reciter', e.target.value)}
                className="w-full bg-[#34150F] text-[#EACEAA] border border-[#D39858]/30 rounded-xl px-3 py-2 text-xs"
              >
                <option value="Alafasy">Mshary Rashed Alafasy</option>
                <option value="Husary">Mahmoud Khalil Al-Husary</option>
                <option value="Menshawi">Muhammad Siddiq Al-Minshawi</option>
                <option value="AbdulBasit">Abdul Basit Abdus Samad</option>
              </select>
            </div>

            {/* Translation Source */}
            <div className="space-y-1.5">
              <span className="block text-xs font-bold text-[#EACEAA]">Primary Translation Commentary</span>
              <select
                value={translation}
                onChange={(e) => handleSaveQuranPref('quran_translation', e.target.value)}
                className="w-full bg-[#34150F] text-[#EACEAA] border border-[#D39858]/30 rounded-xl px-3 py-2 text-xs"
              >
                <option value="Sahih">Sahih International (Academic Standard)</option>
                <option value="Pickthall">Marmaduke Pickthall</option>
                <option value="YusufAli">Abdullah Yusuf Ali</option>
              </select>
            </div>

            {/* Display preferences */}
            <div className="space-y-1.5">
              <span className="block text-xs font-bold text-[#EACEAA]">Default Reader Screen Layout</span>
              <select
                value={displayMode}
                onChange={(e) => handleSaveQuranPref('quran_display_mode', e.target.value)}
                className="w-full bg-[#34150F] text-[#EACEAA] border border-[#D39858]/30 rounded-xl px-3 py-2 text-xs"
              >
                <option value="all">Display All (Arabic, translations & transliterated)</option>
                <option value="arabicOnly">Arabic text only (Classical Mushaf view)</option>
                <option value="translationOnly">Translation commentaries only</option>
              </select>
            </div>
          </div>
        </div>

        {/* Right Column: Prayer Times, Notifications & Data Utilities */}
        <div className="space-y-6">
          
          {/* Prayer Calculation methods */}
          <div className="bg-[#1E0F0D] border border-[#D39858]/30 rounded-xl p-6 space-y-4">
            <h3 className="font-serif font-bold text-base text-[#EACEAA] border-b border-[#D39858]/15 pb-2 flex items-center gap-2">
              <Clock className="h-4.5 w-4.5 text-[#D39858]" />
              Prayer Calculations & Liturgy
            </h3>

            {/* Calculation Method */}
            <div className="space-y-1.5">
              <span className="block text-xs font-bold text-[#EACEAA]">Calculation Standard</span>
              <select
                value={calcMethod}
                onChange={(e) => handleSavePrayerPref('prayer_calc_method', Number(e.target.value))}
                className="w-full bg-[#34150F] text-[#EACEAA] border border-[#D39858]/30 rounded-xl px-3 py-2 text-xs"
              >
                <option value={4}>Umm Al-Qura University, Makkah</option>
                <option value={2}>Islamic Society of North America (ISNA)</option>
                <option value={3}>Muslim World League (MWL)</option>
                <option value={5}>Egyptian General Authority of Survey</option>
                <option value={1}>University of Islamic Sciences, Karachi</option>
              </select>
            </div>

            {/* Madhab for Asr */}
            <div className="space-y-1.5">
              <span className="block text-xs font-bold text-[#EACEAA]">Asr Jurisprudential Custom (Madhab)</span>
              <select
                value={madhab}
                onChange={(e) => handleSavePrayerPref('prayer_madhab', e.target.value)}
                className="w-full bg-[#34150F] text-[#EACEAA] border border-[#D39858]/30 rounded-xl px-3 py-2 text-xs"
              >
                <option value="Standard">Standard / Shafi'i / Maliki / Hanbali (Earlier Asr)</option>
                <option value="Hanafi">Hanafi School (Later Asr time slot)</option>
              </select>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-[#1E0F0D] border border-[#D39858]/30 rounded-xl p-6 space-y-4">
            <h3 className="font-serif font-bold text-base text-[#EACEAA] border-b border-[#D39858]/15 pb-2 flex items-center gap-2">
              <Bell className="h-4.5 w-4.5 text-[#D39858]" />
              Reminders & Toggles
            </h3>

            {/* Adhan Reminders */}
            <div className="flex items-center justify-between">
              <div>
                <span className="block text-xs font-bold text-[#EACEAA]">Adhan Audio Notifications</span>
                <span className="block text-[10px] text-stone-400 font-sans leading-none mt-1">Triggers Abdul Basit Adhan track on prayer entrance times.</span>
              </div>
              <button
                onClick={() => handleSaveNotifPref('reminders_adhan', !adhanReminders)}
                className={`relative inline-flex h-5.5 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  adhanReminders ? 'bg-[#85431E]' : 'bg-[#150C0C]'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-4.5 w-4.5 transform rounded-full bg-[#EACEAA] shadow ring-0 transition duration-200 ease-in-out ${
                    adhanReminders ? 'translate-x-5.5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Data controls: purges/backup */}
          <div className="bg-[#1E0F0D] border border-[#D39858]/30 rounded-xl p-6 space-y-4">
            <h3 className="font-serif font-bold text-base text-[#EACEAA] border-b border-[#D39858]/15 pb-2 flex items-center gap-2">
              <Database className="h-4.5 w-4.5 text-[#D39858]" />
              Local Cache & Data Utilities
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <button
                onClick={exportData}
                className="bg-[#34150F] border border-[#D39858]/35 hover:bg-[#85431E]/20 text-[#D39858] font-sans font-bold px-4 py-2.5 rounded-xl text-xs flex items-center justify-center gap-2"
              >
                <Download className="h-4 w-4" />
                <span>Export Active Backups</span>
              </button>
              
              <button
                onClick={() => {
                  if (confirm("Are you sure you want to delete all historical search logs and reading bookmarks irreversibly?")) {
                    clearUserData('all');
                  }
                }}
                className="bg-rose-950/20 border border-rose-900/40 hover:bg-rose-900/30 text-rose-300 font-sans font-bold px-4 py-2.5 rounded-xl text-xs flex items-center justify-center gap-2"
              >
                <Trash2 className="h-4 w-4 text-rose-400" />
                <span>Clear All Logs & Data</span>
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* About footer segment */}
      <div className="mt-8 bg-[#34150F] border border-[#D39858]/20 rounded-xl p-6 text-center space-y-2">
        <h4 className="font-serif font-bold text-[#D39858] text-sm">المبشرين — The Bearers of Good News</h4>
        <p className="text-xs text-stone-300 font-sans leading-relaxed max-w-xl mx-auto">
          Academic educational application compiled on classical sources under high-contrast aesthetic templates. Designed natively for both phone layouts and laptops.
        </p>
        <div className="text-[10px] text-stone-400 font-mono pt-2">
          App Version 1.2.4 (PWA Installed Check Enabled) • Made for seekers globally.
        </div>
      </div>

    </div>
  );
}
