import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export function WorkedExample() {
  const { lang } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const steps = lang === "fa"
    ? [
        { label: "خرید", detail: "واحدهای Empower10 را خریداری می‌کنید. سرمایه به بخش حفاظت و رشد تقسیم می‌شود." },
        { label: "لیست‌شدن", detail: "شرکت در نزدک لیست می‌شود (D₀). بالاترین قیمت رسمی ۳۶۵ روز پیگیری می‌شود." },
        { label: "سال اول: Max365 = $40", detail: "بالاترین NOCP در ۳۶۵ روز = $40. قیمت بازخرید شما از این پس به $40 محدود است." },
        { label: "سال ۴: سهم $90", detail: "شما $40 می‌پردازید، سهمی به ارزش $90 دریافت — مزیت $50 به ازای هر سهم." },
        { label: "سال ۱۰ (بدترین حالت)", detail: "حتی اگر سهم افت کرده باشد، مبلغ محافظت‌شده (۱۰۰٪ اصل سرمایه) در سررسید بازگردانده می‌شود." },
      ]
    : [
        { label: "Purchase", detail: "You buy Empower10 Units. Proceeds split into Protection + Growth sleeves." },
        { label: "Listing Day", detail: "Company lists on Nasdaq (D₀). Highest official closing price tracked for 365 days." },
        { label: "Year 1: Max365 = $40", detail: "Highest NOCP over 365 days = $40. Your redemption price is now capped at $40." },
        { label: "Year 4: Stock at $90", detail: "You pay $40, receive a share worth $90 — $50 benefit per share." },
        { label: "Year 10 (Worst Case)", detail: "Even if the stock has declined, your Protected Amount (100% net principal) is returned at maturity." },
      ];

  return (
    <section className="py-24 relative" ref={ref}>
      <div className="container-ghost">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            {lang === "fa" ? "مثال عملی Empower10" : "Empower10 Worked Example"}
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            {lang === "fa"
              ? "از خرید تا سررسید — هر سناریو پوشش داده شده."
              : "From purchase to maturity — every scenario covered."}
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <div className="absolute top-0 bottom-0 left-6 w-px bg-border-strong" />

            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.12 }}
                className="relative flex items-start gap-6 pb-8 last:pb-0"
              >
                <div className="relative z-10 w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center shrink-0 shadow-neu-raised">
                  <span className="text-primary-foreground font-display font-bold text-sm">{i + 1}</span>
                </div>
                <div className="neu-raised p-4 flex-1">
                  <p className="font-display font-semibold text-foreground mb-1">{step.label}</p>
                  <p className="text-sm text-muted-foreground">{step.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Downside scenario */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="mt-8 p-5 rounded-lg neu-raised"
          >
            <p className="text-sm text-foreground font-semibold mb-1">
              {lang === "fa" ? "📉 سناریوی افت بازار" : "📉 Bear Market Scenario"}
            </p>
            <p className="text-sm text-muted-foreground">
              {lang === "fa"
                ? "اگر سهم در سال ۱۰ با $15 معامله شود: بازخرید = $15 (بدون مزیت سقف)، اما بخش حفاظت ۱۰۰٪ اصل سرمایه خالص شما را بازمی‌گرداند. نتیجه: بدون ضرر در سررسید."
                : "If the stock trades at $15 in year 10: Redemption = $15 (no cap benefit), but the Protection Sleeve returns 100% of your net principal. Result: zero loss at maturity."}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
