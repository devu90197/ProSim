import React, { useState } from 'react';
import { INDUSTRIES_DATA } from '../data/prosimData';
import { IndustryItem } from '../types';
import { TiltCard } from './TiltCard';
import { 
  Atom, 
  Flame, 
  Droplets, 
  Layers, 
  Cpu, 
  Zap, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  Activity,
  Layers3
} from 'lucide-react';

interface IndustriesSectionProps {
  onSelectIndustry: (industry: IndustryItem) => void;
  onOpenConsultation: () => void;
}

export const IndustriesSection: React.FC<IndustriesSectionProps> = ({ 
  onSelectIndustry, 
  onOpenConsultation 
}) => {
  const getIndustryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Atom':
        return <Atom className="w-6 h-6 text-cyan-600" />;
      case 'Flame':
        return <Flame className="w-6 h-6 text-amber-600" />;
      case 'Droplets':
        return <Droplets className="w-6 h-6 text-sky-600" />;
      case 'Layers':
        return <Layers className="w-6 h-6 text-teal-600" />;
      case 'Cpu':
        return <Cpu className="w-6 h-6 text-indigo-600" />;
      case 'Zap':
        return <Zap className="w-6 h-6 text-emerald-600" />;
      default:
        return <Activity className="w-6 h-6 text-cyan-600" />;
    }
  };

  const getGlowByIndustry = (id: string): 'cyan' | 'indigo' | 'emerald' | 'amber' => {
    switch (id) {
      case 'nuclear-power':
        return 'cyan';
      case 'thermal-energy':
        return 'amber';
      case 'oil-and-gas':
        return 'cyan';
      case 'petrochemical-engineering':
        return 'emerald';
      case 'industrial-heavy-engineering':
        return 'indigo';
      case 'power-and-utilities':
        return 'emerald';
      default:
        return 'cyan';
    }
  };

  return (
    <section id="industries" className="relative py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Background Ambience */}
      <div className="absolute top-1/4 right-10 w-96 h-96 rounded-full bg-cyan-400/10 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-10 w-96 h-96 rounded-full bg-teal-400/10 blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-bold uppercase tracking-wider font-mono shadow-xs">
            <Layers3 className="w-3.5 h-3.5 text-cyan-600" />
            <span>Sectors We Empower</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
            Industries We <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-teal-600 to-sky-600">Serve</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Delivering high-assurance multi-physics engineering, regulatory code qualification, and detailed design across critical energy and industrial sectors.
          </p>
        </div>

        <button
          onClick={onOpenConsultation}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-800 text-xs font-bold hover:border-cyan-500 hover:text-cyan-700 hover:bg-slate-50 transition-all self-start md:self-auto cursor-pointer shadow-xs"
        >
          <span>Discuss Your Industry Application</span>
          <ArrowRight className="w-4 h-4 text-cyan-600" />
        </button>
      </div>

      {/* 6 Industry Cards Grid with 3D Tilt */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
        {INDUSTRIES_DATA.map((industry) => (
          <div key={industry.id} className="h-full">
            <TiltCard
              id={`industry-card-${industry.id}`}
              glowColor={getGlowByIndustry(industry.id)}
              onClick={() => onSelectIndustry(industry)}
              className="flex flex-col justify-between h-full group bg-white/85 backdrop-blur-xl border-slate-200/90 shadow-sm hover:shadow-lg"
            >
              <div className="space-y-4">
                {/* Card Top: Icon + Category Badge */}
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 group-hover:border-cyan-400 transition-colors shadow-xs">
                    {getIndustryIcon(industry.iconName)}
                  </div>
                  <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-cyan-50 text-cyan-800 border border-cyan-200">
                    {industry.category}
                  </span>
                </div>

                {/* Industry Title */}
                <div>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-cyan-700 transition-colors tracking-tight">
                    {industry.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed line-clamp-2">
                    {industry.shortDesc}
                  </p>
                </div>

                {/* Core Capabilities Preview */}
                <div className="space-y-1.5 pt-2">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 font-bold">
                    Core Solutions
                  </span>
                  <div className="space-y-1">
                    {industry.capabilities.slice(0, 3).map((cap, cIdx) => (
                      <div key={cIdx} className="flex items-start gap-1.5 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                        <span className="truncate">{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Regulatory Code Tags */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {industry.keyStandards.slice(0, 3).map((std, sIdx) => (
                    <span
                      key={sIdx}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200"
                    >
                      {std}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer: Metrics & Interactive CTA */}
              <div className="pt-4 mt-5 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-600" />
                  <span className="text-[11px] font-mono font-bold text-slate-700">
                    {industry.metrics}
                  </span>
                </div>

                <span className="inline-flex items-center gap-1 text-xs font-bold text-cyan-700 group-hover:translate-x-1 transition-transform">
                  <span>Explore Specs</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </TiltCard>
          </div>
        ))}
      </div>
    </section>
  );
};
