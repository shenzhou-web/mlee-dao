"use client";

import { Suspense, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  clearWalletReturnPath,
  readWalletReturnPath,
} from "@/lib/wallet-return";

function WalletReturnGuardInner() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const pending = readWalletReturnPath();
    if (!pending) return;

    const query = searchParams.toString();

    const currentPath =
      `${pathname}${query ? `?${query}` : ""}${window.location.hash}`;

    const pendingPathname =
      pending.path.split("#")[0].split("?")[0];

    const hasPendingHash = pending.path.includes("#");

    if (pathname === "/" && pending.path !== "/") {
      router.replace(pending.path);
      return;
    }

    if (
      pathname === pendingPathname &&
      hasPendingHash &&
      currentPath !== pending.path
    ) {
      router.replace(pending.path);
      return;
    }

    if (
      currentPath === pending.path ||
      (!hasPendingHash && pathname === pendingPathname)
    ) {
      clearWalletReturnPath();
    }
  }, [pathname, router, searchParams]);

  return null;
}

export function WalletReturnGuard() {
  return (
    <Suspense fallback={null}>
      <WalletReturnGuardInner />
    </Suspense>
  );
}