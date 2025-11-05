import { BackpackingData, BackpackingTrip } from '@/types/backpacking';
import { loadJsonData } from '@/lib/data-loaders/json-data-loader';
import { TripSection } from '@/app/backpacking/_components/trip-section';
import { RelatedTrips, getRelatedTrips } from '@/app/backpacking/_components/related-trips';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/app/_components/button';
import { generateTripMetadata } from '@/lib/metadata/og-metadata';

// Generate static params for all trips
export async function generateStaticParams() {
  const data = await loadJsonData<BackpackingData>('backpacking.json');

  if (!data) {
    console.error('Error generating static params: backpacking.json not found');
    return [];
  }

  return data.trips.map((trip) => ({
    slug: trip.id,
  }));
}

// Generate metadata for each trip
export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const data = await loadJsonData<BackpackingData>('backpacking.json');

  if (!data) {
    return {
      title: 'Backpacking Trip | Joseph Sutorus',
    };
  }

  const trip = data.trips.find((t) => t.id === params.slug);

  if (!trip) {
    return {
      title: 'Trip Not Found | Joseph Sutorus',
    };
  }

  // Use the comprehensive metadata generator
  return generateTripMetadata(trip);
}

export default async function TripPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const data = await loadJsonData<BackpackingData>('backpacking.json');

  if (!data) {
    notFound();
  }

  const trip = data.trips.find((t) => t.id === params.slug);

  if (!trip) {
    notFound();
  }

  // Get related trips
  const relatedTrips = getRelatedTrips(trip, data.trips, 3);

  return (
    <main className="backpacking-page">
      {/* Back to Trips Link */}
      <div className="container mx-auto px-4 sm:px-4 pt-8">
        <Link href="/backpacking">
          <Button variant="ghost" size="sm">
            ← Back to All Trips
          </Button>
        </Link>
      </div>

      {/* Trip Section */}
      <TripSection trip={trip} />

      {/* Related Trips Section */}
      {relatedTrips.length > 0 && (
        <div className="container mx-auto px-4 sm:px-4 pb-16">
          <RelatedTrips trips={relatedTrips} title="Similar Adventures" maxTrips={3} />
        </div>
      )}
    </main>
  );
}
