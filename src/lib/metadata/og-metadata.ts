import { Metadata } from 'next';

/**
 * Open Graph and Twitter Card Metadata Generator
 *
 * This utility provides helper functions to generate consistent and comprehensive
 * Open Graph and Twitter Card metadata across the site for rich social media previews.
 *
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-metadata
 * @see https://ogp.me/
 */

interface OGImageOptions {
  url: string;
  alt: string;
  width?: number;
  height?: number;
}

interface OpenGraphMetadataOptions {
  title: string;
  description: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
  images?: OGImageOptions[];
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  tags?: string[];
  siteName?: string;
}

const DEFAULT_OG_IMAGE: OGImageOptions = {
  url: '/og-default.png',
  alt: 'Joseph Sutorus - Writer, Reviewer, Storyteller',
  width: 1200,
  height: 630,
};

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://sutorus.com';
const SITE_NAME = 'Joseph Sutorus';

/**
 * Generate comprehensive Open Graph and Twitter Card metadata
 *
 * @param options - Configuration for the metadata
 * @returns Next.js Metadata object with OpenGraph and Twitter fields
 *
 * @example
 * ```ts
 * export const metadata = generateOpenGraphMetadata({
 *   title: 'My Blog Post',
 *   description: 'An amazing blog post about...',
 *   url: '/posts/my-blog-post',
 *   type: 'article',
 *   images: [{ url: '/images/post-cover.jpg', alt: 'Post cover' }],
 * });
 * ```
 */
export function generateOpenGraphMetadata(
  options: OpenGraphMetadataOptions
): Pick<Metadata, 'openGraph' | 'twitter'> {
  const {
    title,
    description,
    url,
    type = 'website',
    images = [DEFAULT_OG_IMAGE],
    publishedTime,
    modifiedTime,
    authors,
    tags,
    siteName = SITE_NAME,
  } = options;

  const fullUrl = url ? `${BASE_URL}${url}` : BASE_URL;

  // Ensure all image URLs are absolute
  const processedImages = images.map((img) => ({
    url: img.url.startsWith('http') ? img.url : `${BASE_URL}${img.url}`,
    alt: img.alt,
    width: img.width || 1200,
    height: img.height || 630,
  }));

  const metadata: Pick<Metadata, 'openGraph' | 'twitter'> = {
    openGraph: {
      type,
      locale: 'en_US',
      url: fullUrl,
      siteName,
      title,
      description,
      images: processedImages,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: processedImages.map((img) => img.url),
      creator: '@josephsutorus',
      site: '@josephsutorus',
    },
  };

  // Add article-specific metadata if type is 'article'
  if (type === 'article') {
    metadata.openGraph = {
      ...metadata.openGraph,
      type: 'article',
      publishedTime,
      modifiedTime,
      authors: authors?.map((author) => author),
      tags,
    };
  }

  return metadata;
}

/**
 * Generate metadata for a blog post/review
 *
 * @param post - Post data including title, description, slug, etc.
 * @returns Complete metadata including OpenGraph and Twitter tags
 */
export function generatePostMetadata(post: {
  title: string;
  description?: string;
  slug: string;
  poster?: string;
  completed?: string | Date;
  tags?: string[];
  category?: string;
}): Metadata {
  const description =
    post.description ||
    `Read Joseph's review and thoughts on ${post.title}`;

  const ogMetadata = generateOpenGraphMetadata({
    title: post.title,
    description,
    url: `/posts/${post.slug}`,
    type: 'article',
    images: post.poster
      ? [
          {
            url: post.poster,
            alt: `${post.title} poster`,
            width: 1200,
            height: 630,
          },
        ]
      : undefined,
    publishedTime: post.completed
      ? new Date(post.completed).toISOString()
      : undefined,
    tags: post.tags,
  });

  return {
    title: `${post.title} | Joseph Sutorus`,
    description,
    ...ogMetadata,
  };
}

/**
 * Generate metadata for a backpacking trip
 *
 * @param trip - Trip data including name, location, stats, etc.
 * @returns Complete metadata including OpenGraph and Twitter tags
 */
export function generateTripMetadata(trip: {
  name: string;
  location: string;
  story: string;
  id: string;
  hero: { url: string; alt: string; width: number; height: number };
  stats: { distance: string; duration: string; difficulty: string };
}): Metadata {
  const description = `${trip.stats.distance} • ${trip.stats.duration} • ${trip.stats.difficulty}. ${trip.story.substring(0, 150)}...`;

  const ogMetadata = generateOpenGraphMetadata({
    title: trip.name,
    description: `${trip.location} - ${description}`,
    url: `/backpacking/${trip.id}`,
    type: 'article',
    images: [
      {
        url: trip.hero.url,
        alt: trip.hero.alt,
        width: trip.hero.width,
        height: trip.hero.height,
      },
    ],
  });

  return {
    title: `${trip.name} | Backpacking | Joseph Sutorus`,
    description,
    ...ogMetadata,
  };
}

/**
 * Generate metadata for static pages
 *
 * @param page - Page configuration
 * @returns Complete metadata including OpenGraph and Twitter tags
 */
export function generatePageMetadata(page: {
  title: string;
  description: string;
  path: string;
  image?: OGImageOptions;
}): Metadata {
  const ogMetadata = generateOpenGraphMetadata({
    title: page.title,
    description: page.description,
    url: page.path,
    type: 'website',
    images: page.image ? [page.image] : undefined,
  });

  return {
    title: page.title,
    description: page.description,
    ...ogMetadata,
  };
}
