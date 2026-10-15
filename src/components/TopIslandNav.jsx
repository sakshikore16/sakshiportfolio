import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AppWindow, 
  Sparkles, 
  BookOpen, 
  GraduationCap, 
  Layers, 
  FolderGit2, 
  Award, 
  Send, 
  Volume2, 
  VolumeX 
} from 'lucide-react';
import { isSoundEnabled, toggleSound, playClick } from '../utils/sound';

export const TopIslandNav = ({ isWindowOpen = true }) => {
  const [activeSection, setActiveSection] = useState('hero');
  const [hoveredItem, setHoveredItem] = useState(null);
  const [soundOn, setSoundOn] = useState(isSoundEnabled());
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { id: 'hero', label: 'Window', icon: AppWindow },
    { id: 'about', label: 'About', icon: Sparkles },
    { id: 'experience', label: 'Experience', icon: BookOpen },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'skills', label: 'Skills', icon: Layers },
    { id: 'projects', label: 'Projects', icon: FolderGit2 },
    { id: 'certifications', label: 'Certs & Winnings', icon: Award },
    { id: 'contact', label: 'Contact', icon: Send },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-30% 0px -40% 0px', threshold: 0.1 }
    );

    navItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const handleNavClick = (id) => {
    playClick();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSoundToggle = (e) => {
    e.stopPropagation();
    const newState = toggleSound();
    setSoundOn(newState);
  };

  return (
    <AnimatePresence>
      {isWindowOpen && (
        <motion.header
          initial={{ y: -50, opacity: 0, x: '-50%' }}
          animate={{ y: 0, opacity: 1, x: '-50%' }}
          exit={{ y: -50, opacity: 0, x: '-50%' }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="fixed top-4 left-1/2 -translate-x-1/2 z-50 select-none top-island-nav"
        >
          {/* Top Floating Island Navbar with Dynamic Backdrop Blur */}
          <nav 
            className="bg-white/65 backdrop-blur-2xl border border-white/50 shadow-md shadow-stone-900/5 rounded-full px-4 py-2 transition-all flex items-center gap-1.5 sm:gap-2"
          >
            
            {/* Cute Pastel "SK" Monogram Badge with Ribbon Bow */}
            <a
              href="#hero"
              onClick={() => playClick()}
              className="flex items-center gap-1 rounded-full group cursor-pointer"
              title="Sakshi Kore Portfolio"
            >
              <div className="bg-gradient-to-r from-pink-100/90 to-purple-100/90 border border-pink-200/60 shadow-xs px-3 py-1 flex items-center gap-1.5 rounded-full group-hover:scale-105 transition-transform">
                <span className="text-rose-900 font-bold text-xs tracking-tight font-serif">
                  SK
                </span>
                {/* Delicate Vector Tied-Bow in #F48B96 */}
                <svg viewBox="0 0 24 20" className="w-3.5 h-3 overflow-visible" fill="none">
                  {/* Left Loop */}
                  <path d="M 12 10 C 9 4, 3 4, 4 9 C 5 12, 10 11, 12 10 Z" fill="#F48B96" stroke="#E2727E" strokeWidth="0.8" />
                  {/* Right Loop */}
                  <path d="M 12 10 C 15 4, 21 4, 20 9 C 19 12, 14 11, 12 10 Z" fill="#F48B96" stroke="#E2727E" strokeWidth="0.8" />
                  {/* Left Ribbon Tail */}
                  <path d="M 11 11 Q 8 16 6 18 Q 8 16 10 13" fill="#F48B96" stroke="#E2727E" strokeWidth="0.8" strokeLinecap="round" />
                  {/* Right Ribbon Tail */}
                  <path d="M 13 11 Q 16 16 18 18 Q 16 16 14 13" fill="#F48B96" stroke="#E2727E" strokeWidth="0.8" strokeLinecap="round" />
                  {/* Center Knot */}
                  <circle cx="12" cy="10" r="2.2" fill="#E86E7B" stroke="#D35865" strokeWidth="0.7" />
                </svg>
              </div>
            </a>

            <div className="w-[1px] h-4 bg-stone-200/80 mx-0.5" />

            {/* Nav Icon Items */}
            <div className="flex items-center gap-1 sm:gap-1.5">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                const isHovered = hoveredItem === item.id;

                return (
                  <div key={item.id} className="relative flex flex-col items-center">
                    <button
                      onClick={() => handleNavClick(item.id)}
                      onMouseEnter={() => setHoveredItem(item.id)}
                      onMouseLeave={() => setHoveredItem(null)}
                      className={`relative p-2 rounded-full transition-all duration-200 cursor-pointer flex items-center justify-center ${
                        isActive
                          ? 'text-stone-900 font-medium'
                          : 'text-stone-500 hover:text-stone-800 hover:bg-stone-100/60'
                      }`}
                      aria-label={item.label}
                    >
                      {/* Active Indicator Sliding Pill */}
                      {isActive && (
                        <motion.div
                          layoutId="activePill"
                          className="absolute inset-0 bg-[#FCECE9] rounded-full border border-[#F5DDD7] shadow-2xs -z-10"
                          transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                        />
                      )}

                      <Icon size={18} className="transition-transform duration-150 hover:scale-110" />
                    </button>

                    {/* Centered Strictly-Below Hover Tooltip (No Side Expansion Bug!) */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          initial={{ opacity: 0, y: 4, scale: 0.92 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 2, scale: 0.95 }}
                          transition={{ duration: 0.15 }}
                          className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-stone-800 text-stone-100 text-[10px] font-sans font-medium whitespace-nowrap shadow-md pointer-events-none z-50 backdrop-blur-xs"
                        >
                          {item.label}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            <div className="w-[1px] h-4 bg-stone-200/80 mx-0.5" />

            {/* Sound Toggle */}
            <div className="relative flex flex-col items-center">
              <button
                onClick={handleSoundToggle}
                onMouseEnter={() => setHoveredItem('sound')}
                onMouseLeave={() => setHoveredItem(null)}
                className={`p-2 rounded-full transition-colors cursor-pointer flex items-center justify-center ${
                  soundOn ? 'text-emerald-700 hover:bg-emerald-50' : 'text-stone-400 hover:bg-stone-100'
                }`}
                title={soundOn ? 'Mute Studio Sounds' : 'Enable Studio Sounds'}
              >
                {soundOn ? <Volume2 size={17} /> : <VolumeX size={17} />}
              </button>

              <AnimatePresence>
                {hoveredItem === 'sound' && (
                  <motion.div
                    initial={{ opacity: 0, y: 4, scale: 0.92 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 2, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-stone-800 text-stone-100 text-[10px] font-sans font-medium whitespace-nowrap shadow-md pointer-events-none z-50 backdrop-blur-xs"
                  >
                    {soundOn ? 'Sound On' : 'Muted'}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </nav>
        </motion.header>
      )}
    </AnimatePresence>
  );
};

export default TopIslandNav;
