import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowDown } from 'lucide-react';
import { playClick, playSticker } from '../utils/sound';

export const MessyAboutMe = () => {
  // Curated Scrapbook Polaroids with clean, simple titles
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
      title: 'Hackathon Award',
      image: '/scrapbook/award-winning.jpg',
      objectPos: 'object-center',
      tapeColor: 'bg-[#FEF08A]/95',
      rotate: -1.5,
    },
    bunny: {
      id: 'bunny',
      title: 'Mountain Trails',
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
      title: 'Winter Expeditions',
      image: '/scrapbook/snowman-travel.jpg',
      objectPos: 'object-center',
      tapeColor: 'bg-[#BAE6FD]/95',
      rotate: 2,
    }
  };

  // SQUARE SHAPE Polaroid Card Component (1:1 square photo, clean minimal bottom chin)
  const PolaroidCard = ({ item, className = "" }) => (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ type: "spring", stiffness: 240, damping: 20 }}
      whileHover={{ 
        scale: 1.05, 
        rotate: 0,
        zIndex: 25, 
        transition: { duration: 0.18 } 
      }}
      onClick={() => playSticker()}
      style={{ rotate: `${item.rotate}deg` }}
      className={`relative w-40 sm:w-44 md:w-46 lg:w-48 bg-white p-2 sm:p-2.5 pb-2 rounded-xs shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_28px_rgba(244,162,97,0.22)] border border-stone-200/80 hover:border-amber-200/80 cursor-default select-none group transition-all duration-200 flex flex-col ${className}`}
    >
      {/* Washi Tape Strip on Top */}
      <div 
        className={`absolute -top-2.5 left-1/2 -translate-x-1/2 w-12 sm:w-14 h-3.5 ${item.tapeColor} shadow-2xs border-y border-black/5 z-20 pointer-events-none`}
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

      {/* Clean, Simple Handwritten Title */}
      <div className="pt-1.5 px-1 text-center">
        <p className="font-handwriting font-medium text-xs sm:text-[13px] text-stone-700 leading-tight">
          {item.title}
        </p>
      </div>
    </motion.div>
  );

  return (
    <section 
      id="about" 
      className="py-8 sm:py-12 relative overflow-hidden bg-transparent text-[#2D2A26] select-none"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 space-y-6 sm:space-y-7">
        
        {/* ==================================================================
            ROW 1: KEDARNATH (Left) + CENTER HEADING + TECH ECOSYSTEM (Right)
        ================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-start">
          
          {/* Row 1 Left: Kedarnath + Small Personal Hobby Note */}
          <div className="lg:col-span-3 flex flex-col items-center lg:items-start">
            <div className="relative">
              <PolaroidCard item={polaroids.kedarnath} />
              
              {/* Small Personal Sticky Note: Hobbies */}
              <div className="mt-2 -ml-1 bg-[#F3E8FF] px-2.5 py-1 rounded-xs shadow-xs border border-purple-200/80 transform rotate-2 pointer-events-none relative inline-block">
                <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-6 h-1.5 bg-[#E9D5FF]/90 border-y border-black/5 -rotate-1" />
                <p className="font-handwriting text-xs text-purple-950 leading-tight">
                  Alpine Trekking &amp; Peaks 🏔️
                </p>
              </div>
            </div>
          </div>

          {/* Row 1 Center: Heading & Subtitle */}
          <div className="lg:col-span-6 flex flex-col items-center text-center space-y-2 pt-0">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/85 border border-stone-200/80 shadow-2xs backdrop-blur-md text-[10px] font-mono text-stone-600">
              <Sparkles size={10} className="text-[#3D8B7A]" />
              <span>Behind the Screen • Unified Spread</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-light tracking-tight text-[#2D2A26] leading-tight">
              Curated <span className="font-serif italic text-[#3D8B7A]">Scrapbook</span>
            </h2>

            <p className="text-[11px] sm:text-xs font-light text-stone-600 max-w-xs sm:max-w-md mx-auto">
              A studio montage of living software systems, developer community milestones, and analog craft.
            </p>
          </div>

          {/* Row 1 Right: Tech Ecosystem + 2-Line Tech Sticky Note */}
          <div className="lg:col-span-3 flex flex-col items-center lg:items-end">
            <div className="relative">
              <PolaroidCard item={polaroids.mtw} />
              
              {/* 2-Line Tech Note: Systems Architecture */}
              <div className="mt-2 -mr-1 bg-[#E8F0FE] p-2 sm:p-2.5 rounded-xs shadow-xs border border-blue-200/80 transform -rotate-1 pointer-events-none relative max-w-[195px] text-left">
                <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-7 h-1.5 bg-[#D2E3FC]/90 border-y border-black/5 rotate-1" />
                <p className="font-handwriting font-bold text-xs text-blue-950 leading-tight">
                  Systems Architecture 💻
                </p>
                <p className="font-handwriting text-[10px] sm:text-[10.5px] text-blue-900 leading-snug mt-0.5">
                  Building scalable React, Node.js &amp; modular REST APIs with clean patterns.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* ==================================================================
            ROW 2: TECH TALK (Left) + CENTER BIO CARD + COASTAL WAVES (Right)
        ================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-start">
          
          {/* Row 2 Left: Tech Talk + 2-Line Tech Note */}
          <div className="lg:col-span-3 flex flex-col items-center lg:items-start">
            <div className="relative">
              <PolaroidCard item={polaroids.speaking} />
              
              {/* 2-Line Tech Note: Developer Mentorship */}
              <div className="mt-2 ml-1 bg-[#FEF9C3] p-2 sm:p-2.5 rounded-xs shadow-xs border border-amber-300/80 transform rotate-2 pointer-events-none relative max-w-[195px] text-left">
                <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-7 h-1.5 bg-[#FDE68A]/90 border-y border-black/5 -rotate-2" />
                <p className="font-handwriting font-bold text-xs text-amber-950 leading-tight">
                  Tech Talks &amp; Community 🎙️
                </p>
                <p className="font-handwriting text-[10px] sm:text-[10.5px] text-amber-900 leading-snug mt-0.5">
                  Demystifying system designs &amp; mentoring fellow developers at GDG.
                </p>
              </div>
            </div>
          </div>

          {/* Row 2 Center: Balanced Personal & Professional Philosophy Card */}
          <div className="lg:col-span-6 flex justify-center items-center pt-0">
            <div className="relative w-full max-w-sm sm:max-w-md mt-0 lg:-mt-[110px]">
              
              <motion.div
                whileHover={{ scale: 1.012 }}
                className="relative w-full bg-[#FAF4E8] p-4 sm:p-5 rounded-sm shadow-xs border border-[#E2D5C3] text-center space-y-2 z-10"
                style={{
                  clipPath: 'polygon(0% 1.5%, 2% 0%, 98% 0.5%, 100% 2%, 99.5% 98%, 97% 100%, 2% 99%, 0% 97%)'
                }}
              >
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-14 h-2.5 bg-[#E8DCC4]/90 border-y border-black/5 rotate-1" />

                <span className="text-[9px] font-mono uppercase tracking-widest text-stone-500 font-medium block">
                  ✦ About Me &amp; Engineering Philosophy
                </span>

                <h3 className="font-handwriting font-normal text-sm sm:text-base text-stone-800 leading-snug tracking-wide">
                  “Balancing technical rigor in software with open trails &amp; analog curiosity.”
                </h3>

                <p className="font-sans font-normal text-[11px] sm:text-[12px] text-stone-600 leading-relaxed text-center px-1 max-w-sm mx-auto">
                  I engineer reliable full-stack applications, interactive UI systems, and AI/ML pipelines with deep technical rigor. Outside the terminal, I recharge by trekking Himalayan mountain trails, walking coastal shores, and capturing ideas through analog sketches. Combining engineering discipline with genuine human curiosity brings fresh clarity to every technical challenge I solve.
                </p>

                <div className="pt-1 flex flex-wrap items-center justify-center gap-1.5 text-[10px] font-mono text-stone-500">
                  <span className="px-2 py-0.5 rounded-full bg-white/70 border border-stone-200/60 text-stone-600 text-[10px] font-sans">💻 Full-Stack Architecture</span>
                  <span className="px-2 py-0.5 rounded-full bg-white/70 border border-stone-200/60 text-stone-600 text-[10px] font-sans">⚡ AI/ML Data Pipelines</span>
                  <span className="px-2 py-0.5 rounded-full bg-white/70 border border-stone-200/60 text-stone-600 text-[10px] font-sans">🏔️ Alpine Trekking</span>
                  <span className="px-2 py-0.5 rounded-full bg-white/70 border border-stone-200/60 text-stone-600 text-[10px] font-sans">🌊 Coastal Calm</span>
                </div>
              </motion.div>

              {/* Sticky Note: Professional Dedication */}
              <div className="absolute -top-2.5 -right-2 bg-[#FFE5EC] px-2.5 py-1 rounded-xs shadow-xs border border-rose-200/60 transform rotate-3 z-20 pointer-events-none">
                <p className="font-handwriting font-bold text-[11px] text-rose-950 tracking-wide">
                  Clean Code &amp; Craft 💻 ✦
                </p>
              </div>

              {/* Sticky Note: Creative Perspective */}
              <div className="absolute -bottom-2.5 -left-2 bg-[#D8F3DC] px-2.5 py-1 rounded-xs shadow-xs border border-emerald-300/60 transform -rotate-3 z-20 pointer-events-none">
                <p className="font-handwriting font-bold text-[11px] text-emerald-950 tracking-wide">
                  Curiosity &amp; Innovation 💡 ✨
                </p>
              </div>

            </div>
          </div>

          {/* Row 2 Right: Coastal Waves + Small Personal Hobby Note */}
          <div className="lg:col-span-3 flex flex-col items-center lg:items-end">
            <div className="relative">
              <PolaroidCard item={polaroids.coastal} />
              
              {/* Small Personal Sticky Note: Hobbies */}
              <div className="mt-2 mr-1 bg-[#D1FAE5] px-2.5 py-1 rounded-xs shadow-xs border border-emerald-300/80 transform rotate-2 pointer-events-none relative inline-block">
                <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-6 h-1.5 bg-[#A7F3D0]/90 border-y border-black/5 -rotate-1" />
                <p className="font-handwriting text-xs text-emerald-950 leading-tight">
                  Ocean Breeze &amp; Beach Calm 🌊
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* ==================================================================
            ROW 3: 4 EQUIDISTANT POLAROIDS WITH CURATED STICKY NOTES
            - 1. Sketchbook (Hobby Note)
            - 2. Hackathon Award (Tech Career Note)
            - 3. Mountain Trails (Hobby Note)
            - 4. Snow Expeditions (AI/ML Tech Note)
        ================================================================== */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 items-start justify-items-center w-full">
          
          {/* 1. Sketchbook + Small Hobby Note */}
          <div className="relative flex flex-col items-center lg:items-start w-full">
            <div className="mx-auto lg:ml-0">
              <PolaroidCard item={polaroids.drawing} />
              <div className="mt-2 -ml-1 bg-[#FFE4E6] px-2.5 py-1 rounded-xs shadow-xs border border-rose-200/80 transform -rotate-2 pointer-events-none relative inline-block">
                <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-6 h-1.5 bg-[#FECDD3]/90 border-y border-black/5 rotate-1" />
                <p className="font-handwriting text-xs text-rose-950 leading-tight">
                  Analog Sketches &amp; Poetry ✏️
                </p>
              </div>
            </div>
          </div>

          {/* 2. Hackathon Award + 2-Line Tech Career Note */}
          <div className="relative flex flex-col items-center w-full">
            <div className="mx-auto">
              <PolaroidCard item={polaroids.award} />
              <div className="mt-2 bg-[#FEF3C7] p-2 rounded-xs shadow-xs border border-amber-200/80 transform -rotate-1 pointer-events-none relative max-w-[185px] text-center">
                <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-7 h-1.5 bg-[#FDE68A]/90 border-y border-black/5 -rotate-1" />
                <p className="font-handwriting font-bold text-xs text-amber-950 leading-tight">
                  Hackathon Finalist 🏆
                </p>
                <p className="font-handwriting text-[10px] text-amber-900 leading-snug mt-0.5">
                  Pan-IIT PIWOT national finalist &amp; team engineering distinction.
                </p>
              </div>
            </div>
          </div>

          {/* 3. Mountain Trails + Small Personal Note */}
          <div className="relative flex flex-col items-center w-full">
            <div className="mx-auto">
              <PolaroidCard item={polaroids.bunny} />
              <div className="mt-2 bg-[#FEF9C3] px-2.5 py-1 rounded-xs shadow-xs border border-amber-200/80 transform rotate-2 pointer-events-none relative inline-block">
                <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-6 h-1.5 bg-[#FDE68A]/90 border-y border-black/5 rotate-1" />
                <p className="font-handwriting text-xs text-amber-950 leading-tight">
                  Mountain Wilderness 🌿
                </p>
              </div>
            </div>
          </div>

          {/* 4. Snow Expeditions + 2-Line AI/ML Tech Note */}
          <div className="relative flex flex-col items-center lg:items-end w-full">
            <div className="mx-auto lg:mr-0">
              <PolaroidCard item={polaroids.snow} />
              <div className="mt-2 -mr-1 bg-[#E0F2FE] p-2 rounded-xs shadow-xs border border-sky-200/80 transform rotate-1 pointer-events-none relative max-w-[185px] text-center">
                <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-7 h-1.5 bg-[#BAE6FD]/90 border-y border-black/5 rotate-1" />
                <p className="font-handwriting font-bold text-xs text-sky-950 leading-tight">
                  AI/ML &amp; Data Telemetry ⚡
                </p>
                <p className="font-handwriting text-[10px] text-sky-900 leading-snug mt-0.5">
                  Predictive modeling, feature pipelines &amp; sub-15ms inference.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Subtle Bottom Transition Cue */}
      <div className="w-full flex justify-center pt-6 pb-1 z-20">
        <a 
          href="#experience"
          onClick={() => playClick()}
          className="inline-flex items-center gap-1.5 text-[10px] font-mono text-stone-500 hover:text-stone-800 transition-colors"
        >
          <span>Continue down to the Study Desk &amp; Timeline</span>
          <ArrowDown size={10} className="animate-bounce text-[#3D8B7A]" />
        </a>
      </div>

    </section>
  );
};

export default MessyAboutMe;
