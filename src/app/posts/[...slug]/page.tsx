import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/api";
import markdownToHtml from "@/lib/markdownToHtml";
import Container from "@/app/_components/container";
import Header from "@/app/_components/header";
import { PostBody } from "@/app/_components/post-body";
import { PostHeader } from "@/app/_components/post-header";
import { RelatedPosts, getRelatedPosts } from "@/app/_components/shared/related-posts";
import { generatePostMetadata } from "@/lib/metadata/og-metadata";

export default async function Post(props: Params) {
  const params = await props.params;
  // Join slug array to handle nested paths (e.g., ["Movies", "Weapons"] → "Movies/Weapons")
  const slugPath = Array.isArray(params.slug) ? params.slug.join('/') : params.slug;

  const post = getPostBySlug(slugPath);

  if (!post) {
    return notFound();
  }

  const content = await markdownToHtml(post.content || "");

  // Get all posts and calculate related posts
  const allPosts = getAllPosts();
  const relatedPosts = getRelatedPosts(post, allPosts, 3);

  // Transform related posts to the format needed by RelatedPosts component
  const relatedPostsData = relatedPosts.map(p => ({
    slug: p.slug,
    title: p.title,
    image: p.poster,
    description: p.description?.substring(0, 150),
    tags: p.tags,
    category: p.category,
    date: typeof p.completed === 'string' ? p.completed : p.completed.toString(),
  }));

  return (
    <main>
      <Container>
        <Header />
        <article className="mb-16">
          <PostHeader
            title={post.title}
            poster={post.poster}
            date={post.completed}
            rating={post.rating}
            year={post.released}
            length={post.length}
            genre={post.genre}
            category={post.category}
            tags={post.tags}
          />
          <PostBody content={content} />
        </article>

        {/* Related Posts Section */}
        {relatedPostsData.length > 0 && (
          <RelatedPosts posts={relatedPostsData} title="Related Reviews" maxPosts={3} />
        )}
      </Container>
    </main>
  );
}

type Params = {
  params: Promise<{
    slug: string[];
  }>;
};

export async function generateMetadata(props: Params): Promise<Metadata> {
  const params = await props.params;
  // Join slug array to handle nested paths
  const slugPath = Array.isArray(params.slug) ? params.slug.join('/') : params.slug;

  const post = getPostBySlug(slugPath);

  if (!post) {
    return notFound();
  }

  // Use the comprehensive metadata generator
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

export async function generateStaticParams() {
  const posts = getAllPosts();

  return posts.map((post) => ({
    // Split the slug by path separators to create an array for nested routes
    // e.g., "Movies/Weapons" → ["Movies", "Weapons"]
    slug: post.slug.split(/[/\\]/),
  }));
}
