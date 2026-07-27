'use client';

import React, { useEffect, useState, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, BookOpen, Sparkles } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { useLanguage } from '@/context/LanguageContext';

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
  const { lang, t } = useLanguage();
  const displayLang = lang === 'en' ? 'en' : 'hi';

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
        <div className="min-h-[80vh] flex flex-col items-center justify-center text-center p-6 space-y-4" style={{ background: 'var(--bg-primary)' }}>
          <div className="w-16 h-16 rounded-full border-t-2 border-r-2 border-r-transparent animate-spin" style={{ borderColor: 'var(--text-primary)' }} />
          <p className="text-lg tracking-widest uppercase animate-pulse" style={{ color: 'var(--text-secondary)' }}>{t.ch_loading}</p>
        </div>
      </>
    );
  }

  if (error || !chapter) {
    return (
      <>
        <Navbar />
        <div className="min-h-[80vh] flex flex-col items-center justify-center text-center p-6 space-y-4" style={{ background: 'var(--bg-primary)' }}>
          <p className="text-xl" style={{ color: 'var(--text-primary)' }}>{t.ch_error}: {error || 'Chapter not found'}</p>
          <Link href="/home" className="px-6 py-2.5 font-bold rounded-full text-xs uppercase tracking-widest transition" style={{ background: 'var(--text-primary)', color: 'var(--bg-primary)' }}>
            {t.ch_back}
          </Link>
        </div>
      </>
    );
  }

  const bgImage = getChapterImage(chapterId);

  return (
    <>
      <Navbar />

      <main className="min-h-screen pb-20" style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
        
        {/* Chapter Header Banner */}
        <section className="relative h-[45vh] flex items-end justify-center overflow-hidden border-b" style={{ borderColor: 'var(--border-secondary)' }}>
          <div className="absolute inset-0 z-10 bg-black/40" />
          
          <Image 
            src={bgImage} 
            alt={chapter.translation} 
            fill 
            priority
            sizes="100vw"
            className="object-cover opacity-80" 
          />
          
          <div className="relative z-20 text-center max-w-4xl px-6 pb-12 space-y-3">
            <Link 
              href="/home" 
              className="inline-flex items-center gap-2 text-white/80 hover:text-white text-xs font-bold uppercase tracking-wider transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> {t.ch_back}
            </Link>
            
            <div className="pt-2">
              <span className="text-[10px] font-mono font-bold tracking-widest text-white bg-black/30 px-4 py-1.5 rounded-full border border-white/20 uppercase backdrop-blur-md">
                Chapter {chapter.chapter_number}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold text-white pt-2" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", Inter, sans-serif', letterSpacing: '-0.02em' }}>
              {chapter.name}
            </h1>
            <p className="text-sm md:text-base text-white/90 font-medium tracking-wide">
              {chapter.transliteration} • {chapter.translation}
            </p>
          </div>
        </section>

        {/* Chapter Details & Verses */}
        <section className="max-w-4xl mx-auto px-6 py-12 space-y-12">
          
          {/* Chapter Summary Card */}
          <div className="apple-card p-6 md:p-8 space-y-6">
            <div className="flex items-center justify-between border-b pb-4" style={{ borderColor: 'var(--border-secondary)' }}>
              <span className="text-xs font-mono uppercase tracking-widest font-bold flex items-center gap-2" style={{ color: 'var(--text-secondary)' }}>
                <BookOpen className="w-4 h-4" /> {t.ch_summary}
              </span>
            </div>

            <div className="space-y-4 leading-relaxed text-sm md:text-base" style={{ color: 'var(--text-secondary)' }}>
              <p className="italic text-base md:text-lg border-l-4 pl-4 py-1" style={{ color: 'var(--text-primary)', borderColor: 'var(--gold-primary)' }}>
                {t.ch_meaning} {chapter.meaning?.[displayLang] || chapter.meaning?.['en'] || ''}
              </p>
              <p className="whitespace-pre-line text-xs md:text-sm pt-2 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {chapter.summary?.[displayLang] || chapter.summary?.['en'] || ''}
              </p>
            </div>
          </div>

          {/* Verses Selection Grid */}
          <div className="space-y-6">
            <div className="border-b pb-4" style={{ borderColor: 'var(--border-secondary)' }}>
              <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{t.ch_select_verse}</h2>
              <p className="text-[10px] font-mono uppercase tracking-widest mt-1" style={{ color: 'var(--text-muted)' }}>
                {t.ch_choose_verse.replace('{n}', chapter.verses_count.toString()).replace('{c}', chapter.chapter_number.toString())}
              </p>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3">
              {Array.from({ length: chapter.verses_count }, (_, index) => {
                const verseNum = index + 1;
                return (
                  <Link 
                    href={`/chapter/${chapter.chapter_number}/verse/${verseNum}`}
                    key={verseNum}
                    className="aspect-square flex flex-col items-center justify-center rounded-2xl transition cursor-pointer"
                    style={{
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border-secondary)',
                      color: 'var(--text-primary)',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--border-primary)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-secondary)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                  >
                    <span className="text-[10px] font-mono leading-none mb-1" style={{ color: 'var(--text-muted)' }}>V</span>
                    <span className="leading-none font-semibold">{verseNum}</span>
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
