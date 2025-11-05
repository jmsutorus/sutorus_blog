'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

// Individual floating heart component
function FloatingHeart({ position, scale, speed }: { position: [number, number, number]; scale: number; speed: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle floating motion
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.3;
      // Gentle rotation
      meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.5;
    }
  });

  // Create heart shape using Three.js Shape
  const heartShape = new THREE.Shape();
  heartShape.moveTo(0, 0);
  heartShape.bezierCurveTo(0, -0.3, -0.6, -0.3, -0.6, 0);
  heartShape.bezierCurveTo(-0.6, 0.3, 0, 0.6, 0, 1);
  heartShape.bezierCurveTo(0, 0.6, 0.6, 0.3, 0.6, 0);
  heartShape.bezierCurveTo(0.6, -0.3, 0, -0.3, 0, 0);

  const extrudeSettings = {
    depth: 0.2,
    bevelEnabled: true,
    bevelSegments: 2,
    steps: 2,
    bevelSize: 0.1,
    bevelThickness: 0.1,
  };

  return (
    <mesh ref={meshRef} position={position} scale={scale} rotation={[0, 0, Math.PI]}>
      <extrudeGeometry args={[heartShape, extrudeSettings]} />
      <meshStandardMaterial
        color="#f43f5e"
        transparent
        opacity={0.15}
        roughness={0.5}
        metalness={0.2}
      />
    </mesh>
  );
}

// Main component with multiple floating hearts
export function FloatingHearts3D() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />

        {/* Multiple hearts at different positions */}
        <FloatingHeart position={[-4, 2, 0]} scale={0.4} speed={0.5} />
        <FloatingHeart position={[4, -1, 0]} scale={0.3} speed={0.7} />
        <FloatingHeart position={[-3, -3, 0]} scale={0.35} speed={0.6} />
        <FloatingHeart position={[3, 3, 0]} scale={0.25} speed={0.8} />
        <FloatingHeart position={[0, 0, -2]} scale={0.3} speed={0.55} />
        <FloatingHeart position={[-5, -1, -1]} scale={0.2} speed={0.65} />
        <FloatingHeart position={[5, 1, -1]} scale={0.28} speed={0.75} />
      </Canvas>
    </div>
  );
}
