import { ArrowRight, Code2, MapPin, Play, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const steps = [
  [MapPin, 'Pick a roadmap', 'Choose the exact algorithmic pattern or system design path you want to make bulletproof.', '#ffae62'],
  [Play, 'Deconstruct the idea', 'Watch interactive 3D breakdowns and core reasoning before writing a single line of code.', '#00f0ff'],
  [Code2, 'Put it under pressure', 'Solve timed, curated challenges in the live editor until you recognize the invariant instantly.', '#a088ff'],
  [TrendingUp, 'Leverage the telemetry', 'Use instant complexity feedback and spaced repetition signals to decide what deserves your next study hour.', '#fa6a20'],
] as const;

export function HowItWorks({ onGetStarted }: { onGetStarted?: () => void }) {
  return (
    <section id="how-it-works" className="relative py-28 overflow-hidden bg-[#050505]">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#fa6a20]/04 to-transparent pointer-events-none" />

      <div className="forge-shell relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <div className="eyebrow-pill mx-auto mb-5">
            <span /> FOUR-PHASE LOOP // RECALL PROTOCOL
          </div>
          <h2 className="font-sans text-4xl sm:text-6xl font-bold tracking-tight text-white mb-6">
            Four precise moves. <br />
            <span className="text-[#ffae62]">One steady direction.</span>
          </h2>
          <p className="text-lg text-white/60 leading-relaxed">
            A battle-tested workflow designed to eliminate wasted hours and turn complex concepts into instinctive problem-solving reflexes.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 relative">
          {steps.map(([Icon, title, description, accentColor], index) => (
            <motion.article
              key={title}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.45, delay: index * 0.08, ease: [0.23, 1, 0.32, 1] }}
              className="doppelrand-shell p-1.5 group relative"
            >
              <div className="doppelrand-core p-7 h-full flex flex-col justify-between bg-[#0a0b0e] group-hover:bg-white/[0.03] transition-all duration-300">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span
                      className="font-mono text-sm font-bold px-3 py-1 rounded-full bg-white/5 border border-white/10"
                      style={{ color: accentColor }}
                    >
                      PHASE 0{index + 1}
                    </span>
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 group-hover:scale-110 transition-transform shadow-md"
                      style={{ color: accentColor }}
                    >
                      <Icon size={20} strokeWidth={1.8} />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-white transition-colors">
                    {title}
                  </h3>
                  <p className="text-sm text-white/60 leading-relaxed">
                    {description}
                  </p>
                </div>

                <div className="mt-6 flex items-center gap-2 text-xs font-mono font-semibold text-white/40 group-hover:text-white transition-colors">
                  <span>Explore step</span>
                  <ArrowRight size={13} />
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Action CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.3 }}
          className="flex justify-center"
        >
          <button onClick={onGetStarted} className="btn-island py-4 px-8 text-base">
            Build your custom roadmap
            <span className="btn-island__icon">
              <ArrowRight size={18} />
            </span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
