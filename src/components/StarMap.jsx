import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CelestialBody from './CelestialBody';

// THE SYSTEM DATA
const PLANETS = [
  { 
    id: 'pro', 
    title: 'PRO CIRCUIT', 
    type: 'gasGiant', 
    sizeClass: 'w-64 h-64', 
    x: 75, y: 35, 
    color: 'cyan'
  },
  { 
    id: 'featured', 
    title: 'FEATURED EVENTS', 
    type: 'iceMoon', 
    sizeClass: 'w-56 h-56', 
    x: 25, y: 65, 
    color: 'purple' 
  }
];

// THE EVENT CONSTELLATIONS (Clustered tightly around their parent planet's coordinates)
const EVENT_NODES = [
  // PRO CIRCUIT (Orbiting X: 75, Y: 35)
  { id: 1, title: "Robo Wars", date: "July 2", desc: "Build. Fight. Survive. The ultimate arena.", x: 71, y: 28, cluster: 'pro' },
  { id: 2, title: "Code Red", date: "July 3", desc: "48 hours of pure algorithmic survival.", x: 78, y: 31, cluster: 'pro' },
  { id: 3, title: "PM Challenge", date: "July 3", desc: "Pitch, pivot, and launch.", x: 73, y: 40, cluster: 'pro' },
  { id: 4, title: "Data Dash", date: "July 4", desc: "Actionable analytics from raw chaos.", x: 79, y: 42, cluster: 'pro' },
  
  // FEATURED EVENTS (Orbiting X: 25, Y: 65)
  { id: 5, title: "VR Escape", date: "July 2", desc: "Navigate the digital maze.", x: 20, y: 60, cluster: 'featured' },
  { id: 6, title: "Cyber CTF", date: "July 3", desc: "Capture the flag. Defend your servers.", x: 28, y: 58, cluster: 'featured' },
  { id: 7, title: "Drone Racing", date: "July 4", desc: "Mach 1 in the sky.", x: 22, y: 70, cluster: 'featured' },
  { id: 8, title: "Algo Odyssey", date: "July 4", desc: "Solve the unsolvable.", x: 30, y: 72, cluster: 'featured' },
];

export default function StarMap() {
  const [activePlanet, setActivePlanet] = useState(null);
  const [activeEvent, setActiveEvent] = useState(null);

  // Get the currently focused planet object for coordinate anchoring
  const focusedPlanet = PLANETS.find(p => p.id === activePlanet);

  const renderConstellationLines = (clusterId, color) => {
    const clusterNodes = EVENT_NODES.filter(node => node.cluster === clusterId);
    return clusterNodes.map((node, i) => {
      if (i === clusterNodes.length - 1) return null;
      const nextNode = clusterNodes[i + 1];
      return (
        <motion.line
          key={`line-${clusterId}-${i}`}
          x1={`${node.x}%`} y1={`${node.y}%`}
          x2={`${nextNode.x}%`} y2={`${nextNode.y}%`}
          stroke={color}
          strokeWidth="0.5" // Very thin because it will be multiplied by 3.5x zoom!
          strokeDasharray="2 2"
          initial={{ pathLength: 0, opacity: 0 }}
          // Only animate the line IN if this planet is currently being viewed
          animate={{ pathLength: 1, opacity: activePlanet === clusterId ? 0.6 : 0 }}
          transition={{ duration: 1.5, delay: i * 0.2 }}
        />
      );
    });
  };

  const handleZoomOut = () => {
    setActiveEvent(null);
    setActivePlanet(null);
  };

  return (
    <div className="relative w-full h-[700px] bg-transparent rounded-3xl border border-cyan-900/40 overflow-hidden font-sans cursor-none">
      
      {/* GLOBAL HUD (Always visible when a planet is selected) */}
      <AnimatePresence>
        {activePlanet && !activeEvent && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-6 left-6 z-50 pointer-events-auto"
          >
            <button 
              onClick={handleZoomOut}
              className="flex items-center gap-3 px-6 py-2 bg-black/40 border border-cyan-500/30 text-cyan-400 text-xs tracking-[0.2em] hover:bg-cyan-900/40 hover:text-white rounded-full transition-all cursor-none backdrop-blur-md"
            >
              <span className="text-lg pb-1">«</span> RETURN TO SYSTEM
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* THE CAMERA VIEWPORT */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        animate={{
          scale: activePlanet ? 3.5 : 1, 
        }}
        style={{
          // Anchors the camera directly on the planet you clicked
          transformOrigin: focusedPlanet ? `${focusedPlanet.x}% ${focusedPlanet.y}%` : 'center center'
        }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }} 
      >
        
        {/* LAYER 0: The Planets */}
        {PLANETS.map((planet) => (
          <div
            key={planet.id}
            className="absolute z-0 group cursor-none"
            style={{ left: `${planet.x}%`, top: `${planet.y}%`, transform: 'translate(-50%, -50%)' }}
            onClick={() => !activePlanet && setActivePlanet(planet.id)}
          >
            <CelestialBody 
              type={planet.type} 
              sizeClass={planet.sizeClass} 
              // Dim the planet if we are viewing a different one
              className={`transition-opacity duration-1000 ${activePlanet && activePlanet !== planet.id ? 'opacity-20' : 'opacity-100'}`}
            />
            
            {/* The Tactical Target Ring (Appears on hover at Level 0) */}
            {!activePlanet && (
              <div className="absolute inset-[-20px] rounded-full border border-dashed border-white/20 opacity-0 group-hover:opacity-100 group-hover:animate-spin-slow transition-opacity duration-500 pointer-events-none"></div>
            )}

            {/* Level 0 Planet Label (Disappears when zooming in) */}
            <motion.div 
              className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-center pointer-events-none"
              animate={{ opacity: activePlanet ? 0 : 1, scale: activePlanet ? 0.5 : 1 }}
            >
              <p className={`text-[10px] tracking-[0.4em] font-bold text-${planet.color}-200 whitespace-nowrap`}>
                {planet.title}
              </p>
              <p className="text-[8px] text-gray-400 tracking-widest mt-1 uppercase whitespace-nowrap">
                Scan to explore
              </p>
            </motion.div>
          </div>
        ))}

        {/* LAYER 1: Constellation Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
          {renderConstellationLines("pro", "rgba(34, 211, 238, 0.8)")} 
          {renderConstellationLines("featured", "rgba(168, 85, 247, 0.8)")} 
        </svg>

        {/* LAYER 2: The Event Nodes (Only visible when their planet is active) */}
        {EVENT_NODES.map((node) => (
          <div
            key={node.id}
            className="absolute z-10 cursor-none"
            // The outer div uses standard CSS so Framer doesn't break the coordinates
            style={{ left: `${node.x}%`, top: `${node.y}%`, transform: 'translate(-50%, -50%)' }}
          >
            <motion.div 
              // INVERSE SCALING MAGIC: 
              // Scale is set to 0.28 because 0.28 * 3.5x map zoom = exactly 1.0 (Normal size!)
              animate={{ 
                scale: activePlanet === node.cluster ? 0.28 : 0, 
                opacity: activePlanet === node.cluster ? 1 : 0 
              }}
              whileHover={{ scale: activePlanet === node.cluster ? 0.35 : 0 }}
              className="relative flex flex-col items-center justify-center cursor-none pointer-events-auto"
              onClick={() => setActiveEvent(node)}
            >
              <div className="relative flex items-center justify-center w-6 h-6">
                <div className={`absolute w-full h-full rounded-full blur-[4px] transition-all duration-300 ${node.cluster === 'pro' ? 'bg-cyan-400' : 'bg-purple-400'} opacity-80`}></div>
                <div className="w-2 h-2 bg-white rounded-full z-10 shadow-[0_0_10px_white]"></div>
              </div>
              
              <span className="absolute top-8 text-xs text-white tracking-[0.2em] font-bold uppercase whitespace-nowrap drop-shadow-md pointer-events-none">
                {node.title}
              </span>
            </motion.div>
          </div>
        ))}
      </motion.div>

      {/* LAYER 3: THE EVENT HUD (Slides up over the zoomed planet) */}
      <AnimatePresence>
        {activeEvent && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -30 }}
            transition={{ duration: 0.4 }} 
            className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none"
          >
            <div className="bg-slate-950/80 backdrop-blur-xl border border-cyan-500/40 p-10 rounded-2xl w-[90%] max-w-2xl text-center shadow-[0_0_100px_rgba(6,182,212,0.2)] pointer-events-auto cursor-none relative overflow-hidden">
              
              {/* Sci-fi corner accents */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-400 opacity-50"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-400 opacity-50"></div>

              <div className="inline-block px-4 py-1 border border-cyan-400/50 text-cyan-300 text-[10px] tracking-[0.3em] uppercase mb-6 rounded-full bg-cyan-900/20">
                {activeEvent.cluster} Directive
              </div>
              
              <h3 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight drop-shadow-lg">
                {activeEvent.title}
              </h3>
              
              <p className="text-lg text-yellow-400 font-mono mb-6 bg-black/40 inline-block px-4 py-1 rounded-md">{activeEvent.date}</p>
              
              <p className="text-base text-gray-300 leading-relaxed mb-10 max-w-lg mx-auto">
                {activeEvent.desc}
              </p>
              
              <div className="flex justify-center gap-4">
                <button 
                  onClick={() => setActiveEvent(null)}
                  className="px-6 py-3 bg-transparent border border-gray-600 text-gray-300 hover:text-white hover:border-white font-bold text-sm tracking-widest rounded transition-all cursor-none"
                >
                  DISMISS
                </button>
                <button className="px-8 py-3 bg-cyan-600 hover:bg-cyan-400 text-black font-extrabold text-sm tracking-widest rounded transition-all cursor-none shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_40px_rgba(6,182,212,0.8)]">
                  INITIALIZE REGISTRATION
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}