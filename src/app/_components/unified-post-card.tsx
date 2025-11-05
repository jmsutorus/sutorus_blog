import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/app/_components/card';
import { Badge } from '@/app/_components/badge';

export interface UnifiedPost {
  id: string;
  type: 'review' | 'backpacking' | 'wedding';
  title: string;
  image: string;
  href: string;
  date: Date;
  subtitle?: string; // location for backpacking, category for reviews
  badge1?: string;   // rating for reviews, difficulty for backpacking
  badge2?: string;   // genre for reviews, distance for backpacking
}

interface UnifiedPostCardProps {
  post: UnifiedPost;
}

export function UnifiedPostCard({ post }: UnifiedPostCardProps) {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'review':
        return 'bg-blue-500/90';
      case 'backpacking':
        return 'bg-green-500/90';
      case 'wedding':
        return 'bg-pink-500/90';
      default:
        return 'bg-gray-500/90';
    }
  };

  const getTypeBadgeVariant = (type: string) => {
    switch (type) {
      case 'review':
        return 'default';
      case 'backpacking':
        return 'secondary';
      case 'wedding':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  return (
    <Link href={post.href} className="group block">
      <Card className="overflow-hidden transition-all hover:shadow-lg">
        {/* Post Image */}
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Type Badge Overlay */}
          <div className="absolute top-3 right-3">
            <Badge
              variant={getTypeBadgeVariant(post.type)}
              className={`${getTypeColor(post.type)} text-white font-semibold`}
            >
              {post.type === 'review' ? 'Review' : post.type === 'backpacking' ? 'Backpacking' : 'Wedding'}
            </Badge>
          </div>
        </div>

        {/* Card Content */}
        <div className="bg-card/80 backdrop-blur-sm p-6 dark:bg-card/60">
          <h3 className="mb-2 text-2xl font-bold line-clamp-2">{post.title}</h3>

          {/* Subtitle (Location or Category) */}
          {post.subtitle && (
            <p className="mb-2 text-sm font-medium text-muted-foreground">
              {post.subtitle}
            </p>
          )}

          {/* Date */}
          <p className="mb-4 text-sm font-medium text-muted-foreground">
            {post.date.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>

          {/* Stats Preview */}
          <div className="flex flex-wrap gap-2">
            {post.badge1 && (
              <Badge variant="outline" className="bg-background/60 font-medium">
                {post.badge1}
              </Badge>
            )}
            {post.badge2 && (
              <Badge variant="outline" className="bg-background/60 font-medium">
                {post.badge2}
              </Badge>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
}
