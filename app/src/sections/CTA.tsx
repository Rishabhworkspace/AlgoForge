import { ArrowRight, Check, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useStats } from '@/hooks/useStats';

export function CTA({ onGetStarted }: { onGetStarted: () => void }) {
  const { userCount } = useStats();

  return (
    <section id="cta" className="relative py-28 overflow-hidden bg-[#050505]">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-tr from-[#fa6a20]/15 via-[#00f0ff]/10 to-transparent rounded-full blur-[160px] pointer-events-none" />

      <div className="forge-shell relative z-10 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
          className="doppelrand-shell p-2 shadow-[0_20px_80px_rgba(250,106,32,0.15)]"
        >
          <div className="doppelrand-core p-12 sm:p-16 text-center relative overflow-hidden bg-[#0a0b0e]">
            {/* Subtle Grid overlay inside card */}
            <div className="absolute inset-0 grid-pattern opacity-15 pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto">
              <div className="eyebrow-pill mx-auto mb-6">
                <Sparkles size={13} className="text-[#fa6a20]" />
                <span>ATELIER ACCESS // INITIALIZE PRACTICE</span>
              </div>

              <h2 className="font-sans text-4xl sm:text-6xl font-bold tracking-tight text-white mb-6">
                Stop collecting links. <br />
                <span className="text-[#ffae62]">Start building recall.</span>
              </h2>

              <p className="text-lg text-white/60 leading-relaxed mb-10">
                Join {userCount.toLocaleString()} ambitious developers turning scattered study sessions into instinctive, high-signal technical mastery.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
                <button onClick={onGetStarted} className="btn-island py-4 px-9 text-base w-full sm:w-auto">
                  Start learning free
                  <span className="btn-island__icon">
                    <ArrowRight size={18} />
                  </span>
                </button>
                <a
                  href="#roadmaps"
                  className="forge-button--quiet py-4 px-6 text-sm w-full sm:w-auto text-center justify-center border border-white/10 rounded-full"
                >
                  Inspect curriculum
                </a>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-white/50">
                <span className="flex items-center gap-1.5">
                  <Check size={14} className="text-[#00f0ff]" /> No credit card required
                </span>
                <span className="flex items-center gap-1.5">
                  <Check size={14} className="text-[#00f0ff]" /> Instant access to roadmaps
                </span>
                <span className="flex items-center gap-1.5">
                  <Check size={14} className="text-[#00f0ff]" /> Interactive 3D breakdowns
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
