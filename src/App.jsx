import React from 'react';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import SpaceBackground from './components/SpaceBackground'; 
import Events from './components/Events';
import Competitions from './components/Competitions';
import Contact from './components/Contact'; 

function App() {
  // The Scroll Function to glide down to the Events section
  const scrollToEvents = () => {
    const eventsSection = document.getElementById('events');
    if (eventsSection) {
      eventsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative bg-transparent text-white min-h-screen font-sans">
      
      <SpaceBackground />
      <CustomCursor /> 
      <Navbar />

      {/* Added id="home" and relative z-10 so it sits properly above the background */}
      <main id="home" className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        
        {/* The Title Wrapper with the Absolute Positioned Star */}
        <div className="relative inline-block">
          <svg 
            className="absolute -left-6 md:-left-8 top-0 md:top-2 w-8 h-8 md:w-12 md:h-12 text-yellow-200 drop-shadow-[0_0_15px_rgba(253,224,71,0.9)] animate-pulse z-10 pointer-events-none" 
            viewBox="0 0 24 24" 
            fill="currentColor"
          >
            <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
          </svg>
          <h2 className="text-7xl md:text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-purple-600 via-cyan-400 to-blue-600 drop-shadow-lg relative z-0">
            IGNITO
          </h2>
        </div>
        
        <p className="mt-6 text-lg md:text-xl text-gray-400 max-w-lg tracking-widest">
          THE ULTIMATE SPACE TECHFEST
        </p>
        
        {/* The Button wired up with the onClick handler */}
        <button 
          onClick={scrollToEvents}
          className="mt-12 px-8 py-3 rounded-full bg-cyan-900/30 border border-cyan-400 text-cyan-400 font-bold tracking-widest transition-all duration-500 hover:bg-yellow-500/10 hover:border-yellow-400 hover:text-yellow-400 hover:shadow-[0_0_40px_rgba(255,215,0,0.6)] hover:scale-105 cursor-pointer"
        >
          EXPLORE EVENTS
        </button>
        
      </main>

      <Events />
      <Competitions />
      <Contact />

    </div>
  );
}

export default App;