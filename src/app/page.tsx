import Container from "@/app/_components/container";
import { HeroPost } from "@/app/_components/hero-post";
import { Intro } from "@/app/_components/intro";
import { MoreStories } from "@/app/_components/more-stories";
import { getAllPosts } from "@/lib/api";

// Configure the number of recent posts to display (excluding the hero post)
const MAX_RECENT_POSTS = 5;

export default function Index() {
  const allPosts = getAllPosts();

  const heroPost = allPosts[0];

  // Show only the X most recent posts (after the hero post)
  const morePosts = allPosts.slice(1, 1 + MAX_RECENT_POSTS);

  return (
    <main>
      <Container>
        <Intro />
        <HeroPost
          title={heroPost.title}
          poster={heroPost.poster}
          date={heroPost.completed}
          plot={heroPost.description}
          slug={heroPost.slug}
          category={heroPost.category}
          rating={heroPost.rating}
          year={heroPost.released}
        />
        {morePosts.length > 0 && <MoreStories posts={morePosts} />}
      </Container>
    </main>
  );
}
