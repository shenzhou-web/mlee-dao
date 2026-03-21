"use client"

import { useEffect, useRef, useState } from "react"
import { PresaleCountdown } from "@/components/presale/countdown"
import { PresaleStats } from "@/components/presale/stats"
import { PresaleProgress } from "@/components/presale/progress"
import { BuyTokens } from "@/components/presale/buy-tokens"
import { VestingSchedule } from "@/components/presale/vesting"
import { PricingPhases } from "@/components/presale/phases"
import { PresaleFeatures } from "@/components/presale/features"
import { ConnectWalletButton } from "@/components/presale/connect-wallet-button"
import { usePresaleData } from "@/hooks/usePresaleData"
import { CONTRACTS } from "@/lib/contracts"
import Image from "next/image";
import Link from "next/link";

/* ─── Ticker data ─── */
const TICKER_ITEMS = [
  "⚡ MDAO TOKEN PRESALE",
  "🔥 CURRENT PRICE UPDATES ON-CHAIN",
  "📊 HARD CAP: 200,000,000 MDAO",
  "🔒 LINEAR VESTING — 8 MONTHS",
  "🏛 DECENTRALIZED GOVERNANCE",
  "🚀 BUILT FOR LONG-TERM HOLDERS",
  "🔎 VERIFIED ON BSC",
]

/* ─── Background orbs ─── */
function BackgroundOrbs() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Main gold orb */}
      <div
        className="orb"
        style={{
          width: "600px",
          height: "600px",
          top: "-100px",
          left: "-150px",
          background: "radial-gradient(circle, rgba(240,180,41,0.07) 0%, transparent 70%)",
          animation: "orb-drift 20s ease-in-out infinite",
        }}
      />
      {/* Jade orb */}
      <div
        className="orb"
        style={{
          width: "500px",
          height: "500px",
          bottom: "10%",
          right: "-100px",
          background: "radial-gradient(circle, rgba(46,216,163,0.06) 0%, transparent 70%)",
          animation: "orb-drift 25s ease-in-out infinite reverse",
        }}
      />
      {/* Small accent orb */}
      <div
        className="orb"
        style={{
          width: "300px",
          height: "300px",
          top: "40%",
          left: "40%",
          background: "radial-gradient(circle, rgba(167,139,250,0.04) 0%, transparent 70%)",
          animation: "orb-drift 18s ease-in-out infinite 5s",
        }}
      />
    </div>
  )
}

/* ─── Grid background ─── */
function GridBackground() {
  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none"
      style={{
        backgroundImage: `
          linear-gradient(rgba(240,180,41,0.025) 1px, transparent 1px),
          linear-gradient(90deg, rgba(240,180,41,0.025) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
      }}
    />
  )
}

/* ─── Navbar ─── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handler)
    return () => window.removeEventListener("scroll", handler)
  }, [])

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(5,7,10,0.95)" : "rgba(5,7,10,0.7)",
        backdropFilter: "blur(20px)",
        borderBottom: scrolled ? "1px solid rgba(240,180,41,0.12)" : "1px solid transparent",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
        {/* Logo */}
   <Link href="/" className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition">
    <div className="flex-shrink-0 flex items-center gap-3 animate-fade-in">
              <Image src='/mdao-logo-removebg.png' alt='MLEE DAO Logo' width={120} height={120} className="object-contain" />
            </div>


  {/* Presale Tag */}
  <span
    className="hidden sm:block text-xs px-2 py-0.5 rounded-full uppercase tracking-widest font-semibold"
    style={{
      background: "rgba(240,180,41,0.1)",
      border: "1px solid rgba(240,180,41,0.2)",
      color: "#f0b429",
      fontFamily: "'Rajdhani', sans-serif",
    }}
  >
    Presale
  </span>
</Link>

        {/* Nav links */}
        {/* <nav className="hidden md:flex items-center gap-6">
          {["About", "Phases", "Tokenomics", "FAQ"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm font-semibold uppercase tracking-wider transition-colors duration-200"
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                color: "rgba(255,255,255,0.4)",
              }}
              onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = "#f0b429")}
              onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.color = "rgba(255,255,255,0.4)")}
            >
              {item}
            </a>
          ))}
        </nav> */}

        {/* Wallet btn */}
        <ConnectWalletButton variant="header" />
      </div>
    </header>
  )
}

/* ─── Ticker tape ─── */
function TickerTape() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS]
  return (
    <div
      className="w-full py-2.5 overflow-hidden relative"
      style={{
        background: "rgba(240,180,41,0.06)",
        borderTop: "1px solid rgba(240,180,41,0.12)",
        borderBottom: "1px solid rgba(240,180,41,0.12)",
      }}
    >
      <div className="flex animate-ticker">
        {items.map((item, i) => (
          <span
            key={i}
            className="flex-shrink-0 px-8 text-xs font-semibold uppercase tracking-widest"
            style={{ color: "rgba(240,180,41,0.7)", fontFamily: "'Rajdhani', sans-serif" }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

/* ─── Hero Section ─── */
function HeroSection() {
  const { priceDisplay, hardCap, isLoading, phase, phase1Start, presaleEndTimestamp } = usePresaleData()
  const now = Date.now() / 1000
  const hasStarted = phase1Start > 0 && now >= phase1Start
  const hasEnded = presaleEndTimestamp > 0 && now >= presaleEndTimestamp
  const phaseTag = hasEnded
    ? "Presale Ended"
    : hasStarted
      ? `Phase ${phase || 1} Now Live — Limited Spots`
      : "Phase 1 Starting Soon"
  const priceText = isLoading ? "—" : priceDisplay
  const hardCapText = isLoading ? "—" : `${hardCap.toFixed(0)} MDAO`

  return (
    <section className="relative pt-28 pb-12 px-4 sm:px-6 text-center">
      {/* Tag line */}
      <div
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 animate-fade-in-down"
        style={{
          background: "rgba(240,180,41,0.08)",
          border: "1px solid rgba(240,180,41,0.2)",
        }}
      >
        <span className="text-xs animate-float" style={{ display: "inline-block" }}>🔥</span>
        <span
          className="text-xs font-bold uppercase tracking-widest"
          style={{ color: "rgba(240,180,41,0.9)", fontFamily: "'Rajdhani', sans-serif" }}
        >
          {phaseTag}
        </span>
      </div>

      {/* Main headline */}
      <div className="animate-fade-in-up opacity-0" style={{ animationDelay: "100ms", animationFillMode: "forwards" }}>
        <h1
          className="mb-2"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(3.5rem, 9vw, 7rem)",
            letterSpacing: "0.05em",
            lineHeight: 0.95,
            color: "white",
          }}
        >
          MDAO TOKEN
        </h1>
        <h2
          className="mb-6"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(4rem, 11vw, 8.5rem)",
            letterSpacing: "0.05em",
            lineHeight: 0.95,
            background: "linear-gradient(135deg, #f0b429 0%, #ffd700 40%, #c88d14 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            textShadow: "none",
            filter: "drop-shadow(0 0 30px rgba(240,180,41,0.3))",
          }}
        >
          PRESALE
        </h2>
      </div>

      {/* Subtitle */}
      <p
        className="text-lg sm:text-xl mb-10 max-w-2xl mx-auto animate-fade-in-up opacity-0"
        style={{
          color: "rgba(255,255,255,0.5)",
          fontFamily: "'Rajdhani', sans-serif",
          fontWeight: 500,
          lineHeight: 1.6,
          animationDelay: "200ms",
          animationFillMode: "forwards",
        }}
      >
        Join the future of decentralized gaming. Secure your MDAO tokens at the current presale price before the window closes.
      </p>

      {/* Hero CTA Buttons */}
      <div
        className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14 animate-fade-in-up opacity-0"
        style={{ animationDelay: "350ms", animationFillMode: "forwards" }}
      >
        <ConnectWalletButton size="lg" />
        <a
          href="#buy"
          className="btn-outline-gold inline-flex items-center gap-2 px-8 py-5 rounded-xl font-bold uppercase tracking-wider"
          style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.15em", fontSize: "1rem" }}
        >
          📊 View Presale Details
        </a>
      </div>

      {/* Stats row below CTA */}
      <div
        className="flex flex-wrap justify-center gap-6 sm:gap-10 mb-6 animate-fade-in-up opacity-0"
        style={{ animationDelay: "500ms", animationFillMode: "forwards" }}
      >
        {[
          { label: "Token Price", value: priceText },
          { label: "Hard Cap", value: hardCapText },
          { label: "Presale Duration", value: "90 Days" },
          { label: "Audit", value: "TBA" },
        ].map((s) => (
          <div key={s.label} className="text-center">
            <div
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "1.3rem",
                color: "#f0b429",
                letterSpacing: "0.05em",
              }}
            >
              {s.value}
            </div>
            <div
              className="text-xs uppercase tracking-widest"
              style={{ color: "rgba(255,255,255,0.3)", fontFamily: "'Rajdhani', sans-serif", fontWeight: 600 }}
            >
              {s.label}
            </div>
          </div>
        ))}
      </div>

      <div className="text-center text-xs animate-fade-in-up opacity-0" style={{ animationDelay: "600ms", animationFillMode: "forwards" }}>
        <a
          href={`https://bscscan.com/address/${CONTRACTS.PRESALE}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition"
        >
          View presale contract on BscScan ↗
        </a>
      </div>
    </section>
  )
}

/* ─── FAQ Section ─── */
function FAQ() {
  const [open, setOpen] = useState<number | null>(null)
  const faqs = [
    {
      q: "What is MDAO Token?",
      a: "MDAO is the governance token for our decentralized gaming ecosystem. Holders can vote on protocol decisions and access staking utilities as they go live.",
    },
    {
      q: "When does the presale start?",
      a: "The presale start time is shown in the countdown above. Phase 1 offers the best pricing at $0.01 per MDAO.",
    },
    {
      q: "How do I participate?",
      a: "Connect your Web3 wallet (MetaMask, WalletConnect, etc.), enter a USDT amount within the limits shown, approve USDT spending, then click Buy Tokens.",
    },
    {
      q: "What is the vesting schedule?",
      a: "20% is released at TGE (Token Generation Event), then 10% every month for 8 months until 100% is released.",
    },
    {
      q: "Is there an audit?",
      a: "No audit has been announced yet. If one is commissioned, we will publish the report here and update the site.",
    },
  ]

  return (
    <section id="faq" className="space-y-5">
      <div className="text-center space-y-2">
        <p className="text-xs uppercase tracking-widest font-semibold" style={{ color: "rgba(240,180,41,0.6)", fontFamily: "'Rajdhani', sans-serif" }}>
          FAQ
        </p>
        <h2
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(2rem, 4vw, 2.8rem)",
            color: "white",
            letterSpacing: "0.05em",
          }}
        >
          Common Questions
        </h2>
      </div>

      <div className="space-y-3 max-w-3xl mx-auto">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="rounded-xl overflow-hidden cursor-pointer transition-all duration-300"
            style={{
              background: "rgba(10, 14, 20, 0.8)",
              border: open === i ? "1px solid rgba(240,180,41,0.3)" : "1px solid rgba(255,255,255,0.06)",
            }}
            onClick={() => setOpen(open === i ? null : i)}
          >
            <div className="flex justify-between items-center px-6 py-4">
              <h4
                className="text-sm font-bold"
                style={{ color: open === i ? "#f0b429" : "white", fontFamily: "'Rajdhani', sans-serif", fontWeight: 700 }}
              >
                {faq.q}
              </h4>
              <span
                className="text-lg flex-shrink-0 ml-4 transition-transform duration-300"
                style={{
                  color: "#f0b429",
                  transform: open === i ? "rotate(45deg)" : "rotate(0deg)",
                }}
              >
                +
              </span>
            </div>
            {open === i && (
              <div className="px-6 pb-4">
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Rajdhani', sans-serif" }}
                >
                  {faq.a}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

/* ─── Main Page ─── */
export default function PresalePage() {
  return (
    <div
      className="min-h-screen relative"
      style={{ background: "linear-gradient(180deg, #05070a 0%, #080c14 50%, #05070a 100%)" }}
    >
      <BackgroundOrbs />
      <GridBackground />
      <Navbar />
      <TickerTape />

      <main className="relative z-10">
        {/* ── Hero ── */}
        <HeroSection />

        {/* ── Countdown + Stats + Progress ── */}
        <section id="buy" className="px-4 sm:px-6 pb-16">
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Countdown card */}
            <div
              className="rounded-2xl p-8 sm:p-10 animate-pulse-gold"
              style={{
                background: "rgba(10,14,20,0.85)",
                border: "1px solid rgba(240,180,41,0.2)",
                backdropFilter: "blur(20px)",
              }}
            >
              <PresaleCountdown />
            </div>

            {/* Stats */}
            <PresaleStats />

            {/* Progress */}
            <div
              className="rounded-2xl p-6"
              style={{
                background: "rgba(10,14,20,0.8)",
                border: "1px solid rgba(240,180,41,0.12)",
                backdropFilter: "blur(10px)",
              }}
            >
              <PresaleProgress />
            </div>

            {/* Buy + Vesting side by side */}
            <div className="grid lg:grid-cols-2 gap-5">
              <BuyTokens />
              <VestingSchedule />
            </div>
          </div>
        </section>

        {/* ── Divider ── */}
        <div className="divider-gold mx-6 mb-16" />

        {/* ── Pricing Phases ── */}
        <section id="phases" className="px-4 sm:px-6 pb-20">
          <div className="max-w-6xl mx-auto">
            <PricingPhases />
          </div>
        </section>

        {/* ── Features ── */}
        <section id="about" className="px-4 sm:px-6 pb-20">
          <div className="max-w-6xl mx-auto">
            <PresaleFeatures />
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="px-4 sm:px-6 pb-20">
          <div className="max-w-6xl mx-auto">
            <FAQ />
          </div>
        </section>

        {/* ── Final CTA ── */}
        <section className="px-4 sm:px-6 pb-24">
          <div className="max-w-3xl mx-auto text-center">
            <div
              className="rounded-3xl p-10 sm:p-14 space-y-6 relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, rgba(240,180,41,0.08) 0%, rgba(10,14,20,0.9) 50%, rgba(46,216,163,0.06) 100%)",
                border: "1px solid rgba(240,180,41,0.2)",
              }}
            >
              {/* Decorative corners */}
              <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 rounded-tl-3xl" style={{ borderColor: "rgba(240,180,41,0.4)" }} />
              <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 rounded-br-3xl" style={{ borderColor: "rgba(240,180,41,0.4)" }} />

              <p className="text-xs uppercase tracking-widest font-semibold" style={{ color: "rgba(240,180,41,0.6)", fontFamily: "'Rajdhani', sans-serif" }}>
                Don&apos;t Miss Out
              </p>
              <h2
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "clamp(2.5rem, 6vw, 4rem)",
                  color: "white",
                  letterSpacing: "0.05em",
                  lineHeight: 1,
                }}
              >
                Ready to Join the Presale?
              </h2>
              <p
                className="text-base max-w-md mx-auto"
                style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Rajdhani', sans-serif", lineHeight: 1.7 }}
              >
                Connect your wallet and secure MDAO tokens at Phase 1 pricing. The early bird advantage won&apos;t last forever.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                <ConnectWalletButton size="lg" />
              </div>

              <p className="text-xs" style={{ color: "rgba(255,255,255,0.2)", fontFamily: "'Rajdhani', sans-serif" }}>
                BEP-20 USDT only &nbsp;·&nbsp; No KYC required &nbsp;·&nbsp; Fully on-chain
              </p>
            </div>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer
          className="px-4 sm:px-6 py-10 border-t"
          style={{ borderColor: "rgba(240,180,41,0.1)" }}
        >
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Image
                src="/mdao-logo-removebg.png"
                alt="MLEE DAO Logo"
                width={80}
                height={80}
                className="object-contain"
              />
              <span
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "1.1rem",
                  letterSpacing: "0.1em",
                  color: "rgba(255,255,255,0.4)",
                }}
              >
                MDAO © 2026
              </span>
            </div>
            <div className="flex items-center gap-6">
              {[
                { label: "X/Twitter", href: "https://x.com/MLEEDAO" },
                { label: "Telegram", href: "https://t.me/MleeDAO" },
                { label: "Whitepaper", href: "/whitepaper.pdf" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="text-xs font-semibold uppercase tracking-wider transition-colors"
                  style={{ color: "rgba(255,255,255,0.3)", fontFamily: "'Rajdhani', sans-serif" }}
                  onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = "#f0b429")}
                  onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.color = "rgba(255,255,255,0.3)")}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}
