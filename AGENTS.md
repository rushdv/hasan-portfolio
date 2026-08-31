# AGENTS.md — Mehedi Hasan Portfolio

> **AI Agent Operating Manual** — Read this file completely before touching a single line of code.
> This is the **single source of truth** for every AI agent working on this repository.

---

## 🧠 Project Identity

| Field | Value |
|-------|-------|
| **Owner** | Mehedi Hasan |
| **Purpose** | Personal portfolio — CSE Student & Aspiring AI/ML Engineer |
| **Stack** | React 18 · TypeScript · Vite · TailwindCSS v3 · Framer Motion v11 |
| **Theme** | Dark cinematic editorial — amber/gold accent palette |
| **Persona** | Code × Exploration × Photography × AI ambition |
| **Tone** | Premium editorial — NOT corporate. NOT generic. |

---

## 🏗️ Architecture Overview

```
hasan-portfolio/
├── index.html                  ← SEO meta, Google Fonts, body classes
├── tailwind.config.js          ← Design system tokens (NEVER bypass these)
├── src/
│   ├── main.tsx                ← React root mount
│   ├── App.tsx                 ← Global layout & state orchestrator
│   ├── styles/index.css        ← Global CSS, keyframes, custom utilities
│   ├── types/                  ← TypeScript interfaces
│   ├── data/
│   │   └── portfolioData.ts    ← ALL content lives here. Edit content ONLY here.
│   └── components/
│       ├── CustomCursor.tsx    ← Context-aware cursor (desktop)
│       ├── Navbar.tsx          ← Sticky nav + admin controls
│       ├── Hero.tsx            ← Fullscreen cinematic entry
│       ├── TextBanner.tsx      ← Scrolling narrative transition banners
│       ├── About.tsx           ← Philosophy + animated typography
│       ├── TechStack.tsx       ← Skills in 3-column card grid
│       ├── Projects.tsx        ← Project showcase grid
│       ├── ProjectModal.tsx    ← Detailed project overlay
│       ├── Travel.tsx          ← Interactive travel journal
│       ├── TravelMap.tsx       ← SVG Bangladesh map with markers
│       ├── Photography.tsx     ← Masonry photo gallery
│       ├── Lightbox.tsx        ← Full-screen image viewer
│       ├── Education.tsx       ← University timeline
│       ├── Certificates.tsx    ← Credential cards
│       ├── LearningRoadmap.tsx ← Animated ML learning path
│       ├── Interests.tsx       ← Personal interest panels
│       ├── Contact.tsx         ← Final CTA + contact form
│       ├── Footer.tsx          ← Footer with links
│       ├── AdminAuthModal.tsx  ← Password-protected admin login
│       └── AdminTravelModal.tsx← Admin: add/edit travel entries
```

---

## 🎨 Design System — NON-NEGOTIABLE

### Color Tokens (defined in `tailwind.config.js`)

```js
bg: {
  primary:   '#08080a',   // Near-black page background
  surface:   '#111116',   // Elevated surface (section alternates)
  card:      '#16161d',   // Card background
  cardHover: '#1c1c26',   // Card hover state
}
accent: {
  amber: '#d4af37',       // PRIMARY accent — gold amber
  gold:  '#e5b869',       // Softer warm gold
  warm:  '#f59e0b',       // Bright warm pop
  glow:  'rgba(212,175,55,0.15)', // Ambient glow blobs
}
text: {
  primary:   '#f3f4f6',   // Main readable text
  secondary: '#9ca3af',   // Supporting / subtext
  muted:     '#6b7280',   // Labels, mono captions
}
border: {
  subtle: '#23232e',      // Low-contrast dividers
  accent: 'rgba(212,175,55,0.3)', // Highlighted borders
}
```

### Typography (Google Fonts — loaded in `index.html`)

| Variable | Font | Usage |
|----------|------|-------|
| `font-display` | Unbounded + Syne | Hero headings, section titles, project numbers |
| `font-sans` | Plus Jakarta Sans | Body text, paragraphs |
| `font-mono` | Space Grotesk + Fira Code | Labels, tags, metadata, captions |
| `font-serif` | Syne | Italic decorative words |

### Spacing & Layout

- Max content width: `max-w-7xl` (80rem)
- Section padding: `py-24 md:py-32 px-6 md:px-12`
- Grid: 12-column `grid-cols-12` for large breakpoints
- Cards: `rounded-2xl`, `border border-border-subtle`, `bg-bg-card`

---

## 🎬 Animation System

### Library: Framer Motion v11

Every section uses **scroll-triggered** entrance animations. Follow this exact pattern:

```tsx
// Standard scroll-in animation pattern
<motion.div
  initial={{ opacity: 0, y: 24 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: '-60px' }}
  transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
>
```

### Animation Catalog (what already exists — DO NOT duplicate)

| Animation | Where | How |
|-----------|-------|-----|
| Character-by-character reveal | Hero — Name | `CharReveal` component with staggered `y: 110% → 0%` |
| Cinematic crossfade slideshow | Hero — Background | 5 travel images, 5.5s interval, 2.4s crossfade |
| Ken Burns pan effect | Hero — BG images | Scale + XY transform over 8s |
| Film grain overlay | Hero | SVG noise filter at opacity 0.055 |
| Parallax scroll | Hero content | `useScroll` + `useTransform` Y offset |
| Infinite marquee | Hero bottom | CSS `animate-marquee` (TailwindCSS keyframe) |
| Stagger reveal | All sections | `whileInView` with `index * 0.1` delays |
| Hover lift | Cards, skill items | `hover:-translate-y-0.5` or `whileHover={{ y: -4 }}` |
| Ping pulse | "Open to opportunities" dot | `animate-ping` Tailwind class |

### Easing Curve Standard

```ts
// Premium cubic-bezier for entrances (Apple-style)
ease: [0.22, 1, 0.36, 1]

// Smooth exits
ease: [0.4, 0, 0.2, 1]

// Card hover
transition={{ duration: 0.3, ease: 'easeOut' }}
```

### New Animation Patterns Approved for Enhancement

```tsx
// 1. Magnetic hover for CTA buttons
const magneticRef = useRef<HTMLDivElement>(null);
// Uses mouse distance to subtly pull element toward cursor

// 2. Mouse-following ambient glow blob
const glowX = useMotionValue(0);
const glowY = useMotionValue(0);

// 3. Counter animation (for stats)
// Animate number from 0 to target on viewport entry

// 4. Text gradient scroll reveal
const backgroundSize = useTransform(scrollYProgress, [0, 1], ["0% 100%", "100% 100%"]);

// 5. 3D card tilt on hover
const rotateX = useTransform(mouseY, [-0.5, 0.5], [8, -8]);
const rotateY = useTransform(mouseX, [-0.5, 0.5], [-8, 8]);

// 6. Horizontal scroll carousel
const dragX = useMotionValue(0);

// 7. Blur fade entrance (for photography)
initial={{ opacity: 0, filter: 'blur(12px)' }}
animate={{ opacity: 1, filter: 'blur(0px)' }}
```

---

## 📁 Content Layer — `src/data/portfolioData.ts`

**GOLDEN RULE: ALL editable content lives ONLY in `portfolioData.ts`. Never hardcode content strings inside components.**

### Exports & Their Schemas

```ts
personalInfo      // name, title, roles[], tagline, location, socials{}
skillCategories   // SkillCategory[] — 3 groups: Core / Learning / Future
projects          // Project[] — 6 featured projects with problem/solution/learned
travelPlaces      // TravelPlace[] — Bangladesh locations with coordinates + stories
photoGallery      // PhotoItem[] — 8 photos with category, aspect ratio, caption
educationHistory  // EducationItem[] — University timeline
certificates      // CertificateItem[] — 4 credentials
roadmapSteps      // RoadmapStep[] — 6 ML learning milestones (completed/in-progress/upcoming)
personalInterests // PersonalInterest[] — 4 interest panels
```

### Important Content Details

- **Name:** Mehedi Hasan
- **University:** Northern University Bangladesh (B.Sc. CSE, 2023–present)
- **Location:** Dhaka, Bangladesh
- **Email:** mehedi.hasan.dev@gmail.com
- **GitHub:** https://github.com/mehedihasan-ml
- **AI/ML stack:** Python → NumPy/Pandas → SciKit-Learn → PyTorch (roadmap)
- **Travels:** Cox's Bazar, Sylhet, Dhaka, Bandarban, Sreemangal

---

## 🖱️ Custom Cursor System

The `CustomCursor.tsx` component accepts a `CursorState` union type:

```ts
type CursorState =
  | { type: 'default' }
  | { type: 'hover'; label?: string }
  | { type: 'project' }
  | { type: 'explore'; label?: string }
  | { type: 'open'; label?: string }
  | { type: 'drag' }
```

Every **interactive element** must wire these events:

```tsx
onMouseEnter={() => setCursorState({ type: 'hover', label: 'OPEN' })}
onMouseLeave={() => setCursorState({ type: 'default' })}
```

Context-specific states:
- Links → `{ type: 'open', label: 'LINK_NAME' }`
- Projects → `{ type: 'project' }`
- Images/galleries → `{ type: 'explore', label: 'VIEW' }`
- Draggable elements → `{ type: 'drag' }`

---

## 🔐 Admin System

The portfolio has a **password-protected admin panel** for managing travel entries:

- `AdminAuthModal.tsx` — modal for password authentication
- `AdminTravelModal.tsx` — CRUD interface for `TravelPlace[]`
- Admin state is managed in `App.tsx`:
  ```ts
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  ```
- **DO NOT** break or remove the admin authentication flow.
- Admin credentials are stored in `.env.local` — never expose them.

---

## 🧩 Component Props Contract

Every component follows this interface pattern:

```tsx
interface ComponentProps {
  setCursorState: (state: CursorState) => void;
  // component-specific props...
}
```

Some components have `setCursorState?` as optional — check before using.

**Prop drill chain:** `App.tsx` → each section component → `CustomCursor.tsx`

---

## ✍️ Code Standards

### TypeScript
- Strict mode enabled (`tsconfig.json`)
- All props must be typed with interfaces — no `any`
- Use type imports: `import type { ... } from '...'` when not using as value
- Functional components only — `React.FC<Props>` pattern
- No class components

### React Patterns
- `useRef` for DOM manipulation, `useState` for local UI state
- `useScroll` / `useTransform` from Framer Motion for parallax
- `whileInView` with `viewport={{ once: true }}` for scroll animations
- `AnimatePresence` for mount/unmount transitions
- Avoid `useEffect` for animations — prefer Framer Motion declarative API

### Styling Rules
- **Tailwind utility classes ONLY** — no inline `style={{}}` except for:
  - Dynamic values that cannot be expressed in Tailwind (e.g., SVG coordinates)
  - Framer Motion `style` prop for scroll-driven transforms
- Always use design system tokens (e.g., `bg-bg-card`, NOT `bg-[#16161d]`)
- Exception: Hero section uses direct hex `bg-[#080808]` for precision — allowed
- `clsx` + `tailwind-merge` are installed for conditional class merging

### File Structure
- One component per file
- Component name = filename (PascalCase)
- Named exports only: `export const ComponentName: React.FC<Props> = ...`

---

## 🚀 Development Commands

```bash
# Start dev server
npm run dev

# Type check
npx tsc --noEmit

# Build production bundle
npm run build

# Preview production build
npm run preview
```

Dev server runs on `http://localhost:5173` (default Vite port).

---

## 🎯 Enhancement Guidelines for AI Agents

### Priority Order for Improvements

When improving this portfolio, prioritize in this order:

1. **Animation depth** — richer entrance animations, micro-interactions
2. **Visual uniqueness** — elements that don't look like every other portfolio
3. **Storytelling** — sections that flow and connect narratively
4. **Performance** — never sacrifice speed for beauty
5. **Responsiveness** — every animation must work gracefully on mobile (reduced motion)

### Section Enhancement Checklist

Before marking any component work as complete:
- [ ] Scroll-triggered `whileInView` animation on section entry
- [ ] Staggered children reveal (delay = `index * 0.08` to `0.12`)
- [ ] Hover effects on all interactive cards/links
- [ ] Custom cursor events (`onMouseEnter`/`onMouseLeave`)
- [ ] Responsive: works on `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px)
- [ ] Consistent typography using design system fonts
- [ ] `viewport={{ once: true }}` to prevent re-triggering
- [ ] No layout shift on animation start (use `opacity + transform` only)
- [ ] `prefers-reduced-motion` respected via Framer Motion's `useReducedMotion`

### Adding a New Section

1. Create `src/components/NewSection.tsx`
2. Export as named export with `setCursorState` prop
3. Import in `App.tsx` and place in logical order
4. Add to Navbar `navLinks` array with correct `href` id
5. Add data to `portfolioData.ts` if content-driven
6. Add TypeScript interface to `src/types/index.ts`

---

## 🖼️ Images & Assets

### Local Images (in `public/images/`)
- `/images/mehedi_hasan.jpg` — Profile photo (used in Hero, About, Photography)
- `/images/travel_coxsbazar.jpg` — Cox's Bazar travel photo

### External Images
- All Unsplash images use `?auto=format&fit=crop&w=XXXXX&q=80` parameters
- Prefer `w=1200` for gallery, `w=2000` for fullscreen backgrounds
- Never use placeholder images — all images must be real content

### Favicon
- `/favicon.svg` — referenced in `index.html`

---

## 📐 Section Order & IDs (in `App.tsx`)

```
#hero       → Hero.tsx          (fullscreen cinematic landing)
#about      → About.tsx         (philosophy + animated typography)
#tech-stack → TechStack.tsx     (skills 3-column card grid)
#projects   → Projects.tsx      (work showcase)
[banner]    → TextBanner.tsx    (narrative transition: "STORY ARC // 02")
#travel     → Travel.tsx        (interactive Bangladesh travel journal)
#photography→ Photography.tsx   (masonry photo gallery)
#education  → Education.tsx     (university timeline)
#certs      → Certificates.tsx  (credentials)
#roadmap    → LearningRoadmap.tsx (ML learning path)
#interests  → Interests.tsx     (personal interest panels)
#contact    → Contact.tsx       (final CTA + form)
[footer]    → Footer.tsx
```

---

## ⚠️ Critical Rules — NEVER Violate

1. **Never replace TailwindCSS** with plain CSS or inline styles for component-level styling.
2. **Never hardcode content** — all data belongs in `portfolioData.ts`.
3. **Never remove** the `CustomCursor` system — every interactive element must wire cursor events.
4. **Never break** the Admin authentication modal flow (`AdminAuthModal` / `AdminTravelModal`).
5. **Never use** generic placeholder images or lorem ipsum text.
6. **Never skip** TypeScript typing — no implicit `any`.
7. **Never use** `!important` in CSS.
8. **Never install** `styled-components`, `emotion`, or any CSS-in-JS library.
9. **Always** use `viewport={{ once: true }}` on scroll animations to prevent re-firing.
10. **Always** test responsiveness at `sm`, `md`, `lg`, `xl` before considering work done.
11. **Never** hardcode pixel values when Tailwind spacing tokens (`p-6`, `gap-8`) exist.
12. **Always** preserve existing comments and docstrings in components.

---

## 🔍 Environment & Config

### `.env.local` (git-ignored)
Contains sensitive credentials — do not log, expose, or hardcode.
Read via `import.meta.env.VITE_*` pattern.

### `vite.config.ts`
Minimal config — React plugin only. Do not add heavy plugins without performance justification.

### `tsconfig.json`
- `strict: true` — enforce null checks, no implicit any
- `moduleResolution: bundler`

---

## 💡 Personality & Brand Voice

When writing any copy, labels, or UI text, match this voice:

- **Editorial, not corporate** — write like a design magazine, not a resume template
- **Concise but evocative** — short sentences with punchy descriptors
- **First person when personal** — "I build with code. I explore beyond it."
- **ALL CAPS for labels/tags** — section titles, skill badges, category labels
- **Sentence case for body** — descriptive paragraphs flow naturally
- **Monospace font for metadata** — dates, locations, version numbers, code snippets

### Amber/Gold Accent Usage
- Use sparingly for **maximum impact** — highlight words, not paragraphs
- Never use amber on amber background
- Primary CTA buttons: `bg-accent-amber text-[#080808]` (dark text on gold)
- Secondary elements: amber borders, amber underlines, amber dots

---

## 📊 Performance Budget

| Metric | Target |
|--------|--------|
| FCP (First Contentful Paint) | < 1.5s |
| LCP (Largest Contentful Paint) | < 2.5s |
| CLS (Cumulative Layout Shift) | < 0.1 |
| Bundle size (gzipped) | < 300KB JS |

### Performance Rules
- All background images: load via `<img>` with `object-cover`, NOT CSS `background-image` (for LCP)
- Use `loading="lazy"` on all non-hero images
- Framer Motion: prefer `transform` and `opacity` only — never animate `width`, `height`, `top`, `left`
- Heavy animations (blur, backdrop-filter): use sparingly, only when necessary
- `will-change: transform` on elements with continuous animations

---

## 🛠️ Debugging Checklist

If something looks broken, check in this order:

1. **TypeScript errors** — run `npx tsc --noEmit` first
2. **Missing props** — check `CursorState` prop is passed correctly
3. **Animation not triggering** — verify `viewport={{ once: true }}` and `margin` value
4. **Colors wrong** — check you're using Tailwind tokens, not hardcoded hex
5. **Layout broken** — check responsive grid classes at `lg:` breakpoint
6. **Data not showing** — verify import from `portfolioData.ts` is correct
7. **Admin features** — check `isAdminAuthenticated` state flows from `App.tsx`

---

*Last updated: 2026-08-31 | Maintained by AI agent on behalf of Mehedi Hasan*
