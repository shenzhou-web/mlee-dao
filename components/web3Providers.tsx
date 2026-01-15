"use client"

import { WagmiProvider } from "wagmi"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { wagmiConfig } from "@/lib/wagmi"
import { useState } from "react"
import { Analytics } from "@vercel/analytics/next"

export default function Web3Providers({
  children,
}: {
  children: React.ReactNode
}) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        {children}
           <Analytics />
      </QueryClientProvider>
    </WagmiProvider>
  )
}
