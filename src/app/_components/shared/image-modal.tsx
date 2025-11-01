'use client';

import * as Dialog from '@radix-ui/react-dialog';
import Image from 'next/image';
import { useEffect } from 'react';
import { WeddingImage } from '@/types/wedding';

interface ImageModalProps {
  images: WeddingImage[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (direction: 'prev' | 'next') => void;
}

export function ImageModal({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
}: ImageModalProps) {
  const currentImage = images[currentIndex];

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        onNavigate('prev');
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        onNavigate('next');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onNavigate]);

  if (!currentImage) return null;

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        {/* Overlay */}
        <Dialog.Overlay className="fixed inset-0 bg-black/90 z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />

        {/* Content */}
        <Dialog.Content
          className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 w-[95vw] h-[95vh] max-w-7xl focus:outline-none"
          onEscapeKeyDown={onClose}
        >
          <div className="relative w-full h-full flex flex-col items-center justify-center">
            {/* Close Button */}
            <Dialog.Close
              className="absolute top-4 right-4 rounded-full bg-white/10 p-2 hover:bg-white/20 transition-colors z-10 focus:outline-none focus:ring-2 focus:ring-white/50"
              aria-label="Close modal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-white"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </Dialog.Close>

            {/* Image Counter */}
            <div className="absolute top-4 left-4 bg-black/50 text-white px-4 py-2 rounded-full text-sm z-10">
              {currentIndex + 1} / {images.length}
            </div>

            {/* Previous Button */}
            {currentIndex > 0 && (
              <button
                onClick={() => onNavigate('prev')}
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
                aria-label="Previous image"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white"
                >
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
            )}

            {/* Next Button */}
            {currentIndex < images.length - 1 && (
              <button
                onClick={() => onNavigate('next')}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
                aria-label="Next image"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white"
                >
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            )}

            {/* Main Image */}
            <div className="relative w-full h-full flex items-center justify-center p-16">
              <Image
                src={currentImage.url}
                alt={currentImage.alt}
                width={currentImage.width}
                height={currentImage.height}
                className="max-w-full max-h-full object-contain"
                priority
              />
            </div>

            {/* Caption */}
            {currentImage.caption && (
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/70 text-white px-6 py-3 rounded-lg max-w-2xl text-center">
                <Dialog.Description className="text-sm">
                  {currentImage.caption}
                </Dialog.Description>
              </div>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
