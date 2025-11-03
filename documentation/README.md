# Joseph Sutorus Blog - Documentation

Welcome to the comprehensive documentation for Joseph Sutorus's personal blog and portfolio site. This documentation will help you understand, maintain, and extend the site.

## Table of Contents

1. [Architecture Overview](./01-architecture-overview.md) - High-level system design and technology stack
2. [Folder Structure](./02-folder-structure.md) - Detailed breakdown of the project organization
3. [Content Management](./03-content-management.md) - How to add and edit content
4. [Component Architecture](./04-component-architecture.md) - Understanding the component system
5. [Styling Guide](./05-styling-guide.md) - Tailwind CSS setup and design patterns
6. [Special Features](./06-special-features.md) - Advanced features and integrations
7. [Development Workflow](./07-development-workflow.md) - Building, testing, and deploying

## Quick Start

```bash
# Install dependencies
npm install --force

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Visit [http://localhost:3000](http://localhost:3000) to view the site.

## What This Site Is

This is a personal blog and portfolio site for Joseph Sutorus featuring:

- **Media Reviews**: Book, movie, and TV show reviews with rich metadata
- **Backpacking Adventures**: Photo galleries and trip reports from wilderness adventures
- **Wedding Page**: A beautiful showcase of Joseph and Elizabeth's wedding
- **Editorial Home Page**: A warm, magazine-style landing page highlighting featured content
- **Search Functionality**: Full-text search across all content
- **Dark Mode**: System-aware theme switching

## Technology Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v3
- **Content**: Markdown with gray-matter frontmatter
- **UI Components**: Shadcn/ui (Radix UI primitives)
- **3D Graphics**: Three.js with React Three Fiber
- **Images**: Cloudinary CDN
- **Search**: Fuse.js for fuzzy search

## Key Concepts

### Static Site Generation (SSG)

This site uses Next.js's static site generation to pre-render all pages at build time. This means:
- Lightning-fast page loads
- Excellent SEO
- Can be hosted on any static hosting platform
- No server required after build

### Content-First Architecture

All content lives in markdown files and JSON data files in the `/public/data` directory:
- **Reviews**: `/public/data/_posts/Books/*.md`
- **Backpacking**: `/public/data/backpacking.json`
- **Wedding**: `/public/data/wedding.json`

### Component-Based Design

The site is built from reusable React components organized by feature:
- **Editorial**: Home page components
- **Backpacking**: Trip-related components
- **Wedding**: Wedding page components
- **Shared**: Reusable utilities
- **UI**: Shadcn components

## Project Philosophy

This site balances several goals:

1. **Personal & Warm**: Feels like visiting Joseph's home on the web
2. **Content-Rich**: Easy to add and showcase various types of content
3. **Performance**: Fast, static, optimized
4. **Maintainable**: Clear structure, well-documented
5. **Extensible**: Easy to add new features and content types

## Who Should Use This Documentation

- **Content Creators**: See [Content Management](./03-content-management.md)
- **Developers**: See [Architecture Overview](./01-architecture-overview.md) and [Component Architecture](./04-component-architecture.md)
- **Designers**: See [Styling Guide](./05-styling-guide.md)
- **System Administrators**: See [Development Workflow](./07-development-workflow.md)

## Need Help?

Each documentation page includes practical examples and troubleshooting tips. Start with the section most relevant to your task, or read through sequentially for a complete understanding of the system.

## Version Information

- **Next.js**: 15.0.2
- **React**: 19.0.0-rc
- **TypeScript**: 5.5.2
- **Tailwind CSS**: 3.4.4
- **Documentation Last Updated**: January 2025
