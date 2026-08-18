import React, { useEffect, useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, PlayCircle, ShieldCheck } from 'lucide-react';
import { CLIENTS_DATA, HERO_DATA } from '../data/prosimData';
import { MagneticButton } from './ui/MagneticButton';
import { EASE_OUT_EXPO } from '../lib/motion';

interface HeroProps {
  onOpenConsultation: () => void;
}

/** Marks shown in the hero's trust strip; the full wall lives further down. */
const HERO_LOGOS = CLIENTS_DATA.slice(0, 6);

export const Hero: React.FC<HeroProps> = ({ onOpenConsultation }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  /**
   * Only the scrim parallaxes. The footage itself is deliberately left
   * untransformed: any scroll-driven zoom would pull the frame's edges out of
   * view, and the whole frame needs to stay visible.
   */
  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ['start start', 'end start'],
  });
  const scrimOpacity = useTransform(scrollYProgress, [0, 1], [1, 1.35]);

  /**
   * Keep the background video playing without fighting the browser.
   *
   * `play()` rejects when autoplay is blocked, so the gesture listeners below
   * pick it up from there rather than retrying in a loop. Decoding is also
   * suspended once the hero scrolls off screen.
   */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;

    const tryPlay = () => {
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
    <section
      id="home"
      ref={stageRef}
      className="relative flex min-h-[92svh] w-full items-center overflow-hidden bg-brand-950"
    >
      {/* ---------------- Video stage ---------------- *
       * The clip fills the section rather than dictating its height, so the
       * hero keeps a consistent shape from phone to ultrawide while the copy
       * column below stays the thing that actually sets the minimum height.
       */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
      >
        {/* WebM (VP9) first - smaller than the MP4 at equal quality, so the
            hero paints sooner. H.264 MP4 stays as the Safari fallback. */}
        <source src="/videos/prosim-intro.webm" type="video/webm" />
        <source src="/videos/prosim.mp4" type="video/mp4" />
      </video>

      {/*
       * Scrim.
       *
       * Deliberately light: the footage is the hero's subject, so the wash only
       * needs to hold the headline, not hide the plant behind it. It is
       * left-weighted and falls away to almost nothing on the right, where
       * there is no type to protect. A separate, narrower band sits directly
       * under the copy column so contrast stays safe on small screens where
       * the text spans the full width.
       */}
      <motion.div
        aria-hidden
        style={reduceMotion ? undefined : { opacity: scrimOpacity }}
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-brand-950/80 via-brand-950/45 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-brand-950/25 sm:hidden"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-brand-950"
      />

      {/* ---------------- Copy ---------------- */}
      <div className="relative z-10 page-shell w-full py-24 sm:py-28">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
          }}
          className="max-w-3xl"
        >
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT_EXPO } },
            }}
            className="text-xs font-bold uppercase tracking-[0.18em] text-brand-300 sm:text-sm"
          >
            {HERO_DATA.eyebrow}
          </motion.p>

          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 26 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE_OUT_EXPO } },
            }}
            className="mt-4 text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            {HERO_DATA.headline}{' '}
            <span className="text-brand-300">{HERO_DATA.headlineAccent}</span>
          </motion.h1>

          <motion.span
            aria-hidden
            variants={{
              hidden: { opacity: 0, scaleX: 0 },
              visible: {
                opacity: 1,
                scaleX: 1,
                transition: { duration: 0.6, ease: EASE_OUT_EXPO },
              },
            }}
            className="rule-accent rule-accent-on-dark mt-7 origin-left"
          />

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT_EXPO } },
            }}
            className="mt-6 max-w-2xl text-base leading-relaxed text-slate-200 sm:text-lg"
          >
            {HERO_DATA.subheadline}
          </motion.p>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 18 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT_EXPO } },
            }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <MagneticButton
              id="hero-explore-btn"
              type="button"
              strength={8}
              onClick={() => scrollToSection('industries')}
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-brand-500 px-7 py-3.5 text-sm font-bold tracking-wide text-white shadow-lg shadow-brand-900/40 transition-colors hover:bg-brand-400"
            >
              <span>{HERO_DATA.primaryCta}</span>
              <ArrowRight className="h-4 w-4" />
            </MagneticButton>

            <MagneticButton
              id="hero-consultation-btn"
              type="button"
              strength={8}
              onClick={onOpenConsultation}
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-white/35 bg-white/5 px-7 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition-colors hover:border-white/70 hover:bg-white/15"
            >
              <PlayCircle className="h-4 w-4" />
              <span>{HERO_DATA.videoCta}</span>
            </MagneticButton>
          </motion.div>

          {/* Scope statement - kept in the hero so the remit is unambiguous
              before a visitor reaches the services section. */}
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 14 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT_EXPO } },
            }}
            className="mt-6 inline-flex items-center gap-2 rounded-lg border border-brand-400/30 bg-brand-900/40 px-3.5 py-2 text-xs font-medium text-brand-100 backdrop-blur-sm"
          >
            <ShieldCheck className="h-4 w-4 shrink-0 text-brand-300" aria-hidden />
            <span>Detailed engineering &amp; analysis specialists</span>
          </motion.p>
        </motion.div>

        {/* ---------------- Trust strip ---------------- */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7, ease: EASE_OUT_EXPO }}
          className="mt-14 border-t border-white/15 pt-7"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-300">
            {HERO_DATA.socialProof}
          </p>

          <ul className="mt-5 flex flex-wrap items-center gap-3">
            {HERO_LOGOS.map((client) => (
              <li key={client.id}>
                {/*
                 * Each mark sits on its own frosted chip.
                 *
                 * Knocking the artwork back to a white silhouette was tried
                 * first and failed: the round emblems (NPCIL, IGCAR) are solid
                 * discs, so flattening them to one colour turned them into
                 * featureless blobs. A translucent light plate keeps every mark
                 * in its own colours and legible over the video instead.
                 */}
                <span className="flex h-12 items-center justify-center rounded-lg border border-white/25 bg-white/90 px-4 shadow-sm backdrop-blur-sm transition-colors duration-300 hover:bg-white">
                  <img
                    src={client.logo}
                    alt={client.name}
                    loading="lazy"
                    decoding="async"
                    className="max-h-7 w-auto max-w-[7rem] object-contain"
                  />
                </span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
};
