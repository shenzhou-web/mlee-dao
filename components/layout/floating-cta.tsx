"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-gradient-to-t from-black via-black/95 to-transparent backdrop-blur-sm border-t border-white/10 animate-fade-in-up">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="text-center sm:text-left animate-slide-in-left">
          <p className="text-sm text-gray-400">Don't miss out</p>
          <p className="font-bold text-white">Join the MDAO Revolution</p>
        </div>

        <div className="flex flex-wrap gap-2 justify-center animate-slide-in-right">
          <Link href="/presale">
            <Button
              size="sm"
              className="bg-gradient-to-r from-primary to-accent text-black font-bold hover:opacity-90 hover-lift transition-smooth animate-glow"
            >
              Join Presale
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/airdrop">
            <Button
              size="sm"
              variant="outline"
              className="border-secondary text-secondary hover:bg-secondary/20 hover:text-secondary bg-transparent font-semibold hover-lift transition-smooth"
            >
              Claim Airdrop
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/referral">
            <Button
              size="sm"
              variant="outline"
              className="border-primary/50 text-primary hover:bg-primary/10 hover:text-primary bg-transparent font-semibold hover-lift transition-smooth"
            >
              Refer & Earn
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
