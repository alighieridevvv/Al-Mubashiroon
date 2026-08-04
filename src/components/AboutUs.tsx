import { motion } from 'motion/react';
import { ShieldCheck, Users, Compass } from 'lucide-react';

export default function AboutUs() {
  const values = [
    {
      title: "Pure Authenticity",
      icon: ShieldCheck,
      desc: "We adhere strictly to the foundational sources of Islamic knowledge: the holy Qur'an and authentic Sunnah, free from modern additions or compromised positions."
    },
    {
      title: "Correct Aqeedah",
      icon: Compass,
      desc: "Maintaining strict, unadulterated monotheism (Tawheed), validating the beautiful names of Allah, and safeguarding correct articles of faith."
    },
    {
      title: "Warm Brotherhood & Sisterhood",
      icon: Users,
      desc: "Creating a welcoming environment for all curious minds, supporting reverts, facilitating open yet respectful theological dialogues."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 arabesque-pattern" id="about_us_workspace">
      
      {/* Upper header section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
        <div className="space-y-6">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#D39858]">ABOUT OUR CIRCLE</span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#EACEAA] leading-tight">
            Gaining Sacred Knowledge in Devotion
          </h1>
          <p className="text-sm sm:text-base text-stone-200 leading-relaxed font-sans">
            Our study group consists of local community students, reverts, and curious seekers dedicating time together to expand our spiritual consciousness. We facilitate active Qur'an circles, theological reviews, and supportive classes.
          </p>
          <div className="p-5 bg-[#34150F] text-[#EACEAA] rounded-xl border border-[#D39858]/30 shadow-inner">
            <h4 className="font-serif font-bold text-[#D39858] mb-1">Our Mission Formula</h4>
            <p className="text-xs sm:text-sm font-sans italic leading-relaxed">
              "Seeking authentic Islamic knowledge in as many matters as Allah allows, with sincerity, mutual support, and practical implementation in daily actions."
            </p>
          </div>
        </div>

        {/* Big stylized pull quote representing the Quran */}
        <div className="bg-[#1E0F0D] rounded-2xl border-2 border-[#D39858]/60 p-8 shadow-md relative overflow-hidden text-center md:py-12">
          <div className="absolute -top-6 -left-6 text-7xl font-serif text-[#D39858] opacity-15 select-none leading-none">“</div>
          <div className="absolute -bottom-6 -right-6 text-7xl font-serif text-[#D39858] opacity-15 select-none leading-none">”</div>

          <p className="font-arabic text-[#D39858] text-2xl sm:text-3xl leading-loose mb-3" dir="rtl">
            فَاعْلَمْ أَنَّهُ لَا إِلَٰهَ إِلَّا اللَّهُ
          </p>
          <p className="text-xs font-serif italic text-stone-300 tracking-widest mb-4">
            Fa'lam annahu la ilaha illa Allah
          </p>
          <p className="text-sm sm:text-base text-[#EACEAA] font-bold font-serif leading-relaxed max-w-md mx-auto">
            "So know, [O Muhammad], that there is no deity worthy of worship except Allah."
          </p>
          <span className="block mt-2 text-[10px] text-stone-400 font-mono">— Surah Muhammad, 47:19</span>
        </div>
      </div>

      {/* Core values block */}
      <div className="space-y-8 mb-16">
        <h3 className="font-serif text-2xl font-bold text-center text-[#EACEAA]">Our Core Principles & Values</h3>
        <span className="w-16 h-0.5 bg-[#D39858]/40 mx-auto block mb-8" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((v, idx) => {
            const Icon = v.icon;
            return (
              <motion.div
                key={idx}
                whileHover={{ y: -3 }}
                className="bg-[#1E0F0D] border border-[#D39858]/50 rounded-xl p-6 shadow-sm space-y-4"
              >
                <div className="w-10 h-10 rounded-full bg-[#85431E] text-[#EACEAA] flex items-center justify-center border border-[#D39858]/30">
                  <Icon className="h-5 w-5" />
                </div>
                <h4 className="font-serif font-bold text-[#EACEAA] text-lg">{v.title}</h4>
                <p className="text-xs text-stone-300 leading-relaxed font-sans">{v.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Quick Callout quote */}
      <div className="bg-[#150C0C] text-[#EACEAA] rounded-2xl p-8 border border-[#D39858]/30 text-center space-y-4">
        <h4 className="text-sm font-semibold tracking-wider text-[#D39858] font-mono leading-none">PROPHETIC BEACON</h4>
        <p className="font-serif text-lg leading-relaxed max-w-3xl mx-auto italic">
          "The scholars are the heirs of the Prophets, and the Prophets leave behind neither dinnar nor dirham, rather they leave behind knowledge. So whoever takes it, has taken an abundant share."
        </p>
        <span className="block text-[11px] text-[#D39858] font-mono">— Sunan Abi Dawud 3641</span>
      </div>

    </div>
  );
}
