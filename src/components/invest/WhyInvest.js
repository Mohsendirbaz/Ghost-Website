import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ShieldCheck, TrendingUp, Clock, Smile, Users, Landmark } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

const reasons = [
  {
    icon: ShieldCheck,
    title: { en: "Maturity Protection", fa: "حفاظت در سررسید" },
    desc: {
      en: "Designed so your Protected Amount is returned at year 10 if held to term — even across a volatile decade.",
      fa: "طراحی‌شده تا مبلغ محافظت‌شده شما در سال دهم بازگردانده شود — حتی در یک دهه پرنوسان.",
    },
  },
  {
    icon: TrendingUp,
    title: { en: "Root for Momentum", fa: "حمایت از شتاب" },
    desc: {
      en: "If early momentum happens, the Max365 cap means you don't have to feel left behind — your access is engineered for the long game.",
      fa: "اگر شتاب اولیه رخ دهد، سقف Max365 به شما اطمینان می‌دهد — دسترسی شما برای بازی بلندمدت طراحی شده.",
    },
  },
  {
    icon: Clock,
    title: { en: "Decade-Long Flexibility", fa: "انعطاف ده‌ساله" },
    desc: {
      en: "Redeem when it suits your liquidity, taxes, and conviction — no pressure to act in a single frantic moment.",
      fa: "زمانی بازخرید کنید که با نقدینگی، مالیات و اعتماد شما هماهنگ باشد — بدون فشار لحظه‌ای.",
    },
  },
  {
    icon: Smile,
    title: { en: "Less Regret, More Patience", fa: "پشیمانی کمتر، صبر بیشتر" },
    desc: {
      en: "The structure removes timing regret around listings. You don't need perfect timing — you need conviction.",
      fa: "این ساختار پشیمانی زمان‌بندی را از بین می‌برد. شما به زمان‌بندی عالی نیاز ندارید — به اعتماد نیاز دارید.",
    },
  },
  {
    icon: Users,
    title: { en: "Impact Built In", fa: "تأثیر تعبیه‌شده" },
    desc: {
      en: "Every unit funds measurable programs for women's economic mobility, veteran transitions, and youth ownership.",
      fa: "هر واحد برنامه‌های قابل اندازه‌گیری برای توانمندسازی زنان، انتقال کهنه‌سربازان و مالکیت جوانان را تأمین مالی می‌کند.",
    },
  },
  {
    icon: Landmark,
    title: { en: "Institutional-Grade Structure", fa: "ساختار نهادی" },
    desc: {
      en: "Segregated collateral, third-party custodian, periodic attestation — this isn't a promise, it's an engineered outcome.",
      fa: "وثیقه جداشده، امین شخص ثالث، تأییدیه دوره‌ای — این یک وعده نیست، یک نتیجه مهندسی‌شده است.",
    },
  },
];

export function WhyInvest() {
  const { lang } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24" ref={ref}>
      <div className="container-ghost">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            {lang === "fa" ? "چرا Empower10؟" : "Why Empower10?"}
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            {lang === "fa"
              ? "حفاظت برای مشتریان. سرمایه برای سازندگان. برندی که مردم با آن می‌مانند."
              : "Protection for customers. Capital for builders. A brand people stay with."}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {reasons.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="neu-raised p-6 neu-glow"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center mb-4">
                <r.icon className="w-5 h-5 text-primary-foreground" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">{r.title[lang]}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{r.desc[lang]}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
