'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BookOpen, ArrowRight, Sparkles } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { useLanguage } from '@/context/LanguageContext';

const sampleShloka = {
  chapter: 2, verse: 47,
  sanskrit: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन |\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि ||',
  transliteration: "karmaṇy-evādhikāras te mā phaleṣu kadācana |\nmā karma-phala-hetur bhūr mā te saṅgo 'stv akarmaṇi ||",
  english: "You have a right to perform your prescribed duties, but you are not entitled to the fruits of your actions. Never consider yourself the cause of results, nor be attached to inaction.",
};

const chapters = [
  { id: 1,  chapter_number: 1,  verses_count: 47,  name: 'Arjuna Vishada Yoga',             sanskritName: 'अर्जुनविषादयोग',              translation: 'The Distress of Arjuna',           summary: 'Arjuna, overwhelmed by grief and moral conflict on the battlefield, surrenders to Krishna for guidance.',                                      image: '/images/chapters/ch1.png',  pos: 'center top' },
  { id: 2,  chapter_number: 2,  verses_count: 72,  name: 'Sankhya Yoga',                    sanskritName: 'सांख्ययोग',                    translation: 'The Yoga of Knowledge',            summary: 'Krishna summarizes the entire wisdom of the Gita, explaining the eternal nature of the soul and selfless duty.',                                image: '/images/chapters/ch2.png',  pos: 'center 20%' },
  { id: 3,  chapter_number: 3,  verses_count: 43,  name: 'Karma Yoga',                      sanskritName: 'कर्मयोग',                      translation: 'The Yoga of Action',               summary: 'The science of selfless service, teaching how to act in the material world without generating karma.',                                          image: '/images/chapters/ch3.png',  pos: 'center 30%' },
  { id: 4,  chapter_number: 4,  verses_count: 42,  name: 'Jnana Karma Sannyasa Yoga',       sanskritName: 'ज्ञानकर्मसंन्यासयोग',         translation: 'The Yoga of Knowledge & Action',  summary: 'Krishna reveals the path of eternal wisdom, the purpose of divine avatars, and the nature of sacrifice.',                                       image: '/images/chapters/ch4.png',  pos: 'center top' },
  { id: 5,  chapter_number: 5,  verses_count: 29,  name: 'Karma Sannyasa Yoga',             sanskritName: 'कर्मसंन्यासयोग',              translation: 'The Yoga of Renunciation',         summary: 'A deep comparison between dry renunciation of action and acting in devotion. Devotion is shown to be superior.',                                image: '/images/chapters/ch5.png',  pos: 'center 25%' },
  { id: 6,  chapter_number: 6,  verses_count: 47,  name: 'Dhyana Yoga',                     sanskritName: 'ध्यानयोग',                     translation: 'The Yoga of Meditation',           summary: 'Krishna explains the practice of yoga, mind control, and meditation techniques to attain connection with the soul.',                              image: '/images/chapters/ch6.png',  pos: 'center 20%' },
  { id: 7,  chapter_number: 7,  verses_count: 30,  name: 'Jnana Vijnana Yoga',              sanskritName: 'ज्ञानविज्ञानयोग',             translation: 'The Yoga of Wisdom & Realization', summary: 'Krishna teaches how the material and spiritual energies combine to form all creation, and how to know him.',                                     image: '/images/chapters/ch7.png',  pos: 'center 35%' },
  { id: 8,  chapter_number: 8,  verses_count: 28,  name: 'Akshara Brahma Yoga',             sanskritName: 'अक्षरब्रह्मयोग',              translation: 'The Yoga of the Imperishable',     summary: 'Explains the ultimate destiny of the soul, how to achieve the supreme state, and the power of remembering Krishna at death.',                    image: '/images/chapters/ch8.png',  pos: 'center 30%' },
  { id: 9,  chapter_number: 9,  verses_count: 34,  name: 'Raja Vidya Raja Guhya Yoga',      sanskritName: 'राजविद्याराजगुह्ययोग',         translation: 'The Sovereign Science & Secret',   summary: 'Reveals the supreme mystery of divine presence, devotion, and the absolute power of surrender.',                                                 image: '/images/chapters/ch9.png',  pos: 'center 20%' },
  { id: 10, chapter_number: 10, verses_count: 42,  name: 'Vibhuti Yoga',                    sanskritName: 'विभूतियोग',                    translation: 'The Yoga of Divine Glories',       summary: 'Krishna describes his primary infinite forms, powers, and manifestations throughout creation.',                                                   image: '/images/chapters/ch10.png', pos: 'center top' },
  { id: 11, chapter_number: 11, verses_count: 55,  name: 'Vishvarupa Darshana Yoga',        sanskritName: 'विश्वरूपदर्शनयोग',            translation: 'The Yoga of the Cosmic Form',      summary: 'Arjuna beholds the spectacular, terrifying cosmic form (Vishwaroopam) of Krishna containing all universes.',                                    image: '/images/chapters/ch11.png', pos: 'center 35%' },
  { id: 12, chapter_number: 12, verses_count: 20,  name: 'Bhakti Yoga',                     sanskritName: 'भक्तियोग',                     translation: 'The Yoga of Devotion',             summary: 'The ultimate path of pure devotion, loving service, and the qualities of a devotee dear to the Lord.',                                           image: '/images/chapters/ch12.png', pos: 'center 20%' },
  { id: 13, chapter_number: 13, verses_count: 35,  name: 'Kshetra Kshetrajna Vibhaga Yoga', sanskritName: 'क्षेत्रक्षेत्रज्ञविभागयोग',  translation: 'The Knower & The Field',           summary: 'The distinction between the physical body (field), the individual soul (knower), and the Supersoul.',                                            image: '/images/chapters/ch13.png', pos: 'center 30%' },
  { id: 14, chapter_number: 14, verses_count: 27,  name: 'Gunatraya Vibhaga Yoga',          sanskritName: 'गुणत्रयविभागयोग',             translation: 'The Three Modes of Nature',        summary: 'Krishna details the three gunas (modes): goodness, passion, and ignorance, and how to transcend them.',                                          image: '/images/chapters/ch14.png', pos: 'center 30%' },
  { id: 15, chapter_number: 15, verses_count: 20,  name: 'Purushottama Yoga',               sanskritName: 'पुरुषोत्तमयोग',               translation: 'The Supreme Divine Person',        summary: 'The allegory of the inverted Banyan tree representing material existence, and description of the Supreme Self.',                                  image: '/images/chapters/ch15.png', pos: 'center 20%' },
  { id: 16, chapter_number: 16, verses_count: 24,  name: 'Daivasura Sampad Vibhaga Yoga',   sanskritName: 'दैवासुरसम्पद्विभागयोग',       translation: 'The Divine & Demonic Natures',     summary: 'An exploration of virtues leading to liberation and vices leading to material bondage.',                                                          image: '/images/chapters/ch16.png', pos: 'center top' },
  { id: 17, chapter_number: 17, verses_count: 28,  name: 'Shraddhatraya Vibhaga Yoga',      sanskritName: 'श्रद्धात्रयविभागयोग',         translation: 'The Threefold Divisions of Faith', summary: 'How faith, food, sacrifice, austerity, and charity are categorised according to the three gunas.',                                                image: '/images/chapters/ch17.png', pos: 'center 25%' },
  { id: 18, chapter_number: 18, verses_count: 78,  name: 'Moksha Sannyasa Yoga',            sanskritName: 'मोक्षसंन्यासयोग',             translation: 'The Yoga of Liberation',           summary: 'The grand conclusion of the Gita, summarizing all spiritual paths and teaching total surrender to Krishna.',                                      image: '/images/chapters/ch18.png', pos: 'center 30%' },
];

export default function HomePage() {
  const [videoReady, setVideoReady] = useState(false);
  const { t } = useLanguage();

  return (
    <>
      <Navbar />

      <main className="min-h-screen font-sans pb-16 sm:pb-20" style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>

        {/* ── HERO SECTION ── */}
        <section className="relative flex items-center justify-center overflow-hidden border-b"
          style={{ minHeight: 'clamp(60vh, 80vh, 88vh)', borderColor: 'var(--border-primary)' }}>

          <div className="absolute inset-0 z-0" style={{ background: 'var(--bg-primary)' }} />

          <video autoPlay loop muted playsInline preload="auto"
            className="video-upright-fixed"
            style={{ opacity: videoReady ? 1 : 0, transition: 'opacity 1.5s ease' }}
            onCanPlay={() => setVideoReady(true)}
          >
            <source src="/videos/splash_bg.mp4" type="video/mp4" />
            <source src="https://v1.pinimg.com/videos/iht/expMp4/9a/a2/bb/9aa2bb472348ce7f4ac3e63659f9b866_720w.mp4" type="video/mp4" />
          </video>

          <div className="absolute inset-0 z-10" style={{ background: 'linear-gradient(to top, var(--bg-primary) 0%, rgba(2,6,23,0.6) 50%, transparent 100%)' }} />

          <div className="relative z-20 text-center w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 sm:space-y-6 animate-fade-in">
            <h1 style={{
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", Inter, sans-serif',
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              fontWeight: 800, color: 'white',
              lineHeight: 1.1, letterSpacing: '-0.02em', margin: 0,
            }}>
              {t.home_hero_title}
            </h1>

            <p className="font-light mx-auto leading-relaxed"
              style={{ fontSize: 'clamp(0.8rem, 2vw, 1.05rem)', color: 'var(--text-secondary)', maxWidth: '40rem' }}>
              {t.home_hero_desc}
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 pt-4">
              <a href="#chapters-section"
                className="inline-flex items-center justify-center gap-2 font-bold rounded-full transition-all duration-300 shadow-sm cursor-pointer"
                style={{
                  padding: 'clamp(0.7rem, 2vw, 0.875rem) clamp(1.5rem, 4vw, 2.5rem)',
                  background: 'white', color: 'black',
                  fontSize: 'clamp(0.8rem, 1.5vw, 0.95rem)',
                }}>
                <BookOpen className="w-4 h-4 shrink-0" /> {t.home_explore}
              </a>
              <Link href="/ask-krishna"
                className="inline-flex items-center justify-center gap-2 font-bold rounded-full transition-all duration-300 cursor-pointer border"
                style={{
                  padding: 'clamp(0.7rem, 2vw, 0.875rem) clamp(1.5rem, 4vw, 2.5rem)',
                  background: 'rgba(255, 255, 255, 0.1)', color: 'white',
                  borderColor: 'rgba(255, 255, 255, 0.2)', backdropFilter: 'blur(10px)',
                  fontSize: 'clamp(0.8rem, 1.5vw, 0.95rem)',
                }}>
                <Sparkles className="w-4 h-4 shrink-0" /> {t.home_ask_ai}
              </Link>
            </div>
          </div>
        </section>

        {/* ── SHLOKA OF THE DAY ── */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 relative z-30" style={{ marginTop: 'clamp(-3rem, -5vw, -6rem)' }}>
          <div className="apple-card" style={{ padding: 'clamp(1.25rem, 4vw, 2.5rem)' }}>
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

          {/* Responsive grid: 1 col mobile → 2 col tablet → 3 col desktop → 4 col wide */}
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
