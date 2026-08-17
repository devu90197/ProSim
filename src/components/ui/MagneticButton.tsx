import React, { useCallback, useRef } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react';

interface MagneticButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onAnimationStart' | 'onDragStart' | 'onDragEnd' | 'onDrag'> {
  children: React.ReactNode;
  /** How far the button drifts toward the cursor, in px. */
  strength?: number;
}

/**
 * A button that leans toward the cursor as it approaches, then springs back on
 * exit. The pull is capped and spring-damped so it reads as a subtle physical
 * cue rather than a gimmick, and is disabled entirely for touch input and for
 * users who ask for reduced motion.
 */
export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  strength = 6,
  className = '',
  ...rest
}) => {
  const ref = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 240, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 240, damping: 18, mass: 0.4 });

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLButtonElement>) => {
      if (reduceMotion || e.pointerType === 'touch' || !ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      // Offset from the button's centre, normalised to -1..1.
      const dx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const dy = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);

      x.set(Math.max(-1, Math.min(1, dx)) * strength);
      y.set(Math.max(-1, Math.min(1, dy)) * strength);
    },
    [reduceMotion, strength, x, y],
  );

  const reset = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.button
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
      onBlur={reset}
      style={reduceMotion ? undefined : { x: springX, y: springY }}
      whileHover={reduceMotion ? undefined : { scale: 1.03 }}
      whileTap={reduceMotion ? undefined : { scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 320, damping: 22 }}
      className={className}
      {...rest}
    >
      {children}
    </motion.button>
  );
};
