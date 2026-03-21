"use client"

import { usePresaleData } from "@/hooks/usePresaleData"

export function PresaleProgress() {
  const { progress, totalSoldDisplay, hardCapDisplay, phase, isLoading } = usePresaleData()

  const phaseColors = ["", "#f0b429", "#2ed8a3", "#a78bfa"]
  const activeColor = phaseColors[phase] || "#f0b429"

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <span className="text-sm font-semibold uppercase tracking-wider"
          style={{ fontFamily: "'Rajdhani', sans-serif", color: "rgba(255,255,255,0.7)" }}>
          Presale Progress
        </span>
        <div className="flex items-center gap-3">
          <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "'JetBrains Mono', monospace" }}>
            {isLoading ? "..." : `${totalSoldDisplay} / ${hardCapDisplay} MDAO`}
          </span>
          <span className="text-sm font-bold"
            style={{ fontFamily: "'Bebas Neue', sans-serif", color: activeColor, letterSpacing: "0.05em" }}>
            {isLoading ? "..." : `${progress.toFixed(2)}%`}
          </span>
        </div>
      </div>

      <div className="relative h-3 rounded-full overflow-hidden"
        style={{ background: "rgba(240,180,41,0.08)", border: "1px solid rgba(240,180,41,0.15)" }}>
        <div
          className="h-full rounded-full relative progress-shine transition-all duration-700 ease-out"
          style={{
            width: `${Math.max(progress, 0.3)}%`,
            background: `linear-gradient(90deg, ${activeColor}99, ${activeColor}, ${activeColor}cc)`,
            boxShadow: `0 0 10px ${activeColor}80`,
            minWidth: "8px",
          }}
        />
      </div>

      {/* Phase markers */}
      <div className="relative">
        <div className="flex justify-between text-[10px]"
          style={{ color: "rgba(255,255,255,0.3)", fontFamily: "'Rajdhani', sans-serif" }}>
          <span className={phase >= 1 ? "text-yellow-500" : ""}>Phase 1 (35%)</span>
          <span className={phase >= 2 ? "text-green-400"  : ""}>Phase 2 (35%)</span>
          <span className={phase >= 3 ? "text-purple-400" : ""}>Phase 3 (30%)</span>
        </div>
      </div>
    </div>
  )
}
