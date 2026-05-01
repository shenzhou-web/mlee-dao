import type { Metadata } from "next";
import Link from "next/link";
import { LegalShell } from "@/components/layout/legal-shell";

export const metadata: Metadata = {
  title: "Terms and Conditions | MLEE DAO",
  description:
    "Terms and Conditions for the MLEE DAO website, token information, presale participation, dashboard access, and partnership onboarding.",
};

const EFFECTIVE_DATE = "April 30, 2026";

export default function TermsPage() {
  return (
    <LegalShell
      eyebrow="Legal"
      title="Terms and Conditions"
      summary="These Terms and Conditions govern access to the MLEE DAO website and participation in the token-related, presale, dashboard, and partnership features offered through the site."
      effectiveDate={EFFECTIVE_DATE}
      sections={[
        {
          title: "Acceptance of Terms",
          body: (
            <>
              <p>
                By accessing or using the MLEE DAO website, you agree to these
                Terms and Conditions. If you do not agree, you should not use
                the website, connect a wallet, submit partnership information,
                or participate in any presale flow presented on the site.
              </p>
              <p>
                These terms apply to the main website, the token information
                pages, the presale interface, the dashboard, and the
                partnership onboarding experience.
              </p>
            </>
          ),
        },
        {
          title: "Eligibility and Compliance",
          body: (
            <>
              <p>
                You represent that you have legal capacity to use this website
                and to enter into binding agreements under the laws applicable
                to you. You are responsible for ensuring that your access to the
                site and any token-related activity is lawful in your
                jurisdiction.
              </p>
              <p>
                MLEE DAO may restrict access, reject submissions, or decline
                participation where legal, regulatory, sanctions, fraud, or
                compliance concerns arise.
              </p>
            </>
          ),
        },
        {
          title: "Website Content and No Advice",
          body: (
            <>
              <p>
                Content on this website is provided for general informational
                purposes only. Nothing on the site constitutes legal, tax,
                accounting, fiduciary, investment, or financial advice, and no
                content should be interpreted as a recommendation to buy, sell,
                or hold any asset.
              </p>
              <p>
                References to tokenomics, roadmap items, utilities, governance,
                pricing phases, launch plans, partnership benefits, or expected
                future features are subject to change without notice.
              </p>
            </>
          ),
        },
        {
          title: "Token and Blockchain Risk Disclosure",
          body: (
            <>
              <p>
                Blockchain-based assets and smart-contract interactions involve
                substantial risk, including volatility, software defects, wallet
                compromise, phishing, gas fee changes, chain congestion, oracle
                issues, loss of private keys, and permanent transaction errors.
              </p>
              <p>
                You acknowledge that blockchain transactions are irreversible
                once broadcast and confirmed. MLEE DAO cannot reverse
                transactions, recover lost wallets, or guarantee uninterrupted
                access to any blockchain network, token market, or third-party
                service.
              </p>
            </>
          ),
        },
        {
          title: "Presale Terms",
          body: (
            <>
              <p>
                If you participate in any MDAO presale, you are solely
                responsible for reviewing the applicable price, vesting terms,
                supported wallet and network requirements, payment token
                requirements, and any public smart-contract details before you
                transact.
              </p>
              <p>
                Presale participation does not guarantee profitability, market
                liquidity, exchange listing, governance power, future utility,
                or appreciation in value. Unless expressly required by law or
                separately stated in writing, presale transactions are final and
                non-refundable.
              </p>
            </>
          ),
        },
        {
          title: "Partnership Program Terms",
          body: (
            <>
              <p>
                The partnership program may require applications, document
                uploads, identity checks, wallet verification, manual review,
                approval codes, and staged onboarding. Submission of an
                application does not guarantee approval, allocation, pricing, or
                token delivery.
              </p>
              <p>
                You must provide accurate, complete, and current information.
                MLEE DAO may reject, pause, or cancel a partnership application
                if information appears incomplete, inaccurate, misleading,
                fraudulent, or non-compliant.
              </p>
            </>
          ),
        },
        {
          title: "User Responsibilities",
          body: (
            <>
              <p>
                You are responsible for maintaining control over your wallet,
                devices, seed phrases, private keys, email accounts, and any
                credentials used in connection with the site. You agree not to
                misuse the website, attempt unauthorized access, interfere with
                smart contracts, upload malicious files, or use false identity
                information.
              </p>
              <p>
                Where the site asks you to confirm identity, wallet ownership,
                application details, or legal acceptance, you agree that the
                confirmations you submit are truthful and binding.
              </p>
            </>
          ),
        },
        {
          title: "Third-Party Services",
          body: (
            <>
              <p>
                The site may rely on or link to third-party tools and services,
                including wallet providers, blockchain explorers, analytics
                services, cloud hosting, social channels, and external websites.
                MLEE DAO does not control and is not responsible for the
                availability, content, security, or performance of third-party
                services.
              </p>
              <p>
                Your use of third-party products is governed by their own terms
                and privacy policies.
              </p>
            </>
          ),
        },
        {
          title: "Intellectual Property",
          body: (
            <>
              <p>
                Unless otherwise stated, the website design, branding, text,
                graphics, interface elements, and original site content are
                owned by or licensed to MLEE DAO. You may not copy, modify,
                republish, or commercially exploit website content except as
                permitted by law or with prior written permission.
              </p>
            </>
          ),
        },
        {
          title: "Disclaimers and Limitation of Liability",
          body: (
            <>
              <p>
                The website and all related content and functionality are
                provided on an &quot;as is&quot; and &quot;as available&quot; basis without
                warranties of any kind, whether express or implied, to the
                fullest extent permitted by law.
              </p>
              <p>
                To the fullest extent permitted by law, MLEE DAO and its
                affiliates, contributors, and service providers will not be
                liable for indirect, incidental, special, consequential, or
                punitive damages, or for any loss of profits, digital assets,
                data, goodwill, business opportunity, or expected returns arising
                from or related to your use of the site or participation in
                token, presale, or partnership activities.
              </p>
            </>
          ),
        },
        {
          title: "Changes, Suspension, and Termination",
          body: (
            <>
              <p>
                MLEE DAO may update the website, modify site features, revise
                these terms, suspend access, or discontinue any part of the
                service at any time. Updated terms become effective when posted
                on this page unless a different effective date is stated.
              </p>
            </>
          ),
        },
        {
          title: "Contact",
          body: (
            <>
              <p>
                Questions about these terms may be directed to{" "}
                <a
                  href="mailto:admin@mleedao.com"
                  className="font-semibold text-[#0f766e] hover:text-[#115e59]"
                >
                  admin@mleedao.com
                </a>{" "}
                or{" "}
                <a
                  href="mailto:partnership@mleedao.com"
                  className="font-semibold text-[#0f766e] hover:text-[#115e59]"
                >
                  partnership@mleedao.com
                </a>
                .
              </p>
              <p>
                For information about how personal data is handled, please see
                the{" "}
                <Link href="/privacy" className="font-semibold text-[#0f766e] hover:text-[#115e59]">
                  Privacy Policy
                </Link>
                .
              </p>
            </>
          ),
        },
      ]}
    />
  );
}
