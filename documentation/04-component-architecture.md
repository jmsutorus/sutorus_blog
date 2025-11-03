# Component Architecture

This document explains how React components are organized, how they work together, and how to create or modify components.

## Table of Contents

- [Component Philosophy](#component-philosophy)
- [Component Categories](#component-categories)
- [Editorial Components (Home Page)](#editorial-components-home-page)
- [Backpacking Components](#backpacking-components)
- [Wedding Components](#wedding-components)
- [Shared Components](#shared-components)
- [UI Components (Shadcn)](#ui-components-shadcn)
- [Component Patterns](#component-patterns)
- [Creating New Components](#creating-new-components)

## Component Philosophy

### Design Principles

1. **Composition over Inheritance**: Build complex UIs from small, reusable pieces
2. **Single Responsibility**: Each component does one thing well
3. **Props for Flexibility**: Components accept props for customization
4. **Server-First**: Components are Server Components by default (faster, no JS)
5. **Client When Needed**: Use `'use client'` only for interactivity

### Component Hierarchy

```
Page Component (page.tsx)
├── Layout Component (layout.tsx)
│   ├── Nav
│   ├── Footer
│   └── SearchProvider
└── Feature Components
    ├── Hero Section
    ├── Content Sections
    └── CTA/Footer Sections
```

## Component Categories

### By Location

1. **Page Components** (`src/app/*/page.tsx`): Route endpoints
2. **Layout Components** (`src/app/*/layout.tsx`): Wrappers for pages
3. **Feature Components** (`src/app/_components/`): Page-specific components
4. **UI Components** (`src/components/ui/`): Reusable primitives
5. **Shared Components** (`src/app/_components/shared/`): Cross-page utilities

### By Functionality

1. **Display Components**: Show data (post cards, galleries)
2. **Layout Components**: Structure pages (containers, grids)
3. **Interactive Components**: User interactions (search, navigation)
4. **Data Components**: Fetch and process data (API wrappers)

## Editorial Components (Home Page)

Location: `src/app/_components/editorial/`

These components create the warm, magazine-style home page.

### HeroEditorial

**File:** `hero-editorial.tsx`

**Purpose:** Large, attention-grabbing hero section with featured post

**Props:**
```typescript
interface HeroEditorialProps {
  featured?: Post; // Featured post to highlight
}
```

**Structure:**
```tsx
<section className="relative">
  {/* Background gradient */}
  <div className="absolute inset-0 bg-gradient-to-br" />

  <Container>
    {/* Hero content */}
    <div className="grid lg:grid-cols-2 gap-12">
      {/* Left: Text content */}
      <div>
        <h1>Welcome Message</h1>
        <p>Tagline</p>
      </div>

      {/* Right: Featured post card */}
      {featured && (
        <UnifiedPostCard post={featured} featured />
      )}
    </div>
  </Container>
</section>
```

**Usage:**
```tsx
import { HeroEditorial } from '@/app/_components/editorial/hero-editorial';

const featuredPost = getFeaturedPosts()[0];
<HeroEditorial featured={featuredPost} />
```

### PersonalStory

**File:** `personal-story.tsx`

**Purpose:** About section with personal narrative and image

**Props:** None (reads from `public/data/about-me.json`)

**Structure:**
```tsx
<section>
  <Container>
    <div className="grid md:grid-cols-2 gap-12">
      {/* Image on left */}
      <div className="relative">
        <Image src={aboutData.image} alt="Joseph" />
      </div>

      {/* Story on right */}
      <div>
        <h2>{aboutData.title}</h2>
        <p>{aboutData.story}</p>
      </div>
    </div>
  </Container>
</section>
```

### FeaturedWriting

**File:** `featured-writing.tsx`

**Purpose:** Asymmetric grid showcasing featured posts

**Props:**
```typescript
interface FeaturedWritingProps {
  posts: Post[]; // Array of posts to display
}
```

**Structure:**
```tsx
<section>
  <Container>
    <h2>Featured Writing</h2>

    {/* Asymmetric grid */}
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* First post spans 2 columns */}
      <div className="md:col-span-2">
        <UnifiedPostCard post={posts[0]} size="large" />
      </div>

      {/* Other posts in regular grid */}
      {posts.slice(1).map(post => (
        <UnifiedPostCard key={post.slug} post={post} />
      ))}
    </div>
  </Container>
</section>
```

### CreativeShowcase

**File:** `creative-showcase.tsx`

**Purpose:** Bento-style grid highlighting hobbies and projects

**Props:** None (reads from `public/data/creative.json`)

**Structure:**
```tsx
<section>
  <Container>
    <h2>What I'm Up To</h2>

    {/* Bento grid with varied sizes */}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Large card */}
      <div className="col-span-2 row-span-2">
        <BackpackingPreview />
      </div>

      {/* Small cards */}
      <div className="col-span-1">
        <ProjectCard />
      </div>

      <div className="col-span-1">
        <ReadingCard />
      </div>
    </div>
  </Container>
</section>
```

### CTASection

**File:** `cta-section.tsx`

**Purpose:** Call-to-action banner encouraging engagement

**Props:** None

**Structure:**
```tsx
<section className="relative">
  {/* Background with muted overlay */}
  <div className="absolute inset-0 bg-muted/30" />

  <Container>
    <div className="text-center py-20">
      <h2>Let's Connect</h2>
      <p>Subscribe for updates...</p>

      <div className="flex gap-4 justify-center">
        <Button>Subscribe</Button>
        <Button variant="outline">Contact</Button>
      </div>
    </div>
  </Container>
</section>
```

## Backpacking Components

Location: `src/app/_components/backpacking/`

### BackpackingHero

**File:** `backpacking-hero.tsx`

**Purpose:** Hero section for backpacking pages

**Props:**
```typescript
interface BackpackingHeroProps {
  title: string;
  subtitle?: string;
  image: {
    url: string;
    alt: string;
    width: number;
    height: number;
  };
}
```

### TripPreviewCard

**File:** `trip-preview-card.tsx`

**Purpose:** Card showing trip summary for listings

**Props:**
```typescript
interface TripPreviewCardProps {
  trip: {
    id: string;
    name: string;
    location: string;
    dates: string;
    hero: ImageData;
    stats: TripStats;
  };
}
```

**Structure:**
```tsx
<Card>
  <Image src={trip.hero.url} alt={trip.hero.alt} />

  <CardContent>
    <h3>{trip.name}</h3>
    <p>{trip.location}</p>
    <p>{trip.dates}</p>

    <StatsBox stats={trip.stats} compact />

    <Link href={`/backpacking/${trip.id}`}>
      <Button>View Trip</Button>
    </Link>
  </CardContent>
</Card>
```

### DaySection

**File:** `day-section.tsx`

**Purpose:** Display a single day of trip itinerary

**Props:**
```typescript
interface DaySectionProps {
  day: {
    day: number;
    title: string;
    distance: string;
    elevation: string;
    highlights: string[];
    description: string;
    images: ImageData[];
  };
}
```

**Structure:**
```tsx
<section>
  <div className="flex items-center gap-4">
    <Badge>Day {day.day}</Badge>
    <h3>{day.title}</h3>
  </div>

  <div className="grid md:grid-cols-2 gap-6">
    <div>
      <h4>Stats</h4>
      <p>Distance: {day.distance}</p>
      <p>Elevation: {day.elevation}</p>

      <h4>Highlights</h4>
      <ul>
        {day.highlights.map(h => <li key={h}>{h}</li>)}
      </ul>
    </div>

    <div>
      <p>{day.description}</p>
    </div>
  </div>

  <div className="grid grid-cols-2 gap-4">
    {day.images.map(img => (
      <ImageModal key={img.url} image={img} />
    ))}
  </div>
</section>
```

### StatsBox

**File:** `stats-box.tsx`

**Purpose:** Display trip statistics in consistent format

**Props:**
```typescript
interface StatsBoxProps {
  stats: {
    distance: string;
    elevation: string;
    difficulty: string;
    duration: string;
    season?: string;
    permits?: string;
  };
  compact?: boolean; // Smaller version for cards
}
```

### GearShowcase

**File:** `gear-showcase.tsx`

**Purpose:** Display hiking gear with details

**Props:**
```typescript
interface GearShowcaseProps {
  gear: {
    big3: GearItem[];
    clothing: GearItem[];
    cooking: GearItem[];
    electronics: GearItem[];
  };
}
```

### SocialShare

**File:** `social-share.tsx`

**Purpose:** Social media sharing buttons

**Props:**
```typescript
interface SocialShareProps {
  url: string;
  title: string;
  description?: string;
}
```

**Features:**
- Share to Twitter, Facebook, LinkedIn
- Copy link to clipboard
- Uses react-share library

## Wedding Components

Location: `src/app/_components/wedding/`

### WeddingHero

**File:** `wedding-hero.tsx`

**Purpose:** Romantic hero section for wedding page

**Props:**
```typescript
interface WeddingHeroProps {
  hero: {
    title: string;
    names: string;
    date: string;
    location: string;
    image: ImageData;
    mobileImage: ImageData;
  };
}
```

**Features:**
- Responsive images (desktop/mobile)
- Elegant typography
- Subtle animations

### WeddingStorySection

**File:** `wedding-story-section.tsx`

**Purpose:** Timeline of wedding story with alternating images

**Props:**
```typescript
interface WeddingStorySectionProps {
  story: Array<{
    content: string;
    image: ImageData;
    imagePosition: 'left' | 'right';
  }>;
}
```

**Structure:**
```tsx
<section>
  {story.map((section, i) => (
    <div key={i} className={`grid md:grid-cols-2 gap-8 ${
      section.imagePosition === 'right' ? 'md:flex-row-reverse' : ''
    }`}>
      <div>
        <Image src={section.image.url} alt={section.image.alt} />
      </div>

      <div>
        <p>{section.content}</p>
      </div>
    </div>
  ))}
</section>
```

### FloatingHearts3D

**File:** `floating-hearts-3d.tsx`

**Purpose:** Three.js animated floating hearts background

**Props:**
```typescript
interface FloatingHearts3DProps {
  count?: number;    // Number of hearts (default: 20)
  opacity?: number;  // Heart opacity (default: 0.15)
}
```

**Note:** This is a Client Component using Three.js. See [Special Features](./06-special-features.md) for details.

### WeddingGallery

**File:** `wedding-gallery.tsx`

**Purpose:** Masonry-style photo gallery with lightbox

**Props:**
```typescript
interface WeddingGalleryProps {
  photos: Array<{
    url: string;
    alt: string;
    width: number;
    height: number;
    caption?: string;
  }>;
}
```

**Features:**
- Responsive masonry layout
- Click to enlarge (ImageModal)
- Captions appear on hover/tap
- Lazy loading

## Shared Components

Location: `src/app/_components/shared/`

### ImageModal

**File:** `image-modal.tsx`

**Purpose:** Lightbox for viewing images full-size

**Props:**
```typescript
interface ImageModalProps {
  image: {
    url: string;
    alt: string;
    caption?: string;
  };
  trigger?: React.ReactNode; // Custom trigger button
}
```

**Usage:**
```tsx
<ImageModal
  image={{
    url: "/path/to/image.jpg",
    alt: "Description",
    caption: "Optional caption"
  }}
/>
```

**Features:**
- Click to open full-size
- Keyboard navigation (ESC to close)
- Backdrop click to close
- Touch-friendly on mobile

### LoadingSkeleton

**File:** `loading-skeleton.tsx`

**Purpose:** Skeleton loading states

**Props:**
```typescript
interface LoadingSkeletonProps {
  variant: 'card' | 'text' | 'image' | 'list';
  count?: number;
}
```

**Usage:**
```tsx
// While loading posts
<LoadingSkeleton variant="card" count={3} />

// While loading text
<LoadingSkeleton variant="text" count={5} />
```

## UI Components (Shadcn)

Location: `src/components/ui/`

These are pre-built UI primitives from Shadcn. They're fully customizable and accessible.

### Button

**File:** `button.tsx`

**Variants:**
- `default` - Primary button
- `destructive` - Danger/delete actions
- `outline` - Secondary actions
- `ghost` - Minimal styling
- `link` - Text link style

**Sizes:**
- `sm` - Small
- `default` - Medium
- `lg` - Large
- `icon` - Square for icons

**Usage:**
```tsx
import { Button } from '@/components/ui/button';

<Button variant="default" size="lg">
  Click Me
</Button>

<Button variant="outline">
  Secondary Action
</Button>

<Button variant="ghost" size="icon">
  <Icon />
</Button>
```

### Card

**File:** `card.tsx`

**Subcomponents:**
- `Card` - Container
- `CardHeader` - Top section
- `CardTitle` - Title text
- `CardDescription` - Subtitle text
- `CardContent` - Main content
- `CardFooter` - Bottom section

**Usage:**
```tsx
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Card content goes here</p>
  </CardContent>
</Card>
```

### Dialog

**File:** `dialog.tsx`

**Purpose:** Modal dialogs

**Usage:**
```tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

<Dialog>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
    </DialogHeader>
    <p>Dialog content</p>
  </DialogContent>
</Dialog>
```

### Sheet

**File:** `sheet.tsx`

**Purpose:** Slide-out panels (used for mobile navigation)

**Usage:**
```tsx
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

<Sheet>
  <SheetTrigger asChild>
    <Button variant="ghost" size="icon">
      <MenuIcon />
    </Button>
  </SheetTrigger>
  <SheetContent side="left">
    <nav>{/* Navigation links */}</nav>
  </SheetContent>
</Sheet>
```

### Command

**File:** `command.tsx`

**Purpose:** Command palette / search interface

**Usage:**
```tsx
import { Command, CommandInput, CommandList, CommandItem } from '@/components/ui/command';

<Command>
  <CommandInput placeholder="Search..." />
  <CommandList>
    {results.map(result => (
      <CommandItem key={result.id} onSelect={() => navigate(result.url)}>
        {result.title}
      </CommandItem>
    ))}
  </CommandList>
</Command>
```

## Component Patterns

### Server vs Client Components

**Server Component** (default):
```tsx
// No 'use client' directive
export function ServerComponent() {
  // Can directly access file system, databases
  const data = await fetch(...);

  return <div>{data.title}</div>;
}
```

**Client Component** (interactive):
```tsx
'use client';

import { useState } from 'react';

export function ClientComponent() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Clicked {count} times
    </button>
  );
}
```

### Composition Pattern

Build complex UIs by composing simple components:

```tsx
// Simple components
function Card({ children }) {
  return <div className="card">{children}</div>;
}

function CardImage({ src, alt }) {
  return <Image src={src} alt={alt} />;
}

function CardContent({ children }) {
  return <div className="card-content">{children}</div>;
}

// Composed together
function PostCard({ post }) {
  return (
    <Card>
      <CardImage src={post.poster} alt={post.title} />
      <CardContent>
        <h3>{post.title}</h3>
        <p>{post.description}</p>
      </CardContent>
    </Card>
  );
}
```

### Prop Drilling vs Context

**Prop Drilling** (simple cases):
```tsx
function Parent() {
  const theme = 'dark';
  return <Child theme={theme} />;
}

function Child({ theme }) {
  return <GrandChild theme={theme} />;
}
```

**Context** (deep hierarchies):
```tsx
const ThemeContext = createContext();

function Parent() {
  return (
    <ThemeContext.Provider value="dark">
      <Child />
    </ThemeContext.Provider>
  );
}

function GrandChild() {
  const theme = useContext(ThemeContext);
  return <div className={theme}>...</div>;
}
```

### Conditional Rendering

```tsx
function Component({ items, loading, error }) {
  // Early return for loading
  if (loading) {
    return <LoadingSkeleton />;
  }

  // Early return for error
  if (error) {
    return <ErrorMessage error={error} />;
  }

  // Early return for empty
  if (items.length === 0) {
    return <EmptyState />;
  }

  // Main render
  return (
    <ul>
      {items.map(item => <li key={item.id}>{item.name}</li>)}
    </ul>
  );
}
```

### Responsive Design Pattern

```tsx
function ResponsiveComponent() {
  return (
    <div className="
      grid
      grid-cols-1        /* Mobile: 1 column */
      md:grid-cols-2     /* Tablet: 2 columns */
      lg:grid-cols-3     /* Desktop: 3 columns */
      gap-4              /* Consistent gap */
    ">
      {items.map(item => <Card key={item.id} {...item} />)}
    </div>
  );
}
```

## Creating New Components

### Step 1: Determine Component Type

**Is it interactive?**
- Yes → Client Component (`'use client'`)
- No → Server Component (default)

**Where does it belong?**
- Page-specific → `src/app/[page]/_components/`
- Reusable UI → `src/components/ui/`
- Cross-page utility → `src/app/_components/shared/`

### Step 2: Create the File

**Example:** New card component for project showcases

**File:** `src/app/_components/project-card.tsx`

```tsx
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ProjectCardProps {
  project: {
    title: string;
    description: string;
    image: string;
    tags: string[];
    url: string;
  };
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={project.url}>
      <Card className="hover:shadow-lg transition-shadow">
        <div className="relative h-48 w-full">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover rounded-t-lg"
          />
        </div>

        <CardHeader>
          <CardTitle>{project.title}</CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-muted-foreground mb-4">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.tags.map(tag => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
```

### Step 3: Add TypeScript Types

Define clear prop types:

```tsx
// For simple props
interface ComponentProps {
  title: string;
  description?: string;  // Optional
  onClick: () => void;
}

// For complex data structures
import { Post } from '@/interfaces/post';

interface PostCardProps {
  post: Post;
  featured?: boolean;
  variant?: 'default' | 'compact' | 'large';
}
```

### Step 4: Use the Component

```tsx
import { ProjectCard } from '@/app/_components/project-card';

const projects = getProjects();

export default function ProjectsPage() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {projects.map(project => (
        <ProjectCard key={project.title} project={project} />
      ))}
    </div>
  );
}
```

### Component Best Practices

1. **Single Responsibility**: One component, one job
2. **Meaningful Names**: Use descriptive names (`UserProfile` not `Component1`)
3. **Props Interface**: Always define TypeScript interfaces
4. **Default Props**: Use TypeScript defaults or destructuring defaults
5. **Accessibility**: Include ARIA labels, semantic HTML
6. **Performance**: Use `React.memo()` for expensive components
7. **Error Boundaries**: Handle errors gracefully
8. **Documentation**: Add JSDoc comments for complex props

### Example with Best Practices

```tsx
import { memo } from 'react';

/**
 * Displays a user's profile information with avatar and bio
 *
 * @param user - User object with name, avatar, and bio
 * @param compact - Optional compact view for sidebars
 */
interface UserProfileProps {
  user: {
    name: string;
    avatar: string;
    bio: string;
  };
  compact?: boolean;
}

export const UserProfile = memo(function UserProfile({
  user,
  compact = false
}: UserProfileProps) {
  return (
    <div
      className={compact ? 'flex items-center gap-2' : 'space-y-4'}
      role="article"
      aria-label={`Profile for ${user.name}`}
    >
      <Image
        src={user.avatar}
        alt={`${user.name}'s avatar`}
        width={compact ? 40 : 80}
        height={compact ? 40 : 80}
        className="rounded-full"
      />

      {!compact && (
        <div>
          <h3 className="text-lg font-semibold">{user.name}</h3>
          <p className="text-muted-foreground">{user.bio}</p>
        </div>
      )}
    </div>
  );
});
```

## Next Steps

- [Styling Guide](./05-styling-guide.md) - Learn how to style components
- [Special Features](./06-special-features.md) - Advanced features like 3D graphics
- [Development Workflow](./07-development-workflow.md) - Testing and debugging
