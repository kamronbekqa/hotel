import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const ParticleSystem = () => {
  const particlesRef = useRef();
  const count = 500;

  // Create particles
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = [];
    
    for (let i = 0; i < count; i++) {
      // Random positions in 3D space
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = Math.random() * 10 - 2;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
      
      // Random velocities
      velocities.push({
        x: (Math.random() - 0.5) * 0.01,
        y: Math.random() * 0.02 + 0.01,
        z: (Math.random() - 0.5) * 0.01
      });
    }
    
    return { positions, velocities };
  }, []);

  useFrame(() => {
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array;
      
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        
        // Update positions
        positions[i3] += particles.velocities[i].x;
        positions[i3 + 1] += particles.velocities[i].y;
        positions[i3 + 2] += particles.velocities[i].z;
        
        // Reset if particle goes too high
        if (positions[i3 + 1] > 8) {
          positions[i3 + 1] = -2;
        }
        
        // Keep particles within bounds
        if (Math.abs(positions[i3]) > 10) {
          positions[i3] = (Math.random() - 0.5) * 20;
        }
        if (Math.abs(positions[i3 + 2]) > 10) {
          positions[i3 + 2] = (Math.random() - 0.5) * 20;
        }
      }
      
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles.positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#ffffff"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

export default ParticleSystem;
