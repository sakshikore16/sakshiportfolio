import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, X, ExternalLink, Calendar, Briefcase, Award } from 'lucide-react';
import { educationAndExperience } from '../data/portfolioData';
import { playDrawerOpen, playPop, playClick } from '../utils/sound';

export const ExperienceDrawer = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeExpModal, setActiveExpModal] = useState(null);

  const experienceItems = educationAndExperience.filter(e => e.type !== 'Education');

  const toggleDrawer = () => {
    playDrawerOpen();
    setIsOpen(!isOpen);
  };

  const handleOpenFolder = (e, item) => {
    e.stopPropagation();
    playPop();
    setActiveExpModal(item);
  };

  return (
    <section id="experience-drawer" className="py-24 relative overflow-hidden bg-[#FAF6F0] dark:bg-[#11131A] border-y border-black/5 dark:border-white/5">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4ECDC4]/15 text-[#4ECDC4] text-xs font-mono font-medium">
            <span>🗄️ Studio Desk Furniture</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-slate-900 dark:text-white">
            The Interactive <span className="font-serif italic text-[#4ECDC4]">Work Drawer</span>
          </h2>
          <p className="text-xs sm:text-sm font-light text-slate-600 dark:text-slate-400">
            Click the wooden drawer handle to pull it open with sound. The actual work folders physically pop out!
          </p>
        </div>

        {/* 3D Realistic Wooden Desk Cabinet */}
        <div className="relative max-w-2xl mx-auto" style={{ perspective: 1200 }}>
          
          {/* Wooden Cabinet Top Surface */}
          <div className="h-10 rounded-t-3xl bg-gradient-to-r from-[#6b4226] via-[#8c5632] to-[#6b4226] border-t-2 border-x-2 border-[#422817] shadow-md relative">
            {/* Tabletop bevel & wood grains */}
            <div className="absolute inset-x-4 top-2 h-1 bg-[#a3653b]/40 rounded-full" />
            <div className="absolute top-2 right-6 px-2.5 py-0.5 rounded-full bg-black/30 text-amber-200 text-[10px] font-mono">
              SOLID OAK • STUDIO DRAWER
            </div>
          </div>

          {/* Wooden Cabinet Cavity Frame */}
          <div className="rounded-b-3xl bg-[#2b190f] dark:bg-[#0d0704] p-4 sm:p-6 border-b-4 border-x-4 border-[#422817] shadow-2xl relative min-h-[460px] flex flex-col justify-between overflow-hidden">
            
            {/* Inner Drawer Cavity Shadow */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent pointer-events-none" />

            {/* Fanning Out Work Files from Inside the Drawer */}
            <div className="relative z-10 flex-1 flex items-center justify-center min-h-[260px]">
              <AnimatePresence>
                {isOpen ? (
                  <motion.div
                    initial={{ opacity: 0, y: 70, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 70, scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 220, damping: 20 }}
                    className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4"
                  >
                    {experienceItems.map((item, idx) => (
                      <motion.div
                        key={idx}
                        whileHover={{ y: -30, scale: 1.08, zIndex: 40 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={(e) => handleOpenFolder(e, item)}
                        className={`p-5 rounded-2xl bg-[#FFFDF9] dark:bg-[#1E202B] border-2 border-black/15 dark:border-white/20 shadow-2xl cursor-pointer select-none transition-all flex flex-col justify-between space-y-4 relative ${
                          idx === 0 ? 'rotate-[-4deg]' : idx === 1 ? 'rotate-[3deg]' : 'rotate-[-2deg]'
                        }`}
                        title="Click folder to inspect complete responsibilities!"
                      >
                        {/* Metallic Gold Binder Clip on Top */}
                        <div className="absolute -top-3 left-4 w-5 h-7 border-2 border-amber-600 bg-amber-400 rounded-sm shadow-md rotate-[-6deg]" />

                        {/* Manila Folder Tab */}
                        <div className="flex items-center justify-between text-[10px] font-mono pt-1 text-slate-400">
                          <span className="font-bold text-[#FF6B6B]">FOLDER #{idx + 1}</span>
                          <span>{item.period}</span>
                        </div>

                        <div>
                          <h3 className="text-sm font-semibold text-slate-900 dark:text-white leading-snug">
                            {item.role}
                          </h3>
                          <p className="text-xs font-mono text-[#4ECDC4] mt-0.5 truncate">
                            {item.organization}
                          </p>
                        </div>

                        <div className="pt-2 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-[11px] font-mono text-[#FF6B6B] font-medium">
                          <span>Inspect File ↗</span>
                          <span className="text-xs">📂</span>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <div className="text-center font-mono text-xs text-amber-200/70 py-16 space-y-2">
                    <div className="text-3xl mb-2">🔒</div>
                    <div>Drawer is pushed into the cabinet.</div>
                    <div className="text-[11px] opacity-75">Click the brass handle below to slide it open!</div>
                  </div>
                )}
              </AnimatePresence>
            </div>

            {/* The Physical Sliding Wooden Drawer Box with 3D Slide & Brass Handle */}
            <motion.div
              layout
              onClick={toggleDrawer}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              animate={{
                y: isOpen ? 15 : 0,
                rotateX: isOpen ? 12 : 0
              }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              style={{ transformOrigin: "top center" }}
              className={`rounded-2xl cursor-pointer p-5 border-2 transition-all shadow-2xl flex items-center justify-between select-none relative ${
                isOpen
                  ? 'bg-gradient-to-r from-[#945e3a] via-[#b5764a] to-[#945e3a] border-[#5e381f] text-white shadow-[0_20px_35px_rgba(0,0,0,0.4)]'
                  : 'bg-gradient-to-r from-[#7a4c2e] via-[#945e3a] to-[#7a4c2e] border-[#4a2b16] text-amber-100'
              }`}
            >
              {/* Dovetail Joint Marks on Drawer Corners */}
              <div className="absolute left-2 top-2 bottom-2 w-1.5 flex flex-col justify-around">
                <span className="w-1.5 h-1.5 bg-[#422817] rounded-xs" />
                <span className="w-1.5 h-1.5 bg-[#422817] rounded-xs" />
                <span className="w-1.5 h-1.5 bg-[#422817] rounded-xs" />
              </div>

              <div className="pl-3">
                <h4 className="text-sm font-bold tracking-tight text-white flex items-center gap-2">
                  <span>Work Experience Drawer</span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-black/40 text-amber-200">
                    {isOpen ? "EXTENDED" : "CLOSED"}
                  </span>
                </h4>
                <p className="text-[11px] font-mono opacity-85 mt-0.5">
                  {isOpen ? "Click to push drawer in" : "Click handle to pull drawer out with sound!"}
                </p>
              </div>

              {/* Polished Metallic Brass Pull Handle */}
              <div className="w-28 h-6 rounded-full bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 border-2 border-amber-700 shadow-lg flex items-center justify-center">
                <div className="w-20 h-1.5 rounded-full bg-amber-800/50" />
              </div>
            </motion.div>

          </div>

        </div>

      </div>

      {/* Pop-Out Box / Modal Describing Full Experience Details */}
      <AnimatePresence>
        {activeExpModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg rounded-3xl bg-white dark:bg-canvas-cardDark border-2 border-black/15 dark:border-white/20 p-6 sm:p-8 shadow-2xl space-y-6"
            >
              <div className="flex items-start justify-between gap-4 border-b border-black/10 dark:border-white/10 pb-4">
                <div>
                  <span className="text-xs font-mono text-[#FF6B6B] font-bold uppercase tracking-wider">
                    {activeExpModal.period} • {activeExpModal.type}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                    {activeExpModal.role}
                  </h3>
                  <div className="text-xs font-mono text-[#4ECDC4] font-medium">
                    {activeExpModal.organization}
                  </div>
                </div>

                <button
                  onClick={() => setActiveExpModal(null)}
                  className="p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-3">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold block">
                  Deliverables & Achievements:
                </span>
                <ul className="space-y-2">
                  {activeExpModal.points.map((pt, i) => (
                    <li key={i} className="text-xs sm:text-sm font-light text-slate-700 dark:text-slate-300 flex items-start gap-2 leading-relaxed">
                      <CheckCircle2 size={15} className="text-[#4ECDC4] flex-shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-black/10 dark:border-white/10 flex justify-end">
                <button
                  onClick={() => setActiveExpModal(null)}
                  className="px-5 py-2 rounded-full bg-black text-white dark:bg-white dark:text-black text-xs font-mono font-medium"
                >
                  Close Dossier
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};
