import React, { useEffect, useState } from 'react';
import type { JobOpening } from '../types';
import { Briefcase, CheckCircle2, Send } from 'lucide-react';
import { Modal } from './ui/Modal';
import { MagneticButton } from './ui/MagneticButton';
import { FIELD_CLASS, LABEL_CLASS, SUBMIT_CLASS } from './ui/formStyles';

interface JobApplyModalProps {
  job: JobOpening | null;
  onClose: () => void;
}

const EMPTY_FORM = {
  name: '',
  email: '',
  phone: '',
  experience: '',
  portfolioOrCv: '',
  notes: '',
};

export const JobApplyModal: React.FC<JobApplyModalProps> = ({ job, onClose }) => {
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Keep the last job around so the panel has content while animating out.
  const [shown, setShown] = useState<JobOpening | null>(job);

  useEffect(() => {
    if (job) setShown(job);
  }, [job]);

  // Clear the form after close, so the next opening starts fresh.
  useEffect(() => {
    if (job) return;
    const timer = window.setTimeout(() => {
      setFormData(EMPTY_FORM);
      setSubmitted(false);
      setLoading(false);
    }, 300);
    return () => window.clearTimeout(timer);
  }, [job]);

  const data = job ?? shown;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    // Placeholder for the real applicant-tracking endpoint.
    window.setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1000);
  };

  return (
    <Modal
      isOpen={Boolean(job)}
      onClose={onClose}
      title={data ? `Apply for ${data.title}` : 'Job application'}
    >
      {data &&
        (submitted ? (
          <div className="space-y-4 py-8 text-center">
            <div className="mx-auto h-14 w-14 rounded-2xl bg-gradient-to-tr from-cyan-600 to-teal-500 p-[1.5px] shadow-sm">
              <div className="flex h-full w-full items-center justify-center rounded-2xl bg-white">
                <CheckCircle2 className="h-7 w-7 text-cyan-600" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-slate-900">Application Successfully Submitted</h3>
            <p className="mx-auto max-w-sm text-xs leading-relaxed text-slate-600">
              Thank you for your interest in ProSIM. Our technical talent acquisition team will
              review your qualifications and contact you.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer rounded-xl border border-slate-200 bg-slate-100 px-5 py-2 text-xs font-semibold text-slate-800 transition-colors hover:bg-slate-200"
            >
              Close Window
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1 pr-6">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-cyan-200 bg-cyan-50 px-2.5 py-0.5 font-mono text-[10px] font-bold text-cyan-800">
                <Briefcase className="h-3 w-3 text-cyan-600" />
                <span>{data.department}</span>
              </div>
              <h3 className="text-xl font-black text-slate-900">Apply for {data.title}</h3>
              <p className="text-xs text-slate-500">
                {data.location} • {data.experience} • {data.type}
              </p>
            </div>

            <div>
              <label className={LABEL_CLASS} htmlFor="job-name">
                Full Name <span className="text-cyan-600">*</span>
              </label>
              <input
                id="job-name"
                type="text"
                required
                autoComplete="name"
                placeholder="e.g. Priya Sundaram"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={FIELD_CLASS}
              />
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label className={LABEL_CLASS} htmlFor="job-email">
                  Email Address <span className="text-cyan-600">*</span>
                </label>
                <input
                  id="job-email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="name@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={FIELD_CLASS}
                />
              </div>

              <div>
                <label className={LABEL_CLASS} htmlFor="job-phone">
                  Phone Number <span className="text-cyan-600">*</span>
                </label>
                <input
                  id="job-phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={FIELD_CLASS}
                />
              </div>
            </div>

            <div>
              <label className={LABEL_CLASS} htmlFor="job-experience">
                Total Years of Relevant FEA / CFD / Plant Experience
              </label>
              <input
                id="job-experience"
                type="text"
                placeholder="e.g. 6.5 Years with ANSYS & ASME Sec III"
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                className={FIELD_CLASS}
              />
            </div>

            <div>
              <label className={LABEL_CLASS} htmlFor="job-cv">
                Resume / LinkedIn Profile URL
              </label>
              <input
                id="job-cv"
                type="url"
                placeholder="https://linkedin.com/in/yourprofile"
                value={formData.portfolioOrCv}
                onChange={(e) => setFormData({ ...formData, portfolioOrCv: e.target.value })}
                className={FIELD_CLASS}
              />
            </div>

            <div>
              <label className={LABEL_CLASS} htmlFor="job-notes">
                Anything Else We Should Know?
              </label>
              <textarea
                id="job-notes"
                rows={2}
                placeholder="Notable projects, codes you've worked to, notice period…"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className={FIELD_CLASS}
              />
            </div>

            <MagneticButton type="submit" disabled={loading} className={SUBMIT_CLASS}>
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  <span>Submitting…</span>
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  <span>Submit Job Application</span>
                </>
              )}
            </MagneticButton>
          </form>
        ))}
    </Modal>
  );
};
