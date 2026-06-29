import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import SpaceBackground from './components/SpaceBackground'; 
import UniverseMap from './components/UniverseMap'; 
import SystemMap from './components/SystemMap'; 
import Contact from './components/Contact'; 

export default function App() {
  const [activeSector, setActiveSector] = useState(null);
  
  // TRACKING REFS
  const eventsContainerRef = useRef(null);
  const lastSectorRef = useRef(null);

  const scrollToEvents = () => {
    eventsContainerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // THE WARP ENGINE
  const initiateWarp = (sectorId) => {
    lastSectorRef.current = sectorId;
    
    // Smoothly pan the camera to the staging area WHILE the exit animation plays
    // This perfectly masks the height collapse of the Universe map unmounting.
    eventsContainerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    
    setActiveSector(sectorId);
  };

  const abortWarp = () => {
    // We strictly wipe the state here. 
    // The camera pan is handled securely by onAnimationComplete below.
    setActiveSector(null); 
  };

  return (
    <div className="relative bg-transparent text-white min-h-screen font-sans cursor-none">
      
      <SpaceBackground />
      <CustomCursor />
      <Navbar />

      <main id="home" className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center pointer-events-none">
        <div className="relative inline-block">
          <h2 className="text-7xl md:text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-purple-600 via-cyan-400 to-blue-600 drop-shadow-lg">
            IGNITO
          </h2>
        </div>
        <p className="mt-6 text-lg md:text-xl text-gray-400 max-w-lg tracking-widest">
          THE ULTIMATE SPACE TECHFEST
        </p>
        
        <button 
          onClick={scrollToEvents}
          className="mt-12 px-8 py-3 rounded-full bg-cyan-900/30 border border-cyan-400 text-cyan-400 font-bold tracking-widest pointer-events-auto cursor-none hover:bg-cyan-400 hover:text-black transition-all shadow-[0_0_20px_rgba(34,211,238,0.2)]"
        >
          ENTER STAR CHART
        </button>
      </main>

      {/* REACT REF ANCHOR: The viewport camera locks onto this container */}
      <section ref={eventsContainerRef} className="relative z-10 w-full min-h-screen pt-20">
        
        <AnimatePresence mode="wait">
          {!activeSector ? (
            
            <motion.div 
              key="universe"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.5 }} 
              transition={{ duration: 0.8, ease: "easeInOut" }}
              onAnimationComplete={(definition) => {
                // When the Universe is fully mounted and stable, 
                // pan the camera directly to the galaxy you just came from.
                if (definition === "animate" && lastSectorRef.current) {
                  const targetGalaxy = document.getElementById(`galaxy-${lastSectorRef.current}`);
                  targetGalaxy?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
              }}
            >
              <div className="text-center mb-12 pointer-events-none">
                <h3 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 tracking-widest">
                  NAVIGATION
                </h3>
                <p className="text-gray-400 tracking-[0.4em] uppercase mt-2 text-sm">
                  Select Sector Destination
                </p>
              </div>
              
              <UniverseMap onSelectSector={initiateWarp} />
            </motion.div>

          ) : (
            
            <motion.div
              key="system"
              initial={{ opacity: 0, scale: 0.5 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              onAnimationComplete={(definition) => {
                // Ensure the camera is perfectly locked to the top of the map 
                // once the planetary system physically finishes rendering.
                if (definition === "animate") {
                  eventsContainerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
            >
              <SystemMap sectorId={activeSector} onBack={abortWarp} />
            </motion.div>
            
          )}
        </AnimatePresence>

      </section>

      <Contact />

    </div>
  );
}