'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';

export default function ChapterError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <>
      <Navbar />
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center p-6 bg-slate-950 space-y-6">
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
          <span className="font-serif text-4xl text-amber-100">ॐ</span>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-serif font-bold text-amber-200">Chapter Could Not Be Loaded</h2>
          <p className="text-xs font-mono text-amber-500/70 max-w-sm">
            {error.message || 'Failed to fetch chapter data. Please check your connection and try again.'}
          </p>
        </div>

        <div className="flex flex-wrap gap-3 justify-center">
          <button
            onClick={reset}
            className="px-6 py-2.5 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-yellow-500 text-slate-950 font-bold rounded-xl text-xs uppercase tracking-widest transition cursor-pointer"
          >
            Retry
          </button>
          <Link
            href="/home"
            className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-amber-400 border border-amber-500/30 font-bold rounded-xl text-xs uppercase tracking-widest transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </>
  );
}
