# Reference Appendix

# Technical Reference & Implementation Details

Code snippets, formulas, and detailed specifications for framework implementation.

---

## Coherence Budget Implementation

```python
class CoherenceBudgetMeasure:
    
    MODE_WEIGHTS = {
        'narrative': {'DM': 0.51, 'EC': 0.45, 'ED': 0.38, 'Ev': 0.35},
        'data':      {'DM': 0.40, 'EC': 0.40, 'ED': 0.45, 'Ev': 0.45},
        'theory':    {'DM': 0.60, 'EC': 0.45, 'ED': 0.25, 'Ev': 0.20},
        'method':    {'DM': 0.45, 'EC': 0.35, 'ED': 0.50, 'Ev': 0.40}
    }
    
    MODE_BOUNDS = {
        'narrative': (1.77, 2.49),
        'data':      (2.20, 3.10),
        'theory':    (1.50, 2.20),
        'method':    (2.00, 2.80)
    }
    
    def evaluate(self, paragraph: str) -> dict:
        mode = self.detect_mode(paragraph)
        features = self.extract_features(paragraph)
        weights = self.MODE_WEIGHTS[mode]
        budget = sum(weights[k] * features[k] for k in weights)
        bounds = self.MODE_BOUNDS[mode]
        
        return {
            'flagged': not (bounds[0] <= budget <= bounds[1]),
            'budget': budget,
            'bounds': bounds,
            'mode': mode
        }
```

---

## Evidence Standards Implementation

```python
class EvidenceStandardMeasure:
    
    MODE_THRESHOLDS = {
        'data': 3.0,
        'method': 0.8,
        'theory': 0.0,
        'narrative': 1.5
    }
    
    def evaluate(self, paragraph: str) -> dict:
        mode = self.detect_mode(paragraph)
        claims = self.count_claims(paragraph)
        evidence = self.count_evidence(paragraph)
        
        if claims == 0:
            return {'flagged': False, 'mode': mode, 'claims': 0}
        
        ratio = evidence / claims
        threshold = self.MODE_THRESHOLDS[mode]
        
        return {
            'flagged': ratio < threshold,
            'ratio': ratio,
            'threshold': threshold,
            'mode': mode
        }
```

---

## Entity Continuity Calculation

```python
class EntityContinuityMeasure:
    
    CONTINUITY_FLOOR = 0.42  # Empirical threshold
    
    def calculate_continuity(self, mentions: list, document: str) -> float:
        """Score = 1 / (1 + average_gap_size)"""
        if len(mentions) <= 1:
            return 1.0
        
        gaps = []
        for i in range(len(mentions) - 1):
            gap = mentions[i+1] - mentions[i] - 1
            gaps.append(gap)
        
        avg_gap = sum(gaps) / len(gaps)
        return 1 / (1 + avg_gap)
```

---

## Cognitive Load Measure

```python
class CognitiveLoadMeasure:
    
    MODE_BOUNDS = {
        'narrative': 107,
        'data': 125,
        'theory': 95,
        'method': 120
    }
    
    def evaluate(self, paragraph: str) -> dict:
        mode = self.detect_mode(paragraph)
        sentences = self.split_sentences(paragraph)
        
        avg_sent_length = sum(len(s.split()) for s in sentences) / len(sentences)
        entity_density = self.count_entities(paragraph) / len(sentences)
        
        load = avg_sent_length * entity_density
        bound = self.MODE_BOUNDS[mode]
        
        return {
            'flagged': load > bound,
            'load': load,
            'bound': bound,
            'mode': mode
        }
```

---

## Feature Extraction Functions

```python
def extract_features(paragraph: str) -> dict:
    return {
        'DM': count_discourse_markers(paragraph) / word_count(paragraph) * 100,
        'EC': calculate_entity_continuity(paragraph),
        'ED': count_entities(paragraph) / sentence_count(paragraph),
        'Ev': count_evidence(paragraph) / max(count_claims(paragraph), 1)
    }

def count_discourse_markers(text: str) -> int:
    markers = [
        'however', 'therefore', 'moreover', 'furthermore',
        'consequently', 'nevertheless', 'thus', 'hence',
        'in addition', 'by contrast', 'similarly', 'likewise'
    ]
    return sum(1 for m in markers if m in text.lower())
```

---

## Profile Selection (Multi-Run Framework)

```python
def select_profile(rho_crit: float, rho_total: float) -> tuple:
    if rho_crit < 1.0:
        return (1.0, 0.0, 'critical_only')
    elif rho_total < 0.50:
        return (0.7, 0.3, 'balanced')
    elif rho_total < 0.85:
        return (0.4, 0.6, 'high_volume')
    else:
        return (0.2, 0.8, 'completion')
```

---

## Typical Values by Mode (Ground Truth Derived)

| Feature | Narrative | Data | Theory | Method |
| --- | --- | --- | --- | --- |
| DM (markers/100 words) | 1.47 | 1.18 | 1.80 | 1.35 |
| EC (entity continuity) | 0.60 | 0.63 | 0.55 | 0.50 |
| ED (entities/sentence) | 3.08 | 4.41 | 2.90 | 4.10 |
| Ev (evidence/claim) | 1.80 | 2.50 | 0.80 | 1.40 |

---

## Tools & Libraries

| Task | Recommended Tool |
| --- | --- |
| POS tagging | spaCy |
| Sentence splitting | NLTK |
| Discourse parsing | PDTB parser |
| NER | spaCy NER |
| Coreference | AllenNLP |
| Sentence similarity | SBERT |
| Topic modeling | NLTK + Custom |

---

## Measure Category Mapping

| Category | Layer | Measure Count |
| --- | --- | --- |
| Grammar | L1 | 7 |
| Style | L1 | 6 |
| Structural | L2 | 13 |
| Semantics | L3 | 3 |
| Entity-Based | L3 | 5 |
| Discourse | L4 | 4 |
| Coherence | L4 | 10 |
| Argumentation | L5 | 12 |
| **Total** |  | **61** |

---

*Last updated: December 2025 | Framework Version: 2.0*