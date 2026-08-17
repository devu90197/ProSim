import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, CheckCircle2, Clock, MapPin, Sparkles, Users } from 'lucide-react';
import { CAREERS_DATA } from '../data/prosimData';
import type { JobOpening } from '../types';
import { MagneticButton } from './ui/MagneticButton';
import { Reveal, Stagger, StaggerItem } from './ui/Reveal';

interface CareersSectionProps {
  onApplyJob: (job: JobOpening) => void;
}

const CULTURE_POINTS = [
  {
    title: 'Mission-Critical Assets',
    desc: 'Solve challenges for nuclear reactor islands, deepwater subsea pipelines, and refinery hydrocrackers.',
  },
  {
    title: 'High-Performance Computing',
    desc: 'Access cutting-edge GPU/CPU simulation clusters, multi-physics solvers, and automated code post-processors.',
  },
  {
    title: 'Domain Master Mentorship',
    desc: 'Learn directly from senior Fellows and industry veterans with 25+ years in ASME and RCC-M codes.',
  },
] as const;

export const CareersSection: React.FC<CareersSectionProps> = ({ onApplyJob }) => {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="careers"
      className="relative page-shell py-20 sm:py-28 "
    >
      <div className="animate-float-slow pointer-events-none absolute left-1/4 top-1/4 h-80 w-80 rounded-full bg-teal-400/10 blur-[140px]" />

      <Reveal className="mx-auto mb-12 max-w-3xl space-y-3 text-center sm:mb-16">
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-3.5 py-1 font-mono text-xs font-bold uppercase tracking-wider text-cyan-800 shadow-xs">
          <Users className="h-3.5 w-3.5 text-cyan-600" aria-hidden />
          <span>Join Our Specialist Engineering Team</span>
        </div>
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
          Careers at{' '}
          <span className="bg-gradient-to-r from-cyan-600 via-teal-600 to-sky-600 bg-clip-text text-transparent">
            ProSIM
          </span>
        </h2>
        <p className="text-sm text-slate-600 sm:text-base">
          Work at the forefront of nuclear physics, supercritical energy systems, offshore
          engineering, and advanced computational mechanics.
        </p>
      </Reveal>

      <Stagger className="mb-10 grid grid-cols-1 gap-5 md:grid-cols-3" stagger={0.1}>
        {CULTURE_POINTS.map((item) => (
          <StaggerItem key={item.title} className="h-full">
            <motion.div
              whileHover={reduceMotion ? undefined : { y: -6, rotateX: 4, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              style={{ transformPerspective: 1000 }}
              className="flex h-full flex-col gap-2 rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm backdrop-blur-xl transition-colors hover:border-cyan-300"
            >
              <div className="flex items-center gap-2 text-cyan-700">
                <Sparkles className="h-4 w-4 text-cyan-600" aria-hidden />
                <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
              </div>
              <p className="text-xs leading-relaxed text-slate-600">{item.desc}</p>
            </motion.div>
          </StaggerItem>
        ))}
      </Stagger>

      <Stagger className="space-y-4" stagger={0.1}>
        {CAREERS_DATA.map((job) => (
          <StaggerItem key={job.id}>
            <motion.article
              id={`career-item-${job.id}`}
              whileHover={reduceMotion ? undefined : { scale: 1.008, x: 4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 26 }}
              className="group flex flex-col justify-between gap-6 rounded-2xl border border-slate-200 bg-white/85 p-6 shadow-xs backdrop-blur-2xl transition-colors duration-300 hover:border-cyan-400 hover:shadow-md lg:flex-row lg:items-center"
            >
              <div className="max-w-3xl space-y-2.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-md border border-cyan-200 bg-cyan-50 px-2.5 py-0.5 font-mono text-[11px] font-bold text-cyan-800">
                    {job.department}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] font-semibold text-slate-500">
                    <MapPin className="h-3 w-3 text-teal-600" aria-hidden />
                    {job.location}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] font-semibold text-slate-500">
                    <Clock className="h-3 w-3 text-cyan-600" aria-hidden />
                    {job.experience}
                  </span>
                  <span className="rounded border border-slate-200 bg-slate-100 px-2 py-0.5 font-mono text-[10px] font-semibold text-slate-600">
                    {job.type}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 transition-colors group-hover:text-cyan-700">
                  {job.title}
                </h3>

                <p className="text-xs font-normal leading-relaxed text-slate-600">
                  {job.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-1">
                  {job.requirements.slice(0, 3).map((req) => (
                    <span key={req} className="flex items-center gap-1 text-[11px] text-slate-600">
                      <CheckCircle2 className="h-3 w-3 shrink-0 text-teal-600" aria-hidden />
                      <span className="max-w-[280px] truncate sm:max-w-none">{req}</span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-3">
                <MagneticButton
                  id={`apply-btn-${job.id}`}
                  type="button"
                  onClick={() => onApplyJob(job)}
                  className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 via-teal-600 to-sky-600 px-5 py-2.5 text-xs font-bold tracking-wide text-white shadow-md shadow-cyan-500/20 transition-shadow hover:shadow-cyan-500/35 sm:w-auto"
                >
                  <span>Apply for Position</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </MagneticButton>
              </div>
            </motion.article>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
};
