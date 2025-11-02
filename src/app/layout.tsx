import Footer from "@/app/_components/footer";
import { Nav } from "@/app/_components/nav";
import { SearchProvider } from "@/app/_components/search-provider";
import { getSearchIndex } from "@/lib/search/getSearchIndex";
import { CMS_NAME, HOME_OG_IMAGE_URL } from "@/lib/constants";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import cn from "classnames";

import "./globals.css";
import "./styles/animations.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: 'Joseph Sutorus - Writer, Reviewer, Storyteller',
    template: '%s | Joseph Sutorus'
  },
  description: 'Exploring the stories that shape us through thoughtful reviews and authentic perspectives on film, television, and the art of storytelling.',
  keywords: ['movie reviews', 'tv reviews', 'film criticism', 'entertainment reviews', 'storytelling', 'Joseph Sutorus'],
  authors: [{ name: 'Joseph Sutorus' }],
  creator: 'Joseph Sutorus',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://josephsutorus.com',
    siteName: 'Joseph Sutorus',
    title: 'Joseph Sutorus - Writer, Reviewer, Storyteller',
    description: 'Exploring the stories that shape us through thoughtful reviews and authentic perspectives on film, television, and the art of storytelling.',
    images: [
      {
        url: HOME_OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: 'Joseph Sutorus - Writer, Reviewer, Storyteller',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Joseph Sutorus - Writer, Reviewer, Storyteller',
    description: 'Exploring the stories that shape us through thoughtful reviews and authentic perspectives on film, television, and the art of storytelling.',
    images: [HOME_OG_IMAGE_URL],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const searchIndex = await getSearchIndex();

  return (
    <html lang="en">
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/favicon/safari-pinned-tab.svg"
          color="#000000"
        />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta
          name="msapplication-config"
          content="/favicon/browserconfig.xml"
        />
        <meta name="theme-color" content="#000" />
        <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      </head>
      <body
        className={cn(inter.className, "dark:bg-slate-900 dark:text-slate-400")}
      >
        <SearchProvider searchIndex={searchIndex}>
          <Nav />
          <div className="min-h-screen">{children}</div>
          <Footer />
        </SearchProvider>
      </body>
    </html>
  );
}
