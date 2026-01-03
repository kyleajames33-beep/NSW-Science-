# NSW Science Hub - Project Status Document

**Last Updated:** 2026-01-02
**Purpose:** This document provides context for AI assistants continuing work on this project.

---

## 1. PROJECT OVERVIEW

**What this is:** An interactive science learning platform for NSW (Australia) students in Years 7-10, aligned with the NSW Education Standards Authority (NESA) curriculum.

**Tech Stack:**
- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- JSON-based lesson data structure

**Project Structure:**
- `/nsw-science-hub/` - Main Next.js application
- `/nsw-science-hub/data/lessons/` - JSON lesson files (e.g., `y7-u1-l01.json`, `y9-u1-l05.json`)
- `/nsw-science-hub/components/lesson/` - Lesson rendering components
- `/nsw-science-hub/app/lesson/[lessonId]/` - Dynamic lesson route

---

## 2. CURRENT STATUS

### What's Working:
- ✅ Next.js app structure and routing
- ✅ Lesson data structure (JSON schema)
- ✅ Year 7 Unit 1: 15 lessons complete and tested
- ✅ Year 8 Unit 1: 5 lessons complete
- ✅ Year 9 Unit 1: Lessons 1-6 complete (just created L05 and L06)
- ✅ Activity components: SimulationActivity, ErrorAnalysis, StructuredNotes, PredictionChallenge, MissionSelect
- ✅ Lesson rendering system
- ✅ Navigation between lessons

### What Was Just Fixed (Critical Info):
**Problem:** Year 9 lessons 1-4 had simulation activities with INCORRECT structure that didn't match the TypeScript types.

**Solution:** All Year 9 simulations were restructured to match the correct format:
```typescript
{
  "type": "simulation",
  "controls": [
    {
      "name": "Control Name",  // ✅ Must have "name"
      "type": "slider" | "toggle",  // ✅ Must have "type"
      "options": ["Option1", "Option2"],  // For toggle
      "range": [min, max],  // For slider
      "unit": "units"  // Optional
    }
  ],
  "observables": [...],  // ✅ Must be array of strings
  "revealPattern": "...",  // ✅ Must be single string
  "xp": 50
}
```

**Files Modified:**
- `/nsw-science-hub/data/lessons/y9-u1-l01.json` ✅ Fixed
- `/nsw-science-hub/data/lessons/y9-u1-l02.json` ✅ Fixed
- `/nsw-science-hub/data/lessons/y9-u1-l03.json` ✅ Fixed
- `/nsw-science-hub/data/lessons/y9-u1-l04.json` ✅ Fixed
- `/nsw-science-hub/data/lessons/y9-u1-l05.json` ✅ Created (correct format)
- `/nsw-science-hub/data/lessons/y9-u1-l06.json` ✅ Created (correct format)

---

## 3. CRITICAL RULES - MUST FOLLOW

### Rule 1: Always Check TypeScript Types FIRST
**Location:** `/nsw-science-hub/types/lesson.ts`

Before creating ANY lesson activity, read the TypeScript interface to understand the EXACT structure required.

**Common mistake:** Creating activities with custom structures that don't match the types, causing runtime errors.

### Rule 2: Simulation Activity Structure (Most Common Error)
The `SimulationActivity` component expects:
```typescript
export interface SimulationControl {
  name: string;  // ❌ NOT "id" or "label"
  type: 'slider' | 'toggle';  // ❌ NOT other types
  options?: string[];  // For toggle type
  range?: [number, number];  // For slider type
  unit?: string;
}

export interface SimulationActivity {
  type: 'simulation';
  title: string;
  description: string;
  controls: SimulationControl[];
  observables: string[];  // ❌ NOT array of objects, NOT "scenarios"
  revealPattern: string;  // ❌ NOT object, NOT "comparisons"
  xp: number;
}
```

**DO NOT create custom fields like:**
- ❌ `scenarios` (use `observables` instead)
- ❌ `challenges` (use `observables` instead)
- ❌ `comparisons` (use `observables` instead)
- ❌ controls with `id`/`label`/`effect` (use `name`/`type`/`options`)

### Rule 3: Read Existing Lessons for Reference
**Good examples to reference:**
- `/nsw-science-hub/data/lessons/y9-u1-l05.json` (Diabetes - correct simulation)
- `/nsw-science-hub/data/lessons/y9-u1-l06.json` (Pathogens - correct simulation)
- `/nsw-science-hub/data/lessons/y7-u1-l01.json` (Year 7 example)

**DO:** Read these files BEFORE creating new lessons to see the correct structure.

### Rule 4: Test After Creating Lessons
After creating lesson files, test them by:
1. Starting the dev server: `npm run dev` (from `/nsw-science-hub/`)
2. Navigating to the lesson: `http://localhost:3000/lesson/y9-u1-l05`
3. Checking browser console for errors
4. Verifying all activities render correctly

**DO NOT:** Create multiple lessons without testing. Fix errors immediately.

---

## 4. LESSON CREATION WORKFLOW

### Step 1: Read the Lesson Sequences Document
**File:** `/workspaces/NSW-Science-/year-9-lesson-sequences.md`

This contains the curriculum requirements, learning outcomes, and content for each lesson.

### Step 2: Check TypeScript Types
**File:** `/nsw-science-hub/types/lesson.ts`

Understand the exact structure required for each activity type.

### Step 3: Read Reference Lessons
Look at similar lessons that are already working correctly.

### Step 4: Create Lesson JSON
Follow the structure exactly. Don't invent new fields.

### Step 5: Test in Browser
Verify the lesson loads without errors.

---

## 5. CURRENT TASK (INCOMPLETE)

**Goal:** Create Year 9 Unit 1 lessons 7-15

**Status:** Lessons 1-6 complete. Need to create:
- ⏳ L07: Chain of Reaction (Disease Spread)
- ⏳ L08: Outbreak Simulator
- ⏳ L09: The Castle Walls (1st & 2nd Line Defense)
- ⏳ L10: Special Forces (3rd Line Defense)
- ⏳ L11: The Training Ground (Vaccination)
- ⏳ L12: Nature's Pharmacy (Medicinal Plants)
- ⏳ L13: Aussie Innovators (Medical Advances)
- ⏳ L14: Investigation Planning
- ⏳ L15: AT1 Project Workshop

**Todo List Status:**
All tasks tracked in conversation. 12 total tasks:
- 2 completed (L05, L06)
- 10 pending (L07-L15)
- 1 testing task pending
- NEW blockers: L01–L04 `missionSelect` missing `feedback.misconceptions`; L01–L04 `skillRating` uses old shape; L05 `missionSelect` malformed and stage names outside union (needs 5-stage alignment). See `y9-u1-l01-05-actions.md`.

**IMPORTANT:** When resuming, check if L07 was started. It was in progress when this conversation was paused.

---

## 6. COMMON PITFALLS TO AVOID

### Pitfall 1: Creating Lessons Too Fast
**Problem:** User noticed lessons were being created with incorrect structures because they weren't tested.

**Solution:** Create 2-3 lessons, test them, THEN continue. Don't batch-create all 10+ lessons.

### Pitfall 2: Not Reading Component Code
**Problem:** Assumptions about what components accept lead to structure mismatches.

**Solution:** When in doubt, READ the component file:
- `/nsw-science-hub/components/lesson/activities/SimulationActivity.tsx`
- `/nsw-science-hub/components/lesson/activities/ErrorAnalysis.tsx`
- etc.

### Pitfall 3: Ignoring Runtime Errors
**Problem:** "Cannot read properties of undefined (reading 'map')" errors indicate structure mismatch.

**Solution:** These errors mean you're missing a required field or using the wrong structure. Check types immediately.

### Pitfall 4: Inventing New Activity Types
**Problem:** Creating activities with types that don't exist in the system.

**Solution:** Stick to existing types:
- `predictionChallenge`
- `simulation`
- `errorAnalysis`
- `structuredNotes`
- `missionSelect`
- `infoCard`
- `skillRating`

Check `/nsw-science-hub/types/lesson.ts` for the complete list.

---

## 7. FILE LOCATIONS (QUICK REFERENCE)

**Lesson Data:**
- Year 7: `/nsw-science-hub/data/lessons/y7-u1-l01.json` to `y7-u1-l15.json`
- Year 8: `/nsw-science-hub/data/lessons/y8-u1-l01.json` to `y8-u1-l05.json`
- Year 9: `/nsw-science-hub/data/lessons/y9-u1-l01.json` to `y9-u1-l06.json` (incomplete)

**TypeScript Types:**
- `/nsw-science-hub/types/lesson.ts` ← **READ THIS FIRST**

**Curriculum Documents:**
- `/workspaces/NSW-Science-/year-7-lesson-sequences.md`
- `/workspaces/NSW-Science-/year-8-lesson-sequences.md`
- `/workspaces/NSW-Science-/year-9-lesson-sequences.md`

**Components:**
- `/nsw-science-hub/components/lesson/activities/` ← All activity components

**Pages:**
- `/nsw-science-hub/app/lesson/[lessonId]/page.tsx` ← Lesson rendering
- `/nsw-science-hub/app/dashboard/student/page.tsx` ← Student dashboard

---

## 8. TESTING CHECKLIST

Before marking a lesson as "complete":
- [ ] JSON file is valid (no syntax errors)
- [ ] All required fields present (check against types)
- [ ] Dev server starts without errors
- [ ] Lesson loads at `http://localhost:3000/lesson/[lessonId]`
- [ ] No console errors in browser
- [ ] All activities render correctly
- [ ] No "Cannot read properties of undefined" errors

---

## 9. GIT STATUS

**Current Branch:** main

**Untracked Files:**
Many lesson files and project files are untracked. The project structure is being built before initial commit.

**Recent Work:**
- Fixed Year 9 lesson structure issues
- Created lessons Y9-U1-L05 and Y9-U1-L06
- Previous conversation restructured Y7 and Y8 lessons from nested to flat format

---

## 10. NEXT STEPS FOR NEW AI ASSISTANT

1. **Read this document completely**
2. **Read** `/nsw-science-hub/types/lesson.ts` to understand data structures
3. **Read** `/workspaces/NSW-Science-/year-9-lesson-sequences.md` for curriculum
4. **Check** if lesson 7 was started (file might exist in draft state)
5. **Create** 2-3 lessons (L07, L08, L09)
6. **Test** those lessons in browser
7. **Continue** with remaining lessons only after testing confirms structure is correct

**Don't rush.** Quality > speed. Test frequently.

---

## 11. IMPORTANT CONTEXT NOTES

### Gamification Theme for Year 9 Unit 1:
**"Bio-Defense Agency"** - Students are recruits learning to defend "Host Alpha" (a virtual human body) against:
- Internal failures (homeostasis issues)
- External threats (pathogens)

All Year 9 Unit 1 lessons should maintain this narrative voice.

### Color Schemes:
Each lesson has a unique color scheme defined in metadata:
```json
"colorScheme": {
  "primary": "#HEX",
  "secondary": "#HEX",
  "accent": "#HEX"
}
```

These colors should be different for visual variety.

### XP System:
- Total lesson XP typically: 500
- Distributed across stages/activities
- Users earn XP for completing activities

---

## 12. CONTACT & DECISIONS

**User Preference:** The user wants to ensure correct structure BEFORE creating all lessons.

**User's Plan:** Start a new conversation with a fresh AI to save tokens. This document provides continuity.

**Decision Authority:** When in doubt about lesson content or structure, ASK the user rather than guessing.

---

## SUMMARY FOR QUICK START

**You are here:** Year 9 Unit 1, Lesson 6 complete, need to create lessons 7-15.

**Critical rule:** Check `/nsw-science-hub/types/lesson.ts` BEFORE creating activities.

**Most important:** Simulation activities must have `controls` with `name`/`type`, `observables` as string array, and `revealPattern` as string.

**Testing:** Create 2-3 lessons → test in browser → continue only if working.

**Reference:** Use Y9-U1-L05 and Y9-U1-L06 as templates for correct structure.

Good luck! 🧬
