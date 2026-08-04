import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Flame, MapPin, Video, Download, Play, Trophy, Sparkles, Pin,
  Camera, Trash2, CheckCircle2
} from 'lucide-react';
import { ALL_SURAHS } from '../data/quran-meta';
import { STUDY_SCHEDULE, GROUP_ANNOUNCEMENTS, STUDY_QUIZZES } from '../data/dawah-data';
import { Bookmark } from '../types';

interface StudyToolsProps {
  bookmarks: Bookmark[];
  completedTopics: string[];
  streak: number;
}

const AVATARS = [
  "📖", "🕌", "💡", "🛡️", "🤝", "🌱"
];

export default function StudyTools({ bookmarks, streak }: StudyToolsProps) {
  // Tabs within Study dashboard
  const [activeSubTab, setActiveSubTab] = useState<'profile' | 'schedule' | 'notes' | 'quiz'>('profile');

  // In-app elegant notifications
  const [studyToast, setStudyToast] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setStudyToast(msg);
    setTimeout(() => {
      setStudyToast(null);
    }, 3800);
  };

  // Profile status state loaded from localStorage
  const [profileName, setProfileName] = useState(() => {
    return localStorage.getItem('profile_name') || 'Seeker of Knowledge';
  });
  const [profileAvatar, setProfileAvatar] = useState(() => {
    return localStorage.getItem('profile_avatar') || '📖';
  });
  
  // Custom uploaded profile picture
  const [profilePic, setProfilePic] = useState<string | null>(() => {
    return localStorage.getItem('profile_picture_url') || null;
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  // 114 Surah completion checklist
  const [checkedSurahs, setCheckedSurahs] = useState<Record<number, boolean>>(() => {
    try {
      const saved = localStorage.getItem('completed_surahs');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // 30 Juz colored tiles grid status
  // status: 'not-started' | 'reading' | 'completed' -> maps to class bg colors
  const [juzLevels, setJuzLevels] = useState<Record<number, 'not-started' | 'reading' | 'completed'>>(() => {
    try {
      const saved = localStorage.getItem('completed_juz');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Group RSVP tracker
  const [scheduleRSVPs, setScheduleRSVPs] = useState<Record<string, 'yes' | 'not-sure'>>(() => {
    try {
      const saved = localStorage.getItem('group_rsvps');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Quiz active states
  const [activeQuizId, setActiveQuizId] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  // Save changes to localStorage helper
  useEffect(() => {
    localStorage.setItem('completed_surahs', JSON.stringify(checkedSurahs));
  }, [checkedSurahs]);

  useEffect(() => {
    localStorage.setItem('completed_juz', JSON.stringify(juzLevels));
  }, [juzLevels]);

  const toggleSurahCheck = (sNum: number) => {
    setCheckedSurahs(prev => ({ ...prev, [sNum]: !prev[sNum] }));
  };

  const cycleJuzLevel = (jNum: number) => {
    setJuzLevels(prev => {
      const current = prev[jNum] || 'not-started';
      let next: 'not-started' | 'reading' | 'completed' = 'not-started';
      if (current === 'not-started') next = 'reading';
      else if (current === 'reading') next = 'completed';
      return { ...prev, [jNum]: next };
    });
  };

  const handleRSVP = (schedId: string, status: 'yes' | 'not-sure') => {
    const updated = { ...scheduleRSVPs, [schedId]: status };
    setScheduleRSVPs(updated);
    localStorage.setItem('group_rsvps', JSON.stringify(updated));
    triggerToast("In-App RSVP registered successfully! Thank you for supporting the study group.");
  };

  // Picture upload helper
  const handlePictureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 1.5 * 1024 * 1024) {
        triggerToast("Selected picture is too large. Choose an image file under 1.5MB.");
        return;
      }
      const reader = new FileReader();
      reader.onload = (evt) => {
        const base64 = evt.target?.result as string;
        setProfilePic(base64);
        localStorage.setItem('profile_picture_url', base64);
        triggerToast("Profile picture uploaded successfully!");
      };
      reader.readAsDataURL(file);
    }
  };

  const removeProfilePicture = () => {
    setProfilePic(null);
    localStorage.removeItem('profile_picture_url');
    triggerToast("Profile picture removed. Reverting to emoji placeholder.");
  };

  // Profile editing
  const saveProfileChange = () => {
    localStorage.setItem('profile_name', profileName);
    localStorage.setItem('profile_avatar', profileAvatar);
    if (profilePic) {
      localStorage.setItem('profile_picture_url', profilePic);
    } else {
      localStorage.removeItem('profile_picture_url');
    }
    setIsEditingProfile(false);
    triggerToast("Study profile details updated successfully!");
  };

  // Export Notes compiled
  const triggerNotesExport = () => {
    const header = `=== HOLY QUR'AN STUDY NOTES & REFLECTIONS ===\nExported: ${new Date().toLocaleDateString()}\nCompiled by: ${profileName}\n\n`;
    const body = bookmarks.map((b, idx) => {
      return `${idx + 1}. Surah: ${b.surahName} (${b.surahNumber}:${b.ayahNumber})\nArabic: ${b.textArabic}\nTranslation: ${b.textEnglish}\nYour Personal Note: ${b.note || 'No notes added.'}\n---------------------\n`;
    }).join('\n');

    const fullBlob = new Blob([header + body], { type: 'text/plain;charset=utf-8' });
    const dummyUrl = URL.createObjectURL(fullBlob);
    const link = document.createElement('a');
    link.href = dummyUrl;
    link.setAttribute('download', `${profileName.toLowerCase().replace(/ /g, '_')}_quran_refl_notes.txt`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Quiz calculations
  const startQuiz = (quizId: string) => {
    setActiveQuizId(quizId);
    setCurrentQuestionIndex(0);
    setSelectedOptionIndex(null);
    setQuizScore(0);
    setQuizCompleted(false);
    setQuizStarted(true);
  };

  const handleAnswerSubmit = (optionIndex: number) => {
    setSelectedOptionIndex(optionIndex);
  };

  const proceedNextQuestion = (questionsLength: number, answerIndex: number) => {
    if (selectedOptionIndex === null) return;
    if (selectedOptionIndex === answerIndex) {
      setQuizScore((v) => v + 1);
    }

    if (currentQuestionIndex < questionsLength - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOptionIndex(null);
    } else {
      setQuizCompleted(true);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 arabesque-pattern" id="study_tools_workspace">
      
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#85431E]">INTERACTIVE COOPERATIVE SUITE</span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#34150F] mt-1 mb-3">Study Group Workspace</h1>
        <p className="text-sm text-[#150C0C]/80 leading-relaxed font-sans">
          Log reading checklists, monitor 30 Juz completion tiles, view weekly schedule RSVPs, review saved reflections, and test yourself on authentic Islamic challenges.
        </p>

        {/* Workspace navigation sub-tabs */}
        <div className="flex border-b border-[#D39858]/30 justify-center space-x-2 md:space-x-8 mt-6">
          {[
            { id: 'profile', label: 'My Progress' },
            { id: 'schedule', label: 'Group Schedule' },
            { id: 'notes', label: 'My Saved Notes' },
            { id: 'quiz', label: 'Knowledge Quizzes' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`py-2 px-3 sm:px-6 text-xs sm:text-sm font-serif font-bold border-b-2 transition-all ${
                activeSubTab === tab.id
                  ? 'border-[#85431E] text-[#85431E]'
                  : 'border-transparent text-[#34150F]/70 hover:text-[#34150F]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        
        {/* SUBTAB 1: MEMBER PROGRESS TRACKER (Profile and 30 Juz grids) */}
        {activeSubTab === 'profile' && (
          <motion.div
            key="profile_tab"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-8"
          >
            {/* Top row: Profile card & Pinned Announcement summary */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Profile Card */}
              <div className="lg:col-span-1 bg-[#EACEAA] rounded-2xl border-2 border-[#D39858] p-6 shadow-md space-y-4">
                <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-3 sm:space-y-0 sm:space-x-4">
                  
                  {/* Photo area with fallback to emoji badge */}
                  <div className="relative group shrink-0">
                    {profilePic ? (
                      <img 
                        src={profilePic} 
                        alt={profileName} 
                        className="w-16 h-16 rounded-full object-cover border-2 border-[#D39858] shadow-md bg-stone-800"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="bg-[#85431E] hover:scale-105 transition-transform w-16 h-16 rounded-full text-3xl border border-[#D39858]/40 shadow-inner select-none flex items-center justify-center">
                        {profileAvatar}
                      </div>
                    )}
                    
                    {/* Tiny camera edit badge floating above */}
                    <button 
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute -bottom-1 -right-1 bg-[#85431E] text-[#EACEAA] hover:bg-[#D39858] hover:text-[#150C0C] p-1.5 rounded-full border border-[#D39858] transition-colors shadow"
                      title="Upload photo"
                    >
                      <Camera className="h-3.5 w-3.5" />
                    </button>
                    
                    {/* Hidden file input */}
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={handlePictureUpload} 
                      accept="image/*" 
                      className="hidden" 
                    />
                  </div>

                  <div className="flex-1 text-center sm:text-left">
                    {isEditingProfile ? (
                      <div className="space-y-1.5 text-xs">
                        <label className="block text-[10px] text-[#34150F] font-bold font-mono">STUDENT NAME</label>
                        <input
                          type="text"
                          value={profileName}
                          onChange={(e) => setProfileName(e.target.value)}
                          className="w-full bg-white/60 border border-[#D39858] rounded px-2 py-1 outline-none font-bold text-[#150C0C]"
                        />
                        <label className="block text-[10px] text-[#34150F] font-bold font-mono pt-1">OR SELECT EMOTICON BADGE</label>
                        <div className="flex items-center justify-center sm:justify-start space-x-1.5 pb-1">
                          {AVATARS.map(av => (
                            <button
                              key={av}
                              onClick={() => {
                                setProfileAvatar(av);
                                setProfilePic(null); // revert to emoji
                                localStorage.removeItem('profile_picture_url');
                              }}
                              className={`p-1 bg-white border rounded text-sm hover:bg-gold ${
                                profileAvatar === av && !profilePic ? 'ring-1 ring-[#85431E]' : ''
                              }`}
                            >
                              {av}
                            </button>
                          ))}
                        </div>
                        <div className="flex items-center space-x-2 pt-1.5">
                          <button
                            onClick={saveProfileChange}
                            className="bg-[#85431E] text-[#EACEAA] hover:bg-[#34150F] font-serif font-bold text-[10px] px-3 py-1 rounded-md border border-[#D39858]/30 transition-all cursor-pointer"
                          >
                            Save Details
                          </button>
                          {profilePic && (
                            <button
                              onClick={removeProfilePicture}
                              className="text-stone-700 hover:text-stone-900 border border-transparent hover:border-stone-400 p-1 rounded transition-colors"
                              title="Delete profile picture"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div>
                        <h3 className="font-serif text-lg font-bold text-[#34150F]">{profileName}</h3>
                        <p className="text-[10px] text-[#D39858] font-mono uppercase font-bold">Circle Student Member</p>
                        <div className="flex items-center justify-center sm:justify-start space-x-2 mt-1">
                          <button
                            onClick={() => setIsEditingProfile(true)}
                            className="text-[10px] text-[#85431E] hover:text-[#D39858] underline font-bold"
                          >
                            Edit details
                          </button>
                          {profilePic && (
                            <span className="text-stone-400 text-[10px]">•</span>
                          )}
                          {profilePic && (
                            <button
                              onClick={removeProfilePicture}
                              className="text-[10px] text-[#85431E] hover:text-red-700 underline font-bold"
                            >
                              Clear photo
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="border-t border-[#D39858]/20 pt-4 grid grid-cols-2 gap-4 text-center">
                  <div className="bg-[#34150F] p-2.5 rounded-lg text-[#EACEAA] border border-[#D39858]/30">
                    <span className="text-[10px] font-mono text-[#D39858] uppercase block">Current Streak</span>
                    <span className="text-lg font-bold flex items-center justify-center">
                      <Flame className="h-4.5 w-4.5 text-[#85431E] fill-[#34150F] mr-1" /> {streak} Days
                    </span>
                  </div>
                  <div className="bg-[#34150F] p-2.5 rounded-lg text-[#EACEAA] border border-[#D39858]/30">
                    <span className="text-[10px] font-mono text-[#D39858] uppercase block">Saved Refl.</span>
                    <span className="text-lg font-bold">{bookmarks.length} Notes</span>
                  </div>
                </div>
              </div>

              {/* Group announcements board (Pinned cards at top) */}
              <div className="lg:col-span-2 bg-[#34150F] text-[#EACEAA] rounded-2xl border border-[#D39858]/55 p-6 shadow-md flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#EACEAA] border-b border-[#D39858]/20 pb-2 mb-4 flex items-center space-x-2">
                    <Pin className="h-4 w-4 text-[#D39858]" />
                    <span>Study Announcements Circular</span>
                  </h3>
                  <div className="space-y-4">
                    {GROUP_ANNOUNCEMENTS.map((ann) => (
                      <div key={ann.id} className="relative pl-6">
                        <span className="absolute left-0 top-1 text-xs">📌</span>
                        <h4 className="font-serif text-base font-bold text-[#D39858]">
                          {ann.title} {ann.isPinned && <span className="bg-[#85431E] text-white text-[9px] font-mono font-bold px-1.5 py-0.5 rounded ml-1 tracking-widest">PINNED</span>}
                        </h4>
                        <p className="text-xs text-[#EACEAA]/80 font-sans leading-relaxed mt-1">{ann.body}</p>
                        <span className="block text-[9px] text-[#D39858]/80 font-mono text-right mt-1">— Posted {ann.date}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>

            {/* 30 Juz reading block */}
            <div className="bg-[#EACEAA] rounded-2xl border border-[#D39858] p-6 sm:p-8 shadow-sm">
              <div className="border-b border-[#D39858]/20 pb-4 mb-6 md:flex md:items-center md:justify-between">
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#34150F]">Thirty Juz Tracker</h3>
                  <p className="text-xs text-[#150C0C]/80">Tap each tile to cycle reading status: Empty (Not started) → Amber (Currently reading) → Brown (Completed!).</p>
                </div>
                {/* Tile indicator legends */}
                <div className="flex space-x-3 mt-3 md:mt-0 text-[10px] font-mono font-bold uppercase shrink-0">
                  <span className="flex items-center"><span className="w-3 h-3 bg-[#EACEAA] border border-[#D39858]/40 rounded mr-1.5" /> Empty</span>
                  <span className="flex items-center"><span className="w-3 h-3 bg-[#D39858]/35 border border-[#D39858] rounded mr-1.5" /> Reading</span>
                  <span className="flex items-center"><span className="w-3 h-3 bg-[#85431E] rounded mr-1.5" /> Completed</span>
                </div>
              </div>

              {/* Grid 30 widgets */}
              <div className="grid grid-cols-5 sm:grid-cols-6 lg:grid-cols-10 gap-3">
                {Array.from({ length: 30 }).map((_, i) => {
                  const juzNum = i + 1;
                  const status = juzLevels[juzNum] || 'not-started';
                  let bgClass = 'bg-[#EACEAA]/40 border border-[#D39858]/40 hover:bg-[#D39858]/20 text-[#34150F]';
                  if (status === 'reading') bgClass = 'bg-[#D39858]/35 border border-[#D39858] text-[#34150F]';
                  if (status === 'completed') bgClass = 'bg-[#85431E] text-[#EACEAA] font-bold border border-[#85431E] shadow-sm';

                  return (
                    <button
                      key={juzNum}
                      onClick={() => cycleJuzLevel(juzNum)}
                      className={`h-11 rounded-lg text-xs font-mono font-bold flex flex-col items-center justify-center relative transition-all ${bgClass}`}
                      title={`Juz ${juzNum} click to cycle status`}
                    >
                      <span className="text-[10px] opacity-75">Juz</span>
                      <span className="text-sm -mt-0.5">{juzNum}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 114 Surah completion list checklist */}
            <div className="bg-[#EACEAA] rounded-2xl border border-[#D39858] p-6 sm:p-8 shadow-sm">
              <div className="border-b border-[#D39858]/20 pb-4 mb-6">
                <h3 className="font-serif text-xl font-bold text-[#34150F]">Surah Memorization / Study Checklists</h3>
                <p className="text-xs text-[#150C0C]/80">A complete catalog checklist pointing out surahs you have successfully analyzed or read with the study group.</p>
              </div>

              {/* Scrollable list catalog */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-h-96 overflow-y-auto pr-2 text-xs">
                {ALL_SURAHS.map((su) => {
                  const isChecked = checkedSurahs[su.number];
                  return (
                    <label
                      key={su.number}
                      className={`flex items-center space-x-2.5 p-2 rounded-lg border cursor-pointer select-none transition-colors ${
                        isChecked 
                          ? 'bg-[#85431E]/10 border-[#85431E]/60' 
                          : 'bg-[#EACEAA]/30 border-[#D39858]/20 hover:bg-[#D39858]/10'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={!!isChecked}
                        onChange={() => toggleSurahCheck(su.number)}
                        className="rounded accent-[#85431E]"
                      />
                      <div className="truncate-text text-[11px]">
                        <span className="font-bold text-[#85431E] mr-1">#{su.number}</span>
                        <span className="font-serif font-bold text-[#150C0C]">{su.englishName}</span>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        {/* SUBTAB 2: GROUP STUDY SCHEDULE (Weekly RSBP Lists) */}
        {activeSubTab === 'schedule' && (
          <motion.div
            key="schedule_tab"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
            id="panel_group_schedule"
          >
            <div className="bg-[#EACEAA] border-2 border-[#D39858] rounded-2xl p-6 sm:p-8 shadow-md">
              <h3 className="font-serif text-xl font-bold text-[#34150F] border-b border-[#D39858]/30 pb-3 mb-6">
                Active Weekly Session Schedule
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-[#34150F] text-[#EACEAA] font-serif font-bold">
                      <th className="p-3 rounded-tl-lg">Syllabus Topic</th>
                      <th className="p-3">Reference Verse / Book</th>
                      <th className="p-3">Weekly Date & Time</th>
                      <th className="p-3">Platform Location</th>
                      <th className="p-3 rounded-tr-lg text-center">RSVP attending</th>
                    </tr>
                  </thead>
                  <tbody className="font-medium text-[#150C0C]">
                    {STUDY_SCHEDULE.map((sc, i) => {
                      const userRsvp = scheduleRSVPs[sc.id];

                      return (
                        <tr 
                          key={sc.id}
                          className={`border-b border-[#D39858]/20 ${
                            i % 2 === 0 ? 'bg-[#EACEAA]/50' : 'bg-[#D39858]/10'
                          }`}
                        >
                          <td className="p-3 font-serif font-bold text-base text-[#34150F]">{sc.topic}</td>
                          <td className="p-3 italic text-[#85431E] select-all">{sc.reference}</td>
                          <td className="p-3 font-semibold font-mono">{sc.date}<br /><span className="text-[10px] text-inherit opacity-75">{sc.time}</span></td>
                          <td className="p-3">
                            <div className="space-y-1">
                              <span className="flex items-center text-[11px]"><MapPin className="h-3 w-3 text-[#85431E] mr-1 shrink-0" /> {sc.location}</span>
                              {sc.meetingLink && (
                                <a 
                                  href={sc.meetingLink} 
                                  target="_blank" 
                                  rel="noopener noreferrer" 
                                  className="flex items-center text-[10px] text-[#85431E] font-bold hover:underline font-mono"
                                >
                                  <Video className="h-3 w-3 mr-1 shrink-0" /> Stream Link
                                </a>
                              )}
                            </div>
                          </td>
                          <td className="p-3 text-center">
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5">
                              <button
                                onClick={() => handleRSVP(sc.id, 'yes')}
                                className={`px-2.5 py-1.5 rounded font-mono font-bold text-[10px] transition-colors border ${
                                  userRsvp === 'yes'
                                    ? 'bg-[#85431E] text-[#EACEAA] border-[#85431E]'
                                    : 'bg-transparent text-[#85431E] border-[#85431E] hover:bg-[#85431E]/10'
                                }`}
                              >
                                Attending
                              </button>
                              <button
                                onClick={() => handleRSVP(sc.id, 'not-sure')}
                                className={`px-2 py-1.5 rounded font-mono font-bold text-[10px] transition-colors border ${
                                  userRsvp === 'not-sure'
                                    ? 'bg-[#34150F] text-[#EACEAA] border-[#34150F]'
                                    : 'bg-transparent text-[#34150F] border-[#34150F] hover:bg-[#34150F]/10'
                                }`}
                              >
                                Not Sure
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* SUBTAB 3: NOTES EXPORTER SYSTEM */}
        {activeSubTab === 'notes' && (
          <motion.div
            key="notes_tab"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
            id="panel_saved_notes"
          >
            <div className="bg-[#EACEAA] border-2 border-[#D39858] rounded-2xl p-6 sm:p-8 shadow-md">
              <div className="border-b border-[#D39858]/35 pb-4 mb-6 sm:flex sm:items-center sm:justify-between">
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#34150F]">My Saved Reflections & Bookmarks</h3>
                  <p className="text-xs text-[#150C0C]/80">A centralized cabinet displaying study notes you registered inside the Qur'an Reader.</p>
                </div>
                {bookmarks.length > 0 && (
                  <button
                    onClick={triggerNotesExport}
                    className="mt-3 sm:mt-0 bg-[#85431E] hover:bg-[#D39858] text-[#EACEAA] px-4 py-2 rounded-lg border border-[#D39858]/30 font-serif font-bold text-xs flex items-center justify-center shadow"
                  >
                    <Download className="h-4 w-4 mr-1.5" /> EXPORT AS TEXT (.TXT FILE)
                  </button>
                )}
              </div>

              {/* Notes grid */}
              <div className="space-y-4">
                {bookmarks.map((b) => (
                  <div key={b.id} className="p-5 rounded-xl border border-[#D39858]/35 bg-[#34150F]/5 space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono font-bold text-[#85431E]">
                      <span>Surah {b.surahName} ({b.surahNumber}:{b.ayahNumber})</span>
                      <span className="text-[10px] opacity-75">Date Bookmarked: {new Date().toLocaleDateString()}</span>
                    </div>

                    <div className="border-l-2 border-[#85431E] pl-3 py-1 bg-[#150C0C]/5">
                      <p className="font-arabic text-right text-base text-[#150C0C] leading-loose mb-1" dir="rtl">{b.textArabic}</p>
                      <p className="text-xs text-[#34150F] font-sans">{b.textEnglish}</p>
                    </div>

                    <div>
                      <h4 className="text-[11px] font-mono font-bold text-[#85431E] uppercase">My Reflective Note:</h4>
                      <p className="text-sm font-sans italic text-[#34150F] leading-relaxed pt-1 whitespace-pre-wrap bg-white/40 p-2.5 rounded border border-[#D39858]/20 mt-1">
                        {b.note || "No study reflections added yet. Close and tap the bookmark note button in the Qur'an Reader to insert reflections."}
                      </p>
                    </div>
                  </div>
                ))}

                {bookmarks.length === 0 && (
                  <div className="py-12 text-center text-sm text-[#D39858] font-serif italic space-y-2">
                    <p>No active notes registered.</p>
                    <p className="text-xs">Browse to the Qur'an tab, expand any surah, and click the bookmark star to add notes.</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* SUBTAB 4: DYNAMIC GAMIFIED CHALLENGE QUIZZES */}
        {activeSubTab === 'quiz' && (
          <motion.div
            key="quiz_tab"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
            id="panel_knowledge_quiz"
          >
            <div className="bg-[#EACEAA] border-2 border-[#D39858] rounded-2xl p-6 sm:p-10 shadow-md">
              {!quizStarted ? (
                // 1. Selector dashboard
                <div className="space-y-6">
                  <div className="text-center max-w-md mx-auto space-y-1">
                    <span className="text-2xl">🏆</span>
                    <h3 className="font-serif text-xl font-bold text-[#34150F]">Islamic Knowledge Quizzes</h3>
                    <p className="text-xs text-[#150C0C]/80 font-sans leading-relaxed">
                      Select a study category to review lessons on Prophet Seerah, Qur'ranic history, or foundational monotheism.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                    {STUDY_QUIZZES.map((qz) => (
                      <div 
                        key={qz.id} 
                        className="p-5 rounded-xl border border-[#D39858] bg-[#34150F]/5 flex flex-col justify-between"
                      >
                        <div>
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#85431E] bg-[#85431E]/10 px-2 py-0.5 rounded border border-[#D39858]/20">{qz.category}</span>
                          <h4 className="font-serif text-lg font-bold text-[#34150F] mt-2.5 mb-1">{qz.title}</h4>
                          <p className="text-xs text-[#150C0C]/80">{qz.questions.length} selective questions covering authentic evidences.</p>
                        </div>
                        <button
                          onClick={() => startQuiz(qz.id)}
                          className="w-full bg-[#85431E] hover:bg-[#D39858] text-[#EACEAA] font-serif font-bold text-xs py-2 rounded shadow transition-colors mt-6 flex items-center justify-center space-x-1"
                        >
                          <Play className="h-4.5 w-4.5" />
                          <span>Start Challenge</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                // 2. Active Game loop board
                <div>
                  {(() => {
                    const activeQuizObj = STUDY_QUIZZES.find(q => q.id === activeQuizId);
                    if (!activeQuizObj) return null;

                    const curQuest = activeQuizObj.questions[currentQuestionIndex];
                    const count = activeQuizObj.questions.length;

                    if (quizCompleted) {
                      // Score screen
                      return (
                        <div className="text-center py-8 space-y-6 max-w-md mx-auto">
                          <Trophy className="h-14 w-14 text-gold mx-auto animate-bounce" />
                          <h3 className="font-serif text-2xl font-bold text-[#34150F]">Quiz Fully Completed!</h3>
                          <p className="text-sm font-sans">
                            You scored <strong className="text-[#85431E] text-lg font-mono">{quizScore} / {count}</strong> correct responses.
                          </p>
                          
                          {/* Motivational Quote */}
                          <div className="bg-[#34150F] text-[#EACEAA] p-4 rounded-lg border border-[#D39858]/30 max-w-sm mx-auto text-xs italic font-serif">
                            {quizScore === count 
                              ? '"Indeed, those who believe and do righteous deeds, for them are the Gardens of Pleasure." — Luqman 31:8'
                              : '"And say: My Lord, increase me in knowledge." — Taha 20:110'}
                          </div>

                          <div className="flex justify-center space-x-2 pt-4">
                            <button
                              onClick={() => {
                                setQuizStarted(false);
                                setQuizCompleted(false);
                              }}
                              className="bg-[#85431E] text-[#EACEAA] font-serif font-bold px-6 py-2 rounded shadow border border-[#D39858]/30"
                            >
                              Exit to list
                            </button>
                            <button
                              onClick={() => activeQuizId && startQuiz(activeQuizId)}
                              disabled={!activeQuizId}
                              className="px-6 py-2 bg-transparent hover:bg-[#85431E]/20 text-[#85431E] font-serif font-bold rounded border border-[#85431E] disabled:opacity-50"
                            >
                              Retry Quiz
                            </button>
                          </div>
                        </div>
                      );
                    }

                    return (
                      <div className="space-y-6" id="active_quiz_card">
                        <div className="flex items-center justify-between border-b border-[#D39858]/20 pb-3 mb-4 text-xs font-mono font-bold text-[#85431E]">
                          <span>Active Challenge: {activeQuizObj.title}</span>
                          <span>Question {currentQuestionIndex + 1} of {count}</span>
                        </div>

                        {/* Progress Bar indicator */}
                        <div className="w-full h-1.5 bg-[#34150F]/15 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-[#85431E] transition-all duration-300" 
                            style={{ width: `${((currentQuestionIndex + 1) / count) * 100}%` }}
                          />
                        </div>

                        {/* Question title */}
                        <h4 className="font-serif text-lg sm:text-xl font-bold text-[#34150F] leading-snug">
                          {curQuest.question}
                        </h4>

                        {/* Options buttons list */}
                        <div className="grid grid-cols-1 gap-3">
                          {curQuest.options.map((opt, oIdx) => {
                            const isSelected = selectedOptionIndex === oIdx;
                            const isCorrectAnswer = curQuest.answerIndex === oIdx;
                            
                            let optClass = 'bg-[#EACEAA] border-[#D39858]/60 hover:bg-[#D39858]/25';
                            if (selectedOptionIndex !== null) {
                              if (isCorrectAnswer) optClass = 'bg-[#85431E] text-[#EACEAA] border-[#85431E] font-bold';
                              else if (isSelected) optClass = 'bg-[#150C0C]/25 text-red-800 border-red-800 font-bold';
                              else optClass = 'opacity-65 bg-[#EACEAA]/50 border-[#D39858]/10';
                            } else if (isSelected) {
                              optClass = 'border-[#85431E] ring-1 ring-[#85431E]';
                            }

                            return (
                              <button
                                key={oIdx}
                                disabled={selectedOptionIndex !== null}
                                onClick={() => handleAnswerSubmit(oIdx)}
                                className={`w-full text-left p-3.5 rounded-xl border text-sm font-serif transition-all flex items-center justify-between capitalize leading-none cursor-pointer ${optClass}`}
                              >
                                <span>{opt}</span>
                                {selectedOptionIndex !== null && isCorrectAnswer && (
                                  <span className="text-xs font-serif font-bold uppercase tracking-wider text-[#EACEAA]">✓ Correct</span>
                                )}
                              </button>
                            );
                          })}
                        </div>

                        {/* Slide Explanation when answered */}
                        {selectedOptionIndex !== null && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-[#34150F] text-[#EACEAA] p-4 rounded-xl border border-[#D39858]/40 space-y-2 mt-4 text-xs"
                          >
                            <h5 className="font-serif text-sm font-bold text-[#D39858] flex items-center">
                              <Sparkles className="h-4 w-4 mr-1.5 animate-pulse" /> Lesson Commentary & Authenticity Analysis
                            </h5>
                            <p className="text-xs text-[#EACEAA]/90 leading-relaxed font-sans mt-1">
                              {curQuest.explanation}
                            </p>

                            <div className="flex justify-end pt-3">
                              <button
                                onClick={() => proceedNextQuestion(count, curQuest.answerIndex)}
                                className="bg-[#85431E] hover:bg-[#D39858] text-[#EACEAA] font-serif font-bold px-4 py-2 rounded shadow"
                              >
                                {currentQuestionIndex === count - 1 ? 'Finish Results' : 'Next Question →'}
                              </button>
                            </div>
                          </motion.div>
                        )}
                        
                        {selectedOptionIndex === null && (
                          <p className="text-xs text-center text-[#D39858] italic font-mono uppercase tracking-widest pt-2">
                            Select a value to lock response and review credentials...
                          </p>
                        )}
                      </div>
                    );
                  })()}
                </div>
              )}
            </div>
          </motion.div>
        )}

      </AnimatePresence>

      {/* Floating Dynamic Feedback Toast */}
      <AnimatePresence>
        {studyToast && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 bg-[#85431E] border border-[#D39858]/70 text-[#EACEAA] rounded-xl py-3 px-5 shadow-2xl flex items-center space-x-3 text-sm font-sans"
          >
            <CheckCircle2 className="h-4.5 w-4.5 text-[#D39858] shrink-0" />
            <span className="font-semibold">{studyToast}</span>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
