# 📚 Content Generation Guide - NSW Science Hub

## Overview

This guide explains how to create the remaining 159 lessons for the NSW Science Hub using AI assistance and our proven JSON structure.

## ✅ What We Have

- **1 Complete Lesson**: [y7-u1-l01.json](/workspaces/NSW-Science-/nsw-science-hub/data/lessons/y7-u1-l01.json)
- **Working System**: LessonPlayer renders any JSON lesson
- **7 Activity Types**: All tested and functional
- **Proven Template**: Replicate the structure

## 📋 Lesson Requirements

### Every Lesson Must Have:

1. **5 Stages** (Introduction → Explore → Learn → Practice → Summary)
2. **500 Total XP** (distributed across stages)
3. **NSW Syllabus Alignment** (specific outcome codes)
4. **45-50 minutes duration**
5. **Color scheme** (varies by unit)
6. **Multiple activity types** (mix of all 7 types)

### 7 Activity Types Available:

1. **hook** - Mystery/engagement boxes
2. **infoCard** - Information cards with visuals
3. **quiz** - Multiple choice questions with feedback
4. **dragDrop** - Drag items into categories
5. **challengeLevels** - 4 progressive difficulty levels
6. **copyToBook** - Summary notes to copy
7. **masteryChecklist** - Self-assessment checklist

## 🎯 Lesson Structure Template

```json
{
  "metadata": {
    "id": "y{year}-u{unit}-l{lesson}",  // e.g., "y7-u1-l02"
    "year": 7-12,
    "unit": 1-8,
    "lessonNumber": 1-20,
    "title": "Main Topic",
    "subtitle": "Subtopic | Key Concept",
    "duration": "45-50 minutes",
    "totalXP": 500,
    "outcomes": ["SC4-XXX", "SC4-YYY"],  // NSW codes
    "colorScheme": {
      "primary": "#hex",
      "secondary": "#hex",
      "accent": "#hex"
    }
  },
  "stages": [
    // 5 stages - see stage template below
  ]
}
```

## 🎨 Color Schemes by Unit

### Year 7
- **Unit 1** (Nature of Science): Cyan `#0891b2` + Emerald `#10b981`
- **Unit 2** (Classification): Purple `#7c3aed` + Pink `#ec4899`
- **Unit 3** (Energy): Orange `#f97316` + Red `#ef4444`
- **Unit 4** (Forces): Blue `#3b82f6` + Indigo `#6366f1`

### Year 8
- **Unit 1** (Cells): Green `#22c55e` + Lime `#84cc16`
- **Unit 2** (Matter): Teal `#14b8a6` + Cyan `#06b6d4`
- **Unit 3** (Chemical Reactions): Amber `#f59e0b` + Yellow `#eab308`
- **Unit 4** (Astronomy): Violet `#8b5cf6` + Purple `#a855f7`

## 📝 Stage Template

Each of the 5 stages should follow this pattern:

### Stage 1: Introduction (100 XP)
- **Purpose**: Hook students, set learning goals
- **Activities**:
  - 1× `hook` - Mystery or interesting phenomenon
  - 1-2× `infoCard` - Learning intentions, outcomes
  - 1× `quiz` - Pre-assessment (4-5 questions, 20 XP each)

### Stage 2: Explore (100 XP)
- **Purpose**: Hands-on exploration, discovery
- **Activities**:
  - 1× `dragDrop` - Categorization or sorting (100 XP)
  - OR 1× `infoCard` + 1× `quiz`

### Stage 3: Learn (100 XP)
- **Purpose**: Explicit instruction, key concepts
- **Activities**:
  - 2-3× `infoCard` - Core content with visuals
  - 1× `copyToBook` - Summary notes

### Stage 4: Practice (150 XP)
- **Purpose**: Apply knowledge, build mastery
- **Activities**:
  - 1× `challengeLevels` - 4 levels of difficulty (150 XP total)
    - Level 1: Basic recall (25 XP, 3 questions)
    - Level 2: Comprehension (35 XP, 4 questions)
    - Level 3: Application (45 XP, 5 questions)
    - Level 4: Analysis (45 XP, 5 questions)

### Stage 5: Summary (50 XP + completion bonus)
- **Purpose**: Consolidate learning, self-assessment
- **Activities**:
  - 1× `infoCard` - Key takeaways
  - 1× `masteryChecklist` - Skills to check off
  - 1× `hook` - Mystery resolution (if used in Stage 1)

## 🤖 AI Generation Workflow

### Step 1: Prepare Lesson Context
```
Year: 7
Unit: 1 (The Nature of Science)
Lesson: 2
Topic: Making Observations
NSW Outcomes: SC4-OTU-01, SC4-WS-02
```

### Step 2: Generate with AI

Use this prompt template with Claude or GPT:

```
Create a complete NSW Science Hub lesson in JSON format following this structure:

Year: [7-12]
Unit: [1-8]
Lesson Number: [1-20]
Title: "[Main Topic]"
Subtitle: "[Subtopic | Key Concept]"
NSW Outcomes: [SC4-XXX, SC4-YYY]

Requirements:
- Follow the exact JSON structure from y7-u1-l01.json
- 5 stages: Introduction → Explore → Learn → Practice → Summary
- Total 500 XP distributed across stages
- Use appropriate activity types (hook, infoCard, quiz, dragDrop, challengeLevels, copyToBook, masteryChecklist)
- All content scientifically accurate
- Aligned to NSW Science syllabus
- Engaging and age-appropriate

Color scheme:
- primary: "#hex"
- secondary: "#hex"
- accent: "#hex"

Generate complete lesson JSON with all activities populated.
```

### Step 3: Validate JSON
```bash
# Test JSON is valid
cat data/lessons/y7-u1-l02.json | jq .

# Check against schema
ajv validate -s lesson-schema.json -d data/lessons/y7-u1-l02.json
```

### Step 4: Test in Browser
1. Add lesson to `/app/lesson/[lessonId]/page.tsx`:
```typescript
import y7u1l02 from '@/data/lessons/y7-u1-l02.json';

const LESSONS: { [key: string]: Lesson } = {
  'y7-u1-l01': y7u1l01 as Lesson,
  'y7-u1-l02': y7u1l02 as Lesson,  // Add here
};
```

2. Visit: http://localhost:3000/lesson/y7-u1-l02
3. Test all activities work
4. Verify XP, levels, streaks function

## 📊 Content Checklist

For each generated lesson, verify:

- [ ] Valid JSON syntax
- [ ] Correct metadata (id, year, unit, lessonNumber)
- [ ] 5 stages with correct stageNumbers (1-5)
- [ ] Total XP = 500
- [ ] All activities have required fields
- [ ] Quiz questions have feedback
- [ ] DragDrop has correct zones
- [ ] ChallengeLevels has 4 levels
- [ ] Scientific accuracy
- [ ] Age-appropriate language
- [ ] NSW outcomes referenced

## 🗂️ File Naming Convention

```
data/lessons/y{year}-u{unit}-l{lesson}.json

Examples:
- y7-u1-l01.json  // Year 7, Unit 1, Lesson 1
- y7-u1-l02.json  // Year 7, Unit 1, Lesson 2
- y8-u2-l15.json  // Year 8, Unit 2, Lesson 15
- y12-u4-l20.json // Year 12, Unit 4, Lesson 20
```

## 📈 Batch Generation Strategy

### Phase 1: Complete Year 7 (40 lessons)
- Unit 1: Lessons 1-10 (Nature of Science)
- Unit 2: Lessons 1-10 (Classification)
- Unit 3: Lessons 1-10 (Energy)
- Unit 4: Lessons 1-10 (Forces)

### Phase 2: Complete Year 8 (40 lessons)
- Unit 1: Lessons 1-10 (Cells)
- Unit 2: Lessons 1-10 (Matter)
- Unit 3: Lessons 1-10 (Chemical Reactions)
- Unit 4: Lessons 1-10 (Astronomy)

### Phase 3: Years 9-10 (80 lessons)
### Phase 4: Years 11-12 (40 lessons)

## 🎓 Quality Guidelines

### Scientific Accuracy
- Verify facts against textbooks
- Use proper scientific terminology
- Include correct units and symbols
- Reference real-world examples

### Pedagogical Best Practices
- Scaffold difficulty (easy → hard)
- Include varied question types
- Provide meaningful feedback
- Connect to student experiences
- Use visuals and analogies

### Engagement Factors
- Start with hook/mystery
- Include relatable examples
- Use gamification elements
- Celebrate progress
- Build on prior knowledge

## 🔧 Bulk Update Scripts

### Update All Lessons in Dashboard

After generating multiple lessons, update the dashboard:

```typescript
// app/dashboard/student/page.tsx
const lessons = [
  { id: 'y7-u1-l01', title: 'What is Science?', emoji: '🔬' },
  { id: 'y7-u1-l02', title: 'Making Observations', emoji: '👁️' },
  { id: 'y7-u1-l03', title: 'Scientific Method', emoji: '🧪' },
  // ... add all lessons
];
```

### Automated Lesson Router

The dynamic route automatically handles new lessons:
```typescript
// Just import and add to LESSONS object
import y7u1l02 from '@/data/lessons/y7-u1-l02.json';
```

## 📝 Content Sources

### NSW Syllabus Documents
- [NSW Science K-10 Syllabus](https://curriculum.nsw.edu.au/learning-areas/science)
- Outcome codes and content descriptors
- Suggested investigations

### Scientific Resources
- Khan Academy (age-appropriate explanations)
- PhET Simulations (concept inspiration)
- Australian curriculum exemplars

## 🚀 Speed Optimization

To generate 159 lessons efficiently:

1. **Batch by Unit** - Generate all Unit 1 lessons together
2. **Reuse Structures** - Copy similar activity types
3. **AI Assistance** - Use Claude/GPT for bulk generation
4. **Parallel Review** - Multiple reviewers check different units
5. **Iterative Refinement** - Start with draft, refine later

## 📊 Progress Tracking

Use this spreadsheet structure to track generation:

| Year | Unit | Lesson | Title | Status | Reviewer | Notes |
|------|------|--------|-------|--------|----------|-------|
| 7 | 1 | 1 | What is Science? | ✅ Done | - | Template |
| 7 | 1 | 2 | Making Observations | 🔄 In Progress | - | - |
| 7 | 1 | 3 | Scientific Method | ⏳ Todo | - | - |

## 🎯 Success Metrics

Each lesson should achieve:
- **Engagement**: Students complete without losing interest
- **Learning**: Clear improvement from pre to post assessment
- **Accuracy**: 90%+ correct on retry
- **Time**: Most students finish in 45-50 minutes
- **Feedback**: Positive student reactions

## 🔄 Iteration Process

1. **Generate** - Create initial JSON
2. **Test** - Play through lesson
3. **Review** - Check accuracy, engagement
4. **Refine** - Fix issues, improve content
5. **Approve** - Mark as ready for students

---

## 📌 Quick Reference

**Template Lesson**: `/data/lessons/y7-u1-l01.json`
**Schema**: `/lesson-schema.json`
**Test URL**: `http://localhost:3000/lesson/y{year}-u{unit}-l{lesson}`

**Need Help?**
- Refer to ARCHITECTURE.md for system design
- Check lesson-schema.json for structure
- Test with existing lesson first

**Ready to Generate!** 🚀
