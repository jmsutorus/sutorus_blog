/**
 * Wedding Page Type Definitions
 *
 * These types define the structure for the wedding celebration page data.
 */

/**
 * Represents a single image with metadata
 */
export interface WeddingImage {
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
 * Represents a story section with optional image
 */
export interface WeddingStorySection {
  /** Story text content (supports paragraphs with \n\n) */
  content: string;
  /** Optional image to accompany the story */
  image?: WeddingImage;
  /** Position of image relative to text (default: 'left') */
  imagePosition?: 'left' | 'right';
}

/**
 * Represents the hero section data
 */
export interface WeddingHero {
  /** Main title (e.g., "Our Wedding Day") */
  title: string;
  /** Couple's names (e.g., "Joseph & Partner") */
  names: string;
  /** Wedding date (e.g., "October 31, 2025") */
  date: string;
  /** Wedding location (e.g., "City, State") */
  location: string;
  /** Hero background image */
  image: WeddingImage;
  /** Optional mobile-specific hero background image */
  mobileImage?: WeddingImage;
}

/**
 * Optional metadata about the wedding
 */
export interface WeddingMetadata {
  /** Name of the photographer */
  photographer?: string;
  /** Name of the wedding venue */
  venue?: string;
}

/**
 * Complete wedding page data structure
 */
export interface WeddingData {
  /** Hero section with main image and details */
  hero: WeddingHero;
  /** Array of story sections with optional images */
  story: WeddingStorySection[];
  /** Gallery of wedding photos */
  gallery: WeddingImage[];
  /** Additional metadata */
  metadata: WeddingMetadata;
}
