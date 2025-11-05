/**
 * Backpacking Helper Utilities
 *
 * This module provides helper functions for backpacking trip components,
 * including difficulty badge styling and other trip-related utilities.
 */

import { type VariantProps } from 'class-variance-authority';
import { badgeVariants } from '@/app/_components/badge';

type BadgeVariant = VariantProps<typeof badgeVariants>['variant'];

/**
 * Get Tailwind CSS classes for difficulty badge based on difficulty level.
 *
 * This function returns color classes for custom-styled badges (used in related-trips).
 * Supports both light and dark mode with appropriate color contrasts.
 *
 * @param difficulty - The difficulty level (Easy, Moderate, Difficult, Extreme)
 * @returns Tailwind CSS classes for background and text colors
 *
 * @example
 * ```tsx
 * <Badge className={getDifficultyColor('Moderate')}>
 *   Moderate
 * </Badge>
 * ```
 */
export function getDifficultyColor(difficulty: string): string {
  switch (difficulty.toLowerCase()) {
    case 'easy':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    case 'moderate':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
    case 'difficult':
      return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
    case 'extreme':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
  }
}

/**
 * Get Badge variant for difficulty level.
 *
 * This function returns the appropriate variant for the shadcn Badge component
 * (used in stats-box and trip-preview-card).
 *
 * @param difficulty - The difficulty level (Easy, Moderate, Difficult, Extreme)
 * @returns Badge variant type
 *
 * @example
 * ```tsx
 * <Badge variant={getDifficultyVariant('Difficult')}>
 *   Difficult
 * </Badge>
 * ```
 */
export function getDifficultyVariant(difficulty: string): BadgeVariant {
  switch (difficulty) {
    case 'Easy':
      return 'secondary';
    case 'Moderate':
      return 'default';
    case 'Difficult':
    case 'Extreme':
      return 'destructive';
    default:
      return 'outline';
  }
}

/**
 * Format distance for display.
 *
 * Ensures consistent distance formatting across components.
 *
 * @param distance - Distance string (e.g., "10 miles", "16 km")
 * @returns Formatted distance string
 */
export function formatDistance(distance: string): string {
  return distance.trim();
}

/**
 * Format elevation for display.
 *
 * Ensures consistent elevation formatting across components.
 *
 * @param elevation - Elevation string (e.g., "3,000 ft", "914 m")
 * @returns Formatted elevation string
 */
export function formatElevation(elevation: string): string {
  return elevation.trim();
}

/**
 * Get icon for difficulty level.
 *
 * Returns an appropriate emoji icon for visual representation.
 *
 * @param difficulty - The difficulty level
 * @returns Emoji icon representing the difficulty
 */
export function getDifficultyIcon(difficulty: string): string {
  switch (difficulty.toLowerCase()) {
    case 'easy':
      return '🥾';
    case 'moderate':
      return '⛰️';
    case 'difficult':
      return '🏔️';
    case 'extreme':
      return '🧗';
    default:
      return '🥾';
  }
}
