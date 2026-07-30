'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, BookOpen } from 'lucide-react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import Navbar from '@/components/Navbar';
import dynamic from 'next/dynamic';
import { chapters } from '@/lib/constants';

const ThreeBackground = dynamic(() => import('@/app/_components/ThreeBackground'), { ssr: false });

// For demonstration
const sampleShloka = {
  chapter: 2,
  verse: 47,
  sanskrit: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥',
  transliteration: 'karmaṇy-evādhikāras te mā phaleṣhu kadāchana\nmā karma-phala-hetur bhūr mā te saṅgo ’stvakarmaṇi',
  english: 'You have a right to perform your prescribed duties, but you are not entitled to the fruits of your actions. Never consider yourself to be the cause of the results of your activities, nor be attached to inaction.'
};

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <>
      <Navbar />

      <main className="min-h-screen font-sans pb-16 sm:pb-20" style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
        
        {/* ── COHESIVE SPLIT HERO SECTION ── */}
        <section className="relative flex flex-col md:flex-row w-full overflow-hidden"
          style={{ minHeight: '90vh', backgroundColor: '#050505' }}>
          
          {/* AI Smoke Background with Color-Matching Filters */}
          <div className="absolute inset-0 w-full h-full pointer-events-none">
            <Image 
              src="/images/smoke_bg.jpg"
              alt="Smoke Background"
              fill
              priority
              className="object-cover opacity-80"
              style={{ filter: 'grayscale(100%) brightness(0.7) contrast(1.3)' }}
            />
            {/* Blending gradient: Dark overlay to blend the poster's dark background into the smoke on the right */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent w-full md:w-1/2" />
          </div>

          {/* Poster Image with Seamless Right Fade Mask */}
          <div className="absolute inset-0 w-full h-full flex items-end justify-start pointer-events-none z-10"
               style={{
                 WebkitMaskImage: 'linear-gradient(to right, black 10%, transparent 22%)',
                 maskImage: 'linear-gradient(to right, black 10%, transparent 22%)'
               }}>
            <Image 
              src="/images/krishna_poster.jpg"
              alt="Krishna Silhouette"
              fill
              priority
              className="object-contain"
              style={{ objectPosition: '0% bottom' }}
            />
          </div>

          {/* Dynamic Three.js Glowing Embers / Dust */}
          <div className="absolute inset-0 z-15 pointer-events-none">
            <ThreeBackground />
          </div>

          {/* Centered Content */}
          <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center px-4 z-20 pointer-events-none">
            
            <div className="relative pointer-events-auto space-y-6 animate-fade-in max-w-3xl flex flex-col items-center text-center mt-[-5vh]">
              <h1 style={{
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", Inter, sans-serif',
                fontSize: 'clamp(3rem, 6vw, 5rem)',
                fontWeight: 800,
                lineHeight: 1.3, letterSpacing: '-0.02em', margin: 0,
                padding: '0.1em 0', // Added padding to prevent top/bottom clipping of Devanagari text
                background: 'linear-gradient(180deg, #FFDF8D 0%, #FF8C00 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0px 4px 20px rgba(255, 140, 0, 0.25))'
              }}>
                {t.home_hero_title}
              </h1>

              <p className="font-light leading-relaxed max-w-xl px-2"
                style={{ fontSize: 'clamp(0.85rem, 1.2vw, 1.05rem)', color: 'rgba(255,255,255,0.85)', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                {t.home_hero_desc}
              </p>

              <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-5 pt-6">
                <a href="#chapters-section"
                  className="inline-flex items-center justify-center gap-2 font-bold rounded-full shadow-lg cursor-pointer transition-transform hover:scale-105"
                  style={{
                    padding: '1rem 2.5rem',
                    background: '#f5f5f5', color: '#000',
                    fontSize: '1rem',
                  }}>
                  <BookOpen className="w-4 h-4 shrink-0" /> Scroll to Explore
                </a>
                <Link href="/ask-krishna"
                  className="inline-flex items-center justify-center gap-2 font-bold rounded-full transition-all duration-300 cursor-pointer border hover:bg-white/10 shadow-lg"
                  style={{
                    padding: '1rem 2.5rem',
                    background: 'rgba(0, 0, 0, 0.4)', color: '#f5f5f5',
                    borderColor: 'rgba(255, 255, 255, 0.3)', backdropFilter: 'blur(10px)',
                    fontSize: '1rem',
                  }}>
                  <Sparkles className="w-4 h-4 shrink-0" /> {t.home_ask_ai}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── SHLOKA OF THE DAY ── */}
        <section className="relative z-30 -mt-20 sm:-mt-24 pb-12 sm:pb-16">
          <div className="apple-card w-full max-w-5xl mx-auto px-4 sm:px-6" style={{ padding: 'clamp(1.25rem, 4vw, 2.5rem)' }}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b" style={{ borderColor: 'var(--border-secondary)' }}>
              <span className="text-xs font-mono uppercase tracking-widest font-bold" style={{ color: 'var(--text-secondary)' }}>
                {t.home_shloka_day} • BG {sampleShloka.chapter}.{sampleShloka.verse}
              </span>
              <Link href={`/chapter/${sampleShloka.chapter}/verse/${sampleShloka.verse}`}
                className="text-xs font-bold transition uppercase tracking-wider self-start sm:self-auto" style={{ color: 'var(--gold-primary)' }}>
                {t.home_view_translation}
              </Link>
            </div>

            <div className="text-center space-y-4 sm:space-y-6" style={{ padding: 'clamp(1rem, 3vw, 2rem) 0' }}>
              <p className="font-serif leading-relaxed font-bold whitespace-pre-line shloka-sanskrit"
                style={{ fontSize: 'clamp(1.1rem, 3.5vw, 1.75rem)', color: 'var(--text-primary)' }}>
                {sampleShloka.sanskrit}
              </p>
              <p className="italic font-mono mx-auto"
                style={{ fontSize: 'clamp(0.65rem, 1.5vw, 0.8rem)', maxWidth: '48rem', color: 'var(--text-muted)' }}>
                &quot;{sampleShloka.transliteration}&quot;
              </p>
              <p className="leading-relaxed mx-auto pt-5 border-t"
                style={{ fontSize: 'clamp(0.8rem, 1.8vw, 0.95rem)', maxWidth: '36rem', color: 'var(--text-secondary)', borderColor: 'var(--border-secondary)' }}>
                {sampleShloka.english}
              </p>
            </div>
          </div>
        </section>

        {/* ── CHAPTERS GRID ── */}
        <section id="chapters-section" className="mx-auto scroll-mt-20"
          style={{ maxWidth: '80rem', padding: 'clamp(3rem, 6vw, 6rem) clamp(1rem, 4vw, 1.5rem)' }}>

          <div className="text-center space-y-2 mb-10 sm:mb-16">
            <h2 className="font-serif font-bold" style={{ fontSize: 'clamp(1.6rem, 4vw, 2.5rem)', color: 'var(--text-primary)' }}>
              {t.home_18_chapters}
            </h2>
            <p className="font-mono uppercase tracking-widest font-semibold text-xs" style={{ color: 'var(--gold-primary)', opacity: 0.8 }}>
              {t.home_chapter_journey}
            </p>
          </div>

          <div className="grid gap-4 sm:gap-5 lg:gap-6"
            style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 260px), 1fr))' }}>
            {chapters.map((ch) => (
              <Link href={`/chapter/${ch.chapter_number}`} key={ch.id}
                className="group glass-card rounded-2xl overflow-hidden flex flex-col cursor-pointer">

                {/* Banner Image */}
                <div className="relative w-full overflow-hidden" style={{ height: 'clamp(160px, 25vw, 210px)' }}>
                  <Image
                    src={ch.image} alt={ch.name} fill loading="lazy"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-75 group-hover:opacity-95"
                    style={{ objectPosition: ch.pos, filter: 'brightness(1.1) saturate(1.1)' }}
                  />
                  <div className="absolute inset-0 bg-black/40" />

                  <div className="absolute top-3 left-3">
                    <span className="text-[10px] font-mono text-white font-bold bg-black/40 border border-white/20 px-2.5 py-1 rounded-full backdrop-blur-md">
                      Ch. {ch.chapter_number}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="font-semibold text-white leading-tight"
                      style={{ fontSize: 'clamp(0.9rem, 2.5vw, 1.2rem)' }}>
                      {ch.sanskritName}
                    </h3>
                    <p className="text-[11px] font-medium text-white/80 mt-0.5">{ch.name}</p>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono uppercase tracking-widest block" style={{ color: 'var(--text-muted)' }}>
                      {ch.translation}
                    </span>
                    <p className="text-xs line-clamp-3 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {ch.summary}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-3 border-t" style={{ borderColor: 'var(--border-secondary)' }}>
                    <span style={{ color: 'var(--text-muted)' }}>{ch.verses_count} {t.home_verses}</span>
                    <span className="flex items-center font-bold group-hover:translate-x-1 transition duration-300"
                      style={{ color: 'var(--gold-primary)' }}>
                      {t.home_explore_chapter} <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
        
      </main>
    </>
  );
}
