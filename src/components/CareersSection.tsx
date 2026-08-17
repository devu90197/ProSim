import React from 'react';
import { CAREERS_DATA } from '../data/prosimData';
import { JobOpening } from '../types';
import { 
  Users, 
  Briefcase, 
  MapPin, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles
} from 'lucide-react';

interface CareersSectionProps {
  onApplyJob: (job: JobOpening) => void;
}

export const CareersSection: React.FC<CareersSectionProps> = ({ onApplyJob }) => {
  return (
    <section id="careers" className="relative py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-teal-400/10 blur-[140px] pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-bold uppercase tracking-wider font-mono shadow-xs">
          <Users className="w-3.5 h-3.5 text-cyan-600" />
          <span>Join Our Specialist Engineering Team</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
          Careers at <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-teal-600 to-sky-600">ProSIM</span>
        </h2>
        <p className="text-sm sm:text-base text-slate-600">
          Work at the forefront of nuclear physics, supercritical energy systems, offshore engineering, and advanced computational mechanics.
        </p>
      </div>

      {/* Culture & Benefits 3-Column Glass Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
        {[
          { title: "Mission-Critical Assets", desc: "Solve challenges for nuclear reactor islands, deepwater subsea pipelines, and refinery hydrocrackers." },
          { title: "High-Performance Computing", desc: "Access cutting-edge GPU/CPU simulation clusters, multi-physics solvers, and automated code post-processors." },
          { title: "Domain Master Mentorship", desc: "Learn directly from senior Fellows and industry veterans with 25+ years in ASME and RCC-M codes." }
        ].map((item, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl backdrop-blur-xl bg-white/80 border border-slate-200 shadow-sm flex flex-col gap-2"
          >
            <div className="flex items-center gap-2 text-cyan-700">
              <Sparkles className="w-4 h-4 text-cyan-600" />
              <h4 className="font-bold text-sm text-slate-900">{item.title}</h4>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Open Positions List */}
      <div className="space-y-4">
        {CAREERS_DATA.map((job) => (
          <div
            key={job.id}
            id={`career-item-${job.id}`}
            className="p-6 rounded-2xl backdrop-blur-2xl bg-white/85 border border-slate-200 hover:border-cyan-400 hover:shadow-md transition-all duration-300 flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-xs group"
          >
            <div className="space-y-2.5 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-md bg-cyan-50 text-cyan-800 border border-cyan-200">
                  {job.department}
                </span>
                <span className="text-[11px] text-slate-500 font-semibold flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-teal-600" />
                  {job.location}
                </span>
                <span className="text-[11px] text-slate-500 font-semibold flex items-center gap-1">
                  <Clock className="w-3 h-3 text-cyan-600" />
                  {job.experience}
                </span>
              </div>

              <h3 className="text-lg font-bold text-slate-900 group-hover:text-cyan-700 transition-colors">
                {job.title}
              </h3>

              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                {job.description}
              </p>

              <div className="flex flex-wrap gap-2 pt-1">
                {job.requirements.slice(0, 3).map((req, rIdx) => (
                  <span key={rIdx} className="text-[11px] text-slate-600 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-teal-600 shrink-0" />
                    <span className="truncate max-w-[280px] sm:max-w-none">{req}</span>
                  </span>
                ))}
              </div>
            </div>

            <div className="shrink-0 flex items-center gap-3">
              <button
                id={`apply-btn-${job.id}`}
                onClick={() => onApplyJob(job)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 via-teal-600 to-sky-600 text-white font-bold text-xs tracking-wide shadow-md shadow-cyan-500/20 hover:shadow-cyan-500/35 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Apply for Position</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
