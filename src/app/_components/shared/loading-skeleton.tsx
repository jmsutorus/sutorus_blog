interface LoadingSkeletonProps {
  /** Aspect ratio of the skeleton (default: 16/9) */
  aspectRatio?: number;
  /** Additional CSS classes */
  className?: string;
}

export function LoadingSkeleton({
  aspectRatio = 16 / 9,
  className = '',
}: LoadingSkeletonProps) {
  const paddingBottom = `${(1 / aspectRatio) * 100}%`;

  return (
    <div
      className={`relative overflow-hidden rounded-lg bg-muted ${className}`}
      style={{ paddingBottom }}
      role="status"
      aria-label="Loading image"
    >
      {/* Shimmer effect */}
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </div>
  );
}
