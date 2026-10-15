import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Layers, Code2, Database, Brain, X, ChevronUp } from 'lucide-react';
import { playDrawerOpen, playPop, playClick } from '../utils/sound';

export const SkillsChestDrawer = () => {
  // Active open drawer index: 0, 1, 2, 3 or null (default null: all closed)
  const [activeDrawer, setActiveDrawer] = useState(null);
  const [activeSkillModal, setActiveSkillModal] = useState(null);
  const hoverTimeoutRef = useRef(null);

  const handleDrawerEnter = (index) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    if (activeDrawer !== index) {
      playDrawerOpen();
      setActiveDrawer(index);
    }
  };

  const handleDrawerLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    hoverTimeoutRef.current = setTimeout(() => {
      setActiveDrawer(null);
    }, 120);
  };

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  const drawers = [
    {
      id: 'languages',
      paintedTitle: 'Languages & Core CS',
      accentColor: '#E07A5F',
      drawerBg: 'bg-[#FCE3D8]',
      drawerInner: 'bg-[#F9D7C9]',
      drawerBorder: 'border-[#E07A5F]/40',
      titleColor: 'text-[#8A3B25]',
      icon: Code2,
      skills: [
        { name: 'C++', icon: '⚡', level: 'Core CS', note: 'Object-oriented programming, STL algorithms, memory efficiency, high-performance logic' },
        { name: 'Python', icon: '🐍', level: 'Advanced', note: 'Scikit-Learn, Pandas, NumPy, FastAPI, exploratory data analysis, ML pipelines' },
        { name: 'Java', icon: '☕', level: 'Proficient', note: 'OOP principles, collections framework, robust enterprise backend design' },
        { name: 'C#', icon: '🎯', level: 'Proficient', note: '.NET MAUI mobile development, async tasks, cross-platform architecture' },
        { name: 'SQL', icon: '🗄️', level: 'Proficient', note: 'Relational database schemas, joins, indexing, query performance optimization' },
        { name: 'JavaScript (ES6+)', icon: '💛', level: 'Advanced', note: 'Asynchronous control flow, event loop, closures, DOM manipulation, ESNext features' },
        { name: 'TypeScript', icon: '🔷', level: 'Proficient', note: 'Static typing, interfaces, contract safety across scalable full-stack applications' },
        { name: 'DSA', icon: '🧩', level: 'Problem Solver', note: 'Arrays, trees, graphs, dynamic programming, algorithmic efficiency' },
        { name: 'OOP', icon: '🏛️', level: 'Core CS', note: 'Encapsulation, inheritance, polymorphism, clean architectural design patterns' }
      ]
    },
    {
      id: 'web',
      paintedTitle: 'Web & Frameworks',
      accentColor: '#81B29A',
      drawerBg: 'bg-[#DEF2E6]',
      drawerInner: 'bg-[#CBEAD7]',
      drawerBorder: 'border-[#81B29A]/40',
      titleColor: 'text-[#2D5A42]',
      icon: Layers,
      skills: [
        { name: 'React.js', icon: '⚛️', level: 'Advanced', note: 'Modern hooks, state isolation, React 19, re-render reduction, component lifecycle' },
        { name: 'Next.js', icon: '▲', level: 'Fluent', note: 'Server-side rendering, static site generation, API routing, server components' },
        { name: 'Node.js & Express', icon: '🟢', level: 'Proficient', note: 'RESTful API routing, JWT auth, middleware architecture, microservices' },
        { name: 'MongoDB', icon: '🍃', level: 'Proficient', note: 'Mongoose schemas, aggregation pipelines, document data modeling' },
        { name: 'Tailwind CSS', icon: '🌊', level: 'Advanced', note: 'Utility-first design tokens, responsive UX layouts, custom theme configurations' },
        { name: '.NET MAUI', icon: '📱', level: 'Applied', note: 'Cross-platform native mobile applications for Android & iOS' },
        { name: 'WebSockets', icon: '⚡', level: 'Realtime', note: 'Low-latency canvas synchronization, concurrent multi-user state broadcasts' },
        { name: 'REST APIs', icon: '🔌', level: 'Proficient', note: 'HTTP semantics, contract design, latency optimization, endpoint integration' },
        { name: 'HTML5 & CSS3', icon: '🌐', level: 'Advanced', note: 'Semantic markup architecture, accessibility standards, fluid responsive styling' },
        { name: 'GraphQL', icon: '🔮', level: 'Proficient', note: 'Unified schema definitions, type resolvers, low-overfetching client queries' }
      ]
    },
    {
      id: 'aiml',
      paintedTitle: 'AI/ML & Data Science',
      accentColor: '#F4A261',
      drawerBg: 'bg-[#FFF0D4]',
      drawerInner: 'bg-[#FDE2BC]',
      drawerBorder: 'border-[#F4A261]/40',
      titleColor: 'text-[#874E18]',
      icon: Brain,
      skills: [
        { name: 'Machine Learning', icon: '🤖', level: 'Builder', note: 'Supervised & unsupervised learning, clustering algorithms, model scoring' },
        { name: 'Predictive Modeling', icon: '📈', level: 'Specialist', note: 'Regression, classification, scikit-learn models, hyperparameter tuning' },
        { name: 'Scikit-Learn', icon: '🔬', level: 'Specialist', note: 'Pipeline transformers, cross-validation, estimator benchmarking' },
        { name: 'Data Analysis & EDA', icon: '📊', level: 'Specialist', note: 'Pandas, NumPy, data cleaning, exploratory visual analysis' },
        { name: 'Pandas & NumPy', icon: '🐼', level: 'Advanced', note: 'High-performance vectorized operations, time-series, DataFrame manipulation' },
        { name: 'Feature Engineering', icon: '⚙️', level: 'Specialist', note: 'Dimensionality reduction, PCA projections, correlation matrices' },
        { name: 'LLM & Prompts', icon: '💡', level: 'Specialist', note: 'Structured JSON schemas, chain-of-thought prompting, API integrations' },
        { name: 'CNN & Vision', icon: '👁️', level: 'Applied', note: 'Facial emotion detection, computer vision models, image classification' },
        { name: 'Streamlit & MLOps', icon: '🚀', level: 'Builder', note: 'Interactive model dashboards, live feature engineering deployment' }
      ]
    },
    {
      id: 'cloud',
      paintedTitle: 'Cloud, DevOps & Tools',
      accentColor: '#A29BFE',
      drawerBg: 'bg-[#EAE6FB]',
      drawerInner: 'bg-[#DCD5FA]',
      drawerBorder: 'border-[#A29BFE]/40',
      titleColor: 'text-[#483487]',
      icon: Database,
      skills: [
        { name: 'Docker', icon: '🐳', level: 'Builder', note: 'Containerization, Dockerfiles, reproducible deployment bundles' },
        { name: 'AWS & Cloud', icon: '☁️', level: 'Proficient', note: 'Cloud API integration, S3 hosting, production cloud pipelines' },
        { name: 'Git & GitHub', icon: '🐙', level: 'Advanced', note: 'Branching workflows, version control, PR reviews, CI/CD collaboration' },
        { name: 'Keycloak SSO', icon: '🔐', level: 'Applied', note: 'Enterprise RBAC, OAuth2, OpenID Connect identity gates' },
        { name: 'PostgreSQL & Redis', icon: '⚡', level: 'Proficient', note: 'Relational persistence, ACID compliance, in-memory low latency caching' },
        { name: 'Postman', icon: '📮', level: 'Power User', note: 'REST API testing, automated collections, contract verification' },
        { name: 'Firebase', icon: '🔥', level: 'Proficient', note: 'Authentication, Firestore real-time database, cloud hosting' },
        { name: 'Figma & UI/UX', icon: '🎨', level: 'Advanced', note: 'High-fidelity wireframing, design systems, interactive prototypes' },
        { name: 'CI/CD & Linux', icon: '🐧', level: 'Proficient', note: 'Automated deployment pipelines, shell scripting, Linux administration' }
      ]
    }
  ];

  return (
    <section 
      id="skills" 
      className="py-20 relative overflow-hidden bg-transparent text-[#2D2A26] transition-colors duration-500 select-none"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E29578]/15 text-[#C86445] text-xs font-mono font-medium">
            <Sparkles size={13} />
            <span>Interactive Chest</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-light tracking-tight">
            What are <span className="font-serif italic text-[#E29578]">my Skills</span>
          </h2>
          <p className="text-xs sm:text-sm font-light text-[#5A564F]">
            Hover over any drawer to pull it open. Move your cursor away to close it.
          </p>
        </div>

        {/* ========================================================
            MODERN SCANDINAVIAN AESTHETIC CABINET
            Constant Height with Spacious Tray and Zero Overlapping
        ======================================================== */}
        <div className="max-w-lg sm:max-w-xl mx-auto relative pt-2 pb-6">

          {/* Perspective Container */}
          <div 
            onMouseLeave={() => {
              if (hoverTimeoutRef.current) {
                clearTimeout(hoverTimeoutRef.current);
                hoverTimeoutRef.current = null;
              }
              setActiveDrawer(null);
            }}
            className="relative mx-auto w-full max-w-lg sm:max-w-xl" 
            style={{ perspective: 1200 }}
          >

            {/* Overhanging Blonde Wooden Tabletop Rim */}
            <div className="h-3.5 mx-2 rounded-t-2xl bg-gradient-to-r from-[#DFD1C0] via-[#EAE0D3] to-[#DFD1C0] border-t-2 border-x-2 border-[#CBB8A3] shadow-xs relative z-20 flex items-center justify-between px-6">
              <div className="w-12 h-1 bg-white/40 rounded-full" />
              <div className="w-12 h-1 bg-white/40 rounded-full" />
            </div>

            {/* Cabinet Outer Carcass with STRICT CONSTANT HEIGHT (610px) */}
            <div 
              onMouseLeave={() => {
                if (hoverTimeoutRef.current) {
                  clearTimeout(hoverTimeoutRef.current);
                  hoverTimeoutRef.current = null;
                }
                setActiveDrawer(null);
              }}
              className="rounded-b-[28px] rounded-t-lg bg-[#EFE8DE] backdrop-blur-md border-2 border-[#D8C9B8] shadow-[0_22px_55px_rgba(0,0,0,0.1)] p-4 sm:p-5 relative h-[610px] sm:h-[630px] flex flex-col justify-between overflow-hidden"
            >
              
              {/* Recessed Inner Furniture Housing (Bay) */}
              <div 
                onMouseLeave={() => {
                  if (hoverTimeoutRef.current) {
                    clearTimeout(hoverTimeoutRef.current);
                    hoverTimeoutRef.current = null;
                  }
                  setActiveDrawer(null);
                }}
                className="w-full h-full rounded-2xl bg-[#E4D8C8]/60 border border-[#D5C6B3] p-3 flex flex-col gap-2.5 justify-between relative shadow-inner overflow-hidden"
              >
                
                {drawers.map((drawer, index) => {
                  const isOpen = activeDrawer === index;
                  const isAnyOpen = activeDrawer !== null;

                  return (
                    <motion.div 
                      key={drawer.id} 
                      layout
                      onMouseEnter={() => handleDrawerEnter(index)}
                      onMouseLeave={handleDrawerLeave}
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      className={`relative w-full rounded-xl overflow-hidden ${
                        isOpen 
                          ? 'flex-[4.6] min-h-[290px]' 
                          : isAnyOpen 
                            ? 'flex-[0.8] min-h-[44px] max-h-[50px]' 
                            : 'flex-[1] min-h-[85px]'
                      }`}
                    >
                      {/* ========================================================
                          OPEN STATE: 3D PULLED-OUT TRAY & REALISTIC 3D DRAWER BOX
                      ======================================================== */}
                      {isOpen ? (
                        <div 
                          className={`w-full h-full rounded-xl ${drawer.drawerInner} border-2 border-white/90 flex flex-col justify-between relative p-2 sm:p-2.5 overflow-hidden cursor-default`}
                          style={{
                            transform: 'perspective(900px) rotateX(3deg) translateY(1px)',
                            transformOrigin: 'top center',
                            boxShadow: '0 22px 42px -6px rgba(0,0,0,0.2), 0 8px 16px rgba(0,0,0,0.08), inset 0 2px 6px rgba(0,0,0,0.04)'
                          }}
                        >
                          {/* 3D Blonde Birch Drawer Side Walls with Dovetail Joinery Notches */}
                          <div className="absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-[#DFD1BE] to-[#C8B8A2] border-r border-[#A89884] pointer-events-none shadow-xs flex flex-col justify-around py-2">
                            <div className="w-1.5 h-2 bg-[#B8A793] rounded-r-xs" />
                            <div className="w-1.5 h-2 bg-[#B8A793] rounded-r-xs" />
                            <div className="w-1.5 h-2 bg-[#B8A793] rounded-r-xs" />
                          </div>
                          <div className="absolute inset-y-0 right-0 w-3 bg-gradient-to-l from-[#DFD1BE] to-[#C8B8A2] border-l border-[#A89884] pointer-events-none shadow-xs flex flex-col justify-around py-2 items-end">
                            <div className="w-1.5 h-2 bg-[#B8A793] rounded-l-xs" />
                            <div className="w-1.5 h-2 bg-[#B8A793] rounded-l-xs" />
                            <div className="w-1.5 h-2 bg-[#B8A793] rounded-l-xs" />
                          </div>

                          {/* Top Recessed Cabinet Cavity Shadow */}
                          <div className="absolute top-0 inset-x-0 h-6 bg-gradient-to-b from-black/20 via-black/05 to-transparent pointer-events-none z-10" />

                          {/* TOP HEADER BAR */}
                          <div className="relative z-20 shrink-0 flex items-center justify-between px-3 py-1.5 rounded-lg bg-black/5 select-none mb-1">
                            <div className="flex items-center gap-1.5">
                              <span className={`text-xs sm:text-sm font-bold font-sans tracking-wide ${drawer.titleColor}`}>
                                {drawer.paintedTitle}
                              </span>
                              <span className="text-[10px] text-stone-600 font-mono font-medium">({drawer.skills.length} skills)</span>
                            </div>
                            <span className="text-[9.5px] font-mono text-stone-500 font-medium">
                              ✦ Move cursor away to close
                            </span>
                          </div>

                          {/* CASUALLY ARRANGED SKILL CARDS (ZERO OVERLAP, BALANCED RESPONSIVE ORGANIC FLOW) */}
                          <div 
                            onClick={(e) => e.stopPropagation()}
                            className="relative z-10 flex-1 w-full min-h-0 p-1.5 sm:p-2.5 flex flex-wrap content-center items-center justify-center gap-1.5 sm:gap-2.5 select-none overflow-y-auto"
                          >
                            {drawer.skills.map((skill, sIdx) => {
                              const tilts = [-2, 1.5, -1, 2, -1.5, 1, -2, 1.5, -0.5, 1.2];
                              const rot = tilts[sIdx % tilts.length];

                              return (
                                <motion.div
                                  key={sIdx}
                                  initial={{ y: 8, opacity: 0 }}
                                  animate={{ y: 0, opacity: 1, rotate: rot }}
                                  transition={{ delay: 0.03 + sIdx * 0.02, type: "spring", stiffness: 450, damping: 25 }}
                                  whileHover={{ scale: 1.08, rotate: 0, zIndex: 40, y: -2 }}
                                  whileTap={{ scale: 0.96 }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    playPop();
                                    setActiveSkillModal({ ...skill, category: drawer.paintedTitle, color: drawer.accentColor });
                                  }}
                                  className="px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl bg-white/95 backdrop-blur-md border border-black/10 shadow-xs hover:shadow-md cursor-pointer flex items-center gap-1.5 select-none group transition-shadow z-20 whitespace-nowrap"
                                  title={`Click to inspect ${skill.name}`}
                                >
                                  <span className="text-sm sm:text-base shrink-0 group-hover:scale-115 transition-transform">{skill.icon}</span>
                                  <span className="text-[#2D2A26] font-medium text-xs sm:text-[13px]">
                                    {skill.name}
                                  </span>
                                </motion.div>
                              );
                            })}
                          </div>

                          {/* OPEN DRAWER FRONT LIP */}
                          <div 
                            className={`shrink-0 h-10 sm:h-11 rounded-lg ${drawer.drawerBg} border-t-2 border-white/95 border-b-3 border-black/20 shadow-xs relative z-20 flex items-center justify-between px-3 sm:px-4 cursor-default select-none group transition-all`}
                            style={{
                              boxShadow: '0 8px 16px -2px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.9)'
                            }}
                          >
                            <div className="flex items-center gap-2">
                              <span className={`text-xs sm:text-sm font-bold font-sans tracking-wide ${drawer.titleColor}`}>
                                {drawer.paintedTitle}
                              </span>
                            </div>

                            {/* Brushed Brass Pull Handle */}
                            <div className="relative flex items-center justify-center pointer-events-none select-none group-hover:scale-105 transition-transform drop-shadow-[0_3px_4px_rgba(0,0,0,0.35)]">
                              <div className="w-1.5 h-3.5 rounded-[1px] bg-gradient-to-b from-[#FFF5C0] via-[#D4AF37] to-[#8C6D1C] shadow-xs border border-[#7A5B0B]/30" />
                              <div className="relative w-11 sm:w-13 h-2 rounded-full bg-gradient-to-b from-[#FFF6CC] via-[#E5C158] to-[#9E7B1E] shadow-[0_2px_4px_rgba(0,0,0,0.3)] border-t border-white/80 border-b border-black/30 flex items-center justify-center">
                                <div className="absolute top-[1px] inset-x-2 h-[1px] bg-white/90 rounded-full" />
                              </div>
                              <div className="w-1.5 h-3.5 rounded-[1px] bg-gradient-to-b from-[#FFF5C0] via-[#D4AF37] to-[#8C6D1C] shadow-xs border border-[#7A5B0B]/30" />
                            </div>
                          </div>

                        </div>
                      ) : (
                        /* ========================================================
                            CLOSED STATE: 3D BEVELED SOLID DRAWER SLAB
                        ======================================================== */
                        <motion.div
                          whileHover={{ scale: 1.01, y: -1 }}
                          className={`w-full h-full rounded-xl ${drawer.drawerBg} border-t-2 border-white/95 border-b-3 border-black/20 border-x border-black/10 shadow-xs hover:shadow-md relative flex items-center justify-between px-4 sm:px-5 cursor-default select-none group transition-all`}
                          style={{
                            boxShadow: '0 6px 14px -2px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.85), inset 0 -1px 0 rgba(0,0,0,0.04)'
                          }}
                        >
                          <div className="relative z-10 flex items-center gap-2 sm:gap-3">
                            <span className={`font-bold font-sans tracking-wide ${
                              isAnyOpen ? 'text-sm sm:text-base' : 'text-base sm:text-lg'
                            } ${drawer.titleColor}`}>
                              {drawer.paintedTitle}
                            </span>
                            <span className="text-[9.5px] font-mono text-[#8C7A6B] group-hover:text-[#2D2A26] transition-colors">
                              ✦ {drawer.skills.length} skills
                            </span>
                          </div>

                          <div className="relative flex items-center justify-center pointer-events-none select-none drop-shadow-[0_3px_5px_rgba(0,0,0,0.2)]">
                            <div className="w-1.5 sm:w-2 h-3 sm:h-3.5 rounded-[1px] bg-gradient-to-b from-[#FFF5C0] via-[#D4AF37] to-[#8C6D1C] shadow-xs border border-[#7A5B0B]/30" />
                            <div className="relative w-11 sm:w-14 h-2 sm:h-2.5 rounded-full bg-gradient-to-b from-[#FFF6CC] via-[#E5C158] to-[#9E7B1E] shadow-[0_2px_4px_rgba(0,0,0,0.2)] border-t border-white/80 border-b border-black/20 flex items-center justify-center">
                              <div className="absolute top-[1px] inset-x-2 h-[1px] bg-white/90 rounded-full" />
                            </div>
                            <div className="w-1.5 sm:w-2 h-3 sm:h-3.5 rounded-[1px] bg-gradient-to-b from-[#FFF5C0] via-[#D4AF37] to-[#8C6D1C] shadow-xs border border-[#7A5B0B]/30" />
                          </div>
                        </motion.div>
                      )}

                    </motion.div>
                  );
                })}

              </div>

            </div>

            {/* Mid-Century Tapered Wooden Stand Legs */}
            <div className="flex justify-between px-10 -mt-1 relative z-0">
              <div className="w-6 h-9 bg-gradient-to-b from-[#B8A793] via-[#9F8E7A] to-[#867663] rounded-b-md shadow-xs -rotate-8 relative flex flex-col justify-end overflow-hidden">
                <div className="w-full h-2.5 bg-gradient-to-r from-[#FFE270] via-[#D4AF37] to-[#8C6D1C] border-t border-white/40 shadow-xs" />
              </div>
              
              <div className="w-6 h-9 bg-gradient-to-b from-[#B8A793] via-[#9F8E7A] to-[#867663] rounded-b-md shadow-xs rotate-8 relative flex flex-col justify-end overflow-hidden">
                <div className="w-full h-2.5 bg-gradient-to-r from-[#FFE270] via-[#D4AF37] to-[#8C6D1C] border-t border-white/40 shadow-xs" />
              </div>
            </div>

            {/* Floor Contact Soft Ambient Shadow */}
            <div className="w-[82%] h-4 bg-black/15 rounded-full mx-auto blur-[8px] -mt-2 pointer-events-none" />

          </div>

        </div>

      </div>

      {/* Individual Skill Details Modal */}
      <AnimatePresence>
        {activeSkillModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-sm rounded-3xl bg-[#FAF8F5] p-6 border border-[#D4B996]/60 shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{activeSkillModal.icon}</span>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-[#8C7A6B] block">{activeSkillModal.category}</span>
                    <h4 className="text-base font-bold text-[#2D2A26]">{activeSkillModal.name}</h4>
                  </div>
                </div>
                <button
                  onClick={() => setActiveSkillModal(null)}
                  className="p-1 rounded-full hover:bg-black/5 text-[#8C7A6B] cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="p-3 rounded-2xl bg-white/80 border border-[#D4B996]/30 text-xs font-mono text-[#5A564F]">
                ✦ <strong>Proficiency Level:</strong> {activeSkillModal.level}
              </div>

              <p className="text-xs font-light text-[#5A564F] leading-relaxed">
                {activeSkillModal.note}
              </p>

              <div className="pt-2">
                <button
                  onClick={() => setActiveSkillModal(null)}
                  className="w-full py-2 rounded-full bg-[#2D2A26] text-white text-xs font-mono font-semibold cursor-pointer"
                >
                  Close Skill Card
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default SkillsChestDrawer;
