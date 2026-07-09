/**
 * Static fact seed data
 * Fallback if AI generation fails
 * Tagged for contextual filtering
 *
 * July 2026 revision: every fact is traceable to a published corpus document
 * and carries its evidentiary standing inline (measured / proven / proposed /
 * projected). Unlabeled performance claims were removed per the program's
 * claim-discipline standard.
 */

export const facts = [
  // Measured & proven
  {
    id: 'fact-1',
    text: 'The only latency the research corpus reports as measured — rather than projected — is the ~32 ns response of the analog safety veto, witnessed on FPGA. Every other performance figure carries an explicit "projected" label until hardware exists to measure it.',
    tags: ['safety', 'epu', 'performance', 'physics'],
    source: 'static',
  },
  {
    id: 'fact-2',
    text: 'Proven: the arithmetic–geometric mean evaluates complete elliptic integrals to machine precision in a bounded, parameter-independent number of iterations — the numerical primitive at the core of the special-function framework.',
    tags: ['physics', 'mathematics', 'epu'],
    source: 'static',
  },
  {
    id: 'fact-3',
    text: 'Measured, and reported as preliminary: the special-function pipeline attains R² ≈ 0.78–0.87 on the biomass-gasification case study — valid only within the demonstrated operating envelope, as the manuscript itself insists.',
    tags: ['physics', 'fluids', 'validation'],
    source: 'static',
  },

  // The two invariants
  {
    id: 'fact-4',
    text: 'One law binds every layer of the architecture: as warrant for a benign reading of the scene falls, the set of admissible commands may only ever contract. Selection is free; consequence is bounded.',
    tags: ['safety', 'architecture', 'physics'],
    source: 'static',
  },
  {
    id: 'fact-5',
    text: 'The refusal chain runs S0 → S4 — trusted numerics, fidelity gate, layered safety filter, risk-monotone actuation algebra — and terminates in an electrically isolated analog veto: enforcement by electricity, not code.',
    tags: ['safety', 'architecture', 'epu'],
    source: 'static',
  },
  {
    id: 'fact-6',
    text: 'The epistemic gearbox orders five epistemic stances into 325 admissible formulation routes — and is only ever allowed to rank the admissible set, never to enlarge it.',
    tags: ['architecture', 'approach', 'physics'],
    source: 'static',
  },

  // Memory & governance
  {
    id: 'fact-7',
    text: 'In the metabolic memory architecture, slower memory is not safer memory: the longer a datum can influence future behavior, the heavier its verification, provenance, and anti-drift obligations become.',
    tags: ['safety', 'memory', 'architecture'],
    source: 'static',
  },
  {
    id: 'fact-8',
    text: 'The system does not store and retrieve — it metabolizes: data is admitted, held, or evicted by residence time, and every act of recall is budgeted and priced.',
    tags: ['memory', 'technology', 'physics'],
    source: 'static',
  },
  {
    id: 'fact-9',
    text: 'Anti-silent-drift is a design rule: every change to the system\'s operating truth is a logged, challengeable event. Stronger evidence beats stored consensus.',
    tags: ['safety', 'governance', 'reliability'],
    source: 'static',
  },

  // The written record
  {
    id: 'fact-10',
    text: 'The program\'s intellectual core is published: an 89-page corpus of ten foundational articles on provably bounded autonomous driving, consolidated in May 2026.',
    tags: ['company', 'history', 'approach'],
    source: 'static',
  },
  {
    id: 'fact-11',
    text: 'The consolidated L4 solution restates the safety goal as six acceptance criteria (G1–G6) that any build can be tested against — one-sided error, antitone admissibility, non-expansive enforcement, physical fail-closed, legible policy, conjunctive release.',
    tags: ['safety', 'validation', 'architecture'],
    source: 'static',
  },
  {
    id: 'fact-12',
    text: 'Ghost Autonomy grew from doctoral research at the Illinois Institute of Technology on neural-network modeling of biomass gasification — the dissertation is published in full in the Technical Library.',
    tags: ['company', 'history', 'iit', 'fluids'],
    source: 'static',
  },

  // Claim discipline
  {
    id: 'fact-13',
    text: 'Every claim in the published corpus carries a standing — established, proposed, or notional — and the program treats relocating a claim to "proposed" not as a weakness but as the method.',
    tags: ['approach', 'governance', 'general-relativity'],
    source: 'static',
  },
  {
    id: 'fact-14',
    text: 'The physics trust anchor is validated at bin level on the gasification corpus; its transfer to automotive perception is stated in the corpus as an open validation obligation, not an accomplished fact.',
    tags: ['physics', 'validation', 'approach'],
    source: 'static',
  },
  {
    id: 'fact-15',
    text: 'Ghost is pursuing alignment with ASIL-D principles under ISO 26262 for safety-critical functions. Formal certification is part of the deployment path — and is not claimed before it is completed.',
    tags: ['safety', 'asil-d', 'general-relativity'],
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
