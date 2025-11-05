# Open Graph & Social Media Metadata

This document explains the Open Graph (OG) and Twitter Card implementation for rich social media previews.

## Overview

Open Graph tags enable rich previews when your content is shared on social media platforms like Facebook, Twitter, LinkedIn, Discord, and Slack. This implementation provides:

- ✅ Comprehensive OG tags for all pages
- ✅ Twitter Card support
- ✅ Automatic metadata generation
- ✅ Type-safe utilities
- ✅ 1200x630px image specifications (recommended size)

## What's Implemented

### 1. Root Layout (`src/app/layout.tsx`)
- Site-wide default metadata
- OpenGraph tags for the homepage
- Twitter Card configuration
- SEO metadata (keywords, authors, robots)

### 2. Metadata Helper Utility (`src/lib/metadata/og-metadata.ts`)
Provides functions to generate metadata:

- `generateOpenGraphMetadata()` - Generic OG metadata generator
- `generatePostMetadata()` - Blog post/review specific metadata
- `generateTripMetadata()` - Backpacking trip specific metadata
- `generatePageMetadata()` - Static page metadata

### 3. Constants (`src/lib/constants.ts`)
Centralized configuration:
- `SITE_URL` - Base URL for the site
- `SITE_NAME` - Site name
- `SITE_DESCRIPTION` - Default description
- `TWITTER_HANDLE` - Twitter account
- `HOME_OG_IMAGE_URL` - Default OG image

## OG Image Requirements

### Recommended Specifications
- **Size**: 1200 x 630 pixels
- **Aspect Ratio**: 1.91:1
- **Format**: JPEG or PNG
- **Max File Size**: < 5 MB (ideally < 300 KB)

### Image Locations

1. **Default OG Image**: `/public/og-default.png`
   - Used for homepage and pages without specific images
   - Should be 1200x630px

2. **Post Images**: Use existing poster images
   - Automatically resized/cropped by social platforms
   - Already handled in `generatePostMetadata()`

3. **Trip Images**: Use hero images from trips
   - Automatically included in metadata
   - Already handled in `generateTripMetadata()`

## Creating Your Default OG Image

### Option 1: Design Tool (Recommended)
Use Figma, Canva, or Photoshop with these specs:
- Canvas: 1200 x 630px
- Include: Your name, site tagline, and branding
- Use readable fonts (min 40px)
- Keep important content in the "safe zone" (center 80%)

### Option 2: Dynamic OG Image Generator
Use a service like:
- [Vercel OG Image Generation](https://vercel.com/docs/functions/edge-functions/og-image-generation)
- [Cloudinary](https://cloudinary.com/)
- [imgix](https://imgix.com/)

### Quick Start Template
```bash
# Create a simple placeholder
convert -size 1200x630 xc:#D97642 \
  -gravity center \
  -pointsize 72 -fill white \
  -annotate +0+0 "Joseph Sutorus\nWriter, Reviewer, Storyteller" \
  public/og-default.png
```

## Usage Examples

### Static Page with Custom Image
```typescript
import { generatePageMetadata } from '@/lib/metadata/og-metadata';

export const metadata = generatePageMetadata({
  title: 'About - Joseph Sutorus',
  description: 'Learn more about Joseph and his journey...',
  path: '/about',
  image: {
    url: '/images/about-og.png',
    alt: 'About Joseph Sutorus',
    width: 1200,
    height: 630,
  },
});
```

### Blog Post (Already Implemented)
```typescript
// src/app/posts/[...slug]/page.tsx
import { generatePostMetadata } from '@/lib/metadata/og-metadata';

export async function generateMetadata(props: Params) {
  const post = getPostBySlug(slugPath);
  return generatePostMetadata({
    title: post.title,
    description: post.description,
    slug: post.slug,
    poster: post.poster,
    completed: post.completed,
    tags: post.tags,
    category: post.category,
  });
}
```

### Backpacking Trip (Already Implemented)
```typescript
// src/app/backpacking/[slug]/page.tsx
import { generateTripMetadata } from '@/lib/metadata/og-metadata';

export async function generateMetadata(props) {
  const trip = data.trips.find((t) => t.id === params.slug);
  return generateTripMetadata(trip);
}
```

## Testing Your OG Tags

### 1. Social Media Debuggers
Test your OG tags using these tools:

- **Facebook**: https://developers.facebook.com/tools/debug/
- **Twitter**: https://cards-dev.twitter.com/validator
- **LinkedIn**: https://www.linkedin.com/post-inspector/
- **Discord**: Paste URL in any Discord channel
- **Slack**: Paste URL in any Slack channel

### 2. View in Browser
View the HTML source of any page and look for:
```html
<meta property="og:title" content="..." />
<meta property="og:description" content="..." />
<meta property="og:image" content="..." />
<meta name="twitter:card" content="summary_large_image" />
```

### 3. Test Locally
```bash
# Start dev server
npm run dev

# Visit any page and view source
open http://localhost:3000
```

## What Each Platform Uses

| Platform | OG Tags | Twitter Cards | Notes |
|----------|---------|---------------|-------|
| Facebook | ✅ | ❌ | Uses OG tags exclusively |
| Twitter/X | ✅ | ✅ | Prefers Twitter Cards, falls back to OG |
| LinkedIn | ✅ | ❌ | Uses OG tags |
| Discord | ✅ | ❌ | Uses OG tags |
| Slack | ✅ | ❌ | Uses OG tags |
| WhatsApp | ✅ | ❌ | Uses OG tags |
| Telegram | ✅ | ❌ | Uses OG tags |

## Troubleshooting

### Image Not Showing
1. **Check image path**: Must be absolute URL or start with `/`
2. **Verify image exists**: Check `/public/og-default.png` exists
3. **Check image size**: Should be 1200x630px
4. **Clear cache**: Use social media debuggers to refresh cache

### Wrong Image Showing
- Social platforms cache OG images for 7-30 days
- Use debugger tools to force a refresh
- Wait 24-48 hours for natural cache expiration

### Description Too Long
- Facebook: 300 characters max
- Twitter: 200 characters max
- Keep descriptions under 160 characters to be safe

## Environment Variables

Add to your `.env.local` and production environment:

```bash
# Site URL (required for OG tags)
NEXT_PUBLIC_SITE_URL=https://sutorus.com
```

## Deployment Checklist

- [ ] Create and add `og-default.png` (1200x630px) to `/public/`
- [ ] Set `NEXT_PUBLIC_SITE_URL` in production environment
- [ ] Update Twitter handle in `src/lib/constants.ts` if needed
- [ ] Test all pages with social media debuggers
- [ ] Verify images load correctly
- [ ] Check mobile previews

## Resources

- [Open Graph Protocol](https://ogp.me/)
- [Twitter Cards Documentation](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards)
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Next.js Metadata API](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
- [OG Image Checker](https://www.opengraph.xyz/)

## Support

For issues or questions about Open Graph implementation, check:
1. This documentation
2. Next.js Metadata documentation
3. The `src/lib/metadata/og-metadata.ts` helper utilities
