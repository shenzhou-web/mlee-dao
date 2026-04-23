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
  { num: "90",   label: "Day Presale" },
  { num: "3",    label: "Price Phases" },
  { num: "200M", label: "Hard Cap" },
  { num: "8",    label: "Month Vesting" },
]

const FOOTER_LINKS = [
  { label: "X/Twitter",  href: "https://x.com/MDAO_OFFICIAL" },
  { label: "Telegram",   href: "https://t.me/MleeDAO" },
  { label: "Whitepaper", href: "/whitepaper.pdf" },
  { label: "Presale",    href: "/presale" },
]

/* ─── Helpers ─── */
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
      className="mx-4 sm:mx-6"
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
        fontSize: "clamp(1.8rem, 5vw, 3rem)",
        letterSpacing: "0.05em",
        color: "white",
        lineHeight: 1.05,
      }}
    >
      {children}
    </h2>
  )
}

/* ─── Background ─── */
function BackgroundOrbs() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div
        className="absolute rounded-full"
        style={{
          width: "min(600px, 90vw)", height: "min(600px, 90vw)",
          top: -100, left: -150,
          background: "radial-gradient(circle, rgba(240,180,41,0.07) 0%, transparent 70%)",
          animation: "orb-drift 20s ease-in-out infinite",
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          width: "min(500px, 80vw)", height: "min(500px, 80vw)",
          bottom: "10%", right: -100,
          background: "radial-gradient(circle, rgba(46,216,163,0.06) 0%, transparent 70%)",
          animation: "orb-drift 25s ease-in-out infinite reverse",
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          width: "min(300px, 60vw)", height: "min(300px, 60vw)",
          top: "40%", left: "40%",
          background: "radial-gradient(circle, rgba(167,139,250,0.04) 0%, transparent 70%)",
          animation: "orb-drift 18s ease-in-out infinite 5s",
        }}
      />
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

/* ─── Navbar ─── */
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
      <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
          <Image
            src="/mdao-logo-removebg.png"
            alt="MLEE DAO"
            width={80}
            height={80}
            className="object-contain w-14 h-14 sm:w-20 sm:h-20"
          />
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

        {/* ✅ Changed to "Join Now" */}
        <Link
          href="/presale"
          className="inline-block rounded-xl transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(0.85rem, 2.5vw, 1rem)",
            letterSpacing: "0.12em",
            background: "linear-gradient(135deg, #f0b429, #ffd700)",
            color: "#05070a",
            padding: "10px 20px",
            whiteSpace: "nowrap",
          }}
        >
          Join Now
        </Link>
      </div>
    </header>
  )
}

/* ─── Ticker ─── */
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
      <div className="flex animate-ticker" style={{ whiteSpace: "nowrap" }}>
        {items.map((item, i) => (
          <span
            key={i}
            className="flex-shrink-0 px-6 sm:px-8 text-xs font-semibold uppercase tracking-widest"
            style={{ color: "rgba(240,180,41,0.7)", fontFamily: "'Rajdhani', sans-serif" }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

/* ─── Hero ─── */
function HeroSection() {
  return (
    <section
      className="relative px-4 sm:px-6 text-center"
      style={{
        paddingTop: "clamp(80px, 15vw, 120px)",
        paddingBottom: "clamp(40px, 8vw, 64px)",
      }}
    >
      {/* Badge */}
      <div
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 sm:mb-8 animate-fade-in-down"
        style={{
          background: "rgba(240,180,41,0.08)",
          border: "1px solid rgba(240,180,41,0.2)",
        }}
      >
        <span
          className="w-1.5 h-1.5 rounded-full animate-float flex-shrink-0"
          style={{ background: "#f0b429", display: "inline-block" }}
        />
        <span
          className="text-xs font-bold uppercase tracking-widest"
          style={{ color: "rgba(240,180,41,0.9)", fontFamily: "'Rajdhani', sans-serif" }}
        >
          Governance Reimagined
        </span>
      </div>

      {/* Headline */}
      <h1
        className="mb-5 animate-fade-in-up"
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "clamp(3rem, 12vw, 7.5rem)",
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

      {/* Subtitle — no forced line break on mobile */}
      <p
        className="mb-8 sm:mb-10 max-w-xl 2xl:max-w-2xl mx-auto animate-fade-in-up"
        style={{
          color: "rgba(255,255,255,0.5)",
          fontFamily: "'Rajdhani', sans-serif",
          fontWeight: 500,
          lineHeight: 1.6,
          fontSize: "clamp(1rem, 3vw, 1.2rem)",
          animationDelay: "0.25s",
          animationFillMode: "both",
        }}
      >
        A system where communities don&apos;t just participate — they help shape decisions.
      </p>

      {/* CTA buttons — full width on mobile, inline on desktop */}
      <div
        className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 animate-fade-in-up px-4 sm:px-0"
        style={{ animationDelay: "0.4s", animationFillMode: "both" }}
      >
        <Link
          href="/presale"
          className="w-full sm:w-auto inline-block text-center rounded-xl transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "1.05rem",
            letterSpacing: "0.14em",
            background: "linear-gradient(135deg, #f0b429, #ffd700)",
            color: "#05070a",
            boxShadow: "0 0 40px rgba(240,180,41,0.2)",
            padding: "14px 32px",
            maxWidth: "320px",
          }}
        >
          Explore the Ecosystem
        </Link>
        <a
          href="#how"
          className="w-full sm:w-auto inline-block text-center rounded-xl transition-all duration-200 hover:-translate-y-0.5"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "1.05rem",
            letterSpacing: "0.14em",
            color: "#f0b429",
            border: "1px solid rgba(240,180,41,0.4)",
            padding: "14px 32px",
            maxWidth: "320px",
          }}
        >
          How It Works
        </a>
      </div>
    </section>
  )
}

/* ─── Problem ─── */
function ProblemSection() {
  const ref = useScrollReveal()
  return (
    <section ref={ref} className="relative z-10 px-4 sm:px-6 py-14 sm:py-20">
      <div className="max-w-6xl 2xl:max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <div className="reveal delay-1">
          <SectionLabel>The Problem</SectionLabel>
          <SectionTitle>
            Most Systems<br />
            <GoldText>Still Fail</GoldText>
            <br />Communities
          </SectionTitle>
          <p
            className="mt-4 text-sm sm:text-base leading-relaxed"
            style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'Rajdhani', sans-serif", fontWeight: 500 }}
          >
            Decentralized in name — but centralized in practice. The same problems keep repeating across every ecosystem.
          </p>
        </div>

        <div
          className="rounded-2xl p-5 sm:p-8 reveal delay-2"
          style={{
            background: "rgba(10,14,20,0.85)",
            border: "1px solid rgba(255,255,255,0.06)",
            backdropFilter: "blur(12px)",
          }}
        >
          {PROBLEMS.map((p, i) => (
            <div
              key={p.title}
              className="flex items-start gap-3 sm:gap-4 py-4 sm:py-5"
              style={{ borderBottom: i < PROBLEMS.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}
            >
              <div
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-sm"
                style={{ background: "rgba(220,50,50,0.1)", border: "1px solid rgba(220,50,50,0.2)" }}
              >
                {p.icon}
              </div>
              <div>
                <h4
                  className="text-sm font-bold mb-1"
                  style={{ color: "white", fontFamily: "'Rajdhani', sans-serif" }}
                >
                  {p.title}
                </h4>
                <p
                  className="text-xs sm:text-sm leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'Rajdhani', sans-serif" }}
                >
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

/* ─── Solution ─── */
function SolutionSection() {
  const ref = useScrollReveal()
  return (
    <section ref={ref} className="relative z-10 px-4 sm:px-6 py-14 sm:py-20">
      <div className="max-w-6xl 2xl:max-w-[1400px] mx-auto">
        <div className="text-center reveal delay-1">
          <SectionLabel>The Solution</SectionLabel>
          <SectionTitle>MDAO Is Built <GoldText>To Change That</GoldText></SectionTitle>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mt-10 sm:mt-12">
          {SOLUTIONS.map((s, i) => (
            <div
              key={s.title}
              className={`rounded-2xl p-6 sm:p-8 group transition-all duration-300 hover:-translate-y-1 relative overflow-hidden reveal delay-${i + 2}`}
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
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center text-lg sm:text-xl mb-4 sm:mb-5"
                style={{ background: "rgba(240,180,41,0.08)", border: "1px solid rgba(240,180,41,0.2)" }}
              >
                {s.icon}
              </div>
              <h3
                className="mb-2 sm:mb-3"
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "clamp(1.2rem, 3vw, 1.4rem)",
                  letterSpacing: "0.05em",
                  color: "#f0b429",
                }}
              >
                {s.title}
              </h3>
              <p
                className="text-xs sm:text-sm leading-relaxed"
                style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'Rajdhani', sans-serif" }}
              >
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── How It Works ─── */
function HowItWorksSection() {
  const ref = useScrollReveal()
  return (
    <section id="how" ref={ref} className="relative z-10 px-4 sm:px-6 py-14 sm:py-20">
      <div className="max-w-6xl 2xl:max-w-[1400px] mx-auto">
        <div className="text-center reveal delay-1">
          <SectionLabel>How It Works</SectionLabel>
          <SectionTitle>A Structured <GoldText>Framework</GoldText></SectionTitle>
        </div>
        <div className="max-w-3xl 2xl:max-w-[1200px] mx-auto mt-10 sm:mt-12 relative">
          {/* Vertical line — hidden on very small screens */}
          <div
            className="absolute hidden sm:block"
            style={{
              left: "28px", top: "28px", bottom: "28px",
              width: "2px",
              background: "linear-gradient(180deg, #f0b429, rgba(240,180,41,0.1))",
            }}
          />
          <div className="space-y-4 sm:space-y-6">
            {STEPS.map((step, i) => (
              <div key={step.num} className={`flex gap-4 sm:gap-6 group reveal delay-${i + 2}`}>
                <div
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center flex-shrink-0 z-10 transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: "linear-gradient(135deg, #f0b429, #c88d14)",
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "clamp(1.1rem, 3vw, 1.4rem)",
                    color: "#05070a",
                    boxShadow: "0 0 20px rgba(240,180,41,0.25)",
                  }}
                >
                  {step.num}
                </div>
                <div
                  className="flex-1 min-w-0 rounded-2xl p-4 sm:p-6 transition-all duration-300"
                  style={{
                    background: "rgba(10,14,20,0.8)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    backdropFilter: "blur(10px)",
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "rgba(240,180,41,0.2)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)")}
                >
                  <h4
                    className="mb-1.5 sm:mb-2"
                    style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: "clamp(1.05rem, 3vw, 1.3rem)",
                      letterSpacing: "0.05em",
                      color: "white",
                    }}
                  >
                    {step.title}
                  </h4>
                  <p
                    className="text-xs sm:text-sm leading-relaxed"
                    style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'Rajdhani', sans-serif" }}
                  >
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

/* ─── Vision ─── */
function VisionSection() {
  const ref = useScrollReveal()
  return (
    <section ref={ref} className="relative z-10 px-4 sm:px-6 py-14 sm:py-20">
      <div className="max-w-6xl 2xl:max-w-[1400px] mx-auto">
        <div className="text-center reveal delay-1">
          <SectionLabel>Our Vision</SectionLabel>
          <SectionTitle>The Future We&apos;re <GoldText>Building Together</GoldText></SectionTitle>
        </div>
        <div
          className="max-w-4xl 2xl:max-w-[1200px] mx-auto mt-10 sm:mt-12 rounded-3xl relative overflow-hidden reveal delay-2 text-center"
          style={{
            background: "linear-gradient(135deg, rgba(240,180,41,0.07) 0%, rgba(10,14,20,0.9) 50%, rgba(46,216,163,0.04) 100%)",
            border: "1px solid rgba(240,180,41,0.2)",
            padding: "clamp(28px, 8vw, 64px) clamp(16px, 5vw, 48px)",
          }}
        >
          <div className="absolute top-0 left-0 w-12 h-12 sm:w-16 sm:h-16 border-t-2 border-l-2 rounded-tl-3xl" style={{ borderColor: "rgba(240,180,41,0.4)" }} />
          <div className="absolute bottom-0 right-0 w-12 h-12 sm:w-16 sm:h-16 border-b-2 border-r-2 rounded-br-3xl" style={{ borderColor: "rgba(240,180,41,0.4)" }} />
          <p
            className="max-w-2xl 2xl:max-w-3xl mx-auto"
            style={{
              color: "rgba(255,255,255,0.55)",
              fontFamily: "'Rajdhani', sans-serif",
              fontWeight: 500,
              lineHeight: 1.8,
              fontSize: "clamp(0.95rem, 3vw, 1.2rem)",
            }}
          >
            A future where digital communities operate without centralized control —
            driven by collaboration, transparency, and shared goals.
          </p>
          {/* Stats — 2 cols on mobile, 4 on desktop */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-10 mt-10 sm:mt-12">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(1.8rem, 5vw, 2.2rem)", color: "#f0b429", letterSpacing: "0.05em" }}>
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

/* ─── Final CTA ─── */
function FinalCTA() {
  const ref = useScrollReveal()
  return (
    <section ref={ref} className="relative z-10 px-4 sm:px-6 pb-20 sm:pb-28">
      <div
        className="max-w-3xl 2xl:max-w-[1200px] mx-auto text-center rounded-3xl relative overflow-hidden reveal delay-1"
        style={{
          background: "linear-gradient(135deg, rgba(240,180,41,0.08) 0%, rgba(10,14,20,0.95) 50%, rgba(46,216,163,0.05) 100%)",
          border: "1px solid rgba(240,180,41,0.2)",
          padding: "clamp(36px, 10vw, 72px) clamp(16px, 6vw, 64px)",
        }}
      >
        <div className="absolute top-0 left-0 w-12 h-12 sm:w-16 sm:h-16 border-t-2 border-l-2 rounded-tl-3xl" style={{ borderColor: "rgba(240,180,41,0.4)" }} />
        <div className="absolute bottom-0 right-0 w-12 h-12 sm:w-16 sm:h-16 border-b-2 border-r-2 rounded-br-3xl" style={{ borderColor: "rgba(240,180,41,0.4)" }} />

        <p
          className="text-xs uppercase tracking-widest font-semibold mb-4"
          style={{ color: "rgba(240,180,41,0.6)", fontFamily: "'Rajdhani', sans-serif" }}
        >
          Don&apos;t Miss Out
        </p>
        <h2
          className="mb-4 sm:mb-5"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(2rem, 8vw, 4.5rem)",
            letterSpacing: "0.05em",
            color: "white",
            lineHeight: 1,
          }}
        >
          Ready to Shape<br />The Future?
        </h2>
        <p
          className="text-sm sm:text-base max-w-md 2xl:max-w-xl mx-auto mb-7 sm:mb-8"
          style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Rajdhani', sans-serif", lineHeight: 1.7 }}
        >
          Learn more about MDAO and how the ecosystem is evolving. Join early — be part of what comes next.
        </p>

        {/* ✅ Changed to "Join Us" */}
        <Link
          href="/presale"
          className="inline-block w-full sm:w-auto rounded-xl transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "1.1rem",
            letterSpacing: "0.14em",
            background: "linear-gradient(135deg, #f0b429, #ffd700)",
            color: "#05070a",
            boxShadow: "0 0 40px rgba(240,180,41,0.2)",
            padding: "16px 48px",
            maxWidth: "280px",
          }}
        >
          Join Us
        </Link>

        <p
          className="mt-5 sm:mt-6 text-xs"
          style={{ color: "rgba(255,255,255,0.2)", fontFamily: "'Rajdhani', sans-serif" }}
        >
          BEP-20 USDT only &nbsp;·&nbsp; No KYC required &nbsp;·&nbsp; Fully on-chain
        </p>
      </div>
    </section>
  )
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer
      className="relative z-10 px-4 sm:px-6 py-8 sm:py-10 border-t"
      style={{ borderColor: "rgba(240,180,41,0.1)" }}
    >
      <div className="max-w-6xl 2xl:max-w-[1400px] mx-auto flex flex-col items-center gap-5 sm:flex-row sm:justify-between">
        <div className="flex items-center gap-2">
          <Image src="/mdao-logo-removebg.png" alt="MLEE DAO Logo" width={60} height={60} className="object-contain" />
          <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.1rem", letterSpacing: "0.1em", color: "rgba(255,255,255,0.3)" }}>
            MDAO © 2026
          </span>
        </div>
        {/* Footer links wrap on small screens */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
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

/* ─── Main Page ─── */
export default function JoinPage() {
  return (
    <div
      className="min-h-screen relative"
      style={{ background: "linear-gradient(180deg, #05070a 0%, #080c14 50%, #05070a 100%)" }}
    >
      <BackgroundOrbs />
      <GridBackground />
      <Navbar />

      <div className="relative z-10 mt-20 sm:mt-18">
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

