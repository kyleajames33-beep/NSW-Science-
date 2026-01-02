# AI Lesson Generation Prompt Template

Use this prompt with Claude or GPT-4 to generate lesson JSON files.

---

## Prompt Template

```
I need you to create a complete science lesson in JSON format for the NSW Science Hub.

LESSON DETAILS:
- Year: [7/8/9/10/11/12]
- Unit: [1-8]
- Lesson Number: [1-20]
- Title: "[Main Topic]"
- Subtitle: "[Subtopic | Key Concepts]"
- NSW Outcomes: [SC4-XXX-XX, SC4-YYY-YY]
- Duration: 45-50 minutes
- Total XP: 500

COLOR SCHEME:
- primary: "[#hex]"
- secondary: "[#hex]"
- accent: "[#hex]"

STRUCTURE REQUIREMENTS:

The lesson must have exactly 5 stages:

**Stage 1: Introduction (100 XP)**
- 1x hook activity (mystery/engagement)
- 1-2x infoCard activities (learning goals, context)
- 1x quiz activity (4-5 questions, 20 XP each)

**Stage 2: Explore (100 XP)**
- 1x dragDrop activity (sorting/categorizing, 100 XP)
  OR 1x infoCard + 1x quiz

**Stage 3: Learn (100 XP)**
- 2-3x infoCard activities (core content)
- 1x copyToBook activity (summary notes)

**Stage 4: Practice (150 XP)**
- 1x challengeLevels activity with 4 levels:
  - Level 1: Basic (25 XP, 3 questions)
  - Level 2: Intermediate (35 XP, 4 questions)
  - Level 3: Advanced (45 XP, 5 questions)
  - Level 4: Expert (45 XP, 5 questions)

**Stage 5: Summary (50 XP + completion)**
- 1x infoCard (key takeaways)
- 1x masteryChecklist (skills checklist)
- 1x hook (mystery resolution if Stage 1 had mystery)

ACTIVITY TYPE SPECIFICATIONS:

**1. hook**
```json
{
  "type": "hook",
  "title": "Engaging title",
  "description": "2-3 sentences presenting a mystery or interesting phenomenon",
  "emoji": "🔬"
}
```

**2. infoCard**
```json
{
  "type": "infoCard",
  "title": "Card title",
  "content": "Detailed explanation with scientific accuracy",
  "visual": "📊" // Use emoji or description
}
```

**3. quiz**
```json
{
  "type": "quiz",
  "title": "Quiz title",
  "xpPerQuestion": 20,
  "questions": [
    {
      "question": "Clear question?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctIndex": 0,
      "feedback": "Explanation of why this is correct and why others are wrong"
    }
  ]
}
```

**4. dragDrop**
```json
{
  "type": "dragDrop",
  "title": "Activity title",
  "instructions": "Drag each item to the correct category",
  "xpPerCorrect": 10,
  "zones": [
    { "id": "zone1", "label": "Category A", "color": "#0891b2" },
    { "id": "zone2", "label": "Category B", "color": "#10b981" }
  ],
  "items": [
    { "id": "1", "text": "Item 1", "correctZone": "zone1" },
    { "id": "2", "text": "Item 2", "correctZone": "zone2" }
  ]
}
```

**5. challengeLevels**
```json
{
  "type": "challengeLevels",
  "title": "Challenge: [Topic]",
  "levels": [
    {
      "level": 1,
      "description": "Basic [Topic]",
      "xp": 25,
      "questions": [/* 3 questions */]
    },
    {
      "level": 2,
      "description": "Intermediate [Topic]",
      "xp": 35,
      "questions": [/* 4 questions */]
    },
    {
      "level": 3,
      "description": "Advanced [Topic]",
      "xp": 45,
      "questions": [/* 5 questions */]
    },
    {
      "level": 4,
      "description": "Expert [Topic]",
      "xp": 45,
      "questions": [/* 5 questions */]
    }
  ]
}
```

**6. copyToBook**
```json
{
  "type": "copyToBook",
  "title": "Summary Notes",
  "content": "Clear, concise bullet points students should copy:\n• Key point 1\n• Key point 2\n• Key point 3"
}
```

**7. masteryChecklist**
```json
{
  "type": "masteryChecklist",
  "items": [
    "I can [learning outcome 1]",
    "I can [learning outcome 2]",
    "I can [learning outcome 3]",
    "I understand [concept 1]",
    "I can explain [concept 2]"
  ]
}
```

EXAMPLE REFERENCE:
Use this as a structural template (do not copy content):
[Paste y7-u1-l01.json here as reference]

REQUIREMENTS:
1. All content must be scientifically accurate
2. Age-appropriate language for the specified year level
3. Aligned to NSW Science syllabus
4. Engaging and varied activities
5. Progressive difficulty throughout lesson
6. Clear, specific feedback for all quiz questions
7. Real-world connections and examples
8. Proper scientific terminology

OUTPUT FORMAT:
Provide only valid JSON - no markdown code blocks, no explanations. The output should be ready to save as a .json file.

Generate the complete lesson now.
```

---

## Example Usage

### Year 7, Unit 1, Lesson 2

```
I need you to create a complete science lesson in JSON format for the NSW Science Hub.

LESSON DETAILS:
- Year: 7
- Unit: 1
- Lesson Number: 2
- Title: "Making Observations"
- Subtitle: "Qualitative vs Quantitative | Scientific Measurements"
- NSW Outcomes: SC4-OTU-01, SC4-WS-02
- Duration: 45-50 minutes
- Total XP: 500

COLOR SCHEME:
- primary: "#0891b2"
- secondary: "#10b981"
- accent: "#f59e0b"

[Rest of template follows...]
```

---

## Tips for Best Results

1. **Be Specific**: Provide exact topic, subtopics, and learning outcomes
2. **Reference NSW Syllabus**: Include actual outcome codes
3. **Check Output**: Validate JSON syntax before saving
4. **Test in Browser**: Always test generated lessons
5. **Iterate**: Refine content based on testing

## Common Issues to Watch For

- **JSON Syntax Errors**: Missing commas, quotes, brackets
- **XP Totals**: Must sum to exactly 500
- **Stage Numbers**: Must be 1, 2, 3, 4, 5
- **Correct Indexes**: Zero-based (0 = first option)
- **Missing Fields**: All required fields must be present
- **Empty Arrays**: At least one item in all arrays

## Quality Checklist

After generating:
- [ ] Valid JSON (test with `jq .`)
- [ ] Total XP = 500
- [ ] 5 stages numbered correctly
- [ ] All quiz questions have feedback
- [ ] DragDrop zones and items match
- [ ] ChallengeLevels has 4 levels
- [ ] Scientific accuracy verified
- [ ] Age-appropriate language
- [ ] NSW outcomes referenced

---

**Ready to generate lessons at scale! 🚀**
