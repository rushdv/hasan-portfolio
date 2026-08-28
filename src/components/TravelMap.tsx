import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Compass, Calendar, Heart, Navigation, ExternalLink } from 'lucide-react';
import { travelPlaces } from '../data/portfolioData';
import { TravelPlace } from '../types';
import { CursorState } from './CustomCursor';

interface TravelMapProps {
  setCursorState: (state: CursorState) => void;
  onSelectPlace?: (place: TravelPlace) => void;
}

export const TravelMap: React.FC<TravelMapProps> = ({ setCursorState, onSelectPlace }) => {
  const [activePin, setActivePin] = useState<TravelPlace>(travelPlaces[0]);

  const handlePinClick = (place: TravelPlace) => {
    setActivePin(place);
    if (onSelectPlace) {
      onSelectPlace(place);
    }
  };

  return (
    <div className="rounded-3xl bg-bg-surface/80 border border-border-subtle p-6 sm:p-10 shadow-2xl relative overflow-hidden backdrop-blur-md">
      
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent-amber/5 via-transparent to-transparent pointer-events-none" />
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        
        {/* ── LEFT: AUTHENTIC & DETAILED BANGLADESH VECTOR MAP ── */}
        <div className="lg:col-span-6 relative flex flex-col items-center justify-center py-4">
          
          {/* Header Tag */}
          <div className="w-full flex items-center justify-between mb-4 px-2">
            <div className="flex items-center gap-2 text-xs font-mono text-accent-gold">
              <Compass className="h-4 w-4 animate-spin-slow text-accent-amber" />
              <span className="uppercase tracking-widest">BANGLADESH // EXPLORER MAP</span>
            </div>
            <span className="text-[10px] font-mono text-text-muted">
              {travelPlaces.length} PINNED DESTINATIONS
            </span>
          </div>

          <div className="relative w-full max-w-md aspect-[4/5] bg-bg-card/80 rounded-2xl border border-border-subtle/80 p-5 flex items-center justify-center shadow-inner overflow-hidden">
            
            {/* Ambient map glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-accent-amber/5 via-transparent to-accent-gold/5 pointer-events-none" />
            <div className="absolute top-4 right-4 text-[9px] font-mono text-accent-gold/40 tracking-widest uppercase">
              23.6850° N, 90.3563° E
            </div>

            {/* High-Detail Bangladesh SVG Map Path */}
            <svg
              viewBox="0 0 400 500"
              className="w-full h-full drop-shadow-[0_0_15px_rgba(212,175,55,0.08)]"
            >
              {/* Outer Border Glow / Shadow Path */}
              <path
                d="M 170 30 C 210 20, 260 40, 270 70 C 290 85, 330 110, 340 140 C 350 170, 310 190, 330 220 C 350 250, 370 310, 360 360 C 340 400, 350 450, 320 470 C 290 480, 280 430, 260 420 C 230 430, 200 450, 160 440 C 130 430, 110 400, 100 370 C 80 340, 60 320, 70 290 C 50 260, 60 220, 80 190 C 70 150, 90 110, 110 90 C 130 70, 150 40, 170 30 Z"
                className="fill-bg-primary stroke-border-subtle stroke-[1.5]"
              />

              {/* Internal Division Boundaries & Contour Lines */}
              {/* Sylhet / NE Division */}
              <path d="M 270 70 Q 300 130 330 220" stroke="rgba(212, 175, 55, 0.15)" strokeWidth="1" fill="none" strokeDasharray="3 3" />
              {/* Chittagong / SE Division */}
              <path d="M 260 280 Q 320 350 320 470" stroke="rgba(212, 175, 55, 0.18)" strokeWidth="1" fill="none" strokeDasharray="3 3" />
              {/* Northern / Rangpur Rajshahi */}
              <path d="M 170 30 Q 110 140 80 190" stroke="rgba(212, 175, 55, 0.12)" strokeWidth="1" fill="none" strokeDasharray="3 3" />
              
              {/* Major Rivers (Padma, Meghna, Jamuna) */}
              <path d="M 100 160 Q 180 220 220 280 Q 250 360 260 420" stroke="rgba(56, 189, 248, 0.25)" strokeWidth="1.5" fill="none" />
              <path d="M 310 140 Q 260 200 220 280" stroke="rgba(56, 189, 248, 0.2)" strokeWidth="1.2" fill="none" />
              <path d="M 160 35 Q 180 120 180 220" stroke="rgba(56, 189, 248, 0.2)" strokeWidth="1.2" fill="none" />

              {/* Bay of Bengal Wave Accent Lines at Bottom */}
              <path d="M 120 460 Q 180 475 250 465" stroke="rgba(212, 175, 55, 0.2)" strokeWidth="1" fill="none" strokeDasharray="2 2" />
              <path d="M 100 480 Q 200 495 300 480" stroke="rgba(212, 175, 55, 0.15)" strokeWidth="0.8" fill="none" />
              
              <text x="210" y="485" className="text-[10px] font-mono fill-accent-gold/40 tracking-[0.3em]">BAY OF BENGAL</text>
            </svg>

            {/* Interactive Location Pins */}
            {travelPlaces.map((place) => {
              const isActive = activePin.id === place.id;
              return (
                <button
                  key={place.id}
                  onClick={() => handlePinClick(place)}
                  onMouseEnter={() => setCursorState({ type: 'explore', label: place.location })}
                  onMouseLeave={() => setCursorState({ type: 'default' })}
                  style={{ top: `${place.coordinates.y}%`, left: `${place.coordinates.x}%` }}
                  aria-label={`View ${place.location}`}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-20"
                >
                  {/* Outer Pulsing Ring */}
                  <span className={`absolute -inset-2.5 rounded-full bg-accent-amber/40 transition-opacity ${
                    isActive ? 'animate-ping opacity-90' : 'opacity-0 group-hover:opacity-60'
                  }`} />
                  
                  {/* Pin Circle Marker */}
                  <div className={`relative flex items-center justify-center h-8 w-8 rounded-full transition-all duration-300 ${
                    isActive
                      ? 'bg-accent-amber text-bg-primary scale-125 shadow-xl shadow-accent-amber/50 border-2 border-white'
                      : 'bg-bg-surface/90 border border-accent-amber/60 text-accent-gold hover:scale-110 hover:border-accent-amber'
                  }`}>
                    <MapPin className="h-4 w-4" />
                  </div>

                  {/* Floating Pin Tooltip Label */}
                  <div className={`absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-2.5 py-1 rounded-lg bg-bg-primary/95 backdrop-blur-md border border-border-subtle text-[10px] font-mono whitespace-nowrap shadow-xl transition-all duration-200 pointer-events-none ${
                    isActive
                      ? 'opacity-100 text-accent-gold border-accent-amber/50 scale-100'
                      : 'opacity-0 group-hover:opacity-100 text-text-primary scale-95'
                  }`}>
                    <span className="flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent-amber" />
                      {place.location}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Quick instructions hint */}
          <div className="mt-3 text-[11px] font-mono text-text-muted flex items-center gap-1.5">
            <Navigation className="h-3 w-3 text-accent-amber" />
            <span>Click markers on the map to explore journal details</span>
          </div>
        </div>

        {/* ── RIGHT: DYNAMIC TRAVEL JOURNAL CARD DETAILS ── */}
        <div className="lg:col-span-6 space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePin.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="space-y-6 bg-bg-card p-6 sm:p-7 rounded-2xl border border-border-subtle/90 shadow-xl"
            >
              {/* Photo Display with overlay location tag */}
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
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> VISITED
                  </span>
                </div>
              </div>

              {/* Title & Region */}
              <div>
                <span className="text-xs font-mono text-accent-gold uppercase tracking-wider block mb-1">
                  {activePin.region}
                </span>
                <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-text-primary">
                  {activePin.location}
                </h3>
              </div>

              {/* Narrative Story */}
              <p className="text-sm sm:text-base text-text-secondary leading-relaxed font-light border-l-2 border-accent-amber/40 pl-4">
                {activePin.story}
              </p>

              {/* Favourite Moment Highlight Box */}
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
        </div>

      </div>
    </div>
  );
};
