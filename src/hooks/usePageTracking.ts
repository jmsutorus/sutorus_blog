"use client"

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { addRecentPage } from '@/lib/search/recentPages';
import { SearchItem } from '@/lib/search/getSearchIndex';

/**
 * Hook to track page visits and add them to recent pages
 */
export function usePageTracking(searchIndex: SearchItem[]) {
  const pathname = usePathname();

  useEffect(() => {
    // Skip tracking for certain paths
    if (!pathname || pathname === '/404' || pathname === '/_not-found') {
      return;
    }

    // Find the page in the search index to get metadata
    const matchingItem = searchIndex.find(item => {
      // Exact match
      if (item.url === pathname) {
        return true;
      }

      // Handle trailing slashes
      if (item.url === pathname.replace(/\/$/, '') || item.url + '/' === pathname) {
        return true;
      }

      return false;
    });

    if (matchingItem) {
      // Track the visit with metadata from search index
      addRecentPage({
        url: matchingItem.url,
        title: matchingItem.title,
        type: matchingItem.type,
        description: matchingItem.description,
      });
    } else {
      // Fallback for pages not in search index
      // Try to extract a readable title from the pathname
      const segments = pathname.split('/').filter(Boolean);

      if (segments.length > 0) {
        const lastSegment = segments[segments.length - 1];
        const title = lastSegment
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');

        addRecentPage({
          url: pathname,
          title: title,
          type: 'page',
          description: undefined,
        });
      }
    }
  }, [pathname, searchIndex]);
}
