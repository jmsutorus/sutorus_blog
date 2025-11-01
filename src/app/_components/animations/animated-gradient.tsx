import React from 'react';

interface AnimatedGradientProps {
  className?: string;
  colors?: string[];
  opacity?: number;
}

/**
 * Animated gradient background component using CSS keyframes
 * Provides a smooth, warm gradient animation without JavaScript
 * Optimized for performance with GPU acceleration
 */
export function AnimatedGradient({
  className = '',
  colors = [
    'hsl(var(--primary))',
    'hsl(var(--secondary))',
    'hsl(var(--accent))'
  ],
  opacity = 0.15
}: AnimatedGradientProps) {
  const gradientStyle = {
    backgroundImage: `linear-gradient(
      135deg,
      ${colors[0]} 0%,
      ${colors[1]} 50%,
      ${colors[2]} 100%
    )`,
    opacity
  };

  return (
    <div
      className={`absolute inset-0 -z-10 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 animated-gradient gradient-warm"
        style={{ opacity }}
      />
    </div>
  );
}
