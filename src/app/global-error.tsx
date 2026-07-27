'use client';

import Link from 'next/link';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body style={{ background: '#020617', margin: 0 }}>
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: '#020617',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.5rem',
            padding: '2rem',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              width: '5rem',
              height: '5rem',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(245,158,11,0.15) 0%, transparent 70%)',
              border: '1.5px solid rgba(245,158,11,0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span style={{ fontFamily: 'Georgia, serif', fontSize: '2.5rem', color: '#fef3c7' }}>
              ॐ
            </span>
          </div>

          <div style={{ color: '#fef3c7', fontFamily: 'Georgia, serif' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '0 0 0.5rem' }}>
              A Moment of Stillness
            </h2>
            <p style={{ color: '#f59e0b', fontSize: '0.8rem', fontFamily: 'monospace', letterSpacing: '0.1em', margin: '0 0 1rem' }}>
              {error.message || 'Something went unexpectedly wrong'}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button
              onClick={reset}
              style={{
                padding: '0.75rem 1.75rem',
                background: 'linear-gradient(135deg, #d97706, #f59e0b)',
                color: '#020617',
                fontWeight: 700,
                borderRadius: '0.75rem',
                border: 'none',
                cursor: 'pointer',
                fontSize: '0.75rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              Try Again
            </button>
            <a
              href="/home"
              style={{
                padding: '0.75rem 1.75rem',
                background: 'transparent',
                color: '#f59e0b',
                fontWeight: 700,
                borderRadius: '0.75rem',
                border: '1px solid rgba(245,158,11,0.4)',
                cursor: 'pointer',
                fontSize: '0.75rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                textDecoration: 'none',
              }}
            >
              Return Home
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
