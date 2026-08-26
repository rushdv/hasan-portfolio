import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export interface CursorState {
  type: 'default' | 'project' | 'explore' | 'open' | 'hover';
  label?: string;
}

interface CustomCursorProps {
  cursorState: CursorState;
}

export const CustomCursor: React.FC<CustomCursorProps> = ({ cursorState }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Mouse position spring physics for ultra-smooth movement
  const cursorX = useSpring(-100, { damping: 28, stiffness: 350 });
  const cursorY = useSpring(-100, { damping: 28, stiffness: 350 });

  useEffect(() => {
    // Detect touch device
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouchDevice(true);
      return;
    }

    const moveMouse = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', moveMouse);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', moveMouse);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [cursorX, cursorY, isVisible]);

  if (isTouchDevice || !isVisible) return null;

  const isExpanded = cursorState.type !== 'default';
  const label = cursorState.label || (
    cursorState.type === 'project' ? 'VIEW' :
    cursorState.type === 'explore' ? 'EXPLORE' :
    cursorState.type === 'open' ? 'OPEN →' : ''
  );

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-50 mix-blend-difference hidden md:block"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: '-50%',
        translateY: '-50%',
      }}
    >
      {/* Outer Ring / Label Bubble */}
      <motion.div
        className={`flex items-center justify-center rounded-full border border-accent-amber/70 bg-accent-amber/10 text-[10px] font-bold tracking-widest text-accent-gold backdrop-blur-xs transition-all duration-200 ease-out`}
        animate={{
          width: isExpanded ? (label ? 64 : 40) : 28,
          height: isExpanded ? (label ? 64 : 40) : 28,
          scale: isExpanded ? 1.1 : 1,
        }}
      >
        {label && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="select-none text-center font-mono uppercase"
          >
            {label}
          </motion.span>
        )}
      </motion.div>

      {/* Center Small Pointer Dot */}
      <div className="absolute top-1/2 left-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-amber" />
    </motion.div>
  );
};
