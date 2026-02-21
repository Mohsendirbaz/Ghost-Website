import { motion } from "framer-motion";
import { ArrowDown, Shield, Clock, TrendingUp, Heart, Star } from "lucide-react";
import { useLang } from "../../context/LanguageContext";

export function InvestHero() {
  const { lang } = useLang();

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 hero-grid opacity-20" />
      <div className="absolute inset-0 hero-radial" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />

      <div className="container-ghost relative py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full neu-raised mb-8"
          >
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">
              {lang === "fa" ? "حقوق رشد محافظت‌شده" : "Empower10™ Protected Growth Rights"}
            </span>
          </motion.div>

          {/* Headline */}
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6">
            <span className="text-foreground">
              {lang === "fa"
                ? "رشد ده‌ساله برای "
                : "Ten-Year Growth for "}
            </span>
            <span className="text-gradient">
              {lang === "fa" ? "باورمندان اولیه" : "Early Believers"}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            {lang === "fa"
              ? "حفاظت از اصل سرمایه در سررسید، صعود هماهنگ با شتاب، تأثیر اجتماعی تعبیه‌شده — برای زنان، کهنه‌سربازان و نسل آینده."
              : "Principal protected at maturity, upside aligned with momentum, impact built in — for women, veterans, and the next generation."}
          </p>

          {/* Badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {[
              { icon: Shield, label: lang === "fa" ? "حفاظت اصل سرمایه" : "Principal Protection" },
              { icon: Clock, label: lang === "fa" ? "بازه ۱۰ ساله" : "10-Year Window" },
              { icon: TrendingUp, label: lang === "fa" ? "سقف شتاب Max365" : "Max365 Momentum Cap" },
              { icon: Heart, label: lang === "fa" ? "موتور تأثیر" : "Impact Engine" },
              { icon: Star, label: lang === "fa" ? "مالکیت نسل بعدی" : "Next-Gen Ownership" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2 px-3 py-1.5 rounded-lg neu-flat">
                <item.icon className="w-4 h-4 text-primary" />
                <span className="text-xs font-medium text-foreground">{item.label}</span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#waitlist"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg bg-gradient-primary text-primary-foreground font-medium text-lg shadow-neu-elevated hover:shadow-neu-prominent hover:-translate-y-0.5 active:shadow-neu-pressed active:translate-y-0 transition-all duration-200"
            >
              {lang === "fa" ? "ثبت علاقه‌مندی" : "Register Interest"}
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg neu-interactive text-foreground font-medium text-lg"
            >
              {lang === "fa" ? "نحوه عملکرد" : "How It Works"}
              <ArrowDown className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
