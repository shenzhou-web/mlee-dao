"use client"

import { ConnectWalletButton } from "@/components/connectWalletButton"
import { MDAOCountdown } from "@/components/countdown"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Wallet, TrendingUp, Lock, Clock } from "lucide-react"
import Link from "next/link"

export default function PresalePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
            <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              MDAO Presale
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="pt-24 pb-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Countdown */}
          <div className="mb-12">
            <MDAOCountdown />
          </div>

          {/* Presale Info */}
          <Card className="p-8 mb-8 bg-gradient-to-br from-primary/10 via-secondary/10 to-primary/10 border-primary/20 backdrop-blur-sm">
            <h2 className="text-3xl font-bold mb-6 text-white text-center">90-Day Presale Program</h2>
            <p className="text-gray-300 text-center mb-8 leading-relaxed">
              Join our presale to secure MDAO tokens at favorable rates. Three progressive pricing phases with linear
              vesting to protect long-term holders.
            </p>

            {/* Core Principles */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card className="p-6 bg-black/40 border-white/10">
                <h3 className="font-bold text-primary mb-2">Minimal Rules</h3>
                <p className="text-sm text-gray-400">Simple, straightforward participation process</p>
              </Card>
              <Card className="p-6 bg-black/40 border-white/10">
                <h3 className="font-bold text-secondary mb-2">Transparent Governance</h3>
                <p className="text-sm text-gray-400">All decisions made openly and fairly</p>
              </Card>
              <Card className="p-6 bg-black/40 border-white/10">
                <h3 className="font-bold text-primary mb-2">Long-Term Alignment</h3>
                <p className="text-sm text-gray-400">Vesting protects holder value</p>
              </Card>
            </div>
          </Card>

          {/* Pricing Phases */}
          <h3 className="text-2xl font-bold mb-6 text-center">Three Progressive Pricing Phases</h3>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="p-6 bg-white/5 border-primary/20 hover:border-primary/40 transition-all">
              <div className="text-4xl font-bold text-primary mb-2">Phase 1</div>
              <div className="text-2xl font-bold mb-4">Early Bird</div>
              <p className="text-gray-400 text-sm mb-4">Best price for early supporters</p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Duration:</span>
                  <span className="text-white font-medium">Days 1-30</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Allocation:</span>
                  <span className="text-white font-medium">35%</span>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-white/5 border-secondary/20 hover:border-secondary/40 transition-all">
              <div className="text-4xl font-bold text-secondary mb-2">Phase 2</div>
              <div className="text-2xl font-bold mb-4">Standard</div>
              <p className="text-gray-400 text-sm mb-4">Fair pricing for participants</p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Duration:</span>
                  <span className="text-white font-medium">Days 31-60</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Allocation:</span>
                  <span className="text-white font-medium">35%</span>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-white/5 border-accent/20 hover:border-accent/40 transition-all">
              <div className="text-4xl font-bold text-accent mb-2">Phase 3</div>
              <div className="text-2xl font-bold mb-4">Final</div>
              <p className="text-gray-400 text-sm mb-4">Last chance to participate</p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Duration:</span>
                  <span className="text-white font-medium">Days 61-90</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Allocation:</span>
                  <span className="text-white font-medium">30%</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Card className="p-6 bg-white/5 border-white/10 hover:border-primary/30 transition-all group">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Lock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2">Linear Vesting</h4>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    Tokens vest linearly over time to protect long-term holder value and prevent dumping
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-white/5 border-white/10 hover:border-secondary/30 transition-all group">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2">Progressive Pricing</h4>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    Three phases reward early participants while allowing fair access throughout the presale
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-white/5 border-white/10 hover:border-accent/30 transition-all group">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Wallet className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2">Easy Participation</h4>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    Connect your wallet and participate directly through our secure platform
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-white/5 border-white/10 hover:border-primary/30 transition-all group">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2">90-Day Duration</h4>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    Extended presale period ensures fair distribution and community building
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* CTA */}
          <Card className="p-8 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border-primary/20 text-center">
            <h3 className="text-2xl font-bold mb-4">Ready to Join the Presale?</h3>
            <p className="text-gray-300 mb-6">Connect your wallet to participate in the MDAO presale</p>
            {/* <Button
              size="lg"
              className="bg-gradient-to-r from-primary via-secondary to-accent text-black font-bold px-12 py-6 text-lg hover:scale-105 transition-all"
            >
              <Wallet className="w-5 h-5 mr-2" />
              Connect Wallet
            </Button> */}
            <ConnectWalletButton />
            <p className="text-xs text-gray-500 mt-4">Audit Report Coming Soon</p>
          </Card>
        </div>
      </div>
    </main>
  )
}
