import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Sun, Droplets, Wind, ArrowRight } from 'lucide-react';
import { playClick, playPop, playSticker } from '../utils/sound';

export const BotanicalSkillsGarden = () => {
  const [selectedBranch, setSelectedBranch] = useState('all');
  const [activeLeaf, setActiveLeaf] = useState(null);

  const branches = [
    { id: 'all', name: '🌸 Full Botanical Tree', color: 'bg-slate-900 text-white dark:bg-white dark:text-black' },
    { id: 'design', name: '🌸 Design & Craft Branch', color: 'bg-[#FF6B6B] text-white' },
    { id: 'frontend', name: '🌿 Frontend Leaves', color: 'bg-[#4ECDC4] text-black' },
    { id: 'backend', name: '🍃 Backend Stems', color: 'bg-[#B388FF] text-white' },
    { id: 'ai', name: '🌺 AI Solar Blooms', color: 'bg-[#FFE66D] text-black' }
  ];

  const leavesData = [
    // Branch 1: Design (Flowers & Blossoms)
    { id: 'figma', branch: 'design', name: 'Figma Auto-Layout & Tokens', type: '🌸 Petal', level: 'Power User', note: 'Token studio, multi-mode variables, components architecture', color: 'bg-[#FFF1F1] dark:bg-[#2A1618] border-[#FF6B6B]', glow: '#FF6B6B' },
    { id: 'design-systems', branch: 'design', name: 'Design Systems', type: '🌸 Petal', level: 'Architect', note: 'WCAG AAA contrast, semantic color tokens, cross-platform spec', color: 'bg-[#FFF1F1] dark:bg-[#2A1618] border-[#FF6B6B]', glow: '#FF6B6B' },
    { id: 'research', branch: 'design', name: 'User Research & Journey Maps', type: '🌸 Petal', level: 'Empathetic', note: 'Contextual interviews, usability tests, mental model analysis', color: 'bg-[#FFF1F1] dark:bg-[#2A1618] border-[#FF6B6B]', glow: '#FF6B6B' },
    { id: 'motion', branch: 'design', name: 'Motion & Micro-interactions', type: '🌸 Petal', level: 'Fluent', note: 'Choreographed spring dynamics, sensory haptic feedback', color: 'bg-[#FFF1F1] dark:bg-[#2A1618] border-[#FF6B6B]', glow: '#FF6B6B' },
    
    // Branch 2: Frontend (Leaves)
    { id: 'react', branch: 'frontend', name: 'React 18 / 19 & Next.js', type: '🌿 Leaf', level: 'Core', note: 'Server components, streaming SSR, custom hooks, performant DOM', color: 'bg-[#F0FDF4] dark:bg-[#122822] border-[#4ECDC4]', glow: '#4ECDC4' },
    { id: 'tailwind', branch: 'frontend', name: 'Tailwind CSS', type: '🌿 Leaf', level: 'Master', note: 'Fluid typography, responsive spacing scales, CSS custom variables', color: 'bg-[#F0FDF4] dark:bg-[#122822] border-[#4ECDC4]', glow: '#4ECDC4' },
    { id: 'framer', branch: 'frontend', name: 'Framer Motion', type: '🌿 Leaf', level: 'Expert', note: 'Physics springs, shared layout animations, gesture controls', color: 'bg-[#F0FDF4] dark:bg-[#122822] border-[#4ECDC4]', glow: '#4ECDC4' },
    { id: 'ts', branch: 'frontend', name: 'TypeScript', type: '🌿 Leaf', level: 'Solid', note: 'Strict type safety, generic interfaces, zero-runtime bugs', color: 'bg-[#F0FDF4] dark:bg-[#122822] border-[#4ECDC4]', glow: '#4ECDC4' },

    // Branch 3: Backend (Stems)
    { id: 'fastapi', branch: 'backend', name: 'Python & FastAPI', type: '🍃 Stem', level: 'Proficient', note: 'Async REST endpoints, Pydantic data validation, high throughput', color: 'bg-[#F5F3FF] dark:bg-[#1E1630] border-[#B388FF]', glow: '#B388FF' },
    { id: 'node', branch: 'backend', name: 'Node.js & Express', type: '🍃 Stem', level: 'Proficient', note: 'Middleware architecture, authentication security, microservices', color: 'bg-[#F5F3FF] dark:bg-[#1E1630] border-[#B388FF]', glow: '#B388FF' },
    { id: 'postgres', branch: 'backend', name: 'PostgreSQL & Supabase', type: '🍃 Stem', level: 'Solid', note: 'Relational data modeling, pgvector extensions, Row Level Security', color: 'bg-[#F5F3FF] dark:bg-[#1E1630] border-[#B388FF]', glow: '#B388FF' },
    { id: 'ws', branch: 'backend', name: 'WebSockets', type: '🍃 Stem', level: 'Realtime', note: 'Low-latency multiplayer sync, live event broadcasting', color: 'bg-[#F5F3FF] dark:bg-[#1E1630] border-[#B388FF]', glow: '#B388FF' },

    // Branch 4: AI (Solar Blooms)
    { id: 'prompting', branch: 'ai', name: 'Prompt Engineering', type: '🌺 Bloom', level: 'Specialist', note: 'Chain-of-thought, few-shot conditioning, structured JSON outputs', color: 'bg-[#FFFBEB] dark:bg-[#282110] border-[#FFE66D]', glow: '#FFE66D' },
    { id: 'rag', branch: 'ai', name: 'LangChain & Vector RAG', type: '🌺 Bloom', level: 'Builder', note: 'Cosine similarity embeddings, contextual semantic retrieval', color: 'bg-[#FFFBEB] dark:bg-[#282110] border-[#FFE66D]', glow: '#FFE66D' },
    { id: 'gemini', branch: 'ai', name: 'Google Gemini 1.5 & OpenAI', type: '🌺 Bloom', level: 'Integrated', note: 'Multimodal vision parsing, function calling, streaming tokens', color: 'bg-[#FFFBEB] dark:bg-[#282110] border-[#FFE66D]', glow: '#FFE66D' }
  ];

  const visibleLeaves = selectedBranch === 'all'
    ? leavesData
    : leavesData.filter(l => l.branch === selectedBranch);

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      
      {/* Delicate floral ambient background glows */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#4ECDC4]/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-[#FF6B6B]/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4ECDC4]/15 text-[#4ECDC4] text-xs font-mono font-medium">
            <span>🌿 Organic Skill Ecosystem</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-slate-900 dark:text-white">
            The Botanical <span className="font-serif italic text-[#4ECDC4]">Tree of Craft</span>
          </h2>
          <p className="text-xs sm:text-sm font-light text-slate-600 dark:text-slate-400">
            Skills grown organically through real projects. Each flower, petal, leaf, and stem represents a craft honed with care.
          </p>

          {/* Branch Filter Pills */}
          <div className="pt-4 flex flex-wrap justify-center gap-2">
            {branches.map((b) => (
              <button
                key={b.id}
                onClick={() => {
                  playClick();
                  setSelectedBranch(b.id);
                }}
                className={`px-4 py-1.5 rounded-full text-xs font-mono font-medium transition-all border ${
                  selectedBranch === b.id
                    ? `${b.color} border-transparent shadow-sm scale-105`
                    : 'bg-white dark:bg-canvas-cardDark text-slate-600 dark:text-slate-400 border-black/10 dark:border-white/10 hover:border-black/30'
                }`}
              >
                {b.name}
              </button>
            ))}
          </div>
        </div>

        {/* The Botanical Garden Canvas */}
        <div className="p-6 sm:p-12 rounded-3xl bg-white/60 dark:bg-canvas-cardDark/40 border border-black/10 dark:border-white/10 shadow-soft backdrop-blur-sm space-y-8">
          
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-b border-black/5 dark:border-white/5 pb-3">
            <span>// BLOOMING SKILL LEAVES ({visibleLeaves.length} ITEMS)</span>
            <span>Hover or tap a leaf to inspect notes</span>
          </div>

          {/* Leaves / Petals Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {visibleLeaves.map((leaf, index) => {
              const isSelected = activeLeaf === leaf.id;

              return (
                <motion.div
                  key={leaf.id}
                  layout
                  whileHover={{ scale: 1.04, y: -4 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => {
                    playSticker();
                    setActiveLeaf(isSelected ? null : leaf.id);
                  }}
                  className={`p-5 rounded-3xl border cursor-pointer transition-all ${leaf.color} ${
                    isSelected ? 'shadow-lg ring-2 ring-black/15 dark:ring-white/20' : 'shadow-sm hover:shadow-md'
                  } space-y-3 relative overflow-hidden`}
                >
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="opacity-75">{leaf.type}</span>
                    <span className="font-semibold px-2 py-0.5 rounded-full bg-white/80 dark:bg-black/40 text-[10px]">
                      {leaf.level}
                    </span>
                  </div>

                  <h3 className="text-base font-semibold text-slate-900 dark:text-white leading-snug">
                    {leaf.name}
                  </h3>

                  <p className="text-xs font-light text-slate-600 dark:text-slate-300 leading-relaxed">
                    {leaf.note}
                  </p>

                  {/* Leaf Vein Bottom Accent Line */}
                  <div className="pt-2 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-[10px] font-mono opacity-60">
                    <span>Rooted & Verified</span>
                    <span>✦</span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom Nature Summary */}
          <div className="pt-4 border-t border-black/5 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#4ECDC4] animate-pulse" />
              <span>Cultivated with real user testing & clean git trees</span>
            </div>
            <a
              href="#projects"
              onClick={() => playClick()}
              className="text-[#FF6B6B] hover:underline flex items-center gap-1 font-medium"
            >
              <span>See where these skills grew into projects</span>
              <ArrowRight size={13} />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};
