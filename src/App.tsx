/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ClientsMarquee } from './components/ClientsMarquee';
import { StatsSection } from './components/StatsSection';
import { AboutSection } from './components/AboutSection';
import { IndustriesSection } from './components/IndustriesSection';
import { ServicesSection } from './components/ServicesSection';
import { ProjectsSection } from './components/ProjectsSection';
import { CareersSection } from './components/CareersSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { IndustryModal } from './components/IndustryModal';
import { ConsultationModal } from './components/ConsultationModal';
import { JobApplyModal } from './components/JobApplyModal';
import { IndustryItem, JobOpening } from './types';

export default function App() {
  const [selectedIndustry, setSelectedIndustry] = useState<IndustryItem | null>(null);
  const [selectedJob, setSelectedJob] = useState<JobOpening | null>(null);
  const [consultationModalOpen, setConsultationModalOpen] = useState(false);

  return (
    <div id="prosim-app-root" className="min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-cyan-500 selection:text-white">
      {/* Liquid Glass Pill Navigation with Hairline Top Break Line */}
      <Navbar onOpenConsultation={() => setConsultationModalOpen(true)} />

      {/* Main Content Sections */}
      <main className="flex-1 w-full overflow-x-hidden">
        {/* Full-Height Autoplay Industrial Video Hero Section with Direct Headline Overlay */}
        <Hero onOpenConsultation={() => setConsultationModalOpen(true)} />

        {/* 800+ Trusted Clients Infinite Marquee (Directly under Hero like Reference) */}
        <ClientsMarquee />

        {/* 3D Tilt Stats Section with Animated Count-Up Numbers */}
        <StatsSection />

        {/* About ProSIM Section with Multi-Discipline Engineering Statement */}
        <AboutSection onOpenConsultation={() => setConsultationModalOpen(true)} />

        {/* Industries We Serve with 3D Tilt Cards */}
        <IndustriesSection 
          onSelectIndustry={(industry) => setSelectedIndustry(industry)}
          onOpenConsultation={() => setConsultationModalOpen(true)}
        />

        {/* Services & Core Multi-Discipline Engineering Disciplines */}
        <ServicesSection onOpenConsultation={() => setConsultationModalOpen(true)} />

        {/* Case Studies & Proven Engineering Projects */}
        <ProjectsSection />

        {/* Careers & Engineering Opportunities */}
        <CareersSection onApplyJob={(job) => setSelectedJob(job)} />

        {/* Contact & Technical Consultation RFP Form */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer onOpenConsultation={() => setConsultationModalOpen(true)} />

      {/* Modals */}
      <IndustryModal 
        industry={selectedIndustry} 
        onClose={() => setSelectedIndustry(null)}
        onOpenConsultation={() => {
          setSelectedIndustry(null);
          setConsultationModalOpen(true);
        }}
      />

      <ConsultationModal 
        isOpen={consultationModalOpen} 
        onClose={() => setConsultationModalOpen(false)} 
      />

      <JobApplyModal 
        job={selectedJob} 
        onClose={() => setSelectedJob(null)} 
      />
    </div>
  );
}
