import React from 'react';
import Reveal from './Reveal';
import TiltCard from './TiltCard'; 
const eventData = [
  {
    id: 1,
    title: "Lunar Hackathon",
    time: "Day 1 | 10:00 AM",
    description: "A 24-hour coding sprint to build solutions for deep-space colonization. Bring your best algorithms.",
    tags: ["Coding", "Team Event"]
  },
  {
    id: 2,
    title: "Zero-G Robotics",
    time: "Day 1 | 02:00 PM",
    description: "Design and program autonomous rovers capable of navigating simulated asteroid terrain.",
    tags: ["Hardware", "AI"]
  },
  {
    id: 3,
    title: "Nebula UI/UX Challenge",
    time: "Day 2 | 09:30 AM",
    description: "Design the interface for a next-generation orbital station dashboard. Aesthetics meet functionality.",
    tags: ["Design", "Solo Event"]
  }
];

export default function Events() {
  const scrollToEvents = () => {
    const eventsSection = document.getElementById('events');
    if (eventsSection) {
      eventsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    
    <section id="events" className="w-full py-32 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Wrap the header in a Reveal component */}
        <Reveal>
          <div className="mb-16 text-left">
            <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 tracking-widest uppercase">
              Featured Events
            </h2>
            <div className="h-1 w-24 bg-cyan-400 mt-4 shadow-[0_0_10px_rgba(34,211,238,0.8)]"></div>
          </div>
        </Reveal>

        {/* <-- I put the missing grid wrapper back here! --> */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {eventData.map((event, index) => (
            <Reveal key={event.id} delay={index * 150}>
              <TiltCard className="h-full">
                <div 
                  className="group relative bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-yellow-400 hover:shadow-[0_0_30px_rgba(255,215,0,0.3)] cursor-none h-full min-h-[300px]"
                >
                  <div className="text-cyan-400 text-sm font-bold tracking-widest mb-4 group-hover:text-yellow-400 transition-colors duration-300">
                    {event.time}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-3">
                    {event.title}
                  </h3>
                  
                  <p className="text-gray-400 mb-12 leading-relaxed">
                    {event.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 absolute bottom-8 left-8">
                    {event.tags.map((tag, tagIndex) => (
                      <span 
                        key={tagIndex} 
                        className="px-3 py-1 text-xs font-semibold rounded-full bg-cyan-900/40 text-cyan-300 border border-cyan-800/50 group-hover:bg-yellow-900/40 group-hover:text-yellow-300 group-hover:border-yellow-800/50 transition-colors duration-300"
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