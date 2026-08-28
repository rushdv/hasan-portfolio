import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Brain, Cpu } from 'lucide-react';
import { skillCategories } from '../data/portfolioData';
import { CursorState } from './CustomCursor';

interface TechStackProps {
  setCursorState?: (state: CursorState) => void;
}

export const TechStack: React.FC<TechStackProps> = () => {
  const categoryIcons = [Code2, Brain, Cpu];

  return (
    <section id="tech-stack" className="py-24 md:py-32 px-6 md:px-12 bg-bg-surface/30 relative border-t border-border-subtle/60">
      <div className="max-w-7xl mx-auto space-y-14">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border-subtle/50 pb-8">
          <div className="space-y-2">
            <span className="text-xs font-mono tracking-widest text-accent-gold uppercase">
              02 // TECHNICAL CAPABILITIES
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-bold text-text-primary tracking-tight">
              TECH STACK & FOCUS
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-mono text-text-secondary max-w-md">
            Core technologies, active algorithms, and machine learning specializations shaping my engineering path.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, catIdx) => {
            const IconComponent = categoryIcons[catIdx % categoryIcons.length];
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: catIdx * 0.12 }}
                className="rounded-2xl bg-bg-card/90 p-7 border border-border-subtle/80 flex flex-col justify-between space-y-6 hover:border-accent-amber/40 transition-all duration-300 shadow-xl"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 rounded-xl bg-accent-amber/10 border border-accent-amber/20 text-accent-gold">
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <span className="text-[10px] font-mono text-text-muted tracking-widest uppercase">
                      CAT 0{catIdx + 1}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-display font-bold text-text-primary tracking-wide">
                      {category.title}
                    </h3>
                    <p className="text-xs font-mono text-text-secondary mt-1">
                      {category.subtitle}
                    </p>
                  </div>
                </div>

                {/* Skill Items */}
                <div className="space-y-2.5">
                  {category.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="group p-3 rounded-xl bg-bg-surface border border-border-subtle/50 hover:border-accent-amber/40 hover:bg-bg-card transition-all duration-200"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-display font-bold text-xs sm:text-sm text-text-primary group-hover:text-accent-gold transition-colors">
                          {skill.name}
                        </span>
                        <span className="text-[10px] font-mono text-accent-amber/70 opacity-80">
                          {catIdx === 0 ? 'Core' : catIdx === 1 ? 'Active' : 'Target'}
                        </span>
                      </div>
                      
                      <p className="text-xs text-text-secondary mt-0.5 font-light line-clamp-1">
                        {skill.description}
                      </p>
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
