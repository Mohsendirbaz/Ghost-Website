# Coherence Assessment Procedures

This page details practical methods for evaluating text coherence across multiple dimensions.

---

## Structural/Lexical Cohesion

### Word Overlap

- **Method**: Jaccard or cosine similarity between adjacent segments
- **Formula**: `Jaccard(A,B) = |A∩B|/|A∪B|`
- **Tools**: scikit-learn, NLTK
- **Complexity**: O(n·m)
- **Use case**: Quick checks when only reference topology available

### Reference Topology

- **Method**: Shared citations, cross-references, entity links
- **Our implementation**: Capacity-weighted Jaccard
- **Complexity**: O(n) per pair
- **Strength**: Explicit use of hierarchy; efficient
- **Limitation**: Doesn't capture semantic coherence

### Discourse Markers

- **Method**: Count and classify connectives (however, therefore, meanwhile)
- **Data source**: Penn Discourse Treebank (PDTB)
- **Metric**: Percentage of sentence pairs with explicit markers
- **Tools**: PDTB parser, spacy-discourse

### Coreference Chains

- **Method**: Track pronoun references and noun phrase recurrences
- **Metric**: Proportion of adjacent sentences sharing a referent
- **Tools**: spaCy neuralcoref, AllenNLP coref
- **Use case**: Scene-to-scene coherence tracking

---

## Entity-Based Models

### Entity Grid (Barzilay & Lapata 2008)

**Procedure:**

1. Extract named entities from text (spaCy NER)
2. Build grid: rows = sentences, columns = entities
3. Mark each cell with grammatical role: S (Subject), O (Object), X (Other), or - (absent)
4. Compute transition probabilities: P(r_i→r_j) = count(r_i→r_j)/total
5. Use transitions as features for coherence classification

**Implementation:**

```python
build_entity_grid(sentences) -> grid
compute_local_coherence(grid) -> score
```

**Complexity**: O(n²_sentences × n_entities)

**Accuracy**: 87-90% in ranking coherent vs permuted paragraphs

**Tools**: spaCy (NER), SVMlight or sklearn

### Centering Theory (Grosz et al.)

**Transitions:**

- **Continue**: Same entity remains center (highest coherence)
- **Retain**: Entity mentioned but not center
- **Shift**: New center entity (lower coherence)

**Metric**: Proportion of Continue transitions

**Complexity**: O(s·e)

**Tools**: spaCy/AllenNLP (coref) + custom logic

### Entity Salience

- Important entities should be referenced consistently
- Track protagonist-centeredness in fiction
- Monitor term repetition in technical text

---

## Semantic Approaches

### Latent Semantic Analysis (LSA)

**Method:**

1. Build term-document matrix
2. Apply SVD to create latent space
3. Compute sentence vectors in latent space
4. Measure cosine similarity between adjacent sentences

**Complexity**: O(n³) for SVD

**Tools**: Gensim, scikit-learn LSA/LDA

**Use case**: Document-level topical coherence

### Sentence Embeddings (SBERT)

**Method:**

1. Encode sentences using pre-trained model (all-mpnet-base-v2)
2. Compute cosine similarity between successive vectors
3. Average or aggregate across text

**Complexity**: O(n·d) where d = embedding dimension

**Tools**: sentence-transformers

**Advantage**: Captures synonymy and paraphrase

### Topic Modeling

**Method:**

1. Apply LDA or BERTopic to paragraphs
2. Track topic distribution shifts
3. Flag large topic jumps as potential coherence breaks

**Tools**: Gensim LDA, BERTopic

**Metric**: Topic similarity between adjacent segments

---

## Discourse Structure

### RST (Rhetorical Structure Theory)

**Relations:**

- Nucleus-Satellite: Elaboration, Cause, Contrast, etc.
- Coherent texts show predictable relation sequences
- Example: Elaboration typically follows claims

**Procedure:**

1. Parse text with RST parser (discopy)
2. Extract relation tree
3. Count relation types and patterns
4. Flag unexpected relation inversions

**Complexity**: O(n²) or higher

**Use case**: Final evaluation or qualitative analysis

### PDTB Relations

**Method:**

1. Identify explicit connectives (because, however)
2. Classify implicit relations between sentence pairs
3. Build discourse role matrix
4. Compare observed transitions to coherent corpus patterns

**Patterns:**

- Contrast→Cause is common
- Unexpected sequences indicate incoherence

**Tools**: PDTB parser, En-DT-parser

---

## Multi-Scale Assessment

### Hierarchical Coherence

**Levels:**

1. **Sentence-level**: Entity transitions, connectives
2. **Paragraph-level**: Topic consistency, internal unity
3. **Section-level**: Logical progression, thematic continuity
4. **Document-level**: Overall argument structure, global coherence

**Implementation:**

- Compute coherence at each level separately
- Apply capacity-weighting to higher levels
- Aggregate scores with appropriate weights

### Capacity-Weighted Measures

**Principle**: References to large-scale chapters count more

**Formula**: Weight by significance/capacity of referenced entity

**Current implementation**: Weighted Jaccard on reference sets

**Extension**: Apply to other metrics (entity overlap, semantic similarity)

### Aggregation Strategies

- **Average**: Simple mean of local scores
- **Weighted average**: By section length or importance
- **Minimum**: Identify weakest links
- **Profile**: Report multi-dimensional vector

---

## Implementation Workflow

### Phase 1: Structural Analysis ✓

**Status**: Implemented

- Reference topology (capacity-weighted Jaccard)
- Cross-reference density
- Hierarchical structure evaluation

### Phase 2: Entity-Based

**Tools needed**:

- spaCy `en_core_web_lg` for NER
- AllenNLP or neuralcoref for coreference
- Custom entity grid builder

**Steps**:

1. Extract entities at scene/paragraph level
2. Build entity grid per chapter
3. Compute transition scores
4. Flag entity discontinuities

### Phase 3: Lexical/Semantic

**Tools needed**:

- SentenceTransformer (all-mpnet-base-v2)
- Gensim or BERTopic
- scipy for cosine similarity

**Steps**:

1. Encode sentences/paragraphs
2. Compute pairwise similarities
3. Identify topic drift
4. Generate similarity profile

### Phase 4: Discourse Relations

**Tools needed**:

- discopy (RST parser)
- spacy-discourse or PDTB parser

**Steps**:

1. Parse chapters for relations
2. Extract relation sequences
3. Compare to expected patterns
4. Flag missing connectives

---

## Scoring Normalization

### Range Standardization

- Jaccard: [0,1] native
- Cosine similarity: [-1,1] → use (cos+1)/2 or filter positive
- Entity grid: Normalize transition probabilities
- LSA: Scale by maximum observed value

### Composite Scoring

**Example weighted combination**:

```
Coherence_total = 0.3 × structural + 0.25 × entity + 0.25 × semantic + 0.2 × discourse
```

**Adjust by genre**:

- Fiction: Boost entity weight (protagonist continuity)
- Technical: Boost structural weight (term consistency)
- Argumentative: Boost discourse weight (logical relations)

---

## Performance Benchmarks

**Correlation with human judgments (ρ)**:

- Entity grid: 0.5-0.7
- RST-based: 0.5-0.7
- BERT-based: 0.6-0.8+ (highest)
- Hybrid features: Outperform single metrics

**Computational costs**:

- Structural: Fast (seconds for book-length)
- Entity: Moderate (minutes for book-length)
- Semantic: Moderate (minutes with GPU)
- Discourse: Slow (hours for book-length, may need fine-tuning)