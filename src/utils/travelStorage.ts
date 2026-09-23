import { TravelPlace } from '../types';

/**
 * Travel Section Storage Manager
 * 
 * Uses browser IndexedDB as the primary storage engine to safely store
 * multiple high-resolution compressed travel photographs without hitting
 * the strict 5MB quota of localStorage.
 * 
 * Provides transparent fallback to localStorage when IndexedDB is unavailable.
 * Designed with clean architectural boundaries for Phase 2 Supabase cloud storage.
 */

const DB_NAME = 'HasanPortfolioTravelDB';
const DB_VERSION = 1;
const STORE_NAME = 'customTravelPlaces';
const LOCAL_STORAGE_KEY = 'mehedi_travel_places';

/**
 * Open or initialize IndexedDB connection
 */
function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      return reject(new Error('IndexedDB not supported in this environment.'));
    }

    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

/**
 * Save a custom travel place (with all its compressed photos)
 */
export async function saveCustomPlace(place: TravelPlace): Promise<void> {
  // 1. Try saving to IndexedDB
  try {
    const db = await openDB();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const request = store.put(place);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
      tx.oncomplete = () => db.close();
    });
  } catch (idbError) {
    console.warn('[travelStorage] IndexedDB put failed, falling back to localStorage:', idbError);
  }

  // 2. Also sync to localStorage for fast synchronous bootstrap if small enough
  try {
    const existing = getPlacesFromLocalStorage();
    const updated = [place, ...existing.filter((p) => p.id !== place.id)];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  } catch (lsError) {
    console.warn('[travelStorage] localStorage quota reached; relying on IndexedDB:', lsError);
  }
}

/**
 * Retrieve all custom travel places
 */
export async function getAllCustomPlaces(): Promise<TravelPlace[]> {
  try {
    const db = await openDB();
    const places = await new Promise<TravelPlace[]>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const request = store.getAll();

      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
      tx.oncomplete = () => db.close();
    });

    if (places && places.length > 0) {
      return places;
    }
  } catch (idbError) {
    console.warn('[travelStorage] IndexedDB getAll failed, falling back to localStorage:', idbError);
  }

  // Fallback to localStorage
  return getPlacesFromLocalStorage();
}

/**
 * Delete a custom travel place by ID
 */
export async function deleteCustomPlace(id: string): Promise<void> {
  try {
    const db = await openDB();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const request = store.delete(id);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
      tx.oncomplete = () => db.close();
    });
  } catch (idbError) {
    console.warn('[travelStorage] IndexedDB delete error:', idbError);
  }

  // Remove from localStorage
  try {
    const existing = getPlacesFromLocalStorage();
    const filtered = existing.filter((p) => p.id !== id);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filtered));
  } catch {
    /* silent */
  }
}

/**
 * Internal helper to read places from localStorage
 */
function getPlacesFromLocalStorage(): TravelPlace[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}
