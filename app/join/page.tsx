"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useScrollReveal } from "@/hooks/useScrollReveal"

const TICKER_ITEMS = [
  "⚡ MDAO TOKEN",
  "🏛 DECENTRALIZED GOVERNANCE",
  "🔥 PRESALE NOW LIVE",
  "🌍 COMMUNITY DRIVEN",
  "🔒 TRANSPARENT BY DESIGN",
  "🚀 BUILT FOR LONG-TERM",
  "🔎 VERIFIED ON BSC",
]

const PROBLEMS = [
  {
    icon: "📉",
    title: "Low Participation",
    desc: "Most token holders never vote. Passive holders create whale-dominated outcomes.",
  },
  {
    icon: "🏦",
    title: "Centralized Influence",
    desc: "A small group controls decisions while the majority have no real voice.",
  },
  {
    icon: "🔍",
    title: "Limited Transparency",
    desc: "Decisions happen behind closed doors. Communities are told after the fact.",
  },
]

const SOLUTIONS = [
  {
    icon: "✅",
    title: "Participation Matters",
    desc: "Every member has a stake in the outcome. Governance is designed to encourage active contribution, not passive holding.",
  },
  {
    icon: "🔍",
    title: "Decisions Are Transparent",
    desc: "Every proposal, vote, and outcome is recorded on-chain. No hidden agendas. No back-room deals.",
  },
  {
    icon: "🎙",
    title: "Contributors Have Voice",
    desc: "Those who contribute to the ecosystem have the loudest voice. Governance reflects real community effort.",
  },
]

const STEPS = [
  {
    num: "01",
    title: "Engage in Discussions",
    desc: "Community members propose ideas, debate improvements, and collaborate openly. Every voice is heard before decisions are made.",
  },
  {
    num: "02",
    title: "Contribute to Ecosystem Growth",
    desc: "Participants earn governance weight by contributing — through development, community building, and meaningful ecosystem activity.",
  },
  {
    num: "03",
    title: "Be Part of Decision-Making",
    desc: "When proposals are ready, contributors vote on-chain. Results are final, transparent, and binding — no central authority needed.",
  },
]

const STATS = [
  { num: "90", label: "Day Presale" },
  { num: "3",  label: "Price Phases" },
  { num: "200M", label: "Hard Cap" },
  { num: "8",  label: "Month Vesting" },
]

const FOOTER_LINKS = [
  { label: "X/Twitter",   href: "https://x.com/MLEEDAO" },
  { label: "Telegram",    href: "https://t.me/MleeDAO" },
  { label: "Whitepaper",  href: "/whitepaper.pdf" },
  { label: "Presale",     href: "/presale" },
]

function GoldText({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        background: "linear-gradient(135deg, #f0b429 0%, #ffd700 40%, #c88d14 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}
    >
      {children}
    </span>
  )
}

function Divider() {
  return (
    <div
      className="mx-6"
      style={{
        height: "1px",
        background: "linear-gradient(90deg, transparent, rgba(240,180,41,0.3), transparent)",
      }}
    />
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-xs uppercase tracking-widest font-semibold mb-3"
      style={{ color: "rgba(240,180,41,0.6)", fontFamily: "'Rajdhani', sans-serif" }}
    >
      {children}
    </p>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      style={{
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: "clamp(2rem, 4vw, 3rem)",
        letterSpacing: "0.05em",
        color: "white",
        lineHeight: 1.05,
      }}
    >
      {children}
    </h2>
  )
}

function BackgroundOrbs() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {[
        { w: 600, h: 600, top: -100, left: -150, color: "rgba(240,180,41,0.07)", dur: "20s" },
        { w: 500, h: 500, bottom: "10%", right: -100, color: "rgba(46,216,163,0.06)", dur: "25s", rev: true },
        { w: 300, h: 300, top: "40%", left: "40%", color: "rgba(167,139,250,0.04)", dur: "18s", delay: "5s" },
      ].map((o, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: o.w, height: o.h,
            top: o.top, left: o.left,
            bottom: (o as any).bottom, right: (o as any).right,
            background: `radial-gradient(circle, ${o.color} 0%, transparent 70%)`,
            animation: `orb-drift ${o.dur} ease-in-out infinite ${o.rev ? "reverse" : ""} ${o.delay ?? ""}`,
          }}
        />
      ))}
    </div>
  )
}

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

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", fn)
    return () => window.removeEventListener("scroll", fn)
  }, [])

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(5,7,10,0.95)" : "rgba(5,7,10,0.7)",
        backdropFilter: "blur(20px)",
        borderBottom: `1px solid ${scrolled ? "rgba(240,180,41,0.12)" : "transparent"}`,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition">
          <Image src="/mdao-logo-removebg.png" alt="MLEE DAO" width={100} height={100} className="object-contain" />
          <span
            className="hidden sm:block text-xs px-2 py-0.5 rounded-full uppercase tracking-widest font-semibold"
            style={{
              background: "rgba(240,180,41,0.1)",
              border: "1px solid rgba(240,180,41,0.2)",
              color: "#f0b429",
              fontFamily: "'Rajdhani', sans-serif",
            }}
          >
            Governance
          </span>
        </Link>
        <Link
          href="/presale"
          className="inline-block px-6 py-2.5 rounded-xl transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "1rem",
            letterSpacing: "0.12em",
            background: "linear-gradient(135deg, #f0b429, #ffd700)",
            color: "#05070a",
          }}
        >
          Join Presale
        </Link>
      </div>
    </header>
  )
}

function TickerTape() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS]
  return (
    <div
      className="w-full py-2.5 overflow-hidden"
      style={{
        background: "rgba(240,180,41,0.05)",
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

function HeroSection() {
  return (
    <section className="relative pt-28 pb-16 px-4 sm:px-6 text-center">
      <div
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 animate-fade-in-down"
        style={{
          background: "rgba(240,180,41,0.08)",
          border: "1px solid rgba(240,180,41,0.2)",
        }}
      >
        <span className="w-1.5 h-1.5 rounded-full animate-float" style={{ background: "#f0b429", display: "inline-block" }} />
        <span
          className="text-xs font-bold uppercase tracking-widest"
          style={{ color: "rgba(240,180,41,0.9)", fontFamily: "'Rajdhani', sans-serif" }}
        >
          Governance Reimagined
        </span>
      </div>

      <h1
        className="mb-6 animate-fade-in-up"
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "clamp(3.5rem, 10vw, 7.5rem)",
          letterSpacing: "0.04em",
          lineHeight: 0.95,
          color: "white",
          animationDelay: "0.1s",
          animationFillMode: "both",
        }}
      >
        Redefining<br />
        <GoldText>Decentralized</GoldText>
        <br />Governance
      </h1>

      <p
        className="text-lg sm:text-xl mb-10 max-w-2xl mx-auto animate-fade-in-up"
        style={{
          color: "rgba(255,255,255,0.5)",
          fontFamily: "'Rajdhani', sans-serif",
          fontWeight: 500,
          lineHeight: 1.6,
          animationDelay: "0.25s",
          animationFillMode: "both",
        }}
      >
        A system where communities don&apos;t just participate —<br />
        they help shape decisions.
      </p>

      <div
        className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up"
        style={{ animationDelay: "0.4s", animationFillMode: "both" }}
      >
        <Link
          href="/presale"
          className="inline-block px-10 py-4 rounded-xl transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "1.05rem",
            letterSpacing: "0.14em",
            background: "linear-gradient(135deg, #f0b429, #ffd700)",
            color: "#05070a",
            boxShadow: "0 0 40px rgba(240,180,41,0.2)",
          }}
        >
          Explore the Ecosystem
        </Link>
        <a
          href="#how"
          className="inline-block px-10 py-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "1.05rem",
            letterSpacing: "0.14em",
            color: "#f0b429",
            border: "1px solid rgba(240,180,41,0.4)",
          }}
        >
          How It Works
        </a>
      </div>
    </section>
  )
}

function ProblemSection() {
  const ref = useScrollReveal()
  return (
    <section ref={ref} className="relative z-10 px-4 sm:px-6 py-20">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div className="reveal delay-1">
          <SectionLabel>The Problem</SectionLabel>
          <SectionTitle>
            Most Systems<br />
            <GoldText>Still Fail</GoldText>
            <br />Communities
          </SectionTitle>
          <p
            className="mt-5 text-base leading-relaxed"
            style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'Rajdhani', sans-serif", fontWeight: 500 }}
          >
            Decentralized in name — but centralized in practice. The same problems keep repeating across every ecosystem.
          </p>
        </div>

        <div
          className="rounded-2xl p-8 reveal delay-2"
          style={{
            background: "rgba(10,14,20,0.85)",
            border: "1px solid rgba(255,255,255,0.06)",
            backdropFilter: "blur(12px)",
          }}
        >
          {PROBLEMS.map((p, i) => (
            <div
              key={p.title}
              className="flex items-start gap-4 py-5"
              style={{ borderBottom: i < PROBLEMS.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-base"
                style={{ background: "rgba(220,50,50,0.1)", border: "1px solid rgba(220,50,50,0.2)" }}
              >
                {p.icon}
              </div>
              <div>
                <h4 className="text-sm font-bold mb-1" style={{ color: "white", fontFamily: "'Rajdhani', sans-serif" }}>
                  {p.title}
                </h4>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'Rajdhani', sans-serif" }}>
                  {p.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function SolutionSection() {
  const ref = useScrollReveal()
  return (
    <section ref={ref} className="relative z-10 px-4 sm:px-6 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center reveal delay-1">
          <SectionLabel>The Solution</SectionLabel>
          <SectionTitle>MDAO Is Built <GoldText>To Change That</GoldText></SectionTitle>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
          {SOLUTIONS.map((s, i) => (
            <div
              key={s.title}
              className={`rounded-2xl p-8 group transition-all duration-300 hover:-translate-y-1 relative overflow-hidden reveal delay-${i + 2}`}
              style={{
                background: "rgba(10,14,20,0.85)",
                border: "1px solid rgba(240,180,41,0.2)",
                backdropFilter: "blur(12px)",
              }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "linear-gradient(90deg, transparent, #f0b429, transparent)" }}
              />
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl mb-5"
                style={{ background: "rgba(240,180,41,0.08)", border: "1px solid rgba(240,180,41,0.2)" }}
              >
                {s.icon}
              </div>
              <h3
                className="mb-3"
                style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.4rem", letterSpacing: "0.05em", color: "#f0b429" }}
              >
                {s.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'Rajdhani', sans-serif" }}>
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function HowItWorksSection() {
  const ref = useScrollReveal()
  return (
    <section id="how" ref={ref} className="relative z-10 px-4 sm:px-6 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center reveal delay-1">
          <SectionLabel>How It Works</SectionLabel>
          <SectionTitle>A Structured <GoldText>Framework</GoldText></SectionTitle>
        </div>
        <div className="max-w-3xl mx-auto mt-12 relative">
          <div
            className="absolute left-7 top-7 bottom-7 w-px"
            style={{ background: "linear-gradient(180deg, #f0b429, rgba(240,180,41,0.1))" }}
          />
          <div className="space-y-6">
            {STEPS.map((step, i) => (
              <div key={step.num} className={`flex gap-6 group reveal delay-${i + 2}`}>
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 z-10 transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: "linear-gradient(135deg, #f0b429, #c88d14)",
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "1.4rem",
                    color: "#05070a",
                    boxShadow: "0 0 20px rgba(240,180,41,0.25)",
                  }}
                >
                  {step.num}
                </div>
                <div
                  className="flex-1 rounded-2xl p-6 transition-all duration-300"
                  style={{
                    background: "rgba(10,14,20,0.8)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    backdropFilter: "blur(10px)",
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "rgba(240,180,41,0.2)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)")}
                >
                  <h4
                    className="mb-2"
                    style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.3rem", letterSpacing: "0.05em", color: "white" }}
                  >
                    {step.title}
                  </h4>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'Rajdhani', sans-serif" }}>
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function VisionSection() {
  const ref = useScrollReveal()
  return (
    <section ref={ref} className="relative z-10 px-4 sm:px-6 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center reveal delay-1">
          <SectionLabel>Our Vision</SectionLabel>
          <SectionTitle>The Future We&apos;re <GoldText>Building Together</GoldText></SectionTitle>
        </div>
        <div
          className="max-w-4xl mx-auto mt-12 rounded-3xl p-12 sm:p-16 text-center relative overflow-hidden reveal delay-2"
          style={{
            background: "linear-gradient(135deg, rgba(240,180,41,0.07) 0%, rgba(10,14,20,0.9) 50%, rgba(46,216,163,0.04) 100%)",
            border: "1px solid rgba(240,180,41,0.2)",
          }}
        >
          <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 rounded-tl-3xl" style={{ borderColor: "rgba(240,180,41,0.4)" }} />
          <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 rounded-br-3xl" style={{ borderColor: "rgba(240,180,41,0.4)" }} />
          <p
            className="text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto"
            style={{ color: "rgba(255,255,255,0.55)", fontFamily: "'Rajdhani', sans-serif", fontWeight: 500 }}
          >
            A future where digital communities operate without centralized control —
            driven by collaboration, transparency, and shared goals.
          </p>
          <div className="flex flex-wrap justify-center gap-10 sm:gap-16 mt-12">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "2.2rem", color: "#f0b429", letterSpacing: "0.05em" }}>
                  {s.num}
                </div>
                <div
                  className="text-xs uppercase tracking-widest font-semibold mt-1"
                  style={{ color: "rgba(255,255,255,0.25)", fontFamily: "'Rajdhani', sans-serif" }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function FinalCTA() {
  const ref = useScrollReveal()
  return (
    <section ref={ref} className="relative z-10 px-4 sm:px-6 pb-28">
      <div
        className="max-w-3xl mx-auto text-center rounded-3xl p-12 sm:p-16 relative overflow-hidden reveal delay-1"
        style={{
          background: "linear-gradient(135deg, rgba(240,180,41,0.08) 0%, rgba(10,14,20,0.95) 50%, rgba(46,216,163,0.05) 100%)",
          border: "1px solid rgba(240,180,41,0.2)",
        }}
      >
        <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 rounded-tl-3xl" style={{ borderColor: "rgba(240,180,41,0.4)" }} />
        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 rounded-br-3xl" style={{ borderColor: "rgba(240,180,41,0.4)" }} />

        <p className="text-xs uppercase tracking-widest font-semibold mb-4" style={{ color: "rgba(240,180,41,0.6)", fontFamily: "'Rajdhani', sans-serif" }}>
          Don&apos;t Miss Out
        </p>
        <h2
          className="mb-5"
          style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.5rem, 6vw, 4.5rem)", letterSpacing: "0.05em", color: "white", lineHeight: 1 }}
        >
          Ready to Shape<br />The Future?
        </h2>
        <p className="text-base max-w-md mx-auto mb-8" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Rajdhani', sans-serif", lineHeight: 1.7 }}>
          Learn more about MDAO and how the ecosystem is evolving.
          Join early — be part of what comes next.
        </p>
        <Link
          href="/presale"
          className="inline-block px-12 py-4 rounded-xl transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "1.1rem",
            letterSpacing: "0.14em",
            background: "linear-gradient(135deg, #f0b429, #ffd700)",
            color: "#05070a",
            boxShadow: "0 0 40px rgba(240,180,41,0.2)",
          }}
        >
          Get Started
        </Link>
        <p className="mt-6 text-xs" style={{ color: "rgba(255,255,255,0.2)", fontFamily: "'Rajdhani', sans-serif" }}>
          BEP-20 USDT only &nbsp;·&nbsp; No KYC required &nbsp;·&nbsp; Fully on-chain
        </p>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="relative z-10 px-4 sm:px-6 py-10 border-t" style={{ borderColor: "rgba(240,180,41,0.1)" }}>
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Image src="/mdao-logo-removebg.png" alt="MLEE DAO Logo" width={70} height={70} className="object-contain" />
          <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.1rem", letterSpacing: "0.1em", color: "rgba(255,255,255,0.3)" }}>
            MDAO © 2026
          </span>
        </div>
        <div className="flex items-center gap-6">
          {FOOTER_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="text-xs font-semibold uppercase tracking-wider transition-colors duration-200"
              style={{ color: "rgba(255,255,255,0.3)", fontFamily: "'Rajdhani', sans-serif" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#f0b429")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.3)")}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}

export default function JoinPage() {
  return (
    <div
      className="min-h-screen relative"
      style={{ background: "linear-gradient(180deg, #05070a 0%, #080c14 50%, #05070a 100%)" }}
    >
      <BackgroundOrbs />
      <GridBackground />
      <Navbar />

      <div className="relative z-10 mt-16">
        <TickerTape />
      </div>

      <main className="relative z-10">
        <HeroSection />
        <Divider />
        <ProblemSection />
        <Divider />
        <SolutionSection />
        <Divider />
        <HowItWorksSection />
        <Divider />
        <VisionSection />
        <FinalCTA />
      </main>

      <Footer />
    </div>
  )
}