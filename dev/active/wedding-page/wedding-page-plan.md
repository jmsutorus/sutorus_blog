# Wedding Celebration Page - Implementation Plan

**Last Updated: 2025-10-31**

## Executive Summary

Create a dedicated wedding celebration page at `/wedding` to showcase the couple's special day through a curated collection of 20+ images and a 700-word narrative story. The page will maintain the site's editorial style while adopting a slightly whiter, more romantic color scheme.

### Key Objectives
- ✅ New route at `/wedding` with proper SEO metadata
- ✅ Support minimum 20 images with masonry gallery layout
- ✅ Integrate 700 words of narrative content across story sections
- ✅ Slightly whiter color scheme (pure white vs. current cream)
- ✅ Maintain editorial style consistency with existing site
- ✅ Accessibility-first implementation
- ✅ Optimized performance with progressive image loading

---

## Current State Analysis

### Existing Architecture
**Framework**: Next.js 15 with App Router, TypeScript, Tailwind CSS v3

**Routing Pattern**: File-based routing in `src/app/`
- Pages: `/`, `/about`, `/contact`, `/projects`, `/reviews`, `/database`, `/posts/[...slug]`

**Component Architecture**:
- Editorial components in `src/app/_components/editorial/`
- Client components use `'use client'` directive with useEffect for data fetching
- Data stored in `public/data/*.json` files
- Next.js Image component for optimization

**Current Color Scheme** (Warm Earth Tones):
```css
--background: 40 40% 97%;  /* Cream #FAF8F5 */
--foreground: 20 35% 20%;  /* Deep brown #3A2820 */
--primary: 18 65% 55%;     /* Terracotta #D97642 */
--secondary: 41 75% 68%;   /* Amber #E8B86D */
--accent: 28 70% 62%;      /* Golden #F4C95D */
```

**Existing Patterns**:
- Two-column magazine layouts (PersonalStory component)
- Bento grid layouts (CreativeShowcase component)
- Fade-in on scroll animations
- Container component for consistent spacing
- JSON data loading pattern

### Research Findings

**Wedding Website Best Practices (2025)**:
1. **Gallery Layouts**: Masonry grids are most popular for dynamic, story-driven photo displays
2. **Story Integration**: Short narrative paragraphs (2-3 sentences) interspersed with images
3. **Visual Hierarchy**: Image-first design (50-80% viewport space)
4. **Section Flow**: Hero → Story → Gallery → Additional narrative sections
5. **Color Schemes**: Soft, romantic palettes that complement photography
6. **Responsive Design**: Mobile-first with progressive enhancement
7. **Progressive Loading**: Don't load all images at once (performance)

---

## Proposed Future State

### Page Structure
```
/wedding
├── Hero Section (Full viewport with main photo)
├── Story Introduction (Text + Image)
├── Photo Gallery (Masonry grid, 20+ images)
├── Story Middle Section (Text + Image)
├── Story Conclusion (Text + Image)
└── Optional: Share/Contact CTA
```

### Component Hierarchy
```
src/app/wedding/page.tsx (Server Component)
├── WeddingHero (Server Component)
├── WeddingStorySection (Server Component, reusable)
├── WeddingGallery (Client Component)
│   └── ImageModal (Client Component)
└── CTASection (Optional, reusable from existing)
```

### Data Structure
```json
{
  "hero": {
    "title": "Our Wedding Day",
    "names": "Joseph & [Partner Name]",
    "date": "October 31, 2025",
    "location": "City, State",
    "image": {
      "url": "...",
      "alt": "...",
      "width": 1920,
      "height": 1080
    }
  },
  "story": [
    {
      "content": "~100 words...",
      "image": { "url": "...", "alt": "...", "width": 800, "height": 600 },
      "imagePosition": "left"
    },
    {
      "content": "~300 words...",
      "image": { "url": "...", "alt": "...", "width": 800, "height": 600 },
      "imagePosition": "right"
    },
    {
      "content": "~300 words...",
      "image": { "url": "...", "alt": "...", "width": 800, "height": 600 },
      "imagePosition": "left"
    }
  ],
  "gallery": [
    {
      "url": "...",
      "alt": "...",
      "width": 800,
      "height": 1200,
      "caption": "Optional caption"
    }
    // ... 20+ images total
  ],
  "metadata": {
    "photographer": "Photographer Name",
    "venue": "Venue Name"
  }
}
```

### Color Scheme Modifications
```css
/* Wedding page overrides */
.wedding-page {
  --background: 0 0% 98%;      /* Pure white-ish (was cream) */
  --primary: 18 65% 60%;       /* Lighter terracotta */
  --secondary: 41 75% 72%;     /* Lighter amber */
  --accent: 28 70% 65%;        /* Lighter golden */
}
```

---

## Implementation Phases

### Phase 1: Foundation & Types (Effort: S)

#### 1.1 Create TypeScript Interfaces
**File**: `src/types/wedding.ts`

**Tasks**:
- Define `WeddingImage` interface with url, alt, width, height, caption?
- Define `WeddingStorySection` interface with content, image?, imagePosition?
- Define `WeddingHero` interface with title, names, date, location, image
- Define `WeddingData` interface combining all sections
- Export all interfaces

**Acceptance Criteria**:
- ✅ All interfaces properly typed with required/optional fields
- ✅ Follows existing TypeScript conventions in codebase
- ✅ No TypeScript errors when running `npx tsc --noEmit`

**Dependencies**: None

---

### Phase 2: Data Structure (Effort: M)

#### 2.1 Create Wedding Data File
**File**: `public/data/wedding.json`

**Tasks**:
- Structure JSON following WeddingData interface
- Add hero section with placeholder image (use placehold.co or Cloudinary)
- Add 3 story sections totaling ~700 words (Lorem ipsum for now)
- Add gallery array with 20+ placeholder images
- Include proper image dimensions for CLS prevention
- Add descriptive alt text for all images
- Include metadata (photographer, venue)

**Acceptance Criteria**:
- ✅ JSON is valid and parseable
- ✅ Matches TypeScript interfaces exactly
- ✅ All images have dimensions and alt text
- ✅ Story content totals approximately 700 words
- ✅ Gallery contains minimum 20 images
- ✅ All placeholder URLs are accessible

**Dependencies**: Phase 1.1 (TypeScript interfaces)

**Example Placeholder Services**:
- `https://placehold.co/800x1200/D97642/FFFFFF/webp?text=Wedding+1`
- `https://res.cloudinary.com/demo/image/upload/...`
- Consistent sizing: Mix of portrait (800x1200), landscape (1200x800), square (1000x1000)

---

### Phase 3: Shared Components (Effort: L)

#### 3.1 Create Image Modal Component
**File**: `src/app/_components/shared/image-modal.tsx`

**Tasks**:
- Create reusable lightbox/modal for full-size image viewing
- Implement keyboard navigation (←/→ for prev/next, Esc to close)
- Add click outside to close functionality
- Proper focus management (trap focus in modal)
- Display image caption if provided
- Add image counter (e.g., "3 / 24")
- Smooth animations for opening/closing
- Use Radix UI Dialog (recommended) or custom implementation

**Acceptance Criteria**:
- ✅ Modal opens on image click
- ✅ Keyboard navigation works (←/→/Esc)
- ✅ Click outside closes modal
- ✅ Focus trapped inside modal when open
- ✅ Accessible (ARIA labels, roles)
- ✅ Smooth animations
- ✅ Works on mobile (swipe gestures optional but nice)

**Dependencies**: None

**Technical Notes**:
- Consider using `@radix-ui/react-dialog` for accessibility
- Use `next/image` inside modal for optimization
- Add loading state for large images

#### 3.2 Create Loading Skeleton Component
**File**: `src/app/_components/shared/loading-skeleton.tsx`

**Tasks**:
- Create skeleton screen for image loading states
- Animated shimmer effect
- Configurable aspect ratio
- Reusable across wedding components

**Acceptance Criteria**:
- ✅ Skeleton matches expected image dimensions
- ✅ Smooth shimmer animation
- ✅ Respects aspect ratio prop
- ✅ Accessible (ARIA labels)

**Dependencies**: None

---

### Phase 4: Wedding Components (Effort: XL)

#### 4.1 Create Wedding Hero Component
**File**: `src/app/_components/wedding/wedding-hero.tsx`

**Tasks**:
- Full-viewport hero section (min-h-screen)
- Display main wedding photo as background
- Text overlay with names, date, location
- Semi-transparent overlay for text readability
- High contrast text (WCAG AA compliance)
- Priority loading for hero image
- Responsive typography (scales with viewport)
- Fade-in animation on load

**Acceptance Criteria**:
- ✅ Hero fills viewport on all screen sizes
- ✅ Text is readable over image (sufficient contrast)
- ✅ Image loads with priority (no LCP issues)
- ✅ Responsive on mobile/tablet/desktop
- ✅ Smooth fade-in animation
- ✅ Follows editorial style of existing site

**Dependencies**: Phase 1.1 (Types)

**Design Notes**:
- Use `next/image` with `fill` and `priority={true}`
- Text overlay: semi-transparent white background
- Typography: Large serif for names, smaller sans-serif for date/location
- Consider parallax scroll effect (optional enhancement)

#### 4.2 Create Wedding Story Section Component
**File**: `src/app/_components/wedding/wedding-story-section.tsx`

**Tasks**:
- Reusable component for story + image pairings
- Support left/right image placement
- Magazine-style two-column layout (similar to PersonalStory)
- Responsive: Stack on mobile, side-by-side on desktop
- Support optional image (text-only sections)
- Fade-in on scroll animation
- Use existing Container component for consistency

**Acceptance Criteria**:
- ✅ Renders text content with proper typography
- ✅ Image position (left/right) is configurable
- ✅ Responsive layout (stacked mobile, columns desktop)
- ✅ Supports text-only sections (no image)
- ✅ Fade-in animation on scroll
- ✅ Consistent spacing with other sections

**Dependencies**: Phase 1.1 (Types), Phase 3.2 (Loading skeleton)

**Technical Notes**:
- Use `grid` layout: `lg:grid-cols-2 gap-12`
- Image position: Use `order-1` and `order-2` for left/right
- Typography: Match existing editorial components
- Line height: `leading-relaxed` (1.7) for readability

#### 4.3 Create Wedding Gallery Component
**File**: `src/app/_components/wedding/wedding-gallery.tsx`

**Tasks**:
- CSS Grid masonry layout
- Responsive columns: 1 mobile, 2 tablet, 3-4 desktop
- Progressive loading: Show first 8 images, lazy load rest
- Click image to open modal
- Caption overlay on hover (desktop only)
- Intersection Observer for lazy loading
- Loading skeletons while images load
- Smooth hover effects

**Acceptance Criteria**:
- ✅ Masonry layout with varying image sizes
- ✅ Responsive columns (1/2/3-4)
- ✅ Progressive loading (first 8 visible, rest lazy)
- ✅ Click opens modal with full-size image
- ✅ Captions appear on hover (desktop)
- ✅ Loading skeletons for unloaded images
- ✅ Smooth animations and transitions
- ✅ No layout shift (CLS = 0)

**Dependencies**: Phase 1.1 (Types), Phase 3.1 (Image modal), Phase 3.2 (Loading skeleton)

**Technical Implementation**:
```tsx
'use client';

// CSS Grid masonry approach
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
  {images.slice(0, visibleCount).map((image, index) => (
    <div
      key={index}
      className="relative group cursor-pointer overflow-hidden rounded-lg"
      onClick={() => openModal(index)}
    >
      <Image
        src={image.url}
        alt={image.alt}
        width={image.width}
        height={image.height}
        loading={index < 8 ? 'eager' : 'lazy'}
        className="object-cover w-full h-auto"
      />
      {image.caption && (
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
          <p className="text-white p-4">{image.caption}</p>
        </div>
      )}
    </div>
  ))}
</div>
```

**Browser Compatibility Note**:
- CSS Grid `masonry` is experimental (Firefox only)
- Use standard grid with row spanning instead
- Consider `react-masonry-css` library if needed

---

### Phase 5: Main Page & Integration (Effort: L)

#### 5.1 Create Wedding Page
**File**: `src/app/wedding/page.tsx`

**Tasks**:
- Create main wedding page as SERVER component
- Read wedding.json server-side using `fs.readFile`
- Pass data to child components as props
- Compose sections: Hero → Story → Gallery → Story
- Add proper metadata for SEO
- Add Open Graph tags for social sharing
- Apply wedding-specific color overrides
- Error boundary handling

**Acceptance Criteria**:
- ✅ Page renders at `/wedding`
- ✅ Data loaded server-side (not client fetch)
- ✅ All components receive proper props
- ✅ Metadata includes title, description, OG image
- ✅ Color scheme is whiter than main site
- ✅ Error boundary handles missing data gracefully
- ✅ No console errors or warnings

**Dependencies**: Phase 1.1 (Types), Phase 2.1 (Data), Phase 4.1-4.3 (Components)

**Implementation Example**:
```tsx
import { WeddingData } from '@/types/wedding';
import fs from 'fs/promises';
import path from 'path';
import { WeddingHero } from '@/app/_components/wedding/wedding-hero';
import { WeddingStorySection } from '@/app/_components/wedding/wedding-story-section';
import { WeddingGallery } from '@/app/_components/wedding/wedding-gallery';

export async function generateMetadata() {
  return {
    title: 'Our Wedding - Joseph Sutorus',
    description: 'Celebrating our special day with family and friends',
    openGraph: {
      title: 'Our Wedding - Joseph Sutorus',
      description: 'Celebrating our special day',
      images: ['/wedding-og-image.jpg'],
      type: 'website',
    },
  };
}

export default async function WeddingPage() {
  const filePath = path.join(process.cwd(), 'public/data/wedding.json');
  const data: WeddingData = JSON.parse(
    await fs.readFile(filePath, 'utf-8')
  );

  return (
    <main className="wedding-page">
      <WeddingHero hero={data.hero} />

      {data.story.map((section, index) => (
        <WeddingStorySection
          key={index}
          content={section.content}
          image={section.image}
          imagePosition={section.imagePosition}
        />
      ))}

      <WeddingGallery images={data.gallery} />
    </main>
  );
}
```

#### 5.2 Add Wedding-Specific Styles
**File**: `src/app/wedding/wedding.css` or inline Tailwind

**Tasks**:
- Override background color to whiter tone
- Lighten primary/secondary/accent colors
- Softer shadows for romantic feel
- Scope to `.wedding-page` class
- Add subtle texture or gradient (optional)

**Acceptance Criteria**:
- ✅ Background is noticeably whiter than main site
- ✅ Warm accents are softened but still visible
- ✅ Styles only apply to wedding page
- ✅ Maintains readability and contrast

**Color Values**:
```css
.wedding-page {
  --background: 0 0% 98%;      /* Pure white-ish */
  --primary: 18 65% 60%;       /* Lighter terracotta */
  --secondary: 41 75% 72%;     /* Lighter amber */
  --accent: 28 70% 65%;        /* Lighter golden */
}
```

**Dependencies**: Phase 5.1 (Wedding page)

#### 5.3 Update Navigation
**File**: `src/app/_components/nav.tsx` or `src/app/_components/header.tsx`

**Tasks**:
- Add "Wedding" link to main navigation
- Place between appropriate existing links
- Match existing link styling
- Active state for current page
- Mobile menu support

**Acceptance Criteria**:
- ✅ Wedding link appears in navigation
- ✅ Styling matches existing nav links
- ✅ Active state works correctly
- ✅ Responsive on mobile menu
- ✅ Accessible (keyboard navigation)

**Dependencies**: Phase 5.1 (Wedding page exists)

---

### Phase 6: Testing & Quality Assurance (Effort: M)

#### 6.1 Responsive Testing
**Browsers**: Chrome, Firefox, Safari, Edge
**Devices**: Mobile (320px-480px), Tablet (768px-1024px), Desktop (1280px+)

**Test Cases**:
- ✅ Hero displays correctly on all screen sizes
- ✅ Story sections stack properly on mobile
- ✅ Gallery columns adjust (1/2/3-4)
- ✅ Modal works on touch devices
- ✅ Images load and display correctly
- ✅ No horizontal scroll
- ✅ Typography scales appropriately
- ✅ Touch targets are adequate (44px minimum)

#### 6.2 Accessibility Testing
**Tools**: Lighthouse, axe DevTools, Screen Reader (NVDA/VoiceOver)

**Test Cases**:
- ✅ All images have descriptive alt text
- ✅ Keyboard navigation works (Tab, Enter, Esc, ←/→)
- ✅ Focus visible and logical order
- ✅ Color contrast meets WCAG AA (4.5:1 text, 3:1 UI)
- ✅ ARIA labels on interactive elements
- ✅ Modal focus trap works
- ✅ Screen reader announces content correctly
- ✅ No accessibility errors in Lighthouse

#### 6.3 Performance Testing
**Tool**: Lighthouse, WebPageTest

**Metrics**:
- ✅ LCP < 2.5s (Largest Contentful Paint)
- ✅ FID < 100ms (First Input Delay)
- ✅ CLS < 0.1 (Cumulative Layout Shift)
- ✅ Performance score > 90
- ✅ Images optimized (WebP format)
- ✅ Lazy loading working correctly
- ✅ No unnecessary JavaScript

**Optimization Checklist**:
- Hero image uses `priority={true}`
- Gallery images use `loading="lazy"` (except first 8)
- Proper `sizes` attribute on all images
- Image dimensions specified (prevents CLS)
- Minimal client-side JavaScript

#### 6.4 TypeScript Validation

**Command**: `npx tsc --noEmit`

**Acceptance Criteria**:
- ✅ No TypeScript errors
- ✅ All props properly typed
- ✅ No `any` types (use proper interfaces)
- ✅ Strict mode compliance

---

## Risk Assessment & Mitigation Strategies

### Technical Risks

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Large images impact performance | High | Medium | Use Next.js Image optimization, lazy loading, WebP format |
| CSS Grid masonry browser support | Medium | Low | Use standard grid with row spanning, test in all browsers |
| Modal focus management issues | Medium | Medium | Use Radix UI Dialog for battle-tested accessibility |
| Data loading failures | High | Low | Add error boundaries, fallback content, loading states |
| CLS from image loading | High | Medium | Specify width/height on all images, use placeholders |
| Mobile data usage with 20+ images | Medium | Medium | Progressive loading, lazy loading, optimized image sizes |

### Content Risks

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Placeholder content not replaced | Low | Medium | Clear documentation, obvious placeholders (Lorem ipsum) |
| Real images not optimized | High | High | Document image requirements (max size, format, dimensions) |
| Story content exceeds 700 words | Low | Low | Flexible layout accommodates longer content |
| Missing alt text on real images | Medium | Medium | TypeScript enforces alt text requirement |

### User Experience Risks

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Gallery overwhelming on mobile | Medium | Medium | Progressive loading, smooth scrolling, lazy loading |
| Modal not intuitive | Medium | Low | Clear visual cues, keyboard shortcuts, instructions |
| Color scheme too stark | Low | Medium | User feedback, easy to adjust CSS variables |
| Slow loading on poor connections | High | Medium | Optimize images, progressive loading, loading states |

---

## Success Metrics

### Technical Metrics
- ✅ Lighthouse Performance Score > 90
- ✅ Lighthouse Accessibility Score = 100
- ✅ Zero TypeScript errors
- ✅ Zero console warnings/errors
- ✅ Page load time < 3s on 3G
- ✅ LCP < 2.5s, FID < 100ms, CLS < 0.1

### Functional Metrics
- ✅ All 20+ images display correctly
- ✅ Modal opens/closes smoothly
- ✅ Keyboard navigation works flawlessly
- ✅ Responsive on all devices (320px - 2560px)
- ✅ Story sections render with proper typography
- ✅ Color scheme is noticeably whiter

### User Experience Metrics
- ✅ Images load progressively (no long wait)
- ✅ Smooth animations and transitions
- ✅ Clear visual hierarchy
- ✅ Intuitive navigation
- ✅ Touch-friendly on mobile

---

## Required Resources & Dependencies

### External Libraries (Potential)
- `@radix-ui/react-dialog` - Accessible modal (recommended)
- `react-intersection-observer` - Lazy loading (optional, can use native API)
- `react-masonry-css` - Masonry layout (optional, can use CSS Grid)

### Assets Needed
- 1 hero image (1920x1080 minimum)
- 20+ gallery images (mixed sizes: portrait, landscape, square)
- All images optimized (WebP format, max 500KB each)
- Alt text for all images
- 700 words of narrative content

### Development Tools
- TypeScript (already installed)
- Next.js 15 (already installed)
- Tailwind CSS v3 (already installed)
- Lighthouse (Chrome DevTools)
- axe DevTools (browser extension)

---

## Timeline Estimates

| Phase | Tasks | Estimated Time | Priority |
|-------|-------|----------------|----------|
| Phase 1: Foundation | 1 task | 30 minutes | P0 |
| Phase 2: Data Structure | 1 task | 1 hour | P0 |
| Phase 3: Shared Components | 2 tasks | 3 hours | P1 |
| Phase 4: Wedding Components | 3 tasks | 5 hours | P0 |
| Phase 5: Integration | 3 tasks | 2 hours | P0 |
| Phase 6: Testing | 4 tasks | 2 hours | P1 |
| **Total** | **14 tasks** | **~13.5 hours** | |

**Sprint Breakdown**:
- **Day 1**: Phases 1-2 (Foundation & Data) - 1.5 hours
- **Day 2**: Phase 3 (Shared Components) - 3 hours
- **Day 3**: Phase 4 (Wedding Components) - 5 hours
- **Day 4**: Phase 5-6 (Integration & Testing) - 4 hours

---

## Next Steps

1. ✅ Review and approve this plan
2. ⏳ Start with Phase 1: Create TypeScript interfaces
3. ⏳ Proceed sequentially through phases
4. ⏳ Update `wedding-page-tasks.md` as tasks are completed
5. ⏳ Document any decisions or changes in `wedding-page-context.md`

---

## Notes & Considerations

### Future Enhancements (Post-MVP)
- Add guest photo upload feature
- Integrate with wedding registry
- Add countdown timer to wedding date
- Social media sharing buttons
- Photo comments/reactions
- Download all photos as ZIP
- Slideshow mode
- Parallax scroll effects
- Music player

### Maintenance Considerations
- Images should be hosted on reliable CDN (Cloudinary recommended)
- Update wedding.json when replacing placeholder content
- Monitor performance metrics after adding real images
- Consider adding CMS for easier content updates

### Accessibility Notes
- All images MUST have descriptive alt text
- Modal must trap focus and be keyboard navigable
- Color contrast must meet WCAG AA standards
- Touch targets must be minimum 44x44px
- Test with screen reader before deployment

### Performance Notes
- Hero image is most critical (use priority loading)
- Gallery images should lazy load
- Consider using blur placeholder for images
- Optimize all images to WebP format
- Monitor Core Web Vitals in production

---

**Document Status**: ✅ Complete and Ready for Implementation
**Plan Version**: 1.0
**Last Reviewed**: 2025-10-31
