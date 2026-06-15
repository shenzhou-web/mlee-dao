"use client";

import { Check, Copy, ExternalLink } from "lucide-react";
import { useState } from "react";
import { TOKEN_CONTRACT_ADDRESS } from "./constants";

export function ContractProof() {
  const [copied, setCopied] = useState(false);

  async function copyAddress() {
    await navigator.clipboard.writeText(TOKEN_CONTRACT_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <section className="bg-[#0A0A0A] px-5 py-14 md:px-10 md:py-20">
      <div data-reveal="up" className="mx-auto max-w-[1120px] border-2 border-[#FFD600] bg-[#101010]">
        <div className="grid gap-0 md:grid-cols-[280px_1fr]">
          <div data-reveal="left" data-reveal-delay="120" className="border-b-2 border-[#FFD600] bg-[#FFD600] p-6 text-[#0A0A0A] md:border-b-0 md:border-r-2 md:border-[#FFD600]">
            <Check className="h-8 w-8" />
            <h2 className="mt-5 font-grotesk text-[32px] font-bold leading-none tracking-normal">
              CONTRACT VERIFIED
            </h2>
            <p className="mt-4 font-ibm-mono text-[11px] leading-5 tracking-normal">
              Open-source token contract. Publicly auditable on BscScan.
            </p>
          </div>

          <div data-reveal="right" data-reveal-delay="180" className="p-5 md:p-7">
            <label className="font-ibm-mono text-[10px] font-bold tracking-[2px] text-[#666666]">
              TOKEN CONTRACT ADDRESS
            </label>
            <div className="mt-3 flex items-center gap-3 border-2 border-[#2D2D2D] bg-[#0A0A0A] p-4">
              <code className="min-w-0 flex-1 break-all font-ibm-mono text-[12px] text-[#FFD600] md:text-[13px]">
                {TOKEN_CONTRACT_ADDRESS}
              </code>
              <button
                onClick={copyAddress}
                className="grid h-10 w-10 shrink-0 place-items-center border-2 border-[#2D2D2D] text-[#F5F5F0] transition-colors hover:border-[#FFD600]"
                aria-label="Copy token contract address"
              >
                {copied ? <Check className="h-4 w-4 text-[#FFD600]" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <a
                href={`https://bscscan.com/token/${TOKEN_CONTRACT_ADDRESS}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-12 items-center justify-between border-2 border-[#2D2D2D] px-4 font-ibm-mono text-[11px] tracking-[1.5px] text-[#F5F5F0] transition-colors hover:border-[#FFD600]"
              >
                VIEW ON BSCSCAN
                <ExternalLink className="h-4 w-4" />
              </a>
              <a
                href={`https://bscscan.com/address/${TOKEN_CONTRACT_ADDRESS}#code`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-12 items-center justify-between border-2 border-[#2D2D2D] px-4 font-ibm-mono text-[11px] tracking-[1.5px] text-[#F5F5F0] transition-colors hover:border-[#FFD600]"
              >
                VIEW CONTRACT CODE
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
