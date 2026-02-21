import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { perspectiveEssay } from "../../data/founder-bio";

export function PerspectiveEssay() {
  const { lang } = useLanguage();
  const essay = perspectiveEssay[lang];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="py-16 md:py-24"
    >
      <div className="container-ghost max-w-3xl">
        <div className="neu-elevated p-8 md:p-12 space-y-6 relative overflow-hidden">
          {/* Decorative glow */}
          <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-primary/5 blur-3xl pointer-events-none" />

          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="text-xs font-medium tracking-wider uppercase text-primary">
              {lang === "en" ? "Perspective" : "دیدگاه"}
            </span>
          </div>

          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground leading-tight">
            {essay.title}
          </h2>

          <div className="space-y-4">
            {essay.paragraphs.map((p, i) => (
              <p
                key={i}
                className="text-muted-foreground leading-relaxed text-sm md:text-base"
              >
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
