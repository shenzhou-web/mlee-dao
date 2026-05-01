"use client";

import { useMemo, type ComponentType, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  BadgeCheck,
  Building2,
  CalendarDays,
  Clock3,
  Landmark,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  UserRound,
  Wallet,
} from "lucide-react";
import { formatUnits } from "viem";
import { useAccount, useReadContracts } from "wagmi";
import { MDAO_PARTNERSHIP_ABI } from "@/lib/abi";
import { CONTRACTS } from "@/lib/contracts";
import { ConnectWalletButton } from "@/components/presale/connect-wallet-button";
import { SiteFooter } from "@/components/layout/site-footer";
import {
  addMonths,
  formatCurrency,
  formatDateLabel,
  formatNumber,
  formatPrice,
  formatTokenAmount,
  getLockTierConfig,
} from "@/lib/partnership";
import { cn, shortenAddress } from "@/lib/utils";

type PartnershipRecord = readonly [bigint, bigint, bigint, bigint, bigint, number, bigint];
type VestedAmounts = readonly [bigint, bigint, bigint];
type StatsTuple = readonly [bigint, bigint, bigint, bigint, bigint, bigint];

const BIGINT_ZERO = BigInt(0);
const TOKEN_DECIMALS_FALLBACK = BigInt(18);
const BPS_SCALE = BigInt(10_000);

export default function DashboardPage() {
  const { address, isConnected } = useAccount();
  const { data, isLoading } = useReadContracts({
    contracts: address
      ? [
          { address: CONTRACTS.PARTNERSHIP, abi: MDAO_PARTNERSHIP_ABI, functionName: "companyRecords", args: [address] },
          { address: CONTRACTS.PARTNERSHIP, abi: MDAO_PARTNERSHIP_ABI, functionName: "individualRecords", args: [address] },
          { address: CONTRACTS.PARTNERSHIP, abi: MDAO_PARTNERSHIP_ABI, functionName: "vestedAmount", args: [address, 0] },
          { address: CONTRACTS.PARTNERSHIP, abi: MDAO_PARTNERSHIP_ABI, functionName: "vestedAmount", args: [address, 1] },
          { address: CONTRACTS.PARTNERSHIP, abi: MDAO_PARTNERSHIP_ABI, functionName: "getStats" },
          { address: CONTRACTS.PARTNERSHIP, abi: MDAO_PARTNERSHIP_ABI, functionName: "paymentTokenDecimals" },
        ]
      : [],
    allowFailure: true,
    query: { enabled: !!address, refetchInterval: 30_000 },
  });

  const company = data?.[0]?.result as PartnershipRecord | undefined;
  const individual = data?.[1]?.result as PartnershipRecord | undefined;
  const companyVested = data?.[2]?.result as VestedAmounts | undefined;
  const individualVested = data?.[3]?.result as VestedAmounts | undefined;
  const stats = data?.[4]?.result as StatsTuple | undefined;
  const paymentTokenDecimals = Number((data?.[5]?.result as bigint | undefined) ?? TOKEN_DECIMALS_FALLBACK);

  const activeType =
    company && company[0] > BIGINT_ZERO
      ? "company"
      : individual && individual[0] > BIGINT_ZERO
        ? "individual"
        : null;
  const active = activeType === "company" ? company : individual;
  const vested = activeType === "company" ? companyVested : individualVested;

  const metrics = useMemo(() => {
    if (!active) return null;

    const lockTier = getLockTierConfig(active[5]);
    const allocatedRaw = active[0];
    const paymentRaw = active[1];
    const lockEndTimestamp = Number(active[2]);
    const vestingDurationRaw = Number(active[3]);
    const onboardedAt = Number(active[6]);
    const vestedClaimableRaw = vested?.[0] ?? BIGINT_ZERO;
    const vestedTotalRaw = vested?.[1] ?? allocatedRaw;
    const vestedClaimedRaw = vested?.[2] ?? active[4];
    const remainingRaw = allocatedRaw - vestedClaimedRaw;
    const vestingDurationMonths =
      vestingDurationRaw > 120 ? lockTier.vestingMonths : vestingDurationRaw;
    const monthlyReleaseRaw =
      vestingDurationMonths > 0
        ? allocatedRaw / BigInt(vestingDurationMonths)
        : BIGINT_ZERO;
    const lockEndDate = lockEndTimestamp > 0 ? new Date(lockEndTimestamp * 1000) : null;
    const onboardedDate = onboardedAt > 0 ? new Date(onboardedAt * 1000) : null;
    const vestingEndDate =
      lockEndTimestamp > 0
        ? vestingDurationRaw > 120
          ? new Date((lockEndTimestamp + vestingDurationRaw) * 1000)
          : lockEndDate
            ? addMonths(lockEndDate, vestingDurationMonths)
            : null
        : null;
    const claimProgress =
      allocatedRaw > BIGINT_ZERO
        ? Number((vestedClaimedRaw * BPS_SCALE) / allocatedRaw) / 100
        : 0;
    const unlockedProgress =
      vestedTotalRaw > BIGINT_ZERO
        ? Number((vestedClaimedRaw * BPS_SCALE) / vestedTotalRaw) / 100
        : 0;

    return {
      allocatedRaw,
      paymentRaw,
      vestedClaimableRaw,
      vestedClaimedRaw,
      vestedTotalRaw,
      remainingRaw,
      monthlyReleaseRaw,
      lockTier,
      lockEndDate,
      onboardedDate,
      vestingEndDate,
      claimProgress,
      unlockedProgress,
      vestingDurationMonths,
    };
  }, [active, vested]);

  const totalRaisedUsd =
    stats?.[4] !== undefined
      ? Number(formatUnits(stats[4], paymentTokenDecimals))
      : null;
  const tokenPriceDisplay = formatPrice(stats?.[5], paymentTokenDecimals);
  const totalPartners = stats?.[3] !== undefined ? Number(stats[3]) : null;
  const paidCompanies = stats?.[1] !== undefined ? Number(stats[1]) : null;
  const individualCount = stats?.[2] !== undefined ? Number(stats[2]) : null;

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(240,180,41,0.12),transparent_28%),linear-gradient(180deg,#05070a_0%,#0b1220_62%,#05070a_100%)] text-white">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#05070a]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/mdao-logo-removebg.png"
                alt="MLEE DAO Logo"
                width={80}
                height={80}
                className="h-12 w-12 object-contain sm:h-14 sm:w-14"
              />
              <span className="text-xl font-semibold tracking-[0.2em] text-[#f0b429]" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                MDAO
              </span>
            </Link>
            <nav className="hidden gap-5 text-sm text-white/70 md:flex">
              <Link href="/presale" className="hover:text-white">Presale</Link>
              <Link href="/partnership" className="hover:text-white">Partnership</Link>
            </nav>
          </div>
          <ConnectWalletButton variant="header" />
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-[#2ed8a3]" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
              Dashboard
            </p>
            <h1 className="text-4xl text-white sm:text-5xl lg:text-6xl" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.06em" }}>
              Your Partnership Position
            </h1>
            <p className="mt-4 max-w-2xl text-white/65">
              Track your allocation, vesting state, claim readiness, lock schedule, and live program context from the connected
              wallet on BNB Smart Chain.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/partnership#verify" className="inline-flex items-center gap-2 rounded-2xl bg-[#f0b429] px-6 py-3 font-semibold text-[#05070a] transition hover:brightness-110">
                Verify & Onboard
              </Link>
              <Link href="/partnership#transparency" className="inline-flex items-center gap-2 rounded-2xl border border-white/12 bg-white/5 px-6 py-3 font-semibold text-white/80 transition hover:text-white">
                Program Transparency
              </Link>
            </div>
          </div>

          <div className="rounded-[30px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[11px] uppercase tracking-[0.3em] text-[#f0b429]" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                  Live Snapshot
                </p>
                <p className="mt-2 text-sm text-white/55">
                  A broader view of the partnership program around your position.
                </p>
              </div>
              <div className="rounded-2xl border border-[#2ed8a3]/18 bg-[#2ed8a3]/8 p-3 text-[#2ed8a3]">
                <Sparkles className="h-5 w-5" />
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <DashboardStatCard icon={Landmark} label="Total Raised" value={formatCurrency(totalRaisedUsd, 0)} />
              <DashboardStatCard icon={TrendingUp} label="Token Price" value={tokenPriceDisplay} />
              <DashboardStatCard icon={Building2} label="Paid Companies" value={formatNumber(paidCompanies, 0)} />
              <DashboardStatCard icon={UserRound} label="Total Partners" value={formatNumber(totalPartners, 0)} />
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-[30px] border border-white/10 bg-white/5 p-8">
          {!isConnected ? (
            <div className="space-y-3 text-white/70">
              <p>Connect the wallet you used for partnership onboarding to view your position.</p>
            </div>
          ) : isLoading ? (
            <p className="text-white/70">Loading your on-chain position...</p>
          ) : !active || !metrics || active[0] === BIGINT_ZERO ? (
            <div className="space-y-3 text-white/70">
              <p>No partnership allocation is recorded yet for {shortenAddress(address)}.</p>
              <Link href="/partnership#verify" className="text-[#f0b429] hover:text-white">
                Go to Verify & Onboard
              </Link>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <DashboardStatCard icon={Wallet} label="Total Allocated" value={`${formatTokenAmount(metrics.allocatedRaw, 18, 0)} MDAO`} />
                <DashboardStatCard icon={BadgeCheck} label="Claimable Now" value={`${formatTokenAmount(metrics.vestedClaimableRaw, 18, 0)} MDAO`} accent="green" />
                <DashboardStatCard icon={ShieldCheck} label="Already Claimed" value={`${formatTokenAmount(metrics.vestedClaimedRaw, 18, 0)} MDAO`} />
                <DashboardStatCard icon={Landmark} label="Payment Amount" value={formatCurrency(Number(formatUnits(metrics.paymentRaw, paymentTokenDecimals)), 0)} />
              </div>

              <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
                <div className="rounded-[26px] border border-white/10 bg-black/20 p-6">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-semibold text-white">Position Health</h2>
                      <p className="mt-1 text-sm text-white/45">
                        A quick view of unlock status, claim progress, and remaining balance.
                      </p>
                    </div>
                    <div className="rounded-full border border-white/10 bg-white/6 px-4 py-1.5 text-sm text-white/70">
                      {activeType === "company" ? "Company" : "Individual"}
                    </div>
                  </div>

                  <div className="mt-6 space-y-5">
                    <MetricBar
                      label="Claim progress"
                      value={`${metrics.claimProgress.toFixed(0)}% of total allocation`}
                      percent={metrics.claimProgress}
                      tone="gold"
                    />
                    <MetricBar
                      label="Unlocked and claimed"
                      value={`${metrics.unlockedProgress.toFixed(0)}% of vested balance`}
                      percent={metrics.unlockedProgress}
                      tone="green"
                    />
                    <MetricBar
                      label="Individual share of program"
                      value={individualCount === null || totalPartners === null || totalPartners === 0 ? "—" : `${((individualCount / totalPartners) * 100).toFixed(0)}%`}
                      percent={individualCount === null || totalPartners === null || totalPartners === 0 ? null : (individualCount / totalPartners) * 100}
                      tone="green"
                    />
                  </div>

                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <InfoTile label="Remaining MDAO" value={`${formatTokenAmount(metrics.remainingRaw, 18, 0)} MDAO`} />
                    <InfoTile label="Monthly vesting release" value={`${formatTokenAmount(metrics.monthlyReleaseRaw, 18, 0)} MDAO`} />
                    <InfoTile label="Lock tier" value={`${metrics.lockTier.label} + ${metrics.lockTier.bonusPercent}% bonus`} />
                    <InfoTile label="Vesting duration" value={`${metrics.vestingDurationMonths} months`} />
                  </div>
                </div>

                <div className="rounded-[26px] border border-white/10 bg-[linear-gradient(180deg,rgba(240,180,41,0.08),rgba(255,255,255,0.03))] p-6">
                  <h2 className="text-xl font-semibold text-white">Timeline</h2>
                  <p className="mt-1 text-sm text-white/45">
                    Your position schedule based on the live partnership record.
                  </p>

                  <div className="mt-6 space-y-4">
                    <TimelineRow
                      icon={CalendarDays}
                      label="Onboarded"
                      value={formatDateLabel(metrics.onboardedDate)}
                    />
                    <TimelineRow
                      icon={Clock3}
                      label="Lock ends"
                      value={formatDateLabel(metrics.lockEndDate)}
                    />
                    <TimelineRow
                      icon={TrendingUp}
                      label="Vesting ends"
                      value={formatDateLabel(metrics.vestingEndDate)}
                    />
                    <TimelineRow
                      icon={Building2}
                      label="Wallet"
                      value={shortenAddress(address)}
                    />
                  </div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <InfoTile label="Vested total tracked" value={`${formatTokenAmount(metrics.vestedTotalRaw, 18, 0)} MDAO`} />
                <InfoTile label="Tokens claimed in record" value={`${formatTokenAmount(active[4], 18, 0)} MDAO`} />
                <InfoTile label="Lock period" value={`${metrics.lockTier.lockMonths} months`} />
                <InfoTile label="Connected wallet type" value={activeType === "company" ? "Company record" : "Individual record"} />
              </div>
            </div>
          )}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

function DashboardStatCard({
  icon: Icon,
  label,
  value,
  accent = "gold",
}: {
  icon: ComponentType<{ className?: string }>;
  label: string;
  value: string;
  accent?: "gold" | "green";
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-white/50">{label}</p>
        <div
          className={cn(
            "rounded-xl border p-2",
            accent === "green"
              ? "border-[#2ed8a3]/20 bg-[#2ed8a3]/8 text-[#2ed8a3]"
              : "border-[#f0b429]/20 bg-[#f0b429]/8 text-[#f0b429]",
          )}
        >
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <p className="mt-4 text-2xl font-light text-white">{value}</p>
    </div>
  );
}

function InfoTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
      <p className="text-sm text-white/45">{label}</p>
      <p className="mt-2 text-lg text-white">{value}</p>
    </div>
  );
}

function MetricBar({
  label,
  value,
  percent,
  tone,
}: {
  label: string;
  value: string;
  percent: number | null;
  tone: "gold" | "green";
}) {
  const width = percent === null ? 0 : Math.max(0, Math.min(percent, 100));
  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm text-white/52">{label}</span>
        <span className="text-sm font-semibold text-white">{value}</span>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/8">
        <div
          className={cn(
            "h-full rounded-full bg-gradient-to-r",
            tone === "green" ? "from-[#2ed8a3] to-[#6ee7c8]" : "from-[#f0b429] to-[#ffd56a]",
          )}
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}

function TimelineRow({
  icon: Icon,
  label,
  value,
}: {
  icon: ComponentType<{ className?: string }>;
  label: string;
  value: ReactNode;
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-black/20 p-4">
      <div className="rounded-xl border border-white/10 bg-white/6 p-2 text-[#f0b429]">
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <p className="text-sm text-white/45">{label}</p>
        <p className="text-white">{value}</p>
      </div>
    </div>
  );
}
