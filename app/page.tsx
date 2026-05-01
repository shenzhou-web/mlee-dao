"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Copy, Check, ExternalLink, Menu, X, Download } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { FloatingCTA } from "@/components/layout/floating-cta"
import { MDAOCountdown } from "@/components/countdown"
import TokenomicsSection from "@/components/tokenomicsSection"
import { usePresaleData } from "@/hooks/usePresaleData"
import { CONTRACTS } from "@/lib/contracts"

export default function Home() {
  const [scrolled, setScrolled] = useState(false)
  const [copied, setCopied] = useState(false)
  const [emailCopied, setEmailCopied] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { priceDisplay, progress, presaleEndTimestamp, phase1Start, phase, isLoading } = usePresaleData()

  const contractAddress = "0xC4bF2518AA953304170753388F83277Eb9588a7A"
  const officialEmail = "admin@mleedao.com"
  const officialWebsite = "https://mleedao.com"

  const now = Date.now() / 1000
  const hasStarted = phase1Start > 0 && now >= phase1Start
  const hasEnded = presaleEndTimestamp > 0 && now >= presaleEndTimestamp
  const phaseBadge = hasEnded
    ? "Presale Ended"
    : hasStarted
      ? `Phase ${phase || 1} Live`
      : "Phase 1 Starting Soon"
  const targetTime = hasStarted ? presaleEndTimestamp : phase1Start
  const daysLeft = targetTime > 0 ? Math.max(0, Math.ceil((targetTime - now) / 86400)) : 0
  const timingLabel = hasEnded
    ? "Presale ended"
    : hasStarted
      ? `Presale ends in ${daysLeft} days`
      : `Presale starts in ${daysLeft} days`

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(contractAddress)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const copyEmail = async () => {
    await navigator.clipboard.writeText(officialEmail)
    setEmailCopied(true)
    setTimeout(() => setEmailCopied(false), 2000)
  }

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setMobileMenuOpen(false)
    }
  }

  return (
    <main className="bg-gradient-to-b from-black via-zinc-950 to-black text-white overflow-x-hidden">
      {/* <FloatingCTA /> */}

      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-black/80 backdrop-blur-xl border-b border-white/5" : "bg-transparent"
          }`}
      >
        <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <div className="flex-shrink-0 flex items-center gap-3 animate-fade-in">
              <Image
                src="/mdao-logo.png"
                alt="MLEE DAO Logo"
                width={120}
                height={120}
                className="object-contain w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20"
              />
              {/* <span className="text-lg sm:text-xl font-bold">MLEE DAO</span> */}
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center justify-center flex-1 mx-8 animate-fade-in-down delay-100">
              <div className="flex items-center gap-1 bg-white/5 backdrop-blur-sm rounded-full px-2 py-2 border border-white/10">
                <button
                  onClick={() => scrollToSection("about")}
                  className="px-4 py-2 rounded-full text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-smooth"
                >
                  About
                </button>
                <Link
                  href="/presale"
                  className="px-4 py-2 rounded-full text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-smooth"
                >
                  Presale
                </Link>
                <Link
                  href="/partnership"
                  className="px-4 py-2 rounded-full text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-smooth"
                >
                  Partnership
                </Link>
                <Link
                  href="/dashboard"
                  className="px-4 py-2 rounded-full text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-smooth"
                >
                  Dashboard
                </Link>
                {/* <Link
                  href="/airdrop"
                  className="px-4 py-2 rounded-full text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-smooth"
                >
                  Airdrop
                </Link>
                <Link
                  href="/referral"
                  className="px-4 py-2 rounded-full text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-smooth"
                >
                  Referral
                </Link> */}
                {/* <button
                  onClick={() => scrollToSection("governance")}
                  className="px-4 py-2 rounded-full text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-smooth"
                >
                  Governance
                </button> */}
                <button
                  onClick={() => scrollToSection("tokenomics")}
                  className="px-4 py-2 rounded-full text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-smooth"
                >
                  Tokenomics
                </button>
                <button
                  onClick={() => scrollToSection("roadmap")}
                  className="px-4 py-2 rounded-full text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-smooth"
                >
                  Roadmap
                </button>
                <button
                  onClick={() => scrollToSection("links")}
                  className="px-4 py-2 rounded-full text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-smooth"
                >
                  Community
                </button>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="px-4 py-2 rounded-full text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-smooth"
                >
                  Contact
                </button>
              </div>
            </div>

            {/* CTA Button */}
            <div className="hidden md:block animate-fade-in-down delay-200">
              <Button
                onClick={() => window.open(`https://bscscan.com/token/${contractAddress}`, "_blank")}
                className="bg-gradient-to-r from-primary via-secondary to-primary text-black font-bold hover:opacity-90 transition-smooth hover-lift"
              >
                View on BscScan
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-xl border-t border-white/5">
            <div className="px-4 py-4 space-y-2">
              <button
                onClick={() => scrollToSection("about")}
                className="block w-full text-left px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all"
              >
                About
              </button>
              <Link
                href="/presale"
                className="block w-full text-left px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all"
              >
                Presale
              </Link>
              <Link
                href="/partnership"
                className="block w-full text-left px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all"
              >
                Partnership
              </Link>
              <Link
                href="/dashboard"
                className="block w-full text-left px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all"
              >
                Dashboard
              </Link>
              {/* <Link
                href="/airdrop"
                className="block w-full text-left px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all"
              >
                Airdrop
              </Link>
              <Link
                href="/referral"
                className="block w-full text-left px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all"
              >
                Referral
              </Link> */}
              {/* <button
                onClick={() => scrollToSection("governance")}
                className="block w-full text-left px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all"
              >
                Governance
              </button> */}
              <button
                onClick={() => scrollToSection("tokenomics")}
                className="block w-full text-left px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all"
              >
                Tokenomics
              </button>
              <button
                onClick={() => scrollToSection("roadmap")}
                className="block w-full text-left px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all"
              >
                Roadmap
              </button>
              <button
                onClick={() => scrollToSection("links")}
                className="block w-full text-left px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all"
              >
                Community
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="block w-full text-left px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all"
              >
                Contact
              </button>
              <Button
                onClick={() => window.open(`https://bscscan.com/token/${contractAddress}`, "_blank")}
                className="w-full bg-gradient-to-r from-primary via-secondary to-primary text-black font-semibold"
              >
                View on BscScan
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
  {/* Hero Section */}
<section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 pt-20 overflow-hidden">
  {/* Animated Background Grid */}
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_40%,transparent_100%)]" />
  </div>

  {/* Orbs */}
  <div className="absolute top-1/4 left-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-[#dba640]/10 rounded-full blur-3xl animate-pulse" />
  <div className="absolute bottom-1/4 right-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-700" />
  {/* Extra presale-focused orb */}
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] sm:w-[480px] sm:h-[480px] lg:w-[640px] lg:h-[640px] bg-[#dba640]/5 rounded-full blur-3xl pointer-events-none" />

  <div className="relative max-w-5xl xl:max-w-6xl 2xl:max-w-[1400px] mx-auto text-center z-10">

    {/* Verified badge */}
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 animate-fade-in">
      <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
      <span className="text-sm font-medium text-primary">Contract Verified on BscScan</span>
    </div>

    {/* Headline */}
    <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 animate-fade-in-up text-balance">
      <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-gradient">
        MLEE DAO
      </span>
    </h1>

    <p className="text-xl sm:text-2xl md:text-3xl font-semibold mb-6 text-gray-300 animate-fade-in-up delay-100 text-balance">
      Decentralized Governance Token
    </p>

    <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-12 animate-fade-in-up delay-200 leading-relaxed text-pretty">
      A decentralized autonomous organization token on BNB Chain focused on long-term ecosystem development and
      transparent community ownership.
    </p>

    {/* ── PRESALE CTA BLOCK ── */}
    <div className="animate-fade-in-up delay-300">
      <Link href="/presale">
        <div
          className="group relative inline-flex flex-col items-center w-full sm:w-auto cursor-pointer"
        >
          {/* Glow ring behind button */}
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary via-secondary to-primary opacity-40 blur-lg group-hover:opacity-70 transition-all duration-500 animate-gradient" style={{ backgroundSize: "200% 200%" }} />

          {/* Main CTA card */}
          <div
            className="relative w-full sm:w-auto rounded-2xl overflow-hidden transition-transform duration-300 group-hover:-translate-y-1"
            style={{
              background: "linear-gradient(135deg, rgba(219,166,64,0.12) 0%, rgba(13,17,23,0.95) 50%, rgba(219,166,64,0.08) 100%)",
              border: "1px solid rgba(219,166,64,0.35)",
              boxShadow: "0 0 40px rgba(219,166,64,0.12), inset 0 1px 0 rgba(219,166,64,0.15)",
            }}
          >
            {/* Top shimmer line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-60" />

            <div className="flex flex-col sm:flex-row items-center gap-6 px-8 py-6 sm:py-5">
              {/* Left: Live badge + info */}
              <div className="flex flex-col items-center sm:items-start gap-1 sm:border-r sm:border-white/10 sm:pr-6">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400" />
                  </span>
                  <span className="text-xs font-bold uppercase tracking-widest text-green-400">
                    {phaseBadge}
                  </span>
                </div>
                <span className="text-[11px] text-gray-500 whitespace-nowrap">{isLoading ? "Loading…" : timingLabel}</span>
              </div>

              {/* Center: Price */}
              <div className="flex flex-col items-center sm:items-start sm:border-r sm:border-white/10 sm:pr-6">
                <span className="text-[11px] uppercase tracking-widest text-gray-500 font-semibold">Current Price</span>
                <span
                  className="text-2xl font-bold"
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    letterSpacing: "0.06em",
                    color: "#dba640",
                    textShadow: "0 0 15px rgba(219,166,64,0.5)",
                  }}
                >
                  {isLoading ? "—" : priceDisplay} <span className="text-sm text-gray-400 font-normal">/ MDAO</span>
                </span>
              </div>

              {/* Right: Button */}
              <button
                className="relative flex items-center gap-3 px-7 py-3.5 rounded-xl font-bold uppercase tracking-wider transition-all duration-300 group-hover:scale-105 overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, #dba640 0%, #f5c842 50%, #c88d14 100%)",
                  backgroundSize: "200% 200%",
                  animation: "gradient-shift 3s ease infinite",
                  color: "#05070a",
                  fontSize: "0.95rem",
                  letterSpacing: "0.1em",
                  boxShadow: "0 4px 20px rgba(219,166,64,0.35)",
                }}
              >
                {/* Shine sweep */}
                <span
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.25) 50%, transparent 60%)",
                    animation: "progress-shine 2.5s ease-in-out infinite",
                  }}
                />
                <span className="text-lg">🚀</span>
                Join Presale Now
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>
            </div>

            {/* Progress bar strip at bottom */}
            <div className="px-8 pb-4">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-[10px] uppercase tracking-wider text-gray-600 font-semibold">Presale Progress</span>
                <span className="text-[10px] font-bold" style={{ color: "#dba640" }}>
                  {isLoading ? "—" : `${progress.toFixed(2)}% Filled`}
                </span>
              </div>
              <div
                className="h-1.5 rounded-full overflow-hidden"
                style={{ background: "rgba(219,166,64,0.1)", border: "1px solid rgba(219,166,64,0.1)" }}
              >
                <div
                  className="h-full rounded-full progress-shine"
                  style={{
                    width: `${Math.max(progress, 0.5)}%`,
                    background: "linear-gradient(90deg, #c88d14, #dba640, #f5c842)",
                    minWidth: "8px",
                    boxShadow: "0 0 8px rgba(219,166,64,0.6)",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </Link>

      {/* Sub-note */}
      <p className="mt-4 text-xs text-gray-600">
        BEP-20 USDT only &nbsp;·&nbsp; No KYC required &nbsp;·&nbsp;{" "}
        <a
          href={`https://bscscan.com/address/${CONTRACTS.PRESALE}`}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-white transition"
        >
          View presale contract
        </a>
      </p>
    </div>

    {/* Stats */}
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 animate-fade-in-up delay-700">
      <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover-lift hover-glow transition-smooth">
        <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          18B
        </div>
        <div className="text-sm sm:text-base text-gray-400 mt-2">Total Supply</div>
      </div>
      <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover-lift hover-glow transition-smooth">
        <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
          BEP-20
        </div>
        <div className="text-sm sm:text-base text-gray-400 mt-2">Token Standard</div>
      </div>
      <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover-lift hover-glow transition-smooth">
        <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          BSC
        </div>
        <div className="text-sm sm:text-base text-gray-400 mt-2">BNB Smart Chain</div>
      </div>
    </div>

  </div>
</section>

      {/* Presale, Airdrop, Referral, Governance Sections */}
      {/* <MDAOPresaleSection /> Removed as it is now a separate page */}
      {/* <MDAOAirdropSection /> Removed as it is now a separate page */}
      {/* <MDAOReferralSection /> Removed as it is now a separate page */}
      {/* <MDAOGovernanceSection /> Removed as it is now a separate page */}

      {/* Contract Verification Section */}
      <section className="py-20 px-4 sm:px-6 relative">
        <div className="max-w-4xl 2xl:max-w-[1200px] mx-auto">
          <Card className="p-6 sm:p-8 bg-gradient-to-br from-primary/10 via-secondary/10 to-primary/10 border-primary/20 backdrop-blur-sm">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                <Check className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold mb-2 text-white">Contract Verified</h3>
                <p className="text-gray-200 text-sm sm:text-base">
                  Verified on BscScan. Fully transparent and open-source.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Contract Address</label>
                <div className="flex items-center gap-2 p-4 rounded-xl bg-black/40 border border-white/10">
                  <code className="text-xs sm:text-sm flex-1 break-all text-primary font-mono">{contractAddress}</code>
                  <button
                    onClick={copyToClipboard}
                    className="p-2 rounded-lg hover:bg-white/10 transition-colors flex-shrink-0"
                  >
                    {copied ? <Check className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Button
                  onClick={() => window.open(`https://bscscan.com/token/${contractAddress}`, "_blank")}
                  variant="outline"
                  className="border-primary/30 hover:bg-primary/10 justify-between hover:text-white"
                >
                  <span>View on BscScan</span>
                  <ExternalLink className="w-4 h-4" />
                </Button>
                <Button
                  onClick={() => window.open(`https://bscscan.com/address/${contractAddress}#code`, "_blank")}
                  variant="outline"
                  className="border-secondary/30 hover:bg-secondary/10 justify-between hover:text-white"
                >
                  <span>View Contract Code</span>
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 relative">
        <div className="max-w-6xl 2xl:max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              About{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">MLEE DAO</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed text-pretty">
              Building the future of decentralized governance
            </p>
          </div>

          <div className="max-w-3xl 2xl:max-w-[1100px] mx-auto mb-12">
            <Card className="p-8 bg-gradient-to-br from-primary/10 via-secondary/10 to-primary/10 border-primary/20 backdrop-blur-sm">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary p-[2px]">
                    <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                      <span className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        MD
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-center sm:text-left flex-1">
                  <h3 className="text-2xl font-bold text-white mb-1">Maike Lee</h3>
                  <p className="text-sm text-primary font-medium mb-2">Founder & Lead Developer</p>
                  <p className="text-sm text-gray-400 leading-relaxed mb-3">
                    Blockchain enthusiast building transparent, community-driven solutions on BNB Chain. Committed to
                    creating decentralized governance systems that empower token holders.
                  </p>
                  <div className="flex gap-3 justify-center sm:justify-start">
                    <a
                      href="https://i.ifeng.com/c/8ScA1zZXCof"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-primary transition-colors group"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                      <span className="group-hover:underline">Insights</span>
                    </a>
                    <a
                      href="https://www.52hrtt.com/db/n/w/info/A1730854872391"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-primary transition-colors group"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                        />
                      </svg>
                      <span className="group-hover:underline">News</span>
                    </a>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-6 sm:p-8 bg-white/5 backdrop-blur-sm border-white/10 hover:border-primary/30 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-4 text-white">Our Purpose</h3>
              <p className="text-gray-400 leading-relaxed">
                MLEE DAO provides infrastructure for decentralized governance, enabling token holders to participate in
                decision-making processes. The platform emphasizes transparency and community-driven development.
              </p>
            </Card>

            <Card className="p-6 sm:p-8 bg-white/5 backdrop-blur-sm border-white/10 hover:border-secondary/30 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary to-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-4 text-white">Transparency</h3>
              <p className="text-gray-400 leading-relaxed">
                Built on BNB Smart Chain with verified smart contracts. All transactions are publicly auditable on
                BscScan. The project maintains open-source code and clear documentation.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Tokenomics Section */}
      <TokenomicsSection />

      {/* Roadmap Section */}
      <section id="roadmap" className="py-16 sm:py-20 2xl:py-24 px-4 sm:px-6 relative">
        <div className="max-w-4xl 2xl:max-w-[1200px] 3xl:max-w-[1400px] mx-auto">
          <div className="text-center mb-12 sm:mb-16 2xl:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl 2xl:text-6xl font-bold mb-4 text-white">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Development Roadmap
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl 2xl:max-w-3xl mx-auto text-base sm:text-lg 2xl:text-xl text-pretty">
              Project milestones and planned features
            </p>
          </div>

          <div className="space-y-6 sm:space-y-8 2xl:space-y-10">
            {[
              {
                phase: "Phase 1",
                title: "Token Launch",
                description: "Smart contract deployment and verification on BscScan",
                status: "completed",
              },
              {
                phase: "Phase 2",
                title: "Liquidity Establishment",
                description: "Initial liquidity provisioning and exchange integration",
                status: "in-progress",
              },
              {
                phase: "Phase 3",
                title: "Governance Framework",
                description: "Implementation of on-chain voting mechanisms",
                status: "upcoming",
              },
              {
                phase: "Phase 4",
                title: "Ecosystem Expansion",
                description: "Strategic partnerships and DeFi protocol integrations",
                status: "upcoming",
              },
            ].map((item, index) => (
              <Card
                key={index}
                className={`p-6 sm:p-8 2xl:p-10 border-white/10 backdrop-blur-sm transition-all hover:scale-[1.02] ${item.status === "completed"
                    ? "bg-primary/10 border-primary/30"
                    : item.status === "in-progress"
                      ? "bg-secondary/10 border-secondary/30"
                      : "bg-white/5"
                  }`}
              >
                <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                  <div
                    className={`w-12 h-12 sm:w-16 sm:h-16 2xl:w-18 2xl:h-18 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-lg sm:text-xl 2xl:text-2xl ${item.status === "completed"
                        ? "bg-gradient-to-br from-primary to-secondary text-black"
                        : item.status === "in-progress"
                          ? "bg-gradient-to-br from-secondary to-primary text-black"
                          : "bg-white/10 text-gray-400"
                      }`}
                  >
                    {item.status === "completed" ? "✓" : index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h3 className="text-xl sm:text-2xl 2xl:text-3xl font-bold text-white">{item.phase}</h3>
                      {item.status === "in-progress" && (
                        <span className="px-3 py-1 rounded-full bg-secondary/20 text-secondary text-xs font-semibold">
                          In Progress
                        </span>
                      )}
                    </div>
                    <h4 className="font-semibold text-lg sm:text-xl 2xl:text-2xl mb-2 text-white">{item.title}</h4>
                    <p className="text-gray-400 text-sm sm:text-base 2xl:text-lg">{item.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Governance Section */}
      <section className="py-20 px-4 sm:px-6 relative">
        <div className="max-w-4xl 2xl:max-w-[1200px] mx-auto">
          <Card className="p-8 sm:p-12 bg-gradient-to-br from-primary/10 via-secondary/10 to-primary/10 border-primary/20 backdrop-blur-sm text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-primary via-secondary to-primary flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl sm:text-4xl">🗳️</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-white">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Community Governance
              </span>
            </h2>
            <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed text-pretty">
              MDAO holders will participate in decentralized governance decisions through on-chain voting mechanisms.
              Shape the future of the DAO with your voice and your tokens.
            </p>
          </Card>
        </div>
      </section>

      {/* Links Section */}
      <section id="links" className="py-16 sm:py-20 2xl:py-24 px-4 sm:px-6 relative">
        <div className="max-w-4xl 2xl:max-w-[1200px] 3xl:max-w-[1400px] mx-auto">
          <div className="text-center mb-12 sm:mb-16 2xl:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl 2xl:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Join Our Community
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl 2xl:max-w-3xl mx-auto text-base sm:text-lg 2xl:text-xl text-pretty">
              Connect with us across our official channels
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-5 sm:gap-6 2xl:gap-8">
            {[
              { name: "Telegram", url: "https://t.me/MleeDAO", icon: "💬" },
              { name: "X (Twitter)", url: "https://x.com/MLEEDAO", icon: "𝕏" },
              { name: "GitHub", url: "https://github.com/shenzhou-web/mlee-dao", icon: "💻" },
            ].map((link, index) => (
              <Card
                key={index}
                onClick={() => window.open(link.url, "_blank")}
                className="p-6 2xl:p-8 bg-transparent backdrop-blur-sm border-white/10 hover:border-primary/30 hover:bg-primary/10 transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 2xl:w-14 2xl:h-14 text-white rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                      {link.icon}
                    </div>
                    <span className="font-semibold text-lg 2xl:text-xl text-primary group-hover:text-white">{link.name}</span>
                  </div>
                  <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact & Resources Section */}
      <section id="contact" className="py-16 sm:py-20 2xl:py-24 px-4 sm:px-6 relative">
        <div className="max-w-4xl 2xl:max-w-[1200px] 3xl:max-w-[1400px] mx-auto">
          <div className="text-center mb-12 sm:mb-16 2xl:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl 2xl:text-6xl font-bold mb-4 text-white">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Official Contact & Resources
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl 2xl:max-w-3xl mx-auto text-base sm:text-lg 2xl:text-xl text-pretty">
              Connect through our verified channels
            </p>
          </div>

          {/* Official Email Box - Prominent */}
          <Card className="mb-8 p-6 sm:p-8 2xl:p-10 bg-gradient-to-br from-primary/10 via-secondary/10 to-primary/10 border-primary/20 backdrop-blur-sm">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="text-center sm:text-left">
                <h3 className="text-xl sm:text-2xl 2xl:text-3xl font-bold mb-2 text-white">Official Email</h3>
                <p className="text-gray-400 mb-4 text-sm sm:text-base 2xl:text-lg">For partnerships, inquiries, and official communications</p>
                <div className="flex flex-col sm:flex-row items-center gap-2 p-4 rounded-xl bg-black/40 border border-white/10">
                  <code className="text-sm sm:text-base flex-1 text-primary font-mono break-all">{officialEmail}</code>
                  <button
                    onClick={copyEmail}
                    className="p-2 rounded-lg hover:bg-white/10 transition-colors flex-shrink-0"
                  >
                    {emailCopied ? <Check className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4 text-white" />}
                  </button>
                </div>
              </div>
              <Button
                onClick={() => window.open(`mailto:${officialEmail}`, "_blank")}
                size="lg"
                className="w-full sm:w-auto bg-gradient-to-r from-primary via-secondary to-primary text-black font-bold hover:opacity-90"
              >
                Send Email
              </Button>
            </div>
          </Card>

          {/* Official Website */}
          <Card className="mb-8 p-6 2xl:p-8 bg-white/5 backdrop-blur-sm border-white/10 hover:border-primary/30 transition-all">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg sm:text-xl 2xl:text-2xl font-bold mb-2 text-white">Official Website</h3>
                <p className="text-primary text-sm sm:text-base 2xl:text-lg font-mono break-all">{officialWebsite}</p>
              </div>
              <Button
                onClick={() => window.open(officialWebsite, "_blank")}
                variant="outline"
                className="w-full sm:w-auto border-primary/30 hover:bg-primary/10 text-white hover:text-white"
              >
                Visit Website
              </Button>
            </div>
          </Card>

          {/* Additional Resources */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 2xl:gap-8">
            <Card className="p-6 2xl:p-8 bg-white/5 backdrop-blur-sm border-white/10 hover:border-secondary/30 transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 2xl:w-14 2xl:h-14 rounded-xl bg-gradient-to-br from-secondary/20 to-primary/20 flex items-center justify-center flex-shrink-0">
                  <Download className="w-6 h-6 text-secondary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg 2xl:text-xl font-bold mb-2 text-white">Whitepaper</h3>
                  <p className="text-sm 2xl:text-base text-gray-400 mb-4">You can view our white paper by downloading it. </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-secondary/30 hover:bg-secondary/10 text-white hover:text-white bg-transparent"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    <a href="/whitepaper.pdf" download className="flex items-center">
                      Download Whitepaper
                    </a>
                  </Button>
                </div>
              </div>
            </Card>

            <Card className="p-6 2xl:p-8 bg-transparent backdrop-blur-sm border-white/10 hover:border-primary/30 transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 2xl:w-14 2xl:h-14 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0">
                  <ExternalLink className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg 2xl:text-xl font-bold mb-2 text-white">Social Media</h3>
                  <p className="text-sm 2xl:text-base text-gray-400 mb-4">Follow us for updates and community engagement</p>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open("https://t.me/MleeDAO", "_blank")}
                      className="border-primary bg-primary/10 text-primary hover:bg-primary/20 hover:text-white hover:shadow-lg hover:shadow-primary/25"
                    >
                      Telegram
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open("https://x.com/MLEEDAO", "_blank")}
                      className="border-primary bg-primary/10 text-primary hover:bg-primary/20 hover:text-white hover:shadow-lg hover:shadow-primary/25"
                    >
                      X/Twitter
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 border-t border-white/10">
        <div className="max-w-6xl 2xl:max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              {/* Logo without background */}
              <Image
                src="/mdao-logo.png"
                alt="MLEE DAO Logo"
                width={120}
                height={120}
                className="object-contain w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20"
              />
            </div>
            <div className="text-center md:text-right">
              <p className="text-gray-400 text-sm">© {new Date().getFullYear()} MLEE DAO. All rights reserved.</p>
              <p className="text-gray-500 text-xs mt-1">Built on BNB Smart Chain</p>
              <div className="mt-3 flex items-center justify-center gap-4 text-xs text-gray-400 md:justify-end">
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms
                </Link>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
