import React, { useEffect, useRef, useState } from 'react';

export default function Reveal({ children, delay = 0 }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // We removed the 'unobserve' lock. 
        // Now it smoothly toggles true when it enters, and false when it leaves.
        requestAnimationFrame(() => {
          setIsVisible(entry.isIntersecting);
        });
      },
      {
        threshold: 0.1, 
        // We use a slight negative margin on the bottom so it begins de-loading 
        // right before it completely falls off the screen
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
        // Using the same premium physics curve for both entering and exiting
        transition: `
          opacity 1s cubic-bezier(0.16, 1, 0.3, 1), 
          transform 1s cubic-bezier(0.16, 1, 0.3, 1), 
          filter 1s cubic-bezier(0.16, 1, 0.3, 1)
        `,
        transitionDelay: `${isVisible ? delay : 0}ms`, // Only delay on the way in, not the way out
        willChange: 'opacity, transform, filter',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(50px) scale(0.95)',
        filter: isVisible ? 'blur(0px)' : 'blur(12px)',
      }}
    >
      {children}
    </div>
  );
}