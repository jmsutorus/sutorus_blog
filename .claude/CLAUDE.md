# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# Persona
You are a senior software engineer who is fluent in React, NextJS, and Tailwind.

# Project Overview
This is a statically generated blog built with Next.js 15, TypeScript, Tailwind CSS v3, and Markdown. It's based on the Next.js blog-starter example.

Always use context7 when looking up doc on Frameworks.

# Core Architecture

## Content Management
- **Blog posts**: Stored as Markdown files in `/_posts` directory with front matter metadata
- **Post metadata**: Parsed using `gray-matter` (title, excerpt, date, author, coverImage, ogImage)
- **Markdown rendering**: Uses `remark` and `remark-html` to convert Markdown to HTML strings
- **Post API**: Core functions in `src/lib/api.ts`:
  - `getPostSlugs()`: Returns all post filenames from `_posts` directory
  - `getPostBySlug(slug)`: Reads and parses a single post with metadata
  - `getAllPosts()`: Returns all posts sorted by date (descending)

## Routing & Pages
- **Homepage** (`src/app/page.tsx`): Displays hero post (most recent) and older posts
- **Individual posts** (`src/app/posts/[slug]/page.tsx`): Dynamic routes using `generateStaticParams()`
- **Static generation**: All posts pre-rendered at build time using Next.js Static Generation

## Component Structure
Components in `src/app/_components/`:
- Presentational components for layout (Container, Header, Footer, Intro)
- Post-specific components (PostHeader, PostBody, PostTitle, CoverImage, DateFormatter)
- Home page components (HeroPost, MoreStories, PostPreview)
- Utility components (Avatar, Alert, SectionSeparator)

## TypeScript Interfaces
- `Post` interface in `src/interfaces/post.ts`: Defines post structure
- `Author` interface in `src/interfaces/author.ts`: Defines author structure
- Path alias `@/*` maps to `./src/*` (configured in tsconfig.json)

# Commands

## Development
- `npm run dev`: Start development server with Turbopack
- `npm run build`: Build production bundle
- `npm start`: Start production server

## Type Checking
- TypeScript strict mode enabled in tsconfig.json
- Run `npx tsc --noEmit` to type check without building

# Code Style
- Use ES modules (import/export) syntax, not CommonJS (require)
- Destructure imports when possible (e.g., `import { foo } from 'bar'`)

# Workflow
- Be sure to typecheck when you're done making a series of code changes
- Prefer running single tests, and not the whole test suite, for performance

# Adding New Blog Posts
Create a new `.md` file in `/_posts` with required front matter:
```yaml
---
title: "Post Title"
excerpt: "Brief description"
coverImage: "/assets/blog/post-name/cover.jpg"
date: "YYYY-MM-DDTHH:mm:ss.sssZ"
author:
  name: "Author Name"
  picture: "/assets/blog/authors/author.jpeg"
ogImage:
  url: "/assets/blog/post-name/cover.jpg"
---
```
