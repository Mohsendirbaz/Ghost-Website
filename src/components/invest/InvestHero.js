import { motion } from "framer-motion";
import { ArrowDown, Shield, Clock, TrendingUp, Heart } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

export function InvestHero() {
  const { lang } = useLanguage();

  const keyBenefits = [
    {
      icon: Shield,
      label: lang === "fa" ? "حفاظت اصل" : "Principal Protected",
      value: "100%",
      detail: lang === "fa" ? "در سررسید" : "At Maturity"
    },
    {
      icon: Clock,
      label: lang === "fa" ? "بازه زمانی" : "Time Horizon",
      value: "10",
      detail: lang === "fa" ? "سال" : "Years"
    },
    {
      icon: TrendingUp,
      label: lang === "fa" ? "سقف شتاب" : "Momentum Cap",
      value: "Max365",
      detail: lang === "fa" ? "نوآورانه" : "Innovative"
    },
    {
      icon: Heart,
      label: lang === "fa" ? "تأثیر اجتماعی" : "Social Impact",
      value: "Built-in",
      detail: lang === "fa" ? "زنان، کهنه‌سربازان، جوانان" : "Women, Vets, Youth"
    },
  ];

  return (
    <section className="relative min-h-[70vh] flex items-center overflow-hidden bg-gradient-to-b from-background to-background/50 pt-20 pb-16">
      <div className="absolute inset-0 hero-grid opacity-10" />

      <div className="container-ghost relative z-10">
        {/* Compact Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full neu-raised mb-6">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">
              {lang === "fa" ? "Empower10™ حقوق رشد محافظت‌شده" : "Empower10™ Protected Growth Rights"}
            </span>
          </div>

          <h1 className="font-display text-5xl md:text-6xl font-bold leading-tight mb-6">
            <span className="text-foreground">
              {lang === "fa" ? "رشد ده‌ساله برای " : "Ten-Year Growth for "}
            </span>
            <span className="text-gradient">
              {lang === "fa" ? "باورمندان اولیه" : "Early Believers"}
            </span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            {lang === "fa"
              ? "حفاظت اصل سرمایه + صعود هماهنگ با شتاب + تأثیر اجتماعی تعبیه‌شده"
              : "Principal protection + upside aligned with momentum + impact built in"}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a
              href="#simulator"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-gradient-primary text-primary-foreground font-semibold text-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
            >
              {lang === "fa" ? "محاسبه سناریو" : "Calculate Your Scenario"}
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg neu-interactive text-foreground font-semibold text-lg"
            >
              {lang === "fa" ? "نحوه عملکرد" : "How It Works"}
              <ArrowDown className="w-5 h-5" />
            </a>
          </div>
        </motion.div>

        {/* Key Benefits Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto"
        >
          {keyBenefits.map((benefit, i) => (
            <div key={i} className="neu-raised p-6 text-center hover:shadow-lg transition-shadow">
              <benefit.icon className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="text-3xl font-display font-bold text-foreground mb-1">
                {benefit.value}
              </div>
              <div className="text-sm font-semibold text-foreground mb-1">
                {benefit.label}
              </div>
              <div className="text-xs text-muted-foreground">
                {benefit.detail}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
