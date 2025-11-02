import { getAllPosts } from "@/lib/api";
import { BackpackingData } from "@/types/backpacking";
import fs from "fs";
import path from "path";

export interface SearchItem {
  id: string;
  type: 'review' | 'trip' | 'wedding' | 'page';
  title: string;
  description: string;
  content: string;
  url: string;
  metadata?: {
    category?: string;
    tags?: string[];
    genre?: string | string[];
    location?: string;
    date?: string;
  };
}

/**
 * Aggregates all searchable content from various sources into a unified search index
 */
export async function getSearchIndex(): Promise<SearchItem[]> {
  const searchItems: SearchItem[] = [];

  // 1. Add Reviews/Posts
  try {
    const posts = getAllPosts();
    posts.forEach((post) => {
      // Create searchable content from post data
      const contentParts = [
        post.title,
        post.description || '',
        post.content || '',
        post.category || '',
        Array.isArray(post.genre) ? post.genre.join(' ') : post.genre || '',
        Array.isArray(post.tags) ? post.tags.join(' ') : '',
      ];

      searchItems.push({
        id: `review-${post.slug}`,
        type: 'review',
        title: post.title,
        description: post.description || '',
        content: contentParts.join(' '),
        url: `/posts/${post.slug}`,
        metadata: {
          category: post.category,
          tags: Array.isArray(post.tags) ? post.tags : [],
          genre: post.genre,
          date: typeof post.completed === 'string' ? post.completed : post.completed?.toString(),
        },
      });
    });
  } catch (error) {
    console.error('Error loading posts for search:', error);
  }

  // 2. Add Backpacking Trips
  try {
    const backpackingPath = path.join(process.cwd(), 'public/data/backpacking.json');
    const backpackingData: BackpackingData = JSON.parse(
      fs.readFileSync(backpackingPath, 'utf-8')
    );

    backpackingData.trips.forEach((trip) => {
      // Extract searchable text from itinerary
      const itineraryText = trip.itinerary
        .map((day) => `${day.title} ${day.description} ${day.highlights.join(' ')}`)
        .join(' ');

      // Extract searchable text from tips
      const tipsText = trip.tips.join(' ');

      const contentParts = [
        trip.name,
        trip.location,
        trip.story,
        itineraryText,
        tipsText,
        trip.stats.distance,
        trip.stats.difficulty,
        trip.stats.duration,
      ];

      searchItems.push({
        id: `trip-${trip.id}`,
        type: 'trip',
        title: trip.name,
        description: `${trip.location} • ${trip.stats.distance} • ${trip.stats.difficulty}`,
        content: contentParts.join(' '),
        url: `/backpacking/${trip.id}`,
        metadata: {
          location: trip.location,
          date: trip.dates,
        },
      });
    });
  } catch (error) {
    console.error('Error loading backpacking trips for search:', error);
  }

  // 3. Add Wedding Content
  try {
    const weddingPath = path.join(process.cwd(), 'public/data/wedding.json');
    const weddingData = JSON.parse(fs.readFileSync(weddingPath, 'utf-8'));

    // Extract searchable content from story sections
    const storyContent = weddingData.story
      .map((section: any) => `${section.title || ''} ${section.content || ''}`)
      .join(' ');

    const contentParts = [
      weddingData.hero.title,
      weddingData.hero.location,
      storyContent,
    ];

    searchItems.push({
      id: 'wedding',
      type: 'wedding',
      title: weddingData.hero.title,
      description: `${weddingData.hero.date} • ${weddingData.hero.location}`,
      content: contentParts.join(' '),
      url: '/wedding',
      metadata: {
        date: weddingData.hero.date,
        location: weddingData.hero.location,
      },
    });
  } catch (error) {
    console.error('Error loading wedding content for search:', error);
  }

  // 4. Add Static Pages
  const staticPages = [
    {
      id: 'about',
      title: 'About',
      description: 'Learn more about Joseph Sutorus',
      content: 'about joseph sutorus software engineer developer personal information biography',
      url: '/about',
    },
    {
      id: 'projects',
      title: 'Projects',
      description: 'View my projects and work',
      content: 'projects portfolio work software development coding programming',
      url: '/projects',
    },
    {
      id: 'contact',
      title: 'Contact',
      description: 'Get in touch',
      content: 'contact email social media linkedin github twitter get in touch',
      url: '/contact',
    },
    {
      id: 'reviews',
      title: 'Reviews',
      description: 'Book, movie, and TV reviews',
      content: 'reviews books movies tv shows television ratings recommendations',
      url: '/reviews',
    },
    {
      id: 'backpacking',
      title: 'Backpacking Adventures',
      description: 'Backpacking trip reports and guides',
      content: 'backpacking hiking trails wilderness camping outdoor adventures trip reports',
      url: '/backpacking',
    },
  ];

  staticPages.forEach((page) => {
    searchItems.push({
      id: `page-${page.id}`,
      type: 'page',
      title: page.title,
      description: page.description,
      content: `${page.title} ${page.description} ${page.content}`,
      url: page.url,
    });
  });

  return searchItems;
}
