import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Compass } from 'lucide-react';
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

  useEffect(() => {
    if (showIntro) {
      introTimerRef.current = setTimeout(() => {
        onEnter();
      }, 3400);
    }
    return () => {
      if (introTimerRef.current) clearTimeout(introTimerRef.current);
    };
  }, [showIntro, onEnter]);

  if (!showIntro) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="travel-cinematic-intro"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.02 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-0 z-50 flex flex-col justify-end overflow-hidden bg-[#0A0A09]"
      >
        {/* Background Wallpaper with Ken Burns Slow Zoom */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.img
            src="/images/IMG_8768.PNG"
            alt="Travel expedition landscape"
            className="w-full h-full object-cover filter contrast-[1.05] brightness-90"
            initial={{ scale: 1.12, opacity: 0 }}
            animate={{ scale: 1.02, opacity: 1 }}
            transition={{ duration: 3.4, ease: [0.16, 1, 0.3, 1] }}
          />
          {/* Editorial cinematic gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A09] via-[#0A0A09]/60 to-[#0A0A09]/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A09]/85 via-transparent to-transparent" />
        </div>

        {/* Narrative Overlay Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pb-14 md:pb-20 w-full space-y-5">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="flex items-center gap-2 text-accent-gold font-mono text-[10px] tracking-[0.28em] uppercase"
          >
            <Compass className="h-3.5 w-3.5 text-accent-amber animate-spin" style={{ animationDuration: '12s' }} />
            <span>05 // EXPEDITION ARCHIVE · BANGLADESH</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-light text-warmPaper leading-[1.1] max-w-3xl"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 4.2rem)' }}
          >
            When the screen goes dark,{' '}
            <em className="not-italic italic text-accent-gold font-serif">I explore the places in between.</em>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.42, duration: 0.6 }}
            className="font-mono text-xs md:text-sm text-warmGray/90 max-w-xl leading-relaxed"
          >
            Beyond algorithms, code, and terminal windows lie rivers, hill tracts, and the open sea. Mapping real coordinates across Bangladesh.
          </motion.p>

          {/* Action & Auto-progress Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55 }}
            className="flex items-center gap-6 pt-3"
          >
            <div className="relative h-[2px] w-36 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 3.4, ease: 'linear' }}
                className="h-full bg-accent-amber"
              />
            </div>

            <button
              onClick={onEnter}
              onMouseEnter={() => setCursorState?.({ type: 'hover', label: 'ENTER' })}
              onMouseLeave={() => setCursorState?.({ type: 'default' })}
              className="group flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] text-warmGray hover:text-accent-gold uppercase transition-colors"
            >
              <span>Enter journal</span>
              <ArrowRight className="h-3.5 w-3.5 transform group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
