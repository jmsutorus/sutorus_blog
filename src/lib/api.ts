import { Post } from "@/interfaces/post";
import fs from "fs";
import matter from "gray-matter";
import { join } from "path";

const postsDirectory = join(process.cwd(), "public/data/_posts");

/**
 * Recursively find all markdown files in a directory up to a specified depth
 */
function findMarkdownFiles(dir: string, maxDepth: number, currentDepth: number = 0, relativePath: string = ""): string[] {
  if (currentDepth > maxDepth) {
    return [];
  }

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    const relPath = relativePath ? join(relativePath, entry.name) : entry.name;

    if (entry.isDirectory() && currentDepth < maxDepth) {
      // Recursively search subdirectories
      files.push(...findMarkdownFiles(fullPath, maxDepth, currentDepth + 1, relPath));
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      // Add markdown files
      files.push(relPath);
    }
  }

  return files;
}

export function getPostSlugs() {
  // Search up to 2 levels deep (0 = root, 1 = first level subfolders, 2 = second level subfolders)
  return findMarkdownFiles(postsDirectory, 2);
}

export function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.md$/, "");
  // Handle both flat and nested paths (e.g., "post-name" or "subfolder/post-name")
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  // Convert slug to title, handling nested paths
  // Example: "subfolder/the-dark-knight" -> "The Dark Knight"
  // Extract just the filename without the folder path
  const fileName = realSlug.split(/[/\\]/).pop() || realSlug;
  const title = fileName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return {
    ...data,
    slug: realSlug,
    title,
    content
  } as Post;
}

export function getAllPosts(): Post[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.completed > post2.completed ? -1 : 1))
    // strip [ ], [[ and ]] from genre and category fields
    .map((post) => {
      const cleanCategory = typeof post.category === 'string'
        ? post.category.replace(/\[|\]/g, '')
        : post.category;

      // Process tags: filter out category matches and year tags, replace underscores, and capitalize
      const processedTags = Array.isArray(post.tags)
        ? post.tags
            .filter(tag => tag.toLowerCase() !== cleanCategory.toLowerCase())
            .filter(tag => !tag.toLowerCase().startsWith('year'))
            .map(tag => {
              // Replace underscores with spaces
              const withSpaces = tag.replace(/_/g, ' ');
              // Capitalize first letter of each word
              return withSpaces
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                .join(' ');
            })
        : [];

      return {
        ...post,
        genre: Array.isArray(post.genre)
          ? post.genre.map(g => g.replace(/\[|\]/g, ''))
          : typeof post.genre === 'string'
            ? post.genre.replace(/\[|\]/g, '')
            : post.genre,
        category: cleanCategory,
        description: typeof post.description === 'string'
          ? post.description.replace(/\"/g, '')
          : post.description,
        tags: processedTags
      };
    });
  return posts;
}

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
  return getAllPosts().filter(post => !post.completed);
}

// Get featured posts for landing page
export function getFeaturedPosts(): Post[] {
  const allPosts = getAllPosts();
  const featuredPosts = allPosts.filter(post => post.featured === true);

  // Return top 3 featured posts, or all available if less than 3
  return featuredPosts.slice(0, 3);
}
