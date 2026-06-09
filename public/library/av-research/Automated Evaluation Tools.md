# Automated Evaluation Tools

# Automated Evaluation Tools

Comprehensive guide to automated essay scoring systems, neural models, and implementation tools.

---

## Feature-Based AES Systems

### ETS e-rater

**Overview**:

- Most influential commercial AES engine
- Used operationally on TOEFL and GRE (millions of essays)
- Feature-based approach grounded in NLP research
- Often achieves human-level agreement

**Core features**:

1. **Grammar & Mechanics**
    - Subject-verb agreement errors
    - Article errors
    - Wrong word usage
    - Spelling and punctuation
2. **Style**
    - Redundancy detection
    - Sentence variety metrics
    - Word repetition
3. **Vocabulary**
    - Word sophistication (frequency-based)
    - Vocabulary range
    - Domain-appropriate terminology
4. **Organization** ⭐
    - Thesis statement presence
    - Logical paragraph breaks
    - Transition word usage
5. **Discourse Coherence** ⭐
    - Logical connectors count
    - Discourse marker analysis
    - Coherence breakdown flags

**Implementation approach**:

- Evidence-Centered Design: Each feature evidences a writing ability
- Aligns features with rubric constructs
- Regression or classification model on feature vector

**Hybrid scoring**:

- If e-rater disagrees with human rater beyond threshold → second human score
- Ensures validity in high-stakes contexts

**Complexity**: O(n) for most features; O(n²) for some discourse features

### Pearson IEA (Intelligent Essay Assessor)

**Overview**:

- Based on Latent Semantic Analysis (LSA)
- Focus on semantic content over form
- Used in PTE Academic and WriteToLearn

**Core approach**:

1. Build LSA space from domain corpus
2. Encode essay as vector in latent space
3. Compute semantic similarity to:
    - High-scoring reference essays
    - Ideal/model responses
    - Domain knowledge base

**Strengths**:

- Excellent for content accuracy assessment
- Can check if key concepts covered
- Works well for short-answer scoring

**Limitations**:

- Less focused on organization/grammar
- Doesn't directly gauge coherence
- Requires large training corpus

**Typical combination**: IEA for content + separate grammar/mechanics checker

**Complexity**: O(n³) for SVD; O(n) for similarity computation

### Other Commercial Systems

**Vantage IntelliMetric**:

- Ensemble of NLP and AI techniques
- 400+ features covering all aspects
- Used in GMAT AWA scoring
- Proprietary algorithms

**BETSY (Bayesian Essay Test Scoring sYstem)**:

- Naive Bayes on bag-of-words features
- Simpler but surprisingly effective
- Good for certain constrained tasks

---

## Neural/Transformer-Based Models

### BERT-Based Approaches

**DiscoScore (Zhao et al. 2023)**:

- BERT + discourse features
- High correlation with human coherence ratings
- Can handle long-range dependencies

**Implementation**:

```python
from transformers import BertModel, BertTokenizer

model = BertModel.from_pretrained('bert-base-uncased')
tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')

# Encode text
inputs = tokenizer(text, return_tensors='pt', truncation=True, max_length=512)
outputs = model(**inputs)

# Extract [CLS] token embedding for document representation
doc_embedding = outputs.last_hidden_state[:, 0, :]
```

**Advantages**:

- Captures contextual meaning
- Strong performance on coherence tasks
- Pre-trained on massive corpora

**Limitations**:

- Computationally expensive
- Black box (hard to interpret)
- 512 token limit (need chunking for long texts)

### BARTScore

**Overview**:

- Sequence-to-sequence model's likelihood as score
- Originally for factuality, adapted for coherence
- Can generate explanations

**Method**:

1. Fine-tune BART on scoring task
2. Compute P(text | context) as coherence metric
3. Higher probability = more coherent continuation

**Tools**: HuggingFace Transformers

### Sentence-BERT (SBERT)

**Overview**:

- Siamese BERT network for semantic similarity
- Produces fixed-size sentence embeddings
- Fast cosine similarity computation

**Coherence application**:

```python
from sentence_transformers import SentenceTransformer
import numpy as np

model = SentenceTransformer('all-mpnet-base-v2')

# Get embeddings
sentences = ["Sentence 1.", "Sentence 2.", "Sentence 3."]
embeddings = model.encode(sentences)

# Compute pairwise cosine similarities
from sklearn.metrics.pairwise import cosine_similarity
similarities = cosine_similarity(embeddings)

# Average adjacent sentence similarity as coherence score
adj_sims = [similarities[i, i+1] for i in range(len(sentences)-1)]
coherence_score = np.mean(adj_sims)
```

**Complexity**: O(n) for encoding; O(n²) for all pairs

**Recommended models**:

- `all-mpnet-base-v2` (best quality)
- `all-MiniLM-L6-v2` (faster, good quality)

### Contrastive Models

**Training approach**:

1. Create positive pairs: (context, next_sentence)
2. Create negative pairs: (context, random_sentence)
3. Train model to distinguish

**Inference**:

- Score = P(sentence follows context)
- Aggregate scores across document

**Datasets**: GCDC, ART corpus (coherent vs. permuted)

---

## Open-Source Tools & Libraries

### Text Analysis

**spaCy** (`en_core_web_lg` or `en_core_web_trf`)

```python
import spacy

nlp = spacy.load("en_core_web_lg")
doc = nlp(text)

# Named entities
entities = [(ent.text, ent.label_) for ent in doc.ents]

# Part-of-speech tags
pos_tags = [(token.text, token.pos_) for token in doc]

# Dependency parse
deps = [(token.text, token.dep_, token.head.text) for token in doc]
```

**AllenNLP** (Coreference Resolution)

```python
from allennlp.predictors.predictor import Predictor

predictor = Predictor.from_path(
    "[https://storage.googleapis.com/allennlp-public-models/coref-spanbert-large-2021.03.10.tar.gz](https://storage.googleapis.com/allennlp-public-models/coref-spanbert-large-2021.03.10.tar.gz)"
)

result = predictor.predict(document=text)
clusters = result['clusters']  # Coreference chains
```

### Coherence Metrics

**Coh-Metrix** (Research tool)

- 100+ cohesion and readability indices
- Lexical overlap, LSA coherence, syntax complexity
- Python wrapper: `pycohmetrix` (community-developed)

**Entity Grid Implementation**

```python
def build_entity_grid(sentences, nlp):
    """Build entity grid from sentences."""
    entities = set()
    for sent in sentences:
        doc = nlp(sent)
        entities.update([ent.text for ent in doc.ents])
    
    grid = []
    for sent in sentences:
        doc = nlp(sent)
        row = {}
        for token in doc:
            if token.text in entities:
                if token.dep_ == 'nsubj':
                    row[token.text] = 'S'
                elif token.dep_ in ['dobj', 'pobj']:
                    row[token.text] = 'O'
                else:
                    row[token.text] = 'X'
        grid.append(row)
    
    return grid, list(entities)

def compute_transitions(grid, entities):
    """Compute entity role transitions."""
    transitions = defaultdict(int)
    for i in range(len(grid)-1):
        for entity in entities:
            r1 = grid[i].get(entity, '-')
            r2 = grid[i+1].get(entity, '-')
            transitions[(r1, r2)] += 1
    return transitions
```

### Semantic Similarity

**sentence-transformers**

```bash
pip install sentence-transformers
```

**Gensim** (LSA, LDA)

```python
from gensim import corpora, models
from gensim.models import LsiModel, LdaModel

# Create dictionary and corpus
texts = [[word for word in doc.lower().split()] for doc in documents]
dictionary = corpora.Dictionary(texts)
corpus = [dictionary.doc2bow(text) for text in texts]

# LSA
lsi = LsiModel(corpus, id2word=dictionary, num_topics=100)

# LDA
lda = LdaModel(corpus, id2word=dictionary, num_topics=20)
```

**BERTopic** (Topic modeling with transformers)

```python
from bertopic import BERTopic

topic_model = BERTopic()
topics, probs = topic_[model.fit](http://model.fit)_transform(documents)

# Track topic shifts for coherence
```

### Discourse Parsing

**discopy** (RST parser)

```bash
pip install discopy
```

**spacy-discourse** (Discourse connective tagger)

```python
import spacy
import spacy_discourse

nlp = spacy.load("en_core_web_sm")
nlp.add_pipe("discourse")

doc = nlp("However, this approach has limitations. Therefore, we propose an alternative.")
for token in doc:
    if token._.is_discourse:
        print(token.text, token._.discourse_type)
```

---

## Implementation Recommendations

### Quick Coherence Check (Seconds)

```python
# 1. Structural: Capacity-weighted Jaccard on references
ref_score = weighted_jaccard(chapter1_refs, chapter2_refs, capacities)

# 2. Lexical: TF-IDF cosine
from sklearn.feature_extraction.text import TfidfVectorizer
vectorizer = TfidfVectorizer()
tfidf = [vectorizer.fit](http://vectorizer.fit)_transform([text1, text2])
lexical_score = cosine_similarity(tfidf[0], tfidf[1])[0][0]

# Combine
quick_coherence = 0.6 * ref_score + 0.4 * lexical_score
```

**Use case**: Real-time feedback during writing

### Medium Depth (Minutes)

```python
# Add entity-based + semantic

# 3. Entity grid
grid, entities = build_entity_grid(sentences, nlp)
transitions = compute_transitions(grid, entities)
entity_score = score_transitions(transitions)  # Higher Continue ratio = better

# 4. Sentence embeddings
from sentence_transformers import SentenceTransformer
model = SentenceTransformer('all-mpnet-base-v2')
embeddings = model.encode(sentences)
adj_sims = [cosine_similarity([embeddings[i]], [embeddings[i+1]])[0][0] 
             for i in range(len(embeddings)-1)]
semantic_score = np.mean(adj_sims)

# Combine all
medium_coherence = 0.25 * ref_score + 0.25 * entity_score + 0.5 * semantic_score
```

**Use case**: Chapter-level review

### Full Analysis (Hours)

```python
# Add discourse parsing

# 5. RST/PDTB relations
from discopy import Parser
parser = Parser()
tree = parser.parse(text)
relations = extract_relations(tree)
discourse_score = score_relation_patterns(relations)

# 6. Neural coherence model
from transformers import pipeline
coherence_model = pipeline("text-classification", model="your-finetuned-bert")
neural_score = coherence_model(text)[0]['score']

# Final composite
full_coherence = (
    0.15 * ref_score +
    0.20 * entity_score +
    0.25 * semantic_score +
    0.20 * discourse_score +
    0.20 * neural_score
)
```

**Use case**: Final QA before publication

---

## Performance Benchmarks

### Correlation with Human Judgments

**On GCDC dataset**:

- Baseline (word overlap): ρ ≈ 0.3-0.4
- Entity grid: ρ ≈ 0.5-0.6
- LSA-based: ρ ≈ 0.5-0.6
- BERT-based: ρ ≈ 0.7-0.8
- Hybrid (entity + discourse + neural): ρ ≈ 0.75-0.85

**On ASAP dataset** (overall essay quality):

- e-rater-style features: QWK ≈ 0.75-0.80
- Neural models (BERT): QWK ≈ 0.78-0.85
- Hybrid approaches: QWK ≈ 0.80-0.87

*QWK = Quadratic Weighted Kappa (standard metric for AES)*

### Computational Costs

**On book-length text (~100K words)**:

| Method | Time (CPU) | Time (GPU) | Memory |
| --- | --- | --- | --- |
| Jaccard | <1 sec | N/A | Low |
| TF-IDF | ~5 sec | N/A | Medium |
| Entity Grid | ~2 min | N/A | Medium |
| SBERT | ~10 min | ~1 min | High |
| LSA | ~5 min | N/A | High |
| RST Parse | ~2 hours | N/A | High |
| BERT Full | ~30 min | ~3 min | Very High |

**Optimization strategies**:

- Cache embeddings
- Parallelize independent computations
- Use GPU for neural models
- Batch processing for large corpora

---

## Model Training & Fine-Tuning

### For Custom Coherence Classifier

**Data requirements**:

- 1000+ texts with human coherence ratings (minimum)
- 5000+ texts recommended for neural models
- Diverse genres/domains

**Procedure**:

1. Collect or annotate corpus
2. Extract features (structural + entity + semantic)
3. Train regression or classification model
4. Validate on held-out set
5. Test inter-rater agreement (model vs. human)

**Model options**:

- **Traditional**: SVM, Random Forest, Gradient Boosting on feature vector
- **Neural**: Fine-tune BERT on sequence classification
- **Hybrid**: Neural embeddings as features in traditional model

### Fine-Tuning BERT Example

```python
from transformers import BertForSequenceClassification, Trainer, TrainingArguments

model = BertForSequenceClassification.from_pretrained(
    'bert-base-uncased',
    num_labels=5  # 5-point coherence scale
)

training_args = TrainingArguments(
    output_dir='./results',
    num_train_epochs=3,
    per_device_train_batch_size=8,
    per_device_eval_batch_size=8,
    warmup_steps=500,
    weight_decay=0.01,
    logging_dir='./logs',
)

trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=train_dataset,
    eval_dataset=eval_dataset,
)

trainer.train()
```

---

## Validation & Quality Assurance

### Model Evaluation Metrics

**For regression** (predicting continuous coherence score):

- Pearson correlation (ρ)
- Spearman correlation (ρ_s)
- Mean Absolute Error (MAE)
- Root Mean Square Error (RMSE)

**For classification** (predicting coherence level):

- Accuracy
- Quadratic Weighted Kappa (QWK) - preferred for ordinal
- F1 score per class
- Confusion matrix analysis

### Fairness Testing

**Check for bias across**:

- Document length
- Vocabulary level
- Genre/domain
- Author demographics (if known)

**Mitigation**:

- Balance training data
- Use length-normalized features
- Test on diverse corpora (TOEFL11, ICLE)
- Human review of edge cases

---

## References

**Key papers**:

- Barzilay & Lapata (2008): Entity Grid Model
- Zhao et al. (2023): DiscoScore
- Lai & Tetreault (2018): GCDC Dataset
- Shermis & Burstein (2013): Handbook of Automated Essay Evaluation

**Datasets**:

- ASAP: 13K essays with holistic scores
- GCDC: 1.2K texts with coherence ratings
- TOEFL11: 12K essays with proficiency labels
- ICLE: 6K+ learner essays

**Tools**:

- spaCy: [https://spacy.io](https://spacy.io)
- sentence-transformers: [https://www.sbert.net](https://www.sbert.net)
- HuggingFace: [https://huggingface.co](https://huggingface.co)
- Gensim: [https://radimrehurek.com/gensim](https://radimrehurek.com/gensim)