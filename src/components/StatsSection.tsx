import React from 'react';
import { Award, Briefcase, CheckCircle2, Clock, TrendingUp, Users2 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { STATS_DATA } from '../data/prosimData';
import { TiltCard } from './TiltCard';
import { CountUp } from './ui/CountUp';
import { Stagger, StaggerItem } from './ui/Reveal';
import { SectionHeading } from './ui/SectionHeading';

/** Per-stat presentation, keyed by the stat's id in the data layer. */
const STAT_STYLE: Record<string, { icon: LucideIcon; tone: string; glow: 'cyan' | 'indigo' | 'emerald' | 'amber' }> = {
  'stat-projects': { icon: Briefcase, tone: 'text-cyan-600', glow: 'cyan' },
  'stat-years': { icon: Award, tone: 'text-teal-600', glow: 'emerald' },
  'stat-customers': { icon: Users2, tone: 'text-sky-600', glow: 'cyan' },
  'stat-hours': { icon: Clock, tone: 'text-indigo-600', glow: 'indigo' },
};

const FALLBACK_STYLE = { icon: TrendingUp, tone: 'text-cyan-600', glow: 'cyan' } as const;

export const StatsSection: React.FC = () => (
  <section
    id="stats"
    className="relative page-shell py-16 sm:py-24 "
  >
    <div className="animate-float-slow pointer-events-none absolute left-1/4 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-cyan-400/10 blur-[100px]" />
    <div className="animate-float-slow pointer-events-none absolute right-1/4 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-teal-400/10 blur-[100px]" />

    <SectionHeading
      align="center"
      className="mb-12 sm:mb-16"
      eyebrow="Track Record"
      title="Measurable Milestones of Engineering Trust"
      subtitle="Two and a half decades of physics-based simulation, structural integrity assessment and code-certified plant engineering — counted in delivered projects, not promises."
    />

    <Stagger
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
      stagger={0.12}
    >
      {STATS_DATA.map((stat) => {
        const style = STAT_STYLE[stat.id] ?? FALLBACK_STYLE;
        const Icon = style.icon;

        return (
          <StaggerItem key={stat.id} className="h-full">
            <TiltCard
              id={`stat-card-${stat.id}`}
              glowColor={style.glow}
              className="border-slate-200/90 bg-white/85 shadow-sm backdrop-blur-2xl"
            >
              <div className="flex-1 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 shadow-xs">
                    <Icon className={`h-6 w-6 ${style.tone}`} aria-hidden />
                  </div>
                  <span className="rounded-md border border-cyan-200 bg-cyan-50 px-2 py-0.5 font-mono text-[11px] font-bold text-cyan-800">
                    {stat.highlight}
                  </span>
                </div>

                <div className="pt-1">
                  <CountUp
                    value={stat.value}
                    suffix={stat.suffix}
                    className="bg-gradient-to-r from-slate-950 via-cyan-800 to-teal-700 bg-clip-text font-mono text-3xl font-extrabold tracking-tight text-transparent sm:text-4xl lg:text-5xl"
                  />
                  <h3 className="mt-2 text-base font-bold tracking-tight text-slate-900">
                    {stat.label}
                  </h3>
                </div>

                <p className="text-xs font-normal leading-relaxed text-slate-600">
                  {stat.description}
                </p>
              </div>

              <div className="mt-4 flex items-center gap-1.5 border-t border-slate-100 pt-4 text-[11px] font-semibold text-cyan-700">
                <CheckCircle2 className="h-3.5 w-3.5 text-teal-600" aria-hidden />
                <span>Verified Delivery Record</span>
              </div>
            </TiltCard>
          </StaggerItem>
        );
      })}
    </Stagger>
  </section>
);
