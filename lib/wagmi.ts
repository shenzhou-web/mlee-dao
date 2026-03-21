"use client";

import { createConfig, http } from "wagmi"
import { bsc } from "wagmi/chains"
import { injected, walletConnect } from "wagmi/connectors"

export const wagmiChains = [bsc] as const
const walletConnectProjectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID

export const wagmiConfig = createConfig({
  chains: wagmiChains,
  connectors: walletConnectProjectId
    ? [
        injected(),
        walletConnect({
          projectId: walletConnectProjectId,
        }),
      ]
    : [injected()],
  transports: {
    [bsc.id]: http("https://bsc-dataseed1.binance.org"),
  },
})
