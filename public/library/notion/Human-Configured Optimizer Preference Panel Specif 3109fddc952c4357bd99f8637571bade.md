# Human-Configured Optimizer: Preference Panel Specification

# Human Expert Intervention Architecture for Severity-Weighted Optimization

**Multi-Tier QA System with Intelligent Routing**

**Version:** 2.0 • **Date:** 2025-11-08 • **Owner:** Mohsen Dirbaz

**System Philosophy:** Human expertise deployed only where it delivers disproportionate value. AI agents handle first-pass analysis, flag issues, and route decisions to appropriate expertise tiers based on complexity and impact.

**Upstream alignment:** [Optimization Algorithm: Leaving no stone unturned](Optimization%20Algorithm%20Leaving%20no%20stone%20unturned%2037eba36a007a4120a87b9fef49f28bc8.md) and subpages.

**Integration sources:** Expert intervention patterns from multi-agent book writing QA systems adapted for linguistic measure optimization.

---

## Executive Summary

This architecture defines **where, when, and how** human experts intervene in the severity-weighted optimization system for linguistic measure selection. Rather than prompt-based configuration, the system uses **intelligent pre-screening** to route decisions to the optimal combination of AI agents, specialist humans, and expert humans.

**Core Innovation:** AI agents perform first-pass analysis and generate preliminary scores. Only when scores fall below thresholds or conflicts arise does the system route to human expertise—and even then, only to the appropriate tier (mediocre human, specialist, or expert).

**Resource Optimization:** 80% of expert time spent on high-leverage decisions (Tier 1: deficiency severity assignment, measure selection conflicts, strategic trade-offs), 15% on specialized review (Tier 2: category balance validation, redundancy policy tuning), 5% on edge cases (Tier 3: routine approval), 0% on automation-suitable tasks (Tier 4: score calculations, coverage tracking).

---

## Part 1: Intervention Tier Taxonomy

### TIER 1: EXPERT-ONLY ZONES (Irreplaceable Judgment)

**Required Expertise:** 10,000+ hours in linguistic analysis, developmental editing, or quality assurance. Expert judgment provides 40-80% quality improvement over mediocre humans or AI-only approaches.

### 1.1 DEFICIENCY SEVERITY ASSIGNMENT

**Location in System:** Diagnosis phase → Severity validation gate

**What It Is:**

- Distinguishing critical vs. high vs. medium vs. low severity deficiencies
- Assessing reader comprehension impact (does this deficiency break understanding?)
- Evaluating genre/context appropriateness (academic vs. creative writing standards)
- Judgment calls on borderline cases (is this "medium" or "high"?)

**Why Expert Matters:**

- Requires deep understanding of reader cognition and comprehension failures
- Sensitivity to context-dependent severity (same deficiency may be critical in abstract, low in appendix)
- Pattern recognition from analyzing thousands of documents
- Ability to predict downstream quality impact

**Integration Point:**

```yaml
AI Pre-Screening:
  - Run diagnosis agent → identify all deficiencies
  - Agent assigns preliminary severity based on heuristics
  - Calculate confidence score per assignment

Routing Logic:
  IF confidence < 0.80 OR deficiency_type in ["structural", "coherence", "logic"]:
    → Route to Expert Severity Review Queue
  ELSE:
    → Auto-approve agent assignment

Expert Review:
  - Expert sees: deficiency description, context, agent preliminary score, agent confidence
  - Expert can: approve, override severity, add annotation
  - System learns: expert overrides feed back to agent training data

Output:
  - Final severity assigned to each deficiency
  - Confidence = 1.0 for expert-reviewed items
  - Logged: who reviewed, when, why override if applicable
```

**Asana/SSoT Fields:**

- `Def_Severity` (enum: critical/high/medium/low)
- `Severity_Confidence` (number 0-1)
- `Severity_Review_Status` (enum: agent_assigned/expert_required/expert_approved)
- `Severity_Reviewer` (person)
- `Severity_Override_Reason` (rich text)

**Quality Impact:**

- Without expert: 25-40% of severity assignments incorrect → suboptimal measure selection
- With expert: 95%+ accuracy → critical issues always addressed first
- Quantifiable: Compare agent-only vs expert-validated runs on same document, measure ρ_crit achievement rate

**Cost-Benefit:**

- Expert time: 10-15 minutes per document (20-30 deficiencies)
- Quality improvement: 30-40% better final coverage of critical issues
- Automation savings: Agent handles 70-80% of assignments confidently
- **Recommendation:** Always expert validation for critical/high severity, agent sufficient for medium/low

---

### 1.2 STRATEGIC MEASURE SELECTION TRADE-OFFS

**Location in System:** Optimization phase → Conflict resolution gate

**What It Is:**

- Resolving infeasible constraint combinations (locks + forbids + category mins + k limit)
- Deciding between competing high-impact measures when both can't fit
- Balancing mathematical optimization with domain knowledge ("algorithm says X but experience says Y")
- Emergency overrides when rules must be broken

**Why Expert Matters:**

- Requires understanding of measure interdependencies and interaction effects
- Domain expertise about which measures are truly "must have" vs "nice to have"
- Judgment about acceptable quality trade-offs
- Authority to break constraints when justified

**Integration Point:**

```yaml
AI Conflict Detection:
  - Agent attempts optimization with human preferences
  - Detects infeasibility: locks exceed k, category mins unsatisfiable, etc.
  - Generates conflict report with: type, severity, proposed relaxations

Routing Logic:
  IF conflict_severity == "critical" (ρ_crit=1 unachievable):
    → Immediate expert escalation
  ELSE IF conflict_severity == "high" (category mins unmet):
    → Expert review within 24h
  ELSE:
    → Agent proposes minimal relaxation, expert approves/rejects

Expert Review:
  - Expert sees: full preference config, conflict details, agent-proposed solutions
  - Expert can: approve relaxation, modify preferences, request re-optimization
  - Expert provides written justification for decisions

Output:
  - Conflict resolution decision
  - Updated preferences if modified
  - Audit log: conflict type, resolution, justification
```

**Notion Properties:**

- `Conflict_Status` (select: detected/under_review/resolved)
- `Conflict_Type` (multi-select: lock_forbid_collision, category_infeasible, k_overflow)
- `Conflict_Severity` (select: critical/high/medium)
- `Resolution_Decision` (rich text)
- `Resolved_By` (person)

**Quality Impact:**

- Without expert: System deadlocks or makes arbitrary relaxations → poor measure selection
- With expert: Strategic decisions preserve quality while satisfying constraints
- Quantifiable: Track how often expert decisions lead to better ρ_total vs agent-only resolution

**Cost-Benefit:**

- Expert time: 15-30 minutes per conflict (varies by complexity)
- Quality improvement: Prevents 50-70% quality degradation from bad constraint relaxations
- Automation savings: 85% of configurations run without conflicts
- **Recommendation:** Always expert for critical conflicts, expert review for high-severity, agent for routine

---

### 1.3 MEASURE EFFECTIVENESS CALIBRATION

**Location in System:** Post-application phase → Learning feedback loop

**What It Is:**

- Evaluating whether selected measures actually improved the document
- Identifying measures that consistently underperform vs. expectations
- Refining weighted_impact scores based on observed effectiveness
- Updating severity weights and category weights based on outcomes

**Why Expert Matters:**

- Requires ability to assess document quality holistically
- Understanding of subtle improvements that metrics don't capture
- Pattern recognition across multiple documents to identify systematic issues
- Judgment about whether poor results indicate bad measure or bad application

**Integration Point:**

```yaml
Measurement:
  - Document processed with selected measures
  - Before/after metrics: readability scores, coherence metrics, expert rating
  - Track: which measures were applied, in what order, with what parameters

Analysis:
  - AI compares predicted impact (weighted_impact scores) vs actual improvement
  - Flags measures with large prediction errors
  - Generates effectiveness report

Expert Review:
  - Expert reads before/after versions
  - Rates: overall improvement (0-100), per-measure contribution
  - Identifies: measures that didn't help, measures that helped unexpectedly
  - Provides: qualitative insights not captured by metrics

Learning Loop:
  - Expert assessments stored in vector store
  - Used to refine: severity weights, measure impact predictions, selection heuristics
  - System learns: which measures work best in which contexts

Output:
  - Measure effectiveness scores updated
  - Calibration report: what changed and why
  - Training data for agent improvement
```

**SSoT Fields:**

- `Measure_Predicted_Impact` (number)
- `Measure_Actual_Impact` (number - expert assessed)
- `Measure_Effectiveness_Score` (number 0-100)
- `Calibration_Notes` (rich text)
- `Last_Calibration_Date` (date)

**Quality Impact:**

- Without expert: System never learns, continues making same suboptimal selections
- With expert: Continuous improvement, measure selection accuracy increases over time
- Quantifiable: Track prediction error (predicted vs actual impact) decreasing over iterations

**Cost-Benefit:**

- Expert time: 30-45 minutes per document (full review)
- Quality improvement: 15-25% over time as system learns from feedback
- Automation savings: Only need calibration every 10-20 documents, not every run
- **Recommendation:** Expert calibration every 10 documents initially, every 20 after system stabilizes

---

### TIER 2: SPECIALIST ZONES (Trained Professionals)

**Required Expertise:** 1,000-5,000 hours in editing, linguistic analysis, or quality assurance. Specialists provide 20-40% quality improvement over mediocre humans.

### 2.1 CATEGORY BALANCE VALIDATION

**Location in System:** Optimization phase → Post-selection quality check

**What It Is:**

- Verifying that category distribution makes sense for document type
- Identifying over-concentration in single category
- Ensuring balanced coverage across structural/cohesion/semantic/lexical dimensions
- Validating target_share allocations are appropriate

**Why Specialist Matters:**

- Requires understanding of document genre conventions
- Experience with what balance "feels right" for different contexts
- Ability to spot patterns suggesting imbalance
- Faster processing than expert (can review 5-10 documents/hour)

**Integration Point:**

```yaml
AI Analysis:
  - Calculate actual category distribution from selected measures
  - Compare to target_shares and min/max bounds
  - Flag deviations > 15% from targets

Routing Logic:
  IF deviation > 25% OR structural < 2 measures:
    → Route to Specialist Balance Review
  ELSE IF deviation > 15%:
    → Log warning, continue
  ELSE:
    → Auto-approve

Specialist Review:
  - Reviews: document type, selected measures, category distribution
  - Validates: distribution appropriate for context
  - Can: approve, request re-optimization with adjusted targets

Output:
  - Balance validation status
  - Adjusted target_shares if modifications made
```

**Notion Properties:**

- `Category_Balance_Status` (select: not_checked/approved/needs_adjustment)
- `Category_Distribution_Actual` (JSON: category → percentage)
- `Category_Distribution_Target` (JSON: category → percentage)
- `Balance_Deviation_Score` (number 0-100, lower is better)
- `Balance_Reviewer` (person)

**Quality Impact:**

- Without specialist: Some documents get unbalanced measure selection → gaps in coverage
- With specialist: Consistent balanced approach → comprehensive quality improvement
- Quantifiable: Measure correlation between balance score and final document quality

**Cost-Benefit:**

- Specialist time: 5-10 minutes per document
- Quality improvement: 15-20% better overall coverage
- Automation savings: 80% of distributions pass automatic validation
- **Recommendation:** Specialist review when deviation > 15%, automated for smaller deviations

---

### 2.2 REDUNDANCY POLICY TUNING

**Location in System:** Pre-optimization phase → Policy configuration

**What It Is:**

- Determining appropriate redundancy policy for document context
- Setting gamma penalty values for minimize policy
- Deciding which deficiencies warrant redundant measures (allow policy)
- Tuning r_on_critical values based on document criticality

**Why Specialist Matters:**

- Requires experience with different policy outcomes
- Understanding of when redundancy helps vs. wastes resources
- Ability to assess document risk level
- Knowledge of domain-specific redundancy needs

**Integration Point:**

```yaml
Context Analysis:
  - AI analyzes: document type, deficiency distribution, criticality
  - Proposes: initial redundancy policy and parameters

Specialist Review:
  - Reviews: document context, AI proposal, historical performance data
  - Adjusts: policy mode, gamma value, r_on_critical
  - Provides: rationale for choices

Application:
  - Approved policy used for optimization
  - Policy and rationale logged for future learning

Output:
  - Redundancy policy configuration
  - Policy selection justification
```

**SSoT Fields:**

- `Redundancy_Policy_Mode` (enum: prohibit/minimize/allow)
- `Redundancy_Gamma` (number 0-1)
- `Redundancy_R_Critical` (number 1-3)
- `Policy_Selection_Rationale` (rich text)
- `Policy_Tuned_By` (person)

**Quality Impact:**

- Without specialist: One-size-fits-all policy → either waste (too much redundancy) or risk (too little)
- With specialist: Context-appropriate policy → optimal resource allocation
- Quantifiable: Compare ρ_crit achievement reliability with different policies

**Cost-Benefit:**

- Specialist time: 3-5 minutes per document
- Quality improvement: 10-15% better resource efficiency
- Automation savings: Default policy works for 70% of documents
- **Recommendation:** Specialist tuning for critical documents or complex deficiency distributions

---

### TIER 3: MEDIOCRE HUMAN ZONES (Basic Competence)

**Required Expertise:** 100-500 hours training. Mediocre humans provide 5-15% improvement, mostly in catching edge cases.

### 3.1 OPTIMIZATION OUTPUT REVIEW

**Location in System:** Post-optimization → Sanity check gate

**What It Is:**

- Reviewing final selected measures for obvious errors
- Checking that selections make intuitive sense
- Validating that output matches input preferences
- Catching any system glitches or bugs

**Why Mediocre Human Sufficient:**

- Pattern matching against preference configuration (mechanical check)
- Binary decision: does output match intent or not?
- Low creativity required
- Clear right/wrong answers in most cases

**Integration Point:**

```yaml
AI Self-Check:
  - Verify: locks present, forbids absent, category constraints met, k not exceeded
  - Generate: summary of selections vs. preferences

Mediocre Human Review:
  - Sees: preferences input, measures selected, constraint satisfaction report
  - Checks: does this "look right"?
  - Flags: anything obviously wrong

Approval:
  - If approved: proceed to application
  - If flagged: escalate to specialist/expert depending on issue type

Output:
  - Sanity check status
  - Any flags raised
```

**Notion Properties:**

- `Sanity_Check_Status` (select: pending/passed/flagged)
- `Sanity_Check_Flags` (multi-select: unexpected_measure/missing_lock/other)
- `Sanity_Check_Notes` (rich text)
- `Checked_By` (person)

**Quality Impact:**

- Without mediocre human: Occasional system bugs go undetected → broken optimizations
- With mediocre human: 90%+ of obvious errors caught
- Quantifiable: Track flag rate and true positive rate

**Cost-Benefit:**

- Mediocre human time: 2-3 minutes per document
- Quality improvement: 5-10% (catches 1-2 errors per 20 documents)
- Automation savings: AI self-check catches 95% of issues automatically
- **Recommendation:** Mediocre human spot check 25% of documents, automated for rest

---

### TIER 4: FULLY AUTOMATED ZONES (No Human Needed)

**Required Expertise:** None. Automation performs as well as or better than humans.

### 4.1 Coverage Metric Calculation

**System:** Automated scoring

```python
rho_crit = len(covered_critical) / len(all_critical)
rho_total = sum(f(d)*s(d) for d in covered) / sum(f(d)*s(d) for d in all)
```

### 4.2 Constraint Satisfaction Verification

**System:** Automated validation

```python
assert len(selected) <= k
for cat in categories:
    assert min[cat] <= count[cat] <= max[cat]
assert all(lock in selected for lock in locks)
assert not any(forbid in selected for forbid in forbids)
```

### 4.3 Weighted Impact Scoring

**System:** Automated calculation

```python
score = boost(m) * [alpha * normalize_severity + beta * normalize_coverage]
```

### 4.4 Status Progression Tracking

**System:** Automated workflow

```yaml
diagnosis_complete → optimization_ready → measures_selected → application_in_progress → complete
```

---

## Part 2: System Integration Architecture

### 2.1 THE FOUR-SYSTEM INTERACTION MODEL

```
┌─────────────────────────────────────────────────────────┐
│            ASANA / SSoT (Source of Truth)              │
│  - Deficiency records with severity assignments        │
│  - Measure catalog with impact scores                  │
│  - Optimization runs with selected measures            │
│  - Expert review tasks and assignments                 │
└───────────┬──────────────────────────────┬─────────────┘
            │                              │
            │ Webhook Events               │ API Queries
            ↓                              ↓
┌───────────────────────┐         ┌─────────────────────┐
│   n8n Orchestration   │←────────→│  AI Agents (GPT)   │
│   - Workflow routing  │         │  - Diagnosis agent  │
│   - Threshold checks  │         │  - Severity scorer  │
│   - Expert assignment │         │  - Optimizer agent  │
│   - Data transforms   │         │  - Conflict detect  │
└──────────┬────────────┘         └─────────────────────┘
           │
           │ Aggregated metrics & review queues
           ↓
┌──────────────────────────────────────────────────────┐
│         NOTION (Dashboard & Review Interface)        │
│  - Expert review queues (prioritized)               │
│  - Quality score tracking                           │
│  - Intervention analytics                           │
│  - Learning feedback interface                      │
└──────────────────────────────────────────────────────┘
```

### 2.2 INTELLIGENT ROUTING WORKFLOW

**Stage 1: Diagnosis Complete**

```
[AI Diagnosis Agent analyzes document]
  ↓
[Identifies 28 deficiencies]
  ↓
[Assigns preliminary severity to each with confidence scores]
  ↓
[Writes to Asana: Def_ID, Def_Category, Def_Severity, Severity_Confidence]
  ↓
[Webhook → n8n]
```

**Stage 2: Severity Validation Routing**

```
[n8n checks: any Severity_Confidence < 0.80?]
  ↓
[YES: 5 deficiencies flagged]
  ↓
[Creates Notion task: "Expert Severity Review - 5 items"]
  ↓
[Assigns to: Lead Linguistic Analyst]
  ↓
[Notion shows: deficiency details, context, agent reasoning]
  ↓
[Expert reviews, approves 3, overrides 2]
  ↓
[Updates propagate to Asana via n8n]
  ↓
[Severity_Confidence = 1.0 for all reviewed items]
```

**Stage 3: Preference Configuration**

```
[Human configures preferences in Notion interface]
  ↓
[Sets: locks, boosts, forbids, category bounds, policies]
  ↓
[n8n validates: preference schema well-formed]
  ↓
[Writes to Asana: Optimizer_Preferences_JSON field]
```

**Stage 4: Optimization with Conflict Detection**

```
[AI Optimizer Agent retrieves: deficiencies, measures, preferences]
  ↓
[Attempts optimization]
  ↓
[Detects conflict: locks + category_mins exceed k]
  ↓
[Generates conflict report with proposed relaxations]
  ↓
[n8n evaluates: conflict_severity = "high"]
  ↓
[Routes to Expert Conflict Resolution Queue in Notion]
  ↓
[Expert reviews, decides: relax Cohesion max from 4 to 5]
  ↓
[Updates preferences, re-runs optimization]
  ↓
[Success: feasible selection found]
```

**Stage 5: Post-Selection Validation**

```
[AI generates: category distribution report, coverage metrics]
  ↓
[n8n checks: category deviation = 18% (exceeds 15% threshold)]
  ↓
[Routes to Specialist Balance Review in Notion]
  ↓
[Specialist reviews: approves with note "acceptable for technical document"]
  ↓
[Mediocre human performs sanity check: selections match preferences]
  ↓
[All gates passed → proceed to application]
```

**Stage 6: Application and Learning**

```
[Selected measures applied to document]
  ↓
[Before/after metrics captured]
  ↓
[Document proceeds through remaining workflow stages]
  ↓
[After 10 documents: Expert Calibration Review triggered]
  ↓
[Expert assesses: actual vs predicted impacts]
  ↓
[Updates: severity weights, measure effectiveness scores]
  ↓
[Learning data stored in vector store for agent improvement]
```

---

## Part 3: Preference Panel with Intelligent Routing

### 3.1 Human Configuration Interface (Notion)

**Preference Configuration Page:**

**Measure Selection:**

- Locks: [Multi-select from measure catalog]
- Forbids: [Multi-select from measure catalog]
- Boosts: [Measure → Multiplier (1.0-3.0)]

**Category Configuration:**

- Structural: [Min: __, Max: __, Target%: __]
- Cohesion: [Min: __, Max: __, Target%: __]
- Semantic: [Min: __, Max: __, Target%: __]
- Lexical: [Min: __, Max: __, Target%: __]
- Category Weights: [Structural: __, Cohesion: __, Semantic: __, Lexical: __]

**Policy Settings:**

- Critical Coverage: [Require ρ_crit=1.0 before non-critical ☐ | Relax if infeasible ☐]
- Redundancy Policy: [Prohibit ☐ | Minimize (γ: __) ☐ | Allow (r: __) ☐]
- Conflict Strategy: [Lexicographic priority ☐ | Minimal relaxations ☐]

**Run Parameters:**

- Measures per run (k): [__]
- Maximum runs (k_max): [__]
- Coverage target (τ): [__]
- Tiebreak: [Δρ_total ☐ | Lower cost ☐ | Explainability ☐]

**Validation:**

[n8n validates configuration schema → Creates Optimizer_Preferences_JSON → Stores in Asana]

---

### 3.2 Automated Review Queue Prioritization

**Expert Queue (Tier 1):**

```
Priority = conflict_severity * quality_impact * time_sensitivity

HIGH PRIORITY (Review within 4 hours):
- Severity assignment confidence < 0.70
- Critical conflicts (ρ_crit unachievable)
- Calibration reviews (every 10 documents)

MEDIUM PRIORITY (Review within 24 hours):
- Severity assignment confidence 0.70-0.80
- High-severity conflicts (category infeasible)
- Strategic trade-off decisions

LOW PRIORITY (Review within 72 hours):
- Medium-severity conflicts
- Optional calibration feedback
```

**Specialist Queue (Tier 2):**

```
ROUTINE (Review within 24 hours):
- Category balance deviation > 15%
- Redundancy policy tuning
- Post-selection validation

SPOT CHECK (Sample 25%):
- Routine optimizations
- Standard configurations
```

**Mediocre Human Queue (Tier 3):**

```
SANITY CHECKS (Review within 1 hour):
- Post-optimization output review
- Preference → selection matching
- Spot check 25% of routine runs
```

---

### 3.3 SSE Event Structure with Intervention Tracking

```json
{
  "phase": "severity_validation|optimization|conflict_resolution|post_validation|application|calibration",
  
  "diagnosis": {
    "deficiencies_found": 28,
    "severity_distribution": {"critical": 3, "high": 7, "medium": 12, "low": 6},
    "confidence_scores": {"mean": 0.87, "min": 0.65, "low_confidence_count": 5}
  },
  
  "expert_intervention": {
    "required": true,
    "tier": 1,
    "type": "severity_validation",
    "items_flagged": 5,
    "assigned_to": "Lead Linguistic Analyst",
    "priority": "high",
    "estimated_time": "10-15 minutes"
  },
  
  "preferences": {
    "locks": ["RST_Relation_Patterns", "Claims_Evidence_Alignment"],
    "forbids": ["Oxford_Comma_Fixer"],
    "boosts": {"Terminology_Consistency": 1.4},
    "category_bounds": {"Structural": {"min": 2, "max": 4, "target_share": 0.30}},
    "critical_policy": "require",
    "redundancy_policy": {"mode": "minimize", "gamma": 0.5}
  },
  
  "optimization": {
    "status": "conflict_detected",
    "conflict_type": "category_min_infeasible",
    "conflict_severity": "high",
    "proposed_relaxation": "increase Cohesion max from 4 to 5"
  },
  
  "resolution": {
    "decision": "expert_approved_relaxation",
    "resolved_by": "Senior QA Analyst",
    "justification": "Technical document requires additional cohesion measures",
    "updated_preferences": {"category_bounds": {"Cohesion": {"max": 5}}}
  },
  
  "selected_measures": {
    "run_id": 1,
    "count": 10,
    "measures": [
      {"id": "RST_Relations", "category": "Structural", "weighted_impact": 245.8, "boost": 1.0, "locked": true},
      {"id": "Terminology_Check", "category": "Semantic", "weighted_impact": 189.3, "boost": 1.4}
    ]
  },
  
  "validation": {
    "category_balance": {
      "status": "specialist_review_required",
      "deviation_score": 18,
      "actual_distribution": {"Structural": 0.30, "Cohesion": 0.35, "Semantic": 0.25, "Lexical": 0.10}
    },
    "sanity_check": {
      "status": "passed",
      "checked_by": "QA Reviewer",
      "flags": []
    }
  },
  
  "coverage": {
    "rho_crit": 1.0,
    "rho_total": 0.94,
    "target_tau": 0.90,
    "measures_used": 10,
    "iterations": 1
  },
  
  "learning": {
    "calibration_due": false,
    "documents_since_last": 7,
    "next_calibration_after": 3
  }
}
```

---

## Part 4: Quality Metrics and Success Criteria

### 4.1 Intervention Efficiency Metrics

**Expert Time Utilization:**

- Target: 80%+ on Tier 1 tasks, 15% on Tier 2, 5% on Tier 3, 0% on Tier 4
- Measure: Track time spent per task type per week
- Alert: If Tier 3/4 time > 20%, process inefficiency

**Routing Accuracy:**

- Target: 90%+ of items routed to correct tier
- Measure: Expert/specialist agreement with initial routing decision
- Alert: If disagreement rate > 15%, retune thresholds

**Queue Time:**

- Target: Expert queue < 4h for high priority, Specialist < 24h, Mediocre < 1h
- Measure: Time from queue entry to review start
- Alert: If any queue exceeds target by 50%

### 4.2 Quality Outcome Metrics

**Severity Assignment Accuracy:**

- Target: 95%+ of AI assignments match expert validation
- Measure: Agreement rate on reviewed items
- Alert: If accuracy < 90%, retrain severity scoring agent

**Optimization Success Rate:**

- Target: 85%+ of runs complete without conflicts
- Measure: Percentage of runs requiring expert conflict resolution
- Alert: If conflict rate > 20%, review preference configuration patterns

**Coverage Achievement:**

- Target: ρ_crit = 1.0 in 98%+ of runs, ρ_total ≥ τ in 95%+ of runs
- Measure: Achievement rates across all optimization runs
- Alert: If either metric drops below target

**Learning Curve:**

- Target: Prediction error (predicted vs actual impact) decreases 5%+ per calibration cycle
- Measure: Mean absolute error of weighted_impact predictions
- Alert: If learning plateaus for 3+ cycles

### 4.3 Cost-Benefit Dashboard (Notion)

**Resource Utilization View:**

- Expert hours per week by task type (stacked bar chart)
- Specialist hours per week by task type
- Mediocre human hours per week by task type
- Cost per document (calculated based on hourly rates)

**Quality Impact View:**

- Average ρ_crit by intervention tier (with vs without)
- Average ρ_total by intervention tier
- Deficiency coverage rate by severity level
- Beta reader scores or quality ratings over time

**Efficiency Trend View:**

- Documents processed per week
- Average time from diagnosis to application
- Conflict rate over time (should decrease)
- Prediction accuracy over time (should increase)

---

## Part 5: Implementation Roadmap

### Phase 1: Foundation (Week 1-2)

- [ ]  Configure Asana custom fields for intervention tracking
- [ ]  Build n8n workflows for threshold checking and routing
- [ ]  Set up Notion review queue pages for each tier
- [ ]  Train AI agents for diagnosis, severity scoring, conflict detection
- [ ]  Define initial thresholds (confidence, deviation, priority)

### Phase 2: Calibration (Week 3-4)

- [ ]  Run 10 test documents through system with manual routing override
- [ ]  Compare AI scores to expert assessments
- [ ]  Adjust thresholds based on false positive/negative rates
- [ ]  Refine routing logic to minimize unnecessary escalations
- [ ]  Establish baseline metrics (time, quality, cost)

### Phase 3: Staged Rollout (Week 5-6)

- [ ]  Enable automated routing for Tier 4 (full automation)
- [ ]  Enable automated routing for Tier 3 with 50% spot check
- [ ]  Enable automated routing for Tier 2 with specialist validation
- [ ]  Keep Tier 1 fully expert-reviewed until confidence high
- [ ]  Monitor queue times and quality metrics daily

### Phase 4: Optimization (Week 7-8)

- [ ]  Analyze bottlenecks and adjust resource allocation
- [ ]  Tune thresholds based on 4 weeks of data
- [ ]  Implement learning loops (calibration feedback → agent improvement)
- [ ]  Reduce expert involvement on routine cases
- [ ]  Scale up document throughput

### Phase 5: Continuous Improvement (Ongoing)

- [ ]  Weekly metrics review and threshold tuning
- [ ]  Monthly calibration sessions with experts
- [ ]  Quarterly strategic review of intervention architecture
- [ ]  Ongoing agent retraining based on expert feedback

---

## Part 6: Acceptance Tests

### Tier 1 Expert Interventions

- [ ]  Severity assignments with confidence < 0.80 route to expert queue
- [ ]  Expert can approve, override, or request re-analysis
- [ ]  Expert overrides feed back to agent training data
- [ ]  Critical conflicts escalate to expert within 4 hours
- [ ]  Calibration reviews triggered every 10 documents
- [ ]  All expert decisions logged with justification

### Tier 2 Specialist Interventions

- [ ]  Category balance deviations > 15% route to specialist
- [ ]  Specialist can approve, request re-optimization, or adjust targets
- [ ]  Redundancy policy tuning available for complex cases
- [ ]  Specialist queue processes within 24 hours
- [ ]  80%+ of routine cases pass automatic validation

### Tier 3 Mediocre Human Interventions

- [ ]  Sanity checks performed on 25% of optimizations (sampling)
- [ ]  Mediocre humans can flag issues for escalation
- [ ]  Queue processes within 1 hour
- [ ]  False positive rate < 10% (flags that aren't real issues)

### Tier 4 Automation

- [ ]  Coverage metrics calculated automatically and accurately
- [ ]  Constraint satisfaction verified before selection approved
- [ ]  Weighted impact scoring consistent with formula
- [ ]  Status progression automated based on completion criteria
- [ ]  Zero human time spent on Tier 4 tasks

### System Integration

- [ ]  Asana ↔ n8n ↔ Notion data sync working bidirectionally
- [ ]  AI agents accessible via API and producing structured outputs
- [ ]  SSE events stream with full intervention tracking
- [ ]  Dashboards update in real-time with queue status and metrics
- [ ]  Audit logs capture all decisions with timestamps and actors

---

## Conclusion: Strategic Resource Deployment

**The Core Principle:** Human expertise is expensive and finite. Deploy it only where it delivers disproportionate value.

**Tier 1 (Expert-Only):** 10% of tasks, 80% of expert time, 40-80% quality impact

- Severity assignment validation
- Strategic conflict resolution
- Measure effectiveness calibration

**Tier 2 (Specialist):** 20% of tasks, 15% of expert time, 20-40% quality impact

- Category balance validation
- Redundancy policy tuning
- Post-selection quality checks

**Tier 3 (Mediocre Human):** 25% of tasks, 5% of expert time, 5-15% quality impact

- Sanity checks and spot reviews
- Routine approvals
- Edge case flagging

**Tier 4 (Automated):** 45% of tasks, 0% of expert time, 0-10% quality impact

- Metric calculations
- Constraint verification
- Status tracking

**Success Formula:** AI pre-screening + intelligent routing + targeted expertise = both high quality AND efficiency.

**The System Works When:** Experts spend 80%+ of time on high-leverage decisions, AI handles routine analysis, and quality metrics improve while expert burden decreases.

---

**Related Pages:**

[Optimization Algorithm: Leaving no stone unturned](Optimization%20Algorithm%20Leaving%20no%20stone%20unturned%2037eba36a007a4120a87b9fef49f28bc8.md)

[Practical Guide: Severity-Weighted Optimization Algorithm](Practical%20Guide%20Severity-Weighted%20Optimization%20Alg%2007de84f9f1de481a8446de001e0a230c.md)

‣

‣