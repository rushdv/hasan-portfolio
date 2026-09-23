import React from 'react';
import { motion } from 'framer-motion';
import { Award, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { certificates } from '../data/portfolioData';
import type { CursorState } from './CustomCursor';

interface CertificatesProps {
  setCursorState: (state: CursorState) => void;
}

const COLORS = [
  { gradient: 'from-amber-500/8', border: 'border-amber-500/20', accent: 'text-amber-400', bg: 'bg-amber-950/30' },
  { gradient: 'from-blue-500/8',  border: 'border-blue-500/20',  accent: 'text-blue-400',  bg: 'bg-blue-950/30' },
  { gradient: 'from-purple-500/8',border: 'border-purple-500/20',accent: 'text-purple-400',bg: 'bg-purple-950/30'},
  { gradient: 'from-emerald-500/8',border:'border-emerald-500/20',accent:'text-emerald-400',bg:'bg-emerald-950/30'},
];

export const Certificates: React.FC<CertificatesProps> = ({ setCursorState }) => {
  return (
    <section
      id="certificates"
      className="py-16 md:py-28 px-5 sm:px-6 md:px-12 bg-ink relative border-t border-[#2C2B27] overflow-hidden text-warmPaper"
    >
      <div className="absolute bottom-0 left-1/4 w-[260px] sm:w-[400px] h-[200px] sm:h-[300px] bg-accent/4 rounded-full blur-[80px] sm:blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-10 sm:space-y-12 relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div className="space-y-2">
            <span className="h-px w-8 bg-accent/60 block" />
            <span className="font-mono text-[10px] tracking-widest text-accent uppercase block">
              Credentials &amp; recognition
            </span>
            <h2
              className="font-display font-light text-warmPaper"
              style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}
            >
              Certificates &amp; Tracks
            </h2>
          </div>
          <p className="font-mono text-xs text-warmGray max-w-sm leading-relaxed">
            Verified certifications and active learning achievements across software engineering &amp; data foundations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {certificates.map((cert, idx) => {
            const c = COLORS[idx % COLORS.length];
            return (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4 }}
                onMouseEnter={() => setCursorState({ type: 'open', label: 'VERIFY' })}
                onMouseLeave={() => setCursorState({ type: 'default' })}
                className={`group relative p-6 rounded-2xl bg-gradient-to-br ${c.gradient} to-transparent bg-bg-card border ${c.border} hover:shadow-xl transition-all duration-300 overflow-hidden`}
              >
                {/* Watermark */}
                <div className={`absolute top-4 right-4 opacity-8 group-hover:opacity-15 transition-opacity pointer-events-none`}>
                  <Award className={`h-14 w-14 ${c.accent}`} />
                </div>

                <div className="relative z-10 space-y-4">
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className={`p-1.5 rounded-lg ${c.bg} border ${c.border}`}>
                      <ShieldCheck className={`h-3.5 w-3.5 ${c.accent}`} />
                    </div>
                    <span className={`font-mono text-xs font-bold ${c.accent}`}>{cert.year}</span>
                    <span className="font-mono text-[10px] text-warmGray/60">// {cert.issuer}</span>
                  </div>

                  <h3 className={`font-display font-light text-warmPaper group-hover:${c.accent} transition-colors text-xl leading-snug`}>
                    {cert.title}
                  </h3>

                  <div className="flex flex-wrap gap-1.5">
                    {cert.skills.map(skill => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 rounded-md bg-bg-surface font-mono text-[10px] text-warmGray border border-border-subtle"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noreferrer"
                      className={`inline-flex items-center gap-1.5 font-mono text-xs font-bold ${c.accent} hover:opacity-75 transition-opacity`}
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
