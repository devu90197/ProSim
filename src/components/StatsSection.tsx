import React, { useState, useEffect, useRef } from 'react';
import { STATS_DATA } from '../data/prosimData';
import { TiltCard } from './TiltCard';
import { Briefcase, Award, Users2, Clock, TrendingUp, CheckCircle2 } from 'lucide-react';
import { motion, useInView } from 'motion/react';

interface AnimatedCounterProps {
  value: number;
  suffix: string;
  inView: boolean;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ value, suffix, inView }) => {
  const [displayCount, setDisplayCount] = useState(0);

  useEffect(() => {
    if (!inView) {
      setDisplayCount(0);
      return;
    }

    let start = 0;
    const end = value;
    const duration = 1800; // ms
    const frameRate = 1000 / 60;
    const totalFrames = Math.round(duration / frameRate);
    let frame = 0;

    const timer = setInterval(() => {
      frame++;
      // Ease out cubic
      const progress = frame / totalFrames;
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(easeOut * end);

      setDisplayCount(current);

      if (frame >= totalFrames) {
        setDisplayCount(end);
        clearInterval(timer);
      }
    }, frameRate);

    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span className="font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-950 via-cyan-800 to-teal-700 font-mono">
      {displayCount.toLocaleString()}{suffix}
    </span>
  );
};

export const StatsSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.25 });

  const getStatIcon = (id: string) => {
    switch (id) {
      case 'stat-projects':
        return <Briefcase className="w-6 h-6 text-cyan-600" />;
      case 'stat-years':
        return <Award className="w-6 h-6 text-teal-600" />;
      case 'stat-customers':
        return <Users2 className="w-6 h-6 text-sky-600" />;
      case 'stat-hours':
        return <Clock className="w-6 h-6 text-indigo-600" />;
      default:
        return <TrendingUp className="w-6 h-6 text-cyan-600" />;
    }
  };

  const getGlowColor = (id: string): 'cyan' | 'indigo' | 'emerald' | 'amber' => {
    switch (id) {
      case 'stat-projects':
        return 'cyan';
      case 'stat-years':
        return 'emerald';
      case 'stat-customers':
        return 'cyan';
      case 'stat-hours':
        return 'indigo';
      default:
        return 'cyan';
    }
  };

  return (
    <section
      id="stats"
      ref={containerRef}
      className="relative py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      {/* Background ambient accents for light theme */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-72 h-72 rounded-full bg-cyan-400/10 blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-72 h-72 rounded-full bg-teal-400/10 blur-[100px] pointer-events-none" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-bold uppercase tracking-wider font-mono shadow-xs">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>Proven Quantitative Track Record</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
          Measurable Milestones of <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-teal-600">Engineering Trust</span>
        </h2>
        <p className="text-sm sm:text-base text-slate-600">
          Decades of delivering rigorous physics-based simulation, structural integrity evaluations, and code-certified plant engineering.
        </p>
      </div>

      {/* 4 Stats Cards with 3D Tilt & Count-up */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS_DATA.map((stat, idx) => (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.5, delay: idx * 0.12 }}
            className="h-full"
          >
            <TiltCard
              id={`stat-card-${stat.id}`}
              glowColor={getGlowColor(stat.id)}
              className="flex flex-col justify-between h-full bg-white/85 backdrop-blur-2xl border-slate-200/90 shadow-sm hover:shadow-lg"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 shadow-xs">
                    {getStatIcon(stat.id)}
                  </div>
                  <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-md bg-cyan-50 text-cyan-800 border border-cyan-200">
                    {stat.highlight}
                  </span>
                </div>

                <div className="pt-1">
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    inView={isInView}
                  />
                  <h3 className="text-base font-bold text-slate-900 mt-2 tracking-tight">
                    {stat.label}
                  </h3>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {stat.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-1.5 text-[11px] text-cyan-700 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                <span>Verified Delivery Record</span>
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
