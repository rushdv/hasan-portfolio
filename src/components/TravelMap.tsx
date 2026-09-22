import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Map as MapLibreMap,
  Marker,
  NavigationControl,
  AttributionControl,
  type StyleSpecification,
} from 'maplibre-gl';
import { Compass, RotateCcw, Plus, AlertCircle, Satellite } from 'lucide-react';
import type { TravelPlace } from '../types';
import type { CursorState } from './CustomCursor';

interface TravelMapProps {
  places: TravelPlace[];
  selectedPlace: TravelPlace | null;
  onSelectPlace: (place: TravelPlace | null) => void;
  setCursorState?: (state: CursorState) => void;
  onOpenAdminModal?: () => void;
  isAdminAuthenticated?: boolean;
}

// Bangladesh geographic center and default overview bounds
const BANGLADESH_CENTER: [number, number] = [90.3563, 23.6850]; // [lng, lat]

// High-resolution Satellite Hybrid Style (Esri World Imagery + Roads + Boundaries & Places)
// 100% universal browser compatibility, rock-solid reliability, zero key required
const SATELLITE_HYBRID_STYLE: StyleSpecification = {
  version: 8,
  sources: {
    'satellite-imagery': {
      type: 'raster',
      tiles: [
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      ],
      tileSize: 256,
      attribution: '© Esri, Maxar, Earthstar Geographics',
    },
    'satellite-roads': {
      type: 'raster',
      tiles: [
        'https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer/tile/{z}/{y}/{x}',
      ],
      tileSize: 256,
    },
    'satellite-boundaries': {
      type: 'raster',
      tiles: [
        'https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}',
      ],
      tileSize: 256,
    },
  },
  layers: [
    {
      id: 'satellite-imagery-layer',
      type: 'raster',
      source: 'satellite-imagery',
      minzoom: 0,
      maxzoom: 19,
    },
    {
      id: 'satellite-roads-layer',
      type: 'raster',
      source: 'satellite-roads',
      minzoom: 0,
      maxzoom: 19,
    },
    {
      id: 'satellite-boundaries-layer',
      type: 'raster',
      source: 'satellite-boundaries',
      minzoom: 0,
      maxzoom: 19,
    },
  ],
};

const getSatelliteStyle = (): string | StyleSpecification => {
  const maptilerKey = import.meta.env.VITE_MAPTILER_KEY;
  const hasKey = Boolean(maptilerKey && maptilerKey.trim() !== '' && !maptilerKey.includes('your_'));
  if (hasKey) {
    return `https://api.maptiler.com/maps/hybrid/style.json?key=${maptilerKey}`;
  }
  return SATELLITE_HYBRID_STYLE;
};

export const TravelMap: React.FC<TravelMapProps> = ({
  places,
  selectedPlace,
  onSelectPlace,
  setCursorState,
  onOpenAdminModal,
  isAdminAuthenticated = false,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<MapLibreMap | null>(null);
  const markersRef = useRef<Marker[]>([]);

  const [mapLoaded, setMapLoaded] = useState<boolean>(false);
  const [mapError, setMapError] = useState<string | null>(null);

  // Initialize MapLibre GL with Satellite Hybrid
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    try {
      const initialZoom = window.innerWidth < 768 ? 6.2 : 6.9;
      const map = new MapLibreMap({
        container: mapContainerRef.current,
        style: getSatelliteStyle(),
        center: BANGLADESH_CENTER, // Direct authentic Bangladesh coordinates
        zoom: initialZoom,
        pitch: 18,
        bearing: -3,
        attributionControl: false,
        cooperativeGestures: false,
      });

      // Navigation controls
      map.addControl(
        new NavigationControl({
          showCompass: true,
          showZoom: true,
          visualizePitch: true,
        }),
        'bottom-right'
      );

      // Attribution
      map.addControl(
        new AttributionControl({
          compact: true,
          customAttribution: '© Esri | © Maxar | © MapTiler',
        }),
        'bottom-right'
      );

      map.on('load', () => {
        setMapLoaded(true);
        setMapError(null);
        map.resize();
      });

      // Safety timeout: Ensure loading spinner never locks the screen
      const loadTimeout = setTimeout(() => {
        setMapLoaded(true);
        map.resize();
      }, 2000);

      // Fallback directly to Esri World Imagery if needed
      map.on('error', (e: { error?: { message?: string; status?: number } }) => {
        const errMsg = e?.error?.message || '';
        const status = e?.error?.status;

        if (status === 401 || status === 403 || status === 404 || errMsg.includes('401') || errMsg.includes('403') || errMsg.includes('404')) {
          console.warn('Map style notice. Falling back to universal satellite imagery.');
          try {
            map.setStyle(SATELLITE_HYBRID_STYLE);
          } catch {
            setMapError('Failed to load satellite imagery.');
          }
        }
      });

      // ResizeObserver to ensure canvas matches exact dimensions
      const resizeObserver = new ResizeObserver(() => {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.resize();
        }
      });
      resizeObserver.observe(mapContainerRef.current);

      mapInstanceRef.current = map;

      return () => {
        clearTimeout(loadTimeout);
        resizeObserver.disconnect();
        markersRef.current.forEach((m) => m.remove());
        markersRef.current = [];
        if (mapInstanceRef.current) {
          mapInstanceRef.current.remove();
          mapInstanceRef.current = null;
        }
      };
    } catch (err) {
      setMapError('WebGL not supported or map failed to initialize.');
    }
  }, []);

  // Update Featured Travel Destination Markers (5 Clean Golden Pins)
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !mapLoaded) return;

    // Clear old markers
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    places.forEach((place) => {
      const isSelected = selectedPlace?.id === place.id;

      const markerEl = document.createElement('div');
      markerEl.style.width = '28px';
      markerEl.style.height = '28px';
      markerEl.style.display = 'flex';
      markerEl.style.alignItems = 'center';
      markerEl.style.justifyContent = 'center';
      markerEl.style.position = 'relative';
      markerEl.style.cursor = 'pointer';
      markerEl.style.overflow = 'visible';
      markerEl.setAttribute('role', 'button');
      markerEl.setAttribute('aria-label', `Destination: ${place.location}`);

      markerEl.innerHTML = `
        <div class="relative w-7 h-7 flex items-center justify-center select-none group">
          ${
            isSelected
              ? `<div class="absolute -inset-3 rounded-full bg-accent-amber/40 animate-ping pointer-events-none"></div>
                 <div class="absolute -inset-1.5 rounded-full border-2 border-accent-amber pointer-events-none"></div>`
              : `<div class="absolute -inset-1.5 rounded-full bg-accent-amber/25 group-hover:bg-accent-amber/55 transition-all pointer-events-none"></div>`
          }
          <div class="relative flex items-center justify-center transition-transform duration-300 ${
            isSelected
              ? 'h-6 w-6 rounded-full bg-accent-amber text-bg-primary shadow-[0_0_24px_rgba(212,175,55,1)] scale-110'
              : 'h-4 w-4 rounded-full bg-[#0A0A09] border-2 border-accent-amber group-hover:scale-125 shadow-lg'
          }">
            <div class="${
              isSelected
                ? 'h-2 w-2 rounded-full bg-bg-primary'
                : 'h-1.5 w-1.5 rounded-full bg-accent-amber transition-colors group-hover:bg-accent-gold'
            }"></div>
          </div>

          <!-- Clean Permanent Destination Badge -->
          <div class="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 pointer-events-none transition-all duration-200 z-20">
            <div class="px-2.5 py-1 rounded-md backdrop-blur-md border font-mono text-[10px] tracking-wider whitespace-nowrap shadow-2xl flex items-center gap-1.5 transition-all ${
              isSelected
                ? 'bg-[#0A0A09] border-accent-amber text-accent-gold shadow-lg shadow-black/90 scale-105 font-semibold ring-1 ring-accent-amber/40'
                : 'bg-[#0A0A09]/95 border-accent-amber/40 text-warmPaper shadow-md group-hover:border-accent-amber group-hover:text-accent-gold'
            }">
              <span class="inline-block h-1.5 w-1.5 rounded-full ${isSelected ? 'bg-accent-amber animate-pulse' : 'bg-accent-amber'}"></span>
              <span class="font-medium">${place.location}</span>
            </div>
          </div>
        </div>
      `;

      markerEl.addEventListener('mouseenter', () => {
        setCursorState?.({ type: 'hover', label: place.location.toUpperCase() });
      });

      markerEl.addEventListener('mouseleave', () => {
        setCursorState?.({ type: 'default' });
      });

      markerEl.addEventListener('click', (e) => {
        e.stopPropagation();
        handleSelectDestination(place);
      });

      const marker = new Marker({
        element: markerEl,
        anchor: 'center',
      })
        .setLngLat([place.coordinates.longitude, place.coordinates.latitude])
        .addTo(map);

      markersRef.current.push(marker);
    });
  }, [places, selectedPlace, mapLoaded, setCursorState]);

  // Handle destination selection with smooth camera flight
  const handleSelectDestination = useCallback(
    (place: TravelPlace) => {
      onSelectPlace(place);
      const map = mapInstanceRef.current;
      if (!map) return;

      map.flyTo({
        center: [place.coordinates.longitude, place.coordinates.latitude],
        zoom: window.innerWidth < 768 ? 9.5 : 10.4,
        pitch: 35,
        bearing: 10,
        speed: 1.1,
        curve: 1.4,
        essential: true,
        easing: (t) => 1 - Math.pow(1 - t, 3),
      });
    },
    [onSelectPlace]
  );

  // Reset camera to Bangladesh overview
  const handleResetOverview = useCallback(() => {
    onSelectPlace(null);
    const map = mapInstanceRef.current;
    if (!map) return;

    map.flyTo({
      center: BANGLADESH_CENTER,
      zoom: window.innerWidth < 768 ? 6.2 : 6.9,
      pitch: 18,
      bearing: -3,
      speed: 1.0,
      curve: 1.35,
      essential: true,
      easing: (t) => 1 - Math.pow(1 - t, 3),
    });
  }, [onSelectPlace]);

  return (
    <div className="relative w-full h-full rounded-2xl md:rounded-3xl overflow-hidden border border-border-subtle bg-bg-surface shadow-2xl flex flex-col">
      {/* ── Top Bar Overlay (Clean, Minimal, Editorial) ── */}
      <div className="absolute top-0 left-0 right-0 z-10 flex flex-wrap items-center justify-between gap-3 p-4 bg-gradient-to-b from-bg-primary/95 via-bg-primary/60 to-transparent pointer-events-none">
        {/* Left: Satellite Mode Indicator */}
        <div className="pointer-events-auto flex items-center gap-2 px-3 py-1.5 rounded-full bg-bg-surface/90 backdrop-blur-md border border-border-subtle text-[11px] font-mono text-warmGray shadow-lg">
          <Satellite className="h-3.5 w-3.5 text-accent-amber animate-pulse" />
          <span className="text-text-primary font-medium">SATELLITE EXPEDITION</span>
          <span className="text-stone">·</span>
          <span className="text-accent-gold font-mono">{places.length} LOCATIONS</span>
        </div>

        {/* Right: Overview & Admin Pin Controls */}
        <div className="pointer-events-auto flex items-center gap-2">
          {selectedPlace && (
            <button
              onClick={handleResetOverview}
              onMouseEnter={() => setCursorState?.({ type: 'hover', label: 'RESET' })}
              onMouseLeave={() => setCursorState?.({ type: 'default' })}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-bg-surface/90 backdrop-blur-md border border-accent-amber/40 hover:border-accent-amber text-[10px] font-mono text-accent-gold hover:text-warmPaper transition-all shadow-md"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Overview</span>
            </button>
          )}

          {isAdminAuthenticated && onOpenAdminModal && (
            <button
              onClick={onOpenAdminModal}
              onMouseEnter={() => setCursorState?.({ type: 'hover', label: 'PIN' })}
              onMouseLeave={() => setCursorState?.({ type: 'default' })}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent-amber text-bg-primary hover:bg-accent-gold text-[10px] font-mono font-medium transition-all shadow-md"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Pin</span>
            </button>
          )}
        </div>
      </div>

      {/* ── Quick Location Jump Pills (Bottom) ── */}
      <div className="absolute bottom-3 left-3 right-14 md:right-auto md:left-4 z-10 pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 max-w-full md:max-w-md">
          <button
            onClick={handleResetOverview}
            onMouseEnter={() => setCursorState?.({ type: 'hover' })}
            onMouseLeave={() => setCursorState?.({ type: 'default' })}
            className={`shrink-0 px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase transition-all duration-200 backdrop-blur-md border ${
              !selectedPlace
                ? 'bg-accent-amber text-bg-primary border-accent-amber font-semibold shadow-md shadow-accent-amber/20'
                : 'bg-bg-surface/85 text-warmGray border-border-subtle hover:text-warmPaper hover:border-accent-amber/40'
            }`}
          >
            All
          </button>
          {places.map((place) => {
            const isSelected = selectedPlace?.id === place.id;
            return (
              <button
                key={place.id}
                onClick={() => handleSelectDestination(place)}
                onMouseEnter={() => setCursorState?.({ type: 'hover', label: place.location })}
                onMouseLeave={() => setCursorState?.({ type: 'default' })}
                className={`shrink-0 px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wider whitespace-nowrap transition-all duration-200 backdrop-blur-md border ${
                  isSelected
                    ? 'bg-accent-amber text-bg-primary border-accent-amber font-semibold shadow-md shadow-accent-amber/20'
                    : 'bg-bg-surface/85 text-warmGray border-border-subtle hover:text-warmPaper hover:border-accent-amber/40'
                }`}
              >
                {place.location}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── WebGL Map Canvas Container ── */}
      <div
        ref={mapContainerRef}
        className="w-full flex-1 min-h-[440px] md:min-h-[500px] lg:min-h-[560px] bg-[#0A0A09]"
        style={{ outline: 'none' }}
      />

      {/* ── Map Loading State Overlay ── */}
      <AnimatePresence>
        {!mapLoaded && !mapError && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-bg-primary/95 space-y-4"
          >
            <div className="relative flex items-center justify-center">
              <div className="h-10 w-10 rounded-full border-2 border-accent-amber/20 border-t-accent-amber animate-spin" />
              <Compass className="h-4 w-4 text-accent-amber absolute" />
            </div>
            <div className="text-center space-y-1">
              <p className="font-mono text-[11px] text-accent-gold tracking-widest uppercase">
                CALIBRATING SATELLITE ENGINE...
              </p>
              <p className="font-mono text-[9px] text-stone">
                Loading high-res aerial imagery &amp; coordinate markers
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Map Error State ── */}
      {mapError && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 bg-bg-primary/90 backdrop-blur-md text-center space-y-3">
          <AlertCircle className="h-8 w-8 text-accent-warm" />
          <h4 className="font-display text-lg text-text-primary">Interactive Map Notice</h4>
          <p className="text-xs font-mono text-text-secondary max-w-md leading-relaxed">
            {mapError}
          </p>
        </div>
      )}

      {/* ── Real Coordinates Telemetry (Cleanly placed at top-right or right edge) ── */}
      <div className="absolute bottom-16 right-3 hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded bg-bg-primary/85 backdrop-blur-sm border border-border-subtle/50 text-[9px] font-mono text-stone/80 pointer-events-none select-none z-10">
        <span className="text-accent-amber/70">GEO</span>
        <span>
          {selectedPlace
            ? `${selectedPlace.coordinates.latitude.toFixed(4)}° N, ${selectedPlace.coordinates.longitude.toFixed(4)}° E`
            : `23.6850° N, 90.3563° E`}
        </span>
      </div>
    </div>
  );
};
