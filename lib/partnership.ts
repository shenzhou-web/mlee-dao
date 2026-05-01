import { formatUnits, parseUnits } from "viem";

export type PartnershipApplicantType = "company" | "individual";

export type LockTierKey = 0 | 1 | 2 | 3 | 4;

export type LockTierConfig = {
  id: LockTierKey;
  label: string;
  lockMonths: number;
  bonusPercent: number;
  vestingMonths: number;
  monthlyReleaseLabel: string;
  popular?: boolean;
};

export const PARTNERSHIP_VERSION = "MDAOPartnership v7";
export const PARTNERSHIP_CONTACT_EMAIL = "partnership@mleedao.com";
export const ALLIANCE_WEBSITE_URL = "https://www.iealiance.com/";

export const LOCK_TIERS: LockTierConfig[] = [
  {
    id: 0,
    label: "3 months",
    lockMonths: 3,
    bonusPercent: 0,
    vestingMonths: 3,
    monthlyReleaseLabel: "33.33% / month",
  },
  {
    id: 1,
    label: "6 months",
    lockMonths: 6,
    bonusPercent: 2,
    vestingMonths: 6,
    monthlyReleaseLabel: "16.67% / month",
  },
  {
    id: 2,
    label: "9 months",
    lockMonths: 9,
    bonusPercent: 3,
    vestingMonths: 9,
    monthlyReleaseLabel: "11.11% / month",
  },
  {
    id: 3,
    label: "18 months",
    lockMonths: 18,
    bonusPercent: 4,
    vestingMonths: 12,
    monthlyReleaseLabel: "8.33% / month",
    popular: true,
  },
  {
    id: 4,
    label: "36 months",
    lockMonths: 36,
    bonusPercent: 5,
    vestingMonths: 18,
    monthlyReleaseLabel: "5.56% / month",
  },
];

export const PARTNERSHIP_LIMITS: Record<
  PartnershipApplicantType,
  { minUsd: number; maxUsd: number; label: string }
> = {
  company: {
    minUsd: 10_000,
    maxUsd: 1_000_000,
    label: "Company tier: $10,000 — $1,000,000",
  },
  individual: {
    minUsd: 5_000,
    maxUsd: 100_000,
    label: "Individual tier: $5,000 — $100,000",
  },
};

export const INDUSTRY_OPTIONS = [
  "Technology",
  "Finance",
  "Healthcare",
  "Manufacturing",
  "Retail",
  "Energy",
  "Real Estate",
  "Media",
  "Education",
  "Logistics",
  "Hospitality",
  "Agriculture",
  "Other",
] as const;

export const COUNTRY_OPTIONS = [
  "United Arab Emirates",
  "United States",
  "United Kingdom",
  "Saudi Arabia",
  "Singapore",
  "Switzerland",
  "Germany",
  "France",
  "Netherlands",
  "India",
  "Canada",
  "Australia",
  "Japan",
  "Hong Kong",
  "Other",
] as const;

export type PartnershipFaqItem = {
  q: string;
  a: string;
  href?: string;
  linkLabel?: string;
};

export const PARTNERSHIP_FAQ: readonly PartnershipFaqItem[] = [
  {
    q: "What blockchain is this on?",
    a: "BNB Smart Chain. You need BNB for gas fees and USDT (BEP-20) for payment.",
  },
  {
    q: "What token do I pay with?",
    a: "USDT on BNB Chain (BEP-20). Make sure you have BEP-20 USDT, not ERC-20.",
  },
  {
    q: "How much BNB do I need for gas?",
    a: "A small amount, typically less than $1 worth of BNB covers the two transactions needed to onboard.",
  },
  {
    q: "Can I onboard as both a company and an individual?",
    a: "No. One onboard per wallet address per type.",
  },
  {
    q: "When can I claim my tokens?",
    a: "After your lock period ends. Tokens vest linearly over the vesting period following your lock end date.",
  },
  {
    q: "Is my investment refundable?",
    a: "No. Blockchain transactions are irreversible. The smart contract distributes funds automatically at the moment of onboarding.",
  },
  {
    q: "What happens if I lose access to my wallet?",
    a: "Tokens are held on-chain against your wallet address. MDAO cannot recover tokens for lost wallets. Keep your seed phrase safe.",
  },
  {
    q: "What is the token burn?",
    a: "0.5% of every payment is converted to MDAO tokens and sent to the dead address permanently, reducing total supply.",
  },
  {
    q: "Is the contract audited?",
    a: "Yes. The contracts were audited by Auditor soldrift (GitHub) in Report v2.0 dated 2026-04-26 / 27 (UTC+8), covering MleeDao.sol and MDAOPartnership.",
    href: "/MDAO-Audit-Report.pdf",
    linkLabel: "Download the audit report (PDF)",
  },
  {
    q: "How do I check my application status?",
    a: "Enter your onboarding ID in the Verify & Onboard section above, or contact the partnership team if you need a manual status update.",
  },
] as const;

export type PartnershipSummary = {
  amountUsd: number | null;
  amountRaw: bigint | null;
  baseMdaoRaw: bigint | null;
  bonusMdaoRaw: bigint | null;
  totalMdaoRaw: bigint | null;
  burnMdaoRaw: bigint | null;
  feeLpUsd: number | null;
  feeCommunityUsd: number | null;
  feeInvestmentUsd: number | null;
  priceDisplay: string;
  baseMdaoDisplay: string;
  bonusMdaoDisplay: string;
  totalMdaoDisplay: string;
  burnMdaoDisplay: string;
  monthlyReleaseDisplay: string;
  lockEndLabel: string;
  vestingStartLabel: string;
  vestingEndLabel: string;
  firstClaimLabel: string;
};

export function getLockTierConfig(lockTier: number | null | undefined) {
  return LOCK_TIERS.find((tier) => tier.id === lockTier) ?? LOCK_TIERS[3];
}

export function formatCurrency(value: number | null | undefined, digits = 0) {
  if (value === null || value === undefined || Number.isNaN(value)) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value);
}

export function formatNumber(value: number | null | undefined, digits = 0) {
  if (value === null || value === undefined || Number.isNaN(value)) return "—";
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value);
}

export function formatTokenAmount(
  raw: bigint | null | undefined,
  decimals = 18,
  digits = 0,
) {
  if (raw === null || raw === undefined) return "—";
  const value = Number(formatUnits(raw, decimals));
  return formatNumber(value, digits);
}

export function formatPrice(raw: bigint | null | undefined, decimals = 18) {
  if (raw === null || raw === undefined) return "—";
  return `$${Number(formatUnits(raw, decimals)).toFixed(4)}`;
}

export function formatRelativeUpdate(secondsAgo: number) {
  if (secondsAgo < 5) return "Last updated just now.";
  if (secondsAgo < 60) return `Last updated ${secondsAgo} seconds ago.`;
  const minutes = Math.floor(secondsAgo / 60);
  return `Last updated ${minutes} minute${minutes === 1 ? "" : "s"} ago.`;
}

export function formatTimeUntilCompanies(count: number | null | undefined) {
  if (count === null || count === undefined || Number.isNaN(count)) return "—";
  if (count <= 0) return "Price bump pending";
  return `In ${count} compan${count === 1 ? "y" : "ies"}`;
}

export function formatDateLabel(date: Date | null) {
  if (!date || Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function addMonths(date: Date, months: number) {
  const next = new Date(date);
  next.setMonth(next.getMonth() + months);
  return next;
}

export function isValidWalletAddress(value: string) {
  return /^0x[a-fA-F0-9]{40}$/.test(value.trim());
}

export function parseUsdAmount(amount: string, decimals = 18) {
  if (!amount.trim()) return null;
  return parseUnits(amount, decimals);
}

export function calculatePartnershipSummary(params: {
  amountInput: string;
  priceRaw: bigint | null | undefined;
  paymentDecimals?: number;
  mdaoDecimals?: number;
  lockTierId: number | null | undefined;
  now?: Date;
}): PartnershipSummary {
  const {
    amountInput,
    priceRaw,
    paymentDecimals = 18,
    mdaoDecimals = 18,
    lockTierId,
    now = new Date(),
  } = params;

  const lockTier = getLockTierConfig(lockTierId);
  const mdaoUnit = BigInt(10) ** BigInt(mdaoDecimals);
  const amountUsd = amountInput.trim() ? Number(amountInput) : null;
  const amountRaw =
    amountUsd !== null && amountUsd > 0
      ? parseUsdAmount(amountInput, paymentDecimals)
      : null;

  if (!priceRaw || !amountRaw || amountUsd === null || amountUsd <= 0) {
    return {
      amountUsd,
      amountRaw,
      baseMdaoRaw: null,
      bonusMdaoRaw: null,
      totalMdaoRaw: null,
      burnMdaoRaw: null,
      feeLpUsd: amountUsd ? amountUsd * 0.3 : null,
      feeCommunityUsd: amountUsd ? amountUsd * 0.3 : null,
      feeInvestmentUsd: amountUsd ? amountUsd * 0.4 : null,
      priceDisplay: formatPrice(priceRaw ?? null, paymentDecimals),
      baseMdaoDisplay: "—",
      bonusMdaoDisplay: "—",
      totalMdaoDisplay: "—",
      burnMdaoDisplay: "—",
      monthlyReleaseDisplay: "—",
      lockEndLabel: "—",
      vestingStartLabel: "—",
      vestingEndLabel: "—",
      firstClaimLabel: "—",
    };
  }

  const baseMdaoRaw = (amountRaw * mdaoUnit) / priceRaw;
  const bonusMdaoRaw =
    (baseMdaoRaw * BigInt(lockTier.bonusPercent * 100)) / BigInt(10_000);
  const totalMdaoRaw = baseMdaoRaw + bonusMdaoRaw;
  const burnPaymentRaw = (amountRaw * BigInt(50)) / BigInt(10_000);
  const burnMdaoRaw = (burnPaymentRaw * mdaoUnit) / priceRaw;
  const monthlyReleaseRaw = totalMdaoRaw / BigInt(lockTier.vestingMonths);

  const lockEnd = addMonths(now, lockTier.lockMonths);
  const vestingStart = lockEnd;
  const vestingEnd = addMonths(vestingStart, lockTier.vestingMonths);
  const firstClaim = addMonths(vestingStart, 1);

  return {
    amountUsd,
    amountRaw,
    baseMdaoRaw,
    bonusMdaoRaw,
    totalMdaoRaw,
    burnMdaoRaw,
    feeLpUsd: amountUsd * 0.3,
    feeCommunityUsd: amountUsd * 0.3,
    feeInvestmentUsd: amountUsd * 0.4,
    priceDisplay: formatPrice(priceRaw, paymentDecimals),
    baseMdaoDisplay: formatTokenAmount(baseMdaoRaw, mdaoDecimals, 0),
    bonusMdaoDisplay: formatTokenAmount(bonusMdaoRaw, mdaoDecimals, 0),
    totalMdaoDisplay: formatTokenAmount(totalMdaoRaw, mdaoDecimals, 0),
    burnMdaoDisplay: formatTokenAmount(burnMdaoRaw, mdaoDecimals, 0),
    monthlyReleaseDisplay: formatTokenAmount(
      monthlyReleaseRaw,
      mdaoDecimals,
      0,
    ),
    lockEndLabel: formatDateLabel(lockEnd),
    vestingStartLabel: formatDateLabel(vestingStart),
    vestingEndLabel: formatDateLabel(vestingEnd),
    firstClaimLabel: formatDateLabel(firstClaim),
  };
}
