import React from 'react';
import { ArrowRight, CheckCircle2, Layers3, ShieldCheck } from 'lucide-react';
import { INDUSTRIES_DATA } from '../data/prosimData';
import type { IndustryItem } from '../types';
import { TiltCard } from './TiltCard';
import { DataIcon } from '../lib/icons';
import { MagneticButton } from './ui/MagneticButton';
import { Reveal, Stagger, StaggerItem } from './ui/Reveal';

interface IndustriesSectionProps {
  onSelectIndustry: (industry: IndustryItem) => void;
  onOpenConsultation: () => void;
}

type Glow = 'cyan' | 'indigo' | 'emerald' | 'amber';

/** Accent hue per industry, keyed by id. */
const GLOW_BY_INDUSTRY: Record<string, Glow> = {
  'nuclear-power': 'cyan',
  'thermal-energy': 'amber',
  'oil-and-gas': 'cyan',
  'petrochemical-engineering': 'emerald',
  'industrial-heavy-engineering': 'indigo',
  'power-and-utilities': 'emerald',
};

export const IndustriesSection: React.FC<IndustriesSectionProps> = ({
  onSelectIndustry,
  onOpenConsultation,
}) => (
  <section
    id="industries"
    className="relative page-shell py-20 sm:py-28 "
  >
    <div className="animate-float-slow pointer-events-none absolute right-10 top-1/4 h-96 w-96 rounded-full bg-cyan-400/10 blur-[140px]" />
    <div className="animate-float-slow pointer-events-none absolute bottom-1/4 left-10 h-96 w-96 rounded-full bg-teal-400/10 blur-[140px]" />

    <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end sm:mb-16">
      <Reveal className="max-w-2xl space-y-3" direction="right">
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-3.5 py-1 font-mono text-xs font-bold uppercase tracking-wider text-cyan-800 shadow-xs">
          <Layers3 className="h-3.5 w-3.5 text-cyan-600" aria-hidden />
          <span>Sectors We Empower</span>
        </div>
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
          Industries We{' '}
          <span className="bg-gradient-to-r from-cyan-600 via-teal-600 to-sky-600 bg-clip-text text-transparent">
            Serve
          </span>
        </h2>
        <p className="text-sm text-slate-600 sm:text-base">
          Delivering high-assurance multi-physics engineering, regulatory code qualification, and
          detailed design across critical energy and industrial sectors.
        </p>
      </Reveal>

      <Reveal direction="left" delay={0.15} className="self-start md:self-auto">
        <MagneticButton
          type="button"
          onClick={onOpenConsultation}
          className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-xs font-bold text-slate-800 shadow-xs transition-colors hover:border-cyan-500 hover:bg-slate-50 hover:text-cyan-700"
        >
          <span>Discuss Your Industry Application</span>
          <ArrowRight className="h-4 w-4 text-cyan-600" />
        </MagneticButton>
      </Reveal>
    </div>

    <Stagger className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 sm:gap-7" stagger={0.09}>
      {INDUSTRIES_DATA.map((industry) => (
        <StaggerItem key={industry.id} className="h-full">
          <TiltCard
            id={`industry-card-${industry.id}`}
            glowColor={GLOW_BY_INDUSTRY[industry.id] ?? 'cyan'}
            onClick={() => onSelectIndustry(industry)}
            ariaLabel={`View engineering specifications for ${industry.title}`}
            className="group border-slate-200/90 bg-white/85 shadow-sm backdrop-blur-xl"
          >
            <div className="flex-1 space-y-4">
              <div className="flex items-center justify-between">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 shadow-xs transition-colors group-hover/tilt:border-cyan-400">
                  <DataIcon name={industry.iconName} className="h-6 w-6" />
                </div>
                <span className="rounded-full border border-cyan-200 bg-cyan-50 px-2.5 py-0.5 font-mono text-[11px] font-bold text-cyan-800">
                  {industry.category}
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold tracking-tight text-slate-900 transition-colors group-hover/tilt:text-cyan-700">
                  {industry.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-slate-600">
                  {industry.shortDesc}
                </p>
              </div>

              <div className="space-y-1.5 pt-2">
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Core Solutions
                </span>
                <div className="space-y-1">
                  {industry.capabilities.slice(0, 3).map((cap) => (
                    <div key={cap} className="flex items-start gap-1.5 text-xs text-slate-700">
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-teal-600" aria-hidden />
                      <span className="truncate">{cap}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-2">
                {industry.keyStandards.slice(0, 3).map((std) => (
                  <span
                    key={std}
                    className="rounded border border-slate-200 bg-slate-100 px-2 py-0.5 font-mono text-[10px] text-slate-600"
                  >
                    {std}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-cyan-600" aria-hidden />
                <span className="font-mono text-[11px] font-bold text-slate-700">
                  {industry.metrics}
                </span>
              </div>

              <span className="inline-flex items-center gap-1 text-xs font-bold text-cyan-700 transition-transform group-hover/tilt:translate-x-1">
                <span>Explore Specs</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </TiltCard>
        </StaggerItem>
      ))}
    </Stagger>
  </section>
);
