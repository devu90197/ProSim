/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useCallback, useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ClientsMarquee } from './components/ClientsMarquee';
import { StatsSection } from './components/StatsSection';
import { AboutSection } from './components/AboutSection';
import { PillarsSection } from './components/PillarsSection';
import { IndustriesSection } from './components/IndustriesSection';
import { ServicesSection } from './components/ServicesSection';
import { ProjectsSection } from './components/ProjectsSection';
import { CredentialsStrip } from './components/CredentialsStrip';
import { CareersSection } from './components/CareersSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { IndustryModal } from './components/IndustryModal';
import { ConsultationModal } from './components/ConsultationModal';
import { JobApplyModal } from './components/JobApplyModal';
import { BackToTop } from './components/ui/BackToTop';
import type { IndustryItem, JobOpening } from './types';

export default function App() {
  const [selectedIndustry, setSelectedIndustry] = useState<IndustryItem | null>(null);
  const [selectedJob, setSelectedJob] = useState<JobOpening | null>(null);
  const [consultationOpen, setConsultationOpen] = useState(false);

  // Stable identities keep the memoised sections from re-rendering on every
  // modal state change.
  const openConsultation = useCallback(() => setConsultationOpen(true), []);
  const closeConsultation = useCallback(() => setConsultationOpen(false), []);
  const closeIndustry = useCallback(() => setSelectedIndustry(null), []);
  const closeJob = useCallback(() => setSelectedJob(null), []);

  const openConsultationFromIndustry = useCallback(() => {
    setSelectedIndustry(null);
    setConsultationOpen(true);
  }, []);

  return (
    <div
      id="prosim-app-root"
      className="flex min-h-screen flex-col bg-slate-50 text-slate-900"
    >
      <Navbar onOpenConsultation={openConsultation} />

      {/*
       * `overflow-x-clip`, not `hidden`. Both stop sideways scroll, but
       * `hidden` makes this element a scroll container, which silently breaks
       * `position: sticky` for everything inside it. `clip` does not.
       */}
      <main className="w-full flex-1 overflow-x-clip">
        <Hero onOpenConsultation={openConsultation} />
        <ClientsMarquee />
        <StatsSection />
        <AboutSection onOpenConsultation={openConsultation} />
        <PillarsSection onOpenConsultation={openConsultation} />
        <IndustriesSection
          onSelectIndustry={setSelectedIndustry}
          onOpenConsultation={openConsultation}
        />
        <ServicesSection onOpenConsultation={openConsultation} />
        <ProjectsSection />
        <CredentialsStrip />
        <CareersSection onApplyJob={setSelectedJob} />
        <ContactSection />
      </main>

      <Footer onOpenConsultation={openConsultation} />

      <IndustryModal
        industry={selectedIndustry}
        onClose={closeIndustry}
        onOpenConsultation={openConsultationFromIndustry}
      />

      <ConsultationModal isOpen={consultationOpen} onClose={closeConsultation} />

      <JobApplyModal job={selectedJob} onClose={closeJob} />

      {/* Persistent floating scroll-to-top control, shown on every breakpoint. */}
      <BackToTop />
    </div>
  );
}
