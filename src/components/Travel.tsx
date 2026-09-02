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
  
  // Cinematic intro state
  const [showIntro, setShowIntro] = useState(false);
  const [hasPlayedIntro, setHasPlayedIntro] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Trigger intro when section enters viewport for first time
  useEffect(() => {
    if (hasPlayedIntro) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasPlayedIntro) {
            setShowIntro(true);
            setHasPlayedIntro(true);
            
            // Auto-hide intro after 3.5 seconds
            setTimeout(() => {
              setShowIntro(false);
            }, 3500);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasPlayedIntro]);

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
    <section
      ref={sectionRef}
      id="travel"
      className="relative border-t border-border-subtle overflow-hidden bg-bg-surface"
    >
      {/* Admin Add Travel Modal */}
      <AdminTravelModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        onAddPlace={handleAddPlace}
        isAuthenticated={isAdminAuthenticated}
        onAuthenticate={() => onAuthenticateAdmin?.()}
      />

      {/* ═══════════════════════════════════════════════════════════════
          CINEMATIC INTRO - FULL SCREEN HERO IMAGE (3.5 seconds)
      ═══════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0,
              scale: 0.95,
              filter: 'blur(12px)'
            }}
            transition={{ 
              duration: 0.7, 
              ease: [0.22, 1, 0.36, 1] 
            }}
            className="absolute inset-0 z-50 h-screen flex items-center justify-center bg-bg-primary"
          >
            {/* Full-screen hero image */}
            <div className="absolute inset-0">
              <motion.img
                src="/images/travel_intro_wall.jpg"
                alt="Travel Memory Wall"
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="w-full h-full object-cover"
              />
              
              {/* Gradient overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/85 via-bg-primary/40 to-bg-primary/60" />
            </div>

            {/* Centered content */}
            <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-5">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="flex items-center justify-center"
              >
                <div className="px-4 py-1.5 rounded-full bg-bg-primary/80 backdrop-blur-xl border border-accent-amber/40">
                  <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-accent-gold uppercase">
                    <Compass className="h-3.5 w-3.5 text-accent-amber" />
                    <span>04 // TRAVEL JOURNAL</span>
                  </div>
                </div>
              </motion.div>

              {/* Main quote - more compact */}
              <motion.h2
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.7 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-extrabold text-white leading-[1.15] tracking-tight"
              >
                "WHEN THE SCREEN GOES DARK,{' '}
                <span className="text-accent-amber font-serif italic">I go outside.</span>"
              </motion.h2>

              {/* Loading bar - compact */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.4 }}
                className="pt-6"
              >
                <div className="w-48 h-0.5 mx-auto bg-white/20 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ delay: 1.2, duration: 2.2, ease: 'easeInOut' }}
                    className="h-full bg-gradient-to-r from-accent-amber to-accent-gold"
                  />
                </div>
              </motion.div>
            </div>

            {/* Skip button - smaller */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3, duration: 0.4 }}
              onClick={() => setShowIntro(false)}
              onMouseEnter={() => setCursorState({ type: 'hover' })}
              onMouseLeave={() => setCursorState({ type: 'default' })}
              className="absolute bottom-6 right-6 px-4 py-2 rounded-full bg-white/5 hover:bg-accent-amber/20 backdrop-blur-md border border-white/10 hover:border-accent-amber/40 text-white/70 hover:text-accent-gold font-mono text-[10px] font-bold tracking-wider transition-all duration-300 flex items-center gap-1.5"
            >
              SKIP <ArrowRight className="h-3 w-3" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════════════════════════════
          MAIN TRAVEL SECTION (Compact, immediately visible after intro)
      ═══════════════════════════════════════════════════════════════ */}
      <div className="py-16 md:py-20 px-6 md:px-12">
        {/* Background ambient glow */}
        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-accent-amber/4 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto space-y-12 relative">
        
        {/* Section Header - Compact Version */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-6"
        >
          {/* Compact header */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="px-3 py-1 rounded-full bg-accent-amber/10 border border-accent-amber/30">
                <div className="flex items-center gap-1.5 text-[10px] font-mono tracking-widest text-accent-gold uppercase">
                  <Compass className="h-3 w-3 text-accent-amber" />
                  <span>04 // TRAVEL JOURNAL</span>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold text-text-primary tracking-tight leading-tight">
                BEYOND CODE.
              </h2>
              <p className="text-base sm:text-lg md:text-xl font-display font-bold text-accent-amber mt-1">
                "When the screen goes dark, I go outside."
              </p>
            </div>

            <p className="text-xs sm:text-sm text-text-secondary max-w-2xl leading-relaxed">
              Documenting journeys across Bangladesh—capturing stories, landscapes, and quiet moments.
            </p>
          </div>

          {/* Stats and controls - more compact */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <motion.div
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="space-y-1"
            >
              <h3 className="text-lg sm:text-xl font-display font-bold text-text-primary">
                EXPEDITION LOGS
              </h3>
              <p className="text-[10px] text-text-muted font-mono">
                {filteredPlaces.length} {filteredPlaces.length === 1 ? 'destination' : 'destinations'}
              </p>
            </motion.div>

            {/* Filters and Admin - more compact */}
            <motion.div
              initial={{ opacity: 0, x: 15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex flex-wrap items-center gap-2"
            >
              {/* Filter buttons - smaller */}
              {categories.map((cat, index) => (
                <motion.button
                  key={cat}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + index * 0.08, duration: 0.3 }}
                  onClick={() => setActiveFilter(cat)}
                  onMouseEnter={() => setCursorState({ type: 'hover' })}
                  onMouseLeave={() => setCursorState({ type: 'default' })}
                  className={`px-3 py-1.5 rounded-full font-mono text-[10px] tracking-wider transition-all duration-300 ${
                    activeFilter === cat
                      ? 'bg-accent-amber text-bg-primary font-bold'
                      : 'bg-bg-card border border-border-subtle text-text-secondary hover:text-accent-gold hover:border-accent-amber/40'
                  }`}
                >
                  {cat}
                </motion.button>
              ))}

              {/* Admin button - smaller */}
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7, duration: 0.3 }}
                onClick={() => setIsAdminModalOpen(true)}
                onMouseEnter={() => setCursorState({ type: 'hover', label: 'ADMIN' })}
                onMouseLeave={() => setCursorState({ type: 'default' })}
                className="px-3 py-1.5 rounded-lg bg-accent-amber/10 border border-accent-amber/30 text-accent-amber hover:bg-accent-amber hover:text-bg-primary font-mono text-[10px] tracking-wider transition-all duration-300 flex items-center gap-1.5"
              >
                <ShieldCheck className="h-3 w-3" />
                <span>ADMIN</span>
              </motion.button>
            </motion.div>
          </div>
        </motion.div>

        {/* Interactive Map - more compact */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <TravelMap
            places={places}
            onOpenAdminModal={() => setIsAdminModalOpen(true)}
          />
        </motion.div>

        {/* Expedition Cards Section - more compact */}
        <div className="space-y-6">
          {/* Cards Header with scroll controls - smaller */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-between"
          >
            <div>
              <span className="text-[10px] font-mono text-accent-gold uppercase tracking-widest block">
                DISCOVER DESTINATIONS
              </span>
              <h3 className="text-lg sm:text-xl font-display font-bold text-text-primary">
                DETAILED STORIES
              </h3>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => scroll('left')}
                onMouseEnter={() => setCursorState({ type: 'hover' })}
                onMouseLeave={() => setCursorState({ type: 'default' })}
                className="p-2 rounded-full bg-bg-card border border-border-subtle text-text-secondary hover:text-accent-gold hover:border-accent-amber hover:-translate-x-0.5 transition-all duration-200"
                aria-label="Scroll Left"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => scroll('right')}
                onMouseEnter={() => setCursorState({ type: 'hover' })}
                onMouseLeave={() => setCursorState({ type: 'default' })}
                className="p-2 rounded-full bg-bg-card border border-border-subtle text-text-secondary hover:text-accent-gold hover:border-accent-amber hover:translate-x-0.5 transition-all duration-200"
                aria-label="Scroll Right"
              >
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </motion.div>

          {/* Expedition Cards Carousel - smaller cards */}
          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto no-scrollbar pb-4 scroll-smooth snap-x snap-mandatory"
          >
            {filteredPlaces.map((place, index) => (
              <motion.div
                key={place.id}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6 }}
                onClick={() => {
                  setSelectedPlace(place);
                  setCursorState({ type: 'default' });
                }}
                onMouseEnter={() => setCursorState({ type: 'explore', label: 'VIEW' })}
                onMouseLeave={() => setCursorState({ type: 'default' })}
                className="min-w-[280px] sm:min-w-[320px] snap-start rounded-2xl bg-bg-card border border-border-subtle p-4 flex flex-col space-y-4 hover:border-accent-amber/50 hover:shadow-xl hover:shadow-accent-amber/10 transition-all duration-300 cursor-pointer group"
              >
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-bg-primary">
                  <img
                    src={place.photo}
                    alt={place.location}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-bg-primary/90 backdrop-blur-md border border-accent-amber/20 text-[10px] font-mono text-accent-gold flex items-center gap-1">
                    <MapPin className="h-2.5 w-2.5 text-accent-amber" /> 
                    <span>{place.location}</span>
                  </div>
                </div>

                <div className="space-y-2 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-text-muted">{place.date}</span>
                    <span className="text-[9px] font-mono text-accent-amber/60 uppercase tracking-wider">{place.region.split(' ')[0]}</span>
                  </div>
                  <h4 className="text-base font-display font-bold text-text-primary group-hover:text-accent-gold transition-colors">
                    {place.location}
                  </h4>
                  <p className="text-xs text-text-secondary line-clamp-2 font-light leading-relaxed">
                    {place.story}
                  </p>
                </div>

                <div className="pt-2.5 border-t border-border-subtle/80 flex items-center justify-end text-[10px] font-mono text-accent-gold">
                  <span className="flex items-center gap-1 group-hover:gap-1.5 transition-all">
                    READ <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Story Detailed Modal */}
      <AnimatePresence>
        {selectedPlace && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setSelectedPlace(null);
              setCursorState({ type: 'default' });
            }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-bg-primary/95 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 40 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-bg-surface border border-border-subtle shadow-2xl"
            >
              {/* Close button */}
              <button
                onClick={() => {
                  setSelectedPlace(null);
                  setCursorState({ type: 'default' });
                }}
                onMouseEnter={() => setCursorState({ type: 'hover', label: 'CLOSE' })}
                onMouseLeave={() => setCursorState({ type: 'default' })}
                className="absolute top-6 right-6 z-10 p-2.5 rounded-full bg-bg-primary/90 backdrop-blur-md border border-border-subtle text-text-secondary hover:text-accent-gold hover:border-accent-amber transition-all duration-200"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Hero image */}
              <div className="relative aspect-[16/9] overflow-hidden bg-bg-primary">
                <img
                  src={selectedPlace.photo}
                  alt={selectedPlace.location}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-surface via-transparent to-transparent" />
                
                {/* Date badge */}
                <div className="absolute bottom-6 left-6 px-4 py-2 rounded-xl bg-bg-primary/90 backdrop-blur-md border border-accent-amber/20">
                  <div className="flex items-center gap-2 text-xs font-mono text-accent-gold">
                    <Calendar className="h-3.5 w-3.5" /> 
                    <span>{selectedPlace.date}</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 sm:p-8 space-y-6">
                {/* Location header */}
                <div className="space-y-2">
                  <span className="inline-block px-3 py-1 rounded-full bg-accent-amber/10 border border-accent-amber/20 text-xs font-mono text-accent-gold uppercase tracking-wider">
                    {selectedPlace.region}
                  </span>
                  <h3 className="text-3xl sm:text-4xl font-display font-extrabold text-text-primary tracking-tight">
                    {selectedPlace.location}
                  </h3>
                </div>

                {/* Story */}
                <div className="space-y-4">
                  <h4 className="text-sm font-mono text-accent-gold uppercase tracking-wider">
                    TRAVEL STORY
                  </h4>
                  <p className="text-base text-text-secondary leading-relaxed font-light border-l-2 border-accent-amber/40 pl-5">
                    {selectedPlace.story}
                  </p>
                </div>

                {/* Favourite moment */}
                <div className="p-5 rounded-2xl bg-bg-card border border-border-subtle">
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 rounded-xl bg-accent-amber/10 border border-accent-amber/20">
                      <Heart className="h-5 w-5 text-accent-amber" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <span className="text-xs font-mono text-accent-gold uppercase tracking-wider block">
                        FAVOURITE MOMENT
                      </span>
                      <p className="text-sm sm:text-base text-text-primary italic font-serif leading-relaxed">
                        "{selectedPlace.favouriteMoment}"
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </section>
  );
};
