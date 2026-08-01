import { useState, useEffect, useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import { Flame, Zap, CheckCircle2, Trophy, Activity, PlayCircle } from 'lucide-react';
import { animate } from 'animejs';
import { getDashboardStats, getUserProgress } from '@/api/userActions';
import { getAllProblems, getAllTopics } from '@/api/content';

interface UserHeroProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any;
  onTopicClick: (topicId: string) => void;
}

function AnimatedStatNumber({ value, prefix = '', suffix = '' }: { value: number | string; prefix?: string; suffix?: string }) {
  const numValue = typeof value === 'number' ? value : parseInt(String(value).replace(/[^0-9]/g, ''), 10);
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (spanRef.current && !isNaN(numValue)) {
      const obj = { val: 0 };
      animate(obj, {
        val: numValue,
        ease: 'outCubic',
        duration: 1400,
        round: 1,
        onUpdate: () => {
          if (spanRef.current) {
            spanRef.current.innerText = `${prefix}${obj.val.toLocaleString()}${suffix}`;
          }
        },
      });
    } else if (spanRef.current) {
      spanRef.current.innerText = `${prefix}${value}${suffix}`;
    }
  }, [numValue, prefix, suffix, value]);

  return <span ref={spanRef} className="font-mono font-bold">{`${prefix}${value}${suffix}`}</span>;
}

export function UserHero({ user, onTopicClick }: UserHeroProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [dashboardStats, setDashboardStats] = useState<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [problems, setProblems] = useState<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [topics, setTopics] = useState<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [userProgress, setUserProgress] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsData, problemsData, topicsData] = await Promise.all([
          getDashboardStats().catch(() => null),
          getAllProblems().catch(() => []),
          getAllTopics().catch(() => []),
        ]);
        setDashboardStats(statsData);
        setProblems(problemsData);
        setTopics(topicsData);

        try {
          const progress = await getUserProgress();
          setUserProgress(progress);
        } catch {
          // Not logged in or error
        }
      } catch (e) {
        console.error('Failed to load hero data', e);
      }
    };
    fetchData();
  }, []);

  const solvedIds = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const solved = userProgress.filter((p: any) => p.status === 'SOLVED');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return new Set(solved.map((p: any) => p.problem_id));
  }, [userProgress]);

  const totalSolved = solvedIds.size;
  const currentStreak = dashboardStats?.currentStreak ?? (user.streak_days || 0);
  const rank = dashboardStats?.rank ?? '--';
  const topPercent = dashboardStats?.topPercent ?? '--';

  const level = Math.floor((user.xp_points || 0) / 100) + 1;
  const nextLevelXp = level * 100;
  const progressToNextLevel = (((user.xp_points || 0) % 100) / 100) * 100;
  const completionPercentage = problems.length > 0 ? Math.round((totalSolved / problems.length) * 100) : 0;

  const weeklyActivity = useMemo(() => {
    if (dashboardStats?.weeklyActivity) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return dashboardStats.weeklyActivity.map((d: any) => {
        const date = new Date(d.date + 'T00:00:00');
        return {
          day: date.toLocaleDateString('en-US', { weekday: 'short' }),
          count: d.count,
        };
      });
    }
    return [
      { day: 'Mon', count: 0 },
      { day: 'Tue', count: 0 },
      { day: 'Wed', count: 0 },
      { day: 'Thu', count: 0 },
      { day: 'Fri', count: 0 },
      { day: 'Sat', count: 0 },
      { day: 'Sun', count: 0 },
    ];
  }, [dashboardStats]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const maxActivity = Math.max(...weeklyActivity.map((d: any) => d.count), 1);

  const continueTopicData = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const solvedProgress = userProgress.filter((p: any) => p.status === 'SOLVED');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const topicStats = topics.map((topic: any) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const topicProblems = problems.filter((p: any) => p.topic_id === topic.id);
      const totalInTopic = topicProblems.length;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const solvedInTopic = topicProblems.filter((p: any) => solvedIds.has(p.id)).length;
      const progress = totalInTopic > 0 ? Math.round((solvedInTopic / totalInTopic) * 100) : 0;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const topicProblemIds = new Set(topicProblems.map((p: any) => p.id));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const topicSolves = solvedProgress.filter((p: any) => topicProblemIds.has(p.problem_id));
      const lastSolveDate =
        topicSolves.length > 0
          ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
            Math.max(...topicSolves.map((p: any) => new Date(p.updatedAt).getTime()))
          : 0;

      return {
        ...topic,
        solvedInTopic,
        totalInTopic,
        progress,
        lastSolveDate,
      };
    });

    const inProgress = topicStats
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .filter((t: any) => t.lastSolveDate > 0 && t.progress < 100)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .sort((a: any, b: any) => b.lastSolveDate - a.lastSolveDate);

    if (inProgress.length > 0) return inProgress[0];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const withProblems = topicStats.filter((t: any) => t.totalInTopic > 0);
    return withProblems.length > 0 ? withProblems[0] : null;
  }, [topics, problems, userProgress, solvedIds]);

  const nextGoals = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const goals: any[] = [];
    goals.push({
      title: `Reach Level ${level + 1}`,
      subtitle: 'XP Milestone',
      current: user.xp_points || 0,
      target: nextLevelXp,
      rewards: [`+${nextLevelXp - (user.xp_points || 0)} XP needed`],
    });

    const solvedMilestones = [5, 10, 25, 50, 100];
    const nextMilestone =
      solvedMilestones.find((m) => m > totalSolved) || solvedMilestones[solvedMilestones.length - 1];
    if (nextMilestone > totalSolved) {
      goals.push({
        title: `Solve ${nextMilestone} Problems`,
        subtitle: 'Problem Challenge',
        current: totalSolved,
        target: nextMilestone,
        rewards: ['Badge', `+${nextMilestone * 5} XP`],
      });
    }

    if (currentStreak < 7) {
      goals.push({
        title: '7-Day Streak',
        subtitle: 'Consistency Goal',
        current: currentStreak,
        target: 7,
        rewards: ['Streak Shield', '+100 XP'],
      });
    }

    return goals.slice(0, 2);
  }, [level, nextLevelXp, user.xp_points, totalSolved, currentStreak]);

  return (
    <section className="relative pt-36 pb-24 overflow-hidden bg-[#050505] text-white">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#fa6a20]/10 rounded-full blur-[140px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#00f0ff]/08 rounded-full blur-[140px] translate-y-1/3 -translate-x-1/3 pointer-events-none" />

      <div className="relative z-10 forge-shell">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <div className="eyebrow-pill mb-4">
            <span /> DASHBOARD // PERSONAL TELEMETRY
          </div>
          <h1 className="font-sans text-4xl sm:text-6xl font-bold tracking-tight mb-4">
            Welcome back, <span className="text-[#ffae62]">{user.name.split(' ')[0]}</span>.
          </h1>
          <p className="text-lg text-white/60 max-w-2xl">
            "Consistency is the key to algorithmic mastery. Keep forging forward each day."
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {[
            {
              label: 'Current Streak',
              value: currentStreak,
              suffix: ' Days',
              icon: Flame,
              color: '#fa6a20',
              subtext: currentStreak > 0 ? 'Keep it up!' : 'Solve today to start!',
            },
            {
              label: 'Total XP',
              value: user.xp_points || 0,
              icon: Zap,
              color: '#ffd700',
              subtext: `Level ${level}`,
            },
            {
              label: 'Problems Solved',
              value: totalSolved,
              icon: CheckCircle2,
              color: '#00f0ff',
              subtext: `${completionPercentage}% complete`,
            },
            {
              label: 'Global Rank',
              value: rank !== '--' ? rank : 0,
              prefix: rank !== '--' ? '#' : '',
              icon: Trophy,
              color: '#a088ff',
              subtext: `Top ${topPercent}%`,
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="doppelrand-shell p-1.5"
            >
              <div className="doppelrand-core p-6 relative group hover:bg-white/[0.03] transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-white/50 text-xs uppercase tracking-wider font-mono mb-1">{stat.label}</p>
                    <h3 className="text-3xl font-bold text-white">
                      <AnimatedStatNumber value={stat.value} prefix={stat.prefix || ''} suffix={stat.suffix || ''} />
                    </h3>
                  </div>
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center bg-white/5 group-hover:scale-110 transition-transform shadow-lg"
                    style={{ color: stat.color }}
                  >
                    <stat.icon className="w-6 h-6" />
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold" style={{ color: stat.color }}>
                  <span>{stat.subtext}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Layout: Main Activity + Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Resume Learning Card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="doppelrand-shell p-1.5"
            >
              <div className="doppelrand-core p-8 relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 bg-radial from-[#fa6a20]/15 via-[#0e0f14] to-[#0b0c10]">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Continue Learning</h3>
                  {continueTopicData ? (
                    <>
                      <p className="text-white/60 mb-6 max-w-md text-sm leading-relaxed">
                        You were actively studying <span className="text-[#ffae62] font-semibold">{continueTopicData.title}</span>.
                        {continueTopicData.progress > 0
                          ? ` ${continueTopicData.solvedInTopic}/${continueTopicData.totalInTopic} problems solved.`
                          : ' Ready to tackle the next algorithmic pattern?'}
                      </p>
                      <button
                        onClick={() => onTopicClick(continueTopicData.id || continueTopicData.id)}
                        className="btn-island"
                      >
                        Resume {continueTopicData.title.split(' ')[0]}
                        <span className="btn-island__icon">
                          <PlayCircle className="w-5 h-5" />
                        </span>
                      </button>
                    </>
                  ) : (
                    <>
                      <p className="text-white/60 mb-6 max-w-md text-sm leading-relaxed">
                        Start solving problems from any topic to track your algorithmic progress!
                      </p>
                      <button onClick={() => onTopicClick('')} className="btn-island">
                        Explore Topics
                        <span className="btn-island__icon">
                          <PlayCircle className="w-5 h-5" />
                        </span>
                      </button>
                    </>
                  )}
                </div>

                {/* Progress Ring */}
                <div className="relative w-32 h-32 flex-shrink-0">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="64" cy="64" r="54" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/10" />
                    <circle
                      cx="64"
                      cy="64"
                      r="54"
                      stroke="#fa6a20"
                      strokeWidth="8"
                      fill="transparent"
                      strokeDasharray={339.29}
                      strokeDashoffset={339.29 - (339.29 * (continueTopicData?.progress || completionPercentage)) / 100}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold font-mono text-white">
                      {continueTopicData?.progress ?? completionPercentage}%
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Activity Line Graph */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="doppelrand-shell p-1.5"
            >
              <div className="doppelrand-core p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2.5">
                    <Activity className="w-5 h-5 text-[#00f0ff]" />
                    Weekly Activity
                  </h3>
                  <span className="text-xs font-mono text-white/40 uppercase tracking-wider">Last 7 Days</span>
                </div>
                <div className="w-full h-48 relative">
                  <svg viewBox="0 0 340 130" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
                    <defs>
                      <linearGradient id="heroAreaGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.28" />
                        <stop offset="70%" stopColor="#00f0ff" stopOpacity="0.06" />
                        <stop offset="100%" stopColor="#00f0ff" stopOpacity="0.0" />
                      </linearGradient>
                      <filter id="heroGlow">
                        <feGaussianBlur stdDeviation="3.5" result="blur" />
                        <feMerge>
                          <feMergeNode in="blur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>

                    {[0, 1, 2, 3, 4].map((i) => (
                      <line
                        key={i}
                        x1="30"
                        y1={i * 22 + 10}
                        x2="320"
                        y2={i * 22 + 10}
                        stroke="white"
                        strokeOpacity="0.06"
                        strokeWidth="0.6"
                        strokeDasharray="4 4"
                      />
                    ))}

                    {[0, 1, 2, 3, 4].map((i) => {
                      const val = Math.round((maxActivity * (4 - i)) / 4);
                      return (
                        <text key={i} x="24" y={i * 22 + 13} textAnchor="end" fill="white" fillOpacity="0.3" fontSize="8" fontFamily="monospace">
                          {val}
                        </text>
                      );
                    })}

                    <motion.polygon
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1, delay: 0.6 }}
                      points={`40,100 ${weeklyActivity
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        .map((d: any, i: number) => {
                          const x = 40 + i * 46;
                          const y = maxActivity > 0 ? 100 - (d.count / maxActivity) * 82 : 100;
                          return `${x},${y}`;
                        })
                        .join(' ')} ${40 + 6 * 46},100`}
                      fill="url(#heroAreaGradient)"
                    />

                    <motion.polyline
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 1.4, delay: 0.5 }}
                      points={weeklyActivity
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        .map((d: any, i: number) => {
                          const x = 40 + i * 46;
                          const y = maxActivity > 0 ? 100 - (d.count / maxActivity) * 82 : 100;
                          return `${x},${y}`;
                        })
                        .join(' ')}
                      fill="none"
                      stroke="#00f0ff"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      filter="url(#heroGlow)"
                    />

                    {weeklyActivity.map((d: any, i: number) => {
                      const x = 40 + i * 46;
                      const y = maxActivity > 0 ? 100 - (d.count / maxActivity) * 82 : 100;
                      const isToday = i === 6;
                      return (
                        <g key={i}>
                          {isToday && <circle cx={x} cy={y} r={8} fill="#00f0ff" fillOpacity="0.2" />}
                          <motion.circle
                            initial={{ r: 0 }}
                            animate={{ r: isToday ? 4.5 : 3.5 }}
                            transition={{ duration: 0.3, delay: 0.7 + i * 0.1 }}
                            cx={x}
                            cy={y}
                            fill="#00f0ff"
                            stroke="#0a0b0e"
                            strokeWidth="2"
                          />
                          {d.count > 0 && (
                            <text x={x} y={y - 12} textAnchor="middle" fill="white" fillOpacity="0.8" fontSize="9" fontWeight="600" fontFamily="monospace">
                              {d.count}
                            </text>
                          )}
                        </g>
                      );
                    })}

                    {weeklyActivity.map((d: any, i: number) => {
                      const x = 40 + i * 46;
                      const isToday = i === 6;
                      return (
                        <text
                          key={'label' + i}
                          x={x}
                          y={118}
                          textAnchor="middle"
                          fill={isToday ? '#00f0ff' : 'white'}
                          fillOpacity={isToday ? 0.9 : 0.4}
                          fontSize="9"
                          fontWeight={isToday ? '700' : '500'}
                        >
                          {d.day}
                        </text>
                      );
                    })}
                  </svg>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar - Next Goals */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="doppelrand-shell p-1.5 h-fit"
          >
            <div className="doppelrand-core p-6">
              <h3 className="text-lg font-bold text-white mb-6">Next Goals</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-xs font-mono uppercase tracking-wider mb-2">
                    <span className="text-white/60">Reach Level {level + 1}</span>
                    <span className="text-[#ffd700]">
                      {user.xp_points || 0} / {nextLevelXp} XP
                    </span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progressToNextLevel}%` }}
                      transition={{ duration: 1, delay: 0.6 }}
                      className="h-full bg-[#ffd700] rounded-full"
                    />
                  </div>
                </div>

                {nextGoals.map((goal: any, index: number) => (
                  <div key={index} className="p-4 bg-white/[0.03] rounded-2xl border border-white/10">
                    <h4 className="font-semibold text-white text-sm mb-1">{goal.title}</h4>
                    <p className="text-xs text-white/50 mb-3">{goal.subtitle}</p>
                    {goal.target && (
                      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden mb-3">
                        <div
                          className="h-full bg-[#fa6a20] rounded-full"
                          style={{ width: `${Math.min((goal.current / goal.target) * 100, 100)}%` }}
                        />
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      {goal.rewards.map((reward: string, ri: number) => (
                        <span key={ri} className="text-[0.68rem] font-mono px-2 py-0.5 rounded-full bg-[#fa6a20]/20 text-[#ffae62] border border-[#fa6a20]/30">
                          {reward}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
