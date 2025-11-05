import { BackpackingData } from '@/types/backpacking';
import { loadJsonData } from '@/lib/data-loaders/json-data-loader';
import { BackpackingHero } from '@/app/backpacking/_components/backpacking-hero';
import { TripPreviewCard } from '@/app/backpacking/_components/trip-preview-card';
import { GearShowcase } from '@/app/backpacking/_components/gear-showcase';
import { Button } from '@/app/_components/button';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Backpacking Adventures | Joseph Sutorus',
  description:
    'Wilderness backpacking trips, trail guides, and outdoor adventure stories',
  openGraph: {
    title: 'Backpacking Adventures',
    description: 'Explore wilderness trails and backpacking trips',
    type: 'website',
  },
};

export default async function BackpackingPage() {
  const data = await loadJsonData<BackpackingData>('backpacking.json');

  if (!data) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 font-serif text-4xl">Coming Soon</h1>
          <p className="text-lg text-muted-foreground">
            Backpacking adventures coming soon. Check back later!
          </p>
        </div>
      </div>
    );
  }

  const featuredTrips = data.trips.filter((trip) => trip.featured);

  return (
    <main className="backpacking-page">
      {/* Hero Section */}
      <BackpackingHero hero={data.hero} />

      {/* Featured Trips Preview */}
      <section className="container mx-auto px-4 sm:px-4 py-16">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-4xl font-bold">Featured Trips</h2>
          <Link href="/backpacking/trips">
            <Button variant="default">
              View All Trips ({data.trips.length}) →
            </Button>
          </Link>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredTrips.map((trip) => (
            <TripPreviewCard key={trip.id} trip={trip} />
          ))}
        </div>
      </section>

      {/* Gear Showcase */}
      <GearShowcase gear={data.gear} />
    </main>
  );
}
