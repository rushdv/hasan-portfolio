import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Compass, Calendar, Heart } from 'lucide-react';
import { travelPlaces } from '../data/portfolioData';
import { TravelPlace } from '../types';
import { CursorState } from './CustomCursor';

interface TravelMapProps {
  setCursorState: (state: CursorState) => void;
  onSelectPlace: (place: TravelPlace) => void;
}

export const TravelMap: React.FC<TravelMapProps> = ({ setCursorState, onSelectPlace }) => {
  const [activePin, setActivePin] = useState<TravelPlace>(travelPlaces[0]);

  return (
    <div className="rounded-3xl bg-bg-surface border border-border-subtle p-6 sm:p-10 shadow-2xl relative overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column: Stylized Bangladesh SVG Map */}
        <div className="lg:col-span-6 relative flex justify-center py-6">
          <div className="relative w-full max-w-sm aspect-[4/5] bg-bg-card/60 rounded-2xl border border-border-subtle/70 p-4 flex items-center justify-center">
            
            {/* SVG Outline Representation of Bangladesh */}
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full text-border-subtle fill-bg-primary/80 stroke-border-subtle stroke-[0.8]"
            >
              {/* Simplified stylized outline path of Bangladesh */}
              <path d="M 45 10 C 65 12, 85 20, 80 35 C 90 45, 92 65, 85 85 C 75 95, 60 90, 45 92 C 30 90, 20 80, 25 65 C 15 50, 25 30, 35 20 Z" />
              
              {/* Rivers / Grid subtle lines */}
              <path d="M 75 30 Q 55 50 48 90" stroke="rgba(212, 175, 55, 0.15)" strokeWidth="0.5" fill="none" strokeDasharray="1 1" />
              <path d="M 35 20 Q 50 45 82 80" stroke="rgba(212, 175, 55, 0.15)" strokeWidth="0.5" fill="none" strokeDasharray="1 1" />
            </svg>

            {/* Interactive Map Pins */}
            {travelPlaces.map((place) => {
              const isActive = activePin.id === place.id;
              return (
                <button
                  key={place.id}
                  onClick={() => {
                    setActivePin(place);
                    onSelectPlace(place);
                  }}
                  onMouseEnter={() => setCursorState({ type: 'explore', label: place.location })}
                  onMouseLeave={() => setCursorState({ type: 'default' })}
                  style={{ top: `${place.coordinates.y}%`, left: `${place.coordinates.x}%` }}
                  aria-label={`View ${place.location}`}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                >
                  {/* Pulse Ring */}
                  <span className={`absolute -inset-2 rounded-full bg-accent-amber/30 transition-opacity ${isActive ? 'animate-ping opacity-75' : 'opacity-0 group-hover:opacity-50'}`} />
                  
                  {/* Pin Dot */}
                  <div className={`relative flex items-center justify-center h-7 w-7 rounded-full transition-all duration-300 ${
                    isActive
                      ? 'bg-accent-amber text-bg-primary scale-125 shadow-lg shadow-accent-amber/40'
                      : 'bg-bg-surface border border-accent-amber/50 text-accent-gold hover:scale-110'
                  }`}>
                    <MapPin className="h-3.5 w-3.5" />
                  </div>

                  {/* Pin Hover Label Tooltip */}
                  <span className={`absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-2.5 py-1 rounded-md bg-bg-primary border border-border-subtle text-[10px] font-mono whitespace-nowrap transition-all ${
                    isActive ? 'opacity-100 text-accent-gold border-accent-amber/40' : 'opacity-0 group-hover:opacity-100 text-text-primary'
                  }`}>
                    {place.location}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Dynamic Place Details Card */}
        <div className="lg:col-span-6 space-y-6">
          <div className="flex items-center gap-2 text-xs font-mono text-accent-gold">
            <Compass className="h-4 w-4 animate-spin-slow" />
            <span>INTERACTIVE EXPLORER MAP // BANGLADESH</span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activePin.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6 bg-bg-card p-6 rounded-2xl border border-border-subtle"
            >
              <div className="aspect-[16/9] rounded-xl overflow-hidden bg-bg-primary relative">
                <img
                  src={activePin.photo}
                  alt={activePin.location}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 left-3 px-3 py-1 rounded-lg bg-bg-primary/80 backdrop-blur-md border border-white/10 text-xs font-mono text-accent-gold flex items-center gap-1.5">
                  <Calendar className="h-3 w-3" /> {activePin.date}
                </div>
              </div>

              <div>
                <span className="text-xs font-mono text-text-muted uppercase">{activePin.region}</span>
                <h3 className="text-2xl font-display font-extrabold text-text-primary mt-1">
                  {activePin.location}
                </h3>
              </div>

              <p className="text-sm text-text-secondary leading-relaxed font-light">
                {activePin.story}
              </p>

              <div className="p-3.5 rounded-xl bg-bg-surface border border-border-subtle/80 flex items-start gap-3">
                <Heart className="h-4 w-4 text-accent-amber shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] font-mono text-accent-gold uppercase block">FAVOURITE MOMENT</span>
                  <p className="text-xs text-text-primary italic mt-0.5">
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
