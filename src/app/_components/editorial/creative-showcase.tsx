'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Reading {
  title: string;
  book: string;
  author: string;
  cover: string;
  description: string;
}

interface Project {
  title: string;
  description: string;
  image: string;
  link: string;
}

interface Hobby {
  title: string;
  description: string;
  image: string;
  link: string;
}

interface CreativeData {
  reading: Reading;
  projects: Project[];
  hobbies: Hobby[];
}

/**
 * Creative showcase section with bento-grid layout
 * Displays current reading, projects, and hobbies
 * Features hover effects and floating animations
 */
export function CreativeShowcase() {
  const [data, setData] = useState<CreativeData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data/creative.json')
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading creative showcase data:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-4">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
      </section>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <section className="py-24 bg-muted/30 scroll-animate">
      <div className="container mx-auto px-4 sm:px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="mb-16 text-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
              Beyond the Blog
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Exploring creativity through books, projects, and passions.
            </p>
          </div>

          {/* Bento grid layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Currently Reading - Large card spanning 2 columns */}
            <div
              className="lg:col-span-2 lg:row-span-2 group relative overflow-hidden rounded-2xl bg-gradient-to-br from-secondary/20 to-primary/20 p-8 shadow-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl scroll-animate-delay-1"
              style={{ animationDelay: '0ms' }}
            >
              <div className="flex flex-col h-full">
                <div className="mb-6">
                  <h3 className="text-3xl font-bold text-foreground mb-2">
                    {data.reading.title}
                  </h3>
                  <div className="w-12 h-1 bg-primary rounded-full"></div>
                </div>

                <div className="flex flex-col md:flex-row gap-6 flex-grow">
                  {/* Book cover */}
                  <div className="relative w-40 h-60 flex-shrink-0 rounded-lg overflow-hidden shadow-lg">
                    <Image
                      src={data.reading.cover}
                      alt={`Cover of ${data.reading.book}`}
                      fill
                      sizes="160px"
                      className="object-cover"
                    />
                  </div>

                  {/* Book info */}
                  <div className="flex-grow space-y-4">
                    <div>
                      <h4 className="text-2xl font-bold text-foreground mb-1">
                        {data.reading.book}
                      </h4>
                      <p className="text-lg text-muted-foreground">
                        by {data.reading.author}
                      </p>
                    </div>
                    <p className="text-base text-foreground/80 leading-relaxed">
                      {data.reading.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Projects - 3 medium cards */}
            {data.projects.map((project, index) => (
              <Link
                key={project.title}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative overflow-hidden rounded-2xl shadow-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl scroll-animate-delay-${index + 2}`}
                style={{ animationDelay: `${(index + 1) * 100}ms` }}
              >
                {/* Project image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-90" />
                </div>

                {/* Project content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <h4 className="text-xl font-bold text-gray dark:text-white mb-2 group-hover:text-secondary transition-colors">
                    {project.title}
                  </h4>
                  <p className="text-sm text-gray dark:text-white line-clamp-2 mb-3">
                    {project.description}
                  </p>
                  <div className="flex items-center gap-2 text-gray dark:text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-sm font-medium">View project</span>
                    <svg
                      className="w-4 h-4 transition-transform group-hover:translate-x-1"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                    </svg>
                  </div>
                </div>
              </Link>
            ))}

            {/* Hobbies - 4 smaller cards */}
            {data.hobbies.map((hobby, index) => (
              <Link
                key={hobby.title}
                href={hobby.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative overflow-hidden rounded-2xl shadow-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl scroll-animate-delay-${index + 5}`}
                style={{ animationDelay: `${(index + 4) * 100}ms` }}
              >
                {/* Hobby image */}
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={hobby.image}
                    alt={hobby.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-90" />
                </div>

                {/* Hobby content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <h4 className="text-xl font-bold text-gray dark:text-white mb-2 group-hover:text-secondary transition-colors">
                    {hobby.title}
                  </h4>
                  <p className="text-sm text-gray dark:text-white line-clamp-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    {hobby.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
