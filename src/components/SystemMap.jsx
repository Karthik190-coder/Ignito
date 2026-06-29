import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CelestialBody from './CelestialBody'; 

// ==========================================
// 1. THE MASTER EVENT DATABASE
// ==========================================
const DATABASE = {
  nexus: {
    name: "THE NEXUS",
    color: "purple",
    // Topology: The Solar Hub (Flagship center, outward-facing typography)
    events: [
      { id: 'n1', title: "IGNITION CEREMONY", date: "12 Sept • 6:00 PM", desc: "The official opening of IGNITO featuring keynote speakers, immersive visuals, and the unveiling of this year's technological frontier.", type: 'moltenCore', size: 'w-86 h-56',
        x: 50, y: 50, labelPos: 'bottom' // The Central Star
      },
      { id: 'n4', title: "STELLAR TALKS", date: "13 Sept", desc: "Inspiring sessions from innovators, entrepreneurs, and researchers shaping tomorrow's technology.", type: 'oceanWorld', size: 'w-36 h-36',
        x: 50, y: 18, labelPos: 'top' // High Orbit (Center Top)
      },
      { id: 'n2', title: "NOVA EXPO", subtitle: "PROJECT EXHIBITION", date: "13 Sept", desc: "Explore groundbreaking student innovations, engineering prototypes, AI applications, and research projects.", type: 'edenWorld', size: 'w-48 h-48',
        x: 15, y: 40, labelPos: 'top' // Mid Orbit (Left)
      },
      { id: 'n3', title: "LAUNCHPAD", date: "14 Sept", desc: "Startup pitch competition connecting founders with mentors, investors, and industry experts.", type: 'marsCore', size: 'w-40 h-40',
        x: 85, y: 40, labelPos: 'top' // Mid Orbit (Right)
      },
      { id: 'n5', title: "COSMOS CONNECT", date: "14 Sept", desc: "A networking arena bringing together students, recruiters, startups, and creators.", type: 'gasGiant', size: 'w-40 h-40',
        x: 25, y: 82, labelPos: 'bottom' // Low Orbit (Bottom Left) - Kept wide for the Saturn rings
      },
      { id: 'n6', title: "HALL OF LUMINARIES", date: "15 Sept • 7:00 PM", desc: "The grand finale recognizing champions, innovators, and remarkable achievements across IGNITO.", type: 'toxicAnomaly', size: 'w-36 h-36',
        x: 75, y: 82, labelPos: 'bottom' // Low Orbit (Bottom Right)
      }
    ]
  },
  tactical: {
    name: "TACTICAL CLUSTER",
    color: "cyan",
    events: [
      { id: 't1', title: "ZERO-DAY SIEGE", date: "Oct 4", desc: "Penetrate the mainframe and defend your nodes in a relentless 24-hour Capture The Flag cyber warfare event.", 
        type: 'zeroDaySiege', size: 'w-48 h-48', x: 15, y: 50, labelPos: 'bottom' 
      },
      { id: 't2', title: "ALGORITHM ARENA", date: "Oct 5", desc: "A fast-paced algorithmic survival challenge. Optimize your logic and minimize time complexity before the server drops you.", 
        type: 'algorithmArena', size: 'w-36 h-36', x: 35, y: 25, labelPos: 'top' 
      },
      { id: 't3', title: "ANALYST'S CRUCIBLE", date: "Oct 5", desc: "Extract actionable metrics from a massive, corrupted database and present the hidden narrative to the judges.", 
        type: 'analystsCrucible', size: 'w-40 h-40', x: 55, y: 75, labelPos: 'bottom' 
      },
      { id: 't4', title: "PRODUCT VANGUARD", date: "Oct 6", desc: "Tear down a failing digital product. Analyze user friction, define new requirements, and architect a winning roadmap.", 
        type: 'productVanguard', size: 'w-40 h-40', x: 75, y: 35, labelPos: 'top' 
      },
      { id: 't5', title: "NEURAL CLASH", date: "Oct 7", desc: "Train an AI agent to navigate a simulated ecosystem. Deploy your model into the grid and watch it fight for supremacy.", 
        type: 'neuralClash', size: 'w-36 h-36', x: 90, y: 60, labelPos: 'bottom' 
      }
    ]
  },
  codeforge: {
    name: "THE CODEFORGE",
    color: "amber",
    events: [
      { id: 'c1', title: "APEX BUILDER", date: "Oct 10", desc: "The ultimate 72-hour flagship hackathon. Build, deploy, and pitch a fully functional product from scratch, combining brutal code with flawless product strategy.", type: 'stellarCore', x: 30, y: 50, size: 'w-56 h-56', labelPos: 'bottom' },
      { id: 'c2', title: "THE FOUNDRY", date: "Oct 11", desc: "Hardware meets software. A 48-hour IoT and embedded systems build sprint requiring physical prototyping.", type: 'ashWorld', x: 65, y: 20, size: 'w-40 h-40', labelPos: 'bottom' },
      { id: 'c3', title: "SYNTAX SHATTER", date: "Oct 12", desc: "Extreme speed-coding and code golf. Solve complex algorithms with the absolute minimum characters possible.", type: 'plasmaPlanet', x: 80, y: 40, size: 'w-36 h-36', labelPos: 'bottom' },
      { id: 'c4', title: "FORGE OF TITANS", date: "Oct 11", desc: "Architect decentralized systems and Web3 dApps. High stakes, heavy cryptography, and massive data ledgers.", type: 'moltenCore', x: 80, y: 65, size: 'w-48 h-48', labelPos: 'bottom' },
      { id: 'c5', title: "IGNITION PROTOCOL", date: "Oct 13", desc: "A massive open-source contribution sprint. Fix critical bugs and merge pull requests into real-world repositories.", type: 'crystalWorld', x: 65, y: 85, size: 'w-36 h-36', labelPos: 'bottom' }
    ]
  },
  knowledge: {
    name: "KNOWLEDGE NEBULA",
    color: "green",
    events: [
      { id: 'k1', title: "PRODUCT ARCHITECT", date: "Oct 15", desc: "A masterclass on transitioning from code to product. Learn how to define metrics, manage technical debt, and lead successful software lifecycles.", type: 'terraPrime', x: 50, y: 85, size: 'w-48 h-48', labelPos: 'bottom' },
      { id: 'k2', title: "DATA ALCHEMY", date: "Oct 16", desc: "An intensive bootcamp on turning raw data into actionable insights. Master SQL, visualization tools, and predictive modeling.", type: 'crystalWorld', x: 50, y: 55, size: 'w-40 h-40', labelPos: 'bottom' },
      { id: 'k3', title: "CLOUD NATIVE", date: "Oct 16", desc: "Master the modern web. A deep dive into deploying scalable, serverless architectures and understanding containerization.", type: 'nebulaWorld', x: 30, y: 30, size: 'w-36 h-36', labelPos: 'bottom' },
      { id: 'k4', title: "NEURAL WEAVING", date: "Oct 17", desc: "Advanced prompt engineering and GenAI integration. Learn how to securely wire Large Language Models into your own applications.", type: 'bioWorld', x: 70, y: 30, size: 'w-40 h-40', labelPos: 'bottom' },
      { id: 'k5', title: "UX SYNTHESIS", date: "Oct 18", desc: "The psychology of user interfaces. Learn wireframing, user retention psychology, and how to design frictionless digital experiences.", type: 'oceanWorld', x: 50, y: 15, size: 'w-36 h-36', labelPos: 'bottom' }
    ]
  },
  zenith: {
    name: "ZENITH CITADEL",
    color: "gold",
    // Topology: The Asymmetric Void (Chaotic, expansive, monumentally scaled)
    events: [
      { id: 'z1', title: "THE ZENITH ADDRESS", date: "Oct 20", desc: "The monumental closing keynote of IGNITO. Join pioneers as they map out the next decade of technological evolution.", 
        type: 'zenithAddress', size: 'w-64 h-64',
        x: 50, y: 50, labelPos: 'bottom' // Flagship: Dead Center
      },
      { id: 'z2', title: "THE PRODUCT HORIZON", date: "Oct 19", desc: "A visionary summit on transitioning into high-impact product management roles, leveraging artificial intelligence, and defining the roadmap for next-gen digital experiences.", 
        type: 'productHorizon', size: 'w-40 h-40',
        x: 20, y: 30, labelPos: 'top' // Pushed out top-left
      },
      { id: 'z3', title: "DATA & DESTINY", date: "Oct 19", desc: "Industry leaders discuss the evolving role of the analyst. Learn how to parse massive datasets to drive global architectural decisions.", 
        type: 'dataDestiny', size: 'w-36 h-36',
        x: 85, y: 20, labelPos: 'top' // Flung way out to the far top-right corner
      },
      { id: 'z4', title: "ARCHITECTS OF TOMORROW", date: "Oct 20", desc: "A fireside chat with startup founders who scaled their platforms from a dorm room to global dominance.", 
        type: 'architectsTomorrow', size: 'w-40 h-40',
        x: 30, y: 80, labelPos: 'bottom' // Pulled uncomfortably close to the bottom-left
      },
      { id: 'z5', title: "ECHOES OF INNOVATION", date: "Oct 20", desc: "An ethereal audio-visual experience celebrating the achievements, builds, and survival stories of this year's participants.", 
        type: 'echoesInnovation', size: 'w-48 h-48',
        x: 75, y: 85, labelPos: 'bottom' // Counter-balance on the bottom-right
      }
    ]
  }
};

// ==========================================
// 2. PRODUCTION-SAFE THEME LOOKUP
// ==========================================
const THEME_COLORS = {
  purple: { text: 'text-purple-400', border: 'border-purple-500', bg: 'bg-purple-600', hoverBg: 'hover:bg-purple-400' },
  cyan: { text: 'text-cyan-400', border: 'border-cyan-500', bg: 'bg-cyan-600', hoverBg: 'hover:bg-cyan-400' },
  amber: { text: 'text-amber-400', border: 'border-amber-500', bg: 'bg-amber-600', hoverBg: 'hover:bg-amber-400' },
  green: { text: 'text-emerald-400', border: 'border-emerald-500', bg: 'bg-emerald-600', hoverBg: 'hover:bg-emerald-400' },
  gold: { text: 'text-yellow-400', border: 'border-yellow-500', bg: 'bg-yellow-600', hoverBg: 'hover:bg-yellow-400' },
};

// ==========================================
// 3. MAIN COMPONENT
// ==========================================
export default function SystemMap({ sectorId, onBack }) {
  const [activeEvent, setActiveEvent] = useState(null);
  const systemData = DATABASE[sectorId] || DATABASE.tactical; 
  const theme = THEME_COLORS[systemData.color] || THEME_COLORS.cyan;

  return (
    <div className="relative w-full min-h-screen lg:min-h-[900px] lg:h-[calc(100vh-5rem)] rounded-3xl border border-white/10 bg-transparent overflow-hidden font-sans mb-32"> 
      
      {/* --- THE ABORT BUTTON --- */}
      <button 
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onBack(); 
        }}
        className="absolute bottom-6 left-6 lg:bottom-8 lg:left-10 z-[99999] flex items-center gap-3 px-6 py-3 bg-red-950/80 border border-red-500/50 text-red-400 font-bold tracking-[0.3em] hover:bg-red-600 hover:text-black hover:shadow-[0_0_30px_rgba(239,68,68,0.8)] rounded text-sm transition-all duration-300 pointer-events-auto shadow-[0_0_20px_rgba(0,0,0,0.8)]"
      >
        <span className="text-xl pb-1">«</span> <span className="hidden sm:inline">ABORT WARP</span>
      </button>

      {/* --- OVERLAY TITLE --- */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 text-center pointer-events-none z-10 w-full px-4">
        <h2 className={`text-3xl md:text-5xl font-black tracking-[0.5em] uppercase ${theme.text} drop-shadow-[0_0_15px_currentColor]`}>
          {systemData.name}
        </h2>
        <p className="text-[10px] text-gray-400 tracking-[0.5em] mt-3 border-t border-white/10 pt-2 inline-block">
          <span className="hidden lg:inline">ORBITAL VIEW</span>
          <span className="inline lg:hidden">TACTICAL FEED</span>
        </p>
      </div>

      {/* ========================================== */}
      {/* DESKTOP UI: ORBITAL VIEW (Hidden on Mobile) */}
      {/* ========================================== */}
      <motion.div 
        className="hidden lg:block absolute top-36 bottom-28 left-10 right-10 cursor-none"
        animate={{ scale: activeEvent ? 2.5 : 1, opacity: activeEvent ? 0.3 : 1 }}
        style={{ transformOrigin: activeEvent ? `${activeEvent.x}% ${activeEvent.y}%` : "center center" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        {systemData.events.map((event) => {
          const fluidSize = event.size.includes('64') ? 'w-[clamp(10rem,24vmin,18rem)] h-[clamp(10rem,24vmin,18rem)]'
                          : event.size.includes('56') ? 'w-[clamp(8.5rem,20vmin,15rem)] h-[clamp(8.5rem,20vmin,15rem)]'
                          : event.size.includes('48') ? 'w-[clamp(7rem,16vmin,13rem)] h-[clamp(7rem,16vmin,13rem)]'
                          : event.size.includes('40') ? 'w-[clamp(5.5rem,13vmin,11rem)] h-[clamp(5.5rem,13vmin,11rem)]'
                          : 'w-[clamp(5rem,11vmin,10rem)] h-[clamp(5rem,11vmin,10rem)]'; 

          // THE STREAMLINED LABEL ENGINE (Top / Bottom Only)
          const isTop = event.labelPos === 'top';
          const labelVerticalClasses = isTop ? "bottom-full mb-6" : "top-full mt-6";
          const labelAlignClasses = "left-1/2 -translate-x-1/2 text-center";

          return (
            <div
              key={event.id}
              className="absolute group z-20 pointer-events-auto"
              style={{ left: `${event.x}%`, top: `${event.y}%`, transform: 'translate(-50%, -50%)' }}
              onClick={() => setActiveEvent(event)}
            >
              <motion.div whileHover={{ scale: 1.15 }} className="relative flex items-center justify-center">
                <CelestialBody type={event.type} sizeClass={fluidSize} />
                <div className="absolute inset-[-20px] rounded-full border border-dashed border-white/0 group-hover:border-white/50 group-hover:animate-[spin_4s_linear_infinite] transition-all duration-500 pointer-events-none opacity-0 group-hover:opacity-100"></div>
                <div className="absolute w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-50"></div>
              </motion.div>
              
              <div className={`absolute ${labelVerticalClasses} ${labelAlignClasses} pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity duration-300 w-max z-50`}>
                <p className="text-sm font-black tracking-[0.3em] text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
                  {event.title}
                </p>
                {event.subtitle && (
                  <p className="text-[9px] font-bold tracking-[0.4em] text-cyan-200/60 mt-1 drop-shadow-md">
                    {event.subtitle}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </motion.div>

      {/* ========================================== */}
      {/* MOBILE UI: TACTICAL FEED (Hidden on Desktop) */}
      {/* ========================================== */}
      <div className="block lg:hidden absolute top-32 bottom-20 left-4 right-4 overflow-y-auto no-scrollbar z-20">
        <div className="flex flex-col gap-6 pb-20 pt-4">
          {systemData.events.map((event) => (
            <div key={event.id} className="bg-black/50 backdrop-blur-md border border-white/10 rounded-2xl p-6 flex flex-col items-center text-center relative overflow-hidden">
              <div className={`absolute top-0 left-0 w-full h-1 ${theme.bg} opacity-50`}></div>
              <div className="mb-6 mt-2 relative">
                 <CelestialBody type={event.type} sizeClass="w-32 h-32" />
              </div>
              <h3 className="text-2xl font-black text-white mb-2 uppercase tracking-widest leading-tight">{event.title}</h3>
              {event.subtitle && (
                <p className="text-[10px] font-bold tracking-[0.4em] text-cyan-200/60 mb-4 uppercase">{event.subtitle}</p>
              )}
              <div className="inline-block bg-white/10 px-3 py-1 text-xs text-white tracking-widest font-mono border border-white/20 mb-6 rounded">
                {event.date}
              </div>
              <p className="text-gray-400 leading-relaxed text-sm tracking-wide mb-6">{event.desc}</p>
              <button className={`w-full py-3 rounded ${theme.bg} ${theme.hoverBg} text-black font-black text-xs tracking-[0.3em] transition-all`}>
                DEPLOY NOW
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* --- DESKTOP WARFRAME STYLE HUD --- */}
      <AnimatePresence>
        {activeEvent && (
          <motion.div
            initial={{ opacity: 0, x: 50, skewX: -5 }} 
            animate={{ opacity: 1, x: 0, skewX: 0 }}
            exit={{ opacity: 0, x: 50, skewX: -5 }}
            className="hidden lg:flex absolute right-0 top-0 h-full w-[400px] items-center justify-end z-50 pointer-events-none pr-8"
          >
            <div className={`bg-black/80 backdrop-blur-2xl border-l-2 ${theme.border} p-10 w-full shadow-[-20px_0_50px_rgba(0,0,0,0.8)] pointer-events-auto cursor-none relative flex flex-col justify-center`}>
              <div className={`absolute top-0 left-0 w-full h-1 ${theme.bg} opacity-50`}></div>
              <p className={`text-[10px] ${theme.text} tracking-[0.4em] mb-2 uppercase`}>DIRECTIVE HIGHLIGHT</p>
              <h3 className="text-3xl font-black text-white mb-6 uppercase tracking-widest break-words leading-tight">{activeEvent.title}</h3>
              <div className="flex items-center gap-4 mb-8">
                <span className="bg-white/10 px-3 py-1 text-xs text-white tracking-widest font-mono border border-white/20">{activeEvent.date}</span>
                <span className="w-full h-[1px] bg-white/20"></span>
              </div>
              <p className="text-gray-400 leading-relaxed mb-12 text-sm tracking-wide overflow-y-auto">{activeEvent.desc}</p>
              <div className="flex flex-col gap-4">
                <button className={`w-full py-4 ${theme.bg} ${theme.hoverBg} text-black font-black text-sm tracking-[0.3em] transition-all cursor-none shadow-[0_0_20px_rgba(255,255,255,0.1)]`}>DEPLOY NOW</button>
                <button onClick={() => setActiveEvent(null)} className="w-full py-3 border border-gray-600 text-gray-500 hover:text-white hover:border-white text-xs tracking-widest transition-all cursor-none">DISMISS</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}