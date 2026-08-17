import React, { useCallback } from 'react';
import { motion, useReducedMotion, useScroll, useSpring } from 'motion/react';
import { ArrowUp } from 'lucide-react';

/**
 * Always-on floating "back to top" control.
 *
 * Pinned to the bottom-right corner on every breakpoint, so it is reachable
 * from a phone thumb and a laptop cursor alike. The ring around it tracks how
 * far down the page the reader is, which turns a plain button into a position
 * indicator without adding any extra chrome.
 *
 * It sits at z-40 — above the page content but deliberately below the navbar
 * (z-50) and the modal layer (z-60), so it never floats over an open dialog.
 * The bottom offset adds the iOS safe-area inset so it clears the home
 * indicator on notched phones.
 */
export const BackToTop: React.FC = () => {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  // Smooth the raw progress so the ring glides rather than jittering.
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  }, [reduceMotion]);

  return (
    <motion.button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      title="Back to top"
      initial={reduceMotion ? false : { opacity: 0, scale: 0.6, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.6 }}
      whileHover={reduceMotion ? undefined : { scale: 1.1, y: -3 }}
      whileTap={reduceMotion ? undefined : { scale: 0.92 }}
      style={{
        bottom: 'calc(1.25rem + env(safe-area-inset-bottom, 0px))',
        right: 'calc(1.25rem + env(safe-area-inset-right, 0px))',
      }}
      className="group fixed z-40 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-cyan-400/40 bg-white/90 shadow-lg shadow-cyan-500/20 backdrop-blur-xl transition-colors hover:border-cyan-500 hover:bg-white sm:h-14 sm:w-14"
    >
      {/* Scroll-progress ring. rotate(-90) starts the sweep at 12 o'clock. */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full -rotate-90"
        viewBox="0 0 100 100"
        aria-hidden
      >
        <circle
          cx="50"
          cy="50"
          r="46"
          fill="none"
          stroke="currentColor"
          strokeWidth="5"
          className="text-slate-200"
        />
        <motion.circle
          cx="50"
          cy="50"
          r="46"
          fill="none"
          stroke="url(#back-to-top-gradient)"
          strokeWidth="5"
          strokeLinecap="round"
          style={{ pathLength: progress }}
        />
        <defs>
          <linearGradient id="back-to-top-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="50%" stopColor="#14b8a6" />
            <stop offset="100%" stopColor="#38bdf8" />
          </linearGradient>
        </defs>
      </svg>

      <ArrowUp
        className="relative h-5 w-5 text-cyan-700 transition-transform duration-300 group-hover:-translate-y-0.5 sm:h-6 sm:w-6"
        aria-hidden
      />
    </motion.button>
  );
};
