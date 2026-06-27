import React, { useEffect, useRef, useState, useMemo } from 'react';

export default function SpaceBackground() {
  const backgroundRef = useRef(null);
  
  // State to track scroll position (for parallax) and scroll speed (for the warp stretch)
  const [scrollY, setScrollY] = useState(0);
  const [warpSpeed, setWarpSpeed] = useState(0);
  const lastScrollY = useRef(0);

  useEffect(() => {
    let scrollTimeout;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      
      // Calculate how fast the user is scrolling to stretch the stars
      const speed = Math.abs(currentScrollY - lastScrollY.current);
      setWarpSpeed(Math.min(speed * 2, 100)); // Cap the maximum stretch
      lastScrollY.current = currentScrollY;

      // Snap back to normal stars when scrolling stops
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => setWarpSpeed(0), 100);
    };

    const handleMouseMove = (e) => {
      if (!backgroundRef.current) return;
      // Calculate mouse position relative to the center of the screen (-1 to 1)
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      
      // We use CSS variables to move the stars so we don't lag React's render engine
      backgroundRef.current.style.setProperty('--mouse-x', `${x}`);
      backgroundRef.current.style.setProperty('--mouse-y', `${y}`);
    };

    // Listeners for mouse and scroll
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(scrollTimeout);
    };
  }, []);

  // Helper function to randomly generate hundreds of stars using a single CSS box-shadow
  const generateStars = (count, color) => {
    let shadow = '';
    for (let i = 0; i < count; i++) {
      // We generate them across 300vh so you don't run out of stars when scrolling down!
      shadow += `${Math.floor(Math.random() * 100)}vw ${Math.floor(Math.random() * 300)}vh ${color}, `;
    }
    return shadow.slice(0, -2);
  };

  // useMemo ensures we only calculate these random positions once when the site loads
  const starsSmall = useMemo(() => generateStars(400, 'rgba(255, 255, 255, 0.4)'), []); // Distant white stars
  const starsMedium = useMemo(() => generateStars(200, 'rgba(34, 211, 238, 0.6)'), []); // Mid-ground cyan stars
  const starsLarge = useMemo(() => generateStars(75, 'rgba(255, 215, 0, 0.8)'), []);    // Foreground gold stars

  return (
    <div 
      ref={backgroundRef}
      className="fixed top-0 left-0 w-full h-[100vh] z-[-1] bg-black overflow-hidden pointer-events-none"
      style={{ '--mouse-x': '0', '--mouse-y': '0' }}
    >
      {/* 1. The Deep Nebula Glow */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black transition-transform duration-500 ease-out mix-blend-screen"
        style={{ transform: 'translate(calc(var(--mouse-x) * -20px), calc(var(--mouse-y) * -20px)) scale(1.1)' }}
      />

      {/* 2. Layer 1: Distant Stars (Slow scroll parallax, no warp stretch) */}
      <div 
        className="absolute top-0 left-0 w-full h-[300vh] transition-transform duration-300 ease-out"
        style={{ transform: `translate(calc(var(--mouse-x) * -10px), calc(var(--mouse-y) * -10px)) translateY(-${scrollY * 0.1}px)` }}
      >
        <div className="w-[1px] h-[1px] rounded-full bg-transparent" style={{ boxShadow: starsSmall }} />
      </div>

      {/* 3. Layer 2: Mid-Ground Stars (Medium scroll parallax, slight warp stretch) */}
      <div 
        className="absolute top-0 left-0 w-full h-[300vh] transition-transform duration-200 ease-out"
        style={{ transform: `translate(calc(var(--mouse-x) * -25px), calc(var(--mouse-y) * -25px)) translateY(-${scrollY * 0.3}px)` }}
      >
        <div 
          className="w-[2px] rounded-full bg-transparent transition-all duration-150" 
          style={{ 
            boxShadow: starsMedium,
            height: `${2 + warpSpeed * 0.15}px` // Stretches slightly on scroll
          }} 
        />
      </div>

      {/* 4. Layer 3: Foreground Stars (Fast scroll parallax, heavy cinematic warp stretch) */}
      <div 
        className="absolute top-0 left-0 w-full h-[300vh] transition-transform duration-100 ease-out"
        style={{ transform: `translate(calc(var(--mouse-x) * -50px), calc(var(--mouse-y) * -50px)) translateY(-${scrollY * 0.6}px)` }}
      >
        <div 
          className="w-[3px] rounded-full bg-transparent transition-all duration-75" 
          style={{ 
            boxShadow: starsLarge,
            height: `${3 + warpSpeed * 0.5}px`, // Stretches dramatically on scroll
            opacity: warpSpeed > 10 ? 0.6 : 1 // Blurs out slightly when hitting warp speed
          }} 
        />
      </div>
    </div>
  );
}