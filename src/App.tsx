import React, { useState } from 'react';
import { CustomCursor, CursorState } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TextBanner } from './components/TextBanner';
import { About } from './components/About';
import { TechStack } from './components/TechStack';
import { Projects } from './components/Projects';
import { Travel } from './components/Travel';
import { Photography } from './components/Photography';
import { Education } from './components/Education';
import { Certificates } from './components/Certificates';
import { LearningRoadmap } from './components/LearningRoadmap';
import { Interests } from './components/Interests';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [cursorState, setCursorState] = useState<CursorState>({ type: 'default' });

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary selection:bg-accent-amber/30 selection:text-accent-gold relative">
      {/* Custom Context-Aware Interactive Cursor (Desktop) */}
      <CustomCursor cursorState={cursorState} />

      {/* Navigation Header */}
      <Navbar setCursorState={setCursorState} />

      {/* Hero Section */}
      <Hero setCursorState={setCursorState} />

      {/* Narrative Transition Banner 1 */}
      <TextBanner
        subtitle="STORY ARC // 01"
        text="FROM LEARNING TO BUILDING"
      />

      {/* About Philosophy & Visual Typography */}
      <About setCursorState={setCursorState} />

      {/* Tech Stack & Focus */}
      <TechStack setCursorState={setCursorState} />

      {/* Selected Work Showcase */}
      <Projects setCursorState={setCursorState} />

      {/* Narrative Transition Banner 2 */}
      <TextBanner
        subtitle="STORY ARC // 02"
        text="WHEN THE SCREEN GOES DARK,"
        accentText="i go outside."
      />

      {/* Travel & Interactive Map */}
      <Travel setCursorState={setCursorState} />

      {/* Visual Photography Journal */}
      <Photography setCursorState={setCursorState} />

      {/* Education Timeline */}
      <Education setCursorState={setCursorState} />

      {/* Credentials & Certifications */}
      <Certificates setCursorState={setCursorState} />

      {/* Animated Learning Roadmap */}
      <LearningRoadmap setCursorState={setCursorState} />

      {/* Beyond Academics & Interests */}
      <Interests setCursorState={setCursorState} />

      {/* Final Callout & Contact */}
      <Contact setCursorState={setCursorState} />

      {/* Footer */}
      <Footer setCursorState={setCursorState} />
    </div>
  );
};

export default App;
