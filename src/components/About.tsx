import React from 'react';
import { motion } from 'framer-motion';
import { personalInfo } from '../data/portfolioData';
import { CursorState } from './CustomCursor';

interface AboutProps {
  setCursorState?: (state: CursorState) => void;
}

export const About: React.FC<AboutProps> = () => {
  const words = ['CODE', 'BUILD', 'LEARN', 'EXPLORE', 'REPEAT'];

  return (
    <section id="about" className="py-24 md:py-32 px-6 md:px-12 bg-bg-primary relative border-t border-border-subtle/50">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        
        {/* Left Editorial Text Block */}
        <div className="lg:col-span-7 space-y-8">
          <div className="space-y-3">
            <span className="text-xs font-mono tracking-widest text-accent-gold uppercase">
              01 // PHILOSOPHY & AMBITION
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-text-primary leading-tight">
              “I spend my days learning how computers think, <br className="hidden sm:inline" />
              <span className="text-accent-amber">
                and my free time discovering how the world feels.
              </span>”
            </h2>
          </div>

          <div className="space-y-5 text-base sm:text-lg text-text-secondary leading-relaxed font-light border-l-2 border-accent-amber/40 pl-6">
            {personalInfo.aboutText.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          {/* Key Facts Stats grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-6 border-t border-border-subtle/60">
            <div>
              <span className="block text-2xl sm:text-3xl font-display font-extrabold text-accent-gold">B.Sc. CSE</span>
              <span className="text-xs font-mono text-text-secondary">Northern University BD</span>
            </div>
            <div>
              <span className="block text-2xl sm:text-3xl font-display font-extrabold text-text-primary">AI / ML</span>
              <span className="text-xs font-mono text-text-secondary">Target Direction</span>
            </div>
            <div>
              <span className="block text-2xl sm:text-3xl font-display font-extrabold text-text-primary">6+</span>
              <span className="text-xs font-mono text-text-secondary">Districts Explored</span>
            </div>
          </div>
        </div>

        {/* Right Animated Visual Typography Block */}
        <div className="lg:col-span-5 flex flex-col justify-center space-y-2 lg:pl-8 select-none">
          {words.map((word, index) => (
            <motion.div
              key={word}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group flex items-center gap-4"
            >
              <span className="text-xs font-mono text-text-muted group-hover:text-accent-gold transition-colors">
                0{index + 1}
              </span>
              <span
                className={`text-4xl sm:text-6xl xl:text-7xl font-display font-black tracking-tighter transition-all duration-300 ${
                  index === 3
                    ? 'text-accent-amber font-serif italic'
                    : 'text-text-primary group-hover:translate-x-3 group-hover:text-accent-gold'
                }`}
              >
                {word}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
