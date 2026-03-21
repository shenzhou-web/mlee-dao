"use client"

const features = [
  {
    icon: "🔒",
    title: "Linear Vesting",
    desc: "Tokens vest linearly over 8 months to protect long-term holder value and prevent market dumping.",
    accent: "#f0b429",
  },
  {
    icon: "📈",
    title: "Progressive Pricing",
    desc: "Three phases reward early participants while ensuring fair access throughout the full presale window.",
    accent: "#2ed8a3",
  },
  {
    icon: "🔗",
    title: "Easy Participation",
    desc: "Connect your Web3 wallet and participate directly. No KYC. No middlemen. Fully on-chain.",
    accent: "#a78bfa",
  },
  {
    icon: "⏱",
    title: "90-Day Duration",
    desc: "An extended presale period ensures fair distribution across the entire community.",
    accent: "#f0b429",
  },
  {
    icon: "🏛",
    title: "Transparent Governance",
    desc: "All protocol decisions made openly. MDAO holders vote on every major proposal.",
    accent: "#2ed8a3",
  },
  {
    icon: "⚡",
    title: "Minimal Rules",
    desc: "Simple, straightforward participation. No complex whitelists or opaque allocation processes.",
    accent: "#a78bfa",
  },
]

export function PresaleFeatures() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <p className="text-xs uppercase tracking-widest font-semibold" style={{ color: "rgba(240,180,41,0.6)", fontFamily: "'Rajdhani', sans-serif" }}>
          Why MDAO
        </p>
        <h2
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(2rem, 4vw, 2.8rem)",
            color: "white",
            letterSpacing: "0.05em",
          }}
        >
          Built for Long-Term Holders
        </h2>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((f, i) => (
          <div
            key={i}
            className="rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 group cursor-default"
            style={{
              background: "rgba(10, 14, 20, 0.8)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.border = `1px solid ${f.accent}30`
              ;(e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 20px ${f.accent}08`
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.border = "1px solid rgba(255,255,255,0.06)"
              ;(e.currentTarget as HTMLDivElement).style.boxShadow = "none"
            }}
          >
            <div className="flex items-start gap-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                style={{
                  background: `${f.accent}12`,
                  border: `1px solid ${f.accent}25`,
                }}
              >
                {f.icon}
              </div>
              <div>
                <h4
                  className="font-bold text-base mb-1.5"
                  style={{ color: "white", fontFamily: "'Rajdhani', sans-serif", fontWeight: 700 }}
                >
                  {f.title}
                </h4>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'Rajdhani', sans-serif" }}
                >
                  {f.desc}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
