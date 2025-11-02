import { WeddingData } from '@/types/wedding';
import fs from 'fs/promises';
import path from 'path';
import { WeddingHero } from '@/app/_components/wedding/wedding-hero';
import { WeddingStorySection } from '@/app/_components/wedding/wedding-story-section';
import { WeddingThanksSection } from '@/app/_components/wedding/wedding-thanks-section';
import { WeddingGallery } from '@/app/_components/wedding/wedding-gallery';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Our Wedding - Joseph Sutorus',
    description: 'Celebrating our special day with family and friends. A collection of moments from Joseph and Sarah\'s wedding celebration.',
    openGraph: {
      title: 'Our Wedding - Joseph & Sarah',
      description: 'Celebrating our special day',
      type: 'website',
      images: [
        {
          url: '/wedding-og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'Joseph and Sarah\'s Wedding',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Our Wedding - Joseph & Sarah',
      description: 'Celebrating our special day',
      images: ['/wedding-og-image.jpg'],
    },
  };
}

export default async function WeddingPage() {
  // Load wedding data server-side
  const filePath = path.join(process.cwd(), 'public/data/wedding.json');

  let data: WeddingData;
  try {
    const fileContent = await fs.readFile(filePath, 'utf-8');
    data = JSON.parse(fileContent);
  } catch (error) {
    console.error('Error loading wedding data:', error);
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
