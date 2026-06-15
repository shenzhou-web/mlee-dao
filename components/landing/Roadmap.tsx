import { SectionHeader } from "./SectionHeader";

const roadmap = [
  {
    phase: "PHASE 1",
    title: "Token Launch",
    description: "Smart contract deployment and verification on BscScan.",
    status: "COMPLETE",
  },
  {
    phase: "PHASE 2",
    title: "Liquidity Establishment",
    description: "Initial liquidity provisioning and exchange integration.",
    status: "IN PROGRESS",
  },
  {
    phase: "PHASE 3",
    title: "Governance Framework",
    description: "Implementation of on-chain voting mechanisms.",
    status: "UPCOMING",
  },
  {
    phase: "PHASE 4",
    title: "Ecosystem Expansion",
    description: "Strategic partnerships and DeFi protocol integrations.",
    status: "UPCOMING",
  },
];

export function Roadmap() {
  return (
    <section id="roadmap" className="bg-[#0A0A0A] px-5 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-[1100px]">
        <SectionHeader
          eyebrow="ROADMAP // DEVELOPMENT"
          title="Milestones from launch to ecosystem expansion."
          description="Project milestones and planned features for liquidity, governance, and long-term integrations."
          align="center"
        />

        <div className="mt-12 border-2 border-[#2D2D2D]">
          {roadmap.map((item, index) => (
            <article
              key={item.phase}
              data-reveal="up"
              data-reveal-delay={String(index * 90)}
              className={`grid gap-5 bg-[#0F0F0F] p-6 md:grid-cols-[140px_1fr_150px] md:items-center ${
                index > 0 ? "border-t-2 border-[#2D2D2D]" : ""
              }`}
            >
              <div className="font-ibm-mono text-[11px] font-bold tracking-[2px] text-[#FFD600]">
                {item.phase}
              </div>
              <div>
                <h3 className="font-grotesk text-[30px] font-bold text-[#F5F5F0]">
                  {item.title}
                </h3>
                <p className="mt-2 font-ibm-mono text-[12px] leading-6 text-[#777777]">
                  {item.description}
                </p>
              </div>
              <div
                className={`w-fit border-2 px-3 py-2 font-ibm-mono text-[10px] font-bold tracking-[1.5px] md:justify-self-end ${
                  item.status === "COMPLETE"
                    ? "border-[#FFD600] bg-[#FFD600] text-[#0A0A0A]"
                    : "border-[#2D2D2D] text-[#888888]"
                }`}
              >
                {item.status}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
