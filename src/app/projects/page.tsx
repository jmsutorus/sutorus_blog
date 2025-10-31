import { Metadata } from 'next';
import Container from '@/app/_components/container';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Projects - Joseph Sutorus',
  description: 'Explore projects and creative work by Joseph Sutorus',
};

export default function ProjectsPage() {
  const projects = [
    {
      title: 'Film & TV Review Blog',
      description: 'A comprehensive platform for thoughtful reviews and analysis of contemporary entertainment, built with Next.js and modern web technologies.',
      tags: ['Next.js', 'TypeScript', 'Tailwind CSS'],
      status: 'Active',
    },
    {
      title: 'Database of Reviews',
      description: 'An organized collection of all my reviews, featuring advanced filtering and search capabilities to help readers discover content.',
      tags: ['React', 'TypeScript', 'Data Management'],
      status: 'Active',
    },
  ];

  return (
    <Container>
      <div className="py-24">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-16">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6">
              Projects
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              A collection of creative projects and experiments exploring storytelling,
              technology, and design.
            </p>
            <div className="w-24 h-1 bg-primary rounded-full mt-6"></div>
          </div>

          {/* Projects Grid */}
          <div className="grid gap-8 mb-16">
            {projects.map((project, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl bg-muted/30 p-8 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-3xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <span className="px-3 py-1 text-sm font-semibold text-primary-foreground bg-primary rounded-full">
                    {project.status}
                  </span>
                </div>

                <p className="text-lg text-foreground/80 mb-6 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 text-sm font-medium text-foreground bg-muted rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="mt-16 p-8 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Want to Collaborate?
            </h2>
            <p className="text-lg text-foreground/80 mb-6 max-w-2xl mx-auto">
              I'm always interested in new creative projects and collaborations.
              Let's build something great together.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3 text-lg font-semibold text-white bg-primary hover:bg-primary/90 rounded-lg transition-all duration-200 hover:scale-105"
            >
              Get in Touch
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
    </Container>
  );
}
