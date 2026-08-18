import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { INDUSTRIES_DATA, SERVICES_DATA } from '../../data/prosimData';

// Reusing NAV_LINKS from Navbar for top-level sections
const NAV_LINKS = [
  { name: 'Home', id: 'home' },
  { name: 'Clients', id: 'clients' },
  { name: 'About Us', id: 'about' },
  { name: 'Industries', id: 'industries' },
  { name: 'Services', id: 'services' },
  { name: 'Projects', id: 'projects' },
  { name: 'Careers', id: 'careers' },
  { name: 'Contact', id: 'contact' },
];

type SearchResult = {
  id: string;
  title: string;
  subtitle?: string;
  category: 'Section' | 'Industry' | 'Service';
  elementId: string; // The DOM element ID to scroll to
};

// Build a searchable index
const SEARCH_INDEX: SearchResult[] = [
  ...NAV_LINKS.map((link) => ({
    id: `nav-${link.id}`,
    title: link.name,
    category: 'Section' as const,
    elementId: link.id,
  })),
  ...INDUSTRIES_DATA.map((ind) => ({
    id: `ind-${ind.id}`,
    title: ind.title,
    subtitle: ind.shortDesc,
    category: 'Industry' as const,
    elementId: 'industries', // Scroll to the industries section
  })),
  ...SERVICES_DATA.map((srv) => ({
    id: `srv-${srv.id}`,
    title: srv.title,
    subtitle: srv.tagline,
    category: 'Service' as const,
    elementId: 'services', // Scroll to the services section
  })),
];

export const SearchBox: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      // Focus input after a short delay to allow animation to complete
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const filtered = SEARCH_INDEX.filter((item) => {
      return (
        item.title.toLowerCase().includes(lowerQuery) ||
        item.subtitle?.toLowerCase().includes(lowerQuery) ||
        item.category.toLowerCase().includes(lowerQuery)
      );
    });

    setResults(filtered);
  }, [query]);

  // Handle escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      // Prevent background scrolling
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleResultClick = (elementId: string) => {
    setIsOpen(false);
    const el = document.getElementById(elementId);
    if (el) {
      const NAV_OFFSET = 88;
      const top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
      window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 text-slate-700 transition-colors hover:text-cyan-600 dark:text-slate-300 dark:hover:text-cyan-400 lg:bg-slate-100/50 lg:rounded-full lg:dark:bg-slate-800/50"
        aria-label="Open search"
      >
        <Search className="h-5 w-5" />
      </button>

      {/* Search Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex flex-col bg-slate-900/40 p-4 backdrop-blur-md sm:p-6 lg:p-12"
          >
            {/* Clickable backdrop to close */}
            <div className="absolute inset-0" onClick={() => setIsOpen(false)} />

            <motion.div
              initial={{ y: -20, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -20, opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="relative mx-auto w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800"
            >
              {/* Search Header/Input */}
              <div className="flex items-center border-b border-slate-200 px-4 py-4 dark:border-slate-800">
                <Search className="h-5 w-5 shrink-0 text-slate-400" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search for industries, services, or sections..."
                  className="w-full bg-transparent px-4 text-base text-slate-900 placeholder-slate-400 outline-none dark:text-white"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <button
                  onClick={() => setIsOpen(false)}
                  className="shrink-0 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300"
                  aria-label="Close search"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Search Results */}
              <div className="max-h-[60vh] overflow-y-auto overscroll-contain">
                {query.trim() && results.length === 0 && (
                  <div className="px-6 py-12 text-center text-sm text-slate-500 dark:text-slate-400">
                    No results found for &quot;{query}&quot;. Try a different term.
                  </div>
                )}

                {results.length > 0 && (
                  <ul className="py-2">
                    {results.map((result) => (
                      <li key={result.id}>
                        <button
                          onClick={() => handleResultClick(result.elementId)}
                          className="flex w-full items-center justify-between px-4 py-3 text-left transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50"
                        >
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-medium uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                                {result.category}
                              </span>
                              <span className="text-sm font-semibold text-slate-900 dark:text-white">
                                {result.title}
                              </span>
                            </div>
                            {result.subtitle && (
                              <span className="line-clamp-1 text-sm text-slate-500 dark:text-slate-400">
                                {result.subtitle}
                              </span>
                            )}
                          </div>
                          <ChevronRight className="h-4 w-4 shrink-0 text-slate-400" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
                
                {/* Default state when empty */}
                {!query.trim() && (
                  <div className="px-6 py-8 text-center text-sm text-slate-500 dark:text-slate-400">
                    Type a keyword to find relevant content on the site.
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
