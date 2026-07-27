'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Heart, Trash2, BookOpen } from 'lucide-react';
import Navbar from '@/components/Navbar';

interface Bookmark {
  key: string; // e.g. BG1.1
  chapter: number;
  verse: number;
  sanskrit: string;
  translation: string;
}

export default function Bookmarks() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [loading, setLoading] = useState(true);

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
        <div className="min-h-[80vh] flex flex-col items-center justify-center text-center p-6 bg-slate-950 text-amber-400 font-serif space-y-4">
          <div className="w-16 h-16 rounded-full border-t-2 border-amber-500 border-r-2 border-r-transparent animate-spin" />
          <p className="text-lg tracking-widest uppercase animate-pulse">Loading Bookmarks...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-950 text-slate-100 pb-20">
        
        {/* Bookmarks Header */}
        <section className="bg-slate-900/40 border-b border-amber-900/10 py-10 px-6">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-2">
              <Link 
                href="/" 
                className="inline-flex items-center gap-2 text-slate-400 hover:text-amber-400 text-xs font-bold uppercase tracking-wider transition"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Home
              </Link>
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-amber-100">Bookmarked Verses</h1>
              <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Your saved spiritual verses</p>
            </div>

            {bookmarks.length > 0 && (
              <button 
                onClick={clearAllBookmarks}
                className="px-4 py-2 border border-rose-500/30 bg-rose-500/5 hover:bg-rose-500/20 text-rose-400 text-[10px] font-bold uppercase tracking-widest rounded-xl transition cursor-pointer self-start sm:self-center"
              >
                Clear All
              </button>
            )}
          </div>
        </section>

        {/* Bookmarks List */}
        <section className="max-w-4xl mx-auto px-6 py-12">
          
          {bookmarks.length === 0 ? (
            <div className="text-center py-20 glass-card p-8 rounded-2xl max-w-xl mx-auto space-y-6">
              <div className="mx-auto w-16 h-16 rounded-full bg-slate-900 flex items-center justify-center border border-slate-800 text-slate-500">
                <Heart className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <p className="text-lg font-serif font-bold text-amber-200">No Bookmarks Saved Yet</p>
                <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                  As you read the Bhagavad Gita, click the heart icon on any verse detail page to save it here for quick contemplation.
                </p>
              </div>
              <Link 
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-yellow-500 text-slate-950 font-bold rounded-xl text-xs uppercase tracking-wider transition cursor-pointer"
              >
                <BookOpen className="w-4 h-4" /> Explore Chapters
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {bookmarks.map((b) => (
                <div 
                  key={b.key}
                  className="glass-card p-6 rounded-2xl border border-amber-500/10 flex flex-col md:flex-row justify-between gap-6 hover:border-amber-500/30 transition duration-300"
                >
                  
                  {/* Verse info & text */}
                  <div className="space-y-4 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded-lg border border-amber-500/20">
                        BG {b.chapter}.{b.verse}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <p className="text-lg font-serif font-bold text-amber-100 shloka-sanskrit">
                        {b.sanskrit}
                      </p>
                      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                        {b.translation}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex md:flex-col justify-end items-end gap-3 shrink-0">
                    
                    {/* Read Verse button */}
                    <Link 
                      href={`/chapter/${b.chapter}/verse/${b.verse}`}
                      className="px-4 py-2 bg-slate-900 hover:bg-amber-500/10 border border-slate-800 hover:border-amber-500/30 text-amber-400 hover:text-amber-300 text-[10px] font-bold uppercase tracking-widest rounded-xl transition cursor-pointer"
                    >
                      Read Verse
                    </Link>

                    {/* Delete button */}
                    <button 
                      onClick={() => removeBookmark(b.key)}
                      title="Remove Bookmark"
                      className="p-2 border border-slate-800 hover:border-rose-500/40 bg-slate-900 hover:bg-rose-500/10 text-slate-500 hover:text-rose-400 rounded-xl transition cursor-pointer"
                    >
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
