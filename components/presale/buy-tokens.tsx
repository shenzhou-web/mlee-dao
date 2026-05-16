"use client"

import { useEffect, useState } from "react"
import { useAccount, useChainId } from "wagmi"
import { usePresaleData } from "@/hooks/usePresaleData"
import { useUserData } from "@/hooks/useUserData"
import { useBuyTokens } from "@/hooks/useContractActions"
import { canAutoOpenCustomWallet, isCustomWalletConnector, openCustomWalletApp } from "@/lib/custom-wallet-launch"
import { calcTokensToReceive, formatTokenDisplay, getTxLink } from "@/lib/utils"
import { ACTIVE_CHAIN_CONFIG, IS_TESTNET, MAX_PURCHASE_USDT, USDT_DECIMALS } from "@/lib/contracts"

const QUICK_AMOUNTS = [50, 100, 500, 1000]
const SUPPORT_EMAIL = "admin@mleedao.com"

export function BuyTokens() {
  const [inputAmount, setInputAmount] = useState("")
  const [pendingElapsedMs, setPendingElapsedMs] = useState(0)
  const { isConnected, connector } = useAccount()
  const chainId = useChainId()
  const {
    priceRaw,
    minPaymentAmount,
    maxTokenAllocation,
    saleTokenDecimals,
    isActive,
    priceDisplay,
    phase,
  } = usePresaleData()
  const { usdtBalance, allowanceRaw, totalAllocatedRaw, refetch: refetchUser } = useUserData()
  const { step, approve, buy, reset, isApproving, isBuying, isSuccess, isError, error, buyTxHash, approveTxHash } = useBuyTokens()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const timeout = window.setTimeout(() => setMounted(true), 0)
    return () => window.clearTimeout(timeout)
  }, [])

  const usdtAmount  = parseFloat(inputAmount) || 0
  const minUsdt     = minPaymentAmount ? Number(minPaymentAmount) / 10 ** USDT_DECIMALS : 10
  const mdaoReceive = calcTokensToReceive(usdtAmount, priceRaw)

  const maxTokens = maxTokenAllocation ? Number(maxTokenAllocation) / (10 ** Number(saleTokenDecimals ?? 18)) : 0
  const alreadyAllocated = totalAllocatedRaw ? Number(totalAllocatedRaw) / (10 ** Number(saleTokenDecimals ?? 18)) : 0
  const remainingAllocation = maxTokens > 0 ? Math.max(0, maxTokens - alreadyAllocated) : Infinity

  const isValid   = usdtAmount >= minUsdt && usdtAmount > 0 && usdtAmount <= MAX_PURCHASE_USDT && mdaoReceive <= remainingAllocation
  const isAlreadyApproved = allowanceRaw ? Number(allowanceRaw) / 10 ** USDT_DECIMALS >= usdtAmount : false

  const isSupportedChain = chainId === ACTIVE_CHAIN_CONFIG.id
  const canBuy  = isValid && (isAlreadyApproved || step === "approved") && isConnected && isActive && isSupportedChain
  const isWaitingForApproveWallet = isApproving && !approveTxHash
  const isWaitingForBuyWallet = isBuying && !buyTxHash
  const isWaitingForWallet = isWaitingForApproveWallet || isWaitingForBuyWallet
  const isConfirmingChain = (isApproving && !!approveTxHash) || (isBuying && !!buyTxHash)
  const isUsingCustomWallet = isCustomWalletConnector(connector?.id)
  const canOpenWallet = canAutoOpenCustomWallet()
  const pendingMessage = isWaitingForApproveWallet
    ? "Waiting for your wallet to show the USDT approval request. QR wallet sessions can take a little longer, so keep your mobile wallet open."
    : isWaitingForBuyWallet
      ? "Waiting for your wallet to show the purchase request. QR wallet sessions can take a little longer, so keep your mobile wallet open."
      : isApproving
        ? "Approval submitted. Waiting for BNB Chain confirmation."
        : isBuying
          ? "Purchase submitted. Waiting for BNB Chain confirmation."
          : null
  const pendingStageLabel = isWaitingForWallet
    ? canOpenWallet
      ? "Opening wallet and sending request"
      : "Waiting for wallet request in ValorUp"
    : isConfirmingChain
      ? "Request sent. Confirming on BNB Chain"
      : null
  const pendingProgress = isWaitingForWallet
    ? pendingElapsedMs < 18000
      ? Math.min(12 + pendingElapsedMs / 450, 78)
      : Math.min(78 + (pendingElapsedMs - 18000) / 3000, 92)
    : isConfirmingChain
      ? pendingElapsedMs < 12000
        ? Math.min(82 + pendingElapsedMs / 470, 96)
        : Math.min(96 + (pendingElapsedMs - 12000) / 8000, 99)
      : 0
  const showSupportLink = pendingElapsedMs >= 300000

  useEffect(() => {
    if (!pendingMessage) return

    const timer = window.setInterval(() => {
      setPendingElapsedMs((current) => current + 300)
    }, 300)

    return () => window.clearInterval(timer)
  }, [pendingMessage])

  const handleApprove = () => {
    setPendingElapsedMs(0)
    approve(usdtAmount)
  }
  const handleBuy     = async () => {
    setPendingElapsedMs(0)
    await buy(usdtAmount)
    refetchUser()
  }

  // ── After success ─────────────────────────────────────────────────
  if (isSuccess) {
    return (
      <div className="rounded-2xl p-8 text-center space-y-5"
        style={{ background: "rgba(10,14,20,0.9)", border: "1px solid rgba(46,216,163,0.3)" }}>
        <div className="text-5xl">🎉</div>
        <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.8rem", color: "#2ed8a3", letterSpacing: "0.05em" }}>
          Purchase Successful!
        </h3>
        <p style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Rajdhani', sans-serif" }}>
          You received <strong style={{ color: "#f0b429" }}>{formatTokenDisplay(mdaoReceive)} MDAO</strong> tokens.
        </p>
        {buyTxHash && (
          <a href={getTxLink(buyTxHash)} target="_blank" rel="noopener noreferrer"
            className="inline-block text-xs px-4 py-2 rounded-lg transition-colors"
            style={{ background: "rgba(46,216,163,0.1)", border: "1px solid rgba(46,216,163,0.3)", color: "#2ed8a3" }}>
            View on BscScan ↗
          </a>
        )}
        <button onClick={reset} className="block w-full py-3 rounded-xl font-bold uppercase tracking-wider btn-outline-gold"
          style={{ fontFamily: "'Rajdhani', sans-serif" }}>
          Buy More Tokens
        </button>
      </div>
    )
  }

  return (
    <div className="rounded-2xl p-6 sm:p-8 space-y-5"
      style={{ background: "rgba(10,14,20,0.9)", border: "1px solid rgba(240,180,41,0.2)", backdropFilter: "blur(20px)" }}>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
            style={{ background: "rgba(240,180,41,0.1)", border: "1px solid rgba(240,180,41,0.2)" }}>💰</div>
          <div>
            <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.6rem", color: "#f0b429", letterSpacing: "0.05em" }}>
              Buy MDAO Tokens
            </h3>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Rajdhani', sans-serif" }}>
              Phase {phase} · {priceDisplay} per MDAO
            </p>
          </div>
        </div>
        {mounted && isConnected && (
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "'Rajdhani', sans-serif" }}>
              Balance
            </p>
            <p className="text-sm font-bold" style={{ color: "#f0b429", fontFamily: "'JetBrains Mono', monospace" }}>
              ${usdtBalance.toFixed(2)} USDT
            </p>
          </div>
        )}
      </div>

      {/* Quick amounts */}
      <div>
        <p className="text-xs mb-2 uppercase tracking-wider font-semibold"
          style={{ color: "rgba(255,255,255,0.3)", fontFamily: "'Rajdhani', sans-serif" }}>
          Quick Select (USDT)
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {QUICK_AMOUNTS.map((q) => (
            <button key={q} onClick={() => setInputAmount(String(q))}
              className="rounded-lg py-2 text-sm font-bold transition-all duration-200"
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontWeight: 700,
                background: inputAmount === String(q) ? "rgba(240,180,41,0.15)" : "rgba(240,180,41,0.05)",
                border: inputAmount === String(q) ? "1px solid rgba(240,180,41,0.5)" : "1px solid rgba(240,180,41,0.1)",
                color: inputAmount === String(q) ? "#f0b429" : "rgba(255,255,255,0.4)",
              }}>
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Amount input */}
      <div>
        <label className="block text-xs mb-2 uppercase tracking-widest font-semibold"
          style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Rajdhani', sans-serif" }}>
          Amount (USDT)
        </label>
        <div className="relative">
          <input type="number" value={inputAmount} onChange={(e) => setInputAmount(e.target.value)}
            placeholder="0.00" className="w-full rounded-xl px-4 py-4 pr-20 input-gold"
            style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "1.1rem" }} />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold"
            style={{ color: "#f0b429", fontFamily: "'Rajdhani', sans-serif" }}>USDT</span>
        </div>
        <p className="text-xs mt-1.5" style={{ color: "rgba(255,255,255,0.25)", fontFamily: "'Rajdhani', sans-serif" }}>
          Min: {minUsdt} USDT &nbsp;|&nbsp; Max: {MAX_PURCHASE_USDT.toLocaleString()} USDT &nbsp;|&nbsp; Max Allocation: {maxTokens > 0 ? `${maxTokens.toLocaleString()} MDAO` : "No limit"}
        </p>
          <p className="text-[11px] mt-1" style={{ color: "rgba(255,255,255,0.25)", fontFamily: "'Rajdhani', sans-serif" }}>
          {IS_TESTNET ? "BSC Testnet USDT only." : "BEP-20 USDT on BNB Chain only."}
        </p>
      </div>

      {/* You will receive */}
      <div className="rounded-xl p-5 text-center"
        style={{ background: "rgba(5,7,10,0.8)", border: "1px solid rgba(240,180,41,0.1)" }}>
        <p className="text-xs mb-1" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "'Rajdhani', sans-serif" }}>
          You will receive
        </p>
        <p style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
          color: usdtAmount > 0 ? "#f0b429" : "rgba(240,180,41,0.2)",
          letterSpacing: "0.05em",
          textShadow: usdtAmount > 0 ? "0 0 20px rgba(240,180,41,0.5)" : "none",
          transition: "all 0.3s ease",
        }}>
          {usdtAmount > 0 ? `${formatTokenDisplay(mdaoReceive)} MDAO` : "— MDAO"}
        </p>
        {usdtAmount > 0 && (
          <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.25)", fontFamily: "'Rajdhani', sans-serif" }}>
            @ {priceDisplay} per MDAO
          </p>
        )}
      </div>

      {/* Action buttons */}
      {!mounted || !isConnected ? (
        <div className="rounded-xl p-4 text-center"
          style={{ background: "rgba(240,180,41,0.05)", border: "1px solid rgba(240,180,41,0.15)" }}>
          <p className="text-sm font-semibold" style={{ color: "rgba(240,180,41,0.6)", fontFamily: "'Rajdhani', sans-serif" }}>
            Connect your wallet to participate
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Approve USDT */}
          <button onClick={handleApprove}
            disabled={!isValid || isAlreadyApproved || isApproving || isBuying}
            className="rounded-xl py-4 text-sm font-bold uppercase tracking-wider transition-all duration-300 btn-outline-gold disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ fontFamily: "'Rajdhani', sans-serif", letterSpacing: "0.1em" }}>
            {isApproving
              ? isWaitingForApproveWallet
                ? "Waiting for wallet..."
                : "Confirming Approval..."
              : isAlreadyApproved
              ? "✓ Approved"
              : "✓ Approve USDT"}
          </button>

          {/* Buy Tokens */}
          <button onClick={handleBuy}
            disabled={!canBuy || isBuying || isApproving}
            className="rounded-xl py-4 text-sm font-bold uppercase tracking-wider btn-gold disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ fontFamily: "'Rajdhani', sans-serif", letterSpacing: "0.1em" }}>
            {isBuying ? isWaitingForBuyWallet ? "Waiting for wallet..." : "Confirming Purchase..." : "🚀 Buy Tokens"}
          </button>
        </div>
      )}

      {mounted && isConnected && !isSupportedChain && (
        <div className="rounded-lg p-3 text-center"
          style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)" }}>
          <p className="text-xs" style={{ color: "#ef4444", fontFamily: "'Rajdhani', sans-serif" }}>
            Wrong network. Please switch to {ACTIVE_CHAIN_CONFIG.name}.
          </p>
        </div>
      )}

      {pendingMessage && (
        <div className="rounded-lg p-3 text-center text-xs leading-5"
          style={{ background: "rgba(240,180,41,0.06)", border: "1px solid rgba(240,180,41,0.16)", color: "rgba(255,255,255,0.55)", fontFamily: "'Rajdhani', sans-serif" }}>
          <div className="mb-3">
            <div className="mb-2 flex items-center justify-between text-[11px] uppercase tracking-[0.18em]"
              style={{ color: "rgba(240,180,41,0.72)" }}>
              <span>{pendingStageLabel ?? "Processing request"}</span>
              <span>{Math.round(pendingProgress)}%</span>
            </div>
            <div className="mb-2 grid gap-1 text-[11px]"
              style={{ color: "rgba(255,255,255,0.56)" }}>
              <span>{pendingMessage ? "✅ Wallet request started" : "• Wallet request started"}</span>
              <span>{approveTxHash || buyTxHash ? "✅ Transaction signed" : "⏳ Waiting for wallet confirmation..."}</span>
              <span>{isConfirmingChain ? "⏳ Confirming on BNB Chain..." : "• Confirming on BNB Chain"}</span>
            </div>
            <p className="mb-2 text-[11px]"
              style={{ color: "rgba(255,255,255,0.42)" }}>
              This usually takes 1-2 minutes.
            </p>
            <p className="mb-2 rounded-md px-2 py-1 text-[11px]"
              style={{ background: "rgba(239,68,68,0.08)", color: "rgba(248,113,113,0.9)" }}>
              Keep this page open. Closing it won&apos;t cancel your transaction.
            </p>
            <div className="h-2 overflow-hidden rounded-full"
              style={{ background: "rgba(255,255,255,0.08)" }}>
              <div
                className="h-full rounded-full animate-pulse transition-[width] duration-700 ease-out"
                style={{
                  width: `${pendingProgress}%`,
                  background: "linear-gradient(90deg, rgba(240,180,41,0.55) 0%, rgba(240,180,41,0.95) 55%, rgba(46,216,163,0.9) 100%)",
                  boxShadow: "0 0 18px rgba(240,180,41,0.3)",
                }}
              />
            </div>
          </div>
          {pendingMessage}
          {showSupportLink && (
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="mt-3 block underline"
              style={{ color: "rgba(240,180,41,0.84)" }}>
              Taking longer than usual? Contact support
            </a>
          )}
          {isUsingCustomWallet && canOpenWallet && (isWaitingForApproveWallet || isWaitingForBuyWallet) && (
            <button
              onClick={openCustomWalletApp}
              className="mt-3 block w-full rounded-lg px-3 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-200"
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                background: "rgba(240,180,41,0.1)",
                border: "1px solid rgba(240,180,41,0.22)",
                color: "#f0b429",
              }}>
              Open Wallet
            </button>
          )}
          {isUsingCustomWallet && !canOpenWallet && (isWaitingForApproveWallet || isWaitingForBuyWallet) && (
            <div className="mt-3 rounded-lg px-3 py-2 text-xs leading-5"
              style={{
                background: "rgba(240,180,41,0.08)",
                border: "1px solid rgba(240,180,41,0.16)",
                color: "rgba(255,255,255,0.6)",
              }}>
              On iPhone, keep ValorUp open after QR connection and wait for the request to appear there.
            </div>
          )}
        </div>
      )}

      {/* Approve tx hash link */}
      {approveTxHash && step === "approved" && (
        <a href={getTxLink(approveTxHash)} target="_blank" rel="noopener noreferrer"
          className="block text-center text-xs py-1"
          style={{ color: "rgba(46,216,163,0.6)", fontFamily: "'Rajdhani', sans-serif" }}>
          ✓ Approval confirmed — View on BscScan ↗
        </a>
      )}

      {/* Error */}
      {isError && error && (
        <div className="rounded-lg p-3 text-center"
          style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)" }}>
          <p className="text-xs" style={{ color: "#ef4444", fontFamily: "'Rajdhani', sans-serif" }}>
            ⚠️ {error}
          </p>
          <button onClick={reset} className="text-xs mt-1 underline" style={{ color: "rgba(255,255,255,0.3)" }}>
            Try again
          </button>
        </div>
      )}

      {/* Validation error */}
      {inputAmount && !isValid && (
        <p className="text-center text-xs" style={{ color: "#ef4444", fontFamily: "'Rajdhani', sans-serif" }}>
          Amount must be at least {minUsdt} USDT, no more than {MAX_PURCHASE_USDT} USDT, and within your remaining allocation
        </p>
      )}
    </div>
  )
}
