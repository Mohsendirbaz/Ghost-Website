import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Heart, Award, GraduationCap, Briefcase, BarChart3, Users } from "lucide-react";
import { useLang } from "../../context/LanguageContext";

const lanes = [
  {
    icon: Heart,
    title: { en: "Women's Economic Mobility", fa: "توانمندسازی اقتصادی زنان" },
    desc: {
      en: "Micro-grants, paid skills training, and mentorship networks — turning participation into ownership.",
      fa: "کمک‌هزینه‌های خرد، آموزش مهارت‌های پولی و شبکه‌های منتورینگ — تبدیل مشارکت به مالکیت.",
    },
  },
  {
    icon: Award,
    title: { en: "Veteran Transition Track", fa: "مسیر انتقال کهنه‌سربازان" },
    desc: {
      en: "Credential funding, placement partnerships, and an entrepreneurship incubator for those who served.",
      fa: "تأمین مالی مدارک، مشارکت‌های استخدامی و مرکز رشد کارآفرینی برای کسانی که خدمت کردند.",
    },
  },
  {
    icon: GraduationCap,
    title: { en: "Next-Gen Ownership (Under 18)", fa: "مالکیت نسل بعدی (زیر ۱۸)" },
    desc: {
      en: "Custodial ownership via UTMA/UGMA — build ownership early without forcing perfect timing. Multi-decade customer lifetime value.",
      fa: "مالکیت قیمومیتی از طریق UTMA/UGMA — مالکیت زودهنگام بدون نیاز به زمان‌بندی عالی.",
    },
  },
];

const governance = [
  {
    icon: Users,
    title: { en: "Independent Impact Council", fa: "شورای تأثیر مستقل" },
    desc: { en: "Veteran leadership + women's workforce org representation", fa: "رهبری کهنه‌سربازان + نمایندگی سازمان‌های زنان" },
  },
  {
    icon: BarChart3,
    title: { en: "Public KPI Dashboard", fa: "داشبورد عمومی شاخص‌ها" },
    desc: { en: "# grants, $ deployed, completion rates, placement rates, business survival rates", fa: "تعداد کمک‌هزینه، مبلغ مستقر، نرخ تکمیل، نرخ استخدام، نرخ بقای کسب‌وکار" },
  },
  {
    icon: Briefcase,
    title: { en: "Third-Party Verification", fa: "تأیید شخص ثالث" },
    desc: { en: "Annual impact report with independent audit", fa: "گزارش سالانه تأثیر با ممیزی مستقل" },
  },
];

export function ImpactEngine() {
  const { lang } = useLang();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 relative" ref={ref}>
      <div className="absolute inset-0" style={{ background: "var(--neu-gradient-raised)" }} />
      <div className="absolute inset-0 bg-gradient-primary opacity-5" />

      <div className="container-ghost relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full neu-raised mb-4">
            <Heart className="w-4 h-4 text-pink-400" />
            <span className="text-sm font-medium text-muted-foreground">
              {lang === "fa" ? "موتور تأثیر" : "Impact Engine"}
            </span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            {lang === "fa" ? "زنان. کهنه‌سربازان. جوانان." : "Women. Veterans. Youth."}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {lang === "fa"
              ? "این یک برنامه اهدایی نیست. این یک سیاست تجاری است که از مشتریان محافظت می‌کند و در عین حال پایگاه سرمایه لازم برای رشد را می‌سازد."
              : "This isn't a donation program. It's a commercial policy that protects customers while building the capital base required to grow."}
          </p>
        </motion.div>

        {/* Three lanes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
          {lanes.map((lane, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="neu-elevated p-6 glow-border"
            >
              <lane.icon className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">{lane.title[lang]}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{lane.desc[lang]}</p>
            </motion.div>
          ))}
        </div>

        {/* Governance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="font-display text-xl font-semibold text-foreground text-center mb-8">
            {lang === "fa" ? "حاکمیت و شفافیت" : "Governance & Accountability"}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {governance.map((g, i) => (
              <div key={i} className="neu-raised p-5 text-center">
                <g.icon className="w-6 h-6 text-primary mx-auto mb-3" />
                <h4 className="font-display text-sm font-semibold text-foreground mb-1">{g.title[lang]}</h4>
                <p className="text-xs text-muted-foreground">{g.desc[lang]}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
