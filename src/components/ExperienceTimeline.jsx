import React from 'react';
import { Calendar, MapPin, Award, CheckCircle2, Star, Quote } from 'lucide-react';
import { journeyTimeline, testimonials } from '../data/portfolioData';

export const ExperienceTimeline = () => {
  return (
    <section id="journey" className="py-24 relative overflow-hidden bg-grid-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs font-mono font-bold uppercase tracking-wider">
            <Award size={13} />
            <span>Milestones & Proven Track Record</span>
          </div>

          <h2 className="font-syne font-extrabold text-3xl sm:text-5xl text-black dark:text-white tracking-tight">
            The Journey So Far.
          </h2>

          <p className="font-sans text-sm sm:text-base text-slate-600 dark:text-slate-400">
            From humble beginnings crafting paper wireframes to winning hackathons and architecting full-stack AI experiences.
          </p>
        </div>

        {/* Timeline Layout */}
        <div className="relative max-w-4xl mx-auto space-y-8">
          
          {/* Vertical Track Line */}
          <div className="absolute left-4 sm:left-1/2 top-4 bottom-4 w-0.5 bg-black/15 dark:bg-white/15 -translate-x-1/2 hidden sm:block" />

          {journeyTimeline.map((item, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={index}
                className={`relative flex flex-col sm:flex-row items-center gap-6 ${
                  isEven ? 'sm:flex-row-reverse' : ''
                }`}
              >
                
                {/* Center Node Indicator */}
                <div className="hidden sm:flex absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white dark:bg-paper-cardDark border-2 border-black dark:border-white/20 shadow-neo-sm items-center justify-center text-xs font-mono font-bold z-10">
                  {index + 1}
                </div>

                {/* Timeline Card */}
                <div className="w-full sm:w-1/2">
                  <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-paper-cardDark border-2 border-black dark:border-white/15 shadow-neo relative overflow-hidden space-y-4 hover:translate-y-[-2px] transition-all">
                    
                    {/* Stamp */}
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-full bg-black/5 dark:bg-white/10 text-xs font-mono font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                        <Calendar size={12} />
                        <span>{item.period || 'Log Record'}</span>
                      </span>

                      <span className="stamp px-2 py-0.5 text-xs text-brand-orange border-brand-orange">
                        {item.stamp}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-syne font-bold text-xl text-black dark:text-white">
                        {item.role}
                      </h3>
                      <div className="font-mono text-xs text-brand-purple dark:text-purple-300 mt-0.5">
                        {item.place}
                      </div>
                    </div>

                    <p className="font-sans text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Highlights bullet list */}
                    <div className="space-y-1.5 pt-2 border-t border-black/10 dark:border-white/10">
                      {item.highlights.map((hl, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs font-sans text-slate-700 dark:text-slate-300">
                          <CheckCircle2 size={14} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                          <span>{hl}</span>
                        </div>
                      ))}
                    </div>

                  </div>
                </div>

                {/* Empty spacing for symmetric desktop split */}
                <div className="hidden sm:block w-1/2" />

              </div>
            );
          })}

        </div>

        {/* Peer Love / Testimonials Section */}
        <div className="mt-24 pt-16 border-t-2 border-black/10 dark:border-white/10">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
              // PEER LOVE & COLLABORATION
            </span>
            <h3 className="font-syne font-bold text-2xl sm:text-3xl mt-1 text-black dark:text-white">
              What collaborators say about Sakshi
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="polaroid rounded-2xl border border-black/10 dark:border-white/10 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <Quote size={24} className="text-brand-orange opacity-60" />
                  <p className="font-sans text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed italic">
                    "{t.quote}"
                  </p>
                </div>

                <div className="pt-3 border-t border-black/10 dark:border-white/10 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-lime-neon text-black font-mono font-bold text-xs flex items-center justify-center border border-black shadow-sm">
                    {t.avatar}
                  </div>
                  <div>
                    <h5 className="font-syne font-bold text-xs text-black dark:text-white">
                      {t.author}
                    </h5>
                    <p className="font-mono text-[10px] text-slate-500">
                      {t.role} • {t.company}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
