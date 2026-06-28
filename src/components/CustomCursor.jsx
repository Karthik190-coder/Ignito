import React, { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const starWrapperRef = useRef(null);
  const glowWrapperRef = useRef(null);
  const rayRef = useRef(null);

  const [isIdle, setIsIdle] = useState(true);
  const [hasMouse, setHasMouse] = useState(false); // Default to false to prevent mobile flashes

  const pos = useRef({ x: -100, y: -100 });
  const mouse = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // 1. Core Mobile Protection
const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    setHasMouse(mediaQuery.matches);

    // If it's a touchscreen (phone/tablet), exit completely before binding loop engines
    if (!mediaQuery.matches) return;

    let timeout;

    const handleMouseMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };

      setIsIdle(false);
      clearTimeout(timeout);
      timeout = setTimeout(() => setIsIdle(true), 150);
    };

    const animate = () => {
      // Smooth interpolation physics
      pos.current.x += (mouse.current.x - pos.current.x) * 0.4;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.4;

      const { x, y } = pos.current;

      // Move Wrappers safely
      if (starWrapperRef.current) starWrapperRef.current.style.transform = `translate(${x}px, ${y}px)`;
      if (glowWrapperRef.current) glowWrapperRef.current.style.transform = `translate(${x}px, ${y}px)`;

      // Dynamic Ray Vector Tracking
      const dx = mouse.current.x - pos.current.x;
      const dy = mouse.current.y - pos.current.y;
      
      const length = Math.min(Math.sqrt(dx * dx + dy * dy) * 6, 300); 
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);

      if (rayRef.current) {
        rayRef.current.style.width = `${length}px`;
        rayRef.current.style.transform = `translate(${x}px, ${y - 4}px) rotate(${angle + 180}deg)`;
      }

      loopId = requestAnimationFrame(animate);
    };

    // Bind event listeners and jump-start the loop together
    window.addEventListener('mousemove', handleMouseMove);
    let loopId = requestAnimationFrame(animate);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(loopId);
      clearTimeout(timeout);
    };
  }, []);

  // Structural Safeguard
  if (!hasMouse) return null;

  return (
    <>
      {/* LAYER 1: The Blazing Ray of Light */}
      <div
        ref={rayRef}
        className={`fixed top-0 left-0 h-2 pointer-events-none z-[98] mix-blend-screen transition-opacity duration-200 ease-out
          ${isIdle ? 'opacity-0' : 'opacity-100'}
        `}
        style={{
          background: 'linear-gradient(to right, rgba(255, 255, 255, 1) 0%, rgba(253, 224, 71, 1) 10%, rgba(249, 115, 22, 0.8) 50%, transparent 100%)',
          filter: 'blur(2px)',
          transformOrigin: 'left center',
          willChange: 'transform, width'
        }}
      />

      {/* LAYER 2: The Idle Glow Wrapper */}
      <div ref={glowWrapperRef} className="fixed top-0 left-0 pointer-events-none z-[99] will-change-transform">
        <div
          className={`absolute -top-12 -left-12 rounded-full mix-blend-screen transition-all duration-500
            ${isIdle ? 'w-24 h-24 bg-yellow-400/50 blur-2xl opacity-100 animate-pulse' : 'w-12 h-12 bg-transparent blur-md opacity-0'}
          `}
        />
      </div>

      {/* LAYER 3: The Star Wrapper */}
      <div ref={starWrapperRef} className="fixed top-0 left-0 pointer-events-none z-[100] will-change-transform">
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