import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, ChevronLeft, Sparkles, MapPin, 
  Clock, ArrowUpRight, Heart, ExternalLink, FileText 
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { playClick, playPop, playSticker } from '../utils/sound';

export const VintageAlbum = ({ onOpenResume }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [cardPopped, setCardPopped] = useState(false);

  const pages = [
    {
      id: "cover",
      tab: "Cover • Intro",
      stamp: "VOL. 26",
      title: "Designing with soul, engineering with craft.",
      subtitle: "Product Designer & Full-Stack Creative based in Mumbai, India.",
      polaroidTitle: "Sakshi Kore",
      polaroidCaption: "Designing & coding at 2:00 AM ☕",
      polaroidEmoji: "👩🏻‍💻",
      note: "✦ Tap the page corner or next arrow to flip the album!",
      details: [
        { label: "Role", val: "UI/UX & Full-Stack" },
        { label: "Focus", val: "Figma, React, AI" },
        { label: "Status", val: "Open for 2025/2026 Roles" }
      ]
    },
    {
      id: "philosophy",
      tab: "Page 02 • Philosophy",
      stamp: "THE HYBRID",
      title: "Where human intuition meets computational logic.",
      subtitle: "Why pick between Figma and Code when the magic happens at their intersection?",
      polaroidTitle: "Design + Code",
      polaroidCaption: "Figma Tokens ⇄ Production CSS",
      polaroidEmoji: "🎨",
      note: "“Good UI respects human cognitive load; great code makes it feel weightless.”",
      details: [
        { label: "Design", val: "Design Systems & Research" },
        { label: "Engineering", val: "React, Next.js, FastAPI" },
        { label: "AI", val: "RAG & LLM Workflows" }
      ]
    },
    {
      id: "milestones",
      tab: "Page 03 • Milestones",
      stamp: "HONORS 🏆",
      title: "Selected achievements & hackathon podiums.",
      subtitle: "Proven ability to take concepts from zero to polished production fast.",
      polaroidTitle: "Hackathon Winner",
      polaroidCaption: "National Innovation Sprint • 1st Place",
      polaroidEmoji: "🏆",
      note: "Built 18+ high-delight apps, 4 design systems, and mentored 150+ peers.",
      details: [
        { label: "Podiums", val: "3x Hackathon Wins" },
        { label: "Users", val: "12K+ Test Sessions" },
        { label: "Community", val: "1,400+ Figma Clones" }
      ]
    }
  ];

  const handleNext = () => {
    playPop();
    setCurrentPage((prev) => (prev + 1) % pages.length);
  };

  const handlePrev = () => {
    playPop();
    setCurrentPage((prev) => (prev - 1 + pages.length) % pages.length);
  };

  const current = pages[currentPage];

  return (
    <div className="relative max-w-4xl mx-auto">
      
      {/* Decorative Washi Tape on top of Album */}
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-44 h-7 bg-amber-200/90 dark:bg-amber-400/80 border border-amber-300 dark:border-amber-500 shadow-sm rotate-[-1deg] z-20 flex items-center justify-center pointer-events-none rounded-sm">
        <span className="text-[10px] font-mono font-black text-amber-900 tracking-widest uppercase">
          ✦ SAKSHI'S CREATIVE ALBUM ✦
        </span>
      </div>

      {/* Album Binder Shell */}
      <div className="relative rounded-3xl bg-[#F5EFEB] dark:bg-[#1A1C24] p-3 sm:p-5 border-2 border-black dark:border-white/15 shadow-2xl overflow-hidden">
        
        {/* Book Spine Rings (Left on desktop) */}
        <div className="absolute left-2 top-0 bottom-0 w-6 hidden md:flex flex-col justify-around py-6 z-20 pointer-events-none opacity-40">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="w-4 h-4 rounded-full border-2 border-black dark:border-white/40 bg-slate-300 dark:bg-slate-700 shadow-inner" />
          ))}
        </div>

        {/* Inner Page Paper */}
        <div className="relative rounded-2xl bg-[#FCFAF6] dark:bg-[#13151B] border border-black/10 dark:border-white/10 p-6 sm:p-10 md:pl-14 shadow-inner min-h-[440px] flex flex-col justify-between overflow-hidden">
          
          {/* Subtle paper grain lines */}
          <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

          {/* Top Page Header & Tabs */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-black/10 dark:border-white/10">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded bg-black/5 dark:bg-white/10 text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
                {current.tab}
              </span>
              <span className="stamp px-2 py-0.5 text-[10px] text-brand-orange border-brand-orange">
                {current.stamp}
              </span>
            </div>

            {/* Page Navigation Controls */}
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5 mr-2">
                {pages.map((p, idx) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      playClick();
                      setCurrentPage(idx);
                    }}
                    className={`h-2 rounded-full transition-all ${
                      currentPage === idx 
                        ? 'w-6 bg-lime-neon border border-black dark:border-white' 
                        : 'w-2 bg-black/20 dark:bg-white/20'
                    }`}
                    title={`Jump to ${p.tab}`}
                  />
                ))}
              </div>

              <button
                onClick={handlePrev}
                className="p-1.5 rounded-full bg-white dark:bg-paper-cardDark border border-black/15 dark:border-white/15 hover:bg-black/5 dark:hover:bg-white/5 shadow-sm transition-transform active:scale-95"
                title="Previous Leaf"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={handleNext}
                className="p-1.5 rounded-full bg-lime-neon text-black border border-black hover:scale-105 shadow-sm transition-transform active:scale-95"
                title="Turn Next Page"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Page Content: Animated Transition */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, x: 25, rotateY: 10 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              exit={{ opacity: 0, x: -25, rotateY: -10 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="relative z-10 py-6 grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
            >
              
              {/* Left Column: Editorial Text (Span 7) */}
              <div className="md:col-span-7 space-y-4">
                <h2 className="font-syne font-black text-2xl sm:text-4xl text-black dark:text-white leading-tight">
                  {current.title}
                </h2>

                <p className="font-sans text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                  {current.subtitle}
                </p>

                {/* Details Pill Matrix */}
                <div className="grid grid-cols-3 gap-2 pt-2">
                  {current.details.map((d, i) => (
                    <div key={i} className="p-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 text-center">
                      <div className="font-mono text-[10px] text-slate-400 uppercase">
                        {d.label}
                      </div>
                      <div className="font-syne font-bold text-xs text-black dark:text-white truncate">
                        {d.val}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Hand-drawn Note */}
                <div className="pt-2 flex items-center gap-2">
                  <span className="font-caveat text-xl sm:text-2xl text-brand-purple dark:text-purple-300 font-bold">
                    {current.note}
                  </span>
                </div>
              </div>

              {/* Right Column: Polaroid with Pop-Out Card Effect (Span 5) */}
              <div className="md:col-span-5 flex justify-center relative">
                
                {/* Golden Paper Binder Clip on top of Polaroid */}
                <div className="absolute -top-4 right-10 w-6 h-8 z-20 pointer-events-none flex items-center justify-center">
                  <div className="w-5 h-7 rounded-sm border-2 border-amber-500 bg-amber-400/80 shadow-md rotate-[-8deg]" />
                </div>

                {/* The Polaroid Card */}
                <motion.div
                  whileHover={{ scale: 1.04, rotate: 0 }}
                  onClick={() => {
                    playSticker();
                    setCardPopped(!cardPopped);
                  }}
                  className={`polaroid relative w-64 rounded-2xl cursor-pointer select-none transition-all duration-300 ${
                    cardPopped ? 'rotate-0 shadow-2xl scale-105' : 'rotate-[2.5deg] shadow-neo'
                  } border-2 border-black dark:border-white/20`}
                  title="Click to pop polaroid!"
                >
                  {/* Photo area */}
                  <div className="aspect-[4/3.8] rounded-xl bg-gradient-to-tr from-slate-900 via-indigo-950 to-slate-800 p-4 flex flex-col justify-between text-white relative overflow-hidden border border-white/10">
                    <div className="flex items-center justify-between text-[10px] font-mono text-lime-neon font-bold">
                      <span>MEMO #{currentPage + 1}</span>
                      <span className="animate-pulse">● LIVE</span>
                    </div>

                    <div className="text-center my-auto">
                      <div className="text-4xl sm:text-5xl mb-2 animate-bounce">
                        {current.polaroidEmoji}
                      </div>
                      <div className="font-syne font-bold text-sm text-white">
                        {current.polaroidTitle}
                      </div>
                    </div>

                    <div className="text-[10px] font-mono text-slate-300 text-center border-t border-white/10 pt-1">
                      {current.polaroidCaption}
                    </div>
                  </div>

                  {/* Caption beneath photo */}
                  <div className="pt-3 px-1 flex items-center justify-between">
                    <span className="font-caveat text-lg font-bold text-black dark:text-white">
                      “Tap to pop out”
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      ★ 2025
                    </span>
                  </div>
                </motion.div>

              </div>

            </motion.div>
          </AnimatePresence>

          {/* Bottom Album Bar */}
          <div className="relative z-10 pt-4 border-t border-black/10 dark:border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-500">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Sakshi Kore • Digital Scrapbook</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={onOpenResume}
                className="hover:text-black dark:hover:text-white underline font-bold transition-colors"
              >
                Read Full Resume PDF ↗
              </button>
              <span>•</span>
              <a
                href="#projects"
                onClick={() => playClick()}
                className="text-brand-orange hover:underline font-bold"
              >
                Browse Projects Below ↓
              </a>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
