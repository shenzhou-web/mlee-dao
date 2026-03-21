import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { MDAO_DECIMALS, USDT_DECIMALS } from "./contracts";
import { formatUnits } from "viem";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ─── BigInt formatters ────────────────────────────────────────────

/**
 * Convert raw MDAO token amount (18 decimals) to human-readable number
 */
export function formatMDAO(
  raw: bigint | undefined,
  decimals = MDAO_DECIMALS,
): number {
  if (!raw) return 0;
  return Number(formatUnits(raw, decimals));
}

/**
 * Convert raw USDT amount (18 decimals on BSC) to human-readable number
 */
export function formatUSDT(
  raw: bigint | undefined,
  decimals = USDT_DECIMALS,
): number {
  if (!raw) return 0;
  return Number(formatUnits(raw, decimals));
}

/**
 * Convert human-readable USDT amount to raw bigint for contract calls
 */
export function parseUSDT(amount: number, decimals = USDT_DECIMALS): bigint {
  return BigInt(Math.round(amount * 10 ** decimals));
}

/**
 * Convert human-readable MDAO amount to raw bigint
 */
export function parseMDAO(amount: number, decimals = MDAO_DECIMALS): bigint {
  return BigInt(Math.floor(amount * 10 ** decimals));
}

// ─── Display formatters ───────────────────────────────────────────

/**
 * Format a token amount for display with abbreviation
 * e.g. 1200000 → "1.20M", 5000 → "5.00K"
 */
export function formatTokenDisplay(amount: number): string {
  if (amount >= 1_000_000_000) return `${(amount / 1_000_000_000).toFixed(2)}B`;
  if (amount >= 1_000_000) return `${(amount / 1_000_000).toFixed(2)}M`;
  if (amount >= 1_000) return `${(amount / 1_000).toFixed(2)}K`;
  return amount.toFixed(2);
}

/**
 * Format USDT for display
 * e.g. 1500.5 → "$1,500.50"
 */
export function formatUSDTDisplay(amount: number): string {
  if (amount >= 1_000_000) return `$${(amount / 1_000_000).toFixed(2)}M`;
  if (amount >= 1_000) return `$${(amount / 1_000).toFixed(2)}K`;
  return `$${amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

/**
 * Format a presale progress percentage
 */
export function formatProgress(
  sold: bigint | undefined,
  hardCap: bigint | undefined,
): number {
  if (!sold || !hardCap || hardCap === BigInt(0)) return 0;
  return Math.min(Number((sold * BigInt(10000)) / hardCap) / 100, 100);
}

/**
 * Get phase label from phase number
 */
export function getPhaseName(phase: number): string {
  const names: Record<number, string> = {
    1: "Early Bird",
    2: "Standard",
    3: "Final",
  };
  return names[phase] ?? "—";
}

/**
 * Get phase price in USDT from phase number
 */
export function getPhasePrice(phase: number): string {
  const prices: Record<number, string> = { 1: "$0.01", 2: "$0.05", 3: "$0.10" };
  return prices[phase] ?? "—";
}

/**
 * Convert raw contract price (6-decimal USDT units) to display string
 * price 10_000 → "$0.01"
 */
export function formatContractPrice(rawPrice: bigint | undefined): string {
  if (!rawPrice) return "—";
  // Contract price is in payment token units (18 decimals on BSC USDT)
  const price = Number(rawPrice) / 10 ** USDT_DECIMALS;
  return `$${price.toFixed(4)}`;
}

/**
 * Calculate MDAO tokens to receive for a given USDT amount
 * Matches contract formula: tokensToBuy = paymentAmount * 10^18 / price
 * Note: price from contract is in 6-decimal units, payment is in 6-decimal units
 */
export function calcTokensToReceive(
  usdtAmount: number,
  rawPrice: bigint | undefined,
): number {
  if (!rawPrice || rawPrice === BigInt(0) || usdtAmount <= 0) return 0;
  // price is per 1 whole token in payment token units (6 decimals on BSC USDT)
  // e.g. phase 1: price = 0.01 * 1e6
  const priceInUsdt = Number(rawPrice) / 10 ** USDT_DECIMALS;
  return usdtAmount / priceInUsdt;
}

/**
 * Format a unix timestamp to a readable date
 */
export function formatTimestamp(ts: bigint | undefined): string {
  if (!ts || ts === BigInt(0)) return "—";
  return new Date(Number(ts) * 1000).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Calculate time remaining until a timestamp
 */
export function timeUntil(ts: number): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
} {
  const diff = Math.max(0, ts - Date.now() / 1000);
  return {
    days: Math.floor(diff / 86400),
    hours: Math.floor((diff % 86400) / 3600),
    minutes: Math.floor((diff % 3600) / 60),
    seconds: Math.floor(diff % 60),
  };
}

/**
 * Shorten a wallet address for display
 * e.g. "0x1234...5678"
 */
export function shortenAddress(addr: string | undefined): string {
  if (!addr) return "";
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
}

/**
 * Get BscScan link for a transaction
 */
export function getTxLink(hash: string, testnet = false): string {
  const base = testnet ? "https://testnet.bscscan.com" : "https://bscscan.com";
  return `${base}/tx/${hash}`;
}

/**
 * Get BscScan link for an address
 */
export function getAddressLink(address: string, testnet = false): string {
  const base = testnet ? "https://testnet.bscscan.com" : "https://bscscan.com";
  return `${base}/address/${address}`;
}
