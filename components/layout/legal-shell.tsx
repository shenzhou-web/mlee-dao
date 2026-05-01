import type { ReactNode } from "react";
import Link from "next/link";
// import { SiteFooter } from "@/components/layout/site-footer";

type LegalSection = {
  title: string;
  body: ReactNode;
};

export function LegalShell({
  eyebrow,
  title,
  summary,
  effectiveDate,
  sections,
}: {
  eyebrow: string;
  title: string;
  summary: string;
  effectiveDate: string;
  sections: readonly LegalSection[];
}) {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(240,180,41,0.12),_transparent_30%),linear-gradient(180deg,_#06080d_0%,_#0d1117_48%,_#f7f8fa_48%,_#f7f8fa_100%)]">
      <section className="px-4 pb-16 pt-10 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-wrap items-center gap-3 text-sm text-white/60">
            <Link href="/" className="transition-colors hover:text-white">
              Home
            </Link>
            <span>/</span>
            <Link href="/presale" className="transition-colors hover:text-white">
              Presale
            </Link>
            <span>/</span>
            {/* <Link href="/partnership" className="transition-colors hover:text-white">
              Partnership
            </Link> */}
          </div>

          <div className="mt-12 max-w-3xl">
            <p
              className="text-xs uppercase tracking-[0.35em] text-[#f0b429]"
              style={{ fontFamily: "'Rajdhani', sans-serif" }}
            >
              {eyebrow}
            </p>
            <h1
              className="mt-4 text-5xl text-white sm:text-6xl"
              style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.06em" }}
            >
              {title}
            </h1>
            <p className="mt-5 text-base leading-8 text-white/72 sm:text-lg">
              {summary}
            </p>
            <div className="mt-6 inline-flex rounded-full border border-white/12 bg-white/6 px-4 py-2 text-sm text-white/72">
              Effective date: {effectiveDate}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-[32px] border border-black/8 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
          <div className="border-b border-black/8 px-6 py-6 sm:px-10">
            <p className="text-sm leading-7 text-[#4b5563]">
              These pages are intended to apply across the MLEE DAO website,
              including token information, presale participation, dashboard use,
              and partnership onboarding.
            </p>
          </div>

          <div className="space-y-10 px-6 py-8 sm:px-10 sm:py-10">
            {sections.map((section) => (
              <section key={section.title}>
                <h2
                  className="text-3xl text-[#0d1117]"
                  style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.04em" }}
                >
                  {section.title}
                </h2>
                <div className="mt-3 space-y-4 text-sm leading-7 text-[#4b5563] sm:text-base">
                  {section.body}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>

      {/* <SiteFooter /> */}
    </main>
  );
}
