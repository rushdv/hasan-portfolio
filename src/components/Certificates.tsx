import React from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink, ArrowUpRight } from 'lucide-react';
import { certificates } from '../data/portfolioData';
import { CursorState } from './CustomCursor';

interface CertificatesProps {
  setCursorState: (state: CursorState) => void;
}

export const Certificates: React.FC<CertificatesProps> = ({ setCursorState }) => {
  return (
    <section id="certificates" className="py-24 md:py-36 px-6 md:px-12 bg-bg-primary relative border-t border-border-subtle">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <span className="text-xs font-mono tracking-widest text-accent-gold uppercase">
              07 // CREDENTIALS
            </span>
            <h2 className="text-4xl sm:text-6xl font-display font-extrabold text-text-primary tracking-tight">
              CERTIFICATES & TRACKS
            </h2>
          </div>
          <p className="text-sm font-mono text-text-secondary max-w-md">
            Verified certifications and active learning achievements across software engineering & data foundations.
          </p>
        </div>

        {/* Certificates Minimal List */}
        <div className="space-y-4">
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={() => setCursorState({ type: 'open', label: 'VERIFY' })}
              onMouseLeave={() => setCursorState({ type: 'default' })}
              className="group p-6 sm:p-8 rounded-2xl bg-bg-surface border border-border-subtle hover:border-accent-amber/50 hover:bg-bg-card transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-md"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-accent-gold font-bold">{cert.year}</span>
                  <span className="text-xs font-mono text-text-muted">// {cert.issuer}</span>
                </div>
                <h3 className="text-xl font-display font-bold text-text-primary group-hover:text-accent-gold transition-colors">
                  {cert.title}
                </h3>
                <div className="flex flex-wrap gap-2 pt-1">
                  {cert.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-0.5 rounded-md bg-bg-card text-[10px] font-mono text-text-secondary border border-border-subtle"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {cert.credentialUrl && (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-bg-card border border-border-subtle text-xs font-mono font-bold text-text-primary group-hover:border-accent-amber group-hover:text-accent-gold transition-all self-start md:self-auto shrink-0"
                >
                  VERIFY CREDENTIAL <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
