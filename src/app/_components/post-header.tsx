import CoverImage from "./cover-image";
import DateFormatter from "./date-formatter";
import { PostTitle } from "@/app/_components/post-title";

type Props = {
  title: string;
  poster: string;
  date: string | Date;
  rating: number;
  year: string | Date;
  length: string;
  genre: string | string[];
  category: string;
  tags: string[]
};

export function PostHeader({ title, poster, date, rating, year, length, genre, category, tags }: Props) {
  const genreDisplay: string = Array.isArray(genre) ? genre.join(', ').replaceAll(']', '').replaceAll('[', '') : genre;

  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className="mb-8 md:mb-16 sm:mx-0">
        <CoverImage title={title} src={poster} />
      </div>
      <div className="max-w-2xl mx-auto">
        <div className="mb-6 flex flex-wrap gap-4 text-lg">
          <div className="flex items-center gap-2">
            <span className="font-semibold">Rating:</span>
            <span className="text-yellow-600 dark:text-yellow-400">{rating}/10</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold">Date:</span>
            <span>{<DateFormatter dateString={date} />}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold">Length:</span>
            <span>{length}</span>
          </div>
        </div>
        <div className="mb-6 text-lg">
          <span className="font-semibold">Genre:</span> {genreDisplay}
        </div>
        <div className="mb-6 text-lg">
          <span className="font-semibold">Category:</span> {category.replaceAll(']', '').replaceAll('[', '')}
        </div>
        <div className="mb-6 text-lg">
          <span className="font-semibold">Tags:</span> {tags.toString()}
        </div>
      </div>
    </>
  );
}
