import React from 'react';
import Reveal from './Reveal'; 

export default function Contact() {
  return (
    // Reduced padding from py-24 to py-12 to pull the section higher up
    <section id="contact" className="w-full py-12 px-6 relative z-10 border-t border-white/5 flex flex-col items-center bg-transparent overflow-hidden">
      
      {/* --- THE POWERED-UP SATELLITE COMMAND DECK OVERLAY --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* 1. Atmospheric Planetary Horizon Glow (Dialed up intensity from 0.12 to 0.3) */}
        <div className="absolute bottom-0 left-0 w-full h-[800px] bg-[radial-gradient(ellipse_at_bottom,_rgba(37,99,235,0.3)_0%,_transparent_70%)]"></div>
        
        {/* 2. Holographic Radar Grid (Increased base opacity to 50%) */}
        <div 
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage: `
              linear-gradient(rgba(37, 99, 235, 0.4) 1px, transparent 1px), 
              linear-gradient(90deg, rgba(37, 99, 235, 0.4) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            maskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, transparent 100%)'
          }}
        />
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="max-w-3xl w-full relative z-10 mt-8">
        
        {/* Header */}
        <Reveal>
          <div className="mb-10 text-center flex flex-col items-center">
            <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 tracking-widest uppercase">
              Send Transmission
            </h2>
            <div className="h-1 w-24 bg-blue-600 mt-4 shadow-[0_0_10px_rgba(37,99,235,0.8)]"></div>
            <p className="mt-4 text-gray-400 tracking-wider">
              Establish a secure comms link with the IGNITO command center.
            </p>
          </div>
        </Reveal>

        {/* The Glassmorphism Form */}
        <Reveal delay={150}>
          <form 
            className="bg-black/40 border border-white/10 rounded-2xl p-8 md:p-12 backdrop-blur-xl flex flex-col gap-6 relative group transition-all duration-500 hover:border-blue-500/30 hover:shadow-[0_0_40px_rgba(37,99,235,0.15)]"
            onSubmit={(e) => e.preventDefault()} 
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold tracking-widest text-cyan-500 uppercase">Commander Name</label>
                <input 
                  type="text" 
                  placeholder="Enter your name" 
                  className="bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all duration-300 cursor-none"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold tracking-widest text-cyan-500 uppercase">Comms Frequency (Email)</label>
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all duration-300 cursor-none"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold tracking-widest text-cyan-500 uppercase">Transmission Data</label>
              <textarea 
                rows="4"
                placeholder="Type your message here..." 
                className="bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all duration-300 resize-none cursor-none"
              ></textarea>
            </div>

            <button className="mt-2 px-8 py-4 rounded-lg bg-blue-900/30 border border-blue-500 text-blue-400 font-bold tracking-widest uppercase transition-all duration-500 hover:bg-yellow-500/10 hover:border-yellow-400 hover:text-yellow-400 hover:shadow-[0_0_30px_rgba(255,215,0,0.4)] hover:-translate-y-1 cursor-none">
              Initiate Launch Sequence
            </button>
          </form>
        </Reveal>

      </div>

      {/* Footer Element (Reduced gap from mt-32 to mt-12) */}
      <Reveal delay={300}>
        <footer className="mt-12 text-center border-t border-white/5 w-full pt-8 relative z-10">
          <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-400 tracking-widest uppercase mb-4">
            IGNITO 2026
          </h2>
          <p className="text-gray-600 text-sm tracking-widest uppercase">
            © {new Date().getFullYear()} SPACE TECHFEST. ALL SYSTEMS NOMINAL.
          </p>
        </footer>
      </Reveal>
    </section>
  );
}