import React, { useRef, useState, useEffect } from 'react';

export default function TiltCard({ children, className = '' }) {
  const cardRef = useRef(null);
  const [hasMouse, setHasMouse] = useState(true);
  
  const [hoverProps, setHoverProps] = useState({
    rotateX: 0,
    rotateY: 0,
    glareX: 50,
    glareY: 50,
    isHovering: false,
  });

  // Check for a real mouse on mount
  useEffect(() => {
    setHasMouse(window.matchMedia('(pointer: fine)').matches);
  }, []);

  const handleMouseMove = (e) => {
    // If it's a mobile device, completely ignore the math to save battery and prevent glitches
    if (!hasMouse || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10; 
    const rotateY = ((x - centerX) / centerX) * 10;

    setHoverProps({ rotateX, rotateY, glareX, glareY, isHovering: true });
  };

  const handleMouseLeave = () => {
    if (!hasMouse) return;
    setHoverProps({ ...hoverProps, rotateX: 0, rotateY: 0, isHovering: false });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => hasMouse && setHoverProps({ ...hoverProps, isHovering: true })}
      className={`relative rounded-2xl transition-all duration-200 ease-out ${className}`}
      style={{
        transform: `perspective(1000px) rotateX(${hoverProps.rotateX}deg) rotateY(${hoverProps.rotateY}deg) scale3d(${hoverProps.isHovering ? 1.02 : 1}, ${hoverProps.isHovering ? 1.02 : 1}, 1)`,
        transition: hoverProps.isHovering ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Glare is only visible if hovering on a desktop */}
      <div 
        className="absolute inset-0 z-50 rounded-2xl pointer-events-none transition-opacity duration-300"
        style={{
          opacity: hoverProps.isHovering ? 1 : 0,
          background: `radial-gradient(circle at ${hoverProps.glareX}% ${hoverProps.glareY}%, rgba(255,255,255,0.15) 0%, transparent 60%)`,
        }}
      />
      
      <div className="h-full w-full" style={{ transform: hasMouse ? 'translateZ(30px)' : 'translateZ(0px)' }}>
        {children}
      </div>
    </div>
  );
}