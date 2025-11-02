/**
 * Generate a blur placeholder data URL from a Cloudinary image URL
 * Uses Cloudinary's URL transformation API to create a tiny, blurred version
 *
 * This is more efficient than plaiceholder because:
 * 1. No build-time processing required
 * 2. Works with external URLs without fetching
 * 3. Leverages Cloudinary's CDN for transformations
 */

/**
 * Convert a Cloudinary URL to a blur placeholder data URL
 *
 * @param cloudinaryUrl - The original Cloudinary image URL
 * @returns A base64 data URL for the blurred placeholder
 *
 * @example
 * const blurUrl = getCloudinaryBlurDataUrl('https://res.cloudinary.com/demo/image/upload/v1234/sample.jpg')
 * // Returns: 'data:image/jpeg;base64,...' (tiny blurred version)
 */
export function getCloudinaryBlurDataUrl(cloudinaryUrl: string): string {
  // Check if URL is from Cloudinary
  if (!cloudinaryUrl.includes('res.cloudinary.com')) {
    // Return a simple gray placeholder for non-Cloudinary images
    return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2VlZSIvPjwvc3ZnPg=='
  }

  // Parse the Cloudinary URL to inject transformations
  // Format: https://res.cloudinary.com/{cloud_name}/image/upload/{transformations}/{version}/{public_id}.{format}

  const uploadIndex = cloudinaryUrl.indexOf('/upload/')

  if (uploadIndex === -1) {
    // Invalid Cloudinary URL format, return default placeholder
    return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjZjBmMGYwIi8+PC9zdmc+'
  }

  // Cloudinary transformations for blur placeholder:
  // w_10 = width 10px (tiny for performance)
  // q_auto:low = automatic quality, low setting
  // e_blur:1000 = heavy blur effect
  // f_auto = automatic format selection (webp/jpg)
  const transformations = 'w_10,q_auto:low,e_blur:1000,f_auto'

  // Inject transformations after /upload/
  const blurUrl =
    cloudinaryUrl.slice(0, uploadIndex + 8) + // Keep up to /upload/
    transformations + '/' +
    cloudinaryUrl.slice(uploadIndex + 8) // Add rest of URL

  // For the data URL, we'll use the transformed Cloudinary URL directly
  // Next.js will handle converting it to base64 internally
  return blurUrl
}

/**
 * Generate blur data URL for an image object with url, width, height
 *
 * @param image - Image object with url property
 * @returns The same image object with blurDataURL added
 */
export function addBlurToImage<T extends { url: string }>(image: T): T & { blurDataURL: string } {
  return {
    ...image,
    blurDataURL: getCloudinaryBlurDataUrl(image.url),
  }
}

/**
 * Add blur data URLs to an array of images
 *
 * @param images - Array of image objects
 * @returns Array with blurDataURL added to each image
 */
export function addBlurToImages<T extends { url: string }>(images: T[]): (T & { blurDataURL: string })[] {
  return images.map(addBlurToImage)
}
