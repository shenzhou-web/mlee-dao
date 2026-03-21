"use client"

import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useAccount } from "wagmi"
import { shortenAddress } from "@/lib/utils"

interface ConnectWalletButtonProps {
  size?: "sm" | "md" | "lg"
  variant?: "primary" | "header"
}

export function ConnectWalletButton({ size = "md", variant = "primary" }: ConnectWalletButtonProps) {
  const { address, isConnected } = useAccount()

  const sizeStyles = {
    sm: { padding: "0.6rem 1.2rem", fontSize: "0.85rem" },
    md: { padding: "0.85rem 2rem",  fontSize: "0.95rem" },
    lg: { padding: "1.1rem 2.8rem", fontSize: "1.05rem" },
  }

  return (
    <ConnectButton.Custom>
      {({ account, chain, openAccountModal, openChainModal, openConnectModal, authenticationStatus, mounted }) => {
                const ready = mounted && authenticationStatus !== "loading"
        const connected = ready && account && chain && (!authenticationStatus || authenticationStatus === "authenticated")

        if (!ready) return <div style={{ opacity: 0, pointerEvents: "none" }} />

        if (!connected) {
          return (
            <button onClick={openConnectModal}
              className={`relative inline-flex items-center justify-center gap-2 rounded-xl font-bold uppercase overflow-hidden transition-all duration-300 ${variant === "header" ? "btn-outline-gold" : "btn-wallet"}`}
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                letterSpacing: "0.15em",
                ...sizeStyles[size],
              }}>
              {variant !== "header" && (
                <span className="absolute inset-0 pointer-events-none"
                  style={{
                    background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.2) 50%, transparent 60%)",
                    animation: "progress-shine 2.5s ease-in-out infinite",
                  }} />
              )}
              🔗 Connect Wallet
            </button>
          )
        }

        // Wrong network warning
        if (chain.unsupported) {
          return (
            <button onClick={openChainModal}
              className="inline-flex items-center gap-2 rounded-xl font-bold uppercase px-4 py-2"
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                background: "rgba(239,68,68,0.1)",
                border: "1px solid rgba(239,68,68,0.4)",
                color: "#ef4444",
                fontSize: "0.85rem",
              }}>
              ⚠️ Wrong Network
            </button>
          )
        }

        // Connected state
        if (variant === "header") {
          return (
            <button onClick={openAccountModal}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold uppercase tracking-wider transition-all duration-300"
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                letterSpacing: "0.08em",
                background: "rgba(46,216,163,0.08)",
                border: "1px solid rgba(46,216,163,0.3)",
                color: "#2ed8a3",
              }}>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
              </span>
              {account.displayName ?? shortenAddress(account.address)}
            </button>
          )
        }

        return (
          <button onClick={openAccountModal}
            className="relative inline-flex items-center gap-2 rounded-xl font-bold uppercase overflow-hidden transition-all duration-300"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              letterSpacing: "0.15em",
              ...sizeStyles[size],
              background: "rgba(46,216,163,0.1)",
              border: "1px solid rgba(46,216,163,0.3)",
              color: "#2ed8a3",
            }}>
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400" />
            </span>
            {account.displayName ?? shortenAddress(account.address)}
          </button>
        )
      }}
    </ConnectButton.Custom>
  )
}
