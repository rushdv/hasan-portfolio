import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, Github, Linkedin, Instagram, Facebook, MapPin } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { CursorState } from './CustomCursor';

interface FooterProps {
  setCursorState: (state: CursorState) => void;
}

const footerLinks = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#projects' },
  { label: 'Travel', href: '#travel' },
  { label: 'Photography', href: '#photography' },
  { label: 'Learning', href: '#learning' },
  { label: 'Contact', href: '#contact' },
];

const socials = [
  { icon: Github, href: personalInfo.socials.github, label: 'GitHub' },
  { icon: Linkedin, href: personalInfo.socials.linkedin, label: 'LinkedIn' },
  { icon: Instagram, href: personalInfo.socials.instagram, label: 'Instagram' },
  { icon: Facebook, href: personalInfo.socials.facebook, label: 'Facebook' },
];

export const Footer: React.FC<FooterProps> = ({ setCursorState }) => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="bg-bg-primary border-t border-border-subtle/60 relative overflow-hidden">
      {/* Top ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-accent-amber/20 to-transparent" />

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12 border-b border-border-subtle/40">

          {/* Brand column */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center h-9 w-9 rounded-lg bg-bg-card border border-border-subtle text-accent-amber font-display font-extrabold text-sm">
                MH
              </div>
              <span className="font-display font-bold text-base text-text-primary tracking-wider">
                MEHEDI HASAN
              </span>
            </div>
            <p className="text-xs font-mono text-text-secondary leading-relaxed max-w-[220px]">
              CSE Student. Aspiring AI/ML Engineer. Photographer. Explorer.
            </p>
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-text-muted">
              <MapPin className="h-3 w-3 text-accent-amber" />
              {personalInfo.location}
            </div>
            {/* Status */}
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-amber animate-pulse" />
              <span className="text-[10px] font-mono text-accent-gold">OPEN TO OPPORTUNITIES</span>
            </div>
          </div>

          {/* Navigation column */}
          <div className="space-y-4">
            <span className="text-[10px] font-mono text-text-muted uppercase tracking-widest block">NAVIGATE</span>
            <div className="grid grid-cols-2 gap-2">
              {footerLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onMouseEnter={() => setCursorState({ type: 'hover' })}
                  onMouseLeave={() => setCursorState({ type: 'default' })}
                  className="text-xs font-mono text-text-secondary hover:text-accent-gold transition-colors py-1"
                >
                  → {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact column */}
          <div className="space-y-4">
            <span className="text-[10px] font-mono text-text-muted uppercase tracking-widest block">CONNECT</span>
            <a
              href={`mailto:${personalInfo.socials.email}`}
              onMouseEnter={() => setCursorState({ type: 'open', label: 'EMAIL' })}
              onMouseLeave={() => setCursorState({ type: 'default' })}
              className="block text-xs font-mono text-accent-gold hover:text-accent-warm transition-colors break-all"
            >
              {personalInfo.socials.email}
            </a>
            <div className="flex items-center gap-2 flex-wrap">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  onMouseEnter={() => setCursorState({ type: 'open', label: label.toUpperCase() })}
                  onMouseLeave={() => setCursorState({ type: 'default' })}
                  className="p-2 rounded-lg bg-bg-surface border border-border-subtle text-text-secondary hover:text-accent-gold hover:border-accent-amber/40 hover:-translate-y-0.5 transition-all duration-200"
                >
                  <Icon className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-text-muted">
          <div className="flex items-center gap-3">
            <span>© {new Date().getFullYear()} {personalInfo.name}. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-serif italic text-text-muted/70 text-sm">"Made with curiosity & code."</span>
            <button
              onClick={scrollToTop}
              onMouseEnter={() => setCursorState({ type: 'hover', label: 'TOP' })}
              onMouseLeave={() => setCursorState({ type: 'default' })}
              className="p-2 rounded-xl bg-bg-surface border border-border-subtle hover:border-accent-amber/40 text-text-secondary hover:text-accent-gold hover:-translate-y-0.5 transition-all duration-200"
              title="Back to top"
            >
              <ArrowUp className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
