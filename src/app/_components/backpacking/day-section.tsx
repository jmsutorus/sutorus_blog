import Image from 'next/image';
import { DayItinerary } from '@/types/backpacking';
import { Badge } from '@/components/ui/badge';

interface DaySectionProps {
  day: DayItinerary;
}

export function DaySection({ day }: DaySectionProps) {
  return (
    <div className="space-y-4">
      {/* Day Header */}
      <div>
        <h3 className="text-2xl font-bold">
          Day {day.day}: {day.title}
        </h3>
        <p className="text-muted-foreground">
          {day.distance} • {day.elevation}
        </p>
      </div>

      {/* Highlights */}
      {day.highlights && day.highlights.length > 0 && (
        <div>
          <h4 className="mb-2 font-semibold">Highlights</h4>
          <div className="flex flex-wrap gap-2">
            {day.highlights.map((highlight, index) => (
              <Badge key={index} variant="outline" className="bg-background/80 font-medium text-foreground">
                {highlight}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Description */}
      <div className="prose prose-lg max-w-none dark:prose-invert">
        <p>{day.description}</p>
      </div>

      {/* Day Images (if present) */}
      {day.images && day.images.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2">
          {day.images.map((image, index) => (
            <div key={index} className="relative aspect-[4/3] overflow-hidden rounded-lg">
              <Image
                src={image.url}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
              {image.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2 text-sm text-white">
                  {image.caption}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
