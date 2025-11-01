/**
 * TypeScript type definitions for the backpacking blog section
 * Follows the same pattern as wedding.ts for consistency
 */

/**
 * Image type for backpacking photos and trip images
 * Compatible with WeddingImage interface for modal reuse
 */
export interface BackpackingImage {
  url: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
}

/**
 * Trail statistics for a backpacking trip
 */
export interface TripStats {
  distance: string;
  elevation: string;
  difficulty: 'Easy' | 'Moderate' | 'Difficult' | 'Extreme';
  duration: string;
  season: string;
  permits?: string;
  routeUrl?: string;
}

/**
 * Day-by-day itinerary entry for a multi-day trip
 */
export interface DayItinerary {
  day: number;
  title: string;
  distance: string;
  elevation: string;
  highlights: string[];
  description: string;
  images?: BackpackingImage[];
}

/**
 * Complete backpacking trip with all details
 */
export interface BackpackingTrip {
  id: string;
  featured: boolean;
  name: string;
  location: string;
  dates: string;
  hero: BackpackingImage;
  stats: TripStats;
  story: string;
  itinerary: DayItinerary[];
  photos: BackpackingImage[];
  gearHighlights: string[];
  tips: string[];
}

/**
 * Individual gear item for gear showcase
 */
export interface GearItem {
  name: string;
  category: string;
  weight?: string;
  notes?: string;
  link?: string;
  image?: BackpackingImage;
}

/**
 * Complete backpacking page data structure
 * Loaded from public/data/backpacking.json
 */
export interface BackpackingData {
  hero: {
    title: string;
    subtitle: string;
    image: BackpackingImage;
  };
  trips: BackpackingTrip[];
  gear: {
    big3: GearItem[];
    clothing: GearItem[];
    cooking: GearItem[];
    electronics: GearItem[];
  };
}
