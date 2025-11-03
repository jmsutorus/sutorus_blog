# Architecture Overview

This document provides a high-level overview of the site's architecture, technology choices, and how different parts of the system work together.

## Table of Contents

- [System Architecture](#system-architecture)
- [Technology Stack](#technology-stack)
- [Next.js App Router](#nextjs-app-router)
- [Static Site Generation](#static-site-generation)
- [Data Flow](#data-flow)
- [Rendering Strategy](#rendering-strategy)

## System Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────┐
│                   User's Browser                    │
└──────────────────────┬──────────────────────────────┘
                       │
                       │ Static HTML/CSS/JS
                       │
┌──────────────────────▼──────────────────────────────┐
│              Next.js Static Site                    │
│  ┌─────────────────────────────────────────────┐   │
│  │  App Router Pages (src/app/)                │   │
│  │  - page.tsx files                           │   │
│  │  - layout.tsx (Root Layout)                 │   │
│  └─────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────┐   │
│  │  React Components (src/app/_components/)    │   │
│  │  - Editorial, Wedding, Backpacking          │   │
│  └─────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────┐   │
│  │  Data Layer (src/lib/)                      │   │
│  │  - api.ts (Markdown/JSON parsing)           │   │
│  │  - search/getSearchIndex.ts                 │   │
│  └─────────────────────────────────────────────┘   │
└──────────────────────┬──────────────────────────────┘
                       │
                       │ Read at build time
                       │
┌──────────────────────▼──────────────────────────────┐
│           Content & Data Files                      │
│  - public/data/_posts/Books/*.md                    │
│  - public/data/wedding.json                         │
│  - public/data/backpacking.json                     │
│  - public/images/*                                  │
└─────────────────────────────────────────────────────┘
```

### Key Architectural Principles

1. **Static-First**: All pages are pre-rendered at build time
2. **Content Separation**: Content lives in markdown/JSON, separate from code
3. **Component Composition**: UI built from small, reusable components
4. **Type Safety**: TypeScript throughout for reliability
5. **Progressive Enhancement**: Works without JavaScript, enhanced with it

## Technology Stack

### Core Framework

**Next.js 15.0.2**
- App Router for file-based routing
- Server Components by default
- Static Site Generation (SSG)
- Built-in image optimization
- TypeScript support

### Languages

**TypeScript 5.5.2**
- Full type safety
- Better IDE support
- Catch errors at compile time

### Styling

**Tailwind CSS 3.4.4**
- Utility-first CSS framework
- Custom theme with warm earth tones
- Dark mode support (class-based)
- Responsive design utilities

**CSS Modules**
- For component-specific styles
- Used sparingly (e.g., markdown-styles.module.css)

### UI Components

**Shadcn/ui**
- Built on Radix UI primitives
- Accessible, unstyled components
- Copy-paste component library
- Components used: Button, Card, Dialog, Sheet, Separator, Avatar, etc.

**Radix UI**
- Low-level UI primitives
- Accessibility built-in
- Unstyled, fully customizable

### Content Processing

**gray-matter**
- Parse markdown frontmatter (YAML metadata)
- Extract content and metadata separately

**remark & remark-html**
- Markdown to HTML conversion
- Extensible with plugins

**Fuse.js**
- Fuzzy search library
- Powers site-wide search functionality

### 3D Graphics

**Three.js 0.181.0**
- 3D rendering library
- Used for floating hearts on wedding page

**React Three Fiber**
- React renderer for Three.js
- Declarative 3D scenes

**@react-three/drei**
- Helpers and abstractions for R3F
- Makes Three.js easier to use

### Image Management

**Cloudinary CDN**
- Remote image hosting
- Automatic optimization
- Responsive images
- Blur placeholders

**Next.js Image Component**
- Automatic image optimization
- Lazy loading
- Responsive srcset generation

### Utilities

**classnames & clsx**
- Conditional className composition
- Clean component styling logic

**tailwind-merge**
- Merge Tailwind classes intelligently
- Prevent class conflicts

**date-fns**
- Date formatting utilities
- Lightweight alternative to moment.js

## Next.js App Router

### File-System Based Routing

The App Router uses the file system to define routes:

```
src/app/
├── page.tsx                    → / (home)
├── layout.tsx                  → Root layout (wraps all pages)
├── about/
│   └── page.tsx               → /about
├── reviews/
│   └── page.tsx               → /reviews
├── posts/
│   └── [...slug]/
│       └── page.tsx           → /posts/* (catch-all route)
├── backpacking/
│   ├── page.tsx               → /backpacking
│   ├── [slug]/
│   │   └── page.tsx          → /backpacking/yosemite-2024
│   └── trips/
│       └── page.tsx          → /backpacking/trips
└── wedding/
    └── page.tsx               → /wedding
```

### Layouts

**Root Layout** (`src/app/layout.tsx`):
- Wraps all pages
- Includes `<html>` and `<body>` tags
- Contains global navigation, footer, and theme provider
- Defines site-wide metadata

### Server Components vs Client Components

**Default: Server Components**
- Run on server at build time
- No JavaScript sent to client
- Can directly access file system and databases
- Better performance

**Client Components** (marked with `'use client'`):
- Run in browser
- Can use hooks (useState, useEffect, etc.)
- Required for interactivity
- Examples: Theme switcher, search dialog, mobile nav

### Metadata API

Next.js 15 uses a `metadata` export for SEO:

```typescript
// In page.tsx
export const metadata: Metadata = {
  title: 'Page Title',
  description: 'Page description',
  openGraph: { ... },
  twitter: { ... }
};
```

## Static Site Generation

### Build Process

```
npm run build
    ↓
1. Next.js analyzes all pages
    ↓
2. Reads markdown/JSON files
    ↓
3. Generates static HTML for each route
    ↓
4. Optimizes images and assets
    ↓
5. Creates .next/out/ directory
    ↓
Ready to deploy!
```

### When Pages Are Generated

All pages are generated at build time:

1. **Static Routes**: `/`, `/about`, `/reviews`, etc.
2. **Dynamic Routes**: `/posts/Books/Red-Rising`, `/backpacking/yosemite-2024`
3. **generateStaticParams**: Tells Next.js which dynamic routes to generate

Example from `src/app/posts/[...slug]/page.tsx`:

```typescript
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug.split('/'),
  }));
}
```

### Benefits of SSG

- **Speed**: No server processing, instant page loads
- **SEO**: Fully rendered HTML for search engines
- **Hosting**: Can deploy to Vercel, Netlify, GitHub Pages, etc.
- **Reliability**: No server to crash or slow down
- **Cost**: Minimal hosting costs

### Limitations

- **Content Updates**: Requires rebuild to update content
- **No Real-time Data**: Data is from build time
- **Build Time**: Increases with number of pages

## Data Flow

### Content → Page Flow

```
1. Markdown/JSON Files
   ↓
2. src/lib/api.ts (getPostBySlug, getAllPosts)
   ↓
3. Page Component (page.tsx)
   ↓
4. Child Components (_components/)
   ↓
5. Static HTML Output
```

### Example: Review Page

```typescript
// 1. User requests /posts/Books/Red-Rising
// 2. Next.js serves pre-generated HTML

// During build, this happened:
export default async function Post({ params }) {
  // 3. api.ts reads markdown file
  const post = getPostBySlug(params.slug.join('/'));

  // 4. Converts markdown to HTML
  const content = await markdownToHtml(post.content);

  // 5. Renders components with data
  return (
    <PostHeader title={post.title} poster={post.poster} ... />
    <PostBody content={content} />
  );
}
```

### Search Index Generation

The search functionality is powered by a pre-built index:

```typescript
// src/lib/search/getSearchIndex.ts
export async function getSearchIndex() {
  // 1. Get all posts
  const allPosts = getAllUnifiedPosts();

  // 2. Build searchable index
  const searchableItems = allPosts.map(post => ({
    title: post.title,
    description: post.description,
    url: post.url,
    // ... other fields
  }));

  // 3. Return to SearchProvider
  return searchableItems;
}
```

## Rendering Strategy

### Page Types and Their Rendering

| Page Type | Route Example | Rendering Method | Data Source |
|-----------|---------------|------------------|-------------|
| Static | `/`, `/about` | SSG (Static) | Hardcoded/API |
| Dynamic | `/posts/[slug]` | SSG (Static Params) | Markdown files |
| Collection | `/reviews` | SSG (Static) | All posts |
| Data-driven | `/wedding` | SSG (Static) | JSON file |

### Hybrid Rendering

Some pages use both server and client components:

```typescript
// Server Component (default)
export default function Page() {
  const data = getStaticData(); // Server-only

  return (
    <>
      <StaticContent data={data} />
      <InteractiveComponent /> {/* Client Component */}
    </>
  );
}

// Client Component (separate file)
'use client';
export function InteractiveComponent() {
  const [state, setState] = useState();
  // Interactive logic
}
```

### CSS and Styling Strategy

**Global Styles** (`src/app/globals.css`):
- Tailwind base, components, utilities
- CSS custom properties for theming
- Global resets

**Component Styles**:
- Primarily Tailwind utility classes
- CSS Modules for complex component-specific styles
- Inline styles for dynamic values

**Theme System**:
- CSS variables defined in globals.css
- Dark mode via Tailwind's `dark:` prefix
- Toggle with `next-themes` provider

## Performance Considerations

### Optimization Strategies

1. **Static Generation**: All pages pre-rendered
2. **Image Optimization**: Next/Image with Cloudinary
3. **Code Splitting**: Automatic with Next.js
4. **Tree Shaking**: Remove unused code
5. **Minimal Client JS**: Most components are server components
6. **Font Optimization**: Self-hosted Google Fonts (Inter)

### Bundle Size

- **Main Bundle**: ~200-300 KB (compressed)
- **Three.js** (wedding page only): ~200 KB additional
- **Per-Page Bundles**: 10-50 KB
- **Total Initial Load**: ~500 KB on home page

### Loading Strategy

1. **HTML**: Immediate (cached)
2. **Critical CSS**: Inline in HTML
3. **Fonts**: Preloaded, subset for Latin
4. **Images**: Lazy loaded below fold
5. **JavaScript**: Deferred, only what's needed

## Security Considerations

### Static Site Security

- **No Server**: No server-side vulnerabilities
- **No Database**: No SQL injection risk
- **No Auth**: Public site, no authentication needed
- **HTTPS**: Always use HTTPS in production
- **CSP**: Configure Content Security Policy headers

### External Resources

All external images come from trusted sources:
- Cloudinary (wedding, backpacking photos)
- Amazon (book covers)
- PosterDB (movie posters)

Configure allowed domains in `next.config.js`:

```javascript
images: {
  remotePatterns: [
    { protocol: 'https', hostname: 'res.cloudinary.com' },
    { protocol: 'https', hostname: 'm.media-amazon.com' },
    // ... other trusted domains
  ]
}
```

## Deployment Architecture

### Build Output

```
.next/
├── static/           # Static assets (CSS, JS)
├── server/           # Server components (not used in static export)
└── out/              # Static HTML files (if using export)
```

### Deployment Targets

**Vercel (Recommended)**:
- Zero-config deployment
- Automatic HTTPS
- CDN distribution
- Preview deployments

**Other Options**:
- Netlify
- GitHub Pages (with GitHub Actions)
- AWS S3 + CloudFront
- Any static hosting

### Environment Variables

Not used for static content, but available for:
- Build-time configuration
- API keys for external services
- Feature flags

## Next Steps

- [Folder Structure](./02-folder-structure.md) - Detailed file organization
- [Content Management](./03-content-management.md) - Adding and editing content
- [Component Architecture](./04-component-architecture.md) - Component system deep dive
