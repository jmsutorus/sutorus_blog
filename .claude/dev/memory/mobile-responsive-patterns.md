# Mobile Responsive Patterns

**Last Updated**: 2025-11-03

## Established Patterns

### Mobile Padding Standard
**Pattern**: Use `px-4 sm:px-5` for consistent mobile padding

**Locations Applied**:
- All editorial components (home page)
- All backpacking pages and components
- Container component (global)
- Wedding page components

**Rationale**:
- `px-4` (16px) prevents content from touching screen edges on mobile
- `px-5` (20px) provides slightly more generous spacing on tablet/desktop
- Consistent across entire site for predictable UX

**Exception**: Wedding hero uses `px-6` for more generous spacing

### Responsive Navigation Pattern
**Pattern**: Hamburger menu for mobile, inline links for desktop

**Implementation**:
- Mobile (< 768px): Hamburger button → Sheet component (left sidebar)
- Desktop (≥ 768px): Inline navigation links
- Both: Theme switcher always visible
- Mobile menu: Includes search functionality

**Key Classes**:
- `md:hidden` - Show only on mobile
- `hidden md:flex` - Show only on desktop
- Use Shadcn Sheet component for mobile sidebar

### Preventing Horizontal Scroll
**Pattern**: Add `overflow-x: hidden` to html and body in globals.css

**When to Use**:
- When adding responsive padding causes horizontal scroll
- When full-width sections might overflow on small screens

**Implementation**:
```css
body {
  @apply bg-background text-foreground;
  overflow-x: hidden;
}

html {
  overflow-x: hidden;
}
```

**Important**: This is a global fix that affects all pages

### Responsive Image Handling
**Pattern**: Use different images for mobile/desktop when composition requires it

**Implementation**:
```tsx
// Desktop image
<div className="absolute inset-0 hidden md:block">
  <Image src={desktopImage} ... />
</div>

// Mobile image
<div className="absolute inset-0 md:hidden">
  <Image src={mobileImage} ... />
</div>
```

**When to Use**:
- Hero images where subject is off-center
- Portrait vs landscape orientations
- When cropping alone isn't sufficient

### Animation Visibility
**Pattern**: Remove or reduce animations that obscure content

**Lessons Learned**:
- Animated gradients can make text hard to read
- Static backgrounds with subtle colors often work better
- If animations cause visibility issues, remove them in favor of clarity
- Decorative blur circles are acceptable as they're positioned behind content

## Breakpoints
Following Tailwind's default system:
- `sm:` - 640px (tablet)
- `md:` - 768px (desktop)
- `lg:` - 1024px (large desktop)
- `xl:` - 1280px (extra large)

## Common Issues & Solutions

### Issue: Content touching screen edges
**Solution**: Add `px-4 sm:px-5` to container divs

### Issue: Horizontal scrolling on mobile
**Solution**: Add `overflow-x: hidden` to html and body in globals.css

### Issue: Navigation too cramped on mobile
**Solution**: Use hamburger menu with Sheet component

### Issue: Hero images don't look good on mobile
**Solution**: Use conditional rendering with different images for mobile/desktop

### Issue: Animations making content hard to see
**Solution**: Remove or reduce animation opacity; use static backgrounds

## Testing Checklist
When implementing responsive changes:
- [ ] Build completes successfully
- [ ] No horizontal scroll on mobile (320px width)
- [ ] Content doesn't touch screen edges
- [ ] Touch targets are at least 44x44px
- [ ] Text is readable without zooming
- [ ] Images load properly on both mobile and desktop
- [ ] Navigation works smoothly on both views
- [ ] Animations don't obscure content

## Files to Update
When adding new pages, ensure these follow mobile patterns:
1. Container component usage with proper padding
2. Navigation accessibility on mobile
3. Image responsive sizing
4. No horizontal overflow

## Dependencies
- `@radix-ui/react-dialog` - For Sheet component
- May need `--legacy-peer-deps` flag due to React version
