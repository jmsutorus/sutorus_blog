import { HoneymoonData } from '@/types/honeymoon';
import { loadJsonData } from '@/lib/data-loaders/json-data-loader';
import { HoneymoonHero } from '@/app/honeymoon/_components/honeymoon-hero';
import { HoneymoonDaySection } from '@/app/honeymoon/_components/honeymoon-day-section';
import { WeddingGallery } from '@/app/wedding/_components/wedding-gallery';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Our Honeymoon - Joseph Sutorus',
    description: 'A 7-day tropical adventure celebrating the beginning of our married life.',
    openGraph: {
      title: 'Our Honeymoon - Joseph & Elizabeth',
      description: 'A 7-day tropical adventure',
      type: 'website',
      images: [
        {
          url: 'https://images.unsplash.com/photo-1549298285-b9e73b0638e4?auto=format&fit=crop&w=1200&h=630&q=80',
          width: 1200,
          height: 630,
          alt: 'Our Honeymoon',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Our Honeymoon - Joseph & Elizabeth',
      description: 'A 7-day tropical adventure',
      images: ['https://images.unsplash.com/photo-1549298285-b9e73b0638e4?auto=format&fit=crop&w=1200&h=630&q=80'],
    },
  };
}

export default async function HoneymoonPage() {
  // Load honeymoon data server-side
  const data = await loadJsonData<HoneymoonData>('honeymoon.json');

  if (!data) {
    // Fallback or error handling
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-serif mb-4">Coming Soon</h1>
          <p className="text-lg text-muted-foreground">
            Our honeymoon page is being prepared. Check back soon!
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="honeymoon-page">
      {/* Hero Section */}
      <HoneymoonHero hero={data.hero} />

      {/* 7 Days of Honeymoon */}
      {data.days.map((day) => (
        <HoneymoonDaySection
          key={day.dayNumber}
          day={day}
        />
      ))}

      {/* Reusing the WeddingGallery component for the Honeymoon Gallery */}
      <WeddingGallery images={data.gallery as any} />

    </main>
  );
}
