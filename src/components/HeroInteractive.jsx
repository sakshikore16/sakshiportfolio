import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Sparkles, MapPin, ArrowUpRight, Compass, Heart } from 'lucide-react';
import { playClick, playPop, playSticker } from '../utils/sound';

export const HeroInteractive = ({ onExploreProjects, onOpenContact }) => {
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 500, y: 300 });
  const [activeCharm, setActiveCharm] = useState(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const charms = [
    { id: 'travel', emoji: '✈️', title: 'Wanderlust', detail: 'Trekking mountain ridges & discovering coastal towns', color: 'bg-[#FF6B6B]', textColor: 'text-white' },
    { id: 'photo', emoji: '📸', title: 'Film Photography', detail: '35mm candid shadows & golden hour framing', color: 'bg-[#4ECDC4]', textColor: 'text-black' },
    { id: 'speaking', emoji: '🎤', title: 'Tech Events', detail: 'Presenting UI/UX & full-stack ideas to 200+ peers', color: 'bg-[#FFE66D]', textColor: 'text-black' },
    { id: 'cooking', emoji: '🍳', title: 'Culinary Arts', detail: 'Creative plating & artisanal sourdough experiments', color: 'bg-[#FFA07A]', textColor: 'text-black' },
    { id: 'music', emoji: '🎧', title: 'Indie Soundtracks', detail: 'Curating ambient bedroom-pop & focus playlists', color: 'bg-[#B388FF]', textColor: 'text-white' },
    { id: 'nature', emoji: '🌿', title: 'Botanical Walks', detail: 'Studying organic geometric patterns in flora', color: 'bg-[#C7F464]', textColor: 'text-black' },
    { id: 'code', emoji: '💻', title: 'Full-Stack Systems', detail: 'Bridging frontends with high-throughput backends', color: 'bg-[#4D96FF]', textColor: 'text-white' }
  ];

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden select-none"
    >
      {/* Dynamic Cursor-Following Color Blending Spotlight */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 -z-10"
        style={{
          background: `
            radial-gradient(650px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 107, 107, 0.16), transparent 50%),
            radial-gradient(550px circle at ${mousePos.x + 80}px ${mousePos.y + 60}px, rgba(78, 205, 196, 0.16), transparent 50%),
            radial-gradient(450px circle at ${mousePos.x - 70}px ${mousePos.y - 40}px, rgba(255, 230, 109, 0.18), transparent 50%)
          `
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-10 relative z-10">
        
        {/* Subtle Status Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 dark:bg-canvas-cardDark/80 border border-black/10 dark:border-white/10 shadow-sm text-xs font-mono backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-[#4ECDC4] animate-ping" />
          <span className="font-medium text-slate-800 dark:text-slate-200">Sakshi Kore</span>
          <span className="text-slate-300 dark:text-slate-600">•</span>
          <span className="font-light text-slate-600 dark:text-slate-400">Full-Stack Engineer & Product Designer</span>
          <span className="text-slate-300 dark:text-slate-600">•</span>
          <span className="text-[#FF6B6B] font-medium">Open to All Roles</span>
        </div>

        {/* Elegant Thin Typography */}
        <div className="space-y-4 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-slate-900 dark:text-white leading-[1.12]">
            Designing <span className="font-serif italic font-normal text-[#FF6B6B]">digital feelings</span>, <br />
            engineering <span className="font-serif italic font-normal text-[#4ECDC4]">living</span> systems.
          </h1>

          <p className="text-base sm:text-xl font-light text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            I craft digital products where human intuition, playful visual craft, robust backend logic, and applied AI thrive together.
          </p>
        </div>

        {/* Primary CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href="#projects"
            onClick={() => playClick()}
            className="px-6 py-3 rounded-full bg-black dark:bg-white text-white dark:text-black text-xs sm:text-sm font-medium hover:scale-105 transition-all shadow-sm flex items-center gap-2"
          >
            <span>Explore Curated Work</span>
            <ArrowDown size={14} />
          </a>

          <a
            href="#skills"
            onClick={() => playClick()}
            className="px-5 py-3 rounded-full bg-white dark:bg-canvas-cardDark border border-black/15 dark:border-white/15 text-xs sm:text-sm font-light text-slate-800 dark:text-slate-200 hover:border-black/40 transition-all flex items-center gap-1.5"
          >
            <span>Botanical Skills Garden</span>
            <Sparkles size={13} className="text-[#FFE66D]" />
          </a>

          <a
            href="#about"
            onClick={() => playClick()}
            className="px-5 py-3 rounded-full bg-white dark:bg-canvas-cardDark border border-black/15 dark:border-white/15 text-xs sm:text-sm font-light text-slate-800 dark:text-slate-200 hover:border-black/40 transition-all"
          >
            Photo Reel & Life ↗
          </a>
        </div>

        {/* Interactive Floating Personal Charms with Blur/Morph Effect */}
        <div className="pt-8">
          <div className="text-[11px] font-mono text-slate-400 mb-6 flex items-center justify-center gap-2">
            <span>✦ Personal Charms</span>
            <span>•</span>
            <span className="italic">Hover to reveal passions & morph colors</span>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-3 max-w-4xl mx-auto">
            {charms.map((charm) => {
              const isHovered = activeCharm === charm.id;

              return (
                <motion.div
                  key={charm.id}
                  whileHover={{ scale: 1.1, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  onHoverStart={() => {
                    playSticker();
                    setActiveCharm(charm.id);
                  }}
                  onHoverEnd={() => setActiveCharm(null)}
                  className={`px-4 py-2.5 rounded-full border border-black/10 dark:border-white/10 backdrop-blur-md cursor-pointer transition-all duration-300 flex items-center gap-2 ${
                    isHovered
                      ? `${charm.color} ${charm.textColor} shadow-lg ring-4 ring-black/5`
                      : 'bg-white/70 dark:bg-canvas-cardDark/70 text-slate-700 dark:text-slate-200 hover:border-black/30'
                  }`}
                >
                  <span className="text-lg">{charm.emoji}</span>
                  <span className="text-xs font-medium tracking-tight">
                    {charm.title}
                  </span>
                </motion.div>
              );
            })}
          </div>

          {/* Dynamic Floating Subtitle Note on Hover */}
          <div className="h-8 mt-4 flex items-center justify-center">
            {activeCharm ? (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs font-mono text-slate-600 dark:text-slate-300 flex items-center gap-1.5"
              >
                <span className="text-[#FF6B6B]">✦</span>
                <span>{charms.find(c => c.id === activeCharm)?.detail}</span>
              </motion.div>
            ) : (
              <span className="text-xs font-mono text-slate-400 opacity-60">
                Move cursor around the canvas to bend colors
              </span>
            )}
          </div>

        </div>

      </div>

    </section>
  );
};
