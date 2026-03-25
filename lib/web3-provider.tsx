"use client"

import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit"
import { WagmiProvider } from "wagmi"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ACTIVE_CHAIN, wagmiConfig } from "@/lib/wagmi"
import "@rainbow-me/rainbowkit/styles.css"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10_000,   // 10 seconds — blockchain data refreshes often
      refetchInterval: 15_000,  // auto-refetch every 15s
    },
  },
})

// Custom RainbowKit theme matching MDAO gold/dark aesthetic
const mdaoTheme = darkTheme({
  accentColor:          "#dba640",
  accentColorForeground: "#05070a",
  borderRadius:         "medium",
  fontStack:            "system",
  overlayBlur:          "small",
})

export function Web3Provider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={mdaoTheme}
          modalSize="compact"
          initialChain={ACTIVE_CHAIN as any}
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
