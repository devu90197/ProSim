import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { EASE_OUT_EXPO, VIEWPORT } from '../../lib/motion';

interface SectionHeadingProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  /** Small label above the title. */
  eyebrow?: React.ReactNode;
  align?: 'left' | 'center';
  /** Inverts the type and rule colours for the dark sections. */
  onDark?: boolean;
  className?: string;
}

/**
 * The standard section opener: optional eyebrow, title, accent rule, subtitle.
 *
 * Every section used to hand-roll this, which is why the rule, the type scale
 * and the entrance timing had drifted apart between them. Centralising it also
 * lets the four parts cascade in reading order as the block scrolls in, rather
 * than the whole heading popping in as a single unit.
 */
export const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  subtitle,
  eyebrow,
  align = 'left',
  onDark = false,
  className = '',
}) => {
  const reduceMotion = useReducedMotion();

  const isCentred = align === 'center';
  const wrapper = [
    'flex flex-col',
    isCentred ? 'items-center text-center mx-auto max-w-3xl' : 'items-start max-w-2xl',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const parts = [
    eyebrow ? (
      <p
        key="eyebrow"
        className={`text-xs font-bold uppercase tracking-[0.18em] ${
          onDark ? 'text-brand-300' : 'text-brand-600'
        }`}
      >
        {eyebrow}
      </p>
    ) : null,

    <h2
      key="title"
      className={`text-3xl font-extrabold leading-[1.12] tracking-tight sm:text-4xl lg:text-[2.75rem] ${
        onDark ? 'text-white' : 'text-brand-900'
      }`}
    >
      {title}
    </h2>,

    <span
      key="rule"
      aria-hidden
      className={`rule-accent mt-5 ${isCentred ? 'mx-auto' : ''} ${
        onDark ? 'rule-accent-on-dark' : ''
      }`}
    />,

    subtitle ? (
      <p
        key="subtitle"
        className={`mt-5 text-sm leading-relaxed sm:text-base ${
          onDark ? 'text-slate-300' : 'text-slate-600'
        }`}
      >
        {subtitle}
      </p>
    ) : null,
  ].filter(Boolean) as React.ReactElement[];

  if (reduceMotion) {
    return <div className={wrapper}>{parts}</div>;
  }

  return (
    <motion.div
      className={wrapper}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
    >
      {parts.map((part) => (
        <motion.div
          key={part.key}
          // Full-width so the heading and copy wrap against the container
          // rather than shrink-wrapping to the flex item; alignment comes from
          // the parent's text-align.
          className="w-full"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, ease: EASE_OUT_EXPO },
            },
          }}
        >
          {part}
        </motion.div>
      ))}
    </motion.div>
  );
};
