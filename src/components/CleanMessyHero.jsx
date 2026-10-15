import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, Grid, Shuffle, ArrowDown, MapPin, 
  Clock, ArrowUpRight, Heart, Coffee, Layers, Code, Palette 
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { playClick, playPop, playSticker } from '../utils/sound';

export const CleanMessyHero = ({ onExploreProjects, onOpenContact }) => {
  const [isOrganized, setIsOrganized] = useState(false);

  // 7 Creative scattered artifacts across the desk
  const scatteredItems = [
    {
      id: 1,
      title: "Design System Token",
      detail: "4px Grid • WCAG AAA",
      emoji: "🎨",
      color: "bg-[#FFE66D] text-black border-black",
      scatterPos: { x: -24, y: -18, rotate: -7 },
      gridPos: { x: 0, y: 0, rotate: 0 }
    },
    {
      id: 2,
      title: "Chai Ritual",
      detail: "Fuel for 2:00 AM Figma flow",
      emoji: "☕",
      color: "bg-[#FF6B6B] text-white border-black",
      scatterPos: { x: 28, y: -26, rotate: 9 },
      gridPos: { x: 0, y: 0, rotate: 0 }
    },
    {
      id: 3,
      title: "React & Spring Physics",
      detail: "Sub-16ms layout animations",
      emoji: "⚡",
      color: "bg-[#4ECDC4] text-black border-black",
      scatterPos: { x: -32, y: 15, rotate: 6 },
      gridPos: { x: 0, y: 0, rotate: 0 }
    },
    {
      id: 4,
      title: "Film Photography",
      detail: "Analog shadows & framing",
      emoji: "📷",
      color: "bg-[#B388FF] text-white border-black",
      scatterPos: { x: 34, y: 20, rotate: -8 },
      gridPos: { x: 0, y: 0, rotate: 0 }
    },
    {
      id: 5,
      title: "AI & Multimodal Agents",
      detail: "Gemini 1.5 & vector retrieval",
      emoji: "✨",
      color: "bg-[#FF85A1] text-black border-black",
      scatterPos: { x: 0, y: -38, rotate: -3 },
      gridPos: { x: 0, y: 0, rotate: 0 }
    },
    {
      id: 6,
      title: "User Empathy First",
      detail: "Zero cognitive friction",
      emoji: "🧠",
      color: "bg-[#C7F464] text-black border-black",
      scatterPos: { x: -15, y: 35, rotate: 4 },
      gridPos: { x: 0, y: 0, rotate: 0 }
    }
  ];

  const toggleLayout = () => {
    playPop();
    setIsOrganized(!isOrganized);
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      
      {/* Delicate colorful ambient glows */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-[#FFE66D]/20 dark:bg-[#FFE66D]/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-40 right-1/4 w-96 h-96 bg-[#FF6B6B]/15 dark:bg-[#FF6B6B]/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-1/3 w-96 h-96 bg-[#4ECDC4]/15 dark:bg-[#4ECDC4]/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        
        {/* Subtle Top Metadata Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-canvas-cardDark border border-black/10 dark:border-white/10 shadow-sm text-xs font-mono text-slate-600 dark:text-slate-300">
          <span className="w-2 h-2 rounded-full bg-[#4ECDC4] animate-pulse" />
          <span>Sakshi Kore</span>
          <span className="text-slate-300 dark:text-slate-600">•</span>
          <span className="font-light">Product Designer & Full-Stack Creative</span>
          <span className="text-slate-300 dark:text-slate-600">•</span>
          <span className="text-[#FF6B6B] font-medium">Mumbai, India</span>
        </div>

        {/* Elegant Thin Editorial Headline */}
        <div className="space-y-4 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-slate-900 dark:text-white leading-[1.1]">
            Designing <span className="font-serif italic font-normal text-[#FF6B6B]">digital feelings</span>, <br />
            engineering <span className="font-serif italic font-normal text-[#4ECDC4]">living</span> systems.
          </h1>

          <p className="text-base sm:text-xl font-light text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            I craft thoughtful user interfaces where aesthetic elegance, accessible design systems, and robust AI engineering come together.
          </p>
        </div>

        {/* Action CTAs & Interactive Layout Switch */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <a
            href="#projects"
            onClick={() => playClick()}
            className="px-6 py-3 rounded-full bg-black dark:bg-white text-white dark:text-black text-xs sm:text-sm font-medium hover:scale-105 transition-all shadow-sm flex items-center gap-2"
          >
            <span>Explore Curated Projects</span>
            <ArrowDown size={14} />
          </a>

          <a
            href="#about"
            onClick={() => playClick()}
            className="px-5 py-3 rounded-full bg-white dark:bg-canvas-cardDark border border-black/15 dark:border-white/15 text-xs sm:text-sm font-light text-slate-800 dark:text-slate-200 hover:border-black/40 transition-all"
          >
            Read Story & Hobbies ↗
          </a>

          {/* Clean Messy Toggle Button */}
          <button
            onClick={toggleLayout}
            className="px-4 py-3 rounded-full bg-[#FFE66D] text-black text-xs font-mono font-bold hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 shadow-sm border border-black/20"
            title="Toggle between clean grid and creative scattered desk!"
          >
            {isOrganized ? <Shuffle size={13} /> : <Grid size={13} />}
            <span>{isOrganized ? "🎨 Scatter Creatively" : "📐 Snap to Clean Grid"}</span>
          </button>
        </div>

        {/* The Clean Messy Interactive Studio Canvas */}
        <div className="relative pt-12 pb-6">
          <div className="text-[11px] font-mono text-slate-400 mb-4 flex items-center justify-center gap-2">
            <span>✦ Interactive Studio Artifacts</span>
            <span>•</span>
            <span className="italic">{isOrganized ? "Organized in harmonious grid" : "Scattered desk vibe (Drag any item freely!)"}</span>
          </div>

          <div className={`relative min-h-[280px] sm:min-h-[300px] transition-all duration-500 ${
            isOrganized 
              ? 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 max-w-5xl mx-auto' 
              : 'flex flex-wrap justify-center items-center gap-4'
          }`}>
            {scatteredItems.map((item) => {
              const pos = isOrganized ? item.gridPos : item.scatterPos;

              return (
                <motion.div
                  key={item.id}
                  layout
                  drag={!isOrganized}
                  dragConstraints={{ left: -120, right: 120, top: -80, bottom: 80 }}
                  whileHover={{ scale: 1.08, zIndex: 30 }}
                  whileTap={{ scale: 0.95 }}
                  onDragStart={() => playSticker()}
                  animate={{
                    x: pos.x,
                    y: pos.y,
                    rotate: pos.rotate
                  }}
                  transition={{ type: "spring", stiffness: 240, damping: 20 }}
                  className={`p-3.5 sm:p-4 rounded-2xl border ${item.color} shadow-sm select-none cursor-grab active:cursor-grabbing text-left transition-shadow hover:shadow-md ${
                    isOrganized ? 'w-full' : 'w-44 sm:w-48'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">{item.emoji}</span>
                    <span className="text-[9px] font-mono uppercase tracking-widest opacity-70">
                      #{item.id}
                    </span>
                  </div>

                  <h3 className="text-xs sm:text-sm font-semibold tracking-tight leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-[10px] sm:text-[11px] font-light opacity-80 mt-0.5 line-clamp-1">
                    {item.detail}
                  </p>
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>

    </section>
  );
};
