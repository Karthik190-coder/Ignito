import React, { useEffect, useRef, useState } from 'react';

export default function Reveal({ children, delay = 0 }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        requestAnimationFrame(() => {
          setIsVisible(entry.isIntersecting);
        });
      },
      {
        threshold: 0.1, 
        rootMargin: '0px 0px -50px 0px' 
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      className="w-full"
      style={{
        // 1. Removed the expensive 'filter' physics
        transition: `
          opacity 1s cubic-bezier(0.16, 1, 0.3, 1), 
          transform 1s cubic-bezier(0.16, 1, 0.3, 1)
        `,
        transitionDelay: `${isVisible ? delay : 0}ms`,
        // 2. Removed 'filter' from hardware acceleration to save VRAM
        willChange: 'opacity, transform',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(50px) scale(0.95)',
      }}
    >
      {children}
    </div>
  );
}