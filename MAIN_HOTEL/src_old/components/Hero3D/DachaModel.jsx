import React from 'react';
import { RoundedBox } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

const DachaModel = ({ position = [0, 0, 0] }) => {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.getElapsedTime();
      // Gentle floating effect
      groupRef.current.position.y = position[1] + Math.sin(time * 0.5) * 0.05;
    }
  });

  // Nature/Mountain Palette Harmony
  const colors = {
    glass: "#FFFFFF", // Brighter glass
    wall: "#FFFFFF",
    roof: "#2C3E50", // Match Deep Slate
    wood: "#3E2723", // Darker Forest Wood
    stone: "#90A4AE", // Stone grey
    water: "#B2EBF2", // Crystal clear mountain water
    glow: "#F39C12"   // Sunset Glow
  };

  return (
    <group ref={groupRef} position={position}>
      {/* Base Platform - Natural Stone */}
      <RoundedBox args={[6, 0.4, 6]} radius={0.1} smoothness={4} position={[0, -0.2, 0]}>
        <meshStandardMaterial color={colors.stone} roughness={0.9} metalness={0.1} />
      </RoundedBox>

      {/* Ground Floor Interior */}
      <mesh position={[0, 0.8, 0]}>
        <boxGeometry args={[4.2, 1.6, 3.8]} />
        <meshStandardMaterial color="#f7f9f9" />
      </mesh>

      {/* Main Glass Structure - Ground Floor */}
      <RoundedBox args={[4.5, 1.8, 4]} radius={0.05} smoothness={4} position={[0, 0.9, 0]}>
        <meshPhysicalMaterial 
          color={colors.glass} 
          transparent 
          opacity={0.15} 
          roughness={0} 
          metalness={0.1} 
          transmission={0.95}
          thickness={0.5}
          envMapIntensity={2}
        />
      </RoundedBox>

      {/* Structural Columns (Dark Wood) */}
      {[[-2.1, 0, -1.9], [2.1, 0, -1.9], [-2.1, 0, 1.9], [2.1, 0, 1.9]].map((pos, i) => (
        <mesh key={`col-${i}`} position={[pos[0], 0.9, pos[2]]}>
          <boxGeometry args={[0.22, 1.8, 0.22]} />
          <meshStandardMaterial color={colors.wood} roughness={0.6} />
        </mesh>
      ))}

      {/* First Floor Terrace / Roof (Dark Wood) */}
      <RoundedBox args={[5.1, 0.15, 4.6]} radius={0.02} smoothness={4} position={[0, 1.8, 0]}>
        <meshStandardMaterial color={colors.wood} roughness={0.5} />
      </RoundedBox>

      {/* Second Floor Structure */}
      <group position={[0.5, 2.5, 0]}>
        <RoundedBox args={[3.2, 1.4, 3.2]} radius={0.05} smoothness={4}>
          <meshPhysicalMaterial 
            color={colors.glass} 
            transparent 
            opacity={0.2} 
            roughness={0} 
            metalness={0.1} 
            transmission={0.9}
            thickness={0.3}
          />
        </RoundedBox>
        <RoundedBox args={[3.6, 0.15, 3.6]} radius={0.02} smoothness={4} position={[0, 0.7, 0]}>
          <meshStandardMaterial color={colors.roof} />
        </RoundedBox>
      </group>

      {/* Mountain Spring Pool on Terrace */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 2.2]}>
        <planeGeometry args={[5, 1.2]} />
        <meshStandardMaterial 
          color={colors.water} 
          transparent 
          opacity={0.6} 
          metalness={0.9} 
          roughness={0.05}
          emissive={colors.water}
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Railings */}
      <group position={[0, 2, 0]}>
         <mesh position={[0, 0.3, 2.15]}>
            <boxGeometry args={[4.8, 0.6, 0.05]} />
            <meshStandardMaterial color={colors.glass} transparent opacity={0.1} />
         </mesh>
         <mesh position={[2.4, 0.3, 0]}>
            <boxGeometry args={[0.05, 0.6, 4.2]} />
            <meshStandardMaterial color={colors.glass} transparent opacity={0.1} />
         </mesh>
      </group>

      {/* Interior Warm Glows */}
      <pointLight position={[0, 1, 0]} distance={5} intensity={6} color={colors.glow} />
      <pointLight position={[0.5, 2.5, 0]} distance={4} intensity={4} color={colors.glow} />
      
      {/* Dark Wood Slats on side */}
      <group position={[-2.3, 0.9, 0]}>
        {[...Array(12)].map((_, i) => (
          <mesh key={`slat-${i}`} position={[0, 0, -1.8 + i * 0.33]}>
            <boxGeometry args={[0.05, 1.8, 0.08]} />
            <meshStandardMaterial color={colors.wood} />
          </mesh>
        ))}
      </group>
    </group>
  );
};

export default DachaModel;
