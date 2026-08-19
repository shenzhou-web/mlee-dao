"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Building2, CalendarDays, Check, Copy, Globe2, Lock, QrCode, X } from "lucide-react";
import { SiteFooter } from "@/components/layout/site-footer";
import {
  fetchPublicPartnershipCompanies,
  type PublicPartnershipCompany,
} from "@/lib/partnership-api";

/* ── Helpers ── */
function formatJoinedDate(value: string | null) {
  if (!value) return "Recently joined";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Recently joined";
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

const LOCK_PERIOD_MAP: Record<number, string> = {
  0: "3 months",
  1: "6 months",
  2: "9 months",
  3: "18 months",
  4: "36 months",
};

function formatLockPeriod(value: number | null | undefined): string | null {
  if (value == null) return null;
  return LOCK_PERIOD_MAP[value] ?? `${value} months`;
}

function shortenWallet(address: string | null | undefined, head = 6, tail = 4): string {
  if (!address) return "—";
  if (address.length <= head + tail + 3) return address;
  return `${address.slice(0, head)}…${address.slice(-tail)}`;
}

function qrCodeUrl(data: string, size = 220) {
  return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&margin=8&data=${encodeURIComponent(data)}`;
}

/* ── Sub-components ── */
function CompanyInitials({ name }: { name: string }) {
  const initials = name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();
  return (
    <span style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", letterSpacing: "0.08em", color: "var(--gold)" }}>
      {initials}
    </span>
  );
}

function MetaRow({
  icon, label, value, valueColor = "rgba(255,255,255,0.78)",
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  valueColor?: string;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
      <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, color: "rgba(255,255,255,0.3)" }}>
        {icon}{label}
      </span>
      <span style={{ fontSize: 12, fontWeight: 600, color: valueColor, letterSpacing: "0.02em" }}>
        {value}
      </span>
    </div>
  );
}

/* Wallet row: shortened address + copy button + QR trigger */
function WalletRow({ address }: { address: string }) {
  const [copied, setCopied] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);

  async function handleCopy(e: React.MouseEvent) {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // clipboard unavailable — silently ignore
    }
  }

  return (
    <>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, color: "rgba(255,255,255,0.3)" }}>
          <Building2 size={13} style={{ opacity: 0 }} />
        </span>
      </div>
      <div
        style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          marginTop: 4, padding: "10px 12px", borderRadius: 10,
          background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <span
          title={address}
          style={{
            fontFamily: "var(--font-mono, monospace)", fontSize: 12,
            color: "rgba(255,255,255,0.6)", letterSpacing: "0.01em",
          }}
        >
          {shortenWallet(address)}
        </span>

        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <button
            type="button"
            onClick={handleCopy}
            aria-label="Copy wallet address"
            style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              width: 26, height: 26, borderRadius: 7, cursor: "pointer",
              background: copied ? "rgba(46,216,163,0.12)" : "rgba(255,255,255,0.04)",
              border: copied ? "1px solid rgba(46,216,163,0.3)" : "1px solid rgba(255,255,255,0.08)",
              transition: "all 0.2s ease",
            }}
          >
            {copied
              ? <Check size={12} style={{ color: "var(--jade)" }} />
              : <Copy size={12} style={{ color: "rgba(255,255,255,0.4)" }} />}
          </button>

          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setQrOpen(true); }}
            aria-label="Show wallet QR code"
            style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              width: 26, height: 26, borderRadius: 7, cursor: "pointer",
              background: "rgba(240,180,41,0.06)", border: "1px solid rgba(240,180,41,0.2)",
              transition: "all 0.2s ease",
            }}
          >
            <QrCode size={12} style={{ color: "var(--gold)" }} />
          </button>
        </div>
      </div>

      {qrOpen && (
        <div
          onClick={() => setQrOpen(false)}
          style={{
            position: "fixed", inset: 0, zIndex: 100,
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "rgba(4,6,10,0.75)", backdropFilter: "blur(6px)",
            padding: 24,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "min(320px, 100%)", borderRadius: 20, padding: 28,
              background: "linear-gradient(160deg, rgba(20,25,35,1) 0%, rgba(10,13,20,1) 100%)",
              border: "1px solid rgba(240,180,41,0.25)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(240,180,41,0.06)",
              textAlign: "center", position: "relative",
            }}
          >
            <button
              type="button"
              onClick={() => setQrOpen(false)}
              aria-label="Close"
              style={{
                position: "absolute", top: 14, right: 14,
                width: 26, height: 26, borderRadius: 8, cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <X size={13} style={{ color: "rgba(255,255,255,0.5)" }} />
            </button>

            <p style={{
              fontSize: 10, fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase",
              color: "var(--gold)", margin: "0 0 18px",
            }}>
              Wallet Address
            </p>

            <div style={{
              display: "inline-flex", padding: 14, borderRadius: 14,
              background: "#ffffff", boxShadow: "0 0 0 1px rgba(240,180,41,0.2)",
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={qrCodeUrl(address)} alt="Wallet address QR code" width={220} height={220} style={{ display: "block", borderRadius: 4 }} />
            </div>

            <p style={{
              marginTop: 18, fontSize: 12, fontFamily: "var(--font-mono, monospace)",
              color: "rgba(255,255,255,0.5)", wordBreak: "break-all", lineHeight: 1.6,
            }}>
              {address}
            </p>
          </div>
        </div>
      )}
    </>
  );
}

function SkeletonCard() {
  return (
    <div
      className="animate-pulse"
      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, padding: 24 }}
    >
      <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
        <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(255,255,255,0.06)", flexShrink: 0 }} />
        <div style={{ flex: 1 }}>
          <div style={{ height: 14, width: "60%", borderRadius: 6, background: "rgba(255,255,255,0.06)", marginBottom: 8 }} />
          <div style={{ height: 11, width: "35%", borderRadius: 6, background: "rgba(255,255,255,0.04)" }} />
        </div>
      </div>
      <div style={{ marginTop: 18, height: 11, borderRadius: 6, background: "rgba(255,255,255,0.04)", marginBottom: 8 }} />
      <div style={{ height: 11, width: "75%", borderRadius: 6, background: "rgba(255,255,255,0.04)" }} />
      <div style={{ marginTop: 18, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ height: 11, width: "50%", borderRadius: 6, background: "rgba(255,255,255,0.04)", marginBottom: 10 }} />
        <div style={{ height: 11, width: "45%", borderRadius: 6, background: "rgba(255,255,255,0.04)" }} />
        <div style={{ height: 34, width: "100%", borderRadius: 10, background: "rgba(255,255,255,0.03)", marginTop: 12 }} />
      </div>
    </div>
  );
}

function CompanyCard({ company }: { company: PublicPartnershipCompany }) {
  const [hovered, setHovered] = useState(false);
  const lockLabel = formatLockPeriod(company.lockPeriod);

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex", flexDirection: "column",
        borderRadius: 16, padding: 24,
        background: hovered
          ? "linear-gradient(135deg, rgba(20,25,35,1) 0%, rgba(13,17,26,1) 100%)"
          : "rgba(255,255,255,0.025)",
        border: hovered ? "1px solid rgba(240,180,41,0.35)" : "1px solid rgba(255,255,255,0.07)",
        boxShadow: hovered ? "0 8px 40px rgba(240,180,41,0.07), inset 0 0 30px rgba(240,180,41,0.02)" : "none",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        transition: "all 0.3s ease",
        cursor: "default",
      }}
    >
      <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
        <div style={{
          width: 44, height: 44, borderRadius: 12, flexShrink: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          background: "rgba(240,180,41,0.06)", border: "1px solid rgba(240,180,41,0.18)",
        }}>
          <CompanyInitials name={company.companyName} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h2 style={{ fontSize: 15, fontWeight: 600, margin: 0, color: "rgba(255,255,255,0.9)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {company.companyName}
          </h2>
          <p style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", margin: "4px 0 0", letterSpacing: "0.04em" }}>
            {company.industry}
          </p>
        </div>
      </div>

      {company.description && (
        <p style={{
          marginTop: 16, flex: 1, fontSize: 13, lineHeight: 1.7,
          color: "rgba(255,255,255,0.38)",
          display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden",
        }}>
          {company.description}
        </p>
      )}

      <div style={{ marginTop: 18, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <MetaRow icon={<Globe2 size={13} />} label="Country" value={company.country} />
        <MetaRow icon={<CalendarDays size={13} />} label="Joined" value={formatJoinedDate(company.joinedAt)} />
        {lockLabel && (
          <MetaRow icon={<Lock size={13} />} label="Lock period" value={lockLabel} valueColor="var(--jade)" />
        )}
        {company.walletAddress && <WalletRow address={company.walletAddress} />}
      </div>
    </article>
  );
}

/* ── Page ── */
export default function PartnershipCompaniesPage() {
  const [companies, setCompanies] = useState<PublicPartnershipCompany[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    fetchPublicPartnershipCompanies()
      .then((items) => { if (active) { setCompanies(items); setError(null); } })
      .catch(() => { if (active) setError("Unable to load partner companies right now."); })
      .finally(() => { if (active) setIsLoading(false); });
    return () => { active = false; };
  }, []);

  return (
    <main style={{ minHeight: "100vh", background: "var(--bg-deep)", color: "var(--foreground)", fontFamily: "var(--font-sans)" }}>

      {/* ════════════════════════════════════════
          HERO — full-width split layout
      ════════════════════════════════════════ */}
      <header style={{ position: "relative", overflow: "hidden" }}>

        {/* Deep background layer */}
        <div style={{ position: "absolute", inset: 0, background: "#080c14", zIndex: 0 }} />

        {/* Gold orb — upper left */}
        <div style={{
          position: "absolute", top: -160, left: -100, width: 600, height: 600, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(240,180,41,0.14) 0%, transparent 65%)",
          zIndex: 0, pointerEvents: "none",
        }} />

        {/* Jade orb — lower right */}
        <div style={{
          position: "absolute", bottom: -80, right: -80, width: 420, height: 420, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(46,216,163,0.09) 0%, transparent 65%)",
          zIndex: 0, pointerEvents: "none",
        }} />

        {/* Diagonal grid */}
        <div className="grid-bg" style={{ position: "absolute", inset: 0, opacity: 0.45, zIndex: 0 }} />

        {/* Gold bottom edge */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: 1,
          background: "linear-gradient(90deg, transparent, rgba(240,180,41,0.3) 40%, rgba(240,180,41,0.3) 60%, transparent)",
          zIndex: 2,
        }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto", padding: "60px 40px 72px" }}>

          {/* Back link */}
          <Link
            href="/partnership"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              fontSize: 11, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase",
              color: "rgba(255,255,255,0.3)", textDecoration: "none",
              padding: "7px 14px", borderRadius: 100,
              border: "1px solid rgba(255,255,255,0.07)",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "var(--gold)"; e.currentTarget.style.borderColor = "rgba(240,180,41,0.3)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.3)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; }}
          >
            <ArrowLeft size={12} />
            Back to Partnership
          </Link>

          {/* Two-column hero layout */}
          <div style={{ marginTop: 52, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, alignItems: "stretch" }}>

            {/* LEFT — headline */}
            <div style={{ paddingRight: 48, borderRight: "1px solid rgba(255,255,255,0.07)" }}>
              {/* Eyebrow */}
              <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
                <span style={{ width: 24, height: 2, background: "var(--jade)", borderRadius: 2, display: "block" }} />
                <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--jade)" }}>
                  Verified Public Partners
                </span>
              </div>

              <h1 style={{
                fontFamily: "var(--font-display)", margin: 0, lineHeight: 0.95,
                letterSpacing: "0.04em",
                fontSize: "clamp(3.2rem, 6.5vw, 5.2rem)",
              }}>
                <span style={{ display: "block", color: "rgba(255,255,255,0.92)" }}>MDAO</span>
                <span style={{ display: "block", color: "rgba(255,255,255,0.92)" }}>PARTNER</span>
                <span style={{
                  display: "block",
                  background: "linear-gradient(135deg, #f0b429 0%, #ffe066 45%, #c88d14 100%)",
                  WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent",
                }}>
                  COMPANIES
                </span>
              </h1>

              <p style={{ marginTop: 24, fontSize: 14, lineHeight: 1.85, color: "rgba(255,255,255,0.4)", maxWidth: 420 }}>
                A public registry of companies that opted into visibility as verified MDAO partnership members — from early-stage ventures to established enterprises.
              </p>
            </div>

            {/* RIGHT — stats */}
            <div style={{ paddingLeft: 48, display: "flex", flexDirection: "column", justifyContent: "center", gap: 20 }}>

              {/* Primary stat */}
              <div style={{
                padding: "28px 32px", borderRadius: 16,
                background: "linear-gradient(135deg, rgba(240,180,41,0.09) 0%, rgba(240,180,41,0.03) 100%)",
                border: "1px solid rgba(240,180,41,0.18)",
              }}>
                <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", margin: 0 }}>
                  Total Public Profiles
                </p>
                <p style={{
                  fontFamily: "var(--font-display)", fontSize: "4.5rem", lineHeight: 1,
                  letterSpacing: "0.04em", margin: "10px 0 0",
                  background: "linear-gradient(135deg, #f0b429, #ffe066)",
                  WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent",
                }}>
                  {isLoading ? "—" : companies.length}
                </p>
                <p style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", margin: "8px 0 0" }}>
                  companies with public visibility enabled
                </p>
              </div>

              {/* Lock tiers legend */}
              <div style={{
                padding: "20px 24px", borderRadius: 14,
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}>
                <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", margin: "0 0 14px" }}>
                  Lock Period Tiers
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 16px" }}>
                  {Object.entries(LOCK_PERIOD_MAP).map(([tier, label]) => (
                    <div key={tier} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{
                        width: 20, height: 20, borderRadius: 6, flexShrink: 0,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        background: "rgba(46,216,163,0.1)", border: "1px solid rgba(46,216,163,0.2)",
                        fontSize: 9, fontWeight: 700, color: "var(--jade)", fontFamily: "var(--font-display)",
                      }}>
                        {tier}
                      </span>
                      <span style={{ fontSize: 12, color: "rgba(255,255,255,0.45)" }}>{label}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </header>

      {/* ════════════════════════════════════════
          CARDS
      ════════════════════════════════════════ */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "60px 40px" }}>
        {isLoading ? (
          <div style={{ display: "grid", gap: 20, gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))" }}>
            {[0, 1, 2, 3, 4, 5].map((i) => <SkeletonCard key={i} />)}
          </div>

        ) : error ? (
          <div style={{ borderRadius: 16, padding: 40, textAlign: "center", background: "rgba(255,80,80,0.04)", border: "1px solid rgba(255,80,80,0.12)" }}>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", marginBottom: 16 }}>{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="btn-outline-gold"
              style={{ borderRadius: 8, padding: "8px 20px", fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer" }}
            >
              Retry
            </button>
          </div>

        ) : companies.length === 0 ? (
          <div style={{ borderRadius: 20, padding: "80px 40px", textAlign: "center", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ width: 52, height: 52, borderRadius: 14, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
              <Building2 size={22} style={{ color: "rgba(255,255,255,0.2)" }} />
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", letterSpacing: "0.06em", color: "rgba(255,255,255,0.4)", margin: "0 0 8px" }}>
              NO PUBLIC PROFILES YET
            </h2>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.22)", maxWidth: 400, margin: "0 auto" }}>
              Approved companies appear here only when they enable public visibility.
            </p>
          </div>

        ) : (
          <div style={{ display: "grid", gap: 20, gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))" }}>
            {companies.map((company) => (
              <CompanyCard key={company.id} company={company} />
            ))}
          </div>
        )}
      </section>

      <SiteFooter />
    </main>
  );
}