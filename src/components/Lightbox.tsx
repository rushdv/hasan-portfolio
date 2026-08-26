import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, MapPin, Calendar } from 'lucide-react';
import { PhotoItem } from '../types';
import { CursorState } from './CustomCursor';

interface LightboxProps {
  photo: PhotoItem | null;
  photos: PhotoItem[];
  onClose: () => void;
  onNavigate: (direction: 'next' | 'prev') => void;
  setCursorState: (state: CursorState) => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  photo,
  photos,
  onClose,
  onNavigate,
  setCursorState,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onNavigate('prev');
      if (e.key === 'ArrowRight') onNavigate('next');
    };
    if (photo) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [photo, onClose, onNavigate]);

  if (!photo) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-bg-primary/95 backdrop-blur-2xl"
        />

        {/* Top Control Bar */}
        <div className="fixed top-6 left-6 right-6 z-20 flex items-center justify-between pointer-events-none">
          <div className="pointer-events-auto px-4 py-2 rounded-full bg-bg-surface/80 border border-border-subtle backdrop-blur-md text-xs font-mono text-accent-gold">
            {photo.category} // PHOTO JOURNAL
          </div>

          <button
            onClick={onClose}
            onMouseEnter={() => setCursorState({ type: 'hover', label: 'CLOSE' })}
            onMouseLeave={() => setCursorState({ type: 'default' })}
            aria-label="Close Lightbox"
            className="pointer-events-auto p-3 rounded-full bg-bg-surface/80 border border-border-subtle text-text-secondary hover:text-text-primary hover:bg-bg-card transition-all"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={() => onNavigate('prev')}
          onMouseEnter={() => setCursorState({ type: 'hover', label: 'PREV' })}
          onMouseLeave={() => setCursorState({ type: 'default' })}
          aria-label="Previous Photo"
          className="fixed left-6 z-20 p-4 rounded-full bg-bg-surface/80 border border-border-subtle text-text-primary hover:border-accent-amber hover:text-accent-gold transition-all hidden sm:block"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        <button
          onClick={() => onNavigate('next')}
          onMouseEnter={() => setCursorState({ type: 'hover', label: 'NEXT' })}
          onMouseLeave={() => setCursorState({ type: 'default' })}
          aria-label="Next Photo"
          className="fixed right-6 z-20 p-4 rounded-full bg-bg-surface/80 border border-border-subtle text-text-primary hover:border-accent-amber hover:text-accent-gold transition-all hidden sm:block"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Main Lightbox Frame */}
        <motion.div
          key={photo.id}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.3 }}
          className="relative max-w-5xl max-h-[80vh] z-10 flex flex-col items-center justify-center space-y-4"
        >
          <div className="relative rounded-2xl overflow-hidden bg-bg-card border border-border-subtle shadow-2xl max-h-[70vh]">
            <img
              src={photo.src}
              alt={photo.title}
              className="max-h-[70vh] w-auto object-contain"
            />
          </div>

          {/* Caption & Metadata Footer */}
          <div className="text-center space-y-2 max-w-2xl px-4">
            <h3 className="text-xl font-display font-bold text-text-primary">
              {photo.title}
            </h3>
            <p className="text-sm text-text-secondary font-light">
              {photo.caption}
            </p>
            <div className="flex items-center justify-center gap-6 pt-1 text-xs font-mono text-accent-gold">
              <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> {photo.location}</span>
              <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> {photo.date}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
