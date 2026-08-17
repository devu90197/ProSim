/**
 * Shared form field styling. Every input, select and textarea across the
 * contact form and both modals used to carry its own copy of this string,
 * which meant a focus-ring tweak had to be made in eleven places.
 */
export const FIELD_CLASS =
  'w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 transition-all focus:border-cyan-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-cyan-500';

export const LABEL_CLASS = 'mb-1 block text-xs font-bold text-slate-700';

export const SUBMIT_CLASS =
  'flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 via-teal-600 to-sky-600 py-3 text-xs font-bold tracking-wide text-white shadow-md shadow-cyan-500/25 transition-shadow hover:shadow-cyan-500/40 disabled:cursor-not-allowed disabled:opacity-50';
