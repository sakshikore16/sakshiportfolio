# Sakshi Kore — Creative Portfolio & Editorial Studio ✨

A lively, tactile, highly interactive personal portfolio designed for **Sakshi Kore** — bridging **UI/UX Product Design**, **Modern Frontend Engineering**, **Backend Architecture**, and **Applied AI**.

Inspired by the editorial grit of high-impact portfolios (Atishya Gupta, Hanshika Anchan, Arpita Jadhav, and Wall of Portfolios favorites), featuring custom scrapbook aesthetics, washi tape labels, polaroid cards, Web Audio synthesized tactile sound effects, and an interactive micro-interaction lab.

---

## 🌟 Key Highlights & Design Decisions

### 1. 🎨 The Aesthetic: Tactile Neo-Brutalism & Editorial Scrapbook
- **Editorial Typography Pairing**:
  - `Syne` (Bold, futuristic display for headers)
  - `Caveat` (Playful hand-drawn annotations, sticky notes, and washi markers)
  - `Plus Jakarta Sans` & `DM Sans` (Clean, accessible body & UI copy)
  - `JetBrains Mono` & `Space Grotesk` (Technical code blocks & specs)
- **Palette**: Warm cream paper texture (`#FBF9F5`), ink obsidian (`#0D0E12`), acid neon lime (`#D8FF3E`), retro coral (`#FF5E36`), electric violet (`#7C3AED`), and cyan (`#06B6D4`).
- **Tactile Paper Textures**: Washi tape strips, polaroids with real drop shadows, dashed stamps (`CURRENT`, `VERIFIED`, `WINNER 🏆`), and draggable stickers.

### 2. ⚡ Fluid Movement & Micro-interactions
- **Web Audio API Sound Synthesizer**: Zero external audio assets! Clean synthesized clicks, pops, switch sounds, and success chimes for delightful feedback. (Can be toggled via the navbar or dock).
- **Draggable Stickers with Framer Motion**: Users can drag, toss, or pin stickers across the hero and interactive lab canvas.
- **Interactive Dual Ticker (Marquee Banner)**: Dual-stream infinite scrolling banners showcasing design & code fundamentals.
- **Live Local Clock in IST**: Real-time clock widget reflecting Sakshi's time zone (Mumbai, India).
- **Interactive Balance Slider**: Move between **UI/UX Design** and **Code Architecture** to dynamically watch Sakshi's mindset and toolsets adapt.

### 3. 💼 Curated Work & Deep-Dive Case Study Drawer
- **Filterable Showcase**: Filter seamlessly by `All`, `UI/UX Design`, `Full-Stack & Web`, `AI & Machine Learning`, and `Creative Experiments`.
- **Realistic UI Mockups**: Each project showcases an in-browser or mobile UI preview with realistic data visualizations.
- **In-Depth Case Study Modal**:
  - 1. Executive Summary & Problem Framing
  - 2. UX Research, User Personas & Interview Data
  - 3. Design System Tokens, Spacing & Wireframe Breakdown
  - 4. Engineering Architecture, Tech Stack & API Specs
  - Interactive High-Five celebration with confetti!

### 4. 🧪 Sakshi's Interactive Lab
- **Experiment 1: Scrapbook Sticker Board**: Pick stickers from the tray and arrange them on the canvas. Includes a "Reset & Blast Confetti" button.
- **Experiment 2: AI Co-Design Simulator**: Test natural language questions against Sakshi's design systems & full-stack mindset.
- **Experiment 3: Spring Physics Tuner**: Adjust spring stiffness, damping, and neo shadow depths in real time to test button bounce.

### 5. 🛠️ Comprehensive Superpowers Bento & Timeline
- Categorized by **UI/UX Design**, **Frontend Engineering**, **Backend Systems**, and **AI / Emerging Tech**.
- Journey timeline with verified milestones, hackathon wins, and recommendations from peers and mentors.

### 6. 📱 Full-Featured Modals & Navigation
- **Interactive Resume / CV Modal**: Complete with print/save as PDF support.
- **Floating Quick Dock**: Bottom macOS-style dock with section navigation, sound toggle, and theme switch.
- **Responsive Mobile Drawer**: Optimized for iPhones, iPads, and Android devices.

---

## 🚀 Getting Started

### Prerequisites
- Node.js `v18+` (tested on Node v23)
- npm `v9+`

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
```
The optimized static build will be placed in the `dist/` directory.

---

## 📂 Project Architecture

```
portfolio!/
├── index.html                 # Google fonts & meta tags
├── package.json               # Dependencies & scripts
├── postcss.config.js          # PostCSS configuration
├── tailwind.config.js         # Custom fonts, colors, animations & shadows
├── vite.config.js             # Vite development & build setup
├── src/
│   ├── App.jsx                # Root app assembling all sections & themes
│   ├── main.jsx               # React entry point
│   ├── index.css              # Custom paper textures, washi tape, stamps
│   ├── data/
│   │   └── portfolioData.js   # All projects, case studies, skills & timeline
│   ├── utils/
│   │   └── sound.js           # Web Audio API sound synthesizer
│   └── components/
│       ├── Navbar.jsx         # Header with theme toggle, sound, vibe emoji
│       ├── Hero.jsx           # Editorial headline, mood picker, polaroid
│       ├── MarqueeBanner.jsx  # Dual infinite scrolling text tickers
│       ├── BentoAbout.jsx     # Narrative, Spotify player, balance slider
│       ├── ProjectsSection.jsx# Filterable projects with mockups
│       ├── CaseStudyModal.jsx # Deep-dive case study with research tabs
│       ├── InteractivePlayground.jsx # Stickers, AI prompt console, physics
│       ├── SkillsBento.jsx    # Superpowers categorized with progress bars
│       ├── ExperienceTimeline.jsx # Milestones, stamps, and peer testimonials
│       ├── ContactSection.jsx # Contact form with confetti & copy email
│       ├── ResumeModal.jsx    # Complete CV viewer with print/save PDF
│       ├── FloatingDock.jsx   # Bottom navigation bar with tooltips
│       └── Footer.jsx         # Credits, back to top, and vibe quotes
```

---

## 🚢 Deploying to Vercel

1. Push your repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: initial release of Sakshi Kore portfolio"
   git remote add origin https://github.com/your-username/portfolio.git
   git push -u origin main
   ```
2. Go to [vercel.com](https://vercel.com) and import the repository.
3. Framework Preset: **Vite**
4. Click **Deploy**! ✨
