import { motion } from "framer-motion";
import { GraduationCap, Briefcase, Award, Users, MapPin, Calendar, FileText, Download } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import {
  cvEducation,
  cvExperience,
  cvAwards,
  cvAffiliations,
  cvSkills,
} from "../../data/founder-bio";

function EntryCard({ entry, index }) {
  const { lang } = useLanguage();
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
      className="neu-raised p-5 md:p-6 space-y-2"
    >
      <h4 className="font-display text-base md:text-lg font-semibold text-foreground">
        {entry.title[lang]}
      </h4>
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <Briefcase className="w-3 h-3" />
          {entry.org}
        </span>
        <span className="flex items-center gap-1">
          <MapPin className="w-3 h-3" />
          {entry.location}
        </span>
        <span className="flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          {entry.period}
        </span>
      </div>
      <ul className="space-y-1 mt-2">
        {entry.bullets[lang].map((b, i) => (
          <li key={i} className="text-sm text-muted-foreground leading-relaxed flex gap-2">
            <span className="text-primary mt-1.5 shrink-0">·</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function SectionHeading({ icon: Icon, children }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
        <Icon className="w-4 h-4 text-primary" />
      </div>
      <h3 className="font-display text-xl font-semibold text-foreground">{children}</h3>
    </div>
  );
}

export function FounderCV() {
  const { lang } = useLanguage();

  return (
    <div className="space-y-12">
      {/* Education */}
      <div>
        <SectionHeading icon={GraduationCap}>
          {lang === "en" ? "Education" : "تحصیلات"}
        </SectionHeading>
        <div className="space-y-3">
          {cvEducation.map((e, i) => (
            <EntryCard key={e.id} entry={e} index={i} />
          ))}
        </div>
      </div>

      {/* Experience */}
      <div>
        <SectionHeading icon={Briefcase}>
          {lang === "en" ? "Experience" : "تجربه"}
        </SectionHeading>
        <div className="space-y-3">
          {cvExperience.map((e, i) => (
            <EntryCard key={e.id} entry={e} index={i} />
          ))}
        </div>
      </div>

      {/* Skills */}
      <div>
        <SectionHeading icon={Award}>
          {lang === "en" ? "Technical Skills" : "مهارت‌های فنی"}
        </SectionHeading>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {cvSkills[lang].map((group) => (
            <div key={group.label} className="neu-raised p-4 space-y-2">
              <h4 className="text-sm font-semibold text-primary">{group.label}</h4>
              <div className="flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="px-2 py-0.5 text-xs rounded-full bg-primary/10 text-primary border border-primary/20"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Awards */}
      <div>
        <SectionHeading icon={Award}>
          {lang === "en" ? "Honors & Awards" : "افتخارات و جوایز"}
        </SectionHeading>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {cvAwards.map((a, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="neu-raised p-4 flex items-start gap-3"
            >
              <Award className="w-4 h-4 text-accent mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-medium text-foreground">{a.title[lang]}</p>
                <p className="text-xs text-muted-foreground">
                  {a.org} · {a.year}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Affiliations */}
      <div>
        <SectionHeading icon={Users}>
          {lang === "en" ? "Professional Affiliations" : "عضویت‌های حرفه‌ای"}
        </SectionHeading>
        <div className="neu-raised p-5 space-y-2">
          {cvAffiliations.map((a, i) => (
            <p key={i} className="text-sm text-muted-foreground flex gap-2">
              <span className="text-primary shrink-0">·</span>
              {a}
            </p>
          ))}
        </div>
      </div>

      {/* Downloadable Documents */}
      <div>
        <SectionHeading icon={FileText}>
          {lang === "en" ? "Documents" : "مدارک"}
        </SectionHeading>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { href: "/Mohsen_Dirbaz_CV.pdf", en: "Curriculum Vitae (CV)", fa: "رزومه (CV)" },
            { href: "/PhD_Transcript_Mohsen_Dirbaz.pdf", en: "PhD Transcript", fa: "ریزنمرات دکتری" },
            { href: "/MS_Transcript.pdf", en: "M.S. Transcript", fa: "ریزنمرات کارشناسی ارشد" },
            { href: "/Recommendation_Letter.pdf", en: "Recommendation Letter 1", fa: "توصیه‌نامه ۱" },
            { href: "/Recommendation_Letter_2.pdf", en: "Recommendation Letter 2", fa: "توصیه‌نامه ۲" },
            { href: "/Recommendation_Letter_3.pdf", en: "Recommendation Letter 3", fa: "توصیه‌نامه ۳" },
            { href: "/Professional_Contacts.pdf", en: "Professional Contacts", fa: "تماس‌های حرفه‌ای" },
          ].map((doc, i) => (
            <motion.a
              key={i}
              href={doc.href}
              download
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
              className="neu-raised p-4 flex items-center gap-3 group hover:border-primary/30 transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <FileText className="w-4 h-4 text-primary" />
              </div>
              <span className="text-sm font-medium text-foreground flex-1">
                {lang === "en" ? doc.en : doc.fa}
              </span>
              <Download className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
}
