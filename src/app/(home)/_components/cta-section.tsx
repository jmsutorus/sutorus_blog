import React from 'react';
import Link from 'next/link';

/**
 * Call-to-action section with full-width banner
 * Features three CTA buttons with decorative background elements
 * Asymmetric button layout with different styles
 */
export function CTASection() {
  return (
    <section className="relative py-24 overflow-hidden bg-muted/30">

      <div className="container mx-auto px-4 sm:px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-12">
          {/* Headline */}
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
              Ready to Dive Deeper?
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Join me on a journey through stories, reviews, and creative exploration.
            </p>
          </div>

          {/* CTA buttons - Three different styles */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 flex-wrap">
            {/* Primary CTA - Large, filled */}
            <Link
              href="/posts"
              className="inline-flex items-center justify-center px-10 py-4 text-lg font-bold text-white bg-primary hover:bg-primary/90 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-xl shadow-lg"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
              </svg>
              Read My Latest
            </Link>

            {/* Secondary CTA - Outline style */}
            <Link
              href="/database"
              className="inline-flex items-center justify-center px-10 py-4 text-lg font-bold text-primary border-2 border-primary hover:bg-primary/10 rounded-lg transition-all duration-200 hover:scale-105"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
              </svg>
              Browse All
            </Link>

            {/* Tertiary CTA - Text link with arrow */}
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-4 text-lg font-semibold text-foreground hover:text-primary transition-colors group"
            >
              Get in Touch
              <svg
                className="w-5 h-5 transition-transform group-hover:translate-x-1"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
              </svg>
            </Link>
          </div>

          {/* Additional info */}
          <div className="pt-8">
            <p className="text-base text-muted-foreground">
              New reviews posted weekly • Subscribe for updates
            </p>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div
        className="absolute top-1/4 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl -z-10"
        aria-hidden="true"
      />
    </section>
  );
}
