import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Calendar, ArrowRight, ArrowLeft, Heart, X, Compass, ShieldCheck } from 'lucide-react';
import { travelPlaces as initialPlaces } from '../data/portfolioData';
import { TravelPlace } from '../types';
import { TravelMap } from './TravelMap';
import { AdminTravelModal } from './AdminTravelModal';
import { CursorState } from './CustomCursor';

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
  const [selectedPlace, setSelectedPlace] = useState<TravelPlace | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('ALL');
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Load custom places from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('mehedi_travel_places');
      if (stored) {
        const customPlaces: TravelPlace[] = JSON.parse(stored);
        if (Array.isArray(customPlaces) && customPlaces.length > 0) {
          const existingIds = new Set(initialPlaces.map(p => p.id));
          const uniqueCustom = customPlaces.filter(p => !existingIds.has(p.id));
          setPlaces([...uniqueCustom, ...initialPlaces]);
        }
      }
    } catch (e) {
      console.error('Failed to load travel places from localStorage', e);
    }
  }, []);

  const handleAddPlace = (newPlace: TravelPlace) => {
    const updated = [newPlace, ...places];
    setPlaces(updated);

    try {
      const customOnly = updated.filter(p => p.id.startsWith('custom-'));
      localStorage.setItem('mehedi_travel_places', JSON.stringify(customOnly));
    } catch (e) {
      console.error('Failed to save travel place to localStorage', e);
    }
  };

  const categories = ['ALL', 'Chittagong Division', 'Sylhet Division', 'Dhaka Division'];

  const filteredPlaces = activeFilter === 'ALL'
    ? places
    : places.filter(p => p.region.toLowerCase().includes(activeFilter.toLowerCase().split(' ')[0]));

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="travel" className="py-24 md:py-36 px-6 md:px-12 bg-bg-surface/30 relative border-t border-border-subtle">
      
      {/* Admin Add Travel Modal */}
      <AdminTravelModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        onAddPlace={handleAddPlace}
        isAuthenticated={isAdminAuthenticated}
        onAuthenticate={() => onAuthenticateAdmin?.()}
      />

      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-border-subtle/80 pb-10">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-accent-gold uppercase">
              <Compass className="h-4 w-4 text-accent-amber animate-spin-slow" />
              <span>04 // TRAVEL JOURNAL</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-display font-extrabold text-text-primary tracking-tight">
              BEYOND CODE.
            </h2>
            <p className="text-xl sm:text-2xl font-display font-bold text-accent-amber leading-snug">
              “When the screen goes dark, I go outside.”
            </p>
            <p className="text-sm sm:text-base text-text-secondary font-light leading-relaxed">
              Stepping away from terminals and algorithms, I document journeys across Bangladesh—capturing stories, landscapes, and quiet moments that inspire creative balance.
            </p>
          </div>

          {/* Action & Filters */}
          <div className="flex flex-col items-start lg:items-end gap-3">
            <button
              onClick={() => setIsAdminModalOpen(true)}
              onMouseEnter={() => setCursorState({ type: 'hover', label: 'ADMIN' })}
              onMouseLeave={() => setCursorState({ type: 'default' })}
              className="px-4 py-2 rounded-xl bg-accent-amber/10 border border-accent-amber/30 text-accent-amber hover:bg-accent-amber hover:text-bg-primary font-mono text-xs tracking-wider transition-all duration-300 flex items-center gap-2 shadow-md"
            >
              <ShieldCheck className="h-4 w-4" /> {isAdminAuthenticated ? 'ADD DESTINATION & UPLOAD PHOTO' : 'ADMIN LOGIN / UPLOAD'}
            </button>

            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-4 py-2 rounded-full font-mono text-xs tracking-wider transition-all duration-300 ${
                    activeFilter === cat
                      ? 'bg-accent-amber text-bg-primary font-bold shadow-md shadow-accent-amber/20'
                      : 'bg-bg-surface border border-border-subtle text-text-secondary hover:text-accent-gold hover:border-accent-amber/40'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* High-Precision Interactive Bangladesh Map */}
        <TravelMap
          places={places}
          setCursorState={setCursorState}
          onOpenAdminModal={() => setIsAdminModalOpen(true)}
        />

        {/* Travel Log Expedition Cards Header */}
        <div className="flex items-center justify-between pt-6">
          <div>
            <span className="text-[11px] font-mono text-accent-gold uppercase tracking-widest block">
              DISCOVER DESTINATIONS
            </span>
            <h3 className="text-2xl font-display font-bold text-text-primary">
              EXPEDITION LOGS ({filteredPlaces.length})
            </h3>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => scroll('left')}
              className="p-3 rounded-full bg-bg-card border border-border-subtle text-text-secondary hover:text-accent-gold hover:border-accent-amber transition-all duration-200"
              aria-label="Scroll Left"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-3 rounded-full bg-bg-card border border-border-subtle text-text-secondary hover:text-accent-gold hover:border-accent-amber transition-all duration-200"
              aria-label="Scroll Right"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Expedition Cards Carousel */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto no-scrollbar pb-6 scroll-smooth snap-x snap-mandatory"
        >
          {filteredPlaces.map((place) => (
            <motion.div
              key={place.id}
              whileHover={{ y: -6 }}
              onClick={() => setSelectedPlace(place)}
              onMouseEnter={() => setCursorState({ type: 'explore', label: place.location })}
              onMouseLeave={() => setCursorState({ type: 'default' })}
              className="min-w-[300px] sm:min-w-[360px] snap-start rounded-2xl bg-bg-card border border-border-subtle p-5 flex flex-col justify-between space-y-5 hover:border-accent-amber/50 transition-all duration-300 shadow-xl cursor-pointer group"
            >
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-bg-primary">
                <img
                  src={place.photo}
                  alt={place.location}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-bg-primary/80 backdrop-blur-md border border-white/10 text-[11px] font-mono text-accent-gold flex items-center gap-1">
                  <MapPin className="h-3 w-3 text-accent-amber" /> {place.location}
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-[11px] font-mono text-text-muted">{place.date}</span>
                <h4 className="text-lg font-display font-bold text-text-primary group-hover:text-accent-gold transition-colors">
                  {place.location}
                </h4>
                <p className="text-xs sm:text-sm text-text-secondary line-clamp-3 font-light leading-relaxed">
                  {place.story}
                </p>
              </div>

              <div className="pt-3 border-t border-border-subtle/80 flex items-center justify-between text-xs font-mono text-accent-gold">
                <span>{place.region}</span>
                <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  READ LOG <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Story Detailed Modal */}
      <AnimatePresence>
        {selectedPlace && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPlace(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-bg-primary/90 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-bg-surface border border-border-subtle p-6 sm:p-8 shadow-2xl space-y-6"
            >
              <button
                onClick={() => setSelectedPlace(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-bg-card border border-border-subtle text-text-secondary hover:text-accent-gold transition-colors z-10"
                aria-label="Close modal"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-bg-primary relative">
                <img
                  src={selectedPlace.photo}
                  alt={selectedPlace.location}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-4 px-3.5 py-1.5 rounded-xl bg-bg-primary/80 backdrop-blur-md border border-white/10 text-xs font-mono text-accent-gold flex items-center gap-2">
                  <Calendar className="h-3.5 w-3.5" /> {selectedPlace.date}
                </div>
              </div>

              <div>
                <span className="text-xs font-mono text-accent-gold uppercase tracking-widest">
                  {selectedPlace.region}
                </span>
                <h3 className="text-3xl font-display font-extrabold text-text-primary mt-1">
                  {selectedPlace.location}
                </h3>
              </div>

              <p className="text-base text-text-secondary leading-relaxed font-light border-l-2 border-accent-amber/40 pl-5">
                {selectedPlace.story}
              </p>

              <div className="p-4 rounded-2xl bg-bg-card border border-border-subtle flex items-start gap-3.5">
                <Heart className="h-5 w-5 text-accent-amber shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-mono text-accent-gold uppercase tracking-wider block">
                    FAVOURITE MOMENT
                  </span>
                  <p className="text-sm text-text-primary italic mt-1 font-serif">
                    "{selectedPlace.favouriteMoment}"
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
