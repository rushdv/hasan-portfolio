import { createClient } from '@supabase/supabase-js';
import { TravelLocation, TravelPhoto } from '../types/travel';
import { travelLocations as defaultLocations } from '../data/travelLocations';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl.startsWith('https://') &&
  !supabaseUrl.includes('your-project')
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

const STORAGE_BUCKET = 'travel-photos';

/**
 * Upload a single image file or compressed Blob to Supabase Storage
 */
export async function uploadPhotoToStorage(
  file: File | Blob,
  locationId: string,
  fileName?: string
): Promise<{ url: string; path: string } | null> {
  if (!supabase) {
    console.warn('Supabase is not configured.');
    return null;
  }

  try {
    const ext = (fileName ? fileName.split('.').pop() : 'jpg')?.toLowerCase() || 'jpg';
    const cleanId = locationId.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const uniquePath = `${cleanId}/${Date.now()}-${Math.random().toString(36).substring(2, 7)}.${ext}`;

    const mimeMap: Record<string, string> = {
      jpg: 'image/jpeg',
      jpeg: 'image/jpeg',
      png: 'image/png',
      webp: 'image/webp',
      gif: 'image/gif',
    };
    const contentType = (file as Blob).type || mimeMap[ext] || 'image/jpeg';

    const { data, error } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(uniquePath, file, {
        cacheControl: '3600',
        upsert: true,
        contentType,
      });

    if (error) {
      console.error('Storage upload error:', error);
      throw error;
    }

    const { data: urlData } = supabase.storage
      .from(STORAGE_BUCKET)
      .getPublicUrl(data.path);

    return {
      url: urlData.publicUrl,
      path: data.path,
    };
  } catch (err) {
    console.error('Failed to upload image to Supabase:', err);
    return null;
  }
}

/**
 * Fetch all travel locations and their photographic archives from Supabase
 * Merges with local default locations so default locations are always retained.
 */
export async function fetchLocationsFromSupabase(): Promise<TravelLocation[]> {
  if (!supabase) return defaultLocations;

  try {
    // 1. Fetch locations
    const { data: locationsData, error: locError } = await supabase
      .from('travel_locations')
      .select('*')
      .order('created_at', { ascending: false });

    if (locError || !locationsData || locationsData.length === 0) {
      return defaultLocations;
    }

    // 2. Fetch photos
    const { data: photosData, error: photosError } = await supabase
      .from('travel_photos')
      .select('*')
      .order('created_at', { ascending: true });

    if (photosError) {
      console.warn('Error fetching photos:', photosError);
    }

    const photosByLocation: Record<string, TravelPhoto[]> = {};
    (photosData || []).forEach((p: any) => {
      if (!photosByLocation[p.location_id]) {
        photosByLocation[p.location_id] = [];
      }
      photosByLocation[p.location_id].push({
        id: p.id,
        url: p.url,
        thumbnailUrl: p.thumbnail_url || p.url,
        caption: p.caption || '',
        takenAt: p.taken_at || '',
        aspectRatio: p.aspect_ratio || 'landscape',
      });
    });

    // 3. Map into TravelLocation interface
    const mapped: TravelLocation[] = locationsData.map((loc: any) => {
      const photos = photosByLocation[loc.id] || [];
      const cover = loc.cover_image || (photos[0]?.url) || '';

      return {
        id: loc.id,
        name: loc.name,
        district: loc.district || '',
        division: loc.division || '',
        country: loc.country || 'Bangladesh',
        latitude: Number(loc.latitude),
        longitude: Number(loc.longitude),
        description: loc.description || '',
        quote: loc.quote || '',
        favouriteMoment: loc.favourite_moment || '',
        visitedDate: loc.visited_date || '',
        coverImage: cover,
        totalPhotosCount: photos.length,
        photos: photos,

        // Backward-compatibility aliases:
        location: loc.name,
        region: loc.division || loc.district || '',
        coordinates: {
          latitude: Number(loc.latitude),
          longitude: Number(loc.longitude),
        },
        date: loc.visited_date || '',
        coverPhoto: cover,
        story: loc.description || '',
      };
    });

    if (mapped.length > 0) {
      // Merge with default locations that are not overridden by Supabase ID
      const remainingDefaults = defaultLocations.filter(
        (def) => !mapped.some((m) => m.id === def.id)
      );
      return [...mapped, ...remainingDefaults];
    }

    return defaultLocations;
  } catch (err) {
    console.warn('Failed to load from Supabase, using local data:', err);
    return defaultLocations;
  }
}

/**
 * Save or update a travel location with its photos
 */
export async function saveLocationToSupabase(
  location: Partial<TravelLocation> & { id: string; name: string },
  newPhotoUrls: Array<{ url: string; caption?: string }>
): Promise<boolean> {
  if (!supabase) return false;

  try {
    // 1. Upsert Location
    const { error: locError } = await supabase
      .from('travel_locations')
      .upsert({
        id: location.id,
        name: location.name,
        district: location.district || '',
        division: location.division || '',
        country: location.country || 'Bangladesh',
        latitude: location.latitude,
        longitude: location.longitude,
        cover_image: location.coverImage || location.coverPhoto || (newPhotoUrls[0]?.url) || '',
        description: location.description || location.story || '',
        quote: location.quote || '',
        favourite_moment: location.favouriteMoment || '',
        visited_date: location.visitedDate || location.date || '',
      });

    if (locError) {
      console.error('Error saving location:', locError);
      throw locError;
    }

    // 2. Insert new photos
    if (newPhotoUrls.length > 0) {
      const photosToInsert = newPhotoUrls.map((p) => ({
        location_id: location.id,
        url: p.url,
        thumbnail_url: p.url,
        caption: p.caption || location.name,
        taken_at: location.visitedDate || location.date || '',
        aspect_ratio: 'landscape',
      }));

      const { error: photosError } = await supabase
        .from('travel_photos')
        .insert(photosToInsert);

      if (photosError) {
        console.error('Error saving photos:', photosError);
      }
    }

    return true;
  } catch (err) {
    console.error('Save location failed:', err);
    return false;
  }
}

/**
 * Synchronize photos for a location (removes deleted photos from Supabase, adds newly uploaded ones)
 */
export async function syncLocationPhotosInSupabase(
  locationId: string,
  retainedPhotoUrls: string[],
  newPhotoUrls: Array<{ url: string; caption?: string }>
): Promise<boolean> {
  if (!supabase) return false;

  try {
    // 1. Fetch current photos from Supabase for this location
    const { data: currentPhotos } = await supabase
      .from('travel_photos')
      .select('id, url')
      .eq('location_id', locationId);

    if (currentPhotos && currentPhotos.length > 0) {
      // Find photos that were removed by admin
      const photosToDelete = currentPhotos.filter(
        (p: any) => !retainedPhotoUrls.includes(p.url)
      );

      if (photosToDelete.length > 0) {
        const idsToDelete = photosToDelete.map((p: any) => p.id);
        await supabase.from('travel_photos').delete().in('id', idsToDelete);

        // Delete from storage bucket if stored in Supabase
        const storagePaths: string[] = [];
        photosToDelete.forEach((p: any) => {
          if (p.url.includes('/storage/v1/object/public/travel-photos/')) {
            const path = p.url.split('/storage/v1/object/public/travel-photos/')[1];
            if (path) storagePaths.push(decodeURIComponent(path));
          }
        });
        if (storagePaths.length > 0) {
          await supabase.storage.from(STORAGE_BUCKET).remove(storagePaths);
        }
      }
    }

    // 2. Insert newly uploaded photos
    if (newPhotoUrls.length > 0) {
      const photosToInsert = newPhotoUrls.map((p) => ({
        location_id: locationId,
        url: p.url,
        thumbnail_url: p.url,
        caption: p.caption || '',
        aspect_ratio: 'landscape',
      }));

      const { error: insertError } = await supabase
        .from('travel_photos')
        .insert(photosToInsert);

      if (insertError) {
        console.error('Error inserting photos:', insertError);
      }
    }

    return true;
  } catch (err) {
    console.error('Error syncing photos in Supabase:', err);
    return false;
  }
}

/**
 * Delete a location and all associated photos from Supabase database and storage
 */
export async function deleteLocationFromSupabase(locationId: string): Promise<boolean> {
  if (!supabase) return false;

  try {
    // 1. Find all photo URLs for storage bucket cleanup
    const { data: photos } = await supabase
      .from('travel_photos')
      .select('url')
      .eq('location_id', locationId);

    if (photos && photos.length > 0) {
      const storagePaths: string[] = [];
      photos.forEach((p: any) => {
        if (p.url.includes('/storage/v1/object/public/travel-photos/')) {
          const path = p.url.split('/storage/v1/object/public/travel-photos/')[1];
          if (path) storagePaths.push(decodeURIComponent(path));
        }
      });
      if (storagePaths.length > 0) {
        await supabase.storage.from(STORAGE_BUCKET).remove(storagePaths);
      }
    }

    // 2. Delete from travel_locations (cascades to travel_photos table)
    const { error: delError } = await supabase
      .from('travel_locations')
      .delete()
      .eq('id', locationId);

    if (delError) {
      console.error('Error deleting location:', delError);
      throw delError;
    }

    return true;
  } catch (err) {
    console.error('Failed to delete location from Supabase:', err);
    return false;
  }
}

/**
 * Delete a single photo by URL from Supabase
 */
export async function deletePhotoFromSupabase(photoUrl: string): Promise<boolean> {
  if (!supabase) return false;

  try {
    // 1. Delete from database
    await supabase.from('travel_photos').delete().eq('url', photoUrl);

    // 2. Delete from storage if hosted in bucket
    if (photoUrl.includes('/storage/v1/object/public/travel-photos/')) {
      const path = photoUrl.split('/storage/v1/object/public/travel-photos/')[1];
      if (path) {
        await supabase.storage.from(STORAGE_BUCKET).remove([decodeURIComponent(path)]);
      }
    }

    return true;
  } catch (err) {
    console.error('Failed to delete photo from Supabase:', err);
    return false;
  }
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
  read?: boolean;
}

const LOCAL_MESSAGES_KEY = 'hasan_contact_messages';

function getLocalMessages(): ContactMessage[] {
  try {
    const raw = localStorage.getItem(LOCAL_MESSAGES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLocalMessages(msgs: ContactMessage[]) {
  try {
    localStorage.setItem(LOCAL_MESSAGES_KEY, JSON.stringify(msgs));
  } catch (e) {
    console.warn('Could not save messages to localStorage', e);
  }
}

/**
 * Save incoming visitor inquiry to Supabase contact_messages and local backup
 */
export async function saveContactMessage(msg: {
  name: string;
  email: string;
  message: string;
}): Promise<boolean> {
  const localMsg: ContactMessage = {
    id: `local-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    name: msg.name,
    email: msg.email,
    message: msg.message,
    created_at: new Date().toISOString(),
    read: false,
  };

  // Always back up locally first
  const currentLocal = getLocalMessages();
  saveLocalMessages([localMsg, ...currentLocal]);

  if (!supabase) return true;

  try {
    const { error } = await supabase.from('contact_messages').insert([
      {
        name: msg.name,
        email: msg.email,
        message: msg.message,
      },
    ]);

    if (error) {
      console.warn('Could not store contact message in Supabase (will use local backup):', error);
      return true;
    }
    return true;
  } catch (err) {
    console.warn('Error saving message to Supabase:', err);
    return true;
  }
}

/**
 * Fetch all contact messages (from Supabase merged with local cache)
 */
export async function fetchContactMessages(): Promise<ContactMessage[]> {
  const localMsgs = getLocalMessages();

  if (!supabase) return localMsgs;

  try {
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data) {
      return localMsgs;
    }

    // Merge Supabase data with local backup
    const map = new Map<string, ContactMessage>();
    data.forEach((m: any) => {
      map.set(m.id, {
        id: m.id,
        name: m.name,
        email: m.email,
        message: m.message,
        created_at: m.created_at,
        read: m.read ?? false,
      });
    });

    localMsgs.forEach((m) => {
      const exists = Array.from(map.values()).some(
        (sm) => sm.email === m.email && sm.message === m.message
      );
      if (!exists && !map.has(m.id)) {
        map.set(m.id, m);
      }
    });

    const combined = Array.from(map.values()).sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    return combined;
  } catch (err) {
    console.warn('Error fetching contact messages:', err);
    return localMsgs;
  }
}

/**
 * Delete a contact message from Supabase and local cache
 */
export async function deleteContactMessage(messageId: string): Promise<boolean> {
  const localMsgs = getLocalMessages();
  saveLocalMessages(localMsgs.filter((m) => m.id !== messageId));

  if (!supabase) return true;

  try {
    const { error } = await supabase
      .from('contact_messages')
      .delete()
      .eq('id', messageId);

    if (error) {
      console.warn('Note deleting from Supabase:', error);
    }
    return true;
  } catch (err) {
    console.warn('Delete message error:', err);
    return true;
  }
}
