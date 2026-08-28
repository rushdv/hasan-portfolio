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

export const Navbar: React.FC<NavbarProps> = ({
  setCursorState,
  isAdminAuthenticated = false,
  onOpenAdminAuthModal,
  onLogoutAdmin,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'ABOUT', href: '#about' },
    { name: 'WORK', href: '#projects' },
    { name: 'EXPLORE', href: '#travel' },
    { name: 'PHOTOGRAPHY', href: '#photography' },
    { name: 'LEARNING', href: '#learning' },
    { name: 'CONTACT', href: '#contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'py-3.5 bg-bg-primary/80 backdrop-blur-md border-b border-border-subtle/80 shadow-2xl'
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#"
            onMouseEnter={() => setCursorState({ type: 'hover', label: 'HOME' })}
            onMouseLeave={() => setCursorState({ type: 'default' })}
            className="group flex items-center gap-3 text-text-primary tracking-tight font-bold"
          >
            <span className="flex items-center justify-center h-9 w-9 rounded-lg bg-bg-card border border-border-subtle text-accent-amber font-display font-extrabold text-sm group-hover:border-accent-amber group-hover:bg-accent-amber/10 transition-all duration-300">
              {personalInfo.shortName}
            </span>
            <span className="font-display tracking-wider text-sm font-semibold text-text-primary group-hover:text-accent-gold transition-colors">
              MEHEDI HASAN
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onMouseEnter={() => setCursorState({ type: 'hover' })}
                onMouseLeave={() => setCursorState({ type: 'default' })}
                className="text-xs font-mono tracking-widest text-text-secondary hover:text-accent-gold transition-colors relative py-1 group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent-amber group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          {/* CTA & Global Admin Trigger */}
          <div className="hidden md:flex items-center gap-3">
            {isAdminAuthenticated ? (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>ADMIN ACTIVE</span>
                <button
                  onClick={onLogoutAdmin}
                  className="ml-1 text-text-muted hover:text-rose-400 transition-colors"
                  title="Logout Admin"
                >
                  <LogOut className="h-3 w-3" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAdminAuthModal}
                onMouseEnter={() => setCursorState({ type: 'hover', label: 'ADMIN' })}
                onMouseLeave={() => setCursorState({ type: 'default' })}
                className="p-2 rounded-full bg-bg-card border border-border-subtle text-text-secondary hover:text-accent-gold hover:border-accent-amber transition-all duration-300"
                title="Admin Login"
              >
                <Lock className="h-3.5 w-3.5" />
              </button>
            )}

            <a
              href="#contact"
              onMouseEnter={() => setCursorState({ type: 'hover', label: 'SAY HELLO' })}
              onMouseLeave={() => setCursorState({ type: 'default' })}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono tracking-wider font-semibold rounded-full bg-accent-amber/10 border border-accent-amber/40 text-accent-gold hover:bg-accent-amber hover:text-bg-primary transition-all duration-300"
            >
              GET IN TOUCH <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
            className="md:hidden flex items-center justify-center p-2 rounded-lg bg-bg-card border border-border-subtle text-text-primary hover:text-accent-amber transition-colors"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-30 bg-bg-primary/95 backdrop-blur-xl md:hidden pt-24 px-8 pb-12 flex flex-col justify-between"
          >
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono tracking-widest text-text-muted uppercase">Navigation</span>
                {isAdminAuthenticated ? (
                  <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                    <ShieldCheck className="h-3 w-3" /> Admin Active
                  </span>
                ) : (
                  <button
                    onClick={() => { setMobileMenuOpen(false); onOpenAdminAuthModal?.(); }}
                    className="text-xs font-mono text-accent-gold flex items-center gap-1"
                  >
                    <Lock className="h-3 w-3" /> Admin Login
                  </button>
                )}
              </div>

              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="text-2xl font-display font-bold tracking-tight text-text-primary hover:text-accent-gold transition-colors flex items-center justify-between border-b border-border-subtle/50 pb-4"
                >
                  <span>{link.name}</span>
                  <span className="text-xs font-mono text-accent-amber">0{index + 1}</span>
                </motion.a>
              ))}
            </div>

            <div className="space-y-4 pt-6 border-t border-border-subtle">
              <span className="text-[10px] font-mono tracking-widest text-text-muted uppercase">Direct Contact</span>
              <a
                href={`mailto:${personalInfo.socials.email}`}
                className="block font-mono text-sm text-accent-gold hover:underline"
              >
                {personalInfo.socials.email}
              </a>
              <div className="flex items-center gap-6 pt-2 text-xs font-mono text-text-secondary">
                <a href={personalInfo.socials.github} target="_blank" rel="noreferrer" className="hover:text-accent-gold">GitHub</a>
                <a href={personalInfo.socials.linkedin} target="_blank" rel="noreferrer" className="hover:text-accent-gold">LinkedIn</a>
                <a href={personalInfo.socials.instagram} target="_blank" rel="noreferrer" className="hover:text-accent-gold">Instagram</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
