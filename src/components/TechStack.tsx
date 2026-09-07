import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, Brain, Cpu, ChevronRight } from 'lucide-react';
import { skillCategories } from '../data/portfolioData';
import { CursorState } from './CustomCursor';

interface TechStackProps {
  setCursorState?: (state: CursorState) => void;
}

// Skill level dots per category index
const skillLevels: Record<number, number[]> = {
  0: [5, 4, 3, 4, 4],       // Core: C, Python, HTML/CSS, Git, GitHub
  1: [3, 3, 3, 2],           // Learning: DSA, NumPy, Pandas, ML
  2: [1, 1, 1, 1],           // Future
};

const categoryColors = [
  { border: 'hover:border-emerald-500/40', dot: 'bg-emerald-400', tag: 'text-emerald-400 bg-emerald-950/50 border-emerald-800/40', label: 'CORE' },
  { border: 'hover:border-accent-amber/40', dot: 'bg-accent-amber', tag: 'text-accent-gold bg-accent-amber/10 border-accent-amber/30', label: 'ACTIVE' },
  { border: 'hover:border-blue-500/40', dot: 'bg-blue-400', tag: 'text-blue-300 bg-blue-950/50 border-blue-800/40', label: 'FUTURE' },
];

const categoryIcons = [Code2, Brain, Cpu];

export const TechStack: React.FC<TechStackProps> = ({ setCursorState }) => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <section
      id="tech-stack"
      className="py-24 md:py-32 px-6 md:px-12 bg-bg-surface relative border-t border-border-subtle/60 overflow-hidden"
    >
      {/* Ambient */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent-amber/4 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-14 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border-subtle/50 pb-8"
        >
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-accent-amber/60" />
              <span className="text-xs font-mono tracking-widest text-accent-gold uppercase">
                02 // TECHNICAL CAPABILITIES
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-bold text-text-primary tracking-tight">
              TECH STACK & FOCUS
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-mono text-text-secondary max-w-sm leading-relaxed">
            Core technologies, active algorithms, and machine learning specializations shaping my engineering path.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, catIdx) => {
            const IconComponent = categoryIcons[catIdx % categoryIcons.length];
            const color = categoryColors[catIdx % categoryColors.length];
            const levels = skillLevels[catIdx] ?? [];

            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.55, delay: catIdx * 0.12, ease: [0.22, 1, 0.36, 1] }}
                onMouseEnter={() => setCursorState?.({ type: 'hover' })}
                onMouseLeave={() => setCursorState?.({ type: 'default' })}
                className={`rounded-2xl bg-bg-card border border-border-subtle/80 flex flex-col space-y-6 transition-all duration-300 shadow-xl overflow-hidden group ${color.border}`}
              >
                {/* Card Header */}
                <div className="p-6 pb-0 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`p-2.5 rounded-xl border ${color.tag} transition-colors`}>
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border ${color.tag}`}>
                      {color.label}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-display font-bold text-text-primary tracking-wide">
                      {category.title}
                    </h3>
                    <p className="text-xs font-mono text-text-secondary mt-1 leading-relaxed">
                      {category.subtitle}
                    </p>
                  </div>
                </div>

                {/* Skill Items */}
                <div className="px-4 pb-5 space-y-2">
                  {category.skills.map((skill, skillIdx) => {
                    const level = levels[skillIdx] ?? 0;
                    const isHovered = hoveredSkill === `${catIdx}-${skillIdx}`;

                    return (
                      <motion.div
                        key={skill.name}
                        whileHover={{ x: 3 }}
                        transition={{ duration: 0.2 }}
                        onMouseEnter={() => {
                          setHoveredSkill(`${catIdx}-${skillIdx}`);
                          setCursorState?.({ type: 'hover', label: skill.name });
                        }}
                        onMouseLeave={() => {
                          setHoveredSkill(null);
                          setCursorState?.({ type: 'default' });
                        }}
                        className="group/skill p-3 rounded-xl bg-bg-surface border border-border-subtle/40 hover:border-accent-amber/30 hover:bg-bg-card transition-all duration-200 cursor-default"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2 min-w-0">
                            <ChevronRight className={`h-3 w-3 shrink-0 transition-colors duration-200 ${isHovered ? 'text-accent-amber' : 'text-text-muted/40'}`} />
                            <span className="font-display font-bold text-xs sm:text-sm text-text-primary group-hover/skill:text-accent-gold transition-colors truncate">
                              {skill.name}
                            </span>
                          </div>

                          {/* Level dots */}
                          {level > 0 && (
                            <div className="flex items-center gap-1 shrink-0">
                              {[...Array(5)].map((_, dotIdx) => (
                                <span
                                  key={dotIdx}
                                  className={`rounded-full transition-all duration-300 ${
                                    dotIdx < level
                                      ? `w-1.5 h-1.5 ${color.dot} opacity-90`
                                      : 'w-1.5 h-1.5 bg-border-subtle opacity-40'
                                  }`}
                                />
                              ))}
                            </div>
                          )}
                        </div>

                        <p className="text-[11px] text-text-muted mt-1 font-light leading-snug pl-5 line-clamp-1">
                          {skill.description}
                        </p>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Bottom accent bar */}
                <div className={`h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-transparent via-current to-transparent transition-all duration-500 ${color.dot} opacity-30`} />
              </motion.div>
            );
          })}
        </div>

        {/* Bottom summary row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-6 pt-4 border-t border-border-subtle/40"
        >
          {[
            { label: 'Languages', count: '3' },
            { label: 'Frameworks & Tools', count: '6+' },
            { label: 'In Learning', count: '4' },
            { label: 'Target Stack', count: '4' },
          ].map(({ label, count }) => (
            <div key={label} className="text-center space-y-0.5">
              <span className="block text-xl font-display font-extrabold text-accent-gold">{count}</span>
              <span className="block text-[10px] font-mono text-text-muted uppercase tracking-wider">{label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
