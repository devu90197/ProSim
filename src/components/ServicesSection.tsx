import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Wrench } from 'lucide-react';
import { SERVICES_DATA } from '../data/prosimData';
import { TiltCard } from './TiltCard';
import { DataIcon } from '../lib/icons';
import { MagneticButton } from './ui/MagneticButton';
import { Reveal, Stagger, StaggerItem } from './ui/Reveal';

interface ServicesSectionProps {
  onOpenConsultation: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenConsultation }) => {
  // Tracks which discipline the visitor last focused on, so the grid keeps a
  // visible anchor point as they compare cards.
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(
    SERVICES_DATA[0]?.id ?? null,
  );

  return (
    <section
      id="services"
      className="relative page-shell py-20 sm:py-28 "
    >
      <div className="animate-float-slow pointer-events-none absolute left-1/3 top-1/3 h-80 w-80 rounded-full bg-cyan-400/10 blur-[130px]" />

      <Reveal className="mx-auto mb-12 max-w-3xl space-y-3 text-center sm:mb-16">
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-3.5 py-1 font-mono text-xs font-bold uppercase tracking-wider text-cyan-800 shadow-xs">
          <Wrench className="h-3.5 w-3.5 text-cyan-600" aria-hidden />
          <span>Core Engineering Disciplines</span>
        </div>
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
          Multi-Disciplinary{' '}
          <span className="bg-gradient-to-r from-cyan-600 via-teal-600 to-sky-600 bg-clip-text text-transparent">
            Engineering Services
          </span>
        </h2>
        <p className="text-sm text-slate-600 sm:text-base">
          From high-order finite element analysis to multiphase fluid mechanics and as-built 3D
          plant laser engineering.
        </p>
      </Reveal>

      <Stagger
        className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 sm:gap-7"
        stagger={0.09}
      >
        {SERVICES_DATA.map((service, idx) => {
          const isSelected = selectedServiceId === service.id;

          return (
            <StaggerItem key={service.id} className="h-full">
              <TiltCard
                id={`service-card-${service.id}`}
                glowColor={idx % 2 === 0 ? 'cyan' : 'emerald'}
                onClick={() => setSelectedServiceId(service.id)}
                ariaLabel={`Highlight ${service.title}`}
                className={`group border-slate-200/90 bg-white/85 shadow-sm backdrop-blur-xl ${
                  isSelected ? 'border-cyan-400 ring-2 ring-cyan-400/20' : ''
                }`}
              >
                <div className="flex-1 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-2.5 shadow-xs transition-colors group-hover/tilt:border-cyan-400">
                      <DataIcon name={service.iconName} className="h-5 w-5" />
                    </div>
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold tracking-tight text-slate-900 transition-colors group-hover/tilt:text-cyan-700">
                      {service.title}
                    </h3>
                    <p className="mt-1 font-mono text-xs font-bold text-cyan-700">
                      {service.tagline}
                    </p>
                    <p className="mt-2.5 text-xs leading-relaxed text-slate-600">{service.desc}</p>
                  </div>

                  <div className="space-y-1.5 border-t border-slate-100 pt-2">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Key Deliverables
                    </span>
                    <div className="space-y-1">
                      {service.deliverables.slice(0, 3).map((item) => (
                        <div key={item} className="flex items-start gap-1.5 text-xs text-slate-700">
                          <CheckCircle2
                            className="mt-0.5 h-3.5 w-3.5 shrink-0 text-teal-600"
                            aria-hidden
                          />
                          <span className="truncate">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {service.tools.map((tool) => (
                      <span
                        key={tool}
                        className="rounded border border-slate-200 bg-slate-100 px-2 py-0.5 font-mono text-[10px] font-medium text-slate-600"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-cyan-700 transition-transform group-hover/tilt:translate-x-1">
                    <span>Consult on {service.title.split(' ')[0]}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </TiltCard>
            </StaggerItem>
          );
        })}
      </Stagger>

      <Reveal delay={0.1} className="mt-12">
        <div className="gradient-border flex flex-col items-center justify-between gap-6 rounded-3xl border border-slate-200 bg-white/90 p-6 text-center shadow-md backdrop-blur-2xl sm:flex-row sm:text-left">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-900">
              Need a Customized Multi-Discipline Engineering Package?
            </h3>
            <p className="text-xs text-slate-600">
              Our engineering teams combine FEA, CFD, and piping stress into unified
              multidisciplinary simulations.
            </p>
          </div>
          <MagneticButton
            type="button"
            onClick={onOpenConsultation}
            className="shrink-0 cursor-pointer rounded-xl bg-gradient-to-r from-cyan-600 via-teal-600 to-sky-600 px-6 py-3 text-xs font-bold tracking-wide text-white shadow-md shadow-cyan-500/25 transition-shadow hover:shadow-cyan-500/40"
          >
            Request Technical Scope Assessment
          </MagneticButton>
        </div>
      </Reveal>
    </section>
  );
};
