import { Metadata } from 'next';
import Container from '@/app/_components/container';

export const metadata: Metadata = {
  title: 'About - Joseph Sutorus',
  description: 'Learn more about Joseph Sutorus - Writer, Reviewer, and Storyteller',
};

export default function AboutPage() {
  return (
    <Container>
      <div className="py-24">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-16">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6">
              About Me
            </h1>
            <div className="w-24 h-1 bg-primary rounded-full"></div>
          </div>

          {/* Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-xl text-foreground/90 leading-relaxed mb-8">
              I'm a passionate writer and reviewer dedicated to exploring the stories that shape our culture.
              Through my work, I dive deep into film, television, and the art of storytelling itself.
            </p>

            <p className="text-xl text-foreground/90 leading-relaxed mb-8">
              What drives my writing is a genuine love for the craft and a desire to help others discover
              meaningful entertainment. I believe that great stories have the power to transform perspectives
              and connect us in profound ways.
            </p>

            <p className="text-xl text-foreground/90 leading-relaxed mb-8">
              Beyond writing, I'm constantly exploring new creative pursuits, from gaming to reading, always
              seeking inspiration in unexpected places. My goal is to create a space where thoughtful analysis
              meets authentic enthusiasm.
            </p>

            <div className="mt-16 p-8 bg-muted/30 rounded-2xl">
              <h2 className="text-3xl font-bold text-foreground mb-4">Get in Touch</h2>
              <p className="text-lg text-foreground/80 mb-6">
                Interested in collaborating or just want to chat about storytelling?
                I'd love to hear from you.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-3 text-lg font-semibold text-white bg-primary hover:bg-primary/90 rounded-lg transition-all duration-200 hover:scale-105"
              >
                Contact Me
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
              </a>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
