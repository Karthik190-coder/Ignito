import React, { useState } from 'react';

// The Competition Data
// I swapped out heavy mechanical tasks for software, strategy, and design.
const competitionsData = [
  {
    id: 1,
    title: "Quantum Codebreaker",
    category: "Coding",
    prize: "₹50,000",
    description: "Optimize an algorithm to decrypt a simulated alien transmission. Speed and efficiency are everything.",
  },
  {
    id: 2,
    title: "Galactic Product Pitch",
    category: "Strategy",
    prize: "₹75,000",
    description: "Act as a Product Manager for a deep-space colony. Pitch a scalable tech solution to our panel of 'investor' judges.",
  },
  {
    id: 3,
    title: "Orbital UI/UX",
    category: "Design",
    prize: "₹40,000",
    description: "Design an intuitive, high-contrast dashboard for astronauts operating under high-stress, zero-gravity conditions.",
  },
  {
    id: 4,
    title: "Data Constellation",
    category: "Strategy",
    prize: "₹60,000",
    description: "A pure analyst challenge. Take raw telemetry data from 10,000 simulated satellites and find the hidden anomalies.",
  },
  {
    id: 5,
    title: "Asteroid API Integration",
    category: "Coding",
    prize: "₹45,000",
    description: "Build a seamless backend service that pulls real-time tracking data from NASA's open asteroid databases.",
  }
];

// The Filter Categories
const categories = ["All", "Coding", "Strategy", "Design"];

export default function Competitions() {
  // 1. This state tracks which filter is currently active. Defaults to "All".
  const [activeFilter, setActiveFilter] = useState("All");

  // 2. This logic filters the data before we draw it on the screen.
  const filteredComps = activeFilter === "All" 
    ? competitionsData 
    : competitionsData.filter(comp => comp.category === activeFilter);

  return (
    <section id="competitions" className="w-full py-24 px-6 bg-black relative z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-12 text-center flex flex-col items-center">
          <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-400 tracking-widest uppercase">
            Live Competitions
          </h2>
          <div className="h-1 w-24 bg-purple-500 mt-4 shadow-[0_0_10px_rgba(168,85,247,0.8)]"></div>
        </div>

        {/* The Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-6 py-2 rounded-full font-bold tracking-widest transition-all duration-300 
                /* The Golden Hover Effect (consistent with the rest of the site) */
                hover:border-yellow-400 hover:text-yellow-400 hover:shadow-[0_0_20px_rgba(255,215,0,0.4)]
                /* Conditional Styling: If it is active, make it Cyan. If not, make it dark glass. */
                ${activeFilter === category 
                  ? 'bg-cyan-900/30 border-2 border-cyan-400 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.4)]' 
                  : 'bg-white/5 border-2 border-white/10 text-gray-400'
                }
              `}
            >
              {category}
            </button>
          ))}
        </div>

        {/* The Competitions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredComps.map((comp) => (
            <div 
              key={comp.id}
              // Notice the 'group' class here. It lets us trigger hover effects on child elements!
              className="group relative bg-gradient-to-b from-white/5 to-transparent border border-white/10 rounded-xl p-6 transition-all duration-300 hover:border-purple-500 hover:shadow-[0_0_30px_rgba(168,85,247,0.2)] hover:-translate-y-1 cursor-none"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-purple-400">
                  {comp.category}
                </span>
                <span className="text-sm font-black text-cyan-300 bg-cyan-900/40 px-3 py-1 rounded-full border border-cyan-800/50">
                  {comp.prize}
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors duration-300">
                {comp.title}
              </h3>
              
              <p className="text-gray-400 text-sm leading-relaxed">
                {comp.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}