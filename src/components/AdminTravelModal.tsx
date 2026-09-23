import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Lock,
  Plus,
  X,
  Upload,
  Check,
  AlertCircle,
  Image as ImageIcon,
  Star,
  Trash2,
  MapPin,
  Sparkles,
  Loader2,
  Link2,
  Edit3,
  Inbox,
  Mail,
  RefreshCw,
  Search,
  Reply,
  Eye,
  EyeOff,
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { TravelPlace } from '../types';
import { TravelLocation } from '../types/travel';
import {
  compressImages,
  compressImage,
  CompressedImage,
  formatFileSize,
} from '../utils/imageCompressor';
import {
  uploadPhotoToStorage,
  saveLocationToSupabase,
  syncLocationPhotosInSupabase,
  deleteLocationFromSupabase,
  isSupabaseConfigured,
  fetchContactMessages,
  deleteContactMessage,
  ContactMessage,
} from '../lib/supabase';

interface AdminTravelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddPlace: (newPlace: TravelPlace) => void;
  onUpdatePlace?: (updatedPlace: TravelPlace) => void;
  onDeletePlace?: (placeId: string) => void;
  initialPlace?: TravelPlace | TravelLocation | null;
  isAuthenticated: boolean;
  onAuthenticate: () => void;
  initialTab?: 'expeditions' | 'messages';
}

// Quick Preset Destinations across Bangladesh
const BANGLADESH_PRESETS = [
  { name: 'Sajek Valley', region: 'Chittagong Division', lat: 23.382, lng: 92.2938 },
  { name: 'Saint Martin Island', region: 'Chittagong Division', lat: 20.6273, lng: 92.3225 },
  { name: 'Cox\'s Bazar', region: 'Chittagong Division', lat: 21.4272, lng: 91.9782 },
  { name: 'Bandarban Hills', region: 'Chittagong Division', lat: 22.1953, lng: 92.2184 },
  { name: 'Sylhet & Jaflong', region: 'Sylhet Division', lat: 24.8949, lng: 91.8687 },
  { name: 'Sreemangal Tea Gardens', region: 'Sylhet Division', lat: 24.3065, lng: 91.7296 },
  { name: 'Tanguar Haor', region: 'Sylhet Division', lat: 25.127, lng: 91.077 },
  { name: 'Kuakata Sea Beach', region: 'Barisal Division', lat: 21.8167, lng: 90.1167 },
  { name: 'Sundarbans Forest', region: 'Khulna Division', lat: 22.1, lng: 89.5 },
  { name: 'Old Dhaka Heritage', region: 'Dhaka Division', lat: 23.7104, lng: 90.4074 },
];

export const AdminTravelModal: React.FC<AdminTravelModalProps> = ({
  isOpen,
  onClose,
  onAddPlace,
  onUpdatePlace,
  onDeletePlace,
  initialPlace = null,
  isAuthenticated,
  onAuthenticate,
  initialTab = 'expeditions',
}) => {
  const isEditing = Boolean(initialPlace);

  // Tab state
  const [activeTab, setActiveTab] = useState<'expeditions' | 'messages'>(initialTab);

  // Visitor Messages state
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [deletingMessageId, setDeletingMessageId] = useState<string | null>(null);
  const [messageFilter, setMessageFilter] = useState('');

  // Auth state
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');

  // Destination Details Form State
  const [location, setLocation] = useState('');
  const [region, setRegion] = useState('Chittagong Division');
  const [date, setDate] = useState('');
  const [story, setStory] = useState('');
  const [favouriteMoment, setFavouriteMoment] = useState('');
  const [latitude, setLatitude] = useState<number | string>(23.8103);
  const [longitude, setLongitude] = useState<number | string>(90.4125);

  // Multi-Image Upload State
  const [uploadedPhotos, setUploadedPhotos] = useState<CompressedImage[]>([]);
  const [coverPhotoIndex, setCoverPhotoIndex] = useState<number>(0);
  const [isCompressing, setIsCompressing] = useState(false);
  const [compressStatus, setCompressStatus] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadStatusText, setUploadStatusText] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // External URL input state
  const [externalUrl, setExternalUrl] = useState('');
  const [showUrlInput, setShowUrlInput] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Update activeTab when initialTab or isOpen changes
  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab, isOpen]);

  // Load visitor messages
  const loadMessages = async () => {
    setIsLoadingMessages(true);
    try {
      const data = await fetchContactMessages();
      setMessages(data);
    } catch (err) {
      console.warn('Could not fetch messages:', err);
    } finally {
      setIsLoadingMessages(false);
    }
  };

  useEffect(() => {
    if (isOpen && isAuthenticated) {
      loadMessages();
    }
  }, [isOpen, isAuthenticated, activeTab]);

  const handleDeleteMessage = async (msgId: string) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;
    setDeletingMessageId(msgId);
    try {
      await deleteContactMessage(msgId);
      setMessages((prev) => prev.filter((m) => m.id !== msgId));
    } catch (err) {
      console.warn('Failed to delete message:', err);
    } finally {
      setDeletingMessageId(null);
    }
  };

  const filteredMessages = messages.filter((m) => {
    if (!messageFilter.trim()) return true;
    const q = messageFilter.toLowerCase();
    return (
      m.name.toLowerCase().includes(q) ||
      m.email.toLowerCase().includes(q) ||
      m.message.toLowerCase().includes(q)
    );
  });

  // Synchronize state on modal open or when initialPlace changes
  useEffect(() => {
    if (!isOpen) return;

    if (initialPlace) {
      const locName = (initialPlace as TravelLocation).name || (initialPlace as TravelPlace).location || '';
      setLocation(locName);
      setRegion((initialPlace as TravelLocation).division || (initialPlace as TravelPlace).region || 'Chittagong Division');
      setDate((initialPlace as TravelLocation).visitedDate || (initialPlace as TravelPlace).date || '');
      setStory((initialPlace as TravelLocation).description || (initialPlace as TravelPlace).story || '');
      setFavouriteMoment((initialPlace as TravelLocation).favouriteMoment || (initialPlace as TravelLocation).quote || '');
      setLatitude(
        (initialPlace as TravelLocation).latitude ??
        (initialPlace as TravelPlace).coordinates?.latitude ??
        23.8103
      );
      setLongitude(
        (initialPlace as TravelLocation).longitude ??
        (initialPlace as TravelPlace).coordinates?.longitude ??
        90.4125
      );

      const locPhotos = (initialPlace as TravelLocation).photos;
      const placePhotos = (initialPlace as TravelPlace).photos;
      const coverUrl = (initialPlace as TravelLocation).coverImage || (initialPlace as TravelPlace).coverPhoto || (initialPlace as TravelPlace).photo;

      let photoItems: CompressedImage[] = [];
      if (locPhotos && locPhotos.length > 0) {
        photoItems = locPhotos.map((p, idx) => ({
          id: p.id || `photo-${idx}`,
          dataUri: p.url,
          fileName: p.caption || `Photo ${idx + 1}`,
          originalSize: 0,
          compressedSize: 0,
          width: 1200,
          height: 800,
        }));
      } else if (placePhotos && placePhotos.length > 0) {
        photoItems = placePhotos.map((url, idx) => ({
          id: `photo-${idx}`,
          dataUri: url,
          fileName: `Photo ${idx + 1}`,
          originalSize: 0,
          compressedSize: 0,
          width: 1200,
          height: 800,
        }));
      }

      setUploadedPhotos(photoItems);
      const coverIdx = photoItems.findIndex((p) => p.dataUri === coverUrl);
      setCoverPhotoIndex(coverIdx >= 0 ? coverIdx : 0);
    } else {
      setLocation('');
      setRegion('Chittagong Division');
      setDate('');
      setStory('');
      setFavouriteMoment('');
      setLatitude(23.8103);
      setLongitude(90.4125);
      setUploadedPhotos([]);
      setCoverPhotoIndex(0);
    }

    setFormSuccess(false);
    setIsSubmitting(false);
    setUploadStatusText('');
    setShowDeleteConfirm(false);
    setIsDeleting(false);
  }, [isOpen, initialPlace]);

  // Handle Drag & Drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files).filter((f) => f.type.startsWith('image/'));
    if (files.length > 0) {
      await processFiles(files);
    }
  };

  // Handle File Input Change
  const handleFileInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (files.length > 0) {
      await processFiles(files);
    }
    // Reset file input so same file can be re-selected if needed
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Process and compress image files
  const processFiles = async (files: File[]) => {
    setIsCompressing(true);
    setCompressStatus(`Optimizing 0 of ${files.length} photos...`);

    try {
      const compressed = await compressImages(
        files,
        { maxWidth: 1600, maxHeight: 1600, quality: 0.82 },
        (completed, total, currentName) => {
          setCompressStatus(`Optimizing ${completed}/${total}: ${currentName}`);
        }
      );

      setUploadedPhotos((prev) => [...prev, ...compressed]);
    } catch (err) {
      console.error('Error compressing files:', err);
    } finally {
      setIsCompressing(false);
      setCompressStatus('');
    }
  };

  // Add external URL image
  const handleAddExternalUrl = () => {
    if (!externalUrl.trim()) return;
    const newImg: CompressedImage = {
      id: `url-${Date.now()}`,
      dataUri: externalUrl.trim(),
      fileName: 'External Web Image',
      originalSize: 0,
      compressedSize: 0,
      width: 1200,
      height: 800,
    };
    setUploadedPhotos((prev) => [...prev, newImg]);
    setExternalUrl('');
    setShowUrlInput(false);
  };

  // Remove photo
  const handleRemovePhoto = (indexToRemove: number) => {
    setUploadedPhotos((prev) => {
      const next = prev.filter((_, idx) => idx !== indexToRemove);
      if (coverPhotoIndex >= next.length) {
        setCoverPhotoIndex(Math.max(0, next.length - 1));
      } else if (coverPhotoIndex === indexToRemove) {
        setCoverPhotoIndex(0);
      }
      return next;
    });
  };

  // Set Cover Photo
  const handleSetCover = (idx: number) => {
    setCoverPhotoIndex(idx);
  };

  // Apply Bangladesh geographic preset
  const handleApplyPreset = (preset: typeof BANGLADESH_PRESETS[0]) => {
    setLocation(preset.name);
    setRegion(preset.region);
    setLatitude(preset.lat);
    setLongitude(preset.lng);
  };

  // Handle Admin Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const adminPassword = (import.meta.env.VITE_ADMIN_PASSWORD || 'hasan2026').trim();
    const enteredPassword = password.trim();

    const isMatch =
      enteredPassword === adminPassword ||
      enteredPassword.toLowerCase() === adminPassword.toLowerCase();

    if (isMatch) {
      onAuthenticate();
      setAuthError('');
      setPassword('');
      setShowPassword(false);
    } else {
      setAuthError('Incorrect admin password.');
    }
  };

  // Delete entire expedition
  const handleDeletePlace = async () => {
    if (!initialPlace) return;
    setIsDeleting(true);
    try {
      if (isSupabaseConfigured) {
        await deleteLocationFromSupabase(initialPlace.id);
      }
      onDeletePlace?.(initialPlace.id);
      onClose();
    } catch (err) {
      console.error('Error deleting place:', err);
      onDeletePlace?.(initialPlace.id);
      onClose();
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  // Handle Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!location.trim() || !story.trim()) {
      alert('Please fill in the destination location name and travel story.');
      return;
    }

    if (uploadedPhotos.length === 0) {
      alert('Please upload at least 1 photograph for this destination.');
      return;
    }

    setIsSubmitting(true);
    setUploadStatusText('Preparing destination photos...');

    const targetId = initialPlace ? initialPlace.id : `custom-${Date.now()}`;
    const finalPhotoUrls: Array<{ url: string; caption?: string }> = [];
    const retainedUrls: string[] = [];
    const newPhotosToInsert: Array<{ url: string; caption?: string }> = [];

    try {
      if (isSupabaseConfigured) {
        for (let i = 0; i < uploadedPhotos.length; i++) {
          const photo = uploadedPhotos[i];

          if (photo.dataUri.startsWith('data:')) {
            // Newly dropped/selected image that needs uploading
            setUploadStatusText(`Uploading photo ${i + 1} of ${uploadedPhotos.length} to cloud storage...`);
            try {
              const res = await fetch(photo.dataUri);
              const blob = await res.blob();
              const uploadRes = await uploadPhotoToStorage(blob, targetId, photo.fileName);
              if (uploadRes?.url) {
                finalPhotoUrls.push({ url: uploadRes.url, caption: location.trim() });
                newPhotosToInsert.push({ url: uploadRes.url, caption: location.trim() });
              } else {
                finalPhotoUrls.push({ url: photo.dataUri, caption: location.trim() });
              }
            } catch (upErr) {
              console.warn('Individual photo upload fallback:', upErr);
              finalPhotoUrls.push({ url: photo.dataUri, caption: location.trim() });
            }
          } else {
            // Retained existing photo URL
            finalPhotoUrls.push({ url: photo.dataUri, caption: photo.fileName || location.trim() });
            retainedUrls.push(photo.dataUri);
          }
        }

        setUploadStatusText('Saving expedition record to database...');

        if (isEditing) {
          // Remove deleted photos, insert newly uploaded ones
          await syncLocationPhotosInSupabase(targetId, retainedUrls, newPhotosToInsert);
          await saveLocationToSupabase(
            {
              id: targetId,
              name: location.trim(),
              division: region,
              district: region,
              country: 'Bangladesh',
              latitude: parseFloat(String(latitude)) || 23.8103,
              longitude: parseFloat(String(longitude)) || 90.4125,
              coverImage: finalPhotoUrls[coverPhotoIndex]?.url || finalPhotoUrls[0]?.url,
              description: story.trim(),
              quote: favouriteMoment.trim() || story.slice(0, 80) + '...',
              favouriteMoment: favouriteMoment.trim() || story.slice(0, 80) + '...',
              visitedDate: date.trim() || 'Recently Visited',
            },
            [] // photos already synced
          );
        } else {
          await saveLocationToSupabase(
            {
              id: targetId,
              name: location.trim(),
              division: region,
              district: region,
              country: 'Bangladesh',
              latitude: parseFloat(String(latitude)) || 23.8103,
              longitude: parseFloat(String(longitude)) || 90.4125,
              coverImage: finalPhotoUrls[coverPhotoIndex]?.url || finalPhotoUrls[0]?.url,
              description: story.trim(),
              quote: favouriteMoment.trim() || story.slice(0, 80) + '...',
              favouriteMoment: favouriteMoment.trim() || story.slice(0, 80) + '...',
              visitedDate: date.trim() || 'Recently Visited',
            },
            finalPhotoUrls
          );
        }
      } else {
        uploadedPhotos.forEach((p) => {
          finalPhotoUrls.push({ url: p.dataUri, caption: location.trim() });
        });
      }

      const photoList = finalPhotoUrls.map((p) => p.url);
      const coverPhoto = photoList[coverPhotoIndex] || photoList[0];

      const resultPlace: TravelPlace = {
        id: targetId,
        location: location.trim(),
        region,
        date: date.trim() || 'Recently Visited',
        coverPhoto,
        photo: coverPhoto,
        photos: photoList,
        story: story.trim(),
        favouriteMoment: favouriteMoment.trim() || story.slice(0, 80) + '...',
        coordinates: {
          latitude: parseFloat(String(latitude)) || 23.8103,
          longitude: parseFloat(String(longitude)) || 90.4125,
        },
      };

      if (isEditing && onUpdatePlace) {
        onUpdatePlace(resultPlace);
      } else {
        onAddPlace(resultPlace);
      }

      setFormSuccess(true);

      setTimeout(() => {
        setFormSuccess(false);
        setIsSubmitting(false);
        setUploadStatusText('');
        onClose();
      }, 1300);
    } catch (err) {
      console.error('Error during destination submission:', err);
      // Graceful local fallback
      const fallbackList = uploadedPhotos.map((p) => p.dataUri);
      const fallbackCover = fallbackList[coverPhotoIndex] || fallbackList[0];
      const fallbackPlace: TravelPlace = {
        id: targetId,
        location: location.trim(),
        region,
        date: date.trim() || 'Recently Visited',
        coverPhoto: fallbackCover,
        photo: fallbackCover,
        photos: fallbackList,
        story: story.trim(),
        favouriteMoment: favouriteMoment.trim() || story.slice(0, 80) + '...',
        coordinates: {
          latitude: parseFloat(String(latitude)) || 23.8103,
          longitude: parseFloat(String(longitude)) || 90.4125,
        },
      };

      if (isEditing && onUpdatePlace) {
        onUpdatePlace(fallbackPlace);
      } else {
        onAddPlace(fallbackPlace);
      }

      setFormSuccess(true);
      setTimeout(() => {
        setFormSuccess(false);
        setIsSubmitting(false);
        setUploadStatusText('');
        onClose();
      }, 1300);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-bg-primary/90 backdrop-blur-md">
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-3xl bg-bg-surface border border-border-subtle p-5 sm:p-8 shadow-2xl space-y-6"
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
            {activeTab === 'messages' ? (
              <Inbox className="h-5 w-5" />
            ) : isEditing ? (
              <Edit3 className="h-5 w-5" />
            ) : (
              <Lock className="h-5 w-5" />
            )}
          </div>
          <div>
            <span className="text-[10px] font-mono text-accent-gold uppercase tracking-widest block">
              {activeTab === 'messages'
                ? 'PORTFOLIO ADMIN // VISITOR INBOX'
                : `EXPEDITION LOG MANAGER // ${isEditing ? 'EDIT MODE' : 'ADMIN'}`}
            </span>
            <h3 className="text-xl font-display font-extrabold text-text-primary">
              {isAuthenticated
                ? activeTab === 'messages'
                  ? 'Visitor Messages & Inquiries'
                  : isEditing
                  ? 'Edit Expedition & Manage Photos'
                  : 'Add Travel Destination & Photos'
                : 'Admin Authentication'}
            </h3>
          </div>
        </div>

        {/* Navigation Tabs (when authenticated) */}
        {isAuthenticated && (
          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-bg-card border border-border-subtle">
            <button
              type="button"
              onClick={() => setActiveTab('expeditions')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-mono font-medium transition-all ${
                activeTab === 'expeditions'
                  ? 'bg-accent-amber text-bg-primary font-bold shadow-md shadow-accent-amber/20'
                  : 'text-text-secondary hover:text-text-primary hover:bg-bg-surface'
              }`}
            >
              <MapPin className="h-3.5 w-3.5" />
              <span>Expeditions & Map</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('messages');
                loadMessages();
              }}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-mono font-medium transition-all ${
                activeTab === 'messages'
                  ? 'bg-accent-amber text-bg-primary font-bold shadow-md shadow-accent-amber/20'
                  : 'text-text-secondary hover:text-text-primary hover:bg-bg-surface'
              }`}
            >
              <Inbox className="h-3.5 w-3.5" />
              <span>Visitor Messages</span>
              {messages.length > 0 && (
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    activeTab === 'messages'
                      ? 'bg-bg-primary text-accent-amber'
                      : 'bg-accent-amber/20 text-accent-amber'
                  }`}
                >
                  {messages.length}
                </span>
              )}
            </button>
          </div>
        )}

        {/* LOGIN FORM IF NOT AUTHENTICATED */}
        {!isAuthenticated ? (
          <form onSubmit={handleLogin} className="space-y-5 py-3">
            <p className="text-xs font-mono text-text-secondary leading-relaxed">
              Log in with your administrator key to upload high-resolution travel photos and pin new geographic coordinates to the interactive map.
            </p>

            <div className="space-y-2">
              <label className="text-xs font-mono text-accent-gold block">
                ADMIN PASSWORD
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (authError) setAuthError('');
                  }}
                  placeholder="Enter admin password"
                  className="w-full pl-4 pr-11 py-3 rounded-xl bg-bg-card border border-border-subtle text-text-primary text-sm focus:border-accent-amber focus:outline-none transition-colors"
                  autoFocus
                  autoCapitalize="none"
                  autoCorrect="off"
                  spellCheck={false}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-text-secondary hover:text-accent-gold transition-colors focus:outline-none"
                  title={showPassword ? 'Hide password' : 'Show password'}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
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
        ) : activeTab === 'messages' ? (
          /* VISITOR MESSAGES VIEW */
          <div className="space-y-4 py-1">
            {/* Search & Refresh Toolbar */}
            <div className="flex items-center justify-between gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-stone" />
                <input
                  type="text"
                  value={messageFilter}
                  onChange={(e) => setMessageFilter(e.target.value)}
                  placeholder="Filter inquiries by name, email, or message..."
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-bg-card border border-border-subtle text-xs font-mono text-text-primary placeholder:text-stone focus:border-accent-amber focus:outline-none transition-colors"
                />
              </div>
              <button
                type="button"
                onClick={loadMessages}
                disabled={isLoadingMessages}
                className="p-2.5 rounded-xl bg-bg-card border border-border-subtle text-text-secondary hover:text-accent-amber hover:border-accent-amber/40 transition-colors disabled:opacity-50"
                title="Refresh messages"
              >
                <RefreshCw className={`h-4 w-4 ${isLoadingMessages ? 'animate-spin' : ''}`} />
              </button>
            </div>

            {/* List of Messages */}
            {isLoadingMessages ? (
              <div className="py-16 text-center space-y-3">
                <Loader2 className="h-6 w-6 animate-spin mx-auto text-accent-amber" />
                <p className="text-xs font-mono text-text-secondary">Loading visitor messages...</p>
              </div>
            ) : filteredMessages.length === 0 ? (
              <div className="py-14 text-center space-y-3 rounded-2xl bg-bg-card/50 border border-border-subtle p-6">
                <div className="mx-auto w-12 h-12 rounded-2xl bg-accent-amber/10 border border-accent-amber/20 text-accent-amber flex items-center justify-center">
                  <Mail className="h-6 w-6" />
                </div>
                <h4 className="text-sm font-display font-semibold text-text-primary">
                  {messageFilter ? 'No matching messages found' : 'No Visitor Inquiries Yet'}
                </h4>
                <p className="text-xs font-mono text-text-muted max-w-sm mx-auto">
                  {messageFilter
                    ? 'Try clearing the search filter.'
                    : `Any message submitted through the Contact form will appear here and route to ${personalInfo.socials.email}.`}
                </p>
              </div>
            ) : (
              <div className="space-y-3 max-h-[55vh] overflow-y-auto pr-1">
                {filteredMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className="p-4 sm:p-5 rounded-2xl bg-bg-card border border-border-subtle hover:border-accent-amber/30 transition-all space-y-3 shadow-md"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border-subtle/50 pb-2.5">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-display font-semibold text-sm text-text-primary">
                            {msg.name}
                          </span>
                          <span className="text-[10px] font-mono text-accent-amber bg-accent-amber/10 px-2 py-0.5 rounded-full border border-accent-amber/20">
                            {new Date(msg.created_at).toLocaleDateString(undefined, {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                        </div>
                        <a
                          href={`mailto:${msg.email}`}
                          className="text-xs font-mono text-text-secondary hover:text-accent-gold transition-colors block"
                        >
                          {msg.email}
                        </a>
                      </div>

                      <div className="flex items-center gap-2">
                        <a
                          href={`mailto:${msg.email}?subject=Re: Message from Mehedi Hasan Portfolio&body=Hi ${encodeURIComponent(
                            msg.name
                          )},%0D%0A%0D%0AThank you for reaching out via my portfolio!%0D%0A%0D%0A`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent-amber text-bg-primary text-[11px] font-mono font-bold hover:bg-accent-gold transition-colors"
                        >
                          <Reply className="h-3 w-3" /> Reply
                        </a>
                        <button
                          type="button"
                          onClick={() => handleDeleteMessage(msg.id)}
                          disabled={deletingMessageId === msg.id}
                          className="p-1.5 rounded-lg text-stone hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                          title="Delete message"
                        >
                          {deletingMessageId === msg.id ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          ) : (
                            <Trash2 className="h-3.5 w-3.5" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-bg-surface border border-border-subtle/50">
                      <p className="text-xs text-text-primary font-sans leading-relaxed whitespace-pre-wrap">
                        {msg.message}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="p-3 rounded-xl bg-bg-card/70 border border-border-subtle text-[11px] font-mono text-text-muted flex items-center gap-2">
              <Mail className="h-3.5 w-3.5 text-accent-gold shrink-0" />
              <span>
                All inquiries are also forwarded to <strong className="text-text-primary">{personalInfo.socials.email}</strong>.
              </span>
            </div>
          </div>
        ) : (
          /* ADD DESTINATION & PHOTO UPLOAD FORM */
          <form onSubmit={handleSubmit} className="space-y-5">
            {formSuccess ? (
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
                <div className="p-4 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400">
                  <Check className="h-8 w-8" />
                </div>
                <h4 className="text-xl font-display font-bold text-text-primary">
                  Destination & Photos Saved!
                </h4>
                <p className="text-xs font-mono text-text-muted">
                  Your new expedition is now pinned on the Bangladesh Satellite Map and showcased in the photo studio.
                </p>
              </div>
            ) : (
              <>
                {/* ── 1. Bangladesh Geographic Presets ── */}
                <div className="space-y-2 p-3 rounded-2xl bg-bg-card/70 border border-border-subtle">
                  <div className="flex items-center gap-2 text-[10px] font-mono text-accent-gold uppercase tracking-wider">
                    <Sparkles className="h-3.5 w-3.5 text-accent-amber" />
                    <span>Quick Autofill Presets (Click to autofill coordinates)</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {BANGLADESH_PRESETS.map((preset) => (
                      <button
                        type="button"
                        key={preset.name}
                        onClick={() => handleApplyPreset(preset)}
                        className={`text-[10px] font-mono px-2.5 py-1 rounded-lg border transition-all ${
                          location === preset.name
                            ? 'bg-accent-amber text-bg-primary border-accent-amber font-semibold'
                            : 'bg-bg-surface text-text-secondary border-border-subtle hover:border-accent-amber/50 hover:text-accent-gold'
                        }`}
                      >
                        {preset.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* ── 2. Location & Division ── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-accent-gold">
                      DIVISION / REGION *
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

                {/* ── 3. Date & Coordinates ── */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-accent-gold">
                      DATE / SEASON
                    </label>
                    <input
                      type="text"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      placeholder="e.g. November 2025"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-bg-card border border-border-subtle text-text-primary text-xs focus:border-accent-amber focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-accent-gold">
                      LATITUDE (°N) *
                    </label>
                    <input
                      type="number"
                      step="0.0001"
                      required
                      value={latitude}
                      onChange={(e) => setLatitude(e.target.value)}
                      placeholder="23.8103"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-bg-card border border-border-subtle text-text-primary text-xs font-mono focus:border-accent-amber focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-accent-gold">
                      LONGITUDE (°E) *
                    </label>
                    <input
                      type="number"
                      step="0.0001"
                      required
                      value={longitude}
                      onChange={(e) => setLongitude(e.target.value)}
                      placeholder="90.4125"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-bg-card border border-border-subtle text-text-primary text-xs font-mono focus:border-accent-amber focus:outline-none"
                    />
                  </div>
                </div>

                {/* ── 4. MULTI-PHOTO UPLOAD & MANAGEMENT ── */}
                <div className="space-y-3 p-4 rounded-2xl bg-bg-card border border-border-subtle">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-[11px] font-mono text-accent-gold uppercase tracking-wider block">
                        PHOTOGRAPHY UPLOAD &amp; ASSETS *
                      </label>
                      <span className="text-[10px] font-mono text-text-muted">
                        Select multiple photos from device. Automatically compressed for ultra-fast loading.
                      </span>
                    </div>
                    {uploadedPhotos.length > 0 && (
                      <span className="text-[11px] font-mono text-accent-gold bg-accent-amber/10 px-2.5 py-1 rounded-full border border-accent-amber/30">
                        {uploadedPhotos.length} {uploadedPhotos.length === 1 ? 'photo' : 'photos'} ready
                      </span>
                    )}
                  </div>

                  {/* Drag & Drop File Zone */}
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`relative flex flex-col items-center justify-center p-6 rounded-2xl border-2 border-dashed cursor-pointer transition-all ${
                      isDragging
                        ? 'border-accent-amber bg-accent-amber/10 scale-[0.99]'
                        : 'border-accent-amber/40 hover:border-accent-amber bg-bg-surface/50 hover:bg-bg-surface'
                    }`}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleFileInputChange}
                      className="hidden"
                    />

                    {isCompressing ? (
                      <div className="flex flex-col items-center gap-2 text-center py-2">
                        <Loader2 className="h-7 w-7 text-accent-amber animate-spin" />
                        <span className="text-xs font-mono text-accent-gold">
                          {compressStatus || 'Optimizing photographs...'}
                        </span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2 text-center">
                        <div className="p-3 rounded-full bg-accent-amber/10 text-accent-amber">
                          <Upload className="h-6 w-6" />
                        </div>
                        <div>
                          <p className="text-xs font-display font-medium text-text-primary">
                            Drop photos here or <span className="text-accent-amber underline">browse device</span>
                          </p>
                          <p className="text-[10px] font-mono text-text-muted mt-0.5">
                            Supports multi-select JPG, PNG, WEBP · Auto-compressed to HD WebP/JPEG
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Optional External Image URL Toggle */}
                  <div className="pt-1">
                    {!showUrlInput ? (
                      <button
                        type="button"
                        onClick={() => setShowUrlInput(true)}
                        className="text-[10px] font-mono text-text-muted hover:text-accent-gold flex items-center gap-1 transition-colors"
                      >
                        <Link2 className="h-3 w-3" />
                        <span>Or attach an external image link / URL</span>
                      </button>
                    ) : (
                      <div className="flex items-center gap-2">
                        <input
                          type="url"
                          value={externalUrl}
                          onChange={(e) => setExternalUrl(e.target.value)}
                          placeholder="https://images.unsplash.com/photo-..."
                          className="flex-1 px-3 py-1.5 rounded-lg bg-bg-surface border border-border-subtle text-text-primary text-xs font-mono focus:border-accent-amber focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={handleAddExternalUrl}
                          className="px-3 py-1.5 rounded-lg bg-accent-amber text-bg-primary text-xs font-mono font-bold hover:bg-accent-gold transition-colors"
                        >
                          Add URL
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowUrlInput(false)}
                          className="p-1.5 text-text-muted hover:text-text-primary"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* ── UPLOADED PHOTOS REEL / MANAGER ── */}
                  {uploadedPhotos.length > 0 && (
                    <div className="space-y-2 pt-2 border-t border-border-subtle/80">
                      <div className="flex items-center justify-between text-[10px] font-mono text-text-muted">
                        <span>ATTACHED EXPEDITION FRAMES ({uploadedPhotos.length})</span>
                        <button
                          type="button"
                          onClick={() => setUploadedPhotos([])}
                          className="text-rose-400 hover:text-rose-300 transition-colors"
                        >
                          Clear all
                        </button>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-48 overflow-y-auto pr-1">
                        {uploadedPhotos.map((photo, idx) => {
                          const isCover = idx === coverPhotoIndex;
                          return (
                            <div
                              key={photo.id}
                              className={`relative group rounded-xl overflow-hidden border transition-all ${
                                isCover
                                  ? 'border-accent-amber ring-2 ring-accent-amber/30'
                                  : 'border-border-subtle hover:border-white/30'
                              }`}
                            >
                              <img
                                src={photo.dataUri}
                                alt={`Frame ${idx + 1}`}
                                className="w-full h-24 object-cover"
                              />

                              {/* Cover Badge */}
                              {isCover ? (
                                <span className="absolute top-1.5 left-1.5 flex items-center gap-1 bg-accent-amber text-bg-primary text-[9px] font-mono font-bold px-1.5 py-0.5 rounded shadow">
                                  <Star className="h-2.5 w-2.5 fill-current" /> COVER
                                </span>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => handleSetCover(idx)}
                                  className="absolute top-1.5 left-1.5 opacity-0 group-hover:opacity-100 bg-bg-primary/80 backdrop-blur-sm text-text-secondary hover:text-accent-gold text-[9px] font-mono px-1.5 py-0.5 rounded transition-all"
                                >
                                  Make Cover
                                </button>
                              )}

                              {/* Size badge */}
                              {photo.compressedSize > 0 && (
                                <span className="absolute bottom-1.5 left-1.5 bg-bg-primary/80 text-[8px] font-mono text-text-muted px-1.5 py-0.5 rounded">
                                  {formatFileSize(photo.compressedSize)}
                                </span>
                              )}

                              {/* Delete Photo Button */}
                              <button
                                type="button"
                                onClick={() => handleRemovePhoto(idx)}
                                className="absolute top-1.5 right-1.5 p-1 rounded-md bg-bg-primary/80 text-rose-400 hover:bg-rose-500 hover:text-white transition-all opacity-80 hover:opacity-100"
                                title="Remove photo"
                              >
                                <Trash2 className="h-3 w-3" />
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {/* ── 5. Travel Story & Highlights ── */}
                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-accent-gold">
                    TRAVEL STORY &amp; EXPEDITION LOG *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={story}
                    onChange={(e) => setStory(e.target.value)}
                    placeholder="Describe your journey, landscape view, feelings, climate or hike..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-bg-card border border-border-subtle text-text-primary text-xs focus:border-accent-amber focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-accent-gold">
                    FAVOURITE MOMENT (HIGHLIGHT QUOTE)
                  </label>
                  <input
                    type="text"
                    value={favouriteMoment}
                    onChange={(e) => setFavouriteMoment(e.target.value)}
                    placeholder="e.g. Standing on the mountain ridgeline as clouds rolled across the valley at dawn"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-bg-card border border-border-subtle text-text-primary text-xs focus:border-accent-amber focus:outline-none"
                  />
                </div>

                {/* ── 6. Submit Button ── */}
                <button
                  type="submit"
                  disabled={isCompressing || isSubmitting}
                  className="w-full py-3.5 bg-accent-amber text-bg-primary rounded-xl font-display font-extrabold text-xs tracking-wider hover:bg-accent-gold transition-all duration-300 shadow-lg shadow-accent-amber/20 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>{uploadStatusText || 'SAVING EXPEDITION...'}</span>
                    </>
                  ) : isEditing ? (
                    <>
                      <Check className="h-4 w-4" />
                      <span>SAVE CHANGES &amp; UPDATE PHOTOS</span>
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4" />
                      <span>PIN DESTINATION &amp; PUBLISH PHOTOS</span>
                    </>
                  )}
                </button>

                {/* ── 7. Danger Zone: Delete Entire Expedition ── */}
                {isEditing && onDeletePlace && (
                  <div className="pt-2 border-t border-rose-500/20">
                    {!showDeleteConfirm ? (
                      <button
                        type="button"
                        onClick={() => setShowDeleteConfirm(true)}
                        className="w-full py-2.5 rounded-xl border border-rose-500/30 hover:bg-rose-500/10 text-rose-400 hover:text-rose-300 text-xs font-mono transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        <span>Delete this expedition &amp; all its photos</span>
                      </button>
                    ) : (
                      <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 space-y-2">
                        <p className="text-[11px] font-mono text-rose-300">
                          ⚠️ Are you sure you want to permanently delete this expedition and all its photos?
                        </p>
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => setShowDeleteConfirm(false)}
                            className="px-3 py-1.5 rounded-lg border border-border-subtle hover:bg-white/5 text-stone text-xs font-mono"
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            disabled={isDeleting}
                            onClick={handleDeletePlace}
                            className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-500 text-white font-mono font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5 disabled:opacity-50"
                          >
                            {isDeleting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
                            <span>Confirm Delete</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </form>
        )}
      </motion.div>
    </div>
  );
};
