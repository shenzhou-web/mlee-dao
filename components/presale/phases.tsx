"use client"

import { usePresaleData } from "@/hooks/usePresaleData"

interface PhaseCardProps {
  phase: number
  name: string
  days: string
  allocation: string
  price: string
  isActive?: boolean
  accentColor: string
  glowColor: string
}

function PhaseCard({ phase, name, days, allocation, price, isActive, accentColor, glowColor }: PhaseCardProps) {
  return (
    <div
      className="relative rounded-2xl p-6 transition-all duration-300 hover:-translate-y-2 group"
      style={{
        background: isActive
          ? `linear-gradient(135deg, ${glowColor}15 0%, rgba(10,14,20,0.95) 100%)`
          : "rgba(10, 14, 20, 0.8)",
        border: `1px solid ${isActive ? accentColor + "50" : accentColor + "25"}`,
        boxShadow: isActive ? `0 0 30px ${glowColor}15` : "none",
      }}
    >
      {isActive && (
        <div
          className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider"
          style={{
            background: `${accentColor}20`,
            border: `1px solid ${accentColor}50`,
            color: accentColor,
            fontFamily: "'Rajdhani', sans-serif",
          }}
        >
          Active
        </div>
      )}

      <div className="mb-5">
        <p
          className="text-xs uppercase tracking-widest mb-1 font-semibold"
          style={{ color: `${accentColor}80`, fontFamily: "'Rajdhani', sans-serif" }}
        >
          Phase {phase}
        </p>
        <h3
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(1.6rem, 3.5vw, 2rem)",
            color: accentColor,
            letterSpacing: "0.05em",
            textShadow: `0 0 15px ${glowColor}60`,
          }}
        >
          {name}
        </h3>
      </div>

      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 py-2 border-b" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
          <span className="text-sm" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Rajdhani', sans-serif" }}>Duration</span>
          <span className="text-sm font-bold sm:text-right" style={{ color: "white", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.8rem" }}>{days}</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 py-2 border-b" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
          <span className="text-sm" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Rajdhani', sans-serif" }}>Allocation</span>
          <span className="text-sm font-bold sm:text-right" style={{ color: accentColor, fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.1rem", letterSpacing: "0.05em" }}>{allocation}</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 py-2">
          <span className="text-sm" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Rajdhani', sans-serif" }}>Price</span>
          <span className="text-sm font-bold sm:text-right" style={{ color: accentColor, fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.1rem", letterSpacing: "0.05em" }}>{price}</span>
        </div>
      </div>

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-6 right-6 h-px rounded-full transition-all duration-300 group-hover:left-0 group-hover:right-0"
        style={{ background: `linear-gradient(90deg, transparent, ${accentColor}60, transparent)` }}
      />
    </div>
  )
}

const phases = [
  {
    phase: 1,
    name: "Early Bird",
    days: "Days 1–30",
    allocation: "35%",
    price: "$0.010",
    accentColor: "#f0b429",
    glowColor: "rgba(240,180,41)",
  },
  {
    phase: 2,
    name: "Standard",
    days: "Days 31–60",
    allocation: "35%",
    price: "$0.050",
    accentColor: "#2ed8a3",
    glowColor: "rgba(46,216,163)",
  },
  {
    phase: 3,
    name: "Final",
    days: "Days 61–90",
    allocation: "30%",
    price: "$0.100",
    accentColor: "#a78bfa",
    glowColor: "rgba(167,139,250)",
  },
]

export function PricingPhases() {
  const { phase } = usePresaleData()

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <p className="text-xs uppercase tracking-widest font-semibold" style={{ color: "rgba(240,180,41,0.6)", fontFamily: "'Rajdhani', sans-serif" }}>
          Token Distribution
        </p>
        <h2
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(2rem, 4vw, 2.8rem)",
            color: "white",
            letterSpacing: "0.05em",
          }}
        >
          Three Progressive Pricing Phases
        </h2>
        <p className="text-sm max-w-lg 2xl:max-w-2xl mx-auto" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Rajdhani', sans-serif" }}>
          Early supporters get the best prices. Each phase rewards participation and builds community momentum.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
        {phases.map((p) => (
          <PhaseCard key={p.phase} {...p} isActive={phase === p.phase} />
        ))}
      </div>
    </div>
  )
}
