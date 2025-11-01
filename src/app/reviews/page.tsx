import Container from "@/app/_components/container";
import { Intro } from "@/app/_components/intro";
import { ReviewsGrid } from "@/app/_components/reviews-grid";
import { getAllPosts } from "@/lib/api";
import { Metadata } from "next";

// Configure the number of recent posts to display
const MAX_RECENT_POSTS = 9;

export const metadata: Metadata = {
  title: "Reviews",
  description: "Browse all reviews",
};

export default function Reviews() {
  const allPosts = getAllPosts();

  // Show only the X most recent posts
  const recentPosts = allPosts.slice(0, MAX_RECENT_POSTS);

  return (
    <main>
      <Container>
        <Intro />
        {recentPosts.length > 0 && <ReviewsGrid posts={recentPosts} />}
      </Container>
    </main>
  );
}
