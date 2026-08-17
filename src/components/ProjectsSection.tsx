import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Award, CheckCircle2, FolderGit2 } from 'lucide-react';
import { PROJECTS_DATA, PROJECT_FILTERS } from '../data/prosimData';
import { TiltCard } from './TiltCard';
import { Reveal } from './ui/Reveal';
import { EASE_OUT_EXPO } from '../lib/motion';

export const ProjectsSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const reduceMotion = useReducedMotion();

  const filteredProjects = useMemo(
    () =>
      activeFilter === 'all'
        ? PROJECTS_DATA
        : PROJECTS_DATA.filter((project) => project.industry === activeFilter),
    [activeFilter],
  );

  return (
    <section
      id="projects"
      className="relative page-shell py-20 sm:py-28 "
    >
      <div className="animate-float-slow pointer-events-none absolute right-1/4 top-1/2 h-80 w-80 rounded-full bg-cyan-400/10 blur-[130px]" />

      <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <Reveal className="max-w-2xl space-y-3" direction="right">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-3.5 py-1 font-mono text-xs font-bold uppercase tracking-wider text-cyan-800 shadow-xs">
            <FolderGit2 className="h-3.5 w-3.5 text-cyan-600" aria-hidden />
            <span>Mission-Critical Case Studies</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Proven Delivery{' '}
            <span className="bg-gradient-to-r from-cyan-600 via-teal-600 to-sky-600 bg-clip-text text-transparent">
              Excellence
            </span>
          </h2>
          <p className="text-sm text-slate-600 sm:text-base">
            Selected engineering design, multi-physics simulations, and regulatory code
            qualifications delivered by ProSIM.
          </p>
        </Reveal>

        {/* Filters are derived from the case studies themselves, so a pill can
            never point at an industry with no projects behind it. */}
        <Reveal direction="left" delay={0.12} className="self-start md:self-auto max-w-full">
          <div
            role="tablist"
            aria-label="Filter case studies by industry"
            className="flex items-center gap-1.5 overflow-x-auto rounded-2xl border border-slate-200 bg-slate-100 p-1"
          >
            {PROJECT_FILTERS.map((filter) => {
              const isActive = activeFilter === filter;
              return (
                <button
                  key={filter}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveFilter(filter)}
                  className={`relative cursor-pointer whitespace-nowrap rounded-xl px-3.5 py-1.5 text-xs font-bold transition-colors ${
                    isActive ? 'text-cyan-800' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="project-filter-pill"
                      transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                      className="absolute inset-0 rounded-xl border border-slate-200 bg-white shadow-sm"
                    />
                  )}
                  <span className="relative z-10">
                    {filter === 'all' ? 'All Case Studies' : filter}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>
      </div>

      {/* Cards reflow with a layout animation when the filter changes. */}
      <motion.div layout className="grid grid-cols-1 gap-6 md:grid-cols-2 sm:gap-7">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.92, y: 24 }}
              animate={reduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.94, y: -12 }}
              transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
              className="h-full"
            >
              <TiltCard
                id={`project-card-${project.id}`}
                glowColor="cyan"
                className="group border-slate-200/90 bg-white/85 shadow-sm backdrop-blur-2xl"
              >
                <div className="flex-1 space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-full border border-cyan-200 bg-cyan-50 px-2.5 py-0.5 font-mono text-[11px] font-bold text-cyan-800">
                      {project.industry}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-500">
                      {project.clientType}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold leading-snug text-slate-900 transition-colors group-hover/tilt:text-cyan-700">
                    {project.title}
                  </h3>

                  <div className="space-y-2.5 pt-2">
                    <div className="space-y-1 rounded-xl border border-amber-200/80 bg-amber-50/70 p-3">
                      <span className="font-mono text-[10px] font-bold uppercase text-amber-800">
                        Technical Challenge:
                      </span>
                      <p className="text-xs font-normal leading-relaxed text-slate-700">
                        {project.challenge}
                      </p>
                    </div>

                    <div className="space-y-1 rounded-xl border border-cyan-200/80 bg-cyan-50/70 p-3">
                      <span className="font-mono text-[10px] font-bold uppercase text-cyan-800">
                        Simulation &amp; Engineering Solution:
                      </span>
                      <p className="text-xs font-normal leading-relaxed text-slate-700">
                        {project.solution}
                      </p>
                    </div>

                    <div className="space-y-1 rounded-xl border border-emerald-200/80 bg-emerald-50/70 p-3">
                      <span className="font-mono text-[10px] font-bold uppercase text-emerald-800">
                        Outcome:
                      </span>
                      <p className="text-xs font-normal leading-relaxed text-slate-700">
                        {project.result}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded border border-slate-200 bg-slate-100 px-2 py-0.5 font-mono text-[10px] font-medium text-slate-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 shrink-0 text-teal-600" aria-hidden />
                    <div className="flex flex-col">
                      <span className="font-mono text-[10px] font-semibold uppercase text-slate-500">
                        {project.metrics.label}
                      </span>
                      <span className="font-mono text-sm font-bold text-cyan-700">
                        {project.metrics.val}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-xs font-semibold text-slate-600">
                    <CheckCircle2 className="h-3.5 w-3.5 text-teal-600" aria-hidden />
                    <span className="truncate">Audit Stamped</span>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};
