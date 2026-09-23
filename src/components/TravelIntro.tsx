import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Compass, X } from 'lucide-react';
import { CursorState } from './CustomCursor';

interface TravelIntroProps {
  showIntro: boolean;
  onEnter: () => void;
  setCursorState?: (state: CursorState) => void;
}

export const TravelIntro: React.FC<TravelIntroProps> = ({
  showIntro,
  onEnter,
  setCursorState,
}) => {
  const introTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Auto-progress timer (5.5 seconds)
  useEffect(() => {
    if (showIntro) {
      introTimerRef.current = setTimeout(() => {
        onEnter();
      }, 5500);
    }
    return () => {
      if (introTimerRef.current) clearTimeout(introTimerRef.current);
    };
  }, [showIntro, onEnter]);

  // Keyboard shortcut (Escape or Enter to dismiss)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter') {
        onEnter();
      }
    };
    if (showIntro) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showIntro, onEnter]);

  return (
    <AnimatePresence>
      {showIntro && (
        <motion.div
          key="travel-cinematic-intro"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02, filter: 'blur(8px)' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 flex flex-col justify-end overflow-hidden bg-[#0A0A09]"
        >
          {/* Top Skip / Close Button */}
          <button
            onClick={onEnter}
            onMouseEnter={() => setCursorState?.({ type: 'hover', label: 'CLOSE' })}
            onMouseLeave={() => setCursorState?.({ type: 'default' })}
            className="absolute top-6 right-6 sm:top-8 sm:right-10 z-20 flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs font-mono text-warmGray hover:text-accent-gold hover:border-accent-gold/50 transition-all shadow-xl"
            title="Skip or press ESC"
          >
            <span>SKIP INTRO (ESC)</span>
            <X className="h-3.5 w-3.5" />
          </button>

          {/* Background Wallpaper with Ken Burns Slow Zoom */}
          <div className="absolute inset-0 overflow-hidden">
            <picture className="w-full h-full block">
              <source srcSet="/images/IMG_8768.webp" type="image/webp" />
              <motion.img
                src="/images/IMG_8768.PNG"
                alt="Bangladesh Travel Expedition Landscape"
                className="w-full h-full object-cover filter contrast-[1.05] brightness-90"
                initial={{ scale: 1.15, x: 10, y: 5 }}
                animate={{ scale: 1.02, x: 0, y: 0 }}
                transition={{ duration: 6, ease: [0.16, 1, 0.3, 1] }}
              />
            </picture>
            {/* Editorial cinematic gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A09] via-[#0A0A09]/65 to-[#0A0A09]/25" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A09]/90 via-[#0A0A09]/30 to-transparent" />
          </div>

          {/* Narrative Overlay Content */}
          <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 md:px-12 pb-10 sm:pb-12 md:pb-20 w-full space-y-4 sm:space-y-5">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="flex items-center gap-2 text-accent-gold font-mono text-[10px] tracking-[0.28em] uppercase"
            >
              <Compass className="h-4 w-4 text-accent-amber animate-spin" style={{ animationDuration: '14s' }} />
              <span>05 // EXPEDITION ARCHIVE · BANGLADESH</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-light text-warmPaper leading-[1.08] max-w-3xl tracking-tight"
              style={{ fontSize: 'clamp(1.75rem, 5.5vw, 4.4rem)' }}
            >
              When the screen goes dark,{' '}
              <em className="not-italic italic text-accent font-serif">I explore the places in between.</em>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.42, duration: 0.6 }}
              className="font-mono text-xs md:text-sm text-warmGray max-w-xl leading-relaxed font-light"
            >
              Beyond algorithms, code, and terminal windows lie rivers, hill tracts, and the open sea. Mapping real coordinates across Bangladesh.
            </motion.p>

            {/* Action & Auto-progress Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6 pt-2 sm:pt-3"
            >
              <div className="relative h-[2px] w-32 sm:w-40 bg-white/15 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 5.5, ease: 'linear' }}
                  className="h-full bg-accent-amber"
                />
              </div>

              <button
                onClick={onEnter}
                onMouseEnter={() => setCursorState?.({ type: 'hover', label: 'ENTER' })}
                onMouseLeave={() => setCursorState?.({ type: 'default' })}
                className="group inline-flex items-center gap-2 font-mono text-xs tracking-[0.2em] text-warmPaper hover:text-accent-gold uppercase transition-colors px-4 py-2.5 rounded-full bg-white/5 border border-white/15 hover:border-accent/40"
              >
                <span>Enter Journal</span>
                <ArrowRight className="h-3.5 w-3.5 transform group-hover:translate-x-1 transition-transform text-accent" />
              </button>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
