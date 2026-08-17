import React, { useEffect, useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import {
  Activity,
  ArrowRight,
  Atom,
  ChevronDown,
  Cpu,
  Flame,
  Layers,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { HERO_DATA } from '../data/prosimData';
import { MagneticButton } from './ui/MagneticButton';
import { EASE_OUT_EXPO } from '../lib/motion';

interface HeroProps {
  onOpenConsultation: () => void;
}

const FOCUS_CHIPS = [
  { label: 'Nuclear Code Qualification', icon: Atom },
  { label: 'FEA & Non-Linear Mechanics', icon: Layers },
  { label: 'Computational Fluid Dynamics', icon: Activity },
  { label: 'Piping & Surge Simulation', icon: Cpu },
] as const;

const HIGHLIGHTS = [
  {
    icon: Atom,
    title: 'ASME & RCC-M',
    desc: 'Nuclear Class 1, 2, 3 Code Verification',
    tone: 'bg-cyan-950 border-cyan-500/30 text-cyan-400',
  },
  {
    icon: Flame,
    title: 'API 579 / FFS',
    desc: 'Fitness-For-Service & Remaining Life (RLA)',
    tone: 'bg-teal-950 border-teal-500/30 text-teal-400',
  },
  {
    icon: Activity,
    title: 'High-Fidelity CFD',
    desc: 'Thermal Hydraulics & Vortex Shedding',
    tone: 'bg-sky-950 border-sky-500/30 text-sky-400',
  },
  {
    icon: Cpu,
    title: 'Digital Twin',
    desc: 'Asset Health Monitoring & Simulation',
    tone: 'bg-emerald-950 border-emerald-500/30 text-emerald-400',
  },
] as const;

export const Hero: React.FC<HeroProps> = ({ onOpenConsultation }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  /**
   * Only the vignette parallaxes now. The video itself is deliberately left
   * untransformed: any scroll-driven zoom or drift would pull the frame's
   * edges out of view, and the whole frame needs to stay visible.
   */
  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ['start start', 'end start'],
  });
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.35, 0.85]);

  /**
   * Keep the background video playing without fighting the browser.
   *
   * The previous implementation called play() from the video's own `onPause`
   * handler — a rejected play() fires `pause` again, so a blocked autoplay
   * could spin in a tight loop — and polled every 1.5s for the lifetime of the
   * page. This instead reacts to the events that actually matter, and pauses
   * the video outright once it scrolls off screen to save decode work.
   */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;

    const tryPlay = () => {
      // `play()` rejects when autoplay is blocked; the gesture listeners below
      // pick it up from there.
      void video.play().catch(() => undefined);
    };

    const onFirstGesture = () => {
      tryPlay();
      window.removeEventListener('pointerdown', onFirstGesture);
      window.removeEventListener('keydown', onFirstGesture);
    };

    const onVisibility = () => {
      if (document.hidden) video.pause();
      else tryPlay();
    };

    tryPlay();
    window.addEventListener('pointerdown', onFirstGesture, { once: true });
    window.addEventListener('keydown', onFirstGesture, { once: true });
    document.addEventListener('visibilitychange', onVisibility);

    // Only decode frames while the hero is actually on screen.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) tryPlay();
        else video.pause();
      },
      { threshold: 0.05 },
    );
    observer.observe(video);

    return () => {
      window.removeEventListener('pointerdown', onFirstGesture);
      window.removeEventListener('keydown', onFirstGesture);
      document.removeEventListener('visibilitychange', onVisibility);
      observer.disconnect();
    };
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 88;
    window.scrollTo({ top: Math.max(0, top), behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  return (
    <div id="home" className="flex w-full flex-col bg-slate-950">
      {/* ---------------- Video stage ---------------- */}
      {/*
       * Stage geometry.
       *
       * The clip is 1280x720 and carries a generator watermark in its
       * bottom-right corner. Rather than zooming in (which would lose the left
       * and right edges of the frame), the stage takes the source's full width
       * and a shorter aspect ratio — 1280x634 — so the video renders at 100%
       * width and its bottom ~12% overflows and is clipped away. The whole
       * frame stays visible edge to edge at every viewport size, and the
       * watermark is never on screen because it lives in the cropped band.
       */}
      <section
        ref={stageRef}
        className="relative w-full overflow-hidden bg-slate-950"
        style={{ aspectRatio: '1280 / 634', maxHeight: '78svh' }}
      >
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-hidden
          // w-full + h-auto keeps the source's own aspect ratio, so nothing is
          // squashed; the parent's shorter ratio is what performs the crop.
          className="pointer-events-none absolute left-0 top-0 h-auto min-h-full w-full object-cover object-top"
        >
          {/* WebM first: ~40% smaller than the MP4 at equal quality, so the
              hero paints sooner. The MP4 stays as a fallback for Safari. */}
          <source src="/videos/prosim-intro.webm" type="video/webm" />
          <source src="/videos/prosim.mp4" type="video/mp4" />
        </video>

        {/* Vignette. Kept light over the footage itself — it only deepens near
            the very bottom so the stage melts into the panel below. */}
        <motion.div
          aria-hidden
          style={reduceMotion ? undefined : { opacity: overlayOpacity }}
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent to-slate-950"
        />
      </section>

      {/* ---------------- Content panel ---------------- */}
      <section className="blueprint-grid relative w-full border-t border-white/10 bg-slate-950 pb-10 pt-8 sm:pb-14">
        <div className="animate-float-slow pointer-events-none absolute left-1/4 top-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
        <div
          className="animate-float-slow pointer-events-none absolute right-1/4 top-0 h-96 w-96 rounded-full bg-teal-500/10 blur-3xl"
          style={{ animationDelay: '2.5s' }}
        />

        <div className="relative z-10 page-shell ">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
            {/* Copy */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
              }}
              className="flex flex-col items-start space-y-4 lg:col-span-7"
            >
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 18 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT_EXPO } },
                }}
                className="inline-flex items-center gap-2 rounded-md border border-cyan-500/30 bg-cyan-950/80 px-3 py-1 font-mono text-xs font-bold tracking-wider text-cyan-300"
              >
                <span>PROSIM • MULTIDISCIPLINARY ENGINEERING &amp; R&amp;D</span>
              </motion.div>

              <motion.h1
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_OUT_EXPO } },
                }}
                className="text-3xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-5xl"
              >
                Design Engineering With{' '}
                <span className="bg-gradient-to-r from-cyan-300 via-teal-300 to-emerald-300 bg-clip-text text-transparent">
                  Delivery Excellence
                </span>
              </motion.h1>

              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT_EXPO } },
                }}
                className="max-w-2xl text-sm font-normal leading-relaxed text-slate-300 sm:text-base"
              >
                Developing comprehensive multidisciplinary engineering packages, advanced FEA/CFD
                simulations, and structural life assessments for global energy and industrial
                leaders.
              </motion.p>

              <motion.div
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.06 } },
                }}
                className="flex flex-wrap items-center gap-2 pt-1"
              >
                {FOCUS_CHIPS.map(({ label, icon: Icon }) => (
                  <motion.div
                    key={label}
                    variants={{
                      hidden: { opacity: 0, scale: 0.9, y: 10 },
                      visible: { opacity: 1, scale: 1, y: 0 },
                    }}
                    whileHover={reduceMotion ? undefined : { y: -3, scale: 1.04 }}
                    transition={{ type: 'spring', stiffness: 320, damping: 20 }}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-slate-900 px-2.5 py-1 text-xs font-medium text-slate-200"
                  >
                    <Icon className="h-3.5 w-3.5 text-cyan-400" aria-hidden />
                    <span>{label}</span>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 18 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT_EXPO } },
                }}
                className="flex w-full flex-wrap items-center gap-3 pt-3 sm:w-auto"
              >
                <MagneticButton
                  id="hero-explore-btn"
                  type="button"
                  strength={8}
                  onClick={() => scrollToSection('industries')}
                  className="cta-halo flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 px-6 py-3 text-sm font-bold tracking-wide text-white shadow-lg shadow-cyan-500/25 transition-shadow hover:shadow-cyan-500/40"
                >
                  <span>Explore Industries</span>
                  <ArrowRight className="h-4 w-4" />
                </MagneticButton>

                <MagneticButton
                  id="hero-consultation-btn"
                  type="button"
                  strength={8}
                  onClick={onOpenConsultation}
                  className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-white/20 bg-slate-900 px-6 py-3 text-sm font-bold text-slate-200 transition-colors hover:border-white/40 hover:bg-slate-800"
                >
                  <Sparkles className="h-4 w-4 text-cyan-400" />
                  <span>Request Consultation</span>
                </MagneticButton>
              </motion.div>
            </motion.div>

            {/* Bento highlights — each tile tilts independently in 3D. */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.35 } } }}
              className="grid w-full grid-cols-1 gap-3 min-[420px]:grid-cols-2 sm:gap-3.5 lg:col-span-5"
              style={{ perspective: 1200 }}
            >
              {HIGHLIGHTS.map(({ icon: Icon, title, desc, tone }) => (
                <motion.div
                  key={title}
                  variants={{
                    hidden: { opacity: 0, y: 28, rotateX: -14 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      rotateX: 0,
                      transition: { duration: 0.7, ease: EASE_OUT_EXPO },
                    },
                  }}
                  whileHover={
                    reduceMotion
                      ? undefined
                      : { y: -6, rotateX: 6, rotateY: -6, scale: 1.03 }
                  }
                  transition={{ type: 'spring', stiffness: 280, damping: 20 }}
                  style={{ transformStyle: 'preserve-3d' }}
                  className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-slate-900/90 p-4 transition-colors hover:border-cyan-400/40"
                >
                  <div
                    className={`mb-2 flex h-8 w-8 items-center justify-center rounded-xl border ${tone}`}
                    style={{ transform: 'translateZ(20px)' }}
                  >
                    <Icon className="h-4 w-4" aria-hidden />
                  </div>
                  <div style={{ transform: 'translateZ(14px)' }}>
                    <div className="text-lg font-bold leading-tight text-white sm:text-xl">
                      {title}
                    </div>
                    <div className="mt-0.5 text-[11px] leading-snug text-slate-400 sm:text-xs">
                      {desc}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Capabilities ticker */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.7, ease: EASE_OUT_EXPO }}
            className="marquee-track mt-8 flex flex-col items-center justify-between gap-3 rounded-xl border border-white/10 bg-slate-900 p-3 text-xs text-slate-300 md:flex-row"
          >
            <div className="flex shrink-0 items-center gap-2 font-mono font-bold uppercase tracking-wider text-cyan-400">
              <ShieldCheck className="h-4 w-4 text-teal-400" />
              <span>Engineering Capabilities</span>
            </div>

            <div className="w-full overflow-hidden">
              <div className="animate-marquee items-center gap-8 whitespace-nowrap font-medium text-slate-200">
                {/* Duplicated once so the -50% translate loops seamlessly. */}
                {[...HERO_DATA.tickerItems, ...HERO_DATA.tickerItems].map((item, idx) => (
                  <span key={`${item}-${idx}`} className="flex items-center gap-2 pr-8">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                    <span>{item}</span>
                  </span>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => scrollToSection('clients')}
              className="hidden shrink-0 cursor-pointer items-center gap-1 font-bold text-cyan-300 transition-colors hover:text-white md:flex"
            >
              <span>Clients</span>
              <ChevronDown className="h-3.5 w-3.5" />
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
