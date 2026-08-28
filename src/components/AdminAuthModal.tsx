import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, X, AlertCircle, ShieldCheck } from 'lucide-react';

interface AdminAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export const AdminAuthModal: React.FC<AdminAuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123' || password === 'mehedi2026' || password === 'mehedi') {
      onLoginSuccess();
      setPassword('');
      setError('');
      onClose();
    } else {
      setError('Incorrect Admin Password. Try: mehedi2026');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-bg-primary/90 backdrop-blur-md">
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        className="relative w-full max-w-md rounded-3xl bg-bg-surface border border-border-subtle p-6 sm:p-8 shadow-2xl space-y-6"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-bg-card border border-border-subtle text-text-secondary hover:text-accent-gold transition-colors z-10"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-3 border-b border-border-subtle/80 pb-4">
          <div className="p-3 rounded-2xl bg-accent-amber/10 border border-accent-amber/20 text-accent-amber">
            <Lock className="h-6 w-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-accent-gold uppercase tracking-widest block">
              PORTFOLIO ADMIN
            </span>
            <h3 className="text-xl font-display font-extrabold text-text-primary">
              Admin Authentication
            </h3>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <p className="text-xs font-mono text-text-secondary leading-relaxed">
            Enter your admin key to unlock site-wide editing, travel journal management, and raw photo uploads.
          </p>

          <div className="space-y-2">
            <label className="text-xs font-mono text-accent-gold block">
              PASSWORD
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password (e.g. mehedi2026)"
              className="w-full px-4 py-3 rounded-xl bg-bg-card border border-border-subtle text-text-primary text-sm focus:border-accent-amber focus:outline-none transition-colors"
              autoFocus
            />
            {error && (
              <p className="text-xs font-mono text-rose-400 flex items-center gap-1 mt-1">
                <AlertCircle className="h-3 w-3" /> {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-accent-amber text-bg-primary rounded-xl font-display font-extrabold text-xs tracking-wider hover:bg-accent-gold transition-all duration-300 shadow-lg shadow-accent-amber/20 flex items-center justify-center gap-2"
          >
            <ShieldCheck className="h-4 w-4" /> UNLOCK ADMIN MODE
          </button>
        </form>
      </motion.div>
    </div>
  );
};
