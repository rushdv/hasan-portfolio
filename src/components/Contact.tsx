import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Instagram, Facebook, ArrowUpRight, Copy, Check, Send, MapPin } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { CursorState } from './CustomCursor';

interface ContactProps {
  setCursorState: (state: CursorState) => void;
}

export const Contact: React.FC<ContactProps> = ({ setCursorState }) => {
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.socials.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    // Simulate send — wire to EmailJS or similar
    setTimeout(() => { setSending(false); setSent(true); }, 1500);
  };

  const socials = [
    { icon: Github, href: personalInfo.socials.github, label: 'GitHub' },
    { icon: Linkedin, href: personalInfo.socials.linkedin, label: 'LinkedIn' },
    { icon: Instagram, href: personalInfo.socials.instagram, label: 'Instagram' },
    { icon: Facebook, href: personalInfo.socials.facebook, label: 'Facebook' },
  ];

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section
      id="contact"
      className="py-24 md:py-36 px-6 md:px-12 bg-ink relative border-t border-border-subtle overflow-hidden text-warmPaper"
    >
      {/* Ambient glow */}
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[400px] bg-accent/6 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start"
        >

          {/* ── LEFT — Big callout ── */}
          <div className="lg:col-span-6 space-y-8">
            <motion.div variants={itemVariants} className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-accent/60" />
                <span className="text-xs font-mono tracking-widest text-accent uppercase">
                  09 // INITIATE CONVERSATION
                </span>
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 border border-accent/30 text-[11px] font-mono text-accent">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent animate-ping" />
                  AVAILABLE FOR PROJECTS & COLLABORATIONS
                </span>
              </div>
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="text-4xl sm:text-6xl xl:text-7xl font-display font-light tracking-tight text-warmPaper uppercase leading-[0.93]"
            >
              LET'S BUILD <br />
              SOMETHING <br />
              <span className="text-accent font-serif italic lowercase tracking-normal">
                extraordinary.
              </span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-warmGray max-w-sm font-light leading-relaxed"
            >
              Have an idea, research project, software opportunity, or photography collaboration? Reach out directly.
            </motion.p>

            {/* Location / Institution */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-4 text-xs font-mono text-stone"
            >
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3 w-3 text-accent" />
                {personalInfo.location}
              </span>
              <span className="h-3 w-px bg-border-subtle" />
              <span>{personalInfo.institution}</span>
            </motion.div>

            {/* Social links */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-2 pt-2">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={() => setCursorState({ type: 'open', label: label.toUpperCase() })}
                  onMouseLeave={() => setCursorState({ type: 'default' })}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-bg-card border border-border-subtle text-xs font-mono text-warmGray hover:text-accent hover:border-accent/40 transition-all duration-300"
                >
                  <Icon className="h-3.5 w-3.5 text-accent" />
                  {label}
                </a>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT — Contact form + email ── */}
          <div className="lg:col-span-6 space-y-6">
            {/* Email row */}
            <motion.div variants={itemVariants} className="space-y-2">
              <span className="text-[10px] font-mono text-stone uppercase tracking-widest block">DIRECT EMAIL ADDRESS</span>
              <div className="flex items-center justify-between p-4 rounded-2xl bg-bg-card border border-border-subtle hover:border-accent/30 transition-colors shadow-lg">
                <a
                  href={`mailto:${personalInfo.socials.email}`}
                  onMouseEnter={() => setCursorState({ type: 'open', label: 'MAIL' })}
                  onMouseLeave={() => setCursorState({ type: 'default' })}
                  className="font-mono text-sm text-warmPaper hover:text-accent transition-colors truncate"
                >
                  {personalInfo.socials.email}
                </a>
                <button
                  onClick={handleCopyEmail}
                  onMouseEnter={() => setCursorState({ type: 'hover', label: 'COPY' })}
                  onMouseLeave={() => setCursorState({ type: 'default' })}
                  className="p-2 rounded-lg bg-bg-surface text-warmGray hover:text-accent transition-all shrink-0 ml-2 border border-border-subtle"
                >
                  {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
              {copied && (
                <motion.span
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs font-mono text-emerald-400 block"
                >
                  ✓ Email copied to clipboard!
                </motion.span>
              )}
            </motion.div>

            {/* Contact Form */}
            <motion.form
              variants={itemVariants}
              onSubmit={handleSubmit}
              className="space-y-4 p-6 sm:p-8 rounded-2xl bg-bg-card border border-border-subtle shadow-xl"
            >
              <p className="text-[10px] font-mono text-stone uppercase tracking-widest">SEND A DIRECT MESSAGE</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-[10px] font-mono text-stone uppercase tracking-wider">Your Name</label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formState.name}
                    onChange={e => setFormState(s => ({ ...s, name: e.target.value }))}
                    onFocus={() => setCursorState({ type: 'hover' })}
                    onBlur={() => setCursorState({ type: 'default' })}
                    placeholder="Mehedi Hasan"
                    className="w-full px-4 py-3 rounded-xl bg-bg-surface border border-border-subtle focus:border-accent/50 focus:outline-none text-sm text-warmPaper placeholder:text-stone font-mono transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-[10px] font-mono text-stone uppercase tracking-wider">Email Address</label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formState.email}
                    onChange={e => setFormState(s => ({ ...s, email: e.target.value }))}
                    onFocus={() => setCursorState({ type: 'hover' })}
                    onBlur={() => setCursorState({ type: 'default' })}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-xl bg-bg-surface border border-border-subtle focus:border-accent/50 focus:outline-none text-sm text-warmPaper placeholder:text-stone font-mono transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="message" className="text-[10px] font-mono text-stone uppercase tracking-wider">Message</label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={formState.message}
                  onChange={e => setFormState(s => ({ ...s, message: e.target.value }))}
                  onFocus={() => setCursorState({ type: 'hover' })}
                  onBlur={() => setCursorState({ type: 'default' })}
                  placeholder="Tell me about your project or idea..."
                  className="w-full px-4 py-3 rounded-xl bg-bg-surface border border-border-subtle focus:border-accent/50 focus:outline-none text-sm text-warmPaper placeholder:text-stone font-mono transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={sending || sent}
                onMouseEnter={() => setCursorState({ type: 'hover', label: sent ? 'SENT!' : 'SEND' })}
                onMouseLeave={() => setCursorState({ type: 'default' })}
                className={`w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full font-mono font-bold text-xs tracking-wider transition-all duration-300 ${
                  sent
                    ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-400'
                    : 'bg-accent text-ink hover:bg-accent-gold shadow-lg shadow-accent/20'
                }`}
              >
                {sent ? (
                  <>✓ MESSAGE SENT!</>
                ) : sending ? (
                  <>
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="h-4 w-4 border-2 border-ink/30 border-t-ink rounded-full inline-block"
                    />
                    SENDING...
                  </>
                ) : (
                  <>
                    SEND MESSAGE <Send className="h-4 w-4" />
                  </>
                )}
              </button>
            </motion.form>

            {/* Quick mailto CTA */}
            <motion.a
              variants={itemVariants}
              href={`mailto:${personalInfo.socials.email}`}
              onMouseEnter={() => setCursorState({ type: 'open', label: 'EMAIL' })}
              onMouseLeave={() => setCursorState({ type: 'default' })}
              className="group flex items-center justify-between w-full px-6 py-4 rounded-2xl border border-border-subtle hover:border-accent/40 hover:bg-bg-card transition-all duration-300"
            >
              <div className="flex items-center gap-3 text-xs font-mono text-warmGray group-hover:text-accent transition-colors">
                <Mail className="h-4 w-4 text-accent" />
                Prefer direct email client? Click to open
              </div>
              <ArrowUpRight className="h-4 w-4 text-stone group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
