import { BackpackingData, BackpackingTrip } from '@/types/backpacking';
import fs from 'fs/promises';
import path from 'path';
import { TripSection } from '@/app/_components/backpacking/trip-section';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

// Generate static params for all trips
export async function generateStaticParams() {
  const filePath = path.join(process.cwd(), 'public/data/backpacking.json');

  try {
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const data: BackpackingData = JSON.parse(fileContent);

    return data.trips.map((trip) => ({
      slug: trip.id,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

// Generate metadata for each trip
export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const filePath = path.join(process.cwd(), 'public/data/backpacking.json');

  try {
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const data: BackpackingData = JSON.parse(fileContent);
    const trip = data.trips.find((t) => t.id === params.slug);

    if (!trip) {
      return {
        title: 'Trip Not Found | Joseph Sutorus',
      };
    }

    return {
      title: `${trip.name} | Backpacking | Joseph Sutorus`,
      description: `${trip.stats.distance} • ${trip.stats.duration} • ${trip.stats.difficulty}. ${trip.story.substring(0, 150)}...`,
      openGraph: {
        title: trip.name,
        description: `${trip.location} - ${trip.stats.distance} backpacking trip`,
        type: 'article',
        images: [
          {
            url: trip.hero.url,
            width: trip.hero.width,
            height: trip.hero.height,
            alt: trip.hero.alt,
          },
        ],
      },
    };
  } catch (error) {
    return {
      title: 'Backpacking Trip | Joseph Sutorus',
    };
  }
}

export default async function TripPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const filePath = path.join(process.cwd(), 'public/data/backpacking.json');

  let data: BackpackingData;
  try {
    const fileContent = await fs.readFile(filePath, 'utf-8');
    data = JSON.parse(fileContent);
  } catch (error) {
    console.error('Error loading backpacking data:', error);
    notFound();
  }

  const trip = data.trips.find((t) => t.id === params.slug);

  if (!trip) {
    notFound();
  }

  return (
    <main className="backpacking-page">
      {/* Back to Trips Link */}
      <div className="container mx-auto px-0 sm:px-4 pt-8">
        <Link href="/backpacking">
          <Button variant="ghost" size="sm">
            ← Back to All Trips
          </Button>
        </Link>
      </div>

      {/* Trip Section */}
      <TripSection trip={trip} />
    </main>
  );
}
