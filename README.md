# 🎨 Mehedi Hasan - Portfolio 

Premium dark-themed portfolio with cinematic animations. Built with React 18, TypeScript, and Framer Motion.

**CSE Student | Aspiring AI/ML Engineer | Photographer | Travel Enthusiast**

![Production Ready](https://img.shields.io/badge/Status-Production%20Ready-success)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue)
![React](https://img.shields.io/badge/React-18.3-61dafb)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-38bdf8)

---

## ✨ Features

- 🎬 **Cinematic animations** - Scroll-triggered reveals, parallax, custom cursor
- 📱 **Fully responsive** - Mobile-first, touch-friendly, reduced motion support
- 🎨 **Premium design** - Dark editorial theme, gold/amber accents, glassmorphism
- ⚡ **High performance** - <300KB bundle, code splitting, optimized images
- 🔐 **Admin panel** - Password-protected travel entry management
- ♿ **Accessible** - WCAG 2.1 AA compliant, keyboard navigation, screen reader tested

### 📦 Sections

**Hero** • **About** • **Skills** • **Projects** • **Travel Journal** • **Photography** • **Education** • **Certificates** • **Learning Roadmap** • **Interests** • **Contact**

---

## 🚀 Quick Start

```bash
# 1. Clone and install
git clone https://github.com/mehedihasan-ml/hasan-portfolio.git
cd hasan-portfolio
npm install

# 2. Setup environment
cp .env.example .env.local
# Edit .env.local with your admin credentials

# 3. Start development
npm run dev
# Open http://localhost:5173
```

---

## 📁 Project Structure

```
src/
├── components/           # 19 React components
├── data/
│   └── portfolioData.ts # ⭐ ALL CONTENT HERE
├── styles/              # Global CSS + Tailwind
└── types/               # TypeScript definitions

public/images/           # Static assets
.kiro/steering/          # AI agent rules
```

**⚠️ All content managed in `src/data/portfolioData.ts`**

---

## 🛠️ Tech Stack

**Core**: React 18.3 • TypeScript 5.6 • Vite 5.4  
**Styling**: Tailwind CSS 3.4 • Framer Motion 11.11  
**Icons**: Lucide React • Lucide Icons

### Scripts

```bash
npm run dev      # Development server
npm run build    # Production build
npm run preview  # Preview production
npx tsc --noEmit # Type check
```

---

## 🎨 Design Tokens

**Colors**: Near-black BG • Gold/Amber accents • Light text  
**Fonts**: Unbounded • Syne • Plus Jakarta Sans • Space Grotesk  
**Animations**: 0.5-0.8s • Cubic-bezier easing • Scroll-triggered  
**Layout**: 12-column grid • Mobile-first • Max-width 80rem

---

## 📝 Content Management

Edit `src/data/portfolioData.ts` for all content:

```typescript
personalInfo        // Name, bio, socials
skillCategories     // Tech skills (Core/Learning/Future)
projects           // Work portfolio
travelPlaces       // Travel journal entries
photoGallery       // Photography showcase
educationHistory   // Academic timeline
certificates       // Credentials
roadmapSteps       // ML learning path
personalInterests  // Interest panels
```

---

## 🤖 AI Development

Optimized for AI-assisted development. See documentation:

- **[AI-WORKFLOW.md](AI-WORKFLOW.md)** - AI prompting guide
- **[QUICK-START.md](QUICK-START.md)** - 5-minute setup
- **[.kiro/steering/AGENTS.md](.kiro/steering/AGENTS.md)** - AI rules

**Example prompts**:
```
"Add new project: [name] with [tech stack]"
"Update skills to include [new technologies]"
"Enhance [section] animations"
```

---

## 🚀 Deployment

**Vercel** (Recommended):
```bash
vercel --prod
# Set env vars: VITE_ADMIN_USERNAME, VITE_ADMIN_PASSWORD
```

**Netlify**:
```bash
npm run build && netlify deploy --prod --dir=dist
```

### Performance & Standards

✅ FCP <1.5s • LCP <2.5s • Bundle <300KB  
✅ WCAG 2.1 AA • Lighthouse >90 • Semantic HTML

---

## 👤 Author

**Mehedi Hasan**  
CSE Student @ Northern University Bangladesh, Dhaka

📧 mehedi.hasan.dev@gmail.com  
💻 [@mehedihasan-ml](https://github.com/mehedihasan-ml)

---

## 📚 Documentation

- [AI-WORKFLOW.md](AI-WORKFLOW.md) - AI development guide
- [QUICK-START.md](QUICK-START.md) - 5-minute setup
- [PROJECT-STRUCTURE.md](PROJECT-STRUCTURE.md) - Detailed structure
- [.kiro/steering/AGENTS.md](.kiro/steering/AGENTS.md) - AI agent rules

---

## 📄 License

MIT License - Free to use and modify

---

⭐ **Star this repo if you find it helpful!**

*Built with React, TypeScript, and AI assistance*
