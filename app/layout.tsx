import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { WagmiProvider } from "wagmi"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { wagmiConfig } from "@/lib/wagmi"
import Web3Providers from "@/components/web3Providers"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MLEE DAO - Decentralized Governance Token on BNB Chain",
  description:
    "MLEE DAO (MDAO) is a decentralized governance token on BNB Chain focused on long-term ecosystem development and transparent community ownership.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
const queryClient = new QueryClient()

  
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
      <Web3Providers>
        {children}
      </Web3Providers>
      </body>
    </html>
  )
}
