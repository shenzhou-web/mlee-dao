"use client";

import {
  getLockTierConfig,
  type PartnershipApplicantType,
} from "@/lib/partnership";

type ApplicationRecord = {
  referenceNumber: string;
  email: string;
  walletAddress: string;
  applicantType: PartnershipApplicantType;
  lockTier: number;
  status: "pending" | "approved" | "expired" | "used";
  submittedAt: string;
};

export type SubmitApplicationResult = {
  referenceNumber: string;
  email: string;
};

export type UploadedKycDocument = {
  type: string;
  url: string;
  key: string;
};

export type SubmitPartnershipApplicationInput = {
  applicantType: PartnershipApplicantType;
  email: string;
  walletAddress: string;
  lockTier: number;
  payload: Record<string, unknown>;
};

export type VerifyIdResult =
  | {
      status: "valid";
      applicantType: PartnershipApplicantType;
      walletAddress: `0x${string}`;
      lockTier: number;
      amount: number;
      email: string;
    }
  | { status: "invalid" }
  | { status: "pending" }
  | { status: "rejected" }
  | { status: "expired" }
  | { status: "used" }
  | { status: "refNum" };

const API_BASE = "https://api.iealiance.com/api";
const STORAGE_KEY = "mdao.partnership.applications";

function getApiUrl(path: string) {
  return `${API_BASE}${path}`;
}

const DEMO_APPROVED_RECORD: ApplicationRecord = {
  referenceNumber: "MDAO-2026-00001",
  email: "approved@demo.mleedao.com",
  walletAddress: "0x1111111111111111111111111111111111111111",
  applicantType: "company",
  lockTier: getLockTierConfig(3).id,
  status: "approved",
  submittedAt: new Date().toISOString(),
};

function isBrowser() {
  return typeof window !== "undefined";
}

function getLocalRecords() {
  if (!isBrowser()) return [DEMO_APPROVED_RECORD];
  const parsed = window.localStorage.getItem(STORAGE_KEY);
  if (!parsed) return [DEMO_APPROVED_RECORD];
  try {
    return JSON.parse(parsed) as ApplicationRecord[];
  } catch {
    return [DEMO_APPROVED_RECORD];
  }
}

function saveLocalRecords(records: ApplicationRecord[]) {
  if (!isBrowser()) return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

function generateReferenceNumber() {
  const year = new Date().getFullYear();
  const suffix = String(Math.floor(10000 + Math.random() * 89999));
  return `MDAO-${year}-${suffix}`;
}

export async function uploadKycDocuments(
  type: PartnershipApplicantType,
  files: File[],
): Promise<UploadedKycDocument[]> {
  if (!API_BASE) return [];

  const payload = new FormData();
  payload.append("type", type);
  files.forEach((file) => payload.append("files", file));

  const response = await fetch(getApiUrl("/upload"), {
    method: "POST",
    body: payload,
  });

  if (!response.ok) {
    throw new Error("Upload failed");
  }

  const result = (await response.json()) as { files?: UploadedKycDocument[] };
  return result.files ?? [];
}

export async function submitPartnershipApplication(
  input: SubmitPartnershipApplicationInput,
): Promise<SubmitApplicationResult> {
  if (API_BASE) {
    const response = await fetch(getApiUrl("/kyc"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input.payload),
    });

    if (!response.ok) {
      throw new Error("Submission failed");
    }

    const result = (await response.json()) as {
      email?: string;
      referenceNumber?: string;
      referenceId?: string;
      onboardingId?: string;
      kyc?: {
        email?: string;
        referenceNumber?: string;
        referenceId?: string;
        onboardingId?: string;
      };
    };

    return {
      referenceNumber:
        result.referenceNumber ??
        result.referenceId ??
        result.onboardingId ??
        result.kyc?.referenceNumber ??
        result.kyc?.referenceId ??
        result.kyc?.onboardingId ??
        "",
      email: result.email ?? result.kyc?.email ?? input.email,
    };
  }

  const { email, walletAddress, applicantType, lockTier } = input;
  const referenceNumber = generateReferenceNumber();
  const records = getLocalRecords();

  records.push({
    referenceNumber,
    email,
    walletAddress,
    applicantType,
    lockTier,
    status: "pending",
    submittedAt: new Date().toISOString(),
  });
  saveLocalRecords(records);

  return { referenceNumber, email };
}

export async function verifyPartnershipId(id: string): Promise<VerifyIdResult> {
  if (API_BASE) {
    const response = await fetch(
      getApiUrl(`/kyc/validate/${encodeURIComponent(id)}`),
    );
    if (response.status === 404) return { status: "invalid" };
    if (!response.ok) throw new Error("Unable to verify ID");

    const result = (await response.json()) as {
      valid?: boolean;
      exists?: boolean;
      status?: string | null;
      reason?: string | null;
      referenceId?: string | null;
      onboardingId?: string | null;
      walletAddress?: string | null;
      type?: PartnershipApplicantType | null;
      email?: string | null;
      lockPeriod?: number | string | null;
      amount?: number | string | null;
    };

    if (result.valid) {
      return {
        status: "valid",
        applicantType: (result.type ?? "company") as PartnershipApplicantType,
        walletAddress: (result.walletAddress ?? "") as `0x${string}`,
        lockTier: Number(result.lockPeriod ?? 3),
        amount: Number(result.amount ?? 0),
        email: result.email ?? "",
      };
    }

    if (
      !result.exists ||
      result.status === "invalid" ||
      result.status === null
    ) {
      return { status: "invalid" };
    }

    if (result.status === "used") {
      return { status: "used" };
    }

    if (result.status === "pending") {
      return { status: "pending" };
    }

    if (result.status === "rejected") {
      return { status: "rejected" };
    }

    if (result.status === "expired") {
      return { status: "expired" };
    }

    if (result.status === "refNum") {
      return { status: "refNum" };
    }

    return { status: "invalid" };
  }

  const record = getLocalRecords().find(
    (item) => item.referenceNumber.toLowerCase() === id.trim().toLowerCase(),
  );
  if (!record) return { status: "invalid" };
  if (record.status === "expired") return { status: "expired" };
  if (record.status === "used") return { status: "used" };
  if (record.status === "pending") return { status: "expired" };

  return {
    status: "valid",
    applicantType: record.applicantType,
    walletAddress: record.walletAddress as `0x${string}`,
    lockTier: record.lockTier,
    amount: 0,
    email: record.email,
  };
}

export async function markPartnershipIdConsumed(id: string, txHash: string) {
  if (API_BASE) {
    fetch(getApiUrl(`/kyc/complete/onboard/${encodeURIComponent(id)}`), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ txHash }),
    }).catch(() => undefined);
    return;
  }

  const records = getLocalRecords().map((record) =>
    record.referenceNumber === id
      ? { ...record, status: "used" as const }
      : record,
  );
  saveLocalRecords(records);
}

export async function markPartnershipPaymentDone(
  id: string,
  payload?: Record<string, unknown>,
) {
  if (!API_BASE) return;

  const response = await fetch(
    getApiUrl(`/kyc/${encodeURIComponent(id)}/payment`),
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload ?? {}),
    },
  );

  if (!response.ok) {
    throw new Error("Unable to mark payment as completed");
  }
}

export async function fetchPriceHistoryFromApi(limit = 10) {
  if (!API_BASE) return null;
  const response = await fetch(`${API_BASE}/price-history?limit=${limit}`);
  if (!response.ok) throw new Error("Unable to load price history");
  return response.json();
}
