import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Camera, Heart, MapPin, Sparkles, Code, 
  Palette, Terminal, CheckCircle2, X, ChevronRight 
} from 'lucide-react';
import { playClick, playPop, playSticker } from '../utils/sound';

export const AboutPhotoReel = () => {
  const [selectedPhoto, setSelectedPhoto] = useState(0);
  const [activeTab, setActiveTab] = useState('personal');

  const photos = [
    {
      id: 1,
      title: "Keynote at Tech Summit",
      tag: "Tech Event & Speaking",
      location: "Bengaluru, India",
      date: "Fall 2024",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900&auto=format&fit=crop&q=80",
      caption: "Presenting generative design architectures & UI micro-interactions to 200+ engineers.",
      quote: "“The bridge between design and code is empathy for both sides.”",
      color: "border-[#FF6B6B]"
    },
    {
      id: 2,
      title: "Wanderlust & Alpine Trails",
      tag: "Travel & Hiking",
      location: "Himachal Ridges",
      date: "Summer 2024",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=900&auto=format&fit=crop&q=80",
      caption: "Trekking high mountain passes at dawn — catching misty valleys and clearing mental space.",
      quote: "“Nature is the greatest teacher of natural layout and harmonious color balance.”",
      color: "border-[#4ECDC4]"
    },
    {
      id: 3,
      title: "Weekend Culinary Lab",
      tag: "Cooking & Flavors",
      location: "Home Studio",
      date: "Weekends",
      image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=900&auto=format&fit=crop&q=80",
      caption: "Handmade pasta and culinary plating — precision, timing, and sensory feedback, just like UI design.",
      quote: "“Cooking is algorithmic creativity you can actually taste.”",
      color: "border-[#FFE66D]"
    },
    {
      id: 4,
      title: "Hackathon Sprint & 1st Place",
      tag: "36-Hour Adrenaline",
      location: "National Hackathon",
      date: "Winter 2023",
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=900&auto=format&fit=crop&q=80",
      caption: "Debugging React state and training models at 3:00 AM with my team before bringing home 1st place.",
      quote: "“Fast execution with teammates who love what they build is unbeatable.”",
      color: "border-[#B388FF]"
    },
    {
      id: 5,
      title: "Botanical Nature Walks",
      tag: "Botany & Architecture",
      location: "Botanical Reserve",
      date: "Spring 2024",
      image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=900&auto=format&fit=crop&q=80",
      caption: "Observing organic Fibonacci spirals in fern leaves and finding geometric proportions for UI grids.",
      quote: "“Minimalism doesn't mean empty; it means every single element has a heartbeat.”",
      color: "border-[#C7F464]"
    }
  ];

  const current = photos[selectedPhoto];

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-white/40 dark:bg-canvas-cardDark/20 border-y border-black/5 dark:border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF6B6B]/15 text-[#FF6B6B] text-xs font-mono font-medium mb-3">
              <span>✦ Life, Moments & Mindset</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-slate-900 dark:text-white">
              The <span className="font-serif italic text-[#FF6B6B]">Person</span> Behind The Code
            </h2>
            <p className="text-xs sm:text-sm font-light text-slate-600 dark:text-slate-400 max-w-md mt-1">
              Click any photo strip frame below to unfold the story, speaking moments, travels, and culinary experiments.
            </p>
          </div>

          {/* Perspective Toggle */}
          <div className="flex bg-slate-100 dark:bg-canvas-cardDark p-1 rounded-full border border-black/10 dark:border-white/10">
            <button
              onClick={() => {
                playClick();
                setActiveTab('personal');
              }}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                activeTab === 'personal'
                  ? 'bg-white dark:bg-canvas-dark text-black dark:text-white shadow-sm'
                  : 'text-slate-500 hover:text-black dark:hover:text-white'
              }`}
            >
              📷 Photo Strip & Passions
            </button>
            <button
              onClick={() => {
                playClick();
                setActiveTab('tech');
              }}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                activeTab === 'tech'
                  ? 'bg-white dark:bg-canvas-dark text-black dark:text-white shadow-sm'
                  : 'text-slate-500 hover:text-black dark:hover:text-white'
              }`}
            >
              💻 Engineering & Problem Solving
            </button>
          </div>
        </div>

        {/* TAB 1: THE PHOTO STRIP REEL & SPOTLIGHT POLAROID */}
        {activeTab === 'personal' && (
          <div className="space-y-10 animate-in fade-in duration-300">
            
            {/* The Horizontal Photo Strip Reel */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 pb-1">
                <span>// 35MM FILM REEL • TAP A FRAME TO EXPAND</span>
                <span>Frame {selectedPhoto + 1} of {photos.length}</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {photos.map((item, idx) => {
                  const isSelected = selectedPhoto === idx;

                  return (
                    <motion.div
                      key={item.id}
                      whileHover={{ scale: 1.04, y: -4 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => {
                        playSticker();
                        setSelectedPhoto(idx);
                      }}
                      className={`rounded-2xl cursor-pointer p-2 bg-white dark:bg-canvas-cardDark border-2 transition-all relative overflow-hidden ${
                        isSelected 
                          ? `${item.color} shadow-lg ring-2 ring-black/10 dark:ring-white/20` 
                          : 'border-black/10 dark:border-white/10 opacity-70 hover:opacity-100'
                      }`}
                    >
                      {/* Thumbnail Image */}
                      <div className="aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 relative">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-1 left-1.5 px-1.5 py-0.5 rounded-full bg-black/60 text-white text-[9px] font-mono">
                          #{idx + 1}
                        </div>
                      </div>

                      <div className="pt-2 px-1 text-center">
                        <h4 className="text-xs font-semibold truncate text-slate-900 dark:text-white">
                          {item.title}
                        </h4>
                        <p className="text-[10px] font-mono text-slate-500 truncate">
                          {item.tag}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* The Expanded Spotlight Polaroid Card with Realistic Photo & Notes */}
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-canvas-cardDark border border-black/10 dark:border-white/10 shadow-soft grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
              >
                {/* Left: Big Expanded Photo Frame (Span 7) */}
                <div className="md:col-span-7">
                  <div className="polaroid rounded-3xl overflow-hidden border border-black/10 dark:border-white/10 p-3 sm:p-4 bg-white dark:bg-[#181A24] shadow-md space-y-3">
                    <div className="aspect-[16/10] rounded-2xl overflow-hidden bg-slate-900 relative">
                      <img
                        src={current.image}
                        alt={current.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-xs font-mono flex items-center gap-1.5">
                        <MapPin size={12} className="text-[#FF6B6B]" />
                        <span>{current.location}</span>
                        <span>•</span>
                        <span>{current.date}</span>
                      </div>
                    </div>

                    <div className="px-2 pt-1 flex items-center justify-between text-xs font-mono text-slate-500">
                      <span>Artifact: Real Moment</span>
                      <span className="font-serif italic text-sm text-slate-800 dark:text-slate-200">{current.title}</span>
                    </div>
                  </div>
                </div>

                {/* Right: Personal Narrative & Subtitle (Span 5) */}
                <div className="md:col-span-5 space-y-5">
                  <div className="space-y-1">
                    <span className="text-xs font-mono uppercase tracking-widest text-[#FF6B6B] font-bold">
                      {current.tag}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-light text-slate-900 dark:text-white leading-snug">
                      {current.title}
                    </h3>
                  </div>

                  <p className="text-sm font-light text-slate-600 dark:text-slate-300 leading-relaxed">
                    {current.caption}
                  </p>

                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-canvas-dark border border-black/5 dark:border-white/5 space-y-1">
                    <span className="text-[10px] font-mono text-slate-400 uppercase">Personal Reflection</span>
                    <p className="font-serif italic text-base text-slate-900 dark:text-white">
                      {current.quote}
                    </p>
                  </div>

                  <div className="text-xs font-mono text-slate-400 flex items-center gap-2 pt-2">
                    <span>Explore next story in reel</span>
                    <ChevronRight size={14} />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

          </div>
        )}

        {/* TAB 2: TECHNICAL & DESIGN PROBLEM SOLVING MINDSET */}
        {activeTab === 'tech' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in duration-300">
            
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-canvas-cardDark border border-black/10 dark:border-white/10 shadow-soft space-y-4">
              <div className="w-10 h-10 rounded-2xl bg-[#FF6B6B]/15 text-[#FF6B6B] flex items-center justify-center">
                <Palette size={20} />
              </div>
              <h3 className="text-xl font-light text-slate-900 dark:text-white">
                UI/UX Craft & Ergonomics
              </h3>
              <p className="text-xs sm:text-sm font-light text-slate-600 dark:text-slate-400 leading-relaxed">
                I believe software should make users feel intelligent, not disoriented. I obsess over spacing tokens, WCAG AAA accessibility, cognitive load reduction, and micro-copy.
              </p>
              <div className="pt-2 text-xs font-mono text-[#FF6B6B]">
                ✦ Figma Tokens • Wireframes • Usability
              </div>
            </div>

            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-canvas-cardDark border border-black/10 dark:border-white/10 shadow-soft space-y-4">
              <div className="w-10 h-10 rounded-2xl bg-[#4ECDC4]/15 text-[#4ECDC4] flex items-center justify-center">
                <Code size={20} />
              </div>
              <h3 className="text-xl font-light text-slate-900 dark:text-white">
                Full-Stack Architecture
              </h3>
              <p className="text-xs sm:text-sm font-light text-slate-600 dark:text-slate-400 leading-relaxed">
                Great interfaces demand rock-solid underlying engineering. I build scalable backends with Python FastAPI, Node.js, and PostgreSQL, linked seamlessly to responsive React client states.
              </p>
              <div className="pt-2 text-xs font-mono text-[#4ECDC4]">
                ✦ Python • Node.js • Supabase • REST/WS
              </div>
            </div>

            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-canvas-cardDark border border-black/10 dark:border-white/10 shadow-soft space-y-4">
              <div className="w-10 h-10 rounded-2xl bg-[#B388FF]/15 text-[#B388FF] flex items-center justify-center">
                <Sparkles size={20} />
              </div>
              <h3 className="text-xl font-light text-slate-900 dark:text-white">
                Applied AI & Reasoning Loops
              </h3>
              <p className="text-xs sm:text-sm font-light text-slate-600 dark:text-slate-400 leading-relaxed">
                I explore human-in-the-loop AI interfaces, streaming token ergonomics, and vector retrieval pipelines (RAG) using Google Gemini and LangChain to solve genuine productivity problems.
              </p>
              <div className="pt-2 text-xs font-mono text-[#B388FF]">
                ✦ Gemini 1.5 • Vector Embeddings • RAG
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
