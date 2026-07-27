'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SplashPage() {
  const router = useRouter();
  const [isFading, setIsFading] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  const handleEnterPortal = () => {
    setIsFading(true);
    setTimeout(() => {
      router.push('/home');
    }, 700);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        background: '#020617',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '1.5rem',
        opacity: isFading ? 0 : 1,
        transform: isFading ? 'scale(0.97)' : 'scale(1)',
        transition: 'opacity 0.7s ease, transform 0.7s ease',
        pointerEvents: isFading ? 'none' : 'all',
        overflow: 'hidden',
      }}
    >
      {/* Animated Background Video — fades in once loaded */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute z-0 rotated-splash-video"
        style={{
          filter: 'brightness(1.4) saturate(1.2)',
          opacity: videoReady ? 1 : 0,
          transition: 'opacity 1.5s ease',
        }}
        onCanPlay={() => setVideoReady(true)}
      >
        <source src="https://v1.pinimg.com/videos/iht/expMp4/9a/a2/bb/9aa2bb472348ce7f4ac3e63659f9b866_720w.mp4" type="video/mp4" />
      </video>

      {/* Dark Gradient Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(2,6,23,0.85) 0%, rgba(2,6,23,0.35) 50%, transparent 100%)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* Main Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2rem',
          maxWidth: '36rem',
        }}
      >
        {/* Glowing Om Symbol */}
        <div
          style={{
            width: '7rem',
            height: '7rem',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(245,158,11,0.25) 0%, rgba(234,179,8,0.08) 70%)',
            border: '1.5px solid rgba(245,158,11,0.45)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 60px rgba(245,158,11,0.25), 0 0 120px rgba(245,158,11,0.1)',
            animation: 'omPulse 2.5s ease-in-out infinite',
          }}
        >
          <span
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: '3.5rem',
              color: '#fef3c7',
              textShadow: '0 0 20px rgba(245,158,11,0.8), 0 0 40px rgba(245,158,11,0.4)',
            }}
          >
            ॐ
          </span>
        </div>

        {/* Title */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <h1
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: 'clamp(2.5rem, 6vw, 4rem)',
              fontWeight: 800,
              color: '#fef3c7',
              textShadow: '0 0 30px rgba(245,158,11,0.5)',
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            श्रीमद्भगवद्गीता
          </h1>
          <p
            style={{
              fontFamily: 'monospace',
              fontSize: '0.8rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: '#f59e0b',
              fontWeight: 600,
              margin: 0,
            }}
          >
            AI Spiritual Portal
          </p>
        </div>

        {/* Enter Button */}
        <button
          onClick={handleEnterPortal}
          style={{
            padding: '1rem 2.5rem',
            background: 'linear-gradient(135deg, #d97706 0%, #f59e0b 50%, #eab308 100%)',
            color: '#020617',
            fontWeight: 800,
            borderRadius: '0.875rem',
            fontSize: '0.9rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            border: 'none',
            boxShadow: '0 0 40px rgba(245,158,11,0.4), 0 4px 20px rgba(0,0,0,0.4)',
            transition: 'all 0.25s ease',
            position: 'relative',
            zIndex: 20,
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'scale(1.06)';
            e.currentTarget.style.boxShadow = '0 0 60px rgba(245,158,11,0.6), 0 8px 30px rgba(0,0,0,0.5)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 0 40px rgba(245,158,11,0.4), 0 4px 20px rgba(0,0,0,0.4)';
          }}
          onMouseDown={e => {
            e.currentTarget.style.transform = 'scale(0.96)';
          }}
          onMouseUp={e => {
            e.currentTarget.style.transform = 'scale(1.06)';
          }}
        >
          प्रवेश करें | Enter Portal
        </button>
      </div>

      <style>{`
        @keyframes omPulse {
          0%, 100% { box-shadow: 0 0 60px rgba(245,158,11,0.25), 0 0 120px rgba(245,158,11,0.1); }
          50% { box-shadow: 0 0 80px rgba(245,158,11,0.45), 0 0 150px rgba(245,158,11,0.2); }
        }
      `}</style>
    </div>
  );
}