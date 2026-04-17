import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera, ContactShadows } from '@react-three/drei';
import Nature3D from './Nature3D';
import FloatingCards from './FloatingCards';
import ParticleSystem from './ParticleSystem';
import DachaModel from './DachaModel';
import './Hero3D.css';

const Hero3D = () => {
  return (
    <div className="hero-3d-container">
      <Canvas>
        <Suspense fallback={null}>
          {/* Camera */}
          <PerspectiveCamera makeDefault position={[0, 2, 8]} fov={75} />
          
          {/* Lights */}
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
          <pointLight position={[-10, -10, -5]} intensity={0.5} color="#1ABC9C" />
          <spotLight
            position={[0, 10, 0]}
            angle={0.3}
            penumbra={1}
            intensity={0.5}
            color="#3498DB"
          />
          
          {/* Environment for reflections */}
          <Environment preset="forest" />
          
          {/* 3D Elements */}
          <Nature3D />
          <DachaModel position={[0, -0.2, 0]} />
          <FloatingCards />
          <ParticleSystem />
          
          {/* Controls - disabled for production, enable for testing */}
          <ContactShadows
            position={[0, -2, 0]}
            opacity={0.4}
            scale={20}
            blur={2}
            far={4.5}
          />
          
          {/* Controls */}
          <OrbitControls 
            enableZoom={true} 
            enablePan={false}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 2.1}
            minDistance={4}
            maxDistance={12}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Hero3D;
