import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Nature3D = () => {
  const landscapeRef = useRef();
  
  // Create a more varied terrain
  const terrain = useMemo(() => {
    const geometry = new THREE.PlaneGeometry(60, 60, 50, 50);
    const pos = geometry.attributes.position;
    
    for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const y = pos.getY(i);
        const dist = Math.sqrt(x * x + y * y);
        
        // Create mountains in the background (far from center)
        let z = 0;
        if (dist > 10) {
            z = Math.sin(x * 0.2) * Math.cos(y * 0.2) * 2;
            z += Math.sin(x * 0.5) * 1;
            z *= (dist - 10) * 0.5; // Steepness increases with distance
        } else {
            // Flatter area for the dacha
            z = Math.sin(x * 0.1) * Math.cos(y * 0.1) * 0.2;
        }
        
        pos.setZ(i, z);
    }
    
    geometry.computeVertexNormals();
    return geometry;
  }, []);

  // Simple Pine-like tree component
  const Tree = ({ position }) => (
    <group position={position}>
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.05, 0.1, 1]} />
        <meshStandardMaterial color="#3E2723" />
      </mesh>
      <mesh position={[0, 1.2, 0]}>
        <coneGeometry args={[0.4, 1.5, 8]} />
        <meshStandardMaterial color="#1B5E20" roughness={0.8} />
      </mesh>
    </group>
  );

  // Random tree positions
  const trees = useMemo(() => {
    return Array.from({ length: 40 }, () => ({
      position: [
        (Math.random() - 0.5) * 40,
        -1.5, // base ground height approx
        (Math.random() - 0.5) * 40
      ]
    })).filter(t => Math.sqrt(t.position[0]**2 + t.position[2]**2) > 8); // Keep clear area around dacha
  }, []);

  return (
    <group position={[0, -2, 0]}>
      {/* Terrain */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} geometry={terrain}>
        <meshStandardMaterial 
            color="#4E6E5D" 
            roughness={1} 
            metalness={0.1} 
            vertexColors={false}
        />
      </mesh>

      {/* Trees */}
      {trees.map((tree, i) => (
        <Tree key={i} position={[tree.position[0], tree.position[1] + 1.5, tree.position[2]]} />
      ))}

      {/* Decorative Rocks */}
      {[...Array(15)].map((_, i) => (
        <mesh 
            key={`rock-${i}`} 
            position={[
                (Math.random() - 0.5) * 30, 
                0, 
                (Math.random() - 0.5) * 30
            ]}
            rotation={[Math.random(), Math.random(), Math.random()]}
        >
            <dodecahedronGeometry args={[Math.random() * 0.5 + 0.2, 0]} />
            <meshStandardMaterial color="#90A4AE" roughness={0.9} />
        </mesh>
      ))}
    </group>
  );
};

export default Nature3D;
