import React, { useRef, useEffect } from 'react';
import { HERO_DATA } from '../data/prosimData';
import { 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  ChevronDown,
  Atom,
  Layers,
  Activity,
  Cpu,
  Flame,
  CheckCircle2,
  Play
} from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  onOpenConsultation: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenConsultation }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Continuous uninterrupted video autoplay
    const startPlayback = () => {
      if (videoRef.current) {
        videoRef.current.muted = true;
        videoRef.current.defaultMuted = true;
        videoRef.current.play().catch(() => {
          const forcePlayOnGesture = () => {
            if (videoRef.current) {
              videoRef.current.muted = true;
              videoRef.current.play().catch(() => {});
            }
            window.removeEventListener('click', forcePlayOnGesture);
            window.removeEventListener('touchstart', forcePlayOnGesture);
            window.removeEventListener('scroll', forcePlayOnGesture);
          };
          window.addEventListener('click', forcePlayOnGesture, { once: true });
          window.addEventListener('touchstart', forcePlayOnGesture, { once: true });
          window.addEventListener('scroll', forcePlayOnGesture, { once: true });
        });
      }
    };

    startPlayback();

    // Heartbeat check: guarantee video is playing and never stuck
    const interval = setInterval(() => {
      if (videoRef.current && videoRef.current.paused) {
        videoRef.current.play().catch(() => {});
      }
    }, 1500);

    const handleVisibility = () => {
      if (!document.hidden && videoRef.current) {
        videoRef.current.play().catch(() => {});
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);
    window.addEventListener('focus', startPlayback);

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('focus', startPlayback);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="home" className="w-full flex flex-col bg-slate-950">
      
      {/* 1. TOP VIDEO STAGE (Transparent Top Nav sits upon this; Video plays clearly 100% unobscured) */}
      <section className="relative w-full h-[52vh] min-h-[380px] max-h-[640px] sm:h-[60vh] overflow-hidden flex flex-col justify-between">
        
        {/* Full-bleed crisp continuous autoplaying industrial video */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          onEnded={(e) => {
            e.currentTarget.currentTime = 0;
            e.currentTarget.play().catch(() => {});
          }}
          onPause={(e) => {
            e.currentTarget.play().catch(() => {});
          }}
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
          poster="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=2000&q=80"
        >
          <source src="/videos/refinery-hero.mp4" type="video/mp4" />
          <source src="/videos/refinery-pipes.mp4" type="video/mp4" />
          <source
            src="https://videos.pexels.com/video-files/3195394/3195394-hd_1920_1080_25fps.mp4"
            type="video/mp4"
          />
        </video>

        {/* Subtle Bottom Vignette Gradient to smoothly blend into the lower content panel */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-transparent to-slate-950 pointer-events-none" />
        
        {/* Clean top spacing for floating transparent navbar */}
        <div className="w-full h-20 sm:h-24 relative z-10 pointer-events-none" />

        {/* Discrete Live Video Badge overlay inside the video area */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-4 flex items-center justify-between pointer-events-none">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full backdrop-blur-md bg-slate-950/60 border border-white/20 text-cyan-300 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold tracking-wide">LIVE INDUSTRIAL ENERGY & REFINERY</span>
          </div>

          <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full backdrop-blur-md bg-slate-950/60 border border-white/15 text-slate-300 text-xs font-mono">
            <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
            <span>35+ Years Proven Engineering</span>
          </div>
        </div>
      </section>

      {/* 2. SEGREGATED LOWER CONTENT SECTION (Clean, readable, structured, not mixing on video) */}
      <section className="relative w-full bg-slate-950 border-t border-white/10 pt-8 pb-10 sm:pb-14">
        {/* Ambient background glow accents */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Main Headline & Compact Overview Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content (7 cols): Clean Typography & CTAs */}
            <div className="lg:col-span-7 flex flex-col items-start space-y-4">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold tracking-wider">
                <span>PROSIM • MULTIDISCIPLINARY ENGINEERING & R&D</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-5xl font-black tracking-tight text-white leading-tight">
                Design Engineering With{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-teal-300 to-emerald-300">
                  Delivery Excellence
                </span>
              </h1>

              <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed max-w-2xl">
                Developing comprehensive multidisciplinary engineering packages, advanced FEA/CFD simulations, and structural life assessments for global energy and industrial leaders.
              </p>

              {/* Engineering Focus Chips */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                {[
                  { label: 'Nuclear Code Qualification', icon: Atom },
                  { label: 'FEA & Non-Linear Mechanics', icon: Layers },
                  { label: 'Computational Fluid Dynamics', icon: Activity },
                  { label: 'Piping & Surge Simulation', icon: Cpu }
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 border border-white/10 text-slate-200 text-xs font-medium"
                    >
                      <Icon className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{item.label}</span>
                    </div>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-3 w-full sm:w-auto">
                <button
                  id="hero-explore-btn"
                  onClick={() => scrollToSection('industries')}
                  className="px-6 py-3 rounded-xl font-bold text-sm tracking-wide bg-gradient-to-r from-cyan-500 to-teal-500 text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Explore Industries</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  id="hero-consultation-btn"
                  onClick={onOpenConsultation}
                  className="px-6 py-3 rounded-xl font-bold text-sm text-slate-200 bg-slate-900 hover:bg-slate-800 border border-white/20 hover:border-white/40 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span>Request Consultation</span>
                </button>
              </div>
            </div>

            {/* Right Content (5 cols): Key Highlights Bento Cards */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-3.5">
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-white/10 flex flex-col justify-between">
                <div className="w-8 h-8 rounded-xl bg-cyan-950 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-2">
                  <Atom className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xl font-bold text-white">ASME & RCC-M</div>
                  <div className="text-xs text-slate-400 mt-0.5">Nuclear Class 1, 2, 3 Code Verification</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/90 border border-white/10 flex flex-col justify-between">
                <div className="w-8 h-8 rounded-xl bg-teal-950 border border-teal-500/30 flex items-center justify-center text-teal-400 mb-2">
                  <Flame className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xl font-bold text-white">API 579 / FFS</div>
                  <div className="text-xs text-slate-400 mt-0.5">Fitness-For-Service & Remaining Life (RLA)</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/90 border border-white/10 flex flex-col justify-between">
                <div className="w-8 h-8 rounded-xl bg-sky-950 border border-sky-500/30 flex items-center justify-center text-sky-400 mb-2">
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xl font-bold text-white">High-Fidelity CFD</div>
                  <div className="text-xs text-slate-400 mt-0.5">Thermal Hydraulics & Vortex Shedding</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/90 border border-white/10 flex flex-col justify-between">
                <div className="w-8 h-8 rounded-xl bg-emerald-950 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-2">
                  <Cpu className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xl font-bold text-white">Digital Twin</div>
                  <div className="text-xs text-slate-400 mt-0.5">Asset Health Monitoring & Simulation</div>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Capabilities Ticker */}
          <div className="mt-8 rounded-xl p-3 bg-slate-900 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-slate-300">
            <div className="flex items-center gap-2 text-cyan-400 font-bold uppercase tracking-wider font-mono shrink-0">
              <ShieldCheck className="w-4 h-4 text-teal-400" />
              <span>Engineering Capabilities</span>
            </div>

            <div className="overflow-hidden w-full">
              <div className="animate-marquee whitespace-nowrap flex gap-8 items-center text-slate-200 font-medium">
                {HERO_DATA.tickerItems.map((item, idx) => (
                  <span key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                    <span>{item}</span>
                  </span>
                ))}
                {HERO_DATA.tickerItems.map((item, idx) => (
                  <span key={`dup-${idx}`} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                    <span>{item}</span>
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => scrollToSection('clients')}
              className="hidden md:flex items-center gap-1 text-cyan-300 hover:text-white transition-colors shrink-0 font-bold cursor-pointer"
            >
              <span>Clients</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </section>

    </div>
  );
};
