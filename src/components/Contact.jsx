import React from 'react';
import Reveal from './Reveal'; // <-- 1. Import the cinematic scroll engine

export default function Contact() {
  return (
    // Removed bg-black here so it blends perfectly with your global SpaceBackground
    <section id="contact" className="w-full py-24 px-6 relative z-10 border-t border-white/5 flex flex-col items-center">
      <div className="max-w-3xl w-full">
        
        {/* Header */}
        <Reveal>
          <div className="mb-12 text-center flex flex-col items-center">
            <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 tracking-widest uppercase">
              Send Transmission
            </h2>
            <div className="h-1 w-24 bg-blue-600 mt-4 shadow-[0_0_10px_rgba(37,99,235,0.8)]"></div>
            <p className="mt-6 text-gray-400 tracking-wider">
              Establish a secure comms link with the IGNITO command center.
            </p>
          </div>
        </Reveal>

        {/* The Glassmorphism Form */}
        <Reveal delay={150}>
          <form 
            // Added a subtle hover glow to the form container so it feels alive
            className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-12 backdrop-blur-md flex flex-col gap-6 relative group transition-all duration-500 hover:border-blue-500/30 hover:shadow-[0_0_40px_rgba(37,99,235,0.1)]"
            onSubmit={(e) => e.preventDefault()} 
          >
            {/* Name & ID Row */}
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

            {/* Message Area */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold tracking-widest text-cyan-500 uppercase">Transmission Data</label>
              <textarea 
                rows="5"
                placeholder="Type your message here..." 
                className="bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all duration-300 resize-none cursor-none"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button className="mt-4 px-8 py-4 rounded-lg bg-blue-900/30 border border-blue-500 text-blue-400 font-bold tracking-widest uppercase transition-all duration-500 hover:bg-yellow-500/10 hover:border-yellow-400 hover:text-yellow-400 hover:shadow-[0_0_30px_rgba(255,215,0,0.4)] hover:-translate-y-1 cursor-none">
              Initiate Launch Sequence
            </button>
          </form>
        </Reveal>

      </div>

      {/* Footer Element */}
      <Reveal delay={300}>
        <footer className="mt-32 text-center border-t border-white/5 w-full pt-8">
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