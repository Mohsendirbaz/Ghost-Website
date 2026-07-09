# External Assessment & Prior-Art Map: "Narrative Perturbation Propagation" + "Discovery Field" Framework

## Executive Judgment

The framework is an intellectually serious, internally coherent piece of metaphor-driven knowledge engineering whose strongest components are reinventions of well-established methods rather than novel mechanisms. Two borrowings are essentially load-bearing and well-chosen but already exist under standard names: (1) the "scalable semantic repulsion accelerator" is, in substance, the Barnes–Hut approximation of repulsive forces already standard in Barnes–Hut t-SNE (van der Maaten 2014) and UMAP/ForceAtlas2; (2) the σ_x "analogical displacement" operator is a restatement of analogical transfer as formalized in Gentner's structure-mapping theory and Fauconnier–Turner conceptual blending. The quantum/Bloch-sphere "transformation grammar" is the weakest link: it is decorative, and its central mathematical claim — three independent, separately-settable axes — actively misrepresents the Pauli algebra. The winding-number diagnostic (NRWI) is mathematically real and has genuine precedent (rotation numbers, phase unwrapping) but carries serious projection-dependence and non-autonomy pitfalls. Below, each borrowing is tagged RIGOROUS / PARTIALLY-RIGOROUS / DECORATIVE.

---

## 1. Discovery Operators / Systematic Concept Generation — PRIOR ART

**Verdict: PARTIALLY-RIGOROUS as engineering; LOW novelty. The "apply operator to concept to mint new concept" pipeline already exists under several names.**

The idea of disciplined operators that "rotate" a concept to generate new candidate concepts is one of the oldest programs in computational creativity and AI.

- **Margaret Boden's tripartite taxonomy** — combinational, exploratory, and transformational creativity — is the canonical frame. Exploratory creativity is precisely "search within a structured conceptual space"; transformational creativity "transforms the space itself by altering or dropping one or more of its defining dimensions." The framework's "rotate a concept to mint seeds" is exploratory creativity in Boden's sense, with the winding/abstraction extensions reaching toward transformational. (Boden, *The Creative Mind: Myths and Mechanisms*, 1990/2004.)
- **TRIZ** (Altshuller) is the closest direct precedent: a fixed catalog of 40 inventive principles plus a contradiction matrix, applied as operators to transform a problem into candidate solutions. By 1969 Altshuller had systematically analyzed roughly 40,000 patent abstracts (some sources cite 200,000+ over his career), from which he codified the technical contradiction, Ideality, the Contradiction Matrix and the 40 Inventive Principles (Altshuller, *The Innovation Algorithm*, 1999; Terninko, Zusman & Zlotin 1998). A disciplined "operator catalog → apply → candidate" loop is exactly TRIZ's method.
- **Morphological analysis** (Fritz Zwicky, *Discovery, Invention, Research Through the Morphological Approach*, 1969) systematically enumerates a concept's parameter axes and their combinations — a direct ancestor of "axes you rotate along."
- **Automated scientific discovery**: BACON (Langley, Bradshaw, Simon) rediscovered empirical laws (e.g., Black's law of specific heat; ideal gas law; Kepler's third law) by applying data-driven heuristic operators; later "robot scientist" (Adam/Eve) and recent "AI Scientist" pipelines (Sakana, 2024) automate ideation→experiment→writing.
- **Analogical reasoning** (Gentner) and **conceptual blending** (Fauconnier & Turner) supply the cognitive operators (see §2).

**What is genuinely new here:** Not the concept of disciplined generative operators (old), but possibly the *specific packaging* — a small fixed orthogonal-ish basis of three transformation types wired into a Notion-based, provenance-tracked LLM pipeline. That packaging is a contribution at the level of tooling/integration, not theory. The author should cite Boden, TRIZ, Zwicky, Langley/Simon, Gentner, and Fauconnier–Turner and explicitly position the work as an *instance* of exploratory/transformational creativity rather than a new paradigm.

---

## 2. σ_x / σ_y / σ_z Decomposition (Analogy / Generalization / Abstraction) — COGNITIVE-SCIENCE GROUNDING

**Verdict: PARTIALLY-RIGOROUS and, surprisingly, better grounded than the quantum dressing suggests. The three-way split maps almost exactly onto an existing taxonomy.**

This is the most defensible conceptual core of the framework, and it does not need the quantum vocabulary at all.

- **Abstraction vs. generalization are genuinely distinct** and are frequently conflated. The cleanest operational statement in the literature: with generalization, detail is "described in a general way on the same level of abstraction" and is recoverable; with abstraction, detail is *omitted/lost* and you move to a higher level. The framework's σ_z "abstraction gradient" (climb/descend a concrete↔abstract ladder) is exactly abstraction in this sense; its σ_y "contextual scope / universalization" (strip local context, find a universal, re-localize) is closer to generalization/extension.
- **Analogy is a distinct cognitive operation** from both, per Gentner's structure-mapping theory (Gentner 1983; Falkenhainer, Forbus & Gentner, *The Structure-Mapping Engine*, AAAI 1986): analogy maps *systems of relations* from a base to a target domain independent of surface features, governed by the systematicity principle. The σ_x "analogical displacement" (move to a distant domain, import an operator, return enriched) is structure-mapping plus transfer.
- **Crucially, a near-identical three-way basis already exists.** Recent cognitive-science/ML work (citing French) distinguishes exactly three generalization processes: (1) **abstraction** (concrete instances → abstract schema), (2) **extension** (apply/extend a schema to new situations), and (3) **analogy** (transform/adapt a schema to a new context). This maps almost one-to-one onto σ_z (abstraction), σ_y (extension/universalization), and σ_x (analogy). This is strong evidence the framework's basis is *principled, not arbitrary* — but also that it is **not novel**; it is a re-derivation of an existing tripartition.

**Recommendation:** Drop the quantum framing here and cite the abstraction/extension/analogy literature directly (Gentner 1983; French's tripartition; the abstraction-vs-generalization distinction). The three operators stand on their own cognitive-science legs; the Pauli labels add nothing and invite misreading.

---

## 3. Bloch Sphere / Pauli Matrices as a "Transformation Grammar" — IS THE ANALOGY APT?

**Verdict: DECORATIVE, and partly misleading. The metaphor breaks down mathematically at its central claim.**

**(i) What the formalism actually is.** The Pauli matrices σ_x, σ_y, σ_z are 2×2 Hermitian, unitary, traceless matrices that, with the identity, form an orthogonal basis for 2×2 Hermitian operators. A qubit's pure state is a point on the Bloch sphere parameterized by two continuous angles (θ, φ); a mixed state is a point in the Bloch ball. The Pauli matrices are observables and generators of SU(2) rotations; states evolve by continuous rotations U(θ,n̂)=exp(−iθ n̂·σ/2). (SU(2) is a double cover of SO(3): a rotation by θ in state space is 2θ on the sphere.)

**(ii) Precedent for borrowing this formalism for meaning/concepts.** There IS precedent, but it is quantum-*probability* cognition, not a Pauli-axis grammar:
- **Diederik Aerts** represents concepts literally as states in complex Hilbert space and, in recent work, explicitly as qubit states on the Bloch sphere with measurement (Aerts & Aerts Arguëlles 2022, "Human Perception as a Phenomenon of Quantization," which states their model "is a model for a qubit in the Bloch sphere with appended measurement facility"; Aerts & Gabora 2005, "A theory of concepts and their combinations I & II: A Hilbert space representation," *Kybernetes* 34). This is the closest existing analog to "concept transformations as rotations on a Bloch-sphere-like space."
- **Coecke, Sadrzadeh & Clark (2010)**, "Mathematical Foundations for a Compositional Distributional Model of Meaning" (DisCoCat), uses compact-closed *category theory* (pregroups) and tensor products of word vectors, **not** qubits; the link to physics is structural/categorical. Later **Quantum NLP / lambeq** (Coecke, de Felice, Meichanetzidis & Toumi 2021; Lorenz et al. 2021) encodes words literally as parameterized qubit states prepared by Bloch-sphere rotation gates (Rx, Ry, Rz) — but the rotation angles are *free trained parameters*, not labeled semantic axes.
- **Widdows** (*Geometry and Meaning*, 2004; Widdows & Peters 2003) uses quantum *logic* (subspaces, orthogonal projection, lattice operations) on word vectors — again not a Pauli/Bloch grammar.
- **Surov et al. (2021), "Quantum Cognitive Triad"** uses one Bloch coordinate (azimuth φ) as a one-dimensional semantic space, with polar angle θ encoding probability — a partial precedent for using a Bloch coordinate as a semantic axis.

So borrowing Hilbert-space/Bloch geometry for meaning is established; assigning fixed independent semantic content to σ_x/σ_y/σ_z as three separately-settable dials is **not** established and is the framework's own move.

**(iii) Where the metaphor breaks mathematically.**
- The Pauli matrices **anticommute** ({σ_i,σ_j}=2δ_ij I) and **do not commute** ([σ_i,σ_j]=2iε_ijk σ_k). They are mutually incompatible observables; by the uncertainty principle a state cannot have simultaneously definite values along all three. You therefore **cannot independently "set" σ_x, σ_y, σ_z** — the framework's "three axes you can set independently" contradicts the algebra it borrows.
- A pure qubit state has only **two** real degrees of freedom (θ, φ), and the Bloch vector satisfies ⟨σ_x⟩²+⟨σ_y⟩²+⟨σ_z⟩²=1; the three expectation values are **not independent**. The framework's "three orthogonal axes, two poles each, eight octants" picture treats the sphere as if it had three independent binary coordinates — but the Bloch sphere uses two *continuous* angles, not three binary poles, and "octants" have no natural meaning for a qubit.
- The orthogonality that *does* hold is operator-basis orthogonality, Tr(σ_iσ_j)=2δ_ij — a statement about matrices as a basis, not about independently-settable state coordinates.

**How an expert would react:** A physicist would immediately flag the "three independent axes / octants" claim as a misuse, and would note that if the author only wants "three labeled, bidirectional transformation dimensions," then ordinary ℝ³ with sign (or just three named operators) suffices and is more honest. The quantum vocabulary outruns the content.

---

## 4. Winding / Rotation Numbers as Revision-Convergence Diagnostic (NRWI) — RIGOR CHECK & PRIOR ART

**Verdict: PARTIALLY-RIGOROUS. The math is real and the analogy is apter than the quantum one, but there are genuine pitfalls and it is a known technique under other names.**

**(i) Mathematical validity.** Accumulating unwrapped argument increments of (z^(k) − p) and dividing by 2π is a legitimate computation: for a *closed* curve it yields the integer winding number (argument principle, W(γ,z₀)=(1/2π)Δ_γ arg(z−z₀)); for an *open* trajectory it yields a fractional accumulated rotation. Classifying radial vs. spiral convergence vs. oscillatory crossing vs. limit-cycle failure by how much a trajectory circles its equilibrium is sound in spirit and corresponds to standard linear-stability phase-portrait classification (stable node vs. stable focus/spiral vs. center vs. limit cycle), i.e., Poincaré–Bendixson-type reasoning in 2D.

**(ii) Known under other names.** Yes, several:
- **Rotation number** (Poincaré) in dynamical systems on the circle — the canonical "how many times does it wind per step" invariant; the literature explicitly distinguishes "rotation number" from "winding number" by the assumptions made about the underlying flow (e.g., Stark et al., *Dynamical Systems*, 2003).
- **Phase unwrapping** in signal processing (accumulating 2π-corrected phase increments) — exactly the NRWI's core operation.
- **Winding/topological indices in TDA** and **winding numbers in coupled-oscillator / Kuramoto phase dynamics**, where phase-locked states are classified by integer winding numbers (Delabays, Coletta & Jacquod, "Multistability of Phase-Locking and Topological Winding Numbers," 2016).

**(iii) Pitfalls the author must know.**
- **Projection-dependence.** Winding is defined relative to a chosen reference point p and a chosen 2D projection plane. The literature is explicit that the winding number depends on the choice of center point, and that for non-quasiperiodic (chaotic) data the result can be trivial or meaningless (e.g., the 2024–2025 *Modelling* studies on winding numbers in chaotic Poincaré sections). A semantic state sequence projected to 2D will give winding numbers that are artifacts of the projection unless the plane is principled.
- **Moving-target / non-autonomous attractor.** Revision is not an autonomous dynamical system: the "equilibrium" p is itself estimated from the same finite, possibly non-stationary trajectory, and the editing process changes over time. Winding around a drifting/ill-defined p is not well posed.
- **Sampling/aliasing of phase.** Unwrapping requires phase increments < π between samples; sparse revision sequences (few drafts) can alias, producing spurious or undercounted windings.

Using winding as an oscillation/convergence diagnostic for an iterative process is **defensible** and recognized in principle, but for short, non-autonomous, high-dimensional revision sequences it is fragile. It should be presented as a heuristic visualization, not a topological invariant.

---

## 5. Physics Borrowings in the Propagation Model — LOAD-BEARING OR DECORATIVE?

**(a) Graph-Laplacian / heat-diffusion propagation. Verdict: PARTIALLY-RIGOROUS; real but the better-matched models are cascade/threshold models.**
Heat-kernel/Laplacian diffusion on graphs is a real, well-developed area: graph signal processing, diffusion kernels (Kondor & Lafferty 2002), and **label propagation** (Zhu, Ghahramani & Lafferty 2003) literally model values spreading over a graph toward a (source-pinned) equilibrium. So "an edit diffuses to coupled nodes like heat" is a real model. **But** for discrete *edit propagation* the more faithful established models are the **Independent Cascade and Linear Threshold models** (Kempe, Kleinberg & Tardos, "Maximizing the Spread of Influence through a Social Network," KDD '03, pp. 137–146 — the paper that proved a greedy seed strategy is provably within (1−1/e)≈63% of optimal and later won an inaugural SIGKDD Test of Time Award), and, in software/document engineering, **change-impact / ripple-effect analysis** on dependency graphs (see §6). The author should map onto these rather than (or in addition to) heat diffusion, since linear diffusion smooths everything to a trivial equilibrium unless sources are pinned.

**(b) Epidemiological analogy ("semantic R₀", superspreaders, quarantine, SIR). Verdict: DECORATIVE-to-PARTIALLY-RIGOROUS; "semantic R₀" is metaphor unless carefully operationalized.**
SIR/SIS on networks and the basic reproduction number R₀ are rigorous; the Reed–Frost (discrete SIR) process is *identical* to the Independent Cascade model with fixed transmission probability, and SIR static properties map to bond percolation (Grassberger 1983; Newman 2002, "Spread of epidemic disease on networks," *Phys. Rev. E*). However: (i) Newman's SIR↔percolation isomorphism is *subtler than usually stated* — it fails to reproduce the full outbreak-size distribution when the infectious period is non-degenerate (Kenah & Robins 2007, "Second look at the spread of epidemics on networks"). (ii) A "semantic R₀" would only be well-defined given an explicit, estimable per-edge transmission probability for edits and a defined recovery state. Absent a calibrated edit-transmission model, "semantic R₀" is evocative labeling, not an estimable quantity.

**(c) N-body / Barnes–Hut / FMM as "scalable semantic repulsion." Verdict: RIGOROUS but a CLEAR REINVENTION. This is the single most direct case of reinventing a known method.**
Barnes & Hut ("A hierarchical O(N log N) force-calculation algorithm," *Nature* 324:446–449, 1986) and the Fast Multipole Method (Greengard–Rokhlin) approximate far-field forces using center-of-mass/multipole summaries, reducing N-body cost from O(N²) to O(N log N) or O(N). This is **already standard in embedding layout**: **Barnes–Hut t-SNE** (van der Maaten, "Accelerating t-SNE using Tree-Based Algorithms," *JMLR* 15(Oct):3221–3245, 2014, which "develops variants of the Barnes-Hut algorithm… that approximate the gradient used for learning t-SNE embeddings in O(N log N)" and was tested on data sets with up to 30 million examples) explicitly interprets the t-SNE gradient as an N-body system and approximates repulsive forces with a quadtree and center-of-mass summaries; FIt-SNE, **UMAP**, and **ForceAtlas2** use related approximations. The framework's "multipole semantic surrogate for distant clusters" is, essentially feature-for-feature, Barnes–Hut t-SNE's far-field repulsion approximation. The author is almost certainly reinventing it and should cite van der Maaten (2014) and Barnes & Hut (1986) and simply adopt the existing method.

**(d) Force-directed equilibrium / energy functionals / Lyapunov stability. Verdict: PARTIALLY-RIGOROUS; rigorous only if an explicit energy/Lyapunov function is supplied.**
Force-directed graph drawing (Eades 1984; Fruchterman–Reingold 1991; Kamada–Kawai 1989; **stress majorization**, Gansner, Koren & North 2005) defines layouts as minima of an explicit energy/stress functional; stress majorization is provably monotonically convergent. "Semantic equilibrium as force balance" is therefore rigorous *iff* the author writes down the actual energy functional and shows the dynamics is its gradient flow (then the energy *is* a Lyapunov function). If "equilibrium" is asserted only by analogy without an energy certificate, it is hand-waving. The fix is concrete and cheap: state the energy E, derive forces as −∇E, and cite stress majorization for guaranteed descent.

---

## 6. The Underlying "Narrative Perturbation Propagation Model" — EMPIRICALLY SUPPORTED?

**Verdict: SPECULATIVE ARCHITECTURE with strong adjacent empirical anchors in software engineering, weak ones in narratology.**

- The strongest real-world analog is **change-impact analysis / ripple-effect analysis** in software engineering: modeling a codebase as a dependency/call graph and propagating the consequences of a change is a mature, empirically studied practice (program dependence graphs; ripple-effect metrics; change-propagation heuristics with measured recall/precision). "How an edit to one unit propagates to coupled units" is well supported *for code and formal dependency structures*.
- For **narrative/document semantics**, support is thinner. There is real work on computational models of story/narrative structure and on document coherence, but treating inter-chapter edit consequences as a *physical diffusion/force process* is, as far as the literature shows, not empirically validated. It is a plausible architectural metaphor awaiting evidence.
- **What validation would require:** (1) a labeled corpus of real multi-document revisions where an edit to unit A is known to have necessitated edits to units B, C…; (2) a defined semantic-state representation (e.g., embeddings) per unit; (3) showing the propagation model *predicts* which units actually required downstream edits, beating baselines (e.g., simple co-reference/dependency adjacency); (4) calibrated transmission parameters. Until then, the model is engineering speculation, not an empirically supported theory.

---

## 7. Meta-Methodology — KNOWLEDGE-ENGINEERING PRIOR ART

**Verdict: RIGOROUS as a reasonable instance of known practice; idiosyncratic only in vocabulary.**

The pipeline (derivative-extraction passes, a "discovery field," minted UNIDs with a "steward registry," provisional concept records) is a reasonable, if reinvented, instance of established practice:
- **Ontology development methodologies**: METHONTOLOGY (Fernández-López, Gómez-Pérez & Juristo 1997) and the **NeOn methodology** (Suárez-Figueroa et al. 2015) define lifecycle activities — specification, conceptualization (glossary of terms, concept dictionary, provisional concepts), formalization — and explicitly include reusing/re-engineering non-ontological resources into "tentative concepts." The framework's "derivative extraction → provisional concept records" is conceptualization in this sense.
- **Knowledge-graph construction / ontology evolution** literature covers lifecycle maintenance and stewardship.
- **Zettelkasten** (Luhmann's networked note system, ~90,000 cards each with a unique alphanumeric identifier and explicit links) is the direct ancestor of "minted UNIDs" linking atomic concept records; the modern "tools for thought" / networked-note movement (Roam, Obsidian, and Notion itself) generalizes it.
- **Provenance & persistent identifiers**: the "steward registry" + UNIDs correspond to PID systems and to **nanopublications** (Groth, Gibson & Velterop 2010), which attach provenance and attribution to atomic assertions.
- **LLM-assisted concept mining / knowledge extraction pipelines** are now common.

The protocol is a defensible recombination; the author should cite METHONTOLOGY/NeOn, Luhmann/zettelkasten, and nanopublications and avoid implying the workflow is sui generis.

---

## 8. Synthesis — Honest Verdict

**(i) Where it is genuinely novel/defensible.** The *integration* — a provenance-tracked, LLM-assisted Notion pipeline that applies a small fixed set of concept-transformation operators and records minted concepts with stewardship — is a legitimate engineering contribution at the tooling level. The σ_x/σ_y/σ_z *content* (analogy/extension/abstraction) is a principled basis, but it is principled *because* it recovers an existing tripartition, not because it is new.

**(ii) Where it reinvents, and what to cite.**
- "Scalable semantic repulsion" ≈ **Barnes–Hut t-SNE** (van der Maaten 2014) / Barnes & Hut (*Nature* 1986); UMAP; ForceAtlas2. *Adopt, don't reinvent.*
- σ_x analogical operator ≈ **structure-mapping** (Gentner 1983; Falkenhainer, Forbus & Gentner SME 1986) and **conceptual blending** (Fauconnier & Turner 1998).
- Operator-driven concept generation ≈ **Boden**, **TRIZ** (Altshuller), **morphological analysis** (Zwicky), **BACON/AI-Scientist** (Langley/Simon; Sakana 2024).
- Three-operator basis ≈ **abstraction/extension/analogy** tripartition (French).
- Edit propagation ≈ **change-impact analysis** + **Independent Cascade/Linear Threshold** (Kempe, Kleinberg & Tardos 2003).
- Knowledge pipeline ≈ **METHONTOLOGY/NeOn**, **zettelkasten** (Luhmann), **nanopublications** (Groth et al. 2010).
- Winding diagnostic ≈ **rotation number** (Poincaré), **phase unwrapping**, **Kuramoto winding numbers** (Delabays et al. 2016).

**(iii) Where the vocabulary outruns the content (metaphor presented as mechanism).** The **Bloch-sphere/Pauli grammar** is the clearest case: it is decorative and its "three independent axes / octants" claim contradicts the non-commuting Pauli algebra and the two-DOF Bloch sphere. The **epidemiological "semantic R₀"** is metaphor until a calibrated transmission model exists. **"Lyapunov/energy certificate" for semantic equilibrium** is rhetoric until an explicit energy functional is written down. A physicist or applied mathematician would respect the winding-number and Barnes–Hut content but bristle at the quantum framing.

**(iv) Highest-value, lowest-risk grounding steps.**
1. **Replace the quantum grammar with the cognitive-science one.** Re-label σ_x/σ_y/σ_z as analogy/extension/abstraction and cite Gentner, French, blending. Zero loss of function, large gain in credibility.
2. **Adopt Barnes–Hut t-SNE / UMAP directly** for the repulsion accelerator and benchmark against them; claim engineering integration, not algorithmic novelty.
3. **Write the energy functional.** Define E over semantic positions, derive forces as −∇E, use stress majorization for guaranteed monotone descent — converting "Lyapunov" rhetoric into a real certificate.
4. **Operationalize propagation as change-impact analysis.** Define an explicit per-edge edit-transmission probability; compare Independent Cascade / Linear Threshold predictions against a labeled revision corpus; report recall/precision vs. a dependency-adjacency baseline.
5. **Demote NRWI to a calibrated heuristic.** Fix the projection plane and reference point principledly (e.g., PCA of the state trajectory; equilibrium estimated out-of-sample), test on synthetic trajectories with known spiral/limit-cycle behavior, and report sensitivity to p and to sampling rate.
6. **Define "semantic R₀" or drop it.** Either give an estimable definition (expected number of downstream units forced to change per changed unit, with a calibrated transmission model) or present it explicitly as analogy.

**Metrics that are concrete and definable now:** downstream-edit prediction recall/precision; cascade size distribution vs. percolation prediction; embedding-layout stress/energy at convergence; NRWI sensitivity to (p, projection, sampling); operator "yield" (fraction of minted seeds judged useful by blind human raters). These would convert the framework from evocative architecture into a testable system.

---

## Caveats

- The substrate "Narrative Perturbation Propagation Model" document was not available; this assessment targets the methodology and its borrowings, not the substrate's internal correctness.
- Several real-world correspondences invoked here (SIR↔percolation; Reed–Frost↔Independent Cascade) hold under stated assumptions and have documented limitations; they should not be treated as exact in all regimes.
- "Quantum cognition" (Aerts, Busemeyer & Bruza, Khrennikov) is a real research program, but it rests on *quantum-probability* structure (interference, incompatibility), not on a Pauli-axis "grammar"; citing it does not license the framework's specific three-axis claim.
- Where the framework's exact internal definitions differ from the public methods cited, the mappings above are "maps to established concept X" rather than identity; I have flagged loose analogies as such.
- A handful of citation years/venues (e.g., Suárez-Figueroa et al. on NeOn; French's tripartition as relayed through secondary ML sources) were verified through secondary literature rather than the primary text; the core attributions are reliable but the author should confirm exact bibliographic details before formal citation.