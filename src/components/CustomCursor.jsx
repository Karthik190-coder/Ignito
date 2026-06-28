import React, { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  // Wrappers handle the instant movement
  const starWrapperRef = useRef(null);
  const glowWrapperRef = useRef(null);
  const rayRef = useRef(null);

  // State handles the visual flair (dimming, pulsing, scaling)
  const [isIdle, setIsIdle] = useState(true);
  
  const pos = useRef({ x: -100, y: -100 });
  const mouse = useRef({ x: -100, y: -100 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  // We add a state to check if the device actually has a mouse
  const [hasMouse, setHasMouse] = useState(true); 

  useEffect(() => {
    // This checks if the user's primary input is a precise pointer (like a mouse/trackpad)
    const mediaQuery = window.matchMedia('(pointer: fine)');
    setHasMouse(mediaQuery.matches);

    // If no mouse is detected, don't bother setting up the event listeners
    if (!mediaQuery.matches) return;

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // If it's a touch screen (phone/tablet), render absolutely nothing.
  if (!hasMouse) return null;

  useEffect(() => {
    let timeout;

    const handleMouseMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };

      // Trigger visual states
      setIsIdle(false);
      clearTimeout(timeout);
      timeout = setTimeout(() => setIsIdle(true), 150);
    };

    const animate = () => {
      // Smooth interpolation
      pos.current.x += (mouse.current.x - pos.current.x) * 0.4;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.4;

      const { x, y } = pos.current;

      // 1. Move Wrappers (Zero CSS transitions on these!)
      if (starWrapperRef.current) starWrapperRef.current.style.transform = `translate(${x}px, ${y}px)`;
      if (glowWrapperRef.current) glowWrapperRef.current.style.transform = `translate(${x}px, ${y}px)`;

      // 2. Dramatic Ray Logic
      const dx = mouse.current.x - pos.current.x;
      const dy = mouse.current.y - pos.current.y;
      
      const length = Math.min(Math.sqrt(dx * dx + dy * dy) * 6, 300); 
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);

      if (rayRef.current) {
        rayRef.current.style.width = `${length}px`;
        // Centered perfectly: Since the ray is now h-2 (8px), we offset by 4px
        rayRef.current.style.transform = `translate(${x}px, ${y - 4}px) rotate(${angle + 180}deg)`;
      }

      requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    const loop = requestAnimationFrame(animate);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(loop);
    };
  }, []);

  return (
    <>
      {/* LAYER 1: The Blazing Ray of Light (NOW THINNER) */}
      <div
        ref={rayRef}
        // Changed to h-2 (8px thick)
        className={`fixed top-0 left-0 h-2 pointer-events-none z-[98] mix-blend-screen transition-opacity duration-200 ease-out
          ${isIdle ? 'opacity-0' : 'opacity-100'}
        `}
        style={{
          // Kept the exact same maximum flair gradient
          background: 'linear-gradient(to right, rgba(255, 255, 255, 1) 0%, rgba(253, 224, 71, 1) 10%, rgba(249, 115, 22, 0.8) 50%, transparent 100%)',
          // Tightened the blur slightly so the thin line doesn't wash out
          filter: 'blur(2px)',
          transformOrigin: 'left center'
        }}
      />

      {/* LAYER 2: The Idle Glow Wrapper */}
      <div ref={glowWrapperRef} className="fixed top-0 left-0 pointer-events-none z-[99]">
        <div
          className={`absolute -top-12 -left-12 rounded-full mix-blend-screen transition-all duration-500
            ${isIdle ? 'w-24 h-24 bg-yellow-400/50 blur-2xl opacity-100 animate-pulse' : 'w-12 h-12 bg-transparent blur-md opacity-0'}
          `}
        />
      </div>

      {/* LAYER 3: The Star Wrapper */}
      <div ref={starWrapperRef} className="fixed top-0 left-0 pointer-events-none z-[100]">
        <svg
          viewBox="0 0 512 512"
          className={`absolute -top-3 -left-3 w-6 h-6 text-yellow-200 transition-all duration-300
            ${isIdle 
              ? 'opacity-100 scale-125 drop-shadow-[0_0_20px_rgba(255,255,255,1)]' 
              : 'opacity-80 scale-90 drop-shadow-[0_0_8px_rgba(255,215,0,0.8)]' 
            }
          `}
          fill="currentColor"
        >
          <path d="M256 0c0 141.38-114.62 256-256 256 141.38 0 256 114.62 256 256 0-141.38 114.62-256 256-256C370.62 256 256 141.38 256 0z" />
        </svg>
      </div>
    </>
  );
}