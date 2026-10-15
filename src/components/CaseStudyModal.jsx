import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, ExternalLink, Github, CheckCircle2, Sparkles, Layers, 
  Users, Cpu, Target, ArrowRight, Check, Code, Server, Database, 
  Terminal, Workflow, Laptop, Smartphone, Presentation, FileText, BarChart3
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { playClick, playSuccess, playPop, playHighFiveSound, playCheerSound } from '../utils/sound';

export const CaseStudyModal = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState('working');
  const [highFiveActive, setHighFiveActive] = useState(false);
  const [highFiveCount, setHighFiveCount] = useState(0);
  const [cheerActive, setCheerActive] = useState(false);
  const [cheerCount, setCheerCount] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    document.body.classList.add('project-modal-open');
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
      document.body.classList.remove('project-modal-open');
    };
  }, [onClose]);

  if (!project || !project.caseStudy) return null;

  // High-Five handler: Plays tactile slap audio & triggers high-five hands clash
  const handleHighFive = () => {
    playHighFiveSound();
    setHighFiveCount((prev) => prev + 1);
    setHighFiveActive(true);
    setTimeout(() => {
      setHighFiveActive(false);
    }, 1600);
  };

  // Cheer Work handler: Plays fanfare chime, dual-cannon confetti & cheerful floaters
  const handleCheer = () => {
    playCheerSound();
    setCheerCount((prev) => prev + 1);
    setCheerActive(true);

    // Left cannon
    confetti({
      particleCount: 45,
      angle: 60,
      spread: 60,
      origin: { x: 0.18, y: 0.72 },
      colors: ['#E07A5F', '#F4A261', '#E76F51', '#2A9D8F', '#E9C46A', '#FFB703']
    });
    // Right cannon
    confetti({
      particleCount: 45,
      angle: 120,
      spread: 60,
      origin: { x: 0.82, y: 0.72 },
      colors: ['#E07A5F', '#F4A261', '#E76F51', '#2A9D8F', '#E9C46A', '#FFB703']
    });

    setTimeout(() => {
      setCheerActive(false);
    }, 2200);
  };

  const tabs = [
    { id: 'working', label: '1. How It Works (Workflow)', icon: Cpu },
    { id: 'features', label: '2. Detailed Features', icon: Sparkles },
    { id: 'tech', label: '3. Complete Tech Stack', icon: Layers },
    { id: 'results', label: '4. Impact & Results', icon: Target },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/50 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      
      {/* ✋ HIGH-FIVE INTERACTIVE CLASH OVERLAY */}
      <AnimatePresence>
        {highFiveActive && (
          <motion.div
            key={`highfive-overlay-${highFiveCount}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[70] pointer-events-none flex items-center justify-center overflow-hidden"
          >
            {/* Subtle flash backdrop */}
            <div className="absolute inset-0 bg-amber-500/10 backdrop-blur-[1px]" />

            <div className="relative flex items-center justify-center w-full max-w-lg h-80">
              {/* Left Hand: flying in from left to center slap */}
              <motion.div
                initial={{ x: -280, y: 15, rotate: -35, scale: 0.8 }}
                animate={{
                  x: [-280, -12, -26, -22],
                  y: [15, -6, 0, 0],
                  rotate: [-35, 12, 5, 5],
                  scale: [0.8, 1.4, 1.22, 1.2],
                }}
                exit={{ x: -220, opacity: 0 }}
                transition={{ duration: 0.5, times: [0, 0.46, 0.75, 1], ease: 'easeOut' }}
                className="text-8xl sm:text-9xl select-none filter drop-shadow-2xl z-20"
              >
                🫱
              </motion.div>

              {/* Right Hand: flying in from right to center slap */}
              <motion.div
                initial={{ x: 280, y: 15, rotate: 35, scale: 0.8 }}
                animate={{
                  x: [280, 12, 26, 22],
                  y: [15, -6, 0, 0],
                  rotate: [35, -12, -5, -5],
                  scale: [0.8, 1.4, 1.22, 1.2],
                }}
                exit={{ x: 220, opacity: 0 }}
                transition={{ duration: 0.5, times: [0, 0.46, 0.75, 1], ease: 'easeOut' }}
                className="text-8xl sm:text-9xl select-none filter drop-shadow-2xl z-20"
              >
                🫲
              </motion.div>

              {/* Impact Flash Shockwave Ring */}
              <motion.div
                initial={{ scale: 0.1, opacity: 0 }}
                animate={{ scale: [0.1, 2.2, 3], opacity: [0, 1, 0] }}
                transition={{ delay: 0.23, duration: 0.55, ease: 'easeOut' }}
                className="absolute w-28 h-28 rounded-full border-4 border-amber-400 bg-amber-300/30 shadow-[0_0_50px_rgba(251,191,36,0.8)]"
              />

              {/* Comic Impact Badge */}
              <motion.div
                initial={{ scale: 0, rotate: -15, opacity: 0 }}
                animate={{
                  scale: [0, 1.25, 1],
                  rotate: [-15, 3, 0],
                  opacity: [0, 1, 1],
                  y: [0, -85, -88]
                }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ delay: 0.22, duration: 0.38, type: 'spring', bounce: 0.5 }}
                className="absolute z-30 px-5 py-2.5 rounded-2xl bg-amber-400 border-3 border-amber-600 shadow-2xl flex items-center gap-2"
              >
                <span className="text-2xl">💥</span>
                <span className="font-sans font-black text-amber-950 text-base sm:text-xl tracking-wider uppercase">
                  HIGH FIVE! 🙌
                </span>
                <span className="bg-amber-600 text-white font-mono text-xs px-2.5 py-0.5 rounded-full font-bold shadow-xs">
                  +{highFiveCount}
                </span>
              </motion.div>

              {/* Burst Stars & Mini Claps */}
              {[
                { x: -110, y: -90, emoji: '✨', delay: 0.24 },
                { x: 110, y: -90, emoji: '⭐', delay: 0.25 },
                { x: -130, y: 60, emoji: '✋', delay: 0.26 },
                { x: 130, y: 60, emoji: '🖐️', delay: 0.26 },
                { x: 0, y: -130, emoji: '💥', delay: 0.23 },
                { x: -70, y: 110, emoji: '👏', delay: 0.27 },
                { x: 70, y: 110, emoji: '💛', delay: 0.28 },
              ].map((star, idx) => (
                <motion.div
                  key={idx}
                  initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                  animate={{
                    x: star.x,
                    y: star.y,
                    scale: [0, 1.4, 0.9],
                    opacity: [0, 1, 0]
                  }}
                  transition={{ delay: star.delay, duration: 0.75, ease: 'easeOut' }}
                  className="absolute text-2xl sm:text-3xl select-none z-20"
                >
                  {star.emoji}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🎉 CHEER WORK CELEBRATION OVERLAY */}
      <AnimatePresence>
        {cheerActive && (
          <motion.div
            key={`cheer-overlay-${cheerCount}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[70] pointer-events-none flex flex-col items-center justify-start pt-14 sm:pt-20 overflow-hidden"
          >
            {/* Cheering Toast Banner */}
            <motion.div
              initial={{ y: -60, scale: 0.8, opacity: 0 }}
              animate={{ y: 0, scale: [0.8, 1.06, 1], opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              transition={{ duration: 0.4, type: 'spring', bounce: 0.45 }}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-emerald-600 via-teal-600 to-amber-500 text-white shadow-2xl border-2 border-white/60 flex items-center gap-3 backdrop-blur-md z-30"
            >
              <span className="text-2xl animate-bounce">🎉</span>
              <div className="text-left">
                <div className="font-sans font-black text-sm sm:text-base tracking-wide uppercase flex items-center gap-2">
                  <span>CHEERING THIS WORK!</span>
                  <span className="bg-white/20 text-white font-mono text-xs px-2 py-0.5 rounded-full font-bold">
                    +{cheerCount}
                  </span>
                </div>
                <div className="text-[11px] font-mono text-emerald-100">
                  Woohoo! Thanks for cheering for this project! 🥳
                </div>
              </div>
              <span className="text-2xl animate-bounce">📣</span>
            </motion.div>

            {/* Rising Cheer Emojis Crowd */}
            {[
              { emoji: '🎉', left: '15%', delay: 0.05, duration: 1.8, xOffset: -20 },
              { emoji: '🥳', left: '26%', delay: 0.15, duration: 1.9, xOffset: 25 },
              { emoji: '📣', left: '38%', delay: 0.1, duration: 1.7, xOffset: -15 },
              { emoji: '👏', left: '50%', delay: 0.2, duration: 1.8, xOffset: 20 },
              { emoji: '🌟', left: '62%', delay: 0.12, duration: 2.0, xOffset: -25 },
              { emoji: '💖', left: '74%', delay: 0.22, duration: 1.7, xOffset: 15 },
              { emoji: '🎊', left: '86%', delay: 0.3, duration: 1.6, xOffset: -10 },
              { emoji: '🏆', left: '32%', delay: 0.28, duration: 1.9, xOffset: 18 },
              { emoji: '✨', left: '68%', delay: 0.25, duration: 1.8, xOffset: -18 },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ y: 200, x: 0, opacity: 0, scale: 0.6, rotate: -15 }}
                animate={{
                  y: [-10, -220, -420],
                  x: [0, item.xOffset, item.xOffset * 1.6],
                  opacity: [0, 1, 0],
                  scale: [0.6, 1.35, 0.9],
                  rotate: [-15, 15, -10]
                }}
                transition={{
                  delay: item.delay,
                  duration: item.duration,
                  ease: 'easeOut'
                }}
                style={{ left: item.left }}
                className="absolute bottom-20 text-3xl sm:text-5xl select-none drop-shadow-md z-20"
              >
                {item.emoji}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl bg-[#FAF8F5] border-2 border-[#D4B996]/60 shadow-2xl flex flex-col my-auto text-[#2D2A26]">
        
        {/* Sticky Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between p-4 sm:p-6 border-b border-[#D4B996]/30 bg-[#FAF8F5]/95 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <span 
              className="w-3.5 h-3.5 rounded-full flex-shrink-0" 
              style={{ backgroundColor: project.accentColor || '#E07A5F' }} 
            />
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#8C7A6B]">
                {project.category} • {project.role}
              </span>
              <h2 className="font-serif italic font-bold text-lg sm:text-2xl text-[#2D2A26] leading-tight">
                {project.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {project.liveDemo && (
              <a
                href={project.liveDemo}
                target="_blank"
                rel="noreferrer"
                onClick={() => playClick()}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-mono font-medium transition-all shadow-xs"
                title="Launch Live Application"
              >
                <ExternalLink size={12} />
                <span>Live Website</span>
              </a>
            )}

            {project.presentation && (
              <a
                href={project.presentation}
                target="_blank"
                rel="noreferrer"
                onClick={() => playClick()}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#E07A5F] hover:bg-[#C86445] text-white text-xs font-mono font-bold transition-all shadow-xs"
                title="Open Seed Investment Pitch Deck (PPT)"
              >
                <Presentation size={12} />
                <span>PPT Deck</span>
              </a>
            )}

            {project.analyticsDoc && (
              <a
                href={project.analyticsDoc}
                target="_blank"
                rel="noreferrer"
                onClick={() => playClick()}
                className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#6B8572] hover:bg-[#546C5B] text-white text-xs font-mono font-medium transition-all shadow-xs"
                title="View Business Strategy & Financial Analytics"
              >
                <FileText size={12} />
                <span>Business Analytics</span>
              </a>
            )}

            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                onClick={() => playClick()}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-stone-100 text-stone-800 border border-[#D4B996]/50 text-xs font-mono font-medium transition-all shadow-xs"
                title="View Source Repository"
              >
                <Github size={13} />
                <span>Code</span>
              </a>
            )}

            <button
              onClick={() => {
                playClick();
                onClose();
              }}
              className="p-2 rounded-full bg-black/5 hover:bg-black/10 border border-[#D4B996]/40 transition-colors cursor-pointer text-[#5A564F]"
              title="Close (Esc)"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-4 sm:px-6 pt-3 pb-2 border-b border-[#D4B996]/30 flex gap-2 overflow-x-auto bg-[#F5EFE6]">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                playClick();
                setActiveTab(tab.id);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#2D2A26] text-white shadow-xs'
                  : 'text-[#8C7A6B] hover:text-[#2D2A26]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Modal Body Content */}
        <div className="p-4 sm:p-8 space-y-7 flex-1">
          
          {/* Quick Stats Pill Bar */}
          <div className="p-4 rounded-2xl bg-white/80 border border-[#D4B996]/40 flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-[10px] font-mono text-[#8C7A6B] uppercase font-semibold">Impact Metrics</div>
              <div className="font-sans font-bold text-sm sm:text-base text-[#2D2A26]">
                {project.stats}
              </div>
            </div>
            <div>
              <div className="text-[10px] font-mono text-[#8C7A6B] uppercase font-semibold">Assigned Role</div>
              <div className="font-mono text-xs font-semibold text-[#E07A5F]">
                {project.role}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <motion.button
                whileTap={{ scale: 0.93 }}
                whileHover={{ scale: 1.05 }}
                onClick={handleCheer}
                className="px-3.5 py-1.5 rounded-xl bg-[#588157] hover:bg-[#476e46] text-white font-sans font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                title="Cheer for this work!"
              >
                <Sparkles size={13} className="text-amber-200" />
                <span>Cheer Work 🎉</span>
                {cheerCount > 0 && (
                  <span className="bg-white/30 text-white font-mono text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                    {cheerCount}
                  </span>
                )}
              </motion.button>
            </div>
          </div>

          {/* TAB 1: HOW IT WORKS (WORKFLOW & STEPS) */}
          {activeTab === 'working' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#E07A5F]/15 text-[#E07A5F] text-[11px] font-mono font-semibold">
                  <Workflow size={13} />
                  <span>Operational Architecture</span>
                </div>
                <h3 className="font-serif italic font-bold text-xl sm:text-2xl text-[#2D2A26]">
                  How It Works &amp; Execution Pipeline
                </h3>
                <p className="font-sans text-[#5A564F] text-xs sm:text-sm leading-relaxed">
                  {project.workingOverview || project.caseStudy.overview}
                </p>
              </div>

              {/* Core Challenge & Shipped Solution Bento */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-6 sm:p-7 rounded-2xl bg-amber-50/95 border-2 border-amber-300/80 space-y-3 shadow-xs">
                  <span className="text-[11px] font-mono font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                    <span>⚠️ The Core Challenge</span>
                  </span>
                  <p className="font-sans text-amber-950 text-xs sm:text-sm leading-relaxed">
                    {project.caseStudy.problem}
                  </p>
                </div>
                <div className="p-6 sm:p-7 rounded-2xl bg-emerald-50/95 border-2 border-emerald-300/80 space-y-3 shadow-xs">
                  <span className="text-[11px] font-mono font-bold text-emerald-900 uppercase tracking-wider flex items-center gap-1.5">
                    <span>💡 Shipped Architectural Solution</span>
                  </span>
                  <p className="font-sans text-emerald-950 text-xs sm:text-sm leading-relaxed">
                    {project.caseStudy.solution}
                  </p>
                </div>
              </div>

              {/* Step-by-Step Execution Workflow */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between border-b border-[#D4B996]/30 pb-2">
                  <h4 className="font-sans font-bold text-sm sm:text-base text-[#2D2A26] flex items-center gap-2">
                    <Cpu size={16} className="text-[#E07A5F]" />
                    <span>End-to-End Operational Workflow</span>
                  </h4>
                  <span className="text-[11px] font-mono text-[#8C7A6B]">
                    {project.workingSteps?.length || 0} Synchronized Pipeline Stages
                  </span>
                </div>

                <div className="space-y-3.5">
                  {project.workingSteps?.map((item, idx) => (
                    <div 
                      key={idx}
                      className="p-4 sm:p-5 rounded-2xl bg-white/90 border border-[#D4B996]/40 shadow-xs hover:border-[#C4A882] transition-all space-y-2.5 relative overflow-hidden"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <span className="w-6 h-6 rounded-full bg-[#2D2A26] text-white text-[11px] font-mono font-bold flex items-center justify-center flex-shrink-0">
                            {item.step}
                          </span>
                          <h5 className="font-sans font-bold text-sm sm:text-base text-[#2D2A26]">
                            {item.title}
                          </h5>
                        </div>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[#8C7A6B] hidden sm:inline">
                          Stage 0{item.step}
                        </span>
                      </div>

                      <p className="font-sans text-xs sm:text-sm text-[#5A564F] leading-relaxed pl-8.5">
                        {item.description}
                      </p>

                      {item.technicalDetail && (
                        <div className="ml-8.5 p-2.5 rounded-xl bg-stone-50 border border-stone-200/80 text-[11px] font-mono text-stone-700 flex items-start gap-2">
                          <span className="text-[#E07A5F] font-bold">⚡ Under The Hood:</span>
                          <span>{item.technicalDetail}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DETAILED FEATURES */}
          {activeTab === 'features' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#E07A5F]/15 text-[#E07A5F] text-[11px] font-mono font-semibold">
                  <Sparkles size={13} />
                  <span>Feature Matrix</span>
                </div>
                <h3 className="font-serif italic font-bold text-xl sm:text-2xl text-[#2D2A26]">
                  Comprehensive Features &amp; Core Capabilities
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#5A564F]">
                  In-depth breakdown of modules, user capabilities, and internal workflows.
                </p>
              </div>

              {/* Detailed Feature Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.detailedFeatures?.map((feat, fIdx) => (
                  <div 
                    key={fIdx}
                    className="p-5 rounded-2xl bg-white/90 border border-[#D4B996]/40 shadow-xs flex flex-col justify-between space-y-3 hover:border-[#C4A882] transition-all"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-0.5 rounded-full bg-[#FAF0E6] text-[#C86445] text-[10px] font-mono font-semibold border border-[#D4B996]/30">
                          {feat.category}
                        </span>
                        <span className="text-[10px] font-mono text-[#8C7A6B]">Module 0{fIdx + 1}</span>
                      </div>

                      <h4 className="font-sans font-bold text-base text-[#2D2A26]">
                        {feat.title}
                      </h4>

                      <p className="font-sans text-xs text-[#5A564F] leading-relaxed">
                        {feat.description}
                      </p>
                    </div>

                    {feat.capabilities && feat.capabilities.length > 0 && (
                      <div className="pt-3 border-t border-stone-200/70 space-y-1.5">
                        <div className="text-[10px] font-mono uppercase text-[#8C7A6B] font-bold">
                          Included Capabilities:
                        </div>
                        {feat.capabilities.map((cap, cIdx) => (
                          <div key={cIdx} className="flex items-start gap-2 text-xs text-stone-700">
                            <Check size={13} className="text-emerald-600 mt-0.5 flex-shrink-0" />
                            <span>{cap}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Viewport UI Screen Highlights */}
              {project.screens && project.screens.length > 0 && (
                <div className="space-y-3 pt-3">
                  <h4 className="font-sans font-bold text-sm text-[#2D2A26] flex items-center gap-2">
                    <Laptop size={15} className="text-[#E07A5F]" />
                    <span>UI Viewports &amp; Screen Breakdowns</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {project.screens.map((scr, idx) => (
                      <div key={idx} className="p-3.5 rounded-xl bg-white/80 border border-[#D4B996]/30 space-y-1 shadow-2xs">
                        <div className="font-sans font-bold text-xs text-[#2D2A26]">{scr.name || scr.title}</div>
                        <div className="font-sans text-[11px] text-[#5A564F]">{scr.detail || scr.description}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: COMPLETE TECH STACK */}
          {activeTab === 'tech' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#E07A5F]/15 text-[#E07A5F] text-[11px] font-mono font-semibold">
                  <Layers size={13} />
                  <span>Stack Rigor</span>
                </div>
                <h3 className="font-serif italic font-bold text-xl sm:text-2xl text-[#2D2A26]">
                  Complete Tech Stack &amp; Architecture
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#5A564F]">
                  Engineered for high-concurrency throughput, modular data layers, and clean developer ergonomics.
                </p>
              </div>

              {/* 5-Pillar Architecture Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 1. Frontend */}
                <div className="p-5 sm:p-6 rounded-2xl bg-white/90 border border-[#D4B996]/40 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-800 uppercase tracking-wider">
                    <Laptop size={14} className="text-emerald-600" />
                    <span>Frontend Client &amp; UI</span>
                  </div>
                  <div className="font-mono text-xs font-bold text-[#2D2A26]">
                    {project.techStackDetailed?.frontend?.tech || project.caseStudy.techArchitecture.frontend}
                  </div>
                  <p className="font-sans text-xs text-[#5A564F] leading-relaxed">
                    {project.techStackDetailed?.frontend?.details || "Hardware accelerated responsive client layer."}
                  </p>
                </div>

                {/* 2. Backend */}
                <div className="p-5 sm:p-6 rounded-2xl bg-white/90 border border-[#D4B996]/40 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-800 uppercase tracking-wider">
                    <Server size={14} className="text-blue-600" />
                    <span>Backend &amp; REST Server</span>
                  </div>
                  <div className="font-mono text-xs font-bold text-[#2D2A26]">
                    {project.techStackDetailed?.backend?.tech || project.caseStudy.techArchitecture.backend}
                  </div>
                  <p className="font-sans text-xs text-[#5A564F] leading-relaxed">
                    {project.techStackDetailed?.backend?.details || "Asynchronous microservice managing data flows and routes."}
                  </p>
                </div>

                {/* 3. Database */}
                <div className="p-5 sm:p-6 rounded-2xl bg-white/90 border border-[#D4B996]/40 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-800 uppercase tracking-wider">
                    <Database size={14} className="text-amber-600" />
                    <span>Database &amp; Storage</span>
                  </div>
                  <div className="font-mono text-xs font-bold text-[#2D2A26]">
                    {project.techStackDetailed?.database?.tech || "Optimized Document / State Store"}
                  </div>
                  <p className="font-sans text-xs text-[#5A564F] leading-relaxed">
                    {project.techStackDetailed?.database?.details || "Persistent schema models with indexing and fast retrieval."}
                  </p>
                </div>

                {/* 4. AI / Special Engines */}
                <div className="p-5 sm:p-6 rounded-2xl bg-white/90 border border-[#D4B996]/40 shadow-xs space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-purple-800 uppercase tracking-wider">
                    <Cpu size={14} className="text-purple-600" />
                    <span>AI / Real-Time / Special Engines</span>
                  </div>
                  <div className="font-mono text-xs font-bold text-[#2D2A26]">
                    {project.techStackDetailed?.aimlOrEngine?.tech || project.caseStudy.techArchitecture.ai || "Real-Time Vector Engine"}
                  </div>
                  <p className="font-sans text-xs text-[#5A564F] leading-relaxed">
                    {project.techStackDetailed?.aimlOrEngine?.details || "Computational pipelines executing real-time algorithms."}
                  </p>
                </div>

                {/* 5. DevOps & Cloud */}
                <div className="p-5 sm:p-6 rounded-2xl bg-white/90 border border-[#D4B996]/40 shadow-xs space-y-2 md:col-span-2">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-rose-800 uppercase tracking-wider">
                    <Terminal size={14} className="text-rose-600" />
                    <span>DevOps, Hosting &amp; CI/CD Pipelines</span>
                  </div>
                  <div className="font-mono text-xs font-bold text-[#2D2A26]">
                    {project.techStackDetailed?.devopsDeployment?.tech || project.caseStudy.techArchitecture.deployment || "Cloud Container CI/CD"}
                  </div>
                  <p className="font-sans text-xs text-[#5A564F] leading-relaxed">
                    {project.techStackDetailed?.devopsDeployment?.details || "Automated container builds and zero-downtime deployment."}
                  </p>
                </div>
              </div>

              {/* Technologies & Libraries Badges */}
              <div className="space-y-2 pt-2">
                <div className="text-xs font-mono uppercase text-[#8C7A6B] font-bold">
                  Integrated Libraries, Frameworks &amp; Protocols:
                </div>
                <div className="flex flex-wrap gap-2">
                  {(project.techStackDetailed?.keyLibraries || project.tags).map((lib, lIdx) => (
                    <span key={lIdx} className="px-3 py-1 rounded-lg bg-white/90 border border-[#D4B996]/40 text-xs font-mono font-semibold text-[#2D2A26] shadow-2xs">
                      ✦ {lib}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: IMPACT & RESULTS */}
          {activeTab === 'results' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#E07A5F]/15 text-[#E07A5F] text-[11px] font-mono font-semibold">
                  <Target size={13} />
                  <span>Empirical Proof</span>
                </div>
                <h3 className="font-serif italic font-bold text-xl sm:text-2xl text-[#2D2A26]">
                  Impact, Quantitative Metrics &amp; Results
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#5A564F]">
                  Measurable latency benchmarks, operational outcomes, and deployed real-world achievements.
                </p>
              </div>

              {/* Quantitative Metrics Bento */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                {project.caseStudy.userResearch?.map((ur, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-white/90 border border-[#D4B996]/40 shadow-xs text-center space-y-1">
                    <div className="font-serif italic font-bold text-2xl sm:text-3xl text-[#E07A5F]">
                      {ur.metric}
                    </div>
                    <div className="font-mono text-xs text-[#5A564F]">
                      {ur.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Key Results & Milestones */}
              <div className="space-y-3 pt-2">
                <h4 className="font-sans font-bold text-sm text-[#2D2A26]">Key Shipped Deliverables:</h4>
                <div className="space-y-2">
                  {project.caseStudy.results?.map((res, i) => (
                    <div key={i} className="p-3.5 rounded-xl bg-white/90 border border-[#D4B996]/30 text-xs font-sans text-stone-700 flex items-start gap-2.5 shadow-2xs">
                      <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{res}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Direct Project Links */}
              <div className="p-5 sm:p-6 rounded-2xl bg-stone-100/90 border border-[#D4B996]/40 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="text-xs font-bold text-[#2D2A26]">Live Project, PPT & Analytics Links</div>
                  <div className="text-[11px] font-mono text-[#8C7A6B]">Explore live application, interactive pitch deck (PPT), and business analytics</div>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {project.liveDemo && (
                    <a
                      href={project.liveDemo}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => playClick()}
                      className="px-3.5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-mono font-medium flex items-center gap-1.5 transition-all shadow-xs"
                    >
                      <ExternalLink size={13} />
                      <span>Open Live Website</span>
                    </a>
                  )}
                  {project.presentation && (
                    <a
                      href={project.presentation}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => playClick()}
                      className="px-3.5 py-2 rounded-xl bg-[#E07A5F] hover:bg-[#C86445] text-white text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-xs"
                    >
                      <Presentation size={13} />
                      <span>Open PPT Pitch Deck</span>
                    </a>
                  )}
                  {project.analyticsDoc && (
                    <a
                      href={project.analyticsDoc}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => playClick()}
                      className="px-3.5 py-2 rounded-xl bg-[#6B8572] hover:bg-[#546C5B] text-white text-xs font-mono font-medium flex items-center gap-1.5 transition-all shadow-xs"
                    >
                      <FileText size={13} />
                      <span>Business Analytics & P&L</span>
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => playClick()}
                      className="px-3.5 py-2 rounded-xl bg-white hover:bg-stone-50 text-stone-800 border border-[#D4B996]/50 text-xs font-mono font-medium flex items-center gap-1.5 transition-all shadow-xs"
                    >
                      <Github size={13} />
                      <span>GitHub</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-6 border-t border-[#D4B996]/30 bg-[#F5EFE6] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-[#8C7A6B]">
              Want the full code or prototype?
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                playClick();
                onClose();
              }}
              className="px-4 py-2 rounded-xl border border-[#D4B996] text-xs font-mono font-semibold hover:bg-black/5 transition-colors cursor-pointer text-[#2D2A26]"
            >
              Close Study
            </button>
            <motion.button
              whileTap={{ scale: 0.93 }}
              whileHover={{ scale: 1.05 }}
              onClick={handleHighFive}
              className="px-5 py-2 rounded-xl bg-[#2D2A26] hover:bg-[#1A1816] text-white font-sans font-bold text-xs flex items-center gap-2 shadow-md transition-colors cursor-pointer"
              title="Give a High Five!"
            >
              <span>Give High-Five 🖐️</span>
              {highFiveCount > 0 && (
                <span className="bg-amber-400 text-amber-950 px-1.5 py-0.2 rounded-full text-[10px] font-mono font-bold">
                  +{highFiveCount}
                </span>
              )}
            </motion.button>
          </div>
        </div>

      </div>

    </div>
  );
};
