import React from 'react';

export default function GlobalFilters() {
  return (
    <svg className="hidden w-0 h-0 absolute pointer-events-none">
      <defs>
        {/* Base Noise Filters */}
        <filter id="gas-noise" colorInterpolationFilters="sRGB"><feTurbulence type="fractalNoise" baseFrequency="0.01 0.05" numOctaves="4" result="noise" /><feColorMatrix type="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0.4 0" /><feBlend in="SourceGraphic" in2="noise" mode="multiply" /></filter>
        <filter id="ice-noise" colorInterpolationFilters="sRGB"><feTurbulence type="fractalNoise" baseFrequency="0.08" numOctaves="2" result="noise" /><feColorMatrix type="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0.5 0" /><feBlend in="SourceGraphic" in2="noise" mode="screen" /></filter>
        <filter id="rock-noise" colorInterpolationFilters="sRGB"><feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="5" result="noise" /><feColorMatrix type="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0.6 0" /><feBlend in="SourceGraphic" in2="noise" mode="multiply" /></filter>
        <filter id="water-noise" colorInterpolationFilters="sRGB"><feTurbulence type="fractalNoise" baseFrequency="0.01 0.15" numOctaves="3" result="noise" /><feColorMatrix type="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0.5 0" /><feBlend in="SourceGraphic" in2="noise" mode="multiply" /></filter>
        <filter id="magma-noise" colorInterpolationFilters="sRGB"><feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="4" result="noise" /><feColorMatrix type="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0.8 0" /><feBlend in="SourceGraphic" in2="noise" mode="multiply" /></filter>
        <filter id="toxic-noise" colorInterpolationFilters="sRGB"><feTurbulence type="turbulence" baseFrequency="0.05" numOctaves="2" result="noise" /><feColorMatrix type="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0.4 0" /><feBlend in="SourceGraphic" in2="noise" mode="color-burn" /></filter>
        <filter id="terra-noise" colorInterpolationFilters="sRGB"><feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="6" result="noise" /><feColorMatrix type="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0.5 0" /><feBlend in="SourceGraphic" in2="noise" mode="multiply" /></filter>
        <filter id="crystal-noise" colorInterpolationFilters="sRGB"><feTurbulence type="fractalNoise" baseFrequency="0.1" numOctaves="3" result="noise" /><feColorMatrix type="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0.6 0" /><feBlend in="SourceGraphic" in2="noise" mode="color-dodge" /></filter>
        <filter id="void-noise" colorInterpolationFilters="sRGB"><feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="2" result="noise" /><feColorMatrix type="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0.9 0" /><feBlend in="SourceGraphic" in2="noise" mode="multiply" /></filter>
        <filter id="nebula-noise" colorInterpolationFilters="sRGB"><feTurbulence type="turbulence" baseFrequency="0.005 0.03" numOctaves="4" result="noise" /><feColorMatrix type="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0.6 0" /><feBlend in="SourceGraphic" in2="noise" mode="screen" /></filter>
        <filter id="plasma-noise" colorInterpolationFilters="sRGB"><feTurbulence type="fractalNoise" baseFrequency="0.06" numOctaves="3" result="noise" /><feColorMatrix type="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0.7 0" /><feBlend in="SourceGraphic" in2="noise" mode="color-dodge" /></filter>
        <filter id="ash-noise" colorInterpolationFilters="sRGB"><feTurbulence type="fractalNoise" baseFrequency="0.2" numOctaves="3" result="noise" /><feColorMatrix type="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0.5 0" /><feBlend in="SourceGraphic" in2="noise" mode="multiply" /></filter>
        <filter id="stellar-noise" colorInterpolationFilters="sRGB"><feTurbulence type="fractalNoise" baseFrequency="0.08" numOctaves="4" result="noise" /><feColorMatrix type="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0.8 0" /><feBlend in="SourceGraphic" in2="noise" mode="overlay" /></filter>
        <filter id="bio-noise" colorInterpolationFilters="sRGB"><feTurbulence type="turbulence" baseFrequency="0.03" numOctaves="3" result="noise" /><feColorMatrix type="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0.5 0" /><feBlend in="SourceGraphic" in2="noise" mode="color-burn" /></filter>
        
        {/* Cloud Alpha Pushing Filter */}
        <filter id="true-clouds"><feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="4" result="noise"/><feColorMatrix type="matrix" values="1 0 0 0 1  0 1 0 0 1  0 0 1 0 1  0 0 0 1.2 -0.5"/></filter>
      </defs>
    </svg>
  );
}