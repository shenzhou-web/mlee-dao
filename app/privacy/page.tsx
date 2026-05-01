import type { Metadata } from "next";
import Link from "next/link";
import { LegalShell } from "@/components/layout/legal-shell";

export const metadata: Metadata = {
  title: "Privacy Policy | MLEE DAO",
  description:
    "Privacy Policy for the MLEE DAO website, including token pages, presale participation, dashboard access, and partnership onboarding.",
};

const EFFECTIVE_DATE = "April 30, 2026";

export default function PrivacyPage() {
  return (
    <LegalShell
      eyebrow="Legal"
      title="Privacy Policy"
      summary="This Privacy Policy explains how MLEE DAO may collect, use, store, and disclose information when you browse the website, connect a wallet, participate in the presale, or apply for the partnership program."
      effectiveDate={EFFECTIVE_DATE}
      sections={[
        {
          title: "Scope of This Policy",
          body: (
            <>
              <p>
                This policy applies to the MLEE DAO website and related digital
                experiences, including token information pages, the presale
                interface, dashboard tools, contact interactions, and
                partnership onboarding forms.
              </p>
            </>
          ),
        },
        {
          title: "Information We May Collect",
          body: (
            <>
              <p>
                Depending on how you use the site, we may collect wallet
                addresses, transaction-related data visible on public
                blockchains, email addresses, onboarding or application IDs,
                company or individual profile details, uploaded KYC or
                verification documents, and communications you send to us.
              </p>
              <p>
                We may also collect technical and usage information such as
                browser type, device information, approximate region, referral
                data, page interactions, and analytics events generated through
                site performance or marketing tools.
              </p>
            </>
          ),
        },
        {
          title: "Wallet and Blockchain Data",
          body: (
            <>
              <p>
                When you connect a wallet, we may process your public wallet
                address and related on-chain activity needed to display balances,
                participation status, vesting information, or transaction
                history. Public blockchain data is inherently transparent and
                may remain publicly accessible indefinitely.
              </p>
              <p>
                MLEE DAO does not control how blockchain networks or third-party
                explorers store or publish public ledger data.
              </p>
            </>
          ),
        },
        {
          title: "How We Use Information",
          body: (
            <>
              <p>
                We may use collected information to operate the website, provide
                token and presale interfaces, review partnership applications,
                upload and verify documents, communicate with applicants,
                prevent fraud, maintain security, improve product performance,
                comply with legal obligations, and measure engagement with the
                website.
              </p>
            </>
          ),
        },
        {
          title: "Partnership and KYC Information",
          body: (
            <>
              <p>
                If you apply to the partnership program, we may process the
                identity and business information you submit, the documents you
                upload, wallet details, lock selections, and application status
                information needed to assess eligibility and administer the
                onboarding flow.
              </p>
              <p>
                You should only submit documents and personal data that are
                requested for the process. By uploading those materials, you
                confirm you are authorized to provide them.
              </p>
            </>
          ),
        },
        {
          title: "Analytics, Cookies, and Tracking",
          body: (
            <>
              <p>
                The site may use analytics and measurement technologies,
                including Vercel Analytics and marketing or conversion tracking
                scripts, to understand traffic, improve performance, and measure
                campaign effectiveness. These tools may use cookies, pixels, or
                similar technologies depending on your browser and device.
              </p>
              <p>
                You may be able to manage certain tracking preferences through
                your browser settings or relevant platform controls, though
                disabling some technologies may affect site functionality.
              </p>
            </>
          ),
        },
        {
          title: "How We Share Information",
          body: (
            <>
              <p>
                We may share information with service providers and
                infrastructure partners that help us host the website, provide
                wallet connectivity, process analytics, store submitted
                materials, or administer application workflows. We may also
                disclose information when required by law, regulation, legal
                process, or to protect rights, users, or the platform.
              </p>
              <p>
                We do not treat public blockchain data as confidential because
                that information can be visible to anyone using the relevant
                network.
              </p>
            </>
          ),
        },
        {
          title: "Data Retention",
          body: (
            <>
              <p>
                We may retain information for as long as reasonably necessary to
                operate the website, maintain records, resolve disputes, enforce
                agreements, support audits or compliance reviews, and meet legal
                obligations. Public blockchain records may remain available even
                if associated off-chain records are deleted.
              </p>
            </>
          ),
        },
        {
          title: "Security",
          body: (
            <>
              <p>
                We use reasonable administrative, technical, and organizational
                measures to protect information in our control. However, no
                method of transmission or storage is completely secure, and we
                cannot guarantee absolute security.
              </p>
            </>
          ),
        },
        {
          title: "Your Choices",
          body: (
            <>
              <p>
                You may choose not to connect a wallet, submit partnership
                documents, or provide optional information. You may also contact
                us to request updates or deletion of off-chain information where
                legally permitted and reasonably practicable.
              </p>
              <p>
                Requests relating to on-chain information may be limited because
                blockchain data cannot generally be altered or erased.
              </p>
            </>
          ),
        },
        {
          title: "International Use",
          body: (
            <>
              <p>
                MLEE DAO may process information in jurisdictions different from
                your own. By using the website, you understand that your
                information may be transferred to and processed in locations
                where data protection laws may differ.
              </p>
            </>
          ),
        },
        {
          title: "Policy Updates and Contact",
          body: (
            <>
              <p>
                We may update this Privacy Policy from time to time by posting a
                revised version on this page. Continued use of the site after an
                update means the latest posted version will apply.
              </p>
              <p>
                Privacy questions or requests may be sent to{" "}
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
                . You can also review the{" "}
                <Link href="/terms" className="font-semibold text-[#0f766e] hover:text-[#115e59]">
                  Terms and Conditions
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
