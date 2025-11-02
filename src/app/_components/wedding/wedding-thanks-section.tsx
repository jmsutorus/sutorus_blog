import Container from '@/app/_components/container';

export function WeddingThanksSection() {
  return (
    <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-br from-rose-50 via-pink-50 to-rose-100">
      <Container>
        <div className="max-w-4xl mx-auto text-center">
          {/* Decorative element */}
          <div className="mb-8 flex justify-center">
            <svg
              className="w-12 h-12 text-rose-400"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>

          {/* Main heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-rose-950 mb-6 sm:mb-8">
            Thank You
          </h2>

          {/* Thank you message */}
          <div className="space-y-6">
            <p className="text-lg sm:text-xl md:text-2xl leading-relaxed text-rose-900/90 font-light">
              To our families and friends who joined us to celebrate our special day
            </p>
            <p className="text-base sm:text-lg md:text-xl leading-relaxed text-rose-800/80 max-w-3xl mx-auto">
              Your presence made our wedding day more beautiful than we ever imagined.
              The love, laughter, and joy you brought filled our hearts to overflowing.
              Thank you for traveling near and far, for your thoughtful gifts, for the
              tears of happiness, the endless dancing, and the memories we&apos;ll cherish forever.
            </p>
            <p className="text-base sm:text-lg md:text-xl leading-relaxed text-rose-800/80 max-w-3xl mx-auto">
              We are so grateful to have each of you in our lives. Your love and support
              mean everything to us as we begin this new chapter together.
            </p>
          </div>

          {/* Signature */}
          <div className="mt-10 sm:mt-12">
            <p className="text-2xl sm:text-3xl font-serif text-rose-900 italic">
              With all our love,
            </p>
            <p className="text-3xl sm:text-4xl font-serif text-rose-950 mt-2">
              Joseph & Elizabeth
            </p>
          </div>

          {/* Decorative element */}
          <div className="mt-8 flex justify-center">
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-rose-400 to-transparent rounded-full" />
          </div>
        </div>
      </Container>
    </section>
  );
}
