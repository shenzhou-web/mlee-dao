"use client"

import { useState, useEffect } from "react"
import { usePresaleData } from "@/hooks/usePresaleData"
import { timeUntil, getPhaseName, getPhasePrice } from "@/lib/utils"

function pad(n: number) { return String(n).padStart(2, "0") }

function TimeBlock({ value, label }: { value: number; label: string }) {
  const [flip, setFlip] = useState(false)
  const [prev, setPrev] = useState(value)

  useEffect(() => {
    if (value !== prev) {
      setFlip(true)
      setTimeout(() => { setPrev(value); setFlip(false) }, 300)
    }
  }, [value, prev])

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative flex items-center justify-center rounded-xl overflow-hidden"
        style={{
          width: "clamp(70px,12vw,110px)", height: "clamp(70px,12vw,110px)",
          background: "linear-gradient(180deg, rgba(240,180,41,0.08) 0%, rgba(13,17,26,0.95) 100%)",
          border: "1px solid rgba(240,180,41,0.25)",
          boxShadow: "0 0 30px rgba(240,180,41,0.06), inset 0 1px 0 rgba(240,180,41,0.15)",
        }}>
        <div className="absolute inset-x-0 z-10" style={{ top: "50%", height: "1px", background: "rgba(240,180,41,0.2)" }} />
        <span style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "clamp(2rem,5vw,3.5rem)",
          color: "#f0b429",
          letterSpacing: "0.05em",
          lineHeight: 1,
          textShadow: "0 0 20px rgba(240,180,41,0.6)",
          transition: "all 0.3s ease",
          transform: flip ? "translateY(-4px)" : "translateY(0)",
          opacity: flip ? 0.6 : 1,
        }}>
          {pad(value)}
        </span>
      </div>
      <span className="uppercase tracking-widest text-xs"
        style={{ color: "rgba(240,180,41,0.5)", fontFamily: "'Rajdhani', sans-serif", fontWeight: 600 }}>
        {label}
      </span>
    </div>
  )
}

const SEP = (
  <span style={{
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: "clamp(1.5rem,3vw,2.5rem)",
    color: "rgba(240,180,41,0.3)",
    lineHeight: 1,
    marginBottom: "22px",
    alignSelf: "center",
  }}>:</span>
)

export function PresaleCountdown() {
  const { presaleEndTimestamp, phase1Start, phase2Start, phase3Start, phase, isLoading } = usePresaleData()

  // Determine what we're counting down TO
  // If presale hasn't started: count to phase1Start
  // If in phase 1: count to phase2Start
  // If in phase 2: count to phase3Start
  // If in phase 3: count to presaleEndTimestamp
  const targetTimestamp = (() => {
    const now = Date.now() / 1000
    if (now < phase1Start) return phase1Start
    if (phase === 1) return phase2Start
    if (phase === 2) return phase3Start
    if (phase === 3) return presaleEndTimestamp
    return presaleEndTimestamp
  })()

  const label = (() => {
    const now = Date.now() / 1000
    if (now < phase1Start)    return "⚡ Presale Starts In"
    if (phase === 1)          return "⏱ Phase 2 Starts In"
    if (phase === 2)          return "⏱ Phase 3 Starts In"
    if (phase === 3)          return "🔥 Presale Ends In"
    return "Presale"
  })()

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    if (!targetTimestamp) return
    const update = () => setTimeLeft(timeUntil(targetTimestamp))
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [targetTimestamp])

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Phase badge */}
      {!isLoading && phase > 0 && (
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full"
            style={{ background: "rgba(240,180,41,0.1)", border: "1px solid rgba(240,180,41,0.2)" }}>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
            </span>
            <span className="text-xs font-bold uppercase tracking-widest"
              style={{ color: "#f0b429", fontFamily: "'Rajdhani', sans-serif" }}>
              Phase {phase} — {getPhaseName(phase)} · {getPhasePrice(phase)} per MDAO
            </span>
          </div>
        </div>
      )}

      <p className="uppercase tracking-[0.3em] text-xs font-semibold"
        style={{ color: "rgba(240,180,41,0.55)", fontFamily: "'Rajdhani', sans-serif" }}>
        {label}
      </p>

      <div className="hidden sm:flex items-end gap-5">
        <TimeBlock value={timeLeft.days}    label="Days"    />
        {SEP}
        <TimeBlock value={timeLeft.hours}   label="Hours"   />
        {SEP}
        <TimeBlock value={timeLeft.minutes} label="Minutes" />
        {SEP}
        <TimeBlock value={timeLeft.seconds} label="Seconds" />
      </div>
      <div className="grid grid-cols-2 gap-4 sm:hidden">
        <TimeBlock value={timeLeft.days}    label="Days"    />
        <TimeBlock value={timeLeft.hours}   label="Hours"   />
        <TimeBlock value={timeLeft.minutes} label="Minutes" />
        <TimeBlock value={timeLeft.seconds} label="Seconds" />
      </div>
    </div>
  )
}
