import React from 'react';

// ==========================================
// 1. MASTER PLANETARY CONFIGURATION
// ==========================================
const PLANET_CONFIGS = {
  // --- TACTICAL CLUSTER (Cybernetic & Structured) ---
  algorithmArena: { base: 'bg-gradient-to-br from-slate-400 via-slate-600 to-slate-900', texture: 'rock', glow: 'bg-slate-300/40', rim: 'border-slate-200/80', shadow: 'rgba(15,23,42,0.9)', fresnel: 'rgba(248,250,252,0.7)', speed: 'animate-[spin_150s_linear_infinite]', hasPolyGrid: true },
  productVanguard: { base: 'bg-gradient-to-br from-blue-500 via-blue-800 to-indigo-950', texture: 'stellar', glow: 'bg-blue-500/50', rim: 'border-cyan-300/80', shadow: 'rgba(30,58,138,0.9)', fresnel: 'rgba(147,197,253,0.6)', speed: 'animate-[spin_180s_linear_infinite]', hasNodes: true, nodeColor: '#60a5fa' },
  zeroDaySiege: { base: 'bg-gradient-to-br from-cyan-500 via-teal-800 to-slate-950', texture: 'quantum', glow: 'bg-cyan-500/60', rim: 'border-cyan-200/90', shadow: 'rgba(8,51,68,0.9)', fresnel: 'rgba(103,232,249,0.7)', speed: 'animate-[spin_100s_linear_infinite]', hasCrosshair: true },
  neuralClash: { base: 'bg-gradient-to-br from-violet-600 via-purple-900 to-indigo-950', texture: 'void', glow: 'bg-purple-600/60', rim: 'border-fuchsia-300/80', shadow: 'rgba(88,28,135,0.9)', fresnel: 'rgba(216,180,254,0.7)', speed: 'animate-[spin_120s_linear_infinite]', hasLightning: true },
  analystsCrucible: { base: 'bg-gradient-to-br from-fuchsia-700 via-purple-900 to-black', texture: 'gas', glow: 'bg-fuchsia-600/40', rim: 'border-fuchsia-300/70', shadow: 'rgba(74,4,78,0.9)', fresnel: 'rgba(240,171,252,0.5)', speed: 'animate-[spin_200s_linear_infinite]', hasNodes: true, nodeColor: '#e879f9' },

  // --- ZENITH CITADEL (Monumental & Expansive) ---
  zenithAddress: { base: 'bg-gradient-to-br from-yellow-300 via-amber-500 to-orange-600', texture: 'stellar', glow: 'bg-yellow-500/70', rim: 'border-yellow-200/90', shadow: 'transparent', fresnel: 'rgba(253,224,71,0.8)', speed: 'animate-[spin_40s_linear_infinite]', isSun: true, hasGoldRings: true },
  productHorizon: { base: 'bg-gradient-to-tr from-fuchsia-950 via-purple-800 to-pink-900', texture: 'void', glow: 'bg-fuchsia-600/50', rim: 'border-fuchsia-400/80', shadow: 'rgba(74,4,78,0.9)', fresnel: 'rgba(240,171,252,0.5)', speed: 'animate-[spin_120s_linear_infinite]', hasAtmosphere: true },
  dataDestiny: { base: 'bg-gradient-to-b from-slate-900 via-cyan-900 to-blue-950', texture: 'water', glow: 'bg-cyan-600/50', rim: 'border-cyan-300/70', shadow: 'rgba(15,23,42,0.9)', fresnel: 'rgba(103,232,249,0.6)', speed: 'animate-[spin_100s_linear_infinite]', hasRadar: true },
  architectsTomorrow: { base: 'bg-gradient-to-br from-indigo-950 via-blue-900 to-slate-800', texture: 'rock', glow: 'bg-blue-500/50', rim: 'border-blue-300/70', shadow: 'rgba(30,58,138,0.9)', fresnel: 'rgba(147,197,253,0.6)', speed: 'animate-[spin_150s_linear_infinite]', hasHexGrid: true },
  echoesInnovation: { base: 'bg-gradient-to-r from-violet-950 via-purple-900 to-fuchsia-950', texture: 'gas', glow: 'bg-purple-600/50', rim: 'border-purple-300/70', shadow: 'rgba(88,28,135,0.9)', fresnel: 'rgba(216,180,254,0.6)', speed: 'animate-[spin_130s_linear_infinite]', hasEchoes: true, moonOrbit: 45 },
  
  // --- LEGACY BODIES ---
  edenWorld: { base: 'bg-teal-900', texture: 'water', glow: 'bg-emerald-400/40', rim: 'border-cyan-300/60', shadow: 'rgba(2,44,34,0.85)', fresnel: 'rgba(167,243,208,0.5)', speed: 'animate-[spin_120s_linear_infinite]', hasDrones: true, hasPollen: true },
  terraPrime: { base: 'bg-blue-900', texture: 'terra', glow: 'bg-blue-400/30', rim: 'border-blue-400/40', shadow: 'rgba(0,0,0,0.85)', fresnel: 'rgba(191,219,254,0.3)', speed: 'animate-[spin_120s_linear_infinite]', moonOrbit: 15 },
  gasGiant: { base: 'bg-indigo-900', texture: 'gas', glow: 'bg-indigo-500/20', rim: 'border-indigo-400/50', shadow: 'rgba(0,0,0,0.9)', fresnel: 'rgba(199,210,254,0.2)', speed: 'animate-[spin_90s_linear_infinite]', hasRings: true, moonOrbit: -25 },
  moltenCore: { base: 'bg-red-950', texture: 'magma', glow: 'bg-orange-500/60', rim: 'border-orange-500/70', shadow: 'rgba(67,20,7,0.8)', fresnel: 'rgba(253,186,116,0.5)', speed: 'animate-[spin_150s_linear_infinite]', pulse: true },
  quantumWorld: { base: 'bg-slate-950', texture: 'quantum', glow: 'bg-cyan-400/40', rim: 'border-cyan-300/80', shadow: 'rgba(8,51,68,0.9)', fresnel: 'rgba(165,243,252,0.6)', speed: 'animate-[spin_60s_linear_infinite]', hasGrid: true },
  stellarCore: { base: 'bg-yellow-500', texture: 'stellar', glow: 'bg-yellow-400/80', rim: 'border-yellow-200/90', shadow: 'transparent', fresnel: 'rgba(254,240,138,0.8)', speed: 'animate-[spin_40s_linear_infinite]', isSun: true },
  dysonSphere: { base: 'bg-amber-900', texture: 'rock', glow: 'bg-amber-500/30', rim: 'border-amber-400/60', shadow: 'rgba(0,0,0,0.85)', fresnel: 'rgba(253,230,138,0.5)', speed: 'animate-[spin_180s_linear_infinite]', hasPanels: true },
  artificialPlanet: { base: 'bg-neutral-900', texture: 'rock', glow: 'bg-emerald-500/30', rim: 'border-emerald-400/60', shadow: 'rgba(0,0,0,0.9)', fresnel: 'rgba(167,243,208,0.5)', speed: 'animate-[spin_100s_linear_infinite]', hasCircuits: true },
  toxicAnomaly: { base: 'bg-lime-950', texture: 'gas', glow: 'bg-lime-500/40', rim: 'border-lime-400/60', shadow: 'rgba(26,46,5,0.8)', fresnel: 'rgba(217,249,157,0.5)', speed: 'animate-[spin_160s_linear_infinite]', hasAcidClouds: true },
  crystalWorld: { base: 'bg-fuchsia-950', texture: 'rock', glow: 'bg-fuchsia-500/20', rim: 'border-fuchsia-400/50', shadow: 'rgba(74,4,78,0.8)', fresnel: 'rgba(250,204,21,0.4)', speed: 'animate-[spin_300s_linear_infinite]', hasFacets: true },
  oceanWorld: { base: 'bg-cyan-900', texture: 'water', glow: 'bg-cyan-400/20', rim: 'border-cyan-300/40', shadow: 'rgba(8,51,68,0.85)', fresnel: 'rgba(165,243,252,0.4)', speed: 'animate-[spin_110s_linear_infinite]' },
  voidPlanet: { base: 'bg-black', texture: 'void', glow: 'bg-purple-900/20', rim: 'border-purple-800/40', shadow: 'rgba(0,0,0,0.95)', fresnel: 'rgba(216,180,254,0.1)', speed: 'animate-none', hasFractures: true },
  plasmaPlanet: { base: 'bg-sky-900', texture: 'gas', glow: 'bg-sky-400/40', rim: 'border-sky-300/60', shadow: 'rgba(12,74,110,0.7)', fresnel: 'rgba(186,230,253,0.7)', speed: 'animate-[spin_45s_linear_infinite]' },
  iceMoon: { base: 'bg-slate-300', texture: 'rock', glow: 'bg-cyan-200/20', rim: 'border-white/50', shadow: 'rgba(15,23,42,0.8)', fresnel: 'rgba(255,255,255,0.6)', speed: 'animate-[spin_200s_linear_infinite]' },
  marsCore: { base: 'bg-orange-800', texture: 'rock', glow: 'bg-red-600/20', rim: 'border-red-400/40', shadow: 'rgba(67,20,7,0.9)', fresnel: 'rgba(254,205,211,0.3)', speed: 'animate-[spin_250s_linear_infinite]' },
  ashWorld: { base: 'bg-stone-800', texture: 'rock', glow: 'bg-stone-500/10', rim: 'border-stone-400/30', shadow: 'rgba(28,25,23,0.95)', fresnel: 'rgba(231,229,228,0.2)', speed: 'animate-[spin_220s_linear_infinite]' },
  bioWorld: { base: 'bg-green-950', texture: 'water', glow: 'bg-green-500/30', rim: 'border-green-400/50', shadow: 'rgba(5,46,22,0.85)', fresnel: 'rgba(187,247,208,0.4)', speed: 'animate-[spin_140s_linear_infinite]', hasSpores: true },
};

// ==========================================
// 2. BULLETPROOF TEXTURE ENGINE
// ==========================================
const TextureOverlay = ({ textureId }) => {
  if (!textureId) return null;
  
  let frequency = "0.05";
  let octaves = "3";
  let blendMode = "mix-blend-overlay";
  let opacity = "opacity-40";
  let type = "fractalNoise";

  if (textureId === 'stellar') { frequency = "0.02"; octaves = "4"; blendMode = "mix-blend-color-dodge"; opacity = "opacity-60"; }
  if (textureId === 'void') { frequency = "0.08"; octaves = "5"; blendMode = "mix-blend-multiply"; opacity = "opacity-50"; }
  if (textureId === 'water') { frequency = "0.015"; octaves = "3"; type = "turbulence"; blendMode = "mix-blend-overlay"; opacity = "opacity-30"; }
  if (textureId === 'rock') { frequency = "0.08"; octaves = "4"; blendMode = "mix-blend-multiply"; opacity = "opacity-60"; }
  if (textureId === 'gas') { frequency = "0.01 0.1"; octaves = "4"; type = "turbulence"; blendMode = "mix-blend-soft-light"; opacity = "opacity-50"; }
  if (textureId === 'magma') { frequency = "0.04"; octaves = "3"; type = "turbulence"; blendMode = "mix-blend-color-burn"; opacity = "opacity-70"; }

  const filterId = `noise-${textureId}-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <svg className={`absolute inset-0 w-full h-full ${blendMode} ${opacity} pointer-events-none`} preserveAspectRatio="none">
      <defs>
        <filter id={filterId}>
          <feTurbulence type={type} baseFrequency={frequency} numOctaves={octaves} result="noise" />
          <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 3 -1" />
        </filter>
      </defs>
      <rect width="100%" height="100%" filter={`url(#${filterId})`} />
    </svg>
  );
};

const Atmosphere = ({ config }) => (
  <>
    {!config.isSun && <div className="absolute w-[80%] h-[30%] -bottom-10 bg-black/80 blur-xl rounded-[100%] scale-110 z-0"></div>}
    <div className={`absolute inset-0 rounded-full scale-[1.2] blur-xl opacity-80 ${config.glow} ${config.pulse ? 'animate-pulse' : ''} ${config.isSun ? 'scale-[1.5] opacity-100 blur-2xl' : ''}`}></div>
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
    <div className={`absolute inset-0 rounded-full border-2 ${config.rim} blur-[1px] opacity-100 z-40 pointer-events-none`}></div>
  </>
);

const Rings = ({ config }) => {
  if (!config.hasRings && !config.hasGoldRings) return null;

  const ringBorder = config.hasGoldRings 
    ? 'border-yellow-500/50 border-x-yellow-300/80' 
    : 'border-indigo-400/20 border-x-indigo-300/40';
    
  const frontRingBorder = config.hasGoldRings 
    ? 'border-yellow-300/80 border-x-yellow-200/100' 
    : 'border-indigo-300/50 border-x-indigo-200/70';

  return (
    <>
      <div className={`absolute w-[260%] h-[260%] rounded-full border-[8px] md:border-[12px] ${ringBorder} z-0 pointer-events-none`} style={{ transform: 'rotateX(75deg) rotateY(-15deg)', clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)' }}></div>
      <div className={`absolute w-[260%] h-[260%] rounded-full border-[8px] md:border-[12px] ${frontRingBorder} z-50 pointer-events-none shadow-[0_0_20px_rgba(253,224,71,0.4)]`} style={{ transform: 'rotateX(75deg) rotateY(-15deg)', clipPath: 'polygon(0 50%, 100% 50%, 100% 100%, 0 100%)' }}></div>
      {!config.isSun && <div className="absolute top-[50%] left-[-20%] w-[140%] h-[15%] bg-black/70 blur-md -rotate-[15deg] z-20 pointer-events-none"></div>}
    </>
  );
};

const Satellites = ({ config }) => (
  <>
    {/* ECHOES OF INNOVATION (Sonic Ripples) */}
    {config.hasEchoes && (
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <div className="absolute w-[180%] h-[180%] rounded-full border-[3px] border-purple-400/50 animate-[ping_3s_linear_infinite]"></div>
        <div className="absolute w-[250%] h-[250%] rounded-full border-[2px] border-fuchsia-300/40 animate-[ping_4s_linear_infinite]" style={{ animationDelay: '1.2s' }}></div>
      </div>
    )}
  </>
);

const Surface = ({ type, config }) => {
  const hexId = `hex-${Math.random().toString(36).substr(2, 9)}`;
  const nodeId = `nodes-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="absolute inset-0 rounded-full overflow-hidden bg-black z-10">
      
      {/* 1. Base Colors & Procedural Textures */}
      <div className={`absolute -inset-[20%] w-[140%] h-[140%] ${config.base} ${config.speed}`}>
        <TextureOverlay textureId={config.texture} />
      </div>

      {/* 2. Bespoke Surface Elements (Tactical & Zenith Overlays) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-20">

        {/* TACTICAL: ZERO-DAY SIEGE (Crosshairs & Targets) */}
        {config.hasCrosshair && (
          <div className="absolute inset-0 mix-blend-screen opacity-90 pointer-events-none">
            <div className="absolute inset-[25%] rounded-full border-[1.5px] border-cyan-400/60 shadow-[0_0_10px_#22d3ee]"></div>
            <div className="absolute inset-[45%] rounded-full border border-cyan-300/40 border-dashed"></div>
            <div className="absolute top-1/2 left-[10%] right-[10%] h-[1.5px] bg-cyan-400/60 shadow-[0_0_8px_#22d3ee]"></div>
            <div className="absolute left-1/2 top-[10%] bottom-[10%] w-[1.5px] bg-cyan-400/60 shadow-[0_0_8px_#22d3ee]"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_white]"></div>
          </div>
        )}

        {/* TACTICAL: ALGORITHM ARENA (Geodesic Poly Grid) */}
        {config.hasPolyGrid && (
          <svg className="absolute inset-0 w-full h-full opacity-50 mix-blend-overlay animate-[spin_100s_linear_infinite]">
            <defs>
              <pattern id="poly" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M10,0 L20,10 L10,20 L0,10 Z M0,0 L20,20 M20,0 L0,20" fill="none" stroke="#f8fafc" strokeWidth="0.8"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#poly)" />
          </svg>
        )}

        {/* TACTICAL: VANGUARD & CRUCIBLE (Data Constellation Nodes) */}
        {config.hasNodes && (
          <svg className="absolute inset-0 w-full h-full opacity-80 mix-blend-screen animate-[spin_120s_linear_infinite_reverse]">
            <defs>
              <pattern id={nodeId} width="30" height="30" patternUnits="userSpaceOnUse">
                <circle cx="8" cy="8" r="1.5" fill={config.nodeColor} filter={`drop-shadow(0 0 3px ${config.nodeColor})`} />
                <circle cx="22" cy="22" r="2" fill={config.nodeColor} filter={`drop-shadow(0 0 4px ${config.nodeColor})`} />
                <path d="M8,8 L22,22 L38,8 M-8,22 L8,8 L8,-8" fill="none" stroke={config.nodeColor} strokeWidth="0.5" opacity="0.6"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#${nodeId})`} />
          </svg>
        )}

        {/* TACTICAL: NEURAL CLASH (Lightning Forks) */}
        {config.hasLightning && (
          <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full mix-blend-screen opacity-90 pointer-events-none">
            <path d="M15,10 L35,35 L25,50 L55,85" fill="none" stroke="#c084fc" strokeWidth="0.8" className="animate-pulse" filter="drop-shadow(0 0 2px #c084fc)" />
            <path d="M85,15 L60,45 L70,55 L35,90" fill="none" stroke="#e879f9" strokeWidth="0.6" className="animate-[pulse_1.5s_infinite]" filter="drop-shadow(0 0 2px #e879f9)" />
            <path d="M5,60 L30,50 L45,70 L80,65" fill="none" stroke="#d8b4fe" strokeWidth="0.4" className="animate-[pulse_2s_infinite]" />
          </svg>
        )}

        {/* ZENITH: DATA & DESTINY (Radar / Sonar Sweep) */}
        {config.hasRadar && (
          <div className="absolute inset-0 mix-blend-screen opacity-100">
            <div className="absolute inset-[15%] rounded-full border border-cyan-300/50"></div>
            <div className="absolute inset-[30%] rounded-full border border-cyan-300/30"></div>
            <div className="absolute inset-[45%] rounded-full border border-cyan-300/10"></div>
            <div className="absolute inset-0 rounded-full animate-[spin_3s_linear_infinite]" style={{ background: 'conic-gradient(from 0deg, transparent 60%, rgba(34,211,238,0.8) 100%)' }}></div>
          </div>
        )}

        {/* ZENITH: ARCHITECTS OF TOMORROW (Thick Hexagonal Grid) */}
        {config.hasHexGrid && (
          <div className="absolute inset-0 opacity-70 mix-blend-screen">
            <svg className="w-full h-full animate-[spin_240s_linear_infinite]">
              <defs>
                <pattern id={hexId} width="20" height="34.64" patternUnits="userSpaceOnUse" patternTransform="scale(0.8)">
                  <path d="M10,0 L20,5.77 L20,17.32 L10,23.09 L0,17.32 L0,5.77 Z" fill="none" stroke="#38bdf8" strokeWidth="2.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill={`url(#${hexId})`} />
            </svg>
          </div>
        )}

        {/* ZENITH: THE PRODUCT HORIZON (Atmospheric Gas Bands) */}
        {config.hasAtmosphere && (
          <div className="absolute inset-0 opacity-80 mix-blend-color-dodge" style={{ backgroundImage: 'linear-gradient(180deg, transparent 15%, rgba(232,121,249,0.5) 35%, transparent 45%, rgba(192,132,252,0.6) 65%, transparent 85%)' }}></div>
        )}
        
        {/* ZENITH: THE ZENITH ADDRESS (Solar Flares) */}
        {config.isSun && (
          <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-yellow-200/40 to-transparent mix-blend-color-dodge animate-[spin_8s_linear_infinite]"></div>
        )}

      </div>
    </div>
  );
};

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
      <Rings config={config} />
      <Surface type={type} config={config} />
      <Lighting config={config} />
      <Satellites config={config} />
    </div>
  );
}