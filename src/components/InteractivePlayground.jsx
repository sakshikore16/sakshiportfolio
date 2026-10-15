import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, Terminal, Sliders, RefreshCw, Send, CheckCircle2, 
  Trash2, Volume2, Layers, Cpu, Play
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { playClick, playPop, playSticker, playSuccess } from '../utils/sound';

export const InteractivePlayground = () => {
  const [activeTab, setActiveTab] = useState('stickers');

  // Experiment A: AI Simulator State
  const [promptInput, setPromptInput] = useState('');
  const [aiOutput, setAiOutput] = useState("Click a sample prompt or type your own question to see how I think about Design Systems and Full-Stack AI!");
  const [isGenerating, setIsGenerating] = useState(false);

  // Experiment B: Sticker Board State
  const initialStickers = [
    { id: 1, text: "💖 High Delight", color: "bg-pink-400 text-black", x: 40, y: 30, rotate: -4 },
    { id: 2, text: "⚡ Sub-20ms Latency", color: "bg-lime-neon text-black", x: 260, y: 50, rotate: 6 },
    { id: 3, text: "☕ Chai Powered", color: "bg-brand-orange text-white", x: 120, y: 140, rotate: -2 },
    { id: 4, text: "📐 8pt Spacing Grid", color: "bg-brand-purple text-white", x: 340, y: 130, rotate: 5 },
  ];
  const [placedStickers, setPlacedStickers] = useState(initialStickers);

  // Experiment C: Micro-interaction Physics State
  const [stiffness, setStiffness] = useState(300);
  const [damping, setDamping] = useState(15);
  const [shadowDepth, setShadowDepth] = useState(4);
  const [buttonPressed, setButtonPressed] = useState(false);

  const samplePrompts = [
    {
      title: "Fintech Card UI/UX",
      prompt: "How would you design an accessible zero-friction KYC screen for first-time users?",
      response: `✦ Design Strategy:
1. Progressive Disclosure: Break 12 KYC fields into 3 micro-steps with inline progress bars.
2. Cognitive Load: Use optical character recognition (OCR) on ID scans rather than manual typing.
3. Trust Cues: Display bank-grade 256-bit encryption badges and clear 'Why we need this' accordions.
4. WCAG: Ensure 7:1 color contrast on confirmation triggers.`
    },
    {
      title: "AI RAG Architecture",
      prompt: "What is your architecture for a full-stack retrieval augmented generation app?",
      response: `✦ Architecture Flow:
1. Ingestion: Document chunks (500 tokens) with 50-token overlap.
2. Embeddings: text-embedding-3-small stored in PostgreSQL + pgvector.
3. Fast Retrieval: Cosine similarity search with metadata filtering.
4. Frontend: Streaming React Server Sent Events (SSE) with markdown code rendering.`
    },
    {
      title: "Figma to React Handoff",
      prompt: "How do you ensure zero discrepancies between Figma designs and production code?",
      response: `✦ Token Pipeline:
1. Maintain atomic design tokens (Colors, Typography, Spacing, Elevation) in Figma Variables.
2. Export JSON tokens via Figma API directly to Tailwind config theme extensions.
3. Storybook visual regression tests with Playwright to catch layout shifts.`
    }
  ];

  const handleSelectPrompt = (item) => {
    playClick();
    setPromptInput(item.prompt);
    setIsGenerating(true);
    setAiOutput("Synthesizing response...");
    
    setTimeout(() => {
      setIsGenerating(false);
      setAiOutput(item.response);
      playSuccess();
    }, 450);
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (!promptInput.trim()) return;
    playClick();
    setIsGenerating(true);
    setAiOutput("Thinking across UI/UX & Code lenses...");
    
    setTimeout(() => {
      setIsGenerating(false);
      setAiOutput(`✦ Sakshi's Take on "${promptInput}":\n\nWhen designing & developing for this scenario, I prioritize:\n1. Human Intuitiveness: Removing unnecessary friction and cognitive fatigue.\n2. Visual Elegance: Strict spacing, high contrast, and tactile feedback.\n3. Technical Reliability: Sub-second response times and bulletproof state management.\n\nLet's discuss this live over coffee or email! ↗`);
      playSuccess();
    }, 600);
  };

  const addStickerToBoard = (text, color) => {
    playSticker();
    const newSticker = {
      id: Date.now(),
      text,
      color,
      x: Math.floor(Math.random() * 200) + 50,
      y: Math.floor(Math.random() * 100) + 30,
      rotate: Math.floor(Math.random() * 12) - 6
    };
    setPlacedStickers([...placedStickers, newSticker]);
  };

  const clearStickers = () => {
    playPop();
    setPlacedStickers([]);
  };

  const resetStickers = () => {
    playSuccess();
    setPlacedStickers(initialStickers);
    confetti({
      particleCount: 40,
      spread: 50,
      origin: { y: 0.8 }
    });
  };

  return (
    <section id="lab" className="py-24 relative overflow-hidden bg-slate-50 dark:bg-black/40 border-y-2 border-black dark:border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-purple/10 border border-brand-purple/30 text-brand-purple dark:text-purple-300 text-xs font-mono font-bold uppercase tracking-wider">
            <Sparkles size={13} />
            <span>Interactive Design & Code Sandbox</span>
          </div>

          <h2 className="font-syne font-extrabold text-3xl sm:text-5xl text-black dark:text-white tracking-tight">
            Sakshi's Interactive Lab
          </h2>

          <p className="font-sans text-sm sm:text-base text-slate-600 dark:text-slate-400">
            A playful testing ground showcasing tactile UI/UX micro-interactions, draggable scrapbook physics, and AI reasoning.
          </p>

          {/* Experiment Switcher Tabs */}
          <div className="pt-4 flex justify-center gap-2">
            {[
              { id: 'stickers', label: '🎨 Scrapbook Sticker Board' },
              { id: 'ai', label: '🤖 AI Co-Design Simulator' },
              { id: 'physics', label: '⚡ Spring Physics Sandbox' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  playClick();
                  setActiveTab(tab.id);
                }}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-syne font-bold transition-all border-2 ${
                  activeTab === tab.id
                    ? 'bg-black text-white dark:bg-lime-neon dark:text-black border-black shadow-neo-sm scale-105'
                    : 'bg-white dark:bg-paper-cardDark text-slate-700 dark:text-slate-300 border-black/10 dark:border-white/10'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* EXPERIMENT 1: SCRAPBOOK STICKER BOARD */}
        {activeTab === 'stickers' && (
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-paper-cardDark border-2 border-black dark:border-white/20 shadow-neo space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-black/10 dark:border-white/10 pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                  CANVAS 01 • DRAGGABLE SCRAPBOOK
                </span>
                <h3 className="font-syne font-bold text-xl text-black dark:text-white">
                  Drag, Drop & Pin Your Vibe!
                </h3>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={clearStickers}
                  className="px-3 py-1.5 rounded-lg border border-black/15 dark:border-white/15 text-xs font-mono hover:bg-black/5 dark:hover:bg-white/5 transition-colors flex items-center gap-1.5"
                >
                  <Trash2 size={13} />
                  <span>Clear</span>
                </button>
                <button
                  onClick={resetStickers}
                  className="px-3.5 py-1.5 rounded-lg bg-lime-neon text-black font-syne font-bold text-xs shadow-sm hover:scale-105 transition-transform flex items-center gap-1.5"
                >
                  <Sparkles size={13} />
                  <span>Reset & Blast Confetti</span>
                </button>
              </div>
            </div>

            {/* Sticker Tray (Click to Add) */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-500">Click any badge to drop it on the canvas:</span>
              <div className="flex flex-wrap gap-2">
                {[
                  { text: "✨ Pixel Perfectionist", color: "bg-lime-neon text-black" },
                  { text: "🚀 Ship Fast, Ship Clean", color: "bg-brand-coral text-white" },
                  { text: "🧠 Empathy First", color: "bg-brand-purple text-white" },
                  { text: "☕ Refill Chai", color: "bg-brand-yellow text-black" },
                  { text: "💅 Polished Transitions", color: "bg-pink-400 text-black" },
                  { text: "🛡️ Accessible AAA", color: "bg-emerald-400 text-black" }
                ].map((st, i) => (
                  <button
                    key={i}
                    onClick={() => addStickerToBoard(st.text, st.color)}
                    className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold border-2 border-black shadow-neo-sm hover:scale-110 active:scale-95 transition-all ${st.color}`}
                  >
                    + {st.text}
                  </button>
                ))}
              </div>
            </div>

            {/* Drag Area */}
            <div className="relative h-80 sm:h-96 rounded-2xl bg-paper-light dark:bg-black/40 border-2 border-dashed border-black/20 dark:border-white/20 overflow-hidden bg-grid-pattern p-4">
              <div className="absolute top-3 right-3 text-xs font-mono text-slate-400 pointer-events-none">
                📍 Interactive Playground Canvas
              </div>

              {placedStickers.length === 0 ? (
                <div className="h-full flex items-center justify-center text-center text-slate-400 font-mono text-xs">
                  Canvas is empty! Click the badges above to stick your favorites here.
                </div>
              ) : (
                placedStickers.map((sticker) => (
                  <motion.div
                    key={sticker.id}
                    drag
                    dragConstraints={{ left: 0, right: 400, top: 0, bottom: 250 }}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    onDragStart={() => playSticker()}
                    className="absolute cursor-grab active:cursor-grabbing select-none"
                    style={{ left: sticker.x, top: sticker.y }}
                  >
                    <div
                      style={{ transform: `rotate(${sticker.rotate}deg)` }}
                      className={`px-4 py-2 rounded-xl border-2 border-black shadow-neo font-mono text-xs sm:text-sm font-black ${sticker.color}`}
                    >
                      {sticker.text}
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        )}

        {/* EXPERIMENT 2: AI CO-DESIGN SIMULATOR */}
        {activeTab === 'ai' && (
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-paper-cardDark border-2 border-black dark:border-white/20 shadow-neo space-y-6 animate-in fade-in duration-200">
            <div className="border-b border-black/10 dark:border-white/10 pb-4">
              <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                CANVAS 02 • AI CO-PILOT ARCHITECTURE
              </span>
              <h3 className="font-syne font-bold text-xl text-black dark:text-white">
                Interactive Design & Systems Query Console
              </h3>
            </div>

            {/* Sample Prompt Chips */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-500">Pick a pre-configured architecture prompt:</span>
              <div className="flex flex-wrap gap-2">
                {samplePrompts.map((p, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelectPrompt(p)}
                    className="px-3.5 py-1.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-sans font-semibold hover:border-black dark:hover:border-white transition-all text-slate-800 dark:text-slate-200"
                  >
                    💡 {p.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Prompt Input Form */}
            <form onSubmit={handleCustomSubmit} className="flex gap-2">
              <input
                type="text"
                value={promptInput}
                onChange={(e) => setPromptInput(e.target.value)}
                placeholder="Ask about design systems, WCAG, React, FastAPI, or RAG..."
                className="flex-1 px-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border-2 border-black/10 dark:border-white/10 font-mono text-xs focus:outline-none focus:border-brand-purple"
              />
              <button
                type="submit"
                disabled={isGenerating}
                className="px-5 py-2.5 rounded-xl bg-black dark:bg-lime-neon text-white dark:text-black font-syne font-bold text-xs flex items-center gap-1.5 shadow-neo-sm hover:scale-105 disabled:opacity-50 transition-all"
              >
                <Send size={13} />
                <span>Run</span>
              </button>
            </form>

            {/* Interactive Terminal Output */}
            <div className="rounded-2xl bg-slate-950 border border-white/10 p-5 text-slate-200 font-mono text-xs space-y-3 shadow-inner">
              <div className="flex items-center justify-between pb-2 border-b border-white/10 text-[11px] text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>sakshi-ai-kernel // response_stream</span>
                </div>
                <span>LLM Engine: Gemini 1.5</span>
              </div>

              <div className="whitespace-pre-wrap leading-relaxed min-h-[120px] text-lime-neon/90 font-mono">
                {isGenerating ? (
                  <div className="flex items-center gap-2 text-slate-400">
                    <RefreshCw size={14} className="animate-spin" />
                    <span>Processing prompt parameters...</span>
                  </div>
                ) : (
                  aiOutput
                )}
              </div>
            </div>
          </div>
        )}

        {/* EXPERIMENT 3: SPRING PHYSICS SANDBOX */}
        {activeTab === 'physics' && (
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-paper-cardDark border-2 border-black dark:border-white/20 shadow-neo space-y-6 animate-in fade-in duration-200">
            <div className="border-b border-black/10 dark:border-white/10 pb-4">
              <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                CANVAS 03 • TACTILE PHYSICS TUNER
              </span>
              <h3 className="font-syne font-bold text-xl text-black dark:text-white">
                Live Spring Curve & Shadow Micro-interaction
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              
              {/* Slider Controls */}
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span>Spring Stiffness:</span>
                    <span className="font-bold text-brand-orange">{stiffness}</span>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="600"
                    value={stiffness}
                    onChange={(e) => setStiffness(Number(e.target.value))}
                    className="w-full accent-brand-orange cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span>Damping (Bounciness Resistance):</span>
                    <span className="font-bold text-brand-purple">{damping}</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="40"
                    value={damping}
                    onChange={(e) => setDamping(Number(e.target.value))}
                    className="w-full accent-brand-purple cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span>Neo Shadow Depth:</span>
                    <span className="font-bold text-lime-neon">{shadowDepth}px</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={shadowDepth}
                    onChange={(e) => setShadowDepth(Number(e.target.value))}
                    className="w-full accent-lime-neon cursor-pointer"
                  />
                </div>

                <p className="text-xs font-mono text-slate-400 pt-2">
                  Tuning this allows designer-engineers to dial in the exact tactile "pop" before shipping to production.
                </p>
              </div>

              {/* Live Interactive Physics Button */}
              <div className="flex flex-col items-center justify-center p-8 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 min-h-[200px]">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ 
                    scale: 0.92, 
                    x: shadowDepth, 
                    y: shadowDepth,
                    boxShadow: '0px 0px 0px 0px rgba(0,0,0,1)' 
                  }}
                  transition={{ 
                    type: "spring", 
                    stiffness: stiffness, 
                    damping: damping 
                  }}
                  onClick={() => {
                    playPop();
                    setButtonPressed(true);
                    setTimeout(() => setButtonPressed(false), 500);
                  }}
                  style={{
                    boxShadow: `${shadowDepth}px ${shadowDepth}px 0px 0px rgba(0,0,0,1)`
                  }}
                  className="px-8 py-4 rounded-2xl bg-lime-neon text-black font-syne font-extrabold text-base border-2 border-black flex items-center gap-2 select-none"
                >
                  <Volume2 size={18} />
                  <span>Click Me for Tactile Pop!</span>
                </motion.button>

                <div className="mt-4 text-xs font-mono text-slate-500">
                  {buttonPressed ? "🎉 Spring triggered with Web Audio pop!" : "Click above to test spring response"}
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
