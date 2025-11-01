import { BackpackingData } from '@/types/backpacking';
import fs from 'fs/promises';
import path from 'path';
import { TripPreviewCard } from '@/app/_components/backpacking/trip-preview-card';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'All Trips | Backpacking Adventures | Joseph Sutorus',
  description: 'Browse all backpacking trips and wilderness adventures',
  openGraph: {
    title: 'All Backpacking Trips',
    description: 'Browse all backpacking trips and wilderness adventures',
    type: 'website',
  },
};

export default async function AllTripsPage() {
  const filePath = path.join(process.cwd(), 'public/data/backpacking.json');

  let data: BackpackingData;
  try {
    const fileContent = await fs.readFile(filePath, 'utf-8');
    data = JSON.parse(fileContent);
  } catch (error) {
    console.error('Error loading backpacking data:', error);
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 font-serif text-4xl">Coming Soon</h1>
          <p className="text-lg text-muted-foreground">
            Backpacking trips coming soon. Check back later!
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="backpacking-page">
      {/* Header with Back Link */}
      <div className="container mx-auto px-0 sm:px-4 pt-8">
        <Link href="/backpacking">
          <Button variant="ghost" size="sm">
            ← Back to Backpacking
          </Button>
        </Link>
      </div>

      {/* All Trips Section */}
      <section className="container mx-auto px-0 sm:px-4 py-16">
        <h1 className="mb-4 text-5xl font-bold">All Trips</h1>
        <p className="mb-8 text-lg text-muted-foreground">
          Explore all {data.trips.length} backpacking adventures
        </p>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {data.trips.map((trip) => (
            <TripPreviewCard key={trip.id} trip={trip} />
          ))}
        </div>
      </section>
    </main>
  );
}
