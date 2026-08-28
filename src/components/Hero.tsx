import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowDownRight, Github, Linkedin, Instagram, Facebook, MapPin, ArrowRight } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { CursorState } from './CustomCursor';

interface HeroProps {
  setCursorState: (state: CursorState) => void;
}

// Character-by-character reveal
const CharReveal = ({ text, delay = 0, className = '' }: { text: string; delay?: number; className?: string }) => (
  <span className={`inline-flex overflow-hidden ${className}`} aria-label={text}>
    {text.split('').map((char, i) => (
      <motion.span
        key={i}
        initial={{ y: '110%', opacity: 0 }}
        animate={{ y: '0%', opacity: 1 }}
        transition={{ duration: 0.65, delay: delay + i * 0.048, ease: [0.22, 1, 0.36, 1] }}
        className="inline-block"
      >
        {char === ' ' ? '\u00A0' : char}
      </motion.span>
    ))}
  </span>
);

// 5 cinematic travel-style landscape images
const bgSlides = [
  {
    src: '/images/travel_coxsbazar.jpg',
    location: "Cox's Bazar, Bangladesh",
    panFrom: { scale: 1.12, x: '-2%', y: '0%' },
    panTo:   { scale: 1.05, x: '2%',  y: '-2%' },
  },
  {
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2000&q=80',
    location: 'Mountain Horizon',
    panFrom: { scale: 1.1, x: '2%',  y: '1%' },
    panTo:   { scale: 1.05, x: '-2%', y: '-1%' },
  },
  {
    src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=80',
    location: 'Coastal Serenity',
    panFrom: { scale: 1.12, x: '0%',  y: '-1%' },
    panTo:   { scale: 1.05, x: '-2%', y: '1%' },
  },
  {
    src: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=2000&q=80',
    location: 'Forest Canopy',
    panFrom: { scale: 1.1, x: '-1%', y: '2%' },
    panTo:   { scale: 1.05, x: '1%', y: '-2%' },
  },
  {
    src: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=2000&q=80',
    location: 'River Valley',
    panFrom: { scale: 1.1, x: '1%',  y: '0%' },
    panTo:   { scale: 1.05, x: '-1%', y: '-2%' },
  },
];

const marqueeItems = [
  'DEVELOPER', '·', 'EXPLORER', '·', 'PHOTOGRAPHER', '·', 'AI / ML ENGINEER', '·',
  'CSE STUDENT', '·', 'PROBLEM SOLVER', '·', 'BUILDER', '·',
  'DEVELOPER', '·', 'EXPLORER', '·', 'PHOTOGRAPHER', '·', 'AI / ML ENGINEER', '·',
  'CSE STUDENT', '·', 'PROBLEM SOLVER', '·', 'BUILDER', '·',
];

const socials = [
  { icon: Facebook,  href: () => personalInfo.socials.facebook,  label: 'FACEBOOK' },
  { icon: Instagram, href: () => personalInfo.socials.instagram, label: 'INSTAGRAM' },
  { icon: Linkedin,  href: () => personalInfo.socials.linkedin,  label: 'LINKEDIN' },
  { icon: Github,    href: () => personalInfo.socials.github,    label: 'GITHUB' },
];

// Cinematic slow crossfade duration
const CROSSFADE_DURATION = 2.4;

export const Hero: React.FC<HeroProps> = ({ setCursorState }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '14%']);

  useEffect(() => {
    const id = setInterval(() => {
      setPrev(active);
      setActive(i => (i + 1) % bgSlides.length);
    }, 5500);
    return () => clearInterval(id);
  }, [active]);

  const slide = bgSlides[active];

  return (
    <section ref={sectionRef} className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#080808]">

      {/* ══ BACKGROUND SYSTEM ══ */}
      <div className="absolute inset-0 z-0 overflow-hidden">

        {/* Previous image — fades out */}
        {prev !== null && (
          <motion.div
            key={`prev-${prev}`}
            className="absolute inset-0"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: CROSSFADE_DURATION, ease: 'easeInOut' }}
          >
            <img
              src={bgSlides[prev].src}
              alt=""
              className="w-full h-full object-cover"
            />
          </motion.div>
        )}

        {/* Current image — cinematic crossfade + Ken Burns */}
        <motion.div
          key={`active-${active}`}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: CROSSFADE_DURATION, ease: 'easeInOut' }}
        >
          <motion.img
            src={slide.src}
            alt=""
            className="w-full h-full object-cover"
            initial={{ scale: slide.panFrom.scale, x: slide.panFrom.x, y: slide.panFrom.y }}
            animate={{ scale: slide.panTo.scale,   x: slide.panTo.x,   y: slide.panTo.y }}
            transition={{ duration: 7, ease: 'linear' }}
          />
        </motion.div>

        {/* Warm cinematic color grade */}
        <div className="absolute inset-0 bg-amber-950/25 mix-blend-multiply pointer-events-none" />

        {/* Vignettes */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/95 via-[#080808]/65 to-[#080808]/20 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-[#080808]/75 pointer-events-none" />

        {/* Subtle warm bottom glow */}
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[400px] rounded-full bg-accent-amber/8 blur-[130px] pointer-events-none" />

        {/* Film grain */}
        <div
          className="absolute inset-0 opacity-[0.055] pointer-events-none mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: '200px',
          }}
        />
      </div>

      {/* Slide indicator dots — bottom center */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {bgSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => { setPrev(active); setActive(i); }}
            aria-label={`Slide ${i + 1}`}
            className="transition-all duration-500"
          >
            <div className={`rounded-full transition-all duration-500 ${
              i === active
                ? 'w-6 h-1.5 bg-accent-amber'
                : 'w-1.5 h-1.5 bg-white/25 hover:bg-white/50'
            }`} />
          </button>
        ))}
      </div>

      {/* Location label — bottom right */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.55 }}
          className="absolute bottom-[4.5rem] right-8 z-20 hidden md:flex items-center gap-2.5 pointer-events-none"
        >
          <span className="h-px w-6 bg-accent-amber/50" />
          <span className="text-[10px] font-mono tracking-[0.2em] text-accent-gold/60 uppercase">
            {bgSlides[active].location}
          </span>
        </motion.div>
      </AnimatePresence>

      {/* ══ MAIN CONTENT ══ */}
      <motion.div
        style={{ y: contentY }}
        className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-12 pt-32 pb-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 items-end">

          {/* LEFT — Identity */}
          <div className="lg:col-span-7 flex flex-col gap-6">

            {/* Status pill */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center gap-3 w-fit"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-amber opacity-50" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-amber" />
              </span>
              <span className="text-[11px] font-mono tracking-[0.2em] text-text-muted/80 uppercase">
                Open to opportunities
              </span>
              <span className="h-px w-5 bg-white/10" />
              <span className="inline-flex items-center gap-1 text-[11px] font-mono text-accent-gold/70">
                <MapPin className="h-3 w-3" /> Dhaka, BD
              </span>
            </motion.div>

            {/* Big Name */}
            <div className="space-y-0">
              <h1 className="font-display font-black uppercase tracking-tighter leading-[0.92]">
                <div className="flex items-end gap-4 overflow-hidden py-1">
                  <span className="text-5xl sm:text-7xl lg:text-[6rem] text-white drop-shadow-sm">
                    <CharReveal text="MEHEDI" delay={0.3} />
                  </span>
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.05, duration: 0.45 }}
                    className="hidden sm:flex flex-col items-start gap-0.5 pb-2 text-[9px] font-mono text-white/30 tracking-[0.18em]"
                  >
                    <span>CSE</span>
                    <span>STUDENT</span>
                    <span className="text-accent-amber/70">2023—</span>
                  </motion.div>
                </div>
                <div className="overflow-hidden py-1">
                  <span className="text-5xl sm:text-7xl lg:text-[6rem] bg-gradient-to-r from-accent-amber via-amber-300 to-yellow-200 bg-clip-text text-transparent">
                    <CharReveal text="HASAN" delay={0.56} />
                  </span>
                </div>
              </h1>
            </div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.05, duration: 0.5, ease: 'easeOut' }}
              className="max-w-md text-sm sm:text-[0.95rem] text-white/55 font-light leading-relaxed border-l-2 border-accent-amber/40 pl-4"
            >
              {personalInfo.subTagline}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.45 }}
              className="flex flex-wrap items-center gap-3"
            >
              <a
                href="#projects"
                onMouseEnter={() => setCursorState({ type: 'project' })}
                onMouseLeave={() => setCursorState({ type: 'default' })}
                className="group inline-flex items-center gap-2 px-6 py-3 bg-accent-amber text-[#080808] rounded-xl font-display font-extrabold text-xs tracking-wider hover:bg-amber-300 transition-all duration-300 shadow-lg shadow-accent-amber/20"
              >
                VIEW PROJECTS
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#contact"
                onMouseEnter={() => setCursorState({ type: 'hover', label: 'TALK' })}
                onMouseLeave={() => setCursorState({ type: 'default' })}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/12 bg-white/5 backdrop-blur-md text-white/80 font-display font-bold text-xs tracking-wider hover:border-accent-amber/50 hover:text-accent-gold transition-all duration-300"
              >
                CONTACT ME
              </a>
            </motion.div>

            {/* Social icons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.5 }}
              className="flex items-center gap-4"
            >
              <span className="text-[10px] font-mono text-white/30 tracking-[0.18em] uppercase">Connect</span>
              <div className="h-px w-5 bg-white/10" />
              <div className="flex items-center gap-2">
                {socials.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href()}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    onMouseEnter={() => setCursorState({ type: 'open', label })}
                    onMouseLeave={() => setCursorState({ type: 'default' })}
                    className="p-2 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm text-white/50 hover:text-accent-gold hover:border-accent-amber/40 hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* RIGHT — Clean photo frame */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <div
              className="relative w-full max-w-[300px] lg:max-w-[340px]"
              onMouseEnter={() => setCursorState({ type: 'explore', label: 'MEHEDI' })}
              onMouseLeave={() => setCursorState({ type: 'default' })}
            >
              {/* Corner accents */}
              <div className="absolute -top-2.5 -left-2.5 w-7 h-7 border-t-2 border-l-2 border-accent-amber/50 z-10 pointer-events-none" />
              <div className="absolute -bottom-2.5 -right-2.5 w-7 h-7 border-b-2 border-r-2 border-accent-amber/50 z-10 pointer-events-none" />

              {/* Photo */}
              <div className="relative rounded-2xl overflow-hidden border border-white/8 shadow-2xl shadow-black/60">
                <div className="aspect-[3/4] overflow-hidden">
                  <motion.img
                    src="/images/mehedi_hasan.jpg"
                    alt="Mehedi Hasan"
                    className="w-full h-full object-cover object-top filter contrast-[1.04]"
                    whileHover={{ scale: 1.04 }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/80 via-transparent to-transparent" />
                </div>

                {/* Minimal bottom label — just name/location */}
                <div className="absolute bottom-0 inset-x-0 px-4 py-3">
                  <p className="text-[9px] font-mono tracking-[0.2em] text-accent-gold/70 uppercase">Dhaka, Bangladesh</p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </motion.div>

      {/* ══ MARQUEE ══ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.7, duration: 0.6 }}
        className="relative z-10 w-full border-t border-white/5 overflow-hidden bg-[#080808]/50 backdrop-blur-sm"
      >
        <div className="flex py-2.5 gap-0 whitespace-nowrap animate-marquee">
          {marqueeItems.map((item, i) => (
            <span
              key={i}
              className={`text-[11px] font-mono tracking-[0.2em] px-4 ${
                item === '·' ? 'text-accent-amber/40' : 'text-white/25'
              }`}
            >
              {item}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0, duration: 0.5 }}
        className="absolute bottom-14 right-8 hidden md:flex items-center gap-2 text-white/30 hover:text-accent-gold transition-colors group z-20"
      >
        <span className="text-[10px] font-mono tracking-[0.18em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDownRight className="h-4 w-4 group-hover:text-accent-amber" />
        </motion.div>
      </motion.a>

    </section>
  );
};
