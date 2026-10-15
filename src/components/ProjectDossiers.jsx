import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowUpRight, Eye, Sparkles, FolderGit2, 
  Layers, ExternalLink, ChevronRight, CheckCircle2 
} from 'lucide-react';
import { projects, projectCategories } from '../data/portfolioData';
import { CaseStudyModal } from './CaseStudyModal';
import { playClick, playPop, playSticker } from '../utils/sound';

export const ProjectDossiers = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeCaseStudy, setActiveCaseStudy] = useState(null);
  const [activePullIndex, setActivePullIndex] = useState(0); // Which card is pulled out

  const filteredProjects = selectedCategory === "All"
    ? projects
    : projects.filter(p => p.category === selectedCategory || p.tags.includes(selectedCategory));

  const handleSelectCard = (index) => {
    playSticker();
    setActivePullIndex(index);
  };

  const handleOpenDossier = (project) => {
    playPop();
    setActiveCaseStudy(project);
  };

  const currentProject = filteredProjects[activePullIndex] || filteredProjects[0];

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-dots-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime-neon/30 border border-lime-neon/60 text-black dark:text-lime-neon text-xs font-mono font-bold uppercase tracking-wider mb-3">
              <span>✦ Project Dossiers & Pull-Out Sleeves</span>
            </div>
            <h2 className="font-syne font-black text-3xl sm:text-5xl text-black dark:text-white tracking-tight">
              Selected Works & Case Studies
            </h2>
          </div>

          <p className="font-sans text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-md">
            Click on any project tab to slide its dossier out of the archival sleeve.
          </p>
        </div>

        {/* Minimal Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {projectCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                playClick();
                setSelectedCategory(cat);
                setActivePullIndex(0);
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-mono font-bold transition-all border ${
                selectedCategory === cat
                  ? 'bg-black text-white dark:bg-lime-neon dark:text-black border-black shadow-sm'
                  : 'bg-white dark:bg-paper-cardDark text-slate-600 dark:text-slate-400 border-black/10 dark:border-white/10 hover:border-black/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Interactive Pull-Out Dossier Desk */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Project Tab Sleeves (Span 5) */}
          <div className="lg:col-span-5 space-y-3">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-2">
              // ARCHIVE SLEEVES (SELECT TO REMOVE CARD)
            </span>

            {filteredProjects.map((p, idx) => {
              const isSelected = activePullIndex === idx;

              return (
                <motion.div
                  key={p.id}
                  whileHover={{ x: 6 }}
                  onClick={() => handleSelectCard(idx)}
                  className={`p-4 sm:p-5 rounded-2xl cursor-pointer border-2 transition-all relative overflow-hidden select-none ${
                    isSelected
                      ? 'bg-white dark:bg-paper-cardDark border-black dark:border-white shadow-neo translate-x-2'
                      : 'bg-white/60 dark:bg-paper-cardDark/60 border-black/10 dark:border-white/10 hover:border-black/30'
                  }`}
                >
                  {/* File Tab Indicator */}
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400 font-bold">
                      FOLDER #{String(idx + 1).padStart(2, '0')}
                    </span>
                    <span 
                      className="w-2.5 h-2.5 rounded-full" 
                      style={{ backgroundColor: p.accentColor }} 
                    />
                  </div>

                  <h3 className="font-syne font-bold text-base sm:text-lg text-black dark:text-white">
                    {p.title}
                  </h3>

                  <p className="font-sans text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">
                    {p.tagline}
                  </p>

                  {/* Active Slide Tab Edge */}
                  {isSelected && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono font-bold text-brand-orange flex items-center gap-1">
                      <span>SLID OUT</span>
                      <ChevronRight size={14} />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Right Column: The Pulled Out Card (Photo Frame & Dossier) (Span 7) */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {currentProject && (
                <motion.div
                  key={currentProject.id}
                  initial={{ opacity: 0, y: 30, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.96 }}
                  transition={{ type: "spring", stiffness: 280, damping: 22 }}
                  className="rounded-3xl bg-white dark:bg-paper-cardDark border-2 border-black dark:border-white/20 shadow-2xl p-6 sm:p-8 relative overflow-hidden space-y-6"
                >
                  
                  {/* Washi Tape on Top of Card */}
                  <div className="absolute -top-3 left-10 w-28 h-6 bg-lime-neon/80 border border-black shadow-sm rotate-[-2deg] flex items-center justify-center pointer-events-none">
                    <span className="text-[9px] font-mono font-black text-black uppercase tracking-wider">
                      CASE FILE ARCHIVE
                    </span>
                  </div>

                  {/* Top Card Meta */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                    <div>
                      <span className="text-xs font-mono uppercase tracking-widest text-brand-orange font-bold">
                        {currentProject.category}
                      </span>
                      <h2 className="font-syne font-black text-2xl sm:text-3xl text-black dark:text-white mt-0.5">
                        {currentProject.title}
                      </h2>
                    </div>

                    <span className="stamp px-2.5 py-1 text-xs text-brand-purple border-brand-purple">
                      {currentProject.role.split('&')[0]}
                    </span>
                  </div>

                  {/* Photo Frame / Preview Canvas */}
                  <div className="polaroid rounded-2xl border border-black/10 dark:border-white/10 p-4 space-y-3">
                    <div className="aspect-[16/9] rounded-xl bg-slate-950 p-4 flex flex-col justify-between text-white relative overflow-hidden border border-white/10 shadow-inner">
                      
                      {/* Fake browser bar */}
                      <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 border-b border-white/10 pb-2">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-rose-500" />
                          <span className="w-2 h-2 rounded-full bg-amber-500" />
                          <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        </div>
                        <span className="text-lime-neon font-bold">{currentProject.id}.sakshikore.dev</span>
                        <span>PROD v2.4</span>
                      </div>

                      {/* Photo Content */}
                      <div className="my-auto text-center space-y-2 py-4">
                        <span className="text-4xl animate-bounce">
                          {currentProject.category.includes("AI") ? "✨" : currentProject.category.includes("Design") ? "🎨" : "⚡"}
                        </span>
                        <div className="font-syne font-bold text-lg text-white">
                          {currentProject.stats}
                        </div>
                        <p className="font-sans text-xs text-slate-300 max-w-sm mx-auto">
                          {currentProject.tagline}
                        </p>
                      </div>

                      <div className="text-[10px] font-mono text-slate-400 flex justify-between border-t border-white/10 pt-1">
                        <span>Role: {currentProject.role}</span>
                        <span className="text-lime-neon font-bold">Live Prototype Available</span>
                      </div>

                    </div>

                    <div className="text-center">
                      <span className="font-caveat text-xl text-slate-700 dark:text-slate-300">
                        “Click below to inspect the full design system, wireframes, and architecture.”
                      </span>
                    </div>
                  </div>

                  {/* Description & Impact */}
                  <p className="font-sans text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {currentProject.summary}
                  </p>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {currentProject.tags.map((t, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-mono text-slate-700 dark:text-slate-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Open Full Case Study Button */}
                  <div className="pt-4 border-t border-black/10 dark:border-white/10 flex items-center justify-between gap-3">
                    <button
                      onClick={() => handleOpenDossier(currentProject)}
                      className="flex-1 py-3.5 px-6 rounded-2xl bg-black dark:bg-lime-neon text-white dark:text-black font-syne font-bold text-sm shadow-neo hover:translate-x-0.5 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                    >
                      <Eye size={16} />
                      <span>Open Case Study Dossier (Full Study)</span>
                    </button>
                  </div>

                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>

      {/* Case Study Modal */}
      {activeCaseStudy && (
        <CaseStudyModal
          project={activeCaseStudy}
          onClose={() => setActiveCaseStudy(null)}
        />
      )}

    </section>
  );
};
