import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, ArrowDown, MapPin, Clock, Coffee, Terminal, 
  ExternalLink, Layers, Heart, Code2, Palette, Cpu
} from 'lucide-react';
import { personalInfo, moodOptions } from '../data/portfolioData';
import { playClick, playPop, playSticker } from '../utils/sound';

export const Hero = ({ onOpenResume, onOpenCaseStudy }) => {
  const [currentMood, setCurrentMood] = useState(moodOptions[0]);
  const [liveTime, setLiveTime] = useState('');

  // Live ticking clock in IST
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = { 
        timeZone: 'Asia/Kolkata', 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit',
        hour12: true 
      };
      setLiveTime(new Intl.DateTimeFormat('en-US', options).format(now));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleMoodSelect = (mood) => {
    playPop();
    setCurrentMood(mood);
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-grid-pattern">
      
      {/* Decorative ambient gradient blobs */}
      <div className="absolute top-12 left-1/4 w-96 h-96 bg-lime-neon/15 dark:bg-lime-neon/10 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse-subtle" />
      <div className="absolute top-48 right-10 w-96 h-96 bg-brand-purple/15 dark:bg-brand-purple/10 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse-subtle" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-brand-orange/10 dark:bg-brand-orange/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* Top Editorial Ribbon / Stamp */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-paper-cardDark border-2 border-black dark:border-white/20 shadow-neo-sm text-xs font-mono font-bold uppercase tracking-wider text-black dark:text-white">
            <span className="w-2 h-2 rounded-full bg-lime-neon animate-ping" />
            <span>Product Designer & Full-Stack Engineer</span>
          </div>
          
          <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-200 border border-amber-300 dark:border-amber-700/50 text-xs font-caveat text-base font-bold rotate-[-1.5deg]">
            <span>✨ Creative outside, technical underneath!</span>
          </div>
        </div>

        {/* Main Grid: Headline + Tactile Polaroid Bento */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Big Statement & Personal Story */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="relative">
              <h1 className="font-syne font-extrabold text-4xl sm:text-6xl xl:text-7xl leading-[1.08] tracking-tight text-slate-900 dark:text-white">
                Designing <span className="underline decoration-wavy decoration-lime-neon decoration-3">soulful</span> UI,{' '}
                <br />
                engineering <span className="relative inline-block text-brand-orange dark:text-brand-orange">
                  living
                  <svg className="absolute -bottom-2 left-0 w-full h-3 text-brand-orange/40" viewBox="0 0 100 20" preserveAspectRatio="none">
                    <path d="M0,10 Q50,0 100,10" fill="none" stroke="currentColor" strokeWidth="4" />
                  </svg>
                </span> code.
              </h1>

              {/* Hand-drawn marker note */}
              <div className="hidden md:block absolute -top-8 right-8 rotate-6 pointer-events-none">
                <span className="font-caveat text-xl font-bold text-brand-purple dark:text-purple-300">
                  bridging design + AI + systems ↗
                </span>
              </div>
            </div>

            <p className="font-sans text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
              Hello! I'm <strong className="text-black dark:text-white font-bold">Sakshi Kore</strong>. I craft high-delight design systems, human-centered UI/UX prototypes in Figma, and build them from scratch into production-grade React, Node, and AI applications.
            </p>

            {/* Interactive Live Mood Selector */}
            <div className="p-4 rounded-2xl bg-white/80 dark:bg-paper-cardDark/80 border-2 border-black/10 dark:border-white/10 backdrop-blur-sm shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Current Mood & Activity:
                </span>
                <span className="text-xs font-mono text-slate-400">interactive</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {moodOptions.map((mood) => {
                  const isSelected = currentMood.id === mood.id;
                  return (
                    <button
                      key={mood.id}
                      onClick={() => handleMoodSelect(mood)}
                      className={`flex items-center gap-2 p-2 rounded-xl text-xs font-semibold transition-all duration-200 border text-left ${
                        isSelected
                          ? 'bg-lime-neon text-black border-black shadow-neo-sm scale-[1.02]'
                          : 'bg-black/5 dark:bg-white/5 border-transparent text-slate-700 dark:text-slate-300 hover:border-black/20 dark:hover:border-white/20'
                      }`}
                    >
                      <span className="text-base">{mood.emoji}</span>
                      <span className="truncate">{mood.label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="pt-2 text-xs font-mono text-slate-600 dark:text-slate-400 flex items-center gap-2">
                <span className="font-bold text-brand-orange">↳ Focus:</span>
                <span className="italic">{currentMood.detail}</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#projects"
                onClick={() => playClick()}
                className="group flex items-center gap-2 px-6 py-3.5 rounded-xl bg-black dark:bg-lime-neon text-white dark:text-black font-syne font-bold text-sm shadow-neo hover:translate-x-0.5 hover:-translate-y-0.5 transition-all"
              >
                <span>Explore Work & Case Studies</span>
                <ArrowDown size={16} className="group-hover:translate-y-1 transition-transform" />
              </a>

              <a
                href="#lab"
                onClick={() => playPop()}
                className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white dark:bg-paper-cardDark border-2 border-black dark:border-white/20 text-black dark:text-white font-syne font-bold text-sm shadow-neo-sm hover:shadow-neo hover:-translate-y-0.5 transition-all"
              >
                <Sparkles size={16} className="text-brand-orange" />
                <span>Interactive Lab</span>
              </a>

              <button
                onClick={() => {
                  playPop();
                  onOpenResume();
                }}
                className="flex items-center gap-1.5 px-4 py-3.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-black/5 dark:hover:bg-white/5 font-mono text-xs font-semibold transition-colors"
              >
                <span>Read CV / Resume</span>
              </button>
            </div>

            {/* Quick Stat Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-black/10 dark:border-white/10">
              {personalInfo.stats.map((stat, i) => (
                <div key={i} className="p-3 rounded-xl bg-white/60 dark:bg-paper-cardDark/60 border border-black/5 dark:border-white/5">
                  <div className="font-syne font-extrabold text-2xl text-black dark:text-white">
                    {stat.value}
                  </div>
                  <div className="font-mono text-xs text-slate-500 dark:text-slate-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: Creative Polaroid & Draggable Stickers Canvas */}
          <div className="lg:col-span-5 relative flex justify-center">
            
            {/* Draggable Sticky Note 1 */}
            <motion.div
              drag
              dragConstraints={{ left: -30, right: 30, top: -30, bottom: 30 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onDragStart={() => playSticker()}
              className="absolute -top-6 -left-4 z-20 cursor-grab active:cursor-grabbing hidden sm:block"
            >
              <div className="px-3.5 py-2 rounded-lg bg-lime-neon text-black font-caveat text-xl font-bold shadow-neo border-2 border-black rotate-[-6deg]">
                ✨ 0% Boring, 100% Tactile
              </div>
            </motion.div>

            {/* Draggable Sticky Note 2 */}
            <motion.div
              drag
              dragConstraints={{ left: -30, right: 30, top: -30, bottom: 30 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onDragStart={() => playSticker()}
              className="absolute -bottom-6 -right-2 z-20 cursor-grab active:cursor-grabbing hidden sm:block"
            >
              <div className="px-3.5 py-2 rounded-lg bg-brand-coral text-white font-mono text-xs font-bold shadow-neo border-2 border-black rotate-[4deg]">
                ⚡ Drag me anywhere!
              </div>
            </motion.div>

            {/* Main Creative Card (Polaroid Style) */}
            <div className="polaroid relative w-full max-w-sm rounded-2xl rotate-[1.5deg] hover:rotate-0 transition-transform duration-300 border-2 border-black dark:border-white/20 shadow-neo">
              
              {/* Washi Tape Strip on Top */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-28 h-6 bg-amber-200/90 dark:bg-amber-400/80 border border-amber-300 dark:border-amber-500 shadow-sm rotate-[-1deg] z-10 opacity-90 rounded-sm flex items-center justify-center">
                <span className="text-[10px] font-mono font-bold text-amber-900 tracking-wider uppercase">
                  SAKSHI • PORTFOLIO
                </span>
              </div>

              {/* Graphic Card Inner Box */}
              <div className="relative aspect-[4/4.2] rounded-xl overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 p-6 flex flex-col justify-between text-white border border-white/10">
                
                {/* Background Geometric Grid Art */}
                <div className="absolute inset-0 bg-dots-pattern opacity-20 pointer-events-none" />
                
                {/* Top Badges */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-md bg-white/15 backdrop-blur-sm text-[11px] font-mono uppercase tracking-widest text-lime-neon font-bold border border-lime-neon/30">
                    UI/UX × TECH
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono flex items-center gap-1.5 border border-emerald-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    LIVE IN IST
                  </span>
                </div>

                {/* Center Visual: The Design & Code Emblem */}
                <div className="relative z-10 my-auto text-center space-y-3">
                  <div className="relative inline-block">
                    <div className="w-24 h-24 mx-auto rounded-2xl bg-gradient-to-tr from-lime-neon via-brand-coral to-brand-purple p-0.5 shadow-glow-lime animate-float">
                      <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-3xl">
                        👩🏻‍💻
                      </div>
                    </div>
                    {/* Tiny badge */}
                    <span className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded bg-lime-neon text-black text-[9px] font-mono font-black border border-black">
                      V2.6
                    </span>
                  </div>

                  <div>
                    <h3 className="font-syne font-black text-xl text-white">
                      Sakshi Kore
                    </h3>
                    <p className="font-sans text-xs text-slate-300">
                      Product Designer · Frontend Engineer
                    </p>
                  </div>

                  {/* Skill Pills */}
                  <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
                    <span className="px-2 py-0.5 rounded bg-white/10 text-[10px] font-mono text-slate-200">
                      Figma
                    </span>
                    <span className="px-2 py-0.5 rounded bg-white/10 text-[10px] font-mono text-slate-200">
                      React & Next
                    </span>
                    <span className="px-2 py-0.5 rounded bg-white/10 text-[10px] font-mono text-slate-200">
                      Tailwind
                    </span>
                    <span className="px-2 py-0.5 rounded bg-white/10 text-[10px] font-mono text-slate-200">
                      FastAPI & AI
                    </span>
                  </div>
                </div>

                {/* Bottom Meta Widget */}
                <div className="relative z-10 pt-3 border-t border-white/15 flex items-center justify-between text-[11px] font-mono text-slate-300">
                  <div className="flex items-center gap-1">
                    <MapPin size={12} className="text-brand-coral" />
                    <span>Mumbai, India</span>
                  </div>
                  <div className="flex items-center gap-1 text-lime-neon font-semibold">
                    <Clock size={12} />
                    <span>{liveTime || '04:30 PM'}</span>
                  </div>
                </div>

              </div>

              {/* Bottom Handwritten Caption */}
              <div className="pt-3 px-1 flex items-center justify-between text-black dark:text-white">
                <span className="font-caveat text-xl font-bold">
                  “Design gives it soul, code gives it breath.”
                </span>
                <span className="text-xs font-mono font-bold text-slate-400">
                  ✦ SK
                </span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
