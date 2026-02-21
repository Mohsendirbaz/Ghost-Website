import { useLang } from '../context/LanguageContext';
import { copy } from '../data/copy';
import Breadcrumb from '../components/Breadcrumb';
import { InvestHero } from "../components/invest/InvestHero";
import { HowItWorks } from "../components/invest/HowItWorks";
import { WhyInvest } from "../components/invest/WhyInvest";
import { ImpactEngine } from "../components/invest/ImpactEngine";
import { InvestSimulator } from "../components/invest/InvestSimulator";
import { WorkedExample } from "../components/invest/WorkedExample";
import { RiskDisclosure } from "../components/invest/RiskDisclosure";
import { WaitlistForm } from "../components/invest/WaitlistForm";

const Invest = () => {
  const { lang } = useLang();

  return (
    <main id="main-content">
      <Breadcrumb crumbs={[
        { label: copy[lang].breadcrumb.home, to: `/${lang}` },
        { label: lang === 'en' ? 'Invest' : 'سرمایه‌گذاری' },
      ]} />
      <InvestHero />
      <HowItWorks />
      <WhyInvest />
      <ImpactEngine />
      <InvestSimulator />
      <WorkedExample />
      <RiskDisclosure />
      <WaitlistForm />
    </main>
  );
};

export default Invest;
