import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, CheckCircle, GraduationCap } from 'lucide-react';
import { educationHistory } from '../data/portfolioData';
import { CursorState } from './CustomCursor';

interface EducationProps {
  setCursorState?: (state: CursorState) => void;
}

export const Education: React.FC<EducationProps> = ({ setCursorState }) => {
  return (
    <section
      id="education"
      className="py-24 md:py-32 px-6 md:px-12 bg-bg-surface relative border-t border-border-subtle/60 overflow-hidden"
    >
      {/* Ambient */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent-amber/4 rounded-full blur-[130px] pointer-events-none" />

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
                06 // ACADEMICS & DEGREES
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-display font-extrabold text-text-primary tracking-tight">
              EDUCATION
            </h2>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-950/30 border border-emerald-800/40 self-start md:self-auto">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono text-emerald-400">CURRENTLY ENROLLED</span>
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="relative pl-8 sm:pl-14 space-y-10">
          {/* Vertical line */}
          <div className="absolute left-3 sm:left-5 top-2 bottom-2 w-px bg-gradient-to-b from-accent-amber/60 via-accent-amber/30 to-transparent" />

          {educationHistory.map((edu, idx) => (
            <motion.div
              key={edu.institution}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: idx * 0.15, ease: [0.22, 1, 0.36, 1] }}
              onMouseEnter={() => setCursorState?.({ type: 'hover' })}
              onMouseLeave={() => setCursorState?.({ type: 'default' })}
              className="relative rounded-2xl bg-bg-card border border-border-subtle/80 hover:border-accent-amber/40 transition-all duration-300 shadow-xl overflow-hidden group"
            >
              {/* Top glow line on hover */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-amber/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Timeline node */}
              <div className="absolute -left-[30px] sm:-left-[46px] top-8 z-10">
                <div className="h-6 w-6 rounded-full bg-bg-primary border-2 border-accent-amber shadow-lg shadow-accent-amber/20 flex items-center justify-center">
                  <GraduationCap className="h-3 w-3 text-accent-amber" />
                </div>
              </div>

              {/* Card header */}
              <div className="p-6 sm:p-8 pb-0">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-5 border-b border-border-subtle/60">
                  <div className="space-y-1.5">
                    <span className="inline-block text-xs font-mono text-accent-gold font-bold px-3 py-1 rounded-full bg-accent-amber/10 border border-accent-amber/20">
                      {edu.period}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-display font-bold text-text-primary mt-2 group-hover:text-accent-gold transition-colors">
                      {edu.degree}
                    </h3>
                    <p className="text-sm font-mono text-text-secondary">{edu.institution}</p>
                  </div>
                  <div className="text-xs font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-3 py-1.5 rounded-xl self-start whitespace-nowrap">
                    {edu.status}
                  </div>
                </div>
              </div>

              {/* Coursework */}
              <div className="p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono text-accent-gold">
                  <BookOpen className="h-3.5 w-3.5" />
                  <span>KEY COURSEWORK & ACADEMIC MODULES</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                  {edu.courses.map((course, courseIdx) => (
                    <motion.div
                      key={course}
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: courseIdx * 0.05 }}
                      className="p-2.5 rounded-lg bg-bg-surface border border-border-subtle/50 hover:border-accent-amber/30 transition-colors flex items-center gap-2 group/course"
                    >
                      <CheckCircle className="h-3 w-3 text-accent-amber shrink-0 opacity-70 group-hover/course:opacity-100 transition-opacity" />
                      <span className="text-[11px] font-mono text-text-secondary group-hover/course:text-text-primary transition-colors">{course}</span>
                    </motion.div>
                  ))}
                </div>

                {edu.highlight && (
                  <p className="text-xs text-text-muted italic pt-3 border-t border-border-subtle/40 leading-relaxed">
                    ✦ {edu.highlight}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
