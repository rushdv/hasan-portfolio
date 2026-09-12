import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, ShieldCheck, Lock, LogOut } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { CursorState } from './CustomCursor';

interface NavbarProps {
  setCursorState: (state: CursorState) => void;
  isAdminAuthenticated?: boolean;
  onOpenAdminAuthModal?: () => void;
  onLogoutAdmin?: () => void;
}

const navLinks = [
  { name: 'ABOUT',       href: '#about' },
  { name: 'WORK',        href: '#projects' },
  { name: 'TRAVEL',      href: '#travel' },
  { name: 'PHOTOGRAPHY', href: '#photography' },
  { name: 'LEARNING',    href: '#learning' },
  { name: 'CONTACT',     href: '#contact' },
];

export const Navbar: React.FC<NavbarProps> = ({
  setCursorState,
  isAdminAuthenticated = false,
  onOpenAdminAuthModal,
  onLogoutAdmin,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Active section tracking via IntersectionObserver
  useEffect(() => {
    const sectionIds = navLinks.map(l => l.href.replace('#', ''));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: '-40% 0px -55% 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach(o => o.disconnect());
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'py-3 bg-bg-primary/85 backdrop-blur-xl border-b border-border-subtle/70 shadow-2xl shadow-black/30'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">

          {/* Logo */}
          <a
            href="#"
            onMouseEnter={() => setCursorState({ type: 'hover', label: 'HOME' })}
            onMouseLeave={() => setCursorState({ type: 'default' })}
            className="group flex items-center gap-3"
          >
            <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-bg-card border border-border-subtle text-accent-amber font-display font-extrabold text-xs group-hover:border-accent-amber group-hover:bg-accent-amber/10 transition-all duration-300">
              {personalInfo.shortName}
            </div>
            <span className="hidden sm:block font-display tracking-wider text-sm font-semibold text-text-primary group-hover:text-accent-gold transition-colors">
              MEHEDI HASAN
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => {
              const sectionId = link.href.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onMouseEnter={() => setCursorState({ type: 'hover' })}
                  onMouseLeave={() => setCursorState({ type: 'default' })}
                  className="relative text-[11px] font-mono tracking-widest py-1 group transition-colors"
                >
                  <span className={`transition-colors duration-200 ${isActive ? 'text-accent-gold' : 'text-text-secondary hover:text-text-primary'}`}>
                    {link.name}
                  </span>
                  {/* Active underline */}
                  <span
                    className={`absolute bottom-0 left-0 h-px bg-accent-amber transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                  {/* Active dot */}
                  {isActive && (
                    <motion.span
                      layoutId="nav-dot"
                      className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-accent-amber"
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right controls */}
          <div className="hidden md:flex items-center gap-4">
            {isAdminAuthenticated && (
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/30 text-accent text-xs font-mono">
                <ShieldCheck className="h-3 w-3" />
                <span>ADMIN</span>
                <button
                  onClick={onLogoutAdmin}
                  className="ml-1 text-stone hover:text-rose-400 transition-colors"
                  title="Logout"
                >
                  <LogOut className="h-3 w-3" />
                </button>
              </div>
            )}

            <a
              href="#contact"
              onMouseEnter={() => setCursorState({ type: 'hover', label: 'TALK' })}
              onMouseLeave={() => setCursorState({ type: 'default' })}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-[11px] font-mono tracking-wider font-semibold rounded-full bg-accent/10 border border-accent/30 text-accent hover:bg-accent hover:text-ink transition-all duration-300"
            >
              LET'S TALK <ArrowUpRight className="h-3 w-3" />
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className="md:hidden p-2 rounded-lg bg-bg-card border border-border-subtle text-text-primary hover:text-accent-amber transition-colors"
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileMenuOpen ? (
                <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <X className="h-5 w-5" />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <Menu className="h-5 w-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-30 bg-bg-primary/96 backdrop-blur-2xl md:hidden flex flex-col pt-20 px-8 pb-10"
          >
            {/* Top meta row */}
            <div className="flex items-center justify-between mb-8 text-[10px] font-mono text-text-muted uppercase tracking-widest">
              <span>NAVIGATION</span>
              {isAdminAuthenticated ? (
                <span className="text-emerald-400 flex items-center gap-1.5">
                  <ShieldCheck className="h-3 w-3" /> Admin Active
                </span>
              ) : (
                <button
                  onClick={() => { setMobileMenuOpen(false); onOpenAdminAuthModal?.(); }}
                  className="text-accent-gold flex items-center gap-1.5"
                >
                  <Lock className="h-3 w-3" /> Admin
                </button>
              )}
            </div>

            {/* Nav items */}
            <div className="flex-1 space-y-1">
              {navLinks.map((link, i) => {
                const sectionId = link.href.replace('#', '');
                const isActive = activeSection === sectionId;
                return (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className={`flex items-center justify-between py-4 border-b border-border-subtle/40 group transition-colors ${
                      isActive ? 'border-accent-amber/30' : ''
                    }`}
                  >
                    <span className={`text-xl font-display font-bold tracking-tight transition-colors ${
                      isActive ? 'text-accent-gold' : 'text-text-primary group-hover:text-accent-gold'
                    }`}>
                      {link.name}
                    </span>
                    <span className={`text-xs font-mono transition-colors ${isActive ? 'text-accent-amber' : 'text-text-muted'}`}>
                      0{i + 1}
                    </span>
                  </motion.a>
                );
              })}
            </div>

            {/* Footer contact */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="space-y-3 pt-6 border-t border-border-subtle"
            >
              <span className="text-[10px] font-mono text-text-muted uppercase tracking-widest block">DIRECT CONTACT</span>
              <a href={`mailto:${personalInfo.socials.email}`} className="block font-mono text-sm text-accent-gold hover:text-accent-warm transition-colors">
                {personalInfo.socials.email}
              </a>
              <div className="flex items-center gap-5 pt-1 text-xs font-mono text-text-secondary">
                <a href={personalInfo.socials.github} target="_blank" rel="noreferrer" className="hover:text-accent-gold transition-colors">GitHub</a>
                <a href={personalInfo.socials.linkedin} target="_blank" rel="noreferrer" className="hover:text-accent-gold transition-colors">LinkedIn</a>
                <a href={personalInfo.socials.instagram} target="_blank" rel="noreferrer" className="hover:text-accent-gold transition-colors">Instagram</a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
