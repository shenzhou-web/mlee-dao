"use client"

import { useUserData } from "@/hooks/useUserData"
import { useClaimTokens } from "@/hooks/useContractActions"
import { usePresaleData } from "@/hooks/usePresaleData"
import { getTxLink } from "@/lib/utils"
import { useEffect, useState } from "react"

const UNLOCK_SCHEDULE = [
  { event: "TGE (Token Generation Event)", percent: "20%", color: "#f0b429" },
  { event: "Month 1",   percent: "10%",      color: "#f0b429" },
  { event: "Month 2",   percent: "10%",      color: "#e8a820" },
  { event: "Months 3–8", percent: "10% each", color: "#c88d14" },
]

export function VestingSchedule() {
  const { isConnected, totalAllocatedDisplay, claimedDisplay, claimableNowDisplay,
          remainingLockedDisplay, nextUnlockTimeDisplay, hasClaimable, isLoading } = useUserData()
  const { isVestingStarted } = usePresaleData()
  const { claim, isLoading: isClaiming, isSuccess, error, txHash, reset } = useClaimTokens()
  const [mounted, setMounted] = useState(false)
  const displayLoading = !mounted || isLoading

  useEffect(() => {
    setMounted(true)
  }, [])

  function VestingRow({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
    return (
      <div className="flex justify-between items-center px-5 py-4 rounded-xl"
        style={{ background: "rgba(5,7,10,0.7)", border: "1px solid rgba(240,180,41,0.08)" }}>
        <span className="text-sm" style={{ color: "rgba(255,255,255,0.6)", fontFamily: "'Rajdhani', sans-serif", fontWeight: 500 }}>
          {label}
        </span>
        <span className="text-sm font-bold"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            color: highlight ? "#f0b429" : "rgba(255,255,255,0.8)",
            textShadow: highlight ? "0 0 10px rgba(240,180,41,0.4)" : "none",
            opacity: displayLoading ? 0.4 : 1,
          }}>
          {displayLoading ? "..." : value}
        </span>
      </div>
    )
  }

  return (
    <div className="rounded-2xl p-6 sm:p-8 space-y-6"
      style={{ background: "rgba(10,14,20,0.9)", border: "1px solid rgba(240,180,41,0.2)", backdropFilter: "blur(20px)" }}>

      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
          style={{ background: "rgba(240,180,41,0.1)", border: "1px solid rgba(240,180,41,0.2)" }}>📊</div>
        <div>
          <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.6rem", color: "#f0b429", letterSpacing: "0.05em" }}>
            Vesting Schedule
          </h3>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Rajdhani', sans-serif" }}>
            {isVestingStarted ? "Vesting is live" : "Starts after TGE event"}
          </p>
        </div>
      </div>

      {/* Vesting data */}
      {mounted && isConnected ? (
        <div className="space-y-2">
          <VestingRow label="Total Allocated" value={`${totalAllocatedDisplay} MDAO`} />
          <VestingRow label="Claimable Now"   value={`${claimableNowDisplay} MDAO`} highlight />
          <VestingRow label="Already Claimed" value={`${claimedDisplay} MDAO`} />
          <VestingRow label="Remaining Locked" value={`${remainingLockedDisplay} MDAO`} />
          {nextUnlockTimeDisplay !== "—" && (
            <VestingRow label="Next Unlock" value={nextUnlockTimeDisplay} />
          )}
        </div>
      ) : (
        <div className="space-y-2">
          <VestingRow label="Total Allocated"  value="Connect wallet" />
          <VestingRow label="Claimable Now"    value="Connect wallet" highlight />
          <VestingRow label="Already Claimed"  value="Connect wallet" />
        </div>
      )}

      {/* Claim button */}
      {isSuccess ? (
        <div className="space-y-2">
          <div className="w-full rounded-xl py-4 text-center font-bold uppercase tracking-widest"
            style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1rem", letterSpacing: "0.15em",
              background: "rgba(46,216,163,0.1)", border: "1px solid rgba(46,216,163,0.3)", color: "#2ed8a3" }}>
            ✓ Tokens Claimed!
          </div>
          {txHash && (
            <a href={getTxLink(txHash, true)} target="_blank" rel="noopener noreferrer"
              className="block text-center text-xs py-1"
              style={{ color: "rgba(46,216,163,0.6)", fontFamily: "'Rajdhani', sans-serif" }}>
              View on BscScan ↗
            </a>
          )}
          <button onClick={reset} className="block w-full py-2 text-xs text-center underline"
            style={{ color: "rgba(255,255,255,0.3)" }}>Dismiss</button>
        </div>
      ) : (
        <button onClick={claim}
          disabled={!mounted || !isConnected || !hasClaimable || !isVestingStarted || isClaiming}
          className="w-full rounded-xl py-4 font-bold uppercase tracking-widest transition-all duration-300"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "1.1rem",
            letterSpacing: "0.15em",
            background: hasClaimable && isVestingStarted
              ? "linear-gradient(135deg, #c88d14, #f0b429)"
              : "linear-gradient(135deg, rgba(200,141,20,0.3), rgba(240,180,41,0.15))",
            border: "1px solid rgba(240,180,41,0.3)",
            color: hasClaimable && isVestingStarted ? "#05070a" : "rgba(240,180,41,0.4)",
            cursor: hasClaimable && isVestingStarted ? "pointer" : "not-allowed",
            boxShadow: hasClaimable && isVestingStarted ? "0 4px 20px rgba(240,180,41,0.25)" : "none",
          }}>
          {isClaiming ? "⏳ Claiming..." : !isVestingStarted ? "🔒 Vesting Not Started" : "🏛 Claim Tokens"}
        </button>
      )}

      {error && (
        <p className="text-xs text-center" style={{ color: "#ef4444", fontFamily: "'Rajdhani', sans-serif" }}>
          ⚠️ {error}
        </p>
      )}

      {/* Unlock Schedule */}
      <div>
        <div className="divider-gold mb-5" />
        <h4 className="text-sm uppercase tracking-wider mb-4 font-semibold"
          style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Rajdhani', sans-serif" }}>
          Unlock Schedule
        </h4>
        <div className="space-y-3">
          {UNLOCK_SCHEDULE.map((item, i) => (
            <div key={i} className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ background: item.color, boxShadow: `0 0 8px ${item.color}60` }} />
                <span className="text-sm" style={{ color: "rgba(255,255,255,0.55)", fontFamily: "'Rajdhani', sans-serif" }}>
                  {item.event}
                </span>
              </div>
              <span className="text-sm font-bold flex-shrink-0"
                style={{ fontFamily: "'JetBrains Mono', monospace", color: item.color }}>
                {item.percent}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Visual timeline */}
      <div className="rounded-xl p-4"
        style={{ background: "rgba(5,7,10,0.5)", border: "1px solid rgba(240,180,41,0.08)" }}>
        <p className="text-[10px] mb-3 uppercase tracking-wider"
          style={{ color: "rgba(255,255,255,0.25)", fontFamily: "'Rajdhani', sans-serif", fontWeight: 600 }}>
          Release Timeline
        </p>
        <div className="flex gap-1 h-5">
          {[20, 10, 10, 10, 10, 10, 10, 10, 10].map((pct, i) => (
            <div key={i} className="rounded-sm"
              style={{
                flex: pct,
                background: i === 0
                  ? "linear-gradient(180deg, #f0b429, #c88d14)"
                  : `rgba(240,180,41,${0.6 - i * 0.05})`,
                boxShadow: i === 0 ? "0 0 8px rgba(240,180,41,0.4)" : "none",
              }}
              title={`${pct}%`} />
          ))}
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.2)", fontFamily: "'Rajdhani', sans-serif" }}>TGE</span>
          <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.2)", fontFamily: "'Rajdhani', sans-serif" }}>Month 8</span>
        </div>
      </div>
    </div>
  )
}
