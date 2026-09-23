import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Clock, Circle, Rocket } from 'lucide-react';
import { roadmapSteps } from '../data/portfolioData';
import type { CursorState } from './CustomCursor';

interface LearningRoadmapProps {
  setCursorState?: (state: CursorState) => void;
}

export const LearningRoadmap: React.FC<LearningRoadmapProps> = ({ setCursorState }) => {
  const completed   = roadmapSteps.filter(s => s.status === 'completed').length;
  const inProgress  = roadmapSteps.filter(s => s.status === 'in-progress').length;
  const progressPct = Math.round(((completed + inProgress * 0.5) / roadmapSteps.length) * 100);

  return (
    <section
      id="learning"
      className="py-16 md:py-28 px-5 sm:px-6 md:px-12 bg-charcoal relative border-t border-[#2C2B27] overflow-hidden text-warmPaper"
    >
      <div className="absolute top-1/2 right-0 w-[260px] sm:w-[400px] h-[260px] sm:h-[400px] bg-accent/4 rounded-full blur-[80px] sm:blur-[140px] pointer-events-none -translate-y-1/2" />

      <div className="max-w-7xl mx-auto space-y-10 sm:space-y-12 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8 border-b border-[#2C2B27] pb-6 sm:pb-8"
        >
          <div className="space-y-2">
            <span className="h-px w-8 bg-accent/60 block" />
            <span className="font-mono text-[10px] tracking-widest text-accent uppercase block">
              AI / ML learning path
            </span>
            <h2
              className="font-display font-light text-warmPaper"
              style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}
            >
              Roadmap &amp; Growth
            </h2>
          </div>

          {/* Overall progress */}
          <div className="space-y-2 min-w-[200px]">
            <div className="flex items-center justify-between font-mono text-[11px]">
              <span className="text-warmGray/60">OVERALL PROGRESS</span>
              <span className="text-accent font-bold">{progressPct}%</span>
            </div>
            <div className="h-px bg-[#2C2B27] overflow-hidden rounded">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${progressPct}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="h-full bg-accent"
              />
            </div>
            <div className="flex items-center gap-4 font-mono text-[10px] text-warmGray/60">
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-warmGray block" />
                {completed} done
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse block" />
                {inProgress} active
              </span>
            </div>
          </div>
        </motion.div>

        {/* Steps */}
        <div className="relative pl-7 sm:pl-14 space-y-0">
          <div className="absolute left-2.5 sm:left-5 top-2 bottom-2 w-px bg-gradient-to-b from-accent/60 via-accent/25 to-transparent" />

          {roadmapSteps.map((step, idx) => {
            const isDone = step.status === 'completed';
            const isActive = step.status === 'in-progress';

            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: -14 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                onMouseEnter={() => setCursorState?.({ type: 'hover' })}
                onMouseLeave={() => setCursorState?.({ type: 'default' })}
                className={`relative py-6 border-b border-[#2C2B27] last:border-b-0 transition-opacity ${
                  !isDone && !isActive ? 'opacity-50 hover:opacity-70' : ''
                }`}
              >
                {/* Node */}
                <div className="absolute -left-8 sm:-left-14 top-7 flex items-center justify-center w-6 h-6">
                  {isDone ? (
                    <div className="w-6 h-6 rounded-full bg-charcoal border border-emerald-500/60 flex items-center justify-center shadow-sm shadow-emerald-500/20">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                    </div>
                  ) : isActive ? (
                    <div className="w-6 h-6 rounded-full bg-charcoal border border-accent flex items-center justify-center shadow-sm shadow-accent/20">
                      <Clock className="h-3.5 w-3.5 text-accent" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-charcoal border border-[#2C2B27] flex items-center justify-center">
                      <Circle className="h-3 w-3 text-warmGray/30" />
                    </div>
                  )}
                </div>

                {/* Card */}
                <div className={`p-5 rounded-xl border transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-br from-accent/5 to-[#1B1A19] border-accent/35 shadow-lg shadow-accent/5'
                    : isDone
                    ? 'bg-[#1B1A19] border-[#2C2B27] hover:border-accent/25'
                    : 'bg-[#141413] border-[#2C2B27]/60'
                }`}>
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[10px] text-accent font-bold">
                        PHASE 0{step.step}
                      </span>
                      <h3 className="font-display font-light text-warmPaper text-lg leading-tight">
                        {step.title.charAt(0) + step.title.slice(1).toLowerCase()}
                      </h3>
                    </div>
                    <span className={`font-mono text-[10px] px-2.5 py-1 rounded-full border shrink-0 self-start ${
                      isDone
                        ? 'bg-emerald-950/50 text-emerald-400 border-emerald-800/40'
                        : isActive
                        ? 'bg-accent/12 text-accent border-accent/35'
                        : 'bg-[#141413] text-warmGray/50 border-[#2C2B27]'
                    }`}>
                      {step.status}
                    </span>
                  </div>

                  <p className="font-sans text-sm text-warmGray font-light leading-relaxed mb-4">
                    {step.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {step.technologies.map(tech => (
                      <span
                        key={tech}
                        className={`font-mono text-[10px] px-2 py-0.5 rounded border transition-colors ${
                          isActive
                            ? 'bg-accent/10 text-accent border-accent/25'
                            : 'bg-[#141413] text-warmGray/70 border-[#2C2B27]/70'
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

          {/* End node */}
          <div className="relative py-4">
            <div className="absolute -left-8 sm:-left-14 top-5 w-6 h-6 rounded-full bg-charcoal border border-[#2C2B27]/50 flex items-center justify-center">
              <Rocket className="h-3 w-3 text-warmGray/30" />
            </div>
            <p className="font-mono text-xs text-warmGray/40 italic">
              // To be continued — the journey evolves.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
