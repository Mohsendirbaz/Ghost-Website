# Set Theory Notation

**Propositional Logic1:**

- `∧` (AND/conjunction): Both conditions must be true
- `∨` (OR/disjunction): Either condition must be true
- `¬` (NOT/negation): Condition must be false
- `→` (IMPLIES): If condition A, then condition B
- `↔︎` (IF AND ONLY IF): Bidirectional implication
- `⊕` (XOR/exclusive or): Exactly one condition is true
**Quantifiers:**
- `∀` (FOR ALL): Universal quantifier
- `∃` (EXISTS): Existential quantifier
- `∄` (DOES NOT EXIST): Negated existential quantifier
    
    ### Set Theory Notation
    
    **Set Operations:**
    
- `∈` (ELEMENT OF): Member of set
- `∉` (NOT ELEMENT OF): Not a member of set
- `⊆` (SUBSET): Subset or equal to
- `⊂` (PROPER SUBSET): Strict subset
- `∪` (UNION): Combined sets
- `∩` (INTERSECTION): Common elements
- `\` (SET DIFFERENCE): Elements in first set but not second
- `∅` (EMPTY SET): Set with no elements
    
    ### Predicate Logic Structure
    
    **State Predicates:**
    
- `Expanded(n)`: Node n is in expanded state
- `Collapsed(n)`: Node n is in collapsed state
- `HasChildren(n)`: Node n contains child nodes
- `IsVisible(n)`: Node n is currently visible
- `Selected(n)`: Node n is selected
- `Depth(n, d)`: Node n is at depth level d
- `Type(n, t)`: Node n is of type t
- `Mode(m)`: Application is in mode m
**Temporal Logic:**
- `◇` (EVENTUALLY): Will be true at some future point
- `□` (ALWAYS): Always true
- `○` (NEXT): True in next state
- `U` (UNTIL): First condition holds until second becomes true
    
    ### Example Logical Statements
    
    **Binary State Definition:**
    
    ```
    ∀n ∈ Nodes: Expanded(n) ↔ ¬Collapsed(n)
    ```
    
    **Conditional Expansion:**
    
    ```
    ∀n ∈ Nodes: (HasChildren(n) ∧ Selected(n)) → Expanded(n)
    ```
    
    **Mode-Dependent Logic:**
    
    ```
    Mode(N) → ∀n ∈ Nodes: Depth(n, d) ∧ d ≤ 2 → Expanded(n)
    Mode(R) → ∀n ∈ Nodes: Type(n, "root") → Expanded(n)
    ```
    
    **Initial Condition Framework:**
    
    ```
    InitialState() ≡ ∀n ∈ Nodes: [condition_set] → Expanded(n) ∧ ¬[condition_set] → Collapsed(n)
    ```