import { motion } from "framer-motion";
import { FileText, Download, ExternalLink } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

/* Revised editions (July 2026). Single canonical copies live in
   /docs/pdf/ alongside the Technical Library entries. */
const publications = [
  {
    id: 1,
    title: {
      en: "A Special-Function-Parameterized Heuristic Reduced-Order Model for Thermochemical Conversion Systems",
      fa: "مدل مرتبه‌کاستهٔ اکتشافی با پارامتری‌سازی توابع خاص برای سیستم‌های تبدیل ترموشیمیایی"
    },
    description: {
      en: "An exploratory framework validated empirically on biomass gasification: AGM-computed elliptic integrals as deterministic parameterizations of a learned reduced model, with an explicit what-is-and-is-not-claimed scope statement. Revised edition, 2026.",
      fa: "چارچوبی اکتشافی با اعتبارسنجی تجربی بر گازی‌سازی زیست‌توده: انتگرال‌های بیضوی محاسبه‌شده با AGM به‌مثابه پارامتری‌سازی قطعی یک مدل کاستهٔ آموخته، همراه با بیانیهٔ صریح دامنهٔ ادعا. ویراست بازنگری‌شده، ۲۰۲۶."
    },
    pdfUrl: "/docs/pdf/Physics_Informed_Special_Function_Framework.pdf",
    downloadUrl: "/docs/pdf/Physics_Informed_Special_Function_Framework.pdf",
    filename: "Physics_Informed_Special_Function_Framework.pdf",
    size: "481 KB · 53 pp",
    year: 2026
  },
  {
    id: 2,
    title: {
      en: "Benefit Distribution in Climate Investment: Allocation Architecture and a Techno-Economic Assessment of Distributed Biomass-to-Hydrogen Pathways",
      fa: "توزیع منافع در سرمایه‌گذاری اقلیمی: معماری تخصیص و ارزیابی فنی-اقتصادی مسیرهای توزیع‌شدهٔ زیست‌توده به هیدروژن"
    },
    description: {
      en: "Institutional economics, policy architecture, and techno-economic modeling integrated: how the design of climate investment structures shapes the distribution of their benefits — with a comparative assessment of modular gasification clusters and explicit epistemic labeling of the evidence. Revised edition, July 2026.",
      fa: "تلفیق اقتصاد نهادی، معماری سیاست و مدل‌سازی فنی-اقتصادی: چگونه طراحی ساختارهای سرمایه‌گذاری اقلیمی توزیع منافع آن‌ها را شکل می‌دهد — همراه با ارزیابی مقایسه‌ای خوشه‌های گازی‌سازی ماژولار و برچسب‌گذاری صریح معرفتی شواهد. ویراست بازنگری‌شده، ژوئیهٔ ۲۰۲۶."
    },
    pdfUrl: "/docs/pdf/Climate_Policy_Benefit_Distribution.pdf",
    downloadUrl: "/docs/pdf/Climate_Policy_Benefit_Distribution.pdf",
    filename: "Climate_Policy_Benefit_Distribution.pdf",
    size: "1.9 MB · 53 pp",
    year: 2026
  },
  {
    id: 3,
    title: { en: "Constitutional Geometry of Adaptive Systems" },
    subtitle: { en: "A Formal Theory of Admissibility, State, Evidence, and Governed Transformation" }
  },
  {
    id: 4,
    title: { en: "From State Space to Decision Space" },
    subtitle: { en: "A General Formal Theory of Geometry-Native Computation Under Constraints and Finite Resources" }
  },
  {
    id: 5,
    title: { en: "The Calculus of Sufficient Distinction" },
    subtitle: { en: "Necessary and Sufficient Conditions for Identifiability, Admissibility, and Task-Relative Resolution" }
  },
  {
    id: 6,
    title: { en: "Proof-Carrying Optimization" },
    subtitle: { en: "A Formal Theory of Joint Optimization, Verification, Certification, and Stopping Under Finite Resources" }
  },
  {
    id: 7,
    title: { en: "Decomposition Without Loss" },
    subtitle: { en: "Characterization Theorems for Exact Local Decomposition, Interface Invariants, and Global Decomposition" }
  },
  {
    id: 8,
    title: { en: "Jacobian-Metric-Energy Geometry" },
    subtitle: { en: "A Differential Theory of Sensitivity, Transformation Cost, Invariants, and Constrained Evolution" }
  },
  {
    id: 9,
    title: { en: "Thermodynamic Length as Transformational Geometry" },
    subtitle: { en: "A Formal Theory of Metric Cost, Geodesic Structure, and Optimal Transformation Paths" }
  },
  {
    id: 10,
    title: { en: "Temporal Closure as a Coordination Invariant" },
    subtitle: { en: "A Formal Theory of Validity, Synchronization, Freshness, and Causal Consistency in Time-Indexed Systems" }
  },
  {
    id: 11,
    title: { en: "The Geometry of Receptors" },
    subtitle: { en: "A Formal Theory of Resolution, Distinguishability, Information Capacity, and State-Space Embedding" }
  },
  {
    id: 12,
    title: { en: "Identity Before Inference" },
    subtitle: { en: "An Impossibility and Characterization Theory of Recognition Under Observational Ambiguity" }
  },
  {
    id: 13,
    title: { en: "Admissibility Before Probability" },
    subtitle: { en: "A Formal Theory of Constrained Hypothesis Spaces, Inference, and Decision" }
  },
  {
    id: 14,
    title: { en: "The Choreography of Computational Change" },
    subtitle: { en: "A Formal Theory of Typed, Timed, Reversible, and Constitutionally Valid State Transitions" }
  },
  {
    id: 15,
    title: { en: "Invariant-Driven Computational Dynamics" },
    subtitle: { en: "A Formal Theory of Event-Native Computation, Collective State, Geometric Invariants, and Closure" }
  },
  {
    id: 16,
    title: { en: "Nullification as a Primitive of System Evolution" },
    subtitle: { en: "A Formal Theory of Absence, Perturbation Propagation, Structural Reorganization, and Invariant Change" }
  },
  {
    id: 17,
    title: { en: "A General Theory of Adaptive Repair" },
    subtitle: { en: "Characterization of Admissible Reconstruction, Identity Preservation, Sufficiency, and Valid Successor States" }
  },
  {
    id: 18,
    title: { en: "The Geometry of Evidence" },
    subtitle: { en: "A Formal Theory of Provenance, Authority, Uncertainty, Distinguishability, and Justified Inference" }
  },
  {
    id: 19,
    title: { en: "Finite-Budget Intelligence" },
    subtitle: { en: "A Formal Theory of Joint Allocation Across Representation, Search, Computation, Verification, Proof, and Stopping" }
  },
  {
    id: 20,
    title: { en: "From Observation to Constitutional Action" },
    subtitle: { en: "A Formal Theory of Evidence-Constrained State Reconstruction and Governed Transformation" }
  },
  {
    id: 21,
    title: { en: "The Calculus of Governed Transformation" },
    subtitle: { en: "A Unified Formalism for Differential Change, Discrete Transitions, Topological Reorganization, and Valid Successor States" }
  },
  {
    id: 22,
    title: { en: "Toward a General Theory of Adaptive Systems" },
    subtitle: { en: "Formal Foundations of Geometry, Identity, Temporal Closure, Evidence, Optimization, and Constitutional Computation" }
  },
  {
    id: 23,
    title: { en: "The Learning Dynamics of Adaptive Systems" },
    subtitle: { en: "A Formal Theory of Structure Acquisition, Credit Assignment, and Constitutional Plasticity" }
  },
  {
    id: 24,
    title: { en: "Causal Inference in Adaptive Systems" },
    subtitle: { en: "A Formal Theory of Intervention, Counterfactual, and Structural Discovery Under Constitutional Constraints" }
  },
  {
    id: 25,
    title: { en: "Information-Theoretic Limits of Adaptive Computation" },
    subtitle: { en: "A Formal Theory of Entropy Bounds, Rate-Distortion, and Constitutional Capacity" }
  },
  {
    id: 26,
    title: { en: "Consensus and Coordination in Distributed Adaptive Systems" },
    subtitle: { en: "A Formal Theory of Agreement, Byzantine Faults, and Constitutional Synchronization" }
  },
  {
    id: 27,
    title: { en: "Scaling Laws and Finite-Size Effects in Adaptive Systems" },
    subtitle: { en: "A Formal Theory of Asymptotic Behavior, Critical Size, and Constitutional Scaling" }
  },
  {
    id: 28,
    title: { en: "Symmetry, Invariance, and Symmetry Breaking in Adaptive Systems" },
    subtitle: { en: "A Formal Theory of Group Actions, Orbits, and Constitutional Symmetry" }
  },
  {
    id: 29,
    title: { en: "Renormalization and Multi-Scale Adaptive Systems" },
    subtitle: { en: "A Formal Theory of Coarse-Graining, Fixed Points, and Constitutional Universality" }
  },
  {
    id: 30,
    title: { en: "Stochastic Adaptive Systems" },
    subtitle: { en: "A Formal Theory of Noise, Fluctuation, and Constitutional Stability" }
  },
  {
    id: 31,
    title: { en: "Fault-Tolerant Adaptive Systems" },
    subtitle: { en: "A Formal Theory of Error Models, Redundancy, and Constitutional Recoverability" }
  },
  {
    id: 32,
    title: { en: "Robust Fault-Tolerant Policies in Reinforcement Learning" },
    subtitle: { en: "A Formal Theory of Policy Redundancy, Adversarial Fault Tolerance, and the Hand-in-Hand Nature of Adaptivity and Robustness" }
  },
  {
    id: 33,
    title: { en: "Adversarial Robustness and Security in Adaptive Systems" },
    subtitle: { en: "A Formal Theory of Perturbation, Information Leakage, and Constitutional Integrity" }
  },
  {
    id: 34,
    title: { en: "The Thermodynamics of Adaptive Computation" },
    subtitle: { en: "A Formal Theory of Landauer Bounds, Entropy Cost, and Constitutional Reversibility" }
  },
  {
    id: 35,
    title: { en: "Generalization and Sample Complexity in Adaptive Systems" },
    subtitle: { en: "A Formal Theory of Learning Bounds, Empirical Risk, and Constitutional Regularization" }
  },
  {
    id: 36,
    title: { en: "Meta-Adaptation and Learning to Learn" },
    subtitle: { en: "A Formal Theory of Higher-Order Plasticity, Constitutional Meta-Structure, and Adaptive Adaptation" }
  },
  {
    id: 37,
    title: { en: "Open-Ended Evolution and Novelty Generation" },
    subtitle: { en: "A Formal Theory of Unbounded Adaptation, Structural Innovation, and Constitutional Openness" }
  },
  {
    id: 38,
    title: { en: "The Dynamical Flow and Spectral Theory of the Interface Hypersurface" },
    subtitle: { en: "Installment V: Transport, Conservation, Heat Kernel, Index, and the Semiclassical Bridge" }
  },
  {
    id: 39,
    title: { en: "Criticality and Phase Transitions in Adaptive Systems" },
    subtitle: { en: "A Formal Theory of Order Parameters, Susceptibility, and Constitutional Criticality" }
  },
  {
    id: 40,
    title: { en: "Network Topology and Adaptive Capacity" },
    subtitle: { en: "A Formal Theory of Connectivity, Robustness, and Constitutional Information Flow" }
  },
  {
    id: 41,
    title: { en: "The Belief Complex" },
    subtitle: { en: "A Unified Theory of Adaptive Systems Under Partial Observation" }
  },
  {
    id: 42,
    title: { en: "Temporal Logics for Adaptive Systems" },
    subtitle: { en: "A Formal Theory of Specification, Model Checking, and Constitutional Verification" }
  }
];

const localizedText = (value, lang) => {
  if (typeof value === "string") return value;
  return value?.[lang] || value?.en;
};

const Publications = () => {
  const { lang } = useLanguage();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-display font-bold mb-6 text-foreground">
          {lang === "en" ? "Publications" : "منتشرات"}
        </h2>
        <p className="text-muted-foreground mb-8">
          {lang === "en"
            ? "Research papers and publications on physics, mathematics, and policy analysis."
            : "مقالات تحقیقی و منتشرات در زمینه فیزیک، ریاضیات و تجزیه و تحلیل سیاست."
          }
        </p>
      </div>

      <div className="space-y-4">
        {publications.map((pub, index) => (
          <motion.div
            key={pub.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="neu-raised p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0 mt-1">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-primary-foreground" />
                </div>
              </div>

              <div className="flex-1">
                <h3 className="text-xl font-display font-semibold text-foreground mb-2">
                  {localizedText(pub.title, lang)}
                </h3>
                {(pub.subtitle || pub.description) && (
                  <p className="text-sm text-muted-foreground mb-3">
                    {localizedText(pub.subtitle || pub.description, lang)}
                  </p>
                )}
              </div>
            </div>

            {(pub.pdfUrl || pub.year || pub.size) && (
              <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-border/50">
                {(pub.year || pub.size) && (
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    {pub.year && <span className="font-mono">{pub.year}</span>}
                    {pub.year && pub.size && <span>•</span>}
                    {pub.size && <span>{pub.size}</span>}
                  </div>
                )}

                <div className="flex-1" />

                {pub.downloadUrl && (
                  <a
                    href={pub.downloadUrl}
                    download={pub.filename}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
                  >
                    <Download className="w-4 h-4" />
                    {lang === "en" ? "Download PDF" : "دانلود PDF"}
                  </a>
                )}

                {pub.pdfUrl && (
                  <a
                    href={pub.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg neu-interactive text-sm font-medium hover:shadow-md transition-all"
                  >
                    <ExternalLink className="w-4 h-4" />
                    {lang === "en" ? "View" : "مشاهده"}
                  </a>
                )}
              </div>
            )}

            {!pub.pdfUrl && (
              <p className="text-xs text-muted-foreground border-t border-border/50 pt-4">
                {lang === "en" ? "PDF coming soon" : "فایل PDF به‌زودی"}
              </p>
            )}
          </motion.div>
        ))}
      </div>

      <div className="neu-raised p-6 bg-gradient-to-br from-background to-primary/5">
        <p className="text-sm text-muted-foreground">
          {lang === "en"
            ? "PDFs are available for the first two publications. PDFs for the remaining titles will be added soon."
            : "فایل‌های PDF برای دو عنوان نخست در دسترس هستند. فایل‌های PDF سایر عناوین به‌زودی اضافه خواهند شد."
          }
        </p>
      </div>
    </div>
  );
};

export default Publications;
