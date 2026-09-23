/**
 * Travel Data Types
 * 
 * Designed to map naturally to future Supabase tables:
 * - `travel_locations`
 * - `travel_photos`
 */

export interface TravelPhoto {
  id: string;
  url: string;
  thumbnailUrl?: string;
  caption?: string;
  takenAt?: string;
  aspectRatio?: 'landscape' | 'portrait' | 'square';
}

export interface TravelLocation {
  id: string;
  name: string;
  district?: string;
  division?: string;
  country: string;
  description: string;
  visitedDate?: string;
  latitude: number;
  longitude: number;
  coverImage: string;
  favouriteMoment?: string;
  quote?: string;
  totalPhotosCount?: number;
  photos: TravelPhoto[];

  // Backward-compatibility aliases for existing TravelMap and storage utilities
  location: string;
  region: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  date: string;
  coverPhoto: string;
  story: string;
}

export interface TravelLightboxState {
  isOpen: boolean;
  activePhotoIndex: number;
  photos: TravelPhoto[];
  locationName: string;
  division?: string;
}
