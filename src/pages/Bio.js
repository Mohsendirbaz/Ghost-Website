import { useState } from "react";
import { motion } from "framer-motion";
import { Download, Linkedin, GraduationCap, Briefcase, Award, Mail, Sparkles, FileText } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { copy } from '../data/copy';
import Breadcrumb from '../components/Breadcrumb';
import { PerspectiveEssay } from "../components/founder/PerspectiveEssay";
import {
  founderName,
  founderTitle,
  founderTagline,
  linkedInUrl,
  cvDownloadUrl,
  cvEducation,
  cvExperience,
  cvAwards,
  cvSkills,
  narrativeSections,
  t,
} from "../data/founder-bio";

const Bio = () => {
  const { lang } = useLanguage();
  const [activeSection, setActiveSection] = useState("overview");

  const navItems = [
    { id: "perspective", label: lang === "en" ? "Perspective" : "دیدگاه", icon: Sparkles },
    { id: "overview", label: lang === "en" ? "Overview" : "نمای کلی", icon: GraduationCap },
    { id: "experience", label: lang === "en" ? "Experience" : "تجربه", icon: Briefcase },
    { id: "achievements", label: lang === "en" ? "Achievements" : "دستاوردها", icon: Award },
  ];

  return (
    <main id="main-content">
      <Breadcrumb crumbs={[
        { label: copy[lang].breadcrumb.home, to: `/${lang}` },
        { label: copy[lang].breadcrumb.company, to: `/${lang}/company` },
        { label: lang === 'en' ? 'Founder' : 'بنیان‌گذار' },
      ]} />

      {/* Compact Hero */}
      <section className="relative pt-24 pb-12 bg-gradient-to-b from-background to-background/50">
        <div className="container-ghost">
          <div className="grid lg:grid-cols-[300px_1fr] gap-8 items-start">
            {/* Left: Avatar + Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="neu-elevated p-6 text-center lg:sticky lg:top-24"
            >
              <div className="w-40 h-40 mx-auto mb-4 rounded-2xl bg-gradient-primary flex items-center justify-center text-6xl font-bold text-primary-foreground shadow-lg">
                MD
              </div>
              <h1 className="font-display text-2xl font-bold text-foreground mb-1">
                {t(founderName, lang)}
              </h1>
              <p className="text-sm text-primary font-medium mb-4">
                {t(founderTitle, lang)}
              </p>
              <div className="flex flex-col gap-2">
                <a
                  href={cvDownloadUrl}
                  download
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gradient-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  <Download className="w-4 h-4" />
                  {lang === "en" ? "Download CV" : "دانلود رزومه"}
                </a>
                <a
                  href={linkedInUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg neu-interactive text-sm font-medium"
                >
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </a>
                <a
                  href="mailto:contact@ghostautonomy.com"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg neu-interactive text-sm font-medium"
                >
                  <Mail className="w-4 h-4" />
                  {lang === "en" ? "Contact" : "تماس"}
                </a>
              </div>

              {/* Key Documents */}
              <div className="mt-6 pt-6 border-t border-border">
                <h3 className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
                  {lang === "en" ? "Key Documents" : "اسناد کلیدی"}
                </h3>
                <div className="flex flex-col gap-2">
                  <a
                    href="/G10_Synopsis.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-accent/10 hover:bg-accent/20 text-accent text-xs font-medium transition-colors"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    {lang === "en" ? "G10 Synopsis" : "خلاصه G10"}
                  </a>
                  <a
                    href="/G10_Synopsis_FA.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-accent/10 hover:bg-accent/20 text-accent text-xs font-medium transition-colors"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    {lang === "en" ? "G10 Feasibility Analysis" : "تحلیل امکان‌سنجی G10"}
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Right: Bio + Navigation */}
            <div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-lg text-muted-foreground leading-relaxed mb-6"
              >
                {t(founderTagline, lang)}
              </motion.p>

              {/* Tab Navigation */}
              <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                      activeSection === item.id
                        ? "bg-gradient-primary text-primary-foreground shadow-lg"
                        : "neu-raised text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-12">
        <div className="container-ghost">
          <div className="grid lg:grid-cols-[300px_1fr] gap-8">
            {/* Spacer for sticky sidebar alignment */}
            <div className="hidden lg:block" />

            {/* Main Content */}
            <div>
              {/* Perspective Section */}
              {activeSection === "perspective" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <PerspectiveEssay />
                </motion.div>
              )}

              {/* Overview Section */}
              {activeSection === "overview" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-8"
                >
                  <div>
                    <h2 className="text-3xl font-display font-bold mb-6 text-foreground">
                      {lang === "en" ? "Journey" : "سفر"}
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                      {narrativeSections.map((section, i) => (
                        <div key={section.id} className="neu-raised p-6 hover:shadow-lg transition-shadow">
                          <h3 className="text-xl font-display font-semibold text-foreground mb-3">
                            {section.title[lang]}
                          </h3>
                          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-6">
                            {section.content[lang][0]}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Education Grid */}
                  <div>
                    <h2 className="text-3xl font-display font-bold mb-6 text-foreground">
                      {lang === "en" ? "Education" : "تحصیلات"}
                    </h2>
                    <div className="grid md:grid-cols-3 gap-4">
                      {cvEducation.map((edu) => (
                        <div key={edu.id} className="neu-raised p-5">
                          <div className="flex items-center gap-2 mb-3">
                            <GraduationCap className="w-5 h-5 text-primary" />
                            <span className="text-xs font-mono text-muted-foreground">{edu.period}</span>
                          </div>
                          <h4 className="font-display text-base font-semibold text-foreground mb-2">
                            {edu.title[lang]}
                          </h4>
                          <p className="text-sm text-muted-foreground mb-1">{edu.org}</p>
                          <p className="text-xs text-muted-foreground">{edu.location}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Skills Grid */}
                  <div>
                    <h2 className="text-3xl font-display font-bold mb-6 text-foreground">
                      {lang === "en" ? "Expertise" : "تخصص"}
                    </h2>
                    <div className="grid sm:grid-cols-3 gap-4">
                      {cvSkills[lang].map((group) => (
                        <div key={group.label} className="neu-raised p-5">
                          <h4 className="text-sm font-semibold text-primary mb-3">{group.label}</h4>
                          <div className="flex flex-wrap gap-2">
                            {group.items.map((item) => (
                              <span
                                key={item}
                                className="px-2 py-1 text-xs rounded-md bg-primary/10 text-foreground border border-primary/20"
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Experience Section */}
              {activeSection === "experience" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <h2 className="text-3xl font-display font-bold mb-6 text-foreground">
                    {lang === "en" ? "Professional Experience" : "تجربه حرفه‌ای"}
                  </h2>
                  {cvExperience.map((exp) => (
                    <div key={exp.id} className="neu-raised p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-display font-semibold text-foreground mb-1">
                            {exp.title[lang]}
                          </h3>
                          <p className="text-base text-primary font-medium">{exp.org}</p>
                        </div>
                        <span className="text-sm font-mono text-muted-foreground whitespace-nowrap">
                          {exp.period}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {exp.location}
                      </p>
                      <ul className="space-y-2">
                        {exp.bullets[lang].map((bullet, i) => (
                          <li key={i} className="flex gap-3 text-sm text-muted-foreground">
                            <span className="text-primary mt-1.5 shrink-0">•</span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </motion.div>
              )}

              {/* Achievements Section */}
              {activeSection === "achievements" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-8"
                >
                  <div>
                    <h2 className="text-3xl font-display font-bold mb-6 text-foreground">
                      {lang === "en" ? "Honors & Awards" : "افتخارات و جوایز"}
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {cvAwards.map((award, i) => (
                        <div key={i} className="neu-raised p-5 flex items-start gap-3">
                          <Award className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium text-foreground mb-1">{award.title[lang]}</p>
                            <p className="text-sm text-muted-foreground">
                              {award.org} • {award.year}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Bio;
