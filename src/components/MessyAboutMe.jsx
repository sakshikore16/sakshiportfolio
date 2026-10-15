import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowDown, X } from 'lucide-react';
import { playClick, playSticker } from '../utils/sound';

export const MessyAboutMe = () => {
  const [inspectedPhoto, setInspectedPhoto] = useState(null);

  // Automatically hide navbar when inspecting any photo so they never overlap
  useEffect(() => {
    if (inspectedPhoto) {
      document.body.classList.add('modal-open', 'scrapbook-modal-open');
    } else {
      document.body.classList.remove('modal-open', 'scrapbook-modal-open');
    }
    return () => {
      document.body.classList.remove('modal-open', 'scrapbook-modal-open');
    };
  }, [inspectedPhoto]);

  // Curated Scrapbook Polaroids with all 8 personal photos & stories
  const polaroids = {
    kedarnath: {
      id: 'kedarnath',
      title: 'Kedarnath Trek',
      sub: '3,584m Himalayas',
      note: 'Trekking through the misty mountains to Kedarnath. The crisp Himalayan air, towering snow peaks, and deep stillness reset my mind completely.',
      image: '/scrapbook/kedarnath.jpg',
      objectPos: 'object-center',
      tapeColor: 'bg-[#B7E4C7]/95',
      rotate: -2.5,
      stickyText: 'Alpine Trekking & Travel 🏔️ ✧',
      stickyBg: 'bg-[#E8E1F5]',
      stickyBorder: 'border-purple-200/60',
      stickyTextCol: 'text-purple-950',
      tapeSub: 'bg-[#E2D4F0]/90'
    },
    speaking: {
      id: 'speaking',
      title: 'Tech Presentation',
      sub: 'Builder Community',
      note: 'Sharing ideas, breaking down system architectures, and mentoring peers. Explaining complex tech in simple human terms is one of my favorite crafts.',
      image: '/scrapbook/speaking-presentation.jpg',
      objectPos: 'object-[center_20%]',
      tapeColor: 'bg-[#FFE5B4]/95',
      rotate: 2.5,
      stickyText: 'Presenting & Ideas 🎙️ ✦',
      stickyBg: 'bg-[#FEF9C3]',
      stickyBorder: 'border-amber-300/60',
      stickyTextCol: 'text-amber-950',
      tapeSub: 'bg-[#FFE5B4]/90'
    },
    drawing: {
      id: 'drawing',
      title: 'Analog Sketchbook',
      sub: 'Compass • - Sakshi',
      note: 'Finding direction through hand-drawn lines, poetry, and graphite textures. Good software begins with a blank page and honest craft.',
      image: '/scrapbook/drawing-compass.jpg',
      objectPos: 'object-center',
      tapeColor: 'bg-[#FFCAD4]/95',
      rotate: -2,
      stickyText: 'Drawing & Imagination ✏️ 📖',
      stickyBg: 'bg-[#FFE5EC]',
      stickyBorder: 'border-rose-200/60',
      stickyTextCol: 'text-rose-950',
      tapeSub: 'bg-[#FFCAD4]/90'
    },
    award: {
      id: 'award',
      title: 'Stage Recognition',
      sub: 'Award Ceremony',
      note: 'Honored on stage with an award for engineering dedication and team craft. A proud milestone that fuels my passion to build impactful software.',
      image: '/scrapbook/award-winning.jpg',
      objectPos: 'object-center',
      tapeColor: 'bg-[#FEF08A]/95',
      rotate: -1.5,
      stickyText: 'Stage & Recognition 🏆 ✨',
      stickyBg: 'bg-[#FEF08A]',
      stickyBorder: 'border-amber-300/60',
      stickyTextCol: 'text-amber-950',
      tapeSub: 'bg-[#FDE047]/90'
    },
    bunny: {
      id: 'bunny',
      title: 'Mountain Bunny',
      sub: 'Fluffy Companion',
      note: 'Meeting this gentle, cloud-soft angora bunny during mountain travels. Pure warmth, gentle stillness, and heartwarming joy in the hills.',
      image: '/scrapbook/fluffy-bunny.jpg',
      objectPos: 'object-[center_20%]',
      tapeColor: 'bg-[#FFE5B4]/95',
      rotate: 2,
      stickyText: 'Quiet Moments & Joy 🐰 🌿',
      stickyBg: 'bg-[#FEF9C3]',
      stickyBorder: 'border-amber-300/60',
      stickyTextCol: 'text-amber-950',
      tapeSub: 'bg-[#FFE5B4]/90'
    },
    mtw: {
      id: 'mtw',
      title: 'Tech Ecosystem',
      sub: 'Builder Meetups',
      note: 'Immersed in tech ecosystem events, exchanging ideas on emerging architectures, scalable web systems, and engaging with inspiring builders.',
      image: '/scrapbook/mumbai-tech-week.jpg',
      objectPos: 'object-[center_20%]',
      tapeColor: 'bg-[#E2D4F0]/95',
      rotate: 2,
      stickyText: 'Tech Events & Ecosystem 🚀 ✧',
      stickyBg: 'bg-[#E0EDF6]',
      stickyBorder: 'border-sky-200/60',
      stickyTextCol: 'text-sky-950',
      tapeSub: 'bg-[#CCE2F0]/90'
    },
    coastal: {
      id: 'coastal',
      title: 'Coastal Serenity',
      sub: 'Ocean Breeze & Waves',
      note: 'Listening to crashing waves and watching the ocean tide. Being near the sea brings immense tranquility, reflection, and creative perspective.',
      image: '/scrapbook/coastal-waves.jpg',
      objectPos: 'object-center',
      tapeColor: 'bg-[#CBEAD7]/95',
      rotate: -2.5,
      stickyText: 'Beach Serenity & Calm 🌊 🐚',
      stickyBg: 'bg-[#D8F3DC]',
      stickyBorder: 'border-emerald-300/60',
      stickyTextCol: 'text-emerald-950',
      tapeSub: 'bg-[#B7E4C7]/90'
    },
    snow: {
      id: 'snow',
      title: 'Snow Expeditions',
      sub: 'Snowman • Mountains',
      note: 'I absolutely love snow traveling! Crafted this little snowman companion amidst frozen mountain rivers and snow-capped peaks.',
      image: '/scrapbook/snowman-travel.jpg',
      objectPos: 'object-center',
      tapeColor: 'bg-[#BAE6FD]/95',
      rotate: 2,
      stickyText: 'Snow Expeditions & Trails ⛄ ❄️',
      stickyBg: 'bg-[#E0F2FE]',
      stickyBorder: 'border-sky-200/60',
      stickyTextCol: 'text-sky-950',
      tapeSub: 'bg-[#BAE6FD]/90'
    }
  };

  const handleOpenPhoto = (item) => {
    playSticker();
    setInspectedPhoto(item);
  };

  // SQUARE SHAPE Polaroid Card Component (1:1 square photo, clean bottom chin)
  const PolaroidCard = ({ item, className = "" }) => (
    <motion.div
      initial={{ scale: 0.6, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ type: "spring", stiffness: 240, damping: 20 }}
      whileHover={{ 
        scale: 1.06, 
        zIndex: 30, 
        transition: { duration: 0.18 } 
      }}
      whileTap={{ scale: 0.97 }}
      onClick={() => handleOpenPhoto(item)}
      style={{ rotate: `${item.rotate}deg` }}
      className={`relative w-40 sm:w-44 md:w-46 lg:w-48 bg-white p-2 sm:p-2.5 pb-2 rounded-xs shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_28px_rgba(244,162,97,0.22)] border border-stone-200/80 hover:border-amber-200/80 cursor-pointer select-none group transition-all duration-200 flex flex-col ${className}`}
      title={`Click to inspect ${item.title}`}
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

      {/* Single clean handwritten title seen completely without truncation */}
      <div className="pt-1.5 px-1 text-center">
        <p className="font-handwriting font-medium text-xs sm:text-[13px] text-[#2D2A26] leading-tight">
          {item.title}
        </p>
      </div>
    </motion.div>
  );

  return (
    <section 
      id="about" 
      className="py-6 sm:py-10 relative overflow-hidden bg-transparent text-[#2D2A26] select-none"
    >
      {/* 
        ========================================================================
        PERFECTLY ALIGNED 3-ROW SCRAPBOOK SPREAD:
        - ROW 1: [ Kedarnath ]    —— [ Heading in line with Row 1 start ] —— [ Mumbai Tech Week ]
        - ROW 2: [ Tech Talk ]    —— [ Motto in line with Row 2 start ]   —— [ Coastal Waves ]
        - ROW 3: [ Analog Sketch ] —— [ Award ] —— [ Bunny ] —— [ Snow ] (ALL 4 EQUIDISTANT)
        ========================================================================
      */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 space-y-4 sm:space-y-5">
        
        {/* ==================================================================
            ROW 1: FIRST ROW IMAGES + HEADING IN LINE WITH THEIR START
            - Left: Kedarnath Trek
            - Center: Curated Scrapbook Heading & Badge (aligned at start)
            - Right: Mumbai Tech Week
        ================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-start">
          
          {/* Row 1 Left: Kedarnath Trek */}
          <div className="lg:col-span-3 flex justify-center lg:justify-start">
            <div className="relative">
              <PolaroidCard item={polaroids.kedarnath} />
              <div className={`mt-1.5 -ml-1 ${polaroids.kedarnath.stickyBg} px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-xs shadow-xs border ${polaroids.kedarnath.stickyBorder} transform rotate-2 pointer-events-none relative inline-block whitespace-nowrap`}>
                <div className={`absolute -top-2 left-1/2 -translate-x-1/2 w-6 h-2 ${polaroids.kedarnath.tapeSub} border-y border-black/5 -rotate-1`} />
                <p className={`font-handwriting text-xs sm:text-[13px] font-normal tracking-wide whitespace-nowrap ${polaroids.kedarnath.stickyTextCol} leading-tight`}>
                  {polaroids.kedarnath.stickyText}
                </p>
              </div>
            </div>
          </div>

          {/* Row 1 Center: Heading in line with the start of the first row images */}
          <div className="lg:col-span-6 flex flex-col items-center text-center space-y-1.5 pt-0">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/85 border border-stone-200/80 shadow-2xs backdrop-blur-md text-[10px] font-mono text-stone-600">
              <Sparkles size={10} className="text-[#3D8B7A]" />
              <span>Behind the Screen • Unified Spread</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-light tracking-tight text-[#2D2A26] leading-tight">
              Curated <span className="font-serif italic text-[#3D8B7A]">Scrapbook</span>
            </h2>

            <p className="text-[11px] sm:text-xs font-light text-stone-600 max-w-xs sm:max-w-md mx-auto">
              A cozy blend of living software systems, outdoor expeditions, and analog craft.
            </p>
          </div>

          {/* Row 1 Right: Tech Ecosystem */}
          <div className="lg:col-span-3 flex justify-center lg:justify-end">
            <div className="relative">
              <PolaroidCard item={polaroids.mtw} />
              <div className={`mt-1.5 -mr-1 ${polaroids.mtw.stickyBg} px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-xs shadow-xs border ${polaroids.mtw.stickyBorder} transform -rotate-2 pointer-events-none relative inline-block whitespace-nowrap`}>
                <div className={`absolute -top-2 left-1/2 -translate-x-1/2 w-6 h-2 ${polaroids.mtw.tapeSub} border-y border-black/5 rotate-1`} />
                <p className={`font-handwriting text-xs sm:text-[13px] font-normal tracking-wide whitespace-nowrap ${polaroids.mtw.stickyTextCol} leading-tight`}>
                  {polaroids.mtw.stickyText}
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* ==================================================================
            ROW 2: SECOND ROW IMAGES + MAIN MOTTO TEXT BOX IN LINE WITH START
            - Left: Tech Talk Presentation
            - Center: Studio Atelier Motto Box (equidistant between Heading above and Row 3 middle below)
            - Right: Coastal Serenity
        ================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-start">
          
          {/* Row 2 Left: Tech Talk Presentation */}
          <div className="lg:col-span-3 flex justify-center lg:justify-start">
            <div className="relative">
              <PolaroidCard item={polaroids.speaking} />
              <div className={`mt-1.5 ml-1 ${polaroids.speaking.stickyBg} px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-xs shadow-xs border ${polaroids.speaking.stickyBorder} transform rotate-3 pointer-events-none relative inline-block whitespace-nowrap`}>
                <div className={`absolute -top-2 left-1/2 -translate-x-1/2 w-6 h-2 ${polaroids.speaking.tapeSub} border-y border-black/5 -rotate-2`} />
                <p className={`font-handwriting text-xs sm:text-[13px] font-normal tracking-wide whitespace-nowrap ${polaroids.speaking.stickyTextCol} leading-tight`}>
                  {polaroids.speaking.stickyText}
                </p>
              </div>
            </div>
          </div>

          {/* Row 2 Center: Warm Personal About Me Card equidistant between Heading above and Pictures below */}
          <div className="lg:col-span-6 flex justify-center items-center pt-0">
            <div className="relative w-full max-w-sm sm:max-w-md mt-0 lg:-mt-[110px]">
              
              <motion.div
                whileHover={{ scale: 1.012 }}
                className="relative w-full bg-[#FAF4E8] p-3.5 sm:p-4 rounded-sm shadow-xs border border-[#E2D5C3] text-center space-y-1.5 z-10"
                style={{
                  clipPath: 'polygon(0% 1.5%, 2% 0%, 98% 0.5%, 100% 2%, 99.5% 98%, 97% 100%, 2% 99%, 0% 97%)'
                }}
              >
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-14 h-2.5 bg-[#E8DCC4]/90 border-y border-black/5 rotate-1" />

                <span className="text-[9px] font-mono uppercase tracking-widest text-stone-500 font-medium block">
                  ✦ A Little Bit About Me
                </span>

                <h3 className="font-handwriting font-normal text-sm sm:text-base text-stone-800 leading-snug tracking-wide">
                  “Balancing thoughtful engineering with open trails &amp; analog wonder.”
                </h3>

                <p className="font-sans font-normal text-[11px] sm:text-[12px] text-stone-600 leading-relaxed text-center px-1 max-w-sm mx-auto">
                  I engineer reliable full-stack applications, interactive UI systems, and AI/ML pipelines with deep technical rigor. Outside the terminal, I recharge by trekking mountain ranges, walking ocean beaches, and sketching my imagination into notebooks. For me, software craftsmanship and outdoor curiosities balance each other—bringing fresh perspective and creative care to every problem I solve.
                </p>

                <div className="pt-1 flex flex-wrap items-center justify-center gap-1.5 text-[10px] font-mono text-stone-500">
                  <span className="px-2 py-0.5 rounded-full bg-white/70 border border-stone-200/60 text-stone-600 text-[10px] font-sans">🏔️ Mountain trekker</span>
                  <span className="px-2 py-0.5 rounded-full bg-white/70 border border-stone-200/60 text-stone-600 text-[10px] font-sans">💻 Full-stack builder</span>
                  <span className="px-2 py-0.5 rounded-full bg-white/70 border border-stone-200/60 text-stone-600 text-[10px] font-sans">🎨 Drawing imagination</span>
                  <span className="px-2 py-0.5 rounded-full bg-white/70 border border-stone-200/60 text-stone-600 text-[10px] font-sans">🌊 Beach calm</span>
                </div>
              </motion.div>

              {/* Sticky Note 1: Full-Stack Craft */}
              <div className="absolute -top-2.5 -right-2 bg-[#FFE5EC] px-2 py-0.5 rounded-xs shadow-xs border border-rose-200/60 transform rotate-4 z-20 pointer-events-none whitespace-nowrap">
                <p className="font-handwriting font-normal text-[11px] sm:text-xs text-rose-950 tracking-wide whitespace-nowrap">
                  Full-Stack Craft 💻 ✦
                </p>
              </div>

              {/* Sticky Note 2: Curiosity & Ideas */}
              <div className="absolute -bottom-2.5 -left-2 bg-[#D8F3DC] px-2 py-0.5 rounded-xs shadow-xs border border-emerald-300/60 transform -rotate-3 z-20 pointer-events-none whitespace-nowrap">
                <p className="font-handwriting font-normal text-[11px] sm:text-xs text-emerald-950 tracking-wide whitespace-nowrap">
                  Curiosity &amp; Ideas 💡 ✨
                </p>
              </div>

            </div>
          </div>

          {/* Row 2 Right: Coastal Serenity */}
          <div className="lg:col-span-3 flex justify-center lg:justify-end">
            <div className="relative">
              <PolaroidCard item={polaroids.coastal} />
              <div className={`mt-1.5 mr-1 ${polaroids.coastal.stickyBg} px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-xs shadow-xs border ${polaroids.coastal.stickyBorder} transform rotate-2 pointer-events-none relative inline-block whitespace-nowrap`}>
                <div className={`absolute -top-2 left-1/2 -translate-x-1/2 w-6 h-2 ${polaroids.coastal.tapeSub} border-y border-black/5 -rotate-1`} />
                <p className={`font-handwriting text-xs sm:text-[13px] font-normal tracking-wide whitespace-nowrap ${polaroids.coastal.stickyTextCol} leading-tight`}>
                  {polaroids.coastal.stickyText}
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* ==================================================================
            ROW 3: THIRD ROW IMAGES (4 EQUIDISTANT IMAGES ACROSS THE ENTIRE LINE)
            - 1. Analog Sketchbook (Leftmost)
            - 2. Stage & Recognition Award (Center-Left)
            - 3. Mountain Bunny Companion (Center-Right)
            - 4. Snow Expeditions (Rightmost)
            All 4 images are equidistant across the line.
        ================================================================== */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-6 items-start justify-items-center w-full">
          
          {/* 1. Analog Sketchbook (Leftmost - aligns with Left Column above) */}
          <div className="relative flex flex-col items-center lg:items-start w-full">
            <div className="mx-auto lg:ml-0">
              <PolaroidCard item={polaroids.drawing} />
              <div className={`mt-1.5 -ml-1 ${polaroids.drawing.stickyBg} px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-xs shadow-xs border ${polaroids.drawing.stickyBorder} transform -rotate-2 pointer-events-none relative inline-block whitespace-nowrap`}>
                <div className={`absolute -top-2 left-1/2 -translate-x-1/2 w-6 h-2 ${polaroids.drawing.tapeSub} border-y border-black/5 rotate-1`} />
                <p className={`font-handwriting text-xs sm:text-[13px] font-normal tracking-wide whitespace-nowrap ${polaroids.drawing.stickyTextCol} leading-tight`}>
                  {polaroids.drawing.stickyText}
                </p>
              </div>
            </div>
          </div>

          {/* 2. Stage & Recognition Award (Center-Left) */}
          <div className="relative flex flex-col items-center w-full">
            <div className="mx-auto">
              <PolaroidCard item={polaroids.award} />
              <div className={`mt-1.5 ${polaroids.award.stickyBg} px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-xs shadow-xs border ${polaroids.award.stickyBorder} transform -rotate-1 pointer-events-none relative inline-block whitespace-nowrap`}>
                <div className={`absolute -top-2 left-1/2 -translate-x-1/2 w-6 h-2 ${polaroids.award.tapeSub} border-y border-black/5 -rotate-1`} />
                <p className={`font-handwriting text-xs sm:text-[13px] font-normal tracking-wide whitespace-nowrap ${polaroids.award.stickyTextCol} leading-tight`}>
                  {polaroids.award.stickyText}
                </p>
              </div>
            </div>
          </div>

          {/* 3. Mountain Bunny Companion (Center-Right) */}
          <div className="relative flex flex-col items-center w-full">
            <div className="mx-auto">
              <PolaroidCard item={polaroids.bunny} />
              <div className={`mt-1.5 ${polaroids.bunny.stickyBg} px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-xs shadow-xs border ${polaroids.bunny.stickyBorder} transform rotate-2 pointer-events-none relative inline-block whitespace-nowrap`}>
                <div className={`absolute -top-2 left-1/2 -translate-x-1/2 w-6 h-2 ${polaroids.bunny.tapeSub} border-y border-black/5 rotate-1`} />
                <p className={`font-handwriting text-xs sm:text-[13px] font-normal tracking-wide whitespace-nowrap ${polaroids.bunny.stickyTextCol} leading-tight`}>
                  {polaroids.bunny.stickyText}
                </p>
              </div>
            </div>
          </div>

          {/* 4. Snow Expeditions (Rightmost - aligns with Right Column above) */}
          <div className="relative flex flex-col items-center lg:items-end w-full">
            <div className="mx-auto lg:mr-0">
              <PolaroidCard item={polaroids.snow} />
              <div className={`mt-1.5 -mr-1 ${polaroids.snow.stickyBg} px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-xs shadow-xs border ${polaroids.snow.stickyBorder} transform -rotate-2 pointer-events-none relative inline-block whitespace-nowrap`}>
                <div className={`absolute -top-2 left-1/2 -translate-x-1/2 w-6 h-2 ${polaroids.snow.tapeSub} border-y border-black/5 rotate-1`} />
                <p className={`font-handwriting text-xs sm:text-[13px] font-normal tracking-wide whitespace-nowrap ${polaroids.snow.stickyTextCol} leading-tight`}>
                  {polaroids.snow.stickyText}
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Subtle Bottom Transition Cue */}
      <div className="w-full flex justify-center pt-5 pb-1 z-20">
        <a 
          href="#experience"
          onClick={() => playClick()}
          className="inline-flex items-center gap-1.5 text-[10px] font-mono text-stone-500 hover:text-stone-800 transition-colors"
        >
          <span>Continue down to the Study Desk &amp; Timeline</span>
          <ArrowDown size={10} className="animate-bounce text-[#3D8B7A]" />
        </a>
      </div>

      {/* Interactive Photo Inspection Modal */}
      <AnimatePresence>
        {inspectedPhoto && (
          <div 
            onClick={() => {
              playClick();
              setInspectedPhoto(null);
            }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.92, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 15 }}
              className="relative max-w-sm sm:max-w-md w-full bg-white p-4 sm:p-5 pb-5 rounded-xl shadow-2xl border border-stone-200 z-10 max-h-[88vh] overflow-y-auto"
            >
              <button
                onClick={() => {
                  playClick();
                  setInspectedPhoto(null);
                }}
                className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 hover:text-stone-900 transition-colors cursor-pointer shadow-xs z-30"
                title="Close"
              >
                <X size={16} />
              </button>

              <div className="w-full max-h-[40vh] sm:max-h-[44vh] bg-stone-100 rounded-lg overflow-hidden mb-3.5 shadow-inner flex items-center justify-center">
                <img 
                  src={inspectedPhoto.image} 
                  alt={inspectedPhoto.title} 
                  className="max-h-[38vh] sm:max-h-[42vh] w-auto max-w-full object-contain" 
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between border-b border-stone-200/80 pb-1.5">
                  <h3 className="font-handwriting font-medium text-lg sm:text-xl text-stone-900">
                    {inspectedPhoto.title}
                  </h3>
                </div>

                <p className="font-mono text-[9px] sm:text-[10px] text-stone-500 uppercase tracking-wider">
                  {inspectedPhoto.sub}
                </p>

                <p className="font-handwriting font-normal text-sm sm:text-base text-stone-700 leading-relaxed pt-0.5">
                  "{inspectedPhoto.note}"
                </p>

                <div className="pt-1.5 flex justify-end">
                  <span className="font-handwriting font-normal text-xs text-[#3D8B7A]">
                    ✦ Personal Scrapbook Collection
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default MessyAboutMe;
