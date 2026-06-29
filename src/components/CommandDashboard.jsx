import React, { useState } from 'react';
import Reveal from './Reveal';
import TiltCard from './TiltCard'; 
import { motion, AnimatePresence } from 'framer-motion'; 

const dashboardData = {
  events: [
    { id: 'ev-1', title: "Lunar Hackathon", time: "Day 1 | 10:00 AM", description: "A 24-hour coding sprint to build solutions for deep-space colonization. Bring your best algorithms.", tags: ["Coding", "Team Event"], fullText: "Prepare for a grueling 24 hours. You will be provided with simulated telemetry data from the Artemis III mission. Your goal is to build an automated resource-allocation dashboard that prioritizes oxygen and power based on crew vitals. Top teams will present to a panel of senior engineers." },
    { id: 'ev-2', title: "Zero-G Robotics", time: "Day 1 | 02:00 PM", description: "Design and program autonomous rovers capable of navigating simulated asteroid terrain.", tags: ["Hardware", "AI"], fullText: "Bring your custom-built rovers. Our arena mimics the low-friction, high-debris environment of the asteroid belt. Your rover must autonomously navigate a maze, retrieve a core sample, and return to base within 5 minutes. No manual remote controls allowed once the timer starts." },
    { id: 'ev-3', title: "Nebula UI/UX Challenge", time: "Day 2 | 09:30 AM", description: "Design the interface for a next-generation orbital station dashboard. Aesthetics meet functionality.", tags: ["Design", "Solo Event"], fullText: "You have 6 hours to wireframe, design, and prototype a command console for a commercial space station. We are looking for dark mode aesthetics, high-contrast critical alerts, and seamless user flows. Final submissions must be interactive Figma prototypes." }
  ],
  competitions: [
    { id: 'co-1', title: "Galactic E-Sports Arena", prize: "Prize Pool: ₹50,000", description: "Battle it out in zero-gravity simulators and tactical space-shooters. Team coordination is your only lifeline.", tags: ["Gaming", "Squad of 4"], fullText: "Squad up. This is a double-elimination tournament across three tactical shooters. You need aim, strategy, and perfect comms. Bring your own peripherals. PCs and monitors will be provided. The grand finals will be broadcast live on the main stage." },
    { id: 'co-2', title: "Astro-Debate Syndicate", prize: "Prize Pool: ₹15,000", description: "Argue the ethics of planetary colonization, AI governance, and interstellar resource mining against top minds.", tags: ["Speaking", "Solo/Duo"], fullText: "Topics will be revealed 15 minutes before each round. You must be prepared to argue both for and against motions like 'Corporations should have sovereign rights over asteroids' and 'AI must be banned from orbital weapons platforms.' Judges include policy experts and tech CEOs." },
    { id: 'co-3', title: "Cosmic Code-Breaking", prize: "Prize Pool: ₹25,000", description: "Intercept and decrypt simulated alien transmissions. A high-stakes, time-pressured cryptography gauntlet.", tags: ["Cybersecurity", "Solo Event"], fullText: "A Capture The Flag (CTF) event unlike any other. You will be given audio files, corrupted data packets, and raw binary streams. Use reverse engineering, steganography, and pure cryptographic math to find the flags before time runs out." },
    { id: 'co-4', title: "Robo-Sumo: Mars Edition", prize: "Prize Pool: ₹30,000", description: "Design autonomous bots to push opponents out of the Martian crater ring. Only the strongest engineering survives.", tags: ["Robotics", "Team Event"], fullText: "Bots must weigh under 3kg and fit within a 30x30cm starting box. Weapons are allowed but must not permanently damage the arena or spectators. Matches are 3 minutes long. If your bot is pushed out of the ring, you lose. May the best engineering win." }
  ]
};

export default function CommandDashboard() {
  const [activeTab, setActiveTab] = useState('events');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleTabChange = (e, newTab) => {
    console.log(`[DEBUG] Tab clicked: ${newTab}`);
    if (activeTab === newTab || isTransitioning) return;

    // Fire the warp event to the SpaceBackground
    const warpEvent = new CustomEvent('trigger-warp', { 
      detail: { clientX: e.clientX, clientY: e.clientY } 
    });
    window.dispatchEvent(warpEvent);

    setIsTransitioning(true);

    setTimeout(() => {
      setActiveTab(newTab);
    }, 350);

    setTimeout(() => {
      setIsTransitioning(false);
    }, 700);
  };

  const currentData = dashboardData[activeTab];
  const isEvents = activeTab === 'events';

  return (
    <section id="events" className="w-full py-32 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        
        {/* --- THE HORIZONTAL MENU --- */}
        <Reveal>
          <div className="flex flex-col items-center mb-16">
            <div className="inline-flex bg-black/40 border border-white/10 rounded-full p-1 backdrop-blur-md relative z-20">
              <button 
                onClick={(e) => handleTabChange(e, 'events')}
                className={`px-8 py-3 rounded-full text-sm md:text-base font-bold tracking-widest uppercase transition-all duration-300 cursor-none ${
                  isEvents 
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 shadow-[0_0_20px_rgba(34,211,238,0.2)]' 
                  : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
                }`}
              >
                Featured Events
              </button>
              <button 
                onClick={(e) => handleTabChange(e, 'competitions')}
                className={`px-8 py-3 rounded-full text-sm md:text-base font-bold tracking-widest uppercase transition-all duration-300 cursor-none ${
                  !isEvents 
                  ? 'bg-purple-500/20 text-purple-400 border border-purple-500/50 shadow-[0_0_20px_rgba(168,85,247,0.2)]' 
                  : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
                }`}
              >
                Pro Competitions
              </button>
            </div>
          </div>
        </Reveal>

        {/* --- THE DYNAMIC DATA GRID --- */}
        <div key={activeTab} className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
          {currentData.map((item, index) => (
            <Reveal key={item.id} delay={index * 100}>
              <TiltCard className="h-full">
                <motion.div 
                  layoutId={`card-container-${item.id}`}
                  className={`group relative bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm transition-all duration-300 cursor-none h-full min-h-[300px] flex flex-col justify-between hover:bg-white/10 ${
                    isEvents ? 'hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(34,211,238,0.3)]' : 'hover:border-purple-500 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)]'
                  }`}
                >
                  {/* --- THE CLICK SHIELD --- */}
                  <button 
                    onClick={() => {
                      console.log(`[DEBUG] Card Clicked: ${item.title}`);
                      setSelectedItem(item);
                    }}
                    className="absolute inset-0 w-full h-full z-20 cursor-none focus:outline-none"
                    aria-label="Open Event Details"
                  />

                  {/* Wrapped content in pointer-events-none so it doesn't block the shield */}
                  <div className="relative z-10 pointer-events-none">
                    {isEvents ? (
                      <div className="text-cyan-400 text-sm font-bold tracking-widest mb-4 group-hover:text-yellow-400 transition-colors duration-300">
                        {item.time}
                      </div>
                    ) : (
                      <div className="inline-block px-4 py-1 mb-6 rounded-full bg-purple-900/40 text-purple-300 text-sm font-bold tracking-widest border border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.2)] group-hover:bg-purple-600/40 group-hover:text-white transition-all duration-300">
                        {item.prize}
                      </div>
                    )}
                    
                    <motion.h3 layoutId={`title-${item.id}`} className="text-2xl font-bold text-white mb-3">
                      {item.title}
                    </motion.h3>
                    
                    <p className="text-gray-400 leading-relaxed mb-16">
                      {item.description}
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 relative z-10 pointer-events-none">
                    {item.tags.map((tag, tagIndex) => (
                      <span 
                        key={tagIndex} 
                        className={`px-3 py-1 text-xs font-semibold rounded-full transition-colors duration-300 ${
                          isEvents 
                          ? 'bg-cyan-900/40 text-cyan-300 border border-cyan-800/50 group-hover:bg-yellow-900/40 group-hover:text-yellow-300 group-hover:border-yellow-800/50'
                          : 'bg-white/5 text-gray-300 border border-white/10 group-hover:border-purple-500/50 group-hover:text-purple-200'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>

      {/* --- THE EXPANDING "APP STORE" MODAL --- */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)} 
            className="fixed inset-0 z-[90] flex items-center justify-center p-4 md:p-8 bg-black/60 backdrop-blur-md cursor-none"
          >
            <motion.div
              layoutId={`card-container-${selectedItem.id}`}
              onClick={(e) => e.stopPropagation()} 
              className="w-full max-w-4xl bg-black/90 border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl overflow-y-auto max-h-[90vh] cursor-none relative flex flex-col"
            >
              <button 
                onClick={() => setSelectedItem(null)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center hover:bg-white/20 hover:rotate-90 transition-all duration-300 cursor-none z-10"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="max-w-2xl mt-4">
                <motion.h3 layoutId={`title-${selectedItem.id}`} className="text-4xl md:text-5xl font-black text-white mb-6 uppercase tracking-wider">
                  {selectedItem.title}
                </motion.h3>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-4 text-cyan-400 font-bold tracking-widest uppercase">
                    <span>{selectedItem.time || selectedItem.prize}</span>
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                    <span>Status: Open</span>
                  </div>

                  <p className="text-lg text-gray-300 leading-relaxed">
                    {selectedItem.description}
                  </p>
                  
                  <div className="w-full h-[1px] bg-white/10 my-8"></div>

                  <h4 className="text-xl font-bold text-white mb-2">Mission Parameters</h4>
                  <p className="text-gray-400 leading-relaxed">
                    {selectedItem.fullText}
                  </p>

                  <button 
                    onClick={() => {
                      setSelectedItem(null);
                      setTimeout(() => {
                        const contactSection = document.getElementById('contact');
                        if (contactSection) {
                          contactSection.scrollIntoView({ behavior: 'smooth' });
                        }
                      }, 300);
                    }}
                    className="mt-12 px-10 py-4 rounded-xl bg-cyan-500/20 border border-cyan-400 text-cyan-400 font-bold tracking-widest uppercase transition-all duration-300 hover:bg-cyan-400 hover:text-black hover:shadow-[0_0_30px_rgba(34,211,238,0.6)] w-full md:w-auto cursor-none"
                  >
                    Register For Event
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}