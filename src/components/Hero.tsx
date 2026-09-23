import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useSpring } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Instagram, Facebook, ExternalLink } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import type { CursorState } from './CustomCursor';

interface HeroProps {
  setCursorState: (state: CursorState) => void;
}

// ─── Character-by-character reveal ────────────────────────────────
const CharReveal = ({
  text,
  delay = 0,
  className = '',
}: {
  text: string;
  delay?: number;
  className?: string;
}) => (
  <span className={`inline-flex overflow-hidden ${className}`} aria-label={text}>
    {text.split('').map((char, i) => (
      <motion.span
        key={i}
        initial={{ y: '115%', opacity: 0, rotateX: -20 }}
        animate={{ y: '0%', opacity: 1, rotateX: 0 }}
        transition={{
          duration: 0.8,
          delay: delay + i * 0.038,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="inline-block transform-gpu"
      >
        {char === ' ' ? '\u00A0' : char}
      </motion.span>
    ))}
  </span>
);

// ─── Background slides — cinematic landscape photography ──────────
const BG_SLIDES = [
  {
    src: '/images/travel_coxsbazar.jpg',
    location: "Cox's Bazar, Bangladesh",
    from: { scale: 1.10, x: '-1.5%', y: '0%' },
    to:   { scale: 1.03, x: '1.5%',  y: '-1%' },
  },
  {
    src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2000&q=75',
    location: 'Midnight Horizon',
    from: { scale: 1.08, x: '1.5%',   y: '1%' },
    to:   { scale: 1.03, x: '-1.5%',  y: '-1%' },
  },
  {
    src: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=2000&q=75',
    location: 'Starlight Peaks',
    from: { scale: 1.09, x: '0%',   y: '-1%' },
    to:   { scale: 1.03, x: '-1.5%',  y: '1%' },
  },
  {
    src: 'https://images.unsplash.com/photo-1414449381078-c7768b8f19b8?auto=format&fit=crop&w=2000&q=75',
    location: 'Deep Waters',
    from: { scale: 1.08, x: '-1%',  y: '1.5%' },
    to:   { scale: 1.03, x: '1%',   y: '-1.5%' },
  },
  {
    src: 'https://images.unsplash.com/photo-1477322524744-0eece9e79640?auto=format&fit=crop&w=2000&q=75',
    location: 'Foggy Canopy',
    from: { scale: 1.08, x: '1%',   y: '0%' },
    to:   { scale: 1.03, x: '-1%',  y: '-1.5%' },
  },
];

const CROSSFADE = 2.2;
const INTERVAL  = 6000;

const SOCIALS = [
  { icon: Github,    href: () => personalInfo.socials.github,    label: 'GITHUB' },
  { icon: Linkedin,  href: () => personalInfo.socials.linkedin,  label: 'LINKEDIN' },
  { icon: Facebook,  href: () => personalInfo.socials.facebook,  label: 'FACEBOOK' },
  { icon: Instagram, href: () => personalInfo.socials.instagram, label: 'INSTAGRAM' },
];

export const Hero: React.FC<HeroProps> = ({ setCursorState }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const bgY       = useTransform(scrollYProgress, [0, 1], ['0%', '6%']);
  const opacityFade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const id = setInterval(() => setActive(i => (i + 1) % BG_SLIDES.length), INTERVAL);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-[#070709] selection:bg-accent/30 selection:text-accent"
    >
      {/* ═══════════════════════════════════════════════════════════
          BACKGROUND — Cinematic Crossfade Slideshow & Dynamic Aura
      ═══════════════════════════════════════════════════════════ */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        {BG_SLIDES.map((slide, i) => (
          <motion.div
            key={i}
            className="absolute inset-0"
            animate={{
              opacity: active === i ? 1 : 0,
              zIndex:  active === i ? 1 : 0,
            }}
            transition={{ duration: CROSSFADE, ease: [0.4, 0, 0.2, 1] }}
          >
            <motion.img
              src={slide.src}
              alt=""
              aria-hidden="true"
              className="w-full h-full object-cover"
              initial={{ scale: slide.from.scale, x: slide.from.x, y: slide.from.y }}
              animate={
                active === i
                  ? { scale: slide.to.scale,   x: slide.to.x,   y: slide.to.y   }
                  : { scale: slide.from.scale, x: slide.from.x, y: slide.from.y }
              }
              transition={{ duration: 9, ease: 'linear' }}
            />
          </motion.div>
        ))}

        {/* Ambient Warm Golden Aura Glow behind content */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[160px] z-10 pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[550px] h-[550px] bg-accent/8 rounded-full blur-[180px] z-10 pointer-events-none" />

        {/* Base dark backdrop for text contrast - lightened so background images shine through */}
        <div className="absolute inset-0 z-10 bg-[#070709]/20 pointer-events-none" />
        
        {/* Left-to-right vignette fade for clean readable typography */}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#070709]/75 via-[#070709]/35 to-transparent pointer-events-none" />
        
        {/* Top and Bottom soft vignette fades */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#070709]/80 via-transparent to-[#070709]/30 pointer-events-none" />

        {/* Dynamic Micro Noise Grain Overlay */}
        <div
          className="absolute inset-0 z-10 opacity-[0.035] pointer-events-none mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: '180px',
          }}
        />
      </motion.div>

      {/* ═══════════════════════════════════════════════════════════
          MAIN CONTENT CONTAINER
      ═══════════════════════════════════════════════════════════ */}
      <motion.div
        style={{ y: contentY, opacity: opacityFade }}
        className="relative z-10 flex-1 flex items-center max-w-7xl mx-auto w-full px-6 md:px-12 pt-32 pb-16"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 w-full items-center">

          {/* ── LEFT COLUMN: IDENTITY & HERO HEADLINE ───────────── */}
          <div className="lg:col-span-7 flex flex-col justify-center items-start gap-6">

            {/* 1. MAIN NAME — Editorial Statement */}
            <div className="space-y-1">
              <h1
                className="font-display leading-[0.9] tracking-tight text-left"
                aria-label="Mehedi Hasan"
              >
                <div className="overflow-hidden py-0.5">
                  <span
                    className="inline-block font-light italic text-[#F4F4F0] drop-shadow-sm"
                    style={{ fontSize: 'clamp(3.6rem, 8.5vw, 7.5rem)' }}
                  >
                    <CharReveal text="Mehedi" delay={0.25} />
                  </span>
                </div>
                <div className="overflow-hidden py-0.5">
                  <span
                    className="inline-block font-serif italic font-normal text-accent drop-shadow-md"
                    style={{ fontSize: 'clamp(3.6rem, 8.5vw, 7.5rem)' }}
                  >
                    <CharReveal text="Hasan" delay={0.50} />
                  </span>
                </div>
              </h1>

              {/* 2. Sub-Descriptor Roles / Positioning */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.85, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="pt-2 flex flex-wrap items-center gap-2 md:gap-3 text-xs md:text-sm font-mono tracking-[0.2em] text-accent font-medium uppercase"
              >
                <span>CSE Student</span>
                <span className="text-white/30">|</span>
                <span>Aspiring AI & Machine Learning Engineer</span>
              </motion.div>
            </div>

            {/* 3. Mobile Portrait Card (visible only on sm/md viewports) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="lg:hidden relative w-full my-4"
            >
              <div className="relative overflow-hidden rounded-tl-[2.5rem] rounded-br-[2.5rem] rounded-tr-xl rounded-bl-xl border border-white/20 bg-gradient-to-b from-white/10 via-white/5 to-black/60 backdrop-blur-xl p-2.5 shadow-2xl">
                <div className="relative h-72 w-full overflow-hidden rounded-tl-[2rem] rounded-br-[2rem] rounded-tr-lg rounded-bl-lg">
                  <img
                    src="/images/mehedi_hasan.jpg"
                    alt="Mehedi Hasan"
                    className="w-full h-full object-cover object-top filter contrast-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-transparent to-transparent opacity-80" />
                </div>
              </div>
            </motion.div>

            {/* 4. Short Tagline Statement */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.55, ease: 'easeOut' }}
              className="max-w-xl text-base md:text-lg text-warmGray/90 font-light leading-relaxed border-l-2 border-accent/60 pl-4 py-1"
            >
              Building things with code, exploring the world beyond the screen.
            </motion.p>

            {/* 5. Action Call to Actions (CTAs) */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.15, duration: 0.5 }}
              className="flex flex-wrap items-center gap-4 pt-3"
            >
              {/* Primary CTA - Luxury Solid Gold */}
              <a
                href="#projects"
                onMouseEnter={() => setCursorState({ type: 'project' })}
                onMouseLeave={() => setCursorState({ type: 'default' })}
                className="group relative inline-flex items-center gap-3 px-8 py-3.5 bg-accent text-[#0A0A09] rounded-full font-mono font-bold text-xs tracking-widest hover:bg-accent-gold transition-all duration-300 shadow-[0_0_30px_rgba(199,166,106,0.25)] hover:shadow-[0_0_45px_rgba(199,166,106,0.5)] transform hover:-translate-y-0.5 overflow-hidden"
              >
                {/* Subtle light shimmer sweep */}
                <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                <span>VIEW MY PROJECTS</span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </a>

              {/* Secondary CTA - Clean Glass Border */}
              <a
                href="#contact"
                onMouseEnter={() => setCursorState({ type: 'hover', label: 'TALK' })}
                onMouseLeave={() => setCursorState({ type: 'default' })}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full border border-white/20 bg-white/[0.04] backdrop-blur-md text-[#F4F4F0] font-mono font-medium text-xs tracking-widest hover:border-accent/60 hover:text-accent hover:bg-accent/10 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <span>CONTACT ME</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100" />
              </a>
            </motion.div>

            {/* 6. Social Links Pill Bar */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.5 }}
              className="flex items-center gap-4 pt-3"
            >
              <span className="text-[10px] font-mono text-white/35 tracking-[0.2em] uppercase font-semibold">
                Connect
              </span>
              <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/10 shadow-inner">
                {SOCIALS.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href()}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    onMouseEnter={() => setCursorState({ type: 'open', label })}
                    onMouseLeave={() => setCursorState({ type: 'default' })}
                    className="p-2.5 rounded-xl border border-transparent text-white/50 hover:text-accent hover:bg-white/[0.06] hover:border-white/10 hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </motion.div>

          </div>

          {/* ── RIGHT COLUMN: STATIC UNIQUE ARCHITECTURAL PORTRAIT (Desktop) ─── */}
          <motion.div
            className="hidden lg:flex lg:col-span-5 justify-end items-center"
            onMouseEnter={() => setCursorState({ type: 'explore', label: 'PORTRAIT' })}
            onMouseLeave={() => setCursorState({ type: 'default' })}
          >
            <motion.div
              initial={{ opacity: 0, y: 35, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.95, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-[430px]"
            >
              {/* Glowing Halo behind Asymmetric Frame */}
              <div className="absolute -inset-2 rounded-tl-[4rem] rounded-br-[4rem] rounded-tr-3xl rounded-bl-3xl bg-gradient-to-tr from-accent/40 via-amber-500/20 to-transparent blur-2xl opacity-60 pointer-events-none" />

              {/* Unique Asymmetric Arch Portrait Frame */}
              <div className="relative overflow-hidden rounded-tl-[3.8rem] rounded-br-[3.8rem] rounded-tr-2xl rounded-bl-2xl border border-white/20 bg-gradient-to-b from-white/12 via-white/5 to-black/60 backdrop-blur-xl p-3 shadow-2xl shadow-black/90 hover:border-accent/50 transition-colors duration-500">
                
                {/* Monospace Editorial Crosshair Accents */}
                <span className="absolute top-4 left-5 z-20 font-mono text-xs text-accent/60 font-bold select-none">+</span>
                <span className="absolute bottom-4 right-5 z-20 font-mono text-xs text-accent/60 font-bold select-none">+</span>

                <div className="relative h-[530px] w-full overflow-hidden rounded-tl-[3.2rem] rounded-br-[3.2rem] rounded-tr-xl rounded-bl-xl">
                  <motion.img
                    src="/images/mehedi_hasan.jpg"
                    alt="Mehedi Hasan"
                    className="w-full h-full object-cover object-top filter contrast-[1.04] brightness-[0.98]"
                    initial={{ scale: 1.08 }}
                    animate={{ scale: 1.0 }}
                    transition={{ duration: 1.8, delay: 0.95, ease: [0.22, 1, 0.36, 1] }}
                  />

                  {/* High-End Vignette & Lighting Mask */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-transparent to-transparent opacity-85 pointer-events-none" />
                  <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#070709]/50 to-transparent pointer-events-none" />
                  <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#070709]/50 to-transparent pointer-events-none" />
                  <div className="absolute inset-0 bg-accent/[0.04] mix-blend-color-dodge pointer-events-none" />
                </div>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </motion.div>

      {/* ═══════════════════════════════════════════════════════════
          BOTTOM BAR: Slide Location & Indicators + Scroll Cue
      ═══════════════════════════════════════════════════════════ */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pb-6 pt-2 flex items-center justify-between">
        
        {/* Background Slide Indicators */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            {BG_SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Slide ${i + 1}`}
                onMouseEnter={() => setCursorState({ type: 'hover', label: 'SLIDE' })}
                onMouseLeave={() => setCursorState({ type: 'default' })}
                className="p-1 focus:outline-none"
              >
                <div className={`rounded-full transition-all duration-500 ${
                  i === active
                    ? 'w-8 h-[3px] bg-accent'
                    : 'w-2 h-[3px] bg-white/20 hover:bg-white/50'
                }`} />
              </button>
            ))}
          </div>

          {/* Current location label */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 6 }}
              transition={{ duration: 0.4 }}
              className="hidden sm:flex items-center gap-2 text-[10px] font-mono tracking-[0.2em] text-accent/70 uppercase"
            >
              <span className="text-white/20">•</span>
              <span>{BG_SLIDES[active].location}</span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Scroll Cue */}
        <motion.a
          href="#about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.5 }}
          onMouseEnter={() => setCursorState({ type: 'hover', label: 'DOWN' })}
          onMouseLeave={() => setCursorState({ type: 'default' })}
          className="flex items-center gap-2.5 text-white/40 hover:text-accent transition-colors duration-300 group"
          aria-label="Scroll to About"
        >
          <span className="text-[10px] font-mono tracking-[0.2em] uppercase font-medium group-hover:text-accent">Scroll Down</span>
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="p-1.5 rounded-full border border-white/10 group-hover:border-accent/40 bg-white/[0.02]"
          >
            <ArrowDown className="h-3.5 w-3.5" />
          </motion.div>
        </motion.a>

      </div>
    </section>
  );
};
