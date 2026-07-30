'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function SplashScreen() {
  const router = useRouter();
  const [isFading, setIsFading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  const handleEnterPortal = () => {
    setIsFading(true);
    setTimeout(() => router.push('/home'), 700);
  };

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 100,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center',
        overflow: 'hidden',
        opacity: isFading ? 0 : mounted ? 1 : 0,
        transform: isFading ? 'scale(0.97)' : mounted ? 'scale(1)' : 'scale(1.02)',
        transition: 'opacity 0.7s ease, transform 0.7s ease',
        pointerEvents: isFading ? 'none' : 'all',
      }}
    >
      {/* ── Background Video ── */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '100vh',
          height: '100vw',
          transform: 'translate(-50%, -50%) rotate(-90deg)',
          objectFit: 'cover',
          zIndex: 0
        }}
      >
        <source src="/videos/splash_bg.mp4" type="video/mp4" />
      </video>

      {/* ── Dark Gradient Overlay ── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: 'linear-gradient(to bottom, rgba(5,3,1,0.55) 0%, rgba(6,4,1,0.35) 35%, rgba(5,3,1,0.60) 65%, rgba(3,2,0,0.90) 100%)',
      }} />

      {/* ── Main Content ── */}
      <div style={{
        position: 'relative', zIndex: 10,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        gap: '0',
        width: '100%',
        padding: '0 1.5rem',
        maxWidth: '800px',
      }}>

        {/* Eyebrow Label */}
        <p style={{
          fontFamily: '"Courier New", Courier, monospace',
          fontSize: 'clamp(0.55rem, 1.3vw, 0.72rem)',
          fontWeight: 500,
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
          color: 'rgba(210,165,90,0.75)',
          marginBottom: 'clamp(1rem, 2.5vw, 1.8rem)',
          marginTop: 0,
          animation: 'fadeSlideUp 1s ease 0.1s both',
        }}>
          Eternal Edition · Kurukshetra
        </p>

        {/* Big Title — "Bhagavad" + "Gita" */}
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          gap: '0',
          marginBottom: 'clamp(1rem, 2.5vw, 1.8rem)',
          animation: 'fadeSlideUp 1s ease 0.25s both',
        }}>
          <h1 style={{
            fontFamily: '"Georgia", "Times New Roman", serif',
            fontSize: 'clamp(3.5rem, 10vw, 7.5rem)',
            fontWeight: 700,
            color: '#f5f0e8',
            lineHeight: 0.92,
            margin: 0,
            letterSpacing: '-0.01em',
            textShadow: '0 2px 40px rgba(0,0,0,0.9)',
          }}>
            Bhagavad
          </h1>
          <span style={{
            fontFamily: '"Georgia", "Times New Roman", serif',
            fontSize: 'clamp(2.8rem, 8vw, 6rem)',
            fontWeight: 400,
            fontStyle: 'italic',
            color: '#c8853a',
            lineHeight: 1,
            letterSpacing: '0.01em',
            textShadow: '0 2px 30px rgba(180,100,30,0.6)',
          }}>
            Gita
          </span>
        </div>

        {/* Subtitle */}
        <p style={{
          fontFamily: '"Georgia", serif',
          fontSize: 'clamp(0.72rem, 1.7vw, 0.95rem)',
          fontWeight: 400,
          color: 'rgba(235,218,190,0.75)',
          maxWidth: '480px',
          lineHeight: 1.75,
          margin: '0 auto',
          marginBottom: 'clamp(1.8rem, 4vw, 3rem)',
          animation: 'fadeSlideUp 1s ease 0.4s both',
        }}>
          700 verses spoken between two armies. A conversation about duty, fear and the self — rendered for the way you read today.
        </p>

        {/* ── Enter Portal Button (unchanged) ── */}
        <div style={{ animation: 'fadeSlideUp 1s ease 0.55s both' }}>
          <button
            id="enter-portal-btn"
            onClick={handleEnterPortal}
            style={{
              padding: 'clamp(0.75rem, 2vw, 1rem) clamp(1.5rem, 5vw, 2.75rem)',
              background: 'linear-gradient(135deg, #d97706 0%, #f59e0b 50%, #eab308 100%)',
              color: '#020617', fontWeight: 800,
              borderRadius: '0.875rem',
              fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
              letterSpacing: '0.12em', textTransform: 'uppercase',
              cursor: 'pointer', border: 'none',
              boxShadow: '0 0 40px rgba(245,158,11,0.45), 0 4px 24px rgba(0,0,0,0.45)',
              transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
              position: 'relative', zIndex: 20, outline: 'none',
              whiteSpace: 'nowrap',
              touchAction: 'manipulation',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'scale(1.06) translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 0 70px rgba(245,158,11,0.65), 0 10px 35px rgba(0,0,0,0.5)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'scale(1) translateY(0)';
              e.currentTarget.style.boxShadow = '0 0 40px rgba(245,158,11,0.45), 0 4px 24px rgba(0,0,0,0.45)';
            }}
            onTouchStart={e => { e.currentTarget.style.transform = 'scale(0.97)'; }}
            onTouchEnd={e => { e.currentTarget.style.transform = 'scale(1)'; }}
          >
            प्रवेश करें &nbsp;|&nbsp; Enter Portal
          </button>
        </div>

        {/* Footer hint */}
        <p style={{
          color: 'rgba(210,165,70,0.45)',
          fontSize: 'clamp(0.55rem, 1.3vw, 0.68rem)',
          fontFamily: 'monospace', letterSpacing: '0.12em',
          marginTop: 'clamp(1rem, 2.5vw, 1.5rem)',
          animation: 'fadeSlideUp 1s ease 0.65s both',
        }}>
          18 Chapters · 700 Verses · Timeless Wisdom
        </p>
      </div>

      <style>{`
        @keyframes slowZoom {
          from { transform: scale(1); }
          to { transform: scale(1.15); }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 380px) {
          #enter-portal-btn { font-size: 0.7rem !important; padding: 0.75rem 1.25rem !important; }
        }
      `}</style>
    </div>
  );
}
