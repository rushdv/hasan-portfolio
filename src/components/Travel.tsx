import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, ArrowRight, ArrowLeft } from 'lucide-react';
import { travelPlaces } from '../data/portfolioData';
import { TravelPlace } from '../types';
import { TravelMap } from './TravelMap';
import { CursorState } from './CustomCursor';

interface TravelProps {
  setCursorState: (state: CursorState) => void;
}

export const Travel: React.FC<TravelProps> = ({ setCursorState }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="travel" className="py-24 md:py-36 px-6 md:px-12 bg-bg-surface/30 relative border-t border-border-subtle">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="space-y-4 max-w-3xl">
          <span className="text-xs font-mono tracking-widest text-accent-gold uppercase">
            04 // TRAVEL JOURNAL
          </span>
          <h2 className="text-4xl sm:text-6xl font-display font-extrabold text-text-primary tracking-tight">
            BEYOND CODE.
          </h2>
          <p className="text-2xl sm:text-3xl font-display font-bold text-accent-amber leading-snug">
            “When the screen goes dark, I go outside.”
          </p>
          <p className="text-base text-text-secondary font-light leading-relaxed">
            Outside programming and academic algorithms, I travel across Bangladesh—discovering secluded coasts, hill tracts, and monsoon rivers to gain fresh perspective.
          </p>
        </div>

        {/* Interactive Bangladesh Map */}
        <TravelMap
          setCursorState={setCursorState}
          onSelectPlace={(place) => {
            // Can sync horizontal card scroll if desired
          }}
        />

        {/* Horizontal Scroll Gallery Controls */}
        <div className="flex items-center justify-between pt-8">
          <h3 className="text-xl font-display font-bold text-text-primary">
            EXPEDITION CARDS
          </h3>
          <div className="flex items-center gap-3">
            <button
              onClick={() => scroll('left')}
              className="p-3 rounded-full bg-bg-card border border-border-subtle text-text-secondary hover:text-accent-gold hover:border-accent-amber transition-colors"
              aria-label="Scroll Left"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-3 rounded-full bg-bg-card border border-border-subtle text-text-secondary hover:text-accent-gold hover:border-accent-amber transition-colors"
              aria-label="Scroll Right"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Horizontal Scroll Cards Gallery */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto no-scrollbar pb-6 scroll-smooth snap-x snap-mandatory"
        >
          {travelPlaces.map((place) => (
            <motion.div
              key={place.id}
              whileHover={{ y: -6 }}
              onMouseEnter={() => setCursorState({ type: 'explore', label: place.location })}
              onMouseLeave={() => setCursorState({ type: 'default' })}
              className="min-w-[320px] sm:min-w-[380px] snap-start rounded-2xl bg-bg-card border border-border-subtle p-5 flex flex-col justify-between space-y-6 hover:border-accent-amber/40 transition-all duration-300 shadow-xl"
            >
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-bg-primary">
                <img
                  src={place.photo}
                  alt={place.location}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-bg-primary/80 backdrop-blur-md border border-white/10 text-[11px] font-mono text-accent-gold flex items-center gap-1">
                  <MapPin className="h-3 w-3" /> {place.location}
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-[11px] font-mono text-text-muted">{place.date}</span>
                <p className="text-sm text-text-secondary line-clamp-3 font-light leading-relaxed">
                  {place.story}
                </p>
              </div>

              <div className="pt-3 border-t border-border-subtle/80 flex items-center justify-between text-xs font-mono text-accent-gold">
                <span>{place.region}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
