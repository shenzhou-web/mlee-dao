"use client";

import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import {
  binanceWallet,
  coinbaseWallet,
  metaMaskWallet,
  safepalWallet,
  trustWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { http } from "wagmi";
import { bsc, bscTestnet } from "wagmi/chains";
import { ACTIVE_CHAIN_CONFIG, IS_TESTNET } from "@/lib/contracts";
import { customValorUpWallet } from "@/lib/custom-wallet";

export const ACTIVE_CHAIN = {
  ...(IS_TESTNET ? bscTestnet : bsc),
  rpcUrls: ACTIVE_CHAIN_CONFIG.rpcUrls,
  blockExplorers: ACTIVE_CHAIN_CONFIG.blockExplorers,
} as const;

export const wagmiChains = [ACTIVE_CHAIN] as const;

const walletConnectProjectId =
  process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? "";

const appUrl = "https://www.mleedao.com";

const appIcon = `${appUrl.replace(/\/$/, "")}/mdao-logo.png`;

export const wagmiConfig = getDefaultConfig({
  appName: "MLEE DAO (MDAO)",
  appDescription: "MDAO Token",
  appUrl,
  appIcon,
  projectId: walletConnectProjectId,
  wallets: [
    {
      groupName: "Popular",
      wallets: [
        customValorUpWallet,
        metaMaskWallet,
        trustWallet,
        walletConnectWallet,
        coinbaseWallet,
        binanceWallet,
        safepalWallet,
      ],
    },
  ],
  walletConnectParameters: {
    metadata: {
      name: "MLEE DAO (MDAO)",
      description: "MDAO Token",
      url: appUrl,
      icons: [appIcon],
    },
  },
  chains: wagmiChains,
  transports: {
    [ACTIVE_CHAIN.id]: http(ACTIVE_CHAIN.rpcUrls.default.http[0]),
  },
  // Prevent duplicate injected wallets (e.g., Brave via EIP-6963) in the modal
  multiInjectedProviderDiscovery: false,
  ssr: true,
});
