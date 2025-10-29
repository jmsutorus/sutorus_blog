# Transformation Plan: Post System Refactor

## Overview
Transform the blog post system from a traditional blog structure to a media review system (movies/shows) with new metadata fields. The filename will serve as the title instead of a front matter field.

---

## Phase 1: Interface Updates

### 1.1 Update `src/interfaces/post.ts`

**Current fields to REMOVE:**
- `title` (will be derived from filename)
- `coverImage` (replaced by `poster`)
- `author` (no longer needed)
- `excerpt` (replaced by `plot`)
- `ogImage` (may keep for SEO, or derive from `poster`)
- `preview` (optional, may remove)

**New fields to ADD:**
- `category: string` - Type of media (e.g., "movie", "tv-show", "documentary")
- `poster: string` - Path to poster image
- `length: string` - Runtime (e.g., "2h 15m", "45min")
- `genre: string | string[]` - Genre(s) of the media
- `year: number | string` - Release year
- `cast: string[]` - Array of cast member names
- `plot: string` - Plot summary/description
- `watched: boolean | string` - Whether watched, or date watched
- `tags: string[]` - Arbitrary tags for categorization
- `rating: number` - User rating (e.g., 1-10 or 1-5)

**Fields to KEEP:**
- `slug: string` - URL-friendly identifier (derived from filename)
- `date: string` - Date of review/post
- `content: string` - Main review content

**New Post interface structure:**
```typescript
export type Post = {
  slug: string;
  title: string;           // Derived from filename
  date: string;
  category: string;
  poster: string;
  length: string;
  genre: string | string[];
  year: number | string;
  cast: string[];
  plot: string;
  watched: boolean | string;
  tags: string[];
  rating: number;
  content: string;
  ogImage?: {              // Optional, for SEO
    url: string;
  };
};
```

### 1.2 Remove `src/interfaces/author.ts`
- Remove entirely if author is no longer relevant, or keep if still needed
- Update Post interface imports to remove Author dependency

---

## Phase 2: API Layer Updates

### 2.1 Update `src/lib/api.ts`

**Key changes in `getPostBySlug(slug: string)`:**

1. **Extract title from filename:**
   ```typescript
   // Before parsing front matter
   const realSlug = slug.replace(/\.md$/, "");

   // Convert slug to title
   // Example: "the-dark-knight" -> "The Dark Knight"
   const title = realSlug
     .split('-')
     .map(word => word.charAt(0).toUpperCase() + word.slice(1))
     .join(' ');
   ```

2. **Update return statement:**
   ```typescript
   return {
     ...data,
     slug: realSlug,
     title,           // Add derived title
     content
   } as Post;
   ```

**Considerations for `getAllPosts()`:**
- Current sorting by `date` should still work
- Consider adding additional sorting options:
  - By rating (highest/lowest)
  - By year
  - By category
  - By watched status

### 2.2 Add helper functions (optional)
```typescript
// Filter posts by category
export function getPostsByCategory(category: string): Post[] {
  return getAllPosts().filter(post => post.category === category);
}

// Filter posts by genre
export function getPostsByGenre(genre: string): Post[] {
  return getAllPosts().filter(post =>
    Array.isArray(post.genre)
      ? post.genre.includes(genre)
      : post.genre === genre
  );
}

// Get unwatched posts
export function getUnwatchedPosts(): Post[] {
  return getAllPosts().filter(post => !post.watched);
}
```

---

## Phase 3: Component Updates

### 3.1 Components requiring updates

**High priority (will break without changes):**

1. **`src/app/_components/post-header.tsx`**
   - Remove `author` prop and Avatar display
   - Add display for: rating, year, length, genre
   - Update coverImage references to poster

2. **`src/app/_components/hero-post.tsx`**
   - Update props: coverImage → poster, excerpt → plot, remove author
   - Add: category, rating, year badges/chips

3. **`src/app/_components/post-preview.tsx`**
   - Update props: coverImage → poster, excerpt → plot, remove author
   - Add: category, rating display

4. **`src/app/_components/cover-image.tsx`**
   - Rename to `poster-image.tsx` (optional but clearer)
   - Update to handle poster images specifically

5. **`src/app/_components/more-stories.tsx`**
   - Update prop passing to PostPreview components

**Medium priority:**

6. **`src/app/_components/post-body.tsx`**
   - May need updates depending on content structure
   - Consider adding cast list, tags display

7. **`src/app/_components/avatar.tsx`**
   - Remove or repurpose for cast member avatars

**Low priority (cosmetic):**

8. **`src/app/_components/intro.tsx`**
   - Update text to reflect media review purpose

9. **`src/app/_components/header.tsx`**
   - Update branding/title

10. **`src/app/_components/footer.tsx`**
    - Update footer text if needed

### 3.2 New components to create (optional enhancements)

- **`rating-display.tsx`** - Visual rating component (stars, numbers)
- **`genre-badges.tsx`** - Display genre(s) as styled badges
- **`cast-list.tsx`** - Display cast members
- **`tag-list.tsx`** - Display tags with links
- **`category-filter.tsx`** - Filter posts by category
- **`watch-status.tsx`** - Display watched status

---

## Phase 4: Page Updates

### 4.1 Update `src/app/page.tsx`
- Update prop destructuring for new Post fields
- Remove author prop passing
- Add new fields: category, rating, poster, plot, etc.

### 4.2 Update `src/app/posts/[slug]/page.tsx`
- Update PostHeader prop passing
- Update metadata generation (title, ogImage)
- Consider adding structured data for media (Schema.org)

### 4.3 Update `src/lib/constants.ts`
- Update CMS_NAME if needed (e.g., "Markdown" → "Media Reviews")
- Update HOME_OG_IMAGE_URL

---

## Phase 5: Markdown File Migration

### 5.1 Example new front matter structure

**Old format (`hello-world.md`):**
```yaml
---
title: "Learn How to Pre-render Pages"
excerpt: "Lorem ipsum..."
coverImage: "/assets/blog/hello-world/cover.jpg"
date: "2020-03-16T05:35:07.322Z"
author:
  name: Tim Neutkens
  picture: "/assets/blog/authors/tim.jpeg"
ogImage:
  url: "/assets/blog/hello-world/cover.jpg"
---
```

**New format (filename: `the-dark-knight.md`):**
```yaml
---
category: "movie"
poster: "/assets/media/the-dark-knight/poster.jpg"
length: "2h 32m"
genre: ["Action", "Crime", "Drama"]
year: 2008
cast:
  - "Christian Bale"
  - "Heath Ledger"
  - "Aaron Eckhart"
  - "Michael Caine"
plot: "When the menace known as the Joker wreaks havoc on Gotham, Batman must accept one of the greatest tests."
watched: true
tags: ["superhero", "batman", "nolan", "must-watch"]
rating: 9.5
date: "2024-01-15T12:00:00.000Z"
---

My review content goes here...
```

### 5.2 Migration steps for existing posts

1. **Backup current `_posts` directory**
2. **For each existing post:**
   - Remove `title` from front matter (use filename instead)
   - Rename `coverImage` → `poster`
   - Rename `excerpt` → `plot`
   - Remove `author` field
   - Add required new fields: category, length, genre, year, cast, watched, tags, rating
3. **Rename files if needed** to reflect proper titles
4. **Update image paths** in `/public/assets/` directory structure

### 5.3 Migration script (optional)

Consider creating `scripts/migrate-posts.js` to automate:
- Reading existing posts
- Transforming front matter
- Writing updated files
- Validating new structure

---

## Phase 6: Type Safety & Validation

### 6.1 TypeScript updates
- Run `npx tsc --noEmit` after each phase to catch type errors
- Update all component prop types
- Ensure Post interface is correctly implemented everywhere

### 6.2 Runtime validation (optional)
Consider adding validation for:
- Required fields in front matter
- Rating bounds (e.g., 0-10)
- Year format
- Category values (enum)
- Genre values

---

## Phase 7: Testing & Verification

### 7.1 Manual testing checklist
- [ ] Homepage displays correctly with new fields
- [ ] Individual post pages show all new fields
- [ ] Filename correctly converts to title
- [ ] Images (posters) load correctly
- [ ] Sorting by date still works
- [ ] No TypeScript errors
- [ ] Build completes successfully (`npm run build`)
- [ ] All pages render in production build

### 7.2 Build & deploy
```bash
npm run build
npm start
```

---

## Phase 8: Optional Enhancements

### 8.1 Features to consider adding later
- Category/genre filtering on homepage
- Search functionality
- Rating sorting/filtering
- "Watched" vs "Watchlist" separation
- Tag-based navigation
- Related posts by genre/tags
- Statistics page (avg rating, total watched, etc.)

### 8.2 SEO enhancements
- Add Schema.org structured data for Movie/TVSeries
- Update meta tags for media content
- Generate social media cards with poster images

---

## Decision Points & Questions

1. **Author field:** Completely remove or keep for multi-author support?
2. **Rating scale:** 1-5 stars or 1-10 numeric?
3. **Watched field:** date string to track when watched
4. **Genre field:** Single string or array of strings?
5. **Year field:** Number or string (to support "2024-2025" or "TBA")?
6. **Category values:** Define enum/allowed values or free text?
7. **Image directory:** Rename to `/assets/media/`
8. **Preview functionality:** Remove `preview` field entirely?

---

## Implementation Order (Recommended)

1. ✅ **Phase 1:** Update interfaces (post.ts)
2. ✅ **Phase 2:** Update API layer (api.ts) - especially title extraction
3. ✅ **Phase 3:** Update core components (post-header, hero-post, post-preview)
4. ✅ **Phase 4:** Update pages (page.tsx, [slug]/page.tsx)
5. ✅ **Phase 5:** Migrate one test post to validate changes
6. ✅ **Phase 6:** Run type checking and fix errors
7. ✅ **Phase 7:** Test build and deployment
8. ✅ **Phase 5 (complete):** Migrate all remaining posts
9. ✅ **Phase 8:** Add optional enhancements

---

## Rollback Plan

If issues arise:
1. Git branch for all changes
2. Keep backup of original `_posts` directory
3. Tag working commit before starting transformation
4. Can revert interfaces and API changes independently

---

## Estimated Effort

- **Phase 1-2 (Interfaces & API):** 30-60 minutes
- **Phase 3 (Components):** 1-2 hours
- **Phase 4 (Pages):** 30-45 minutes
- **Phase 5 (Migration):** 15-30 minutes per post
- **Phase 6-7 (Testing):** 1 hour
- **Total:** 4-6 hours for complete transformation

---

## Notes

- Title extraction logic should handle edge cases (numbers, special chars, acronyms)
- Consider URL structure: `/posts/the-dark-knight` vs `/movies/the-dark-knight`
- Decide on consistent image naming conventions
- Update CLAUDE.md after transformation is complete
