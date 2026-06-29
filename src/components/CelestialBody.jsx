import React from 'react';

// ==========================================
// 1. MASTER PLANETARY CONFIGURATION
// ==========================================
const PLANET_CONFIGS = {
  // THE NEW HOPEFUL INNOVATION WORLD
  edenWorld: { base: 'bg-teal-900', filter: 'url(#water-noise)', glow: 'bg-emerald-400/40', rim: 'border-cyan-300/60', shadow: 'rgba(2,44,34,0.85)', fresnel: 'rgba(167,243,208,0.5)', speed: 'animate-[spin_120s_linear_infinite]', hasDrones: true, hasPollen: true },
  
  terraPrime: { base: 'bg-blue-900', filter: 'url(#terra-noise)', glow: 'bg-blue-400/30', rim: 'border-blue-400/40', shadow: 'rgba(0,0,0,0.85)', fresnel: 'rgba(191,219,254,0.3)', speed: 'animate-[spin_120s_linear_infinite]', moonOrbit: 15 },
  gasGiant: { base: 'bg-indigo-900', filter: 'url(#gas-noise)', glow: 'bg-indigo-500/20', rim: 'border-indigo-400/50', shadow: 'rgba(0,0,0,0.9)', fresnel: 'rgba(199,210,254,0.2)', speed: 'animate-[spin_90s_linear_infinite]', hasRings: true, moonOrbit: -25 },
  moltenCore: { base: 'bg-red-950', filter: 'url(#magma-noise)', glow: 'bg-orange-500/60', rim: 'border-orange-500/70', shadow: 'rgba(67,20,7,0.8)', fresnel: 'rgba(253,186,116,0.5)', speed: 'animate-[spin_150s_linear_infinite]', pulse: true },
  quantumWorld: { base: 'bg-slate-950', filter: 'url(#quantum-noise)', glow: 'bg-cyan-400/40', rim: 'border-cyan-300/80', shadow: 'rgba(8,51,68,0.9)', fresnel: 'rgba(165,243,252,0.6)', speed: 'animate-[spin_60s_linear_infinite]', hasGrid: true },
  stellarCore: { base: 'bg-yellow-500', filter: 'url(#stellar-noise)', glow: 'bg-yellow-400/80', rim: 'border-yellow-200/90', shadow: 'transparent', fresnel: 'rgba(254,240,138,0.8)', speed: 'animate-[spin_40s_linear_infinite]', isSun: true },
  dysonSphere: { base: 'bg-amber-900', filter: 'url(#ash-noise)', glow: 'bg-amber-500/30', rim: 'border-amber-400/60', shadow: 'rgba(0,0,0,0.85)', fresnel: 'rgba(253,230,138,0.5)', speed: 'animate-[spin_180s_linear_infinite]', hasPanels: true },
  artificialPlanet: { base: 'bg-neutral-900', filter: 'url(#rock-noise)', glow: 'bg-emerald-500/30', rim: 'border-emerald-400/60', shadow: 'rgba(0,0,0,0.9)', fresnel: 'rgba(167,243,208,0.5)', speed: 'animate-[spin_100s_linear_infinite]', hasCircuits: true },
  toxicAnomaly: { base: 'bg-lime-950', filter: 'url(#toxic-noise)', glow: 'bg-lime-500/40', rim: 'border-lime-400/60', shadow: 'rgba(26,46,5,0.8)', fresnel: 'rgba(217,249,157,0.5)', speed: 'animate-[spin_160s_linear_infinite]', hasAcidClouds: true },
  crystalWorld: { base: 'bg-fuchsia-950', filter: 'url(#crystal-noise)', glow: 'bg-fuchsia-500/20', rim: 'border-fuchsia-400/50', shadow: 'rgba(74,4,78,0.8)', fresnel: 'rgba(250,204,21,0.4)', speed: 'animate-[spin_300s_linear_infinite]', hasFacets: true },
  oceanWorld: { base: 'bg-cyan-900', filter: 'url(#water-noise)', glow: 'bg-cyan-400/20', rim: 'border-cyan-300/40', shadow: 'rgba(8,51,68,0.85)', fresnel: 'rgba(165,243,252,0.4)', speed: 'animate-[spin_110s_linear_infinite]' },
  voidPlanet: { base: 'bg-black', filter: 'url(#void-noise)', glow: 'bg-purple-900/20', rim: 'border-purple-800/40', shadow: 'rgba(0,0,0,0.95)', fresnel: 'rgba(216,180,254,0.1)', speed: 'animate-none', hasFractures: true },
  plasmaPlanet: { base: 'bg-sky-900', filter: 'url(#plasma-noise)', glow: 'bg-sky-400/40', rim: 'border-sky-300/60', shadow: 'rgba(12,74,110,0.7)', fresnel: 'rgba(186,230,253,0.7)', speed: 'animate-[spin_45s_linear_infinite]' },
  iceMoon: { base: 'bg-slate-300', filter: 'url(#ice-noise)', glow: 'bg-cyan-200/20', rim: 'border-white/50', shadow: 'rgba(15,23,42,0.8)', fresnel: 'rgba(255,255,255,0.6)', speed: 'animate-[spin_200s_linear_infinite]' },
  marsCore: { base: 'bg-orange-800', filter: 'url(#rock-noise)', glow: 'bg-red-600/20', rim: 'border-red-400/40', shadow: 'rgba(67,20,7,0.9)', fresnel: 'rgba(254,205,211,0.3)', speed: 'animate-[spin_250s_linear_infinite]' },
  ashWorld: { base: 'bg-stone-800', filter: 'url(#ash-noise)', glow: 'bg-stone-500/10', rim: 'border-stone-400/30', shadow: 'rgba(28,25,23,0.95)', fresnel: 'rgba(231,229,228,0.2)', speed: 'animate-[spin_220s_linear_infinite]' },
  bioWorld: { base: 'bg-green-950', filter: 'url(#bio-noise)', glow: 'bg-green-500/30', rim: 'border-green-400/50', shadow: 'rgba(5,46,22,0.85)', fresnel: 'rgba(187,247,208,0.4)', speed: 'animate-[spin_140s_linear_infinite]', hasSpores: true },
};

// ==========================================
// 2. SUB-COMPONENTS
// ==========================================

const Atmosphere = ({ config }) => (
  <>
    {!config.isSun && <div className="absolute w-[80%] h-[30%] -bottom-10 bg-black/80 blur-xl rounded-[100%] scale-110 z-0"></div>}
    
    <div className={`absolute inset-0 rounded-full scale-[1.2] blur-xl opacity-80 ${config.glow} ${config.pulse ? 'animate-pulse' : ''} ${config.isSun ? 'scale-[1.5] opacity-100 blur-2xl' : ''}`}></div>

    {config.hasAcidClouds && (
      <div className="absolute -inset-[30%] animate-[spin_40s_linear_infinite]">
        <div className="absolute top-[10%] left-[20%] w-[40%] h-[30%] bg-lime-500/20 blur-md rounded-full"></div>
        <div className="absolute bottom-[20%] right-[10%] w-[50%] h-[20%] bg-green-400/20 blur-md rounded-full"></div>
      </div>
    )}

    {/* BIO WORLD SPORES (The original evenly spaced dots) */}
    {config.hasSpores && (
      <div className="absolute -inset-[40%] animate-[spin_60s_linear_infinite] opacity-50 pointer-events-none z-50" style={{ backgroundImage: 'radial-gradient(circle, #86efac 1.5px, transparent 3px)', backgroundSize: '15% 15%' }}></div>
    )}
  </>
);

const PollenField = () => (
  // EDEN WORLD: Three distinct, drifting organic layers that "breathe" with a slow pulse
  <div className="absolute -inset-[40%] animate-[pulse_10s_ease-in-out_infinite] pointer-events-none z-50">
    {/* Large (10%) */}
    <div className="absolute inset-0 animate-[spin_120s_linear_infinite] opacity-60" style={{ backgroundImage: 'radial-gradient(circle, rgba(167,243,208,0.6) 3px, transparent 4px)', backgroundSize: '35% 35%' }}></div>
    {/* Medium (20%) */}
    <div className="absolute inset-0 animate-[spin_80s_linear_infinite_reverse] opacity-80" style={{ backgroundImage: 'radial-gradient(circle, rgba(167,243,208,0.8) 2px, transparent 3px)', backgroundSize: '20% 20%' }}></div>
    {/* Small (70%) */}
    <div className="absolute inset-0 animate-[spin_60s_linear_infinite] opacity-40" style={{ backgroundImage: 'radial-gradient(circle, rgba(167,243,208,0.4) 1px, transparent 2px)', backgroundSize: '10% 10%' }}></div>
  </div>
);

const Drones = () => (
  // EDEN WORLD: Three tiny tech satellites orbiting on varied inclinations
  <>
    <div className="absolute w-[240%] h-[240%] animate-[spin_20s_linear_infinite] z-50 pointer-events-none" style={{ transform: 'rotateX(60deg) rotateY(20deg)' }}>
      <div className="absolute top-[10%] left-[50%] w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_8px_white]"></div>
    </div>
    <div className="absolute w-[200%] h-[200%] animate-[spin_15s_linear_infinite_reverse] z-50 pointer-events-none" style={{ transform: 'rotateX(40deg) rotateY(-30deg)' }}>
      <div className="absolute top-[15%] left-[50%] w-1 h-1 bg-cyan-200 rounded-full shadow-[0_0_6px_cyan]"></div>
    </div>
    <div className="absolute w-[280%] h-[280%] animate-[spin_30s_linear_infinite] z-50 pointer-events-none" style={{ transform: 'rotateX(-50deg) rotateY(10deg)' }}>
      <div className="absolute top-[20%] left-[50%] w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_white]"></div>
    </div>
  </>
);

const Lighting = ({ config }) => (
  <>
    {!config.isSun && (
      <div className="absolute inset-0 rounded-full z-20 pointer-events-none mix-blend-screen" 
           style={{ background: `radial-gradient(circle at 30% 30%, ${config.fresnel}, transparent 55%), radial-gradient(circle at center, transparent 70%, rgba(255,255,255,0.15) 100%)` }}>
      </div>
    )}
    
    {!config.isSun && (
      <div className="absolute inset-0 rounded-full z-30 pointer-events-none mix-blend-multiply" 
           style={{ boxShadow: `inset -40px -40px 60px ${config.shadow}, inset -10px -10px 20px rgba(0,0,0,0.8)` }}>
      </div>
    )}

    {/* Atmospheric Rim */}
    <div className={`absolute inset-0 rounded-full border-[1.5px] ${config.rim} blur-[1px] opacity-90 z-40 pointer-events-none`}></div>
  </>
);

const Rings = ({ type }) => {
  if (type !== 'gasGiant') return null;
  return (
    <>
      <div className="absolute w-[260%] h-[260%] rounded-full border-[16px] border-indigo-400/20 border-x-indigo-300/50 z-0 pointer-events-none" style={{ transform: 'rotateX(75deg) rotateY(-15deg)', clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)' }}></div>
      <div className="absolute w-[260%] h-[260%] rounded-full border-[16px] border-indigo-300/60 border-x-indigo-200/80 z-50 pointer-events-none" style={{ transform: 'rotateX(75deg) rotateY(-15deg)', clipPath: 'polygon(0 50%, 100% 50%, 100% 100%, 0 100%)' }}></div>
      <div className="absolute top-[50%] left-[-20%] w-[140%] h-[15%] bg-black/80 blur-md -rotate-[15deg] z-20 pointer-events-none"></div>
    </>
  );
};

const Moon = ({ orbitAngle }) => {
  if (!orbitAngle) return null;
  return (
    <div className="absolute w-[320%] h-[320%] z-50 pointer-events-none animate-[spin_35s_linear_infinite]" style={{ transform: `rotate(${orbitAngle}deg)` }}>
      <div className="absolute top-[10%] left-[50%] w-2 h-2 md:w-3 md:h-3 bg-slate-200 rounded-full shadow-[0_0_10px_white]"></div>
    </div>
  );
};

const Surface = ({ type, config }) => (
  <div className="absolute inset-0 rounded-full overflow-hidden bg-black z-10">
    
    <div className={`absolute -inset-[20%] w-[140%] h-[140%] ${config.base} ${config.speed}`} style={{ filter: config.filter }}>
        {type === 'terraPrime' && <div className="absolute inset-0 bg-blue-800 mix-blend-multiply"></div>}
        {type === 'edenWorld' && <div className="absolute inset-0 bg-teal-800 mix-blend-multiply"></div>}
        {type === 'gasGiant' && <div className="absolute inset-0 opacity-80" style={{ backgroundImage: 'linear-gradient(180deg, rgba(0,0,0,0.6) 0%, transparent 15%, rgba(0,0,0,0.8) 30%, rgba(255,255,255,0.3) 45%, rgba(0,0,0,0.7) 60%, transparent 80%, rgba(255,255,255,0.2) 100%)' }}></div>}
    </div>

    <div className={`absolute -inset-[20%] w-[140%] h-[140%]`}>
      
      {/* EDEN WORLD: Lush green continents & thin atmosphere */}
      {type === 'edenWorld' && (
        <>
          <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full opacity-90" preserveAspectRatio="none">
            {/* 1 Large Main Continent */}
            <path d="M-10,20 Q15,5 35,30 T60,15 T95,55 L110,80 L110,120 L-10,120 Z" fill="#065f46" filter="blur(2.5px)"/>
            {/* 2 Small Organic Islands */}
            <path d="M15,-10 Q35,15 50,5 T70,10 L70,-10 Z" fill="#047857" filter="blur(1.5px)"/>
            <path d="M75,25 Q95,35 85,55 T65,40 Z" fill="#064e3b" filter="blur(2px)"/>
          </svg>
          <div className="absolute inset-0 opacity-45 mix-blend-screen animate-[spin_60s_linear_infinite]" style={{ filter: 'url(#true-clouds)' }}></div>
        </>
      )}

      {/* TERRA PRIME */}
      {type === 'terraPrime' && (
        <>
          <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full opacity-85" preserveAspectRatio="none">
            <path d="M-10,30 Q20,10 40,40 T80,30 T120,60 L120,120 L-10,120 Z" fill="#15803d" filter="blur(2px)"/>
            <path d="M40,-10 Q70,20 90,0 T120,20 L120,-10 Z" fill="#166534" filter="blur(1.5px)"/>
          </svg>
          <div className="absolute inset-0 opacity-70 mix-blend-screen animate-[spin_50s_linear_infinite_reverse]" style={{ filter: 'url(#true-clouds)' }}></div>
        </>
      )}

      {/* MOLTEN CORE */}
      {type === 'moltenCore' && (
        <div className={`absolute inset-0 ${config.pulse ? 'animate-pulse' : ''}`}>
          <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full opacity-90 mix-blend-color-dodge" preserveAspectRatio="none">
            <path d="M 20 -10 Q 40 20 20 50 T 30 110" stroke="#f97316" strokeWidth="8" fill="none" filter="blur(2px)"/>
            <path d="M 80 -10 Q 60 40 90 60 T 70 110" stroke="#ef4444" strokeWidth="6" fill="none" filter="blur(1.5px)"/>
            <path d="M -10 40 Q 30 60 20 90" stroke="#eab308" strokeWidth="4" fill="none" filter="blur(1px)"/>
            <path d="M 100 30 Q 60 50 80 80" stroke="#f97316" strokeWidth="5" fill="none" filter="blur(1.5px)"/>
          </svg>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_40%,rgba(234,88,12,0.6)_0%,transparent_40%)] mix-blend-color-dodge"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_70%,rgba(220,38,38,0.5)_0%,transparent_40%)] mix-blend-color-dodge" style={{ animationDelay: '1s' }}></div>
        </div>
      )}

      {/* QUANTUM WORLD */}
      {config.hasGrid && <div className="absolute inset-0 opacity-60 animate-[spin_40s_linear_infinite]" style={{ backgroundImage: 'linear-gradient(rgba(34,211,238,0.5) 1.5px, transparent 1.5px), linear-gradient(90deg, rgba(34,211,238,0.5) 1.5px, transparent 1.5px)', backgroundSize: '12% 12%' }}></div>}
      
      {/* STELLAR CORE */}
      {config.isSun && <div className="absolute inset-0 bg-gradient-to-t from-white/50 via-yellow-200/30 to-transparent mix-blend-color-dodge animate-[spin_8s_linear_infinite]"></div>}
      
      {/* DYSON SPHERE */}
      {config.hasPanels && (
        <>
          <div className="absolute inset-0 opacity-50 mix-blend-overlay animate-[spin_70s_linear_infinite]" style={{ backgroundImage: 'radial-gradient(circle, #fcd34d 2px, transparent 3px)', backgroundSize: '10% 10%' }}></div>
          <div className="absolute inset-[30%] bg-yellow-400 blur-xl opacity-70 animate-pulse"></div>
        </>
      )}

      {/* ARTIFICIAL PLANET */}
      {config.hasCircuits && (
        <div className="absolute inset-0 animate-[spin_90s_linear_infinite]">
          <div className="absolute w-full h-[2px] bg-emerald-400 top-[35%] shadow-[0_0_12px_#34d399]"></div>
          <div className="absolute w-[2px] h-full bg-emerald-300 left-[55%] shadow-[0_0_12px_#34d399]"></div>
          <div className="absolute w-[60%] h-[2px] bg-emerald-500 top-[65%] left-[20%] rotate-45"></div>
        </div>
      )}

      {/* VOID PLANET */}
      {config.hasFractures && <div className="absolute inset-0 bg-purple-500/20 opacity-60 animate-pulse mix-blend-screen bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.3)_0%,transparent_50%)]"></div>}
      
      {/* CRYSTAL WORLD */}
      {config.hasFacets && (
        <div className="absolute inset-0 animate-[spin_150s_linear_infinite]">
          <div className="absolute w-[40%] h-[120%] bg-white/10 mix-blend-overlay rotate-45 origin-center transform -translate-y-10"></div>
          <div className="absolute w-[120%] h-[20%] bg-fuchsia-300/20 mix-blend-screen -rotate-12 origin-center transform translate-y-10"></div>
        </div>
      )}

    </div>
  </div>
);

// ==========================================
// 3. MAIN COMPONENT EXPORT
// ==========================================

export default function CelestialBody({ 
  type = 'gasGiant', 
  sizeClass = 'w-64 h-64', 
  className = '' 
}) {
  const config = PLANET_CONFIGS[type] || PLANET_CONFIGS.gasGiant;

  return (
    <div className={`relative flex items-center justify-center rounded-full ${sizeClass} ${className} group pointer-events-none`}>
      <Atmosphere config={config} />
      {config.hasPollen && <PollenField />}
      {config.hasDrones && <Drones />}
      <Rings type={type} />
      <Surface type={type} config={config} />
      <Lighting config={config} />
      <Moon orbitAngle={config.moonOrbit} />
    </div>
  );
}