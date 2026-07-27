'use client';

import React, { useEffect, useState, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, BookOpen, Sparkles } from 'lucide-react';
import Navbar from '@/components/Navbar';

interface ChapterData {
  chapter_number: number;
  verses_count: number;
  name: string;
  translation: string;
  transliteration: string;
  meaning: {
    en: string;
    hi: string;
  };
  summary: {
    en: string;
    hi: string;
  };
}

const getChapterImage = (id: number) => {
  const images = [
    '/images/hero_banner_background.png', // Chariot
    '/images/cosmic_form.png',            // Cosmic
    '/images/peaceful_meditation.png',    // Meditation
    '/images/krishna_flute.png',          // Flute
  ];
  if (id === 1 || id === 18) return images[0];
  if (id === 2 || id === 7 || id === 11) return images[1];
  if (id === 3 || id === 5 || id === 6 || id === 13 || id === 14 || id === 17) return images[2];
  if (id === 4 || id === 10 || id === 12 || id === 15) return images[3];
  return '/images/divine_entrance.png';
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ChapterDetail({ params }: PageProps) {
  const resolvedParams = use(params);
  const chapterId = Number(resolvedParams.id) || 1;

  const [chapter, setChapter] = useState<ChapterData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'english' | 'hindi'>('english');

  useEffect(() => {
    setLoading(true);
    fetch(`https://vedicscriptures.github.io/chapter/${chapterId}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch chapter data');
        return res.json();
      })
      .then((data) => {
        setChapter(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, [chapterId]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-[80vh] flex flex-col items-center justify-center text-center p-6 bg-slate-950 text-amber-400 font-serif space-y-4">
          <div className="w-16 h-16 rounded-full border-t-2 border-amber-500 border-r-2 border-r-transparent animate-spin" />
          <p className="text-lg tracking-widest uppercase animate-pulse">Loading Divine Chapter...</p>
        </div>
      </>
    );
  }

  if (error || !chapter) {
    return (
      <>
        <Navbar />
        <div className="min-h-[80vh] flex flex-col items-center justify-center text-center p-6 bg-slate-950 text-amber-500 font-serif space-y-4">
          <p className="text-xl">Error: {error || 'Chapter not found'}</p>
          <Link href="/" className="px-6 py-2.5 bg-amber-500 text-slate-950 font-bold rounded-xl text-xs uppercase tracking-widest transition hover:bg-amber-400">
            Back to Home
          </Link>
        </div>
      </>
    );
  }

  const bgImage = getChapterImage(chapterId);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-950 text-slate-100 pb-20">
        
        {/* Chapter Header Banner */}
        <section className="relative h-[45vh] flex items-end justify-center overflow-hidden border-b border-amber-900/30">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent z-10" />
          
          <Image 
            src={bgImage} 
            alt={chapter.translation} 
            fill 
            priority
            className="object-cover opacity-40 mix-blend-luminosity" 
          />
          
          <div className="relative z-20 text-center max-w-4xl px-6 pb-12 space-y-3">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-amber-500 hover:text-amber-400 text-xs font-bold uppercase tracking-wider transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
            </Link>
            
            <div className="pt-2">
              <span className="text-[10px] font-mono font-bold tracking-widest text-amber-400 bg-amber-500/10 px-4 py-1.5 rounded-full border border-amber-500/20 uppercase">
                Chapter {chapter.chapter_number}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-serif font-extrabold text-amber-100 text-glow-gold pt-2">
              {chapter.name}
            </h1>
            <p className="text-sm md:text-base text-amber-400 font-bold tracking-wide">
              {chapter.transliteration} • {chapter.translation}
            </p>
          </div>
        </section>

        {/* Chapter Details & Verses */}
        <section className="max-w-4xl mx-auto px-6 py-12 space-y-12">
          
          {/* Chapter Summary Card */}
          <div className="glass-card p-6 md:p-8 rounded-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-900/80 pb-4">
              <span className="text-xs font-mono uppercase tracking-widest text-amber-500 font-bold flex items-center gap-2">
                <BookOpen className="w-4 h-4" /> Chapter Summary
              </span>
              
              <div className="flex gap-4">
                <button 
                  onClick={() => setActiveTab('english')} 
                  className={`text-xs font-bold uppercase tracking-wider pb-1 transition cursor-pointer ${activeTab === 'english' ? 'border-b-2 border-amber-500 text-amber-400' : 'text-slate-500 hover:text-slate-400'}`}
                >
                  English
                </button>
                <button 
                  onClick={() => setActiveTab('hindi')} 
                  className={`text-xs font-bold uppercase tracking-wider pb-1 transition cursor-pointer ${activeTab === 'hindi' ? 'border-b-2 border-amber-500 text-amber-400' : 'text-slate-500 hover:text-slate-400'}`}
                >
                  Hindi
                </button>
              </div>
            </div>

            <div className="space-y-4 leading-relaxed text-sm md:text-base text-slate-300">
              <p className="font-serif italic text-amber-100 text-base md:text-lg border-l-2 border-amber-500/40 pl-4 py-1">
                Meaning: {activeTab === 'english' ? chapter.meaning.en : chapter.meaning.hi}
              </p>
              <p className="whitespace-pre-line text-xs md:text-sm text-slate-400 pt-2 leading-relaxed">
                {activeTab === 'english' ? chapter.summary.en : chapter.summary.hi}
              </p>
            </div>
          </div>

          {/* Verses Selection Grid */}
          <div className="space-y-6">
            <div className="border-b border-amber-900/20 pb-4">
              <h2 className="text-2xl font-serif font-bold text-amber-200">Select a Verse</h2>
              <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mt-1">
                Choose from the {chapter.verses_count} verses of Chapter {chapter.chapter_number}
              </p>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3">
              {Array.from({ length: chapter.verses_count }, (_, index) => {
                const verseNum = index + 1;
                return (
                  <Link 
                    href={`/chapter/${chapter.chapter_number}/verse/${verseNum}`}
                    key={verseNum}
                    className="aspect-square flex flex-col items-center justify-center rounded-xl bg-slate-900/60 hover:bg-amber-500/10 border border-slate-800 hover:border-amber-500/40 text-slate-300 hover:text-amber-300 text-sm font-semibold transition cursor-pointer shadow-md"
                  >
                    <span className="text-[10px] text-slate-500 font-mono leading-none mb-1">V</span>
                    <span className="leading-none">{verseNum}</span>
                  </Link>
                );
              })}
            </div>
          </div>

        </section>

      </main>
    </>
  );
}
