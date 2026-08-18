import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface LogoProps {
  /** Renders the mark on a white plate so it stays legible over dark video. */
  onDark?: boolean;
  className?: string;
  /** Fetch eagerly in the header, lazily in the footer. */
  priority?: boolean;
}

/**
 * The ProSIM wordmark.
 *
 * The source artwork is a wide lockup drawn for a white page, so over the hero
 * video it used to sit on an opaque white plate. That plate read as a sticker
 * bolted onto the design. Instead there is now a dedicated dark-surface
 * variant (`/logo-dark.png`) with the white page ground knocked out and the
 * black "Pro" redrawn in white, while the green "SIM", the orange bar and the
 * tagline keep their brand ink. The mark can therefore sit directly on the
 * video with nothing behind it.
 *
 * Sizing is fluid: the height scales with the viewport through `clamp()`, and
 * width follows the artwork's own aspect ratio, so the mark stays crisp and
 * proportionate from a 320px phone up to an ultrawide desktop.
 */
export const Logo: React.FC<LogoProps> = ({ onDark = false, className = '', priority = false }) => {
  const reduceMotion = useReducedMotion();

  return (
    <motion.span
      whileHover={reduceMotion ? undefined : { rotateY: 8, rotateX: -4, scale: 1.04 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={{ transformPerspective: 800 }}
      className={`inline-flex shrink-0 items-center justify-center bg-transparent ${className}`}
    >
      {/* Keyed so the element remounts when the surface flips. A <picture>
          resolves its <source> list once, so swapping the child in place can
          leave the browser showing the previous variant. */}
      <picture key={onDark ? 'dark' : 'light'}>
        {/* WebP is ~27KB against the PNG's ~94KB; the PNG stays for fallback.
            The dark variant is PNG-only — it is served to one surface. */}
        {!onDark && <source srcSet="/logo.webp" type="image/webp" />}
        <img
          src={onDark ? '/logo-dark.png' : '/logo.png'}
          alt="ProSIM — engineering your designs"
          // Intrinsic size of the trimmed artwork. Declaring it reserves the
          // right box up front so the header does not shift as the logo loads.
          width={900}
          height={344}
          decoding="async"
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          // clamp() ties the mark's height to viewport width, so it grows
          // smoothly between breakpoints instead of jumping at each one.
          style={{ height: 'clamp(1.5rem, 3.2vw, 2.5rem)' }}
          className="w-auto max-w-full select-none object-contain"
          draggable={false}
        />
      </picture>
    </motion.span>
  );
};
