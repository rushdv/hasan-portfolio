import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { personalInfo } from '../data/portfolioData';
import { CursorState } from './CustomCursor';

interface AboutProps {
  setCursorState?: (state: CursorState) => void;
}

// Animated counter hook
const useCounter = (target: number, duration = 1.5) => {
  const [count, setCount] = React.useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  React.useEffect(() => {
    if (!inView) return;
    let start = 0;
    const increment = target / (duration * 60);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [inView, target, duration]);

  return { count, ref };
};

const stats = [
  { label: 'Projects Built', value: 6, suffix: '+', display: 'B.Sc. CSE', mono: 'Northern University BD' },
  { label: 'Direction', value: null, suffix: '', display: 'AI / ML', mono: 'Target Specialization' },
  { label: 'Districts Explored', value: 6, suffix: '+', display: null, mono: 'Across Bangladesh' },
];

const words = ['CODE', 'BUILD', 'LEARN', 'EXPLORE', 'REPEAT'];

export const About: React.FC<AboutProps> = ({ setCursorState }) => {
  const { count: projectCount, ref: projectRef } = useCounter(6);
  const { count: districtCount, ref: districtRef } = useCounter(6);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section
      id="about"
      className="py-24 md:py-32 px-6 md:px-12 bg-bg-primary relative border-t border-border-subtle/50 overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/3 w-[500px] h-[300px] bg-accent-amber/4 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-start relative z-10">

        {/* ── LEFT COLUMN ── */}
        <motion.div
          className="lg:col-span-7 space-y-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={containerVariants}
        >
          {/* Label */}
          <motion.div variants={itemVariants} className="flex items-center gap-3">
            <span className="h-px w-8 bg-accent-amber/60" />
            <span className="text-xs font-mono tracking-widest text-accent-gold uppercase">
              01 // PHILOSOPHY & AMBITION
            </span>
          </motion.div>

          {/* Quote */}
          <motion.h2
            variants={itemVariants}
            className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-text-primary leading-tight"
          >
            "I spend my days learning how computers think,{' '}
            <span className="text-accent-amber font-serif italic font-normal">
              and my free time discovering how the world feels.
            </span>"
          </motion.h2>

          {/* Bio paragraphs */}
          <motion.div
            variants={itemVariants}
            className="space-y-5 text-base text-text-secondary leading-relaxed font-light border-l-2 border-accent-amber/35 pl-6"
          >
            {personalInfo.aboutText.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </motion.div>

          {/* Stats row */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-3 gap-6 pt-4 border-t border-border-subtle/50"
          >
            {/* Stat 1 */}
            <div
              ref={projectRef}
              className="space-y-1 group cursor-default"
              onMouseEnter={() => setCursorState?.({ type: 'hover' })}
              onMouseLeave={() => setCursorState?.({ type: 'default' })}
            >
              <span className="block text-2xl sm:text-3xl font-display font-extrabold text-accent-gold tabular-nums">
                {projectCount}+
              </span>
              <span className="text-[10px] font-mono text-text-muted uppercase tracking-wider">
                Projects Built
              </span>
            </div>

            {/* Stat 2 */}
            <div className="space-y-1">
              <span className="block text-xl sm:text-2xl font-display font-extrabold text-text-primary">
                B.Sc. CSE
              </span>
              <span className="text-[10px] font-mono text-text-muted uppercase tracking-wider">
                Northern Univ. BD
              </span>
            </div>

            {/* Stat 3 */}
            <div
              ref={districtRef}
              className="space-y-1 group cursor-default"
              onMouseEnter={() => setCursorState?.({ type: 'hover' })}
              onMouseLeave={() => setCursorState?.({ type: 'default' })}
            >
              <span className="block text-2xl sm:text-3xl font-display font-extrabold text-text-primary tabular-nums">
                {districtCount}+
              </span>
              <span className="text-[10px] font-mono text-text-muted uppercase tracking-wider">
                Districts Explored
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* ── RIGHT COLUMN — Animated typography ── */}
        <div className="lg:col-span-5 flex flex-col justify-center space-y-1 lg:pl-4 select-none">
          {words.map((word, index) => (
            <motion.div
              key={word}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              onMouseEnter={() => setCursorState?.({ type: 'hover', label: word })}
              onMouseLeave={() => setCursorState?.({ type: 'default' })}
              className="group flex items-center gap-4 cursor-default"
            >
              <span className="text-[10px] font-mono text-text-muted/50 group-hover:text-accent-gold transition-colors duration-300 w-5 text-right">
                0{index + 1}
              </span>
              {/* Line accent */}
              <span className="h-px w-0 group-hover:w-4 bg-accent-amber/60 transition-all duration-300" />
              <span
                className={`font-display font-black tracking-tighter transition-all duration-300 leading-none
                  ${index === 3
                    ? 'text-4xl sm:text-6xl xl:text-7xl text-accent-amber font-serif italic'
                    : 'text-4xl sm:text-6xl xl:text-7xl text-text-primary/80 group-hover:text-text-primary group-hover:translate-x-2'
                  }`}
              >
                {word}
              </span>
            </motion.div>
          ))}

          {/* Decorative bottom accent */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mt-6 ml-9 h-px bg-gradient-to-r from-accent-amber/50 to-transparent origin-left"
          />
        </div>
      </div>
    </section>
  );
};
