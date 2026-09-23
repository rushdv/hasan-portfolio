import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import {
  Map as MapLibreMap,
  Marker,
  type StyleSpecification,
} from 'maplibre-gl';
import {
  Search,
  X,
  Plus,
  Minus,
  Crosshair,
  Navigation,
  AlertCircle,
} from 'lucide-react';
import type { TravelPlace } from '../types';
import type { CursorState } from './CustomCursor';
import { bangladeshBoundaryGeoJSON } from '../data/bangladeshBoundary';

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
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Filter places based on search query
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();
    return places.filter(
      (p) =>
        p.location.toLowerCase().includes(q) ||
        p.region?.toLowerCase().includes(q)
    );
  }, [places, searchQuery]);

  // Initialize MapLibre GL with Satellite Hybrid
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    try {
      const initialZoom = window.innerWidth < 768 ? 6.1 : 6.8;
      const map = new MapLibreMap({
        container: mapContainerRef.current,
        style: getSatelliteStyle(),
        center: BANGLADESH_CENTER,
        zoom: initialZoom,
        pitch: 18,
        bearing: -2,
        attributionControl: false,
        cooperativeGestures: false,
      });

      const addBangladeshBoundary = () => {
        if (!map || map.getSource('bangladesh-boundary')) return;

        try {
          map.addSource('bangladesh-boundary', {
            type: 'geojson',
            data: bangladeshBoundaryGeoJSON as any,
          });

          // 1. Subtle warm ambient tint inside Bangladesh territory
          map.addLayer({
            id: 'bangladesh-fill',
            type: 'fill',
            source: 'bangladesh-boundary',
            paint: {
              'fill-color': '#d4af37',
              'fill-opacity': 0.035,
            },
          });

          // 2. Soft ambient golden glow along Bangladesh international border
          map.addLayer({
            id: 'bangladesh-border-glow',
            type: 'line',
            source: 'bangladesh-boundary',
            paint: {
              'line-color': '#d4af37',
              'line-width': 4.5,
              'line-blur': 2.5,
              'line-opacity': 0.6,
            },
          });

          // 3. Crisp luminous golden border line marking Bangladesh
          map.addLayer({
            id: 'bangladesh-border-line',
            type: 'line',
            source: 'bangladesh-boundary',
            paint: {
              'line-color': '#f8df95',
              'line-width': 1.8,
              'line-opacity': 0.92,
            },
          });
        } catch (err) {
          console.warn('Could not add Bangladesh boundary:', err);
        }
      };

      map.on('load', () => {
        addBangladeshBoundary();
        setMapLoaded(true);
        setMapError(null);
        map.resize();
      });

      map.on('styledata', () => {
        addBangladeshBoundary();
      });

      // Safety timeout: Ensure loading spinner never locks the screen
      const loadTimeout = setTimeout(() => {
        setMapLoaded(true);
        map.resize();
      }, 2000);

      // Fallback directly to Esri World Imagery if style load fails
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
    } catch {
      setMapError('WebGL not supported or map failed to initialize.');
    }
  }, []);

  // Destination selection with smooth camera flight
  const handleSelectDestination = useCallback(
    (place: TravelPlace) => {
      onSelectPlace(place);
      const map = mapInstanceRef.current;
      if (!map) return;

      map.flyTo({
        center: [place.coordinates.longitude, place.coordinates.latitude],
        zoom: window.innerWidth < 768 ? 9.5 : 10.4,
        pitch: 35,
        bearing: 8,
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
      zoom: window.innerWidth < 768 ? 6.1 : 6.8,
      pitch: 18,
      bearing: -2,
      speed: 1.0,
      curve: 1.35,
      essential: true,
      easing: (t) => 1 - Math.pow(1 - t, 3),
    });
  }, [onSelectPlace]);

  // Circular Photo Markers with Amber Pin Dots Exactly Centered on Coordinates
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !mapLoaded) return;

    // Clear old markers
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    places.forEach((place) => {
      const isSelected = selectedPlace?.id === place.id;
      const coverPhoto = (place as any).coverImage || place.coverPhoto || place.photo || '';

      const markerEl = document.createElement('div');
      markerEl.style.width = '0px';
      markerEl.style.height = '0px';
      markerEl.style.position = 'relative';
      markerEl.style.display = 'flex';
      markerEl.style.alignItems = 'center';
      markerEl.style.justifyContent = 'center';
      markerEl.style.cursor = 'pointer';
      markerEl.setAttribute('role', 'button');
      markerEl.setAttribute('aria-label', `Destination: ${place.location}`);

      markerEl.innerHTML = `
        <div class="relative flex items-center justify-center select-none group cursor-pointer" style="width: 0; height: 0;">
          <!-- Top Floating Avatar: positioned right above the center pin dot -->
          <div class="absolute bottom-2 flex flex-col items-center pointer-events-none transition-all duration-300">
            ${
              isSelected
                ? `<div class="absolute -inset-1.5 rounded-full bg-accent-amber/40 animate-ping"></div>`
                : ''
            }
            <div class="relative w-9 h-9 rounded-full overflow-hidden bg-[#1c1c24] transition-all duration-300 ${
              isSelected
                ? 'border-2 border-accent-amber ring-4 ring-accent-amber/50 shadow-[0_0_24px_rgba(212,175,55,1)] scale-110'
                : 'border-2 border-white/90 group-hover:border-accent-amber group-hover:scale-110 shadow-lg'
            }">
              <img src="${coverPhoto}" alt="${place.location}" class="w-full h-full object-cover pointer-events-none" onerror="this.style.opacity='0'" />
            </div>
          </div>

          <!-- Center Pin Dot (Exactly at 0, 0 = Geographic GPS Point on the satellite map!) -->
          <div class="h-3 w-3 rounded-full bg-accent-amber border-2 border-[#0A0A09] shadow-md z-10 transition-transform ${
            isSelected ? 'scale-125 ring-2 ring-accent-amber' : 'group-hover:scale-125'
          }"></div>

          <!-- Bottom Label Badge: positioned right below the center pin dot -->
          <div class="absolute top-2.5 flex flex-col items-center pointer-events-none transition-all duration-300 z-20 whitespace-nowrap">
            <div class="px-2.5 py-0.5 rounded-md backdrop-blur-md font-mono text-[10px] tracking-wider whitespace-nowrap shadow-2xl transition-all ${
              isSelected
                ? 'bg-[#0A0A09] border border-accent-amber text-accent-gold shadow-lg font-semibold scale-105'
                : 'bg-[#0A0A09]/95 border border-white/20 text-warmPaper group-hover:border-accent-amber group-hover:text-accent-gold'
            }">
              <span>${place.location}</span>
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
  }, [places, selectedPlace, mapLoaded, setCursorState, handleSelectDestination]);

  return (
    <div className="relative w-full h-full rounded-3xl overflow-hidden border border-border-subtle bg-[#0A0A09] shadow-2xl flex flex-col min-h-[580px] lg:min-h-[660px]">
      {/* ── TOP OVERLAYS ── */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between gap-3 p-4 pointer-events-none">
        {/* Left: Badge Pill & Optional Admin Add Pin */}
        <div className="flex items-center gap-2">
          <div className="pointer-events-auto flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0A0A09]/85 backdrop-blur-md border border-white/15 text-[10px] font-mono text-warmGray shadow-xl">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-amber animate-pulse" />
            <span className="text-warmPaper font-medium tracking-wider uppercase">BANGLADESH EXPEDITIONS</span>
            <span className="text-stone">|</span>
            <span className="text-accent-gold font-mono">{places.length} LOCATIONS</span>
          </div>

          {isAdminAuthenticated && onOpenAdminModal && (
            <button
              onClick={onOpenAdminModal}
              className="pointer-events-auto flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent-amber text-bg-primary text-[11px] font-mono font-bold hover:bg-accent-gold transition-all shadow-lg shadow-accent-amber/25"
              title="Add new destination pin & upload photos"
            >
              <Plus className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Add Pin</span>
            </button>
          )}
        </div>

        {/* Right: Search Locations Bar */}
        <div className="pointer-events-auto relative">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0A0A09]/85 backdrop-blur-md border border-white/15 focus-within:border-accent-amber text-xs font-mono shadow-xl transition-all">
            <Search className="h-3.5 w-3.5 text-stone" />
            <input
              type="text"
              placeholder="Search locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-warmPaper placeholder-stone text-xs focus:outline-none w-32 sm:w-44"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-stone hover:text-warmPaper transition-colors"
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </div>

          {/* Search Results Dropdown */}
          {searchResults.length > 0 && (
            <div className="absolute top-full right-0 mt-2 w-52 rounded-xl bg-[#0A0A09]/95 backdrop-blur-md border border-border-subtle p-1.5 shadow-2xl z-30 space-y-1">
              {searchResults.map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    handleSelectDestination(p);
                    setSearchQuery('');
                  }}
                  className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-bg-card flex items-center justify-between text-xs font-mono text-warmPaper hover:text-accent-gold transition-colors"
                >
                  <span className="font-medium">{p.location}</span>
                  <span className="text-[10px] text-stone">{p.region?.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── BOTTOM OVERLAYS ── */}
      <div className="absolute bottom-4 left-4 right-4 z-20 flex items-end justify-between pointer-events-none">
        {/* Bottom Left: Minimalist Compass & 50km Scale Bar */}
        <div className="pointer-events-none flex flex-col items-start gap-2 text-stone select-none">
          <div className="flex flex-col items-center">
            <span className="text-[9px] font-mono font-bold tracking-widest text-warmPaper">N</span>
            <Navigation className="h-3.5 w-3.5 text-accent-amber fill-accent-amber/30 -rotate-45" />
          </div>
          <div className="space-y-0.5">
            <div className="h-1.5 w-16 border-b border-l border-r border-warmPaper/70" />
            <span className="text-[8px] font-mono tracking-widest text-warmGray/80 block">50 km</span>
          </div>
        </div>

        {/* Bottom Right: Zoom Controls & Re-Center Crosshairs */}
        <div className="pointer-events-auto flex flex-col items-center gap-1 bg-[#0A0A09]/85 backdrop-blur-md border border-white/15 p-1.5 rounded-xl shadow-2xl">
          <button
            onClick={() => mapInstanceRef.current?.zoomIn()}
            className="p-1.5 rounded-lg hover:bg-white/10 text-stone hover:text-warmPaper transition-colors"
            aria-label="Zoom in"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
          <div className="h-px w-3 bg-white/10" />
          <button
            onClick={() => mapInstanceRef.current?.zoomOut()}
            className="p-1.5 rounded-lg hover:bg-white/10 text-stone hover:text-warmPaper transition-colors"
            aria-label="Zoom out"
          >
            <Minus className="h-3.5 w-3.5" />
          </button>
          <div className="h-px w-3 bg-white/10" />
          <button
            onClick={handleResetOverview}
            className="p-1.5 rounded-lg hover:bg-white/10 text-stone hover:text-accent-gold transition-colors"
            aria-label="Re-center map"
            title="Overview Bangladesh"
          >
            <Crosshair className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* WebGL Canvas Container */}
      <div ref={mapContainerRef} className="w-full h-full relative" />

      {/* Loading Overlay */}
      {!mapLoaded && !mapError && (
        <div className="absolute inset-0 bg-bg-surface flex items-center justify-center z-10">
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 rounded-full border-2 border-accent-amber/30 border-t-accent-amber animate-spin" />
            <span className="text-xs font-mono text-stone">Loading Satellite Map...</span>
          </div>
        </div>
      )}

      {/* Error State */}
      {mapError && (
        <div className="absolute inset-0 bg-bg-surface flex items-center justify-center z-10 p-6 text-center">
          <div className="space-y-2">
            <AlertCircle className="h-6 w-6 text-rose-400 mx-auto" />
            <p className="text-xs font-mono text-warmPaper">{mapError}</p>
          </div>
        </div>
      )}
    </div>
  );
};
