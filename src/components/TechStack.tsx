import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Code2, Brain, Cpu } from 'lucide-react';
import { skillCategories } from '../data/portfolioData';
import { CursorState } from './CustomCursor';

interface TechStackProps {
  setCursorState: (state: CursorState) => void;
}

export const TechStack: React.FC<TechStackProps> = ({ setCursorState }) => {
  const categoryIcons = [Code2, Brain, Cpu];

  return (
    <section id="tech-stack" className="py-24 md:py-36 px-6 md:px-12 bg-bg-surface/50 relative border-t border-border-subtle">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <span className="text-xs font-mono tracking-widest text-accent-gold uppercase">
              02 // TECHNICAL CAPABILITIES
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-text-primary tracking-tight">
              TECH STACK & FOCUS
            </h2>
          </div>
          <p className="text-sm font-mono text-text-secondary max-w-md">
            No synthetic percentage bars—only real frameworks, core languages, and evolving machine learning pillars.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, catIdx) => {
            const IconComponent = categoryIcons[catIdx % categoryIcons.length];
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: catIdx * 0.15 }}
                className="rounded-2xl bg-bg-card p-8 border border-border-subtle flex flex-col justify-between space-y-8 hover:border-accent-amber/30 transition-all duration-300"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-xl bg-accent-amber/10 text-accent-gold">
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <span className="text-xs font-mono text-text-muted uppercase">CAT 0{catIdx + 1}</span>
                  </div>

                  <div>
                    <h3 className="text-xl font-display font-bold text-text-primary tracking-wide">
                      {category.title}
                    </h3>
                    <p className="text-xs font-mono text-text-secondary mt-1">
                      {category.subtitle}
                    </p>
                  </div>
                </div>

                {/* Interactive Tags List */}
                <div className="space-y-3">
                  {category.skills.map((skill) => (
                    <div
                      key={skill.name}
                      onMouseEnter={() => setCursorState({ type: 'hover', label: skill.name })}
                      onMouseLeave={() => setCursorState({ type: 'default' })}
                      className="group p-3.5 rounded-xl bg-bg-surface border border-border-subtle/70 hover:border-accent-amber/50 hover:bg-bg-cardHover transition-all duration-300 cursor-pointer"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-display font-bold text-sm text-text-primary group-hover:text-accent-gold transition-colors">
                          {skill.name}
                        </span>
                        <ArrowRight className="h-4 w-4 text-text-muted group-hover:text-accent-amber group-hover:translate-x-1 transition-all duration-300" />
                      </div>
                      
                      <p className="text-xs text-text-secondary mt-1 font-light line-clamp-1">
                        {skill.description}
                      </p>

                      {skill.linkText && (
                        <span className="inline-block text-[11px] font-mono text-accent-gold/80 mt-2 opacity-0 group-hover:opacity-100 transform -translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                          {skill.linkText}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
