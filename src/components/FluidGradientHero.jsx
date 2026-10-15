import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, FileText, Send, Clock, Wind } from 'lucide-react';
import { playBloomChime, playPop, playClick } from '../utils/sound';

export const FluidGradientHero = ({ 
  onExploreProjects, 
  onOpenResume, 
  isWindowOpen: controlledWindowOpen, 
  onToggleWindow 
}) => {
  const [internalWindowOpened, setInternalWindowOpened] = useState(false);
  const windowOpened = controlledWindowOpen !== undefined ? controlledWindowOpen : internalWindowOpened;

  const [potInteractions, setPotInteractions] = useState(0);
  const [showHearts, setShowHearts] = useState(false);

  // Real-time live clock for Mumbai (IST)
  const [mumbaiTime, setMumbaiTime] = useState(() => {
    return new Date().toLocaleTimeString('en-US', {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setMumbaiTime(new Date().toLocaleTimeString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleToggleWindow = () => {
    playBloomChime();
    if (onToggleWindow) {
      onToggleWindow(!windowOpened);
    } else {
      setInternalWindowOpened(!internalWindowOpened);
    }
  };

  const handlePetPlant = () => {
    setPotInteractions((prev) => prev + 1);
    playPop();
    setShowHearts(true);
    setTimeout(() => setShowHearts(false), 1400);
  };

  return (
    <section 
      id="hero"
      className={`relative w-full flex flex-col justify-center items-center select-none transition-all duration-700 ${
        windowOpened 
          ? 'min-h-screen pt-20 sm:pt-24 pb-12 sm:pb-16 px-4 overflow-visible' 
          : 'h-screen p-0 fixed inset-0 z-40 bg-[#FCFAF7] overflow-hidden'
      }`}
    >
      {/* 
        ========================================================================
        CENTER: MINIMAL WHITE ARCHED WINDOW
        - Frame: Scandinavian matte white finish with Roman arch (rounded-t-full)
        - Closed: Full-screen arched window taking viewport
        - Open: Scales down smoothly into centered frame with 3D open shutters
        ========================================================================
      */}
      <motion.div 
        layout
        transition={{ 
          type: "spring",
          stiffness: 140,
          damping: 24
        }}
        style={{
          width: '100%',
          maxWidth: windowOpened ? 920 : '100vw',
          height: windowOpened ? 560 : '100vh',
          maxHeight: windowOpened ? 580 : '100vh'
        }}
        className="mx-auto relative flex flex-col items-center justify-center transition-all overflow-visible"
      >
        
        {/* Floating Hearts Notification when petting plant */}
        <AnimatePresence>
          {showHearts && (
            <motion.div
              initial={{ opacity: 0, y: 0, scale: 0.5 }}
              animate={{ opacity: 1, y: -45, scale: 1.1 }}
              exit={{ opacity: 0, y: -65 }}
              transition={{ duration: 1.2 }}
              className="absolute top-48 left-14 z-50 pointer-events-none flex items-center gap-1 text-sm"
            >
              <span>💕</span>
              <span className="text-xs font-mono font-medium text-rose-500 bg-white/95 px-2 py-0.5 rounded-full shadow-xs border border-rose-100">
                Happiness +1!
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 
          ======================================================================
          3D DUAL SHUTTERS (CRISP MATTE WHITE FINISH)
          - Mounted around window frame with perspective 1200px
          - Left swings to -115deg, Right swings to +115deg
          - Retains smooth curved Roman arch top
          - overflow-visible ensures open shutters REMAIN VISIBLE on outer flanks!
          ======================================================================
        */}
        <div 
          className="absolute inset-0 pointer-events-none z-30 overflow-visible"
          style={{ perspective: '1200px' }}
        >
          {/* Left Matte White Shutter */}
          <motion.div
            className="absolute top-0 bottom-6 left-0 w-1/2 pointer-events-auto"
            style={{ 
              transformOrigin: 'left center',
              borderRadius: '260px 0 0 0'
            }}
            animate={{
              rotateY: windowOpened ? -115 : 0
            }}
            transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
          >
            <div 
              className="w-full h-full bg-[#FAF8F5] border-r-2 border-l-[6px] border-t-[6px] border-b-2 border-[#EAE3DB] shadow-xl p-2.5 sm:p-3 relative flex flex-col justify-between overflow-hidden"
              style={{ borderRadius: '260px 0 0 0' }}
            >
              {/* Subtle Steel / Satin Brass Hinges */}
              <div className="absolute left-1 top-12 w-1.5 h-6 bg-[#C4BCB3] rounded-xs shadow-xs z-20" />
              <div className="absolute left-1 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-[#C4BCB3] rounded-xs shadow-xs z-20" />
              <div className="absolute left-1 bottom-12 w-1.5 h-6 bg-[#C4BCB3] rounded-xs shadow-xs z-20" />

              {/* Minimalist Panes with Thin Mullion Grid */}
              <div className="w-full h-full grid grid-rows-3 grid-cols-2 gap-2 p-1 relative z-10">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="border border-stone-200/90 rounded-sm relative overflow-hidden bg-white/40 shadow-2xs">
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent" style={{ transform: 'skewX(-20deg)' }} />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Matte White Shutter */}
          <motion.div
            className="absolute top-0 bottom-6 right-0 w-1/2 pointer-events-auto"
            style={{ 
              transformOrigin: 'right center',
              borderRadius: '0 260px 0 0'
            }}
            animate={{
              rotateY: windowOpened ? 115 : 0
            }}
            transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
          >
            <div 
              className="w-full h-full bg-[#FAF8F5] border-l-2 border-r-[6px] border-t-[6px] border-b-2 border-[#EAE3DB] shadow-xl p-2.5 sm:p-3 relative flex flex-col justify-between overflow-hidden"
              style={{ borderRadius: '0 260px 0 0' }}
            >
              {/* Subtle Steel / Satin Brass Hinges */}
              <div className="absolute right-1 top-12 w-1.5 h-6 bg-[#C4BCB3] rounded-xs shadow-xs z-20" />
              <div className="absolute right-1 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-[#C4BCB3] rounded-xs shadow-xs z-20" />
              <div className="absolute right-1 bottom-12 w-1.5 h-6 bg-[#C4BCB3] rounded-xs shadow-xs z-20" />

              {/* Minimalist Panes with Thin Mullion Grid */}
              <div className="w-full h-full grid grid-rows-3 grid-cols-2 gap-2 p-1 relative z-10">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="border border-stone-200/90 rounded-sm relative overflow-hidden bg-white/40 shadow-2xs">
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent" style={{ transform: 'skewX(-20deg)' }} />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* 
          ======================================================================
          THE SCANDINAVIAN MATTE WHITE ARCHED WINDOW FRAME
          - Retains the smooth Roman Arch (rounded-t-full) in both states
          - Finish: border-[#F4EFEA] bg-white/40 ring-1 ring-stone-200/50 shadow-xl
          ======================================================================
        */}
        <motion.div 
          layout
          transition={{ 
            type: "spring",
            stiffness: 140,
            damping: 24
          }}
          style={{
            borderRadius: '260px 260px 0 0'
          }}
          className={`relative w-full h-full border-[#F4EFEA] bg-white/40 ring-1 ring-stone-200/50 shadow-xl overflow-hidden flex flex-col ${
            windowOpened ? 'border-[16px] sm:border-[20px]' : 'border-[12px] sm:border-[16px]'
          }`}
        >
          
          {/* Animated Bandra-Worli Sea Link Canvas Inside Window */}
          <div className="relative w-full flex-1 overflow-hidden flex flex-col justify-center items-center px-4 sm:px-8">
            
            {/* =================================================================
                BANDRA-WORLI SEA LINK ANIMATED LIVING VIEW
                - Morning pastel sky (lavender to powder blue #D2E7F5)
                - Distant Mumbai coastal skyline
                - Iconic Sea Link cable-stayed bridge with moving traffic
                - Rolling ocean wave ripples
                - EXACTLY ONE cute smiling morning sun clipart in the sky!
            ================================================================= */}
            <div 
              className="absolute inset-0 w-full h-full select-none pointer-events-none transition-all duration-700"
              style={{
                filter: windowOpened ? 'blur(0px)' : 'blur(14px)',
                transform: windowOpened ? 'scale(1.02)' : 'scale(1.05)'
              }}
            >
              <svg viewBox="0 0 1000 600" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice">
                <defs>
                  {/* Sky Gradient: Atmospheric Morning Mist */}
                  <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#E3F0FA" />
                    <stop offset="45%" stopColor="#FDECE8" />
                    <stop offset="78%" stopColor="#FFF8EE" />
                    <stop offset="100%" stopColor="#D9ECF7" />
                  </linearGradient>

                  {/* Sea Gradient: Powder Blue and Seafoam Mist */}
                  <linearGradient id="seaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#9BC7DF" />
                    <stop offset="35%" stopColor="#B8D8EC" />
                    <stop offset="70%" stopColor="#CBE4DE" />
                    <stop offset="100%" stopColor="#D4EAE2" />
                  </linearGradient>

                  {/* Water Swell Shimmer */}
                  <linearGradient id="shimmerGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="rgba(255,255,255,0)" />
                    <stop offset="50%" stopColor="rgba(255,255,255,0.4)" />
                    <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                  </linearGradient>
                </defs>

                {/* 1. Atmospheric Sky */}
                <rect width="1000" height="400" fill="url(#skyGrad)" />

                {/* 2. Soft Morning Sea Mist Haze */}
                <ellipse cx="500" cy="370" rx="600" ry="60" fill="#FCEAE4" opacity="0.5" />

                {/* 3. Distant Mumbai Coastal Skyline Silhouette */}
                <g fill="#AEC7DC" opacity="0.45">
                  <rect x="70" y="325" width="16" height="55" rx="1" />
                  <rect x="92" y="308" width="22" height="72" rx="1" />
                  <rect x="120" y="328" width="18" height="52" rx="1" />
                  <rect x="144" y="296" width="15" height="84" rx="1" />
                  <polygon points="144,296 151.5,278 159,296" />
                  <rect x="165" y="332" width="20" height="48" rx="1" />

                  <rect x="790" y="318" width="20" height="62" rx="1" />
                  <rect x="816" y="302" width="18" height="78" rx="1" />
                  <polygon points="816,302 825,284 834,302" />
                  <rect x="840" y="325" width="24" height="55" rx="1" />
                  <rect x="872" y="312" width="18" height="68" rx="1" />
                </g>

                {/* 4. EXACTLY ONE GENTLE SMILING MORNING SUN WITH ROTATING RAYS */}
                <g transform="translate(570, 95)">
                  <g className="animate-spin" style={{ animationDuration: '28s', transformOrigin: '0px 0px' }}>
                    {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => (
                      <line
                        key={i}
                        x1="0"
                        y1="-30"
                        x2="0"
                        y2="-38"
                        stroke="#F6B17A"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        opacity="0.8"
                        transform={`rotate(${angle})`}
                      />
                    ))}
                  </g>
                  {/* Sun Body */}
                  <circle cx="0" cy="0" r="24" fill="#FFE5B4" stroke="#F6B17A" strokeWidth="1.8" />
                  <circle cx="0" cy="0" r="19" fill="#FFF2D6" />
                  {/* Cheerful Smiling Face */}
                  <path d="M -9 -2 Q -6 -6 -3 -2" stroke="#7A5229" strokeWidth="1.6" strokeLinecap="round" fill="none" />
                  <path d="M 3 -2 Q 6 -6 9 -2" stroke="#7A5229" strokeWidth="1.6" strokeLinecap="round" fill="none" />
                  <circle cx="-10" cy="3" r="2.5" fill="#F8B195" opacity="0.65" />
                  <circle cx="10" cy="3" r="2.5" fill="#F8B195" opacity="0.65" />
                  <path d="M -4 3 Q 0 7 4 3" stroke="#7A5229" strokeWidth="1.6" strokeLinecap="round" fill="none" />
                </g>

                {/* 5. Drifting Soft Morning Clouds */}
                <g opacity="0.45">
                  <path d="M 120 110 Q 140 90 170 95 Q 190 80 215 88 Q 240 75 260 92 Q 285 90 295 110 Z" fill="#FFFFFF" />
                  <path d="M 420 70 Q 435 55 455 60 Q 470 48 490 54 Q 510 44 525 58 Q 545 56 550 70 Z" fill="#FFFFFF" />
                </g>

                {/* 6. Arabian Sea Base (Powder Blue #B8D8EC to Seafoam #D4EAE2) */}
                <rect y="375" width="1000" height="225" fill="url(#seaGrad)" />

                {/* 7. BANDRA-WORLI SEA LINK BRIDGE STRUCTURE */}
                {/* Piers in the water */}
                {[120, 220, 320, 680, 780, 880, 960].map((px) => (
                  <rect key={px} x={px - 4} y="380" width="8" height="45" fill="#8EA8BD" rx="2" opacity="0.8" />
                ))}

                {/* Bridge Curved Roadway Deck */}
                <path
                  d="M -20 398 Q 300 372 520 372 T 1020 392"
                  stroke="#FFFFFF"
                  strokeWidth="13"
                  fill="none"
                  strokeLinecap="round"
                />
                <path
                  d="M -20 398 Q 300 372 520 372 T 1020 392"
                  stroke="#C3CFDC"
                  strokeWidth="3.5"
                  fill="none"
                  strokeLinecap="round"
                />

                {/* Main Cable-Stayed Pylon 1 (Bandra Tower - Inverted Y) */}
                <g transform="translate(420, 372)">
                  <rect x="-18" y="0" width="36" height="38" fill="#7D98AE" rx="3" />
                  
                  {/* Fine Stay Cables */}
                  {[-130, -110, -90, -70, -50, -30, -15, 15, 30, 50, 70, 90, 110, 130].map((cx, idx) => (
                    <line
                      key={idx}
                      x1="0"
                      y1="-200"
                      x2={cx}
                      y2="0"
                      stroke="#FFFFFF"
                      strokeWidth="1.1"
                      opacity="0.9"
                    />
                  ))}

                  <polygon points="0,-220 -15,0 -6,0 0,-175" fill="#FFFFFF" stroke="#CAD3DC" strokeWidth="1.5" />
                  <polygon points="0,-220 15,0 6,0 0,-175" fill="#FFFFFF" stroke="#CAD3DC" strokeWidth="1.5" />
                  <rect x="-13" y="-110" width="26" height="6" fill="#C5D0DC" rx="1" />
                  <rect x="-16" y="-38" width="32" height="7" fill="#C5D0DC" rx="1" />
                  <circle cx="0" cy="-221" r="3" fill="#FF5252" opacity="0.85" />
                </g>

                {/* Main Cable-Stayed Pylon 2 (Worli Tower - Inverted Y) */}
                <g transform="translate(580, 372)">
                  <rect x="-18" y="0" width="36" height="38" fill="#7D98AE" rx="3" />

                  {/* Fine Stay Cables */}
                  {[-130, -110, -90, -70, -50, -30, -15, 15, 30, 50, 70, 90, 110, 130].map((cx, idx) => (
                    <line
                      key={idx}
                      x1="0"
                      y1="-200"
                      x2={cx}
                      y2="0"
                      stroke="#FFFFFF"
                      strokeWidth="1.1"
                      opacity="0.9"
                    />
                  ))}

                  <polygon points="0,-220 -15,0 -6,0 0,-175" fill="#FFFFFF" stroke="#CAD3DC" strokeWidth="1.5" />
                  <polygon points="0,-220 15,0 6,0 0,-175" fill="#FFFFFF" stroke="#CAD3DC" strokeWidth="1.5" />
                  <rect x="-13" y="-110" width="26" height="6" fill="#C5D0DC" rx="1" />
                  <rect x="-16" y="-38" width="32" height="7" fill="#C5D0DC" rx="1" />
                  <circle cx="0" cy="-221" r="3" fill="#FF5252" opacity="0.85" />
                </g>

                {/* 8. LIVE TRAFFIC: Tiny Cars with Glowing Headlights & Taillights */}
                {/* Eastbound Car 1 (Coral Red Sedan) */}
                <g>
                  <g>
                    <animateTransform attributeName="transform" type="translate" from="-20,375" to="1020,375" dur="10s" repeatCount="indefinite" />
                    {/* Car Body Pill */}
                    <rect x="0" y="0" width="13" height="5" rx="2.5" fill="#E76F51" />
                    {/* Headlight (Yellow glow in front) */}
                    <circle cx="13" cy="2.5" r="1.5" fill="#FFF3B0" />
                    <line x1="13" y1="2.5" x2="20" y2="2.5" stroke="#FFF7C2" strokeWidth="1" opacity="0.75" />
                    {/* Taillight (Red glow in back) */}
                    <circle cx="0" cy="2.5" r="1.2" fill="#E63946" />
                  </g>
                </g>

                {/* Westbound Car 2 (Mumbai Yellow-Black Taxi) */}
                <g>
                  <g>
                    <animateTransform attributeName="transform" type="translate" from="1020,378" to="-20,378" dur="12s" repeatCount="indefinite" />
                    {/* Taxi Body */}
                    <rect x="0" y="0" width="12" height="5" rx="2.5" fill="#E9C46A" />
                    <rect x="3" y="1" width="6" height="3" rx="1" fill="#264653" />
                    {/* Headlight (facing left) */}
                    <circle cx="0" cy="2.5" r="1.5" fill="#FFF3B0" />
                    <line x1="0" y1="2.5" x2="-6" y2="2.5" stroke="#FFF7C2" strokeWidth="1" opacity="0.75" />
                    {/* Taillight (facing right) */}
                    <circle cx="12" cy="2.5" r="1.2" fill="#E63946" />
                  </g>
                </g>

                {/* Eastbound Car 3 (Classic White Hatchback) */}
                <g>
                  <g>
                    <animateTransform attributeName="transform" type="translate" from="-60,375" to="1020,375" dur="14s" repeatCount="indefinite" />
                    <rect x="0" y="0" width="11" height="5" rx="2.5" fill="#FFFFFF" />
                    <circle cx="11" cy="2.5" r="1.4" fill="#FFF3B0" />
                    <circle cx="0" cy="2.5" r="1.1" fill="#E63946" />
                  </g>
                </g>

                {/* Westbound Car 4 (Sage Green SUV) */}
                <g>
                  <g>
                    <animateTransform attributeName="transform" type="translate" from="1020,378" to="-60,378" dur="16s" repeatCount="indefinite" />
                    <rect x="0" y="0" width="14" height="5.5" rx="2.5" fill="#2A9D8F" />
                    <circle cx="0" cy="2.5" r="1.5" fill="#FFF3B0" />
                    <circle cx="14" cy="2.5" r="1.2" fill="#E63946" />
                  </g>
                </g>

                {/* 9. Dynamic Layered Ocean Swells & Water Shimmer */}
                <g>
                  {/* Swell Layer 1 */}
                  <path
                    d="M 0 420 Q 250 410 500 418 T 1000 416"
                    stroke="rgba(255,255,255,0.45)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    fill="none"
                  >
                    <animate attributeName="d" 
                      values="M 0 420 Q 250 410 500 418 T 1000 416; M 0 416 Q 250 424 500 414 T 1000 420; M 0 420 Q 250 410 500 418 T 1000 416"
                      dur="5.5s" repeatCount="indefinite" />
                  </path>

                  {/* Swell Layer 2 */}
                  <path
                    d="M 50 465 Q 320 455 600 462 T 1000 460"
                    stroke="rgba(255,255,255,0.55)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    fill="none"
                  >
                    <animate attributeName="d" 
                      values="M 50 465 Q 320 455 600 462 T 1000 460; M 50 460 Q 320 470 600 458 T 1000 464; M 50 465 Q 320 455 600 462 T 1000 460"
                      dur="7s" repeatCount="indefinite" />
                  </path>

                  {/* Swell Layer 3 (Foreground Swell) */}
                  <path
                    d="M 0 525 Q 280 515 550 522 T 1000 520"
                    stroke="rgba(255,255,255,0.65)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    fill="none"
                  >
                    <animate attributeName="d" 
                      values="M 0 525 Q 280 515 550 522 T 1000 520; M 0 520 Q 280 530 550 518 T 1000 524; M 0 525 Q 280 515 550 522 T 1000 520"
                      dur="8s" repeatCount="indefinite" />
                  </path>
                </g>

                {/* 10. Shimmering Water Reflections */}
                <g fill="#FFFFFF">
                  <circle cx="280" cy="445" r="1.8" opacity="0.8">
                    <animate attributeName="opacity" values="0.2;1;0.2" dur="2.2s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="620" cy="485" r="2.2" opacity="0.85">
                    <animate attributeName="opacity" values="0.3;1;0.3" dur="2.9s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="480" cy="435" r="1.8" opacity="0.7">
                    <animate attributeName="opacity" values="0.1;0.9;0.1" dur="2.5s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="760" cy="465" r="2" opacity="0.8">
                    <animate attributeName="opacity" values="0.4;1;0.4" dur="3.4s" repeatCount="indefinite" />
                  </circle>
                </g>
              </svg>
            </div>

            {/* Delicate Sheer White Linen Tied-Back Curtains */}
            <AnimatePresence>
              {windowOpened && (
                <>
                  {/* Left Curtain */}
                  <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -50, opacity: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="absolute inset-y-0 left-0 w-20 sm:w-28 pointer-events-none z-22 flex flex-col justify-between"
                  >
                    <svg viewBox="0 0 100 300" className="w-full h-full" preserveAspectRatio="none">
                      <path 
                        d="M 0 0 L 95 0 Q 60 70 32 150 Q 55 230 75 300 L 0 300 Z" 
                        fill="rgba(255, 255, 255, 0.85)" 
                        stroke="#E8E4DF" 
                        strokeWidth="1" 
                      />
                      {/* Ribbon Tieback */}
                      <g transform="translate(30, 150)">
                        <ellipse cx="0" cy="0" rx="12" ry="3.5" fill="#EADBC8" stroke="#D4C3AE" strokeWidth="1" />
                      </g>
                    </svg>
                  </motion.div>

                  {/* Right Curtain */}
                  <motion.div
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 50, opacity: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="absolute inset-y-0 right-0 w-20 sm:w-28 pointer-events-none z-22 flex flex-col justify-between"
                  >
                    <svg viewBox="0 0 100 300" className="w-full h-full" preserveAspectRatio="none">
                      <path 
                        d="M 100 0 L 5 0 Q 40 70 68 150 Q 45 230 25 300 L 100 300 Z" 
                        fill="rgba(255, 255, 255, 0.85)" 
                        stroke="#E8E4DF" 
                        strokeWidth="1" 
                      />
                      {/* Ribbon Tieback */}
                      <g transform="translate(70, 150)">
                        <ellipse cx="0" cy="0" rx="12" ry="3.5" fill="#EADBC8" stroke="#D4C3AE" strokeWidth="1" />
                      </g>
                    </svg>
                  </motion.div>
                </>
              )}
            </AnimatePresence>

            {/* 
              STATE 1 (CLOSED): FULL-SCREEN WINDOW VIEWPORT
              Centered text: "Designing digital feelings, engineering living systems."
              Centered ONLY ONE button: [ Open the window → ]
            */}
            <AnimatePresence>
              {!windowOpened && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9, y: -20 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="relative z-30 text-center space-y-4 sm:space-y-6 max-w-2xl mx-auto px-4 my-auto pointer-events-auto"
                >
                  {/* Studio Header Badge */}
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/85 backdrop-blur-md border border-[#E8DEC8] shadow-2xs text-[11px] font-mono text-stone-600">
                    <span className="text-[#E07A5F]">✦</span>
                    <span>Creative Studio • Morning Edition</span>
                    <span className="text-[#52B788]">✦</span>
                  </div>

                  {/* Headline: Pastel Colourful & Well-Spaced with Cute Pastel Accents */}
                  <div className="space-y-2.5 sm:space-y-3">
                    <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif tracking-wide select-none flex flex-col items-center gap-1 sm:gap-1.5 drop-shadow-xs">
                      <span className="leading-snug flex items-center justify-center gap-2">
                        <span className="text-[#F4A261] text-base sm:text-2xl animate-pulse">✦</span>
                        <span className="text-[#3D405B]">Designing digital </span>
                        <span className="italic font-normal text-[#E07A5F]">
                          feelings
                        </span>
                        <span className="text-[#E07A5F]/60">,</span>
                        <span className="text-xs sm:text-base">🌸</span>
                      </span>
                      <span className="leading-snug flex items-center justify-center gap-2">
                        <span className="text-[#3D405B]">engineering </span>
                        <span className="italic font-normal text-[#52B788]">
                          living systems
                        </span>
                        <span className="text-[#52B788]">.</span>
                        <span className="text-[#81B29A] text-base sm:text-2xl animate-pulse">✦</span>
                      </span>
                    </h1>
                    <p className="font-caveat font-bold text-lg sm:text-2xl text-stone-700 pt-0.5 leading-relaxed">
                      “A cozy corner of the web crafted with design, code &amp; creative craft ✨”
                    </p>
                  </div>

                  {/* Tactile Studio Button & Handwritten Hint */}
                  <div className="pt-2 sm:pt-3 flex flex-col items-center gap-2">
                    <button
                      onClick={handleToggleWindow}
                      className="inline-flex items-center gap-2.5 px-8 py-3.5 sm:px-9 sm:py-4 rounded-full bg-white/90 hover:bg-white text-[#2D2A26] border border-[#D4B996] shadow-[0_8px_24px_rgba(45,42,38,0.08)] hover:shadow-[0_12px_32px_rgba(224,122,95,0.18)] hover:scale-105 active:scale-95 text-sm sm:text-base font-sans font-medium transition-all duration-300 cursor-pointer group backdrop-blur-md"
                    >
                      <span>Open the window</span>
                      <span className="transition-transform duration-300 group-hover:translate-x-1.5 text-[#E07A5F] font-bold">→</span>
                    </button>
                    <span className="font-caveat text-xs sm:text-sm text-stone-500">
                      tap to let the morning breeze in 🍃
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </motion.div>

        {/* 
          ======================================================================
          SCANDINAVIAN MATTE WHITE WINDOWSILL SHELF
          ======================================================================
        */}
        <div className="relative z-35 w-[104%] -ml-[2%] h-5 sm:h-6 bg-[#FAF7F3] rounded-sm shadow-sm border-t border-white border-b border-stone-200/70 flex items-center px-6 sm:px-12">
          
          {/* Windowsill Plants (Left Side) */}
          <div 
            onClick={handlePetPlant}
            className="absolute -top-13 sm:-top-15 left-6 sm:left-10 flex items-end cursor-pointer select-none group pointer-events-auto"
            title="Click to pet the windowsill plant!"
          >
            <svg viewBox="0 0 140 90" className="w-24 sm:w-28 h-16 sm:h-20 overflow-visible drop-shadow-2xs">
              <g transform="translate(10, 6)">
                {/* Terracotta Pot */}
                <path
                  d="M 28 44 L 62 44 L 56 68 L 34 68 Z"
                  fill="#E68A75"
                  stroke="#C56A54"
                  strokeWidth="1.4"
                  strokeLinejoin="round"
                />
                <rect x="25" y="38" width="40" height="6" rx="3" fill="#D97660" />
                {/* Kawaii Face */}
                <circle cx="38" cy="56" r="2" fill="#FFA5BA" opacity="0.85" />
                <circle cx="52" cy="56" r="2" fill="#FFA5BA" opacity="0.85" />
                <path d="M 39 52 Q 42 49 45 52" fill="none" stroke="#3D2114" strokeWidth="1.3" strokeLinecap="round" />
                <path d="M 47 52 Q 50 49 53 52" fill="none" stroke="#3D2114" strokeWidth="1.3" strokeLinecap="round" />
                <path d="M 44 58 Q 46 60 48 58" fill="none" stroke="#3D2114" strokeWidth="1.1" strokeLinecap="round" />
                {/* Leaves & Flower */}
                <path d="M 45 38 Q 45 22 45 12" fill="none" stroke="#74A87A" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M 45 24 C 35 22 32 14 38 10 C 43 13 45 19 45 24 Z" fill="#95C99B" stroke="#639469" strokeWidth="1" />
                <circle cx="45" cy="11" r="5" fill="#FFE082" stroke="#F5B041" strokeWidth="1" />
              </g>
            </svg>
          </div>

          {/* Right side of sill: Mumbai Live IST Clock & Close Trigger */}
          <div className="ml-auto flex items-center gap-2 sm:gap-3 pointer-events-auto">
            {windowOpened && (
              <button
                onClick={handleToggleWindow}
                className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/90 hover:bg-white text-[10px] font-mono text-stone-600 border border-stone-200/80 transition-all hover:scale-105 cursor-pointer shadow-2xs"
                title="Click to close window"
              >
                <Wind size={10} />
                <span>Close</span>
              </button>
            )}
            <div className="hidden sm:flex items-center gap-1.5">
              <Clock size={11} className="text-stone-500" />
              <span className="text-[10px] font-mono text-stone-500">
                Local Time • {mumbaiTime} IST
              </span>
            </div>
          </div>

        </div>

      </motion.div>

      {/* 
        ========================================================================
        CENTERED ACTION BUTTONS BENEATH WINDOW SILL (EXACT HORIZONTAL CENTER)
        flex flex-row items-center justify-center gap-4 w-full mt-4:
        - Button 1: [ 📄 Resume ] (clean off-white pill with subtle border and shadow)
        - Button 2: [ ✉️ Say Hello ] (soft charcoal pill with white text)
        - Centered helper prompt below: "Scroll below to explore ↓"
        ========================================================================
      */}
      <AnimatePresence>
        {windowOpened && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full flex flex-col items-center justify-center mt-5 sm:mt-6 z-30 select-none pointer-events-auto"
          >
            {/* Centered Horizontal Action Buttons */}
            <div className="flex flex-row items-center justify-center gap-4 w-full">
              {/* Button 1: [ 📄 Resume ] */}
              {onOpenResume && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    playPop();
                    onOpenResume();
                  }}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white hover:bg-stone-50 text-stone-800 border border-stone-200/90 font-sans font-medium text-xs sm:text-sm shadow-sm hover:shadow transition-all hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <FileText size={15} className="text-stone-600" />
                  <span>Resume</span>
                </button>
              )}

              {/* Button 2: [ ✉️ Say Hello ] */}
              <a
                href="#contact"
                onClick={(e) => {
                  e.stopPropagation();
                  playPop();
                }}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#262422] hover:bg-[#151413] text-white font-sans font-medium text-xs sm:text-sm shadow-sm hover:shadow transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <Send size={14} className="text-stone-300" />
                <span>Say Hello</span>
              </a>
            </div>

            {/* Centered Helper Prompt: "Scroll below to explore ↓" */}
            <div className="mt-4">
              <a 
                href="#about"
                onClick={() => playClick()}
                className="inline-flex items-center gap-2 text-xs font-mono text-stone-500 hover:text-stone-800 transition-colors group cursor-pointer"
              >
                <span>Scroll below to explore</span>
                <ArrowDown size={13} className="animate-bounce text-stone-400 group-hover:text-stone-700" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default FluidGradientHero;
