import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Heart,
  ShieldCheck,
  Maximize2,
  Compass,
  ArrowRight,
  Images,
  ChevronLeft,
  ChevronRight,
  MapPin,
} from 'lucide-react';
import { travelPlaces as initialPlaces } from '../data/portfolioData';
import type { TravelPlace, PhotoItem } from '../types';
import { TravelMap } from './TravelMap';
import { AdminTravelModal } from './AdminTravelModal';
import { Lightbox } from './Lightbox';
import type { CursorState } from './CustomCursor';

interface TravelProps {
  setCursorState: (state: CursorState) => void;
  isAdminAuthenticated?: boolean;
  onAuthenticateAdmin?: () => void;
}

export const Travel: React.FC<TravelProps> = ({
  setCursorState,
  isAdminAuthenticated = false,
  onAuthenticateAdmin,
}) => {
  const [places, setPlaces] = useState<TravelPlace[]>(initialPlaces);
  // Default to first destination so photos and stories are immediately visible
  const [selectedPlace, setSelectedPlace] = useState<TravelPlace | null>(initialPlaces[0] || null);
  const [destinationPhotoIndex, setDestinationPhotoIndex] = useState<number>(0);
  const [photoFilterId, setPhotoFilterId] = useState<string>('all');
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  // Lightbox State
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);
  const [lightboxPhotos, setLightboxPhotos] = useState<PhotoItem[]>([]);

  // Cinematic Intro State — runs once per browser session
  const [showIntro, setShowIntro] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const introTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const hasPlayed = sessionStorage.getItem('mehedi_travel_intro_played');
    if (hasPlayed) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !sessionStorage.getItem('mehedi_travel_intro_played')) {
          sessionStorage.setItem('mehedi_travel_intro_played', 'true');
          setShowIntro(true);

          introTimerRef.current = setTimeout(() => {
            setShowIntro(false);
          }, 3200);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      observer.disconnect();
      if (introTimerRef.current) clearTimeout(introTimerRef.current);
    };
  }, []);

  const handleSkipIntro = () => {
    if (introTimerRef.current) clearTimeout(introTimerRef.current);
    setShowIntro(false);
    sessionStorage.setItem('mehedi_travel_intro_played', 'true');
  };

  // Load custom places from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('mehedi_travel_places');
      if (stored) {
        const custom: TravelPlace[] = JSON.parse(stored);
        if (Array.isArray(custom) && custom.length > 0) {
          const ids = new Set(initialPlaces.map((p) => p.id));
          setPlaces([...custom.filter((p) => !ids.has(p.id)), ...initialPlaces]);
        }
      }
    } catch {
      /* silent */
    }
  }, []);

  const handleAddPlace = (p: TravelPlace) => {
    const updated = [p, ...places];
    setPlaces(updated);
    setSelectedPlace(p);
    setDestinationPhotoIndex(0);
    setPhotoFilterId(p.id);
    try {
      localStorage.setItem(
        'mehedi_travel_places',
        JSON.stringify(updated.filter((x) => x.id.startsWith('custom-')))
      );
    } catch {
      /* silent */
    }
  };

  const handleSelectPlace = (p: TravelPlace | null) => {
    setSelectedPlace(p);
    setDestinationPhotoIndex(0);
    if (p) {
      setPhotoFilterId(p.id);
    }
  };

  // Curated list of photos for the currently selected destination
  const currentPlacePhotos = useMemo<string[]>(() => {
    if (!selectedPlace) return [];
    return selectedPlace.photos && selectedPlace.photos.length > 0
      ? selectedPlace.photos
      : [selectedPlace.coverPhoto || selectedPlace.photo || ''];
  }, [selectedPlace]);

  // All 20 curated photographs across Bangladesh
  const allExpeditionPhotos = useMemo<PhotoItem[]>(() => {
    return places.flatMap((p) => {
      const photoList = p.photos && p.photos.length > 0
        ? p.photos
        : [p.coverPhoto || p.photo || ''];

      return photoList.map((src, i) => ({
        id: `${p.id}-photo-${i}`,
        title: `${p.location} — Frame ${String(i + 1).padStart(2, '0')}`,
        category: 'TRAVEL' as const,
        location: `${p.location}, ${p.region}`,
        date: p.date,
        src,
        caption: i === 0 ? p.story : `Expedition photography frame from ${p.location}, ${p.region}.`,
        aspectRatio: (i % 3 === 0 ? 'landscape' : 'portrait') as 'landscape' | 'portrait',
      }));
    });
  }, [places]);

  // Filtered photos for the bottom archive grid
  const displayedArchivePhotos = useMemo<PhotoItem[]>(() => {
    if (photoFilterId === 'all') {
      return allExpeditionPhotos;
    }
    const place = places.find((p) => p.id === photoFilterId);
    if (!place) return allExpeditionPhotos;

    const photoList = place.photos && place.photos.length > 0
      ? place.photos
      : [place.coverPhoto || place.photo || ''];

    return photoList.map((src, i) => ({
      id: `${place.id}-archive-${i}`,
      title: `${place.location} — Frame ${String(i + 1).padStart(2, '0')}`,
      category: 'TRAVEL' as const,
      location: `${place.location}, ${place.region}`,
      date: place.date,
      src,
      caption: i === 0 ? place.story : `Expedition photography frame from ${place.location}.`,
      aspectRatio: (i % 3 === 0 ? 'landscape' : 'portrait') as 'landscape' | 'portrait',
    }));
  }, [photoFilterId, places, allExpeditionPhotos]);

  // Card photo cycling
  const handlePrevCardPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentPlacePhotos.length <= 1) return;
    setDestinationPhotoIndex((prev) => (prev - 1 + currentPlacePhotos.length) % currentPlacePhotos.length);
  };

  const handleNextCardPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentPlacePhotos.length <= 1) return;
    setDestinationPhotoIndex((prev) => (prev + 1) % currentPlacePhotos.length);
  };

  // Open Lightbox for current place
  const handleOpenPlaceLightbox = (photoIdx: number = destinationPhotoIndex) => {
    if (!selectedPlace) return;
    const placeItems: PhotoItem[] = currentPlacePhotos.map((src, i) => ({
      id: `${selectedPlace.id}-card-${i}`,
      title: `${selectedPlace.location} — Frame ${String(i + 1).padStart(2, '0')}`,
      category: 'TRAVEL' as const,
      location: `${selectedPlace.location}, ${selectedPlace.region}`,
      date: selectedPlace.date,
      src,
      caption: i === 0 ? selectedPlace.story : `Expedition frame from ${selectedPlace.location}.`,
      aspectRatio: i % 3 === 0 ? 'landscape' : 'portrait',
    }));
    setLightboxPhotos(placeItems);
    setActivePhotoIndex(photoIdx);
  };

  // Open Lightbox from archive grid
  const handleOpenArchiveLightbox = (index: number) => {
    setLightboxPhotos(displayedArchivePhotos);
    setActivePhotoIndex(index);
  };

  const handleNavigateLightbox = (direction: 'next' | 'prev') => {
    if (activePhotoIndex === null || lightboxPhotos.length === 0) return;
    if (direction === 'next') {
      setActivePhotoIndex((activePhotoIndex + 1) % lightboxPhotos.length);
    } else {
      setActivePhotoIndex((activePhotoIndex - 1 + lightboxPhotos.length) % lightboxPhotos.length);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="travel"
      className="relative border-t border-border-subtle overflow-hidden bg-bg-primary text-warmPaper"
    >
      <AdminTravelModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        onAddPlace={handleAddPlace}
        isAuthenticated={isAdminAuthenticated}
        onAuthenticate={() => onAuthenticateAdmin?.()}
      />

      {/* ═══════════════════════════════════════════════════
          1. CINEMATIC TRAVEL INTRO (IMG_8768.PNG)
      ═══════════════════════════════════════════════════ */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            key="travel-cinematic-intro"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 flex flex-col justify-end overflow-hidden bg-[#0A0A09]"
          >
            <div className="absolute inset-0 overflow-hidden">
              <motion.img
                src="/images/IMG_8768.PNG"
                alt="Travel expedition wallpaper"
                className="w-full h-full object-cover filter contrast-[1.05] brightness-90"
                initial={{ scale: 1.12, opacity: 0 }}
                animate={{ scale: 1.02, opacity: 1 }}
                transition={{ duration: 3.2, ease: [0.16, 1, 0.3, 1] }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A09] via-[#0A0A09]/60 to-[#0A0A09]/30" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A09]/80 via-transparent to-transparent" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pb-16 md:pb-24 w-full space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.5 }}
                className="flex items-center gap-2 font-mono text-[11px] tracking-[0.24em] text-accent-gold uppercase"
              >
                <Compass className="h-3.5 w-3.5 text-accent-amber animate-spin" style={{ animationDuration: '8s' }} />
                <span>05 // THE EXPEDITION ARCHIVE</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="font-display font-light text-warmPaper leading-[1.08] max-w-4xl"
                style={{ fontSize: 'clamp(2.2rem, 5.5vw, 4.4rem)' }}
              >
                "When the screen goes dark,{' '}
                <em className="not-italic italic text-accent-gold font-serif">I go outside.</em>"
              </motion.h2>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="flex items-center gap-6 pt-2"
              >
                <div className="h-0.5 w-36 bg-white/15 overflow-hidden rounded-full">
                  <motion.div
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ delay: 0.3, duration: 2.8, ease: 'linear' }}
                    className="h-full bg-accent-amber"
                  />
                </div>

                <button
                  onClick={handleSkipIntro}
                  onMouseEnter={() => setCursorState({ type: 'hover', label: 'ENTER' })}
                  onMouseLeave={() => setCursorState({ type: 'default' })}
                  className="group flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] text-warmGray hover:text-accent-gold uppercase transition-colors"
                >
                  <span>Enter journal</span>
                  <ArrowRight className="h-3.5 w-3.5 transform group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════════════════
          2. MAIN TRAVEL EXPERIENCE (SPLIT LAYOUT)
      ═══════════════════════════════════════════════════ */}
      <div className="py-24 md:py-32 px-6 md:px-12">
        <div className="max-w-7xl mx-auto space-y-12">

          {/* ── Section Header ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-border-subtle pb-8"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-accent-amber" />
                <span className="text-[11px] font-mono tracking-[0.24em] text-accent-gold uppercase">
                  05 // THE EXPEDITIONS
                </span>
              </div>
              <h2
                className="font-display font-light text-warmPaper leading-tight"
                style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)' }}
              >
                Travel journal &amp;{' '}
                <em className="not-italic italic text-accent-gold font-serif">geographic archive</em>
              </h2>
              <p className="font-mono text-xs text-warmGray max-w-xl leading-relaxed">
                Documenting landscapes across Bangladesh — mountain peaks, ocean shores, monsoon tea forests, and quiet corners. Select any pin to explore its visual log.
              </p>
            </div>

            {isAdminAuthenticated && (
              <button
                onClick={() => setIsAdminModalOpen(true)}
                onMouseEnter={() => setCursorState({ type: 'hover', label: 'ADD' })}
                onMouseLeave={() => setCursorState({ type: 'default' })}
                className="self-start md:self-auto flex items-center gap-2 px-4 py-2.5 rounded-full border border-accent-amber/50 text-accent-gold font-mono text-[11px] tracking-wider hover:bg-accent-amber hover:text-bg-primary transition-all shadow-md shadow-accent-amber/10"
              >
                <ShieldCheck className="h-4 w-4" />
                <span>PIN DESTINATION</span>
              </button>
            )}
          </motion.div>

          {/* ── Balanced Split Grid: Map (5 cols) + Destination Photo Stage (7 cols) ── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

            {/* LEFT (5 cols): Interactive Bangladesh Geographic Map */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-5 h-full min-h-[460px] md:min-h-[520px]"
            >
              <TravelMap
                places={places}
                selectedPlace={selectedPlace}
                onSelectPlace={handleSelectPlace}
                setCursorState={setCursorState}
                onOpenAdminModal={() => setIsAdminModalOpen(true)}
                isAdminAuthenticated={isAdminAuthenticated}
              />
            </motion.div>

            {/* RIGHT (7 cols): Destination Multi-Photo Stage & Story Spotlight */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="lg:col-span-7 h-full"
            >
              <AnimatePresence mode="wait">
                {selectedPlace ? (
                  <motion.div
                    key={selectedPlace.id}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full rounded-2xl md:rounded-3xl bg-bg-surface border border-border-subtle p-6 flex flex-col justify-between shadow-2xl space-y-5"
                  >
                    {/* Top: Location Metadata */}
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-stone">
                        <span className="text-accent-gold uppercase tracking-wider font-semibold">
                          {selectedPlace.region}
                        </span>
                        <span className="flex items-center gap-1.5 text-warmGray/80">
                          <Calendar className="h-3 w-3 text-accent-amber/70" />
                          {selectedPlace.date}
                        </span>
                      </div>

                      <div className="flex items-baseline justify-between gap-3">
                        <h3 className="font-display text-2xl md:text-3xl font-light text-warmPaper leading-tight">
                          {selectedPlace.location}
                        </h3>
                        <span className="text-[10px] font-mono text-stone/80 shrink-0">
                          {selectedPlace.coordinates.latitude.toFixed(4)}°N, {selectedPlace.coordinates.longitude.toFixed(4)}°E
                        </span>
                      </div>
                    </div>

                    {/* ── Active Photo Stage with Previous / Next Controls ── */}
                    <div className="space-y-3">
                      <div
                        onClick={() => handleOpenPlaceLightbox(destinationPhotoIndex)}
                        onMouseEnter={() => setCursorState({ type: 'explore', label: 'VIEW' })}
                        onMouseLeave={() => setCursorState({ type: 'default' })}
                        className="group relative cursor-pointer rounded-xl overflow-hidden bg-bg-card border border-border-subtle aspect-[16/10] shadow-lg"
                      >
                        <AnimatePresence mode="wait">
                          <motion.img
                            key={`${selectedPlace.id}-${destinationPhotoIndex}`}
                            src={currentPlacePhotos[destinationPhotoIndex] || currentPlacePhotos[0]}
                            alt={`${selectedPlace.location} frame ${destinationPhotoIndex + 1}`}
                            initial={{ opacity: 0, scale: 1.02 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="w-full h-full object-cover filter contrast-[1.03]"
                          />
                        </AnimatePresence>

                        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/80 via-transparent to-transparent pointer-events-none" />

                        {/* Top Badges */}
                        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                          <span className="px-2.5 py-1 rounded-md bg-bg-primary/80 backdrop-blur-md border border-border-subtle text-[10px] font-mono text-accent-gold">
                            FRAME {String(destinationPhotoIndex + 1).padStart(2, '0')} / {String(currentPlacePhotos.length).padStart(2, '0')}
                          </span>

                          <span className="p-1.5 rounded-full bg-bg-primary/80 backdrop-blur-md border border-border-subtle text-accent-gold pointer-events-auto">
                            <Maximize2 className="h-3.5 w-3.5" />
                          </span>
                        </div>

                        {/* Prev / Next Cycling Buttons */}
                        {currentPlacePhotos.length > 1 && (
                          <div className="absolute inset-y-0 left-2 right-2 flex items-center justify-between pointer-events-none">
                            <button
                              onClick={handlePrevCardPhoto}
                              className="pointer-events-auto p-2 rounded-full bg-bg-primary/75 hover:bg-accent-amber text-warmPaper hover:text-bg-primary border border-border-subtle transition-all duration-200 shadow-lg backdrop-blur-md"
                              aria-label="Previous photo"
                            >
                              <ChevronLeft className="h-4 w-4" />
                            </button>
                            <button
                              onClick={handleNextCardPhoto}
                              className="pointer-events-auto p-2 rounded-full bg-bg-primary/75 hover:bg-accent-amber text-warmPaper hover:text-bg-primary border border-border-subtle transition-all duration-200 shadow-lg backdrop-blur-md"
                              aria-label="Next photo"
                            >
                              <ChevronRight className="h-4 w-4" />
                            </button>
                          </div>
                        )}
                      </div>

                      {/* ── Multi-Photo Thumbnails Strip ── */}
                      {currentPlacePhotos.length > 1 && (
                        <div className="grid grid-cols-4 gap-2.5 sm:gap-3 pt-0.5">
                          {currentPlacePhotos.map((imgSrc, idx) => (
                            <button
                              key={idx}
                              onClick={() => setDestinationPhotoIndex(idx)}
                              onMouseEnter={() => setCursorState({ type: 'hover' })}
                              onMouseLeave={() => setCursorState({ type: 'default' })}
                              className={`relative rounded-xl overflow-hidden aspect-[4/3] border transition-all duration-200 group ${
                                destinationPhotoIndex === idx
                                  ? 'border-accent-amber ring-2 ring-accent-amber/30 scale-[1.03] shadow-md shadow-accent-amber/20'
                                  : 'border-border-subtle opacity-65 hover:opacity-100 hover:border-accent-amber/50'
                              }`}
                            >
                              <img
                                src={imgSrc}
                                alt={`Thumbnail ${idx + 1}`}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                              {destinationPhotoIndex === idx && (
                                <div className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-accent-amber shadow-sm" />
                              )}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Bottom: Story & Favourite Moment */}
                    <div className="space-y-4 pt-1">
                      <p className="text-xs md:text-sm text-warmGray/85 font-light leading-relaxed line-clamp-3 border-l-2 border-accent-amber/40 pl-3.5">
                        {selectedPlace.story}
                      </p>

                      <div className="p-3 rounded-xl bg-bg-card/70 border border-border-subtle/80 flex items-start gap-2.5">
                        <Heart className="h-3.5 w-3.5 text-accent-amber shrink-0 mt-0.5" />
                        <div>
                          <span className="text-[9px] font-mono text-accent-gold uppercase tracking-widest block mb-0.5">
                            Favourite Moment
                          </span>
                          <p className="font-display italic text-warmPaper text-xs md:text-sm leading-snug">
                            "{selectedPlace.favouriteMoment}"
                          </p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-between pt-1">
                        <button
                          onClick={() => handleOpenPlaceLightbox(destinationPhotoIndex)}
                          onMouseEnter={() => setCursorState({ type: 'hover', label: 'LIGHTBOX' })}
                          onMouseLeave={() => setCursorState({ type: 'default' })}
                          className="flex items-center gap-1.5 text-xs font-mono text-accent-gold hover:text-warmPaper transition-colors font-medium"
                        >
                          <span>Open Fullscreen Lightbox</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </button>

                        <button
                          onClick={() => handleSelectPlace(null)}
                          onMouseEnter={() => setCursorState({ type: 'hover', label: 'RESET' })}
                          onMouseLeave={() => setCursorState({ type: 'default' })}
                          className="text-[11px] font-mono text-stone hover:text-warmGray transition-colors"
                        >
                          View Overview
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="overview-card"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="h-full rounded-2xl md:rounded-3xl bg-bg-surface border border-border-subtle p-6 flex flex-col justify-between shadow-2xl space-y-6"
                  >
                    <div className="space-y-2">
                      <span className="text-[11px] font-mono text-accent-gold uppercase tracking-widest block">
                        BANGLADESH OVERVIEW
                      </span>
                      <h3 className="font-display text-2xl font-light text-warmPaper">
                        Select Any Pin On The Map
                      </h3>
                      <p className="text-xs text-warmGray leading-relaxed font-light">
                        Click on any coordinate pin or destination button below the map to zoom into its regional terrain and visual photo archive.
                      </p>
                    </div>

                    {/* Quick selection grid */}
                    <div className="grid grid-cols-2 gap-3 py-2">
                      {places.slice(0, 4).map((p) => (
                        <div
                          key={p.id}
                          onClick={() => handleSelectPlace(p)}
                          className="cursor-pointer group rounded-xl overflow-hidden border border-border-subtle bg-bg-card p-2 hover:border-accent-amber/50 transition-all space-y-1.5"
                        >
                          <img
                            src={p.coverPhoto || p.photo}
                            alt={p.location}
                            className="w-full h-24 object-cover rounded-lg group-hover:scale-105 transition-transform duration-500"
                          />
                          <p className="font-mono text-[10px] text-warmPaper group-hover:text-accent-gold truncate font-medium">
                            {p.location}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 text-center text-xs font-mono text-stone">
                      {places.length} EXPEDITIONS DOCUMENTED ACROSS 5 DIVISIONS
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

          </div>

          {/* ── Synchronized Travel Photo Archive Strip ── */}
          <div className="space-y-8 pt-8 border-t border-border-subtle/80">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-accent-gold uppercase tracking-widest block">
                  EXPEDITION PHOTO ARCHIVE
                </span>
                <h3 className="text-xl md:text-2xl font-display font-light text-warmPaper">
                  {photoFilterId === 'all'
                    ? 'Photographic Archive Across Bangladesh'
                    : `${places.find((p) => p.id === photoFilterId)?.location || ''} Visual Frames`}
                </h3>
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
                <button
                  onClick={() => setPhotoFilterId('all')}
                  onMouseEnter={() => setCursorState({ type: 'hover' })}
                  onMouseLeave={() => setCursorState({ type: 'default' })}
                  className={`px-3 py-1.5 rounded-full text-[10px] font-mono uppercase tracking-wider transition-all whitespace-nowrap border ${
                    photoFilterId === 'all'
                      ? 'bg-accent-amber text-bg-primary border-accent-amber font-semibold shadow-md shadow-accent-amber/20'
                      : 'bg-bg-surface text-warmGray border-border-subtle hover:text-warmPaper hover:border-accent-amber/40'
                  }`}
                >
                  All ({allExpeditionPhotos.length})
                </button>
                {places.map((place) => {
                  const isSelected = photoFilterId === place.id;
                  const count = place.photos?.length || 1;
                  return (
                    <button
                      key={place.id}
                      onClick={() => {
                        setPhotoFilterId(place.id);
                        setSelectedPlace(place);
                        setDestinationPhotoIndex(0);
                      }}
                      onMouseEnter={() => setCursorState({ type: 'hover', label: place.location })}
                      onMouseLeave={() => setCursorState({ type: 'default' })}
                      className={`px-3 py-1.5 rounded-full text-[10px] font-mono tracking-wider transition-all whitespace-nowrap border ${
                        isSelected
                          ? 'bg-accent-amber text-bg-primary border-accent-amber font-semibold shadow-md shadow-accent-amber/20'
                          : 'bg-bg-surface text-warmGray border-border-subtle hover:text-warmPaper hover:border-accent-amber/40'
                      }`}
                    >
                      {place.location} ({count})
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Photo Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
              {displayedArchivePhotos.map((photo, idx) => (
                <motion.div
                  key={photo.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.45, delay: (idx % 8) * 0.05 }}
                  onClick={() => {
                    handleOpenArchiveLightbox(idx);
                    setCursorState({ type: 'default' });
                  }}
                  onMouseEnter={() => setCursorState({ type: 'explore', label: 'VIEW' })}
                  onMouseLeave={() => setCursorState({ type: 'default' })}
                  className="group relative cursor-pointer rounded-xl overflow-hidden bg-bg-card border border-border-subtle hover:border-accent-amber/60 transition-all duration-300 shadow-xl aspect-[4/3]"
                >
                  <img
                    src={photo.src}
                    alt={photo.title}
                    loading="lazy"
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out filter contrast-[1.03]"
                  />

                  {/* Gradient Overlay & Metadata on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/95 via-bg-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3.5">
                    <div className="flex justify-between items-start">
                      <span className="px-2 py-0.5 rounded bg-bg-surface/85 backdrop-blur-md border border-border-subtle text-[9px] font-mono text-accent-gold uppercase tracking-wider">
                        Frame {String(idx + 1).padStart(2, '0')}
                      </span>
                      <span className="p-1.5 rounded-full bg-bg-surface/85 border border-border-subtle text-accent-gold backdrop-blur-md">
                        <Maximize2 className="h-3 w-3" />
                      </span>
                    </div>

                    <div className="space-y-0.5 transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                      <h4 className="text-xs font-display font-medium text-warmPaper leading-tight truncate">
                        {photo.title}
                      </h4>
                      <p className="text-[10px] font-mono text-stone truncate">
                        {photo.location}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ═══════════════════════════════════════════════════
          3. FULL-RESOLUTION LIGHTBOX
      ═══════════════════════════════════════════════════ */}
      <Lightbox
        photo={activePhotoIndex !== null ? lightboxPhotos[activePhotoIndex] : null}
        photos={lightboxPhotos}
        onClose={() => setActivePhotoIndex(null)}
        onNavigate={handleNavigateLightbox}
        setCursorState={setCursorState}
      />
    </section>
  );
};
