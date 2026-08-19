import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { CLIENTS_DATA } from '../data/prosimData';
import type { ClientItem } from '../types';
import { SectionHeading } from './ui/SectionHeading';

/**
 * One client tile.
 *
 * The marks arrive as full-colour artwork on inconsistent grounds, so each sits
 * on a plain white plate at a fixed height with `object-contain`. That gives a
 * wide wordmark and a round emblem the same visual weight without cropping
 * either. Colour is held back until hover so the row reads as one calm band.
 */
const ClientChip: React.FC<{ client: ClientItem }> = ({ client }) => {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      whileHover={reduceMotion ? undefined : { y: -4 }}
      transition={{ type: 'spring', stiffness: 320, damping: 22 }}
      title={client.description}
      className="group flex h-24 w-52 shrink-0 cursor-default items-center justify-center rounded-xl border border-slate-200 bg-white px-6 shadow-xs transition-all duration-300 hover:border-brand-300 hover:shadow-md sm:w-60"
    >
      <img
        src={client.logo}
        alt={client.name}
        loading="lazy"
        decoding="async"
        className="max-h-12 w-auto max-w-full object-contain opacity-75 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0"
      />
    </motion.div>
  );
};

export const ClientsMarquee: React.FC = () => {
  // Split the roster across two rows travelling in opposite directions, each
  // duplicated so the -50% translate wraps seamlessly.
  const half = Math.ceil(CLIENTS_DATA.length / 2);
  const first = CLIENTS_DATA.slice(0, half);
  const second = CLIENTS_DATA.slice(half);

  const row1 = [...first, ...first];
  const row2 = [...second, ...second];

  return (
    <section
      id="clients"
      className="relative overflow-hidden border-b border-slate-200 bg-white py-16 sm:py-20"
    >
      <div className="page-shell mb-10">
        <SectionHeading
          eyebrow="Clients"
          title={
            <>
              Trusted by <span className="text-accent-500">800+</span> customers worldwide
            </>
          }
          subtitle="Nuclear operators, oil & gas majors, thermal utilities, EPCs and equipment OEMs come to ProSIM for detailed engineering and analysis they can hand straight to fabrication."
        />
      </div>

      {[row1, row2].map((row, rowIdx) => (
        <div
          key={rowIdx}
          className="marquee-track relative w-full overflow-hidden py-2 last:mb-0"
        >
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent sm:w-32" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent sm:w-32" />

          <div
            className={`${rowIdx === 0 ? 'animate-marquee' : 'animate-marquee-reverse'} items-center gap-5 sm:gap-6`}
          >
            {row.map((client, idx) => (
              <ClientChip key={`row${rowIdx}-${client.id}-${idx}`} client={client} />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};
