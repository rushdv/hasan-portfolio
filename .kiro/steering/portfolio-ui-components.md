---
inclusion: auto
---

# Portfolio UI Components Library

## Component Architecture

### Base Components
Foundational, reusable components used throughout the portfolio.

#### Button Component
```typescript
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'ghost' | 'outline';
  size: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

// Features:
// - Animated hover and active states
// - Loading spinner integration
// - Icon support (left or right)
// - Ripple effect on click
// - Keyboard accessible
```

#### Card Component
```typescript
interface CardProps {
  children: React.ReactNode;
  variant: 'default' | 'glass' | 'elevated' | 'outlined';
  hoverable?: boolean;
  interactive?: boolean;
  glowEffect?: boolean;
}

// Features:
// - Glassmorphism variant
// - 3D tilt effect on hover
// - Smooth shadow transitions
// - Optional glow effect
// - Responsive padding
```

#### Input Component
```typescript
interface InputProps {
  type: 'text' | 'email' | 'tel' | 'textarea';
  label: string;
  placeholder?: string;
  error?: string;
  icon?: React.ReactNode;
  required?: boolean;
  disabled?: boolean;
}

// Features:
// - Floating label animation
// - Error state with shake animation
// - Focus glow effect
// - Character counter for textarea
// - Icon support
```

### Section Components
Full-width sections that make up the portfolio pages.

#### Hero Section
```typescript
// Features:
// - Animated gradient background or particle system
// - Text reveal animation (word by word)
// - Typewriter effect for tagline
// - Scroll indicator with bounce animation
// - Profile image with glow effect
// - CTA buttons with magnetic hover
// - Social links with stagger animation

// Layout variants:
// - Center-aligned with large text
// - Split layout (text left, visual right)
// - Full-screen with background video
// - Minimal with focus on typography
```

#### About Section
```typescript
// Features:
// - Profile image with frame animation
// - Stats counter with count-up animation
// - Bio text with fade-in on scroll
// - Skill tags with hover effects
// - Timeline of journey (optional)
// - Downloadable resume button

// Layout options:
// - Two-column (image + text)
// - Centered with circular image
// - Grid layout with multiple cards
```

#### Projects Section
```typescript
interface ProjectsSectionProps {
  layout: 'grid' | 'masonry' | 'slider' | 'stack';
  filterEnabled?: boolean;
  categories?: string[];
}

// Features:
// - Multiple layout options
// - Filter by technology/category
// - Animated project cards
// - Hover reveal of details
// - Modal for detailed view
// - Lazy loading of images
// - Sortable (featured, recent, etc.)

// Card animations:
// - Scale up on hover
// - Image parallax effect
// - Reveal overlay with details
// - Magnetic cursor effect
```

#### Skills/Tech Stack Section
```typescript
// Layout variants:
// 1. Icon grid with labels
// 2. Animated skill bars
// 3. Circular progress indicators
// 4. 3D card carousel
// 5. Floating icons animation
// 6. Hexagon grid layout

// Features:
// - Grouped by category (Frontend, Backend, Tools, etc.)
// - Proficiency levels
// - Animated on scroll reveal
// - Hover for more details
// - Tech logos with tooltips
```

#### Experience/Timeline Section
```typescript
// Features:
// - Vertical timeline with animations
// - Alternating left/right cards
// - Company logos
// - Date ranges
// - Expandable details
// - Smooth scroll animations
// - Connect lines between items

// Variants:
// - Linear timeline
// - Zigzag timeline
// - Card-based layout
// - Accordion style
```

#### Contact Section
```typescript
// Features:
// - Working contact form
// - Form validation with animations
// - Success/error notifications
// - Email/phone/social links
// - Location map (optional)
// - Availability status
// - Response time indicator

// Form features:
// - Real-time validation
// - Character limits
// - File attachment (resume)
// - Spam protection (honeypot or reCAPTCHA)
// - Success animation
```

### Interactive Components

#### Project Modal
```typescript
interface ProjectModalProps {
  project: Project;
  onClose: () => void;
  isOpen: boolean;
}

// Features:
// - Full-screen modal overlay
// - Image gallery with navigation
// - Tech stack icons
// - Description and highlights
// - Live demo and GitHub links
// - Next/Previous project navigation
// - Close animation
// - Keyboard navigation (ESC, arrows)
```

#### Image Lightbox
```typescript
// Features:
// - Full-screen image viewer
// - Zoom in/out functionality
// - Swipe/arrow navigation
// - Thumbnail strip
// - Smooth transitions
// - Keyboard controls
// - Touch gestures (mobile)
```

#### Navigation Bar
```typescript
// Features:
// - Sticky/fixed positioning
// - Scroll-based hide/show
// - Active section highlighting
// - Smooth scroll to sections
// - Hamburger menu (mobile)
// - Theme toggle (dark/light)
// - Logo with animation

// Variants:
// - Transparent with backdrop blur
// - Solid background
// - Split layout (logo left, links right)
// - Center-aligned
// - Side navigation drawer (mobile)
```

#### Custom Cursor
```typescript
// Features:
// - Follows mouse movement
// - Changes on hover (links, buttons)
// - Trail effect
// - Magnetic effect (attracted to buttons)
// - Blend modes for visual interest
// - Smooth lag animation
// - Hidden on mobile/touch devices
```

#### Scroll Progress Bar
```typescript
// Features:
// - Shows scroll progress (0-100%)
// - Fixed at top or bottom
// - Smooth color transitions
// - Optional percentage display
// - Animated on page load
```

### Animation Components

#### Reveal on Scroll
```typescript
interface RevealProps {
  children: React.ReactNode;
  direction: 'up' | 'down' | 'left' | 'right' | 'fade';
  delay?: number;
  duration?: number;
  once?: boolean;
}

// Features:
// - Multiple reveal directions
// - Stagger children option
// - Intersection Observer based
// - Customizable threshold
// - Play once or repeat
```

#### Parallax Container
```typescript
interface ParallaxProps {
  children: React.ReactNode;
  speed: number; // -1 to 1 (negative = reverse)
  direction: 'vertical' | 'horizontal';
}

// Features:
// - Smooth parallax scrolling
// - Configurable speed
// - Multiple layers support
// - Mobile-friendly (can be disabled)
```

#### Text Animator
```typescript
interface TextAnimatorProps {
  text: string;
  animation: 'typewriter' | 'fadeIn' | 'slideIn' | 'scramble' | 'wave';
  speed?: number;
  delay?: number;
}

// Animations:
// - Typewriter: letter by letter reveal
// - FadeIn: word by word fade
// - SlideIn: words slide from direction
// - Scramble: random letters settle
// - Wave: letters wave in sequence
```

#### Background Effects
```typescript
// 1. Particle System
// - Canvas-based particles
// - Mouse interaction
// - Configurable colors and density
// - Performance optimized

// 2. Gradient Mesh
// - Animated gradient blobs
// - Smooth color transitions
// - CSS or WebGL based

// 3. Grid Pattern
// - Animated dots or lines
// - Perspective grid
// - Glow on hover

// 4. Floating Shapes
// - SVG shapes with random motion
// - Parallax layers
// - Blur effects
```

### Utility Components

#### Section Container
```typescript
interface SectionProps {
  id: string;
  className?: string;
  fullHeight?: boolean;
  children: React.ReactNode;
}

// Features:
// - Consistent padding and spacing
// - Responsive width constraints
// - Optional full viewport height
// - Intersection observer for nav highlighting
```

#### Loading Spinner
```typescript
// Variants:
// - Circular spinner
// - Dots pulse
// - Line scale
// - Custom logo animation
// - Skeleton screens

// Features:
// - Smooth fade in/out
// - Overlay option
// - Size variants (sm, md, lg)
// - Color customization
```

#### Toast Notifications
```typescript
interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
  position: 'top-right' | 'top-center' | 'bottom-right' | 'bottom-center';
}

// Features:
// - Auto-dismiss after duration
// - Slide in animation
// - Stack multiple toasts
// - Progress bar
// - Close button
// - Icon based on type
```

#### Tooltip
```typescript
// Features:
// - Multiple positions (top, bottom, left, right)
// - Fade in/out animation
// - Arrow pointer
// - Delay before show
// - Max width constraint
// - Light/dark variants
```

#### Modal/Dialog
```typescript
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size: 'sm' | 'md' | 'lg' | 'full';
  closeOnOutsideClick?: boolean;
}

// Features:
// - Backdrop blur overlay
// - Scale up animation
// - Focus trap
// - Close on ESC key
// - Scroll lock on body
// - Accessible (ARIA)
```

## Component Composition Patterns

### Compound Components
```typescript
// Example: Card with sub-components
<Card>
  <Card.Image src="..." />
  <Card.Header>Title</Card.Header>
  <Card.Body>Content</Card.Body>
  <Card.Footer>Actions</Card.Footer>
</Card>
```

### Render Props
```typescript
// Example: Mouse tracker
<MouseTracker>
  {(position) => (
    <Cursor x={position.x} y={position.y} />
  )}
</MouseTracker>
```

### Higher-Order Components
```typescript
// Example: With animation wrapper
const AnimatedComponent = withRevealAnimation(MyComponent, {
  direction: 'up',
  duration: 0.6
});
```

## Responsive Design Patterns

### Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px
- Large Desktop: > 1536px

### Mobile-First Approach
```typescript
// Default styles for mobile
<div className="
  text-sm p-4
  md:text-base md:p-6
  lg:text-lg lg:p-8
">
```

### Adaptive Components
```typescript
// Show different layouts based on screen size
{isMobile ? <MobileLayout /> : <DesktopLayout />}
```

## Theme System

### Color Scheme
```typescript
const theme = {
  light: {
    background: '#ffffff',
    foreground: '#000000',
    primary: '#3b82f6',
    secondary: '#8b5cf6',
    accent: '#f59e0b',
    muted: '#6b7280',
  },
  dark: {
    background: '#0f172a',
    foreground: '#f1f5f9',
    primary: '#60a5fa',
    secondary: '#a78bfa',
    accent: '#fbbf24',
    muted: '#94a3b8',
  }
};
```

### Theme Toggle
```typescript
// Features:
// - Smooth transition between themes
// - Persist preference in localStorage
// - System preference detection
// - Icon animation on toggle
// - No flash on page load
```

## Performance Considerations

### Component Optimization
- Use `React.memo()` for expensive renders
- Implement `useMemo()` for complex calculations
- Use `useCallback()` for event handlers passed to children
- Lazy load heavy components
- Code split routes and modals

### Animation Performance
- Limit simultaneous animations
- Use `transform` and `opacity` only
- Implement Intersection Observer
- Pause off-screen animations
- Reduce motion for accessibility

## Accessibility Checklist for Components

- [ ] Semantic HTML elements
- [ ] ARIA labels and roles
- [ ] Keyboard navigation support
- [ ] Focus indicators visible
- [ ] Color contrast ratios met
- [ ] Screen reader tested
- [ ] Touch target sizes (min 44x44px)
- [ ] Form labels associated
- [ ] Error messages announced
- [ ] Loading states communicated

## Component Testing

### Test Coverage
- Unit tests for logic
- Integration tests for user flows
- Visual regression tests
- Accessibility tests (jest-axe)
- Performance tests (React DevTools Profiler)

### Example Test Structure
```typescript
describe('Button Component', () => {
  it('renders with correct text', () => {});
  it('calls onClick when clicked', () => {});
  it('shows loading spinner when loading', () => {});
  it('is keyboard accessible', () => {});
  it('meets accessibility standards', () => {});
});
```

## Component Documentation Template

```typescript
/**
 * ComponentName
 * 
 * Description of what the component does and when to use it.
 * 
 * @example
 * <ComponentName
 *   prop1="value"
 *   prop2={true}
 * />
 * 
 * @param {string} prop1 - Description
 * @param {boolean} prop2 - Description
 * 
 * @features
 * - Feature 1
 * - Feature 2
 * 
 * @accessibility
 * - Keyboard accessible
 * - Screen reader compatible
 */
```
