import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Moon, Sun, Menu, X, FileText } from 'lucide-react';
import { playClick, playPop, toggleSound } from '../utils/sound';

export const Navbar = ({ darkMode, setDarkMode, onOpenResume, onReplayIntro, isWindowOpen = true }) => {
  const [soundOn, setSoundOn] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoEmoji, setLogoEmoji] = useState('✨');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSoundToggle = () => {
    const newState = toggleSound();
    setSoundOn(newState);
  };

  const handleThemeToggle = () => {
    playPop();
    setDarkMode(!darkMode);
  };

  const emojis = ['✨', '🌸', '💻', '⚡', '☕', '🎨', '🚀'];
  const cycleEmoji = () => {
    playPop();
    const nextIndex = (emojis.indexOf(logoEmoji) + 1) % emojis.length;
    setLogoEmoji(emojis[nextIndex]);
  };

  // Simple, concise section names as requested
  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Education', href: '#education' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'py-2.5 bg-white/80 dark:bg-[#0A0D14]/80 backdrop-blur-2xl border-b border-white/60 dark:border-white/10 shadow-xs' 
          : 'py-3.5 bg-transparent'
      }`}
      style={{
        opacity: isWindowOpen ? 1 : 0,
        transform: isWindowOpen ? 'translateY(0)' : 'translateY(-28px)',
        pointerEvents: isWindowOpen ? 'auto' : 'none'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo - SK Monogram & Subtitle matching presentation mockup */}
          <div className="flex items-center gap-3">
            <button 
              onClick={cycleEmoji}
              className="group relative flex items-center gap-2 p-1.5 px-3 rounded-full bg-white/85 dark:bg-slate-800/85 backdrop-blur-xl border border-white/70 dark:border-white/15 shadow-xs hover:scale-105 transition-all duration-200"
              title="Click to change vibe!"
            >
              <span className="font-serif italic font-normal text-xl sm:text-2xl tracking-wide text-slate-800 dark:text-slate-100">
                SK
              </span>
              <span className="w-1 h-1 rounded-full bg-rose-400 opacity-70" />
              <span className="hidden sm:inline-block font-sans font-semibold text-xs tracking-tight text-slate-600 dark:text-slate-300">
                sakshi<span className="text-rose-500">.</span>kore
              </span>
            </button>
          </div>

          {/* Desktop Nav Links - Clean, Simple Words */}
          <nav className="hidden lg:flex items-center gap-1 bg-white/70 dark:bg-slate-900/70 p-1 rounded-full border border-white/60 dark:border-white/10 backdrop-blur-2xl shadow-xs">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => playClick()}
                className="px-3 py-1 rounded-full text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Utility Controls */}
          <div className="flex items-center gap-2">
            
            {/* Sound FX Toggle */}
            <button
              onClick={handleSoundToggle}
              className={`p-2 rounded-full border transition-all ${
                soundOn 
                  ? 'bg-rose-500/10 border-rose-500/30 text-rose-600 dark:text-rose-400' 
                  : 'bg-black/5 dark:bg-white/5 border-transparent text-slate-400'
              }`}
              title={soundOn ? 'Sound FX Enabled (Click to Mute)' : 'Sound Muted'}
              aria-label="Toggle Sound"
            >
              {soundOn ? <Volume2 size={15} /> : <VolumeX size={15} />}
            </button>

            {/* Theme Toggle */}
            <button
              onClick={handleThemeToggle}
              className="p-2 rounded-full bg-white/80 dark:bg-slate-800/80 border border-black/5 dark:border-white/10 text-slate-700 dark:text-slate-200 hover:rotate-45 transition-transform duration-300 shadow-xs"
              title="Toggle Light / Dark mode"
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun size={15} className="text-amber-400" /> : <Moon size={15} className="text-slate-700" />}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-full bg-white/80 dark:bg-slate-800/80 border border-black/5 dark:border-white/10 text-slate-700 dark:text-slate-200"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>

          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 p-4 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-black/10 dark:border-white/10 shadow-xl space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => {
                  playClick();
                  setMobileMenuOpen(false);
                }}
                className="block px-3 py-2 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-2 border-t border-black/5 dark:border-white/10 flex items-center justify-between">
              <button
                onClick={() => {
                  playPop();
                  onOpenResume();
                  setMobileMenuOpen(false);
                }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/5 dark:bg-white/5 text-xs font-mono font-medium"
              >
                <FileText size={13} className="text-rose-500" />
                <span>View Full Resume</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </header>
  );
};
