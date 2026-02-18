Highest-impact spec fixes (biggest lift in implementability + consistency)
--------------------------------------------------------------------------

1. **Resolve the `tol` semantic inversion and make it single-source-of-truth.**  
   In §2.2, `tol` is described as “0=strict to 127=disabled,” but Appendix A.2 defines `tol` via `10^{-tol/16}` with `tol=0` “disabled” and `tol=127` “strictest.”  
   _Recommendation:_ pick one convention (the appendix matches the math), update the main text, and add a one-line “monotonicity” statement: _larger `tol` ⇒ stricter_ (or vice-versa) everywhere.

2. **Make Type-E operand fields consistent with instruction encodings (fix ESET).**  
   Type-E explicitly has both `rd` and `rs1` fields. But `ESET` is encoded with `rs1` occupying both the `rd` and `rs1` slots, making operand meaning ambiguous.  
   _Recommendation:_ either (a) formally define that `rd` is unused/forced to 0 for ESET and `rs1` carries a mask/ID, or (b) redefine ESET’s assembly form to use `rd` (e.g., `ESET rd, imm12` where `X[rd]` is the broadcast mask), matching the existing field diagram.

3. **Repair format/encoding mismatches for “3+ source” instructions.**
   
   * Type-S allocates the low 7 bits to `tol`. Yet `TMR.VOTE` claims a 3rd source register (`rs3`) and encodes it in that last slot.
   
   * Type-V allocates the tail as `funct7`. But `VERLET/HAMILT` claim `rs3, rs4` packed into that region.  
     _Recommendation:_ introduce explicit extended formats (e.g., **S3** and **V4**) or a uniform “extra operand via CSR/immediate” rule. Without this, assemblers, decoders, and formal models will diverge.

4. **Fix truncated address-map size annotations in the rendered doc.**  
   The address map lines appear cut off mid-size (“L0 … (51”, “L1 … (1”, “HBM3 … (64 GB”).  
   _Recommendation:_ regenerate that table and add sizes as complete, machine-checkable values (bytes + human-friendly units).

* * *

Close the biggest “platform dependency” gaps (to move mid-ranked blocks upward)
-------------------------------------------------------------------------------

5. **Specify “broadcast/wake” semantics normatively (not as prose).**  
   `ESET` says it broadcasts a wake signal and `WFI` resumes on “interrupt or event broadcast.”  
   _Recommendation:_ define: who receives broadcasts (mask vs dependency graph), delivery guarantees (at-least-once? ordered?), and the architectural effects (interrupt line vs event register edge vs STATUS.EVT transitions).

6. **Make Context Flow selection rules executable.**  
   `CTX.SLICE` partitions 1024-bit context into “100-bit slices” (which implies padding/leftovers), and `CTX.AGG` references `f∈{OR,AND,MAJORITY,WEIGHT…}` without specifying how `f` is chosen.  
   _Recommendation:_ define (a) exact slice count + padding rule, (b) deterministic mapping from slices→EPUs (including EPU_ID ranges), and (c) where `f_aggregate` / `f_decision` is configured (CSR field, STATUS bits, or an immediate).

* * *

Turn math-heavy subsystems into implementable contracts (representations + numerics)
------------------------------------------------------------------------------------

7. **Pin down memory layouts for distributions and coefficient vectors.**  
   `MOM.CALC` only says the distribution “starts at address X[rs1].” `TXF.PASS` says numerator/denominator coefficients live in moment registers.  
   _Recommendation:_ specify canonical layouts (stride, element type, scaling, ordering) and minimum required numerical accuracy/error bounds.

8. **Define the “89.7:1 compression” method (or normatively reference it).**  
   `MOM.COMP` names the compression ratio but not the algorithm.  
   _Recommendation:_ include pseudocode + parameter defaults, or formally reference an external normative document and declare it part of the compliance surface.

9. **Clarify Variational Mechanics operand binding and state representation.**  
   `VERLET`’s formula includes an `F` term but the operands don’t clearly supply it, and the encoding claims extra registers not present in Type-V.  
   _Recommendation:_ specify: (a) where vectors/matrices live (packed across M regs? row-major?), (b) which operand supplies each symbol in the equation, and (c) whether multi-step integrators require a fixed “state block” ABI in memory.

* * *

Improve the Memory Model section from “descriptive” to “testable”
-----------------------------------------------------------------

10. **Add formal fence/synchronization definitions and litmus tests.**  
    The spec states release consistency, event-based ordering, and WAL at a high level but doesn’t define the exact “happens-before” edges across EPUs.  
    _Recommendation:_ (a) define an architectural fence (or CSR-controlled fence mode), (b) specify precisely what ESET/ECLEAR order (loads? stores? both?), and (c) publish a small litmus-test suite for cross-EPU behaviors.

11. **Make WAL/checkpointing concrete enough for SAFE.ROLL.**  
    SAFE.ROLL depends on restoring from a Write-Ahead Log while WAL is only described conceptually in the memory model.  
    _Recommendation:_ standardize record formats, commit markers, required ordering, and the minimum architectural state covered (memory only vs memory+CSR+register banks).

* * *

Reduce “detached opcode” risk (cleaner base spec, easier conformance claims)
----------------------------------------------------------------------------

12. **Move un-specified opcode families into an explicit “reserved/extension” chapter.**  
    Opcode allocation lists Inter-Agent Comm, Coordinate Xform, and Sensor Fusion families without instruction definitions in v1.0.  
    _Recommendation:_ either define them, or mark them as _reserved_ (IllegalInstruction in v1.0), and publish an extension registry so implementers know what must decode vs may trap.

13. **Re-scope BYZ.CONS from “ISA instruction” to “ISA primitive + software protocol,” unless you want to standardize a full state machine.**  
    BYZ.CONS currently says “Execute 3-phase Byzantine consensus” and points to a transaction in memory but leaves participants, messaging, retries, and termination underspecified.  
    _Recommendation:_ define a minimal primitive (e.g., authenticated broadcast + vote collection + timeout) and specify the memory-resident descriptor format; or move full consensus to software with an acceleration hook.

* * *


