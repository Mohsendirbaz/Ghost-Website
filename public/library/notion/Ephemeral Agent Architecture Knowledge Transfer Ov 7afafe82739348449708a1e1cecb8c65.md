# Ephemeral Agent Architecture: Knowledge Transfer Over State Persistence

# Ephemeral Agent Architecture: Knowledge Transfer Over State Persistence

## Overview

This document presents a **radical architectural shift** for multi-agent collaborative systems operating under severe context window constraints: treat agents as **disposable, lifetime-bounded execution units** where **knowledge transfer becomes the primary learning mechanism** rather than persistent state accumulation.

**Core Principle**: In context-limited environments, maintaining agent state across interactions becomes prohibitively expensive. Instead, we architect for **ephemeral agents with saturation-based lifetimes** that execute until context saturation, then transfer their learned knowledge to successor agents through explicit, structured handoffs-analogous to continuation prompts in multi-session LLM workloads.

**Key Innovation - Saturation & Longevity**:

- **Context window = agent lifetime**: Agent lifespan is determined by context capacity, not fixed task count
- **Saturation point**: Agent reaches end-of-life when context window approaches capacity (e.g., 90% full)
- **Variable longevity**: Different agent roles have different context capacities and therefore different lifespans
- **Bounded sync cycles**: Orchestration limits input size per global sync to prevent cascade saturation
- **Partial rejuvenation**: Orchestration can refresh saturated agents without full system restart

**Motivation**: The constraint enforcement policy[[1]](Constraint%20Enforcement%20as%20Policy%20Learning%20vs%20Execu%2037d4b1c4dfc54f18b3685e986a86bf0a.md) with mandatory sampling[[2]](Sampling-Claude%20Edition%202a7f832e52ca80779afffadeaf0b2fbe.md) already operates under extreme budget constraints (99.6% cost reduction via 20% sampling). Extending this philosophy: **agent instances themselves become the scarce resource**, requiring disposable execution with knowledge crystallization rather than stateful persistence.

---

## Context Window as Agent Lifetime: The Saturation Model

### Traditional Persistent Agent Architecture (Problematic - Uncontrolled Growth)

```python
class TraditionalPersistentAgent:
    """
    PROBLEM: Context accumulates unboundedly.
    
    As agent processes more tasks, its context window fills with:
    - Complete task history
    - All previous decisions and rationale
    - Full conversation threads
    - Detailed error logs
    
    Result: Context overflow within 10-20 interactions.
    """
    
    def __init__(self, agent_id: str):
        self.agent_id = agent_id
        self.full_history = []  # Grows unboundedly
        self.context_window = 200_000  # Token limit
        self.current_context_size = 0
    
    def process_task(self, task: Task) -> Result:
        # Load ENTIRE history into context
        context = self._build_full_context()
        
        if len(context) > self.context_window:
            # CONTEXT OVERFLOW: What do we do?
            # Option 1: Truncate (lose information)
            # Option 2: Summarize (lose detail)
            # Option 3: Fail (system halt)
            raise ContextOverflowError()
        
        # Process with full historical context
        result = self.llm.generate(context + task.prompt)
        
        # Append to history (grows indefinitely)
        self.full_history.append((task, result))
        self.current_context_size += len(task.prompt) + len(result)
        
        return result
    
    def _build_full_context(self) -> str:
        """EXPENSIVE: Reconstruct complete agent history."""
        return "\n".join([
            f"Task {i}: {task}\nResult: {result}"
            for i, (task, result) in enumerate(self.full_history)
        ])
```

**Failure Mode Timeline**:

```
Interaction 1:   5K tokens context
Interaction 5:  25K tokens context
Interaction 10: 50K tokens context
Interaction 20: 120K tokens context
Interaction 30: 200K tokens context → OVERFLOW
Interaction 31: SYSTEM FAILURE or LOSSY TRUNCATION
```

### Saturation-Aware Ephemeral Agent Architecture (Solution)

```python
class EphemeralAgent:
    """
    SOLUTION: Agent is single-use, knowledge is explicitly transferred.
    
    Each agent instance:
    - Executes exactly ONE task
    - Receives compressed knowledge transfer from predecessor
    - Produces compressed knowledge transfer for successor
    - Is disposed after execution
    
    Result: Bounded context per agent, unbounded agent succession.
    """
    
    def __init__(self, knowledge_transfer: KnowledgeTransferPacket):
        self.knowledge = knowledge_transfer  # Compressed, bounded size
        self.execution_count = 0
        self.max_executions = 1  # HARD LIMIT: single-use
    
    @classmethod
    def from_predecessor(cls, 
                        predecessor_knowledge: KnowledgeTransferPacket,
                        task: Task) -> 'EphemeralAgent':
        """Factory: Create agent from predecessor's knowledge transfer."""
        return cls(knowledge_transfer=predecessor_knowledge)
    
    def execute_task(self, task: Task) -> Tuple[Result, KnowledgeTransferPacket]:
        """Execute single task and produce knowledge transfer."""
        
        if self.execution_count >= self.max_executions:
            raise AgentExhaustedException(
                "Agent is single-use. Create new instance."
            )
        
        # Build context from knowledge transfer + task history
        context = self._build_context_from_state()
        
        # Execute task
        result = self.llm.generate(context + task.prompt)
        
        # Crystallize knowledge for successor
        knowledge_transfer = self._crystallize_knowledge(
            prior_knowledge=self.knowledge,
            task=task,
            result=result
        )
        
        self.execution_count += 1
        
        # Return result + knowledge for next agent
        return result, knowledge_transfer
    
    def _build_context_from_transfer(self) -> str:
        """BOUNDED: Use compressed knowledge transfer only."""
        return f"""
        Knowledge Transfer from Predecessor:
        {self.knowledge.compressed_state}
        
        Learned Patterns: {self.knowledge.learned_patterns}
        Critical Constraints: {self.knowledge.active_constraints}
        Recent Failures: {self.knowledge.failure_summary}
        
        [Full history NOT loaded — use transfer only]
        """
    
    def _crystallize_knowledge(self,
                               prior_knowledge: KnowledgeTransferPacket,
                               task: Task,
                               result: Result) -> KnowledgeTransferPacket:
        """Compress task execution into knowledge transfer."""
        
        # Extract key learnings (lossy compression)
        new_patterns = self._extract_patterns(task, result)
        updated_constraints = self._update_constraints(result)
        failure_summary = self._update_failures(result)
        
        # Merge with prior knowledge (bounded size)
        return KnowledgeTransferPacket(
            compressed_state=self._compress_state(
                prior=prior_knowledge.compressed_state,
                new_task=task,
                new_result=result
            ),
            learned_patterns=self._merge_patterns(
                prior_knowledge.learned_patterns,
                new_patterns,
                max_patterns=20  # BOUNDED
            ),
            active_constraints=updated_constraints,
            failure_summary=failure_summary[-10:],  # Last 10 only
            metadata={
                'agent_generation': prior_knowledge.metadata['agent_generation'] + 1,
                'total_tasks': prior_knowledge.metadata['total_tasks'] + 1,
                'timestamp': 
```

**Execution Timeline**:

```
Agent 1:  Execute Task 1  → Transfer Package 1  (5K tokens)
Agent 2:  Load Transfer 1 → Execute Task 2 → Transfer Package 2  (5K tokens)
Agent 3:  Load Transfer 2 → Execute Task 3 → Transfer Package 3  (5K tokens)
...
Agent 100: Load Transfer 99 → Execute Task 100 → Transfer Package 100 (5K tokens)

Each agent: 5K transfer + 10K task context = 15K total ≪ 200K limit
No context overflow, ever.
```

---

## Knowledge Transfer as Primary Learning Mechanism

### Knowledge Transfer Packet Structure

```python
@dataclass
class KnowledgeTransferPacket:
    """
    Compressed knowledge representation for agent handoff.
    
    Design principles:
    - BOUNDED SIZE: Max 5K tokens regardless of agent generation
    - LOSSY COMPRESSION: Forget details, retain patterns
    - FORWARD-LOOKING: Information useful for next task, not historical record
    - STRUCTURED: Machine-readable format for reliable transfer
    """
    
    # Core state (compressed)
    compressed_state: CompressedState
    
    # Learned patterns (bounded list)
    learned_patterns: List[Pattern]  # Max 20 patterns
    
    # Active constraints (from constraint enforcement policy)
    active_constraints: ConstraintSet
    
    # Recent failure modes (last 10)
    failure_summary: List[FailureSummary]
    
    # Sampling budget status (from sampling mandate)
    sampling_status: SamplingBudgetStatus
    
    # Quality threshold learnings (if adaptive policy)
    threshold_updates: Optional[Dict[str, ThresholdUpdate]]
    
    # Metadata (lineage tracking)
    metadata: Dict[str, Any]  # generation, timestamp, etc.
    
    def get_size_tokens(self) -> int:
        """Enforce bounded size constraint."""
        size = (
            len(self.compressed_state.serialize()) +
            sum(len(p.serialize()) for p in self.learned_patterns) +
            len(self.active_constraints.serialize()) +
            sum(len(f.serialize()) for f in self.failure_summary)
        )
        
        MAX_SIZE = 5000  # tokens
        if size > MAX_SIZE:
            raise KnowledgeTransferOversizeError(
                f"Transfer packet {size} tokens exceeds {MAX_SIZE}"
            )
        
        return size

@dataclass
class CompressedState:
    """
    Lossy compression of agent execution history.
    
    Instead of storing complete history:
    - Aggregate statistics (counts, averages)
    - Key decision points (not all decisions)
    - Critical observations (not all observations)
    """
    
    # Summary statistics
    tasks_completed: int
    success_rate: float
    avg_quality_score: float
    
    # Key decisions (last N only)
    recent_decisions: List[DecisionSummary]  # Max 5
    
    # Critical observations
    critical_findings: List[Finding]  # Max 10
    
    # Current working hypothesis
    active_hypothesis: Optional[Hypothesis]
    
    def serialize(self) -> str:
        """Serialize to compact string representation."""
        return f"""
        Tasks: {self.tasks_completed} | Success: {self.success_rate:.1%} | Quality: {self.avg_quality_score:.2f}
        
        Recent Decisions:
        {chr(10).join(f"  - {d.summary}" for d in self.recent_decisions)}
        
        Critical Findings:
        {chr(10).join(f"  - {f.summary}" for f in self.critical_findings)}
        
        Active Hypothesis: {self.active_hypothesis.summary if self.active_hypothesis else 'None'}
        """

@dataclass 
class Pattern:
    """
    Learned pattern extracted from task execution.
    
    Examples:
    - "High entity coherence (>0.70) correlates with reader satisfaction >4.5"
    - "Chapters in Part I require stricter quality thresholds than Part V"
    - "Dependency removal latency increases after 20 chapters (>500ms)"
    """
    
    pattern_id: str
    description: str
    confidence: float  # 0.0-1.0
    observations: int  # How many times observed
    last_seen: str  # ISO timestamp
    
    def serialize(self) -> str:
        return f"{self.description} [conf={self.confidence:.2f}, n={self.observations}]"
```

### Knowledge Transfer Protocol

```python
class KnowledgeTransferProtocol:
    """
    Manages agent succession through structured knowledge handoff.
    
    Responsibilities:
    - Create successor agents from knowledge transfers
    - Validate transfer packet integrity
    - Compress knowledge to maintain bounded size
    - Audit transfer chain for debugging
    """
    
    def __init__(self):
        self.transfer_log: List[TransferRecord] = []
        self.compression_strategy = AdaptiveCompressionStrategy()
    
    def handoff(self,
                current_agent: EphemeralAgent,
                task: Task) -> Tuple[Result, EphemeralAgent]:
        """
        Execute task and create successor agent.
        
        Flow:
        1. Current agent executes task
        2. Current agent produces knowledge transfer
        3. Validate transfer packet
        4. Compress if needed
        5. Create successor agent from transfer
        6. Dispose current agent
        7. Return result + successor
        """
        
        # Execute task
        result, knowledge_transfer = current_agent.execute_task(task)
        
        # Validate transfer
        self._validate_transfer(knowledge_transfer)
        
        # Compress if oversized
        if knowledge_transfer.get_size_tokens() > 5000:
            knowledge_transfer = self.compression_strategy.compress(
                knowledge_transfer,
                target_size=5000
            )
        
        # Log transfer (for audit trail)
        self._log_transfer(
            from_agent=current_agent,
            to_generation=knowledge_transfer.metadata['agent_generation'],
            transfer=knowledge_transfer,
            task=task,
            result=result
        )
        
        # Create successor
        successor_agent = EphemeralAgent.from_predecessor(
            predecessor_knowledge=knowledge_transfer,
            task=task  # Next task context
        )
        
        # Dispose current agent
        del current_agent  # Explicit disposal
        
        return result, successor_agent
    
    def _validate_transfer(self, transfer: KnowledgeTransferPacket):
        """Validate transfer packet integrity."""
        
        # Size constraint
        if transfer.get_size_tokens() > 6000:  # Some tolerance
            raise TransferValidationError(
                f"Transfer too large: {transfer.get_size_tokens()} tokens"
            )
        
        # Required fields
        if not transfer.compressed_state:
            raise TransferValidationError("Missing compressed state")
        
        if not transfer.active_constraints:
            raise TransferValidationError("Missing active constraints")
        
        # Pattern bounds
        if len(transfer.learned_patterns) > 20:
            raise TransferValidationError(
                f"Too many patterns: {len(transfer.learned_patterns)}"
            )
        
        # Failure summary bounds
        if len(transfer.failure_summary) > 10:
            raise TransferValidationError(
                f"Failure summary too long: {len(transfer.failure_summary)}"
            )
    
    def _log_transfer(self,
                     from_agent: EphemeralAgent,
                     to_generation: int,
                     transfer: KnowledgeTransferPacket,
                     task: Task,
                     result: Result):
        """
        Log transfer for audit trail.
        
        NOTE: We need SOME auditability but not COMPLETE auditability.
        Log only essential information for debugging.
        """
        
        record = TransferRecord(
            timestamp=[datetime.now](http://datetime.now)(),
            from_generation=transfer.metadata['agent_generation'] - 1,
            to_generation=to_generation,
            task_id=[task.id](http://task.id),
            result_summary=self._summarize_result(result),
            transfer_size=transfer.get_size_tokens(),
            patterns_transferred=len(transfer.learned_patterns),
            constraints_active=len(transfer.active_constraints),
            # DO NOT log full transfer content (too expensive)
        )
        
        self.transfer_log.append(record)
        
        # Keep audit log bounded (last 1000 transfers)
        if len(self.transfer_log) > 1000:
            self.transfer_log = self.transfer_log[-1000:]
```

---

## Compression Strategies for Knowledge Transfer

### Adaptive Compression

```python
class AdaptiveCompressionStrategy:
    """
    Compress knowledge transfer to maintain bounded size.
    
    Strategies (applied in order of priority):
    1. Forget old patterns (keep most recent/confident)
    2. Aggregate failure summaries (group similar failures)
    3. Compress state (reduce decision history)
    4. Prune low-confidence patterns
    """
    
    def compress(self,
                transfer: KnowledgeTransferPacket,
                target_size: int) -> KnowledgeTransferPacket:
        """
        Iteratively compress transfer until target size reached.
        """
        
        current_size = transfer.get_size_tokens()
        
        if current_size <= target_size:
            return transfer  # No compression needed
        
        # Strategy 1: Prune low-confidence patterns
        if current_size > target_size:
            transfer = self._prune_patterns(
                transfer,
                keep_top_n=15,
                min_confidence=0.5
            )
            current_size = transfer.get_size_tokens()
        
        # Strategy 2: Aggregate failure summaries
        if current_size > target_size:
            transfer = self._aggregate_failures(
                transfer,
                max_failures=5
            )
            current_size = transfer.get_size_tokens()
        
        # Strategy 3: Compress state history
        if current_size > target_size:
            transfer = self._compress_state(
                transfer,
                keep_decisions=3,
                keep_findings=5
            )
            current_size = transfer.get_size_tokens()
        
        # Strategy 4: Aggressive pruning
        if current_size > target_size:
            transfer = self._aggressive_prune(
                transfer,
                target_size=target_size
            )
        
        return transfer
    
    def _prune_patterns(self,
                       transfer: KnowledgeTransferPacket,
                       keep_top_n: int,
                       min_confidence: float) -> KnowledgeTransferPacket:
        """
        Keep only top-N most confident patterns.
        """
        
        # Sort by confidence * observations (importance metric)
        sorted_patterns = sorted(
            transfer.learned_patterns,
            key=lambda p: p.confidence * p.observations,
            reverse=True
        )
        
        # Keep top-N with confidence > threshold
        kept_patterns = [
            p for p in sorted_patterns[:keep_top_n]
            if p.confidence >= min_confidence
        ]
        
        transfer.learned_patterns = kept_patterns
        return transfer
    
    def _aggregate_failures(self,
                           transfer: KnowledgeTransferPacket,
                           max_failures: int) -> KnowledgeTransferPacket:
        """
        Group similar failures, keep aggregated summary.
        """
        
        # Group failures by type
        failure_groups = defaultdict(list)
        for failure in transfer.failure_summary:
            failure_groups[failure.failure_type].append(failure)
        
        # Aggregate each group
        aggregated = []
        for failure_type, failures in failure_groups.items():
            agg = FailureSummary(
                failure_type=failure_type,
                count=len(failures),
                last_occurrence=max(f.timestamp for f in failures),
                summary=f"{len(failures)} occurrences of {failure_type}"
            )
            aggregated.append(agg)
        
        # Keep most recent failures
        aggregated.sort(key=lambda f: f.last_occurrence, reverse=True)
        transfer.failure_summary = aggregated[:max_failures]
        
        return transfer
    
    def _compress_state(self,
                       transfer: KnowledgeTransferPacket,
                       keep_decisions: int,
                       keep_findings: int) -> KnowledgeTransferPacket:
        """
        Reduce state history to most recent items.
        """
        
        state = transfer.compressed_state
        
        # Keep only most recent decisions
        state.recent_decisions = state.recent_decisions[-keep_decisions:]
        
        # Keep only most critical findings
        state.critical_findings = sorted(
            state.critical_findings,
            key=lambda f: f.importance,
            reverse=True
        )[:keep_findings]
        
        transfer.compressed_state = state
        return transfer
```

---

## Integration with Constraint Enforcement Policy

### Ephemeral Agents with Adaptive Thresholds

```python
class EphemeralAdaptiveQualityAgent(EphemeralAgent):
    """
    Ephemeral agent that learns quality thresholds adaptively.
    
    Key difference from persistent adaptive policy:
    - Threshold learning state is in knowledge transfer, not agent instance
    - Each agent instance is single-use
    - Threshold updates are explicitly passed to successor
    """
    
    def execute_task(self, task: Task) -> Tuple[Result, KnowledgeTransferPacket]:
        """
        Execute quality-constrained task with adaptive thresholds.
        """
        
        # Load thresholds from knowledge transfer
        if self.knowledge.threshold_updates:
            current_thresholds = self._reconstruct_thresholds(
                self.knowledge.threshold_updates
            )
        else:
            # Initialize from defaults
            current_thresholds = self._get_default_thresholds()
        
        # Get quality scores via mandatory sampling
        estimated_scores = self._get_sampled_quality_scores(task)
        
        # Check constraints with current thresholds
        constraints_satisfied = self._check_constraints(
            scores=estimated_scores,
            thresholds=current_thresholds
        )
        
        if constraints_satisfied:
            result = self._execute_task_content(task)
        else:
            result = self._handle_constraint_violation(
                task=task,
                scores=estimated_scores,
                thresholds=current_thresholds
            )
        
        # Update thresholds based on performance
        if result.has_performance_feedback:
            updated_thresholds = self._update_thresholds(
                prior_thresholds=current_thresholds,
                scores=estimated_scores,
                feedback=result.performance_feedback
            )
        else:
            updated_thresholds = current_thresholds
        
        # Crystallize knowledge for successor
        knowledge_transfer = self._crystallize_knowledge(
            prior_knowledge=self.knowledge,
            task=task,
            result=result,
            threshold_updates=self._serialize_threshold_updates(
                prior=self.knowledge.threshold_updates,
                current=updated_thresholds
            )
        )
        
        return result, knowledge_transfer
    
    def _serialize_threshold_updates(self,
                                    prior: Optional[Dict[str, ThresholdUpdate]],
                                    current: Dict[str, float]) -> Dict[str, ThresholdUpdate]:
        """
        Serialize threshold updates for knowledge transfer.
        
        BOUNDED: Keep only last N updates per metric.
        """
        
        updates = prior.copy() if prior else {}
        
        for metric, value in current.items():
            if metric not in updates:
                updates[metric] = ThresholdUpdate(
                    metric=metric,
                    history=[],
                    current_value=value
                )
            
            # Add update to history
            updates[metric].history.append({
                'timestamp': [datetime.now](http://datetime.now)().isoformat(),
                'value': value,
                'generation': self.knowledge.metadata['agent_generation']
            })
            
            # Keep only last 10 updates per metric (BOUNDED)
            updates[metric].history = updates[metric].history[-10:]
            updates[metric].current_value = value
        
        return updates
```

### Knowledge Transfer with Sampling Budget

```python
@dataclass
class SamplingBudgetStatus:
    """
    Sampling budget state for knowledge transfer.
    
    From sampling mandate[^[Sampling-Claude Edition](Sampling-Claude%20Edition%202a7f832e52ca80779afffadeaf0b2fbe.md)]:
    - Total budget: 300 sections (20% of corpus)
    - Allocation: 60% systematic, 40% adaptive
    """
    
    total_budget: int  # 300 sections
    used_budget: int
    remaining_budget: int
    
    # Budget allocation
    systematic_budget: int  # 180 sections
    systematic_used: int
    adaptive_budget: int  # 120 sections
    adaptive_used: int
    
    # Sampling efficiency metrics
    defect_detection_rate: float  # Target: 92-96%
    false_positive_rate: float  # Target: <15%
    confidence_interval: float  # Target: ±5%
    
    def can_afford_sample(self, sample_size: int) -> bool:
        """Check if budget allows for additional sampling."""
        return self.remaining_budget >= sample_size
    
    def allocate_sample(self, sample_size: int, mode: str) -> 'SamplingBudgetStatus':
        """
        Allocate budget for sampling, return updated status.
        
        IMPORTANT: This creates a new status object (immutable).
        Knowledge transfer requires immutable state snapshots.
        """
        
        if not self.can_afford_sample(sample_size):
            raise BudgetExceededError(
                f"Cannot afford {sample_size} samples. "
                f"Remaining: {self.remaining_budget}"
            )
        
        if mode == 'systematic':
            new_systematic_used = self.systematic_used + sample_size
        elif mode == 'adaptive':
            new_adaptive_used = self.adaptive_used + sample_size
        else:
            raise ValueError(f"Unknown mode: {mode}")
        
        return SamplingBudgetStatus(
            total_budget=[self.total](http://self.total)_budget,
            used_budget=self.used_budget + sample_size,
            remaining_budget=self.remaining_budget - sample_size,
            systematic_budget=self.systematic_budget,
            systematic_used=new_systematic_used if mode == 'systematic' else self.systematic_used,
            adaptive_budget=self.adaptive_budget,
            adaptive_used=new_adaptive_used if mode == 'adaptive' else self.adaptive_used,
            defect_detection_rate=self.defect_detection_rate,
            false_positive_rate=self.false_positive_rate,
            confidence_interval=self.confidence_interval
        )
```

---

## Communication Protocol: Continuation Prompts Analogy

### Continuation Prompt Pattern

**Standard Multi-Session Chat**:

```
Session 1:
User: "Help me write a report on climate change."
Assistant: [Generates introduction]

Session 2 (New context):
User: "Continue the report."
Continuation Prompt:
  "You are continuing a report on climate change.
   Previously written:
   - Introduction covering basic concepts
   - Emphasis on policy implications
   - Tone: formal, academic
   Continue with the next section on mitigation strategies."
```

**Ephemeral Agent Knowledge Transfer** (Same Pattern):

```python
class ContinuationPromptBuilder:
    """
    Build continuation prompts from knowledge transfers.
    
    Analogous to multi-session chat continuation prompts,
    but for agent-to-agent handoffs.
    """
    
    def build_prompt(self,
                    transfer: KnowledgeTransferPacket,
                    next_task: Task) -> str:
        """
        Convert knowledge transfer to continuation prompt.
        """
        
        return f"""
        You are Agent Generation {transfer.metadata['agent_generation']}.
        You are continuing work from {transfer.metadata['total_tasks']} previous tasks.
        
        ## Knowledge from Predecessor
        
        {transfer.compressed_state.serialize()}
        
        ## Learned Patterns (apply these insights)
        
        {self._format_patterns(transfer.learned_patterns)}
        
        ## Active Constraints (enforce strictly)
        
        {transfer.active_constraints.serialize()}
        
        ## Recent Failures (avoid these)
        
        {self._format_failures(transfer.failure_summary)}
        
        ## Sampling Budget Status
        
        {self._format_sampling_budget(transfer.sampling_status)}
        
        ## Current Task
        
        {next_task.description}
        
        IMPORTANT: You are a single-use agent. After completing this task:
        1. Execute the task
        2. Extract key learnings
        3. Update learned patterns
        4. Produce knowledge transfer for successor
        5. Terminate
        
        Your successor will receive your knowledge transfer and continue.
        """
    
    def _format_patterns(self, patterns: List[Pattern]) -> str:
        """Format patterns for prompt inclusion."""
        if not patterns:
            return "(No patterns learned yet)"
        
        return "\n".join([
            f"{i+1}. {p.description} [confidence: {p.confidence:.0%}]"
            for i, p in enumerate(patterns)
        ])
    
    def _format_failures(self, failures: List[FailureSummary]) -> str:
        """Format failures for prompt inclusion."""
        if not failures:
            return "(No recent failures)"
        
        return "\n".join([
            f"- {f.failure_type}: {f.summary}"
            for f in failures
        ])
    
    def _format_sampling_budget(self, budget: SamplingBudgetStatus) -> str:
        """Format sampling budget for prompt inclusion."""
        return f"""
        Total Budget: {[budget.total](http://budget.total)_budget} sections
        Used: {budget.used_budget} ({budget.used_budget/[budget.total](http://budget.total)_budget:.0%})
        Remaining: {budget.remaining_budget} ({budget.remaining_budget/[budget.total](http://budget.total)_budget:.0%})
        
        Systematic: {budget.systematic_used}/{budget.systematic_budget}
        Adaptive: {budget.adaptive_used}/{budget.adaptive_budget}
        
        Performance:
        - Defect detection: {budget.defect_detection_rate:.1%} (target: 92-96%)
        - False positives: {budget.false_positive_rate:.1%} (target: <15%)
        - Confidence: ±{budget.confidence_interval:.1%} (target: ±5%)
        
        ⚠️  MANDATORY: Use sampling engine for all quality scores (budget-constrained).
        """
```

### Protocol Messages

```python
@dataclass
class ProtocolMessage:
    """
    Communication protocol message for agent coordination.
    
    Types:
    - HANDOFF: Agent A → Agent B knowledge transfer
    - RESULT: Agent → System result report
    - STATUS: Agent → System status update
    - ERROR: Agent → System error report
    """
    
    message_type: str
    timestamp: datetime
    from_agent: str  # Agent generation ID
    to_agent: Optional[str]  # For HANDOFFs
    payload: Dict[str, Any]
    
    def serialize(self) -> str:
        """Serialize to audit log format."""
        return json.dumps({
            'type': self.message_type,
            'timestamp': self.timestamp.isoformat(),
            'from': self.from_agent,
            'to': [self.to](http://self.to)_agent,
            'payload_size': len(json.dumps(self.payload))
            # DO NOT include full payload (too expensive for audit)
        })

class AuditableProtocol:
    """
    Communication protocol with partial auditability.
    
    REQUIREMENT: "We need some level of auditability but not complete."
    
    Strategy:
    - Log all protocol messages (type, timestamp, sender, receiver)
    - Log message size (for debugging)
    - DO NOT log full message payload (too expensive)
    - DO provide reconstruction capability for debugging
    """
    
    def __init__(self, audit_level: str = 'partial'):
        self.audit_level = audit_level  # 'none', 'partial', 'full'
        self.message_log: List[ProtocolMessage] = []
    
    def send_message(self, message: ProtocolMessage):
        """Send message with audit logging."""
        
        if self.audit_level == 'none':
            # No audit
            pass
        
        elif self.audit_level == 'partial':
            # Log metadata only
            self.message_log.append(message)
            
            # Keep log bounded (last 1000 messages)
            if len(self.message_log) > 1000:
                self.message_log = self.message_log[-1000:]
        
        elif self.audit_level == 'full':
            # Log complete message (expensive)
            self.message_log.append(message)
            # Unbounded (will grow indefinitely)
        
        # Actual message delivery
        self._deliver_message(message)
    
    def reconstruct_trace(self,
                         agent_generation: int) -> List[ProtocolMessage]:
        """
        Reconstruct message trace for specific agent.
        
        Useful for debugging:
        - What messages did Agent 42 receive?
        - What messages did Agent 42 send?
        - What was the handoff chain?
        """
        
        return [
            msg for msg in self.message_log
            if msg.from_agent == f"agent-{agent_generation}"
            or [msg.to](http://msg.to)_agent == f"agent-{agent_generation}"
        ]
```

---

## Allocated Overhead for Knowledge Transfer

### Overhead Budget

```python
class OverheadBudget:
    """
    Explicit budget allocation for knowledge transfer overhead.
    
    PRINCIPLE: Knowledge transfer is PRIORITY, not afterthought.
    
    Budget allocation:
    - Task execution: 70% of total time/cost
    - Knowledge crystallization: 20% of total time/cost  (HIGH PRIORITY)
    - Transfer protocol: 10% of total time/cost
    """
    
    def __init__(self,
                total_budget: float,  # Total cost budget (e.g., API costs)
                total_time: float):   # Total time budget (e.g., seconds)
        
        # Allocate 70% to task execution
        self.task_execution_budget = total_budget * 0.70
        self.task_execution_time = total_time * 0.70
        
        # Allocate 20% to knowledge crystallization (HIGH PRIORITY)
        self.knowledge_crystallization_budget = total_budget * 0.20
        self.knowledge_crystallization_time = total_time * 0.20
        
        # Allocate 10% to transfer protocol
        self.transfer_protocol_budget = total_budget * 0.10
        self.transfer_protocol_time = total_time * 0.10
    
    def track_execution(self, actual_cost: float, actual_time: float):
        """Track actual resource usage against budget."""
        
        if actual_cost > self.task_execution_budget * 1.1:  # 10% tolerance
            raise BudgetExceededError(
                f"Task execution cost {actual_cost} exceeds budget "
                f"{self.task_execution_budget}"
            )
        
        if actual_time > self.task_execution_time * 1.2:  # 20% tolerance
            warnings.warn(
                f"Task execution time {actual_time}s exceeds budget "
                f"{self.task_execution_time}s"
            )

class KnowledgeCrystallizer:
    """
    Dedicated component for crystallizing knowledge from task execution.
    
    ALLOCATED RESOURCES: 20% of total}
```