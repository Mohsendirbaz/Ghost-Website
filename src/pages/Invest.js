import { useLang } from '../context/LanguageContext';
import { copy } from '../data/copy';
import Breadcrumb from '../components/Breadcrumb';
import { InvestHero } from "../components/invest/InvestHero";
import { HowItWorks } from "../components/invest/HowItWorks";
import { WhyInvest } from "../components/invest/WhyInvest";
import { InvestSimulator } from "../components/invest/InvestSimulator";
import { RiskDisclosure } from "../components/invest/RiskDisclosure";
import { WaitlistForm } from "../components/invest/WaitlistForm";

const Invest = () => {
  const { lang } = useLang();

  return (
    <main id="main-content" className="invest-page">
      <Breadcrumb crumbs={[
        { label: copy[lang].breadcrumb.home, to: `/${lang}` },
        { label: lang === 'en' ? 'Invest' : 'سرمایه‌گذاری' },
      ]} />

      {/* Hero with compact key metrics */}
      <InvestHero />

      {/* Two-column explainer */}
      <section className="py-16 bg-background">
        <div className="container-ghost">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left: How It Works */}
            <div>
              <HowItWorks />
            </div>

            {/* Right: Why Invest */}
            <div className="lg:sticky lg:top-24">
              <WhyInvest />
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Simulator - Full Width, Prominent */}
      <InvestSimulator />

      {/* Risk Disclosure */}
      <RiskDisclosure />

      {/* Waitlist Form */}
      <WaitlistForm />
    </main>
  );
};

export default Invest;
