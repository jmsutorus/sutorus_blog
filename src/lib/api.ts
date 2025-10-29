import { Post } from "@/interfaces/post";
import fs from "fs";
import matter from "gray-matter";
import { join } from "path";

const postsDirectory = join(process.cwd(), "_posts");

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  // Convert slug to title
  // Example: "the-dark-knight" -> "The Dark Knight"
  const title = realSlug
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
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
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
  return getAllPosts().filter(post => !post.watched);
}
