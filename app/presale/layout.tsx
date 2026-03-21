import type { Metadata } from "next"
import "../globals.css"

export const metadata: Metadata = {
  title: "MDAO Token Presale — Join the Future of Decentralized Gaming",
  description:
    "Secure MDAO tokens at Phase 1 pricing. 90-day presale with linear vesting, transparent governance, and fair distribution.",
  openGraph: {
    title: "MDAO Token Presale",
    description: "Join the future of decentralized gaming. Phase 1 price: $0.01 per MDAO.",
    type: "website",
  },
}

export default function PresaleLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
