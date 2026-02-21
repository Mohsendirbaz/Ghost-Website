import { useState, useRef, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import { Calculator, TrendingUp, TrendingDown, Minus, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function InvestSimulator() {
  const { lang } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [investedAmount, setInvestedAmount] = useState(10000);
  const [max365, setMax365] = useState(40);
  const [currentPrice, setCurrentPrice] = useState(90);
  const [units, setUnits] = useState(100);

  const result = useMemo(() => {
    const redemptionPrice = Math.min(currentPrice, max365);
    const totalCost = redemptionPrice * units;
    const marketValue = currentPrice * units;
    const growthBenefit = marketValue - totalCost;
    // At maturity, investor gets max(redeemed value, protected amount)
    const protectedAmount = investedAmount;
    const maturityFloor = Math.max(marketValue, protectedAmount);
    return { redemptionPrice, totalCost, marketValue, growthBenefit, protectedAmount, maturityFloor };
  }, [max365, currentPrice, units, investedAmount]);

  const isAboveCap = currentPrice > max365;

  return (
    <section className="py-24 relative" ref={ref}>
      <div className="absolute inset-0" style={{ background: "var(--neu-gradient-raised)" }} />
      <div className="absolute inset-0 hero-grid opacity-10" />

      <div className="container-ghost relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full neu-raised mb-4">
            <Calculator className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">
              {lang === "fa" ? "شبیه‌ساز Empower10" : "Empower10 Simulator"}
            </span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            {lang === "fa" ? "سناریوی خود را محاسبه کنید" : "Model Your Scenario"}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto neu-elevated p-8 rounded-xl"
        >
          {/* Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                {lang === "fa" ? "مبلغ سرمایه‌گذاری ($)" : "Invested Amount ($)"}
              </label>
              <input
                type="number"
                min={100}
                value={investedAmount}
                onChange={(e) => setInvestedAmount(Math.max(100, Number(e.target.value)))}
                className="w-full px-3 py-2.5 rounded-lg neu-pressed bg-transparent text-foreground font-display text-lg focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                {lang === "fa" ? "سقف Max365 ($)" : "Max365 Cap ($)"}
              </label>
              <input
                type="number"
                min={1}
                value={max365}
                onChange={(e) => setMax365(Math.max(1, Number(e.target.value)))}
                className="w-full px-3 py-2.5 rounded-lg neu-pressed bg-transparent text-foreground font-display text-lg focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                {lang === "fa" ? "قیمت فعلی ($)" : "Current Price ($)"}
              </label>
              <input
                type="number"
                min={0.01}
                step={0.01}
                value={currentPrice}
                onChange={(e) => setCurrentPrice(Math.max(0.01, Number(e.target.value)))}
                className="w-full px-3 py-2.5 rounded-lg neu-pressed bg-transparent text-foreground font-display text-lg focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                {lang === "fa" ? "تعداد حقوق" : "Number of Rights"}
              </label>
              <input
                type="number"
                min={1}
                value={units}
                onChange={(e) => setUnits(Math.max(1, Number(e.target.value)))}
                className="w-full px-3 py-2.5 rounded-lg neu-pressed bg-transparent text-foreground font-display text-lg focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>

          {/* Price slider */}
          <div className="mb-8">
            <div className="flex justify-between text-xs text-muted-foreground mb-2">
              <span>$1</span>
              <span>{lang === "fa" ? "قیمت بازار" : "Market Price"}: ${currentPrice}</span>
              <span>$200</span>
            </div>
            <input
              type="range"
              min={1}
              max={200}
              value={currentPrice}
              onChange={(e) => setCurrentPrice(Number(e.target.value))}
              className="w-full accent-primary h-2 rounded-full"
            />
            <div className="relative h-4 mt-1">
              <div
                className="absolute text-xs text-primary font-mono"
                style={{ left: `${(max365 / 200) * 100}%`, transform: "translateX(-50%)" }}
              >
                ▲ Max365
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
            <div className="neu-raised p-4 text-center">
              <p className="text-xs text-muted-foreground mb-1">
                {lang === "fa" ? "قیمت بازخرید" : "Redemption Price"}
              </p>
              <p className="font-display text-xl font-bold text-foreground">${result.redemptionPrice}</p>
            </div>
            <div className="neu-raised p-4 text-center">
              <p className="text-xs text-muted-foreground mb-1">
                {lang === "fa" ? "ارزش بازار" : "Market Value"}
              </p>
              <p className="font-display text-xl font-bold text-foreground">${result.marketValue.toLocaleString()}</p>
            </div>
            <div className={`neu-raised p-4 text-center ${isAboveCap ? "ring-2 ring-primary/40" : ""}`}>
              <p className="text-xs text-muted-foreground mb-1">
                {lang === "fa" ? "مزیت رشد" : "Growth Benefit"}
              </p>
              <div className="flex items-center justify-center gap-1">
                {result.growthBenefit > 0 ? (
                  <TrendingUp className="w-4 h-4" style={{ color: "hsl(var(--color-success))" }} />
                ) : result.growthBenefit < 0 ? (
                  <TrendingDown className="w-4 h-4 text-destructive" />
                ) : (
                  <Minus className="w-4 h-4 text-muted-foreground" />
                )}
                <p className={`font-display text-xl font-bold ${
                  result.growthBenefit > 0 ? "" : result.growthBenefit < 0 ? "text-destructive" : "text-foreground"
                }`} style={result.growthBenefit > 0 ? { color: "hsl(var(--color-success))" } : undefined}>
                  ${Math.abs(result.growthBenefit).toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* Protection floor */}
          <div className="neu-raised p-4 flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-primary shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground">
                {lang === "fa" ? "کف سررسید (سال ۱۰)" : "Maturity Floor (Year 10)"}
              </p>
              <p className="font-display text-lg font-bold text-foreground">
                ${result.maturityFloor.toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground">
                {lang === "fa"
                  ? `بیشتر بین ارزش بازخرید و مبلغ محافظت‌شده ($${result.protectedAmount.toLocaleString()})`
                  : `Greater of redeemed value or Protected Amount ($${result.protectedAmount.toLocaleString()})`}
              </p>
            </div>
          </div>

          {/* Explanation */}
          <div className="mt-4 p-4 rounded-lg bg-background/50 border border-border-subtle">
            <p className="text-sm text-muted-foreground">
              {isAboveCap ? (
                lang === "fa"
                  ? `✅ سهم با $${currentPrice} معامله می‌شود اما شما $${max365} می‌پردازید. در سررسید، حداقل $${result.protectedAmount.toLocaleString()} تضمین شده.`
                  : `✅ Stock trades at $${currentPrice} but you pay $${max365}. At maturity, minimum $${result.protectedAmount.toLocaleString()} protected.`
              ) : (
                lang === "fa"
                  ? `ℹ️ سهم زیر Max365 است. اما بخش حفاظت تضمین می‌کند حداقل $${result.protectedAmount.toLocaleString()} در سررسید دریافت کنید.`
                  : `ℹ️ Stock below Max365 — no cap benefit. But the Protection Sleeve ensures at least $${result.protectedAmount.toLocaleString()} at maturity.`
              )}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
