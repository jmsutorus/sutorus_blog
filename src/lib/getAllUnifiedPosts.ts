import { getAllPosts } from './api';
import { UnifiedPost } from '@/app/_components/unified-post-card';
import fs from 'fs';
import path from 'path';

interface BackpackingTrip {
  id: string;
  name: string;
  location: string;
  dates: string;
  hero: {
    url: string;
    alt: string;
  };
  stats: {
    difficulty: string;
    distance: string;
  };
}

interface BackpackingData {
  trips: BackpackingTrip[];
}

interface WeddingData {
  hero: {
    title: string;
    date: string;
    location: string;
    image: {
      url: string;
      alt: string;
    };
  };
}

export function getAllUnifiedPosts(maxTotal = 10, maxPerType = 4): UnifiedPost[] {
  const unifiedPosts: UnifiedPost[] = [];

  // Get review posts
  const reviewPosts = getAllPosts();
  const reviewPostsConverted: UnifiedPost[] = reviewPosts.map(post => ({
    id: post.slug,
    type: 'review' as const,
    title: post.title,
    image: post.poster || '/placeholder.jpg',
    href: `/posts/${post.slug}`,
    date: new Date(post.completed),
    subtitle: Array.isArray(post.category)
      ? post.category[0]?.replace(/[\[\]]/g, '')
      : post.category?.replace(/[\[\]]/g, ''),
    badge1: post.rating ? `⭐ ${post.rating}/10` : undefined,
    badge2: Array.isArray(post.genre) ? post.genre[0] : post.genre,
  }));

  // Get backpacking trips
  let backpackingPosts: UnifiedPost[] = [];
  try {
    const backpackingPath = path.join(process.cwd(), 'public/data/backpacking.json');
    const backpackingContent = fs.readFileSync(backpackingPath, 'utf-8');
    const backpackingData: BackpackingData = JSON.parse(backpackingContent);

    backpackingPosts = backpackingData.trips.map(trip => {
      // Parse the date from the dates string (e.g., "July 5-6, 2025")
      const dateMatch = trip.dates.match(/(\w+)\s+\d+(?:-\d+)?,\s+(\d{4})/);
      const dateStr = dateMatch ? `${dateMatch[1]} 1, ${dateMatch[2]}` : trip.dates;

      return {
        id: trip.id,
        type: 'backpacking' as const,
        title: trip.name,
        image: trip.hero.url,
        href: `/backpacking/${trip.id}`,
        date: new Date(dateStr),
        subtitle: trip.location,
        badge1: trip.stats.difficulty,
        badge2: trip.stats.distance,
      };
    });
  } catch (error) {
    console.error('Error loading backpacking data:', error);
  }

  // Get wedding post
  let weddingPost: UnifiedPost | null = null;
  try {
    const weddingPath = path.join(process.cwd(), 'public/data/wedding.json');
    const weddingContent = fs.readFileSync(weddingPath, 'utf-8');
    const weddingData: WeddingData = JSON.parse(weddingContent);

    weddingPost = {
      id: 'wedding',
      type: 'wedding' as const,
      title: weddingData.hero.title,
      image: weddingData.hero.image.url,
      href: '/wedding',
      date: new Date(weddingData.hero.date),
      subtitle: weddingData.hero.location,
    };
  } catch (error) {
    console.error('Error loading wedding data:', error);
  }

  // Combine all posts
  const allPosts = [
    ...reviewPostsConverted,
    ...backpackingPosts,
    ...(weddingPost ? [weddingPost] : []),
  ];

  // Sort by date (most recent first)
  allPosts.sort((a, b) => b.date.getTime() - a.date.getTime());

  // Apply filtering logic:
  // - At least one of each type
  // - No more than maxPerType of a single type
  // - Max total of maxTotal posts
  const typeCount: Record<string, number> = {
    review: 0,
    backpacking: 0,
    wedding: 0,
  };

  const filteredPosts: UnifiedPost[] = [];

  // First pass: ensure at least one of each type
  const reviewPost = allPosts.find(p => p.type === 'review');
  const backpackingPost = allPosts.find(p => p.type === 'backpacking');
  const weddingPostItem = allPosts.find(p => p.type === 'wedding');

  if (reviewPost) {
    filteredPosts.push(reviewPost);
    typeCount.review++;
  }
  if (backpackingPost) {
    filteredPosts.push(backpackingPost);
    typeCount.backpacking++;
  }
  if (weddingPostItem) {
    filteredPosts.push(weddingPostItem);
    typeCount.wedding++;
  }

  // Second pass: add remaining posts up to maxTotal, respecting maxPerType
  for (const post of allPosts) {
    if (filteredPosts.length >= maxTotal) break;

    // Skip if already added
    if (filteredPosts.some(p => p.id === post.id)) continue;

    // Skip if type limit reached
    if (typeCount[post.type] >= maxPerType) continue;

    filteredPosts.push(post);
    typeCount[post.type]++;
  }

  // Sort final list by date again
  filteredPosts.sort((a, b) => b.date.getTime() - a.date.getTime());

  return filteredPosts;
}
