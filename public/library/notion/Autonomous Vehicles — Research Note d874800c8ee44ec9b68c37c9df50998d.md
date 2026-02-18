# Autonomous Vehicles — Research Note

## Beyond Pattern Matching: Why Problem Formulation Matters

Calling for a "real problem solver" recognizes that every collision-avoidance episode is a **new** optimization instance. Vehicle poses, velocities, road geometry, weather, and pedestrian trajectories combine into a one-off mathematical problem that must be posed and solved **in real time**.

A frozen model with fixed parameters can only classify and interpolate. When confronted with a seven-way intersection and novel right-of-way geometry, it will search for the "closest" training neighbor—**not** derive and solve the underlying optimization.

## Dynamic Problem Formulation as Core Intelligence

True collision avoidance begins **before** solving: it **formulates** the problem.

- **Salience selection:** decide which variables and interactions matter now.
- **Constraints:** encode kinematics/dynamics, actuator limits, road rules, comfort bounds, and safety margins.
- **Objective(s):** safety first (risk and time-to-collision), then feasibility, efficiency, comfort.
- **Structure recognition:** detect multi-agent/game-theoretic couplings, chance constraints, and receding-horizon structure.
- **Computational readiness:** cast into a form suitable for fast solvers (e.g., convex MPC with mixed-integer guards, or sampling-based stochastic MPC).

This is a **constructive** mathematical act. The system must build a model of the moment, then solve it with methods appropriate to that model.

## Architectural Implications

We should not treat autonomy as a single black box mapping sensors → controls. We need a **reasoning stack** that can construct and solve problems on the fly:

1. **Semantic and physical translators:** turn perception outputs into state/uncertainty sets and constraints.
2. **Structure detectors:** identify optimization class (convex, mixed-integer, stochastic, differential game) and pick solvers accordingly. *This component sets the bar for the extent of adaptiveness to be achieved.*
3. **Adaptive objective/constraint composer:** reweight goals as risk evolves (e.g., tighten safety cones as uncertainty grows).
4. **Anytime solvers with certificates:** return feasible plans quickly, improve with time, and expose guarantees or residuals.

In this view, additional parameters do more than store patterns; they support **richer internal representations** that enable mathematical reasoning: variable selection, constraint synthesis, and algorithm choice.

## Real-Time Learning and Model Adaptation

Other agents are non-stationary. If a driver behaves erratically, the system must **update** its behavior model and **re-formulate** the optimization:

- **Online parameter adaptation** for intent and aggressiveness.
- **Uncertainty inflation** when predictions degrade; switch to more conservative constraint sets.
- **Model-class switching** (e.g., from cooperative to worst-case robust planning) when evidence warrants.

Humans do this naturally: we revise our mental model of an unpredictable driver and adjust strategy immediately. Autonomy needs the same capability—**not** a lookup of pre-stored responses.

## Broader Design Lessons

Many high-stakes domains share this requirement: unusual symptom clusters in medicine, regime breaks in markets, first-time robots in novel facilities. In each case, **problem formulation plus principled solving** outperforms ever-larger pattern libraries (with 170 billion parameters stored as neural network weights and biases).

The priority shifts from "more data, bigger nets" to **better mathematical competence** inside the system: recognize the problem class, understand its properties, select suitable methods, and adapt as evidence arrives.

---

### Takeaway

The essential skill is not only to solve optimization problems fast, but to **formulate the right optimization problem in the first place**, then adapt it online. That capability depends on internalizing deep mathematical structure—made accessible through rich representations via physics-informed means—and on an architecture that respects conservation laws and treats **reasoning** as a first-class operation, not an afterthought.

> **Note:** Coupling mechanisms for physics-informed learning and mathematical structure should be meticulously engineered to achieve this vision.
>