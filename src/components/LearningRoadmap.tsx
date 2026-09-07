import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Clock, Circle, Rocket } from 'lucide-react';
import { roadmapSteps } from '../data/portfolioData';
import { CursorState } from './CustomCursor';

interface LearningRoadmapProps {
  setCursorState?: (state: CursorState) => void;
}

export const LearningRoadmap: React.FC<LearningRoadmapProps> = ({ setCursorState }) => {
  const completedCount = roadmapSteps.filter(s => s.status === 'completed').length;
  const inProgressCount = roadmapSteps.filter(s => s.status === 'in-progress').length;
  const progressPct = Math.round(
    ((completedCount + inProgressCount * 0.5) / roadmapSteps.length) * 100
  );

  return (
    <section
      id="learning"
      className="py-24 md:py-32 px-6 md:px-12 bg-bg-surface relative border-t border-border-subtle/60 overflow-hidden"
    >
      {/* Ambient */}
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-accent-amber/4 rounded-full blur-[130px] pointer-events-none -translate-y-1/2" />

      <div className="max-w-7xl mx-auto space-y-14 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-6 border-b border-border-subtle/50 pb-8"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-accent-amber/60" />
                <span className="text-xs font-mono tracking-widest text-accent-gold uppercase">
                  08 // ROADMAP & GROWTH
                </span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-text-primary tracking-tight">
                LEARNING RIGHT NOW
              </h2>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono text-text-muted">
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-emerald-400" /> Completed ({completedCount})</span>
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-accent-amber animate-pulse" /> In Progress ({inProgressCount})</span>
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-border-subtle" /> Upcoming</span>
            </div>
          </div>

          {/* Overall progress bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-text-muted">
              <span>OVERALL PROGRESS</span>
              <span className="text-accent-gold font-bold">{progressPct}%</span>
            </div>
            <div className="h-1.5 bg-bg-primary rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${progressPct}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="h-full rounded-full bg-gradient-to-r from-accent-amber via-accent-gold to-accent-warm"
              />
            </div>
          </div>
        </motion.div>

        {/* Roadmap — vertical left-aligned for all screens */}
        <div className="relative pl-8 sm:pl-14 space-y-6">
          {/* Vertical connecting line */}
          <div className="absolute left-3 sm:left-5 top-3 bottom-3 w-px bg-gradient-to-b from-accent-amber/80 via-accent-amber/30 to-border-subtle/20" />

          {roadmapSteps.map((node, index) => {
            const isCompleted = node.status === 'completed';
            const isInProgress = node.status === 'in-progress';

            return (
              <motion.div
                key={node.step}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}
                onMouseEnter={() => setCursorState?.({ type: 'hover', label: node.title })}
                onMouseLeave={() => setCursorState?.({ type: 'default' })}
                className="relative"
              >
                {/* Node marker */}
                <div className="absolute -left-[29px] sm:-left-[45px] top-5 z-10">
                  <div
                    className={`h-6 w-6 rounded-full flex items-center justify-center border-2 transition-all shadow-lg ${
                      isCompleted
                        ? 'bg-emerald-950 border-emerald-500 shadow-emerald-500/20'
                        : isInProgress
                        ? 'bg-bg-primary border-accent-amber shadow-accent-amber/20'
                        : 'bg-bg-primary border-border-subtle'
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                    ) : isInProgress ? (
                      <Clock className="h-3.5 w-3.5 text-accent-amber" />
                    ) : (
                      <Circle className="h-3 w-3 text-text-muted/30" />
                    )}
                  </div>
                </div>

                {/* Content card */}
                <div
                  className={`p-5 sm:p-6 rounded-2xl border transition-all duration-300 ${
                    isInProgress
                      ? 'bg-gradient-to-br from-accent-amber/5 to-bg-card border-accent-amber/40 shadow-lg shadow-accent-amber/5'
                      : isCompleted
                      ? 'bg-bg-card border-border-subtle hover:border-accent-amber/30'
                      : 'bg-bg-card/50 border-border-subtle/40 opacity-60'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono font-bold text-accent-gold">
                        PHASE 0{node.step}
                      </span>
                      <h3 className="text-base sm:text-lg font-display font-bold text-text-primary">
                        {node.title}
                      </h3>
                    </div>
                    <span
                      className={`text-[10px] font-mono px-2.5 py-1 rounded-full border uppercase shrink-0 self-start ${
                        isCompleted
                          ? 'bg-emerald-950/60 text-emerald-400 border-emerald-800/40'
                          : isInProgress
                          ? 'bg-accent-amber/15 text-accent-gold border-accent-amber/40 animate-pulse'
                          : 'bg-bg-surface text-text-muted border-border-subtle'
                      }`}
                    >
                      {node.status}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-light mb-4">
                    {node.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {node.technologies.map((tech) => (
                      <span
                        key={tech}
                        className={`px-2 py-0.5 rounded-md text-[10px] font-mono border transition-colors ${
                          isInProgress
                            ? 'bg-accent-amber/10 text-accent-gold border-accent-amber/20'
                            : 'bg-bg-surface text-text-secondary border-border-subtle/60'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}

          {/* End of roadmap node */}
          <div className="relative pl-1">
            <div className="absolute -left-[29px] sm:-left-[45px] top-3 z-10 h-6 w-6 rounded-full bg-bg-primary border-2 border-border-subtle/40 flex items-center justify-center">
              <Rocket className="h-3 w-3 text-text-muted/40" />
            </div>
            <p className="text-xs font-mono text-text-muted italic py-3 pl-2">
              // To be continued — the journey evolves.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
