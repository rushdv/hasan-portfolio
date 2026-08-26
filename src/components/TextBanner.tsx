import React from 'react';
import { motion } from 'framer-motion';

interface TextBannerProps {
  text: string;
  subtitle?: string;
  accentText?: string;
}

export const TextBanner: React.FC<TextBannerProps> = ({ text, subtitle, accentText }) => {
  return (
    <section className="py-20 md:py-28 px-6 bg-noise overflow-hidden border-y border-border-subtle/50 relative">
      <div className="max-w-7xl mx-auto text-center space-y-4">
        {subtitle && (
          <span className="text-xs font-mono tracking-widest text-accent-gold uppercase block">
            {subtitle}
          </span>
        )}

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl sm:text-5xl md:text-6xl font-display font-extrabold tracking-tight text-text-primary uppercase leading-tight max-w-5xl mx-auto"
        >
          {text}{' '}
          {accentText && (
            <span className="text-accent-amber font-serif italic font-normal tracking-normal lowercase">
              {accentText}
            </span>
          )}
        </motion.h2>
      </div>
    </section>
  );
};
