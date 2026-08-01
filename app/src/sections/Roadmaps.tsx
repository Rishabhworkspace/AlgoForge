import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Binary,
  Cpu,
  GitBranch,
  Network,
  Briefcase,
  Server,
  ArrowRight,
  PlayCircle,
} from 'lucide-react';
import { getLearningPaths, getTopicsByPath, getProblemsByTopic } from '@/api/content';
import { getUserProgress } from '@/api/userActions';
import { useAuth } from '@/contexts/AuthContext';
import { useStats } from '@/hooks/useStats';

interface RoadmapsProps {
  onPathClick: (pathId: string) => void;
}

const iconMap: Record<string, React.ElementType<{ className?: string; style?: React.CSSProperties }>> = {
  Binary,
  Cpu,
  GitBranch,
  Network,
  Briefcase,
  Server,
};

export function Roadmaps({ onPathClick }: RoadmapsProps) {
  const { user } = useAuth();
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const { problemCount, videoCount, roadmapCount, userCount } = useStats();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [categories, setCategories] = useState<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [topicsMap, setTopicsMap] = useState<Record<string, any[]>>({});
  const [pathSolvedCounts, setPathSolvedCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const paths = await getLearningPaths();
        setCategories(paths);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const topicsData: Record<string, any[]> = {};
        const pathProblemIds: Record<string, string[]> = {};

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await Promise.all(
          paths.map(async (path: any) => {
            const pathTopics = await getTopicsByPath(path.id);
            topicsData[path.id] = pathTopics;

            const problemIds: string[] = [];
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            await Promise.all(
              pathTopics.map(async (topic: any) => {
                try {
                  const problems = await getProblemsByTopic(topic.id);
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  problems.forEach((p: any) => problemIds.push(p.id));
                } catch {
                  /* ignore */
                }
              })
            );
            pathProblemIds[path.id] = problemIds;
          })
        );
        setTopicsMap(topicsData);

        if (user) {
          try {
            const progressData = await getUserProgress();
            const solvedSet = new Set<string>(
              progressData
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                .filter((p: any) => p.status === 'SOLVED')
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                .map((p: any) => p.problem_id)
            );

            const counts: Record<string, number> = {};
            for (const [pathId, pIds] of Object.entries(pathProblemIds)) {
              counts[pathId] = pIds.filter((id) => solvedSet.has(id)).length;
            }
            setPathSolvedCounts(counts);
          } catch {
            /* ignore */
          }
        }
      } catch (e) {
        console.error('Failed to load roadmaps', e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] as const },
    },
  };

  if (loading) {
    return (
      <div className="py-32 text-center text-white/60 font-mono text-sm animate-pulse">
        INITIALIZING LEARNING ROADMAPS // LOADING MODULES...
      </div>
    );
  }

  return (
    <section id="roadmaps" className="relative py-28 overflow-hidden bg-[#050505]">
      {/* Background Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#00f0ff]/05 rounded-full blur-[160px] pointer-events-none" />

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
            <span /> LEARNING PATHS // CURATED CURRICULUM
          </div>
          <h2 className="font-sans text-4xl sm:text-6xl font-bold tracking-tight text-white mb-6">
            Master the core. <br />
            <span className="text-[#00f0ff]">Pathways built for clarity.</span>
          </h2>
          <p className="text-lg text-white/60 leading-relaxed">
            Structured tracks that take you systematically from fundamental intuition to technical mastery without the overwhelming fluff.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-10%' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {categories.map((category) => {
            const Icon = iconMap[category.icon] || Binary;
            const topics = topicsMap[category.id] || [];
            const totalProblems = category.totalProblems || 0;
            const solvedCount = pathSolvedCounts[category.id] || 0;
            const progressPercent = totalProblems > 0 ? Math.round((solvedCount / totalProblems) * 100) : 0;

            return (
              <motion.div
                key={category.id}
                variants={itemVariants}
                onMouseEnter={() => setHoveredCategory(category.id)}
                onMouseLeave={() => setHoveredCategory(null)}
                className={`doppelrand-shell p-1.5 group cursor-pointer transition-all duration-300 ${
                  hoveredCategory === category.id ? 'border-white/30 shadow-[0_10px_40px_rgba(0,240,255,0.12)] -translate-y-1' : ''
                }`}
                onClick={() => onPathClick(category.id)}
              >
                <div className="doppelrand-core p-7 h-full flex flex-col justify-between bg-[#0a0b0e] hover:bg-white/[0.03] transition-all duration-300 relative overflow-hidden">
                  {/* Subtle Gradient Glow inside card */}
                  <div
                    className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-[60px] opacity-0 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none"
                    style={{ background: category.color }}
                  />

                  <div>
                    {/* Icon & Topic Count */}
                    <div className="flex items-start justify-between mb-6">
                      <div
                        className="w-13 h-13 rounded-2xl flex items-center justify-center p-3.5 bg-white/5 border border-white/10 group-hover:scale-110 transition-transform shadow-lg"
                        style={{ color: category.color }}
                      >
                        <Icon className="w-6 h-6" style={{ color: category.color }} />
                      </div>
                      <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded-full bg-white/5 text-white/50 border border-white/10">
                        {topics.length} TOPICS
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#00f0ff] transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-sm text-white/60 leading-relaxed mb-6 line-clamp-2">
                      {category.description}
                    </p>

                    {/* Progress Bar */}
                    <div className="mb-6 bg-white/[0.02] p-3.5 rounded-xl border border-white/5">
                      <div className="flex items-center justify-between text-xs font-mono mb-2">
                        <span className="text-white/50">PROGRESS</span>
                        <span className="font-bold text-white">
                          {solvedCount}/{totalProblems} <span className="text-white/30">({progressPercent}%)</span>
                        </span>
                      </div>
                      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${progressPercent}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.3 }}
                          className="h-full rounded-full"
                          style={{ background: category.color || '#fa6a20' }}
                        />
                      </div>
                    </div>

                    {/* Topics Preview List */}
                    <div className="space-y-2 mb-6">
                      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                      {topics.slice(0, 3).map((topic: any) => (
                        <div key={topic.id} className="flex items-center gap-2.5 text-xs text-white/70">
                          <PlayCircle className="w-3.5 h-3.5 flex-shrink-0" style={{ color: category.color }} />
                          <span className="truncate">{topic.title}</span>
                        </div>
                      ))}
                      {topics.length > 3 && (
                        <div className="text-xs font-mono text-white/40 pl-6">
                          +{topics.length - 3} more subtopics
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Footer Button */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between text-sm font-semibold text-white group-hover:text-[#00f0ff] transition-colors">
                    <span>Start Track</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom Telemetry Stats */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.2 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { label: 'Total Problems', value: problemCount, color: '#fa6a20' },
            { label: 'Video Solutions', value: videoCount, color: '#00f0ff' },
            { label: 'Learning Paths', value: roadmapCount, color: '#a088ff' },
            { label: 'Active Learners', value: userCount, color: '#ffae62' },
          ].map((stat) => (
            <div key={stat.label} className="doppelrand-shell p-1.5">
              <div className="doppelrand-core p-6 text-center bg-[#0a0b0e]">
                <p className="text-2xl sm:text-4xl font-bold font-mono mb-1" style={{ color: stat.color }}>
                  {stat.value}
                </p>
                <p className="text-xs uppercase tracking-wider font-mono text-white/50">{stat.label}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
