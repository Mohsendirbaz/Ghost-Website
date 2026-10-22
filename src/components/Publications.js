import { motion } from "framer-motion";
import { Download, ExternalLink, FileText, Mail } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

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
    title: {
      en: "Constitutional Geometry of Adaptive Systems",
      fa: "هندسهٔ قانون اساسیِ سامانه‌های تطبیقی"
    },
    subtitle: {
      en: "A Formal Theory of Admissibility, State, Evidence, and Governed Transformation",
      fa: "نظریه‌ای صوری دربارهٔ پذیرش‌پذیری، حالت، شواهد و دگرگونیِ تحت حاکمیت"
    }
  },
  {
    id: 4,
    title: {
      en: "From State Space to Decision Space",
      fa: "از فضای حالت تا فضای تصمیم"
    },
    subtitle: {
      en: "A General Formal Theory of Geometry-Native Computation Under Constraints and Finite Resources",
      fa: "نظریه‌ای صوری و عام برای محاسباتِ هندسه‌محور با وجود قیود و منابع محدود"
    },
    pdfUrl: "/docs/pdf/2-From State Space to Decision Space.pdf",
    downloadUrl: "/docs/pdf/2-From State Space to Decision Space.pdf",
    filename: "2-From State Space to Decision Space.pdf",
    englishOnly: true
  },
  {
    id: 5,
    title: {
      en: "The Calculus of Sufficient Distinction",
      fa: "حسابِ تمایزِ بسنده"
    },
    subtitle: {
      en: "Necessary and Sufficient Conditions for Identifiability, Admissibility, and Task-Relative Resolution",
      fa: "شرط‌های لازم و کافی برای شناسایی‌پذیری، پذیرش‌پذیری و تفکیک‌پذیری متناسب با وظیفه"
    }
  },
  {
    id: 6,
    title: {
      en: "Proof-Carrying Optimization",
      fa: "بهینه‌سازیِ همراه با اثبات"
    },
    subtitle: {
      en: "A Formal Theory of Joint Optimization, Verification, Certification, and Stopping Under Finite Resources",
      fa: "نظریه‌ای صوری برای بهینه‌سازی، راستی‌آزمایی، گواهی‌سازی و توقفِ مشترک با منابع محدود"
    }
  },
  {
    id: 7,
    title: {
      en: "Decomposition Without Loss",
      fa: "تجزیه بدون اتلاف"
    },
    subtitle: {
      en: "Characterization Theorems for Exact Local Decomposition, Interface Invariants, and Global Decomposition",
      fa: "قضیه‌های مشخصه‌سازی برای تجزیهٔ موضعیِ دقیق، ناورداهای رابط و تجزیهٔ سراسری"
    }
  },
  {
    id: 8,
    title: {
      en: "Jacobian-Metric-Energy Geometry",
      fa: "هندسهٔ ژاکوبی، متریک و انرژی"
    },
    subtitle: {
      en: "A Differential Theory of Sensitivity, Transformation Cost, Invariants, and Constrained Evolution",
      fa: "نظریه‌ای دیفرانسیلی دربارهٔ حساسیت، هزینهٔ دگرگونی، ناورداها و تحولِ مقید"
    },
    pdfUrl: "/docs/pdf/6-Jacobian–Metric–Energy Geometry.pdf",
    downloadUrl: "/docs/pdf/6-Jacobian–Metric–Energy Geometry.pdf",
    filename: "6-Jacobian–Metric–Energy Geometry.pdf",
    englishOnly: true
  },
  {
    id: 9,
    title: {
      en: "Thermodynamic Length as Transformational Geometry",
      fa: "طول ترمودینامیکی به‌مثابهٔ هندسهٔ دگرگونی"
    },
    subtitle: {
      en: "A Formal Theory of Metric Cost, Geodesic Structure, and Optimal Transformation Paths",
      fa: "نظریه‌ای صوری دربارهٔ هزینهٔ متریک، ساختار ژئودزیک و مسیرهای بهینهٔ دگرگونی"
    }
  },
  {
    id: 10,
    title: {
      en: "Temporal Closure as a Coordination Invariant",
      fa: "بستار زمانی به‌مثابهٔ ناوردای هماهنگی"
    },
    subtitle: {
      en: "A Formal Theory of Validity, Synchronization, Freshness, and Causal Consistency in Time-Indexed Systems",
      fa: "نظریه‌ای صوری دربارهٔ اعتبار، هم‌زمان‌سازی، تازگی و سازگاری علّی در سامانه‌های زمان‌مند"
    }
  },
  {
    id: 11,
    title: {
      en: "The Geometry of Receptors",
      fa: "هندسهٔ گیرنده‌ها"
    },
    subtitle: {
      en: "A Formal Theory of Resolution, Distinguishability, Information Capacity, and State-Space Embedding",
      fa: "نظریه‌ای صوری دربارهٔ تفکیک‌پذیری، تمایزپذیری، ظرفیت اطلاعاتی و جاسازی در فضای حالت"
    }
  },
  {
    id: 12,
    title: {
      en: "Identity Before Inference",
      fa: "هویت پیش از استنتاج"
    },
    subtitle: {
      en: "An Impossibility and Characterization Theory of Recognition Under Observational Ambiguity",
      fa: "نظریه‌ای دربارهٔ ناممکنی و مشخصه‌سازیِ بازشناسی در شرایط ابهام مشاهده‌ای"
    }
  },
  {
    id: 13,
    title: {
      en: "Admissibility Before Probability",
      fa: "پذیرش‌پذیری پیش از احتمال"
    },
    subtitle: {
      en: "A Formal Theory of Constrained Hypothesis Spaces, Inference, and Decision",
      fa: "نظریه‌ای صوری دربارهٔ فضاهای فرضیهٔ مقید، استنتاج و تصمیم"
    }
  },
  {
    id: 14,
    title: {
      en: "The Choreography of Computational Change",
      fa: "هم‌آراییِ دگرگونی محاسباتی"
    },
    subtitle: {
      en: "A Formal Theory of Typed, Timed, Reversible, and Constitutionally Valid State Transitions",
      fa: "نظریه‌ای صوری دربارهٔ گذارهای حالتِ نوع‌مند، زمان‌مند، بازگشت‌پذیر و معتبر از نظر قانون اساسی"
    }
  },
  {
    id: 15,
    title: {
      en: "Invariant-Driven Computational Dynamics",
      fa: "دینامیک محاسباتیِ هدایت‌شده با ناورداها"
    },
    subtitle: {
      en: "A Formal Theory of Event-Native Computation, Collective State, Geometric Invariants, and Closure",
      fa: "نظریه‌ای صوری دربارهٔ محاسباتِ رویدادبنیاد، حالت جمعی، ناورداهای هندسی و بستار"
    }
  },
  {
    id: 16,
    title: {
      en: "Nullification as a Primitive of System Evolution",
      fa: "ابطال به‌مثابهٔ بنیادی برای تحول سامانه"
    },
    subtitle: {
      en: "A Formal Theory of Absence, Perturbation Propagation, Structural Reorganization, and Invariant Change",
      fa: "نظریه‌ای صوری دربارهٔ غیاب، انتشار اغتشاش، بازسازمان‌دهی ساختاری و تغییر ناوردا"
    }
  },
  {
    id: 17,
    title: {
      en: "A General Theory of Adaptive Repair",
      fa: "نظریه‌ای عام دربارهٔ ترمیم تطبیقی"
    },
    subtitle: {
      en: "Characterization of Admissible Reconstruction, Identity Preservation, Sufficiency, and Valid Successor States",
      fa: "مشخصه‌سازیِ بازسازیِ پذیرفتنی، حفظ هویت، بسندگی و حالت‌های جانشینِ معتبر"
    }
  },
  {
    id: 18,
    title: {
      en: "The Geometry of Evidence",
      fa: "هندسهٔ شواهد"
    },
    subtitle: {
      en: "A Formal Theory of Provenance, Authority, Uncertainty, Distinguishability, and Justified Inference",
      fa: "نظریه‌ای صوری دربارهٔ خاستگاه، مرجعیت، عدم‌قطعیت، تمایزپذیری و استنتاجِ موجه"
    }
  },
  {
    id: 19,
    title: {
      en: "Finite-Budget Intelligence",
      fa: "هوشمندی با بودجهٔ محدود"
    },
    subtitle: {
      en: "A Formal Theory of Joint Allocation Across Representation, Search, Computation, Verification, Proof, and Stopping",
      fa: "نظریه‌ای صوری برای تخصیص مشترک منابع میان بازنمایی، جست‌وجو، محاسبه، راستی‌آزمایی، اثبات و توقف"
    }
  },
  {
    id: 20,
    title: {
      en: "From Observation to Constitutional Action",
      fa: "از مشاهده تا کنشِ قانون‌مند"
    },
    subtitle: {
      en: "A Formal Theory of Evidence-Constrained State Reconstruction and Governed Transformation",
      fa: "نظریه‌ای صوری دربارهٔ بازسازی حالتِ مقید به شواهد و دگرگونیِ تحت حاکمیت"
    }
  },
  {
    id: 21,
    title: {
      en: "The Calculus of Governed Transformation",
      fa: "حسابِ دگرگونیِ تحت حاکمیت"
    },
    subtitle: {
      en: "A Unified Formalism for Differential Change, Discrete Transitions, Topological Reorganization, and Valid Successor States",
      fa: "صوری‌سازیِ یکپارچه برای تغییر دیفرانسیلی، گذارهای گسسته، بازسازمان‌دهی توپولوژیک و حالت‌های جانشینِ معتبر"
    }
  },
  {
    id: 22,
    title: {
      en: "Toward a General Theory of Adaptive Systems",
      fa: "به‌سوی نظریه‌ای عام دربارهٔ سامانه‌های تطبیقی"
    },
    subtitle: {
      en: "Formal Foundations of Geometry, Identity, Temporal Closure, Evidence, Optimization, and Constitutional Computation",
      fa: "بنیان‌های صوریِ هندسه، هویت، بستار زمانی، شواهد، بهینه‌سازی و محاسباتِ قانون‌مند"
    },
    pdfUrl: "/docs/pdf/20-Toward a General Theory of Adaptive Systems.pdf",
    downloadUrl: "/docs/pdf/20-Toward a General Theory of Adaptive Systems.pdf",
    filename: "20-Toward a General Theory of Adaptive Systems.pdf",
    englishOnly: true
  },
  {
    id: 23,
    title: {
      en: "The Learning Dynamics of Adaptive Systems",
      fa: "دینامیک یادگیریِ سامانه‌های تطبیقی"
    },
    subtitle: {
      en: "A Formal Theory of Structure Acquisition, Credit Assignment, and Constitutional Plasticity",
      fa: "نظریه‌ای صوری دربارهٔ کسب ساختار، تخصیص اعتبار و انعطاف‌پذیریِ قانون‌مند"
    }
  },
  {
    id: 24,
    title: {
      en: "Causal Inference in Adaptive Systems",
      fa: "استنتاج علّی در سامانه‌های تطبیقی"
    },
    subtitle: {
      en: "A Formal Theory of Intervention, Counterfactual, and Structural Discovery Under Constitutional Constraints",
      fa: "نظریه‌ای صوری دربارهٔ مداخله، خلاف‌واقع و کشف ساختار تحت قیود قانون‌مند"
    }
  },
  {
    id: 25,
    title: {
      en: "Information-Theoretic Limits of Adaptive Computation",
      fa: "کران‌های نظریهٔ اطلاعاتیِ محاسبات تطبیقی"
    },
    subtitle: {
      en: "A Formal Theory of Entropy Bounds, Rate-Distortion, and Constitutional Capacity",
      fa: "نظریه‌ای صوری دربارهٔ کران‌های آنتروپی، نرخ-اعوجاج و ظرفیتِ قانون‌مند"
    }
  },
  {
    id: 26,
    title: {
      en: "Consensus and Coordination in Distributed Adaptive Systems",
      fa: "اجماع و هماهنگی در سامانه‌های تطبیقیِ توزیع‌شده"
    },
    subtitle: {
      en: "A Formal Theory of Agreement, Byzantine Faults, and Constitutional Synchronization",
      fa: "نظریه‌ای صوری دربارهٔ توافق، خطاهای بیزانسی و هم‌زمان‌سازیِ قانون‌مند"
    }
  },
  {
    id: 27,
    title: {
      en: "Scaling Laws and Finite-Size Effects in Adaptive Systems",
      fa: "قوانین مقیاس‌پذیری و اثرهای اندازهٔ محدود در سامانه‌های تطبیقی"
    },
    subtitle: {
      en: "A Formal Theory of Asymptotic Behavior, Critical Size, and Constitutional Scaling",
      fa: "نظریه‌ای صوری دربارهٔ رفتار مجانبی، اندازهٔ بحرانی و مقیاس‌پذیریِ قانون‌مند"
    }
  },
  {
    id: 28,
    title: {
      en: "Symmetry, Invariance, and Symmetry Breaking in Adaptive Systems",
      fa: "تقارن، ناوردایی و شکست تقارن در سامانه‌های تطبیقی"
    },
    subtitle: {
      en: "A Formal Theory of Group Actions, Orbits, and Constitutional Symmetry",
      fa: "نظریه‌ای صوری دربارهٔ کنش‌های گروهی، مدارها و تقارنِ قانون‌مند"
    }
  },
  {
    id: 29,
    title: {
      en: "Renormalization and Multi-Scale Adaptive Systems",
      fa: "بهنجارش و سامانه‌های تطبیقیِ چندمقیاسی"
    },
    subtitle: {
      en: "A Formal Theory of Coarse-Graining, Fixed Points, and Constitutional Universality",
      fa: "نظریه‌ای صوری دربارهٔ درشت‌دانه‌سازی، نقاط ثابت و جهان‌شمولیِ قانون‌مند"
    }
  },
  {
    id: 30,
    title: {
      en: "Stochastic Adaptive Systems",
      fa: "سامانه‌های تطبیقیِ تصادفی"
    },
    subtitle: {
      en: "A Formal Theory of Noise, Fluctuation, and Constitutional Stability",
      fa: "نظریه‌ای صوری دربارهٔ نویز، نوسان و پایداریِ قانون‌مند"
    }
  },
  {
    id: 31,
    title: {
      en: "Fault-Tolerant Adaptive Systems",
      fa: "سامانه‌های تطبیقیِ مقاوم در برابر خطا"
    },
    subtitle: {
      en: "A Formal Theory of Error Models, Redundancy, and Constitutional Recoverability",
      fa: "نظریه‌ای صوری دربارهٔ مدل‌های خطا، افزونگی و بازیابی‌پذیریِ قانون‌مند"
    }
  },
  {
    id: 32,
    title: {
      en: "Robust Fault-Tolerant Policies in Reinforcement Learning",
      fa: "سیاست‌های مقاوم و خطاپذیر در یادگیری تقویتی"
    },
    subtitle: {
      en: "A Formal Theory of Policy Redundancy, Adversarial Fault Tolerance, and the Hand-in-Hand Nature of Adaptivity and Robustness",
      fa: "نظریه‌ای صوری دربارهٔ افزونگی سیاست، تحمل خطای خصمانه و پیوند ناگسستنیِ تطبیق‌پذیری و استواری"
    },
    pdfUrl: "/docs/pdf/31-Robust Fault-Tolerant Policies in Reinforcement Learning.pdf",
    downloadUrl: "/docs/pdf/31-Robust Fault-Tolerant Policies in Reinforcement Learning.pdf",
    filename: "31-Robust Fault-Tolerant Policies in Reinforcement Learning.pdf",
    englishOnly: true
  },
  {
    id: 33,
    title: {
      en: "Adversarial Robustness and Security in Adaptive Systems",
      fa: "استواری در برابر خصم و امنیت در سامانه‌های تطبیقی"
    },
    subtitle: {
      en: "A Formal Theory of Perturbation, Information Leakage, and Constitutional Integrity",
      fa: "نظریه‌ای صوری دربارهٔ اغتشاش، نشت اطلاعات و یکپارچگیِ قانون‌مند"
    }
  },
  {
    id: 34,
    title: {
      en: "The Thermodynamics of Adaptive Computation",
      fa: "ترمودینامیکِ محاسبات تطبیقی"
    },
    subtitle: {
      en: "A Formal Theory of Landauer Bounds, Entropy Cost, and Constitutional Reversibility",
      fa: "نظریه‌ای صوری دربارهٔ کران‌های لانداور، هزینهٔ آنتروپی و بازگشت‌پذیریِ قانون‌مند"
    }
  },
  {
    id: 35,
    title: {
      en: "Generalization and Sample Complexity in Adaptive Systems",
      fa: "تعمیم‌پذیری و پیچیدگی نمونه در سامانه‌های تطبیقی"
    },
    subtitle: {
      en: "A Formal Theory of Learning Bounds, Empirical Risk, and Constitutional Regularization",
      fa: "نظریه‌ای صوری دربارهٔ کران‌های یادگیری، ریسک تجربی و منظم‌سازیِ قانون‌مند"
    }
  },
  {
    id: 36,
    title: {
      en: "Meta-Adaptation and Learning to Learn",
      fa: "فرا‌تطبیق و یادگیریِ یادگرفتن"
    },
    subtitle: {
      en: "A Formal Theory of Higher-Order Plasticity, Constitutional Meta-Structure, and Adaptive Adaptation",
      fa: "نظریه‌ای صوری دربارهٔ انعطاف‌پذیری مرتبه‌بالا، فراساختارِ قانون‌مند و تطبیق‌پذیریِ تطبیقی"
    }
  },
  {
    id: 37,
    title: {
      en: "Open-Ended Evolution and Novelty Generation",
      fa: "تکاملِ بی‌انتها و تولید نوآوری"
    },
    subtitle: {
      en: "A Formal Theory of Unbounded Adaptation, Structural Innovation, and Constitutional Openness",
      fa: "نظریه‌ای صوری دربارهٔ تطبیق‌پذیریِ بی‌کران، نوآوری ساختاری و گشودگیِ قانون‌مند"
    }
  },
  {
    id: 38,
    title: {
      en: "The Dynamical Flow and Spectral Theory of the Interface Hypersurface",
      fa: "جریان دینامیکی و نظریهٔ طیفیِ ابرسطحِ رابط"
    },
    subtitle: {
      en: "Installment V: Transport, Conservation, Heat Kernel, Index, and the Semiclassical Bridge",
      fa: "بخش پنجم: انتقال، پایستگی، هستهٔ گرما، اندیس و پل نیمه‌کلاسیک"
    },
    pdfUrl: "/docs/pdf/36-The Dynamical Flow and Spectral Theory of the Interface Hypersurface.pdf",
    downloadUrl: "/docs/pdf/36-The Dynamical Flow and Spectral Theory of the Interface Hypersurface.pdf",
    filename: "36-The Dynamical Flow and Spectral Theory of the Interface Hypersurface.pdf",
    englishOnly: true
  },
  {
    id: 39,
    title: {
      en: "Criticality and Phase Transitions in Adaptive Systems",
      fa: "بحرانی‌شدن و گذارهای فازی در سامانه‌های تطبیقی"
    },
    subtitle: {
      en: "A Formal Theory of Order Parameters, Susceptibility, and Constitutional Criticality",
      fa: "نظریه‌ای صوری دربارهٔ پارامترهای نظم، پاسخ‌پذیری و بحرانی‌شدنِ قانون‌مند"
    }
  },
  {
    id: 40,
    title: {
      en: "Network Topology and Adaptive Capacity",
      fa: "توپولوژی شبکه و ظرفیت تطبیقی"
    },
    subtitle: {
      en: "A Formal Theory of Connectivity, Robustness, and Constitutional Information Flow",
      fa: "نظریه‌ای صوری دربارهٔ اتصال‌پذیری، استواری و جریان اطلاعاتِ قانون‌مند"
    }
  },
  {
    id: 41,
    title: {
      en: "The Belief Complex",
      fa: "مجموعهٔ باور"
    },
    subtitle: {
      en: "A Unified Theory of Adaptive Systems Under Partial Observation",
      fa: "نظریه‌ای یکپارچه دربارهٔ سامانه‌های تطبیقی تحت مشاهدهٔ جزئی"
    }
  },
  {
    id: 42,
    title: {
      en: "Temporal Logics for Adaptive Systems",
      fa: "منطق‌های زمانی برای سامانه‌های تطبیقی"
    },
    subtitle: {
      en: "A Formal Theory of Specification, Model Checking, and Constitutional Verification",
      fa: "نظریه‌ای صوری دربارهٔ مشخصه‌سازی، وارسی مدل و راستی‌آزماییِ قانون‌مند"
    }
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
                  <p className="text-sm text-foreground mb-3">
                    {localizedText(pub.subtitle || pub.description, lang)}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-border/50">
              {pub.pdfUrl && (!pub.englishOnly || lang === "en") ? (
                <>
                  {(pub.year || pub.size) && (
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      {pub.year && <span className="font-mono">{pub.year}</span>}
                      {pub.year && pub.size && <span>•</span>}
                      {pub.size && <span>{pub.size}</span>}
                    </div>
                  )}
                  <div className="flex-1" />
                  <a
                    href={pub.downloadUrl}
                    download={pub.filename}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
                  >
                    <Download className="w-4 h-4" />
                    {lang === "en" ? "Download PDF" : "دانلود PDF"}
                  </a>
                  <a
                    href={pub.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg neu-interactive text-sm font-medium hover:shadow-md transition-all"
                  >
                    <ExternalLink className="w-4 h-4" />
                    {lang === "en" ? "View" : "مشاهده"}
                  </a>
                </>
              ) : (
                <a
                  href="mailto:dirbaz.sharif@gmail.com"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg neu-interactive text-sm font-medium hover:shadow-md transition-all"
                >
                  <Mail className="w-4 h-4" />
                  {lang === "en" ? "Contact us" : "تماس با ما"}
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Publications;
