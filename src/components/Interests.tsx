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
    <section
      id="interests"
      className="py-24 md:py-32 px-6 md:px-12 bg-bg-primary relative border-t border-border-subtle overflow-hidden"
    >
      {/* Background image — stronger opacity */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeInterest.id}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 z-0 pointer-events-none"
        >
          <img
            src={activeInterest.bgImage}
            alt={activeInterest.title}
            className="w-full h-full object-cover filter grayscale contrast-[1.1]"
          />
          <div className="absolute inset-0 bg-bg-primary/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-bg-primary via-bg-primary/90 to-bg-primary/60" />
        </motion.div>
      </AnimatePresence>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Left — Interest list */}
          <div className="lg:col-span-7 space-y-12">

            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-2"
            >
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-accent-amber/60" />
                <span className="text-xs font-mono tracking-widest text-accent-gold uppercase">
                  09 // BEYOND ACADEMICS
                </span>
              </div>
              <h2 className="text-4xl sm:text-6xl font-display font-extrabold text-text-primary tracking-tight">
                INTERESTS & PASSIONS
              </h2>
            </motion.div>

            {/* Interest rows */}
            <div className="space-y-3">
              {personalInterests.map((item, index) => {
                const isActive = activeInterest.id === item.id;
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-30px' }}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                    onMouseEnter={() => {
                      setActiveInterest(item);
                      setCursorState({ type: 'explore', label: item.title });
                    }}
                    onMouseLeave={() => setCursorState({ type: 'default' })}
                    className={`group cursor-pointer rounded-2xl border transition-all duration-400 overflow-hidden ${
                      isActive
                        ? 'bg-bg-surface/80 border-accent-amber/40 shadow-lg shadow-accent-amber/5'
                        : 'bg-bg-surface/40 border-border-subtle/50 hover:border-accent-amber/25 hover:bg-bg-surface/60'
                    }`}
                  >
                    <div className="p-5 sm:p-7 flex items-center justify-between gap-6">
                      <div className="flex items-center gap-5 min-w-0">
                        {/* Number */}
                        <span className={`text-xs font-mono font-bold shrink-0 transition-colors ${isActive ? 'text-accent-gold' : 'text-text-muted/50'}`}>
                          {item.number}
                        </span>
                        {/* Active indicator dot */}
                        <span className={`shrink-0 h-1.5 w-1.5 rounded-full transition-all duration-300 ${isActive ? 'bg-accent-amber scale-125' : 'bg-transparent'}`} />
                        {/* Title */}
                        <h3 className={`text-2xl sm:text-3xl lg:text-4xl font-display font-black tracking-tight transition-all duration-300 truncate ${
                          isActive ? 'text-accent-gold translate-x-1' : 'text-text-primary/70 group-hover:text-text-primary'
                        }`}>
                          {item.title}
                        </h3>
                      </div>

                      {/* Description visible when active */}
                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            transition={{ duration: 0.3 }}
                            className="hidden sm:block text-right max-w-[220px] shrink-0 space-y-1"
                          >
                            <span className="text-[10px] font-mono text-accent-amber uppercase tracking-wider block">{item.subtitle}</span>
                            <p className="text-xs text-text-secondary leading-relaxed line-clamp-2">{item.description}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Mobile: description shown below when active */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="sm:hidden overflow-hidden border-t border-accent-amber/20 px-5 pb-4"
                        >
                          <span className="text-[10px] font-mono text-accent-amber uppercase tracking-wider block mt-3">{item.subtitle}</span>
                          <p className="text-xs text-text-secondary leading-relaxed mt-1">{item.description}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right — Active interest featured image */}
          <div className="hidden lg:flex lg:col-span-5 lg:sticky lg:top-32 flex-col gap-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeInterest.id}
                initial={{ opacity: 0, scale: 0.97, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97, y: -8 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-4"
              >
                {/* Image */}
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-accent-amber/20 shadow-2xl">
                  <img
                    src={activeInterest.bgImage}
                    alt={activeInterest.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/80 via-transparent to-transparent" />

                  {/* Overlay label */}
                  <div className="absolute bottom-4 left-4 right-4 space-y-1">
                    <span className="text-[10px] font-mono text-accent-gold uppercase tracking-widest block">
                      {activeInterest.subtitle}
                    </span>
                    <h3 className="text-xl font-display font-bold text-white">
                      {activeInterest.title}
                    </h3>
                  </div>
                </div>

                {/* Description card */}
                <div className="p-4 rounded-xl bg-bg-surface border border-border-subtle">
                  <p className="text-sm text-text-secondary leading-relaxed">{activeInterest.description}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
