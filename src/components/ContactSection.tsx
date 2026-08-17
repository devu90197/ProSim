import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle2, 
  Sparkles, 
  UploadCloud, 
  ShieldCheck, 
  Clock, 
  Building2,
  FileText
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    company: '',
    industry: 'Nuclear Power',
    service: 'Finite Element Analysis (FEA)',
    timeline: 'Immediate (< 1 Month)',
    message: '',
    fileName: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setTicketId(`PS-ENG-${Math.floor(100000 + Math.random() * 900000)}`);
    }, 1200);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, fileName: e.target.files[0].name });
    }
  };

  return (
    <section id="contact" className="relative py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Glow Ambience */}
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-cyan-400/10 blur-[150px] pointer-events-none" />
      <div className="absolute top-10 left-10 w-96 h-96 rounded-full bg-teal-400/10 blur-[150px] pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-bold uppercase tracking-wider font-mono shadow-xs">
          <Mail className="w-3.5 h-3.5 text-cyan-600" />
          <span>Connect with Our Technical Specialists</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
          Initiate an <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-teal-600 to-sky-600">Engineering Inquiry</span>
        </h2>
        <p className="text-sm sm:text-base text-slate-600">
          Reach out for project sizing, finite element simulation bids, seismic qualification studies, or multidisciplinary plant design.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Office Details & Direct Coordinates */}
        <div className="lg:col-span-5 space-y-6">
          {/* Main Coordinates Panel */}
          <div className="p-7 rounded-3xl backdrop-blur-2xl bg-white/85 border border-slate-200 shadow-xl space-y-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

            <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-900 tracking-tight">Global Engineering Headquarters</h3>
              <p className="text-xs text-slate-500">ProSIM R&D Center & Delivery Campus</p>
            </div>

            <div className="space-y-4 text-xs text-slate-600">
              <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-slate-50/80 border border-slate-200">
                <MapPin className="w-5 h-5 text-cyan-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 block mb-0.5">Corporate & Technical Center</span>
                  <span>ProSIM R&D Center, #39, 1st Main, Industrial Suburb, Yeshwanthpur, Bengaluru - 560022, Karnataka, India</span>
                </div>
              </div>

              <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-slate-50/80 border border-slate-200">
                <Phone className="w-5 h-5 text-teal-600 shrink-0" />
                <div>
                  <span className="font-bold text-slate-900 block mb-0.5">Direct Engineering Desk</span>
                  <a href="tel:+918023477000" className="text-cyan-700 font-semibold hover:underline">+91 (080) 2347-7000 / 7001</a>
                </div>
              </div>

              <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-slate-50/80 border border-slate-200">
                <Mail className="w-5 h-5 text-sky-600 shrink-0" />
                <div>
                  <span className="font-bold text-slate-900 block mb-0.5">Technical Inquiries</span>
                  <a href="mailto:info@prosim.co.in" className="text-cyan-700 font-semibold hover:underline">info@prosim.co.in / projects@prosim.co.in</a>
                </div>
              </div>

              <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-slate-50/80 border border-slate-200">
                <Clock className="w-5 h-5 text-indigo-600 shrink-0" />
                <div>
                  <span className="font-bold text-slate-900 block mb-0.5">Operational Hours</span>
                  <span>Monday – Friday: 09:00 AM – 06:30 PM (IST)</span>
                </div>
              </div>
            </div>

            {/* NDA & Security Assurance */}
            <div className="p-4 rounded-2xl bg-cyan-50/80 border border-cyan-200 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-cyan-600 shrink-0 mt-0.5" />
              <div className="text-[11px] text-slate-700 leading-relaxed">
                <span className="font-bold text-cyan-900 block mb-0.5">Strict Confidentiality & NDA Assurance</span>
                All proprietary CAD models, stress reports, and client data are protected under bilateral NDAs with ISO-27001 encrypted infrastructure.
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Liquid Glass RFP Form */}
        <div className="lg:col-span-7">
          <div className="p-7 sm:p-8 rounded-3xl backdrop-blur-2xl bg-white/90 border border-slate-200 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-teal-500/50 to-transparent" />

            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-600 to-teal-500 p-[1.5px] mx-auto shadow-md shadow-cyan-500/20">
                  <div className="w-full h-full bg-white rounded-2xl flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-cyan-600" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Inquiry Successfully Registered!</h3>
                <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="text-cyan-700 font-bold">{formData.fullName}</span>. Your engineering project inquiry has been assigned Reference ID:
                </p>
                <div className="inline-block px-4 py-2 rounded-xl bg-cyan-50 border border-cyan-200 text-cyan-800 font-mono text-sm font-bold shadow-xs">
                  {ticketId}
                </div>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  A Senior Multi-Discipline Engineering Lead will review your technical specifications and contact you within 24 business hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      fullName: '',
                      email: '',
                      company: '',
                      industry: 'Nuclear Power',
                      service: 'Finite Element Analysis (FEA)',
                      timeline: 'Immediate (< 1 Month)',
                      message: '',
                      fileName: ''
                    });
                  }}
                  className="mt-4 px-6 py-2.5 rounded-xl bg-slate-100 text-slate-800 text-xs font-semibold hover:bg-slate-200 transition-colors cursor-pointer border border-slate-200"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-slate-900">Request Technical Consultation / RFP</h3>
                  <p className="text-xs text-slate-500">Fill in the project scope below to receive a feasibility and cost assessment.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Full Name <span className="text-cyan-600">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Rajesh Sharma"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:bg-white focus:ring-1 focus:ring-cyan-500 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Work Email <span className="text-cyan-600">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. r.sharma@energycorp.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:bg-white focus:ring-1 focus:ring-cyan-500 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Company / Organization <span className="text-cyan-600">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Larsen & Toubro / NPCIL"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:bg-white focus:ring-1 focus:ring-cyan-500 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Industry Domain
                    </label>
                    <select
                      value={formData.industry}
                      onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-cyan-500 focus:bg-white focus:ring-1 focus:ring-cyan-500 transition-all"
                    >
                      <option>Nuclear Power</option>
                      <option>Thermal Energy</option>
                      <option>Oil & Gas</option>
                      <option>Petrochemical Engineering</option>
                      <option>Industrial & Heavy Engineering</option>
                      <option>Power & Utilities</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Primary Service Discipline
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-cyan-500 focus:bg-white focus:ring-1 focus:ring-cyan-500 transition-all"
                    >
                      <option>Finite Element Analysis (FEA)</option>
                      <option>Computational Fluid Dynamics (CFD)</option>
                      <option>Piping Stress & Surge Analysis</option>
                      <option>Plant Engineering & 3D Modeling</option>
                      <option>Fitness-For-Service (API 579)</option>
                      <option>Digital Twin & Life Extension</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Target Project Timeline
                    </label>
                    <select
                      value={formData.timeline}
                      onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-cyan-500 focus:bg-white focus:ring-1 focus:ring-cyan-500 transition-all"
                    >
                      <option>Immediate (&lt; 1 Month)</option>
                      <option>1 – 3 Months</option>
                      <option>3 – 6 Months</option>
                      <option>Budgetary / Future FEED Phase</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Technical Scope Details / Load Conditions
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Briefly describe geometry, operating temperature/pressure, applicable codes (ASME, RCC-M, etc.), and simulation goals..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:bg-white focus:ring-1 focus:ring-cyan-500 transition-all"
                  />
                </div>

                {/* File Attachment */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Attach Specs / 3D CAD / RFP Document (Optional)
                  </label>
                  <label className="flex items-center justify-center gap-2 p-3 rounded-xl border border-dashed border-slate-300 bg-slate-50 hover:bg-slate-100 hover:border-cyan-500 transition-all cursor-pointer">
                    <UploadCloud className="w-4 h-4 text-cyan-600" />
                    <span className="text-xs text-slate-600">
                      {formData.fileName ? formData.fileName : 'Upload PDF, STEP, IGES, or ZIP (Max 50MB)'}
                    </span>
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleFileUpload}
                      accept=".pdf,.doc,.docx,.step,.stp,.iges,.igs,.zip,.rar"
                    />
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-6 rounded-xl font-bold text-xs tracking-wide bg-gradient-to-r from-cyan-600 via-teal-600 to-sky-600 text-white shadow-md shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
                      <span>Processing Technical Dispatch...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Engineering Request</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
