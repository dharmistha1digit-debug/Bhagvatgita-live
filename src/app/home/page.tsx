
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BookOpen, ArrowRight, Sparkles } from 'lucide-react';
import Navbar from '@/components/Navbar';

const sampleShloka = {
  chapter: 2,
  verse: 47,
  sanskrit: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन |\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि ||',
  transliteration: "karmaṇy-evādhikāras te mā phaleṣu kadācana |\nmā karma-phala-hetur bhūr mā te saṅgo 'stv akarmaṇi ||",
  english:
    "You have a right to perform your prescribed duties, but you are not entitled to the fruits of your actions. Never consider yourself to be the cause of the results of your activities, nor be attached to inactive inaction.",
};

const chapters = [
  { id: 1,  chapter_number: 1,  verses_count: 47,  name: 'Arjuna Vishada Yoga',              sanskritName: 'अर्जुनविषादयोग',              translation: 'The Distress of Arjuna',           summary: 'Arjuna, overwhelmed by grief and moral conflict on the battlefield, surrenders to Krishna for guidance.',                                                       image: '/images/chapters/ch1.png',  pos: 'center top' },
  { id: 2,  chapter_number: 2,  verses_count: 72,  name: 'Sankhya Yoga',                     sanskritName: 'सांख्ययोग',                   translation: 'The Yoga of Knowledge',            summary: 'Krishna summarizes the entire wisdom of the Gita, explaining the eternal nature of the soul and selfless duty.',                                              image: '/images/chapters/ch2.png',  pos: 'center 20%' },
  { id: 3,  chapter_number: 3,  verses_count: 43,  name: 'Karma Yoga',                       sanskritName: 'कर्मयोग',                     translation: 'The Yoga of Action',               summary: 'The science of selfless service, teaching how to act in the material world without generating karma.',                                                         image: '/images/chapters/ch3.png',  pos: 'center 30%' },
  { id: 4,  chapter_number: 4,  verses_count: 42,  name: 'Jnana Karma Sannyasa Yoga',        sanskritName: 'ज्ञानकर्मसंन्यासयोग',        translation: 'The Yoga of Knowledge & Action',   summary: 'Krishna reveals the path of eternal wisdom, the purpose of divine avatars, and the nature of sacrifice.',                                                     image: '/images/chapters/ch4.png',  pos: 'center top' },
  { id: 5,  chapter_number: 5,  verses_count: 29,  name: 'Karma Sannyasa Yoga',              sanskritName: 'कर्मसंन्यासयोग',             translation: 'The Yoga of Renunciation',         summary: 'A deep comparison between dry renunciation of action and acting in devotion. Devotion is shown to be superior.',                                               image: '/images/chapters/ch5.png',  pos: 'center 25%' },
  { id: 6,  chapter_number: 6,  verses_count: 47,  name: 'Dhyana Yoga',                      sanskritName: 'ध्यानयोग',                    translation: 'The Yoga of Meditation',           summary: 'Krishna explains the practice of yoga, mind control, and meditation techniques to attain connection with the soul.',                                            image: '/images/chapters/ch6.png',  pos: 'center 20%' },
  { id: 7,  chapter_number: 7,  verses_count: 30,  name: 'Jnana Vijnana Yoga',               sanskritName: 'ज्ञानविज्ञानयोग',            translation: 'The Yoga of Wisdom & Realization', summary: 'Krishna teaches how the material and spiritual energies combine to form all creation, and how to know him.',                                                   image: '/images/chapters/ch7.png',  pos: 'center 35%' },
  { id: 8,  chapter_number: 8,  verses_count: 28,  name: 'Akshara Brahma Yoga',              sanskritName: 'अक्षरब्रह्मयोग',             translation: 'The Yoga of the Imperishable',     summary: 'Explains the ultimate destiny of the soul, how to achieve the supreme state, and the power of remembering Krishna at death.',                                  image: '/images/chapters/ch8.png',  pos: 'center 30%' },
  { id: 9,  chapter_number: 9,  verses_count: 34,  name: 'Raja Vidya Raja Guhya Yoga',       sanskritName: 'राजविद्याराजगुह्ययोग',      translation: 'The Sovereign Science & Secret',   summary: 'Reveals the supreme mystery of divine presence, devotion, and the absolute power of surrender.',                                                               image: '/images/chapters/ch9.png',  pos: 'center 20%' },
  { id: 10, chapter_number: 10, verses_count: 42,  name: 'Vibhuti Yoga',                     sanskritName: 'विभूतियोग',                  translation: 'The Yoga of Divine Glories',       summary: 'Krishna describes his primary infinite forms, powers, and manifestations throughout creation.',                                                                 image: '/images/chapters/ch10.png', pos: 'center top' },
  { id: 11, chapter_number: 11, verses_count: 55,  name: 'Vishvarupa Darshana Yoga',         sanskritName: 'विश्वरूपदर्शनयोग',          translation: 'The Yoga of the Cosmic Form',      summary: 'Arjuna beholds the spectacular, terrifying cosmic form (Vishwaroopam) of Krishna containing all universes.',                                                  image: '/images/chapters/ch11.png', pos: 'center 35%' },
  { id: 12, chapter_number: 12, verses_count: 20,  name: 'Bhakti Yoga',                      sanskritName: 'भक्तियोग',                   translation: 'The Yoga of Devotion',             summary: 'The ultimate path of pure devotion, loving service, and the qualities of a devotee dear to the Lord.',                                                         image: '/images/chapters/ch12.png', pos: 'center 20%' },
  { id: 13, chapter_number: 13, verses_count: 35,  name: 'Kshetra Kshetrajna Vibhaga Yoga',  sanskritName: 'क्षेत्रक्षेत्रज्ञविभागयोग',translation: 'The Knower & The Field',           summary: 'The distinction between the physical body (field), the individual soul (knower), and the Supersoul.',                                                          image: '/images/chapters/ch13.png', pos: 'center 30%' },
  { id: 14, chapter_number: 14, verses_count: 27,  name: 'Gunatraya Vibhaga Yoga',           sanskritName: 'गुणत्रयविभागयोग',           translation: 'The Three Modes of Nature',        summary: 'Krishna details the three gunas (modes): goodness, passion, and ignorance, and how to transcend them.',                                                        image: '/images/chapters/ch14.png', pos: 'center 30%' },
  { id: 15, chapter_number: 15, verses_count: 20,  name: 'Purushottama Yoga',                sanskritName: 'पुरुषोत्तमयोग',             translation: 'The Supreme Divine Person',        summary: 'The allegory of the inverted Banyan tree representing material existence, and description of the Supreme Self.',                                                image: '/images/chapters/ch15.png', pos: 'center 20%' },
  { id: 16, chapter_number: 16, verses_count: 24,  name: 'Daivasura Sampad Vibhaga Yoga',    sanskritName: 'दैवासुरसम्पद्विभागयोग',    translation: 'The Divine & Demonic Natures',     summary: 'An exploration of virtues leading to liberation and vices leading to material bondage.',                                                                        image: '/images/chapters/ch16.png', pos: 'center top' },
  { id: 17, chapter_number: 17, verses_count: 28,  name: 'Shraddhatraya Vibhaga Yoga',       sanskritName: 'श्रद्धात्रयविभागयोग',      translation: 'The Threefold Divisions of Faith', summary: 'How faith, food, sacrifice, austerity, and charity are categorised according to the three gunas.',                                                              image: '/images/chapters/ch17.png', pos: 'center 25%' },
  { id: 18, chapter_number: 18, verses_count: 78,  name: 'Moksha Sannyasa Yoga',             sanskritName: 'मोक्षसंन्यासयोग',          translation: 'The Yoga of Liberation',           summary: 'The grand conclusion of the Gita, summarizing all spiritual paths and teaching total surrender to Krishna.',                                                     image: '/images/chapters/ch18.png', pos: 'center 30%' },
];



export default function HomePage() {
  const [videoReady, setVideoReady] = useState(false);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-20">

        {/* 🌟 HERO SECTION WITH VIDEO BACKDROP */}
        <section className="relative h-[85vh] flex items-center justify-center overflow-hidden border-b border-amber-900/30">

          {/* Dark BG shown always so no flash before video */}
          <div className="absolute inset-0 bg-slate-950 z-0" />

          {/* Hero Video Background - fades in only once loaded */}
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="absolute z-0 rotated-hero-video"
            style={{
              filter: 'brightness(1.35) saturate(1.2)',
              opacity: videoReady ? 0.85 : 0,
              transition: 'opacity 1.2s ease',
            }}
            onCanPlay={() => setVideoReady(true)}
          >
            <source src="https://v1.pinimg.com/videos/iht/expMp4/9a/a2/bb/9aa2bb472348ce7f4ac3e63659f9b866_720w.mp4" type="video/mp4" />
          </video>

          {/* Ambient Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent z-10" />
          <div className="absolute inset-0 bg-slate-950/20 z-10" />

          {/* Hero Content */}
          <div className="relative z-20 text-center max-w-4xl px-8 space-y-6 animate-fade-in" style={{ overflow: 'visible' }}>

            <h1
              style={{
                fontFamily: 'Georgia, serif',
                fontSize: 'clamp(2.2rem, 5.5vw, 4rem)',
                fontWeight: 800,
                color: '#fef3c7',
                textShadow: '0 0 30px rgba(245,158,11,0.7), 0 0 60px rgba(245,158,11,0.3)',
                lineHeight: 1.2,
                letterSpacing: '0.03em',
                margin: 0,
              }}
            >
              श्रीमद्भगवद्गीता
            </h1>

            <p className="text-base md:text-lg text-slate-300 font-light max-w-2xl mx-auto leading-relaxed">
              Experience the absolute wisdom of the cosmos. Read all 18 Chapters and 700 verses,
              study commentaries from ancient scholars, and converse with Lord Krishna&apos;s AI avatar.
            </p>

            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <a
                href="#chapters-section"
                className="flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-yellow-500 text-slate-950 font-bold rounded-xl text-xs uppercase tracking-wider transition-all duration-300 shadow-lg shadow-amber-500/10 cursor-pointer"
              >
                <BookOpen className="w-4 h-4" /> Explore Chapters
              </a>
              <Link
                href="/ask-krishna"
                className="flex items-center gap-2 px-8 py-3.5 bg-slate-900/80 hover:bg-slate-800 text-amber-300 border border-amber-500/30 font-bold rounded-xl text-xs uppercase tracking-wider backdrop-blur-md transition-all duration-300 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-400" /> Ask Krishna AI
              </Link>
            </div>
          </div>
        </section>

        {/* 🕉️ SHLOKA OF THE DAY SECTION */}
        <section className="max-w-5xl mx-auto -mt-24 relative z-30 px-6">
          <div className="parchment-card p-8 md:p-10 rounded-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-amber-700/20">
              <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold">
                Shloka of the Day • BG {sampleShloka.chapter}.{sampleShloka.verse}
              </span>
              <Link
                href={`/chapter/${sampleShloka.chapter}/verse/${sampleShloka.verse}`}
                className="text-xs font-bold text-amber-400 hover:text-amber-200 transition uppercase tracking-wider"
              >
                View Translation &rarr;
              </Link>
            </div>

            <div className="py-8 text-center space-y-6">
              <p className="text-2xl md:text-3xl font-serif text-amber-100 leading-relaxed font-bold whitespace-pre-line shloka-sanskrit">
                {sampleShloka.sanskrit}
              </p>
              <p className="text-xs md:text-sm text-amber-300/60 italic font-mono max-w-3xl mx-auto">
                &quot;{sampleShloka.transliteration}&quot;
              </p>
              <p className="text-sm md:text-base text-amber-200/90 leading-relaxed max-w-2xl mx-auto border-t border-amber-900/30 pt-6">
                {sampleShloka.english}
              </p>
            </div>
          </div>
        </section>

        {/* 📜 CHAPTERS GRID */}
        <section id="chapters-section" className="max-w-6xl mx-auto px-6 py-24 scroll-mt-16">
          <div className="text-center space-y-2 mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-100">The 18 Chapters</h2>
            <p className="text-amber-500/80 text-xs font-mono uppercase tracking-widest font-semibold">
              Journey through eternal divine dialogue
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {chapters.map((ch) => (
              <Link
                href={`/chapter/${ch.chapter_number}`}
                key={ch.id}
                className="group glass-card rounded-2xl overflow-hidden flex flex-col cursor-pointer"
              >
                {/* Chapter Banner Image */}
                <div className="relative h-52 w-full bg-slate-900 overflow-hidden">
                  <Image
                    src={ch.image}
                    alt={ch.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-75 group-hover:opacity-95"
                    style={{ objectPosition: ch.pos, filter: 'brightness(1.1) saturate(1.1)' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/10 to-transparent" />

                  <div className="absolute top-4 left-4">
                    <span className="text-[10px] font-mono text-amber-400 font-bold bg-slate-950/80 border border-amber-500/30 px-3 py-1 rounded-full backdrop-blur-sm">
                      Chapter {ch.chapter_number}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-serif font-bold text-amber-100 leading-tight">{ch.sanskritName}</h3>
                    <p className="text-[11px] font-semibold text-amber-400">{ch.name}</p>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 block">
                      {ch.translation}
                    </span>
                    <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">{ch.summary}</p>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-3 border-t border-slate-900/60">
                    <span className="text-slate-500 font-medium">{ch.verses_count} Verses</span>
                    <span className="flex items-center text-amber-400 font-bold group-hover:translate-x-1 transition duration-300">
                      Explore Chapter <ArrowRight className="w-3.5 h-3.5 ml-1" />
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
