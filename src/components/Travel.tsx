import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Calendar, Heart, X, ChevronLeft, ChevronRight, ShieldCheck } from 'lucide-react';
import { travelPlaces as initialPlaces } from '../data/portfolioData';
import type { TravelPlace } from '../types';
import { TravelMap } from './TravelMap';
import { AdminTravelModal } from './AdminTravelModal';
import type { CursorState } from './CustomCursor';

interface TravelProps {
  setCursorState: (state: CursorState) => void;
  isAdminAuthenticated?: boolean;
  onAuthenticateAdmin?: () => void;
}

// ─── Journey Gallery Modal ─────────────────────────────────────────
interface JourneyModalProps {
  place: TravelPlace;
  onClose: () => void;
  setCursorState: (state: CursorState) => void;
}

const JourneyModal: React.FC<JourneyModalProps> = ({ place, onClose, setCursorState }) => {
  const allPhotos = place.photos && place.photos.length > 0
    ? place.photos
    : [place.photo];
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setActiveIdx(i => (i + 1) % allPhotos.length);
      if (e.key === 'ArrowLeft') setActiveIdx(i => (i - 1 + allPhotos.length) % allPhotos.length);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKey);
    };
  }, [onClose, allPhotos.length]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
      className="fixed inset-0 z-50 bg-ink/96 backdrop-blur-xl flex flex-col"
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-6 md:px-12 py-5 border-b border-border-subtle shrink-0"
        onClick={e => e.stopPropagation()}
      >
        <div className="space-y-0.5">
          <span className="text-[10px] font-mono text-stone uppercase tracking-widest block">
            {place.region} — {place.date}
          </span>
          <h2
            className="font-display font-light text-warmPaper"
            style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)' }}
          >
            {place.location}
          </h2>
        </div>
        <button
          onClick={onClose}
          onMouseEnter={() => setCursorState({ type: 'hover', label: 'CLOSE' })}
          onMouseLeave={() => setCursorState({ type: 'default' })}
          className="text-warmGray/60 hover:text-warmPaper transition-colors p-2"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Main layout */}
      <div
        className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 min-h-0"
        onClick={e => e.stopPropagation()}
      >
        {/* Left — photo gallery */}
        <div className="lg:col-span-7 flex flex-col">
          {/* Main photo */}
          <div className="relative flex-1 min-h-[40vh] lg:min-h-0 bg-ink overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeIdx}
                src={allPhotos[activeIdx]}
                alt={`${place.location} — ${activeIdx + 1}`}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="w-full h-full object-cover"
                style={{ maxHeight: '65vh' }}
              />
            </AnimatePresence>

            {/* Nav arrows — only if multiple photos */}
            {allPhotos.length > 1 && (
              <>
                <button
                  onClick={() => setActiveIdx(i => (i - 1 + allPhotos.length) % allPhotos.length)}
                  onMouseEnter={() => setCursorState({ type: 'hover' })}
                  onMouseLeave={() => setCursorState({ type: 'default' })}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-ink/70 border border-border-subtle text-warmGray hover:text-accent hover:border-accent/40 transition-all"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setActiveIdx(i => (i + 1) % allPhotos.length)}
                  onMouseEnter={() => setCursorState({ type: 'hover' })}
                  onMouseLeave={() => setCursorState({ type: 'default' })}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-ink/70 border border-border-subtle text-warmGray hover:text-accent hover:border-accent/40 transition-all"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
                {/* Counter */}
                <div className="absolute bottom-4 right-4 text-[10px] font-mono text-warmGray/60 bg-ink/80 px-2.5 py-1 border border-border-subtle">
                  {activeIdx + 1} / {allPhotos.length}
                </div>
              </>
            )}
          </div>

          {/* Thumbnail strip — only if multiple photos */}
          {allPhotos.length > 1 && (
            <div className="flex gap-2 p-4 border-t border-border-subtle bg-bg-surface overflow-x-auto no-scrollbar shrink-0">
              {allPhotos.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIdx(i)}
                  onMouseEnter={() => setCursorState({ type: 'explore' })}
                  onMouseLeave={() => setCursorState({ type: 'default' })}
                  className={`shrink-0 overflow-hidden border transition-all duration-200 ${
                    i === activeIdx ? 'border-accent' : 'border-border-subtle opacity-50 hover:opacity-80'
                  }`}
                  style={{ width: 72, height: 48 }}
                >
                  <img src={src} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right — journey details */}
        <div className="lg:col-span-5 p-6 md:p-10 border-t lg:border-t-0 lg:border-l border-border-subtle space-y-8 overflow-y-auto">
          {/* Story */}
          <div className="space-y-3">
            <span className="text-[10px] font-mono text-accent uppercase tracking-widest block">
              Journey Notes
            </span>
            <p className="text-sm text-warmGray leading-relaxed font-light border-l border-accent/30 pl-4">
              {place.story}
            </p>
          </div>

          {/* Favourite moment */}
          <div className="space-y-3 pt-6 border-t border-border-subtle">
            <div className="flex items-center gap-2">
              <Heart className="h-3.5 w-3.5 text-accent/70" />
              <span className="text-[10px] font-mono text-accent uppercase tracking-widest">
                Favourite Moment
              </span>
            </div>
            <p className="font-display italic font-light text-warmPaper leading-snug"
              style={{ fontSize: 'clamp(1.1rem, 2vw, 1.4rem)' }}
            >
              "{place.favouriteMoment}"
            </p>
          </div>

          {/* Meta */}
          <div className="pt-6 border-t border-border-subtle space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-stone">
              <Calendar className="h-3 w-3 text-accent/50" />
              {place.date}
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-stone">
              <MapPin className="h-3 w-3 text-accent/50" />
              {place.region}
            </div>
            {allPhotos.length > 1 && (
              <div className="text-[10px] font-mono text-stone/60 pt-1">
                {allPhotos.length} frames from this journey
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ─── Main Travel Component ─────────────────────────────────────────
export const Travel: React.FC<TravelProps> = ({
  setCursorState,
  isAdminAuthenticated = false,
  onAuthenticateAdmin,
}) => {
  const [places, setPlaces] = useState<TravelPlace[]>(initialPlaces);
  const [selectedPlace, setSelectedPlace] = useState<TravelPlace | null>(null);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  // Cinematic intro — once per page load
  const [showIntro, setShowIntro] = useState(false);
  const [hasPlayedIntro, setHasPlayedIntro] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (hasPlayedIntro) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasPlayedIntro) {
          setShowIntro(true);
          setHasPlayedIntro(true);
          setTimeout(() => setShowIntro(false), 1200);
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [hasPlayedIntro]);

  // Load custom places from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('mehedi_travel_places');
      if (stored) {
        const custom: TravelPlace[] = JSON.parse(stored);
        if (Array.isArray(custom) && custom.length > 0) {
          const ids = new Set(initialPlaces.map(p => p.id));
          setPlaces([...custom.filter(p => !ids.has(p.id)), ...initialPlaces]);
        }
      }
    } catch { /* silent */ }
  }, []);

  const handleAddPlace = (p: TravelPlace) => {
    const updated = [p, ...places];
    setPlaces(updated);
    try {
      localStorage.setItem('mehedi_travel_places', JSON.stringify(
        updated.filter(x => x.id.startsWith('custom-'))
      ));
    } catch { /* silent */ }
  };

  return (
    <section
      ref={sectionRef}
      id="travel"
      className="relative border-t border-border-subtle overflow-hidden bg-charcoal"
    >
      <AdminTravelModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        onAddPlace={handleAddPlace}
        isAuthenticated={isAdminAuthenticated}
        onAuthenticate={() => onAuthenticateAdmin?.()}
      />

      {/* ═══════════════════════════════════════════════════
          CINEMATIC INTRO COVER
      ═══════════════════════════════════════════════════ */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            key="travel-intro"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 z-50 flex flex-col justify-end overflow-hidden pointer-events-none"
            style={{ minHeight: '75vh' }}
          >
            <div className="absolute inset-0">
              <motion.img
                src="/images/travel_intro_wall.jpg"
                alt=""
                aria-hidden="true"
                className="w-full h-full object-cover"
                initial={{ scale: 1.05, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/35" />
              <div className="absolute inset-0 bg-gradient-to-r from-ink/65 via-transparent to-transparent" />
            </div>
            <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pb-14 md:pb-20 space-y-5">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.4 }}
                className="block font-mono text-[10px] tracking-[0.22em] text-accent/70 uppercase"
              >
                05 — The Journey
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="font-display font-light text-warmPaper leading-[1.1]"
                style={{ fontSize: 'clamp(2rem, 6vw, 4.5rem)' }}
              >
                "When the screen goes dark,{' '}
                <em className="not-italic italic text-accent">I go outside.</em>"
              </motion.h2>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="flex items-center gap-6"
              >
                <div className="h-px w-28 bg-white/15 overflow-hidden">
                  <motion.div
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ delay: 0.3, duration: 0.9, ease: 'linear' }}
                    className="h-full bg-accent"
                  />
                </div>
                <button
                  onClick={() => setShowIntro(false)}
                  onMouseEnter={() => setCursorState({ type: 'hover' })}
                  onMouseLeave={() => setCursorState({ type: 'default' })}
                  className="font-mono text-[10px] tracking-[0.18em] text-warmGray/60 uppercase hover:text-warmPaper transition-colors pointer-events-auto"
                >
                  Enter journal →
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════════════════
          MAIN CONTENT
      ═══════════════════════════════════════════════════ */}
      <div className="py-24 md:py-32 px-6 md:px-12">
        <div className="max-w-7xl mx-auto space-y-20 relative z-10">

          {/* ── Section header ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-border-subtle pb-10"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-accent/60" />
                <span className="text-[10px] font-mono tracking-[0.22em] text-accent uppercase">
                  05 // THE JOURNEY
                </span>
              </div>
              <h2
                className="font-display font-light text-warmPaper leading-tight"
                style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)' }}
              >
                Travel journal &amp;{' '}
                <em className="not-italic italic text-accent">expedition archive</em>
              </h2>
              <p className="font-mono text-xs text-warmGray max-w-md leading-relaxed">
                Documenting journeys across Bangladesh — mountain peaks, coastal shores, monsoon forests, and quiet moments between.
              </p>
            </div>
            {isAdminAuthenticated && (
              <button
                onClick={() => setIsAdminModalOpen(true)}
                onMouseEnter={() => setCursorState({ type: 'hover', label: 'ADD' })}
                onMouseLeave={() => setCursorState({ type: 'default' })}
                className="self-start md:self-auto flex items-center gap-2 px-4 py-2 border border-accent/30 text-accent font-mono text-[11px] tracking-wider hover:bg-accent hover:text-ink transition-all"
              >
                <ShieldCheck className="h-3.5 w-3.5" />
                ADD DESTINATION
              </button>
            )}
          </motion.div>

          {/* ── Journey grid — editorial list ── */}
          <div className="space-y-0">
            {places.map((place, index) => {
              const coverPhoto = place.photos?.[0] ?? place.photo;
              const photoCount = place.photos?.length ?? 1;
              return (
                <motion.div
                  key={place.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => { setSelectedPlace(place); setCursorState({ type: 'default' }); }}
                  onMouseEnter={() => setCursorState({ type: 'explore', label: 'OPEN' })}
                  onMouseLeave={() => setCursorState({ type: 'default' })}
                  className="group cursor-pointer grid grid-cols-12 gap-6 md:gap-10 py-8 border-b border-border-subtle hover:border-accent/25 transition-colors duration-300 items-center"
                >
                  {/* Index number */}
                  <div className="col-span-1 hidden md:block">
                    <span className="font-mono text-[10px] text-stone/50 tabular-nums">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Cover photo */}
                  <div className="col-span-12 md:col-span-3 overflow-hidden bg-bg-card" style={{ aspectRatio: '4/3' }}>
                    <img
                      src={coverPhoto}
                      alt={place.location}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out filter contrast-[1.03]"
                    />
                  </div>

                  {/* Text content */}
                  <div className="col-span-12 md:col-span-6 space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[10px] text-stone uppercase tracking-wider">
                        {place.region}
                      </span>
                      <span className="h-px w-4 bg-border-subtle" />
                      <span className="font-mono text-[10px] text-stone">
                        {place.date}
                      </span>
                    </div>
                    <h3
                      className="font-display font-light text-warmPaper group-hover:text-accent transition-colors duration-300 leading-tight"
                      style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)' }}
                    >
                      {place.location}
                    </h3>
                    <p className="font-sans text-sm text-warmGray/75 line-clamp-2 font-light leading-relaxed">
                      {place.story}
                    </p>
                    <div className="flex items-center gap-2 pt-1">
                      <Heart className="h-3 w-3 text-accent/50" />
                      <p className="font-mono text-[10px] text-stone italic line-clamp-1">
                        "{place.favouriteMoment}"
                      </p>
                    </div>
                  </div>

                  {/* Right meta */}
                  <div className="col-span-12 md:col-span-2 flex md:flex-col md:items-end gap-4 md:gap-2">
                    {photoCount > 1 && (
                      <span className="font-mono text-[10px] text-stone/60">
                        {photoCount} frames
                      </span>
                    )}
                    <span className="font-mono text-[10px] text-accent/60 group-hover:text-accent transition-colors flex items-center gap-1">
                      VIEW JOURNEY →
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* ── Interactive Map ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7 }}
            className="pt-6 border-t border-border-subtle"
          >
            <TravelMap
              places={places}
              setCursorState={setCursorState}
              onSelectPlace={(place) => setSelectedPlace(place)}
              onOpenAdminModal={isAdminAuthenticated ? () => setIsAdminModalOpen(true) : undefined}
            />
          </motion.div>

        </div>
      </div>

      {/* ─── Journey detail modal ─────────────────────── */}
      <AnimatePresence>
        {selectedPlace && (
          <JourneyModal
            key={selectedPlace.id}
            place={selectedPlace}
            onClose={() => { setSelectedPlace(null); setCursorState({ type: 'default' }); }}
            setCursorState={setCursorState}
          />
        )}
      </AnimatePresence>
    </section>
  );
};
