import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowDown } from 'lucide-react';
import { playClick, playSticker } from '../utils/sound';

export const MessyAboutMe = () => {
  // Curated Scrapbook Polaroids with clean, minimal titles
  const polaroids = {
    kedarnath: {
      id: 'kedarnath',
      title: 'Kedarnath',
      image: '/scrapbook/kedarnath.jpg',
      objectPos: 'object-center',
      tapeColor: 'bg-[#B7E4C7]/95',
      rotate: -2.5,
    },
    speaking: {
      id: 'speaking',
      title: 'Tech Talk',
      image: '/scrapbook/speaking-presentation.jpg',
      objectPos: 'object-[center_20%]',
      tapeColor: 'bg-[#FFE5B4]/95',
      rotate: 2.5,
    },
    drawing: {
      id: 'drawing',
      title: 'Sketchbook',
      image: '/scrapbook/drawing-compass.jpg',
      objectPos: 'object-center',
      tapeColor: 'bg-[#FFCAD4]/95',
      rotate: -2,
    },
    award: {
      id: 'award',
      title: 'College Competition',
      image: '/scrapbook/award-winning.jpg',
      objectPos: 'object-center',
      tapeColor: 'bg-[#FEF08A]/95',
      rotate: -1.5,
    },
    bunny: {
      id: 'bunny',
      title: 'Fluffy Friend',
      image: '/scrapbook/fluffy-bunny.jpg',
      objectPos: 'object-[center_20%]',
      tapeColor: 'bg-[#FFE5B4]/95',
      rotate: 2,
    },
    mtw: {
      id: 'mtw',
      title: 'Tech Ecosystem',
      image: '/scrapbook/mumbai-tech-week.jpg',
      objectPos: 'object-[center_20%]',
      tapeColor: 'bg-[#E2D4F0]/95',
      rotate: 2,
    },
    coastal: {
      id: 'coastal',
      title: 'Coastal Waves',
      image: '/scrapbook/coastal-waves.jpg',
      objectPos: 'object-center',
      tapeColor: 'bg-[#CBEAD7]/95',
      rotate: -2.5,
    },
    snow: {
      id: 'snow',
      title: 'Winter Trails',
      image: '/scrapbook/snowman-travel.jpg',
      objectPos: 'object-center',
      tapeColor: 'bg-[#BAE6FD]/95',
      rotate: 2,
    }
  };

  // SQUARE SHAPE Polaroid Card Component (Compact footprint so entire section fits in 1 view)
  const PolaroidCard = ({ item, className = "" }) => (
    <motion.div
      initial={{ scale: 0.85, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      whileHover={{ 
        scale: 1.05, 
        rotate: 0,
        zIndex: 25, 
        transition: { duration: 0.18 } 
      }}
      onClick={() => playSticker()}
      style={{ rotate: `${item.rotate}deg` }}
      className={`relative w-36 sm:w-40 md:w-42 lg:w-44 bg-white p-2 pb-1.5 rounded-xs shadow-[0_4px_14px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_24px_rgba(244,162,97,0.22)] border border-stone-200/80 hover:border-amber-200/80 cursor-default select-none group transition-all duration-200 flex flex-col ${className}`}
    >
      {/* Washi Tape Strip on Top */}
      <div 
        className={`absolute -top-2 left-1/2 -translate-x-1/2 w-12 sm:w-14 h-3 ${item.tapeColor} shadow-2xs border-y border-black/5 z-20 pointer-events-none`}
        style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)' }}
      />

      {/* 1:1 SQUARE Photo Thumbnail */}
      <div className="w-full aspect-square bg-stone-100 rounded-[1px] overflow-hidden relative">
        <img 
          src={item.image} 
          alt={item.title} 
          className={`w-full h-full object-cover ${item.objectPos || 'object-center'} group-hover:scale-105 transition-transform duration-300`} 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-end p-1.5">
          <Sparkles size={10} className="text-white drop-shadow-md" />
        </div>
      </div>

      {/* Clean, Minimal Handwritten Title */}
      <div className="pt-1 px-1 text-center">
        <p className="font-handwriting font-medium text-[11px] sm:text-xs text-stone-700 leading-tight">
          {item.title}
        </p>
      </div>
    </motion.div>
  );

  return (
    <section 
      id="about" 
      className="py-4 sm:py-6 relative overflow-hidden bg-transparent text-[#2D2A26] select-none"
    >
      {/* Container with tight vertical spacing so entire 3-row scrapbook fits in one view */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 space-y-3 sm:space-y-4">
        
        {/* ==================================================================
            ROW 1: KEDARNATH (Left) + CENTER HEADER + TECH ECOSYSTEM (Right)
        ================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-5 items-start">
          
          {/* Row 1 Left: Kedarnath + Trek Note */}
          <div className="lg:col-span-3 flex flex-col items-center lg:items-start relative">
            <div className="relative">
              <PolaroidCard item={polaroids.kedarnath} />
              
              {/* Kedarnath Trek Note */}
              <div className="mt-1 bg-[#F3E8FF] px-2.5 py-1 rounded-xs shadow-xs border border-purple-200/80 -rotate-1 pointer-events-none relative max-w-[215px]">
                <p className="font-handwriting text-[10px] text-purple-950 leading-snug">
                  Trekking with its own view. Just love this. This trek can never be forgotten 🏔️ ✨
                </p>
              </div>
            </div>
          </div>

          {/* Row 1 Center: Header (Tight vertical footprint) */}
          <div className="lg:col-span-6 flex flex-col items-center text-center space-y-1 pt-0">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/85 border border-stone-200/80 shadow-2xs backdrop-blur-md text-[9.5px] font-mono text-stone-600">
              <Sparkles size={9} className="text-[#3D8B7A]" />
              <span>Behind the Screen • Unified Spread</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-[#2D2A26]">
              Curated <span className="font-serif italic text-[#3D8B7A]">Scrapbook</span>
            </h2>

            <p className="text-[10.5px] sm:text-[11px] font-light text-stone-600 max-w-sm sm:max-w-md mx-auto">
              A studio collage of living software craft, tech meetups, and real-life balance.
            </p>
          </div>

          {/* Row 1 Right: Tech Ecosystem + Wide Horizontal Note */}
          <div className="lg:col-span-3 flex flex-col items-center lg:items-end relative">
            <div className="relative flex flex-col items-center lg:items-end">
              <PolaroidCard item={polaroids.mtw} />
              
              {/* WIDE Horizontal Tech Note (Wide instead of tall so it doesn't push down) */}
              <div className="mt-1 bg-[#E8F0FE] px-2.5 py-1 rounded-xs shadow-xs border border-blue-200/80 rotate-1 pointer-events-none relative w-full max-w-[215px] text-left">
                <div className="absolute -top-1 right-4 w-6 h-1 bg-[#D2E3FC]/90 border-y border-black/5" />
                <p className="font-handwriting font-bold text-[10.5px] text-blue-950 leading-tight">
                  Tech Ecosystem &amp; Summits 🚀
                </p>
                <p className="font-handwriting text-[9.5px] text-blue-900 leading-tight mt-0.5">
                  Attending tech events &amp; understanding different business and startup ideas.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* ==================================================================
            ROW 2: TECH TALK (Left) + WIDE CENTER TECH/LIFE BOX + COASTAL (Right)
        ================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-5 items-start">
          
          {/* Row 2 Left: Tech Talk + Wide Tech Note */}
          <div className="lg:col-span-3 flex flex-col items-center lg:items-start relative">
            <div className="relative">
              <PolaroidCard item={polaroids.speaking} />
              
              {/* WIDE Horizontal Tech Note */}
              <div className="mt-1 bg-[#FEF9C3] px-2.5 py-1 rounded-xs shadow-xs border border-amber-300/80 -rotate-1 pointer-events-none relative w-full max-w-[215px] text-left">
                <div className="absolute -top-1 left-4 w-6 h-1 bg-[#FDE68A]/90 border-y border-black/5" />
                <p className="font-handwriting font-bold text-[10.5px] text-amber-950 leading-tight">
                  Exploring Modern Tech Stacks ⚡
                </p>
                <p className="font-handwriting text-[9.5px] text-amber-900 leading-tight mt-0.5">
                  Experimenting with React, TypeScript, Node.js &amp; next-gen AI tooling.
                </p>
              </div>
            </div>
          </div>

          {/* Row 2 Center: WIDER, COMPACT-HEIGHT TECH & LIFE PHILOSOPHY CARD */}
          <div className="lg:col-span-6 flex justify-center items-center pt-0">
            <div className="relative w-full max-w-lg lg:max-w-xl xl:max-w-2xl mt-0 lg:-mt-[95px]">
              
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="relative w-full bg-[#FAF4E8] p-3 sm:p-4 rounded-sm shadow-xs border border-[#E2D5C3] text-center space-y-1.5 z-10"
                style={{
                  clipPath: 'polygon(0% 1.5%, 2% 0%, 98% 0.5%, 100% 2%, 99.5% 98%, 97% 100%, 2% 99%, 0% 97%)'
                }}
              >
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-14 h-2 bg-[#E8DCC4]/90 border-y border-black/5 rotate-1" />

                <span className="text-[8.5px] font-mono uppercase tracking-widest text-stone-500 font-semibold block">
                  ✦ What Drives Me &amp; Tech Passions
                </span>

                <h3 className="font-handwriting font-medium text-xs sm:text-sm text-stone-800 leading-snug tracking-wide">
                  “Where curious engineering meets startup ideas &amp; open horizons.”
                </h3>

                <p className="font-sans font-normal text-[10.5px] sm:text-[11px] text-stone-600 leading-relaxed text-center px-1 max-w-lg mx-auto">
                  I’ve always loved building things—from exploring algorithmic puzzles and crafting full-stack web applications to outdoor Himalayan treks and analog sketching. I’m especially passionate about diving into new technologies: modern reactive stacks, intelligent AI/ML pipelines, and developer tooling. You’ll frequently find me attending tech conferences, participating in hackathons, and hanging out at developer meetups like Google Developer Groups to collaborate with inspiring innovators and founders.
                </p>

                {/* Wide Badges Row */}
                <div className="pt-0.5 flex flex-wrap items-center justify-center gap-1.5 text-[9px] font-mono text-stone-600">
                  <span className="px-2 py-0.5 rounded-full bg-white/80 border border-stone-200/80">⚡ Next-Gen Web &amp; AI</span>
                  <span className="px-2 py-0.5 rounded-full bg-white/80 border border-stone-200/80">🎙️ Tech Meetups &amp; GDG</span>
                  <span className="px-2 py-0.5 rounded-full bg-white/80 border border-stone-200/80">💡 Startups &amp; Business</span>
                  <span className="px-2 py-0.5 rounded-full bg-white/80 border border-stone-200/80">🏔️ Himalayan Trails</span>
                </div>
              </motion.div>

              {/* Decorative Corner Element: Cute Pushpin */}
              <div className="absolute -top-2.5 -right-2 bg-[#FFE5EC] px-2 py-0.5 rounded-xs shadow-xs border border-rose-200/60 transform rotate-3 z-20 pointer-events-none flex items-center gap-1">
                <span>📌</span>
                <span className="font-handwriting font-bold text-[10px] text-rose-950">
                  Curious Mindset
                </span>
              </div>

              {/* Decorative Corner Element: Paperclip */}
              <div className="absolute -bottom-2 -left-2 bg-[#D8F3DC] px-2 py-0.5 rounded-xs shadow-xs border border-emerald-300/60 transform -rotate-2 z-20 pointer-events-none flex items-center gap-1">
                <span>📎</span>
                <span className="font-handwriting font-bold text-[10px] text-emerald-950">
                  Continuous Learning
                </span>
              </div>

            </div>
          </div>

          {/* Row 2 Right: Coastal Waves + Travel & Peace Moments Note */}
          <div className="lg:col-span-3 flex flex-col items-center lg:items-end relative">
            <div className="relative flex flex-col items-center lg:items-end">
              <PolaroidCard item={polaroids.coastal} />
              
              {/* Travel Peace Moments Note (Between Coastal & Snow) */}
              <div className="mt-1 bg-[#E0F2FE] px-2.5 py-1 rounded-xs shadow-xs border border-sky-200/90 -rotate-1 pointer-events-none relative max-w-[215px] text-left">
                <div className="absolute -top-1 right-5 w-6 h-1.5 bg-[#BAE6FD]/90 border-y border-black/5" />
                <p className="font-handwriting text-[10px] text-sky-950 leading-snug">
                  Can’t just overcome love for traveling. These are my peace moments 🌊 ❄️
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* ==================================================================
            ROW 3: 4 EQUIDISTANT POLAROIDS
            - 1. Sketchbook + Creativity on Paper Note
            - 2. Builder Meetup
            - 3. Fluffy Friend + Love the Animals Note
            - 4. Winter Trails
        ================================================================== */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 items-start justify-items-center w-full pt-1">
          
          {/* 1. Sketchbook + "This is the start of creativity. Creativity starts on paper." */}
          <div className="relative flex flex-col items-center lg:items-start w-full">
            <div className="mx-auto lg:ml-0 flex flex-col items-center lg:items-start">
              <PolaroidCard item={polaroids.drawing} />
              
              {/* Creativity Starts on Paper Note */}
              <div className="mt-1 bg-[#FFE4E6] px-2.5 py-1 rounded-xs shadow-xs border border-rose-200/90 -rotate-2 pointer-events-none relative max-w-[190px]">
                <div className="absolute -top-1 left-4 w-6 h-1.5 bg-[#FECDD3]/90 border-y border-black/5" />
                <p className="font-handwriting text-[9.5px] sm:text-[10px] text-rose-950 leading-snug">
                  This is the start of creativity. Creativity starts on paper ✏️ 📖
                </p>
              </div>
            </div>
          </div>

          {/* 2. College Competition */}
          <div className="relative flex flex-col items-center w-full">
            <div className="mx-auto flex flex-col items-center">
              <PolaroidCard item={polaroids.award} />
              
              {/* College Tech Win Note */}
              <div className="mt-1 bg-[#FEF08A] px-2.5 py-1 rounded-xs shadow-xs border border-amber-300/90 rotate-1 pointer-events-none relative max-w-[190px] text-center">
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-6 h-1 bg-[#FDE047]/90 border-y border-black/5" />
                <p className="font-handwriting font-bold text-[10px] text-amber-950 leading-tight">
                  College Tech Win 🏆
                </p>
                <p className="font-handwriting text-[9px] text-amber-900 leading-tight mt-0.5">
                  Won 1st prize in college tech competition for creative development.
                </p>
              </div>
            </div>
          </div>

          {/* 3. Fluffy Friend + "Love the animals." */}
          <div className="relative flex flex-col items-center w-full">
            <div className="mx-auto flex flex-col items-center">
              <PolaroidCard item={polaroids.bunny} />
              
              {/* Love the animals Sticky Note */}
              <div className="mt-1 bg-[#FEF9C3] px-2.5 py-0.5 rounded-xs shadow-xs border border-amber-200/80 rotate-1 pointer-events-none relative inline-block">
                <span className="font-handwriting text-[10px] text-amber-950">
                  Love the animals 🐰 🌿
                </span>
              </div>
            </div>
          </div>

          {/* 4. Winter Trails */}
          <div className="relative flex flex-col items-center lg:items-end w-full">
            <div className="mx-auto lg:mr-0 flex flex-col items-center lg:items-end">
              <PolaroidCard item={polaroids.snow} />
              
              <div className="mt-1 bg-[#E0F2FE] px-2.5 py-0.5 rounded-xs shadow-xs border border-sky-200/80 -rotate-1 pointer-events-none relative inline-block">
                <span className="font-handwriting text-[10px] text-sky-950">
                  Snow Trails &amp; Calm ⛄
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Subtle Bottom Transition Cue */}
      <div className="w-full flex justify-center pt-3 pb-0 z-20">
        <a 
          href="#experience"
          onClick={() => playClick()}
          className="inline-flex items-center gap-1.5 text-[9.5px] font-mono text-stone-500 hover:text-stone-800 transition-colors"
        >
          <span>Continue down to Study Desk &amp; Experience</span>
          <ArrowDown size={10} className="animate-bounce text-[#3D8B7A]" />
        </a>
      </div>

    </section>
  );
};

export default MessyAboutMe;
