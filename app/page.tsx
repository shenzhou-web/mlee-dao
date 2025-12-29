"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Copy, Check, ExternalLink, Menu, X, Download } from "lucide-react"

export default function Home() {
  const [scrolled, setScrolled] = useState(false)
  const [copied, setCopied] = useState(false)
  const [emailCopied, setEmailCopied] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const contractAddress = "0xC4bF2518AA953304170753388F83277Eb9588a7A"
  const officialEmail = "admin@mleedao.com"
  const officialWebsite = "https://mleedao.com"

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
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-black/80 backdrop-blur-xl border-b border-white/5" : "bg-transparent"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 32 32"
                className="w-8 h-8 sm:w-10 sm:h-10"
              >
                <polygon points="16,2 28,9 28,23 16,30 4,23 4,9" fill="#0B0E11" />
                <circle cx="16" cy="16" r="8" fill="none" stroke="#F0B90B" strokeWidth="2" />
                <path
                  d="M11 20 V12 L16 17 L21 12 V20"
                  fill="none"
                  stroke="#F0B90B"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-lg sm:text-xl font-bold">MLEE DAO</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center justify-center flex-1 mx-8">
              <div className="flex items-center gap-1 bg-white/5 backdrop-blur-sm rounded-full px-2 py-2 border border-white/10">
                <button
                  onClick={() => scrollToSection("about")}
                  className="px-4 py-2 rounded-full text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-all"
                >
                  About
                </button>
                <button
                  onClick={() => scrollToSection("tokenomics")}
                  className="px-4 py-2 rounded-full text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-all"
                >
                  Tokenomics
                </button>
                <button
                  onClick={() => scrollToSection("roadmap")}
                  className="px-4 py-2 rounded-full text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-all"
                >
                  Roadmap
                </button>
                <button
                  onClick={() => scrollToSection("links")}
                  className="px-4 py-2 rounded-full text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-all"
                >
                  Community
                </button>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="px-4 py-2 rounded-full text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-all"
                >
                  Contact
                </button>
              </div>
            </div>

            {/* CTA Button */}
            <div className="hidden md:block">
              <Button
                onClick={() => window.open(`https://bscscan.com/token/${contractAddress}`, "_blank")}
                className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 text-white font-bold hover:opacity-90 transition-opacity"
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
                className="w-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 text-black font-semibold"
              >
                View on BscScan
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 pt-20">
        {/* Animated Background Grid */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_40%,transparent_100%)]" />
        </div>

        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-700" />

        <div className="relative max-w-5xl mx-auto text-center z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-8 animate-fade-in">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-emerald-400">Verified on BscScan</span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 animate-fade-in-up text-balance">
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              MLEE DAO
            </span>
          </h1>

          <p className="text-xl sm:text-2xl md:text-3xl font-semibold mb-6 text-gray-300 animate-fade-in-up delay-100 text-balance">
            Decentralized Governance Token
          </p>

          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-8 animate-fade-in-up delay-200 leading-relaxed text-pretty">
            A decentralized autonomous organization token on BNB Chain focused on long-term ecosystem development and
            transparent community ownership.
          </p>

              <div className="max-w-2xl mx-auto mb-12 animate-fade-in-up delay-300">
            <div className="bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-blue-500/10 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 p-[2px]">
                    <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                      <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                        MD
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-1">Maike Lee</h3>
                  <p className="text-sm text-emerald-400 font-medium mb-2">Founder & Lead Developer</p>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    Blockchain enthusiast building transparent, community-driven solutions on BNB Chain
                  </p>
                  <div className="flex gap-3 mt-3 justify-center sm:justify-start">
                    <a
                      href="https://i.ifeng.com/c/8ScA1zZXCof"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-emerald-400 transition-colors group"
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
                      className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-emerald-400 transition-colors group"
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
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up delay-500">
            <Button
              size="lg"
              onClick={() => scrollToSection("tokenomics")}
              className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 text-black font-bold text-base sm:text-lg px-8 py-6 hover:shadow-lg hover:shadow-emerald-500/25 hover:scale-105 transition-all w-full sm:w-auto"
            >
              Explore Token
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection("links")}
              className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 text-black font-bold text-base sm:text-lg px-8 py-6 hover:shadow-lg hover:shadow-emerald-500/25 hover:scale-105 transition-all w-full sm:w-auto"
            >
              Join Community
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-20 animate-fade-in-up delay-700">
            <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                18B
              </div>
              <div className="text-sm sm:text-base text-gray-400 mt-2">Total Supply</div>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                BEP-20
              </div>
              <div className="text-sm sm:text-base text-gray-400 mt-2">Token Standard</div>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
                BSC
              </div>
              <div className="text-sm sm:text-base text-gray-400 mt-2">BNB Smart Chain</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contract Verification Section */}
      <section className="py-20 px-4 sm:px-6 relative">
        <div className="max-w-4xl mx-auto">
          <Card className="p-6 sm:p-8 bg-gradient-to-br from-emerald-500/10 via-cyan-500/10 to-blue-500/10 border-emerald-500/20 backdrop-blur-sm">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                <Check className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold mb-2 text-white">Contract Verified ✓</h3>
                <p className="text-gray-200 text-sm sm:text-base">
                  Audited and verified on BscScan. Fully transparent and open-source.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Contract Address</label>
                <div className="flex items-center gap-2 p-4 rounded-xl bg-black/40 border border-white/10">
                  <code className="text-xs sm:text-sm flex-1 break-all text-emerald-400 font-mono">
                    {contractAddress}
                  </code>
                  <button
                    onClick={copyToClipboard}
                    className="p-2 rounded-lg hover:bg-white/10 transition-colors flex-shrink-0"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Button
                  onClick={() => window.open(`https://bscscan.com/token/${contractAddress}`, "_blank")}
                  variant="outline"
                  className="border-emerald-500/30 hover:bg-emerald-500/10 justify-between hover:text-white"
                >
                  <span>View on BscScan</span>
                  <ExternalLink className="w-4 h-4" />
                </Button>
                <Button
                  onClick={() => window.open(`https://bscscan.com/address/${contractAddress}#code`, "_blank")}
                  variant="outline"
                  className="border-cyan-500/30 hover:bg-cyan-500/10 justify-between hover:text-white"
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
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              About{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                MLEE DAO
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed text-pretty">
              Building the future of decentralized governance
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-6 sm:p-8 bg-white/5 backdrop-blur-sm border-white/10 hover:border-emerald-500/30 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-4 text-white">Our Purpose</h3>
              <p className="text-gray-400 leading-relaxed">
                MLEE DAO provides infrastructure for decentralized governance, enabling token holders to participate in
                decision-making processes. The platform emphasizes transparency and community-driven development.
              </p>
            </Card>

            <Card className="p-6 sm:p-8 bg-white/5 backdrop-blur-sm border-white/10 hover:border-cyan-500/30 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
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
      <section id="tokenomics" className="py-20 px-4 sm:px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                Tokenomics
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-base sm:text-lg text-pretty">
              Designed for long-term sustainability and community growth
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border-emerald-500/20 backdrop-blur-sm hover:scale-105 transition-transform">
              <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-br from-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                18B
              </div>
              <h4 className="font-semibold mb-2 text-base sm:text-lg">Total Supply</h4>
              <p className="text-sm text-gray-400">18,000,000,000 MDAO tokens</p>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 border-cyan-500/20 backdrop-blur-sm hover:scale-105 transition-transform">
              <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-br from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
                100%
              </div>
              <h4 className="font-semibold mb-2 text-base sm:text-lg">Minted</h4>
              <p className="text-sm text-gray-400">All tokens minted at deployment</p>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/20 backdrop-blur-sm hover:scale-105 transition-transform">
              <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-br from-blue-400 to-emerald-400 bg-clip-text text-transparent mb-2">
                0%
              </div>
              <h4 className="font-semibold mb-2 text-base sm:text-lg">Tax</h4>
              <p className="text-sm text-gray-400">No buy/sell taxes</p>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-emerald-500/10 to-blue-500/10 border-emerald-500/20 backdrop-blur-sm hover:scale-105 transition-transform">
              <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-br from-emerald-400 to-blue-400 bg-clip-text text-transparent mb-2">
                BEP-20
              </div>
              <h4 className="font-semibold mb-2 text-base sm:text-lg">Standard</h4>
              <p className="text-sm text-gray-400">Standard BEP-20 transfers</p>
            </Card>
          </div>

          <Card className="mt-8 p-6 sm:p-8 bg-white/5 backdrop-blur-sm border-white/10">
            <h3 className="text-xl sm:text-2xl font-bold mb-6 text-white">Token Information</h3>
            <div className="grid sm:grid-cols-2 gap-6 text-sm sm:text-base">
              <div className="flex justify-between py-3 border-b border-white/10">
                <span className="text-gray-400">Token Name</span>
                <span className="font-semibold text-white">MLEE DAO</span>
              </div>
              <div className="flex justify-between py-3 border-b border-white/10">
                <span className="text-gray-400">Symbol</span>
                <span className="font-semibold text-white">MDAO</span>
              </div>
              <div className="flex justify-between py-3 border-b border-white/10">
                <span className="text-gray-400">Network</span>
                <span className="font-semibold text-white">BNB Smart Chain</span>
              </div>
              <div className="flex justify-between py-3 border-b border-white/10">
                <span className="text-gray-400">Decimals</span>
                <span className="font-semibold text-white">18</span>
              </div>
              <div className="flex justify-between py-3 border-b border-white/10">
                <span className="text-gray-400">Total Supply</span>
                <span className="font-semibold text-white">18,000,000,000</span>
              </div>
              <div className="flex justify-between py-3 border-b border-white/10">
                <span className="text-gray-400">Chain ID</span>
                <span className="font-semibold text-white">56 (BSC Mainnet)</span>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Roadmap Section */}
      <section id="roadmap" className="py-20 px-4 sm:px-6 relative">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white">
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                Development Roadmap
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-base sm:text-lg text-pretty">
              Project milestones and planned features
            </p>
          </div>

          <div className="space-y-8">
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
                className={`p-6 sm:p-8 border-white/10 backdrop-blur-sm transition-all hover:scale-[1.02] ${item.status === "completed"
                  ? "bg-emerald-500/10 border-emerald-500/30"
                  : item.status === "in-progress"
                    ? "bg-cyan-500/10 border-cyan-500/30"
                    : "bg-white/5"
                  }`}
              >
                <div className="flex items-start gap-4 sm:gap-6">
                  <div
                    className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-lg sm:text-xl ${item.status === "completed"
                      ? "bg-gradient-to-br from-emerald-400 to-cyan-400 text-black"
                      : item.status === "in-progress"
                        ? "bg-gradient-to-br from-cyan-400 to-blue-400 text-black"
                        : "bg-white/10 text-gray-400"
                      }`}
                  >
                    {item.status === "completed" ? "✓" : index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl sm:text-2xl font-bold text-white">{item.phase}</h3>
                      {item.status === "in-progress" && (
                        <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-semibold">
                          In Progress
                        </span>
                      )}
                    </div>
                    <h4 className="font-semibold text-lg mb-2 text-white">{item.title}</h4>
                    <p className="text-gray-400 text-sm sm:text-base">{item.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Governance Section */}
      <section className="py-20 px-4 sm:px-6 relative">
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 sm:p-12 bg-gradient-to-br from-emerald-500/10 via-cyan-500/10 to-blue-500/10 border-emerald-500/20 backdrop-blur-sm text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-emerald-400 via-cyan-400 to-blue-500 flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl sm:text-4xl">🗳️</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-white">
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
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
      <section id="links" className="py-20 px-4 sm:px-6 relative">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                Join Our Community
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-base sm:text-lg text-pretty">
              Connect with us across our official channels
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { name: "Telegram", url: "https://t.me/MleeDAO", icon: "💬" },
              { name: "X (Twitter)", url: "https://x.com/MLEEDAO", icon: "𝕏" },
              { name: "GitHub", url: "https://github.com/shenzhou-web/mlee-dao", icon: "💻" },
            ].map((link, index) => (
              <Card
                key={index}
                onClick={() => window.open(link.url, "_blank")}
                className="p-6 bg-transparent backdrop-blur-sm border-white/10 hover:border-emerald-500/30 hover:bg-emerald-500/10 transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 text-white rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                      {link.icon}
                    </div>
                    <span className="font-semibold text-lg text-emerald-500 group-hover:text-white">
                      {link.name}
                    </span>
                  </div>
                  <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-emerald-400 transition-colors" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>


      {/* Contact & Resources Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 relative">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white">
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                Official Contact & Resources
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-base sm:text-lg text-pretty">
              Connect through our verified channels
            </p>
          </div>

          {/* Official Email Box - Prominent */}
          <Card className="mb-8 p-8 bg-gradient-to-br from-emerald-500/10 via-cyan-500/10 to-blue-500/10 border-emerald-500/20 backdrop-blur-sm">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="text-center sm:text-left">
                <h3 className="text-xl sm:text-2xl font-bold mb-2 text-white">Official Email</h3>
                <p className="text-gray-400 mb-4">For partnerships, inquiries, and official communications</p>
                <div className="flex items-center gap-2 p-4 rounded-xl bg-black/40 border border-white/10">
                  <code className="text-sm sm:text-base flex-1 text-emerald-400 font-mono">{officialEmail}</code>
                  <button
                    onClick={copyEmail}
                    className="p-2 rounded-lg hover:bg-white/10 transition-colors flex-shrink-0"
                  >
                    {emailCopied ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4 text-white" />
                    )}
                  </button>
                </div>
              </div>
              <Button
                onClick={() => window.open(`mailto:${officialEmail}`, "_blank")}
                size="lg"
                className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 text-black font-bold hover:opacity-90"
              >
                Send Email
              </Button>
            </div>
          </Card>

          {/* Official Website */}
          <Card className="mb-8 p-6 bg-white/5 backdrop-blur-sm border-white/10 hover:border-emerald-500/30 transition-all">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 text-white">Official Website</h3>
                <p className="text-emerald-400 text-sm sm:text-base font-mono">{officialWebsite}</p>
              </div>

            </div>
          </Card>


          {/* Additional Resources */}
          <div className="grid sm:grid-cols-2 gap-6">
            <Card className="p-6 bg-white/5 backdrop-blur-sm border-white/10 hover:border-cyan-500/30 transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center flex-shrink-0">
                  <Download className="w-6 h-6 text-cyan-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold mb-2 text-white">Whitepaper</h3>
                  <p className="text-sm text-gray-400 mb-4">You can view our white paper by downloading it. </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-cyan-500/30 hover:bg-cyan-500/10 text-white hover:text-white bg-transparent"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    <a href="/whitepaper.pdf" download className="flex items-center">
                      Download Whitepaper
                    </a>
                  </Button>
                </div>
              </div>
            </Card>



            <Card className="p-6 bg-transparent backdrop-blur-sm border-white/10 hover:border-emerald-500/30 transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 flex items-center justify-center flex-shrink-0">
                  <ExternalLink className="w-6 h-6 text-emerald-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold mb-2 text-white">Social Media</h3>
                  <p className="text-sm text-gray-400 mb-4">Follow us for updates and community engagement</p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open("https://t.me/MleeDAO", "_blank")}
                      className="border-emerald-500 bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 hover:text-white hover:shadow-lg hover:shadow-emerald-500/25"
                    >
                      Telegram
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open("https://x.com/MLEEDAO", "_blank")}
                      className="border-emerald-500 bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 hover:text-white hover:shadow-lg hover:shadow-emerald-500/25"
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
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              {/* Logo without background */}
              <img src="/logo.svg" alt="MLEE DAO Logo" className="w-12 h-12 object-contain" />
              <span className="text-xl font-bold">MLEE DAO</span>
            </div>
            <div className="text-center md:text-right">
              <p className="text-gray-400 text-sm">© {new Date().getFullYear()} MLEE DAO. All rights reserved.</p>
              <p className="text-gray-500 text-xs mt-1">Built on BNB Smart Chain</p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
