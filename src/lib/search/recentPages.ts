/**
 * Utility functions for managing recent pages in localStorage
 */

export interface RecentPage {
  url: string;
  title: string;
  type: 'review' | 'trip' | 'wedding' | 'page';
  description?: string;
  visitedAt: number;
}

const STORAGE_KEY = 'recentPages';
const MAX_RECENT_PAGES = 5;
const MAX_AGE_DAYS = 30;

/**
 * Check if localStorage is available
 */
function isLocalStorageAvailable(): boolean {
  try {
    const test = '__localStorage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Get recent pages from localStorage
 */
export function getRecentPages(): RecentPage[] {
  if (!isLocalStorageAvailable()) {
    return [];
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return [];
    }

    const pages: RecentPage[] = JSON.parse(stored);

    // Clean up old pages
    const cleaned = cleanupOldPages(pages);

    // Sort by most recent first
    return cleaned.sort((a, b) => b.visitedAt - a.visitedAt);
  } catch (error) {
    console.error('Error loading recent pages:', error);
    return [];
  }
}

/**
 * Add or update a recent page visit
 */
export function addRecentPage(page: Omit<RecentPage, 'visitedAt'>): void {
  if (!isLocalStorageAvailable()) {
    return;
  }

  try {
    const existing = getRecentPages();

    // Remove existing entry for this URL if it exists
    const filtered = existing.filter(p => p.url !== page.url);

    // Add new entry at the beginning
    const updated: RecentPage[] = [
      {
        ...page,
        visitedAt: Date.now(),
      },
      ...filtered,
    ];

    // Keep only MAX_RECENT_PAGES
    const trimmed = updated.slice(0, MAX_RECENT_PAGES);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
  } catch (error) {
    console.error('Error saving recent page:', error);
  }
}

/**
 * Remove pages older than MAX_AGE_DAYS
 */
function cleanupOldPages(pages: RecentPage[]): RecentPage[] {
  const maxAge = MAX_AGE_DAYS * 24 * 60 * 60 * 1000; // Convert to milliseconds
  const cutoffTime = Date.now() - maxAge;

  return pages.filter(page => page.visitedAt > cutoffTime);
}

/**
 * Clear all recent pages (for testing or manual clearing)
 */
export function clearRecentPages(): void {
  if (!isLocalStorageAvailable()) {
    return;
  }

  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing recent pages:', error);
  }
}
