"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Check,
  CheckCircle2,
  ChevronDown,
  Copy,
  ExternalLink,
  FileText,
  LoaderCircle,
  ShieldCheck,
  Upload,
  UserRound,
  Wallet,
} from "lucide-react";
import { formatUnits } from "viem";
import { useAccount, useDisconnect, useReadContract, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { ConnectWalletButton } from "@/components/presale/connect-wallet-button";
import { SiteFooter } from "@/components/layout/site-footer";
import { MDAO_PARTNERSHIP_ABI } from "@/lib/abi";
import { ERC20_ABI } from "@/lib/erc20-abi";
import { CONTRACTS } from "@/lib/contracts";
import { usePartnershipData, usePriceHistory } from "@/hooks/usePartnershipData";
import {
  COUNTRY_OPTIONS,
  INDUSTRY_OPTIONS,
  LOCK_TIERS,
  PARTNERSHIP_CONTACT_EMAIL,
  PARTNERSHIP_FAQ,
  PARTNERSHIP_LIMITS,
  PARTNERSHIP_VERSION,
  calculatePartnershipSummary,
  formatCurrency,
  formatNumber,
  formatPrice,
  formatRelativeUpdate,
  formatTokenAmount,
  formatTimeUntilCompanies,
  getLockTierConfig,
  isValidWalletAddress,
  type PartnershipApplicantType,
} from "@/lib/partnership";
import {
  markPartnershipIdConsumed,
  submitPartnershipApplication,
  uploadKycDocuments,
  verifyPartnershipId,
} from "@/lib/partnership-api";
import { cn, getAddressLink, getTxLink, shortenAddress } from "@/lib/utils";

type NavItem = { label: string; href: string };
type UploadValue = File | null;
type VerifyState =
  | "idle"
  | "loading"
  | "valid"
  | "invalid"
  | "pending"
  | "rejected"
  | "expired"
  | "used";
type ApplyStep = 1 | 2 | 3 | 4;
type ReviewStep = 1 | 2 | 3 | 4;

type ApplicationSuccess = {
  referenceNumber: string;
  email: string;
};

const SITE_NAV: NavItem[] = [
  { label: "Dashboard", href: "/dashboard" },
];

const PARTNERSHIP_NAV: NavItem[] = [
  { label: "Overview", href: "#overview" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Apply", href: "#apply" },
  { label: "Verify & Onboard", href: "#verify" },
  { label: "Transparency", href: "#transparency" },
  { label: "FAQ", href: "#faq" },
];

const STEP_CARDS = [
  {
    number: "01",
    icon: FileText,
    title: "Apply & KYC",
    description: "Fill the form. We verify your identity and documents.",
  },
  {
    number: "02",
    icon: ShieldCheck,
    title: "Get Approved",
    description: "Admin reviews within 24hrs. Email sent with your unique ID.",
  },
  {
    number: "03",
    icon: Wallet,
    title: "Connect & Pay",
    description: "Enter your ID, connect wallet, and complete USDT payment.",
  },
  {
    number: "04",
    icon: BadgeCheck,
    title: "Claim Tokens",
    description: "After your lock period ends, claim monthly vested tokens.",
  },
] as const;

const FEE_SPLIT = [
  { title: "Liquidity Pool", value: "30%" },
  { title: "Community Wallet", value: "30%" },
  { title: "Investment Foundation", value: "40%" },
] as const;

const VERIFY_STEPS = ["Enter ID", "Connect Wallet", "Configure", "Confirm & Pay"] as const;
const APPLY_STEPS = ["Profile", "Documents", "Investment", "Confirm"] as const;

// ─── Shared layout primitives ────────────────────────────────────────────────

function SectionShell({
  id,
  className,
  children,
}: {
  id: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={cn("scroll-mt-28 px-4 py-20 sm:px-6 lg:px-8", className)}>
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  );
}

/**
 * SectionHeading – supports both dark-on-light and light-on-dark contexts.
 * Pass `variant="light"` when the section background is dark (default).
 * Pass `variant="dark"` when the section background is a light/cream color.
 */
function SectionHeading({
  eyebrow,
  title,
  body,
  variant = "light",
}: {
  eyebrow: string;
  title: string;
  body: string;
  variant?: "light" | "dark";
}) {
  const isLight = variant === "light";
  return (
    <div className="max-w-3xl">
      <p
        className={cn(
          "mb-3 text-xs uppercase tracking-[0.35em]",
          isLight ? "text-[#2ed8a3]" : "text-[#0f766e]"
        )}
        style={{ fontFamily: "'Rajdhani', sans-serif" }}
      >
        {eyebrow}
      </p>
      <h2
        className={cn(
          "text-4xl sm:text-5xl",
          isLight ? "text-white" : "text-[#0d1117]"
        )}
        style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.06em" }}
      >
        {title}
      </h2>
      <p
        className={cn(
          "mt-4 text-base leading-7 sm:text-lg",
          isLight ? "text-white/65" : "text-[#374151]"
        )}
      >
        {body}
      </p>
    </div>
  );
}

function SkeletonCard() {
  return <div className="h-28 animate-pulse rounded-[24px] border border-white/10 bg-white/6" />;
}

function FileUploadCard({
  label,
  name,
  value,
  required = true,
  onChange,
}: {
  label: string;
  name: string;
  value: UploadValue;
  required?: boolean;
  onChange: (file: File | null) => void;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium leading-6 text-[#1f2937]">
        {label}
        {required ? " *" : ""}
      </label>
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          onChange(e.dataTransfer.files?.[0] ?? null);
        }}
        onClick={() => inputRef.current?.click()}
        className="cursor-pointer rounded-2xl border border-dashed border-[#d1d5db] bg-[#f9fafb] p-4 transition hover:border-[#f0b429]/60 hover:bg-[#fffbf0] sm:p-5"
      >
        <input
          ref={inputRef}
          type="file"
          name={name}
          className="hidden"
          accept=".pdf,image/*"
          onChange={(e) => onChange(e.target.files?.[0] ?? null)}
        />
        {!value ? (
          <div className="flex items-start gap-3 text-[#6b7280]">
            <Upload className="mt-0.5 h-5 w-5 shrink-0 text-[#f0b429]" />
            <div className="min-w-0">
              <p className="font-medium leading-6 text-[#374151]">Click to upload or drag and drop</p>
              <p className="mt-1 text-sm leading-6 text-[#9ca3af]">PDF, JPG, PNG - max 10 MB</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0 flex-1">
              <p className="break-words font-medium leading-6 text-[#1f2937]">{value.name}</p>
              <p className="text-sm leading-6 text-[#0f766e]">{(value.size / 1024 / 1024).toFixed(2)} MB uploaded</p>
            </div>
            <div className="flex items-center justify-between gap-3 sm:justify-end">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-[#0f766e]" />
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); onChange(null); }}
                className="shrink-0 rounded-full border border-[#d1d5db] px-3 py-1.5 text-sm text-[#6b7280] transition hover:border-[#9ca3af] hover:text-[#374151]"
              >
                Remove
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Header ──────────────────────────────────────────────────────────────────

function PartnershipHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className="sticky top-0 z-50 border-b border-white/8 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(5,7,10,0.96)" : "rgba(5,7,10,0.72)",
        backdropFilter: "blur(24px)",
        boxShadow: scrolled ? "0 1px 0 rgba(240,180,41,0.12)" : "none",
      }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
         <Image
  src="/mdao-logo-removebg.png"
  alt="MDAO"
  width={120}
  height={120}
  className="h-16 w-16 object-contain"
/>
          <div className="hidden sm:block">
            <span className="block text-[10px] uppercase tracking-[0.4em] text-[#f0b429]/70" style={{ fontFamily: "'Rajdhani', sans-serif" }}>MDAO</span>
            <span className="block text-[11px] uppercase tracking-[0.25em] text-white/50" style={{ fontFamily: "'Rajdhani', sans-serif" }}>Partnership</span>
          </div>
        </Link>

        <nav className="hidden items-center gap-5 text-[13px] text-white/55 lg:flex">
          {SITE_NAV.map((item) => (
            <Link key={item.label} href={item.href} className="transition hover:text-white">
              {item.label}
            </Link>
          ))}
          <span className="h-4 w-px bg-white/15" />
          {PARTNERSHIP_NAV.map((item) => (
            <a key={item.label} href={item.href} className="transition hover:text-white">
              {item.label}
            </a>
          ))}
        </nav>

        <ConnectWalletButton variant="header" />
      </div>
    </header>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PartnershipPage() {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { writeContractAsync } = useWriteContract();
  const partnership = usePartnershipData();
  const priceHistory = usePriceHistory();
  const [visibleEvents, setVisibleEvents] = useState(10);

  const [applicantType, setApplicantType] = useState<PartnershipApplicantType>("company");
  const [applyStep, setApplyStep] = useState<ApplyStep>(1);
  const [formError, setFormError] = useState<string | null>(null);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [applicationSuccess, setApplicationSuccess] = useState<ApplicationSuccess | null>(null);

  const [verifyStage, setVerifyStage] = useState<ReviewStep>(1);
  const [verifyId, setVerifyId] = useState("");
  const [verifyState, setVerifyState] = useState<VerifyState>("idle");
  const [verifyMessage, setVerifyMessage] = useState<string | null>(null);
  const [verifiedApplicant, setVerifiedApplicant] = useState<{
    applicantType: PartnershipApplicantType;
    walletAddress: `0x${string}`;
    lockTier: number;
    amount: number;
    email: string;
  } | null>(null);

  const [approveHash, setApproveHash] = useState<`0x${string}` | undefined>();
  const [onboardHash, setOnboardHash] = useState<`0x${string}` | undefined>();
  const [approvalError, setApprovalError] = useState<string | null>(null);
  const [onboardError, setOnboardError] = useState<string | null>(null);

  const [companyForm, setCompanyForm] = useState({
    legalCompanyName: "", country: "", registrationNumber: "",
    primaryContactName: "", contactEmail: "", contactPhone: "",
    industry: "", description: "", walletAddress: "",
    investmentAmount: "", lockTier: "3", allianceConsent: false,
    confirmAccuracy: false, agreeTerms: false, agreePrivacy: false,
  });

  const [individualForm, setIndividualForm] = useState({
    fullName: "", country: "", dateOfBirth: "", email: "", phone: "",
    occupation: "", walletAddress: "", investmentAmount: "", lockTier: "3",
    confirmAccuracy: false, agreeTerms: false, agreePrivacy: false,
  });

  const [companyFiles, setCompanyFiles] = useState<Record<string, UploadValue>>({
    certificate: null, proofOfAddress: null, directorId: null, proofOfFunds: null,
  });
  const [individualFiles, setIndividualFiles] = useState<Record<string, UploadValue>>({
    govFront: null, govBack: null, proofOfAddress: null, proofOfFunds: null,
  });

  const activeForm = applicantType === "company" ? companyForm : individualForm;
  const activeFiles = applicantType === "company" ? companyFiles : individualFiles;

  const stats = partnership.stats;
  const effectiveCompanyCount = stats ? Number(stats[0]) : null;
  const paidCompanyCount = stats ? Number(stats[1]) : null;
  const individualCount = stats ? Number(stats[2]) : null;
  const totalRaisedRaw = stats?.[4];
  const tokenPriceRaw = stats?.[5];
  const totalMdaoAllocatedRaw = partnership.totalMdaoAllocated;
  const totalMdaoClaimedRaw = partnership.totalMdaoClaimed;
  const outstandingMdaoRaw =
    totalMdaoAllocatedRaw !== undefined && totalMdaoClaimedRaw !== undefined
      ? totalMdaoAllocatedRaw - totalMdaoClaimedRaw
      : undefined;

  const companyLimits = {
    min: partnership.companyMinPayment ? Number(formatUnits(partnership.companyMinPayment, partnership.paymentTokenDecimals)) : PARTNERSHIP_LIMITS.company.minUsd,
    max: partnership.companyMaxPayment ? Number(formatUnits(partnership.companyMaxPayment, partnership.paymentTokenDecimals)) : PARTNERSHIP_LIMITS.company.maxUsd,
  };
  const individualLimits = {
    min: partnership.individualMinPayment ? Number(formatUnits(partnership.individualMinPayment, partnership.paymentTokenDecimals)) : PARTNERSHIP_LIMITS.individual.minUsd,
    max: partnership.individualMaxPayment ? Number(formatUnits(partnership.individualMaxPayment, partnership.paymentTokenDecimals)) : PARTNERSHIP_LIMITS.individual.maxUsd,
  };

  const amountLimits = verifiedApplicant?.applicantType === "individual" ? individualLimits : companyLimits;
  const approvedAmount = verifiedApplicant?.amount ?? null;
  const approvedAmountInput = approvedAmount !== null ? String(approvedAmount) : "";
  const approvedLockTier = verifiedApplicant?.lockTier ?? 3;
  const approvedLockTierConfig = getLockTierConfig(approvedLockTier);

  const summary = useMemo(
    () =>
      calculatePartnershipSummary({
        amountInput: approvedAmountInput,
        priceRaw: tokenPriceRaw,
        paymentDecimals: partnership.paymentTokenDecimals,
        mdaoDecimals: partnership.mdaoTokenDecimals,
        lockTierId: approvedLockTier,
      }),
    [approvedAmountInput, approvedLockTier, tokenPriceRaw, partnership.paymentTokenDecimals, partnership.mdaoTokenDecimals]
  );

  const amountNumber = approvedAmount;
  const isAmountValid =
    amountNumber !== null && !Number.isNaN(amountNumber) &&
    amountNumber >= amountLimits.min && amountNumber <= amountLimits.max;

  const { data: isWhitelistedData, isLoading: isWhitelistLoading } = useReadContract({
    address: CONTRACTS.PARTNERSHIP,
    abi: MDAO_PARTNERSHIP_ABI,
    functionName: "isWhitelisted",
    args: address ? [address] : undefined,
    query: {
      enabled: verifyStage >= 2 && isConnected && !!address && !!verifiedApplicant && address.toLowerCase() === verifiedApplicant.walletAddress.toLowerCase(),
      refetchInterval: 30_000,
    },
  });

  useEffect(() => {
    if (verifyStage === 2 && verifiedApplicant && isConnected && address) {
      if (address.toLowerCase() !== verifiedApplicant.walletAddress.toLowerCase()) {
        setVerifyMessage(`Wrong wallet connected. Your application was registered with wallet: ${shortenAddress(verifiedApplicant.walletAddress)}. Currently connected: ${shortenAddress(address)}.`);
        return;
      }
      if (isWhitelistedData === true) {
        setVerifyMessage(null);
        setVerifyStage(3);
      } else if (isWhitelistedData === false && !isWhitelistLoading) {
        setVerifyMessage("Your wallet is approved in our system but not yet registered on-chain. This usually resolves within a few minutes. Please refresh and try again.");
      }
    }
  }, [verifyStage, verifiedApplicant, isConnected, address, isWhitelistedData, isWhitelistLoading]);

  const approveReceipt = useWaitForTransactionReceipt({ hash: approveHash, query: { enabled: !!approveHash } });
  const onboardReceipt = useWaitForTransactionReceipt({ hash: onboardHash, query: { enabled: !!onboardHash } });

  useEffect(() => { if (approveReceipt.isSuccess) setApprovalError(null); }, [approveReceipt.isSuccess]);
  useEffect(() => {
    if (onboardReceipt.isSuccess && onboardHash && verifyId) markPartnershipIdConsumed(verifyId, onboardHash);
  }, [onboardReceipt.isSuccess, onboardHash, verifyId]);
  useEffect(() => {
    setApplyStep(1);
    setFormError(null);
  }, [applicantType]);

  function copyAddress(value: string) { navigator.clipboard.writeText(value).catch(() => undefined); }
  function updateCompanyField<K extends keyof typeof companyForm>(key: K, value: (typeof companyForm)[K]) { setCompanyForm((c) => ({ ...c, [key]: value })); }
  function updateIndividualField<K extends keyof typeof individualForm>(key: K, value: (typeof individualForm)[K]) { setIndividualForm((c) => ({ ...c, [key]: value })); }
  function validateApplyStep(step: ApplyStep) {
    if (step === 1) {
      if (applicantType === "company") {
        if (
          !companyForm.legalCompanyName.trim() ||
          !companyForm.country ||
          !companyForm.registrationNumber.trim() ||
          !companyForm.primaryContactName.trim() ||
          !companyForm.contactEmail.trim() ||
          !companyForm.contactPhone.trim() ||
          !companyForm.industry ||
          !companyForm.description.trim()
        ) {
          return "Please complete all profile details before continuing.";
        }
      } else if (
        !individualForm.fullName.trim() ||
        !individualForm.country ||
        !individualForm.dateOfBirth ||
        !individualForm.email.trim() ||
        !individualForm.phone.trim() ||
        !individualForm.occupation.trim()
      ) {
        return "Please complete all personal details before continuing.";
      }
    }

    if (step === 2 && Object.values(activeFiles).some((file) => !file)) {
      return "Please upload all required supporting documents before continuing.";
    }

    if (step === 3) {
      const walletAddress = activeForm.walletAddress.trim();
      if (!isValidWalletAddress(walletAddress)) {
        return "Please enter a valid BNB Chain wallet address.";
      }

      const amount = Number(activeForm.investmentAmount);
      const limits = applicantType === "company" ? companyLimits : individualLimits;
      if (Number.isNaN(amount) || amount < limits.min || amount > limits.max) {
        return `Amount must be between ${formatCurrency(limits.min)} and ${formatCurrency(limits.max)}.`;
      }

      if (!activeForm.lockTier) {
        return "Please choose a preferred lock tier.";
      }
    }

    if (step === 4) {
      const agreementsComplete =
        applicantType === "company"
          ? companyForm.confirmAccuracy && companyForm.agreeTerms && companyForm.agreePrivacy
          : individualForm.confirmAccuracy && individualForm.agreeTerms && individualForm.agreePrivacy;

      if (!agreementsComplete) {
        return "Please confirm the declarations and agreements before submitting.";
      }
    }

    return null;
  }

  function goToNextApplyStep() {
    const validationError = validateApplyStep(applyStep);
    if (validationError) {
      setFormError(validationError);
      return;
    }
    setFormError(null);
    setApplyStep((current) => Math.min(current + 1, 4) as ApplyStep);
  }

  function goToPreviousApplyStep() {
    setFormError(null);
    setApplyStep((current) => Math.max(current - 1, 1) as ApplyStep);
  }

  async function handleSubmitApplication(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validationError = validateApplyStep(4);
    if (validationError) {
      setFormError(validationError);
      return;
    }

    setFormSubmitting(true);
    setFormError(null);

    const walletAddress = activeForm.walletAddress.trim();

    if (!isValidWalletAddress(walletAddress)) {
      setFormError("Please enter a valid BNB Chain wallet address.");
      setFormSubmitting(false);
      return;
    }

    const amount = Number(activeForm.investmentAmount);
    const limits = applicantType === "company" ? companyLimits : individualLimits;
    if (Number.isNaN(amount) || amount < limits.min || amount > limits.max) {
      setFormError(`Amount must be between ${formatCurrency(limits.min)} and ${formatCurrency(limits.max)}.`);
      setFormSubmitting(false);
      return;
    }

    if (Object.values(activeFiles).some((f) => !f)) {
      setFormError("Please upload all required supporting documents.");
      setFormSubmitting(false);
      return;
    }

    try {
      const uploadedDocuments = await uploadKycDocuments(
        applicantType,
        Object.values(activeFiles).filter((file): file is File => !!file),
      );

      const payload =
        applicantType === "company"
          ? {
              type: "company",
              fullName: companyForm.primaryContactName.trim(),
              email: companyForm.contactEmail.trim(),
              phone: companyForm.contactPhone.trim(),
              country: companyForm.country,
              companyName: companyForm.legalCompanyName.trim(),
              companyDescription: companyForm.description.trim(),
              industry: companyForm.industry,
              registrationNumber: companyForm.registrationNumber.trim(),
              walletAddress: companyForm.walletAddress.trim(),
              investorAmount: Number(companyForm.investmentAmount),
              lockPeriod: Number(companyForm.lockTier),
              documents: uploadedDocuments,
              legalInfo: {
                legalDisputes: false,
                fraudHistory: false,
              },
              isPublic: companyForm.allianceConsent,
            }
          : {
              type: "individual",
              fullName: individualForm.fullName.trim(),
              email: individualForm.email.trim(),
              phone: individualForm.phone.trim(),
              country: individualForm.country,
              occupation: individualForm.occupation.trim(),
              dob: individualForm.dateOfBirth,
              passport: uploadedDocuments[0]?.url ?? "uploaded",
              walletAddress: individualForm.walletAddress.trim(),
              investorAmount: Number(individualForm.investmentAmount),
              lockPeriod: Number(individualForm.lockTier),
              documents: uploadedDocuments,
              legalInfo: {
                legalDisputes: false,
                fraudHistory: false,
              },
              isPublic: false,
            };

      const response = await submitPartnershipApplication({
        applicantType,
        email:
          applicantType === "company"
            ? companyForm.contactEmail.trim()
            : individualForm.email.trim(),
        walletAddress,
        lockTier: Number(activeForm.lockTier),
        payload,
      });
      setApplicationSuccess(response);
    } catch {
      setFormError(`Submission failed. Please check your connection and try again. If the problem continues contact ${PARTNERSHIP_CONTACT_EMAIL}`);
    } finally {
      setFormSubmitting(false);
    }
  }

  async function handleVerifyId() {
    setVerifyState("loading");
    setVerifyMessage(null);
    try {
      const result = await verifyPartnershipId(verifyId);
      if (result.status === "valid") {
        setVerifyState("valid");
        setVerifiedApplicant(result);
        setVerifyStage(2);
        // setVerifyMessage("ID verified. Now connect the wallet you registered during your application.");
      } else if (result.status === "invalid") {
        setVerifyState("invalid");
        setVerifyMessage("ID not found. Please check your email and try again.");
      } else if (result.status === "pending") {
        setVerifyState("pending");
        setVerifyMessage("Your application exists but is still pending review. We’ll email you once it has been approved.");
      } else if (result.status === "rejected") {
        setVerifyState("rejected");
        setVerifyMessage(`This application was rejected. Please contact ${PARTNERSHIP_CONTACT_EMAIL} if you need help or want to resubmit.`);
      } else if (result.status === "expired") {
        setVerifyState("expired");
        setVerifyMessage(`This ID has expired. Please contact ${PARTNERSHIP_CONTACT_EMAIL} to reactivate your application.`);
      }else if( result.status === 'refNum'){
        setVerifyState("pending");
        setVerifyMessage(
    "Good news! Your application has been approved. Check your registered email for your Onboarding ID and use it to proceed."
  );
      } 
      else {
        setVerifyState("used");
        setVerifyMessage("This ID has already been used to complete onboarding. Connect your wallet and visit your dashboard to view your position.");
      }
    } catch {
      setVerifyState("idle");
      setVerifyMessage("Unable to validate this ID right now. Please try again in a moment.");
    }
  }

  async function handleApprove() {
    if (!summary.amountRaw || !partnership.paymentToken) return;
    setApprovalError(null);
    try {
      const hash = await writeContractAsync({ address: partnership.paymentToken, abi: ERC20_ABI, functionName: "approve", args: [CONTRACTS.PARTNERSHIP, summary.amountRaw] });
      setApproveHash(hash);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "";
      setApprovalError(message.includes("rejected") ? "Approval cancelled. Click to try again." : "Unable to start the approval transaction.");
    }
  }

  async function handleOnboard() {
    if (!summary.totalMdaoRaw || !verifiedApplicant) return;
    setOnboardError(null);
    try {
      const hash = await writeContractAsync({
        address: CONTRACTS.PARTNERSHIP,
        abi: MDAO_PARTNERSHIP_ABI,
        functionName: verifiedApplicant.applicantType === "company" ? "onboardCompany" : "onboardIndividual",
        args: [summary.totalMdaoRaw, approvedLockTier],
      });
      setOnboardHash(hash);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "";
      setOnboardError(message.includes("rejected") ? "Transaction cancelled. Click to try again." : "Unable to submit the onboarding transaction.");
    }
  }

  const stage3Ready = verifyStage >= 3 && verifiedApplicant;
  const approvalComplete = approveReceipt.isSuccess;
  const onboardingComplete = onboardReceipt.isSuccess;
  return (
    <main className="min-h-screen bg-[#05070a] text-white">
      <PartnershipHeader />

      {/* ── OVERVIEW ─────────────────────────────────────────────────────── */}
      <SectionShell
        id="overview"
        className="border-b border-white/8 bg-[radial-gradient(ellipse_at_top_left,rgba(240,180,41,0.14),transparent_45%),radial-gradient(ellipse_at_bottom_right,rgba(46,216,163,0.07),transparent_50%),linear-gradient(180deg,#0c1120_0%,#05070a_70%)] pt-16"
      >
        <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
          <div>
            <p
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#2ed8a3]/20 bg-[#2ed8a3]/8 px-4 py-2 text-[11px] uppercase tracking-[0.35em] text-[#2ed8a3]"
              style={{ fontFamily: "'Rajdhani', sans-serif" }}
            >
              <span className="inline-flex h-2 w-2 rounded-full bg-[#2ed8a3] shadow-[0_0_14px_rgba(46,216,163,0.8)]" />
              Enterprise Access · Live on BNB Chain
            </p>
            <h1
              className="max-w-4xl text-5xl leading-none text-white sm:text-6xl lg:text-[80px]"
              style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.05em" }}
            >
              Join the MDAO Enterprise Partnership Program
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/60">
              Invest in MDAO tokens through our enterprise onboarding program. Lock your investment and earn bonus tokens while
              supporting the ecosystem.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#apply"
                className="inline-flex items-center gap-2 rounded-2xl bg-[#f0b429] px-7 py-3.5 font-semibold text-[#05070a] shadow-[0_4px_24px_rgba(240,180,41,0.35)] transition hover:brightness-110 hover:shadow-[0_6px_32px_rgba(240,180,41,0.5)]"
              >
                Apply to Join <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href={getAddressLink(CONTRACTS.PARTNERSHIP)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-2xl border border-white/12 bg-white/5 px-7 py-3.5 font-semibold text-white/80 transition hover:border-[#f0b429]/40 hover:bg-white/8 hover:text-white"
              >
                View Contract <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="rounded-[28px] border border-white/8 bg-white/4 p-6 backdrop-blur-xl">
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#f0b429]" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
              Live Program Snapshot
            </p>
            <div className="mt-4 space-y-3 text-sm text-white/55">
              <p>The partnership contract refreshes every 30 seconds and powers the onboarding flow directly on BNB Smart Chain.</p>
              <p>If wallet state is already active from the presale page, the onboarding section below picks it up automatically.</p>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {partnership.isLoading ? (
            <><SkeletonCard /><SkeletonCard /><SkeletonCard /><SkeletonCard /></>
          ) : (
            <>
              {[
                { label: "Total Companies", value: formatNumber(effectiveCompanyCount, 0) },
                { label: "Total Raised", value: totalRaisedRaw ? formatCurrency(Number(formatUnits(totalRaisedRaw, partnership.paymentTokenDecimals)), 0) : "—" },
                {
                  label: "Token Price",
                  value: formatPrice(tokenPriceRaw ?? null, partnership.paymentTokenDecimals),
                  live: true,
                },
                {
                  label: "Next Price Bump",
                  value: formatTimeUntilCompanies(partnership.nextPriceIncreaseIn !== undefined ? Number(partnership.nextPriceIncreaseIn) : null),
                },
              ].map((stat) => (
                <div key={stat.label} className="rounded-[26px] border border-white/8 bg-white/4 p-6">
                  <p className="flex items-center gap-2 text-sm text-white/45">
                    {stat.label}
                    {stat.live && (
                      <span className="inline-flex h-2 w-2 rounded-full bg-[#2ed8a3] shadow-[0_0_14px_rgba(46,216,163,0.8)] animate-pulse" />
                    )}
                  </p>
                  <p className="mt-3 text-3xl font-light text-white">{stat.value}</p>
                </div>
              ))}
            </>
          )}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-white/35">
          <span>{formatRelativeUpdate(partnership.secondsAgo)}</span>
          {partnership.isError && <span className="text-amber-500/70">Unable to load live data. Showing last known values.</span>}
        </div>
      </SectionShell>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <SectionShell id="how-it-works" className="bg-[#0d1117] border-b border-white/6">
        <SectionHeading
          eyebrow="How It Works"
          title="A Single Flow For Discovery, Approval, And On-Chain Onboarding"
          body="The page stays on one route, but it serves three kinds of visitors at once: first-time research, KYC application, and approved investor onboarding."
          variant="light"
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-4">
          {STEP_CARDS.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.number} className="rounded-[28px] border border-white/8 bg-white/4 p-6 transition hover:border-[#f0b429]/30 hover:bg-white/6">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold tracking-[0.35em] text-[#f0b429]/60">{step.number}</span>
                  <Icon className="h-5 w-5 text-[#2ed8a3]" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-white">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/50">{step.description}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {[
            {
              icon: Building2,
              title: "Company Partnership",
              rows: [
                { label: "Minimum", value: "$10,000 USDT" },
                { label: "Maximum", value: "$1,000,000 USDT" },
                { label: "Limit", value: "One per company" },
                { label: "Payment", value: "USDT on BNB Chain (BEP-20)" },
              ],
            },
            {
              icon: UserRound,
              title: "Individual Partnership",
              rows: [
                { label: "Minimum", value: "$5,000 USDT" },
                { label: "Maximum", value: "$100,000 USDT" },
                { label: "Limit", value: "One per wallet" },
                { label: "Payment", value: "USDT on BNB Chain (BEP-20)" },
              ],
            },
          ].map((card) => {
            const Icon = card.icon;
            return (
              <div key={card.title} className="rounded-[28px] border border-white/8 bg-white/4 p-6">
                <div className="flex items-center gap-3">
                  <Icon className="h-5 w-5 text-[#f0b429]" />
                  <h3 className="text-xl font-semibold text-white">{card.title}</h3>
                </div>
                <div className="mt-6 grid gap-4 text-sm">
                  {card.rows.map((row) => (
                    <div key={row.label} className="flex justify-between border-b border-white/6 pb-4 last:border-0 last:pb-0">
                      <span className="text-white/50">{row.label}</span>
                      <span className="font-semibold text-white">{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Lock tiers table */}
        <div className="mt-12 overflow-hidden rounded-[28px] border border-white/8">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-white/8 bg-white/4">
                <tr>
                  {["Lock Period", "Bonus MDAO", "Vesting Period", "Total Duration", "Monthly Release"].map((h) => (
                    <th key={h} className="px-6 py-4 text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {LOCK_TIERS.map((tier) => (
                  <tr key={tier.id} className={cn("border-t border-white/6 transition hover:bg-white/3", tier.popular && "bg-[#f0b429]/5")}>
                    <td className="px-6 py-4 font-semibold text-white">
                      <div className="flex items-center gap-3">
                        {tier.label}
                        {tier.popular && (
                          <span className="rounded-full bg-[#f0b429]/15 px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-[#f0b429]">
                            Popular
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[#2ed8a3]">{tier.bonusPercent}%</td>
                    <td className="px-6 py-4 text-white/55">{tier.vestingMonths} months</td>
                    <td className="px-6 py-4 text-white/55">{tier.lockMonths + tier.vestingMonths} months</td>
                    <td className="px-6 py-4 text-white/55">{tier.monthlyReleaseLabel}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="border-t border-white/6 px-6 py-5 text-sm text-white/40">
            Vesting begins after your lock period ends. Tokens are released linearly — a fixed amount becomes claimable each month.
          </div>
        </div>

        {/* Fee split */}
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {FEE_SPLIT.map((item) => (
            <div key={item.title} className="rounded-[28px] border border-white/8 bg-white/4 p-6 text-center">
              <p className="text-4xl font-light text-[#f0b429]" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.05em" }}>
                {item.value}
              </p>
              <p className="mt-2 text-sm uppercase tracking-[0.25em] text-white/45">{item.title}</p>
            </div>
          ))}
        </div>
        <div className="mt-5 rounded-2xl border border-[#2ed8a3]/12 bg-[#2ed8a3]/5 px-5 py-4 text-sm text-[#2ed8a3]/80">
          0.5% of every payment is converted to MDAO and permanently burned, reducing total supply with every onboard.
        </div>
      </SectionShell>

      {/* ── APPLY ────────────────────────────────────────────────────────── */}
      <SectionShell id="apply" className="bg-[#f7f8fa] border-b border-black/6">
        <div className="mx-auto max-w-[680px]">
          <SectionHeading
            eyebrow="Apply"
            title="Start Your Application"
            body="Complete the form below. Our team reviews applications within 24 hours. You will receive an email with your unique onboarding ID upon approval."
            variant="dark"
          />

          <div className="mt-8 inline-flex rounded-2xl border border-black/8 bg-white p-1 shadow-sm">
            {(["company", "individual"] as PartnershipApplicantType[]).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setApplicantType(type)}
                className={cn(
                  "rounded-xl px-6 py-2.5 text-sm font-semibold capitalize transition",
                  applicantType === type
                    ? "bg-[#0d1117] text-white shadow-sm"
                    : "text-[#6b7280] hover:text-[#1f2937]"
                )}
              >
                {type}
              </button>
            ))}
          </div>

          {applicationSuccess ? (
            <div className="mt-8 rounded-[32px] border border-black/8 bg-white p-8 shadow-[0_8px_40px_rgba(0,0,0,0.08)]">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                <CheckCircle2 className="h-7 w-7" />
              </div>
              <h3 className="mt-6 text-2xl font-semibold text-[#0d1117]">Application Submitted</h3>
              <p className="mt-2 text-sm text-[#6b7280]">Reference: <span className="font-mono font-semibold text-[#0d1117]">{applicationSuccess.referenceNumber}</span></p>
              <p className="mt-3 text-sm leading-7 text-[#4b5563]">
                We will review your application within 24 hours. A confirmation email has been sent to {applicationSuccess.email}.
              </p>
              <a href="#verify" className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-[#0d1117] px-5 py-3 text-sm font-semibold text-white">
                Check Application Status <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmitApplication} className="mt-8 space-y-6 rounded-[32px] border border-black/8 bg-white p-6 shadow-[0_8px_40px_rgba(0,0,0,0.08)] sm:p-8">
              <div className="flex flex-wrap gap-3">
                {APPLY_STEPS.map((label, index) => {
                  const stepNumber = (index + 1) as ApplyStep;
                  const active = applyStep >= stepNumber;
                  return (
                    <div key={label} className="flex items-center gap-3">
                      {index > 0 && <span className="hidden h-px w-6 bg-black/15 sm:block" />}
                      <div className={cn("flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold", active ? "bg-[#0d1117] text-white" : "border border-black/15 text-[#9ca3af]")}>
                        {active && applyStep > stepNumber ? <Check className="h-4 w-4" /> : index + 1}
                      </div>
                      <span className={cn("text-sm", active ? "font-medium text-[#0d1117]" : "text-[#9ca3af]")}>{label}</span>
                    </div>
                  );
                })}
              </div>

              {formError && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{formError}</div>
              )}

              {applyStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-semibold text-[#0d1117]">
                      {applicantType === "company" ? "Company Profile" : "Personal Profile"}
                    </h3>
                    <p className="mt-2 text-sm text-[#6b7280]">
                      {applicantType === "company"
                        ? "Tell us who is applying and how to reach the primary contact."
                        : "Start with your personal and contact details."}
                    </p>
                  </div>

                  {applicantType === "company" ? (
                    <>
                      <div className="grid gap-5 sm:grid-cols-2">
                        <DarkInput label="Legal company name" value={companyForm.legalCompanyName} onChange={(v) => updateCompanyField("legalCompanyName", v)} required />
                        <DarkSelect label="Country of registration" value={companyForm.country} onChange={(v) => updateCompanyField("country", v)} options={COUNTRY_OPTIONS} required />
                        <DarkInput label="Company registration number" value={companyForm.registrationNumber} onChange={(v) => updateCompanyField("registrationNumber", v)} required />
                        <DarkInput label="Primary contact full name" value={companyForm.primaryContactName} onChange={(v) => updateCompanyField("primaryContactName", v)} required />
                        <DarkInput label="Contact email address" type="email" value={companyForm.contactEmail} onChange={(v) => updateCompanyField("contactEmail", v)} required />
                        <DarkInput label="Contact phone number" type="tel" value={companyForm.contactPhone} onChange={(v) => updateCompanyField("contactPhone", v)} required />
                        <DarkSelect label="Industry / sector" value={companyForm.industry} onChange={(v) => updateCompanyField("industry", v)} options={INDUSTRY_OPTIONS} required />
                      </div>
                      <DarkTextarea label="Brief company description" value={companyForm.description} onChange={(v) => updateCompanyField("description", v.slice(0, 300))} maxLength={300} required />
                    </>
                  ) : (
                    <div className="grid gap-5 sm:grid-cols-2">
                      <DarkInput label="Full legal name" value={individualForm.fullName} onChange={(v) => updateIndividualField("fullName", v)} required />
                      <DarkSelect label="Country of residence" value={individualForm.country} onChange={(v) => updateIndividualField("country", v)} options={COUNTRY_OPTIONS} required />
                      <DarkInput label="Date of birth" type="date" value={individualForm.dateOfBirth} onChange={(v) => updateIndividualField("dateOfBirth", v)} required />
                      <DarkInput label="Email address" type="email" value={individualForm.email} onChange={(v) => updateIndividualField("email", v)} required />
                      <DarkInput label="Phone number" type="tel" value={individualForm.phone} onChange={(v) => updateIndividualField("phone", v)} required />
                      <DarkInput label="Occupation" value={individualForm.occupation} onChange={(v) => updateIndividualField("occupation", v)} required />
                    </div>
                  )}
                </div>
              )}

              {applyStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-semibold text-[#0d1117]">Supporting Documents</h3>
                    <p className="mt-2 text-sm text-[#6b7280]">Upload the required KYC files before moving to investment details.</p>
                  </div>

                  {applicantType === "company" ? (
                    <div className="grid gap-5">
                      <FileUploadCard label="Certificate of incorporation" name="certificate" value={companyFiles.certificate} onChange={(f) => setCompanyFiles((c) => ({ ...c, certificate: f }))} />
                      <FileUploadCard label="Company proof of address — bank statement or utility bill, last 3 months" name="proofOfAddress" value={companyFiles.proofOfAddress} onChange={(f) => setCompanyFiles((c) => ({ ...c, proofOfAddress: f }))} />
                      <FileUploadCard label="Director government ID — passport or national ID" name="directorId" value={companyFiles.directorId} onChange={(f) => setCompanyFiles((c) => ({ ...c, directorId: f }))} />
                      <FileUploadCard label="Proof of funds — bank statement, last 3 months" name="proofOfFunds" value={companyFiles.proofOfFunds} onChange={(f) => setCompanyFiles((c) => ({ ...c, proofOfFunds: f }))} />
                    </div>
                  ) : (
                    <div className="grid gap-5">
                      <FileUploadCard label="Government ID — front" name="govFront" value={individualFiles.govFront} onChange={(f) => setIndividualFiles((c) => ({ ...c, govFront: f }))} />
                      <FileUploadCard label="Government ID — back" name="govBack" value={individualFiles.govBack} onChange={(f) => setIndividualFiles((c) => ({ ...c, govBack: f }))} />
                      <FileUploadCard label="Proof of address — utility bill or bank statement, last 3 months" name="proofOfAddress" value={individualFiles.proofOfAddress} onChange={(f) => setIndividualFiles((c) => ({ ...c, proofOfAddress: f }))} />
                      <FileUploadCard label="Proof of funds — bank statement, last 3 months" name="proofOfFunds" value={individualFiles.proofOfFunds} onChange={(f) => setIndividualFiles((c) => ({ ...c, proofOfFunds: f }))} />
                    </div>
                  )}
                </div>
              )}

              {applyStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-semibold text-[#0d1117]">Investment Setup</h3>
                    <p className="mt-2 text-sm text-[#6b7280]">Provide the wallet and target investment details for this application.</p>
                  </div>

                  {applicantType === "company" ? (
                    <>
                      <div className="grid gap-5 sm:grid-cols-2">
                        <DarkInput label="Wallet address on BNB Chain" value={companyForm.walletAddress} onChange={(v) => updateCompanyField("walletAddress", v)} error={companyForm.walletAddress && !isValidWalletAddress(companyForm.walletAddress) ? "Must start with 0x and be 42 characters." : undefined} required />
                        <DarkInput label="Intended investment amount (USD)" type="number" value={companyForm.investmentAmount} onChange={(v) => updateCompanyField("investmentAmount", v)} hint={PARTNERSHIP_LIMITS.company.label} required />
                        <DarkSelect
                          label="Preferred lock tier"
                          value={companyForm.lockTier}
                          onChange={(v) => updateCompanyField("lockTier", v)}
                          options={LOCK_TIERS.map((t) => `${t.label} (+${t.bonusPercent}% bonus)`)}
                          optionValues={LOCK_TIERS.map((t) => String(t.id))}
                          required
                        />
                      </div>
                      <DarkCheckbox checked={companyForm.allianceConsent} onChange={(v) => updateCompanyField("allianceConsent", v)}>
                        I consent to my company name and investment amount being shown publicly on the MDAO Alliance website
                      </DarkCheckbox>
                    </>
                  ) : (
                    <div className="grid gap-5 sm:grid-cols-2">
                      <DarkInput label="Wallet address on BNB Chain" value={individualForm.walletAddress} onChange={(v) => updateIndividualField("walletAddress", v)} error={individualForm.walletAddress && !isValidWalletAddress(individualForm.walletAddress) ? "Must start with 0x and be 42 characters." : undefined} required />
                      <DarkInput label="Intended investment amount (USD)" type="number" value={individualForm.investmentAmount} onChange={(v) => updateIndividualField("investmentAmount", v)} hint={PARTNERSHIP_LIMITS.individual.label} required />
                      <DarkSelect
                        label="Preferred lock tier"
                        value={individualForm.lockTier}
                        onChange={(v) => updateIndividualField("lockTier", v)}
                        options={LOCK_TIERS.map((t) => `${t.label} (+${t.bonusPercent}% bonus)`)}
                        optionValues={LOCK_TIERS.map((t) => String(t.id))}
                        required
                      />
                    </div>
                  )}
                </div>
              )}

{applyStep === 4 && (
  <div className="space-y-6">
    <div>
      <h3 className="text-xl sm:text-2xl font-semibold text-[#0d1117]">Review And Confirm</h3>
      <p className="mt-2 text-sm text-[#6b7280]">
        Take a final look before submitting your partnership application.
      </p>
    </div>

    {/* Cards: stacked on mobile, side-by-side on lg+ */}
    <div className="grid gap-4 sm:gap-5 grid-cols-1 lg:grid-cols-2">
      <div className="rounded-2xl border border-black/8 bg-[#f9fafb] p-4 sm:p-5">
        <p className="text-xs uppercase tracking-[0.25em] text-[#9ca3af]">Applicant</p>
        <div className="mt-4 space-y-3 text-sm text-[#374151]">
          <p>
            <span className="font-semibold text-[#0d1117]">Type:</span>{" "}
            {applicantType === "company" ? "Company" : "Individual"}
          </p>
          <p className="break-words">
            <span className="font-semibold text-[#0d1117]">Name:</span>{" "}
            {applicantType === "company"
              ? companyForm.primaryContactName || companyForm.legalCompanyName
              : individualForm.fullName}
          </p>
          <p className="break-all">
            <span className="font-semibold text-[#0d1117]">Email:</span>{" "}
            {applicantType === "company" ? companyForm.contactEmail : individualForm.email}
          </p>
          <p>
            <span className="font-semibold text-[#0d1117]">Country:</span>{" "}
            {activeForm.country || "—"}
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-black/8 bg-[#f9fafb] p-4 sm:p-5">
        <p className="text-xs uppercase tracking-[0.25em] text-[#9ca3af]">Investment</p>
        <div className="mt-4 space-y-3 text-sm text-[#374151]">
          <p className="break-all">
            <span className="font-semibold text-[#0d1117]">Wallet:</span>{" "}
            {activeForm.walletAddress || "—"}
          </p>
          <p>
            <span className="font-semibold text-[#0d1117]">Amount:</span>{" "}
            {activeForm.investmentAmount
              ? formatCurrency(Number(activeForm.investmentAmount))
              : "—"}
          </p>
          <p>
            <span className="font-semibold text-[#0d1117]">Lock Tier:</span>{" "}
            {LOCK_TIERS.find((tier) => String(tier.id) === activeForm.lockTier)?.label ?? "—"}
          </p>
          <p>
            <span className="font-semibold text-[#0d1117]">Documents:</span>{" "}
            {Object.values(activeFiles).filter(Boolean).length} uploaded
          </p>
        </div>
      </div>
    </div>

    {/* Checkboxes */}
    <div className="space-y-3 rounded-2xl border border-black/6 bg-[#f9fafb] p-4 sm:p-5">
      <DarkCheckbox
        checked={
          applicantType === "company"
            ? companyForm.confirmAccuracy
            : individualForm.confirmAccuracy
        }
        onChange={(v) =>
          applicantType === "company"
            ? updateCompanyField("confirmAccuracy", v)
            : updateIndividualField("confirmAccuracy", v)
        }
      >
        <span className="text-sm leading-snug">
          I confirm all information and documents provided are accurate and genuine
        </span>
      </DarkCheckbox>

      <DarkCheckbox
        checked={
          applicantType === "company" ? companyForm.agreeTerms : individualForm.agreeTerms
        }
        onChange={(v) =>
          applicantType === "company"
            ? updateCompanyField("agreeTerms", v)
            : updateIndividualField("agreeTerms", v)
        }
      >
        <span className="text-sm leading-snug">
          I have read and agree to the{" "}
          <Link
            href="/terms"
            target="_blank"
            rel="noreferrer"
            onClick={(event) => event.stopPropagation()}
            className="font-semibold text-[#0f766e] underline underline-offset-4 hover:text-[#115e59]"
          >
            Terms and Conditions
          </Link>
        </span>
      </DarkCheckbox>

      <DarkCheckbox
        checked={
          applicantType === "company" ? companyForm.agreePrivacy : individualForm.agreePrivacy
        }
        onChange={(v) =>
          applicantType === "company"
            ? updateCompanyField("agreePrivacy", v)
            : updateIndividualField("agreePrivacy", v)
        }
      >
        <span className="text-sm leading-snug">
          I have read and agree to the{" "}
          <Link
            href="/privacy"
            target="_blank"
            rel="noreferrer"
            onClick={(event) => event.stopPropagation()}
            className="font-semibold text-[#0f766e] underline underline-offset-4 hover:text-[#115e59]"
          >
            Privacy Policy
          </Link>
        </span>
      </DarkCheckbox>
    </div>
  </div>
)}

              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-black/8 pt-2">
                <button
                  type="button"
                  onClick={goToPreviousApplyStep}
                  disabled={applyStep === 1 || formSubmitting}
                  className="inline-flex items-center gap-2 rounded-2xl border border-black/10 px-5 py-3 text-sm font-semibold text-[#0d1117] transition hover:border-black/20 disabled:cursor-not-allowed disabled:opacity-35"
                >
                  Back
                </button>

                {applyStep < 4 ? (
                  <button
                    type="button"
                    onClick={goToNextApplyStep}
                    className="inline-flex items-center gap-2 rounded-2xl bg-[#0d1117] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#1a2030]"
                  >
                    Continue <ArrowRight className="h-4 w-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={
                      formSubmitting ||
                      !(applicantType === "company"
                        ? companyForm.confirmAccuracy && companyForm.agreeTerms && companyForm.agreePrivacy
                        : individualForm.confirmAccuracy && individualForm.agreeTerms && individualForm.agreePrivacy)
                    }
                    className="inline-flex items-center gap-2 rounded-2xl bg-[#0d1117] px-7 py-3.5 font-semibold text-white transition hover:bg-[#1a2030] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {formSubmitting && <LoaderCircle className="h-4 w-4 animate-spin" />}
                    {formSubmitting ? "Submitting…" : "Submit Application"}
                  </button>
                )}
              </div>
            </form>
          )}
        </div>
      </SectionShell>

      {/* ── VERIFY & ONBOARD ─────────────────────────────────────────────── */}
      <SectionShell id="verify" className="bg-[#f0f2f5] border-b border-black/6">
        <SectionHeading
          eyebrow="Verify & Onboard"
          title="Approved Applicants Complete Their Full On-Chain Onboarding Here"
          body="Enter your ID, connect the approved wallet, configure your investment, then confirm the two transactions."
          variant="dark"
        />

        {/* Stepper */}
        <div className="mt-10 flex flex-wrap gap-4">
          {VERIFY_STEPS.map((label, index) => {
            const stepNumber = (index + 1) as ReviewStep;
            const active = verifyStage >= stepNumber;
            return (
              <div key={label} className="flex items-center gap-3">
                {index > 0 && <span className="hidden h-px w-6 bg-black/15 sm:block" />}
                <div className={cn("flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold", active ? "bg-[#0d1117] text-white" : "border border-black/15 text-[#9ca3af]")}>
                  {active && verifyStage > stepNumber ? <Check className="h-4 w-4" /> : index + 1}
                </div>
                <span className={cn("text-sm", active ? "font-medium text-[#0d1117]" : "text-[#9ca3af]")}>{label}</span>
              </div>
            );
          })}
        </div>

        <div className="mt-8 rounded-[32px] border border-black/8 bg-white p-6 shadow-[0_8px_40px_rgba(0,0,0,0.07)] sm:p-8">
          {verifyStage === 1 && (
            <div className="max-w-2xl space-y-6">
              <div>
                <h3 className="text-2xl font-semibold text-[#0d1117]">Already Approved? Start Here</h3>
                <p className="mt-2 text-sm text-[#6b7280]">Enter the unique onboarding ID from your approval email.</p>
              </div>
              <DarkInput label="Your Onboarding ID" value={verifyId} onChange={setVerifyId} placeholder="MDAO-XXXX-XXXXX" />
              {verifyMessage && (
                <div className={cn("rounded-xl px-4 py-3 text-sm", verifyState === "used" ? "border border-amber-200 bg-amber-50 text-amber-800" : "border border-red-200 bg-red-50 text-red-700")}>
                  {verifyMessage}
                </div>
              )}
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handleVerifyId}
                  className="inline-flex items-center gap-2 rounded-2xl bg-[#0d1117] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1a2030]"
                >
                  {verifyState === "loading" && <LoaderCircle className="h-4 w-4 animate-spin" />}
                  Verify ID
                </button>
                {verifyState === "used" && (
                  <Link href="/dashboard" className="inline-flex items-center gap-2 rounded-2xl border border-black/10 px-5 py-3 text-sm font-semibold text-[#0d1117]">
                    Go to Dashboard
                  </Link>
                )}
              </div>
            </div>
          )}

          {verifyStage === 2 && verifiedApplicant && (
            <div className="space-y-6">
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
                ✓ ID verified. Now connect the wallet you registered during your application.
              </div>
              <div>
                <p className="text-sm text-[#6b7280]">Registered wallet</p>
                <p className="mt-1.5 font-mono text-lg font-semibold text-[#0d1117]">{shortenAddress(verifiedApplicant.walletAddress)}</p>
              </div>
              {!isConnected && <ConnectWalletButton size="lg" />}
              {verifyMessage && (
                <div className={cn("rounded-xl px-4 py-3 text-sm", address?.toLowerCase() !== verifiedApplicant.walletAddress.toLowerCase() ? "border border-red-200 bg-red-50 text-red-700" : "border border-amber-200 bg-amber-50 text-amber-700")}>
                  {verifyMessage}
                </div>
              )}
              {isConnected && address && address.toLowerCase() !== verifiedApplicant.walletAddress.toLowerCase() && (
                <button type="button" onClick={() => disconnect()} className="inline-flex rounded-2xl border border-black/10 px-5 py-3 text-sm font-semibold text-[#0d1117]">
                  Disconnect Wallet
                </button>
              )}
              {isWhitelistLoading && address?.toLowerCase() === verifiedApplicant.walletAddress.toLowerCase() && (
                <div className="inline-flex items-center gap-2 text-sm text-[#6b7280]">
                  <LoaderCircle className="h-4 w-4 animate-spin" />
                  Checking whitelist status…
                </div>
              )}
            </div>
          )}

          {stage3Ready && verifyStage === 3 && verifiedApplicant && !onboardingComplete && (
            <div className="space-y-6">
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
                ✓ ID Verified &nbsp;·&nbsp; ✓ Wallet Connected &nbsp;·&nbsp; ✓ Whitelisted
              </div>
              <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
                <div className="space-y-6">
                  <div className="rounded-2xl border border-black/8 bg-[#f9fafb] p-5">
                    <p className="text-sm text-[#6b7280]">Investment Type</p>
                    <div className="mt-2 inline-flex rounded-full bg-[#0d1117] px-4 py-2 text-sm font-semibold text-white">
                      {verifiedApplicant.applicantType === "company" ? "Company Partnership" : "Individual Partnership"}
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-2xl border border-black/8 bg-[#f9fafb] p-5">
                      <p className="text-sm text-[#6b7280]">Approved Investment Amount</p>
                      <p className="mt-2 text-3xl font-semibold text-[#0d1117]">
                        {formatCurrency(approvedAmount, 0)} USDT
                      </p>
                      <p className="mt-2 text-sm text-[#6b7280]">
                        Final amount loaded from your approved onboarding ID.
                      </p>
                    </div>
                    <div className="rounded-2xl border border-black/8 bg-[#f9fafb] p-5">
                      <p className="text-sm text-[#6b7280]">Approved Lock Period</p>
                      <p className="mt-2 text-3xl font-semibold text-[#0d1117]">
                        {approvedLockTierConfig.label}
                      </p>
                      <p className="mt-2 text-sm text-[#6b7280]">
                        Bonus: +{approvedLockTierConfig.bonusPercent}% · Vesting {approvedLockTierConfig.vestingMonths} months
                      </p>
                    </div>
                  </div>

                  <div className={cn(
                    "rounded-2xl px-5 py-4 text-sm",
                    isAmountValid
                      ? "border border-emerald-200 bg-emerald-50 text-emerald-700"
                      : "border border-red-200 bg-red-50 text-red-700"
                  )}>
                    {isAmountValid
                      ? "Your approved amount and lock period are fixed and ready for payment. No changes are allowed at this step."
                      : `The approved amount is outside the current ${verifiedApplicant.applicantType} limits. Please contact ${PARTNERSHIP_CONTACT_EMAIL} before proceeding.`}
                  </div>

                  <button
                    type="button"
                    disabled={!isAmountValid}
                    onClick={() => setVerifyStage(4)}
                    className="inline-flex items-center gap-2 rounded-2xl bg-[#0d1117] px-6 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-35 hover:bg-[#1a2030] transition"
                  >
                    Proceed to Review <ArrowRight className="h-4 w-4" />
                  </button>
                </div>

                <SummaryCard summary={summary} amountInput={approvedAmountInput} />
              </div>
            </div>
          )}

          {verifyStage === 4 && !onboardingComplete && (
            <div className="space-y-6">
              <SummaryCard summary={summary} amountInput={approvedAmountInput} />

              <div className="rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm leading-7 text-amber-900">
                You are about to sign two blockchain transactions on BNB Chain. Once confirmed, the smart contract distributes your payment automatically. This action is irreversible. MDAO does not process or hold your funds.
              </div>

              {/* Step 1: Approve */}
              <div className="rounded-[28px] border border-black/8 bg-[#f9fafb] p-6">
                <p className="text-[11px] uppercase tracking-[0.25em] text-[#f0b429]">Step 1 of 2</p>
                <h3 className="mt-2 text-lg font-semibold text-[#0d1117]">Approve USDT Spend</h3>
                <p className="mt-2 text-sm leading-7 text-[#6b7280]">
                  Before the contract can accept your payment, you need to approve it to spend your USDT. This is a standard requirement for ERC-20 token transactions.
                </p>
                <button
                  type="button"
                  disabled={!summary.amountRaw || approveReceipt.isLoading || approvalComplete}
                  onClick={handleApprove}
                  className={cn(
                    "mt-5 inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold transition",
                    approvalComplete
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-[#0d1117] text-white hover:bg-[#1a2030] disabled:cursor-not-allowed disabled:opacity-40"
                  )}
                >
                  {approveReceipt.isLoading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : approvalComplete ? <Check className="h-4 w-4" /> : null}
                  {approveReceipt.isLoading ? "Waiting for wallet…" : approvalComplete ? "USDT Approved" : `Approve ${formatCurrency(summary.amountUsd, 0)} USDT`}
                </button>
                {approvalError && <p className="mt-3 text-sm text-red-600">{approvalError}</p>}
              </div>

              {/* Step 2: Onboard */}
              <div className="rounded-[28px] border border-black/8 bg-[#f9fafb] p-6">
                <p className="text-[11px] uppercase tracking-[0.25em] text-[#f0b429]">Step 2 of 2</p>
                <h3 className="mt-2 text-lg font-semibold text-[#0d1117]">Confirm Onboarding</h3>
                <p className="mt-2 text-sm leading-7 text-[#6b7280]">
                  This transaction completes your onboarding and distributes your payment. Your MDAO allocation will be recorded on-chain.
                </p>
                <button
                  type="button"
                  disabled={!approvalComplete || onboardReceipt.isLoading}
                  onClick={handleOnboard}
                  className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-[#0d1117] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1a2030] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {onboardReceipt.isLoading && <LoaderCircle className="h-4 w-4 animate-spin" />}
                  {onboardReceipt.isLoading ? "Waiting for wallet…" : "Confirm Onboarding"}
                </button>
                {onboardHash && !onboardingComplete && (
                  <p className="mt-3 text-sm text-[#6b7280]">
                    Confirming…{" "}
                    <a href={getTxLink(onboardHash)} target="_blank" rel="noreferrer" className="text-[#0d1117] underline hover:no-underline">
                      View on BSCScan
                    </a>
                  </p>
                )}
                {onboardError && <p className="mt-3 text-sm text-red-600">{onboardError}</p>}
              </div>
            </div>
          )}

          {onboardingComplete && (
            <div className="space-y-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                <CheckCircle2 className="h-7 w-7" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-[#0d1117]">Welcome to MDAO Partnership</h3>
                <p className="mt-2 text-sm text-[#6b7280]">Your onboarding is confirmed on-chain.</p>
              </div>
              {onboardHash && (
                <p className="text-sm text-[#6b7280]">
                  Tx: <span className="font-mono">{shortenAddress(onboardHash)}</span>{" "}
                  <a href={getTxLink(onboardHash)} target="_blank" rel="noreferrer" className="text-[#0d1117] underline">View on BSCScan ↗</a>
                </p>
              )}
              <div className="rounded-2xl border border-black/8 bg-[#f9fafb] p-6">
                <p className="text-sm text-[#6b7280]">Total MDAO allocated</p>
                <p className="mt-1.5 text-3xl font-semibold text-[#0d1117]">{summary.totalMdaoDisplay}</p>
                <div className="mt-5 grid gap-3 text-sm">
                  {[
                    ["Lock ends", summary.lockEndLabel],
                    ["First claim", summary.firstClaimLabel],
                    ["Monthly release", `${summary.monthlyReleaseDisplay} MDAO`],
                  ].map(([label, value]) => (
                    <div key={label} className="flex justify-between border-t border-black/6 pt-3">
                      <span className="text-[#6b7280]">{label}</span>
                      <span className="font-medium text-[#0d1117]">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <Link href="/dashboard" className="inline-flex items-center gap-2 rounded-2xl bg-[#0d1117] px-5 py-3 text-sm font-semibold text-white">
                View My Dashboard
              </Link>
            </div>
          )}
        </div>
      </SectionShell>

      {/* ── TRANSPARENCY ─────────────────────────────────────────────────── */}
      <SectionShell id="transparency" className="bg-[#0d1117] border-b border-white/6">
        <SectionHeading
          eyebrow="Transparency"
          title="Show The Program Is Live, Funded, And Accounted For"
          body="Everything below is designed for public confidence: the contract address, program stats, fee split wallets, solvency, and token price history."
          variant="light"
        />

        <div className="mt-12 rounded-[28px] border border-white/8 bg-white/4 p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <TransRow label="Contract Address">
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-mono text-white">{shortenAddress(CONTRACTS.PARTNERSHIP)}</span>
                <button type="button" onClick={() => copyAddress(CONTRACTS.PARTNERSHIP)} className="text-white/40 hover:text-[#f0b429] transition">
                  <Copy className="h-4 w-4" />
                </button>
                <a href={getAddressLink(CONTRACTS.PARTNERSHIP)} target="_blank" rel="noreferrer" className="text-white/40 hover:text-[#f0b429] transition">
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </TransRow>
            <TransRow label="Network"><span className="text-white">BNB Smart Chain (BSC)</span></TransRow>
            <TransRow label="Version"><span className="text-white">{PARTNERSHIP_VERSION}</span></TransRow>
            <TransRow label="Status">
              <span className={cn("inline-flex items-center gap-2 text-sm", partnership.paused ? "text-red-400" : "text-[#2ed8a3]")}>
                <span className={cn("h-2 w-2 rounded-full", partnership.paused ? "bg-red-400" : "bg-[#2ed8a3] shadow-[0_0_8px_rgba(46,216,163,0.8)]")} />
                {partnership.paused ? "Paused" : "Active"}
              </span>
            </TransRow>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {[
            { label: "Total Companies Onboarded", value: formatNumber(effectiveCompanyCount, 0) },
            { label: "Total Paid Companies", value: formatNumber(paidCompanyCount, 0) },
            { label: "Total Individuals", value: formatNumber(individualCount, 0) },
            { label: "Total Raised (USDT)", value: totalRaisedRaw ? formatCurrency(Number(formatUnits(totalRaisedRaw, partnership.paymentTokenDecimals)), 0) : "—" },
            { label: "Current Token Price", value: formatPrice(tokenPriceRaw ?? null, partnership.paymentTokenDecimals) },
            { label: "Next Price Increase In", value: formatTimeUntilCompanies(partnership.nextPriceIncreaseIn !== undefined ? Number(partnership.nextPriceIncreaseIn) : null) },
          ].map((m) => (
            <div key={m.label} className="rounded-[26px] border border-white/8 bg-white/4 p-6">
              <p className="text-sm text-white/45">{m.label}</p>
              <p className="mt-3 text-3xl font-light text-white">{m.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {[
            { title: "LP Wallet", address: partnership.lpWallet, balance: partnership.walletBalances?.[0] },
            { title: "Community Wallet", address: partnership.communityWallet, balance: partnership.walletBalances?.[1] },
            { title: "Investment Wallet", address: partnership.investmentWallet, balance: partnership.walletBalances?.[2] },
          ].map((w) => (
            <div key={w.title} className="rounded-[28px] border border-white/8 bg-white/4 p-6">
              <p className="text-sm text-white/45">{w.title}</p>
              <p className="mt-3 font-mono text-sm text-white/80">{w.address ? shortenAddress(w.address) : "—"}</p>
              {w.address && (
                <a href={getAddressLink(w.address)} target="_blank" rel="noreferrer" className="mt-1 inline-flex text-sm text-[#f0b429]/70 hover:text-[#f0b429] transition">
                  BSCScan ↗
                </a>
              )}
              <p className="mt-4 text-2xl font-light text-white">
                {w.balance !== undefined ? formatCurrency(Number(formatUnits(w.balance, partnership.paymentTokenDecimals)), 0) : "—"}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-[28px] border border-white/8 bg-white/4 p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <TransRow label="Total MDAO Allocated"><span className="text-white">{formatTokenAmount(totalMdaoAllocatedRaw, partnership.mdaoTokenDecimals, 0)}</span></TransRow>
            <TransRow label="Total MDAO Claimed"><span className="text-white">{formatTokenAmount(totalMdaoClaimedRaw, partnership.mdaoTokenDecimals, 0)}</span></TransRow>
            <TransRow label="Outstanding"><span className="text-white">{formatTokenAmount(outstandingMdaoRaw, partnership.mdaoTokenDecimals, 0)}</span></TransRow>
            <TransRow label="Contract Balance"><span className="text-white">{formatTokenAmount(partnership.mdaoContractBalance, partnership.mdaoTokenDecimals, 0)}</span></TransRow>
            <TransRow label="Solvency Status">
              <span className={cn("inline-flex items-center gap-2 text-sm", partnership.mdaoSolvent ? "text-[#2ed8a3]" : "text-red-400")}>
                <span className={cn("h-2 w-2 rounded-full", partnership.mdaoSolvent ? "bg-[#2ed8a3]" : "bg-red-400")} />
                {partnership.mdaoSolvent ? "Solvent" : "Warning — Contact Team"}
              </span>
            </TransRow>
          </div>
        </div>

        {/* Price history table */}
        <div className="mt-8 overflow-hidden rounded-[28px] border border-white/8">
          <div className="flex items-center justify-between border-b border-white/8 bg-white/4 px-6 py-5">
            <div>
              <h3 className="text-lg font-semibold text-white">Price History</h3>
              <p className="mt-0.5 text-sm text-white/40">Newest first.</p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-white/8">
                <tr>
                  {["Date", "New Price", "Paid Companies", "Transaction"].map((h) => (
                    <th key={h} className="px-6 py-4 text-[11px] font-medium uppercase tracking-[0.2em] text-white/35">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {priceHistory.isLoading ? (
                  <tr><td className="px-6 py-6 text-white/45" colSpan={4}>Loading price history…</td></tr>
                ) : priceHistory.items.length === 0 ? (
                  <tr><td className="px-6 py-6 text-white/45" colSpan={4}>{priceHistory.error ?? "No price increase events found yet."}</td></tr>
                ) : (
                  priceHistory.items.slice(0, visibleEvents).map((item) => (
                    <tr key={item.id} className="border-t border-white/6 transition hover:bg-white/3">
                      <td className="px-6 py-4 text-white/50">{item.dateLabel}</td>
                      <td className="px-6 py-4 font-semibold text-white">{formatPrice(item.priceRaw, partnership.paymentTokenDecimals)}</td>
                      <td className="px-6 py-4 text-white/50">{item.paidCompanies ?? "—"}</td>
                      <td className="px-6 py-4">
                        <a href={getTxLink(item.txHash)} target="_blank" rel="noreferrer" className="font-mono text-[#f0b429]/70 hover:text-[#f0b429] transition">
                          {shortenAddress(item.txHash)} ↗
                        </a>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          {priceHistory.items.length > visibleEvents && (
            <div className="border-t border-white/8 px-6 py-5">
              <button type="button" onClick={() => setVisibleEvents((c) => c + 10)} className="text-sm font-semibold text-[#f0b429]/70 hover:text-[#f0b429] transition">
                Load more
              </button>
            </div>
          )}
        </div>
      </SectionShell>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <SectionShell id="faq" className="bg-[#f7f8fa]">
        <SectionHeading
          eyebrow="FAQ"
          title="The Answers Investors Need Before They Commit"
          body="Short, direct responses that help applicants avoid chain mistakes, funding issues, or onboarding confusion."
          variant="dark"
        />

        <div className="mt-10 space-y-3">
          {PARTNERSHIP_FAQ.map((item) => (
            <FaqItem key={item.q} question={item.q} answer={item.a} href={item.href} linkLabel={item.linkLabel} />
          ))}
        </div>
      </SectionShell>

      <SiteFooter />
    </main>
  );
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function SummaryCard({
  summary,
  amountInput,
}: {
  summary: ReturnType<typeof calculatePartnershipSummary>;
  amountInput: string;
}) {
  return (
    <div className="rounded-[28px] border border-black/8 bg-[#f9fafb] p-6">
      <h3 className="text-base font-semibold text-[#0d1117]">Investment Summary</h3>
      <div className="mt-5 space-y-3 text-sm">
        <SumRow label="You pay" value={amountInput ? `${formatCurrency(Number(amountInput), 0)} USDT` : "—"} />
        <SumRow label="Token price" value={summary.priceDisplay} />
        <div className="my-2 h-px bg-black/8" />
        <SumRow label="Base MDAO" value={summary.baseMdaoDisplay} />
        <SumRow label="Lock bonus" value={summary.bonusMdaoDisplay === "—" ? "—" : `+${summary.bonusMdaoDisplay}`} />
        <SumRow label="Total MDAO" value={summary.totalMdaoDisplay} bold />
        <div className="my-2 h-px bg-black/8" />
        <SumRow label="Lock ends" value={summary.lockEndLabel} />
        <SumRow label="Vesting starts" value={summary.vestingStartLabel} />
        <SumRow label="Vesting ends" value={summary.vestingEndLabel} />
        <SumRow label="Monthly release" value={summary.monthlyReleaseDisplay === "—" ? "—" : `${summary.monthlyReleaseDisplay} MDAO`} />
        <div className="my-2 h-px bg-black/8" />
        <SumRow label="LP (30%)" value={formatCurrency(summary.feeLpUsd, 0)} />
        <SumRow label="Community (30%)" value={formatCurrency(summary.feeCommunityUsd, 0)} />
        <SumRow label="Investment (40%)" value={formatCurrency(summary.feeInvestmentUsd, 0)} />
        <div className="my-2 h-px bg-black/8" />
        <SumRow label="Burn (0.5%)" value={summary.burnMdaoDisplay === "—" ? "—" : `${summary.burnMdaoDisplay} MDAO`} />
      </div>
    </div>
  );
}

function SumRow({ label, value, bold = false }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-[#6b7280]">{label}</span>
      <span className={cn("text-right text-[#0d1117]", bold && "font-semibold")}>{value}</span>
    </div>
  );
}

/** TransRow – for the Transparency section (dark background) */
function TransRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between py-2 border-b border-white/6 last:border-0">
      <span className="text-sm text-white/40">{label}</span>
      <span className="text-sm font-medium">{children}</span>
    </div>
  );
}

/** DarkInput – for light-background sections */
function DarkInput({
  label, value, onChange, type = "text", placeholder, required, error, hint,
}: {
  label: string; value: string; onChange: (v: string) => void;
  type?: string; placeholder?: string; required?: boolean; error?: string; hint?: string;
}) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium text-[#1f2937]">
        {label}{required ? " *" : ""}
      </span>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "w-full rounded-2xl border bg-white px-4 py-3 text-[#0d1117] placeholder-[#d1d5db] outline-none transition focus:ring-2 focus:ring-[#0d1117]/10",
          error ? "border-red-400 focus:border-red-400" : "border-[#e5e7eb] focus:border-[#0d1117]"
        )}
      />
      {error
        ? <span className="text-sm text-red-600">{error}</span>
        : hint
        ? <span className="text-sm text-[#9ca3af]">{hint}</span>
        : null}
    </label>
  );
}

function DarkTextarea({
  label, value, onChange, maxLength, required,
}: { label: string; value: string; onChange: (v: string) => void; maxLength: number; required?: boolean }) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium text-[#1f2937]">{label}{required ? " *" : ""}</span>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        maxLength={maxLength}
        rows={5}
        className="w-full rounded-2xl border border-[#e5e7eb] bg-white px-4 py-3 text-[#0d1117] outline-none transition focus:border-[#0d1117] focus:ring-2 focus:ring-[#0d1117]/10"
      />
      <span className="text-sm text-[#9ca3af]">{value.length}/{maxLength}</span>
    </label>
  );
}

function DarkSelect({
  label, value, onChange, options, optionValues, required,
}: {
  label: string; value: string; onChange: (v: string) => void;
  options: readonly string[] | string[]; optionValues?: string[]; required?: boolean;
}) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium text-[#1f2937]">{label}{required ? " *" : ""}</span>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none rounded-2xl border border-[#e5e7eb] bg-white px-4 py-3 pr-10 text-[#0d1117] outline-none transition focus:border-[#0d1117] focus:ring-2 focus:ring-[#0d1117]/10"
        >
          <option value="">Select</option>
          {options.map((opt, i) => (
            <option key={opt} value={optionValues?.[i] ?? opt}>{opt}</option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9ca3af]" />
      </div>
    </label>
  );
}

function DarkCheckbox({ checked, onChange, children }: { checked: boolean; onChange: (v: boolean) => void; children: React.ReactNode }) {
  return (
    <label className="flex items-start gap-3 text-sm leading-6 text-[#374151] cursor-pointer">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="mt-1 h-4 w-4 rounded border-[#d1d5db] accent-[#0d1117]" />
      <span>{children}</span>
    </label>
  );
}

function FaqItem({
  question,
  answer,
  href,
  linkLabel,
}: {
  question: string;
  answer: string;
  href?: string;
  linkLabel?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="overflow-hidden rounded-[24px] border border-black/8 bg-white">
      <button type="button" onClick={() => setOpen((c) => !c)} className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left">
        <span className="font-semibold text-[#0d1117]">{question}</span>
        <ChevronDown className={cn("h-5 w-5 flex-shrink-0 text-[#9ca3af] transition-transform duration-200", open && "rotate-180")} />
      </button>
      {open && (
        <div className="border-t border-black/6 px-6 py-5 text-sm leading-7 text-[#4b5563]">
          <p>{answer}</p>
          {href && linkLabel ? (
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center gap-2 font-semibold text-[#0f766e] transition-colors hover:text-[#115e59]"
            >
              {linkLabel}
              <ExternalLink className="h-4 w-4" />
            </a>
          ) : null}
        </div>
      )}
    </div>
  );
}
