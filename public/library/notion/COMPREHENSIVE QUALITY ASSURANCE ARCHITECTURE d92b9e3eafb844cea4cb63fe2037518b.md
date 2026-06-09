# COMPREHENSIVE QUALITY ASSURANCE ARCHITECTURE

# COMPREHENSIVE QUALITY ASSURANCE ARCHITECTURE

## Multi-Agent Book Writing System: Human Expertise Intervention Mapping

---

## EXECUTIVE SUMMARY

This document maps the **12 critical intervention points** where human expertise adds measurable value to book quality, organized by:

1. **Expertise Requirement Level** (Expert â†’ Specialist â†’ Mediocre â†’ Automated)
2. **System Component** (ChatGPT â†’ n8n â†’ Notion â†’ Asana)
3. **Integration Pattern** (How Eval/Graders feed quality scores)
4. **Optimal Deployment Strategy** (When to use what)

---

## PART 1: INTERVENTION POINT TAXONOMY

### TIER 1: CRITICAL EXPERT-ONLY ZONES (Cannot be delegated)

These require **10,000+ hours of domain expertise**. Mediocre humans produce systematically worse outcomes.

### **1.1 DEVELOPMENTAL EDIT GATEWAY**

**Location in System:** ChatGPT Specialized Agent â†’ Asana Custom Field Update â†’ n8n Orchestration
**What It Is:**

- Structural narrative assessment: Does the story work?
- Character arc coherence across 80,000+ words
- Thematic depth and symbolic resonance
- Pacing rhythm across multi-chapter sequences
**Why Expert Matters:**
- Requires pattern recognition across 300+ pages of context
- Intuitive grasp of narrative causality (if Chapter 3 changes, what breaks?)
- Emotional intelligence to assess reader engagement
- Years of pattern matching from reading 1000+ books in genre
**Integration Point:**
    
    ```
    [Expert Human Reviews Chapter]
    â†“
    [Inputs assessment to ChatGPT Agent: "Dev Edit Evaluator"]
    â†“
    [Agent generates structured feedback with citations]
    â†“
    [n8n workflow routes to Asana]
    â†“
    [Updates Custom Field: "Dev_Edit_Status" = "Revision Required" + "Dev_Edit_Notes"]
    â†“
    [Notion Dashboard aggregates: Dev Edit Completion Rate across all chapters]
    ```
    
    **Evaluation Criteria (for Eval/Graders):**
    
- **Plot Causality Score** (0-100): Do events follow logically?
- **Character Arc Coherence** (0-100): Do characters change believably?
- **Pacing Effectiveness** (0-100): Does tension build appropriately?
- **Thematic Integration** (0-100): Are themes woven through narrative?
**Asana Custom Fields Updated:**
- `Dev_Edit_Score` (Number 0-100)
- `Dev_Edit_Status` (Enum: Pending â†’ In Review â†’ Revision â†’ Approved)
- `Dev_Edit_Notes` (Rich Text with expert commentary)
- `Requires_Restructure` (Boolean - triggers major revision workflow)
**Cost of Using Mediocre Human:** 40-60% quality loss, unfixable without full rewrite

---

### **1.2 THEMATIC COHERENCE ARCHITECT**

**Location in System:** Expert Human â†’ Notion Dashboard â†’ Asana Project-Level Custom Fields
**What It Is:**

- Ensuring symbolic consistency across entire manuscript
- Motif tracking and callback placement
- Philosophical/intellectual depth verification
- Subtextual layer construction
**Why Expert Matters:**
- Requires literary analysis training
- Understanding of symbolic language and metaphor
- Ability to see patterns across non-linear narrative
- Cultural and historical reference knowledge
**Integration Point:**
    
    ```
    [Expert conducts thematic analysis]
    â†“
    [Uses Notion to map themes â†’ chapters (visual board)]
    â†“
    [Generates "Theme Density Map" showing distribution]
    â†“
    [Identifies gaps: "THEME_REDEMPTION appears Ch1, Ch5, Ch18 only - needs Ch11"]
    â†“
    [n8n creates Asana task in Ch11 with assignment]
    â†“
    [Updates Project Custom Field: "Thematic_Coherence_Score"]
    ```
    
    **Evaluation Criteria:**
    
- **Theme Distribution Uniformity** (0-100): Even spread across chapters?
- **Symbolic Consistency** (0-100): Are symbols used consistently?
- **Motif Callback Rate** (0-100): Do early motifs pay off later?
- **Intellectual Depth** (0-100): Is there substance beneath plot?
**Asana Custom Fields Updated:**
- `Primary_Themes` (Multi-Select at Project level)
- `Theme_Density_Chapter` (Number at Task level)
- `Thematic_Coherence_Score` (Number 0-100 at Project level)
- `Symbol_Registry` (Text array at Project level)
**Cost of Using Mediocre Human:** 70-80% quality loss, produces shallow/inconsistent themes

---

### **1.3 VOICE & STYLE GUARDIAN**

**Location in System:** Expert Human â†’ ChatGPT Style Analyzer â†’ Asana Task Custom Fields
**What It Is:**

- Maintaining consistent narrative voice across 100k+ words
- Detecting subtle tonal shifts
- Character voice differentiation
- Prose rhythm and flow assessment
**Why Expert Matters:**
- Requires ear for language (musicians/poets have advantage)
- Sensitivity to micro-level word choice impacts
- Understanding of register and diction
- Years of writing/editing experience
**Integration Point:**
    
    ```
    [Expert reads chapter with focus on voice]
    â†“
    [Uses ChatGPT Agent "Voice Analyzer" to generate style metrics]
    â†“
    [Agent compares to "style fingerprint" from early chapters]
    â†“
    [Flags deviations: "Chapter 12 has 40% more passive voice than baseline"]
    â†“
    [n8n routes alert to Asana]
    â†“
    [Creates subtask: "Voice Harmonization Pass - Chapter 12"]
    â†“
    [Updates Custom Field: "Voice_Consistency_Score"]
    ```
    
    **Evaluation Criteria:**
    
- **Voice Consistency** (0-100): Deviation from baseline style
- **Character Voice Differentiation** (0-100): Can you identify speaker without tags?
- **Prose Rhythm** (0-100): Sentence variety and flow
- **Register Appropriateness** (0-100): Formality level matches context
**Asana Custom Fields Updated:**
- `Voice_Consistency_Score` (Number 0-100)
- `Passive_Voice_Percentage` (Number - calculated)
- `Sentence_Length_Variance` (Number - calculated)
- `Style_Deviation_Flags` (Multi-Select: “Too Formal”, “Too Conversational”, etc.)
**Cost of Using Mediocre Human:** 50-60% quality loss, inconsistent reader experience

---

### TIER 2: SPECIALIST ZONES (Trained professionals, not necessarily elite)

These require **1,000-5,000 hours** of focused training. Specialists significantly outperform generalists.

### **2.1 LINE EDITING COORDINATOR**

**Location in System:** Specialist Human â†’ ChatGPT Line Edit Agent â†’ Asana Subtask Creation
**What It Is:**

- Sentence-level clarity and elegance
- Wordiness reduction
- Awkward phrasing identification
- Flow optimization
**Why Specialist Matters:**
- Requires trained eye for efficient prose
- Understanding of when rules can be broken
- Balance between clarity and voice
- Speed (can process 5,000 words/hour vs 1,000 for amateur)
**Integration Point:**
    
    ```
    [Specialist reviews chapter]
    â†“
    [Uses ChatGPT "Line Editor" to suggest improvements]
    â†“
    [Reviews AI suggestions, accepts 60%, modifies 30%, rejects 10%]
    â†“
    [Approved edits feed back to Asana task description]
    â†“
    [n8n tracks: Edit Velocity (words/hour), Accept Rate (% of AI suggestions used)]
    â†“
    [Notion Dashboard: Line Edit Progress across all chapters]
    ```
    
    **Evaluation Criteria:**
    
- **Clarity Score** (0-100): Is meaning immediately clear?
- **Conciseness Score** (0-100): Unnecessary words removed?
- **Elegance Score** (0-100): Does it read smoothly?
- **Error Density** (errors per 1000 words)
**Asana Custom Fields Updated:**
- `Line_Edit_Status` (Enum: Pending â†’ In Progress â†’ Complete)
- `Line_Edit_Pass_Count` (Number - iterations needed)
- `Clarity_Score` (Number 0-100)
- `Words_Removed` (Number - efficiency metric)
**Cost of Using Mediocre Human:** 30-40% quality loss, slower processing

---

### **2.2 CONTINUITY AUDITOR**

**Location in System:** Specialist Human â†’ Asana Search â†’ ChatGPT Continuity Checker â†’ Notion Issue Tracker
**What It Is:**

- Character detail consistency (eye color, backstory, etc.)
- Timeline logic verification
- Setting description consistency
- Fact-checking within story universe
**Why Specialist Matters:**
- Requires meticulous attention to detail
- Ability to cross-reference 100+ pages of notes
- Understanding of what details matter vs trivial inconsistencies
- Experience knowing common error patterns
**Integration Point:**
    
    ```
    [Specialist queries Asana custom fields: "Character_Appearances"]
    â†“
    [Generates matrix: Ch3, Ch7, Ch12, Ch15 all feature CHAR_SARAH]
    â†“
    [Uses ChatGPT "Continuity Checker" to scan those chapters for Sarah details]
    â†“
    [Agent flags: "Ch3 says Sarah has green eyes, Ch12 says blue eyes"]
    â†“
    [n8n creates Asana task: "Continuity Fix - Sarah's Eye Color"]
    â†“
    [Notion tracks: Continuity Issues Found, Continuity Issues Resolved]
    ```
    
    **Evaluation Criteria:**
    
- **Character Detail Consistency** (0-100): Details match across appearances?
- **Timeline Logic** (0-100): Events in plausible chronological order?
- **Setting Consistency** (0-100): Descriptions match previous references?
- **Universe Rules Adherence** (0-100): Magic system/tech follows established rules?
**Asana Custom Fields Updated:**
- `Continuity_Issues_Count` (Number)
- `Continuity_Audit_Status` (Enum: Not Started â†’ In Progress â†’ Complete)
- `Continuity_Notes` (Rich Text)
- `Requires_Canon_Update` (Boolean - indicates need to update series bible)
**Cost of Using Mediocre Human:** 25-35% quality loss, missed errors

---

### **2.3 PACING ANALYST**

**Location in System:** Specialist Human â†’ Notion Visualization â†’ ChatGPT Analyzer â†’ Asana Custom Field Updates
**What It Is:**

- Tension curve analysis across chapters
- Scene length optimization
- Action/reflection balance
- Climax positioning verification
**Why Specialist Matters:**
- Requires understanding of narrative rhythm
- Experience with genre conventions (thrillers vs literary fiction)
- Ability to see macro patterns while reading micro content
- Data analysis skills to interpret metrics
**Integration Point:**
    
    ```
    [Specialist reviews Asana Custom Field: "Tension_Level" across all chapters]
    â†“
    [Exports to Notion, creates line graph visualization]
    â†“
    [Identifies issues: "Tension drops from Ch8 (level 9) to Ch9 (level 4) - too steep"]
    â†“
    [Uses ChatGPT to suggest: "Add complication in Ch9 opening, delay resolution"]
    â†“
    [n8n creates Asana task: "Pacing Adjustment - Ch9"]
    â†“
    [Updates Custom Field: "Pacing_Status" = "Revision Required"]
    ```
    
    **Evaluation Criteria:**
    
- **Tension Curve Smoothness** (0-100): Appropriate rise and fall?
- **Scene Length Variance** (0-100): Good mix of short/long scenes?
- **Action/Reflection Ratio** (0-100): Genre-appropriate balance?
- **Climax Positioning** (0-100): Major peaks at 25%, 50%, 75%, 90%?
**Asana Custom Fields Updated:**
- `Tension_Level` (Number 1-10 at Task level)
- `Pacing_Score` (Number 0-100 at Project level)
- `Scene_Count` (Number at Task level)
- `Avg_Scene_Length` (Number - calculated)
**Cost of Using Mediocre Human:** 20-30% quality loss, pacing issues

---

### TIER 3: MEDIOCRE HUMAN ZONES (Training helpful but not critical)

These require **basic competence** (100-500 hours training). Mediocre humans perform adequately.

### **3.1 COPY EDITING REVIEWER**

**Location in System:** Mediocre Human â†’ ChatGPT Copy Edit Agent â†’ Asana Task Updates
**What It Is:**

- Grammar and punctuation
- Spelling errors
- Basic syntax issues
- Formatting consistency
**Why Mediocre Human Sufficient:**
- Most errors caught by AI (Grammarly, ChatGPT)
- Human just validates AI suggestions
- Low creativity required
- Clear right/wrong answers
**Integration Point:**
    
    ```
    [ChatGPT "Copy Editor" scans chapter]
    â†“
    [Generates list of 45 corrections]
    â†“
    [Mediocre human reviews list, approves 43, questions 2]
    â†“
    [n8n applies approved corrections to Asana task description]
    â†“
    [Updates Custom Field: "Copy_Edit_Status" = "Complete"]
    â†“
    [Notion Dashboard: Copy Edit Completion Rate]
    ```
    
    **Evaluation Criteria:**
    
- **Grammar Error Density** (errors per 1000 words)
- **Spelling Error Density** (errors per 1000 words)
- **Punctuation Correctness** (0-100)
- **Style Guide Adherence** (0-100)
**Asana Custom Fields Updated:**
- `Copy_Edit_Status` (Enum: Pending â†’ Complete)
- `Grammar_Errors_Found` (Number)
- `Corrections_Applied` (Number)
- `Copy_Edit_Date` (Date)
**Cost of Using Mediocre Human:** 5-10% quality loss (mostly stylistic)

---

### **3.2 BETA READER FEEDBACK AGGREGATOR**

**Location in System:** Mediocre Human â†’ Notion Database â†’ n8n Processing â†’ Asana Custom Fields
**What It Is:**

- Collecting beta reader comments
- Categorizing feedback types
- Identifying patterns
- Summarizing consensus
**Why Mediocre Human Sufficient:**
- Pattern recognition, not judgment
- Organizational task
- AI can assist heavily
- Clear classification rules
**Integration Point:**
    
    ```
    [Beta readers submit feedback forms (Google Forms/Typeform)]
    â†“
    [n8n pulls responses into Notion database]
    â†“
    [Mediocre human tags each response: "Character Issue", "Plot Hole", "Pacing", etc.]
    â†“
    [n8n aggregates: "12/15 readers complained about Ch7 pacing"]
    â†“
    [Creates Asana task: "High Priority - Ch7 Pacing (12 reader complaints)"]
    â†“
    [Updates Custom Field: "Beta_Feedback_Issues_Count"]
    ```
    
    **Evaluation Criteria:**
    
- **Response Collection Rate** (% of beta readers who completed)
- **Issue Categorization Accuracy** (0-100)
- **Pattern Detection Rate** (0-100): Did human catch consensus issues?
- **Aggregation Quality** (0-100): Summary useful to writers?
**Asana Custom Fields Updated:**
- `Beta_Reader_Score` (Number 1-5 average)
- `Beta_Feedback_Issues_Count` (Number)
- `Beta_Feedback_Summary` (Rich Text)
- `High_Priority_Beta_Issues` (Multi-Select)
**Cost of Using Mediocre Human:** 10-15% efficiency loss, minimal quality impact

---

### TIER 4: FULLY AUTOMATED ZONES (No human needed)

These require **zero human judgment**. Automation outperforms humans.

### **4.1 WORD COUNT TRACKING**

**Integration:** Asana API â†’ n8n â†’ Notion

```jsx
// n8n workflowconst chapter = await asana.tasks.get(taskGid);const wordCount = chapter.description.split(/\s+/).length;await asana.tasks.update(taskGid, {
 custom_fields: { 'Word_Count': wordCount }
});
```

### **4.2 REFERENCE LINK VALIDATION**

**Integration:** n8n Scheduled Workflow â†’ Asana Custom Field Queries

```jsx
// Verify all Chapter_References point to valid task GIDsconst references = chapter.custom_fields.Chapter_References;const valid = await Promise.all(
 references.map(gid => asana.tasks.get(gid).catch(() => null))
);if (valid.includes(null)) {
 // Create alert task}
```

### **4.3 STATUS PROGRESSION AUTOMATION**

**Integration:** Asana Rules

```
When Custom Field "Writing_Status" = "Draft Complete"
â†’ Then Update "Next_Stage" = "Dev Edit"
â†’ Then Assign to "Dev Editor Team"
â†’ Then Move to Section "Development Editing"
```

---

## PART 2: SYSTEM INTEGRATION ARCHITECTURE

### **2.1 THE FOUR-SYSTEM INTERACTION MODEL**

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ ASANA (Source of Truth) â”‚
â”‚ - Tasks (Chapters) with Custom Fields â”‚
â”‚ - Hierarchy (Portfolio â†’ Project â†’ Section â†’ Task) â”‚
â”‚ - Dependencies & References â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
 â”‚ â”‚
 â”‚ Webhook Events â”‚ API Queries
 â†“ â†“
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ n8n (Control â”‚â†â”€â”€Orchestratesâ”€â”€â”€â”€â†’â”‚ ChatGPT (Ops) â”‚
â”‚ Room) â”‚ â”‚ Specialized â”‚
â”‚ - Workflow Engine â”‚ â”‚ Agents â”‚
â”‚ - Data Transform â”‚ â”‚ - Dev Editor â”‚
â”‚ - Routing Logic â”‚ â”‚ - Line Editor â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚ - Continuity â”‚
 â”‚ â”‚ - Style â”‚
 â”‚ Aggregated Data â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
 â†“
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ NOTION (Dashboard & Monitoring) â”‚
â”‚ - Quality Score Aggregation â”‚
â”‚ - Visual Analytics (graphs, charts) â”‚
â”‚ - Issue Tracking â”‚
â”‚ - Expert Review Queue â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

### **2.2 DATA FLOW FOR QUALITY ASSURANCE**

**Stage 1: Writing Complete**

```
[Writer completes Chapter 3]
 â†“
[Updates Asana: "Writing_Status" = "Draft Complete"]
 â†“
[Asana Rule triggers: Assign to "Dev Editor Team"]
 â†“
[Asana Webhook â†’ n8n]
 â†“
[n8n creates Notion Task: "Ch3 - Dev Edit Required"]
```

**Stage 2: AI Pre-Analysis**

```
[n8n fetches Chapter 3 content from Asana]
 â†“
[Sends to ChatGPT "Quick Scan Agent"]
 â†“
[Agent returns preliminary scores:
 - Plot Causality: 75/100
 - Character Arc: 82/100
 - Pacing: 68/100 (FLAG: potential issue)
 - Thematic: 71/100]
 â†“
[n8n writes scores to Asana Custom Fields]
 â†“
[n8n updates Notion: "AI Pre-Score Complete"]
```

**Stage 3: Expert Review (Only for Flagged Items)**

```
[n8n detects: Pacing score < 70 (threshold)]
 â†“
[Routes to Expert Review Queue in Notion]
 â†“
[Expert Human opens Chapter 3 in Asana]
 â†“
[Conducts deep pacing analysis]
 â†“
[Updates Asana:
 - "Pacing_Score" = 65/100 (expert override)
 - "Dev_Edit_Notes" = "Tension drop Ch8â†’Ch9 too steep, suggest complication"
 - "Requires_Restructure" = TRUE]
 â†“
[Asana Webhook â†’ n8n]
 â†“
[n8n creates Asana subtask: "Restructure Ch9 Opening"]
 â†“
[n8n updates Notion: "Expert Review Complete - Revision Required"]
```

**Stage 4: Revision & Re-Evaluation**

```
[Writer revises Chapter 9]
 â†“
[Updates Asana: "Writing_Status" = "Revision Complete"]
 â†“
[n8n re-runs ChatGPT eval]
 â†“
[New Pacing Score: 78/100 (improved)]
 â†“
[Automatic progression: "Dev_Edit_Status" = "Approved"]
 â†“
[Notion Dashboard updates: Dev Edit Completion +1]
```

### **2.3 EVAL/GRADER INTEGRATION**

**OpenAI Evals Framework Integration:**

```python
# Example Eval Definition{
 "eval_name": "developmental_edit_quality",
 "model": "gpt-4",
 "criteria": [
 {
 "name": "plot_causality",
 "description": "Events follow logical cause-effect",
 "scale": "0-100",
 "rubric": {
 "90-100": "Perfect causal chain, no plot holes",
 "70-89": "Solid logic, minor gaps",
 "50-69": "Some logical leaps, fixable",
 "0-49": "Major plot holes, requires restructure" }
 },
 {
 "name": "character_arc_coherence",
 "description": "Character changes are believable and motivated",
 "scale": "0-100",
 "rubric": { /* similar */ }
 }
 ]
}
```

**Integration Point:**

```
[n8n triggers Eval]
 â†“
[Eval runs GPT-4 with structured prompt + rubric]
 â†“
[Returns JSON scores + justifications]
 â†“
[n8n parses JSON]
 â†“
[Updates Asana Custom Fields with scores]
 â†“
[If any score < threshold â†’ Route to Expert Queue in Notion]
```

---

## PART 3: OPTIMAL TASK DISTRIBUTION

### **3.1 DECISION MATRIX: WHO DOES WHAT**

| Task | Automation | Mediocre Human | Specialist | Expert | Rationale |
| --- | --- | --- | --- | --- | --- |
| **Word Count** | âœ“ | - | - | - | Pure calculation |
| **Grammar Check** | âœ“ (AI) | âœ“ (Review) | - | - | AI catches 95%+ |
| **Copy Edit** | âœ“ (AI) | âœ“ (Approve) | - | - | Clear rules |
| **Format** | âœ“ | - | - | - | Mechanical |
| **Reference Tracking** | âœ“ | - | - | - | Custom field queries |
| **Beta Aggregation** | - | âœ“ | - | - | Pattern recognition |
| **Continuity Audit** | âœ“ (AI assist) | - | âœ“ | - | Detail-oriented |
| **Line Editing** | âœ“ (AI suggest) | - | âœ“ | - | Efficiency matters |
| **Pacing Analysis** | âœ“ (Metrics) | - | âœ“ | - | Data + judgment |
| **Voice/Style** | âœ“ (Metrics) | - | - | âœ“ | Subtle expertise |
| **Dev Editing** | âœ“ (Pre-scan) | - | - | âœ“ | Story structure |
| **Thematic Coherence** | - | - | - | âœ“ | Literary analysis |

### **3.2 COST-BENEFIT ANALYSIS**

**Expert Human:**

- **Cost:** $100-200/hour
- **Speed:** 2,000-3,000 words/hour (deep analysis)
- **Use For:** Dev edit, thematic analysis, voice
- **ROI:** High - prevents 40-80% quality loss
**Specialist Human:**
- **Cost:** $40-80/hour
- **Speed:** 3,000-5,000 words/hour
- **Use For:** Line edit, continuity, pacing
- **ROI:** Medium-High - prevents 20-40% quality loss
**Mediocre Human:**
- **Cost:** $20-40/hour
- **Speed:** 2,000-3,000 words/hour
- **Use For:** Beta aggregation, copy edit review
- **ROI:** Low-Medium - prevents 5-15% quality loss
**AI Automation:**
- **Cost:** $0.01-0.10 per chapter
- **Speed:** Instant
- **Use For:** Metrics, formatting, preliminary scans
- **ROI:** Extreme - prevents 0-10% quality loss at minimal cost

---

## PART 4: COMPREHENSIVE PROMPT FOR SYSTEM

### **THE META-PROMPT: QUALITY ASSURANCE ORCHESTRATOR**

Use this as the master prompt for your n8n control room:

```
# BOOK WRITING QUALITY ASSURANCE SYSTEM - MASTER ORCHESTRATOR
You are the central intelligence coordinating a multi-agent book writing QA system. Your role is to route tasks to the optimal combination of AI agents, human specialists, and automated workflows based on task type, complexity, and current quality scores.
## YOUR TOOLS:
1. **Asana API**: Single source of truth with custom fields containing all book data
2. **ChatGPT Specialized Agents**: Dev Editor, Line Editor, Continuity Checker, Style Analyzer
3. **n8n Workflows**: 20+ pre-built workflows for data transformation and routing
4. **Notion API**: Dashboard for quality monitoring and expert review queues
5. **OpenAI Evals**: Structured quality grading with rubrics
## YOUR CORE LOGIC:
### WHEN A CHAPTER REACHES "DRAFT COMPLETE" STATUS:
**STEP 1: AI PRE-SCAN (Automated)**
- Run ChatGPT Quick Scan Agent
- Generate preliminary scores for:
 * Plot Causality (0-100)
 * Character Arc Coherence (0-100)
 * Pacing Effectiveness (0-100)
 * Thematic Integration (0-100)
 * Voice Consistency (0-100)
- Update Asana Custom Fields with scores
- Calculate: Overall_QA_Score = (sum of above) / 5
**STEP 2: ROUTING DECISION (Your Intelligence)**
IF Overall_QA_Score >= 85:
 â†’ Route to: Line Edit (Specialist Human + AI)
 â†’ Rationale: Chapter is structurally sound, just needs polish

ELSE IF Overall_QA_Score >= 70:
 â†’ Route to: Focused Expert Review (only low-scoring dimensions)
 â†’ Example: If Pacing = 65, others = 80+, only get Pacing Expert
 â†’ Rationale: One specific issue, don't waste expert time on whole chapter

ELSE IF Overall_QA_Score < 70:
 â†’ Route to: Full Expert Dev Edit
 â†’ Rationale: Structural problems, needs comprehensive human assessment
**STEP 3: EXPERT REVIEW ROUTING (If Needed)**
Create Notion Task with:
- **Priority**: Based on score (50-59 = High, 60-69 = Medium, 70-84 = Low)
- **Type**: Dev Edit / Thematic / Pacing / Voice
- **Context**:
* Link to Asana task
 * AI-generated preliminary analysis
 * Relevant custom field values (Plot_Thread_IDs, Character_Appearances, etc.)
 * Cross-references (which other chapters reference this one)

Assign to appropriate expert based on:
- **Dev Edit issues** â†’ Lead Developmental Editor
- **Thematic issues** â†’ Thematic Analyst (literary background)
- **Voice issues** â†’ Style Guardian (writing MFA or 10+ years experience)
- **Pacing issues** â†’ Pacing Specialist (genre expertise)
**STEP 4: MONITORING & ESCALATION**
Track in Notion Dashboard:
- **Chapters in Each Stage**: Outline â†’ Draft â†’ Dev Edit â†’ Line Edit â†’ Copy â†’ Done
- **Bottlenecks**: If >5 chapters stuck in Dev Edit for >7 days, escalate
- **Quality Trends**: Is Overall_QA_Score improving over time?
- **Expert Utilization**: Are experts spending time on automatable tasks? (BAD)
Create alerts if:
- Any chapter has Overall_QA_Score < 50 (major problem)
- Any score dimension decreases by >15 points between drafts (regression)
- Expert review time exceeds 4 hours per chapter (inefficiency)
- Same issue flagged in 3+ consecutive chapters (systemic problem)
**STEP 5: CONTINUOUS IMPROVEMENT**
Every 10 chapters, analyze:
- **AI Accuracy**: Compare AI pre-scores to final expert scores
 * If correlation < 0.7, retrain eval rubrics
- **Expert Agreement**: Do different experts give similar scores?
 * If inter-rater reliability < 0.8, calibrate rubrics
- **Efficiency**: What's the avg time from Draft â†’ Final?
 * Target: <14 days per chapter
- **Quality**: What's the avg Beta_Reader_Score?
 * Target: 4.2+/5.0
Feed learnings back into:
- Refined ChatGPT agent prompts
- Updated Asana custom field definitions
- Adjusted routing thresholds (maybe 75 is better cutoff than 70?)
## YOUR DECISION RULES FOR EDGE CASES:
**Case 1: Split Opinions**
- AI says 85 (good), Expert says 65 (poor)
- Resolution: Trust expert, flag AI for retraining, use expert score
**Case 2: Dependency Blocker**
- Chapter 7 ready for dev edit, but references Chapter 3 which is still in draft
- Resolution: Hold Ch7 in queue, create Asana dependency link, notify writer
**Case 3: Scope Creep**
- Expert identifies issue requiring rewrite of Chapters 3, 5, AND 7
- Resolution: Create Notion "Major Revision Project", get stakeholder approval before proceeding
**Case 4: Quality Regression**
- Chapter 9 second draft scores LOWER than first draft
- Resolution: Immediate expert review, investigate: Did writer misunderstand feedback?
**Case 5: Eval Disagreement**
- Plot Causality eval says 90, but Character Arc eval identifies plot hole
- Resolution: Evals can measure different aspects, both valid, route to expert for tie-break
## YOUR COMMUNICATION TEMPLATES:
**To Writer (via Asana comment):**
"Chapter 3 dev edit complete. Overall score: 78/100. Strengths: Strong character development (85/100), excellent pacing (82/100). Area for improvement: Plot causality (68/100) - see dev editor notes for 3 specific plot holes to address. Estimated revision time: 4-6 hours."
**To Expert (via Notion assignment):**
"Expert review requested: Chapter 7 - Thematic Integration. AI pre-score: 64/100 (below threshold). Context: This is Part 2 climax chapter, references THREAD_PROPHECY and THREAD_BETRAYAL. AI flagged: Theme density score 40% below project average. Please assess and provide guidance."
**To Stakeholder (via Notion dashboard):**
"Book 1 QA Status: 18 chapters, 12 complete (67%), 4 in dev edit, 2 in draft. Avg quality score: 81/100 (target: 80+). On track for completion in 6 weeks. Alert: Chapter 15 has undergone 3 revision cycles, may need architectural discussion."
## YOUR LEARNING OBJECTIVES:
1. **Minimize Expert Time on Low-Value Tasks**: Goal is 90%+ expert time on Tier 1 (dev edit, thematic, voice), <10% on Tier 2-3
2. **Maximize AI Prediction Accuracy**: Goal is AI pre-scores within Â±5 points of final expert scores 80%+ of time
3. **Optimize Pipeline Velocity**: Goal is 1 chapter fully QA'd every 2-3 days (for team of 2-3 people)
4. **Prevent Quality Regression**: Goal is <5% of chapters score lower after revision than before
## YOUR MONITORING DASHBOARDS (in Notion):
**Dashboard 1: Pipeline Status**
- Kanban: Outline | Draft | Dev Edit | Line Edit | Copy | Done
- Chapter cards show: Overall_QA_Score, Days_in_Current_Stage, Assigned_To
**Dashboard 2: Quality Metrics**
- Line graph: Overall_QA_Score trend across all chapters
- Bar chart: Score distribution by dimension (Plot, Character, Pacing, etc.)
- Heatmap: Which chapters have high/low scores in which dimensions
**Dashboard 3: Efficiency Metrics**
- Avg days per stage (Draftâ†’Dev Edit: X days, Dev Editâ†’Line Edit: Y days)
- Expert utilization (hours spent, tasks completed, avg score improvement)
- Bottleneck identification (which stage has longest queue)
**Dashboard 4: Quality Assurance**
- Beta reader scores vs internal QA scores (correlation analysis)
- Issue recurrence (same problems appearing in multiple chapters?)
- Revision cycle counts (how many drafts per chapter on average?)
## YOUR SUCCESS METRICS:
- **Quality**: Avg Overall_QA_Score > 80, Beta_Reader_Score > 4.0
- **Efficiency**: <14 days from draft to final, <3 revision cycles per chapter
- **Resource Optimization**: Expert time 80%+ on Tier 1 tasks
- **Accuracy**: AI predictions within Â±10 points of expert 85%+ of time
- **Throughput**: 2-3 chapters completed per week (for team of 3-4)
Execute this logic for every chapter that enters the system. Adapt thresholds based on observed performance. Prioritize quality over speed, but optimize for both.
```

---

## PART 5: IMPLEMENTATION CHECKLIST

### **Phase 1: Foundation (Week 1-2)**

- [ ]  Set up Asana workspace with full custom field taxonomy (30+ fields)
- [ ]  Create n8n workflows for basic automation (word count, status updates)
- [ ]  Configure ChatGPT agents with specialized prompts
- [ ]  Build Notion dashboard with 4 core views
    
    ### **Phase 2: Integration (Week 3-4)**
    
- [ ]  Connect Asana webhooks to n8n
- [ ]  Implement OpenAI Evals with custom rubrics
- [ ]  Set up n8n â†’ Notion data sync
- [ ]  Train specialist humans on system usage
    
    ### **Phase 3: Calibration (Week 5-6)**
    
- [ ]  Run 5 sample chapters through full pipeline
- [ ]  Compare AI scores to expert scores, adjust thresholds
- [ ]  Measure time per stage, identify bottlenecks
- [ ]  Refine routing logic based on results
    
    ### **Phase 4: Production (Week 7+)**
    
- [ ]  Process all chapters through system
- [ ]  Weekly review of dashboard metrics
- [ ]  Monthly system optimization based on learnings
- [ ]  Quarterly expert calibration sessions

---

## CONCLUSION: WHERE EXPERTISE MATTERS

**High-Value Expert Zones (Cannot Delegate):**

1. Developmental editing gateway
2. Thematic coherence architecture
3. Voice & style guardianship
**Medium-Value Specialist Zones (Trained Professionals):**
4. Line editing coordination
5. Continuity auditing
6. Pacing analysis
**Low-Value Mediocre Human Zones (Basic Competence):**
7. Copy edit review
8. Beta feedback aggregation
**Zero-Value Automation Zones (No Human Needed):**
9. Word count tracking
10. Reference validation
11. Status progression
12. Metric calculation
**The Key Insight**: Expertise matters most at the **structural/conceptual layer** (Tier 1), matters somewhat at the **execution layer** (Tier 2), and barely matters at the **mechanical layer** (Tier 3-4).
Your system should route 80% of expert time to Tier 1, 15% to Tier 2, 5% to Tier 3, and 0% to Tier 4.
**The architecture ensures this by**: AI pre-screening (catches Tier 3-4), specialists handling Tier 2, experts only called for Tier 1 or when AI flags issues in their domain.
This is how you build a book writing QA system that is both high-quality AND efficient.
    
    ```
    
    ```
    

---

END OF DOCUMENT