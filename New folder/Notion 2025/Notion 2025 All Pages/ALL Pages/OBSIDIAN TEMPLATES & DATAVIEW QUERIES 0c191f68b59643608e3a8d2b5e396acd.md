# OBSIDIAN TEMPLATES & DATAVIEW QUERIES

# 📝 OBSIDIAN TEMPLATES & DATAVIEW QUERIES

## For Multi-Agent Project Management

---

## TABLE OF CONTENTS

1. [Agent Profile Templates](about:blank#agent-profile-templates)
2. [Task Templates](about:blank#task-templates)
3. [Workflow Templates](about:blank#workflow-templates)
4. [Dataview Queries](about:blank#dataview-queries)
5. [Dashboard Setup](about:blank#dashboard-setup)
6. [Quick Capture Templates](about:blank#quick-capture-templates)

---

## AGENT PROFILE TEMPLATES

### Template: Agent Profile

```markdown
---type: agent-profileagent-id: "{{agent_id}}"agent-role: "{{role}}"trust-score: 50completion-rate: 0quality-average: 0tasks-completed: 0tasks-assigned: 0status: activespecializations: []created: {{date}}last-updated: {{date}}---# 🤖 {{agent_name}}## Basic Information**Role:** {{role}}
**Agent ID:** {{agent_id}}
**Status:** 🟢 Active
**Trust Level:** Starting (50/100)
## Performance Metrics| Metric | Value | Target ||--------|-------|--------|| Trust Score | 50 | 75+ || Completion Rate | 0% | 90%+ || Quality Average | N/A | 4.0+ || Tasks Completed | 0 | - || On-Time Delivery | N/A | 85%+ |## Specializations- [ ] Content Generation
- [ ] Technical Writing
- [ ] Structural Editing
- [ ] Copy Editing
- [ ] Quality Assurance
- [ ] Coordination
## Current Assignments```dataviewTABLE task-name AS "Task", status AS "Status", due-date AS "Due", priority AS "Priority"FROM "tasks"WHERE assigned-agent = "{{agent_id}}" AND status != "complete"SORT priority DESC, due-date ASC
```

## Recent Completions

```
TABLE
 task-name AS "Task",
 completed-date AS "Completed",
 quality-rating AS "Quality",
 revision-count AS "Revisions"
FROM "tasks"
WHERE assigned-agent = "{{agent_id}}" AND status = "complete"
SORT completed-date DESC
LIMIT 10
```

## Trust Score History

```
LIST
FROM "audit-logs"
WHERE agent = "{{agent_id}}" AND event-type = "trust-score-change"
SORT timestamp DESC
LIMIT 5
```

## Skills & Capabilities

### Core Competencies

- Training Completed
- Certifications
- Notes & Observations
    
    ### Strengths
    
- Areas for Improvement
- Recent Feedback
- Escalations & Issues
    
    ```
    TABLE
    issue-description AS "Issue",
    severity AS "Severity",
    status AS "Status",
    created-date AS "Date"
    FROM "issues"
    WHERE related-agent = "{{agent_id}}"
    SORT created-date DESC
    ```
    

---

## Action Items

- [ ]  Review performance metrics
- [ ]  Update trust score
- [ ]  Assign new tasks
- [ ]  Provide feedback
    
    ## Related
    
- [[Agent Coordination Policy]]
- [[Trust Score Calculation]]
- [[Role Definitions]]
    
    ```
    
    ```
    

---

### Template: Author Agent Profile

```markdown
---type: agent-profileagent-role: authorspecialization: "{{fiction|non-fiction|technical}}"genre-expertise: []trust-score: 50writing-style: "{{style}}"avg-words-per-day: 0preferred-chapters: []---# 🖊️ {{agent_name}} - Author Agent## Writing Profile**Specialization:** {{specialization}}
**Genres:** {{genres}}
**Style:** {{style}}
**Experience Level:** {{level}}
## Writing Statistics- **Total Words Written:** 0
- **Chapters Completed:** 0
- **Average Daily Output:** 0 words
- **Longest Chapter:** 0 words
- **Revision Rate:** N/A
## Current Projects```dataviewTABLE chapter-title AS "Chapter", word-count AS "Words", target-words AS "Target", progress AS "Progress"FROM "chapters"WHERE author = "{{agent_id}}" AND status = "drafting"
```

## Writing Schedule

| Day | Time Block | Capacity |
| --- | --- | --- |
| Monday | 9am-12pm | 1500 words |
| Tuesday | 9am-12pm | 1500 words |
| Wednesday | 9am-12pm | 1500 words |
| Thursday | 9am-12pm | 1500 words |
| Friday | 9am-12pm | 1500 words |

## Quality Feedback

```
TABLE
 feedback-from AS "Reviewer",
 rating AS "Rating",
 key-points AS "Feedback",
 chapter AS "Chapter"
FROM "feedback"
WHERE feedback-to = "{{agent_id}}"
SORT date DESC
LIMIT 5
```

## Collaboration Notes

### Works Well With

- Coordination Preferences
- 

---

**Last Updated:** {{date}}

```
---
### Template: Editor Agent Profile
```markdown
---
type: agent-profile
agent-role: editor
editor-type: "{{dev|line|copy}}"
specialization: []
trust-score: 55
avg-review-time: 0
feedback-quality: 0
---
# 📝 {{agent_name}} - Editor Agent
## Editorial Profile
**Editor Type:** {{editor-type}}
**Focus Areas:** {{focus}}
**Review Style:** {{style}}
## Editing Statistics
- **Manuscripts Reviewed:** 0
- **Average Review Time:** N/A
- **Feedback Quality Score:** N/A
- **Approval Rate:** N/A
- **Consistency Score:** N/A
## Style Guide Compliance
- [ ] Grammar rules
- [ ] Formatting standards
- [ ] Genre conventions
- [ ] Publisher requirements
## Current Review Queue
```dataview
TABLE
 manuscript-title AS "Manuscript",
 assigned-date AS "Assigned",
 due-date AS "Due",
 priority AS "Priority"
FROM "editing-tasks"
WHERE editor = "{{agent_id}}" AND status = "in-review"
SORT priority DESC, due-date ASC
```

## Review Checklist Template

### Developmental Edit

- [ ]  Plot coherence
- [ ]  Character development
- [ ]  Pacing analysis
- [ ]  Structure assessment
- [ ]  Thematic consistency
    
    ### Line Edit
    
- [ ]  Sentence quality
- [ ]  Voice consistency
- [ ]  Prose refinement
- [ ]  Flow and rhythm
- [ ]  Word choice
    
    ### Copy Edit
    
- [ ]  Grammar
- [ ]  Spelling
- [ ]  Punctuation
- [ ]  Style guide compliance
- [ ]  Consistency
    
    ## Feedback Templates
    
    ### Standard Feedback
    
    ```
    Chapter: {{chapter}}
    Overall Quality: {{1-5}}
    Strengths:
    
- Areas for Improvement:
- Specific Issues:
- Line X: {{issue}}
Recommendation: {{approve|revise|reject}}
    
    ```
    
    ```
    

---

**Last Updated:** {{date}}

```
---
## TASK TEMPLATES
### Template: Task Card
```markdown
---
type: task
task-id: "{{task_id}}"
task-name: "{{name}}"
status: not-started
priority: medium
assigned-agent: ""
created-date: {{date}}
due-date:
started-date:
completed-date:
estimated-hours: 0
actual-hours: 0
dependencies: []
blocks: []
coordination-required: false
---
# 📋 {{task_name}}
## Task Details
**ID:** {{task_id}}
**Status:** 📝 Not Started
**Priority:** 🟡 Medium
**Assigned To:** [[{{agent}}]]
**Created:** {{created-date}}
**Due:** {{due-date}}
## Description
{{description}}
## Acceptance Criteria
- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3
## Dependencies
**Blocked By:**
```dataview
LIST
FROM "tasks"
WHERE contains(blocks, "{{task_id}}")
```

**Blocks:**

```
LIST
FROM "tasks"
WHERE contains(dependencies, "{{task_id}}")
```

## Time Tracking

- **Estimated:** {{est}} hours
- **Actual:** {{actual}} hours
- **Variance:** {{variance}} hours
    
    ## Progress Notes
    
    ### {{date}}
    

## Quality Checks

- [ ]  Requirements met
- [ ]  Code reviewed
- [ ]  Tests passing
- [ ]  Documentation updated
- [ ]  Approved by reviewer
    
    ## Attachments
    

## Related

- [[Project Plan]]
- [[{{agent}}]]
- [[Coordination Policy]]

---

**Last Updated:** {{date}}

```
---
### Template: Chapter Task
```markdown
---
type: chapter-task
chapter-number: {{num}}
chapter-title: "{{title}}"
book: "{{book}}"
part: {{part}}
status: not-started
author: ""
word-count: 0
target-words: 2500
coordination-level: none
parallel-chapter: ""
revision-cycle: 0
---
# 📖 Chapter {{num}}: {{title}}
## Chapter Info
**Book:** [[{{book}}]]
**Part:** {{part}}
**Status:** 📝 Not Started
**Author:** [[{{author}}]]
**Coordination:** {{level}}
## Writing Progress
| Metric | Current | Target | % Complete |
|--------|---------|--------|------------|
| Words | 0 | 2500 | 0% |
| Scenes | 0 | 5 | 0% |
| Revision | 0 | - | - |
## Outline
### Scene 1
**Purpose:**
**Characters:**
**Location:**
### Scene 2
**Purpose:**
**Characters:**
**Location:**
### Scene 3
**Purpose:**
**Characters:**
**Location:**
## Coordination Notes
**Parallel Chapter:** [[{{parallel}}]]
**Coordination Required:** {{required}}
**Sync Points:**
-
## Editorial Phases
- [ ] Draft Complete
- [ ] Dev Edit Complete
- [ ] Line Edit Complete
- [ ] Copy Edit Complete
- [ ] Proofread Complete
## Editorial Feedback
```dataview
TABLE
 editor AS "Editor",
 edit-type AS "Type",
 rating AS "Rating",
 status AS "Status"
FROM "editorial-reviews"
WHERE chapter = "{{chapter_id}}"
SORT date DESC
```

## Reader Feedback

```
TABLE
 reader-type AS "Reader",
 rating AS "Rating",
 key-feedback AS "Feedback"
FROM "reader-feedback"
WHERE chapter = "{{chapter_id}}"
SORT date DESC
```

## Manuscript Versions

- v1.0 - {{date}} - Initial draft
- 

---

**Last Updated:** {{date}}

```
---
## WORKFLOW TEMPLATES
### Template: Sequential Workflow
```markdown
---
type: workflow
workflow-name: "Sequential Chapter Production"
pattern: sequential
stages: 5
---
# 🔄 Sequential Workflow: {{chapter}}
## Workflow Stages
### Stage 1: Drafting
**Status:** ⏳ Current
**Assigned:** [[{{author}}]]
**Started:** {{date}}
**Due:** {{date}}
**Deliverable:** 2,500-word chapter draft
**Dependencies:** None
**Blocks:** Stage 2
---
### Stage 2: Developmental Edit
**Status:** 🔒 Blocked
**Assigned:** [[{{dev-editor}}]]
**Estimated Start:** {{date}}
**Due:** {{date}}
**Deliverable:** Structural feedback and recommendations
**Dependencies:** Stage 1
**Blocks:** Stage 3
---
### Stage 3: Line Edit
**Status:** 🔒 Blocked
**Assigned:** [[{{line-editor}}]]
**Estimated Start:** {{date}}
**Due:** {{date}}
**Deliverable:** Sentence-level refinements
**Dependencies:** Stage 2
**Blocks:** Stage 4
---
### Stage 4: Copy Edit
**Status:** 🔒 Blocked
**Assigned:** [[{{copy-editor}}]]
**Estimated Start:** {{date}}
**Due:** {{date}}
**Deliverable:** Grammar and style corrections
**Dependencies:** Stage 3
**Blocks:** Stage 5
---
### Stage 5: Final Approval
**Status:** 🔒 Blocked
**Assigned:** [[{{inspector}}]]
**Estimated Start:** {{date}}
**Due:** {{date}}
**Deliverable:** Quality gate approval (3-of-4 votes)
**Dependencies:** Stage 4
**Blocks:** Publication
---
## Progress Tracking
```dataview
TABLE
 stage AS "Stage",
 status AS "Status",
 assigned AS "Agent",
 completion AS "% Done"
FROM "workflow-stages"
WHERE workflow-id = "{{workflow_id}}"
SORT stage ASC
```

## Timeline Visualization

```mermaid
gantt
 title Chapter Production Timeline
 dateFormat YYYY-MM-DD

section Drafting
 Write Chapter :a1, {{start}}, 7d

section Dev Edit
 Review Structure :a2, after a1, 3d

section Line Edit
 Refine Prose :a3, after a2, 2d

section Copy Edit
 Grammar Check :a4, after a3, 2d

section Approval
 Quality Gate :a5, after a4, 1d
```

## Handoff Protocol

When completing each stage, follow I-PASS:

- **I**llness Severity: Project status
- **P**atient Summary: Context
- **A**ction List: Next steps
- **S**ituation Awareness: Risks
- **S**ynthesis: Confirm understanding

---

**Last Updated:** {{date}}

```
---
## DATAVIEW QUERIES
### Query 1: Agent Performance Dashboard
```dataview
TABLE
 agent-role AS "Role",
 trust-score AS "Trust",
 completion-rate + "%" AS "Completion",
 quality-average AS "Quality",
 tasks-completed AS "Completed"
FROM "agents"
WHERE status = "active"
SORT trust-score DESC
```

---

### Query 2: High-Priority Tasks

```
TABLE
 task-name AS "Task",
 assigned-agent AS "Agent",
 priority AS "Priority",
 due-date AS "Due",
 status AS "Status"
FROM "tasks"
WHERE priority = "high" OR priority = "critical"
WHERE status != "complete"
SORT priority DESC, due-date ASC
```

---

### Query 3: Tasks by Status

```
TABLE
 task-name AS "Task",
 assigned-agent AS "Agent",
 started-date AS "Started",
 estimated-hours + "h" AS "Est Time"
FROM "tasks"
WHERE status = "in-progress"
SORT started-date ASC
```

---

### Query 4: Coordination Required

```
TABLE
 chapter-title AS "Chapter",
 book AS "Book",
 parallel-chapter AS "Parallel To",
 coordination-level AS "Level",
 status AS "Status"
FROM "chapters"
WHERE coordination-level = "high" OR coordination-level = "medium"
SORT coordination-level DESC, chapter-number ASC
```

---

### Query 5: Overdue Tasks

```
TABLE
 task-name AS "Task",
 assigned-agent AS "Agent",
 due-date AS "Due",
 dateformat(date(today) - due-date) + " overdue" AS "Status"
FROM "tasks"
WHERE due-date < date(today) AND status != "complete"
SORT due-date ASC
```

---

### Query 6: Agent Workload

```
TABLE
 assigned-agent AS "Agent",
 count(rows) AS "Active Tasks",
 sum(estimated-hours) + "h" AS "Total Hours",
 choice(sum(estimated-hours) > 40, "🔴 Overloaded", choice(sum(estimated-hours) > 30, "🟡 High", "🟢 Normal")) AS "Load"
FROM "tasks"
WHERE status != "complete"
GROUP BY assigned-agent
SORT sum(estimated-hours) DESC
```

---

### Query 7: Completion Rate by Agent

```
TABLE
 agent-role AS "Role",
 tasks-completed AS "Completed",
 tasks-assigned AS "Assigned",
 round((tasks-completed / tasks-assigned) * 100) + "%" AS "Rate"
FROM "agents"
WHERE tasks-assigned > 0
SORT round((tasks-completed / tasks-assigned) * 100) DESC
```

---

### Query 8: Quality Ratings Distribution

```
TABLE
 assigned-agent AS "Agent",
 avg(quality-rating) AS "Avg Quality",
 count(rows) AS "Reviews",
 choice(avg(quality-rating) >= 4.5, "⭐⭐⭐⭐⭐", choice(avg(quality-rating) >= 4, "⭐⭐⭐⭐", choice(avg(quality-rating) >= 3, "⭐⭐⭐", "⭐⭐"))) AS "Rating"
FROM "editorial-reviews"
GROUP BY assigned-agent
SORT avg(quality-rating) DESC
```

---

### Query 9: Trust Score Evolution

```
TABLE
 agent AS "Agent",
 old-score AS "Previous",
 new-score AS "Current",
 (new-score - old-score) AS "Change",
 reason AS "Reason",
 timestamp AS "Date"
FROM "trust-score-changes"
SORT timestamp DESC
LIMIT 20
```

---

### Query 10: Blocked Tasks

```
TABLE
 task-name AS "Task",
 assigned-agent AS "Agent",
 dependencies AS "Waiting On",
 days-blocked AS "Days Blocked"
FROM "tasks"
WHERE status = "blocked"
SORT days-blocked DESC
```

---

### Query 11: Chapter Progress by Book

```
TABLE
 chapter-number AS "#",
 chapter-title AS "Title",
 status AS "Status",
 word-count + "/" + target-words AS "Words",
 round((word-count / target-words) * 100) + "%" AS "Progress"
FROM "chapters"
WHERE book = "Climate Book"
SORT chapter-number ASC
```

---

### Query 12: Upcoming Deadlines (7 Days)

```
TABLE
 task-name AS "Task",
 assigned-agent AS "Agent",
 due-date AS "Due",
 dateformat(due-date - date(today)) + " days" AS "Time Left"
FROM "tasks"
WHERE due-date >= date(today) AND due-date <= date(today) + dur(7 days) AND status != "complete"
SORT due-date ASC
```

---

## DASHBOARD SETUP

### Main Project Dashboard

Create a file: `Multi-Agent Dashboard.md`

```markdown
---cssclass: dashboard---# 🤖 MULTI-AGENT PROJECT DASHBOARD## 📊 Key Metrics### Agent Performance```dataviewTABLE WITHOUT ID "**" + agent-role + "**" AS "Role", trust-score AS "Trust", tasks-completed + "/" + tasks-assigned AS "Tasks", quality-average AS "Quality"FROM "agents"WHERE status = "active"SORT trust-score DESCLIMIT 6
```

### Active Tasks by Status

```
TABLE WITHOUT ID
 "**" + choice(status = "in-progress", "🟢 In Progress", choice(status = "blocked", "🔴 Blocked", choice(status = "not-started", "⚪ Not Started", "🟡 " + status))) + "**" AS "Status",
 count(rows) AS "Count"
FROM "tasks"
WHERE status != "complete"
GROUP BY status
```

## 🔥 Critical Items

### High Priority Tasks

```
TABLE
 task-name AS "Task",
 assigned-agent AS "Agent",
 due-date AS "Due"
FROM "tasks"
WHERE priority = "critical" AND status != "complete"
SORT due-date ASC
LIMIT 5
```

### Overdue Tasks

```
TABLE
 task-name AS "Task",
 assigned-agent AS "Agent",
 days-overdue + " days" AS "Overdue"
FROM "tasks"
WHERE due-date < date(today) AND status != "complete"
SORT due-date ASC
```

## 📈 Progress Tracking

### Chapters by Status

```
TABLE WITHOUT ID
 book AS "Book",
 count(rows) AS "Total",
 length(filter(rows, (r) => r.status = "complete")) AS "Complete",
 round((length(filter(rows, (r) => r.status = "complete")) / count(rows)) * 100) + "%" AS "% Done"
FROM "chapters"
GROUP BY book
```

### Word Count Progress

```
TABLE WITHOUT ID
 book AS "Book",
 sum(word-count) AS "Current Words",
 sum(target-words) AS "Target Words",
 round((sum(word-count) / sum(target-words)) * 100) + "%" AS "Progress"
FROM "chapters"
GROUP BY book
```

## 🤝 Coordination Status

### High Coordination Chapters

```
TABLE
 chapter-title AS "Chapter",
 parallel-chapter AS "Parallel",
 status AS "Status",
 author AS "Author"
FROM "chapters"
WHERE coordination-level = "high"
SORT chapter-number ASC
```

## 📅 This Week

### Due This Week

```
TABLE
 task-name AS "Task",
 assigned-agent AS "Agent",
 due-date AS "Due"
FROM "tasks"
WHERE due-date >= date(today) AND due-date <= date(today) + dur(7 days)
WHERE status != "complete"
SORT due-date ASC
```

## 🔔 Alerts

### Agents Needing Attention

```
TABLE
 agent-role AS "Agent",
 trust-score AS "Trust",
 reason AS "Issue"
FROM "agents"
WHERE trust-score < 50 OR completion-rate < 70
```

### Tasks Blocked >3 Days

```
TABLE
 task-name AS "Task",
 assigned-agent AS "Agent",
 days-blocked AS "Days"
FROM "tasks"
WHERE status = "blocked" AND days-blocked > 3
SORT days-blocked DESC
```

---

**Last Updated:** `= date(today)`**Auto-refreshes** when you open this note

```
---
## QUICK CAPTURE TEMPLATES
### Quick Task Capture
```markdown
---
type: quick-task
created: {{date}}
---
## ⚡ Quick Task
**What:**
**Who:**
**When:**
**Priority:**
---
*Process this into full task template*
```

---

### Quick Note Capture

```markdown
---type: quick-notecreated: {{date}}tags: [inbox]---## 📝 Quick Note{{content}}
---
*File appropriately later*
```

---

### Feedback Template

```markdown
---type: feedbackfrom: {{reviewer}}to: {{recipient}}date: {{date}}chapter: {{chapter}}---## 💬 Feedback: {{chapter}}**From:** [[{{reviewer}}]]
**To:** [[{{recipient}}]]
**Type:** {{dev-edit|line-edit|copy-edit|general}}
### Overall Rating⭐⭐⭐⭐⭐ ({{rating}}/5)
### Strengths-### Areas for Improvement-### Specific Issues- **Line X:**
### Recommendation- [ ] Approve
- [ ] Revise and resubmit
- [ ] Major revisions needed
---
**Next Steps:**
-
```

---

**END OF TEMPLATES & QUERIES***Copy these templates to your Obsidian vault’s Templates folderQueries work with Dataview plugin - install from Community Plugins*