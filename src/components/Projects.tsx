import React, { useState } from 'react';
import { motion } from 'framer-motion';
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

  return (
    <section
      id="projects"
      className="py-24 md:py-32 px-6 md:px-12 bg-bg-primary relative border-t border-border-subtle/60 overflow-hidden"
    >
      {/* Ambient */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-accent-amber/3 rounded-full blur-[130px] pointer-events-none -translate-y-1/2" />

      <div className="max-w-7xl mx-auto space-y-14 relative z-10">

        {/* Section Header */}
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
                03 // FEATURED WORK
              </span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-display font-extrabold text-text-primary tracking-tight">
              SELECTED WORK
            </h2>
          </div>
          <div className="flex flex-col items-start md:items-end gap-2">
            <p className="text-xs sm:text-sm font-mono text-text-secondary max-w-sm">
              Software projects built while exploring algorithms, data pipelines, and machine learning models.
            </p>
            <span className="text-xs font-mono text-accent-gold border border-accent-amber/20 bg-accent-amber/5 px-3 py-1 rounded-full">
              {projects.length} CASE STUDIES
            </span>
          </div>
        </motion.div>

        {/* Projects List */}
        <div className="space-y-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -3 }}
              onClick={() => {
                setSelectedProject(project);
                setCursorState?.({ type: 'default' });
              }}
              onMouseEnter={() => setCursorState?.({ type: 'project' })}
              onMouseLeave={() => setCursorState?.({ type: 'default' })}
              className="group cursor-pointer rounded-2xl bg-bg-surface/80 border border-border-subtle/80 p-6 sm:p-8 hover:border-accent-amber/40 hover:bg-bg-card hover:shadow-2xl hover:shadow-accent-amber/5 transition-all duration-300 relative overflow-hidden"
            >
              {/* Hover glow line */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-amber/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

                {/* Left Content */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-xs font-mono font-bold text-accent-gold px-3 py-1 rounded-full bg-accent-amber/10 border border-accent-amber/20">
                      {project.number}
                    </span>
                    <span className="text-[10px] font-mono text-text-muted uppercase tracking-wider">CASE STUDY</span>
                    {project.liveUrl && project.liveUrl !== project.githubUrl && (
                      <span className="text-[10px] font-mono text-emerald-400 border border-emerald-800/40 bg-emerald-950/30 px-2 py-0.5 rounded-full">
                        LIVE
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-text-primary group-hover:text-accent-gold transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-mono text-accent-amber mt-1">
                      {project.tagline}
                    </p>
                  </div>

                  <p className="text-sm text-text-secondary leading-relaxed font-light line-clamp-2">
                    {project.description}
                  </p>

                  {/* Key takeaway */}
                  <div className="p-3 rounded-xl bg-bg-card border border-border-subtle/70">
                    <span className="text-[10px] font-mono text-text-muted uppercase tracking-wider block mb-1">KEY TAKEAWAY</span>
                    <p className="text-xs text-text-secondary leading-relaxed line-clamp-2">{project.learned}</p>
                  </div>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-md bg-bg-primary text-[10px] font-mono text-text-secondary border border-border-subtle/60 group-hover:border-border-subtle transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-4 pt-1">
                    <button
                      onClick={(e) => { e.stopPropagation(); setSelectedProject(project); }}
                      onMouseEnter={() => setCursorState?.({ type: 'open', label: 'CASE STUDY' })}
                      onMouseLeave={() => setCursorState?.({ type: 'project' })}
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-accent-gold hover:text-accent-warm transition-colors"
                    >
                      VIEW CASE STUDY <ArrowUpRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </button>
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        onMouseEnter={() => setCursorState?.({ type: 'open', label: 'GITHUB' })}
                        onMouseLeave={() => setCursorState?.({ type: 'project' })}
                        className="p-2 rounded-lg bg-bg-card border border-border-subtle text-text-secondary hover:text-accent-gold hover:border-accent-amber/40 transition-all"
                      >
                        <Github className="h-3.5 w-3.5" />
                      </a>
                    )}
                    {project.liveUrl && project.liveUrl !== project.githubUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        onMouseEnter={() => setCursorState?.({ type: 'open', label: 'LIVE DEMO' })}
                        onMouseLeave={() => setCursorState?.({ type: 'project' })}
                        className="p-2 rounded-lg bg-bg-card border border-border-subtle text-text-secondary hover:text-emerald-400 hover:border-emerald-800/60 transition-all"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Right Image */}
                <div className="lg:col-span-5">
                  <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-bg-card border border-border-subtle group-hover:border-accent-amber/25 transition-colors duration-300">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transform group-hover:scale-[1.04] transition-transform duration-600 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/70 via-transparent to-transparent opacity-70 group-hover:opacity-40 transition-opacity duration-300" />
                    {/* Project number overlay */}
                    <div className="absolute bottom-3 right-3 font-display font-black text-5xl text-white/5 select-none pointer-events-none leading-none">
                      {project.number}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Details Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        setCursorState={setCursorState}
      />
    </section>
  );
};
