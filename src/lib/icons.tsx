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

/**
 * Tailwind text colour per icon.
 *
 * The brand runs a single blue family rather than one hue per topic, so these
 * only vary in depth. Mixing amber, indigo and emerald in here previously
 * pulled the cards away from the palette every time an icon changed.
 */
const ICON_TONE: Record<string, string> = {
  Atom: 'text-brand-600',
  Flame: 'text-brand-500',
  Droplets: 'text-brand-500',
  Layers: 'text-brand-600',
  Cpu: 'text-brand-700',
  Zap: 'text-brand-500',
  Wind: 'text-brand-600',
  Activity: 'text-brand-500',
  Box: 'text-brand-700',
  ShieldAlert: 'text-brand-600',
  Sparkles: 'text-brand-500',
};

export const getIconComponent = (name: string): LucideIcon =>
  ICON_REGISTRY[name] ?? Activity;

export const getIconTone = (name: string): string => ICON_TONE[name] ?? 'text-brand-600';

interface DataIconProps {
  name: string;
  className?: string;
}

/** Renders the icon named in the data, tinted with its registered accent. */
export const DataIcon: React.FC<DataIconProps> = ({ name, className = 'w-6 h-6' }) => {
  const Icon = getIconComponent(name);
  return <Icon className={`${className} ${getIconTone(name)}`} aria-hidden />;
};
