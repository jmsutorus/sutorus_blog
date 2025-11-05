import Image from 'next/image';
import Link from 'next/link';
import { BackpackingTrip } from '@/types/backpacking';
import { Card } from '@/app/_components/card';
import { Badge } from '@/app/_components/badge';
import { getCloudinaryBlurDataUrl } from '@/lib/cloudinary/getBlurDataUrl';
import { getDifficultyVariant } from '@/lib/backpacking-helpers';

interface TripPreviewCardProps {
  trip: BackpackingTrip;
}

export function TripPreviewCard({ trip }: TripPreviewCardProps) {
  return (
    <Link href={`/backpacking/${trip.id}`} className="group block">
      <Card className="overflow-hidden transition-all hover:shadow-lg">
        {/* Trip Hero Image */}
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={trip.hero.url}
            alt={trip.hero.alt}
            fill
            placeholder="blur"
            blurDataURL={trip.hero.blurDataURL || getCloudinaryBlurDataUrl(trip.hero.url)}
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        {/* Card Content */}
        <div className="bg-card/80 backdrop-blur-sm p-6 dark:bg-card/60">
          <h3 className="mb-2 text-2xl font-bold">{trip.name}</h3>
          <p className="mb-2 text-sm font-medium">
            {trip.location}
          </p>
          <p className="mb-4 text-sm font-medium">{trip.dates}</p>

          {/* Stats Preview */}
          <div className="flex flex-wrap gap-2">
            <Badge variant={getDifficultyVariant(trip.stats.difficulty)}>
              {trip.stats.difficulty}
            </Badge>
            <Badge variant="outline" className="bg-background/60 font-medium">
              {trip.stats.distance}
            </Badge>
            <Badge variant="outline" className="bg-background/60 font-medium">
              {trip.stats.duration}
            </Badge>
          </div>
        </div>
      </Card>
    </Link>
  );
}
