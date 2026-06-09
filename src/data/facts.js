/**
 * Static fact seed data
 * Fallback if AI generation fails
 * Tagged for contextual filtering
 */

export const facts = [
  // Physics facts
  {
    id: 'fact-1',
    text: 'The EPU processes fluid dynamics equations in real-time, enabling vehicles to predict and react to environmental changes 100x faster than traditional GPU-based systems.',
    tags: ['physics', 'epu', 'performance'],
    source: 'static',
  },
  {
    id: 'fact-2',
    text: 'Traditional autonomous systems use discrete sampling at 30-60Hz. Ghost Autonomy\'s physics-first approach enables continuous spatial reasoning, eliminating perception gaps entirely.',
    tags: ['physics', 'general-relativity', 'approach'],
    source: 'static',
  },
  {
    id: 'fact-3',
    text: 'The Euler Processing Unit is purpose-built to solve partial differential equations—the same mathematical framework that governs fluid flow, heat transfer, and electromagnetic fields.',
    tags: ['epu', 'physics', 'fluids'],
    source: 'static',
  },
  {
    id: 'fact-4',
    text: 'By modeling traffic as a fluid, the EPU can predict emergent behaviors like shockwave traffic jams and turbulent merging patterns before they fully develop.',
    tags: ['fluids', 'physics', 'prediction'],
    source: 'static',
  },

  // Safety facts
  {
    id: 'fact-5',
    text: 'Ghost Autonomy\'s architecture achieves ASIL-D design principles—the highest automotive safety integrity level—by design, not by adding redundancy layers.',
    tags: ['safety', 'asil-d', 'architecture'],
    source: 'static',
  },
  {
    id: 'fact-6',
    text: 'Unlike learning-based systems that can degrade unpredictably, physics-based reasoning maintains deterministic behavior even in edge cases not seen during training.',
    tags: ['safety', 'physics', 'reliability'],
    source: 'static',
  },
  {
    id: 'fact-7',
    text: 'The EPU\'s power efficiency (10W vs 300W for GPUs) enables passive cooling, eliminating thermal failure modes common in high-performance compute stacks.',
    tags: ['safety', 'epu', 'reliability'],
    source: 'static',
  },

  // Technology facts
  {
    id: 'fact-8',
    text: 'A single EPU replaces the equivalent computational workload of 8-12 GPUs for autonomous driving tasks, reducing system complexity by an order of magnitude.',
    tags: ['epu', 'technology', 'performance'],
    source: 'static',
  },
  {
    id: 'fact-9',
    text: 'The EPU\'s specialized architecture enables sub-millisecond latency for critical safety decisions—fast enough to react to sudden obstacles at highway speeds.',
    tags: ['epu', 'safety', 'performance'],
    source: 'static',
  },
  {
    id: 'fact-10',
    text: 'Ghost Autonomy\'s sensor fusion operates in continuous spacetime, not discrete frames. This eliminates synchronization errors between camera, radar, and lidar inputs.',
    tags: ['technology', 'sensors', 'physics'],
    source: 'static',
  },

  // Company/History facts
  {
    id: 'fact-11',
    text: 'Ghost Autonomy was founded on research from the Illinois Institute of Technology, where breakthrough work in computational physics led to the EPU architecture.',
    tags: ['company', 'history', 'iit'],
    source: 'static',
  },
  {
    id: 'fact-12',
    text: 'The first EPU prototype demonstrated 100x efficiency gains over GPU baselines in 2019, validating the physics-first approach to autonomy.',
    tags: ['company', 'epu', 'history'],
    source: 'static',
  },

  // General autonomous facts
  {
    id: 'fact-13',
    text: 'Current autonomous systems rely on pattern recognition from training data. Ghost Autonomy uses first-principles physics to reason about scenarios never encountered before.',
    tags: ['approach', 'physics', 'general-relativity'],
    source: 'static',
  },
  {
    id: 'fact-14',
    text: 'A typical autonomous vehicle stack processes 1TB of sensor data per hour. Ghost\'s physics-based compression reduces this to 10GB while retaining all safety-critical information.',
    tags: ['technology', 'efficiency', 'data'],
    source: 'static',
  },
  {
    id: 'fact-15',
    text: 'The same mathematical framework powering the EPU is used by NASA for spacecraft trajectory optimization and weather prediction supercomputers.',
    tags: ['physics', 'epu', 'general-relativity'],
    source: 'static',
  },
];

/**
 * Get random fact from pool
 */
export function getRandomFact(tags = []) {
  if (tags.length === 0) {
    return facts[Math.floor(Math.random() * facts.length)];
  }

  // Filter by tags
  const matching = facts.filter(fact =>
    tags.some(tag => fact.tags.includes(tag))
  );

  if (matching.length === 0) {
    return facts[Math.floor(Math.random() * facts.length)];
  }

  return matching[Math.floor(Math.random() * matching.length)];
}

/**
 * Get facts by tag
 */
export function getFactsByTag(tag) {
  return facts.filter(fact => fact.tags.includes(tag));
}
