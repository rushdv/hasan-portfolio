---
inclusion: auto
fileMatchPattern: package.json
---

# Portfolio Project Structure & Configuration

## Current Project Context

This portfolio is for **Mehedi Hasan**, featuring:
- Modern React + TypeScript + Vite setup
- Tailwind CSS for styling
- Framer Motion for animations
- Multiple sections: Hero, About, Projects, Skills, Education, etc.
- Admin panel for managing travel content
- Contact form with validation
- Custom cursor and animations

## Recommended File Structure

```
hasan-portfolio/
├── public/
│   ├── images/              # Static images
│   ├── videos/              # Background videos
│   ├── fonts/               # Custom fonts
│   ├── favicon.svg
│   └── robots.txt
│
├── src/
│   ├── components/
│   │   ├── common/          # Reusable UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Tooltip.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── sections/        # Page sections
│   │   │   ├── Hero.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Projects.tsx
│   │   │   ├── Skills.tsx
│   │   │   ├── Experience.tsx
│   │   │   ├── Contact.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── animations/      # Animation wrappers
│   │   │   ├── RevealOnScroll.tsx
│   │   │   ├── ParallaxContainer.tsx
│   │   │   ├── TextAnimator.tsx
│   │   │   ├── BackgroundEffects.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── layout/          # Layout components
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Layout.tsx
│   │   │   └── index.ts
│   │   │
│   │   └── admin/           # Admin components
│   │       ├── AdminAuthModal.tsx
│   │       ├── AdminTravelModal.tsx
│   │       └── index.ts
│   │
│   ├── hooks/               # Custom React hooks
│   │   ├── useScrollAnimation.ts
│   │   ├── useIntersectionObserver.ts
│   │   ├── useMousePosition.ts
│   │   ├── useMediaQuery.ts
│   │   ├── useTheme.ts
│   │   ├── useLocalStorage.ts
│   │   └── index.ts
│   │
│   ├── contexts/            # React contexts
│   │   ├── ThemeContext.tsx
│   │   ├── AnimationContext.tsx
│   │   └── index.ts
│   │
│   ├── utils/               # Utility functions
│   │   ├── animations.ts    # Animation configurations
│   │   ├── validators.ts    # Form validation helpers
│   │   ├── formatters.ts    # Data formatting
│   │   ├── api.ts           # API calls
│   │   └── index.ts
│   │
│   ├── types/               # TypeScript definitions
│   │   ├── index.ts
│   │   ├── project.types.ts
│   │   ├── skill.types.ts
│   │   └── animation.types.ts
│   │
│   ├── data/                # Static data
│   │   ├── portfolioData.ts # Main portfolio data
│   │   ├── projects.ts
│   │   ├── skills.ts
│   │   ├── experience.ts
│   │   └── index.ts
│   │
│   ├── styles/              # Global styles
│   │   ├── index.css        # Main stylesheet
│   │   ├── animations.css   # Custom animations
│   │   └── themes.css       # Theme variables
│   │
│   ├── assets/              # Asset imports
│   │   ├── icons/
│   │   └── images/
│   │
│   ├── config/              # Configuration files
│   │   ├── site.config.ts   # Site metadata
│   │   ├── animation.config.ts
│   │   └── theme.config.ts
│   │
│   ├── App.tsx              # Main app component
│   ├── main.tsx             # Entry point
│   └── vite-env.d.ts        # Vite type definitions
│
├── .kiro/
│   ├── steering/            # AI agent guidelines
│   └── hooks/               # AI agent hooks
│
├── .env.local               # Environment variables (not committed)
├── .env.example             # Example env file
├── .gitignore
├── .eslintrc.json
├── .prettierrc
├── index.html
├── package.json
├── package-lock.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── README.md
```

## Configuration Files

### package.json
```json
{
  "name": "hasan-portfolio",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "format": "prettier --write \"src/**/*.{ts,tsx,css}\"",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "framer-motion": "^11.x",
    "react-icons": "^5.x",
    "react-hook-form": "^7.x",
    "zod": "^3.x",
    "zustand": "^4.x",
    "clsx": "^2.x",
    "tailwind-merge": "^2.x"
  },
  "devDependencies": {
    "@types/react": "^18.3.x",
    "@types/react-dom": "^18.3.x",
    "@typescript-eslint/eslint-plugin": "^7.x",
    "@typescript-eslint/parser": "^7.x",
    "@vitejs/plugin-react": "^4.x",
    "autoprefixer": "^10.x",
    "eslint": "^8.x",
    "eslint-plugin-react-hooks": "^4.x",
    "eslint-plugin-react-refresh": "^0.4.x",
    "postcss": "^8.x",
    "prettier": "^3.x",
    "tailwindcss": "^3.x",
    "typescript": "^5.x",
    "vite": "^5.x"
  }
}
```

### vite.config.ts
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@types': path.resolve(__dirname, './src/types'),
      '@data': path.resolve(__dirname, './src/data'),
      '@assets': path.resolve(__dirname, './src/assets'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'animation-vendor': ['framer-motion'],
        },
      },
    },
  },
});
```

### tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@components/*": ["./src/components/*"],
      "@hooks/*": ["./src/hooks/*"],
      "@utils/*": ["./src/utils/*"],
      "@types/*": ["./src/types/*"],
      "@data/*": ["./src/data/*"],
      "@assets/*": ["./src/assets/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### tailwind.config.js
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        secondary: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7e22ce',
          800: '#6b21a8',
          900: '#581c87',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'fade-up': 'fadeUp 0.6s ease-out',
        'slide-in': 'slideIn 0.5s ease-out',
        'scale-in': 'scaleIn 0.4s ease-out',
        'bounce-slow': 'bounce 3s infinite',
        'spin-slow': 'spin 8s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};
```

### .eslintrc.json
```json
{
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "plugins": ["react", "@typescript-eslint", "react-hooks"],
  "rules": {
    "react/react-in-jsx-scope": "off",
    "@typescript-eslint/no-unused-vars": [
      "warn",
      { "argsIgnorePattern": "^_" }
    ],
    "@typescript-eslint/no-explicit-any": "warn",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn"
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  }
}
```

### .prettierrc
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "arrowParens": "avoid",
  "endOfLine": "lf"
}
```

## Data Structure Examples

### portfolioData.ts Structure
```typescript
export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  images?: string[];
  technologies: string[];
  category: string;
  featured: boolean;
  liveUrl?: string;
  githubUrl?: string;
  date: string;
}

export interface Skill {
  name: string;
  level: number;
  icon: string;
  category: 'frontend' | 'backend' | 'tools' | 'other';
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string[];
  technologies: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  year: string;
  description?: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  tagline: string;
  bio: string;
  email: string;
  phone?: string;
  location: string;
  avatar: string;
  resume?: string;
  socialLinks: SocialLink[];
}
```

## Environment Variables

### .env.example
```env
# API Configuration
VITE_API_URL=https://api.example.com

# Email Service (EmailJS or similar)
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key

# Analytics
VITE_GA_TRACKING_ID=G-XXXXXXXXXX

# Feature Flags
VITE_ENABLE_BLOG=false
VITE_ENABLE_ADMIN=true

# Admin Credentials (for demo/development only)
VITE_ADMIN_USERNAME=admin
VITE_ADMIN_PASSWORD=your_secure_password
```

## Import Alias Usage

```typescript
// Instead of: import Button from '../../../components/common/Button'
import Button from '@components/common/Button';

// Instead of: import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { useScrollAnimation } from '@hooks/useScrollAnimation';

// Instead of: import { portfolioData } from '../data/portfolioData'
import { portfolioData } from '@data/portfolioData';
```

## Code Organization Best Practices

### Component File Structure
```typescript
// 1. Imports
import { motion } from 'framer-motion';
import { FC, useState, useEffect } from 'react';
import Button from '@components/common/Button';
import { useScrollAnimation } from '@hooks/useScrollAnimation';

// 2. Types/Interfaces
interface ComponentProps {
  // props
}

// 3. Constants (outside component)
const ANIMATION_VARIANTS = {
  // variants
};

// 4. Component
export const Component: FC<ComponentProps> = ({ prop1, prop2 }) => {
  // 5. Hooks
  const [state, setState] = useState();
  const { ref, controls } = useScrollAnimation();

  // 6. Effects
  useEffect(() => {
    // effect logic
  }, []);

  // 7. Event handlers
  const handleClick = () => {
    // handler logic
  };

  // 8. Render helpers
  const renderItem = () => {
    // render logic
  };

  // 9. Return JSX
  return (
    <motion.div>
      {/* JSX */}
    </motion.div>
  );
};
```

### Index Files Pattern
```typescript
// src/components/common/index.ts
export { default as Button } from './Button';
export { default as Card } from './Card';
export { default as Input } from './Input';

// Usage:
import { Button, Card, Input } from '@components/common';
```

## Build & Deployment

### Build Command
```bash
npm run build
```

### Preview Build
```bash
npm run preview
```

### Environment-Specific Builds
```bash
# Development
npm run dev

# Production build
npm run build

# Type checking
npm run type-check

# Linting
npm run lint

# Format code
npm run format
```

## Git Ignore Patterns

### .gitignore
```
# Dependencies
node_modules/

# Production
dist/
build/

# Environment variables
.env
.env.local
.env.*.local

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# Editor directories and files
.vscode/
.idea/
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

# Temporary files
*.tmp
*.temp
.cache/
