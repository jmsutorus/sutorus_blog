# Landing Page Redesign - Task Checklist

**Last Updated**: 2025-10-30

Track your progress through the landing page redesign project. Mark tasks complete with ✅ as you finish them.

---

## Phase 0: Content Strategy & Preparation (2-3 days)

### Content Writing
- [ ] Write authentic "About Me" section (300-400 words)
  - [ ] Draft initial version
  - [ ] Include what drives your writing
  - [ ] Mention personal values and mission
  - [ ] Add creative hobbies and interests
  - [ ] Review and refine for authenticity
  - [ ] Get feedback from trusted friend
  - [ ] Finalize content

### Featured Posts
- [ ] Review all existing blog posts
- [ ] Identify 3 posts to feature
- [ ] Verify posts have compelling titles
- [ ] Check posts have appropriate images
- [ ] Select posts that represent diverse themes

### Creative Showcase
- [ ] List 4-6 hobbies/interests to showcase
- [ ] Gather or create images for each item
- [ ] Write brief descriptions (50-100 words each)
- [ ] Organize into categories (reading, projects, hobbies)
- [ ] Review for authenticity and personality

### Profile Photo
- [ ] Select appropriate profile photo
- [ ] Crop/edit to 800x800px
- [ ] Convert to WebP format
- [ ] Optimize to <100KB file size
- [ ] Save to project directory

### API Updates
- [ ] Open `src/interfaces/post.ts`
- [ ] Add `featured?: boolean` field to Post interface
- [ ] Add `category?: string` field (optional)
- [ ] Verify TypeScript strict mode compliance
- [ ] Open `src/lib/api.ts`
- [ ] Create `getFeaturedPosts()` function
- [ ] Test function returns correct posts
- [ ] Handle edge case: <3 featured posts exist

### Content Data Structure
- [ ] Create `public/data/creative.json`
- [ ] Define JSON schema for showcase items
- [ ] Add reading section with current book
- [ ] Add projects array with 2-3 items
- [ ] Add hobbies array with interests
- [ ] Validate JSON syntax
- [ ] Verify all image paths exist

**Phase 0 Complete**: [ ] All content prepared and ready for implementation

---

## Phase 1: Foundation & Design System (1-2 days)

### Color Palette
- [ ] Open `src/app/globals.css`
- [ ] Update `:root` section with light mode HSL values
  - [ ] `--primary: 18 65% 55%` (Terracotta)
  - [ ] `--secondary: 41 75% 68%` (Amber)
  - [ ] `--accent: 28 70% 62%` (Golden)
  - [ ] `--background: 40 40% 97%` (Cream)
  - [ ] `--foreground: 20 35% 20%` (Deep brown)
  - [ ] `--muted: 35 25% 90%` (Warm gray)
- [ ] Update `.dark` section with dark mode HSL values
  - [ ] `--primary: 18 65% 60%` (Lighter terracotta)
  - [ ] `--secondary: 41 75% 72%` (Lighter amber)
  - [ ] `--background: 20 40% 12%` (Rich brown)
  - [ ] `--foreground: 40 40% 95%` (Warm cream)
  - [ ] `--muted: 20 20% 25%` (Warm dark gray)
- [ ] Save and test in browser
- [ ] Toggle dark mode and verify colors

### Contrast Verification
- [ ] Open WebAIM Contrast Checker
- [ ] Test foreground on background (light mode)
- [ ] Test foreground on background (dark mode)
- [ ] Test primary on background (both modes)
- [ ] Test all text color combinations
- [ ] Document contrast ratios in code comments
- [ ] Adjust colors if any fail WCAG AA

### Typography Configuration
- [ ] Open `tailwind.config.ts`
- [ ] Navigate to `theme.extend.fontSize`
- [ ] Add/verify font size definitions:
  - [ ] `'4xl': '2.25rem'` (36px)
  - [ ] `'5xl': '3rem'` (48px)
  - [ ] `'6xl': '3.75rem'` (60px)
  - [ ] `'7xl': '4.5rem'` (72px)
  - [ ] `'8xl': '6rem'` (96px)
  - [ ] `'9xl': '8rem'` (128px)
- [ ] Add line-height: `'relaxed': '1.7'`
- [ ] Save and run `npm run build` to verify
- [ ] Fix any TypeScript errors

### CSS Animations
- [ ] Create new file: `src/app/styles/animations.css`
- [ ] Add `@keyframes fade-in-up` animation
- [ ] Add `@keyframes fade-in` animation
- [ ] Add `@keyframes scale-in` animation
- [ ] Add `@keyframes gradient-shift` animation
- [ ] Add `.scroll-animate` utility class
- [ ] Add `@supports` feature detection
- [ ] Add `@media (prefers-reduced-motion)` support
- [ ] Test animations work in Chrome/Safari

### Animation Import
- [ ] Open `src/app/layout.tsx`
- [ ] Import `./styles/animations.css`
- [ ] Verify no CSS conflicts
- [ ] Test animations available globally

### Image Optimizer
- [ ] Run: `npm install next-image-export-optimizer`
- [ ] Wait for installation to complete
- [ ] Open `next.config.js` (or create if missing)
- [ ] Add optimizer configuration
- [ ] Test in development mode
- [ ] Verify images optimize correctly

### Smooth Scroll
- [ ] Open `src/app/globals.css`
- [ ] Add `html { scroll-behavior: smooth; }`
- [ ] Add `@media (prefers-reduced-motion)` override
- [ ] Test smooth scrolling on anchor links

**Phase 1 Complete**: [ ] All foundation work done, ready to build components

---

## Phase 2: Component Development (4-5 days)

### Hero Section
- [ ] Create directory: `src/app/_components/editorial/`
- [ ] Create file: `hero-editorial.tsx`
- [ ] Define TypeScript interface for props
- [ ] Implement asymmetric grid layout (60/40)
- [ ] Add left side: Name, subtitle, mission
- [ ] Add right side: Featured article card
- [ ] Style with warm gradient background
- [ ] Add responsive breakpoints (mobile stack)
- [ ] Test responsiveness
- [ ] Add fade-in animation on load
- [ ] Add text stagger effect
- [ ] Test animations smooth
- [ ] Verify TypeScript compiles
- [ ] Test with real featured post data

### Animated Gradient
- [ ] Create directory: `src/app/_components/animations/`
- [ ] Create file: `animated-gradient.tsx`
- [ ] Define prop types (colors configurable)
- [ ] Implement CSS gradient animation
- [ ] Optimize for mobile (simpler version)
- [ ] Test performance (60fps maintained)
- [ ] Make reusable across sections

### Personal Story
- [ ] Create file: `editorial/personal-story.tsx`
- [ ] Define prop types (content, image)
- [ ] Implement magazine two-column layout
- [ ] Add profile photo on left
- [ ] Add bio content on right
- [ ] Add decorative warm shapes (CSS/SVG)
- [ ] Implement CSS parallax on photo
- [ ] Add fade-in on scroll animation
- [ ] Test reduced-motion preference
- [ ] Verify responsive (single column mobile)
- [ ] Test keyboard navigation
- [ ] Optimize image loading

### Featured Writing
- [ ] Create file: `editorial/featured-writing.tsx`
- [ ] Define prop types (posts array)
- [ ] Implement CSS Grid asymmetric layout
- [ ] Add large post card (2/3 width, spans 2 rows)
- [ ] Add two small post cards (1/3 width, stacked)
- [ ] Integrate `getFeaturedPosts()` API
- [ ] Style with image overlays
- [ ] Add warm gradient masks on images
- [ ] Implement hover effects (scale, text reveal)
- [ ] Add stagger fade-in animation
- [ ] Handle missing images gracefully
- [ ] Verify links navigate correctly
- [ ] Test mobile layout (single column)

### Creative Showcase
- [ ] Create file: `editorial/creative-showcase.tsx`
- [ ] Define prop types or fetch JSON directly
- [ ] Load data from `public/data/creative.json`
- [ ] Implement bento-grid layout (varied sizes)
- [ ] Create reading card
- [ ] Create project cards
- [ ] Create hobby cards
- [ ] Style with warm backgrounds
- [ ] Add hover reveal effects
- [ ] Add subtle floating animation
- [ ] Test all showcase items render
- [ ] Verify images load and optimize
- [ ] Test responsive grid collapse

### CTA Section
- [ ] Create file: `editorial/cta-section.tsx`
- [ ] Implement full-width banner
- [ ] Add animated gradient background
- [ ] Add bold headline
- [ ] Create three CTA buttons (Primary, Secondary, Tertiary)
- [ ] Style buttons with warm theme
- [ ] Link buttons to appropriate pages
- [ ] Add background gradient animation
- [ ] Test mobile layout adaptation
- [ ] Verify accessible focus states

### Update Nav
- [ ] Open `src/app/_components/nav.tsx`
- [ ] Update colors to warm palette
- [ ] Style with new HSL variables
- [ ] Update hover effects
- [ ] Test dark mode
- [ ] Verify mobile menu works
- [ ] Check all links are valid

### Update Footer
- [ ] Open `src/app/_components/footer.tsx`
- [ ] Apply warm color scheme
- [ ] Style social links with hover effects
- [ ] Test dark mode compatibility
- [ ] Verify social links work

### Update Button Component
- [ ] Open `src/components/ui/button.tsx`
- [ ] Add "warm" variant to variants object
- [ ] Style with warm color palette
- [ ] Update hover states
- [ ] Test all button variants still work
- [ ] Verify TypeScript types

### Verify/Create Routes
- [ ] Check if `src/app/about/page.tsx` exists
  - [ ] If missing, create placeholder page
  - [ ] Apply warm color scheme
- [ ] Check if `src/app/projects/page.tsx` exists
  - [ ] If missing, create placeholder page
  - [ ] Apply warm color scheme
- [ ] Check if `src/app/contact/page.tsx` exists
  - [ ] If missing, create placeholder page
  - [ ] Apply warm color scheme
- [ ] Test all nav links (no 404 errors)

**Phase 2 Complete**: [ ] All components built and tested individually

---

## Phase 3: Layout Integration (1 day)

### Update Landing Page
- [ ] Open `src/app/page.tsx`
- [ ] Import all new editorial components
- [ ] Remove old hero section code
- [ ] Add `<HeroEditorial />` component
- [ ] Remove old about section code
- [ ] Add `<PersonalStory />` component
- [ ] Remove old explore section code
- [ ] Add `<FeaturedWriting />` component
- [ ] Add `<CreativeShowcase />` component
- [ ] Add `<CTASection />` component
- [ ] Pass necessary props to each component
- [ ] Verify TypeScript compiles without errors

### Clean Up Old Code
- [ ] Remove unused imports
- [ ] Delete old section code
- [ ] Clean up any unused variables
- [ ] Remove console.logs or debug code
- [ ] Run linter to check code quality

### Test Integration
- [ ] Run dev server: `npm run dev`
- [ ] Check all sections render
- [ ] Verify no console errors
- [ ] Check spacing between sections
- [ ] Test scroll behavior
- [ ] Verify visual hierarchy

**Phase 3 Complete**: [ ] Landing page fully integrated with new components

---

## Phase 4: Animation & Interactivity (1-2 days)

### Scroll Animations
- [ ] Add `.scroll-animate` to personal story section
- [ ] Add `.scroll-animate` to featured writing section
- [ ] Add `.scroll-animate` to creative showcase section
- [ ] Add `.scroll-animate` to CTA section
- [ ] Test animation triggers at correct scroll positions
- [ ] Adjust `animation-range` values if needed
- [ ] Verify animations smooth (60fps)
- [ ] Test in Chrome, Safari, Firefox

### Stagger Animations
- [ ] Add stagger delays to featured writing cards
  - [ ] Card 1: no delay
  - [ ] Card 2: 100ms delay
  - [ ] Card 3: 200ms delay
- [ ] Add stagger delays to creative showcase items
  - [ ] Use `:nth-child()` selectors
  - [ ] 150ms between each card
- [ ] Test stagger timing feels natural
- [ ] Adjust if too slow or too fast

### Hero Animations
- [ ] Implement text line stagger on page load
- [ ] Add scroll indicator pulse animation
- [ ] Test entrance timing
- [ ] Verify doesn't block user interaction
- [ ] Test on slow connections

### Hover Micro-Interactions
- [ ] Style button hover (scale + glow)
- [ ] Style card hover (lift effect)
- [ ] Style link hover (underline animation)
- [ ] Test all hover effects smooth (200ms duration)
- [ ] Verify proper easing curves applied
- [ ] Add accessible focus states
- [ ] Test on touch devices (no stuck hovers)

### Parallax Effects
- [ ] Implement profile photo parallax in personal story
- [ ] Implement CTA background parallax
- [ ] Test parallax performance (no jank)
- [ ] Verify respects `prefers-reduced-motion`
- [ ] Consider disabling on mobile if performance issue

### Test Reduced Motion
- [ ] Enable `prefers-reduced-motion: reduce` in browser
- [ ] Verify all animations disabled
- [ ] Check page still looks good without animations
- [ ] Verify no functionality lost
- [ ] Test content remains accessible
- [ ] Disable preference and re-test

**Phase 4 Complete**: [ ] All animations and interactions polished

---

## Phase 5: Content Integration (1 day)

### Add About Me Content
- [ ] Copy written content from Phase 0
- [ ] Paste into personal story component (or prop)
- [ ] Format with proper line breaks
- [ ] Verify content displays correctly
- [ ] Check no Lorem Ipsum remains
- [ ] Proofread for typos

### Mark Featured Posts
- [ ] Open first featured post markdown file
- [ ] Add `featured: true` to frontmatter
- [ ] Open second featured post markdown file
- [ ] Add `featured: true` to frontmatter
- [ ] Open third featured post markdown file
- [ ] Add `featured: true` to frontmatter
- [ ] Run dev server and verify posts appear
- [ ] Check images and titles correct
- [ ] Test links navigate to correct posts

### Add Creative Showcase Data
- [ ] Open `public/data/creative.json`
- [ ] Add reading section data
- [ ] Add projects array data
- [ ] Add hobbies array data
- [ ] Verify all image paths are correct
- [ ] Check images exist in `/public/images/`
- [ ] Validate JSON syntax (no errors)
- [ ] Test showcase section displays all items
- [ ] Verify descriptions formatted well

### Add Profile Photo
- [ ] Move optimized photo to `public/images/profile.webp`
- [ ] Update personal story component with image path
- [ ] Test image loads correctly
- [ ] Verify image displays at correct size
- [ ] Check looks good in light mode
- [ ] Check looks good in dark mode
- [ ] Add descriptive alt text for accessibility

### Update Meta Tags
- [ ] Open `src/app/layout.tsx`
- [ ] Update page title to reflect new content
- [ ] Update meta description (150-160 characters)
- [ ] Add Open Graph tags for social sharing
- [ ] Test meta tags with preview tool
- [ ] Verify SEO-friendly

### Add Personal Touches
- [ ] Add current reading widget (if not in JSON)
- [ ] Add "Now" section (what you're currently learning)
- [ ] Add Easter egg or fun element (optional)
- [ ] Verify at least 2 personal touches added
- [ ] Check they enhance personality showcase

**Phase 5 Complete**: [ ] All authentic content integrated, no placeholders remain

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
