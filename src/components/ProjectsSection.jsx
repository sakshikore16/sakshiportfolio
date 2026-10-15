import React, { useState } from 'react';
import { 
  ArrowUpRight, Sparkles, Layers, Terminal, ExternalLink, 
  Eye, CheckCircle, Code2, Palette, Cpu, Heart
} from 'lucide-react';
import { projects, projectCategories } from '../data/portfolioData';
import { CaseStudyModal } from './CaseStudyModal';
import { playClick, playPop } from '../utils/sound';

export const ProjectsSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeCaseStudy, setActiveCaseStudy] = useState(null);

  const filteredProjects = selectedCategory === "All"
    ? projects
    : projects.filter(p => p.category === selectedCategory || p.tags.includes(selectedCategory));

  const handleCategoryChange = (cat) => {
    playClick();
    setSelectedCategory(cat);
  };

  const handleOpenCaseStudy = (project) => {
    playPop();
    setActiveCaseStudy(project);
  };

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-paper-light dark:bg-paper-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading & Category Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime-neon/20 border border-lime-neon/40 text-black dark:text-lime-neon text-xs font-mono font-bold uppercase tracking-wider mb-3">
              <span>✦ Featured Works & Case Studies</span>
            </div>
            <h2 className="font-syne font-extrabold text-3xl sm:text-5xl text-black dark:text-white tracking-tight">
              Crafted with Purpose, <br />
              <span className="text-lime-neon bg-black dark:bg-lime-neon dark:text-black px-2 py-0.5 rounded-lg inline-block my-1">
                Engineered with Precision.
              </span>
            </h2>
          </div>

          <p className="font-sans text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-md">
            Click on any project to explore the deep-dive UX research, design systems, and code architecture behind it.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-2">
          {projectCategories.map((category) => {
            const count = category === "All" 
              ? projects.length 
              : projects.filter(p => p.category === category || p.tags.includes(category)).length;

            return (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-syne font-bold transition-all duration-200 border-2 ${
                  selectedCategory === category
                    ? 'bg-black text-white dark:bg-lime-neon dark:text-black border-black shadow-neo-sm translate-y-[-1px]'
                    : 'bg-white dark:bg-paper-cardDark text-slate-700 dark:text-slate-300 border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30'
                }`}
              >
                <span>{category}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                  selectedCategory === category
                    ? 'bg-white/20 dark:bg-black/20 text-current'
                    : 'bg-black/5 dark:bg-white/10 text-slate-500'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, idx) => (
            <div
              key={project.id}
              className="group relative rounded-3xl bg-white dark:bg-paper-cardDark border-2 border-black dark:border-white/15 shadow-neo hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              
              {/* Card Top: Visual Mockup Container */}
              <div className="relative p-5 bg-slate-100 dark:bg-slate-900 border-b-2 border-black dark:border-white/10 overflow-hidden">
                
                {/* Washi Tape Corner on Featured */}
                {project.featured && (
                  <div className="absolute top-2 right-2 px-2.5 py-0.5 rounded bg-lime-neon text-black font-mono text-[10px] font-black uppercase tracking-wider border border-black shadow-sm z-10">
                    FEATURED ✦
                  </div>
                )}

                {/* Simulated Product UI Mockup */}
                <div className="aspect-[16/10] rounded-xl overflow-hidden bg-slate-950 border border-white/10 p-3 flex flex-col justify-between text-white relative shadow-inner group-hover:scale-[1.02] transition-transform duration-300">
                  
                  {/* Fake Browser / App Chrome */}
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    </div>
                    <div className="px-2 py-0.5 rounded bg-white/10 text-[9px] font-mono text-slate-300 truncate max-w-[140px]">
                      {project.id}.sakshikore.dev
                    </div>
                    <div className="text-[10px] font-mono text-lime-neon">
                      v1.2
                    </div>
                  </div>

                  {/* Dynamic Mockup Body per Project */}
                  <div className="my-auto py-2">
                    {project.previewType === 'app-dashboard' && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-mono text-slate-400">Emotional Balance:</span>
                          <span className="text-lime-neon font-bold">Optimal (94%)</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                          <div className="h-full bg-lime-neon w-4/5 rounded-full animate-pulse" />
                        </div>
                        <div className="flex gap-2 pt-1">
                          <div className="flex-1 p-1.5 rounded bg-white/5 border border-white/10 text-[10px] text-center font-mono">
                            🫁 4-7-8 Breathing
                          </div>
                          <div className="flex-1 p-1.5 rounded bg-white/5 border border-white/10 text-[10px] text-center font-mono">
                            💭 Cognitive Reframe
                          </div>
                        </div>
                      </div>
                    )}

                    {project.previewType === 'component-system' && (
                      <div className="space-y-2">
                        <div className="text-[10px] font-mono text-brand-orange uppercase">
                          // KINETIX TOKENS PREVIEW
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          <span className="px-2 py-1 rounded bg-brand-orange text-white text-[10px] font-bold shadow-neo-sm">
                            Button (Active)
                          </span>
                          <span className="px-2 py-1 rounded bg-lime-neon text-black text-[10px] font-bold">
                            Badge (Tactile)
                          </span>
                          <span className="px-2 py-1 rounded bg-purple-500 text-white text-[10px] font-bold">
                            Spring Modal
                          </span>
                        </div>
                      </div>
                    )}

                    {project.previewType === 'code-doc' && (
                      <div className="space-y-1 text-[11px] font-mono">
                        <div className="text-emerald-400">$ parse_ast --target src/api</div>
                        <div className="text-slate-400">✓ Parsed 42 modules</div>
                        <div className="text-cyan-400">→ Generated Mermaid architecture graph</div>
                        <div className="text-slate-500">→ Gemini context token count: 1,420</div>
                      </div>
                    )}

                    {project.previewType === 'mobile-screens' && (
                      <div className="flex items-center justify-around py-1">
                        <div className="w-16 h-20 rounded-lg bg-slate-800 border border-white/20 p-1 flex flex-col justify-between text-[8px] text-center">
                          <span className="text-cyan-400 font-bold">Goa Co-Live</span>
                          <span>📶 240 Mbps</span>
                          <span className="bg-cyan-500 text-black rounded py-0.5">Book</span>
                        </div>
                        <div className="w-16 h-20 rounded-lg bg-slate-800 border border-white/20 p-1 flex flex-col justify-between text-[8px] text-center">
                          <span className="text-amber-400 font-bold">Desk Pass</span>
                          <span>🪑 Ergo Chair</span>
                          <span className="bg-amber-400 text-black rounded py-0.5">Check</span>
                        </div>
                      </div>
                    )}

                    {project.previewType === 'canvas-app' && (
                      <div className="relative h-16 rounded bg-slate-900 border border-white/10 p-2 overflow-hidden flex items-center justify-center">
                        <div className="px-2 py-1 rounded bg-yellow-200 text-black text-[10px] font-caveat font-bold rotate-[-4deg] shadow">
                          💡 Redesign Checkout Flow!
                        </div>
                        <div className="absolute bottom-1 right-2 px-1.5 py-0.5 rounded-full bg-pink-500 text-white text-[8px] font-mono">
                          sakshi's cursor
                        </div>
                      </div>
                    )}

                    {project.previewType === 'shader-lab' && (
                      <div className="h-16 rounded bg-gradient-to-r from-lime-neon via-brand-purple to-brand-coral flex items-center justify-center">
                        <span className="px-2.5 py-1 rounded-full bg-black/60 text-white text-[10px] font-mono font-bold backdrop-blur-sm">
                          ✨ WebGL 60FPS Fluid
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Bottom Mockup Metric */}
                  <div className="text-[10px] font-mono text-slate-400 flex items-center justify-between pt-1 border-t border-white/10">
                    <span className="text-lime-neon font-bold">{project.stats.split('•')[0]}</span>
                    <span>Role: {project.role.split('&')[0]}</span>
                  </div>

                </div>

              </div>

              {/* Card Bottom: Content & Actions */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      {project.category}
                    </span>
                  </div>

                  <h3 className="font-syne font-bold text-xl text-black dark:text-white group-hover:text-brand-orange transition-colors">
                    {project.title}
                  </h3>

                  <p className="font-sans text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                    {project.summary}
                  </p>
                </div>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.tags.slice(0, 4).map((tag, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-0.5 rounded-md bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 text-[11px] font-mono text-slate-700 dark:text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 4 && (
                    <span className="px-1.5 py-0.5 rounded text-[11px] font-mono text-slate-400">
                      +{project.tags.length - 4}
                    </span>
                  )}
                </div>

                {/* CTA Button */}
                <div className="pt-4 border-t border-black/10 dark:border-white/10 flex items-center justify-between">
                  <button
                    onClick={() => handleOpenCaseStudy(project)}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-black dark:bg-lime-neon text-white dark:text-black font-syne font-bold text-xs shadow-neo-sm hover:translate-x-0.5 hover:-translate-y-0.5 transition-all"
                  >
                    <Eye size={14} />
                    <span>Read Full Case Study</span>
                  </button>
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Case Study Deep Dive Modal */}
      {activeCaseStudy && (
        <CaseStudyModal
          project={activeCaseStudy}
          onClose={() => setActiveCaseStudy(null)}
        />
      )}

    </section>
  );
};
