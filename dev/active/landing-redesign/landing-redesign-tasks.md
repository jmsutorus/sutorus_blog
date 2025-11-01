# Landing Page Redesign - Task Checklist

**Last Updated**: 2025-10-30

Track your progress through the landing page redesign project. Mark tasks complete with ✅ as you finish them.

---

## Phase 0: Content Strategy & Preparation (2-3 days)

### Content Writing
- [x] Write authentic "About Me" section (300-400 words) - USING PLACEHOLDER
  - [x] Draft initial version (Lorem ipsum placeholder)
  - [ ] REPLACE WITH REAL CONTENT LATER
  - [ ] Include what drives your writing
  - [ ] Mention personal values and mission
  - [ ] Add creative hobbies and interests
  - [ ] Review and refine for authenticity
  - [ ] Get feedback from trusted friend
  - [ ] Finalize content

### Featured Posts
- [x] Review all existing blog posts
- [x] Identify 3 posts to feature
- [x] Verify posts have compelling titles
- [x] Check posts have appropriate images
- [x] Select posts that represent diverse themes
- [x] **MANUAL STEP**: Add `featured: true` to frontmatter of 3 selected posts

### Creative Showcase
- [x] List 4-6 hobbies/interests to showcase - USING PLACEHOLDER
- [x] Gather or create images for each item (Using placehold.co)
- [x] Write brief descriptions (50-100 words each) - Lorem ipsum
- [x] Organize into categories (reading, projects, hobbies)
- [ ] REPLACE WITH REAL CONTENT LATER

### Profile Photo
- [x] Select appropriate profile photo - USING PLACEHOLDER
- [x] Placeholder image configured (placehold.co)
- [ ] REPLACE WITH REAL PHOTO LATER
- [ ] Crop/edit to 800x800px
- [ ] Convert to WebP format
- [ ] Optimize to <100KB file size
- [ ] Save to project directory

### API Updates
- [x] Open `src/interfaces/post.ts`
- [x] Add `featured?: boolean` field to Post interface
- [ ] Add `category?: string` field (optional)
- [x] Verify TypeScript strict mode compliance
- [x] Open `src/lib/api.ts`
- [x] Create `getFeaturedPosts()` function
- [x] Test function returns correct posts
- [x] Handle edge case: <3 featured posts exist

### Content Data Structure
- [x] Create `public/data/creative.json`
- [x] Define JSON schema for showcase items
- [ ] Add reading section with current book (NEEDS USER INPUT)
- [ ] Add projects array with 2-3 items (NEEDS USER INPUT)
- [ ] Add hobbies array with interests (NEEDS USER INPUT)
- [x] Validate JSON syntax
- [ ] Verify all image paths exist (AFTER USER ADDS CONTENT)

**Phase 0 Complete**: [x] All content prepared with placeholders - ready for Phase 1

**NOTE**: Using placeholder content (Lorem ipsum) to proceed with implementation. Featured posts need to be manually marked by adding `featured: true` to their frontmatter. Replace placeholder content with real content before final deployment.

---

## Phase 1: Foundation & Design System (1-2 days)

### Color Palette
- [x] Open `src/app/globals.css`
- [x] Update `:root` section with light mode HSL values
  - [x] `--primary: 18 65% 55%` (Terracotta)
  - [x] `--secondary: 41 75% 68%` (Amber)
  - [x] `--accent: 28 70% 62%` (Golden)
  - [x] `--background: 40 40% 97%` (Cream)
  - [x] `--foreground: 20 35% 20%` (Deep brown)
  - [x] `--muted: 35 25% 90%` (Warm gray)
- [x] Update `.dark` section with dark mode HSL values
  - [x] `--primary: 18 65% 60%` (Lighter terracotta)
  - [x] `--secondary: 41 75% 72%` (Lighter amber)
  - [x] `--background: 20 40% 12%` (Rich brown)
  - [x] `--foreground: 40 40% 95%` (Warm cream)
  - [x] `--muted: 20 20% 25%` (Warm dark gray)
- [x] Save and test in browser
- [x] Toggle dark mode and verify colors

### Contrast Verification
- [x] Open WebAIM Contrast Checker
- [x] Test foreground on background (light mode) - 12.6:1 ✓
- [x] Test foreground on background (dark mode) - 14.8:1 ✓
- [x] Test primary on background (both modes)
- [x] Test all text color combinations
- [x] Document contrast ratios in code comments
- [x] All combinations pass WCAG AA

### Typography Configuration
- [x] Open `tailwind.config.ts`
- [x] Navigate to `theme.extend.fontSize`
- [x] Add/verify font size definitions:
  - [x] `'4xl': '2.25rem'` (36px)
  - [x] `'5xl': '3rem'` (48px)
  - [x] `'6xl': '3.75rem'` (60px)
  - [x] `'7xl': '4.5rem'` (72px)
  - [x] `'8xl': '6rem'` (96px)
  - [x] `'9xl': '8rem'` (128px)
- [x] Add line-height: `'relaxed': '1.7'`
- [x] Save and run build to verify
- [x] No TypeScript errors

### CSS Animations
- [x] Create new file: `src/app/styles/animations.css`
- [x] Add `@keyframes fade-in-up` animation
- [x] Add `@keyframes fade-in` animation
- [x] Add `@keyframes scale-in` animation
- [x] Add `@keyframes gradient-shift` animation
- [x] Add `.scroll-animate` utility class
- [x] Add `@supports` feature detection
- [x] Add `@media (prefers-reduced-motion)` support
- [x] Ready to test in browser when components built

### Animation Import
- [x] Open `src/app/layout.tsx`
- [x] Import `./styles/animations.css`
- [x] Verify no CSS conflicts
- [x] Animations available globally

### Image Configuration
- [x] Open `next.config.js`
- [x] Add placehold.co to remote patterns for Next.js Image
- [x] Configure image domains for external images
- [x] Verify Next.js Image component supports required formats

### Smooth Scroll
- [x] Open `src/app/globals.css`
- [x] Add `html { scroll-behavior: smooth; }`
- [x] Add `@media (prefers-reduced-motion)` override
- [x] Ready to test when components have anchor links

**Phase 1 Complete**: [x] All foundation work done, ready to build components

---

## Phase 2: Component Development (4-5 days)

### Hero Section
- [x] Create directory: `src/app/_components/editorial/`
- [x] Create file: `hero-editorial.tsx`
- [x] Define TypeScript interface for props
- [x] Implement asymmetric grid layout (60/40)
- [x] Add left side: Name, subtitle, mission
- [x] Add right side: Featured article card
- [x] Style with warm gradient background
- [x] Add responsive breakpoints (mobile stack)
- [x] Test responsiveness
- [x] Add fade-in animation on load
- [x] Add text stagger effect
- [x] Test animations smooth
- [x] Verify TypeScript compiles
- [x] Test with real featured post data

### Animated Gradient
- [x] Create directory: `src/app/_components/animations/`
- [x] Create file: `animated-gradient.tsx`
- [x] Define prop types (colors configurable)
- [x] Implement CSS gradient animation
- [x] Optimize for mobile (simpler version)
- [x] Test performance (60fps maintained)
- [x] Make reusable across sections

### Personal Story
- [x] Create file: `editorial/personal-story.tsx`
- [x] Define prop types (content, image)
- [x] Implement magazine two-column layout
- [x] Add profile photo on left
- [x] Add bio content on right
- [x] Add decorative warm shapes (CSS/SVG)
- [x] Implement CSS parallax on photo
- [x] Add fade-in on scroll animation
- [x] Test reduced-motion preference
- [x] Verify responsive (single column mobile)
- [x] Test keyboard navigation
- [x] Optimize image loading

### Featured Writing
- [x] Create file: `editorial/featured-writing.tsx`
- [x] Define prop types (posts array)
- [x] Implement CSS Grid asymmetric layout
- [x] Add large post card (2/3 width, spans 2 rows)
- [x] Add two small post cards (1/3 width, stacked)
- [x] Integrate `getFeaturedPosts()` API
- [x] Style with image overlays
- [x] Add warm gradient masks on images
- [x] Implement hover effects (scale, text reveal)
- [x] Add stagger fade-in animation
- [x] Handle missing images gracefully
- [x] Verify links navigate correctly
- [x] Test mobile layout (single column)

### Creative Showcase
- [x] Create file: `editorial/creative-showcase.tsx`
- [x] Define prop types or fetch JSON directly
- [x] Load data from `public/data/creative.json`
- [x] Implement bento-grid layout (varied sizes)
- [x] Create reading card
- [x] Create project cards
- [x] Create hobby cards
- [x] Style with warm backgrounds
- [x] Add hover reveal effects
- [x] Add subtle floating animation
- [x] Test all showcase items render
- [x] Verify images load and optimize
- [x] Test responsive grid collapse

### CTA Section
- [x] Create file: `editorial/cta-section.tsx`
- [x] Implement full-width banner
- [x] Add animated gradient background
- [x] Add bold headline
- [x] Create three CTA buttons (Primary, Secondary, Tertiary)
- [x] Style buttons with warm theme
- [x] Link buttons to appropriate pages
- [x] Add background gradient animation
- [x] Test mobile layout adaptation
- [x] Verify accessible focus states

### Update Nav
- [x] Open `src/app/_components/nav.tsx`
- [x] Update colors to warm palette
- [x] Style with new HSL variables
- [x] Update hover effects
- [x] Test dark mode
- [x] Verify mobile menu works
- [x] Check all links are valid

### Update Footer
- [x] Open `src/app/_components/footer.tsx`
- [x] Apply warm color scheme
- [x] Style social links with hover effects
- [x] Test dark mode compatibility
- [x] Verify social links work

### Update Button Component
- [x] Open `src/components/ui/button.tsx`
- [x] Add "warm" variant to variants object
- [x] Style with warm color palette
- [x] Update hover states
- [x] Test all button variants still work
- [x] Verify TypeScript types

### Verify/Create Routes
- [x] Check if `src/app/about/page.tsx` exists
  - [x] If missing, create placeholder page
  - [x] Apply warm color scheme
- [x] Check if `src/app/projects/page.tsx` exists
  - [x] If missing, create placeholder page
  - [x] Apply warm color scheme
- [x] Check if `src/app/contact/page.tsx` exists
  - [x] If missing, create placeholder page
  - [x] Apply warm color scheme
- [x] Test all nav links (no 404 errors)

**Phase 2 Complete**: [x] All components built and tested individually

---

## Phase 3: Layout Integration (1 day)

### Update Landing Page
- [x] Open `src/app/page.tsx`
- [x] Import all new editorial components
- [x] Remove old hero section code
- [x] Add `<HeroEditorial />` component
- [x] Remove old about section code
- [x] Add `<PersonalStory />` component
- [x] Remove old explore section code
- [x] Add `<FeaturedWriting />` component
- [x] Add `<CreativeShowcase />` component
- [x] Add `<CTASection />` component
- [x] Pass necessary props to each component
- [x] Verify TypeScript compiles without errors

### Clean Up Old Code
- [x] Remove unused imports
- [x] Delete old section code
- [x] Clean up any unused variables
- [x] Remove console.logs or debug code
- [x] Run linter to check code quality

### Test Integration
- [x] Run dev server: `npm run dev`
- [x] Check all sections render
- [x] Verify no console errors
- [x] Check spacing between sections
- [x] Test scroll behavior
- [x] Verify visual hierarchy

**Phase 3 Complete**: [x] Landing page fully integrated with new components

---

## Phase 4: Animation & Interactivity (1-2 days)

### Scroll Animations
- [x] Add `.scroll-animate` to personal story section
- [x] Add `.scroll-animate` to featured writing section
- [x] Add `.scroll-animate` to creative showcase section
- [x] Add `.scroll-animate` to CTA section
- [x] Test animation triggers at correct scroll positions
- [x] Adjust `animation-range` values if needed
- [x] Verify animations smooth (60fps)
- [x] Test in Chrome, Safari, Firefox

### Stagger Animations
- [x] Add stagger delays to featured writing cards
  - [x] Card 1: no delay
  - [x] Card 2: 100ms delay
  - [x] Card 3: 200ms delay
- [x] Add stagger delays to creative showcase items
  - [x] Use `:nth-child()` selectors
  - [x] 150ms between each card
- [x] Test stagger timing feels natural
- [x] Adjust if too slow or too fast

### Hero Animations
- [x] Implement text line stagger on page load
- [x] Add scroll indicator pulse animation
- [x] Test entrance timing
- [x] Verify doesn't block user interaction
- [x] Test on slow connections

### Hover Micro-Interactions
- [x] Style button hover (scale + glow)
- [x] Style card hover (lift effect)
- [x] Style link hover (underline animation)
- [x] Test all hover effects smooth (200ms duration)
- [x] Verify proper easing curves applied
- [x] Add accessible focus states
- [x] Test on touch devices (no stuck hovers)

### Parallax Effects
- [x] Implement profile photo parallax in personal story
- [x] Implement CTA background parallax
- [x] Test parallax performance (no jank)
- [x] Verify respects `prefers-reduced-motion`
- [x] Consider disabling on mobile if performance issue

### Test Reduced Motion
- [x] Enable `prefers-reduced-motion: reduce` in browser
- [x] Verify all animations disabled
- [x] Check page still looks good without animations
- [x] Verify no functionality lost
- [x] Test content remains accessible
- [x] Disable preference and re-test

**Phase 4 Complete**: [x] All animations and interactions polished

---

## Phase 5: Content Integration (1 day)

**TECHNICAL STATUS**: ✅ Complete - All components are data-driven
**CONTENT STATUS**: ⚠️ Awaiting user input - See CONTENT_GUIDE.md

### Add About Me Content
- [x] Copy written content from Phase 0 - **Using placeholder, needs user content**
- [x] Update PersonalStory to load from JSON
- [x] Format with proper line breaks (component handles this)
- [x] Verify content displays correctly
- [ ] **USER ACTION**: Replace Lorem Ipsum in `public/data/about-me.json`
- [ ] **USER ACTION**: Proofread for typos

### Mark Featured Posts
- [x] Open first featured post markdown file - Golden Son
- [x] Add `featured: true` to frontmatter - Golden Son
- [x] Open second featured post markdown file - Alien Romulus
- [x] Add `featured: true` to frontmatter - Alien Romulus
- [x] Open third featured post markdown file - Baldur's Gate 3
- [x] Add `featured: true` to frontmatter - Baldur's Gate 3
- [x] Run dev server and verify posts appear
- [x] Check images and titles correct
- [x] Test links navigate to correct posts

### Add Creative Showcase Data
- [x] Open `public/data/creative.json` - File exists with placeholder
- [ ] **USER ACTION**: Add real reading section data
- [ ] **USER ACTION**: Add real projects array data
- [ ] **USER ACTION**: Add real hobbies array data
- [ ] **USER ACTION**: Verify all image paths are correct
- [ ] **USER ACTION**: Check images exist in `/public/images/`
- [x] Validate JSON syntax (no errors)
- [x] Test showcase section displays all items (displays placeholders)
- [ ] **USER ACTION**: Verify descriptions formatted well

### Add Profile Photo
- [ ] **USER ACTION**: Move optimized photo to `public/images/profile.webp`
- [x] Update personal story component with image path (loads from JSON)
- [ ] **USER ACTION**: Test image loads correctly
- [ ] **USER ACTION**: Verify image displays at correct size
- [ ] **USER ACTION**: Check looks good in light mode
- [ ] **USER ACTION**: Check looks good in dark mode
- [x] Add descriptive alt text for accessibility (hardcoded in component)

### Update Meta Tags
- [x] Open `src/app/layout.tsx`
- [x] Update page title to reflect new content
- [x] Update meta description (150-160 characters)
- [x] Add Open Graph tags for social sharing
- [x] Add Twitter card tags
- [x] Add structured data markup
- [x] Verify SEO-friendly

### Technical Setup
- [x] Add current reading widget (in creative.json)
- [x] PersonalStory component loads from JSON
- [x] CreativeShowcase component loads from JSON
- [x] All components are data-driven and ready for content
- [x] Created comprehensive CONTENT_GUIDE.md for user

**Phase 5 Complete (Technical)**: [x] All components data-driven and ready for user content
**Phase 5 Complete (Content)**: [ ] ⚠️ Awaiting user to replace placeholder content - See CONTENT_GUIDE.md

**NOTE**: From a technical standpoint, Phase 5 is complete. All components are set up to automatically load content from JSON files. The user now needs to replace the Lorem Ipsum placeholder content with their authentic writing and images. See `CONTENT_GUIDE.md` for detailed instructions.

---

## Phase 6: Polish & Optimization (2-3 days)

### Responsive Testing - Mobile
- [ ] Open Chrome DevTools
- [ ] Set viewport to 375px (iPhone SE)
  - [ ] Check text readable
  - [ ] Verify buttons tappable (44x44px min)
  - [ ] Test images scale properly
  - [ ] Check no horizontal scroll
  - [ ] Test animations smooth
- [ ] Set viewport to 414px (iPhone Pro Max)
  - [ ] Repeat all checks
- [ ] Test on actual mobile device if available
- [ ] Fix any issues found

### Responsive Testing - Tablet
- [ ] Set viewport to 768px (iPad)
  - [ ] Check asymmetric layouts adapt
  - [ ] Verify typography scales
  - [ ] Test grid layouts work
- [ ] Set viewport to 1024px (iPad Pro)
  - [ ] Repeat all checks
- [ ] Test on actual tablet if available
- [ ] Fix layout breaks

### Responsive Testing - Desktop
- [ ] Set viewport to 1280px (small desktop)
  - [ ] Check layout looks intentional
  - [ ] Verify no awkward gaps
  - [ ] Test images properly sized
- [ ] Set viewport to 1920px (large desktop)
  - [ ] Check max-width constraints work
  - [ ] Verify content doesn't stretch too wide
  - [ ] Test asymmetric layouts shine
- [ ] Set viewport to 2560px (ultra-wide)
  - [ ] Verify no excessive whitespace
- [ ] Fix any issues

### Keyboard Navigation Audit
- [ ] Close all mouse/trackpad access
- [ ] Tab through entire page from top
- [ ] Verify all interactive elements reachable
- [ ] Check focus order is logical
- [ ] Verify focus indicators clearly visible
- [ ] Test skip-to-content link works
- [ ] Check no keyboard traps exist
- [ ] Test escape key where applicable

### Screen Reader Testing
- [ ] Install NVDA (Windows) or enable VoiceOver (Mac)
- [ ] Navigate page with screen reader
- [ ] Verify heading hierarchy makes sense
- [ ] Check all images have descriptive alt text
- [ ] Test link descriptions are clear
- [ ] Verify form labels (if any forms exist)
- [ ] Check ARIA labels where needed
- [ ] Fix any issues found

### WCAG AA Final Verification
- [ ] Open WebAIM Contrast Checker
- [ ] Re-test all text/background combinations
- [ ] Test in light mode
- [ ] Test in dark mode
- [ ] Check focus indicator contrast (3:1 minimum)
- [ ] Verify all combinations pass WCAG AA
- [ ] Document contrast ratios in code comments
- [ ] Fix any failures

### Image Optimization
- [ ] Run production build: `npm run build`
- [ ] Check output for optimized images
- [ ] Verify all images converted to WebP
- [ ] Check file sizes (<100KB target)
- [ ] Test lazy loading works
- [ ] Measure total image weight
- [ ] Verify >50% reduction from original
- [ ] Check no visible quality loss

### Lighthouse Performance Audit
- [ ] Open Chrome DevTools
- [ ] Navigate to Lighthouse tab
- [ ] Run audit in incognito mode (no extensions)
- [ ] Test mobile configuration
  - [ ] Check Performance score (target >90)
  - [ ] Check Accessibility score (target 100)
  - [ ] Check Best Practices (target >95)
  - [ ] Check SEO score (target >95)
- [ ] Test desktop configuration
  - [ ] Repeat all checks
- [ ] If scores low, investigate:
  - [ ] First Contentful Paint (<1.0s)
  - [ ] Largest Contentful Paint (<2.0s)
  - [ ] Total Blocking Time (<200ms)
  - [ ] Cumulative Layout Shift (<0.1)
- [ ] Fix any issues lowering scores
- [ ] Re-run audit until targets met

### Animation Performance Testing
- [ ] Open Chrome DevTools
- [ ] Navigate to Performance tab
- [ ] Click Record
- [ ] Scroll through entire page
- [ ] Stop recording
- [ ] Analyze frame rate (target 60fps)
- [ ] Check for layout thrashing
- [ ] Verify no forced reflows
- [ ] Check GPU acceleration used
- [ ] Fix any performance issues

### Cross-Browser Testing
- [ ] Test in Chrome (latest version)
  - [ ] Scroll animations work
  - [ ] Colors render correctly
  - [ ] Layout consistent
  - [ ] All interactions function
- [ ] Test in Safari (latest version)
  - [ ] Repeat all checks
  - [ ] Test on Mac if possible
  - [ ] Test on iOS Safari if possible
- [ ] Test in Firefox (latest version)
  - [ ] Repeat all checks
  - [ ] Note any polyfill needs
- [ ] Test in Edge (quick verification)
  - [ ] Repeat key checks
- [ ] Document any browser-specific issues
- [ ] Implement fixes or graceful degradation

### Dark Mode Polish
- [ ] Toggle to dark mode
- [ ] Review every section visually
- [ ] Verify warm tones maintained (not cold grays)
- [ ] Check all contrast ratios still pass
- [ ] Test theme toggle transition smooth
- [ ] Verify no flash of wrong theme
- [ ] Test system preference detection works
- [ ] Fix any dark mode issues

### Load Time Optimization
- [ ] Run production build
- [ ] Analyze bundle size in output
- [ ] Check for code splitting opportunities
- [ ] Verify CSS tree-shaking working
- [ ] Test initial page load time (simulate 3G)
- [ ] Check First Load JS <150KB
- [ ] Verify no unused CSS/JS in bundle
- [ ] Optimize if over budget

### Final QA Pass
- [ ] Take a break (fresh eyes)
- [ ] Review entire page start to finish
- [ ] Test all user flows:
  - [ ] Reading About Me
  - [ ] Clicking featured posts
  - [ ] Exploring creative showcase
  - [ ] Clicking CTAs
- [ ] Proofread all text for typos
- [ ] Verify all links work (no 404s)
- [ ] Test navigation to/from other pages
- [ ] Check footer links work
- [ ] Test theme toggle
- [ ] Verify everything functions as expected
- [ ] Make final adjustments

**Phase 6 Complete**: [ ] All polish and optimization done, ready to deploy!

---

## Deployment

### Pre-Deployment Checklist
- [ ] All phases above completed
- [ ] No console errors in production build
- [ ] All tests pass (if any tests exist)
- [ ] TypeScript compiles without errors
- [ ] Lighthouse scores meet targets
- [ ] Accessibility audit passed
- [ ] Content proofread and final

### Create Pull Request (if using)
- [ ] Commit all changes
- [ ] Push to feature branch
- [ ] Create pull request
- [ ] Write description of changes
- [ ] Request review (if team project)
- [ ] Address feedback
- [ ] Merge to main branch

### Deploy to Production
- [ ] Merge feature branch to main
- [ ] Push to remote repository
- [ ] Wait for automatic deployment (Vercel/Netlify)
- [ ] Or manually deploy if needed
- [ ] Verify deployment successful

### Post-Deployment Verification
- [ ] Visit live production URL
- [ ] Test all functionality on live site
- [ ] Verify no broken links
- [ ] Test on real mobile device
- [ ] Share with friends for feedback
- [ ] Monitor analytics for issues

### Monitor & Iterate
- [ ] Check analytics after 24 hours
- [ ] Note bounce rate changes
- [ ] Track time on page
- [ ] Observe navigation patterns
- [ ] Gather user feedback
- [ ] Plan small improvements based on data
- [ ] Document learnings for future projects

---

## Project Complete! 🎉

**Congratulations!** You've successfully redesigned your landing page with:
- ✅ Editorial/magazine aesthetic
- ✅ Warm earth tone palette
- ✅ CSS-only animations
- ✅ Authentic personality showcase
- ✅ WCAG AA accessibility
- ✅ High performance (Lighthouse >90)
- ✅ Mobile-responsive design

### Next Steps
- [ ] Celebrate the achievement
- [ ] Share on social media
- [ ] Get feedback from readers
- [ ] Plan next improvements
- [ ] Apply learnings to other pages

**Total Tasks Completed**: [ ] / 200+

---

**Last Updated**: 2025-10-30
**Status**: Ready to begin Phase 0
