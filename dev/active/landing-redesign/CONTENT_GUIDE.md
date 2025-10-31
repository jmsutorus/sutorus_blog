# Landing Page Content Guide

**Last Updated**: 2025-10-30
**Status**: Phase 5 - Technical Setup Complete, Awaiting User Content

---

## Overview

Phase 5 (Content Integration) is **technically complete**. All components are now data-driven and will automatically load content from JSON files. However, the JSON files currently contain **placeholder Lorem Ipsum text** that needs to be replaced with your authentic content.

---

## ✅ Already Complete

### 1. Featured Posts
**Status**: ✅ **COMPLETE**

Three posts are already marked with `featured: true` in their frontmatter:
- **Golden Son** (Book review)
- **Alien Romulus** (Movie review)
- **Baldur's Gate 3** (Video game review)

**Action Required**: None - these will automatically appear in the Featured Writing section.

### 2. Component Setup
**Status**: ✅ **COMPLETE**

All components are now data-driven:
- PersonalStory loads from `/data/about-me.json`
- CreativeShowcase loads from `/data/creative.json`
- FeaturedWriting loads from the blog posts API
- Meta tags enhanced for SEO

---

## 📝 Awaiting Your Content

### 1. About Me Content

**File**: `public/data/about-me.json`

**Current Status**: Contains Lorem Ipsum placeholder

**What to Update**:
```json
{
  "content": "YOUR AUTHENTIC ABOUT ME TEXT HERE (300-400 words)\n\nUse \\n\\n to separate paragraphs.\n\nEach paragraph will be displayed separately on the page.",
  "profileImage": "/images/profile.webp"
}
```

**Writing Guidelines**:
- Write 300-400 words in 3-4 paragraphs
- Include what drives your writing
- Mention your values and mission
- Add creative hobbies and interests
- Be authentic - no generic language!
- Use `\n\n` (two newlines) to separate paragraphs

**Example Structure**:
```
Paragraph 1: Who you are and what you do
Paragraph 2: What drives your writing/reviewing
Paragraph 3: Your creative pursuits and interests
Paragraph 4 (optional): Your goals or vision
```

---

### 2. Profile Photo

**Current Status**: Using placeholder URL

**What to Do**:

1. **Prepare Your Photo**:
   - Select a professional/personal photo
   - Resize to 800x800 pixels (square aspect ratio)
   - Convert to WebP format (for optimization)
   - Optimize to <100KB file size
   - Name it: `profile.webp`

2. **Add to Project**:
   ```bash
   # Place your photo here:
   public/images/profile.webp
   ```

3. **Update JSON**:
   - The path in `about-me.json` is already set to `/images/profile.webp`
   - Once you add the file, it will automatically load!

**Tools for Optimization**:
- [Squoosh](https://squoosh.app/) - Free online image optimizer
- [CloudConvert](https://cloudconvert.com/) - Format conversion

---

### 3. Creative Showcase Content

**File**: `public/data/creative.json`

**Current Status**: Contains Lorem Ipsum placeholders

**What to Update**:

#### Reading Section
```json
"reading": {
  "title": "Currently Reading",
  "book": "YOUR CURRENT BOOK TITLE",
  "author": "AUTHOR NAME",
  "cover": "/images/book-cover.webp",
  "description": "Why you're reading this book and what you're learning from it (50-100 words)"
}
```

#### Projects Section (2-3 items)
```json
"projects": [
  {
    "title": "YOUR PROJECT NAME",
    "description": "What the project is about, what you built, technologies used (50-100 words)",
    "image": "/images/project-1.webp",
    "link": "https://your-project-url.com"
  }
]
```

#### Hobbies Section (3-5 items)
```json
"hobbies": [
  {
    "title": "YOUR HOBBY NAME",
    "description": "What you enjoy about this hobby (30-50 words)",
    "image": "/images/hobby-1.webp"
  }
]
```

**Image Requirements**:
- **Book cover**: 400x600px (portrait)
- **Project images**: 600x400px (landscape)
- **Hobby images**: 400x400px (square)
- All images should be WebP format, <100KB each

**Where to Place Images**:
```
public/images/
├── book-cover.webp
├── project-1.webp
├── project-2.webp
├── hobby-1.webp
├── hobby-2.webp
└── ...
```

---

## 🎨 Content Writing Tips

### For About Me Section:

**DO**:
- ✅ Write in first person ("I'm passionate about...")
- ✅ Be specific about your interests
- ✅ Show your personality
- ✅ Mention concrete examples
- ✅ Keep paragraphs 2-4 sentences each

**DON'T**:
- ❌ Use generic phrases like "passionate professional"
- ❌ Write in third person
- ❌ Make it sound like a resume
- ❌ Use corporate jargon
- ❌ Exceed 400 words

### For Creative Showcase:

**DO**:
- ✅ Choose hobbies that genuinely interest you
- ✅ Explain why each hobby matters to you
- ✅ Use active, engaging language
- ✅ Vary your descriptions
- ✅ Include both popular and unique interests

**DON'T**:
- ❌ List hobbies you don't actually do
- ❌ Use identical sentence structures
- ❌ Make descriptions too short (<20 words)
- ❌ Make descriptions too long (>100 words)

---

## 📋 Step-by-Step Content Integration

### Option 1: Minimal Update (Quick Start)

Just update the text content:

1. Open `public/data/about-me.json`
2. Replace the `content` field with your authentic about me text
3. Save the file
4. Refresh your browser - done!

### Option 2: Full Update (Recommended)

Complete content integration:

1. **Write Your About Me** (15-30 minutes)
   - Open `public/data/about-me.json`
   - Write 300-400 words about yourself
   - Use `\n\n` to separate paragraphs
   - Save the file

2. **Prepare Your Profile Photo** (10-15 minutes)
   - Find/take a good photo
   - Resize to 800x800px
   - Convert to WebP
   - Save as `public/images/profile.webp`

3. **Update Creative Showcase** (30-45 minutes)
   - Open `public/data/creative.json`
   - Update current reading
   - Add 2-3 real projects
   - Add 3-5 real hobbies
   - Save the file

4. **Prepare Showcase Images** (15-30 minutes)
   - Resize and optimize images
   - Save to `public/images/`
   - Update image paths in JSON

5. **Test Everything** (5 minutes)
   - Run `npm run dev`
   - Visit http://localhost:3000
   - Verify all content displays correctly
   - Check images load properly

---

## 🔍 Testing Your Content

After updating the JSON files:

```bash
# Start the dev server
npm run dev

# Visit the homepage
# Check each section:
# - Hero: Should show your first featured post
# - Personal Story: Should show your about me content and photo
# - Featured Writing: Should show 3 featured posts
# - Creative Showcase: Should show your reading, projects, hobbies
# - CTA: Static section, should be fine
```

**What to Verify**:
- [ ] About Me text displays correctly with proper paragraph breaks
- [ ] Profile photo loads and looks good
- [ ] Creative showcase displays all items
- [ ] All images load without errors
- [ ] No Lorem Ipsum text remains
- [ ] Content reads naturally
- [ ] Links work (projects section)

---

## 📊 Content Checklist

Use this checklist to track your progress:

### About Me Section
- [ ] Written 300-400 words of authentic content
- [ ] Used proper paragraph breaks (`\n\n`)
- [ ] Updated `public/data/about-me.json`
- [ ] Prepared profile photo (800x800px, WebP)
- [ ] Added photo to `public/images/profile.webp`
- [ ] Tested and verified display

### Creative Showcase
- [ ] Updated current reading book and description
- [ ] Added book cover image
- [ ] Added 2-3 real projects with descriptions
- [ ] Added project images
- [ ] Added 3-5 real hobbies with descriptions
- [ ] Added hobby images
- [ ] Updated all image paths in JSON
- [ ] Tested and verified display

### Images
- [ ] Created `public/images/` directory
- [ ] Optimized all images (<100KB each)
- [ ] Converted all images to WebP
- [ ] Proper dimensions for each image type
- [ ] All images display correctly on the page

---

## 🆘 Troubleshooting

### Issue: Images Not Loading

**Solution**:
- Verify file paths are correct (case-sensitive!)
- Ensure images are in `public/images/` not `public/data/images/`
- Check that image files have `.webp` extension
- Try hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

### Issue: Paragraph Breaks Not Showing

**Solution**:
- Use `\n\n` (two backslash-n) to separate paragraphs in JSON
- Example: `"First paragraph.\n\nSecond paragraph."`
- Not just `\n` or actual line breaks

### Issue: Content Still Shows Placeholder

**Solution**:
- Make sure you saved the JSON file
- Hard refresh the browser
- Check browser console for JSON loading errors
- Verify JSON syntax is valid (use JSONLint.com)

### Issue: JSON Syntax Error

**Solution**:
- Copy your JSON to [JSONLint](https://jsonlint.com/) to validate
- Common errors:
  - Missing comma between items
  - Extra comma after last item
  - Unescaped quotes in text
  - Missing closing brace `}`

---

## 🎯 Next Steps After Content Integration

Once you've added all your content:

1. **Review Everything**: Do a full site walkthrough
2. **Get Feedback**: Share with a friend for their thoughts
3. **Continue to Phase 6**: Polish & Optimization
4. **Deploy**: Push to production when ready!

---

## 📞 Need Help?

If you run into issues:

1. Check the troubleshooting section above
2. Verify JSON syntax at JSONLint.com
3. Check browser console for errors (F12 → Console tab)
4. Review this guide for formatting requirements

---

**Remember**: The technical setup is complete! All you need to do is replace the placeholder content with your authentic writing and images. The components will automatically load and display your content.

**Current Status**: Ready for your content! 🎉
