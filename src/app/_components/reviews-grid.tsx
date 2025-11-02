import Image from 'next/image';
import Link from 'next/link';
import { Post } from '@/interfaces/post';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface ReviewsGridProps {
  posts: Post[];
}

export function ReviewsGrid({ posts }: ReviewsGridProps) {
  const getRatingVariant = (rating: number) => {
    if (rating >= 8) return 'default';
    if (rating >= 6) return 'secondary';
    return 'outline';
  };

  return (
    <section>
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-4xl md:text-5xl font-bold">Recent</h2>
        <Link href="/database">
          <Button variant="default">
            View All →
          </Button>
        </Link>
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link key={post.slug} href={`/posts/${post.slug}`} className="group block">
            <Card className="overflow-hidden transition-all hover:shadow-lg">
              {/* Post Cover Image */}
              <div className="relative aspect-[3/4] overflow-hidden">
                {post.poster ? (
                  <Image
                    src={post.poster}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20" />
                )}
              </div>

              {/* Card Content */}
              <div className="bg-card/80 backdrop-blur-sm p-6 dark:bg-card/60">
                <h3 className="mb-2 text-2xl font-bold line-clamp-2">{post.title}</h3>

                {/* Category and Year */}
                {post.category && (
                  <p className="mb-2 text-sm font-medium text-muted-foreground">
                    {Array.isArray(post.category)
                      ? post.category.join(', ').replaceAll('[', '').replaceAll(']', '')
                      : post.category.replaceAll('[', '').replaceAll(']', '')}
                  </p>
                )}

                {post.released && (
                  <p className="mb-4 text-sm font-medium text-muted-foreground">
                    {typeof post.released === 'string' ? post.released : new Date(post.released).getFullYear()}
                  </p>
                )}

                {/* Stats Preview */}
                <div className="flex flex-wrap gap-2">
                  {post.rating && (
                    <Badge variant={getRatingVariant(post.rating)}>
                      ⭐ {post.rating}/10
                    </Badge>
                  )}
                  {post.tags && Array.isArray(post.tags) && post.tags.slice(0, 4).map((tag, index) => (
                    <Badge key={index} variant="outline" className="bg-background/60 font-medium">
                      {tag}
                    </Badge>
                  ))}
                  {post.genre && (
                    <Badge variant="outline" className="bg-background/60 font-medium">
                      {Array.isArray(post.genre) ? post.genre[0] : post.genre}
                    </Badge>
                  )}
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
