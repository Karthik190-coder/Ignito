import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CelestialBody from './CelestialBody'; 

// ==========================================
// 1. THE MASTER EVENT DATABASE
// (Updated with bespoke, thematic topologies)
// ==========================================
const DATABASE = {
  nexus: {
    name: "THE NEXUS",
    color: "purple",
    // Topology: The Central Star (Capital Hub)
    events: [
      { id: 'n1', title: "IGNITION CEREMONY", date: "12 Sept • 6:00 PM", desc: "The official opening of IGNITO featuring keynote speakers, immersive visuals, and the unveiling of this year's technological frontier.", type: 'moltenCore', x: 50, y: 50, size: 'w-56 h-56' },
      { id: 'n4', title: "STELLAR TALKS", date: "13 Sept", desc: "Inspiring sessions from innovators, entrepreneurs, and researchers shaping tomorrow's technology.", type: 'oceanWorld', x: 50, y: 25, size: 'w-36 h-36' },
      { id: 'n2', title: "NOVA EXPO", subtitle: "PROJECT EXHIBITION", date: "13 Sept", desc: "Explore groundbreaking student innovations, engineering prototypes, AI applications, and research projects.", type: 'edenWorld', x: 18, y: 45, size: 'w-48 h-48' },
      { id: 'n3', title: "LAUNCHPAD", date: "14 Sept", desc: "Startup pitch competition connecting founders with mentors, investors, and industry experts.", type: 'marsCore', x: 82, y: 45, size: 'w-40 h-40' },
      { id: 'n5', title: "COSMOS CONNECT", date: "14 Sept", desc: "A networking arena bringing together students, recruiters, startups, and creators.", type: 'gasGiant', x: 30, y: 82, size: 'w-40 h-40' },
      { id: 'n6', title: "HALL OF LUMINARIES", date: "15 Sept • 7:00 PM", desc: "The grand finale recognizing champions, innovators, and remarkable achievements across IGNITO.", type: 'toxicAnomaly', x: 70, y: 82, size: 'w-36 h-36' }
    ]
  },
  tactical: {
    name: "TACTICAL CLUSTER",
    color: "cyan",
    // Topology: The Linear Breach (Cyber Warfare Attack Vector)
    events: [
      { id: 't1', title: "ZERO-DAY SIEGE", date: "Oct 4", desc: "Penetrate the mainframe and defend your nodes in a relentless 24-hour Capture The Flag cyber warfare event.", type: 'quantumWorld', x: 20, y: 50, size: 'w-48 h-48' },
      { id: 't2', title: "ALGORITHM ARENA", date: "Oct 5", desc: "A fast-paced algorithmic survival challenge. Optimize your logic and minimize time complexity before the server drops you.", type: 'iceMoon', x: 40, y: 25, size: 'w-36 h-36' },
      { id: 't3', title: "ANALYST'S CRUCIBLE", date: "Oct 5", desc: "Extract actionable metrics from a massive, corrupted database and present the hidden narrative to the judges.", type: 'crystalWorld', x: 60, y: 75, size: 'w-40 h-40' },
      { id: 't4', title: "PRODUCT VANGUARD", date: "Oct 6", desc: "Tear down a failing digital product. Analyze user friction, define new requirements, and architect a winning roadmap.", type: 'plasmaPlanet', x: 75, y: 40, size: 'w-40 h-40' },
      { id: 't5', title: "NEURAL CLASH", date: "Oct 7", desc: "Train an AI agent to navigate a simulated ecosystem. Deploy your model into the grid and watch it fight for supremacy.", type: 'voidPlanet', x: 90, y: 65, size: 'w-36 h-36' }
    ]
  },
  codeforge: {
    name: "THE CODEFORGE",
    color: "amber",
    // Topology: The Orbital Arc (Heavy Engineering Gravity Well)
    events: [
      { id: 'c1', title: "APEX BUILDER", date: "Oct 10", desc: "The ultimate 72-hour flagship hackathon. Build, deploy, and pitch a fully functional product from scratch, combining brutal code with flawless product strategy.", type: 'stellarCore', x: 30, y: 50, size: 'w-56 h-56' },
      { id: 'c2', title: "THE FOUNDRY", date: "Oct 11", desc: "Hardware meets software. A 48-hour IoT and embedded systems build sprint requiring physical prototyping.", type: 'ashWorld', x: 65, y: 20, size: 'w-40 h-40' },
      { id: 'c3', title: "SYNTAX SHATTER", date: "Oct 12", desc: "Extreme speed-coding and code golf. Solve complex algorithms with the absolute minimum characters possible.", type: 'plasmaPlanet', x: 80, y: 40, size: 'w-36 h-36' },
      { id: 'c4', title: "FORGE OF TITANS", date: "Oct 11", desc: "Architect decentralized systems and Web3 dApps. High stakes, heavy cryptography, and massive data ledgers.", type: 'moltenCore', x: 80, y: 65, size: 'w-48 h-48' },
      { id: 'c5', title: "IGNITION PROTOCOL", date: "Oct 13", desc: "A massive open-source contribution sprint. Fix critical bugs and merge pull requests into real-world repositories.", type: 'crystalWorld', x: 65, y: 85, size: 'w-36 h-36' }
    ]
  },
  knowledge: {
    name: "KNOWLEDGE NEBULA",
    color: "green",
    // Topology: The Progression Tree (Branching Masterclasses)
    events: [
      { id: 'k1', title: "PRODUCT ARCHITECT", date: "Oct 15", desc: "A masterclass on transitioning from code to product. Learn how to define metrics, manage technical debt, and lead successful software lifecycles.", type: 'terraPrime', x: 50, y: 85, size: 'w-48 h-48' },
      { id: 'k2', title: "DATA ALCHEMY", date: "Oct 16", desc: "An intensive bootcamp on turning raw data into actionable insights. Master SQL, visualization tools, and predictive modeling.", type: 'crystalWorld', x: 50, y: 55, size: 'w-40 h-40' },
      { id: 'k3', title: "CLOUD NATIVE", date: "Oct 16", desc: "Master the modern web. A deep dive into deploying scalable, serverless architectures and understanding containerization.", type: 'nebulaWorld', x: 30, y: 30, size: 'w-36 h-36' },
      { id: 'k4', title: "NEURAL WEAVING", date: "Oct 17", desc: "Advanced prompt engineering and GenAI integration. Learn how to securely wire Large Language Models into your own applications.", type: 'bioWorld', x: 70, y: 30, size: 'w-40 h-40' },
      { id: 'k5', title: "UX SYNTHESIS", date: "Oct 18", desc: "The psychology of user interfaces. Learn wireframing, user retention psychology, and how to design frictionless digital experiences.", type: 'oceanWorld', x: 50, y: 15, size: 'w-36 h-36' }
    ]
  },
  zenith: {
    name: "ZENITH CITADEL",
    color: "gold",
    // Topology: The Asymmetric Void (Chaotic Finale)
    events: [
      { id: 'z1', title: "THE ZENITH ADDRESS", date: "Oct 20", desc: "The monumental closing keynote of IGNITO. Join pioneers as they map out the next decade of technological evolution.", type: 'stellarCore', x: 50, y: 50, size: 'w-64 h-64' },
      { id: 'z2', title: "THE PRODUCT HORIZON", date: "Oct 19", desc: "A visionary summit on transitioning into high-impact product management roles, leveraging artificial intelligence, and defining the roadmap for next-gen digital experiences.", type: 'crystalWorld', x: 20, y: 30, size: 'w-40 h-40' },
      { id: 'z3', title: "DATA & DESTINY", date: "Oct 19", desc: "Industry leaders discuss the evolving role of the analyst. Learn how to parse massive datasets to drive global architectural decisions.", type: 'oceanWorld', x: 85, y: 20, size: 'w-36 h-36' },
      { id: 'z4', title: "ARCHITECTS OF TOMORROW", date: "Oct 20", desc: "A fireside chat with startup founders who scaled their platforms from a dorm room to global dominance.", type: 'plasmaPlanet', x: 30, y: 80, size: 'w-40 h-40' },
      { id: 'z5', title: "ECHOES OF INNOVATION", date: "Oct 20", desc: "An ethereal audio-visual experience celebrating the achievements, builds, and survival stories of this year's participants.", type: 'nebulaWorld', x: 75, y: 85, size: 'w-48 h-48' }
    ]
  }
};

// ==========================================
// 2. MAIN COMPONENT
// ==========================================
export default function SystemMap({ sectorId, onBack }) {
  const [activeEvent, setActiveEvent] = useState(null);
  const systemData = DATABASE[sectorId] || DATABASE.tactical; 

  return (
    <div className="relative w-full min-h-[1200px] lg:min-h-[1300px] min-h-[850px] md:min-h-[calc(100vh-80px)] rounded-3xl border border-white/10 bg-transparent overflow-hidden cursor-none font-sans pb-24 mb-32"> 
      
      {/* --- THE ABORT BUTTON --- */}
      <button 
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onBack(); 
        }}
        className="absolute bottom-8 left-6 md:left-10 z-[99999] flex items-center gap-3 px-6 py-3 bg-red-950/80 border border-red-500/50 text-red-400 font-bold tracking-[0.3em] hover:bg-red-600 hover:text-black hover:shadow-[0_0_30px_rgba(239,68,68,0.8)] rounded text-sm transition-all duration-300 cursor-none pointer-events-auto shadow-[0_0_20px_rgba(0,0,0,0.8)]"
      >
        <span className="text-xl pb-1">«</span> ABORT WARP
      </button>

      {/* --- OVERLAY TITLE --- */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 text-center pointer-events-none z-10 w-full px-4">
        <h2 className={`text-3xl md:text-5xl font-black tracking-[0.5em] uppercase text-${systemData.color}-400 drop-shadow-[0_0_15px_currentColor]`}>
          {systemData.name}
        </h2>
        <p className="text-[10px] text-gray-400 tracking-[0.5em] mt-3 border-t border-white/10 pt-2 inline-block">
          ORBITAL VIEW
        </p>
      </div>

      {/* --- RESPONSIVE SAFE ZONE RENDERER --- */}
      {/* This is the magic wrapper. It provides a padded bounding box so the 0-100% coordinates 
        from the database scale flawlessly on any device without hitting the edges or buttons. 
      */}
      <motion.div 
        className="absolute top-[18%] bottom-[15%] left-[2%] right-[2%] md:top-[20%] md:bottom-[15%] md:left-[8%] md:right-[8%] lg:left-[15%] lg:right-[15%]"
        animate={{ scale: activeEvent ? 2.5 : 1, opacity: activeEvent ? 0.3 : 1 }}
        style={{
          transformOrigin: activeEvent
            ? `${activeEvent.x}% ${activeEvent.y}%`
            : "center center"
        }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        {systemData.events.map((event) => (
          <div
            key={event.id}
            className="absolute group z-20 cursor-none"
            // We read directly from your curated database coordinates here
            style={{ left: `${event.x}%`, top: `${event.y}%`, transform: 'translate(-50%, -50%)' }}
            onClick={() => setActiveEvent(event)}
          >
            {/* The 2.5D Planet */}
            <motion.div whileHover={{ scale: 1.15 }} className="relative flex items-center justify-center">
              <CelestialBody type={event.type} sizeClass={event.size} />
              
              {/* Warframe Target Crosshair */}
              <div className="absolute inset-[-20px] rounded-full border border-dashed border-white/0 group-hover:border-white/50 group-hover:animate-[spin_4s_linear_infinite] transition-all duration-500 pointer-events-none opacity-0 group-hover:opacity-100"></div>
              
              {/* Center Dot */}
              <div className="absolute w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-50"></div>
            </motion.div>
            
            {/* Planet Tactical Label */}
            <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 text-center pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity duration-300">
              <p className="text-sm font-black tracking-[0.3em] text-white whitespace-nowrap drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
                {event.title}
              </p>
              {event.subtitle && (
                <p className="text-[9px] font-bold tracking-[0.4em] text-cyan-200/60 whitespace-nowrap mt-1 drop-shadow-md">
                  {event.subtitle}
                </p>
              )}
            </div>
          </div>
        ))}
      </motion.div>

      {/* --- WARFRAME STYLE HUD (Right-Side Slide-In Panel) --- */}
      <AnimatePresence>
        {activeEvent && (
          <motion.div
            initial={{ opacity: 0, x: 50, skewX: -5 }} 
            animate={{ opacity: 1, x: 0, skewX: 0 }}
            exit={{ opacity: 0, x: 50, skewX: -5 }}
            className="absolute right-0 top-0 h-full w-full md:w-[400px] flex items-center justify-end z-50 pointer-events-none md:pr-8"
          >
            <div className={`bg-black/80 backdrop-blur-2xl border-l-2 border-${systemData.color}-500 p-8 md:p-10 w-full h-full md:h-auto shadow-[-20px_0_50px_rgba(0,0,0,0.8)] pointer-events-auto cursor-none relative flex flex-col justify-center`}>
              
              <div className={`absolute top-0 left-0 w-full h-1 bg-${systemData.color}-500/50`}></div>

              <p className={`text-[10px] text-${systemData.color}-400 tracking-[0.4em] mb-2 uppercase`}>
                DIRECTIVE HIGHLIGHT
              </p>
              
              <h3 className="text-3xl md:text-4xl font-black text-white mb-6 uppercase tracking-widest break-words leading-tight">
                {activeEvent.title}
              </h3>
              
              <div className="flex items-center gap-4 mb-8">
                <span className="bg-white/10 px-3 py-1 text-xs text-white tracking-widest font-mono border border-white/20">
                  {activeEvent.date}
                </span>
                <span className="w-full h-[1px] bg-white/20"></span>
              </div>
              
              <p className="text-gray-400 leading-relaxed mb-12 text-sm tracking-wide overflow-y-auto">
                {activeEvent.desc}
              </p>
              
              <div className="flex flex-col gap-4 mt-auto md:mt-0">
                <button className={`w-full py-4 bg-${systemData.color}-600 hover:bg-${systemData.color}-400 text-black font-black text-sm tracking-[0.3em] transition-all cursor-none shadow-[0_0_20px_rgba(255,255,255,0.1)]`}>
                  DEPLOY NOW
                </button>
                <button 
                  onClick={() => setActiveEvent(null)} 
                  className="w-full py-3 border border-gray-600 text-gray-500 hover:text-white hover:border-white text-xs tracking-widest transition-all cursor-none"
                >
                  DISMISS
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}