"use client";

import Link from "next/link";
import { Check, Copy, Download, ExternalLink, Mail } from "lucide-react";
import { useState } from "react";
import { OFFICIAL_EMAIL, OFFICIAL_WEBSITE, SOCIAL_LINKS } from "./constants";
import { SectionHeader } from "./SectionHeader";

export function CommunityContact() {
  const [emailCopied, setEmailCopied] = useState(false);

  async function copyEmail() {
    await navigator.clipboard.writeText(OFFICIAL_EMAIL);
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 1800);
  }

  return (
    <>
      <section id="community" className="border-y-2 border-[#1E1E1E] bg-[#0F0F0F] px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-[1100px]">
          <SectionHeader
            eyebrow="COMMUNITY // CHANNELS"
            title="Official channels for updates and participation."
            description="Connect with MLEE DAO through verified community links, source code, and public resources."
            align="center"
          />

          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {SOCIAL_LINKS.map((link, index) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                data-reveal="up"
                data-reveal-delay={String(index * 90)}
                className="group flex min-h-[140px] flex-col justify-between border-2 border-[#2D2D2D] bg-[#0A0A0A] p-5 transition-colors hover:border-[#FFD600]"
              >
                <div className="flex items-center justify-between">
                  <span className="grid h-10 w-10 place-items-center bg-[#FFD600] font-grotesk text-[14px] font-bold text-[#0A0A0A]">
                    {link.label}
                  </span>
                  <ExternalLink className="h-4 w-4 text-[#555555] transition-colors group-hover:text-[#FFD600]" />
                </div>
                <div className="font-grotesk text-[28px] font-bold text-[#F5F5F0]">
                  {link.name}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="bg-[#0A0A0A] px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-[1100px]">
          <SectionHeader
            eyebrow="CONTACT // RESOURCES"
            title="Verified contact and project documents."
            description="Official email, website, whitepaper, and social links for partnerships, inquiries, and community engagement."
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div data-reveal="left" data-reveal-delay="120" className="border-2 border-[#FFD600] bg-[#0F0F0F] p-6">
              <Mail className="h-8 w-8 text-[#FFD600]" />
              <h3 className="mt-5 font-grotesk text-[34px] font-bold text-[#F5F5F0]">
                Official Email
              </h3>
              <p className="mt-3 font-ibm-mono text-[12px] leading-6 text-[#777777]">
                For partnerships, inquiries, and official communications.
              </p>

              <div className="mt-6 flex items-center gap-3 border-2 border-[#2D2D2D] bg-[#0A0A0A] p-4">
                <code className="min-w-0 flex-1 break-all font-ibm-mono text-[13px] text-[#FFD600]">
                  {OFFICIAL_EMAIL}
                </code>
                <button
                  onClick={copyEmail}
                  className="grid h-10 w-10 shrink-0 place-items-center border-2 border-[#2D2D2D] text-[#F5F5F0] transition-colors hover:border-[#FFD600]"
                  aria-label="Copy official email"
                >
                  {emailCopied ? <Check className="h-4 w-4 text-[#FFD600]" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>

              <a
                href={`mailto:${OFFICIAL_EMAIL}`}
                className="mt-5 inline-flex h-12 w-full items-center justify-center bg-[#FFD600] font-grotesk text-[12px] font-bold tracking-[2px] text-[#0A0A0A] sm:w-fit sm:px-7"
              >
                SEND EMAIL
              </a>
            </div>

            <div data-reveal="right" data-reveal-delay="180" className="grid gap-6">
              <a
                href={OFFICIAL_WEBSITE}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between border-2 border-[#2D2D2D] bg-[#0F0F0F] p-5 transition-colors hover:border-[#FFD600]"
              >
                <div>
                  <div className="font-ibm-mono text-[10px] tracking-[2px] text-[#666666]">
                    OFFICIAL WEBSITE
                  </div>
                  <div className="mt-2 break-all font-ibm-mono text-[13px] text-[#F5F5F0]">
                    {OFFICIAL_WEBSITE}
                  </div>
                </div>
                <ExternalLink className="ml-4 h-5 w-5 shrink-0 text-[#FFD600]" />
              </a>

              <a
                href="/whitepaper.pdf"
                download
                className="flex items-center justify-between border-2 border-[#2D2D2D] bg-[#0F0F0F] p-5 transition-colors hover:border-[#FFD600]"
              >
                <div>
                  <div className="font-ibm-mono text-[10px] tracking-[2px] text-[#666666]">
                    WHITEPAPER
                  </div>
                  <div className="mt-2 font-ibm-mono text-[13px] text-[#F5F5F0]">
                    Download MLEE DAO whitepaper
                  </div>
                </div>
                <Download className="ml-4 h-5 w-5 shrink-0 text-[#FFD600]" />
              </a>

              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/terms"
                  className="border-2 border-[#2D2D2D] bg-[#0F0F0F] px-4 py-4 text-center font-ibm-mono text-[11px] tracking-[1.5px] text-[#F5F5F0] transition-colors hover:border-[#FFD600]"
                >
                  TERMS
                </Link>
                <Link
                  href="/privacy"
                  className="border-2 border-[#2D2D2D] bg-[#0F0F0F] px-4 py-4 text-center font-ibm-mono text-[11px] tracking-[1.5px] text-[#F5F5F0] transition-colors hover:border-[#FFD600]"
                >
                  PRIVACY
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
