import Link from "next/link";
import Container from "@/app/_components/container";
import { getAllPosts } from "@/lib/api";
import { DatabaseTable } from "@/app/database/_components/database-table";
import { Button } from "@/components/ui/button";

// This matches the count from the landing page (1 hero + 5 more posts)
const POSTS_SHOWN_ON_LANDING = 6;

export default function Database() {
  const allPosts = getAllPosts();

  // Get posts that are NOT displayed on the landing page
  const archivedPosts = allPosts.slice(POSTS_SHOWN_ON_LANDING);

  return (
    <main>
      <Container>
        <div className="mb-8 mt-8">
          <Link href="/">
            <Button variant="outline" className="mb-6">
              ← Back to Home
            </Button>
          </Link>
          <h1 className="mb-4 text-5xl font-bold tracking-tighter leading-tight md:text-7xl">
            All Posts
          </h1>
          <p className="text-lg text-gray-600">
            Viewing {archivedPosts.length} archived posts not shown on the landing page
          </p>
        </div>

        <DatabaseTable posts={archivedPosts} />
      </Container>
    </main>
  );
}
