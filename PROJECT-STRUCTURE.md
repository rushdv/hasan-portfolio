# 📁 Complete Project Structure

## Overview
This document provides a detailed breakdown of the entire project structure with explanations for every file and folder.

---

## 🌳 Directory Tree

```
hasan-portfolio/
├── .git/                          # Git version control
├── .kiro/                         # AI agent configuration
│   └── steering/                  # AI guidelines
│       ├── AGENTS.md              # Main AI rules (PRIMARY REFERENCE)
│       ├── portfolio-animation-guidelines.md
│       ├── portfolio-development-standards.md
│       ├── portfolio-ui-components.md
│       └── portfolio-project-structure.md
│
├── .vercel/                       # Vercel deployment config
│   ├── README.txt
│   └── repo.json
│
├── dist/                          # Production build output
│   └── (generated files)
│
├── node_modules/                  # Dependencies
│   └── (installed packages)
│
├── public/                        # Static assets
│   ├── images/                    # Image files
│   │   ├── hasan_hero_portrait.jpg
│   │   ├── mehedi_hasan.jpg      # Profile photo
│   │   ├── travel_coxsbazar.jpg  # Cox's Bazar photo
│   │   └── travel_intro_wall.jpg # Travel intro background
│   └── favicon.svg               # Site favicon
│
├── src/                           # Source code
│   ├── components/                # React components
│   │   ├── About.tsx             # About section
│   │   ├── AdminAuthModal.tsx    # Admin login modal
│   │   ├── AdminTravelModal.tsx  # Travel CRUD modal
│   │   ├── Certificates.tsx      # Credentials section
│   │   ├── Contact.tsx           # Contact form
│   │   ├── CustomCursor.tsx      # Context-aware cursor
│   │   ├── Education.tsx         # Academic timeline
│   │   ├── Footer.tsx            # Footer links
│   │   ├── Hero.tsx              # Landing section
│   │   ├── Interests.tsx         # Personal interests
│   │   ├── LearningRoadmap.tsx   # ML learning path
│   │   ├── Lightbox.tsx          # Image viewer
│   │   ├── Navbar.tsx            # Navigation bar
│   │   ├── Photography.tsx       # Photo gallery
│   │   ├── ProjectModal.tsx      # Project details overlay
│   │   ├── Projects.tsx          # Work showcase
│   │   ├── TechStack.tsx         # Skills display
│   │   ├── TextBanner.tsx        # Section dividers
│   │   ├── Travel.tsx            # Travel journal
│   │   └── TravelMap.tsx         # Bangladesh map
│   │
│   ├── data/                      # Content data
│   │   └── portfolioData.ts      # ALL CONTENT HERE ⭐
│   │
│   ├── styles/                    # Global styles
│   │   └── index.css             # Global CSS + Tailwind
│   │
│   ├── types/                     # TypeScript definitions
│   │   └── index.ts              # All interfaces
│   │
│   ├── App.tsx                    # Main app component
│   ├── main.tsx                   # React entry point
│   └── vite-env.d.ts             # Vite type declarations
│
├── .env.local                     # Environment variables (git-ignored)
├── .gitignore                     # Git ignore rules
├── AGENTS.md                      # AI agent main rules (copy)
├── AI-WORKFLOW.md                 # AI development guide ⭐
├── LICENSE                        # Project license
├── package.json                   # Dependencies & scripts
├── package-lock.json              # Dependency lock file
├── postcss.config.js              # PostCSS configuration
├── PROJECT-STRUCTURE.md           # This file ⭐
├── README.md                      # Project readme
├── tailwind.config.js             # Tailwind configuration
├── tsconfig.json                  # TypeScript config
├── tsconfig.node.json             # TypeScript Node config
└── vite.config.ts                 # Vite configuration
```

---

## 📄 File Descriptions

### Root Level Files

#### `package.json`
**Purpose**: Project metadata, dependencies, and scripts
**Key sections**:
- `scripts`: Development commands
- `dependencies`: Runtime packages
- `devDependencies`: Development tools

**Important scripts**:
```json
{
  "dev": "vite",              // Start dev server
  "build": "tsc && vite build", // Production build
  "preview": "vite preview"   // Preview production build
}
```

#### `tsconfig.json`
**Purpose**: TypeScript compiler configuration
**Key settings**:
- Strict mode enabled
- Module resolution: bundler
- JSX: react-jsx
- Path aliases for imports

#### `tailwind.config.js`
**Purpose**: Tailwind CSS customization
**Defines**:
- Custom colors (accent-amber, bg-primary, etc.)
- Font families (display, sans, mono)
- Custom animations
- Extended spacing/sizing

#### `vite.config.ts`
**Purpose**: Vite build tool configuration
**Features**:
- React plugin setup
- Path aliases
- Build optimization

#### `.gitignore`
**Purpose**: Files/folders to exclude from Git
**Ignores**:
- node_modules/
- dist/
- .env.local
- Editor configs

#### `.env.local`
**Purpose**: Environment variables (SECRET - not in Git)
**Contains**:
- Admin credentials
- API keys
- Environment-specific configs

---

### `.kiro/` Directory

#### Purpose
Configuration files for AI agents to understand project rules and structure.

#### `steering/AGENTS.md` ⭐ **MOST IMPORTANT**
**Purpose**: Single source of truth for AI agents
**Contains**:
- Project identity and purpose
- Architecture overview
- Design system (colors, fonts, spacing)
- Animation patterns
- Component development rules
- Code standards
- Content management rules

**When to reference**: ALWAYS before making any changes

#### Other Steering Files
- `portfolio-animation-guidelines.md`: Animation best practices
- `portfolio-development-standards.md`: Code quality standards
- `portfolio-ui-components.md`: Component library documentation
- `portfolio-project-structure.md`: Architecture details

---

### `public/` Directory

#### Purpose
Static assets served directly (not processed by bundler)

#### `public/images/`
- `mehedi_hasan.jpg`: Profile photo (Hero, About, Photography)
- `travel_coxsbazar.jpg`: Cox's Bazar beach photo
- `travel_intro_wall.jpg`: Travel section intro background
- `hasan_hero_portrait.jpg`: Alternative portrait

**Image guidelines**:
- Format: JPG/PNG
- Max size: 500KB
- Optimization: Compressed
- Naming: lowercase-with-dashes

#### `public/favicon.svg`
Site icon displayed in browser tab

---

### `src/` Directory

#### `src/main.tsx`
**Purpose**: Application entry point
**Function**: Mounts React app to DOM
```typescript
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

#### `src/App.tsx`
**Purpose**: Main application orchestrator
**Responsibilities**:
- Layout structure
- Global state management
- Cursor state handling
- Admin authentication
- Component composition

**Structure**:
```typescript
<>
  <CustomCursor />
  <Navbar />
  <Hero />
  <About />
  <TechStack />
  <Projects />
  <TextBanner />
  <Travel />
  <Photography />
  <Education />
  <Certificates />
  <LearningRoadmap />
  <Interests />
  <Contact />
  <Footer />
</>
```

---

### `src/components/` Directory

#### Component Categories

**1. Layout Components**
- `Navbar.tsx`: Navigation + admin controls
- `Footer.tsx`: Footer with links
- `TextBanner.tsx`: Section dividers

**2. Landing**
- `Hero.tsx`: Fullscreen cinematic intro

**3. Content Sections**
- `About.tsx`: Philosophy + bio
- `TechStack.tsx`: Skills showcase
- `Projects.tsx`: Work portfolio
- `Travel.tsx`: Travel journal
- `Photography.tsx`: Photo gallery
- `Education.tsx`: Academic timeline
- `Certificates.tsx`: Credentials
- `LearningRoadmap.tsx`: ML learning path
- `Interests.tsx`: Personal interests
- `Contact.tsx`: Contact form

**4. Interactive Elements**
- `CustomCursor.tsx`: Context-aware cursor
- `ProjectModal.tsx`: Project details overlay
- `Lightbox.tsx`: Image viewer
- `TravelMap.tsx`: Interactive Bangladesh map

**5. Admin**
- `AdminAuthModal.tsx`: Password login
- `AdminTravelModal.tsx`: Travel CRUD interface

#### Component Structure Pattern
```typescript
import { motion } from 'framer-motion';
import { useState } from 'react';
import type { CursorState } from './CustomCursor';

interface ComponentProps {
  setCursorState: (state: CursorState) => void;
  // other props
}

export const Component: React.FC<ComponentProps> = ({ 
  setCursorState 
}) => {
  // Hooks
  const [state, setState] = useState();

  // Handlers
  const handleClick = () => {};

  // Render
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      {/* JSX */}
    </motion.section>
  );
};
```

---

### `src/data/` Directory

#### `portfolioData.ts` ⭐ **CONTENT SOURCE**

**Purpose**: Single source of ALL content
**Exports**:

```typescript
// Personal information
export const personalInfo = {
  name, title, roles, tagline, location, 
  institution, degree, aboutText, socials
}

// Skills organized in categories
export const skillCategories: SkillCategory[] = [
  { title: "CORE", skills: [...] },
  { title: "LEARNING", skills: [...] },
  { title: "FUTURE", skills: [...] }
]

// Work projects
export const projects: Project[] = [...]

// Travel destinations
export const travelPlaces: TravelPlace[] = [...]

// Photo gallery
export const photoGallery: PhotoItem[] = [...]

// Education history
export const educationHistory: EducationItem[] = [...]

// Certificates
export const certificates: CertificateItem[] = [...]

// ML learning milestones
export const roadmapSteps: RoadmapStep[] = [...]

// Personal interests
export const personalInterests: PersonalInterest[] = [...]
```

**⚠️ IMPORTANT**: 
- **ALL** text content must be in this file
- **NO** hardcoded strings in components
- Follow existing data structure
- Validate TypeScript types

---

### `src/types/` Directory

#### `index.ts`
**Purpose**: TypeScript type definitions

**Key interfaces**:
```typescript
// Project data structure
export interface Project {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  problem: string;
  solution: string;
  learned: string;
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;
  image: string;
  featured: boolean;
}

// Skill category
export interface SkillCategory {
  title: string;
  subtitle: string;
  skills: Skill[];
}

// Travel place
export interface TravelPlace {
  id: string;
  location: string;
  region: string;
  date: string;
  story: string;
  photo: string;
  coordinates: { lat: number; lng: number };
  favouriteMoment: string;
}

// ... and more
```

**When to modify**: When adding new data fields

---

### `src/styles/` Directory

#### `index.css`
**Purpose**: Global styles + Tailwind directives

**Contents**:
```css
/* Tailwind base */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Custom global styles */
@layer base {
  body {
    @apply bg-bg-primary text-text-primary;
  }
}

/* Custom utilities */
@layer utilities {
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
}

/* Custom animations */
@keyframes marquee {
  /* ... */
}
```

---

## 🔄 Data Flow

```
portfolioData.ts (Source)
        ↓
    App.tsx (Imports)
        ↓
  Component.tsx (Consumes)
        ↓
    Browser (Displays)
```

**Example**:
```typescript
// 1. Data defined
export const projects = [...]

// 2. Imported in component
import { projects } from '../data/portfolioData';

// 3. Rendered
{projects.map(project => (
  <ProjectCard key={project.id} {...project} />
))}
```

---

## 🎨 Design System

### Color Tokens
Defined in `tailwind.config.js`:
```javascript
colors: {
  bg: {
    primary: '#08080a',
    surface: '#111116',
    card: '#16161d',
  },
  accent: {
    amber: '#d4af37',
    gold: '#e5b869',
    warm: '#f59e0b',
  },
  text: {
    primary: '#f3f4f6',
    secondary: '#9ca3af',
    muted: '#6b7280',
  }
}
```

### Typography
```javascript
fontFamily: {
  display: ['Unbounded', 'Syne'],
  sans: ['Plus Jakarta Sans'],
  mono: ['Space Grotesk', 'Fira Code'],
  serif: ['Syne'],
}
```

### Usage in components
```tsx
<div className="bg-bg-card text-text-primary font-sans">
  <h1 className="font-display text-accent-amber">Title</h1>
</div>
```

---

## 📦 Dependencies

### Production
```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "framer-motion": "^11.11.17",
  "lucide-react": "^0.468.0",
  "clsx": "^2.1.1",
  "tailwind-merge": "^2.5.5"
}
```

### Development
```json
{
  "@vitejs/plugin-react": "^4.3.4",
  "typescript": "^5.6.3",
  "tailwindcss": "^3.4.17",
  "vite": "^5.4.11"
}
```

---

## 🚀 Build Process

### Development
```bash
npm run dev
→ Vite dev server
→ Hot module replacement
→ Fast refresh
→ http://localhost:5173
```

### Production
```bash
npm run build
→ TypeScript compilation
→ Vite bundling
→ Code splitting
→ Asset optimization
→ Output: dist/
```

### File Size Targets
- JS bundle: < 300KB gzipped
- CSS: < 50KB gzipped
- Total: < 500KB gzipped

---

## 🔐 Environment Variables

### `.env.local` (NOT in Git)
```bash
# Admin credentials
VITE_ADMIN_USERNAME=admin
VITE_ADMIN_PASSWORD=your_secure_password

# Analytics (optional)
VITE_GA_TRACKING_ID=G-XXXXXXXXXX

# Email service (optional)
VITE_EMAILJS_SERVICE_ID=service_xxx
VITE_EMAILJS_TEMPLATE_ID=template_xxx
VITE_EMAILJS_PUBLIC_KEY=xxx
```

### Access in code
```typescript
const username = import.meta.env.VITE_ADMIN_USERNAME;
```

---

## 📝 Documentation Files

### `README.md`
Project overview, setup instructions, basic usage

### `AI-WORKFLOW.md` ⭐
Complete guide for AI-assisted development

### `PROJECT-STRUCTURE.md` (this file)
Detailed file/folder descriptions

### `AGENTS.md`
AI agent rules and guidelines

---

## 🎯 Quick Reference

### Where to find things:

| What | Where |
|------|-------|
| **Content** | `src/data/portfolioData.ts` |
| **Components** | `src/components/` |
| **Styles** | `tailwind.config.js` + `src/styles/index.css` |
| **Types** | `src/types/index.ts` |
| **Images** | `public/images/` |
| **AI Rules** | `.kiro/steering/AGENTS.md` |
| **Config** | Root level `.js` / `.ts` files |

### Common modifications:

| Task | File(s) |
|------|---------|
| Change text | `src/data/portfolioData.ts` |
| Add component | `src/components/NewComponent.tsx` |
| Modify colors | `tailwind.config.js` |
| Add animation | Component file + `tailwind.config.js` |
| Update types | `src/types/index.ts` |
| Change layout | `src/App.tsx` |
| Add route | Not applicable (SPA) |

---

## 🔧 Maintenance

### Regular updates:
1. **Dependencies**: Monthly security updates
2. **Content**: As projects/skills change
3. **Images**: Optimize regularly
4. **Performance**: Monitor bundle size
5. **Accessibility**: Audit quarterly

### Version control:
- Meaningful commit messages
- Branch for features
- PR for major changes
- Tag releases

---

## 📞 Support

For questions about:
- **Structure**: Reference this file
- **AI development**: See `AI-WORKFLOW.md`
- **Rules**: Check `.kiro/steering/AGENTS.md`
- **Code**: Read component comments

---

**Last Updated**: 2026-01-08
**Version**: 1.0.0
