import React from 'react';
import Image from 'next/image';

interface ButterflyProps {
  top: string;
  left?: string;
  right?: string;
  animationDelay?: string;
  scale?: number;
}

export default function Butterfly({
  top,
  left,
  right,
  animationDelay = '0s',
  scale = 1,
}: ButterflyProps) {
  // Styles for the container (handles floating)
  const containerStyle: React.CSSProperties = {
    position: 'absolute',
    top,
    ...(left ? { left } : {}),
    ...(right ? { right } : {}),
    transform: `scale(${scale})`,
    animation: `floatButterfly 6s ease-in-out infinite`,
    animationDelay,
    zIndex: 30,
    pointerEvents: 'none',
    width: '40px',
    height: '40px',
  };

  // Base style for the wings, using the real butterfly image
  const wingStyle: React.CSSProperties = {
    position: 'absolute',
    top: '0',
    width: '100%',
    height: '100%',
    backgroundImage: 'url("/images/real_butterfly.png")',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    opacity: 0.9,
  };

  const leftWingStyle: React.CSSProperties = {
    ...wingStyle,
    left: '0',
    transformOrigin: 'right center',
    animation: `flutterWingLeft 0.12s infinite alternate`,
    clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)', // Cut the left half
  };

  const rightWingStyle: React.CSSProperties = {
    ...wingStyle,
    left: '0',
    transformOrigin: 'left center',
    animation: `flutterWingRight 0.12s infinite alternate`,
    clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)', // Cut the right half
  };

  return (
    <div style={containerStyle}>
      {/* 3D Container */}
      <div style={{ position: 'relative', width: '100%', height: '100%', perspective: '400px' }}>
        {/* Left Wing */}
        <div style={leftWingStyle} />
        {/* Right Wing */}
        <div style={rightWingStyle} />
      </div>
    </div>
  );
}
