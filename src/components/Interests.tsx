import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { personalInterests } from '../data/portfolioData';
import { CursorState } from './CustomCursor';

interface InterestsProps {
  setCursorState: (state: CursorState) => void;
}

export const Interests: React.FC<InterestsProps> = ({ setCursorState }) => {
  const [activeInterest, setActiveInterest] = useState(personalInterests[0]);

  return (
    <section id="interests" className="py-24 md:py-36 px-6 md:px-12 bg-bg-primary relative border-t border-border-subtle overflow-hidden">
      
      {/* Background Image Ambient Transition Layer */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeInterest.id}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 0.15, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0 z-0 pointer-events-none"
        >
          <img
            src={activeInterest.bgImage}
            alt={activeInterest.title}
            className="w-full h-full object-cover filter contrast-[1.1] grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/80 to-bg-primary" />
        </motion.div>
      </AnimatePresence>

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        
        {/* Section Header */}
        <div className="space-y-3">
          <span className="text-xs font-mono tracking-widest text-accent-gold uppercase">
            09 // BEYOND ACADEMICS
          </span>
          <h2 className="text-4xl sm:text-6xl font-display font-extrabold text-text-primary tracking-tight">
            INTERESTS & PASSIONS
          </h2>
        </div>

        {/* Oversized Interactive Typography List */}
        <div className="space-y-4">
          {personalInterests.map((item) => {
            const isActive = activeInterest.id === item.id;
            return (
              <motion.div
                key={item.id}
                onMouseEnter={() => {
                  setActiveInterest(item);
                  setCursorState({ type: 'hover', label: item.title });
                }}
                onMouseLeave={() => setCursorState({ type: 'default' })}
                className="group cursor-pointer p-6 sm:p-10 rounded-3xl bg-bg-surface/60 border border-border-subtle hover:border-accent-amber/50 transition-all duration-500 backdrop-blur-md"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  
                  <div className="flex items-center gap-6">
                    <span className="text-sm font-mono font-bold text-accent-gold">
                      {item.number}
                    </span>
                    <h3 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight text-text-primary group-hover:text-accent-gold group-hover:translate-x-3 transition-all duration-300">
                      {item.title}
                    </h3>
                  </div>

                  <div className="max-w-md space-y-1 lg:text-right">
                    <span className="text-xs font-mono text-accent-amber uppercase block">
                      {item.subtitle}
                    </span>
                    <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-light">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
