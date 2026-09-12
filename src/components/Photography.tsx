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

  const getCategoryCount = (cat: string) =>
    cat === 'ALL' ? photoGallery.length : photoGallery.filter((p) => p.category === cat).length;

  const handleNavigate = (direction: 'next' | 'prev') => {
    if (activePhotoIndex === null) return;
    if (direction === 'next') setActivePhotoIndex((activePhotoIndex + 1) % filteredPhotos.length);
    else setActivePhotoIndex((activePhotoIndex - 1 + filteredPhotos.length) % filteredPhotos.length);
  };

  // Assign varying heights for masonry feel
  const heightClasses = [
    'aspect-[4/3]', 'aspect-[3/4]', 'aspect-[4/3]', 'aspect-[3/4]',
    'aspect-[16/9]', 'aspect-[3/4]', 'aspect-[4/3]', 'aspect-[3/4]',
  ];

  return (
    <section
      id="photography"
      className="py-24 md:py-36 px-6 md:px-12 bg-ink relative border-t border-border-subtle overflow-hidden text-warmPaper"
    >
      <div className="max-w-7xl mx-auto space-y-14">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-border-subtle pb-8"
        >
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Camera className="h-4 w-4 text-accent" />
              <span className="text-xs font-mono tracking-widest text-accent uppercase">
                06 // THE EYE & VISUAL ARCHIVE
              </span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-display font-light text-warmPaper tracking-tight">
              PHOTOGRAPHIC ARCHIVE
            </h2>
            <p className="text-sm font-mono text-warmGray max-w-lg">
              A curated visual archive of places, light, atmospheric details, and quiet moments worth preserving.
            </p>
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => {
              const count = getCategoryCount(cat);
              return (
                <motion.button
                  key={cat}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveCategory(cat)}
                  onMouseEnter={() => setCursorState({ type: 'hover' })}
                  onMouseLeave={() => setCursorState({ type: 'default' })}
                  className={`px-4 py-2 rounded-full text-xs font-mono transition-all duration-300 ${
                    activeCategory === cat
                      ? 'bg-accent text-ink font-bold shadow-lg shadow-accent/15'
                      : 'bg-bg-card border border-border-subtle text-warmGray hover:text-accent hover:border-accent/40'
                  }`}
                >
                  {cat} <span className="opacity-60 text-[10px]">({count})</span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Masonry-style grid — columns approach */}
        <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          <AnimatePresence>
            {filteredPhotos.map((photo, idx) => {
              const heightClass = heightClasses[idx % heightClasses.length];
              return (
                <motion.div
                  key={photo.id}
                  layout
                  initial={{ opacity: 0, scale: 0.94, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 0.94, filter: 'blur(8px)' }}
                  transition={{ duration: 0.45, delay: idx * 0.04 }}
                  onClick={() => setActivePhotoIndex(idx)}
                  onMouseEnter={() => setCursorState({ type: 'explore', label: 'EXPAND' })}
                  onMouseLeave={() => setCursorState({ type: 'default' })}
                  className="group relative cursor-pointer rounded-2xl overflow-hidden bg-bg-card border border-border-subtle hover:border-accent/50 transition-all duration-400 shadow-2xl break-inside-avoid mb-6 inline-block w-full"
                >
                  <div className={`${heightClass} w-full overflow-hidden bg-ink`}>
                    <img
                      src={photo.src}
                      alt={photo.title}
                      loading="lazy"
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6">
                    {/* Top row */}
                    <div className="flex justify-between items-start">
                      <span className="px-3 py-1 rounded-full bg-ink/80 backdrop-blur-md border border-border-subtle text-[10px] font-mono text-accent uppercase tracking-widest">
                        {photo.category}
                      </span>
                      <span className="p-2 rounded-full bg-ink/80 border border-border-subtle text-accent backdrop-blur-md">
                        <Maximize2 className="h-3.5 w-3.5" />
                      </span>
                    </div>

                    {/* Bottom info */}
                    <div className="space-y-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-lg font-display font-light text-warmPaper leading-tight">
                        {photo.title}
                      </h3>
                      <div className="flex items-center gap-4 text-xs font-mono text-warmGray">
                        <span className="flex items-center gap-1.5"><MapPin className="h-3 w-3 text-accent" /> {photo.location}</span>
                        <span className="flex items-center gap-1.5"><Calendar className="h-3 w-3 text-accent" /> {photo.date}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Count */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-xs font-mono text-stone"
        >
          CURATED ARCHIVE — SHOWN {filteredPhotos.length} OF {photoGallery.length} FRAMES
        </motion.div>
      </div>

      <Lightbox
        photo={activePhotoIndex !== null ? filteredPhotos[activePhotoIndex] : null}
        photos={filteredPhotos}
        onClose={() => setActivePhotoIndex(null)}
        onNavigate={handleNavigate}
        setCursorState={setCursorState}
      />
    </section>
  );
};
