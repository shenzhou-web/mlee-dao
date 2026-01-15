"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Check, Gift, Users, Share2, Zap } from "lucide-react"
import Link from "next/link"

export default function AirdropPage() {
  const [walletConnected, setWalletConnected] = useState(false)

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
            <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
              MDAO Airdrop
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="pt-24 pb-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-secondary to-primary flex items-center justify-center mx-auto mb-6">
              <Gift className="w-10 h-10 text-black" />
            </div>
            <h2 className="text-4xl font-bold mb-4">The MDAO Airdrop</h2>
            <p className="text-xl text-secondary font-semibold mb-2">Not a Giveaway</p>
            <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed">
              It's a consensus selection mechanism. Earn your allocation by connecting, joining, sharing, and referring.
            </p>
          </div>

          {/* How to Earn */}
          <Card className="p-8 mb-8 bg-gradient-to-br from-secondary/10 via-primary/10 to-secondary/10 border-secondary/20 backdrop-blur-sm">
            <h3 className="text-2xl font-bold mb-6 text-center">Earn Airdrop Allocation By:</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center flex-shrink-0">
                  <Check className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Connecting Your Wallet</h4>
                  <p className="text-sm text-gray-400">Link your wallet to verify participation</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Joining the Community</h4>
                  <p className="text-sm text-gray-400">Engage with our Telegram and social channels</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <Share2 className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Sharing the Vision</h4>
                  <p className="text-sm text-gray-400">Spread the word about MLEE DAO</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center flex-shrink-0">
                  <Zap className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Referring New Members</h4>
                  <p className="text-sm text-gray-400">Higher referrals = higher weight</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Participation Card */}
          {!walletConnected ? (
            <Card className="p-8 bg-white/5 border-white/10 text-center">
              <h3 className="text-2xl font-bold mb-4">Get Started</h3>
              <p className="text-gray-300 mb-6">Connect your wallet to start earning airdrop allocation</p>
              <Button
                size="lg"
                onClick={() => setWalletConnected(true)}
                className="bg-gradient-to-r from-secondary via-primary to-secondary text-black font-bold px-12 py-6 text-lg hover:scale-105 transition-all"
              >
                Connect Wallet
              </Button>
            </Card>
          ) : (
            <Card className="p-8 bg-gradient-to-br from-secondary/10 via-primary/10 to-secondary/10 border-secondary/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center">
                  <Check className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Wallet Connected</h3>
                  <p className="text-sm text-gray-400">0x1234...5678</p>
                </div>
              </div>

              <div className="space-y-6">
                {/* Tasks */}
                <div>
                  <h4 className="font-bold mb-4">Complete Tasks:</h4>
                  <div className="space-y-3">
                    <Card className="p-4 bg-black/40 border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-secondary/20 flex items-center justify-center">
                          <Users className="w-4 h-4 text-secondary" />
                        </div>
                        <span className="font-medium">Join Telegram</span>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-secondary/30 hover:bg-secondary/10 bg-transparent"
                      >
                        Join
                      </Button>
                    </Card>

                    <Card className="p-4 bg-black/40 border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                          <Share2 className="w-4 h-4 text-primary" />
                        </div>
                        <span className="font-medium">Follow on X (Twitter)</span>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-primary/30 hover:bg-primary/10 bg-transparent"
                      >
                        Follow
                      </Button>
                    </Card>
                  </div>
                </div>

                {/* Allocation */}
                <div className="p-6 bg-black/40 border border-secondary/20 rounded-xl">
                  <h4 className="font-bold mb-2">Your Current Allocation</h4>
                  <div className="text-3xl font-bold text-secondary mb-2">0 MDAO</div>
                  <p className="text-sm text-gray-400">Complete tasks and refer friends to increase your allocation</p>
                </div>

                <Link href="/referral">
                  <Button className="w-full bg-gradient-to-r from-accent via-secondary to-primary text-black font-bold">
                    Get Referral Link
                  </Button>
                </Link>
              </div>
            </Card>
          )}
        </div>
      </div>
    </main>
  )
}
