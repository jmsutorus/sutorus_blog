/**
 * Honeymoon Page Type Definitions
 *
 * These types define the structure for the honeymoon page data.
 */

/**
 * Represents a single image with metadata
 */
export interface HoneymoonImage {
  /** URL to the image file */
  url: string;
  /** Descriptive alt text for accessibility */
  alt: string;
  /** Image width in pixels (prevents CLS) */
  width: number;
  /** Image height in pixels (prevents CLS) */
  height: number;
  /** Optional caption displayed on hover or in modal */
  caption?: string;
  /** Optional blur placeholder data URL for smooth loading */
  blurDataURL?: string;
}

/**
 * Represents a single day of the honeymoon
 */
export interface HoneymoonDay {
  /** The day number (1-7) */
  dayNumber: number;
  /** Title for the day's events */
  title: string;
  /** Story text content (supports paragraphs with \n\n) */
  content: string;
  /** Optional image to accompany the story */
  image?: HoneymoonImage;
  /** Position of image relative to text (default: 'left') */
  imagePosition?: 'left' | 'right';
}

/**
 * Represents the hero section data
 */
export interface HoneymoonHero {
  /** Main title (e.g., "Our Honeymoon") */
  title: string;
  /** Couple's names */
  names: string;
  /** Dates of the honeymoon */
  date: string;
  /** Destination */
  location: string;
  /** Hero background image */
  image: HoneymoonImage;
  /** Optional mobile-specific hero background image */
  mobileImage?: HoneymoonImage;
}

/**
 * Complete honeymoon page data structure
 */
export interface HoneymoonData {
  /** Hero section with main image and details */
  hero: HoneymoonHero;
  /** Array of story sections for each day */
  days: HoneymoonDay[];
  /** Gallery of honeymoon photos */
  gallery: HoneymoonImage[];
}
