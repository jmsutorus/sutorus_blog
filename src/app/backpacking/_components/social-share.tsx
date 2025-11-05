'use client';

import {
  RedditShareButton,
  FacebookShareButton,
  WhatsappShareButton,
  RedditIcon,
  FacebookIcon,
  WhatsappIcon,
} from 'react-share';
import { Button } from '@/app/_components/button';
import { useState, useEffect } from 'react';

interface SocialShareProps {
  url: string;
  title: string;
  description?: string;
}

export function SocialShare({ url, title, description }: SocialShareProps) {
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState(url);

  // Ensure we have the full URL on client-side
  useEffect(() => {
    if (typeof window !== 'undefined' && !url.startsWith('http')) {
      setShareUrl(window.location.href);
    } else {
      setShareUrl(url);
    }
  }, [url]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Manual Reddit share handler as fallback
  const handleRedditShare = () => {
    const redditUrl = `https://reddit.com/submit?url=${encodeURIComponent(
      shareUrl
    )}&title=${encodeURIComponent(title)}`;
    window.open(redditUrl, '_blank', 'noopener,noreferrer,width=600,height=600');
  };

  // Bluesky doesn't have an official share button in react-share yet
  const handleBlueskyShare = () => {
    const blueskyUrl = `https://bsky.app/intent/compose?text=${encodeURIComponent(
      `${title}\n\n${shareUrl}`
    )}`;
    window.open(blueskyUrl, '_blank', 'noopener,noreferrer');
  };

  // SMS share handler
  const handleSMSShare = () => {
    const smsUrl = `sms:?body=${encodeURIComponent(`${title}\n\n${shareUrl}`)}`;
    window.location.href = smsUrl;
  };

  return (
    <div className="my-8 rounded-lg border bg-card p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold">Share this trip</h3>
      <div className="flex flex-wrap gap-3">
        {/* Reddit - Using manual implementation for reliability */}
        <button
          onClick={handleRedditShare}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#FF4500] transition-opacity hover:opacity-80"
          aria-label="Share on Reddit"
          title="Share on Reddit"
        >
          <RedditIcon size={40} round bgStyle={{ fill: 'transparent' }} />
        </button>

        {/* Facebook */}
        <FacebookShareButton url={shareUrl} hashtag="#backpacking">
          <FacebookIcon size={40} round />
        </FacebookShareButton>

        {/* WhatsApp (Messaging) */}
        <WhatsappShareButton url={shareUrl} title={title} separator=" - ">
          <WhatsappIcon size={40} round />
        </WhatsappShareButton>

        {/* SMS */}
        <button
          onClick={handleSMSShare}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#34C759] transition-opacity hover:opacity-80"
          aria-label="Share via SMS"
          title="Share via SMS"
        >
          <svg
            className="h-6 w-6 fill-white"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z" />
          </svg>
        </button>

        {/* Bluesky */}
        <button
          onClick={handleBlueskyShare}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#1185fe] transition-opacity hover:opacity-80"
          aria-label="Share on Bluesky"
        >
          <svg
            className="h-6 w-6 fill-white"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.815 2.736 3.713 3.66 6.383 3.364.136-.02.275-.038.415-.056-.138.022-.276.04-.415.056-3.912.58-7.387 2.005-2.83 7.078 5.013 5.19 6.87-1.113 7.823-4.308.953 3.195 2.05 9.271 7.733 4.308 4.267-4.308 1.172-6.498-2.74-7.078a8.741 8.741 0 0 1-.415-.056c.14.018.279.036.415.056 2.67.297 5.568-.628 6.383-3.364.246-.828.624-5.79.624-6.478 0-.69-.139-1.861-.902-2.206-.659-.298-1.664-.62-4.3 1.24C16.046 4.748 13.087 8.687 12 10.8Z" />
          </svg>
        </button>

        {/* Copy Link (for Instagram and general sharing) */}
        <Button
          onClick={handleCopyLink}
          variant="secondary"
          size="sm"
          className="h-10 gap-2"
        >
          {copied ? (
            <>
              <svg
                className="h-4 w-4"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M5 13l4 4L19 7" />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg
                className="h-4 w-4"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              </svg>
              Copy Link
            </>
          )}
        </Button>
      </div>
      <p className="mt-3 text-sm text-muted-foreground">
        Share this backpacking adventure with your friends via social media, text message, or copy the link to share on Instagram!
      </p>
    </div>
  );
}
