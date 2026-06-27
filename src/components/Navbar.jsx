import React from 'react';

function Navbar() {
  return (
    // 'fixed top-0 w-full z-50' keeps the navbar locked to the top of the screen when scrolling
    <nav className="fixed top-0 w-full z-50 bg-black/40 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* The Logo */}
        <div className="text-2xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
          IGNITO
        </div>

        {/* The Desktop Navigation Links */}
        <div className="hidden md:flex space-x-8 text-sm font-medium text-gray-300">
          <a href="#home" className="hover:text-cyan-400 transition-colors duration-300">Home</a>
          <a href="#events" className="hover:text-cyan-400 transition-colors duration-300">Events</a>
          <a href="#competitions" className="hover:text-cyan-400 transition-colors duration-300">Competitions</a>
          <a href="#contact" className="hover:text-cyan-400 transition-colors duration-300">Contact</a>
        </div>

        {/* Mobile Menu Icon (We will make this functional later if needed) */}
        <div className="md:hidden text-white cursor-pointer hover:text-cyan-400 transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;