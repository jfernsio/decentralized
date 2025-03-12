"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Wallet } from "lucide-react"

export function ConnectWallet() {
  const [isConnected, setIsConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")

  const connectWallet = async () => {
    // Simulated wallet connection - replace with actual Solana wallet connection
    setIsConnected(true)
    setWalletAddress("7xKX...A9Ks")
  }

  if (isConnected) {
    return (
      <Button variant="outline" className="border-white/10 text-white">
        <Wallet className="mr-2 h-4 w-4" />
        {walletAddress}
      </Button>
    )
  }

  return (
    <Button onClick={connectWallet} className="bg-gradient-to-r from-blue-500 to-purple-500">
      <Wallet className="mr-2 h-4 w-4" />
      Connect Wallet
    </Button>
  )
}

