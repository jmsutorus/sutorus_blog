import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface RelatedPost {
  slug: string;
  title: string;
  image: string;
  description?: string;
  tags?: string[];
  category?: string;
  date?: string;
  relevanceScore?: number;
}

interface RelatedPostsProps {
  posts: RelatedPost[];
  title?: string;
  maxPosts?: number;
}

/**
 * Calculate relevance score between two sets of tags
 * Returns the number of common tags
 */
export function calculateRelevance(currentTags: string[], postTags: string[]): number {
  if (!currentTags || !postTags) return 0;

  const currentSet = new Set(currentTags.map(tag => tag.toLowerCase()));
  const postSet = new Set(postTags.map(tag => tag.toLowerCase()));

  let commonTags = 0;
  postSet.forEach(tag => {
    if (currentSet.has(tag)) {
      commonTags++;
    }
  });

  return commonTags;
}

/**
 * Get related posts based on tag similarity
 */
export function getRelatedPosts<T extends { tags?: string[]; slug: string }>(
  currentPost: T,
  allPosts: T[],
  maxPosts: number = 3
): T[] {
  if (!currentPost.tags || currentPost.tags.length === 0) {
    // If no tags, return most recent posts excluding current
    return allPosts
      .filter(post => post.slug !== currentPost.slug)
      .slice(0, maxPosts);
  }

  // Calculate relevance scores
  const postsWithScores = allPosts
    .filter(post => post.slug !== currentPost.slug)
    .map(post => ({
      post,
      score: calculateRelevance(currentPost.tags || [], post.tags || [])
    }))
    .filter(({ score }) => score > 0) // Only keep posts with at least one common tag
    .sort((a, b) => b.score - a.score); // Sort by score descending

  // If we don't have enough related posts, fill with other posts
  const relatedPosts = postsWithScores.slice(0, maxPosts);

  if (relatedPosts.length < maxPosts) {
    const usedSlugs = new Set(relatedPosts.map(({ post }) => post.slug));
    const fillerPosts = allPosts
      .filter(post => post.slug !== currentPost.slug && !usedSlugs.has(post.slug))
      .slice(0, maxPosts - relatedPosts.length);

    return [
      ...relatedPosts.map(({ post }) => post),
      ...fillerPosts
    ];
  }

  return relatedPosts.map(({ post }) => post);
}

/**
 * Display related posts in a card grid
 */
export function RelatedPosts({ posts, title = "Related Posts", maxPosts = 3 }: RelatedPostsProps) {
  const displayPosts = posts.slice(0, maxPosts);

  if (displayPosts.length === 0) {
    return null;
  }

  return (
    <section className="py-12 border-t border-border">
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground">
          {title}
        </h2>
        <p className="text-muted-foreground mt-2">
          You might also enjoy these
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayPosts.map((post) => (
          <Card key={post.slug} className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <Link href={`/posts/${post.slug}`} className="block">
              <div className="relative aspect-[16/9] overflow-hidden bg-muted">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
            </Link>

            <CardHeader>
              <Link href={`/posts/${post.slug}`} className="hover:text-primary transition-colors">
                <h3 className="text-lg font-semibold line-clamp-2">
                  {post.title}
                </h3>
              </Link>
              {post.category && (
                <Badge variant="secondary" className="w-fit mt-2">
                  {post.category}
                </Badge>
              )}
            </CardHeader>

            {post.description && (
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {post.description}
                </p>
              </CardContent>
            )}

            <CardFooter className="flex justify-between items-center pt-4">
              <Link href={`/posts/${post.slug}`}>
                <Button variant="ghost" size="sm">
                  Read More →
                </Button>
              </Link>
              {post.date && (
                <span className="text-xs text-muted-foreground">
                  {new Date(post.date).toLocaleDateString('en-US', {
                    month: 'short',
                    year: 'numeric'
                  })}
                </span>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
