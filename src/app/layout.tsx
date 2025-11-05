import Footer from "@/app/_components/footer";
import { Nav } from "@/app/_components/nav";
import { SearchProvider } from "@/app/_components/search-provider";
import { getSearchIndex } from "@/lib/search/getSearchIndex";
import {
  HOME_OG_IMAGE_URL,
  SITE_URL,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_DESCRIPTION,
  TWITTER_HANDLE,
} from "@/lib/constants";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import cn from "classnames";

import "./globals.css";
import "./styles/animations.css";

const inter = Inter({ subsets: ["latin"] });

const siteTitle = `${SITE_NAME} - ${SITE_TAGLINE}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: siteTitle,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'movie reviews',
    'tv reviews',
    'book reviews',
    'film criticism',
    'entertainment reviews',
    'storytelling',
    'backpacking',
    'hiking',
    'outdoor adventures',
    'Joseph Sutorus',
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: siteTitle,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: HOME_OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: siteTitle,
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: SITE_DESCRIPTION,
    images: [HOME_OG_IMAGE_URL],
    creator: `@${TWITTER_HANDLE}`,
    site: `@${TWITTER_HANDLE}`,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: [
    {
      rel: 'icon',
      url: '/favicon/favicon.ico',
      media: '(prefers-color-scheme: light)',
    },
    {
      rel: 'icon',
      url: '/favicon/favicon_white.ico',
      media: '(prefers-color-scheme: dark)',
    },
    {
      rel: 'apple-touch-icon',
      url: '/favicon/apple-touch-icon.png',
      media: '(prefers-color-scheme: light)',
    },
    {
      rel: 'apple-touch-icon',
      url: '/favicon/apple-touch-icon_white.png',
      media: '(prefers-color-scheme: dark)',
    },
  ],
  manifest: '/favicon/site.webmanifest',
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
        {/* Light mode icons */}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
          media="(prefers-color-scheme: light)"
        />
        <link
          rel="mask-icon"
          href="/favicon/safari-pinned-tab.svg"
          color="#000000"
          media="(prefers-color-scheme: light)"
        />
        <link
          rel="shortcut icon"
          href="/favicon/favicon.ico"
          media="(prefers-color-scheme: light)"
        />

        {/* Dark mode icons */}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon_white.png"
          media="(prefers-color-scheme: dark)"
        />
        <link
          rel="mask-icon"
          href="/favicon/safari-pinned-tab_white.svg"
          color="#FFFFFF"
          media="(prefers-color-scheme: dark)"
        />
        <link
          rel="shortcut icon"
          href="/favicon/favicon_white.ico"
          media="(prefers-color-scheme: dark)"
        />

        <link rel="manifest" href="/favicon/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta
          name="msapplication-config"
          content="/favicon/browserconfig.xml"
        />
        <meta name="theme-color" content="#000" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#000" media="(prefers-color-scheme: dark)" />
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
