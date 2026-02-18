# Rotational HR

# Multi-Part Changes Implementation: Agent Rotational Development Program for Book Writing System

## Implementation Overview

The rotational development framework enhances the dual-book multi-agent writing system through eight interconnected modifications that establish domain specialty cultivation based on historical chapter engagement while maintaining cross-functional development opportunities across different book topics, chapter types, and writing roles.

## Strategic Context

**Domain Specialization Challenge**: With 56 total chapters across two books (Climate Change Governance and AI Ethics), agents can develop deep expertise in specific domains (climate policy, AI safety, governance frameworks) or maintain generalist capabilities. The framework balances specialty cultivation with strategic cross-domain exposure.

**Chapter Type Diversity**: Each book follows a five-part structure (Crisis/Governance/Technical/Implementation/Synthesis), requiring different writing approaches and expertise. Agents benefit from both depth in specific chapter types and breadth across the full book structure.

**Writing Role Variation**: Agents serve in different roles (authoring, editing, verifying, coordinating), and rotational development ensures they build expertise while avoiding role stagnation.

## Part 1: Enhanced Base Agent with Rotational Capabilities

**File: `src/main/python/com/bookwriting/agents/content/BaseAuthorAgent.py`**

```python
# Add to existing MemoryAwareBaseAgent classfrom typing import Dict, List, Optional
from dataclasses import dataclass
from datetime import datetime, timedelta
@dataclassclass DomainExperience:
    """Tracks agent experience in a specific book domain"""    domain: str  # "climate_policy", "ai_ethics", "governance", etc.    activities: List['ActivityRecord']
    total_engagement_time: timedelta
    cumulative_impact: float    first_engagement: datetime
    last_engagement: datetime
    chapter_count: int    def record_activity(self, activity: str, impact: float, timestamp: datetime):
        """Record domain engagement activity"""        self.activities.append(ActivityRecord(activity, impact, timestamp))
        self.cumulative_impact += impact
        if not self.first_engagement:
            self.first_engagement = timestamp
        self.last_engagement = timestamp
        self.total_engagement_time = self.last_engagement - self.first_engagement
        if "chapter_complete" in activity:
            self.chapter_count += 1    def get_expertise_level(self) -> float:
        """Calculate expertise level (0.0 to 1.0)"""        if not self.activities:
            return 0.0        # Factors: engagement depth, impact quality, consistency        depth_score = min(1.0, self.total_engagement_time.days / 365)  # Cap at 1 year        impact_score = self.cumulative_impact / max(1, len(self.activities))
        consistency_score = self._calculate_consistency()
        return (depth_score * 0.4) + (impact_score * 0.35) + (consistency_score * 0.25)
    def _calculate_consistency(self) -> float:
        """Measure engagement consistency over time"""        if len(self.activities) < 3:
            return 0.5        # Calculate variance in activity impact scores        impacts = [a.impact for a in self.activities[-10:]]  # Last 10 activities        avg_impact = sum(impacts) / len(impacts)
        variance = sum((i - avg_impact) ** 2 for i in impacts) / len(impacts)
        # Lower variance = higher consistency        return max(0.0, 1.0 - (variance ** 0.5))
@dataclassclass ActivityRecord:
    """Individual activity within a domain"""    activity: str    impact: float    timestamp: datetime
@dataclassclass RotationalProfile:
    """Tracks agent's rotational development status"""    agent_id: str    primary_role: str  # "author", "editor", "verifier", "coordinator"    domain_history: Dict[str, DomainExperience]
    rotational_assignments: List['RotationalAssignment']
    current_specialty: Optional[str]
    secondary_specialties: List[str]
    def record_domain_work(self, domain: str, impact: float):
        """Record work in a specific domain"""        if domain not in self.domain_history:
            self.domain_history[domain] = DomainExperience(
                domain=domain,
                activities=[],
                total_engagement_time=timedelta(),
                cumulative_impact=0.0,
                first_engagement=None,
                last_engagement=None,
                chapter_count=0            )
        self.domain_history[domain].record_activity(
            activity=f"chapter_work_{self.primary_role}",
            impact=impact,
            timestamp=datetime.now()
        )
        # Recalculate specialties        self._update_specialties()
    def _update_specialties(self):
        """Determine primary and secondary specialties based on engagement"""        if not self.domain_history:
            self.current_specialty = "GENERALIST"            self.secondary_specialties = []
            return        # Rank domains by expertise level        ranked_domains = sorted(
            self.domain_history.items(),
            key=lambda x: x[1].get_expertise_level(),
            reverse=True        )
        if ranked_domains:
            self.current_specialty = ranked_domains[0][0]
            # Secondary specialties: domains with expertise > 0.5            self.secondary_specialties = [
                domain for domain, exp in ranked_domains[1:]
                if exp.get_expertise_level() > 0.5            ]
    def calculate_eligibility(self) -> 'RotationalEligibility':
        """Determine if agent is eligible for rotational assignment"""        if not self.current_specialty or self.current_specialty == "GENERALIST":
            return RotationalEligibility(
                eligible=False,
                reason="Insufficient specialty depth for rotation",
                requirements={"min_specialty_depth": 0.6}
            )
        # Check primary specialty depth        primary_expertise = self.domain_history[self.current_specialty].get_expertise_level()
        if primary_expertise < 0.6:
            return RotationalEligibility(
                eligible=False,
                reason=f"Primary specialty depth {primary_expertise:.2f} below threshold 0.6",
                requirements={"current_depth": primary_expertise, "required_depth": 0.6}
            )
        # Check recent activity        last_engagement = self.domain_history[self.current_specialty].last_engagement
        days_since_engagement = (datetime.now() - last_engagement).days
        if days_since_engagement > 90:
            return RotationalEligibility(
                eligible=False,
                reason=f"Last engagement {days_since_engagement} days ago exceeds threshold",
                requirements={"days_since": days_since_engagement, "max_days": 90}
            )
        return RotationalEligibility(
            eligible=True,
            reason="Agent meets all rotation eligibility criteria",
            requirements={}
        )
@dataclassclass RotationalEligibility:
    """Result of rotation eligibility assessment"""    eligible: bool    reason: str    requirements: Dict[str, any]
@dataclassclass RotationalAssignment:
    """A specific rotational development assignment"""    assignment_id: str    agent_id: str    source_domain: str    target_domain: str    duration: timedelta
    learning_objectives: List[str]
    start_time: datetime
    completion_time: Optional[datetime]
    completed: bool    def mark_completed(self):
        """Mark assignment as complete"""        self.completed = True        self.completion_time = datetime.now()
# Enhanced MemoryAwareBaseAgent with rotational capabilitiesclass EnhancedBaseAgent(MemoryAwareBaseAgent):
    def __init__(self, agent_id: str, role: str):
        super().__init__(agent_id, role)
        # Rotational development tracking        self.rotational_profile = RotationalProfile(
            agent_id=agent_id,
            primary_role=role,
            domain_history={},
            rotational_assignments=[],
            current_specialty=None,
            secondary_specialties=[]
        )
        self._initialize_domain_tracking()
    def _initialize_domain_tracking(self):
        """Initialize domain experience tracking for available domains"""        available_domains = [
            "climate_crisis",
            "climate_governance",
            "climate_technical",
            "climate_implementation",
            "climate_synthesis",
            "ai_crisis",
            "ai_governance",
            "ai_technical",
            "ai_implementation",
            "ai_synthesis",
            "cross_domain_themes"        ]
        for domain in available_domains:
            self.rotational_profile.domain_history[domain] = DomainExperience(
                domain=domain,
                activities=[],
                total_engagement_time=timedelta(),
                cumulative_impact=0.0,
                first_engagement=None,
                last_engagement=None,
                chapter_count=0            )
    def record_chapter_work(self, chapter_id: str, book: str, part: int,
                           chapter_num: int, impact: float):
        """Record work on a chapter with domain classification"""        # Determine domain from book and part        domain = self._classify_domain(book, part)
        # Record in rotational profile        self.rotational_profile.record_domain_work(domain, impact)
        # Also record in memory system for broader awareness        self.memory_manager.record_domain_expertise(
            agent_id=self.agent_id,
            domain=domain,
            knowledge_artifact={
                "chapter_id": chapter_id,
                "book": book,
                "part": part,
                "chapter_num": chapter_num,
                "role": self.rotational_profile.primary_role
            },
            confidence=impact
        )
    def _classify_domain(self, book: str, part: int) -> str:
        """Classify chapter into domain based on book and part"""        domain_map = {
            "climate": {
                1: "climate_crisis",
                2: "climate_governance",
                3: "climate_technical",
                4: "climate_implementation",
                5: "climate_synthesis"            },
            "ai_ethics": {
                1: "ai_crisis",
                2: "ai_governance",
                3: "ai_technical",
                4: "ai_implementation",
                5: "ai_synthesis"            }
        }
        return domain_map.get(book, {}).get(part, "unknown")
    def get_primary_specialty(self) -> str:
        """Return agent's primary domain specialty"""        return self.rotational_profile.current_specialty or "GENERALIST"    def get_rotational_eligibility(self) -> RotationalEligibility:
        """Check if agent is eligible for rotational assignment"""        return self.rotational_profile.calculate_eligibility()
    def begin_rotational_assignment(self, assignment: RotationalAssignment):
        """Begin a rotational development assignment"""        self.rotational_profile.rotational_assignments.append(assignment)
        # Update cognitive context to reflect rotation        self.current_cognitive_state.metadata["rotation_active"] = True        self.current_cognitive_state.metadata["rotation_target"] = assignment.target_domain
        # Load relevant domain knowledge from semantic memory        target_knowledge = self.memory_manager.semantic_memory.get_domain_knowledge(
            assignment.target_domain
        )
        # Inject into working memory        self.working_memory.load(target_knowledge)
```

## Part 2: Memory System Enhancement for Historical Expertise

**File: `src/main/python/com/bookwriting/memory/core/ContentMemoryManager.py`**

```python
# Add to existing ContentMemoryManager classclass HistoricalExpertiseIndex:
    """Tracks agent expertise development over time"""    def __init__(self):
        self.agent_domain_history: Dict[str, Dict[str, List['ExpertiseRecord']]] = {}
    def record_expertise(self, agent_id: str, domain: str,
                        confidence: float, timestamp: datetime):
        """Record an expertise demonstration"""        if agent_id not in self.agent_domain_history:
            self.agent_domain_history[agent_id] = {}
        if domain not in self.agent_domain_history[agent_id]:
            self.agent_domain_history[agent_id][domain] = []
        self.agent_domain_history[agent_id][domain].append(
            ExpertiseRecord(confidence, timestamp)
        )
    def get_domain_engagement_history(self, agent_id: str) -> Dict[str, int]:
        """Calculate historical engagement depth per domain"""        if agent_id not in self.agent_domain_history:
            return {}
        engagement_history = {}
        for domain, records in self.agent_domain_history[agent_id].items():
            if not records:
                continue            # Calculate engagement depth in days            earliest = min(r.timestamp for r in records)
            latest = max(r.timestamp for r in records)
            depth_days = (latest - earliest).days
            engagement_history[domain] = depth_days
        return engagement_history
    def calculate_expertise_profile(self, agent_id: str) -> Dict[str, float]:
        """Calculate expertise scores for all domains"""        if agent_id not in self.agent_domain_history:
            return {}
        profile = {}
        for domain, records in self.agent_domain_history[agent_id].items():
            if not records:
                profile[domain] = 0.0                continue            # Average confidence weighted by recency            total_weight = 0.0            weighted_sum = 0.0            now = datetime.now()
            for record in records:
                # More recent = higher weight                days_ago = (now - record.timestamp).days
                weight = 1.0 / (1.0 + days_ago / 30)  # Half-life of 30 days                weighted_sum += record.confidence * weight
                total_weight += weight
            profile[domain] = weighted_sum / total_weight if total_weight > 0 else 0.0        return profile
@dataclassclass ExpertiseRecord:
    """Single expertise demonstration record"""    confidence: float    timestamp: datetime
class ContentMemoryManager:
    def __init__(self, trust_service):
        # ... existing initialization        self.expertise_index = HistoricalExpertiseIndex()
        self.domain_repository = DomainKnowledgeRepository(self)
    def record_domain_expertise(self, agent_id: str, domain: str,
                                knowledge_artifact: dict, confidence: float):
        """Record agent expertise in a domain"""        # Create memory state for expertise        memory_state = {
            "type": "domain_expertise",
            "agent_id": agent_id,
            "domain": domain,
            "artifact": knowledge_artifact,
            "confidence": confidence,
            "timestamp": datetime.now()
        }
        # Store in semantic memory (long-term retention)        self.semantic_memory.store(
            key=f"expertise_{agent_id}_{domain}_{datetime.now().isoformat()}",
            value=memory_state
        )
        # Update expertise index        self.expertise_index.record_expertise(
            agent_id, domain, confidence, datetime.now()
        )
        # Update domain repository        self.domain_repository.add_knowledge_contribution(
            agent_id, domain, knowledge_artifact
        )
    def get_agent_expertise_profile(self, agent_id: str) -> Dict[str, float]:
        """Retrieve agent's expertise profile across all domains"""        return self.expertise_index.calculate_expertise_profile(agent_id)
    def calculate_agent_specialty(self, agent_id: str) -> str:
        """Determine agent's primary specialty based on historical engagement"""        engagement_history = self.expertise_index.get_domain_engagement_history(agent_id)
        if not engagement_history:
            return "GENERALIST"        # Find domain with deepest historical engagement        primary_domain = max(engagement_history.items(), key=lambda x: x[1])[0]
        return primary_domain
    def get_agent_domain_history(self, agent_id: str) -> Dict[str, int]:
        """Retrieve complete domain engagement history"""        return self.expertise_index.get_domain_engagement_history(agent_id)
class DomainKnowledgeRepository:
    """Repository of domain-specific knowledge contributed by agents"""    def __init__(self, memory_manager):
        self.memory_manager = memory_manager
        self.domain_contributions: Dict[str, List[dict]] = {}
    def add_knowledge_contribution(self, agent_id: str, domain: str, artifact: dict):
        """Add agent's knowledge contribution to domain"""        if domain not in self.domain_contributions:
            self.domain_contributions[domain] = []
        contribution = {
            "agent_id": agent_id,
            "artifact": artifact,
            "timestamp": datetime.now()
        }
        self.domain_contributions[domain].append(contribution)
    def get_domain_knowledge(self, domain: str) -> List[dict]:
        """Retrieve all knowledge contributions for a domain"""        return self.domain_contributions.get(domain, [])
```

## Part 3: Trust System Integration with Rotational Experience

**File: `src/main/python/com/bookwriting/trust/ReputationTracker.py`**

```python
from enum import Enum
from dataclasses import dataclass
from typing import Dict, List
from datetime import datetime
class SpecialtyLevel(Enum):
    """Levels of domain specialty achievement"""    NOVICE = (1, "Basic familiarity with supervised guidance")
    PRACTITIONER = (2, "Independent work with domain proficiency")
    SPECIALIST = (3, "Deep expertise with autonomous operation")
    EXPERT = (4, "Advanced mastery with innovation capability")
    MASTER = (5, "Organizational authority with mentoring responsibility")
    def __init__(self, level: int, description: str):
        self.level = level
        self.description = description
class RotationalObjective(Enum):
    """Objectives for rotational assignments"""    DOMAIN_BROADENING = "Expand expertise to new domain areas"    CROSS_FUNCTIONAL_UNDERSTANDING = "Build cross-domain connections"    INNOVATION_EXPOSURE = "Experience cutting-edge domain developments"    KNOWLEDGE_TRANSFER = "Share expertise across agent network"    LEADERSHIP_DEVELOPMENT = "Develop mentoring and coordination capabilities"@dataclassclass SpecialtyCredentials:
    """Tracks agent's specialty achievements"""    agent_id: str    specialties: Dict[str, SpecialtyLevel]
    evidence: Dict[str, List[dict]]
    def add_specialty(self, domain: str, level: SpecialtyLevel, evidence: dict):
        """Record specialty achievement with supporting evidence"""        self.specialties[domain] = level
        if domain not in self.evidence:
            self.evidence[domain] = []
        self.evidence[domain].append({
            "level": level,
            "evidence": evidence,
            "timestamp": datetime.now()
        })
class RotationalCompetencyTracker:
    """Tracks agent rotational assignment history"""    def __init__(self):
        self.agent_assignments: Dict[str, List['RotationalAssignmentRecord']] = {}
    def record_assignment(self, agent_id: str, from_domain: str,
                         to_domain: str, objective: RotationalObjective,
                         timestamp: datetime):
        """Record a rotational assignment"""        if agent_id not in self.agent_assignments:
            self.agent_assignments[agent_id] = []
        assignment = RotationalAssignmentRecord(
            from_domain=from_domain,
            to_domain=to_domain,
            objective=objective,
            timestamp=timestamp
        )
        self.agent_assignments[agent_id].append(assignment)
    def get_profile(self, agent_id: str) -> 'AgentRotationalProfile':
        """Generate rotational profile for agent"""        assignments = self.agent_assignments.get(agent_id, [])
        return AgentRotationalProfile(
            agent_id=agent_id,
            total_rotations=len(assignments),
            domains_experienced=set(a.to_domain for a in assignments),
            recent_assignments=assignments[-5:],  # Last 5 rotations            rotation_frequency=self._calculate_frequency(assignments)
        )
    def _calculate_frequency(self, assignments: List) -> float:
        """Calculate average rotation frequency (rotations per year)"""        if len(assignments) < 2:
            return 0.0        earliest = min(a.timestamp for a in assignments)
        latest = max(a.timestamp for a in assignments)
        years = (latest - earliest).days / 365.0        return len(assignments) / years if years > 0 else 0.0@dataclassclass RotationalAssignmentRecord:
    """Record of a single rotational assignment"""    from_domain: str    to_domain: str    objective: RotationalObjective
    timestamp: datetime
@dataclassclass AgentRotationalProfile:
    """Summary of agent's rotational development"""    agent_id: str    total_rotations: int    domains_experienced: set    recent_assignments: List[RotationalAssignmentRecord]
    rotation_frequency: floatclass ReputationTracker:
    def __init__(self, agent_id: str):
        self.agent_id = agent_id
        self.trust_score = 50  # Start at neutral        self.competency_tracker = RotationalCompetencyTracker()
        self.specialty_credentials = SpecialtyCredentials(
            agent_id=agent_id,
            specialties={},
            evidence={}
        )
    def record_rotational_assignment(self, from_domain: str, to_domain: str,
                                    objective: RotationalObjective):
        """Record new rotational assignment"""        self.competency_tracker.record_assignment(
            agent_id=self.agent_id,
            from_domain=from_domain,
            to_domain=to_domain,
            objective=objective,
            timestamp=datetime.now()
        )
        # Small trust boost for development opportunity        self.trust_score = min(100, self.trust_score + 0.5)
    def record_specialty_achievement(self, domain: str, level: SpecialtyLevel,
                                    evidence: dict):
        """Record specialty level achievement"""        self.specialty_credentials.add_specialty(domain, level, evidence)
        # Significant trust boost based on level        trust_impact = {
            SpecialtyLevel.NOVICE: 1,
            SpecialtyLevel.PRACTITIONER: 2,
            SpecialtyLevel.SPECIALIST: 5,
            SpecialtyLevel.EXPERT: 10,
            SpecialtyLevel.MASTER: 15        }
        boost = trust_impact.get(level, 0)
        self.trust_score = min(100, self.trust_score + boost)
    def get_enhanced_trust_metrics(self) -> 'EnhancedTrustMetrics':
        """Get comprehensive trust assessment"""        rotational_profile = self.competency_tracker.get_profile(self.agent_id)
        return EnhancedTrustMetrics(
            agent_id=self.agent_id,
            base_trust_score=self.trust_score,
            rotational_profile=rotational_profile,
            specialty_credentials=self.specialty_credentials,
            development_trajectory=self._assess_trajectory()
        )
    def _assess_trajectory(self) -> str:
        """Assess agent's development trajectory"""        profile = self.competency_tracker.get_profile(self.agent_id)
        if profile.rotation_frequency > 2.0:
            return "RAPID_DEVELOPMENT"        elif profile.rotation_frequency > 0.5:
            return "STEADY_GROWTH"        elif profile.total_rotations == 0:
            return "ESTABLISHING_FOUNDATION"        else:
            return "DEEPENING_EXPERTISE"@dataclassclass EnhancedTrustMetrics:
    """Comprehensive trust assessment including rotational development"""    agent_id: str    base_trust_score: float    rotational_profile: AgentRotationalProfile
    specialty_credentials: SpecialtyCredentials
    development_trajectory: str
```

## Part 4: Agent Coordinator Service Enhancement

**File: `src/main/python/com/bookwriting/orchestration/MasterOrchestrator.py`**

```python
# Add to existing MasterOrchestrator classclass RotationalDevelopmentManager:
    """Manages rotational development programs for agents"""    def __init__(self, trust_manager, memory_manager, event_bus):
        self.trust_manager = trust_manager
        self.memory_manager = memory_manager
        self.event_bus = event_bus
        self.active_programs: Dict[str, 'RotationalProgram'] = {}
        self.agent_assignment_history: Dict[str, List[RotationalAssignment]] = {}
        self.policy_engine = RotationalPolicyEngine()
        self._initialize_programs()
    def _initialize_programs(self):
        """Initialize standard rotational programs"""        # Climate domain progression        self.create_program("ClimateSpecialization", [
            ProgramRotation("climate_crisis", timedelta(days=60),
                          "Master crisis framing and urgency communication"),
            ProgramRotation("climate_governance", timedelta(days=60),
                          "Develop governance framework expertise"),
            ProgramRotation("climate_technical", timedelta(days=90),
                          "Build technical depth in climate solutions"),
            ProgramRotation("climate_implementation", timedelta(days=60),
                          "Learn real-world implementation strategies")
        ])
        # AI Ethics domain progression        self.create_program("AIEthicsSpecialization", [
            ProgramRotation("ai_crisis", timedelta(days=60),
                          "Understand AI ethical challenges and monopoly dynamics"),
            ProgramRotation("ai_governance", timedelta(days=60),
                          "Master AI governance frameworks and regulation"),
            ProgramRotation("ai_technical", timedelta(days=90),
                          "Develop AI safety and alignment expertise"),
            ProgramRotation("ai_implementation", timedelta(days=60),
                          "Study AI deployment case studies")
        ])
        # Cross-domain synthesis program        self.create_program("CrossDomainSynthesis", [
            ProgramRotation("climate_governance", timedelta(days=45),
                          "Study governance in climate context"),
            ProgramRotation("ai_governance", timedelta(days=45),
                          "Study governance in AI context"),
            ProgramRotation("cross_domain_themes", timedelta(days=60),
                          "Synthesize common governance principles")
        ])
    def create_program(self, name: str, rotations: List['ProgramRotation']):
        """Create a rotational development program"""        self.active_programs[name] = RotationalProgram(
            name=name,
            rotations=rotations
        )
    def assess_eligibility(self, agent_id: str) -> RotationalEligibility:
        """Assess if agent is eligible for rotation"""        # Get agent's domain engagement from memory        engagement_history = self.memory_manager.get_agent_domain_history(agent_id)
        if not engagement_history:
            return RotationalEligibility(
                eligible=False,
                reason="No established specialty for rotation",
                requirements={"min_domain_days": 90}
            )
        # Find primary specialty        primary_domain = max(engagement_history.items(), key=lambda x: x[1])[0]
        primary_depth = engagement_history[primary_domain]
        # Require at least 90 days in primary domain        if primary_depth < 90:
            return RotationalEligibility(
                eligible=False,
                reason=f"Primary domain depth {primary_depth} days below 90-day threshold",
                requirements={"current_depth": primary_depth, "required_depth": 90}
            )
        return RotationalEligibility(
            eligible=True,
            reason="Agent has sufficient specialty depth for rotation",
            requirements={}
        )
    def create_assignment(self, agent_id: str, target_domain: str,
                         duration: timedelta, objectives: List[str]) -> RotationalAssignment:
        """Create a new rotational assignment"""        # Determine current specialty        current_specialty = self.memory_manager.calculate_agent_specialty(agent_id)
        assignment = RotationalAssignment(
            assignment_id=f"ROT_{agent_id}_{int(datetime.now().timestamp())}",
            agent_id=agent_id,
            source_domain=current_specialty,
            target_domain=target_domain,
            duration=duration,
            learning_objectives=objectives,
            start_time=datetime.now(),
            completion_time=None,
            completed=False        )
        # Record assignment        if agent_id not in self.agent_assignment_history:
            self.agent_assignment_history[agent_id] = []
        self.agent_assignment_history[agent_id].append(assignment)
        return assignment
@dataclassclass ProgramRotation:
    """Single rotation within a development program"""    domain: str    duration: timedelta
    learning_objectives: str@dataclassclass RotationalProgram:
    """Complete rotational development program"""    name: str    rotations: List[ProgramRotation]
class RotationalPolicyEngine:
    """Defines policies for rotational assignments"""    def get_policy(self, agent_id: str) -> 'RotationalPolicy':
        """Get rotation policy for agent"""        return RotationalPolicy(
            min_specialty_depth_days=90,
            max_rotation_frequency_per_year=3,
            min_time_between_rotations_days=30        )
@dataclassclass RotationalPolicy:
    """Policy defining rotation eligibility criteria"""    min_specialty_depth_days: int    max_rotation_frequency_per_year: int    min_time_between_rotations_days: int    def assess_eligibility(self, specialty_depth_days: int,
                          rotation_history: List) -> RotationalEligibility:
        """Apply policy rules to assess eligibility"""        if specialty_depth_days < self.min_specialty_depth_days:
            return RotationalEligibility(
                eligible=False,
                reason=f"Specialty depth {specialty_depth_days} below {self.min_specialty_depth_days}",
                requirements={"depth": specialty_depth_days}
            )
        return RotationalEligibility(
            eligible=True,
            reason="Meets policy requirements",
            requirements={}
        )
class MasterOrchestrator:
    def __init__(self):
        # ... existing initialization        self.rotational_manager = RotationalDevelopmentManager(
            trust_manager=self.trust_manager,
            memory_manager=self.memory_manager,
            event_bus=self.event_bus
        )
        self.assignment_optimizer = SpecialtyAssignmentOptimizer(
            self.rotational_manager
        )
    async def initiate_rotational_assignment(self, agent_id: str,
                                            request: 'RotationalDevelopmentRequest'):
        """Initiate a rotational development assignment"""        # Validate agent exists        if agent_id not in self.registered_agents:
            raise ValueError(f"Agent not found: {agent_id}")
        # Check eligibility        eligibility = self.rotational_manager.assess_eligibility(agent_id)
        if not eligibility.eligible:
            raise ValueError(f"Agent not eligible: {eligibility.reason}")
        # Create assignment        assignment = self.rotational_manager.create_assignment(
            agent_id=agent_id,
            target_domain=request.target_domain,
            duration=request.duration,
            objectives=request.learning_objectives
        )
        # Update agent with assignment        agent = self.registered_agents[agent_id]
        agent.begin_rotational_assignment(assignment)
        # Record in event log        self.event_bus.publish({
            "type": "ROTATIONAL_ASSIGNMENT_STARTED",
            "agent_id": agent_id,
            "assignment": assignment,
            "timestamp": datetime.now()
        })
        return assignment
    def get_agent_specialties(self) -> Dict[str, str]:
        """Get all agent primary specialties"""        specialties = {}
        for agent_id, agent in self.registered_agents.items():
            specialties[agent_id] = agent.get_primary_specialty()
        return specialties
    async def assemble_specialty_team(self, request: 'SpecialtyTeamRequest'):
        """Assemble team with optimal specialty mix"""        return await self.assignment_optimizer.optimize_team_composition(
            required_specialties=request.required_specialties,
            rotational_quota=request.rotational_quota,
            available_agents=self.registered_agents
        )
@dataclassclass RotationalDevelopmentRequest:
    """Request for rotational assignment"""    target_domain: str    duration: timedelta
    learning_objectives: List[str]
@dataclassclass SpecialtyTeamRequest:
    """Request for specialty team assembly"""    required_specialties: List[str]
    rotational_quota: int  # Number of rotational slotsclass SpecialtyAssignmentOptimizer:
    """Optimizes agent assignments based on specialties"""    def __init__(self, rotational_manager):
        self.rotational_manager = rotational_manager
    async def optimize_team_composition(self, required_specialties: List[str],
                                       rotational_quota: int,
                                       available_agents: Dict) -> 'SpecialtyTeam':
        """Optimize team composition for required specialties"""        # Get specialty profiles for all agents        agent_profiles = {}
        for agent_id, agent in available_agents.items():
            agent_profiles[agent_id] = {
                "primary": agent.get_primary_specialty(),
                "secondary": agent.rotational_profile.secondary_specialties
            }
        # Match agents to required specialties        assignments = {}
        for specialty in required_specialties:
            # Find agents with this as primary specialty            primary_matches = [
                agent_id for agent_id, profile in agent_profiles.items()
                if profile["primary"] == specialty
            ]
            if primary_matches:
                assignments[specialty] = primary_matches[0]
            else:
                # Find agents with this as secondary specialty                secondary_matches = [
                    agent_id for agent_id, profile in agent_profiles.items()
                    if specialty in profile["secondary"]
                ]
                if secondary_matches:
                    assignments[specialty] = secondary_matches[0]
        return SpecialtyTeam(
            required_specialties=required_specialties,
            agent_assignments=assignments,
            rotational_slots=rotational_quota
        )
@dataclassclass SpecialtyTeam:
    """Team composition with specialty assignments"""    required_specialties: List[str]
    agent_assignments: Dict[str, str]  # specialty -> agent_id    rotational_slots: int
```

## Summary

This rotational development framework provides comprehensive agent development capabilities adapted for book writing operations:

1. **Domain Specialization**: Agents develop deep expertise in specific book domains (climate policy, AI ethics, governance, etc.) based on historical chapter engagement
2. **Cross-Functional Development**: Strategic rotational assignments ensure agents maintain breadth while building depth
3. **Memory Integration**: All expertise tracked in semantic memory for system-wide awareness
4. **Trust Enhancement**: Specialty achievements boost agent trust scores and influence task assignment
5. **Team Optimization**: System can assemble optimal teams based on specialty requirements

The framework balances specialty cultivation (deepest expertise in specific domains) with strategic cross-domain exposure, ensuring the agent network can handle the full complexity of dual-book production while maintaining high quality standards across all domains and chapter types.

## Implementation Timeline

- **Weeks 1-2**: Implement base rotational tracking in agents
- **Weeks 3-4**: Integrate with memory system for expertise tracking
- **Weeks 5-6**: Add trust system integration and specialty credentials
- **Weeks 7-8**: Implement rotational development manager
- **Weeks 9-10**: Create team optimization and assignment logic
- **Weeks 11-12**: Testing, validation, and deployment

Total implementation effort: 12 weeks, integrating seamlessly with the Phase 1 timeline of the base system.