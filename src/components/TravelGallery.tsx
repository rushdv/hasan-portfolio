import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, MapPin, Calendar, Camera } from 'lucide-react';
import { TravelLocation, TravelPhoto } from '../types/travel';
import { CursorState } from './CustomCursor';

interface TravelGalleryProps {
  locations: TravelLocation[];
  selectedLocation: TravelLocation | null;
  activeFilterId: string;
  onFilterChange: (id: string) => void;
  onOpenPhotoLightbox: (photos: TravelPhoto[], initialIndex: number, locationName: string, division?: string) => void;
  setCursorState?: (state: CursorState) => void;
}

export const TravelGallery: React.FC<TravelGalleryProps> = ({
  locations,
  selectedLocation,
  activeFilterId,
  onFilterChange,
  onOpenPhotoLightbox,
  setCursorState,
}) => {
  // Current active photos based on filter
  const currentPhotos = React.useMemo(() => {
    if (activeFilterId === 'all') {
      return locations.flatMap((loc) =>
        loc.photos.map((photo) => ({
          ...photo,
          locationName: loc.name,
          division: loc.division || loc.region,
          visitedDate: loc.visitedDate || loc.date,
        }))
      );
    }
    const loc = locations.find((l) => l.id === activeFilterId);
    if (!loc) return [];
    return loc.photos.map((photo) => ({
      ...photo,
      locationName: loc.name,
      division: loc.division || loc.region,
      visitedDate: loc.visitedDate || loc.date,
    }));
  }, [locations, activeFilterId]);

  // Featured hero photo (first photo of the set)
  const featuredPhoto = currentPhotos[0] || null;
  // Supporting photos
  const supportingPhotos = currentPhotos.slice(1);

  const handlePhotoClick = (index: number) => {
    const rawPhotos: TravelPhoto[] = currentPhotos.map((p) => ({
      id: p.id,
      url: p.url,
      thumbnailUrl: p.thumbnailUrl,
      caption: p.caption,
      takenAt: p.takenAt,
      aspectRatio: p.aspectRatio,
    }));

    const locName =
      activeFilterId === 'all'
        ? currentPhotos[index]?.locationName || 'Bangladesh Archive'
        : selectedLocation?.name || 'Bangladesh Archive';

    const divName =
      activeFilterId === 'all'
        ? currentPhotos[index]?.division
        : selectedLocation?.division || selectedLocation?.region;

    onOpenPhotoLightbox(rawPhotos, index, locName, divName);
  };

  return (
    <div id="travel-photo-archive" className="space-y-8 pt-10 border-t border-border-subtle/80">
      {/* ── Gallery Header & Filter Pills ── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-5">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[10px] font-mono text-accent-gold uppercase tracking-[0.24em]">
            <Camera className="h-3.5 w-3.5 text-accent-amber" />
            <span>CURATED PHOTOGRAPHIC ARCHIVE</span>
          </div>

          <h3 className="text-2xl md:text-3xl font-display font-light text-warmPaper leading-tight">
            {activeFilterId === 'all' ? (
              <>Visual Chronicles across <em className="not-italic italic text-accent-gold font-serif">Bangladesh</em></>
            ) : (
              <>{selectedLocation?.name} <span className="text-warmGray text-lg font-mono">({currentPhotos.length} frames)</span></>
            )}
          </h3>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          <button
            onClick={() => onFilterChange('all')}
            onMouseEnter={() => setCursorState?.({ type: 'hover', label: 'ALL' })}
            onMouseLeave={() => setCursorState?.({ type: 'default' })}
            className={`px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all whitespace-nowrap border ${
              activeFilterId === 'all'
                ? 'bg-accent-amber text-bg-primary border-accent-amber font-semibold shadow-md shadow-accent-amber/20'
                : 'bg-bg-card text-stone border-border-subtle hover:text-warmPaper hover:border-accent-amber/40'
            }`}
          >
            All Expeditions ({locations.reduce((acc, l) => acc + (l.photos?.length || 0), 0)})
          </button>

          {locations.map((loc) => {
            const isSelected = activeFilterId === loc.id;
            return (
              <button
                key={loc.id}
                onClick={() => onFilterChange(loc.id)}
                onMouseEnter={() => setCursorState?.({ type: 'hover', label: loc.name })}
                onMouseLeave={() => setCursorState?.({ type: 'default' })}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all whitespace-nowrap border ${
                  isSelected
                    ? 'bg-accent-amber text-bg-primary border-accent-amber font-semibold shadow-md shadow-accent-amber/20'
                    : 'bg-bg-card text-stone border-border-subtle hover:text-warmPaper hover:border-accent-amber/40'
                }`}
              >
                {loc.name} ({loc.photos?.length || 0})
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Editorial Photo Showcase Layout ── */}
      {currentPhotos.length === 0 ? (
        <div className="py-16 text-center text-xs font-mono text-stone border border-dashed border-border-subtle rounded-2xl">
          No photographs cataloged for this filter.
        </div>
      ) : (
        <div className="space-y-6">
          {/* Top Editorial Split: 1 Large Hero Frame (Desktop) + 2 Medium Supporting Frames */}
          {featuredPhoto && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
              {/* Large Featured Editorial Image */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                onClick={() => handlePhotoClick(0)}
                onMouseEnter={() => setCursorState?.({ type: 'explore', label: 'FULLSCREEN' })}
                onMouseLeave={() => setCursorState?.({ type: 'default' })}
                className="lg:col-span-8 group relative rounded-2xl overflow-hidden bg-bg-card border border-border-subtle hover:border-accent-amber/60 cursor-pointer shadow-2xl aspect-[16/10] md:aspect-[16/9]"
              >
                <img
                  src={featuredPhoto.url}
                  alt={featuredPhoto.caption || featuredPhoto.locationName}
                  loading="lazy"
                  className="w-full h-full object-cover transform group-hover:scale-[1.02] transition-transform duration-700 ease-out filter contrast-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/95 via-bg-primary/30 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

                {/* Badges & Information */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                  <span className="px-3 py-1 rounded-md bg-bg-primary/80 backdrop-blur-md border border-border-subtle text-[10px] font-mono text-accent-gold uppercase tracking-wider">
                    FEATURED FRAME // 01
                  </span>
                  <span className="p-2 rounded-full bg-bg-primary/80 backdrop-blur-md border border-border-subtle text-accent-gold pointer-events-auto">
                    <Maximize2 className="h-4 w-4" />
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 space-y-1.5">
                  <p className="font-mono text-[10px] text-accent-gold uppercase tracking-wider flex items-center gap-1.5">
                    <MapPin className="h-3 w-3" />
                    <span>{featuredPhoto.locationName} · {featuredPhoto.division}</span>
                  </p>
                  <p className="font-display text-sm md:text-base text-warmPaper font-light max-w-2xl line-clamp-2">
                    {featuredPhoto.caption}
                  </p>
                </div>
              </motion.div>

              {/* Side Supporting Column (1-2 images on desktop) */}
              <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-5">
                {supportingPhotos.slice(0, 2).map((photo, sIdx) => {
                  const actualIndex = sIdx + 1;
                  return (
                    <motion.div
                      key={photo.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.1 * (sIdx + 1) }}
                      onClick={() => handlePhotoClick(actualIndex)}
                      onMouseEnter={() => setCursorState?.({ type: 'explore', label: 'VIEW' })}
                      onMouseLeave={() => setCursorState?.({ type: 'default' })}
                      className="group relative rounded-2xl overflow-hidden bg-bg-card border border-border-subtle hover:border-accent-amber/60 cursor-pointer shadow-xl aspect-[16/10] lg:aspect-[16/10]"
                    >
                      <img
                        src={photo.url}
                        alt={photo.caption || photo.locationName}
                        loading="lazy"
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out filter contrast-[1.03]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/95 via-transparent to-transparent opacity-75 group-hover:opacity-95 transition-opacity" />

                      <div className="absolute top-3 left-3 right-3 flex justify-between items-center pointer-events-none">
                        <span className="px-2 py-0.5 rounded bg-bg-primary/80 backdrop-blur-md border border-border-subtle text-[9px] font-mono text-accent-gold uppercase">
                          Frame {String(actualIndex + 1).padStart(2, '0')}
                        </span>
                        <span className="p-1.5 rounded-full bg-bg-primary/80 text-accent-gold">
                          <Maximize2 className="h-3 w-3" />
                        </span>
                      </div>

                      <div className="absolute bottom-3 left-3 right-3">
                        <p className="font-mono text-[9px] text-stone truncate">
                          {photo.locationName}
                        </p>
                        <p className="font-display text-xs text-warmPaper font-light truncate">
                          {photo.caption}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Remaining Photos Grid (Clean, Responsive Multi-Column) */}
          {supportingPhotos.length > 2 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5 pt-2">
              {supportingPhotos.slice(2).map((photo, rIdx) => {
                const actualIndex = rIdx + 3;
                return (
                  <motion.div
                    key={photo.id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.45, delay: (rIdx % 4) * 0.08 }}
                    onClick={() => handlePhotoClick(actualIndex)}
                    onMouseEnter={() => setCursorState?.({ type: 'explore', label: 'VIEW' })}
                    onMouseLeave={() => setCursorState?.({ type: 'default' })}
                    className="group relative cursor-pointer rounded-xl overflow-hidden bg-bg-card border border-border-subtle hover:border-accent-amber/60 transition-all duration-300 shadow-xl aspect-[4/3]"
                  >
                    <img
                      src={photo.url}
                      alt={photo.caption || photo.locationName}
                      loading="lazy"
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out filter contrast-[1.03]"
                    />

                    {/* Gradient Overlay & Metadata on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/95 via-bg-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3.5">
                      <div className="flex justify-between items-start">
                        <span className="px-2 py-0.5 rounded bg-bg-surface/85 backdrop-blur-md border border-border-subtle text-[9px] font-mono text-accent-gold uppercase tracking-wider">
                          Frame {String(actualIndex + 1).padStart(2, '0')}
                        </span>
                        <span className="p-1.5 rounded-full bg-bg-surface/85 border border-border-subtle text-accent-gold backdrop-blur-md">
                          <Maximize2 className="h-3 w-3" />
                        </span>
                      </div>

                      <div className="space-y-0.5 transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                        <h4 className="text-xs font-display font-medium text-warmPaper leading-tight truncate">
                          {photo.caption || photo.locationName}
                        </h4>
                        <p className="text-[10px] font-mono text-stone truncate">
                          {photo.locationName} · {photo.takenAt}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
