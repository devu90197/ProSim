import React, { useEffect, useState } from 'react';
import { CheckCircle2, Send, Sparkles } from 'lucide-react';
import { Modal } from './ui/Modal';
import { MagneticButton } from './ui/MagneticButton';
import { FIELD_CLASS, LABEL_CLASS, SUBMIT_CLASS } from './ui/formStyles';
import { SECTOR_OPTIONS } from '../data/prosimData';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EMPTY_FORM = {
  name: '',
  email: '',
  company: '',
  sector: SECTOR_OPTIONS[0],
  projectOverview: '',
};

export const ConsultationModal: React.FC<ConsultationModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  /**
   * Reset once the modal is fully closed. Previously the success screen and
   * the typed values survived a close/reopen cycle unless you happened to
   * dismiss via the confirmation button.
   */
  useEffect(() => {
    if (isOpen) return;
    const timer = window.setTimeout(() => {
      setFormData(EMPTY_FORM);
      setSubmitted(false);
      setLoading(false);
    }, 300);
    return () => window.clearTimeout(timer);
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    // Placeholder for the real submission endpoint.
    window.setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1000);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Request an engineering consultation">
      {submitted ? (
        <div className="space-y-4 py-8 text-center">
          <div className="mx-auto h-14 w-14 rounded-2xl bg-gradient-to-tr from-cyan-600 to-teal-500 p-[1.5px] shadow-sm">
            <div className="flex h-full w-full items-center justify-center rounded-2xl bg-white">
              <CheckCircle2 className="h-7 w-7 text-cyan-600" />
            </div>
          </div>
          <h3 className="text-xl font-bold text-slate-900">Consultation Request Dispatched</h3>
          <p className="mx-auto max-w-sm text-xs leading-relaxed text-slate-600">
            Thank you. A ProSIM Engineering Director will review your project parameters and
            schedule an exploratory technical call.
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
              <Sparkles className="h-3 w-3 text-cyan-600" />
              <span>Fast-Track Engineering Advisory</span>
            </div>
            <h3 className="text-xl font-black text-slate-900">Request Engineering Consultation</h3>
            <p className="text-xs text-slate-500">
              Directly connect with our ASME &amp; RCC-M simulation specialists.
            </p>
          </div>

          <div>
            <label className={LABEL_CLASS} htmlFor="consult-name">
              Your Full Name <span className="text-cyan-600">*</span>
            </label>
            <input
              id="consult-name"
              type="text"
              required
              autoComplete="name"
              placeholder="e.g. Dr. Anil Kulkarni"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={FIELD_CLASS}
            />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className={LABEL_CLASS} htmlFor="consult-email">
                Corporate Email <span className="text-cyan-600">*</span>
              </label>
              <input
                id="consult-email"
                type="email"
                required
                autoComplete="email"
                placeholder="name@organization.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={FIELD_CLASS}
              />
            </div>

            <div>
              <label className={LABEL_CLASS} htmlFor="consult-company">
                Company / Organization <span className="text-cyan-600">*</span>
              </label>
              <input
                id="consult-company"
                type="text"
                required
                autoComplete="organization"
                placeholder="e.g. L&T Heavy Engineering"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className={FIELD_CLASS}
              />
            </div>
          </div>

          <div>
            <label className={LABEL_CLASS} htmlFor="consult-sector">
              Primary Sector
            </label>
            <select
              id="consult-sector"
              value={formData.sector}
              onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
              className={FIELD_CLASS}
            >
              {SECTOR_OPTIONS.map((sector) => (
                <option key={sector}>{sector}</option>
              ))}
            </select>
          </div>

          <div>
            <label className={LABEL_CLASS} htmlFor="consult-overview">
              Brief Technical Challenge / Goals
            </label>
            <textarea
              id="consult-overview"
              rows={2}
              placeholder="e.g., Seismic qualification of RPV piping or API 579 Level 3 remaining life assessment..."
              value={formData.projectOverview}
              onChange={(e) => setFormData({ ...formData, projectOverview: e.target.value })}
              className={FIELD_CLASS}
            />
          </div>

          <MagneticButton type="submit" disabled={loading} className={SUBMIT_CLASS}>
            {loading ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                <span>Dispatching…</span>
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                <span>Submit Consultation Request</span>
              </>
            )}
          </MagneticButton>
        </form>
      )}
    </Modal>
  );
};
