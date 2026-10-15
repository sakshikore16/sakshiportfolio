import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const InteractiveAtmosphere = () => {
  const mouseX = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 500);
  const mouseY = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 400);

  // Offset springs for the 3 distinct blobs with smooth lag
  const blob1X = useSpring(mouseX, { damping: 35, stiffness: 140 });
  const blob1Y = useSpring(mouseY, { damping: 35, stiffness: 140 });

  const blob2X = useSpring(mouseX, { damping: 42, stiffness: 125 });
  const blob2Y = useSpring(mouseY, { damping: 42, stiffness: 125 });

  const blob3X = useSpring(mouseX, { damping: 48, stiffness: 150 });
  const blob3Y = useSpring(mouseY, { damping: 48, stiffness: 150 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden bg-[#FAF8F5]">
      {/* 3 Overlapping Ambient Blur Blobs (#E3EEF7 blue, #FCEAE4 peach, #E8F0E4 sage) with blur(80px) */}
      <div 
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{ filter: 'blur(80px)' }}
      >
        {/* Blob 1: Soft Blue (#E3EEF7, 460px) */}
        <motion.div
          className="absolute rounded-full pointer-events-none opacity-85 will-change-transform"
          style={{
            width: 460,
            height: 460,
            backgroundColor: '#E3EEF7',
            x: blob1X,
            y: blob1Y,
            marginLeft: -260,
            marginTop: -230
          }}
        />

        {/* Blob 2: Soft Peach (#FCEAE4, 520px) */}
        <motion.div
          className="absolute rounded-full pointer-events-none opacity-80 will-change-transform"
          style={{
            width: 520,
            height: 520,
            backgroundColor: '#FCEAE4',
            x: blob2X,
            y: blob2Y,
            marginLeft: -190,
            marginTop: -170
          }}
        />

        {/* Blob 3: Soft Sage (#E8F0E4, 420px) */}
        <motion.div
          className="absolute rounded-full pointer-events-none opacity-85 will-change-transform"
          style={{
            width: 420,
            height: 420,
            backgroundColor: '#E8F0E4',
            x: blob3X,
            y: blob3Y,
            marginLeft: -210,
            marginTop: -300
          }}
        />
      </div>

      {/* Subtle SVG Grain Overlay (opacity: 0.02) */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />
    </div>
  );
};

export default InteractiveAtmosphere;
