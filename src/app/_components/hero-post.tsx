import CoverImage from "@/app/_components/cover-image";
import Link from "next/link";
import DateFormatter from "./date-formatter";

type Props = {
  title: string;
  poster: string;
  date: string | Date;
  plot: string;
  slug: string;
  category: string;
  rating: number;
  year: string | Date;
};

export function HeroPost({
  title,
  poster,
  date,
  plot,
  slug,
  category,
  rating,
  year,
}: Props) {
  return (
    <section>
      {/* <div className="mb-8 md:mb-16">
        <CoverImage title={title} src={poster} slug={slug} />
      </div> */}
      <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
        <div>
          <h3 className="mb-4 text-4xl lg:text-5xl leading-tight">
            <Link href={`/posts/${slug}`} className="hover:underline">
              {title}
            </Link>
          </h3>
          <div className="mb-4 flex flex-wrap gap-3 items-center">
            <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-semibold">
              {category.replaceAll('[', '').replaceAll(']', '')}
            </span>
            <span className="text-yellow-600 dark:text-yellow-400 font-semibold">
              ⭐ {rating}/10
            </span>
            <span className="text-gray-600 dark:text-gray-400">
              {year.toLocaleString()}
            </span>
          </div>
          <div className="mb-4 md:mb-0 text-lg text-gray-600 dark:text-gray-400">
            <DateFormatter dateString={date} />
          </div>
        </div>
        <div>
          <p className="text-lg leading-relaxed mb-4">{plot}</p>
        </div>
      </div>
    </section>
  );
}
