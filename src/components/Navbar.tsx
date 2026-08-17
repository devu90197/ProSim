import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Activity, PhoneCall, Sparkles, Search } from 'lucide-react';
import { motion } from 'motion/react';

interface NavbarProps {
  onOpenConsultation: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenConsultation }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      const sections = ['home', 'stats', 'about', 'industries', 'services', 'clients', 'projects', 'careers', 'contact'];
      const scrollPosition = window.scrollY + 250;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'About Us', href: '#about', id: 'about' },
    { name: 'Industries', href: '#industries', id: 'industries' },
    { name: 'Services', href: '#services', id: 'services' },
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'Clients', href: '#clients', id: 'clients' },
    { name: 'Careers', href: '#careers', id: 'careers' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-navbar"
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full"
    >
      {/* Top Bar with Single Break Line and Enhanced Transparency */}
      <div className={`w-full transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-xl border-b border-slate-200/80 shadow-md py-2.5' 
          : 'bg-slate-950/20 backdrop-blur-sm border-b border-white/10 py-3 sm:py-3.5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Liquid Glass Pill Navigation Capsule */}
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('#home');
              }}
              className="flex items-center gap-2.5 group cursor-pointer shrink-0"
            >
              {/* Logo Emblem */}
              <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 via-teal-400 to-sky-400 p-[1.5px] shadow-lg shadow-cyan-500/25 group-hover:scale-105 transition-transform">
                <div className={`w-full h-full rounded-xl flex items-center justify-center font-black text-sm tracking-tighter ${
                  isScrolled ? 'bg-white text-cyan-700' : 'bg-slate-900 text-cyan-400'
                }`}>
                  <span>P</span>
                  <span className="text-teal-400 -ml-0.5">S</span>
                </div>
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className={`text-xl font-black tracking-tight transition-colors ${
                    isScrolled ? 'text-slate-900 group-hover:text-cyan-600' : 'text-white group-hover:text-cyan-300'
                  }`}>
                    ProSIM
                  </span>
                  <span className={`text-[9px] uppercase font-mono font-bold tracking-wider px-1.5 py-0.2 rounded border ${
                    isScrolled 
                      ? 'bg-cyan-50 text-cyan-800 border-cyan-200' 
                      : 'bg-cyan-500/20 text-cyan-300 border-cyan-400/30'
                  }`}>
                    R&D
                  </span>
                </div>
                <span className={`text-[9px] tracking-wider font-medium hidden md:inline ${
                  isScrolled ? 'text-slate-500' : 'text-slate-300'
                }`}>
                  Multidisciplinary Engineering
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links (Pill Style) */}
            <nav className={`hidden lg:flex items-center gap-1 px-2.5 py-1.5 rounded-full border transition-all ${
              isScrolled 
                ? 'bg-slate-100/90 border-slate-200' 
                : 'bg-slate-900/60 border-white/15 backdrop-blur-xl'
            }`}>
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(link.href);
                    }}
                    className={`px-3.5 py-1 text-xs font-semibold rounded-full transition-all duration-200 whitespace-nowrap ${
                      isActive
                        ? isScrolled
                          ? 'bg-white text-cyan-700 shadow-sm border border-slate-200 font-bold'
                          : 'bg-cyan-500/25 text-cyan-300 border border-cyan-400/40 font-bold'
                        : isScrolled
                          ? 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                          : 'text-slate-200 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {link.name}
                  </a>
                );
              })}
            </nav>

            {/* Actions & CTA */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                id="nav-consultation-btn"
                onClick={onOpenConsultation}
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-cyan-600 via-teal-600 to-sky-600 shadow-md shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Get In Touch</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              {/* Mobile Menu Toggle */}
              <button
                id="mobile-menu-toggle"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`p-2 rounded-xl border transition-colors lg:hidden ${
                  isScrolled 
                    ? 'bg-slate-100 border-slate-200 text-slate-800' 
                    : 'bg-slate-900/60 border-white/20 text-white'
                }`}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[60px] bg-slate-900/95 backdrop-blur-2xl border-b border-slate-800 shadow-2xl p-5 space-y-3 z-50">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className="px-3 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700/80 text-xs font-semibold text-slate-200 hover:text-cyan-300 hover:bg-slate-800 transition-colors flex items-center justify-between"
              >
                <span>{link.name}</span>
                <ArrowRight className="w-3 h-3 opacity-40" />
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Request Consultation</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
