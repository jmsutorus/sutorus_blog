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

      {/* Desktop: side-by-side layout, Mobile: stacked */}
      <div className="mb-8 md:mb-16 flex flex-col lg:flex-row lg:items-start lg:gap-12">
        {/* Image container - centered on all screens */}
        <div className="flex-shrink-0 lg:w-1/2 flex justify-center mb-8 lg:mb-0">
          <div className="max-w-md w-full">
            <CoverImage title={title} src={poster} />
          </div>
        </div>

        {/* Metadata container */}
        <div className="lg:w-1/2 lg:pt-4">
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
      </div>
    </>
  );
}
