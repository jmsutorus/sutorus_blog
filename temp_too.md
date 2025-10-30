Revised Landing Page Redesign Plan

 Editorial/Magazine Style with Warm Earth Tones

 Key Changes: CSS-first animations (no Framer Motion), content strategy defined upfront, HSL color system, static export compatibility

 ---
 Phase 0: Content Strategy & Preparation (NEW - DO FIRST)

 0.1 Content Writing

 - Write authentic "About Me" section (300-400 words)
   - What drives your writing/reviews
   - Personal values and mission
   - Creative hobbies and interests
 - Identify 3 featured posts for homepage
 - Prepare creative showcase content:
   - Current reading/books (with covers)
   - Side projects (2-3 items)
   - Hobbies/interests (gaming, music, etc.)
 - Gather/prepare profile photo (optimize to 800x800px WebP)

 0.2 Define Content Sources

 - Update Post interface to include featured: boolean field
 - Create getFeaturedPosts() function in API
 - Decide creative showcase storage:
   - Recommended: JSON config file (public/data/creative.json)
   - Alternative: Hardcoded in component for now, migrate later

 0.3 Image Optimization Strategy

 - Install next-image-export-optimizer for static export compatibility
 - Pre-optimize all images to WebP format (<100KB each)
 - Store in /public/images/ directory

 ---
 Phase 1: Foundation & Design System (REVISED)

 1.1 Color Palette - HSL Conversion

 Update src/app/globals.css with HSL values:

 Light Mode:
 --primary: 18 65% 55%;        /* Terracotta #D97642 */
 --secondary: 41 75% 68%;      /* Amber #E8B86D */
 --accent: 28 70% 62%;         /* Golden #F4C95D */
 --background: 40 40% 97%;     /* Cream #FAF8F5 */
 --foreground: 20 35% 20%;     /* Deep brown #3A2820 */
 --muted: 35 25% 90%;          /* Warm gray */

 Dark Mode:
 --primary: 18 65% 60%;        /* Lighter terracotta */
 --secondary: 41 75% 72%;      /* Lighter amber */
 --background: 20 40% 12%;     /* Rich brown #2D1B13 */
 --foreground: 40 40% 95%;     /* Warm cream text */
 --muted: 20 20% 25%;          /* Warm dark gray */

 Action: Test all combinations with WebAIM Contrast Checker for WCAG AA compliance

 1.2 Typography Configuration

 Update tailwind.config.ts:

 theme: {
   extend: {
     fontSize: {
       '4xl': '2.25rem',   // 36px - Mobile hero
       '5xl': '3rem',      // 48px
       '6xl': '3.75rem',   // 60px - Tablet hero
       '7xl': '4.5rem',    // 72px
       '8xl': '6rem',      // 96px - Desktop hero
       '9xl': '8rem',      // 128px - Optional oversized
     },
     fontFamily: {
       sans: ['Inter', 'system-ui', 'sans-serif'],
       display: ['Inter', 'system-ui', 'sans-serif'], // Can swap for serif later
     },
     lineHeight: {
       'relaxed': '1.7',   // Body text readability
     }
   }
 }

 1.3 Animation Setup - CSS-First Approach

 NO JavaScript libraries needed!

 Create src/app/styles/animations.css:

 /* Scroll-driven animations (modern CSS) */
 @keyframes fade-in-up {
   from {
     opacity: 0;
     transform: translateY(30px);
   }
   to {
     opacity: 1;
     transform: translateY(0);
   }
 }

 .scroll-animate {
   animation: fade-in-up linear both;
   animation-timeline: view();
   animation-range: entry 0% cover 40%;
 }

 /* Respect user preferences */
 @media (prefers-reduced-motion: reduce) {
   .scroll-animate { animation: none; }
 }

 /* Smooth scroll */
 html { scroll-behavior: smooth; }

 Import in src/app/layout.tsx

 ---
 Phase 2: Layout Redesign (Editorial/Magazine Style)

 2.1 Hero Section - Asymmetric Editorial Layout

 Create src/app/_components/editorial/hero-editorial.tsx

 Layout:
 - Left (60%): Oversized name, subtitle, mission statement
 - Right (40%): Featured article card preview
 - Background: Warm gradient (2-color for performance)
 - CSS animations: fade-in on load, stagger text

 Responsive:
 - Mobile: Stack vertically, reduce font sizes
 - Tablet: 50/50 split
 - Desktop: 60/40 split

 2.2 Personal Story Section

 Create src/app/_components/editorial/personal-story.tsx

 Layout:
 - Magazine two-column (desktop), single column (mobile)
 - Larger profile photo on left with subtle zoom on scroll (CSS only)
 - Authentic bio on right (content from Phase 0.1)
 - Decorative warm shapes using CSS/SVG

 CSS Effects:
 - Parallax: Use transform: translateY(calc(var(--scroll) * 0.5)) with CSS variables
 - Fade-in on scroll with .scroll-animate

 2.3 Featured Writing - Asymmetric Grid

 Create src/app/_components/editorial/featured-writing.tsx

 Layout:
 - CSS Grid with grid-template-columns: 2fr 1fr
 - Large featured post (spans 2 rows)
 - Two smaller posts (stacked in second column)
 - Pulls from getFeaturedPosts() API

 Hover Effects:
 - CSS scale transform (1.0 → 1.02)
 - Warm gradient overlay on images
 - Smooth transitions (300ms)

 2.4 Creative Showcase Section

 Create src/app/_components/editorial/creative-showcase.tsx

 Content Source: Load from public/data/creative.json:
 {
   "reading": {
     "title": "Currently Reading",
     "book": "Book Title",
     "cover": "/images/book-cover.webp"
   },
   "projects": [...],
   "hobbies": [...]
 }

 Layout:
 - Asymmetric grid (vary card sizes)
 - Mix of image and text-only cards
 - Warm card backgrounds with hover effects

 2.5 CTA Section

 Create src/app/_components/editorial/cta-section.tsx

 Design:
 - Full-width warm gradient banner
 - Bold headline with asymmetric button layout
 - Three CTAs: Primary (large), Secondary (outline), Tertiary (link)
 - Subtle animated gradient background (CSS only)

 ---
 Phase 3: Component Updates

 3.1 Update Existing Components

 Nav (src/app/_components/nav.tsx):
 - Apply warm color palette
 - Verify all links have corresponding pages

 Footer (src/app/_components/footer.tsx):
 - Update with warm styling
 - Enhance social links with warm hover effects

 Button (src/components/ui/button.tsx):
 - Add "warm" variant using new primary colors
 - Hover effects with scale and glow

 3.2 Verify/Create Route Pages

 Check and create if missing:
 - src/app/about/page.tsx
 - src/app/projects/page.tsx
 - src/app/contact/page.tsx

 ---
 Phase 4: CSS Animation Implementation

 4.1 Scroll Animations

 - Add .scroll-animate class to major sections
 - Stagger delays for card grids (:nth-child selectors)
 - Test in all browsers (Chrome, Safari, Firefox with polyfill)

 4.2 Micro-Interactions (Pure CSS)

 /* Button hover with warm glow */
 .btn-warm:hover {
   transform: scale(1.05);
   box-shadow: 0 0 20px hsl(var(--primary) / 0.3);
   transition: all 200ms ease;
 }

 /* Card reveal */
 .card:hover {
   transform: translateY(-4px);
   box-shadow: 0 8px 30px hsl(var(--primary) / 0.15);
 }

 /* Link underline animation */
 .link-warm::after {
   content: '';
   width: 0;
   transition: width 200ms;
 }
 .link-warm:hover::after {
   width: 100%;
 }

 4.3 Gradient Animation (Performance-Optimized)

 .hero-gradient {
   background: linear-gradient(
     135deg,
     hsl(var(--primary)) 0%,
     hsl(var(--secondary)) 100%
   );
   background-size: 200% 200%;
   animation: gradient-shift 15s ease infinite;
 }

 @keyframes gradient-shift {
   0%, 100% { background-position: 0% 50%; }
   50% { background-position: 100% 50%; }
 }

 ---
 Phase 5: Content Integration

 5.1 Update API & Interfaces

 Add to src/interfaces/post.ts:
 interface Post {
   // ... existing fields
   featured?: boolean;
   category?: string;
 }

 Add to src/lib/api.ts:
 export function getFeaturedPosts(): Post[] {
   return getAllPosts()
     .filter(post => post.featured === true)
     .slice(0, 3);
 }

 5.2 Integrate Real Content

 - Replace Lorem Ipsum in Personal Story section
 - Add featured flags to 3 best blog posts
 - Populate creative showcase JSON
 - Add optimized profile photo

 5.3 Add Personal Touches

 - "Now" section (what you're currently learning/working on)
 - Reading list widget
 - Subtle Easter egg (hidden message on konami code?)

 ---
 Phase 6: Polish & Optimization

 6.1 Responsive Testing

 - Test on mobile (375px, 414px)
 - Test on tablet (768px, 1024px)
 - Test on desktop (1280px, 1920px)
 - Verify asymmetric layouts collapse gracefully
 - Touch targets minimum 44x44px

 6.2 Accessibility Audit

 - Keyboard navigation through all interactive elements
 - WCAG AA contrast verification (use WebAIM tool)
 - Screen reader testing (NVDA/VoiceOver)
 - prefers-reduced-motion respected
 - Semantic HTML structure
 - Skip to content link

 6.3 Performance Optimization

 Image Strategy:
 - Install: npm install next-image-export-optimizer
 - Convert all images to WebP (<100KB each)
 - Use optimized images in components

 Bundle Optimization:
 - No animation libraries = smaller bundle
 - CSS tree-shaking in Tailwind
 - Code-split components with dynamic imports

 Performance Budget:
 - First Contentful Paint: <1.0s
 - Largest Contentful Paint: <2.0s
 - Total Blocking Time: <200ms
 - Cumulative Layout Shift: <0.1

 6.4 Dark Mode Polish

 - Test all warm colors in dark mode
 - Verify contrast ratios
 - Smooth theme transition
 - Maintain warmth in dark theme (rich browns, not black)

 ---
 Implementation Timeline

 Week 1: Content & Foundation
 - Days 1-2: Phase 0 (Content writing and prep)
 - Days 3-4: Phase 1 (Color palette, typography, CSS animations)
 - Day 5: Phase 3.2 (Verify/create route pages)

 Week 2: Layout & Components
 - Days 1-2: Phase 2.1-2.2 (Hero and Personal Story)
 - Days 3-4: Phase 2.3-2.5 (Featured Writing, Creative Showcase, CTA)
 - Day 5: Phase 3.1 (Update existing components)

 Week 3: Animation & Polish
 - Days 1-2: Phase 4 (CSS animations and micro-interactions)
 - Day 3: Phase 5 (Content integration)
 - Days 4-5: Phase 6 (Testing, accessibility, optimization)

 ---
 Success Criteria

 ✅ Editorial/magazine aesthetic with asymmetric layouts
 ✅ Warm earth tone palette (HSL format, both light/dark modes)
 ✅ WCAG AA accessibility compliance verified
 ✅ CSS-only animations (no JavaScript library conflicts)
 ✅ All animations respect prefers-reduced-motion
 ✅ Authentic content showcases personality
 ✅ Mobile-responsive with graceful layout adaptation
 ✅ Lighthouse performance >90 across all metrics
 ✅ Static export compatible (no server-side dependencies)
 ✅ Cross-browser tested (Chrome, Safari, Firefox)

 ---
 Risk Mitigation

 Phased Deployment:
 1. Deploy to preview branch first
 2. Test with real users (5-10 people)
 3. Gather feedback and iterate
 4. Deploy to production

 Rollback Plan:
 - Keep current landing page in separate component
 - Use environment variable to toggle: NEXT_PUBLIC_NEW_LANDING=true
 - Can instantly revert if issues arise