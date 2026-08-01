import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Check, Play } from 'lucide-react';
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import { AlgorithmWorkbench } from '@/components/custom/AlgorithmWorkbench';
import { useStats } from '@/hooks/useStats';

interface HeroProps {
  onGetStarted: () => void;
}

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const ease = [0.23, 1, 0.32, 1] as const;

const dynamicPhrases = [
  { text: 'Data Structures', color: '#fa6a20' },
  { text: 'System Design', color: '#00f0ff' },
  { text: 'Dynamic Programming', color: '#a088ff' },
  { text: 'Graph Algorithms', color: '#ffae62' },
  { text: 'Interview Mastery', color: '#00f0ff' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.02,
      staggerDirection: -1,
    },
  },
};

const charVariants = {
  hidden: { opacity: 0, y: 15, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.35, ease },
  },
  exit: {
    opacity: 0,
    y: -10,
    filter: 'blur(6px)',
    transition: { duration: 0.2, ease },
  },
};

export function Hero({ onGetStarted }: HeroProps) {
  const { userCount, problemCount } = useStats();
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [phraseIndex, setPhraseIndex] = useState(0);

  // Cycle through dynamic phrases every 3.4s to give time for letter stagger
  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % dynamicPhrases.length);
    }, 3400);
    return () => clearInterval(interval);
  }, []);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 80, damping: 20 });
  const y = useSpring(rawY, { stiffness: 80, damping: 20 });
  const rotateY = useTransform(x, [-0.5, 0.5], [-6, 6]);
  const rotateX = useTransform(y, [-0.5, 0.5], [5, -5]);

  const glowX = useSpring(useMotionValue(0), { stiffness: 60, damping: 25 });
  const glowY = useSpring(useMotionValue(0), { stiffness: 60, damping: 25 });

  const onPointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (reduceMotion || !sectionRef.current) return;
    const bounds = sectionRef.current.getBoundingClientRect();
    rawX.set((event.clientX - bounds.left) / bounds.width - 0.5);
    rawY.set((event.clientY - bounds.top) / bounds.height - 0.5);
    glowX.set(event.clientX - bounds.left - 300);
    glowY.set(event.clientY - bounds.top - 300);
  };

  const currentPhrase = dynamicPhrases[phraseIndex];

  return (
    <motion.section
      id="home"
      ref={sectionRef}
      className="forge-hero relative pt-36 pb-20 lg:pt-44 lg:pb-28 overflow-hidden bg-[#050505]"
      onPointerMove={onPointerMove}
      onPointerLeave={() => {
        rawX.set(0);
        rawY.set(0);
      }}
    >
      <motion.div className="forge-hero__cursor-light" style={{ x: glowX, y: glowY }} aria-hidden="true" />
      <div className="forge-hero__halo" aria-hidden="true" />

      <div className="forge-shell forge-hero__layout max-w-7xl mx-auto px-4 sm:px-6 lg:px-2 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
        {/* Left Copy Column */}
        <div className="forge-hero__copy lg:col-span-5 flex flex-col justify-center">
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={reveal}
            transition={{ duration: 0.6, delay: 0.05, ease }}
            className="font-sans text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-[1.12] mb-8 flex flex-col items-start gap-2"
          >
            <span className="text-white">Learn</span>
            <span className="relative min-h-[2.4em] flex items-center overflow-visible py-1">
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentPhrase.text}
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="flex flex-col items-start gap-y-1 sm:gap-y-2 font-mono tracking-tighter drop-shadow-md"
                  style={{ color: currentPhrase.color }}
                >
                  {currentPhrase.text.split(' ').map((word, wordIdx) => (
                    <span key={wordIdx} className="inline-flex whitespace-nowrap">
                      {word.split('').map((char, charIdx) => (
                        <motion.span key={charIdx} variants={charVariants} className="inline-block">
                          {char}
                        </motion.span>
                      ))}
                    </span>
                  ))}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.h1>

          <motion.p
            className="forge-hero__lede text-lg sm:text-xl text-white/60 leading-relaxed mb-8 max-w-xl"
            initial="hidden"
            animate="visible"
            variants={reveal}
            transition={{ duration: 0.5, delay: 0.13, ease }}
          >
            A deliberate, physics-backed path through algorithms, system architecture, and technical interviews—built to turn scattered study hours into high-signal recall.
          </motion.p>

          <motion.div
            className="forge-hero__actions flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10"
            initial="hidden"
            animate="visible"
            variants={reveal}
            transition={{ duration: 0.45, delay: 0.2, ease }}
          >
            <button onClick={onGetStarted} className="btn-island py-4 px-8 text-base">
              Start learning free
              <span className="btn-island__icon">
                <ArrowRight size={18} />
              </span>
            </button>
            <a
              className="forge-button--quiet py-4 px-6 text-sm flex items-center justify-center gap-2 border border-white/10 rounded-full hover:bg-white/5 transition-colors text-white/80"
              href="#roadmaps"
            >
              <Play size={15} fill="currentColor" className="text-[#00f0ff]" /> See the roadmaps
            </a>
          </motion.div>

          <motion.div
            className="forge-hero__proof flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-mono text-white/50 pt-6 border-t border-white/10"
            initial="hidden"
            animate="visible"
            variants={reveal}
            transition={{ duration: 0.45, delay: 0.28, ease }}
          >
            <span className="flex items-center gap-1.5">
              <Check size={15} className="text-[#00f0ff]" /> {userCount} learners building consistency
            </span>
            <span className="flex items-center gap-1.5">
              <Check size={15} className="text-[#fa6a20]" /> {problemCount} problems to sharpen on
            </span>
          </motion.div>
        </div>

        {/* Right Visual Column (3D Centerpiece) */}
        <motion.div
          className="forge-hero__visual lg:col-span-7 relative w-full"
          style={reduceMotion ? {} : { rotateX, rotateY, transformPerspective: 1400 }}
          initial={reduceMotion ? false : { opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.12, ease }}
        >
          <AlgorithmWorkbench reduceMotion={Boolean(reduceMotion)} />
        </motion.div>
      </div>
    </motion.section>
  );
}
