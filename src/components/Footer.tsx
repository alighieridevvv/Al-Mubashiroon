import { Heart } from 'lucide-react';
import BearerLogo from './BearerLogo';

interface FooterProps {
  setCurrentTab: (tab: string) => void;
}

export default function Footer({ setCurrentTab }: FooterProps) {
  const handleQuickLink = (tab: string) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#150C0C] text-[#EACEAA] border-t-2 border-[#D39858]/40" id="main_footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8" id="footer_grid">
          {/* Column 1: About & Du'a */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center space-x-2.5">
              <BearerLogo size={36} />
              <h2 className="font-serif text-xl font-bold tracking-wide text-[#EACEAA] flex items-center gap-2">
                <span className="font-arabic text-glow text-base">المبشرين</span>
                <span className="text-xs text-stone-300 font-sans font-normal border-l border-[#D39858]/30 pl-2">The Bearers of Good News</span>
              </h2>
            </div>
            <p className="text-sm text-[#EACEAA]/80 leading-relaxed font-sans max-w-md">
              A place for seekers of sacred guidance and study group members. We strive to seek knowledge as legislated in the Qur'an and authentic Sunnah, and to share this light with Muslims and non-Muslims alike.
            </p>
            <div className="border-l-2 border-[#D39858] pl-3 py-1 font-serif text-base text-[#D39858] italic">
              "My successor of knowledge is the one who lives by it."
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h3 className="font-serif text-base font-bold text-[#D39858] border-b border-[#D39858]/20 pb-1.5">
              Quick Navigation
            </h3>
            <ul className="space-y-2 text-sm font-medium">
              {[
                { id: 'home', label: 'Landing Home' },
                { id: 'quran', label: "Read Holy Qur'an" },
                { id: 'prayer', label: 'Daily Prayer Times & Qibla' },
                { id: 'seerah', label: 'Prophetic Seerah Biography' },
                { id: 'glossary', label: 'Classical Islamic Glossary' },
                { id: 'refutations', label: 'Evidence-Based Response Hub' },
                { id: 'dawah', label: 'Dawah Resources' },
                { id: 'knowledge', label: 'Knowledge Base' },
                { id: 'study', label: 'Study Dashboard' }
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => handleQuickLink(link.id)}
                    className="text-[#EACEAA]/80 hover:text-[#D39858] transition-colors flex items-center text-xs text-left"
                  >
                    <span className="mr-1.2 shrink-0">✦</span> <span className="hover:underline">{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact & Info */}
          <div className="space-y-3">
            <h3 className="font-serif text-base font-bold text-[#D39858] border-b border-[#D39858]/20 pb-1.5">
              Reflections
            </h3>
            <p className="text-xs text-[#EACEAA]/70 leading-relaxed font-mono">
              "The most beloved of deeds to Allah are those that are most consistent, even if they are small."
              <br />
              <span className="block mt-1 text-[#D39858]">— Sahih Al-Bukhari 6464</span>
            </p>
            
            {/* Social Icons representation */}
            <div className="flex space-x-3 pt-2">
              <a href="https://t.me/islamicstudy" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-[#34150F] text-[#D39858] hover:text-[#EACEAA] transition-colors border border-[#D39858]/20 text-xs">
                Telegram
              </a>
              <a href="https://youtube.com/@islamicstudy" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-[#34150F] text-[#D39858] hover:text-[#EACEAA] transition-colors border border-[#D39858]/20 text-xs">
                YouTube
              </a>
              <a href="https://podcast.spotify.com/islamicstudy" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-[#34150F] text-[#D39858] hover:text-[#EACEAA] transition-colors border border-[#D39858]/20 text-xs">
                Podcast
              </a>
            </div>
          </div>
        </div>

        {/* Middle Du'a Banner */}
        <div className="my-8 py-5 border-t border-b border-[#D39858]/20 text-center font-serif" id="footer_dua_banner">
          <p className="text-base sm:text-lg text-[#EACEAA] italic">
            "May Allah accept this from us and make it a means of guidance — Ameen"
          </p>
        </div>

        {/* Bottom copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-[#EACEAA]/60 font-mono pt-4">
          <p>© 2026 المبشرين (The Bearers of Good News). All references compiled under authentic monotheism with devotion.</p>
          <div className="flex items-center space-x-1.5 mt-2 sm:mt-0">
            <span>Seeking Allah's favor</span>
            <Heart className="h-3 w-3 text-[#85431E] fill-[#85431E]" />
          </div>
        </div>
      </div>
    </footer>
  );
}
