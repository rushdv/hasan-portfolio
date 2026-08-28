import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Compass, Calendar, Heart, Navigation, Plus, Globe, ArrowRight, Eye } from 'lucide-react';
import { TravelPlace } from '../types';
import { CursorState } from './CustomCursor';

interface TravelMapProps {
  places: TravelPlace[];
  setCursorState?: (state: CursorState) => void;
  onSelectPlace?: (place: TravelPlace) => void;
  onOpenAdminModal?: () => void;
}

export const TravelMap: React.FC<TravelMapProps> = ({
  places,
  setCursorState,
  onSelectPlace,
  onOpenAdminModal,
}) => {
  const [mapMode, setMapMode] = useState<'world' | 'bangladesh'>('world');
  const [activePin, setActivePin] = useState<TravelPlace>(places[0] || {} as TravelPlace);

  React.useEffect(() => {
    if (places.length > 0 && !places.find(p => p.id === activePin.id)) {
      setActivePin(places[0]);
    }
  }, [places]);

  const handlePinClick = (place: TravelPlace) => {
    setActivePin(place);
    if (onSelectPlace) {
      onSelectPlace(place);
    }
  };

  return (
    <div className="rounded-3xl bg-bg-surface/90 border border-border-subtle p-6 sm:p-10 shadow-2xl relative overflow-hidden backdrop-blur-md">
      
      {/* Ambient background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent-amber/10 via-transparent to-transparent pointer-events-none" />

      {/* Map Mode Selector Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 relative z-20 pb-4 border-b border-border-subtle/80">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-accent-amber/10 text-accent-gold border border-accent-amber/20">
            <Globe className="h-5 w-5 animate-spin-slow text-accent-amber" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-accent-gold uppercase tracking-widest block flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
              AUTHENTIC MAP ENGINE // REAL MAP IMAGES
            </span>
            <h3 className="text-xl font-display font-extrabold text-text-primary">
              {mapMode === 'world' ? 'Global World Map (Perspective)' : 'Bangladesh Map (Visited Locations)'}
            </h3>
          </div>
        </div>

        {/* View Switcher Controls */}
        <div className="flex items-center gap-2 bg-bg-card p-1.5 rounded-2xl border border-border-subtle">
          <button
            onClick={() => setMapMode('world')}
            className={`px-4 py-2 rounded-xl text-xs font-mono tracking-wider transition-all duration-300 flex items-center gap-1.5 ${
              mapMode === 'world'
                ? 'bg-accent-amber text-bg-primary font-bold shadow-lg shadow-accent-amber/20'
                : 'text-text-secondary hover:text-accent-gold'
            }`}
          >
            <Globe className="h-3.5 w-3.5" /> 1. WORLD MAP
          </button>

          <button
            onClick={() => setMapMode('bangladesh')}
            className={`px-4 py-2 rounded-xl text-xs font-mono tracking-wider transition-all duration-300 flex items-center gap-1.5 ${
              mapMode === 'bangladesh'
                ? 'bg-accent-amber text-bg-primary font-bold shadow-lg shadow-accent-amber/20'
                : 'text-text-secondary hover:text-accent-gold'
            }`}
          >
            <MapPin className="h-3.5 w-3.5" /> 2. BANGLADESH MAP
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        
        {/* ── LEFT: REAL MAP IMAGE ANIMATION DISPLAY ── */}
        <div className="lg:col-span-6 relative flex flex-col items-center justify-center py-2">
          
          <div className="relative w-full max-w-md aspect-[4/5] bg-[#07070a] rounded-2xl border border-border-subtle p-0 flex items-center justify-center shadow-2xl overflow-hidden group">
            
            {/* Map Frame Coordinates Header Overlay */}
            <div className="absolute top-3 left-3 text-[9px] font-mono text-emerald-400 z-20 flex items-center gap-1 bg-black/80 px-2.5 py-1 rounded-md border border-emerald-500/20">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {mapMode === 'world' ? 'REAL GLOBAL MAP IMAGE' : 'REAL BANGLADESH MAP IMAGE'}
            </div>
            <div className="absolute top-3 right-3 text-[9px] font-mono text-accent-gold z-20 bg-black/80 px-2.5 py-1 rounded-md border border-accent-amber/20">
              23.6850° N, 90.3563° E
            </div>

            <AnimatePresence mode="wait">
              {mapMode === 'world' ? (
                /* STEP 1: REAL GLOBAL WORLD MAP IMAGE */
                <motion.div
                  key="world-map-image"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.2 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-full relative flex items-center justify-center cursor-pointer"
                  onClick={() => setMapMode('bangladesh')}
                >
                  {/* Real World Map Image */}
                  <img
                    src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1200&q=80"
                    alt="Real Global World Map Image"
                    className="w-full h-full object-cover filter contrast-[1.1] saturate-[0.85] brightness-[0.8]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-transparent to-bg-primary/50 pointer-events-none" />

                  {/* Pulsing Target Beacon on Bangladesh */}
                  <div
                    style={{ top: '48%', left: '68%' }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-30"
                  >
                    <span className="absolute -inset-6 rounded-full bg-accent-amber/50 animate-ping" />
                    <span className="absolute -inset-3 rounded-full bg-amber-400/70 animate-pulse" />
                    <div className="relative h-7 w-7 rounded-full bg-accent-amber border-2 border-white flex items-center justify-center shadow-2xl">
                      <MapPin className="h-3.5 w-3.5 text-bg-primary" />
                    </div>
                  </div>

                  {/* Bottom Action Banner */}
                  <div className="absolute bottom-4 left-4 right-4 bg-black/85 backdrop-blur-md p-3.5 rounded-xl border border-white/15 flex items-center justify-between z-20">
                    <div>
                      <span className="text-[9px] font-mono text-accent-gold uppercase tracking-widest block">STEP 1 OF 2</span>
                      <p className="text-xs font-display font-bold text-text-primary">Global World Map View</p>
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); setMapMode('bangladesh'); }}
                      className="px-3.5 py-2 rounded-lg bg-accent-amber text-bg-primary font-mono text-[10px] font-extrabold tracking-wider hover:bg-amber-300 transition-colors flex items-center gap-1.5 shadow-lg shadow-accent-amber/20"
                    >
                      ZOOM TO BANGLADESH MAP <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </motion.div>
              ) : (
                /* STEP 2: REAL BANGLADESH MAP IMAGE WITH VISITED LOCATION PINS */
                <motion.div
                  key="bangladesh-map-image"
                  initial={{ opacity: 0, scale: 1.3 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-full relative"
                >
                  {/* Real Geographic Bangladesh Map Image */}
                  <img
                    src="https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?auto=format&fit=crop&w=1200&q=80"
                    alt="Real Geographic Map Image of Bangladesh"
                    className="w-full h-full object-cover filter contrast-[1.1] brightness-[0.8]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/90 via-transparent to-bg-primary/40 pointer-events-none" />

                  {/* OVERLAY INTERACTIVE VISITED LOCATION PINS */}
                  {places.map((place) => {
                    const isActive = activePin?.id === place.id;
                    return (
                      <button
                        key={place.id}
                        onClick={() => handlePinClick(place)}
                        style={{ top: `${place.coordinates.y}%`, left: `${place.coordinates.x}%` }}
                        className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-30"
                      >
                        <span className={`absolute -inset-3.5 rounded-full bg-accent-amber/50 transition-opacity ${
                          isActive ? 'animate-ping opacity-90' : 'opacity-0 group-hover:opacity-60'
                        }`} />
                        <div className={`relative flex items-center justify-center h-8 w-8 rounded-full transition-all duration-300 ${
                          isActive
                            ? 'bg-accent-amber text-bg-primary scale-125 shadow-xl shadow-accent-amber/60 border-2 border-white'
                            : 'bg-black/90 border border-accent-amber/80 text-accent-gold hover:scale-110'
                        }`}>
                          <MapPin className="h-4 w-4" />
                        </div>
                        <div className={`absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-2.5 py-1 rounded-lg bg-black/95 backdrop-blur-md border border-border-subtle text-[10px] font-mono whitespace-nowrap shadow-2xl transition-all duration-200 pointer-events-none ${
                          isActive ? 'opacity-100 text-accent-gold border-accent-amber/60 scale-100' : 'opacity-0 group-hover:opacity-100 text-text-primary scale-95'
                        }`}>
                          <span className="flex items-center gap-1">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                            {place.location}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="mt-3 text-[11px] font-mono text-text-muted flex items-center justify-between w-full max-w-md px-1">
            <span className="flex items-center gap-1.5">
              <Navigation className="h-3 w-3 text-accent-amber" />
              {mapMode === 'world' ? 'Click Zoom to view Bangladesh Map Image' : 'Click location markers on the Bangladesh Map Image'}
            </span>
            {onOpenAdminModal && (
              <button
                onClick={onOpenAdminModal}
                className="text-accent-gold hover:underline flex items-center gap-1"
              >
                <Plus className="h-3 w-3" /> Add Destination
              </button>
            )}
          </div>
        </div>

        {/* ── RIGHT: SELECTED DESTINATION JOURNAL CARD ── */}
        <div className="lg:col-span-6 space-y-6">
          {activePin && activePin.location ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={activePin.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="space-y-6 bg-bg-card p-6 sm:p-7 rounded-2xl border border-border-subtle/90 shadow-xl"
              >
                {/* Photo Display */}
                <div className="aspect-[16/10] rounded-xl overflow-hidden bg-bg-primary relative group">
                  <img
                    src={activePin.photo}
                    alt={activePin.location}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter contrast-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/80 via-transparent to-transparent" />
                  
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <span className="px-3 py-1 rounded-lg bg-bg-primary/80 backdrop-blur-md border border-white/10 text-xs font-mono text-accent-gold flex items-center gap-1.5">
                      <Calendar className="h-3 w-3" /> {activePin.date}
                    </span>
                    <span className="px-3 py-1 rounded-lg bg-bg-primary/80 backdrop-blur-md border border-white/10 text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" /> VISITED
                    </span>
                  </div>
                </div>

                {/* Location Title & Region */}
                <div>
                  <span className="text-xs font-mono text-accent-gold uppercase tracking-wider block mb-1">
                    {activePin.region}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-text-primary">
                    {activePin.location}
                  </h3>
                </div>

                {/* Story */}
                <p className="text-sm sm:text-base text-text-secondary leading-relaxed font-light border-l-2 border-accent-amber/40 pl-4">
                  {activePin.story}
                </p>

                {/* Favourite Moment */}
                <div className="p-4 rounded-xl bg-bg-surface border border-border-subtle/80 flex items-start gap-3.5">
                  <Heart className="h-4 w-4 text-accent-amber shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] font-mono text-accent-gold uppercase tracking-widest block">
                      FAVOURITE MOMENT
                    </span>
                    <p className="text-xs sm:text-sm text-text-primary italic mt-0.5 font-serif">
                      "{activePin.favouriteMoment}"
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          ) : (
            <div className="py-20 text-center text-text-muted font-mono text-xs">
              Select a pin on the map to display travel log details.
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
