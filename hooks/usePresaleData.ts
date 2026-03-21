"use client";

import { useReadContracts } from "wagmi";
import { MDAO_PRESALE_ABI } from "@/lib/abi";
import { CONTRACTS } from "@/lib/contracts";
import {
  formatMDAO,
  formatUSDT,
  formatProgress,
  formatTokenDisplay,
  formatUSDTDisplay,
} from "@/lib/utils";
import { PHASE_DURATION, USDT_DECIMALS } from "@/lib/contracts";

const presaleContract = {
  address: CONTRACTS.PRESALE,
  abi: MDAO_PRESALE_ABI,
} as const;

/**
 * usePresaleData — Reads all live presale statistics from the blockchain.
 *
 * Returns ready-to-render strings AND raw bigints for calculations.
 * Auto-refreshes every 15 seconds (configured in QueryClient).
 */
export function usePresaleData() {
  const { data, isLoading, isError, refetch } = useReadContracts({
    contracts: [
      { ...presaleContract, functionName: "getPresaleStats" },
      { ...presaleContract, functionName: "hardCap" },
      { ...presaleContract, functionName: "presaleStartTime" },
      { ...presaleContract, functionName: "PHASE_DURATION" },
      { ...presaleContract, functionName: "minPaymentAmount" },
      { ...presaleContract, functionName: "maxTokenAllocation" },
      { ...presaleContract, functionName: "saleTokenDecimals" },
      { ...presaleContract, functionName: "paused" },
    ],
    allowFailure: true,
  });

  // ── Unpack results ───────────────────────────────────────────────
  const stats = data?.[0]?.result as
    | readonly [
        bigint,
        bigint,
        bigint,
        bigint,
        bigint,
        boolean,
        boolean,
        bigint,
        bigint,
        bigint,
        bigint,
      ]
    | undefined;
  const hardCapRaw = data?.[1]?.result as bigint | undefined;
  const presaleStartTime = data?.[2]?.result as bigint | undefined;
  const phaseDuration =
    (data?.[3]?.result as bigint | undefined) ?? PHASE_DURATION;
  const minPaymentAmount = data?.[4]?.result as bigint | undefined;
  const maxTokenAllocation = data?.[5]?.result as bigint | undefined;
  const saleTokenDecimals = data?.[6]?.result as bigint | undefined;
  const isPaused = data?.[7]?.result as boolean | undefined;

  // ── Parsed stats ──────────────────────────────────────────────────
  const totalSoldRaw = stats?.[0];
  const totalClaimedRaw = stats?.[1];
  const remainingRaw = stats?.[2];
  const totalBuyers = stats?.[3] ? Number(stats[3]) : 0;
  const totalRaisedRaw = stats?.[4]; // in USDT
  const isActiveFromStats = stats?.[5] ?? false;
  const phaseRaw = stats?.[7];
  const priceRaw = stats?.[8];
  const presaleEndTimestampRaw = stats?.[9];
  const vestingStart = stats?.[10];

  const totalSold = formatMDAO(totalSoldRaw);
  const totalClaimed = formatMDAO(totalClaimedRaw);
  const remaining = formatMDAO(remainingRaw);
  const hardCap = formatMDAO(hardCapRaw);
  const totalRaised = formatUSDT(totalRaisedRaw);
  const now = Date.now() / 1000;
  const startSeconds = presaleStartTime ? Number(presaleStartTime) : 0;
  const phase =
    startSeconds > 0 && now < startSeconds
      ? 1
      : phaseRaw
        ? Number(phaseRaw)
        : 1;
  const progress = formatProgress(totalSoldRaw, hardCapRaw);

  // ── Price in USDT human-readable ──────────────────────────────────
  // Contract price is expressed in payment token units (18 decimals on BSC USDT)
  const priceInUsdt = priceRaw ? Number(priceRaw) / 10 ** USDT_DECIMALS : 0;
  const priceDisplay = priceRaw ? `$${priceInUsdt.toFixed(4)}` : "—";

  // ── Phase end time countdown ───────────────────────────────────────
  const presaleEndTimestamp = presaleEndTimestampRaw
    ? Number(presaleEndTimestampRaw)
    : presaleStartTime
      ? Number(BigInt(presaleStartTime) + BigInt(phaseDuration) * BigInt(3))
      : 0;
  const phase1Start = presaleStartTime ? Number(presaleStartTime) : 0;
  const phase2Start = phase1Start + Number(phaseDuration);
  const phase3Start = phase2Start + Number(phaseDuration);
  const hasStarted = startSeconds > 0 && now >= startSeconds;
  const hasEnded =
    hasStarted && presaleEndTimestamp > 0 && now >= presaleEndTimestamp;

  return {
    // ── Raw bigints (for contract writes) ──
    totalSoldRaw,
    totalClaimedRaw,
    hardCapRaw,
    priceRaw,
    minPaymentAmount,
    maxTokenAllocation,
    saleTokenDecimals,
    vestingStart,

    // ── Human-readable numbers ──
    totalSold,
    totalClaimed,
    remaining,
    hardCap,
    totalRaised,
    totalBuyers,
    progress,
    phase,
    priceInUsdt,

    // ── Display strings ──
    totalSoldDisplay: formatTokenDisplay(totalSold),
    hardCapDisplay: formatTokenDisplay(hardCap),
    totalRaisedDisplay: formatUSDTDisplay(totalRaised),
    priceDisplay,

    // ── Status flags ──
    isPresaleEnded: hasEnded,
    isVestingStarted: vestingStart ? now >= Number(vestingStart) : false,
    isPaused: !!isPaused,
    isActive: hasStarted && !!isActiveFromStats && !isPaused,

    // ── Phase times ──
    presaleEndTimestamp,
    phase1Start,
    phase2Start,
    phase3Start,

    // ── Loading state ──
    isLoading,
    isError,
    refetch,
  };
}
