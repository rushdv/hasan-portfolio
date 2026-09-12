import React, { useState } from 'react';
import { CustomCursor, CursorState } from './components/CustomCursor';
import { Navbar }          from './components/Navbar';
import { Hero }            from './components/Hero';
import { TextBanner }      from './components/TextBanner';
import { About }           from './components/About';
import { TechStack }       from './components/TechStack';
import { Projects }        from './components/Projects';
import { Travel }          from './components/Travel';
import { Photography }     from './components/Photography';
import { Education }       from './components/Education';
import { Certificates }    from './components/Certificates';
import { LearningRoadmap } from './components/LearningRoadmap';
import { Interests }       from './components/Interests';
import { Contact }         from './components/Contact';
import { Footer }          from './components/Footer';
import { AdminAuthModal }  from './components/AdminAuthModal';

export const App: React.FC = () => {
  const [cursorState, setCursorState]               = useState<CursorState>({ type: 'default' });
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isAdminAuthModalOpen, setIsAdminAuthModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-ink text-warmPaper selection:bg-accent/25 selection:text-accent relative overflow-x-hidden">

      <CustomCursor cursorState={cursorState} />

      <AdminAuthModal
        isOpen={isAdminAuthModalOpen}
        onClose={() => setIsAdminAuthModalOpen(false)}
        onLoginSuccess={() => setIsAdminAuthenticated(true)}
      />

      <Navbar
        setCursorState={setCursorState}
        isAdminAuthenticated={isAdminAuthenticated}
        onOpenAdminAuthModal={() => setIsAdminAuthModalOpen(true)}
        onLogoutAdmin={() => setIsAdminAuthenticated(false)}
      />

      <main>
        {/* 01 — Arrival */}
        <Hero setCursorState={setCursorState} />

        {/* 02 — The Person */}
        <About setCursorState={setCursorState} />

        {/* 03 — The Builder */}
        <TechStack setCursorState={setCursorState} />

        {/* 04 — Selected Work */}
        <Projects setCursorState={setCursorState} />

        {/* Chapter break */}
        <TextBanner
          subtitle="STORY ARC — 02"
          text="WHEN THE SCREEN GOES DARK,"
          accentText="I go outside."
        />

        {/* 05 — The Journey */}
        <Travel
          setCursorState={setCursorState}
          isAdminAuthenticated={isAdminAuthenticated}
          onAuthenticateAdmin={() => setIsAdminAuthenticated(true)}
        />

        {/* 06 — The Eye */}
        <Photography setCursorState={setCursorState} />

        {/* 07 — Beyond the Screen */}
        <Interests setCursorState={setCursorState} />

        {/* Chapter break */}
        <TextBanner
          subtitle="STORY ARC — 03"
          text="ALWAYS LEARNING,"
          accentText="always growing."
        />

        {/* 08 — The Path */}
        <Education      setCursorState={setCursorState} />
        <Certificates   setCursorState={setCursorState} />
        <LearningRoadmap setCursorState={setCursorState} />

        {/* 09 — Contact */}
        <Contact setCursorState={setCursorState} />
      </main>

      <Footer setCursorState={setCursorState} />
    </div>
  );
};

export default App;
