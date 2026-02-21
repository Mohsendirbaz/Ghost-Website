import { InvestHero } from "../components/invest/InvestHero";
import { HowItWorks } from "../components/invest/HowItWorks";
import { WhyInvest } from "../components/invest/WhyInvest";
import { ImpactEngine } from "../components/invest/ImpactEngine";
import { InvestSimulator } from "../components/invest/InvestSimulator";
import { WorkedExample } from "../components/invest/WorkedExample";
import { RiskDisclosure } from "../components/invest/RiskDisclosure";
import { WaitlistForm } from "../components/invest/WaitlistForm";

const Invest = () => (
  <>
    <InvestHero />
    <HowItWorks />
    <WhyInvest />
    <ImpactEngine />
    <InvestSimulator />
    <WorkedExample />
    <RiskDisclosure />
    <WaitlistForm />
  </>
);

export default Invest;
