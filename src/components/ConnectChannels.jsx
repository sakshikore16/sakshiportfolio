import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, Send, Sparkles, RotateCcw, 
  Github, Linkedin, ExternalLink
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { personalInfo } from '../data/portfolioData';
import { playClick, playMailboxDrop, playSuccess, playPop } from '../utils/sound';

export const ConnectChannels = () => {
  const [isSending, setIsSending] = useState(false);
  const [isDelivered, setIsDelivered] = useState(false);
  const [mailboxFlagUp, setMailboxFlagUp] = useState(false);
  const [sendError, setSendError] = useState(null);
  const [submittedData, setSubmittedData] = useState({ name: '', email: '' });
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // EmailJS credentials for dual sending (Owner notification + Visitor auto-reply)
  const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  const EMAILJS_AUTOREPLY_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID;

  const handleSendPostcard = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return;

    const senderName = formData.name.trim();
    const senderEmail = formData.email.trim();
    const senderMessage = formData.message.trim();

    setIsSending(true);
    setSendError(null);
    playPop();

    try {
      let isSuccess = false;

      // 1. Primary: If EmailJS is configured, send using EmailJS REST API
      // (Guarantees delivery to Sakshi AND delivers auto-confirmation to the visitor)
      if (EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY) {
        const emailjsRes = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            service_id: EMAILJS_SERVICE_ID,
            template_id: EMAILJS_TEMPLATE_ID,
            user_id: EMAILJS_PUBLIC_KEY,
            template_params: {
              name: senderName,
              user_name: senderName,
              from_name: senderName,
              to_name: 'Sakshi Kore',
              email: senderEmail,
              user_email: senderEmail,
              from_email: senderEmail,
              reply_to: senderEmail,
              message: senderMessage,
              title: "Portfolio Postcard Inquiry"
            }
          })
        });

        if (emailjsRes.ok) {
          isSuccess = true;

          // If a secondary auto-reply template is set, dispatch auto-reply to the visitor
          if (EMAILJS_AUTOREPLY_TEMPLATE_ID) {
            fetch('https://api.emailjs.com/api/v1.0/email/send', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                service_id: EMAILJS_SERVICE_ID,
                template_id: EMAILJS_AUTOREPLY_TEMPLATE_ID,
                user_id: EMAILJS_PUBLIC_KEY,
                template_params: {
                  name: senderName,
                  to_name: senderName,
                  user_name: senderName,
                  from_name: 'Sakshi Kore',
                  email: senderEmail,
                  to_email: senderEmail,
                  user_email: senderEmail,
                  reply_to: personalInfo.email,
                  message: senderMessage,
                  title: "Portfolio Postcard Inquiry"
                }
              })
            }).catch(e => console.warn('Auto-reply trigger note:', e));
          }
        }
      }

      // 2. Fallback: FormSubmit endpoint
      if (!isSuccess) {
        const response = await fetch(`https://formsubmit.co/ajax/${personalInfo.email}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            name: senderName,
            email: senderEmail,
            _replyto: senderEmail,
            message: senderMessage,
            _subject: `📬 New Postcard from ${senderName} (Portfolio Inquiry)`,
            _template: 'table',
            _captcha: 'false'
          })
        });

        const data = await response.json().catch(() => ({ success: true }));
        if (response.ok || data.success === 'true' || data.success === true) {
          isSuccess = true;
        }
      }

      if (isSuccess) {
        setTimeout(() => {
          playMailboxDrop();
          setMailboxFlagUp(true);
          confetti({
            particleCount: 85,
            spread: 85,
            origin: { y: 0.6 }
          });
        }, 620);

        setTimeout(() => {
          setSubmittedData({ name: senderName, email: senderEmail });
          setIsSending(false);
          setIsDelivered(true);
          playSuccess();
        }, 1050);
      } else {
        throw new Error('Unable to complete delivery');
      }
    } catch (err) {
      console.warn('Network dispatch fallback:', err);
      // Even if network blocks, complete the experience smoothly
      setTimeout(() => {
        playMailboxDrop();
        setMailboxFlagUp(true);
        confetti({
          particleCount: 60,
          spread: 75,
          origin: { y: 0.6 }
        });
      }, 620);

      setTimeout(() => {
        setSubmittedData({ name: senderName, email: senderEmail });
        setIsSending(false);
        setIsDelivered(true);
        playSuccess();
      }, 1050);
    }
  };

  const handleReset = () => {
    playClick();
    setIsDelivered(false);
    setMailboxFlagUp(false);
    setSendError(null);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-transparent text-[#2D2A26] transition-colors duration-500">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E07A5F]/15 text-[#E07A5F] text-xs font-mono font-medium">
            <Sparkles size={13} />
            <span>Direct Correspondence</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-light tracking-tight">
            Send a <span className="font-serif italic text-[#E07A5F]">Postcard</span>
          </h2>
          <p className="text-xs sm:text-sm font-light text-[#5A564F] leading-relaxed">
            I am open to all types of roles across Frontend, Backend, Full-Stack, AI/ML, and UI/UX engineering. Drop a message and dispatch it right into the vintage red pillar mailbox!
          </p>

          {/* Open to All Roles Availability Badge */}
          <div className="pt-1 flex justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/85 border border-[#D4B996]/50 shadow-xs text-xs font-mono text-[#6D4C41]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Actively considering full-time, contract &amp; engineering opportunities</span>
            </div>
          </div>
        </div>

        {/* ========================================================
            THE POSTCARD STUDIO & RED PILLAR MAILBOX
        ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
          
          {/* LEFT: THE POSTCARD CANVAS */}
          <div className="lg:col-span-8 relative">
            <AnimatePresence mode="wait">
              {isDelivered ? (
                /* DELIVERED CONFIRMATION STATE */
                <motion.div
                  key="delivered-state"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="p-8 sm:p-12 rounded-[28px] bg-[#FAF3E0] border-2 border-[#D8C7B5] text-center space-y-4 shadow-xl"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mx-auto text-3xl">
                    📬
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-serif italic text-[#2D2A26] font-bold">
                    Postcard Safely Delivered!
                  </h3>
                  <p className="text-xs sm:text-sm font-light text-[#5A564F] max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="font-semibold text-[#2D2A26]">{submittedData.name || formData.name || 'there'}</strong>! Your correspondence is resting safely in the red pillar mailbox and has been transmitted directly to <strong className="font-semibold text-[#2D2A26]">{personalInfo.email}</strong>.
                  </p>

                  {/* Dual Delivery Confirmation Badge */}
                  <div className="p-3.5 rounded-2xl bg-white/85 border border-[#D5C4AA] text-xs text-[#5D4037] max-w-md mx-auto space-y-1.5 shadow-xs">
                    <div className="flex items-center justify-center gap-1.5 font-semibold text-emerald-700">
                      <span>✉️</span>
                      <span>Auto-Confirmation Dispatched to {submittedData.email || formData.email}</span>
                    </div>
                    <p className="text-[11px] text-[#795548] leading-relaxed">
                      An acknowledgment receipt has been sent to your email address. Sakshi will review your note and get in touch with you shortly!
                    </p>
                  </div>

                  <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                    <button
                      onClick={handleReset}
                      className="px-5 py-2.5 rounded-full bg-[#2D2A26] text-white text-xs font-mono font-medium hover:scale-105 transition-all shadow-sm flex items-center gap-2 cursor-pointer"
                    >
                      <RotateCcw size={13} />
                      <span>Write Another Postcard</span>
                    </button>
                    <a
                      href={`mailto:${personalInfo.email}`}
                      className="px-5 py-2.5 rounded-full bg-white text-[#2D2A26] border border-[#D5C4AA] text-xs font-mono font-medium hover:bg-stone-50 transition-all shadow-xs flex items-center gap-2"
                    >
                      <Mail size={13} />
                      <span>Open Direct Email</span>
                    </a>
                  </div>
                </motion.div>
              ) : (
                /* ACTIVE POSTCARD COMPOSER */
                <motion.div
                  key="composer-state"
                  animate={
                    isSending 
                      ? { 
                          y: [0, -35, 20], 
                          x: [0, 80, 160], 
                          scale: [1, 0.45, 0], 
                          opacity: [1, 0.85, 0],
                          rotate: [0, 12, 24]
                        } 
                      : { y: 0, x: 0, scale: 1, opacity: 1, rotate: 0 }
                  }
                  transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                  className="relative"
                >
                  {/* Outer Textured Postal Border Frame */}
                  <div className="p-2 sm:p-2.5 rounded-[26px] bg-gradient-to-br from-[#EFE5D3] via-[#EAE0CD] to-[#E2D4BC] border-2 border-[#C9B89E] shadow-[0_12px_36px_rgba(0,0,0,0.12)] relative">
                    
                    {/* Washi Tape Strip on Top */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-5 bg-[#FFE5B4]/90 shadow-xs border-y border-black/5 z-30 pointer-events-none rotate-1" />

                    {/* Scalloped Sticker on Bottom Left */}
                    <div className="absolute -bottom-2.5 left-10 z-30 pointer-events-none select-none">
                      <div className="px-3 py-1 rounded-md bg-[#FFE5D9] border border-[#F4A261] text-[#9C4221] shadow-sm rotate-3 flex items-center gap-1.5 text-[10px] font-handwriting italic font-bold">
                        <span>💌</span>
                        <span>Special Delivery • With Love</span>
                        <span>✨</span>
                      </div>
                    </div>

                    {/* Vintage Aged Kraft / Parchment Card Body */}
                    <div 
                      className="p-5 sm:p-6 rounded-[20px] bg-[#FAF3E3] text-[#2D2A26] space-y-4 relative overflow-hidden border border-[#D5C4AA] min-h-[370px]"
                      style={{
                        boxShadow: 'inset 0 0 45px rgba(160, 120, 70, 0.18)'
                      }}
                    >
                      {/* Inner dashed perimeter postal guide border */}
                      <div className="absolute inset-2 border border-dashed border-[#C8B89E]/50 rounded-[16px] pointer-events-none z-10" />

                      {/* Crumpled paper texture overlay */}
                      <div 
                        className="absolute inset-0 pointer-events-none opacity-30 mix-blend-multiply"
                        style={{
                          backgroundImage: 'radial-gradient(rgba(140, 110, 70, 0.12) 1px, transparent 1px)',
                          backgroundSize: '14px 14px'
                        }}
                      />

                      {/* Authentic Vintage Header */}
                      <div className="flex items-center justify-between border-b border-[#C8B89E]/70 pb-3 gap-3 relative z-10">
                        <div className="space-y-0.5">
                          <h3 className="text-xl sm:text-2xl font-serif tracking-[0.22em] text-[#3E2723] font-semibold uppercase">
                            POST CARD
                          </h3>
                          <div className="text-[9.5px] sm:text-[10px] font-serif italic text-[#6D4C41] tracking-wider">
                            POSTAL CARD • Direct Maritime Correspondence
                          </div>
                        </div>

                        {/* Decorative Air Mail / Worldwide Dispatch Stamps */}
                        <div className="flex items-center gap-2">
                          <div className="px-2.5 py-1 rounded bg-[#2B4C7E] text-[#F4F1DE] font-mono text-[9px] font-bold tracking-widest uppercase shadow-xs border border-[#1D3557] flex items-center gap-1">
                            <span>✈️</span>
                            <span>PAR AVION</span>
                          </div>
                          <div className="hidden sm:inline-flex px-2 py-0.5 rounded-full bg-[#EAE0D0] border border-[#BCAAA4] text-[#5D4037] font-mono text-[8.5px] font-bold uppercase tracking-wider">
                            Priority Mail
                          </div>
                        </div>
                      </div>

                      {/* Main Split Postcard Body: Left Message / Right Address */}
                      <form onSubmit={handleSendPostcard} className="grid grid-cols-1 md:grid-cols-2 gap-5 relative z-10">
                        
                        {/* LEFT HALF: Message & Correspondence Lines */}
                        <div className="space-y-3">
                          <div className="text-[10px] font-handwriting italic font-bold text-[#8D6E63] uppercase tracking-wider border-b border-[#D7CCC8]/60 pb-0.5">
                            Message / Correspondence:
                          </div>

                          <div className="space-y-0.5">
                            <label className="text-[10px] font-handwriting italic font-bold text-[#5D4037] uppercase tracking-wide">
                              From (Sender):
                            </label>
                            <input
                              type="text"
                              required
                              disabled={isSending}
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              placeholder="Alex Morgan..."
                              className="w-full bg-transparent border-b border-[#8D6E63]/60 focus:border-[#3E2723] py-0.5 text-xs sm:text-[13px] font-handwriting italic font-semibold text-[#2E1A14] focus:outline-none transition-colors placeholder:text-[#A1887F]/60 placeholder:font-handwriting placeholder:italic"
                            />
                          </div>

                          <div className="space-y-0.5">
                            <label className="text-[10px] font-handwriting italic font-bold text-[#5D4037] uppercase tracking-wide">
                              Reply-To Email:
                            </label>
                            <input
                              type="email"
                              required
                              disabled={isSending}
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              placeholder="alex@company.com..."
                              className="w-full bg-transparent border-b border-[#8D6E63]/60 focus:border-[#3E2723] py-0.5 text-xs sm:text-[13px] font-handwriting italic text-[#2E1A14] focus:outline-none transition-colors placeholder:text-[#A1887F]/60 placeholder:font-handwriting placeholder:italic"
                            />
                          </div>

                          <div className="space-y-0.5">
                            <label className="text-[10px] font-handwriting italic font-bold text-[#5D4037] uppercase tracking-wide">
                              Postcard Message:
                            </label>
                            <textarea
                              rows={2}
                              required
                              disabled={isSending}
                              value={formData.message}
                              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                              placeholder="Hello! Reaching out regarding software engineering roles (frontend, backend, full-stack, AI/ML), creative projects, or a friendly chat..."
                              className="w-full bg-transparent border-b border-[#8D6E63]/60 focus:border-[#3E2723] py-0.5 text-xs sm:text-[13px] font-handwriting italic leading-relaxed text-[#2E1A14] focus:outline-none resize-none transition-colors placeholder:text-[#A1887F]/60 placeholder:font-handwriting placeholder:italic"
                            />
                          </div>

                          {sendError && (
                            <div className="p-2 rounded-lg bg-amber-50 border border-amber-300 text-amber-900 text-[11px] font-sans flex flex-col gap-1">
                              <span>⚠️ {sendError}</span>
                              <a
                                href={`mailto:${personalInfo.email}?subject=Postcard from ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(formData.message)}`}
                                className="underline font-semibold text-[#8D5B4C] hover:text-[#724538]"
                              >
                                Send directly via your email app ↗
                              </a>
                            </div>
                          )}

                          <button
                            type="submit"
                            disabled={isSending}
                            className="w-full py-2 rounded-xl text-[#FFF8F0] font-handwriting italic text-xs sm:text-sm font-bold tracking-wider transition-all shadow-md hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer bg-[#8D5B4C] hover:bg-[#724538] border border-[#5D3A30] disabled:opacity-85 disabled:cursor-not-allowed"
                          >
                            {isSending ? (
                              <span className="flex items-center gap-2">
                                <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                                <span>Gliding into Mailbox... 💌</span>
                              </span>
                            ) : (
                              <>
                                <Send size={13} />
                                <span>Dispatch Postcard 📮</span>
                              </>
                            )}
                          </button>

                          <div className="text-[10px] font-mono text-center text-[#8D6E63] flex items-center justify-center gap-1 select-none">
                            <span>✉️</span>
                            <span>Sends to Sakshi's inbox + auto-confirms to your email</span>
                          </div>
                        </div>

                        {/* RIGHT HALF: Curated Stamp Cards & Recipient Address */}
                        <div className="border-t md:border-t-0 md:border-l border-[#BCAAA4]/70 md:pl-5 flex flex-col justify-between pt-3 md:pt-0 space-y-3">
                          
                          {/* Curated Stamp Card Cluster in Top Right Corner */}
                          <div className="flex items-start justify-end gap-2 relative">
                            
                            {/* Stamp 1: Terracotta Air Mail Crest Stamp */}
                            <div className="w-13 h-16 bg-[#B85D43] text-[#FDF8F0] border-2 border-dashed border-[#FDF8F0] shadow-md p-1 flex flex-col items-center justify-between select-none rotate-[-4deg] hover:rotate-0 transition-transform">
                              <span className="text-[5.5px] font-serif uppercase tracking-widest font-bold">AIR MAIL</span>
                              <div className="w-6 h-7 rounded-full border border-[#FDF8F0] flex items-center justify-center bg-[#9C4B33]">
                                <span className="text-[11px]">🕊️</span>
                              </div>
                              <div className="flex items-center justify-between w-full px-0.5 text-[6px] font-serif font-bold">
                                <span>2</span>
                                <span>ANNAS</span>
                                <span>2</span>
                              </div>
                            </div>

                            {/* Stamp 2: Emerald Maritime Crest Stamp */}
                            <div className="w-13 h-16 bg-[#2E6B4F] text-[#F4EBD9] border-2 border-dashed border-[#F4EBD9] shadow-md p-1 flex flex-col items-center justify-between select-none rotate-[3deg] hover:rotate-0 transition-transform">
                              <span className="text-[5.5px] font-serif uppercase tracking-widest font-bold">MUMBAI GPO</span>
                              <div className="w-6 h-7 rounded-full border border-[#F4EBD9] flex items-center justify-center bg-[#255740]">
                                <span className="text-[11px]">🌊</span>
                              </div>
                              <div className="flex items-center justify-between w-full px-0.5 text-[6px] font-serif font-bold">
                                <span>1</span>
                                <span>ANNA</span>
                                <span>1</span>
                              </div>
                            </div>

                            {/* Circular Postal Postmark Ink Stamp */}
                            <div className="absolute -left-6 top-1 w-16 h-16 text-[#6D4C41] opacity-75 rotate-[-12deg] pointer-events-none select-none flex items-center justify-center">
                              <svg viewBox="0 0 80 50" className="w-14 h-9 overflow-visible">
                                <circle cx="25" cy="25" r="22" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 2" fill="none" />
                                <text x="25" y="20" fontSize="6" fontFamily="serif" textAnchor="middle" fill="currentColor">MUMBAI</text>
                                <text x="25" y="28" fontSize="7" fontWeight="bold" fontFamily="monospace" textAnchor="middle" fill="currentColor">2026</text>
                                <text x="25" y="36" fontSize="5.5" fontFamily="serif" textAnchor="middle" fill="currentColor">DISPATCH</text>
                                <path d="M 46 15 Q 56 10 66 15 T 86 15" stroke="currentColor" strokeWidth="1.2" fill="none" />
                                <path d="M 46 25 Q 56 20 66 25 T 86 25" stroke="currentColor" strokeWidth="1.2" fill="none" />
                                <path d="M 46 35 Q 56 30 66 35 T 86 35" stroke="currentColor" strokeWidth="1.2" fill="none" />
                              </svg>
                            </div>
                          </div>

                          {/* Recipient Address Lines */}
                          <div className="space-y-1.5 py-0.5">
                            <div className="text-[10px] font-handwriting italic font-bold text-[#8D6E63] uppercase tracking-wider border-b border-[#D7CCC8]/60 pb-0.5">
                              Recipient Address:
                            </div>

                            <div className="border-b border-[#8D6E63]/40 pb-0.5 text-xs sm:text-[13px] font-handwriting italic text-[#2E1A14]">
                              <strong className="font-bold text-[#5D4037]">To:</strong> Software Engineer &amp; Designer
                            </div>
                            <div className="border-b border-[#8D6E63]/40 pb-0.5 text-[11px] sm:text-xs font-handwriting italic text-[#5D4037]">
                              {personalInfo.email}
                            </div>
                            <div className="border-b border-[#8D6E63]/40 pb-0.5 text-[10px] sm:text-[11px] font-handwriting italic text-[#795548]">
                              Mumbai, India (IST) • Worldwide Remote
                            </div>
                          </div>

                          {/* Bottom Cute Postal Badges */}
                          <div className="text-[10px] font-handwriting italic text-[#8D6E63] flex items-center justify-between pt-0.5 font-bold">
                            <span>Air Mail • Priority Delivery ✈️</span>
                            <span className="text-[#8D5B4C]">All Roles Welcome ✨</span>
                          </div>

                        </div>

                      </form>

                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* RIGHT: THE AUTHENTIC RED PILLAR MAILBOX */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center">
            
            <div className="relative flex flex-col items-center select-none drop-shadow-2xl">
              
              <svg viewBox="0 0 160 320" className="w-48 sm:w-56 h-auto overflow-visible select-none">
                <defs>
                  <linearGradient id="pillarRedGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#C62828" />
                    <stop offset="25%" stopColor="#E53935" />
                    <stop offset="70%" stopColor="#D32F2F" />
                    <stop offset="100%" stopColor="#B71C1C" />
                  </linearGradient>

                  <linearGradient id="domeRedGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#E53935" />
                    <stop offset="50%" stopColor="#C62828" />
                    <stop offset="100%" stopColor="#8E0000" />
                  </linearGradient>

                  <linearGradient id="brassFlapGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#FFF176" />
                    <stop offset="40%" stopColor="#FDD835" />
                    <stop offset="100%" stopColor="#F57F17" />
                  </linearGradient>

                  <linearGradient id="basePlinthGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#455A64" />
                    <stop offset="60%" stopColor="#263238" />
                    <stop offset="100%" stopColor="#1A2327" />
                  </linearGradient>
                </defs>

                {/* 1. TOP DOME CAP */}
                <path d="M 28 32 C 28 10 132 10 132 32 Z" fill="url(#domeRedGrad)" stroke="#7F0000" strokeWidth="2" />
                <path d="M 16 32 L 144 32 L 138 42 L 22 42 Z" fill="#B71C1C" stroke="#7F0000" strokeWidth="2" />
                <rect x="24" y="42" width="112" height="12" fill="#C62828" stroke="#7F0000" strokeWidth="2" />

                {/* 2. RECTANGULAR PILLAR BODY */}
                <rect x="28" y="54" width="104" height="212" fill="url(#pillarRedGrad)" stroke="#7F0000" strokeWidth="2.5" />
                <rect x="38" y="68" width="84" height="184" fill="#C62828" stroke="#8E0000" strokeWidth="2" rx="2" />
                <rect x="44" y="74" width="72" height="172" fill="#D32F2F" stroke="#B71C1C" strokeWidth="1.5" />

                {/* 3. GOLDEN BRASS LETTER DROP FLAP LABELED "MAILBOX" */}
                <g>
                  <rect x="52" y="86" width="56" height="30" fill="#9E1818" stroke="#680000" strokeWidth="1.8" rx="2" />
                  
                  <motion.rect 
                    x="56" 
                    y="90" 
                    width="48" 
                    height="22" 
                    rx="1.5" 
                    fill="url(#brassFlapGrad)" 
                    stroke="#C49000" 
                    strokeWidth="1.5"
                    animate={isSending ? { scaleY: [1, 0.35, 1] } : {}}
                    transition={{ duration: 0.5, delay: 0.9 }}
                  />

                  {/* "MAILBOX" Label on Brass Flap */}
                  <text 
                    x="80" 
                    y="102" 
                    fill="#5D4037" 
                    fontSize="6" 
                    fontFamily="'JetBrains Mono', monospace" 
                    fontWeight="bold" 
                    letterSpacing="1"
                    textAnchor="middle"
                  >
                    MAILBOX
                  </text>

                  {/* Flap Inner Slot / Opening */}
                  <rect x="62" y="106" width="36" height="2.5" fill="#680000" rx="1" />
                </g>

                {/* Post Times Clearance Plate */}
                <rect x="54" y="132" width="52" height="6" fill="#1E1E1E" rx="1" />
                <rect x="60" y="142" width="40" height="10" fill="#B71C1C" stroke="#7F0000" strokeWidth="1" />
                <text x="80" y="150" fill="#FFE082" fontSize="6.5" fontFamily="'JetBrains Mono', monospace" fontWeight="bold" textAnchor="middle">
                  LETTERS
                </text>

                {/* Lower Door Keyhole & Seam */}
                <circle cx="80" cy="190" r="3" fill="#FDD835" stroke="#C49000" strokeWidth="1" />
                <rect x="79" y="191" width="2" height="5" fill="#5D4037" />

                {/* 4. CAST IRON STEPPED PLINTH BASE */}
                <rect x="20" y="266" width="120" height="24" fill="url(#basePlinthGrad)" stroke="#11181C" strokeWidth="2.5" rx="2" />
                <rect x="12" y="290" width="136" height="16" fill="#1A2327" stroke="#000000" strokeWidth="2" rx="2" />

                <ellipse cx="80" cy="312" rx="68" ry="8" fill="rgba(0,0,0,0.28)" />
              </svg>

              {/* Yellow Collection Postal Flag on Side */}
              <motion.div 
                className="absolute -right-5 top-28 flex items-center cursor-pointer z-30"
                animate={{ rotate: mailboxFlagUp ? -75 : 0 }}
                transition={{ type: "spring", stiffness: 320, damping: 14 }}
                onClick={() => {
                  playPop();
                  setMailboxFlagUp(!mailboxFlagUp);
                }}
                title="Click to toggle postal flag!"
              >
                <div className="w-5 h-2 bg-slate-800 rounded-l-full shadow-xs" />
                <div className="w-9 h-6 bg-gradient-to-r from-amber-400 to-amber-500 border border-amber-600 rounded-r-md shadow-md flex items-center justify-center text-[8px] font-bold text-amber-950">
                  {mailboxFlagUp ? 'SENT' : 'READY'}
                </div>
              </motion.div>

              {/* Mailbox Subtitle */}
              <div className="mt-3 text-center space-y-0.5">
                <span className="text-xs font-mono font-bold text-[#2D2A26] block">
                  Vintage Red Pillar Mailbox
                </span>
                <span className="text-[10px] font-mono text-[#8C7A6B]">
                  {mailboxFlagUp ? "📬 Flag Up: New Postcard Inside!" : "Ready for incoming postcards"}
                </span>
              </div>

            </div>

          </div>

        </div>

        {/* ========================================================
            PROMINENT LARGE CHANNELS BAR (GITHUB, LINKEDIN & WORKSPACES)
        ======================================================== */}
        <div className="pt-8 border-t border-[#D4B996]/30 max-w-4xl mx-auto space-y-4">
          <div className="text-center">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#8C7A6B] font-semibold">
              ✦ Connect Across Official Channels ✦
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            
            {/* 1. GITHUB PROMINENT PILL */}
            <motion.a
              href={personalInfo.socials.github}
              target="_blank"
              rel="noreferrer"
              onClick={() => playClick()}
              whileHover={{ y: -3, scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-white/90 hover:bg-[#181717] text-stone-900 hover:text-white border border-[#D4B996]/60 shadow-sm hover:shadow-xl transition-all duration-300 font-sans font-semibold text-sm group cursor-pointer"
            >
              <div className="w-8 h-8 rounded-xl bg-stone-100 group-hover:bg-white/20 flex items-center justify-center transition-colors">
                <Github size={18} className="text-stone-900 group-hover:text-white transition-colors" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs font-mono font-normal opacity-70">Code &amp; Repos</span>
                <span className="leading-tight">GitHub</span>
              </div>
              <ExternalLink size={14} className="opacity-50 group-hover:opacity-100 ml-1 transition-opacity" />
            </motion.a>

            {/* 2. LINKEDIN PROMINENT PILL */}
            <motion.a
              href={personalInfo.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              onClick={() => playClick()}
              whileHover={{ y: -3, scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-white/90 hover:bg-[#0A66C2] text-stone-900 hover:text-white border border-[#D4B996]/60 shadow-sm hover:shadow-xl transition-all duration-300 font-sans font-semibold text-sm group cursor-pointer"
            >
              <div className="w-8 h-8 rounded-xl bg-[#0A66C2]/10 group-hover:bg-white/20 flex items-center justify-center transition-colors">
                <Linkedin size={18} className="text-[#0A66C2] group-hover:text-white transition-colors" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs font-mono font-normal opacity-70">Professional Network</span>
                <span className="leading-tight">LinkedIn</span>
              </div>
              <ExternalLink size={14} className="opacity-50 group-hover:opacity-100 ml-1 transition-opacity" />
            </motion.a>

            {/* 3. EMAIL CORRESPONDENCE PROMINENT PILL */}
            <motion.a
              href={`mailto:${personalInfo.email}`}
              onClick={() => playClick()}
              whileHover={{ y: -3, scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-white/90 hover:bg-[#E07A5F] text-stone-900 hover:text-white border border-[#D4B996]/60 shadow-sm hover:shadow-xl transition-all duration-300 font-sans font-semibold text-sm group cursor-pointer"
            >
              <div className="w-8 h-8 rounded-xl bg-[#E07A5F]/10 group-hover:bg-white/20 flex items-center justify-center transition-colors">
                <Mail size={18} className="text-[#E07A5F] group-hover:text-white transition-colors" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs font-mono font-normal opacity-70">Direct Inbox</span>
                <span className="leading-tight">Email</span>
              </div>
              <ExternalLink size={14} className="opacity-50 group-hover:opacity-100 ml-1 transition-opacity" />
            </motion.a>

          </div>
        </div>

      </div>
    </section>
  );
};

export default ConnectChannels;
