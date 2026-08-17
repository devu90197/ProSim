import React, { useState } from 'react';
import { PROJECTS_DATA } from '../data/prosimData';
import { ProjectCaseStudy } from '../types';
import { TiltCard } from './TiltCard';
import { 
  FolderGit2, 
  CheckCircle2, 
  ArrowUpRight, 
  Activity, 
  ShieldCheck, 
  Award,
  Layers
} from 'lucide-react';

interface ProjectsSectionProps {
  onSelectProject?: (project: ProjectCaseStudy) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onSelectProject }) => {
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all');

  const industries = ['all', 'Nuclear Power', 'Thermal Energy', 'Oil & Gas', 'Petrochemical Engineering'];

  const filteredProjects = selectedIndustry === 'all'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter((p) => p.industry.toLowerCase() === selectedIndustry.toLowerCase());

  return (
    <section id="projects" className="relative py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Glow Ambience */}
      <div className="absolute top-1/2 right-1/4 w-80 h-80 rounded-full bg-cyan-400/10 blur-[130px] pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-bold uppercase tracking-wider font-mono shadow-xs">
            <FolderGit2 className="w-3.5 h-3.5 text-cyan-600" />
            <span>Mission-Critical Case Studies</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
            Proven Delivery <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-teal-600 to-sky-600">Excellence</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Selected engineering design, multi-physics simulations, and regulatory code qualifications delivered by ProSIM.
          </p>
        </div>

        {/* Industry Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100 border border-slate-200 overflow-x-auto self-start md:self-auto max-w-full">
          {industries.map((ind) => (
            <button
              key={ind}
              onClick={() => setSelectedIndustry(ind)}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                selectedIndustry === ind
                  ? 'bg-white text-cyan-800 shadow-sm border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {ind === 'all' ? 'All Case Studies' : ind}
            </button>
          ))}
        </div>
      </div>

      {/* Project Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7">
        {filteredProjects.map((project) => (
          <div key={project.id} className="h-full">
            <TiltCard
              id={`project-card-${project.id}`}
              glowColor="cyan"
              className="flex flex-col justify-between h-full bg-white/85 backdrop-blur-2xl border-slate-200/90 shadow-sm hover:shadow-lg group"
            >
              <div className="space-y-4">
                {/* Header Tag + Client Sector */}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-cyan-50 text-cyan-800 border border-cyan-200">
                    {project.industry}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-500">
                    {project.clientType}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-cyan-700 transition-colors leading-snug">
                  {project.title}
                </h3>

                {/* Challenge & Solution */}
                <div className="space-y-2.5 pt-2">
                  <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/80 space-y-1">
                    <span className="text-[10px] uppercase font-mono font-bold text-amber-800">
                      Technical Challenge:
                    </span>
                    <p className="text-xs text-slate-700 leading-relaxed font-normal">
                      {project.challenge}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-cyan-50/70 border border-cyan-200/80 space-y-1">
                    <span className="text-[10px] uppercase font-mono font-bold text-cyan-800">
                      Simulation & Engineering Solution:
                    </span>
                    <p className="text-xs text-slate-700 leading-relaxed font-normal">
                      {project.solution}
                    </p>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200 font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer Result & Metric */}
              <div className="pt-4 mt-5 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-teal-600 shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-500 uppercase font-mono font-semibold">
                      {project.metrics.label}
                    </span>
                    <span className="text-sm font-bold text-cyan-700 font-mono">
                      {project.metrics.val}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-xs text-slate-600 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                  <span className="truncate">Audit Stamped</span>
                </div>
              </div>
            </TiltCard>
          </div>
        ))}
      </div>
    </section>
  );
};
