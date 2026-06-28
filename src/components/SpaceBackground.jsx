import React, { useEffect, useRef, useState, useMemo } from 'react';

export default function SpaceBackground() {
  const backgroundRef = useRef(null);
  
  // Existing state
  const [scrollY, setScrollY] = useState(0);
  const [warpSpeed, setWarpSpeed] = useState(0);
  const lastScrollY = useRef(0);

  // --- NEW: Hyper-Warp State ---
  const [isWarping, setIsWarping] = useState(false);
  const [warpOrigin, setWarpOrigin] = useState({ x: '50%', y: '50%' });

  useEffect(() => {
    let scrollTimeout;

    const handleScroll = () => {
      if (isWarping) return; // Disable scroll effects during warp
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      
      const speed = Math.abs(currentScrollY - lastScrollY.current);
      setWarpSpeed(Math.min(speed * 2, 100));
      lastScrollY.current = currentScrollY;

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => setWarpSpeed(0), 100);
    };

    const handleMouseMove = (e) => {
      if (!backgroundRef.current || isWarping) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      
      backgroundRef.current.style.setProperty('--mouse-x', `${x}`);
      backgroundRef.current.style.setProperty('--mouse-y', `${y}`);
    };

    // --- NEW: The Warp Event Listener ---
    const handleWarpTrigger = (e) => {
      const { clientX, clientY } = e.detail;
      
      // Convert click coordinates to percentages for transform-origin
      const xPercent = (clientX / window.innerWidth) * 100;
      const yPercent = (clientY / window.innerHeight) * 100;
      
      setWarpOrigin({ x: `${xPercent}%`, y: `${yPercent}%` });
      setIsWarping(true);

      // Reset the warp after the animation completes (match your transition duration)
      // The new page content should mount during this window.
      setTimeout(() => {
        setIsWarping(false);
      }, 700); 
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('trigger-warp', handleWarpTrigger);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('trigger-warp', handleWarpTrigger);
      clearTimeout(scrollTimeout);
    };
  }, [isWarping]);

  const generateStars = (count, color) => {
    let shadow = '';
    for (let i = 0; i < count; i++) {
      shadow += `${Math.floor(Math.random() * 100)}vw ${Math.floor(Math.random() * 300)}vh ${color}, `;
    }
    return shadow.slice(0, -2);
  };

  const starsSmall = useMemo(() => generateStars(400, 'rgba(255, 255, 255, 0.4)'), []);
  const starsMedium = useMemo(() => generateStars(200, 'rgba(34, 211, 238, 0.6)'), []);
  const starsLarge = useMemo(() => generateStars(75, 'rgba(255, 215, 0, 0.8)'), []);

  // Calculate dynamic transform values based on whether we are warping or not
  const getTransform = (depthMultiplier, baseScale = 1, warpScaleMultiplier = 1) => {
    if (isWarping) {
      // Dive into the screen! Ignore mouse/scroll, just scale up massively.
      return `scale(${baseScale * warpScaleMultiplier})`;
    }
    // Normal parallax state
    return `translate(calc(var(--mouse-x) * -${depthMultiplier * 10}px), calc(var(--mouse-y) * -${depthMultiplier * 10}px)) translateY(-${scrollY * (depthMultiplier * 0.1)}px) scale(${baseScale})`;
  };

  return (
    <div 
      ref={backgroundRef}
      className="fixed top-0 left-0 w-full h-[100vh] z-[-1] bg-black overflow-hidden pointer-events-none"
      style={{ '--mouse-x': '0', '--mouse-y': '0' }}
    >
      {/* 1. The Deep Nebula Glow */}
      <div 
        className={`absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black transition-all ease-in-out mix-blend-screen ${isWarping ? 'duration-[700ms] opacity-0' : 'duration-500 opacity-100'}`}
        style={{ 
          transform: getTransform(2, 1.1, 3),
          transformOrigin: `${warpOrigin.x} ${warpOrigin.y}`
        }}
      />

      {/* 2. Layer 1: Distant Stars */}
      <div 
        className={`absolute top-0 left-0 w-full h-[300vh] transition-all ease-in ${isWarping ? 'duration-[600ms] blur-[1px]' : 'duration-300 ease-out blur-none'}`}
        style={{ 
          transform: getTransform(1, 1, 8), // Scales 8x on click
          transformOrigin: `${warpOrigin.x} ${warpOrigin.y}`
        }}
      >
        <div className="w-[1px] h-[1px] rounded-full bg-transparent" style={{ boxShadow: starsSmall }} />
      </div>

      {/* 3. Layer 2: Mid-Ground Stars */}
      <div 
        className={`absolute top-0 left-0 w-full h-[300vh] transition-all ease-in ${isWarping ? 'duration-[500ms] blur-[2px]' : 'duration-200 ease-out blur-none'}`}
        style={{ 
          transform: getTransform(2.5, 1, 12), // Scales 12x on click (moves past you faster)
          transformOrigin: `${warpOrigin.x} ${warpOrigin.y}`
        }}
      >
        <div 
          className="w-[2px] rounded-full bg-transparent transition-all duration-150" 
          style={{ 
            boxShadow: starsMedium,
            height: isWarping ? '20px' : `${2 + warpSpeed * 0.15}px` // Artificial stretch during warp
          }} 
        />
      </div>

      {/* 4. Layer 3: Foreground Stars */}
      <div 
        className={`absolute top-0 left-0 w-full h-[300vh] transition-all ease-in ${isWarping ? 'duration-[400ms] blur-[3px] opacity-0' : 'duration-100 ease-out opacity-100'}`}
        style={{ 
          transform: getTransform(5, 1, 18), // Scales 18x on click (flies past camera instantly)
          transformOrigin: `${warpOrigin.x} ${warpOrigin.y}`
        }}
      >
        <div 
          className="w-[3px] rounded-full bg-transparent transition-all duration-75" 
          style={{ 
            boxShadow: starsLarge,
            height: isWarping ? '40px' : `${3 + warpSpeed * 0.5}px`, 
            opacity: (warpSpeed > 10 && !isWarping) ? 0.6 : 1 
          }} 
        />
      </div>
    </div>
  );
}