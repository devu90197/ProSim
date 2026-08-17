import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { CLIENTS_DATA } from '../data/prosimData';
import type { ClientItem } from '../types';
import { Reveal } from './ui/Reveal';

type Accent = 'cyan' | 'teal';

const ACCENT: Record<Accent, { monogram: string; hover: string; title: string }> = {
  cyan: {
    monogram: 'text-cyan-800 group-hover:border-cyan-300',
    hover: 'hover:border-cyan-400 hover:bg-cyan-50/60',
    title: 'group-hover:text-cyan-700',
  },
  teal: {
    monogram: 'text-teal-800 group-hover:border-teal-300',
    hover: 'hover:border-teal-400 hover:bg-teal-50/60',
    title: 'group-hover:text-teal-700',
  },
};

interface ClientChipProps {
  client: ClientItem;
  accent: Accent;
}

/** One client tile. Extracted so both marquee rows share a single definition. */
const ClientChip: React.FC<ClientChipProps> = ({ client, accent }) => {
  const reduceMotion = useReducedMotion();
  const tone = ACCENT[accent];

  return (
    <motion.div
      whileHover={reduceMotion ? undefined : { y: -4, scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 320, damping: 22 }}
      title={client.description}
      className={`group relative flex min-w-[240px] cursor-default items-center gap-3.5 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3.5 shadow-xs transition-colors duration-300 hover:shadow-md sm:min-w-[280px] ${tone.hover}`}
    >
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white font-mono text-sm font-black shadow-2xs transition-all ${tone.monogram}`}
      >
        {client.shortName.slice(0, 3).toUpperCase()}
      </div>

      <div className="flex flex-col overflow-hidden">
        <div className="flex items-center gap-2">
          <span
            className={`truncate text-xs font-bold text-slate-900 transition-colors sm:text-sm ${tone.title}`}
          >
            {client.shortName}
          </span>
          <span className="shrink-0 rounded bg-slate-200/70 px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase text-slate-700">
            {client.sector}
          </span>
        </div>
        <span className="mt-0.5 truncate text-[11px] text-slate-500">{client.name}</span>
      </div>
    </motion.div>
  );
};

export const ClientsMarquee: React.FC = () => {
  // Each row renders its list twice so the -50% translate wraps seamlessly.
  const row1 = [...CLIENTS_DATA, ...CLIENTS_DATA];
  const reversed = [...CLIENTS_DATA].reverse();
  const row2 = [...reversed, ...reversed];

  return (
    <section
      id="clients"
      className="relative overflow-hidden border-b border-slate-200 bg-white py-14 sm:py-20"
    >
      <Reveal className="page-shell mb-8 space-y-2 text-center">
        <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
          <span className="font-black text-cyan-600">800+</span> Trusted Global Energy &amp; EPC
          Clients
        </h2>
        <p className="mx-auto max-w-xl text-xs font-normal text-slate-500 sm:text-sm">
          Empowering Tier-1 nuclear operators, oil &amp; gas supermajors, thermal utilities, and
          defence engineering consortia.
        </p>
      </Reveal>

      {/* Row 1 — travels left */}
      <div className="marquee-track relative mb-4 w-full overflow-hidden py-1">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent sm:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent sm:w-32" />

        <div className="animate-marquee items-center gap-4 sm:gap-6">
          {row1.map((client, idx) => (
            <ClientChip key={`row1-${client.id}-${idx}`} client={client} accent="cyan" />
          ))}
        </div>
      </div>

      {/* Row 2 — travels right */}
      <div className="marquee-track relative w-full overflow-hidden py-1">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent sm:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent sm:w-32" />

        <div className="animate-marquee-reverse items-center gap-4 sm:gap-6">
          {row2.map((client, idx) => (
            <ClientChip key={`row2-${client.id}-${idx}`} client={client} accent="teal" />
          ))}
        </div>
      </div>
    </section>
  );
};
