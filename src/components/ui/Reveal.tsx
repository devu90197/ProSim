import React from 'react';
import { motion, useReducedMotion, type Variants } from 'motion/react';
import { EASE_OUT_EXPO, VIEWPORT, riseIn, staggerContainer } from '../../lib/motion';

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Seconds to wait before this element starts animating. */
  delay?: number;
  duration?: number;
  direction?: Direction;
  /** Travel distance in px before settling. */
  distance?: number;
  /** Adds a subtle 3D rotation to the entrance. */
  tilt?: boolean;
  as?: 'div' | 'section' | 'li' | 'span';
}

const offsetFor = (direction: Direction, distance: number) => {
  switch (direction) {
    case 'up':
      return { y: distance };
    case 'down':
      return { y: -distance };
    case 'left':
      return { x: distance };
    case 'right':
      return { x: -distance };
    case 'none':
      return {};
  }
};

/**
 * Scroll-triggered entrance. Animates once when it enters the viewport and
 * degrades to a plain, instantly-visible element under `prefers-reduced-motion`.
 */
export const Reveal: React.FC<RevealProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 0.7,
  direction = 'up',
  distance = 28,
  tilt = false,
  as = 'div',
}) => {
  const reduceMotion = useReducedMotion();
  // The tag union widens the component's prop type; the cast keeps JSX happy
  // while still rendering the requested element.
  const MotionTag = motion[as] as typeof motion.div;

  if (reduceMotion) {
    return React.createElement(as, { className }, children);
  }

  const variants: Variants = {
    hidden: {
      opacity: 0,
      ...offsetFor(direction, distance),
      ...(tilt ? { rotateX: -8, scale: 0.97 } : {}),
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      ...(tilt ? { rotateX: 0, scale: 1 } : {}),
      transition: { duration, delay, ease: EASE_OUT_EXPO },
    },
  };

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      style={tilt ? { transformPerspective: 1200 } : undefined}
    >
      {children}
    </MotionTag>
  );
};

interface StaggerProps {
  children: React.ReactNode;
  className?: string;
  /** Gap in seconds between each child's entrance. */
  stagger?: number;
  delayChildren?: number;
}

/**
 * Cascades its `StaggerItem` children into view one after another.
 * Pair with `StaggerItem` — plain children will not animate.
 */
export const Stagger: React.FC<StaggerProps> = ({
  children,
  className = '',
  stagger = 0.08,
  delayChildren = 0,
}) => {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={staggerContainer(stagger, delayChildren)}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
    >
      {children}
    </motion.div>
  );
};

interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
}

export const StaggerItem: React.FC<StaggerItemProps> = ({
  children,
  className = '',
  variants = riseIn,
}) => {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={variants}
      style={{ transformPerspective: 1200 }}
    >
      {children}
    </motion.div>
  );
};
