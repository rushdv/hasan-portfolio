/**
 * Client-Side Image Compression & Optimization Utility
 * 
 * Compresses camera/smartphone photos (often 4MB - 15MB) into lightweight,
 * high-definition WebP/JPEG data URIs (~100KB - 250KB) before saving to local
 * client storage or dispatching to cloud storage (Supabase/Cloudinary).
 */

export interface CompressOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number; // 0.1 to 1.0
  format?: 'image/jpeg' | 'image/webp';
}

export interface CompressedImage {
  id: string;
  dataUri: string;
  fileName: string;
  originalSize: number;
  compressedSize: number;
  width: number;
  height: number;
}

/**
 * Format raw byte count into human-readable string (KB/MB)
 */
export function formatFileSize(bytes: number): string {
  if (bytes <= 0) return '0 B';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/**
 * Compress a single image file via HTML5 Canvas
 */
export async function compressImage(
  file: File,
  options: CompressOptions = {}
): Promise<CompressedImage> {
  const {
    maxWidth = 1600,
    maxHeight = 1600,
    quality = 0.82,
    format = 'image/jpeg',
  } = options;

  return new Promise((resolve, reject) => {
    // Check if the file is an image
    if (!file.type.startsWith('image/')) {
      return reject(new Error(`File ${file.name} is not a valid image format.`));
    }

    const objectUrl = URL.createObjectURL(file);
    const img = new Image();

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);

      let { width, height } = img;

      // Calculate constrained dimensions while maintaining aspect ratio
      if (width > maxWidth || height > maxHeight) {
        const ratio = Math.min(maxWidth / width, maxHeight / height);
        width = Math.round(width * ratio);
        height = Math.round(height * ratio);
      }

      // Render image onto offscreen canvas
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        return reject(new Error('Failed to create canvas 2D rendering context.'));
      }

      // High quality bicubic smoothing
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, width, height);

      // Convert to compressed Data URI
      const dataUri = canvas.toDataURL(format, quality);

      // Approximate byte size of base64
      // Base64 size formula: (stringLength - headerLength) * 0.75
      const base64Content = dataUri.split(',')[1] || '';
      const compressedSize = Math.round(base64Content.length * 0.75);

      resolve({
        id: `img-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        dataUri,
        fileName: file.name,
        originalSize: file.size,
        compressedSize,
        width,
        height,
      });
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error(`Could not load or decode image file: ${file.name}`));
    };

    img.src = objectUrl;
  });
}

/**
 * Batch compress multiple image files with optional progress callback
 */
export async function compressImages(
  files: File[],
  options: CompressOptions = {},
  onProgress?: (completed: number, total: number, currentName: string) => void
): Promise<CompressedImage[]> {
  const results: CompressedImage[] = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    onProgress?.(i + 1, files.length, file.name);
    try {
      const compressed = await compressImage(file, options);
      results.push(compressed);
    } catch (err) {
      console.warn(`[ImageCompressor] Skipped invalid image: ${file.name}`, err);
    }
  }

  return results;
}
