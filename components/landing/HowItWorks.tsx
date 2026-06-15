import { SectionHeader } from "./SectionHeader";

const steps = [
  {
    step: "01",
    title: "Connect",
    body: "Use a BNB Chain compatible wallet and prepare BEP-20 USDT for the presale.",
  },
  {
    step: "02",
    title: "Buy MDAO",
    body: "Join the active phase through the presale page with transparent pricing and contract data.",
  },
  {
    step: "03",
    title: "Hold",
    body: "Track allocation, vesting, and ecosystem updates as the token expands toward governance utility.",
  },
  {
    step: "04",
    title: "Govern",
    body: "Participate in future DAO proposals and help shape the direction of the MLEE DAO ecosystem.",
  },
];

export function HowItWorks() {
  return (
    <section className="border-y-2 border-[#1E1E1E] bg-[#0F0F0F] px-5 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-[1200px]">
        <SectionHeader
          eyebrow="FLOW // PARTICIPATION"
          title="From token access to community governance."
          description="The landing flow mirrors the project path: verified contracts, presale access, long-term holding, and decentralized decisions."
        />

        <div className="mt-12 grid gap-0 border-2 border-[#2D2D2D] md:grid-cols-4">
          {steps.map((item, index) => (
            <article
              key={item.step}
              data-reveal="up"
              data-reveal-delay={String(index * 90)}
              className={`bg-[#0A0A0A] p-6 ${
                index > 0 ? "border-t-2 border-[#2D2D2D] md:border-l-2 md:border-t-0" : ""
              }`}
            >
              <div className="font-ibm-mono text-[11px] font-bold tracking-[2px] text-[#FFD600]">
                {item.step}
              </div>
              <h3 className="mt-8 font-grotesk text-[30px] font-bold text-[#F5F5F0]">
                {item.title}
              </h3>
              <p className="mt-4 font-ibm-mono text-[12px] leading-6 text-[#777777]">
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
