import React, { useState } from 'react';
import { ABOUT_DATA } from '../data/prosimData';
import { TiltCard } from './TiltCard';
import { 
  Building2, 
  ShieldCheck, 
  Layers, 
  Cpu, 
  CheckCircle, 
  Globe2, 
  FileCheck, 
  Sparkles,
  ArrowRight,
  Zap
} from 'lucide-react';
import { motion } from 'motion/react';

interface AboutSectionProps {
  onOpenConsultation: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenConsultation }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'workflow' | 'certifications'>('overview');

  const standards = [
    { code: "ASME Section III", desc: "Rules for Construction of Nuclear Facility Components (Class 1, 2, 3)" },
    { code: "RCC-M", desc: "Design & Conception Rules for PWR Nuclear Island Mechanical Components" },
    { code: "ASME Section VIII Div 1 & 2", desc: "Pressure Vessel Design-by-Analysis & Plastic Collapse" },
    { code: "API 579 / ASME FFS-1", desc: "Level 1, 2 & 3 Fitness-For-Service & Remaining Life Assessment" },
    { code: "ASME B31.1 / B31.3 / B31.4 / B31.8", desc: "Power & Process Piping Stress, Surge & Flexibility" },
    { code: "BS 7910", desc: "Guide to Methods for Assessing the Acceptability of Flaws in Metallic Structures" },
    { code: "IEEE 693", desc: "Recommended Practice for Seismic Design of Substations" },
    { code: "AERB / US NRC", desc: "Atomic Energy Regulatory Standards for Safety-Critical Nuclear Plants" }
  ];

  const workflowSteps = [
    {
      step: "01",
      title: "Physics Problem Definition",
      desc: "Analyzing boundary conditions, operating thermal transients, seismic spectra, and load combinations."
    },
    {
      step: "02",
      title: "3D CAD & Discretization",
      desc: "High-density hexahedral/tetrahedral meshing, contact pairs, and material non-linearity setup."
    },
    {
      step: "03",
      title: "Multi-Physics Simulation",
      desc: "Transient FEA, multiphase CFD, conjugate heat transfer, and coupled fluid-structure interaction."
    },
    {
      step: "04",
      title: "Code Verification & Delivery",
      desc: "Stress linearization, creep-fatigue damage assessment, and stamped audit-ready engineering reports."
    }
  ];

  return (
    <section id="about" className="relative py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Glow Backdrops */}
      <div className="absolute top-1/3 -left-20 w-80 h-80 rounded-full bg-cyan-400/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 rounded-full bg-teal-400/10 blur-[130px] pointer-events-none" />

      {/* Main Glass Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Core About Statement & Primary Glass Panel */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-bold uppercase tracking-wider font-mono shadow-xs">
            <Building2 className="w-3.5 h-3.5 text-cyan-600" />
            <span>About ProSIM</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Pioneering Multi-Discipline <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-teal-600 to-sky-600">
              Engineering & Analysis
            </span>
          </h2>

          {/* EXACT Required Statement */}
          <div className="p-6 sm:p-8 rounded-3xl backdrop-blur-2xl bg-white/85 border border-slate-200 shadow-[0_10px_35px_rgba(15,23,42,0.06)] relative">
            <div className="absolute top-0 left-8 right-8 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
            <p className="text-base sm:text-lg text-slate-800 leading-relaxed font-normal">
              {ABOUT_DATA.statement}
            </p>

            <div className="mt-6 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-slate-700 font-semibold">
                <Globe2 className="w-4 h-4 text-cyan-600" />
                <span>Global Engineering Standards Compliant</span>
              </div>
              <button
                onClick={onOpenConsultation}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-700 hover:text-cyan-900 transition-colors cursor-pointer"
              >
                <span>Partner with Us</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Core Pillars 2x2 Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {ABOUT_DATA.pillars.map((pillar, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl backdrop-blur-xl bg-white/70 border border-slate-200/90 hover:border-cyan-400 hover:shadow-md transition-all duration-300 flex flex-col gap-2 group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-700 group-hover:bg-cyan-600 group-hover:text-white transition-colors">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-sm text-slate-900">{pillar.title}</h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed pl-9">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Interactive Tabbed Panel (Workflow / Standards / Overview) */}
        <div className="lg:col-span-5 h-full">
          <div className="h-full rounded-3xl backdrop-blur-2xl bg-white/85 border border-slate-200 p-6 sm:p-7 flex flex-col justify-between shadow-xl relative overflow-hidden">
            {/* Specular line */}
            <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-teal-500/40 to-transparent" />

            <div className="space-y-5">
              {/* Tab Navigation */}
              <div className="flex items-center justify-between p-1 rounded-2xl bg-slate-100 border border-slate-200">
                {[
                  { id: 'overview', label: 'Domains' },
                  { id: 'workflow', label: 'Delivery' },
                  { id: 'certifications', label: 'Codes & Standards' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                      activeTab === tab.id
                        ? 'bg-white text-cyan-800 shadow-sm border border-slate-200'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab 1: Domains */}
              {activeTab === 'overview' && (
                <div className="space-y-3.5">
                  <h4 className="text-xs font-bold text-cyan-800 uppercase font-mono tracking-wider">
                    Comprehensive Engagement Spectrum
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Working hand-in-hand with EPC contractors and technology OEMs across the complete project lifecycle:
                  </p>

                  <div className="space-y-2.5">
                    {[
                      { title: "Conceptual & FEED Engineering", desc: "Thermal sizing, flow routing, material selection & preliminary seismic envelope definition." },
                      { title: "Detailed Engineering & 3D CAD", desc: "Fabrication drawings, piping isometrics, equipment GA drawings, structural steel design." },
                      { title: "Advanced Physics-Based Analysis", desc: "Linear/non-linear FEA, CFD, acoustic pulsation, surge analysis, transient thermal stress." },
                      { title: "Life Extension & Plant RLA", desc: "Fitness-for-service (API 579 Level 3), creep-fatigue damage mapping, remaining life assessment." }
                    ].map((item, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-slate-50/80 border border-slate-200 flex items-start gap-3">
                        <div className="w-5 h-5 rounded-md bg-cyan-100 text-cyan-700 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                          {idx + 1}
                        </div>
                        <div>
                          <h5 className="text-xs font-bold text-slate-900">{item.title}</h5>
                          <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 2: Workflow Steps */}
              {activeTab === 'workflow' && (
                <div className="space-y-3.5">
                  <h4 className="text-xs font-bold text-cyan-800 uppercase font-mono tracking-wider">
                    The Delivery Excellence Method
                  </h4>
                  <div className="space-y-3">
                    {workflowSteps.map((step) => (
                      <div key={step.step} className="p-3 rounded-xl bg-slate-50/80 border border-slate-200 flex items-start gap-3.5">
                        <span className="text-sm font-black text-cyan-700 font-mono">{step.step}</span>
                        <div>
                          <h5 className="text-xs font-bold text-slate-900">{step.title}</h5>
                          <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 3: Regulatory Codes */}
              {activeTab === 'certifications' && (
                <div className="space-y-3 max-h-[340px] overflow-y-auto pr-1">
                  <h4 className="text-xs font-bold text-cyan-800 uppercase font-mono tracking-wider">
                    Regulatory Code Compliance
                  </h4>
                  <div className="space-y-2">
                    {standards.map((std, idx) => (
                      <div key={idx} className="p-2.5 rounded-xl bg-slate-50/80 border border-slate-200 flex items-start gap-2.5">
                        <FileCheck className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                        <div>
                          <span className="text-xs font-bold text-slate-900">{std.code}</span>
                          <p className="text-[11px] text-slate-600 leading-snug">{std.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Quick Callout */}
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-600 font-medium">Ready to review your technical specs?</span>
              <button
                onClick={onOpenConsultation}
                className="px-3.5 py-1.5 rounded-xl bg-cyan-600 text-white font-bold hover:bg-cyan-700 transition-all cursor-pointer shadow-xs"
              >
                Request Audit
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
