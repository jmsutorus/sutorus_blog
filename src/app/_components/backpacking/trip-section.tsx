'use client';

import Image from 'next/image';
import { useState } from 'react';
import { BackpackingTrip } from '@/types/backpacking';
import { StatsBox } from './stats-box';
import { DaySection } from './day-section';
import { ImageModal } from '@/app/_components/shared/image-modal';

interface TripSectionProps {
  trip: BackpackingTrip;
}

export function TripSection({ trip }: TripSectionProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
    setModalOpen(true);
  };

  const handleNavigate = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    } else if (direction === 'next' && currentImageIndex < trip.photos.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {/* Trip Hero Image */}
        <div className="relative mb-8 aspect-video overflow-hidden rounded-lg">
          <Image
            src={trip.hero.url}
            alt={trip.hero.alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
          />
        </div>

        {/* Two-column layout: Main content + Sidebar */}
        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          {/* Main Content */}
          <div className="space-y-12">
            {/* Trip Header */}
            <div>
              <h2 className="mb-2 font-serif text-4xl font-bold md:text-5xl">
                {trip.name}
              </h2>
              <p className="text-lg text-muted-foreground">
                {trip.location} • {trip.dates}
              </p>
            </div>

            {/* Story */}
            <div className="prose prose-lg max-w-none dark:prose-invert">
              <p>{trip.story}</p>
            </div>

            {/* Itinerary */}
            <div>
              <h3 className="mb-6 text-3xl font-bold">Day-by-Day Itinerary</h3>
              <div className="space-y-8">
                {trip.itinerary.map((day) => (
                  <DaySection key={day.day} day={day} />
                ))}
              </div>
            </div>

            {/* Photo Gallery */}
            <div>
              <h3 className="mb-6 text-3xl font-bold">Photo Gallery</h3>
              <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
                {trip.photos.map((photo, index) => (
                  <button
                    key={index}
                    onClick={() => handleImageClick(index)}
                    className="group relative aspect-square overflow-hidden rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  >
                    <Image
                      src={photo.url}
                      alt={photo.alt}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />
                  </button>
                ))}
              </div>
            </div>

            {/* Gear Highlights */}
            {trip.gearHighlights && trip.gearHighlights.length > 0 && (
              <div>
                <h3 className="mb-4 text-3xl font-bold">Gear Highlights</h3>
                <ul className="space-y-2">
                  {trip.gearHighlights.map((highlight, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-primary">✓</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Trail Tips */}
            {trip.tips && trip.tips.length > 0 && (
              <div>
                <h3 className="mb-4 text-3xl font-bold">Trail Tips</h3>
                <ul className="space-y-2">
                  {trip.tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-primary">💡</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Sidebar with Stats */}
          <StatsBox stats={trip.stats} />
        </div>
      </div>

      {/* Image Modal */}
      <ImageModal
        images={trip.photos}
        currentIndex={currentImageIndex}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onNavigate={handleNavigate}
      />
    </section>
  );
}
