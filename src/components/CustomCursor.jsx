import React, { useEffect, useRef } from 'react';

export const CustomCursor = () => {
  const ringRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // Only run on fine pointer devices (desktop/mouse)
    if (typeof window === 'undefined' || window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const ring = ringRef.current;
    const container = containerRef.current;
    if (!ring || !container) return;

    // Direct synchronous cursor coordinate tracking
    let mouseX = -100;
    let mouseY = -100;
    let lastSpawnX = -100;
    let lastSpawnY = -100;

    // Pre-allocated pool of 32 sparkle particles for magical fairy dust trail
    const MAX_PARTICLES = 32;
    const particles = [];
    const colors = ['#FFD166', '#FF9AA2', '#B5EAD7', '#C7CEEA', '#FFB7B2', '#E2D4F0', '#FFE5B4', '#F48FB1'];

    for (let i = 0; i < MAX_PARTICLES; i++) {
      const el = document.createElement('div');
      el.style.position = 'fixed';
      el.style.top = '0';
      el.style.left = '0';
      el.style.pointerEvents = 'none';
      el.style.zIndex = '9998';
      el.style.opacity = '0';
      el.style.filter = 'drop-shadow(0 0 3px currentColor)';
      el.style.willChange = 'transform, opacity';
      
      // Alternate between 4-point star, 8-point twinkling star, and cute diamond sparkle
      const shapeType = i % 3;
      if (shapeType === 0) {
        el.innerHTML = `
          <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor">
            <path d="M12 0 C12 6.5 17.5 12 24 12 C17.5 12 12 17.5 12 24 C12 17.5 6.5 12 0 12 C6.5 12 12 6.5 12 0 Z"/>
          </svg>
        `;
      } else if (shapeType === 1) {
        el.innerHTML = `
          <svg viewBox="0 0 24 24" width="11" height="11" fill="currentColor">
            <path d="M12 0 L14 9 L23 12 L14 15 L12 24 L10 15 L1 12 L10 9 Z"/>
          </svg>
        `;
      } else {
        el.innerHTML = `
          <svg viewBox="0 0 16 16" width="9" height="9" fill="currentColor">
            <circle cx="8" cy="8" r="4"/>
          </svg>
        `;
      }
      container.appendChild(el);

      particles.push({
        el,
        x: 0,
        y: 0,
        driftX: 0,
        driftY: 0,
        birth: 0,
        active: false,
        rot: 0
      });
    }

    let poolIndex = 0;

    const spawnSparkle = (x, y, scaleMult = 1) => {
      const p = particles[poolIndex];
      poolIndex = (poolIndex + 1) % MAX_PARTICLES;

      p.x = x - 6;
      p.y = y - 6;
      p.driftX = (Math.random() - 0.5) * 16;
      p.driftY = (Math.random() - 0.7) * 18;
      p.birth = performance.now();
      p.rot = Math.random() * 360;
      p.scaleMult = scaleMult;
      p.active = true;
      p.el.style.color = colors[Math.floor(Math.random() * colors.length)];
      p.el.style.opacity = '0.9';
      p.el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) scale(${scaleMult}) rotate(${p.rot}deg)`;
    };

    const handlePointerMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Synchronous instant ring translation: ZERO LAG!
      ring.style.transform = `translate3d(${mouseX - 8}px, ${mouseY - 8}px, 0)`;

      // Spawn sparkle trail with high responsiveness
      const dist = Math.hypot(mouseX - lastSpawnX, mouseY - lastSpawnY);
      if (dist > 8) {
        spawnSparkle(mouseX, mouseY, 1);
        // Occasionally spawn subtle secondary micro-sparkle
        if (dist > 18) {
          spawnSparkle(
            mouseX + (Math.random() - 0.5) * 12,
            mouseY + (Math.random() - 0.5) * 12,
            0.65
          );
        }
        lastSpawnX = mouseX;
        lastSpawnY = mouseY;
      }
    };

    let isHoveringInteractive = false;
    const handlePointerOver = (e) => {
      const target = e.target;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.getAttribute('role') === 'button' ||
        target.classList?.contains('cursor-pointer') ||
        target.closest?.('.cursor-pointer')
      ) {
        if (!isHoveringInteractive) {
          isHoveringInteractive = true;
          ring.style.borderColor = 'rgba(244, 139, 150, 0.95)';
          ring.style.backgroundColor = 'rgba(253, 231, 226, 0.35)';
          ring.style.width = '24px';
          ring.style.height = '24px';
          ring.style.marginLeft = '-12px';
          ring.style.marginTop = '-12px';
        }
      } else {
        if (isHoveringInteractive) {
          isHoveringInteractive = false;
          ring.style.borderColor = 'rgba(251, 113, 133, 0.8)';
          ring.style.backgroundColor = 'transparent';
          ring.style.width = '16px';
          ring.style.height = '16px';
          ring.style.marginLeft = '-8px';
          ring.style.marginTop = '-8px';
        }
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerover', handlePointerOver, { passive: true });

    // Smooth 60fps rAF animation for trailing sparkle particles decay over 500ms
    let rafId;
    const renderSparkles = (now) => {
      for (let i = 0; i < MAX_PARTICLES; i++) {
        const p = particles[i];
        if (!p.active) continue;

        const age = now - p.birth;
        if (age >= 500) {
          p.active = false;
          p.el.style.opacity = '0';
          continue;
        }

        const progress = age / 500;
        const scale = (1 - progress) * (p.scaleMult || 1);
        const opacity = 0.9 * (1 - progress);
        const rot = p.rot + progress * 75;
        const curX = p.x + p.driftX * progress;
        const curY = p.y + p.driftY * progress;

        p.el.style.transform = `translate3d(${curX.toFixed(1)}px, ${curY.toFixed(1)}px, 0) scale(${scale.toFixed(2)}) rotate(${rot.toFixed(1)}deg)`;
        p.el.style.opacity = opacity.toFixed(2);
      }

      rafId = requestAnimationFrame(renderSparkles);
    };

    rafId = requestAnimationFrame(renderSparkles);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerover', handlePointerOver);
      if (rafId) cancelAnimationFrame(rafId);
      particles.forEach((p) => p.el.remove());
    };
  }, []);

  return (
    <div ref={containerRef} className="hidden md:block pointer-events-none select-none">
      {/* Tiny delicate pastel ring: w-4 h-4 rounded-full border border-rose-300/80 */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] w-4 h-4 rounded-full border border-rose-300/80 will-change-transform transition-[width,height,background-color,border-color,margin] duration-150"
        style={{ transform: 'translate3d(-100px, -100px, 0)' }}
      />
    </div>
  );
};

export default CustomCursor;
