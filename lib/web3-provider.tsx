"use client"

import { getDefaultConfig, RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit"
import { WagmiProvider, http } from "wagmi"
import { bscTestnet } from "wagmi/chains"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import "@rainbow-me/rainbowkit/styles.css"

// ─── Testnet only ────────────────────────────────────────────────
// Using official wagmi/chains — this prevents RainbowKit "unsupported" warning
const ACTIVE_CHAIN = bscTestnet

const config = getDefaultConfig({
  appName:     "MLEE DAO Presale",
  projectId:   process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? "YOUR_WALLETCONNECT_PROJECT_ID",
  chains:      [ACTIVE_CHAIN],
  transports:  { [ACTIVE_CHAIN.id]: http() },
  ssr: true,
})

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
    <WagmiProvider config={config}>
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
