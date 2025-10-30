import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/api";
import { CMS_NAME } from "@/lib/constants";
import markdownToHtml from "@/lib/markdownToHtml";
import Container from "@/app/_components/container";
import Header from "@/app/_components/header";
import { PostBody } from "@/app/_components/post-body";
import { PostHeader } from "@/app/_components/post-header";

export default async function Post(props: Params) {
  const params = await props.params;
  // Join slug array to handle nested paths (e.g., ["Movies", "Weapons"] → "Movies/Weapons")
  const slugPath = Array.isArray(params.slug) ? params.slug.join('/') : params.slug;
  console.log('slugPath:', slugPath);

  const post = getPostBySlug(slugPath);

  if (!post) {
    return notFound();
  }

  const content = await markdownToHtml(post.content || "");

  return (
    <main>
      <Container>
        <Header />
        <article className="mb-32">
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
  console.log('generateMetadata slugPath:', slugPath);

  const post = getPostBySlug(slugPath);

  if (!post) {
    return notFound();
  }

  const title = `${post.title} | Next.js Blog Example with ${CMS_NAME}`;

  return {
    title,
    openGraph: {
      title,
      images: post.ogImage ? [post.ogImage.url] : [post.poster],
    },
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();

  return posts.map((post) => ({
    // Split the slug by path separators to create an array for nested routes
    // e.g., "Movies/Weapons" → ["Movies", "Weapons"]
    slug: post.slug.split(/[/\\]/),
  }));
}
