"use client";

import type {
  RainbowKitWalletConnectParameters,
  Wallet,
  WalletDetailsParams,
} from "@rainbow-me/rainbowkit";
import { createConnector } from "wagmi";
import { walletConnect } from "wagmi/connectors";
import { saveWalletReturnPath } from "@/lib/wallet-return";

type CustomWalletOptions = {
  projectId: string;
  walletConnectParameters?: RainbowKitWalletConnectParameters;
};

type CustomWalletFactory = (options: CustomWalletOptions) => Wallet;

const CUSTOM_WALLET_NAME =
  process.env.NEXT_PUBLIC_CUSTOM_WALLET_NAME?.trim() || "ValorUp";
const CUSTOM_WALLET_ID =
  process.env.NEXT_PUBLIC_CUSTOM_WALLET_ID?.trim() || "valorup-wallet";
const CUSTOM_WALLET_HOMEPAGE =
  process.env.NEXT_PUBLIC_CUSTOM_WALLET_HOMEPAGE?.trim() ||
  "https://www.myvalorup.com";
const CUSTOM_WALLET_ICON =
  process.env.NEXT_PUBLIC_CUSTOM_WALLET_IMAGE_URL?.trim() ||
  "/valorup-wallet.svg";
const CUSTOM_WALLET_MOBILE_LINK =
  process.env.NEXT_PUBLIC_CUSTOM_WALLET_MOBILE_LINK?.trim() || "valorup://wc";
const CUSTOM_WALLET_IOS_URL =
  process.env.NEXT_PUBLIC_CUSTOM_WALLET_APP_STORE_URL?.trim() ||
  "https://apps.apple.com/us/app/valorup/id6753202163";
const CUSTOM_WALLET_ANDROID_URL =
  process.env.NEXT_PUBLIC_CUSTOM_WALLET_PLAY_STORE_URL?.trim() ||
  "https://play.google.com/store/apps/details?id=com.shenzhouapp.shenzhoucapitalapp&pli=1";

function getValorUpWalletConnectUri(uri: string, includeRedirect = false) {
  const base = `${CUSTOM_WALLET_MOBILE_LINK}${
    CUSTOM_WALLET_MOBILE_LINK.includes("?") ? "&" : "?"
  }uri=${encodeURIComponent(uri)}`;

  if (!includeRedirect || typeof window === "undefined") return base;

  return `${base}&redirectUrl=${encodeURIComponent(window.location.href)}`;
}

function createWalletConnectConnector({
  projectId,
  walletConnectParameters,
  walletDetails,
}: {
  projectId: string;
  walletConnectParameters?: RainbowKitWalletConnectParameters;
  walletDetails: WalletDetailsParams;
}) {
  const customStoragePrefix =
    process.env.NEXT_PUBLIC_CUSTOM_WALLET_STORAGE_PREFIX?.trim() ||
    `valorup-${process.env.NEXT_PUBLIC_USE_TESTNET === "true" ? "testnet" : "mainnet"}`;

  return createConnector((config) => ({
    ...walletConnect({
      projectId,
      showQrModal: false,
      telemetryEnabled: false,
      customStoragePrefix,
      isNewChainsStale: false,
      ...walletConnectParameters,
    })(config),
    ...walletDetails,
  }));
}

export const customValorUpWallet: CustomWalletFactory = ({
  projectId,
  walletConnectParameters,
}: CustomWalletOptions): Wallet => ({
  id: CUSTOM_WALLET_ID,
  name: CUSTOM_WALLET_NAME,
  rdns: "com.myvalorup.wallet",
  iconUrl: CUSTOM_WALLET_ICON,
  iconBackground: "#0b1220",
  installed: true,
  downloadUrls: {
    ios: CUSTOM_WALLET_IOS_URL,
    android: CUSTOM_WALLET_ANDROID_URL,
    mobile: CUSTOM_WALLET_HOMEPAGE,
    qrCode: CUSTOM_WALLET_HOMEPAGE,
  },
  mobile: {
    getUri: (uri) => {
      saveWalletReturnPath();
      return getValorUpWalletConnectUri(uri, true);
    },
  },
  qrCode: {
    getUri: (uri) => getValorUpWalletConnectUri(uri),
  },
  createConnector: (walletDetails) =>
    createWalletConnectConnector({
      projectId,
      walletConnectParameters,
      walletDetails,
    }),
});
