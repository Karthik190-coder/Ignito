import React, { useRef, useState } from 'react';

export default function TiltCard({ children, className = '' }) {
  const cardRef = useRef(null);
  const [hoverProps, setHoverProps] = useState({
    rotateX: 0,
    rotateY: 0,
    glareX: 50,
    glareY: 50,
    isHovering: false,
  });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    
    // Get mouse position relative to the card itself
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calculate percentages for the glare (0 to 100%)
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    // Calculate rotation (-10 to 10 degrees). 
    // The center of the card is 0, edges are max rotation.
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Multiplier dictates how dramatic the tilt is
    const rotateX = ((y - centerY) / centerY) * -10; 
    const rotateY = ((x - centerX) / centerX) * 10;

    setHoverProps({ rotateX, rotateY, glareX, glareY, isHovering: true });
  };

  const handleMouseLeave = () => {
    // Smoothly snap back to flat when the mouse leaves
    setHoverProps({ ...hoverProps, rotateX: 0, rotateY: 0, isHovering: false });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setHoverProps({ ...hoverProps, isHovering: true })}
      className={`relative rounded-2xl transition-all duration-200 ease-out ${className}`}
      style={{
        // 1. The 3D Perspective
        transform: `perspective(1000px) rotateX(${hoverProps.rotateX}deg) rotateY(${hoverProps.rotateY}deg) scale3d(${hoverProps.isHovering ? 1.02 : 1}, ${hoverProps.isHovering ? 1.02 : 1}, 1)`,
        // 2. Remove transition delay while hovering so it tracks the mouse instantly
        transition: hoverProps.isHovering ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
        // Preserve 3D space for child elements
        transformStyle: 'preserve-3d',
      }}
    >
      {/* 3. The Dynamic Glare Layer */}
      <div 
        className="absolute inset-0 z-50 rounded-2xl pointer-events-none transition-opacity duration-300"
        style={{
          opacity: hoverProps.isHovering ? 1 : 0,
          background: `radial-gradient(circle at ${hoverProps.glareX}% ${hoverProps.glareY}%, rgba(255,255,255,0.15) 0%, transparent 60%)`,
        }}
      />
      
      {/* 4. The actual content passed into the wrapper */}
      <div 
        className="h-full w-full"
        style={{ transform: 'translateZ(30px)' }} // Pops the content slightly out of the glass
      >
        {children}
      </div>
    </div>
  );
}