"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import { usePresaleData } from "@/hooks/usePresaleData";
import { CONTRACTS } from "@/lib/contracts";

function getTimingLabel({
  hasEnded,
  hasStarted,
  daysLeft,
}: {
  hasEnded: boolean;
  hasStarted: boolean;
  daysLeft: number;
}) {
  if (hasEnded) return "Presale ended";
  if (hasStarted) return `Presale ends in ${daysLeft} days`;
  return `Phase 1 starts in ${daysLeft} days`;
}

export function Hero() {
  const [now, setNow] = useState(0);
  const { priceDisplay, progress, presaleEndTimestamp, phase1Start, phase, isLoading } =
    usePresaleData();

  useEffect(() => {
    const timer = window.setInterval(() => {
      setNow(Date.now() / 1000);
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const hasStarted = phase1Start > 0 && now >= phase1Start;
  const hasEnded = presaleEndTimestamp > 0 && now >= presaleEndTimestamp;
  const targetTime = hasStarted ? presaleEndTimestamp : phase1Start;
  const daysLeft = targetTime > 0 ? Math.max(0, Math.ceil((targetTime - now) / 86400)) : 0;
  const phaseBadge = hasEnded
    ? "PRESALE ENDED"
    : hasStarted
      ? `PHASE ${phase || 1} LIVE`
      : "PHASE 1 QUEUED";
  const timingLabel = getTimingLabel({ hasEnded, hasStarted, daysLeft });
  const safeProgress = Number.isFinite(progress) ? Math.max(progress, 0.5) : 0.5;

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
              JOIN PRESALE
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={`https://bscscan.com/address/${CONTRACTS.PRESALE}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-14 items-center justify-center gap-3 border-2 border-[#2D2D2D] px-7 font-ibm-mono text-[12px] tracking-[2px] text-[#888888] transition-colors hover:border-[#FFD600] hover:text-[#F5F5F0]"
            >
              PRESALE CONTRACT
              <ExternalLink className="h-4 w-4" />
            </a>
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
              PRESALE STATUS
            </span>
            <span className="font-ibm-mono text-[10px] tracking-[1.5px] text-[#555555]">
              LIVE DATA
            </span>
          </div>

          <div className="p-5 md:p-7">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#2D2D2D] pb-6">
              <div>
                <div className="flex items-center gap-2">
                  <span className="landing-pulse-dot h-2.5 w-2.5 bg-[#4ADE80]" />
                  <span className="font-ibm-mono text-[11px] font-bold tracking-[2px] text-[#4ADE80]">
                    {phaseBadge}
                  </span>
                </div>
                <div className="mt-2 font-ibm-mono text-[11px] text-[#666666]">
                  {isLoading ? "Syncing chain data" : timingLabel}
                </div>
              </div>
              <CheckCircle2 className="h-8 w-8 text-[#FFD600]" />
            </div>

            <div className="grid grid-cols-2 border-b border-[#2D2D2D]">
              <div className="border-r border-[#2D2D2D] py-6 pr-4">
                <div className="font-ibm-mono text-[10px] tracking-[2px] text-[#555555]">
                  CURRENT PRICE
                </div>
                <div className="mt-2 font-grotesk text-[42px] font-bold leading-none text-[#FFD600]">
                  {isLoading ? "--" : priceDisplay}
                </div>
              </div>
              <div className="py-6 pl-4">
                <div className="font-ibm-mono text-[10px] tracking-[2px] text-[#555555]">
                  PROGRESS
                </div>
                <div className="mt-2 font-grotesk text-[42px] font-bold leading-none text-[#F5F5F0]">
                  {isLoading ? "--" : `${progress.toFixed(2)}%`}
                </div>
              </div>
            </div>

            <div className="py-6">
              <div className="mb-3 flex justify-between font-ibm-mono text-[10px] tracking-[2px] text-[#666666]">
                <span>PRESALE FILL</span>
                <span>{isLoading ? "--" : `${progress.toFixed(2)}%`}</span>
              </div>
              <div className="h-3 border border-[#2D2D2D] bg-[#0A0A0A]">
                <div
                  className="landing-progress h-full bg-[#FFD600]"
                  style={{ width: `${Math.min(safeProgress, 100)}%` }}
                />
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <Link
                href="/presale"
                className="inline-flex h-12 items-center justify-center bg-[#FFD600] font-grotesk text-[12px] font-bold tracking-[2px] text-[#0A0A0A]"
              >
                BUY MDAO
              </Link>
              <Link
                href="/partnership"
                className="inline-flex h-12 items-center justify-center border-2 border-[#2D2D2D] font-ibm-mono text-[11px] tracking-[2px] text-[#F5F5F0] transition-colors hover:border-[#FFD600]"
              >
                PARTNER
              </Link>
            </div>

            <p className="mt-5 font-ibm-mono text-[10px] leading-5 tracking-[1px] text-[#555555]">
              BEP-20 USDT only // No KYC required // Transparent presale contract
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
