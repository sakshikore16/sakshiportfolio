import React from 'react';
import { Briefcase, GraduationCap, Award, Calendar, CheckCircle } from 'lucide-react';
import { educationAndExperience } from '../data/portfolioData';

export const EducationExperienceTimeline = () => {
  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4ECDC4]/15 text-[#4ECDC4] text-xs font-mono font-medium">
            <span>✦ Career & Academic Foundation</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-slate-900 dark:text-white">
            Experience & <span className="font-serif italic text-[#4ECDC4]">Education</span>
          </h2>
          <p className="text-xs sm:text-sm font-light text-slate-600 dark:text-slate-400">
            A chronological timeline of roles, research internships, hackathon victories, and degree milestones.
          </p>
        </div>

        {/* Minimal Thin Timeline Track */}
        <div className="relative border-l border-black/10 dark:border-white/10 ml-4 sm:ml-32 space-y-12">
          {educationAndExperience.map((item, idx) => (
            <div key={idx} className="relative pl-6 sm:pl-10 group">
              
              {/* Timeline Indicator Dot */}
              <div className={`absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-2 border-white dark:border-canvas-dark ${item.color} shadow-sm group-hover:scale-125 transition-transform`} />

              {/* Date Tag on Left (Desktop) */}
              <div className="sm:absolute sm:-left-36 sm:top-1 text-xs font-mono text-slate-400 sm:w-28 sm:text-right mb-1 sm:mb-0">
                {item.period}
              </div>

              {/* Content Card */}
              <div className="p-6 rounded-3xl bg-white dark:bg-canvas-cardDark border border-black/5 dark:border-white/5 shadow-soft hover:border-black/20 dark:hover:border-white/20 transition-colors space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white">
                    {item.role}
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-black/5 dark:bg-white/10 text-slate-600 dark:text-slate-300">
                    {item.type}
                  </span>
                </div>

                <div className="text-xs font-mono text-[#FF6B6B]">
                  {item.organization}
                </div>

                <ul className="space-y-1.5 pt-2">
                  {item.points.map((pt, i) => (
                    <li key={i} className="text-xs sm:text-sm font-light text-slate-600 dark:text-slate-400 flex items-start gap-2">
                      <span className="text-[#4ECDC4] mt-1 text-xs">✦</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
