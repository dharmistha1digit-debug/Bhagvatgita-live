'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft, Sparkles, Send, User, ChevronRight } from 'lucide-react';
import Navbar from '@/components/Navbar';

interface Message {
  id: string;
  sender: 'user' | 'krishna';
  text: string;
  citation?: string;
  timestamp: Date;
}

// Local mock database for Krishna AI wisdom
const wisdomDatabase = [
  {
    keywords: ['anxiety', 'stress', 'fear', 'depress', 'anxious', 'worry', 'worried', 'tension', 'scared', 'panic'],
    answer: "My dear friend, do not let your heart be troubled. Anxiety arises when your mind clings to the fruits of tomorrow. Remember, change is the law of the universe. Heat and cold, pleasure and pain—they come and go like the passing seasons. Learn to tolerate them without being disturbed.",
    citation: "Bhagavad Gita 2.14: 'mātrā-sparśhās tu kaunteya śhītoṣhṇa-sukha-duḥkha-dāḥ...'"
  },
  {
    keywords: ['result', 'success', 'fail', 'work', 'job', 'exam', 'career', 'fruit', 'action', 'future'],
    answer: "Perform your prescribed duties with dedication, but never feel entitled to the fruits of your actions. Let not the expectation of results be your motive for action, nor should you be attached to inaction. Dedicate your work to the Divine, and your heart will find immediate peace.",
    citation: "Bhagavad Gita 2.47: 'karmaṇy-evādhikāras te mā phaleṣu कदाचन...'"
  },
  {
    keywords: ['duty', 'confuse', 'decision', 'choose', 'choice', 'dharma', 'what to do', 'lost', 'career'],
    answer: "When path seems unclear, stand firm in your inherent duty (Dharma). It is far better to perform your own duty, even if imperfectly, than to perform another's duty perfectly. Action aligned with your true nature brings no sin and will guide you to clarity.",
    citation: "Bhagavad Gita 3.35: 'śhreyān swa-dharmo viguṇaḥ para-dharmāt su-anuṣhṭhitāt...'"
  },
  {
    keywords: ['mind', 'focus', 'concentrate', 'distract', 'meditate', 'control', 'thoughts', 'overthink'],
    answer: "The mind is indeed restless and difficult to curb, much like the wind. Yet, it can be brought under control through constant, patient practice (abhyasa) and detachment (vairagya). Whenever the mind wanders, gently bring it back to rest in the Self.",
    citation: "Bhagavad Gita 6.35: 'anśhaye mahā-bāho mano durnigrahaṁ chalam...'"
  },
  {
    keywords: ['loss', 'death', 'grief', 'sad', 'cry', 'hurt', 'pain', 'broken', 'relatives', 'passed away'],
    answer: "Grieve not for that which is eternal. The soul is never born, nor does it ever die. It is unborn, eternal, ever-existing, and primeval. Just as a person casts off worn-out garments and puts on new ones, the soul casts off worn-out bodies and enters new ones. Weapons cannot cut it, nor fire burn it.",
    citation: "Bhagavad Gita 2.20 & 2.22: 'na jāyate mriyate vā kadāchin...'"
  },
  {
    keywords: ['devotion', 'god', 'love', 'bhakti', 'pray', 'worship', 'connect', 'faith'],
    answer: "I am always close to you. If you offer Me with love even a leaf, a flower, a fruit, or a drop of water, I accept it with joy. To those who worship Me with exclusive devotion, meditating on My form, I carry what they lack and preserve what they already have.",
    citation: "Bhagavad Gita 9.26 & 9.22: 'patraṁ puṣhpaṁ phalaṁ toyaṁ yo me bhaktyā prayachchhati...'"
  },
  {
    keywords: ['peace', 'happy', 'happiness', 'calm', 'serene', 'satisfaction'],
    answer: "True peace belongs to those who have conquered their desires, who are free from greed, selfishness, and the illusion of 'I' and 'mine'. Still your mind, let go of attachments, and you will enter the supreme state of peace.",
    citation: "Bhagavad Gita 2.71: 'vihāya kāmān yaḥ sarvān pumānśh charati niḥspṛihaḥ...'"
  }
];

const defaultResponse = {
  answer: "Abandon all varieties of doubts and surrender your worries unto Me. Think of Me, become My devotee, and seek shelter in the divine wisdom. I shall guide you through all obstacles and deliver you from fear. Do not grieve, for you are never alone.",
  citation: "Bhagavad Gita 18.66: 'sarva-dharmān parityajya mām ekaṁ śharaṇaṁ vraja...'"
};

export default function AskKrishna() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Initialize with greeting
  useEffect(() => {
    setMessages([
      {
        id: 'welcome',
        sender: 'krishna',
        text: "Radhe Radhe! I am Krishna. In the middle of life's battlefield, when doubts cloud your mind and duty feels heavy, speak to me. What troubles your soul today, my friend?",
        timestamp: new Date()
      }
    ]);
  }, []);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: Message = {
      id: `msg-${Date.now()}-user`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Simulate divine reflection
    setTimeout(() => {
      const response = generateResponse(textToSend);
      const krishnaMsg: Message = {
        id: `msg-${Date.now()}-krishna`,
        sender: 'krishna',
        text: response.answer,
        citation: response.citation,
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, krishnaMsg]);
      setIsTyping(false);
    }, 1500);
  };

  const generateResponse = (input: string): { answer: string; citation: string } => {
    const cleanInput = input.toLowerCase();
    
    // Search database for matching keywords
    for (const item of wisdomDatabase) {
      if (item.keywords.some((kw) => cleanInput.includes(kw))) {
        return {
          answer: item.answer,
          citation: item.citation
        };
      }
    }

    return defaultResponse;
  };

  const sampleQuestions = [
    "How do I deal with stress and anxiety?",
    "What should I do when I am confused about my duty?",
    "How can I control my wandering mind?",
    "How to cope with the pain of losing someone?"
  ];

  return (
    <>
      <Navbar />

      <main className="min-h-[calc(100vh-4rem)] bg-slate-950 text-slate-100 flex flex-col">
        
        {/* Chat Header */}
        <section className="bg-slate-900/60 border-b border-amber-900/10 px-6 py-4 flex items-center justify-between">
          <div className="max-w-4xl mx-auto w-full flex items-center gap-4">
            <Link href="/" className="p-2 rounded-xl bg-slate-950 hover:bg-amber-500/10 text-slate-400 hover:text-amber-400 border border-slate-900 transition cursor-pointer">
              <ArrowLeft className="w-4 h-4" />
            </Link>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-600 to-yellow-500 flex items-center justify-center border border-amber-400/40 shadow-lg shadow-amber-500/10 animate-pulse-glow">
                <Sparkles className="w-5 h-5 text-slate-950" />
              </div>
              <div>
                <h2 className="font-serif font-bold text-amber-200 text-sm md:text-base leading-none">Krishna AI</h2>
                <span className="text-[9px] font-mono uppercase tracking-widest text-emerald-400 block mt-1">Divine Presence Online</span>
              </div>
            </div>
          </div>
        </section>

        {/* Chat Messages Area */}
        <section className="flex-1 overflow-y-auto px-6 py-6 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-amber-950/10 via-slate-950 to-slate-950">
          <div className="max-w-3xl mx-auto space-y-6">
            
            {messages.map((msg) => {
              const isKrishna = msg.sender === 'krishna';
              return (
                <div 
                  key={msg.id}
                  className={`flex gap-3 max-w-[85%] ${isKrishna ? 'mr-auto' : 'ml-auto flex-row-reverse'}`}
                >
                  {/* Avatar */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border shrink-0 ${isKrishna ? 'bg-gradient-to-tr from-amber-600 to-yellow-500 border-amber-500/30 text-slate-950 shadow-md shadow-amber-500/10' : 'bg-slate-800 border-slate-700 text-slate-300'}`}>
                    {isKrishna ? <Sparkles className="w-4.5 h-4.5" /> : <User className="w-4 h-4" />}
                  </div>

                  {/* Message Bubble */}
                  <div className="space-y-2">
                    <div className={`p-4 rounded-2xl text-xs md:text-sm leading-relaxed ${isKrishna ? 'glass-card border-amber-500/20 text-amber-100 rounded-tl-none' : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tr-none'}`}>
                      <p className="whitespace-pre-line">{msg.text}</p>
                    </div>
                    
                    {/* Citation / Sloka Verse */}
                    {isKrishna && msg.citation && (
                      <div className="text-[10px] font-mono text-amber-400/80 bg-amber-500/5 border border-amber-500/10 rounded-lg py-1.5 px-3 max-w-fit shadow-sm">
                        {msg.citation}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex gap-3 max-w-[80%] mr-auto">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-600 to-yellow-500 border border-amber-500/30 text-slate-950 flex items-center justify-center shrink-0 shadow-md">
                  <Sparkles className="w-4.5 h-4.5" />
                </div>
                <div className="glass-card border-amber-500/20 text-amber-100 rounded-2xl rounded-tl-none py-3 px-5 flex items-center justify-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </section>

        {/* Input & Quick suggestions */}
        <section className="bg-slate-950 border-t border-amber-900/10 p-6">
          <div className="max-w-3xl mx-auto space-y-4">
            
            {/* Quick Questions suggestion */}
            {messages.length === 1 && (
              <div className="space-y-2">
                <p className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Suggested Inquiries:</p>
                <div className="flex flex-wrap gap-2">
                  {sampleQuestions.map((q) => (
                    <button 
                      key={q}
                      onClick={() => handleSend(q)}
                      className="px-3.5 py-2 bg-slate-900 hover:bg-amber-500/10 border border-slate-850 hover:border-amber-500/30 rounded-xl text-xs text-slate-300 hover:text-amber-300 transition duration-300 flex items-center gap-1 cursor-pointer text-left shadow-sm"
                    >
                      {q} <ChevronRight className="w-3 h-3" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Form */}
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(inputValue);
              }}
              className="relative flex items-center"
            >
              <input 
                type="text" 
                placeholder="Seek spiritual guidance from Krishna..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={isTyping}
                className="w-full pl-4 pr-14 py-3 bg-slate-900/90 border border-amber-900/40 rounded-xl text-xs md:text-sm text-amber-100 placeholder-slate-500 focus:outline-none focus:border-amber-500 transition shadow-inner disabled:opacity-50"
              />
              <button 
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                className="absolute right-2 p-2 bg-gradient-to-r from-amber-600 to-amber-500 text-slate-950 rounded-lg hover:from-amber-500 hover:to-yellow-500 transition-all duration-300 shadow shadow-amber-500/10 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </section>

      </main>
    </>
  );
}
