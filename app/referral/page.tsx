"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Copy, Check, Users, TrendingUp, Gift } from "lucide-react"
import Link from "next/link"

export default function ReferralPage() {
  const [walletConnected, setWalletConnected] = useState(false)
  const [copied, setCopied] = useState(false)
  const referralLink = "https://mleedao.com/ref/ABC123XYZ"

  const copyReferralLink = async () => {
    await navigator.clipboard.writeText(referralLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

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
            <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">
              MDAO Referral Program
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="pt-24 pb-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-accent to-secondary flex items-center justify-center mx-auto mb-6">
              <Users className="w-10 h-10 text-black" />
            </div>
            <h2 className="text-4xl font-bold mb-4">Referral Rewards</h2>
            <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Each wallet generates a unique referral link. Both sides receive rewards. More referrals = higher weight.
            </p>
          </div>

          {/* How It Works */}
          <Card className="p-8 mb-8 bg-gradient-to-br from-accent/10 via-secondary/10 to-primary/10 border-accent/20 backdrop-blur-sm">
            <h3 className="text-2xl font-bold mb-6 text-center">How It Works</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 rounded-xl bg-accent/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-accent">1</span>
                </div>
                <h4 className="font-bold mb-2">Generate Link</h4>
                <p className="text-sm text-gray-400">Connect your wallet to get your unique referral link</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 rounded-xl bg-secondary/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-secondary">2</span>
                </div>
                <h4 className="font-bold mb-2">Share Link</h4>
                <p className="text-sm text-gray-400">Share your link with friends and community</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 rounded-xl bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">3</span>
                </div>
                <h4 className="font-bold mb-2">Earn Rewards</h4>
                <p className="text-sm text-gray-400">Both you and your referrals receive increased allocation</p>
              </div>
            </div>
          </Card>

          {/* Referral Link */}
          {!walletConnected ? (
            <Card className="p-8 bg-white/5 border-white/10 text-center">
              <h3 className="text-2xl font-bold mb-4">Get Your Referral Link</h3>
              <p className="text-gray-300 mb-6">Connect your wallet to generate your unique referral link</p>
              <Button
                size="lg"
                onClick={() => setWalletConnected(true)}
                className="bg-gradient-to-r from-accent via-secondary to-primary text-black font-bold px-12 py-6 text-lg hover:scale-105 transition-all"
              >
                Connect Wallet
              </Button>
            </Card>
          ) : (
            <>
              <Card className="p-8 mb-8 bg-gradient-to-br from-accent/10 via-secondary/10 to-primary/10 border-accent/20">
                <h3 className="text-xl font-bold mb-4 text-center">Your Referral Link</h3>
                <div className="flex items-center gap-2 p-4 rounded-xl bg-black/40 border border-white/10 mb-6">
                  <Input
                    value={referralLink}
                    readOnly
                    className="flex-1 bg-transparent border-none text-accent font-mono"
                  />
                  <Button
                    onClick={copyReferralLink}
                    variant="outline"
                    className="border-accent/30 hover:bg-accent/10 flex-shrink-0 bg-transparent"
                  >
                    {copied ? <Check className="w-4 h-4 text-accent" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="p-6 bg-black/40 border border-white/10 rounded-xl text-center">
                    <div className="text-3xl font-bold text-accent mb-2">0</div>
                    <p className="text-sm text-gray-400">Total Referrals</p>
                  </div>
                  <div className="p-6 bg-black/40 border border-white/10 rounded-xl text-center">
                    <div className="text-3xl font-bold text-secondary mb-2">0 MDAO</div>
                    <p className="text-sm text-gray-400">Referral Rewards</p>
                  </div>
                </div>

                <p className="text-center text-sm text-gray-400">
                  Share your link to start earning referral rewards and increase your allocation weight
                </p>
              </Card>

              {/* Benefits */}
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-6 bg-white/5 border-white/10 hover:border-accent/30 transition-all group">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Gift className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-2">Both Sides Win</h4>
                      <p className="text-sm text-gray-400 leading-relaxed">
                        When someone uses your referral link, both you and your referral receive rewards
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
                      <h4 className="font-bold text-lg mb-2">Higher Weight</h4>
                      <p className="text-sm text-gray-400 leading-relaxed">
                        More referrals increase your allocation weight for both presale and airdrop
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  )
}
