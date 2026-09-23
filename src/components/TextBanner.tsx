import React from 'react';
import { motion } from 'framer-motion';

interface TextBannerProps {
  text: string;
  subtitle?: string;
  accentText?: string;
}

/**
 * Narrative chapter break.
 * Seamless dark cinematic editorial banner with subtle warm gold glow and film grain.
 */
export const TextBanner: React.FC<TextBannerProps> = ({ text, subtitle, accentText }) => {
  return (
    <section className="py-20 md:py-28 px-6 overflow-hidden border-y border-border-subtle relative bg-[#0D0D0C] text-warmPaper">
      {/* Ambient warm gold glow in the center */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[250px] bg-accent/6 rounded-full blur-[140px]" />
      </div>

      {/* Subtle film grain texture */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '180px',
        }}
      />

      <div className="max-w-7xl mx-auto text-center relative z-10">
        {subtitle && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-4 mb-5"
          >
            <span className="h-px w-10 bg-accent/40" />
            <span className="text-[10px] sm:text-xs font-mono tracking-[0.28em] text-accent-gold uppercase font-semibold">
              {subtitle}
            </span>
            <span className="h-px w-10 bg-accent/40" />
          </motion.div>
        )}

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, delay: subtitle ? 0.1 : 0, ease: [0.22, 1, 0.36, 1] }}
          className="font-display font-light text-warmPaper leading-[1.1] tracking-tight"
          style={{ fontSize: 'clamp(2rem, 6vw, 4.5rem)' }}
        >
          {text}
          {accentText && (
            <>
              {' '}
              <em className="not-italic italic text-accent-gold font-serif">{accentText}</em>
            </>
          )}
        </motion.h2>
      </div>
    </section>
  );
};
