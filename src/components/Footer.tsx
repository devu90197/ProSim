import React from 'react';
import { 
  ShieldCheck, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowUp, 
  Globe2, 
  ExternalLink,
  ChevronRight,
  Sparkles
} from 'lucide-react';

interface FooterProps {
  onOpenConsultation: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenConsultation }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative bg-slate-100/90 border-t border-slate-200 text-slate-700 pt-16 pb-12 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-b from-cyan-400/10 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-200">
          {/* Column 1: Brand & Philosophy (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-600 via-teal-500 to-sky-500 p-[1.5px] shadow-sm">
                <div className="w-full h-full bg-white rounded-xl flex items-center justify-center font-extrabold text-sm text-cyan-700">
                  PS
                </div>
              </div>
              <span className="text-xl font-extrabold tracking-tight text-slate-900 font-sans">
                ProSIM
              </span>
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-cyan-50 text-cyan-800 border border-cyan-200 uppercase">
                R&D Center
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed max-w-sm">
              ProSIM is a multidisciplinary engineering and design company delivering reliable solutions across the Energy, Process, Utilities, and Infrastructure sectors, working with EPCs, OEMs, and engineering service companies from engineering design through detailed engineering and analysis.
            </p>

            <div className="pt-2 text-xs text-slate-500 space-y-1">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-cyan-600" />
                <span>ISO 9001:2015 & ISO 27001 Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe2 className="w-4 h-4 text-teal-600" />
                <span>Global Codes: ASME, RCC-M, API 579, BS 7910</span>
              </div>
            </div>
          </div>

          {/* Column 2: Industries We Serve (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase font-mono tracking-wider text-cyan-800">
              Industries We Serve
            </h4>
            <ul className="space-y-2 text-xs">
              {[
                { name: 'Nuclear Power Island', href: 'industries' },
                { name: 'Thermal & Supercritical Energy', href: 'industries' },
                { name: 'Oil & Gas Production', href: 'industries' },
                { name: 'Petrochemical Plants', href: 'industries' },
                { name: 'Industrial & Heavy Engineering', href: 'industries' },
                { name: 'Power & Grid Utilities', href: 'industries' },
              ].map((item, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => scrollToSection(item.href)}
                    className="hover:text-cyan-700 transition-colors flex items-center gap-1 cursor-pointer text-slate-600"
                  >
                    <ChevronRight className="w-3 h-3 text-slate-400" />
                    <span>{item.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Core Disciplines (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase font-mono tracking-wider text-cyan-800">
              Engineering Disciplines
            </h4>
            <ul className="space-y-2 text-xs">
              {[
                { name: 'Finite Element Analysis (FEA)', href: 'services' },
                { name: 'Computational Fluid Dynamics (CFD)', href: 'services' },
                { name: 'Piping Stress & Surge Simulation', href: 'services' },
                { name: 'Plant Engineering & 3D Modeling', href: 'services' },
                { name: 'Fitness-For-Service (API 579)', href: 'services' },
                { name: 'Digital Twin & RLA Studies', href: 'services' },
              ].map((item, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => scrollToSection(item.href)}
                    className="hover:text-cyan-700 transition-colors flex items-center gap-1 cursor-pointer text-slate-600"
                  >
                    <ChevronRight className="w-3 h-3 text-slate-400" />
                    <span>{item.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Quick Inquiries (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase font-mono tracking-wider text-cyan-800">
              Quick Connect
            </h4>
            <div className="space-y-2.5 text-xs text-slate-600">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-mono block">Desk Phone</span>
                <a href="tel:+918023477000" className="hover:text-cyan-700 font-semibold transition-colors">
                  +91 (080) 2347-7000
                </a>
              </div>

              <div>
                <span className="text-[10px] text-slate-400 uppercase font-mono block">Technical Email</span>
                <a href="mailto:info@prosim.co.in" className="hover:text-cyan-700 font-semibold transition-colors truncate block">
                  info@prosim.co.in
                </a>
              </div>

              <div className="pt-2">
                <button
                  onClick={onOpenConsultation}
                  className="w-full py-2 px-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs transition-colors cursor-pointer shadow-xs"
                >
                  RFP Consultation
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back-to-Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <span>© {new Date().getFullYear()} ProSIM R&D Center. All Rights Reserved.</span>
            <span className="hidden sm:inline text-slate-300">|</span>
            <span>Engineering through Delivery Excellence</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white hover:bg-slate-200 text-slate-700 border border-slate-300 transition-colors cursor-pointer text-xs font-medium shadow-xs"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-cyan-600" />
          </button>
        </div>
      </div>
    </footer>
  );
};
