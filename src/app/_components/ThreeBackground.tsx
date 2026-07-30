'use client';

import { useRef, useMemo, Suspense, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function CosmicGalaxy({ count = 6000 }) {
  const mesh = useRef<THREE.Points>(null);

  const [positions, colors, sizes] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    const colorInside = new THREE.Color('#FF8C00'); // Divine Orange/Gold
    const colorOutside = new THREE.Color('#38bdf8'); // Cosmic Blue

    for (let i = 0; i < count; i++) {
      // Create a spiral galaxy shape
      const radius = Math.random() * 20;
      const spinAngle = radius * 0.4;
      const branchAngle = ((i % 4) / 4) * Math.PI * 2; // 4 spiral branches

      const randomX = Math.pow(Math.random(), 2) * (Math.random() < 0.5 ? 1 : -1) * 2;
      const randomY = Math.pow(Math.random(), 2) * (Math.random() < 0.5 ? 1 : -1) * 2;
      const randomZ = Math.pow(Math.random(), 2) * (Math.random() < 0.5 ? 1 : -1) * 2;

      positions[i * 3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
      positions[i * 3 + 1] = randomY;
      positions[i * 3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

      // Color mixing based on distance from center
      const mixedColor = colorInside.clone().lerp(colorOutside, radius / 20);
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;

      sizes[i] = Math.random() * 0.15;
    }
    return [positions, colors, sizes];
  }, [count]);

  useFrame((state, delta) => {
    if (!mesh.current) return;

    // Slow, majestic rotation of the galaxy
    mesh.current.rotation.y += delta * 0.08;
    mesh.current.rotation.x = 0.5; // Tilt the galaxy
    mesh.current.rotation.z = -0.1;

    // Slight bobbing effect
    mesh.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.5;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} args={[colors, 3]} />
        <bufferAttribute attach="attributes-size" count={count} array={sizes} itemSize={1} args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        vertexColors
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}

export default function ThreeBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      zIndex: 1,
      pointerEvents: 'none',
      overflow: 'hidden',
      mixBlendMode: 'screen' // Helps it blend nicely with the smoke
    }}>
      <Canvas camera={{ position: [0, 0, 15], fov: 60 }} style={{ position: 'relative', width: '100%', height: '100%' }}>
        <ambientLight intensity={0.5} />
        <Suspense fallback={null}>
          <CosmicGalaxy count={8000} />
        </Suspense>
      </Canvas>
    </div>
  );
}
