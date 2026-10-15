import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Lightbulb, Folder, Layers, Sparkles, Code, 
  Palette, Cpu, RefreshCw, CheckCircle2 
} from 'lucide-react';
import { skillsInventory } from '../data/portfolioData';
import { playClick, playPop, playSticker } from '../utils/sound';

export const InteractiveSkillsDrawer = () => {
  const [lampOn, setLampOn] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [activeCategory, setActiveCategory] = useState('design');

  const categories = [
    { id: 'design', label: '🎨 UI/UX & Figma', color: 'text-[#FF6B6B]', bg: 'bg-[#FF6B6B]/10 border-[#FF6B6B]/30' },
    { id: 'frontend', label: '💻 Frontend & Motion', color: 'text-[#4ECDC4]', bg: 'bg-[#4ECDC4]/10 border-[#4ECDC4]/30' },
    { id: 'backend', label: '⚙️ Backend Systems', color: 'text-[#B388FF]', bg: 'bg-[#B388FF]/10 border-[#B388FF]/30' },
    { id: 'ai', label: '✨ AI & Prompt Engines', color: 'text-[#FFE66D]', bg: 'bg-[#FFE66D]/20 border-[#FFE66D]/40' }
  ];

  const toggleLamp = () => {
    playPop();
    setLampOn(!lampOn);
  };

  const toggleDrawer = () => {
    playSticker();
    setDrawerOpen(!drawerOpen);
  };

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-slate-50/60 dark:bg-canvas-cardDark/20 border-y border-black/5 dark:border-white/5">
      
      {/* Studio Lamp Spotlight Beam (when lamp is on) */}
      {lampOn && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-96 bg-gradient-to-b from-[#FFE66D]/25 via-[#FFE66D]/5 to-transparent pointer-events-none blur-2xl transition-opacity duration-700" />
      )}

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Section Heading & Interactive Lamp / Drawer Triggers */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B388FF]/15 text-[#B388FF] text-xs font-mono font-medium mb-3">
              <span>✦ Interactive Studio Organiser</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-slate-900 dark:text-white">
              Studio Drawer & <span className="font-serif italic text-[#FFE66D] dark:text-[#FFE66D]">Desk Lamp</span>
            </h2>
            <p className="text-xs sm:text-sm font-light text-slate-600 dark:text-slate-400 max-w-md mt-1">
              Toggle the studio lamp to illuminate the workspace or pull open the drawer trays to inspect skills.
            </p>
          </div>

          {/* Interactive Desk Switches */}
          <div className="flex items-center gap-2">
            
            {/* Lamp Toggle */}
            <button
              onClick={toggleLamp}
              className={`px-4 py-2 rounded-full text-xs font-mono font-medium border transition-all flex items-center gap-1.5 ${
                lampOn
                  ? 'bg-[#FFE66D] text-black border-black/30 shadow-sm'
                  : 'bg-white dark:bg-canvas-cardDark text-slate-500 border-black/10'
              }`}
            >
              <Lightbulb size={13} className={lampOn ? "fill-black" : ""} />
              <span>{lampOn ? "Lamp: On" : "Lamp: Off"}</span>
            </button>

            {/* Drawer Toggle */}
            <button
              onClick={toggleDrawer}
              className={`px-4 py-2 rounded-full text-xs font-mono font-medium border transition-all flex items-center gap-1.5 ${
                drawerOpen
                  ? 'bg-black text-white dark:bg-white dark:text-black border-black shadow-sm'
                  : 'bg-white dark:bg-canvas-cardDark text-slate-500 border-black/10'
              }`}
            >
              <Folder size={13} />
              <span>{drawerOpen ? "Drawer: Open" : "Drawer: Closed"}</span>
            </button>

          </div>
        </div>

        {/* The Studio Desk Drawer Container */}
        <div className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-canvas-cardDark border border-black/10 dark:border-white/10 shadow-soft space-y-8">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 border-b border-black/5 dark:border-white/5 pb-4">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => {
                  playClick();
                  setActiveCategory(c.id);
                  if (!drawerOpen) setDrawerOpen(true);
                }}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all border ${
                  activeCategory === c.id
                    ? `${c.bg} ${c.color} shadow-sm font-semibold`
                    : 'bg-slate-50 dark:bg-canvas-dark text-slate-600 dark:text-slate-400 border-transparent hover:border-black/10'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Drawer Tray Content */}
          <AnimatePresence mode="wait">
            {drawerOpen ? (
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                {skillsInventory[activeCategory].map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    whileHover={{ scale: 1.03, y: -3 }}
                    onClick={() => playPop()}
                    className="p-4 rounded-2xl bg-slate-50/80 dark:bg-canvas-dark/60 border border-black/5 dark:border-white/5 hover:border-black/20 dark:hover:border-white/20 transition-all cursor-pointer space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                        {skill.name}
                      </h4>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white dark:bg-canvas-cardDark border border-black/10 dark:border-white/10 text-slate-600 dark:text-slate-300">
                        {skill.level}
                      </span>
                    </div>

                    <p className="text-xs font-light text-slate-500 dark:text-slate-400 leading-relaxed">
                      {skill.note}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="py-12 text-center space-y-3 font-mono text-xs text-slate-400">
                <div>🗄️ Studio drawer compartment is currently pushed in.</div>
                <button
                  onClick={() => setDrawerOpen(true)}
                  className="px-4 py-1.5 rounded-full bg-black text-white dark:bg-white dark:text-black font-sans text-xs"
                >
                  Pull Open Drawer ↗
                </button>
              </div>
            )}
          </AnimatePresence>

          {/* Drawer Bottom Handle Visual */}
          <div className="pt-4 border-t border-black/5 dark:border-white/5 flex items-center justify-center">
            <div 
              onClick={toggleDrawer}
              className="w-32 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700 hover:bg-[#FFE66D] cursor-pointer transition-colors shadow-inner"
              title="Click drawer pull handle"
            />
          </div>

        </div>

      </div>
    </section>
  );
};
