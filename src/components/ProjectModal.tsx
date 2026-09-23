import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, ExternalLink, ArrowRight } from 'lucide-react';
import { Project } from '../types';
import { CursorState } from './CustomCursor';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  setCursorState?: (state: CursorState) => void;
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
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-4xl bg-bg-surface border border-border-subtle overflow-hidden z-10 max-h-[90vh] flex flex-col rounded-2xl sm:rounded-3xl shadow-2xl"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-5 sm:px-6 py-3.5 sm:py-4 border-b border-border-subtle bg-bg-card">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-accent">{project.number}</span>
              <span className="h-3 w-px bg-border-subtle" />
              <span className="text-xs font-mono text-text-muted uppercase tracking-widest">Case Study</span>
            </div>
            <button
              onClick={onClose}
              onMouseEnter={() => setCursorState?.({ type: 'hover', label: 'CLOSE' })}
              onMouseLeave={() => setCursorState?.({ type: 'default' })}
              aria-label="Close modal"
              className="p-2 text-text-secondary hover:text-text-primary transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Modal Content Scroll Body */}
          <div className="overflow-y-auto p-5 sm:p-8 md:p-10 space-y-6 sm:space-y-8">

            {/* Image Preview — no rounded corners, full bleed editorial */}
            <div className="relative overflow-hidden bg-bg-card" style={{ aspectRatio: '16 / 9' }}>
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-surface/60 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Title & Tagline — consistent with portfolio font weight */}
            <div className="space-y-3">
              <h2
                className="font-display font-light text-text-primary tracking-tight"
                style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}
              >
                {project.title}
              </h2>
              <p className="text-xs font-mono text-accent uppercase tracking-wider">
                {project.tagline}
              </p>
              <p className="text-sm text-text-secondary leading-relaxed font-light border-l border-accent/30 pl-4 mt-2">
                {project.description}
              </p>
            </div>

            {/* Problem & Solution — editorial two-column, no arbitrary colors */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-border-subtle">
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-accent uppercase tracking-widest block">
                  The Challenge
                </span>
                <p className="text-sm text-text-secondary leading-relaxed font-light">
                  {project.problem}
                </p>
              </div>
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-text-muted uppercase tracking-widest block">
                  The Approach
                </span>
                <p className="text-sm text-text-secondary leading-relaxed font-light">
                  {project.solution}
                </p>
              </div>
            </div>

            {/* What Was Learned — clean editorial inset, no icon clutter */}
            <div className="pt-4 border-t border-border-subtle space-y-2">
              <span className="text-[10px] font-mono text-text-muted uppercase tracking-widest block">
                Key Learnings
              </span>
              <p className="text-sm text-text-primary leading-relaxed font-light">
                {project.learned}
              </p>
            </div>

            {/* Tech Stack */}
            <div className="space-y-3">
              <span className="text-[10px] font-mono text-text-muted uppercase tracking-widest block">
                Technology Stack
              </span>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-bg-card border border-border-subtle text-[11px] font-mono text-text-secondary"
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
                onMouseEnter={() => setCursorState?.({ type: 'open', label: 'GITHUB' })}
                onMouseLeave={() => setCursorState?.({ type: 'default' })}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-bg-card border border-border-subtle text-text-primary font-mono text-xs hover:border-accent/50 hover:text-accent transition-all"
              >
                <Github className="h-4 w-4" /> Source Code
              </a>

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={() => setCursorState?.({ type: 'open', label: 'DEMO' })}
                  onMouseLeave={() => setCursorState?.({ type: 'default' })}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-bg-primary font-mono text-xs hover:bg-accent-gold transition-all"
                >
                  <ExternalLink className="h-4 w-4" /> Live Demo <ArrowRight className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
