import { WeddingData } from '@/types/wedding';
import { loadJsonData } from '@/lib/data-loaders/json-data-loader';
import { WeddingHero } from '@/app/wedding/_components/wedding-hero';
import { WeddingStorySection } from '@/app/wedding/_components/wedding-story-section';
import { WeddingThanksSection } from '@/app/wedding/_components/wedding-thanks-section';
import { WeddingGallery } from '@/app/wedding/_components/wedding-gallery';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Our Wedding - Joseph Sutorus',
    description: 'Celebrating our special day with family and friends. A collection of moments from Joseph and Elizabeth\'s wedding celebration.',
    openGraph: {
      title: 'Our Wedding - Joseph & Elizabeth',
      description: 'Celebrating our special day',
      type: 'website',
      images: [
        {
          url: '/wedding-og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'Joseph and Elizabeth\'s Wedding',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Our Wedding - Joseph & Elizabeth',
      description: 'Celebrating our special day',
      images: ['/wedding-og-image.jpg'],
    },
  };
}

export default async function WeddingPage() {
  // Load wedding data server-side
  const data = await loadJsonData<WeddingData>('wedding.json');

  if (!data) {
    // Fallback or error handling
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-serif mb-4">Coming Soon</h1>
          <p className="text-lg text-muted-foreground">
            Our wedding page is being prepared. Check back soon!
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="wedding-page">
      {/* Hero Section */}
      <WeddingHero hero={data.hero} />

      {/* Story Sections - First part (Our Beginning and The Proposal) */}
      {data.story.slice(0, 2).map((section, index) => (
        <WeddingStorySection
          key={index}
          content={section.content}
          image={section.image}
          imagePosition={section.imagePosition}
          index={index}
        />
      ))}

      {/* Story Sections - Second part (Our Special Day and The Celebration) */}
      {data.story.slice(2).map((section, index) => (
        <WeddingStorySection
          key={index + 2}
          content={section.content}
          image={section.image}
          imagePosition={section.imagePosition}
          index={index + 2}
        />
      ))}

      {/* Thank You Section */}
      <WeddingThanksSection />

      {/* Gallery Section */}
      <WeddingGallery images={data.gallery} />

      {/* Optional: Footer or additional sections can be added here */}
    </main>
  );
}
