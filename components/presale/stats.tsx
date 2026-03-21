"use client"

import { usePresaleData } from "@/hooks/usePresaleData"
import { useUserData } from "@/hooks/useUserData"
import { useEffect, useState } from "react"

export function PresaleStats() {
  const { totalSoldDisplay, hardCapDisplay, totalRaisedDisplay, priceDisplay, totalBuyers, isLoading } = usePresaleData()
  const { usdtBalance, isConnected } = useUserData()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  function StatCard({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 rounded-xl p-4 sm:p-5 transition-all duration-300 hover:-translate-y-1"
        style={{
          background: "rgba(13,17,26,0.7)",
          border: `1px solid ${highlight ? "rgba(240,180,41,0.3)" : "rgba(240,180,41,0.15)"}`,
          backdropFilter: "blur(10px)",
          boxShadow: highlight ? "0 0 20px rgba(240,180,41,0.08)" : "none",
        }}>
        <span className="uppercase tracking-widest text-[10px] sm:text-xs font-semibold"
          style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Rajdhani', sans-serif" }}>
          {label}
        </span>
        <span style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)",
          color: "#f0b429",
          letterSpacing: "0.05em",
          textShadow: "0 0 15px rgba(240,180,41,0.4)",
          opacity: isLoading ? 0.4 : 1,
          transition: "opacity 0.3s",
        }}>
          {isLoading ? "..." : value}
        </span>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
      <StatCard label="Price"        value={priceDisplay}      highlight />
      <StatCard label="Hard Cap"     value={`${hardCapDisplay} MDAO`} />
      <StatCard label="Total Sold"   value={`${totalSoldDisplay} MDAO`} />
      <StatCard
        label={mounted && isConnected ? "Your USDT Balance" : "Total Buyers"}
        value={mounted && isConnected ? `$${usdtBalance.toFixed(2)}` : `${totalBuyers}`}
      />
    </div>
  )
}
