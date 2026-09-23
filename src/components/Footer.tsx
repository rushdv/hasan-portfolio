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
    <footer className="bg-ink border-t border-border-subtle relative overflow-hidden text-warmPaper">
      {/* Top ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-12 py-10 sm:py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 pb-8 sm:pb-12 border-b border-border-subtle">

          {/* Brand column */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center h-9 w-9 rounded-lg bg-bg-card border border-border-subtle text-accent font-display font-light text-sm">
                MH
              </div>
              <span className="font-display font-light text-lg text-warmPaper tracking-wider">
                MEHEDI HASAN
              </span>
            </div>
            <p className="text-xs font-mono text-warmGray leading-relaxed max-w-[240px]">
              CSE Student. Aspiring AI/ML Engineer. Photographer. Explorer.
            </p>
            <div className="flex items-center gap-1.5 text-xs font-mono text-stone">
              <MapPin className="h-3 w-3 text-accent" />
              {personalInfo.location}
            </div>
            {/* Status */}
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
              <span className="text-[10px] font-mono text-accent">OPEN TO OPPORTUNITIES</span>
            </div>
          </div>

          {/* Navigation column */}
          <div className="space-y-4">
            <span className="text-[10px] font-mono text-stone uppercase tracking-widest block">NAVIGATION</span>
            <div className="grid grid-cols-2 gap-2">
              {footerLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onMouseEnter={() => setCursorState({ type: 'hover' })}
                  onMouseLeave={() => setCursorState({ type: 'default' })}
                  className="text-xs font-mono text-warmGray hover:text-accent transition-colors py-1"
                >
                  → {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact column */}
          <div className="space-y-4">
            <span className="text-[10px] font-mono text-stone uppercase tracking-widest block">CONNECT ONLINE</span>
            <a
              href={`mailto:${personalInfo.socials.email}`}
              onMouseEnter={() => setCursorState({ type: 'open', label: 'EMAIL' })}
              onMouseLeave={() => setCursorState({ type: 'default' })}
              className="block text-xs font-mono text-accent hover:text-accent-gold transition-colors break-all"
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
                  className="p-2 rounded-full bg-bg-surface border border-border-subtle text-warmGray hover:text-accent hover:border-accent/40 transition-all duration-300"
                >
                  <Icon className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-stone">
          <div className="flex items-center gap-3">
            <span>© {new Date().getFullYear()} {personalInfo.name}. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-serif italic text-stone text-sm">"Made with curiosity & code."</span>
            <button
              onClick={scrollToTop}
              onMouseEnter={() => setCursorState({ type: 'hover', label: 'TOP' })}
              onMouseLeave={() => setCursorState({ type: 'default' })}
              className="p-2 rounded-full bg-bg-surface border border-border-subtle hover:border-accent/40 text-warmGray hover:text-accent transition-all duration-300"
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
