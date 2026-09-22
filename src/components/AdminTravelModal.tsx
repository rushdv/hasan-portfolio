import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Plus, X, Upload, Check, AlertCircle, Image as ImageIcon } from 'lucide-react';
import { TravelPlace } from '../types';

interface AdminTravelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddPlace: (newPlace: TravelPlace) => void;
  isAuthenticated: boolean;
  onAuthenticate: () => void;
}

export const AdminTravelModal: React.FC<AdminTravelModalProps> = ({
  isOpen,
  onClose,
  onAddPlace,
  isAuthenticated,
  onAuthenticate,
}) => {
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  // Form State
  const [location, setLocation] = useState('');
  const [region, setRegion] = useState('Chittagong Division');
  const [date, setDate] = useState('');
  const [photoDataUri, setPhotoDataUri] = useState('');
  const [photoFileName, setPhotoFileName] = useState('');
  const [story, setStory] = useState('');
  const [favouriteMoment, setFavouriteMoment] = useState('');
  // Real geographic coordinates (defaults to Dhaka center)
  const [latitude, setLatitude] = useState<number | string>(23.8103);
  const [longitude, setLongitude] = useState<number | string>(90.4125);
  const [formSuccess, setFormSuccess] = useState(false);

  // Handle Raw Image File Upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoDataUri(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;
    if (adminPassword && password === adminPassword) {
      onAuthenticate();
      setAuthError('');
    } else {
      setAuthError('Incorrect password.');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!location || !story || !photoDataUri) {
      alert('Please fill in location, upload a raw photo file, and write your story.');
      return;
    }

    const newPlace: TravelPlace = {
      id: `custom-${Date.now()}`,
      location,
      region,
      date: date || 'Recently Visited',
      coverPhoto: photoDataUri,
      photo: photoDataUri,
      photos: [photoDataUri],
      story,
      favouriteMoment: favouriteMoment || story.slice(0, 60) + '...',
      coordinates: {
        latitude: parseFloat(String(latitude)) || 23.8103,
        longitude: parseFloat(String(longitude)) || 90.4125,
      },
    };

    onAddPlace(newPlace);
    setFormSuccess(true);

    setTimeout(() => {
      setFormSuccess(false);
      setLocation('');
      setPhotoDataUri('');
      setPhotoFileName('');
      setStory('');
      setFavouriteMoment('');
      onClose();
    }, 1200);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-bg-primary/90 backdrop-blur-md">
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl bg-bg-surface border border-border-subtle p-6 sm:p-8 shadow-2xl space-y-6"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-bg-card border border-border-subtle text-text-secondary hover:text-accent-gold transition-colors z-10"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 border-b border-border-subtle/80 pb-4">
          <div className="p-2.5 rounded-xl bg-accent-amber/10 border border-accent-amber/20 text-accent-amber">
            <Lock className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-accent-gold uppercase tracking-widest block">
              TRAVEL LOG MANAGER // ADMIN
            </span>
            <h3 className="text-xl font-display font-extrabold text-text-primary">
              {isAuthenticated ? 'Add Travel Destination (Raw Photo File)' : 'Admin Authentication'}
            </h3>
          </div>
        </div>

        {/* LOGIN FORM IF NOT AUTHENTICATED */}
        {!isAuthenticated ? (
          <form onSubmit={handleLogin} className="space-y-5 py-2">
            <p className="text-xs font-mono text-text-secondary leading-relaxed">
              Log in as admin to upload raw image files from your device and pin new locations on the map.
            </p>

            <div className="space-y-2">
              <label className="text-xs font-mono text-accent-gold block">
                ADMIN PASSWORD
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full px-4 py-3 rounded-xl bg-bg-card border border-border-subtle text-text-primary text-sm focus:border-accent-amber focus:outline-none transition-colors"
                autoFocus
              />
              {authError && (
                <p className="text-xs font-mono text-rose-400 flex items-center gap-1 mt-1">
                  <AlertCircle className="h-3 w-3" /> {authError}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-accent-amber text-bg-primary rounded-xl font-display font-extrabold text-xs tracking-wider hover:bg-accent-gold transition-all duration-300 shadow-lg shadow-accent-amber/20"
            >
              LOG IN AS ADMIN
            </button>
          </form>
        ) : (
          /* ADD DESTINATION FORM WITH RAW FILE UPLOAD */
          <form onSubmit={handleSubmit} className="space-y-4">
            {formSuccess ? (
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
                <div className="p-4 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400">
                  <Check className="h-8 w-8" />
                </div>
                <h4 className="text-xl font-display font-bold text-text-primary">
                  Destination & Photo Saved!
                </h4>
                <p className="text-xs font-mono text-text-muted">
                  Your new entry is pinned on the Bangladesh Map & Journal feed.
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Location Name */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-accent-gold">
                      LOCATION NAME *
                    </label>
                    <input
                      type="text"
                      required
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. Sajek Valley, Rangamati"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-bg-card border border-border-subtle text-text-primary text-xs focus:border-accent-amber focus:outline-none"
                    />
                  </div>

                  {/* Region / Division */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-accent-gold">
                      DIVISION / REGION
                    </label>
                    <select
                      value={region}
                      onChange={(e) => setRegion(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-bg-card border border-border-subtle text-text-primary text-xs focus:border-accent-amber focus:outline-none"
                    >
                      <option value="Chittagong Division">Chittagong Division</option>
                      <option value="Sylhet Division">Sylhet Division</option>
                      <option value="Dhaka Division">Dhaka Division</option>
                      <option value="Khulna Division">Khulna Division</option>
                      <option value="Barisal Division">Barisal Division</option>
                      <option value="Rajshahi Division">Rajshahi Division</option>
                      <option value="Rangpur Division">Rangpur Division</option>
                      <option value="Mymensingh Division">Mymensingh Division</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Date */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-accent-gold">
                      DATE / SEASON
                    </label>
                    <input
                      type="text"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      placeholder="e.g. March 2026"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-bg-card border border-border-subtle text-text-primary text-xs focus:border-accent-amber focus:outline-none"
                    />
                  </div>

                  {/* RAW IMAGE FILE UPLOAD */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-accent-gold">
                      RAW IMAGE FILE UPLOAD *
                    </label>
                    <label className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-bg-card border border-dashed border-accent-amber/60 hover:border-accent-amber cursor-pointer transition-all">
                      <span className="text-xs font-mono text-text-secondary truncate max-w-[200px]">
                        {photoFileName || 'Choose Photo File...'}
                      </span>
                      <Upload className="h-4 w-4 text-accent-amber shrink-0 ml-2" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                {/* IMAGE PREVIEW THUMBNAIL */}
                {photoDataUri && (
                  <div className="p-2 rounded-xl bg-bg-card border border-border-subtle flex items-center gap-3">
                    <img
                      src={photoDataUri}
                      alt="Upload Preview"
                      className="h-14 w-20 object-cover rounded-lg border border-white/10"
                    />
                    <div>
                      <span className="text-[10px] font-mono text-emerald-400 block">✓ PHOTO FILE LOADED</span>
                      <span className="text-xs font-mono text-text-muted truncate max-w-[260px] block">
                        {photoFileName}
                      </span>
                    </div>
                  </div>
                )}

                {/* Geographic Coordinates Input */}
                <div className="p-3 rounded-xl bg-bg-card border border-border-subtle space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-mono text-accent-gold">
                    <span>GEOGRAPHIC COORDINATES (LATITUDE / LONGITUDE)</span>
                    <span className="text-text-muted">Bangladesh bounds: ~20.5°-26.5°N, ~88.0°-92.5°E</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-mono text-text-muted block mb-1">
                        Latitude (°N) *
                      </label>
                      <input
                        type="number"
                        step="0.0001"
                        required
                        value={latitude}
                        onChange={(e) => setLatitude(e.target.value)}
                        placeholder="23.8103"
                        className="w-full px-3 py-2 rounded-lg bg-bg-surface border border-border-subtle text-text-primary text-xs font-mono focus:border-accent-amber focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-mono text-text-muted block mb-1">
                        Longitude (°E) *
                      </label>
                      <input
                        type="number"
                        step="0.0001"
                        required
                        value={longitude}
                        onChange={(e) => setLongitude(e.target.value)}
                        placeholder="90.4125"
                        className="w-full px-3 py-2 rounded-lg bg-bg-surface border border-border-subtle text-text-primary text-xs font-mono focus:border-accent-amber focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Story */}
                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-accent-gold">
                    TRAVEL STORY & EXPERIENCE *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={story}
                    onChange={(e) => setStory(e.target.value)}
                    placeholder="Describe your journey, landscape view, feelings, or forest trek..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-bg-card border border-border-subtle text-text-primary text-xs focus:border-accent-amber focus:outline-none"
                  />
                </div>

                {/* Favourite Moment */}
                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-accent-gold">
                    FAVOURITE MOMENT (HIGHLIGHT)
                  </label>
                  <input
                    type="text"
                    value={favouriteMoment}
                    onChange={(e) => setFavouriteMoment(e.target.value)}
                    placeholder="e.g. Watching sunrise above cloud ocean at 6 AM"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-bg-card border border-border-subtle text-text-primary text-xs focus:border-accent-amber focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-accent-amber text-bg-primary rounded-xl font-display font-extrabold text-xs tracking-wider hover:bg-accent-gold transition-all duration-300 shadow-lg shadow-accent-amber/20 flex items-center justify-center gap-2"
                >
                  <Plus className="h-4 w-4" /> SAVE TRAVEL MEMORY
                </button>
              </>
            )}
          </form>
        )}
      </motion.div>
    </div>
  );
};
