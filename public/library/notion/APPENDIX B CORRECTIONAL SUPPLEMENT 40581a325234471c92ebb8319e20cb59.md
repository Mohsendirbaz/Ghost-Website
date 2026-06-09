# APPENDIX B CORRECTIONAL SUPPLEMENT

# APPENDIX B: CORRECTIONAL SUPPLEMENT

## New Analyst Onboarding Lecture - Updates & Clarifications

**Date:** October 29, 2025
**Applies to:** New Analyst Onboarding Lecture v1.0
**Status:** This appendix does NOT replace the base lectureâ€”it supplements with architectural updates made after initial document completion.

---

## PURPOSE

This appendix documents three critical architectural decisions implemented after the base onboarding lecture was written:

1. **Grid-Based Subtask Capacity Model** - Fixed word-count structure for all content units
2. **Multi-Homing Architecture** - Tasks existing across multiple projects/sections simultaneously
3. **Cross-System Integration** - How storage auditing and QA intervention integrate with the base system
**Reader note:** Refer to the base onboarding lecture for foundational concepts. This appendix assumes you’ve completed that reading.

---

## SECTION 1: GRID-BASED SUBTASK CAPACITY MODEL

### 1.1 The Constraint: Fixed Capacity Units

**Update to Section 10.1 (Technology Stack) & Section 4.2 (Hierarchical Structure):**
All content in the system is now organized in **fixed-capacity units** based on a definable grid structure.
**Base unit:** 1024 words per subtask (2^10 words)
**Grid dimensions:**

- **Horizontal (Depth):** 5 levels of nested subtasks
- **Vertical (Siblings):** Up to 10 subtasks per level
- **Total capacity per task:** 50 subtask cells in a 10Ã—5 grid
    
    ### 1.2 Horizontal Capacity Formula
    
    **Mathematical definition:**
    For a subtask at depth `n` from its parent Task:
    
    ```
    Capacity(n) = Base_Capacity / (2^n)
    Capacity(n) = 1024 / (2^n) [in words]
    ```
    
    **Concrete examples:**
    
    | Depth (n) | Calculation | Capacity | Context |
    | --- | --- | --- | --- |
    | **0** | 1024 / 2^0 | **1024 words** | Task itself |
    | **1** | 1024 / 2^1 | **512 words** | First-level subtasks |
    | **2** | 1024 / 2^2 | **256 words** | Second-level subtasks |
    | **3** | 1024 / 2^3 | **128 words** | Third-level subtasks |
    | **4** | 1024 / 2^4 | **64 words** | Fourth-level subtasks |
    | **5** | 1024 / 2^5 | **32 words** | Fifth-level subtasks (leaf nodes) |
    
    ### 1.3 Vertical Consistency (Current Implementation)
    
    **Current constraint:** No vertical variation in capacity.
    All siblings at the same depth level have **identical capacity**. This means:
    
- All 10 first-level subtasks each get 512 words
- All 10 second-level subtasks each get 256 words
- And so forth
**Visual representation:**
    
    ```
    TASK: "Chapter 3: The Forbidden Archive" (1024 words)
    â”‚
    â”œâ”€ Subtask 1.1: "Opening Scene" (512w)
    â”‚ â”œâ”€ Subtask 2.1: "Character intro" (256w)
    â”‚ â”‚ â”œâ”€ Subtask 3.1: "Physical description" (128w)
    â”‚ â”‚ â”‚ â”œâ”€ Subtask 4.1: "Eye color detail" (64w)
    â”‚ â”‚ â”‚ â”‚ â””â”€ Subtask 5.1: "Amber flecks note" (32w)
    â”‚ â”‚ â”‚ â””â”€ Subtask 4.2: "Posture note" (64w)
    â”‚ â”‚ â””â”€ Subtask 3.2: "Dialogue intro" (128w)
    â”‚ â””â”€ Subtask 2.2: "Setting description" (256w)
    â”œâ”€ Subtask 1.2: "Inciting incident" (512w)
    â””â”€ Subtask 1.3: "Scene transition" (512w)
    ```
    
    ### 1.4 Why This Matters
    
    **1. Definable Graph Structure:**
    The capacity constraint creates a **weighted directed acyclic graph (DAG)** where:
    
- **Vertices** = Tasks and subtasks
- **Edges** = Parent-child containment relationships
- **Weights** = Word capacity at each node
- **Graph property:** Total capacity of all children â‰¤ Parent capacity
This makes the graph **mathematically tractable** for:
- Topological sorting with capacity constraints
- Load balancing across agents based on subtask sizes
- Dependency analysis weighted by content volume
- Chromatic coloring where color represents content phase (draft/edit/polish)
**2. Asana Integration:**
Custom field implementation:
    
    ```python
    {
    "Subtask_Depth": 3, # Integer 0-5"Subtask_Capacity": 128, # Auto-calculated: 1024 / (2^3)"Current_Word_Count": 127, # Tracked by agent"Capacity_Utilization": 0.99, # 127/128"Overflow_Warning": False # Triggers if word_count > capacity}
    ```
    
    **3. Agent Assignment Logic:**
    From Section 8.2 (Agent Workflow), this now includes capacity awareness:
    
    ```python
    def assign_subtask_to_agent(subtask):
    """Enhanced assignment with capacity constraints."""depth = subtask.custom_fields["Subtask_Depth"]
    capacity = 1024 // (2 ** depth)
    ```
    

if capacity >= 512:

# Large subtasks need first-pass author

return assign_to_first_author(subtask)
elif capacity >= 128:

# Medium subtasks can go to specialized agents

return assign_by_content_type(subtask)
else:

# Small subtasks (<128 words) auto-handled

return assign_to_automated_completion(subtask)

```
### 1.5 Future Consideration: Vertical Variation
**Not yet implemented, but architecturally supported:**
Future versions may allow variable capacity at the same depth level:
```

Level 1 subtasks:
â”œâ”€ Subtask 1.1: 600 words (higher importance)
â”œâ”€ Subtask 1.2: 300 words (medium)
â””â”€ Subtask 1.3: 124 words (lower)
â”€â”€â”€â”€â”€â”€â”€â”€
1024 words total (constraint maintained)

```
This would enable:
- Priority-weighted capacity allocation
- Thematic importance reflected in word budget
- Dynamic rebalancing based on content needs
**Current status:** Vertical variation is **disabled**. All siblings get equal share.
---
## SECTION 2: MULTI-HOMING ARCHITECTURE
### 2.1 The Concept: Tasks in Multiple Contexts
**Update to Section 5.2 (Custom Field References):**
Tasks can now exist in **multiple sections across multiple projects simultaneously**.
**Example scenario:**
```

TASK: “Climate Policy Analysis - Section 2.3”
Context 1:
Project: “Book 1: Prosecuting Inequity”
Section: “Chapter 3: Decarbonization Pathways”
Custom Fields: {Climate_Thread: TRUE, Policy_Focus: “Carbon tax”}
Context 2:
Project: “Book 2: Dishonest AI is Dangerous AI”
Section: “Chapter 1: AI Monopoly Power”
Custom Fields: {AI_Thread: TRUE, Policy_Focus: “Regulatory capture”}
Same task, different referential contexts.

```
### 2.2 Technical Implementation via AI Rules
**Asana feature:** "Move to another project" action in AI Rules
**Key behavior:** AI Rules execute **per project**.
This creates natural pathway branching:
```

Project A rules:
IF Task.status = “Draft Complete”
THEN Move to Project B, Section “Ready for Cross-Reference”

Project B rules:
IF Task.status = “Draft Complete”
THEN Move to Project C, Section “Ready for Synthesis”

```
**Result:** Task follows different workflows depending on which project's rules fire.
### 2.3 Distributed Workload Pattern
Multi-homing enables **workload distribution across projects**:
```

â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ Shared Task: “Policy Analysis” â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
â–² â–²
â”‚ â”‚
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ â”‚
â”Œâ”€â”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”€â” â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ Project A: â”‚ â”‚ Project B: â”‚
â”‚ Climate Book â”‚ â”‚ AI Ethics Book â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
â”‚ â”‚
â”‚ Rules fire based on â”‚
â”‚ Project A context â”‚ Rules fire based on
â–¼ â”‚ Project B context
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â–¼
â”‚ Route to Dev â”‚ â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ Editor (Agent â”‚ â”‚ Route to Theme â”‚
â”‚ specializing â”‚ â”‚ Checker (Agent â”‚
â”‚ in climate) â”‚ â”‚ for AI ethics) â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜

```
**Advantage:** Same content, different processing pipelines based on thematic context.
### 2.4 Version Tracking via Storage Integration
**Critical connection to Appendix A (Storage Architecture):**
Multi-homing creates version branching that **must** be tracked in ChatGPT Storages:
```javascript
// When task moves to Project B
storage.createVersion({
 task_gid: "1234567890",
 version: 7,
 context: "moved_to_project_b",
 project_path: ["Book 2", "Chapter 1", "Section 3"],
 parent_version: 6,
 metadata: {
 multi_home_parent_project: "Book 1 (gid: 9876543210)",
 branching_point: "Draft Complete",
 custom_fields_delta: {
 // Only fields that changed between contexts
 "AI_Thread": true, // New
 "Climate_Thread": false // Removed
 }
 }
});
```

**Key insight:** Multi-homing without storage = chaos. Storage provides the audit trail.

### 2.5 Auditability Guarantee

**Reference to Appendix A, Section 1.4 (Audit Reports):**
The storage system can reconstruct the complete multi-project journey:

```
Task "Policy Analysis" version history:
v1-v5: In Project A (Climate Book)
 â”œâ”€ v1: Initial draft (Writer Agent-Alpha)
 â”œâ”€ v2: Dev edit (Expert-Climate)
 â”œâ”€ v3: First revision (Writer Agent-Alpha)
 â”œâ”€ v4: Line edit (Specialist-Economy)
 â””â”€ v5: Status â†’ "Draft Complete"
v6: Moved to Project B (AI Ethics Book)
 â””â”€ Custom fields updated: AI_Thread = TRUE
v7-v9: In Project B
 â”œâ”€ v7: Thematic analysis (Expert-AI-Ethics)
 â”œâ”€ v8: Integration revisions (Writer Agent-Beta)
 â””â”€ v9: Final synthesis (Agent-Coordinator)
```

**Compliance benefit:** Full traceable history across all project contexts.

### 2.6 No Immediate Use Case Required

**Important note:** Multi-homing is **constructive flexibility**.
We don’t need to define specific use cases today. The architecture supports:

- Cross-book thematic threads (as in the example)
- Shared research sections referenced by multiple chapters
- Modular content blocks reused in different contexts
- A/B testing of content in different narrative positions
The system is **ready** when we need it.

---

## SECTION 3: CROSS-SYSTEM INTEGRATION

### 3.1 Storage Architecture (Appendix A)

**What the onboarding lecture covers:**

- Basic Asana structure (portfolios â†’ goals â†’ projects â†’ tasks)
- Custom fields as referential strands
- Agent coordination patterns
**What Appendix A adds:**
- **ChatGPT Storages** for complete version history
- **Initial population workflow** (structure â†’ first draft â†’ v1 snapshot)
- **Reinforcement loop** for iterative quality improvement
- **Audit reports** exportable for compliance
**Your responsibility as analyst:**
From Appendix A, Section 4.2 (Orchestrator Agent):
```
Monitor the reinforcement loop:
- Track iteration counts per chapter (target: <3)
- Identify chapters stuck in revision cycles
- Analyze why certain chapters need more iterations
- Report to team lead if >5 chapters exceed 4 iterations
    
    ```
    **Key metrics to track:**
    ```python
    storage_metrics = {
    "avg_versions_per_chapter": 3.2, # Target: <4
    "chapters_with_5plus_versions": 2, # Alert threshold: >3
    "avg_days_in_storage": 18.5, # From v1 â†’ final
    "storage_size_mb": 247.3, # Track growth
    "oldest_unresolved_version": "Chapter 7 v3" # Flag for escalation
    }
    ```
    
    ### 3.2 QA Expertise Intervention (QA Guide)
    
    **What the onboarding lecture covers:**
    
- Agent roles and responsibilities
- Basic quality assurance workflow
- Coherence metrics (Î¼(E), chromatic number)
**What the QA Guide adds:**
- **12 intervention points** mapped by expertise level
- **Tier 1-4 classification** (Expert â†’ Specialist â†’ Mediocre â†’ Automated)
- **Routing decision logic** based on QA scores
- **OpenAI Evals integration** with custom rubrics
**Your responsibility as analyst:**
From QA Guide, Section 4 (Orchestrator Agent):
```
You are the intelligent router. Your job:
STEP 1: AI Pre-Scan (Automated)
- Generate preliminary scores (Plot, Character, Pacing, Theme, Voice)
- Calculate Overall_QA_Score = average of dimensions
STEP 2: Routing Decision
IF Overall_QA_Score >= 85:
â†’ Route to Line Edit
ELSE IF Overall_QA_Score >= 70:
â†’ Route to Focused Expert Review (only low-scoring dimensions)
ELSE IF Overall_QA_Score < 70:
â†’ Route to Full Expert Dev Edit
STEP 3: Monitor efficiency
- Are experts spending >80% time on Tier 1 tasks? (GOOD)
- Are experts doing Tier 3-4 work? (BAD - automate it)
    
    ```
    **Key metrics from QA Guide:**
    ```python
    qa_metrics = {
    "avg_overall_qa_score": 81.3, # Target: >80
    "expert_time_tier1_pct": 78, # Target: >80%
    "chapters_below_70": 3, # Alert threshold: >5
    "ai_prediction_accuracy": 0.87, # Correlation with expert scores
    "avg_revision_cycles": 2.8 # Target: <3
    }
    ```
    
    ### 3.3 Unified Dashboard View
    
    **Your analyst responsibility** spans all three systems:
    
    ```
    â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
    â”‚ ANALYST DASHBOARD â”‚
    â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
    â”‚ â”‚
    â”‚ [1] ASANA METRICS (Base System) â”‚
    â”‚ â€¢ 56 total chapters â”‚
    â”‚ â€¢ 34 complete, 15 in progress, 7 blocked â”‚
    â”‚ â€¢ Avg coherence score: Î¼(E) = 0.847 â”‚
    â”‚ â€¢ Chromatic number: Ï‡(G) = 4 (optimal) â”‚
    â”‚ â”‚
    â”‚ [2] STORAGE METRICS (Appendix A) â”‚
    â”‚ â€¢ 178 total versions across all chapters â”‚
    â”‚ â€¢ Avg 3.2 versions per chapter â”‚
    â”‚ â€¢ 2 chapters with 5+ versions (flagged) â”‚
    â”‚ â€¢ Storage size: 247 MB â”‚
    â”‚ â”‚
    â”‚ [3] QA METRICS (QA Guide) â”‚
    â”‚ â€¢ Avg QA score: 81.3/100 â”‚
    â”‚ â€¢ 3 chapters below threshold (<70) â”‚
    â”‚ â€¢ Expert time on Tier 1: 78% (target: 80%) â”‚
    â”‚ â€¢ AI prediction accuracy: 87% â”‚
    â”‚ â”‚
    â”‚ [ALERTS] â”‚
    â”‚ âš ï¸ Chapter 7 stuck at 5 versions (investigate) â”‚
    â”‚ âš ï¸ Chapter 15 QA score 68 (route to expert) â”‚
    â”‚ âš ï¸ Expert utilization at 78% (improve by 2%) â”‚
    â”‚ â”‚
    â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
    ```
    
    **Weekly report structure:**
    ```markdown
    
    ## Week 12 Analysis Report
    
    ### System Health
    
- Overall: HEALTHY (81.3/100 QA, 0.847 coherence)
- Bottlenecks: 2 chapters in extended revision
- Throughput: 2.3 chapters completed/week (on track)
    
    ### Deep Dive: Chapter 7 Investigation
    
- Issue: 5 versions over 21 days (excessive)
- Root cause: Thematic coherence with Ch 3 unresolved
- Recommendation: Expert intervention on cross-chapter thread
    
    ### Optimization Opportunities
    
- AI prediction accuracy 87% â†’ retrain eval rubrics
- Expert time on Tier 1 at 78% â†’ automate 2 Tier 3 tasks
- Storage growth 15MB/week â†’ archive old versions quarterly
    
    ### Forecast
    
- Completion: 4 weeks remaining at current pace
- Risk: Chapter 15 may need architectural discussion
- Confidence: 85% we hit quality targets (>80 QA score)
    
    ```
    
    ```
    

---

## SECTION 4: GRID CAPACITY IMPLEMENTATION EXAMPLE

### 4.1 Concrete Chapter Breakdown

**Task:** “Chapter 3: The Forbidden Archive” (1024 words)
**Level 1 Subtasks (512 words each):**

```
â”œâ”€ 1.1: "Act 1 - Discovery" (512w)
â”œâ”€ 1.2: "Act 2 - Complication" (512w)
â””â”€ Total allocated: 1024w âœ“
```

**Level 2 Subtasks under 1.1 (256 words each):**

```
â”œâ”€ 1.1 â†’ 2.1: "Scene A - Archive entrance" (256w)
â”œâ”€ 1.1 â†’ 2.2: "Scene B - Discovering tome" (256w)
â””â”€ Total allocated: 512w âœ“
```

**Level 3 Subtasks under 2.1 (128 words each):**

```
â”œâ”€ 2.1 â†’ 3.1: "Paragraph 1-2: Setting description" (128w)
â”œâ”€ 2.1 â†’ 3.2: "Paragraph 3-4: Character action" (128w)
â””â”€ Total allocated: 256w âœ“
```

**Level 4 Subtasks under 3.1 (64 words each):**

```
â”œâ”€ 3.1 â†’ 4.1: "Sentence cluster: Visual details" (64w)
â”œâ”€ 3.1 â†’ 4.2: "Sentence cluster: Atmospheric mood" (64w)
â””â”€ Total allocated: 128w âœ“
```

**Level 5 Subtasks under 4.1 (32 words each):**

```
â”œâ”€ 4.1 â†’ 5.1: "Detail: Dust motes in light" (32w)
â”œâ”€ 4.1 â†’ 5.2: "Detail: Leather-bound volumes" (32w)
â””â”€ Total allocated: 64w âœ“
```

### 4.2 Custom Field Values at Each Level

**Asana representation:**

```json
{ "name": "Detail: Dust motes in light", "custom_fields": { "Subtask_Depth": 5, "Subtask_Capacity": 32, "Current_Word_Count": 31, "Capacity_Utilization": 0.97, "Overflow_Warning": false, "Parent_Path": "Ch3 > 1.1 > 2.1 > 3.1 > 4.1 > 5.1", "Content_Phase": "Final Polish", "Last_Edited_By": "Agent-CopyEditor", "Quality_Score": 92 }}
```

### 4.3 Agent Routing Based on Capacity

```python
def route_subtask_by_capacity(subtask):
 """Route to appropriate agent based on subtask size.""" capacity = subtask.custom_fields["Subtask_Capacity"]
if capacity >= 512:
 # Large structural units return {
 "agent": "FirstAuthorAgent",
 "estimated_hours": 4.0,
 "requires_review": true,
 "review_type": "dev_edit" }
elif capacity >= 256:
 # Medium scene-level unitsreturn {
 "agent": "DevEditorAgent",
 "estimated_hours": 2.0,
 "requires_review": true,
 "review_type": "line_edit" }
elif capacity >= 128:
 # Paragraph-level units return {
 "agent": "LineEditorAgent",
 "estimated_hours": 1.0,
 "requires_review": false
 }
elif capacity >= 64:
 # Sentence cluster units return {
 "agent": "CopyEditorAgent",
 "estimated_hours": 0.5,
 "requires_review": false
 }
else: # capacity == 32 # Micro-detail units (leaf nodes) return {
 "agent": "AutomatedPolishAgent",
 "estimated_hours": 0.1,
 "requires_review": false
 }
```

---

## SECTION 5: INTEGRATION CHECKLIST

### 5.1 For New Analysts

**Week 1: Baseline Understanding**

- [ ]  Complete base onboarding lecture (Section 1-11)
- [ ]  Read this appendix (Appendix B)
- [ ]  Read Appendix A (Storage Architecture)
- [ ]  Read QA Intervention Guide
- [ ]  Set up access to: Asana, Notion, n8n, ChatGPT API
**Week 2: Metric Familiarization**
- [ ]  Understand grid capacity formula: 1024 / (2^n)
- [ ]  Practice calculating subtask capacities at different depths
- [ ]  Review sample chapter with 50-subtask grid structure
- [ ]  Identify which subtasks are at capacity vs. under-capacity
- [ ]  Generate first capacity utilization report
**Week 3: Cross-System Monitoring**
- [ ]  Set up unified dashboard (Asana + Storage + QA metrics)
- [ ]  Configure alerts for threshold violations
- [ ]  Run first weekly analysis report
- [ ]  Present findings to team lead
- [ ]  Identify 1-2 optimization opportunities
**Week 4: Full Responsibility**
- [ ]  Own all three metric categories independently
- [ ]  Proactively flag issues before they become blockers
- [ ]  Recommend system improvements based on data
- [ ]  Train next analyst on dashboard interpretation
    
    ### 5.2 Critical Questions to Always Ask
    
    **About capacity:**
    
1. Are any subtasks consistently exceeding capacity? (Sign of poor decomposition)
2. Are any subtasks using <50% of capacity? (Sign of over-decomposition)
3. Is the 1024-word base unit appropriate, or should we adjust?
**About multi-homing:**
4. Which tasks are currently multi-homed across projects?
5. Are multi-homed tasks creating version conflicts?
6. Is storage correctly tracking all project contexts?
**About quality:**
7. Are chapters with more versions scoring higher or lower? (Learning curve analysis)
8. Are certain agents consistently producing high-quality first drafts? (Agent performance)
9. Are experts spending time on tasks that should be automated? (Efficiency audit)

---

## SECTION 6: MATHEMATICAL PROPERTIES OF THE GRID

### 6.1 Total System Capacity

For a task with full 10Ã—5 grid utilization:

```
Total capacity = Î£ (capacity at each depth level)
Level 1: 10 subtasks Ã— 512w = 5,120w
Level 2: 10 subtasks Ã— 256w = 2,560w
Level 3: 10 subtasks Ã— 128w = 1,280w
Level 4: 10 subtasks Ã— 64w = 640w
Level 5: 10 subtasks Ã— 32w = 320w
 â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
 Total = 9,920w
vs. Task capacity = 1,024w
```

**Observation:** Total grid capacity (9,920w) >> Task capacity (1,024w)
**Why this works:** Not all cells are used simultaneously. This is **potential capacity**, not **allocated capacity**.
The constraint is:

```
Î£ (actual_word_count of immediate children) â‰¤ parent_capacity
```

### 6.2 Branching Factor Analysis

**Maximum branching factor:** 10 children per node
**Maximum tree depth:** 5 levels
**Maximum total nodes:** 1 + 10 + 100 + 1,000 + 10,000 + 100,000 = 111,111 nodes
**Realistic usage:** ~50 nodes per task (0.045% of maximum)
This provides **massive headroom** for complex hierarchical breakdowns.

### 6.3 Graph-Theoretic Properties

The grid creates a **weighted DAG** with:

```
Vertices (V): All tasks and subtasks
Edges (E): Parent â†’ child containment
Weights (w): Capacity at each vertex
Properties:
1. Acyclic: No subtask can contain its ancestor
2. Weighted: Each vertex has w(v) = 1024 / (2^depth(v))
3. Constraint: Î£ w(children) â‰¤ w(parent) [in practice, not theory]
4. Measurable: Lebesgue measure Î¼(E) quantifies edge density
```

**Why this matters for your role:**
From base lecture Section 7.4 (Borel Relations):

> “Custom field references form Borel-measurable edge relations.”
The grid structure enhances this by making edge weights computable:
> 

```python
def edge_weight(parent, child):
 """Weight = capacity ratio.""" return child.capacity / parent.capacity
# Example:# Parent (512w) â†’ Child (256w)# Weight = 256/512 = 0.5
```

This enables:

- Weighted topological sorting (prioritize high-capacity paths)
- Capacity-aware chromatic coloring (assign more agents to large subtasks)
- Load-balanced work distribution (equalize capacity across agents)

---

## SECTION 7: FUTURE ARCHITECTURAL EXTENSIONS

### 7.1 Dynamic Capacity Rebalancing

**Not yet implemented:**

```python
def rebalance_subtask_capacities(task):
 """Adjust sibling capacities based on actual usage.""" siblings = task.get_children()
 total_capacity = task.capacity
# Calculate usage-weighted allocation usage_weights = [s.current_word_count / s.capacity for s in siblings]
 normalized_weights = [w / sum(usage_weights) for w in usage_weights]
for sibling, weight in zip(siblings, normalized_weights):
 sibling.capacity = total_capacity * weight
 sibling.save()
```

**Use case:** Chapter discovers Scene A needs 700w instead of 512w. Rebalance by taking capacity from underutilized Scene B.

### 7.2 Multi-Project Capacity Sharing

**Not yet implemented:**
Tasks multi-homed across projects could **share capacity budgets**:

```
Task "Policy Analysis" (1024w total):
â”œâ”€ 600w allocated to Project A context
â””â”€ 424w allocated to Project B context
```

**Use case:** Same research, different narrative framings, total word count maintained.

### 7.3 Capacity Overflow Handling

**Not yet implemented:**
What happens when a subtask exceeds capacity?
**Option 1: Hard limit (current)**

- Agent cannot save content exceeding capacity
- Forces decomposition into smaller subtasks
**Option 2: Soft limit with warnings**
- Agent can exceed by <10%, triggers review
- Analyst flagged to assess if decomposition needed
**Option 3: Dynamic parent capacity increase**
- If child exceeds capacity, parent automatically increases
- Cascades up hierarchy to maintain constraint
**Decision:** Currently using Option 1 (hard limit) for simplicity.

---

## CONCLUSION

### What You Now Know (Beyond Base Lecture)

âœ… **Grid capacity model:** 1024-word base, 1/2^n formula, 10Ã—5 structure
âœ… **Multi-homing:** Tasks in multiple projects, AI Rules per project
âœ… **Storage integration:** Version tracking across all project contexts
âœ… **QA integration:** Routing logic, expertise tiers, quality metrics
âœ… **Your metrics:** Capacity utilization, multi-home tracking, cross-system analysis

### Critical Success Factors

1. **Monitor capacity utilization weekly** - Flag underused or overused subtasks
2. **Track multi-homed tasks closely** - Ensure storage captures all contexts
3. **Integrate three metric sources** - Asana + Storage + QA in unified dashboard
4. **Proactively identify bottlenecks** - Don’t wait for system failures
5. **Recommend architectural improvements** - This system evolves based on data
    
    ### Next Steps
    
6. Re-read base onboarding lecture with this appendix in mind
7. Review Appendix A (Storage) and QA Guide in detail
8. Set up your analyst workstation with all three dashboards
9. Shadow a senior analyst for 1 week
10. Take ownership of first weekly report
    
    ### Questions?
    
    **Architectural questions:** Ask Senior Systems Architect
    **Metric questions:** Ask Lead Data Analyst
    **QA questions:** Ask QA Team Lead
    **Capacity questions:** Ask Workflow Optimization Specialist
    **Welcome to the team. You now have the complete picture.**
    

---

*Document version: 1.0Last updated: October 29, 2025Author: Senior Systems ArchitectApplies to: New Analyst Onboarding Lecture v1.0Cross-references: Appendix A (Storage), QA Intervention Guide*