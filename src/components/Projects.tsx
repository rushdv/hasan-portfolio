import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Github } from 'lucide-react';
import { projects } from '../data/portfolioData';
import { Project } from '../types';
import { ProjectModal } from './ProjectModal';
import { CursorState } from './CustomCursor';

interface ProjectsProps {
  setCursorState?: (state: CursorState) => void;
}

export const Projects: React.FC<ProjectsProps> = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-24 md:py-32 px-6 md:px-12 bg-bg-primary relative border-t border-border-subtle/60">
      <div className="max-w-7xl mx-auto space-y-14">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border-subtle/50 pb-8">
          <div className="space-y-2">
            <span className="text-xs font-mono tracking-widest text-accent-gold uppercase">
              03 // FEATURED WORK
            </span>
            <h2 className="text-4xl sm:text-6xl font-display font-extrabold text-text-primary tracking-tight">
              SELECTED WORK
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-mono text-text-secondary max-w-md">
            Software projects built while exploring algorithms, database engines, data pipelines, and machine learning models.
          </p>
        </div>

        {/* Projects List */}
        <div className="space-y-10">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              onClick={() => setSelectedProject(project)}
              className="group cursor-pointer rounded-2xl bg-bg-surface/80 border border-border-subtle/80 p-6 sm:p-8 hover:border-accent-amber/50 hover:bg-bg-card transition-all duration-300 shadow-xl relative overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                
                {/* Left Content Column */}
                <div className="lg:col-span-7 space-y-5">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold text-accent-gold px-3 py-1 rounded-full bg-accent-amber/10 border border-accent-amber/20">
                      {project.number}
                    </span>
                    <span className="text-[11px] font-mono text-text-muted uppercase">CASE STUDY</span>
                  </div>

                  <div>
                    <h3 className="text-2xl sm:text-3xl font-display font-bold text-text-primary group-hover:text-accent-gold transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-mono text-accent-amber mt-1 font-medium">
                      {project.tagline}
                    </p>
                  </div>

                  <p className="text-sm text-text-secondary leading-relaxed font-light line-clamp-2">
                    {project.description}
                  </p>

                  {/* Learned snippet */}
                  <div className="p-3.5 rounded-xl bg-bg-card border border-border-subtle/70 space-y-0.5">
                    <span className="text-[10px] font-mono text-text-muted uppercase tracking-wider block">KEY TAKEAWAY</span>
                    <p className="text-xs text-text-secondary leading-normal">
                      {project.learned}
                    </p>
                  </div>

                  {/* Tech stack pills */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-md bg-bg-primary text-[11px] font-mono text-text-secondary border border-border-subtle/60"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action links */}
                  <div className="flex items-center gap-4 pt-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProject(project);
                      }}
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-accent-gold group-hover:translate-x-1 transition-transform"
                    >
                      VIEW CASE STUDY <ArrowUpRight className="h-4 w-4" />
                    </button>
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-2 rounded-lg bg-bg-card border border-border-subtle text-text-secondary hover:text-accent-gold transition-colors"
                        aria-label="GitHub Repository"
                      >
                        <Github className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Right Image Column */}
                <div className="lg:col-span-5">
                  <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-bg-card border border-border-subtle group-hover:border-accent-amber/30 transition-all duration-300">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out filter contrast-[1.02]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/80 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
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
      />
    </section>
  );
};
