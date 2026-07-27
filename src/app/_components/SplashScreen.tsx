'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function SplashScreen() {
  const router = useRouter();
  const [isFading, setIsFading] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [videoError, setVideoError] = useState(false);
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
        background: '#020617',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center',
        padding: 'clamp(1rem, 4vw, 2rem)',
        opacity: isFading ? 0 : mounted ? 1 : 0,
        transform: isFading ? 'scale(0.97)' : mounted ? 'scale(1)' : 'scale(1.02)',
        transition: 'opacity 0.7s ease, transform 0.7s ease',
        pointerEvents: isFading ? 'none' : 'all',
        overflow: 'hidden',
      }}
    >
      {/* ── CSS gradient fallback bg ── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        background: videoError
          ? 'radial-gradient(ellipse at 30% 20%, #1a0a00 0%, #020617 40%, #0d0510 70%, #020617 100%)'
          : '#020617',
        animation: videoError ? 'bgShift 8s ease-in-out infinite alternate' : 'none',
      }} />

      {/* ── Video background ── */}
      {!videoError && (
        <video autoPlay loop muted playsInline preload="auto"
          className="video-upright-fixed"
          style={{ filter: 'brightness(1.35) saturate(1.15)', opacity: videoReady ? 1 : 0, transition: 'opacity 1.5s ease' }}
          onCanPlay={() => setVideoReady(true)}
          onError={() => setVideoError(true)}
        >
          <source src="/videos/splash_bg.mp4" type="video/mp4" />
          <source src="https://v1.pinimg.com/videos/iht/expMp4/9a/a2/bb/9aa2bb472348ce7f4ac3e63659f9b866_720w.mp4" type="video/mp4" />
        </video>
      )}

      {/* ── Gradient overlay ── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: 'linear-gradient(to top, rgba(2,6,23,0.92) 0%, rgba(2,6,23,0.45) 50%, rgba(2,6,23,0.18) 100%)',
      }} />

      {/* ── Floating particles ── */}
      {[...Array(6)].map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: `${4 + i * 2}px`, height: `${4 + i * 2}px`,
          borderRadius: '50%',
          background: `rgba(245,158,11,${0.15 + i * 0.05})`,
          left: `${10 + i * 15}%`, top: `${20 + (i % 3) * 20}%`,
          animation: `floatParticles ${3 + i}s ease-in-out infinite`,
          animationDelay: `${i * 0.4}s`, zIndex: 2,
        }} />
      ))}

      {/* ── Main Content ── */}
      <div style={{
        position: 'relative', zIndex: 10,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        gap: 'clamp(1.2rem, 3vw, 2rem)',
        width: '100%', maxWidth: 'clamp(280px, 90vw, 540px)',
        padding: '0 1rem',
      }}>

        {/* Om Symbol */}
        <div style={{
          width: 'clamp(5rem, 14vw, 8rem)', height: 'clamp(5rem, 14vw, 8rem)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(245,158,11,0.3) 0%, rgba(234,179,8,0.1) 60%, transparent 80%)',
          border: '1.5px solid rgba(245,158,11,0.5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 0 60px rgba(245,158,11,0.3), 0 0 120px rgba(245,158,11,0.15)',
          animation: 'omPulse 2.5s ease-in-out infinite',
          flexShrink: 0,
        }}>
          <span style={{
            fontFamily: 'Georgia, serif',
            fontSize: 'clamp(2rem, 8vw, 3.8rem)',
            color: '#fef3c7',
            textShadow: '0 0 20px rgba(245,158,11,0.9), 0 0 50px rgba(245,158,11,0.5)',
            lineHeight: 1, userSelect: 'none',
          }}>ॐ</span>
        </div>

        {/* Title Block */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center', width: '100%' }}>
          <h1 style={{
            fontFamily: 'Georgia, serif',
            fontSize: 'clamp(1.8rem, 7vw, 4.2rem)',
            fontWeight: 800, color: '#fef3c7',
            textShadow: '0 0 30px rgba(245,158,11,0.6), 0 0 70px rgba(245,158,11,0.25)',
            lineHeight: 1.1, margin: 0, letterSpacing: '0.02em',
            wordBreak: 'break-word',
          }}>
            श्रीमद्भगवद्गीता
          </h1>



          <p style={{
            color: 'rgba(248,250,252,0.6)',
            fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
            fontFamily: 'Georgia, serif', fontStyle: 'italic',
            margin: '0.25rem 0 0', maxWidth: '28rem',
            lineHeight: 1.6, padding: '0 0.5rem',
          }}>
            "The soul is never born nor dies at any time..."
          </p>
        </div>

        {/* Enter Portal Button */}
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

        <p style={{
          color: 'rgba(245,158,11,0.45)',
          fontSize: 'clamp(0.6rem, 1.5vw, 0.7rem)',
          fontFamily: 'monospace', letterSpacing: '0.1em',
          margin: '-0.5rem 0 0',
        }}>
          18 Chapters · 700 Verses · Timeless Wisdom
        </p>
      </div>

      <style>{`
        @keyframes omPulse {
          0%, 100% { box-shadow: 0 0 60px rgba(245,158,11,0.3), 0 0 120px rgba(245,158,11,0.15); transform: scale(1); }
          50%       { box-shadow: 0 0 90px rgba(245,158,11,0.55), 0 0 160px rgba(245,158,11,0.25); transform: scale(1.03); }
        }
        @keyframes floatParticles {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
          50%       { transform: translateY(-25px) translateX(12px); opacity: 0.7; }
        }
        @keyframes bgShift {
          0%   { background: radial-gradient(ellipse at 20% 30%, #1a0800 0%, #020617 50%, #0a0312 100%); }
          50%  { background: radial-gradient(ellipse at 70% 20%, #0d0500 0%, #020617 50%, #080215 100%); }
          100% { background: radial-gradient(ellipse at 20% 30%, #1a0800 0%, #020617 50%, #0a0312 100%); }
        }
        @media (max-width: 380px) {
          #enter-portal-btn { font-size: 0.7rem !important; padding: 0.75rem 1.25rem !important; }
        }
      `}</style>
    </div>
  );
}
