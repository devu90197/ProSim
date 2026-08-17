import React, { useEffect, useState } from 'react';
import type { IndustryItem } from '../types';
import { ArrowRight, CheckCircle2, FileText } from 'lucide-react';
import { Modal } from './ui/Modal';
import { MagneticButton } from './ui/MagneticButton';
import { Stagger, StaggerItem } from './ui/Reveal';

interface IndustryModalProps {
  industry: IndustryItem | null;
  onClose: () => void;
  onOpenConsultation: () => void;
}

export const IndustryModal: React.FC<IndustryModalProps> = ({
  industry,
  onClose,
  onOpenConsultation,
}) => {
  /**
   * Hold on to the last selected industry so the panel still has content to
   * render while it animates out — the prop drops to null the moment it closes.
   */
  const [shown, setShown] = useState<IndustryItem | null>(industry);

  useEffect(() => {
    if (industry) setShown(industry);
  }, [industry]);

  const data = industry ?? shown;

  return (
    <Modal
      isOpen={Boolean(industry)}
      onClose={onClose}
      title={data ? `${data.title} engineering capabilities` : 'Industry details'}
      className="max-w-3xl"
    >
      {data && (
        <>
          <div className="space-y-3 pr-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-3 py-0.5 font-mono text-xs font-bold text-cyan-800">
              <span>{data.category}</span>
            </div>
            <h3 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              {data.title}
            </h3>
            <p className="text-xs leading-relaxed text-slate-600 sm:text-sm">{data.fullDesc}</p>
          </div>

          <div className="mt-6 space-y-3 border-t border-slate-100 pt-6">
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-cyan-800">
              Technical Capabilities &amp; FEA/CFD Analysis
            </h4>
            <Stagger className="grid grid-cols-1 gap-2.5 sm:grid-cols-2" stagger={0.05}>
              {data.capabilities.map((cap) => (
                <StaggerItem key={cap}>
                  <div className="flex h-full items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3 transition-colors hover:border-cyan-300 hover:bg-cyan-50/60">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" />
                    <span className="text-xs font-medium text-slate-700">{cap}</span>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          <div className="mt-6 space-y-1.5 rounded-2xl border border-cyan-200 bg-cyan-50/80 p-4">
            <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase text-cyan-900">
              <FileText className="h-4 w-4 text-cyan-600" />
              <span>Representative Engineering Project</span>
            </div>
            <p className="text-xs leading-relaxed text-slate-700">{data.sampleProject}</p>
          </div>

          <div className="mt-6 flex flex-col items-center justify-between gap-4 border-t border-slate-100 pt-6 sm:flex-row">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="mr-1 font-mono text-[11px] text-slate-500">Standards:</span>
              {data.keyStandards.map((std) => (
                <span
                  key={std}
                  className="rounded border border-slate-200 bg-slate-100 px-2 py-0.5 font-mono text-[10px] font-medium text-slate-700"
                >
                  {std}
                </span>
              ))}
            </div>

            <MagneticButton
              type="button"
              onClick={() => {
                onClose();
                onOpenConsultation();
              }}
              className="flex w-full shrink-0 cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 via-teal-600 to-sky-600 px-5 py-2.5 text-xs font-bold tracking-wide text-white shadow-md shadow-cyan-500/20 transition-shadow hover:shadow-cyan-500/35 sm:w-auto"
            >
              <span>Request {data.title} Proposal</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </MagneticButton>
          </div>
        </>
      )}
    </Modal>
  );
};
