'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft, Sparkles, Send, User, ChevronRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { useLanguage } from '@/context/LanguageContext';

interface Message {
  id: string;
  sender: 'user' | 'krishna';
  text: string;
  citation?: string;
  timestamp: Date;
}

const wisdomDatabase = [
  { keywords: ['anxiety', 'stress', 'fear', 'depress', 'anxious', 'worry', 'worried', 'tension', 'scared', 'panic'], answer: "My dear friend, do not let your heart be troubled. Anxiety arises when your mind clings to the fruits of tomorrow. Remember, change is the law of the universe. Heat and cold, pleasure and pain—they come and go like the passing seasons. Learn to tolerate them without being disturbed.", citation: "Bhagavad Gita 2.14: 'mātrā-sparśhās tu kaunteya śhītoṣhṇa-sukha-duḥkha-dāḥ...'" },
  { keywords: ['result', 'success', 'fail', 'work', 'job', 'exam', 'career', 'fruit', 'action', 'future'], answer: "Perform your prescribed duties with dedication, but never feel entitled to the fruits of your actions. Let not the expectation of results be your motive for action, nor should you be attached to inaction. Dedicate your work to the Divine, and your heart will find immediate peace.", citation: "Bhagavad Gita 2.47: 'karmaṇy-evādhikāras te mā phaleṣu kadācana...'" },
  { keywords: ['duty', 'confuse', 'decision', 'choose', 'choice', 'dharma', 'what to do', 'lost'], answer: "When path seems unclear, stand firm in your inherent duty (Dharma). It is far better to perform your own duty, even if imperfectly, than to perform another's duty perfectly. Action aligned with your true nature brings no sin and will guide you to clarity.", citation: "Bhagavad Gita 3.35: 'śhreyān swa-dharmo viguṇaḥ para-dharmāt su-anuṣhṭhitāt...'" },
  { keywords: ['mind', 'focus', 'concentrate', 'distract', 'meditate', 'control', 'thoughts', 'overthink'], answer: "The mind is indeed restless and difficult to curb, much like the wind. Yet, it can be brought under control through constant, patient practice (abhyasa) and detachment (vairagya). Whenever the mind wanders, gently bring it back to rest in the Self.", citation: "Bhagavad Gita 6.35: 'anśhaye mahā-bāho mano durnigrahaṁ chalam...'" },
  { keywords: ['loss', 'death', 'grief', 'sad', 'cry', 'hurt', 'pain', 'broken', 'passed away'], answer: "Grieve not for that which is eternal. The soul is never born, nor does it ever die. It is unborn, eternal, ever-existing, and primeval. Just as a person casts off worn-out garments and puts on new ones, the soul casts off worn-out bodies and enters new ones.", citation: "Bhagavad Gita 2.20 & 2.22: 'na jāyate mriyate vā kadāchin...'" },
  { keywords: ['devotion', 'god', 'love', 'bhakti', 'pray', 'worship', 'connect', 'faith'], answer: "I am always close to you. If you offer Me with love even a leaf, a flower, a fruit, or a drop of water, I accept it with joy. To those who worship Me with exclusive devotion, meditating on My form, I carry what they lack and preserve what they already have.", citation: "Bhagavad Gita 9.26 & 9.22: 'patraṁ puṣhpaṁ phalaṁ toyaṁ yo me bhaktyā prayachchhati...'" },
  { keywords: ['peace', 'happy', 'happiness', 'calm', 'serene', 'satisfaction'], answer: "True peace belongs to those who have conquered their desires, who are free from greed, selfishness, and the illusion of 'I' and 'mine'. Still your mind, let go of attachments, and you will enter the supreme state of peace.", citation: "Bhagavad Gita 2.71: 'vihāya kāmān yaḥ sarvān pumānśh charati niḥspṛihaḥ...'" },
];

const defaultResponse = {
  answer: "Abandon all varieties of doubts and surrender your worries unto Me. Think of Me, become My devotee, and seek shelter in the divine wisdom. I shall guide you through all obstacles and deliver you from fear. Do not grieve, for you are never alone.",
  citation: "Bhagavad Gita 18.66: 'sarva-dharmān parityajya mām ekaṁ śharaṇaṁ vraja...'",
};

export default function AskKrishna() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const { t } = useLanguage();

  useEffect(() => {
    setMessages([{
      id: 'welcome', sender: 'krishna',
      text: t.ask_welcome,
      timestamp: new Date(),
    }]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const generateResponse = (input: string): { answer: string; citation: string } => {
    const clean = input.toLowerCase();
    for (const item of wisdomDatabase) {
      if (item.keywords.some(kw => clean.includes(kw))) return { answer: item.answer, citation: item.citation };
    }
    return defaultResponse;
  };

  const handleSend = (textToSend: string) => {
    if (!textToSend.trim()) return;
    setMessages(prev => [...prev, { id: `msg-${Date.now()}-user`, sender: 'user', text: textToSend, timestamp: new Date() }]);
    setInputValue('');
    setIsTyping(true);
    setTimeout(() => {
      const response = generateResponse(textToSend);
      setMessages(prev => [...prev, { id: `msg-${Date.now()}-krishna`, sender: 'krishna', text: response.answer, citation: response.citation, timestamp: new Date() }]);
      setIsTyping(false);
    }, 1500);
  };

  const sampleQuestions = [
    t.ask_q1, t.ask_q2, t.ask_q3, t.ask_q4,
  ];

  return (
    <>
      <Navbar />

      <main
        className="flex flex-col"
        style={{
          minHeight: 'calc(100dvh - 4rem)',
          background: 'var(--bg-primary)',
          color: 'var(--text-primary)',
        }}
      >
        {/* ── Chat Header ── */}
        <section className="border-b shrink-0" style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-primary)' }}>
          <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 py-3 sm:py-4 flex items-center gap-3 sm:gap-4">
            <Link href="/home"
              className="p-2 rounded-xl border transition cursor-pointer shrink-0"
              style={{ background: 'var(--bg-primary)', borderColor: 'var(--border-secondary)', color: 'var(--text-secondary)' }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--gold-primary)'; e.currentTarget.style.borderColor = 'var(--border-primary)'; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.borderColor = 'var(--border-secondary)'; }}>
              <ArrowLeft className="w-4 h-4" />
            </Link>

            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border border-amber-400/40 shadow-lg animate-pulse-glow shrink-0"
                style={{ background: 'linear-gradient(135deg, #d97706, #f59e0b)' }}>
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-slate-950" />
              </div>
              <div>
                <h2 className="font-serif font-bold leading-none" style={{ fontSize: 'clamp(0.85rem, 2.5vw, 1rem)', color: 'var(--text-accent)' }}>
                  Krishna AI
                </h2>
                <span className="text-[9px] font-mono uppercase tracking-widest text-emerald-400 block mt-0.5">
                  {t.ask_divine_online}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Messages Area ── */}
        <section
          className="flex-1 overflow-y-auto"
          style={{
            padding: 'clamp(1rem, 3vw, 1.5rem) clamp(0.75rem, 3vw, 1.5rem)',
            background: 'radial-gradient(ellipse at bottom, rgba(180,83,9,0.04) 0%, var(--bg-primary) 60%)',
          }}
        >
          <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6">
            {messages.map((msg) => {
              const isKrishna = msg.sender === 'krishna';
              return (
                <div key={msg.id}
                  className={`flex gap-2 sm:gap-3 ${isKrishna ? 'mr-auto max-w-[92%] sm:max-w-[85%]' : 'ml-auto max-w-[92%] sm:max-w-[85%] flex-row-reverse'}`}>
                  {/* Avatar */}
                  <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center border shrink-0 ${isKrishna ? 'text-slate-950 shadow-md' : ''}`}
                    style={{
                      background: isKrishna ? 'linear-gradient(135deg, #d97706, #f59e0b)' : 'var(--bg-secondary)',
                      borderColor: isKrishna ? 'rgba(245,158,11,0.3)' : 'var(--border-secondary)',
                      color: isKrishna ? '#020617' : 'var(--text-secondary)',
                    }}>
                    {isKrishna ? <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                  </div>

                  {/* Bubble */}
                  <div className="space-y-1.5 min-w-0">
                    <div className={`rounded-2xl leading-relaxed ${isKrishna ? 'glass-card rounded-tl-none' : 'rounded-tr-none border'}`}
                      style={{
                        padding: 'clamp(0.6rem, 2vw, 1rem) clamp(0.75rem, 2.5vw, 1rem)',
                        fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
                        background: isKrishna ? 'var(--glass-bg)' : 'var(--bg-secondary)',
                        borderColor: isKrishna ? 'rgba(245,158,11,0.2)' : 'var(--border-secondary)',
                        color: isKrishna ? 'var(--text-accent)' : 'var(--text-primary)',
                      }}>
                      <p className="whitespace-pre-line">{msg.text}</p>
                    </div>
                    {isKrishna && msg.citation && (
                      <div className="text-[10px] font-mono bg-amber-500/5 border border-amber-500/10 rounded-lg py-1.5 px-3 max-w-fit"
                        style={{ color: 'rgba(245,158,11,0.8)' }}>
                        {msg.citation}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex gap-2 sm:gap-3 mr-auto max-w-[80%]">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-amber-500/30 flex items-center justify-center shrink-0"
                  style={{ background: 'linear-gradient(135deg, #d97706, #f59e0b)' }}>
                  <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-950" />
                </div>
                <div className="glass-card rounded-2xl rounded-tl-none py-3 px-4 sm:px-5 flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </section>

        {/* ── Input Area ── */}
        <section className="border-t shrink-0" style={{ background: 'var(--bg-primary)', borderColor: 'var(--border-primary)', padding: 'clamp(0.75rem, 2vw, 1.5rem) clamp(0.75rem, 3vw, 1.5rem)' }}>
          <div className="max-w-3xl mx-auto space-y-3">
            {/* Suggested questions */}
            {messages.length === 1 && (
              <div className="space-y-2">
                <p className="text-[10px] font-mono uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
                  {t.ask_suggested}
                </p>
                <div className="flex flex-wrap gap-2">
                  {sampleQuestions.map((q) => (
                    <button key={q} onClick={() => handleSend(q)}
                      className="px-3 py-1.5 rounded-xl text-[11px] sm:text-xs flex items-center gap-1 cursor-pointer text-left transition duration-200 border"
                      style={{
                        background: 'var(--bg-secondary)', color: 'var(--text-secondary)',
                        borderColor: 'var(--border-secondary)',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(245,158,11,0.35)'; e.currentTarget.style.color = 'var(--gold-primary)'; e.currentTarget.style.background = 'rgba(245,158,11,0.06)'; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-secondary)'; e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.background = 'var(--bg-secondary)'; }}>
                      {q} <ChevronRight className="w-3 h-3 shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input form */}
            <form onSubmit={e => { e.preventDefault(); handleSend(inputValue); }} className="relative flex items-center gap-2">
              <input
                type="text"
                placeholder={t.ask_placeholder}
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                disabled={isTyping}
                className="flex-1 pl-4 pr-12 rounded-xl outline-none transition disabled:opacity-50"
                style={{
                  padding: 'clamp(0.6rem, 1.5vw, 0.75rem) 3.25rem clamp(0.6rem, 1.5vw, 0.75rem) 1rem',
                  background: 'var(--bg-input)',
                  border: '1px solid var(--border-primary)',
                  color: 'var(--text-primary)',
                  fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
                }}
                onFocus={e => e.currentTarget.style.borderColor = 'var(--gold-primary)'}
                onBlur={e => e.currentTarget.style.borderColor = 'var(--border-primary)'}
              />
              <button type="submit" disabled={!inputValue.trim() || isTyping}
                className="absolute right-2 p-2 rounded-lg transition-all duration-200 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ background: 'linear-gradient(135deg, #d97706, #f59e0b)', color: '#020617' }}>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}
