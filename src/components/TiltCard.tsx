import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  glowColor?: 'cyan' | 'indigo' | 'emerald' | 'amber';
  onClick?: () => void;
  maxTilt?: number;
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  id,
  glowColor = 'cyan',
  onClick,
  maxTilt = 10
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const springConfig = { damping: 22, stiffness: 280, mass: 0.5 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  const rotateX = useTransform(smoothY, [0, 1], [maxTilt, -maxTilt]);
  const rotateY = useTransform(smoothX, [0, 1], [-maxTilt, maxTilt]);

  const glareX = useTransform(smoothX, [0, 1], [0, 100]);
  const glareY = useTransform(smoothY, [0, 1], [0, 100]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;

    const normalizedX = Math.max(0, Math.min(1, clientX / rect.width));
    const normalizedY = Math.max(0, Math.min(1, clientY / rect.height));

    x.set(normalizedX);
    y.set(normalizedY);
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  const glowStyles = {
    cyan: 'border-slate-200/90 hover:border-cyan-400 hover:shadow-[0_16px_36px_-6px_rgba(6,182,212,0.22)]',
    indigo: 'border-slate-200/90 hover:border-indigo-400 hover:shadow-[0_16px_36px_-6px_rgba(99,102,241,0.22)]',
    emerald: 'border-slate-200/90 hover:border-emerald-400 hover:shadow-[0_16px_36px_-6px_rgba(16,185,129,0.22)]',
    amber: 'border-slate-200/90 hover:border-amber-400 hover:shadow-[0_16px_36px_-6px_rgba(245,158,11,0.22)]',
  };

  return (
    <div style={{ perspective: 1000 }} className="w-full h-full">
      <motion.div
        ref={cardRef}
        id={id}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        whileHover={{ scale: 1.02 }}
        transition={{ type: 'spring', damping: 22, stiffness: 280 }}
        className={`relative overflow-hidden rounded-2xl p-6 backdrop-blur-xl bg-white/80 shadow-[0_8px_24px_-4px_rgba(15,23,42,0.06),0_1px_2px_rgba(15,23,42,0.03)] border transition-all duration-300 ${glowStyles[glowColor]} ${
          onClick ? 'cursor-pointer' : ''
        } ${className}`}
      >
        {/* Specular glare overlay for light theme */}
        <motion.div
          className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 hover:opacity-100 transition-opacity duration-300 rounded-2xl"
          style={{
            background: useTransform(
              [glareX, glareY],
              ([gx, gy]) =>
                `radial-gradient(350px circle at ${gx}% ${gy}%, rgba(255,255,255,0.7), transparent 70%)`
            ),
          }}
        />

        {/* Ambient top light sheen */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent pointer-events-none" />

        {/* Card Content with 3D depth */}
        <div style={{ transform: 'translateZ(20px)' }} className="relative z-10 w-full h-full">
          {children}
        </div>
      </motion.div>
    </div>
  );
};
