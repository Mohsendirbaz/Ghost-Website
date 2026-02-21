import { motion } from "framer-motion";
import { ShieldCheck, TrendingUp } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

export function HowItWorks() {
  const { lang } = useLanguage();

  const sleeves = [
    {
      icon: ShieldCheck,
      name: lang === "fa" ? "بخش حفاظت" : "Protection Sleeve",
      tagline: lang === "fa" ? "بدون ضرر در سررسید" : "Zero-loss at maturity",
      points: [
        lang === "fa"
          ? "وثیقه جداشده (اوراق خزانه‌داری یا سپرده FDIC)"
          : "Segregated collateral (Treasury STRIPS or FDIC deposit)",
        lang === "fa"
          ? "بازگشت ۱۰۰٪ اصل سرمایه خالص در سال ۱۰"
          : "Returns 100% net principal at year 10",
        lang === "fa"
          ? "تأییدیه دوره‌ای توسط شخص ثالث"
          : "Third-party periodic attestation"
      ]
    },
    {
      icon: TrendingUp,
      name: lang === "fa" ? "بخش رشد" : "Growth Sleeve",
      tagline: lang === "fa" ? "صعود بلندمدت با سقف شتاب" : "Long-term upside with momentum cap",
      points: [
        lang === "fa"
          ? "مشارکت در رشد سهام شرکت"
          : "Equity growth participation",
        lang === "fa"
          ? "Max365: بالاترین قیمت رسمی در ۳۶۵ روز اول"
          : "Max365: highest official close in first 365 Nasdaq days",
        lang === "fa"
          ? "قیمت بازخرید محدود به Max365 پس از سال ۱"
          : "Redemption price capped at Max365 after year 1"
      ]
    }
  ];

  const steps = [
    { num: 1, label: lang === "fa" ? "خرید واحدها" : "Purchase Units" },
    { num: 2, label: lang === "fa" ? "تقسیم به ۲ بخش" : "Split into 2 Sleeves" },
    { num: 3, label: lang === "fa" ? "قفل Max365" : "Max365 Locks" },
    { num: 4, label: lang === "fa" ? "بازخرید یا سررسید" : "Redeem or Maturity" },
  ];

  return (
    <div id="how-it-works" className="space-y-8">
      <div>
        <h2 className="font-display text-4xl font-bold text-foreground mb-3">
          {lang === "fa" ? "دو بخش. یک مأموریت." : "Two Sleeves. One Mission."}
        </h2>
        <p className="text-lg text-muted-foreground">
          {lang === "fa"
            ? "هر واحد Empower10 حفاظت و رشد را ترکیب می‌کند"
            : "Each Empower10 Unit bundles protection with growth"}
        </p>
      </div>

      {/* Sleeves */}
      <div className="space-y-4">
        {sleeves.map((sleeve, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="neu-raised p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center shrink-0">
                <sleeve.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <h3 className="font-display text-xl font-bold text-foreground mb-1">
                  {sleeve.name}
                </h3>
                <p className="text-sm text-primary font-medium mb-3">
                  {sleeve.tagline}
                </p>
                <ul className="space-y-1.5">
                  {sleeve.points.map((point, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-primary mt-1">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Timeline */}
      <div className="pt-4">
        <h3 className="font-display text-xl font-semibold text-foreground mb-4">
          {lang === "fa" ? "مسیر سرمایه‌گذاری" : "Your Journey"}
        </h3>
        <div className="grid grid-cols-4 gap-3">
          {steps.map((step) => (
            <div key={step.num} className="neu-raised p-4 text-center">
              <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center mx-auto mb-2">
                <span className="text-primary-foreground font-display font-bold">{step.num}</span>
              </div>
              <p className="text-xs font-medium text-foreground">{step.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
