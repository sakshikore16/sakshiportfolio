import React, { useState } from 'react';
import { Palette, Code2, Server, Sparkles, Check, Layers, Cpu } from 'lucide-react';
import { skillsData } from '../data/portfolioData';
import { playClick } from '../utils/sound';

export const SkillsBento = () => {
  const [activeCategory, setActiveCategory] = useState('design');

  const categories = [
    { key: 'design', label: 'UI/UX Design', icon: Palette, color: 'text-brand-orange' },
    { key: 'frontend', label: 'Frontend Dev', icon: Code2, color: 'text-lime-neon' },
    { key: 'backend', label: 'Backend & Cloud', icon: Server, color: 'text-brand-purple' },
    { key: 'ai', label: 'AI & Tools', icon: Sparkles, color: 'text-brand-cyan' }
  ];

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-paper-light dark:bg-paper-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-cyan/10 border border-brand-cyan/30 text-brand-cyan dark:text-cyan-300 text-xs font-mono font-bold uppercase tracking-wider mb-3">
              <span>✦ Technical Superpowers & Arsenal</span>
            </div>
            <h2 className="font-syne font-extrabold text-3xl sm:text-5xl text-black dark:text-white tracking-tight">
              Tools I Master, <br />
              <span className="text-brand-purple dark:text-purple-400">Craft I Obsess Over.</span>
            </h2>
          </div>

          <p className="font-sans text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-md">
            I don’t just memorize syntax — I understand the fundamental principles behind typography scale, layout mathematics, browser repaint cycles, and resilient distributed backends.
          </p>
        </div>

        {/* Category Pill Selectors */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = activeCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => {
                  playClick();
                  setActiveCategory(cat.key);
                }}
                className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl font-syne font-bold text-xs sm:text-sm transition-all border-2 ${
                  isSelected
                    ? 'bg-black text-white dark:bg-white dark:text-black border-black shadow-neo-sm translate-y-[-2px]'
                    : 'bg-white dark:bg-paper-cardDark text-slate-700 dark:text-slate-300 border-black/10 dark:border-white/10 hover:border-black/30'
                }`}
              >
                <Icon size={16} className={isSelected ? 'text-lime-neon dark:text-black' : cat.color} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillsData[activeCategory].skills.map((skill, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-white dark:bg-paper-cardDark border-2 border-black dark:border-white/15 shadow-neo hover:translate-y-[-2px] transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-syne font-bold text-lg text-black dark:text-white">
                    {skill.name}
                  </h4>
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-black/5 dark:bg-white/10 text-slate-700 dark:text-slate-300">
                    {skill.level}%
                  </span>
                </div>

                <p className="font-sans text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                  {skill.detail}
                </p>
              </div>

              {/* Progress bar */}
              <div>
                <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    style={{ width: `${skill.level}%` }}
                    className="h-full bg-gradient-to-r from-lime-neon via-brand-coral to-brand-purple rounded-full"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Bento Banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-black text-white border-2 border-black dark:border-white/20 shadow-neo flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-xs font-mono text-lime-neon uppercase font-bold tracking-wider">
              ✦ CORE PRINCIPLE
            </span>
            <h4 className="font-syne font-bold text-xl sm:text-2xl">
              Always accessible. Always responsive. Zero unnecessary bloat.
            </h4>
            <p className="font-sans text-xs text-slate-400">
              Clean code that your engineering peers enjoy reading, wrapped in UI that users naturally love clicking.
            </p>
          </div>

          <a
            href="#projects"
            onClick={() => playClick()}
            className="flex-shrink-0 px-6 py-3 rounded-xl bg-lime-neon text-black font-syne font-bold text-xs shadow-neo-sm hover:scale-105 transition-transform"
          >
            See Them In Action ↗
          </a>
        </div>

      </div>
    </section>
  );
};
