import React, { useCallback, useRef } from 'react';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'motion/react';
import { SPRING_TILT } from '../lib/motion';

type GlowColor = 'cyan' | 'indigo' | 'emerald' | 'amber';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  glowColor?: GlowColor;
  onClick?: () => void;
  /** Maximum rotation in degrees at the card's edges. */
  maxTilt?: number;
  /** Accessible label for interactive cards. */
  ariaLabel?: string;
}

const GLOW_STYLES: Record<GlowColor, string> = {
  cyan: 'border-slate-200/90 hover:border-cyan-400/90',
  indigo: 'border-slate-200/90 hover:border-indigo-400/90',
  emerald: 'border-slate-200/90 hover:border-emerald-400/90',
  amber: 'border-slate-200/90 hover:border-amber-400/90',
};

const GLOW_RGB: Record<GlowColor, string> = {
  cyan: '6, 182, 212',
  indigo: '99, 102, 241',
  emerald: '16, 185, 129',
  amber: '245, 158, 11',
};

/**
 * Pointer-tracking 3D card.
 *
 * Cursor position drives four coupled effects — perspective rotation, a
 * specular glare that follows the pointer, a shadow that offsets opposite the
 * tilt (so the light source stays fixed), and a coloured edge bloom. All of it
 * runs on motion values, so tracking never triggers a React re-render.
 */
export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  id,
  glowColor = 'cyan',
  onClick,
  maxTilt = 9,
  ariaLabel,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  // Normalised pointer position within the card, 0..1 on both axes.
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  // Drives glare/bloom opacity so they fade in and out with the pointer.
  const hover = useMotionValue(0);

  const smoothX = useSpring(px, SPRING_TILT);
  const smoothY = useSpring(py, SPRING_TILT);
  const smoothHover = useSpring(hover, { stiffness: 220, damping: 28 });

  const rotateX = useTransform(smoothY, [0, 1], [maxTilt, -maxTilt]);
  const rotateY = useTransform(smoothX, [0, 1], [-maxTilt, maxTilt]);

  const glareX = useTransform(smoothX, [0, 1], ['0%', '100%']);
  const glareY = useTransform(smoothY, [0, 1], ['0%', '100%']);

  // Shadow slides against the tilt, keeping the implied light overhead.
  const shadowX = useTransform(smoothX, [0, 1], [16, -16]);
  const shadowY = useTransform(smoothY, [0, 1], [16, -16]);
  const shadowBlur = useTransform(smoothHover, [0, 1], [24, 40]);
  const shadowAlpha = useTransform(smoothHover, [0, 1], [0.06, 0.16]);

  const boxShadow = useMotionTemplate`${shadowX}px ${shadowY}px ${shadowBlur}px -8px rgba(${GLOW_RGB[glowColor]}, ${shadowAlpha})`;
  const glare = useMotionTemplate`radial-gradient(340px circle at ${glareX} ${glareY}, rgba(255,255,255,0.85), transparent 65%)`;
  const bloom = useMotionTemplate`radial-gradient(220px circle at ${glareX} ${glareY}, rgba(${GLOW_RGB[glowColor]},0.22), transparent 70%)`;

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      // Coarse pointers (touch) get no tilt — it fights with scrolling.
      if (reduceMotion || e.pointerType === 'touch' || !cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      px.set(Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width)));
      py.set(Math.min(1, Math.max(0, (e.clientY - rect.top) / rect.height)));
    },
    [px, py, reduceMotion],
  );

  const handlePointerEnter = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (reduceMotion || e.pointerType === 'touch') return;
      hover.set(1);
    },
    [hover, reduceMotion],
  );

  const handlePointerLeave = useCallback(() => {
    hover.set(0);
    px.set(0.5);
    py.set(0.5);
  }, [hover, px, py]);

  const interactive = Boolean(onClick);

  // Interactive cards must be reachable and operable from the keyboard.
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (!onClick) return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onClick();
      }
    },
    [onClick],
  );

  return (
    <div className="perspective-card w-full h-full">
      <motion.div
        ref={cardRef}
        id={id}
        onClick={onClick}
        onKeyDown={handleKeyDown}
        onPointerMove={handlePointerMove}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onFocus={() => hover.set(1)}
        onBlur={() => handlePointerLeave()}
        role={interactive ? 'button' : undefined}
        tabIndex={interactive ? 0 : undefined}
        aria-label={interactive ? ariaLabel : undefined}
        style={
          reduceMotion
            ? undefined
            : { rotateX, rotateY, boxShadow, transformStyle: 'preserve-3d' }
        }
        whileHover={reduceMotion ? undefined : { scale: 1.025 }}
        whileTap={interactive && !reduceMotion ? { scale: 0.985 } : undefined}
        transition={SPRING_TILT}
        className={`group/tilt relative h-full w-full overflow-hidden rounded-2xl border bg-white/80 p-6 backdrop-blur-xl transition-colors duration-300 ${
          GLOW_STYLES[glowColor]
        } ${interactive ? 'cursor-pointer' : ''} ${className}`}
      >
        {/* Coloured bloom tracking the pointer, beneath the content. */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl"
          style={reduceMotion ? undefined : { background: bloom, opacity: smoothHover }}
        />

        {/* Specular glare sheen. */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -inset-px rounded-2xl mix-blend-overlay"
          style={reduceMotion ? undefined : { background: glare, opacity: smoothHover }}
        />

        {/* Fixed hairline of light along the top edge. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"
        />

        {/* Content floats above the card plane for parallax depth. */}
        <div
          className="relative z-10 flex h-full w-full flex-col"
          style={reduceMotion ? undefined : { transform: 'translateZ(28px)' }}
        >
          {children}
        </div>
      </motion.div>
    </div>
  );
};
