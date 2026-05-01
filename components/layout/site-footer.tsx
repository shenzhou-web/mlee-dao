import Link from "next/link";
import { ALLIANCE_WEBSITE_URL, PARTNERSHIP_CONTACT_EMAIL } from "@/lib/partnership";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#06080d] text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 sm:px-6 lg:px-8 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <p
            className="text-sm uppercase tracking-[0.3em] text-[#f0b429]"
            style={{ fontFamily: "'Rajdhani', sans-serif" }}
          >
            MDAO Partnership
          </p>
          <p className="text-sm text-white/65">Enterprise onboarding, on-chain transparency, long-term alignment.</p>
          <a href={`mailto:${PARTNERSHIP_CONTACT_EMAIL}`} className="text-sm text-[#2ed8a3] hover:text-white">
            {PARTNERSHIP_CONTACT_EMAIL}
          </a>
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-white/70">
          <Link href="/dashboard" className="hover:text-white">
            Dashboard
          </Link>
          <Link href="/partnership" className="hover:text-white">
            Partnership
          </Link>
          <Link href="/terms" className="hover:text-white">
            Terms
          </Link>
          <Link href="/privacy" className="hover:text-white">
            Privacy
          </Link>
          <a href={ALLIANCE_WEBSITE_URL} target="_blank" rel="noreferrer" className="hover:text-white">
            IEALIANCE Website
          </a>
        </div>
      </div>
    </footer>
  );
}
