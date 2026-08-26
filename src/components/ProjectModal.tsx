import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, ExternalLink, CheckCircle2, ArrowRight } from 'lucide-react';
import { Project } from '../types';
import { CursorState } from './CustomCursor';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  setCursorState: (state: CursorState) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, setCursorState }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-bg-primary/90 backdrop-blur-xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl bg-bg-surface border border-border-subtle rounded-3xl overflow-hidden shadow-2xl z-10 max-h-[90vh] flex flex-col"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-border-subtle bg-bg-card">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-accent-gold font-bold">{project.number}</span>
              <span className="text-xs font-mono text-text-muted uppercase">PROJECT ARCHIVE CASE STUDY</span>
            </div>
            <button
              onClick={onClose}
              onMouseEnter={() => setCursorState({ type: 'hover', label: 'CLOSE' })}
              onMouseLeave={() => setCursorState({ type: 'default' })}
              aria-label="Close modal"
              className="p-2 rounded-full bg-bg-surface text-text-secondary hover:text-text-primary hover:bg-bg-primary transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Modal Content Scroll Body */}
          <div className="overflow-y-auto p-6 sm:p-10 space-y-8">
            {/* Image Preview */}
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-bg-card border border-border-subtle">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-surface via-transparent to-transparent opacity-60" />
            </div>

            {/* Title & Tagline */}
            <div className="space-y-3">
              <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-text-primary tracking-tight">
                {project.title}
              </h2>
              <p className="text-lg text-accent-gold font-display font-semibold">
                {project.tagline}
              </p>
              <p className="text-base text-text-secondary leading-relaxed font-light">
                {project.description}
              </p>
            </div>

            {/* Problem & Solution Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-border-subtle">
              <div className="space-y-2 p-5 rounded-2xl bg-bg-card/70 border border-border-subtle">
                <span className="text-xs font-mono text-accent-amber uppercase tracking-wider block">THE CHALLENGE</span>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {project.problem}
                </p>
              </div>

              <div className="space-y-2 p-5 rounded-2xl bg-bg-card/70 border border-border-subtle">
                <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider block">THE ARCHITECTURE</span>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {project.solution}
                </p>
              </div>
            </div>

            {/* What Was Learned */}
            <div className="p-6 rounded-2xl bg-accent-amber/5 border border-accent-amber/20 space-y-3">
              <div className="flex items-center gap-2 text-accent-gold font-display font-bold text-sm">
                <CheckCircle2 className="h-4 w-4" />
                <span>KEY LEARNINGS & TAKEAWAYS</span>
              </div>
              <p className="text-sm text-text-primary leading-relaxed font-light">
                {project.learned}
              </p>
            </div>

            {/* Tech Stack Pills */}
            <div className="space-y-3">
              <span className="text-xs font-mono text-text-muted uppercase tracking-widest block">TECHNOLOGY STACK</span>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-lg bg-bg-card border border-border-subtle text-xs font-mono text-accent-gold"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Links Footer */}
            <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-border-subtle">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => setCursorState({ type: 'open', label: 'GITHUB' })}
                onMouseLeave={() => setCursorState({ type: 'default' })}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-bg-card border border-border-subtle text-text-primary font-display font-semibold text-sm hover:border-accent-amber hover:text-accent-gold transition-all"
              >
                <Github className="h-4 w-4" /> VIEW SOURCE CODE
              </a>

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={() => setCursorState({ type: 'open', label: 'DEMO' })}
                  onMouseLeave={() => setCursorState({ type: 'default' })}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent-amber text-bg-primary font-display font-bold text-sm hover:bg-accent-gold transition-all"
                >
                  <ExternalLink className="h-4 w-4" /> LIVE DEMO <ArrowRight className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
