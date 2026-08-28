import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Clock } from 'lucide-react';
import { roadmapSteps } from '../data/portfolioData';
import { CursorState } from './CustomCursor';

interface LearningRoadmapProps {
  setCursorState?: (state: CursorState) => void;
}

export const LearningRoadmap: React.FC<LearningRoadmapProps> = () => {
  return (
    <section id="learning" className="py-24 md:py-32 px-6 md:px-12 bg-bg-primary relative border-t border-border-subtle/60">
      <div className="max-w-7xl mx-auto space-y-14">
        
        {/* Section Header */}
        <div className="space-y-2 border-b border-border-subtle/50 pb-6">
          <span className="text-xs font-mono tracking-widest text-accent-gold uppercase">
            08 // ROADMAP & GROWTH
          </span>
          <h2 className="text-4xl sm:text-5xl font-display font-extrabold text-text-primary tracking-tight">
            WHAT I'M LEARNING RIGHT NOW
          </h2>
        </div>

        {/* Pipeline Vertical Node Diagram */}
        <div className="relative max-w-4xl mx-auto space-y-8">
          
          {/* Central Connecting Drawing Line */}
          <div className="absolute top-0 bottom-0 left-6 sm:left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-accent-amber via-accent-amber/50 to-border-subtle z-0" />

          {roadmapSteps.map((node, index) => {
            const isCompleted = node.status === 'completed';
            const isInProgress = node.status === 'in-progress';
            const isLeft = index % 2 === 0;

            return (
              <motion.div
                key={node.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className={`relative z-10 flex flex-col sm:flex-row items-start sm:items-center ${
                  isLeft ? 'sm:flex-row-reverse' : ''
                }`}
              >
                {/* Content Box */}
                <div className="w-full sm:w-1/2 pl-16 sm:pl-0 sm:px-8">
                  <div
                    className={`p-6 rounded-2xl bg-bg-card border transition-all duration-300 shadow-xl ${
                      isInProgress
                        ? 'border-accent-amber shadow-accent-amber/10 bg-gradient-to-br from-bg-card via-bg-card to-accent-amber/5'
                        : isCompleted
                        ? 'border-border-subtle hover:border-accent-amber/40'
                        : 'border-border-subtle/50 opacity-70'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <span className="text-xs font-mono font-bold text-accent-gold">
                        PHASE 0{node.step}
                      </span>
                      <span
                        className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full uppercase ${
                          isCompleted
                            ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/40'
                            : isInProgress
                            ? 'bg-accent-amber/20 text-accent-gold border border-accent-amber/40 animate-pulse'
                            : 'bg-bg-surface text-text-muted border border-border-subtle'
                        }`}
                      >
                        {node.status}
                      </span>
                    </div>

                    <h3 className="text-lg font-display font-bold text-text-primary">
                      {node.title}
                    </h3>

                    <p className="text-xs text-text-secondary mt-2 leading-relaxed font-light">
                      {node.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-4">
                      {node.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded-md bg-bg-surface text-[10px] font-mono text-text-secondary border border-border-subtle/60"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Node Center Marker */}
                <div className="absolute left-6 sm:left-1/2 -translate-x-1/2 flex items-center justify-center h-10 w-10 rounded-full bg-bg-primary border-2 border-accent-amber shadow-lg z-20">
                  {isCompleted ? (
                    <CheckCircle2 className="h-5 w-5 text-accent-gold" />
                  ) : isInProgress ? (
                    <Clock className="h-5 w-5 text-accent-amber animate-spin-slow" />
                  ) : (
                    <span className="h-2.5 w-2.5 rounded-full bg-text-muted" />
                  )}
                </div>

                <div className="hidden sm:block w-1/2" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
