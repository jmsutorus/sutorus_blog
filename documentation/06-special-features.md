# Special Features

This document covers the advanced features and integrations that make the site unique.

## Table of Contents

- [Three.js 3D Integration](#threejs-3d-integration)
- [Mobile Navigation System](#mobile-navigation-system)
- [Search Functionality](#search-functionality)
- [Theme Switching](#theme-switching)
- [Dynamic Data Loading](#dynamic-data-loading)
- [Image Optimization](#image-optimization)
- [Performance Optimizations](#performance-optimizations)

## Three.js 3D Integration

### Overview

The wedding page features floating 3D hearts rendered with Three.js and React Three Fiber.

**Location:** `src/app/_components/wedding/floating-hearts-3d.tsx`

### Implementation

```tsx
'use client';

import { Canvas } from '@react-three/fiber';
import { Float } from '@react-three/drei';

function Heart({ position }) {
  return (
    <Float
      speed={1.5}
      rotationIntensity={0.5}
      floatIntensity={0.5}
    >
      <mesh position={position}>
        {/* Heart geometry */}
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial color="#ff69b4" opacity={0.15} transparent />
      </mesh>
    </Float>
  );
}

export function FloatingHearts3D({ count = 20, opacity = 0.15 }) {
  const hearts = Array.from({ length: count }, (_, i) => ({
    position: [
      Math.random() * 20 - 10,
      Math.random() * 20 - 10,
      Math.random() * 20 - 10
    ]
  }));

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />

        {hearts.map((heart, i) => (
          <Heart key={i} position={heart.position} />
        ))}
      </Canvas>
    </div>
  );
}
```

### Key Concepts

**React Three Fiber:**
- React renderer for Three.js
- Declarative 3D scenes
- Component-based 3D objects

**drei Helpers:**
- `Float` - Floating animation
- `OrbitControls` - Camera controls (not used here)
- `PerspectiveCamera` - Camera setup

### Usage

```tsx
import { FloatingHearts3D } from '@/app/_components/wedding/floating-hearts-3d';

export default function WeddingPage() {
  return (
    <main>
      <FloatingHearts3D count={20} opacity={0.15} />
      {/* Rest of page content */}
    </main>
  );
}
```

### Performance Notes

- **Bundle Size**: Adds ~200-300 KB to bundle
- **Render Performance**: Runs at 60 FPS on modern devices
- **Mobile**: Lower particle count on small screens (recommended)
- **Z-Index**: Set to `-z-10` to stay behind content
- **Pointer Events**: `pointer-events-none` to allow clicks through

### Customization

**Change particle count:**
```tsx
<FloatingHearts3D count={30} />  // More hearts
```

**Change opacity:**
```tsx
<FloatingHearts3D opacity={0.25} />  // More visible
```

**Change color:**
```tsx
// In floating-hearts-3d.tsx
<meshStandardMaterial color="#ff1493" />  // Different pink
```

**Change animation speed:**
```tsx
<Float speed={2.0} rotationIntensity={1.0}>
```

### Adding to Other Pages

1. **Import the component:**
   ```tsx
   import { FloatingHearts3D } from '@/app/_components/wedding/floating-hearts-3d';
   ```

2. **Add to page layout:**
   ```tsx
   <div className="relative">
     <FloatingHearts3D count={15} opacity={0.1} />
     {/* Your page content */}
   </div>
   ```

3. **Ensure it's a Client Component:**
   - Page must be client component or
   - Use in a client component child

### Troubleshooting

**"Canvas is not defined" error:**
- Ensure component has `'use client'` directive
- Check that Canvas is only rendered on client

**Low FPS:**
- Reduce particle count
- Lower geometry complexity
- Check for other performance issues

## Mobile Navigation System

### Overview

The mobile navigation uses a slide-out sheet (drawer) for small screens.

**Components:**
- `src/app/_components/nav.tsx` - Main navigation
- `src/app/_components/mobile-nav.tsx` - Mobile sheet

### Implementation

```tsx
// nav.tsx
import { MobileNav } from './mobile-nav';

export function Nav() {
  return (
    <nav>
      {/* Desktop nav - hidden on mobile */}
      <div className="hidden md:flex items-center gap-6">
        <Link href="/reviews">Reviews</Link>
        <Link href="/backpacking">Backpacking</Link>
        {/* More links */}
      </div>

      {/* Mobile nav - visible on mobile */}
      <div className="md:hidden">
        <MobileNav />
      </div>

      {/* Theme switcher - always visible */}
      <ThemeSwitcher />
    </nav>
  );
}
```

```tsx
// mobile-nav.tsx
'use client';

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { MenuIcon } from 'lucide-react';

export function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <MenuIcon />
        </Button>
      </SheetTrigger>

      <SheetContent side="left">
        <nav className="flex flex-col gap-4 mt-8">
          <Link href="/" className="text-lg">Home</Link>
          <Link href="/reviews" className="text-lg">Reviews</Link>
          <Link href="/backpacking" className="text-lg">Backpacking</Link>
          {/* More links */}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
```

### Features

- **Slide-out from left**: Smooth animation
- **Backdrop click to close**: User-friendly
- **Keyboard support**: ESC to close
- **Touch-friendly**: Large tap targets
- **Accessible**: Screen reader friendly

### Customization

**Change slide direction:**
```tsx
<SheetContent side="right">  // Or "top", "bottom"
```

**Add icons to links:**
```tsx
import { HomeIcon, BookIcon } from 'lucide-react';

<Link href="/" className="flex items-center gap-2">
  <HomeIcon size={20} />
  <span>Home</span>
</Link>
```

**Add sections:**
```tsx
<SheetContent side="left">
  <div>
    <h3 className="text-sm font-semibold mb-4">Main</h3>
    <nav className="flex flex-col gap-2">
      {/* Links */}
    </nav>
  </div>

  <Separator className="my-6" />

  <div>
    <h3 className="text-sm font-semibold mb-4">Social</h3>
    {/* Social links */}
  </div>
</SheetContent>
```

## Search Functionality

### Overview

Site-wide search using fuzzy matching with Fuse.js.

**Components:**
- `src/app/_components/search-provider.tsx` - Context provider
- `src/app/_components/search-command.tsx` - Search UI
- `src/lib/search/getSearchIndex.ts` - Build search index

### How It Works

```
1. Build Time:
   - getSearchIndex() reads all content
   - Creates searchable index
   - Passes to SearchProvider

2. Runtime:
   - User presses Cmd/Ctrl+K
   - SearchCommand dialog opens
   - Fuse.js searches index
   - Results update as user types

3. Navigation:
   - User selects result
   - Navigate to post/page
   - Dialog closes
```

### Search Index Structure

```typescript
// src/lib/search/getSearchIndex.ts
export async function getSearchIndex() {
  const allPosts = getAllUnifiedPosts();

  return allPosts.map(post => ({
    id: post.slug,
    title: post.title,
    description: post.description,
    category: post.category,
    tags: post.tags,
    url: `/posts/${post.slug}`,
  }));
}
```

### Search Implementation

```tsx
// search-provider.tsx
'use client';

import { createContext, useContext } from 'react';
import Fuse from 'fuse.js';

const SearchContext = createContext(null);

export function SearchProvider({ children, searchIndex }) {
  const fuse = new Fuse(searchIndex, {
    keys: ['title', 'description', 'category', 'tags'],
    threshold: 0.3,  // 0 = exact match, 1 = match anything
  });

  return (
    <SearchContext.Provider value={{ fuse, searchIndex }}>
      {children}
    </SearchContext.Provider>
  );
}

export const useSearch = () => useContext(SearchContext);
```

```tsx
// search-command.tsx
'use client';

import { useState } from 'react';
import { useSearch } from './search-provider';
import { Command, CommandInput, CommandList, CommandItem } from '@/components/ui/command';

export function SearchCommand() {
  const [query, setQuery] = useState('');
  const { fuse } = useSearch();

  const results = query
    ? fuse.search(query).slice(0, 10)
    : [];

  return (
    <Command>
      <CommandInput
        placeholder="Search posts..."
        value={query}
        onValueChange={setQuery}
      />
      <CommandList>
        {results.map(result => (
          <CommandItem
            key={result.item.id}
            onSelect={() => {
              window.location.href = result.item.url;
            }}
          >
            <div>
              <p className="font-medium">{result.item.title}</p>
              <p className="text-sm text-muted-foreground">
                {result.item.description}
              </p>
            </div>
          </CommandItem>
        ))}
      </CommandList>
    </Command>
  );
}
```

### Keyboard Shortcut

Triggered with Cmd+K (Mac) or Ctrl+K (Windows/Linux):

```tsx
useEffect(() => {
  const down = (e: KeyboardEvent) => {
    if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      setOpen(true);
    }
  };

  document.addEventListener('keydown', down);
  return () => document.removeEventListener('keydown', down);
}, []);
```

### Customizing Search

**Adjust matching threshold:**
```typescript
const fuse = new Fuse(searchIndex, {
  threshold: 0.2,  // Stricter matching
});
```

**Change searchable fields:**
```typescript
keys: ['title', 'description', 'tags'],  // Remove 'category'
```

**Add weights to fields:**
```typescript
keys: [
  { name: 'title', weight: 2 },      // Title most important
  { name: 'description', weight: 1 },
  { name: 'tags', weight: 1.5 },
]
```

## Theme Switching

### Overview

Dark/light mode toggle with system preference detection.

**Component:** `src/app/_components/theme-switcher.tsx`

### Implementation

```tsx
'use client';

import { useState, useEffect } from 'react';
import { MoonIcon, SunIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ThemeSwitcher() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // Check localStorage or system preference
    const stored = localStorage.getItem('theme');
    const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';

    const initialTheme = stored || systemPreference;
    setTheme(initialTheme);
    document.documentElement.classList.toggle('dark', initialTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? <MoonIcon /> : <SunIcon />}
    </Button>
  );
}
```

### How It Works

1. **Initial Load**: Check localStorage or system preference
2. **Apply Theme**: Add/remove `dark` class on `<html>`
3. **Toggle**: Switch theme and save to localStorage
4. **Persistence**: Theme persists across page reloads

### Customization

**Add transition:**
```tsx
// In globals.css
* {
  transition: background-color 0.3s ease, color 0.3s ease;
}
```

**Three-way toggle (light/dark/system):**
```tsx
type Theme = 'light' | 'dark' | 'system';

const [theme, setTheme] = useState<Theme>('system');

const applyTheme = (theme: Theme) => {
  if (theme === 'system') {
    const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.classList.toggle('dark', systemPreference);
  } else {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }
};
```

## Dynamic Data Loading

### Overview

Content is loaded dynamically from JSON files at build time.

### Wedding Data

```tsx
// In page component
import weddingData from '@/public/data/wedding.json';

export default function WeddingPage() {
  return (
    <>
      <WeddingHero hero={weddingData.hero} />
      <WeddingStorySection story={weddingData.story} />
      <WeddingGallery photos={weddingData.gallery} />
    </>
  );
}
```

### Backpacking Data

```tsx
import backpackingData from '@/public/data/backpacking.json';

export default function BackpackingPage() {
  const { trips, gear } = backpackingData;

  return (
    <>
      {trips.map(trip => (
        <TripPreviewCard key={trip.id} trip={trip} />
      ))}
    </>
  );
}
```

### Reviews Data (Markdown)

```tsx
import { getAllPosts } from '@/lib/api';

export default function ReviewsPage() {
  const posts = getAllPosts();

  return (
    <>
      {posts.map(post => (
        <PostCard key={post.slug} post={post} />
      ))}
    </>
  );
}
```

### Benefits

- **Separation of Concerns**: Content separate from code
- **Easy Updates**: Non-developers can edit JSON
- **Type Safety**: TypeScript interfaces for data
- **Performance**: Data loaded at build time

## Image Optimization

### Next.js Image Component

```tsx
import Image from 'next/image';

<Image
  src="https://res.cloudinary.com/example.jpg"
  alt="Description"
  width={1920}
  height={1080}
  placeholder="blur"
  blurDataURL="data:image/..."
  priority  // For above-fold images
/>
```

### Features

- **Automatic Optimization**: WebP/AVIF when supported
- **Responsive Images**: Multiple sizes generated
- **Lazy Loading**: Below-fold images load on demand
- **Blur Placeholder**: Smooth loading experience
- **CDN Integration**: Works with Cloudinary, Imgix, etc.

### Cloudinary Integration

```tsx
// Configure in next.config.js
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'res.cloudinary.com',
      pathname: '/**',
    },
  ],
}

// Use Cloudinary transformations
const imageUrl = `https://res.cloudinary.com/dkwuzhlyz/image/upload/
  f_auto,q_auto:good,w_1200/
  v1762014835/photo.jpg`;
```

### Blur Data URL Generation

```typescript
// src/lib/cloudinary/getBlurDataUrl.ts
export function getBlurDataUrl(imageUrl: string): string {
  // Add blur transformation
  return imageUrl.replace('/upload/', '/upload/e_blur:600,f_auto,q_auto:low/');
}
```

## Performance Optimizations

### Code Splitting

Next.js automatically splits code by route:

```
Home page:      100 KB
Reviews page:   80 KB
Backpacking:    120 KB (includes JSON data)
Wedding:        150 KB (includes Three.js)
```

### Dynamic Imports

For heavy components:

```tsx
import dynamic from 'next/dynamic';

const FloatingHearts3D = dynamic(
  () => import('@/app/_components/wedding/floating-hearts-3d'),
  { ssr: false }  // Don't render on server
);

export default function Page() {
  return <FloatingHearts3D />;
}
```

### Font Optimization

```tsx
// In layout.tsx
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",  // Show fallback until loaded
  preload: true,    // Preload font
});
```

### Static Generation

All pages pre-rendered at build time = instant loads.

### Image Lazy Loading

Images below the fold automatically lazy load:

```tsx
<Image
  src="..."
  alt="..."
  loading="lazy"  // Default behavior
/>

// For above-fold images:
<Image priority />
```

### Bundle Analysis

Check bundle sizes:

```bash
npm run build
```

Output shows page sizes:
```
Route (app)          Size
┌ ○ /               5.2 kB
├ ○ /about          3.1 kB
├ ○ /reviews        12 kB
└ ○ /wedding        15 kB (+200 kB Three.js)
```

## Next Steps

- [Development Workflow](./07-development-workflow.md) - Building and deploying
- [Component Architecture](./04-component-architecture.md) - Understanding components
- [Styling Guide](./05-styling-guide.md) - Customizing appearance
