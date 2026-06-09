# Complementary Slides

# Two-Dimensional Discrete Fourier Transform

## Complementary Slides with Formulas and Key Concepts

---

## SLIDE 3.1: Continuous Convolution Definition

### Physical Intuition: Concert Hall Acoustics

**Analogy**: When you clap in a concert hall, you hear echoes and reverberations

- The hall has an **impulse response**
- Music = Instrument sound ⊗ Hall’s impulse response
- This blending process is **convolution**
    
    ### Mathematical Definition
    
    For continuous functions f and g:
    (*f* * *g*)(*x*) = ∫−∞∞*f*(*τ*)*g*(*x* − *τ*)*dτ***Key operation**:
    
- Flip g (due to negative sign)
- Shift to position x
- Multiply element-by-element
- Integrate all products

---

## SLIDE 3.2: Discrete Convolution Formula

### From Continuous to Discrete

For discrete sequences f[n] and g[n]:
$$(f * g)[k] = \sum_{n=-\infty}^{\infty} f[n]g[k-n]$$
**Process**:

1. Flip sequence g
2. Shift to align with position k
3. Multiply element by element
4. Sum all products
    
    ### Key Properties
    
- Linear convolution: sequences are zero outside defined ranges
- Output length: **P + Q - 1** (for sequences of length P and Q)

---

## SLIDE 3.3: Numerical Convolution Example

### Example Calculation

**Given**:

- f[n] = {1, 2, 3} for n = 0, 1, 2
- g[n] = {4, 5} for n = 0, 1
**Step-by-step**:
Position k=0:
- Flipped g = {5, 4}
- Only f[0] × 5 = 1 × 5 = **5**
Position k=1:
- f[0] × 4 + f[1] × 5 = 1 × 4 + 2 × 5 = **14**
Position k=2:
- f[1] × 4 + f[2] × 5 = 2 × 4 + 3 × 5 = **23**
Position k=3:
- f[2] × 4 = 3 × 4 = **15Result**: {5, 14, 23, 15} (length = 4 = 3 + 2 - 1) ✓

---

## SLIDE 3.4: Circular vs Linear Convolution

### Linear Convolution

- Sequences assumed **zero outside** defined ranges
- Output length: **P + Q - 1**
- Used for most filtering applications
$$y[k] = \sum_{n=-\infty}^{\infty} f[n]h[k-n]$$
    
    ### Circular Convolution
    
- Signals are **periodic** (repeat indefinitely)
- Samples wrap around: sample N ≡ sample 0
- Output length: **N** (one period)
$$y[k] = \sum_{n=0}^{N-1} f[n]g[(k-n) \mod N]$$
    
    ### Critical Relationship
    
    **Circular convolution = Linear convolution**
    when both sequences padded to length ≥ P + Q - 1
    

---

## SLIDE 3.5: Zero-Padding Technique

### Why Zero-Padding?

DFT naturally implements **circular convolution** due to periodicity

- Problem: Many applications need **linear convolution**
- Solution: **Zero-padding** to avoid wraparound aliasing
    
    ### Padding Requirements
    
    For sequences of length P and Q:
    
- Pad f[n] with **Q - 1** zeros → length P + Q - 1
- Pad g[n] with **P - 1** zeros → length P + Q - 1
    
    ### Mathematical Guarantee
    
    When *N*0 ≥ *P* + *Q* − 1:
    Circular Convolution*N* = Linear Convolution
    No time-domain aliasing occurs!
    

---

## SLIDE 5.1: DFT-Based Filtering Procedure (Detailed)

### Complete Workflow

**Step 1: Zero-Padding**

- Signal f[n] (length *N*) + zeros (*N* − 1) → length *N* + *N* − 1
    
    *f*
    
    *h*
    
    *f*
    
    *h*
    
- Filter h[n] (length *N*) + zeros (*N* − 1) → length *N* + *N* − 1
**Step 2: Forward DFT***F*[*r*] = DFT{*f*[*n*]}
*H*[*r*] = DFT{*h*[*n*]}
where r = 0, 1, …, *N* + *N* − 2
**Step 3: Frequency Domain Multiplication***Y*[*r*] = *F*[*r*] × *H*[*r*]
(element-wise, requires exactly *N* + *N* − 1 complex multiplications)
**Step 4: Inverse DFT***y*[*k*] = IDFT{*Y*[*r*]}
**Result**: y[k] equals the linear convolution of f[n] and h[n]
    
    *h*
    
    *f*
    
    *f*
    
    *h*
    
    padded
    
    padded
    
    *f*
    
    *h*
    
    *f*
    
    *h*
    

---

## SLIDE 5.2: Computational Complexity Comparison

### Direct Convolution

For *Nf* = 1000 samples, *Nh* = 100 samples:

- Multiplications per output: 100
- Total operations: **≈ 100,000 multiplications**
    
    ### DFT-Based Method (naive DFT)
    
- Two forward DFTs: 2 × (*Nf* + *Nh* − 1)2 ≈ 2,420,000 ops
- Frequency multiplication: 1,099
- One inverse DFT: (*Nf* + *Nh* − 1)2 ≈ 1,210,000 ops
- **Total: ≈ 3,630,000 ops** (worse!)
    
    ### FFT-Based Method ⭐
    
- Two forward FFTs: 2(*Nf* + *Nh* − 1)log2(*Nf* + *Nh* − 1) ≈ 22,000 ops
- Frequency multiplication: 1,099
- One inverse FFT: (*Nf* + *Nh* − 1)log2(*Nf* + *Nh* − 1) ≈ 11,000 ops
- **Total: ≈ 34,000 ops** (3× faster!)
**Advantage grows with signal length!**

---

## SLIDE 6.1: Continuous to Discrete Fourier Analysis

### Progression of Transforms

```
Continuous Aperiodic Signal (time/space)
 ↓ [Fourier Transform]
Continuous Periodic Spectrum (frequency)
 ↓ [Sampling in time/space]
Discrete Aperiodic Signal (samples)
 ↓ [DTFT]
Discrete Periodic Spectrum (frequency)
 ↓ [Periodization in time/space]
Periodic Discrete Signal (samples)
 ↓ [DFT]
Periodic Sampled Spectrum (frequency)
```

### Key Relationships

- **Sampling** in one domain → **Periodicity** in other domain
- **Periodicity** in one domain → **Sampling** in other domain
- DFT combines both: **discrete & periodic** in both domains

---

## SLIDE 7.1: Understanding the DFT Formula

### Two-Dimensional DTFT

$$F(u,v) = \sum_{m=-\infty}^{\infty} \sum_{n=-\infty}^{\infty} f[m,n] e^{-j2\pi(um + vn)}$$
**Components**:

- Infinite summation: all integer positions (m,n)
- Continuous frequencies: (u,v) ∈ ℝ
- Complex exponential: *e*−*j*2*π*(*um* + *vn*) oscillates at frequency (u,v)
    
    ### Two-Dimensional DFT
    
    $$F[k,l] = \frac{1}{MN} \sum_{m=0}^{M-1} \sum_{n=0}^{N-1} f[m,n] e^{-j2\pi(km/M + ln/N)}$$
    **Modifications from DTFT**:
    
1. **Finite summation**: m ∈ [0, M-1], n ∈ [0, N-1]
2. **Discrete frequencies**: k, l are integers
3. **Normalized**: factor $\frac{1}{MN}$

---

## SLIDE 7.2: Complex Exponentials and Euler’s Formula

### Euler’s Formula (Fundamental!)

*ejθ* = cos (*θ*) + *j*sin (*θ*)

### Application to DFT

*e*−*j*2*π*(*km*/*M* + *ln*/*N*) = cos (2*π*(*km*/*M* + *ln*/*N*)) − *j*sin (2*π*(*km*/*M* + *ln*/*N*))
**Interpretation**:

- **Real part** (cosine): measures similarity to cosine wave at frequency (k,l)
- **Imaginary part** (sine): measures similarity to sine wave at frequency (k,l)
- **Together**: capture both amplitude and phase
    
    ### Specific Values
    
    | k, l | Exponential | Meaning |
    | --- | --- | --- |
    | 0, 0 | 1 | DC component (mean value) |
    | 1, 0 | *e*−*j*2*πm*/*M* | One horizontal oscillation |
    | 0, 1 | *e*−*j*2*πn*/*N* | One vertical oscillation |
    | k, l | *e*−*j*2*π*(*km*/*M* + *ln*/*N*) | k horizontal, l vertical oscillations |

---

## SLIDE 8.1: Periodicity Proof Detailed

### Proof that F[k+M, l+N] = F[k,l]

**Start with**:
$$F[k+M, l+N] = \frac{1}{MN} \sum_{m=0}^{M-1} \sum_{n=0}^{N-1} f[m,n] e^{-j2\pi((k+M)m/M + (l+N)n/N)}$$
**Separate the exponential**:
*e*−*j*2*π*((*k* + *M*)*m*/*M* + (*l* + *N*)*n*/*N*) = *e*−*j*2*π*(*km*/*M* + *ln*/*N*) ⋅ *e*−*j*2*π*(*m* + *n*)**Key insight**:
*e*−*j*2*πm* = cos (−2*πm*) + *j*sin (−2*πm*) = 1
for any integer m (complete revolution on unit circle)
**Similarly**:
*e*−*j*2*πn* = 1 for any integer n
**Therefore**:
*e*−*j*2*π*(*m* + *n*) = *e*−*j*2*πm* ⋅ *e*−*j*2*πn* = 1 ⋅ 1 = 1
**Conclusion**:
$$F[k+M, l+N] = \frac{1}{MN} \sum_{m=0}^{M-1} \sum_{n=0}^{N-1} f[m,n] e^{-j2\pi(km/M + ln/N)} = F[k,l]$$ ∎

---

## SLIDE 9.1: Conjugate Symmetry for Real Signals

### Conjugate Symmetry Property

For **real-valued** f[m,n]:
*F*[*M* − *k*, *N* − *l*] = *F**[*k*, *l*]
where * denotes complex conjugation

### Complex Conjugation

If *F*[*k*, *l*] = *a* + *jb* (real part a, imaginary part b):
*F**[*k*, *l*] = *a* − *jb*

### In Terms of Magnitude and Phase

**Magnitude**: |*F*[*M* − *k*, *N* − *l*]| = |*F*[*k*, *l*]| (symmetric)
**Phase**: ∠*F*[*M* − *k*, *N* − *l*] = −∠*F*[*k*, *l*] (antisymmetric)

### Practical Implication

For real images: **only ~half the coefficients are independent**

- Remaining coefficients derivable from symmetry
- Enables specialized real-input FFT algorithms (2× faster)
- Magnitude spectrum has mirror symmetry about center

---

## SLIDE 10.1: Centering the Frequency Display (1D)

### Standard vs Centered DFT Display

**Standard DFT arrangement**:

```
F[0] F[1] F[2] ... F[M/2] ... F[M-1]
 DC pos pos Nyquist neg
```

**Problem**: Negative frequencies at the end are not intuitive

### Centering Technique

Multiply spatial signal by (−1)*k* before computing DFT:
*f*centered[*k*] = (−1)*k* ⋅ *f*[*k*] = *ejπk* ⋅ *f*[*k*]
**Effect**: Shifts frequency by M/2

- DC component moves from position 0 → position M/2 (center)
- All frequencies shift by M/2
**Centered arrangement**:
    
    ```
    F[M-M/2] ... F[M-1] | F[0] | F[1] ... F[M/2]
    neg neg | DC | pos pos
    ← lower freq | center | higher freq →
    ```
    

---

## SLIDE 11.1: Two-Dimensional Centering

### 2D Checkerboard Pattern

Multiply image by (−1)*m* + *n* before 2D DFT:
*f*centered[*m*, *n*] = (−1)*m* + *n* ⋅ *f*[*m*, *n*]
**Pattern**:

```
+ - + - + - + -
- + - + - + - +
+ - + - + - + -
- + - + - + - +
```

### Mathematical Expression

(−1)*m* + *n* = *ejπ*(*m* + *n*)
Adds phase shift *jπ*(*m* + *n*) to exponent in DFT formula
**Result**: Shifts frequency domain by (*M*/2, *N*/2)

- DC moves from corner (0, 0) → center (*M*/2, *N*/2)

---

## SLIDE 12.1: Centered 2D Frequency Display

### Four Quadrants in Centered Display

```
Quadrant II | Quadrant I
(-f_h, -f_v) | (+f_h, -f_v)
-------------------|------------------
 DC (center) |
 F[M/2, N/2] |
-------------------|------------------
Quadrant III | Quadrant IV
(-f_h, +f_v) | (+f_h, +f_v)
```

**Legend**:

- *fh*: horizontal frequency
- *fv*: vertical frequency
    
    ### For Real Images
    
    **Conjugate symmetry** → diagonal quadrants are complex conjugates:
    
- Quadrant I ≈ Quadrant III* (diagonal mirror)
- Quadrant II ≈ Quadrant IV* (diagonal mirror)
**Magnitude spectrum**: Perfect mirror symmetry about center

---

## SLIDE 14.1: Inverse DFT Periodicity Proof

### Proving f[m+M, n+N] = f[m,n]

**Start with inverse DFT**:
$$f[m,n] = \sum_{k=0}^{M-1} \sum_{l=0}^{N-1} F[k,l] e^{j2\pi(km/M + ln/N)}$$
**Evaluate at shifted position**:
$$f[m+M, n+N] = \sum_{k=0}^{M-1} \sum_{l=0}^{N-1} F[k,l] e^{j2\pi(k(m+M)/M + l(n+N)/N)}$$
**Separate exponential**:
*ej*2*π*(*k*(*m* + *M*)/*M* + *l*(*n* + *N*)/*N*) = *ej*2*π*(*km*/*M* + *ln*/*N*) ⋅ *ej*2*π*(*k* + *l*)**Key fact**: *ej*2*π*(*k* + *l*) = 1 for integer k, l
**Therefore**:
$$f[m+M, n+N] = \sum_{k=0}^{M-1} \sum_{l=0}^{N-1} F[k,l] e^{j2\pi(km/M + ln/N)} = f[m,n]$$ ∎

### Consequence: Periodic Boundary Conditions

The DFT assumes the image **tiles infinitely**:

- Right edge connects to left edge
- Bottom edge connects to top edge
- Can cause **edge artifacts** if boundaries discontinuous

---

## SLIDE 15.1: Magnitude, Phase, and Power Spectra

### Rectangular Form

*F*[*u*, *v*] = Re{*F*[*u*, *v*]} + *j* ⋅ Im{*F*[*u*, *v*]}
*F*[*u*, *v*] = *a* + *jb*

### Polar Form

*F*[*u*, *v*] = |*F*[*u*, *v*]|*ejΦ*[*u*, *v*]

### Conversions

**Rectangular → Polar**:
$$|F[u,v]| = \sqrt{a^2 + b^2}$$ (magnitude)
*Φ*[*u*, *v*] = atan2(*b*, *a*) (phase, use two-argument arctangent)
**Polar → Rectangular**:
*a* = |*F*[*u*, *v*]|cos (*Φ*[*u*, *v*])
*b* = |*F*[*u*, *v*]|sin (*Φ*[*u*, *v*])

### Power Spectrum

*P*[*u*, *v*] = |*F*[*u*, *v*]|2 = *a*2 + *b*2**Related to Parseval’s Theorem**:
Total energy in spatial domain = Total energy in frequency domain

---

## SLIDE 15.2: Phase vs Magnitude Importance

### Surprising Result from Experiments

For natural images: **Phase carries more structural information than magnitude!**

### Hybrid Image Experiment

1. Take two images: Image A and Image B
2. Compute their 2D DFTs: *FA*[*u*, *v*] and *FB*[*u*, *v*]
3. Create hybrid:
    - Use magnitude from Image A: |*F*[*u*, *v*]|
        
        *A*
        
    - Use phase from Image B: *Φ*[*u*, *v*]
        
        *B*
        
    - Combine: *F*[*u*, *v*] = |*F*[*u*, *v*]|*e*
        
        hybrid
        
        *A*
        
        *jΦB*[*u*, *v*]
        
4. Compute inverse DFT
**Result**: Hybrid looks like **Image B** (the phase source)!
    
    ### Interpretation
    
- **Phase**: encodes positions of edges and features
- **Magnitude**: encodes contrast and energy distribution
- Human perception: more sensitive to edge positions than amplitudes

---

## SLIDE 16.1: Translation Property Details

### Two Translation Properties

**Property 1**: Multiplication by exponential in spatial domain
*f*[*k*, *l*]*ej*2*π*(*mk*/*M* + *nl*/*N*) ↔︎ *F*[*u* − *m*, *v* − *n*]
→ Shift in frequency domain
**Property 2**: Shift in spatial domain
*f*[*k* − *m*, *l* − *n*] ↔︎ *F*[*u*, *v*]*e*−*j*2*π*(*um*/*M* + *vn*/*N*)
→ Multiplication by exponential in frequency domain

### Key Insight from Property 2

Spatial translation **only affects phase**, not magnitude:
|*F*[*u*, *v*]*e*−*j*2*π*(*um*/*M* + *vn*/*N*)| = |*F*[*u*, *v*]| ⋅ |*e*−*j*2*π*(*um*/*M* + *vn*/*N*)| = |*F*[*u*, *v*]| ⋅ 1 = |*F*[*u*, *v*]|

### Application: Translation-Invariant Features

**Magnitude spectrum is translation-invariant**:

- Shift image → magnitude spectrum unchanged
- Useful for pattern recognition (texture classification)
- Phase changes encode spatial position

---

## SLIDE 16.2: Rotation Property

### Isotropic Nature of 2D Fourier Transform

*f*(*r*, *θ*) ↔︎ *F*(*ω*, *ϕ*)
where (*r*, *θ*) and (*ω*, *ϕ*) are polar coordinates
**Rotation Property**:
*f*(*r*, *θ* + *θ*0) ↔︎ *F*(*ω*, *ϕ* + *θ*0)
Rotate image by angle *θ*0 → spectrum rotates by same angle *θ*0

### Spatial-Frequency Correspondence

| Spatial Feature | Frequency Content |
| --- | --- |
| Horizontal edges | Vertical frequencies |
| Vertical edges | Horizontal frequencies |
| Diagonal edges (45°) | Diagonal frequencies (perpendicular) |
| **Explanation**: Edges have rapid changes **perpendicular** to edge direction |  |
- Horizontal edge: changes vertically → vertical frequency content
- Vertical edge: changes horizontally → horizontal frequency content
    
    ### Rotation-Invariant Features
    
    Convert to **polar coordinates** in frequency domain:
    *P*(*r*) = ∫02*π*|*F*(*r*, *θ*)|*dθ* (average over angles)
    Feature depends only on radial frequency, independent of orientation
    

---

## SLIDE 17.1: DC Coefficient Interpretation

### When k=0, l=0

$$F[0,0] = \frac{1}{MN} \sum_{m=0}^{M-1} \sum_{n=0}^{N-1} f[m,n] \cdot e^{-j2\pi(0 \cdot m/M + 0 \cdot n/N)}$$
$$F[0,0] = \frac{1}{MN} \sum_{m=0}^{M-1} \sum_{n=0}^{N-1} f[m,n] \cdot e^0$$
$$F[0,0] = \frac{1}{MN} \sum_{m=0}^{M-1} \sum_{n=0}^{N-1} f[m,n]$$

### Interpretation

$$F[0,0] = \frac{\text{Sum of all pixel values}}{\text{Total number of pixels}} = \text{Mean intensity}$$

### Properties

- **Largest magnitude** in typical images (positive pixel values)
- **Zero-mean images**: Set *F*[0, 0] = 0 in frequency domain
- **Visual dominance**: DC appears brightest in magnitude spectrum display
- **Logarithmic scaling**: Use log (1 + |*F*[*k*, *l*]|) to see high frequencies

---

## SLIDE 18.1: Separability Detailed Explanation

### 2D Transform as Row-Column Operations

**Forward transform separability**:

1. Apply 1D DFT to **each row**: *M* transforms of length *N*
2. Apply 1D DFT to **each column** of result: *N* transforms of length *M***Mathematical expression**:
*F*[*k*, *l*] = DFTcol{DFTrow{*f*[*m*, *n*]}}
Or equivalently:
$$F[k,l] = \sum_{m=0}^{M-1} \left[ \sum_{n=0}^{N-1} f[m,n] e^{-j2\pi ln/N} \right] e^{-j2\pi km/M}$$
    
    ### Why It Works: Mathematical Proof
    
    $$F[k,l] = \frac{1}{MN} \sum_{m=0}^{M-1} \sum_{n=0}^{N-1} f[m,n] e^{-j2\pi(km/M + ln/N)}$$
    **Factor the exponential**:
    *e*−*j*2*π*(*km*/*M* + *ln*/*N*) = *e*−*j*2*πkm*/*M* ⋅ *e*−*j*2*πln*/*N***Rearrange summations**:
    $$F[k,l] = \frac{1}{M} \sum_{m=0}^{M-1} e^{-j2\pi km/M} \left[ \frac{1}{N} \sum_{n=0}^{N-1} f[m,n] e^{-j2\pi ln/N} \right]$$
    Inner sum = 1D DFT over n (row transform)
    Outer sum = 1D DFT over m (column transform)
    

---

## SLIDE 18.2: Computational Savings from Separability

### Complexity Analysis

**Direct 2D DFT** (from definition):

- For each of *MN* frequency coefficients
- Compute double sum over *MN* spatial positions
- **Total**: (*MN*)2 operations
**Separable approach** (naive 1D DFT):
- Row transforms: *M* transforms × *N*2 ops each = *MN*2
- Column transforms: *N* transforms × *M*2 ops each = *NM*2
- **Total**: *MN*(*M* + *N*) operations
**Example** (256 × 256 image):
- Direct: (256 × 256)2 = 4, 294, 967, 296 ≈ 4.3 billion ops
- Separable: 256 × 256 × (256 + 256) = 33, 554, 432 ≈ 33.5 million ops
- **Speedup**: 128× faster!
    
    ### With FFT Algorithms
    
    **Separable + FFT**:
    
- Row FFTs: *M* × *N*log2*N*
- Column FFTs: *N* × *M*log2*M*
- **Total**: *MN*(log2*M* + log2*N*) = *MN*log2(*MN*)
**Example** (256 × 256 image):
- (256 × 256) × log2(256 × 256) = 65536 × 16 = 1, 048, 576 ≈ 1 million ops
- **Speedup over direct**: 4,096× faster!

---

## SLIDE 29.1: DCT vs DFT Comparison

### Key Differences

| Aspect | DFT | DCT |
| --- | --- | --- |
| Basis functions | Complex exponentials | Real cosines |
| Coefficients | Complex-valued | Real-valued |
| Redundancy (real input) | 50% redundant | No redundancy |
| Information density | Half independent | All independent |
| Typical application | General signal analysis | Image compression |

### Why DCT for Compression?

1. **Real-valued**: No complex arithmetic needed
2. **No redundancy**: Every coefficient is independent
3. **Energy compaction**: Excellent for natural images
4. **Block processing**: Well-suited for 8×8 blocks

---

## SLIDE 29.2: DCT-II Formula Breakdown

### One-Dimensional DCT-II Formula

$$C[u] = \alpha[u] \sum_{n=0}^{N-1} f[n] \cos\left[\frac{\pi u(2n+1)}{2N}\right]$$
**Normalization factors**:
$$\alpha[u] = \begin{cases}
\sqrt{\frac{1}{N}} & u = 0 \\
\sqrt{\frac{2}{N}} & u = 1, 2, \ldots, N-1
\end{cases}$$

### Understanding the Cosine Argument

$$\frac{\pi u(2n+1)}{2N}$$
**Factor (2*n* + 1)**: Shifts evaluation to **midpoints**

- *n* = 0: evaluate at position 0.5
- *n* = 1: evaluate at position 1.5
- *n* = 2: evaluate at position 2.5
**This choice** → superior energy compaction vs alternatives
    
    ### Frequency Interpretation
    
- *u* = 0: DC (constant), cosine argument = 0
- *u* = 1: ≈ 0.5 cycles across N samples (lowest frequency)
- *u* = 2: ≈ 1 cycle
- *u* = *N* − 1: ≈ (N-1)/2 cycles (highest frequency)

---

## SLIDE 30.1: 1D DCT Basis Functions Explained

### Basis Function Properties

Each basis function *Bu*[*n*]:
$$B_u[n] = \alpha[u] \cos\left[\frac{\pi u(2n+1)}{2N}\right]$$
**Key properties**:

1. **Orthogonal**: $\sum_{n=0}^{N-1} B_u[n] B_v[n] = \delta_{uv}$ (Kronecker delta)
2. **Real-valued**: No imaginary components
3. **Complete**: Any signal can be represented as weighted sum
    
    ### Visual Pattern (N=8)
    
    ```
    u=0: ▓▓▓▓▓▓▓▓ (constant, DC)
    u=1: ▓▓▓▓░░░░ (half cycle)
    u=2: ▓▓░░▓▓░░ (one cycle)
    u=3: ▓▓░░░▓▓░ (1.5 cycles)
    u=4: ▓░▓░▓░▓░ (two cycles)
    u=5: ▓░░▓░░▓░ (2.5 cycles)
    u=6: ▓░░▓▓░░▓ (three cycles)
    u=7: ▓░░░▓░░░ (3.5 cycles)
    ```
    
    ▓ = positive values, ░ = negative values
    
    ### Signal Representation
    
    Any signal f[n] can be written as:
    $$f[n] = \sum_{u=0}^{N-1} C[u] \cdot B_u[n]$$
    where C[u] are DCT coefficients (weights)
    

---

## SLIDE 31.1: 2D DCT Forward Transform Breakdown

### Forward Transform Formula

$$C[u,v] = \alpha[u]\alpha[v] \sum_{m=0}^{M-1} \sum_{n=0}^{N-1} f[m,n] \cos\left[\frac{\pi u(2m+1)}{2M}\right] \cos\left[\frac{\pi v(2n+1)}{2N}\right]$$
**Components**:

1. **Normalization**: *α*[*u*]*α*[*v*] (product of 1D normalizations)
2. **Horizontal cosine**: $\cos\left[\frac{\pi u(2m+1)}{2M}\right]$ (frequency u)
3. **Vertical cosine**: $\cos\left[\frac{\pi v(2n+1)}{2N}\right]$ (frequency v)
4. **Pixel value**: *f*[*m*, *n*]
    
    ### Interpretation
    
    For each frequency pair (u,v):
    
5. Create 2D cosine pattern by multiplying horizontal and vertical cosines
6. Multiply this pattern by the image, element-by-element
7. Sum all products
8. Apply normalization
**Result**: Coefficient C[u,v] measures “how much” of that 2D cosine pattern is present in the image

---

## SLIDE 32.1: 2D DCT Inverse Transform

### Reconstruction Formula

$$f[m,n] = \sum_{u=0}^{M-1} \sum_{v=0}^{N-1} \alpha[u]\alpha[v] C[u,v] \cos\left[\frac{\pi u(2m+1)}{2M}\right] \cos\left[\frac{\pi v(2n+1)}{2N}\right]$$

### Synthesis Interpretation

Any image can be reconstructed as:
*f*[*m*, *n*] = weighted sum of 64 basis patterns (for 8×8 block)
**Weights**: DCT coefficients *C*[*u*, *v*]
**Patterns**: 2D cosine basis functions

### Energy Compaction Property

For natural images:

- **Few coefficients** (low frequencies) have **large magnitudes**
- **Many coefficients** (high frequencies) have **small magnitudes**
Consequence: Can discard/quantize many coefficients with minimal quality loss

---

## SLIDE 33.1: 2D DCT Basis Functions (8×8 Block)

### Basis Function Generation

2D basis function *Bu*, *v*[*m*, *n*]:
$$B_{u,v}[m,n] = \alpha[u]\alpha[v] \cos\left[\frac{\pi u(2m+1)}{2 \cdot 8}\right] \cos\left[\frac{\pi v(2n+1)}{2 \cdot 8}\right]$$
**Total**: 64 basis functions for 8×8 block

### Organization in Figure 2

```
 v=0 v=1 v=2 v=3 v=4 v=5 v=6 v=7
u=0 [DC] [low] [low] [low] [mid] [mid] [high] [high]
u=1 [low] [low] [low] [mid] [mid] [high] [high] [high]
u=2 [low] [low] [mid] [mid] [high] [high] [high] [high]
u=3 [low] [mid] [mid] [high] [high] [high] [high] [high]
u=4 [mid] [mid] [high] [high] [high] [high] [high] [high]
u=5 [mid] [high] [high] [high] [high] [high] [high] [high]
u=6 [high] [high] [high] [high] [high] [high] [high] [high]
u=7 [high] [high] [high] [high] [high] [high] [high] [high]
```

**Pattern**: Frequency increases moving right (horizontally) and down (vertically)

### Specific Basis Functions

- **(0,0)**: Constant (DC) - all pixels same value
- **(1,0)**: Low horizontal frequency, no vertical variation
- **(0,1)**: Low vertical frequency, no horizontal variation
- **(7,7)**: Highest frequency both directions (checkerboard-like)

---

## SLIDE 35.1: Matrix Formulation for DCT

### Compact Matrix Form

For square N×N block:
**C** = **AfA***T*
where:

- **C**: N×N matrix of DCT coefficients
- **f**: N×N matrix of pixel values
- **A**: N×N DCT transformation matrix
- **A***T*: Transpose of **A**
    
    ### Transformation Matrix Elements
    
    $$A[i,j] = \alpha[i] \cos\left[\frac{\pi i(2j+1)}{2N}\right]$$
    for *i*, *j* = 0, 1, …, *N* − 1
    
    ### Example: 8×8 Matrix A
    
    $$\mathbf{A} = \begin{bmatrix}
    \frac{1}{2\sqrt{2}} & \frac{1}{2\sqrt{2}} & \cdots & \frac{1}{2\sqrt{2}} \\
    \alpha[1]\cos(\pi/16) & \alpha[1]\cos(3\pi/16) & \cdots & \alpha[1]\cos(15\pi/16) \\
    \vdots & \vdots & \ddots & \vdots \\
    \alpha[7]\cos(7\pi/16) & \alpha[7]\cos(21\pi/16) & \cdots & \alpha[7]\cos(105\pi/16)
    \end{bmatrix}$$
    

---

## SLIDE 35.2: Why Square Blocks?

### Symmetric Transform Requirement

Using same matrix **A** in both dimensions:
**C** = **AfA***T***Constraint**: Matrix dimensions must match

- **A** is N×N
- **f** must be N×N
- **A***T* is N×N
- **Result**: Only works for **square blocks**
    
    ### Why 8×8 Specifically?
    
    **Tradeoff analysis**:
    **Smaller blocks (e.g., 4×4)**:
    
- ✗ Less decorrelation
- ✗ Poorer energy compaction
- ✗ Lower compression efficiency
- ✓ More local adaptivity
- ✓ Less computation per block
**Larger blocks (e.g., 16×16)**:
- ✓ Better decorrelation
- ✓ Better energy compaction
- ✗ More computation per block
- ✗ Less adaptive to local variations
- ✗ More visible artifacts when quantized
**8×8 blocks**: Optimal compromise found through extensive experimentation
- Used in JPEG, MPEG, H.264
- Industry standard for lossy image compression

---

## SLIDE 36.1: Orthogonality and Inverse

### Orthogonality Property

DCT transformation matrix **A** satisfies:
**A***T***A** = **AA***T* = **I**
where **I** is the identity matrix
**Implication**:
**A**−1 = **A***T*
The **inverse equals the transpose**!

### Inverse Transform

**f** = **A**−1**C**(**A***T*)−1 = **A***T***CAComputational advantage**:

- No need to compute matrix inverse (expensive: O(N³))
- Transpose is trivial (just memory reordering: O(N²))
- Forward and inverse transforms have **symmetric cost**
    
    ### Precomputation
    
    For N=8:
    
- Compute matrix **A** once (64 numbers)
- Store in fast cache memory
- Reuse for every 8×8 block in every image
- **Dramatic speedup** for compression/decompression

---

## SLIDE 37.1: Block-Based DCT Workflow

### Complete Encoding Process

**Step 1: Image Partitioning**

- Divide image into non-overlapping 8×8 blocks
- For 512×512 image: $\frac{512}{8} \times \frac{512}{8} = 64 \times 64 = 4096$ blocks
**Step 2: Level Shift** (optional)
- Shift pixel values: *f*′[*m*, *n*] = *f*[*m*, *n*] − 128 (for 8-bit images)
- Centers values around zero for better compression
**Step 3: Forward DCT** (per block)
- Apply 2D DCT: **C** = **AfA**
    
    *T*
    
- Obtain 64 DCT coefficients per block
**Step 4: Quantization**
- Divide each coefficient by quantization step: *C*[*u*, *v*] = round(*C*[*u*, *v*]/*Q*[*u*, *v*])
    
    *q*
    
- Different steps for different frequencies (coarser for high freq)
- Creates sparsity (many zeros)
**Step 5: Entropy Coding**
- Zigzag scan: order coefficients from low to high frequency
- Run-length encoding: compress sequences of zeros
- Huffman or arithmetic coding: variable-length codes

---

## SLIDE 37.2: Block Independence and Artifacts

### Advantages of Block Processing

**1. Local Adaptivity**

- Different blocks can use different quantization
- Smooth regions: aggressive quantization
- Detailed regions: fine quantization
**2. Parallel Processing**
- All blocks independent
- Can process simultaneously on multiple cores
- Scales linearly with number of processors
**3. Error Localization**
- Transmission errors affect only one block
- Corrupted block can be concealed/replaced
- Robust for unreliable channels
    
    ### Disadvantage: Blocking Artifacts
    
    At high compression (coarse quantization):
    
- Discontinuities appear at block boundaries
- Visible grid pattern in reconstructed image
- Caused by independent quantization of adjacent blocks
**Mitigation strategies**:
- Post-processing smoothing filters
- Overlapping blocks (more computation)
- Deblocking filters (used in H.264/MPEG-4)
- Adaptive block sizes (H.264 advanced features)

---

## SLIDE 38.1: Energy Compaction Quantified

### Energy Distribution in DCT Coefficients

For typical photographic images (8×8 blocks):
**DC coefficient** C[0,0]:

- Contains 50-90% of total block energy
- Magnitude: 100-200 (for 8-bit image)
**Low-frequency AC** coefficients (e.g., C[0,1], C[1,0], C[1,1]):
- Contain 5-30% of total energy
- Magnitudes: 10-50
**Mid-frequency AC** coefficients:
- Contain 1-10% of energy
- Magnitudes: 1-10
**High-frequency AC** coefficients:
- Contain <1% of energy
- Magnitudes: often <1 (quantize to zero)
    
    ### Compression Mechanism
    
    **Energy compaction** enables compression:
    
1. Few large coefficients (keep with fine quantization)
2. Many small coefficients (quantize coarsely or to zero)
3. Entropy coding efficiently encodes many zeros
**Result**: 10:1 to 50:1 compression with minimal perceptual loss

---

## SLIDE 38.2: Quantization Tables

### JPEG Standard Quantization Table

Example luminance quantization table:
$$\mathbf{Q} = \begin{bmatrix}
16 & 11 & 10 & 16 & 24 & 40 & 51 & 61 \\
12 & 12 & 14 & 19 & 26 & 58 & 60 & 55 \\
14 & 13 & 16 & 24 & 40 & 57 & 69 & 56 \\
14 & 17 & 22 & 29 & 51 & 87 & 80 & 62 \\
18 & 22 & 37 & 56 & 68 & 109 & 103 & 77 \\
24 & 35 & 55 & 64 & 81 & 104 & 113 & 92 \\
49 & 64 & 78 & 87 & 103 & 121 & 120 & 101 \\
72 & 92 & 95 & 98 & 112 & 100 & 103 & 99
\end{bmatrix}$$

### Design Principles

**Values increase** toward high frequencies (lower-right):

- Small values (upper-left): preserve low frequencies accurately
- Large values (lower-right): coarse quantization of high frequencies
**Based on psychophysics**:
- Human visual system less sensitive to high frequencies
- Can tolerate more loss at high frequencies
- Optimized for typical viewing distances
    
    ### Quality Parameter
    
    **Quality factor Q** (1-100):
    
- Q = 100: minimal quantization (highest quality)
- Q = 50: standard table (balanced)
- Q = 10: aggressive quantization (high compression, low quality)
Quantization table scaled by factor (100 − *Q*)/50

---

## SLIDE 39.1: Energy Compaction Visual Examples

### Interpreting the Energy Compaction Images

**Left column**: Original images (diverse content)

- 
    1. Saturn: smooth gradients, some edges (rings)
- 
    1. Person with hat: textures, edges
- 
    1. Building with lines: strong geometric patterns
- 
    1. Trees and sky: organic textures
- 
    1. Mandrill face: fine details and textures
- 
    1. Diagonal stripes: regular periodic pattern
    **Right column**: DCT magnitude spectra (log-scaled)
    
    ### What the Spectra Reveal
    
    **Brightness pattern** in frequency domain:
    
- **Bright center** (DC and low freq): high energy
- **Rapid falloff** toward edges: low energy in high frequencies
- **Pattern confirms**: Most energy concentrated in few coefficients
    
    ### Content-Dependent Variations
    
    **(a) Saturn**: Very bright center, smooth falloff
    → Dominated by smooth gradients, excellent compaction
    **(e) Mandrill**: More spread-out energy, brighter high frequencies
    → Fine details (fur texture) require more high-frequency content
    **(f) Stripes**: Distinct bright spots away from center
    → Regular pattern creates energy at specific frequencies
    **General trend**: Natural images exhibit strong energy compaction, artificial patterns less so
    

---

## Additional Reference Slides

### SLIDE A.1: Convolution Theorem

**Time/Spatial Domain**:
*h*[*m*, *n*] = *f*[*m*, *n*] * *g*[*m*, *n*]
**↕ (Fourier Transform)Frequency Domain**:
*H*[*k*, *l*] = *F*[*k*, *l*] ⋅ *G*[*k*, *l*]
**Key insight**: Convolution becomes multiplication!

---

### SLIDE A.2: Parseval’s Theorem

**Statement**: Energy is conserved under Fourier transform
$$\sum_{m=0}^{M-1} \sum_{n=0}^{N-1} |f[m,n]|^2 = \sum_{k=0}^{M-1} \sum_{l=0}^{N-1} |F[k,l]|^2$$
(up to normalization constant)
**Interpretation**:

- Total energy in spatial domain = Total energy in frequency domain
- Different representations, same information
- Useful for analyzing filter effects

---

### SLIDE A.3: Unit Circle and Complex Exponentials

**Unit circle in complex plane**:
*ejθ* = cos *θ* + *j*sin *θ*
For integer multiples of 2*π*:
*ej*2*πn* = cos (2*πn*) + *j*sin (2*πn*) = 1 + *j* ⋅ 0 = 1
**Graphical representation**:

```
 Imaginary axis (j)
 ↑
 | e^(jπ/2) = j
 |
e^jπ = -1 ←-+-→ 1 = e^j0 Real axis
 |
 | e^(-jπ/2) = -j
 ↓
```

## Complete revolution returns to starting point: *ej*2*π* = 1

### SLIDE A.4: Zigzag Scanning Order

**JPEG uses zigzag pattern** to order DCT coefficients:

```
Start→ 01 05 06 14 15 27 28
 02 04 07 13 16 26 29
 03 08 12 17 25 30 39
 09 11 18 24 31 38 40
 10 19 23 32 37 41 46
 20 22 33 36 42 45 47
 21 34 35 43 44 48 49
 → → → → → → → End
```

**Purpose**:

- Low frequencies first (likely non-zero)
- High frequencies last (likely zero)
- Creates long runs of zeros
- Efficient for run-length encoding

---

### SLIDE A.5: Typical DCT Coefficient Magnitudes

**After DCT of 8×8 block** (example values):

```
[150] [20] [15] [8] [3] [1] [0] [0]
[18] [12] [7] [4] [2] [1] [0] [0]
[14] [9] [5] [3] [1] [0] [0] [0]
[10] [6] [3] [2] [1] [0] [0] [0]
[5] [3] [2] [1] [0] [0] [0] [0]
[3] [2] [1] [0] [0] [0] [0] [0]
[1] [1] [0] [0] [0] [0] [0] [0]
[0] [0] [0] [0] [0] [0] [0] [0]
```

**Pattern**:

- DC (150): Dominant
- Low frequencies: Moderate values
- High frequencies: Near zero
- Many coefficients = 0 or ≈0
**After quantization**: Even more zeros, highly compressible

---

### SLIDE A.6: Quality vs Compression Tradeoff

**Relationship**:
| Quality | Compression Ratio | Quantization | Visual Result |
|———|——————|————–|—————|
| 100% | 2:1 | Minimal | Visually lossless |
| 90% | 10:1 | Light | Excellent quality |
| 75% | 15:1 | Moderate | Good quality |
| 50% | 25:1 | Standard | Acceptable quality |
| 25% | 50:1 | Heavy | Visible artifacts |
| 10% | 100:1 | Extreme | Severe degradation |
**Typical use cases**:

- **90-95%**: Professional photography
- **75-85%**: Web images
- **50-70%**: Email attachments
- **<50%**: Thumbnails only

---

### SLIDE A.7: Fast DCT Algorithms

**Direct computation** of 8×8 DCT:

- Matrix multiplication: **C** = **AfA**
    
    *T*
    
- Two 8×8 matrix multiplications
- **Cost**: 2 × 8 = 1024 multiplications
**Fast DCT algorithms** (similar to FFT):
    
    3
    
- Exploit symmetries in cosine functions
- Reduce multiplications by factor of ~4
- **Cost**: ~256 multiplications
- Common algorithms: Chen-Wang, Lee, Loeffler-Ligtenberg-Moschytz
**Integer DCT**:
- Approximate DCT using only integer arithmetic
- Faster on processors without FPU
- Used in some video codecs
**Hardware acceleration**:
- Dedicated DCT chips/ASICs
- GPU implementation (massively parallel)
- SIMD instructions (SSE, AVX)

---

### Summary: Why 2D DCT Dominates Image Compression

**1. Real-valued**: Simpler arithmetic than DFT
**2. No redundancy**: All coefficients independent (vs 50% for DFT)
**3. Energy compaction**: Most energy in few coefficients
**4. Separable**: Efficient row-column computation
**5. Orthogonal**: Inverse = transpose (easy reconstruction)
**6. Block-based**: Local adaptivity + parallelization
**7. Standardized**: JPEG, MPEG, H.26x all use DCT
**8. Hardware support**: Decades of optimization
**9. Perceptually optimized**: Quantization tables match human vision
**10. Proven track record**: Billions of images compressed successfully

---

## End of Complementary Slides

These slides provide the mathematical formulas, detailed explanations, and visual concepts referenced in the comprehensive lecture notes. They bridge the gap between the main presentation slides and the extended discussions, enabling a seamless learning experience.
For optimal study:

1. Read lecture section
2. Review corresponding complementary slide(s)
3. Reference main presentation slide
4. Work through examples
5. Apply to practice problems