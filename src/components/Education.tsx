import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, CheckCircle } from 'lucide-react';
import { educationHistory } from '../data/portfolioData';
import { CursorState } from './CustomCursor';

interface EducationProps {
  setCursorState?: (state: CursorState) => void;
}

export const Education: React.FC<EducationProps> = () => {
  return (
    <section id="education" className="py-24 md:py-32 px-6 md:px-12 bg-bg-surface/30 relative border-t border-border-subtle/60">
      <div className="max-w-7xl mx-auto space-y-14">
        
        {/* Header */}
        <div className="space-y-2 border-b border-border-subtle/50 pb-6">
          <span className="text-xs font-mono tracking-widest text-accent-gold uppercase">
            06 // ACADEMICS & DEGREES
          </span>
          <h2 className="text-4xl sm:text-5xl font-display font-extrabold text-text-primary tracking-tight">
            EDUCATION
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative pl-6 sm:pl-10 space-y-10 border-l border-accent-amber/30">
          {educationHistory.map((edu, idx) => (
            <motion.div
              key={edu.institution}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="relative space-y-5 bg-bg-card p-6 sm:p-8 rounded-2xl border border-border-subtle/80 hover:border-accent-amber/40 transition-all shadow-xl"
            >
              {/* Timeline Pin Node */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-8 h-5 w-5 rounded-full bg-bg-primary border-2 border-accent-amber flex items-center justify-center">
                <div className="h-2 w-2 rounded-full bg-accent-gold" />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border-subtle/60 pb-4">
                <div>
                  <span className="text-xs font-mono text-accent-gold font-bold px-3 py-1 rounded-full bg-accent-amber/10 border border-accent-amber/20">
                    {edu.period}
                  </span>
                  <h3 className="text-2xl font-display font-bold text-text-primary mt-2">
                    {edu.degree}
                  </h3>
                  <p className="text-sm font-mono text-text-secondary mt-0.5">
                    {edu.institution}
                  </p>
                </div>
                <div className="text-xs font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-3 py-1.5 rounded-xl self-start sm:self-auto">
                  {edu.status}
                </div>
              </div>

              {/* Coursework list */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono text-accent-gold">
                  <BookOpen className="h-4 w-4" />
                  <span>KEY COURSEWORK & ACADEMIC MODULES</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                  {edu.courses.map((course) => (
                    <div
                      key={course}
                      className="p-3 rounded-xl bg-bg-surface border border-border-subtle/60 text-xs font-mono text-text-secondary flex items-center gap-2"
                    >
                      <CheckCircle className="h-3.5 w-3.5 text-accent-amber shrink-0" />
                      <span>{course}</span>
                    </div>
                  ))}
                </div>
              </div>

              {edu.highlight && (
                <p className="text-xs text-text-muted italic pt-2 border-t border-border-subtle/50">
                  {edu.highlight}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
