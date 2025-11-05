import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/api';
import { loadJsonData } from '@/lib/data-loaders/json-data-loader';
import { BackpackingData } from '@/types/backpacking';

/**
 * Generate sitemap for the blog
 *
 * This sitemap includes:
 * - Static pages (home, about, reviews, projects, contact, wedding, backpacking)
 * - Dynamic blog posts
 * - Dynamic backpacking trips
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://josephsutorus.com';

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/reviews`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/wedding`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/backpacking`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/backpacking/trips`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/posts`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];

  // Dynamic blog posts
  let postPages: MetadataRoute.Sitemap = [];
  try {
    const posts = getAllPosts();
    postPages = posts.map((post) => ({
      url: `${baseUrl}/posts/${post.slug}`,
      lastModified: new Date(post.completed),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));
  } catch (error) {
    console.error('Error generating sitemap for blog posts:', error);
  }

  // Dynamic backpacking trips
  let tripPages: MetadataRoute.Sitemap = [];
  try {
    const backpackingData = await loadJsonData<BackpackingData>('backpacking.json');
    if (backpackingData) {
      tripPages = backpackingData.trips.map((trip) => ({
        url: `${baseUrl}/backpacking/${trip.id}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      }));
    }
  } catch (error) {
    console.error('Error generating sitemap for backpacking trips:', error);
  }

  return [...staticPages, ...postPages, ...tripPages];
}
