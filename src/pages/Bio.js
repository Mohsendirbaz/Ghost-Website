import { motion } from "framer-motion";
import { Download, Linkedin, ExternalLink } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { copy } from '../data/copy';
import Breadcrumb from '../components/Breadcrumb';
import {
  founderName,
  founderTitle,
  founderTagline,
  bioPageTitle,
  bioTabs,
  linkedInUrl,
  cvDownloadUrl,
  t,
} from "../data/founder-bio";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { FounderNarrative } from "../components/founder/FounderNarrative";
import { FounderCV } from "../components/founder/FounderCV";
import { PerspectiveEssay } from "../components/founder/PerspectiveEssay";

const Bio = () => {
  const { lang } = useLanguage();

  return (
    <main id="main-content">
      <Breadcrumb crumbs={[
        { label: copy[lang].breadcrumb.home, to: `/${lang}` },
        { label: copy[lang].breadcrumb.company, to: `/${lang}/company` },
        { label: lang === 'en' ? 'Founder Bio' : 'بیوگرافی بنیان‌گذار' },
      ]} />
      {/* Hero */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-40" />
        <div className="absolute inset-0 hero-radial" />

        <div className="container-ghost relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center space-y-6"
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase bg-primary/10 text-primary border border-primary/20">
              {t(bioPageTitle, lang)}
            </span>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
              {t(founderName, lang)}
            </h1>

            <p className="text-lg md:text-xl text-primary font-medium">
              {t(founderTitle, lang)}
            </p>

            <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
              {t(founderTagline, lang)}
            </p>

            {/* Action buttons */}
            <div className="flex items-center justify-center gap-3 pt-2">
              <a
                href={cvDownloadUrl}
                download
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
              >
                <Download className="w-4 h-4" />
                {lang === "en" ? "Download CV" : "دانلود رزومه"}
              </a>
              <a
                href={linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg neu-interactive text-sm font-medium text-foreground"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
                <ExternalLink className="w-3 h-3 text-muted-foreground" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Perspective Essay */}
      <PerspectiveEssay />

      {/* Tabs: Narrative + CV */}
      <section className="pb-20 md:pb-28">
        <div className="container-ghost max-w-4xl">
          <Tabs defaultValue="narrative" className="w-full">
            <TabsList className="w-full max-w-xs mx-auto mb-10 grid grid-cols-2">
              <TabsTrigger value="narrative">
                {bioTabs[lang].narrative}
              </TabsTrigger>
              <TabsTrigger value="cv">
                {bioTabs[lang].cv}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="narrative">
              <FounderNarrative />
            </TabsContent>

            <TabsContent value="cv">
              <FounderCV />
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </main>
  );
};

export default Bio;
