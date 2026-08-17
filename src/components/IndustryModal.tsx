import React from 'react';
import { IndustryItem } from '../types';
import { 
  X, 
  Atom, 
  Flame, 
  Droplets, 
  Layers, 
  Cpu, 
  Zap, 
  CheckCircle2, 
  ShieldCheck, 
  FileText, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface IndustryModalProps {
  industry: IndustryItem | null;
  onClose: () => void;
  onOpenConsultation: () => void;
}

export const IndustryModal: React.FC<IndustryModalProps> = ({ 
  industry, 
  onClose, 
  onOpenConsultation 
}) => {
  if (!industry) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-md transition-opacity"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-3xl rounded-3xl backdrop-blur-2xl bg-white/95 border border-slate-200 p-6 sm:p-8 shadow-2xl z-10 my-8 max-h-[90vh] overflow-y-auto"
        >
          {/* Top Sheen */}
          <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Modal Header */}
          <div className="space-y-3 pr-10">
            <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-cyan-50 text-cyan-800 text-xs font-mono font-bold border border-cyan-200">
              <span>{industry.category}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {industry.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              {industry.fullDesc}
            </p>
          </div>

          {/* Capabilities Grid */}
          <div className="mt-6 pt-6 border-t border-slate-100 space-y-3">
            <h4 className="text-xs font-bold uppercase font-mono tracking-wider text-cyan-800">
              Technical Capabilities & FEA/CFD Analysis
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {industry.capabilities.map((cap, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <span className="text-xs text-slate-700 font-medium">{cap}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Highlight Project */}
          <div className="mt-6 p-4 rounded-2xl bg-cyan-50/80 border border-cyan-200 space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-bold text-cyan-900 font-mono uppercase">
              <FileText className="w-4 h-4 text-cyan-600" />
              <span>Representative Engineering Project</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed font-normal">
              {industry.sampleProject}
            </p>
          </div>

          {/* Standards & Footer */}
          <div className="mt-6 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] text-slate-500 font-mono mr-1">Standards:</span>
              {industry.keyStandards.map((std, idx) => (
                <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 font-medium">
                  {std}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => {
                  onClose();
                  onOpenConsultation();
                }}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 via-teal-600 to-sky-600 text-white font-bold text-xs tracking-wide shadow-md shadow-cyan-500/20 hover:shadow-cyan-500/35 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Request {industry.title} Proposal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
