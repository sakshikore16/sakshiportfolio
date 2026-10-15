import React, { useState, useEffect } from 'react';
import { 
  Home, FolderGit2, Sparkles, Cpu, Award, User, Mail, 
  ArrowUp, Volume2, VolumeX, Moon, Sun 
} from 'lucide-react';
import { playClick, playPop, toggleSound, isSoundEnabled } from '../utils/sound';

export const FloatingDock = ({ darkMode, setDarkMode, isWindowOpen = true }) => {
  const [soundOn, setSoundOn] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');

  const scrollToTop = () => {
    playPop();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems = [
    { id: 'about', label: 'About', icon: User, href: '#about' },
    { id: 'experience', label: 'Experience', icon: Award, href: '#experience' },
    { id: 'education', label: 'Education', icon: Sparkles, href: '#education' },
    { id: 'skills', label: 'Skills', icon: Cpu, href: '#skills' },
    { id: 'projects', label: 'Projects', icon: FolderGit2, href: '#projects' },
    { id: 'contact', label: 'Contact', icon: Mail, href: '#contact' },
  ];

  return (
    <div 
      className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 hidden sm:flex items-center gap-1.5 p-2 rounded-full bg-white/75 dark:bg-slate-900/75 border border-white/60 dark:border-white/15 shadow-float backdrop-blur-2xl transition-all duration-500"
      style={{
        opacity: isWindowOpen ? 1 : 0,
        transform: isWindowOpen ? 'translate(-50%, 0)' : 'translate(-50%, 28px)',
        pointerEvents: isWindowOpen ? 'auto' : 'none'
      }}
    >
      
      {/* Home / Top button */}
      <button
        onClick={scrollToTop}
        className="p-2.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 transition-colors"
        title="Scroll to Top"
      >
        <ArrowUp size={16} />
      </button>

      <div className="w-[1px] h-5 bg-black/15 dark:bg-white/15 mx-1" />

      {/* Nav items */}
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <a
            key={item.id}
            href={item.href}
            onClick={() => playClick()}
            className="group relative p-2.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white transition-all hover:scale-110"
            title={item.label}
          >
            <Icon size={16} />
            {/* Tooltip on hover */}
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-black dark:bg-white text-white dark:text-black text-[10px] font-mono font-bold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
              {item.label}
            </span>
          </a>
        );
      })}

      <div className="w-[1px] h-5 bg-black/15 dark:bg-white/15 mx-1" />

      {/* Sound toggle */}
      <button
        onClick={() => {
          const s = toggleSound();
          setSoundOn(s);
        }}
        className={`p-2.5 rounded-full transition-all ${
          soundOn ? 'text-lime-neon bg-black dark:bg-white/10' : 'text-slate-400 hover:bg-black/5'
        }`}
        title={soundOn ? 'Sound On' : 'Muted'}
      >
        {soundOn ? <Volume2 size={15} /> : <VolumeX size={15} />}
      </button>

      {/* Dark mode toggle */}
      <button
        onClick={() => {
          playPop();
          setDarkMode(!darkMode);
        }}
        className="p-2.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 transition-colors"
        title="Toggle Theme"
      >
        {darkMode ? <Sun size={15} className="text-amber-400" /> : <Moon size={15} />}
      </button>

    </div>
  );
};
