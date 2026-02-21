import { motion } from "framer-motion";
import { ShieldCheck, TrendingUp, Clock, Smile, Users, Landmark } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

export function WhyInvest() {
  const { lang } = useLanguage();

  const reasons = [
    {
      icon: ShieldCheck,
      title: lang === "fa" ? "حفاظت در سررسید" : "Maturity Protection",
      desc: lang === "fa"
        ? "بازگشت مبلغ محافظت‌شده در سال ۱۰"
        : "Protected Amount returned at year 10"
    },
    {
      icon: TrendingUp,
      title: lang === "fa" ? "حمایت از شتاب" : "Root for Momentum",
      desc: lang === "fa"
        ? "Max365 شما را در بازی بلندمدت نگه می‌دارد"
        : "Max365 keeps you in the long game"
    },
    {
      icon: Clock,
      title: lang === "fa" ? "انعطاف ده‌ساله" : "Decade Flexibility",
      desc: lang === "fa"
        ? "بازخرید در سال‌های ۲ تا ۱۰"
        : "Redeem anytime years 2-10"
    },
    {
      icon: Smile,
      title: lang === "fa" ? "پشیمانی کمتر" : "Less Regret",
      desc: lang === "fa"
        ? "ساختار پشیمانی زمان‌بندی را حذف می‌کند"
        : "Structure removes timing regret"
    },
    {
      icon: Users,
      title: lang === "fa" ? "تأثیر تعبیه‌شده" : "Impact Built In",
      desc: lang === "fa"
        ? "زنان، کهنه‌سربازان، جوانان"
        : "Women, veterans, youth programs"
    },
    {
      icon: Landmark,
      title: lang === "fa" ? "ساختار نهادی" : "Institutional Grade",
      desc: lang === "fa"
        ? "وثیقه جداشده، امین شخص ثالث"
        : "Segregated collateral, 3rd-party custodian"
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-4xl font-bold text-foreground mb-3">
          {lang === "fa" ? "چرا Empower10؟" : "Why Empower10?"}
        </h2>
        <p className="text-lg text-muted-foreground">
          {lang === "fa"
            ? "حفاظت + سرمایه + برند"
            : "Protection + Capital + Brand"}
        </p>
      </div>

      <div className="grid gap-4">
        {reasons.map((reason, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            className="neu-raised p-5 flex items-start gap-4 hover:shadow-lg transition-shadow"
          >
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <reason.icon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-1">
                {reason.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {reason.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
