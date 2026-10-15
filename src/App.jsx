import React, { useState, useEffect } from 'react';
import { CustomCursor } from './components/CustomCursor';
import { LiquidMeshBackground } from './components/LiquidMeshBackground';
import { TopIslandNav } from './components/TopIslandNav';
import { FluidGradientHero } from './components/FluidGradientHero';
import { MessyAboutMe } from './components/MessyAboutMe';
import { ExperienceStudyDesk } from './components/ExperienceStudyDesk';
import { EducationCreeperVine } from './components/EducationCreeperVine';
import { SkillsChestDrawer } from './components/SkillsChestDrawer';
import { ProjectsCurated } from './components/ProjectsCurated';
import { CertificationsSection } from './components/CertificationsSection';
import { ConnectChannels } from './components/ConnectChannels';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';
import { CreativeRoomLoader } from './components/CreativeRoomLoader';

export function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [isWindowOpen, setIsWindowOpen] = useState(false);

  // Lock body scroll when window is closed; allow scrolling once window opens
  useEffect(() => {
    if (!isWindowOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isWindowOpen]);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-transparent text-[#2D2A26] relative overflow-x-hidden selection:bg-[#FCEADE] selection:text-[#2D2A26]">
      
      {/* Site-wide Fixed Interactive Pastel Liquid-Glass Mesh Background (Behind all sections throughout) */}
      <LiquidMeshBackground />

      {/* Custom Studio Cursor */}
      <CustomCursor />

      {/* Top Floating Island Navigation */}
      <TopIslandNav isWindowOpen={isWindowOpen} />

      {/* Creative Studio Setup Loading Screen */}
      {isLoading && (
        <CreativeRoomLoader onComplete={() => setIsLoading(false)} />
      )}

      {/* Main Sections Flow */}
      <main className="flex-1 relative z-10">
        
        {/* 1. Hero: Arched Studio Window with Mumbai Bandra-Worli Sea Link */}
        <FluidGradientHero 
          isWindowOpen={isWindowOpen}
          onToggleWindow={(val) => setIsWindowOpen(typeof val === 'boolean' ? val : !isWindowOpen)}
          onExploreProjects={() => {
            const el = document.getElementById('projects');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenResume={() => setResumeOpen(true)}
        />

        {/* 2. About Me: Curated Scrapbook Polaroids & Stories */}
        <MessyAboutMe />

        {/* 3. Experience: Study Desk with 3 Hardbound Books & Concrete Numbers */}
        <ExperienceStudyDesk />

        {/* 4. Education: Botanical Creeper Vine with Accurate Academic Marks & Distinctions */}
        <EducationCreeperVine />

        {/* 5. Skills: 4-Drawer Pastel Chest Cabinet */}
        <SkillsChestDrawer />

        {/* 6. Featured Projects: 5 Master Works with Laptop & Mobile Screen Banners */}
        <ProjectsCurated />

        {/* 7. Certifications & Winnings: Pan IIT PIWOT Hackathon Finalist, be10x AI Tools, HackerRank & Awards */}
        <CertificationsSection />

        {/* 8. Connect With Me: Direct Postal Correspondence */}
        <ConnectChannels />

      </main>

      {/* 9. Footer (Base background only, no liquid mesh) */}
      <div className="relative z-20">
        <Footer />
      </div>

      {/* Full Resume / CV Modal */}
      <ResumeModal 
        isOpen={resumeOpen} 
        onClose={() => setResumeOpen(false)} 
      />

    </div>
  );
}

export default App;
