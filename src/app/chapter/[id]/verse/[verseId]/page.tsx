'use client';

import React, { useEffect, useState, use, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Heart, Volume2, VolumeX, Sparkles, ChevronLeft, ChevronRight, Play, Pause, AlertCircle, BookOpen } from 'lucide-react';
import Navbar from '@/components/Navbar';

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

// Simple local static mapping of chapters to their maximum verse counts
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
  
  // Customisation states
  const [selectedTranslation, setSelectedTranslation] = useState<'sivananda' | 'purohit' | 'tej' | 'rams'>('sivananda');
  const [selectedCommentary, setSelectedCommentary] = useState<'sivananda' | 'chinmay' | 'rams'>('sivananda');
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Audio Chant states
  const [audioLoading, setAudioLoading] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Browser TTS states
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
        
        // Check local storage for bookmark status
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

  // Clean up audio & speech on unmount
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

  // Play Recitation from holy-bhagavad-gita.org
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

  // Speak translation using browser speech synthesis
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
    
    // Choose voice language based on translation type (Hindi / English)
    const isHindi = selectedTranslation === 'tej' || selectedTranslation === 'rams';
    utterance.lang = isHindi ? 'hi-IN' : 'en-US';
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
    if (selectedTranslation === 'sivananda') return verse.siva?.et || '';
    if (selectedTranslation === 'purohit') return verse.purohit?.et || '';
    if (selectedTranslation === 'tej') return verse.tej?.ht || '';
    if (selectedTranslation === 'rams') return verse.rams?.ht || '';
    return '';
  };

  const getCommentaryText = (): string => {
    if (!verse) return '';
    if (selectedCommentary === 'sivananda') return verse.siva?.ec || '';
    if (selectedCommentary === 'chinmay') return verse.chinmay?.hc || '';
    if (selectedCommentary === 'rams') return verse.rams?.hc || '';
    return '';
  };

  const shareVerse = () => {
    if (navigator.share) {
      navigator.share({
        title: `Bhagavad Gita - Chapter ${chapterId}, Verse ${verseId}`,
        text: `BG ${chapterId}.${verseId}: \n${verse?.slok}\n\nRead more details inside our AI Divine Portal!`,
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
        <div className="min-h-[80vh] flex flex-col items-center justify-center text-center p-6 bg-slate-950 text-amber-400 font-serif space-y-4">
          <div className="w-16 h-16 rounded-full border-t-2 border-amber-500 border-r-2 border-r-transparent animate-spin" />
          <p className="text-lg tracking-widest uppercase animate-pulse">Loading Sacred Verse...</p>
        </div>
      </>
    );
  }

  if (error || !verse) {
    return (
      <>
        <Navbar />
        <div className="min-h-[80vh] flex flex-col items-center justify-center text-center p-6 bg-slate-950 text-amber-500 font-serif space-y-4">
          <p className="text-xl">Error: {error || 'Verse not found'}</p>
          <Link href={`/chapter/${chapterId}`} className="px-6 py-2.5 bg-amber-500 text-slate-950 font-bold rounded-xl text-xs uppercase tracking-widest transition hover:bg-amber-400">
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

      <main className="min-h-screen bg-slate-950 text-slate-100 pb-20">
        
        {/* Navigation & Controls header */}
        <section className="bg-slate-900/40 border-b border-amber-900/10 py-4 px-6 sticky top-16 z-40 backdrop-blur-md">
          <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
            
            {/* Back link */}
            <Link 
              href={`/chapter/${chapterId}`} 
              className="inline-flex items-center gap-2 text-slate-400 hover:text-amber-400 text-xs font-bold uppercase tracking-wider transition"
            >
              <ArrowLeft className="w-4 h-4" /> Chapter {chapterId}
            </Link>

            {/* Verse title */}
            <div className="text-center">
              <span className="text-xs font-mono font-bold tracking-widest text-amber-400 uppercase">
                Verse {chapterId}.{verseId}
              </span>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2">
              
              {/* Share button */}
              <button 
                onClick={shareVerse}
                title="Share Verse"
                className="p-2 rounded-xl bg-slate-900 hover:bg-amber-500/10 text-slate-400 hover:text-amber-400 border border-slate-800 hover:border-amber-500/30 transition cursor-pointer"
              >
                <ChevronRight className="w-4 h-4 rotate-90" />
              </button>

              {/* Bookmark button */}
              <button 
                onClick={toggleBookmark}
                title={isBookmarked ? "Remove Bookmark" : "Bookmark Verse"}
                className={`p-2 rounded-xl border transition-all duration-300 cursor-pointer ${isBookmarked ? 'bg-rose-500/10 border-rose-500/30 text-rose-400' : 'bg-slate-900 hover:bg-amber-500/10 text-slate-400 hover:text-amber-400 border-slate-800 hover:border-amber-500/30'}`}
              >
                <Heart className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
              </button>

            </div>

          </div>
        </section>

        {/* Shloka Card Section */}
        <section className="max-w-4xl mx-auto px-6 py-10 space-y-8">
          
          {/* Shloka Card */}
          <div className="parchment-card p-8 md:p-12 rounded-2xl space-y-8 text-center animate-fade-in">
            
            {/* Ambient/recitation controls inside card */}
            <div className="flex justify-between items-center pb-4 border-b border-amber-800/20">
              <span className="text-xs font-mono text-amber-400/80 font-bold uppercase tracking-wider">BG {chapterId}.{verseId}</span>
              
              <div className="flex items-center gap-2">
                
                {/* Audio Recitation button */}
                <button 
                  onClick={handlePlayRecitation}
                  disabled={audioLoading}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider border transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${audioPlaying ? 'bg-amber-500/10 border-amber-500/40 text-amber-400' : 'bg-slate-950/80 border-amber-950/40 text-amber-300 hover:bg-amber-500/10'}`}
                >
                  {audioLoading ? (
                    <span className="w-3.5 h-3.5 border-t-2 border-amber-400 border-r-transparent rounded-full animate-spin" />
                  ) : audioPlaying ? (
                    <Pause className="w-3.5 h-3.5" />
                  ) : (
                    <Play className="w-3.5 h-3.5" />
                  )}
                  {audioPlaying ? "Recitation Playing" : "Sanskrit Recitation"}
                </button>

                {/* Speech synthesis button */}
                <button 
                  onClick={handleSpeech}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider border transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${ttsPlaying ? 'bg-amber-500/10 border-amber-500/40 text-amber-400' : 'bg-slate-950/80 border-amber-950/40 text-amber-300 hover:bg-amber-500/10'}`}
                >
                  {ttsPlaying ? <Volume2 className="w-3.5 h-3.5 animate-pulse" /> : <Volume2 className="w-3.5 h-3.5" />}
                  Read Aloud
                </button>

              </div>
            </div>

            {/* Chanting play warnings */}
            {audioError && (
              <div className="flex items-center justify-center gap-2 text-xs text-amber-500/90 font-medium py-1 px-3 bg-amber-500/10 rounded-lg max-w-fit mx-auto animate-pulse">
                <AlertCircle className="w-4 h-4" /> Recitation server unavailable. Playing local TTS instead.
              </div>
            )}

            {/* Original Sanskrit Text */}
            <div className="space-y-4 py-4">
              <p className="text-2xl md:text-3.5xl font-serif text-amber-100 font-bold whitespace-pre-line leading-relaxed shloka-sanskrit text-glow-divine">
                {verse.slok}
              </p>
              
              {/* Transliteration */}
              <p className="text-xs md:text-sm text-amber-300/60 italic font-mono max-w-3xl mx-auto leading-relaxed pt-2">
                &quot;{verse.transliteration}&quot;
              </p>
            </div>
            
          </div>

          {/* Grid Layout: Left Column = Translation, Right Column = Custom Visual and Commentaries */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Column 1: Translation (Spans 2 columns) */}
            <div className="md:col-span-2 glass-card p-6 md:p-8 rounded-2xl space-y-6 flex flex-col justify-between">
              <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-900/80 pb-4">
                  <span className="text-xs font-mono uppercase tracking-widest text-amber-500 font-bold flex items-center gap-2">
                    <Sparkles className="w-4 h-4 animate-pulse" /> Translation
                  </span>
                  
                  {/* Selector to choose whose translation to view */}
                  <select 
                    value={selectedTranslation}
                    onChange={(e) => setSelectedTranslation(e.target.value as any)}
                    className="bg-slate-950 border border-amber-900/40 rounded-xl px-3 py-1.5 text-xs text-amber-300 focus:outline-none focus:border-amber-500 font-semibold cursor-pointer shadow-inner"
                  >
                    <option value="sivananda">Swami Sivananda (English)</option>
                    <option value="purohit">Shri Purohit Swami (English)</option>
                    <option value="tej">Swami Tejomayananda (Hindi)</option>
                    <option value="rams">Swami Ramsukhdas (Hindi)</option>
                  </select>
                </div>

                <p className="text-base md:text-lg text-slate-200 leading-relaxed font-light pl-4 border-l-2 border-amber-500/50">
                  {getTranslationText()}
                </p>
              </div>

              {/* Scholar signature */}
              <div className="text-[10px] text-slate-500 font-mono text-right uppercase tracking-wider pt-4 border-t border-slate-900/40">
                Translation by {selectedTranslation === 'sivananda' ? 'Swami Sivananda' : selectedTranslation === 'purohit' ? 'Shri Purohit Swami' : selectedTranslation === 'tej' ? 'Swami Tejomayananda' : 'Swami Ramsukhdas'}
              </div>
            </div>

            {/* Column 2: Theme Visual (Spans 1 column) */}
            <div className="glass-card rounded-2xl overflow-hidden relative min-h-[250px] md:min-h-auto shadow-lg border border-amber-500/10">
              <Image 
                src={bgImage} 
                alt="Divine Theme Visual" 
                fill 
                className="object-cover opacity-70 group-hover:scale-105 transition-transform duration-500" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-[9px] font-mono uppercase tracking-widest text-amber-400 font-bold bg-slate-950/80 border border-amber-500/30 px-3 py-1 rounded-full backdrop-blur-sm">
                  Chapter Theme Visual
                </span>
              </div>
            </div>

          </div>

          {/* Commentary Section */}
          <div className="glass-card p-6 md:p-8 rounded-2xl space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-900/80 pb-4">
              <span className="text-xs font-mono uppercase tracking-widest text-amber-500 font-bold flex items-center gap-2">
                <BookOpen className="w-4 h-4" /> Scholar Commentary
              </span>
              
              {/* Selector to choose whose commentary to view */}
              <select 
                value={selectedCommentary}
                onChange={(e) => setSelectedCommentary(e.target.value as any)}
                className="bg-slate-950 border border-amber-900/40 rounded-xl px-3 py-1.5 text-xs text-amber-300 focus:outline-none focus:border-amber-500 font-semibold cursor-pointer shadow-inner"
              >
                <option value="sivananda">Swami Sivananda (English)</option>
                <option value="chinmay">Swami Chinmayananda (Hindi)</option>
                <option value="rams">Swami Ramsukhdas (Hindi)</option>
              </select>
            </div>

            <div className="space-y-4 text-xs md:text-sm text-slate-400 leading-relaxed max-w-4xl whitespace-pre-line">
              {getCommentaryText() ? (
                <p>{getCommentaryText()}</p>
              ) : (
                <p className="italic text-slate-500 text-xs">This scholar did not provide commentary for this specific verse.</p>
              )}
            </div>
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-between items-center gap-4 pt-6 border-t border-amber-900/10">
            {verseId > 1 ? (
              <Link 
                href={`/chapter/${chapterId}/verse/${verseId - 1}`}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900/80 hover:bg-amber-500/10 border border-slate-800 hover:border-amber-500/30 text-slate-300 hover:text-amber-300 text-xs font-bold uppercase tracking-wider transition cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" /> Prev Verse
              </Link>
            ) : (
              <div className="w-24" /> // placeholder
            )}

            <Link 
              href={`/chapter/${chapterId}`}
              className="text-xs font-mono uppercase tracking-widest text-slate-500 hover:text-amber-400 transition"
            >
              All Verses
            </Link>

            {verseId < totalVerses ? (
              <Link 
                href={`/chapter/${chapterId}/verse/${verseId + 1}`}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900/80 hover:bg-amber-500/10 border border-slate-800 hover:border-amber-500/30 text-slate-300 hover:text-amber-300 text-xs font-bold uppercase tracking-wider transition cursor-pointer"
              >
                Next Verse <ChevronRight className="w-4 h-4" />
              </Link>
            ) : (
              <div className="w-24" /> // placeholder
            )}
          </div>

        </section>

      </main>
    </>
  );
}
