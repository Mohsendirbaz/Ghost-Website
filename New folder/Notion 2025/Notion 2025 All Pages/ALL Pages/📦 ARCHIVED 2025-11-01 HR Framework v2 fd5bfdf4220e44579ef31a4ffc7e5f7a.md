# 📦 ARCHIVED 2025-11-01: HR Framework v2

# Multi-Part Changes Implementation: HR Rotational Development Program Framework

## Implementation Overview

The rotational development framework enhances the existing multi-agent architecture through eight interconnected modifications that establish specialty cultivation based on historical field engagement while maintaining cross-functional development opportunities.

## Part 1: Enhanced BaseAgent with Rotational Capabilities

**File: `src/main/java/com/IDE/plugin/ai/multiagent/agent/EnhancedBaseAgent.java`**

```java
// Add to existing EnhancedBaseAgent classprivate final RotationalProfile rotationalProfile;private final SpecialtyTracker specialtyTracker;private final Map<String, DomainExperience> domainHistory;// Enhanced constructor additionprotected EnhancedBaseAgent(String agentId, AgentRole role) { super(agentId, role); this.rotationalProfile = new RotationalProfile(agentId, role); this.specialtyTracker = new SpecialtyTracker(agentId); this.domainHistory = new ConcurrentHashMap<>();initializeDomainTracking();}private void initializeDomainTracking() { // Initialize domain experience tracking for (String domain : getAvailableDomains()) { domainHistory.put(domain, new DomainExperience(domain)); }}protected void recordDomainActivity(String domain, String activity, double impact) { DomainExperience experience = domainHistory.get(domain); if (experience != null) { experience.recordActivity(activity, impact, System.currentTimeMillis()); specialtyTracker.updateDomainEngagement(domain, experience);// Update rotational profile rotationalProfile.recordDomainWork(domain, impact); }}public String getPrimarySpecialty() { return specialtyTracker.calculatePrimarySpecialty(domainHistory);}public RotationalAssignmentEligibility getRotationalEligibility() { return rotationalProfile.calculateEligibility(domainHistory);}// Inner classes for domain trackingprivate static class DomainExperience { private final String domain; private final List<ActivityRecord> activities; private long totalEngagementTime; private double cumulativeImpact; private long firstEngagement; private long lastEngagement;public DomainExperience(String domain) { this.domain = domain; this.activities = new CopyOnWriteArrayList<>(); this.totalEngagementTime = 0; this.cumulativeImpact = 0.0; this.firstEngagement = 0; this.lastEngagement = 0; }public void recordActivity(String activity, double impact, long timestamp) { activities.add(new ActivityRecord(activity, impact, timestamp)); cumulativeImpact += impact;if (firstEngagement == 0) { firstEngagement = timestamp; } lastEngagement = timestamp; totalEngagementTime = lastEngagement - firstEngagement; }public long getHistoricalDepth() { return totalEngagementTime; }public double getExpertiseLevel() { return cumulativeImpact / Math.max(1, activities.size()); }}private static class ActivityRecord { private final String activity; private final double impact; private final long timestamp;public ActivityRecord(String activity, double impact, long timestamp) { this.activity = activity; this.impact = impact; this.timestamp = timestamp; }}
```

## Part 2: Memory System Enhancement for Historical Expertise

**File: `src/main/java/com/IDE/plugin/ai/multiagent/memory/core/MemoryStateManager.java`**

```java
// Add to existing MemoryStateManager classprivate final HistoricalExpertiseIndex expertiseIndex;private final DomainKnowledgeRepository domainRepository;// Enhanced constructor additionpublic MemoryStateManager(TrustVerificationService trustService) { // ... existing initialization this.expertiseIndex = new HistoricalExpertiseIndex(); this.domainRepository = new DomainKnowledgeRepository(this);}public void recordDomainExpertise(String agentId, String domain,
Object knowledgeArtifact, double confidence) { MemoryState expertiseState = new MemoryState( generateExpertiseKey(agentId, domain), knowledgeArtifact, MemoryType.SEMANTIC, agentId, TrustLevel.VERIFIED );// Store in semantic memory for long-term retention semanticMemory.store(expertiseState);// Update expertise index expertiseIndex.recordExpertise(agentId, domain, confidence, System.currentTimeMillis());// Update domain repository domainRepository.addKnowledgeContribution(agentId, domain, knowledgeArtifact);}public Map<String, Double> getAgentExpertiseProfile(String agentId) { return expertiseIndex.calculateExpertiseProfile(agentId);}public String calculateAgentSpecialty(String agentId) { Map<String, Long> domainHistory = expertiseIndex.getDomainEngagementHistory(agentId);return domainHistory.entrySet().stream() .max(Map.Entry.comparingByValue()) .map(Map.Entry::getKey) .orElse("GENERALIST");}private String generateExpertiseKey(String agentId, String domain) { return String.format("expertise.%s.%s.%d", agentId, domain, System.currentTimeMillis());}// Inner class for expertise trackingprivate static class HistoricalExpertiseIndex { private final Map<String, Map<String, List<ExpertiseRecord>>> agentDomainHistory;public HistoricalExpertiseIndex() { this.agentDomainHistory = new ConcurrentHashMap<>(); }public void recordExpertise(String agentId, String domain, double confidence, long timestamp) { agentDomainHistory.computeIfAbsent(agentId, k -> new ConcurrentHashMap<>()) .computeIfAbsent(domain, k -> new CopyOnWriteArrayList<>()) .add(new ExpertiseRecord(confidence, timestamp)); }public Map<String, Long> getDomainEngagementHistory(String agentId) { Map<String, List<ExpertiseRecord>> domains = agentDomainHistory.get(agentId); if (domains == null) return Collections.emptyMap();return domains.entrySet().stream() .collect(Collectors.toMap( Map.Entry::getKey, entry -> calculateEngagementDepth(entry.getValue()) )); }private long calculateEngagementDepth(List<ExpertiseRecord> records) { if (records.isEmpty()) return 0;long earliest = records.stream().mapToLong(r -> r.timestamp).min().orElse(0); long latest = records.stream().mapToLong(r -> r.timestamp).max().orElse(0);return latest - earliest; // Historical depth in milliseconds }}private static class ExpertiseRecord { final double confidence; final long timestamp;ExpertiseRecord(double confidence, long timestamp) { this.confidence = confidence; this.timestamp = timestamp; }}
```

## Part 3: Trust System Integration with Rotational Experience

**File: `src/main/java/com/IDE/plugin/ai/multiagent/trust/reputation/ReputationManager.java`**

```java
// Add to existing ReputationManager classprivate final RotationalCompetencyTracker competencyTracker;private final Map<String, SpecialtyCredentials> specialtyCredentials;// Enhanced constructor additionpublic ReputationManager(ReputationConfig config) { // ... existing initialization this.competencyTracker = new RotationalCompetencyTracker(); this.specialtyCredentials = new ConcurrentHashMap<>();}public void recordRotationalAssignment(String agentId, String fromDomain,
String toDomain, RotationalObjective objective) { TrustEvent rotationalEvent = new TrustEvent( eventCounter.incrementAndGet(), agentId, TrustEventType.ROTATIONAL_ASSIGNMENT, 0.05, // Small positive impact for learning opportunity Instant.now(), Map.of( "fromDomain", fromDomain, "toDomain", toDomain, "objective", objective.toString() ) );recordTrustEvent(agentId, TrustEventType.ROTATIONAL_ASSIGNMENT, 0.05,
rotationalEvent.getMetadata());competencyTracker.recordAssignment(agentId, fromDomain, toDomain, objective);}public void recordSpecialtyAchievement(String agentId, String domain,
SpecialtyLevel level, Map<String, Object> evidence) { SpecialtyCredentials credentials = specialtyCredentials.computeIfAbsent( agentId, k -> new SpecialtyCredentials(agentId) );credentials.addSpecialty(domain, level, evidence);// Specialty achievement significantly boosts trust double trustImpact = calculateSpecialtyTrustImpact(level); recordTrustEvent(agentId, TrustEventType.SPECIALTY_ACHIEVED, trustImpact, Map.of("domain", domain, "level", level.toString()));}private double calculateSpecialtyTrustImpact(SpecialtyLevel level) { switch (level) { case PRACTITIONER: return 0.1; case SPECIALIST: return 0.2; case EXPERT: return 0.35; case MASTER: return 0.5; default: return 0.0; }}public TrustMetrics getEnhancedTrustMetrics(String agentId) { TrustMetrics baseTrust = getTrustMetrics(agentId); RotationalProfile rotationalProfile = competencyTracker.getProfile(agentId); SpecialtyCredentials credentials = specialtyCredentials.get(agentId);return new EnhancedTrustMetrics(baseTrust, rotationalProfile, credentials);}// Inner classes for rotational trackingprivate static class RotationalCompetencyTracker { private final Map<String, List<RotationalAssignment>> agentAssignments;public RotationalCompetencyTracker() { this.agentAssignments = new ConcurrentHashMap<>(); }public void recordAssignment(String agentId, String fromDomain,
String toDomain, RotationalObjective objective) { agentAssignments.computeIfAbsent(agentId, k -> new CopyOnWriteArrayList<>()) .add(new RotationalAssignment(fromDomain, toDomain, objective, Instant.now())); }public RotationalProfile getProfile(String agentId) { List<RotationalAssignment> assignments = agentAssignments.getOrDefault( agentId, Collections.emptyList() ); return new RotationalProfile(agentId, assignments); }}public enum SpecialtyLevel { PRACTITIONER(1, "Basic proficiency with supervised guidance"), SPECIALIST(2, "Independent operation with domain expertise"),
EXPERT(3, "Advanced mastery with innovation capability"), MASTER(4, "Organizational authority with mentoring responsibility");private final int level; private final String description;SpecialtyLevel(int level, String description) { this.level = level; this.description = description; }}public enum RotationalObjective { SKILL_BROADENING, CROSS_FUNCTIONAL_UNDERSTANDING, LEADERSHIP_DEVELOPMENT, INNOVATION_EXPOSURE, KNOWLEDGE_TRANSFER
}
```

## Part 4: Agent Coordinator Service Enhancement

**File: `src/main/java/com/IDE/plugin/ai/multiagent/services/AgentCoordinatorService.java`**

```java
// Add to existing AgentCoordinatorService classprivate final RotationalDevelopmentManager rotationalManager;private final SpecialtyAssignmentOptimizer assignmentOptimizer;// Enhanced constructor additionpublic AgentCoordinatorService(/* existing parameters */) { // ... existing initialization this.rotationalManager = new RotationalDevelopmentManager( trustManager, memoryManager, eventBus
 ); this.assignmentOptimizer = new SpecialtyAssignmentOptimizer(rotationalManager);}public CompletableFuture<RotationalAssignment> initiateRotationalAssignment( String agentId, RotationalDevelopmentRequest request) {return CompletableFuture.supplyAsync(() -> { try { // Validate agent eligibility Agent agent = registeredAgents.get(agentId); if (agent == null) { throw new IllegalArgumentException("Agent not found: " + agentId); }// Check rotational eligibility RotationalEligibility eligibility = rotationalManager.assessEligibility(agentId); if (!eligibility.isEligible()) { throw new IllegalStateException("Agent not eligible for rotation: " +
eligibility.getReason()); }// Create rotational assignment RotationalAssignment assignment = rotationalManager.createAssignment( agentId, request.getTargetDomain(), request.getDuration(),
request.getLearningObjectives() );// Update agent assignment updateAgentAssignment(agentId, assignment);// Record in administrative history recordRotationalAssignment(agentId, assignment);return assignment;} catch (Exception e) { logger.error("Failed to create rotational assignment for agent: {}", agentId, e); throw new ServiceException("Rotational assignment failed", e); } }, managementExecutor);}private void updateAgentAssignment(String agentId, RotationalAssignment assignment) { Agent agent = registeredAgents.get(agentId); if (agent instanceof EnhancedBaseAgent) { EnhancedBaseAgent enhancedAgent = (EnhancedBaseAgent) agent; enhancedAgent.beginRotationalAssignment(assignment); }}public Map<String, String> getAgentSpecialties() { return registeredAgents.entrySet().stream() .collect(Collectors.toMap( Map.Entry::getKey, entry -> calculateAgentSpecialty(entry.getValue()) ));}private String calculateAgentSpecialty(Agent agent) { if (agent instanceof EnhancedBaseAgent) { return ((EnhancedBaseAgent) agent).getPrimarySpecialty(); } return "GENERAL";}public CompletableFuture<SpecialtyTeam> assembleSpecialtyTeam(SpecialtyTeamRequest request) { return assignmentOptimizer.optimizeTeamComposition( request.getRequiredSpecialties(), request.getRotationalQuota(), registeredAgents
 );}
```

## Part 5: New RotationalDevelopmentManager

**File: `src/main/java/com/IDE/plugin/ai/multiagent/development/RotationalDevelopmentManager.java`**

```java
package com.IDE.plugin.ai.multiagent.development;import com.IDE.plugin.ai.multiagent.trust.TrustManager;import com.IDE.plugin.ai.multiagent.memory.MemoryManager;import com.IDE.plugin.ai.multiagent.event.EventBus;import java.time.LocalDateTime;import java.time.Duration;import java.util.*;import java.util.concurrent.*;import java.util.stream.Collectors;/** * Manages rotational development programs that balance specialty cultivation
 * with cross-functional skill development. */public class RotationalDevelopmentManager {private final TrustManager trustManager; private final MemoryManager memoryManager; private final EventBus eventBus;private final Map<String, RotationalProgram> activePrograms; private final Map<String, List<RotationalAssignment>> agentAssignmentHistory; private final ScheduledExecutorService scheduler; private final RotationalPolicyEngine policyEngine;public RotationalDevelopmentManager(TrustManager trustManager,
MemoryManager memoryManager, EventBus eventBus) { this.trustManager = trustManager; this.memoryManager = memoryManager; this.eventBus = eventBus; this.activePrograms = new ConcurrentHashMap<>(); this.agentAssignmentHistory = new ConcurrentHashMap<>(); this.scheduler = Executors.newScheduledThreadPool(2); this.policyEngine = new RotationalPolicyEngine();initializePrograms(); }private void initializePrograms() { // Initialize standard rotational programs based on enterprise patterns createProgram("TalentDevelopment", Arrays.asList( new ProgramRotation("Learning_Culture", Duration.ofDays(60),
"Design engaging experiences and support leadership development"), new ProgramRotation("Multicultural_Affairs", Duration.ofDays(60),
"Organize DEIB events and implement inclusive practices"), new ProgramRotation("Talent_Acquisition", Duration.ofDays(60),
"Master sourcing techniques and employer branding") ));createProgram("TechnicalSpecialization", Arrays.asList( new ProgramRotation("Architecture_Design", Duration.ofDays(90), "System design and architectural decision making"), new ProgramRotation("Code_Development", Duration.ofDays(90), "Implementation and optimization expertise"), new ProgramRotation("Quality_Assurance", Duration.ofDays(60), "Testing strategies and quality management") )); }public RotationalEligibility assessEligibility(String agentId) { // Get agent's current specialty depth List<RotationalAssignment> history = agentAssignmentHistory.getOrDefault( agentId, Collections.emptyList() );// Calculate specialty strength Map<String, Long> domainEngagement = calculateDomainEngagement(agentId); String primarySpecialty = findPrimarySpecialty(domainEngagement); long specialtyDepth = domainEngagement.getOrDefault(primarySpecialty, 0L);// Apply policy rules RotationalPolicy policy = policyEngine.getPolicy(agentId); return policy.assessEligibility(specialtyDepth, history); }public RotationalAssignment createAssignment(String agentId, String targetDomain,
Duration duration, List<String> objectives) { String currentSpecialty = getCurrentSpecialty(agentId);RotationalAssignment assignment = new RotationalAssignment( generateAssignmentId(), agentId, currentSpecialty, targetDomain, duration, objectives, LocalDateTime.now() );// Record assignment agentAssignmentHistory.computeIfAbsent(agentId, k -> new CopyOnWriteArrayList<>()) .add(assignment);// Schedule completion tracking scheduler.schedule(() -> completeAssignment(assignment),
duration.toMillis(), TimeUnit.MILLISECONDS);return assignment; }private Map<String, Long> calculateDomainEngagement(String agentId) { // Integration with memory manager to get historical engagement data return memoryManager.getAgentDomainHistory(agentId); }private String findPrimarySpecialty(Map<String, Long> domainEngagement) { return domainEngagement.entrySet().stream() .max(Map.Entry.comparingByValue()) .map(Map.Entry::getKey) .orElse("GENERALIST"); }private String getCurrentSpecialty(String agentId) { Map<String, Long> engagement = calculateDomainEngagement(agentId); return findPrimarySpecialty(engagement); }private void completeAssignment(RotationalAssignment assignment) { assignment.markCompleted();// Evaluate assignment success AssignmentEvaluation evaluation = evaluateAssignment(assignment);// Update trust based on performance updateTrustFromRotation(assignment, evaluation);// Publish completion event eventBus.publish(new RotationalEvent( RotationalEvent.Type.ASSIGNMENT_COMPLETED, assignment.getAgentId(), Map.of("assignment", assignment, "evaluation", evaluation) )); }private AssignmentEvaluation evaluateAssignment(RotationalAssignment assignment) { // Evaluate learning objectives achievement double objectiveCompletion = calculateObjectiveCompletion(assignment);// Measure cross-functional knowledge gained double knowledgeGain = measureKnowledgeTransfer(assignment);// Assess collaboration effectiveness double collaborationScore = assessCollaborationEffectiveness(assignment);return new AssignmentEvaluation( assignment.getId(), objectiveCompletion, knowledgeGain, collaborationScore, LocalDateTime.now() ); }private double calculateObjectiveCompletion(RotationalAssignment assignment) { // Measure how well learning objectives were achieved return 0.85; // Placeholder - would integrate with actual assessment mechanisms }private double measureKnowledgeTransfer(RotationalAssignment assignment) { // Quantify knowledge gained in target domain return 0.78; // Placeholder - would analyze memory artifacts and knowledge contributions }private double assessCollaborationEffectiveness(RotationalAssignment assignment) { // Evaluate how effectively agent collaborated during rotation return 0.82; // Placeholder - would analyze communication patterns and peer feedback }private void updateTrustFromRotation(RotationalAssignment assignment,
AssignmentEvaluation evaluation) { double trustImpact = (evaluation.getObjectiveCompletion() +
evaluation.getKnowledgeGain() +
evaluation.getCollaborationScore()) / 3.0 * 0.1;trustManager.updateAgentTrust(assignment.getAgentId(), trustImpact,
"Rotational assignment completion"); }private String generateAssignmentId() { return "ROT_" + System.currentTimeMillis() + "_" +
ThreadLocalRandom.current().nextInt(1000, 9999); }// Supporting classes public static class RotationalAssignment { private final String id; private final String agentId; private final String sourceDomain; private final String targetDomain; private final Duration duration; private final List<String> learningObjectives; private final LocalDateTime startTime; private LocalDateTime completionTime; private boolean completed;public RotationalAssignment(String id, String agentId, String sourceDomain, String targetDomain, Duration duration,
List<String> objectives, LocalDateTime startTime) { this.id = id; this.agentId = agentId; this.sourceDomain = sourceDomain; this.targetDomain = targetDomain; this.duration = duration; this.learningObjectives = new ArrayList<>(objectives); this.startTime = startTime; this.completed = false; }public void markCompleted() { this.completed = true; this.completionTime = LocalDateTime.now(); }// Getters public String getId() { return id; } public String getAgentId() { return agentId; } public String getTargetDomain() { return targetDomain; } public boolean isCompleted() { return completed; } }public static class RotationalEligibility { private final boolean eligible; private final String reason; private final Map<String, Object> requirements;public RotationalEligibility(boolean eligible, String reason,
Map<String, Object> requirements) { this.eligible = eligible; this.reason = reason; this.requirements = requirements; }public boolean isEligible() { return eligible; } public String getReason() { return reason; } }}
```

## Part 6: New SpecialtyTracker System

**File: `src/main/java/com/IDE/plugin/ai/multiagent/specialty/SpecialtyTracker.java`**

```java
package com.IDE.plugin.ai.multiagent.specialty;import java.time.LocalDateTime;import java.time.Duration;import java.util.*;import java.util.concurrent.ConcurrentHashMap;import java.util.stream.Collectors;/** * Tracks and measures agent specialty development based on historical
 * engagement depth and expertise demonstration. */public class SpecialtyTracker {private final String agentId; private final Map<String, DomainEngagementMetrics> domainMetrics; private final List<SpecialtyMilestone> milestones; private final SpecialtyCalculationEngine calculationEngine;public SpecialtyTracker(String agentId) { this.agentId = agentId; this.domainMetrics = new ConcurrentHashMap<>(); this.milestones = new ArrayList<>(); this.calculationEngine = new SpecialtyCalculationEngine(); }public void updateDomainEngagement(String domain, DomainExperience experience) { DomainEngagementMetrics metrics = domainMetrics.computeIfAbsent( domain, k -> new DomainEngagementMetrics(domain) );metrics.updateFromExperience(experience);// Check for milestone achievements checkMilestones(domain, metrics); }public String calculatePrimarySpecialty(Map<String, DomainExperience> domainHistory) { Map<String, Double> specialtyScores = new HashMap<>();for (Map.Entry<String, DomainExperience> entry : domainHistory.entrySet()) { String domain = entry.getKey(); DomainExperience experience = entry.getValue();double specialtyScore = calculationEngine.calculateSpecialtyScore( experience.getHistoricalDepth(), experience.getExpertiseLevel(), getEngagementConsistency(domain) );specialtyScores.put(domain, specialtyScore); }return specialtyScores.entrySet().stream() .max(Map.Entry.comparingByValue()) .map(Map.Entry::getKey) .orElse("GENERALIST"); }public SpecialtyProfile generateSpecialtyProfile() { Map<String, SpecialtyLevel> domainLevels = domainMetrics.entrySet().stream() .collect(Collectors.toMap( Map.Entry::getKey, entry -> calculateSpecialtyLevel(entry.getValue()) ));String primarySpecialty = findPrimarySpecialty(domainLevels); List<String> secondarySpecialties = findSecondarySpecialties(domainLevels);return new SpecialtyProfile( agentId, primarySpecialty, secondarySpecialties, domainLevels, calculateOverallExpertiseDepth() ); }private double getEngagementConsistency(String domain) { DomainEngagementMetrics metrics = domainMetrics.get(domain); if (metrics == null) return 0.0;return metrics.calculateConsistencyScore(); }private void checkMilestones(String domain, DomainEngagementMetrics metrics) { SpecialtyLevel currentLevel = calculateSpecialtyLevel(metrics); SpecialtyLevel previousLevel = getPreviousLevel(domain);if (currentLevel.ordinal() > previousLevel.ordinal()) { SpecialtyMilestone milestone = new SpecialtyMilestone( domain, currentLevel, LocalDateTime.now(), metrics.getEngagementDuration(), metrics.getTotalContributions() );milestones.add(milestone); } }private SpecialtyLevel calculateSpecialtyLevel(DomainEngagementMetrics metrics) { long engagementDays = metrics.getEngagementDuration().toDays(); double expertiseScore = metrics.getExpertiseScore(); int contributions = metrics.getTotalContributions();if (engagementDays >= 365 && expertiseScore >= 0.9 && contributions >= 100) { return SpecialtyLevel.MASTER; } else if (engagementDays >= 180 && expertiseScore >= 0.8 && contributions >= 50) { return SpecialtyLevel.EXPERT; } else if (engagementDays >= 90 && expertiseScore >= 0.7 && contributions >= 25) { return SpecialtyLevel.SPECIALIST; } else if (engagementDays >= 30 && expertiseScore >= 0.5 && contributions >= 10) { return SpecialtyLevel.PRACTITIONER; } else { return SpecialtyLevel.NOVICE; } }private SpecialtyLevel getPreviousLevel(String domain) { return milestones.stream() .filter(m -> m.getDomain().equals(domain)) .map(SpecialtyMilestone::getLevel) .max(Comparator.comparing(Enum::ordinal)) .orElse(SpecialtyLevel.NOVICE); }private String findPrimarySpecialty(Map<String, SpecialtyLevel> domainLevels) { return domainLevels.entrySet().stream() .max(Map.Entry.comparingByValue()) .map(Map.Entry::getKey) .orElse("GENERALIST"); }private List<String> findSecondarySpecialties(Map<String, SpecialtyLevel> domainLevels) { return domainLevels.entrySet().stream() .filter(entry -> entry.getValue().ordinal() >= SpecialtyLevel.SPECIALIST.ordinal()) .map(Map.Entry::getKey) .collect(Collectors.toList()); }private double calculateOverallExpertiseDepth() { return domainMetrics.values().stream() .mapToDouble(DomainEngagementMetrics::getExpertiseScore) .average() .orElse(0.0); }// Supporting classes private static class DomainEngagementMetrics { private final String domain; private Duration totalEngagement; private double cumulativeExpertise; private int contributionCount; private LocalDateTime firstEngagement; private LocalDateTime lastEngagement; private List<Double> recentScores;public DomainEngagementMetrics(String domain) { this.domain = domain; this.totalEngagement = Duration.ZERO; this.cumulativeExpertise = 0.0; this.contributionCount = 0; this.recentScores = new ArrayList<>(); }public void updateFromExperience(DomainExperience experience) { if (firstEngagement == null) { firstEngagement = LocalDateTime.now(); } lastEngagement = LocalDateTime.now();totalEngagement = Duration.between(firstEngagement, lastEngagement); cumulativeExpertise += experience.getExpertiseLevel(); contributionCount++;// Track recent performance for consistency calculation recentScores.add(experience.getExpertiseLevel()); if (recentScores.size() > 10) { recentScores.remove(0); } }public double calculateConsistencyScore() { if (recentScores.size() < 3) return 0.5;double average = recentScores.stream().mapToDouble(Double::doubleValue).average().orElse(0.0); double variance = recentScores.stream() .mapToDouble(score -> Math.pow(score - average, 2)) .average().orElse(0.0);return Math.max(0.0, 1.0 - Math.sqrt(variance)); }public Duration getEngagementDuration() { return totalEngagement; } public double getExpertiseScore() {
return contributionCount > 0 ? cumulativeExpertise / contributionCount : 0.0;
} public int getTotalContributions() { return contributionCount; } }private static class SpecialtyCalculationEngine { public double calculateSpecialtyScore(long historicalDepth, double expertiseLevel,
double consistency) { // Weight factors: 40% historical depth, 35% expertise, 25% consistency double depthScore = Math.min(1.0, historicalDepth / (365.0 * 24 * 60 * 60 * 1000)); // Max 1 year return (depthScore * 0.4) + (expertiseLevel * 0.35) + (consistency * 0.25); } }public static class SpecialtyProfile { private final String agentId; private final String primarySpecialty; private final List<String> secondarySpecialties; private final Map<String, SpecialtyLevel> domainLevels; private final double overallExpertiseDepth;public SpecialtyProfile(String agentId, String primarySpecialty,
List<String> secondarySpecialties, Map<String, SpecialtyLevel> domainLevels, double overallExpertiseDepth) { this.agentId = agentId; this.primarySpecialty = primarySpecialty; this.secondarySpecialties = new ArrayList<>(secondarySpecialties); this.domainLevels = new HashMap<>(domainLevels); this.overallExpertiseDepth = overallExpertiseDepth; }public String getPrimarySpecialty() { return primarySpecialty; } public List<String> getSecondarySpecialties() { return secondarySpecialties; } public Map<String, SpecialtyLevel> getDomainLevels() { return domainLevels; } }private static class SpecialtyMilestone { private final String domain; private final SpecialtyLevel level; private final LocalDateTime achievedDate; private final Duration timeToAchieve; private final int contributionsAtAchievement;public SpecialtyMilestone(String domain, SpecialtyLevel level, LocalDateTime achievedDate, Duration timeToAchieve, int contributionsAtAchievement) { this.domain = domain; this.level = level; this.achievedDate = achievedDate; this.timeToAchieve = timeToAchieve; this.contributionsAtAchievement = contributionsAtAchievement; }public String getDomain() { return domain; } public SpecialtyLevel getLevel() { return level; } }public enum SpecialtyLevel { NOVICE, PRACTITIONER, SPECIALIST, EXPERT, MASTER
 }}
```

## Part 7: Communication System Enhancement

**File: `src/main/java/com/IDE/plugin/ai/multiagent/communication/MessageType.java`**

```java
// Add to existing MessageType enumpublic enum MessageType { // ... existing message types// Rotational Development messages ROTATIONAL_ASSIGNMENT_REQUEST, ROTATIONAL_ASSIGNMENT_RESPONSE, ROTATIONAL_PROGRESS_UPDATE, SPECIALTY_ASSESSMENT_REQUEST, SPECIALTY_MILESTONE_ACHIEVED, CROSS_FUNCTIONAL_COLLABORATION, KNOWLEDGE_TRANSFER_REQUEST, MENTORSHIP_REQUEST, ROTATIONAL_COMPLETION_REPORT, SPECIALTY_VALIDATION_REQUEST
}
```

## Part 8: Web UI Enhancement for Rotational Management

**File: `src/main/java/com/IDE/plugin/web/components/RotationalDevelopmentDashboard.js`**

```jsx
// New rotational development dashboard componentclass RotationalDevelopmentDashboard extends React.Component {
 constructor(props) {
 super(props); this.state = {
 agents: [], rotationalPrograms: [], specialtyProfiles: {}, activeAssignments: [], selectedAgent: null, showAssignmentModal: false }; }
componentDidMount() {
 this.loadDashboardData(); this.startPeriodicUpdates(); }
loadDashboardData = async () => {
 try {
 const [agents, programs, profiles, assignments] = await Promise.all([
 fetch('/api/agents').then(r => r.json()), fetch('/api/rotational-programs').then(r => r.json()), fetch('/api/specialty-profiles').then(r => r.json()), fetch('/api/active-assignments').then(r => r.json())
 ]);this.setState({
 agents, rotationalPrograms: programs, specialtyProfiles: profiles, activeAssignments: assignments
 }); } catch (error) {
 console.error('Failed to load dashboard data:', error); }
 };render() {
 const { agents, specialtyProfiles, activeAssignments } = this.state;return (
 <div className="rotational-development-dashboard"> <div className="dashboard-header"> <h2>Rotational Development Program</h2> <button
className="btn-primary" onClick={() => this.setState({ showAssignmentModal: true })}
 > Create Assignment
 </button> </div><div className="dashboard-content"> <div className="agent-specialty-grid"> {agents.map(agent => (
 <AgentSpecialtyCard
key={agent.id}
 agent={agent}
 profile={specialtyProfiles[agent.id]}
 onViewDetails={() => this.selectAgent(agent)}
 /> ))}
 </div><div className="active-assignments-panel"> <h3>Active Rotational Assignments</h3> <div className="assignments-list"> {activeAssignments.map(assignment => (
 <RotationalAssignmentCard
key={assignment.id}
 assignment={assignment}
 onProgress={(id, progress) => this.updateProgress(id, progress)}
 /> ))}
 </div> </div> </div>{this.renderAssignmentModal()}
 {this.renderAgentDetailsModal()}
 </div> ); }
renderAssignmentModal() {
 if (!this.state.showAssignmentModal) return null;return (
 <div className="modal-overlay"> <div className="assignment-creation-modal"> <h3>Create Rotational Assignment</h3> <RotationalAssignmentForm
agents={this.state.agents}
 programs={this.state.rotationalPrograms}
 onSubmit={this.handleAssignmentCreation}
 onCancel={() => this.setState({ showAssignmentModal: false })}
 /> </div> </div> ); }
handleAssignmentCreation = async (assignmentData) => {
 try {
 const response = await fetch('/api/rotational-assignments', {
 method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(assignmentData)
 });if (response.ok) {
 this.setState({ showAssignmentModal: false }); this.loadDashboardData(); // Refresh data }
 } catch (error) {
 console.error('Failed to create assignment:', error); }
 };}
const AgentSpecialtyCard = ({ agent, profile, onViewDetails }) => (
 <div className="agent-specialty-card"> <div className="agent-header"> <h4>{agent.id}</h4> <span className={`role-badge ${agent.role.toLowerCase()}`}> {agent.role}
 </span> </div><div className="specialty-info"> <div className="primary-specialty"> <label>Primary Specialty:</label> <span className="specialty-name"> {profile?.primarySpecialty || 'Developing'}
 </span> </div><div className="expertise-level"> <label>Expertise Depth:</label> <div className="expertise-bar"> <div
className="expertise-fill" style={{ width: `${(profile?.overallExpertiseDepth || 0) * 100}%` }}
 /> </div> </div><div className="secondary-specialties"> {profile?.secondarySpecialties?.map(specialty => (
 <span key={specialty} className="secondary-badge"> {specialty}
 </span> ))}
 </div> </div><button
className="view-details-btn" onClick={onViewDetails}
 > View Details
 </button> </div>);const RotationalAssignmentCard = ({ assignment, onProgress }) => (
 <div className="rotational-assignment-card"> <div className="assignment-header"> <h4>Agent {assignment.agentId}</h4> <span className="assignment-status"> {assignment.status}
 </span> </div><div className="assignment-details"> <div>From: {assignment.sourceDomain}</div> <div>To: {assignment.targetDomain}</div> <div>Duration: {assignment.duration} days</div> </div><div className="progress-section"> <div className="progress-bar"> <div
className="progress-fill" style={{ width: `${assignment.progress || 0}%` }}
 /> </div> <div className="objectives-list"> {assignment.learningObjectives?.map((objective, index) => (
 <div key={index} className="objective-item"> {objective}
 </div> ))}
 </div> </div> </div>);
```

## System Integration and Interconnections

The eight components integrate through established communication patterns and shared data structures. The EnhancedBaseAgent serves as the primary interface for rotational tracking, connecting to the MemoryStateManager for historical expertise persistence and the TrustManager for competency-based trust adjustments.
The RotationalDevelopmentManager orchestrates program execution while the SpecialtyTracker provides quantitative specialty measurement based on historical engagement depth. The AgentCoordinatorService manages assignment logistics and team composition optimization.
Enhanced communication protocols support rotational coordination through new message types, while the web interface provides comprehensive monitoring and management capabilities. The framework maintains specialty cultivation as the longest verifiable history in specific domains while enabling strategic cross-functional development through structured rotational programs.
This implementation establishes enterprise-grade rotational development capabilities that balance deep domain expertise preservation with strategic skill broadening, ensuring agents develop both specialized knowledge depth and adaptive cross-functional competencies.