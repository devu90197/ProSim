import React, { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react';
import { ArrowRight, Menu, PhoneCall, Sparkles, X } from 'lucide-react';
import { MagneticButton } from './ui/MagneticButton';
import { Logo } from './ui/Logo';

interface NavbarProps {
  onOpenConsultation: () => void;
}

const NAV_LINKS = [
  { name: 'Home', id: 'home' },
  { name: 'Clients', id: 'clients' },
  { name: 'About Us', id: 'about' },
  { name: 'Industries', id: 'industries' },
  { name: 'Services', id: 'services' },
  { name: 'Projects', id: 'projects' },
  { name: 'Careers', id: 'careers' },
  { name: 'Contact', id: 'contact' },
] as const;

/** Matches --nav-height in index.css; used to offset programmatic scrolling. */
const NAV_OFFSET = 88;

export const Navbar: React.FC<NavbarProps> = ({ onOpenConsultation }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('home');

  // Thin progress bar showing how far through the page the reader is.
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  /**
   * Scroll handling is throttled to one read per animation frame. The previous
   * version ran a full layout query (offsetTop/offsetHeight on nine elements)
   * on every scroll event, which forced synchronous reflow dozens of times a
   * second and made the page stutter while scrolling.
   */
  useEffect(() => {
    let frameId = 0;

    const measure = () => {
      frameId = 0;
      const y = window.scrollY;
      setIsScrolled(y > 40);

      const probe = y + NAV_OFFSET + 60;
      let current: string = NAV_LINKS[0].id;

      for (const link of NAV_LINKS) {
        const el = document.getElementById(link.id);
        if (!el) continue;

        const top = el.offsetTop;
        if (probe >= top && probe < top + el.offsetHeight) {
          current = link.id;
          break;
        }
      }

      // Anything past the fold's end belongs to the last section in view.
      if (window.innerHeight + y >= document.body.scrollHeight - 80) {
        current = NAV_LINKS[NAV_LINKS.length - 1].id;
      }

      setActiveSection(current);
    };

    const onScroll = () => {
      if (frameId) return;
      frameId = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, []);

  /* Close the mobile drawer on Escape or once the layout goes wide. */
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth >= 1024) setMobileMenuOpen(false);
    };

    document.addEventListener('keydown', onKeyDown);
    window.addEventListener('resize', onResize);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('resize', onResize);
    };
  }, [mobileMenuOpen]);

  /**
   * Scrolls with the fixed header's height subtracted. `scrollIntoView` alone
   * parked each section's heading underneath the navbar.
   */
  const goToSection = useCallback((id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (!el) return;

    const top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    window.scrollTo({ top: Math.max(0, top), behavior: prefersReduced ? 'auto' : 'smooth' });
  }, []);

  return (
    <header
      id="main-navbar"
      className="fixed inset-x-0 top-0 z-50 w-full transition-all duration-300"
    >
      <a
        href="#about"
        onClick={(e) => {
          e.preventDefault();
          goToSection('about');
        }}
        className="sr-only rounded-lg bg-white px-4 py-2 text-sm font-bold text-cyan-700 focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50"
      >
        Skip to main content
      </a>

      {/*
       * The bar is permanently fixed and never retracts — it only changes
       * appearance, going from transparent over the hero video to a compact
       * solid-white bar once the page is scrolled. The `y` animation below
       * runs once on mount to drop it into place.
       */}
      <motion.div
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
        className={`w-full transition-[background-color,padding,box-shadow,border-color] duration-300 ${isScrolled
          ? 'border-b border-slate-200/80 bg-white/95 py-2 shadow-lg shadow-brand-950/5 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent py-4 sm:py-5'
          }`}
      >
        <div className="page-shell ">
          <div className="flex items-center justify-between">
            {/* Brand */}
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                goToSection('home');
              }}
              className="group flex shrink-0 cursor-pointer items-center"
              aria-label="ProSIM — back to top"
            >
              {/* On the transparent (over-video) navbar the mark needs its own
                  light ground; once the bar turns white it sits bare. */}
              <Logo onDark={!isScrolled} priority />
            </a>

            {/* Desktop nav */}
            <nav
              aria-label="Primary"
              className={`hidden items-center gap-1 rounded-full border px-2.5 py-1.5 transition-all lg:flex ${isScrolled
                ? 'border-slate-200 bg-slate-100/90'
                : 'border-transparent bg-transparent'
                }`}
            >
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      goToSection(link.id);
                    }}
                    aria-current={isActive ? 'page' : undefined}
                    className={`relative whitespace-nowrap rounded-full px-3.5 py-1 text-xs font-semibold transition-colors duration-200 ${isActive
                      ? isScrolled
                        ? 'text-cyan-700'
                        : 'text-cyan-300'
                      : isScrolled
                        ? 'text-slate-600 hover:text-slate-900'
                        : 'text-slate-200 hover:text-white'
                      }`}
                  >
                    {/* The pill physically slides between links rather than
                        popping in and out on each one. */}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-pill"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                        className={`absolute inset-0 rounded-full border ${isScrolled
                          ? 'border-slate-200 bg-white shadow-sm'
                          : 'border-cyan-400/40 bg-cyan-500/25'
                          }`}
                      />
                    )}
                    <span className="relative z-10">{link.name}</span>
                  </a>
                );
              })}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              <MagneticButton
                id="nav-consultation-btn"
                type="button"
                onClick={onOpenConsultation}
                className="hidden cursor-pointer items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 via-teal-600 to-sky-600 px-4 py-2 text-xs font-bold text-white shadow-md shadow-cyan-500/25 transition-shadow hover:shadow-cyan-500/40 sm:inline-flex"
              >
                <PhoneCall className="h-3.5 w-3.5" />
                <span>Get In Touch</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </MagneticButton>

              <button
                id="mobile-menu-toggle"
                type="button"
                onClick={() => setMobileMenuOpen((open) => !open)}
                className={`rounded-xl border p-2 transition-colors lg:hidden ${isScrolled
                  ? 'border-slate-200 bg-slate-100 text-slate-800'
                  : 'border-white/20 bg-slate-900/60 text-white'
                  }`}
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-nav-drawer"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Reading progress */}
        <motion.div
          aria-hidden
          style={{ scaleX: progress }}
          className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-gradient-to-r from-cyan-500 via-teal-400 to-sky-500"
        />
      </motion.div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-nav-drawer"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-x-0 top-full space-y-3 border-b border-slate-800 bg-slate-900/95 p-5 shadow-2xl backdrop-blur-2xl lg:hidden"
          >
            <nav aria-label="Mobile" className="grid grid-cols-2 gap-2">
              {NAV_LINKS.map((link, idx) => (
                <motion.a
                  key={link.id}
                  href={`#${link.id}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.035, duration: 0.3 }}
                  onClick={(e) => {
                    e.preventDefault();
                    goToSection(link.id);
                  }}
                  aria-current={activeSection === link.id ? 'page' : undefined}
                  className={`flex items-center justify-between rounded-xl border px-3 py-2.5 text-xs font-semibold transition-colors ${activeSection === link.id
                    ? 'border-cyan-400/40 bg-cyan-500/15 text-cyan-300'
                    : 'border-slate-700/80 bg-slate-800/80 text-slate-200 hover:bg-slate-800 hover:text-cyan-300'
                    }`}
                >
                  <span>{link.name}</span>
                  <ArrowRight className="h-3 w-3 opacity-40" />
                </motion.a>
              ))}
            </nav>

            <div className="border-t border-slate-800 pt-3">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenConsultation();
                }}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 py-3 text-xs font-bold text-white shadow-lg"
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>Request Consultation</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
