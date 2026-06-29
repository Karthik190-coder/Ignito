import React, { useState } from 'react';

function Navbar({ activeSector, onBack }) {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/40 backdrop-blur-md border-b border-white/10 font-sans">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* LOGO */}
        <div 
          onClick={scrollToTop}
          className="text-2xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 cursor-none"
        >
          IGNITO
        </div>

        {/* DYNAMIC NAVIGATION LINKS */}
        <div className="hidden md:flex space-x-8 text-sm font-medium text-gray-300 items-center">
          {activeSector ? (
            // If warped into a system, show tactical status and an inline back control
            <>
              <span className="text-[10px] tracking-[0.3em] text-cyan-400 font-mono animate-pulse">
                SYS_STATUS: LINK_ESTABLISHED
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onBack();
                }}
                className="px-4 py-1.5 border border-red-500/40 bg-red-950/20 text-red-400 text-xs tracking-widest rounded-full transition-all hover:bg-red-500 hover:text-black cursor-none font-bold"
              >
                DISENGAGE WARP
              </button>
            </>
          ) : (
            // Standard Universe View Links
            <>
              <a href="#home" onClick={scrollToTop} className="hover:text-cyan-400 transition-colors duration-300 cursor-none">Home</a>
              <a href="#events" className="hover:text-cyan-400 transition-colors duration-300 cursor-none">Sectors</a>
              <a href="#contact" className="hover:text-cyan-400 transition-colors duration-300 cursor-none">Transmission</a>
            </>
          )}
        </div>

        {/* Mobile Toggle (Disabled during active warp to protect navigation state) */}
        {!activeSector && (
          <div 
            className="md:hidden text-white cursor-none hover:text-cyan-400 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </div>
        )}

      </div>

      {/* Mobile Dropdown */}
      <div 
        className={`md:hidden absolute top-full left-0 w-full bg-black/95 border-b border-white/10 backdrop-blur-xl transition-all duration-300 overflow-hidden ${
          isOpen && !activeSector ? 'max-h-96 opacity-100 py-4' : 'max-h-0 opacity-0 py-0'
        }`}
      >
        <div className="flex flex-col space-y-4 px-6 text-center text-lg font-medium text-gray-300">
          <a href="#home" onClick={scrollToTop} className="hover:text-cyan-400 transition-colors py-2 cursor-none">Home</a>
          <a href="#events" onClick={() => setIsOpen(false)} className="hover:text-cyan-400 transition-colors py-2 cursor-none">Sectors</a>
          <a href="#contact" onClick={() => setIsOpen(false)} className="hover:text-cyan-400 transition-colors py-2 cursor-none">Transmission</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;