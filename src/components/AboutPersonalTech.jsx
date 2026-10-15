import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, Camera, Music, Coffee, BookOpen, 
  Sparkles, Code, Palette, Cpu, Compass, Layers 
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { playClick, playPop } from '../utils/sound';

export const AboutPersonalTech = () => {
  const [activeTab, setActiveTab] = useState('personal');

  const handleTabChange = (tab) => {
    playClick();
    setActiveTab(tab);
  };

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-white/50 dark:bg-canvas-cardDark/30 border-y border-black/5 dark:border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading & Perspective Switcher */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF6B6B]/15 text-[#FF6B6B] text-xs font-mono font-medium mb-3">
              <span>✦ Inside My World</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-slate-900 dark:text-white">
              The <span className="font-serif italic text-[#FF6B6B]">Human</span> & The <span className="font-serif italic text-[#4ECDC4]">Technologist</span>
            </h2>
          </div>

          {/* Perspective Switcher */}
          <div className="flex bg-slate-100 dark:bg-canvas-cardDark p-1 rounded-full border border-black/10 dark:border-white/10">
            <button
              onClick={() => handleTabChange('personal')}
              className={`px-5 py-2 rounded-full text-xs font-medium transition-all ${
                activeTab === 'personal'
                  ? 'bg-white dark:bg-canvas-dark text-black dark:text-white shadow-sm'
                  : 'text-slate-500 hover:text-black dark:hover:text-white'
              }`}
            >
              🌸 Personal & Hobbies
            </button>
            <button
              onClick={() => handleTabChange('tech')}
              className={`px-5 py-2 rounded-full text-xs font-medium transition-all ${
                activeTab === 'tech'
                  ? 'bg-white dark:bg-canvas-dark text-black dark:text-white shadow-sm'
                  : 'text-slate-500 hover:text-black dark:hover:text-white'
              }`}
            >
              💻 Tech & Design Mindset
            </button>
          </div>
        </div>

        {/* Dynamic Content Body */}
        <AnimatePresence mode="wait">
          
          {/* PERSPECTIVE 1: PERSONAL & HOBBIES */}
          {activeTab === 'personal' && (
            <motion.div
              key="personal"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
              className="space-y-12"
            >
              {/* Personal Photo Polaroids Gallery */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {personalInfo.personalPhotos.map((photo, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-3xl bg-white dark:bg-canvas-cardDark border border-black/10 dark:border-white/10 shadow-soft hover:scale-[1.02] transition-transform space-y-3"
                  >
                    {/* Photo Visual Frame */}
                    <div className="aspect-[4/3] rounded-2xl bg-gradient-to-tr from-amber-50 via-rose-50 to-indigo-50 dark:from-slate-900 dark:via-indigo-950 dark:to-slate-800 p-4 flex flex-col justify-between border border-black/5 dark:border-white/5 relative overflow-hidden">
                      <div className="flex justify-between items-center text-[10px] font-mono text-slate-500">
                        <span className="px-2 py-0.5 rounded-full bg-white/80 dark:bg-black/50 backdrop-blur-sm">
                          {photo.tag}
                        </span>
                        <span>35mm Film</span>
                      </div>

                      <div className="text-center my-auto text-4xl">
                        {photo.emoji}
                      </div>

                      <div className="text-center">
                        <span className="font-serif italic text-sm text-slate-800 dark:text-slate-200">
                          {photo.title}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs font-light text-slate-600 dark:text-slate-400 text-center px-2">
                      “{photo.caption}”
                    </p>
                  </div>
                ))}
              </div>

              {/* Hobbies Cards Matrix */}
              <div className="space-y-4">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-widest block">
                  // RITUALS, CURIOSITIES & UNPLUGGED RECHARGES
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {personalInfo.hobbies.map((hobby, i) => (
                    <div
                      key={i}
                      className="p-5 rounded-2xl bg-white dark:bg-canvas-cardDark border border-black/5 dark:border-white/5 shadow-sm space-y-2 hover:border-[#FF6B6B]/40 transition-colors"
                    >
                      <div className="text-2xl">{hobby.emoji}</div>
                      <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                        {hobby.title}
                      </h4>
                      <p className="text-xs font-light text-slate-600 dark:text-slate-400 leading-relaxed">
                        {hobby.desc}
                      </p>
                    </div>
                  ))}

                  {/* Personal Quote Card */}
                  <div className="p-5 rounded-2xl bg-[#FFE66D]/30 border border-[#FFE66D] flex flex-col justify-between">
                    <span className="text-xs font-mono text-black uppercase font-bold">
                      PHILOSOPHY
                    </span>
                    <p className="font-serif italic text-base text-slate-900 my-2">
                      “The wider you live offline, the richer the empathy you bring to the screen.”
                    </p>
                    <span className="text-[11px] font-mono text-slate-700">
                      — Sakshi
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* PERSPECTIVE 2: TECH MINDSET & DESIGN PHILOSOPHY */}
          {activeTab === 'tech' && (
            <motion.div
              key="tech"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Pillar 1: UI/UX */}
                <div className="p-6 rounded-3xl bg-white dark:bg-canvas-cardDark border border-black/10 dark:border-white/10 shadow-soft space-y-4">
                  <div className="w-10 h-10 rounded-2xl bg-[#FF6B6B]/15 text-[#FF6B6B] flex items-center justify-center">
                    <Palette size={20} />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                    Human-Centered Empathy
                  </h3>
                  <p className="text-xs sm:text-sm font-light text-slate-600 dark:text-slate-400 leading-relaxed">
                    Interfaces shouldn't force users to think like computers. I study cognitive fatigue, information architecture, and micro-copy so interactions feel natural and rewarding.
                  </p>
                  <div className="pt-2 text-xs font-mono text-[#FF6B6B]">
                    ✦ Figma, UX Research, Tokens
                  </div>
                </div>

                {/* Pillar 2: Frontend Engineering */}
                <div className="p-6 rounded-3xl bg-white dark:bg-canvas-cardDark border border-black/10 dark:border-white/10 shadow-soft space-y-4">
                  <div className="w-10 h-10 rounded-2xl bg-[#4ECDC4]/15 text-[#4ECDC4] flex items-center justify-center">
                    <Code size={20} />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                    Living Code & Motion Physics
                  </h3>
                  <p className="text-xs sm:text-sm font-light text-slate-600 dark:text-slate-400 leading-relaxed">
                    Static mockups are only half the battle. I engineer fluid, 60fps React & Tailwind layouts backed by spring animations, Web Audio feedback, and rock-solid state management.
                  </p>
                  <div className="pt-2 text-xs font-mono text-[#4ECDC4]">
                    ✦ React, Next.js, Framer Motion
                  </div>
                </div>

                {/* Pillar 3: AI & Systems */}
                <div className="p-6 rounded-3xl bg-white dark:bg-canvas-cardDark border border-black/10 dark:border-white/10 shadow-soft space-y-4">
                  <div className="w-10 h-10 rounded-2xl bg-[#B388FF]/15 text-[#B388FF] flex items-center justify-center">
                    <Sparkles size={20} />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                    Empathetic AI Intelligence
                  </h3>
                  <p className="text-xs sm:text-sm font-light text-slate-600 dark:text-slate-400 leading-relaxed">
                    AI shouldn't just be an empty chat box. I build intuitive contextual copilots, vector retrieval systems, and multimodal reasoning loops that quietly empower the user.
                  </p>
                  <div className="pt-2 text-xs font-mono text-[#B388FF]">
                    ✦ Gemini 1.5, LangChain, FastAPI
                  </div>
                </div>

              </div>

              {/* Core Tenets Strip */}
              <div className="p-6 rounded-2xl bg-black dark:bg-white text-white dark:text-black flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="text-base font-medium">
                    The Rule of Craft: No unnecessary clicks, no laggy frames.
                  </h4>
                  <p className="text-xs opacity-75">
                    Fast iteration cycles with clean component APIs and documentation.
                  </p>
                </div>
                <a
                  href="#contact"
                  className="px-5 py-2 rounded-full bg-[#FFE66D] text-black text-xs font-mono font-bold hover:scale-105 transition-transform"
                >
                  Let's Discuss Projects ↗
                </a>
              </div>
            </motion.div>
          )}

        </AnimatePresence>

      </div>
    </section>
  );
};
