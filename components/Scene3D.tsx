import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Html } from '@react-three/drei';
import * as THREE from 'three';
import { SOLAR_SYSTEM_DATA } from '../constants';
import { PlanetData, AppSettings } from '../types';

// Fix for missing JSX intrinsic elements
// Augment both global JSX and React.JSX namespaces to ensure compatibility
declare global {
  namespace JSX {
    interface IntrinsicElements {
      group: any;
      mesh: any;
      ringGeometry: any;
      meshBasicMaterial: any;
      sphereGeometry: any;
      meshStandardMaterial: any;
      ambientLight: any;
      pointLight: any;
    }
  }
}

// In some TypeScript configurations with React 18+, the JSX namespace is under React
declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      group: any;
      mesh: any;
      ringGeometry: any;
      meshBasicMaterial: any;
      sphereGeometry: any;
      meshStandardMaterial: any;
      ambientLight: any;
      pointLight: any;
    }
  }
}

// Individual Planet Component
const Planet = ({ 
  data, 
  onClick, 
  settings, 
  isSelected 
}: { 
  data: PlanetData; 
  onClick: (p: PlanetData) => void; 
  settings: AppSettings;
  isSelected: boolean;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  // Random starting angle
  const [angle] = useState(Math.random() * Math.PI * 2); 
  
  useFrame(({ clock }) => {
    if (meshRef.current && !settings.autoRotate && data.id !== 'sun') {
        // Pause logic would go here if we implemented pause
    }
    
    if (meshRef.current && data.distance > 0) {
      // Orbit Logic
      const t = clock.getElapsedTime() * data.speed + angle;
      const x = Math.cos(t) * data.distance;
      const z = Math.sin(t) * data.distance;
      meshRef.current.position.set(x, 0, z);
      
      // Self Rotation
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group>
      {/* Orbit Path Visualization */}
      {settings.showOrbits && data.distance > 0 && (
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[data.distance - 0.05, data.distance + 0.05, 64]} />
          <meshBasicMaterial color="#ffffff" opacity={0.1} transparent side={THREE.DoubleSide} />
        </mesh>
      )}

      {/* The Planet Mesh */}
      <mesh 
        ref={meshRef} 
        onClick={(e: any) => { e.stopPropagation(); onClick(data); }}
        position={[data.distance, 0, 0]} // Initial pos, updated by useFrame
      >
        <sphereGeometry args={[data.radius, 32, 32]} />
        <meshStandardMaterial 
          color={data.color} 
          emissive={data.id === 'sun' ? data.color : '#000'}
          emissiveIntensity={data.id === 'sun' ? 2 : 0}
          roughness={0.7}
        />
        
        {/* Selection Highlight Ring */}
        {isSelected && (
           <mesh rotation={[Math.PI / 2, 0, 0]}>
             <ringGeometry args={[data.radius * 1.4, data.radius * 1.5, 32]} />
             <meshBasicMaterial color="#3b82f6" side={THREE.DoubleSide} transparent opacity={0.8} />
           </mesh>
        )}

        {/* Planet Label */}
        {settings.showLabels && (
          <Html distanceFactor={15} position={[0, data.radius + 0.5, 0]}>
            <div className={`px-2 py-1 rounded bg-black/50 backdrop-blur-sm border border-white/10 text-xs text-white whitespace-nowrap select-none pointer-events-none transition-opacity ${isSelected ? 'opacity-100' : 'opacity-70'}`}>
              {data.name}
            </div>
          </Html>
        )}
      </mesh>
    </group>
  );
};

interface SceneProps {
  onPlanetSelect: (planet: PlanetData | null) => void;
  selectedPlanet: PlanetData | null;
  settings: AppSettings;
}

const Scene3D: React.FC<SceneProps> = ({ onPlanetSelect, selectedPlanet, settings }) => {
  return (
    <div className="absolute inset-0 bg-[#0a0a0f]">
      <Canvas camera={{ position: [0, 20, 45], fov: 60 }}>
        {/* Lighting */}
        <ambientLight intensity={0.1} />
        <pointLight position={[0, 0, 0]} intensity={2} color="#fff" distance={100} decay={2} />
        
        {/* Background Stars */}
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

        {/* Solar System Objects */}
        {SOLAR_SYSTEM_DATA.map((planet) => (
          <Planet 
            key={planet.id} 
            data={planet} 
            onClick={onPlanetSelect} 
            settings={settings}
            isSelected={selectedPlanet?.id === planet.id}
          />
        ))}

        {/* Controls */}
        <OrbitControls 
          enablePan={true} 
          enableZoom={true} 
          minDistance={5} 
          maxDistance={100} 
          autoRotate={settings.autoRotate}
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
};

export default Scene3D;