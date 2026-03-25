import Image from 'next/image';
import { HoneymoonDay } from '@/types/honeymoon';
import Container from '@/app/_components/container';

interface HoneymoonDaySectionProps {
  day: HoneymoonDay;
}

export function HoneymoonDaySection({ day }: HoneymoonDaySectionProps) {
  // Split content by double line breaks to create paragraphs
  const paragraphs = day.content.split('\n\n').filter((p) => p.trim());

  const imagePosition = day.imagePosition || 'left';

  // If no image, display text-only section
  if (!day.image) {
    return (
      <Container>
        <section className="py-12 sm:py-16 md:py-20">
          <div className="max-w-3xl mx-auto">
            <div className="mb-6 opacity-80 text-sm font-bold uppercase tracking-widest text-primary">
              Day {day.dayNumber}
            </div>
            <h3 className="text-3xl font-serif mb-8 text-foreground">
              {day.title}
            </h3>
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
              src={day.image.url}
              alt={day.image.alt}
              width={day.image.width}
              height={day.image.height}
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
            <div 
               className="mb-4 opacity-80 text-sm font-bold uppercase tracking-widest text-primary"
               style={{ animation: `fade-in 0.6s ease-out 0s both` }}
            >
              Day {day.dayNumber}
            </div>
            <h3 
               className="text-3xl font-serif mb-6 text-foreground"
               style={{ animation: `fade-in 0.6s ease-out 0.1s both` }}
            >
              {day.title}
            </h3>
            {paragraphs.map((paragraph, i) => (
              <p
                key={i}
                className="text-base sm:text-lg leading-relaxed text-foreground/90 mb-6 last:mb-0"
                style={{
                  animation: `fade-in 0.6s ease-out ${(i + 2) * 0.1}s both`,
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
