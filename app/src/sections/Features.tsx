import { BarChart3, BookOpen, Code2, Play, Target, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';
import { useStats } from '@/hooks/useStats';

const features = [
  [Play, 'Study the reasoning', 'Clear video explanations and interactive diagrams that make the mental pattern behind every solution stick.', '#fa6a20'],
  [Code2, 'Practice with a target', 'A curated problem set that builds algorithmic intuition at the pace you can sustain under real interview pressure.', '#00f0ff'],
  [BarChart3, 'See real progress', 'Spot your consistency, momentum, and next best step with instant time complexity telemetry without guessing.', '#a088ff'],
  [BookOpen, 'Keep what you learn', 'Attach concise notes to every problem, build custom flashcards, and make revision genuinely useful.', '#ffae62'],
  [Target, 'Make practice a habit', 'Daily challenges turn positive intent into a reliable study rhythm that compounds daily.', '#00f0ff'],
  [Trophy, 'Stay in the game', 'Streaks and a live global leaderboard add healthy competitive pressure when motivation fades.', '#fa6a20'],
] as const;

export function Features() {
  const { problemCount } = useStats();

  return (
    <section id="features" className="relative py-28 overflow-hidden bg-[#050505]">
      {/* Subtle Ethereal Glows */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-[#fa6a20]/08 rounded-full blur-[140px] pointer-events-none -translate-x-1/2" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-[#00f0ff]/06 rounded-full blur-[140px] pointer-events-none translate-x-1/2" />

      <div className="forge-shell relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <div className="eyebrow-pill mx-auto mb-5">
            <span /> SYSTEM ARCHITECTURE // DELIBERATE PRACTICE
          </div>
          <h2 className="font-sans text-4xl sm:text-6xl font-bold tracking-tight text-white mb-6">
            Built for the habits <br />
            that <span className="text-[#00f0ff]">actually compound.</span>
          </h2>
          <p className="text-lg text-white/60 leading-relaxed">
            Everything stays pointed at one outcome: turning {problemCount.toLocaleString()} practice opportunities into high-signal recall and elite technical mastery.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(([Icon, title, description, accentColor], index) => (
            <motion.article
              key={title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.45, delay: index * 0.07, ease: [0.23, 1, 0.32, 1] }}
              className="doppelrand-shell p-1.5 group cursor-pointer"
            >
              <div className="doppelrand-core p-8 h-full flex flex-col justify-between relative overflow-hidden bg-[#0a0b0e] hover:bg-white/[0.03] transition-all duration-300">
                {/* Top Number & Icon */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-white/5 text-white/40 border border-white/10 group-hover:text-white group-hover:border-white/30 transition-colors">
                      0{index + 1}
                    </span>
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center bg-white/5 border border-white/10 group-hover:scale-110 transition-transform shadow-lg"
                      style={{ color: accentColor }}
                    >
                      <Icon size={22} strokeWidth={1.8} />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#00f0ff] transition-colors">
                    {title}
                  </h3>
                  <p className="text-sm text-white/60 leading-relaxed">
                    {description}
                  </p>
                </div>

                {/* Subtle bottom edge indicator */}
                <div
                  className="w-12 h-0.5 rounded-full mt-8 transition-all duration-300 group-hover:w-full opacity-60"
                  style={{ backgroundColor: accentColor }}
                />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
