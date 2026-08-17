import type { Transition, Variants } from 'motion/react';

/**
 * Shared motion vocabulary. Every animated surface in the app pulls its easing
 * and timing from here so the whole product moves with one personality
 * instead of each component inventing its own curve.
 */

/** Expressive deceleration — the house curve for entrances. */
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

/** Crisp, slightly overshooting curve for hover/press feedback. */
export const EASE_SPRINGY = [0.34, 1.56, 0.64, 1] as const;

/** Card tilt / magnetic pull. Low mass keeps it feeling weightless. */
export const SPRING_TILT: Transition = {
  type: 'spring',
  stiffness: 260,
  damping: 24,
  mass: 0.5,
};

/** Chunkier spring for modals and larger surfaces. */
export const SPRING_PANEL: Transition = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
  mass: 0.8,
};

/** Parent variant that cascades children into view. */
export const staggerContainer = (stagger = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});

/** Default child entrance: rise, fade, and settle out of a slight 3D tilt. */
export const riseIn: Variants = {
  hidden: { opacity: 0, y: 28, rotateX: -6 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.7, ease: EASE_OUT_EXPO },
  },
};

/** Horizontal counterpart, for side-by-side layouts. */
export const slideIn = (from: 'left' | 'right' = 'left'): Variants => ({
  hidden: { opacity: 0, x: from === 'left' ? -36 : 36 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: EASE_OUT_EXPO },
  },
});

/** Scale-up entrance for badges, pills and icon chips. */
export const popIn: Variants = {
  hidden: { opacity: 0, scale: 0.86 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.45, ease: EASE_SPRINGY },
  },
};

/** Shared viewport config: animate once, when a quarter of the block is shown. */
export const VIEWPORT = { once: true, amount: 0.25 } as const;
