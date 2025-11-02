# Backpacking Blog Section - Implementation Plan

**Last Updated:** 2025-10-31

---

## Executive Summary

This plan details the implementation of a new backpacking/travel blog section for the sutorus_blog website. The section will showcase wilderness backpacking trips with photo galleries, detailed itineraries, trail statistics, and gear recommendations. The implementation follows the established wedding page pattern: single-page architecture, JSON-based content, server-side data loading, and editorial-style continuous scroll.

**Key Decisions:**
- **Architecture**: Single-page design (no dynamic routing) matching wedding page pattern
- **Content System**: JSON-based structured data in `public/data/backpacking.json`
- **Styling**: CSS variable theming scoped to `.backpacking-page` class
- **Components**: Reuse existing `image-modal.tsx` and `loading-skeleton.tsx`
- **UI Framework**: shadcn-ui components (Badge only new install needed)

**Timeline:** ~13 hours across 7 phases
**Complexity:** Medium (follows existing patterns, minimal new infrastructure)

---

## Current State Analysis

### Existing Architecture

**Technology Stack:**
- Next.js 15 with App Router
- TypeScript for type safety
- Tailwind CSS v3 for styling
- shadcn-ui components (New York style, RSC-enabled)
- Markdown posts with gray-matter (for blog posts)
- JSON data files (for structured content sections)

**Content Patterns:**
1. **Markdown Posts** (`_posts/` directory):
   - Movie/TV/Game reviews
   - Loaded via `src/lib/api.ts` with `fs.readFileSync`
   - Frontmatter metadata + markdown content
   - Dynamic routing via `app/posts/[...slug]/page.tsx`

2. **JSON Data Pages** (wedding, creative, about):
   - Structured content in `public/data/*.json`
   - Server-side loading with `fs.readFile` (wedding page)
   - Client-side fetch (creative showcase)
   - Single-page architecture

**Key Existing Components:**

| Component | Location | Purpose | Reusable? |
|-----------|----------|---------|-----------|
| `image-modal.tsx` | `src/app/_components/shared/` | Lightbox modal with keyboard nav | ✅ Yes |
| `loading-skeleton.tsx` | `src/app/_components/shared/` | Loading states | ✅ Yes |
| `nav.tsx` | `src/app/_components/` | Main navigation bar | ✅ Update |
| Card, Button, Badge | `src/components/ui/` | shadcn-ui components | ✅ Yes |

**Wedding Page Architecture (Our Template):**
```typescript
// src/app/wedding/page.tsx
export default async function WeddingPage() {
  // Server-side data loading
  const filePath = path.join(process.cwd(), 'public/data/wedding.json');
  const data: WeddingData = JSON.parse(await fs.readFile(filePath, 'utf-8'));

  // Single page with sequential sections
  return (
    <main className="wedding-page">
      <WeddingHero hero={data.hero} />
      {data.story.map(section => <WeddingStorySection {...section} />)}
      <WeddingGallery images={data.gallery} />
    </main>
  );
}
```

**Styling Pattern:**
```css
/* globals.css - CSS variable scoping */
.wedding-page {
  --background: 0 0% 98%;
  --primary: 18 65% 60%;
  /* ... page-specific colors */
}
```

### Current Navigation Structure

7 navigation links (approaching capacity for desktop):
- Home, Reviews, All Posts, About, Wedding, Projects, Contact

**Mobile Consideration:** Adding Backpacking makes 8 links total. Navigation should be reviewed for mobile UX.

### Gaps to Address

1. **No backpacking content** - Need complete type system, JSON data, components, and page
2. **No Badge component** - Need to install via shadcn CLI
3. **Image type compatibility** - `ImageModal` uses `WeddingImage` type, need to make compatible with `BackpackingImage`
4. **Navigation** - Need to add backpacking link strategically
5. **Color scheme** - Need earth-tone palette for outdoor aesthetic

---

## Proposed Future State

### User Experience

**Landing Page (`/backpacking`):**
- Hero section with inspiring backpacking image
- Featured trips showcase (2-3 trip preview cards)
- Each trip card links to anchor section on same page (`#alpine-lakes-traverse`)
- Full trip sections with:
  - Hero image
  - Trail statistics (sticky sidebar on desktop)
  - Narrative story
  - Day-by-day itinerary (sequential sections, no accordion)
  - Photo gallery (opens in modal)
  - Gear highlights
  - Trail tips
- Gear showcase section with categorized equipment
- Mobile-first responsive design
- Editorial continuous scroll (no tabs breaking flow)

**Visual Design:**
- Earth-tone color palette (forest green, stone gray, saddle brown)
- High-quality nature photography
- Clean typography with ample white space
- Consistent with existing editorial aesthetic
- Dark mode support

### Technical Architecture

```
/backpacking (Single Page Architecture)
│
├── Hero Section
│   ├── Full-width background image
│   ├── Title: "Backpacking Adventures"
│   └── Subtitle text
│
├── Featured Trips Grid
│   ├── Trip Preview Card 1 (links to #trip-1)
│   ├── Trip Preview Card 2 (links to #trip-2)
│   └── Trip Preview Card 3 (links to #trip-3)
│
├── Trip 1 Full Section (id="alpine-lakes-traverse")
│   ├── Trip Hero Image
│   ├── Stats Box (sticky on desktop)
│   ├── Story/Narrative
│   ├── Day 1 Section
│   ├── Day 2 Section
│   ├── Day 3 Section
│   ├── Photo Gallery Grid
│   ├── Gear Highlights
│   └── Trail Tips
│
├── Trip 2 Full Section (id="trip-2")
│   └── [Same structure]
│
└── Gear Showcase Section
    ├── Big 3 Category
    ├── Clothing Category
    ├── Cooking Category
    └── Electronics Category
```

### Data Structure

**Single JSON file:** `public/data/backpacking.json`

```json
{
  "hero": {
    "title": "Backpacking Adventures",
    "subtitle": "Exploring wilderness one trail at a time",
    "image": { /* BackpackingImage */ }
  },
  "trips": [
    {
      "id": "alpine-lakes-traverse",
      "featured": true,
      "name": "Alpine Lakes Traverse",
      "location": "Cascade Mountains, Washington",
      "dates": "August 15-17, 2024",
      "hero": { /* BackpackingImage */ },
      "stats": {
        "distance": "24.5 miles",
        "elevation": "+4,800 ft / -4,200 ft",
        "difficulty": "Moderate",
        "duration": "3 days / 2 nights",
        "season": "Late July - September",
        "permits": "Northwest Forest Pass required"
      },
      "story": "Long narrative text...",
      "itinerary": [
        {
          "day": 1,
          "title": "Trailhead to Upper Basin",
          "distance": "8.2 miles",
          "elevation": "+2,400 ft",
          "highlights": ["Old-growth forest", "Alpine meadow"],
          "description": "Day 1 narrative...",
          "images": [{ /* BackpackingImage */ }]
        }
      ],
      "photos": [{ /* Gallery images */ }],
      "gearHighlights": ["40L ultralight backpack worked perfectly"],
      "tips": ["Start early on Day 2", "Water abundant throughout"]
    }
  ],
  "gear": {
    "big3": [
      {
        "name": "Ultralight 40L Backpack",
        "category": "Backpack",
        "weight": "680g (24 oz)",
        "notes": "Frameless design, waterproof fabric"
      }
    ],
    "clothing": [],
    "cooking": [],
    "electronics": []
  }
}
```

### Component Structure

**New Components** (`src/app/_components/backpacking/`):
- `backpacking-hero.tsx` - Hero section
- `trip-preview-card.tsx` - Trip card with image, stats preview
- `trip-section.tsx` - Complete trip display
- `stats-box.tsx` - Trail statistics (sticky on desktop)
- `day-section.tsx` - Individual day itinerary
- `gear-showcase.tsx` - Categorized gear display

**Reused Components**:
- `src/app/_components/shared/image-modal.tsx` - Photo gallery modal
- `src/app/_components/shared/loading-skeleton.tsx` - Loading states

---

## Implementation Phases

### Phase 1: Foundation & Type System (Effort: M, ~1.5 hours)

**Goal:** Establish TypeScript type definitions and install required shadcn component.

#### Task 1.1: Create Type Definitions
**File:** `src/types/backpacking.ts`

**Types to Define:**
```typescript
export interface BackpackingImage {
  url: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
}

export interface TripStats {
  distance: string;
  elevation: string;
  difficulty: 'Easy' | 'Moderate' | 'Difficult' | 'Extreme';
  duration: string;
  season: string;
  permits?: string;
}

export interface DayItinerary {
  day: number;
  title: string;
  distance: string;
  elevation: string;
  highlights: string[];
  description: string;
  images?: BackpackingImage[];
}

export interface BackpackingTrip {
  id: string;
  featured: boolean;
  name: string;
  location: string;
  dates: string;
  hero: BackpackingImage;
  stats: TripStats;
  story: string;
  itinerary: DayItinerary[];
  photos: BackpackingImage[];
  gearHighlights: string[];
  tips: string[];
}

export interface GearItem {
  name: string;
  category: string;
  weight?: string;
  notes?: string;
  link?: string;
  image?: BackpackingImage;
}

export interface BackpackingData {
  hero: {
    title: string;
    subtitle: string;
    image: BackpackingImage;
  };
  trips: BackpackingTrip[];
  gear: {
    big3: GearItem[];
    clothing: GearItem[];
    cooking: GearItem[];
    electronics: GearItem[];
  };
}
```

**Acceptance Criteria:**
- ✅ File `src/types/backpacking.ts` created
- ✅ All interfaces exported and documented with JSDoc comments
- ✅ TypeScript compiles without errors (`npx tsc --noEmit`)
- ✅ Types match proposed JSON data structure exactly

**Dependencies:** None

---

#### Task 1.2: Install shadcn Badge Component
**Command:** `npx shadcn@latest add badge`

**Rationale:** Badge component needed for difficulty ratings, season tags, and trail features.

**Verification:**
- Check `src/components/ui/badge.tsx` exists after installation
- Verify import works: `import { Badge } from '@/components/ui/badge';`

**Acceptance Criteria:**
- ✅ Badge component installed in `src/components/ui/badge.tsx`
- ✅ No installation errors
- ✅ Component matches shadcn New York style
- ✅ Can import and use Badge in test component

**Dependencies:** None

**Notes:**
- Card, Button, Separator already installed - do NOT reinstall
- Tabs and Accordion NOT needed (using sequential sections, not tabbed UI)

---

### Phase 2: Data Structure & Content (Effort: M, ~1 hour)

**Goal:** Create JSON data file with one complete fictional trip example.

#### Task 2.1: Create Backpacking JSON Data File
**File:** `public/data/backpacking.json`

**Content Requirements:**
- Hero section with title, subtitle, placeholder image
- One featured trip: "Alpine Lakes Traverse"
- 3-day itinerary with highlights per day
- 8-10 placeholder images for trip
- Gear highlights (3-5 items)
- Trail tips (4-6 tips)
- Gear showcase with at least Big 3 category populated

**Placeholder Image Strategy:**
- Use `https://placehold.co/[width]x[height]/[color]/ffffff?text=[description]`
- Example: `https://placehold.co/1200x800/2d5f35/ffffff?text=Alpine+Lake`
- Color scheme: Use earth tones (#2d5f35 green, #5d4037 brown, #455a64 gray)
- Maintain realistic aspect ratios:
  - Hero: 16:9 (1920x1080 or 1600x900)
  - Gallery: Mix of 4:3 (800x600) and 3:4 (600x800)
  - Day photos: 800x600

**Acceptance Criteria:**
- ✅ File `public/data/backpacking.json` created
- ✅ JSON is valid (no syntax errors)
- ✅ Matches TypeScript interfaces exactly
- ✅ Contains realistic fictional content (not Lorem Ipsum)
- ✅ All image objects have url, alt, width, height
- ✅ Trip ID is URL-safe (lowercase, hyphens, no spaces)
- ✅ File size < 50KB

**Dependencies:**
- Task 1.1 complete (types defined for validation)

**Example Trip Narrative Style:**
> "The Alpine Lakes Traverse winds through pristine wilderness, connecting a chain of crystalline mountain lakes beneath jagged granite peaks. This three-day journey showcases the best of high-alpine scenery with wildflower meadows, challenging ridge walks, and breathtaking sunset views over distant volcanoes."

---

### Phase 3: Component Development (Effort: L, ~4 hours)

**Goal:** Build all backpacking-specific React components following wedding page patterns.

#### Task 3.1: Create Backpacking Hero Component
**File:** `src/app/_components/backpacking/backpacking-hero.tsx`

**Component Signature:**
```typescript
interface BackpackingHeroProps {
  hero: {
    title: string;
    subtitle: string;
    image: BackpackingImage;
  };
}

export function BackpackingHero({ hero }: BackpackingHeroProps) {
  // Implementation
}
```

**Implementation Requirements:**
- Full-screen hero section with background image
- Next.js Image component with `fill` and `priority`
- Dark overlay for text readability (bg-black/30 or /40)
- Centered title and subtitle
- Fade-in animation on mount
- Scroll indicator (bouncing arrow) at bottom
- Responsive text sizing (sm:text-6xl md:text-7xl lg:text-8xl pattern)

**Reference:** `src/app/_components/wedding/wedding-hero.tsx` (similar structure)

**Acceptance Criteria:**
- ✅ Component renders hero image as background
- ✅ Text is readable over images (sufficient overlay)
- ✅ Animation plays on load
- ✅ Responsive on mobile, tablet, desktop
- ✅ No Cumulative Layout Shift (CLS)
- ✅ TypeScript types correct
- ✅ Accessibility: proper heading hierarchy (h1 for title)

**Dependencies:**
- Task 1.1 complete (types)
- Task 2.1 complete (data structure)

**Estimated Time:** 30 minutes

---

#### Task 3.2: Create Trip Preview Card Component
**File:** `src/app/_components/backpacking/trip-preview-card.tsx`

**Component Signature:**
```typescript
interface TripPreviewCardProps {
  trip: BackpackingTrip;
}

export function TripPreviewCard({ trip }: TripPreviewCardProps) {
  // Implementation
}
```

**Implementation Requirements:**
- Use shadcn `Card` component
- Display trip hero image
- Show trip name, location, dates
- Preview stats (distance, difficulty, duration)
- Badge components for difficulty and season
- Link to anchor (`href={`#${trip.id}`}`) for same-page navigation
- Hover effect (scale, shadow, or border highlight)
- Responsive image sizing

**Design Pattern:**
```tsx
<a href={`#${trip.id}`} className="group">
  <Card className="overflow-hidden hover:shadow-lg transition-shadow">
    <div className="relative aspect-video">
      <Image src={trip.hero.url} alt={trip.hero.alt} fill />
    </div>
    <div className="p-4">
      <h3 className="text-2xl font-bold">{trip.name}</h3>
      <p className="text-muted-foreground">{trip.location}</p>
      <div className="flex gap-2 mt-2">
        <Badge>{trip.stats.difficulty}</Badge>
        <Badge variant="outline">{trip.stats.distance}</Badge>
      </div>
    </div>
  </Card>
</a>
```

**Acceptance Criteria:**
- ✅ Card displays trip preview information
- ✅ Clicking card scrolls to trip section (anchor link)
- ✅ Hover effect works smoothly
- ✅ Badges render correctly with appropriate variants
- ✅ Images load without CLS
- ✅ Mobile responsive (full width on small screens)

**Dependencies:**
- Task 1.1 complete (types)
- Task 1.2 complete (Badge component)

**Estimated Time:** 45 minutes

---

#### Task 3.3: Create Stats Box Component
**File:** `src/app/_components/backpacking/stats-box.tsx`

**Component Signature:**
```typescript
interface StatsBoxProps {
  stats: TripStats;
}

export function StatsBox({ stats }: StatsBoxProps) {
  // Implementation
}
```

**Implementation Requirements:**
- Display all trail statistics in clean, scannable format
- Use icons (optional, or Unicode symbols) for visual interest
- Sticky positioning on desktop (`lg:sticky lg:top-24`)
- Border and background to separate from main content
- Each stat on its own line with label and value
- Difficulty shown with colored Badge component
- Responsive: normal scroll on mobile, sticky on desktop ≥1024px

**Example Layout:**
```
┌─────────────────────────────┐
│  TRAIL STATS                │
├─────────────────────────────┤
│  📏 Distance: 24.5 miles    │
│  📈 Elevation: +4,800 ft    │
│  ⏱️  Duration: 3 days        │
│  💪 Difficulty: [Moderate]  │
│  🗓️  Season: July - Sept    │
│  🎫 Permits: NW Forest Pass │
└─────────────────────────────┘
```

**CSS for Sticky:**
```css
@media (min-width: 1024px) {
  .stats-box {
    position: sticky;
    top: 100px; /* Below nav */
    max-height: calc(100vh - 120px);
  }
}
```

**Acceptance Criteria:**
- ✅ All stats display correctly
- ✅ Sticky behavior works on desktop (scrolls with viewport)
- ✅ Normal scroll on mobile
- ✅ Difficulty badge uses appropriate color (e.g., green=Easy, yellow=Moderate, red=Difficult)
- ✅ Readable contrast ratios (WCAG AA minimum)

**Dependencies:**
- Task 1.1 complete (types)
- Task 1.2 complete (Badge)

**Estimated Time:** 30 minutes

---

#### Task 3.4: Create Day Section Component
**File:** `src/app/_components/backpacking/day-section.tsx`

**Component Signature:**
```typescript
interface DaySectionProps {
  day: DayItinerary;
}

export function DaySection({ day }: DaySectionProps) {
  // Implementation
}
```

**Implementation Requirements:**
- Display day number and title as heading (h3)
- Show distance and elevation stats
- List highlights as bullet points or badges
- Render description paragraph(s)
- Display day images if present (using Image component)
- No accordion - simple sequential layout
- Spacing between days for visual separation

**Layout:**
```
Day 1: Trailhead to Upper Basin
8.2 miles • +2,400 ft elevation

Highlights:
• Old-growth forest
• Alpine meadow
• Marmot colonies

[Description paragraph]

[Optional day images in row/grid]
```

**Acceptance Criteria:**
- ✅ Day information displays clearly
- ✅ Highlights render as styled list
- ✅ Images (if present) display without CLS
- ✅ Proper spacing between day sections
- ✅ Responsive text sizing
- ✅ Semantic HTML (h3 for day title)

**Dependencies:**
- Task 1.1 complete (types)

**Estimated Time:** 30 minutes

---

#### Task 3.5: Create Trip Section Component
**File:** `src/app/_components/backpacking/trip-section.tsx`

**Component Signature:**
```typescript
interface TripSectionProps {
  trip: BackpackingTrip;
}

export function TripSection({ trip }: TripSectionProps) {
  // Implementation
}
```

**Implementation Requirements:**
- Full section with anchor ID (`id={trip.id}`)
- Trip hero image (full-width or large)
- Two-column layout on desktop: Main content + Sticky stats sidebar
- Single column on mobile
- Sections in order:
  1. Hero image
  2. Trip name and location (h2)
  3. Story narrative
  4. Day-by-day itinerary (using DaySection components)
  5. Photo gallery grid (clickable, opens modal)
  6. Gear highlights section
  7. Trail tips section
- Use `ImageModal` from shared components for gallery
- Scroll padding for anchor links (scroll-mt-24 for nav clearance)

**Layout Structure:**
```tsx
<section id={trip.id} className="py-16 scroll-mt-24">
  {/* Hero Image */}
  <div className="relative aspect-video">
    <Image src={trip.hero.url} ... />
  </div>

  {/* Two-column layout */}
  <div className="grid lg:grid-cols-[1fr_300px] gap-8">
    {/* Main content */}
    <div>
      <h2>{trip.name}</h2>
      <p>{trip.location} • {trip.dates}</p>

      {/* Story */}
      <div className="prose">{trip.story}</div>

      {/* Itinerary */}
      <div className="space-y-8">
        {trip.itinerary.map(day => <DaySection day={day} />)}
      </div>

      {/* Gallery */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {trip.photos.map(image => /* clickable image */)}
      </div>

      {/* Gear & Tips */}
      <div>{trip.gearHighlights}</div>
      <div>{trip.tips}</div>
    </div>

    {/* Sidebar */}
    <aside>
      <StatsBox stats={trip.stats} />
    </aside>
  </div>
</section>
```

**Acceptance Criteria:**
- ✅ Complete trip section renders all subsections
- ✅ Anchor navigation works (clicking preview card scrolls here)
- ✅ Two-column layout on desktop, single on mobile
- ✅ Photo gallery clickable and opens modal
- ✅ Stats box sticky on desktop
- ✅ Proper spacing and visual hierarchy
- ✅ All images lazy load except hero

**Dependencies:**
- Task 3.3 complete (StatsBox)
- Task 3.4 complete (DaySection)
- Shared ImageModal component

**Estimated Time:** 90 minutes

---

#### Task 3.6: Create Gear Showcase Component
**File:** `src/app/_components/backpacking/gear-showcase.tsx`

**Component Signature:**
```typescript
interface GearShowcaseProps {
  gear: {
    big3: GearItem[];
    clothing: GearItem[];
    cooking: GearItem[];
    electronics: GearItem[];
  };
}

export function GearShowcase({ gear }: GearShowcaseProps) {
  // Implementation
}
```

**Implementation Requirements:**
- Section heading "Gear"
- Category tabs or sections (Big 3, Clothing, Cooking, Electronics)
- Each gear item displays:
  - Name
  - Category
  - Weight (if present)
  - Notes (if present)
  - Optional link to product
- Grid layout for gear items (2 columns mobile, 3-4 desktop)
- Card-based design with subtle borders

**Simple Approach (No Tabs):**
```tsx
<section className="py-16">
  <h2 className="text-4xl font-bold mb-8">Gear</h2>

  {/* Big 3 */}
  <div className="mb-12">
    <h3 className="text-2xl font-semibold mb-4">The Big 3</h3>
    <div className="grid md:grid-cols-3 gap-6">
      {gear.big3.map(item => <GearCard item={item} />)}
    </div>
  </div>

  {/* Repeat for other categories */}
</section>
```

**GearCard Subcomponent:**
```tsx
function GearCard({ item }: { item: GearItem }) {
  return (
    <Card className="p-4">
      <h4 className="font-semibold">{item.name}</h4>
      {item.weight && <p className="text-sm text-muted-foreground">{item.weight}</p>}
      {item.notes && <p className="text-sm mt-2">{item.notes}</p>}
    </Card>
  );
}
```

**Acceptance Criteria:**
- ✅ All gear categories display
- ✅ Gear items show all available information
- ✅ Links (if present) are external and open in new tab
- ✅ Responsive grid layout
- ✅ Clean, scannable design
- ✅ Empty categories don't break layout

**Dependencies:**
- Task 1.1 complete (types)

**Estimated Time:** 45 minutes

---

### Phase 4: Page Implementation (Effort: M, ~2.5 hours)

**Goal:** Create main backpacking page that composes all components.

#### Task 4.1: Create Backpacking Page
**File:** `src/app/backpacking/page.tsx`

**Page Structure:**
```typescript
import { BackpackingData } from '@/types/backpacking';
import fs from 'fs/promises';
import path from 'path';
import { BackpackingHero } from '@/app/_components/backpacking/backpacking-hero';
import { TripPreviewCard } from '@/app/_components/backpacking/trip-preview-card';
import { TripSection } from '@/app/_components/backpacking/trip-section';
import { GearShowcase } from '@/app/_components/backpacking/gear-showcase';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Backpacking Adventures | Joseph Sutorus',
  description: 'Wilderness backpacking trips, trail guides, and outdoor adventure stories',
  openGraph: {
    title: 'Backpacking Adventures',
    description: 'Explore wilderness trails and backpacking trips',
    type: 'website',
  },
};

export default async function BackpackingPage() {
  const filePath = path.join(process.cwd(), 'public/data/backpacking.json');

  let data: BackpackingData;
  try {
    const fileContent = await fs.readFile(filePath, 'utf-8');
    data = JSON.parse(fileContent);
  } catch (error) {
    console.error('Error loading backpacking data:', error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-serif mb-4">Coming Soon</h1>
          <p className="text-lg text-muted-foreground">
            Backpacking adventures coming soon. Check back later!
          </p>
        </div>
      </div>
    );
  }

  const featuredTrips = data.trips.filter(trip => trip.featured);

  return (
    <main className="backpacking-page">
      {/* Hero Section */}
      <BackpackingHero hero={data.hero} />

      {/* Featured Trips Preview */}
      <section className="py-16 px-4 container mx-auto">
        <h2 className="text-4xl font-bold mb-8">Featured Trips</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredTrips.map((trip) => (
            <TripPreviewCard key={trip.id} trip={trip} />
          ))}
        </div>
      </section>

      {/* Full Trip Sections */}
      {data.trips.map((trip) => (
        <TripSection key={trip.id} trip={trip} />
      ))}

      {/* Gear Showcase */}
      <GearShowcase gear={data.gear} />
    </main>
  );
}
```

**Implementation Requirements:**
- Async server component (matches wedding page pattern)
- Server-side data loading with `fs.readFile`
- Error handling with graceful fallback UI
- SEO metadata (title, description, Open Graph)
- Filter featured trips for preview section
- Render all trips as full sections
- Apply `.backpacking-page` class for scoped styling

**Acceptance Criteria:**
- ✅ Page loads successfully at `/backpacking`
- ✅ Data loads server-side (no client-side fetch)
- ✅ Error handling displays fallback if JSON missing
- ✅ All sections render in correct order
- ✅ Featured trips filter correctly
- ✅ Page metadata appears in browser tab and social shares
- ✅ No hydration errors
- ✅ TypeScript compiles without errors

**Dependencies:**
- All Phase 3 tasks complete (all components)
- Task 2.1 complete (JSON data)

**Testing Checklist:**
- [ ] Page loads without errors
- [ ] Hero displays correctly
- [ ] Featured trip cards appear
- [ ] Clicking card scrolls to trip section
- [ ] Photo gallery modal works
- [ ] Stats box is sticky on desktop
- [ ] Gear section displays
- [ ] Mobile layout works (single column)
- [ ] Error state displays if JSON deleted

**Estimated Time:** 2.5 hours (includes testing and iteration)

---

### Phase 5: Styling & Theme Integration (Effort: M, ~1.5 hours)

**Goal:** Add backpacking-specific color palette and ensure consistent styling.

#### Task 5.1: Add Backpacking Color Palette
**File:** `src/app/globals.css`

**Location:** Add after `.wedding-page` section (around line 90)

**Color Palette:**
```css
/* Backpacking Page - Earthy outdoor tones */
.backpacking-page {
  /* Light Mode */
  --background: 40 20% 98%; /* Warm off-white */
  --foreground: 160 30% 15%; /* Deep forest text */

  --primary: 160 60% 35%; /* Forest green #2E8B57 */
  --primary-foreground: 0 0% 98%;

  --secondary: 25 30% 50%; /* Stone gray #8B7355 */
  --secondary-foreground: 0 0% 98%;

  --accent: 30 45% 40%; /* Saddle brown #8B4513 */
  --accent-foreground: 0 0% 98%;

  --muted: 40 20% 92%; /* Warm light gray */
  --muted-foreground: 160 20% 35%;

  --border: 40 20% 85%;
  --ring: 160 60% 35%;
}

.backpacking-page.dark {
  /* Dark Mode */
  --background: 160 15% 10%; /* Dark forest */
  --foreground: 40 20% 90%; /* Warm light text */

  --primary: 160 50% 45%; /* Lighter forest green */
  --primary-foreground: 160 15% 10%;

  --secondary: 25 25% 55%; /* Lighter stone gray */
  --secondary-foreground: 160 15% 10%;

  --accent: 30 40% 50%; /* Lighter saddle brown */
  --accent-foreground: 160 15% 10%;

  --muted: 160 10% 20%;
  --muted-foreground: 40 15% 70%;

  --border: 160 10% 25%;
  --ring: 160 50% 45%;
}
```

**Color Rationale:**
- **Primary (Forest Green):** Evokes outdoor wilderness, hiking, nature
- **Secondary (Stone Gray):** Natural rock, mountain tones
- **Accent (Saddle Brown):** Leather, trail boots, earth
- **Background:** Warm off-white maintains editorial aesthetic
- **Foreground:** Deep forest green for text (high contrast)

**Acceptance Criteria:**
- ✅ Colors added to `globals.css`
- ✅ `.backpacking-page` class applies colors when present
- ✅ Dark mode colors defined
- ✅ Sufficient contrast ratios (WCAG AA: 4.5:1 for text)
- ✅ Colors complement existing site palette
- ✅ Test with light and dark mode toggling

**Dependencies:**
- Task 4.1 complete (page applies `.backpacking-page` class)

**Testing:**
- Use browser DevTools to check computed CSS variables
- Toggle dark mode and verify colors change appropriately
- Check text contrast with Lighthouse or contrast checker tool

**Estimated Time:** 1 hour

---

#### Task 5.2: Responsive Design Verification
**Goal:** Ensure all components work across device sizes.

**Breakpoints to Test:**
- Mobile: 375px (iPhone SE)
- Tablet: 768px (iPad portrait)
- Desktop: 1440px (standard laptop)
- Ultra-wide: 1920px+

**Mobile-First Classes to Use:**
- Grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`
- Text: `text-2xl sm:text-3xl md:text-4xl`
- Padding: `px-4 sm:px-6 lg:px-8`
- Max width: `max-w-7xl mx-auto`

**Specific Checks:**
- [ ] Stats box: sticky on desktop, normal scroll on mobile
- [ ] Trip preview grid: 1 col mobile, 2 col tablet, 3 col desktop
- [ ] Photo gallery: 2 col mobile, 3 col desktop
- [ ] Navigation: all 8 links fit (may need to check mobile menu)
- [ ] Images: no overflow on small screens
- [ ] Text: readable sizes at all breakpoints
- [ ] Spacing: consistent padding and margins

**Acceptance Criteria:**
- ✅ All layouts work on mobile, tablet, desktop
- ✅ No horizontal scroll on any device
- ✅ Touch targets ≥44px on mobile (buttons, links)
- ✅ Images scale proportionally
- ✅ Stats box behavior correct per device

**Dependencies:**
- All Phase 3 & 4 tasks complete

**Estimated Time:** 30 minutes

---

### Phase 6: Navigation Integration (Effort: S, ~0.5 hours)

**Goal:** Add backpacking link to main navigation.

#### Task 6.1: Update Navigation Component
**File:** `src/app/_components/nav.tsx`

**Change:** Add backpacking link after wedding link

**Before:**
```tsx
<Link href="/wedding">
  <Button variant="ghost" size="sm">
    Wedding
  </Button>
</Link>
<Link href="/projects">
  <Button variant="ghost" size="sm">
    Projects
  </Button>
</Link>
```

**After:**
```tsx
<Link href="/wedding">
  <Button variant="ghost" size="sm">
    Wedding
  </Button>
</Link>
<Link href="/backpacking">
  <Button variant="ghost" size="sm">
    Backpacking
  </Button>
</Link>
<Link href="/projects">
  <Button variant="ghost" size="sm">
    Projects
  </Button>
</Link>
```

**Placement Rationale:**
- After "Wedding" (another lifestyle/personal section)
- Before "Projects" (keeps professional content grouped at end)
- Total 8 nav links (manageable on desktop)

**Mobile Consideration:**
- Verify all 8 links fit in mobile navigation
- If crowded, consider grouping in dropdown or hamburger menu
- Test on actual mobile device or browser DevTools

**Acceptance Criteria:**
- ✅ Backpacking link appears in navigation
- ✅ Link navigates to `/backpacking` page
- ✅ Active state styling works (if implemented)
- ✅ Mobile navigation works with 8 links
- ✅ Link is keyboard accessible (Tab navigation)

**Dependencies:**
- Task 4.1 complete (page exists to link to)

**Estimated Time:** 30 minutes

---

### Phase 7: Testing & Quality Assurance (Effort: M, ~2 hours)

**Goal:** Comprehensive testing across functionality, responsiveness, accessibility, and performance.

#### Task 7.1: Functionality Testing

**Test Cases:**

| Test | Expected Result | Pass/Fail |
|------|----------------|-----------|
| Page loads at `/backpacking` | Page renders successfully | |
| Hero section displays | Background image and text visible | |
| Featured trip cards render | 1 or more cards display | |
| Click trip card | Smooth scroll to trip section | |
| Photo gallery click | Modal opens with image | |
| Modal keyboard nav | Arrow keys navigate, Esc closes | |
| Stats box on desktop | Sticky positioning works | |
| Stats box on mobile | Normal scroll behavior | |
| Gear section displays | All categories render | |
| Error handling | Fallback UI if JSON missing | |
| Dark mode toggle | Colors change appropriately | |

**Acceptance Criteria:**
- ✅ All test cases pass
- ✅ No console errors or warnings
- ✅ No broken images (404s)
- ✅ All links functional
- ✅ Modal interactions smooth

**Estimated Time:** 30 minutes

---

#### Task 7.2: Responsive Design Testing

**Devices to Test:**
- iPhone SE (375x667)
- iPhone 12 Pro (390x844)
- iPad (768x1024)
- Desktop 1440px
- Desktop 1920px

**Test Checklist:**
- [ ] All text readable (no overflow, appropriate sizing)
- [ ] Images scale without distortion
- [ ] Layouts adapt correctly (1/2/3 column grids)
- [ ] No horizontal scroll at any width
- [ ] Buttons and links touch-friendly (≥44px) on mobile
- [ ] Stats box behavior correct per device
- [ ] Modal usable on small screens

**Tools:**
- Browser DevTools responsive mode
- Real device testing (if available)
- Lighthouse mobile audit

**Acceptance Criteria:**
- ✅ Layouts work at 375px, 768px, 1440px, 1920px
- ✅ No layout breaks at any width
- ✅ Touch targets adequate on mobile

**Estimated Time:** 30 minutes

---

#### Task 7.3: Accessibility Testing

**Checklist:**

**Keyboard Navigation:**
- [ ] Tab through all interactive elements
- [ ] Focus indicators visible
- [ ] Modal traps focus correctly
- [ ] Esc key closes modal
- [ ] Arrow keys navigate in modal
- [ ] Skip link to main content (if applicable)

**Screen Reader:**
- [ ] Headings in logical order (h1 → h2 → h3)
- [ ] All images have alt text
- [ ] Links have descriptive text (not "click here")
- [ ] Form inputs labeled (if any)
- [ ] Modal announces opening/closing

**Color Contrast:**
- [ ] Text contrast ≥4.5:1 (WCAG AA)
- [ ] Large text ≥3:1
- [ ] Check in both light and dark mode
- [ ] Badges readable

**Tools:**
- Lighthouse accessibility audit
- axe DevTools browser extension
- WAVE accessibility checker
- Screen reader (NVDA, VoiceOver, or JAWS)

**Acceptance Criteria:**
- ✅ Lighthouse accessibility score ≥90
- ✅ No critical axe violations
- ✅ Keyboard navigation fully functional
- ✅ Screen reader announces content correctly
- ✅ Color contrast passes WCAG AA

**Estimated Time:** 45 minutes

---

#### Task 7.4: Performance Testing

**Metrics to Measure:**
- First Contentful Paint (FCP): Target <1.5s
- Largest Contentful Paint (LCP): Target <2.5s
- Total Blocking Time (TBT): Target <200ms
- Cumulative Layout Shift (CLS): Target <0.1
- Page load time: Target <3s

**Optimizations to Verify:**
- [ ] Images use Next.js Image component
- [ ] Hero image uses `priority` (no lazy load)
- [ ] Other images lazy load
- [ ] No excessive bundle size
- [ ] Server-side data loading (no client fetch delay)

**Tools:**
- Lighthouse performance audit
- Chrome DevTools Performance tab
- WebPageTest (optional)

**Acceptance Criteria:**
- ✅ Lighthouse performance score ≥80
- ✅ LCP <2.5s
- ✅ CLS <0.1 (no layout shift)
- ✅ All images optimized (WebP with JPG fallback)
- ✅ Page interactive in <3s on 4G connection

**Estimated Time:** 15 minutes

---

#### Task 7.5: TypeScript Validation

**Command:** `npx tsc --noEmit`

**Expected:** Zero TypeScript errors

**Common Issues to Check:**
- Type imports from `@/types/backpacking`
- Component prop types match
- JSON data matches interfaces
- No implicit `any` types
- No unused imports

**Acceptance Criteria:**
- ✅ TypeScript compiles with no errors
- ✅ No type warnings in IDE
- ✅ All components properly typed

**Estimated Time:** 10 minutes (assuming no errors to fix)

---

## Risk Assessment & Mitigation

### Technical Risks

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| **Image modal type incompatibility** | Medium | Medium | Use `WeddingImage` type for both, or create shared `Image` interface both extend |
| **Navigation overcrowding (8 links)** | Low | Low | Test mobile carefully; consider hamburger menu if needed |
| **Stats box sticky positioning issues** | Low | Medium | Fallback to normal positioning if sticky causes overflow |
| **Performance with large images** | Medium | Medium | Use Next.js Image optimization, lazy loading, and WebP format |
| **Dark mode color contrast** | Low | High | Test colors with contrast checker before implementation |
| **CLS from images loading** | Medium | Medium | Always specify width/height on images; use `loading="eager"` for hero |

### Implementation Risks

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| **Scope creep (adding features mid-implementation)** | Medium | Medium | Stick to plan; note future enhancements separately |
| **Time estimation too optimistic** | Medium | Low | Build in 20% buffer; prioritize MVP features |
| **Placeholder content quality** | Low | Low | Use realistic fictional content, not Lorem Ipsum |

### User Experience Risks

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| **Confusing navigation (anchor links)** | Low | Medium | Clear visual indicators; smooth scroll behavior |
| **Photo gallery modal not discoverable** | Low | Medium | Add hover effect on gallery images indicating clickability |
| **Stats box obstructs content on tablet** | Low | Medium | Test thoroughly at 768-1024px breakpoint; adjust sticky threshold if needed |

---

## Success Metrics

### Functional Metrics
- ✅ Zero TypeScript compilation errors
- ✅ Zero console errors on page load
- ✅ All navigation links functional
- ✅ All images load successfully (no 404s)
- ✅ Modal opens and closes correctly

### Quality Metrics
- ✅ Lighthouse Performance: ≥80
- ✅ Lighthouse Accessibility: ≥90
- ✅ Lighthouse Best Practices: ≥90
- ✅ Lighthouse SEO: ≥90
- ✅ Zero critical axe accessibility violations

### User Experience Metrics
- ✅ Page loads in <3 seconds on 4G
- ✅ LCP <2.5 seconds
- ✅ CLS <0.1 (no layout shift)
- ✅ Mobile usability (tap targets ≥44px)
- ✅ Smooth scroll behavior on anchor navigation

### Design Metrics
- ✅ Responsive at 375px, 768px, 1440px, 1920px
- ✅ Color contrast WCAG AA compliant
- ✅ Consistent spacing and typography
- ✅ Matches editorial aesthetic of existing site
- ✅ Dark mode fully functional

---

## Required Resources & Dependencies

### Development Environment
- Node.js 18+ (for Next.js 15)
- npm or yarn package manager
- Git for version control
- Code editor (VS Code recommended)

### External Dependencies
- None (all packages already installed)

### Tools
- shadcn CLI (for Badge component installation)
- TypeScript compiler
- Lighthouse (built into Chrome DevTools)
- axe DevTools browser extension (optional but recommended)

### Existing Codebase Dependencies
- ✅ Next.js 15 App Router
- ✅ TypeScript
- ✅ Tailwind CSS v3
- ✅ shadcn-ui (New York style, RSC)
- ✅ Radix UI (for modal components)
- ✅ Shared components: `image-modal.tsx`, `loading-skeleton.tsx`

### External Resources
- Placeholder images from placehold.co (for example content)
- (Optional) Cloudinary account for real images later

---

## Timeline Estimates

### Summary by Phase

| Phase | Tasks | Effort | Estimated Time |
|-------|-------|--------|----------------|
| Phase 1 | Foundation & Types | M | 1.5 hours |
| Phase 2 | Data Structure | M | 1.0 hour |
| Phase 3 | Component Development | L | 4.0 hours |
| Phase 4 | Page Implementation | M | 2.5 hours |
| Phase 5 | Styling & Theme | M | 1.5 hours |
| Phase 6 | Navigation Integration | S | 0.5 hours |
| Phase 7 | Testing & QA | M | 2.0 hours |
| **TOTAL** | **24 tasks** | — | **~13 hours** |

### Suggested Schedule

**Option A: Single Sprint (2-3 days)**
- Day 1: Phases 1-3 (Foundation, Data, Components) - ~6.5 hours
- Day 2: Phases 4-5 (Page, Styling) - ~4 hours
- Day 3: Phases 6-7 (Navigation, Testing) - ~2.5 hours

**Option B: Weekend Project**
- Saturday AM: Phases 1-2 (~2.5 hours)
- Saturday PM: Phase 3 (~4 hours)
- Sunday AM: Phases 4-5 (~4 hours)
- Sunday PM: Phases 6-7 (~2.5 hours)

**Option C: Extended Timeline (1 week, part-time)**
- Session 1: Phase 1 (1.5 hours)
- Session 2: Phase 2 (1 hour)
- Session 3: Phase 3 (4 hours - longest phase)
- Session 4: Phase 4 (2.5 hours)
- Session 5: Phase 5 (1.5 hours)
- Session 6: Phases 6-7 (2.5 hours)

### Buffer Recommendations
- Add 20% buffer for unexpected issues: 13 hours × 1.2 = **~15.6 hours total**
- Plan for breaks and context switching
- Allow time for code review and iterations

---

## Future Enhancements (Post-MVP)

**Not included in this plan, but valuable additions later:**

1. **Multiple Trips:** Add 2-3 more backpacking trips to showcase variety
2. **Trip Filtering:** Filter trips by difficulty, location, season, or distance
3. **Map Integration:** Embed interactive maps (AllTrails, Gaia GPS, or custom)
4. **GPX Downloads:** Offer downloadable GPS tracks for trips
5. **Social Sharing:** Add share buttons with Open Graph tags
6. **Comments:** Enable comments or trip reports from readers
7. **Structured Data:** Add schema.org TouristTrip JSON-LD for SEO
8. **Search Functionality:** Search across trip names, locations, features
9. **Related Trips:** "Similar Trips" recommendations at bottom of sections
10. **Newsletter Signup:** Capture emails for trip update notifications
11. **Print-Friendly View:** CSS for printing trip details
12. **Comparison Tool:** Compare multiple trips side-by-side

---

## Conclusion

This implementation plan provides a comprehensive roadmap for adding a backpacking blog section to the sutorus_blog website. By following the established wedding page pattern, we minimize complexity and ensure consistency with existing code. The single-page architecture, JSON-based content, and component reuse make this a maintainable and scalable solution.

**Key Success Factors:**
1. **Follow existing patterns** - Wedding page is our blueprint
2. **Reuse components** - Don't rebuild what exists (image-modal, loading-skeleton)
3. **TypeScript-first** - Define types before implementation
4. **Mobile-first** - Design for smallest screens, enhance for larger
5. **Test thoroughly** - Functionality, accessibility, performance
6. **Keep it simple** - Resist feature creep; stick to MVP

With careful execution across the 7 phases and 24 detailed tasks, the backpacking section will seamlessly integrate into the existing site while providing an engaging, accessible, and performant user experience for showcasing wilderness adventures.

---

**Document Version:** 1.0
**Last Updated:** 2025-10-31
**Next Review:** Upon completion of Phase 3 (reassess timeline and scope)
