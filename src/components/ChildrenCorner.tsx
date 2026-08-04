import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Award, CheckCircle, Flame, ArrowRight, ArrowLeft } from 'lucide-react';

interface Story {
  id: string;
  title: string;
  hero: string;
  emoji: string;
  moral: string;
  text: string;
}

const PRELOADED_STORIES: Story[] = [
  {
    id: "story_1",
    title: "Prophet Noah ﷺ and the Big Ark",
    hero: "Nuh ﷺ",
    emoji: "🚢",
    moral: "Trust in Allah's guidance and keep building your good habits even when other people laugh.",
    text: "Long long ago, Prophet Nuh was commanded by Allah to build a massive wooden ark in the middle of a hot, dry land! Many people didn't understand and made fun of him. But Nuh was extremely patient. He trusted Allah completely and built the ship. Finally, a great rainfall started, and those who believed were safe inside the floating ark with pairs of animals of every kind!"
  },
  {
    id: "story_2",
    title: "Prophet Ibrahim ﷺ and the Cool Garden",
    hero: "Ibrahim ﷺ",
    emoji: "🔥",
    moral: "Speak truth gently and trust that Allah surrounds good doers with peace & safety.",
    text: "Prophet Ibrahim stood firm for monotheism (Tawheed), speaking to his community with kind, respectful arguments about the Creator. When his angry opponents tried to cast him into a blazing, roaring fire, Ibrahim prayed 'Hasbunallahu wa nimal Wakeel' (Allah is sufficient for us). Instantly, Allah ordered the fire: 'O fire! Be cool and peaceful for Ibrahim!' The wood burned away, but Ibrahim walked free in a peaceful garden!"
  },
  {
    id: "story_3",
    title: "Prophet Yusuf ﷺ and the Beautiful Dream",
    hero: "Yusuf ﷺ",
    emoji: "👑",
    moral: "Do not harbor jealousy. Have patience, because Allah always elevates noble character.",
    text: "When he was just a little boy, Prophet Yusuf dreamt that eleven stars, the sun, and the moon all bowed down to him! Though his older brothers became jealous and tried to cause him harm, Yusuf remained highly forgiving and patient. He grew up, faced trials with dignity, and was eventually made the minister of Egypt. His family came to seek help, and Yusuf warmly forgave his brothers, uniting them in peace!"
  }
];

interface CustomHabit {
  id: string;
  title: string;
  emoji: string;
  points: number;
}

export default function ChildrenCorner() {
  const [stories] = useState<Story[]>(PRELOADED_STORIES);
  const [activeStoryIdx, setActiveStoryIdx] = useState(0);
  const [checkedHabits, setCheckedHabits] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('child_habits');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [activeQuestionIdx, setActiveQuestionIdx] = useState(0);
  const [selectedAnswerIdx, setSelectedAnswerIdx] = useState<number | null>(null);

  const habits: CustomHabit[] = [
    { id: "h_1", title: "Said Bismillah before food", emoji: "🍎", points: 10 },
    { id: "h_2", title: "Smiled / Helped parents", emoji: "😊", points: 15 },
    { id: "h_3", title: "Organized my play room", emoji: "🧸", points: 10 },
    { id: "h_4", title: "Shared my toys or snacks", emoji: "🎁", points: 15 }
  ];

  const quizQuestions = [
    {
      question: "Which Prophet built the giant Ark for pairs of animals?",
      options: ["Prophet Nuh ﷺ (Noah)", "Prophet Musa ﷺ (Moses)", "Prophet Isa ﷺ (Jesus)", "Prophet Adam ﷺ"],
      correctIdx: 0,
      reward: "Ark Captain Badge!"
    },
    {
      question: "What should we say before starting our meals or studies?",
      options: ["Alhamdulillah", "Bismillah", "Allahu Akbar", "Subhanallah"],
      correctIdx: 1,
      reward: "Prophetic Manners Star!"
    }
  ];

  const toggleHabit = (id: string) => {
    setCheckedHabits(prev => {
      const next = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
      localStorage.setItem('child_habits', JSON.stringify(next));
      return next;
    });
  };

  const currentStory = stories[activeStoryIdx];

  const handleNextStory = () => {
    setActiveStoryIdx((prev) => (prev + 1) % stories.length);
  };

  const handlePrevStory = () => {
    setActiveStoryIdx((prev) => (prev === 0 ? stories.length - 1 : prev - 1));
  };

  const handleAnswerClick = (idx: number) => {
    setSelectedAnswerIdx(idx);
  };

  const handleNextQuestion = () => {
    if (selectedAnswerIdx === null) return;
    
    const isCorrect = selectedAnswerIdx === quizQuestions[activeQuestionIdx].correctIdx;
    if (isCorrect) {
      setQuizScore(prev => (prev === null ? 1 : prev + 1));
    } else {
      setQuizScore(prev => (prev === null ? 0 : prev));
    }

    if (activeQuestionIdx < quizQuestions.length - 1) {
      setActiveQuestionIdx(prev => prev + 1);
      setSelectedAnswerIdx(null);
    } else {
      // Finished
      setActiveQuestionIdx(prev => prev + 1); // trigger complete
    }
  };

  const resetQuiz = () => {
    setQuizScore(null);
    setActiveQuestionIdx(0);
    setSelectedAnswerIdx(null);
  };

  const totalPoints = checkedHabits.reduce((sum, hId) => {
    const matched = habits.find(h => h.id === hId);
    return sum + (matched?.points || 0);
  }, 0);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 arabesque-pattern" id="children_corner_root">
      
      {/* Page Inset Header */}
      <div className="text-center mb-10 max-w-2xl mx-auto">
        <span className="text-xs font-mono text-[#D39858] tracking-widest uppercase flex items-center justify-center gap-1.5">
          <Star className="h-4 w-4 text-amber-300 fill-amber-300 animate-pulse" />
          Nurturing Little Stars
          <Star className="h-4 w-4 text-amber-300 fill-amber-300 animate-pulse" />
        </span>
        <h2 className="font-serif text-3xl font-bold text-[#EACEAA] mt-1">Children's Sacred Oasis</h2>
        <p className="text-xs sm:text-sm text-[#EACEAA]/70 mt-2 font-sans">
          Friendly stories of the Prophets, reward charts for helpful deeds, and fun quizzes that make learning authentic values a beautiful adventure!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Stories Panel */}
        <div className="col-span-1 lg:col-span-8 bg-[#1E0F0D] border border-[#D39858]/40 rounded-2xl p-6 md:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase bg-[#85431E]/30 text-[#D39858] px-2.5 py-1 rounded border border-[#D39858]/15">
              PROPHETIC BIOGRAPHY TALES
            </span>
            <div className="flex items-center gap-2">
              <button onClick={handlePrevStory} className="p-2 rounded-full hover:bg-[#34150F] text-[#D39858] transition-colors">
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button onClick={handleNextStory} className="p-2 rounded-full hover:bg-[#34150F] text-[#D39858] transition-colors">
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentStory.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.18 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-4">
                <span className="text-4xl">{currentStory.emoji}</span>
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#EACEAA]">{currentStory.title}</h3>
                  <span className="text-xs text-[#D39858] font-semibold">Teacher: Prophet {currentStory.hero}</span>
                </div>
              </div>

              <p className="text-sm sm:text-base text-stone-200 leading-relaxed font-sans font-normal whitespace-pre-line py-2">
                {currentStory.text}
              </p>

              <div className="bg-[#34150F] border border-amber-300/20 p-4 rounded-xl">
                <h4 className="font-serif text-xs font-bold text-amber-200 flex items-center gap-2 mb-1.5">
                  <Star className="h-3.5 w-3.5 fill-amber-300 text-amber-300" />
                  Golden Lesson from This Story:
                </h4>
                <p className="text-xs text-stone-300 font-sans leading-relaxed italic border-l border-amber-300/30 pl-2.5">
                  {currentStory.moral}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Sidebar deeds & quizzes inside Content area */}
        <div className="col-span-1 lg:col-span-4 space-y-6">
          
          {/* Daily deeds reward board */}
          <div className="bg-[#34150F] border border-[#D39858]/30 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-[#D39858]/15 pb-2">
              <h4 className="font-serif font-bold text-sm text-[#EACEAA]">Daily Character Stars</h4>
              <div className="bg-[#85431E]/40 border border-[#D39858]/35 px-2.5 py-1 rounded-full flex items-center gap-1">
                <Flame className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                <span className="text-[11px] font-mono text-[#D39858]">{totalPoints} Pts</span>
              </div>
            </div>

            <p className="text-xs text-stone-300 leading-normal font-sans">
              Help your parents, stay clean, and check the boards below to collect daily reward badges!
            </p>

            <div className="space-y-2">
              {habits.map((h) => {
                const checked = checkedHabits.includes(h.id);
                return (
                  <button
                    key={h.id}
                    onClick={() => toggleHabit(h.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl border text-xs text-left font-sans transition-all ${
                      checked
                        ? 'bg-emerald-950/20 border-emerald-500/20 text-emerald-300'
                        : 'bg-[#1E0F0D] border-[#D39858]/15 text-[#EACEAA]/60 hover:text-[#EACEAA]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-lg">{h.emoji}</span>
                      <span className="font-medium">{h.title}</span>
                    </div>
                    {checked ? (
                      <CheckCircle className="h-4 w-4 text-emerald-400" />
                    ) : (
                      <span className="text-[10px] bg-[#85431E]/20 text-[#D39858] px-2 py-0.5 rounded">+{h.points}xp</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Kids Bible & Qur'an basic quizzing */}
          <div className="bg-[#1E0F0D] border border-[#D39858]/40 rounded-2xl p-5 space-y-4">
            <div className="border-b border-[#D39858]/15 pb-2 flex items-center justify-between">
              <h4 className="font-serif font-bold text-sm text-[#EACEAA]">Star Quiz Challenge</h4>
              <Award className="h-4 w-4 text-amber-400" />
            </div>

            {activeQuestionIdx < quizQuestions.length ? (
              <div className="space-y-3">
                <p className="text-xs font-sans font-bold text-stone-200">
                  Question {activeQuestionIdx + 1} of {quizQuestions.length}:
                </p>
                <p className="text-xs text-[#EACEAA] font-semibold leading-relaxed leading-sans">
                  {quizQuestions[activeQuestionIdx].question}
                </p>
                <div className="space-y-1.5">
                  {quizQuestions[activeQuestionIdx].options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => handleAnswerClick(i)}
                      className={`w-full text-left p-2.5 rounded-lg text-xs leading-normal font-sans border transition-all ${
                        selectedAnswerIdx === i
                          ? 'bg-[#85431E] border-[#D39858] text-[#EACEAA]'
                          : 'bg-[#34150F] border-[#D39858]/10 text-[#EACEAA]/60 hover:text-[#EACEAA]'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                <button
                  onClick={handleNextQuestion}
                  disabled={selectedAnswerIdx === null}
                  className="w-full bg-[#85431E] hover:bg-[#D39858] disabled:opacity-40 text-[#EACEAA] py-2 rounded-lg text-xs font-mono font-bold tracking-wider mt-2 transition-all"
                >
                  Confirm Answer
                </button>
              </div>
            ) : (
              <div className="text-center space-y-3 py-2">
                <Star className="h-10 w-10 text-amber-300 fill-amber-300 mx-auto mb-1 animate-bounce" />
                <h5 className="font-serif text-sm font-bold text-[#EACEAA]">Masha'Allah! Beautiful Work!</h5>
                <p className="text-xs text-stone-300 font-sans">
                  You completed the challenge and unlocked the badges! Keep shining!
                </p>
                <p className="text-xs font-mono font-bold text-[#D39858]">Score: {quizScore || 0} / {quizQuestions.length}</p>
                <button
                  onClick={resetQuiz}
                  className="px-4 py-1.5 bg-[#85431E] text-xs font-serif font-bold rounded-lg text-[#EACEAA] hover:bg-[#D39858]"
                >
                  Restart Quiz
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
