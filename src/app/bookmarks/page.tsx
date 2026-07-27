'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Heart, Trash2, BookOpen } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { useLanguage } from '@/context/LanguageContext';

interface Bookmark {
  key: string;
  chapter: number;
  verse: number;
  sanskrit: string;
  translation: string;
}

export default function Bookmarks() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('gita_bookmarks') || '[]');
    setBookmarks(saved);
    setLoading(false);
  }, []);

  const removeBookmark = (key: string) => {
    const updated = bookmarks.filter((b) => b.key !== key);
    localStorage.setItem('gita_bookmarks', JSON.stringify(updated));
    setBookmarks(updated);
  };

  const clearAllBookmarks = () => {
    if (confirm('Are you sure you want to clear all bookmarked verses?')) {
      localStorage.removeItem('gita_bookmarks');
      setBookmarks([]);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-[80vh] flex flex-col items-center justify-center text-center p-6 font-serif space-y-4"
          style={{ background: 'var(--bg-primary)', color: 'var(--gold-primary)' }}>
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-t-2 border-amber-500 border-r-2 border-r-transparent animate-spin" />
          <p className="text-base sm:text-lg tracking-widest uppercase animate-pulse">{t.bm_loading}</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen pb-16 sm:pb-20" style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>

        {/* ── Header ── */}
        <section className="border-b" style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-primary)' }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <Link href="/home"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider transition"
                style={{ color: 'var(--text-secondary)' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold-primary)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}>
                <ArrowLeft className="w-4 h-4" /> {t.bm_back}
              </Link>
              <h1 className="font-serif font-bold" style={{ fontSize: 'clamp(1.6rem, 5vw, 2.5rem)', color: 'var(--text-accent)' }}>
                {t.bm_title}
              </h1>
              <p className="text-[10px] font-mono uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
                {t.bm_subtitle}
              </p>
            </div>

            {bookmarks.length > 0 && (
              <button onClick={clearAllBookmarks}
                className="px-4 py-2 border border-rose-500/30 bg-rose-500/5 hover:bg-rose-500/20 text-rose-400 text-[10px] font-bold uppercase tracking-widest rounded-xl transition cursor-pointer self-start sm:self-center whitespace-nowrap">
                {t.bm_clear_all}
              </button>
            )}
          </div>
        </section>

        {/* ── Bookmarks List ── */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          {bookmarks.length === 0 ? (
            <div className="text-center glass-card rounded-2xl max-w-md mx-auto space-y-5"
              style={{ padding: 'clamp(2rem, 6vw, 3rem)' }}>
              <div className="mx-auto w-14 h-14 rounded-full flex items-center justify-center border"
                style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-secondary)', color: 'var(--text-muted)' }}>
                <Heart className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <p className="text-base sm:text-lg font-serif font-bold" style={{ color: 'var(--text-accent)' }}>
                  {t.bm_empty_title}
                </p>
                <p className="text-xs leading-relaxed max-w-xs mx-auto" style={{ color: 'var(--text-secondary)' }}>
                  {t.bm_empty_desc}
                </p>
              </div>
              <Link href="/home"
                className="inline-flex items-center gap-2 font-bold rounded-xl text-xs uppercase tracking-wider transition cursor-pointer"
                style={{
                  padding: '0.75rem 1.5rem',
                  background: 'linear-gradient(135deg, #d97706, #f59e0b)',
                  color: '#020617',
                }}>
                <BookOpen className="w-4 h-4" /> {t.bm_explore}
              </Link>
            </div>
          ) : (
            <div className="space-y-4 sm:space-y-6">
              {bookmarks.map((b) => (
                <div key={b.key}
                  className="glass-card rounded-2xl flex flex-col sm:flex-row justify-between gap-4 sm:gap-6 transition duration-300"
                  style={{ padding: 'clamp(1rem, 3vw, 1.5rem)', border: '1px solid var(--border-primary)' }}>

                  {/* Verse info */}
                  <div className="space-y-3 flex-1 min-w-0">
                    <span className="inline-block text-[10px] font-mono font-bold tracking-widest px-3 py-1 rounded-lg border"
                      style={{ color: 'var(--gold-primary)', background: 'rgba(245,158,11,0.08)', borderColor: 'var(--border-primary)' }}>
                      BG {b.chapter}.{b.verse}
                    </span>
                    <div className="space-y-1.5">
                      <p className="font-serif font-bold shloka-sanskrit" style={{ fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)', color: 'var(--text-accent)' }}>
                        {b.sanskrit}
                      </p>
                      <p className="text-xs line-clamp-2 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                        {b.translation}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex sm:flex-col justify-start sm:justify-center items-start sm:items-end gap-2 shrink-0">
                    <Link href={`/chapter/${b.chapter}/verse/${b.verse}`}
                      className="px-3 sm:px-4 py-2 text-[10px] font-bold uppercase tracking-widest rounded-xl transition cursor-pointer whitespace-nowrap border"
                      style={{
                        background: 'var(--bg-secondary)', color: 'var(--gold-primary)',
                        borderColor: 'var(--border-secondary)',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--gold-primary)'; e.currentTarget.style.background = 'rgba(245,158,11,0.08)'; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-secondary)'; e.currentTarget.style.background = 'var(--bg-secondary)'; }}>
                      {t.bm_read_verse}
                    </Link>
                    <button onClick={() => removeBookmark(b.key)} title="Remove Bookmark"
                      className="p-2 border rounded-xl transition cursor-pointer"
                      style={{ background: 'var(--bg-secondary)', color: 'var(--text-muted)', borderColor: 'var(--border-secondary)' }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(244,63,94,0.4)'; e.currentTarget.style.color = 'rgb(251,113,133)'; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-secondary)'; e.currentTarget.style.color = 'var(--text-muted)'; }}>
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  );
}
