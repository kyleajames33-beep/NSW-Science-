# Enhanced Lesson Content Template & Generation Guide

## Overview
This template provides a structure for creating engaging, interactive science lessons for the NSW Science Hub. Each lesson should include 8-12 varied activities across 5 stages.

---

## Lesson Structure

### Metadata (Required)
```json
{
  "metadata": {
    "id": "y7-u1-l01",           // Format: y{year}-u{unit}-l{lesson}
    "year": 7,                    // 7, 8, 9, 10, 11, 12
    "unit": 1,                    // Unit number
    "lessonNumber": 1,            // Lesson number
    "title": "...",               // Short, engaging title
    "subtitle": "...",            // Key concepts summary
    "duration": "45-50 minutes",  // Realistic time estimate
    "totalXP": 800,              // Should match sum of all XP in activities
    "outcomes": ["SC4-..."],      // NSW syllabus outcomes
    "colorScheme": {
      "primary": "#...",         // Main theme color
      "secondary": "#...",       // Secondary color
      "accent": "#..."           // Highlight/accent color
    }
  }
}
```

---

## The 5 Stages (5E Model)

### Stage 1: Introduction (Engage)
**Purpose**: Hook students' interest, activate prior knowledge, introduce concepts

**Recommended Activities (2-3 total)**:
1. **Hook Activity** - Engaging scenario or mystery (required)
2. **Video Activity** (optional but recommended) - 3-5 minute introductory video
3. **InfoCard** - Key definitions and concepts
4. **Matching Activity** - Quick concept check or vocabulary introduction

**Example**:
```json
{
  "stageNumber": 1,
  "stageName": "Introduction",
  "title": "Engaging Title",
  "description": "Brief stage description",
  "xpOnComplete": 0,
  "activities": [
    {
      "type": "hook",
      "title": "🔍 Mystery or Scenario",
      "icon": "🔍",
      "content": "Engaging scenario that poses a question or mystery..."
    },
    {
      "type": "video",
      "title": "Introduction Video",
      "videoUrl": "https://www.youtube.com/watch?v=...",
      "description": "Brief description",
      "xpOnComplete": 30
    },
    {
      "type": "matching",
      "title": "Match Key Concepts",
      "instructions": "...",
      "xpPerPair": 15,
      "pairs": [...]
    }
  ]
}
```

---

### Stage 2: Explore (Explore)
**Purpose**: Students interact with concepts, discover patterns, hands-on learning

**Recommended Activities (2-3 total)**:
1. **DragDrop Activity** - Sorting, categorizing, classifying
2. **Scenario Activity** - Real-world application or problem-solving
3. **FillInBlank Activity** - Completing patterns or statements
4. **Interactive simulations** (if available)

**Example**:
```json
{
  "stageNumber": 2,
  "stageName": "Explore",
  "title": "Hands-On Discovery",
  "description": "Practice and discover patterns",
  "xpOnComplete": 0,
  "activities": [
    {
      "type": "dragDrop",
      "title": "Sort and Classify",
      "instructions": "...",
      "xpPerCorrect": 10,
      "zones": [...],
      "items": [...]
    },
    {
      "type": "scenario",
      "title": "Real-World Problem",
      "situation": "...",
      "question": "...",
      "xp": 40,
      "choices": [...]
    }
  ]
}
```

---

### Stage 3: Learn (Explain)
**Purpose**: Formal instruction, detailed explanations, vocabulary, theory

**Recommended Activities (2-4 total)**:
1. **InfoCard Activities** - Core concepts (2-3 cards)
2. **Matching Activity** - Vocabulary or concept pairs
3. **CopyToBook Activity** - Summary notes (required)
4. **Video Activity** (optional) - Detailed explanation video

**Example**:
```json
{
  "stageNumber": 3,
  "stageName": "Learn",
  "title": "Understanding the Concepts",
  "description": "Deep dive into theory",
  "xpOnComplete": 0,
  "activities": [
    {
      "type": "infoCard",
      "title": "Core Concept 1",
      "icon": "🎯",
      "content": "Detailed explanation with examples..."
    },
    {
      "type": "matching",
      "title": "Match Terms with Definitions",
      "instructions": "...",
      "xpPerPair": 15,
      "pairs": [...]
    },
    {
      "type": "copyToBook",
      "title": "📖 Summary Notes",
      "content": "Formatted notes for students to copy..."
    }
  ]
}
```

---

### Stage 4: Practice (Elaborate)
**Purpose**: Apply knowledge, challenge understanding, practice skills

**Recommended Activities (2-4 total)**:
1. **ChallengeLevels Activity** - Progressive difficulty questions
2. **Scenario Activities** - Complex real-world applications (1-2)
3. **FillInBlank Activity** - Application exercises
4. **Quiz Activity** - Comprehensive practice

**Example**:
```json
{
  "stageNumber": 4,
  "stageName": "Practice",
  "title": "Apply Your Skills",
  "description": "Challenge yourself",
  "xpOnComplete": 0,
  "activities": [
    {
      "type": "fillInBlank",
      "title": "Application Exercise",
      "instructions": "...",
      "xpPerQuestion": 25,
      "questions": [...]
    },
    {
      "type": "scenario",
      "title": "Complex Problem",
      "situation": "...",
      "question": "...",
      "xp": 50,
      "choices": [...]
    },
    {
      "type": "challengeLevels",
      "levels": [
        {
          "level": 1,
          "description": "Basic",
          "xp": 30,
          "questions": [...]
        },
        {
          "level": 2,
          "description": "Advanced",
          "xp": 40,
          "questions": [...]
        }
      ]
    }
  ]
}
```

---

### Stage 5: Summary (Evaluate)
**Purpose**: Reflect, review, assess understanding, connect to real world

**Recommended Activities (2-3 total)**:
1. **InfoCard** - Real-world connections and importance
2. **Scenario Activity** - Final application (optional)
3. **MasteryChecklist** - Self-assessment (required)
4. **Hook callback** - Return to opening mystery/question

**Example**:
```json
{
  "stageNumber": 5,
  "stageName": "Summary",
  "title": "Mastery & Reflection",
  "description": "Review and assess",
  "xpOnComplete": 50,
  "activities": [
    {
      "type": "infoCard",
      "title": "Why This Matters",
      "icon": "⭐",
      "content": "Real-world applications and importance..."
    },
    {
      "type": "scenario",
      "title": "Final Application",
      "situation": "...",
      "question": "...",
      "xp": 40,
      "choices": [...]
    },
    {
      "type": "masteryChecklist",
      "items": [
        "I can...",
        "I understand...",
        "I am able to..."
      ]
    }
  ]
}
```

---

## Activity Type Recommendations

### When to Use Each Activity Type

#### **Hook Activity**
- **Best for**: Opening a stage, posing questions, creating curiosity
- **Stage**: 1 (Introduction), occasionally 5 (Summary callback)
- **Content tips**:
  - Start with a question or mystery
  - Use real-world scenarios students can relate to
  - Keep it brief (2-4 sentences)

#### **InfoCard Activity**
- **Best for**: Explaining concepts, providing context, defining terms
- **Stage**: 1, 3 (most common), 5
- **Content tips**:
  - Break up large blocks of text with bullet points
  - Use bold for key terms
  - Include 2-3 concrete examples
  - Aim for 150-250 words

#### **Video Activity**
- **Best for**: Visual demonstrations, complex processes, engaging intros
- **Stage**: 1, 3
- **Content tips**:
  - Use short videos (3-5 minutes ideal)
  - YouTube links work best
  - Optional comprehension questions add value
  - Give 30-50 XP for completion

#### **Matching Activity**
- **Best for**: Vocabulary, concept pairs, cause-effect, subjective-objective comparisons
- **Stage**: 1, 2, 3
- **Content tips**:
  - 5-6 pairs is optimal
  - Make definitions clear and distinct
  - Use parallel structure in definitions
  - Award 15-20 XP per pair

#### **FillInBlank Activity**
- **Best for**: Completing patterns, applying formulas, practicing objective language
- **Stage**: 2, 4
- **Content tips**:
  - Use {{blank}} placeholder
  - Accept one clear correct answer (case-insensitive)
  - Provide helpful hints
  - 3-5 questions per activity
  - Award 20-25 XP per question

#### **DragDrop Activity**
- **Best for**: Sorting, categorizing, classifying into 2-3 groups
- **Stage**: 2 (most common)
- **Content tips**:
  - 8-12 items total
  - 2-3 zones maximum
  - Make items clearly belong to one zone
  - Use color-coded zones
  - Award 10 XP per correct placement

#### **Scenario Activity**
- **Best for**: Real-world application, decision-making, complex thinking
- **Stage**: 1, 2, 4, 5
- **Content tips**:
  - Create realistic, engaging situations (3-5 sentences)
  - Provide 4 choice options
  - One clearly best answer, others with common mistakes
  - Give detailed consequences for each choice
  - Award 40-50 XP for complex scenarios

#### **Quiz Activity**
- **Best for**: Quick checks, knowledge testing
- **Stage**: 1, 4
- **Content tips**:
  - 3-5 questions per quiz
  - 4 options per question
  - Provide detailed feedback explaining why answer is correct
  - Award 20 XP per question

#### **ChallengeLevels Activity**
- **Best for**: Progressive difficulty, comprehensive practice
- **Stage**: 4 (most common)
- **Content tips**:
  - 2-4 levels
  - 2-5 questions per level
  - Increase difficulty and XP with each level
  - Level 1: 25-30 XP, Level 2: 35-40 XP, Level 3+: 45+ XP

#### **CopyToBook Activity**
- **Best for**: Summary notes, key takeaways, formulas
- **Stage**: 3 (required)
- **Content tips**:
  - Format for easy copying
  - Include all key concepts
  - Use bullet points and headings
  - 200-300 words ideal

#### **MasteryChecklist Activity**
- **Best for**: Self-assessment, learning objective review
- **Stage**: 5 (required)
- **Content tips**:
  - 6-9 items
  - Start each with "I can..." or "I understand..."
  - Cover all major learning objectives
  - Be specific and measurable

---

## Content Quality Guidelines

### Writing Style
- **Clear and concise**: Avoid unnecessary jargon
- **Age-appropriate**: Match vocabulary to year level
- **Engaging**: Use relatable examples and scenarios
- **Accurate**: Ensure scientific accuracy
- **Inclusive**: Use diverse examples and contexts

### Example Quality Standards

#### ❌ Poor Example:
```json
{
  "type": "infoCard",
  "title": "Cells",
  "content": "Cells are the basic unit of life. They're important.",
  "icon": "🔬"
}
```

#### ✅ Good Example:
```json
{
  "type": "infoCard",
  "title": "Cells: The Building Blocks of Life",
  "icon": "🔬",
  "content": "**What are cells?**\n\nCells are the smallest units of life - like tiny factories that perform all the functions needed to keep organisms alive.\n\n**Key characteristics:**\n• All living things are made of one or more cells\n• Cells can reproduce themselves\n• Cells carry out life processes (growth, energy use, waste removal)\n\n**Size comparison:**\nMost cells are microscopic - about 10-100 micrometers. That means you could fit 10,000 cells across a single centimeter!\n\n**Example:** Your body contains approximately 37 trillion cells, each with a specific job to do."
}
```

### Scenario Writing Best Practices

#### ❌ Poor Scenario:
```json
{
  "situation": "There's a plant.",
  "question": "What do you do?",
  "choices": [
    {"text": "Water it", "isCorrect": true, "consequence": "Good"},
    {"text": "Don't water it", "isCorrect": false, "consequence": "Bad"}
  ]
}
```

#### ✅ Good Scenario:
```json
{
  "type": "scenario",
  "title": "The Wilting Plant Mystery",
  "situation": "You're caring for your science class's tomato plants over the school holidays. You notice one plant's leaves are turning yellow and drooping, while the soil feels dry 5cm below the surface. The plant is near a sunny window and the temperature is 24°C. The last time anyone watered the plants was 5 days ago.",
  "question": "What's the most scientific approach to helping this plant?",
  "xp": 50,
  "choices": [
    {
      "text": "Immediately water it heavily and move it away from the window.",
      "consequence": "Not ideal! While the plant might need water, you're making two changes at once and acting without fully investigating. You won't know which change helped (or if the sunlight was even a problem). Scientific thinking requires testing one variable at a time.",
      "isCorrect": false
    },
    {
      "text": "First observe and record: leaf color, soil moisture at different depths, recent watering schedule. Then research tomato plant water needs. Finally, water if needed and continue monitoring.",
      "consequence": "Excellent scientific approach! You're gathering evidence through observation, using prior knowledge (research), and then making an evidence-based decision. By monitoring afterward, you'll see if your inference about water needs was correct.",
      "isCorrect": true
    },
    {
      "text": "Assume it's dying and throw it away.",
      "consequence": "This gives up too quickly without investigation! Scientists observe symptoms and test solutions. The plant shows signs of stress (yellow, drooping) but this could be fixable with proper care.",
      "isCorrect": false
    },
    {
      "text": "Water it once and see what happens.",
      "consequence": "You're on the right track testing watering, but you haven't recorded the starting conditions (observations) or researched the plant's needs. Without this information, you won't learn much even if it works.",
      "isCorrect": false
    }
  ]
}
```

---

## XP Distribution Guide

### Recommended XP per Lesson: 700-900 total

**By Stage:**
- Stage 1: 150-200 XP
- Stage 2: 150-200 XP
- Stage 3: 100-150 XP
- Stage 4: 200-300 XP
- Stage 5: 100-150 XP (+ 50 XP for completing the stage)

**By Activity Type:**
- Hook: 0 XP (pure engagement)
- InfoCard: 0 XP (information delivery)
- Video: 30-50 XP (based on length/complexity)
- Matching: 15-20 XP per pair (5-6 pairs = 75-120 total)
- FillInBlank: 20-25 XP per question (4-5 questions = 80-125 total)
- DragDrop: 10 XP per item (10 items = 100 total)
- Scenario: 40-50 XP (complex thinking required)
- Quiz: 20 XP per question (5 questions = 100 total)
- ChallengeLevels: 25-50 XP per level (based on difficulty)
- CopyToBook: 0 XP (required but not assessed)
- MasteryChecklist: 0 XP (self-assessment)

---

## Checklist Before Publishing

### Content Quality
- [ ] All scientific information is accurate
- [ ] Language is age-appropriate for year level
- [ ] Examples are diverse and inclusive
- [ ] No spelling or grammar errors
- [ ] Consistent terminology throughout

### Structure
- [ ] 8-12 activities total across 5 stages
- [ ] Stage 1 includes a hook activity
- [ ] Stage 3 includes copyToBook activity
- [ ] Stage 5 includes masteryChecklist
- [ ] Good variety of activity types

### Technical
- [ ] All JSON is valid (no syntax errors)
- [ ] All required fields are present
- [ ] XP totals match metadata.totalXP
- [ ] Color codes are valid hex values
- [ ] NSW syllabus outcomes are correct
- [ ] Video URLs are accessible

### Engagement
- [ ] Opening hook is engaging and relevant
- [ ] Real-world connections are clear
- [ ] Activities build on each other
- [ ] Scenarios are realistic and relatable
- [ ] Challenge appropriate for year level

---

## Quick Start Template

Copy this basic structure to start a new lesson:

```json
{
  "metadata": {
    "id": "yX-uX-lXX",
    "year": X,
    "unit": X,
    "lessonNumber": X,
    "title": "",
    "subtitle": "",
    "duration": "45-50 minutes",
    "totalXP": 800,
    "outcomes": ["SC4-..."],
    "colorScheme": {
      "primary": "#0891b2",
      "secondary": "#10b981",
      "accent": "#f59e0b"
    }
  },
  "stages": [
    {
      "stageNumber": 1,
      "stageName": "Introduction",
      "title": "",
      "description": "",
      "xpOnComplete": 0,
      "activities": []
    },
    {
      "stageNumber": 2,
      "stageName": "Explore",
      "title": "",
      "description": "",
      "xpOnComplete": 0,
      "activities": []
    },
    {
      "stageNumber": 3,
      "stageName": "Learn",
      "title": "",
      "description": "",
      "xpOnComplete": 0,
      "activities": []
    },
    {
      "stageNumber": 4,
      "stageName": "Practice",
      "title": "",
      "description": "",
      "xpOnComplete": 0,
      "activities": []
    },
    {
      "stageNumber": 5,
      "stageName": "Summary",
      "title": "",
      "description": "",
      "xpOnComplete": 50,
      "activities": []
    }
  ]
}
```
