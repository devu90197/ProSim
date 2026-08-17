import React from 'react';
import { CLIENTS_DATA } from '../data/prosimData';
import { Award, ShieldCheck, Sparkles } from 'lucide-react';

export const ClientsMarquee: React.FC = () => {
  const row1 = [...CLIENTS_DATA, ...CLIENTS_DATA];
  const row2 = [...CLIENTS_DATA.slice().reverse(), ...CLIENTS_DATA.slice().reverse()];

  return (
    <section id="clients" className="relative py-14 sm:py-20 overflow-hidden bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center space-y-2">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900">
          <span className="text-cyan-600 font-black">800+</span> Trusted Global Energy & EPC Clients
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto font-normal">
          Empowering Tier-1 nuclear operators, oil & gas supermajors, thermal utilities, and defence engineering consortia.
        </p>
      </div>

      {/* Infinite Auto-Scrolling Marquee Row 1 (Left to Right) */}
      <div className="relative w-full overflow-hidden mb-4 py-1">
        {/* Gradient edge masks for smooth fading */}
        <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee flex items-center gap-4 sm:gap-6 w-max">
          {row1.map((client, idx) => (
            <div
              key={`row1-${client.id}-${idx}`}
              className="group relative flex items-center gap-3.5 px-5 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-cyan-400 hover:bg-cyan-50/50 hover:shadow-md transition-all duration-300 shadow-xs min-w-[240px] sm:min-w-[280px] cursor-default"
            >
              {/* Client Avatar / Monogram */}
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center font-black text-sm text-cyan-800 group-hover:scale-105 group-hover:border-cyan-300 transition-all shrink-0 font-mono shadow-2xs">
                {client.shortName.slice(0, 3).toUpperCase()}
              </div>

              <div className="flex flex-col overflow-hidden">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-cyan-700 transition-colors truncate">
                    {client.shortName}
                  </span>
                  <span className="text-[9px] uppercase font-mono font-bold px-1.5 py-0.2 rounded bg-slate-200/70 text-slate-700">
                    {client.sector}
                  </span>
                </div>
                <span className="text-[11px] text-slate-500 truncate mt-0.5" title={client.name}>
                  {client.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Infinite Auto-Scrolling Marquee Row 2 (Right to Left) */}
      <div className="relative w-full overflow-hidden py-1">
        <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee-reverse flex items-center gap-4 sm:gap-6 w-max">
          {row2.map((client, idx) => (
            <div
              key={`row2-${client.id}-${idx}`}
              className="group relative flex items-center gap-3.5 px-5 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-cyan-400 hover:bg-cyan-50/50 hover:shadow-md transition-all duration-300 shadow-xs min-w-[240px] sm:min-w-[280px] cursor-default"
            >
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center font-black text-sm text-teal-800 group-hover:scale-105 group-hover:border-teal-300 transition-all shrink-0 font-mono shadow-2xs">
                {client.shortName.slice(0, 3).toUpperCase()}
              </div>

              <div className="flex flex-col overflow-hidden">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-teal-700 transition-colors truncate">
                    {client.shortName}
                  </span>
                  <span className="text-[9px] uppercase font-mono font-bold px-1.5 py-0.2 rounded bg-slate-200/70 text-slate-700">
                    {client.sector}
                  </span>
                </div>
                <span className="text-[11px] text-slate-500 truncate mt-0.5" title={client.name}>
                  {client.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
