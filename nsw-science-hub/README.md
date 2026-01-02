# NSW Science Hub - Next.js Application

🚀 **Interactive science learning platform for NSW students (Years 7-12)**

## 📋 Project Overview

This is the production version of the NSW Science Hub, built with modern web technologies for scalability and maintainability.

**See [ARCHITECTURE.md](./ARCHITECTURE.md) for complete system design and development plan.**

## 🛠️ Tech Stack

- **Next.js 14** (App Router) + TypeScript
- **Tailwind CSS** + shadcn/ui
- **Supabase** (Auth + PostgreSQL)
- **Framer Motion** (Animations)

## 📁 Project Structure

```
nsw-science-hub/
├── ARCHITECTURE.md          ← MASTER REFERENCE - Read this!
├── app/                     ← Next.js pages
├── components/              ← React components
│   ├── lesson/             ← Lesson Player & activities
│   └── ui/                 ← shadcn/ui components
├── lib/                     ← Utilities
│   ├── supabase/           ← Supabase client
│   └── game/               ← XP/progress logic
├── types/                   ← TypeScript types
├── data/                    ← Lesson content (JSON)
│   └── lessons/
│       └── y7-u1-l01.json  ← Lesson files
└── public/                  ← Static assets
```

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Supabase

1. Create account at [supabase.com](https://supabase.com)
2. Create new project
3. Copy `.env.local.example` to `.env.local`
4. Add your Supabase credentials

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📚 Key Concepts

### Lesson Structure

Every lesson has:
- **5 Stages**: Introduction → Explore → Learn → Practice → Summary
- **Metadata**: Title, year, unit, NSW outcomes, XP
- **Activities**: Hooks, quizzes, drag-drop, challenges, etc.

### Content is Data

Lessons are **JSON files** in `/data/lessons/`:
- Easy to edit
- Version controlled
- AI-generated content
- No code changes needed to add lessons

### One Player, Many Lessons

The **Lesson Player** component renders any valid JSON lesson:
- Reusable code
- Bug fix once = fixed everywhere
- Consistent experience
- Scalable to 1000+ lessons

## 🎮 Game Mechanics

- **XP System**: 500 XP per lesson
- **Levels**: 100 XP per level
- **Streaks**: 2x at 3, 3x at 5 correct answers
- **Progress Tracking**: Saves to Supabase database

## 📖 Documentation

- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Complete system design (READ THIS FIRST!)
- **[lesson-schema.json](./lesson-schema.json)** - Lesson content schema
- **[/data/lessons/](./data/lessons/)** - Example lesson files

## 🔄 Development Workflow

1. **Check ARCHITECTURE.md** - Ensure you understand the current phase
2. **Create/edit lesson JSON** - Add content without touching code
3. **Test in Lesson Player** - Automatic rendering
4. **Deploy** - Push to production

## 🚫 Important: What NOT to Do

- ❌ Don't create standalone HTML lessons
- ❌ Don't duplicate code
- ❌ Don't put content in React components
- ❌ Don't use localStorage (use Supabase instead)
- ✅ DO refer to ARCHITECTURE.md regularly!

## 🎯 Current Status

**Phase 1: Foundation** (In Progress)
- ✅ Next.js project initialized
- ✅ TypeScript types defined
- ✅ First lesson extracted to JSON
- ⏳ Supabase setup (next step)
- ⏳ Lesson Player component
- ⏳ Activity renderers

See ARCHITECTURE.md for full roadmap.

## 📞 Need Help?

- **Lost?** → Read [ARCHITECTURE.md](./ARCHITECTURE.md)
- **Lesson structure?** → See [lesson-schema.json](./lesson-schema.json)
- **Example content?** → Check [data/lessons/y7-u1-l01.json](./data/lessons/y7-u1-l01.json)

## 📄 License

Educational use only - NSW Science Hub
