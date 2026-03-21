// ─────────────────────────────────────────────────────────────────
// CONTRACT ADDRESSES
// ─────────────────────────────────────────────────────────────────
// After deploying your contract, paste the addresses below.
// Testnet = BSC Testnet (chain 97)  for testing
// Mainnet = BNB Smart Chain (chain 56) for production

export const CONTRACTS = {
  // ⚠️  Replace with your deployed contract address after deployment
  PRESALE: "0x3797C0462ccE05879B1A39bBb6a1eFD840De004c" as `0x${string}`,

  // USDT on BNB Smart Chain (official address — do NOT change)
  USDT_MAINNET: "0x55d398326f99059fF775485246999027B3197955" as `0x${string}`,
  // USDT on BSC Testnet (use this while testing)
  USDT_TESTNET: "0x337610d27c682E347C9cD60BD4b3b107C9d34dDd" as `0x${string}`,
} as const;

// ─────────────────────────────────────────────────────────────────
// CHAIN CONFIGURATION
// ─────────────────────────────────────────────────────────────────

export const BSC_MAINNET = {
  id: 56,
  name: "BNB Smart Chain",
  nativeCurrency: { name: "BNB", symbol: "BNB", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://bsc-dataseed1.binance.org"] },
    public: { http: ["https://bsc-dataseed1.binance.org"] },
  },
  blockExplorers: {
    default: { name: "BscScan", url: "https://bscscan.com" },
  },
} as const;

export const BSC_TESTNET = {
  id: 97,
  name: "BSC Testnet",
  nativeCurrency: { name: "tBNB", symbol: "tBNB", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://data-seed-prebsc-1-s1.binance.org:8545"] },
    public: { http: ["https://data-seed-prebsc-1-s1.binance.org:8545"] },
  },
  blockExplorers: {
    default: { name: "BscScan Testnet", url: "https://testnet.bscscan.com" },
  },
} as const;

// ─────────────────────────────────────────────────────────────────
// CONTRACT CONSTANTS (mirrors Solidity)
// ─────────────────────────────────────────────────────────────────

export const PRESALE_START = BigInt(1740826800); // March 1, 2025 11:00 AM UTC
export const PHASE_DURATION = BigInt(30) * BigInt(24) * BigInt(60) * BigInt(60); // 30 days in seconds

export const PHASE_PRICES = {
  1: 0.01, // $0.01 USDT per MDAO
  2: 0.05, // $0.05 USDT per MDAO
  3: 0.1, // $0.10 USDT per MDAO
} as const;

// Token decimals
export const MDAO_DECIMALS = 18;
export const USDT_DECIMALS = 6; // BSC USDT uses 6 decimals

// Purchase limits (in USDT, human-readable)
export const MIN_PURCHASE_USDT = 10;
export const MAX_PURCHASE_USDT = 5000;

// Vesting
export const TGE_PERCENTAGE = 20; // 20% at TGE
export const MONTHLY_PERCENTAGE = 10; // 10% per month
export const VESTING_MONTHS = 8; // 8 months total
