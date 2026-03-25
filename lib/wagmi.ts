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

const IS_TESTNET = process.env.NEXT_PUBLIC_USE_TESTNET === "true";

export const ACTIVE_CHAIN = bsc;

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
  chains: [bsc],
  transports: {
    [bsc.id]: http("https://bsc-dataseed1.binance.org"),
    // [bscTestnet.id]: http("https://bsc-testnet-rpc.publicnode.com"),
  },
  // Prevent duplicate injected wallets (e.g., Brave via EIP-6963) in the modal
  multiInjectedProviderDiscovery: false,
  ssr: true,
});
