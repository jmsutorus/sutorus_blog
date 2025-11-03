# Folder Structure Guide

This document provides a complete breakdown of the project's folder structure, explaining the purpose of each directory and key files.

## Table of Contents

- [Root Directory](#root-directory)
- [Source Directory (src/)](#source-directory-src)
- [Public Directory (public/)](#public-directory-public)
- [Configuration Files](#configuration-files)
- [File Naming Conventions](#file-naming-conventions)

## Root Directory

```
sutorus_blog/
├── .claude/              # Claude AI assistant development documentation
├── .next/                # Next.js build output (generated, gitignored)
├── .vscode/              # VS Code editor settings
├── dev/                  # Development planning and task tracking
├── documentation/        # This documentation you're reading
├── node_modules/         # Dependencies (generated, gitignored)
├── public/               # Static assets and content files
├── src/                  # Source code
├── .gitignore            # Git ignore patterns
├── .mcp.json             # MCP server configuration
├── components.json       # Shadcn UI configuration
├── next.config.js        # Next.js configuration
├── next-env.d.ts         # Next.js TypeScript declarations
├── package.json          # Dependencies and scripts
├── package-lock.json     # Locked dependency versions
├── postcss.config.js     # PostCSS configuration (for Tailwind)
├── README.md             # Project readme
├── tailwind.config.ts    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
└── tsconfig.tsbuildinfo  # TypeScript incremental build cache
```

### Key Root Files

**next.config.js**
- Configures Next.js behavior
- Defines allowed image domains
- Webpack customizations

**tailwind.config.ts**
- Tailwind CSS theme configuration
- Custom colors, fonts, spacing
- Dark mode configuration

**tsconfig.json**
- TypeScript compiler options
- Path aliases (@/app, @/lib, etc.)
- Include/exclude patterns

**components.json**
- Shadcn UI configuration
- Component installation settings
- Tailwind CSS class prefix

## Source Directory (src/)

```
src/
├── app/                  # Next.js App Router pages and layouts
├── components/           # Shared UI components (Shadcn)
├── hooks/                # Custom React hooks
├── interfaces/           # TypeScript interfaces
├── lib/                  # Utility functions and data access
└── types/                # TypeScript type definitions
```

### app/ - Application Pages

```
src/app/
├── _components/          # Page-specific components (private)
│   ├── animations/       # Animation components
│   ├── backpacking/      # Backpacking-related components
│   ├── editorial/        # Home page editorial components
│   ├── shared/           # Shared utility components
│   └── wedding/          # Wedding page components
├── about/                # About page
│   └── page.tsx
├── backpacking/          # Backpacking section
│   ├── [slug]/           # Individual trip pages
│   │   └── page.tsx
│   ├── trips/            # All trips listing
│   │   └── page.tsx
│   └── page.tsx          # Backpacking home
├── contact/              # Contact page
│   └── page.tsx
├── database/             # All posts database view
│   ├── _components/
│   │   └── database-table.tsx
│   └── page.tsx
├── posts/                # Individual review pages
│   └── [...slug]/        # Catch-all route for nested paths
│       └── page.tsx
├── projects/             # Projects page (placeholder)
│   └── page.tsx
├── reviews/              # Reviews listing page
│   └── page.tsx
├── styles/               # Global styles
│   └── animations.css
├── wedding/              # Wedding page
│   └── page.tsx
├── globals.css           # Global CSS and Tailwind imports
├── layout.tsx            # Root layout (wraps all pages)
└── page.tsx              # Home page
```

#### Understanding _components/

The `_components` directory (prefixed with underscore) is private to the app/ directory:

**animations/**
- `animated-gradient.tsx` - Gradient animation effect

**backpacking/**
- `backpacking-hero.tsx` - Hero section for backpacking pages
- `day-section.tsx` - Day-by-day itinerary display
- `gear-showcase.tsx` - Gear list display
- `social-share.tsx` - Social media sharing buttons
- `stats-box.tsx` - Trip statistics display
- `trip-preview-card.tsx` - Trip card for listings
- `trip-section.tsx` - Main trip content layout

**editorial/** (Home page components)
- `creative-showcase.tsx` - Bento grid showcasing hobbies/projects
- `cta-section.tsx` - Call-to-action banner
- `featured-writing.tsx` - Featured posts grid
- `hero-editorial.tsx` - Home page hero section
- `personal-story.tsx` - About section on home page

**shared/**
- `image-modal.tsx` - Lightbox for images
- `loading-skeleton.tsx` - Loading state placeholder

**wedding/**
- `floating-hearts-3d.tsx` - Three.js floating hearts effect
- `wedding-gallery.tsx` - Photo gallery component
- `wedding-hero.tsx` - Wedding page hero
- `wedding-story-section.tsx` - Story timeline
- `wedding-thanks-section.tsx` - Thank you section

**Other Components** (in app/_components/):
- `alert.tsx` - Alert/notification component
- `avatar.tsx` - User avatar display
- `container.tsx` - Page width container
- `cover-image.tsx` - Post cover image
- `date-formatter.tsx` - Date formatting utility
- `footer.tsx` - Site footer
- `header.tsx` - Site header (legacy, replaced by nav)
- `hero-post.tsx` - Featured post hero
- `intro.tsx` - Page introduction sections
- `mobile-nav.tsx` - Mobile navigation sheet
- `more-stories.tsx` - Post grid
- `nav.tsx` - Main navigation bar
- `post-body.tsx` - Markdown content renderer
- `post-header.tsx` - Individual post header
- `post-preview.tsx` - Post card
- `post-title.tsx` - Post title component
- `reviews-grid.tsx` - Reviews grid layout
- `search-command.tsx` - Search dialog (Cmd+K)
- `search-provider.tsx` - Search context provider
- `section-separator.tsx` - Visual separator
- `theme-switcher.tsx` - Dark/light mode toggle
- `unified-post-card.tsx` - Generic post card

### components/ - Shared UI Components

```
src/components/
└── ui/                   # Shadcn UI components
    ├── avatar.tsx
    ├── badge.tsx
    ├── button.tsx
    ├── card.tsx
    ├── command.tsx       # Command palette base
    ├── dialog.tsx
    ├── pagination.tsx
    ├── separator.tsx
    ├── sheet.tsx         # Slide-out panel
    └── table.tsx
```

These are generic UI primitives from Shadcn that can be used anywhere. They're built on Radix UI and fully customizable.

### hooks/ - Custom React Hooks

```
src/hooks/
└── usePageTracking.ts    # Page view tracking hook
```

Custom hooks for reusable stateful logic.

### interfaces/ - TypeScript Interfaces

```
src/interfaces/
└── post.ts               # Post type definition
```

**post.ts** defines the Post interface:

```typescript
export type Post = {
  slug: string;           // URL slug
  title: string;          // Derived from filename
  category: string;       // Books, Movies, etc.
  poster: string;         // Cover image URL
  length: string;         // Runtime/page count
  genre: string | string[]; // Genre(s)
  released: string | Date;  // Release date
  cast: string[];         // Authors/actors
  description: string;    // Plot/summary
  completed: string | Date; // When finished
  tags: string[];         // Custom tags
  rating: number;         // User rating
  content: string;        // Main review content
  ogImage?: { url: string }; // Social sharing image
  featured?: boolean;     // Show on home page
};
```

### lib/ - Utility Functions and Data Access

```
src/lib/
├── cloudinary/           # Cloudinary integration
│   └── getBlurDataUrl.ts # Generate blur placeholders
├── search/               # Search functionality
│   ├── getSearchIndex.ts # Build search index
│   └── recentPages.ts    # Recent pages tracking
├── api.ts                # Main data access layer
├── constants.ts          # Site constants
├── getAllUnifiedPosts.ts # Combine all post types
├── markdownToHtml.ts     # Markdown conversion
└── utils.ts              # General utilities
```

#### Key Library Files

**api.ts** - Primary data access:
- `getPostSlugs()` - Get all markdown filenames
- `getPostBySlug(slug)` - Read and parse single post
- `getAllPosts()` - Get all posts with metadata
- `getPostsByCategory(category)` - Filter by category
- `getFeaturedPosts()` - Get featured posts for home page

**getAllUnifiedPosts.ts** - Combines different content types:
- Reviews (from markdown)
- Backpacking trips (from JSON)
- Future: other content types

**markdownToHtml.ts** - Converts markdown to HTML:
- Uses remark and remark-html
- Processes markdown content from posts

**constants.ts** - Site-wide constants:
- `CMS_NAME` - Content management system name
- `HOME_OG_IMAGE_URL` - Default social sharing image
- Other configuration values

### types/ - TypeScript Type Definitions

```
src/types/
├── backpacking.ts        # Backpacking trip types
└── wedding.ts            # Wedding data types
```

Type definitions for structured JSON data.

## Public Directory (public/)

```
public/
├── assets/               # Static assets
│   └── blog/
│       └── authors/      # Author profile images
├── data/                 # Content data files
│   ├── _posts/           # Markdown blog posts
│   │   └── Books/        # Book reviews
│   ├── about-me.json     # About page content
│   ├── backpacking.json  # Backpacking trips data
│   ├── creative.json     # Creative projects data
│   └── wedding.json      # Wedding page content
├── favicon/              # Favicon files
└── images/               # Static images
```

### data/ - Content Files

**_posts/Books/** - Book reviews as markdown:
```
_posts/Books/
├── Red-Rising.md
├── Golden-Son.md
├── Morning-Star.md
└── ... (more book reviews)
```

Each markdown file has frontmatter (metadata) and content:

```markdown
---
completed: 2025-01-22T00:00:00.000Z
released: null
genre:
  - Fiction
title: Red Rising
poster: 'https://m.media-amazon.com/images/I/81wGzzxqHSL.jpg'
authors: '[[Pierce Brown]]'
description: 'Book description...'
tags:
  - books
  - red_rising
rating: 6.5
finished: true
category: Books
---

### Summary

Review content in markdown...
```

**backpacking.json** - Structured backpacking data:
```json
{
  "hero": { ... },
  "trips": [
    {
      "id": "yosemite-2024",
      "name": "Cathedral Lakes to Yosemite Valley",
      "location": "Yosemite, California",
      "stats": { ... },
      "itinerary": [ ... ],
      "photos": [ ... ]
    }
  ],
  "gear": { ... }
}
```

**wedding.json** - Wedding page content:
```json
{
  "hero": { ... },
  "story": [
    { "content": "...", "image": { ... } }
  ],
  "gallery": [ ... ]
}
```

### favicon/ - Favicon Assets

All favicon variations for different platforms:
- `favicon.ico` - Classic favicon
- `apple-touch-icon.png` - iOS home screen
- `android-chrome-*.png` - Android devices
- `site.webmanifest` - Web app manifest
- `browserconfig.xml` - Windows tiles

## Configuration Files

### Next.js Configuration

**next.config.js**:
```javascript
module.exports = {
  images: {
    remotePatterns: [
      // Allowed image domains
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'm.media-amazon.com' },
      // ... more domains
    ],
  },
  webpack(config) {
    // Webpack customizations
    config.resolve.fallback = { fs: false };
    return config;
  },
};
```

### Tailwind Configuration

**tailwind.config.ts**:
```typescript
const config: Config = {
  darkMode: ["class", "class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: { ... },
      fontSize: { ... },
      // Custom theme values
    }
  },
  plugins: [require("tailwindcss-animate")],
};
```

### TypeScript Configuration

**tsconfig.json**:
```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "jsx": "preserve",
    "module": "esnext",
    "moduleResolution": "bundler",
    "paths": {
      "@/*": ["./src/*"]
    },
    // ... more options
  }
}
```

The `paths` setting allows you to import with `@/`:
```typescript
import { Post } from '@/interfaces/post';
import { getAllPosts } from '@/lib/api';
```

## File Naming Conventions

### Pages

- `page.tsx` - Route page component
- `layout.tsx` - Layout wrapper
- `loading.tsx` - Loading state
- `error.tsx` - Error boundary
- `not-found.tsx` - 404 page

### Components

- **PascalCase** for component files: `HeroPost.tsx`, `SearchCommand.tsx`
- **camelCase** for utility files: `getAllPosts.ts`, `usePageTracking.ts`
- **kebab-case** for CSS modules: `markdown-styles.module.css`

### Content Files

- **kebab-case** for markdown: `red-rising.md`, `the-dark-knight.md`
- **camelCase** for JSON: `backpacking.json`, `about-me.json`

### Directories

- **lowercase** for routes: `app/backpacking/`, `app/posts/`
- **_prefixed** for private: `app/_components/`
- **PascalCase** for categories: `_posts/Books/`

## Import Paths

The project uses TypeScript path aliases for cleaner imports:

```typescript
// Instead of:
import { Post } from '../../../interfaces/post';

// You can use:
import { Post } from '@/interfaces/post';
```

Available aliases:
- `@/app` → `src/app`
- `@/components` → `src/components`
- `@/lib` → `src/lib`
- `@/interfaces` → `src/interfaces`
- `@/types` → `src/types`
- `@/hooks` → `src/hooks`

## Directory Best Practices

### Adding New Pages

1. Create directory in `src/app/`
2. Add `page.tsx` file
3. Optionally add `layout.tsx` for page-specific layout
4. Create `_components/` subdirectory for page-specific components

### Adding New Components

**Shared UI Component** (reusable everywhere):
```
src/components/ui/new-component.tsx
```

**Page-Specific Component**:
```
src/app/[page-name]/_components/new-component.tsx
```

### Adding New Content

**Review/Post**:
```
public/data/_posts/[Category]/title-slug.md
```

**JSON Data**:
```
public/data/new-section.json
```

Then create corresponding TypeScript types in `src/types/`.

## Next Steps

- [Content Management](./03-content-management.md) - Learn how to add and edit content
- [Component Architecture](./04-component-architecture.md) - Deep dive into components
- [Development Workflow](./07-development-workflow.md) - Building and deploying
