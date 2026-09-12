import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Calendar, Heart, Plus } from 'lucide-react';
import { TravelPlace } from '../types';
import { CursorState } from './CustomCursor';

interface TravelMapProps {
  places: TravelPlace[];
  setCursorState?: (state: CursorState) => void;
  onSelectPlace?: (place: TravelPlace) => void;
  onOpenAdminModal?: () => void;
}

/**
 * SVG Bangladesh outline — simplified vector path.
 * Coordinates are normalized to a 300×360 viewBox.
 * Pins use the same percentage-based coordinate system as TravelPlace.coordinates.
 */
const BangladeshSVGPath = () => (
  <svg
    viewBox="0 0 300 360"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full"
    aria-hidden="true"
  >
    {/* Country fill */}
    <path
      d="
        M 148 12
        L 162 18 L 178 14 L 196 22 L 210 18 L 224 28 L 238 26 L 248 36
        L 256 50 L 260 66 L 252 78 L 258 92 L 264 104 L 268 118
        L 262 130 L 256 142 L 248 154 L 244 168 L 240 180
        L 246 192 L 248 206 L 244 220 L 238 232 L 228 242
        L 216 252 L 204 258 L 196 270 L 192 284 L 196 298
        L 200 310 L 196 322 L 186 330 L 174 336 L 160 340
        L 148 344 L 136 338 L 122 328 L 112 316 L 108 302
        L 104 288 L 100 274 L 96 260 L 88 250 L 76 244
        L 64 238 L 52 228 L 44 216 L 40 202 L 36 188
        L 40 174 L 46 162 L 52 150 L 56 136 L 52 122
        L 48 108 L 44 94 L 46 80 L 52 68 L 60 56
        L 72 48 L 86 42 L 100 36 L 114 28 L 128 18
        Z
      "
      fill="rgba(199,166,106,0.06)"
      stroke="rgba(199,166,106,0.45)"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    {/* Subtle internal river / terrain hint lines */}
    <path
      d="M 148 80 Q 156 120 148 160 Q 140 200 152 240 Q 160 270 148 300"
      stroke="rgba(199,166,106,0.12)"
      strokeWidth="1"
      fill="none"
      strokeDasharray="4 6"
    />
    <path
      d="M 100 160 Q 130 170 160 165 Q 190 160 220 168"
      stroke="rgba(199,166,106,0.10)"
      strokeWidth="0.8"
      fill="none"
    />
  </svg>
);

export const TravelMap: React.FC<TravelMapProps> = ({
  places,
  setCursorState,
  onSelectPlace,
  onOpenAdminModal,
}) => {
  const [activePin, setActivePin] = useState<TravelPlace>(places[0] || {} as TravelPlace);

  useEffect(() => {
    if (places.length > 0 && !places.find(p => p.id === activePin.id)) {
      setActivePin(places[0]);
    }
  }, [places, activePin.id]);

  const handlePinClick = (place: TravelPlace) => {
    setActivePin(place);
    if (onSelectPlace) {
      onSelectPlace(place);
    }
  };

  return (
    <div className="relative overflow-hidden">
      {/* Section label */}
      <div className="flex items-center gap-3 mb-8">
        <span className="h-px w-8 bg-accent/60" />
        <span className="text-[10px] font-mono tracking-widest text-accent uppercase">
          Journey Archive
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

        {/* ── LEFT: SVG Bangladesh map with pins ── */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div
            className="relative w-full max-w-sm"
            style={{ aspectRatio: '300 / 360' }}
          >
            {/* SVG outline */}
            <BangladeshSVGPath />

            {/* Grid background — very subtle cartographic feel */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage:
                  'linear-gradient(to right, rgba(199,166,106,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(199,166,106,0.04) 1px, transparent 1px)',
                backgroundSize: '30px 30px',
              }}
            />

            {/* Location pins */}
            {places.map((place) => {
              const isActive = activePin?.id === place.id;
              return (
                <button
                  key={place.id}
                  onClick={() => handlePinClick(place)}
                  onMouseEnter={() => setCursorState?.({ type: 'hover', label: place.location })}
                  onMouseLeave={() => setCursorState?.({ type: 'default' })}
                  style={{
                    top: `${place.coordinates.y}%`,
                    left: `${place.coordinates.x}%`,
                  }}
                  aria-label={`Select ${place.location}`}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group z-20"
                >
                  {/* Ping ring — active only */}
                  {isActive && (
                    <span className="absolute -inset-3 rounded-full border border-accent/40 animate-ping pointer-events-none" />
                  )}

                  {/* Pin dot */}
                  <motion.div
                    whileHover={{ scale: 1.25 }}
                    transition={{ duration: 0.2 }}
                    className={`relative flex items-center justify-center h-6 w-6 rounded-full transition-all duration-300 ${
                      isActive
                        ? 'bg-accent shadow-lg ring-2 ring-accent/30'
                        : 'bg-bg-card border border-accent/60 hover:border-accent'
                    }`}
                  >
                    <span
                      className={`block rounded-full transition-all ${
                        isActive ? 'h-2.5 w-2.5 bg-bg-primary' : 'h-2 w-2 bg-accent/70'
                      }`}
                    />
                  </motion.div>

                  {/* Tooltip */}
                  <div
                    className={`absolute left-1/2 -translate-x-1/2 bottom-full mb-2.5 px-2.5 py-1 bg-bg-surface border border-border-subtle text-[10px] font-mono whitespace-nowrap pointer-events-none transition-all duration-200 ${
                      isActive
                        ? 'opacity-100 text-accent border-accent/30'
                        : 'opacity-0 group-hover:opacity-100 text-text-secondary'
                    }`}
                  >
                    {place.location}
                  </div>
                </button>
              );
            })}

            {/* Coordinate watermark — bottom right */}
            <div className="absolute bottom-2 right-2 text-[9px] font-mono text-stone/50 pointer-events-none select-none">
              23.6850° N · 90.3563° E
            </div>
          </div>

          {/* Map footer */}
          <div className="mt-4 flex items-center justify-between w-full max-w-sm text-[11px] font-mono text-stone">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-accent inline-block" />
              {places.length} destination{places.length !== 1 ? 's' : ''} visited
            </span>
            {onOpenAdminModal && (
              <button
                onClick={onOpenAdminModal}
                onMouseEnter={() => setCursorState?.({ type: 'hover', label: 'ADD' })}
                onMouseLeave={() => setCursorState?.({ type: 'default' })}
                className="flex items-center gap-1 text-accent/70 hover:text-accent transition-colors"
              >
                <Plus className="h-3 w-3" /> Add destination
              </button>
            )}
          </div>
        </div>

        {/* ── RIGHT: Active destination journal entry ── */}
        <div className="lg:col-span-7">
          {activePin && activePin.location ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={activePin.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-6"
              >
                {/* Photo */}
                <div
                  className="relative overflow-hidden bg-bg-card"
                  style={{ aspectRatio: '16 / 9' }}
                  onMouseEnter={() => setCursorState?.({ type: 'explore', label: 'VIEW' })}
                  onMouseLeave={() => setCursorState?.({ type: 'default' })}
                >
                  <img
                    src={activePin.photo}
                    alt={activePin.location}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter contrast-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/70 via-transparent to-transparent pointer-events-none" />

                  {/* Date badge */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-[11px] font-mono text-warmGray/80">
                    <Calendar className="h-3 w-3 text-accent/70" />
                    {activePin.date}
                  </div>
                </div>

                {/* Location title */}
                <div className="space-y-1">
                  <span className="text-[10px] font-mono tracking-widest text-stone uppercase block">
                    {activePin.region}
                  </span>
                  <h3
                    className="font-display font-light text-warmPaper"
                    style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)' }}
                  >
                    {activePin.location}
                  </h3>
                </div>

                {/* Story */}
                <p className="text-sm text-warmGray/80 leading-relaxed font-light border-l border-accent/30 pl-4">
                  {activePin.story}
                </p>

                {/* Favourite moment */}
                <div className="flex items-start gap-3 pt-2 border-t border-border-subtle">
                  <Heart className="h-3.5 w-3.5 text-accent/70 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[9px] font-mono text-accent uppercase tracking-widest block mb-1">
                      Favourite moment
                    </span>
                    <p className="text-xs text-warmGray italic font-serif leading-relaxed">
                      "{activePin.favouriteMoment}"
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          ) : (
            <div className="py-16 text-center text-stone font-mono text-xs">
              Select a location on the map.
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
