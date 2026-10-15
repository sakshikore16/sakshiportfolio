import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Search, Sparkles, BookOpen, Layers, 
  TrendingUp, ExternalLink, ArrowUpRight, CheckCircle2 
} from 'lucide-react';
import { allProjectsArchive } from '../data/portfolioData';
import { playClick, playPop } from '../utils/sound';

export const AllProjectsArchiveModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('aiml');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const tabs = [
    { id: 'aiml', label: '🤖 AIML Projects & LLM Systems', count: allProjectsArchive.aiml.length },
    { id: 'uiux', label: '🎨 UI/UX Case Studies & Systems', count: allProjectsArchive.uiux.length },
    { id: 'research', label: '📄 Research Papers & Publications', count: allProjectsArchive.research.length },
    { id: 'business', label: '📈 Business & Product Strategy', count: allProjectsArchive.business.length },
  ];

  const currentItems = allProjectsArchive[activeTab] || [];
  const filtered = currentItems.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl bg-white dark:bg-canvas-cardDark border border-black/10 dark:border-white/10 shadow-2xl flex flex-col my-auto text-slate-900 dark:text-slate-100">
        
        {/* Sticky Header */}
        <div className="sticky top-0 z-20 p-5 sm:p-6 border-b border-black/10 dark:border-white/10 bg-white/95 dark:bg-canvas-cardDark/95 backdrop-blur-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#FF6B6B] uppercase tracking-wider mb-1">
              <span>✦ Comprehensive Repository</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-light tracking-tight text-slate-900 dark:text-white">
              All Projects, Research Papers & Business Case Files
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                playClick();
                onClose();
              }}
              className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
              title="Close Archive (Esc)"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Filter Navigation & Search */}
        <div className="px-5 sm:px-6 pt-4 pb-2 border-b border-black/5 dark:border-white/5 bg-slate-50 dark:bg-black/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          
          {/* Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  playClick();
                  setActiveTab(tab.id);
                }}
                className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all border ${
                  activeTab === tab.id
                    ? 'bg-black text-white dark:bg-white dark:text-black border-black shadow-sm'
                    : 'bg-white dark:bg-canvas-dark text-slate-600 dark:text-slate-400 border-black/10 dark:border-white/10 hover:border-black/30'
                }`}
              >
                <span>{tab.label}</span>
                <span className="ml-1.5 opacity-60">({tab.count})</span>
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter topics..."
              className="pl-8 pr-3 py-1.5 rounded-full bg-white dark:bg-canvas-dark border border-black/10 dark:border-white/10 text-xs font-mono focus:outline-none focus:border-[#4ECDC4]"
            />
          </div>

        </div>

        {/* Archive Cards Grid */}
        <div className="p-5 sm:p-8 space-y-4 flex-1">
          {filtered.length === 0 ? (
            <div className="py-16 text-center text-xs font-mono text-slate-400">
              No entries found matching "{searchQuery}".
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.id}
                className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-canvas-dark/60 border border-black/5 dark:border-white/5 hover:border-black/20 dark:hover:border-white/20 transition-all space-y-3 shadow-sm"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white">
                      {item.title}
                    </h3>
                  </div>

                  <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-[#4ECDC4]/10 text-[#4ECDC4] border border-[#4ECDC4]/20">
                    {item.impact}
                  </span>
                </div>

                <p className="text-xs sm:text-sm font-light text-slate-600 dark:text-slate-300 leading-relaxed">
                  {item.summary}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-black/5 dark:border-white/5">
                  <div className="flex flex-wrap gap-1.5">
                    {item.tags.map((tag, i) => (
                      <span key={i} className="px-2.5 py-0.5 rounded-md bg-black/5 dark:bg-white/5 text-[11px] font-mono text-slate-600 dark:text-slate-400">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                    <span>Artifact Verified</span>
                    <CheckCircle2 size={12} className="text-emerald-500" />
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-black/10 dark:border-white/10 bg-slate-50 dark:bg-black/20 flex items-center justify-between text-xs font-mono text-slate-500">
          <span>Sakshi Kore • Research & Technical Archive</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-full bg-black text-white dark:bg-white dark:text-black font-sans text-xs"
          >
            Close Archive
          </button>
        </div>

      </div>

    </div>
  );
};
