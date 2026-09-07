import React from 'react';
import { motion } from 'framer-motion';
import { Award, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { certificates } from '../data/portfolioData';
import { CursorState } from './CustomCursor';

interface CertificatesProps {
  setCursorState: (state: CursorState) => void;
}

const certColors = [
  'from-amber-500/10 to-transparent border-amber-500/20',
  'from-blue-500/10 to-transparent border-blue-500/20',
  'from-purple-500/10 to-transparent border-purple-500/20',
  'from-emerald-500/10 to-transparent border-emerald-500/20',
];

const certAccents = [
  'text-amber-400',
  'text-blue-400',
  'text-purple-400',
  'text-emerald-400',
];

export const Certificates: React.FC<CertificatesProps> = ({ setCursorState }) => {
  return (
    <section
      id="certificates"
      className="py-24 md:py-32 px-6 md:px-12 bg-bg-primary relative border-t border-border-subtle overflow-hidden"
    >
      {/* Ambient */}
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[300px] bg-accent-amber/4 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-14 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-accent-amber/60" />
              <span className="text-xs font-mono tracking-widest text-accent-gold uppercase">
                07 // CREDENTIALS
              </span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-display font-extrabold text-text-primary tracking-tight">
              CERTIFICATES & TRACKS
            </h2>
          </div>
          <p className="text-sm font-mono text-text-secondary max-w-sm leading-relaxed">
            Verified certifications and active learning achievements across software engineering & data foundations.
          </p>
        </motion.div>

        {/* Certificate cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {certificates.map((cert, index) => {
            const color = certColors[index % certColors.length];
            const accent = certAccents[index % certAccents.length];

            return (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4 }}
                onMouseEnter={() => setCursorState({ type: 'open', label: 'VERIFY' })}
                onMouseLeave={() => setCursorState({ type: 'default' })}
                className={`group relative p-6 rounded-2xl bg-gradient-to-br ${color} bg-bg-surface border hover:shadow-xl transition-all duration-300 overflow-hidden`}
              >
                {/* Corner award icon */}
                <div className="absolute top-5 right-5 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Award className={`h-16 w-16 ${accent}`} />
                </div>

                <div className="relative z-10 space-y-4">
                  {/* Top meta */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className={`p-1.5 rounded-lg bg-current/10 border border-current/20 ${accent}`}>
                      <ShieldCheck className="h-3.5 w-3.5" />
                    </div>
                    <span className={`text-xs font-mono font-bold ${accent}`}>{cert.year}</span>
                    <span className="text-xs font-mono text-text-muted">// {cert.issuer}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-display font-bold text-text-primary group-hover:text-accent-gold transition-colors leading-snug">
                    {cert.title}
                  </h3>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-1.5">
                    {cert.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 rounded-md bg-bg-card text-[10px] font-mono text-text-secondary border border-border-subtle/60"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Verify link */}
                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noreferrer"
                      className={`inline-flex items-center gap-1.5 text-xs font-mono font-bold ${accent} hover:opacity-80 transition-opacity`}
                    >
                      VERIFY CREDENTIAL
                      <ArrowUpRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
