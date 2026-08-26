import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Github, ExternalLink, Sparkles } from 'lucide-react';
import { projects } from '../data/portfolioData';
import { Project } from '../types';
import { ProjectModal } from './ProjectModal';
import { CursorState } from './CustomCursor';

interface ProjectsProps {
  setCursorState: (state: CursorState) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ setCursorState }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-24 md:py-36 px-6 md:px-12 bg-bg-primary relative border-t border-border-subtle">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <span className="text-xs font-mono tracking-widest text-accent-gold uppercase">
              03 // FEATURED WORK
            </span>
            <h2 className="text-4xl sm:text-6xl font-display font-extrabold text-text-primary tracking-tight">
              SELECTED WORK
            </h2>
          </div>
          <p className="text-sm font-mono text-text-secondary max-w-md">
            Things I've built while learning, experimenting, and solving real computational problems.
          </p>
        </div>

        {/* Projects List */}
        <div className="space-y-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              onClick={() => setSelectedProject(project)}
              onMouseEnter={() => setCursorState({ type: 'project', label: 'VIEW' })}
              onMouseLeave={() => setCursorState({ type: 'default' })}
              className="group cursor-pointer rounded-3xl bg-bg-surface border border-border-subtle p-6 sm:p-10 hover:border-accent-amber/50 hover:bg-bg-card transition-all duration-500 shadow-xl overflow-hidden relative"
            >
              {/* Card Ambient Glow on Hover */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-accent-amber/5 rounded-full blur-3xl group-hover:bg-accent-amber/10 transition-all duration-700 pointer-events-none" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                
                {/* Left Content Column */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-mono font-bold text-accent-gold px-3 py-1 rounded-full bg-accent-amber/10 border border-accent-amber/20">
                      {project.number}
                    </span>
                    <span className="text-xs font-mono text-text-muted uppercase">Case Study</span>
                  </div>

                  <div>
                    <h3 className="text-2xl sm:text-4xl font-display font-extrabold text-text-primary group-hover:text-accent-gold transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-sm font-mono text-accent-gold/90 mt-2 font-medium">
                      {project.tagline}
                    </p>
                  </div>

                  <p className="text-base text-text-secondary leading-relaxed font-light line-clamp-3">
                    {project.description}
                  </p>

                  {/* Learned snippet */}
                  <div className="p-4 rounded-xl bg-bg-card border border-border-subtle/80 space-y-1">
                    <span className="text-[11px] font-mono text-text-muted uppercase tracking-wider block">WHAT I LEARNED</span>
                    <p className="text-xs text-text-secondary leading-normal">
                      {project.learned}
                    </p>
                  </div>

                  {/* Tech stack pills */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-md bg-bg-primary text-[11px] font-mono text-text-secondary border border-border-subtle"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action links */}
                  <div className="flex items-center gap-4 pt-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProject(project);
                      }}
                      className="inline-flex items-center gap-2 text-xs font-mono font-bold text-accent-gold group-hover:translate-x-1 transition-transform"
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
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-bg-card border border-border-subtle group-hover:border-accent-amber/30 transition-all duration-500">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transform group-hover:scale-108 transition-transform duration-700 ease-out filter contrast-[1.02]"
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
        setCursorState={setCursorState}
      />
    </section>
  );
};
