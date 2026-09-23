import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Github, ExternalLink } from 'lucide-react';
import { projects } from '../data/portfolioData';
import { Project } from '../types';
import { ProjectModal } from './ProjectModal';
import { CursorState } from './CustomCursor';

interface ProjectsProps {
  setCursorState?: (state: CursorState) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ setCursorState }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section
      id="projects"
      className="py-20 md:py-36 px-5 sm:px-6 md:px-12 bg-charcoal relative border-t border-border-subtle overflow-hidden text-warmPaper"
    >
      <div className="max-w-7xl mx-auto space-y-10 sm:space-y-14 relative z-10">

        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border-subtle pb-8 sm:pb-10"
        >
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-accent/60" />
              <span className="text-xs font-mono tracking-widest text-accent uppercase">
                04 // SELECTED WORK
              </span>
            </div>
            <h2
              className="font-display font-light text-warmPaper tracking-tight"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.8rem)' }}
            >
              Featured Projects
            </h2>
          </div>
          <p className="text-xs font-mono text-stone max-w-xs leading-relaxed">
            Software, algorithms, data pipelines, and machine learning engines — {projects.length} case studies.
          </p>
        </motion.div>

        {/* ── Project list — editorial rows ── */}
        <div>
          {projects.map((project, index) => {
            const isHovered = hoveredId === project.id;
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => {
                  setSelectedProject(project);
                  setCursorState?.({ type: 'default' });
                }}
                onMouseEnter={() => {
                  setHoveredId(project.id);
                  setCursorState?.({ type: 'project' });
                }}
                onMouseLeave={() => {
                  setHoveredId(null);
                  setCursorState?.({ type: 'default' });
                }}
                className="group cursor-pointer grid grid-cols-12 gap-4 sm:gap-6 md:gap-10 py-6 sm:py-8 border-b border-border-subtle hover:border-accent/20 transition-colors duration-300 items-start"
              >
                {/* Number — large structural element */}
                <div className="col-span-2 md:col-span-1 pt-1">
                  <span
                    className="font-display font-light text-warmPaper/15 group-hover:text-accent/25 transition-colors duration-500 leading-none select-none"
                    style={{ fontSize: 'clamp(1.75rem, 4vw, 3.5rem)' }}
                  >
                    {project.number}
                  </span>
                </div>

                {/* Main content */}
                <div className="col-span-10 md:col-span-7 space-y-3.5 sm:space-y-4">
                  {/* Title row */}
                  <div className="space-y-1">
                    <h3
                      className="font-display font-light text-warmPaper group-hover:text-accent transition-colors duration-300 leading-tight"
                      style={{ fontSize: 'clamp(1.35rem, 3vw, 2.2rem)' }}
                    >
                      {project.title}
                    </h3>
                    <p className="font-mono text-[10px] text-accent/70 uppercase tracking-wider">
                      {project.tagline}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-warmGray/75 font-light leading-relaxed line-clamp-2">
                    {project.description}
                  </p>

                  {/* Mobile Preview Image */}
                  <div className="md:hidden pt-1">
                    <div className="relative overflow-hidden rounded-xl bg-bg-card border border-border-subtle aspect-[16/9]">
                      <img
                        src={project.image}
                        alt={project.title}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent pointer-events-none" />
                    </div>
                  </div>

                  {/* Tech stack — flat mono tags, no pills */}
                  <div className="flex flex-wrap gap-x-3.5 gap-y-1">
                    {project.techStack.map((tech) => (
                      <span key={tech} className="font-mono text-[10px] text-stone">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div
                    className="flex flex-wrap items-center gap-4 sm:gap-6 pt-1"
                    onClick={e => e.stopPropagation()}
                  >
                    <button
                      onClick={() => {
                        setSelectedProject(project);
                        setCursorState?.({ type: 'default' });
                      }}
                      onMouseEnter={() => setCursorState?.({ type: 'open', label: 'CASE STUDY' })}
                      onMouseLeave={() => setCursorState?.({ type: 'project' })}
                      className="inline-flex items-center gap-1.5 font-mono text-xs text-accent/80 hover:text-accent transition-colors py-1"
                    >
                      Case Study <ArrowUpRight className="h-3.5 w-3.5" />
                    </button>
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        onMouseEnter={() => setCursorState?.({ type: 'open', label: 'GITHUB' })}
                        onMouseLeave={() => setCursorState?.({ type: 'project' })}
                        className="font-mono text-xs text-stone hover:text-warmGray transition-colors flex items-center gap-1.5 py-1"
                      >
                        <Github className="h-3.5 w-3.5" /> GitHub
                      </a>
                    )}
                    {project.liveUrl && project.liveUrl !== project.githubUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        onMouseEnter={() => setCursorState?.({ type: 'open', label: 'LIVE' })}
                        onMouseLeave={() => setCursorState?.({ type: 'project' })}
                        className="font-mono text-xs text-stone hover:text-warmGray transition-colors flex items-center gap-1.5 py-1"
                      >
                        <ExternalLink className="h-3.5 w-3.5" /> Live
                      </a>
                    )}
                  </div>
                </div>

                {/* Project image — right column, revealed on hover */}
                <div className="hidden md:block md:col-span-4">
                  <motion.div
                    animate={{ opacity: isHovered ? 1 : 0.35, scale: isHovered ? 1 : 0.98 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="relative overflow-hidden bg-bg-card"
                    style={{ aspectRatio: '16/9' }}
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent pointer-events-none" />
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Project details modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            key={selectedProject.id}
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
            setCursorState={setCursorState}
          />
        )}
      </AnimatePresence>
    </section>
  );
};
