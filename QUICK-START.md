# ⚡ Quick Start Guide

Get up and running with the portfolio in 5 minutes.

---

## 🎯 For Developers

### 1. Clone & Install (2 minutes)

```bash
# Clone repository
git clone https://github.com/mehedihasan-ml/hasan-portfolio.git
cd hasan-portfolio

# Install dependencies
npm install
```

### 2. Environment Setup (1 minute)

```bash
# Create environment file
cp .env.example .env.local

# Edit with your editor
nano .env.local  # or code .env.local
```

Add:
```env
VITE_ADMIN_USERNAME=admin
VITE_ADMIN_PASSWORD=your_password_here
```

### 3. Start Development (30 seconds)

```bash
npm run dev
```

Open **http://localhost:5173** 🎉

---

## 🤖 For AI-Assisted Development

### First-Time Setup

**1. Read Project Rules**
```
"Read .kiro/steering/AGENTS.md and summarize the key rules"
```

**2. Understand Structure**
```
"Explain the project structure based on PROJECT-STRUCTURE.md"
```

**3. Review Design System**
```
"Show me the color palette and typography from tailwind.config.js"
```

### Making Your First Change

**Update Content** (Easiest)
```
"In src/data/portfolioData.ts, change my email to: newemail@example.com"
```

**Add a Project** (Easy)
```
"Add a new project to src/data/portfolioData.ts:
- Title: My Awesome App
- Description: A cool project I built
- Tech: React, TypeScript, Tailwind
- GitHub: https://github.com/user/repo"
```

**Modify Colors** (Medium)
```
"In tailwind.config.js, change the accent color from gold (#d4af37) to purple (#a855f7). Update all components that use it."
```

**Add New Component** (Advanced)
```
"Create a new Testimonials section:
- 3-column grid of cards
- Shows client feedback
- Animated entrance
- Add to App.tsx after Projects section"
```

See **[AI-WORKFLOW.md](AI-WORKFLOW.md)** for complete guide.

---

## 📝 Common Tasks

### Update Personal Info
**File**: `src/data/portfolioData.ts`

```typescript
export const personalInfo = {
  name: "Your Name",          // Change this
  email: "your@email.com",    // And this
  // ... other fields
}
```

### Add New Project
**File**: `src/data/portfolioData.ts`

```typescript
export const projects: Project[] = [
  {
    id: "unique-id",
    number: "07",  // Next number
    title: "YOUR PROJECT",
    // ... fill in details
  },
  // ... existing projects
];
```

### Change Colors
**File**: `tailwind.config.js`

```javascript
colors: {
  accent: {
    amber: '#your-color',  // Change primary accent
  }
}
```

### Add New Page Section
1. Create `src/components/YourSection.tsx`
2. Add to `src/App.tsx`
3. Add to Navbar links
4. Add data to `portfolioData.ts` (if needed)

---

## 🚀 Deploy in 3 Steps

### Vercel (Recommended)

**1. Connect GitHub**
- Go to [vercel.com](https://vercel.com)
- Import your GitHub repository

**2. Configure**
```
Framework: Vite
Build Command: npm run build
Output Directory: dist
```

**3. Add Environment Variables**
```
VITE_ADMIN_USERNAME = admin
VITE_ADMIN_PASSWORD = your_password
```

Deploy! ✅

---

## 🐛 Troubleshooting

### Dev server won't start
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### TypeScript errors
```bash
# Check for errors
npx tsc --noEmit

# If errors persist, check:
# 1. All imports are correct
# 2. Types match interfaces
# 3. No missing properties
```

### Build fails
```bash
# Check build output
npm run build

# Common issues:
# - TypeScript errors (fix first)
# - Missing environment variables
# - Import errors
```

### Styling issues
```bash
# Rebuild Tailwind
npm run dev  # Stop and restart

# Check:
# - Class names are correct
# - Using design system tokens
# - No typos in Tailwind classes
```

---

## 📚 Learn More

- **Full Guide**: [AI-WORKFLOW.md](AI-WORKFLOW.md)
- **Structure**: [PROJECT-STRUCTURE.md](PROJECT-STRUCTURE.md)
- **Rules**: [.kiro/steering/AGENTS.md](.kiro/steering/AGENTS.md)
- **README**: [README.md](README.md)

---

## 💬 Need Help?

1. Check documentation files above
2. Read error messages carefully
3. Search existing issues on GitHub
4. Ask AI assistant with specific details

---

## 🎉 You're Ready!

Now you can:
- ✅ Edit content in `portfolioData.ts`
- ✅ Customize colors in `tailwind.config.js`
- ✅ Add new components
- ✅ Use AI assistance effectively
- ✅ Deploy to production

**Happy building!** 🚀
