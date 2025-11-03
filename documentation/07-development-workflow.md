# Development Workflow

This guide covers building, testing, debugging, and deploying the site.

## Table of Contents

- [Getting Started](#getting-started)
- [Development Commands](#development-commands)
- [Adding New Pages](#adding-new-pages)
- [Testing Approach](#testing-approach)
- [Debugging Tips](#debugging-tips)
- [Build Process](#build-process)
- [Deployment](#deployment)
- [Common Issues](#common-issues)

## Getting Started

### Prerequisites

- **Node.js**: Version 18.x or higher
- **npm**: Version 9.x or higher (comes with Node.js)
- **Git**: For version control
- **Text Editor**: VS Code recommended

### Initial Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd sutorus_blog
   ```

2. **Install dependencies:**
   ```bash
   npm install --force
   ```

3. **Run development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   - Visit http://localhost:3000
   - Site should load with hot reloading enabled

## Development Commands

### npm run dev

**Purpose:** Start development server with hot reloading

```bash
npm run dev

# Or with turbopack (faster)
npm run dev --turbopack
```

**Features:**
- Hot module replacement (HMR)
- Fast refresh for React components
- Instant updates on file changes
- Development error overlay
- Runs on http://localhost:3000

**When to use:**
- Active development
- Testing changes locally
- Debugging

### npm run build

**Purpose:** Build site for production

```bash
npm run build
```

**What it does:**
1. Type checks TypeScript
2. Compiles pages and components
3. Generates static HTML for all routes
4. Optimizes images
5. Minifies JavaScript and CSS
6. Creates `.next` directory with build output

**Output:**
```
Route (app)                              Size
┌ ○ /                                   5.2 kB
├ ○ /about                              3.1 kB
├ ○ /backpacking                        8.5 kB
├ ○ /backpacking/[slug]                 12 kB
├ ○ /posts/[...slug]                    6.2 kB
└ ○ /reviews                            10 kB

Total build time: ~30-60 seconds
```

**When to use:**
- Before deployment
- Testing production build
- Checking bundle sizes
- Verifying all pages generate correctly

### npm start

**Purpose:** Start production server

```bash
npm start
```

**Requirements:**
- Must run `npm run build` first
- Serves optimized production build
- No hot reloading
- Runs on http://localhost:3000

**When to use:**
- Testing production build locally
- Verifying performance
- Final checks before deployment

### Type Checking

**Check types without building:**
```bash
npx tsc --noEmit
```

**Watch mode (continuous checking):**
```bash
npx tsc --noEmit --watch
```

## Adding New Pages

### Static Page

**Example:** Add an "About" page

1. **Create page file:**
   ```
   src/app/about/page.tsx
   ```

2. **Add page content:**
   ```tsx
   import { Container } from '@/app/_components/container';

   export const metadata = {
     title: 'About',
     description: 'Learn more about Joseph Sutorus'
   };

   export default function AboutPage() {
     return (
       <Container>
         <h1 className="text-4xl font-bold mb-6">About Me</h1>
         <p>Page content here...</p>
       </Container>
     );
   }
   ```

3. **Add to navigation:**
   ```tsx
   // src/app/_components/nav.tsx
   <Link href="/about">About</Link>
   ```

4. **Test:**
   - Visit http://localhost:3000/about
   - Verify page loads correctly

### Dynamic Page

**Example:** Individual trip pages

1. **Create dynamic route:**
   ```
   src/app/backpacking/[slug]/page.tsx
   ```

2. **Implement page:**
   ```tsx
   import backpackingData from '@/public/data/backpacking.json';

   // Tell Next.js which routes to generate
   export async function generateStaticParams() {
     return backpackingData.trips.map(trip => ({
       slug: trip.id
     }));
   }

   // Generate metadata for each page
   export async function generateMetadata({ params }) {
     const trip = backpackingData.trips.find(t => t.id === params.slug);
     return {
       title: trip.name,
       description: trip.story.substring(0, 160)
     };
   }

   // Page component
   export default function TripPage({ params }) {
     const trip = backpackingData.trips.find(t => t.id === params.slug);

     return (
       <div>
         <h1>{trip.name}</h1>
         {/* Trip content */}
       </div>
     );
   }
   ```

3. **Test:**
   - Visit http://localhost:3000/backpacking/yosemite-2024
   - Verify dynamic content loads

4. **Build and verify:**
   ```bash
   npm run build
   ```
   - Check that all dynamic routes are generated

### Page with Layout

1. **Create layout file:**
   ```
   src/app/backpacking/layout.tsx
   ```

2. **Add layout:**
   ```tsx
   export default function BackpackingLayout({ children }) {
     return (
       <div>
         <header className="bg-green-100 p-4">
           <h2>Backpacking Section</h2>
         </header>
         <main>{children}</main>
       </div>
     );
   }
   ```

3. **Layout applies to all pages in directory:**
   - `/backpacking/page.tsx`
   - `/backpacking/[slug]/page.tsx`
   - `/backpacking/trips/page.tsx`

## Testing Approach

This project uses manual testing rather than automated tests.

### Manual Testing Checklist

**Before Every Commit:**
- ✅ Site builds without errors (`npm run build`)
- ✅ No TypeScript errors (`npx tsc --noEmit`)
- ✅ Pages load correctly in browser
- ✅ Links navigate properly
- ✅ Images display correctly

**Before Deployment:**
- ✅ Test all main pages (home, reviews, backpacking, wedding)
- ✅ Test dynamic routes (individual posts/trips)
- ✅ Test search functionality
- ✅ Test dark mode toggle
- ✅ Test mobile navigation
- ✅ Test on mobile device or responsive mode
- ✅ Check for console errors
- ✅ Verify performance (Lighthouse score)

### Browser Testing

**Recommended browsers:**
- Chrome/Edge (Chromium)
- Firefox
- Safari (if on Mac)
- Mobile Safari (iOS)
- Chrome Mobile (Android)

**Testing procedure:**
1. Open browser DevTools (F12)
2. Enable responsive design mode
3. Test at different screen sizes:
   - Mobile: 375px (iPhone SE)
   - Tablet: 768px (iPad)
   - Desktop: 1920px

### Performance Testing

**Lighthouse (built into Chrome DevTools):**

1. Open DevTools (F12)
2. Navigate to "Lighthouse" tab
3. Select "Performance" category
4. Click "Analyze page load"
5. Review scores (aim for 90+):
   - Performance: 90+
   - Accessibility: 95+
   - Best Practices: 95+
   - SEO: 100

**Core Web Vitals:**
- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1

### Accessibility Testing

**Basic checks:**
- Tab through page (keyboard navigation)
- Test with screen reader (NVDA on Windows, VoiceOver on Mac)
- Check color contrast
- Verify alt text on images
- Test with keyboard only (no mouse)

## Debugging Tips

### TypeScript Errors

**Error: Type mismatch**
```
Type 'string' is not assignable to type 'number'
```

**Solution:**
- Check prop types
- Verify data structure
- Use TypeScript's error message to locate issue

**Common fix:**
```tsx
// Wrong
<StatsBox distance={trip.distance} />  // distance is string

// Right
interface StatsBoxProps {
  distance: string;  // Update interface
}
```

### Build Errors

**Error: "Module not found"**

**Solution:**
- Check import path is correct
- Verify file exists
- Check for typos in filename
- Ensure path alias (@/) is working

**Error: "Invalid JSON"**

**Solution:**
- Validate JSON file at https://jsonlint.com
- Check for trailing commas
- Verify quotes are double quotes
- Check all brackets/braces are closed

### Runtime Errors

**Error in browser console:**

**Step 1:** Read error message
- Error location (file and line number)
- Error type (TypeError, ReferenceError, etc.)
- Stack trace

**Step 2:** Add debugging
```tsx
console.log('Variable value:', myVariable);
console.log('Props:', props);
```

**Step 3:** Use browser DevTools
- Set breakpoints
- Step through code
- Inspect variables

### Hot Reload Not Working

**Solutions:**
1. Restart dev server:
   ```bash
   # Stop with Ctrl+C, then:
   npm run dev
   ```

2. Clear `.next` cache:
   ```bash
   rm -rf .next
   npm run dev
   ```

3. Check file is saved
4. Check for syntax errors

### Hydration Errors

**Error: "Text content does not match"**

**Cause:** Server-rendered HTML doesn't match client

**Solutions:**
- Don't use `Date.now()` or `Math.random()` in render
- Use `suppressHydrationWarning` if unavoidable
- Ensure conditional logic is consistent

```tsx
// Wrong (random on each render)
<div>{Math.random()}</div>

// Right (consistent value)
const [value] = useState(() => Math.random());
<div>{value}</div>
```

## Build Process

### Build Steps

```
1. TypeScript Compilation
   ↓
2. Page Generation
   ↓
3. Component Bundling
   ↓
4. CSS Processing
   ↓
5. Image Optimization
   ↓
6. Asset Minification
   ↓
7. Static HTML Output
```

### Build Output

```
.next/
├── cache/              # Build cache
├── server/             # Server components
│   └── app/           # Route handlers
├── static/             # Static assets
│   ├── chunks/        # JavaScript bundles
│   ├── css/           # Compiled CSS
│   └── media/         # Optimized images
└── BUILD_ID           # Unique build identifier
```

### Incremental Builds

Next.js caches unchanged pages for faster rebuilds:

**First build:** 45-60 seconds
**Subsequent builds:** 10-20 seconds (only changed pages)

**Clear cache if needed:**
```bash
rm -rf .next
npm run build
```

## Deployment

### Vercel Deployment (Recommended)

**Setup:**

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Ready to deploy"
   git push origin main
   ```

2. **Connect to Vercel:**
   - Go to https://vercel.com
   - Click "Import Project"
   - Select your GitHub repository
   - Vercel auto-detects Next.js

3. **Configure (if needed):**
   - Build command: `npm run build`
   - Output directory: `.next`
   - Install command: `npm install`

4. **Deploy:**
   - Click "Deploy"
   - Wait 2-3 minutes
   - Site is live!

**Continuous Deployment:**
- Every push to `main` triggers deployment
- Preview deployments for pull requests
- Automatic HTTPS and CDN

### Manual Deployment

**For other hosting (Netlify, AWS S3, etc.):**

1. **Build locally:**
   ```bash
   npm run build
   ```

2. **Export static files (if needed):**
   ```bash
   # Add to package.json
   "scripts": {
     "export": "next export"
   }

   npm run build
   npm run export
   ```

3. **Upload `out/` directory** to hosting

### Environment Variables

If using environment variables:

1. **Create `.env.local`:**
   ```
   NEXT_PUBLIC_SITE_URL=https://example.com
   ```

2. **Add to Vercel:**
   - Project Settings → Environment Variables
   - Add each variable
   - Redeploy

3. **Use in code:**
   ```tsx
   const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
   ```

### Deployment Checklist

Before deploying:
- ✅ Build succeeds locally
- ✅ No TypeScript errors
- ✅ Test production build (`npm start`)
- ✅ Check all images load
- ✅ Verify environment variables
- ✅ Test on multiple browsers
- ✅ Run Lighthouse audit
- ✅ Update README if needed

After deploying:
- ✅ Visit production URL
- ✅ Test key user flows
- ✅ Check mobile experience
- ✅ Verify search works
- ✅ Test dark mode
- ✅ Check console for errors

## Common Issues

### Issue: "Module not found: Can't resolve '@/lib/api'"

**Cause:** TypeScript path alias not working

**Solution:**
1. Check `tsconfig.json`:
   ```json
   {
     "compilerOptions": {
       "paths": {
         "@/*": ["./src/*"]
       }
     }
   }
   ```

2. Restart TypeScript server in VS Code:
   - Cmd/Ctrl + Shift + P
   - "TypeScript: Restart TS Server"

### Issue: Build fails with "Out of memory"

**Cause:** Large build, insufficient memory

**Solution:**
```bash
# Increase Node.js memory
NODE_OPTIONS=--max_old_space_size=4096 npm run build
```

### Issue: Images not loading in production

**Cause:** Image domain not configured

**Solution:**
Add domain to `next.config.js`:
```javascript
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'your-image-domain.com',
      },
    ],
  },
};
```

### Issue: "Hydration failed" error

**Cause:** Server/client mismatch

**Solution:**
1. Check for `window` or `document` usage in server components
2. Move client-only code to `useEffect`:
   ```tsx
   useEffect(() => {
     // Browser-only code
   }, []);
   ```

3. Use `suppressHydrationWarning` if intentional:
   ```tsx
   <div suppressHydrationWarning>
     {new Date().toLocaleString()}
   </div>
   ```

### Issue: Dark mode flickers on load

**Cause:** Theme applied after initial render

**Solution:**
Add inline script in `<head>`:
```tsx
<script dangerouslySetInnerHTML={{
  __html: `
    (function() {
      const theme = localStorage.getItem('theme') || 'light';
      document.documentElement.classList.toggle('dark', theme === 'dark');
    })();
  `
}} />
```

### Issue: Slow build times

**Solutions:**

1. **Clear cache:**
   ```bash
   rm -rf .next node_modules/.cache
   ```

2. **Update dependencies:**
   ```bash
   npm update
   ```

3. **Check for large imports:**
   - Avoid importing entire libraries
   - Use tree-shaking
   ```tsx
   // Bad
   import _ from 'lodash';

   // Good
   import debounce from 'lodash/debounce';
   ```

4. **Use dynamic imports for heavy components:**
   ```tsx
   const HeavyComponent = dynamic(() => import('./heavy'));
   ```

## Git Workflow

### Typical Workflow

1. **Create feature branch:**
   ```bash
   git checkout -b feature/new-page
   ```

2. **Make changes and commit:**
   ```bash
   git add .
   git commit -m "Add new about page"
   ```

3. **Test locally:**
   ```bash
   npm run build
   npm start
   ```

4. **Push to GitHub:**
   ```bash
   git push origin feature/new-page
   ```

5. **Create pull request** (if using PR workflow)

6. **Merge to main:**
   ```bash
   git checkout main
   git merge feature/new-page
   git push origin main
   ```

### Commit Message Conventions

```
feat: Add book review for Red Rising
fix: Correct image aspect ratio on mobile
docs: Update README with new instructions
style: Format code with Prettier
refactor: Simplify post card component
perf: Optimize image loading
chore: Update dependencies
```

## Next Steps

Now that you understand the full development workflow, you can:

- [Add new content](./03-content-management.md)
- [Create new components](./04-component-architecture.md)
- [Customize styling](./05-styling-guide.md)
- [Add special features](./06-special-features.md)

## Additional Resources

**Next.js Documentation:**
- https://nextjs.org/docs

**Tailwind CSS:**
- https://tailwindcss.com/docs

**React:**
- https://react.dev/

**TypeScript:**
- https://www.typescriptlang.org/docs/

**Vercel Deployment:**
- https://vercel.com/docs
