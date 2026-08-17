import React, { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'motion/react';

interface CountUpProps {
  value: number;
  suffix?: string;
  /** Animation length in ms. */
  duration?: number;
  className?: string;
}

/** Ease-out cubic — fast start, gentle landing on the final figure. */
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * Counts from zero to `value` the first time it scrolls into view.
 *
 * Driven by requestAnimationFrame rather than a fixed-rate interval, so it
 * stays smooth on high-refresh displays, self-throttles in background tabs,
 * and never drifts out of sync with the compositor.
 */
export const CountUp: React.FC<CountUpProps> = ({
  value,
  suffix = '',
  duration = 1800,
  className = '',
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;

    if (reduceMotion) {
      setDisplay(value);
      return;
    }

    let frameId = 0;
    let startTime: number | null = null;

    const tick = (now: number) => {
      startTime ??= now;
      const progress = Math.min(1, (now - startTime) / duration);
      setDisplay(Math.round(easeOutCubic(progress) * value));

      if (progress < 1) frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [inView, value, duration, reduceMotion]);

  return (
    <span ref={ref} className={className}>
      {display.toLocaleString()}
      {suffix}
    </span>
  );
};
