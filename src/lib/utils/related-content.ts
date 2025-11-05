/**
 * Related Content Utilities
 *
 * Shared utilities for calculating content similarity and finding related items.
 * Used across posts, trips, and other content types.
 */

/**
 * Calculate relevance score between two sets of tags
 *
 * @param currentTags - Tags from the current item
 * @param itemTags - Tags from the item being compared
 * @returns Number of common tags between the two sets
 *
 * @example
 * ```ts
 * const score = calculateRelevance(['action', 'thriller'], ['action', 'drama']);
 * // Returns 1 (one common tag: 'action')
 * ```
 */
export function calculateRelevance(currentTags: string[], itemTags: string[]): number {
  if (!currentTags || !itemTags) return 0;

  const currentSet = new Set(currentTags.map(tag => tag.toLowerCase()));
  const itemSet = new Set(itemTags.map(tag => tag.toLowerCase()));

  let commonTags = 0;
  itemSet.forEach(tag => {
    if (currentSet.has(tag)) {
      commonTags++;
    }
  });

  return commonTags;
}

/**
 * Get related items based on tag similarity
 *
 * Generic function to find related items based on tags. Falls back to most recent
 * items if no tag matches are found.
 *
 * @param currentItem - The current item to find relations for
 * @param allItems - All available items to search through
 * @param maxItems - Maximum number of related items to return
 * @param idKey - The property name to use as unique identifier (default: 'slug')
 * @returns Array of related items sorted by relevance
 *
 * @example
 * ```ts
 * const related = getRelatedItems(currentPost, allPosts, 3, 'slug');
 * ```
 */
export function getRelatedItems<T extends Record<string, any>>(
  currentItem: T,
  allItems: T[],
  maxItems: number = 3,
  idKey: keyof T = 'slug' as keyof T
): T[] {
  const currentTags = currentItem.tags || [];

  if (!currentTags || currentTags.length === 0) {
    // If no tags, return most recent items excluding current
    return allItems
      .filter(item => item[idKey] !== currentItem[idKey])
      .slice(0, maxItems);
  }

  // Calculate relevance scores
  const itemsWithScores = allItems
    .filter(item => item[idKey] !== currentItem[idKey])
    .map(item => ({
      item,
      score: calculateRelevance(currentTags, item.tags || [])
    }))
    .filter(({ score }) => score > 0) // Only keep items with at least one common tag
    .sort((a, b) => b.score - a.score); // Sort by score descending

  // If we don't have enough related items, fill with other items
  const relatedItems = itemsWithScores.slice(0, maxItems);

  if (relatedItems.length < maxItems) {
    const usedIds = new Set(relatedItems.map(({ item }) => item[idKey]));
    const fillerItems = allItems
      .filter(item => item[idKey] !== currentItem[idKey] && !usedIds.has(item[idKey]))
      .slice(0, maxItems - relatedItems.length);

    return [
      ...relatedItems.map(({ item }) => item),
      ...fillerItems
    ];
  }

  return relatedItems.map(({ item }) => item);
}

/**
 * Check if two strings have similar content (for location/category matching)
 *
 * @param str1 - First string to compare
 * @param str2 - Second string to compare
 * @returns True if strings contain similar content
 */
export function hasSimilarContent(str1: string, str2: string): boolean {
  if (!str1 || !str2) return false;

  const normalized1 = str1.toLowerCase().trim();
  const normalized2 = str2.toLowerCase().trim();

  // Exact match
  if (normalized1 === normalized2) return true;

  // Contains match
  if (normalized1.includes(normalized2) || normalized2.includes(normalized1)) return true;

  // Check if they share common words (for multi-word strings)
  const words1 = new Set(normalized1.split(/[\s,]+/));
  const words2 = new Set(normalized2.split(/[\s,]+/));

  let commonWords = 0;
  words2.forEach(word => {
    if (words1.has(word) && word.length > 2) { // Ignore short words
      commonWords++;
    }
  });

  return commonWords > 0;
}
