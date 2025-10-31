import { getFeaturedPosts } from '@/lib/api';
import { HeroEditorial } from '@/app/_components/editorial/hero-editorial';
import { PersonalStory } from '@/app/_components/editorial/personal-story';
import { FeaturedWriting } from '@/app/_components/editorial/featured-writing';
import { CreativeShowcase } from '@/app/_components/editorial/creative-showcase';
import { CTASection } from '@/app/_components/editorial/cta-section';

export default function Home() {
  // Get featured posts for the landing page
  const featuredPosts = getFeaturedPosts();

  return (
    <main>
      {/* Hero Section - Editorial style with asymmetric layout */}
      <HeroEditorial featured={featuredPosts[0]} />

      {/* Personal Story - Magazine-style two-column layout */}
      <PersonalStory />

      {/* Featured Writing - Asymmetric grid with large + small posts */}
      <FeaturedWriting posts={featuredPosts} />

      {/* Creative Showcase - Bento grid with hobbies, projects, reading */}
      <CreativeShowcase />

      {/* Call to Action - Full-width banner with gradient */}
      <CTASection />
    </main>
  );
}
