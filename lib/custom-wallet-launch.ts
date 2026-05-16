"use client";

import { saveWalletReturnPath } from "@/lib/wallet-return";

const CUSTOM_WALLET_ID =
  process.env.NEXT_PUBLIC_CUSTOM_WALLET_ID?.trim() || "valorup-wallet";
const CUSTOM_WALLET_MOBILE_LINK =
  process.env.NEXT_PUBLIC_CUSTOM_WALLET_MOBILE_LINK?.trim() || "valorup://wc";
const CUSTOM_WALLET_IOS_MOBILE_LINK =
  process.env.NEXT_PUBLIC_CUSTOM_WALLET_IOS_MOBILE_LINK?.trim();
const CUSTOM_WALLET_ANDROID_MOBILE_LINK =
  process.env.NEXT_PUBLIC_CUSTOM_WALLET_ANDROID_MOBILE_LINK?.trim();
const CUSTOM_WALLET_LAUNCH_LINK =
  process.env.NEXT_PUBLIC_CUSTOM_WALLET_LAUNCH_LINK?.trim();
const CUSTOM_WALLET_IOS_LAUNCH_LINK =
  process.env.NEXT_PUBLIC_CUSTOM_WALLET_IOS_LAUNCH_LINK?.trim();
const CUSTOM_WALLET_ANDROID_LAUNCH_LINK =
  process.env.NEXT_PUBLIC_CUSTOM_WALLET_ANDROID_LAUNCH_LINK?.trim();

function isIOS() {
  if (typeof window === "undefined") return false;

  const userAgent = window.navigator.userAgent || "";
  return /iPhone|iPad|iPod/i.test(userAgent);
}

export function canAutoOpenCustomWallet() {
  return !isIOS();
}

function getLaunchUri() {
  if (isIOS() && CUSTOM_WALLET_IOS_LAUNCH_LINK) return CUSTOM_WALLET_IOS_LAUNCH_LINK;
  if (!isIOS() && CUSTOM_WALLET_ANDROID_LAUNCH_LINK) return CUSTOM_WALLET_ANDROID_LAUNCH_LINK;
  if (CUSTOM_WALLET_LAUNCH_LINK) return CUSTOM_WALLET_LAUNCH_LINK;

  const mobileLink = isIOS()
    ? CUSTOM_WALLET_IOS_MOBILE_LINK || CUSTOM_WALLET_MOBILE_LINK
    : CUSTOM_WALLET_ANDROID_MOBILE_LINK || CUSTOM_WALLET_MOBILE_LINK;

  const [base] = mobileLink.split("?");
  return base || "valorup://";
}

export function isCustomWalletConnector(connectorId?: string) {
  return connectorId === CUSTOM_WALLET_ID;
}

export function openCustomWalletApp() {
  if (typeof window === "undefined" || !canAutoOpenCustomWallet()) return;

  saveWalletReturnPath();
  window.location.href = getLaunchUri();
}
