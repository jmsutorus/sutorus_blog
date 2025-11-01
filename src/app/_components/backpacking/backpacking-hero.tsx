'use client';

import Image from 'next/image';
import { BackpackingImage } from '@/types/backpacking';
import { useEffect, useState } from 'react';

interface BackpackingHeroProps {
  hero: {
    title: string;
    subtitle: string;
    image: BackpackingImage;
  };
}

export function BackpackingHero({ hero }: BackpackingHeroProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={hero.image.url}
          alt={hero.image.alt}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div
        className={`relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}
      >
        <h1 className="mb-4 font-serif text-5xl font-bold sm:text-6xl md:text-7xl lg:text-8xl">
          {hero.title}
        </h1>
        <p className="max-w-2xl text-lg sm:text-xl md:text-2xl">
          {hero.subtitle}
        </p>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 animate-bounce">
          <svg
            className="h-8 w-8 text-white"
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
      </div>
    </section>
  );
}
