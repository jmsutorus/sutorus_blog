# Content Management Guide

This guide explains how to add, edit, and manage different types of content on the site. No coding experience is required for basic content updates!

## Table of Contents

- [Overview](#overview)
- [Adding Book Reviews](#adding-book-reviews)
- [Editing Existing Reviews](#editing-existing-reviews)
- [Managing Backpacking Trips](#managing-backpacking-trips)
- [Updating Wedding Content](#updating-wedding-content)
- [Managing JSON Data Files](#managing-json-data-files)
- [Working with Images](#working-with-images)
- [Content Publishing Workflow](#content-publishing-workflow)

## Overview

All content on the site is stored in simple text files that anyone can edit:

- **Book Reviews**: Markdown files in `public/data/_posts/Books/`
- **Backpacking Trips**: JSON file at `public/data/backpacking.json`
- **Wedding Content**: JSON file at `public/data/wedding.json`
- **About Page**: JSON file at `public/data/about-me.json`

After editing content, you need to rebuild the site for changes to appear.

## Adding Book Reviews

### Step 1: Create a New Markdown File

Navigate to: `public/data/_posts/Books/`

Create a new file with the format: `Book-Title-Slug.md`

**Naming conventions:**
- Use title case with hyphens: `The-Way-of-Kings.md`
- No spaces, use hyphens instead
- Match the actual book title as closely as possible

### Step 2: Add Frontmatter (Metadata)

At the top of the file, add metadata between `---` markers:

```markdown
---
completed: 2025-01-22T00:00:00.000Z
released: 2024-08-15
genre:
  - Fiction
  - Fantasy
title: The Way of Kings
poster: 'https://m.media-amazon.com/images/I/91example.jpg'
authors: '[[Brandon Sanderson]]'
description: 'According to mythology mankind used to live in The Tranquiline Halls. Heaven. But then the Voidbringers assaulted and captured heaven...'
tags:
  - books
  - stormlight_archive
  - year_2025
  - january
rating: 9.5
finished: true
category: Books
length: '1007 pages'
featured: true
---
```

#### Frontmatter Fields Explained

| Field | Required | Format | Description |
|-------|----------|--------|-------------|
| `completed` | Yes | ISO Date | Date you finished reading |
| `released` | No | ISO Date | Publication date |
| `genre` | Yes | Array | List of genres |
| `title` | No | String | Title (auto-generated from filename if omitted) |
| `poster` | Yes | URL | Book cover image URL |
| `authors` | Yes | String | Author name(s), wrapped in `[[]]` |
| `description` | Yes | String | Book summary/plot |
| `tags` | Yes | Array | Keywords for searching |
| `rating` | Yes | Number | Your rating (0-10) |
| `finished` | Yes | Boolean | `true` or `false` |
| `category` | Yes | String | Always "Books" for book reviews |
| `length` | No | String | Page count, e.g., "500 pages" |
| `featured` | No | Boolean | Show on home page if `true` |

### Step 3: Add Review Content

After the frontmatter closing `---`, write your review in markdown:

```markdown
---
(frontmatter here)
---

### Summary

Brief overview of the book and your experience reading it.

### Favorite Quotes

- "Quote one from the book" - Character Name
- "Another meaningful quote"

### Final Thoughts

Your overall impression, who would enjoy this book, etc.

### Key Takeaways

- Lesson or insight one
- Lesson or insight two

### Characters

**Main Character Name**
- Description and thoughts

**Another Character**
- Description and thoughts
```

#### Markdown Formatting Tips

```markdown
# Heading 1
## Heading 2
### Heading 3

**Bold text**
*Italic text*

- Bullet point
- Another bullet

1. Numbered list
2. Second item

[Link text](https://example.com)

> Blockquote for emphasis
```

### Step 4: Find a Cover Image

**Recommended sources:**
- Amazon product page (right-click cover image → Copy Image Address)
- Google Books
- Goodreads

**Image requirements:**
- Must be HTTPS URL (not HTTP)
- Reasonable size (under 1 MB)
- Good quality (at least 400x600px)

**Example URLs:**
```
https://m.media-amazon.com/images/I/81exampleID.jpg
https://images.igdb.com/igdb/image/example.jpg
```

### Complete Example

```markdown
---
completed: 2025-01-15T00:00:00.000Z
released: 2010-08-31
genre:
  - Fiction
  - Fantasy
  - Epic Fantasy
title: The Way of Kings
poster: 'https://m.media-amazon.com/images/I/91example.jpg'
authors: '[[Brandon Sanderson]]'
description: 'According to mythology mankind used to live in The Tranquiline Halls. Heaven. But then the Voidbringers assaulted and captured heaven, casting out God and men. Men took root on Roshar, the world of storms, but the Voidbringers followed.'
tags:
  - books
  - stormlight_archive
  - fantasy
  - year_2025
rating: 9.5
finished: true
category: Books
length: '1007 pages'
featured: true
---

### Summary

The Way of Kings is the first book in Brandon Sanderson's epic Stormlight Archive series. Set on the storm-swept world of Roshar, it follows multiple viewpoint characters as they navigate politics, war, and ancient mysteries.

I was completely captivated by the worldbuilding and character development. Sanderson's magic system is intricate and fascinating, and the action sequences are breathtaking.

### Favorite Quotes

- "The most important step a man can take is always the next one." - Dalinar Kholin
- "Life before death. Strength before weakness. Journey before destination." - The First Ideal

### Final Thoughts

This is easily one of the best fantasy novels I've read. Highly recommended for anyone who enjoys deep worldbuilding and complex character arcs. Be prepared for a long read, but it's absolutely worth it.

The book starts a bit slow, but trust the process. The payoff in the final third is incredible.

### Key Takeaways

- Actions define us more than intentions
- Leadership requires sacrifice
- Question everything, even ancient wisdom

### Characters

**Kaladin Stormblessed**
- Former soldier turned slave
- Compelling arc about finding purpose
- His journey is the emotional core of the book

**Dalinar Kholin**
- Highprince struggling with mysterious visions
- Complex character balancing honor and duty
- His storyline kept me on edge

**Shallan Davar**
- Young scholar with secrets
- Her chapters start slow but become essential
- Great character growth throughout
```

## Editing Existing Reviews

### Step 1: Find the File

Navigate to `public/data/_posts/Books/` and open the file you want to edit.

### Step 2: Make Changes

Edit the frontmatter or content as needed. Common edits:
- Update rating after reflection
- Add more thoughts to the review
- Fix typos
- Add/remove tags
- Change featured status

### Step 3: Save and Rebuild

Save the file, then rebuild the site (see [Content Publishing Workflow](#content-publishing-workflow)).

## Managing Backpacking Trips

Backpacking content is stored in a single JSON file: `public/data/backpacking.json`

### File Structure

```json
{
  "hero": {
    "title": "Backpacking Adventures",
    "subtitle": "Exploring wilderness one trail at a time",
    "image": { ... }
  },
  "trips": [ ... ],
  "gear": { ... }
}
```

### Adding a New Trip

Add a new object to the `trips` array:

```json
{
  "id": "unique-trip-slug",
  "featured": true,
  "name": "Trail Name",
  "location": "Location, State",
  "dates": "Month Day-Day, Year",
  "hero": {
    "url": "https://res.cloudinary.com/...",
    "alt": "Description",
    "width": 4898,
    "height": 3265
  },
  "stats": {
    "distance": "XX.X miles",
    "elevation": "+X,XXX ft",
    "difficulty": "Easy/Moderate/Difficult",
    "duration": "X days / X nights",
    "season": "Best season to visit",
    "permits": "Permit requirements",
    "routeUrl": "https://www.alltrails.com/..."
  },
  "story": "Overview paragraph about the trip...",
  "itinerary": [
    {
      "day": 1,
      "title": "Day 1 Title",
      "distance": "XX miles",
      "elevation": "+XXX ft",
      "highlights": [
        "Highlight one",
        "Highlight two"
      ],
      "description": "Detailed day description...",
      "images": [
        {
          "url": "https://res.cloudinary.com/...",
          "alt": "Photo description",
          "width": 800,
          "height": 600,
          "caption": "Photo caption"
        }
      ]
    }
  ],
  "photos": [
    {
      "url": "https://res.cloudinary.com/...",
      "alt": "Photo description",
      "width": 4898,
      "height": 3265,
      "caption": "Optional caption"
    }
  ],
  "gearHighlights": [
    "Gear item that worked well",
    "Another useful item"
  ],
  "tips": [
    "Helpful tip for future hikers",
    "Another important tip"
  ]
}
```

### Editing Trip Details

1. Find the trip in the `trips` array by its `id`
2. Update any fields you need to change
3. Save the file
4. Rebuild the site

### Adding Photos to a Trip

Photos can go in two places:

**Itinerary Photos** (specific to a day):
```json
{
  "day": 2,
  "images": [
    {
      "url": "https://res.cloudinary.com/dkwuzhlyz/image/upload/v1762/photo.jpg",
      "alt": "Description",
      "width": 800,
      "height": 600,
      "caption": "Photo caption"
    }
  ]
}
```

**Gallery Photos** (general trip photos):
```json
{
  "photos": [
    {
      "url": "https://res.cloudinary.com/dkwuzhlyz/image/upload/v1762/photo.jpg",
      "alt": "Description",
      "width": 4898,
      "height": 3265,
      "caption": "Optional caption"
    }
  ]
}
```

## Updating Wedding Content

Wedding content is in `public/data/wedding.json`

### File Structure

```json
{
  "hero": { ... },
  "story": [ ... ],
  "gallery": [ ... ],
  "metadata": { ... }
}
```

### Updating the Hero Section

```json
{
  "hero": {
    "title": "Our Wedding Day",
    "names": "Joseph & Elizabeth",
    "date": "October 24, 2025",
    "location": "Paniolo Ranch, Boerne",
    "image": {
      "url": "https://res.cloudinary.com/...",
      "alt": "Description",
      "width": 1920,
      "height": 1080,
      "blurDataURL": "https://res.cloudinary.com/..."
    },
    "mobileImage": { ... }
  }
}
```

### Adding to the Story

The `story` array contains narrative sections with alternating image positions:

```json
{
  "story": [
    {
      "content": "Story paragraph with multiple sentences...",
      "image": {
        "url": "https://res.cloudinary.com/...",
        "alt": "Photo description",
        "width": 800,
        "height": 600
      },
      "imagePosition": "left"
    },
    {
      "content": "Another story paragraph...",
      "image": { ... },
      "imagePosition": "right"
    }
  ]
}
```

**Tips:**
- Alternate `imagePosition` between `"left"` and `"right"` for visual variety
- Keep paragraphs to 2-4 sentences for readability
- Choose images that complement the story

### Adding Photos to the Gallery

```json
{
  "gallery": [
    {
      "url": "https://res.cloudinary.com/dkwuzhlyz/image/upload/v1762/photo.jpg",
      "alt": "Photo description",
      "width": 1000,
      "height": 1000,
      "caption": "Optional caption (appears below photo)"
    }
  ]
}
```

**Gallery tips:**
- Mix vertical, horizontal, and square photos for visual interest
- Captions are optional but add personality
- Put most important photos near the beginning

## Managing JSON Data Files

### JSON Syntax Rules

JSON is strict about formatting. Follow these rules:

1. **Strings** must use double quotes: `"value"` not `'value'`
2. **No trailing commas**: Last item can't have comma
3. **Booleans** are lowercase: `true` not `True`
4. **Numbers** don't need quotes: `9.5` not `"9.5"`
5. **Arrays** use square brackets: `["item1", "item2"]`
6. **Objects** use curly braces: `{"key": "value"}`

### Common JSON Mistakes

❌ **Wrong:**
```json
{
  "title": 'My Title',    // Single quotes
  "rating": "9.5",        // Number as string
  "tags": ["one", "two",] // Trailing comma
}
```

✅ **Correct:**
```json
{
  "title": "My Title",
  "rating": 9.5,
  "tags": ["one", "two"]
}
```

### Validating JSON

Before saving, validate your JSON:

1. Use a JSON validator: https://jsonlint.com/
2. Copy your JSON, paste it, click "Validate JSON"
3. Fix any errors shown
4. Save the file

## Working with Images

### Image Storage Options

**Cloudinary (Recommended for trip photos):**
- Upload to Cloudinary account
- Get public URL
- Supports optimization and transformations
- Used for: Backpacking photos, wedding photos

**External URLs (For book covers, etc.):**
- Amazon product images
- Other CDNs
- Ensure they're HTTPS and stable

### Image URL Format

Cloudinary URLs follow this pattern:
```
https://res.cloudinary.com/[CLOUD_NAME]/image/upload/v[VERSION]/[PUBLIC_ID].[FORMAT]
```

Example:
```
https://res.cloudinary.com/dkwuzhlyz/image/upload/v1762014835/DSCF0325_nnjyfv.jpg
```

### Image Size Guidelines

| Use Case | Recommended Size | Format |
|----------|-----------------|---------|
| Book covers | 400x600px min | JPG |
| Trip hero images | 1920x1280px | JPG |
| Gallery photos | 1000x1000px | JPG |
| Thumbnails | 400x300px | JPG |

### Optimizing Images

For Cloudinary images, you can add transformations:

**Original:**
```
https://res.cloudinary.com/dkwuzhlyz/image/upload/v1762/photo.jpg
```

**With optimization:**
```
https://res.cloudinary.com/dkwuzhlyz/image/upload/f_auto,q_auto:good,w_1200/v1762/photo.jpg
```

Transformations:
- `f_auto` - Automatic format (WebP when supported)
- `q_auto:good` - Automatic quality optimization
- `w_1200` - Resize to 1200px width

### Creating Blur Placeholders

For better loading experience, add blur placeholders:

```
https://res.cloudinary.com/dkwuzhlyz/image/upload/e_blur:600/v1762/photo.jpg
```

## Content Publishing Workflow

### Local Changes (Development)

1. **Edit content files** (markdown or JSON)
2. **Save changes**
3. **Rebuild the site:**
   ```bash
   npm run build
   ```
4. **Test locally:**
   ```bash
   npm start
   ```
   Visit http://localhost:3000

### Deploying Changes (Production)

#### If using Vercel:

1. **Commit changes:**
   ```bash
   git add .
   git commit -m "Add new book review: The Way of Kings"
   ```

2. **Push to GitHub:**
   ```bash
   git push origin main
   ```

3. **Automatic deployment:**
   - Vercel detects the push
   - Builds the site automatically
   - Deploys to production
   - Usually takes 2-3 minutes

#### If using manual deployment:

1. **Build the site:**
   ```bash
   npm run build
   ```

2. **Upload** the `.next` folder to your hosting

3. **Restart** the server if necessary

### Content Checklist

Before publishing new content, verify:

- ✅ All required frontmatter fields filled out
- ✅ No typos in content
- ✅ Image URLs are valid and load
- ✅ JSON syntax is valid (if editing JSON)
- ✅ Dates are in correct ISO format
- ✅ Tags follow existing conventions
- ✅ Rating is between 0-10
- ✅ Site builds without errors
- ✅ Content appears correctly on localhost

## Tips and Best Practices

### Writing Reviews

- **Be consistent** with your rating scale
- **Use tags** liberally for better search
- **Add context** - why did you like/dislike it?
- **Include quotes** that resonated with you
- **Update later** if your opinion changes

### Organizing Content

- **Use categories** to group similar content
- **Tag chronologically**: year_2025, january
- **Tag thematically**: fantasy, non_fiction, biography
- **Feature your favorites** with `featured: true`

### Image Best Practices

- **High quality** but not huge file sizes
- **Descriptive alt text** for accessibility
- **Consistent aspect ratios** within a section
- **Test on mobile** - images should look good on small screens

### JSON Editing Tips

- **Use a proper text editor** (VS Code, Sublime, etc.)
- **Enable JSON formatting** in your editor
- **Make small changes** and test frequently
- **Keep backups** before major edits
- **Validate before saving**

## Troubleshooting

### "Build failed" error

**Check for:**
- JSON syntax errors (missing commas, quotes)
- Invalid frontmatter in markdown
- Missing required fields
- Broken image URLs

**Solution:**
- Review the error message
- Fix the indicated file
- Rebuild

### Images not loading

**Check:**
- URL is HTTPS (not HTTP)
- URL is accessible in browser
- Image domain is in `next.config.js` allowlist

**Solution:**
- Test URL directly in browser
- Add domain to `next.config.js` if needed
- Rebuild

### Content not updating

**Common causes:**
- Didn't rebuild after editing
- Cached version showing
- Wrong file edited

**Solution:**
- Run `npm run build`
- Hard refresh browser (Ctrl+Shift+R)
- Verify correct file was edited

### Rating not showing

**Check:**
- Rating is a number, not a string: `9.5` not `"9.5"`
- Rating field is present in frontmatter

## Next Steps

- [Component Architecture](./04-component-architecture.md) - Understand how content is displayed
- [Development Workflow](./07-development-workflow.md) - Full build and deployment process
- [Styling Guide](./05-styling-guide.md) - Customizing the appearance
