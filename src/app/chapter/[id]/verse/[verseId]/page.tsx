'use client';

import React, { useEffect, useState, use, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Bookmark, Volume2, VolumeX, Sparkles, ChevronLeft, ChevronRight, Play, Pause, AlertCircle, BookOpen, Share2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { useLanguage } from '@/context/LanguageContext';

interface VerseData {
  _id: string;
  chapter: number;
  verse: number;
  slok: string;
  transliteration: string;
  siva?: {
    author: string;
    et?: string;
    ec?: string;
  };
  purohit?: {
    author: string;
    et?: string;
  };
  tej?: {
    author: string;
    ht?: string;
  };
  rams?: {
    author: string;
    ht?: string;
    hc?: string;
  };
  chinmay?: {
    author: string;
    hc?: string;
  };
}

const getChapterImage = (id: number) => {
  const images = [
    '/images/hero_banner_background.png',
    '/images/cosmic_form.png',
    '/images/peaceful_meditation.png',
    '/images/krishna_flute.png',
  ];
  if (id === 1 || id === 18) return images[0];
  if (id === 2 || id === 7 || id === 11) return images[1];
  if (id === 3 || id === 5 || id === 6 || id === 13 || id === 14 || id === 17) return images[2];
  if (id === 4 || id === 10 || id === 12 || id === 15) return images[3];
  return '/images/divine_entrance.png';
};

const getChapterVersesCount = (id: number): number => {
  const counts = [47, 72, 43, 42, 29, 47, 30, 28, 34, 42, 55, 20, 35, 27, 20, 24, 28, 78];
  return counts[id - 1] || 47;
};

interface PageProps {
  params: Promise<{ id: string; verseId: string }>;
}

export default function VerseDetail({ params }: PageProps) {
  const resolvedParams = use(params);
  const chapterId = Number(resolvedParams.id) || 1;
  const verseId = Number(resolvedParams.verseId) || 1;
  const totalVerses = getChapterVersesCount(chapterId);

  const [verse, setVerse] = useState<VerseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const { lang, t } = useLanguage();
  const [isBookmarked, setIsBookmarked] = useState(false);

  const [audioLoading, setAudioLoading] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [ttsPlaying, setTtsPlaying] = useState(false);

  useEffect(() => {
    setLoading(true);
    setAudioPlaying(false);
    setTtsPlaying(false);
    setAudioError(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    window.speechSynthesis.cancel();

    fetch(`https://vedicscriptures.github.io/slok/${chapterId}/${verseId}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch verse data');
        return res.json();
      })
      .then((data) => {
        setVerse(data);
        setLoading(false);
        
        const bookmarks = JSON.parse(localStorage.getItem('gita_bookmarks') || '[]');
        const key = `BG${chapterId}.${verseId}`;
        setIsBookmarked(bookmarks.some((b: any) => b.key === key));
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, [chapterId, verseId]);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      window.speechSynthesis.cancel();
    };
  }, []);

  const toggleBookmark = () => {
    if (!verse) return;
    const bookmarks = JSON.parse(localStorage.getItem('gita_bookmarks') || '[]');
    const key = `BG${chapterId}.${verseId}`;
    
    if (isBookmarked) {
      const updated = bookmarks.filter((b: any) => b.key !== key);
      localStorage.setItem('gita_bookmarks', JSON.stringify(updated));
      setIsBookmarked(false);
    } else {
      const newBookmark = {
        key,
        chapter: chapterId,
        verse: verseId,
        sanskrit: verse.slok.split('\n')[0] || '',
        translation: verse.siva?.et || verse.purohit?.et || verse.tej?.ht || 'Bhagavad Gita Verse'
      };
      bookmarks.push(newBookmark);
      localStorage.setItem('gita_bookmarks', JSON.stringify(bookmarks));
      setIsBookmarked(true);
    }
  };

  const handlePlayRecitation = () => {
    if (audioPlaying) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setAudioPlaying(false);
      return;
    }

    if (ttsPlaying) {
      window.speechSynthesis.cancel();
      setTtsPlaying(false);
    }

    if (audioRef.current) {
      audioRef.current.play();
      setAudioPlaying(true);
      return;
    }

    setAudioLoading(true);
    setAudioError(false);

    const pad = (num: number) => String(num).padStart(3, '0');
    const url = `https://www.holy-bhagavad-gita.org/public/audio/${pad(chapterId)}_${pad(verseId)}.mp3`;
    
    const audio = new Audio(url);
    audioRef.current = audio;

    audio.oncanplaythrough = () => {
      setAudioLoading(false);
      audio.play().catch(() => {
        setAudioError(true);
        setAudioPlaying(false);
      });
      setAudioPlaying(true);
    };

    audio.onerror = () => {
      setAudioLoading(false);
      setAudioError(true);
      setAudioPlaying(false);
      audioRef.current = null;
    };

    audio.onended = () => {
      setAudioPlaying(false);
    };
  };

  const handleSpeech = () => {
    if (ttsPlaying) {
      window.speechSynthesis.cancel();
      setTtsPlaying(false);
      return;
    }

    if (audioPlaying) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setAudioPlaying(false);
    }

    const textToSpeak = getTranslationText();
    if (!textToSpeak) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    
    utterance.lang = lang === 'en' ? 'en-US' : 'hi-IN';
    utterance.rate = 0.95;

    utterance.onend = () => {
      setTtsPlaying(false);
    };

    utterance.onerror = () => {
      setTtsPlaying(false);
    };

    window.speechSynthesis.speak(utterance);
    setTtsPlaying(true);
  };

  const getTranslationText = (): string => {
    if (!verse) return '';
    if (lang === 'en') return verse.siva?.et || verse.purohit?.et || '';
    if (lang === 'hi') return verse.tej?.ht || verse.rams?.ht || '';
    // For sanskrit, just return an empty translation string to focus purely on the sloka
    if (lang === 'sa') return 'संस्कृत अध्ययन (Sanskrit Study)';
    return '';
  };

  const getTranslationAuthor = (): string => {
    if (!verse || lang === 'sa') return '';
    if (lang === 'en') {
      if (verse.siva?.et) return 'Swami Sivananda';
      if (verse.purohit?.et) return 'Shri Purohit Swami';
    } else {
      if (verse.tej?.ht) return 'Swami Tejomayananda';
      if (verse.rams?.ht) return 'Swami Ramsukhdas';
    }
    return 'Swami Sivananda';
  };

  const getCommentaryText = (): string => {
    if (!verse || lang === 'sa') return '';
    if (lang === 'en') return verse.siva?.ec || '';
    return verse.chinmay?.hc || verse.rams?.hc || verse.siva?.ec || '';
  };

  const shareVerse = () => {
    if (navigator.share) {
      navigator.share({
        title: `Bhagavad Gita - Chapter ${chapterId}, Verse ${verseId}`,
        text: `BG ${chapterId}.${verseId}: \n${verse?.slok}\n\nRead more on the Bhagavad Gita app.`,
        url: window.location.href,
      }).catch((err) => console.log(err));
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-[80vh] flex flex-col items-center justify-center text-center p-6 space-y-4" style={{ background: 'var(--bg-primary)' }}>
          <div className="w-16 h-16 rounded-full border-t-2 border-r-2 border-r-transparent animate-spin" style={{ borderColor: 'var(--text-primary)' }} />
          <p className="text-lg tracking-widest uppercase animate-pulse" style={{ color: 'var(--text-secondary)' }}>Loading Sacred Verse...</p>
        </div>
      </>
    );
  }

  if (error || !verse) {
    return (
      <>
        <Navbar />
        <div className="min-h-[80vh] flex flex-col items-center justify-center text-center p-6 space-y-4" style={{ background: 'var(--bg-primary)' }}>
          <p className="text-xl" style={{ color: 'var(--text-primary)' }}>Error: {error || 'Verse not found'}</p>
          <Link href={`/chapter/${chapterId}`} className="px-6 py-2.5 font-bold rounded-full text-xs uppercase tracking-widest transition" style={{ background: 'var(--text-primary)', color: 'var(--bg-primary)' }}>
            Back to Chapter {chapterId}
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
        
        {/* Navigation & Controls header */}
        <section className="border-b py-4 px-6 sticky top-20 z-40" style={{ background: 'var(--bg-nav)', borderColor: 'var(--border-primary)', backdropFilter: 'saturate(180%) blur(20px)', WebkitBackdropFilter: 'saturate(180%) blur(20px)' }}>
          <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
            
            <Link 
              href={`/chapter/${chapterId}`} 
              className="inline-flex items-center gap-2 font-bold uppercase tracking-wider transition"
              style={{ color: 'var(--text-secondary)', fontSize: '11px' }}
            >
              <ArrowLeft className="w-4 h-4" /> Chapter {chapterId}
            </Link>

            <div className="text-center">
              <span className="text-xs font-mono font-bold tracking-widest uppercase" style={{ color: 'var(--gold-primary)' }}>
                Verse {chapterId}.{verseId}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={shareVerse}
                title="Share Verse"
                className="p-2 flex items-center justify-center rounded-full border transition cursor-pointer"
                style={{ background: 'var(--bg-card)', borderColor: 'var(--border-secondary)', color: 'var(--text-secondary)' }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
              >
                <Share2 className="w-4 h-4" />
              </button>

              <button 
                onClick={toggleBookmark}
                title={isBookmarked ? "Remove Bookmark" : "Bookmark Verse"}
                className={`p-2 flex items-center justify-center rounded-full border transition-all duration-300 cursor-pointer ${isBookmarked ? 'bg-rose-50 border-rose-200 text-rose-500 dark:bg-rose-500/10 dark:border-rose-500/30 dark:text-rose-400' : ''}`}
                style={!isBookmarked ? { background: 'var(--bg-card)', borderColor: 'var(--border-secondary)', color: 'var(--text-secondary)' } : undefined}
                onMouseEnter={(e) => { if (!isBookmarked) e.currentTarget.style.color = 'var(--text-primary)'; }}
                onMouseLeave={(e) => { if (!isBookmarked) e.currentTarget.style.color = 'var(--text-secondary)'; }}
              >
                <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
              </button>
            </div>

          </div>
        </section>

        {/* Shloka Card Section */}
        <section className="max-w-4xl mx-auto px-6 py-10 space-y-8">
          
          {/* Shloka Card */}
          <div className="apple-card p-8 md:p-12 space-y-8 text-center animate-fade-in">
            
            <div className="flex justify-between items-center pb-4 border-b" style={{ borderColor: 'var(--border-secondary)' }}>
              <span className="text-xs font-mono font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>BG {chapterId}.{verseId}</span>
              
              <div className="flex items-center gap-2">
                
                <button 
                  onClick={handlePlayRecitation}
                  disabled={audioLoading}
                  className="px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider border transition-all duration-300 flex items-center gap-1.5 cursor-pointer"
                  style={{
                    background: audioPlaying ? 'var(--text-primary)' : 'var(--bg-card)',
                    color: audioPlaying ? 'var(--bg-primary)' : 'var(--text-secondary)',
                    borderColor: audioPlaying ? 'var(--text-primary)' : 'var(--border-secondary)'
                  }}
                  onMouseEnter={(e) => { if (!audioPlaying) { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.borderColor = 'var(--border-primary)'; } }}
                  onMouseLeave={(e) => { if (!audioPlaying) { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.borderColor = 'var(--border-secondary)'; } }}
                >
                  {audioLoading ? (
                    <span className="w-3.5 h-3.5 border-t-2 border-r-transparent rounded-full animate-spin" style={{ borderColor: audioPlaying ? 'var(--bg-primary)' : 'var(--text-primary)' }} />
                  ) : audioPlaying ? (
                    <Pause className="w-3.5 h-3.5" />
                  ) : (
                    <Play className="w-3.5 h-3.5" />
                  )}
                  {audioPlaying ? "Playing" : "Sanskrit"}
                </button>

                <button 
                  onClick={handleSpeech}
                  className="px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider border transition-all duration-300 flex items-center gap-1.5 cursor-pointer"
                  style={{
                    background: ttsPlaying ? 'var(--text-primary)' : 'var(--bg-card)',
                    color: ttsPlaying ? 'var(--bg-primary)' : 'var(--text-secondary)',
                    borderColor: ttsPlaying ? 'var(--text-primary)' : 'var(--border-secondary)'
                  }}
                  onMouseEnter={(e) => { if (!ttsPlaying) { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.borderColor = 'var(--border-primary)'; } }}
                  onMouseLeave={(e) => { if (!ttsPlaying) { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.borderColor = 'var(--border-secondary)'; } }}
                >
                  {ttsPlaying ? <Volume2 className="w-3.5 h-3.5 animate-pulse" /> : <Volume2 className="w-3.5 h-3.5" />}
                  Read Aloud
                </button>

              </div>
            </div>

            {audioError && (
              <div className="flex items-center justify-center gap-2 text-xs font-medium py-1 px-3 rounded-lg max-w-fit mx-auto animate-pulse" style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#d97706' }}>
                <AlertCircle className="w-4 h-4" /> Server unavailable. Playing local TTS instead.
              </div>
            )}

            <div className="space-y-4 py-4">
              <p className="text-2xl md:text-3.5xl font-bold whitespace-pre-line leading-relaxed shloka-sanskrit" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", Inter, sans-serif', color: 'var(--text-primary)' }}>
                {verse.slok}
              </p>
              
              <p className="text-xs md:text-sm italic font-mono max-w-3xl mx-auto leading-relaxed pt-2" style={{ color: 'var(--text-muted)' }}>
                "{verse.transliteration}"
              </p>
            </div>
            
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="md:col-span-2 apple-card p-6 md:p-8 space-y-6 flex flex-col justify-between">
              <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-4" style={{ borderColor: 'var(--border-secondary)' }}>
                  <span className="text-xs font-mono uppercase tracking-widest font-bold flex items-center gap-2" style={{ color: 'var(--gold-primary)' }}>
                    <Sparkles className="w-4 h-4" /> Translation
                  </span>
                </div>

                <p className="text-base md:text-lg leading-relaxed font-light pl-4 border-l-4" style={{ color: 'var(--text-primary)', borderColor: 'var(--gold-primary)' }}>
                  {getTranslationText()}
                </p>
              </div>

              {getTranslationAuthor() && (
                <div className="text-[10px] font-mono text-right uppercase tracking-wider pt-4 border-t" style={{ color: 'var(--text-muted)', borderColor: 'var(--border-secondary)' }}>
                  Translation by {getTranslationAuthor()}
                </div>
              )}
            </div>

            <div className="apple-card overflow-hidden relative min-h-[250px] md:min-h-auto shadow-sm p-0">
              <Image 
                src={bgImage} 
                alt="Divine Theme Visual" 
                fill 
                className="object-cover opacity-80" 
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-[9px] font-mono uppercase tracking-widest text-white font-bold bg-black/40 border border-white/20 px-3 py-1 rounded-full backdrop-blur-md">
                  Chapter Theme Visual
                </span>
              </div>
            </div>

          </div>

          {lang !== 'sa' && (
            <div className="apple-card p-6 md:p-8 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-4" style={{ borderColor: 'var(--border-secondary)' }}>
                <span className="text-xs font-mono uppercase tracking-widest font-bold flex items-center gap-2" style={{ color: 'var(--gold-primary)' }}>
                  <BookOpen className="w-4 h-4" /> Scholar Commentary
                </span>
              </div>

              <div className="space-y-4 text-xs md:text-sm leading-relaxed max-w-4xl whitespace-pre-line" style={{ color: 'var(--text-secondary)' }}>
                {getCommentaryText() ? (
                  <p>{getCommentaryText()}</p>
                ) : (
                  <p className="italic text-xs" style={{ color: 'var(--text-muted)' }}>This scholar did not provide commentary for this specific verse.</p>
                )}
              </div>
            </div>
          )}

          <div className="flex justify-between items-center gap-4 pt-6 border-t" style={{ borderColor: 'var(--border-secondary)' }}>
            {verseId > 1 ? (
              <Link 
                href={`/chapter/${chapterId}/verse/${verseId - 1}`}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full border transition cursor-pointer"
                style={{ background: 'var(--bg-card)', borderColor: 'var(--border-secondary)', color: 'var(--text-secondary)' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.borderColor = 'var(--border-primary)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.borderColor = 'var(--border-secondary)'; }}
              >
                <ChevronLeft className="w-4 h-4" /> Prev Verse
              </Link>
            ) : (
              <div className="w-24" />
            )}

            <Link 
              href={`/chapter/${chapterId}`}
              className="text-xs font-mono uppercase tracking-widest transition"
              style={{ color: 'var(--text-muted)' }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
            >
              All Verses
            </Link>

            {verseId < totalVerses ? (
              <Link 
                href={`/chapter/${chapterId}/verse/${verseId + 1}`}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full border transition cursor-pointer"
                style={{ background: 'var(--bg-card)', borderColor: 'var(--border-secondary)', color: 'var(--text-secondary)' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.borderColor = 'var(--border-primary)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.borderColor = 'var(--border-secondary)'; }}
              >
                Next Verse <ChevronRight className="w-4 h-4" />
              </Link>
            ) : (
              <div className="w-24" />
            )}
          </div>

        </section>

      </main>
    </>
  );
}
