'use client';

import { useRef, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Text, Image as DreiImage } from '@react-three/drei';
import * as THREE from 'three';
import { chapters } from '@/lib/constants';
import { useRouter } from 'next/navigation';

export default function ChapterGallery3D() {
  const router = useRouter();
  const groupRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  const scrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      scrollY.current = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initialize on mount
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const radius = viewport.width < 10 ? 3 : 6; 
  const totalDepth = chapters.length * 5; // Spacing between chapters

  useFrame(() => {
    if (groupRef.current) {
      // Calculate scroll progress (0 to 1 approx based on typical page height)
      // The spacer is 300vh, plus 200vh for the sections = 500vh total height
      const maxScroll = window.innerHeight * 4; 
      const progress = Math.min(Math.max(scrollY.current / maxScroll, 0), 1);
      
      const targetZ = -20 + progress * (totalDepth + 30);
      
      // Smooth interpolation for premium feel
      groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetZ, 0.05);
    }
  });

  return (
    <group ref={groupRef} position={[0, -1, -20]}>
      {chapters.map((ch, i) => {
        const z = -i * 5; // Deep into the screen
        // Alternate left and right
        const isLeft = i % 2 === 0;
        const x = isLeft ? -radius : radius;
        const y = Math.sin(i * 0.8) * 2; // Slight vertical wave

        return (
          <ChapterCard
            key={ch.id}
            chapter={ch}
            position={[x, y, z]}
            onClick={() => router.push(`/chapter/${ch.chapter_number}`)}
          />
        );
      })}
    </group>
  );
}

function ChapterCard({ chapter, position, onClick }: { chapter: any, position: [number, number, number], onClick: () => void }) {
  const ref = useRef<THREE.Group>(null);
  const hovered = useRef(false);

  useFrame((state) => {
    if (ref.current) {
      // Gentle floating animation
      ref.current.position.y += Math.sin(state.clock.elapsedTime * 2 + chapter.id) * 0.005;
      
      // Scale and rotate slightly on hover for premium feel
      const targetScale = hovered.current ? 1.15 : 1;
      const targetRotY = hovered.current ? (position[0] < 0 ? 0.1 : -0.1) : 0;
      
      ref.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
      ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, targetRotY, 0.1);
    }
  });

  return (
    <group 
      ref={ref} 
      position={position}
      onPointerOver={() => { hovered.current = true; document.body.style.cursor = 'pointer'; }}
      onPointerOut={() => { hovered.current = false; document.body.style.cursor = 'auto'; }}
      onClick={onClick}
    >
      <DreiImage url={chapter.image} transparent opacity={0.85} scale={[5, 3]} />
      
      <Text
        position={[0, -1.8, 0.1]}
        fontSize={0.4}
        color="#fbbf24" // gold-primary
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.03}
        outlineColor="#000000"
      >
        {`Ch. ${chapter.chapter_number} - ${chapter.sanskritName}`}
      </Text>
      
      <Text
        position={[0, -2.3, 0.1]}
        fontSize={0.18}
        color="#cbd5e1"
        maxWidth={4.5}
        textAlign="center"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.015}
        outlineColor="#000000"
      >
        {chapter.summary}
      </Text>
    </group>
  );
}
