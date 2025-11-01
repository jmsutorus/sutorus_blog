import CoverImage from "./cover-image";
import DateFormatter from "./date-formatter";
import { PostTitle } from "@/app/_components/post-title";
import { Badge } from "@/components/ui/badge";

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
  const categoryDisplay: string = category.replaceAll(']', '').replaceAll('[', '');

  const getRatingVariant = (rating: number) => {
    if (rating >= 8) return 'default';
    if (rating >= 6) return 'secondary';
    return 'outline';
  };

  return (
    <>
      <PostTitle>{title}</PostTitle>

      {/* Desktop: side-by-side layout, Mobile: stacked */}
      <div className="mb-6 flex flex-col lg:flex-row lg:items-start lg:gap-8">
        {/* Image container - full width on mobile, centered on desktop */}
        <div className="w-full flex-shrink-0 lg:w-1/2 flex justify-center mb-6 lg:mb-0">
          <div className="w-full max-w-md">
            <CoverImage title={title} src={poster} />
          </div>
        </div>

        {/* Metadata container - styled like StatsBox */}
        <div className="w-full lg:w-1/4">
          <div className="w-full rounded-lg border bg-card p-4 shadow-sm">
            <h3 className="mb-3 text-lg font-semibold">Details</h3>

            <div className="space-y-2.5">
              {/* Rating */}
              <div className="flex items-start gap-2">
                <span className="text-lg" aria-label="Rating">
                  ⭐
                </span>
                <div className="flex-1">
                  <div className="text-sm text-muted-foreground">Rating</div>
                  <div>
                    <Badge variant={getRatingVariant(rating)}>
                      {rating}/10
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Date */}
              <div className="flex items-start gap-2">
                <span className="text-lg" aria-label="Date">
                  📅
                </span>
                <div className="flex-1">
                  <div className="text-sm text-muted-foreground">Date</div>
                  <div className="font-medium">
                    <DateFormatter dateString={date} />
                  </div>
                </div>
              </div>

              {/* Year */}
              <div className="flex items-start gap-2">
                <span className="text-lg" aria-label="Year">
                  🗓️
                </span>
                <div className="flex-1">
                  <div className="text-sm text-muted-foreground">Year</div>
                  <div className="font-medium">
                    <DateFormatter dateString={year} />
                  </div>
                </div>
              </div>

              {/* Length */}
              <div className="flex items-start gap-2">
                <span className="text-lg" aria-label="Length">
                  ⏱️
                </span>
                <div className="flex-1">
                  <div className="text-sm text-muted-foreground">Length</div>
                  <div className="font-medium">{length}</div>
                </div>
              </div>

              {/* Genre */}
              <div className="flex items-start gap-2">
                <span className="text-lg" aria-label="Genre">
                  🎭
                </span>
                <div className="flex-1">
                  <div className="text-sm text-muted-foreground">Genre</div>
                  <div className="font-medium">{genreDisplay}</div>
                </div>
              </div>

              {/* Category */}
              <div className="flex items-start gap-2">
                <span className="text-lg" aria-label="Category">
                  📁
                </span>
                <div className="flex-1">
                  <div className="text-sm text-muted-foreground">Category</div>
                  <div className="font-medium">{categoryDisplay}</div>
                </div>
              </div>

              {/* Tags */}
              {tags && tags.length > 0 && (
                <div className="flex items-start gap-2">
                  <span className="text-lg" aria-label="Tags">
                    🏷️
                  </span>
                  <div className="flex-1">
                    <div className="text-sm text-muted-foreground">Tags</div>
                    <div className="flex flex-wrap gap-1">
                      {tags.map((tag, index) => (
                        <Badge key={index} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
