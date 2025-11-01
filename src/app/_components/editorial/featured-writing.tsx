import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Post } from '@/interfaces/post';

interface FeaturedWritingProps {
  posts: Post[];
}

/**
 * Featured writing section with asymmetric grid layout
 * First post spans 2 rows (large), remaining posts are smaller
 * Features hover effects and stagger animations
 */
export function FeaturedWriting({ posts }: FeaturedWritingProps) {
  // Ensure we have at least 3 posts to display properly
  const displayPosts = posts.slice(0, 3);

  if (displayPosts.length === 0) {
    return null;
  }

  return (
    <section className="py-24 scroll-animate">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
              Featured Writing
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Explore my latest reviews and deep dives into the stories worth telling.
            </p>
          </div>

          {/* Asymmetric grid layout */}
          <div className="grid lg:grid-cols-3 lg:grid-rows-2 gap-6">
            {displayPosts.map((post, index) => {
              const isLarge = index === 0;

              return (
                <Link
                  key={post.slug}
                  href={`/posts/${post.slug}`}
                  className={`group relative overflow-hidden rounded-2xl shadow-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl scroll-animate-delay-${index + 1} ${
                    isLarge ? 'lg:col-span-2 lg:row-span-2' : ''
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Post image */}
                  <div className={`relative overflow-hidden ${
                    isLarge ? 'aspect-[16/10]' : 'aspect-[4/3]'
                  }`}>
                    {post.poster ? (
                      <>
                        <Image
                          src={post.poster}
                          alt={post.title}
                          fill
                          sizes={isLarge ? '(max-width: 1024px) 100vw, 66vw' : '(max-width: 1024px) 100vw, 33vw'}
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        {/* Warm gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />
                      </>
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20" />
                    )}
                  </div>

                  {/* Card content */}
                  <div className={`absolute inset-0 flex flex-col justify-end ${
                    isLarge ? 'p-8' : 'p-6'
                  }`}>
                    {/* Category badge */}
                    {post.category && (
                      <div className="mb-3">
                        <span className="inline-block px-3 py-1 text-xs font-semibold text-primary-foreground bg-primary/90 rounded-full">
                          {post.category}
                        </span>
                      </div>
                    )}

                    {/* Title */}
                    <h3 className={`font-bold text-gray dark:text-white mb-2 group-hover:text-secondary transition-colors ${
                      isLarge ? 'text-3xl md:text-4xl lg:text-5xl' : 'text-xl md:text-2xl'
                    } ${isLarge ? 'line-clamp-3' : 'line-clamp-2'}`}>
                      {post.title}
                    </h3>

                    {/* Description (only show on large card) */}
                    {isLarge && post.description && (
                      <p className="text-gray text-lg mb-4 line-clamp-2 dark:text-white">
                        {post.description}
                      </p>
                    )}

                    {/* Meta information */}
                    <div className="flex items-center gap-3 text-sm text-gray dark:text-white">
                      {/* Genre */}
                      {post.genre && (
                        <span className="font-medium">
                          {Array.isArray(post.genre) ? post.genre[0] : post.genre}
                        </span>
                      )}

                      {/* Separator */}
                      {post.genre && post.rating && <span>•</span>}

                      {/* Rating */}
                      {post.rating && (
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          {post.rating}/10
                        </span>
                      )}

                      {/* Read time placeholder */}
                      {isLarge && (
                        <>
                          <span>•</span>
                          <span>5 min read</span>
                        </>
                      )}
                    </div>

                    {/* Hover indicator */}
                    <div className="mt-4 flex items-center gap-2 text-gray dark:text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-sm font-medium">Read more</span>
                      <svg
                        className="w-4 h-4 transition-transform group-hover:translate-x-1"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                      </svg>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* View all link */}
          <div className="mt-12 text-center">
            <Link
              href="/posts"
              className="inline-flex items-center gap-2 px-8 py-3 text-lg font-semibold text-primary border-2 border-primary hover:bg-primary/10 rounded-lg transition-all duration-200 hover:scale-105"
            >
              View All Posts
              <svg
                className="w-5 h-5"
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
        </div>
      </div>
    </section>
  );
}
