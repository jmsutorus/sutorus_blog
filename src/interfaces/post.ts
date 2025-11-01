export type Post = {
  slug: string;
  title: string;
  category: string;
  poster: string;
  length: string;
  genre: string | string[];
  released: string | Date;
  cast: string[];
  description: string;
  completed: string | Date;
  tags: string[];
  rating: number;
  content: string;
  ogImage?: {
    url: string;
  };
  featured?: boolean;
};
