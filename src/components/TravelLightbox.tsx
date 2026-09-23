import React, { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, MapPin, Calendar, Camera } from 'lucide-react';
import { TravelPhoto } from '../types/travel';
import { CursorState } from './CustomCursor';

interface TravelLightboxProps {
  isOpen: boolean;
  photos: TravelPhoto[];
  currentIndex: number;
  locationName?: string;
  division?: string;
  onClose: () => void;
  onNavigate: (direction: 'next' | 'prev') => void;
  setCursorState?: (state: CursorState) => void;
}

export const TravelLightbox: React.FC<TravelLightboxProps> = ({
  isOpen,
  photos,
  currentIndex,
  locationName = 'Bangladesh',
  division,
  onClose,
  onNavigate,
  setCursorState,
}) => {
  const currentPhoto = photos[currentIndex] || null;

  // Keyboard navigation & body scroll locking
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onNavigate('prev');
      if (e.key === 'ArrowRight') onNavigate('next');
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, onNavigate]);

  if (!isOpen || !currentPhoto) return null;

  return (
    <AnimatePresence>
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Expedition photography lightbox"
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8"
      >
        {/* Backdrop (Clicking outside closes the modal) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#070709]/95 backdrop-blur-2xl"
        />

        {/* ── Top Bar Overlay (Matching Mockup) ── */}
        <div className="fixed top-4 left-4 right-4 sm:top-6 sm:left-6 sm:right-6 z-30 flex items-center justify-between pointer-events-none">
          {/* Index Readout: 7 / 24 */}
          <div className="pointer-events-auto flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0A0A09]/80 border border-white/15 backdrop-blur-md text-xs font-mono shadow-2xl">
            <span className="text-warmPaper font-bold">
              {currentIndex + 1} / {photos.length}
            </span>
            <span className="text-stone">·</span>
            <span className="text-accent-gold uppercase font-medium">{locationName}</span>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            onMouseEnter={() => setCursorState?.({ type: 'hover', label: 'CLOSE' })}
            onMouseLeave={() => setCursorState?.({ type: 'default' })}
            aria-label="Close Lightbox"
            className="pointer-events-auto p-2 sm:p-2.5 rounded-full bg-[#0A0A09]/80 border border-white/15 text-stone hover:text-warmPaper hover:bg-white/10 transition-all shadow-2xl"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* ── Desktop Previous / Next Controls ── */}
        {photos.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onNavigate('prev');
              }}
              onMouseEnter={() => setCursorState?.({ type: 'hover', label: 'PREV' })}
              onMouseLeave={() => setCursorState?.({ type: 'default' })}
              aria-label="Previous photograph"
              className="fixed left-4 sm:left-6 z-30 p-3 sm:p-4 rounded-full bg-bg-surface/75 border border-border-subtle text-warmPaper hover:border-accent-amber hover:text-accent-gold hover:bg-bg-card transition-all hidden sm:block shadow-2xl backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-accent-amber/50"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onNavigate('next');
              }}
              onMouseEnter={() => setCursorState?.({ type: 'hover', label: 'NEXT' })}
              onMouseLeave={() => setCursorState?.({ type: 'default' })}
              aria-label="Next photograph"
              className="fixed right-4 sm:right-6 z-30 p-3 sm:p-4 rounded-full bg-bg-surface/75 border border-border-subtle text-warmPaper hover:border-accent-amber hover:text-accent-gold hover:bg-bg-card transition-all hidden sm:block shadow-2xl backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-accent-amber/50"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </>
        )}

        {/* ── Main Stage Frame ── */}
        <motion.div
          key={currentPhoto.id}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative max-w-6xl max-h-[88vh] z-20 flex flex-col items-center justify-center space-y-3.5"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Photographic Image Frame */}
          <div className="relative rounded-2xl overflow-hidden bg-bg-card border border-border-subtle/80 shadow-[0_0_50px_rgba(0,0,0,0.9)] max-h-[68vh] sm:max-h-[72vh] flex items-center justify-center">
            <img
              src={currentPhoto.url}
              alt={currentPhoto.caption || `${locationName} photograph ${currentIndex + 1}`}
              className="max-h-[68vh] sm:max-h-[72vh] w-auto max-w-full object-contain filter contrast-[1.03]"
            />
          </div>

          {/* Caption & Metadata Footer (Matching Mockup) */}
          <div className="text-center space-y-1 max-w-2xl px-4">
            <h3 className="font-display font-medium text-sm sm:text-base text-warmPaper leading-tight">
              {currentPhoto.caption?.split('—')[0]?.trim() || `Frame ${currentIndex + 1} at ${locationName}`}
            </h3>
            {currentPhoto.caption?.includes('—') ? (
              <p className="font-mono text-xs text-stone leading-relaxed">
                {currentPhoto.caption.split('—')[1]?.trim()}
              </p>
            ) : (
              <p className="font-mono text-xs text-stone">
                {locationName} · {currentPhoto.takenAt || 'Expedition Archive'}
              </p>
            )}
          </div>

          {/* Mobile Bottom Navigation Controls */}
          {photos.length > 1 && (
            <div className="flex sm:hidden items-center justify-center gap-4 pt-1">
              <button
                onClick={() => onNavigate('prev')}
                aria-label="Previous photo"
                className="px-4 py-2 rounded-full bg-bg-surface border border-border-subtle text-xs font-mono text-warmPaper flex items-center gap-1"
              >
                <ChevronLeft className="h-4 w-4" /> Prev
              </button>
              <button
                onClick={() => onNavigate('next')}
                aria-label="Next photo"
                className="px-4 py-2 rounded-full bg-bg-surface border border-border-subtle text-xs font-mono text-warmPaper flex items-center gap-1"
              >
                Next <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
