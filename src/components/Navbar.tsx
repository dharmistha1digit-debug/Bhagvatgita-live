'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sparkles, Music, VolumeX, Volume2, BookOpen, Heart, Home } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio on client side
  useEffect(() => {
    audioRef.current = new Audio('https://www.assets.mixkit.co/music/preview/mixkit-zen-meditation-healing-music-151.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.4;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch((err) => console.log('Audio playback blocked by browser:', err));
      setIsPlaying(true);
    }
  };

  const navLinks = [
    { name: 'Home', href: '/home', icon: Home },
    { name: 'Bookmarks', href: '/bookmarks', icon: Heart },
    { name: 'Ask Krishna AI', href: '/ask-krishna', icon: Sparkles },
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-amber-900/30">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
        
        {/* Logo */}
        <Link href="/home" className="flex items-center gap-3 cursor-pointer group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 to-yellow-400 flex items-center justify-center font-serif font-bold text-slate-950 text-xl shadow-lg shadow-amber-500/20 group-hover:scale-105 transition duration-300">
            ॐ
          </div>
          <div>
            <h1 className="font-serif font-bold text-amber-200 tracking-wide text-base md:text-lg leading-none">
              श्रीमद्भगवद्गीता
            </h1>
            <span className="text-[9px] font-mono uppercase tracking-widest text-amber-500/80 block mt-0.5">AI Spiritual Portal</span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.name} 
                href={link.href}
                className={`flex items-center gap-2 text-xs font-semibold tracking-wider uppercase transition duration-300 ${isActive ? 'text-amber-400 text-glow-gold' : 'text-slate-400 hover:text-slate-200'}`}
              >
                <Icon className="w-4 h-4" />
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Action Button & Audio Toggle */}
        <div className="flex items-center gap-3">
          
          {/* Ambient Music Button */}
          <button 
            onClick={toggleAudio}
            title={isPlaying ? "Mute Ambient Flute" : "Play Ambient Flute"}
            className={`p-2.5 rounded-xl border transition-all duration-300 flex items-center gap-2 cursor-pointer ${isPlaying ? 'bg-amber-500/10 border-amber-500/40 text-amber-300' : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'}`}
          >
            {isPlaying ? (
              <>
                <Volume2 className="w-4 h-4 text-amber-400 animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-wider hidden sm:inline animate-pulse">Playing</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-wider hidden sm:inline">Music Off</span>
              </>
            )}
          </button>

          {/* Ask Krishna Mobile / Shortcut button */}
          <Link 
            href="/ask-krishna"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-yellow-500 text-slate-950 text-xs font-bold transition-all duration-300 shadow-md shadow-amber-500/10 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" /> Ask Krishna AI
          </Link>
        </div>

      </div>
    </header>
  );
}