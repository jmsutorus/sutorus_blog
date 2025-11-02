import { Metadata } from "next";
import Link from "next/link";
import Container from "@/app/_components/container";
import { Intro } from "@/app/_components/intro";
import { UnifiedPostCard } from "@/app/_components/unified-post-card";
import { getAllUnifiedPosts } from "@/lib/getAllUnifiedPosts";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "All Posts",
  description: "Browse all posts from reviews, backpacking trips, and wedding",
};

export default function PostsPage() {
  const posts = getAllUnifiedPosts(10, 4);

  return (
    <main>
      <Container>
        <Intro title="Posts" />
        <section>
          <div className="mb-8">
            {/* <h2 className="text-4xl md:text-5xl font-bold">All Posts</h2> */}
            <p className="mt-4 text-lg text-muted-foreground">
              A mix of reviews, backpacking adventures, and wedding moments
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link href="/reviews">
                <Button variant="default" size="lg">
                  View All Reviews →
                </Button>
              </Link>
              <Link href="/backpacking">
                <Button variant="outline" size="lg">
                  View All Backpacking →
                </Button>
              </Link>
            </div>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-32">
            {posts.map((post) => (
              <UnifiedPostCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      </Container>
    </main>
  );
}
