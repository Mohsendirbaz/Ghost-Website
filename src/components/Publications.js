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
  }
];

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
                  {pub.title[lang]}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {pub.description[lang]}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-border/50">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="font-mono">{pub.year}</span>
                <span>•</span>
                <span>{pub.size}</span>
              </div>

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
            </div>
          </motion.div>
        ))}
      </div>

      <div className="neu-raised p-6 bg-gradient-to-br from-background to-primary/5">
        <p className="text-sm text-muted-foreground">
          {lang === "en"
            ? "All publications are available for download and viewing directly in your browser. PDFs are optimized for screen reading and printing."
            : "تمام منتشرات برای دانلود و مشاهده مستقیم در مرورگر شما در دسترس هستند. فایل‌های PDF برای خواندن صفحه نمایش و چاپ بهینه‌سازی شده‌اند."
          }
        </p>
      </div>
    </div>
  );
};

export default Publications;
