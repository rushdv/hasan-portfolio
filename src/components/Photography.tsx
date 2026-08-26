import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, MapPin, Calendar, Maximize2 } from 'lucide-react';
import { photoGallery } from '../data/portfolioData';
import { PhotoItem } from '../types';
import { Lightbox } from './Lightbox';
import { CursorState } from './CustomCursor';

interface PhotographyProps {
  setCursorState: (state: CursorState) => void;
}

export const Photography: React.FC<PhotographyProps> = ({ setCursorState }) => {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  const categories = ['ALL', 'TRAVEL', 'NATURE', 'STREET', 'ARCHITECTURE', 'RANDOM'];

  const filteredPhotos = activeCategory === 'ALL'
    ? photoGallery
    : photoGallery.filter((p) => p.category === activeCategory);

  const handleNavigate = (direction: 'next' | 'prev') => {
    if (activePhotoIndex === null) return;
    if (direction === 'next') {
      setActivePhotoIndex((activePhotoIndex + 1) % filteredPhotos.length);
    } else {
      setActivePhotoIndex((activePhotoIndex - 1 + filteredPhotos.length) % filteredPhotos.length);
    }
  };

  return (
    <section id="photography" className="py-24 md:py-36 px-6 md:px-12 bg-bg-primary relative border-t border-border-subtle">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-accent-gold uppercase tracking-widest">
              <Camera className="h-4 w-4" /> 05 // VISUAL JOURNAL
            </div>
            <h2 className="text-4xl sm:text-6xl font-display font-extrabold text-text-primary tracking-tight">
              FRAMES FROM MY JOURNEY
            </h2>
            <p className="text-sm font-mono text-text-secondary max-w-lg">
              A visual collection of places, moments, and atmospheric details worth remembering.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                onMouseEnter={() => setCursorState({ type: 'hover', label: cat })}
                onMouseLeave={() => setCursorState({ type: 'default' })}
                className={`px-4 py-2 rounded-xl text-xs font-mono transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-accent-amber text-bg-primary font-bold shadow-lg shadow-accent-amber/20'
                    : 'bg-bg-surface border border-border-subtle text-text-secondary hover:text-accent-gold hover:border-accent-amber/40'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry / Responsive Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredPhotos.map((photo, idx) => (
              <motion.div
                key={photo.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                onClick={() => setActivePhotoIndex(idx)}
                onMouseEnter={() => setCursorState({ type: 'explore', label: 'EXPAND' })}
                onMouseLeave={() => setCursorState({ type: 'default' })}
                className="group relative cursor-pointer rounded-2xl overflow-hidden bg-bg-card border border-border-subtle hover:border-accent-amber/50 transition-all duration-500 shadow-xl"
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-bg-surface">
                  <img
                    src={photo.src}
                    alt={photo.title}
                    loading="lazy"
                    className="w-full h-full object-cover transform group-hover:scale-108 transition-transform duration-700 ease-out"
                  />
                </div>

                {/* Subtle Grain & Gradient Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/90 via-bg-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-between">
                  <div className="flex justify-end">
                    <span className="p-2 rounded-full bg-bg-surface/80 border border-white/10 text-accent-gold backdrop-blur-md">
                      <Maximize2 className="h-4 w-4" />
                    </span>
                  </div>

                  <div className="space-y-1 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="text-[10px] font-mono tracking-widest text-accent-gold uppercase block">
                      {photo.category}
                    </span>
                    <h3 className="text-lg font-display font-bold text-text-primary">
                      {photo.title}
                    </h3>
                    <div className="flex items-center gap-4 text-xs font-mono text-text-secondary pt-1">
                      <span className="flex items-center gap-1"><MapPin className="h-3 w-3 text-accent-amber" /> {photo.location}</span>
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3 text-accent-amber" /> {photo.date}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Fullscreen Lightbox Modal */}
        <Lightbox
          photo={activePhotoIndex !== null ? filteredPhotos[activePhotoIndex] : null}
          photos={filteredPhotos}
          onClose={() => setActivePhotoIndex(null)}
          onNavigate={handleNavigate}
          setCursorState={setCursorState}
        />
      </div>
    </section>
  );
};
