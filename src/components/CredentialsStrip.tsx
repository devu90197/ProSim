import React from 'react';
import { CREDENTIALS_DATA } from '../data/prosimData';
import { getIconComponent } from '../lib/icons';
import { Stagger, StaggerItem } from './ui/Reveal';
import { SectionHeading } from './ui/SectionHeading';

/**
 * The standards band.
 *
 * Runs on the deep brand ground so it acts as a visual rest between two white
 * sections. Icons are rendered through `getIconComponent` rather than
 * `DataIcon` because the registered tones are tuned for light cards and would
 * disappear against this background.
 */
export const CredentialsStrip: React.FC = () => (
  <section id="standards" className="relative overflow-hidden bg-brand-950 py-20 sm:py-24">
    <div aria-hidden className="blueprint-grid absolute inset-0 opacity-60" />

    <div className="page-shell relative z-10">
      <SectionHeading
        align="center"
        onDark
        eyebrow="Codes & Compliance"
        title="Turning Standards into Standouts"
        subtitle="Every package is built against the code the asset will actually be certified to, then independently checked and peer-reviewed before it ever leaves our hands."
      />

      <Stagger className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.1}>
        {CREDENTIALS_DATA.map((cred) => {
          const Icon = getIconComponent(cred.iconName);

          return (
            <StaggerItem key={cred.id} className="h-full">
              <div className="flex h-full flex-col rounded-xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm transition-colors duration-300 hover:border-brand-400/50 hover:bg-white/[0.08]">
                <Icon className="mb-4 h-7 w-7 text-brand-300" aria-hidden />
                <h3 className="text-base font-bold tracking-tight text-white">{cred.label}</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-400">{cred.detail}</p>
              </div>
            </StaggerItem>
          );
        })}
      </Stagger>
    </div>
  </section>
);
