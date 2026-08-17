import React, { useCallback } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowUp, ChevronRight, ExternalLink, Globe2, ShieldCheck } from 'lucide-react';
import { MagneticButton } from './ui/MagneticButton';
import { Logo } from './ui/Logo';
import { Reveal } from './ui/Reveal';

interface FooterProps {
  onOpenConsultation: () => void;
}

const INDUSTRY_LINKS = [
  'Nuclear Power Island',
  'Thermal & Supercritical Energy',
  'Oil & Gas Production',
  'Petrochemical Plants',
  'Industrial & Heavy Engineering',
  'Power & Grid Utilities',
] as const;

const DISCIPLINE_LINKS = [
  'Finite Element Analysis (FEA)',
  'Computational Fluid Dynamics (CFD)',
  'Piping Stress & Surge Simulation',
  'Plant Engineering & 3D Modeling',
  'Fitness-For-Service (API 579)',
  'Digital Twin & RLA Studies',
] as const;

export const Footer: React.FC<FooterProps> = ({ onOpenConsultation }) => {
  const reduceMotion = useReducedMotion();

  const scrollToSection = useCallback(
    (id: string) => {
      const el = document.getElementById(id);
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY - 88;
      window.scrollTo({ top: Math.max(0, top), behavior: reduceMotion ? 'auto' : 'smooth' });
    },
    [reduceMotion],
  );

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  }, [reduceMotion]);

  const renderLinkList = (items: readonly string[], target: string) => (
    <ul className="space-y-2 text-xs">
      {items.map((name) => (
        <li key={name}>
          <motion.button
            type="button"
            onClick={() => scrollToSection(target)}
            whileHover={reduceMotion ? undefined : { x: 4 }}
            transition={{ type: 'spring', stiffness: 400, damping: 24 }}
            className="flex cursor-pointer items-center gap-1 text-left text-slate-600 transition-colors hover:text-cyan-700"
          >
            <ChevronRight className="h-3 w-3 shrink-0 text-slate-400" aria-hidden />
            <span>{name}</span>
          </motion.button>
        </li>
      ))}
    </ul>
  );

  return (
    <footer className="relative overflow-hidden border-t border-slate-200 bg-slate-100/90 pb-12 pt-16 text-slate-700">
      <div className="pointer-events-none absolute left-1/2 top-0 h-24 w-3/4 -translate-x-1/2 bg-gradient-to-b from-cyan-400/10 to-transparent" />

      <div className="page-shell ">
        <div className="grid grid-cols-1 gap-10 border-b border-slate-200 pb-12 md:grid-cols-2 lg:grid-cols-12">
          <Reveal className="space-y-4 lg:col-span-4" delay={0.05}>
            <div className="flex items-center">
              <Logo />
            </div>

            <p className="max-w-sm text-xs leading-relaxed text-slate-600">
              ProSIM is a multidisciplinary engineering and design company delivering reliable
              solutions across the Energy, Process, Utilities, and Infrastructure sectors, working
              with EPCs, OEMs, and engineering service companies from engineering design through
              detailed engineering and analysis.
            </p>

            <div className="space-y-1 pt-2 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-cyan-600" aria-hidden />
                <span>ISO 9001:2015 &amp; ISO 27001 Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe2 className="h-4 w-4 text-teal-600" aria-hidden />
                <span>Global Codes: ASME, RCC-M, API 579, BS 7910</span>
              </div>
            </div>
          </Reveal>

          <Reveal className="space-y-3 lg:col-span-3" delay={0.12}>
            <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-cyan-800">
              Industries We Serve
            </h2>
            {renderLinkList(INDUSTRY_LINKS, 'industries')}
          </Reveal>

          <Reveal className="space-y-3 lg:col-span-3" delay={0.18}>
            <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-cyan-800">
              Engineering Disciplines
            </h2>
            {renderLinkList(DISCIPLINE_LINKS, 'services')}
          </Reveal>

          <Reveal className="space-y-3 lg:col-span-2" delay={0.24}>
            <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-cyan-800">
              Quick Connect
            </h2>
            <div className="space-y-2.5 text-xs text-slate-600">
              <div>
                <span className="block font-mono text-[10px] uppercase text-slate-400">
                  Desk Phone
                </span>
                <a
                  href="tel:+918023477000"
                  className="font-semibold transition-colors hover:text-cyan-700"
                >
                  +91 (080) 2347-7000
                </a>
              </div>

              <div>
                <span className="block font-mono text-[10px] uppercase text-slate-400">
                  Technical Email
                </span>
                <a
                  href="mailto:info@prosim.co.in"
                  className="block truncate font-semibold transition-colors hover:text-cyan-700"
                >
                  info@prosim.co.in
                </a>
              </div>

              <div className="pt-2">
                <MagneticButton
                  type="button"
                  onClick={onOpenConsultation}
                  className="w-full cursor-pointer rounded-lg bg-cyan-600 px-3 py-2 text-xs font-bold text-white shadow-xs transition-colors hover:bg-cyan-700"
                >
                  RFP Consultation
                </MagneticButton>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 pt-8 text-xs text-slate-500 sm:flex-row">
          <div className="flex flex-col items-center gap-2 text-center sm:flex-row sm:gap-4 sm:text-left">
            <span>© {new Date().getFullYear()} ProSIM R&amp;D Center. All Rights Reserved.</span>
            <span className="hidden text-slate-300 sm:inline">|</span>
            <span>Engineering through Delivery Excellence</span>
          </div>

          <MagneticButton
            type="button"
            onClick={scrollToTop}
            className="flex cursor-pointer items-center gap-2 rounded-full border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-xs transition-colors hover:bg-slate-200"
          >
            <span>Back to Top</span>
            <ArrowUp className="h-3.5 w-3.5 text-cyan-600" />
          </MagneticButton>
        </div>

        {/* Build credit. Opens in a new tab; rel="noopener" keeps the target
            page from reaching back into this one via window.opener. */}
        <div className="mt-6 border-t border-slate-200 pt-5 text-center">
          <p className="text-[11px] text-slate-500">
            Developed &amp; Powered by{' '}
            <motion.a
              href="https://ezbillify.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={reduceMotion ? undefined : { y: -1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 22 }}
              className="group inline-flex items-center gap-1 font-bold text-cyan-700 underline decoration-cyan-300 decoration-dotted underline-offset-4 transition-colors hover:text-cyan-900 hover:decoration-cyan-600"
            >
              <span>EZBillify Ventures</span>
              <ExternalLink
                className="h-3 w-3 opacity-60 transition-opacity group-hover:opacity-100"
                aria-hidden
              />
              <span className="sr-only">(opens in a new tab)</span>
            </motion.a>
          </p>
        </div>
      </div>
    </footer>
  );
};
