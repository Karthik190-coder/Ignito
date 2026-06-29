import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// 1. The Core 3D Math Component
function Swirl({ color }) {
  const pointsRef = useRef();

  // useMemo ensures we only calculate these 4,000 positions once when the page loads
  const particlesPosition = useMemo(() => {
    const count = 4000;
    const positions = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      // Distance from the center of the galaxy
      const distance = Math.random() * 4;
      // The spiral twist factor (closer to center = tighter twist)
      const angle = distance * 2.0; 
      // 3 distinct spiral arms
      const branchAngle = (i % 3) * ((Math.PI * 2) / 3); 

      // Scatter the stars so it looks like dust, not a perfect line
      // The further out the star is, the more it scatters
      const scatter = (Math.random() - 0.5) * (distance * 0.3 + 0.1);

      // X, Y, Z coordinates
      positions[i * 3] = Math.cos(angle + branchAngle) * distance + scatter;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 0.4; // The vertical thickness of the galaxy disk
      positions[i * 3 + 2] = Math.sin(angle + branchAngle) * distance + scatter;
    }
    return positions;
  }, []);

  // Slowly rotate the entire galaxy on every single frame
  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y -= delta * 0.1;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesPosition.length / 3}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      {/* Additive blending makes overlapping stars create a bright, white-hot core */}
      <pointsMaterial
        size={0.03}
        color={color}
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// 2. The Wrapper Component (What you will actually import into your map)
export default function ParticleGalaxy({ color = "#22d3ee", tilt = 65 }) {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none">
      <Canvas camera={{ position: [0, 0, 7], fov: 60 }}>
        {/* We tilt the entire 3D group to give it that command-deck perspective */}
        <group rotation={[(tilt * Math.PI) / 180, 0, 0]}>
          <Swirl color={color} />
        </group>
      </Canvas>
    </div>
  );
}