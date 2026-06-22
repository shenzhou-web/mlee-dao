"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#0A0A0A] px-5 pt-[104px] md:px-10 md:pt-[120px]">
      <div className="landing-grid-motion absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:64px_64px]" />
      <div className="absolute inset-x-0 top-[64px] h-px bg-[#FFD600]/50" />

      <div className="relative mx-auto grid max-w-[1440px] gap-10 pb-16 md:grid-cols-[1.05fr_0.95fr] md:items-end md:pb-20">
        <div className="flex flex-col">
          <div data-reveal="down" className="inline-flex w-fit items-center gap-2 border-2 border-[#FFD600] bg-[#1A1A1A] px-3 py-2">
            <span className="landing-pulse-dot h-2 w-2 bg-[#FFD600]" />
            <span className="font-ibm-mono text-[10px] font-bold tracking-[2px] text-[#FFD600]">
              VERIFIED ON BNB SMART CHAIN
            </span>
          </div>

          <div data-reveal="left" data-reveal-delay="80" className="mt-8 flex items-center gap-4">
            <Image
              src="/mdao-logo.png"
              alt="MLEE DAO logo"
              width={88}
              height={88}
              className="landing-float-soft h-16 w-16 object-contain md:h-[88px] md:w-[88px]"
              priority
            />
            <div className="h-16 w-px bg-[#2D2D2D]" />
            <div className="font-ibm-mono text-[11px] leading-6 tracking-[2px] text-[#666666]">
              BEP-20
              <br />
              GOVERNANCE TOKEN
            </div>
          </div>

          <h1 data-reveal="up" data-reveal-delay="130" className="mt-8 max-w-[900px] font-grotesk text-[clamp(48px,10vw,118px)] font-bold leading-none tracking-normal text-[#F5F5F0]">
            MLEE DAO
            <span className="block text-[#FFD600]">COMMUNITY OWNED.</span>
          </h1>

          <p data-reveal="up" data-reveal-delay="200" className="mt-6 max-w-[760px] font-ibm-mono text-[13px] leading-[1.8] tracking-normal text-[#888888] md:text-[15px]">
            A decentralized autonomous organization token on BNB Chain focused on long-term
            ecosystem development, transparent governance, and auditable community ownership.
          </p>

          <div data-reveal="up" data-reveal-delay="270" className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/presale"
              className="inline-flex h-14 items-center justify-center gap-3 bg-[#FFD600] px-7 font-grotesk text-[12px] font-bold tracking-[2px] text-[#0A0A0A] transition-colors hover:bg-[#F5F5F0]"
            >
              CLAIM PRESALE MDAO
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/partnership"
              className="inline-flex h-14 items-center justify-center gap-3 border-2 border-[#2D2D2D] px-7 font-ibm-mono text-[12px] tracking-[2px] text-[#888888] transition-colors hover:border-[#FFD600] hover:text-[#F5F5F0]"
            >
              PARTNERSHIP PROGRAM
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div data-reveal="up" data-reveal-delay="340" className="mt-8 grid max-w-[760px] grid-cols-1 border-2 border-[#2D2D2D] sm:grid-cols-3">
            {[
              ["18B", "TOTAL SUPPLY"],
              ["BEP-20", "TOKEN STANDARD"],
              ["BSC", "BNB SMART CHAIN"],
            ].map(([value, label], index) => (
              <div
                key={label}
                className={`p-5 ${index > 0 ? "border-t-2 border-[#2D2D2D] sm:border-l-2 sm:border-t-0" : ""}`}
              >
                <div className="font-grotesk text-[32px] font-bold leading-none text-[#FFD600]">
                  {value}
                </div>
                <div className="mt-2 font-ibm-mono text-[10px] tracking-[2px] text-[#666666]">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div data-reveal="right" data-reveal-delay="240" className="relative overflow-hidden border-2 border-[#2D2D2D] bg-[#0F0F0F]">
          <div className="landing-scanline pointer-events-none absolute left-0 right-0 top-0 h-8 bg-[#FFD600]/5" />
          <div className="flex h-10 items-center justify-between border-b-2 border-[#2D2D2D] bg-[#141414] px-4">
            <span className="font-ibm-mono text-[10px] font-bold tracking-[2px] text-[#FFD600]">
              MDAO ACCESS
            </span>
            <span className="font-ibm-mono text-[10px] tracking-[1.5px] text-[#555555]">
              CLAIM + PARTNER
            </span>
          </div>

          <div className="p-5 md:p-7">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#2D2D2D] pb-6">
              <div>
                <div className="flex items-center gap-2">
                  <span className="landing-pulse-dot h-2.5 w-2.5 bg-[#4ADE80]" />
                  <span className="font-ibm-mono text-[11px] font-bold tracking-[2px] text-[#4ADE80]">
                    PRESALE CLAIM OPEN
                  </span>
                </div>
                <div className="mt-2 max-w-[460px] font-ibm-mono text-[11px] leading-5 text-[#666666]">
                  Claim your presale MDAO from the dashboard, or explore the partnership program for onboarding details.
                </div>
              </div>
              <CheckCircle2 className="h-8 w-8 text-[#FFD600]" />
            </div>

            <div className="grid grid-cols-1 border-b border-[#2D2D2D] sm:grid-cols-2">
              {[
                ["CLAIM", "PRESALE MDAO", "Open the dashboard to connect your wallet and claim available MDAO."],
                ["PARTNER", "PARTNERSHIP OPTION", "Go to the partnership page to review the program and onboarding flow."],
              ].map(([eyebrow, title, body], index) => (
                <div
                  key={title}
                  className={`py-6 ${index > 0 ? "border-t border-[#2D2D2D] sm:border-l sm:border-t-0 sm:pl-5" : "sm:pr-5"}`}
                >
                  <div className="font-ibm-mono text-[10px] tracking-[2px] text-[#555555]">
                    {eyebrow}
                  </div>
                  <div className="mt-3 font-grotesk text-[clamp(30px,6vw,42px)] font-bold leading-none text-[#FFD600]">
                    {title}
                  </div>
                  <p className="mt-3 font-ibm-mono text-[11px] leading-5 tracking-normal text-[#666666]">
                    {body}
                  </p>
                </div>
              ))}
            </div>

            <div className="grid gap-3 pt-6 sm:grid-cols-2">
              <Link
                href="/presale"
                className="inline-flex h-12 items-center justify-center bg-[#FFD600] font-grotesk text-[12px] font-bold tracking-[2px] text-[#0A0A0A]"
              >
                CLAIM PRESALE MDAO
              </Link>
              <Link
                href="/partnership"
                className="inline-flex h-12 items-center justify-center border-2 border-[#2D2D2D] font-ibm-mono text-[11px] tracking-[2px] text-[#F5F5F0] transition-colors hover:border-[#FFD600]"
              >
                PARTNERSHIP OPTION
              </Link>
            </div>

            <p className="mt-5 font-ibm-mono text-[10px] leading-5 tracking-[1px] text-[#555555]">
              Presale claim dashboard // Partnership page available // BNB Smart Chain
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
