import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, Layers, Code2, Server, Palette, 
  Check, ArrowUpRight, Zap, RefreshCw 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { playClick, playPop, playSticker, playSuccess } from '../utils/sound';

export const SkillsPouch = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeCategory, setActiveCategory] = useState('design');

  const categories = [
    { id: 'design', label: '🎨 Design & UI/UX', color: 'bg-brand-coral text-white' },
    { id: 'frontend', label: '💻 Frontend & Motion', color: 'bg-lime-neon text-black' },
    { id: 'backend', label: '⚙️ Backend & Systems', color: 'bg-brand-purple text-white' },
    { id: 'ai', label: '✨ AI & Innovations', color: 'bg-brand-cyan text-black' }
  ];

  // Specific stationery items popping out of the pouch per category
  const toolsData = {
    design: [
      { name: "Figma Components", type: "Swatch Card", level: "Expert", desc: "Auto-layout v5, variables, Tokens Studio", rotate: -8, yOffset: -35 },
      { name: "Design Systems", type: "Ruler Token", level: "Architect", desc: "Atomic spacing, WCAG AAA accessibility", rotate: 4, yOffset: -50 },
      { name: "User Research", type: "Sticky Note", level: "Empathetic", desc: "Contextual inquiry & journey mapping", rotate: -3, yOffset: -20 },
      { name: "Micro-interactions", type: "Spring Pin", level: "Delightful", desc: "Choreographed motion physics", rotate: 9, yOffset: -45 },
      { name: "Wireframing", type: "Paper Sketch", level: "Rapid", desc: "Low-fidelity to high-fidelity flows", rotate: -5, yOffset: -30 }
    ],
    frontend: [
      { name: "React 18 / 19", type: "Code Block", level: "Core", desc: "Custom hooks, performance optimization", rotate: -6, yOffset: -40 },
      { name: "Next.js & SSR", type: "Server Card", level: "Advanced", desc: "App router, streaming SSR, SEO", rotate: 5, yOffset: -55 },
      { name: "Tailwind CSS", type: "Palette Chip", level: "Power User", desc: "Custom themes, responsive grids", rotate: -4, yOffset: -25 },
      { name: "Framer Motion", type: "Spring Wire", level: "Master", desc: "Layout transitions, gestures, drag physics", rotate: 8, yOffset: -48 },
      { name: "TypeScript", type: "Strict Rule", level: "Solid", desc: "Robust types, safe API contracts", rotate: -2, yOffset: -32 }
    ],
    backend: [
      { name: "Node.js & Express", type: "Runtime Pill", level: "Solid", desc: "REST APIs, secure middleware, auth", rotate: -7, yOffset: -38 },
      { name: "Python & FastAPI", type: "Async Core", level: "Proficient", desc: "Pydantic models, rapid endpoints", rotate: 6, yOffset: -52 },
      { name: "PostgreSQL & Supabase", type: "Data Vault", level: "Architect", desc: "Schema design, relational indexes, RLS", rotate: -4, yOffset: -24 },
      { name: "WebSockets", type: "Stream Wire", level: "Realtime", desc: "Bidirectional low-latency events", rotate: 7, yOffset: -42 }
    ],
    ai: [
      { name: "Prompt Engineering", type: "AI Persona", level: "Specialist", desc: "Structured JSON, few-shot conditioning", rotate: -5, yOffset: -36 },
      { name: "LangChain & RAG", type: "Vector Index", level: "Builder", desc: "Embeddings, semantic retrieval, context", rotate: 7, yOffset: -50 },
      { name: "Gemini & OpenAI APIs", type: "Model Bridge", level: "Integrated", desc: "Multimodal reasoning & streaming responses", rotate: -3, yOffset: -28 },
      { name: "HuggingFace NLP", type: "Sentiment Chip", level: "Practitioner", desc: "Emotion detection pipelines", rotate: 8, yOffset: -44 }
    ]
  };

  const togglePouch = () => {
    playPop();
    const nextState = !isOpen;
    setIsOpen(nextState);
    if (nextState) {
      confetti({
        particleCount: 35,
        spread: 60,
        origin: { y: 0.7 }
      });
    }
  };

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-paper-light dark:bg-paper-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-coral/15 border border-brand-coral/30 text-brand-coral text-xs font-mono font-bold uppercase tracking-wider">
            <Sparkles size={13} />
            <span>Sakshi's Studio Stationery & Tools</span>
          </div>

          <h2 className="font-syne font-black text-3xl sm:text-5xl text-black dark:text-white tracking-tight">
            Tools Popping From My Desk Pouch
          </h2>

          <p className="font-sans text-sm sm:text-base text-slate-600 dark:text-slate-400">
            A designer's tool pouch is personal. Click the pouch or switch categories to watch tools, swatches, and tokens physically emerge.
          </p>

          {/* Category Tabs */}
          <div className="pt-4 flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  playClick();
                  setActiveCategory(cat.id);
                  if (!isOpen) setIsOpen(true);
                }}
                className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-syne font-bold transition-all border-2 ${
                  activeCategory === cat.id
                    ? `${cat.color} border-black shadow-neo-sm scale-105`
                    : 'bg-white dark:bg-paper-cardDark text-slate-700 dark:text-slate-300 border-black/10 dark:border-white/10'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* The Interactive Desk Layout with the Tool Pouch */}
        <div className="relative max-w-4xl mx-auto p-6 sm:p-12 rounded-3xl bg-[#F4EFEA] dark:bg-[#15171F] border-2 border-black dark:border-white/15 shadow-2xl overflow-hidden min-h-[480px] flex flex-col justify-between">
          
          {/* Subtle Grid texture for drafting mat feel */}
          <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />

          {/* Top Desk Header & Toggle */}
          <div className="relative z-10 flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
                // CREATIVE TOOLKIT • SAKSHI KORE
              </span>
            </div>

            <button
              onClick={togglePouch}
              className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-paper-cardDark border border-black/20 dark:border-white/20 text-xs font-mono font-bold shadow-sm hover:scale-105 transition-transform flex items-center gap-1.5"
            >
              <RefreshCw size={12} className={isOpen ? "rotate-180" : ""} />
              <span>{isOpen ? "Pack Back Into Pouch" : "Open & Spill Tools"}</span>
            </button>
          </div>

          {/* The Popping Out Elements Area */}
          <div className="relative z-10 py-12 flex-1 flex flex-col justify-center items-center">
            
            <AnimatePresence mode="wait">
              {isOpen && (
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8"
                >
                  {toolsData[activeCategory].map((tool, index) => (
                    <motion.div
                      key={tool.name}
                      initial={{ opacity: 0, y: 50, rotate: 0 }}
                      animate={{ 
                        opacity: 1, 
                        y: tool.yOffset, 
                        rotate: tool.rotate 
                      }}
                      transition={{ 
                        delay: index * 0.08, 
                        type: "spring", 
                        stiffness: 260, 
                        damping: 18 
                      }}
                      whileHover={{ 
                        scale: 1.08, 
                        rotate: 0, 
                        y: tool.yOffset - 12,
                        zIndex: 30 
                      }}
                      onClick={() => playSticker()}
                      className="p-4 rounded-2xl bg-white dark:bg-paper-cardDark border-2 border-black dark:border-white/20 shadow-neo hover:shadow-2xl transition-all cursor-pointer relative"
                    >
                      {/* Golden Paper Clip Corner */}
                      <div className="absolute -top-3 left-4 w-4 h-6 border-2 border-amber-500 bg-amber-400 rounded-sm shadow-sm rotate-[-4deg]" />

                      <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1 pt-1">
                        <span>{tool.type}</span>
                        <span className="font-bold text-brand-orange">{tool.level}</span>
                      </div>

                      <h4 className="font-syne font-bold text-base text-black dark:text-white mb-1">
                        {tool.name}
                      </h4>

                      <p className="font-sans text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        {tool.desc}
                      </p>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

          </div>

          {/* The Visual Stationery Pouch at the Bottom */}
          <div className="relative z-10 pt-4 flex justify-center">
            
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={togglePouch}
              className={`relative cursor-pointer w-full max-w-md p-5 rounded-3xl border-2 border-black shadow-neo transition-all ${
                isOpen 
                  ? 'bg-gradient-to-r from-amber-200 via-amber-300 to-amber-200 text-black' 
                  : 'bg-gradient-to-r from-brand-coral via-brand-orange to-brand-coral text-white'
              }`}
              title="Click pouch to toggle packing!"
            >
              {/* Zipper Teeth Effect */}
              <div className="absolute -top-3 left-8 right-8 h-3 flex items-center justify-between overflow-hidden">
                {[...Array(20)].map((_, i) => (
                  <div key={i} className="w-1.5 h-2.5 bg-slate-800 rounded-xs mx-0.5" />
                ))}
              </div>

              {/* Pouch Label */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-black text-white flex items-center justify-center text-xl shadow">
                    👝
                  </div>
                  <div>
                    <h3 className="font-syne font-extrabold text-base">
                      Sakshi's Studio Pouch
                    </h3>
                    <p className="font-mono text-xs opacity-80">
                      {isOpen ? "Tools Spilled Across Workspace • Tap to pack" : "All Tools Packed • Tap to open pouch"}
                    </p>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full bg-black text-lime-neon font-mono text-xs font-bold shadow-sm">
                  {isOpen ? "OPEN ✨" : "CLOSED 🔒"}
                </span>
              </div>
            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
};
