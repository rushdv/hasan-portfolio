import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Instagram, Facebook } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import type { CursorState } from './CustomCursor';

interface HeroProps {
  setCursorState: (state: CursorState) => void;
}

// Cinematic background slides — slow pan, crossfade
const slides = [
  {
    src: '/images/travel_coxsbazar.jpg',
    location: "Cox's Bazar",
    from: { scale: 1.08, x: '-1.5%', y: '0%' },
    to:   { scale: 1.02, x:  '1.5%', y: '-1.5%' },
  },
  {
    src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2000&q=75',
    location: 'Midnight Horizon',
    from: { scale: 1.07, x: '1%',   y: '1%' },
    to:   { scale: 1.02, x: '-1.5%', y: '-1%' },
  },
  {
    src: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=2000&q=75',
    location: 'Starlight Peaks',
    from: { scale: 1.08, x: '0%',   y: '-1%' },
    to:   { scale: 1.02, x: '-1.5%', y: '1%' },
  },
  {
    src: 'https://images.unsplash.com/photo-1477322524744-0eece9e79640?auto=format&fit=crop&w=2000&q=75',
    location: 'Foggy Canopy',
    from: { scale: 1.07, x: '1%',   y: '0%' },
    to:   { scale: 1.02, x: '-1%',  y: '-1.5%' },
  },
];

const INTERVAL   = 6000;   // ms between slides
const FADE_DUR   = 2.0;    // crossfade seconds

const socials = [
  { icon: Github,    href: () => personalInfo.socials.github,    label: 'GitHub' },
  { icon: Linkedin,  href: () => personalInfo.socials.linkedin,  label: 'LinkedIn' },
  { icon: Instagram, href: () => personalInfo.socials.instagram, label: 'Instagram' },
  { icon: Facebook,  href: () => personalInfo.socials.facebook,  label: 'Facebook' },
];

export const Hero: React.FC<HeroProps> = ({ setCursorState }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  // Mouse parallax values for subtle portrait drift
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 150 };
  const portraitX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig);
  const portraitY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-8, 8]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  // Parallax — content drifts upward very subtly on scroll
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);
  const bgY       = useTransform(scrollYProgress, [0, 1], ['0%', '6%']);

  // Auto-advance slides
  useEffect(() => {
    const id = setInterval(() => setActive(i => (i + 1) % slides.length), INTERVAL);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      onMouseMove={handleMouseMove}
      className="relative min-h-screen lg:h-screen flex flex-col justify-between overflow-hidden bg-ink py-20 lg:py-0"
    >

      {/* ── BACKGROUND SLIDESHOW ─────────────────────────────────── */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: bgY }}
      >
        {slides.map((slide, i) => (
          <motion.div
            key={i}
            className="absolute inset-0"
            animate={{ opacity: active === i ? 1 : 0, zIndex: active === i ? 1 : 0 }}
            transition={{ duration: FADE_DUR, ease: 'easeInOut' }}
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

        {/* Overlays — restrained: reveal natural colour of photographs */}
        <div className="absolute inset-0 bg-ink/35 z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/40 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent z-10 pointer-events-none" />
      </motion.div>

      {/* ── MAIN CONTENT GRID (Desktop Two-Column & Mobile Stack) ──── */}
      <motion.div
        style={{ y: contentY }}
        className="relative z-20 flex-1 flex flex-col justify-center max-w-7xl mx-auto w-full px-6 md:px-12 pt-16 pb-24 lg:py-0"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center h-full">

          {/* LEFT COLUMN: Identity & Typography */}
          <div className="lg:col-span-7 xl:col-span-7 space-y-6 lg:space-y-8 flex flex-col justify-center">

            {/* Availability status */}
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex items-center gap-3"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-pulse-dot absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent" />
              </span>
              <span className="font-mono text-[11px] tracking-[0.18em] text-warm-gray uppercase">
                Open to opportunities — Dhaka, Bangladesh
              </span>
            </motion.div>

            {/* Name — large display serif */}
            <div className="space-y-1 sm:space-y-2">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="font-display font-light text-warm-paper leading-[0.92] tracking-tight"
                style={{ fontSize: 'clamp(3.2rem, 8vw, 7.5rem)' }}
              >
                Mehedi
              </motion.h1>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className="font-display italic font-light text-accent leading-[0.92] tracking-tight"
                style={{ fontSize: 'clamp(3.2rem, 8vw, 7.5rem)' }}
              >
                Hasan
              </motion.h1>
            </div>

            {/* MOBILE PORTRAIT COMPOSITION (< lg breakpoints) */}
            <motion.div
              initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.9, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
              onMouseEnter={() => setCursorState({ type: 'explore', label: 'PORTRAIT' })}
              onMouseLeave={() => setCursorState({ type: 'default' })}
              className="lg:hidden relative my-4 w-full max-w-md mx-auto overflow-hidden rounded-2xl border border-white/10 shadow-2xl group"
            >
              <div className="aspect-[4/3] w-full relative overflow-hidden bg-ink">
                <img
                  src="/images/mehedi_hasan.jpg"
                  alt="Mehedi Hasan Portrait"
                  className="w-full h-full object-cover object-[center_20%] filter contrast-[1.02] brightness-[0.96]"
                />
                {/* Mobile Editorial Vignette Overlay */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      'linear-gradient(to top, rgba(8,8,10,0.85) 0%, transparent 40%), linear-gradient(to bottom, rgba(8,8,10,0.4) 0%, transparent 30%)',
                  }}
                />
              </div>
            </motion.div>

            {/* Identity line */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.85 }}
              className="font-sans text-warm-gray text-sm md:text-base tracking-wide max-w-md"
            >
              Developer&thinsp;·&thinsp;AI&thinsp;/&thinsp;ML&thinsp;·&thinsp;Photographer&thinsp;·&thinsp;Explorer
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.05 }}
              className="flex items-center gap-6 pt-2"
            >
              <a
                href="#projects"
                onMouseEnter={() => setCursorState({ type: 'hover', label: 'WORK' })}
                onMouseLeave={() => setCursorState({ type: 'default' })}
                className="group inline-flex items-center gap-3 font-sans font-semibold text-sm text-warm-paper hover:text-accent transition-colors duration-300"
              >
                <span className="h-px w-8 bg-accent group-hover:w-12 transition-all duration-400" />
                View work
              </a>
              <a
                href="#contact"
                onMouseEnter={() => setCursorState({ type: 'hover', label: 'HELLO' })}
                onMouseLeave={() => setCursorState({ type: 'default' })}
                className="font-sans font-medium text-sm text-stone hover:text-warm-gray transition-colors duration-300"
              >
                Get in touch ↗
              </a>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: Desktop Editorial Portrait (lg:block) */}
          <div className="hidden lg:flex lg:col-span-5 xl:col-span-5 items-center justify-end h-full relative">
            <motion.div
              style={{ x: portraitX, y: portraitY }}
              initial={{ opacity: 0, x: 40, filter: 'blur(10px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1.1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              onMouseEnter={() => setCursorState({ type: 'explore', label: 'PORTRAIT' })}
              onMouseLeave={() => setCursorState({ type: 'default' })}
              className="relative w-full max-w-md aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl group"
            >
              {/* Subtle ambient warm glow behind desktop portrait container */}
              <div
                className="absolute inset-0 z-0 pointer-events-none opacity-60"
                style={{
                  background:
                    'radial-gradient(circle at 50% 40%, rgba(212,175,55,0.18) 0%, transparent 70%)',
                }}
              />

              {/* Portrait image */}
              <img
                src="/images/mehedi_hasan.jpg"
                alt="Mehedi Hasan Editorial Portrait"
                className="w-full h-full object-cover object-[center_20%] filter contrast-[1.03] brightness-[0.98] transition-transform duration-1000 ease-out group-hover:scale-[1.02]"
              />

              {/* Cinematic Editorial Edge Gradients (blending picture into surroundings) */}
              {/* Left soft blend to integrate with text side */}
              <div
                className="absolute inset-0 pointer-events-none z-10"
                style={{
                  background:
                    'linear-gradient(to right, rgba(8,8,10,0.7) 0%, rgba(8,8,10,0.15) 35%, transparent 65%)',
                }}
              />

              {/* Top & Bottom dark vignette */}
              <div
                className="absolute inset-0 pointer-events-none z-10"
                style={{
                  background:
                    'linear-gradient(to bottom, rgba(8,8,10,0.5) 0%, transparent 25%, transparent 70%, rgba(8,8,10,0.85) 100%)',
                }}
              />

              {/* Right edge subtle feather */}
              <div
                className="absolute inset-0 pointer-events-none z-10"
                style={{
                  background:
                    'linear-gradient(to left, rgba(8,8,10,0.3) 0%, transparent 20%)',
                }}
              />

              {/* Minimal Accent line on bottom edge */}
              <div className="absolute bottom-4 left-6 right-6 h-px bg-gradient-to-r from-accent/40 via-accent/20 to-transparent z-20 pointer-events-none" />
            </motion.div>
          </div>

        </div>
      </motion.div>

      {/* ── BOTTOM BAR — location + socials + scroll cue ─────────── */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-6 md:px-12 pb-7 flex items-end justify-between">

        {/* Slide location label */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2"
          >
            <span className="h-px w-4 bg-accent/50" />
            <span className="font-mono text-[10px] tracking-[0.2em] text-stone uppercase">
              {slides[active].location}
            </span>
          </motion.div>
        </AnimatePresence>

        {/* Social icons + scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="flex items-center gap-5"
        >
          {/* Socials */}
          <div className="hidden sm:flex items-center gap-4">
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href()}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                onMouseEnter={() => setCursorState({ type: 'open', label: label.toUpperCase() })}
                onMouseLeave={() => setCursorState({ type: 'default' })}
                className="text-stone hover:text-accent transition-colors duration-250"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>

          {/* Divider */}
          <span className="hidden sm:block h-4 w-px bg-stone/30" />

          {/* Scroll cue */}
          <a
            href="#about"
            className="flex items-center gap-2 text-stone hover:text-warm-gray transition-colors duration-250 group"
          >
            <span className="font-mono text-[10px] tracking-[0.18em] uppercase hidden md:block">Scroll</span>
            <motion.div
              animate={{ y: [0, 3, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ArrowDown className="h-3.5 w-3.5" />
            </motion.div>
          </a>
        </motion.div>
      </div>

      {/* ── SLIDE DOTS ───────────────────────────────────────────── */}
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`Slide ${i + 1}`}
          >
            <span className={`block rounded-full transition-all duration-500 ${
              i === active ? 'w-5 h-[3px] bg-accent' : 'w-[3px] h-[3px] bg-stone/50 hover:bg-stone'
            }`} />
          </button>
        ))}
      </div>

    </section>
  );
};
