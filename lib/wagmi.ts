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

export const ACTIVE_CHAIN = IS_TESTNET ? bscTestnet : bsc;

export const wagmiChains = [ACTIVE_CHAIN] as const;

const walletConnectProjectId =
  process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? "";

const appUrl = "https://www.mleedao.com";

const appIcon = `${appUrl.replace(/\/$/, "")}/icon-light-32x32.png`;

export const wagmiConfig = getDefaultConfig({
  appName: "MLEE DAO Presale",
  appDescription: "MDAO Token Presale",
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
  // Explicit metadata helps mobile wallets accept the connection
  walletConnectParameters: {
    metadata: {
      name: "MLEE DAO Presale",
      description: "MDAO Token Presale",
      url: appUrl,
      icons: [appIcon],
    },
  },
  chains: [bsc, bscTestnet],
  transports: {
    [bsc.id]: http("https://bsc-dataseed1.binance.org"),
    [bscTestnet.id]: http("https://bsc-testnet-rpc.publicnode.com"),
  },
  ssr: true,
});
