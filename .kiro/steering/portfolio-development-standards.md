---
inclusion: auto
---

# Portfolio Development Standards

## Project Overview
This is a professional portfolio website built with modern technologies and stunning animations. The goal is to create a unique, memorable experience that showcases skills and personality.

## Technology Stack

### Core Technologies
- **React 18+** with TypeScript
- **Vite** for fast development and optimized builds
- **Tailwind CSS** for utility-first styling
- **Framer Motion** for animations

### Additional Libraries
- **React Router** for navigation (if multi-page)
- **React Icons** for icon library
- **React Hook Form** for forms
- **Zod** for validation
- **Zustand** or **Context API** for state management
- **React Helmet** for SEO

### Build & Development Tools
- **ESLint** and **Prettier** for code quality
- **Husky** for git hooks
- **TypeScript strict mode** enabled

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── common/         # Shared components (Button, Card, etc.)
│   ├── sections/       # Page sections (Hero, About, Projects, etc.)
│   └── animations/     # Animation wrappers and effects
├── hooks/              # Custom React hooks
├── utils/              # Helper functions and utilities
├── types/              # TypeScript type definitions
├── data/               # Static data (projects, skills, etc.)
├── styles/             # Global styles and Tailwind config
├── assets/             # Images, icons, fonts
└── App.tsx             # Main app component
```

## Component Development Guidelines

### Component Structure
```typescript
import { motion } from 'framer-motion';
import { FC } from 'react';

interface ComponentProps {
  // Props with clear types
  title: string;
  description?: string;
}

export const Component: FC<ComponentProps> = ({ title, description }) => {
  // Hooks at the top
  // Event handlers
  // Render logic
  
  return (
    <motion.div
      className="component-class"
      // Animation props
    >
      {/* JSX */}
    </motion.div>
  );
};
```

### Naming Conventions
- **Components**: PascalCase (`Hero.tsx`, `ProjectCard.tsx`)
- **Hooks**: camelCase with 'use' prefix (`useScrollAnimation.ts`)
- **Utils**: camelCase (`formatDate.ts`)
- **Types**: PascalCase for interfaces/types (`Project`, `SkillCategory`)
- **CSS classes**: kebab-case or Tailwind utilities

### Component Best Practices
- Keep components small and focused (Single Responsibility)
- Use composition over inheritance
- Implement proper TypeScript typing
- Add JSDoc comments for complex logic
- Extract repeated JSX into separate components
- Use React.memo() for expensive components

## Styling Guidelines

### Tailwind CSS Best Practices
- Use Tailwind utilities as primary styling method
- Create custom utilities in `tailwind.config.js` for repeated patterns
- Use `@apply` in CSS files sparingly (for complex repeated patterns)
- Follow mobile-first responsive design (`sm:`, `md:`, `lg:`, `xl:`, `2xl:`)

### Custom CSS
- Use CSS modules for component-specific styles
- Create CSS variables in `:root` for theme values
- Avoid inline styles unless dynamic

### Design System
```javascript
// tailwind.config.js
export default {
  theme: {
    extend: {
      colors: {
        primary: { /* shades */ },
        secondary: { /* shades */ },
        accent: { /* shades */ },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      spacing: { /* custom spacing */ },
      animation: { /* custom animations */ },
    },
  },
};
```

## State Management

### Local State
- Use `useState` for simple component state
- Use `useReducer` for complex state logic
- Keep state as close to where it's used as possible

### Global State
- Use Context API for theme, language, and simple global state
- Use Zustand for more complex global state needs
- Avoid prop drilling by lifting state appropriately

### Server State
- Use React Query or SWR if fetching external data
- Implement proper loading and error states
- Cache data appropriately

## Performance Optimization

### Code Splitting
```typescript
// Lazy load heavy components
const ProjectModal = lazy(() => import('./components/ProjectModal'));

// Use with Suspense
<Suspense fallback={<LoadingSpinner />}>
  <ProjectModal />
</Suspense>
```

### Image Optimization
- Use WebP format with fallbacks
- Implement lazy loading for images
- Use appropriate image sizes for different screens
- Consider using a CDN for assets

### Bundle Optimization
- Analyze bundle size with `vite-bundle-visualizer`
- Tree-shake unused code
- Minimize third-party dependencies
- Use dynamic imports for routes

## Accessibility (a11y)

### WCAG 2.1 AA Compliance
- Semantic HTML elements (`<nav>`, `<main>`, `<section>`, `<article>`)
- Proper heading hierarchy (h1 → h6)
- Alt text for all images
- Keyboard navigation support (focus states, tab order)
- ARIA labels where needed
- Color contrast ratios (4.5:1 for text, 3:1 for large text)
- Focus indicators visible and clear

### Accessibility Checklist
- [ ] All interactive elements are keyboard accessible
- [ ] Focus trap implemented in modals
- [ ] Skip to main content link
- [ ] Screen reader tested
- [ ] Respects prefers-reduced-motion
- [ ] Form inputs have associated labels
- [ ] Error messages are announced
- [ ] Color is not the only means of conveying information

## SEO Optimization

### Meta Tags
```typescript
// Use React Helmet or similar
<Helmet>
  <title>Mehedi Hasan - Full Stack Developer</title>
  <meta name="description" content="Portfolio of Mehedi Hasan..." />
  <meta property="og:title" content="..." />
  <meta property="og:description" content="..." />
  <meta property="og:image" content="..." />
  <meta name="twitter:card" content="summary_large_image" />
  <link rel="canonical" href="https://yoursite.com" />
</Helmet>
```

### Best Practices
- Semantic HTML structure
- Proper heading hierarchy
- Descriptive alt text
- Fast loading times (Core Web Vitals)
- Mobile-friendly design
- Schema.org markup (Person, CreativeWork)
- XML sitemap
- robots.txt configuration

## Testing Strategy

### Component Testing
- Test user interactions
- Test edge cases
- Snapshot tests for UI consistency
- Accessibility testing with jest-axe

### Visual Regression Testing
- Use tools like Percy or Chromatic
- Test responsive breakpoints
- Test theme variations

## Git Workflow

### Commit Messages
Follow conventional commits:
- `feat:` new feature
- `fix:` bug fix
- `docs:` documentation
- `style:` formatting, styling
- `refactor:` code restructuring
- `perf:` performance improvement
- `test:` adding tests
- `chore:` maintenance

### Branch Strategy
- `main` - production-ready code
- `develop` - integration branch
- `feature/*` - new features
- `fix/*` - bug fixes

## Environment Variables
```env
# .env.local
VITE_API_URL=
VITE_ANALYTICS_ID=
VITE_EMAIL_SERVICE=
```

## Deployment

### Pre-deployment Checklist
- [ ] All TypeScript errors resolved
- [ ] Build succeeds without warnings
- [ ] Lighthouse score > 90 (all categories)
- [ ] Cross-browser testing completed
- [ ] Mobile responsive verified
- [ ] SEO meta tags configured
- [ ] Analytics integrated
- [ ] Error tracking setup (Sentry, etc.)
- [ ] Environment variables set

### Recommended Hosting
- **Vercel** - Zero config, automatic deployments
- **Netlify** - Great for static sites
- **Cloudflare Pages** - Fast global CDN

### Post-deployment
- Submit sitemap to Google Search Console
- Test all links and forms
- Verify analytics tracking
- Monitor Core Web Vitals
- Setup uptime monitoring

## Code Quality

### ESLint Rules
- Enable TypeScript recommended rules
- Enable React hooks rules
- Enable accessibility plugin (jsx-a11y)
- Enable import order plugin

### Prettier Configuration
- Single quotes
- 2 spaces indentation
- Trailing commas (es5)
- Semicolons required

### Type Safety
- Enable `strict` mode in tsconfig.json
- Avoid `any` type (use `unknown` if needed)
- Define explicit return types for functions
- Use type guards for runtime checks

## Documentation

### Code Documentation
- Add JSDoc comments for public APIs
- Document complex algorithms
- Include usage examples for components
- Maintain README.md with setup instructions

### Component Documentation
```typescript
/**
 * ProjectCard component displays a project with hover effects
 * 
 * @param project - Project data object
 * @param onClick - Handler for card click
 * @returns Animated project card element
 * 
 * @example
 * <ProjectCard 
 *   project={projectData} 
 *   onClick={handleClick}
 * />
 */
```

## Security Best Practices

### Input Validation
- Validate and sanitize all user inputs
- Use Zod or Yup for schema validation
- Prevent XSS attacks (React does this by default, but be careful with dangerouslySetInnerHTML)

### Environment & Secrets
- Never commit `.env` files
- Use environment variables for sensitive data
- Validate env variables at runtime

### Dependencies
- Regularly update dependencies
- Run `npm audit` to check for vulnerabilities
- Use exact versions in production

## Portfolio-Specific Guidelines

### Content Sections
1. **Hero** - Eye-catching introduction with animation
2. **About** - Personal story and background
3. **Skills/Tech Stack** - Visual representation of technologies
4. **Projects** - Showcase with detailed modals
5. **Experience** - Timeline or card-based layout
6. **Testimonials** - Social proof (if available)
7. **Blog** - Optional writing section
8. **Contact** - Working contact form

### Project Showcase Best Practices
- Include live demo and GitHub links
- Add project screenshots/videos
- Describe tech stack used
- Highlight your specific contributions
- Include challenges overcome
- Show before/after metrics if applicable

### Personal Branding
- Consistent color scheme throughout
- Professional photography/avatar
- Clear value proposition
- Unique personality elements
- Social proof (GitHub stats, testimonials)
- Call-to-action buttons (Hire Me, Download Resume)

## Maintenance

### Regular Updates
- Update dependencies monthly
- Refresh project information
- Update skills and experience
- Add new projects
- Review and update blog content
- Check and fix broken links
- Monitor analytics and optimize

### Performance Monitoring
- Regular Lighthouse audits
- Monitor Core Web Vitals in production
- Track user behavior with analytics
- A/B test different layouts/CTAs
