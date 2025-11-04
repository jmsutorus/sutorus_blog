import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BackpackingTrip } from '@/types/backpacking';
import { calculateRelevance } from '@/app/_components/shared/related-posts';
import { getDifficultyColor, getDifficultyVariant } from '@/lib/backpacking-helpers';

/**
 * Get related trips based on tags, difficulty, and location similarity
 */
export function getRelatedTrips(
  currentTrip: BackpackingTrip,
  allTrips: BackpackingTrip[],
  maxTrips: number = 3
): BackpackingTrip[] {
  // Calculate relevance scores based on multiple factors
  const tripsWithScores = allTrips
    .filter(trip => trip.id !== currentTrip.id)
    .map(trip => {
      let score = 0;

      // Tag similarity (highest weight)
      if (currentTrip.tags && trip.tags) {
        score += calculateRelevance(currentTrip.tags, trip.tags) * 3;
      }

      // Difficulty match
      if (trip.stats.difficulty === currentTrip.stats.difficulty) {
        score += 2;
      }

      // Location similarity (same state/region)
      if (trip.location === currentTrip.location) {
        score += 2;
      } else if (trip.location.includes(currentTrip.location.split(',')[0])) {
        score += 1;
      }

      // Season similarity
      if (trip.stats.season === currentTrip.stats.season) {
        score += 1;
      }

      return { trip, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score);

  // Get top related trips
  const relatedTrips = tripsWithScores.slice(0, maxTrips);

  // Fill with other trips if needed
  if (relatedTrips.length < maxTrips) {
    const usedIds = new Set(relatedTrips.map(({ trip }) => trip.id));
    const fillerTrips = allTrips
      .filter(trip => trip.id !== currentTrip.id && !usedIds.has(trip.id))
      .slice(0, maxTrips - relatedTrips.length);

    return [
      ...relatedTrips.map(({ trip }) => trip),
      ...fillerTrips
    ];
  }

  return relatedTrips.map(({ trip }) => trip);
}

interface RelatedTripsProps {
  trips: BackpackingTrip[];
  title?: string;
  maxTrips?: number;
}

/**
 * Display related backpacking trips in a card grid
 */
export function RelatedTrips({ trips, title = "Related Trips", maxTrips = 3 }: RelatedTripsProps) {
  const displayTrips = trips.slice(0, maxTrips);

  if (displayTrips.length === 0) {
    return null;
  }

  return (
    <section className="py-12 border-t border-border">
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-serif font-bold dark:text-white">
          {title}
        </h2>
        <p className="text-muted-foreground dark:text-gray-300 mt-2">
          More adventures you might enjoy
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayTrips.map((trip) => (
          <Card key={trip.id} className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <Link href={`/backpacking/${trip.id}`} className="block">
              <div className="relative aspect-[16/9] overflow-hidden bg-muted">
                <Image
                  src={trip.hero.url}
                  alt={trip.hero.alt}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
            </Link>

            <CardHeader>
              <Link href={`/backpacking/${trip.id}`} className="hover:text-primary transition-colors">
                <h3 className="mb-2 text-2xl font-bold">{trip.name}</h3>
              </Link>
              <p className="mb-2 text-sm font-medium">
            {trip.location}
          </p>
              <div className="flex gap-2 mt-2 flex-wrap">
                <Badge variant={getDifficultyVariant(trip.stats.difficulty)}>
                  {trip.stats.difficulty}
                </Badge>
                <Badge variant="outline" className="bg-background/80 font-medium">
              {trip.stats.distance}
            </Badge>
              </div>
            </CardHeader>

            <CardContent className="flex-grow">
              <p className="text-sm text-muted-foreground line-clamp-3">
                {trip.story.substring(0, 150)}...
              </p>
            </CardContent>

            <CardFooter className="flex justify-between items-center pt-4">
              <Link href={`/backpacking/${trip.id}`}>
                <Button variant="ghost" size="sm">
                  View Trip →
                </Button>
              </Link>
              <span className="text-xs text-muted-foreground">
                {trip.stats.duration}
              </span>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
