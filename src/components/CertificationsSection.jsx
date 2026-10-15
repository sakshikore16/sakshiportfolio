import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, ShieldCheck, ExternalLink, X, Sparkles, Trophy, FileText } from 'lucide-react';
import { certificationsAndWinnings } from '../data/portfolioData';
import { playClick, playPop, playSuccess } from '../utils/sound';

export const CertificationsSection = () => {
  const [selectedCert, setSelectedCert] = useState(null);

  const handleOpenModal = (cert) => {
    playPop();
    setSelectedCert(cert);
  };

  const handleCloseModal = () => {
    playClick();
    setSelectedCert(null);
  };

  // Lock background scroll and auto-hide floating island navbar when certification modal is open
  useEffect(() => {
    if (selectedCert) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      document.body.classList.add('modal-open');

      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          handleCloseModal();
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = originalOverflow;
        document.body.classList.remove('modal-open');
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [selectedCert]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 24
      }
    }
  };

  return (
    <section id="certifications" className="py-24 relative overflow-hidden bg-transparent border-y border-[#D4B996]/30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E07A5F]/15 text-[#E07A5F] text-xs font-mono font-medium">
            <Sparkles size={13} />
            <span>Honors &amp; Credentials</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-[#2D2A26]">
            Certifications &amp; <span className="font-serif italic text-[#E07A5F]">Achievements</span>
          </h2>
          <p className="text-xs sm:text-sm font-light text-[#5A564F]">
            Click any certificate or hackathon achievement to inspect credentials, verification links, and certificates.
          </p>
        </div>

        {/* Certifications & Winnings Grid (2x2 Balanced Cards) */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-4xl mx-auto"
        >
          {certificationsAndWinnings.map((item, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              whileHover={{ y: -4, scale: 1.015 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => handleOpenModal(item)}
              className={`cursor-pointer group p-6 rounded-3xl bg-white/80 backdrop-blur-md border-l-4 ${item.color} border-y border-r border-[#D4B996]/40 shadow-xs hover:shadow-md hover:border-[#D4B996] transition-all space-y-3 relative overflow-hidden flex flex-col justify-between`}
            >
              {/* Top sheen line */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none" />

              <div className="space-y-3 relative z-10">
                <div className="flex items-center justify-between text-xs font-mono text-[#8C7A6B]">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${item.accentBg}`}>
                    {item.type}
                  </span>
                  <span>{item.date}</span>
                </div>

                <h3 className="text-base font-semibold text-[#2D2A26] leading-snug group-hover:text-[#E07A5F] transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#D4B996]/20 flex items-center justify-between relative z-10">
                <span className="text-[11px] font-mono text-emerald-800 flex items-center gap-1 font-semibold truncate max-w-[70%]">
                  <ShieldCheck size={13} className="shrink-0 text-emerald-600" />
                  <span className="truncate">{item.badge}</span>
                </span>
                <span className="text-xs font-mono text-[#8C7A6B] group-hover:text-[#E07A5F] flex items-center gap-1 transition-colors shrink-0">
                  <span>View</span>
                  <span>→</span>
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>

      {/* Certificate / Winning Preview Modal */}
      <AnimatePresence>
        {selectedCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="absolute inset-0 bg-black/40 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-2xl bg-[#FAF8F5] backdrop-blur-xl rounded-3xl shadow-2xl border border-[#D4B996]/60 overflow-hidden z-10 flex flex-col max-h-[90vh]"
            >
              <div className="px-6 py-4 border-b border-[#D4B996]/30 flex items-center justify-between bg-black/[0.02]">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  <span className="ml-2 text-xs font-mono text-[#8C7A6B]">credential_proof_{selectedCert.type.toLowerCase()}.pdf</span>
                </div>
                <button
                  onClick={handleCloseModal}
                  className="p-1 rounded-full hover:bg-black/5 text-[#8C7A6B] cursor-pointer transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
                
                {/* Visual Certificate / Document Preview if Available */}
                {selectedCert.image && (
                  <div className="rounded-2xl overflow-hidden border-2 border-[#D4B996]/50 shadow-md bg-stone-100 max-h-72">
                    <img 
                      src={selectedCert.image} 
                      alt={selectedCert.title} 
                      className="w-full h-auto max-h-72 object-contain mx-auto"
                    />
                  </div>
                )}

                <div className="p-6 rounded-2xl bg-white/80 border border-[#D4B996]/40 shadow-inner relative overflow-hidden">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#E07A5F] font-bold block mb-1">
                        {selectedCert.type === 'Winning' ? 'Competition Award' : 'Verified Certification'}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-serif italic text-[#2D2A26] font-bold leading-tight">
                        {selectedCert.title}
                      </h3>
                      <p className="text-xs font-mono text-[#5A564F] mt-1.5">
                        Issuer: <strong className="text-[#2D2A26]">{selectedCert.issuer}</strong> • {selectedCert.date}
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-[#E07A5F]/10 border border-[#E07A5F]/30 flex items-center justify-center text-[#E07A5F] shrink-0">
                      {selectedCert.type === 'Winning' ? <Trophy size={24} /> : <Award size={24} />}
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-[#D4B996]/20 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-800 font-semibold">
                      ✓ {selectedCert.badge}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-[#8C7A6B]">
                    Achievement Details
                  </h4>
                  <p className="text-sm font-sans text-stone-700 leading-relaxed bg-white/60 p-4 rounded-xl border border-[#D4B996]/30">
                    {selectedCert.description}
                  </p>
                </div>
              </div>

              <div className="px-6 py-4 border-t border-[#D4B996]/30 flex items-center justify-between bg-black/[0.02]">
                {selectedCert.credentialUrl ? (
                  <a
                    href={selectedCert.credentialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-xs font-mono font-medium text-[#E07A5F] hover:underline"
                  >
                    <span>Verify at Official Credential Source</span>
                    <ExternalLink size={12} />
                  </a>
                ) : (
                  <span className="text-xs font-mono text-stone-500">Official Tech Competition Award</span>
                )}
                <button
                  onClick={handleCloseModal}
                  className="px-5 py-2 rounded-full bg-[#2D2A26] text-white text-xs font-mono font-medium hover:scale-105 transition-all cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default CertificationsSection;
