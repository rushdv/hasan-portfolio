import React from 'react';

export interface CursorState {
  type: 'default' | 'project' | 'explore' | 'open' | 'hover';
  label?: string;
}

interface CustomCursorProps {
  cursorState: CursorState;
}

// Custom cursor effect disabled per user request - using browser standard pointer cursor
export const CustomCursor: React.FC<CustomCursorProps> = () => {
  return null;
};
