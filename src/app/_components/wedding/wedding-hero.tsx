import Image from 'next/image';
import { WeddingHero as WeddingHeroType } from '@/types/wedding';
import { getCloudinaryBlurDataUrl } from '@/lib/cloudinary/getBlurDataUrl';

interface WeddingHeroProps {
  hero: WeddingHeroType;
}

export function WeddingHero({ hero }: WeddingHeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image - Desktop */}
      <div className="absolute inset-0 hidden md:block">
        <Image
          src={hero.image.url}
          alt={hero.image.alt}
          fill
          priority
          placeholder="blur"
          blurDataURL={hero.image.blurDataURL || getCloudinaryBlurDataUrl(hero.image.url)}
          className="object-cover"
          sizes="100vw"
        />
      </div>

      {/* Background Image - Mobile */}
      {hero.mobileImage && (
        <div className="absolute inset-0 md:hidden">
          <Image
            src={hero.mobileImage.url}
            alt={hero.mobileImage.alt}
            fill
            priority
            placeholder="blur"
            blurDataURL={hero.mobileImage.blurDataURL || getCloudinaryBlurDataUrl(hero.mobileImage.url)}
            className="object-cover"
            sizes="100vw"
          />
        </div>
      )}

      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Animated fade-in container */}
          <div className="animate-in fade-in duration-1000">
            {/* Title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif text-white/90 mb-4 sm:mb-6 tracking-wide">
              {hero.title}
            </h1>

            {/* Names - Large and prominent */}
            <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif text-white mb-6 sm:mb-8 md:mb-10 tracking-tight leading-tight">
              {hero.names}
            </h2>

            {/* Date and Location */}
            <div className="bg-white/10 backdrop-blur-sm inline-block px-6 sm:px-8 md:px-10 py-4 sm:py-5 md:py-6 rounded-lg border border-white/20">
              <p className="text-lg sm:text-xl md:text-2xl text-white/95 font-sans mb-2">
                {hero.date}
              </p>
              <p className="text-base sm:text-lg md:text-xl text-white/90 font-sans">
                {hero.location}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator (optional) */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-white/70"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </section>
  );
}
