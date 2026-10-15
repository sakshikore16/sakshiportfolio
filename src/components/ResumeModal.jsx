import React, { useState, useEffect } from 'react';
import { X, Printer, Mail, MapPin, Download, ExternalLink, FileText, LayoutTemplate } from 'lucide-react';
import confetti from 'canvas-confetti';
import { personalInfo, experienceData, educationData } from '../data/portfolioData';
import { playClick, playSuccess } from '../utils/sound';

export const ResumeModal = ({ isOpen, onClose }) => {
  const [viewMode, setViewMode] = useState('pdf'); // 'pdf' (official PDF viewer) | 'web' (structured web view)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleDownload = (e) => {
    if (e) e.preventDefault();
    playSuccess();
    confetti({
      particleCount: 70,
      spread: 75,
      origin: { y: 0.6 }
    });

    // Create an explicit anchor element to trigger direct browser file download to user's device
    const link = document.createElement('a');
    link.href = '/Sakshi_Kore_Resume.pdf';
    link.download = 'Sakshi_Kore_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    playClick();
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-5 bg-black/50 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      
      {/* Modal Card */}
      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl bg-[#FAF8F5] border-2 border-[#D4B996]/60 shadow-2xl flex flex-col text-[#2D2A26]">
        
        {/* Header Actions Bar */}
        <div className="sticky top-0 z-20 flex flex-wrap items-center justify-between gap-3 p-3.5 sm:p-5 border-b border-[#D4B996]/30 bg-[#FAF8F5]/95 backdrop-blur-sm">
          
          <div className="flex items-center gap-2">
            <span className="font-serif italic font-bold text-base sm:text-xl text-[#2D2A26]">
              Curriculum Vitae ✦ Sakshi Kore
            </span>
          </div>

          {/* View Mode Toggle (Official PDF vs Web Format) */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-black/5 border border-[#D4B996]/30 text-xs font-mono">
            <button
              onClick={() => {
                playClick();
                setViewMode('pdf');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                viewMode === 'pdf'
                  ? 'bg-white text-[#2D2A26] font-bold shadow-xs'
                  : 'text-[#6D5D4E] hover:text-[#2D2A26]'
              }`}
            >
              <FileText size={13} />
              <span>Official PDF</span>
            </button>
            <button
              onClick={() => {
                playClick();
                setViewMode('web');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                viewMode === 'web'
                  ? 'bg-white text-[#2D2A26] font-bold shadow-xs'
                  : 'text-[#6D5D4E] hover:text-[#2D2A26]'
              }`}
            >
              <LayoutTemplate size={13} />
              <span>Web View</span>
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#E07A5F] hover:bg-[#C85A3F] text-white font-sans font-semibold text-xs shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
              title="Download Sakshi_Kore_Resume.pdf to your device"
            >
              <Download size={14} />
              <span>Download PDF</span>
            </button>

            <a
              href="/Sakshi_Kore_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-[#D4B996]/60 hover:bg-stone-50 text-stone-800 font-sans font-medium text-xs shadow-xs hover:scale-105 transition-all cursor-pointer"
              title="Open full PDF in a new tab"
            >
              <ExternalLink size={13} />
              <span>New Tab</span>
            </a>

            <button
              onClick={handlePrint}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-[#D4B996]/60 hover:bg-stone-50 text-stone-800 font-sans font-medium text-xs shadow-xs hover:scale-105 transition-all cursor-pointer"
              title="Print resume"
            >
              <Printer size={13} />
              <span>Print</span>
            </button>

            <button
              onClick={() => {
                playClick();
                onClose();
              }}
              className="p-2 rounded-full hover:bg-black/5 text-[#5A564F] transition-colors cursor-pointer"
              aria-label="Close resume modal"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-3 sm:p-6 flex-1 flex flex-col">
          
          {viewMode === 'pdf' ? (
            /* ========================================================
               OFFICIAL EMBEDDED RESUME PDF VIEWER (EXACT 1-PAGE DOCUMENT)
               ======================================================== */
            <div className="space-y-3 flex-1 flex flex-col">
              
              {/* Embedded Interactive PDF Viewer */}
              <div className="w-full h-[74vh] sm:h-[80vh] rounded-2xl overflow-hidden border border-[#D4B996]/60 bg-stone-100 shadow-inner relative flex flex-col">
                <iframe
                  src="/Sakshi_Kore_Resume.pdf#toolbar=1&navpanes=0&scrollbar=1"
                  className="w-full h-full border-0 bg-white"
                  title="Sakshi Kore Official Resume"
                />
              </div>

              {/* Bottom Download Card Bar */}
              <div className="p-3.5 rounded-2xl bg-[#FAF3E0] border border-[#D8C7B5] flex flex-wrap items-center justify-between gap-3 shadow-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#E07A5F]/15 text-[#E07A5F] flex items-center justify-center font-bold text-sm">
                    📄
                  </div>
                  <div>
                    <h5 className="font-sans font-bold text-xs sm:text-sm text-[#2D2A26]">
                      Sakshi_Kore_Resume.pdf
                    </h5>
                    <p className="text-[11px] font-mono text-[#796756]">
                      Software Engineer • Full-Stack &amp; AI/ML Developer • 1 Page
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleDownload}
                    className="px-4 py-2 rounded-xl bg-[#2D2A26] hover:bg-black text-white font-mono font-medium text-xs flex items-center gap-2 shadow-xs hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  >
                    <Download size={13} />
                    <span>Download to Device</span>
                  </button>
                  <a
                    href="/Sakshi_Kore_Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 rounded-xl bg-white border border-[#D4B996]/60 text-stone-800 font-mono text-xs hover:bg-stone-50 transition-all flex items-center gap-1.5"
                  >
                    <ExternalLink size={12} />
                    <span>View Raw</span>
                  </a>
                </div>
              </div>

            </div>
          ) : (
            /* ========================================================
               WEB FORMATTED VIEW (MATCHING THE 3 SPECIFIC PROJECTS WITH NO LINKS)
               ======================================================== */
            <div className="p-4 sm:p-8 space-y-8 font-sans bg-white/70 rounded-2xl border border-[#D4B996]/40 shadow-xs">
              
              {/* Header Section */}
              <div className="border-b border-[#D4B996]/30 pb-5 space-y-1.5 text-center sm:text-left">
                <h1 className="font-serif italic font-normal text-3xl sm:text-4xl text-[#2D2A26]">
                  {personalInfo.name}
                </h1>
                <p className="font-sans font-semibold text-sm sm:text-base text-[#E07A5F]">
                  Software Engineer | Full-Stack &amp; AI/ML Developer | Frontend &amp; UI/UX Designer
                </p>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1 text-xs font-mono text-[#5A564F] pt-1">
                  <span className="flex items-center gap-1"><MapPin size={11} /> Mumbai, India</span>
                  <span className="flex items-center gap-1"><Mail size={11} /> {personalInfo.email}</span>
                  <span>{personalInfo.phone}</span>
                  <span>github.com/sakshikore16</span>
                  <span>linkedin.com/in/sakshi-kore</span>
                </div>
              </div>

              {/* Summary */}
              <div className="space-y-1.5">
                <h3 className="font-mono font-bold text-xs uppercase tracking-wider text-[#A3B18A]">
                  Summary
                </h3>
                <p className="text-xs sm:text-sm text-[#5A564F] leading-relaxed">
                  Software engineer with strong foundations in computer science, full-stack development &amp; machine learning. I work across the stack, from responsive frontends &amp; cross-platform mobile apps to scalable backend services and real-time systems. I’m comfortable with data structures, algorithms and system design, and I apply AI/ML techniques such as predictive modelling and computer vision to build practical features. I write maintainable code, collaborate well in Agile teams, and learn new tools quickly.
                </p>
              </div>

              {/* Work Experience */}
              <div className="space-y-4">
                <h3 className="font-mono font-bold text-xs uppercase tracking-wider text-[#A3B18A]">
                  Experience
                </h3>

                {/* Harrier */}
                <div className="space-y-1.5 p-4 rounded-xl bg-white/80 border border-[#D4B996]/30">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <h4 className="font-serif font-bold text-sm sm:text-base text-[#2D2A26]">
                      Software Developer Intern — <span className="font-sans text-[#E07A5F]">Harrier Information Systems Pvt. Ltd</span>
                    </h4>
                    <span className="font-mono text-xs text-[#8C7A6B]">Jul 2025 – Dec 2025 | Mumbai</span>
                  </div>
                  <ul className="list-disc list-inside text-xs text-[#5A564F] space-y-1">
                    <li>Built and deployed a production cross-platform mobile document scanner and OCR app using C# and .NET MAUI, owning the work from UI screens to release and cutting manual document processing effort by ~60%.</li>
                    <li>Developed Node.js and SQL REST APIs powering the mobile app, with optimized indexing and query tuning that improved backend throughput by 35%.</li>
                    <li>Redesigned the user verification flow from 5 steps to 2 (60% fewer), reducing friction and drop-off across mobile and backend touchpoints.</li>
                    <li>Worked in Agile sprints with cross-functional teams, delivering 8+ features with 100% on-time milestones &amp; zero critical regressions.</li>
                  </ul>
                </div>

                {/* Digital Loop */}
                <div className="space-y-1.5 p-4 rounded-xl bg-white/80 border border-[#D4B996]/30">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <h4 className="font-serif font-bold text-sm sm:text-base text-[#2D2A26]">
                      Web Developer &amp; Digital Marketing Intern — <span className="font-sans text-[#E07A5F]">Digital Loop Marketing</span>
                    </h4>
                    <span className="font-mono text-xs text-[#8C7A6B]">Jul 2024 – Oct 2024 | Mumbai</span>
                  </div>
                  <ul className="list-disc list-inside text-xs text-[#5A564F] space-y-1">
                    <li>Built responsive client-facing web apps with React.js and MongoDB, lifting 30-day user retention by 45%.</li>
                    <li>Optimized metadata, component rendering and asset delivery, driving a 3.8× rise in inbound engagement within 2 months.</li>
                    <li>Created a reusable UI component library that cut landing-page development time by 30%.</li>
                    <li>Worked closely with the marketing team to turn campaign briefs into live, high-performing pages for multiple clients.</li>
                  </ul>
                </div>
              </div>

              {/* Technical Projects (EXACTLY 3, ZERO LINKS) */}
              <div className="space-y-4">
                <h3 className="font-mono font-bold text-xs uppercase tracking-wider text-[#A3B18A]">
                  Technical Projects (No Links)
                </h3>

                <div className="space-y-3">
                  {/* Project 1 */}
                  <div className="p-4 rounded-xl bg-white/80 border border-[#D4B996]/30 space-y-1.5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                      <h4 className="font-serif font-bold text-sm sm:text-base text-[#2D2A26]">
                        Collaborative Whiteboard App
                      </h4>
                      <span className="font-mono text-[11px] text-[#7A6B5D]">React.js • WebSockets • Node.js • Docker • Redis • Keycloak SSO</span>
                    </div>
                    <ul className="list-disc list-inside text-xs text-[#5A564F] space-y-1">
                      <li>Built a containerized real-time multi-user drawing canvas with sub-18 ms latency, letting 50+ users collaborate in one room at 60 FPS even with 1,500+ active strokes.</li>
                      <li>Designed a WebSocket room architecture with delta compression that cut network packet overhead by 48%.</li>
                      <li>Secured access with Keycloak SSO (OAuth2/OIDC) and JWT verification, enforcing Admin, Editor and Viewer roles.</li>
                    </ul>
                  </div>

                  {/* Project 2 */}
                  <div className="p-4 rounded-xl bg-white/80 border border-[#D4B996]/30 space-y-1.5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                      <h4 className="font-serif font-bold text-sm sm:text-base text-[#2D2A26]">
                        Spotify Music Telemetry Platform
                      </h4>
                      <span className="font-mono text-[11px] text-[#7A6B5D]">Python • Scikit-Learn • Pandas • NumPy • Streamlit • Plotly</span>
                    </div>
                    <ul className="list-disc list-inside text-xs text-[#5A564F] space-y-1">
                      <li>Analyzed 1.2M+ Spotify tracks to predict song popularity, training a gradient-boosted regression model that reached 94.2% R².</li>
                      <li>Engineered 8 acoustic features (valence, energy, tempo and more) and reduced dimensionality by 35% while keeping 98% of the variance.</li>
                      <li>Grouped songs into vibe profiles (e.g., Deep Focus, Late-Night Chill) using K-Means and PCA, served with sub-12 ms cached inference.</li>
                    </ul>
                  </div>

                  {/* Project 3 */}
                  <div className="p-4 rounded-xl bg-white/80 border border-[#D4B996]/30 space-y-1.5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                      <h4 className="font-serif font-bold text-sm sm:text-base text-[#2D2A26]">
                        Mood-Based Music Player
                      </h4>
                      <span className="font-mono text-[11px] text-[#7A6B5D]">React.js • Node.js • CNN • Web Audio API • OpenWeatherMap API</span>
                    </div>
                    <ul className="list-disc list-inside text-xs text-[#5A564F] space-y-1">
                      <li>Built an app that reads facial expressions through webcam with client-side CNN (68 landmarks, 7 moods, under 200 ms) to curate playlists.</li>
                      <li>Combined detected mood with live weather data in recommendation engine and added 60 FPS audio waveform using the Web Audio API.</li>
                      <li>Kept all webcam frames in local browser memory, so no biometric data leaves the device.</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Entrepreneurship & Project Management */}
              <div className="space-y-2">
                <h3 className="font-mono font-bold text-xs uppercase tracking-wider text-[#A3B18A]">
                  Entrepreneurship &amp; Project Management
                </h3>
                <div className="p-4 rounded-xl bg-white/80 border border-[#D4B996]/30 space-y-1.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <h4 className="font-serif font-bold text-sm sm:text-base text-[#2D2A26]">
                      Revive Threads — Sustainable Circular Fashion Venture
                    </h4>
                    <span className="font-mono text-[11px] text-[#7A6B5D]">Ideation • Business Planning • Roadmapping</span>
                  </div>
                  <ul className="list-disc list-inside text-xs text-[#5A564F] space-y-1">
                    <li>Took a business idea from problem statement to a structured plan covering audience, value proposition, revenue model and go-to-market.</li>
                    <li>Broke the vision into phased milestones with clear priorities, deliverables and success metrics across product, tech and growth.</li>
                    <li>Validated the concept through peer and mentor feedback and refined the plan over multiple iterations.</li>
                  </ul>
                </div>
              </div>

              {/* Skills */}
              <div className="space-y-2">
                <h3 className="font-mono font-bold text-xs uppercase tracking-wider text-[#A3B18A]">
                  Skills
                </h3>
                <div className="p-4 rounded-xl bg-white/80 border border-[#D4B996]/30 text-xs text-[#5A564F] space-y-1.5">
                  <div><strong className="text-[#2D2A26]">Programming:</strong> C++, Python, Java, C#, SQL, JavaScript (ES6+), TypeScript</div>
                  <div><strong className="text-[#2D2A26]">Frontend &amp; Mobile:</strong> React.js, Next.js, .NET MAUI, Tailwind CSS, HTML5 Canvas, Web Audio API</div>
                  <div><strong className="text-[#2D2A26]">Backend &amp; Data:</strong> Node.js, Express.js, REST APIs, WebSockets, Keycloak SSO, PostgreSQL, MongoDB, MySQL, Redis, Firebase</div>
                  <div><strong className="text-[#2D2A26]">AI/ML &amp; Tools:</strong> Scikit-Learn, Pandas, NumPy, CNN, Computer Vision, Streamlit, Docker, AWS S3, Git, Linux, Postman, CI/CD</div>
                  <div><strong className="text-[#2D2A26]">Soft Skills:</strong> Project Management, Leadership, Communication, Teamwork, Problem Solving, Time Management, Adaptability, Ownership</div>
                </div>
              </div>

              {/* Education */}
              <div className="space-y-2">
                <h3 className="font-mono font-bold text-xs uppercase tracking-wider text-[#A3B18A]">
                  Education
                </h3>
                <div className="p-4 rounded-xl bg-white/80 border border-[#D4B996]/30 text-xs text-[#5A564F] space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <div>
                      <strong className="text-[#2D2A26]">B.Tech - CSE (AI/ML &amp; Data Science):</strong> ITM Skills University, Navi Mumbai | CGPA: 8.48 / 10
                    </div>
                    <span className="font-mono text-[#8C7A6B]">2023 – 2027</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <div>
                      <strong className="text-[#2D2A26]">HSC (Class XII, Science):</strong> Prakash College of Science &amp; Commerce, Mumbai
                    </div>
                    <span className="font-mono text-[#8C7A6B]">2021 – 2023</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <div>
                      <strong className="text-[#2D2A26]">ICSE (Class X):</strong> C.N.M. School &amp; N.D. Parekh School, Mumbai
                    </div>
                    <span className="font-mono text-[#8C7A6B]">2021</span>
                  </div>
                </div>
              </div>

              {/* Achievements & Certifications */}
              <div className="space-y-2">
                <h3 className="font-mono font-bold text-xs uppercase tracking-wider text-[#A3B18A]">
                  Achievements &amp; Certifications
                </h3>
                <div className="p-4 rounded-xl bg-white/80 border border-[#D4B996]/30 text-xs text-[#5A564F] space-y-1">
                  <div>• <strong>Finalist, PAN IIT IMAGINE Hackathon (PIWOT 2025):</strong> Top 72 teams out of 15,000+ participants across India (top 2%).</div>
                  <div>• <strong>HackerRank Certified:</strong> Python (Basic) and JavaScript (Basic); AI Tools &amp; Prompt Engineering Masterclass, be10x.</div>
                </div>
              </div>

              {/* Languages & Interests */}
              <div className="space-y-2">
                <h3 className="font-mono font-bold text-xs uppercase tracking-wider text-[#A3B18A]">
                  Languages &amp; Interests
                </h3>
                <div className="p-4 rounded-xl bg-white/80 border border-[#D4B996]/30 text-xs text-[#5A564F] space-y-1">
                  <div><strong className="text-[#2D2A26]">Languages:</strong> English, Hindi, Marathi</div>
                  <div><strong className="text-[#2D2A26]">Interests:</strong> Reading, Travelling, Drawing, Cooking</div>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
};

export default ResumeModal;
