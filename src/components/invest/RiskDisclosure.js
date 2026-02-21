import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { AlertTriangle, ExternalLink } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const risks = {
  en: [
    { title: "Not Risk-Free", desc: "Protection depends on the structure (collateral/guarantor) and is intended for hold-to-maturity investors. Principal protection may not apply for early exits." },
    { title: "Liquidity Risk", desc: "Long-horizon product. Secondary market may not exist; early exit may realize a loss. Rights may be non-transferable." },
    { title: "Complex Product", desc: "Features like buffers, caps, and dual-sleeve structures require careful review. Heightened supervision is standard for complex products (FINRA)." },
    { title: "Issuer/Settlement Risk", desc: "The issuing entity must be able to deliver on the Protection Sleeve. Segregated collateral mitigates but does not eliminate this risk." },
    { title: "Volatility & Max365 Risk", desc: "Max365 may lock at a high level during hype periods. Public stocks can be volatile over a 10-year horizon." },
    { title: "Custodial Rules (UTMA/UGMA)", desc: "Control transfers to the minor at age of majority. Systems must handle authority changes. Transfers are typically irrevocable (FINRA)." },
    { title: "Tax Consequences", desc: "Redemption and subsequent sale may have tax implications. Custodial accounts have specific reporting requirements. Consult your tax advisor." },
    { title: "Regulatory Restrictions", desc: "Availability depends on offering structure, investor eligibility, jurisdiction, and platform rules." },
  ],
  fa: [
    { title: "بدون ریسک نیست", desc: "حفاظت به ساختار (وثیقه/ضامن) بستگی دارد و برای سرمایه‌گذاران نگه‌دارنده تا سررسید طراحی شده. حفاظت اصل سرمایه ممکن است برای خروج زودهنگام اعمال نشود." },
    { title: "ریسک نقدشوندگی", desc: "محصول بلندمدت. بازار ثانویه ممکن است وجود نداشته باشد؛ خروج زودهنگام ممکن است منجر به ضرر شود." },
    { title: "محصول پیچیده", desc: "ویژگی‌هایی مانند بافرها، سقف‌ها و ساختارهای دوبخشی نیاز به بررسی دقیق دارند." },
    { title: "ریسک صادرکننده/تسویه", desc: "نهاد صادرکننده باید توانایی تحویل بخش حفاظت را داشته باشد. وثیقه جداشده این ریسک را کاهش می‌دهد اما حذف نمی‌کند." },
    { title: "نوسان و ریسک Max365", desc: "Max365 ممکن است در دوره‌های هیجانی در سطح بالایی قفل شود. سهام عمومی در بازه ۱۰ ساله می‌تواند نوسانی باشد." },
    { title: "قوانین قیمومیت (UTMA/UGMA)", desc: "کنترل در سن قانونی به فرد منتقل می‌شود. انتقال‌ها معمولاً غیرقابل برگشت هستند." },
    { title: "عواقب مالیاتی", desc: "بازخرید و فروش بعدی ممکن است پیامدهای مالیاتی داشته باشد. با مشاور مالیاتی خود مشورت کنید." },
    { title: "محدودیت‌های قانونی", desc: "در دسترس بودن به ساختار عرضه، واجد شرایط بودن سرمایه‌گذار و حوزه قضایی بستگی دارد." },
  ],
};

export function RiskDisclosure() {
  const { lang } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const items = risks[lang];

  return (
    <section className="py-24" ref={ref}>
      <div className="container-ghost">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full neu-raised mb-4">
            <AlertTriangle className="w-4 h-4 text-destructive" />
            <span className="text-sm font-medium text-muted-foreground">
              {lang === "fa" ? "افشای ریسک" : "Key Risks & Disclosures"}
            </span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            {lang === "fa" ? "ریسک‌ها — باید بخوانید" : "Key Risks — Must Read"}
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto grid gap-3">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="neu-raised p-5 flex gap-4"
            >
              <AlertTriangle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
              <div>
                <h3 className="font-display font-semibold text-foreground mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8 p-5 rounded-lg neu-raised max-w-3xl mx-auto"
        >
          <p className="text-xs text-muted-foreground text-center">
            {lang === "fa"
              ? "این سند صرفاً برای اطلاع‌رسانی است و پیشنهاد فروش یا درخواست خرید اوراق بهادار نیست. هرگونه عرضه فقط از طریق اسناد رسمی عرضه و قراردادهای حاکم انجام خواهد شد. «بدون ضرر» به معنای بدون ضرر بر مبلغ محافظت‌شده در سررسید است، مشروط بر نگه‌داشتن تا سررسید و عملکرد ساختار/صادرکننده."
              : "Informational only. Not an offer to sell or solicitation to buy securities. Any offering would be made only through definitive legal documents. \"Zero loss\" means zero loss on the Protected Amount at maturity, if held to term, subject to terms and issuer/structure performance."}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
