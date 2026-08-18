import React from 'react';
import { ArrowRight } from 'lucide-react';
import { INDUSTRIES_DATA } from '../data/prosimData';
import type { IndustryItem } from '../types';
import { MagneticButton } from './ui/MagneticButton';
import { Reveal, Stagger, StaggerItem } from './ui/Reveal';
import { SectionHeading } from './ui/SectionHeading';

interface IndustriesSectionProps {
  onSelectIndustry: (industry: IndustryItem) => void;
  onOpenConsultation: () => void;
}

/**
 * Industry grid.
 *
 * Rebuilt around the photography from the company deck: each sector is a
 * full-bleed image in a slightly sheared, lit frame with the icon and title
 * Rebuilt around the artwork from the company deck: each sector card is used
 * exactly as designed, with an interactive layer over it. The capabilities,
 * standards and metrics live in the modal the card opens.
 */
export const IndustriesSection: React.FC<IndustriesSectionProps> = ({
  onSelectIndustry,
  onOpenConsultation,
}) => (
  <section id="industries" className="border-b border-slate-200 bg-slate-50 py-20 sm:py-28">
    <div className="page-shell">
      <div className="mb-14 flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <SectionHeading
          eyebrow="Industries We Serve"
          title="Solving Industry's Most Pressing Challenges"
          subtitle="A trusted detailed engineering partner in the sectors where getting the analysis right is not negotiable — and where the cost of getting it wrong is measured in shutdowns, not revisions."
        />

        <Reveal direction="left" delay={0.15} className="self-start md:self-auto">
          <MagneticButton
            type="button"
            onClick={onOpenConsultation}
            className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-brand-200 bg-white px-6 py-3 text-sm font-bold text-brand-800 shadow-xs transition-colors hover:border-brand-500 hover:bg-brand-50"
          >
            <span>Discuss your application</span>
            <ArrowRight className="h-4 w-4 text-brand-500" />
          </MagneticButton>
        </Reveal>
      </div>

      <Stagger
        className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3"
        stagger={0.09}
      >
        {INDUSTRIES_DATA.map((industry) => (
          <StaggerItem key={industry.id} className="h-full">
            <button
              type="button"
              id={`industry-card-${industry.id}`}
              onClick={() => onSelectIndustry(industry)}
              aria-label={`View engineering scope for ${industry.title}`}
              className="group/ind block w-full cursor-pointer text-left focus:outline-none"
            >
              <div className="industry-frame">
                {/*
                 * The deck already draws each card complete — framed
                 * photograph, icon medallion and sector name. Rendering our own
                 * title over it produced two captions stacked on each other, and
                 * cropping the artwork to make room cut the frame open. So the
                 * card art is used exactly as designed and only the interactive
                 * layer is added: the sector name stays available to screen
                 * readers, and the category plus the affordance fade in over the
                 * lower edge on hover.
                 */}
                <div className="relative aspect-1086/1448 overflow-hidden bg-brand-950">
                  <img
                    src={industry.image}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover/ind:scale-[1.03]"
                  />

                  <h3 className="sr-only">{industry.title}</h3>

                  <div
                    aria-hidden
                    className="industry-scrim absolute inset-x-0 bottom-0 h-1/4 opacity-0 transition-opacity duration-300 group-hover/ind:opacity-100"
                  />

                  <div className="absolute inset-x-0 bottom-0 flex translate-y-2 flex-col items-center gap-1.5 p-5 text-center opacity-0 transition-all duration-300 group-hover/ind:translate-y-0 group-hover/ind:opacity-100">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-200">
                      {industry.category}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-white">
                      <span>View engineering scope</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            </button>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  </section>
);
