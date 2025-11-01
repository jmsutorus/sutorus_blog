'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

interface AboutMeData {
  content: string;
  profileImage: string;
}

/**
 * Personal story section with magazine-style two-column layout
 * Left: Profile photo with CSS parallax effect
 * Right: About me content loaded from JSON
 * Features fade-in on scroll animation
 */
export function PersonalStory() {
  const [data, setData] = useState<AboutMeData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data/about-me.json')
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading about-me data:', err);
        setLoading(false);
      });
  }, []);

  // Default content if JSON fails to load
  const defaultContent = `I'm a passionate writer and reviewer dedicated to exploring the stories that shape our culture. Through my work, I dive deep into film, television, and the art of storytelling itself.

What drives my writing is a genuine love for the craft and a desire to help others discover meaningful entertainment. I believe that great stories have the power to transform perspectives and connect us in profound ways.

Beyond writing, I'm constantly exploring new creative pursuits, from gaming to reading, always seeking inspiration in unexpected places. My goal is to create a space where thoughtful analysis meets authentic enthusiasm.`;

  const content = data?.content || defaultContent;
  const imageUrl = data?.profileImage || 'https://placehold.co/800x800/D97642/FFFFFF/webp?text=JS';

  if (loading) {
    return (
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-muted/30 scroll-animate">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="mb-16 text-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
              About Me
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
          </div>

          {/* Two-column layout */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Profile photo with decorative elements */}
            <div className="relative">
              {/* Decorative warm shape background */}
              <div
                className="absolute -top-8 -left-8 w-64 h-64 bg-secondary/20 rounded-full blur-3xl -z-10 decorative-fade-in"
                aria-hidden="true"
              />
              <div
                className="absolute -bottom-8 -right-8 w-64 h-64 bg-primary/20 rounded-full blur-3xl -z-10 decorative-fade-in"
                aria-hidden="true"
              />

              {/* Profile photo container with parallax effect */}
              <div className="relative aspect-square max-w-lg mx-auto overflow-hidden rounded-2xl shadow-2xl">
                <div className="parallax-photo parallax-element">
                  <Image
                    src={imageUrl}
                    alt="Joseph Sutorus"
                    width={800}
                    height={800}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Right: Content */}
            <div className="space-y-6">
              {content.split('\n\n').map((paragraph, index) => (
                <p
                  key={index}
                  className="text-lg md:text-xl text-foreground/90 leading-relaxed animate-fade-in-up"
                  style={{
                    animationDelay: `${index * 100}ms`
                  }}
                >
                  {paragraph}
                </p>
              ))}

              {/* Call to action */}
              <div className="pt-4">
                <a
                  href="/about"
                  className="inline-flex items-center gap-2 text-lg font-semibold text-primary hover:text-primary/80 transition-colors group"
                >
                  Learn more about my journey
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
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
