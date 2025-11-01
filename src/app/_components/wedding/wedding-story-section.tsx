import Image from 'next/image';
import { WeddingStorySection as WeddingStorySectionType } from '@/types/wedding';
import Container from '@/app/_components/container';

interface WeddingStorySectionProps {
  content: string;
  image?: WeddingStorySectionType['image'];
  imagePosition?: 'left' | 'right';
  index?: number;
}

export function WeddingStorySection({
  content,
  image,
  imagePosition = 'left',
  index = 0,
}: WeddingStorySectionProps) {
  // Split content by double line breaks to create paragraphs
  const paragraphs = content.split('\n\n').filter((p) => p.trim());

  // If no image, display text-only section
  if (!image) {
    return (
      <Container>
        <section className="py-12 sm:py-16 md:py-20">
          <div className="max-w-3xl mx-auto">
            {paragraphs.map((paragraph, i) => (
              <p
                key={i}
                className="text-base sm:text-lg leading-relaxed text-foreground/90 mb-6 last:mb-0"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </section>
      </Container>
    );
  }

  // Two-column layout with image
  return (
    <Container>
      <section className="py-12 sm:py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Image Column */}
          <div
            className={`relative aspect-[4/3] rounded-lg overflow-hidden ${
              imagePosition === 'right' ? 'lg:order-2' : 'lg:order-1'
            }`}
          >
            <Image
              src={image.url}
              alt={image.alt}
              width={image.width}
              height={image.height}
              className="object-cover w-full h-full"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* Text Column */}
          <div
            className={`${
              imagePosition === 'right' ? 'lg:order-1' : 'lg:order-2'
            }`}
          >
            {paragraphs.map((paragraph, i) => (
              <p
                key={i}
                className="text-base sm:text-lg leading-relaxed text-foreground/90 mb-6 last:mb-0"
                style={{
                  animation: `fade-in 0.6s ease-out ${i * 0.1}s both`,
                }}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>
    </Container>
  );
}
