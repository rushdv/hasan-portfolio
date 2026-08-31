---
inclusion: auto
---

# Portfolio Animation & Design Guidelines

## Core Animation Philosophy
- **Performance First**: All animations must run at 60fps
- **Meaningful Motion**: Every animation should have a purpose (guide attention, provide feedback, show relationships)
- **Smooth & Natural**: Use easing functions that feel organic (ease-out for entrances, ease-in-out for transitions)
- **Accessibility**: Respect `prefers-reduced-motion` media query for users with motion sensitivity

## Animation Libraries & Tools

### Primary Animation Stack
1. **Framer Motion** (React animations)
   - Use for component animations, page transitions, and gesture interactions
   - Leverage `motion` components, variants, and orchestration
   - Example: `motion.div`, `AnimatePresence`, `useScroll`, `useTransform`

2. **GSAP** (Complex timelines & advanced effects)
   - Use for scroll-triggered animations, complex sequences, and SVG animations
   - ScrollTrigger plugin for scroll-based effects
   - Example: `gsap.to()`, `gsap.timeline()`, `ScrollTrigger.create()`

3. **React Spring** (Physics-based animations)
   - Use for natural, spring-based animations
   - Great for interactive elements and drag interactions

4. **Lottie** (Lightweight vector animations)
   - Use for custom illustrations and icon animations
   - Export from After Effects using Bodymovin

### CSS Animation Techniques
- Use `transform` and `opacity` for hardware-accelerated animations
- Avoid animating `width`, `height`, `top`, `left` (causes reflow)
- Use `will-change` sparingly for optimization hints

## Essential Animation Patterns

### 1. Page Load Animations
```typescript
// Stagger children entrance
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};
```

### 2. Scroll-Triggered Animations
```typescript
// Parallax effect with Framer Motion
const { scrollYProgress } = useScroll();
const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
```

### 3. Hover & Interaction States
```typescript
// Smooth hover with scale and glow
const buttonVariants = {
  rest: { scale: 1 },
  hover: { 
    scale: 1.05,
    boxShadow: "0 5px 20px rgba(0, 0, 0, 0.2)",
    transition: { duration: 0.3 }
  },
  tap: { scale: 0.95 }
};
```

### 4. Page Transitions
```typescript
// Smooth route transitions
<AnimatePresence mode="wait">
  <motion.div
    key={location.pathname}
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 20 }}
    transition={{ duration: 0.3 }}
  />
</AnimatePresence>
```

## Advanced Animation Effects

### Hero Section
- **Particle effects** background (canvas-based or Three.js)
- **Text reveal** animations (word-by-word or character-by-character)
- **Gradient animations** for dynamic backgrounds
- **3D transforms** for depth and perspective

### Project Showcases
- **Magnetic hover** effects (elements follow cursor)
- **Reveal on scroll** with blur-to-focus effect
- **Image parallax** layers for depth
- **Card flip** or **morph** animations on interaction

### Navigation
- **Smooth scroll** with easing
- **Active section highlighting** (intersection observer)
- **Menu animations** (hamburger to X, slide-in panels)
- **Cursor followers** (custom cursor with trail effect)

### Background Effects
- **Gradient mesh** animations
- **Floating shapes** with random motion
- **Grid patterns** with pulse effects
- **Noise textures** with subtle movement

## Performance Optimization

### Best Practices
1. **Lazy load** animation libraries and heavy components
2. Use `React.memo()` for components with complex animations
3. **Debounce** scroll and resize event handlers
4. **Reduce motion** fallback for accessibility:
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

5. Use `requestAnimationFrame` for custom animations
6. Implement **Intersection Observer** for scroll animations (only animate visible elements)

### Animation Performance Checklist
- [ ] All animations use `transform` and `opacity`
- [ ] No layout thrashing (batch DOM reads/writes)
- [ ] Animations pause when elements are off-screen
- [ ] Reduced motion support implemented
- [ ] 60fps maintained on mid-range devices

## Unique Animation Ideas for Portfolio

### Creative Effects
1. **Morphing blob cursor** that changes based on hovered element
2. **Text scramble** effect on page load (letters randomly change before settling)
3. **Liquid transitions** between sections (fluid SVG morphs)
4. **3D card stack** for projects (cards peel away on scroll)
5. **Parallax storytelling** (different layers move at different speeds)
6. **Magnetic grid** (grid items repel cursor like magnets)
7. **Typewriter effect** for hero tagline with cursor blink
8. **Ripple effect** on click/touch interactions
9. **Glassmorphism** cards with depth and blur
10. **Split text animations** (letters split and reveal)

### Micro-interactions
- Button press feedback with haptic-like animation
- Loading states with skeleton screens and shimmer
- Form validation with smooth error animations
- Toast notifications with slide and fade
- Tooltip appearances with scale and fade

## Color & Visual Effects

### Dynamic Theming
- Smooth theme transitions (light/dark mode)
- Gradient animations on hover
- Color shifts based on scroll position
- Accent color changes per section

### Visual Enhancements
- **Backdrop blur** for overlays and modals
- **Glow effects** for CTAs and highlights
- **Shadow depth** animations on elevation changes
- **Gradient text** with shimmer animation
- **Image reveal** with clip-path animations

## Code Quality Standards

### Animation Code Structure
```typescript
// Separate animation configs
export const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }
};

// Reusable animation component
export const AnimatedSection = ({ children, delay = 0 }) => (
  <motion.section
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-100px" }}
    transition={{ delay }}
  >
    {children}
  </motion.section>
);
```

### TypeScript for Animations
- Define types for animation variants
- Type animation props properly
- Use enums for animation states

## Testing Animations
- Test on different devices and browsers
- Verify performance with Chrome DevTools Performance tab
- Check for jank with FPS meter
- Test with `prefers-reduced-motion` enabled
- Validate touch interactions on mobile

## Resources & Inspiration
- **Awwwards** - Award-winning web design
- **Dribbble** - Animation design inspiration
- **CodePen** - Interactive animation examples
- **Framer Motion docs** - Best practices and examples
- **GSAP showcase** - Advanced animation techniques
