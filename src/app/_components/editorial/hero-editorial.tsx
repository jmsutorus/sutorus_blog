import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Post } from '@/interfaces/post';
import { AnimatedGradient } from '../animations/animated-gradient';

interface HeroEditorialProps {
  featured?: Post;
}

/**
 * Editorial-style hero section with asymmetric layout
 * Left side: Name, subtitle, mission statement
 * Right side: Featured article card
 * Features animated gradient background and staggered text animations
 */
export function HeroEditorial({ featured }: HeroEditorialProps) {
  return (
    <section className="relative min-h-[85vh] flex items-center py-20 overflow-hidden">
      {/* Animated warm gradient background */}
      <AnimatedGradient opacity={0.12} />

      <div className="container mx-auto px-4 sm:px-4">
        <div className="grid lg:grid-cols-[60%_40%] gap-12 items-center">
          {/* Left side: Main content */}
          <div className="space-y-6">
            {/* Name with stagger animation */}
            <h1
              className="text-5xl md:text-7xl lg:text-8xl font-bold text-foreground animate-fade-in-up"
              style={{ animationDelay: '0ms' }}
            >
              Joseph Sutorus
            </h1>

            {/* Subtitle */}
            <p
              className="text-2xl md:text-3xl lg:text-4xl text-muted-foreground font-medium animate-fade-in-up"
              style={{ animationDelay: '100ms' }}
            >
              Writer. Reviewer. Storyteller.
            </p>

            {/* Mission statement */}
            <p
              className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed animate-fade-in-up"
              style={{ animationDelay: '200ms' }}
            >
              Exploring the stories that shape us through thoughtful reviews
              and authentic perspectives on film, television, and the art of storytelling.
            </p>

            {/* CTA buttons */}
            <div
              className="flex flex-wrap gap-4 pt-4 animate-fade-in-up"
              style={{ animationDelay: '300ms' }}
            >
              <Link
                href="/posts"
                className="inline-flex items-center justify-center px-8 py-3 text-lg font-semibold text-white bg-primary hover:bg-primary/90 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg"
              >
                Read Latest Posts
              </Link>
            </div>

            {/* Scroll indicator */}
            <div className="pt-8 animate-fade-in" style={{ animationDelay: '400ms' }}>
              <div className="flex flex-col items-center gap-2 animate-bounce">
                <span className="text-sm text-muted-foreground">Scroll to explore</span>
                <svg
                  className="w-6 h-6 text-muted-foreground"
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
          </div>

          {/* Right side: Featured article card */}
          {featured && (
            <div
              className="group relative rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-3xl animate-fade-in-up"
              style={{ animationDelay: '200ms' }}
            >
              <Link href={`/posts/${featured.slug}`} className="block">
                {/* Featured post image */}
                {featured.poster && (
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Image
                      src={featured.poster}
                      alt={featured.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 40vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      priority
                    />
                    {/* Warm gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-90" />
                  </div>
                )}

                {/* Card content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 space-y-3">
                  <div className="inline-block px-3 py-1 text-xs font-semibold text-primary-foreground bg-primary rounded-full">
                    Featured
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray dark:text-white line-clamp-2 group-hover:text-secondary transition-colors">
                    {featured.title}
                  </h3>
                  {featured.description && (
                    <p className="text-base text-gray dark:text-white line-clamp-2">
                      {featured.description}
                    </p>
                  )}
                  <div className="flex items-center gap-2 text-sm text-gray dark:text-gray-300">
                    {featured.category && (
                      <span className="font-medium">{featured.category}</span>
                    )}
                    {featured.category && featured.rating && (
                      <span>•</span>
                    )}
                    {featured.rating && (
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        {featured.rating}/10
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
