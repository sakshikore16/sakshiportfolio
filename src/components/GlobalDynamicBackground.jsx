import React, { useEffect, useRef } from 'react';

export const GlobalDynamicBackground = () => {
  const peachRef = useRef(null);
  const sageRef = useRef(null);
  const buttercupRef = useRef(null);
  const lavenderRef = useRef(null);

  const targetPos = useRef({
    x: typeof window !== 'undefined' ? window.innerWidth / 2 : 500,
    y: typeof window !== 'undefined' ? window.innerHeight / 2 : 400
  });

  const orbs = useRef([
    {
      ref: peachRef,
      name: 'peach',
      currentX: typeof window !== 'undefined' ? window.innerWidth / 2 - 80 : 420,
      currentY: typeof window !== 'undefined' ? window.innerHeight / 2 - 60 : 340,
      offsetX: -80,
      offsetY: -60,
      lerp: 0.11,
      radius: 220
    },
    {
      ref: sageRef,
      name: 'sage',
      currentX: typeof window !== 'undefined' ? window.innerWidth / 2 + 70 : 570,
      currentY: typeof window !== 'undefined' ? window.innerHeight / 2 - 80 : 320,
      offsetX: 70,
      offsetY: -80,
      lerp: 0.07,
      radius: 240
    },
    {
      ref: buttercupRef,
      name: 'buttercup',
      currentX: typeof window !== 'undefined' ? window.innerWidth / 2 - 50 : 450,
      currentY: typeof window !== 'undefined' ? window.innerHeight / 2 + 70 : 470,
      offsetX: -50,
      offsetY: 70,
      lerp: 0.14,
      radius: 210
    },
    {
      ref: lavenderRef,
      name: 'lavender',
      currentX: typeof window !== 'undefined' ? window.innerWidth / 2 + 75 : 575,
      currentY: typeof window !== 'undefined' ? window.innerHeight / 2 + 60 : 460,
      offsetX: 75,
      offsetY: 60,
      lerp: 0.05,
      radius: 230
    }
  ]);

  const isMoving = useRef(false);
  const rafId = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      targetPos.current.x = e.clientX;
      targetPos.current.y = e.clientY;

      if (!isMoving.current) {
        isMoving.current = true;
        updateOrbs();
      }
    };

    const updateOrbs = () => {
      let hasSignificantMovement = false;

      orbs.current.forEach((orb) => {
        const destX = targetPos.current.x + orb.offsetX;
        const destY = targetPos.current.y + orb.offsetY;

        const dx = destX - orb.currentX;
        const dy = destY - orb.currentY;

        orb.currentX += dx * orb.lerp;
        orb.currentY += dy * orb.lerp;

        if (orb.ref.current) {
          const posX = Math.round(orb.currentX - orb.radius);
          const posY = Math.round(orb.currentY - orb.radius);
          orb.ref.current.style.transform = `translate3d(${posX}px, ${posY}px, 0)`;
        }

        if (Math.abs(dx) > 0.25 || Math.abs(dy) > 0.25) {
          hasSignificantMovement = true;
        }
      });

      if (hasSignificantMovement) {
        rafId.current = requestAnimationFrame(updateOrbs);
      } else {
        isMoving.current = false;
      }
    };

    // Initialize initial render positions
    orbs.current.forEach((orb) => {
      if (orb.ref.current) {
        const posX = Math.round(orb.currentX - orb.radius);
        const posY = Math.round(orb.currentY - orb.radius);
        orb.ref.current.style.transform = `translate3d(${posX}px, ${posY}px, 0)`;
      }
    });

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none bg-[#FAF8F5]"
      aria-hidden="true"
    >
      {/* 1. Ambient Baseline Soft Glows (Ensure continuous warm depth) */}
      <div
        className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full pointer-events-none opacity-40 mix-blend-multiply"
        style={{
          background: 'radial-gradient(circle, #FCEADE 0%, rgba(252, 234, 222, 0) 70%)'
        }}
      />
      <div
        className="absolute top-[35%] -right-36 w-[650px] h-[650px] rounded-full pointer-events-none opacity-35 mix-blend-multiply"
        style={{
          background: 'radial-gradient(circle, #E2EAD9 0%, rgba(226, 234, 217, 0) 70%)'
        }}
      />
      <div
        className="absolute -bottom-32 left-[20%] w-[620px] h-[620px] rounded-full pointer-events-none opacity-35 mix-blend-multiply"
        style={{
          background: 'radial-gradient(circle, #EDE8F5 0%, rgba(237, 232, 245, 0) 70%)'
        }}
      />

      {/* 2. Interactive Soft Pastel Colors following cursor with Gaussian blur & spring lag */}
      {/* Blush peach #FCEADE */}
      <div
        ref={peachRef}
        className="absolute top-0 left-0 w-[440px] h-[440px] rounded-full pointer-events-none mix-blend-multiply opacity-80 will-change-transform"
        style={{
          background: 'radial-gradient(circle, #FCEADE 0%, rgba(252, 234, 222, 0.6) 45%, transparent 70%)',
          filter: 'blur(48px)'
        }}
      />

      {/* Pale sage #E2EAD9 */}
      <div
        ref={sageRef}
        className="absolute top-0 left-0 w-[480px] h-[480px] rounded-full pointer-events-none mix-blend-multiply opacity-75 will-change-transform"
        style={{
          background: 'radial-gradient(circle, #E2EAD9 0%, rgba(226, 234, 217, 0.55) 45%, transparent 70%)',
          filter: 'blur(48px)'
        }}
      />

      {/* Soft buttercup #FFF3D6 */}
      <div
        ref={buttercupRef}
        className="absolute top-0 left-0 w-[420px] h-[420px] rounded-full pointer-events-none mix-blend-multiply opacity-85 will-change-transform"
        style={{
          background: 'radial-gradient(circle, #FFF3D6 0%, rgba(255, 243, 214, 0.6) 45%, transparent 70%)',
          filter: 'blur(48px)'
        }}
      />

      {/* Lavender #EDE8F5 */}
      <div
        ref={lavenderRef}
        className="absolute top-0 left-0 w-[460px] h-[460px] rounded-full pointer-events-none mix-blend-multiply opacity-70 will-change-transform"
        style={{
          background: 'radial-gradient(circle, #EDE8F5 0%, rgba(237, 232, 245, 0.5) 45%, transparent 70%)',
          filter: 'blur(48px)'
        }}
      />

      {/* 3. Subtle CSS SVG grain/noise overlay (opacity: 0.025, pointer-events: none) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025] mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />
    </div>
  );
};

export default GlobalDynamicBackground;
