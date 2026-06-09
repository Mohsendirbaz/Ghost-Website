import { motion } from "framer-motion";
import { GraduationCap, Briefcase, FlaskConical, Globe } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { narrativeSections } from "../../data/founder-bio";

const iconMap = {
  "graduation-cap": GraduationCap,
  briefcase: Briefcase,
  "flask-conical": FlaskConical,
  globe: Globe,
};

function SectionCard({ section, index }) {
  const { lang } = useLanguage();
  const Icon = iconMap[section.icon] || Globe;
  const paragraphs = section.content[lang];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative"
    >
      {/* Timeline connector */}
      {index < narrativeSections.length - 1 && (
        <div className="absolute top-16 left-6 w-px h-[calc(100%+2rem)] bg-gradient-to-b from-primary/40 to-transparent hidden md:block" />
      )}

      <div className="flex gap-4 md:gap-6">
        {/* Icon */}
        <div className="shrink-0 w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center shadow-lg relative z-10">
          <Icon className="w-5 h-5 text-primary-foreground" />
        </div>

        {/* Content */}
        <div className="flex-1 neu-raised p-6 md:p-8 space-y-4">
          <h3 className="font-display text-xl md:text-2xl font-semibold text-foreground">
            {section.title[lang]}
          </h3>
          <div className="space-y-4">
            {paragraphs.map((p, i) => (
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
    </motion.div>
  );
}

export function FounderNarrative() {
  return (
    <div className="space-y-10 md:space-y-12">
      {narrativeSections.map((section, i) => (
        <SectionCard key={section.id} section={section} index={i} />
      ))}
    </div>
  );
}
