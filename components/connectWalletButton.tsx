"use client"

import { useAccount, useConnect, useDisconnect } from "wagmi"
import { injected } from "wagmi/connectors"
import { Button } from "@/components/ui/button"
import { Wallet } from "lucide-react"

export function ConnectWalletButton() {
  const { address, isConnected } = useAccount()
  const { connect } = useConnect()
  const { disconnect } = useDisconnect()

  if (isConnected) {
    return (
      <Button variant="outline" onClick={() => disconnect()}>
        {address?.slice(0, 6)}...{address?.slice(-4)}
      </Button>
    )
  }

  return (
    <Button
      size="lg"
      className="bg-gradient-to-r from-primary via-secondary to-accent text-black font-bold px-12 py-6"
      onClick={() => connect({ connector: injected() })}
    >
      <Wallet className="w-5 h-5 mr-2" />
      Connect Wallet
    </Button>
  )
}
