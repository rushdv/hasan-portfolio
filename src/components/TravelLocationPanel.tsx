import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Compass,
  ArrowRight,
  ArrowLeft,
  Navigation,
  Bookmark,
  LayoutGrid,
  Edit3,
  Plus,
  Trash2,
} from 'lucide-react';
import { TravelLocation, TravelPhoto } from '../types/travel';
import { CursorState } from './CustomCursor';

interface TravelLocationPanelProps {
  location: TravelLocation | null;
  locations: TravelLocation[];
  onSelectLocation: (loc: TravelLocation | null) => void;
  onPrevLocation: () => void;
  onNextLocation: () => void;
  onViewOnMap: (loc: TravelLocation) => void;
  onOpenLightbox: (
    photos: TravelPhoto[],
    initialIndex: number,
    locationName: string,
    division?: string
  ) => void;
  setCursorState?: (state: CursorState) => void;
  isAdminAuthenticated?: boolean;
  onEditLocation?: (loc: TravelLocation) => void;
  onDeleteLocation?: (locId: string) => void;
}

export const TravelLocationPanel: React.FC<TravelLocationPanelProps> = ({
  location,
  locations,
  onSelectLocation,
  onPrevLocation,
  onNextLocation,
  onViewOnMap,
  onOpenLightbox,
  setCursorState,
  isAdminAuthenticated = false,
  onEditLocation,
  onDeleteLocation,
}) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Photos for the active location
  const photos = location?.photos || [];
  const primaryPhoto = photos[0];
  const gridPhotos = photos.slice(1, 5); // 4 supporting photos in 2x2 grid
  const totalCount = location?.totalPhotosCount || photos.length || 0;
  const moreCount = Math.max(0, totalCount - 5);

  const handleOpenPhoto = (idx: number) => {
    if (!location) return;
    onOpenLightbox(
      location.photos,
      idx,
      location.name,
      location.division || location.region
    );
  };

  return (
    <div className="h-full rounded-3xl bg-[#0c0c0e] border border-border-subtle p-4 sm:p-6 flex flex-col justify-between shadow-2xl relative backdrop-blur-md min-h-[440px] sm:min-h-[520px] lg:min-h-[660px]">
      <AnimatePresence mode="wait">
        {location ? (
          <motion.div
            key={location.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col justify-between h-full space-y-4"
          >
            <div className="space-y-4">
              {/* ── 1. Hero Cover Image with Cursive Script Calligraphy & Bookmark ── */}
              <div className="relative h-44 sm:h-48 w-full rounded-2xl overflow-hidden bg-bg-card border border-border-subtle shadow-xl group shrink-0">
                <img
                  src={location.coverImage || location.coverPhoto}
                  alt={location.name}
                  className="w-full h-full object-cover filter contrast-[1.03] group-hover:scale-[1.02] transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />

                {/* Cursive Script Watermark (Matching Mockup) */}
                <div className="absolute bottom-3 left-4 space-y-0.5 pointer-events-none select-none">
                  <h4 className="font-serif italic text-2xl sm:text-3xl text-warmPaper font-light tracking-wide drop-shadow-md">
                    {location.name}
                  </h4>
                  <span className="text-[9px] font-mono tracking-[0.32em] text-accent-gold uppercase font-medium drop-shadow-sm block">
                    {location.country || 'BANGLADESH'}
                  </span>
                </div>

                {/* Bookmark Toggle Button */}
                <button
                  type="button"
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  onMouseEnter={() => setCursorState?.({ type: 'hover', label: 'SAVE' })}
                  onMouseLeave={() => setCursorState?.({ type: 'default' })}
                  aria-label="Bookmark destination"
                  className="absolute top-3.5 right-3.5 p-2 rounded-xl bg-black/60 backdrop-blur-md border border-white/15 text-stone hover:text-accent-gold transition-colors"
                >
                  <Bookmark
                    className={`h-4 w-4 ${isBookmarked ? 'fill-accent-amber text-accent-amber' : ''}`}
                  />
                </button>
              </div>

              {/* ── 2. Location Metadata Header ── */}
              <div className="flex items-start justify-between gap-4 pt-1">
                <div className="space-y-0.5">
                  <h3 className="font-display font-normal text-xl sm:text-2xl text-warmPaper leading-tight">
                    {location.name}
                  </h3>
                  <p className="font-mono text-xs text-stone tracking-wide">
                    {location.district} · {location.division}
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  {isAdminAuthenticated && onEditLocation && (
                    <button
                      onClick={() => onEditLocation(location)}
                      onMouseEnter={() => setCursorState?.({ type: 'hover', label: 'EDIT' })}
                      onMouseLeave={() => setCursorState?.({ type: 'default' })}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-accent-amber/15 border border-accent-amber/30 text-accent-gold hover:bg-accent-amber hover:text-bg-primary text-[11px] font-mono font-medium transition-all shadow-sm"
                      title="Edit this expedition, add more photos, or delete"
                    >
                      <Edit3 className="h-3 w-3" />
                      <span>Edit &amp; Photos</span>
                    </button>
                  )}
                  {isAdminAuthenticated && onDeleteLocation && (
                    <button
                      onClick={() => {
                        if (window.confirm(`Are you sure you want to permanently delete "${location.name}" and all its photos?`)) {
                          onDeleteLocation(location.id);
                        }
                      }}
                      onMouseEnter={() => setCursorState?.({ type: 'hover', label: 'DELETE' })}
                      onMouseLeave={() => setCursorState?.({ type: 'default' })}
                      className="p-1.5 rounded-lg border border-rose-500/30 text-rose-400 hover:bg-rose-500 hover:text-white transition-all shadow-sm"
                      title="Delete this expedition"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  )}
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-stone/80" />
                    <div className="text-left font-mono text-[10px] leading-tight text-stone">
                      <span className="block text-stone/70">Visited</span>
                      <span className="font-medium text-warmPaper">{location.visitedDate || location.date}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── 3. Editorial Narrative Description ── */}
              <p className="text-xs sm:text-sm text-warmGray/85 font-light leading-relaxed">
                {location.description || location.story}
              </p>

              {/* ── 4. Quote Callout Box with View on Map Button (Matching Mockup) ── */}
              <div className="p-3 sm:p-3.5 rounded-2xl bg-bg-card/75 border border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-2.5 flex-1 pr-2">
                  <span className="text-accent-amber font-serif text-2xl leading-none select-none">“</span>
                  <p className="font-serif italic text-xs sm:text-sm text-warmPaper/90 leading-snug">
                    {location.quote || location.favouriteMoment}
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto border-t sm:border-t-0 sm:border-l border-border-subtle pt-2 sm:pt-0 sm:pl-3">
                  <div className="text-center font-mono leading-tight">
                    <span className="font-bold text-sm text-warmPaper block">{totalCount}</span>
                    <span className="text-[9px] text-stone uppercase">Photos</span>
                  </div>

                  <button
                    onClick={() => onViewOnMap(location)}
                    onMouseEnter={() => setCursorState?.({ type: 'hover', label: 'FOCUS' })}
                    onMouseLeave={() => setCursorState?.({ type: 'default' })}
                    className="px-3.5 py-2 rounded-full bg-[#f6d787] hover:bg-accent-gold text-[#1c1917] font-display font-semibold text-xs tracking-wider transition-all duration-300 shadow-md shadow-accent-amber/20 flex items-center gap-1.5"
                  >
                    <Navigation className="h-3 w-3 fill-current" />
                    <span>View on Map</span>
                  </button>
                </div>
              </div>

              {/* ── 5. Photo Archive Grid (1 Large Landscape + 4 Supporting Grid with +X More) ── */}
              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-display font-medium text-warmPaper text-xs">
                      Photo Archive
                    </span>
                    {isAdminAuthenticated && onEditLocation && (
                      <button
                        onClick={() => onEditLocation(location)}
                        onMouseEnter={() => setCursorState?.({ type: 'hover', label: 'ADD' })}
                        onMouseLeave={() => setCursorState?.({ type: 'default' })}
                        className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/10 hover:bg-accent-amber hover:text-bg-primary text-text-secondary text-[10px] font-mono transition-colors"
                        title="Add more photos or delete frames"
                      >
                        <Plus className="h-3 w-3" />
                        <span>Add Photos</span>
                      </button>
                    )}
                  </div>
                  <button
                    onClick={() => handleOpenPhoto(0)}
                    onMouseEnter={() => setCursorState?.({ type: 'hover', label: 'VIEW ALL' })}
                    onMouseLeave={() => setCursorState?.({ type: 'default' })}
                    className="font-mono text-[11px] text-stone hover:text-accent-gold transition-colors flex items-center gap-1"
                  >
                    <span>View All ({totalCount})</span>
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </div>

                {/* 1 + 4 Responsive Photo Grid (Matching Mockup) */}
                <div className="grid grid-cols-2 gap-2.5 h-40 sm:h-48">
                  {/* Left: 1 Featured Photo */}
                  {primaryPhoto && (
                    <div
                      onClick={() => handleOpenPhoto(0)}
                      onMouseEnter={() => setCursorState?.({ type: 'explore', label: 'VIEW' })}
                      onMouseLeave={() => setCursorState?.({ type: 'default' })}
                      className="relative rounded-xl overflow-hidden bg-bg-surface border border-border-subtle hover:border-accent-amber/60 cursor-pointer shadow group h-full w-full"
                    >
                      <img
                        src={primaryPhoto.url}
                        alt={primaryPhoto.caption || location.name}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}

                  {/* Right: 2x2 Grid of 4 photos */}
                  <div className="grid grid-cols-2 grid-rows-2 gap-2 h-full">
                    {gridPhotos.map((photo, gIdx) => {
                      const photoIndex = gIdx + 1;
                      const isLast = gIdx === 3;

                      return (
                        <div
                          key={photo.id || gIdx}
                          onClick={() => handleOpenPhoto(photoIndex)}
                          onMouseEnter={() => setCursorState?.({ type: 'explore', label: 'VIEW' })}
                          onMouseLeave={() => setCursorState?.({ type: 'default' })}
                          className="relative rounded-xl overflow-hidden bg-bg-surface border border-border-subtle hover:border-accent-amber/60 cursor-pointer shadow group h-full w-full min-h-0"
                        >
                          <img
                            src={photo.thumbnailUrl || photo.url}
                            alt={photo.caption || `Frame ${photoIndex + 1}`}
                            loading="lazy"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />

                          {/* +X More Overlay on 4th thumbnail (Matching Mockup) */}
                          {isLast && moreCount > 0 && (
                            <div className="absolute inset-0 bg-black/75 backdrop-blur-[2px] flex flex-col items-center justify-center text-warmPaper group-hover:bg-black/60 transition-colors">
                              <span className="text-base font-display font-bold leading-none text-accent-gold">
                                +{moreCount}
                              </span>
                              <span className="text-[9px] font-mono text-stone uppercase mt-0.5">
                                more
                              </span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* ── 6. Bottom Navigation Bar: Prev / Overview / Next ── */}
            <div className="pt-3 border-t border-border-subtle flex items-center justify-between text-xs font-mono">
              <button
                onClick={onPrevLocation}
                onMouseEnter={() => setCursorState?.({ type: 'hover', label: 'PREV' })}
                onMouseLeave={() => setCursorState?.({ type: 'default' })}
                className="flex items-center gap-1.5 text-stone hover:text-warmPaper transition-colors py-1 px-2 rounded-lg hover:bg-white/5"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Previous Location</span>
              </button>

              <button
                onClick={() => onSelectLocation(null)}
                onMouseEnter={() => setCursorState?.({ type: 'hover', label: 'OVERVIEW' })}
                onMouseLeave={() => setCursorState?.({ type: 'default' })}
                className="p-2 rounded-lg text-stone hover:text-accent-gold hover:bg-white/5 transition-colors"
                title="Overview mode"
              >
                <LayoutGrid className="h-4 w-4" />
              </button>

              <button
                onClick={onNextLocation}
                onMouseEnter={() => setCursorState?.({ type: 'hover', label: 'NEXT' })}
                onMouseLeave={() => setCursorState?.({ type: 'default' })}
                className="flex items-center gap-1.5 text-stone hover:text-warmPaper transition-colors py-1 px-2 rounded-lg hover:bg-white/5"
              >
                <span>Next Location</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </motion.div>
        ) : (
          /* ── "1. No location selected" (Overview State Matching Mockup) ── */
          <motion.div
            key="empty-overview"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.35 }}
            className="flex flex-col items-center justify-center text-center h-full py-16 px-4 space-y-6"
          >
            {/* Delicate Dial Compass Icon */}
            <div className="relative p-5 rounded-full border border-dashed border-accent-amber/40 bg-accent-amber/5">
              <Compass className="h-10 w-10 text-accent-amber stroke-[1.5]" />
              <div className="absolute -inset-1 rounded-full border border-accent-amber/20 animate-pulse pointer-events-none" />
            </div>

            <div className="space-y-2 max-w-sm">
              <h3 className="font-display font-light text-2xl text-accent-gold tracking-wide">
                Explore Bangladesh
              </h3>
              <p className="font-mono text-xs text-warmGray/80 leading-relaxed">
                Click on any location marker to view the journey and photos.
              </p>
            </div>

            {/* Quick destination chips */}
            {locations.length > 0 && (
              <div className="flex flex-wrap items-center justify-center gap-2 pt-2 max-w-md">
                {locations.map((loc) => (
                  <button
                    key={loc.id}
                    onClick={() => onSelectLocation(loc)}
                    onMouseEnter={() => setCursorState?.({ type: 'hover', label: loc.name })}
                    onMouseLeave={() => setCursorState?.({ type: 'default' })}
                    className="px-3 py-1.5 rounded-full bg-bg-card border border-border-subtle hover:border-accent-amber/60 text-xs font-mono text-warmPaper hover:text-accent-gold transition-all"
                  >
                    {loc.name}
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
