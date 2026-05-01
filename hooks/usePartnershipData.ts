"use client";

import { useEffect, useMemo, useState } from "react";
import { parseAbiItem } from "viem";
import { usePublicClient, useReadContract, useReadContracts } from "wagmi";
import { MDAO_PARTNERSHIP_ABI } from "@/lib/abi";
import { CONTRACTS } from "@/lib/contracts";
import { ERC20_ABI } from "@/lib/erc20-abi";
import { fetchPriceHistoryFromApi } from "@/lib/partnership-api";

const partnershipContract = {
  address: CONTRACTS.PARTNERSHIP,
  abi: MDAO_PARTNERSHIP_ABI,
} as const;

export type PriceHistoryItem = {
  id: string;
  dateLabel: string;
  priceRaw: bigint;
  paidCompanies: number | null;
  txHash: `0x${string}`;
};

export function usePartnershipData() {
  const [secondsAgo, setSecondsAgo] = useState(0);
  const { data, isLoading, isError, refetch, dataUpdatedAt } = useReadContracts({
    contracts: [
      { ...partnershipContract, functionName: "getStats" },
      { ...partnershipContract, functionName: "nextPriceIncreaseIn" },
      { ...partnershipContract, functionName: "getWalletBalances" },
      { ...partnershipContract, functionName: "mdaoSolvent" },
      { ...partnershipContract, functionName: "lpWallet" },
      { ...partnershipContract, functionName: "communityWallet" },
      { ...partnershipContract, functionName: "investmentWallet" },
      { ...partnershipContract, functionName: "companyMinPayment" },
      { ...partnershipContract, functionName: "companyMaxPayment" },
      { ...partnershipContract, functionName: "individualMinPayment" },
      { ...partnershipContract, functionName: "individualMaxPayment" },
      { ...partnershipContract, functionName: "paymentToken" },
      { ...partnershipContract, functionName: "paymentTokenDecimals" },
      { ...partnershipContract, functionName: "mdaoToken" },
      { ...partnershipContract, functionName: "mdaoTokenDecimals" },
      { ...partnershipContract, functionName: "totalMdaoAllocated" },
      { ...partnershipContract, functionName: "totalMdaoClaimed" },
      { ...partnershipContract, functionName: "paused" },
      { ...partnershipContract, functionName: "partnerCount" },
    ],
    allowFailure: true,
    query: {
      refetchInterval: 30_000,
      staleTime: 15_000,
    },
  });

  useEffect(() => {
    setSecondsAgo(0);
  }, [dataUpdatedAt]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSecondsAgo(Math.floor((Date.now() - dataUpdatedAt) / 1000));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [dataUpdatedAt]);

  const stats = data?.[0]?.result as
    | readonly [bigint, bigint, bigint, bigint, bigint, bigint]
    | undefined;
  const nextPriceIncreaseIn = data?.[1]?.result as bigint | undefined;
  const walletBalances = data?.[2]?.result as readonly [bigint, bigint, bigint] | undefined;
  const mdaoToken = data?.[13]?.result as `0x${string}` | undefined;
  const { data: mdaoContractBalance } = useReadContract({
    address: mdaoToken,
    abi: ERC20_ABI,
    functionName: "balanceOf",
    args: [CONTRACTS.PARTNERSHIP],
    query: {
      enabled: !!mdaoToken,
      refetchInterval: 30_000,
      staleTime: 15_000,
    },
  });

  return {
    stats,
    nextPriceIncreaseIn,
    walletBalances,
    mdaoSolvent: (data?.[3]?.result as boolean | undefined) ?? false,
    lpWallet: data?.[4]?.result as `0x${string}` | undefined,
    communityWallet: data?.[5]?.result as `0x${string}` | undefined,
    investmentWallet: data?.[6]?.result as `0x${string}` | undefined,
    companyMinPayment: data?.[7]?.result as bigint | undefined,
    companyMaxPayment: data?.[8]?.result as bigint | undefined,
    individualMinPayment: data?.[9]?.result as bigint | undefined,
    individualMaxPayment: data?.[10]?.result as bigint | undefined,
    paymentToken: data?.[11]?.result as `0x${string}` | undefined,
    paymentTokenDecimals: Number((data?.[12]?.result as bigint | undefined) ?? BigInt(18)),
    mdaoToken,
    mdaoTokenDecimals: Number((data?.[14]?.result as bigint | undefined) ?? BigInt(18)),
    totalMdaoAllocated: data?.[15]?.result as bigint | undefined,
    totalMdaoClaimed: data?.[16]?.result as bigint | undefined,
    paused: (data?.[17]?.result as boolean | undefined) ?? false,
    partnerCount: Number((data?.[18]?.result as bigint | undefined) ?? BigInt(0)),
    mdaoContractBalance: mdaoContractBalance as bigint | undefined,
    isLoading,
    isError,
    refetch,
    secondsAgo,
  };
}

export function usePriceHistory() {
  const publicClient = usePublicClient();
  const [items, setItems] = useState<PriceHistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      if (!publicClient) return;
      setIsLoading(true);
      setError(null);

      try {
        const apiData = await fetchPriceHistoryFromApi(25).catch(() => null);
        if (apiData && !cancelled) {
          setItems(apiData);
          setIsLoading(false);
          return;
        }

        const logs = await publicClient.getLogs({
          address: CONTRACTS.PARTNERSHIP,
          event: parseAbiItem("event TokenPriceIncreased(uint256 newPrice)"),
          fromBlock: BigInt(0),
          toBlock: "latest",
        });

        const sorted = [...logs].reverse();
        const blocks = [...new Set(sorted.map((item) => item.blockNumber).filter(Boolean))] as bigint[];
        const blockMap = new Map<bigint, bigint>();

        await Promise.all(
          blocks.map(async (blockNumber) => {
            const block = await publicClient.getBlock({ blockNumber });
            blockMap.set(blockNumber, block.timestamp);
          })
        );

        if (cancelled) return;

        setItems(
          sorted.map((log, index) => ({
            id: `${log.transactionHash}-${index}`,
            dateLabel: new Date(Number(blockMap.get(log.blockNumber!)) * 1000).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            }),
            priceRaw: log.args.newPrice ?? BigInt(0),
            paidCompanies: null,
            txHash: log.transactionHash!,
          }))
        );
      } catch {
        if (!cancelled) {
          setError("Unable to load price history right now.");
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [publicClient]);

  return useMemo(
    () => ({
      items,
      isLoading,
      error,
    }),
    [items, isLoading, error]
  );
}
