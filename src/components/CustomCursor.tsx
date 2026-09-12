import React from 'react';

export interface CursorState {
  type: 'default' | 'project' | 'explore' | 'open' | 'hover';
  label?: string;
}

interface CustomCursorProps {
  cursorState: CursorState;
}

export const CustomCursor: React.FC<CustomCursorProps> = () => {
  return null;
};


