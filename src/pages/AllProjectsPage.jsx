import React, { useState } from 'react';
import { ArrowLeft, ArrowUpRight, Eye, Sparkles, BookOpen, TrendingUp, Code, Lightbulb } from 'lucide-react';
import { allProjectsArchive } from '../data/portfolioData';
import { CaseStudyModal } from '../components/CaseStudyModal';
import { playClick, playPop } from '../utils/sound';

export const AllProjectsPage = ({ onBackToHome }) => {
  const [selectedCaseStudy, setSelectedCaseStudy] = useState(null);

  const handleOpenStudy = (id) => {
    playPop();
    // Search across all domains for the project
    const all = [
      ...allProjectsArchive.aiml,
      ...allProjectsArchive.uiux,
      ...allProjectsArchive.research,
      ...allProjectsArchive.business
    ];
    const match = all.find(p => p.id === id);
    if (match) setSelectedCaseStudy(match);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#2D2A26] font-sans transition-colors duration-300">
      
      {/* Sticky Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#FAF8F5]/85 backdrop-blur-md border-b border-[#D4B996]/30 py-3.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          <button
            onClick={() => {
              playClick();
              onBackToHome();
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 hover:bg-[#2D2A26] hover:text-white text-[#2D2A26] text-xs font-mono font-medium transition-all shadow-xs border border-[#D4B996]/40 cursor-pointer"
          >
            <ArrowLeft size={14} />
            <span>Back to Studio Window</span>
          </button>

          {/* Quick Jump Links */}
          <nav className="hidden md:flex items-center gap-2 text-xs font-mono">
            <a href="#aiml-section" className="px-3 py-1 rounded-full hover:bg-black/5 text-[#8A3B25]">
              # AIML Systems
            </a>
            <a href="#uiux-section" className="px-3 py-1 rounded-full hover:bg-black/5 text-[#E07A5F]">
              # UI/UX Case Studies
            </a>
            <a href="#research-section" className="px-3 py-1 rounded-full hover:bg-black/5 text-[#2D6A4F]">
              # Research Papers
            </a>
            <a href="#business-section" className="px-3 py-1 rounded-full hover:bg-black/5 text-[#D97706]">
              # Business Strategy
            </a>
          </nav>

          <span className="text-xs font-mono text-[#8C7A6B]">
            Sakshi Kore • Full Archive
          </span>

        </div>
      </header>

      {/* Main Page Hero Banner */}
      <section className="py-20 px-4 sm:px-8 max-w-5xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E07A5F]/15 text-xs font-mono text-[#E07A5F]">
          <span>✦ Comprehensive Artifact Repository</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-light tracking-tight text-[#2D2A26]">
          Complete <span className="font-serif italic text-[#E07A5F]">Project</span> & <span className="font-serif italic text-[#81B29A]">Research</span> Archives
        </h1>
        <p className="text-sm sm:text-base font-light text-[#5A564F] max-w-2xl mx-auto">
          Explore all projects grouped by domain. Click on any card to launch its in-depth pop-up dossier with architecture diagrams, user research, and metrics.
        </p>
      </section>

      {/* ========================================================
          SECTION 1: AIML PROJECTS & LLM SYSTEMS (COSMIC VIOLET THEME)
          ======================================================== */}
      <section id="aiml-section" className="py-20 px-4 sm:px-8 bg-gradient-to-b from-[#FAF5FF] via-[#F3E8FF] to-[#FAF8F5] text-[#2D2A26] border-y border-[#D4B996]/30 relative overflow-hidden">
        
        {/* Glow and dots */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#B388FF]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto space-y-10 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#D4B996]/30 pb-6">
            <div>
              <span className="text-xs font-mono text-[#6B21A8] uppercase tracking-widest font-bold">
                DOMAIN 01 • INTELLIGENCE & LLM PIPELINES
              </span>
              <h2 className="text-3xl sm:text-4xl font-light tracking-tight mt-1 text-[#2D2A26]">
                AI & Machine Learning Systems
              </h2>
            </div>
            <span className="text-xs font-mono text-[#8C7A6B]">
              {allProjectsArchive.aiml.length} Production Artifacts
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {allProjectsArchive.aiml.map((proj) => (
              <div
                key={proj.id}
                className="p-6 rounded-3xl bg-white/90 border border-[#D4B996]/40 hover:border-[#B388FF] transition-all flex flex-col justify-between space-y-6 shadow-xs"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#B388FF]/15 text-[#6B21A8] border border-[#B388FF]/30">
                      {proj.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold text-[#2D2A26]">
                    {proj.title}
                  </h3>

                  <p className="text-xs sm:text-sm font-light text-[#5A564F] leading-relaxed">
                    {proj.summary}
                  </p>
                </div>

                <div className="space-y-4 pt-4 border-t border-[#D4B996]/20">
                  <div className="text-xs font-mono text-emerald-700">
                    ✦ {proj.impact}
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {proj.tags.map((t, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-black/5 text-[10px] font-mono text-[#5A564F]">
                        {t}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => handleOpenStudy(proj.id)}
                    className="w-full py-2.5 rounded-full bg-[#EAE6FB] hover:bg-[#2D2A26] hover:text-white text-[#2D2A26] text-xs font-mono font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Eye size={13} />
                    <span>Open Project Pop-Up Dossier</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 2: UI/UX DESIGN CASE STUDIES (PEACH & CORAL THEME)
          ======================================================== */}
      <section id="uiux-section" className="py-20 px-4 sm:px-8 bg-gradient-to-b from-[#FFF5F2] to-[#FAF8F5] border-b border-[#D4B996]/30 relative overflow-hidden">
        
        <div className="max-w-6xl mx-auto space-y-10 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#D4B996]/30 pb-6">
            <div>
              <span className="text-xs font-mono text-[#E07A5F] uppercase tracking-widest font-bold">
                DOMAIN 02 • USER EXPERIENCE & DESIGN SYSTEMS
              </span>
              <h2 className="text-3xl sm:text-4xl font-light tracking-tight mt-1 text-[#2D2A26]">
                UI/UX Case Studies & Design Systems
              </h2>
            </div>
            <span className="text-xs font-mono text-[#8C7A6B]">
              {allProjectsArchive.uiux.length} Featured Case Studies
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {allProjectsArchive.uiux.map((proj) => (
              <div
                key={proj.id}
                className="p-6 rounded-3xl bg-white/90 border border-[#D4B996]/40 hover:border-[#E07A5F] transition-all flex flex-col justify-between space-y-6 shadow-xs"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#E07A5F]/15 text-[#E07A5F] border border-[#E07A5F]/30">
                      {proj.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold text-[#2D2A26]">
                    {proj.title}
                  </h3>

                  <p className="text-xs sm:text-sm font-light text-[#5A564F] leading-relaxed">
                    {proj.summary}
                  </p>
                </div>

                <div className="space-y-4 pt-4 border-t border-[#D4B996]/20">
                  <div className="text-xs font-mono text-[#E07A5F] font-medium">
                    ✦ {proj.impact}
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {proj.tags.map((t, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-black/5 text-[10px] font-mono text-[#5A564F]">
                        {t}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => handleOpenStudy(proj.id)}
                    className="w-full py-2.5 rounded-full bg-[#FCE3D8] hover:bg-[#2D2A26] hover:text-white text-[#2D2A26] text-xs font-mono font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Eye size={13} />
                    <span>Open Project Pop-Up Dossier</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 3: RESEARCH PAPERS & TECHNICAL PUBLICATIONS (MINT TEAL THEME)
          ======================================================== */}
      <section id="research-section" className="py-20 px-4 sm:px-8 bg-gradient-to-b from-[#F0FDF4] to-[#FAF8F5] border-b border-[#D4B996]/30 relative overflow-hidden">
        
        <div className="max-w-6xl mx-auto space-y-10 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#D4B996]/30 pb-6">
            <div>
              <span className="text-xs font-mono text-[#2D6A4F] uppercase tracking-widest font-bold">
                DOMAIN 03 • ACADEMIC & TECHNICAL RESEARCH
              </span>
              <h2 className="text-3xl sm:text-4xl font-light tracking-tight mt-1 text-[#2D2A26]">
                Research Papers & Publications
              </h2>
            </div>
            <span className="text-xs font-mono text-[#8C7A6B]">
              {allProjectsArchive.research.length} Published Reports
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {allProjectsArchive.research.map((paper) => (
              <div
                key={paper.id}
                className="p-7 rounded-3xl bg-white/90 border border-[#D4B996]/40 hover:border-[#81B29A] transition-all flex flex-col justify-between space-y-6 shadow-xs"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#81B29A]/15 text-[#2D6A4F] border border-[#81B29A]/30">
                      {paper.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold text-[#2D2A26] leading-snug">
                    {paper.title}
                  </h3>

                  <p className="text-xs sm:text-sm font-light text-[#5A564F] leading-relaxed">
                    {paper.summary}
                  </p>
                </div>

                <div className="space-y-4 pt-4 border-t border-[#D4B996]/20">
                  <div className="text-xs font-mono text-[#2D6A4F] font-medium">
                    ✦ {paper.impact}
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {paper.tags.map((t, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-black/5 text-[10px] font-mono text-[#5A564F]">
                        {t}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => handleOpenStudy(paper.id)}
                    className="w-full py-2.5 rounded-full bg-[#DEF2E6] hover:bg-[#2D2A26] hover:text-white text-[#2D2A26] text-xs font-mono font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <BookOpen size={13} />
                    <span>Read Paper Executive Summary</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 4: BUSINESS STRATEGY & PLG GROWTH (SUNSHINE AMBER THEME)
          ======================================================== */}
      <section id="business-section" className="py-20 px-4 sm:px-8 bg-gradient-to-b from-[#FFFBEB] to-[#FAF8F5] border-b border-[#D4B996]/30 relative overflow-hidden">
        
        <div className="max-w-6xl mx-auto space-y-10 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#D4B996]/30 pb-6">
            <div>
              <span className="text-xs font-mono text-[#D97706] uppercase tracking-widest font-bold">
                DOMAIN 04 • PRODUCT STRATEGY & COMMUNITY LEADERSHIP
              </span>
              <h2 className="text-3xl sm:text-4xl font-light tracking-tight mt-1 text-[#2D2A26]">
                Business & Product Development
              </h2>
            </div>
            <span className="text-xs font-mono text-[#8C7A6B]">
              {allProjectsArchive.business.length} Growth Initiatives
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {allProjectsArchive.business.map((biz) => (
              <div
                key={biz.id}
                className="p-7 rounded-3xl bg-white/90 border border-[#D4B996]/40 hover:border-[#F4A261] transition-all flex flex-col justify-between space-y-6 shadow-xs"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300">
                      {biz.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold text-[#2D2A26] leading-snug">
                    {biz.title}
                  </h3>

                  <p className="text-xs sm:text-sm font-light text-[#5A564F] leading-relaxed">
                    {biz.summary}
                  </p>
                </div>

                <div className="space-y-4 pt-4 border-t border-[#D4B996]/20">
                  <div className="text-xs font-mono text-amber-700 font-medium">
                    ✦ {biz.impact}
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {biz.tags.map((t, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-black/5 text-[10px] font-mono text-[#5A564F]">
                        {t}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => handleOpenStudy(biz.id)}
                    className="w-full py-2.5 rounded-full bg-[#FFF0D4] hover:bg-[#2D2A26] hover:text-white text-[#2D2A26] text-xs font-mono font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <TrendingUp size={13} />
                    <span>View Growth & Strategy Case Study</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Footer Call to Action */}
      <footer className="py-16 text-center space-y-4">
        <button
          onClick={() => {
            playClick();
            onBackToHome();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="px-6 py-3 rounded-full bg-[#2D2A26] text-white font-mono text-xs font-bold hover:scale-105 transition-transform cursor-pointer"
        >
          ← Return to Main Portfolio Home
        </button>
        <p className="text-xs font-mono text-[#8C7A6B]">
          Sakshi Kore • Handcrafted with lots of Chai in Mumbai, India ☕
        </p>
      </footer>

      {/* Individual Project Pop-Up Modal */}
      {selectedCaseStudy && (
        <CaseStudyModal
          project={selectedCaseStudy}
          onClose={() => setSelectedCaseStudy(null)}
        />
      )}

    </div>
  );
};
