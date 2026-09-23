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
      className="py-20 md:py-36 px-5 sm:px-6 md:px-12 bg-charcoal relative border-t border-border-subtle overflow-hidden text-warmPaper"
    >
      {/* Background image — increased visibility and atmospheric depth */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeInterest.id}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
        >
          <img
            src={activeInterest.bgImage}
            alt={activeInterest.title}
            className="w-full h-full object-cover object-center filter contrast-[1.08] brightness-[0.75] opacity-50 sm:opacity-60"
          />
          {/* Left gradient ensures left-hand texts remain crisp and accessible */}
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/95 via-charcoal/70 to-charcoal/25" />
          {/* Top & bottom subtle section fade */}
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/85 via-transparent to-charcoal/90" />
        </motion.div>
      </AnimatePresence>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

          {/* Left — Interest list */}
          <div className="lg:col-span-7 space-y-8 sm:space-y-12">

            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-2"
            >
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-accent/60" />
                <span className="text-xs font-mono tracking-widest text-accent uppercase">
                  07 // BEYOND THE SCREEN
                </span>
              </div>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-light text-warmPaper tracking-tight">
                PERSONAL PASSIONS
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
                    onClick={() => setActiveInterest(item)}
                    onMouseEnter={() => {
                      setActiveInterest(item);
                      setCursorState({ type: 'explore', label: item.title });
                    }}
                    onMouseLeave={() => setCursorState({ type: 'default' })}
                    className={`group cursor-pointer rounded-2xl border transition-all duration-400 overflow-hidden ${
                      isActive
                        ? 'bg-bg-card border-accent/40 shadow-xl'
                        : 'bg-bg-surface/50 border-border-subtle hover:border-accent/25 hover:bg-bg-surface'
                    }`}
                  >
                    <div className="p-4 sm:p-7 flex items-center justify-between gap-4 sm:gap-6">
                      <div className="flex items-center gap-3 sm:gap-5 min-w-0">
                        {/* Number */}
                        <span className={`text-xs font-mono font-bold shrink-0 transition-colors ${isActive ? 'text-accent' : 'text-stone'}`}>
                          {item.number}
                        </span>
                        {/* Active indicator dot */}
                        <span className={`shrink-0 h-1.5 w-1.5 rounded-full transition-all duration-300 ${isActive ? 'bg-accent scale-125' : 'bg-transparent'}`} />
                        {/* Title */}
                        <h3 className={`text-xl sm:text-3xl lg:text-4xl font-display font-light tracking-tight transition-all duration-300 truncate ${
                          isActive ? 'text-accent translate-x-1' : 'text-warmPaper/70 group-hover:text-warmPaper'
                        }`}>
                          {item.title}
                        </h3>
                      </div>

                      {/* Description visible on desktop when active */}
                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            transition={{ duration: 0.3 }}
                            className="hidden sm:block text-right max-w-[220px] shrink-0 space-y-1"
                          >
                            <span className="text-[10px] font-mono text-accent uppercase tracking-widest block">{item.subtitle}</span>
                            <p className="text-xs text-warmGray leading-relaxed line-clamp-2">{item.description}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Mobile inline expansion when active */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="sm:hidden px-4 pb-4 pt-1 space-y-1.5 border-t border-border-subtle/40"
                        >
                          <span className="text-[10px] font-mono text-accent uppercase tracking-widest block">{item.subtitle}</span>
                          <p className="text-xs text-warmGray leading-relaxed font-light">{item.description}</p>
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
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-accent/30 shadow-2xl">
                  <img
                    src={activeInterest.bgImage}
                    alt={activeInterest.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-transparent to-transparent" />

                  {/* Overlay label */}
                  <div className="absolute bottom-5 left-5 right-5 space-y-1">
                    <span className="text-[10px] font-mono text-accent uppercase tracking-widest block">
                      {activeInterest.subtitle}
                    </span>
                    <h3 className="text-2xl font-display font-light text-warmPaper">
                      {activeInterest.title}
                    </h3>
                  </div>
                </div>

                {/* Description card */}
                <div className="p-4 rounded-xl bg-bg-card border border-border-subtle">
                  <p className="text-xs text-warmGray leading-relaxed">{activeInterest.description}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
