import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Plus, Lock } from 'lucide-react';
import { travelLocations as defaultLocations } from '../data/travelLocations';
import { TravelLocation, TravelPhoto, TravelLightboxState } from '../types/travel';
import { TravelMap } from './TravelMap';
import { TravelIntro } from './TravelIntro';
import { TravelLocationPanel } from './TravelLocationPanel';
import { TravelLightbox } from './TravelLightbox';
import { AdminTravelModal } from './AdminTravelModal';
import {
  fetchLocationsFromSupabase,
  deleteLocationFromSupabase,
  isSupabaseConfigured,
} from '../lib/supabase';
import type { CursorState } from './CustomCursor';
import type { TravelPlace } from '../types';

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
  // Travel Locations State
  const [locations, setLocations] = useState<TravelLocation[]>(defaultLocations);
  const [isAdminTravelModalOpen, setIsAdminTravelModalOpen] = useState(false);
  const [adminModalTab, setAdminModalTab] = useState<'expeditions' | 'messages'>('expeditions');
  const [editingLocation, setEditingLocation] = useState<TravelLocation | null>(null);

  // Default to Cox's Bazar so the panel and photos match the mockup immediately
  const [selectedLocation, setSelectedLocation] = useState<TravelLocation | null>(defaultLocations[0] || null);

  // Fetch Supabase locations on mount
  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      try {
        const remote = await fetchLocationsFromSupabase();
        if (isMounted && remote && remote.length > 0) {
          setLocations(remote);
          setSelectedLocation((prev) => {
            if (!prev) return remote[0];
            const exists = remote.find((l) => l.id === prev.id);
            return exists || remote[0];
          });
        }
      } catch (err) {
        console.warn('Failed to fetch locations from Supabase:', err);
      }
    }
    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  // Listen to open-admin-modal event
  useEffect(() => {
    const handleOpenAdmin = (e: any) => {
      const tab = e?.detail?.tab || 'expeditions';
      setAdminModalTab(tab);
      setEditingLocation(null);
      setIsAdminTravelModalOpen(true);
    };
    window.addEventListener('open-admin-modal', handleOpenAdmin);
    return () => window.removeEventListener('open-admin-modal', handleOpenAdmin);
  }, []);

  const handleOpenAddModal = () => {
    setEditingLocation(null);
    setAdminModalTab('expeditions');
    setIsAdminTravelModalOpen(true);
  };

  const handleEditLocation = (loc: TravelLocation) => {
    setEditingLocation(loc);
    setAdminModalTab('expeditions');
    setIsAdminTravelModalOpen(true);
  };

  const handleAddNewPlace = (newPlace: TravelPlace) => {
    const mappedPhotos: TravelPhoto[] = (newPlace.photos || [newPlace.coverPhoto || newPlace.photo || '']).map((url, idx) => ({
      id: `photo-${Date.now()}-${idx}`,
      url,
      thumbnailUrl: url,
      caption: newPlace.location,
      aspectRatio: 'landscape',
    }));

    const newLoc: TravelLocation = {
      id: newPlace.id,
      name: newPlace.location,
      district: newPlace.region,
      division: newPlace.region,
      country: 'Bangladesh',
      latitude: newPlace.coordinates.latitude,
      longitude: newPlace.coordinates.longitude,
      description: newPlace.story,
      quote: newPlace.favouriteMoment || '',
      favouriteMoment: newPlace.favouriteMoment || '',
      visitedDate: newPlace.date,
      coverImage: newPlace.coverPhoto || newPlace.photo || mappedPhotos[0]?.url || '',
      totalPhotosCount: mappedPhotos.length,
      photos: mappedPhotos,

      // Aliases
      location: newPlace.location,
      region: newPlace.region,
      coordinates: newPlace.coordinates,
      date: newPlace.date || '',
      coverPhoto: newPlace.coverPhoto || newPlace.photo || mappedPhotos[0]?.url || '',
      story: newPlace.story || '',
    };

    setLocations((prev) => [newLoc, ...prev.filter((p) => p.id !== newLoc.id)]);
    setSelectedLocation(newLoc);
  };

  const handleUpdatePlace = (updatedPlace: TravelPlace) => {
    const mappedPhotos: TravelPhoto[] = (updatedPlace.photos || [updatedPlace.coverPhoto || updatedPlace.photo || '']).map((url, idx) => ({
      id: `photo-${Date.now()}-${idx}`,
      url,
      thumbnailUrl: url,
      caption: updatedPlace.location,
      aspectRatio: 'landscape',
    }));

    const updatedLoc: TravelLocation = {
      id: updatedPlace.id,
      name: updatedPlace.location,
      district: updatedPlace.region,
      division: updatedPlace.region,
      country: 'Bangladesh',
      latitude: updatedPlace.coordinates.latitude,
      longitude: updatedPlace.coordinates.longitude,
      description: updatedPlace.story,
      quote: updatedPlace.favouriteMoment || '',
      favouriteMoment: updatedPlace.favouriteMoment || '',
      visitedDate: updatedPlace.date,
      coverImage: updatedPlace.coverPhoto || updatedPlace.photo || mappedPhotos[0]?.url || '',
      totalPhotosCount: mappedPhotos.length,
      photos: mappedPhotos,

      // Aliases
      location: updatedPlace.location,
      region: updatedPlace.region,
      coordinates: updatedPlace.coordinates,
      date: updatedPlace.date || '',
      coverPhoto: updatedPlace.coverPhoto || updatedPlace.photo || mappedPhotos[0]?.url || '',
      story: updatedPlace.story || '',
    };

    setLocations((prev) => prev.map((p) => (p.id === updatedLoc.id ? updatedLoc : p)));
    setSelectedLocation(updatedLoc);
  };

  const handleDeletePlace = async (placeId: string) => {
    try {
      if (isSupabaseConfigured) {
        await deleteLocationFromSupabase(placeId);
      }
    } catch (err) {
      console.warn('Error deleting location from Supabase:', err);
    }
    setLocations((prev) => {
      const remaining = prev.filter((p) => p.id !== placeId);
      if (selectedLocation?.id === placeId) {
        setSelectedLocation(remaining[0] || null);
      }
      return remaining;
    });
  };

  // Cinematic Intro State — runs once per browser session
  const [showIntro, setShowIntro] = useState<boolean>(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Lightbox State
  const [lightboxState, setLightboxState] = useState<TravelLightboxState>({
    isOpen: false,
    activePhotoIndex: 0,
    photos: [],
    locationName: '',
    division: '',
  });

  // Check and run cinematic intro once per session
  useEffect(() => {
    const hasPlayed = sessionStorage.getItem('mehedi_travel_intro_played');
    if (hasPlayed) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !sessionStorage.getItem('mehedi_travel_intro_played')) {
          sessionStorage.setItem('mehedi_travel_intro_played', 'true');
          setShowIntro(true);
        }
      },
      { threshold: 0.08 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleDismissIntro = () => {
    setShowIntro(false);
    sessionStorage.setItem('mehedi_travel_intro_played', 'true');
  };

  // Location Selection Handler
  const handleSelectLocation = useCallback(
    (place: TravelPlace | TravelLocation | null) => {
      if (!place) {
        setSelectedLocation(null);
        return;
      }
      const matched = locations.find((l) => l.id === place.id) || (place as TravelLocation);
      setSelectedLocation(matched);
    },
    [locations]
  );

  // Cycle Previous Location
  const handlePrevLocation = useCallback(() => {
    if (!selectedLocation) {
      setSelectedLocation(locations[0]);
      return;
    }
    const currentIndex = locations.findIndex((l) => l.id === selectedLocation.id);
    const prevIndex = (currentIndex - 1 + locations.length) % locations.length;
    setSelectedLocation(locations[prevIndex]);
  }, [selectedLocation, locations]);

  // Cycle Next Location
  const handleNextLocation = useCallback(() => {
    if (!selectedLocation) {
      setSelectedLocation(locations[0]);
      return;
    }
    const currentIndex = locations.findIndex((l) => l.id === selectedLocation.id);
    const nextIndex = (currentIndex + 1) % locations.length;
    setSelectedLocation(locations[nextIndex]);
  }, [selectedLocation, locations]);

  // View on Map (re-select to trigger camera flight)
  const handleViewOnMap = useCallback(
    (loc: TravelLocation) => {
      handleSelectLocation(loc);
    },
    [handleSelectLocation]
  );

  // Open Lightbox
  const handleOpenPhotoLightbox = (
    photos: TravelPhoto[],
    initialIndex: number,
    locationName: string,
    division?: string
  ) => {
    setLightboxState({
      isOpen: true,
      activePhotoIndex: initialIndex,
      photos,
      locationName,
      division,
    });
  };

  // Close Lightbox
  const handleCloseLightbox = () => {
    setLightboxState((prev) => ({ ...prev, isOpen: false }));
  };

  // Lightbox Navigation (Previous / Next)
  const handleNavigateLightbox = (direction: 'next' | 'prev') => {
    setLightboxState((prev) => {
      const total = prev.photos.length;
      if (total <= 1) return prev;
      const nextIndex =
        direction === 'next'
          ? (prev.activePhotoIndex + 1) % total
          : (prev.activePhotoIndex - 1 + total) % total;
      return { ...prev, activePhotoIndex: nextIndex };
    });
  };

  return (
    <section
      ref={sectionRef}
      id="travel"
      className="relative border-t border-border-subtle overflow-hidden bg-bg-primary text-warmPaper"
    >
      {/* ═══════════════════════════════════════════════════
          1. CINEMATIC TRAVEL INTRO (Once per session)
      ═══════════════════════════════════════════════════ */}
      <TravelIntro
        showIntro={showIntro}
        onEnter={handleDismissIntro}
        setCursorState={setCursorState}
      />

      {/* ═══════════════════════════════════════════════════
          2. FULLSCREEN CINEMATIC LIGHTBOX
      ═══════════════════════════════════════════════════ */}
      <TravelLightbox
        isOpen={lightboxState.isOpen}
        photos={lightboxState.photos}
        currentIndex={lightboxState.activePhotoIndex}
        locationName={lightboxState.locationName}
        division={lightboxState.division}
        onClose={handleCloseLightbox}
        onNavigate={handleNavigateLightbox}
        setCursorState={setCursorState}
      />

      {/* ═══════════════════════════════════════════════════
          3. MAIN TRAVEL SECTION (MATCHING REFERENCE MOCKUP)
      ═══════════════════════════════════════════════════ */}
      <div className="py-16 md:py-24 px-4 sm:px-6 md:px-12">
        <div className="max-w-7xl mx-auto space-y-8 md:space-y-10">
          {/* ── Editorial Section Header ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border-subtle/60 pb-6"
          >
            <div>
              <span className="text-xs font-mono tracking-[0.25em] text-accent-gold uppercase font-semibold">
                05 // TRAVEL &amp; EXPEDITIONS
              </span>
              <h2 className="font-display font-light text-warmPaper text-2xl sm:text-3xl md:text-4xl lg:text-5xl mt-2 tracking-tight">
                Travel journal &amp;{' '}
                <em className="not-italic italic text-accent-gold font-serif">geographic archive</em>
              </h2>
              <p className="font-sans text-xs sm:text-sm text-warmGray/80 mt-2 max-w-xl font-light">
                A living archive of journeys, coordinates, and visual memories across Bangladesh.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0 self-start md:self-end">
              {isAdminAuthenticated ? (
                <button
                  onClick={handleOpenAddModal}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-accent-amber text-bg-primary text-xs font-mono font-bold hover:bg-accent-gold transition-all shadow-md shadow-accent-amber/20"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>ADD EXPEDITION</span>
                </button>
              ) : (
                <button
                  onClick={onAuthenticateAdmin}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl border border-border-subtle bg-bg-card/60 hover:border-accent-amber/40 text-text-muted hover:text-accent-gold text-xs font-mono transition-colors"
                  title="Admin Portal"
                >
                  <Lock className="h-3 w-3" />
                  <span>Admin</span>
                </button>
              )}
            </div>
          </motion.div>

          {/* ── 50/50 Side-by-Side Main Grid (Matching Mockup) ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xl:gap-8 items-stretch">
            {/* LEFT CARD: Real MapLibre Satellite Hybrid Map with Circular Photo Markers */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7 }}
              className="w-full h-full"
            >
              <TravelMap
                places={locations as unknown as TravelPlace[]}
                selectedPlace={selectedLocation as unknown as TravelPlace}
                onSelectPlace={handleSelectLocation}
                setCursorState={setCursorState}
                isAdminAuthenticated={isAdminAuthenticated}
                onOpenAdminModal={handleOpenAddModal}
              />
            </motion.div>

            {/* RIGHT CARD: Location Detail & Curated Photo Archive Panel */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: 0.08 }}
              className="w-full h-full"
            >
              <TravelLocationPanel
                location={selectedLocation}
                locations={locations}
                onSelectLocation={handleSelectLocation}
                onPrevLocation={handlePrevLocation}
                onNextLocation={handleNextLocation}
                onViewOnMap={handleViewOnMap}
                onOpenLightbox={handleOpenPhotoLightbox}
                setCursorState={setCursorState}
                isAdminAuthenticated={isAdminAuthenticated}
                onEditLocation={handleEditLocation}
                onDeleteLocation={handleDeletePlace}
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════
          4. ADMIN EXPEDITION & PHOTO UPLOAD MODAL
      ═══════════════════════════════════════════════════ */}
      <AdminTravelModal
        isOpen={isAdminTravelModalOpen}
        onClose={() => {
          setIsAdminTravelModalOpen(false);
          setEditingLocation(null);
        }}
        onAddPlace={handleAddNewPlace}
        onUpdatePlace={handleUpdatePlace}
        onDeletePlace={handleDeletePlace}
        initialPlace={editingLocation}
        isAuthenticated={isAdminAuthenticated}
        onAuthenticate={onAuthenticateAdmin || (() => {})}
        initialTab={adminModalTab}
      />
    </section>
  );
};
