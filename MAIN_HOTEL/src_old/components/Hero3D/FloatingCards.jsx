import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, RoundedBox } from '@react-three/drei';

const FloatingCard = ({ position, title, price, delay }) => {
  const cardRef = useRef();
  
  useFrame((state) => {
    if (cardRef.current) {
      const time = state.clock.getElapsedTime();
      
      // Floating animation
      cardRef.current.position.y = position[1] + Math.sin(time * 0.5 + delay) * 0.3;
      
      // Gentle rotation
      cardRef.current.rotation.y = Math.sin(time * 0.3 + delay) * 0.1;
      
      // Mouse interaction - pull cards toward mouse
      const mouseX = state.mouse.x * 2;
      const mouseY = state.mouse.y * 2;
      
      cardRef.current.rotation.y += mouseX * 0.05;
      cardRef.current.rotation.x = mouseY * 0.05;
    }
  });

  return (
    <group ref={cardRef} position={position}>
      {/* Card background */}
      <RoundedBox args={[2, 2.5, 0.1]} radius={0.1} smoothness={4}>
        <meshStandardMaterial
          color="#ffffff"
          transparent
          opacity={0.15}
          roughness={0.1}
          metalness={0.9}
          envMapIntensity={1}
        />
      </RoundedBox>
      
      {/* Title text */}
      <Text
        position={[0, 0.6, 0.06]}
        fontSize={0.2}
        color="#1ABC9C"
        anchorX="center"
        anchorY="middle"
      >
        {title}
      </Text>
      
      {/* Price text */}
      <Text
        position={[0, 0.2, 0.06]}
        fontSize={0.3}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {price}
      </Text>
      
      {/* Decorative line */}
      <mesh position={[0, -0.1, 0.06]}>
        <planeGeometry args={[1.5, 0.02]} />
        <meshStandardMaterial color="#1ABC9C" emissive="#1ABC9C" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
};

const FloatingCards = () => {
  const cards = [
    { position: [-3, 0, -2], title: 'Seaside Villa', price: '$450K', delay: 0 },
    { position: [3, 0, -1], title: 'Beach House', price: '$320K', delay: 1 },
    { position: [0, 1, -3], title: 'Ocean View', price: '$580K', delay: 2 },
  ];

  return (
    <>
      {cards.map((card, index) => (
        <FloatingCard key={index} {...card} />
      ))}
    </>
  );
};

export default FloatingCards;
