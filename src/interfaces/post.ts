export type Post = {
  slug: string;
  title: string;
  date: string;
  category: string;
  poster: string;
  length: string;
  genre: string | string[];
  year: number | string;
  cast: string[];
  plot: string;
  watched: string;
  tags: string[];
  rating: number;
  content: string;
  ogImage?: {
    url: string;
  };
};
