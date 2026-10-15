import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowUpRight, Eye, ChevronLeft, ChevronRight, 
  Sparkles, ExternalLink, Github, Laptop, Smartphone
} from 'lucide-react';
import { featuredProjects, projects } from '../data/portfolioData';
import { CaseStudyModal } from './CaseStudyModal';
import { playClick, playPop } from '../utils/sound';

export const ProjectsCurated = () => {
  const [selectedCaseStudy, setSelectedCaseStudy] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const scrollContainerRef = useRef(null);

  const handleOpenCaseStudy = (projId) => {
    playPop();
    const fullProject = projects.find(p => p.id === projId) || featuredProjects.find(p => p.id === projId) || featuredProjects[0];
    setSelectedCaseStudy(fullProject);
  };

  const nudgeScroll = (direction) => {
    playClick();
    if (!scrollContainerRef.current) return;
    scrollContainerRef.current.scrollBy({
      left: direction === 'left' ? -384 : 384,
      behavior: 'smooth'
    });
  };

  return (
    <section id="projects" className="py-16 sm:py-20 relative overflow-hidden bg-transparent">
      {/* Embedded GPU-Accelerated Infinite Marquee Keyframes */}
      <style>{`
        @keyframes continuousProjectGlide {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
        .projects-glide-track {
          display: flex;
          gap: 1.5rem;
          width: max-content;
          will-change: transform;
          animation: continuousProjectGlide 36s linear infinite;
        }
        .projects-glide-track:hover,
        .projects-glide-track.is-paused {
          animation-play-state: paused !important;
        }
      `}</style>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5 sm:space-y-6">
        
        {/* Section Header (Centered like all other sections) */}
        <div className="text-center max-w-xl mx-auto space-y-2.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E07A5F]/15 text-[#E07A5F] text-xs font-mono font-medium transition-colors">
            <Sparkles size={13} />
            <span>{isPaused ? '⏸ Paused (Exploring Project)' : '▶ Auto-Moving • Hover to Pause'}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-[#2D2A26]">
            Featured <span className="font-serif italic text-[#E07A5F]">Projects</span>
          </h2>
          <p className="text-xs sm:text-sm font-light text-[#5A564F]">
            Projects continuously glide horizontally. Hover over any card to freeze and explore details.
          </p>

          {/* Carousel Navigation Arrow Controls (Centered, Clean Prev/Next) */}
          <div className="flex items-center justify-center gap-3 pt-1">
            <button
              onClick={() => nudgeScroll('left')}
              aria-label="Previous project"
              className="w-9 h-9 rounded-full bg-white/90 hover:bg-[#2D2A26] text-[#2D2A26] hover:text-white border border-[#D4B996]/60 backdrop-blur-md flex items-center justify-center transition-all shadow-xs cursor-pointer active:scale-95"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => nudgeScroll('right')}
              aria-label="Next project"
              className="w-9 h-9 rounded-full bg-white/90 hover:bg-[#2D2A26] text-[#2D2A26] hover:text-white border border-[#D4B996]/60 backdrop-blur-md flex items-center justify-center transition-all shadow-xs cursor-pointer active:scale-95"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* ========================================================
            PROJECTS CONTINUOUS HORIZONTAL GLIDE CAROUSEL
        ======================================================== */}
        <div 
          ref={scrollContainerRef}
          className="relative overflow-x-hidden w-full py-2"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setTimeout(() => setIsPaused(false), 2000)}
        >
          {/* Edge Blur Gradients */}
          <div className="absolute left-0 inset-y-0 w-8 sm:w-12 bg-gradient-to-r from-[#FAF8F5] to-transparent pointer-events-none z-20 hidden md:block" />
          <div className="absolute right-0 inset-y-0 w-8 sm:w-12 bg-gradient-to-l from-[#FAF8F5] to-transparent pointer-events-none z-20 hidden md:block" />

          {/* Continuous Moving Track */}
          <div className={`projects-glide-track ${isPaused ? 'is-paused' : ''}`}>
            {[...featuredProjects, ...featuredProjects].map((project, pIdx) => (
              <div
                key={`${project.id}-${pIdx}`}
                className="shrink-0 w-[305px] sm:w-[360px] min-h-[430px] sm:min-h-[455px] flex flex-col group select-none"
              >
                {/* Studio Canvas Card */}
                <div
                  className="rounded-2xl bg-white/95 backdrop-blur-md border border-[#D4B996]/50 shadow-md group-hover:shadow-xl group-hover:border-[#C4A882] group-hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between relative overflow-hidden flex-1 z-10"
                >
                  {/* Specular sheen line */}
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/90 to-transparent pointer-events-none z-20" />

                  {/* 1. BANNER MOCKUP (LAPTOP + MOBILE SCREEN UI) */}
                  <div 
                    className="relative w-full h-42 sm:h-48 bg-stone-900 overflow-hidden group/banner cursor-pointer" 
                    onClick={() => handleOpenCaseStudy(project.id)}
                  >
                    <img 
                      src={project.bannerImage} 
                      alt={`${project.title} Mockup`}
                      className="w-full h-full object-cover object-top group-hover/banner:scale-105 transition-transform duration-500"
                    />

                    {/* Category Badge (Simple clean font, smaller size, spaced out) */}
                    <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md shadow-xs border border-[#D4B996]/50 font-mono font-medium text-[9.5px] sm:text-[10px] uppercase tracking-wider text-[#2D2A26] pointer-events-none">
                      <span>{project.category}</span>
                    </div>

                    {/* Quick Live Link / Action Icon */}
                    {project.liveDemo && (
                      <a 
                        href={project.liveDemo}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => {
                          e.stopPropagation();
                          playClick();
                        }}
                        className="absolute top-2.5 right-2.5 w-7.5 h-7.5 rounded-full bg-white/90 hover:bg-white text-stone-900 shadow-md flex items-center justify-center transition-all hover:scale-110 z-20 cursor-pointer"
                        title="Open Live App"
                      >
                        <ExternalLink size={13} />
                      </a>
                    )}
                  </div>

                  {/* 2. CARD CONTENT BODY (SPACED OUT & NEATLY STRUCTURED) */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                    
                    {/* Header (No redundant category badge, No year) */}
                    <div className="space-y-1">
                      <h3 className="text-base sm:text-lg font-semibold text-[#2D2A26] group-hover:text-[#E07A5F] transition-colors leading-snug line-clamp-1">
                        {project.title}
                      </h3>

                      <p className="text-xs sm:text-[13px] font-light text-[#5A564F] leading-relaxed line-clamp-2">
                        {project.tagline}
                      </p>
                    </div>

                    {/* Compact Metric Strip (Equidistant between above text and below buttons) */}
                    <div className="my-auto py-2.5">
                      <div className="px-3.5 py-1.5 rounded-xl bg-stone-50 border border-[#D4B996]/30 flex items-center justify-between text-xs">
                        <span className="text-[10px] font-mono text-[#8C7A6B] uppercase tracking-wider font-semibold">Impact</span>
                        <span className="font-handwriting font-normal text-[10.5px] sm:text-[11.5px] text-[#3D3A36] truncate max-w-[75%] text-right">
                          ★ {project.highlight}
                        </span>
                      </div>
                    </div>

                    {/* Action Triggers (Spaced out & Clean) */}
                    <div className="pt-2.5 border-t border-[#D4B996]/20 flex items-center gap-2">
                      <button
                        onClick={() => handleOpenCaseStudy(project.id)}
                        className="flex-1 py-2.5 rounded-full bg-stone-900 hover:bg-stone-800 text-white text-xs font-mono font-medium transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs hover:scale-[1.02]"
                      >
                        <Eye size={13} />
                        <span>Inspect Case Study</span>
                      </button>

                      {project.liveDemo && (
                        <a
                          href={project.liveDemo}
                          target="_blank"
                          rel="noreferrer"
                          onClick={() => playClick()}
                          className="px-3.5 py-2.5 rounded-full bg-white hover:bg-stone-50 text-stone-800 border border-[#D4B996]/50 text-xs font-mono font-medium transition-all flex items-center justify-center gap-1 shadow-xs hover:scale-[1.02]"
                          title="Open Live Demo"
                        >
                          <ExternalLink size={13} />
                          <span className="hidden sm:inline">Live</span>
                        </a>
                      )}

                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noreferrer"
                          onClick={() => playClick()}
                          className="p-2.5 rounded-full bg-white hover:bg-stone-50 text-stone-800 border border-[#D4B996]/50 text-xs transition-all flex items-center justify-center shadow-xs hover:scale-[1.02]"
                          title="View GitHub Repository"
                        >
                          <Github size={14} />
                        </a>
                      )}
                    </div>

                  </div>

                </div>

                {/* Scandinavian Wooden Easel Legs Beneath Card */}
                <div className="flex justify-between px-8 -mt-1.5 relative z-0 pointer-events-none">
                  <div className="w-2 h-3.5 bg-gradient-to-b from-[#E2D2B8] to-[#CBB89D] rounded-b-xs border-x border-[#B59E8D] shadow-xs transform -rotate-6" />
                  <div className="w-2 h-3.5 bg-gradient-to-b from-[#E2D2B8] to-[#CBB89D] rounded-b-xs border-x border-[#B59E8D] shadow-xs transform rotate-6" />
                </div>
              </div>
            ))}
          </div>
        </div>


      </div>

      {/* Case Study Modal */}
      {selectedCaseStudy && (
        <CaseStudyModal
          project={selectedCaseStudy}
          onClose={() => setSelectedCaseStudy(null)}
        />
      )}

    </section>
  );
};

export default ProjectsCurated;
