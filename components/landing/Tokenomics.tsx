import { CheckCircle2, Coins, Database, Shield, TrendingUp } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { TOKEN_CONTRACT_ADDRESS } from "./constants";

const keyMetrics = [
  { icon: Coins, label: "TOTAL SUPPLY", value: "18B", detail: "Fixed MDAO token supply" },
  { icon: TrendingUp, label: "INITIAL CIRCULATION", value: "1.8B", detail: "10% of total supply" },
  { icon: Shield, label: "TAX STRUCTURE", value: "0%", detail: "No buy or sell taxes" },
  { icon: Database, label: "TOKEN STANDARD", value: "BEP-20", detail: "BNB Smart Chain" },
];

const allocationData = [
  { name: "Ecosystem Treasury", value: 40, tokens: "7,200,000,000" },
  { name: "Corporate Incentives", value: 20, tokens: "3,600,000,000" },
  { name: "Liquidity & Exchanges", value: 15, tokens: "2,700,000,000" },
  { name: "Team & Advisors", value: 10, tokens: "1,800,000,000" },
  { name: "Community & Marketing", value: 10, tokens: "1,800,000,000" },
  { name: "Strategic Reserves", value: 5, tokens: "900,000,000" },
];

const tokenInfo = [
  ["Token Name", "MLEE DAO"],
  ["Symbol", "MDAO"],
  ["Network", "BNB Smart Chain"],
  ["Decimals", "18"],
  ["Total Supply", "18,000,000,000"],
  ["Chain ID", "56"],
];

export function Tokenomics() {
  return (
    <section id="tokenomics" className="bg-[#0A0A0A] px-5 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <SectionHeader
            eyebrow="TOKENOMICS // MDAO"
            title="A fixed-supply model for governance and ecosystem growth."
            description="A sustainable allocation model designed for long-term development, incentives, liquidity, community growth, and strategic reserves."
          />
          <a
            href={`https://bscscan.com/token/${TOKEN_CONTRACT_ADDRESS}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-12 w-full items-center justify-center gap-3 bg-[#FFD600] px-5 font-grotesk text-[12px] font-bold tracking-[2px] text-[#0A0A0A] sm:w-fit lg:justify-self-end"
          >
            <CheckCircle2 className="h-4 w-4" />
            VERIFIED ON BSCSCAN
          </a>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {keyMetrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div
                key={metric.label}
                data-reveal="up"
                data-reveal-delay={String(index * 80)}
                className="border-2 border-[#2D2D2D] bg-[#0F0F0F] p-5 transition-colors hover:border-[#FFD600]"
              >
                <Icon className="h-7 w-7 text-[#FFD600]" />
                <div className="mt-6 font-grotesk text-[38px] font-bold leading-none text-[#F5F5F0]">
                  {metric.value}
                </div>
                <div className="mt-3 font-ibm-mono text-[10px] font-bold tracking-[2px] text-[#FFD600]">
                  {metric.label}
                </div>
                <p className="mt-2 font-ibm-mono text-[11px] leading-5 text-[#666666]">
                  {metric.detail}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div data-reveal="left" className="border-2 border-[#2D2D2D] bg-[#0F0F0F]">
            <div className="border-b-2 border-[#2D2D2D] p-5">
              <h3 className="font-grotesk text-[30px] font-bold text-[#F5F5F0]">
                Distribution Breakdown
              </h3>
            </div>
            <div className="divide-y-2 divide-[#1E1E1E]">
              {allocationData.map((item, index) => (
                <div
                  key={item.name}
                  data-reveal="up"
                  data-reveal-delay={String(index * 55)}
                  className="grid gap-4 p-5 md:grid-cols-[220px_1fr_80px] md:items-center"
                >
                  <div>
                    <div className="font-ibm-mono text-[11px] font-bold tracking-[1.5px] text-[#F5F5F0]">
                      {item.name}
                    </div>
                    <div className="mt-1 font-ibm-mono text-[10px] text-[#666666]">
                      {item.tokens} MDAO
                    </div>
                  </div>
                  <div className="h-3 border border-[#2D2D2D] bg-[#0A0A0A]">
                    <div className="landing-progress h-full bg-[#FFD600]" style={{ width: `${item.value}%` }} />
                  </div>
                  <div className="font-grotesk text-[28px] font-bold text-[#FFD600] md:text-right">
                    {item.value}%
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div data-reveal="right" data-reveal-delay="140" className="border-2 border-[#2D2D2D] bg-[#0F0F0F]">
            <div className="border-b-2 border-[#2D2D2D] p-5">
              <h3 className="font-grotesk text-[30px] font-bold text-[#F5F5F0]">
                Token File
              </h3>
            </div>
            <div className="divide-y-2 divide-[#1E1E1E]">
              {tokenInfo.map(([label, value]) => (
                <div key={label} className="grid grid-cols-[130px_1fr] gap-4 p-5">
                  <div className="font-ibm-mono text-[10px] tracking-[1.5px] text-[#666666]">
                    {label.toUpperCase()}
                  </div>
                  <div className="break-words font-ibm-mono text-[12px] text-[#F5F5F0]">
                    {value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
