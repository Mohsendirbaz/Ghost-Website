import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { supabase } from "../../integrations/supabase/client";

export function WaitlistForm() {
  const { lang } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    investment_amount_usd: "",
    message: "",
    account_type: "individual",
  });
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const accountTypes = [
    { value: "individual", en: "Individual", fa: "فردی" },
    { value: "utma", en: "UTMA (Minor)", fa: "UTMA (زیر ۱۸)" },
    { value: "ugma", en: "UGMA (Minor)", fa: "UGMA (زیر ۱۸)" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.full_name.trim() || !form.email.trim()) return;

    setStatus("loading");
    const { error } = await supabase.from("investor_interests").insert({
      full_name: form.full_name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim() || null,
      investment_amount_usd: form.investment_amount_usd ? Number(form.investment_amount_usd) : null,
      message: `[${form.account_type.toUpperCase()}] ${form.message.trim() || ""}`.trim() || null,
      source: "empower10-website",
    });

    if (error) {
      setStatus("error");
      setErrorMsg(lang === "fa" ? "خطایی رخ داد. لطفاً دوباره تلاش کنید." : "Something went wrong. Please try again.");
    } else {
      setStatus("success");
      setForm({ full_name: "", email: "", phone: "", investment_amount_usd: "", message: "", account_type: "individual" });
    }
  };

  return (
    <section id="waitlist" className="py-24 relative" ref={ref}>
      <div className="absolute inset-0" style={{ background: "var(--neu-gradient-raised)" }} />
      <div className="absolute inset-0 bg-gradient-primary opacity-5" />

      <div className="container-ghost relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            {lang === "fa" ? "ثبت علاقه‌مندی" : "Register Your Interest"}
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            {lang === "fa"
              ? "در لیست انتظار Empower10™ ثبت‌نام کنید تا جزو اولین مشارکت‌کنندگان باشید."
              : "Join the Empower10™ waitlist to be among the first participants when the offering opens."}
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="max-w-lg mx-auto neu-elevated p-8 rounded-xl space-y-5"
        >
          {/* Account type selector */}
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              {lang === "fa" ? "نوع حساب" : "Account Type"}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {accountTypes.map((at) => (
                <button
                  key={at.value}
                  type="button"
                  onClick={() => setForm({ ...form, account_type: at.value })}
                  className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    form.account_type === at.value
                      ? "bg-gradient-primary text-primary-foreground shadow-neu-elevated"
                      : "neu-raised text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {lang === "fa" ? at.fa : at.en}
                </button>
              ))}
            </div>
            {(form.account_type === "utma" || form.account_type === "ugma") && (
              <p className="text-xs text-muted-foreground mt-2">
                {lang === "fa"
                  ? "حساب‌های قیمومیتی توسط قیم بزرگسال تا سن قانونی ذینفع مدیریت می‌شوند. انتقال‌ها معمولاً غیرقابل برگشت هستند."
                  : "Custodial accounts are managed by an adult custodian until the beneficiary reaches age of majority. Transfers are typically irrevocable."}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1.5">
              {lang === "fa" ? "نام کامل *" : "Full Name *"}
            </label>
            <input
              required
              maxLength={100}
              value={form.full_name}
              onChange={(e) => setForm({ ...form, full_name: e.target.value })}
              className="w-full px-4 py-3 rounded-lg neu-pressed bg-transparent text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder={lang === "fa" ? "نام و نام خانوادگی" : "John Doe"}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1.5">
              {lang === "fa" ? "ایمیل *" : "Email Address *"}
            </label>
            <input
              required
              type="email"
              maxLength={255}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-3 rounded-lg neu-pressed bg-transparent text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1.5">
              {lang === "fa" ? "شماره تلفن" : "Phone Number"}
            </label>
            <input
              type="tel"
              maxLength={20}
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full px-4 py-3 rounded-lg neu-pressed bg-transparent text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="+1 (555) 000-0000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1.5">
              {lang === "fa" ? "مبلغ تقریبی سرمایه‌گذاری ($)" : "Approximate Investment ($)"}
            </label>
            <input
              type="number"
              min={0}
              value={form.investment_amount_usd}
              onChange={(e) => setForm({ ...form, investment_amount_usd: e.target.value })}
              className="w-full px-4 py-3 rounded-lg neu-pressed bg-transparent text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="10,000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1.5">
              {lang === "fa" ? "پیام (اختیاری)" : "Message (optional)"}
            </label>
            <textarea
              maxLength={1000}
              rows={3}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full px-4 py-3 rounded-lg neu-pressed bg-transparent text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
            />
          </div>

          {status === "success" && (
            <div className="flex items-center gap-2 text-sm" style={{ color: "hsl(var(--color-success))" }}>
              <CheckCircle className="w-4 h-4" />
              {lang === "fa" ? "با موفقیت ثبت شد! به زودی با شما تماس می‌گیریم." : "Successfully registered! We'll be in touch soon."}
            </div>
          )}
          {status === "error" && (
            <div className="flex items-center gap-2 text-destructive text-sm">
              <AlertCircle className="w-4 h-4" />
              {errorMsg}
            </div>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-gradient-primary text-primary-foreground font-medium shadow-neu-elevated hover:shadow-neu-prominent hover:-translate-y-0.5 active:shadow-neu-pressed active:translate-y-0 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
            {status === "loading"
              ? (lang === "fa" ? "در حال ارسال..." : "Submitting...")
              : (lang === "fa" ? "ثبت علاقه‌مندی" : "Register Interest")}
          </button>

          <p className="text-xs text-muted-foreground text-center mt-4">
            {lang === "fa"
              ? "این فرم صرفاً برای ثبت علاقه‌مندی است و تعهد مالی ایجاد نمی‌کند."
              : "This form is for interest registration only and does not create a financial commitment."}
          </p>
        </motion.form>
      </div>
    </section>
  );
}
