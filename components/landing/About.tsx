import { ArrowUpRight, ShieldCheck, Target } from "lucide-react";
import { SectionHeader } from "./SectionHeader";

const storyLinks = [
  { label: "INSIGHTS", href: "https://i.ifeng.com/c/8ScA1zZXCof" },
  { label: "NEWS", href: "https://www.52hrtt.com/db/n/w/info/A1730854872391" },
];

export function About() {
  return (
    <section id="about" className="bg-[#0A0A0A] px-5 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-[1200px]">
        <SectionHeader
          eyebrow="ABOUT // MLEE DAO"
          title="Transparent governance infrastructure for long-term builders."
          description="MLEE DAO provides a tokenized framework for decentralized decision-making on BNB Smart Chain, with public contracts and a community-first ownership model."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div data-reveal="left" data-reveal-delay="120" className="border-2 border-[#2D2D2D] bg-[#0F0F0F] p-6">
            <div className="flex items-center gap-4">
              <div className="grid h-16 w-16 place-items-center border-2 border-[#FFD600] font-grotesk text-[24px] font-bold text-[#FFD600]">
                MD
              </div>
              <div>
                <h3 className="font-grotesk text-[28px] font-bold text-[#F5F5F0]">
                  Maike Lee
                </h3>
                <p className="font-ibm-mono text-[11px] tracking-[2px] text-[#FFD600]">
                  FOUNDER & LEAD DEVELOPER
                </p>
              </div>
            </div>
            <p className="mt-6 font-ibm-mono text-[12px] leading-6 text-[#888888]">
              Blockchain enthusiast building transparent, community-driven solutions on BNB
              Chain. Committed to decentralized governance systems that empower token holders.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {storyLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 border-2 border-[#2D2D2D] px-4 py-3 font-ibm-mono text-[10px] tracking-[1.5px] text-[#F5F5F0] transition-colors hover:border-[#FFD600]"
                >
                  {link.label}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <article data-reveal="up" data-reveal-delay="180" className="border-2 border-[#2D2D2D] bg-[#0F0F0F] p-6 transition-colors hover:border-[#FFD600]">
              <Target className="h-8 w-8 text-[#FFD600]" />
              <h3 className="mt-6 font-grotesk text-[28px] font-bold text-[#F5F5F0]">
                Our Purpose
              </h3>
              <p className="mt-4 font-ibm-mono text-[12px] leading-6 text-[#888888]">
                MLEE DAO enables token holders to participate in decision-making while keeping
                development transparent, accountable, and community-driven.
              </p>
            </article>

            <article data-reveal="up" data-reveal-delay="260" className="border-2 border-[#2D2D2D] bg-[#0F0F0F] p-6 transition-colors hover:border-[#FFD600]">
              <ShieldCheck className="h-8 w-8 text-[#FFD600]" />
              <h3 className="mt-6 font-grotesk text-[28px] font-bold text-[#F5F5F0]">
                Transparency
              </h3>
              <p className="mt-4 font-ibm-mono text-[12px] leading-6 text-[#888888]">
                Built on BNB Smart Chain with verified contracts, public transaction history,
                open-source code, and clear documentation.
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
