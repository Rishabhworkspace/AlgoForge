import { motion, useReducedMotion } from 'framer-motion';
import { useId } from 'react';

export function Logo({ className = '', size = 40 }: { className?: string; size?: number }) {
  const reduceMotion = useReducedMotion();
  const gradientId = useId();
  return (
    <motion.svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="AlgoForge">
      <defs><linearGradient id={gradientId} x1="8" y1="8" x2="57" y2="55" gradientUnits="userSpaceOnUse"><stop stopColor="#ffcb97" /><stop offset="1" stopColor="#f05c18" /></linearGradient></defs>
      <motion.path d="M8 49 27.5 10h9L56 49H44.5l-4-9H23.2l-4 9H8Zm19-18h9.7L32 20.1 27 31Z" fill={`url(#${gradientId})`} initial={reduceMotion ? false : { opacity: 0, pathLength: .7 }} animate={{ opacity: 1, pathLength: 1 }} transition={{ duration: .55, ease: [0.23, 1, 0.32, 1] }} />
      <motion.path d="M26 31h19.5" stroke="#0d0c0b" strokeWidth="5" strokeLinecap="square" initial={reduceMotion ? false : { pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: .32, delay: .28, ease: [0.23, 1, 0.32, 1] }} />
      <path d="M47.5 17H57v9.5h-9.5z" fill="#f4eee6" />
    </motion.svg>
  );
}
