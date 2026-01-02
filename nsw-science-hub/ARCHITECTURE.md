# NSW Science Hub - Architecture & Development Plan

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [The Problem We're Solving](#the-problem-were-solving)
3. [Architecture Design](#architecture-design)
4. [Technology Stack](#technology-stack)
5. [File Structure](#file-structure)
6. [Development Phases](#development-phases)
7. [Lesson Content Schema](#lesson-content-schema)
8. [Database Schema](#database-schema)
9. [Key Principles](#key-principles)
10. [What We've Completed](#what-weve-completed)
11. [Current Phase](#current-phase)

---

## 📖 Project Overview

**Goal**: Create an interactive, gamified science learning platform for NSW students (Years 7-12) with 160+ comprehensive lessons.

**Target Users**:
- Students (Years 7-12)
- Teachers (progress monitoring, class management)

**Key Requirements**:
- Highly engaging and educational
- Students want to use it
- Students learn effectively
- Scalable to 160+ lessons
- Cross-device progress tracking
- Teacher visibility into student progress

---

## 🚨 The Problem We're Solving

### What We Built First (Prototype):
- 4 standalone HTML lessons (Lessons 1-4, Year 7 Unit 1)
- Each lesson: ~2,250 lines of HTML/CSS/JavaScript
- Content, styling, and game logic all in one file
- localStorage-only progress (device-specific)

### Why This Won't Scale:
1. **Maintenance Nightmare**: Bug fix = edit 80 files for Year 7 alone
2. **No Scalability**: 160 lessons × 2,250 lines = 360,000 lines of duplicated code
3. **No Real Progress**: localStorage is device-only, can't sync across devices
4. **No Teacher Visibility**: Teachers can't see student progress
5. **Content Trapped in Code**: Can't easily edit questions or bulk update
6. **Security Issues**: "Teacher mode" is just JavaScript - students can hack it
7. **Inconsistent Updates**: Fixing XP system in one lesson doesn't update others

### The Solution:
**Separate the engine from the content.**
- ONE lesson player (reusable code)
- MANY lesson files (JSON content)
- REAL database (user accounts, progress tracking)

---

## 🏗️ Architecture Design

```
┌─────────────────────────────────────────────────────────────────┐
│                         FRONTEND (Next.js)                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌────────────────────────────────────────────────────────┐   │
│  │           LESSON PLAYER (One Template)                  │   │
│  │  - Game mechanics (XP, levels, streaks)                │   │
│  │  - Stage system (Intro/Explore/Learn/Practice/Summary) │   │
│  │  - Progress bar & unlocking                            │   │
│  │  - Activity renderers                                   │   │
│  └────────────────────────────────────────────────────────┘   │
│                           ↓ loads ↓                             │
│  ┌────────────────────────────────────────────────────────┐   │
│  │        LESSON CONTENT (JSON Files)                      │   │
│  │  /data/lessons/y7-u1-l01.json                          │   │
│  │  /data/lessons/y7-u1-l02.json                          │   │
│  │  /data/lessons/y7-u1-l03.json                          │   │
│  │  { metadata, stages[], activities[], questions[] }     │   │
│  └────────────────────────────────────────────────────────┘   │
│                           ↓ saves to ↓                          │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                   BACKEND (Supabase)                             │
├─────────────────────────────────────────────────────────────────┤
│  ┌────────────────────────────────────────────────────────┐   │
│  │              AUTHENTICATION                             │   │
│  │  - Email/password login                                │   │
│  │  - Student accounts                                     │   │
│  │  - Teacher accounts (future)                           │   │
│  └────────────────────────────────────────────────────────┘   │
│                                                                  │
│  ┌────────────────────────────────────────────────────────┐   │
│  │              DATABASE (PostgreSQL)                      │   │
│  │                                                         │   │
│  │  Tables:                                               │   │
│  │  - users (id, email, role, created_at)                │   │
│  │  - lesson_progress (user_id, lesson_id, xp,          │   │
│  │                      current_stage, completed)         │   │
│  │  - lesson_events (user_id, lesson_id, event_type,    │   │
│  │                    timestamp, data)                    │   │
│  │                                                         │   │
│  │  Row-Level Security: Students only see own data       │   │
│  └────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Technology Stack

### Frontend
- **Next.js 14** (App Router) - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **Framer Motion** - Animations (for gamification)

### Backend
- **Supabase** - Backend-as-a-Service
  - Authentication (email/password)
  - PostgreSQL database
  - Row-Level Security (RLS)
  - Real-time subscriptions (future: live teacher dashboard)

### Hosting
- **Vercel** - Frontend deployment (free tier)
- **Supabase** - Backend hosting (free tier)

### Why These Choices?
- **Next.js**: Industry standard, great DX, server-side rendering, easy deployment
- **Supabase**: No need to build auth from scratch, generous free tier, easy to use
- **TypeScript**: Catches errors early, better IDE support, self-documenting
- **Tailwind**: Fast styling, consistent design, responsive by default

---

## 📁 File Structure

```
nsw-science-hub/
├── ARCHITECTURE.md                    ← THIS FILE (always refer back!)
├── lesson-schema.json                 ← Schema definition for lessons
├── README.md                          ← Project README
│
├── prototypes/                        ← Old standalone HTML lessons (reference only)
│   ├── year-7/
│   │   └── unit-1/
│   │       ├── lesson-01.html        ← Design reference
│   │       ├── lesson-02.html
│   │       ├── lesson-03.html
│   │       └── lesson-04.html
│   └── README.md                      ← Explains these are prototypes
│
├── app/                               ← Next.js App (NEW SYSTEM)
│   ├── layout.tsx                     ← Root layout
│   ├── page.tsx                       ← Homepage
│   ├── (auth)/                        ← Authentication pages
│   │   ├── login/
│   │   └── signup/
│   ├── (dashboard)/                   ← Main app
│   │   ├── lessons/
│   │   │   └── [lessonId]/
│   │   │       └── page.tsx          ← Lesson Player renders here
│   │   └── profile/
│   └── api/                           ← API routes (if needed)
│
├── components/                        ← React components
│   ├── ui/                           ← shadcn/ui components
│   ├── lesson/                       ← Lesson-specific components
│   │   ├── LessonPlayer.tsx          ← CORE: Renders any lesson
│   │   ├── GameHUD.tsx               ← XP, level, streak display
│   │   ├── StageNavigator.tsx        ← Stage sidebar
│   │   └── activities/               ← Activity renderers
│   │       ├── QuizActivity.tsx
│   │       ├── DragDropActivity.tsx
│   │       ├── ChallengeLevelsActivity.tsx
│   │       ├── MasteryChecklistActivity.tsx
│   │       └── index.ts
│   └── layout/                       ← Layout components
│       ├── Navbar.tsx
│       └── Sidebar.tsx
│
├── lib/                              ← Utilities & helpers
│   ├── supabase/
│   │   ├── client.ts                ← Supabase client
│   │   └── auth.ts                  ← Auth helpers
│   ├── game/
│   │   ├── xp-system.ts            ← XP calculation logic
│   │   └── progress.ts             ← Progress tracking
│   └── utils.ts                     ← General utilities
│
├── data/                            ← Lesson content (JSON)
│   └── lessons/
│       ├── y7-u1-l01.json          ← Lesson 1: What is Science?
│       ├── y7-u1-l02.json          ← Lesson 2: Observation vs Inference
│       ├── y7-u1-l03.json          ← Lesson 3: Scientific Questions
│       ├── y7-u1-l04.json          ← Lesson 4: Predictions and Variables
│       └── ... (156 more lessons)
│
├── types/                           ← TypeScript type definitions
│   ├── lesson.ts                   ← Lesson content types
│   ├── user.ts                     ← User & auth types
│   └── database.ts                 ← Database types
│
├── supabase/                        ← Supabase config
│   ├── migrations/                 ← Database migrations
│   └── seed.sql                    ← Sample data
│
├── public/                          ← Static assets
│   └── images/
│
└── package.json
```

---

## 🚀 Development Phases

### ✅ Phase 0: Prototyping (COMPLETED)
**Goal**: Validate design and interaction patterns
- [x] Create 4 standalone HTML lessons
- [x] Test gamification (XP, streaks, levels)
- [x] Validate activity types (quiz, drag-drop, challenges)
- [x] Confirm visual design works

**Outcome**: We have a proven design. Now we architect it properly.

---

### 🔄 Phase 1: Foundation (CURRENT)
**Goal**: Set up the new system architecture

**Steps**:
1. ✅ Create ARCHITECTURE.md (this file)
2. ✅ Design lesson JSON schema
3. ⏳ Extract Lesson 1 content into JSON
4. ⏳ Initialize Next.js project
5. ⏳ Set up Supabase project
6. ⏳ Create database schema
7. ⏳ Set up authentication

**Acceptance Criteria**:
- Next.js app runs locally
- Supabase connected
- Users can sign up/login
- Database tables created

---

### 📦 Phase 2: Core Engine
**Goal**: Build the reusable Lesson Player

**Steps**:
1. Build LessonPlayer component
2. Build GameHUD (XP, streak, level display)
3. Build StageNavigator (5-stage sidebar)
4. Build activity renderers:
   - QuizActivity
   - DragDropActivity
   - ChallengeLevelsActivity
   - InfoCardActivity
   - HookActivity
   - MasteryChecklistActivity
5. Implement XP/streak logic
6. Implement progress saving to database

**Acceptance Criteria**:
- Lesson Player can render any valid JSON lesson
- All activity types work
- Progress saves to Supabase
- Users can resume lessons

---

### 🎯 Phase 3: Port Prototypes
**Goal**: Convert 4 HTML lessons to JSON

**Steps**:
1. Extract Lesson 1 (What is Science?) → y7-u1-l01.json
2. Extract Lesson 2 (Observation vs Inference) → y7-u1-l02.json
3. Extract Lesson 3 (Scientific Questions) → y7-u1-l03.json
4. Extract Lesson 4 (Predictions and Variables) → y7-u1-l04.json
5. Test all 4 lessons in new system
6. Compare to HTML prototypes (ensure feature parity)

**Acceptance Criteria**:
- All 4 lessons work in new system
- Visual design matches prototypes
- All interactions work
- Progress tracking works

---

### 🌟 Phase 4: Scale to 160 Lessons
**Goal**: Create all lesson content

**Steps**:
1. Create JSON template for easy authoring
2. Use AI to generate lesson content based on lesson sequences
3. Create remaining 156 lessons (Year 7-8)
4. Review and refine content
5. Test random sample of lessons

**Why This Is Now Fast**:
- Template + AI = 5-10 mins per lesson
- No code duplication
- Bulk editing possible
- Consistent quality

**Acceptance Criteria**:
- All 160 lessons exist as JSON
- All lessons follow schema
- Random sample tested and working

---

### 👨‍🏫 Phase 5: Teacher Features (Future)
**Goal**: Add teacher dashboard

**Steps**:
1. Teacher accounts (role-based auth)
2. Class management
3. Student progress dashboard
4. Analytics and insights
5. Export reports

**Deferred Until**: After core student experience is complete

---

## 📐 Lesson Content Schema

### Metadata
Every lesson has:
- **ID**: Unique identifier (e.g., "y7-u1-l01")
- **Year**: 7-12
- **Unit**: 1-4 (junior), 1-8 (senior)
- **Lesson Number**: 1-20
- **Title**: "What is Science?"
- **Subtitle**: "The Scientific Method | Asking Questions"
- **Duration**: "45-50 minutes"
- **Total XP**: 500
- **NSW Outcomes**: ["SC4-OTU-01", "SC4-WS-01"]
- **Color Scheme**: { primary, secondary, accent }

### Stages (Always 5)
1. **Introduction**: Hook, learning objectives, outcomes
2. **Explore**: Interactive discovery activities
3. **Learn**: Core content, worked examples, copy-to-book
4. **Practice**: Challenge levels (4 levels)
5. **Summary**: Stats, mastery checklist, mystery resolution

### Activity Types
- **hook**: Engaging scenario/mystery
- **infoCard**: Content card with icon
- **quiz**: Multiple choice questions
- **dragDrop**: Drag items to zones
- **challengeLevels**: 4 progressive challenges
- **copyToBook**: Summary notes
- **masteryChecklist**: Self-assessment

See `lesson-schema.json` for full technical schema.

---

## 🗄️ Database Schema

### Tables

#### `users`
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL DEFAULT 'student', -- 'student' | 'teacher' | 'admin'
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

#### `lesson_progress`
```sql
CREATE TABLE lesson_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  lesson_id TEXT NOT NULL, -- e.g., 'y7-u1-l01'

  -- Progress
  current_stage INTEGER NOT NULL DEFAULT 1,
  completed_stages INTEGER[] NOT NULL DEFAULT '{}',
  is_completed BOOLEAN NOT NULL DEFAULT FALSE,

  -- Game Stats
  xp INTEGER NOT NULL DEFAULT 0,
  level INTEGER NOT NULL DEFAULT 1,
  streak INTEGER NOT NULL DEFAULT 0,
  max_streak INTEGER NOT NULL DEFAULT 0,
  questions_answered INTEGER NOT NULL DEFAULT 0,
  correct_answers INTEGER NOT NULL DEFAULT 0,

  -- Timestamps
  started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  last_accessed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  UNIQUE(user_id, lesson_id)
);

-- Index for fast lookups
CREATE INDEX idx_lesson_progress_user_id ON lesson_progress(user_id);
CREATE INDEX idx_lesson_progress_lesson_id ON lesson_progress(lesson_id);
```

#### `lesson_events` (Analytics - Optional but Recommended)
```sql
CREATE TABLE lesson_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  lesson_id TEXT NOT NULL,

  event_type TEXT NOT NULL, -- 'question_answered', 'stage_completed', 'xp_earned', etc.
  event_data JSONB, -- Flexible data storage

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for analytics queries
CREATE INDEX idx_lesson_events_user_id ON lesson_events(user_id);
CREATE INDEX idx_lesson_events_lesson_id ON lesson_events(lesson_id);
CREATE INDEX idx_lesson_events_type ON lesson_events(event_type);
```

### Row-Level Security (RLS)

Students can only access their own data:

```sql
-- Enable RLS
ALTER TABLE lesson_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_events ENABLE ROW LEVEL SECURITY;

-- Students can only see/modify their own progress
CREATE POLICY "Users can view own progress"
  ON lesson_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress"
  ON lesson_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress"
  ON lesson_progress FOR UPDATE
  USING (auth.uid() = user_id);

-- Similar for lesson_events
CREATE POLICY "Users can view own events"
  ON lesson_events FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own events"
  ON lesson_events FOR INSERT
  WITH CHECK (auth.uid() = user_id);
```

---

## 🎯 Key Principles

### 1. **Separation of Concerns**
- **Content** (JSON) is separate from **Code** (React)
- **Game Logic** (XP system) is separate from **UI** (components)
- **Data** (database) is separate from **Presentation** (frontend)

### 2. **Single Source of Truth**
- Lesson Player is the ONE place for lesson rendering
- XP system logic is in ONE file
- Progress tracking is in ONE place
- Bug fix once = fixed everywhere

### 3. **Content is Data**
- Lessons are JSON files (easy to edit, version control, bulk update)
- No code changes needed to add/edit lessons
- AI can help generate content
- Non-developers can edit content

### 4. **Progressive Enhancement**
- Core functionality works first
- Advanced features added later
- Mobile-friendly from day 1
- Accessibility considered throughout

### 5. **Student Privacy & Security**
- Row-Level Security: students only see own data
- Teacher mode requires proper authentication
- No client-side "hacks" to unlock content
- Passwords hashed, data encrypted

### 6. **Scalability**
- Adding lesson #161 is as easy as lesson #5
- 1,000 students = same performance as 10 students
- Database indexed for fast queries
- Frontend cached and optimized

---

## ✅ What We've Completed

### Prototypes (Reference Only)
- ✅ Lesson 1: What is Science? (HTML prototype)
- ✅ Lesson 2: Observation vs Inference (HTML prototype)
- ✅ Lesson 3: Scientific Questions (HTML prototype)
- ✅ Lesson 4: Predictions and Variables (HTML prototype)

**Status**: These are REFERENCE DESIGNS only. Do not edit. Use for visual/interaction patterns.

### Documentation
- ✅ ARCHITECTURE.md (this file)
- ✅ lesson-schema.json (content schema)

---

## 🔄 Current Phase: Phase 1 - Foundation

### What We're Doing Now
1. Extract Lesson 1 content into JSON (using schema)
2. Initialize Next.js project with TypeScript
3. Set up Supabase (auth + database)
4. Create database tables with RLS

### Next Steps (in order)
1. ⏳ Create y7-u1-l01.json (Lesson 1 content)
2. ⏳ Run `npx create-next-app@latest`
3. ⏳ Install dependencies (Tailwind, shadcn/ui, Supabase)
4. ⏳ Create Supabase project
5. ⏳ Set up database schema
6. ⏳ Configure authentication

---

## 🚫 What NOT to Do

### DON'T:
- ❌ Create more standalone HTML lessons
- ❌ Duplicate code across files
- ❌ Put content in React components
- ❌ Use localStorage for progress (database only)
- ❌ Implement features without referring to this file
- ❌ Drift from the architecture
- ❌ Skip Supabase authentication

### DO:
- ✅ Refer to this file regularly
- ✅ Follow the phase plan sequentially
- ✅ Keep content in JSON
- ✅ Keep code DRY (Don't Repeat Yourself)
- ✅ Test as you build
- ✅ Ask questions if architecture is unclear

---

## 📞 Decision Points

If you're unsure about:
- **Where to put code**: Check File Structure above
- **What to build next**: Check Current Phase above
- **How lessons work**: Check Lesson Content Schema above
- **Database design**: Check Database Schema above
- **Why we're doing this**: Check "The Problem We're Solving" above

---

## 🎓 Success Metrics

### Phase 1 Success:
- [ ] Next.js app runs at http://localhost:3000
- [ ] Supabase project created
- [ ] Users can sign up with email/password
- [ ] Users can log in
- [ ] Database tables exist with correct schema

### Phase 2 Success:
- [ ] Lesson 1 JSON loads and displays
- [ ] All activity types render correctly
- [ ] XP/streak system works
- [ ] Progress saves to database
- [ ] User can resume lesson

### Phase 3 Success:
- [ ] All 4 prototype lessons work in new system
- [ ] Visual design matches prototypes
- [ ] No features lost from HTML versions

### Phase 4 Success:
- [ ] All 160 lessons exist as valid JSON
- [ ] Random sample tested
- [ ] All lessons accessible via navigation

---

## 📝 Notes

- **This file is the master reference** - Always check here before starting work
- **Update this file** if architecture changes
- **Prototypes are frozen** - They're reference designs, not production code
- **Quality over speed** - Do it right, not fast
- **Test incrementally** - Don't build everything then test

---

**Last Updated**: 2024 (Initial Creation)
**Next Review**: After Phase 1 completion
