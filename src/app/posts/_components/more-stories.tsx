import Link from "next/link";
import { Post } from "@/interfaces/post";
import { PostPreview } from "./post-preview";
import { Button } from "@/app/_components/button";

type Props = {
  posts: Post[];
};

export function MoreStories({ posts }: Props) {
  return (
    <section>
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight">
          More Posts
        </h2>
        <Link href="/database">
          <Button variant="default" size="lg">
            View All →
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-32">
        {posts.map((post) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            poster={post.poster}
            date={post.completed}
            slug={post.slug}
            plot={post.description}
            category={post.category}
            rating={post.rating}
          />
        ))}
      </div>
    </section>
  );
}
