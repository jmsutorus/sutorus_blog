# Styling Guide

This guide covers the styling system, theme configuration, design patterns, and how to customize the site's appearance.

## Table of Contents

- [Styling System Overview](#styling-system-overview)
- [Tailwind CSS Basics](#tailwind-css-basics)
- [Theme Configuration](#theme-configuration)
- [Color System](#color-system)
- [Typography](#typography)
- [Responsive Design](#responsive-design)
- [Dark Mode](#dark-mode)
- [Animation System](#animation-system)
- [Common Patterns](#common-patterns)
- [Customization Guide](#customization-guide)

## Styling System Overview

The site uses a multi-layered styling approach:

1. **Tailwind CSS** - Utility-first framework (primary)
2. **CSS Custom Properties** - Theme values (colors, spacing)
3. **CSS Modules** - Component-specific styles (rare)
4. **Global CSS** - Base styles and resets

### Why Tailwind?

- **Fast Development**: Style directly in JSX
- **Consistency**: Design system built-in
- **Performance**: Only used classes included
- **Responsive**: Mobile-first utilities
- **Dark Mode**: Built-in support

## Tailwind CSS Basics

### Utility Classes

Tailwind provides utility classes for every CSS property:

```tsx
<div className="
  p-4          /* padding: 1rem (16px) */
  mt-8         /* margin-top: 2rem (32px) */
  bg-blue-500  /* background-color: #3b82f6 */
  text-white   /* color: white */
  rounded-lg   /* border-radius: 0.5rem */
  shadow-md    /* box-shadow: medium */
">
  Content
</div>
```

### Spacing Scale

Tailwind uses a consistent spacing scale:

```
0   = 0px
1   = 0.25rem (4px)
2   = 0.5rem  (8px)
4   = 1rem    (16px)
6   = 1.5rem  (24px)
8   = 2rem    (32px)
12  = 3rem    (48px)
16  = 4rem    (64px)
20  = 5rem    (80px)
```

**Usage:**
```tsx
<div className="p-4">      {/* padding: 16px all sides */}
<div className="px-6">     {/* padding: 24px left & right */}
<div className="py-8">     {/* padding: 32px top & bottom */}
<div className="pt-12">    {/* padding-top: 48px */}
<div className="mb-20">    {/* margin-bottom: 80px */}
```

### Layout Utilities

**Flexbox:**
```tsx
<div className="flex items-center justify-between gap-4">
  <div>Left</div>
  <div>Right</div>
</div>
```

**Grid:**
```tsx
<div className="grid grid-cols-3 gap-6">
  <div>Column 1</div>
  <div>Column 2</div>
  <div>Column 3</div>
</div>
```

**Container:**
```tsx
<div className="container mx-auto px-4">
  {/* Centered, max-width content */}
</div>
```

## Theme Configuration

Theme values are defined in `tailwind.config.ts`:

```typescript
const config: Config = {
  darkMode: ["class", "class"],
  theme: {
    extend: {
      colors: { ... },
      fontSize: { ... },
      spacing: { ... },
      // ... more customizations
    }
  }
}
```

### Custom Colors

```typescript
colors: {
  'accent-1': '#FAFAFA',
  'accent-2': '#EAEAEA',
  'accent-7': '#333',
  success: '#0070f3',
  cyan: '#79FFE1',
}
```

**Usage:**
```tsx
<div className="bg-accent-1 text-accent-7">
  Custom colored div
</div>
```

### Custom Font Sizes

```typescript
fontSize: {
  '4xl': '2.25rem',   // 36px - Mobile hero
  '5xl': '3rem',      // 48px
  '6xl': '3.75rem',   // 60px - Tablet hero
  '7xl': '4.5rem',    // 72px
  '8xl': '6rem',      // 96px - Desktop hero
  '9xl': '8rem'       // 128px
}
```

**Usage:**
```tsx
<h1 className="text-4xl md:text-6xl lg:text-8xl">
  Responsive Hero Text
</h1>
```

### Custom Spacing

```typescript
spacing: {
  '28': '7rem'  // 112px
}
```

## Color System

### Semantic Colors (CSS Variables)

The site uses semantic color names that adapt to dark mode:

```css
/* In globals.css */
:root {
  --background: 0 0% 100%;      /* White */
  --foreground: 222 47% 11%;    /* Dark text */
  --card: 0 0% 100%;
  --primary: 222 47% 11%;
  --muted: 210 40% 96%;
  --accent: 210 40% 96%;
  /* ... more colors */
}

.dark {
  --background: 222 47% 11%;    /* Dark */
  --foreground: 210 40% 98%;    /* Light text */
  --card: 222 47% 11%;
  /* ... dark mode overrides */
}
```

### Using Semantic Colors

```tsx
<div className="bg-background text-foreground">
  {/* Automatically adapts to theme */}
</div>

<Card className="bg-card text-card-foreground">
  {/* Card colors */}
</Card>

<Button className="bg-primary text-primary-foreground">
  {/* Primary button */}
</Button>
```

### Color Palette

**Background Colors:**
- `bg-background` - Main background
- `bg-card` - Card/elevated surfaces
- `bg-muted` - Subtle backgrounds
- `bg-accent` - Emphasis backgrounds

**Text Colors:**
- `text-foreground` - Primary text
- `text-muted-foreground` - Secondary text
- `text-card-foreground` - Text on cards
- `text-primary-foreground` - Text on primary BG

**Border Colors:**
- `border` - Default borders
- `border-input` - Input borders

### Custom Color Utilities

For specific needs, use Tailwind's color palette:

```tsx
{/* Grays */}
<div className="bg-gray-100 text-gray-900">

{/* Blues */}
<div className="bg-blue-500 text-white">

{/* Warm earth tones (common on this site) */}
<div className="bg-amber-50 text-amber-900">
<div className="bg-orange-100 text-orange-800">
<div className="bg-stone-200 text-stone-800">
```

## Typography

### Font Family

The site uses Inter font, loaded via Next.js:

```typescript
// In layout.tsx
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

<body className={inter.className}>
```

### Font Sizes

```tsx
{/* Headings */}
<h1 className="text-4xl md:text-6xl lg:text-8xl">
  Hero Heading
</h1>

<h2 className="text-3xl md:text-4xl">
  Section Heading
</h2>

<h3 className="text-2xl md:text-3xl">
  Subsection
</h3>

{/* Body text */}
<p className="text-base">         {/* 16px */}
  Normal paragraph
</p>

<p className="text-lg">           {/* 18px */}
  Larger paragraph
</p>

<p className="text-sm">           {/* 14px */}
  Small text
</p>

<p className="text-xs">           {/* 12px */}
  Tiny text (captions)
</p>
```

### Font Weights

```tsx
<p className="font-light">    {/* 300 */}
<p className="font-normal">   {/* 400 */}
<p className="font-medium">   {/* 500 */}
<p className="font-semibold"> {/* 600 */}
<p className="font-bold">     {/* 700 */}
```

### Text Styling

```tsx
<p className="italic">Italic text</p>
<p className="underline">Underlined</p>
<p className="line-through">Strikethrough</p>
<p className="uppercase">UPPERCASE</p>
<p className="capitalize">Capitalized Words</p>
```

### Line Height & Letter Spacing

```tsx
<p className="leading-tight">    {/* 1.25 */}
<p className="leading-normal">   {/* 1.5 */}
<p className="leading-relaxed">  {/* 1.7 - custom */}
<p className="leading-loose">    {/* 2 */}

<p className="tracking-tight">   {/* -0.05em */}
<p className="tracking-tighter"> {/* -0.04em - custom */}
<p className="tracking-normal">  {/* 0 */}
<p className="tracking-wide">    {/* 0.025em */}
```

### Typography Patterns

**Page Heading:**
```tsx
<h1 className="text-4xl md:text-6xl font-bold mb-6">
  Page Title
</h1>
```

**Section Heading:**
```tsx
<h2 className="text-3xl md:text-4xl font-semibold mb-8 tracking-tight">
  Section Title
</h2>
```

**Body Text:**
```tsx
<p className="text-lg leading-relaxed text-muted-foreground mb-4">
  Paragraph text with good readability
</p>
```

**Caption:**
```tsx
<p className="text-sm text-muted-foreground italic">
  Image caption or note
</p>
```

## Responsive Design

### Breakpoints

Tailwind uses mobile-first breakpoints:

```
sm:  640px  (small tablet)
md:  768px  (tablet)
lg:  1024px (small desktop)
xl:  1280px (desktop)
2xl: 1536px (large desktop)
```

### Responsive Utilities

**Syntax:** `{breakpoint}:{utility}`

```tsx
<div className="
  text-sm        /* Mobile: small text */
  md:text-base   /* Tablet: normal text */
  lg:text-lg     /* Desktop: large text */
">
  Responsive text size
</div>

<div className="
  p-4            /* Mobile: 16px padding */
  md:p-6         /* Tablet: 24px padding */
  lg:p-8         /* Desktop: 32px padding */
">
  Responsive padding
</div>
```

### Responsive Layout Patterns

**Stacked → Side-by-side:**
```tsx
<div className="flex flex-col md:flex-row gap-6">
  <div>Left (top on mobile)</div>
  <div>Right (bottom on mobile)</div>
</div>
```

**1 → 2 → 3 Column Grid:**
```tsx
<div className="
  grid
  grid-cols-1
  md:grid-cols-2
  lg:grid-cols-3
  gap-6
">
  {items.map(item => <Card key={item.id} {...item} />)}
</div>
```

**Show/Hide Elements:**
```tsx
{/* Hidden on mobile, visible on desktop */}
<div className="hidden lg:block">
  Desktop sidebar
</div>

{/* Visible on mobile, hidden on desktop */}
<div className="block lg:hidden">
  Mobile menu
</div>
```

### Mobile-First Strategy

Always design for mobile first, then add larger breakpoints:

**Good (mobile-first):**
```tsx
<div className="text-2xl md:text-4xl lg:text-6xl">
```

**Not ideal:**
```tsx
<div className="text-6xl lg:text-4xl md:text-2xl">
```

## Dark Mode

### How It Works

Dark mode is controlled by a class on the `<html>` element:

```html
<html class="dark">
  <!-- Dark mode styles active -->
</html>
```

### Theme Switcher

The `ThemeSwitcher` component toggles the class:

```tsx
import { ThemeSwitcher } from '@/app/_components/theme-switcher';

<ThemeSwitcher />
```

### Dark Mode Utilities

Prefix utilities with `dark:` for dark mode styles:

```tsx
<div className="
  bg-white
  dark:bg-slate-900
  text-gray-900
  dark:text-gray-100
">
  Adapts to theme
</div>
```

### Dark Mode Patterns

**Card:**
```tsx
<Card className="
  bg-white
  dark:bg-slate-800
  border-gray-200
  dark:border-slate-700
">
  Card content
</Card>
```

**Text:**
```tsx
<p className="
  text-gray-700
  dark:text-gray-300
">
  Readable in both modes
</p>
```

**Hover States:**
```tsx
<button className="
  bg-blue-500
  hover:bg-blue-600
  dark:bg-blue-600
  dark:hover:bg-blue-700
">
  Button
</button>
```

### Using Semantic Colors for Dark Mode

The easiest approach is to use semantic color variables:

```tsx
{/* Automatically adapts */}
<div className="bg-background text-foreground">
<Card className="bg-card text-card-foreground">
<p className="text-muted-foreground">
```

These adapt because they're defined differently in `:root` vs `.dark` in `globals.css`.

## Animation System

### Tailwind Animations

**Built-in:**
```tsx
<div className="animate-spin">      {/* Spinner */}
<div className="animate-ping">      {/* Pinging dot */}
<div className="animate-pulse">     {/* Pulsing */}
<div className="animate-bounce">    {/* Bouncing */}
```

**Custom Shimmer:**
```tsx
{/* Defined in tailwind.config.ts */}
<div className="animate-shimmer">
  Loading skeleton
</div>
```

### Transition Utilities

```tsx
{/* Transition all properties */}
<button className="transition-all hover:scale-105">
  Hover to scale
</button>

{/* Transition specific properties */}
<div className="
  transition-colors
  hover:bg-blue-500
">
  Color transition
</div>

{/* Transition duration */}
<div className="transition duration-300">
  {/* 300ms transition */}
</div>

{/* Transition timing */}
<div className="
  transition
  ease-in-out       /* Ease in and out */
  ease-linear       /* Linear */
  ease-in           /* Ease in */
  ease-out          /* Ease out */
">
```

### Transform Utilities

```tsx
{/* Scale */}
<div className="hover:scale-105">
<div className="hover:scale-95">

{/* Rotate */}
<div className="rotate-45">
<div className="hover:rotate-180 transition">

{/* Translate */}
<div className="translate-x-4">
<div className="hover:-translate-y-2 transition">

{/* Skew */}
<div className="skew-x-12">
```

### Custom Animations (animations.css)

Additional animations in `src/app/styles/animations.css`:

```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.animate-fadeIn {
  animation: fadeIn 0.5s ease-in;
}
```

**Usage:**
```tsx
<div className="animate-fadeIn">
  Fades in on load
</div>
```

## Common Patterns

### Container Pattern

```tsx
<section className="py-16 md:py-24">
  <div className="container mx-auto px-4 md:px-6">
    <h2 className="text-3xl font-bold mb-8">Section Title</h2>
    {/* Content */}
  </div>
</section>
```

### Card Hover Effect

```tsx
<Card className="
  transition-all
  hover:shadow-lg
  hover:-translate-y-1
  cursor-pointer
">
  Card content
</Card>
```

### Gradient Background

```tsx
<div className="bg-gradient-to-br from-blue-500 to-purple-600">
  Gradient background
</div>

{/* Subtle gradient */}
<div className="bg-gradient-to-b from-transparent to-black/10">
```

### Backdrop Blur

```tsx
<div className="
  backdrop-blur-sm
  bg-white/80
  dark:bg-slate-900/80
">
  Frosted glass effect
</div>
```

### Aspect Ratio

```tsx
{/* 16:9 aspect ratio */}
<div className="aspect-video">
  <Image src="..." alt="..." fill className="object-cover" />
</div>

{/* 1:1 square */}
<div className="aspect-square">
```

### Truncate Text

```tsx
{/* Single line ellipsis */}
<p className="truncate">
  Very long text that will be cut off with...
</p>

{/* Multi-line clamp */}
<p className="line-clamp-3">
  Long text that will be limited to 3 lines and then...
</p>
```

### Overlay Pattern

```tsx
<div className="relative">
  <Image src="..." alt="..." />

  {/* Dark overlay */}
  <div className="absolute inset-0 bg-black/50" />

  {/* Content on top */}
  <div className="absolute inset-0 flex items-center justify-center">
    <h2 className="text-white text-4xl">Overlay Text</h2>
  </div>
</div>
```

## Customization Guide

### Changing Colors

**1. Update CSS Variables** in `src/app/globals.css`:

```css
:root {
  --primary: 30 80% 55%;     /* Orange primary color */
  --primary-foreground: 0 0% 100%;
}
```

**2. Or add custom Tailwind color** in `tailwind.config.ts`:

```typescript
colors: {
  brand: {
    50: '#fef2f2',
    100: '#fee2e2',
    // ... more shades
    900: '#7f1d1d',
  }
}
```

**Usage:**
```tsx
<div className="bg-brand-500 text-brand-50">
```

### Changing Fonts

**1. Import font** in `src/app/layout.tsx`:

```typescript
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"] });
```

**2. Apply to body:**

```tsx
<body className={montserrat.className}>
```

**3. Or use font utility:**

```typescript
const heading = Playfair_Display({ subsets: ["latin"] });

// In component:
<h1 className={heading.className}>Custom Font Heading</h1>
```

### Changing Spacing

Update `tailwind.config.ts`:

```typescript
spacing: {
  '72': '18rem',   // Add 72 = 288px
  '84': '21rem',   // Add 84 = 336px
  '96': '24rem',   // Add 96 = 384px
}
```

### Adding Custom Utilities

In `globals.css`:

```css
@layer utilities {
  .text-balance {
    text-wrap: balance;
  }

  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
}
```

**Usage:**
```tsx
<p className="text-balance">Balanced text</p>
<div className="scrollbar-hide overflow-x-auto">
```

### Custom Component Styles

For complex component-specific styles, use CSS Modules:

**File:** `component.module.css`
```css
.hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: url('/pattern.svg');
  opacity: 0.1;
}
```

**Usage:**
```tsx
import styles from './component.module.css';

<div className={styles.hero}>
  Hero content
</div>
```

### Extending Tailwind

Add plugins in `tailwind.config.ts`:

```typescript
module.exports = {
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ]
}
```

## Next Steps

- [Special Features](./06-special-features.md) - Advanced features and integrations
- [Development Workflow](./07-development-workflow.md) - Building and testing
- [Component Architecture](./04-component-architecture.md) - Applying styles to components
