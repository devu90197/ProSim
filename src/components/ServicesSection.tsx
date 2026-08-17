import React, { useState } from 'react';
import { SERVICES_DATA } from '../data/prosimData';
import { ServiceItem } from '../types';
import { TiltCard } from './TiltCard';
import { 
  Layers, 
  Wind, 
  Activity, 
  Box, 
  ShieldAlert, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Wrench,
  FileCheck2
} from 'lucide-react';

interface ServicesSectionProps {
  onOpenConsultation: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenConsultation }) => {
  const [selectedService, setSelectedService] = useState<ServiceItem>(SERVICES_DATA[0]);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Layers':
        return <Layers className="w-5 h-5 text-cyan-600" />;
      case 'Wind':
        return <Wind className="w-5 h-5 text-teal-600" />;
      case 'Activity':
        return <Activity className="w-5 h-5 text-sky-600" />;
      case 'Box':
        return <Box className="w-5 h-5 text-indigo-600" />;
      case 'ShieldAlert':
        return <ShieldAlert className="w-5 h-5 text-amber-600" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-cyan-600" />;
      default:
        return <Layers className="w-5 h-5 text-cyan-600" />;
    }
  };

  return (
    <section id="services" className="relative py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Background Glow */}
      <div className="absolute top-1/3 left-1/3 w-80 h-80 rounded-full bg-cyan-400/10 blur-[130px] pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-bold uppercase tracking-wider font-mono shadow-xs">
          <Wrench className="w-3.5 h-3.5 text-cyan-600" />
          <span>Core Engineering Disciplines</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
          Multi-Disciplinary <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-teal-600 to-sky-600">Engineering Services</span>
        </h2>
        <p className="text-sm sm:text-base text-slate-600">
          From high-order finite element analysis to multiphase fluid mechanics and as-built 3D plant laser engineering.
        </p>
      </div>

      {/* 6 Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
        {SERVICES_DATA.map((service, idx) => {
          const isSelected = selectedService.id === service.id;
          return (
            <div key={service.id} className="h-full">
              <TiltCard
                id={`service-card-${service.id}`}
                glowColor={idx % 2 === 0 ? 'cyan' : 'emerald'}
                onClick={() => setSelectedService(service)}
                className={`flex flex-col justify-between h-full group bg-white/85 backdrop-blur-xl border-slate-200/90 shadow-sm hover:shadow-lg ${
                  isSelected ? 'border-cyan-400 ring-2 ring-cyan-400/20' : ''
                }`}
              >
                <div className="space-y-4">
                  {/* Service Header */}
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 group-hover:border-cyan-400 transition-colors shadow-xs">
                      {getServiceIcon(service.iconName)}
                    </div>
                    <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-slate-400">
                      0{idx + 1}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-cyan-700 transition-colors tracking-tight">
                      {service.title}
                    </h3>
                    <p className="text-xs font-mono font-bold text-cyan-700 mt-1">
                      {service.tagline}
                    </p>
                    <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
                      {service.desc}
                    </p>
                  </div>

                  {/* Deliverables Checklist */}
                  <div className="space-y-1.5 pt-2 border-t border-slate-100">
                    <span className="text-[10px] uppercase font-mono text-slate-400 font-bold tracking-wider">
                      Key Deliverables
                    </span>
                    <div className="space-y-1">
                      {service.deliverables.slice(0, 3).map((item, dIdx) => (
                        <div key={dIdx} className="flex items-start gap-1.5 text-xs text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                          <span className="truncate">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Software Stack Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {service.tools.map((tool, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200 font-medium"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card CTA */}
                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-cyan-700 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    <span>Consult on {service.title.split(' ')[0]}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </TiltCard>
            </div>
          );
        })}
      </div>

      {/* Services Bottom Banner */}
      <div className="mt-12 p-6 rounded-3xl backdrop-blur-2xl bg-white/90 border border-slate-200 shadow-md flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        <div className="space-y-1">
          <h4 className="text-base font-bold text-slate-900">Need a Customized Multi-Discipline Engineering Package?</h4>
          <p className="text-xs text-slate-600">Our engineering teams combine FEA, CFD, and piping stress into unified multidisciplinary simulations.</p>
        </div>
        <button
          onClick={onOpenConsultation}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-600 via-teal-600 to-sky-600 text-white font-bold text-xs tracking-wide shadow-md shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all shrink-0 cursor-pointer"
        >
          Request Technical Scope Assessment
        </button>
      </div>
    </section>
  );
};
