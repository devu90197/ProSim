import React from 'react';
import { ArrowRight } from 'lucide-react';
import { ABOUT_DATA, PILLARS_DATA } from '../data/prosimData';
import { DataIcon } from '../lib/icons';
import { Reveal, Stagger, StaggerItem } from './ui/Reveal';
import { SectionHeading } from './ui/SectionHeading';

interface PillarsSectionProps {
  onOpenConsultation: () => void;
}

/**
 * The three headline capability cards.
 *
 * Deliberately scoped to execution-phase work: ProSIM starts at detailed
 * engineering, so there is no front-end or basic-engineering card here and the
 * scope note under the grid says so outright.
 */
export const PillarsSection: React.FC<PillarsSectionProps> = ({ onOpenConsultation }) => (
  <section id="capabilities" className="border-b border-slate-200 bg-white py-20 sm:py-28">
    <div className="page-shell">
      <SectionHeading
        align="center"
        eyebrow="What We Deliver"
        title="Delivering Value Through Engineering Excellence"
        subtitle="We work alongside your team to produce detailed engineering packages that are accurate, buildable and fully substantiated — so there are fewer surprises on site, schedules hold, and the finished asset performs the way the design promised."
      />

      <Stagger className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3" stagger={0.12}>
        {PILLARS_DATA.map((pillar) => (
          <StaggerItem key={pillar.id} className="h-full">
            <article className="group flex h-full flex-col rounded-xl border border-slate-200 bg-slate-50/70 p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-300 hover:bg-white hover:shadow-xl hover:shadow-brand-900/5">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl border border-brand-100 bg-brand-50 transition-colors group-hover:border-brand-300 group-hover:bg-brand-100">
                <DataIcon name={pillar.iconName} className="h-7 w-7" />
              </div>

              <h3 className="text-xl font-bold tracking-tight text-brand-900">{pillar.title}</h3>

              <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">{pillar.desc}</p>

              <button
                type="button"
                onClick={onOpenConsultation}
                className="mt-6 inline-flex cursor-pointer items-center gap-1.5 self-start text-sm font-bold text-brand-600 transition-colors hover:text-brand-800"
              >
                <span>Discuss your scope</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </article>
          </StaggerItem>
        ))}
      </Stagger>

      <Reveal delay={0.15}>
        <p className="mx-auto mt-10 max-w-3xl rounded-lg border border-brand-100 bg-brand-50/70 px-5 py-4 text-center text-xs font-medium leading-relaxed text-brand-800 sm:text-sm">
          {ABOUT_DATA.scopeNote}
        </p>
      </Reveal>
    </div>
  </section>
);
