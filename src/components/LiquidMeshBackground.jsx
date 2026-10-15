import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export const LiquidMeshBackground = () => {
  // Mouse position in viewport coordinates (px)
  const mouseX = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 600);
  const mouseY = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 400);

  // Smooth fluid spring physics for cursor follower
  const smoothCursorX = useSpring(mouseX, { damping: 25, stiffness: 140, mass: 0.5 });
  const smoothCursorY = useSpring(mouseY, { damping: 25, stiffness: 140, mass: 0.5 });

  // Subtle ambient orb parralax shifts driven by cursor position
  const pinkShiftX = useTransform(smoothCursorX, [0, 1600], [-35, 35]);
  const pinkShiftY = useTransform(smoothCursorY, [0, 1000], [-25, 25]);

  const blueShiftX = useTransform(smoothCursorX, [0, 1600], [35, -35]);
  const blueShiftY = useTransform(smoothCursorY, [0, 1000], [-25, 25]);

  const purpleShiftX = useTransform(smoothCursorX, [0, 1600], [-30, 30]);
  const purpleShiftY = useTransform(smoothCursorY, [0, 1000], [30, -30]);

  useEffect(() => {
    // Only track pointer moves on mouse/desktop devices; avoid touch-event throttling on mobile
    if (typeof window === 'undefined' || (window.matchMedia && window.matchMedia('(pointer: coarse)').matches)) {
      return;
    }

    const handlePointerMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, [mouseX, mouseY]);

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none bg-[#FAF8F5]"
      aria-hidden="true"
    >
      {/* 
        ========================================================================
        VERY LIGHT, MINIMAL, AIRY PASTEL MESH
        - Base: Clean warm cream/off-white (#FAF8F5)
        - Colors: Whispering pastel pink, lavender purple, and soft powder blue
        - GPU-accelerated watercolor diffusion
        ========================================================================
      */}

      {/* Layer with Gaussian blur for seamless watercolor diffusion */}
      <div className="absolute inset-0 w-full h-full filter blur-[55px] sm:blur-[95px] transform-gpu">
        
        {/* 1. WHISPER PASTEL PINK (Top-Left / Center wash) */}
        <motion.div
          style={{ x: pinkShiftX, y: pinkShiftY }}
          className="absolute -top-[12%] -left-[8%] w-[600px] sm:w-[850px] h-[600px] sm:h-[850px] pointer-events-none will-change-transform"
        >
          <motion.div
            animate={{
              x: [0, 30, -20, 0],
              y: [0, -25, 20, 0],
              scale: [1, 1.06, 0.96, 1],
            }}
            transition={{
              duration: 22,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-full h-full rounded-full bg-[radial-gradient(circle,rgba(255,210,225,0.38)_0%,rgba(255,230,240,0.16)_50%,transparent_75%)]"
          />
        </motion.div>

        {/* 2. WHISPER PASTEL BLUE (Top-Right / Center wash) */}
        <motion.div
          style={{ x: blueShiftX, y: blueShiftY }}
          className="absolute -top-[10%] right-[0%] w-[600px] sm:w-[900px] h-[600px] sm:h-[900px] pointer-events-none will-change-transform"
        >
          <motion.div
            animate={{
              x: [0, -30, 20, 0],
              y: [0, 25, -20, 0],
              scale: [1, 0.96, 1.05, 1],
            }}
            transition={{
              duration: 24,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-full h-full rounded-full bg-[radial-gradient(circle,rgba(210,235,255,0.40)_0%,rgba(230,245,255,0.16)_50%,transparent_75%)]"
          />
        </motion.div>

        {/* 3. WHISPER PASTEL PURPLE / LILAC (Bottom wash) */}
        <motion.div
          style={{ x: purpleShiftX, y: purpleShiftY }}
          className="absolute bottom-[-10%] left-[15%] w-[600px] sm:w-[950px] h-[600px] sm:h-[950px] pointer-events-none will-change-transform"
        >
          <motion.div
            animate={{
              x: [0, 35, -25, 0],
              y: [0, -30, 25, 0],
              scale: [1, 1.05, 0.96, 1],
            }}
            transition={{
              duration: 26,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-full h-full rounded-full bg-[radial-gradient(circle,rgba(235,218,255,0.36)_0%,rgba(245,235,255,0.15)_50%,transparent_75%)]"
          />
        </motion.div>

        {/* 
          ======================================================================
          4. INTERACTIVE CURSOR-FOLLOWING PASTEL PRISM BLOOM (DESKTOP ONLY)
          Directly glides under the user's cursor across the entire viewport.
          Combines soft pastel pink, purple, and blue into a gentle radiant glow.
          ======================================================================
        */}
        <motion.div
          style={{
            x: smoothCursorX,
            y: smoothCursorY,
            translateX: '-50%',
            translateY: '-50%',
          }}
          className="hidden sm:block absolute top-0 left-0 w-[550px] sm:w-[700px] h-[550px] sm:h-[700px] rounded-full pointer-events-none will-change-transform"
        >
          <div className="w-full h-full rounded-full bg-[radial-gradient(circle,rgba(255,215,230,0.48)_0%,rgba(230,215,255,0.35)_35%,rgba(215,235,255,0.22)_60%,transparent_80%)]" />
        </motion.div>

      </div>

      {/* 
        Subtle tactile paper grain (0.015 opacity) for physical craft warmth
      */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.018]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />
    </div>
  );
};

export default LiquidMeshBackground;
