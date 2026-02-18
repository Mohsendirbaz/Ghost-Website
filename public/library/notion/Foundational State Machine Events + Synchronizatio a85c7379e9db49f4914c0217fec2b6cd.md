# Foundational State Machine: Events + Synchronization

# Foundational State Machine: Events + Synchronization

## Fundamental Principle

**Any concurrent system can be reduced to two primitives:**

1. **State machine** (events)
2. **Synchronization** (locks/conditions)

This is the **bedrock** upon which all higher-level orchestration is built:

- Saturation-based agent lifecycles
- Budget allocation across specialist departments
- Knowledge transfer protocols
- System rejuvenation (restart)

All complex behaviors emerge from simple state transitions with synchronization.

---

## Core Abstraction: The Transition Primitive

```python
def transition(self, from_state, to_state):
    """
    The fundamental building block.
    
    Process:
    1. Wait for from_state to be set (blocks until ready)
    2. Clear from_state
    3. Set to_state
    
    Thread-safe by construction.
    """
    from_state.wait()  # BLOCK until ready
    to_state.set()     # SIGNAL next state
```

**That's it.** Everything else is composition of this primitive.

---

## Pipeline State Machine Implementation

### Agent Lifecycle States

```python
import threading
from typing import Dict, Set, Callable, Optional
from dataclasses import dataclass
from enum import Enum

class AgentState(Enum):
    """Agent lifecycle states."""
    CREATED = "created"
    LOADING_KNOWLEDGE = "loading_knowledge"
    READY = "ready"
    EXECUTING = "executing"
    SATURATING = "saturating"           # Context approaching capacity
    CRYSTALLIZING = "crystallizing"     # Compressing knowledge
    TRANSFERRING = "transferring"       # Handoff to successor
    DISPOSED = "disposed"

class OrchestrationState(Enum):
    """Orchestration-level states."""
    IDLE = "idle"
    BUDGET_ALLOCATED = "budget_allocated"     # Budget distributed to specialists
    SYNC_PENDING = "sync_pending"
    SYNC_IN_PROGRESS = "sync_in_progress"
    SYNC_COMPLETE = "sync_complete"
    REJUVENATING = "rejuvenating"             # System restart
    SHUTDOWN = "shutdown"

class SpecialistState(Enum):
    """Specialist department states (quality assessors, validators, etc.)."""
    IDLE = "idle"
    BUDGET_ASSIGNED = "budget_assigned"
    WORKING = "working"
    BUDGET_DEPLETED = "budget_depleted"
    COMPLETED = "completed"
```

### The State Machine

```python
class PipelineStateMachine:
    """
    Foundational state machine for concurrent agent orchestration.
    
    Core abstraction: Every state transition is an event with synchronization.
    All higher-level logic builds on top of this primitive.
    
    Design principles:
    1. States are threading.Event objects (set/clear/wait)
    2. Transitions are synchronized: wait(from_state) → set(to_state)
    3. No business logic here - just state + sync primitives
    4. Thread-safe by construction
    5. Extensible through guards (conditions) and actions (side effects)
    """
    
    def __init__(self):
        # Agent-level state events (per agent ID)
        self.agent_states: Dict[str, Dict[AgentState, threading.Event]] = {}
        
        # Orchestration-level state events (global)
        self.orchestration_states: Dict[OrchestrationState, threading.Event] = {
            state: threading.Event() for state in OrchestrationState
        }
        
        # Specialist-level state events (per specialist ID)
        self.specialist_states: Dict[str, Dict[SpecialistState, threading.Event]] = {}
        
        # Initialize orchestration to IDLE
        self.orchestration_states[OrchestrationState.IDLE].set()
        
        # State transition lock (serialize transitions)
        self._transition_lock = threading.Lock()
        
        # Transition history (for debugging and audit)
        self._transition_log = []
        
        # Budget tracking (first-class concern)
        self._budget_allocations: Dict[str, float] = {}  # specialist_id -> budget
        self._budget_consumed: Dict[str, float] = {}     # specialist_id -> consumed
    
    def register_agent(self, agent_id: str):
        """Register new agent with initial state CREATED."""
        with self._transition_lock:
            self.agent_states[agent_id] = {
                state: threading.Event() for state in AgentState
            }
            # New agent starts in CREATED state
            self.agent_states[agent_id][AgentState.CREATED].set()
    
    def register_specialist(self, specialist_id: str, initial_budget: float = 0.0):
        """Register new specialist department with initial budget."""
        with self._transition_lock:
            self.specialist_states[specialist_id] = {
                state: threading.Event() for state in SpecialistState
            }
            # New specialist starts in IDLE state
            self.specialist_states[specialist_id][SpecialistState.IDLE].set()
            
            # Initialize budget tracking
            self._budget_allocations[specialist_id] = initial_budget
            self._budget_consumed[specialist_id] = 0.0
    
    def transition(self, 
                  entity_id: Optional[str],
                  entity_type: str,  # 'agent' | 'orchestration' | 'specialist'
                  from_state: Enum, 
                  to_state: Enum,
                  timeout: Optional[float] = None) -> bool:
        """
        Fundamental state transition primitive.
        
        Process:
        1. Wait for from_state to be set (blocks until ready)
        2. Clear from_state
        3. Set to_state
        
        Args:
            entity_id: Entity ID (None for orchestration-level)
            entity_type: 'agent' | 'orchestration' | 'specialist'
            from_state: State to wait for
            to_state: State to transition to
            timeout: Optional timeout in seconds
        
        Returns:
            True if transition succeeded, False if timeout
        """
        
        # Select state dict based on entity type
        if entity_type == 'agent':
            if entity_id not in self.agent_states:
                raise ValueError(f"Unknown agent: {entity_id}")
            state_dict = self.agent_states[entity_id]
        elif entity_type == 'orchestration':
            state_dict = self.orchestration_states
        elif entity_type == 'specialist':
            if entity_id not in self.specialist_states:
                raise ValueError(f"Unknown specialist: {entity_id}")
            state_dict = self.specialist_states[entity_id]
        else:
            raise ValueError(f"Unknown entity type: {entity_type}")
        
        # Get event objects
        from_event = state_dict[from_state]
        to_event = state_dict[to_state]
        
        # STEP 1: Wait for from_state (blocks)
        if not from_event.wait(timeout=timeout):
            return False  # Timeout
        
        # STEP 2 & 3: Atomically clear from_state and set to_state
        with self._transition_lock:
            from_event.clear()
            to_event.set()
            
            # Log transition
            self._transition_log.append({
                'timestamp': threading.current_thread().name,
                'entity_type': entity_type,
                'entity_id': entity_id,
                'from': from_state.value,
                'to': to_state.value
            })
        
        return True
    
    def wait_for_state(self, 
                      entity_id: Optional[str],
                      entity_type: str,
                      state: Enum,
                      timeout: Optional[float] = None) -> bool:
        """
        Wait for entity to reach specific state.
        
        Non-destructive: does not clear the state.
        """
        if entity_type == 'agent':
            state_dict = self.agent_states[entity_id]
        elif entity_type == 'orchestration':
            state_dict = self.orchestration_states
        elif entity_type == 'specialist':
            state_dict = self.specialist_states[entity_id]
        else:
            raise ValueError(f"Unknown entity type: {entity_type}")
        
        return state_dict[state].wait(timeout=timeout)
    
    def get_current_state(self, entity_id: Optional[str], entity_type: str) -> Enum:
        """
        Get current state (first set event).
        
        Note: In well-behaved code, exactly one state should be set.
        """
        if entity_type == 'agent':
            state_dict = self.agent_states[entity_id]
            states = AgentState
        elif entity_type == 'orchestration':
            state_dict = self.orchestration_states
            states = OrchestrationState
        elif entity_type == 'specialist':
            state_dict = self.specialist_states[entity_id]
            states = SpecialistState
        else:
            raise ValueError(f"Unknown entity type: {entity_type}")
        
        for state in states:
            if state_dict[state].is_set():
                return state
        
        raise RuntimeError(f"No state set for {entity_type} {entity_id}")
    
    def barrier(self, 
               entity_ids: Set[str], 
               entity_type: str,
               state: Enum, 
               timeout: Optional[float] = None) -> bool:
        """
        Barrier synchronization: wait for ALL entities to reach state.
        
        Returns True if all reached state, False if timeout.
        """
        for entity_id in entity_ids:
            if not self.wait_for_state(entity_id, entity_type, state, timeout):
                return False
        return True
    
    # Budget management methods (first-class concern)
    
    def allocate_budget(self, specialist_id: str, amount: float):
        """Allocate budget to specialist department."""
        with self._transition_lock:
            if specialist_id not in self._budget_allocations:
                raise ValueError(f"Unknown specialist: {specialist_id}")
            self._budget_allocations[specialist_id] += amount
    
    def consume_budget(self, specialist_id: str, amount: float) -> bool:
        """Consume budget. Returns False if insufficient budget."""
        with self._transition_lock:
            if specialist_id not in self._budget_allocations:
                raise ValueError(f"Unknown specialist: {specialist_id}")
            
            available = self._budget_allocations[specialist_id] - self._budget_consumed[specialist_id]
            if amount > available:
                return False  # Insufficient budget
            
            self._budget_consumed[specialist_id] += amount
            return True
    
    def get_budget_status(self, specialist_id: str) -> dict:
        """Get budget status for specialist."""
        with self._transition_lock:
            return {
                'allocated': self._budget_allocations.get(specialist_id, 0.0),
                'consumed': self._budget_consumed.get(specialist_id, 0.0),
                'remaining': self._budget_allocations.get(specialist_id, 0.0) - 
                           self._budget_consumed.get(specialist_id, 0.0)
            }
    
    def reallocate_budget(self, from_specialist: str, to_specialist: str, amount: float) -> bool:
        """Reallocate budget between specialists."""
        with self._transition_lock:
            # Check if source has enough remaining budget
            from_remaining = (self._budget_allocations.get(from_specialist, 0.0) - 
                            self._budget_consumed.get(from_specialist, 0.0))
            
            if amount > from_remaining:
                return False  # Insufficient budget to reallocate
            
            # Transfer budget
            self._budget_allocations[from_specialist] -= amount
            self._budget_allocations[to_specialist] += amount
            return True
```

---

## Declarative Transitions: Guards and Actions

```python
@dataclass
class StateTransition:
    """Declarative state transition specification."""
    from_state: Enum
    to_state: Enum
    condition: Optional[Callable[[], bool]] = None  # Optional guard
    action: Optional[Callable[[], None]] = None     # Optional side effect

class StateMachineOrchestrator:
    """
    Higher-level orchestrator built on PipelineStateMachine.
    
    Provides:
    - Declarative transition rules
    - Conditional transitions (guards)
    - Side effects on transitions (actions)
    
    This is where business logic lives:
    - Saturation checks (guards)
    - Budget allocation (actions)
    - Knowledge crystallization (actions)
    - System rejuvenation (actions)
    """
    
    def __init__(self):
        self.state_machine = PipelineStateMachine()
        
        # Transition rules (declarative)
        self.transition_rules: Dict[Enum, list[StateTransition]] = {}
    
    def register_transition(self, transition: StateTransition):
        """Register declarative transition rule."""
        if transition.from_state not in self.transition_rules:
            self.transition_rules[transition.from_state] = []
        self.transition_rules[transition.from_state].append(transition)
    
    def execute_transition(self, 
                          entity_id: Optional[str],
                          entity_type: str,
                          transition: StateTransition,
                          timeout: Optional[float] = None) -> bool:
        """
        Execute transition with optional guard and action.
        
        Process:
        1. Check guard condition (if present)
        2. Execute state transition (wait + set)
        3. Execute side-effect action (if present)
        """
        
        # Check guard
        if transition.condition and not transition.condition():
            return False  # Guard failed, skip transition
        
        # Execute state transition
        success = self.state_machine.transition(
            entity_id=entity_id,
            entity_type=entity_type,
            from_state=transition.from_state,
            to_state=[transition.to](http://transition.to)_state,
            timeout=timeout
        )
        
        if success and transition.action:
            # Execute side effect
            transition.action()
        
        return success
```

---

## Agent Lifecycle Example

```python
def run_agent_lifecycle(self, agent_id: str):
    """
    Run agent through standard lifecycle using declarative transitions.
    
    Lifecycle:
    CREATED → LOADING_KNOWLEDGE → READY → EXECUTING → 
    SATURATING → CRYSTALLIZING → TRANSFERRING → DISPOSED
    """
    
    # Register agent
    self.state_machine.register_agent(agent_id)
    
    # Define lifecycle transitions
    lifecycle = [
        StateTransition(
            from_state=AgentState.CREATED,
            to_state=AgentState.LOADING_KNOWLEDGE,
            action=lambda: self._load_knowledge(agent_id)
        ),
        StateTransition(
            from_state=AgentState.LOADING_KNOWLEDGE,
            to_state=AgentState.READY
        ),
        StateTransition(
            from_state=AgentState.READY,
            to_state=AgentState.EXECUTING,
            action=lambda: self._start_execution(agent_id)
        ),
        StateTransition(
            from_state=AgentState.EXECUTING,
            to_state=AgentState.SATURATING,
            condition=lambda: self._check_saturation(agent_id)  # GUARD
        ),
        StateTransition(
            from_state=AgentState.SATURATING,
            to_state=AgentState.CRYSTALLIZING,
            action=lambda: self._start_crystallization(agent_id)
        ),
        StateTransition(
            from_state=AgentState.CRYSTALLIZING,
            to_state=AgentState.TRANSFERRING,
            action=lambda: self._transfer_knowledge(agent_id)
        ),
        StateTransition(
            from_state=AgentState.TRANSFERRING,
            to_state=AgentState.DISPOSED,
            action=lambda: self._dispose_agent(agent_id)
        )
    ]
    
    # Execute lifecycle
    for transition in lifecycle:
        success = self.execute_transition(
            entity_id=agent_id,
            entity_type='agent',
            transition=transition,
            timeout=30.0  # 30 second timeout per transition
        )
        
        if not success:
            raise RuntimeError(
                f"Agent {agent_id} lifecycle failed at "
                f"{transition.from_state} → {[transition.to](http://transition.to)_state}"
            )
```

---

## Budget-Aware Specialist Coordination

```python
def coordinate_specialists(self, job_budget: float, specialists: list[str]):
    """
    Coordinate specialist departments with budget allocation.
    
    Process:
    1. Distribute job budget among specialists
    2. Transition orchestration: IDLE → BUDGET_ALLOCATED
    3. Specialists work until budget depleted
    4. Barrier sync: wait for all specialists to complete
    5. Transition orchestration: BUDGET_ALLOCATED → IDLE
    """
    
    # Register specialists
    budget_per_specialist = job_budget / len(specialists)
    for specialist_id in specialists:
        self.state_machine.register_specialist(specialist_id, budget_per_specialist)
    
    # Transition: IDLE → BUDGET_ALLOCATED
    self.state_machine.transition(
        entity_id=None,
        entity_type='orchestration',
        from_state=OrchestrationState.IDLE,
        to_state=OrchestrationState.BUDGET_ALLOCATED
    )
    
    # Start specialists
    for specialist_id in specialists:
        # Transition: IDLE → BUDGET_ASSIGNED → WORKING
        self.state_machine.transition(
            entity_id=specialist_id,
            entity_type='specialist',
            from_state=SpecialistState.IDLE,
            to_state=SpecialistState.BUDGET_ASSIGNED
        )
        
        self.state_machine.transition(
            entity_id=specialist_id,
            entity_type='specialist',
            from_state=SpecialistState.BUDGET_ASSIGNED,
            to_state=SpecialistState.WORKING
        )
    
    # Barrier: wait for all specialists to complete or deplete budget
    self.state_machine.barrier(
        entity_ids=set(specialists),
        entity_type='specialist',
        state=SpecialistState.COMPLETED,
        timeout=300.0  # 5 minute timeout
    )
    
    # Transition: BUDGET_ALLOCATED → IDLE
    self.state_machine.transition(
        entity_id=None,
        entity_type='orchestration',
        from_state=OrchestrationState.BUDGET_ALLOCATED,
        to_state=OrchestrationState.IDLE
    )
```

---

## System Rejuvenation (Restart)

```python
def rejuvenate_system(self):
    """
    Rejuvenate = restart the entire apparatus.
    
    Process:
    1. Transition: current_state → REJUVENATING
    2. Dispose all agents
    3. Reset all specialists
    4. Clear budget allocations
    5. Transition: REJUVENATING → IDLE
    """
    
    # Get current orchestration state
    current_state = self.state_machine.get_current_state(None, 'orchestration')
    
    # Transition to REJUVENATING
    self.state_machine.transition(
        entity_id=None,
        entity_type='orchestration',
        from_state=current_state,
        to_state=OrchestrationState.REJUVENATING
    )
    
    # Dispose all agents
    for agent_id in list(self.state_machine.agent_states.keys()):
        agent_state = self.state_machine.get_current_state(agent_id, 'agent')
        if agent_state != AgentState.DISPOSED:
            # Force transition to DISPOSED
            self.state_machine.transition(
                entity_id=agent_id,
                entity_type='agent',
                from_state=agent_state,
                to_state=AgentState.DISPOSED
            )
    
    # Reset specialists
    for specialist_id in list(self.state_machine.specialist_states.keys()):
        specialist_state = self.state_machine.get_current_state(specialist_id, 'specialist')
        if specialist_state != SpecialistState.IDLE:
            # Force transition to IDLE
            self.state_machine.transition(
                entity_id=specialist_id,
                entity_type='specialist',
                from_state=specialist_state,
                to_state=SpecialistState.IDLE
            )
        
        # Clear budget
        with self.state_machine._transition_lock:
            self.state_machine._budget_allocations[specialist_id] = 0.0
            self.state_machine._budget_consumed[specialist_id] = 0.0
    
    # Transition back to IDLE
    self.state_machine.transition(
        entity_id=None,
        entity_type='orchestration',
        from_state=OrchestrationState.REJUVENATING,
        to_state=OrchestrationState.IDLE
    )
```

---

## Key Properties

### Thread Safety

- All state transitions are atomic (protected by `_transition_lock`)
- `threading.Event` primitives are thread-safe
- No race conditions by construction
- Budget operations are serialized

### Composability

- Agent-level states (per agent)
- Orchestration-level states (global)
- Specialist-level states (per specialist)
- All use same primitive: `wait(from_state)` → `set(to_state)`

### Observability

- Transition log provides complete audit trail
- Current state query for live monitoring
- Barrier synchronization for coordination verification
- Budget tracking for resource accountability

### Extensibility

- Guards (conditional transitions): Saturation checks, budget checks, etc.
- Actions (side effects): Knowledge transfer, budget allocation, logging, etc.
- Declarative transition rules
- Budget as first-class concern

---

## What Builds on This Foundation

### Layer 1: State Machine (This Document)

- Pure state + synchronization primitives
- No business logic
- Thread-safe by construction
- Budget tracking built-in

### Layer 2: Orchestration Logic

- Saturation-based agent lifecycles
- Budget allocation strategies
- Knowledge transfer protocols
- Specialist coordination
- Partial rejuvenation vs full restart

### Layer 3: Application Logic

- Quality constraints
- Sampling mandates
- Constraint enforcement policies
- Compositional analysis

---

## Why This is the Foundation

**Separation of Concerns**:

- State machine layer: Pure state + sync (no business logic)
- Orchestration layer: Agent lifecycles, budget allocation (builds on state machine)
- Application layer: Quality, sampling, composition (builds on orchestration)

**Debugging**:

- State transition log provides complete audit trail
- Current state query for live monitoring
- Barrier synchronization for coordination verification
- Budget tracking for resource accountability

**Testing**:

- State machine can be tested independently
- Mock state transitions for orchestration tests
- Deterministic behavior (no race conditions)
- Budget operations are atomic and verifiable

**Formal Verification**:

- State machine is finite and explicit
- Transitions are atomic and serialized
- Properties can be verified (no deadlocks, eventual progress, budget conservation)

---

## Summary

**The foundation is simple:**

```python
def transition(from_state, to_state):
    from_state.wait()    # Block until ready
    to_state.set()       # Signal next state
```

**Everything else is composition:**

- Agent lifecycles with saturation monitoring
- Budget allocation across specialist departments
- Knowledge transfer on agent disposal
- System rejuvenation (full restart)
- Bounded sync cycles
- Barrier synchronization

**The pattern:**

1. Define states (Enum)
2. Register entities (agents, specialists, orchestration)
3. Define transitions with guards and actions
4. Execute lifecycle
5. Monitor state and budget
6. Log transitions for audit

All concurrent coordination reduces to this primitive.