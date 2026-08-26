import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Instagram, Facebook, ArrowUpRight, Copy, Check } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { CursorState } from './CustomCursor';

interface ContactProps {
  setCursorState: (state: CursorState) => void;
}

export const Contact: React.FC<ContactProps> = ({ setCursorState }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.socials.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" className="py-28 md:py-40 px-6 md:px-12 bg-noise relative border-t border-border-subtle overflow-hidden">
      {/* Background Ambient Radial Glow */}
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-accent-amber/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-end relative z-10">
        
        {/* Left Column: Big Typography Callout */}
        <div className="lg:col-span-8 space-y-8">
          <span className="text-xs font-mono tracking-widest text-accent-gold uppercase">
            10 // INITIATE CONVERSATION
          </span>

          <h2 className="text-5xl sm:text-7xl xl:text-8xl font-display font-black tracking-tight text-text-primary uppercase leading-[0.95]">
            LET'S BUILD <br />
            SOMETHING <br />
            <span className="text-accent-amber font-serif italic lowercase tracking-normal">
              interesting.
            </span>
          </h2>

          <p className="text-lg sm:text-xl text-text-secondary max-w-xl font-light leading-relaxed">
            Have an idea, research project, software opportunity, or photography collaboration in mind? Let's talk.
          </p>
        </div>

        {/* Right Column: Interactive Email & Magnetic CTA */}
        <div className="lg:col-span-4 space-y-8 flex flex-col items-start lg:items-end">
          
          {/* Copy Email Box */}
          <div className="w-full space-y-3">
            <span className="text-xs font-mono text-text-muted uppercase tracking-widest block">DIRECT EMAIL</span>
            <div className="flex items-center justify-between p-4 rounded-2xl bg-bg-surface border border-border-subtle hover:border-accent-amber/40 transition-colors">
              <a
                href={`mailto:${personalInfo.socials.email}`}
                onMouseEnter={() => setCursorState({ type: 'open', label: 'MAIL' })}
                onMouseLeave={() => setCursorState({ type: 'default' })}
                className="font-mono text-sm text-text-primary hover:text-accent-gold transition-colors truncate"
              >
                {personalInfo.socials.email}
              </a>
              <button
                onClick={handleCopyEmail}
                onMouseEnter={() => setCursorState({ type: 'hover', label: 'COPY' })}
                onMouseLeave={() => setCursorState({ type: 'default' })}
                className="p-2 rounded-xl bg-bg-card text-text-secondary hover:text-accent-gold transition-colors shrink-0 ml-2"
                title="Copy email to clipboard"
              >
                {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>
            {copied && (
              <span className="text-xs font-mono text-emerald-400 block animate-fade-in">
                ✓ Email copied to clipboard!
              </span>
            )}
          </div>

          {/* Magnetic CTA Button */}
          <a
            href={`mailto:${personalInfo.socials.email}`}
            onMouseEnter={() => setCursorState({ type: 'open', label: 'SAY HELLO' })}
            onMouseLeave={() => setCursorState({ type: 'default' })}
            className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-5 rounded-2xl bg-accent-amber text-bg-primary font-display font-extrabold text-base tracking-wider hover:bg-accent-gold transition-all duration-300 shadow-2xl shadow-accent-amber/20"
          >
            <span>SAY HELLO</span>
            <ArrowUpRight className="h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>

          {/* Social Links */}
          <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-border-subtle w-full justify-start lg:justify-end">
            <a
              href={personalInfo.socials.facebook}
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => setCursorState({ type: 'open', label: 'FACEBOOK' })}
              onMouseLeave={() => setCursorState({ type: 'default' })}
              className="text-xs font-mono text-text-secondary hover:text-accent-gold transition-colors"
            >
              Facebook ↗
            </a>
            <a
              href={personalInfo.socials.instagram}
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => setCursorState({ type: 'open', label: 'INSTAGRAM' })}
              onMouseLeave={() => setCursorState({ type: 'default' })}
              className="text-xs font-mono text-text-secondary hover:text-accent-gold transition-colors"
            >
              Instagram ↗
            </a>
            <a
              href={personalInfo.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => setCursorState({ type: 'open', label: 'LINKEDIN' })}
              onMouseLeave={() => setCursorState({ type: 'default' })}
              className="text-xs font-mono text-text-secondary hover:text-accent-gold transition-colors"
            >
              LinkedIn ↗
            </a>
            <a
              href={personalInfo.socials.github}
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => setCursorState({ type: 'open', label: 'GITHUB' })}
              onMouseLeave={() => setCursorState({ type: 'default' })}
              className="text-xs font-mono text-text-secondary hover:text-accent-gold transition-colors"
            >
              GitHub ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
