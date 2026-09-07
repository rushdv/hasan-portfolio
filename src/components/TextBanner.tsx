import React from 'react';
import { motion } from 'framer-motion';

interface TextBannerProps {
  text: string;
  subtitle?: string;
  accentText?: string;
}

export const TextBanner: React.FC<TextBannerProps> = ({ text, subtitle, accentText }) => {
  return (
    <section className="py-20 md:py-28 px-6 overflow-hidden border-y border-border-subtle/50 relative bg-bg-surface">
      {/* Ambient glow center */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[200px] bg-accent-amber/5 rounded-full blur-[100px]" />
      </div>

      {/* Decorative horizontal rules */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-8 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-amber/20 to-transparent origin-left"
      />
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-8 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-amber/20 to-transparent origin-right"
      />

      <div className="max-w-7xl mx-auto text-center space-y-5 relative z-10">
        {subtitle && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-4"
          >
            <span className="h-px w-10 bg-accent-amber/40" />
            <span className="text-xs font-mono tracking-widest text-accent-gold uppercase">
              {subtitle}
            </span>
            <span className="h-px w-10 bg-accent-amber/40" />
          </motion.div>
        )}

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-3xl sm:text-5xl md:text-6xl font-display font-extrabold tracking-tight text-text-primary uppercase leading-tight max-w-5xl mx-auto"
        >
          {text}{' '}
          {accentText && (
            <span className="text-accent-amber font-serif italic font-normal tracking-normal lowercase">
              {accentText}
            </span>
          )}
        </motion.h2>

        {/* Bottom dot row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex items-center justify-center gap-2 pt-2"
        >
          {[...Array(5)].map((_, i) => (
            <span
              key={i}
              className={`rounded-full transition-all ${i === 2 ? 'w-4 h-1 bg-accent-amber' : 'w-1 h-1 bg-white/15'}`}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};
