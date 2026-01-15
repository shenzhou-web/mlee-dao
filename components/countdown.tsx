"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export function MDAOCountdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 90,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    // Set target date to 90 days from now
    const targetDate = new Date()
    targetDate.setDate(targetDate.getDate() + 90)

    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = targetDate.getTime() - now

      if (distance < 0) {
        clearInterval(timer)
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="max-w-4xl mx-auto animate-fade-in-up delay-400">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-blue-500/10 border border-emerald-500/20 mb-6">
        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
        <span className="text-sm font-medium text-emerald-400">90-Day Presale & Airdrop Countdown</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <Card className="bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 backdrop-blur-sm border-emerald-500/20 p-4 sm:p-6 text-center">
          <div className="text-3xl sm:text-5xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            {String(timeLeft.days).padStart(2, "0")}
          </div>
          <div className="text-xs sm:text-sm text-gray-400 mt-2">Days</div>
        </Card>

        <Card className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-sm border-cyan-500/20 p-4 sm:p-6 text-center">
          <div className="text-3xl sm:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            {String(timeLeft.hours).padStart(2, "0")}
          </div>
          <div className="text-xs sm:text-sm text-gray-400 mt-2">Hours</div>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500/10 to-emerald-500/10 backdrop-blur-sm border-blue-500/20 p-4 sm:p-6 text-center">
          <div className="text-3xl sm:text-5xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
            {String(timeLeft.minutes).padStart(2, "0")}
          </div>
          <div className="text-xs sm:text-sm text-gray-400 mt-2">Minutes</div>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-500/10 to-blue-500/10 backdrop-blur-sm border-emerald-500/20 p-4 sm:p-6 text-center">
          <div className="text-3xl sm:text-5xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
            {String(timeLeft.seconds).padStart(2, "0")}
          </div>
          <div className="text-xs sm:text-sm text-gray-400 mt-2">Seconds</div>
        </Card>
      </div>
    </div>
  )
}
