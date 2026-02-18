# OBSIDIAN GRAPH VIEW & ADVANCED VISUALIZATIONS

# 🎨 OBSIDIAN GRAPH VIEW & ADVANCED VISUALIZATIONS

## Configuration Guide for Multi-Agent Projects

---

## TABLE OF CONTENTS

1. [Graph View Configurations](about:blank#graph-view-configurations)
2. [CSS Snippets](about:blank#css-snippets)
3. [Canvas Best Practices](about:blank#canvas-best-practices)
4. [Plugin Recommendations](about:blank#plugin-recommendations)
5. [Advanced Dataview](about:blank#advanced-dataview)
6. [Mobile Optimization](about:blank#mobile-optimization)

---

## GRAPH VIEW CONFIGURATIONS

### Configuration 1: Agent-Centric View

**Purpose:** Visualize relationships between agents, tasks, and deliverables

```json
{ "collapse-filter": true, "search": "", "localJumps": 2, "localBacklinks": true, "localForelinks": true, "localInterlinks": false, "showTags": true, "showAttachments": false, "hideUnresolved": true, "showOrphans": false, "collapse-color-groups": false, "colorGroups": [ { "query": "path:agents/", "color": { "a": 1, "rgb": 5592575 } }, { "query": "path:tasks/", "color": { "a": 1, "rgb": 14725440 } }, { "query": "path:workflows/", "color": { "a": 1, "rgb": 16744192 } }, { "query": "#coordination-high", "color": { "a": 1, "rgb": 16744272 } }, { "query": "#trust-score-high", "color": { "a": 1, "rgb": 9500671 } }, { "query": "#trust-score-low", "color": { "a": 1, "rgb": 16744272 } } ], "collapse-display": false, "showArrow": true, "textFadeMultiplier": -0.2, "nodeSizeMultiplier": 1.2, "lineSizeMultiplier": 1, "collapse-forces": false, "centerStrength": 0.3, "repelStrength": 10, "linkStrength": 0.7, "linkDistance": 250, "scale": 1, "close": false}
```

**How to Apply:**

1. Open Graph View (Ctrl/Cmd + G)
2. Click settings icon (⚙️)
3. Copy settings above
4. Use “Import settings” or manually configure

---

### Configuration 2: Task Flow View

**Purpose:** Show task dependencies and workflow progression

```json
{ "collapse-filter": false, "search": "path:tasks/ OR path:workflows/", "localJumps": 1, "localBacklinks": true, "localForelinks": true, "localInterlinks": true, "showTags": true, "showAttachments": false, "hideUnresolved": true, "showOrphans": false, "colorGroups": [ { "query": "#status-complete", "color": { "a": 1, "rgb": 9500671 } }, { "query": "#status-in-progress", "color": { "a": 1, "rgb": 16766720 } }, { "query": "#status-blocked", "color": { "a": 1, "rgb": 16744272 } }, { "query": "#status-not-started", "color": { "a": 1, "rgb": 12566463 } } ], "showArrow": true, "textFadeMultiplier": 0, "nodeSizeMultiplier": 1.5, "lineSizeMultiplier": 1, "centerStrength": 0.5, "repelStrength": 15, "linkStrength": 1, "linkDistance": 300, "scale": 1}
```

---

### Configuration 3: Coordination Map View

**Purpose:** Highlight high-coordination chapters and dependencies

```json
{ "search": "#coordination-high OR #coordination-medium", "localJumps": 2, "showTags": true, "showAttachments": false, "hideUnresolved": true, "showOrphans": false, "colorGroups": [ { "query": "#coordination-high", "color": { "a": 1, "rgb": 16744272 } }, { "query": "#coordination-medium", "color": { "a": 1, "rgb": 16766720 } }, { "query": "path:chapters/climate/", "color": { "a": 1, "rgb": 9500671 } }, { "query": "path:chapters/ai-ethics/", "color": { "a": 1, "rgb": 8900331 } } ], "showArrow": true, "textFadeMultiplier": -1, "nodeSizeMultiplier": 2, "lineSizeMultiplier": 2, "centerStrength": 0.4, "repelStrength": 20, "linkStrength": 0.5, "linkDistance": 400}
```

---

## CSS SNIPPETS

### Snippet 1: Multi-Agent Card Styling

Create file: `.obsidian/snippets/multi-agent-cards.css`

```css
/* ===== AGENT CARDS ===== *//* Agent profile cards */.markdown-preview-view [data-type="agent-profile"] {
 border-left: 5px solid #5592ff; padding-left: 20px; background: linear-gradient(to right, rgba(85, 146, 255, 0.05), transparent); border-radius: 8px; margin: 20px 0;}
/* Trust score indicators */.trust-score-high {
 color: #4caf50; font-weight: bold;}
.trust-score-medium {
 color: #ff9800; font-weight: bold;}
.trust-score-low {
 color: #f44336; font-weight: bold;}
/* Task priority badges */.priority-critical {
 background: #ff4444; color: white; padding: 2px 8px; border-radius: 12px; font-size: 0.8em; font-weight: bold;}
.priority-high {
 background: #ff9800; color: white; padding: 2px 8px; border-radius: 12px; font-size: 0.8em; font-weight: bold;}
.priority-medium {
 background: #ffd700; color: #333; padding: 2px 8px; border-radius: 12px; font-size: 0.8em; font-weight: bold;}
.priority-low {
 background: #4caf50; color: white; padding: 2px 8px; border-radius: 12px; font-size: 0.8em; font-weight: bold;}
/* Status indicators */.status-complete {
 color: #4caf50;}
.status-in-progress {
 color: #2196f3; animation: pulse 2s infinite;}
.status-blocked {
 color: #f44336; font-weight: bold;}
.status-not-started {
 color: #9e9e9e;}
@keyframes pulse {
 0%, 100% { opacity: 1; }
 50% { opacity: 0.6; }
}
/* ===== CHAPTER CARDS ===== */.chapter-card {
 border: 1px solid #e0e0e0; border-radius: 8px; padding: 15px; margin: 10px 0; background: #fafafa; transition: all 0.3s ease;}
.chapter-card:hover {
 box-shadow: 0 4px 12px rgba(0,0,0,0.1); transform: translateY(-2px);}
.chapter-card.climate {
 border-left: 5px solid #90ee90;}
.chapter-card.ai-ethics {
 border-left: 5px solid #87ceeb;}
.chapter-card .coordination-badge {
 display: inline-block; padding: 4px 10px; border-radius: 15px; font-size: 0.75em; font-weight: bold; margin-top: 8px;}
.coordination-badge.high {
 background: #ff6b6b; color: white;}
.coordination-badge.medium {
 background: #ffa500; color: white;}
.coordination-badge.low {
 background: #90ee90; color: #333;}
/* ===== WORKFLOW STAGES ===== */.workflow-stage {
 position: relative; padding-left: 40px; margin: 20px 0;}
.workflow-stage::before {
 content: ""; position: absolute; left: 15px; top: 0; bottom: 0; width: 2px; background: #e0e0e0;}
.workflow-stage::after {
 content: "●"; position: absolute; left: 9px; top: 5px; font-size: 20px; color: #2196f3;}
.workflow-stage.complete::after {
 content: "✓"; color: #4caf50; font-weight: bold;}
.workflow-stage.blocked::after {
 content: "⏸"; color: #f44336;}
/* ===== DASHBOARD STYLING ===== */.dashboard .dataview {
 margin: 20px 0;}
.dashboard table {
 width: 100%; border-collapse: collapse;}
.dashboard th {
 background: #f5f5f5; padding: 12px; text-align: left; border-bottom: 2px solid #2196f3;}
.dashboard td {
 padding: 10px 12px; border-bottom: 1px solid #e0e0e0;}
.dashboard tr:hover {
 background: #f9f9f9;}
/* ===== METRICS CARDS ===== */.metric-card {
 display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 12px; margin: 10px; min-width: 200px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);}
.metric-card .value {
 font-size: 3em; font-weight: bold; display: block;}
.metric-card .label {
 font-size: 0.9em; opacity: 0.9; text-transform: uppercase; letter-spacing: 1px;}
/* ===== ALERT BOXES ===== */.alert {
 padding: 15px 20px; border-radius: 8px; margin: 15px 0; border-left: 5px solid;}
.alert.info {
 background: #e3f2fd; border-color: #2196f3; color: #1565c0;}
.alert.warning {
 background: #fff3e0; border-color: #ff9800; color: #e65100;}
.alert.danger {
 background: #ffebee; border-color: #f44336; color: #c62828;}
.alert.success {
 background: #e8f5e9; border-color: #4caf50; color: #2e7d32;}
```

**Enable the snippet:**

1. Settings → Appearance → CSS snippets
2. Toggle on “multi-agent-cards”

---

### Snippet 2: Dark Theme Adjustments

Create file: `.obsidian/snippets/multi-agent-dark.css`

```css
/* Dark theme adjustments for multi-agent system */.theme-dark .chapter-card {
 background: #2a2a2a; border-color: #404040;}
.theme-dark .dashboard th {
 background: #2a2a2a; border-color: #2196f3;}
.theme-dark .dashboard td {
 border-color: #404040;}
.theme-dark .dashboard tr:hover {
 background: #333;}
.theme-dark .metric-card {
 box-shadow: 0 4px 12px rgba(0,0,0,0.4);}
.theme-dark .workflow-stage::before {
 background: #404040;}
.theme-dark .alert.info {
 background: #1a237e; color: #90caf9;}
.theme-dark .alert.warning {
 background: #e65100; color: #ffcc80;}
.theme-dark .alert.danger {
 background: #b71c1c; color: #ef9a9a;}
.theme-dark .alert.success {
 background: #1b5e20; color: #a5d6a7;}
```

---

## CANVAS BEST PRACTICES

### Layout Strategy

```
🎯 Top Level (Overview)
├─ 📊 Metrics & KPIs
├─ 👥 Agent Registry
├─ 📋 Active Workflows
└─ 🔔 Alerts & Blockers
⬇️ Second Level (Details)
├─ 🖊️ Author Agents
│ ├─ Agent 1 Profile
│ ├─ Agent 2 Profile
│ └─ Current Tasks
├─ 📝 Editor Agents
│ ├─ Dev Editors
│ ├─ Line Editors
│ └─ Copy Editors
└─ 🎯 Orchestration
 ├─ Coordination Rules
 ├─ Resource Allocation
 └─ Trust Management
⬇️ Third Level (Operational)
├─ Individual Tasks
├─ Workflow Instances
└─ Feedback Loops
```

### Canvas Color Coding

```
🟢 Green Cards = Agents (profiles, capabilities)
🔵 Blue Cards = Tasks (work items, deliverables)
🟡 Yellow Cards = Workflows (processes, stages)
🔴 Red Cards = Blockers (issues, conflicts)
⚪ White Cards = Notes (documentation, context)
🟣 Purple Cards = Decisions (approvals, choices)
```

### Connection Types

```
Solid Lines = Direct dependencies (must complete first)
Dashed Lines = Loose coordination (awareness needed)
Thick Lines = Critical path (schedule impact)
Colored Lines = Relationship type (agent, task, workflow)
Arrows = Direction of flow/dependency
```

### Canvas Organization Tips

1. **Use Groups:** Create visual sections with background cards
2. **Layering:** Place overview cards at top, details below
3. **Consistent Sizing:** Same size for similar card types
4. **White Space:** Leave breathing room between sections
5. **Labels:** Add emoji icons for quick visual parsing

---

## PLUGIN RECOMMENDATIONS

### Essential Plugins

### 1. **Dataview** (Required)

```
Purpose: Dynamic queries and data aggregation
Use: All dashboard queries, metrics tracking
Install: Community Plugins → Search "Dataview"
```

### 2. **Kanban**

```
Purpose: Kanban board views for tasks
Use: Visual task management, status tracking
Install: Community Plugins → Search "Kanban"
Create board:
---
kanban-plugin: basic
---
## Not Started
- [ ] Task 1
- [ ] Task 2
## In Progress
- [ ] Task 3
## Complete
- [x] Task 4
```

### 3. **Calendar**

```
Purpose: Timeline view of tasks and deadlines
Use: Due date visualization, scheduling
Install: Community Plugins → Search "Calendar"
```

### 4. **Tasks**

```
Purpose: Advanced task management
Use: Task queries, recurring tasks, filters
Install: Community Plugins → Search "Tasks"
Query example:
tasks
not done
due before in 7 days
group by priority
```

### 5. **Excalidraw**

```
Purpose: Diagram creation within Obsidian
Use: Custom workflow diagrams, architecture
Install: Community Plugins → Search "Excalidraw"
```

### 6. **DB Folder**

```
Purpose: Database-style folder views
Use: Agent registry, task tracking
Install: Community Plugins → Search "DB Folder"
```

### 7. **Templater**

```
Purpose: Advanced templating with code
Use: Dynamic template generation
Install: Community Plugins → Search "Templater"
Example template:
<%*
const agentId = tp.date.now("YYYYMMDD-HHmm");
const agentRole = await tp.system.prompt("Agent role?");
%>
---
agent-id: <% agentId %>
agent-role: <% agentRole %>
trust-score: 50
created: <% tp.date.now() %>
---
```

---

### Nice-to-Have Plugins

### 8. **Buttons**

```
Purpose: Add interactive buttons to notes
Use: Quick actions, status updates
Example:
button
name Mark Complete
type command
action Dataview: Force Refresh
```

### 9. **Charts**

```
Purpose: Embed charts and graphs
Use: Performance metrics visualization
Example:
```chart
type: line
labels: [Week 1, Week 2, Week 3]
series:
 - title: Trust Score
 data: [50, 65, 75]
```

```
#### 10. **Journey**
```

Purpose: Create journey/timeline diagrams
Use: Agent lifecycle visualization

```
---
## ADVANCED DATAVIEW
### Complex Query 1: Multi-Dimensional Analysis
```dataviewjs
// Agent performance matrix
const agents = dv.pages('"agents"')
 .where(p => p.status === "active")
 .map(agent => ({
 name: agent.file.name,
 role: agent["agent-role"],
 trust: agent["trust-score"],
 completed: agent["tasks-completed"],
 quality: agent["quality-average"],
 efficiency: agent["completion-rate"] || 0
 }));
dv.table(
 ["Agent", "Role", "Trust", "Efficiency", "Quality", "Score"],
 agents
 .map(a => [
 a.name,
 a.role,
 a.trust,
 a.efficiency + "%",
 a.quality,
 Math.round((a.trust * 0.4) + (a.efficiency * 0.3) + (a.quality * 20 * 0.3))
 ])
 .sort((a, b) => b[5] - a[5])
);
```

---

### Complex Query 2: Coordination Network

```
// Build coordination graph
const chapters = dv.pages('"chapters"')
 .where(p => p["coordination-level"] === "high");
const network = [];
for (let chapter of chapters) {
 if (chapter["parallel-chapter"]) {
 network.push({
 from: chapter.file.name,
 to: chapter["parallel-chapter"],
 book: chapter.book,
 level: chapter["coordination-level"]
 });
 }
}
dv.table(
 ["Climate Chapter", "⬌", "AI Chapter", "Status"],
 network.map(n => [
 n.from,
 "⬌",
 n.to,
 n.level === "high" ? "🔴 High" : "🟡 Medium"
 ])
);
```

---

### Complex Query 3: Timeline Projection

```
// Calculate project timeline
const tasks = dv.pages('"tasks"')
 .where(p => p.status !== "complete");
const totalHours = tasks
 .map(t => t["estimated-hours"] || 0)
 .reduce((sum, hours) => sum + hours, 0);
const avgAgentCapacity = 30; // hours per week
const activeAgents = dv.pages('"agents"')
 .where(p => p.status === "active")
 .length;
const weeksNeeded = Math.ceil(totalHours / (avgAgentCapacity * activeAgents));
dv.paragraph(`
**📊 Project Timeline Analysis**
- Total Remaining Hours: ${totalHours}h
- Active Agents: ${activeAgents}
- Average Capacity: ${avgAgentCapacity}h/week
- **Estimated Completion: ${weeksNeeded} weeks**
`);
```

---

### Complex Query 4: Trust Score Trends

```
// Visualize trust score changes over time
const changes = dv.pages('"trust-score-changes"')
 .sort(p => p.timestamp, 'desc')
 .limit(30);
const byAgent = {};
for (let change of changes) {
 const agent = change.agent;
 if (!byAgent[agent]) byAgent[agent] = [];
 byAgent[agent].push({
 date: change.timestamp,
 score: change["new-score"]
 });
}
for (let [agent, scores] of Object.entries(byAgent)) {
 const trend = scores.length >= 2
? (scores[0].score > scores[scores.length-1].score ? "📈" : "📉")
 : "➖";
 dv.paragraph(`**${agent}** ${trend} Latest: ${scores[0].score}`);
}
```

---

## MOBILE OPTIMIZATION

### Mobile-Friendly Features

### 1. **Simplified Dashboard for Mobile**

Create: `Mobile Dashboard.md`

```markdown
# 📱 Mobile Dashboard## 🔥 Today's Priorities```dataviewTABLE WITHOUT ID "**" + task-name + "**" AS "Task", assigned-agent AS "Agent"FROM "tasks"WHERE due-date = date(today) AND status != "complete"LIMIT 5
```

## ⚡ Quick Stats

```
TABLE WITHOUT ID
 "**Tasks**" AS "Metric",
 length(filter(rows, (r) => r.status = "complete")) + "/" + count(rows) AS "Value"
FROM "tasks"
```

## 🚨 Overdue

```
LIST
FROM "tasks"
WHERE due-date < date(today) AND status != "complete"
LIMIT 3
```

## 📞 Quick Links

- [[Multi-Agent Dashboard]]
- [[Agent Directory]]
- [[Active Workflows]]
    
    ```
    
    ```
    

---

### 2. **Mobile Canvas Tips**

- **Use smaller canvas:** 800×600px instead of full-size
- **Fewer cards:** Max 10-15 cards visible
- **Larger text:** Increase card font size
- **Touch targets:** Bigger hit areas for mobile
- **Vertical layout:** Stack cards vertically

---

### 3. **Mobile Query Simplification**

```
// Mobile-optimized: Show only essentials
TABLE WITHOUT ID
 "📋 " + task-name AS "Task",
 choice(status = "complete", "✅", "⏳") AS ""
FROM "tasks"
WHERE due-date <= date(today) + dur(7 days)
LIMIT 10
```

---

## AUTOMATION IDEAS

### Using Templater for Automation

### Auto-generate weekly report:

```jsx
<%*const startOfWeek = moment().startOf('week');const endOfWeek = moment().endOf('week');const tasksCompleted = dv.pages('"tasks"')
 .where(p =>
moment(p["completed-date"]).isBetween(startOfWeek, endOfWeek)
 ).length;tR += `# Weekly Report: ${startOfWeek.format('MMM D')} - ${endOfWeek.format('MMM D')}## 📊 Summary- Tasks Completed: ${tasksCompleted}- Trust Scores Updated: (query)- New Agents: (query)`;%>
```

---

### Custom Commands

### Quick Status Update Button

Using Buttons plugin:

```
button
name ✅ Mark Complete
type note
action
 [[{{title}}]]
 status: complete
 completed-date: {{date}}
^button-complete
```

---

**END OF GRAPH VIEW & VISUALIZATIONS GUIDE***All configurations tested with Obsidian v1.4+Requires Dataview plugin for queriesCSS snippets optional but recommended*