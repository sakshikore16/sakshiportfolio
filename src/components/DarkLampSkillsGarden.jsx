import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Sun, Info, Heart, Flower2 } from 'lucide-react';
import { playLampSwitch, playBloomChime, playPop } from '../utils/sound';

export const DarkLampSkillsGarden = () => {
  const [lampOn, setLampOn] = useState(true);
  const [activeItem, setActiveItem] = useState(null);
  const [hoveredPetal, setHoveredPetal] = useState(null);

  const toggleLamp = () => {
    playLampSwitch();
    setLampOn(!lampOn);
  };

  const plantsData = [
    {
      id: 'uiux-blossom',
      title: 'UI/UX & Craft Blossom',
      botanicalName: '🌸 Peonia Empathia (Cherry Peony)',
      potStyle: 'from-rose-900/60 to-rose-950/80 border-rose-500/30 text-rose-200',
      plantType: 'flower',
      accentColor: '#FF6B6B',
      description: 'Grown from human psychology, user empathy, WCAG AAA tokens, and tactile delight.',
      petals: [
        { id: 'p1', title: 'Figma Auto-Layout & Tokens', angle: 0, tag: 'Design System', note: 'Token studio, multi-mode variables, components architecture, zero handoff friction' },
        { id: 'p2', title: 'Design Systems Architecture', angle: 72, tag: 'Scalability', note: 'Atomic components, typography scales, semantic tokens, WCAG AAA accessibility' },
        { id: 'p3', title: 'User Research & Journey Mapping', angle: 144, tag: 'Empathy', note: 'Contextual interviews, cognitive walk-throughs, heuristic evaluations, usability testing' },
        { id: 'p4', title: 'Motion & Micro-interactions', angle: 216, tag: 'Sensory', note: 'Choreographed spring dynamics, sensory haptic feedback, fluid transitions' },
        { id: 'p5', title: 'High-Fidelity Prototyping', angle: 288, tag: 'Validation', note: 'Interactive states, tactile affordances, client walkthrough decks, polished pitch prototypes' }
      ]
    },
    {
      id: 'frontend-monstera',
      title: 'Frontend & Motion Monstera',
      botanicalName: '🌿 Monstera Reacta (Emerald Fern)',
      potStyle: 'from-emerald-950/60 to-teal-950/80 border-emerald-500/30 text-emerald-200',
      plantType: 'leaves',
      accentColor: '#4ECDC4',
      description: 'Nourished by declarative DOM state, fluid responsive CSS, and 60fps spring transitions.',
      petals: [
        { id: 'm1', title: 'React 18 / 19 & Next.js', angle: -50, tag: 'Core Engine', note: 'App router, Server Components, streaming SSR, custom hooks, performant DOM rendering' },
        { id: 'm2', title: 'Tailwind CSS & Styling', angle: -25, tag: 'Aesthetics', note: 'Fluid typography, responsive spacing scales, CSS custom properties, dark mode' },
        { id: 'm3', title: 'Framer Motion Physics', angle: 0, tag: 'Animation', note: 'Spring physics, layout animations, gestures, SVG morphing, drag-to-dismiss interactions' },
        { id: 'm4', title: 'TypeScript & Modern JS', angle: 25, tag: 'Precision', note: 'Strict type safety, generic interfaces, ESNext features, zero-runtime crash tolerance' },
        { id: 'm5', title: 'Web Audio & Canvas UI', angle: 50, tag: 'Sensory Web', note: 'Web Audio API synthesizer, dynamic canvas particles, creative tactile web micro-moments' }
      ]
    },
    {
      id: 'backend-sunflower',
      title: 'Backend, AI & Data Sunflower',
      botanicalName: '🌻 Helianthus Machina (Citrus Sunflower)',
      potStyle: 'from-amber-950/60 to-yellow-950/80 border-amber-500/30 text-amber-200',
      plantType: 'sunflower',
      accentColor: '#FFE66D',
      description: 'Rooted in reliable distributed APIs, relational data integrity, and LLM cognitive loops.',
      petals: [
        { id: 's1', title: 'Python & FastAPI', angle: 0, tag: 'API Engine', note: 'Async REST endpoints, Pydantic schemas, dependency injection, high-throughput microservices' },
        { id: 's2', title: 'Node.js & Express', angle: 72, tag: 'Runtime', note: 'Middleware architecture, authentication security, microservices, RESTful routing' },
        { id: 's3', title: 'PostgreSQL & Supabase', angle: 144, tag: 'Relational DB', note: 'Relational data modeling, pgvector indexing, Row Level Security, ACID compliance' },
        { id: 's4', title: 'Gemini 1.5 & LangChain RAG', angle: 216, tag: 'Applied AI', note: 'Multimodal vision parsing, function calling, vector embeddings, contextual retrieval' },
        { id: 's5', title: 'System Architecture & Docker', angle: 288, tag: 'Infrastructure', note: 'Docker containerization, cloud deployment, Git workflows, CI/CD pipelines' }
      ]
    }
  ];

  return (
    <section id="skills-garden" className="py-24 relative overflow-hidden bg-[#0A0D14] text-white select-none transition-colors duration-700">
      
      {/* Dynamic Dramatic Luminous Spotlight from the Lamp */}
      {lampOn && (
        <div 
          className="pointer-events-none absolute top-8 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[800px] transition-all duration-700 -z-0 opacity-100"
          style={{
            background: `radial-gradient(ellipse 65% 50% at 50% 18%, rgba(255, 230, 109, 0.45) 0%, rgba(255, 107, 107, 0.15) 38%, transparent 72%)`
          }}
        />
      )}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        
        {/* Header Title */}
        <div className="text-center max-w-xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFE66D]/15 text-[#FFE66D] text-xs font-mono font-medium">
            <Sparkles size={13} />
            <span>Interactive Botanical Studio</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white">
            Table Lamp & <span className="font-serif italic text-[#FFE66D]">Botanical</span> Skills
          </h2>
          <p className="text-xs sm:text-sm font-light text-slate-400">
            Click the studio desk lamp to illuminate Sakshi's botanical plants. Hover or click any flower petal to inspect individual craft skills.
          </p>
        </div>

        {/* ========================================================
            THE ACTUAL WOODEN TABLE WITH THE DESK LAMP ON TOP
        ======================================================== */}
        <div className="relative pt-6">

          {/* Tabletop Surface Wrapper */}
          <div className="relative rounded-3xl border-2 border-[#5c3e21]/70 bg-gradient-to-b from-[#2d1c10] via-[#1f130b] to-[#120a06] p-6 sm:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.9)] overflow-hidden">
            
            {/* Wood Grain Texture Stripes across Table */}
            <div className="absolute inset-0 opacity-20 pointer-events-none bg-[repeating-linear-gradient(90deg,#84532b,#84532b_10px,#4e3019_10px,#4e3019_40px)]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

            {/* Table Surface Beveled Top Highlight */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-amber-700/30 via-amber-400/50 to-amber-700/30" />

            {/* ==========================================
                THE VINTAGE DESK LAMP (SITTING ON TABLE)
            ========================================== */}
            <div className="relative z-20 flex flex-col items-center justify-center mb-12">
              
              {/* Lamp Assembly */}
              <div 
                className="relative cursor-pointer group flex flex-col items-center" 
                onClick={toggleLamp}
                title="Click to toggle studio lamp!"
              >
                
                {/* Lamp Shade (Curved Vintage Brass / Emerald Shade) */}
                <div className="relative">
                  <motion.div 
                    animate={lampOn ? { scale: [1, 1.015, 1] } : {}}
                    transition={{ repeat: Infinity, duration: 4 }}
                    className={`w-32 h-16 rounded-t-full transition-all duration-500 border-2 relative z-10 ${
                      lampOn 
                        ? 'bg-gradient-to-b from-amber-300 via-amber-400 to-amber-200 border-amber-300 shadow-[0_0_65px_rgba(255,230,109,0.95)]' 
                        : 'bg-gradient-to-b from-slate-800 to-slate-900 border-slate-700 opacity-60'
                    }`}
                  >
                    {/* Brass Finial on Top of Lamp Shade */}
                    <div className="w-5 h-3 mx-auto -mt-3 rounded-t bg-amber-600 border border-amber-500" />
                    
                    {/* Shade rim highlight */}
                    <div className="absolute bottom-0 inset-x-0 h-1 bg-amber-100/40 rounded-full" />
                  </motion.div>

                  {/* Edison Filament Bulb Glow under the Shade */}
                  <div className={`w-14 h-8 mx-auto -mt-1 rounded-b-full transition-all duration-300 relative z-0 ${
                    lampOn ? 'bg-white shadow-[0_10px_45px_#FFF]' : 'bg-slate-950 opacity-40'
                  }`} />
                </div>

                {/* Brass Curved Gooseneck Stem */}
                <div className="w-3 h-16 bg-gradient-to-r from-amber-700 via-amber-500 to-amber-800 border-x border-amber-900 shadow-inner" />

                {/* Weighted Brass Table Lamp Base */}
                <div className="w-28 h-5 rounded-full bg-gradient-to-r from-amber-800 via-amber-600 to-amber-900 border-2 border-amber-950 shadow-xl relative">
                  <div className="absolute inset-x-3 top-1 h-1 bg-amber-400/40 rounded-full" />
                </div>

                {/* Interactive Pull-Chain Switch with Golden Bead Hanging Down */}
                <motion.div 
                  className="absolute right-3 top-12 flex flex-col items-center cursor-pointer"
                  whileHover={{ y: 5 }}
                  whileTap={{ y: 12 }}
                >
                  {/* Pull Chain Beads */}
                  <div className="w-0.5 h-12 bg-amber-400 border border-amber-600 shadow-sm" />
                  <div className="w-4 h-4 rounded-full bg-gradient-to-b from-amber-300 to-amber-500 border border-amber-600 shadow-md flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-white/70" />
                  </div>
                  <span className="text-[9px] font-mono font-bold text-amber-300 mt-1 uppercase tracking-tighter opacity-80 group-hover:opacity-100">
                    PULL
                  </span>
                </motion.div>

              </div>

              {/* Lamp Switch Status Pill */}
              <button
                onClick={toggleLamp}
                className={`mt-4 px-5 py-2 rounded-full text-xs font-mono font-bold transition-all shadow-md border flex items-center gap-2 ${
                  lampOn
                    ? 'bg-[#FFE66D] text-slate-950 border-amber-300 hover:scale-105 ring-4 ring-amber-300/20'
                    : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                }`}
              >
                <span>{lampOn ? '💡 Lamp Lit • Click to Turn Off' : '💡 Lamp Is Dark • Click to Turn On!'}</span>
              </button>

            </div>

            {/* ========================================================
                THE 3 BOTANICAL PLANTS / FLOWERS ON THE TABLE
            ======================================================== */}
            <div className="relative z-10 transition-opacity duration-700">
              {lampOn ? (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {plantsData.map((plant) => (
                    <div
                      key={plant.id}
                      className="p-6 rounded-3xl bg-black/40 border border-white/10 backdrop-blur-md flex flex-col justify-between space-y-6 shadow-2xl relative overflow-hidden"
                    >
                      {/* Botanical Header */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="font-bold text-white/90">{plant.botanicalName}</span>
                          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: plant.accentColor }} />
                        </div>
                        <h3 className="text-xl font-medium text-white">{plant.title}</h3>
                        <p className="text-xs font-light text-slate-400 leading-relaxed">{plant.description}</p>
                      </div>

                      {/* ==========================================================
                          PROPER FLOWER BLOSSOM / PETALS (VISUAL FLOWER SHAPE)
                      ========================================================== */}
                      <div className="py-6 flex flex-col items-center justify-center relative min-h-[220px]">

                        {/* Visual Flower Pot on the Table */}
                        <div className="relative w-full max-w-[240px] flex flex-col items-center">
                          
                          {/* Radial Blooming Petals Layout */}
                          <div className="relative w-44 h-44 flex items-center justify-center">
                            
                            {plant.petals.map((petal, idx) => {
                              // Distribute petals geometrically around the center flower core
                              const radius = 62; // px distance from center
                              const rad = (petal.angle * Math.PI) / 180;
                              const x = Math.cos(rad) * radius;
                              const y = Math.sin(rad) * radius;
                              const isHovered = hoveredPetal?.id === petal.id;
                              const isSelected = activeItem?.id === petal.id;

                              return (
                                <motion.div
                                  key={petal.id}
                                  style={{
                                    left: `calc(50% + ${x}px)`,
                                    top: `calc(50% + ${y}px)`,
                                    transform: 'translate(-50%, -50%)',
                                  }}
                                  whileHover={{ scale: 1.15, zIndex: 30 }}
                                  onMouseEnter={() => setHoveredPetal(petal)}
                                  onMouseLeave={() => setHoveredPetal(null)}
                                  onClick={() => {
                                    playBloomChime();
                                    setActiveItem(petal);
                                  }}
                                  className={`absolute cursor-pointer rounded-2xl p-2 text-center transition-all shadow-md select-none border ${
                                    isSelected || isHovered
                                      ? 'bg-white text-slate-950 border-white scale-110 z-20 shadow-[0_0_20px_rgba(255,255,255,0.7)]'
                                      : 'bg-white/15 backdrop-blur-sm text-white/90 border-white/20 hover:border-white/60'
                                  }`}
                                >
                                  {/* Petal Graphic Silhouette */}
                                  <div className="flex flex-col items-center">
                                    <span className="text-base">
                                      {plant.plantType === 'flower' ? '🌸' : plant.plantType === 'leaves' ? '🌿' : '🌻'}
                                    </span>
                                    <span className="text-[10px] font-mono font-medium max-w-[70px] truncate block mt-0.5">
                                      {petal.tag}
                                    </span>
                                  </div>
                                </motion.div>
                              );
                            })}

                            {/* Center Flower Pistil Core / Bloom Heart */}
                            <motion.div 
                              animate={{ scale: [1, 1.08, 1] }}
                              transition={{ repeat: Infinity, duration: 3 }}
                              className="w-14 h-14 rounded-full flex flex-col items-center justify-center shadow-lg border-2 z-10"
                              style={{ 
                                backgroundColor: plant.accentColor,
                                borderColor: '#ffffff',
                                color: '#000000'
                              }}
                            >
                              <Flower2 size={20} className="text-black" />
                              <span className="text-[8px] font-mono font-black uppercase">CORE</span>
                            </motion.div>

                          </div>

                          {/* Potted Planter Base (Resting directly on the wooden table) */}
                          <div className="w-28 mt-2 flex flex-col items-center">
                            {/* Green Plant Stem */}
                            <div className="w-2 h-7 bg-emerald-600 rounded-full" />
                            {/* Soil Surface */}
                            <div className="w-24 h-2 bg-[#3e2714] rounded-t-full border-t border-[#6d4c2b]" />
                            {/* Terracotta / Ceramic Flower Pot */}
                            <div className={`w-24 h-14 rounded-b-2xl bg-gradient-to-b ${plant.potStyle} border-2 shadow-2xl flex flex-col items-center justify-center`}>
                              <div className="w-20 h-1 bg-white/10 rounded-full mb-1" />
                              <span className="text-[9px] font-mono uppercase tracking-wider font-bold">
                                {plant.title.split(' ')[0]} POT
                              </span>
                            </div>
                          </div>

                        </div>

                      </div>

                      {/* Interactive Petals List with Quick Taps */}
                      <div className="space-y-2 pt-2 border-t border-white/10">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                          Petal Craft Milestones (Tap to inspect):
                        </span>
                        <div className="grid grid-cols-1 gap-1.5">
                          {plant.petals.map((petal) => (
                            <div
                              key={petal.id}
                              onClick={() => {
                                playBloomChime();
                                setActiveItem(petal);
                              }}
                              className={`px-3 py-1.5 rounded-xl cursor-pointer text-xs font-mono transition-all flex items-center justify-between border ${
                                activeItem?.id === petal.id
                                  ? 'bg-white text-slate-900 border-white font-bold'
                                  : 'bg-white/5 border-white/5 text-slate-300 hover:bg-white/10'
                              }`}
                            >
                              <span className="truncate">{petal.title}</span>
                              <span className="text-[10px] opacity-60">✦</span>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  ))}
                </div>
              ) : (
                /* Dark Mode State when Lamp is Off */
                <div className="py-20 text-center space-y-4 font-mono">
                  <div className="w-16 h-16 mx-auto rounded-full bg-slate-900/80 border border-slate-700 flex items-center justify-center text-3xl">
                    🌙
                  </div>
                  <h4 className="text-base text-slate-300 font-semibold">
                    Studio Desk Is In Darkness
                  </h4>
                  <p className="text-xs text-slate-500 max-w-md mx-auto">
                    The flowers and bonsai plants are resting in the dark. Pull the golden chain or click the lamp above to shine light on Sakshi's skills!
                  </p>
                </div>
              )}
            </div>

            {/* Table Edge Planks and Bevel */}
            <div className="mt-8 pt-4 border-t border-[#6d4c2b]/40 flex items-center justify-between text-[11px] font-mono text-amber-200/50">
              <span>✦ Studio Solid Oak Tabletop</span>
              <span>Light Status: {lampOn ? 'Illuminated 💡' : 'Off 🌙'}</span>
            </div>

          </div>

          {/* Wooden Table Legs */}
          <div className="flex justify-between px-12 -mt-2">
            <div className="w-8 h-16 bg-gradient-to-b from-[#2d1c10] to-[#0d0704] border-x border-[#4e3019] rounded-b-md shadow-2xl" />
            <div className="w-8 h-16 bg-gradient-to-b from-[#2d1c10] to-[#0d0704] border-x border-[#4e3019] rounded-b-md shadow-2xl" />
          </div>

        </div>

        {/* ========================================================
            FLOATING ACTIVE PETAL INSPECTION CARD
        ======================================================== */}
        <AnimatePresence>
          {activeItem && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="p-6 rounded-3xl bg-white text-slate-950 max-w-xl mx-auto shadow-2xl border-4 border-[#FFE66D] space-y-2 relative"
            >
              <button 
                onClick={() => setActiveItem(null)}
                className="absolute top-4 right-4 w-6 h-6 rounded-full bg-slate-100 text-slate-500 hover:text-black flex items-center justify-center font-bold text-xs"
              >
                ✕
              </button>

              <div className="flex items-center gap-2 text-xs font-mono text-[#FF6B6B] font-bold">
                <span>🌸 FLOWER PETAL INSPECTION</span>
                <span>•</span>
                <span>{activeItem.tag}</span>
              </div>

              <h4 className="text-xl font-bold tracking-tight">
                {activeItem.title}
              </h4>

              <p className="text-xs font-normal text-slate-700 leading-relaxed pt-1">
                {activeItem.note}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
