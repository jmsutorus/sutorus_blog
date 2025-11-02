# Landing Page Redesign - Context & Decisions

**Last Updated**: 2025-10-30

---

## Key Files & Locations

### Core Files to Modify
- `src/app/page.tsx` - Main landing page (current implementation)
- `src/app/globals.css` - Color palette HSL variables
- `tailwind.config.ts` - Typography and spacing configuration
- `src/lib/api.ts` - Blog post API functions
- `src/interfaces/post.ts` - TypeScript interfaces

### New Files to Create
- `src/app/styles/animations.css` - CSS scroll-driven animations
- `src/app/_components/editorial/hero-editorial.tsx`
- `src/app/_components/editorial/personal-story.tsx`
- `src/app/_components/editorial/featured-writing.tsx`
- `src/app/_components/editorial/creative-showcase.tsx`
- `src/app/_components/editorial/cta-section.tsx`
- `src/app/_components/animations/animated-gradient.tsx`
- `public/data/creative.json` - Creative showcase content
- `public/images/profile.webp` - Profile photo

### Files to Update
- `src/app/_components/nav.tsx` - Apply warm color scheme
- `src/app/_components/footer.tsx` - Apply warm color scheme
- `src/components/ui/button.tsx` - Add warm variant
- `src/app/layout.tsx` - Import animations.css, update meta tags

### Routes to Verify/Create
- `src/app/about/page.tsx` - About page
- `src/app/projects/page.tsx` - Projects page
- `src/app/contact/page.tsx` - Contact page

---

## Key Technical Decisions

### Decision 1: CSS-First Animation Strategy
**Context**: React 19 RC is incompatible with Framer Motion
**Options Considered**:
- Framer Motion (rejected - requires React 18 downgrade)
- Motion library (possible but untested with React 19)
- CSS scroll-driven animations (chosen)

**Decision**: Use native CSS `animation-timeline: view()` for scroll animations

**Rationale**:
- Zero JavaScript dependencies
- Better performance (GPU accelerated)
- No React version conflicts
- Native browser features
- Smaller bundle size

**Trade-offs**:
- Browser support limited (Chrome 115+, Safari 26+)
- Less dynamic control than JS libraries
- Requires feature detection and fallbacks

**Implementation Notes**:
```css
@supports (animation-timeline: view()) {
  .scroll-animate {
    animation: fade-in-up linear both;
    animation-timeline: view();
    animation-range: entry 0% cover 40%;
  }
}
```

---

### Decision 2: HSL Color Format
**Context**: Existing theme system uses HSL CSS variables
**Decision**: Convert all warm earth tones to HSL format

**Rationale**:
- Seamless integration with existing dark mode system
- Easy to adjust lightness for contrast
- Consistent with current architecture
- No breaking changes to existing components

**Color Mapping**:
```css
/* Light Mode */
--primary: 18 65% 55%;     /* Terracotta #D97642 */
--secondary: 41 75% 68%;   /* Amber #E8B86D */
--accent: 28 70% 62%;      /* Golden #F4C95D */
--background: 40 40% 97%;  /* Cream #FAF8F5 */
--foreground: 20 35% 20%;  /* Deep brown #3A2820 */

/* Dark Mode */
--background: 20 40% 12%;  /* Rich brown #2D1B13 */
--foreground: 40 40% 95%;  /* Warm cream */
```

---

### Decision 3: Static Export Image Optimization
**Context**: Blog uses static site generation, Next.js Image has limitations
**Options Considered**:
- Native Next.js Image (doesn't work with static export)
- Manual optimization (tedious, error-prone)
- next-image-export-optimizer (chosen)
- External CDN (adds dependency)

**Decision**: Use `next-image-export-optimizer` package

**Rationale**:
- Designed for static exports
- Automated optimization
- Maintains Next.js-like API
- WebP conversion built-in

**Installation**:
```bash
npm install next-image-export-optimizer
```

**Configuration** (next.config.js):
```js
const withExportImages = require('next-image-export-optimizer')
module.exports = withExportImages({
  // existing config
})
```

---

### Decision 4: Content Storage Strategy
**Context**: Need to store creative showcase content (hobbies, reading, projects)
**Options Considered**:
- Hardcoded in component (simple but not flexible)
- Markdown files (overkill for small data)
- JSON file (chosen)
- External CMS (too complex)

**Decision**: Store in `public/data/creative.json`

**Rationale**:
- Easy to edit
- No build-time processing needed
- Can be updated without code changes
- Simple JSON parsing in component

**Schema**:
```json
{
  "reading": {
    "title": "Currently Reading",
    "book": "Book Title",
    "author": "Author Name",
    "cover": "/images/book-cover.webp",
    "description": "Why I'm reading this..."
  },
  "projects": [
    {
      "title": "Project Name",
      "description": "What I built...",
      "image": "/images/project.webp",
      "link": "https://..."
    }
  ],
  "hobbies": [
    {
      "title": "Hobby Name",
      "description": "What I enjoy...",
      "icon": "music" // or image path
    }
  ]
}
```

---

### Decision 5: Asymmetric Layout Implementation
**Context**: Editorial design requires asymmetric grids
**Decision**: Use CSS Grid with explicit column ratios

**Rationale**:
- Precise control over layout
- Responsive with media queries
- Native CSS (no framework needed)
- Well-supported across browsers

**Hero Layout**:
```css
.hero-grid {
  display: grid;
  grid-template-columns: 60% 40%;
  gap: 2rem;
}

@media (max-width: 768px) {
  .hero-grid {
    grid-template-columns: 1fr;
  }
}
```

**Featured Writing Layout**:
```css
.featured-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: auto auto;
  gap: 1.5rem;
}

.featured-large {
  grid-row: 1 / 3; /* Span 2 rows */
}
```

---

### Decision 6: Mobile-First Responsive Strategy
**Context**: Most blog traffic likely from mobile devices
**Decision**: Design for mobile first, enhance for desktop

**Breakpoints**:
- Mobile: 375px-767px (base styles)
- Tablet: 768px-1023px (md: prefix)
- Desktop: 1024px-1279px (lg: prefix)
- Large: 1280px+ (xl: prefix)

**Approach**:
1. Single column layouts on mobile
2. Simplified animations on small screens
3. Larger touch targets (44x44px minimum)
4. Test on real devices, not just DevTools

---

## Dependencies & Constraints

### Hard Constraints
1. **React 19 RC**: Cannot use libraries incompatible with React 19
2. **Static Export**: No server-side rendering or dynamic routes
3. **TypeScript Strict Mode**: All code must pass strict type checking
4. **Existing Components**: Must work with Shadcn/ui components

### Soft Constraints
1. **Bundle Size**: Keep JavaScript <150KB, CSS <50KB
2. **Performance**: Lighthouse score >90
3. **Accessibility**: WCAG AA compliance required
4. **Browser Support**: Chrome 115+, Safari 26+, Firefox latest

### External Dependencies
**New npm Packages**:
- `next-image-export-optimizer` (image optimization)

**No New Packages Needed For**:
- Animations (using CSS)
- Smooth scroll (using CSS)
- Layout (using CSS Grid/Flexbox)
- Dark mode (using existing system)

---

## Architecture Decisions

### Component Organization
**Pattern**: Co-locate editorial components in dedicated directory

```
src/app/_components/
├── editorial/           # New editorial-specific components
│   ├── hero-editorial.tsx
│   ├── personal-story.tsx
│   ├── featured-writing.tsx
│   ├── creative-showcase.tsx
│   └── cta-section.tsx
├── animations/          # New animation components
│   └── animated-gradient.tsx
├── nav.tsx             # Existing, to update
├── footer.tsx          # Existing, to update
└── ...
```

**Rationale**: Keeps related components together, clear separation from existing components

---

### State Management
**Decision**: No state management library needed

**Rationale**:
- Landing page is mostly static
- No complex user interactions
- Server-side data fetching (static generation)
- Theme handled by existing context

**Data Flow**:
```
Static Generation Build Time
  ↓
getAllPosts() / getFeaturedPosts()
  ↓
Props passed to components
  ↓
Components render with data
```

---

### API Structure
**Pattern**: Extend existing API in `src/lib/api.ts`

**New Functions**:
```typescript
export function getFeaturedPosts(): Post[] {
  return getAllPosts()
    .filter(post => post.featured === true)
    .slice(0, 3);
}
```

**Interface Updates**:
```typescript
// src/interfaces/post.ts
interface Post {
  // ... existing fields
  featured?: boolean;
  category?: string;
}
```

---

## Research Insights Applied

### From Web Research (Modern Landing Page Trends)
1. **Bento Grid Layout**: Adapted into creative showcase section
2. **Glassmorphism**: Decided against (too trendy, may not age well)
3. **CSS Scroll Animations**: Adopted as core animation strategy
4. **Editorial Typography**: Applied oversized headings (8xl-9xl)
5. **Warm Color Trends**: Influenced earth tone palette selection

### From Plan Review (Critical Issues Identified)
1. **React 19 Incompatibility**: Avoided Framer Motion entirely
2. **Lenis Deprecated**: Using native CSS smooth scroll instead
3. **Static Export Images**: Planned next-image-export-optimizer upfront
4. **HSL Conversion**: Addressed in Phase 1
5. **Content Strategy**: Made Phase 0 mandatory before UI work

### From User Preferences
1. **Editorial Style**: Asymmetric layouts, bold typography
2. **Warm Earth Tones**: Terracotta, amber, cream palette
3. **Moderate Animations**: Scroll-driven + micro-interactions
4. **Content Focus**: Writing, personal story, creative hobbies

---

## Known Issues & Limitations

### Browser Support Limitations
**Issue**: CSS scroll-driven animations not supported in older browsers
**Impact**: Users on old browsers won't see scroll animations
**Mitigation**: Graceful degradation, page works without animations
**Acceptable**: Coverage >90% of users (modern browsers)

### Performance Considerations
**Issue**: Multiple scroll animations may impact low-end devices
**Impact**: Potential scroll jank on budget phones
**Mitigation**: Simplified mobile animations, performance testing
**Monitoring**: Test on actual low-end Android device

### Content Dependency
**Issue**: Quality of landing page depends on Phase 0 content writing
**Impact**: Bad content = bad landing page regardless of design
**Mitigation**: Block UI work until Phase 0 complete, get feedback on content
**Critical**: Content is not optional

---

## Development Workflow

### Branch Strategy
```bash
# Create feature branch
git checkout -b feature/landing-redesign

# Work in iterations
git add .
git commit -m "feat(landing): complete Phase 0 - content preparation"

# Push regularly
git push -u origin feature/landing-redesign

# Create preview deployment (Vercel)
# Test with real users

# When ready, merge to main
git checkout main
git merge feature/landing-redesign
```

### Testing Workflow
1. **During Development**: Test in local dev server
2. **After Each Phase**: Deploy preview, share for feedback
3. **Before Final Merge**: Full QA pass (Phase 6)
4. **Post-Deployment**: Monitor analytics and user feedback

### Rollback Plan
**If major issues found post-launch**:
1. Keep old landing page in `src/app/page-v1.tsx`
2. Can quickly swap files if needed
3. Or use feature flag to toggle designs
4. Document issues and iterate

---

## Communication & Documentation

### Progress Tracking
- Update `landing-redesign-tasks.md` as tasks complete
- Mark tasks with ✅ when done
- Update this context file with new learnings
- Document any deviations from plan

### Learnings to Document
- What worked well
- What took longer than expected
- Unexpected challenges
- Solutions to problems encountered
- Ideas for future improvements

### Post-Project Review
After completion, document:
- Actual time spent vs. estimated
- What would you do differently
- Key insights for future projects
- Metrics after 30 days (engagement, bounce rate, etc.)

---

## Quick Reference

### Color Variables (HSL)
```css
/* Use in Tailwind classes */
bg-background    /* Cream/Rich brown */
text-foreground  /* Deep brown/Cream */
bg-primary       /* Terracotta */
bg-secondary     /* Amber */
bg-accent        /* Golden */
bg-muted         /* Warm gray */
```

### Animation Classes
```css
.scroll-animate       /* Fade in on scroll */
.scroll-animate-delay-1  /* Stagger 100ms */
.scroll-animate-delay-2  /* Stagger 200ms */
```

### Typography Scale
```jsx
text-4xl  /* 36px - Mobile hero */
text-6xl  /* 60px - Tablet hero */
text-8xl  /* 96px - Desktop hero */
text-9xl  /* 128px - Optional oversized */
```

### Responsive Breakpoints
```jsx
sm:   /* 640px+ */
md:   /* 768px+ */
lg:   /* 1024px+ */
xl:   /* 1280px+ */
2xl:  /* 1536px+ */
```

---

## Resources & References

### Documentation
- [Next.js 15 Docs](https://nextjs.org/docs)
- [Tailwind CSS v3](https://tailwindcss.com/docs)
- [CSS Scroll-Driven Animations](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timeline)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

### Tools
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)
- [next-image-export-optimizer](https://github.com/Niels-IO/next-image-export-optimizer)
- [Chrome DevTools](https://developer.chrome.com/docs/devtools/)

### Inspiration
- Brittany Chiang's portfolio (accessibility + personality)
- Josh Comeau's portfolio (thoughtful animations)
- Editorial websites (Medium, Substack for typography)

---

**Context Status**: COMPREHENSIVE
**Last Updated**: 2025-10-30
**Ready for**: Phase 0 execution
