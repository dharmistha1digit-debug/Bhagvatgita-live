'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sparkles, BookOpen, Heart, Home,
  SunMedium, MoonStar, Search, Globe, User, X, ChevronDown,
  MessageSquareQuote, Info, LogIn, Menu, LogOut,
  Headphones, VolumeX
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import type { LangCode } from '@/i18n/translations';

/* ─── Language options ─── */
const LANGUAGES: { code: LangCode; label: string; flag: string }[] = [
  { code: 'en', label: 'English',    flag: '🇬🇧' },
  { code: 'hi', label: 'हिन्दी',     flag: '🇮🇳' },
  { code: 'sa', label: 'Sanskrit',   flag: '🕉️' },
];

/* ─── Gita Quotes ─── */
const QUOTES = [
  { verse: 'BG 2.47', text: 'You have a right to perform your duties, but you are not entitled to the fruits of your actions.', hindi: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।' },
  { verse: 'BG 2.20', text: 'For the soul there is never birth nor death. It has not come into being, does not come into being, and will not come into being.', hindi: 'न जायते म्रियते वा कदाचित्।' },
  { verse: 'BG 9.22', text: 'To those who worship Me with devotion, meditating on My transcendental form, I carry what they lack and preserve what they have.', hindi: 'अनन्याश्चिन्तयन्तो मां ये जनाः पर्युपासते।' },
  { verse: 'BG 6.35', text: 'The mind is restless and difficult to restrain, but it is subdued by practice and detachment.', hindi: 'असंशयं महाबाहो मनो दुर्निग्रहं चलम्।' },
  { verse: 'BG 18.66', text: 'Abandon all varieties of religion and just surrender unto Me. I shall deliver you from all sinful reaction. Do not fear.', hindi: 'सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज।' },
];

export default function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const { lang, setLang, t } = useLanguage();
  const activeLang = LANGUAGES.find(l => l.code === lang) || LANGUAGES[0];

  /* ── Audio ── */
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  /* ── Dropdowns / Modals ── */
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [langOpen, setLangOpen] = useState(false);
  const [quotesOpen, setQuotesOpen] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [signInTab, setSignInTab] = useState<'login' | 'register'>('login');
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ name: '', email: '', password: '' });
  const [authMsg, setAuthMsg] = useState('');

  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    audioRef.current = new Audio('https://www.assets.mixkit.co/music/preview/mixkit-zen-meditation-healing-music-151.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.4;
    return () => { audioRef.current?.pause(); };
  }, []);

  /* Close dropdowns when clicking outside */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('[data-dropdown]')) {
        setLangOpen(false);
        setQuotesOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  /* Focus search input when opened */
  useEffect(() => {
    if (searchOpen) setTimeout(() => searchRef.current?.focus(), 100);
  }, [searchOpen]);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) { audioRef.current.pause(); setIsPlaying(false); }
    else { audioRef.current.play().catch(() => {}); setIsPlaying(true); }
  };

  /* Mock sign in/register */
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginForm.email || !loginForm.password) { setAuthMsg(t.nav_fill_fields); return; }
    setUser({ name: loginForm.email.split('@')[0], email: loginForm.email });
    setSignInOpen(false); setAuthMsg('');
    setLoginForm({ email: '', password: '' });
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!registerForm.name || !registerForm.email || !registerForm.password) { setAuthMsg(t.nav_fill_fields); return; }
    setUser({ name: registerForm.name, email: registerForm.email });
    setSignInOpen(false); setAuthMsg('');
    setRegisterForm({ name: '', email: '', password: '' });
  };

  const handleLogout = () => { setUser(null); };

  /* CSS var shorthands based on theme */
  const isDark = theme === 'dark';

  const navLinks = [
    { name: t.nav_home,        href: '/home',         icon: Home },
    { name: t.nav_bookmarks,   href: '/bookmarks',     icon: Heart },
    { name: t.nav_ask_krishna, href: '/ask-krishna',   icon: Sparkles },
  ];

  /* ─── Dropdown pill style ─── */
  const dropBtn = `flex items-center justify-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer border`;
  const dropBtnStyle = isDark
    ? 'bg-white/5 border-white/10 text-gray-300 hover:text-white hover:border-white/30 hover:bg-white/10'
    : 'bg-black/5 border-black/5 text-gray-600 hover:text-black hover:border-black/20 hover:bg-black/10';

  const dropMenuStyle: React.CSSProperties = {
    position: 'absolute',
    top: 'calc(100% + 10px)',
    background: 'var(--bg-nav)',
    border: '1px solid var(--border-primary)',
    borderRadius: '1.25rem',
    backdropFilter: 'saturate(180%) blur(20px)',
    WebkitBackdropFilter: 'saturate(180%) blur(20px)',
    boxShadow: 'var(--shadow-card)',
    zIndex: 200,
    animation: 'slideDown 0.22s cubic-bezier(0.16,1,0.3,1) forwards',
    minWidth: '220px',
  };

  return (
    <>
      {/* ══════════════════ HEADER ══════════════════ */}
      <header
        className="sticky top-0 z-50 backdrop-blur-xl border-b transition-colors duration-400"
        style={{
          background: 'var(--bg-nav)',
          borderColor: 'var(--border-primary)',
        }}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 h-20 flex items-center justify-between gap-4">

          {/* ── Logo (Left) ── */}
          <div className="flex justify-start">
            <Link href="/home" className="flex items-center gap-2.5 cursor-pointer group shrink-0">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center font-serif font-bold text-white text-xl shadow-md group-hover:scale-105 transition duration-300"
                style={{ background: 'linear-gradient(135deg, #f97316, #ea580c, #f59e0b)' }}
              >
                ॐ
              </div>
              <div className="hidden sm:block">
                <p className="font-semibold tracking-wide text-sm leading-none text-[var(--text-primary)]">
                  श्रीमद्भगवद्गीता
                </p>

              </div>
            </Link>
          </div>

          {/* ── Desktop Nav Links (Center) ── */}
          <nav className="hidden lg:flex items-center justify-center gap-3 xl:gap-6">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all duration-200"
                  style={{
                    color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                    background: isActive ? 'var(--border-secondary)' : 'transparent',
                  }}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* ── Desktop Action Bar (Right) ── */}
          <div className="hidden md:flex items-center justify-end gap-2 lg:gap-3">

            {/* Search */}
            <button
              onClick={() => setSearchOpen(true)}
              className={`${dropBtn} ${dropBtnStyle} !px-2.5`}
              title={t.nav_search}
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Quotes Dropdown */}
            <div className="relative" data-dropdown>
              <button
                onClick={() => { setQuotesOpen(v => !v); setLangOpen(false); }}
                className={`${dropBtn} ${dropBtnStyle} !px-2.5`}
                title={t.nav_quotes}
              >
                <MessageSquareQuote className="w-4 h-4" />
              </button>

              {quotesOpen && (
                <div style={{ ...dropMenuStyle, width: '340px', right: 0 }}>
                  <div className="p-4 border-b" style={{ borderColor: 'var(--border-primary)' }}>
                    <p className="text-[10px] font-mono uppercase tracking-widest" style={{ color: 'var(--gold-primary)' }}>
                      {t.nav_divine_quotes}
                    </p>
                  </div>
                  <div className="max-h-80 overflow-y-auto p-2 space-y-1">
                    {QUOTES.map((q, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-xl cursor-pointer transition-all duration-200"
                        style={{ background: isDark ? 'rgba(245,158,11,0.04)' : 'rgba(180,83,9,0.04)' }}
                        onMouseEnter={e => (e.currentTarget.style.background = isDark ? 'rgba(245,158,11,0.1)' : 'rgba(180,83,9,0.08)')}
                        onMouseLeave={e => (e.currentTarget.style.background = isDark ? 'rgba(245,158,11,0.04)' : 'rgba(180,83,9,0.04)')}
                      >
                        <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full border" style={{ color: 'var(--gold-primary)', borderColor: 'var(--border-primary)' }}>
                          {q.verse}
                        </span>
                        <p className="text-[11px] leading-relaxed mt-2" style={{ color: 'var(--text-primary)' }}>{q.text}</p>
                        <p className="text-[10px] font-serif italic mt-1" style={{ color: 'var(--gold-primary)', opacity: 0.7 }}>{q.hindi}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Language Dropdown */}
            <div className="relative" data-dropdown>
              <button
                onClick={() => { setLangOpen(v => !v); setQuotesOpen(false); }}
                className={`${dropBtn} ${dropBtnStyle} !px-3`}
                title="Select Language"
              >
                <Globe className="w-4 h-4" />
                <span className="font-medium text-[11px]">{activeLang.flag}</span>
              </button>

              {langOpen && (
                <div style={{ ...dropMenuStyle, width: '190px', right: 0 }}>
                  <div className="p-2 space-y-0.5">
                    {LANGUAGES.map(l => (
                      <button
                        key={l.code}
                        onClick={() => { setLang(l.code); setLangOpen(false); }}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-left transition-all duration-200 cursor-pointer"
                        style={{
                          background: activeLang.code === l.code
                            ? (isDark ? 'rgba(245,158,11,0.12)' : 'rgba(180,83,9,0.08)')
                            : 'transparent',
                          color: activeLang.code === l.code ? 'var(--gold-primary)' : 'var(--text-secondary)',
                        }}
                        onMouseEnter={e => { if (activeLang.code !== l.code) e.currentTarget.style.background = isDark ? 'rgba(245,158,11,0.06)' : 'rgba(180,83,9,0.04)'; }}
                        onMouseLeave={e => { if (activeLang.code !== l.code) e.currentTarget.style.background = 'transparent'; }}
                      >
                        <span className="text-base leading-none">{l.flag}</span>
                        <span>{l.label}</span>
                        {activeLang.code === l.code && <span className="ml-auto text-[10px]">✓</span>}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Dark / Light Toggle */}
            <button
              onClick={toggleTheme}
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className={`${dropBtn} ${dropBtnStyle} !px-2.5`}
            >
              {isDark
                ? <SunMedium className="w-4 h-4 text-[var(--text-primary)]" />
                : <MoonStar className="w-4 h-4 text-[var(--text-primary)]" />
              }
            </button>

            {/* Audio Toggle */}
            <button
              onClick={toggleAudio}
              title={isPlaying ? 'Mute Ambient Music' : 'Play Ambient Music'}
              className={`${dropBtn} !px-2.5 ${isPlaying
                ? (isDark ? 'bg-white/10 border-white/20 text-white' : 'bg-black/10 border-black/20 text-black')
                : dropBtnStyle
              }`}
            >
              {isPlaying
                ? <Headphones className="w-4 h-4 animate-pulse" />
                : <VolumeX className="w-4 h-4" />
              }
            </button>

            {/* Sign In / User */}
            {user ? (
              <div className="flex items-center gap-2">
                <div
                  className="flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-semibold"
                  style={{ background: 'rgba(245,158,11,0.08)', borderColor: 'rgba(245,158,11,0.25)', color: 'var(--gold-primary)' }}
                >
                  <div className="w-5 h-5 rounded-full flex items-center justify-center text-slate-950 text-[10px] font-bold"
                    style={{ background: 'var(--gold-primary)' }}>
                    {user.name[0].toUpperCase()}
                  </div>
                  <span className="hidden xl:inline max-w-[80px] truncate">{user.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className={`${dropBtn} ${dropBtnStyle} !px-2.5`}
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setSignInOpen(true)}
                className="flex items-center justify-center gap-2 px-5 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-sm bg-black text-white dark:bg-white dark:text-black hover:scale-105"
                title="Sign In"
              >
                <User className="w-4 h-4" />
                <span className="hidden xl:inline">Sign In</span>
              </button>
            )}
          </div>

          {/* ── Mobile: Theme + Menu ── */}
          <div className="flex md:hidden items-center justify-end">
            <button onClick={toggleTheme} className={`${dropBtn} ${dropBtnStyle} !px-2`}>
              {isDark ? <SunMedium className="w-4 h-4 text-amber-400" /> : <MoonStar className="w-4 h-4 text-amber-700" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(v => !v)}
              className={`${dropBtn} ${dropBtnStyle} !px-2`}
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>

        </div>

        {/* ── Mobile Dropdown Menu ── */}
        {mobileMenuOpen && (
          <div
            className="md:hidden border-t px-4 py-4 space-y-3 animate-slide-down"
            style={{
              background: 'var(--bg-nav)',
              borderColor: 'var(--border-primary)',
              backdropFilter: 'blur(20px)',
            }}
          >
            {/* Nav links */}
            {navLinks.map(link => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all"
                  style={{
                    color: isActive ? 'var(--gold-primary)' : 'var(--text-secondary)',
                    background: isActive ? 'rgba(245,158,11,0.08)' : 'transparent',
                  }}
                >
                  <Icon className="w-4 h-4" /> {link.name}
                </Link>
              );
            })}

            <div className="h-px" style={{ background: 'var(--border-primary)' }} />

            {/* Mobile Actions */}
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => { setSearchOpen(true); setMobileMenuOpen(false); }}
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold"
                style={{ background: isDark ? 'rgba(245,158,11,0.06)' : 'rgba(180,83,9,0.06)', color: 'var(--text-secondary)', border: '1px solid var(--border-primary)' }}>
                <Search className="w-3.5 h-3.5" /> Search
              </button>
              <button onClick={() => { setLangOpen(false); setQuotesOpen(v => !v); }}
                className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold"
                style={{ background: isDark ? 'rgba(245,158,11,0.06)' : 'rgba(180,83,9,0.06)', color: 'var(--text-secondary)', border: '1px solid var(--border-primary)' }}>
                <MessageSquareQuote className="w-3.5 h-3.5" /> Quotes
              </button>
              <button onClick={toggleAudio}
                className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold"
                style={{ background: isDark ? 'rgba(245,158,11,0.06)' : 'rgba(180,83,9,0.06)', color: 'var(--text-secondary)', border: '1px solid var(--border-primary)' }}>
                {isPlaying ? <Headphones className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                {isPlaying ? 'Mute' : 'Music'}
              </button>
              <button onClick={() => { setSignInOpen(true); setMobileMenuOpen(false); }}
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold"
                style={{ background: isDark ? '#f59e0b' : '#d97706', color: isDark ? '#0f172a' : '#ffffff' }}>
                <User className="w-3.5 h-3.5" /> {user ? user.name : 'Sign In'}
              </button>
            </div>
          </div>
        )}
      </header>

      {/* ══════════════════ SEARCH MODAL ══════════════════ */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-[300] flex items-start justify-center pt-24 px-4"
          style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}
          onClick={(e) => { if (e.target === e.currentTarget) setSearchOpen(false); }}
        >
          <div
            className="w-full max-w-xl rounded-2xl overflow-hidden animate-slide-up"
            style={{
              background: isDark ? 'rgba(2,6,23,0.98)' : 'rgba(253,248,240,0.98)',
              border: '1px solid var(--border-primary)',
              boxShadow: '0 40px 80px rgba(0,0,0,0.5)',
            }}
          >
            {/* Search Input */}
            <div className="flex items-center gap-3 px-5 py-4 border-b" style={{ borderColor: 'var(--border-primary)' }}>
              <Search className="w-5 h-5 shrink-0" style={{ color: 'var(--gold-primary)' }} />
              <input
                ref={searchRef}
                type="text"
                placeholder="Search chapters, verses, topics..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent text-sm outline-none"
                style={{ color: 'var(--text-primary)' }}
              />
              <button onClick={() => setSearchOpen(false)} style={{ color: 'var(--text-muted)' }}>
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Links */}
            <div className="p-5">
              <p className="text-[10px] font-mono uppercase tracking-widest mb-3" style={{ color: 'var(--text-muted)' }}>
                Quick Access
              </p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: 'Chapter 1 – Arjuna Vishada', href: '/chapter/1' },
                  { label: 'Chapter 2 – Sankhya Yoga', href: '/chapter/2' },
                  { label: 'Chapter 6 – Dhyana Yoga', href: '/chapter/6' },
                  { label: 'Chapter 18 – Moksha Yoga', href: '/chapter/18' },
                  { label: 'BG 2.47 – Karma Verse', href: '/chapter/2/verse/47' },
                  { label: 'Ask Krishna AI', href: '/ask-krishna' },
                ].filter(item =>
                  !searchQuery || item.label.toLowerCase().includes(searchQuery.toLowerCase())
                ).map(item => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setSearchOpen(false)}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-200"
                    style={{
                      background: isDark ? 'rgba(245,158,11,0.05)' : 'rgba(180,83,9,0.04)',
                      color: 'var(--text-secondary)',
                      border: '1px solid var(--border-primary)',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = isDark ? 'rgba(245,158,11,0.12)' : 'rgba(180,83,9,0.08)'; e.currentTarget.style.color = 'var(--gold-primary)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = isDark ? 'rgba(245,158,11,0.05)' : 'rgba(180,83,9,0.04)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
                  >
                    <BookOpen className="w-3 h-3 shrink-0" />
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════ SIGN IN MODAL ══════════════════ */}
      {signInOpen && (
        <div
          className="fixed inset-0 z-[300] flex items-center justify-center px-4"
          style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)' }}
          onClick={e => { if (e.target === e.currentTarget) setSignInOpen(false); }}
        >
          <div
            className="w-full max-w-md rounded-2xl overflow-hidden animate-slide-up"
            style={{
              background: isDark ? 'rgba(2,6,23,0.98)' : 'rgba(253,248,240,0.98)',
              border: '1px solid var(--border-primary)',
              boxShadow: '0 40px 80px rgba(0,0,0,0.5)',
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b" style={{ borderColor: 'var(--border-primary)' }}>
              <div>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center font-serif font-bold text-slate-950 text-lg mb-2"
                  style={{ background: 'linear-gradient(135deg, #d97706, #f59e0b)' }}>ॐ</div>
                <p className="font-serif font-bold text-base" style={{ color: 'var(--gold-primary)' }}>
                  {signInTab === 'login' ? 'Welcome Back' : 'Join the Journey'}
                </p>
                <p className="text-[10px] font-mono uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
                  Bhagavad Gita Portal
                </p>
              </div>
              <button onClick={() => setSignInOpen(false)} style={{ color: 'var(--text-muted)' }}>
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b" style={{ borderColor: 'var(--border-primary)' }}>
              {(['login', 'register'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => { setSignInTab(tab); setAuthMsg(''); }}
                  className="flex-1 py-3 text-xs font-bold uppercase tracking-wider transition-all duration-200"
                  style={{
                    color: signInTab === tab ? 'var(--gold-primary)' : 'var(--text-muted)',
                    borderBottom: signInTab === tab ? '2px solid var(--gold-primary)' : '2px solid transparent',
                    background: 'transparent',
                  }}
                >
                  {tab === 'login' ? 'Sign In' : 'Register'}
                </button>
              ))}
            </div>

            {/* Form */}
            <div className="p-6">
              {authMsg && (
                <p className="text-xs text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded-xl px-3 py-2 mb-4">
                  {authMsg}
                </p>
              )}

              {signInTab === 'login' ? (
                <form onSubmit={handleLogin} className="space-y-4">
                  {[
                    { label: 'Email', type: 'email', field: 'email', value: loginForm.email },
                    { label: 'Password', type: 'password', field: 'password', value: loginForm.password },
                  ].map(f => (
                    <div key={f.field}>
                      <label className="text-[10px] font-mono uppercase tracking-widest block mb-1.5" style={{ color: 'var(--text-muted)' }}>{f.label}</label>
                      <input
                        type={f.type}
                        value={f.value}
                        onChange={e => setLoginForm(prev => ({ ...prev, [f.field]: e.target.value }))}
                        className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all duration-200"
                        style={{
                          background: isDark ? 'rgba(15,23,42,0.8)' : 'rgba(255,248,235,0.8)',
                          border: '1px solid var(--border-secondary)',
                          color: 'var(--text-primary)',
                        }}
                        onFocus={e => e.currentTarget.style.borderColor = 'var(--gold-primary)'}
                        onBlur={e => e.currentTarget.style.borderColor = 'var(--border-secondary)'}
                      />
                    </div>
                  ))}
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl text-sm font-bold uppercase tracking-wider transition-all duration-200"
                    style={{ background: 'linear-gradient(135deg, #d97706, #f59e0b)', color: '#020617' }}
                  >
                    Sign In
                  </button>
                </form>
              ) : (
                <form onSubmit={handleRegister} className="space-y-4">
                  {[
                    { label: 'Your Name', type: 'text', field: 'name', value: registerForm.name },
                    { label: 'Email', type: 'email', field: 'email', value: registerForm.email },
                    { label: 'Password', type: 'password', field: 'password', value: registerForm.password },
                  ].map(f => (
                    <div key={f.field}>
                      <label className="text-[10px] font-mono uppercase tracking-widest block mb-1.5" style={{ color: 'var(--text-muted)' }}>{f.label}</label>
                      <input
                        type={f.type}
                        value={f.value}
                        onChange={e => setRegisterForm(prev => ({ ...prev, [f.field]: e.target.value }))}
                        className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all duration-200"
                        style={{
                          background: isDark ? 'rgba(15,23,42,0.8)' : 'rgba(255,248,235,0.8)',
                          border: '1px solid var(--border-secondary)',
                          color: 'var(--text-primary)',
                        }}
                        onFocus={e => e.currentTarget.style.borderColor = 'var(--gold-primary)'}
                        onBlur={e => e.currentTarget.style.borderColor = 'var(--border-secondary)'}
                      />
                    </div>
                  ))}
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl text-sm font-bold uppercase tracking-wider transition-all duration-200"
                    style={{ background: 'linear-gradient(135deg, #d97706, #f59e0b)', color: '#020617' }}
                  >
                    Create Account
                  </button>
                </form>
              )}

              <p className="text-center text-[10px] font-mono mt-4" style={{ color: 'var(--text-muted)' }}>
                🕉️ &nbsp;Your spiritual journey awaits
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ── Keyframes ── */}
      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(16px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </>
  );
}