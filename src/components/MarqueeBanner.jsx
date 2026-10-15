import React from 'react';
import { Sparkles, Layers, Cpu, Terminal, Palette, Zap } from 'lucide-react';

export const MarqueeBanner = () => {
  const row1 = [
    { text: "UI/UX RESEARCH", icon: Palette },
    { text: "DESIGN SYSTEMS", icon: Layers },
    { text: "FIGMA POWER USER", icon: Sparkles },
    { text: "MICRO-INTERACTIONS", icon: Zap },
    { text: "ACCESSIBLE WCAG AAA", icon: Palette },
    { text: "INFORMATION ARCHITECTURE", icon: Layers },
    { text: "WIREFRAMING & PROTOTYPING", icon: Sparkles }
  ];

  const row2 = [
    { text: "REACT & NEXT.JS", icon: Terminal },
    { text: "TYPESCRIPT", icon: Cpu },
    { text: "TAILWIND CSS & MOTION", icon: Zap },
    { text: "PYTHON FASTAPI", icon: Terminal },
    { text: "GENERATIVE AI & PROMPTS", icon: Cpu },
    { text: "NODE.JS & POSTGRESQL", icon: Terminal },
    { text: "FULL-STACK CRAFT", icon: Zap }
  ];

  return (
    <div className="py-6 overflow-hidden border-y-2 border-black dark:border-white/20 bg-lime-neon text-black select-none shadow-neo-sm">
      
      {/* Row 1: Forward Marquee */}
      <div className="flex whitespace-nowrap overflow-hidden">
        <div className="flex animate-marquee items-center gap-8 font-syne font-black text-sm uppercase tracking-wider py-1">
          {[...row1, ...row1, ...row1, ...row1].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex items-center gap-3">
                <Icon size={15} className="text-black fill-black" />
                <span>{item.text}</span>
                <span className="text-black/40 font-mono">✦</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Row 2: Reverse Marquee */}
      <div className="flex whitespace-nowrap overflow-hidden mt-1.5 pt-1.5 border-t border-black/15">
        <div className="flex animate-marquee-reverse items-center gap-8 font-mono font-bold text-xs uppercase tracking-widest py-1">
          {[...row2, ...row2, ...row2, ...row2].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex items-center gap-3">
                <Icon size={13} className="text-black" />
                <span>{item.text}</span>
                <span className="text-black/40">✦</span>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
