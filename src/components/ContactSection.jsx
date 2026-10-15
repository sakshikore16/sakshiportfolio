import React, { useState } from 'react';
import { 
  Mail, Copy, Check, Send, Sparkles, ArrowUpRight, 
  Linkedin, Github, Twitter, MessageSquare, Coffee
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { personalInfo } from '../data/portfolioData';
import { playClick, playPop, playSuccess } from '../utils/sound';

export const ContactSection = () => {
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    inquiryType: 'UI/UX Design & Full-Stack',
    message: ''
  });

  const handleCopyEmail = () => {
    playSuccess();
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    playSuccess();
    setSubmitted(true);
    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-paper-light dark:bg-paper-dark border-t-2 border-black dark:border-white/10">
      
      {/* Background radial glow */}
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-lime-neon/15 dark:bg-lime-neon/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime-neon/30 border border-lime-neon/60 text-black dark:text-lime-neon text-xs font-mono font-bold uppercase tracking-wider">
            <Sparkles size={13} />
            <span>Open for Summer / Full-Time & Freelance</span>
          </div>

          <h2 className="font-syne font-extrabold text-4xl sm:text-6xl text-black dark:text-white tracking-tight">
            Let’s Build Something <br />
            <span className="text-brand-orange">Unforgettable.</span>
          </h2>

          <p className="font-sans text-sm sm:text-base text-slate-600 dark:text-slate-300">
            Have an ambitious project, an open role, or just want to geek out over design systems and AI agents? My inbox is always open.
          </p>

          {/* Quick Copy Email Pill */}
          <div className="pt-2 flex justify-center">
            <button
              onClick={handleCopyEmail}
              className="group flex items-center gap-3 px-5 py-3 rounded-2xl bg-white dark:bg-paper-cardDark border-2 border-black dark:border-white/20 shadow-neo hover:translate-x-0.5 hover:-translate-y-0.5 transition-all text-xs sm:text-sm font-mono font-bold text-black dark:text-white"
            >
              <Mail size={16} className="text-brand-orange" />
              <span>{personalInfo.email}</span>
              <span className="px-2 py-0.5 rounded bg-black/5 dark:bg-white/10 text-xs font-sans text-slate-500 flex items-center gap-1">
                {copied ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
                <span>{copied ? 'Copied to Clipboard!' : 'Copy'}</span>
              </span>
            </button>
          </div>
        </div>

        {/* Grid: Form + Quick Connect Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto">
          
          {/* Left: Contact Form (Span 7) */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-white dark:bg-paper-cardDark border-2 border-black dark:border-white/20 shadow-neo">
            {submitted ? (
              <div className="text-center py-12 space-y-4 animate-in fade-in">
                <div className="w-16 h-16 mx-auto rounded-full bg-lime-neon border-2 border-black flex items-center justify-center text-3xl shadow-neo-sm">
                  💌
                </div>
                <h3 className="font-syne font-bold text-2xl text-black dark:text-white">
                  Message Dispatched!
                </h3>
                <p className="font-sans text-sm text-slate-600 dark:text-slate-300 max-w-sm mx-auto">
                  Thank you for reaching out! I've received your note and will get back to you within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', inquiryType: 'UI/UX Design & Full-Stack', message: '' });
                  }}
                  className="px-4 py-2 rounded-xl bg-black dark:bg-lime-neon text-white dark:text-black font-syne font-bold text-xs"
                >
                  Send Another Note
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-mono font-bold text-slate-600 dark:text-slate-400">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Sharma"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/15 dark:border-white/15 text-xs sm:text-sm font-sans focus:outline-none focus:border-brand-purple"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono font-bold text-slate-600 dark:text-slate-400">
                      Your Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@company.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/15 dark:border-white/15 text-xs sm:text-sm font-sans focus:outline-none focus:border-brand-purple"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono font-bold text-slate-600 dark:text-slate-400">
                    What can I help you with?
                  </label>
                  <select
                    value={formData.inquiryType}
                    onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/5 dark:bg-paper-cardDark border border-black/15 dark:border-white/15 text-xs sm:text-sm font-sans focus:outline-none focus:border-brand-purple text-slate-900 dark:text-slate-100"
                  >
                    <option value="UI/UX Design & Full-Stack">UI/UX Design & Full-Stack Engineering</option>
                    <option value="Frontend Development">Frontend & Micro-interactions (React / Next.js)</option>
                    <option value="Full-Time or Internship">Full-Time or Internship Opportunity</option>
                    <option value="AI Product Prototyping">AI Product Prototyping & Design Systems</option>
                    <option value="Coffee & Chat">Virtual Coffee / Mentorship Chat</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono font-bold text-slate-600 dark:text-slate-400">
                    Your Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me a bit about your timeline, vision, or problem..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/15 dark:border-white/15 text-xs sm:text-sm font-sans focus:outline-none focus:border-brand-purple resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-black dark:bg-lime-neon text-white dark:text-black font-syne font-bold text-sm shadow-neo hover:translate-x-0.5 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                >
                  <Send size={15} />
                  <span>Send Message & Fire Confetti</span>
                </button>
              </form>
            )}
          </div>

          {/* Right: Social Presence & Tactile Note (Span 5) */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
            
            {/* Polaroid Note Card */}
            <div className="polaroid rounded-3xl border border-black/10 dark:border-white/15 space-y-4">
              <span className="font-caveat text-2xl font-bold text-slate-800 dark:text-slate-200">
                “I'm usually fastest to reply on email, but feel free to connect on LinkedIn or check out my code on GitHub!”
              </span>
              <div className="pt-2 text-xs font-mono text-slate-500">
                — Sakshi (Based in Mumbai, IST)
              </div>
            </div>

            {/* Social Pills Grid */}
            <div className="space-y-2">
              <div className="text-xs font-mono uppercase text-slate-500 font-bold">
                Online Presence & Portals:
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                {[
                  { name: "LinkedIn", href: personalInfo.socials.linkedin, icon: Linkedin, color: "hover:text-blue-500" },
                  { name: "GitHub", href: personalInfo.socials.github, icon: Github, color: "hover:text-purple-500" },
                  { name: "X / Twitter", href: personalInfo.socials.twitter, icon: Twitter, color: "hover:text-cyan-500" },
                  { name: "Figma Profile", href: personalInfo.socials.figma, icon: Sparkles, color: "hover:text-rose-500" }
                ].map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <a
                      key={i}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => playPop()}
                      className={`p-3 rounded-2xl bg-white dark:bg-paper-cardDark border-2 border-black dark:border-white/15 shadow-neo-sm hover:shadow-neo hover:translate-x-0.5 hover:-translate-y-0.5 transition-all flex items-center justify-between text-xs font-syne font-bold text-slate-800 dark:text-slate-200 ${s.color}`}
                    >
                      <div className="flex items-center gap-2">
                        <Icon size={14} />
                        <span>{s.name}</span>
                      </div>
                      <ArrowUpRight size={13} className="text-slate-400" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Quick Status Note */}
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs font-mono flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>Available for high-impact teams starting 2025/2026.</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
