"use client";

const WALLET_RETURN_KEY = "mdao_wallet_return";
const WALLET_RETURN_TTL_MS = 30 * 60 * 1000;

type WalletReturnState = {
  path: string;
  savedAt: number;
};

function storageAvailable(type: "localStorage" | "sessionStorage") {
  if (typeof window === "undefined") return false;
  return typeof window[type] !== "undefined";
}

function readFromStorage(type: "localStorage" | "sessionStorage") {
  if (!storageAvailable(type)) return null;

  const raw = window[type].getItem(WALLET_RETURN_KEY);
  if (!raw) return null;

  try {
    const value = JSON.parse(raw) as WalletReturnState;
    if (!value.path.startsWith("/") || Date.now() - value.savedAt > WALLET_RETURN_TTL_MS) {
      window[type].removeItem(WALLET_RETURN_KEY);
      return null;
    }
    return value;
  } catch {
    window[type].removeItem(WALLET_RETURN_KEY);
    return null;
  }
}

function writeToStorage(value: WalletReturnState) {
  if (storageAvailable("localStorage")) {
    window.localStorage.setItem(WALLET_RETURN_KEY, JSON.stringify(value));
  }
  if (storageAvailable("sessionStorage")) {
    window.sessionStorage.setItem(WALLET_RETURN_KEY, JSON.stringify(value));
  }
}

export function getCurrentWalletReturnPath() {
  if (typeof window === "undefined") return "/partnership#verify";

  const { pathname, search, hash } = window.location;
  return `${pathname}${search}${hash}`;
}

export function saveWalletReturnPath(path = getCurrentWalletReturnPath()) {
  if (typeof window === "undefined" || !path.startsWith("/")) return;

  writeToStorage({
    path,
    savedAt: Date.now(),
  });
}

export function readWalletReturnPath() {
  return readFromStorage("sessionStorage") ?? readFromStorage("localStorage");
}

export function clearWalletReturnPath() {
  if (typeof window === "undefined") return;
  if (storageAvailable("localStorage")) {
    window.localStorage.removeItem(WALLET_RETURN_KEY);
  }
  if (storageAvailable("sessionStorage")) {
    window.sessionStorage.removeItem(WALLET_RETURN_KEY);
  }
}
