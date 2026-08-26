import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Instagram, Facebook, Compass, MapPin } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { CursorState } from './CustomCursor';

interface HeroProps {
  setCursorState: (state: CursorState) => void;
}

export const Hero: React.FC<HeroProps> = ({ setCursorState }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1] },
    },
  };

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 px-6 md:px-12 overflow-hidden bg-bg-primary">
      
      {/* Travel Atmospheric Background Image Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <img
          src="/images/travel_coxsbazar.jpg"
          alt="Atmospheric Travel Landscape Background"
          className="w-full h-full object-cover object-center opacity-20 filter contrast-[1.1] scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/85 to-bg-primary/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-bg-primary via-bg-primary/75 to-transparent" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-amber/5 rounded-full blur-[140px]" />
      </div>

      {/* Grid Coordinates Accent */}
      <div className="absolute top-24 right-12 z-0 hidden xl:flex items-center gap-2.5 opacity-40 pointer-events-none font-mono text-[10px] text-accent-gold tracking-widest">
        <Compass className="h-3.5 w-3.5 animate-spin-slow text-accent-amber" />
        <span>21.4272° N, 91.9705° E // EXPLORER GRID</span>
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
        
        {/* Left Column: Text & Intro */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 flex flex-col items-start space-y-5"
        >
          {/* 1. Role Label & Location */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bg-surface/90 backdrop-blur-md border border-border-subtle text-[11px] font-mono tracking-widest text-accent-gold uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-amber animate-pulse" />
              <span>CSE STUDENT · ASPIRING AI/ML ENGINEER</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent-amber/10 border border-accent-amber/20 text-[11px] font-mono text-accent-amber">
              <MapPin className="h-3 w-3" /> DHAKA, BD
            </div>
          </motion.div>

          {/* 2. Name Reveal - Ultra Cool Unbounded Font */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight text-text-primary uppercase leading-[1.05]"
          >
            MEHEDI <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-gold via-accent-amber to-amber-200">
              HASAN
            </span>
          </motion.h1>

          {/* 3. Main Tagline */}
          <motion.div variants={itemVariants} className="space-y-1">
            <h2 className="text-sm sm:text-base md:text-lg font-mono font-bold text-accent-gold tracking-wider uppercase">
              I BUILD WITH CODE.{' '}
              <span className="text-text-primary border-b border-accent-amber/40 pb-0.5 ml-1">
                I EXPLORE BEYOND IT.
              </span>
            </h2>
          </motion.div>

          {/* 4. Description */}
          <motion.p
            variants={itemVariants}
            className="text-sm sm:text-base text-text-secondary max-w-lg leading-relaxed font-light"
          >
            {personalInfo.subTagline}
          </motion.p>

          {/* 5. CTAs */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3.5 pt-1">
            <a
              href="#projects"
              onMouseEnter={() => setCursorState({ type: 'project' })}
              onMouseLeave={() => setCursorState({ type: 'default' })}
              className="px-6 py-3 rounded-xl bg-accent-amber text-bg-primary font-display font-extrabold text-xs tracking-wider hover:bg-accent-gold transition-all duration-300 shadow-md shadow-accent-amber/20 flex items-center gap-2"
            >
              VIEW MY PROJECTS
            </a>

            <a
              href="#contact"
              onMouseEnter={() => setCursorState({ type: 'hover', label: 'TALK' })}
              onMouseLeave={() => setCursorState({ type: 'default' })}
              className="px-6 py-3 rounded-xl bg-bg-surface/90 backdrop-blur-md border border-border-subtle text-text-primary font-display font-bold text-xs tracking-wider hover:border-accent-amber/50 hover:text-accent-gold transition-all duration-300"
            >
              CONTACT ME
            </a>
          </motion.div>

          {/* 6. Social Links */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-5 pt-4 border-t border-border-subtle/50 w-full">
            <span className="text-[11px] font-mono text-text-muted uppercase tracking-widest">Connect</span>
            <div className="flex items-center gap-2.5">
              <a
                href={personalInfo.socials.facebook}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => setCursorState({ type: 'open', label: 'FACEBOOK' })}
                onMouseLeave={() => setCursorState({ type: 'default' })}
                className="p-2 rounded-lg bg-bg-surface border border-border-subtle text-text-secondary hover:text-accent-gold hover:border-accent-amber/40 transition-all duration-200"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>

              <a
                href={personalInfo.socials.instagram}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => setCursorState({ type: 'open', label: 'INSTAGRAM' })}
                onMouseLeave={() => setCursorState({ type: 'default' })}
                className="p-2 rounded-lg bg-bg-surface border border-border-subtle text-text-secondary hover:text-accent-gold hover:border-accent-amber/40 transition-all duration-200"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>

              <a
                href={personalInfo.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => setCursorState({ type: 'open', label: 'LINKEDIN' })}
                onMouseLeave={() => setCursorState({ type: 'default' })}
                className="p-2 rounded-lg bg-bg-surface border border-border-subtle text-text-secondary hover:text-accent-gold hover:border-accent-amber/40 transition-all duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>

              <a
                href={personalInfo.socials.github}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => setCursorState({ type: 'open', label: 'GITHUB' })}
                onMouseLeave={() => setCursorState({ type: 'default' })}
                className="p-2 rounded-lg bg-bg-surface border border-border-subtle text-text-secondary hover:text-accent-gold hover:border-accent-amber/40 transition-all duration-200"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column: Hero Visual Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 flex justify-center lg:justify-end"
        >
          <div className="relative group w-full max-w-sm">
            {/* Ambient Back Glow */}
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-accent-amber/30 via-accent-amber/10 to-transparent blur-xl opacity-30 group-hover:opacity-60 transition-opacity duration-500" />
            
            {/* Image Card Container */}
            <div
              onMouseEnter={() => setCursorState({ type: 'explore', label: 'MEHEDI' })}
              onMouseLeave={() => setCursorState({ type: 'default' })}
              className="relative rounded-2xl overflow-hidden bg-bg-surface border border-border-subtle/80 shadow-2xl p-2"
            >
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-bg-card">
                <img
                  src="/images/mehedi_hasan.jpg"
                  alt="Mehedi Hasan — Computer Science Student & Explorer"
                  className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out filter contrast-[1.03]"
                />
                
                {/* Subtle Overlay Gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/90 via-transparent to-transparent opacity-80" />
                
                {/* Visual Label Tag */}
                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-bg-primary/80 backdrop-blur-md border border-white/10 flex items-center justify-between">
                  <div>
                    <span className="block text-[9px] font-mono tracking-widest text-accent-gold uppercase">LOCATION</span>
                    <span className="text-xs font-display font-semibold text-text-primary">Dhaka, Bangladesh</span>
                  </div>
                  <div className="text-right">
                    <span className="block text-[9px] font-mono tracking-widest text-text-muted uppercase">STATUS</span>
                    <span className="text-xs font-mono text-emerald-400 font-medium">B.Sc. CSE Student</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.a
        href="#about"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6, repeat: Infinity, repeatType: 'reverse' }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-text-muted hover:text-accent-gold transition-colors"
      >
        <span className="text-[9px] font-mono tracking-widest uppercase">SCROLL DOWN</span>
        <ArrowDown className="h-3 w-3" />
      </motion.a>
    </section>
  );
};
