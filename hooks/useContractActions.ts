"use client";

import { useState, useCallback, useEffect } from "react";
import {
  useWriteContract,
  useWaitForTransactionReceipt,
  useAccount,
  useChainId,
} from "wagmi";
import { MDAO_PRESALE_ABI } from "@/lib/abi";
import { ERC20_ABI } from "@/lib/erc20-abi";
import { CONTRACTS, BSC_MAINNET } from "@/lib/contracts";
import { parseUSDT } from "@/lib/utils";

export type TxStep =
  | "idle"
  | "approving"
  | "approved"
  | "buying"
  | "success"
  | "error";

/**
 * useBuyTokens — Full two-step approve → buyTokens flow.
 *
 * Step 1: User approves USDT spend to the presale contract
 * Step 2: User calls buyTokens() with the USDT amount
 *
 * Usage in component:
 *   const { step, approve, buy, txHash, error, reset } = useBuyTokens()
 */
export function useBuyTokens() {
  const { address } = useAccount();
  const chainId = useChainId();
  const [step, setStep] = useState<TxStep>("idle");
  const [approveTxHash, setApproveTxHash] = useState<
    `0x${string}` | undefined
  >();
  const [buyTxHash, setBuyTxHash] = useState<`0x${string}` | undefined>();
  const [txError, setTxError] = useState<string | undefined>();

  const { writeContractAsync } = useWriteContract();

  // Wait for approve tx to confirm
  const { isLoading: approveConfirming, isSuccess: approveSuccess } =
    useWaitForTransactionReceipt({
    hash: approveTxHash,
    query: { enabled: !!approveTxHash },
  });

  // Wait for buy tx to confirm
  const { isLoading: buyConfirming, isSuccess: buySuccess } =
    useWaitForTransactionReceipt({
      hash: buyTxHash,
      query: { enabled: !!buyTxHash },
    });
  
  useEffect(() => {
    if (approveSuccess) {
      setStep("approved");
    }
  }, [approveSuccess]);

  useEffect(() => {
    if (buySuccess) {
      setStep("success");
    }
  }, [buySuccess]);

  /**
   * Step 1 — Approve USDT
   * Call this when user clicks "Approve USDT"
   */
  const approve = useCallback(
    async (usdtAmount: number) => {
      if (!address) return;
      setTxError(undefined);
      setStep("approving");

      try {
        const rawAmount = parseUSDT(usdtAmount);

        if (chainId !== BSC_MAINNET.id) {
          setTxError("Please switch to BNB Smart Chain (Mainnet).");
          setStep("error");
          return;
        }

        const usdtAddress = CONTRACTS.USDT_MAINNET;

        if (chainId !== BSC_MAINNET.id) {
          setTxError("Please switch to BNB Smart Chain (Mainnet).");
          setStep("error");
          return;
        }

        const hash = await writeContractAsync({
          address: usdtAddress,
          abi: ERC20_ABI,
          functionName: "approve",
          args: [CONTRACTS.PRESALE, rawAmount],
        });

        setApproveTxHash(hash);
        setStep("approving");
      } catch (err: any) {
        setTxError(parseContractError(err));
        setStep("error");
      }
    },
    [address, writeContractAsync],
  );

  /**
   * Step 2 — Buy Tokens
   * Call this after approval is confirmed
   */
  const buy = useCallback(
    async (usdtAmount: number) => {
      if (!address) return;
      setTxError(undefined);
      setStep("buying");

      try {
        const rawAmount = parseUSDT(usdtAmount);

        const hash = await writeContractAsync({
          address: CONTRACTS.PRESALE,
          abi: MDAO_PRESALE_ABI,
          functionName: "buyTokens",
          args: [rawAmount],
        });

        setBuyTxHash(hash);
        setStep("buying");
      } catch (err: any) {
        setTxError(parseContractError(err));
        setStep("error");
      }
    },
    [address, writeContractAsync],
  );

  const reset = useCallback(() => {
    setStep("idle");
    setApproveTxHash(undefined);
    setBuyTxHash(undefined);
    setTxError(undefined);
  }, []);

  return {
    step,
    approve,
    buy,
    reset,

    // Transaction hashes for BscScan links
    approveTxHash,
    buyTxHash,
    txHash: buyTxHash ?? approveTxHash,

    // Loading states
    isApproving: step === "approving" || approveConfirming,
    isBuying: step === "buying" || buyConfirming,
    isSuccess: step === "success" && !buyConfirming,
    isError: step === "error",

    error: txError,
  };
}

/**
 * useClaimTokens — Calls claimTokens() on the presale contract.
 */
export function useClaimTokens() {
  const { address } = useAccount();
  const [txHash, setTxHash] = useState<`0x${string}` | undefined>();
  const [txError, setTxError] = useState<string | undefined>();

  const { writeContractAsync } = useWriteContract();
  const { isLoading: confirming, isSuccess } = useWaitForTransactionReceipt({
    hash: txHash,
    query: { enabled: !!txHash },
  });

  const claim = useCallback(async () => {
    if (!address) return;
    setTxError(undefined);

    try {
      const hash = await writeContractAsync({
        address: CONTRACTS.PRESALE,
        abi: MDAO_PRESALE_ABI,
        functionName: "claimTokens",
        args: [],
      });
      setTxHash(hash);
    } catch (err: any) {
      setTxError(parseContractError(err));
    }
  }, [address, writeContractAsync]);

  return {
    claim,
    txHash,
    isLoading: confirming,
    isSuccess: isSuccess && !confirming,
    error: txError,
    reset: () => {
      setTxHash(undefined);
      setTxError(undefined);
    },
  };
}

// ─── Error parser ─────────────────────────────────────────────────
/**
 * Converts raw contract errors into human-friendly messages
 */
function parseContractError(err: any): string {
  const msg: string = err?.message ?? err?.toString() ?? "Unknown error";

  if (msg.includes("PresaleNotActive"))
    return "Presale is not currently active.";
  if (msg.includes("PresaleAlreadyEnded")) return "The presale has ended.";
  if (msg.includes("HardCapReached"))
    return "Presale hard cap has been reached.";
  if (msg.includes("BelowMinPurchase"))
    return "Amount is below the minimum purchase.";
  if (msg.includes("AboveMaxPurchase"))
    return "Amount exceeds your maximum allocation.";
  if (msg.includes("VestingNotStarted")) return "Vesting has not started yet.";
  if (msg.includes("NoTokensToClaim"))
    return "No tokens available to claim right now.";
  if (msg.includes("InsufficientContractBalance"))
    return "Contract has insufficient token balance. Contact support.";
  if (msg.includes("user rejected")) return "Transaction rejected in wallet.";
  if (msg.includes("insufficient funds"))
    return "Insufficient BNB for gas fees.";

  return "Transaction failed. Please try again.";
}
