import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { playPluck, playBloomChime } from '../utils/sound';

// 1. Realistic Attached Bud (Botanical sepals & emerging petal tip)
const SmallAttachedBud = () => (
  <svg viewBox="0 0 54 70" className="w-8 h-10 overflow-visible" fill="none">
    <path d="M 27 0 Q 24 10 27 20" stroke="#2D6A4F" strokeWidth="2.8" strokeLinecap="round" />
    <path d="M 27 10 Q 35 12 33 5 Q 31 0 36 2" stroke="#52B788" strokeWidth="1.2" strokeLinecap="round" fill="none" />
    <path d="M 27 20 C 12 28 12 42 20 52 C 24 40 26 28 27 20 Z" fill="#40916C" stroke="#1B4332" strokeWidth="1" />
    <path d="M 27 20 C 42 28 42 42 34 52 C 30 40 28 28 27 20 Z" fill="#2D6A4F" stroke="#1B4332" strokeWidth="1" />
    <path d="M 27 20 C 21 32 22 46 27 58 C 32 46 33 32 27 20 Z" fill="#52B788" stroke="#1B4332" strokeWidth="1" />
    <path d="M 23 48 C 25 62 29 62 31 48 C 29 55 25 55 23 48 Z" fill="#FFD166" stroke="#F48C06" strokeWidth="0.8" />
    <circle cx="27" cy="54" r="2" fill="#FFE29A" />
  </svg>
);

// 2. Realistic Half-Grown Flower (Curling petals & exposed golden stamens)
const SmallAttachedHalfFlower = () => (
  <svg viewBox="0 0 66 74" className="w-9 h-11 overflow-visible" fill="none">
    <path d="M 33 0 Q 30 8 33 18" stroke="#2D6A4F" strokeWidth="2.8" strokeLinecap="round" />
    <path d="M 33 18 C 18 22 12 32 15 38 C 22 28 29 22 33 18 Z" fill="#2D6A4F" stroke="#1B4332" strokeWidth="1" />
    <path d="M 33 18 C 48 22 54 32 51 38 C 44 28 37 22 33 18 Z" fill="#40916C" stroke="#1B4332" strokeWidth="1" />
    <path d="M 24 26 C 14 42 19 56 26 62 C 28 48 30 34 33 22 Z" fill="#FFB703" stroke="#E85D04" strokeWidth="0.9" />
    <path d="M 42 26 C 52 42 47 56 40 62 C 38 48 36 34 33 22 Z" fill="#FFC300" stroke="#E85D04" strokeWidth="0.9" />
    <path d="M 33 20 C 26 38 28 58 33 65 C 38 58 40 38 33 20 Z" fill="#FFD000" stroke="#E85D04" strokeWidth="0.9" />
    <circle cx="33" cy="48" r="4.5" fill="#5A3E1B" />
    <circle cx="33" cy="48" r="2.5" fill="#FFBA08" />
  </svg>
);

// 3. Realistic Full Radiant Sunflower (Multi-layered petals & seed disc)
const SmallAttachedFullFlower = () => (
  <svg viewBox="0 0 86 90" className="w-11 h-12 overflow-visible" fill="none">
    <path d="M 43 0 Q 40 8 43 18" stroke="#2D6A4F" strokeWidth="3" strokeLinecap="round" />
    <path d="M 43 6 Q 50 8 47 2 Q 44 -3 51 0" stroke="#74C69D" strokeWidth="1.2" strokeLinecap="round" fill="none" />
    {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => (
      <g key={i} transform={`rotate(${angle} 43 48)`}>
        <path 
          d="M 43 48 C 39 34 38 18 43 11 C 48 18 47 34 43 48 Z" 
          fill={i % 2 === 0 ? "#FFB703" : "#FB8500"} 
          stroke="#D97706" 
          strokeWidth="0.7" 
        />
      </g>
    ))}
    {[15, 45, 75, 105, 135, 165, 195, 225, 255, 285, 315, 345].map((angle, i) => (
      <g key={`inner-${i}`} transform={`rotate(${angle} 43 48)`}>
        <path 
          d="M 43 48 C 40 36 40 22 43 16 C 46 22 46 36 43 48 Z" 
          fill="#FFD166" 
          stroke="#F59E0B" 
          strokeWidth="0.6" 
        />
      </g>
    ))}
    <circle cx="43" cy="48" r="14" fill="#3E2723" stroke="#271610" strokeWidth="1.5" />
    <circle cx="43" cy="48" r="10" fill="#4E342E" />
    <circle cx="43" cy="48" r="6" fill="#5D4037" />
    {[0, 45, 90, 135, 180, 225, 270, 315].map((ang, i) => (
      <circle 
        key={`pollen-${i}`} 
        cx={43 + 9 * Math.cos((ang * Math.PI) / 180)} 
        cy={48 + 9 * Math.sin((ang * Math.PI) / 180)} 
        r="1.2" 
        fill="#F59E0B" 
      />
    ))}
  </svg>
);

// 100% Full-Width Creeping Ivy Vine with Blooming Jasmine, Sunflowers & Pink Blossoms
const FullWidthLushCreeper = () => (
  <svg viewBox="0 0 1440 100" className="w-full h-24 pointer-events-none absolute inset-x-0 top-1 z-15 overflow-visible" fill="none" preserveAspectRatio="none">
    {/* Primary Sturdy Winding Stem */}
    <path d="M 0 45 Q 180 14 360 48 T 720 42 T 1080 50 T 1440 40" stroke="#1B4332" strokeWidth="5" strokeLinecap="round" />
    <path d="M 0 45 Q 180 14 360 48 T 720 42 T 1080 50 T 1440 40" stroke="#2D6A4F" strokeWidth="3.8" strokeLinecap="round" />
    {/* Secondary Coiling Tendrils */}
    <path d="M 20 40 Q 120 70 240 40 Q 360 12 480 46 Q 600 74 720 40 Q 840 12 960 46 Q 1080 72 1200 40 Q 1320 12 1440 44" stroke="#40916C" strokeWidth="3" strokeLinecap="round" />
    <path d="M 60 50 Q 180 80 300 50 Q 420 18 540 48 T 900 48 T 1260 50 T 1440 46" stroke="#52B788" strokeWidth="2" strokeLinecap="round" strokeDasharray="10 4" />
    
    {/* Repeating Botanical Leaves Across 1440px */}
    {[
      [50, 30, -35, 1], [100, 60, 38, 2], [160, 24, -20, 0], [220, 62, 28, 1], [280, 27, -25, 2],
      [360, 65, 32, 2], [420, 22, -28, 0], [480, 64, 38, 1], [540, 24, -18, 2], [600, 65, 28, 0],
      [680, 23, -26, 1], [740, 62, 40, 2], [800, 26, -16, 0], [860, 62, 32, 1], [920, 22, -30, 2],
      [980, 65, 38, 0], [1040, 24, -20, 1], [1100, 64, 30, 2], [1180, 23, -24, 0], [1260, 65, 42, 1],
      [1340, 26, -18, 2], [1400, 62, 32, 0]
    ].map(([x, y, rot, type], idx) => (
      <g key={idx} transform={`translate(${x}, ${y}) rotate(${rot})`}>
        <line x1="0" y1="0" x2="0" y2="4" stroke="#1B4332" strokeWidth="1.2" strokeLinecap="round" />
        <path 
          d="M 0 0 C -12 -14 -6 -28 0 -34 C 6 -28 12 -14 0 0 Z" 
          fill={type === 0 ? "#2D6A4F" : type === 1 ? "#40916C" : "#52B788"} 
          stroke="#1B4332" 
          strokeWidth="1" 
        />
        <path d="M 0 0 L 0 -28" stroke="#95D5B2" strokeWidth="0.8" opacity="0.9" />
      </g>
    ))}

    {/* DELICATE BLOOMING BLOSSOMS DOTTED ALONG THE HANGING VINES */}
    {[
      // White Jasmine buds
      [120, 36, "#FFFDF7", "#FFE082"],
      [310, 56, "#FFFDF7", "#FFE082"],
      [630, 32, "#FFFDF7", "#FFE082"],
      [890, 56, "#FFFDF7", "#FFE082"],
      [1220, 34, "#FFFDF7", "#FFE082"],
      // Pastel Pink Blossoms
      [190, 58, "#F8BBD0", "#C2185B"],
      [470, 30, "#F8BBD0", "#C2185B"],
      [760, 60, "#F8BBD0", "#C2185B"],
      [1060, 32, "#F8BBD0", "#C2185B"],
      [1350, 58, "#F8BBD0", "#C2185B"],
      // Mini Sunflowers
      [260, 32, "#FFD166", "#E85D04"],
      [580, 58, "#FFD166", "#E85D04"],
      [960, 34, "#FFD166", "#E85D04"],
      [1150, 60, "#FFD166", "#E85D04"]
    ].map(([cx, cy, fill, stroke], fIdx) => (
      <g key={`flower-${fIdx}`} transform={`translate(${cx}, ${cy})`}>
        <circle cx="0" cy="0" r="4.5" fill={fill} stroke={stroke} strokeWidth="1" />
        <circle cx="0" cy="0" r="1.8" fill={stroke} />
      </g>
    ))}
  </svg>
);

// 100% Full-Width Animated Meadow Grass with Swaying Wildflower Heads
const FullWidthSwayingGrass = () => (
  <div className="w-full relative h-16 overflow-hidden pointer-events-none select-none">
    <svg viewBox="0 0 1440 65" className="w-full h-full" fill="none" preserveAspectRatio="none">
      {/* Background dense grass layer */}
      <path 
        d="M 0 65 L 0 35 
           Q 20 15 35 32 Q 50 12 65 35 Q 80 18 95 34 Q 110 10 125 36 
           Q 155 16 170 34 Q 185 12 200 35 Q 215 18 230 33 Q 245 14 260 35
           Q 290 15 305 34 Q 320 10 335 36 Q 350 16 365 33 Q 380 12 395 35
           Q 425 14 440 35 Q 455 10 470 36 Q 485 18 500 34 Q 515 12 530 35
           Q 560 15 575 34 Q 590 10 605 36 Q 620 16 635 33 Q 650 12 665 35
           Q 695 14 710 35 Q 725 10 740 36 Q 755 18 770 34 Q 785 12 800 35
           Q 830 15 845 34 Q 860 10 875 36 Q 890 16 905 33 Q 920 12 935 35
           Q 965 14 980 35 Q 995 10 1010 36 Q 1025 18 1040 34 Q 1055 12 1070 35
           Q 1100 15 1115 34 Q 1130 10 1145 36 Q 1160 16 1175 33 Q 1190 12 1205 35
           Q 1235 14 1250 35 Q 1265 10 1280 36 Q 1295 18 1310 34 Q 1325 12 1340 35
           Q 1370 15 1385 34 Q 1400 10 1415 36 Q 1430 16 1440 33 L 1440 65 Z" 
        fill="#2E7D32" 
        opacity="0.65" 
      />
      {/* Foreground lush blades of grass */}
      <path 
        d="M 0 65 L 0 42 
           Q 15 20 30 40 Q 45 18 60 44 Q 75 25 90 42 Q 105 15 120 43 
           Q 135 22 150 42 Q 165 16 180 44 Q 195 24 210 42 Q 225 18 240 43
           Q 255 20 270 42 Q 285 15 300 44 Q 315 25 330 42 Q 345 18 360 43
           Q 375 22 390 42 Q 405 16 420 44 Q 435 24 450 42 Q 465 18 480 43
           Q 495 20 510 42 Q 525 15 540 44 Q 555 25 570 42 Q 585 18 600 43
           Q 615 22 630 42 Q 645 16 660 44 Q 675 24 690 42 Q 705 18 720 43
           Q 735 20 750 42 Q 765 15 780 44 Q 795 25 810 42 Q 825 18 840 43
           Q 855 22 870 42 Q 885 16 900 44 Q 915 24 930 42 Q 945 18 960 43
           Q 975 20 990 42 Q 1005 15 1020 44 Q 1035 25 1050 42 Q 1065 18 1080 43
           Q 1095 22 1110 42 Q 1125 16 1140 44 Q 1155 24 1170 42 Q 1185 18 1200 43
           Q 1215 20 1230 42 Q 1245 15 1260 44 Q 1275 25 1290 42 Q 1305 18 1320 43
           Q 1335 22 1350 42 Q 1365 16 1380 44 Q 1395 24 1410 42 Q 1425 18 1440 43 L 1440 65 Z" 
        fill="#43A047" 
      />
    </svg>

    {/* Wildflower heads gently swaying in the breeze across the bottom */}
    <div className="absolute inset-0 flex justify-around items-end pb-3 px-6">
      {[
        { color: 'text-amber-300', bg: 'bg-amber-400', delay: 0 },
        { color: 'text-pink-300', bg: 'bg-rose-400', delay: 0.3 },
        { color: 'text-yellow-200', bg: 'bg-amber-300', delay: 0.6 },
        { color: 'text-sky-300', bg: 'bg-sky-400', delay: 0.2 },
        { color: 'text-rose-300', bg: 'bg-rose-400', delay: 0.5 },
        { color: 'text-amber-200', bg: 'bg-amber-400', delay: 0.8 },
        { color: 'text-pink-300', bg: 'bg-pink-400', delay: 0.1 },
        { color: 'text-emerald-200', bg: 'bg-emerald-300', delay: 0.4 }
      ].map((fl, i) => (
        <motion.div
          key={i}
          animate={{ rotate: [-6, 6, -6], y: [0, -2, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: fl.delay }}
          className="flex flex-col items-center"
        >
          <div className={`w-3 h-3 rounded-full ${fl.bg} shadow-xs border border-white/60 flex items-center justify-center text-[7px]`}>
            ✦
          </div>
          <div className="w-0.5 h-3 bg-emerald-700" />
        </motion.div>
      ))}
    </div>
  </div>
);

import { educationData } from '../data/portfolioData';

export const EducationCreeperVine = () => {
  const [openCards, setOpenCards] = useState({
    0: true,
    1: true,
    2: true
  });

  const educationCards = educationData;

  const handleFlowerClick = (id) => {
    playPluck();
    setOpenCards(prev => {
      const nextState = !prev[id];
      if (nextState) {
        setTimeout(() => playBloomChime(), 150);
      }
      return { ...prev, [id]: nextState };
    });
  };

  const trellisContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const tagDropVariants = {
    hidden: { y: -30, opacity: 0, scaleY: 0.7 },
    visible: (customRotate) => ({
      y: 0,
      opacity: 1,
      scaleY: 1,
      rotate: [customRotate * 2, customRotate, 0],
      transition: {
        type: 'spring',
        stiffness: 220,
        damping: 18
      }
    })
  };

  return (
    <section 
      id="education" 
      className="py-14 sm:py-20 relative overflow-hidden bg-transparent text-slate-900 transition-colors duration-500 select-none flex flex-col justify-between"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 relative z-20 mb-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-800 text-xs font-mono font-medium">
            <Sparkles size={13} />
            <span>Academic Milestones</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-light tracking-tight">
            What My <span className="font-serif italic text-emerald-600">Past Education</span>
          </h2>
          <p className="text-xs sm:text-sm font-light text-slate-600">
            Click any flower or hanging tag along the full-width botanical trellis to inspect each milestone.
          </p>
        </div>

      </div>

      {/* ========================================================
          100% FULL-WIDTH HORIZONTAL BAMBOO TRELLIS POLE & CREEPER VINE
          Extends completely from left edge of viewport to right edge!
      ======================================================== */}
      <div className="w-full relative z-15">
        
        {/* Full-width Bamboo Trellis Beam */}
        <div className="relative h-5 w-full bg-gradient-to-r from-[#D7BA89] via-[#E8D0A7] to-[#C9A975] border-y-2 border-[#8C6D3B] shadow-md flex items-center justify-around px-8">
          {[...Array(16)].map((_, i) => (
            <div key={i} className="w-1.5 h-full bg-[#7A5B28] opacity-60" />
          ))}
          <div className="absolute top-0.5 inset-x-4 h-1 bg-white/40 rounded-full pointer-events-none" />
        </div>

        {/* Full-width Lush Creeper Vine with Jasmine & Sunflowers */}
        <FullWidthLushCreeper />

        {/* Centered Staggered Drop Tags Suspended from Vine */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-2">
          <motion.div 
            variants={trellisContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="relative z-20 grid grid-cols-1 md:grid-cols-3 gap-6 pt-1 items-start"
          >
            {educationCards.map((card, idx) => (
              <div key={card.id} className="flex flex-col items-center text-center">
                
                {/* Stem connecting from bamboo vine down to flower */}
                <div className="w-0.5 h-7 sm:h-8 bg-emerald-700" />

                {/* Attached Botanical Flower (Animates bloom scale on scroll) */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: [0, 1.25, 1] }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 280, damping: 16, delay: idx * 0.15 }}
                  onClick={() => handleFlowerClick(card.id)}
                  className="cursor-pointer group flex flex-col items-center select-none"
                  title={`Click flower to ${openCards[card.id] ? 'close' : 'open'} card`}
                >
                  <div className="h-12 flex items-center justify-center group-hover:scale-115 transition-transform duration-200">
                    {idx === 0 && <SmallAttachedBud />}
                    {idx === 1 && <SmallAttachedHalfFlower />}
                    {idx === 2 && <SmallAttachedFullFlower />}
                  </div>

                  <div className="h-9 flex flex-col justify-center items-center pt-1 space-y-0.5">
                    <div className="text-[11px] sm:text-xs font-mono font-bold text-slate-800 leading-tight">
                      {card.flowerLabel}
                    </div>
                    <div className="text-[9px] font-mono text-slate-500 leading-tight">
                      {card.flowerSubtitle}
                    </div>
                  </div>
                </motion.div>

                {/* Hanging Twine Cord */}
                <div className="w-0.5 h-5 bg-[#B59E8D] opacity-80 my-0.5" />

                {/* Hanging Kraft-Paper Luggage Tag Card */}
                <motion.div
                  custom={card.swingRotate}
                  variants={tagDropVariants}
                  style={{ transformOrigin: 'top center' }}
                  className="w-full max-w-xs"
                >
                  <AnimatePresence mode="wait">
                    {openCards[card.id] ? (
                      <motion.div
                        key="open"
                        initial={{ opacity: 0, scaleY: 0.8, y: -6 }}
                        animate={{ opacity: 1, scaleY: 1, y: 0 }}
                        exit={{ opacity: 0, scaleY: 0.8, y: -6 }}
                        transition={{ duration: 0.22, ease: "easeOut" }}
                        style={{ transformOrigin: 'top center' }}
                        onClick={() => handleFlowerClick(card.id)}
                        className={`w-full h-[245px] flex flex-col justify-between p-4 rounded-2xl bg-white/95 backdrop-blur-md border-2 ${card.cardBorder} shadow-lg hover:shadow-xl relative select-none cursor-pointer transition-shadow group`}
                      >
                        {/* Eyelet Tag Hole at Top */}
                        <div className="w-3 h-3 rounded-full bg-[#EAE0D3] border-2 border-[#B59E8D] mx-auto -mt-2 mb-2 shadow-inner shrink-0" />

                        {/* Pastel Header Pill */}
                        <div className={`px-3 py-1 rounded-full ${card.headerBg} text-white text-center shadow-xs mb-2 shrink-0`}>
                          <div className="text-[10px] font-mono font-bold tracking-wider uppercase">
                            {card.title}
                          </div>
                          <div className="text-[8px] font-sans opacity-90">
                            {card.subtitle}
                          </div>
                        </div>

                        {/* Card Body */}
                        <div className="flex-1 flex flex-col justify-between text-center py-0.5">
                          <div className="text-2xl group-hover:scale-110 transition-transform">
                            {card.iconEmoji}
                          </div>

                          <div className="h-8 sm:h-9 flex items-center justify-center">
                            <h4 className="text-xs sm:text-sm font-bold text-slate-900 font-serif italic leading-tight">
                              {card.institution}
                            </h4>
                          </div>

                          <div className="text-[10px] font-mono text-slate-500 font-semibold">
                            {card.period}
                          </div>

                          <div className="flex items-center justify-center">
                            <span className="px-2 py-0.5 rounded-full bg-black/5 text-[9px] font-mono font-bold text-slate-800">
                              {card.grade}
                            </span>
                          </div>

                          <div className="h-4 flex items-center justify-center">
                            <span className="text-[9px] font-sans text-slate-500 block truncate max-w-full">
                              {card.stream}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="folded"
                        initial={{ opacity: 0, scaleY: 0.8 }}
                        animate={{ opacity: 1, scaleY: 1 }}
                        exit={{ opacity: 0, scaleY: 0.8 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => handleFlowerClick(card.id)}
                        className="px-3 py-1.5 rounded-full bg-white/80 border border-emerald-500/30 text-[10px] font-mono text-slate-500 hover:text-emerald-600 cursor-pointer shadow-xs"
                      >
                        ✦ Click to Unfold
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

              </div>
            ))}
          </motion.div>
        </div>

      </div>

      {/* ========================================================
          100% FULL-WIDTH BOTTOM GRASS WITH SWAYING WILDFLOWER HEADS
      ======================================================== */}
      <div className="w-full relative mt-12">
        <FullWidthSwayingGrass />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 flex items-center justify-between text-[10px] font-mono text-slate-500 border-t border-black/5">
          <span>✦ Living Botanical Garden Trellis • 100% Full Width</span>
          <span>Click any flower to drop down tags</span>
        </div>
      </div>

    </section>
  );
};

export default EducationCreeperVine;
