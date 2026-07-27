// Global loading fallback for all routes
export default function Loading() {
  return (
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
        zIndex: 9999,
      }}
    >
      {/* Om Symbol */}
      <div
        style={{
          width: '5rem',
          height: '5rem',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(245,158,11,0.2) 0%, transparent 70%)',
          border: '1.5px solid rgba(245,158,11,0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 40px rgba(245,158,11,0.2)',
          animation: 'spin 2s linear infinite',
        }}
      >
        <span
          style={{
            fontFamily: 'Georgia, serif',
            fontSize: '2.5rem',
            color: '#fef3c7',
            textShadow: '0 0 15px rgba(245,158,11,0.8)',
          }}
        >
          ॐ
        </span>
      </div>

      <p
        style={{
          fontFamily: 'monospace',
          fontSize: '0.7rem',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: '#f59e0b',
          opacity: 0.8,
        }}
      >
        Loading Divine Wisdom...
      </p>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); box-shadow: 0 0 40px rgba(245,158,11,0.2); }
          50% { box-shadow: 0 0 70px rgba(245,158,11,0.45); }
          100% { transform: rotate(360deg); box-shadow: 0 0 40px rgba(245,158,11,0.2); }
        }
      `}</style>
    </div>
  );
}
