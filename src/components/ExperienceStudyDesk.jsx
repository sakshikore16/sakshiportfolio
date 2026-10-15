import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, Calendar, CheckSquare, 
  ArrowLeft, ChevronRight, Bookmark, Sparkles, X, ExternalLink
} from 'lucide-react';
import { playBookOpen, playBookClose, playPageFlipSound, playLampSwitch, playClick } from '../utils/sound';

import { experienceData } from '../data/portfolioData';

export const ExperienceStudyDesk = () => {
  // Real-time clock: evening/night (6 PM to 6 AM) defaults lamp ON, daytime defaults lamp OFF
  const [lampOn, setLampOn] = useState(() => {
    if (typeof window !== 'undefined') {
      const currentHour = new Date().getHours();
      return currentHour >= 18 || currentHour < 6;
    }
    return true;
  });
  
  // openBookIndex: null (closed on desk) | 0 (Harrier) | 1 (Digital Loop) | 2 (Godshalwar)
  const [openBookIndex, setOpenBookIndex] = useState(null);
  const [hoveredBook, setHoveredBook] = useState(null);

  const experienceBooks = experienceData;

  // Lock background scroll and hide navbar when notebook is open, unlock when closed
  useEffect(() => {
    if (openBookIndex !== null) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      document.body.classList.add('modal-open');

      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          playBookClose();
          setOpenBookIndex(null);
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = originalOverflow;
        document.body.classList.remove('modal-open');
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [openBookIndex]);

  const handleBookClick = (index) => {
    playBookOpen();
    setOpenBookIndex(index);
  };

  const handleCloseBook = () => {
    playBookClose();
    setOpenBookIndex(null);
  };

  const toggleLamp = () => {
    playLampSwitch();
    setLampOn(!lampOn);
  };

  const activeBook = openBookIndex !== null ? experienceBooks[openBookIndex] : null;

  return (
    <section 
      id="experience" 
      className="py-14 sm:py-20 relative overflow-hidden bg-transparent text-slate-900 transition-colors duration-700 select-none"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 text-amber-800 text-xs font-mono font-medium">
            <BookOpen size={13} />
            <span>Interactive Study Desk</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-light tracking-tight">
            Explore My <span className="font-serif italic text-amber-700">Experience</span>
          </h2>
          <p className="text-xs sm:text-sm font-light text-slate-600">
            Click any hardbound book on the desk (Vol 01: Harrier, Vol 02: Digital Loop, Vol 03: Godshalwar) to flip open career accomplishments &amp; measurable numbers.
          </p>
        </div>

        {/* ========================================================
            THE STUDY DESK STAGE
        ======================================================== */}
        <div className="max-w-5xl mx-auto relative pt-4 pb-2">
          
          <div className="relative w-full min-h-[460px] sm:min-h-[500px] flex flex-col justify-end">
            
            {/* Wide Tabletop Elliptical Pool of Light (720px x 320px washing over vase and books) */}
            <div 
              className={`absolute top-[12%] sm:top-[15%] left-[6%] sm:left-[10%] w-[720px] max-w-[90%] h-[320px] pointer-events-none transition-opacity duration-700 z-10 rounded-[50%] ${
                lampOn ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                background: 'radial-gradient(ellipse at 25% 40%, rgba(255, 235, 150, 0.55) 0%, rgba(255, 215, 110, 0.22) 50%, transparent 75%)',
                filter: 'blur(28px)'
              }}
            />

            {/* SVG: VOLUMETRIC TABLE + VOLUMETRIC LAMP + PENCIL CUP + 3D BOOK STACK */}
            <svg 
              viewBox="0 0 920 440" 
              className="w-full h-auto drop-shadow-xl select-none"
              fill="none"
            >
              <defs>
                <linearGradient id="woodSurfaceGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#FDFBF7" />
                  <stop offset="30%" stopColor="#FAF6EE" />
                  <stop offset="70%" stopColor="#F4EDE2" />
                  <stop offset="100%" stopColor="#EBE1D2" />
                </linearGradient>

                <linearGradient id="woodRimGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#F5EDE2" />
                  <stop offset="50%" stopColor="#EBE1D3" />
                  <stop offset="100%" stopColor="#DFCFC0" />
                </linearGradient>

                <linearGradient id="woodApronGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#F2E9DE" />
                  <stop offset="100%" stopColor="#E4D7C7" />
                </linearGradient>

                <linearGradient id="woodLegFront" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#EAE0D3" />
                  <stop offset="35%" stopColor="#F7F1E7" />
                  <stop offset="70%" stopColor="#FAF5EC" />
                  <stop offset="100%" stopColor="#E2D4C3" />
                </linearGradient>

                <linearGradient id="woodLegBack" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#D5C5B3" />
                  <stop offset="50%" stopColor="#E0D2C2" />
                  <stop offset="100%" stopColor="#CBB9A5" />
                </linearGradient>

                <linearGradient id="lampShadeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FFFDF0" />
                  <stop offset="40%" stopColor="#FFF6C2" />
                  <stop offset="85%" stopColor="#FFEDA6" />
                  <stop offset="100%" stopColor="#FCDA8B" />
                </linearGradient>

                <linearGradient id="lampBaseGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FFF5EE" />
                  <stop offset="50%" stopColor="#FCE3D8" />
                  <stop offset="100%" stopColor="#F7CEB9" />
                </linearGradient>

                <linearGradient id="bookRedSpineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FFA69E" />
                  <stop offset="35%" stopColor="#F28482" />
                  <stop offset="70%" stopColor="#E07A5F" />
                  <stop offset="100%" stopColor="#C9654B" />
                </linearGradient>

                <linearGradient id="bookRedCoverTopGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#F8A5A3" />
                  <stop offset="50%" stopColor="#FFD4D0" />
                  <stop offset="100%" stopColor="#F28482" />
                </linearGradient>

                <linearGradient id="bookGreenSpineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#A7D7C5" />
                  <stop offset="35%" stopColor="#74C69D" />
                  <stop offset="70%" stopColor="#52B788" />
                  <stop offset="100%" stopColor="#388E67" />
                </linearGradient>

                <linearGradient id="bookBlueSpineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#D1C4E9" />
                  <stop offset="35%" stopColor="#B39DDB" />
                  <stop offset="70%" stopColor="#9575CD" />
                  <stop offset="100%" stopColor="#7E57C2" />
                </linearGradient>

                <linearGradient id="rightPagesGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FFFDF9" />
                  <stop offset="50%" stopColor="#FAF6ED" />
                  <stop offset="100%" stopColor="#F3EDE0" />
                </linearGradient>
              </defs>

              {/* 1. FLOOR LEVEL CONTACT SHADOWS */}
              <ellipse cx="100" cy="425" rx="36" ry="9" fill="rgba(60,30,0,0.22)" />
              <ellipse cx="820" cy="425" rx="36" ry="9" fill="rgba(60,30,0,0.22)" />
              <ellipse cx="170" cy="385" rx="26" ry="7" fill="rgba(60,30,0,0.18)" />
              <ellipse cx="750" cy="385" rx="26" ry="7" fill="rgba(60,30,0,0.18)" />

              {/* 2. REAR RECESSED WOODEN LEGS */}
              <rect x="156" y="245" width="28" height="142" rx="3" fill="url(#woodLegBack)" stroke="#B59E8D" strokeWidth="2" />
              <rect x="736" y="245" width="28" height="142" rx="3" fill="url(#woodLegBack)" stroke="#B59E8D" strokeWidth="2" />

              {/* 3. TABLE APRON */}
              <path 
                d="M 45 220 L 875 220 L 860 270 L 60 270 Z" 
                fill="url(#woodApronGrad)" 
                stroke="#B59E8D" 
                strokeWidth="2.5" 
              />
              <line x1="60" y1="268" x2="860" y2="268" stroke="#B59E8D" strokeWidth="2.2" />
              <line x1="460" y1="222" x2="460" y2="268" stroke="#B59E8D" strokeWidth="1.5" opacity="0.6" />

              {/* 4. TWO STURDY FRONT LEGS */}
              <g>
                <rect x="80" y="260" width="40" height="168" rx="4" fill="url(#woodLegFront)" stroke="#B59E8D" strokeWidth="2.5" />
                <line x1="90" y1="260" x2="90" y2="428" stroke="#FFE0B2" strokeWidth="1.5" opacity="0.4" />
                <line x1="112" y1="260" x2="112" y2="428" stroke="#B59E8D" strokeWidth="1.2" opacity="0.5" />
              </g>
              <g>
                <rect x="800" y="260" width="40" height="168" rx="4" fill="url(#woodLegFront)" stroke="#B59E8D" strokeWidth="2.5" />
                <line x1="810" y1="260" x2="810" y2="428" stroke="#FFE0B2" strokeWidth="1.5" opacity="0.4" />
                <line x1="832" y1="260" x2="832" y2="428" stroke="#B59E8D" strokeWidth="1.2" opacity="0.5" />
              </g>

              {/* 5. TABLETOP SURFACE */}
              <polygon 
                points="60,110 860,110 910,210 10,210" 
                fill="url(#woodSurfaceGrad)" 
                stroke="#B59E8D" 
                strokeWidth="2.5" 
              />
              <path d="M 90 135 Q 260 120 480 135 T 840 130" stroke="#FFF8F0" strokeWidth="1.5" opacity="0.6" fill="none" />
              <path d="M 40 165 Q 280 150 540 162 T 880 158" stroke="#C4B097" strokeWidth="1.5" opacity="0.4" fill="none" />
              <path d="M 25 190 Q 320 175 620 188 T 895 185" stroke="#FFF8F0" strokeWidth="1.2" opacity="0.5" fill="none" />

              {/* Front Bevel Rim */}
              <polygon 
                points="10,210 910,210 900,230 20,230" 
                fill="url(#woodRimGrad)" 
                stroke="#B59E8D" 
                strokeWidth="2.5" 
              />
              <line x1="12" y1="212" x2="908" y2="212" stroke="#FFFDF9" strokeWidth="2" opacity="0.9" />

              {/* 6. TABLETOP CONTACT SHADOWS */}
              <ellipse cx="180" cy="190" rx="46" ry="12" fill="rgba(80,50,30,0.14)" />
              <ellipse cx="450" cy="186" rx="26" ry="9" fill="rgba(80,50,30,0.12)" />

              {/* 7. ADORABLE PASTEL LAMP */}
              <g 
                className="cursor-pointer group" 
                onClick={toggleLamp}
                title="Click to toggle cute lamp!"
              >
                {lampOn && (
                  <ellipse cx="190" cy="80" rx="95" ry="75" fill="rgba(255, 236, 179, 0.45)" className="animate-pulse" />
                )}
                <ellipse cx="180" cy="185" rx="36" ry="12" fill="url(#lampBaseGrad)" stroke="#B59E8D" strokeWidth="2.2" />
                <path 
                  d="M 180 180 C 180 120 145 90 190 60" 
                  stroke="#E8C882" 
                  strokeWidth="6" 
                  fill="none" 
                  strokeLinecap="round" 
                />
                <circle cx="190" cy="54" r="5" fill="#FFE082" stroke="#B59E8D" strokeWidth="1.5" />
                <path 
                  d="M 148 64 C 148 18 242 18 242 64 C 242 74 148 74 148 64 Z" 
                  fill={lampOn ? "url(#lampShadeGrad)" : "#E2E8F0"} 
                  stroke="#B59E8D" 
                  strokeWidth="2.4" 
                />
                {lampOn && (
                  <path 
                    d="M 152 64 C 170 74 220 74 238 64 C 230 72 160 72 152 64 Z" 
                    fill="#FFF9C4" 
                    opacity="0.95" 
                  />
                )}
                <line x1="202" y1="68" x2="202" y2="88" stroke="#B59E8D" strokeWidth="1.4" strokeDasharray="2 2" />
                <circle cx="202" cy="91" r="3.5" fill="#FFB703" stroke="#B59E8D" strokeWidth="1.2" />
              </g>

              {/* 8. PASTEL CERAMIC VASE & PENS */}
              <g>
                <g transform="translate(446, 88)">
                  {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                    <ellipse key={i} cx="0" cy="-10" rx="3.5" ry="6.5" fill="#FFFFFF" stroke="#B59E8D" strokeWidth="0.8" transform={`rotate(${angle})`} />
                  ))}
                  <circle cx="0" cy="0" r="5.5" fill="#FFD166" stroke="#FB8500" strokeWidth="0.9" />
                  <line x1="0" y1="5" x2="0" y2="52" stroke="#81B29A" strokeWidth="2.2" strokeLinecap="round" />
                </g>

                <g transform="translate(432, 106) rotate(-14)">
                  <rect x="0" y="0" width="6" height="52" rx="3" fill="#B7E4C7" stroke="#B59E8D" strokeWidth="1.2" />
                  <polygon points="0,0 6,0 3,-8" fill="#FCE3D8" stroke="#B59E8D" strokeWidth="1" />
                </g>

                <g transform="translate(460, 114) rotate(16)">
                  <rect x="0" y="0" width="5.5" height="46" rx="2.5" fill="#CDB4DB" stroke="#B59E8D" strokeWidth="1.2" />
                  <circle cx="2.7" cy="-2" r="2.5" fill="#FFCAD4" stroke="#B59E8D" strokeWidth="0.9" />
                </g>

                <path 
                  d="M 430 144 C 424 156 422 172 432 184 C 440 188 460 188 468 184 C 478 172 476 156 470 144 Z" 
                  fill="#DEF2E6" 
                  stroke="#B59E8D" 
                  strokeWidth="2.2" 
                />
                <ellipse cx="450" cy="144" rx="20" ry="5.5" fill="#EDF7F1" stroke="#B59E8D" strokeWidth="1.8" />
              </g>

              {/* 9. THE 3D BOOK STACK ON RIGHT DESK (VOL 01, VOL 02, VOL 03) */}
              <g 
                id="isometric-book-stack"
                style={{
                  filter: lampOn ? 'drop-shadow(0 0 16px rgba(255, 230, 140, 0.45))' : 'none',
                  transition: 'filter 0.5s ease'
                }}
              >
                <ellipse cx="695" cy="182" rx="105" ry="14" fill="rgba(45,20,0,0.38)" />

                {/* BOOK 3 (BOTTOM): 03 HISTORY (PURPLE) */}
                <g 
                  className="cursor-pointer group"
                  onClick={() => handleBookClick(2)}
                  onMouseEnter={() => setHoveredBook(2)}
                  onMouseLeave={() => setHoveredBook(null)}
                  style={{ transition: 'transform 0.22s ease' }}
                  transform={hoveredBook === 2 ? 'translate(-6, -3)' : 'translate(0, 0)'}
                >
                  <polygon 
                    points="710,154 785,132 785,154 710,176" 
                    fill="url(#rightPagesGrad)" 
                    stroke="#8D7A68" 
                    strokeWidth="2" 
                  />
                  <line x1="712" y1="158" x2="783" y2="136" stroke="#D4C4A5" strokeWidth="1" />
                  <line x1="712" y1="163" x2="783" y2="141" stroke="#D4C4A5" strokeWidth="1" />
                  <line x1="712" y1="168" x2="783" y2="146" stroke="#D4C4A5" strokeWidth="1" />
                  <line x1="712" y1="172" x2="783" y2="150" stroke="#D4C4A5" strokeWidth="1" />

                  <line x1="710" y1="152" x2="787" y2="130" stroke="#8D7A68" strokeWidth="3" strokeLinecap="round" />
                  <line x1="710" y1="178" x2="787" y2="156" stroke="#8D7A68" strokeWidth="3.2" strokeLinecap="round" />

                  <path 
                    d="M 590 152 C 576 158 576 170 590 176 L 710 176 L 710 152 Z" 
                    fill="url(#bookBlueSpineGrad)" 
                    stroke="#8D7A68" 
                    strokeWidth="2.8" 
                  />
                  <line x1="710" y1="152" x2="710" y2="176" stroke="#8D7A68" strokeWidth="2.5" />
                  <line x1="590" y1="155" x2="710" y2="155" stroke="#FFE082" strokeWidth="1.2" opacity="0.7" />
                  <line x1="590" y1="173" x2="710" y2="173" stroke="#FFE082" strokeWidth="1.2" opacity="0.7" />

                  <text 
                    x="650" 
                    y="167" 
                    fill="#FFFDF0" 
                    fontSize="10" 
                    fontFamily="sans-serif" 
                    fontWeight="700" 
                    textAnchor="middle" 
                    letterSpacing="1.2"
                  >
                    GODSHALWAR
                  </text>
                </g>

                {/* BOOK 2 (MIDDLE): 02 DIGITAL LOOP (GREEN) */}
                <g 
                  className="cursor-pointer group"
                  onClick={() => handleBookClick(1)}
                  onMouseEnter={() => setHoveredBook(1)}
                  onMouseLeave={() => setHoveredBook(null)}
                  style={{ transition: 'transform 0.22s ease' }}
                  transform={hoveredBook === 1 ? 'translate(-6, -3)' : 'translate(0, 0)'}
                >
                  <polygon 
                    points="710,130 785,108 785,130 710,152" 
                    fill="url(#rightPagesGrad)" 
                    stroke="#8D7A68" 
                    strokeWidth="2" 
                  />
                  <line x1="712" y1="134" x2="783" y2="112" stroke="#D4C4A5" strokeWidth="1" />
                  <line x1="712" y1="139" x2="783" y2="117" stroke="#D4C4A5" strokeWidth="1" />
                  <line x1="712" y1="144" x2="783" y2="122" stroke="#D4C4A5" strokeWidth="1" />
                  <line x1="712" y1="148" x2="783" y2="126" stroke="#D4C4A5" strokeWidth="1" />

                  <line x1="710" y1="128" x2="787" y2="106" stroke="#8D7A68" strokeWidth="2.8" strokeLinecap="round" />
                  <line x1="710" y1="152" x2="787" y2="130" stroke="#8D7A68" strokeWidth="2.8" strokeLinecap="round" />

                  <path 
                    d="M 590 128 C 576 134 576 146 590 152 L 710 152 L 710 128 Z" 
                    fill="url(#bookGreenSpineGrad)" 
                    stroke="#8D7A68" 
                    strokeWidth="2.8" 
                  />
                  <line x1="710" y1="128" x2="710" y2="152" stroke="#8D7A68" strokeWidth="2.5" />
                  <line x1="590" y1="131" x2="710" y2="131" stroke="#C8E6C9" strokeWidth="1.2" opacity="0.7" />
                  <line x1="590" y1="149" x2="710" y2="149" stroke="#C8E6C9" strokeWidth="1.2" opacity="0.7" />

                  <text 
                    x="650" 
                    y="143" 
                    fill="#FFFDF0" 
                    fontSize="9.5" 
                    fontFamily="sans-serif" 
                    fontWeight="700" 
                    textAnchor="middle" 
                    letterSpacing="1"
                  >
                    DIGITAL LOOP
                  </text>
                </g>

                {/* BOOK 1 (TOP): 01 HARRIER (TERRACOTTA/CORAL) */}
                <g 
                  className="cursor-pointer group"
                  onClick={() => handleBookClick(0)}
                  onMouseEnter={() => setHoveredBook(0)}
                  onMouseLeave={() => setHoveredBook(null)}
                  style={{ transition: 'transform 0.22s ease' }}
                  transform={hoveredBook === 0 ? 'translate(-6, -3)' : 'translate(0, 0)'}
                >
                  <path 
                    d="M 590 104 C 578 98 648 82 665 82 L 785 82 L 710 104 Z" 
                    fill="url(#bookRedCoverTopGrad)" 
                    stroke="#8D7A68" 
                    strokeWidth="2.8" 
                  />
                  <text 
                    x="690" 
                    y="96" 
                    fill="#FFFDF0" 
                    fontSize="11" 
                    fontFamily="sans-serif" 
                    fontWeight="700" 
                    textAnchor="middle" 
                    letterSpacing="2"
                  >
                    HARRIER
                  </text>
                  <circle cx="645" cy="93.5" r="1.5" fill="#FFE082" />
                  <circle cx="735" cy="93.5" r="1.5" fill="#FFE082" />

                  <polygon 
                    points="710,106 785,84 785,106 710,128" 
                    fill="url(#rightPagesGrad)" 
                    stroke="#8D7A68" 
                    strokeWidth="2" 
                  />
                  <line x1="712" y1="110" x2="783" y2="88" stroke="#D4C4A5" strokeWidth="1" />
                  <line x1="712" y1="115" x2="783" y2="93" stroke="#D4C4A5" strokeWidth="1" />
                  <line x1="712" y1="120" x2="783" y2="98" stroke="#D4C4A5" strokeWidth="1" />
                  <line x1="712" y1="124" x2="783" y2="102" stroke="#D4C4A5" strokeWidth="1" />

                  <line x1="710" y1="104" x2="787" y2="82" stroke="#8D7A68" strokeWidth="2.8" strokeLinecap="round" />
                  <line x1="710" y1="128" x2="787" y2="106" stroke="#8D7A68" strokeWidth="2.8" strokeLinecap="round" />

                  <path 
                    d="M 590 104 C 576 110 576 122 590 128 L 710 128 L 710 104 Z" 
                    fill="url(#bookRedSpineGrad)" 
                    stroke="#8D7A68" 
                    strokeWidth="2.8" 
                  />
                  <line x1="710" y1="104" x2="710" y2="128" stroke="#8D7A68" strokeWidth="2.5" />
                  <line x1="590" y1="107" x2="710" y2="107" stroke="#FFF9C4" strokeWidth="1.2" opacity="0.7" />
                  <line x1="590" y1="125" x2="710" y2="125" stroke="#FFF9C4" strokeWidth="1.2" opacity="0.7" />

                  <text 
                    x="650" 
                    y="119" 
                    fill="#FFFDF0" 
                    fontSize="11" 
                    fontFamily="sans-serif" 
                    fontWeight="700" 
                    textAnchor="middle" 
                    letterSpacing="1.8"
                  >
                    HARRIER
                  </text>
                </g>
              </g>

            </svg>
          </div>

          {/* Realistic Floor Shadow under the Table Legs */}
          <div className="w-[88%] max-w-4xl h-8 bg-black/10 rounded-full blur-xl mx-auto -mt-4 pointer-events-none" />

          {/* Desk Interaction Guide Note */}
          <div className="mt-4 flex items-center justify-between text-[11px] font-mono text-slate-500 max-w-3xl mx-auto px-4">
            <span>✦ Physical Study Desk • Scandinavian Blonde Birch</span>
            <span>Click any book in the stack to flip open accomplishments</span>
          </div>

          {/* ========================================================
              PHYSICAL TWO-PAGE OPEN NOTEBOOK UI (REPLACES GENERIC MODAL!)
              - Colored hardbound cover frame
              - Layered page stack thickness shadows
              - Curved page arch near binding spine with stitched seam
              - Handwriting typography & margin leaf doodles
              - Highlighter-style milestone metrics
          ======================================================== */}
          <AnimatePresence>
            {activeBook && (
              <div 
                onClick={handleCloseBook}
                className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/15 backdrop-blur-sm"
              >
                
                <motion.div
                  onClick={(e) => e.stopPropagation()}
                  initial={{ scale: 0.9, opacity: 0, y: 16 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.9, opacity: 0, y: 16 }}
                  transition={{ type: "spring", stiffness: 320, damping: 28 }}
                  className="relative w-[94vw] max-w-[670px] sm:max-w-[710px] mx-auto select-text flex flex-col my-auto"
                >
                  
                  {/* 0. CLEAN NOTEBOOK BADGE BAR ABOVE THE BOOK COVER (ZERO OVERLAPPING WITH BOOK BORDER) */}
                  <div className="flex items-center justify-between pb-2 px-1 text-[11px] font-mono z-30">
                    <div className="px-3 py-1 rounded-md bg-[#FFFDF7] text-stone-900 border border-stone-300 text-[10px] font-mono font-semibold tracking-wider uppercase shadow-xs flex items-center gap-1.5">
                      <Bookmark size={11} className="text-[#C86445]" />
                      <span>{activeBook.volume} • {activeBook.company}</span>
                    </div>
                    <button
                      onClick={handleCloseBook}
                      className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#2D241E] hover:bg-stone-800 text-stone-100 text-[10px] font-mono font-medium transition-colors shadow-xs cursor-pointer"
                    >
                      <X size={12} />
                      <span>Close Notebook</span>
                    </button>
                  </div>

                  {/* 1. PHYSICAL HARDBOUND BOOK COVER BACKPLATE */}
                  <div 
                    className="p-2 sm:p-2.5 rounded-[12px] shadow-[0_16px_40px_rgba(0,0,0,0.22)] relative overflow-visible flex flex-col"
                    style={{
                      backgroundColor: activeBook.coverColor,
                      backgroundImage: `linear-gradient(135deg, ${activeBook.coverColor} 0%, rgba(0,0,0,0.12) 100%)`,
                      border: `1.5px solid rgba(0,0,0,0.18)`
                    }}
                  >

                    {/* 2. THE PHYSICAL TWO-PAGE PAPER SPREAD */}
                    <div 
                      className="relative rounded-[8px] bg-[#FFFDF7] text-stone-900 border border-[#E3DAC8] flex flex-col overflow-hidden min-h-[365px] sm:min-h-[390px]"
                      style={{
                        boxShadow: `
                          inset 5px 0 14px rgba(0,0,0,0.05),
                          inset -5px 0 14px rgba(0,0,0,0.05),
                          0 3px 10px rgba(0,0,0,0.06)
                        `,
                        perspective: 1200
                      }}
                    >
                      
                      {/* Paper Page Edge Thickness (Left & Right simulated page leaves) */}
                      <div className="absolute inset-y-0 left-0 w-1.5 bg-gradient-to-r from-[#E0D7C4] to-transparent pointer-events-none opacity-80 z-20" />
                      <div className="absolute inset-y-0 right-0 w-1.5 bg-gradient-to-l from-[#E0D7C4] to-transparent pointer-events-none opacity-80 z-20" />

                      {/* CENTER SPINE CREASE & FINE STITCHED THREAD NOTCHES */}
                      <div className="hidden md:flex absolute inset-y-0 left-1/2 -translate-x-1/2 w-5 pointer-events-none z-20 flex-col justify-between items-center">
                        <div className="w-full h-full bg-gradient-to-r from-black/10 via-black/20 to-black/10" />
                        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-0.5 border-r border-dashed border-[#8C7A6B]/50" />
                      </div>

                      {/* Silk Ribbon Bookmark trailing down through the spine */}
                      <div 
                        className="hidden md:block absolute -top-1.5 left-1/2 -translate-x-1/2 w-2.5 h-full pointer-events-none z-25 shadow-xs opacity-90"
                        style={{
                          backgroundColor: activeBook.ribbonColor,
                          clipPath: 'polygon(0% 0%, 100% 0%, 100% 95%, 50% 90%, 0% 95%)'
                        }}
                      />

                      {/* 2-PAGE SPREAD CONTENT (PAGE 1 & PAGE 2) */}
                      <div className="relative flex-1 p-0.5 overflow-hidden">
                        <div className="grid grid-cols-1 md:grid-cols-2 h-full">
                          
                          {/* SPREAD - LEFT PAGE (PAGE 1): ROLE, SUMMARY & TECH STACK */}
                          <div className="p-3.5 sm:p-4 md:pr-5 space-y-2.5 relative flex flex-col justify-between pb-3">
                            <div className="space-y-2">
                              {/* Header Note: Date Stamp & Volume */}
                              <div className="flex items-center justify-between border-b border-[#E8DEC8] pb-1">
                                <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-widest text-stone-500 font-semibold">
                                  Entry: {activeBook.volume}
                                </span>
                                <span className="font-handwriting font-medium text-[11px] sm:text-xs text-[#C86445]">
                                  📅 {activeBook.period}
                                </span>
                              </div>

                              {/* Company & Role */}
                              <div className="space-y-0.5">
                                <h3 className="font-serif italic font-bold text-base sm:text-[17px] text-stone-900 leading-snug">
                                  {activeBook.company}
                                </h3>
                                <p className="font-handwriting font-medium text-xs sm:text-[12.5px] text-[#C86445] tracking-wide">
                                  Role: {activeBook.role}
                                </p>
                              </div>

                              {/* Handwritten Summary */}
                              <div className="pt-0.5">
                                <p className="font-handwriting font-normal text-[10.5px] sm:text-[11.5px] text-stone-700 leading-relaxed tracking-wide">
                                  "{activeBook.summary}"
                                </p>
                              </div>

                              {/* Technologies & Engineering Stack */}
                              <div className="pt-1 space-y-1">
                                <h4 className="font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-stone-700">
                                  Technologies & Stack
                                </h4>
                                <div className="flex flex-wrap gap-1">
                                  {activeBook.skills.map((sk, sIdx) => (
                                    <span 
                                      key={sIdx}
                                      className="px-2 py-0.5 rounded-xs bg-white border border-stone-300 text-[9.5px] font-mono font-medium text-stone-800 shadow-2xs"
                                    >
                                      {sk}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>

                            {/* Margin Botanical Leaf Doodle & Page Number */}
                            <div className="pt-2 border-t border-[#E8DEC8]/60 flex items-center justify-between text-[10px] text-stone-500 font-handwriting">
                              <span className="flex items-center gap-1 text-stone-500 font-medium">
                                <span>🌿</span>
                                <span>Studio Log Record</span>
                              </span>
                              <span className="font-mono text-[9px] text-stone-500 font-semibold">
                                Page 1
                              </span>
                            </div>
                          </div>

                          {/* SPREAD - RIGHT PAGE (PAGE 2): KEY ACCOMPLISHMENTS & FIELD IMPACT */}
                          <div className="p-3.5 sm:p-4 md:pl-5 space-y-2.5 bg-gradient-to-r from-transparent via-[#FFFDF7] to-[#FAF5E8] relative flex flex-col justify-between pb-3">
                            <div className="space-y-2">
                              <div className="flex items-center justify-between border-b border-[#E8DEC8] pb-1">
                                <div className="flex items-center gap-1">
                                  <Sparkles size={11} className="text-amber-600" />
                                  <h4 className="font-mono text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-stone-700">
                                    Key Accomplishments & Wins
                                  </h4>
                                </div>
                              </div>

                              {/* Checked Bullet Points */}
                              <ul className="space-y-1.5 pt-0.5">
                                {activeBook.workHighlights.map((hl, hIdx) => (
                                  <li key={hIdx} className="flex items-start gap-1.5 font-handwriting font-normal text-[10px] sm:text-[11px] text-stone-800 leading-relaxed tracking-wide">
                                    <span className="text-emerald-600 font-bold shrink-0 text-[10px] font-mono mt-0.5">✓</span>
                                    <span>{hl}</span>
                                  </li>
                                ))}
                              </ul>

                              {/* Field Impact Milestone */}
                              <div className="space-y-1 pt-1">
                                <div className="font-mono text-[8.5px] sm:text-[9px] uppercase text-stone-600 font-bold tracking-wider">
                                  Field Impact Milestone:
                                </div>
                                <div className={`p-2 rounded-sm font-handwriting font-bold text-[10.5px] sm:text-[11.5px] text-stone-950 ${activeBook.highlighterBg} shadow-xs border border-black/10 leading-snug`}>
                                  ★ {activeBook.metrics}
                                </div>
                              </div>
                            </div>

                            {/* Page 2 Footer */}
                            <div className="pt-2 border-t border-[#E8DEC8]/60 flex items-center justify-between text-[10px] text-stone-500">
                              <span className="font-handwriting text-stone-600 font-medium text-[10.5px]">
                                Production Value Log
                              </span>
                              <span className="font-mono text-[9px] text-stone-500 font-semibold">
                                Page 2
                              </span>
                            </div>
                          </div>

                        </div>
                      </div>

                      {/* PHYSICAL NOTEBOOK BOTTOM BAR */}
                      <div className="flex items-center justify-between px-4 py-2 border-t border-[#E8DEC8] bg-[#FAF5E8]/95 text-stone-600 font-mono text-[10px] select-none z-30">
                        <div className="flex items-center gap-1.5 text-stone-500">
                          <BookOpen size={12} className="text-[#C86445]" />
                          <span>Two-Page Work Log Spread</span>
                        </div>

                        <span className="font-handwriting text-xs text-stone-700 font-medium">
                          {activeBook.company}
                        </span>

                        <button
                          onClick={handleCloseBook}
                          className="flex items-center gap-1 px-3 py-1 rounded-sm bg-[#2D241E] hover:bg-stone-800 text-stone-100 font-normal transition-colors shadow-2xs cursor-pointer text-[10px]"
                        >
                          <CheckSquare size={10} className="text-emerald-400" />
                          <span>Done Reading</span>
                        </button>
                      </div>

                    </div>

                  </div>

                </motion.div>

              </div>
            )}
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
};

export default ExperienceStudyDesk;
