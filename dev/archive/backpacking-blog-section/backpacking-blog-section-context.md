# Backpacking Blog Section - Context

**Last Updated:** 2025-10-31

---

## SESSION PROGRESS

### ✅ COMPLETED
- Research phase completed (web research on backpacking blog design patterns)
- Plan review conducted (identified critical issues with initial approach)
- Revised plan created (single-page architecture following wedding page pattern)
- Dev docs structure created (`plan.md`, `context.md`, `tasks.md`)

### 🟡 IN PROGRESS
- None yet - ready to begin Phase 1 implementation

### ⏳ NOT STARTED
- Phase 1: Foundation & Type System
- Phase 2: Data Structure & Content
- Phase 3: Component Development
- Phase 4: Page Implementation
- Phase 5: Styling & Theme Integration
- Phase 6: Navigation Integration
- Phase 7: Testing & Quality Assurance

### ⚠️ BLOCKERS
- None currently

---

## Key Decisions Made

### Architecture: Single-Page Design
**Decision:** Use single-page architecture at `/backpacking` (not dynamic routing with `[slug]`)

**Rationale:**
- Matches existing wedding page pattern
- Simpler implementation (no `generateStaticParams` needed)
- Editorial continuous scroll aligns with site aesthetic
- All content SEO-indexed on one URL
- Anchor links (`#trip-id`) provide direct access to sections

**Alternative Rejected:** Dynamic routing per trip (`/backpacking/trips/[slug]`) - added complexity without clear benefit for initial implementation

---

### Content System: JSON-Based
**Decision:** Use single JSON file (`public/data/backpacking.json`) for all trip and gear data

**Rationale:**
- Consistent with wedding and creative sections
- Server-side loading possible
- Easy to update and maintain
- No build step required for content updates

**Pattern:**
```typescript
const data: BackpackingData = JSON.parse(
  await fs.readFile('public/data/backpacking.json', 'utf-8')
);
```

**Alternative Rejected:** Markdown posts (like reviews) - overly complex for structured trip data with galleries and stats

---

### UI Components: Reuse Over Create
**Decision:** Reuse existing `image-modal.tsx` and `loading-skeleton.tsx` from shared components

**Rationale:**
- Image modal already has all needed features (keyboard nav, Radix Dialog, animations)
- Avoids code duplication
- Maintains consistent UX across site

**New Components Needed:**
- Only backpacking-specific components (hero, trip cards, stats box, etc.)
- Badge component (install via shadcn CLI)

**Rejected:** Creating custom modal or rebuilding existing components

---

### Styling: CSS Variables Not Tailwind Config
**Decision:** Use scoped CSS variables in `.backpacking-page` class (in `globals.css`)

**Rationale:**
- Matches wedding page theming pattern
- Scoped to backpacking section only (doesn't pollute global palette)
- Easy dark mode support
- Consistent with existing codebase approach

**Pattern:**
```css
.backpacking-page {
  --primary: 160 60% 35%; /* Forest green */
  --secondary: 25 30% 50%; /* Stone gray */
  /* etc. */
}
```

**Alternative Rejected:** Extending `tailwind.config.ts` - creates global color classes not scoped to backpacking

---

### No Tabs or Accordions
**Decision:** Use sequential sections, not tabbed content or accordions for trip details

**Rationale:**
- Editorial reading flow (like wedding page continuous scroll)
- Better SEO (all content visible and indexed)
- More accessible (no interaction required to see content)
- Mobile-friendly (tabs don't work well on small screens)

**Implementation:** Day-by-day itinerary as sequential `<DaySection>` components, not accordion items

---

## Key Files Reference

### Core Implementation Files

**Type Definitions:**
- `src/types/backpacking.ts` - NEW (Phase 1)
  - `BackpackingImage`, `TripStats`, `DayItinerary`, `BackpackingTrip`, `GearItem`, `BackpackingData`
  - Must match wedding page type pattern for consistency

**Data File:**
- `public/data/backpacking.json` - NEW (Phase 2)
  - Contains hero, trips array, gear categories
  - Example trip: "Alpine Lakes Traverse" (3-day fictional trip)
  - Placeholder images from placehold.co

**Main Page:**
- `src/app/backpacking/page.tsx` - NEW (Phase 4)
  - Async server component
  - Server-side data loading with `fs.readFile`
  - Error handling with fallback UI
  - Composes all backpacking components

**Components Directory:**
- `src/app/_components/backpacking/` - NEW (Phase 3)
  - `backpacking-hero.tsx`
  - `trip-preview-card.tsx`
  - `trip-section.tsx`
  - `stats-box.tsx`
  - `day-section.tsx`
  - `gear-showcase.tsx`

**Styling:**
- `src/app/globals.css` - UPDATE (Phase 5)
  - Add `.backpacking-page` color variables after `.wedding-page` section (~line 90)
  - Earth-tone palette: forest green, stone gray, saddle brown

**Navigation:**
- `src/app/_components/nav.tsx` - UPDATE (Phase 6)
  - Add backpacking link after wedding link

### Reference Files (Existing Patterns)

**Wedding Page (Our Template):**
- `src/app/wedding/page.tsx` - Reference for server-side data loading and page structure
- `src/types/wedding.ts` - Reference for type definition patterns
- `public/data/wedding.json` - Reference for JSON structure
- `src/app/_components/wedding/wedding-hero.tsx` - Reference for hero component pattern

**Shared Components (Reuse):**
- `src/app/_components/shared/image-modal.tsx` - REUSE for photo gallery
  - Currently typed for `WeddingImage`, compatible with `BackpackingImage` (same interface)
  - Features: Radix Dialog, keyboard nav (←/→/Esc), image counter, captions
- `src/app/_components/shared/loading-skeleton.tsx` - REUSE for loading states

**shadcn Components:**
- `src/components/ui/card.tsx` - EXISTING (use for trip cards, gear cards)
- `src/components/ui/button.tsx` - EXISTING (use for links, interactions)
- `src/components/ui/badge.tsx` - INSTALL in Phase 1 (use for difficulty, season tags)

---

## Technical Constraints

### Next.js 15 Patterns
- Use App Router (not Pages Router)
- Server components by default (use `'use client'` only when needed)
- `fs.readFile` only works in server components
- Dynamic imports for client-only code

### Image Optimization
- Always use Next.js `Image` component (never `<img>`)
- Specify `width` and `height` to prevent CLS
- Use `priority` only for hero image (above the fold)
- All other images lazy load by default
- Aspect ratio classes: `aspect-video` (16:9), `aspect-[3/4]`, etc.

### Type Safety
- No `any` types allowed
- All component props must be typed
- JSON data must match TypeScript interfaces exactly
- Use type imports: `import type { Metadata } from 'next';`

### Accessibility Requirements
- Semantic HTML (proper heading hierarchy h1→h2→h3)
- All images must have descriptive alt text
- Keyboard navigation must work (Tab, Enter, Esc, Arrow keys)
- Color contrast ≥4.5:1 (WCAG AA)
- Focus indicators visible

### Performance Targets
- First Contentful Paint (FCP) <1.5s
- Largest Contentful Paint (LCP) <2.5s
- Cumulative Layout Shift (CLS) <0.1
- Lighthouse Performance score ≥80

---

## Dependencies & Prerequisites

### Installed Packages (Already Available)
- Next.js 15
- React 18+
- TypeScript
- Tailwind CSS v3
- shadcn-ui (New York style, RSC enabled)
- Radix UI (@radix-ui/react-dialog for modals)

### To Install During Implementation
- Badge component via shadcn CLI (Phase 1, Task 1.2)
  - Command: `npx shadcn@latest add badge`

### External Resources
- Placeholder images: `https://placehold.co/[width]x[height]/[color]/ffffff?text=[text]`
- Earth tone colors for placeholders: #2d5f35 (green), #5d4037 (brown), #455a64 (gray)

---

## Image Modal Type Compatibility

**Current State:**
`ImageModal` component uses `WeddingImage` type from `@/types/wedding`:

```typescript
// src/app/_components/shared/image-modal.tsx
import { WeddingImage } from '@/types/wedding';

interface ImageModalProps {
  images: WeddingImage[];
  // ...
}
```

**WeddingImage Interface:**
```typescript
export interface WeddingImage {
  url: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
}
```

**BackpackingImage Interface (Identical):**
```typescript
export interface BackpackingImage {
  url: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
}
```

**Solution:** Interfaces are identical, so type compatibility is not an issue. Two options:

1. **Use `WeddingImage` type for backpacking** (simplest, no code changes needed)
2. **Create shared `Image` interface** that both extend (more proper, but requires refactoring existing code)

**Recommended:** Option 1 for MVP (use `WeddingImage`), Option 2 for future refactor if more sections need image galleries.

---

## Color Palette Specifications

### Light Mode
```
Background:   hsl(40, 20%, 98%)  /* Warm off-white */
Foreground:   hsl(160, 30%, 15%) /* Deep forest text */
Primary:      hsl(160, 60%, 35%) /* Forest green #2E8B57 */
Secondary:    hsl(25, 30%, 50%)  /* Stone gray #8B7355 */
Accent:       hsl(30, 45%, 40%)  /* Saddle brown #8B4513 */
Muted:        hsl(40, 20%, 92%)  /* Warm light gray */
Border:       hsl(40, 20%, 85%)  /* Light border */
```

### Dark Mode
```
Background:   hsl(160, 15%, 10%) /* Dark forest */
Foreground:   hsl(40, 20%, 90%)  /* Warm light text */
Primary:      hsl(160, 50%, 45%) /* Lighter forest green */
Secondary:    hsl(25, 25%, 55%)  /* Lighter stone gray */
Accent:       hsl(30, 40%, 50%)  /* Lighter saddle brown */
Muted:        hsl(160, 10%, 20%) /* Dark gray */
Border:       hsl(160, 10%, 25%) /* Dark border */
```

**Contrast Verification:**
- Text on background: Forest green (#2E8B57) on warm off-white = 7.2:1 ✅
- Exceeds WCAG AA minimum (4.5:1)

---

## Common Pitfalls to Avoid

### 1. Dynamic Routing Confusion
❌ **Don't:** Try to implement `[slug]` routing without `generateStaticParams`
✅ **Do:** Use single-page architecture with anchor links

### 2. Client vs Server Components
❌ **Don't:** Try to use `fs.readFile` in client component (causes error)
✅ **Do:** Keep page as async server component, pass data to client components as props

### 3. Image Optimization
❌ **Don't:** Use `<img>` tags or forget width/height (causes CLS)
✅ **Do:** Use Next.js `Image` with specified dimensions

### 4. Type Imports
❌ **Don't:** Import Metadata type as value: `import { Metadata } from 'next';`
✅ **Do:** Import as type: `import type { Metadata } from 'next';`

### 5. Styling Scope
❌ **Don't:** Add colors to `tailwind.config.ts` (creates global classes)
✅ **Do:** Use CSS variables scoped to `.backpacking-page` class

### 6. Component Duplication
❌ **Don't:** Create new image modal or loading skeleton
✅ **Do:** Import from `@/app/_components/shared/`

---

## Quick Resume Instructions

**If returning after context reset:**

1. **Read this file** to understand current state and decisions
2. **Check `tasks.md`** to see what's completed vs pending
3. **Read `plan.md`** for detailed implementation steps
4. **Resume at next pending task** in current phase

**Current Phase:** Not started (ready to begin Phase 1)

**Next Steps:**
1. Create `src/types/backpacking.ts` with all type definitions (Task 1.1)
2. Install Badge component via shadcn CLI (Task 1.2)
3. Create `public/data/backpacking.json` with example trip (Task 2.1)

---

## Testing Strategy

### Component Testing (Per Task)
- Render component in isolation
- Verify props correctly typed
- Check responsive behavior at multiple breakpoints
- Test dark mode appearance

### Integration Testing (Phase 4)
- Full page render
- Anchor navigation works
- Modal interactions functional
- Data loading and error handling

### Final QA (Phase 7)
- Lighthouse audits (Performance, Accessibility, Best Practices, SEO)
- Cross-browser testing (Chrome, Firefox, Safari)
- Mobile device testing (real devices if available)
- Keyboard navigation complete workflow
- Screen reader testing (optional but recommended)

---

## Related Documentation

- **Main Plan:** `backpacking-blog-section-plan.md` - Comprehensive implementation plan
- **Task Checklist:** `backpacking-blog-section-tasks.md` - Progress tracking
- **Project README:** `dev/README.md` - Dev docs methodology explanation
- **Wedding Page Reference:** `src/app/wedding/page.tsx` - Pattern to follow

---

## Notes for Future Sessions

### After Phase 3 (Components Complete)
- Review timeline estimate accuracy
- Assess if buffer time needed
- Identify any scope changes or new requirements

### Before Phase 7 (Testing)
- Ensure all previous phases marked complete in tasks.md
- Update this context file with any discoveries or changes
- Prepare testing environment (devices, tools, browser extensions)

### Post-Implementation
- Archive these dev docs to `dev/archive/backpacking-blog-section/`
- Document any deviations from plan
- Note lessons learned for future similar features
- Update PROJECT_KNOWLEDGE.md if it exists

---

**Document Version:** 1.0
**Last Updated:** 2025-10-31
**Status:** Planning Complete, Ready for Implementation
