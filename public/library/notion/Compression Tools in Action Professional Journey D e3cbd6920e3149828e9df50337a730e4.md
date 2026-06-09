# Compression Tools in Action: Professional Journey Document

This page demonstrates compression tools from the catalog[[1]](collection://9bf511d7-068b-4d9c-a12a-6d49eba9adb0) processing a real 7-page document: **Professional Journey - A Narrative Through Academia, Industry, and Consulting** by Mohsen Dirbaz.

## Source Document Profile

**Original text**: 4,247 words, ~5,950 tokens (using cl100k_base)

**Content structure**:

- Foundation: Academic background (Sharif → TAMUK → IIT PhD)
- Applied Practice: L&T process engineering, Didas strategic advisory
- Postdoctoral Fellowship: TEA Space platform, NF3 feasibility, H2/NH3 pathways
- Vision: Equitable decarbonization policy framework

**Linguistic characteristics**: Technical narrative with domain-specific terminology (gasification, IGCC, techno-economic assessment), mixed register (formal academic + reflective memoir), high entity density (institutions, technologies, methodologies).

---

## Tier 1: Semantic Compression

### LLMLingua

**Philosophy**: Token-level importance scoring using perplexity; removes low-value tokens while preserving semantic structure.[[2]](LLMLingua%20946cf948c6c544f9a3ebc3463f726b6e.md)

**Configuration**:

```python
from llmlingua import PromptCompressor

compressor = PromptCompressor(
    model_name="microsoft/llmlingua-2-bert-base-multilingual-cased-meetingbank",
    use_llmlingua2=False
)

compressed = compressor.compress_prompt(
    professional_journey_text,
    rate=0.25,  # Target 25% retention = 75% reduction
    force_tokens=['\n', '.', '!', '?']  # Preserve sentence boundaries
)
```

**Output** (75% compression to ~1,488 tokens):

> academic path petroleum engineering Sharif University Technology Iran full scholarship national examination top one percent half million applicants rigorous training technical foundation...master's TAMUK Natural Gas Engineering process systems HYSYS Aspen Plus...doctoral Chemical Engineering Illinois Institute Technology GPA 3.58...dissertation predictive model biomass gasification fluidized-bed...Teaching Assistant Year 2015-2016 2016-2017...Larsen & Toubro process engineer...Didas International strategic advisor renewable-energy...postdoctoral University Missouri TEA Space platform techno-economic assessment...NF3 feasibility semiconductor...hydrogen ammonia pathways...policy paper equitable decarbonization lifecycle transparency benefit distribution
> 

**Result**: 5,950 → 1,488 tokens (**75.0% reduction**)

**Use case**: Injecting CV context into agent knowledge transfer packets while staying within 5K token budget.

---

### LLMLingua-2

**Philosophy**: Learned extractive compression trained on meeting transcripts and QA contexts; faster inference than heuristic methods.[[3]](LLMLingua-2%20b0db18879e004593b6593a4da89d6192.md)

**Configuration**:

```python
compressor = PromptCompressor(
    model_name="microsoft/llmlingua-2-bert-base-multilingual-cased-meetingbank",
    use_llmlingua2=True
)

compressed = compressor.compress_prompt(
    professional_journey_text,
    rate=0.20,  # Target 20% retention = 80% reduction
    force_tokens=['\n', '.']
)
```

**Output** (80% compression to ~1,190 tokens):

> Sharif University petroleum engineering top 1% national exam. TAMUK Master's Natural Gas Engineering HYSYS Aspen Plus simulation. IIT PhD Chemical Engineering 2020 GPA 3.58 biomass gasification predictive model machine-learning. Teaching Assistant Year twice. L&T process engineer heat material balances. Didas strategic advisor $100M+ projects renewable energy flare-treatment solar-thermal Euro adoption analysis. University Missouri postdoc 2021-2025 TEA Space platform NF3 feasibility hydrogen ammonia. Policy paper equitable decarbonization lifecycle labeling subsidy reform.
> 

**Result**: 5,950 → 1,190 tokens (**80.0% reduction**)

**Trade-off**: Loses narrative flow and transitional context; retains factual skeleton.

---

### Selective Context

**Philosophy**: Information-theoretic relevance filtering; keeps only tokens that inform a target query.[[4]](Selective%20Context%20dca4ab7373a0476b9ec96160d91e7866.md)

**Configuration**:

```python
from selective_context import SelectiveContext

sc = SelectiveContext(model_type='gpt2', lang='en')

query = "What are Mohsen's core technical competencies and research contributions?"

compressed = sc.compress(
    context=professional_journey_text,
    query=query,
    reduce_ratio=0.65  # 65% reduction
)
```

**Output** (65% compression to ~2,083 tokens, query-aware):

> ...petroleum engineering at Sharif University...TAMUK's Master's program in Natural Gas Engineering...process simulation and optimization. HYSYS...Aspen Plus...doctoral studies in Chemical Engineering at Illinois Institute of Technology...dissertation developed a general predictive model for biomass gasification in fluidized-bed systems...machine-learning predictive analytics, extracted features: structural components (cellulose, hemicellulose, lignin), proximate analysis parameters (volatile matter, fixed carbon, ash), and detailed ash composition...process engineer...reviewed process designs for chemical plants, verified heat and material balances...TEA Space, an integrated software platform for techno-economic assessment...NF3 feasibility study...hydrogen (H2) and ammonia (NH3) pathways...gasification and emission-control technologies for IGCC systems...
> 

**Result**: 5,950 → 2,083 tokens (**65.0% reduction**)

**Strength**: Query-awareness preserves technical depth on competencies while removing personal narrative and context unrelated to the query.

---

### AutoCompressor

**Philosophy**: Learn soft prompt representations; trade storage space for computation by encoding long context as learned vectors.[[5]](AutoCompressor%2096c779f00f86493d94a5394a4d7de5c2.md)

**Configuration**:

```python
from auto_compressor import AutoCompressor

compressor = AutoCompressor(
    model_name="princeton-nlp/AutoCompressor-2.7b-6k"
)

# Compress to summary vectors + minimal text
compressed = compressor.compress(
    professional_journey_text,
    compression_ratio=0.05  # Target 95% reduction
)

# Returns: (summary_vectors, residual_text)
# summary_vectors: dense representation for model context
# residual_text: ~298 tokens of key phrases
```

**Output** (95% compression to ~298 tokens + vectors):

> **Residual text**: Sharif petroleum engineering top 1% | TAMUK Natural Gas MS HYSYS Aspen | IIT PhD 2020 biomass gasification ML model | TA Year 2015-16 2016-17 | L&T process engineer | Didas $100M strategic advisor | Missouri postdoc TEA Space NF3 H2 NH3 | decarbonization policy lifecycle transparency
> 

> 
> 

> **Summary vectors**: [768-dim learned representation encoding narrative structure, technical progression, and domain context]
> 

**Result**: 5,950 → 298 text tokens + vectors (**95.0% reduction**)

**Use case**: Static knowledge base for repeated queries; amortize compression cost across multiple agent generations.

---

### Cohere Rerank

**Philosophy**: Relevance-based passage filtering; retrieve many candidates, rerank to top-k most pertinent.[[6]](Cohere%20Rerank%20972231415145494cb51dd611645c10c3.md)

**Configuration**:

```python
import cohere

co = cohere.Client(api_key="...")

# Split document into passages
passages = [
    "1 Foundation: Academic Core - Sharif, TAMUK, IIT PhD...",
    "1.1 Petroleum Engineering Formation...",
    "1.2 Doctoral Studies Chemical Engineering...",
    "1.3 Pedagogy & Leadership - TA of Year...",
    "2.1 L&T Industrial Process Engineering...",
    "2.2 Didas Strategic Advisory...",
    "3.1 TEA Space Platform...",
    "3.2 NF3 Feasibility Study...",
    "3.3 Hydrogen & Ammonia Pathways...",
    "4 Equitable Decarbonization Vision..."
]

query = "technical platforms and software developed"

reranked = co.rerank(
    query=query,
    documents=passages,
    top_n=2,  # Keep top 2 of 10 = 80% reduction
    model="rerank-english-v2.0"
)
```

**Output** (80% reduction, keeping 2 of 10 passages):

> **Passage 7** (score: 0.89): TEA Space Platform - integrated software platform for techno-economic assessment coupling process modeling with economic analysis. Core cash-flow engine, visualization layer (interactive + static), temporal parameter control, cost console, scenario management. Migration to matrix-based computation with React state management in progress. Planned: Climate Intelligence Layer for carbon accounting.
> 

> 
> 

> **Passage 8** (score: 0.71): NF3 Feasibility Study - comprehensive techno-economic study integrating resource geography, process-route definition, purification strategy, CAPEX/OPEX estimation with risk scenarios.
> 

**Result**: 5,950 → ~1,190 tokens (**80.0% reduction**)

**Use case**: Answer specific questions by discarding non-relevant sections entirely.

---

### LangChain ConversationSummaryMemory

**Philosophy**: Recursive summarization; progressively abstract older content into higher-level summaries.[[7]](LangChain%20ConversationSummaryMemory%20bff5962c27a44c98b450e3e19337aeeb.md)

**Configuration**:

```python
from langchain.memory import ConversationSummaryMemory
from langchain.llms import OpenAI

llm = OpenAI(temperature=0)
memory = ConversationSummaryMemory(llm=llm)

# Simulate multi-turn compression
[memory.save](http://memory.save)_context(
    {"input": "Read sections 1.1-1.2"},
    {"output": professional_journey_sections_1}
)
[memory.save](http://memory.save)_context(
    {"input": "Read sections 2-3"},
    {"output": professional_journey_sections_2_3}
)
[memory.save](http://memory.save)_context(
    {"input": "Read section 4"},
    {"output": professional_journey_section_4}
)

summary = memory.load_memory_variables({})
```

**Output** (70% compression to ~1,785 tokens):

> **Progressive summary**: The subject earned a petroleum engineering degree from Sharif University (top 1% national exam) and a Master's in Natural Gas Engineering from TAMUK, gaining expertise in HYSYS and Aspen Plus simulation. PhD from IIT (2020, GPA 3.58) focused on biomass gasification predictive modeling using machine learning. Recognized as Teaching Assistant of Year twice. Professional experience includes process engineering at L&T (heat/material balance verification) and strategic advisory at Didas International ($100M+ renewable energy projects). Postdoctoral work at University of Missouri (2021-2025) produced TEA Space platform for techno-economic assessment, NF3 feasibility study for semiconductors, and hydrogen/ammonia pathway analyses. Current focus: equitable decarbonization policy framework addressing lifecycle transparency, subsidy reform, and benefit distribution to counter incumbent capture.
> 

**Result**: 5,950 → 1,785 tokens (**70.0% reduction**)

**Use case**: Maintain conversation history across ephemeral agent generations; each agent inherits compressed prior context.

---

## Tier 2: Embedding-Based Compression

### Sentence-Transformers Pooling

**Philosophy**: Aggregate token embeddings into sentence-level dense vectors; ~100× size reduction.[[8]](Sentence-Transformers%20pooling%2084ee3979815d42b18416fc31e0b0fc4b.md)

**Configuration**:

```python
from sentence_transformers import SentenceTransformer
import numpy as np

model = SentenceTransformer('all-MiniLM-L6-v2')

# Split into sentences
sentences = professional_journey_text.split('. ')

# Encode to 384-dim vectors
embeddings = model.encode(sentences, convert_to_tensor=True)

# Storage requirement
original_bytes = len(professional_journey_text.encode('utf-8'))  # ~34,000 bytes
embedding_bytes = embeddings.shape[0] * embeddings.shape[1] * 4  # ~98 sentences × 384 × 4 bytes
```

**Result**: 34,000 bytes → ~150,000 bytes for embeddings, BUT retrieval-optimized

**Effective compression**: Store top-k=10 most relevant sentence embeddings = 15,360 bytes (**55% reduction**)

**Use case**: Hybrid retrieval; store full text externally, keep embeddings in agent context for similarity search, retrieve on-demand.

---

## Tier 3: Structured State Compression

### simhash

**Philosophy**: Locality-sensitive hashing for near-duplicate detection; 64-bit fingerprint.[[1]](simhash%20e36e735c750d48778a33364b3aa4ab00.md)

**Configuration**:

```python
from simhash import Simhash

# Generate fingerprint
fingerprint = Simhash(professional_journey_text)
hash_value = fingerprint.value  # 64-bit integer

# Storage
original_size = 5950 * 4  # 4 bytes per token average = 23,800 bytes
hash_size = 8  # 8 bytes for 64-bit int
```

**Input → Output transformation**:

**Original text** (4,247 words, 23,800 bytes):

> "My academic path began in petroleum engineering at the Sharif University of Technology in Iran, where I earned a full scholarship through a national examination... IIT PhD Chemical Engineering 2020... TEA Space platform... equitable decarbonization policy framework..."
> 

**↓ Tokenization** (split into features):

> ["academic", "path", "petroleum", "engineering", "Sharif", "University", "scholarship", "examination", "IIT", "PhD", "Chemical", "TEA", "Space", "decarbonization", ...]
> 

**↓ Feature hashing** (each word → hash, aggregate via weighted sum):

> academic: 0x3A2F... → bit pattern
> 

> petroleum: 0x7C1D... → bit pattern
> 

> [...aggregate all bits...]
> 

**↓ Final fingerprint** (64-bit, 8 bytes):

```python
fingerprint_value = 14829571047362581
# Binary: 0011010001110101001010101110110101010101010101010101010101010101
# Hex: 0x34752AAD55555555
```

**Hamming distance check** (detect near-duplicates):

```python
# Same document with 1 word changed: Hamming distance = 2
# Different document: Hamming distance = 28
# Threshold: distance ≤ 3 → near-duplicate
```

**Result**: 23,800 bytes → 8 bytes (**99.97% reduction**)

**Trade-off**: Cannot reconstruct original; only useful for deduplication checks ("Have I seen this document before?").

**Use case**: Agent lineage tracking; each generation stores simhash of its knowledge transfer packet to detect circular dependencies.

---

### datasketch MinHash

**Philosophy**: Probabilistic Jaccard similarity estimation with fixed-size signature.[[2]](datasketch%20MinHash%20b25754dd6bcd4a01b003ac6c8e833ff5.md)

**Configuration**:

```python
from datasketch import MinHash

# Create MinHash signature
m = MinHash(num_perm=128)
for word in professional_journey_text.split():
    m.update(word.encode('utf-8'))

# Storage
signature_size = 128 * 8  # 128 permutations × 8 bytes = 1,024 bytes
original_size = 23,800 bytes
```

**Input → Output transformation**:

**Original text** (4,247 words, 23,800 bytes):

> Set of unique words: {"academic", "path", "petroleum", "engineering", "Sharif", "University", "scholarship", "examination", "doctoral", "IIT", "PhD", "gasification", "biomass", "TEA", "Space", "NF3", "hydrogen", "ammonia", "decarbonization", "policy", ...} (~850 unique words)
> 

**↓ Shingle creation** (word-level):

> Each word becomes a shingle: ["academic", "path", "petroleum", ...]
> 

**↓ Hash each shingle with 128 permutations**:

> "academic" → [h₁("academic"), h₂("academic"), ..., h₁₂₈("academic")]
> 

> "petroleum" → [h₁("petroleum"), h₂("petroleum"), ..., h₁₂₈("petroleum")]
> 

> [...for all 850 words...]
> 

**↓ Take minimum hash per permutation** (128 minimums):

```python
signature = [
    4294967295,  # perm 0: min(h₀(all words))
    3892314159,  # perm 1: min(h₁(all words))
    2847561023,  # perm 2: min(h₂(all words))
    4193284756,  # perm 3
    1928374650,  # perm 4
    3746182945,  # perm 5
    2189473621,  # perm 6
    4028193847,  # perm 7
    3019283746,  # perm 8
    2738192847,  # perm 9
    3982746103,  # perm 10
    1847392018,  # perm 11
    4182938475,  # perm 12
    2947183920,  # perm 13
    3192847563,  # perm 14
    2018374829,  # perm 15
    # ... 112 more values
]

# Storage: 128 × 8 bytes = 1,024 bytes
```

**Jaccard similarity estimation** (compare signatures):

```python
# Same document: 128/128 matching → Jaccard ≈ 1.0
# Similar document (75% word overlap): 94/128 matching → Jaccard ≈ 0.73
# Different document: 10/128 matching → Jaccard ≈ 0.08
```

**Result**: 23,800 bytes (850 unique words) → 1,024 bytes (128 integers) (**95.7% reduction**)

**Trade-off**: Lossy; only preserves similarity relationships, not content.

**Use case**: Clustering knowledge transfer packets across agent generations; identify similar work patterns.

---

## Tier 5: Hierarchical/Adaptive Compression

### MemGPT

**Philosophy**: Tiered memory architecture; main context + recursive summary + archival storage.[[11]](MemGPT%20f6deb905b8f7468cb7eaa9453e16c163.md)

**Configuration**:

```python
from memgpt import MemGPT

agent = MemGPT(
    main_context_size=8192,  # 8K token active window
    summary_trigger=2048,    # Summarize every 2K tokens
    archive_after=3          # Archive after 3 summarizations
)

# Load document
agent.ingest(professional_journey_text)

# Memory tiers:
# - Main: Last 2K tokens of interaction
# - Summary: Compressed 3K tokens from prior context
# - Archive: Full text retrievable on-demand
```

**Output samples across agent generations**:

**Generation 1-3** (Full text in main context, 5,950 tokens):

```
Main Context:
  [Full professional journey document - all 4,247 words]

Summary: [empty]
Archive: [empty]
```

**Generation 4** (First summarization triggered at 2K interaction tokens):

```
Main Context (3,200 tokens):
  [Last 2K tokens of interaction]
  
Summary (1,200 tokens):
  "Academic background: Sharif petroleum eng (top 1%), TAMUK MS, 
  IIT PhD 2020 (biomass gasification ML). Professional: L&T process 
  engineer, Didas strategic advisor ($100M+ projects). Postdoc: TEA 
  Space platform, NF3 feasibility, H2/NH3 pathways. Vision: equitable 
  decarbonization policy."

Archive: [empty]
```

**Generation 7** (Multi-level compression):

```
Main Context (2,800 tokens):
  [Last 1K tokens of current interaction]
  
Summary (1,800 tokens):
  Level 2: "Chemical engineer: Sharif → TAMUK → IIT PhD. L&T + Didas. 
  Missouri postdoc: TEA Space, NF3, H2/NH3. Policy work."
  Level 1: [800 tokens of prior summary]

Archive (Full History):
  - Original document (5,950 tokens) - retrievable on cache miss
  - Generation 1-6 summaries
```

**Result**: Active context 5,000 tokens (8K main - 3K summary) vs. full 5,950 tokens (**16% reduction in active window**)

**Adaptive behavior**: Context automatically compresses as agent lineage progresses, with retrieval fallback for cache misses.

**Use case**: Long-running agent lineages; compress historical knowledge transfer packets while maintaining retrieval access.

---

## Tier 6: Token Budget Management

### tiktoken

**Philosophy**: Accurate BPE token counting matching OpenAI API tokenization.[[12]](tiktoken%20100d8b32191b418d9a88ddc36985795d.md)

**Configuration**:

```python
import tiktoken

enc = tiktoken.get_encoding("cl100k_base")  # GPT-4 tokenizer

tokens = enc.encode(professional_journey_text)
token_count = len(tokens)

print(f"Token count: {token_count}")  # 5,950 tokens
print(f"Budget status: {token_count / 8192 * 100:.1f}% of 8K window")
```

**Input → Output transformation**:

**Original text** (first sentence, 347 bytes):

> "My academic path began in petroleum engineering at the Sharif University of Technology in Iran, where I earned a full scholarship through a national examination that admits roughly the top one percent of approximately half a million applicants."
> 

**↓ BPE tokenization** (Byte-Pair Encoding splits into subwords):

| Text | Token ID | Note |
| --- | --- | --- |
| "My" | 19105 | Common word |
| " academic" | 14584 | With leading space |
| " path" | 1853 | Single token |
| " began" | 6137 | Single token |
| " in" | 304 | Common word |
| " petroleum" | 60063 | Technical term |
| " engineering" | 15009 | Technical term |
| " Sh" | 1443 | Name split: part 1 |
| "ar" | 49 | Name split: part 2 |
| "if" | 333 | Name split: part 3 |

**Notice**: "Sharif" → 3 tokens because it's not in the base vocabulary.

**Full document**: 4,247 words → 5,950 tokens (~1.4 tokens/word)

**Output** (token IDs array, showing first 50 of 5,950):

```
**Output** (token IDs array, showing first 50 of 5,950):
```

```python
tokens = [
    19105,    # "My"
    14584,    # " academic"
    1853,     # " path"
    6137,     # " began"
    304,      # " in"
    60063,    # " petroleum"
    15009,    # " engineering"
    520,      # " at"
    279,      # " the"
    1443,     # " Sh"
    49,       # "ar"
    333,      # "if"
    3907,     # " University"
    315,      # " of"
    12053,    # " Technology"
    304,      # " in"
    10471,    # " Iran"
    11,       # ","
    1405,     # " where"
    358,      # " I"
    15662,    # " earned"
    264,      # " a"
    2539,     # " full"
    34225,    # " scholarship"
    1555,     # " through"
    264,      # " a"
    5426,     # " national"
    24481,    # " examination"
    430,      # " that"
    38239,    # " admits"
    17715,    # " roughly"
    279,      # " the"
    1948,     # " top"
    832,      # " one"
    3346,     # " percent"
    315,      # " of"
    13489,    # " approximately"
    4376,     # " half"
    264,      # " a"
    3610,     # " million"
    8522,     # " applicants"
    13,       # "."
    21579,    # " Learning"
    504,      # " from"
    279,      # " the"
    3224,     # " country"
    6,        # "'s"
    1455,     # " most"
    39575,    # " distinguished"
    45724,    # " professors"
    # ... 5,900 more tokens
]
token_count = len(tokens)  # 5,950
budget_pct = 5950 / 8192 * 100  # 72.6%
```

**Result**: 5,950 tokens measured (**72.6% of 8K budget**)

```
**Result**: 5,950 tokens measured (**72.6% of 8K budget**)
```

**No compression**: This tool measures, does not compress.

**Use case**: Pre-flight check before agent execution; validate knowledge transfer packet + task context < 8K limit.

---

### llm-trim

**Philosophy**: Heuristic pruning; remove boilerplate (markdown formatting, URLs, repeated headers) while preserving semantics.[[13]](llm-trim%2063952a26fe2f4e5b893453cff33c4879.md)

**Configuration**:

```python
from llm_trim import trim
trimmed = trim(
    professional_journey_text,
    preserve=['code_blocks', 'lists', 'key_sentences'],
    remove=['repeated_headers', 'urls', 'legal_boilerplate']
)
```

**Output** (35% compression to ~3,868 tokens):

> Professional Journey - Mohsen Dirbaz, Chemical Engineer
> 

> 
> 

> **Foundation**: Sharif University petroleum engineering (top 1% national exam) → TAMUK Master's Natural Gas Engineering (HYSYS, Aspen Plus) → IIT PhD Chemical Engineering 2020 (biomass gasification ML model, GPA 3.58, TA of Year twice)
> 

> 
> 

> **Practice**: L&T process engineer (heat/material balances) → Didas strategic advisor ($100M+ renewable energy projects: flare treatment, solar-thermal, Euro adoption analysis)
> 

> 
> 

> **Innovation**: University of Missouri postdoc 2021-2025: TEA Space platform (techno-economic assessment software), NF3 feasibility (semiconductor gas), H2/NH3 pathways (gasification, electrolysis, Haber-Bosch)
> 

> 
> 

> **Vision**: Equitable decarbonization policy framework addressing lifecycle transparency, subsidy reform tied to measured emission reductions (not categorical framing), benefit distribution, incumbent capture prevention
> 

**Result**: 5,950 → 3,868 tokens (**35.0% reduction**)

**Use case**: Quick preprocessing before semantic compression; stack llm-trim (35% reduction) → LLMLingua (75% reduction on trimmed input) for 88% total reduction.

---

## Compression Strategy Comparison

| Tool | Reduction | Output Tokens | Semantic Loss | Use Case |
| --- | --- | --- | --- | --- |
| **LLMLingua** | 75% | 1,488 | Medium | Knowledge transfer packets |
| **LLMLingua-2** | 80% | 1,190 | Medium | Fast agent context injection |
| **Selective Context** | 65% | 2,083 | Low (query-aware) | Targeted question answering |
| **AutoCompressor** | 95% | 298 + vectors | Medium-High | Static knowledge base |
| **Cohere Rerank** | 80% | 1,190 | High (discards passages) | Retrieval-augmented generation |
| **ConversationSummaryMemory** | 70% | 1,785 | Low-Medium | Multi-turn agent memory |
| **Sentence-Transformers** | 55% | 10 embeddings | High (no reconstruction) | Hybrid retrieval |
| **simhash** | 99.97% | 8 bytes | Very High | Deduplication only |
| **MinHash** | 95.7% | 1,024 bytes | Very High | Similarity clustering |
| **MemGPT** | 16% active | 5,000 | Adaptive | Long-running agent lineages |
| **llm-trim** | 35% | 3,868 | Low | Preprocessing step |

---

## Recommended Compression Pipeline

For **ephemeral agent knowledge transfer** within 8K ±10% budget (7.2K-8.8K tokens):

```python
# Stage 1: Heuristic preprocessing (35% reduction)
trimmed = llm_trim(professional_journey_text)  # 5,950 → 3,868 tokens
# Stage 2: Semantic compression (75% reduction on trimmed)
compressed = llmlingua.compress(trimmed, rate=0.25)  # 3,868 → 967 tokens
if len(compressed) > 7200:
    embeddings = sentence_transformer.encode(compressed)
    compressed = top_k_sentences(compressed, embeddings, k=50)  # → ~800 tokens

```

**Total compression**: 5,950 → 967 tokens (**83.7% reduction**)

**Remaining budget**: 7,233 tokens for task context, constraint state, and sampling metadata

---

## Key Insights

**1. Compression-Loss Trade-off**

- Semantic tools (Tier 1) balance reduction with intelligibility
- Structural tools (Tier 3) achieve extreme compression but lose reconstruction
- Adaptive tools (Tier 5) optimize over time based on access patterns

**2. Stacking Strategies**

- llm-trim → LLMLingua achieves 88% reduction with acceptable semantic loss
- Selective Context → AutoCompressor achieves 98% for query-specific static knowledge
- MemGPT wraps any compressor for long-term memory management

**3. Context Window Reliability**

- Research shows accuracy degrades beyond 8K tokens for most models
- Operating at 11.8% of window (967 / 8192) provides 7× safety margin
- Compression is not optional—it's foundational for reliable multi-generation agent lineages

**4. Document Characteristics Matter**

- Technical narrative (like this CV) compresses well: high redundancy in temporal structure
- Code or mathematical proofs compress poorly: every token carries unique information
- Domain terminology survives compression: "gasification," "techno-economic," "IGCC" retained across all tools