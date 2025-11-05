import Link from "next/link";
import CoverImage from "@/app/_components/cover-image";
import DateFormatter from "@/app/_components/date-formatter";

type Props = {
  title: string;
  poster: string;
  date: string | Date;
  plot: string;
  slug: string;
  category: string;
  rating: number;
};

export function PostPreview({
  title,
  poster,
  date,
  plot,
  slug,
  category,
  rating,
}: Props) {
  return (
    <div>
      {/* <div className="mb-5">
        <CoverImage slug={slug} title={title} src={poster} />
      </div> */}
      <h3 className="text-3xl mb-3 leading-snug">
        <Link href={`/posts/${slug}`} className="hover:underline">
          {title}
        </Link>
      </h3>
      <div className="flex flex-wrap gap-3 items-center mb-4">
        <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-semibold">
          {category?.replaceAll('[', '').replaceAll(']', '') || ''}
        </span>
        <span className="text-yellow-600 dark:text-yellow-400 font-semibold">
          ⭐ {rating}/10
        </span>
      </div>
      <div className="text-lg mb-4 text-gray-600 dark:text-gray-400">
        <DateFormatter dateString={date} />
      </div>
      <p className="text-lg leading-relaxed mb-4">{plot}</p>
    </div>
  );
}
