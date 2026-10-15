import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, Sparkles, Mail, ExternalLink, Heart } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { playClick, playPop } from '../utils/sound';

// Live Cursive "Sakshi" Signature Matching Reference Image
const SignatureAnimation = () => {
  return (
    <div className="relative w-64 h-24 select-none flex items-center">
      {/* Container with handwriting cursive reveal */}
      <div className="relative w-full overflow-hidden">
        {/* Animated handwriting stroke reveal revealing exact cursive Sakshi signature */}
        <motion.div
          initial={{ clipPath: 'inset(0% 100% 0% 0%)' }}
          whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <img
            src="/sakshi-signature.png"
            alt="Sakshi Signature"
            className="w-56 h-auto select-none pointer-events-none mix-blend-multiply"
            loading="eager"
          />
        </motion.div>

        {/* Golden Sparkling Tip Star trailing the pen stroke */}
        <motion.div
          initial={{ left: '0%', opacity: 0, scale: 0 }}
          whileInView={{
            left: ['0%', '20%', '45%', '70%', '92%'],
            opacity: [0, 1, 1, 1, 0.85],
            scale: [0, 1.2, 0.9, 1.3, 1.4]
          }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-1/2 -translate-y-1/2 pointer-events-none z-10"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.95)]" fill="currentColor">
            <path d="M12 0 C12 6.5 17.5 12 24 12 C17.5 12 12 17.5 12 24 C12 17.5 6.5 12 0 12 C6.5 12 12 6.5 12 0 Z"/>
          </svg>
        </motion.div>
      </div>
    </div>
  );
};

export const Footer = () => {
  const scrollToTop = () => {
    playPop();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-[#FAF8F5] via-[#FDF0ED] to-[#FCE7E4] border-t border-[#F2DDD5] text-[#2D2A26] transition-colors duration-500 pt-8 pb-6 px-6">
      
      {/* ========================================================
          TOP BORDER STRING OF GLOWING GOLDEN FAIRY LIGHTS (#FFD166)
      ======================================================== */}
      <div className="absolute top-0 inset-x-0 w-full overflow-hidden pointer-events-none select-none z-20">
        <svg viewBox="0 0 1200 36" className="w-full h-8 overflow-visible" preserveAspectRatio="none" fill="none">
          {/* Drooping fairy light cord */}
          <path 
            d="M 0 10 Q 100 24 200 10 Q 300 24 400 10 Q 500 24 600 10 Q 700 24 800 10 Q 900 24 1000 10 Q 1100 24 1200 10" 
            stroke="#9C8B7D" 
            strokeWidth="1.2" 
          />

          {/* Fairy Light Bulbs Hanging from Troughs and Peaks */}
          {[
            [100, 24, 0.4], [200, 10, 0.9], [300, 24, 1.3], [400, 10, 0.2], 
            [500, 24, 1.7], [600, 10, 0.6], [700, 24, 1.1], [800, 10, 0.5], 
            [900, 24, 1.5], [1000, 10, 0.8], [1100, 24, 1.2]
          ].map(([cx, cy, delay], idx) => (
            <g key={idx}>
              {/* Socket cap */}
              <rect x={cx - 1.5} y={cy} width="3" height="3" fill="#6B5E52" rx="0.5" />
              {/* Glowing bulb */}
              <circle cx={cx} cy={cy + 5} r="3.5" fill="#FFD166" className="drop-shadow-[0_0_8px_rgba(255,209,102,0.95)]">
                <animate 
                  attributeName="opacity" 
                  values="0.45;1;0.45" 
                  dur="2.4s" 
                  begin={`${delay}s`} 
                  repeatCount="indefinite" 
                />
                <animate 
                  attributeName="r" 
                  values="3;4;3" 
                  dur="2.4s" 
                  begin={`${delay}s`} 
                  repeatCount="indefinite" 
                />
              </circle>
              {/* Inner bright white filament */}
              <circle cx={cx} cy={cy + 5} r="1.2" fill="#FFFDF0" />
            </g>
          ))}
        </svg>
      </div>

      <div className="max-w-6xl mx-auto space-y-7 relative z-10 pt-3">
        
        {/* Top: Header, Live Cursive Signature & Back to Window Button */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-[#EED7CE] pb-6">
          
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2 text-xs font-mono text-rose-700/80 tracking-wider">
              <Sparkles size={12} className="text-amber-500" />
              <span>Sakshi Kore • Mumbai Studio Edition</span>
            </div>

            {/* Headline in Warm Charcoal Serif */}
            <h3 className="font-serif italic text-2xl sm:text-4xl text-[#2D2A26] tracking-tight">
              Thanks for stopping by my studio! ✨
            </h3>

            {/* Authentic Live Animated "Sakshi" Signature */}
            <div className="pt-1 space-y-1">
              <SignatureAnimation />
              <p className="text-[11px] font-sans text-stone-500">
                Designed & coded with thoughtful care in Mumbai, India 🌊
              </p>
            </div>
          </div>

          {/* Action: Rounded pill [ ↑ Back to the Window ] */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -3, scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 350, damping: 20 }}
            className="group flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/95 text-[#2D2A26] border border-[#F0D5CF] shadow-xs hover:shadow-md hover:border-rose-300 transition-all font-sans text-xs font-semibold cursor-pointer whitespace-nowrap self-start md:self-center"
          >
            <span>Back to the Window</span>
            <motion.span
              animate={{ y: [0, -3, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            >
              <ArrowUp size={14} className="text-rose-500 group-hover:text-rose-600 transition-colors" />
            </motion.span>
          </motion.button>
        </div>

        {/* Middle: Compact 4 Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-xs font-sans">
          
          {/* Col 1: Direct Contact */}
          <div className="space-y-2.5">
            <span className="font-mono text-[11px] uppercase tracking-wider text-rose-800/80 font-semibold">
              Direct Contact
            </span>
            <div className="space-y-2">
              <p className="text-stone-600 text-xs leading-relaxed">
                Feel free to drop a line directly into my inbox:
              </p>
              <a
                href={`mailto:${personalInfo.email}`}
                onClick={() => playClick()}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/90 border border-[#F0D5CF] hover:border-rose-400 text-stone-800 font-mono text-[11px] transition-all shadow-2xs hover:shadow"
              >
                <Mail size={13} className="text-rose-500" />
                <span className="underline decoration-rose-300 underline-offset-2">{personalInfo.email}</span>
              </a>
              <div className="flex items-center gap-2 pt-0.5 text-[11px] text-stone-500">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Available for high-impact roles</span>
              </div>
            </div>
          </div>

          {/* Col 2: Studio Map */}
          <div className="space-y-2.5">
            <span className="font-mono text-[11px] uppercase tracking-wider text-rose-800/80 font-semibold">
              Studio Map
            </span>
            <ul className="space-y-1.5 text-stone-600 text-[11px]">
              <li>
                <a href="#hero" onClick={() => playClick()} className="hover:text-rose-600 transition-colors flex items-center gap-1.5">
                  <span className="text-rose-400">✦</span> Arched Studio Window
                </a>
              </li>
              <li>
                <a href="#about" onClick={() => playClick()} className="hover:text-rose-600 transition-colors flex items-center gap-1.5">
                  <span className="text-rose-400">✦</span> Curated Scrapbook
                </a>
              </li>
              <li>
                <a href="#experience" onClick={() => playClick()} className="hover:text-rose-600 transition-colors flex items-center gap-1.5">
                  <span className="text-rose-400">✦</span> Physical Study Desk
                </a>
              </li>
              <li>
                <a href="#skills" onClick={() => playClick()} className="hover:text-rose-600 transition-colors flex items-center gap-1.5">
                  <span className="text-rose-400">✦</span> Skills Chest Drawers
                </a>
              </li>
              <li>
                <a href="#projects" onClick={() => playClick()} className="hover:text-rose-600 transition-colors flex items-center gap-1.5">
                  <span className="text-rose-400">✦</span> Selected Projects
                </a>
              </li>
              <li>
                <a href="#contact" onClick={() => playClick()} className="hover:text-rose-600 transition-colors flex items-center gap-1.5">
                  <span className="text-rose-400">✦</span> Send Postcard
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Online Spaces */}
          <div className="space-y-2.5">
            <span className="font-mono text-[11px] uppercase tracking-wider text-rose-800/80 font-semibold">
              Online Spaces
            </span>
            <ul className="space-y-1.5 text-stone-600 text-[11px]">
              {Object.entries(personalInfo.socials).map(([platform, url]) => (
                <li key={platform}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => playClick()}
                    className="capitalize hover:text-rose-600 transition-colors inline-flex items-center gap-1.5"
                  >
                    <span className="text-rose-400">✦</span> {platform}
                    <ExternalLink size={10} className="opacity-40" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Studio Note */}
          <div className="space-y-2.5">
            <span className="font-mono text-[11px] uppercase tracking-wider text-rose-800/80 font-semibold">
              Studio Motto
            </span>
            <div className="p-3.5 rounded-2xl bg-white/90 border border-[#F0D5CF] space-y-1.5 shadow-2xs">
              <div className="font-caveat text-lg sm:text-xl text-[#2D2A26] leading-snug">
                “Never lose the playful curiosity that made you want to build things.”
              </div>
              <div className="text-[10px] font-mono text-stone-500">
                — Sakshi Kore
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Subtext & Copyright Line */}
        <div className="pt-3 border-t border-[#EED7CE] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-mono text-stone-600">
          <div>
            © {new Date().getFullYear()} Sakshi Kore. Handcrafted with thoughtful care in Mumbai, India 🌊
          </div>
          <div className="flex items-center gap-2">
            <span>IST (UTC+5:30)</span>
            <span>•</span>
            <div className="flex items-center gap-1">
              <span>Made with</span>
              <Heart size={11} className="text-rose-500 fill-rose-500" />
              <span>in Mumbai, India</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
