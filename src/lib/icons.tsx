import React from 'react';
import {
  Activity,
  Atom,
  Award,
  Box,
  Briefcase,
  Clock,
  Cpu,
  Droplets,
  Flame,
  Layers,
  ShieldAlert,
  Sparkles,
  TrendingUp,
  Users2,
  Wind,
  Zap,
  type LucideIcon,
} from 'lucide-react';

/**
 * Maps the `iconName` strings stored in the data layer to real components.
 *
 * This replaces the switch statements that each section used to carry — they
 * had drifted apart, and adding an icon meant editing several files.
 */
const ICON_REGISTRY: Record<string, LucideIcon> = {
  Activity,
  Atom,
  Award,
  Box,
  Briefcase,
  Clock,
  Cpu,
  Droplets,
  Flame,
  Layers,
  ShieldAlert,
  Sparkles,
  TrendingUp,
  Users2,
  Wind,
  Zap,
};

/** Tailwind text colour per icon, so accent hues stay consistent site-wide. */
const ICON_TONE: Record<string, string> = {
  Atom: 'text-cyan-600',
  Flame: 'text-amber-600',
  Droplets: 'text-sky-600',
  Layers: 'text-teal-600',
  Cpu: 'text-indigo-600',
  Zap: 'text-emerald-600',
  Wind: 'text-teal-600',
  Activity: 'text-sky-600',
  Box: 'text-indigo-600',
  ShieldAlert: 'text-amber-600',
  Sparkles: 'text-cyan-600',
};

export const getIconComponent = (name: string): LucideIcon =>
  ICON_REGISTRY[name] ?? Activity;

export const getIconTone = (name: string): string => ICON_TONE[name] ?? 'text-cyan-600';

interface DataIconProps {
  name: string;
  className?: string;
}

/** Renders the icon named in the data, tinted with its registered accent. */
export const DataIcon: React.FC<DataIconProps> = ({ name, className = 'w-6 h-6' }) => {
  const Icon = getIconComponent(name);
  return <Icon className={`${className} ${getIconTone(name)}`} aria-hidden />;
};
