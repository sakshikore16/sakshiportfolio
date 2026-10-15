import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AppWindow,
  Camera,
  Briefcase,
  Sprout,
  Layers,
  FolderGit2,
  Award,
  Mail,
  Volume2,
  VolumeX
} from 'lucide-react';
import { playClick, playPop, toggleSound, isSoundEnabled } from '../utils/sound';

export const LeftHoverDock = ({ isWindowOpen = true }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [soundOn, setSoundOn] = useState(true);

  useEffect(() => {
    setSoundOn(isSoundEnabled());
  }, []);

  const navItems = [
    { id: 'hero', label: 'Studio Window', icon: AppWindow },
    { id: 'about', label: 'Curated Scrapbook', icon: Camera },
    { id: 'experience', label: 'Experience Desk', icon: Briefcase },
    { id: 'education', label: 'Academic Trellis', icon: Sprout },
    { id: 'skills', label: 'Skills Drawer', icon: Layers },
    { id: 'projects', label: 'Featured Projects', icon: FolderGit2 },
    { id: 'certifications', label: 'Certifications', icon: Award },
    { id: 'contact', label: 'Send Postcard', icon: Mail },
  ];

  // Track active section with IntersectionObserver
  useEffect(() => {
    const sectionIds = ['hero', 'about', 'experience', 'education', 'skills', 'projects', 'certifications', 'contact'];
    const observers = [];

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -40% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
        observers.push(el);
      }
    });

    return () => {
      observers.forEach((el) => observer.unobserve(el));
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

  const handleToggleSound = () => {
    const newState = toggleSound();
    setSoundOn(newState);
  };

  return (
    <motion.aside
      initial={{ opacity: 0, x: -20 }}
      animate={{
        opacity: isWindowOpen ? 1 : 0,
        x: isWindowOpen ? 0 : -20,
        pointerEvents: isWindowOpen ? 'auto' : 'none'
      }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="fixed left-5 top-1/2 -translate-y-1/2 z-50 select-none hidden sm:block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Side Navigation Dock"
    >
      <motion.div
        layout
        transition={{ type: 'spring', stiffness: 350, damping: 28 }}
        className={`bg-white/75 backdrop-blur-md border border-[#EADBCE]/70 rounded-2xl py-4 shadow-sm flex flex-col ${
          isHovered ? 'px-3.5 items-start w-52' : 'px-2 items-center w-12'
        }`}
      >
        {/* Top: Minimalist "SK" Serif Monogram Logo */}
        <button
          onClick={() => handleNavClick('hero')}
          className="flex items-center gap-2.5 pb-2 text-left group cursor-pointer w-full"
          title="Sakshi Kore Studio"
        >
          <div className="w-8 h-8 rounded-xl bg-[#FAF3EB] border border-[#EADBCE]/80 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <span className="font-serif font-bold text-sm tracking-tight text-[#2D2A26]">SK</span>
          </div>

          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, x: -8, width: 0 }}
                animate={{ opacity: 1, x: 0, width: 'auto' }}
                exit={{ opacity: 0, x: -8, width: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden whitespace-nowrap"
              >
                <span className="font-serif italic font-semibold text-sm text-[#2D2A26] tracking-wide">
                  Sakshi Kore
                </span>
                <span className="block text-[9px] font-mono text-[#8C7A6B] uppercase tracking-wider">
                  Portfolio Studio
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </button>

        {/* Subtle Separator */}
        <div className="w-full h-px bg-[#EADBCE]/60 my-1" />

        {/* Center: Navigation Section Items */}
        <div className="flex flex-col gap-1 w-full py-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`group relative flex items-center gap-2.5 py-1.5 px-1.5 rounded-xl text-xs transition-colors duration-200 cursor-pointer w-full ${
                  isActive
                    ? 'bg-[#FAF3EB] text-[#2D2A26] font-medium'
                    : 'text-[#6E675F] hover:bg-black/[0.03] hover:text-[#2D2A26]'
                }`}
                title={item.label}
              >
                {/* Icon with active indicator dot in collapsed mode */}
                <div className="relative flex items-center justify-center shrink-0 w-5 h-5">
                  <Icon
                    size={16}
                    className={`transition-colors ${
                      isActive ? 'text-[#E07A5F]' : 'text-[#8C7A6B] group-hover:text-[#2D2A26]'
                    }`}
                  />
                  {!isHovered && isActive && (
                    <motion.span
                      layoutId="active-dot-collapsed"
                      className="absolute -left-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#E07A5F]"
                    />
                  )}
                </div>

                {/* Sliding label in expanded mode */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -6 }}
                      transition={{ duration: 0.18 }}
                      className="flex items-center justify-between flex-1 overflow-hidden whitespace-nowrap"
                    >
                      <span className="text-[11px] font-sans tracking-tight">
                        {item.label}
                      </span>
                      {isActive && (
                        <motion.span
                          layoutId="active-pill-expanded"
                          className="w-1.5 h-1.5 rounded-full bg-[#E07A5F] ml-2 shrink-0"
                        />
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            );
          })}
        </div>

        {/* Subtle Separator */}
        <div className="w-full h-px bg-[#EADBCE]/60 my-1" />

        {/* Bottom: Sound Toggle */}
        <button
          onClick={handleToggleSound}
          className={`group flex items-center gap-2.5 py-1.5 px-1.5 rounded-xl text-xs transition-colors duration-200 cursor-pointer w-full text-[#6E675F] hover:bg-black/[0.03] hover:text-[#2D2A26]`}
          title={soundOn ? 'Mute Sound Effects' : 'Enable Sound Effects'}
        >
          <div className="flex items-center justify-center shrink-0 w-5 h-5 text-[#8C7A6B] group-hover:text-[#2D2A26]">
            {soundOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </div>

          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -6 }}
                transition={{ duration: 0.18 }}
                className="flex items-center justify-between flex-1 overflow-hidden whitespace-nowrap"
              >
                <span className="text-[11px] font-sans tracking-tight">
                  {soundOn ? 'Sound On' : 'Sound Muted'}
                </span>
                <span className="text-[9px] font-mono text-[#8C7A6B]">
                  {soundOn ? '🔊' : '🔇'}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </motion.div>
    </motion.aside>
  );
};

export default LeftHoverDock;
