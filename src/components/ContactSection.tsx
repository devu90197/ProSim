import React, { useState } from 'react';
import {
  CheckCircle2,
  Clock,
  Mail,
  MapPin,
  Navigation,
  Phone,
  Send,
  ShieldCheck,
  UploadCloud,
} from 'lucide-react';
import { SECTOR_OPTIONS, SERVICE_OPTIONS, TIMELINE_OPTIONS } from '../data/prosimData';
import { MagneticButton } from './ui/MagneticButton';
import { FIELD_CLASS, LABEL_CLASS, SUBMIT_CLASS } from './ui/formStyles';
import { Reveal } from './ui/Reveal';

/** Matches the limit advertised in the upload control's helper text. */
const MAX_UPLOAD_BYTES = 50 * 1024 * 1024;

/** Single source of truth for the HQ address — shown on screen and sent to maps. */
const HQ_ADDRESS =
  'ProSIM R&D Center, #39, 1st Main, Industrial Suburb, Yeshwanthpur, Bengaluru - 560022, Karnataka, India';

/**
 * Opens turn-by-turn directions in whatever mapping app the device prefers.
 *
 * Apple platforms get a maps.apple.com link, which hands off to the built-in
 * Maps app; everywhere else gets the Google Maps universal URL, which opens
 * the native app when it is installed and falls back to the web map when it is
 * not. The destination is passed as the address string rather than hard-coded
 * coordinates, so the map geocodes the same address shown on the page.
 */
const openDirections = () => {
  const destination = encodeURIComponent(HQ_ADDRESS);

  // iPadOS 13+ reports itself as "Macintosh", which lands on Apple Maps either way.
  const isApplePlatform = /iPad|iPhone|iPod|Macintosh/.test(navigator.userAgent);

  const url = isApplePlatform
    ? `https://maps.apple.com/?daddr=${destination}`
    : `https://www.google.com/maps/dir/?api=1&destination=${destination}`;

  window.open(url, '_blank', 'noopener,noreferrer');
};

const EMPTY_FORM = {
  fullName: '',
  email: '',
  company: '',
  industry: SECTOR_OPTIONS[0],
  service: SERVICE_OPTIONS[0],
  timeline: TIMELINE_OPTIONS[0],
  message: '',
  fileName: '',
};

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');
  const [fileError, setFileError] = useState('');
  // Retained separately so the success screen still greets the sender after
  // the form itself has been cleared.
  const [submittedName, setSubmittedName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    // Placeholder for the real RFP intake endpoint.
    window.setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedName(formData.fullName);
      setTicketId(`PS-ENG-${Math.floor(100000 + Math.random() * 900000)}`);
      setSubmitted(true);
    }, 1200);
  };

  /**
   * The control advertises a 50MB ceiling but never enforced it, so an
   * oversized file was accepted silently and would only fail server-side.
   */
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_UPLOAD_BYTES) {
      setFileError(
        `"${file.name}" is ${(file.size / 1024 / 1024).toFixed(1)}MB — the limit is 50MB.`,
      );
      setFormData((prev) => ({ ...prev, fileName: '' }));
      e.target.value = '';
      return;
    }

    setFileError('');
    setFormData((prev) => ({ ...prev, fileName: file.name }));
  };

  const resetForm = () => {
    setSubmitted(false);
    setFormData(EMPTY_FORM);
    setFileError('');
    setTicketId('');
    setSubmittedName('');
  };

  return (
    <section id="contact" className="relative page-shell py-20 sm:py-28 ">
      <div className="animate-float-slow pointer-events-none absolute bottom-10 right-10 h-96 w-96 rounded-full bg-cyan-400/10 blur-[150px]" />
      <div className="animate-float-slow pointer-events-none absolute left-10 top-10 h-96 w-96 rounded-full bg-teal-400/10 blur-[150px]" />

      <Reveal className="mx-auto mb-12 max-w-3xl space-y-3 text-center sm:mb-16">
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-3.5 py-1 font-mono text-xs font-bold uppercase tracking-wider text-cyan-800 shadow-xs">
          <Mail className="h-3.5 w-3.5 text-cyan-600" aria-hidden />
          <span>Connect with Our Technical Specialists</span>
        </div>
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
          Initiate an{' '}
          <span className="bg-gradient-to-r from-cyan-600 via-teal-600 to-sky-600 bg-clip-text text-transparent">
            Engineering Inquiry
          </span>
        </h2>
        <p className="text-sm text-slate-600 sm:text-base">
          Reach out for project sizing, finite element simulation bids, seismic qualification
          studies, or multidisciplinary plant design.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
        {/* Contact coordinates */}
        <Reveal className="space-y-6 lg:col-span-5" direction="right">
          <div className="relative space-y-6 overflow-hidden rounded-3xl border border-slate-200 bg-white/85 p-7 shadow-xl backdrop-blur-2xl">
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"
            />

            <div className="space-y-1">
              <h3 className="text-lg font-bold tracking-tight text-slate-900">
                Global Engineering Headquarters
              </h3>
              <p className="text-xs text-slate-500">ProSIM R&amp;D Center &amp; Delivery Campus</p>
            </div>

            <div className="space-y-4 text-xs text-slate-600">
              <div className="flex items-start gap-3.5 rounded-2xl border border-slate-200 bg-slate-50/80 p-3 transition-colors hover:border-cyan-300">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-cyan-600" aria-hidden />
                {/*
                 * The address is a block-level paragraph and the button sits in
                 * its own row beneath it. Both matter: as an inline span the
                 * address let the button wrap onto the same line, where a top
                 * margin on an inline-flex element overlaps the text instead of
                 * pushing it clear.
                 */}
                <div className="min-w-0 flex-1">
                  <span className="mb-0.5 block font-bold text-slate-900">
                    Corporate &amp; Technical Center
                  </span>
                  <p className="leading-relaxed">{HQ_ADDRESS}</p>

                  <div className="mt-3.5">
                    <MagneticButton
                      type="button"
                      onClick={openDirections}
                      aria-label="Get directions to the ProSIM headquarters — opens your maps app"
                      className="inline-flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-cyan-200 bg-white px-3 py-2 text-[11px] font-bold text-cyan-700 shadow-xs transition-colors hover:border-cyan-500 hover:bg-cyan-50 sm:w-auto sm:py-1.5"
                    >
                      <Navigation className="h-3.5 w-3.5 shrink-0" aria-hidden />
                      <span>Get Directions</span>
                    </MagneticButton>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3.5 rounded-2xl border border-slate-200 bg-slate-50/80 p-3 transition-colors hover:border-cyan-300">
                <Phone className="h-5 w-5 shrink-0 text-teal-600" aria-hidden />
                <div>
                  <span className="mb-0.5 block font-bold text-slate-900">
                    Direct Engineering Desk
                  </span>
                  <a
                    href="tel:+918023477000"
                    className="font-semibold text-cyan-700 hover:underline"
                  >
                    +91 (080) 2347-7000 / 7001
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3.5 rounded-2xl border border-slate-200 bg-slate-50/80 p-3 transition-colors hover:border-cyan-300">
                <Mail className="h-5 w-5 shrink-0 text-sky-600" aria-hidden />
                <div>
                  <span className="mb-0.5 block font-bold text-slate-900">Technical Inquiries</span>
                  <a
                    href="mailto:info@prosim.co.in"
                    className="font-semibold text-cyan-700 hover:underline"
                  >
                    info@prosim.co.in
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3.5 rounded-2xl border border-slate-200 bg-slate-50/80 p-3 transition-colors hover:border-cyan-300">
                <Clock className="h-5 w-5 shrink-0 text-indigo-600" aria-hidden />
                <div>
                  <span className="mb-0.5 block font-bold text-slate-900">Operational Hours</span>
                  <span>Monday – Friday: 09:00 AM – 06:30 PM (IST)</span>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-2xl border border-cyan-200 bg-cyan-50/80 p-4">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-cyan-600" aria-hidden />
              <div className="text-[11px] leading-relaxed text-slate-700">
                <span className="mb-0.5 block font-bold text-cyan-900">
                  Strict Confidentiality &amp; NDA Assurance
                </span>
                All proprietary CAD models, stress reports, and client data are protected under
                bilateral NDAs with ISO-27001 encrypted infrastructure.
              </div>
            </div>
          </div>
        </Reveal>

        {/* RFP form */}
        <Reveal className="lg:col-span-7" direction="left" delay={0.12}>
          <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white/90 p-7 shadow-xl backdrop-blur-2xl sm:p-8">
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-teal-500/50 to-transparent"
            />

            {submitted ? (
              <div className="space-y-4 py-12 text-center">
                <div className="mx-auto h-16 w-16 rounded-2xl bg-gradient-to-tr from-cyan-600 to-teal-500 p-[1.5px] shadow-md shadow-cyan-500/20">
                  <div className="flex h-full w-full items-center justify-center rounded-2xl bg-white">
                    <CheckCircle2 className="h-8 w-8 text-cyan-600" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-slate-900">
                  Inquiry Successfully Registered
                </h3>
                <p className="mx-auto max-w-md text-xs leading-relaxed text-slate-600">
                  Thank you, <span className="font-bold text-cyan-700">{submittedName}</span>. Your
                  engineering project inquiry has been assigned Reference ID:
                </p>
                <div className="inline-block rounded-xl border border-cyan-200 bg-cyan-50 px-4 py-2 font-mono text-sm font-bold text-cyan-800 shadow-xs">
                  {ticketId}
                </div>
                <p className="mx-auto max-w-md text-xs text-slate-500">
                  A Senior Multi-Discipline Engineering Lead will review your technical
                  specifications and contact you within 24 business hours.
                </p>
                <button
                  type="button"
                  onClick={resetForm}
                  className="mt-4 cursor-pointer rounded-xl border border-slate-200 bg-slate-100 px-6 py-2.5 text-xs font-semibold text-slate-800 transition-colors hover:bg-slate-200"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-slate-900">
                    Request Technical Consultation / RFP
                  </h3>
                  <p className="text-xs text-slate-500">
                    Fill in the project scope below to receive a feasibility and cost assessment.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className={LABEL_CLASS} htmlFor="contact-name">
                      Full Name <span className="text-cyan-600">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      autoComplete="name"
                      placeholder="e.g. Dr. Rajesh Sharma"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className={FIELD_CLASS}
                    />
                  </div>

                  <div>
                    <label className={LABEL_CLASS} htmlFor="contact-email">
                      Work Email <span className="text-cyan-600">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="e.g. r.sharma@energycorp.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={FIELD_CLASS}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className={LABEL_CLASS} htmlFor="contact-company">
                      Company / Organization <span className="text-cyan-600">*</span>
                    </label>
                    <input
                      id="contact-company"
                      type="text"
                      required
                      autoComplete="organization"
                      placeholder="e.g. Larsen & Toubro / NPCIL"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className={FIELD_CLASS}
                    />
                  </div>

                  <div>
                    <label className={LABEL_CLASS} htmlFor="contact-industry">
                      Industry Domain
                    </label>
                    <select
                      id="contact-industry"
                      value={formData.industry}
                      onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                      className={FIELD_CLASS}
                    >
                      {SECTOR_OPTIONS.map((option) => (
                        <option key={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className={LABEL_CLASS} htmlFor="contact-service">
                      Primary Service Discipline
                    </label>
                    <select
                      id="contact-service"
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className={FIELD_CLASS}
                    >
                      {SERVICE_OPTIONS.map((option) => (
                        <option key={option}>{option}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className={LABEL_CLASS} htmlFor="contact-timeline">
                      Target Project Timeline
                    </label>
                    <select
                      id="contact-timeline"
                      value={formData.timeline}
                      onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                      className={FIELD_CLASS}
                    >
                      {TIMELINE_OPTIONS.map((option) => (
                        <option key={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className={LABEL_CLASS} htmlFor="contact-message">
                    Technical Scope Details / Load Conditions
                  </label>
                  <textarea
                    id="contact-message"
                    rows={3}
                    placeholder="Briefly describe geometry, operating temperature/pressure, applicable codes (ASME, RCC-M, etc.), and simulation goals..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={FIELD_CLASS}
                  />
                </div>

                <div>
                  <label className={LABEL_CLASS} htmlFor="contact-file">
                    Attach Specs / 3D CAD / RFP Document (Optional)
                  </label>
                  <label
                    htmlFor="contact-file"
                    className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-3 transition-all hover:border-cyan-500 hover:bg-slate-100"
                  >
                    <UploadCloud className="h-4 w-4 text-cyan-600" aria-hidden />
                    <span className="text-xs text-slate-600">
                      {formData.fileName || 'Upload PDF, STEP, IGES, or ZIP (Max 50MB)'}
                    </span>
                    <input
                      id="contact-file"
                      type="file"
                      className="hidden"
                      onChange={handleFileUpload}
                      accept=".pdf,.doc,.docx,.step,.stp,.iges,.igs,.zip,.rar"
                    />
                  </label>
                  {fileError && (
                    <p role="alert" className="mt-1.5 text-[11px] font-semibold text-red-600">
                      {fileError}
                    </p>
                  )}
                </div>

                <MagneticButton type="submit" disabled={isSubmitting} className={SUBMIT_CLASS}>
                  {isSubmitting ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      <span>Processing Technical Dispatch…</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>Submit Engineering Request</span>
                    </>
                  )}
                </MagneticButton>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
};
