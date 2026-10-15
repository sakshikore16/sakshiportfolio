import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playSuccess, isSoundEnabled } from '../utils/sound';

export const CreativeRoomLoader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFinishing, setIsFinishing] = useState(false);
  const [istTime, setIstTime] = useState('');

  useEffect(() => {
    // Current IST Time
    try {
      setIstTime(new Date().toLocaleTimeString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }));
    } catch (e) {
      setIstTime('IST');
    }

    const startTime = Date.now();
    const duration = 2450; // Smooth ~3s total loading sequence

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const t = Math.min(1, elapsed / duration);
      // Fluid ease-out curve so progress glides smoothly to 100%
      const easeOut = 1 - Math.pow(1 - t, 2.2);
      const pct = Math.min(100, Math.round(easeOut * 100));
      setProgress(pct);

      if (pct >= 100) {
        clearInterval(interval);
        if (isSoundEnabled()) playSuccess();
        setTimeout(() => {
          setIsFinishing(true);
          setTimeout(() => {
            onComplete();
          }, 350);
        }, 150);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isFinishing && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            scale: 0.98,
            transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } 
          }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center p-4 bg-[#FCFAF7] text-slate-800 select-none overflow-hidden"
        >
          {/* Subtle Ambient Morning Glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-gradient-to-b from-[#FCECE9]/50 via-[#F7F2DE]/40 to-transparent blur-[80px]" />
          </div>

          <motion.div
            initial={{ scale: 0.94, opacity: 0, y: 12 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="relative flex flex-col items-center text-center space-y-6 z-10"
          >
            {/* Center Illustration: Pastel Minimal Cute Creative Desk (Laptop, Succulent & Pastel Stars) */}
            <div className="relative w-56 h-40 flex items-center justify-center">
              <svg viewBox="0 0 220 150" className="w-full h-full overflow-visible drop-shadow-xs" fill="none">
                
                {/* Ambient Soft Glow Behind Illustration */}
                <ellipse cx="110" cy="115" rx="80" ry="12" fill="rgba(212, 185, 150, 0.18)" />

                {/* 1. PASTEL FLOATING SPARKLES & STARS */}
                <motion.g
                  animate={{ y: [0, -5, 0], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  {/* Pastel Lavender Sparkle Star */}
                  <path d="M 36 28 Q 36 36 44 36 Q 36 36 36 44 Q 36 36 28 36 Q 36 36 36 28 Z" fill="#D8B4E2" />
                  {/* Pastel Buttercup Sparkle */}
                  <path d="M 184 32 Q 184 39 191 39 Q 184 39 184 46 Q 184 39 177 39 Q 184 39 184 32 Z" fill="#FDE047" />
                  {/* Cute Tiny Mint Star */}
                  <circle cx="56" cy="18" r="3" fill="#A7D7C5" />
                  <circle cx="168" cy="22" r="2.5" fill="#FFCAD4" />
                </motion.g>

                {/* 2. CUTE PASTEL CREATIVE LAPTOP (CENTER-LEFT) */}
                <g transform="translate(42, 34)">
                  {/* Laptop Screen Backplate */}
                  <rect x="10" y="12" width="86" height="58" rx="8" fill="#F3E8FF" stroke="#7A6855" strokeWidth="1.8" />
                  {/* Laptop Screen Display Area */}
                  <rect x="15" y="17" width="76" height="48" rx="5" fill="#FFFFFF" />
                  
                  {/* Cute Kawaii Face & Code Cursor on Screen */}
                  <g transform="translate(25, 26)">
                    {/* Happy eyes */}
                    <path d="M 16 14 Q 19 10 22 14" stroke="#5C3B1A" strokeWidth="1.6" strokeLinecap="round" fill="none" />
                    <path d="M 34 14 Q 37 10 40 14" stroke="#5C3B1A" strokeWidth="1.6" strokeLinecap="round" fill="none" />
                    {/* Cheeks */}
                    <circle cx="15" cy="18" r="2.5" fill="#FFCAD4" />
                    <circle cx="41" cy="18" r="2.5" fill="#FFCAD4" />
                    {/* Smile */}
                    <path d="M 26 18 Q 28 21 30 18" stroke="#5C3B1A" strokeWidth="1.4" strokeLinecap="round" fill="none" />
                    {/* Cute Pastel Ribbon / Heart above */}
                    <path d="M 28 4 Q 28 8 32 8 Q 28 8 28 12 Q 28 8 24 8 Q 28 8 28 4 Z" fill="#F4A261" />
                  </g>

                  {/* Laptop Base (Keyboard Deck) */}
                  <path
                    d="M 2 70 L 104 70 C 105 70 106 72 104 74 L 98 77 C 97 78 95 78 93 78 L 13 78 C 11 78 9 78 8 77 L 2 74 C 0 72 1 70 2 70 Z"
                    fill="#E9D5FF"
                    stroke="#7A6855"
                    strokeWidth="1.8"
                    strokeLinejoin="round"
                  />
                  {/* Touchpad */}
                  <rect x="43" y="71" width="20" height="5" rx="1.5" fill="#FFFFFF" stroke="#7A6855" strokeWidth="1" />
                  {/* Shadow Under Laptop */}
                  <ellipse cx="53" cy="80" rx="44" ry="4" fill="rgba(80, 50, 30, 0.12)" />
                </g>

                {/* 3. CUTE BLUSHING DESK SUCCULENT POT (RIGHT SIDE) */}
                <g transform="translate(142, 54)">
                  {/* Floating Gentle Love Heart */}
                  <motion.path
                    d="M 20 2 C 20 -3 26 -3 26 2 C 26 7 20 11 20 11 C 20 11 14 7 14 2 C 14 -3 20 -3 20 2 Z"
                    fill="#FF85A1"
                    animate={{ y: [0, -5, 0], scale: [1, 1.12, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />

                  {/* Sprouting Plant Stems & Leaves */}
                  <path d="M 20 28 Q 14 18 10 16 C 8 22 14 27 18 28 Z" fill="#95D5B2" stroke="#52796F" strokeWidth="1.2" />
                  <path d="M 20 28 Q 26 18 30 16 C 32 22 26 27 22 28 Z" fill="#74C69D" stroke="#52796F" strokeWidth="1.2" />
                  <path d="M 20 28 Q 20 14 20 12 C 17 18 20 24 20 28 Z" fill="#52B788" stroke="#52796F" strokeWidth="1.2" />
                  
                  {/* Terracotta Plant Pot */}
                  <path
                    d="M 8 28 L 32 28 L 28 50 C 28 52 26 54 24 54 L 16 54 C 14 54 12 52 12 50 Z"
                    fill="#E07A5F"
                    stroke="#7A4436"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                  />
                  {/* Pot Rim */}
                  <rect x="6" y="24" width="28" height="6" rx="2.5" fill="#E76F51" stroke="#7A4436" strokeWidth="1.5" />
                  
                  {/* Kawaii Face on Pot */}
                  <circle cx="16" cy="38" r="1.5" fill="#4A2820" />
                  <circle cx="24" cy="38" r="1.5" fill="#4A2820" />
                  <circle cx="13" cy="41" r="2" fill="#FFA5BA" opacity="0.8" />
                  <circle cx="27" cy="41" r="2" fill="#FFA5BA" opacity="0.8" />
                  <path d="M 18 41 Q 20 43 22 41" stroke="#4A2820" strokeWidth="1.2" strokeLinecap="round" fill="none" />

                  {/* Shadow Under Pot */}
                  <ellipse cx="20" cy="56" rx="14" ry="2.5" fill="rgba(80, 50, 30, 0.12)" />
                </g>

              </svg>
            </div>

            {/* Subtext in Code Font (Generic, Aesthetic & Simple) */}
            <div className="space-y-2 max-w-sm">
              <p className="font-mono text-xs sm:text-sm text-stone-800 tracking-tight">
                <span className="text-[#E07A5F] font-bold">&gt; </span>
                Crafting digital feelings &amp; living systems...
              </p>
              
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-stone-200/80 shadow-2xs text-[10px] sm:text-[11px] font-mono text-stone-600">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>creative.studio.init() • Ready</span>
              </div>
            </div>

            {/* Delicate Animated Progress Line in Code Font */}
            <div className="space-y-1.5 flex flex-col items-center pt-1 font-mono">
              <div className="w-48 h-1.5 bg-stone-200/80 rounded-full overflow-hidden border border-stone-300/40">
                <motion.div 
                  className="h-full bg-[#A3B18A] rounded-full transition-all duration-75 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="flex items-center gap-1.5 text-[11px] text-stone-500 font-mono">
                <span className="text-stone-400">loading_space:</span>
                <span className="text-emerald-700 font-bold">{progress}%</span>
              </div>
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CreativeRoomLoader;
