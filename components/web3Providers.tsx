"use client"

import { WagmiProvider } from "wagmi"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { RainbowKitProvider } from "@rainbow-me/rainbowkit"
import { wagmiConfig, wagmiChains } from "@/lib/wagmi"
import { useEffect, useState } from "react"
import { Analytics } from "@vercel/analytics/next"

export default function Web3Providers({
  children,
}: {
  children: React.ReactNode
}) {
  const [queryClient] = useState(() => new QueryClient())
  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID) {
      console.warn(
        "[Web3] Missing NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID. " +
          "WalletConnect and mobile wallets may show 'Get Wallet' or fail to connect."
      )
    }
  }, [])

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider initialChain={wagmiChains[0]}>
          {children}
          <Analytics />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
