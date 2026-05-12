import { motion } from "framer-motion";
import { FileText, Download, ExternalLink } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const publications = [
  {
    id: 1,
    title: {
      en: "A Physics-Informed Special Function Framework Paper",
      fa: "مقاله چارچوب تابع خاص مطلع از فیزیک"
    },
    description: {
      en: "Advanced mathematical framework integrating physics principles with special function theory for computational applications.",
      fa: "چارچوب ریاضی پیشرفته که اصول فیزیک را با نظریه تابع خاص برای کاربردهای محاسباتی ادغام می‌کند."
    },
    pdfUrl: "https://raw.githubusercontent.com/Mohsendirbaz/Ghost-Website/main/Asset/A_Physics_Informed_Special_Function_Framework_Paper.pdf",
    downloadUrl: "https://github.com/Mohsendirbaz/Ghost-Website/raw/main/Asset/A_Physics_Informed_Special_Function_Framework_Paper.pdf",
    size: "486 KB",
    year: 2024
  },
  {
    id: 2,
    title: {
      en: "Climate Policy Paper",
      fa: "مقاله سیاست آب‌و‌هوایی"
    },
    description: {
      en: "Comprehensive analysis of climate policy frameworks with focus on technological solutions and implementation strategies.",
      fa: "تجزیه و تحلیل جامع چارچوب‌های سیاست آب‌و‌هوایی با تمرکز بر راه‌حل‌های فناوری و استراتژی‌های اجرایی."
    },
    pdfUrl: "https://raw.githubusercontent.com/Mohsendirbaz/Ghost-Website/main/Asset/Climate_Policy_Paper.pdf",
    downloadUrl: "https://github.com/Mohsendirbaz/Ghost-Website/raw/main/Asset/Climate_Policy_Paper.pdf",
    size: "2.3 MB",
    year: 2024
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
            {/* Title */}
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

            {/* Metadata and Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-border/50">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="font-mono">{pub.year}</span>
                <span>•</span>
                <span>{pub.size}</span>
              </div>
              <div className="flex-1" />
              <a
                href={pub.downloadUrl}
                download
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

      {/* Additional Info */}
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
