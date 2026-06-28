import React from 'react';
import Reveal from './Reveal';
import TiltCard from './TiltCard'; 

const competitionData = [
  {
    id: 1,
    title: "Galactic E-Sports Arena",
    prize: "Prize Pool: ₹50,000",
    description: "Battle it out in zero-gravity simulators and tactical space-shooters. Team coordination is your only lifeline.",
    tags: ["Gaming", "Squad of 4"]
  },
  {
    id: 2,
    title: "Astro-Debate Syndicate",
    prize: "Prize Pool: ₹15,000",
    description: "Argue the ethics of planetary colonization, AI governance, and interstellar resource mining against top minds.",
    tags: ["Speaking", "Solo/Duo"]
  },
  {
    id: 3,
    title: "Cosmic Code-Breaking",
    prize: "Prize Pool: ₹25,000",
    description: "Intercept and decrypt simulated alien transmissions. A high-stakes, time-pressured cryptography gauntlet.",
    tags: ["Cybersecurity", "Solo Event"]
  },
  {
    id: 4,
    title: "Robo-Sumo: Mars Edition",
    prize: "Prize Pool: ₹30,000",
    description: "Design autonomous bots to push opponents out of the Martian crater ring. Only the strongest engineering survives.",
    tags: ["Robotics", "Team Event"]
  }
];

export default function Competitions() {
  return (
    <section id="competitions" className="w-full py-32 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        
        {/* The Section Header */}
        <Reveal>
          <div className="mb-16 text-right flex flex-col items-end">
            <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-l from-cyan-400 to-purple-500 tracking-widest uppercase">
              Pro Competitions
            </h2>
            <div className="h-1 w-24 bg-purple-500 mt-4 shadow-[0_0_10px_rgba(168,85,247,0.8)]"></div>
          </div>
        </Reveal>

        {/* The Competitions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {competitionData.map((comp, index) => (
            <Reveal key={comp.id} delay={index * 150}>
              <TiltCard className="h-full">
                <div 
                  className="group relative bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-purple-500 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] h-full min-h-[300px]"
                >
                  {/* Glowing Prize Tag */}
                  <div className="inline-block px-4 py-1 mb-6 rounded-full bg-purple-900/40 text-purple-300 text-sm font-bold tracking-widest border border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.2)] group-hover:bg-purple-600/40 group-hover:text-white transition-all duration-300">
                    {comp.prize}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-3">
                    {comp.title}
                  </h3>
                  
                  <p className="text-gray-400 mb-12 leading-relaxed">
                    {comp.description}
                  </p>
                  
                  {/* Tags positioned at the bottom left */}
                  <div className="flex flex-wrap gap-2 absolute bottom-8 left-8">
                    {comp.tags.map((tag, tagIndex) => (
                      <span 
                        key={tagIndex} 
                        className="px-3 py-1 text-xs font-semibold rounded-full bg-white/5 text-gray-300 border border-white/10 group-hover:border-purple-500/50 group-hover:text-purple-200 transition-colors duration-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}