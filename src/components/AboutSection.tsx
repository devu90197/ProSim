import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, Building2, CheckCircle, FileCheck, Globe2 } from 'lucide-react';
import { ABOUT_DATA } from '../data/prosimData';
import { MagneticButton } from './ui/MagneticButton';
import { Reveal, Stagger, StaggerItem } from './ui/Reveal';
import { EASE_OUT_EXPO } from '../lib/motion';

interface AboutSectionProps {
  onOpenConsultation: () => void;
}

const TABS = [
  { id: 'overview', label: 'Domains' },
  { id: 'workflow', label: 'Delivery' },
  { id: 'certifications', label: 'Codes & Standards' },
] as const;

type TabId = (typeof TABS)[number]['id'];

const STANDARDS = [
  {
    code: 'ASME Section III',
    desc: 'Rules for Construction of Nuclear Facility Components (Class 1, 2, 3)',
  },
  {
    code: 'RCC-M',
    desc: 'Design & Conception Rules for PWR Nuclear Island Mechanical Components',
  },
  {
    code: 'ASME Section VIII Div 1 & 2',
    desc: 'Pressure Vessel Design-by-Analysis & Plastic Collapse',
  },
  {
    code: 'API 579 / ASME FFS-1',
    desc: 'Level 1, 2 & 3 Fitness-For-Service & Remaining Life Assessment',
  },
  {
    code: 'ASME B31.1 / B31.3 / B31.4 / B31.8',
    desc: 'Power & Process Piping Stress, Surge & Flexibility',
  },
  {
    code: 'BS 7910',
    desc: 'Guide to Methods for Assessing the Acceptability of Flaws in Metallic Structures',
  },
  { code: 'IEEE 693', desc: 'Recommended Practice for Seismic Design of Substations' },
  {
    code: 'AERB / US NRC',
    desc: 'Atomic Energy Regulatory Standards for Safety-Critical Nuclear Plants',
  },
] as const;

const WORKFLOW_STEPS = [
  {
    step: '01',
    title: 'Physics Problem Definition',
    desc: 'Analyzing boundary conditions, operating thermal transients, seismic spectra, and load combinations.',
  },
  {
    step: '02',
    title: '3D CAD & Discretization',
    desc: 'High-density hexahedral/tetrahedral meshing, contact pairs, and material non-linearity setup.',
  },
  {
    step: '03',
    title: 'Multi-Physics Simulation',
    desc: 'Transient FEA, multiphase CFD, conjugate heat transfer, and coupled fluid-structure interaction.',
  },
  {
    step: '04',
    title: 'Code Verification & Delivery',
    desc: 'Stress linearization, creep-fatigue damage assessment, and stamped audit-ready engineering reports.',
  },
] as const;

const DOMAINS = [
  {
    title: 'Conceptual & FEED Engineering',
    desc: 'Thermal sizing, flow routing, material selection & preliminary seismic envelope definition.',
  },
  {
    title: 'Detailed Engineering & 3D CAD',
    desc: 'Fabrication drawings, piping isometrics, equipment GA drawings, structural steel design.',
  },
  {
    title: 'Advanced Physics-Based Analysis',
    desc: 'Linear/non-linear FEA, CFD, acoustic pulsation, surge analysis, transient thermal stress.',
  },
  {
    title: 'Life Extension & Plant RLA',
    desc: 'Fitness-for-service (API 579 Level 3), creep-fatigue damage mapping, remaining life assessment.',
  },
] as const;

/** Shared enter/exit motion for the tab panels. */
const panelMotion = {
  initial: { opacity: 0, x: 14 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -14 },
  transition: { duration: 0.32, ease: EASE_OUT_EXPO },
};

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenConsultation }) => {
  const [activeTab, setActiveTab] = useState<TabId>('overview');

  return (
    <section id="about" className="relative page-shell py-20 sm:py-28 ">
      <div className="animate-float-slow pointer-events-none absolute -left-20 top-1/3 h-80 w-80 rounded-full bg-cyan-400/10 blur-[130px]" />
      <div className="animate-float-slow pointer-events-none absolute -right-20 bottom-1/4 h-80 w-80 rounded-full bg-teal-400/10 blur-[130px]" />

      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
        {/* Left: statement + pillars */}
        <div className="space-y-6 lg:col-span-7">
          <Reveal className="space-y-6" direction="right">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-3.5 py-1 font-mono text-xs font-bold uppercase tracking-wider text-cyan-800 shadow-xs">
              <Building2 className="h-3.5 w-3.5 text-cyan-600" aria-hidden />
              <span>About ProSIM</span>
            </div>

            <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Pioneering Multi-Discipline <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-cyan-600 via-teal-600 to-sky-600 bg-clip-text text-transparent">
                Engineering &amp; Analysis
              </span>
            </h2>

            <div className="gradient-border relative rounded-3xl border border-slate-200 bg-white/85 p-6 shadow-[0_10px_35px_rgba(15,23,42,0.06)] backdrop-blur-2xl sm:p-8">
              <p className="text-base font-normal leading-relaxed text-slate-800 sm:text-lg">
                {ABOUT_DATA.statement}
              </p>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-6">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                  <Globe2 className="h-4 w-4 text-cyan-600" aria-hidden />
                  <span>Global Engineering Standards Compliant</span>
                </div>
                <button
                  type="button"
                  onClick={onOpenConsultation}
                  className="group inline-flex cursor-pointer items-center gap-1.5 text-xs font-bold text-cyan-700 transition-colors hover:text-cyan-900"
                >
                  <span>Partner with Us</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </Reveal>

          <Stagger className="grid grid-cols-1 gap-4 sm:grid-cols-2" stagger={0.09}>
            {ABOUT_DATA.pillars.map((pillar) => (
              <StaggerItem key={pillar.title} className="h-full">
                <motion.div
                  whileHover={{ y: -5, rotateX: 5, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                  style={{ transformPerspective: 1000 }}
                  className="group flex h-full flex-col gap-2 rounded-2xl border border-slate-200/90 bg-white/70 p-5 backdrop-blur-xl transition-colors duration-300 hover:border-cyan-400 hover:shadow-md"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-cyan-200 bg-cyan-50 text-cyan-700 transition-colors group-hover:bg-cyan-600 group-hover:text-white">
                      <CheckCircle className="h-4 w-4" aria-hidden />
                    </div>
                    <h3 className="text-sm font-bold text-slate-900">{pillar.title}</h3>
                  </div>
                  <p className="pl-9 text-xs leading-relaxed text-slate-600">{pillar.desc}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        {/* Right: tabbed detail panel */}
        <Reveal className="h-full lg:col-span-5" direction="left" delay={0.15}>
          <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-slate-200 bg-white/85 p-6 shadow-xl backdrop-blur-2xl sm:p-7">
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-teal-500/40 to-transparent"
            />

            <div className="space-y-5">
              <div
                role="tablist"
                aria-label="About ProSIM"
                className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-100 p-1"
              >
                {TABS.map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      aria-controls={`about-panel-${tab.id}`}
                      onClick={() => setActiveTab(tab.id)}
                      className={`relative flex-1 cursor-pointer rounded-xl px-1 py-2 text-[11px] font-bold leading-tight transition-colors sm:text-xs ${
                        isActive ? 'text-cyan-800' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="about-tab-pill"
                          transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                          className="absolute inset-0 rounded-xl border border-slate-200 bg-white shadow-sm"
                        />
                      )}
                      <span className="relative z-10">{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              <AnimatePresence mode="wait">
                {activeTab === 'overview' && (
                  <motion.div
                    key="overview"
                    id="about-panel-overview"
                    role="tabpanel"
                    {...panelMotion}
                    className="space-y-3.5"
                  >
                    <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-cyan-800">
                      Comprehensive Engagement Spectrum
                    </h3>
                    <p className="text-xs leading-relaxed text-slate-600">
                      Working hand-in-hand with EPC contractors and technology OEMs across the
                      complete project lifecycle:
                    </p>

                    <div className="space-y-2.5">
                      {DOMAINS.map((item, idx) => (
                        <div
                          key={item.title}
                          className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50/80 p-3 transition-colors hover:border-cyan-300"
                        >
                          <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-cyan-100 text-xs font-bold text-cyan-700">
                            {idx + 1}
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-slate-900">{item.title}</h4>
                            <p className="mt-0.5 text-[11px] leading-relaxed text-slate-600">
                              {item.desc}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'workflow' && (
                  <motion.div
                    key="workflow"
                    id="about-panel-workflow"
                    role="tabpanel"
                    {...panelMotion}
                    className="space-y-3.5"
                  >
                    <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-cyan-800">
                      The Delivery Excellence Method
                    </h3>
                    <div className="space-y-3">
                      {WORKFLOW_STEPS.map((step) => (
                        <div
                          key={step.step}
                          className="flex items-start gap-3.5 rounded-xl border border-slate-200 bg-slate-50/80 p-3 transition-colors hover:border-cyan-300"
                        >
                          <span className="font-mono text-sm font-black text-cyan-700">
                            {step.step}
                          </span>
                          <div>
                            <h4 className="text-xs font-bold text-slate-900">{step.title}</h4>
                            <p className="mt-0.5 text-[11px] leading-relaxed text-slate-600">
                              {step.desc}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'certifications' && (
                  <motion.div
                    key="certifications"
                    id="about-panel-certifications"
                    role="tabpanel"
                    {...panelMotion}
                    className="max-h-[340px] space-y-3 overflow-y-auto pr-1"
                  >
                    <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-cyan-800">
                      Regulatory Code Compliance
                    </h3>
                    <div className="space-y-2">
                      {STANDARDS.map((std) => (
                        <div
                          key={std.code}
                          className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50/80 p-2.5 transition-colors hover:border-cyan-300"
                        >
                          <FileCheck className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" aria-hidden />
                          <div>
                            <span className="text-xs font-bold text-slate-900">{std.code}</span>
                            <p className="text-[11px] leading-snug text-slate-600">{std.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="mt-4 flex items-center justify-between gap-3 border-t border-slate-100 pt-4 text-xs">
              <span className="font-medium text-slate-600">Ready to review your technical specs?</span>
              <MagneticButton
                type="button"
                onClick={onOpenConsultation}
                className="shrink-0 cursor-pointer rounded-xl bg-cyan-600 px-3.5 py-1.5 font-bold text-white shadow-xs transition-colors hover:bg-cyan-700"
              >
                Request Audit
              </MagneticButton>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
