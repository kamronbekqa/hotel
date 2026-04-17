import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import {  useTexture } from '@react-three/drei';
import * as THREE from 'three';

const Ocean3D = () => {
  const meshRef = useRef();
  
  // Create wave geometry
  const geometry = new THREE.PlaneGeometry(20, 20, 64, 64);
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      const positions = meshRef.current.geometry.attributes.position;
      
      // Animate waves
      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i);
        const y = positions.getY(i);
        
        // Create wave effect
        const wave1 = Math.sin(x * 0.5 + time) * 0.3;
        const wave2 = Math.sin(y * 0.3 + time * 0.5) * 0.2;
        const wave3 = Math.sin((x + y) * 0.2 + time * 0.3) * 0.15;
        
        positions.setZ(i, wave1 + wave2 + wave3);
      }
      
      positions.needsUpdate = true;
      meshRef.current.geometry.computeVertexNormals();
      
      // Mouse parallax
      meshRef.current.rotation.x = -Math.PI / 2 + state.mouse.y * 0.1;
      meshRef.current.rotation.z = state.mouse.x * 0.05;
    }
  });

  return (
    <mesh
      ref={meshRef}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -2, 0]}
      geometry={geometry}
    >
      <meshStandardMaterial
        color="#1ABC9C"
        emissive="#16A085"
        emissiveIntensity={0.3}
        roughness={0.2}
        metalness={0.8}
        wireframe={false}
      />
    </mesh>
  );
};

export default Ocean3D;
