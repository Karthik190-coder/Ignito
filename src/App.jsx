import React from 'react';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import SpaceBackground from './components/SpaceBackground'; // <-- 1. Import it here
import Events from './components/Events';
import Competitions from './components/Competitions';
import Contact from './components/Contact'; 

function App() {
  return (
    // Make sure the main div has 'relative' so the z-indexes behave perfectly
    <div className="relative bg-transparent text-white min-h-screen font-sans">
      
      {/* 2. Drop the background at the very top of your app */}
      <SpaceBackground />
      <CustomCursor /> 
      <Navbar />

      <main className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <h2 className="text-7xl md:text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-purple-600 via-cyan-400 to-blue-600 drop-shadow-lg">
          IGNITO
        </h2>
        
        <p className="mt-6 text-lg md:text-xl text-gray-400 max-w-lg tracking-widest">
          THE ULTIMATE SPACE TECHFEST
        </p>
        
        <button className="mt-12 px-8 py-3 rounded-full bg-cyan-900/30 border border-cyan-400 text-cyan-400 font-bold tracking-widest transition-all duration-500 hover:bg-yellow-500/10 hover:border-yellow-400 hover:text-yellow-400 hover:shadow-[0_0_40px_rgba(255,215,0,0.6)] hover:scale-105">
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