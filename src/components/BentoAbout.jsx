import React, { useState } from 'react';
import { 
  Music, Heart, Coffee, BookOpen, Laptop, Sparkles, 
  Smile, Compass, Code, Palette, Play, Pause, ExternalLink
} from 'lucide-react';
import { playClick, playPop } from '../utils/sound';

export const BentoAbout = () => {
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [balance, setBalance] = useState(50); // 0 = Design, 100 = Code

  const toggleMusic = () => {
    playPop();
    setIsPlayingMusic(!isPlayingMusic);
  };

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-dots-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/10 border border-brand-orange/30 text-brand-orange text-xs font-mono font-bold uppercase tracking-wider mb-3">
              <span>✦ Inside Sakshi's Mind</span>
            </div>
            <h2 className="font-syne font-extrabold text-3xl sm:text-5xl text-black dark:text-white tracking-tight">
              Human Curiosity meets <br className="hidden sm:inline" />
              <span className="text-brand-orange">Engineering Rigor.</span>
            </h2>
          </div>
          <p className="font-sans text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-md">
            I don’t treat design and engineering as two distant continents. Good interfaces require technical empathy; solid software demands human warmth.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Bento Item 1: The Core Narrative (Span 7) */}
          <div className="md:col-span-7 p-6 sm:p-8 rounded-3xl bg-white dark:bg-paper-cardDark border-2 border-black dark:border-white/15 shadow-neo relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-brand-purple dark:text-purple-400">
                  // THE ORIGIN & PHILOSOPHY
                </span>
                <span className="text-2xl">🌱</span>
              </div>

              <h3 className="font-syne font-bold text-2xl sm:text-3xl text-black dark:text-white leading-snug">
                I started by questioning why digital products feel so robotic.
              </h3>

              <p className="font-sans text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                As a Computer Science student with an obsession for human behavior, I realized early on that code without UX empathy is just empty logic, and pretty Figma designs without technical grounding often crumble during implementation.
              </p>

              <p className="font-sans text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                My sweet spot is owning the product lifecycle end-to-end: conducting user research interviews, designing design systems with crisp spacing tokens in Figma, and engineering the full-stack architecture with React, Next.js, FastAPI, and AI.
              </p>
            </div>

            {/* Bottom Quote Stamp */}
            <div className="mt-8 pt-6 border-t border-black/10 dark:border-white/10 flex items-center justify-between">
              <span className="font-caveat text-xl sm:text-2xl font-bold text-brand-purple dark:text-purple-300">
                “Every micro-interaction is an opportunity to make someone smile.”
              </span>
              <span className="stamp px-2 py-0.5 text-xs text-brand-orange border-brand-orange">
                ORIGINAL
              </span>
            </div>
          </div>

          {/* Bento Item 2: Interactive Design vs Code Balance (Span 5) */}
          <div className="md:col-span-5 p-6 sm:p-8 rounded-3xl bg-white dark:bg-paper-cardDark border-2 border-black dark:border-white/15 shadow-neo flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                  // MY DUAL SUPERPOWER
                </span>
                <span className="text-xl">⚖️</span>
              </div>

              <h3 className="font-syne font-bold text-xl text-black dark:text-white mb-2">
                The Balance Slider
              </h3>
              <p className="font-sans text-xs text-slate-500 dark:text-slate-400 mb-6">
                Drag the slider to see how my thought process adapts across different stages of product delivery:
              </p>

              {/* Slider */}
              <div className="space-y-4">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={balance}
                  onChange={(e) => {
                    playClick();
                    setBalance(Number(e.target.value));
                  }}
                  className="w-full accent-lime-neon cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
                />

                <div className="flex justify-between text-xs font-mono font-bold">
                  <span className={balance < 50 ? 'text-brand-orange' : 'text-slate-400'}>
                    🎨 100% UI/UX & Empathy
                  </span>
                  <span className={balance >= 50 ? 'text-brand-purple' : 'text-slate-400'}>
                    💻 100% Code & Architecture
                  </span>
                </div>
              </div>

              {/* Dynamic State Feedback */}
              <div className="mt-6 p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">
                <div className="text-xs font-mono font-bold uppercase text-slate-500 mb-1">
                  Active Mindset ({balance}% Tech):
                </div>
                <div className="text-sm font-sans font-medium text-black dark:text-white">
                  {balance <= 30 && "Figma Auto-layout, Usability interviews, WCAG AAA accessibility, Micro-copy clarity, and Motion choreographies."}
                  {balance > 30 && balance < 70 && "Bridging design tokens with CSS variables, component props design, developer handoff clarity, and rapid React prototypes."}
                  {balance >= 70 && "Server-side rendering, REST & WebSocket APIs, LangChain agents, database indexes, and sub-100ms UI response latencies."}
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-black/10 dark:border-white/10 text-right">
              <span className="text-xs font-mono text-slate-400">
                Status: Harmonized (Both sides active)
              </span>
            </div>
          </div>

          {/* Bento Item 3: Currently Playing Spotify Widget (Span 4) */}
          <div className="md:col-span-4 p-6 rounded-3xl bg-slate-900 text-white border-2 border-black dark:border-white/15 shadow-neo relative overflow-hidden flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                <Music size={14} className="animate-spin-slow" />
                <span className="uppercase tracking-wider">Soundtrack</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-mono">
                SPOTIFY
              </span>
            </div>

            <div className="my-auto space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-tr from-brand-orange via-brand-purple to-lime-neon flex items-center justify-center text-2xl shadow-md flex-shrink-0">
                  🎧
                </div>
                <div className="overflow-hidden">
                  <h4 className="font-syne font-bold text-base truncate">
                    Glue Song (feat. Clairo)
                  </h4>
                  <p className="font-sans text-xs text-slate-400 truncate">
                    beabadoobee • Focus Playlist
                  </p>
                </div>
              </div>

              {/* Audio Visualizer Bars */}
              <div className="flex items-end gap-1.5 h-7 pt-2">
                {[60, 100, 45, 80, 95, 30, 85, 50, 75, 40, 90, 65].map((h, i) => (
                  <span
                    key={i}
                    style={{ height: isPlayingMusic ? `${h}%` : '20%' }}
                    className={`w-1 rounded-full transition-all duration-300 ${
                      isPlayingMusic ? 'bg-lime-neon' : 'bg-slate-700'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
              <button
                onClick={toggleMusic}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-mono font-medium transition-colors"
              >
                {isPlayingMusic ? <Pause size={12} /> : <Play size={12} />}
                <span>{isPlayingMusic ? 'Vibing Now' : 'Simulate Play'}</span>
              </button>
              <span className="text-[11px] font-mono text-slate-400">
                {isPlayingMusic ? 'Loop: ON' : 'Paused'}
              </span>
            </div>
          </div>

          {/* Bento Item 4: Desk Artifacts & Favorites (Span 5) */}
          <div className="md:col-span-5 p-6 rounded-3xl bg-white dark:bg-paper-cardDark border-2 border-black dark:border-white/15 shadow-neo flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-500">
                  // DESK ESSENTIALS
                </span>
                <Coffee size={18} className="text-amber-500" />
              </div>

              <div className="space-y-2.5">
                {[
                  { icon: "☕", label: "Chai over coffee, every morning without fail" },
                  { icon: "🎨", label: "Figma with 40+ keyboard shortcuts memorized" },
                  { icon: "💻", label: "VS Code with Tokyo Night & JetBrains Mono font" },
                  { icon: "📖", label: "Currently Reading: Don't Make Me Think (Steve Krug)" },
                  { icon: "🌱", label: "Believer in: Kind humans, clean git trees, and crisp shadows" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm font-sans text-slate-700 dark:text-slate-300 p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                    <span className="text-base flex-shrink-0">{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-black/10 dark:border-white/10 flex items-center justify-between text-xs font-mono text-slate-500">
              <span>Setup: macOS + Mechanical Keeb</span>
              <span className="text-brand-orange font-bold">100% Focused</span>
            </div>
          </div>

          {/* Bento Item 5: Quick Value Card (Span 3) */}
          <div className="md:col-span-3 p-6 rounded-3xl bg-lime-neon text-black border-2 border-black shadow-neo flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono font-black uppercase tracking-wider">
                QUICK SUMMARY
              </span>
              <h4 className="font-syne font-black text-2xl mt-2 leading-tight">
                What you get when we collaborate:
              </h4>
            </div>

            <ul className="space-y-2 my-4 text-xs font-mono font-bold">
              <li className="flex items-center gap-2">
                <span>✦</span> Zero design handoff friction
              </li>
              <li className="flex items-center gap-2">
                <span>✦</span> Accessible & performant code
              </li>
              <li className="flex items-center gap-2">
                <span>✦</span> Clean micro-interactions
              </li>
              <li className="flex items-center gap-2">
                <span>✦</span> Fast iteration speed
              </li>
            </ul>

            <a
              href="#contact"
              onClick={() => playPop()}
              className="px-4 py-2 rounded-xl bg-black text-white text-xs font-syne font-bold text-center hover:scale-105 transition-transform"
            >
              Let’s Build Something ↗
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};
