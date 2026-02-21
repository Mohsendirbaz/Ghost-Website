import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ShieldCheck, TrendingUp, Layers, Lock, BarChart3, CalendarClock } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

const sleeves = {
  en: {
    title: "Two Sleeves. One Mission.",
    subtitle: "Each Empower10 Unit bundles principal protection with long-term growth participation.",
    sleeveA: {
      name: "Protection Sleeve",
      tagline: "The \"zero-loss at maturity\" foundation",
      desc: "A portion of your investment is allocated to segregated collateral (U.S. Treasury STRIPS) or an FDIC-insured deposit wrapper—designed to return 100% of your net principal at year 10.",
      points: [
        "Bankruptcy-remote trust with third-party custodian",
        "Periodic attestation of collateral coverage",
        "Protection applies at maturity; early exit may differ",
      ],
    },
    sleeveB: {
      name: "Growth Sleeve",
      tagline: "Long-term upside + \"root for momentum\"",
      desc: "Exposure to the company's equity growth with the Max365 momentum cap—so early price surges don't lock you out.",
      points: [
        "Max365: highest official closing price in first 365 Nasdaq days",
        "Redemption price capped at Max365 after year 1",
        "At year 10: receive the greater of redeemed value or Protected Amount",
      ],
    },
  },
  fa: {
    title: "دو بخش. یک مأموریت.",
    subtitle: "هر واحد Empower10 حفاظت اصل سرمایه را با مشارکت در رشد بلندمدت ترکیب می‌کند.",
    sleeveA: {
      name: "بخش حفاظت",
      tagline: "پایه «بدون ضرر در سررسید»",
      desc: "بخشی از سرمایه‌گذاری شما به وثیقه جداشده (اوراق خزانه‌داری آمریکا) یا پوشش سپرده بیمه‌شده FDIC اختصاص می‌یابد — طراحی‌شده برای بازگشت ۱۰۰٪ اصل سرمایه خالص در سال دهم.",
      points: [
        "تراست محافظت‌شده از ورشکستگی با امین شخص ثالث",
        "تأییدیه دوره‌ای پوشش وثیقه",
        "حفاظت در سررسید اعمال می‌شود؛ خروج زودهنگام ممکن است متفاوت باشد",
      ],
    },
    sleeveB: {
      name: "بخش رشد",
      tagline: "صعود بلندمدت + «حمایت از شتاب»",
      desc: "مشارکت در رشد سهام شرکت با سقف شتاب Max365 — تا جهش‌های اولیه قیمت شما را از دسترسی محروم نکند.",
      points: [
        "Max365: بالاترین قیمت رسمی بسته‌شدن در ۳۶۵ روز اول نزدک",
        "قیمت بازخرید پس از سال اول به Max365 محدود می‌شود",
        "در سال دهم: مبلغ بیشتر بین ارزش بازخرید یا مبلغ محافظت‌شده",
      ],
    },
  },
};

export function HowItWorks() {
  const { lang } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const data = sleeves[lang];

  return (
    <section id="how-it-works" className="py-24 relative" ref={ref}>
      <div className="container-ghost">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-foreground">
            {data.title}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {data.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Sleeve A */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="neu-elevated p-8 glow-border"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-foreground">{data.sleeveA.name}</h3>
                <p className="text-xs text-muted-foreground">{data.sleeveA.tagline}</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">{data.sleeveA.desc}</p>
            <ul className="space-y-2">
              {data.sleeveA.points.map((pt, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                  <Lock className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Sleeve B */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="neu-elevated p-8 glow-border"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center shrink-0">
                <TrendingUp className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-foreground">{data.sleeveB.name}</h3>
                <p className="text-xs text-muted-foreground">{data.sleeveB.tagline}</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">{data.sleeveB.desc}</p>
            <ul className="space-y-2">
              {data.sleeveB.points.map((pt, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                  <BarChart3 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* How it flows — steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 max-w-4xl mx-auto"
        >
          <h3 className="font-display text-xl font-semibold text-foreground text-center mb-8">
            {lang === "fa" ? "مسیر سرمایه‌گذاری" : "Your Investment Journey"}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Layers, step: 1, en: "Purchase Empower10 Units", fa: "خرید واحدهای Empower10" },
              { icon: ShieldCheck, step: 2, en: "Proceeds split into Protection + Growth sleeves", fa: "تخصیص به بخش حفاظت + رشد" },
              { icon: BarChart3, step: 3, en: "Max365 locks after first Nasdaq year", fa: "قفل Max365 پس از سال اول نزدک" },
              { icon: CalendarClock, step: 4, en: "Redeem anytime in years 2–10 or collect Protected Amount at maturity", fa: "بازخرید در سال ۲ تا ۱۰ یا دریافت مبلغ محافظت‌شده در سررسید" },
            ].map((s) => (
              <div key={s.step} className="neu-raised p-5 text-center">
                <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center mx-auto mb-3">
                  <s.icon className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-xs font-mono text-muted-foreground">
                  {lang === "fa" ? `مرحله ${s.step}` : `Step ${s.step}`}
                </span>
                <p className="text-sm font-medium text-foreground mt-1">{lang === "fa" ? s.fa : s.en}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
