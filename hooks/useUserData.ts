"use client";

import { useReadContracts, useAccount } from "wagmi";
import { MDAO_PRESALE_ABI } from "@/lib/abi";
import { ERC20_ABI } from "@/lib/erc20-abi";
import { CONTRACTS } from "@/lib/contracts";
import {
  formatMDAO,
  formatUSDT,
  formatTokenDisplay,
  formatTimestamp,
} from "@/lib/utils";

/**
 * useUserData — Reads the connected wallet's presale allocation,
 * USDT balance, USDT allowance, and vesting data.
 */
export function useUserData() {
  const { address, isConnected } = useAccount();
  const usdtAddress = CONTRACTS.USDT_MAINNET;

  const { data, isLoading, refetch } = useReadContracts({
    contracts: address
      ? [
          // User's presale allocation & vesting info
          {
            address: CONTRACTS.PRESALE,
            abi: MDAO_PRESALE_ABI,
            functionName: "getUserInfo",
            args: [address],
          },
          // User's USDT balance
          {
            address: usdtAddress,
            abi: ERC20_ABI,
            functionName: "balanceOf",
            args: [address],
          },
          // User's USDT allowance granted to presale contract
          {
            address: usdtAddress,
            abi: ERC20_ABI,
            functionName: "allowance",
            args: [address, CONTRACTS.PRESALE],
          },
        ]
      : [],
    allowFailure: true,
    query: { enabled: isConnected && !!address },
  });

  // ── Unpack ───────────────────────────────────────────────────────
  const userInfo = data?.[0]?.result as
    | readonly [bigint, bigint, bigint, bigint, bigint, bigint, bigint]
    | undefined;
  const usdtBalRaw = data?.[1]?.result as bigint | undefined;
  const allowanceRaw = data?.[2]?.result as bigint | undefined;

  // getUserInfo returns:
  // [totalAllocated, claimed, claimableNow, remainingLocked, lastClaim, nextUnlockTime, nextUnlockAmount]
  const totalAllocated = formatMDAO(userInfo?.[0]);
  const claimed = formatMDAO(userInfo?.[1]);
  const claimableNow = formatMDAO(userInfo?.[2]);
  const remainingLocked = formatMDAO(userInfo?.[3]);
  const lastClaim = userInfo?.[4] ? Number(userInfo[4]) : 0;
  const nextUnlockTime = userInfo?.[5] ? Number(userInfo[5]) : 0;
  const nextUnlockAmount = formatMDAO(userInfo?.[6]);

  const usdtBalance = formatUSDT(usdtBalRaw);
  const allowance = formatUSDT(allowanceRaw);

  return {
    address,
    isConnected,

    // ── Raw bigints (for contract writes) ──
    usdtBalRaw,
    allowanceRaw,
    totalAllocatedRaw: userInfo?.[0],
    claimableNowRaw: userInfo?.[2],

    // ── Human-readable numbers ──
    totalAllocated,
    claimed,
    claimableNow,
    remainingLocked,
    usdtBalance,
    allowance,
    nextUnlockAmount,

    // ── Display strings ──
    totalAllocatedDisplay: formatTokenDisplay(totalAllocated),
    claimedDisplay: formatTokenDisplay(claimed),
    claimableNowDisplay: formatTokenDisplay(claimableNow),
    remainingLockedDisplay: formatTokenDisplay(remainingLocked),
    usdtBalanceDisplay: `$${usdtBalance.toFixed(2)}`,
    nextUnlockTimeDisplay: formatTimestamp(userInfo?.[5]),
    lastClaimDisplay: formatTimestamp(userInfo?.[4]),

    // ── Flags ──
    hasPurchased: (userInfo?.[0] ?? BigInt(0)) > BigInt(0),
    hasClaimable: (userInfo?.[2] ?? BigInt(0)) > BigInt(0),
    lastClaim,

    isLoading,
    refetch,
  };
}
