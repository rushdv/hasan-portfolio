import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, Brain, Cpu, ChevronRight } from 'lucide-react';
import { skillCategories } from '../data/portfolioData';
import { CursorState } from './CustomCursor';

interface TechStackProps {
  setCursorState?: (state: CursorState) => void;
}

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
      className="py-24 md:py-36 px-6 md:px-12 bg-ink relative border-t border-border-subtle overflow-hidden text-warmPaper"
    >
      {/* Ambient glow */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent/4 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-14 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border-subtle pb-8"
        >
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-accent/60" />
              <span className="text-xs font-mono tracking-widest text-accent uppercase">
                03 // THE BUILDER
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-light text-warmPaper tracking-tight">
              TECHNICAL CAPABILITIES
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-mono text-warmGray max-w-sm leading-relaxed">
            Core languages, active algorithms, data pipelines, and machine learning specializations shaping my engineering path.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, catIdx) => {
            const IconComponent = categoryIcons[catIdx % categoryIcons.length];
            const color = categoryColors[catIdx % categoryColors.length];

            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.55, delay: catIdx * 0.12, ease: [0.22, 1, 0.36, 1] }}
                onMouseEnter={() => setCursorState?.({ type: 'hover' })}
                onMouseLeave={() => setCursorState?.({ type: 'default' })}
                className="rounded-2xl bg-bg-card border border-border-subtle flex flex-col justify-between p-7 space-y-6 transition-all duration-300 shadow-xl group hover:border-accent/40"
              >
                {/* Card Header */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-xl border border-border-subtle bg-bg-surface text-accent">
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <span className="text-[10px] font-mono font-bold tracking-widest px-3 py-1 rounded-full border border-accent/30 text-accent uppercase bg-accent/10">
                      {color.label}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-display font-light text-warmPaper tracking-wide">
                      {category.title}
                    </h3>
                    <p className="text-xs font-mono text-stone mt-1 leading-relaxed">
                      {category.subtitle}
                    </p>
                  </div>
                </div>

                {/* Skill Items */}
                <div className="space-y-3 pt-2">
                  {category.skills.map((skill, skillIdx) => {
                    const isHovered = hoveredSkill === `${catIdx}-${skillIdx}`;

                    return (
                      <motion.div
                        key={skill.name}
                        whileHover={{ x: 4 }}
                        transition={{ duration: 0.2 }}
                        onMouseEnter={() => {
                          setHoveredSkill(`${catIdx}-${skillIdx}`);
                          setCursorState?.({ type: 'hover', label: skill.name });
                        }}
                        onMouseLeave={() => {
                          setHoveredSkill(null);
                          setCursorState?.({ type: 'default' });
                        }}
                        className="group/skill p-3.5 rounded-xl bg-bg-surface border border-border-subtle/60 hover:border-accent/40 transition-all duration-200 cursor-default"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <ChevronRight className={`h-3.5 w-3.5 shrink-0 transition-colors duration-200 ${isHovered ? 'text-accent' : 'text-stone'}`} />
                            <span className="font-sans font-medium text-sm text-warmPaper group-hover/skill:text-accent transition-colors truncate">
                              {skill.name}
                            </span>
                          </div>
                        </div>

                        <p className="text-xs text-warmGray/70 mt-1 font-light leading-snug pl-6">
                          {skill.description}
                        </p>
                      </motion.div>
                    );
                  })}
                </div>
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
          className="flex flex-wrap items-center justify-center gap-8 pt-6 border-t border-border-subtle"
        >
          {[
            { label: 'Languages', count: '3' },
            { label: 'Frameworks & Tools', count: '6+' },
            { label: 'In Learning', count: '4' },
            { label: 'Target Specialization', count: 'AI / ML' },
          ].map(({ label, count }) => (
            <div key={label} className="text-center space-y-0.5">
              <span className="block text-2xl font-display font-light text-accent">{count}</span>
              <span className="block text-[10px] font-mono text-stone uppercase tracking-widest">{label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
