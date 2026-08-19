"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDownUp,
  ArrowLeftRight,
  CheckCircle2,
  ExternalLink,
  LoaderCircle,
  Lock,
  ShieldCheck,
  Wallet,
} from "lucide-react";
import {
  formatUnits,
  parseUnits,
  type BaseError,
  type ContractFunctionExecutionError,
} from "viem";
import {
  useAccount,
  useChainId,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { ConnectWalletButton } from "@/components/presale/connect-wallet-button";
import { TOKEN_CONTRACT_ADDRESS } from "@/components/landing/constants";
import {
  ACTIVE_CHAIN_CONFIG,
  ACTIVE_USDT_ADDRESS,
  IS_TESTNET,
  MDAO_DECIMALS,
  USDT_DECIMALS,
} from "@/lib/contracts";
import { ERC20_ABI } from "@/lib/erc20-abi";
import { cn, getTxLink, shortenAddress } from "@/lib/utils";

type TokenSymbol = "MDAO" | "USDT";
type TxStage = "idle" | "approving" | "approved" | "swapping" | "success" | "error";

const MDAO_ADDRESS = TOKEN_CONTRACT_ADDRESS as `0x${string}`;
const PANCAKESWAP_V2_ROUTER = (
  IS_TESTNET
    ? "0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3"
    : "0x10ED43C718714eb63d5aA57B78B54704E256024E"
) as `0x${string}`;

const PANCAKESWAP_ROUTER_ABI = [
  {
    name: "getAmountsOut",
    type: "function",
    stateMutability: "view",
    inputs: [
      { name: "amountIn", type: "uint256" },
      { name: "path", type: "address[]" },
    ],
    outputs: [{ name: "amounts", type: "uint256[]" }],
  },
  {
    name: "swapExactTokensForTokensSupportingFeeOnTransferTokens",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "amountIn", type: "uint256" },
      { name: "amountOutMin", type: "uint256" },
      { name: "path", type: "address[]" },
      { name: "to", type: "address" },
      { name: "deadline", type: "uint256" },
    ],
    outputs: [],
  },
] as const;

const TOKENS: Record<
  TokenSymbol,
  {
    symbol: TokenSymbol;
    label: string;
    address: `0x${string}`;
    decimals: number;
  }
> = {
  MDAO: {
    symbol: "MDAO",
    label: "MLEE DAO",
    address: MDAO_ADDRESS,
    decimals: MDAO_DECIMALS,
  },
  USDT: {
    symbol: "USDT",
    label: "Tether USD",
    address: ACTIVE_USDT_ADDRESS,
    decimals: USDT_DECIMALS,
  },
};

const SLIPPAGE_OPTIONS = [
  { label: "0.5%", value: 50 },
  { label: "1%", value: 100 },
  { label: "2%", value: 200 },
] as const;
const ZERO = BigInt(0);
const BPS_DENOMINATOR = BigInt(10_000);

function parseSwapError(error: unknown) {
  const details =
    (error as ContractFunctionExecutionError)?.shortMessage ||
    (error as BaseError)?.shortMessage ||
    (error as Error)?.message ||
    "Transaction failed. Please try again.";
  const lower = details.toLowerCase();

  if (lower.includes("user rejected") || lower.includes("rejected")) {
    return "Transaction rejected in wallet.";
  }

  if (lower.includes("insufficient funds")) {
    return "Insufficient BNB for gas fees.";
  }

  if (lower.includes("excessive_input_amount") || lower.includes("insufficient_output_amount")) {
    return "Swap failed because price moved beyond your slippage limit.";
  }

  if (lower.includes("insufficient_liquidity") || lower.includes("insufficient liquidity")) {
    return "This pair does not have enough liquidity right now.";
  }

  return details;
}

function formatTokenAmount(value: bigint | undefined, decimals: number) {
  if (!value) return "0";
  const formatted = Number(formatUnits(value, decimals));
  if (!Number.isFinite(formatted)) return "0";
  return formatted.toLocaleString("en-US", {
    maximumFractionDigits: formatted >= 1 ? 4 : 8,
  });
}

function TokenBadge({ symbol }: { symbol: TokenSymbol }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-[#FFD600]/25 bg-[#171717]">
        {symbol === "MDAO" ? (
          <Image
            src="/mdao-logo-removebg.png"
            alt="MDAO"
            width={44}
            height={44}
            className="h-11 w-11 object-contain"
          />
        ) : (
          <span className="font-ibm-mono text-sm font-bold text-[#2ed8a3]">
            USDT
          </span>
        )}
      </div>
      <div>
        <p className="font-grotesk text-xl font-bold text-[#F5F5F0]">
          {symbol}
        </p>
        <p className="font-ibm-mono text-[10px] uppercase tracking-[1.4px] text-[#8A8A82]">
          {TOKENS[symbol].label}
        </p>
      </div>
    </div>
  );
}

export default function SwapPage() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { writeContractAsync } = useWriteContract();
  const [fromToken, setFromToken] = useState<TokenSymbol>("MDAO");
  const [amount, setAmount] = useState("");
  const [slippageBps, setSlippageBps] = useState(100);
  const [deadlineMinutes, setDeadlineMinutes] = useState(20);
  const [stage, setStage] = useState<TxStage>("idle");
  const [error, setError] = useState("");
  const [approveHash, setApproveHash] = useState<`0x${string}`>();
  const [swapHash, setSwapHash] = useState<`0x${string}`>();

  const isSupportedChain = chainId === ACTIVE_CHAIN_CONFIG.id;
  const toToken: TokenSymbol = fromToken === "MDAO" ? "USDT" : "MDAO";
  const from = TOKENS[fromToken];
  const to = TOKENS[toToken];
  const path = useMemo(() => [from.address, to.address] as const, [from.address, to.address]);

  const rawAmount = useMemo(() => {
    try {
      if (!amount || Number(amount) <= 0) return ZERO;
      return parseUnits(amount, from.decimals);
    } catch {
      return ZERO;
    }
  }, [amount, from.decimals]);

  const quoteEnabled = rawAmount > ZERO && isSupportedChain;

  const {
    data: quotedAmounts,
    isFetching: quoteLoading,
    error: quoteError,
    refetch: refetchQuote,
  } = useReadContract({
    address: PANCAKESWAP_V2_ROUTER,
    abi: PANCAKESWAP_ROUTER_ABI,
    functionName: "getAmountsOut",
    args: [rawAmount, [...path]],
    chainId: ACTIVE_CHAIN_CONFIG.id,
    query: {
      enabled: quoteEnabled,
      refetchInterval: quoteEnabled ? 15_000 : false,
    },
  });

  const {
    data: allowance = ZERO,
    refetch: refetchAllowance,
  } = useReadContract({
    address: from.address,
    abi: ERC20_ABI,
    functionName: "allowance",
    args: [address ?? "0x0000000000000000000000000000000000000000", PANCAKESWAP_V2_ROUTER],
    chainId: ACTIVE_CHAIN_CONFIG.id,
    query: {
      enabled: !!address && isSupportedChain,
    },
  });

  const { data: balance = ZERO } = useReadContract({
    address: from.address,
    abi: ERC20_ABI,
    functionName: "balanceOf",
    args: [address ?? "0x0000000000000000000000000000000000000000"],
    chainId: ACTIVE_CHAIN_CONFIG.id,
    query: {
      enabled: !!address && isSupportedChain,
      refetchInterval: isConnected ? 12_000 : false,
    },
  });

  const { isLoading: approveConfirming, isSuccess: approveSuccess } =
    useWaitForTransactionReceipt({
      hash: approveHash,
      chainId: ACTIVE_CHAIN_CONFIG.id,
      query: { enabled: !!approveHash },
    });

  const { isLoading: swapConfirming, isSuccess: swapSuccess } =
    useWaitForTransactionReceipt({
      hash: swapHash,
      chainId: ACTIVE_CHAIN_CONFIG.id,
      query: { enabled: !!swapHash },
    });

  const quotedOut = quotedAmounts?.[quotedAmounts.length - 1] ?? ZERO;
  const minOut =
    quotedOut > ZERO
      ? (quotedOut * BigInt(10_000 - slippageBps)) / BPS_DENOMINATOR
      : ZERO;
  const needsApproval = rawAmount > ZERO && allowance < rawAmount;
  const hasEnoughBalance = rawAmount > ZERO && balance >= rawAmount;
  const canApprove =
    isConnected &&
    isSupportedChain &&
    rawAmount > ZERO &&
    hasEnoughBalance &&
    needsApproval &&
    !approveConfirming &&
    stage !== "approving" &&
    stage !== "swapping";
  const canSwap =
    isConnected &&
    isSupportedChain &&
    rawAmount > ZERO &&
    minOut > ZERO &&
    hasEnoughBalance &&
    !needsApproval &&
    !swapConfirming &&
    stage !== "approving" &&
    stage !== "swapping";

  useEffect(() => {
    if (!approveSuccess) return;
    setStage("approved");
    refetchAllowance();
  }, [approveSuccess, refetchAllowance]);

  useEffect(() => {
    if (!swapSuccess) return;
    setStage("success");
    refetchQuote();
  }, [swapSuccess, refetchQuote]);

  const flipPair = () => {
    setFromToken(toToken);
    setStage("idle");
    setError("");
    setApproveHash(undefined);
    setSwapHash(undefined);
  };

  const approve = async () => {
    if (!canApprove) return;
    setError("");
    setStage("approving");

    try {
      const hash = await writeContractAsync({
        address: from.address,
        abi: ERC20_ABI,
        functionName: "approve",
        args: [PANCAKESWAP_V2_ROUTER, rawAmount],
        chainId: ACTIVE_CHAIN_CONFIG.id,
      });

      setApproveHash(hash);
    } catch (err) {
      setStage("error");
      setError(parseSwapError(err));
    }
  };

  const swap = async () => {
    if (!canSwap || !address) return;
    setError("");
    setStage("swapping");

    try {
      const deadline = BigInt(Math.floor(Date.now() / 1000) + deadlineMinutes * 60);
      const hash = await writeContractAsync({
        address: PANCAKESWAP_V2_ROUTER,
        abi: PANCAKESWAP_ROUTER_ABI,
        functionName: "swapExactTokensForTokensSupportingFeeOnTransferTokens",
        args: [rawAmount, minOut, [...path], address, deadline],
        chainId: ACTIVE_CHAIN_CONFIG.id,
      });

      setSwapHash(hash);
    } catch (err) {
      setStage("error");
      setError(parseSwapError(err));
    }
  };

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-[#F5F5F0]">
      <header className="border-b border-[#1E1E1E] bg-[#0A0A0A]/95">
        <div className="mx-auto flex h-[82px] max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFD600]"
          >
            <Image
              src="/mdao-logo-removebg.png"
              alt="MLEE DAO"
              width={72}
              height={72}
              className="h-14 w-14 object-contain"
              priority
            />
            <span className="font-ibm-mono text-xs font-bold uppercase tracking-[2px] text-[#D8D8D0]">
              MLEE DAO
            </span>
          </Link>
          <ConnectWalletButton variant="header" returnPath="/swap" />
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-12 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8 lg:py-20">
        <div className="flex flex-col justify-center">
          <p className="mb-4 font-ibm-mono text-xs font-bold uppercase tracking-[2.8px] text-[#FFD600]">
            Embedded BNB Chain Swap
          </p>
          <h1 className="max-w-3xl font-grotesk text-5xl font-bold leading-[0.95] text-[#F5F5F0] sm:text-6xl lg:text-7xl">
            Swap MDAO and USDT on-site.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-[#BEBEB6] sm:text-lg">
            This page only supports the fixed MDAO/USDT pair on{" "}
            {ACTIVE_CHAIN_CONFIG.name}. It uses PancakeSwap Router on-chain,
            but every approval and swap is confirmed from your wallet here.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <div className="border border-[#242424] bg-[#101010] p-4">
              <p className="font-ibm-mono text-[10px] uppercase tracking-[1.8px] text-[#8A8A82]">
                Router
              </p>
              <p className="mt-2 font-grotesk text-lg font-bold text-[#F5F5F0]">
                PancakeSwap V2
              </p>
              <p className="mt-1 font-ibm-mono text-[10px] text-[#8A8A82]">
                {shortenAddress(PANCAKESWAP_V2_ROUTER)}
              </p>
            </div>
            <div className="border border-[#242424] bg-[#101010] p-4">
              <p className="font-ibm-mono text-[10px] uppercase tracking-[1.8px] text-[#8A8A82]">
                Security
              </p>
              <p className="mt-2 font-grotesk text-lg font-bold text-[#F5F5F0]">
                Fixed Pair Only
              </p>
              <p className="mt-1 font-ibm-mono text-[10px] text-[#8A8A82]">
                No custom token input
              </p>
            </div>
          </div>

          <div className="mt-5 border border-[#2ed8a3]/25 bg-[#0E1815] p-4">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#2ed8a3]" />
              <p className="text-sm leading-6 text-[#C8D8D2]">
                Approvals are for the exact entered amount, recipient is your
                connected wallet, and every swap has slippage plus deadline
                protection.
              </p>
            </div>
          </div>
        </div>

        <div className="border border-[#242424] bg-[#0D0D0D] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.35)] sm:p-7">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <p className="font-ibm-mono text-[10px] uppercase tracking-[1.8px] text-[#8A8A82]">
                Swap Console
              </p>
              <h2 className="mt-1 font-grotesk text-3xl font-bold text-[#FFD600]">
                {fromToken} to {toToken}
              </h2>
            </div>
            <button
              type="button"
              onClick={flipPair}
              className="flex h-11 w-11 items-center justify-center bg-[#FFD600] text-[#0A0A0A] transition-colors hover:bg-[#F5F5F0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFD600]"
              aria-label="Switch swap direction"
            >
              <ArrowDownUp className="h-5 w-5" />
            </button>
          </div>

          <div className="space-y-3">
            <div className="border border-[#242424] bg-[#0F0F0F] p-4">
              <div className="mb-4 flex items-center justify-between gap-4">
                <TokenBadge symbol={fromToken} />
                <p className="font-ibm-mono text-[10px] text-[#8A8A82]">
                  Balance: {formatTokenAmount(balance, from.decimals)}
                </p>
              </div>
              <input
                value={amount}
                onChange={(event) => {
                  setAmount(event.target.value);
                  setStage("idle");
                  setError("");
                }}
                inputMode="decimal"
                placeholder="0.0"
                className="w-full border border-[#2D2D2D] bg-[#080808] px-4 py-4 font-ibm-mono text-3xl text-[#F5F5F0] outline-none transition-colors placeholder:text-[#4A4A44] focus:border-[#FFD600]"
              />
            </div>

            <div className="flex justify-center">
              <button
                type="button"
                onClick={flipPair}
                className="flex h-10 w-10 items-center justify-center border border-[#FFD600]/30 bg-[#151515] text-[#FFD600] transition-colors hover:border-[#FFD600]"
                aria-label="Switch swap direction"
              >
                <ArrowLeftRight className="h-4 w-4" />
              </button>
            </div>

            <div className="border border-[#242424] bg-[#0F0F0F] p-4">
              <div className="mb-4 flex items-center justify-between gap-4">
                <TokenBadge symbol={toToken} />
                <p className="font-ibm-mono text-[10px] text-[#8A8A82]">
                  Quote
                </p>
              </div>
              <div className="min-h-16 border border-[#2D2D2D] bg-[#080808] px-4 py-4 font-ibm-mono text-3xl text-[#F5F5F0]">
                {quoteLoading ? (
                  <LoaderCircle className="h-7 w-7 animate-spin text-[#FFD600]" />
                ) : rawAmount > ZERO && quotedOut === ZERO ? (
                  <span className="text-[#4A4A44]">No route</span>
                ) : (
                  formatTokenAmount(quotedOut, to.decimals)
                )}
              </div>
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-2 block font-ibm-mono text-[10px] uppercase tracking-[1.8px] text-[#8A8A82]">
                Slippage
              </label>
              <div className="grid grid-cols-3 border border-[#242424]">
                {SLIPPAGE_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setSlippageBps(option.value)}
                    className={cn(
                      "min-h-10 border-r border-[#242424] font-ibm-mono text-xs font-bold transition-colors last:border-r-0",
                      slippageBps === option.value
                        ? "bg-[#FFD600] text-[#0A0A0A]"
                        : "bg-[#101010] text-[#D8D8D0] hover:text-[#FFD600]",
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="mb-2 block font-ibm-mono text-[10px] uppercase tracking-[1.8px] text-[#8A8A82]">
                Deadline
              </label>
              <input
                value={deadlineMinutes}
                onChange={(event) => {
                  const value = Number(event.target.value);
                  setDeadlineMinutes(Math.min(60, Math.max(5, value || 20)));
                }}
                type="number"
                min={5}
                max={60}
                className="min-h-10 w-full border border-[#242424] bg-[#101010] px-3 font-ibm-mono text-sm text-[#F5F5F0] outline-none focus:border-[#FFD600]"
              />
            </div>
          </div>

          <div className="mt-5 border border-[#242424] bg-[#111] p-4">
            <div className="flex items-start gap-3">
              {isConnected && isSupportedChain ? (
                <Wallet className="mt-0.5 h-5 w-5 shrink-0 text-[#2ed8a3]" />
              ) : (
                <Lock className="mt-0.5 h-5 w-5 shrink-0 text-[#FFD600]" />
              )}
              <div>
                <p className="font-grotesk text-lg font-bold text-[#F5F5F0]">
                  {isConnected && isSupportedChain
                    ? `Connected: ${shortenAddress(address)}`
                    : !isConnected
                      ? "Connect wallet to continue"
                      : `Switch to ${ACTIVE_CHAIN_CONFIG.name}`}
                </p>
                <p className="mt-1 text-sm leading-6 text-[#A7A79F]">
                  Minimum received: {formatTokenAmount(minOut, to.decimals)} {toToken}
                </p>
              </div>
            </div>
          </div>

          {(quoteError || error || !hasEnoughBalance) && rawAmount > ZERO && (
            <div className="mt-4 border border-red-500/30 bg-red-500/10 p-4 text-sm leading-6 text-red-200">
              {error ||
                (!hasEnoughBalance
                  ? `Insufficient ${fromToken} balance.`
                  : parseSwapError(quoteError))}
            </div>
          )}

          {stage === "success" && swapHash && (
            <a
              href={getTxLink(swapHash)}
              target="_blank"
              rel="noreferrer"
              className="mt-4 flex items-center justify-between border border-[#2ed8a3]/30 bg-[#0E1815] p-4 text-sm text-[#C8D8D2] hover:text-white"
            >
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-[#2ed8a3]" />
                Swap confirmed
              </span>
              <ExternalLink className="h-4 w-4" />
            </a>
          )}

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {!isConnected ? (
              <div className="sm:col-span-2">
                <ConnectWalletButton size="lg" returnPath="/swap" />
              </div>
            ) : (
              <>
                <button
                  type="button"
                  onClick={approve}
                  disabled={!canApprove}
                  className="inline-flex min-h-12 items-center justify-center gap-2 border border-[#FFD600]/40 px-4 text-center font-grotesk text-sm font-bold uppercase tracking-[1.4px] text-[#FFD600] transition-colors hover:border-[#FFD600] hover:bg-[#FFD600] hover:text-[#0A0A0A] disabled:pointer-events-none disabled:opacity-45"
                >
                  {stage === "approving" || approveConfirming ? (
                    <LoaderCircle className="h-4 w-4 animate-spin" />
                  ) : null}
                  {needsApproval ? `Approve ${fromToken}` : "Approved"}
                </button>
                <button
                  type="button"
                  onClick={swap}
                  disabled={!canSwap}
                  className="inline-flex min-h-12 items-center justify-center gap-2 bg-[#FFD600] px-4 text-center font-grotesk text-sm font-bold uppercase tracking-[1.4px] text-[#0A0A0A] transition-colors hover:bg-[#F5F5F0] disabled:pointer-events-none disabled:opacity-45"
                >
                  {stage === "swapping" || swapConfirming ? (
                    <LoaderCircle className="h-4 w-4 animate-spin" />
                  ) : null}
                  Swap {fromToken} to {toToken}
                </button>
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
