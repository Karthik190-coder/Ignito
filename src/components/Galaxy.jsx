import React from 'react';
import ParticleGalaxy from './ParticleGalaxy';

export default function Galaxy({ 
  theme = 'cyan', 
  title = 'Sector', 
  sizeClass = 'w-[300px] h-[300px] md:w-[500px] md:h-[500px]',
  className = '',
  onClick
}) {
  const themes = {
    cyan: { text: 'text-cyan-300', nebula: 'from-cyan-500/40 via-cyan-900/20 to-transparent', ring: 'border-cyan-400/50' },
    purple: { text: 'text-purple-300', nebula: 'from-purple-500/40 via-purple-900/20 to-transparent', ring: 'border-purple-400/50' },
    amber: { text: 'text-amber-300', nebula: 'from-amber-500/40 via-amber-900/20 to-transparent', ring: 'border-amber-400/50' },
    green: { text: 'text-emerald-300', nebula: 'from-emerald-500/40 via-emerald-900/20 to-transparent', ring: 'border-emerald-400/50' },
    gold: { text: 'text-yellow-300', nebula: 'from-yellow-500/40 via-yellow-900/20 to-transparent', ring: 'border-yellow-400/50' }
  };

  const activeTheme = themes[theme] || themes.cyan;

  return (
    <div className={`relative ${sizeClass} ${className} flex flex-col items-center justify-center group cursor-none`}>
      
      {/* THE INVISIBLE CLICK SHIELD */}
      <div 
        className="absolute inset-0 z-[100] cursor-none pointer-events-auto rounded-full"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (onClick) onClick();
        }}
      ></div>

      {/* THE VISUAL GALAXY (Removed the conflicting CSS rotateX!) */}
      <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
        
        {/* 1. 3D Particles (Handles its own internal 3D tilt) */}
        <ParticleGalaxy color={theme === 'cyan' ? '#22d3ee' : theme === 'purple' ? '#a855f7' : theme === 'amber' ? '#fbbf24' : theme === 'green' ? '#10b981' : '#eab308'} />
        
        {/* 2. Central Supermassive Glow */}
        <div className={`absolute w-32 h-32 rounded-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] ${activeTheme.nebula} blur-xl`}></div>
        
        {/* 3. HUD Target Reticle (Flat 2D circle locking onto the galaxy) */}
        <div className={`absolute inset-4 md:inset-12 rounded-full border-2 border-dashed border-white/0 group-hover:${activeTheme.ring} transition-all duration-700 scale-75 group-hover:scale-100 opacity-0 group-hover:opacity-100`}></div>
      
      </div>

      {/* TACTICAL LABEL */}
      <div className="absolute -bottom-12 flex flex-col items-center pointer-events-none transition-all duration-300 group-hover:-translate-y-2">
        <h3 className={`text-xl md:text-3xl font-extrabold tracking-[0.4em] uppercase ${activeTheme.text} drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]`}>
          {title}
        </h3>
        <p className="text-[10px] text-gray-400 tracking-widest mt-2 uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Initialize Warp Sequence
        </p>
      </div>

    </div>
  );
}