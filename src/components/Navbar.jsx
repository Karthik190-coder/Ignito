import React, { useState } from 'react';

function Navbar() {
  // This state tracks whether the mobile menu is open or closed
  const [isOpen, setIsOpen] = useState(false);

  // A reliable function to scroll to the absolute top of the page smoothly
  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsOpen(false); // Automatically close the mobile menu if it was open
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/40 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* The Logo (Now clickable to go home) */}
        <div 
          onClick={scrollToTop}
          className="text-2xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 cursor-pointer"
        >
          IGNITO
        </div>

        {/* The Desktop Navigation Links */}
        <div className="hidden md:flex space-x-8 text-sm font-medium text-gray-300">
          <a href="#home" onClick={scrollToTop} className="hover:text-cyan-400 transition-colors duration-300">Home</a>
          <a href="#events" className="hover:text-cyan-400 transition-colors duration-300">Events</a>
          <a href="#competitions" className="hover:text-cyan-400 transition-colors duration-300">Competitions</a>
          <a href="#contact" className="hover:text-cyan-400 transition-colors duration-300">Contact</a>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div 
          className="md:hidden text-white cursor-pointer hover:text-cyan-400 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            // The "X" Close Icon
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            // The Hamburger Menu Icon
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </div>

      </div>

      {/* --- Mobile Dropdown Menu --- */}
      {/* We use a max-height transition here so it slides down smoothly instead of snapping */}
      <div 
        className={`md:hidden absolute top-full left-0 w-full bg-black/95 border-b border-white/10 backdrop-blur-xl transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-96 opacity-100 py-4' : 'max-h-0 opacity-0 py-0'
        }`}
      >
        <div className="flex flex-col space-y-4 px-6 text-center text-lg font-medium text-gray-300">
          <a href="#home" onClick={scrollToTop} className="hover:text-cyan-400 transition-colors py-2">Home</a>
          {/* onClick={() => setIsOpen(false)} ensures the menu auto-closes when a user taps a link */}
          <a href="#events" onClick={() => setIsOpen(false)} className="hover:text-cyan-400 transition-colors py-2">Events</a>
          <a href="#competitions" onClick={() => setIsOpen(false)} className="hover:text-cyan-400 transition-colors py-2">Competitions</a>
          <a href="#contact" onClick={() => setIsOpen(false)} className="hover:text-cyan-400 transition-colors py-2">Contact</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;