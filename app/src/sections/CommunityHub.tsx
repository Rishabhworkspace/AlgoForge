import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, HelpCircle, Share2, Users, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

function SpotlightCard({
  children,
  className = '',
  color = '#ffffff',
}: {
  children: React.ReactNode;
  className?: string;
  color?: string;
}) {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => setOpacity(1);
  const handleMouseLeave = () => setOpacity(0);

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`doppelrand-shell p-1.5 transition-transform duration-300 ${className}`}
    >
      <div className="doppelrand-core p-7 h-full flex flex-col justify-between relative overflow-hidden bg-[#0a0b0e]">
        <div
          className="pointer-events-none absolute -inset-px transition duration-300 z-10"
          style={{
            opacity,
            background: `radial-gradient(450px circle at ${position.x}px ${position.y}px, ${color}20, transparent 60%)`,
          }}
        />
        <div className="relative z-20 h-full flex flex-col justify-between">{children}</div>
      </div>
    </div>
  );
}

interface CommunityHubProps {
  onNavigate: (view: 'home' | 'community') => void;
}

const communityCards = [
  {
    icon: MessageSquare,
    title: 'Discussions',
    description: 'Join pattern-based architecture threads with fellow engineers. Share deep trade-offs and debate optimal solutions.',
    color: '#a088ff',
    stat: 'Active Threads',
  },
  {
    icon: HelpCircle,
    title: 'Ask a Question',
    description: 'Stuck on a subtle DP recurrence or system invariant? Post your exact trace and get peer feedback.',
    color: '#00f0ff',
    stat: 'Quick Answers',
  },
  {
    icon: Share2,
    title: 'Share Solutions',
    description: 'Solved a complex problem with cleaner space complexity? Share your code breakdown with the community.',
    color: '#ffae62',
    stat: 'Solutions Shared',
  },
  {
    icon: Users,
    title: 'Community Feed',
    description: 'Track what top learners are building and solving daily. Stay motivated and find accountability partners.',
    color: '#fa6a20',
    stat: 'Active Members',
  },
];

export function CommunityHub({ onNavigate }: CommunityHubProps) {
  return (
    <section id="community" className="relative py-28 overflow-hidden bg-[#050505]">
      {/* Background Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#a088ff]/06 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.55 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <div className="eyebrow-pill mx-auto mb-5">
            <span /> COMMUNITY HUB // COLLECTIVE INTEL
          </div>
          <h2 className="font-sans text-4xl sm:text-6xl font-bold tracking-tight text-white mb-6">
            Sharpen with the <br />
            <span className="text-[#a088ff]">top 1% of learners.</span>
          </h2>
          <p className="text-lg text-white/60 leading-relaxed">
            Connect with dedicated engineers. Discuss tricky invariants, review architecture trade-offs, and accelerate your prep together.
          </p>
        </motion.div>

        {/* Community Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {communityCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
                ease: [0.23, 1, 0.32, 1] as const,
              }}
              className="h-full cursor-pointer group"
              onClick={() => onNavigate('community')}
            >
              <SpotlightCard className="h-full group-hover:-translate-y-1" color={card.color}>
                <div>
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 bg-white/5 border border-white/10 group-hover:scale-110 transition-transform shadow-lg"
                    style={{ color: card.color }}
                  >
                    <card.icon className="w-6 h-6" style={{ color: card.color }} />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-white transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-sm text-white/60 leading-relaxed mb-6">
                    {card.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono font-bold" style={{ color: card.color }}>
                  <span>{card.stat}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>

        {/* Explore CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.3 }}
          className="mt-14 text-center"
        >
          <Button
            variant="outline"
            size="lg"
            onClick={() => onNavigate('community')}
            className="rounded-full px-8 py-6 bg-white/[0.03] border-white/15 text-white hover:bg-white/10 hover:border-white/30 font-semibold text-sm transition-all shadow-lg"
          >
            Explore Community Forum
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
