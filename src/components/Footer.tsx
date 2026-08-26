import React from 'react';
import { personalInfo } from '../data/portfolioData';
import { CursorState } from './CustomCursor';

interface FooterProps {
  setCursorState: (state: CursorState) => void;
}

export const Footer: React.FC<FooterProps> = ({ setCursorState }) => {
  return (
    <footer className="py-12 px-6 md:px-12 bg-bg-primary border-t border-border-subtle/60 text-text-secondary text-xs font-mono">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left Brand Metadata */}
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-accent-amber" />
          <span className="font-display font-bold text-text-primary text-sm">
            {personalInfo.name.toUpperCase()}
          </span>
          <span className="text-text-muted">|</span>
          <span className="text-text-muted">CSE Student · Developer · Explorer</span>
        </div>

        {/* Center Tagline */}
        <div className="text-text-muted italic font-serif text-sm">
          "Made with curiosity & code."
        </div>

        {/* Right Copyright & Year */}
        <div className="text-text-muted">
          © {new Date().getFullYear()} Hasan Sourav. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
